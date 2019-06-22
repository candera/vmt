(ns weathergen.fmap2
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
   ::version               buf/int16
   ::rows                  buf/int16
   ::cols                  buf/int16
   ::map-move-heading      buf/int16
   ::map-move-speed        buf/float
   ::stratus-z-fair        buf/int16
   ::stratus-z-inclement   buf/int16
   ::contrails (buf/spec :sunny     buf/int16
                         :fair      buf/int16
                         :poor      buf/int16
                         :inclement buf/int16)))

(defn data-spec
  [{rows ::rows
    cols ::cols
    :as  header}]
  (let [cells (* rows cols)]
    (buf/spec
     ::weather-type       (buf/repeat cells buf/int32)
     ::pressure-mmhg      (buf/repeat cells buf/float)
     ::temperature        (buf/repeat cells buf/float)
     ::wind-speed-0       (buf/repeat cells buf/float)
     ::wind-speed-3000    (buf/repeat cells buf/float)
     ::wind-speed-6000    (buf/repeat cells buf/float)
     ::wind-speed-9000    (buf/repeat cells buf/float)
     ::wind-speed-12000   (buf/repeat cells buf/float)
     ::wind-speed-18000   (buf/repeat cells buf/float)
     ::wind-speed-18000   (buf/repeat cells buf/float)
     ::wind-speed-24000   (buf/repeat cells buf/float)
     ::wind-speed-30000   (buf/repeat cells buf/float)
     ::wind-speed-40000   (buf/repeat cells buf/float)
     ::wind-speed-50000   (buf/repeat cells buf/float)
     ::wind-heading-0     (buf/repeat cells buf/float)
     ::wind-heading-3000  (buf/repeat cells buf/float)
     ::wind-heading-6000  (buf/repeat cells buf/float)
     ::wind-heading-9000  (buf/repeat cells buf/float)
     ::wind-heading-12000 (buf/repeat cells buf/float)
     ::wind-heading-18000 (buf/repeat cells buf/float)
     ::wind-heading-18000 (buf/repeat cells buf/float)
     ::wind-heading-24000 (buf/repeat cells buf/float)
     ::wind-heading-30000 (buf/repeat cells buf/float)
     ::wind-heading-40000 (buf/repeat cells buf/float)
     ::wind-heading-50000 (buf/repeat cells buf/float)
     ::cloud-base         (buf/repeat cells buf/float)
     ::cloud-coverage     (buf/repeat cells buf/int32)
     ::cloud-size         (buf/repeat cells buf/float)
     ::towering-cumulus?  (buf/repeat cells buf/int32)
     ::visibility-km      (buf/repeat cells buf/float))))

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
          (update ? ::towering-cumulus? #(mapv zero? %))
          (update ? ::weather-type #(mapv weather-type-code->type %))
          (assoc ? ::wind-speed {0     (::wind-speed-0 ?)
                                 3000  (::wind-speed-3000 ?)
                                 6000  (::wind-speed-6000 ?)
                                 9000  (::wind-speed-9000 ?)
                                 12000 (::wind-speed-12000 ?)
                                 18000 (::wind-speed-18000 ?)
                                 24000 (::wind-speed-24000 ?)
                                 30000 (::wind-speed-30000 ?)
                                 40000 (::wind-speed-40000 ?)
                                 50000 (::wind-speed-50000 ?)})
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
          (assoc ? ::wind-heading {0     (::wind-heading-0 ?)
                                   3000  (::wind-heading-3000 ?)
                                   6000  (::wind-heading-6000 ?)
                                   9000  (::wind-heading-9000 ?)
                                   12000 (::wind-heading-12000 ?)
                                   18000 (::wind-heading-18000 ?)
                                   24000 (::wind-heading-24000 ?)
                                   30000 (::wind-heading-30000 ?)
                                   40000 (::wind-heading-40000 ?)
                                   50000 (::wind-heading-50000 ?)})
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
