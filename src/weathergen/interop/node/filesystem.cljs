(ns weathergen.interop.node.filesystem
  (:require-macros [weathergen.interop.node :refer [defimports]]))

(defimports "fs"
  readdirSync
  existsSync
  readFileSync
  statSync
  mkdirSync
  writeFileSync)

