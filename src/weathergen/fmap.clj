(ns weathergen.fmap
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
        wind-speeds (doall (for [y (range size-y)
                                 x (range size-x)]
                             (read-float is)))
        wind-dirs   (doall (for [y (range size-y)
                                 x (range size-x)]
                             (read-float is)))]
    (into (sorted-map)
          (map (fn [coords wx-type pressure wind-speed wind-dir]
                 [coords {:wx-type wx-type
                          :pressure pressure
                          :wind {:speed wind-speed
                                 :dir wind-dir}}])
               (for [y (range size-y)
                     x (range size-x)]
                 [x y])
               wx-types
               pressures
               wind-speeds
               wind-dirs))))
