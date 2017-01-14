(ns weathergen.wind
  "Library for rendering iconography associated with wind."
  (:require [goog.string :as gstring]
            [goog.string.format]
            [hoplon.svg :as svg]
            [weathergen.math :as math]))

(defn barb
  [speed]
  (let [pennants (-> speed (/ 50) long)
        speed' (-> speed (- (* 50 pennants)))
        ticks (math/clamp (if (zero? pennants) 1 0)
                          100
                          (int (/ speed' 5)))
        full-tails (int (/ ticks 2))
        half-tail? (odd? ticks)
        ;; Handle the case of a single half-tail by offsetting it
        ;; from the beginning of the barb
        single-half-tail? (and half-tail?
                               (zero? full-tails)
                               (zero? pennants))
        starts-with-tail? (and (zero? pennants)
                               (pos? full-tails))
        scale 1
        offset 0.1
        tail-step 0.16
        tail-slant 0.15
        tail-width (* 0.25 1.5)
        pennant-base 0.2
        pennant-step 0.25
        pennant-offset (* pennant-step pennants)]
    (svg/g
     ;; TODO: Refactor this so it uses paths everywhere rather
     ;; than a mixture of lines and paths
     (if starts-with-tail?
       (svg/path
        :attr {:class "wind-vector"
               :fill "none"}
        :d (gstring/format
            "M%f,%f L%f,%f L%f,%f"
            tail-width, -0.50
            0, (+ -0.5 tail-slant)
            0, (- 0.5 tail-slant)))
       (svg/line
        :attr {:class "wind-vector"}
        :x1 0
        :x2 0
        :y1 (- 0.5 tail-slant)
        :y2 (+ -0.5 tail-slant)))

     ;; Pennants
     (svg/g
      :attr {:class "wind-vector pennant"}
      (for [n (range pennants)]
        (svg/path
         :attr {:fill "black"}
         :d (gstring/format "M%f,%f L%f,%f L%f,%f Z"
                            0
                            (+ -0.5 (* pennant-step n))
                            tail-width
                            (+ -0.50 (* pennant-step n))
                            0
                            (+ -0.5
                               (* pennant-step n)
                               pennant-base)))))

     ;; Full tails
     (svg/g
      :attr {:class "wind-vector full-tail"}
      (for [n (range (if starts-with-tail? 1 0) full-tails)]
        (svg/line :x1 0
                  :y1 (+ -0.5
                         tail-slant
                         pennant-offset
                         (* tail-step n))
                  :x2 tail-width
                  :y2 (+ -0.5
                         pennant-offset
                         (* tail-step n)))))

     ;; Half tails
     (when half-tail?
       (let [length 0.6]
         (svg/line
          :attr {:class "wind-vector half-tail"}
          :x1 0
          :y1 (+ -0.50
                 tail-slant
                 pennant-offset
                 (* tail-step (+ full-tails (if single-half-tail? 1.5 0))))
          :x2 (* tail-width length)
          :y2 (+ -0.50
                 (* tail-slant (- 1 length))
                 pennant-offset
                 (* tail-step (+ full-tails (if single-half-tail? 1.5 0))))))))))
