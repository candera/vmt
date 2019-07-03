(ns vmt.fmap
  (:require [octet.core :as buf]
            [weathergen.math :as math]
            [weathergen.model :as model]))

(def weather-type-code->type
  {1 :sunny
   2 :fair
   3 :poor
   4 :inclement})

(def weather-type->code
  (zipmap (vals weather-type-code->type)
          (keys weather-type-code->type)))

(def coverage-code->type
  {:none 0
   :few 1
   :scattered 5
   :broken 9
   :overcast 13})

;; (defn weather-type
;;   [w]
;;   (-> w :type {:sunny 1
;;                :fair 2
;;                :poor 3
;;                :inclement 4}))

;; (defn pressure
;;   [w]
;;   ;; TODO: Convert to mmHg
;;   (-> w :pressure model/inhg->mmhg (math/nearest 1)))

;; (defn wind-speed
;;   [w]
;;   (-> w :wind :speed (math/nearest 1)))

;; (defn wind-direction
;;   [w]
;;   (-> w :wind :heading (math/nearest 1)))

;; (defn temperature
;;   [w]
;;   (-> w :temperature (math/nearest 0.1)))

;; (defn get-blob
;;   [data x-cells y-cells]
;;   (let [num-cells (* x-cells y-cells)
;;         size      (+ 8 (* 4 5 num-cells))
;;         bw        (byte-writer size)]
;;     (write-int32 bw x-cells)
;;     (write-int32 bw y-cells)
;;     (doseq [[f op] [[weather-type write-int32]
;;                     [pressure write-float32]
;;                     [temperature write-float32]
;;                     [wind-speed write-float32]
;;                     [wind-direction write-float32]]
;;             y (range y-cells)
;;             x (range x-cells)
;;             :let [w (get data [x y])]]
;;       (->> w f (op bw)))
;;     (blob bw)))

(def header-spec
  (buf/spec
   ::version               buf/int32
   ::rows                  buf/int32
   ::cols                  buf/int32
   ::map-move-heading      buf/int32
   ::map-move-speed        buf/float
   ::stratus-z-fair        buf/int32
   ::stratus-z-inclement   buf/int32
   ::contrails (buf/spec :sunny     buf/int32
                         :fair      buf/int32
                         :poor      buf/int32
                         :inclement buf/int32)))

(def wind-data
  (buf/spec :data-0 buf/float
            :data-3000 buf/float
            :data-6000 buf/float
            :data-9000 buf/float
            :data-12000 buf/float
            :data-18000 buf/float
            :data-24000 buf/float
            :data-30000 buf/float
            :data-40000 buf/float
            :data-50000 buf/float))

(defn data-spec
  [{rows ::rows
    cols ::cols
    :as  header}]
  (let [cells (* rows cols)]
    (buf/spec
     ::weather-type       (buf/repeat cells buf/int32)
     ::pressure-mmhg      (buf/repeat cells buf/float)
     ::temperature        (buf/repeat cells buf/float)
     ::wind-speed         (buf/repeat cells wind-data)
     ::wind-heading       (buf/repeat cells wind-data)
     ;; ::wind-speed-0       (buf/repeat cells buf/float)
     ;; ::wind-speed-3000    (buf/repeat cells buf/float)
     ;; ::wind-speed-6000    (buf/repeat cells buf/float)
     ;; ::wind-speed-9000    (buf/repeat cells buf/float)
     ;; ::wind-speed-12000   (buf/repeat cells buf/float)
     ;; ::wind-speed-18000   (buf/repeat cells buf/float)
     ;; ::wind-speed-24000   (buf/repeat cells buf/float)
     ;; ::wind-speed-30000   (buf/repeat cells buf/float)
     ;; ::wind-speed-40000   (buf/repeat cells buf/float)
     ;; ::wind-speed-50000   (buf/repeat cells buf/float)
     ;; ::wind-heading-0     (buf/repeat cells buf/float)
     ;; ::wind-heading-3000  (buf/repeat cells buf/float)
     ;; ::wind-heading-6000  (buf/repeat cells buf/float)
     ;; ::wind-heading-9000  (buf/repeat cells buf/float)
     ;; ::wind-heading-12000 (buf/repeat cells buf/float)
     ;; ::wind-heading-18000 (buf/repeat cells buf/float)
     ;; ::wind-heading-24000 (buf/repeat cells buf/float)
     ;; ::wind-heading-30000 (buf/repeat cells buf/float)
     ;; ::wind-heading-40000 (buf/repeat cells buf/float)
     ;; ::wind-heading-50000 (buf/repeat cells buf/float)
     ::cloud-base         (buf/repeat cells buf/float)
     ::cloud-coverage     (buf/repeat cells buf/int32)
     ::cloud-size         (buf/repeat cells buf/float)
     ::towering-cumulus?  (buf/repeat cells buf/int32)
     ::visibility-km      (buf/repeat cells buf/float))))

