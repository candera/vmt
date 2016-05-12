(ns weathergen2.core
  (:require [quil.core :as q]
            [quil.middleware :as m]
            [weathergen2.noise :as n]))

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

(defn weather-type
  "Return a weather type based on a value."
  [val]
  ;; TODO: make this tunable
  (cond
    (< val 0.4) :s
    (< val 0.5) :f
    (< val 0.65) :p
    :else       :i))

(def fill-color
  {:s [0 0 255]
   :f [0 255 0]
   :p [255 255 0]
   :i [255 0 0]})

(defn weather
  [x y t]
  (let [t1 (n/whole t)
        t2 (inc t1)]
    (n/interpolate (n/fractal-field x y 32 t1)
                   (n/fractal-field x y 32 t2)
                   (n/frac t))))

(defn draw-state [state]
  (q/background 240)
  (doseq [x (range 100)
          y (range 100)
          :let [color (-> (weather (- x (:x state))
                                   (- y (:y state))
                                   (:t state))
                          weather-type
                          fill-color)]]
    (apply q/fill color)
    (q/stroke 0 0 0 1)
    (q/rect (* x 5) (* y 5) 5 5)))

(q/defsketch weathergen2
  :title "You spin my circle right round"
  :size [500 500]
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
