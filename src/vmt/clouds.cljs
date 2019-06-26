(ns vmt.clouds
  "Library for working with clouds."
  (:require [hoplon.svg :as svg]
            [weathergen.ui.common :as comm]))

(comm/register-class!
 ::coverage-icon [{:stroke         "black"
                   :stroke-width   0.1
                   :fill           "none"
                   :pointer-events "none"
                   :opacity        0.7}])

(defn coverage-icon
  "Given a coverage type, returns SVG for the icon representing it on
  the map. Coordinate system has its origin at the center of the
  cell."
  [coverage]
  (svg/g
   :attr {:class (comm/class-for ::coverage-icon)}
   (case coverage
     :none (svg/circle
            :cx 0
            :cy 0
            :r 0.4)

     :few (svg/g
           (svg/circle :cx 0 :cy 0 :r 0.4)
           (svg/line :x1 0 :y1 -0.4 :x2 0 :y2 0.4))

     :scattered (svg/g
                 (svg/circle :cx 0 :cy 0 :r 0.4)
                 (svg/path
                  :attr {:fill "black"}
                  :d "M 0 0 L 0.4 0 A 0.4,0.4 0 0,0 0,-0.4 L 0 0 Z"))

     :broken (svg/g
              (svg/circle :cx 0 :cy 0 :r 0.4)
              (svg/path
               :attr {:fill "black"}
               :d "M 0 0 L 0,-0.4 A 0.4,0.4 0 1,1 -0.4,0 L 0 0 Z"))

     :overcast (svg/circle
                :attr {:fill "black"}
                :cx 0
                :cy 0
                :r 0.4))))
