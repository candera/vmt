(ns weathergen.core
  (:require [weathergen.model :as model]
            [weathergen.fmap :as fmap]
            [weathergen.math :as math]
            [goog.dom :as gdom]
            [goog.style :as gstyle]
            [goog.string :as gstring]
            [goog.string.format]
            [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]
            [cljs.core.async :as async
             :refer [<! >! timeout]]
            ;;[butler.core :as butler]
            )
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]))

(enable-console-print!)

(defn on-js-reload []
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
  )

(defonce app-state
  (atom {:weather-params {:origin-x 0
                          :origin-y 0
                          :t 0.01
                          :x-cells 59
                          :y-cells 59
                          ;;:feature-size 0.2
                          }
         :weather-data nil
         :display-params {:canvas-width 800
                          :canvas-height 800
                          :opacity 0.75
                          :display :weather
                          :map :korea}}))

(defn update-weather!
  []
  (swap! app-state assoc :weather-data
         (model/weather-grid (:weather-params @app-state))))

(update-weather!)

(def map-image
  {:korea "images/kto.jpg"
   :balkans "images/balkans.png"
   :israel "images/ito.jpg"})

(defn wind-vector
  [{:keys [x y width height wind key]}]
  (let [{:keys [speed heading]} wind
        transform (str "translate(" (+ x (/ width 2)) " " (+ y (/ height 2)) ")"
                       " "
                       "rotate(" heading ")")
        effective-speed (math/nearest speed 5)
        ticks (math/clamp 1 100 (int (/ effective-speed 5)))
        full-tails (int (/ ticks 2))
        half-tail? (odd? ticks)
        total-length 0.8
        stroke "black"
        stroke-width "0.9px"
        tail-step 0.15
        tail-slant 0.1
        tail-width (* 0.25 1.5)]
    (reduce
     into
     [[ ;; Vector line
       (dom/line #js {:x1 0
                      :y1 (* height (- 0.5 tail-slant))
                      :x2 0
                      :y2 (* height (+ -0.5 tail-slant))
                      :stroke stroke
                      :strokeWidth stroke-width
                      :transform transform
                      :react-key (str "line-" key)})]
      ;; Full tails
      (for [n (range full-tails)]
        (dom/line #js {:react-key (str "line-" n "-" key)
                       :x1 0
                       :y1 (* height (+ (+ -0.50 tail-slant)
                                        (* tail-step n)))
                       :x2 (* width tail-width)
                       :y2 (* height (+ -0.50 (* tail-step n)))
                       :stroke stroke
                       :strokeWidth stroke-width
                       :transform transform}))
      ;; Half tail
      (when half-tail?
        [(dom/line #js {:react-key (str "line-half" key)
                        :x1 0
                        :y1 (* height (+ (+ -0.50 tail-slant)
                                         (* tail-step full-tails)))
                        :x2 (* width tail-width 0.5)
                        :y2 (* height (+ -0.50 (+ (* tail-step full-tails)
                                                  (* 0.5 tail-step))))
                        :stroke stroke
                        :strokeWidth stroke-width
                        :transform transform})])])))

(def weather-color
  {:sunny [0 128 255 0]
   :fair [0 255 0 1]
   :poor [255 255 0 1]
   :inclement [192 0 0 1]
   nil [255 0 0 1]})

(def pressure-map
  {28.5 [192 0 0 1]
   28.9 [192 0 0 1]
   29.3 [255 255 0 1]
   29.5 [0 255 0 1]
   29.9 [0 128 255 1]
   30.2 [255 255 255 1]
   31.0 [255 255 255 1]})

(defn gradient-color
  [color-map val]
  (let [[[low l] [high h]] (->> color-map
                                (into (sorted-map))
                                (partition 2 1)
                                (filter (fn [[[low l] [high h]]]
                                          (<= low val high)))
                                first)]
    (math/vector-interpolate l h val low high)))

(defn pressure-color
  [pressure]
  (let [[r g b a] (gradient-color pressure-map pressure)]
    [(long r) (long g) (long b) a]))

(defn fill-color
  [w display alpha]
  (let [[r g b a]
        (case display
          :weather (-> w :category weather-color)
          :pressure (-> w
                        :pressure
                        pressure-color))]
    (gstring/format "rgba(%s,%s,%s,%s)" r g b (* a alpha))))

