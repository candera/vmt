(ns weathergen.core
  (:require [clojure.string :as string]
            [cljs.reader :as reader]
            [weathergen.model :as model]
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
  (atom {:revision        1
         :weather-params  {:temp-uniformity 0.7
                           :pressure        {:min 28.5 :max 31}
                           :size            [59 59]
                           :feature-size    10
                           :categories      {:sunny     {:weight 20
                                                         :wind   {:min 0 :mean 7 :max 20}
                                                         :temp   {:min 20 :mean 22 :max 24}}
                                             :fair      {:weight 0.7
                                                         :wind   {:min 5 :mean 10 :max 30}
                                                         :temp   {:min 18 :mean 21 :max 23}}
                                             :poor      {:weight 5
                                                         :wind   {:min 10 :mean 18 :max 30}
                                                         :temp   {:min 15 :mean 18 :max 21}}
                                             :inclement {:weight 2
                                                         :wind   {:min 15 :mean 25 :max 60}
                                                         :temp   {:min 12 :mean 14 :max 16}}}
                           :turbulence      {:size 1 :power 250}
                           :origin          [1000 1000]
                           :time            {:offset    1234
                                             :evolution 1200
                                             :current   {:day 1 :hour 5 :minute 0}
                                             :start     {:day 1 :hour 5 :minute 0}}
                           :direction {:heading 135 :speed 30}
                           :wind-uniformity 0.7
                           :crossfade       0.1
                           :prevailing-wind {:heading 325}
                           :seed            1234
                           :wind-stability-areas [[16 39 6 4]]}
         :movement-params {:step          60
                           :step-on-save? true
                           :end           {:day 1 :hour 14 :minute 0}}
         :selected-cell   nil
         :weather-data    nil
         :display-params  {:canvas-width  800
                           :canvas-height 800
                           :opacity       0.75
                           :display       :type
                           :map           :korea}}))

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

(def temp-map
  {0 [0 0 255 1]
   15 [0 255 0 1]
   40 [255 0 0 1]})

(defn temperature-color
  [temp]
  (let [[r g b a] (gradient-color temp-map temp)]
    [(long r) (long g) (long b) a]))

(defn fill-color
  [w display alpha]
  ;;(println "fill-color" :w w :display display :alpha alpha)
  (let [[r g b a]
        (case display
          :type (-> w :type weather-color)
          :pressure (-> w
                        :pressure
                        pressure-color)
          :temperature (-> w
                           :temperature
                           temperature-color))]
    (gstring/format "rgba(%s,%s,%s,%s)" r g b (* a alpha))))

(defn row
  [cols]
  (dom/tr
   nil
   (for [col cols]
     (dom/td nil col))))

(let [opacity-ch (async/chan (async/dropping-buffer 1))]

  (go-loop [last-received nil
            component nil
            last-set nil]
    (let [to (async/timeout 100)
          [[val c] ch] (async/alts! [opacity-ch to])]
      (cond
        (= ch opacity-ch)
        (do
          (recur val c last-set))

        (not= last-received last-set)
        (do
          (om/transact! component [(list 'change-opacity {:opacity last-received})
                                   :display-params])
          (recur last-received component last-received))

        :else
        (do
          (recur last-received component last-set)))))

  (defn opacity-change
    [e component]
    (let [opacity (-> e .-target .-value (/ 100.0))]
      (go (>! opacity-ch [opacity component])))))

(defn show-data
  [component x y weather]
  (om/transact! component [(list 'show-selected-cell {:x x :y y :weather weather})
                           :selected-cell]))

(defui WeatherGrid
  static om/IQuery
  (query [this]
         [:weather-data :display-params :weather-params :selected-cell])
  Object
  (render [this]
          (let [{:keys [weather-params weather-data display-params selected-cell]} (om/props this)
                {:keys [canvas-width canvas-height opacity display map]} display-params
                {:keys [size]} weather-params
                selected-x (:x selected-cell)
                selected-y (:y selected-cell)
                [x-cells y-cells] size
                cell-width (/ canvas-width x-cells)
                cell-height (/ canvas-height y-cells)]
            (dom/svg
             #js {:id "grid"
                  :width canvas-width
                  :height canvas-height}
             (when-let [map-image (map-image map)]
               (js/React.DOM.image #js {:href map-image
                                        :width canvas-width
                                        :height canvas-height}
                                   nil))
             (for [[[x y] weather] weather-data
                   :let [{:keys [type wind temperature]} weather
                         selected? (and (= x selected-x)
                                        (= y selected-y))]]
               (dom/rect #js {:key (str "cell" x "-" y)
                              :x (* cell-width x)
                              :y (* cell-height y)
                              :width cell-width
                              :height cell-height
                              ;;:class (weather-class weather)
                              :fill (fill-color weather display opacity)
                              :onMouseEnter #(show-data this x y weather)
                              :stroke (if selected? "black" "none")
                              :strokeWidth "1px"}))
             (for [[[x y] weather] weather-data
                   vector-part (wind-vector {:x (* cell-width x)
                                             :y (* cell-height y)
                                             :key (str x "-" y)
                                             :width cell-width
                                             :height cell-height
                                             :wind (:wind weather)})]
               vector-part)
             (let [[x y width height] (first (:wind-stability-areas weather-params))]
               (when (and x y width height)
                 (for [[x1 y1 x2 y2] [[0 0 1 0]
                                      [1 0 1 1]
                                      [1 1 0 1]
                                      [0 1 0 0]]]
                   (dom/line #js {:x1 (-> x1 (* width) (+ x) (* cell-width))
                                  :y1 (-> y1 (* height) (+ y) (* cell-width))
                                  :x2 (-> x2 (* width) (+ x) (* cell-width))
                                  :y2 (-> y2 (* height) (+ y) (* cell-width))
                                  :stroke "black"
                                  :strokeWidth "2.5px"
                                  :strokeDasharray "5,5"}))))))))

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

