(ns weathergen.filesystem
  "Filesystem operations on CLJS."
  (:require [clojure.string :as str]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)])
  (:refer-clojure :exclude [exists?]))

;; So far we only support Node - not much sense in trying to implement
;; something in the browser.

(def filesystem (js/require "fs"))

(def pathlib (js/require "path"))

(defn- normalize
  "Deal with the fact that Windows likes backslashes and everyone else
  is sane."
  [path]
  ;; I'm not sure how robust this is. It's possible that
  ;; Path.normalize may be of some help.
  (when path
    (str/replace path "\\" "/")))

(defn exists?
  "Returns true if the specified file exists."
  [path]
  (.existsSync filesystem (normalize path)))

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

(defn file-buf
  "Returns a Buffer wrapping the contents of the file at `path`."
  [path]
  (->> path
      normalize
      (.readFileSync filesystem)
      .-buffer
      js/DataView.))

(defn file-text
  "Returns a string with the contents of the file at `path`."
  [path]
  ;; Not totally sure this will always work...
  (->> path normalize (.readFileSync filesystem) .toString))

(defn ancestor?
  "Returns true if `descendant` is a descendant file of `ancestor`."
  [ancestor descendant]
  (log/debug "ancestor?" :ancestor ancestor :descendant descendant)
  (let [ancestor   (normalize ancestor)
        descendant (normalize descendant)
        parent     (parent descendant)]
    (when (and parent descendant)
      (or (= parent ancestor)
          (ancestor? ancestor parent)))))

