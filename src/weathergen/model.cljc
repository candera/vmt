(ns weathergen.model
  "A library for modeling weather systems."
  (:require [weathergen.time :as time]
            [weathergen.math :as math]
            [org.craigandera.weathergen.pattern-space :as pat]))

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
  [x fade type-params min-pressure max-pressure]
  (let [pressure-span     (- max-pressure min-pressure)
        i                 (/ (- (get-in type-params [:inclement :pressure])
                                min-pressure)
                             pressure-span)
        p                 (/ (- (get-in type-params [:poor :pressure])
                                min-pressure)
                             pressure-span)
        f                 (/ (- (get-in type-params [:fair :pressure])
                                min-pressure)
                             pressure-span)
        s                 1
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
  (->> mixture
       (mapv (fn [[type weight]]
               (-> categories
                   (get type)
                   (get-in path)
                   (* weight))))
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

(defn perturb
  "Returns the perturbed coordinates of a point given:

   x, y, t - coordinates of sample position in pattern space.
   seed    - PNRG seed
   t-power - Strength of turbulence factor
   t-size  - Spatial size of turbulence field"
  [params]
  #_(println "perturb" params)
  (let [{:keys [::pat/x ::pat/y ::pat/t seed turbulence]} params
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

(defn in-area?
  "Return true if x*,y* is within the bounds of area."
  [{:keys [x y width height] :as bounds} x* y*]
  (and x y width height
       (<= x x*) (< x* (+ x width))
       (<= y y*) (< y* (+ y height))))

(defn stabilize-wind
  "Returns the wind, stabilized if appropriate by a wind stability region"
  [{:keys [wind-stability-areas x y]} pattern-wind]
  (as-> wind-stability-areas ?
    (filter #(in-area? (:bounds %) x y) ?)
    (first ?)
    (:wind ?)
    (or ? pattern-wind)))

(defn temperature
  [categories mixture v]
  (let [mean (mix-on categories mixture [:temp :mean])
        min  (mix-on categories mixture [:temp :min])
        max  (mix-on categories mixture [:temp :max])]
    (math/distribute v min mean max 1)))

(defn time-weight
  "Given a weather override and a time, determine how much of the
  override we should blend in based on the time."
  [override current-time]
  (let [{:keys [begin peak taper end animate?]} override
        bm (time/campaign-time->minutes begin)
        pm (time/campaign-time->minutes peak)
        tm (time/campaign-time->minutes taper)
        em (time/campaign-time->minutes end)
        t (time/campaign-time->minutes current-time)]
    (cond
      (not animate?) 1
      (< em t) 0
      (< tm t) (- 1 (-> t (- tm) (/ (- em tm))))
      (< pm t) 1
      (< bm t) (-> t (- bm) (/ (- pm bm)))
      :else 0)))

(defn override
  "Adjusts pressure value based on weather overrides, if any."
  [params v]
  (let [{:keys [x y t weather-overrides time]} params
        min-pressure (-> params :pressure :min)
        max-pressure (-> params :pressure :max)
        pressure-span (- max-pressure min-pressure)]
    (->> weather-overrides
         (reduce (fn [v override]
                   (let [{:keys [location
                                 radius
                                 falloff
                                 strength
                                 animate?]} override
                         locx (:x location)
                         locy (:y location)
                         dx (- locx x)
                         dy (- locy y)
                         d2 (+ (* dx dx) (* dy dy))
                         r2 (* radius radius)
                         fr falloff
                         f2 (* fr fr)
                         position-weight (cond
                                           (< d2 f2) 1
                                           (< d2 r2) (- 1
                                                        (-> d2
                                                            Math/sqrt
                                                            (- fr)
                                                            (/ (- radius falloff))))
                                           :else 0)
                         tw (time-weight override (:current time))
                         w (* position-weight tw strength)
                         v* (-> override
                                :pressure
                                (- min-pressure)
                                (/ pressure-span))]
                     (+ (* v* w) (* v (- 1 w)))))
                 v)
         (math/clamp 0.0 1.0))))

(defn weather
  "x and y are in cells"
  [{:keys [x y seed
           time
           origin
           evolution
           categories
           crossfade
           wind-uniformity
           prevailing-wind
           temp-uniformity
           pressure
           feature-size]
    :as params}]
  (let [[origin-x origin-y] origin
        x* (/ (+ origin-x x) feature-size)
        y* (/ (+ origin-y y) feature-size)
        ;; These next two values get computed over and over again. I
        ;; used to precompute them and pass them in, but that made for
        ;; a confusing API. Might need to find a way to have an
        ;; efficient precomputation mechanism during an optimization
        ;; pass.
        {:keys [offset current]} time
        t (+ offset (time/campaign-time->minutes current))
        ;; TODO: Why do we need this 10 here?
        t* (/ t evolution 10)
        max-pressure (:max pressure)
        min-pressure (:min pressure)
        params* (assoc params
                       ::pat/x x*
                       ::pat/y y*
                       ::pat/t t*)
        ;; TODO: Introduce some sort of vector/matrix abstraction
        ;; Although meh: just make it run on the GPU
        p         (perturb params*)
        value     (override params (pressure-pattern p))
        wind-dir  (wind-direction p value params*)
        pressure  (->> value
                       (* (- max-pressure min-pressure))
                       (+ min-pressure)
                       (math/clamp min-pressure max-pressure))
        mixture   (mix value
                       crossfade
                       categories
                       min-pressure
                       max-pressure)
        wind-var  (math/reject-tails wind-uniformity
                                     (smoothed-noise-field (* x* feature-size)
                                                           (* y* feature-size)
                                                           t*
                                                           (+ seed 17)
                                                           32))
        temp-var (math/reject-tails temp-uniformity
                                    (smoothed-noise-field (* x* feature-size)
                                                          (* y* feature-size)
                                                          t*
                                                          (+ seed 18)
                                                          32))]
    {:value       value
     :pressure    (math/nearest pressure 0.01)
     :mixture     mixture
     :type        (key (last (sort-by val mixture)))
     :temperature (temperature categories mixture temp-var)
     ;;:info        info
     :wind        (stabilize-wind params*
                                  {:heading (math/heading wind-dir)
                                   :speed (wind-speed categories mixture wind-var)})
     :wind-var    wind-var
     :wind-vec    wind-dir
     :p           p}))

(defn weather-grid
  [{:keys [map-fn cells origin time] :as params}]
  (let [;; This is so we can pass in pmap when we're in a non-CLJS context
        map-fn (or map-fn map)]
    (->>  (for [[x y] cells]
            [[x y] (assoc params
                          :x x
                          :y y)])
          (map-fn (fn [[[x y] params]]
                    [[x y] (weather params)]))
          (into (sorted-map)))))

(defn step
  "Returns an updated weather-params that has been moved in time and
  space according to movement-params by `steps`."
  [weather-params movement-params steps]
  (let [{:keys [step direction]} movement-params
        {:keys [speed heading]} direction
        delta-t (* steps step)]
    (-> weather-params
        (update-in
         [:time :current]
         time/add-minutes
         delta-t)
        (update
         :origin
         math/vector-add
         (->> [0 1]
              (math/rotate (- heading))
              (math/scale (* delta-t (/ speed 60 9))))))))

(defn forecast
  "Return a map, keyed by time, with the weather forecast for the
  given location. First forecast is for start time from weather
  params, with `steps` forecasts in total. Step size is as specified
  by movement params."
  [[x y] weather-params movement-params interval steps]
  (let [{:keys [seed time]} weather-params
        {:keys [offset current max]} time
        {:keys [direction step]} movement-params
        {:keys [heading speed]} direction
        ;;now (+ offset (time/campaign-time->minutes current))
        now (time/campaign-time->minutes current)
        max-t (when max (time/campaign-time->minutes max))
        weather-params* (update weather-params
                                :weather-overrides
                                #(remove :exclude-from-forecast? %))]
    (->> (for [t (into [now]
                       (map #(-> %
                                 inc
                                 (* interval)
                                 (+ now)
                                 (/ interval)
                                 long
                                 (* interval))
                            (range steps)))
               :let [dt (- t now)
                     [dx dy :as dpos] (->> [0 1]
                                           (math/rotate (- heading))
                                           (math/scale (* dt (/ speed 60 9))))]]
           [(time/minutes->campaign-time t)
            (-> (if (or (= t now)
                        (and max-t
                             (<= t max-t)))
                  weather-params
                  weather-params*)
                (assoc :x x :y y)
                (assoc-in [:time :current] (time/minutes->campaign-time t))
                (assoc-in [:time :offset] (- offset dt))
                (update :origin math/vector-add dpos)
                weather)])
         (into (sorted-map-by (fn [a b]
                                (compare (time/campaign-time->minutes a)
                                         (time/campaign-time->minutes b))))))))

(defn jump-to-time
  "Return a new weather params that has been moved to the specified
  time. Weather changes."
  [weather-params movement-params t]
  (let [{:keys [evolution direction]} movement-params
        {:keys [speed heading]} direction
        {:keys [time]} weather-params
        {:keys [current]} time
        delta-t (- (time/campaign-time->minutes t)
                   (time/campaign-time->minutes current))
        new (-> weather-params
                (update :origin
                        math/vector-add
                        (->> [0 1]
                             (math/rotate (- heading))
                             (math/scale (* delta-t (/ speed 60 9)))))
                (assoc-in [:time :current]
                          t))]
    (println :new new)
    new))

(defn set-time
  "Adjust the time coordinate so that the current time is adjusted to
  match the provided time without changing the location in weather
  space."
  [weather-params time]
  (let [offset (get-in weather-params [:time :offset])
        current-time (get-in weather-params [:time :current])
        delta (- (time/campaign-time->minutes current-time)
                 (time/campaign-time->minutes time))]
    (-> weather-params
        (update-in
         [:time :offset]
         +
         delta)
        (assoc-in
         [:time :current]
         time))))

;;; Migrations

(defn upgrade-pressure-threshold
  "Performs the upgrade from the weight-based thresholds to explicit
  pressure thresholds."
  [params]
  (let [min-pressure  (get-in params [:weather-params :pressure :min])
        max-pressure  (get-in params [:weather-params :pressure :max])
        pressure-span (- max-pressure min-pressure)
        normalize     (fn [relative]
                        (+ min-pressure
                           (* relative pressure-span)))
        cumulative    (->> types
                           (map #(get-in params [:weather-params :categories % :weight]))
                           (reductions +))
        total         (last cumulative)
        thresholds    (zipmap types
                              (map #(-> %
                                        (/ total)
                                        (* pressure-span)
                                        (+ min-pressure)
                                        (math/nearest 0.01))
                                   cumulative))]
    (reduce (fn [params type]
              (assoc-in params
                        [:weather-params :categories type :pressure]
                        (thresholds type)))
            params
            types)))

(defn upgrade
  [{:keys [revision] :as params} new-revision]
  (when (< revision 8)
    (throw (ex-info "This version of VMT cannot be used to load weather files from prior versions - file format changes in BMS 4.34 resulted in incompatibilities. You will need to ask the mission creator for a new briefing file."
                    {:omit-stack-trace? true})))
  (cond-> params
    (< revision 7) upgrade-pressure-threshold
    :always (assoc :revision new-revision)))

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
                  :cell-count      [4 4]
                  :feature-size    10
                  :turbulence       {:size 1
                                     :power 30}
                  :pressure        {:min  28.5
                                    :max  31.0}
                  :prevailing-wind {:heading 45}
                  :crossfade       0.1
                  :wind-uniformity 0.7
                  :temp-uniformity 0.7
                  :wind-stability-areas [[0 0 1 1]]
                  :categories      {:sunny     {:wind   {:min  0
                                                         :mean 10
                                                         :max  20}
                                                :temp   {:min  0
                                                         :mean 10
                                                         :max  20}}
                                    :fair      {:pressure 29.95
                                                :wind   {:min  5
                                                         :mean 15
                                                         :max  25}
                                                :temp   {:min  0

                                                         :mean 10
                                                         :max  20}}
                                    :poor      {:pressure 29.1
                                                :wind   {:min  15
                                                         :mean 25
                                                         :max  45}
                                                :temp   {:min  0
                                                         :mean 10
                                                         :max  20}}
                                    :inclement {:pressure 28.7
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

  ( ;;clojure.pprint/pprint
   def f
   (forecast [10 10]
             {:origin          [(* 100 (rand))
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
              :wind-stability-areas [[0 0 1 1]]
              :categories      {:sunny     {:wind   {:min  0
                                                     :mean 10
                                                     :max  20}
                                            :temp   {:min  0
                                                     :mean 10
                                                     :max  20}}
                                :fair      {:pressure 29.95
                                            :wind   {:min  5
                                                     :mean 15
                                                     :max  25}
                                            :temp   {:min  0

                                                     :mean 10
                                                     :max  20}}
                                :poor      {:pressure 29.1
                                            :wind   {:min  15
                                                     :mean 25
                                                     :max  45}
                                            :temp   {:min  0
                                                     :mean 10
                                                     :max  20}}
                                :inclement {:pressure 28.7
                                            :wind   {:min 25
                                                     :mean 40
                                                     :max 80}
                                            :temp   {:min  0
                                                     :mean 10
                                                     :max  20}}}}
             {:step 60
              :start {:day 1 :hour 5 :minute 0}
              :current {:day 1 :hour 5 :minute 0}
              :direction {:heading 135 :speed 30}}
             10
             ))

  (weather-grid @weathergen.quil/state)
  )
