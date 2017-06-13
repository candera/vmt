(require '[weathergen.core :as w]
         '[weathergen.grid :as grid]
         '[goog.string :as gstring]
         '[goog.string.format])

(w/params 1 2 2)

(grid/print (w/weather 5))

(->> foo
     (first))

(for [_ (range 3)]
  (let [w (w/weather 7)]
    [(reduce min (grid/vals w))
     (reduce max (grid/vals w))]))

(mapv (fn [row] (mapv inc row)) (grid/create 3 3 0.5))

(def g (grid/transform (fn [x] (rand)) (grid/create 3 3)))
(let [low (grid/min g)
      high (grid/max g)
      rng (- high low)]
  (grid/transform #(-> % (- low) (/ rng)) g))

(grid/normalize g)
(->> (grid/create 3 3)
     (grid/transform (fn [x] (rand)))
     grid/normalize)

(grid/max (grid/create 3 3))

(grid/max (w/weather 3))

;; Strategy: break the computation up into three parts. First,
;; generate the weather data. Next, transform that into data
;; describing the visualization. Finally, render it as SVG or
;; whatever.

(require :reload-all
         '[weathergen.core :as w]
         '[weathergen.grid :as grid]
         '[weathergen.render :as render]
         '[goog.string.format])

(->> (w/fractal-grid 3)
     w/weather
     (grid/print "%11s"))

(->> (w/fractal-grid 3)
     (grid/print "%1.3f"))

(->> (w/fractal-grid 5)
     w/weather
     grid/vals
     frequencies)

(->> (w/fractal-grid 2)
     w/weather
     render/weather->svg)

(grid/contents [[:s]])
(render/weather->svg [[:s]])

(render/style :s)

(for [[x y v] [[0 0 :s]]]
  (goog.string.format/format "<rect x='%d' y='%d' width='10' height='10' style='%s' />"
            x y (render/style v)))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(->> @smpu
     :units
     (filter #(= (:type %) :flight))
     (#(nth % 18))
     (mission/flight-squadron @smpu)
     (mission/squadron-airbase @smpu)
     ::mission/name
     ;; (mission/squadron-airbase @smpu)
     ;; (mission/objective-name @smpu)
     )

