(ns weathergen.core
  (:require [weathergen.model :as model]
            [weathergen.svg :as svg]
            [weathergen.fmap :as fmap]
            [weathergen.math :as math]
            [goog.dom :as gdom]
            [goog.style :as gstyle]
            [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]
            [cljs.core.async :as async
             :refer [<! >! timeout]])
  (:require-macros [cljs.core.async.macros :refer [go-loop]]))

(enable-console-print!)

(println "Edits to this text should show up in your developer console.")

;; define your app data so that it doesn't get over-written on reload

(defonce app-state
  (atom {:origin-x 0
         :origin-y 0
         :t 0.01
         :canvas-width 800
         :canvas-height 800
         :x-cells 59
         :y-cells 59
         :feature-size 0.25}))

(defn on-js-reload []
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
  )

(defn current-weather
  [{:keys [origin-x origin-y feature-size t] :as state} x y]
  (model/weather (/ (+ x origin-x) feature-size)
                 (/ (+ y origin-y) feature-size)
                 t))

(defn click-prev
  [e]
  (swap! app-state (fn [state] (-> state
                                   (update :origin-x dec)
                                   (update :origin-y dec)
                                   (update :t #(- % 0.05))))))

(defn click-next
  [e]
  (swap! app-state (fn [state] (-> state
                                   (update :origin-x inc)
                                   (update :origin-y inc)
                                   (update :t #(+ % 0.05))))))

(defn save-data
  [blob filename]
  (let [a (gdom/createElement "a")
        _ (-> (gdom/getDocument) .-body (gdom/appendChild a))
        _ (gstyle/showElement a false)
        url (-> js/window .-URL (.createObjectURL blob))]
    (-> a .-href (set! url))
    (-> a .-download (set! filename))
    (.click a)
    (-> js/window .-URL (.revokeObjectURL url))))

(defn click-save
  [e]
  (let [{:keys [x-cells y-cells] :as state} @app-state
        blob (fmap/get-blob (fn [x y] (current-weather state x y))
                       (range x-cells)
                       (range y-cells))]
    (save-data blob "generated.fmap")))

(defn wind-vector
  [{:keys [x y width height wind]}]
  (let [{:keys [speed heading]} wind
        transform (str "translate(" (+ x (/ width 2)) " " (+ y (/ height 2)) ")"
                       " "
                       "rotate(" heading ")")
        tails (math/clamp 1 3 (long (/ speed 10)))
        total-length 0.8
        stroke "black"
        stroke-width "0.5px"]
    (into [(dom/line #js {:x1 0
                          :y1 (* height 0.40)
                          :x2 0
                          :y2 (* height -0.40)
                          :stroke stroke
                          :strokeWidth stroke-width
                          :transform transform})]
          (for [n (range tails)]
            (dom/line #js {:x1 0
                           :y1 (* height (+ -0.40 (* 0.15 n)))
                           :x2 (* width (* 0.25 (Math/pow 0.9 n)))
                           :y2 (* height (+ -0.50 (* 0.15 n)))
                           :stroke stroke
                           :strokeWidth stroke-width
                           :transform transform})))))

(defui WeatherGen
  Object
  (render [this]
          (let [{:keys [x-cells y-cells canvas-width canvas-height] :as state} @app-state
                cell-width (/ canvas-width x-cells)
                cell-height (/ canvas-height y-cells)
                data (for [x (range x-cells)
                           y (range y-cells)]
                       [[x y] (current-weather state x y)])]
            (dom/div
             nil
             (dom/svg
              #js {:width canvas-width
                   :height canvas-height}
              (for [[[x y] weather] data]
                (dom/rect #js {:x (* cell-width x)
                               :y (* cell-height y)
                               :width cell-width
                               :height cell-height
                               :fill (-> weather
                                         :category
                                         svg/fill-color)
                               :stroke "black"
                               :strokeWidth "0.3px"}))
              (for [[[x y] weather] data
                    vector-part (wind-vector {:x (* cell-width x)
                                               :y (* cell-height y)
                                               :width cell-width
                                               :height cell-height
                                               :wind (:wind weather)})]
                vector-part))
             (dom/button #js {:onClick click-prev} "<")
             (dom/button #js {:onClick click-save} "Save")
             (dom/button #js {:onClick click-next} ">")
             (dom/div
              #js {:id "debug"}
              (dom/table
               nil
               (dom/tbody
                nil
                (for [[k v] state]
                  (dom/tr nil
                          (dom/td nil (str k))
                          (dom/td nil (str v)))))))))))

(def reconciler
  (om/reconciler {:state app-state}))

(om/add-root! reconciler
              WeatherGen
              (gdom/getElement "app"))

(defn update-state
  [state]
  (-> state
      (update :x inc)
      (update :y inc)
      (update :t #(+ % 0.05))))

;; (go-loop []
;;   (async/<! (timeout 2000))
;;   (println (:t @app-state))
;;   (swap! app-state update-state)
;;   (recur))

;; (js/ReactDOM.render (weathergen) (gdom/getElement "app"))


;; (defn root-component [app owner]
;;   (reify
;;     om/IRender
;;     (render [_]
;;       (dom/svg nil nil))))

;; (defn go
;;   []
;;   (let [weather (fn [x y] (model/weather x y 0))]
;;     (-> (dom/getElement "app")
;;         (svg/add-svg weather {:canvas-width 500
;;                               :canvas-height 500
;;                               :square-size 5}))))

;; (go)