(def display-name->key
  {"Weather Type" :type
   "Pressure" :pressure
   "Temperature" :temperature})

(def display-key->name
  (invert-map display-name->key))

(defn display-change
  [e component]
  (let [display (-> e
                    .-target
                    .-value
                    display-name->key)]
    (om/transact! component [(list 'change-display {:display display})
                             :display-params])))


(defui DisplayControls
  static om/IQuery
  (query [this]
         [:display-params])
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
                  (dom/select
                   #js {:onChange (fn [e]
                                    (om/transact! this
                                                  [(list 'change-map
                                                         {:map (-> e
                                                                   .-target
                                                                   .-value)})
                                                   :display-params]))
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
                  (dom/select #js {:onChange (fn [e]
                                               (display-change e this))}
                              (for [map (keys display-name->key)]
                                (dom/option #js {:value map} map)))))
         (dom/tr
          nil
          (dom/td nil "Opacity:")
          (dom/td nil (dom/input #js {:type "range"
                                      :min 0
                                      :max 100
                                      :value (long (* opacity 100))
                                      :onChange (fn [e]
                                                  (opacity-change e this))}))))))))))

(def display-controls
  (om/factory DisplayControls))

(defn click-next
  [e]
  ;;(om/transact! this)
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
        {:keys [size]}  weather-params
        t (get-in weather-params [:time :current])
        [x-cells y-cells] size
        blob (fmap/get-blob weather-data
                            x-cells
                            y-cells)]
    (save-data blob (gstring/format "%d%02d%02d.fmap"
                                    (:day t)
                                    (:hour t)
                                    (:minute t)))))

(defn click-save-settings
  [e]
  (save-data (js/Blob. #js[(-> @app-state
                               (select-keys [:weather-params :movement-params :display-params :revision])
                               pr-str)]
                       #js{:type "text/plain"})
             "weathergen-settings.edn"))

