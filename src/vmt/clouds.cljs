(ns vmt.clouds
  "Library for working with clouds."
  (:require [goog.string :as gstring]
            [goog.string.format]
            [hoplon.svg :as svg]
            [weathergen.math :as math]
            [weathergen.ui.common :as comm]))

(comm/register-class!
 ::coverage-icon [{:stroke         "black"
                   :stroke-width   0.08
                   :fill           "none"
                   :pointer-events "none"
                   :opacity        0.7}])

(defn coverage-icon
  "Given a coverage type, returns SVG for the icon representing it on
  the map. Coordinate system has its origin at the center of the
  cell."
  [coverage towering?]
  (let [ri     0.3
        ro     0.45
        radius ri
        angle  (math/deg->rad 30)       ; Really, 90-angle
        ]
    (svg/g
     :attr {:class (comm/class-for ::coverage-icon)}
     (when towering?
       (let [xi (* ri (Math/sin angle))
             yi (* ri (Math/cos angle))
             xo (* ro (Math/sin angle))
             yo (* ro (Math/cos angle))]
        (svg/path
         :d (gstring/format "M %f,-%f L %f,-%f A -%f,%f 0 0,0 -%f,-%f L -%f,-%f"
                            xi yi
                            xo yo
                            ro ro
                            xo yo
                            xi yi))))
     (case coverage
       :none (svg/circle
              :cx 0
              :cy 0
              :r radius)

       :few (svg/g
             (svg/circle :cx 0 :cy 0 :r radius)
             (svg/line :x1 0 :y1 (- radius) :x2 0 :y2 radius))

       :scattered (svg/g
                   (svg/circle :cx 0 :cy 0 :r radius)
                   (svg/path
                    :attr {:fill "black"}
                    :d (gstring/format "M 0 0 L %f 0 A %f,%f 0 0,0 0,-%f L 0 0 Z",
                                       radius radius radius radius)))

       :broken (svg/g
                (svg/circle :cx 0 :cy 0 :r radius)
                (svg/path
                 :attr {:fill "black"}
                 :d (gstring/format "M 0 0 L 0,-%f A %f,%f 0 1,1 -%f,0 L 0 0 Z"
                                    radius radius radius radius)))

       :overcast (svg/circle
                  :attr {:fill "black"}
                  :cx 0
                  :cy 0
                  :r radius)))))
