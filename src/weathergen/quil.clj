(ns weathergen.quil
  (:require [quil.core :as q]
            [weathergen.math :as math]
            [weathergen.model :as model]))

(def canvas-size (* 16 59))

(def state (atom {:categories
                  {:sunny {:weight 10, :wind {:min 0, :mean 7, :max 20}},
                   :fair {:weight 1, :wind {:min 5, :mean 10, :max 30}},
                   :poor {:weight 5, :wind {:min 15, :mean 25, :max 45}},
                   :inclement {:weight 2, :wind {:min 25, :mean 40, :max 80}}},
                  :crossfade 0.1,
                  :direction [1 1],
                  :evolution 0.005,
                  :feature-size 10,
                  :layer :type,
                  :max-pressure 31.0,
                  :min-pressure 28.5,
                  :origin [3194 3194],
                  :prevailing-wind {:heading 45},
                  :wind-uniformity 0.7
                  :size [59 59],
                  :t 14.285000000000833,
                  :turbulence {:size 1, :power 200},
                  :wind-spread 0.3}))

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
  (let [{:keys [size feature-size layer] :as params} @state
        [width height]                         size
        square-size                            (/ canvas-size width)
        grid                                   (model/weather-grid params)]
    (q/color-mode
     (get {:pressure :rgb
           :type     :hsb}
          layer
          :rgb))
    (doseq [x (range width)
            y (range height)
            :let [{:keys [value type wind wind-var]} (get grid [x y])]]
      (q/stroke 0 0 0 1)
      (case layer
        :type (do
                (q/color-mode :hsb)
                (apply q/fill (type-color type)))
        ;; TODO: other layers
        (let [v (* value 255)]
          (q/color-mode :rgb)
          (q/fill v v v)))
      (q/rect (* x square-size) (* y square-size) square-size square-size))
    (doseq [x (range width)
            y (range height)
            :let [{:keys [value type wind wind-var]} (get grid [x y])]]
      (q/stroke 0 0 0 1)
      (q/color-mode :hsb)
      (let [[wx wy] (->> [0 1]
                         (math/rotate (:heading wind))
                         (math/scale (-> wind :speed (+ 1) Math/log (* 0.25))))]
        #_(do
          (q/fill 0 0 0)
          (q/text (str (math/nearest (:speed wind) 1))
                  (* x square-size)
                  (* (+ y 0.75) square-size))
          (q/stroke 0 0 0 32)
          (q/fill 0 0 0 0)
          (q/rect (* x square-size)
                  (* y square-size)
                  square-size
                  square-size))
        (arrow (* (+ x 0.5) square-size)
                 (* (+ y 0.5) square-size)
                 (* wx square-size)
                 (* wy square-size)
                 [0 0 0]
                 [255 0 255])))))