(defn click-load-settings
  [c e]
  (when-let [file (aget (.. e -target -files) 0)]
    (let [reader (js/FileReader.)]
      (-> reader
          .-onload
          (set! #(let [data (-> %
                                .-target
                                .-result
                                reader/read-string)]
                   (om/transact! c [(list 'load-settings {:data data})
                                    :weather-params
                                    :weather-data
                                    :movement-params
                                    :display-params]))))
      (.readAsText reader file))))

(defn submit [c props selector acceptor e]
  (let [edit-text (om/get-state c (conj selector :edit-text))]
    (when (and edit-text
               (not= edit-text (get-in props selector)))
      (acceptor selector edit-text)
      (om/update-state! c assoc-in (conj selector :edit-text) nil)
      (doto e (.preventDefault) (.stopPropagation)))))

(def ESCAPE_KEY 27)
(def ENTER_KEY 13)

(defn key-down [c props selector acceptor e]
  (condp == (.-keyCode e)
    ESCAPE_KEY
    (do
      (om/update-state! c assoc-in (conj selector :edit-text) nil)
      (doto e (.preventDefault) (.stopPropagation)))
    ENTER_KEY
    (submit c props selector acceptor e)
    nil))

(defn change [c selector e]
  (om/update-state! c assoc-in
                    (conj selector :edit-text) (.. e -target -value)))

(defn accept
  [c selector edit-text]
  (om/transact! c
                [(list 'change-text-field
                       {:selector selector
                        :value (js/Number edit-text)})
                 :weather-data]))

