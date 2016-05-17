(ns weathergen.quil
  (:require [quil.core :as q]
            [quil.middleware :as m]
            [weathergen.math :as math]
            [weathergen.model :as model]
            [weathergen.render :as render]))

(def canvas-size (* 18 59))

(defn setup []
  ; Set frame rate to 30 frames per second.
  (q/frame-rate 30)
  ; Set color mode to HSB (HSV) instead of default RGB.
  (q/color-mode :rgb)
  ; setup function returns initial state. It contains
  ; circle color and position.
  {:x 0
   :y 0
   :t 1})

(defn update-state [state]
  ; Update sketch state by changing circle color and position.
  (-> state
      (update :x #(- % 5))
      (update :y #(- % 5))
      (update :t #(+ % 0.05))
      ))

(defn arrow
  [x y xoff yoff c1 c2]
  (let [x1 x
        y1 y
        x2 (+ x xoff)
        y2 (+ y yoff)
        xm (math/interpolate x1 x2 0.75)
        ym (math/interpolate y1 y2 0.75)]
    (apply q/stroke c1)
    (q/line x1 y1 xm ym)
    (apply q/stroke c2)
    (q/line xm ym x2 y2)))

(defn draw-state [state]
  (let [wind-vector-length 45
        wind-vector-frequency 1
        square-size 10]
    (q/background 240)
    ;; (q/fill 128 128 128)
    ;; (q/rect 0 0 10 10)
    (doseq [x (range (/ canvas-size square-size))
            y (range (/ canvas-size square-size))
            :let [x* (- x (:x state))
                  y* (- y (:y state))
                  t* (:t state)
                  w (try
                      (model/weather x* y* t*)
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
      (apply q/fill (render/weather-color-gradient w))
      (q/rect (* x square-size) (* y square-size) square-size square-size)
      #_(when (and (zero? (mod x wind-vector-frequency))
                 (zero? (mod y wind-vector-frequency)))
        (arrow (+ (* x square-size) (/ square-size 2))
               (+ (* y square-size) (/ square-size 2))
               (* wind-vector-length wind-x)
               (* wind-vector-length wind-y)
               [0 0 0]
               [255 105 180])))))

#_(defn draw-state
  [state]
    (let [wind-vector-length 45
        wind-vector-frequency 1
        square-size 10]
    (q/background 240)
    (doseq [x (range (/ canvas-size square-size))
            y (range (/ canvas-size square-size))
            :let [x* (+ x (:x state))
                  y* (+ y (:y state))
                  t* (:t state)
                  w  {:pressure (math/fractal-field x* y* 64 1)}]]
      (q/stroke 0 0 0 1)
      (apply q/fill (render/weather-color-greyscale w))
      (q/rect (* x square-size) (* y square-size) square-size square-size))))

(q/defsketch weathergen
  :title "Stormy weather"
  :size [canvas-size canvas-size]
  ; setup function called only once, during sketch initialization.
  :setup setup
  ; update-state is called on each iteration before draw-state.
  :update update-state
  :draw draw-state
  :features [:keep-on-top :no-start]
  ; This sketch uses functional-mode middleware.
  ; Check quil wiki for more info about middlewares and particularly
  ; fun-mode.
  :middleware [m/fun-mode])
