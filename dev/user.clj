(ns user
  (:require [figwheel-sidecar.repl-api :as fw :refer [start-figwheel! cljs-repl]]
            [weathergen.math :as math]
            [weathergen.model :as model]))

(defn cljs
  []
  (start-figwheel!)
  (cljs-repl))
