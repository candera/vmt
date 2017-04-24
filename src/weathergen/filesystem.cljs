(ns weathergen.filesystem
  "Filesystem operations on CLJS."
  (:require [clojure.string :as str]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]
            [weathergen.util :as util])
  (:refer-clojure :exclude [exists?]))

;; So far we only support Node - not much sense in trying to implement
;; something in the browser.

(def filesystem (js/require "fs"))

(def pathlib (js/require "path"))

(def win32? (-> "os" js/require .platform (= "win32")))

(defn- case-desensitize
  "If on a case-sensitive filesystem, try to convert to an existing
  path, ignoring case."
  [path]
  (if win32?
    path
    (reduce (fn [existing child]
              (some->> existing
                       (.readdirSync filesystem)
                       (filter #(= (str/lower-case %)
                                   (str/lower-case child)))
                       first
                       (.join pathlib existing)))
            "/"
            (remove empty? (str/split path #"/")))))

(defn- normalize
  "Deal with the fact that Windows likes backslashes and everyone else
  is sane."
  [path]
  ;; I'm not sure how robust this is. It's possible that
  ;; Path.normalize may be of some help.
  (str/replace path "\\" "/"))

(defn exists?
  "Returns true if the specified file exists."
  [path]
  (when-let [n (-> path normalize case-desensitize)]
    (.existsSync filesystem n)))

(defn path-combine
  "Given two path components, combine them. If the second is absolute, return it."
  ([path1 path2]
   (if (.isAbsolute pathlib (normalize path2))
     (normalize path2)
     (.join pathlib (normalize path1) (normalize path2))))
  ([path1 path2 & paths]
   (apply path-combine (path-combine path1 path2) paths)))

(defn parent
  "Given a path, return the directory that contains it. Returns null
  if at the root."
  [path]
  (let [p (.dirname pathlib (normalize path))]
    (when-not (= p path)
      p)))

(defn basename
  "Given a path, return its basename. `opts` includes
  `:omit-extension?`, which, if true, will return the path without the
  file extension."
  ([path] (basename path {}))
  ([path opts]
   (let [{:keys [omit-extension?]} opts]
     (let [b (.basename pathlib path)]
       (if-not omit-extension?
         b
         (let [e (.extname pathlib b)]
           (subs b 0 (- (count b) (count e)))))))))

(defn file-buf
  "Returns a DataView wrapping the contents of the file at `path`."
  [path]
  (try
    (let [n (-> path normalize case-desensitize)
          buf (.readFileSync filesystem n)
          ab (.-buffer buf)
          dv (js/DataView. ab)]
      ;; There's an optimization wherein the backing array can have
      ;; shared data in it, so we select the correct subset.
      (js/DataView. ab (.-byteOffset buf) (.-byteLength buf)))
    (catch :default x
      (log/error x "Failed to open file" :path path)
      (throw (ex-info "Failed to open file"
                      {:reason :file-open-failed
                       :path path})))))

(defn file-buffer
  "Reads the contents of file at `path` as a Node Buffer."
  [path]
  (->> path normalize case-desensitize (.readFileSync filesystem)))

(defn file-text
  "Returns a string with the contents of the file at `path`."
  [path]
  ;; Not totally sure this will always work...
  (->> path normalize case-desensitize (.readFileSync filesystem) .toString))

(defn ancestor?
  "Returns true if `descendant` is a descendant file of `ancestor`."
  [ancestor descendant]
  (if-not win32?
    ;; This is probably not as robust, but win32 is the primary platform anyway.
    (str/starts-with? (str/lower-case descendant) (str/lower-case ancestor))
    (let [ancestor   (normalize ancestor)
          descendant (normalize descendant)
          parent     (parent descendant)]
      (when (and parent descendant)
        (or (= (->> parent   (.statSync filesystem) .-ino)
               (->> ancestor (.statSync filesystem) .-ino))
            (ancestor? ancestor parent))))))

(defn mkdir
  "Creates a directory. Recursively creates the parents if
  `make-parents?` is true."
  [path make-parents?]
  (let [par (parent path)]
    (when (and make-parents? (not (exists? par)))
      (mkdir par true))
    (when (not (exists? path))
      (.mkdirSync filesystem path))))

(defn save-binary
  "Saves `buf` to the filesystem at `path`. Creates the directory if
  necessary."
  [path buf]
  (mkdir (parent path) true)
  (.writeFileSync filesystem path buf))

(defn stat
  "Returns stats for file as map with keys `:size` and `:modified`."
  [path]
  (let [stats (.statSync filesystem path)]
    {:size (.-size stats)
     :modified (-> stats .-mtime .valueOf)}))
