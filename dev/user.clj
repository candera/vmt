(ns user
  (:require [clojure.spec :as s]
            [weathergen.dtc :as dtc]
            [weathergen.fmap :as fmap]
            [weathergen.math :as math]
            [weathergen.model :as model]))

#_(defn cljs
  []
  (start-figwheel!)
  (cljs-repl))

#_(in-ns 'boot.user)

(println "I'm here")
