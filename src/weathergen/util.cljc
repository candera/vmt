(ns weathergen.util
  "The inevitable namespace.")

(defn str->long
  "Convert a string to a long."
  [s]
  #?(:clj (Long. s)
     :cljs (let [n (-> s js/Number. .valueOf)]
             (when (int? n)
               (long n)))))

