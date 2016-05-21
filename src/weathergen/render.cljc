(ns weathergen.render
  (:require [weathergen.math :as math]))

(def successor
  {:sunny :fair
   :fair :poor
   :poor :inclement})



(defn weather-color-discrete
  [w]
  (-> w :category color))

(defn weather-color-gradient
  [w]
  (mapv long (math/vector-interpolate (-> w :category color)
                                     (-> w :next color)
                                     (-> w :proportion)
                                     0
                                     1)))

(defn weather-color-greyscale
  [w]
  (repeat 3 (* (:pressure w) 255)))
