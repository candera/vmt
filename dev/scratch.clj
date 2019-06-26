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

(doseq [theater [:kuriles] #_[:balkans :korea :israel]]
  (->> (format "/tmp/%s.csv" (name theater))
       clojure.java.io/reader
       (db/import-objectives-csv theater)
       (map #(select-keys % [:x :y :owner :name :type :id]))
       (filterv #(#{"Airbase" "Airstrip"} (:type %)))
       pr-str
       (spit (clojure.java.io/writer (format "/tmp/%s-airbases.edn" (name theater))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(require :reload '[weathergen.model :as model])

(clojure.pprint/pprint
 (model/upgrade
  {:revision 4
   :weather-params
   {:temp-uniformity 0.7
    :pressure        {:min 28.5 :max 31}
    :cell-count      [59 59]
    :feature-size    10
    :categories      {:sunny     {:weight 4
                                  :wind   {:min 0 :mean 7 :max 20}
                                  :temp   {:min 20 :mean 22 :max 24}}
                      :fair      {:weight 1
                                  :pressure 29.95
                                  :wind   {:min 5 :mean 10 :max 30}
                                  :temp   {:min 18 :mean 21 :max 23}}
                      :poor      {:weight 2
                                  :pressure 29.1
                                  :wind   {:min 10 :mean 18 :max 30}
                                  :temp   {:min 15 :mean 18 :max 21}}
                      :inclement {:weight 3
                                  :pressure 28.7
                                  :wind   {:min 15 :mean 25 :max 60}
                                  :temp   {:min 12 :mean 14 :max 16}}}
    :turbulence      {:size 1 :power 250}
    :origin          [1000 1000]
    :evolution       3600
    :time            {:offset 1234
                      :current {:day 1 :hour 5 :minute 0}}
    :wind-uniformity 0.7
    :crossfade       0.1
    :prevailing-wind {:heading 325}
    :seed            1234
    :wind-stability-areas [{:bounds {:x 16
                                     :y 39
                                     :width 6
                                     :height 4}
                            :wind {:speed 5
                                   :heading 0}
                            :index 0}]
    :weather-overrides [{:location {:x 22
                                    :y 45}
                         :radius-inner 2
                         :radius-outer 4
                         :begin {:day 1 :hour 5 :minute 0}
                         :peak {:day 1 :hour 6 :minute 0}
                         :taper {:day 1 :hour 8 :minute 0}
                         :end {:day 1 :hour 9 :minute 0}
                         :pressure 28.5
                         :strength 0.5
                         }]}}
  7))

(model/weather-grid
 {:temp-uniformity 0.7
  :pressure        {:min 28.5 :max 31}
  :cell-count      [59 59]
  :feature-size    10
  :categories      {:sunny     {:wind   {:min 0 :mean 7 :max 20}
                                :temp   {:min 20 :mean 22 :max 24}}
                    :fair      {:pressure 29.95
                                :wind   {:min 5 :mean 10 :max 30}
                                :temp   {:min 18 :mean 21 :max 23}}
                    :poor      {:pressure 29.1
                                :wind   {:min 10 :mean 18 :max 30}
                                :temp   {:min 15 :mean 18 :max 21}}
                    :inclement {:pressure 28.7
                                :wind   {:min 15 :mean 25 :max 60}
                                :temp   {:min 12 :mean 14 :max 16}}}
  :turbulence      {:size 1 :power 250}
  :origin          [1000 1000]
  :evolution       3600
  :time            {:offset 1234
                    :current {:day 1 :hour 5 :minute 0}}
  :wind-uniformity 0.7
  :crossfade       0.1
  :prevailing-wind {:heading 325}
  :seed            1234
  :wind-stability-areas [{:bounds {:x 16
                                   :y 39
                                   :width 6
                                   :height 4}
                          :wind {:speed 5
                                 :heading 0}
                          :index 0}]
  :weather-overrides [{:location {:x 22
                                  :y 45}
                       :radius 4
                       :falloff 2
                       :animate? false
                       :begin {:day 1 :hour 5 :minute 0}
                       :peak {:day 1 :hour 6 :minute 0}
                       :taper {:day 1 :hour 8 :minute 0}
                       :end {:day 1 :hour 9 :minute 0}
                       :pressure 28.5
                       :strength 0.5}
                      {:location {:x 22
                                  :y 45}
                       :radius 4
                       :falloff 2
                       :animate? false
                       :begin {:day 1 :hour 5 :minute 0}
                       :peak {:day 1 :hour 6 :minute 0}
                       :taper {:day 1 :hour 8 :minute 0}
                       :end {:day 1 :hour 9 :minute 0}
                       :pressure 28.5
                       :strength 0.5}]})


(model/time-weight
 {:location {:x 22
             :y 45}
  :radius 4
  :falloff 2
  :animate? true
  :begin {:day 1 :hour 5 :minute 0}
  :peak {:day 1 :hour 6 :minute 0}
  :taper {:day 1 :hour 8 :minute 0}
  :end {:day 1 :hour 9 :minute 0}
  :pressure 28.5
  :strength 0.5}
 (time/campaign-time->minutes {:day 1 :hour 8 :minute 59}))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(require :reload
         '[clojure.edn :as edn]
         '[clojure.java.io :as io]
         '[weathergen.model :as model])

(-> "/tmp/smpu-weathergen-settings.edn"
    io/reader
    java.io.PushbackReader.
    edn/read
    (model/upgrade 7)
    clojure.pprint/pprint)

(-> 3
    (+ 2 3)
    (* 4))

(-> 3
    (+ 2 3)
    (/ 4))

(let [seed 1234
      t 1234
      dt 60]
   (-> (weathergen.math/fractal-field (/ t 16) 42 16 seed 1)
       (- 0.5)
       (* 2)
       ;; Peak variation at six hours
       (* (min (/ dt (* 6 60)) 1.0))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(require :reload '[weathergen.dtc :as dtc])

(-> "/Users/candera/GDrive/SMPU.ini"
    slurp
    dtc/parse
    dtc/flight-path
    pprint
    )

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(let [ch (async/chan 10)]
  (async/go-loop []
    (async/>! ch "hi")
    (async/>! ch "hi")
    (async/
     go-loop [n 2]
      (when (pos? n)
        (println (async/<! ch))
        (recur (dec n))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(require :reload '[weathergen.dtc :as dtc])

(-> "/Users/candera/GDrive/SMPU-Day  2 07 56 30.ini"
    slurp
    dtc/parse
    ;;dtc/lines
    ;; ::dtc/steerpoints
    ;;::dtc/lines
    dtc/ppts
    pprint
    )

(dtc/parse-stpt-line "ppt_0=1530465.000000, 1316693.000000, 0.000000, 18228.35, 13")

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(require '[clojure.java.io :as io])

(defn at-offsets
  [path offsets]
  (with-open [is (io/input-stream path)]
   (loop [current 0
          [offset & more] (sort offsets)
          info (sorted-map)]
     (if offset
       info
       (do
         (fmap/get-bytes is (- offset current))
         (recur (+ offset current 4)
                more
                (assoc info offset (fmap/read-float is))))))))

(at-offsets "/Users/candera/GDrive/weather-4.twx" [0x298])

(doseq [n (range 1 10)]
  (with-open [is (io/input-stream (format "/Users/candera/GDrive/weather-%d.twx" n))]
    (fmap/get-bytes is 0x298)
    (println n "," (fmap/read-float is))))


(require :reload '[weathergen.twx :as twx])

(defn twx-load
  [path]
  (-> path
      java.net.URI.
      java.nio.file.Paths/get
      java.nio.file.Files/readAllBytes
      java.nio.ByteBuffer/wrap
      twx/parse))

(defn twx-diff
  [path1 path2]
  (let [t1 (twx-load path1)
        t2 (twx-load path2)]
    (clojure.pprint/pprint (take 2 (clojure.data/diff t1 t2)))))

(doseq [n (range 1 9)]
  (println n "vs" (inc n))
  (twx-diff (format "file:///Users/candera/GDrive/weather-%d.twx"
                    n)
            (format "file:///Users/candera/GDrive/weather-%d.twx"
                    (inc n)))
  (println))

(clojure.pprint/pprint (twx-load "file:///Users/candera/GDrive/weather-1.twx"))

(twx-diff "file:///Users/candera/GDrive/default.twx"
          "file:///Users/candera/GDrive/sunny-vis-1.twx")

(clojure.pprint/pprint
 (buf/with-byte-order :little-endian
   (buf/read* (-> "file:///Users/candera/GDrive/weather-3.twx"
                  java.net.URI.
                  java.nio.file.Paths/get
                  java.nio.file.Files/readAllBytes
                  java.nio.ByteBuffer/wrap)
              twx/twx)))

(->> "file:///Users/candera/GDrive/weather-3.twx"
    twx-load
    (into (sorted-map))
    clojure.pprint/pprint)

(twx-diff "file:///tmp/default.twx"
          "file:///tmp/sunny-vis-1.twx")

(select-keys (twx-load "file:///tmp/default.twx")
             [:fog-start :fog-end])

(twx-diff #_"file:///tmp/default.twx"
          "file:///tmp/sunny-vis-1.twx"
          #_"file:///tmp/sunny-vis-2.twx"
          #_"file:///tmp/sunny-vis-3.twx" ; Previously lower, back to
                                        ; where #1 is
          "file:///tmp/sunny-vis-4.twx" ; Previously 0, back to where
                                        ; #1 is
          )

(def twx-def (twx-load "file:///tmp/default.twx"))

(twx-diff "file:///tmp/sunny-vis-10.twx"
          "file:///tmp/sunny-vis-20.twx")

(doseq [n [0 10 20 30]]
  (let [twx (twx-load (format "file:///tmp/sunny-vis-%d.twx" n))]
    (println n
             :start (get-in twx [:fog-start :sunny])
             :end (get-in twx [:fog-end :sunny]))))

(twx-diff "file:///tmp/stratus.twx"
          "file:///tmp/contrail.twx")

(clojure.pprint/pprint
 (select-keys (twx-load "file:///tmp/stratus.twx")
              [:stratus-thick :stratus-layer :cumulus-layer]))

(as-> "file:///tmp/twx-test.twx" ?
  (twx-load ?)
  (into (sorted-map) ?)
  (dissoc ? :current-condition :wth-turbulence)
  (clojure.pprint/pprint ?))

(as-> "file:///tmp/default.twx" ?
  (twx-load ?)
  (into (sorted-map) ?)
  #_(dissoc ? :current-condition :wth-turbulence)
  (clojure.pprint/pprint ?))

(as-> "file:///tmp/weathergen.twx" ?
  (twx-load ?)
  (into (sorted-map) ?)
  (dissoc ? :current-condition :wth-turbulence)
  (clojure.pprint/pprint ?))

(-> twx/twx-template
    (assoc-in [:stratus-layer :poor] ))

(as-> "file:///tmp/stratus.twx" ?
  (twx-load ?)
  (into (sorted-map) ?)
  #_(dissoc ? :current-condition :wth-turbulence)
  (clojure.pprint/pprint ?))

(twx-diff "file:///tmp/stratus.twx"
          "file:///tmp/weathergen.twx" )

(twx-diff "file:///tmp/stratus.twx"
          "file:///tmp/stratus3.twx" )

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(require '[octet.core :as buf]
         '[taoensso.timbre :as log]
         '[clojure.string :as str]
         '[clojure.pprint :as pprint :refer [pprint]])

(require :reload '[weathergen.mission-files :as mission])

(let [input (buf/allocate 100)]
  (require :reload '[weathergen.lzss :as lzss])
  (doseq [[idx data] (map-indexed vector [0x6f 1 2 3 4 1 1 5 6])]
    (octet.buffer/write-byte input idx data))
  (->> (lzss/expand input 0 100 8)
       .array
       (into [])))

(do
  (require :reload '[weathergen.mission-files :as mission])
  (let [buf (buf/allocate 100)]
    ;;(buf/write! buf 4 buf/int16)
    (buf/write! buf [1 2 3 4] (mission/larray buf/int16 buf/int32) {:offset 10})
    (log/debug (->> buf .array (into [])))
    (buf/read* buf (mission/larray buf/int16 buf/int32) {:offset 10})
    ))


(do
  (require :reload '[weathergen.lzss :as lzss])
  (require :reload '[weathergen.mission-files :as mission])
  (-> "file:///Users/candera/falcon/Data/Data/Campaign/Save/SMPU-Day%20%203%2000%2041%2048.cam"
      #_"file:////Users/candera/falcon/Data/Data/Campaign/Save/SA-17%20Loft.tac"
      file-buf
      mission/read-mission
      first
      :data
      (dissoc :map)
      pprint))

(do
  (require :reload '[weathergen.lzss :as lzss])
  (require :reload '[weathergen.mission-files :as mission])
  (-> "/Users/candera/falcon/Data/Data/Campaign/Save/SMPU-Day  3 00 41 48.cam"
      #_"/Users/candera/falcon/Data/Data/Campaign/Save/SA-17 Loft.tac"
      file-buf
      (mission/read-mission {:class-table (-> "/Users/candera/falcon/4.33.3/Data/Terrdata/objects/FALCON4.ct"
                                              file-buf
                                              mission/read-class-table)})
      :units
      #_:campaign-info
      first
      :data
      ;;(dissoc :map)
      pprint))

(do
  (require :reload '[weathergen.lzss :as lzss])
  (require :reload '[weathergen.mission-files :as mission])
  (-> "/Users/candera/falcon/4.33.3/Data/Terrdata/objects/FALCON4.ct"
      file-buf
      mission/read-class-table
      (nth 7)
      ))

  (-> "/Users/candera/falcon/4.33.3/Data/Terrdata/objects/FALCON4.ct"
      file-buf)

(def class-table (-> "/Users/candera/falcon/4.33.3/Data/Terrdata/objects/FALCON4.ct"
                     file-buf
                     mission/read-class-table))

(do
  #_(require :reload '[weathergen.lzss :as lzss])
  (require :reload '[weathergen.mission-files :as mission])
  (-> "/Users/candera/falcon/4.33.3/Data/Campaign/Save/SMPU-Day  3 00 41 48.cam"
      #_"/Users/candera/falcon/4.33.3/Data/Campaign/Save/SA-17 Loft.tac"
      file-buf
      (mission/read-mission {:class-table class-table})
      :units
      first
      :data
      ;;first :data
      (->> (take 10))
      pprint))


(do
  #_(require :reload '[weathergen.lzss :as lzss])
  (require :reload '[weathergen.mission-files :as mission])
  (let [data (-> "/Users/candera/falcon/4.33.3/Data/Campaign/Save/SMPU-Day  3 00 41 48.cam"
                 #_"/Users/candera/falcon/4.33.3/Data/Campaign/Save/SA-17 Loft.tac"
                 file-buf
                 (mission/read-mission {:class-table class-table})
                 :units
                 first
                 :data)]
    #_(class data)
    #_(buf/read* data (buf/repeat
                       1
                       (mission/unit-record class-table)))
    #_(first data)
    (spit "/tmp/data.clj"
          (-> data
              (nth 14)
              pr-str))
    #_(doseq [item data]
        (println item))
    ))

;; battalion -> 115
;; battalion + flight => 946 (includes 2 + 10 mystery)

(do
  (require :reload '[weathergen.mission-files :as mission])
  (let [strings (mission/read-strings
                 (file-buf "/Users/candera/falcon/4.33.3/Data/Campaign/Save/Strings.idx")
                 (file-buf "/Users/candera/falcon/4.33.3/Data/Campaign/Save/Strings.wch"))]
    (map strings (range 100 150))))

(def smpu
  (-> "/Users/candera/falcon/4.33.3/Data/Campaign/Save/SMPU-Day  3 00 41 48.cam"
      #_"/Users/candera/falcon/4.33.3/Data/Campaign/Save/SA-17 Loft.tac"
      file-buf
      (mission/read-mission {:class-table class-table})))

(def battalion (-> smpu :units first :data rand-nth))
(-> smpu :units first :data rand-nth (select-keys [:type :name-id]))

(def strings
  (mission/read-strings
   (file-buf "/Users/candera/falcon/4.33.3/Data/Campaign/Save/Strings.idx")
   (file-buf "/Users/candera/falcon/4.33.3/Data/Campaign/Save/Strings.wch")))

(doseq [f (map str "abcdefgoprtstwx")]
  (println f ":" (cl-format nil (str "~" f) 3)))

(require :reload '[weathergen.mission-files :as mission])

(mission/unit-name battalion {:class-table class-table
                              :strings strings})

(doseq [battalion (->> smpu
                       :units
                       first
                       :data
                       shuffle
                       (filter #(-> % :type (= :battalion)))
                       (take 20))]
  (println (mission/unit-name battalion {:class-table class-table
                                         :strings strings})))

(do
  (require :reload '[weathergen.mission-files :as mission])
  (->> "/Users/candera/falcon/4.33.3/Data/Terrdata/objects/FALCON4.UCD"
       file-buf
       mission/read-unit-class-table
       (def unit-class-table)))

(- 0x628 0x4d8)

(/ (- 0x8c8 0x628) 2)

(/ (- 0x628 2) 336)

(mod (- 0x628 2) 336)

(buf/size
 (buf/spec :index buf/int16
           :num-elements (buf/repeat 16
                                     buf/int32)
           :vehicle-type  (buf/repeat 16
                                      buf/int16)
           :vehicle-class (buf/repeat 16
                                      (buf/repeat 8 buf/byte))
           :flags buf/int16
           ;; :name (fixed-string 20)
           ;; :movement-type move-type-read-spec
           ;; :movement-speed buf/int16
           ;; :max-range buf/int16
           ;; :fuel buf/int32
           ;; :rate buf/int16
           ;; :pt-data-index buf/int16
           ;; :scores (buf/repeat MAXIMUM_ROLES buf/byte)
           ;; :role buf/byte
           ;; :hit-chance (buf/repeat MOVEMENT_TYPES buf/byte)
           ;; :strength (buf/repeat MOVEMENT_TYPES buf/byte)
           ;; :range (buf/repeat MOVEMENT_TYPES buf/byte)
           ;; :detection (buf/repeat MOVEMENT_TYPES buf/byte)
           ;; :damage-mod (buf/repeat damage-type-enum-count
           ;;                         buf/byte)
           ;; :radar-vehicle buf/byte
           ;; :special-index buf/int16
           ;; :icon-index buf/int16
           ;; ;; This is a sign that the structure is wrong - just trying to see if the alignment is right at this point
           ;; :padding (buf/repeat 7 buf/byte))
           ))

(do
  (require :reload '[weathergen.mission-files :as mission])
  (->> "/Users/candera/falcon/4.33.3/Data/Terrdata/objects/FALCON4.UCD"
       file-buf
       mission/read-unit-class-table
       (def unit-class-table))
  (->> unit-class-table shuffle (take 10) (map #(select-keys % [:name :icon-index])) pprint))

(def class-table (mission/read-class-table ))

(require :reload '[weathergen.mission-files :as mission])

(->> smpu
     :units
     first
     :data
     shuffle
     (take 10)
     (map #(mission/unit-name % {:class-table class-table
                                 :strings strings})))


(do
  (def strings
    (mission/read-strings
     (file-buf "/Users/candera/falcon/4.33.3/Data/Campaign/Save/Strings.idx")
     (file-buf "/Users/candera/falcon/4.33.3/Data/Campaign/Save/Strings.wch")))
  (def class-table (-> "/Users/candera/falcon/4.33.3/Data/Terrdata/objects/FALCON4.ct"
                       file-buf
                       mission/read-class-table))
  (def smpu
    (-> "/Users/candera/falcon/4.33.3/Data/Campaign/Save/SMPU-Day  3 00 41 48.cam"
        #_"/Users/candera/falcon/4.33.3/Data/Campaign/Save/SA-17 Loft.tac"
        file-buf
        (mission/read-mission {:class-table class-table}))))

(do
  (require :reload '[weathergen.mission-files :as mission])
  (->> smpu
       :units
       first
       :data
       shuffle
       (take 10)
       (map #(mission/unit-name % {:class-table class-table
                                   :strings strings}))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(let [path "/Users/candera/falcon/4.33.3/Data/Campaign/Save/SMPU-Day  1 08 05 03.cam"
      install-dir (files/find-install-dir path)
      installation (files/load-installation install-dir)]
  (fs/parent path)
  #_installation
  #_(pprint
   (for [theater (:theaters installation)
         :let [cd (files/campaign-dir installation theater)]]
     {:campaign-dir cd
      :name (:name theater)
      :ancestor? (fs/ancestor? cd path)}))
  #_(->> installation
         :theaters
         (map #(files/campaign-dir installation %)))
  #_(files/find-theater installation path))

;; This file seems to be corrupt.
(def smpu (files/read-mission "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/SMPU-Day  1 08 05 03.cam"))

(def tac (files/read-mission "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/stratus.tac"))

;; This one reads okay
(def smpu (files/read-mission "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/SMPU-Day  3 00 41 48.cam"))

;; This isn't fully general yet, but shows how to dump a compressed
;; campaign embedded file to disk
(binding [octet.buffer/*byte-order* :little-endian]
  (let [path "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/SMPU-Day  1 08 05 03.cam"
        buf (fs/file-buf path)
        dir-offset (log/spy (buf/read buf buf/uint32))
        dir-file-count (buf/read buf buf/uint32 {:offset dir-offset})
        directory (buf/read buf (buf/repeat dir-file-count
                                            mission/directory-entry)
                            {:offset (+ dir-offset 4)})
        ;; Entered manually
        offset 3663
        length 77046
        header-spec (buf/spec :compressed-size buf/int32
                              :num-units buf/int16
                              :uncompressed-size buf/int32)
        {:keys [compressed-size
                num-units
                uncompressed-size]} (buf/read buf
                                              header-spec
                                              {:offset offset})
        ;; size = 0x2f42f (193583)
        data (lzss/expand buf
                          (+ offset (buf/size header-spec))
                          (- length 6)
                          uncompressed-size)]
    (.write (java.io.FileOutputStream. "/tmp/units.raw")
            (.array data))))

;; This one reads okay
(def smpu (files/read-mission "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/SMPU-Day  3 00 41 48.cam"))

(->> @smpu
     :files
     :units
     :data
     shuffle
     (take 10)
     (map (juxt :type :name :type-id :camp-id :name-id))
     pprint)

(def u (->> smpu
            :files
            :units
            :data
            (filter #(-> % :id :name (= 4339)))
            first))

u

(:id u)

(:name-id u)

(let [{:keys [name-id unit-type]} u
      {:keys [domain type]} (files/unit-class-info
                             (:database smpu)
                             unit-type)]
  {:name-id name-id
   :unit-type unit-type
   :domain domain
   :type type
   :size-name (files/get-size-name u (:database smpu))})


(files/unit-name u (:database smpu))

;; Write out the CSVs that let me look at the database in Excel
(do
 (->> @smpu
      :database
      :unit-class-data
      csv-ize
      (spit "/tmp/unit-class-data.csv"))

 (->> @smpu
      :database
      :class-table
      csv-ize
      (spit "/tmp/class-table.csv"))

 (as-> @smpu ?
   (:files ?)
   (:units ?)
   (:data ?)
   (csv-ize ? {:initial-columns [:camp-id :type :name :name-id :type-id]})
   (spit "/tmp/units.csv" ?)))


(-> @smpu
    :database
    :class-table
    (nth 71)
    (select-keys [:data-pointer :data-type]))

(-> @smpu
    :database
    :unit-class-data
    (nth 213)
    :name)

(let [database (:database @smpu)
      type-id 171
      {:keys [class-table]} database
      {:keys [data-pointer data-type]} (nth class-table (- type-id 100))]
  (count (files/data-table database data-type)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(doseq [item (->> (resources/read-idx "/Users/candera/falcon/4.33.3/Data/Art/resource/bludark.idx")
                  (map :id)
                  (map-indexed vector)
                  #_(map (juxt :id :flags :w :h :image-offset)))]
  (println item))

(->> (resources/read-idx "/Users/candera/falcon/4.33.3/Data/Art/resource/bludark.idx")
                  (map :id)
                  count
                  (format "0x%x"))

;; Planner.idx
size: 0x22ec
version: 518d5384

type: 0x64 -> image
:type:

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(let [strings (-> @smpu :strings :fn)]
  (spit "/tmp/strings.csv"
        (with-out-str
          (dotimes [i 4100]
            (printf "%d,%s\n"
                    i
                    (try
                      (strings i)
                      (catch Throwable t "")))))))

(let [strings (-> @smpu :names)]
  (spit "/tmp/strings.csv"
        (with-out-str
          (dotimes [i 4100]
            (printf "%d,%s\n"
                    i
                    (try
                      (strings i)
                      (catch Throwable t "")))))))

(->> @smpu :files :teams :data csv-ize (spit "/tmp/teams.csv"))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(->> @smpu :files :campaign-info :data vector csv-ize (spit "/tmp/campaign-info.csv"))
(->> @smpu :files :objective-deltas :data csv-ize (spit "/tmp/deltas.csv"))
(->> @smpu :files :objectives :data class)
(->> @smpu :database :objective-class-data csv-ize (spit "/tmp/objective-class-data.csv"))

(->> @save2 :files :objectives :data csv-ize (spit "/tmp/save2-objectives.csv"))
(->> @save2 :files :objective-deltas :data csv-ize (spit "/tmp/save2-deltas.csv"))

(->> @save2 :files :campaign-info :data vector csv-ize (spit "/tmp/save2-campaign-info.csv"))

(->> @smpu :files :campaign-info :data :squad-info pprint)
((->> @smpu :database :strings) 358)


;; What about a TE though?

(->> @stratus-te :campaign-info :theater-name)

;; So it still has one too.

(let [names (->> @smpu :database :names)]
  (names 391))

(->> @stratus-te :campaign-info :scenario)
(->> @smpu :campaign-info :scenario)
(->> @save2 :campaign-info :scenario)
(->> @te-new :campaign-info :scenario)

(map #(-> % :campaign-info (select-keys [:scenario :save-file]))
     [@stratus-te @te-new @smpu @save2])

(->> @te-new :objective-deltas count)

;; What would Datalog to navigate the database look like?

(:find ...
       :where
       [?unit :unit/name ?name]
       [?unit :unit/entity-type ?et]
       [(- ?et 100) ?eti]
       [?class :class-table/index ?eti]
       [?class :class-table/data-pointer ?dp]
       [?unit-class-data :unit-class-table/index ?dp])

;; Um, that actually looks pretty useful.

(let [mission @smpu #_@stratus-te
      contents (fn [v]
                 (if (coll? v)
                   (count v)
                   (class v)))]
  (->> (for [k (->> mission :scenario-files keys)]
         [k {:mission (->> mission k contents)
             :scenario (->> mission :scenario-files k contents)}])
       (into (sorted-map))
       pprint))

;; stratus-te.tac:

{:campaign-info      {:mission 49,
                      :scenario 49},
 :events             {:mission clojure.lang.Keyword,
                      :scenario clojure.lang.Keyword},
 :objective-deltas   {:mission 0,
                      :scenario 0},
 :objectives         {:mission nil,
                      :scenario 2693},
 :persistent-objects {:mission clojure.lang.Keyword,
                      :scenario clojure.lang.Keyword},
 :pilots             {:mission clojure.lang.Keyword,
                      :scenario clojure.lang.Keyword},
 :teams              {:mission 3,
                      :scenario 3},
 :units              {:mission 0,
                      :scenario 0},
 :version            {:mission 1,
                      :scenario 1},
 :victory-conditions {:mission java.lang.String,
                      :scenario java.lang.String},
 :weather            {:mission nil,
                      :scenario clojure.lang.Keyword}}

;; smpu.cmp:

{:campaign-info      {:mission 49,
                      :scenario 49},
 :events             {:mission clojure.lang.Keyword,
                      :scenario clojure.lang.Keyword},
 :objective-deltas   {:mission 186,
                      :scenario 0},
 :objectives         {:mission nil,
                      :scenario 2693},
 :persistent-objects {:mission clojure.lang.Keyword,
                      :scenario clojure.lang.Keyword},
 :pilots             {:mission clojure.lang.Keyword,
                      :scenario clojure.lang.Keyword},
 :teams              {:mission 8,
                      :scenario 8},
 :units              {:mission 563,
                      :scenario 523},
 :version            {:mission 1,
                      :scenario 1},
 :victory-conditions {:mission nil,
                      :scenario java.lang.String},
 :weather            {:mission nil,
                      :scenario clojure.lang.Keyword}}

(let [mission #_@stratus-te @smpu
      mission-units (->> mission :units (map :camp-id) set)
      scenario-units (->> mission :scenario-files :units (map :camp-id) set)
      [only-in-mission only-in-scenario] (clojure.data/diff mission-units
                                                            scenario-units)]
  (pprint {:only-in-mission only-in-mission
           :only-in-scenario only-in-scenario}))

;; Are there any IDs that get reused?
(let [mission #_@stratus-te @smpu
      mission-units (->> mission
                         :units
                         (map (juxt :camp-id :name))
                         (into (sorted-map)))
      scenario-units (->> mission
                          :scenario-files
                          :units
                          (map (juxt :camp-id :name))
                          (into (sorted-map)))
      [only-in-mission only-in-scenario] (clojure.data/diff mission-units
                                                            scenario-units)]
  (pprint {:only-in-mission only-in-mission
           :only-in-scenario only-in-scenario}))

;; Yes. I think that means we only want to use the list from the
;; mission, not from the scenario
{:only-in-mission
 {20789 "Package 20789",
  20937 "Python 1",
  20943 "Viper 1",
  20935 "Eagle 3",
  21539 "Jaguar 1",
  20949 "Package 20949",
  20979 "Spirit 1",
  20944 "Package 20944",
  20644 "Hobby 1",
  20982 "Warhog 1",
  4380 "2nd Towed Artillery Brigade",
  21029 "Package 21029",
  21247 "Zipper 2",
  19538 "Package 19538",
  20945 "Nighthawk 2",
  20866 "Bison 1",
  20790 "Jumbo 1",
  10478 "Bull 1",
  20978 "Package 20978",
  21354 "Package 21354",
  20933 "Claw 3",
  21411 "Lion 3",
  21485 "Hawkeye 1",
  21456 "Doom 2",
  21024 "Bull 2",
  20135 "Claw 2",
  20787 "Mako 1",
  4004 "294th Fighter Squadron",
  20981 "Package 20981",
  20934 "Package 20934",
  20997 "Package 20997",
  21246 "Package 21246",
  14745 "Thunder 1",
  19541 "Rapier 3",
  20941 "Package 20941",
  19539 "Sentry 2",
  20952 "Zipper 1",
  21030 "Angel 2",
  21409 "Package 21409",
  20812 "Sentry 1",
  21025 "Lion 1",
  20950 "Angel 1",
  20791 "Package 20791",
  21557 "Package 21557",
  21282 "Package 21282",
  21023 "Package 21023",
  20948 "Bone 1",
  16072 "Gunhog 1",
  20940 "Shark 1",
  20744 "Jolly 1",
  20938 "Package 20938",
  20743 "Package 20743",
  20865 "Package 20865",
  21353 "Jolly 2",
  20643 "Package 20643",
  20722 "Package 20722",
  20793 "Hog 1",
  21286 "Nightmare 1",
  21558 "Satan 1",
  20792 "Blood 1",
  21484 "Package 21484",
  21556 "Jumbo 2",
  21330 "Gamble 1",
  21410 "Turkey 1",
  21355 "Stonecat 1",
  21285 "Package 21285",
  20942 "Hornet 9",
  20136 "Gauntlet 2",
  20998 "Banshee 1",
  20764 "Mack 1",
  21283 "Gunhog 2",
  20939 "Hornet 9",
  20133 "Package 20133",
  20804 "Chalis 1",
  20860 "Package 20860",
  20936 "Package 20936",
  20932 "Package 20932",
  20723 "Scout 1",
  20803 "Package 20803",
  20763 "Package 20763",
  20947 "Package 20947",
  21455 "Package 21455",
  21352 "Package 21352",
  21538 "Package 21538",
  20951 "Package 20951",
  21250 "Bulldog 2",
  21244 "Package 21244",
  20786 "Package 20786",
  1027 "Package 1027",
  21555 "Package 21555",
  21284 "Mustang 3",
  21245 "Crimson 1",
  20805 "Package 20805",
  4034 "401st Fighter Squadron",
  20807 "Fury 1",
  21093 "Package 21093",
  20861 "Mako 2",
  10911 "Buzzard 1",
  21329 "Package 21329",
  20810 "Package 20810",
  21094 "Buckskin 1"},
 :only-in-scenario
 {4344 "3rd Towed Gun Battalion",
  4539 "61st Air Defense Battalion",
  4385 "5th Engineer Battalion",
  4328 "5th Tank Battalion",
  4477 "2nd Reserves Battalion",
  4366 "4th Towed Gun Battalion",
  4324 "1st Tank Battalion",
  4380 "2nd Mech Brigade",
  4423 "13th Air Defense Battalion",
  4363 "1st Tank Battalion",
  4360 "4th HQ Battalion",
  4332 "3rd Rocket Battalion",
  4217 "3rd Air Defense Battalion",
  4382 "2nd HQ Battalion",
  4369 "1st Mech Battalion",
  4381 "1st Mech Battalion",
  4334 "5th HQ Battalion",
  4462 "9th Reserves Battalion",
  4418 "8th Air Defense Battalion",
  4384 "4th Supply Battalion",
  4464 "11th AAA Battalion",
  4004 "14th Fighter Squadron",
  4377 "3rd Motor Rifle Battalion",
  4356 "1st Armored Brigade",
  4330 "1st Motor Rifle Battalion",
  4552 "80th Air Defense Battalion",
  4364 "2nd Tank Battalion",
  4359 "3rd Tank Battalion",
  4342 "1st Tank Battalion",
  4374 "1st Armored Brigade",
  4326 "3rd Tank Battalion",
  4546 "68th Air Defense Battalion",
  4216 "2nd Air Defense Battalion",
  4414 "4th Air Defense Battalion",
  4540 "62nd Air Defense Battalion",
  4386 "4th Armored Brigade",
  4327 "4th Tank Battalion",
  4345 "4th Engineer Battalion",
  4465 "12th Air Defense Battalion",
  4361 "5th Supply Battalion",
  4378 "4th Towed Gun Battalion",
  4367 "5th Rocket Battalion",
  4447 "36th Air Defense Battalion",
  4362 "2nd Armored Brigade",
  4411 "1st Air Defense Battalion",
  4541 "63rd Air Defense Battalion",
  4543 "65th Air Defense Battalion",
  4323 "1st Armored Brigade",
  4379 "5th Tank Battalion",
  4376 "2nd Tank Battalion",
  4375 "1st Tank Battalion",
  4341 "4th Armored Brigade",
  4325 "2nd Tank Battalion",
  4424 "14th Air Defense Battalion",
  4388 "2nd Towed Gun Battalion",
  4346 "5th HQ Battalion",
  4357 "1st Tank Battalion",
  4365 "3rd Motor Rifle Battalion",
  4034 "80th Fighter Squadron",
  4358 "2nd Tank Battalion",
  4343 "2nd Tank Battalion"}}


;; How to find the squadrons at an airbase?

(let [squadron (->> @smpu :campaign-info :squadron-info first)
      squadron-id (-> squadron :id :name)
      unit (->> @smpu :units (filter #(= (:camp-id %) squadron-id)) first)
      squadron-name (:name unit)
      airbase-id (:airbase-id unit)
      airbase (->> @smpu :objectives (util/filter= :id airbase-id) util/only)
      names (:names @smpu)
      ;; This will blow up because we have to load the scenario and merge it
      airbase-name (->> airbase :name-id names)
      ]
  {:squadron-name squadron-name
   ;; :airbase-id airbase-id
   :airbase-name airbase-name})

;; That gives me airbase for each squadron. How do I start with all airbases?
(let [airbase-classes (->> @smpu
                            :class-table
                            (map-indexed (fn [i d]
                                           (assoc d :index i)))
                            (util/filter= #(get-in % [:vu-class-data :class-info :domain])
                                          c/DOMAIN_LAND)
                            (util/filter= #(get-in % [:vu-class-data :class-info :class])
                                          c/CLASS_OBJECTIVE)
                            (util/filter= #(get-in % [:vu-class-data :class-info :type])
                                          c/TYPE_AIRBASE)
                            (map :index)
                            set)
      airbases (->> @smpu
                    :objectives
                    (filter (fn [objective]
                              (airbase-classes (- (:entity-type objective) 100)))))
      names (:names @smpu)]
  (map #(-> % :name-id names) airbases))

(->> @smpu
     :class-table
     (map-indexed (fn [i d]
                    (assoc d :index i)))
     (util/filter= #(get-in % [:vu-class-data :class-info :domain])
                     c/DOMAIN_LAND)
     #_(util/filter= #(get-in % [:vu-class-data :class-info :class])
                     c/CLASS_OBJECTIVE)
     #_(util/filter= #(get-in % [:vu-class-data :class-info :type])
                     c/TYPE_AIRBASE)
     #_(map :index)
     (map :vu-class-data)
     (map :class-info)
     (map :domain)
     (take 100))

(->> @smpu :objectives count)

(-> @smpu :database)

(let [installation (mission/load-installation "/Users/candera/falcon/4.33.3")
      theater (->> installation :theaters (filter #(= (:name %) "Korea KTO")) first)
      database (mission/load-database installation theater)
      name-id 4
      type-id 171
      {:keys [name]} (mission/class-data database type-id)]
  theater)

;; Names gets loaded by finding the :theater-name from the campaign
;; info embedded file, then loading the corresponding .idx/.wch file.
;; For objectives, use the name-id to look up the name

(let [names (mission/read-strings "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/korea.idx"
                                  "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/korea.wch")]
  (names 567))

(mission/stringify @smpu :team-name 3)



(mission/stringify @smpu :package-name (->> @smpu :units (util/filter= :type :flight) first :package))


(count (mission/airbases @smpu))

(let [mission @smpu
      airbase-classes (->> mission
                           :class-table
                           (util/filter= #(get-in % [:vu-class-data :class-info :domain])
                                         c/DOMAIN_LAND)
                           (util/filter= #(get-in % [:vu-class-data :class-info :class])
                                         c/CLASS_OBJECTIVE)
                           (filter #(#{c/TYPE_AIRBASE c/TYPE_AIRSTRIP}
                                     (get-in % [:vu-class-data :class-info :type])))
                           (map :index)
                           set)]
  (count (->> mission
              :objectives
              (filterv (fn [objective]
                         (airbase-classes (- (:entity-type objective) 100)))))))

;; A nice gradient for header rows
;; linear-gradient(to bottom, white, white 33%, #eee 66%)

(->> @smpu :installation mission/read-image-ids (spit "/tmp/imageids.txt"))

(->> @smpu
     :units
     (group-by #(->> % :owner (mission/side @smpu)))
     (reduce-kv (fn [m side units]
                  (assoc m side (group-by :type units)))
                {})
     pprint)


(->> @smpu :vehicle-class-data csv-ize (spit "/tmp/vechicle-class-data.csv"))

;; How do we find out how many aircraft and of what type are in a squadron?

(let [mission @smpu
]
  (format "%d %s"

          vehicle-type))

(->> @smpu :unit-class-data csv-ize (spit "/tmp/unit-class-data.csv"))

(->> @smpu :objective-class-data csv-ize (spit "/tmp/objective-class-data.csv"))

(->> @smpu :feature-class-data csv-ize (spit "/tmp/feature-class-data.csv"))

(->> @smpu :feature-entry-data csv-ize (spit "/tmp/feature-entry-data.csv"))

(->> @smpu :point-header-data csv-ize (spit "/tmp/point-header-data.csv"))

(->> @smpu :units csv-ize (spit "/tmp/units.csv"))

(let [mission @smpu]
  (doseq [airbase (mission/airbases mission)]
    (printf "%30s %3d\n"
            (mission/stringify mission :airbase-name airbase)
            (mission/airbase-status mission airbase))))

(chunked-ui
 (div (ol (chunked-ui (li ..) (li (span ...)))))
 (input :type "checkbox"))

(defn frag
  [& content]
  (with-let [frag (.createDocumentFragment js/document)]
    (doseq [item content]
      (.appendChild frag content))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(require '[quil.core :as q])
(require '[weathergen.falcon.files :refer [spec-if]])
(require '[weathergen.falcon.constants :as c])

(defn read-index
  [path]
  ;; (log/debug "read-index" :path path)
  (let [common-header (buf/spec
                       :type buf/int32
                       :id (buf/string 32))
        image-header (buf/spec
                      :flags buf/int32
                      :center (buf/repeat 2 buf/int16)
                      :size (buf/repeat 2 buf/int16)
                      :image-offset buf/int32
                      :palette-size buf/int32
                      :palette-offset buf/int32)
        sound-header (buf/spec
                      :flags buf/int32
                      :channels buf/int16
                      :sound-type buf/int16
                      :offset buf/int32
                      :header-size buf/int32)
        flat-header  (buf/spec
                      :offset buf/int32
                      :size   buf/int32)
        file-header  (buf/spec :size buf/int32
                               :version buf/int32)
        idx-buf (fs/file-buf path)]
    (binding [octet.buffer/*byte-order* :little-endian]
      (let [{:keys [size]} (buf/read idx-buf file-header)]
        (loop [offset (buf/size file-header)
               items []]
          (if-not (-> size (- offset) pos?)
            items
            (let [[size common]    (buf/read* idx-buf common-header
                                              {:offset offset})
                  offset           (+ offset size)
                  [size specifics] (buf/read* idx-buf
                                              (condp = (:type common)
                                                c/_RSC_IS_IMAGE_  image-header
                                                c/_RSC_IS_SOUND_ sound-header
                                                c/_RSC_IS_FLAT_  flat-header)
                                              {:offset offset})]
              (recur (+ offset size)
                     (conj items (into common specifics))))))))))

(defn palette
  [image-buf image-data]
  (let [{:keys [palette-size palette-offset]} image-data]
    (binding [octet.buffer/*byte-order* :little-endian]
      (buf/read image-buf
                (buf/repeat palette-size buf/uint16)
                ;; Eight bytes accounts for the size and
                ;; version longs at the beginning of the
                ;; file.
                {:offset (+ palette-offset 8)}))))

;; The fact that we're packing argb into a single arg is a hack due to
;; the limitations of Clojure passing primitives - functions can't
;; have more than four primitive args
(defn read-image
  [resource image-id allocator]
  (let [index (read-index (str resource ".idx"))
        image-buf (fs/file-buf (str resource ".rsc"))
        image-data  (->> index (filter #(= image-id (:id %))) first)
        _ (assert image-data (with-out-str (print "Couldn't find an image with that ID" :resource resource :image-id image-id)))
        {:keys [palette-size palette-offset center image-offset size]} image-data
        palette (palette image-buf image-data)
        [width height] size
        is-8-bit? (-> image-data :flags (bit-and c/_RSC_8_BIT_) pos?)
        use-transparency? (-> image-data :flags (bit-and c/_RSC_USECOLORKEY_) pos?)]
    (when-not (-> image-data :type (= c/_RSC_IS_IMAGE_))
      (throw (ex-info "Not an image" {:reason ::not-an-image})))
    (when (and (not is-8-bit?) (not (-> image-data :flags (bit-and c/_RSC_16_BIT_) pos?)))
      (throw (ex-info "Image is neither 8-bit nor 16-bit" {:reason ::bit-size-unknown})))
    (let [image (allocate width height)
          pixel-bytes (if is-8-bit? 1 2)
          read-pixel (if is-8-bit?
                       octet.buffer/read-ubyte
                       octet.buffer/read-ushort)]
      (binding [octet.buffer/*byte-order* :little-endian]
        ;; TODO: Take out the limits
        (doseq [y (range (min height 1000))
                x (range (min width 1000))]
          (let [offset (+ 8 image-offset (* pixel-bytes (+ x (* y width))))
                c (read-pixel image-buf offset)
                raw ^long (if is-8-bit? (nth palette c) c)
                r ^long (-> raw (bit-shift-right 10) (bit-and 0x1f))
                g ^long (-> raw (bit-shift-right 5)  (bit-and 0x1f))
                b ^long (-> raw                      (bit-and 0x1f))
                transparent? (and use-transparency?
                                  (if is-8-bit?
                                    (zero? c)
                                    (= [31 0 31] [r g b])))
                argb ^long (-> (if transparent? 0 31)
                               (bit-shift-left 8)
                               (+ r)
                               (bit-shift-left 8)
                               (+ g)
                               (bit-shift-left 8)
                               (+ b))]
            (image x y argb))))
      image)))

(defn setup []
  (q/frame-rate 1)                    ;; Set framerate to 1 FPS
  (q/background 200))                 ;; Set the background colour to
                                      ;; a nice shade of grey.

(do
  (let [{:keys [width height pixels]} (read-image "/Users/candera/falcon/4.33.3/Data/Art/resource/campmap"
                                                  "BIG_MAP_ID")]
    (defn draw []
      (q/color-mode :rgb 1.0 1.0 1.0 1.0)
      (let [im (q/create-image width height :argb)]
        (doseq [x (range (min width 100))
                y (range (min height 100))]
          (let [pixel (aget pixels x y)]
            (when-not (zero? (.-a pixel))
              (q/set-pixel im
                           x y
                           (q/color (.-r pixel)
                                    (.-g pixel)
                                    (.-b pixel)
                                    (.-a pixel))))))
        (q/image im 0 0))))

  (q/defsketch example ;; Define a new sketch named example
    :title "Oh so many grey circles" ;; Set the title of the sketch
    :settings #(q/smooth 2)          ;; Turn on anti-aliasing
    :setup setup                     ;; Specify the setup fn
    :draw draw                       ;; Specify the draw fn
    :size [500 500])) ;; You struggle to beat the golden ratio


(let [index (read-index "/Users/candera/falcon/4.33.3/Data/Art/resource/campmap.idx")
      image-data (-> index :data first)
      image-buf (fs/file-buf "/Users/candera/falcon/4.33.3/Data/Art/resource/campmap.rsc")
      {:keys [size image-offset]}  image-data
      [width height] size
      x 4096
      y 4095]
  #_(get-pixel image-buf image-data (palette image-buf image-data) 4095 4095)
  image-data
  #_(.position image-buf (+ 8 (+ image-offset x (* y width))))
  #_(.getShort image-buf))

(let [index (read-index "/Users/candera/falcon/4.33.3/Data/Art/resource/campmap.idx")
      image-data (-> index :data first)
      image-buf (fs/file-buf "/Users/candera/falcon/4.33.3/Data/Art/resource/campmap.rsc")]
  (get-pixel image-buf image-data 20 20 ))


(let [index-files (->> "/Users/candera/falcon/4.33.3/Data/Art/resource/"
                       clojure.java.io/file
                       file-seq
                       (filter #(-> % .getName .toUpperCase (.endsWith ".IDX"))))
      indexes (zipmap index-files (map read-index index-files))]
  (doseq [f (->> indexes
                 (filter (fn [[file index]]
                           (->> index
                                (map :id)
                                (some #{"ICON_SU25"}))))
                 (map (fn [[file index]]
                        (.getAbsolutePath file))))]
    (println f)))

(-> @smpu :image-ids :id->name (get 10092))

(let [index (read-index "/Users/candera/falcon/4.33.3/Data/Art/resource/acicons.idx")
      image-buf (fs/file-buf "/Users/candera/falcon/4.33.3/Data/Art/resource/acicons.rsc")]
  (->> index (filter #(= "ICON_SU25" (:id %))) first))

(let [index-files (->> "/Users/candera/falcon/4.33.3/Data/Art/resource/"
                       clojure.java.io/file
                       file-seq
                       (filter #(-> % .getName .toUpperCase (.endsWith ".IDX"))))]
  (doseq [index-file index-files]
    (println "* "(.getAbsolutePath index-file))
    (let [index (read-index index-file)]
      (doseq [entry index]
        (println "** " (:id entry))))))

(time
 (let [resource "/Users/candera/falcon/4.33.3/Data/Art/resource/campmap"
       image-id "BIG_MAP_ID"
       index    (read-index (str resource ".idx"))
       image-buf ^java.nio.ByteBuffer (fs/file-buf (str resource ".rsc"))
       image-data  (->> index (filter #(= image-id (:id %))) first)
       _ (assert image-data (with-out-str (print "Couldn't find an image with that ID" :resource resource :image-id image-id)))
       {:keys [palette-size palette-offset center image-offset size]} image-data
       palette (palette image-buf image-data)
       [width height] size
       is-8-bit? (-> image-data :flags (bit-and c/_RSC_8_BIT_) pos?)
       pixels (make-array Pixel width height)
       pixel-bytes (if is-8-bit? 1 2)
       pixel-spec (if is-8-bit? buf/ubyte buf/short)
       output ^java.nio.ByteBuffer (buf/allocate (* 4 width height))]
   (.position image-buf (+ 8 image-offset))
   (log/debug :is-8-bit? is-8-bit?)
   (binding [octet.buffer/*byte-order* :little-endian]
     (doseq [^long y (range (min height 10000))
             ^long x (range (min width 10000))]
       (let [#_offset #_(+ 8 image-offset (* pixel-bytes (+ x (* y width))))
             c (if is-8-bit?
                 (let [b (.get image-buf)]
                   (if (neg? b)
                     (+ b 128)
                     b))
                 (let [s (.getShort image-buf)]
                   (if (neg? s)
                     (+ s 32768)
                     s)))
             #_(buf/read image-buf
                         pixel-spec
                         {:offset offset})
             raw (if is-8-bit? (nth palette c) c)
             r (-> raw (bit-shift-right 10) (bit-and 0x1f))
             g (-> raw (bit-shift-right 5)  (bit-and 0x1f))
             b (-> raw                      (bit-and 0x1f))
             transparent? (if is-8-bit?
                            (zero? c)
                            (= [31 0 31] [r g b]))
             ]
         (.put output (byte (if transparent? 0 31)))
         (.put output (byte r))
         (.put output (byte g))
         (.put output (byte b))
         #_(aset pixels ^long x ^long y
               ^Pixel (Pixel. (if transparent? 0 1)
                       (/ r 32.0)
                       (/ g 32.0)
                       (/ b 32.0)))
         )))
   {:width width :height height}))


(time
 (let [resource "/Users/candera/falcon/4.33.3/Data/Art/resource/campmap"
       image-id "BIG_MAP_ID"
       allocator (reify ImageAllocator
                   (allocate [this width height]
                     (println "Allocating" :width width :height height)
                     (fn [^long x ^long y ^long argb]
                       ;; Do nothing
                       )))]
   #_(image 5 5 20)
   (read-image resource image-id allocator)
   3))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Below this line is after I moved things into the project proper

(require '[weathergen.falcon.files.images :as im])

(time
 (let [resource "/Users/candera/falcon/4.33.3/Data/Art/resource/campmap"
       image-id "BIG_MAP_ID"
       allocator (fn [width height]
                   (println "Allocating" :width width :height height)
                   (fn [^long x ^long y ^long argb]
                     ;; Do nothing
                     ))]
   #_(image 5 5 20)
   (im/read-image nil resource image-id allocator)))

(require '[weathergen.falcon.files.images :as im])
(let [resource "/Users/candera/falcon/4.33.3/Data/Art/resource/campmap"
      image-id "BIG_MAP_ID"
      allocator (fn [width height]
                  (println "Allocating" :width width :height height)
                  (fn [^long x ^long y ^long argb]
                    ;; Do nothing
                    ))]
  (im/read-index "/Users/candera/falcon/4.33.3/Data/Art/resource/campmap.idx"))

(-> @smpu :theater :artdir)

(-> @smpu :installation :data-dir)

(->> @smpu :installation :theaters (map (juxt :name :objectdir)))

(->> @smpu :theater keys)

(let [installation  (->> "/Users/candera/falcon/4.33.3/"
                         mission/load-installation)]
  (map #(mission/campaign-dir installation %) (:theaters installation)))


(let [installation  (->> "/Users/candera/falcon/4.33.3/"
                         mission/load-installation)]
  (mission/find-theater installation "/Users/candera/falcon/4.33.3/Data/Add-On Korea Strong DPRK/Campaign/WNPU-Day  1 21 07 12.cam"))

(def m (delay (mission/read-mission "/Users/candera/falcon/4.33.3/Data/Add-On Korea Strong DPRK/Campaign/WNPU-Day  1 21 07 12.cam")))

(let [oob (mission/order-of-battle @wnpu)]
  (->> oob :air (into []) class))

(->> @wnpu :objectives :data csv-ize (spit "/tmp/wnpu-objectives.csv"))

(let [mission @wnpu
      airbases @#'mission/airbases

      {:keys [class-table
              objective-class-data
              feature-class-data
              feature-entry-data
              point-header-data]}
      mission

      airbase   (->> mission
                     airbases
                     (filter #(= 1212 (:camp-id %)))
                     first)
      airbase-class (-> airbase
                        :entity-type
                        (- 100)
                        (->> (nth class-table))
                        :data-pointer
                        (->> (nth objective-class-data)))
      {:keys [features first-feature]} airbase-class
      feature-info (map #(nth feature-entry-data %)
                        (range first-feature (+ first-feature features)))
      feature-status (for [f (range features)]
                         (let [i (-> f (/ 4) long)
                               f* (- f (* i 4))]
                           (if (or (neg? f*) (< 255 f*))
                             0
                             (-> airbase
                                 :f-status
                                 (nth i)
                                 (bit-shift-right (* f* 2))
                                 (bit-and 0x03)))))]
  feature-status
  ;;(mission/stringify mission :airbase-name airbase)
  ;; (:links airbase)
  )

(let [oob (mission/order-of-battle @wnpu)]
  (->> oob :air (into []) class))

;; Why is Suwon named "Nowhere" ?
(let [mission @wnpu
      airbases @#'mission/airbases

      {:keys [class-table
              objective-class-data
              feature-class-data
              feature-entry-data
              point-header-data]} mission
      airbase (->> mission
                   airbases
                   (filter #(= 817 (:camp-id %)))
                   first)
      airbase-class (-> airbase
                        :entity-type
                        (- 100)
                        (->> (nth class-table))
                        :data-pointer
                        (->> (nth objective-class-data)))
      airbase-parent (->> mission
                          :objectives
                          (filter #(= (:parent airbase) (:id %)))
                          first)
      names (:names mission)
      parent-name (-> airbase-parent :name-id names)
      class-table-entry (nth class-table (- (:entity-type airbase) 100))
      class-type (-> class-table-entry :vu-class-data :class-info :type)]
  (names 502)
  )

(let [names (-> @wnpu :names)]
  (doseq [i (range 2000)]
    (let [n (try
              (names i)
              (catch Exception _ ""))]
      (printf "%03d %s\n" i n))))

(let [names (-> @wnpu :strings :fn)]
  (doseq [i (range 2000)]
    (let [n (try
              (names i)
              (catch Exception _ ""))]
      (printf "%03d %s\n" i n))))

(let [names (-> @ito :names)]
  (doseq [n (range 1000 1007)]
    (println n (names n))))

;; Sunch'on Airbase name id = 344. What has that name?

(->> @wnpu
     :objectives
     (filter #(= 344 (:name-id %)))
     )

;; So, nothing does. Tons of zeros, though.

;; The rule appears to be: if the thing has a name ID of zero, and it
;; has a parent, then you look at the name of the parent and append to
;; that the name of the objective type, which comes from the
;; strings.wch file. See objectiv.cpp(2083).

(let [strings (mission/read-strings "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE" "strings")]
  (doseq [i (range 58 59)]
    (println (strings i))))


(-> @smpu class)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(let [mission @smpu
      x 20.1
      y 50.2]
  (->> (coords/fgrid->weather mission x y)
       (coords/weather->fgrid mission)))

(let [mission @smpu
      {:keys [campaign-info]} mission
      {:keys [bullseye-x bullseye-y]} campaign-info]
  (coords/fgrid->weather mission bullseye-x bullseye-y))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(->> @smpu
     mission/order-of-battle
     :air
     (mapcat ::mission/squadrons)
     (map #(mission/squadron-type @smpu %))
     (into #{}))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(let [mission @smpu
      side 2
      side-teams (->> mission
                      mission/teams
                      (filter #(-> % :team :c-team (= side)))
                      (map #(-> % :team :who))
                      set)]
  (disj side-teams side))

(->> @smpu
     mission/last-player-team
     :team
     :who)

(mission/sides @smpu)

(->> @smpu
     :teams
     (map :team)
     (map #(select-keys % [:name :flags])))

(->> @smpu
     mission/teams
     (map :team)
     (map :name))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(->> @ito :teams (map #(-> % :team (select-keys [:name :who :flags]))))

(->> @balkans :teams (map #(-> % :team (select-keys [:name :who :flags]))))


(->> @balkans :teams (map #(-> % :team (select-keys [:name :who :flags]))))

(->> @smpu :objectives (map :owner) distinct)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def b (mission/mission->briefing @smpu))

(require '[cognitect.transit :as transit])
(->> b weathergen.encoding/encode (spit "/tmp/briefing.json"))

(def b2 (-> "/tmp/briefing.edn" clojure.java.io/reader java.io.PushbackReader. read))

(require 'clojure.data)
(def d (clojure.data/diff b b2))

(map count (butlast d))

(->> (with-out-str (pprint (first d))) (spit "/tmp/missing.edn"))

(-> @smpu
    :units
    pprint
    (->> (spit "/tmp/units.edn")))

(let [n 1
      k :campaign-info]
 (butlast (clojure.data/diff (->> b
                                  :campaign-info)
                             (->> b2
                                  :campaign-info))))
(do
  (require '[cognitect.transit :as transit]
           '[clojure.java.io :as io])
  (-> "/Users/candera/falcon/4.33.3/Data/Add-On Korea EM1989 v2/Campaign/SMPU-Day  1 23 55 48.cam.vmtb"
      io/input-stream
      java.util.zip.GZIPInputStream.
      (transit/reader :json)
      transit/read
      (->> (def briefing))))

(def m (mission/briefing->mission {"Falcon BMS 4.33 U1" "/Users/candera/falcon/4.33.3"}
                                  (:briefing briefing)))


(class (mission/read-mission installs "/Users/candera/falcon/4.33.3/Data/Add-On Balkans/Campaign/SAVE2.CAM"))

(def b (read-briefing "/tmp/WNPU Mission 19.cam.vmtb"))

(-> b :weather :display-params :overlay)


(let [mission @fnpu
      squadrons (->> mission
                     :units
                     (group-by :type)
                     :squadron
                     (map (fn [squadron]
                            (assoc squadron
                                   ::aircraft (mission/squadron-aircraft mission squadron))))
                     ;; (group-by :airbase-id)
                     )
      airbases (mission/oob-air mission)
      ab-squadrons (->> airbases
                        (mapcat ::mission/squadrons))]

  (->> mission
       :vehicle-class-data
       csv-ize
       (spit "/tmp/vehicle-classes.csv"))
  #_(->> mission
         :objectives
         csv-ize
         (spit "/tmp/objectives.csv"))
  #_(->> mission
         :units
         csv-ize
         (spit "/tmp/units.csv"))
  #_(->> airbases
         csv-ize
         (spit "/tmp/airbases.csv"))
  #_(->> squadrons
         csv-ize
         (spit "/tmp/squadrons.csv"))
  #_(->> squadrons
         (filter #(= (:name %) "401st Fighter Squadron"))
         first
         :airbase-id
         (mission/find-objective mission :id)
         keys)
  #_{:squadrons (count squadrons)
     :ab-squadrons (count ab-squadrons)
     :names (->> squadrons (map :name))
     :missing (set/difference (->> squadrons (map :name) set)
                              (->> ab-squadrons (map :name) set))}
  #_(doseq [s (set/difference (->> squadrons (map :name) set)
                              (->> ab-squadrons (map :name) set))]
      (println s)))

(mission/objective-name @fnpu (mission/find-objective @fnpu :id {:name 1311 :creator 0}))

(let [{:keys [names strings]} @fnpu]
  (->> (range 3000)
       (map #(try (-> % strings .toLowerCase) (catch Exception _ "")))
       (filter #(.contains % "a"))))

(let [mission @fnpu]
  (@#'mission/carrier-name mission (first (@#'mission/carriers mission))))

(let [mission @fnpu]
  (count (@#'mission/army-bases mission)))

(let [mission @fnpu]
  (->> (for [base (mission/oob-air mission)]
         {:name (::mission/name base)
          :squadrons (count (::mission/squadrons base))})
       (sort-by :squadrons)
       (reverse)
       (take 20)))

(->> @fnpu
     mission/oob-air
     first
     ::mission/image)

(let [{:keys [image-ids]} @smpu]
  (get-in image-ids [:name->id "ICON_ASTRIP_VERT"]))

(->> (nth (:objective-class-data @fnpu) 2)
     :icon-index)

(-> @smpu :image-ids :name->id (get "ICON_ASTRIP_VERT"))

(let [mission @fnpu]
  (->> (mission/oob-air mission)
       first
       ::mission/image
       time
       #_pprint))

(let [mission @fnpu]
  (->> (im/make-descriptor mission "resource/campmap" "BIG_MAP_ID")
       im/cache-key))

(def phalanx
  (delay
   (log/debug "Reading FNPU...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.33.3/Data/Add-On Balkans/Campaign/PhalanxOffline.cam")]
     (log/debug "Done reading.")
     mission)))

(let [mission @phalanx]
  (->> mission mission/flights (into []) class))

(:mission-name @phalanx)

(let [mission @phalanx
      squadron-id 6773
      unit (->> mission :units (util/filter= :camp-id squadron-id) util/only)
      airbase-id (:airbase-id unit)]
  (if-let [airbase (some->> mission :objectives (util/filter= :id airbase-id) util/only)]
    ;; It's a land-based airbase
    (assoc airbase ::name (mission/objective-name mission airbase))
    ;; It's a carrier
    (let [carrier (some->> mission :units (util/filter= :id airbase-id) util/only)]
      (assoc carrier ::name (@#'mission/carrier-name mission carrier)))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(->> "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/loadout-test.tac"
     (mission/read-mission installs)
     mission/flights
     (map :loadouts)
     (map count)
     frequencies)

(->> "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/loadout-test.tac"
     (mission/read-mission installs)
     mission/flights
     (map :loadouts)
     first
     pprint)

(do
  (refresh)
  (binding [octet.buffer/*byte-order* :little-endian]
    (let [buf (fs/file-buf "/Users/candera/falcon/4.33.3/Data/Terrdata/objects/FALCON4.WCD")
          wcd (buf/read buf (weathergen.falcon.files/larray buf/uint16 mission/weapon-class-data))
          ]
      (->> wcd
          csv-ize
          (spit "/tmp/weapon-class-data.csv")))))

(->> "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/loadout-test.tac"
     (mission/read-mission installs)
     mission/flights
     rand-nth
     ::mission/loadouts)

(def flights (->> "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/loadout-test.tac"
                  (mission/read-mission installs)
                  mission/flights))

(->> flights
     rand-nth
     ::mission/waypoints
     pprint)

(->> @smpu
     :user-ids
     :name->id
     keys
     (filter #(-> % str/lower-case (.contains "arrowhead")))
     )

;; C++
       ;; 100kts,          0ft: 100.0
       ;; 200kts,          0ft: 200.0
       ;; 300kts,          0ft: 300.0
       ;; 400kts,          0ft: 400.0
       ;; 500kts,          0ft: 500.0
       ;; 600kts,          0ft: 600.0
       ;; 700kts,          0ft: 699.9
       ;; 800kts,          0ft: 798.8
       ;; 900kts,          0ft: 896.5
       ;; 100kts,       5000ft:  92.9
       ;; 200kts,       5000ft: 186.0
       ;; 300kts,       5000ft: 279.7
       ;; 400kts,       5000ft: 374.0
       ;; 500kts,       5000ft: 469.2
       ;; 600kts,       5000ft: 565.2
       ;; 700kts,       5000ft: 661.7
       ;; 800kts,       5000ft: 755.5
       ;; 900kts,       5000ft: 846.7
       ;; 100kts,      10000ft:  86.0
       ;; 200kts,      10000ft: 172.5
       ;; 300kts,      10000ft: 259.9
       ;; 400kts,      10000ft: 348.6
       ;; 500kts,      10000ft: 438.8
       ;; 600kts,      10000ft: 530.7
       ;; 700kts,      10000ft: 623.6
       ;; 800kts,      10000ft: 713.1
       ;; 900kts,      10000ft: 798.4
       ;; 100kts,      15000ft:  79.4
       ;; 200kts,      15000ft: 159.5
       ;; 300kts,      15000ft: 240.8
       ;; 400kts,      15000ft: 323.9
       ;; 500kts,      15000ft: 409.1
       ;; 600kts,      15000ft: 496.6
       ;; 700kts,      15000ft: 585.7
       ;; 800kts,      15000ft: 671.2
       ;; 900kts,      15000ft: 751.5
       ;; 100kts,      20000ft:  73.1
       ;; 200kts,      20000ft: 147.0
       ;; 300kts,      20000ft: 222.4
       ;; 400kts,      20000ft: 299.9
       ;; 500kts,      20000ft: 380.1
       ;; 600kts,      20000ft: 463.1
       ;; 700kts,      20000ft: 548.0
       ;; 800kts,      20000ft: 629.5
       ;; 900kts,      20000ft: 705.5
       ;; 100kts,      25000ft:  67.1
       ;; 200kts,      25000ft: 135.0
       ;; 300kts,      25000ft: 204.7
       ;; 400kts,      25000ft: 276.7
       ;; 500kts,      25000ft: 351.7
       ;; 600kts,      25000ft: 430.2
       ;; 700kts,      25000ft: 510.6
       ;; 800kts,      25000ft: 587.9
       ;; 900kts,      25000ft: 660.2
       ;; 100kts,      30000ft:  61.3
       ;; 200kts,      30000ft: 123.6
       ;; 300kts,      30000ft: 187.6
       ;; 400kts,      30000ft: 254.3
       ;; 500kts,      30000ft: 324.2
       ;; 600kts,      30000ft: 398.0
       ;; 700kts,      30000ft: 473.7
       ;; 800kts,      30000ft: 546.5
       ;; 900kts,      30000ft: 615.0
       ;; 100kts,      35000ft:  55.8
       ;; 200kts,      35000ft: 112.6
       ;; 300kts,      35000ft: 171.3
       ;; 400kts,      35000ft: 232.7
       ;; 500kts,      35000ft: 297.6
       ;; 600kts,      35000ft: 366.7
       ;; 700kts,      35000ft: 437.4
       ;; 800kts,      35000ft: 505.6
       ;; 900kts,      35000ft: 570.0
       ;; 100kts,      40000ft:  49.8
       ;; 200kts,      40000ft: 100.5
       ;; 300kts,      40000ft: 153.0
       ;; 400kts,      40000ft: 208.2
       ;; 500kts,      40000ft: 266.8
       ;; 600kts,      40000ft: 329.6
       ;; 700kts,      40000ft: 394.3
       ;; 800kts,      40000ft: 457.0
       ;; 900kts,      40000ft: 516.7
       ;; 100kts,      45000ft:  44.1
       ;; 200kts,      45000ft:  89.1
       ;; 300kts,      45000ft: 135.8
       ;; 400kts,      45000ft: 185.1
       ;; 500kts,      45000ft: 237.6
       ;; 600kts,      45000ft: 294.1
       ;; 700kts,      45000ft: 352.7
       ;; 800kts,      45000ft: 409.9
       ;; 900kts,      45000ft: 464.7

;; Clojure:

(doseq [alt (range 0.0 50000.0 5000.0)
        spd (range 100.0 1000.0 100.0)]
  (printf "%10.0fkts, %10.0fft: %s\n" spd alt (@#'mission/compute-speed spd alt)))

(let [alt 34000.0
      spd 460.0]
  (printf "%10.0fkts, %10.0fft: %s\n" spd alt (@#'mission/compute-speed spd alt)))

(->> @smpu
     mission/flights
     first
     ::mission/waypoints
     (map #(#'mission/waypoint-description @smpu %))
     pprint)

(-> @smpu strings :fn )

(->> @smpu
     mission/flights
     rand-nth
     ::mission/waypoints
     rand-nth
     (into (sorted-map))
     pprint)

(time/difference-hms {:day 1 :hour 14 :minute 19 :second 06 :millisecond 0}
                     {:day 1 :hour 14 :minute 39 :second 06 :millisecond 0})

(def blacklight
  (mission/read-mission
   installs
   "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/Operation_Blacklight.tac"))

(->> blacklight
     :objectives
     (map #(mission/objective-name blacklight %))
     count)

(let [{:keys [names]} blacklight]
  (names 1665))

(->> blacklight
     :objectives
     (filter #(-> % :name-id (= 5112)))
     first)

(mission/objective-name blacklight (mission/find-objective blacklight :id {:name 2691 :creator 0}))

(defn read-strings
  "Given a directory with a `name`.idx and `name`.wch files, return a
  function that given an index that will yield the string at that
  index."
  [dir name]
  (log/debug "read-strings" :dir dir :name name)
  (let [idx-buf (fs/file-buf (fs/path-combine dir (str name ".idx")))]
    (binding [octet.buffer/*byte-order* :little-endian]
      (let [n       (buf/read idx-buf buf/uint16)
            indices (buf/read idx-buf
                              (buf/repeat n buf/uint16)
                              {:offset 2})
            strings (fs/file-text (fs/path-combine dir (str name ".wch")))]
        (fn [idx]
          (log/debug "read-strings"
                     :idx idx
                     :n n
                     :len (count strings)
                     :indexes-count (count indices)
                     :start (nth indices idx)
                     :end  (if (= idx (dec n))
                             (count strings)
                             (nth indices (inc idx)))
                     )
          (log/spy (subs strings (nth indices idx)
                         (log/spy (if (= idx (dec n))
                                    (log/spy (count strings))
                                    (log/spy (nth indices (inc idx))))))))))))

(let [korea (read-strings "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE" "korea")]
  (korea 1663))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Damage vs weapon type

(let [mission                 @fnpu
      obj-name                "Haeju Shipyard"
      weapon-name             #".*Mk-.*"
      weapons                 (->> mission
                                   :weapon-class-data
                                   (filter #(re-matches weapon-name (:name %))))
      {:keys [class-table
              objective-class-data
              feature-class-data
              feature-entry-data
              point-header-data
              objectives]}    mission
      obj                     (->> objectives
                                   (filter #(= (str/lower-case (mission/objective-name mission %))
                                               (str/lower-case obj-name)))
                                   first)
      oce                     (mission/objective-class-entry mission obj)
      {:keys [features
              first-feature]} oce
      feature-info            (map #(nth feature-entry-data %)
                                   (range first-feature (+ first-feature features)))
      feature-class-info      (map (fn [feature]
                                     (let [ci (-> feature
                                                  :index
                                                  (->> (nth class-table)))]
                                       (assoc ci
                                              :feature-class-info
                                              (-> ci
                                                  :data-pointer
                                                  (->> (nth feature-class-data))))))
                                   feature-info)
      feature-status          (for [f (range features)]
                                (let [i  (-> f (/ 4) long)
                                      f* (- f (* i 4))]
                                  (if (or (neg? f*)
                                          (< 255 f*)
                                          ;; For some weird
                                          ;; reason (objectiv.cpp[259], there
                                          ;; can be more features than status
                                          ;; slots in the objective, in which
                                          ;; case they zero.
                                          (<= (count (:f-status obj)) i))
                                    0
                                    (-> obj
                                        :f-status
                                        (nth i 0)
                                        (bit-shift-right (* f* 2))
                                        (bit-and 0x03)))))
      feature-info            (map (fn [fi fs fci]
                                     (assoc fi
                                            :status fs
                                            :class-info fci
                                            ))
                                   feature-info
                                   feature-status
                                   feature-class-info)]
  (pprint (clojure.data/diff (nth feature-info 3) (nth feature-info 4)))
  #_(println "Recon Order,Target,Weapon,Hits Required")
  #_(doseq [[index feature] (map-indexed vector feature-info)
          weapon  weapons]
    (let [feature-name    (-> feature :class-info :feature-class-info :name)
          hit-points      (-> feature :class-info :feature-class-info :hit-points)
          damage-mods     (-> feature :class-info :feature-class-info :damage-mod)
          weapon-name     (:name weapon)
          damage-type     (:damage-type weapon)
          damage-strength (:strength weapon)
          damage-mod      (nth damage-mods damage-type)]
      (printf "%d,%s,%s,%.2f\n"
              (inc index)
              feature-name
              weapon-name
              (/ hit-points (* (/ damage-strength 100.0) damage-mod))))))

(damage-computer @fnpu #".*Mk-84.*" "haeju shipyard")

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(let [messages [{:type :started :id "1" :name "Reading briefing file"}
                {:type :started :id "2" :name "Something else"}]]
  (->> messages
       (reduce (fn [status message]
                 (let [{:keys [id type message name]} message
                       {:keys [steps order]} status]
                   (if (contains? steps id)
                     (cond-> status
                       message (update-in [:steps id :messages] conj message)
                       true    (assoc-in  [:steps id :state] type))
                     (-> status
                         (update :order conj id)
                         (assoc-in [:steps id] {:state    type
                                                :id       id
                                                :name     name
                                                :messages (when message [message])})))))
               {})
       pprint))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;



(let [tree-level (fn tree-level
                   [items parent]
                   (for [item items
                         :let [{:keys [id]} item
                               kids (->> items
                                         (filter #(= (:parent %) id))
                                         seq)]
                         :when (= (:parent item) parent)]
                     {:formatter :formatter
                      :item item
                      ;; :id id
                      ;; :kids kids
                      :children (when kids
                                  (tree-level items id))}))
      load-status [{:id :root
                    :name "Root"}
                   {:id :a
                    :name "Child1"
                    :parent :root}
                   {:id :b
                    :name "Child2"
                    :parent :root}
                   {:id :a1
                    :name "Child 1.1"
                    :parent :a}]]
  (pprint (tree-level load-status nil)))

(@#'mission/flights bugged-mission)

(->> bugged-mission
     mission/oob-air
     first
     ::mission/squadrons
     first
     keys)

(doseq [airbase (mission/oob-air bugged-mission)]
  (println (:camp-id airbase) (::mission/name airbase))
  (doseq [squadron (::mission/squadrons airbase)]
    (println "  - " (:camp-id squadron) (:name squadron))))

(doseq [flight (mission/flights bugged-mission)]
  (println (:camp-id flight)))

(->> bugged-mission
     mission/active-units
     (filter #(= (:camp-id %) 5063))
     first
     :squadron

     ;; (mission/find-unit bugged-mission :id)
     ;; (mission/find-unit bugged-mission :id)
     )

(def bugged-mission
  (read-briefing
   "/tmp/Briefing/FNPU2-40.vmtb"))

(-> bugged-mission
    keys
    pprint)

(->> @smpu
     ::mission/squadrons
     seq
     rand-nth
     second
     rand-nth
     ::mission/image
     #_(map ::mission/image)
     )

(->> @smpu
     ::mission/airbases
     (filter (fn [airbase]
               (->> airbase
                    ::mission/image
                    nil?
                    #_(some (fn [squadron]
                            (-> squadron
                                ::mission/image
                                nil?))))))
     count)

(->> @smpu
     mission/order-of-battle
     :air
     #_class
     count)

(def bugged-mission
  (mission/read-mission
   installs
   "/Users/candera/falcon/4.33.3/Data/Add-On Korea Strong DPRK/Campaign/WNPUNA20d.cam"))

(->> bugged-mission
     ::mission/carriers
     (filter (fn [airbase] (= (:id airbase) {:name 4665 :creator 0})))
     count)

(def bugged-mission
  (mission/read-mission
   installs
   "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/Save-Day  1 05 00 11.cam"))

(->>  bugged-mission
     ::mission/squadrons
     vals
     (mapcat identity)
     first
     (filter (fn [squadron]
               (nil? (@#'mission/squadron-airbase bugged-mission squadron))))
     first
     keys
     )

(for [[airbase squadrons] (::mission/squadrons bugged-mission)
      squadron squadrons
      :when (nil? (@#'mission/squadron-airbase bugged-mission squadron))
      ]
  [(mission/team-name bugged-mission (:owner squadron)) (:name squadron)])

(format-list ["a"])
(format-list ["a" "b"])
(format-list ["a" "b" "c"])

(class @smpu)

(def bugged-mission
  (mission/read-mission
   installs
   "/Users/candera/falcon/4.33.3/Data/Add-On Balkans/Campaign/balkans-bad-index-in-te-new.tac"))

298666

(class @smpu)

(class bugged-mission)

(-> bugged-mission :objectives last :radar-data)


(pprint (macroexpand-1 '(weathergen.cljs.macros/with-default-lenses
                          {foo 3
                           bar 3}
                          (+ foo bar))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def a (-> "/tmp/Ronchi_OCA2.txt.acmi" slurp acmi/read-acmi))

(->> a ::acmi/frames last keys)

(->> a ::acmi/frames last ::acmi/entities vals rand-nth keys)

(->> a ::acmi/frames last ::acmi/entities vals rand-nth ::acmi/object-type)

(->> a ::acmi/frames last ::acmi/entities vals (map ::acmi/object-type) distinct pprint)

(->> a ::acmi/frames last ::acmi/entities vals (filter ::acmi/removed?) count)

(->> a
     ::acmi/frames
     (mapcat ::acmi/events)
     (map ::acmi/event-type)
     distinct)

(-> a ::acmi/frames last ::acmi/entities vals rand-nth (select-keys [::acmi/u ::acmi/v ::acmi/alt ::acmi/lat ::acmi/long]))

(pprint (macroexpand-1 '(weathergen.cljs.macros/map-lens-tpl k v m (+ m k v))))

(def b (-> "/tmp/Ronchi_OCA_lone_wolf.txt.acmi" slurp acmi/read-acmi time))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(def b (read-briefing "/tmp/FNPU3.vmtb"))

(-> b keys)

(keys @smpu)

(->> @smpu
     ::mission/objectives
     (filter #(some-> %
                      ::mission/name
                      (str/index-of "Kimpo Airbase")
                      neg?
                      not))
     (mapcat ::mission/features)
     ;; (map #(-> %
     ;;           ::mission/class-info
     ;;           ::mission/feature-class-info))
     ;; rand-nth
     ;; keys
     csv-ize
     (spit "/tmp/features.csv")
     )

(->> @smpu
     ::mission/objectives
     (filter #(some-> %
                      ::mission/name
                      (str/index-of "Kimpo Airbase")
                      neg?
                      not))
     second
     (mission/objective-class-entry @smpu)
     :pt-data-index
     )

(->> @smpu
     ::mission/objectives
     (filter #(some-> %
                      ::mission/name
                      (str/index-of "Kimpo Airbase")
                      neg?
                      not))
     second
     ::mission/features
     ;; (mission/objective-class-entry @smpu)
     ;; :pt-data-index
     csv-ize
     (spit "/tmp/features.csv")
     )

(->> @smpu
     ::mission/objectives
     (filter #(some-> %
                      ::mission/name
                      (str/index-of "Kimpo Airbase")
                      neg?
                      not))
     second
     ::mission/features
     ;; (mission/objective-class-entry @smpu)
     ;; :pt-data-index
     csv-ize
     (spit "/tmp/features.csv")
     )

;; pt-data-index: 78
(-> @smpu
    :point-header-data
    (nth 86)
    )

(->> [1 7 6 5 8 2 3 4 2 3 4 5 15 14 13 12 9 10 11 12]
     ;;distinct
     count)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(pprint (util/csv-ize [{:a 1 :b 2 :d {:e 1 :f 2}} {:a 2 :c 3}]
                      {:key-remap make-friendly-export-key}))

(make-friendly-export-key [:a ::mission/c :foo/bar])

(->> @smpu
     ::mission/weapons
     rand-nth
     keys
     pprint)

(->> @smpu
     ::mission/objectives
     (sort-by ::mission/name)
     first
     ::mission/features
     (map #(select-keys % [:value ::mission/index :name]))
     pprint)


(->> @smpu
     ::mission/objectives
     first
     ::mission/image
     keys
     )

(->> @smpu
     ::mission/objectives
     (filter #(-> % ::mission/image nil?))
     ::mission/name
     )


(-> @ffw keys pprint)

(let [mission @ffw
      objective (-> mission
                 ::mission/objectives
                 rand-nth)]
  (pprint
   {:bridge (select-keys objective [:id ::mission/name :objective-type])
    :pointer (->> objective (mission/class-table-entry mission) :data-pointer)
    :type (->> objective (mission/class-table-entry mission) :vu-class-data :class-info :type)}))

(let [mission @ffw
      bridge (-> mission
                 ::mission/objectives
                 first)]
  (pprint
   {:bridge (select-keys bridge [:id ::mission/name :objective-type])
    :pointer (->> bridge (mission/class-table-entry mission) :data-pointer)
    :type (->> bridge (mission/class-table-entry mission) :vu-class-data :class-info :type)}))

;; OK, so I'm trying to figure out how to to sort out the type of the
;; objective, and I don't understand the data structure. Specifically,
;; there's :data-pointer and the class table entry, which I don't
;; really understand the difference between. I think the class data is
;; generic, like it applies to all entities, and the data pointer
;; indexes into the objective class data, which is specific to
;; objectives. The above bridge, "Gwan-gi Bridge", prints this info:

{:bridge
 {:id {:name 456, :creator 0},
  :weathergen.falcon.files.mission/name "Gwan-gi Bridge",
  :objective-type 1979},
 :pointer 531,
 :type 6}

;; In mission commander, it has "OCD ID" (which I assume is objective
;; class data ID) 1979, which matches :objective-type but
;; not :pointer. If I look in the BMS editor, objective class 531 is "78B Bridge 1":

(-> @ffw
    :objective-class-data
    (nth 531)
    :name)

;; The above code returns "78B Bridge 1", too. Oh! Objective type is a
;; pointer (minus 100, so 1879) into the class table:

(-> @ffw
    :class-table
    (nth 1879)
    :data-pointer)

;; Returns 531, which is the index into the objective class table. So
;; objective-type is the pointer from the objective to the class
;; table, which in turn points to the objective class table.

;; Got it.

;; OK, so if I want to group objectives by type, I need to do something like this:

(->> @ffw
    ::mission/objectives
    (group-by ::mission/type))


(let [zone-rules (java.time.zone.ZoneRulesProvider/getRules "America/New_York" false)]
 (->> (iterate (fn [t]
                 (-> zone-rules
                     (.nextTransition t)
                     .getInstant))
               (java.time.Instant/now))
      (map (fn [t]
             {:start (str t)
              :offset (str (.getOffset zone-rules t))}))
      (take 15)
      pprint))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

javafx.application.Application

(def app (proxy [javafx.application.Application] []
           (start [stage]
             (log/info "calling super")
             (proxy-super start stage)
             (log/info "I started")))
  )

(javafx.application.Application/launch (class app) (into-array String []))

(javafx.application.Platform/runLater (fn [] (.start app (javafx.stage.Stage.))))

(.stop app)

(def stage (javafx.application.Platform/runLater (fn [] (javafx.stage.Stage.))))

(javafx.application.Platform/runLater (fn [] (javafx.embed.swing.JFXPanel.) (def stage (javafx.stage.Stage.))))

(class stage)

stage

(gen-class :name Foo :extends javafx.application.Application)

(future (ShimApplication/main (into-array String [])))

(javafx.application.Platform/runLater (fn [] (def stage (javafx.stage.Stage.))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(import (javafx.scene SceneBuilder)
        (javafx.scene.control ButtonBuilder)
        (javafx.scene.layout VBoxBuilder)
        (javafx.stage StageBuilder))

(defonce force-toolkit-init (javafx.embed.swing.JFXPanel.))

(defn run-later*
  [f]
  (javafx.application.Platform/runLater f))

(defmacro run-later
  [& body]
  `(run-later* (fn [] ~@body)))

(defn run-now*
  [f]
  (let [result (promise)]
    (run-later
     (deliver result (try (f) (catch Throwable e e))))
    @result))

(defmacro run-now
  [& body]
  `(run-now* (fn [] ~@body)))

(defn event-handler*
  [f]
  (reify javafx.event.EventHandler
    (handle [this e] (f e))))

(defmacro event-handler [arg & body]
  `(event-handler* (fn ~arg ~@body)))

(def stage (atom nil))

;; You of course don't have to write it all in one block. Using a (def
;; button (.. ButtonBuilder ...)) and then adding button is just as
;; good (probably better most of the times).
(run-now (reset! stage (.. StageBuilder create
                                  (title "Hello JavaFX")
                                  (scene (.. SceneBuilder create
                                             (height 480) (width 640)
                                             (root (.. VBoxBuilder create
                                                       (minHeight 480) (minWidth 640)
                                                       (children [(.. ButtonBuilder create
                                                                      (text "Say \"Hello Clojure\"!")
                                                                      (onAction (event-handler [_] (println "Hello Clojure!")))
                                                                      build)])
                                                       build))
                                             build))
                                  build)))

(run-now (.show @stage))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;
;; 4.34 support
;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(let [;; path         "/Users/candera/falcon/4.34/Data/Campaign/MantisAtDawn-Day  1 18 30 05.cam"
      path          "/Users/candera/falcon/4.33.3/Data/Add-On Korea EM1989 v2/Campaign/SMPU-Day  1 23 55 48.cam"
      install-dir   (mission/find-install-dir path)
      installation  (mission/load-installation install-dir)
      theater       (mission/find-theater installation path)
      campaign-dir  (mission/campaign-dir installation theater)
      strings       (mission/read-strings-file campaign-dir)
      database      (assoc (mission/load-initial-database installation theater)
                           :strings strings)
      mission-files (mission/read-embedded-files path database)]
  (s/explain mission/EmbeddedFiles mission-files))

(set! s/*explain-out* (fn [data] (println "explain: " data)))
(set! s/*explain-out* expound-explainer)

(stest/instrument)

(s/explain ::mission/class-table (->> @smpu :class-table (take 1)))
(s/explain ::mission/unit-class-data (->> @smpu :unit-class-data (take 1)))
(s/explain ::mission/objective-class-data (->> @smpu :objective-class-data (take 1)))
(s/explain ::mission/vehicle-class-data (->> @smpu :vehicle-class-data (take 1)))
(s/explain ::mission/weapon-class-data (->> @smpu :weapon-class-data (take 1)))
(s/explain ::mission/feature-class-data (->> @smpu :feature-class-data (take 1)))
(s/explain ::mission/feature-entry-data (->> @smpu :feature-entry-data (take 1)))
(s/explain ::mission/point-header-data (->> @smpu :point-header-data (take 1)))
(s/explain ::mission/user-ids (->> @smpu :user-ids))
(s/explain ::mission/image-ids (->> @smpu :image-ids))

(-> @smpu :user-ids :name->id keys)

(s/explain mission/Mission @smpu)

(let [spec-for (fn [k]
                 (condp = k
                   :objectives :raw/objectives
                   (keyword (namespace ::mission/foo) (name k))))]
  (doseq [[k v] (sort @smpu)]
    (print k ":")
    (if-let [data (s/explain-data (spec-for k)
                                  (if (sequential? v)
                                    (take 2 v)
                                    v))]
      (do
        (spit (str "/tmp/" (name k) ".edn")
              (with-out-str
                (pprint data)))
        (println "FAIL"))
      (println "OK"))))

(:installs @smpu)

(pprint (keys @smpu))

(-> @smpu ::mission/army-bases first ::mission/image :idx-size)

(pprint
 (s/explain (s/fspec :args (s/cat :idx integer?)
                                 :ret (s/nilable string?))
            (:names @smpu)))

((:names @smpu) -1)


(-> @smpu :scenario-files :campaign-info keys sort pprint)

(let [ ;; path         "/Users/candera/falcon/4.34/Data/Campaign/MantisAtDawn-Day  1 18 30 05.cam"
      path          "/Users/candera/falcon/4.33.3/Data/Add-On Korea EM1989 v2/Campaign/SMPU-Day  1 23 55 48.cam"
      version       (-> (@#'mission/read-embedded-files path nil {::file-types #{:version}})
                        :version
                        :version)
      ;; install-dir   (mission/find-install-dir path)
      ;; installation  (mission/load-installation install-dir)
      ;; theater       (mission/find-theater installation path)
      ;; campaign-dir  (mission/campaign-dir installation theater)
      ;; strings       (mission/read-strings-file campaign-dir)
      ;; database      (assoc (mission/load-initial-database installation theater)
      ;;                      :strings strings)
      ;; mission-files (mission/read-embedded-files path database)
      ]
  ;; (s/explain mission/EmbeddedFiles mission-files)
  version
  )

"a b c"

"a b  c"

(do
  (println "Starting")
  (if-let [data (s/explain-data mission/Mission @m434)]
    (do
      (spit (str "/tmp/mission.edn")
            (with-out-str
              (pprint data)))
      (println "FAIL"))
    (println "OK")))

(require '[weathergen.falcon.files.mission.xml :as xml])

(let [xml (fs/file-text "/tmp/ct.xml")]
  (xml/parse xml :class-table))


(let [xml (fs/file-text "/tmp/ct.xml")
      parsed (clojure.data.xml/parse-str xml)
      mapping (get xml/mappings :class-table)
      content-map (->> parsed
                       :content
                       (filter clojure.data.xml/element?)
                       first
                       :content
                       (filter clojure.data.xml/element?)
                       (reduce (fn [m subelem]
                                 (assoc m
                                        (name (:tag subelem))
                                        (reduce str (:content subelem)))
                                 )
                               {}))]
  #_(@#'xml/parse-field "CollisionRadius" :float content-map)
  (pprint (reduce-kv (fn [m from to]
                       (let [{:keys [coersion path]} to]
                         (println from coersion path)
                         (assoc-in m path
                                   (@#'xml/parse-field from coersion content-map))))
                     {}
                     (:fields mapping)))
  )

(let [data (xml/parse (fs/file-text "/tmp/ct.xml") :class-table)]
  (if-let [problems (s/explain ::mission/class-table data)]
    (println "FAIL")
    (println "PASS")))

(util/str->float nil)

(@#'xml/coerce :float "0")

(let [spec-for (fn [k]
                 (condp = k
                   :objectives :raw/objectives
                   (keyword (namespace ::mission/foo) (name k))))]
  (doseq [[k v] (sort @smpu)]
    (print k ":")
    (if-let [data (s/explain-data (spec-for k)
                                  (if (sequential? v)
                                    (take 2 v)
                                    v))]
      (do
        (spit (str "/tmp/" (name k) ".edn")
              (with-out-str
                (pprint data)))
        (println "FAIL"))
      (println "OK"))))

(def r
  (let [path "/Users/candera/falcon/4.34/Data/Campaign/-BMS 000- Benchmark Test.tac"
;;path         "/Users/candera/falcon/4.34/Data/Campaign/MantisAtDawn-Day  1 18 30 05.cam"
        ;; path         "/Users/candera/falcon/4.33.3/Data/Add-On Korea EM1989 v2/Campaign/SMPU-Day  1 23 55 48.cam"
        mission-buf  (fs/file-buf path)
        version      (-> (@#'mission/read-embedded-files mission-buf nil {::mission/file-types #{:version}})
                         :version
                         :version)
        install-dir  (mission/find-install-dir path)
        installation (mission/load-installation install-dir)
        theater      (mission/find-theater installation path)
        campaign-dir (mission/campaign-dir installation theater)
        strings      (mission/read-strings-file campaign-dir)
        database     (assoc (mission/load-initial-database installation theater {:database/version version})
                            :strings strings)
        ;;mission-files (mission/read-embedded-files path database)
        ]
    ;; (s/explain mission/EmbeddedFiles mission-files)
    ;; version
    database
    (cognitect.rebl/inspect database)
    ))

"a b  c"


(doseq [k [:class-table
           :unit-class-data
           :objective-class-data
           :vehicle-class-data
           :weapon-class-data
           :feature-class-data
           :feature-entry-data
           :point-header-data
           ]]
  (println "Starting" k)
  (if-let [problems (s/explain-data
                     (keyword (namespace ::mission/foo)
                              (name k))
                     (k r))]
    (do
      (spit (str "/tmp/" (name k) ".edn")
            (with-out-str
              (pprint problems)))
      (println "FAIL"))
    (println "PASS")))

(-> r :feature-entry-data rand-nth pprint)

(nil? (s/explain-data ::mission/unit-class-data (:unit-class-data r)))

(-> r :unit-class-data rand-nth :damage)

(let [data (clojure.data.xml/parse-str (fs/file-text "/tmp/ct.xml"))]
  (-> data :content second :attrs))

(-> r :weapon-class-data rand-nth pprint)

(let [mission m434
      spec-for (fn [k]
                 (condp = k
                   :objectives :raw/objectives
                   (keyword (namespace ::mission/foo) (name k))))]
  (doseq [[k v] (sort @mission)]
    (print k ":")
    (if-let [data (s/explain-data (spec-for k)
                                  (if (sequential? v)
                                    (take 2 v)
                                    v))]
      (do
        (spit (str "/tmp/" (name k) ".edn")
              (with-out-str
                (pprint data)))
        (println "FAIL"))
      (println "OK"))))


(->
 (def r
   (let [ ;; path         "/Users/candera/falcon/4.34/Data/Campaign/MantisAtDawn-Day  1 18 30 05.cam"
         ;; path         "/Users/candera/falcon/4.33.3/Data/Add-On Korea EM1989 v2/Campaign/SMPU-Day  1 23 55 48.cam"
         path "/Users/candera/falcon/4.34/Data/Campaign/-BMS 000- Benchmark Test.tac"
         mission-buf  (fs/file-buf path)
         version      (-> (@#'mission/read-embedded-files mission-buf nil {::mission/file-types #{:version}})
                          :version
                          :version)
         install-dir  (mission/find-install-dir path)
         installation (mission/load-installation install-dir)
         theater      (mission/find-theater installation path)
         campaign-dir (mission/campaign-dir installation theater)
         strings      (mission/read-strings-file campaign-dir)
         database     (assoc (mission/load-initial-database installation theater {:database/version version})
                             :strings strings)
         ;; mission-files (@#'mission/read-embedded-files mission-buf database
         ;;                {::mission/file-types #{:units}})
         ]
     (binding [octet.buffer/*byte-order* :little-endian]
       ;; TODO: Make this whole thing into a spec
       (let [dir-offset (buf/read mission-buf buf/uint32)
             dir-file-count (buf/read mission-buf buf/uint32 {:offset dir-offset})
             directory (buf/read mission-buf (buf/repeat dir-file-count mission/directory-entry)
                                 {:offset (+ dir-offset 4)})
             _ (println "entries" (map (comp mission/file-type :file-name) directory))
             files (for [entry directory
                         :let [type (-> entry :file-name mission/file-type)]]
                     (assoc entry
                            :type type
                            :entry entry
                            :data mission-buf))
             entry (->> files (filter #(= :units (:type %))) first)
             {:keys [offset length]} entry
             class-table (:class-table database)]
         (let [header-spec (buf/spec :compressed-size buf/int32
                                     :num-units buf/int16
                                     :uncompressed-size buf/int32)
               {:keys [compressed-size
                       num-units
                       uncompressed-size]} (buf/read mission-buf
                                                     header-spec
                                                     {:offset offset})
               _ (println num-units "units")
               data (lzss/expand mission-buf
                                 (+ offset (buf/size header-spec))
                                 (- length 6)
                                 uncompressed-size)]
           ;; Oddly, there can be entries in the table where the unit type
           ;; is zero. That'll return a nil unit when read, which we throw
           ;; away.
           #_(log/debug "read-embedded-file* (:units)"
                        :num-units num-units
                        :compressed-size compressed-size
                        :uncompressed-size uncompressed-size)
           (->> (buf/read
                 data
                 (buf/repeat 6 (mission/unit-record database)))
                ;; last
                ;; (mission/unit-name database)
                cognitect.rebl/inspect
                #_(remove nil?)
                #_(mapv (fn [unit]
                          (assoc unit :name (mission/unit-name database unit)))))))))))

(-> r :units )

java.nio.file.File

(let [file (java.io.File. "/tmp/out-433.bin")
      stream (java.io.FileOutputStream. file false)
      chan (.getChannel stream)]
  (doto chan
    (.write r)
    (.close)))

(class @m434)

;; Package has camp ID at offset 0x06a4, so it starts at 0x06a4 - 0x1d = 0x0687 (1671). Since the type ID takes up two bytes, the length of the squadron record that preceeds is is 0x0685, which is 1669. But we're reading from 1270, so we're missing something big...



;; Pilots
;;   1 0x01: Col Klemmick
;; 180 0xB4: Lt. Fitzpatrick
;; 179 0xB3: Lt. Gatterer
;; 178 0xB2: Lt. Ray

;; 0x0788 looks like fuel (7162) four times then laser codes (1688) four times. Next byte is 00e8

;; First byte of any unit is its class ID. The unit after the flight is a package with class 530 (0x0212), so it looks like the third unit starts at 0x8a9.

;; Starts:
;; Unit 0 - squadron - 0x0000
;; Unit 1 - flight - 0x0687
;; Unit 3 - package - 0x08a9

;; SQUADRONS
;; Squadron stores size raise from 600 to 999
;; Squadron patch changed from byte to int

;; FLIGHT
;; Initial fuel for each AC
;; Laser code for each AC

(let [mission m434
      spec-for (fn [k]
                 (condp = k
                   :objectives :raw/objectives
                   (keyword (namespace ::mission/foo) (name k))))]
  (doseq [[k v] (sort @mission)]
    (print k ":")
    (if-let [data (s/explain-data (spec-for k)
                                  (if (sequential? v)
                                    (take 2 v)
                                    v))]
      (do
        (spit (str "/tmp/" (name k) ".edn")
              (with-out-str
                (pprint data)))
        (println "FAIL"))
      (println "OK"))))


(do
  (def r
    (let [path         "/Users/candera/falcon/4.34/Data/Campaign/MantisAtDawn-Day  1 18 30 05.cam"
          ;; path         "/Users/candera/falcon/4.33.3/Data/Add-On Korea EM1989 v2/Campaign/SMPU-Day  1 23 55 48.cam"
          ;; path          "/Users/candera/falcon/4.34/Data/Campaign/-BMS 000- Benchmark Test.tac"
          mission-buf   (fs/file-buf path)
          version       (-> (@#'mission/read-embedded-files mission-buf nil {::mission/file-types #{:version}})
                            :version
                            :version)
          install-dir   (mission/find-install-dir path)
          installation  (mission/load-installation install-dir)
          theater       (mission/find-theater installation path)
          campaign-dir  (mission/campaign-dir installation theater)
          strings       (mission/read-strings-file campaign-dir)
          database      (assoc (mission/load-initial-database installation theater {:database/version version})
                               :strings strings)
          mission-files (@#'mission/read-embedded-files mission-buf database
                         {::mission/file-types #{:units}})]
      {:database      database
       :mission-files mission-files}))
  (cognitect.rebl/inspect r))

(rebl)

(->> r :mission-files :units (filter #(-> % :id :name (= 8407))) cognitect.rebl/inspect)

(->> @m434 :teams (filter #(-> % :flags (util/has-flag? 1))) cognitect.rebl/inspect)

(util/has-flag? 23 1)

(-> @m434 :teams cognitect.rebl/inspect)cpf

(-> @m434 cognitect.rebl/inspect)

(-> @m434 mission/order-of-battle  cognitect.rebl/inspect)

(require
  '[cljs.repl :as repl]
  '[cljs.repl.node :as node])

(repl/repl* (node/repl-env)
  {:output-dir "out"
   :optimizations :none
   :cache-analysis true
   :source-map true})

(require
  '[cljs.repl :as repl]
  '[cljs.repl.browser :as browser])

(repl/repl* (browser/repl-env)
  {:output-dir "out"
   :optimizations :none
   :cache-analysis true
   :source-map true})

(->> @m434
     ::mission/airbases
     (filter (fn [airbase]
               (-> airbase ::mission/image nil?)))
     cognitect.rebl/inspect)

;;
;; How to tell if a weapon is air-to-ground

(->> @smpu
     :weapon-class-data
     rand-nth
     pprint)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;
;; Load the sim weapon data table
;;

(-> @smpu
     :sim-weapon-data
     (nth 395)
     pprint)

(-> @smpu
     ::mission/weapons
     ;;rand-nth
     (nth 184)
     pprint)

(-> @smpu
    :class-table
    (nth 516) ; :index from
    pprint)

(->> @smpu
     :sim-weapon-data
     ())

(->> @smpu
     ::mission/weapons
     (map #(assoc % :sim-weapon-data
                  (-> %
                      :index
                      (->> (nth (:class-table @smpu)))
                      :vehicle-data-index
                      (->> (nth (:sim-weapon-data @smpu))))))
     (#(nth % 184))
     (pprint))


(-> @tiger-spirit
    cognitect.rebl/inspect)

(->> @tiger-spirit
     :teams
     (map :team)
     (map #(select-keys % [:who :flags :c-team :name]))
     pprint)

(->> @iron-fortress
     :teams
     (map :team)
     (map #(select-keys % [:who :flags :c-team :name]))
     pprint)

()

(-> @tiger-spirit cognitect.rebl/inspect)

;; Mantis:

({:who 0, :flags 4, :c-team 0, :name "XX"}
 {:who 1, :flags 23, :c-team 1, :name "U.S."} ;; green
 {:who 2, :flags 6, :c-team 1, :name "ROK"} ;; green
 {:who 3, :flags 6, :c-team 1, :name "Japan"} ;; green
 {:who 4, :flags 4, :c-team 4, :name "CIS"}
 {:who 5, :flags 4, :c-team 5, :name "PRC"}
 {:who 6, :flags 4, :c-team 6, :name "DPRK"}
 {:who 7, :flags 7, :c-team 7, :name "NATO"}  ;l blue
)

;; Tiger:

({:who 0, :flags 4, :c-team 0, :name "XX"}
 {:who 1, :flags 6, :c-team 2, :name "U.S."} ; Blue
 {:who 2, :flags 7, :c-team 2, :name "ROK"}  ; Blue
 {:who 3, :flags 7, :c-team 3, :name "Japan"} ; orange
 {:who 4, :flags 7, :c-team 4, :name "CIS"}  ; orange2
 {:who 5, :flags 6, :c-team 6, :name "PRC"}  ; red
 {:who 6, :flags 21, :c-team 6, :name "DPRK"} ; red
 {:who 7, :flags 4, :c-team 7, :name "NATO"})

;; Double Dragon:

({:who 0, :flags 4, :c-team 0, :name "XX"}
 {:who 1, :flags 6, :c-team 2, :name "U.S."} ; blue
 {:who 2, :flags 7, :c-team 2, :name "ROK"} ; blue
 {:who 3, :flags 6, :c-team 2, :name "Japan"} ; blue
 {:who 4, :flags 7, :c-team 4, :name "CIS"} ; orange
 {:who 5, :flags 7, :c-team 5, :name "PRC"} ; yellow
 {:who 6, :flags 5, :c-team 6, :name "DPRK"} ; red
 {:who 7, :flags 4, :c-team 7, :name "NATO"})

;; Bear Trap:

({:who 0, :flags 4, :c-team 0, :name "XX"}
 {:who 1, :flags 4, :c-team 1, :name "U.S."}
 {:who 2, :flags 23, :c-team 2, :name "ROK"} ; blue
 {:who 3, :flags 4, :c-team 3, :name "Japan"}
 {:who 4, :flags 7, :c-team 4, :name "CIS"} ; orange
 {:who 5, :flags 4, :c-team 5, :name "PRC"}
 {:who 6, :flags 4, :c-team 6, :name "DPRK"}
 {:who 7, :flags 4, :c-team 7, :name "NATO"})


;; Rolling Fire:

({:who 0, :flags 4, :c-team 0, :name "XX"}
 {:who 1, :flags 6, :c-team 2, :name "U.S."} ; blue
 {:who 2, :flags 23, :c-team 2, :name "ROK"} ; blue
 {:who 3, :flags 6, :c-team 2, :name "Japan"} ; blue
 {:who 4, :flags 7, :c-team 4, :name "CIS"} ; orange
 {:who 5, :flags 7, :c-team 5, :name "PRC"} ; yellow
 {:who 6, :flags 5, :c-team 6, :name "DPRK"} ; red
 {:who 7, :flags 4, :c-team 7, :name "NATO"})

;; Iron Fortress:

({:who 0, :flags 4, :c-team 0, :name "XX"}
 {:who 1, :flags 6, :c-team 2, :name "U.S."} ; blue
 {:who 2, :flags 7, :c-team 2, :name "ROK"} ; blue
 {:who 3, :flags 7, :c-team 3, :name "Japan"} ; orange1
 {:who 4, :flags 7, :c-team 4, :name "CIS"} ; orange2
 {:who 5, :flags 7, :c-team 5, :name "PRC"} ; yellow
 {:who 6, :flags 5, :c-team 6, :name "DPRK"} ; red
 {:who 7, :flags 4, :c-team 7, :name "NATO"})

(->> @bear-trap
     mission/teams
     (map :team)
     (map :name))

(inspect @bear-trap)

(binding [octet.buffer/*byte-order* :little-endian]
 (let [buf (fs/file-buf "/Users/candera/falcon/4.34/Data/Campaign/WeatherMapsUpdates/100000.Fmap")]
   (take 5 (buf/read buf (buf/repeat (* 59 59) buf/float)
                     {:offset (+ 0x2c
                                 (* 3 4 59 59)
                                 )}))))

(let [buf (fs/file-buf "/Users/candera/falcon/4.34/Data/Campaign/WeatherMapsUpdates/100000.Fmap")]
  (def f (binding [octet.buffer/*byte-order* :little-endian]
           (buf/read buf vmt.fmap/header-spec))))

(let [buf (fs/file-buf "/Users/candera/falcon/4.34/Data/Campaign/WeatherMapsUpdates/100000.Fmap")]
  (def f (vmt.fmap/decode buf)))

(->> f :vmt.fmap/cloud-coverage rand-nth)

(inspect f)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(model/pressure-pattern [0.5 0.5])

(pprint
 (let [x (rand-int 1000)
       y (rand-int 1000)]
  (for [t (range 0 1 1/24)]
    [x y t (+ 29 (* (- 31 29) (model/smoothed-noise-field x y t 123 2)))])))

(/  (->>
     (let [x (rand-int 1000)
           y (rand-int 1000)]
       (for [t (range 0 1000 1/24)]
         (model/smoothed-noise-field x y t 123 2)))
     (map #(Math/pow % 0.7))
     (reduce +))
    24000)

(model/smoothed-noise-field 10 20 30 123 2)

(math/clamp 0 1 0.25)

(->>
 (let [x (rand-int 1000)
       y (rand-int 1000)
       seed (rand-int 10000)]
   (for [t (range 1 100 0.001)]
     [seed x y t (model/smoothed-noise-field x y t seed 200)]))
 (clojure.data.csv/write-csv (clojure.java.io/writer "/tmp/data13.csv")))

(model/smoothed-noise-field 97 328 38.99999999999981 4919 200)


(let [x 97
      y 328
      t 38.99899999999981
      t 38.99999999999981
      t 39.000999999999806
      ;;t 38.99999999999
      ;; t 39.5
      ;; t 38.999999999999
      seed 4919
      zoom 200
      t* (long (Math/floor (+ t seed)))]
  [[(let [t 38.99899999999981] [t (long (Math/floor (+ t seed)))])]
   [(let [t 38.99999999999981] [t (long (Math/floor (+ t seed)))])]
   [(let [t 39.000999999999806] [t (long (Math/floor (+ t seed)))])]]
  #_(-> (math/interpolate (math/fractal-field x
                                              y
                                              zoom
                                              (+ t* 0.01) 1)
                          (math/fractal-field x
                                              y
                                              zoom
                                              (+ t* 1.01) 1)
                          (mod (math/frac t) 1.0))
        (#?(:clj Math/pow :cljs js/Math.pow) 0.7)
        (- 0.2)
        (* 1.6)))_


(let [x (rand-int 1000)
      y (rand-int 1000)
      seed (rand-int 10000)
      stats
      (->>
       (for [t (range 1 100000)]
         [seed x y t (model/smoothed-noise-field x y t seed 200)])
       (reduce (fn [stats [seed x y t v]]
                 (-> stats
                     (update :min #(min %1 %2) v)
                     (update :max #(max %1 %2) v)
                     (update :sum + v)
                     (update :samples inc)))
               {:seed seed
                :x x
                :y y
                :samples 0
                :min 1000
                :max 0
                :sum 0}))]
  (assoc stats
         :mean (/ (:sum stats) (:samples stats))))

(->>
 (let [x (rand-int 1000)
       y (rand-int 1000)
       zoom 32
       seed (rand-int 10000)]
   (for [x (range 1 100 0.01)]
     [seed x y (math/fractal-field x y zoom seed 1.0)]))
 (clojure.data.csv/write-csv (clojure.java.io/writer "/tmp/data19.csv")))


(math/fractal-field 123 1234 32 1234 1.0)

(math/interpolate 1 10 0.5)

(let [[origin-x origin-y]      origin 
      x*                       (/ (+ origin-x x) feature-size)
      y*                       (/ (+ origin-y y) feature-size)
      ;; These next two values get computed over and over again. I
      ;; used to precompute them and pass them in, but that made for
      ;; a confusing API. Might need to find a way to have an
      ;; efficient precomputation mechanism during an optimization
      ;; pass.
      {:keys [offset current]} time
      t                        (+ offset (time/campaign-time->minutes current))
      ;; TODO: Why do we need this 10 here?
      t*                       (/ t evolution 10)
      max-pressure             (:max pressure) ; 100
      min-pressure             (:min pressure) ; 0
      params*                  (assoc params
                                      ::pat/x x*
                                      ::pat/y y*
                                      ::pat/t t*)
      ;; TODO: Introduce some sort of vector/matrix abstraction
      ;; Although meh: just make it run on the GPU
      p                        (perturb params*)
      value                    (override params (pressure-pattern p)) ; 0.5
      wind-dir                 (wind-direction p value params*)
      pressure-t               (-> t (/ (:speed pressure) 14) (* 5000))
      pressure-variance        (:variance pressure) ; 100
      mean-pressure            (/ (+ max-pressure min-pressure) 2) ; 50
      min-base-pressure        (+ min-pressure (- mean-pressure (/ pressure-variance 2))) ; 0
      max-base-pressure        (- max-pressure (- mean-pressure (/ pressure-variance 2))) ; 100
      theater-min-pressure     (math/interpolate
                                min-pressure ; 0
                                (- max-pressure pressure-variance) ; 0
                                (math/fractal-field pressure-t 1234 32 seed 1.0)) ; 0
      theater-max-pressure     (+ theater-min-pressure pressure-variance) ; 100
      pressure                 (->> value
                                    (* pressure-variance)
                                    (+ theater-min-pressure)
                                    ;; Should not be necessary
                                    #_(math/clamp min-pressure max-pressure))
      mixture                  (mix value
                                    crossfade
                                    categories
                                    theater-min-pressure
                                    theater-max-pressure)
      wind-var                 (math/reject-tails wind-uniformity
                                                  (smoothed-noise-field (* x* feature-size)
                                                                        (* y* feature-size)
                                                                        t*
                                                                        (+ seed 17)
                                                                        32))
      temp-var                 (math/reject-tails temp-uniformity
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
                                 :speed   (wind-speed categories mixture wind-var)})
   :wind-var    wind-var
   :wind-vec    wind-dir
   :p           p})

(for [h (range 24)]
  (let [min-pressure      0
        max-pressure      100
        pressure-variance 10
        t                 (* h 60)
        pressure-speed    100
        seed              12
        pressure-t        (-> t (/ pressure-speed 4))]
    (math/interpolate
     min-pressure                          ; 0
     (- max-pressure pressure-variance)    ; 0
     (math/fractal-field pressure-t 1234 32 seed 1.0))))


(require 'vmt.fmap)
(let [buf (fs/file-buf "/Users/candera/falcon/4.34/Data/Campaign/WeatherMapsUpdates/100000.Fmap")]
  (def f (vmt.fmap/decode buf)))

(pprint (keys f))

(rebl)

(inspect f)

(->> f :vmt.fmap/cloud-coverage frequencies)

(->> "/Users/candera/falcon/4.34/Data/Campaign/WeatherMapsUpdates"
     io/file
     file-seq
     (filter #(str/ends-with? % ".fmap"))
     rand-nth
     fs/file-buf
     vmt.fmap/decode
     :vmt.fmap/cloud-coverage
     frequencies)

(->> (-> weather-params
         (assoc :x 29 :y 33)
         (assoc-in [:winds-aloft 50000 :bias] 0)
         model/weather)
     (into (sorted-map))
     inspect)

{:pressure 29.490000000000002,
 :value 0.4036059804193305,
 :type :poor,
 :wind {:heading 311.67634976495293, :speed 18.83884016274887},
 :mixture {:inclement 0.0, :poor 1.0, :fair 0.0, :sunny 0.0},
 :wind-var 0.6279613387582956,
 :wind-vec [-0.7469127087778206 0.664922104810916],
 :p [192.1999537822458 200.42987830797153],
 :temperature 17.387567859419175}

{:wind {0 {:heading 311 :speed 18.8}
        3000 }}

(inspect weather-params)

(@#'model/cloud-coverage (assoc weather-params :type :inclement) 0.6)
