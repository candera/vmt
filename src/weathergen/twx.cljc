(ns weathergen.twx
  "A library for reading and writing TWX files."
  (:require [octet.core :as buf]))

(def buffer-size 764)

(def color (buf/spec :r buf/float
                     :g buf/float
                     :b buf/float
                     :h buf/float
                     :s buf/float
                     :v buf/float
                     :X buf/float
                     :Y buf/float
                     :Z buf/float
                     :x buf/float
                     :y buf/float
                     :L buf/float))

(defn min-mid-max
  [type]
  (buf/spec :min type
            :mid type
            :max type))

(defn for-weather-types
  [type]
  (buf/spec :sunny type
            :fair type
            :poor type
            :inclement type))

(def condition-preset
  (buf/spec
   ;; These don't appear to be used in the map model
   :temp (min-mid-max buf/int32)
   :pressure (min-mid-max buf/int32)
   :wind-speed (buf/spec :min buf/int32
                         :mid buf/int32
                         :max buf/int32
                         :thresh buf/int32)

   ;; These look like Cloud->Stratus
   :stratus-base buf/int32
   :cumulus-base buf/int32
   :stratus-thick buf/int32
   :contrail-base buf/int32
   :last-tod buf/int32
   :fog-start-below-layer buf/float
   :fog-start-above-layer buf/float
   :fog-end-below-layer buf/float
   :fog-end-above-layer buf/float
   :horizon-blend buf/float
   :sky-fog-level buf/float
   :sky-fog-start-elev buf/float
   :sky-fog-end-elev buf/float
   :earth-color color
   :stratus-factor (for-weather-types buf/float)
   :haze-min buf/float
   :cumulus-z buf/float
   :stratus-z buf/float
   :contrail-low buf/float
   :contrail-high buf/float
   :temperature buf/float))

(def twx (buf/spec :version buf/uint32
                   :last-check buf/int32
                   :basic-old-condition buf/int32
                   :basic-condition buf/int32
                   :basic-condition-counter buf/int32
                   :current-condition condition-preset
                   :condition-change-interval buf/int32
                   :model buf/int32
                   :map-updates buf/int32
                   :interval (buf/spec :min buf/int32
                                       :max buf/int32)
                   :wx-prob (for-weather-types buf/float)

                   :wth-user-shift
                   (buf/repeat
                    5
                    (buf/spec :shift-time buf/uint32
                              :shift-old-condition buf/int32))

                   :wind-heading-model buf/int32
                   :wind-heading buf/int32
                   :map-wind-heading buf/int32
                   :map-wind-speed buf/float

                   :wth-wind
                   (for-weather-types
                    (buf/spec :night-speed buf/int32
                              :dawn-speed buf/int32
                              :day-speed buf/int32
                              :burst-interval buf/int32
                              :burst-duration buf/int32
                              :burst-speed buf/int32
                              :burst-direction buf/int32))

                   :wth-turbuluence
                   (buf/repeat
                    6
                    (buf/spec :rot-x-wind buf/int32
                              :rot-y-wind buf/int32
                              :rot-z-wind buf/int32
                              :rot-x-rot buf/int32
                              :rot-y-rot buf/int32
                              :rot-z-rot buf/int32))

                   :mech-layer buf/int32
                   :heat-layer buf/int32
                   :occurrence buf/int32
                   :duration buf/int32

                   :fog-start (for-weather-types buf/float)
                   :fog-end (for-weather-types buf/float)
                   :stratus-layer (for-weather-types buf/int32)
                   :stratus-thick  (for-weather-types buf/int32)
                   :cumulus-layer  (for-weather-types buf/int32)
                   :contrail-layer (for-weather-types buf/int32)
                   :cumulus-density buf/int32
                   :cumulus-size buf/float

                   :wth-temp (for-weather-types
                              (buf/spec :night buf/int32
                                        :dawn buf/int32
                                        :day buf/int32))

                   :wth-press (for-weather-types
                               (buf/spec :night buf/int32
                                         :dawn buf/int32
                                         :day buf/int32))))

(defn parse
  "Given a ByteBuffer (JVM) or a ArrayBuffer (CLJS) over the contents
  of a TWX file, returns a data structure with the parsed contents."
  [data]
  (buf/with-byte-order :little-endian
    (buf/read data twx)))

