(ns weathergen.svg
  (:require [goog.dom :as dom]
            [goog.graphics :as graphics]
            [goog.string :as gstring]
            [goog.string.format]))

(defn fill-color
  [val]
  (gstring/format "rgb(%s)"
                  (case val
                    :sunny "0,0,255"
                    :fair "0,255,0"
                    :poor "255,255,0"
                    :inclement "255,0,0")))

(defn add-svg
  "Adds an SVG element that renders the given weather to the `parent`
  element."
  [parent weather {:keys [canvas-width canvas-height square-size]}]
  (let [g (graphics/SvgGraphics. canvas-width canvas-height)]
    (.render g parent)
    (doseq [x (range (/ canvas-width square-size))
            y (range (/ canvas-height square-size))]
      (println x y)
      (let [w (weather x y)]
        (.drawRect g
                   (* square-size x)
                   (* square-size y)
                   square-size
                   square-size
                   (graphics/Stroke. 0.1 "black")
                   (graphics/SolidFill. (fill-color (:category w))))))))