(let [opacity-ch (async/chan (async/dropping-buffer 1))]

  (go-loop [last-received nil
            last-set nil]
    (let [to (async/timeout 100)
          [val ch] (async/alts! [opacity-ch to])]
      (cond
        (= ch opacity-ch)
        (do
          (recur val last-set))

        (not= last-received last-set)
        (do
          (swap! app-state assoc-in [:display-params :opacity] last-received)
          (recur last-received last-received))

        :else
        (do
          (recur last-received last-set)))))

  (defn opacity-change
    [e]
    (let [opacity (-> e .-target .-value (/ 100.0))]
      (go (>! opacity-ch opacity)))))

(defn show-data
  [_ x y weather]
  (swap! app-state
         #(-> %
              (assoc-in [:selected-cell :x] x)
              (assoc-in [:selected-cell :y] y)
              (assoc-in [:selected-cell :weather] weather))))

(defui WeatherGrid
  ;; static om/IQuery
  ;; (query [this]
  ;;        [:weather-data :display-params :weather-params])
  Object
  (render [this]
          #_(dom/svg #js {:width 800
                          :height 800}
                     (js/React.DOM.image #js {:href (map-image :korea)
                                              :width 800
                                              :height 800}))
          (let [{:keys [weather-params weather-data display-params]} (om/props this)
                {:keys [canvas-width canvas-height opacity display map]} display-params
                {:keys [x-cells y-cells]} weather-params
                cell-width (/ canvas-width x-cells)
                cell-height (/ canvas-height y-cells)]
            (dom/svg
             #js {:width canvas-width
                  :height canvas-height}
             (when-let [map-image (map-image map)]
               (js/React.DOM.image #js {:href map-image
                                        :width canvas-width
                                        :height canvas-height}
                                   nil))
             (for [[[x y] weather] weather-data]
               (dom/rect #js {:key (str "cell" x "-" y)
                              :x (* cell-width x)
                              :y (* cell-height y)
                              :width cell-width
                              :height cell-height
                              ;;:class (weather-class weather)
                              :fill (fill-color weather display opacity)
                              :onMouseOver #(show-data % x y weather)
                              ;; :stroke "black"
                              ;; :strokeWidth "0.3px"
                              }))
             (for [[[x y] weather] weather-data
                   vector-part (wind-vector {:x (* cell-width x)
                                             :y (* cell-height y)
                                             :key (str x "-" y)
                                             :width cell-width
                                             :height cell-height
                                             :wind (:wind weather)})]
               vector-part)))))

(def weather-grid (om/factory WeatherGrid))

(defn invert-map
  [m]
  (zipmap (vals m) (keys m)))

(def map-name->key
  {"Israel" :israel
   "Balkans" :balkans
   "Korea" :korea})

(def map-key->name
  (invert-map map-name->key))

(defn map-change
  [e]
  (let [map (-> e
                .-target
                .-value
                map-name->key)]
    ;; (println "New map" map (-> e .-target .-value))
    (swap! app-state
           assoc-in
           [:display-params :map]
           map)))

(def weather-name->key
  {"Weather" :weather
   "Pressure" :pressure})

(def weather-key->name
  (invert-map weather-name->key))

(defn display-change
  [e]
  (let [map (-> e
                .-target
                .-value
                weather-name->key)]
    (swap! app-state
           assoc-in
           [:display-params :display]
           map)))