;; This is the default weather data. We just overwrite bits of it to
;; come up with our file.
(def twx-template
  {:basic-condition 1,
   :basic-condition-counter 0,
   :basic-old-condition 2,
   :condition-change-interval 20293,
   :contrail-layer {:sunny 34000,
                    :fair 28000,
                    :poor 25000,
                    :inclement 20000},
   :cumulus-density 1,
   :cumulus-layer {:sunny 0,
                   :fair 8000,
                   :poor 7500,
                   :inclement 2000},
   :cumulus-size 0.98130846,
   :current-condition
   {:stratus-z -35000.0,
    :pressure {:min 0,
               :mid 0,
               :max 0},
    :temp {:min 0,
           :mid 0,
           :max 0},
    :wind-speed {:min 0,
                 :mid 0,
                 :max 0,
                 :thresh 0},
    :fog-start-above-layer 6000.0,
    :stratus-factor {:sunny 1.0,
                     :fair 0.0,
                     :poor 0.0,
                     :inclement 0.0},
    :horizon-blend 0.5,
    :cumulus-base 0,
    :fog-end-above-layer 120000.0,
    :last-tod 0,
    :sky-fog-level 0.99,
    :cumulus-z 0.0,
    :sky-fog-start-elev 0.0,
    :stratus-base 35000,
    :contrail-high 40000.0,
    :contrail-base 34000,
    :sky-fog-end-elev 0.0,
    :contrail-low 34000.0,
    :fog-end-below-layer 159232.16,
    :stratus-thick 0,
    :temperature 0.0,
    :earth-color {:y 48995.688,
                  :L 0.0,
                  :r 0.54509807,
                  :v 0.0,
                  :Z 5.003981E-39,
                  :s 2.832474E-16,
                  :g 0.63529414,
                  :h 0.0,
                  :Y 0.0,
                  :b 0.76862746,
                  :X 1.4E-45,
                  :x 0.0},
    :haze-min 0.0,
    :fog-start-below-layer 3991.4685},
   :duration 20,
   :fog-end {:sunny 200000.0,
             :fair 159232.16,
             :poor 69889.87,
             :inclement 24785.021},
   :fog-start {:sunny 8000.0,
               :fair 3991.4685,
               :poor 3000.0,
               :inclement 3000.0},
   :heat-layer 1500,
   :interval {:min 20000,
              :max 25000},
   :last-check 32400000,
   :map-updates 1,
   :map-wind-heading 123,
   :map-wind-speed 45.0,
   :mech-layer 500,
   :model 3,
   :occurrence 60,
   :stratus-layer {:sunny 35000,
                   :fair 30000,
                   :poor 13300,
                   :inclement 13300},
   :stratus-thick {:sunny 0,
                   :fair 0,
                   :poor 2000,
                   :inclement 7000},
   :version 2,
   :wind-heading 0,
   :wind-heading-model 1,
   :wth-press {:sunny {:night 1034, :dawn 1036, :day 1040},
               :fair {:night 1007, :dawn 1009, :day 1013},
               :poor {:night 989, :dawn 991, :day 995},
               :inclement {:night 978, :dawn 980, :day 994}},
   :wth-temp {:sunny {:night 12, :dawn 18, :day 30},
              :fair {:night 12, :dawn 18, :day 28},
              :poor
              {:night 10, :dawn 15, :day 25},
              :inclement {:night 9, :dawn 14, :day 22}},
   :wth-turbuluence [{:rot-x-wind 5,
                      :rot-y-wind 7,
                      :rot-z-wind 3,
                      :rot-x-rot 45,
                      :rot-y-rot 134,
                      :rot-z-rot 240}
                     {:rot-x-wind 3,
                      :rot-y-wind 4,
                      :rot-z-wind 2,
                      :rot-x-rot 45,
                      :rot-y-rot 134,
                      :rot-z-rot 240}
                     {:rot-x-wind 4,
                      :rot-y-wind 5,
                      :rot-z-wind 2,
                      :rot-x-rot 45,
                      :rot-y-rot 134,
                      :rot-z-rot 240}
                     {:rot-x-wind 1,
                      :rot-y-wind 3,
                      :rot-z-wind 3,
                      :rot-x-rot 45,
                      :rot-y-rot 193,
                      :rot-z-rot 240}
                     {:rot-x-wind 3,
                      :rot-y-wind 4,
                      :rot-z-wind 4,
                      :rot-x-rot 45,
                      :rot-y-rot 193,
                      :rot-z-rot 240}
                     {:rot-x-wind 1,
                      :rot-y-wind 1,
                      :rot-z-wind 0,
                      :rot-x-rot 45,
                      :rot-y-rot 193,
                      :rot-z-rot 240}],
   :wth-user-shift [{:shift-time 118800000, :shift-old-condition 1}
                    {:shift-time 205200000, :shift-old-condition 1}
                    {:shift-time 291600000, :shift-old-condition 1}
                    {:shift-time 378000000, :shift-old-condition 1}
                    {:shift-time 464400000, :shift-old-condition 1}],
   :wth-wind {:sunny {:night-speed 0,
                      :dawn-speed 2,
                      :day-speed 5,
                      :burst-interval 30,
                      :burst-duration 5,
                      :burst-speed 2,
                      :burst-direction 10},
              :fair {:night-speed 5,
                     :dawn-speed 10,
                     :day-speed 15,
                     :burst-interval 20,
                     :burst-duration 10,
                     :burst-speed 9,
                     :burst-direction 20},
              :poor {:night-speed 10,
                     :dawn-speed 15,
                     :day-speed 20,
                     :burst-interval 15,
                     :burst-duration 10,
                     :burst-speed 13,
                     :burst-direction 30},
              :inclement {:night-speed 15,
                          :dawn-speed 20,
                          :day-speed 25,
                          :burst-interval 5,
                          :burst-duration 5,
                          :burst-speed 16,
                          :burst-direction 30}},
   :wx-prob {:sunny 0.25,
             :fair 0.25,
             :poor 0.25,
             :inclement 0.25}})

