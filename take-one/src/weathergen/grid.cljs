(ns weathergen.grid
  (:require [goog.string :as gstring]
            [goog.string.format])
  (:refer-clojure :exclude [get set print min max vals]))

(defn create
  ([x y] (create x y nil))
  ([x y init]
   (vec (repeat y (vec (repeat x init))))))

(defn set
  [grid x y val]
  (assoc-in grid [y x] val))

(defn get
  [grid x y]
  (get-in grid [y x]))

(defn print
  ([grid] (print "%s" grid))
  ([fmt grid]
   (.log js/console
         (apply str
                (interpose "\n"
                           (for [row grid]
                             (apply str
                                    (for [val row]
                                      (gstring/format (str fmt " ") val)))))))))

(defn vals
  "Return a sequence of the values of the gride"
  [grid]
  (flatten grid))

(defn contents
  "Return a tuple of [x y val] for each cell in the grid."
  [grid]
  (for [[x row] (map-indexed vector grid)
        [y v] (map-indexed vector row)]
    [x y v]))

(defn transform
  "Return a grid with each element replaced by (f elem)."
  [f grid]
  (mapv (fn [row] (mapv f row)) grid))

(defn min
  [grid]
  (reduce cljs.core/min (vals grid)))

(defn max
  [grid]
  (reduce cljs.core/max (vals grid)))

(defn normalize
  "Normalizes the values in a grid to the range [0,1]."
  [grid]
  (let [low (min grid)
        high (max grid)
        rng (- high low)]
    (println :low low :high high :rng rng)
    (transform #(-> % (- low) (/ rng)) grid)))
