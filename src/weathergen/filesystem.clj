(ns weathergen.filesystem
  "Filesystem operations on the JVM."
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [taoensso.timbre :as log
             :refer (log trace debug info warn error fatal report
                         logf tracef debugf infof warnf errorf fatalf reportf
                         spy get-env log-env)])
  (:import [java.nio.file Files Path])
  (:refer-clojure :exclude [identical?]))

(def filesystem (java.nio.file.FileSystems/getDefault))

(def win32? (-> "os.name"
                System/getProperty
                str/lower-case
                (str/index-of "win")
                some?))

(defn- get-path
  "Convenience wrapper around .getPath"
  [path]
  (.getPath filesystem path (into-array String [])))

(defn- case-desensitize
  "If on a case-sensitive filesystem, try to convert to an existing
  path, ignoring case."
  [path]
  (if win32?
    path
    ;; This is written stupidly, what with all the conversion back and
    ;; forth between paths, but it's really just here for dev support,
    ;; since in prod the app runs on Windows. Still: TODO: Fix.
    (reduce (fn [existing child]
              (let [p (some->> existing
                               io/file
                               .list
                               (filter #(= (str/lower-case %)
                                           (str/lower-case child)))
                               first
                               get-path)]
                (.toString (.resolve (get-path existing) p))))
            "/"
            (remove empty? (str/split path #"/")))))

(defn- normalize
  "Deal with the fact that Windows likes backslashes and everyone else
  is sane."
  [path]
  ;; I'm not sure how robust this is. It's possible that
  ;; Path.normalize may be of some help.
  (when path
    (str/replace path "\\" "/")))

(defn- ->path
  "Converts the path to a NIO Path object."
  [path]
  (-> path normalize get-path))

(defn exists?
  "Returns true if the specified file exists."
  [path]
  (-> path
      normalize
      io/file
      .exists))

(defn path-combine
  "Given two path components, combine them. If the second is absolute, return it."
  ([path1 path2]
   (-> path1
       ->path
       (.resolve (normalize path2))
       .toString))
  ([path1 path2 & paths]
   (apply path-combine (path-combine path1 path2) paths)))

(defn parent
  "Given a path, return the directory that contains it. Returns null
  if at the root."
  [path]
  (some-> path
          ->path
          .getParent
          .toString))

(defn file-buf
  "Returns a ByteBuffer wrapping the contents of the file at `path`."
  [path]
  (log/info "file-buf: " path)
  (-> path
      ->path
      java.nio.file.Files/readAllBytes
      java.nio.ByteBuffer/wrap))

(defn file-buffer
  "Returns a byte array wrapping the cntents of the file at `path`"
  [path]
  (log/info "file-buffer:" path)
  (-> path
      ->path
      java.nio.file.Files/readAllBytes))

(defn file-text
  "Returns a string with the contents of the file at `path`."
  [path]
  (log/info "file-text:" path)
  (-> path normalize slurp))

(defn identical?
  "Returns true if files `a` and `b` are the same file."
  [a b]
  (Files/isSameFile (.getPath filesystem a (into-array String nil))
                    (.getPath filesystem b (into-array String nil))))

(defn ancestor?
  "Returns true if `descendant` is a descendant file of `ancestor`."
  [ancestor descendant]
  (if-not win32?
    ;; This is probably not as robust, but win32 is the primary platform anyway.
    (str/starts-with? (str/lower-case descendant) (str/lower-case ancestor))
    (let [ancestor   (normalize ancestor)
          descendant (normalize descendant)
          parent     (parent descendant)]
      (when descendant
        (or (= parent ancestor)
            (ancestor? ancestor parent))))))

(defn save-data
  "Saves `data` to the filesystem at `path`. Creates the directory if
  necessary."
  [path data]
  #_(.mkdirSync filesystem (parent path))
  #_(.writeFileSync filesystem path buf)
  (throw (ex-info "Not yet implemented" {:reason :not-implemented})))

(defn stat
  "Returns stats for file as map with keys `:size` and `:modified`."
  [path]
  (let [file (io/file path)]
    {:size (.length file)
     :modified (.lastModified file)}))

(defn basename
  "Given a path, return its basename."
  [path]
  (-> path io/file .getName))
