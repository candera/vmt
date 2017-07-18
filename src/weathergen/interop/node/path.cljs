(ns weathergen.interop.node.path
  (:require-macros [weathergen.interop.node :refer [defimports]]))

(defimports "path"
  join
  dirname
  basename
  extname
  isAbsolute)

