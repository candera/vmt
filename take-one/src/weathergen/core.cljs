(ns weathergen.core
  (:require [weathergen.grid :as grid]
            [weathergen.render :as render]
            [goog.dom :as dom]
            [goog.dom.classes :as classes]))

(enable-console-print!)

(println "Edits to this text should show up in your developer console.")

;; define your app data so that it doesn't get over-written on reload

(defonce app-state (atom {:text "Hello world!"}))


(defn on-js-reload []
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
  )

(defn pow2
  [x]
  (.pow js/Math 2 x))

(defn mean
  [a b]
  (+ a (/ (- b a) 2)))

(defn add-midpoints
  [grid {:keys [levels level left right top bottom] :as params}]
  (let [rand-offset #(/ (- (rand) 0.5)
                        (pow2 (inc level)))
        newval      (fn [& coords]
                      (as-> coords ?
                        (map (fn [[x y]] (grid/get grid x y)) ?)
                        (reduce + ?)
                        (/ ? (count coords))
                        (+ ? (rand-offset))))]
    (-> grid
        (grid/set (mean left right)
                  top
                  (newval [left top] [right top]))
        (grid/set left
                  (mean top bottom)
                  (newval [left top] [left bottom]))
        (grid/set right
                  (mean top bottom)
                  (newval [right top] [right bottom]))
        (grid/set (mean left right)
                  bottom
                  (newval [left bottom] [right bottom]))
        (grid/set (mean left right)
                  (mean top bottom)
                  (newval [left top]
                          [right top]
                          [left bottom]
                          [right bottom])))))

(defn params
  [levels width height]
  (for [level (range levels)
        :let [size (pow2 (- levels level))]
        left (range 0 (dec width) size)
        top (range 0 (dec height) size)]
    {:levels levels
     :level  level
     :left   left
     :right  (+ left size)
     :top    top
     :bottom (+ top size)}))

(defn initial-grid
  [size]
  (let [rand-val #(- (rand) 0.5)
        left     0
        top      0
        right    (dec size)
        bottom   (dec size)]
    (-> (grid/create size size)
        (grid/set left top (rand-val))
        (grid/set right top (rand-val))
        (grid/set left bottom  (rand-val))
        (grid/set right bottom (rand-val)))))

(defn fractal-grid
  "Creates a fractal grid with levels"
  [levels]
  ;; Find the corners. For each of the five points we're generating,
  ;; average the appropriate subset and add a random offset. Then
  ;; recur on each of the four new subsets. If the subsets are 1x1,
  ;; we're done.

  ;; [x] How do we handle shapes that aren't 2^n+1 square?
  ;; - We don't.
  (let [size (inc (pow2 levels))]
    (reduce (fn [grid params]
              (add-midpoints grid params))
            (initial-grid size)
            (params levels size size))))

(defn weather-type
  "Return a weather type based on a value."
  [val]
  ;; TODO: make this tunable
  (cond
    (< val -0.25) :s
    (< val 0.0) :f
    (< val 0.4) :p
    :else       :i))

(defn weather
  "Quantize the grid into weather zones."
  [grid]
  (grid/transform weather-type grid))

(defn go
  []
  (->> (fractal-grid 7)
       weather
       (render/add-svg (dom/getElement "app"))))

(go)
