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

#_(def thresholds
  [0.0
   {:category        :inclement
    :wind-adjustment 40
    :temp-adjustment -7
    }
   0.10
   {:category        :poor
    :wind-adjustment 15
    :temp-adjustment -5}
   0.30
   {:category        :fair
    :wind-adjustment 10
    :temp-adjustment -2}
   0.90
   {:category        :sunny
    :wind-adjustment 5
    :temp-adjustment 0}
   1.0
   nil])

(defn categorize
  [x {:keys [categories] :as params}]
  (let [cumulative  (->> categories
                         (map :weight)
                         (reductions +))
        total       (double (last cumulative))
        cumulative* (map #(/ % total) cumulative)
        c*          (map #(assoc %1 :range [%2 %3])
                         categories
                         (concat [0] cumulative*)
                         (concat cumulative* [1]))]
    (->> c*
         (filter (fn [{:keys [range]}]
                   (let [[to from] range]
                     (<= to x from))))
         first)))

(defn temperature
  [base {:keys [category next temp-adjustment proportion]}]
  (if next
    (+ base (math/interpolate temp-adjustment
                              (:temp-adjustment next)
                              (- 1 proportion)))
    base))

(defn turbulent-field
  "Returns the perturbed coordinates of a point given:

   x, y, t - space and time coordinates of sample position.
   seed    - PNRG seed
   t-power - Strength of turbulence factor
   t-size  - Spatial size of turbulence field"
  [params]
  (let [{:keys [x y t seed fxy turbulence]} (merge {:x       0
                                                    :y       0
                                                    :t       0
                                                    :seed    1
                                                    :turbulence {:power 0
                                                                 :size  1}}
                                                   params)
        t-power (:power turbulence)
        t-size (:size turbulence)
        x* (/ x t-size)
        y* (/ y t-size)
        t* (long (Math/floor (+ t seed)))
        x-turbulence (- (math/interpolate (math/fractal-field x*
                                                              y*
                                                              32
                                                              (+ t* 0.01) 1)
                                          (math/fractal-field x*
                                                              y*
                                                              32
                                                              (+ t* 1.01) 1)
                                          (mod (math/frac t) 1.0))
                        0.5)
        y-turbulence (- (math/interpolate (math/fractal-field x*
                                                              y*
                                                              32
                                                              (+ t* 2.01) 1)
                                          (math/fractal-field x*
                                                              y*
                                                              32
                                                              (+ t* 3.01) 1)
                                          (mod (math/frac t) 1.0))
                        0.5)]
    [(+ (* t-power x-turbulence) x)
     (+ (* t-power y-turbulence) y)]))

;; A checkerboard pattern of high and low pressure "cells"
(defn pressure-pattern
  [x y]
  (let [;; spacing 2
        ;; x* (- (mod (+ x 1) 2) 1)
        ;; y* (- (mod (+ y 1) 2) 1)
        c1 1
        v  (+ (* (Math/sin x)
                 (Math/sin y))
              (* c1
                 (Math/sin (/ x 3))
                 (Math/sin (/ y 3))))
        #_(* #_(Math/sin x)
             #_(Math/cos (* x 1.1))
             (Math/sin (+ x (* 4 y)))
             (Math/cos (+ (* 4 x) y))
             #_(Math/sin (/ y 2))
             (Math/cos (* #_Math/PI (+ x* y*)))
             (Math/cos (* #_Math/PI (- y* x*)))
             )]
    (-> v (+ 1 c1) (/ (+ 2 (* 2 c1))))))

;; Spiral
#_(defn pressure-pattern
  [x y]
  (let [theta (Math/atan2 x y)
        r (Math/sqrt (+ (* x x) (* y y)))]
    (-> (+ r (* 4 theta))
        (/ 1)
        Math/sin
        (+ 1)
        (/ 2))))

;; Lines
#_(defn pressure-pattern
  [x y]
  (-> (+ x y)
      Math/sin
      (* (Math/sin (- (* 3 x) (* 2 y))))
      (* (Math/sin (+ (* 7 x) (* 5 y))))
      (+ 1)
      (/ 2)))

;; TODO: Set the wind strength according to the category
(defn wind-pattern
  [x y v]
  (let [c1 1]
    (->> [(+ (* (Math/cos x)
                (Math/sin y))
             (* c1
                (/ 1 3)
                (Math/cos (/ x 3))
                (Math/sin (/ y 3))))
          (+ (* (Math/sin x)
                (Math/cos y))
             (* c1
                (/ 1 3)
                (Math/sin (/ x 3))
                (Math/cos (/ y 3))))]
         math/normalize
         (math/rotate 90))))

(defn weather
  [{:keys [x y t seed turbulence max-pressure min-pressure] :as params}]
  (let [delta     100.0000010
        ;; TODO: Introduce some sort of vector/matrix abstraction
        ;; Although meh: just make it run on the GPU
        [x0 y0]   (turbulent-field params)
        value     (pressure-pattern x0 y0)
        w         (wind-pattern x0 y0 value)
        [wx wy]   w
        pressure  (->> value
                       (* (- max-pressure min-pressure))
                       (+ min-pressure)
                       (math/clamp min-pressure max-pressure))
        info      (categorize value params)]
    {:value       value
     :pressure    (math/nearest pressure 0.01)
     :temperature (math/nearest (temperature 22 info) 1)
     :info        info
     :wind        {:heading (math/nearest (math/heading w) 1)
                   :speed (math/nearest (* (math/magnitude w) 10) 1)}
     :wind-pattern w
     :wind-vec    w
     :p           [x0 y0]}))

(defn weather-grid
  [params]
  (let [{:keys [origin t size feature-size turbulence categories]} params
        [origin-x origin-y] origin
        [width height] size]
    (into (sorted-map)
          (for [x (range width)
                y (range height)]
            [[x y] (-> (weather (-> params
                                    (assoc :x (/ (+ origin-x x) feature-size))
                                    (assoc :y (/ (+ origin-y y) feature-size)))))]))))

(comment
  (weather-grid {:origin [(* 100 (rand))
                          (* 100 (rand))]
                 :t 1.5
                 :size [4 4]
                 :feature-size 10
                 :turblence {:size 1
                             :power 30}
                 :min-pressure 28.5
                 :max-pressure 31.0
                 :categories [{:type :sunny
                               :weight 5}
                              {:type :fair
                               :weight 3}
                              {:type :poor
                               :weight 1}
                              {:type :inclement
                               :weight 1}]})



  )
