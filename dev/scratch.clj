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
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(println (map
          vector
          [ ;; Italy
           "Amendola"
           "Ampugnano"
           "Asiago"
           "Aviano"
           "Bologna"
           "Bolzano"
           "Brindisi-Casale"
           "Capodichino"
           "Cervia"
           "Ciampino"
           "Crotone"
           "Falconara"
           "Fiumicino Intl."
           "Forli"
           "Frosinone"
           "Ginolisa"
           "Gioia del colle"
           "Grazzanise"
           "Grosseto"
           "Grottaglie"
           "Guidogna"
           "Istrana"
           "Lamezia Terme"
           "Latina"
           "Lecce"
           "Matera"
           "Mattarello"
           "Padova"
           "Palese Macchie (Lezhe in 4.5)"
           "Peretola"
           "Perugia"
           "Pescara"
           "Practica di Mare"
           "Ravenna"
           "Reggio Calabria"
           "Rimini"
           "Rivolto"
           "Roma Urbe"
           "Ronchi dei legionari"
           "San Pancrazio"
           "Treviso"
           "Venezia Tessera"
           "Vicenca"

           ;; Sicily
           "Catania Fontanarossa"
           "Palermo"
           "Pantelleria"
           "Sigonella"
           "Trapani Birgi"

           ;; Greece
           "Ioannina"
           "Kefallinia"
           "Preveza"
           "Zakinthos"

           ;; Macedonia
           "Ohrid"

           ;; Albania
           "Berat"
           "Cerrik airtsrip"
           "Durres airstrip"
           "Elbasan"
           "Gjirokaster"
           "Gramsh"
           "Korce North"
           "Kukes"
           "Lushnje airstrip"
           "Mifol"
           "Peshkopi airstrip"
           "Shkoder"
           "Tirane Lapranka"
           "Tirane Rinas"

           ;; Slovenia
           "Bloska Polica airstrip"
           "Cerklje airstrip"
           "Cerklje"
           "Ljubljana"
           "Maribor"
           "Portoroz"
           "Slovenj Gradec"

           ;; Monetegro
           "Danilovgrad airstrip"
           "Gorazde airstrip"
           "Ivangrad"
           "Podgorica"
           "Tivat"

           ;; Serbia
           "Batajnica"
           "Beograd"
           "Kovin"
           "Kraljevo"
           "Lepa Glava"
           "Sabac airstrip"
           "Sjenica"
           "Sombor"

           ;; Bosnia Herzegovnia
           "Banja Luka"
           "Bihac"
           "Brcko airstrip"
           "Mostar"
           "Sarajevo Intl"
           "Slavonski Brod airstrip"
           "Tuzla"
           "Trebinje airstrip"

           ;; Croatia
           "Bjelovar airstrip"
           "Dubrovnic Intl"
           "Karlovac airstrip"
           "Osijek"
           "Pula"
           "Rijeka"
           "Split"
           "Udbina"
           "Varazdin"
           "Zadar"
           "Zagreb"

           ;; Hungary
           "Nagykanisza"
           "Ocseny"
           "Pecs East"
           "Satorhely"
           "Szeged"
           "Taszar"
           ]
          [
           ;; Italy
           [[41 07.44] [16 47.02]]
           [[42 42.03] [11 19.43]]
           [[45 08.59] [11 39.34]]
           [[45 16.71] [13 05.20]]
           [[43 54.23] [11 21.31]]
           [[45 38.77] [11 23.51]]
           [[40 19.77] [19 23.62]]
           [[40 34.86] [14 58.03]]
           [[43 36.99] [12 40.85]]
           [[41 23.35] [12 57.83]]
           [[38 47.63] [18 10.37]]
           [[43 01.43] [13 59.48]]
           [[41 22.28] [12 31.55]]
           [[43 35.37] [12 20.72]]
           [[41 16.35] [13 43.11]]
           [[41 08.88] [16 31.88]]
           [[40 26.24] [18 10.09]]
           [[40 42.94] [14 43.58]]
           [[42 16.70] [11 05.46]]
           [[40 11.69] [18 43.12]]

           [[41 34.13] [13 08.56]]
           [[44 58.30] [12 25.01]]
           [[38 43.86] [17 12.66]]
           [[41 08.27] [13 18.44]]
           [[39 27.14] [19 34.19]]
           [[40 07.92] [17 42.08]]
           [[45 16.68] [11 08.81]]
           [[44 42.73] [12 01.80]]
           [[40 45.64] [17 59.57]]
           [[43 14.36] [11 15.16]]
           [[42 35.56] [12 53.09]]
           [[41 57.30] [14 55.13]]
           [[41 14.73] [12 48.57]]
           [[43 45.07] [12 32.87]]
           [[37 55.36] [16 26.17]]
           [[43 24.60] [13 02.02]]
           [[45 13.44] [13 39.51]]
           [[41 34.44] [12 53.36]]
           [[45 06.36] [14 13.48]]
           [[40 07.92] [19 15.11]]
           [[44 55.12] [12 31.70]]

           [[44 47.58] [12 45.92]]
           [[44 52.43] [11 43.72]]

           ;; Sicily
           [[37 26.26] [15 39.26]]
           [[38 02.80] [13 27.46]]
           [[36 48.54] [12 06.29]]
           [[37 19.80] [15 30.73]]
           [[37 48.36] [12 45.37]]

           ;; Greece
           [[39 24.81] [22 40.60]]
           [[38 00.75] [22 05.80]]
           [[38 43.32] [22 31.70]]
           [[37 39.73] [22 27.83]]

           ;; Macedonia
           [[40 48.33] [22 50.10]]

           ;; Albania
           [[40 26.78] [21 42.57]]
           [[40 27.85] [22 13.19]]
           [[40 59.11] [21 19.95]]
           [[40 40.25] [21 56.80]]
           [[39 46.90] [21 57.35]]
           [[41 28.20] [21 34.63]]
           [[40 18.69] [22 45.59]]
           [[41 35.75] [22 35.67]]
           [[40 39.17] [21 31.06]]
           [[40 17.08] [21 09.24]]
           [[41 15.27] [22 34.18]]
           [[41 36.83] [21 31.72]]
           [[40 56.95] [21 42.02]]
           [[41 02.34] [21 38.32]]

           ;; Slovenia
           [[45 45.01] [15 39.37]]
           [[45 06.98] [16 40.18]]
           [[45 09.67] [16 53.44]]
           [[45 26.91] [15 31.52]]
           [[45 40.92] [17 10.60]]
           [[44 44.34] [15 32.97]]
           [[45 42.00] [16 23.66]]

           ;; Montenegro
           [[42 02.15] [21 06.88]]
           [[42 59.81] [21 08.92]]
           [[42 16.70] [22 00.92]]
           [[41 52.99] [21 12.66]]
           [[41 55.15] [20 33.90]]

           ;; Serbia
           [[44 15.79] [22 57.85]]
           [[44 10.40] [22 57.85]]
           [[44 07.16] [23 42.23]]
           [[43 14.36] [23 06.72]]
           [[43 15.15] [21 59.16]]
           [[44 08.78] [22 04.96]]
           [[42 43.10] [22 19.52]]
           [[45 00.51] [21 29.92]]

           ;; Bosnia Herzegovnia
           [[44 16.32] [19 04.26]]
           [[44 11.47] [17 03.36]]
           [[44 17.40] [20 46.79]]
           [[42 43.10] [19 34.50]]
           [[43 14.90] [20 18.16]]
           [[44 08.78] [22 04.96]]
           [[44 50.46] [20 50.57]]
           [[42 16.16] [20 10.87]]

           ;; Croatia
           [[45 07.51] [18 37.08]]
           [[42 04.31] [19 34.50]]
           [[44 42.19] [16 57.46]]
           [[44 44.88] [21 05.83]]
           [[44 13.09] [14 45.18]]
           [[44 37.88] [15 32.97]]
           [[42 59.27] [17 39.62]]
           [[43 55.85] [17 04.01]]
           [[45 30.15] [18 04.00]]
           [[43 29.98] [16 32.43]]
           [[45 00.51] [17 36.70]]

           ;; Hungary
           [[45 37.69] [18 51.95]]
           [[45 30.69] [21 10.92]]
           [[45 15.60] [20 26.11]]
           [[45 10.75] [20 55.11]]
           [[45 26.91] [22 56.23]]
           [[45 37.15] [20 04.30]]
           ]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(doseq [theater [:balkans :korea :israel]]
  (->> (format "/tmp/%s.csv" (name theater))
       clojure.java.io/reader
       (db/import-objectives-csv theater)
       (map #(select-keys % [:x :y :owner :name :type :id]))
       (filterv #(#{"Airbase" "Airstrip"} (:type %)))
       pr-str
       (spit (clojure.java.io/writer (format "/tmp/%s-airbases.edn" (name theater))))))
