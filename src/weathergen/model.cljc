(ns weathergen.model
  (:require [weathergen.math :as math]))

(def thresholds
  [0.00
   {:category        :sunny
    :wind-adjustment 1}
   0.50
   {:category        :fair
    :wind-adjustment 1}
   0.58
   {:category        :poor
    :wind-adjustment 2}
   0.68
   {:category        :inclement
    :wind-adjustment 4}
   1.0
   nil])

(defn categorize
  [pressure]
  (->> thresholds
       (partition-all 4 2)
       (map (fn [[low config high next]]
              (when (<= low pressure high)
                (assoc config
                       :val pressure
                       :next next
                       :proportion (/ (- pressure low) (- high low))))))
       (some identity)))

(defn weather
  ([x y t] (weather x y t 1))
  ([x y t seed]
   (let [t1               (math/whole (+ t seed))
         t2               (inc t1)
         pressure-fn      (fn [x y]
                            (math/clamp 0 1
                                        (math/interpolate (math/fractal-field x y 32 t1)
                                                          (math/fractal-field x y 32 t2)
                                                          (math/frac t))))
         pressure         (pressure-fn x y)
         info             (categorize pressure)
         [px' py' :as p'] (math/gradient x y pressure-fn 3)]
     {:category          (:category info)
      :pressure          pressure
      :wind              (mapv #(* (:wind-adjustment info) pressure 20 %) [py' (- px')])
      :pressure-gradient p'
      :temperature       :todo
      :proportion        (:proportion info)
      :info              info})))


