(ns weathergen.falcon.files
  (:require [clojure.string :as str]
            [octet.core :as buf]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]))

;;; Cross-platform error support
(def all-errors #?(:clj Throwable
                   :cljs :default))

;;; Spec helpers

(defn read-trace
  [msg spec]
  (reify
    octet.spec/ISpec
    (read [_ buf pos]
      (log/debug (str "start: " msg "@" pos))
      (let [result (octet.spec/read spec buf pos)]
        (log/debug (str "end: " msg))
        (log/spy result)))))

(defn lstring
  "Length prefixed string"
  [length-spec]
  (let [len-size (buf/size length-spec)]
   (reify
     #?@(:clj
         [clojure.lang.IFn
          (invoke [s] s)]
         :cljs
         [cljs.core/IFn
          (-invoke [s] s)])

     octet.spec/ISpecDynamicSize
     (size* [_ data]
       (let [data (octet.spec.string/string->bytes data)]
         (+ len-size (count data))))

     octet.spec/ISpec
     (read [_ buff pos]
       (let [datasize (buf/read buff length-spec
                                {:offset pos})
             data (octet.buffer/read-bytes buff (+ pos len-size) datasize)
             data (octet.spec.string/bytes->string data datasize)]
         [(+ datasize len-size) data]))

     (write [_ buff pos value]
       (let [input (octet.spec.string/string->bytes value)
             length (count input)]
         (buf/write! buff length-spec pos length)
         (octet.buffer/write-bytes buff (+ pos len-size) length input)
         (+ length len-size))))))

(defn- remove-trailing-nulls
  "Returns `s` trimmed of any trailing null characters."
  [s]
  (subs s 0
        #?(:clj (->> s
                     (map int)
                     (take-while (complement zero?))
                     count)
           :cljs (->> s
                      (take-while #(-> % .charCodeAt zero? not))
                      count))))

#_(defn fixed-string
  "Octet spec for a string of a fixed size. Removes trailing null
  characters, if any."
  [size]
  (let [spc (buf/string size)]
    (reify
      octet.spec/ISpecSize
      (size [_]
        (buf/size spc))

      octet.spec/ISpec
      (read [_ buff pos]
        (let [[size data] (buf/read* buff spc {:offset pos})]
          [size (remove-trailing-nulls data)]))

      (write [_ buff pos value]
        (buf/write! buff spc value {:offset pos})))))

(def fixed-string buf/string)

(defn larray
  "Octet spec for a length prefixed array."
  [length-spec item-spec]
  (let [len-size (buf/size length-spec)]
    (reify
      #?@(:clj
          [clojure.lang.IFn
           (invoke [s] s)]
          :cljs
          [cljs.core/IFn
           (-invoke [s] s)])

      octet.spec/ISpecDynamicSize
      (size* [_ data]
        (+ len-size (* (buf/size item-spec) (count data))))

      octet.spec/ISpec
      (read [_ buff pos]
        (let [n (buf/read buff length-spec
                          {:offset pos})
              ;;_ (log/debug "larray" :n n :pos pos)
              [datasize data] (buf/read* buff
                                         (buf/repeat n item-spec)
                                         {:offset (+ pos len-size)})]
          [(+ datasize len-size) data]))

      (write [_ buff pos value]
        ;;(log/debugi "write" :pos pos :value value)
        (let [n (count value)]
          (+ (buf/write! buff n length-spec {:offset pos})
             (buf/write! buff value (buf/repeat n item-spec) {:offset (+ pos len-size)})))))))

(defn enum
  "Returns a spec that decodes from read values via the mapping in m."
  [item-spec m]
  (reify
    octet.spec/ISpecSize
    (size [_]
      (buf/size item-spec))

    octet.spec/ISpec
    (read [_ buf pos]
      (let [[datasize val] (buf/read* buf
                                      item-spec
                                      {:offset pos})]
        [datasize (m val val)]))

    ;; TODO: implement write
    ))

(defn bitflags
  "Returns a spec that decodes from a read value into a set of bits
  based on the mapping in m."
  [item-spec m]
  (reify
    octet.spec/ISpec
    (read [_ buf pos]
      (let [[datasize val] (buf/read* buf
                                      item-spec
                                      {:offset pos})]
        [datasize (->> (for [[flag mask] m]
                         (when-not (zero? (bit-and val mask))
                           flag))
                       (remove nil?)
                       set)]))))

(defn constant
  "Returns a spec that consumes and produces no data, but reads a
  constant value."
  [val]
  (reify
    octet.spec/ISpec
    (read [_ _ _]
      [0 val])

    (write [_ _ _ _])))

(defn read->
  "Read thread operator. Composes a read against multiple (potentially
  dynamically determined) specs passing the accumulated read value in
  turn through spec-fns, each a function from the accumulator to a
  spec."
  [buf offset & spec-fns]
  (loop [size 0
         data {}
         [spec-fn & more] spec-fns]
    (if-not spec-fn
      [size data]
      (let [[size* data*] (buf/read* buf
                                     (spec-fn data)
                                     {:offset (+ offset size)})]
        (recur (+ size size*)
               (merge data data*)
               more)))))

#_(defn disc-union
  "Returns a spec for a discriminated union. Reads a value based on
  `disc-spec`, then passes it to the `specf` function, which returns a
  spec."
  [disc-spec specf]
  (reify
    octet.spec/ISpec
    (read [_ buf pos]
      (read-> buf
              pos
              (constantly disc-spec)
              specf))))

(defn spec-if
  "Returns a spec that conditionally reads/write a map. It first reads
  `flag-spec`, then passes the value to `flag-pred`. Depending on the
  value returned, either reads `true-spec` or `false-spec`. Read
  values are returned under keys `flag-key` and `branch-key`."
  [flag-key flag-spec flag-pred branch-key true-spec false-spec]
  (reify
    octet.spec/ISpec
    (read [_ buf pos]
      (let [[flag-size flag-val]
            (buf/read* buf flag-spec {:offset pos})

            [branch-size branch-val]
            (buf/read* buf
                       (if (flag-pred flag-val)
                         true-spec
                         false-spec)
                       {:offset (+ pos flag-size)})]
        [(+ flag-size branch-size)
         (hash-map flag-key flag-val
                   branch-key branch-val)]))

    ;; TODO: Implement write
    ))
