(ns scratch)

(require '[weathergen.fmap :as fmap])
(require '[weathergen.model :as model])

(->> "/tmp/TR433_13_AGM65.fmap"
     clojure.java.io/input-stream
     (fmap/read-fmap)
     :weather
     vals
     (map :wind)
     (map :speed)
     (reduce max))

(->> (for [x (range 100) y (range 100) t (range 5)]
       (model/weather x y t))
     (map :wind)
     (map :heading)
     (map long)
     frequencies
     (into (sorted-map)))

(->> "/tmp/Stormcells.fmap"
     clojure.java.io/input-stream
     (fmap/read-fmap)
     :weather
     vals
     (map :wind)
     ;;(map :heading)
     (map :speed)
     frequencies)

(->> "/tmp/Stormcells.fmap"
     clojure.java.io/input-stream
     (fmap/read-fmap)
     :weather
     vals
     (map :pressure)
     frequencies
     (into (sorted-map)))
;; => {28.936363636363637 54,
;; 29.40909090909091 226,
;; 29.675 718,
;; 29.970454545454547 1348,
;; 30.236363636363638 1069,
;; 30.413636363636364 66}

(->> (for [x (range 100) y (range 100) t (range 5)]
       (model/weather x y t))
     (map :wind)
     (map :speed)
     (map #(* % 5))
     (map long)
     (map #(/ % 5.0))
     frequencies
     (into (sorted-map)))

(->> "/tmp/Stormcells.fmap"
     clojure.java.io/input-stream
     (fmap/read-fmap)
     :weather
     vals
     (map :temperature)
     frequencies
     (into (sorted-map)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(require '[weathergen.model :as model])
(require '[weathergen.math :as math])
(let [origin-x 0
      origin-y 0
      x-cells 1
      y-cells 1
      feature-size 0.25
      t 1.5
      weather (into (sorted-map)
                    (for [x (range -1 (+ x-cells 2))
                          y (range -1 (+ y-cells 2))]
                      [[x y] (model/weather (/ (+ x origin-x) feature-size)
                                            (/ (+ y origin-y) feature-size)
                                            t)]))
      weather-fn (fn [x y] (get weather [x y]))
      pressure-fn (fn [x y] (get-in weather [[x y] :pressure]))
      wind (->> (for [x (range x-cells)
                      y (range y-cells)]
                  {:x x
                   :y y
                   :v (map -
                           (math/gradient x y pressure-fn 1)
                           (math/gradient x y pressure-fn -1))})
                (map (fn [{:keys [x y v]}]
                       {:x x
                        :y y
                        :v (math/scale (get-in weather [[x y] :info :wind-adjustment]) v)}))
                (map (fn [{:keys [x y v]}]
                       [[x y] {:speed (math/magnitude v)
                               :heading (math/heading v)}]))
                (into (sorted-map)))]
  (->> (merge-with (fn [weather wind]
                     (merge weather {:wind wind}))
                   weather
                   wind)
))


(map (fn [speed]
       (let [effective (weathergen.math/nearest speed 5)
             ticks (int (/ effective 5))]
         {:speed speed
          :effective effective
          :full (int (/ ticks 2))
          :half? (odd? ticks)
          :ticks ticks}))
     (range 20))

(require '[weathergen.model :as model])
(require '[weathergen.math :as math])
(def x (model/weather-grid {:origin-x 0
                            :origin-y 0
                            :t 0.01
                            :x-cells 59
                            :y-cells 59
                            :feature-size 0.25
                            :wind-pressure-constant 2
                            :wind-smoothing-window 0
                            :wind-strength 50.0}))


(require '[clojure.pprint :as pprint])
(let [f #_(fn [x y t]
            (model/field2 {:x x :y y :t t
                           :t-power 15
                           ;;:t-power 0
                           :t-size 0.05
                           :fxy (fn [x y]
                                  (* (Math/sin (/ x 1.3))
                                     (Math/sin (/ y 2.2))
                                     (* (Math/abs (- (mod x 2) 1))
                                        (Math/abs (- (mod y 2) 1)))))
                           ;;:fxy (constantly 0)
                           :fv (fn [v]
                                 (let [v1 (-> v Math/sin (+ 1) (/ 2))
                                       v2 (- v1 0.5)
                                       v3 (* v2 v2 v2)]
                                   (-> v3 (* 4) (+ 0.5))
                                   ;;(Math/sqrt v1)
                                   ))
                           ;;:fv identity
                           }))
      #_(fn [x y t]
          (* (Math/sin (/ x 1.3))
             (Math/sin (/ y 2.2))
             (* (Math/abs (- (mod x 2) 1))
                (Math/abs (- (mod y 2) 1)))))
      (fn [x y t]
        (model/field2 {:x x :y y :t t
                       :t-power 15
                       ;;:t-power 0
                       :t-size 0.05
                       :fxy (fn [x y]
                              (-> (* (Math/sin (/ x 1.3))
                                     (Math/sin (/ y 2.2))
                                     (* (Math/abs (- (mod x 2) 1))
                                        (Math/abs (- (mod y 2) 1))))
                                  (+ 1)
                                  (/ 2)))
                       ;;:fxy (constantly 0)
                       ;; :fv (fn [v]
                       ;;       (let [v1 (-> v Math/sin (+ 1) (/ 2))
                       ;;             v2 (- v1 0.5)
                       ;;             v3 (* v2 v2 v2)]
                       ;;         ;;(-> v3 (* 4) (+ 0.5))
                       ;;         ;;(Math/sqrt v1)
                       ;;         v1
                       ;;         ))
                       :fv identity
                       }))
      n 1000]
  (->>
   (for [_ (range n)]
     (let [x (* (rand) 100)
           y (* (rand) 100)
           t (* (rand) 100)]
       (f x y t)
       ))
   (map #(math/nearest % 0.1))
   frequencies
   (into (sorted-map))
   pprint/pprint))



(require '[weathergen.math :as math])
(let [fxy (fn [x y]
            (let [x* (- (mod (+ x 1) 2) 1)
                  y* (- (mod (+ y 1) 2) 1)]
             {:v (-> (* ;;(Math/sin (/ x 1.3))
                      ;;(Math/sin (/ y 2.2))
                      (Math/cos (* Math/PI x*))
                      (Math/cos (* Math/PI y*)))
                     (+ 1)
                     (/ 2)
                     )
              :g [x* y*]}))]
  (map (fn [[x y]]
         [[x y] (fxy x y)])
       [[0 0]
        [0.5 0]
        [0 -0.5]
        [-1 -1]
        [1 1]
        [2 2]
        [1.9 2.5]]))

(let [fxy (fn [x y]
            (let [x* (- (mod (+ x 1) 2) 1)
                  y* (- (mod (+ y 1) 2) 1)
                  v (* ;;(Math/sin (/ x 1.3))
                     ;;(Math/sin (/ y 2.2))
                     (Math/cos (* Math/PI x*))
                     (Math/cos (* Math/PI y*))
                     #_(* (Math/signum (double x*))
                          (Math/signum (double y*)))
                     )]
              {:v (-> v (+ 1) (/ 2))
               :g (->> [(* (Math/sin (* Math/PI x*))
                           (Math/cos (* Math/PI y*)))
                        (* (Math/cos (* Math/PI x*))
                           (Math/sin (* Math/PI y*)))]
                       math/normalize
                       (math/scale (+ 0.5 (Math/abs v)))
                       (math/scale 4)
                       ;;(math/rotate 90)
                       )}))]
  (map (fn [[x y]]
         [[x y] (fxy x y)])
       [[0 0]
        [0.5 0]
        [-0.5 0]
        [0.5 0.5]
        [-0.5 0.5]
        [-0.5 -0.5]
        [0.5 -0.5]]))


(let [x 10
      y 10
      xoff 5
      yoff -5
      x1 x
      y1 y
      x2 (+ x xoff)
      y2 (+ y yoff)
      xm (math/interpolate x1 x2 0.5)
      ym (math/interpolate y1 y2 0.5)]
  {:line1 [x1 y1 xm ym]
   :line2 [xm ym x2 y2]})

(require '[weathergen.math :as math])
(require '[weathergen.model :as model])
(let [x (rand-int 100)
      y (rand-int 100)
      t (rand-int 100)
      origin-x (rand-int 100)
      origin-y (rand-int 100)
      zoom 0.05
      x* (* (+ x origin-x) zoom)
      y* (* (+ y origin-y) zoom)
      fxy (fn [x y]
            (let [x* (- (mod (+ x 1) 2) 1)
                  y* (- (mod (+ y 1) 2) 1)
                  v (* (Math/sin (/ x 1.3))
                       (Math/sin (/ y 2.2))
                       (Math/cos (* Math/PI x*))
                       (Math/cos (* Math/PI y*)))]
              {:v (-> v (+ 1) (/ 2))
               :w (->> [(* (Math/sin (* Math/PI x*))
                           (Math/cos (* Math/PI y*)))
                        (* (Math/cos (* Math/PI x*))
                           (Math/sin (* Math/PI y*)))]
                       math/normalize
                       (math/scale (+ 0.5 (Math/abs v)))
                       (math/scale 0.75)
                       (math/rotate (+ 80 (* 20 v))))}))
      t-power 10
      t-size 0.05
      delta 0.001
      [x0 y0] (model/field2 {:x x*
                             :y y*
                             :t t
                             :t-power t-power
                             :t-size t-size})
      [xx yx] (model/field2 {:x (+ x* delta)
                             :y y*
                             :t t
                             :t-power t-power
                             :t-size t-size})
      [xy yy] (model/field2 {:x x*
                             :y (+ y* delta)
                             :t t
                             :t-power t-power
                             :t-size t-size})
      [dxx dyx] [(/ (- xx x0) delta) (/ (- yx y0) delta)]
      [dxy dyy] [(/ (- xy x0) delta) (/ (- yy y0) delta)]
      {:keys [v w]} (fxy x0 y0)
      [wx wy] w
      [wx* wy*] [(+ (* wx dxx) (* wy dyx))
                 (+ (* wx dxy) (* wy dyy))]
      ]
  {:x x
   :y y
   :t t
   :w [wx wy]
   :w* [wx* wy*]
   })


(swap! weathergen.quil/state assoc :size [100 100])

(swap! weathergen.quil/state assoc-in [:turbulence :power] 100)
(swap! weathergen.quil/state assoc-in [:turbulence :size] 1)

(swap! weathergen.quil/state assoc :feature-size 100)
(swap! weathergen.quil/state assoc :origin [(rand-int 10000) (rand-int 10000)])
(swap! weathergen.quil/state
       assoc
       :origin [0 0]
       :direction [0 0]
       :turbulence {:power 0
                    :size 0.1})

(swap! weathergen.quil/state update :evolution * 0.75)
(swap! weathergen.quil/state assoc :evolution 0.01)
(swap! weathergen.quil/state assoc :direction [1 1])

(swap! weathergen.quil/state
       assoc-in
       [:prevailing-wind :heading] (rand-int 360))

(swap! weathergen.quil/state
       assoc-in
       [:display :text] :none)

(swap! weathergen.quil/state
       assoc-in
       [:display :wind?] false)

(swap! weathergen.quil/state
       assoc-in
       [:display :text] :none)

(swap! weathergen.quil/state
       assoc-in
       [:display :color] :type)

(swap! weathergen.quil/state
       assoc
       :wind-uniformity 0.4)

(swap! weathergen.quil/state
       assoc
       :wind-spread 0.3
       :crossfade 0.25
       :categories
       {:sunny     {:weight 10, :wind {:min 0, :mean 7, :max 20}},
        :fair      {:weight 1, :wind {:min 5, :mean 10, :max 30}},
        :poor      {:weight 5, :wind {:min 15, :mean 25, :max 45}},
        :inclement {:weight 2, :wind {:min 25, :mean 40, :max 80}}})

(swap! weathergen.quil/state
       assoc
       :categories
       {:sunny {:weight 20,
                :wind {:min 0, :mean 7, :max 20},
                :temp {:min 20, :mean 22, :max 24}},
        :fair {:weight 0.2,
               :wind {:min 5, :mean 10, :max 30},
               :temp {:min 18, :mean 21, :max 23}},
        :poor {:weight 4,
               :wind {:min 15, :mean 25, :max 45},
               :temp {:min 15, :mean 18, :max 21}},
        :inclement {:weight 4,
                    :wind {:min 25, :mean 40, :max 80},
                    :temp {:min 12, :mean 14, :max 16}}})

(require '[weathergen.math :as math])


(clojure.pprint/pprint
 (into (sorted-map)
       (zipmap (range 0 1 0.0825)
               (map mix (range 0 1 0.0825)))))

[0  [1 0 0 0]
 0.2 [1 0 0 0]
 0.3 [0 1 0 0]
 0.4 [0 1 0 0]
 ,,,]


(let [n 10000]
 (->> (repeatedly n
                  #(model/smoothed-noise-field (* (rand) 10000) (* (rand) 10000)(* (rand) 10000) (* (rand) 10000) 32))
      (map #(math/distribute % 0 2 10 0.75))
      (map #(math/nearest % 1))
      frequencies
      (into (sorted-map))
      clojure.pprint/pprint
      ;;(map #(Math/abs %))
      ))

;; Capture the current state
(->> @weathergen.quil/state
     (into (sorted-map))
     clojure.pprint/pprint)

(let [n 10000]
 (->> (repeatedly n
                  #(model/smoothed-noise-field (* (rand) 10000) (* (rand) 10000)(* (rand) 10000) (* (rand) 10000) 32))
      (map #(math/reject-tails 0.55 %))
      (map #(math/nearest % 0.05))
      frequencies
      (into (sorted-map))
      clojure.pprint/pprint
      ;;(map #(Math/abs %))
      ))
