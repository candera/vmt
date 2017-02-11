(ns weathergen.util
  "The inevitable namespace.")

(defn str->long
  "Convert a string to a long. Returns nil when it can't be parsed."
  [s]
  #?(:clj (try (Long. s) (catch NumberFormatException _ nil))
     :cljs (let [n (-> s js/Number. .valueOf)]
             (when (int? n)
               (long n)))))

(defn concatv
  "Concatenates `colls` into a vector. Order of elements is preserved."
  [& colls]
  (reduce into [] colls))

(defn filter=
  "Filters `coll` for an x where `(f x)` is equal to `val`"
  [f val coll]
  (filter #(= (f %) val) coll))

(defn only
  "Returns the first element of a sequence, or nil if it's empty, or
  throws an exception if there is more than one element."
  [coll]
  (cond
    (empty? coll) nil
    (-> coll rest empty?) (first coll)
    :else (throw (ex-info "Sequence had more than one item"
                          {:reason :not-singular
                           :coll coll}))))

