(ns weathergen.quil.sketch
  (:require [weathergen.quil :as wq]
            [quil.core :as q]
            [quil.middleware :as m]))

#_(q/defsketch weathergen
  :title "Stormy weather"
  :size [wq/canvas-size wq/canvas-size]
  ; setup function called only once, during sketch initialization.
  :setup wq/setup
  ; update-state is called on each iteration before draw-state.
  :update wq/update-state
  :draw wq/draw-state
  :features [:keep-on-top :no-start]
  ; This sketch uses functional-mode middleware.
  ; Check quil wiki for more info about middlewares and particularly
  ; fun-mode.
  :middleware [m/fun-mode m/pause-on-error])