(defui DisplayControls
  Object
  (render
   [this]
   (let [{:keys [display-params]} (om/props this)
         {:keys [map opacity]}    display-params]
     (dom/fieldset
      nil
      (dom/legend nil "Display controls")
      (dom/div
       #js {:className "display-controls"}
       (dom/table
        nil
        (dom/tbody
         nil
         (dom/tr
          nil
          (dom/td nil "Map:")
          (dom/td nil
                  ;; TODO: This really needs to be a control
                  (dom/select #js {:onChange map-change
                                   :value (map-key->name map)}
                              (for [map-name ["Korea" "Balkans" "Israel" "None"]]
                                (dom/option
                                 #js {:value map-name}
                                 map-name)))))
         (dom/tr
          nil
          (dom/td nil "Display:")
          (dom/td nil
                  ;; TODO: Make this a control at the same time as the above
                  (dom/select #js {:onChange display-change}
                              (for [map (keys weather-name->key)]
                                (dom/option #js {:value map} map)))))
         (dom/tr
          nil
          (dom/td nil "Opacity:")
          (dom/td nil (dom/input #js {:type "range"
                                      :min 0
                                      :max 100
                                      :value (long (* opacity 100))
                                      :onChange opacity-change}))))))))))

(def display-controls
  (om/factory DisplayControls))

(defn click-prev
  [e]
  (swap! app-state (fn [state] (-> state
                                   (update-in [:weather-params :origin-x] dec)
                                   (update-in [:weather-params :origin-y] dec)
                                   (update-in [:weather-params :t] #(- % 0.05)))))
  (update-weather!))

(defn click-next
  [e]
  (swap! app-state (fn [state] (-> state
                                   (update-in [:weather-params :origin-x] inc)
                                   (update-in [:weather-params :origin-y] inc)
                                   (update-in [:weather-params :t] #(+ % 0.05)))))
  (update-weather!))

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
  (let [{:keys [weather-params weather-data] :as state} @app-state
        {:keys [x-cells y-cells]}  weather-params
        blob (fmap/get-blob (fn [x y] (get weather-data [x y]))
                            (range x-cells)
                            (range y-cells))]
    (save-data blob "generated.fmap")))


(defui PlayControls
  Object
  (render
   [this]
   (dom/fieldset
    nil
    (dom/legend nil "Play/save controls")
    (dom/div #js {}
             (dom/button #js {:onClick click-prev} "<")
             (dom/button #js {:onClick click-save} "Save")
             (dom/button #js {:onClick click-next} ">")))))

(def play-controls
  (om/factory PlayControls))

(def category-name->key
  {"Sunny" :sunny
   "Fair" :fair
   "Poor" :poor
   "Inclement" :inclement})

(def category-key->name
  (invert-map category-name->key))

(defui SelectedCellInfo
  Object
  (render
   [this]
   (let [{:keys [selected-cell]} (om/props this)]
     (dom/fieldset
      #js {:className "selected-cell-info"}
      (dom/legend nil "Cell Info")
      (dom/table
       nil
       (dom/tbody
        nil
        (for [[label selector transform]
              [["X" [:x] str]
               ["Y" [:y] str]
               ["Weather" [:weather :category] category-key->name]
               ["Pressure" [:weather :pressure] #(math/nearest % 0.01)]
               ["Temperature" [:weather :temperature] #(int (math/nearest % 1))]
               ["Wind Speed" [:weather :wind :speed] #(int (math/nearest % 1))]
               ["Wind Heading" [:weather :wind :heading] #(int (math/nearest % 1))]]]
          (dom/tr nil
                  (dom/td nil label)
                  (dom/td nil (transform (get-in selected-cell selector)))))))))))

(def selected-cell-info
  (om/factory SelectedCellInfo))

(defui DebugInfo
  Object
  (render
   [this]
   (let [{:keys [weather-params display-params selected-cell]} (om/props this)]
     (dom/fieldset
      nil
      (dom/legend nil "Debug Info")
      (dom/div
       #js {:id "debug"}
       (dom/table
        nil
        (dom/tbody
         nil
         (for [[k v] (merge weather-params display-params selected-cell)]
           (dom/tr nil
                   (dom/td nil (str k))
                   (dom/td nil (str v)))))))))))

(def debug-info
  (om/factory DebugInfo))

(defui WeatherGen
  Object
  (render [this]
          (dom/div
           nil
           (dom/div #js {:className "two-column"}
                    (dom/div #js {:className "left-column"}
                             (weather-grid (assoc @app-state :react-key :weather-grid)))
                    (dom/div #js {:className "right-column"}
                             (display-controls (assoc @app-state :react-key :display-controls))
                             (selected-cell-info (assoc @app-state :react-key :selected-cell-info))
                             (play-controls (assoc @app-state :react-key :play-controls))))
           (debug-info @app-state))))

(def reconciler
  (om/reconciler {:state app-state
                  ;; :parser (om/parser {:read read
                  ;;                     :mutate mutate})
                  }))

(om/add-root! reconciler
              WeatherGen
              (gdom/getElement "app"))


;; (if (undefined? (.-document js/self))
;;   (comment (worker/main))
;;   (ui/main "js/compiled/weathergen.js"))

;; (ui/main nil)
