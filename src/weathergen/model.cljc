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
    :wind-adjustment 40
    :temp-adjustment -7
    }
   0.27
   {:category        :poor
    :wind-adjustment 15
    :temp-adjustment -5}
   0.40
   {:category        :fair
    :wind-adjustment 10
    :temp-adjustment -2}
   0.60
   {:category        :sunny
    :wind-adjustment 5
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
         ;; pressure-coarse  (fn [x y]
         ;;                    (math/interpolate (math/fractal-field x y 32 (+ t1 0.01) 16)
         ;;                                      (math/fractal-field x y 32 (+ t2 0.01) 16)
         ;;                                      (mod (math/frac t) 1.0)))
         ;; pressure-fine     (fn [x y]
         ;;                     (math/interpolate (math/fractal-field x y 16 (+ t1 0.01) 1)
         ;;                                       (math/fractal-field x y 16 (+ t2 0.01) 1)
         ;;                                       (mod (math/frac t) 1.0)))
         ;; pressure         (->> (+ (pressure-coarse x y) (/ (pressure-fine x y) 8))
         ;;                       (* (- max-pressure min-pressure))
         ;;                       (+ min-pressure)
         ;;                       (math/clamp min-pressure max-pressure))
         ;; pressure-smoothed (fn [x y]
         ;;                     (->> (for [xoff [-2 -1 0 1 2]
         ;;                                yoff [-2 -1 0 1 2]]
         ;;                            (pressure-coarse (+ x xoff)
         ;;                                             (+ y yoff)))
         ;;                          (reduce +)))
         pressure-fn      (fn [x y]
                            (math/interpolate (math/fractal-field x y 32 (+ t1 0.01) 1)
                                              (math/fractal-field x y 32 (+ t2 0.01) 1)
                                              (mod (math/frac t) 1.0)))
         value            (pressure-fn x y)
         pressure         (->> value
                               (* (- max-pressure min-pressure))
                               (+ min-pressure)
                               (math/clamp min-pressure max-pressure))
         info             (categorize pressure)]
     {:category          (:category info)
      :value             value
      :pressure          pressure
      :temperature       (temperature 22 info)
      :proportion        (:proportion info)
      :info              info})))


    ;; TODO: wind
         ;;     [px' py' :as p'] (math/gradient x y pressure-fn 1)
         ;; wind             (->> p'
         ;;                       (math/rotate 60)
         ;;                       (math/scale (:wind-adjustment info))
;;                       (math/scale 1000))
      ;; :wind              {:speed (math/magnitude wind)
      ;;                     :heading (math/heading wind)}


(defn smooth-wind
  [window-size x-cells y-cells wind-grid]
  (if (zero? window-size)
    wind-grid
    (->> (for [x (range x-cells)
               y (range y-cells)]
           [[x y] (->> (for [x-offset (range (- window-size) (inc window-size))
                             y-offset (range (- window-size) (inc window-size))]
                         (get wind-grid [(+ x x-offset) (+ y y-offset)]))
                       (apply math/vector-add)
                       (math/scale (/ 1.0 (* window-size window-size))))])
         (into (sorted-map)))))


(def default-params
  {:origin-x 0
   :origin-y 0
   :feature-size 0.5
   :wind-strength 50.0
   :wind-pressure-constant 2
   :wind-smoothing-window 2})

(defn weather-grid
  [params]
  (let [params (merge default-params params)
        {:keys [origin-x origin-y t x-cells
                y-cells feature-size t
                wind-multiplier
                wind-strength
                wind-pressure-constant
                wind-smoothing-window]} params
        weather (into (sorted-map)
                      (for [x (range (- wind-smoothing-window)
                                     (+ x-cells (+ wind-smoothing-window 2)))
                            y (range (- wind-smoothing-window)
                                     (+ y-cells (+ wind-smoothing-window 2)))]
                        [[x y] (weather (/ (+ origin-x x) feature-size)
                                        (/ (+ origin-y y) feature-size)
                                        t)]))
        weather-fn (fn [x y] (get weather [x y]))
        wind (->> (for [x (range (- wind-smoothing-window)
                                 (+ x-cells (inc wind-smoothing-window)))
                        y (range (- wind-smoothing-window)
                                 (+ y-cells (inc wind-smoothing-window)))]
                    [x y])
                  (map (fn [[x y]]
                         (let [f (fn [v]
                                   (/ 1.0
                                      (+ wind-pressure-constant v)))
                               p0 (-> (weather-fn x y) :value f)
                               px (-> (weather-fn (inc x) y) :value f)
                               py (-> (weather-fn x (inc y)) :value f)
                               adj (get-in weather [[x y] :info :wind-adjustment])]
                           [[x y] (math/rotate
                                   60
                                   (math/scale
                                    (* adj wind-strength)
                                    [(- px p0) (- py p0)]))])))
                  (into (sorted-map))
                  (smooth-wind wind-smoothing-window x-cells y-cells))]
    (into (sorted-map)
          (for [x (range x-cells)
                y (range y-cells)
                :let [weather (-> (get weather [x y])
                                  (update :pressure math/nearest 0.01)
                                  (update :temperature math/nearest 1))
                      wind (let [v (get wind [x y])]
                             {:speed (math/nearest (math/magnitude v) 1)
                              :heading (math/nearest (math/heading v) 1)})]]
            [[x y] (assoc weather :wind wind)]))))

(comment
  (weather-grid {:origin-x (rand-int 100)
                 :origin-y (rand-int 100)
                 :x-cells 4
                 :y-cells 4
                 :feature-size 0.25
                 :t 1.5
                 :wind-strength 25.0
                 :wind-pressure-constant 0.2
                 :wind-smoothing-window 0})

  (smooth-wind 2 4 4 (into (sorted-map)
                           (for [x (range -2 11)
                                 y (range -2 11)]
                             [[x y] [(rand) (rand)]])))

  )