(defn edit-field [c props selector]
  (let [acceptor (fn [selector edit-text]
                   (accept c selector edit-text))]
    ;; (println "edit-field" :weather-params (:weather-params props) :selector selector)
    (dom/input
     #js { ;;:ref       "editField"
          :className "edit"
          :value     (or (om/get-state c (conj selector :edit-text))
                         (str (get-in props selector)))
          :onBlur    #(submit c props selector acceptor %)
          :onChange  #(change c selector %)
          :onKeyDown #(key-down c props selector acceptor %)})))

(defn two-column
  [left right]
  (dom/div
   #js {:className "two-column"}
   (dom/div
    #js {:className "left-column"}
    left)
   (dom/div
    #js {:className "right-column"}
    right)))

(def type-name->key
  {"Sunny" :sunny
   "Fair" :fair
   "Poor" :poor
   "Inclement" :inclement})

(def type-key->name
  (invert-map type-name->key))

(defn weather-type-configuration
  [c props]
  (dom/fieldset
   nil
   (dom/legend nil "Weather type configuration")
   (dom/table
    #js {:id "category-params"}
    (dom/thead
     nil
     (dom/tr
      nil
      (dom/td nil "")
      (dom/td nil "")
      (dom/td #js {:colSpan 3} "Wind")
      (dom/td #js {:colSpan 3} "Temperature")))
    (dom/thead
     nil
     (dom/tr
      nil
      (dom/td nil "")
      (dom/td nil "Weight")
      (dom/td nil "Min")
      (dom/td nil "Mean")
      (dom/td nil "Max")
      (dom/td nil "Min")
      (dom/td nil "Mean")
      (dom/td nil "Max")))
    (dom/tbody
     nil
     (for [category [:sunny :fair :poor :inclement]]
       (dom/tr
        nil
        (dom/td nil (type-key->name category))
        (dom/td
         nil
         (dom/div
          #js {:className "edit-field"}
          (edit-field c props [:weather-params :categories category :weight])))
        (for [param [:wind :temp]
              metric [:min :mean :max]]
          (dom/td
           #js {:className (str (name param) " " (name metric))}
           (dom/div
            #js {:className "edit-field"}
            (edit-field c props [:weather-params :categories category param metric]))))))))))

(defn weather-parameters
  [c props]
  (dom/fieldset
   nil
   (dom/legend nil "Weather parameters")
   (dom/table
    #js {:id "general-params"}
    (dom/tbody
     nil
     (for [[label selector transform index]
           [["Seed"                [:weather-params :seed] str]
            ["Crossfade"           [:weather-params :crossfade] str]
            ["Weather heading"     [:weather-params :direction :heading] str]
            ["Weather speed"       [:weather-params :direction :speed] str]
            ["Evolution (min)"     [:weather-params :time :evolution] str]
            ["Zoom"                [:weather-params :feature-size] str]
            ["Max pressure"        [:weather-params :pressure :max] str]
            ["Min pressure"        [:weather-params :pressure :min] str]
            ["Prevailing wind"     [:weather-params :prevailing-wind :heading] str]
            ["Wind uniformity"     [:weather-params :wind-uniformity] str]
            ["Temp uniformity"     [:weather-params :temp-uniformity] str]
            ["Turbulence power"    [:weather-params :turbulence :power] str]
            ["Turbulence size"     [:weather-params :turbulence :size] str]]]
       (row [label (edit-field c props selector)]))))))

(defn wind-stability-parameters
  [c props]
  (dom/fieldset
   nil
   (dom/legend nil "Wind stability region")
   (dom/table
    #js {:id "wind-stability-params"}
    (dom/tbody
     nil
     (row ["NW corner"
           (edit-field c props [:weather-params :wind-stability-areas 0 0])
           (edit-field c props [:weather-params :wind-stability-areas 0 1])])
     (row ["Width/height"
           (edit-field c props [:weather-params :wind-stability-areas 0 2])
           (edit-field c props [:weather-params :wind-stability-areas 0 3])])))
   (dom/button #js {:onClick #(om/transact! c '[(clear-wind-stability-area {:index 0})
                                                :weather-data])}
               "Clear")))

(defn time-entry
  [c props path]
  (dom/table
   #js {:className "time-params"}
   (dom/thead
    nil
    (dom/tr
     nil
     (dom/td #js {:className "time-entry-label"} "Day")
     (dom/td #js {:className "time-entry-label"} "Hour")
     (dom/td #js {:className "time-entry-label"} "Minute")))
   (dom/tbody
    nil
    (dom/tr
     nil
     (dom/td
      nil
      (edit-field c props (conj path :day)))
     (dom/td
      nil
      (edit-field c props (conj path :hour)))
     (dom/td
      nil
      (edit-field c props (conj path :minute)))))))

(defn step-controls
  [c props]
  (dom/fieldset
   #js {:id "time-location-params"}
   (dom/legend nil "Time/location controls")
   (dom/table
    nil
    (dom/tbody
     nil
     (row ["X Offset" (edit-field c props [:weather-params :origin 0])])
     (row ["Y Offset" (edit-field c props [:weather-params :origin 1])])
     (row ["T Offset" (edit-field c props [:weather-params :time :offset])])
     (row ["Start Time"
           (time-entry c props [:weather-params :time :start])])
     (row ["Current Time"
           (time-entry c props [:weather-params :time :current])])
     (row ["Step interval"
           (edit-field c props [:movement-params :step])])))
   (dom/button #js {:title "Step back in time"
                    :onClick (fn [e]
                               (om/transact! c '[(prev)
                                                 :weather-data
                                                 :weather-params
                                                 :movement-params]))}
               "<< Step Back")
   (dom/button #js {:title "Step forward in time"
                    :onClick (fn [e]
                               (om/transact! c '[(next)
                                                 :weather-data
                                                 :weather-params
                                                 :movement-params]))}
               "Step Forward >>")))

(defui WeatherControls
  static om/IQuery
  (query [this]
         [:weather-params :movement-params])
  Object
  (render
   [this]
   (let [{:keys [weather-params] :as props} (om/props this)]
     (dom/div
      nil
      (two-column
       (dom/div
        nil
        (weather-parameters this props)
        (wind-stability-parameters this props))
       (dom/div
        nil
        (weather-type-configuration this props)
        (step-controls this props)))))))

(def weather-controls
  (om/factory WeatherControls))

(defui SerializationControls
  static om/IQuery
  (query [this]
         [:weather-params :weather-data :movement-params])
  Object
  (render
   [this]
   (let [step-on-save? (get-in (om/props this) [:movement-params :step-on-save?])]
     (dom/fieldset
      #js {:id "load-save-controls"}
      (dom/legend nil "Load/save")
      (dom/div
       nil
       (dom/button #js {:onClick (fn [e]
                                   (click-save e)
                                   (println "click save" :step-on-save? step-on-save?)
                                   (om/transact! this '[(next)
                                                        :weather-data
                                                        :weather-params
                                                        :movement-params])
                                   ;; Not sure why this doesn't work
                                   #_(when step-on-save?
                                       (om/transact! this '[(next)
                                                            :weather-data
                                                            :weather-params
                                                            :movement-params])))}
                   "Save Current as Single FMAP")
       "(Steps forward in time)"
       (println "Rendering serialization controls" :step-on-save? step-on-save?)
       #_(dom/input #js {:type "checkbox"
                       :checked step-on-save?
                       :onClick (fn [e]
                                  (om/transact!
                                   this
                                   [(list 'toggle-step-on-save)]))})
       #_"Step forward after saving")
      (dom/div
       nil
       (dom/button #js {:onClick click-save-settings} "Save Settings"))
      (dom/div
       nil
       "Load Settings: "
       (dom/input #js {:type "file"
                       :onChange #(click-load-settings this %)}))))))

(def serialization-controls
  (om/factory SerializationControls))

(defui SelectedCellInfo
  static om/IQuery
  (query [this]
         [:selected-cell])
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
               ["Weather Type" [:weather :type] type-key->name]
               ["Pressure" [:weather :pressure] #(gstring/format "%.2f"
                                                                 (math/nearest % 0.01))]
               ["Temperature" [:weather :temperature] #(int (math/nearest % 1))]
               ["Wind Speed" [:weather :wind :speed] #(int (math/nearest % 1))]
               ["Wind Heading" [:weather :wind :heading] #(int (math/nearest % 1))]]]
          (dom/tr nil
                  (dom/td nil label)
                  (dom/td nil (transform (get-in selected-cell selector)))))))))))

(def selected-cell-info
  (om/factory SelectedCellInfo))

(defui DebugInfo
  static om/IQuery
  (query [this]
         [:weather-params :display-params :selected-cell])
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
  static om/IQuery
  (query [this]
         (vec (keys @app-state)))
  Object
  (render [this]
          (dom/div
           nil
           (dom/div #js {:id "title"}
                    "WeatherGen")
           (dom/div #js {:className "two-column"}
                    (dom/div #js {:className "left-column"}
                             (weather-grid (assoc @app-state :react-key :weather-grid)))
                    (dom/div #js {:className "right-column"}
                             (display-controls (assoc @app-state :react-key :display-controls))
                             (weather-controls (assoc @app-state :react-key :play-controls))
                             (serialization-controls)
                             (selected-cell-info (assoc @app-state :react-key :selected-cell-info))))
           (debug-info @app-state))))

(defn read [{:keys [state] :as env} key params]
  (let [st @state]
    (if-let [[_ value] (find st key)]
      {:value value}
      {:value :not-found})))

(defmulti mutation (fn [state key params] key))

(defn move
  "Move pos in the indicated direction by delta-t minutes"
  [pos direction delta-t]
  (let [{:keys [speed heading]} direction]
    (math/vector-add
     pos
     (-> (math/rotate (- heading) [0 1])
         (math/scale (-> speed
                         (* delta-t)
                         (/ 60 9)))))))

(defmethod mutation 'prev
  [state key params]
  (println "Mutate prev" :key key :params params)
  {:value {:keys [:weather-params :weather-data :display-params]}
   :action (fn []
             (println "Performing prev mutation")
             (let [state (swap! state
                                #(update
                                  %
                                  :weather-params
                                  model/step
                                  (:movement-params %)
                                  -1))]
               (update-weather!)
               (println "Update worked")
               state))})

(defmethod mutation 'next
  [state key params]
  (println "Mutate next" :key key :params params)
  {:value {:keys [:weather-params :weather-data :movement-params]}
   :action (fn []
             (println "Performing next mutation")
             (try
               (let [state (swap! state
                                  #(update
                                    %
                                    :weather-params
                                    model/step
                                    (:movement-params %)
                                    1))]
                 (update-weather!)
                 (println "Update worked";; :weather-params (:weather-params @state)
                          )
                 state)
               (catch :default e
                 (println e))))})

(defmethod mutation 'change-map
  [state key {:keys [map] :as params}]
  {:value {:keys [:display-params]}
   :action #(swap! state
                   assoc-in
                   [:display-params :map]
                   (map-name->key map))})

(defmethod mutation 'show-selected-cell
  [state key {:keys [x y weather] :as params}]
  ;;(println "show-selected-cell mutation" :x x :y y :weather weather)
  {:value {:keys [:selected-cell]}
   :action (fn []
             (swap! state
                    #(-> %
                         (assoc-in [:selected-cell :x] x)
                         (assoc-in [:selected-cell :y] y)
                         (assoc-in [:selected-cell :weather] weather))))})

(defmethod mutation 'change-opacity
  [state key {:keys [opacity] :as params}]
  {:value {:keys [:display-params]}
   :action #(swap! state assoc-in [:display-params :opacity] opacity)})

(defmethod mutation 'change-display
  [state key {:keys [display] :as params}]
  {:value {:keys [:display-params]}
   :action #(swap! state
                   assoc-in
                   [:display-params :display]
                   display)})

(defmethod mutation 'change-text-field
  [state key {:keys [value selector] :as params}]
  {:value {:keys [(first selector) :weather-data]}
   :action (fn [] (swap! state
                         assoc-in
                         selector
                         value)
             (when (= :weather-params (first selector))
               (update-weather!)))})

(defmethod mutation 'update-params-and-weather
  [state key {:keys [weather-params weather-data] :as params}]
  {:value {:keys [:weather-params :weather-data]}
   :action (fn [] (swap! state
                         assoc
                         :weather-params weather-params
                         :weather-data weather-data))})

(defn merge-loaded
  "Take a loaded settings file and merge it with the current app
  state, resolving any conflicts if possible."
  [current loaded]
  ;; TODO: This is a pretty crappy resolution algorithm, but it works
  ;; okay for now.
  {:revision (:revision current)
   :weather-params (merge (:weather-params current) (:weather-params loaded))
   :display-params (merge (:display-params current) (:display-params loaded))
   :movement-params (merge (:movement-params current) (:movement-params loaded))
   :selected-cell {}})

(defmethod mutation 'load-settings
  [state key {:keys [data] :as params}]
  {:value {:keys [:weather-params :weather-data :display-params :selected-cell]}
   :action (fn []
             (swap! state
                    merge-loaded
                    data)
             (update-weather!))})

(defmethod mutation 'clear-wind-stability-area
  [state key {:keys [index] :as params}]
  {:value {:keys [:weather-data]}
   :action (fn []
             (swap! state
                    assoc-in
                    [:weather-params :wind-stability-areas]
                    [[nil nil nil nil]])
             (update-weather!))})

(defmethod mutation 'toggle-step-on-save
  [state key params]
  {:value {:keys [:movement-params]}
   :action (fn []
             (swap! state
                    update-in
                    [:movement-params :step-on-save?]
                    not))})

(defn mutate [{:keys [state] :as env} key params]
  ;;(println "Mutating" :key key :params params)
  (mutation state key params))

(def reconciler
  (om/reconciler {:state app-state
                  :parser (om/parser {:read read
                                      :mutate mutate})}))

(om/add-root! reconciler
              WeatherGen
              (gdom/getElement "app"))

;; (if (undefined? (.-document js/self))
;;   (comment (worker/main))
;;   (ui/main "js/compiled/weathergen.js"))

;; (ui/main nil)
