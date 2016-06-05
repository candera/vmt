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

(def types [:inclement :poor :fair :sunny])

(defn mix
  [x fade type-params]
  (let [cumulative        (->> types
                               (map #(get-in type-params [% :weight]))
                               (reductions +))
        total             (last cumulative)
        [i p f s]         (map #(/ % total) cumulative)
        contour           [[0                           [1 0 0 0]]
                           [(* (- 1 fade) i)            [1 0 0 0]]
                           [(math/interpolate i p fade) [0 1 0 0]]
                           [(math/interpolate p i fade) [0 1 0 0]]
                           [(math/interpolate p f fade) [0 0 1 0]]
                           [(math/interpolate f p fade) [0 0 1 0]]
                           [(- 1 fade)                  [0 0 0 1]]
                           [1                           [0 0 0 1]]]
        [[x1 v1] [x2 v2]] (->> contour
                               (partition 2 1)
                               (filter (fn [[[low] [high]]] (<= low x high)))
                               first)]
    (zipmap types
            (math/vector-interpolate v1 v2 x x1 x2))))

(defn mix-on
  [categories mixture path]
  (->> (for [[type weight] mixture]
         (* weight (get-in categories (into [type] path))))
       (reduce +)))

(defn temperature
  [base {:keys [category next temp-adjustment proportion]}]
  (if next
    (+ base (math/interpolate temp-adjustment
                              (:temp-adjustment next)
                              (- 1 proportion)))
    base))

(defn smoothed-noise-field
  [x y t seed zoom]
  #_(println :x x :y y :t t :seed seed :zoom zoom)
  (let [t* (long (Math/floor (+ t seed)))]
    (math/interpolate (math/fractal-field x
                                          y
                                          zoom
                                          (+ t* 0.01) 1)
                      (math/fractal-field x
                                          y
                                          zoom
                                          (+ t* 1.01) 1)
                      (mod (math/frac t) 1.0))))

(defn perturb
  "Returns the perturbed coordinates of a point given:

   x, y, t - space and time coordinates of sample position.
   seed    - PNRG seed
   t-power - Strength of turbulence factor
   t-size  - Spatial size of turbulence field"
  [params]
  #_(println "perturb" params)
  (let [{:keys [x y t seed turbulence]} (merge {:x       0
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
        x-turbulence (smoothed-noise-field x* y* t seed 32)
        y-turbulence (smoothed-noise-field x* y* (+ t 16) seed 32)]
    [(+ (* t-power x-turbulence) x)
     (+ (* t-power y-turbulence) y)]))

;; A checkerboard pattern of high and low pressure "cells"
(defn pressure-pattern
  [[x y]]
  (let [v  (+ (* (Math/sin x)
                 (Math/sin y))
              (* (Math/sin (/ x 3))
                 (Math/sin (/ y 3))))]
    (-> v (+ 2) (/ 4))))

;; TODO: Set the wind strength according to the category
(defn wind-direction
  [[x y] v params]
  (let [h (get-in params [:prevailing-wind :heading])
        w0 (->> [(+ (* (Math/cos x)
                       (Math/sin y))
                    (* (/ 1.0 3)
                       (Math/cos (/ x 3))
                       (Math/sin (/ y 3))))
                 (+ (* (Math/sin x)
                       (Math/cos y))
                    (* (/ 1.0 3)
                       (Math/sin (/ x 3))
                       (Math/cos (/ y 3))))]
                math/normalize
                (math/rotate 90))
        w1 (math/rotate (- h) [0 1])
        c (-> v (- 0.5) Math/abs)]
    (math/normalize
     (math/vector-interpolate w1 w0
                              c
                              0 0.5))))

(defn wind-speed
  [categories mixture v]
  (let [mean (mix-on categories mixture [:wind :mean])
        min  (mix-on categories mixture [:wind :min])
        max  (mix-on categories mixture [:wind :max])]
    (math/distribute v min mean max 1)))

(defn weather
  [{:keys [x y t seed categories crossfade turbulence wind-uniformity
           max-pressure min-pressure feature-size]
    :or {seed 1}
    :as params}]
  #_(println "weather" :x x :y y :t t :seed seed)
  (let [delta     100.0000010
        ;; TODO: Introduce some sort of vector/matrix abstraction
        ;; Although meh: just make it run on the GPU
        p         (perturb params)
        value     (pressure-pattern p)
        wind-dir  (wind-direction p value params)
        pressure  (->> value
                       (* (- max-pressure min-pressure))
                       (+ min-pressure)
                       (math/clamp min-pressure max-pressure))
        mixture   (mix value crossfade categories)
        wind-var  (math/reject-tails wind-uniformity
                                     (smoothed-noise-field (* x feature-size)
                                                           (* y feature-size)
                                                           t
                                                           (+ seed 17)
                                                           32))]
    #_(println :p p
               :wind-dir wind-dir
               :pressure pressure
               :mixture mixture
               :categories categories
               :wind-var wind-var)
    {:value       value
     :pressure    (math/nearest pressure 0.01)
     :mixture     mixture
     :type        (key (last (sort-by val mixture)))
     ;;:temperature (math/nearest (temperature 22 info) 1)
     ;;:info        info
     :wind        {:heading (math/heading wind-dir)
                   :speed (wind-speed categories mixture wind-var)}
     :wind-var    wind-var
     :wind-vec    wind-dir
     :p           p}))

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
  (clojure.pprint/pprint
   (weather-grid {:origin          [(* 100 (rand))
                                    (* 100 (rand))]
                  :t               1.5
                  :size            [4 4]
                  :feature-size    10
                  :turblence       {:size 1
                                    :power 30}
                  :min-pressure    28.5
                  :max-pressure    31.0
                  :prevailing-wind {:heading 45}
                  :crossfade       0.1
                  :wind-spread     1.25
                  :categories      {:sunny     {:weight 5
                                                :wind   {:min  0
                                                         :mean 10
                                                         :max  20}}
                                    :fair      {:weight 3
                                                :wind   {:min  5
                                                         :mean 15
                                                         :max  25}}
                                    :poor      {:weight 1
                                                :wind   {:min  15
                                                         :mean 25
                                                         :max  45}}
                                    :inclement {:weight 1
                                                :wind {:min 25
                                                       :mean 40
                                                       :max 80}}}}))



  (weather-grid @weathergen.quil/state)
  )