;; TODO: broken
(defn decode
  "Given FMAP data, decodes it into the internal representation."
  [buf]
  (binding [octet.buffer/*byte-order* :little-endian]
    (let [header (buf/read buf header-spec)
          cells  (* (::rows header) (::cols header))
          data   (buf/read buf
                           (data-spec header)
                           {:offset (buf/size header-spec)})]
      (as-> header ?
          (merge ? data)
          (update ? ::towering-cumulus? #(mapv (comp not zero?) %))
          (update ? ::weather-type #(mapv weather-type-code->type %))
          (assoc ? ::wind-speed (map (fn [s0 s3 s6 s9 s12 s18 s24 s30 s40 s50]
                                       {0     s0
                                        3000  s3
                                        6000  s6
                                        9000  s9
                                        12000 s12
                                        18000 s18
                                        24000 s24
                                        30000 s30
                                        40000 s40
                                        50000 s50})
                                     (::wind-speed-0 ?)
                                     (::wind-speed-3000 ?)
                                     (::wind-speed-6000 ?)
                                     (::wind-speed-9000 ?)
                                     (::wind-speed-12000 ?)
                                     (::wind-speed-18000 ?)
                                     (::wind-speed-24000 ?)
                                     (::wind-speed-30000 ?)
                                     (::wind-speed-40000 ?)
                                     (::wind-speed-50000 ?)))
          (dissoc ? ::wind-speed-0
                    ::wind-speed-3000
                    ::wind-speed-6000
                    ::wind-speed-9000
                    ::wind-speed-12000
                    ::wind-speed-18000
                    ::wind-speed-24000
                    ::wind-speed-30000
                    ::wind-speed-40000
                    ::wind-speed-50000)
          (assoc ? ::wind-heading (map (fn [s0 s3 s6 s9 s12 s18 s24 s30 s40 s50]
                                         {0     s0
                                          3000  s3
                                          6000  s6
                                          9000  s9
                                          12000 s12
                                          18000 s18
                                          24000 s24
                                          30000 s30
                                          40000 s40
                                          50000 s50})
                                     (::wind-heading-0 ?)
                                     (::wind-heading-3000 ?)
                                     (::wind-heading-6000 ?)
                                     (::wind-heading-9000 ?)
                                     (::wind-heading-12000 ?)
                                     (::wind-heading-18000 ?)
                                     (::wind-heading-24000 ?)
                                     (::wind-heading-30000 ?)
                                     (::wind-heading-40000 ?)
                                     (::wind-heading-50000 ?)))
          (dissoc ? ::wind-heading-0
                    ::wind-heading-3000
                    ::wind-heading-6000
                    ::wind-heading-9000
                    ::wind-heading-12000
                    ::wind-heading-18000
                    ::wind-heading-24000
                    ::wind-heading-30000
                    ::wind-heading-40000
                    ::wind-heading-50000)))))

(defn- convert
  "Convert from the data format VMT uses to the one in the FMAPs."
  [data rows cols]
  {::weather-type      (for [y (range rows)
                             x (range cols)]
                         (-> data (get [x y]) :type weather-type->code))
   ::pressure-mmhg     (for [y (range rows)
                             x (range cols)]
                         (or (some-> data (get [x y]) :pressure model/inhg->mmhg)
                             (when (< 0.1 (rand))
                               (println "pressure is nil" [x y (get data [x y])]))))
   ::temperature       (for [y (range rows)
                             x (range cols)]
                         (get-in data [[x y] :temperature]))
   ::wind-speed        (for [y (range rows)
                             x (range rows)]
                         {:data-0     (get-in data [[x y] :wind 0 :speed])
                          :data-3000  (get-in data [[x y] :wind 3000 :speed])
                          :data-6000  (get-in data [[x y] :wind 6000 :speed])
                          :data-9000  (get-in data [[x y] :wind 9000 :speed])
                          :data-12000 (get-in data [[x y] :wind 12000 :speed])
                          :data-18000 (get-in data [[x y] :wind 18000 :speed])
                          :data-24000 (get-in data [[x y] :wind 24000 :speed])
                          :data-30000 (get-in data [[x y] :wind 30000 :speed])
                          :data-40000 (get-in data [[x y] :wind 40000 :speed])
                          :data-50000 (get-in data [[x y] :wind 50000 :speed])})
   ::wind-heading      (for [y (range rows)
                             x (range rows)]
                         {:data-0     (get-in data [[x y] :wind 0 :heading])
                          :data-3000  (get-in data [[x y] :wind 3000 :heading])
                          :data-6000  (get-in data [[x y] :wind 6000 :heading])
                          :data-9000  (get-in data [[x y] :wind 9000 :heading])
                          :data-12000 (get-in data [[x y] :wind 12000 :heading])
                          :data-18000 (get-in data [[x y] :wind 18000 :heading])
                          :data-24000 (get-in data [[x y] :wind 24000 :heading])
                          :data-30000 (get-in data [[x y] :wind 30000 :heading])
                          :data-40000 (get-in data [[x y] :wind 40000 :heading])
                          :data-50000 (get-in data [[x y] :wind 50000 :heading])})
   ;; ::wind-speed-0       (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 0 :speed]))
   ;; ::wind-speed-3000    (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 3000 :speed]))
   ;; ::wind-speed-6000    (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 6000 :speed]))
   ;; ::wind-speed-9000    (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 9000 :speed]))
   ;; ::wind-speed-12000   (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 12000 :speed]))
   ;; ::wind-speed-18000   (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 18000 :speed]))
   ;; ::wind-speed-24000   (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 24000 :speed]))
   ;; ::wind-speed-30000   (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 30000 :speed]))
   ;; ::wind-speed-40000   (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 40000 :speed]))
   ;; ::wind-speed-50000   (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 50000 :speed]))
   ;; ::wind-heading-0     (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 0 :heading]))
   ;; ::wind-heading-3000  (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 3000 :heading]))
   ;; ::wind-heading-6000  (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 6000 :heading]))
   ;; ::wind-heading-9000  (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 9000 :heading]))
   ;; ::wind-heading-12000 (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 12000 :heading]))
   ;; ::wind-heading-18000 (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 18000 :heading]))
   ;; ::wind-heading-24000 (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 24000 :heading]))
   ;; ::wind-heading-30000 (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 30000 :heading]))
   ;; ::wind-heading-40000 (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 40000 :heading]))
   ;; ::wind-heading-50000 (for [y (range rows)
   ;;                            x (range cols)]
   ;;                        (get-in data [[x y] :wind 50000 :heading]))
   ::cloud-base        (for [y (range rows)
                             x (range cols)]
                         (get-in data [[x y] :low-clouds :base]))
   ::cloud-coverage    (for [y (range rows)
                             x (range cols)]
                         (coverage-code->type (get-in data [[x y] :low-clouds :coverage])))
   ::cloud-size        (for [y (range rows)
                             x (range cols)]
                         (get-in data [[x y] :low-clouds :size]))
   ::towering-cumulus? (for [y    (range rows)
                             x    (range cols)
                             :let [towering? (get-in data [[x y] :low-clouds :towering?])]]
                         (if towering? 1 0))
   ::visibility-km     (for [y (range rows)
                             x (range cols)]
                         (get-in data [[x y] :visibility]))})

(defn encode
  "Given weather data in the VMT format, return a buffer or blob encoding it."
  [data weather-params movement-params cloud-params]
  (let [[rows cols] (:cell-count weather-params)
        header      {::version             5
                     ::rows                rows
                     ::cols                cols
                     ::map-move-heading    (get-in movement-params [:direction :heading])
                     ::map-move-speed      (double (get-in movement-params [:direction :speed]))
                     ::stratus-z-fair      (:stratus-z-fair cloud-params)
                     ::stratus-z-inclement (:stratus-z-inclement cloud-params)
                     ::contrails           (:contrails cloud-params)}
        data-spec   (data-spec header)
        buf         (buf/allocate (+ (buf/size header-spec)
                                     (buf/size data-spec)))]
    (binding [octet.buffer/*byte-order* :little-endian]
      (buf/write! buf header header-spec)
      (buf/write! buf (convert data rows cols) data-spec {:offset (buf/size header-spec)}))
    buf))
