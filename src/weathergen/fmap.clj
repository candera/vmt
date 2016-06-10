(ns weathergen.fmap
  (:require [weathergen.model :as model])
  (:import [java.io InputStream]
           [java.nio ByteBuffer ByteOrder]))

(defn get-bytes
  [^InputStream is size]
  (let [bb  (ByteBuffer/allocate size)
        buf (byte-array size)]
    (loop [remaining size]
      (if (zero? remaining)
        (do
          (.put bb ^bytes buf 0 size)
          (.position bb 0))
        (let [read (.read is buf (- size remaining) remaining)]
          (if (neg? read)
            nil
            (recur (- remaining read))))))))

(defmacro defreader
  [name method]
  `(defn ~name
     [is#]
     (some-> (get-bytes is# 4)
             (.order ByteOrder/LITTLE_ENDIAN)
             ~(symbol (str "." method)))))

(defreader read-int getInt)

(defreader read-float getFloat)

(def weather-type
  {1 :sunny
   2 :fair
   3 :poor
   4 :inclement})

(defn read-fmap
  [^InputStream is]
  (let [size-x      (read-int is)
        size-y      (read-int is)
        wx-types    (doall (for [y (range size-y)
                                 x (range size-x)]
                             (read-int is)))
        pressures   (doall (for [y (range size-y)
                                 x (range size-x)]
                             (read-float is)))
        temps       (doall (for [y (range size-y)
                                 x (range size-x)]
                             (read-float is)))
        wind-speeds (doall (for [y (range size-y)
                                 x (range size-x)]
                             (read-float is)))
        wind-dirs   (doall (for [y (range size-y)
                                 x (range size-x)]
                             (read-float is)))]
    {:size-x size-x
     :size-y size-y
     :weather (into (sorted-map)
                    (map (fn [coords wx-type pressure temp wind-speed wind-dir]
                           [coords {:wx-type wx-type
                                    :type (weather-type wx-typ)
                                    :pressure (model/mmhg->inhg pressure)
                                    :temperature temp
                                    :wind {:speed wind-speed
                                           :heading wind-dir}}])
                         (for [y (range size-y)
                               x (range size-x)]
                           [x y])
                         wx-types
                         pressures
                         temps
                         wind-speeds
                         wind-dirs))}))
