(ns weathergen.filesystem
  "Filesystem operations on the JVM."
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [taoensso.timbre :as log
             :refer (log trace debug info warn error fatal report
                         logf tracef debugf infof warnf errorf fatalf reportf
                         spy get-env log-env)]))

(def filesystem (java.nio.file.FileSystems/getDefault))

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
  (.getPath filesystem (normalize path) (into-array String [])))

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
   #_(log/debug "path-combine" :path1 path1 :path2 path2)
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
  (-> path
      ->path
      java.nio.file.Files/readAllBytes
      java.nio.ByteBuffer/wrap))

(defn file-text
  "Returns a string with the contents of the file at `path`."
  [path]
  (-> path normalize slurp))

(defn ancestor?
  "Returns true if `descendant` is a descendant file of `ancestor`."
  [ancestor descendant]
  (let [ancestor   (normalize ancestor)
        descendant (normalize descendant)
        parent     (parent descendant)]
    (when descendant
      (or (= parent ancestor)
          (ancestor? ancestor parent)))))
