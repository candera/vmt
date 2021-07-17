(ns weathergen.util
  "The inevitable namespace."
  (:require [clojure.set :as set]
            [clojure.string :as str]))

(defn str->long
  "Convert a string to a long. Returns nil when it can't be parsed."
  [s]
  #?(:clj (try (Long. s) (catch NumberFormatException _ nil))
     :cljs (let [n (-> s js/Number. .valueOf)]
             (when (int? n)
               (long n)))))

(defn str->float
  "Convert a string to a floating point number. Returns nil when it can't be parsed."
  [s]
  #?(:clj (try (when s (Double. s)) (catch NumberFormatException _ nil))
     :cljs (let [n (-> s js/Number. .valueOf)]
             (when-not (js/isNaN n)
               n))))

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

(defn take-until
  "Like take-while, but also includes the first item where `pred`
  returns true."
  [pred coll]
  (cond
    (empty? coll) coll
    (pred (first coll)) (take 1 coll)
    :else (let [[head next] (partition-by pred coll)]
            (concat head (take 1 next)))))

(defn toggle-set-membership
  "If `x` is a member of `s`, remove it. Otherwise, add it."
  [s x]
  (let [op (if (contains? s x) disj conj)]
    (op s x)))

(defn has-flag?
  "Returns true if all of the bits set in `mask` are also set in `x`."
  [x mask]
  (-> x (bit-and mask) (= mask)))

(defn format-list
  "Given a collection of strings, concatenate them together inserting
  commas and the word \"and\" as appropirate."
  ([items] (format-list {:conjunction "and" :separator ","} items))
  ([{:keys [separator conjunction] :as opts} items]
   (let [n (count items)
         separator (or separator ",")]
     (if (< (count items) 2)
       (first items)
       (str (->> items
                 butlast
                 (str/join (str separator " ")))
            (when (< 2 (count items))
              separator)
            " "
            conjunction
            " "
            (last items))))))

(defn enquote
  [v]
  ;; Lame, but there doesn't seem to be a way to get double-quotes
  ;; into a CSV file - escaping doesn't work. For our purposes, we can
  ;; just use a similar symbol.
 (str "\"" (str/replace (str v) "\"" "''") "\""))

(defn vectorize
  "Turn x into a vector if it isn't already."
  [x]
  (if (vector? x) x [x]))

(defn flatten-map
  "Given a nested map, flatten it so all keys are top-level."
  [m]
  ;; This is pretty cheezy, but works well enough for what I'm using
  ;; it for.
  (reduce-kv (fn [m k v]
               (if-not (map? v)
                 (assoc m (vectorize k) v)
                 (merge m
                        (flatten-map
                         (->> v
                              (map (fn [[ki vi]]
                                     [(conj (vectorize k) ki)
                                      vi]))
                              (into {}))))))
             {}
             m))

(defn csv-ize
  "Given a collection of maps, return out a CSV string. Options can
  include :initial-columns, an ordering of columns to appear first. Remaining
  columns will be lexically sorted."
  ([maps] (csv-ize maps {}))
  ([maps {:keys [initial-columns key-remap]
          :or   {initial-columns []
                 key-remap       identity}
          :as   options}]
   (let [flattened-initial (mapv vectorize initial-columns)
         flattened         (mapv flatten-map maps)
         cols              (as-> flattened ?
                               (mapcat keys ?)
                             (set ?)
                             (set/difference ? (set flattened-initial))
                             (sort ?)
                             (vec ?)
                             (into flattened-initial ?))
         get-vals          (fn [item]
                             (for [col cols]
                               (get item col)))
         header            (->> cols
                                (map key-remap)
                                (map str)
                                (interpose ",")
                                (apply str "index,"))
         row               (fn [index item]
                             #_(log/debug "row" :index index :item (class item))
                             (->> item
                                  get-vals
                                  (map enquote)
                                  (interpose ",")
                                  (apply str index ",")))]
     (->> flattened
          (map-indexed row)
          (into [header])
          (interpose "\n")
          (apply str)))))


(defn deep-merge-with
  "Like merge-with, but merges maps recursively, applying the given fn
  only when there's a non-map at a particular level.
  (deep-merge-with + {:a {:b {:c 1 :d {:x 1 :y 2}} :e 3} :f 4}
                     {:a {:b {:c 2 :d {:z 9} :z 3} :e 100}})
  -> {:a {:b {:z 3, :c 3, :d {:z 9, :x 1, :y 2}}, :e 103}, :f 4}"
  [f & maps]
  (apply
   (fn m [& maps]
     (if (every? map? maps)
       (apply merge-with m maps)
       (apply f maps)))
   maps))

(defmacro with-let
  "Binds resource to binding and evaluates body. Then, returns resource. It's
  a cross between doto and with-open."
  [[binding resource] & body]
  `(let [ret# ~resource ~binding ret#] ~@body ret#))