(defn fog-start
  "Converts from visibility to the fog-start value in the TWX."
  [vis]
  (-> vis
      (* 0.1928564)
      Math/exp
      (* 15.5286)
      (+ 2944.614)))

(defn fog-end
  "Converts from visibility the the fog-end value in the TWX."
  [vis]
  (-> vis
      (* (/ 19690 3.0))
      (+ 3100)
      long))

(defn per-weather-type
  "Applies f to each value of m, a map from weather types to values."
  [f m]
  (let [{:keys [sunny fair poor inclement]} m]
    {:sunny (f sunny)
     :fair (f fair)
     :poor (f poor)
     :inclement (f inclement)}))

(defn params->twx
  "Converts cloud configuration from the UI-based parameters format to
  the format in the TWX file. `direction` is the direction the weather
  pattern is moving."
  [cloud-params direction]
  (-> twx-template
      ;; Weather tab
      (assoc :model 3
             :map-updates 1
             :map-wind-heading (-> direction :heading (+ 180) (mod 360))
             :map-wind-speed (:speed direction))
      ;; Cloud tab
      (assoc :cumulus-density (-> cloud-params
                                  :cumulus-density
                                  (- 5)
                                  (/ 45.0)
                                  (* 12)
                                  (+ 1)
                                  long)
             :cumulus-size (:cumulus-size cloud-params)
             :fog-start (->> cloud-params :visibility (per-weather-type fog-start))
             :fog-end (->> cloud-params :visibility (per-weather-type fog-end))
             :stratus-thick {:sunny 0
                             :fair 0
                             :poor (->> cloud-params :stratus-thickness :poor)
                             :inclement (->> cloud-params :stratus-thickness :inclement)}
             :stratus-layer (:stratus-base cloud-params)
             :cumulus-layer (:cumulus-base cloud-params)
             :contrail-layer (:contrails cloud-params))))

(defn populate-buffer
  "Given a ByteBuffer (JVM) or an ArrayBuffer (CLJS) and global
  weather parameters, populate the buffer with the contents of a TWX
  file."
  [buf cloud-params direction]
  (buf/with-byte-order :little-endian
    (buf/write! buf (params->twx cloud-params direction) twx)))

(comment
  ;; JVM
  (-> "file:///Users/candera/GDrive/weather-4.twx"
      java.net.URI.
      java.nio.file.Paths/get
      java.nio.file.Files/readAllBytes
      java.nio.ByteBuffer/wrap
      parse)

  )

#_(let [color-spec

      spec ]
  (buf/with-byte-order :little-endian
    (-> "file:///Users/candera/GDrive/weather-4.twx"
        java.net.URI.
        java.nio.file.Paths/get
        java.nio.file.Files/readAllBytes
        java.nio.ByteBuffer/wrap
        (buf/read spec)
        clojure.pprint/pprint)))

;; The things we need to set

(comment
  {                     ;; Weather Tab
   :model 3             ; Weather Model
   :map-updates 1       ; Maps auto update
   :map-wind-heading 123                ; Map shifting from
   :map-wind-speed 45.0                 ; Map speed

   ;; Atmosphere Tab
   ;; Nothing: leave defaults

   ;; Turbulence Tab
   ;; Nothing: leave defaults

   ;; Wind Tab
   ;; Nothing: leave defaults

   ;; Cloud Tab
   :cumulus-density (range 1 13)   ; Cumulus coverage 1 = 5%, 13 = 50%
   :cumulus-size (range 0.0 5.0) ; Cumulus Thick = 0, Cumulus Scattered = 5
   :fog-start ?
   })
