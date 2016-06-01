(ns weathergen.quil
  (:require [quil.core :as q]
            [weathergen.math :as math]
            [weathergen.model :as model]))

(def canvas-size (* 18 59))

(def interesting-params
  {0 {:origin       [0 0]
      :t            0.01
      :size         [59 59]
      :feature-size 10
      :turbulence   {:size  1
                     :power 1}
      :min-pressure 28.5
      :max-pressure 31.0
      :categories   [{:type :sunny
                      :weight 5}
                     {:type :fair
                      :weight 3}
                     {:type :poor
                      :weight 1}
                     {:type :inclement
                      :weight 1}]}
   1 {:origin       [-456 -456],
      :t            2.289999999999995,
      :direction    [-1 -1]
      :evolution    0.1
      :size         [59 59],
      :feature-size 20,
      :turbulence   {:size 0.04, :power 6},
      :min-pressure 28.5,
      :max-pressure 31.0,
      :categories   [{:type :sunny, :weight 5}
                     {:type :fair, :weight 3}
                     {:type :poor, :weight 1}
                     {:type :inclement, :weight 1}]}
   2 {:origin       [-978 -978],
      :t            4.89999999999994,
      :size         [59 59],
      :feature-size 40,
      :turbulence   {:size 0.1, :power 25},
      :min-pressure 28.5,
      :max-pressure 31.0,
      :categories
      [{:type :sunny, :weight 5}
       {:type :fair, :weight 3}
       {:type :poor, :weight 1}
       {:type :inclement, :weight 1}]}
   3 {:max-pressure 31.0,
      :evolution 0.1,
      :min-pressure 28.5,
      :size [100 100],
      :feature-size 20,
      :categories
      [{:type :sunny, :weight 5}
       {:type :fair, :weight 3}
       {:type :poor, :weight 1}
       {:type :inclement, :weight 1}],
      :turbulence {:size 0.1, :power 20},
      :origin [-509 -509],
      :t 7.589999999999984,
      :direction [-1 -1]}
   4 {:max-pressure 31.0,
      :evolution 0.07500000000000001,
      :min-pressure 28.5,
      :size [100 100],
      :feature-size 20,
      :categories
      [{:type :sunny, :weight 5}
       {:type :fair, :weight 3}
       {:type :poor, :weight 1}
       {:type :inclement, :weight 1}],
      :turbulence {:size 0.1, :power 20},
      :origin [-561 -561],
      :t 12.489999999999961,
      :direction [-1 -1]}
   5 {:max-pressure 31.0,
      :evolution 0.07,
      :min-pressure 28.5,
      :size [100 100],
      :feature-size 10,
      :categories [{:type :sunny, :weight 5}
                   {:type :fair, :weight 3}
                   {:type :poor, :weight 1}
                   {:type :inclement, :weight 1}],
      :turbulence {:size 0.1, :power 15},
      :origin [8885 1186],
      :t 1747.0626599126583,
      :direction [1 1]}})

(def state (atom (get interesting-params 5)))

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
                     (update :origin math/vector-add (:direction val))
                     (update :t + (:evolution val)))))
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

(def type-color
  {:sunny [128 255 255]
   :fair  [90 255 255]
   :poor  [50 255 255]
   :inclement [0 225 255]})

(defn draw-state
  [state]
  (q/background 240)
  (let [{:keys [size feature-size] :as params} @state
        [width height]                         size
        square-size                            (/ canvas-size width)
        grid                                   (model/weather-grid params)]
    (doseq [x (range width)
            y (range height)
            :let [{:keys [value info wind-pattern wind-vec]} (get grid [x y])
                  [wx wy] wind-vec
                  {:keys [type]} info]]
      (q/stroke 0 0 0 1)
      (q/color-mode :hsb)
      (apply q/fill (type-color type))
      (q/rect (* x square-size) (* y square-size) square-size square-size)
      (arrow (* (+ x 0.5) square-size)
             (* (+ y 0.5) square-size)
             (* wx 0.5 square-size)
             (* wy 0.5 square-size)
             [0 0 0]
             [255 0 255]))))


