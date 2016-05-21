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
   0.25
   {:category        :poor
    :wind-adjustment 2
    :temp-adjustment -5}
   0.35
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
                                        (- high-pressure low-pressure)))))))
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
         pressure-coarse  (fn [x y]
                            (math/interpolate (math/fractal-field x y 32 (+ t1 0.01) 16)
                                              (math/fractal-field x y 32 (+ t2 0.01) 16)
                                              (mod (math/frac t) 1.0)))
         pressure-fine     (fn [x y]
                             (math/interpolate (math/fractal-field x y 16 (+ t1 0.01) 1)
                                               (math/fractal-field x y 16 (+ t2 0.01) 1)
                                               (mod (math/frac t) 1.0)))
         pressure         (->> (+ (pressure-coarse x y) (/ (pressure-fine x y) 8))
                               (* (- max-pressure min-pressure))
                               (+ min-pressure)
                               (math/clamp min-pressure max-pressure))
         pressure-smoothed (fn [x y]
                             (->> (for [xoff [-2 -1 0 1 2]
                                        yoff [-2 -1 0 1 2]]
                                    (pressure-coarse (+ x xoff)
                                                     (+ y yoff)))
                                  (reduce +)))
         info             (categorize pressure)
         [px' py' :as p'] (math/gradient x y pressure-smoothed 1)
         wind             (math/rotate 90 p')
         ;; (mapv +
         ;;                        [0.02 0]
         ;;                        (math/gradient x y pressure-fn 1 pressure))
         #_(math/rotate 90 [(+ px' 0.02) py'])
         #_(->> p'
                (math/scale (* (:wind-adjustment info) pressure 80))
                ;;(math/rotate (* (pressure-fn* x y) 90))
                (math/rotate 90))]
     {:category          (:category info)
      :pressure          pressure
      :wind              {:speed (math/magnitude wind)
                          :heading (math/heading wind)}
      :pressure-gradient p'
      :temperature       (temperature 22 info)
      :proportion        (:proportion info)
      :info              info})))


(defn weather-grid
  [params]
  (let [{:keys [origin-x origin-y t x-cells y-cells feature-size]} params]
    (into (sorted-map)
          (for [x (range x-cells)
                y (range y-cells)]
            [[x y] (weather (/ (+ x origin-x) feature-size)
                            (/ (+ y origin-y) feature-size)
                            t)]))))
