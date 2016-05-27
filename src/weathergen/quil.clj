(ns weathergen.quil
  (:require [quil.core :as q]
            [weathergen.math :as math]
            [weathergen.model :as model]))

(def canvas-size (* 18 59))

(def state (atom {:origin-x 0
                  :origin-y 0
                  :t 0.01
                  ;; :x-cells 59
                  ;; :y-cells 59
                  :x-cells 120
                  :y-cells 120
                  :feature-size 0.07
                  :wind-pressure-constant 2
                  :wind-smoothing-window 0
                  :wind-strength 50.0}))

(defn setup []
  ; Set frame rate to 30 frames per second.
  (q/frame-rate 30)
  ; Set color mode to HSB (HSV) instead of default RGB.
  (q/color-mode :rgb)
  ; setup function returns initial state. It contains
  ; circle color and position.
  state)

(defn update-state [_]
  (swap! state (fn [val]
                 (-> val
                     (update :origin-x #(- % 2))
                     (update :origin-y #(- % 2))
                     (update :t #(+ % 0.05))
                     )))
  state)

(defn arrow
  [x y xoff yoff c1 c2]
  (let [x1 x
        y1 y
        x2 (+ x xoff)
        y2 (+ y yoff)
        xm (math/interpolate x1 x2 0.6)
        ym (math/interpolate y1 y2 0.6)]
    (apply q/stroke c1)
    (q/line x1 y1 xm ym)
    (apply q/stroke c2)
    (q/stroke-weight 2)
    (q/line xm ym x2 y2)))

(defn weather-color-gradient
  [w]
  [(-> w :value (* 192) long) 255 255])

#_(defn draw-state [state]
  (let [wind-vector-length 45
        wind-vector-frequency 1
        square-size 5]
    (q/background 240)
    ;; (q/fill 128 128 128)
    ;; (q/rect 0 0 10 10)
    (doseq [x (range (/ canvas-size square-size))
            y (range (/ canvas-size square-size))
            :let [x* (- x (:origin-x state))
                  y* (- y (:origin-y state))
                  t* (:t state)
                  w (try
                      ;;(model/weather x* y* t*)
                      (model/field {:x x* :y y* :t t*
                                    :fxy (fn [x y] (Math/sin (+ x y)))
                                    :fv #(-> % Math/sin Math/abs)})
                      (catch Throwable ex
                        (q/debug ex)
                        (q/debug x*)
                        (q/debug y*)
                        (q/debug t*)))
                  ;;w {:wind [0 0] :pressure 0 :pressure-gradient [0 0] :category :sunny}
                  ;;[wind-x wind-y] (:wind w)
                  ]]
      ;;(apply q/fill (weather-color-greyscale w)
      (q/stroke 0 0 0 1)
      ;;(apply q/fill (weather-color-gradient w))
      (q/fill [(long (* w 192)) 255 255])
      (q/rect (* x square-size) (* y square-size) square-size square-size)
      #_(when (and (zero? (mod x wind-vector-frequency))
                 (zero? (mod y wind-vector-frequency)))
        (arrow (+ (* x square-size) (/ square-size 2))
               (+ (* y square-size) (/ square-size 2))
               (* wind-vector-length wind-x)
               (* wind-vector-length wind-y)
               [0 0 0]
               [255 105 180])))))

(defn draw-state
  [state]
  (let [wind-vector-length 45
        wind-vector-frequency 1
        square-size (/ canvas-size (:x-cells @state))]
    (q/background 240)
    (let [ ;; grid (model/weather-grid @state)
          zoom (:feature-size @state)]
      (doseq [x (range (:x-cells @state))
              y (range (:y-cells @state))
              :let [x* (* (+ x (:origin-x @state)) zoom)
                    y* (* (+ y (:origin-y @state)) zoom)
                    fxy (fn [x y]
                          (let [x* (- (mod (+ x 1) 2) 1)
                                y* (- (mod (+ y 1) 2) 1)
                                v (* (Math/sin (/ x 1.3))
                                     (Math/sin (/ y 2.2))
                                     (Math/cos (* Math/PI x*))
                                     (Math/cos (* Math/PI y*)))]
                            {:v (-> v (+ 1) (/ 2))
                             :w (->> [(* (Math/sin (* Math/PI x*))
                                         (Math/cos (* Math/PI y*)))
                                      (* (Math/cos (* Math/PI x*))
                                         (Math/sin (* Math/PI y*)))]
                                     math/normalize
                                     (math/scale (+ 0.5 (Math/abs v)))
                                     (math/scale 0.75)
                                     (math/rotate (+ 80 (* 20 v))))}))
                    t-power 20
                    t-size 0.1
                    delta 0.001
                    [x0 y0] (model/field2 {:x x*
                                           :y y*
                                           :t (:t @state)
                                           :t-power t-power
                                           :t-size t-size})
                    [xx yx] (model/field2 {:x (+ x* delta)
                                           :y y*
                                           :t (:t @state)
                                           :t-power t-power
                                           :t-size t-size})
                    [xy yy] (model/field2 {:x x*
                                           :y (+ y* delta)
                                           :t (:t @state)
                                           :t-power t-power
                                           :t-size t-size})
                    [dxx dyx] [(/ (- xx x0) delta) (/ (- yx y0) delta)]
                    [dxy dyy] [(/ (- xy x0) delta) (/ (- yy y0) delta)]
                    {:keys [v w]} (fxy x0 y0)
                    [wx wy] w
                    [wx* wy*] (->> [(+ (* wx dxx) (* wy dyx))
                                    (+ (* wx dxy) (* wy dyy))]
                                   (math/normalize)
                                   (math/scale (math/magnitude w)))]]
        (q/stroke 0 0 0 1)
        (q/color-mode :hsb)
        (q/fill (* v 192) 255 255)
        (q/rect (* x square-size) (* y square-size) square-size square-size)
        (arrow (* (+ x 0.5) square-size)
               (* (+ y 0.5) square-size)
               (* wx* 0.75 square-size)
               (* wy* 0.75 square-size)
               [0 0 0]
               [255 0 255])))))



(comment
  ;; Got good values with this:
  (model/field {:x x* :y y* :t (:t @state)
                :t-power 4
                :t-size 0.05
                :fxy (fn [x y]
                       (* (Math/abs
                           (Math/sin (/ x 5)))
                          (Math/pow
                           (* (Math/abs (- (mod x 2) 1))
                              (Math/abs (- (mod y 2) 1)))
                           3)))
                :fv (fn [v]
                      (let [v1 (-> v Math/sin Math/abs)
                            v2 (- v1 0.5)
                            v3 (* v2 v2 v2)]
                        (-> v3 (* 4) (+ 0.5))))
                })
  )
