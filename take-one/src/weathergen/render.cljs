(ns weathergen.render
  (:require [weathergen.grid :as grid]
            [goog.dom :as dom]
            [goog.graphics :as graphics]
            [goog.string :as gstring]
            [goog.string.format]))

(defn fill-color
  [val]
  (gstring/format "rgb(%s)"
                  (case val
                    :s "0,0,255"
                    :f "0,255,0"
                    :p "255,255,0"
                    :i "255,0,0")))

(defn add-svg
  "Adds an SVG element that renders the given weather to the `parent`
  element."
  [parent weather]
  (let [size 5
        g (graphics/SvgGraphics. 500 500)]
    (.render g parent)
    (doseq [[x y v] (grid/contents weather)]
      (.drawRect g
                 (* size x)
                 (* size y)
                 size
                 size
                 (graphics/Stroke. 0.1 "black")
                 (graphics/SolidFill. (fill-color v))))))
