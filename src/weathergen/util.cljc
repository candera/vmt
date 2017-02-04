(ns weathergen.util
  "The inevitable namespace.")

(defn str->long
  "Convert a string to a long. Returns nil when it can't be parsed."
  [s]
  #?(:clj (try (Long. s) (catch NumberFormatException _ nil))
     :cljs (let [n (-> s js/Number. .valueOf)]
             (when (int? n)
               (long n)))))

