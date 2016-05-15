(ns weathergen.quil
  (:require [quil.core :as q]
            [quil.middleware :as m]
            [weathergen.math :as math]
            [weathergen.model :as model]
            [weathergen.render :as render]))

(def canvas-size 1000)

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
      (update :x inc)
      (update :y inc)
      (update :t #(+ % 0.05))))


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
        square-size 15]
    (q/background 240)
    (doseq [x (range (/ canvas-size square-size))
            y (range (/ canvas-size square-size))
            :let [x* (- x (:x state))
                  y* (- y (:y state))
                  t* (:t state)
                  w (model/weather x* y* t*)
                  [wind-x wind-y] (:wind w)
                  [px' py'] (:pressure-gradient w)]]
      ;;(apply q/fill (weather-color-greyscale w)
      (q/stroke 0 0 0 1)
      (apply q/fill (render/weather-color-gradient w))
      (q/rect (* x square-size) (* y square-size) square-size square-size)
      (when (and (zero? (mod x wind-vector-frequency))
                 (zero? (mod y wind-vector-frequency)))
        (arrow (+ (* x square-size) (/ square-size 2))
               (+ (* y square-size) (/ square-size 2))
               (* wind-vector-length wind-x)
               (* wind-vector-length wind-y)
               [0 0 0]
               [255 105 180]))
      )))

(q/defsketch weathergen2
  :title "You spin my circle right round"
  :size [canvas-size canvas-size]
  ; setup function called only once, during sketch initialization.
  :setup setup
  ; update-state is called on each iteration before draw-state.
  :update update-state
  :draw draw-state
  :features [:keep-on-top]
  ; This sketch uses functional-mode middleware.
  ; Check quil wiki for more info about middlewares and particularly
  ; fun-mode.
  :middleware [m/fun-mode])
