(ns weathergen.model
  (:require [weathergen.math :as math]))

(defn mmhg->inhg
  [mmhg]
  (-> mmhg
      (- 950)
      (/ 110)
      (* 3.25)
      (+ 28.05)))

(defn inhg->mmhg
  [inhg]
  (-> inhg
      (- 28.05)
      (/ 3.25)
      (* 110)
      (+ 950)))

(def min-pressure 28.5)
(def max-pressure 31.0)
(def pressure-range (- max-pressure min-pressure))

(def thresholds
  [0.0
   {:category        :inclement
    :wind-adjustment 4
    :temp-adjustment -7
    }
   0.30
   {:category        :poor
    :wind-adjustment 2
    :temp-adjustment -5}
   0.38
   {:category        :fair
    :wind-adjustment 1
    :temp-adjustment -2}
   0.45
   {:category        :sunny
    :wind-adjustment 0.5
    :temp-adjustment 0}
   1.0
   nil])

(defn categorize
  [pressure]
  (->> thresholds
       (partition-all 4 2)
       (map (fn [[low config high next]]
              (let [low-pressure (+ min-pressure (* low pressure-range))
                    high-pressure (+ min-pressure (* high pressure-range))]
                (when (<= low-pressure pressure high-pressure)
                  (assoc config
                         :val pressure
                         :next next
                         :proportion (/ (- pressure low-pressure)
                                        (- high-pressure low)))))))
       (some identity)))

(defn temperature
  [base {:keys [category next temp-adjustment proportion]}]
  (if next
    (+ base (math/interpolate temp-adjustment
                              (:temp-adjustment next)
                              (- 1 proportion)))
    base))

(defn weather
  ([x y t] (weather x y t 1))
  ([x y t seed]
   (let [t1               (long (Math/floor (+ t seed)))
         t2               (inc t1)
         pressure-fn      (fn [x y]
                            (->> (math/interpolate (math/fractal-field x y 32 (+ t1 0.01))
                                                   (math/fractal-field x y 32 (+ t2 0.01))
                                                   (mod (math/frac t) 1.0))
                                 (* (- max-pressure min-pressure))
                                 (+ min-pressure)
                                 (math/clamp min-pressure max-pressure)))
         pressure         (pressure-fn x y)
         info             (categorize pressure)
         [px' py' :as p'] (math/gradient x y pressure-fn 3 pressure)
         wind             (mapv #(* (:wind-adjustment info) pressure 20 %)
                                [py' (- px')])]
     {:category          (:category info)
      :pressure          pressure
      :wind              {:speed (math/magnitude wind)
                          :heading (math/heading wind)}
      :pressure-gradient p'
      :temperature       (temperature 22 info)
      :proportion        (:proportion info)
      :info              info})))


