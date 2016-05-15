(ns weathergen2.render)

(defn vector-interpolate
  [v1 v2 x x1 x2]
  (let [f      (/ (- x x1) (double (- x2 x1)))
        interp (fn [a b] (+ (* (- 1 f) a) (* f b)))]
    (mapv interp v1 v2)))

(def successor
  {:sunny :fair
   :fair :poor
   :poor :inclement})

(def color
  {:sunny [0 128 255]
   :fair [0 255 0]
   :poor [255 255 0]
   :inclement [192 0 0]
   nil [255 0 0]})

(defn weather-color-discrete
  [w]
  (-> w :category color))

(defn weather-color-gradient
  [w]
  (vector-interpolate (-> w :category color)
                      (-> w :category successor color)
                      (-> w :proportion)
                      0
                      1))

(defn weather-color-greyscale
  [w]
  (repeat 3 (* (:pressure w) 255)))
