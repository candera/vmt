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
  #_(println "mix-on" :categories categories :mixture mixture :path path)
  (->> (for [[type weight] mixture]
         (* weight (get-in categories (into [type] path))))
       (reduce +)))

(defn smoothed-noise-field
  [x y t seed zoom]
  #_(println "smoothed-noise-field" :x x :y y :t t :seed seed :zoom zoom)
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

(defn minutes->falcon-time
  [min]
  (let [d (-> min (/ 24 60) Math/floor int)
        h (-> min (mod (* 24 60)) (/ 60) Math/floor int)
        m (-> min (mod 60) Math/floor int)]
    {:day (inc d)
     :hour h
     :minute m}))

(defn falcon-time->minutes
  "Converts from Falcon time to a weather-space time coordinate."
  [t]
  (let [{:keys [day hour minute]} t]
    (-> day dec (* 24) (+ hour) (* 60) (+ minute))))

(defn add-time
  "Adds minutes to a Falcon time map."
  [t min]
  (-> t falcon-time->minutes (+ min) minutes->falcon-time))

(defn perturb
  "Returns the perturbed coordinates of a point given:

   x, y, t - space and time coordinates of sample position.
   seed    - PNRG seed
   t-power - Strength of turbulence factor
   t-size  - Spatial size of turbulence field"
  [params]
  #_(println "perturb" params)
  (let [{:keys [x y t seed turbulence]} params
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

;; TODO: move to this more general model, in which we categorize the
;; underlying shape via numeric parameters. Some of the order-4 random
;; ones are much more pleasing than the one above.
#_(let [n 4
      params (repeatedly (* n 3) rand)]
  (println n params)
  (defn pressure-pattern
    [[x y]]
    (let [[as vs] (->> (for [[a bx by] (partition 3 params)]
                         [a (* a
                               (Math/sin (* bx x))
                               (Math/sin (* by y)))])
                       (reduce math/vector-add))]
      (-> vs (+ as) (/ 2 as)))))

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
        w1 (math/rotate h [0 1])
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

(defn temperature
  [categories mixture v]
  (let [mean (mix-on categories mixture [:temp :mean])
        min  (mix-on categories mixture [:temp :min])
        max  (mix-on categories mixture [:temp :max])]
    (math/distribute v min mean max 1)))

(defn weather
  [{:keys [x y t seed
           categories
           crossfade
           wind-uniformity
           temp-uniformity
           pressure
           feature-size]
    :as params}]
  (let [max-pressure (:max pressure)
        min-pressure (:min pressure)
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
                                                           32))
        temp-var (math/reject-tails temp-uniformity
                                    (smoothed-noise-field (* x feature-size)
                                                          (* y feature-size)
                                                          t
                                                          (+ seed 18)
                                                          32))]
    {:value       value
     :pressure    (math/nearest pressure 0.01)
     :mixture     mixture
     :type        (key (last (sort-by val mixture)))
     :temperature (temperature categories mixture temp-var)
     ;;:info        info
     :wind        {:heading (math/heading wind-dir)
                   :speed (wind-speed categories mixture wind-var)}
     :wind-var    wind-var
     :wind-vec    wind-dir
     :p           p}))

(defn weather-grid
  [params]
  (let [{:keys [origin size feature-size time direction map-fn]} params
        {:keys [heading speed]} direction
        {:keys [current start offset evolution]} time
        [origin-x origin-y] origin
        [width height] size
        delta-t (-> (falcon-time->minutes current)
                    (- (falcon-time->minutes start))
                    (+ offset))
        [x-off y-off] (-> (->> [0 1]
                               (math/rotate (- heading))
                               (math/scale (* delta-t (/ speed 60 9)))))
        ;; This is so we can pass in pmap when we're in a non-CLJS context
        map-fn (or map-fn map)]
    (->>  (for [x (range width)
                y (range height)
                :let []]
            [[x y] (-> params
                       (assoc :x (/ (+ origin-x x x-off) feature-size))
                       (assoc :y (/ (+ origin-y y y-off) feature-size))
                       ;; TODO: Why do we need this 10 here?
                       (assoc :t (/ delta-t evolution 10)))])
          (map-fn (fn [[[x y] params]]
                    [[x y] (weather params)]))
          (into (sorted-map)))))

(defn step
  "Returns an updated weather-params that has been moved in time
  according to movement-params by `steps`."
  [weather-params movement-params steps]
  (let [{:keys [step]} movement-params
        delta-t        (* steps step)]
    (update-in weather-params
               [:time :current]
               add-time
               delta-t)))

(comment
  (clojure.pprint/pprint
   (weather-grid {:origin          [(* 100 (rand))
                                    (* 100 (rand))]
                  :time            {:offset 1234
                                    :start {:day 1 :hour 5 :minute 0}
                                    :current {:day 1 :hour 13 :minute 30}
                                    :evolution 600}
                  :direction       {:speed 30 :heading 135}
                  :seed            1
                  :size            [4 4]
                  :feature-size    10
                  :turbulence       {:size 1
                                     :power 30}
                  :pressure        {:min  28.5
                                    :max  31.0}
                  :prevailing-wind {:heading 45}
                  :crossfade       0.1
                  :wind-uniformity 0.7
                  :temp-uniformity 0.7
                  :categories      {:sunny     {:weight 5
                                                :wind   {:min  0
                                                         :mean 10
                                                         :max  20}
                                                :temp   {:min  0
                                                         :mean 10
                                                         :max  20}}
                                    :fair      {:weight 3
                                                :wind   {:min  5
                                                         :mean 15
                                                         :max  25}
                                                :temp   {:min  0
                                                         :mean 10
                                                         :max  20}}
                                    :poor      {:weight 1
                                                :wind   {:min  15
                                                         :mean 25
                                                         :max  45}
                                                :temp   {:min  0
                                                         :mean 10
                                                         :max  20}}
                                    :inclement {:weight 1
                                                :wind   {:min 25
                                                         :mean 40
                                                         :max 80}
                                                :temp   {:min  0
                                                         :mean 10
                                                         :max  20}}}}))

  (clojure.pprint/pprint
   (step {:origin [1 2]
          :time {:offset 345
                 :current {:day 1 :hour 13 :minute 30}}}
         {:step 60
          :start {:day 1 :hour 5 :minute 0}
          :direction {:heading 135 :speed 30}}
         1))



  (weather-grid @weathergen.quil/state)
  )
