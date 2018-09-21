(ns weathergen.filesystem
  "Filesystem operations on CLJS."
  (:require [cljs.nodejs :as node]
            [clojure.string :as str]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]
            ;;[weathergen.interop.node.filesystem :as fs]
            [weathergen.interop.node.path :as path]
            [weathergen.util :as util])
  (:refer-clojure :exclude [exists? identical?])
  (:require-macros
   [weathergen.cljs.macros :refer [with-trace]]))

;; So far we only support Node - not much sense in trying to implement
;; something in the browser.

;; (set! *warn-on-infer* true)

(def fs-lib ^js/fs (node/require "fs"))
(def os-lib ^js/os (node/require "os"))

(def win32? (-> os-lib .platform (= "win32")))

(defn- case-desensitize
  "If on a case-sensitive filesystem, try to convert to an existing
  path, ignoring case."
  [path]
  (if win32?
    path
    (reduce (fn [existing child]
              (some->> existing
                       (.readdirSync fs-lib)
                       (filter #(= (str/lower-case %)
                                   (str/lower-case child)))
                       first
                       (path/join existing)))
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
    (.existsSync fs-lib n)))

(defn path-combine
  "Given two path components, combine them. If the second is absolute, return it."
  ([path1 path2]
   (if (path/isAbsolute (normalize path2))
     (normalize path2)
     (path/join (normalize path1) (normalize path2))))
  ([path1 path2 & paths]
   (apply path-combine (path-combine path1 path2) paths)))

(defn parent
  "Given a path, return the directory that contains it. Returns null
  if at the root."
  [path]
  (let [p (path/dirname (normalize path))]
    (when-not (= p path)
      p)))

(defn basename
  "Given a path, return its basename. `opts` includes
  `:omit-extension?`, which, if true, will return the path without the
  file extension."
  ([path] (basename path {}))
  ([path opts]
   (let [{:keys [omit-extension?]} opts]
     (let [b (path/basename path)]
       (if-not omit-extension?
         b
         (let [e (path/extname b)]
           (subs b 0 (- (count b) (count e)))))))))

(defn extension
  "Given a path, return the file extension without the leading dot."
  [path]
  (subs (path/extname path) 1))

(defn file-buf
  "Returns a DataView wrappingx the contents of the file at `path`."
  [path]
  (try
    (let [n (-> path normalize case-desensitize)
          ^js/Buffer buf (.readFileSync fs-lib n)
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
  (->> path normalize case-desensitize (.readFileSync fs-lib)))

(defn file-text
  "Returns a string with the contents of the file at `path`."
  [path]
  ;; Not totally sure this will always work...
  (let [^js/Buffer buf (->> path normalize case-desensitize (.readFileSync fs-lib))]
    (.toString buf)))

(defn identical?
  "Returns true if `a` and `b` are the same file."
  [a b]
  (and (exists? a)
       (exists? b)
       (let [^js/fs.Stats stats-a (->> a normalize (.statSync fs-lib))
             ^js/fs.Stats stats-b (->> b normalize (.statSync fs-lib))]
         (= (.-ino stats-a)
            (.-ino stats-b)))))

(defn ancestor?
  "Returns true if `descendant` is a descendant file of `ancestor`."
  [ancestor descendant]
  (if-not win32?
    ;; This is probably not as robust, but win32 is the primary platform anyway.
    (str/starts-with? (str/lower-case descendant) (str/lower-case ancestor))
    (let [ancestor   (normalize ancestor)
          descendant (normalize descendant)
          parent     (parent descendant)]
      (when (and parent descendant (exists? parent) (exists? descendant))
        (or (identical? parent ancestor)
            (ancestor? ancestor parent))))))


(defn mkdir
  "Creates a directory. Recursively creates the parents if
  `make-parents?` is true."
  [path make-parents?]
  (let [par (parent path)]
    (when (and make-parents? (not (exists? par)))
      (mkdir par true))
    (when (not (exists? path))
      (.mkdirSync fs-lib path))))

(defn save-data
  "Saves `data` to the filesystem at `path`. Creates the directory if
  necessary."
  [path data]
  (mkdir (parent path) true)
  (.writeFileSync fs-lib path data))

(defn stat
  "Returns stats for file as map with keys `:size` and `:modified`."
  [path]
  (let [^js/fs.Stats stats (.statSync fs-lib path)]
    {:size (.-size stats)
     :modified (-> stats .-mtime .valueOf)}))
