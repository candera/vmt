(ns weathergen.ui
  (:require [weathergen.model :as model]
            [weathergen.fmap :as fmap]
            [weathergen.math :as math]
            [weathergen.render :as render]
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

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Main thread

;; (comment (defn main
;;            [worker-path]

;;            (enable-console-print!)

;;            (println "Edits to this text should show up in your developer console.")

;;            ;; define your app data so that it doesn't get over-written on reload

;;            (defn receive-weather-data
;;              [weather-data]
;;              ;;(om/transact! nil )
;;              )

;;            (def computer
;;              (butler/butler worker-path
;;                             {:weather-data receive-weather-data}))

;;            (defn generate-weather
;;              [params]
;;              (butler/work! computer :generate-weather params))

;;            (defonce app-state
;;              (atom {:weather-params {:origin-x 0
;;                                      :origin-y 0
;;                                      :t 0.01
;;                                      :x-cells 59
;;                                      :y-cells 59
;;                                      :feature-size 0.2}
;;                     :weather-data nil
;;                     :display-params {:canvas-width 800
;;                                      :canvas-height 800
;;                                      :opacity 0.5
;;                                      :display :weather
;;                                      :map :korea}}))

;;            #_(defn transact-and-notify
;;                []
;;                (om/transact! change-the-weather-params)
;;                (go (>! param-ch new-params)))

;;            ;; (def weather-update-channel (async/chan))

;;            ;; (go-loop []
;;            ;;   (<! weather-update-channel))

;;            ;; (defn update-weather-data
;;            ;;   [])

;;            ;; (defn watch-params
;;            ;;   [k r o n]
;;            ;;   (when (not= (:weather-params o) (:weather-params n))
;;            ;;     (update-weather-data)))

;;            ;; (add-watch app-state :update-weather-data watch-params)

;;            (defn on-js-reload []
;;              ;; optionally touch your app-state to force rerendering depending on
;;              ;; your application
;;              ;; (swap! app-state update-in [:__figwheel_counter] inc)
;;              )

;;            (defn current-weather
;;              [{:keys [origin-x origin-y feature-size t] :as state} x y]
;;              #_(model/weather (/ (+ x origin-x) feature-size)
;;                               (/ (+ y origin-y) feature-size)
;;                               t))

;;            (defn click-prev
;;              [e]
;;              (swap! app-state (fn [state] (-> state
;;                                               (update :origin-x dec)
;;                                               (update :origin-y dec)
;;                                               (update :t #(- % 0.05))))))

;;            (defn click-next
;;              [e]
;;              (swap! app-state (fn [state] (-> state
;;                                               (update :origin-x inc)
;;                                               (update :origin-y inc)
;;                                               (update :t #(+ % 0.05))))))

;;            (defn save-data
;;              [blob filename]
;;              (let [a (gdom/createElement "a")
;;                    _ (-> (gdom/getDocument) .-body (gdom/appendChild a))
;;                    _ (gstyle/showElement a false)
;;                    url (-> js/window .-URL (.createObjectURL blob))]
;;                (-> a .-href (set! url))
;;                (-> a .-download (set! filename))
;;                (.click a)
;;                (-> js/window .-URL (.revokeObjectURL url))))

;;            (defn click-save
;;              [e]
;;              (let [{:keys [x-cells y-cells] :as state} @app-state
;;                    blob (fmap/get-blob (fn [x y] (current-weather state x y))
;;                                        (range x-cells)
;;                                        (range y-cells))]
;;                (save-data blob "generated.fmap")))

;;            (defn map-change
;;              [e]
;;              (let [map (-> e
;;                            .-target
;;                            .-value
;;                            {"Israel" :israel
;;                             "Balkans" :balkans
;;                             "Korea" :korea})]
;;                ;; (println "New map" map (-> e .-target .-value))
;;                (swap! app-state
;;                       assoc
;;                       :map
;;                       map)))

;;            (defn display-change
;;              [e]
;;              (let [map (-> e
;;                            .-target
;;                            .-value
;;                            {"Weather" :weather
;;                             "Pressure" :pressure
;;                             "Temperature" :temperature})]
;;                (swap! app-state
;;                       assoc
;;                       :display
;;                       map)))


;;            (let [opacity-ch (async/chan (async/dropping-buffer 1))]

;;              (go-loop [last-received nil
;;                        last-set nil]
;;                (let [to (async/timeout 100)
;;                      [val ch] (async/alts! [opacity-ch to])]
;;                  (cond
;;                    (= ch opacity-ch)
;;                    (do
;;                      (recur val last-set))

;;                    (not= last-received last-set)
;;                    (do
;;                      (swap! app-state assoc :opacity last-received)
;;                      (recur last-received last-received))

;;                    :else
;;                    (do
;;                      (recur last-received last-set)))))

;;              (defn opacity-change
;;                [e]
;;                (let [opacity (-> e .-target .-value (/ 100.0))]
;;                  (go (>! opacity-ch opacity)))))

;;            (defn wind-vector
;;              [{:keys [x y width height wind key]}]
;;              (let [{:keys [speed heading]} wind
;;                    transform (str "translate(" (+ x (/ width 2)) " " (+ y (/ height 2)) ")"
;;                                   " "
;;                                   "rotate(" heading ")")
;;                    tails (math/clamp 1 3 (long (/ speed 10)))
;;                    total-length 0.8
;;                    stroke "black"
;;                    stroke-width "0.7px"]
;;                (into [(dom/line #js {:x1 0
;;                                      :y1 (* height 0.40)
;;                                      :x2 0
;;                                      :y2 (* height -0.40)
;;                                      :stroke stroke
;;                                      :strokeWidth stroke-width
;;                                      :transform transform
;;                                      :key (str "line-" key)})]
;;                      (for [n (range tails)]
;;                        (dom/line #js {:key (str "line-" n "-" key)
;;                                       :x1 0
;;                                       :y1 (* height (+ -0.40 (* 0.15 n)))
;;                                       :x2 (* width (* 0.25 (Math/pow 0.9 n)))
;;                                       :y2 (* height (+ -0.50 (* 0.15 n)))
;;                                       :stroke stroke
;;                                       :strokeWidth stroke-width
;;                                       :transform transform})))))

;;            (def weather-color
;;              {:sunny [0 128 255 0]
;;               :fair [0 255 0 1]
;;               :poor [255 255 0 1]
;;               :inclement [192 0 0 1]
;;               nil [255 0 0 1]})

;;            (def pressure-map
;;              {28.5   [192 0 0 1]
;;               28.75   [192 0 0 1]
;;               29.0   [255 255 0 1]
;;               29.425 [0 255 0 1]
;;               29.7   [0 128 255 1]
;;               30.0   [255 255 255 1]
;;               31.0   [255 255 255 1]})

;;            (defn gradient-color
;;              [color-map val]
;;              (let [[[low l] [high h]] (->> color-map
;;                                            (into (sorted-map))
;;                                            (partition 2 1)
;;                                            (filter (fn [[[low l] [high h]]]
;;                                                      (<= low val high)))
;;                                            first)]
;;                (math/vector-interpolate l h val low high)))

;;            (defn pressure-color
;;              [pressure]
;;              (let [[r g b a] (gradient-color pressure-map pressure)]
;;                [(long r) (long g) (long b) a]))

;;            (defn fill-color
;;              [w display alpha]
;;              (let [[r g b a]
;;                    (case display
;;                      :weather (-> w :category weather-color)
;;                      :pressure (-> w
;;                                    :pressure
;;                                    pressure-color)
;;                      :temperature (-> w :category weather-color))]
;;                (gstring/format "rgba(%s,%s,%s,%s)" r g b (* a alpha))))

;;            (def map-image
;;              {:korea "images/kto.jpg"
;;               :balkans "images/balkans.png"
;;               :israel "images/ito.jpg"})

;;            (defn show-data
;;              [_ x y weather]
;;              (println x y weather))

;;            (defn read [{:keys [state] :as env} key params]
;;              (let [st @state]
;;                (if-let [[_ value] (find st key)]
;;                  {:value value}
;;                  {:value ::not-found})))

;;            (defn mutate [{:keys [state] :as env} key params]
;;              (if (= 'increment key)
;;                {:value {:keys [:count]}
;;                 :action #(swap! state update-in [:count] inc)}
;;                {:value :not-found}))

;;            ;; (defui WeatherGrid
;;            ;;   static om/IQuery
;;            ;;   (query [this]
;;            ;;          [:weather-data :display-params :weather-params])
;;            ;;   Object
;;            ;;   (render [this]
;;            ;;           (let [{:keys [weather-params weather-data display-params]} (om/props this)
;;            ;;                 {:keys [canvas-width canvas-height opacity display map]} display-params
;;            ;;                 {:keys [x-cells y-cells]} weather-params
;;            ;;                 cell-width (/ canvas-width x-cells)
;;            ;;                 cell-height (/ canvas-height y-cells)]
;;            ;;             (dom/svg
;;            ;;              #js {:width canvas-width
;;            ;;                   :height canvas-height}
;;            ;;              (when-let [map-image (map-image map)]
;;            ;;                (js/React.DOM.image #js {:href map-image
;;            ;;                                         :width canvas-width
;;            ;;                                         :height canvas-height}
;;            ;;                                    nil))
;;            ;;              (for [[[x y] weather] weather-data]
;;            ;;                (dom/rect #js {:key (str "cell" x "-" y)
;;            ;;                               :x (* cell-width x)
;;            ;;                               :y (* cell-height y)
;;            ;;                               :width cell-width
;;            ;;                               :height cell-height
;;            ;;                               :fill (fill-color weather display opacity)
;;            ;;                               :onMouseOver #(show-data % x y weather)
;;            ;;                               ;; :stroke "black"
;;            ;;                               ;; :strokeWidth "0.3px"
;;            ;;                               }))
;;            ;;              (for [[[x y] weather] weather-data
;;            ;;                    vector-part (wind-vector {:x (* cell-width x)
;;            ;;                                              :y (* cell-height y)
;;            ;;                                              :key (str x "-" y)
;;            ;;                                              :width cell-width
;;            ;;                                              :height cell-height
;;            ;;                                              :wind (:wind weather)})]
;;            ;;                vector-part)))))

;;            ;; (def weather-grid (om/factory WeatherGrid {}))

;;            ;; (defui WeatherGen
;;            ;;   ;; (query [this] "Data about what subset of the state we care about")
;;            ;;   Object
;;            ;;   (render [this]
;;            ;;           ;; Use om/props instead to get what comes back from the read
;;            ;;           ;; function when called against the keys form query
;;            ;;           (let [{:keys [x-cells y-cells canvas-width canvas-height map opacity display] :as state} @app-state]
;;            ;;             ;; TODO: Add map component
;;            ;;             (weather-grid)
;;            ;;             (dom/div
;;            ;;              nil

;;            ;;              (dom/div
;;            ;;               #js {:id "controls"}
;;            ;;               (dom/table
;;            ;;                nil
;;            ;;                (dom/tbody
;;            ;;                 nil
;;            ;;                 (dom/tr
;;            ;;                  nil
;;            ;;                  (dom/td nil "Map:")
;;            ;;                  (dom/td nil
;;            ;;                          (dom/select #js {:onChange map-change}
;;            ;;                                      (for [map ["Korea" "Balkans" "Israel" "None"]]
;;            ;;                                        (dom/option #js {:value map} map)))))
;;            ;;                 (dom/tr
;;            ;;                  nil
;;            ;;                  (dom/td nil "Display:")
;;            ;;                  (dom/td nil
;;            ;;                          (dom/select #js {:onChange display-change}
;;            ;;                                      (for [map ["Weather" "Temperature" "Pressure"]]
;;            ;;                                        (dom/option #js {:value map} map)))))
;;            ;;                 (dom/tr
;;            ;;                  nil
;;            ;;                  (dom/td nil "Opacity:")
;;            ;;                  (dom/td nil (dom/input #js {:type "range"
;;            ;;                                              :min 0
;;            ;;                                              :max 100
;;            ;;                                              :value (long (* opacity 100))
;;            ;;                                              :onChange opacity-change}))))))
;;            ;;              (dom/button #js {:onClick click-prev} "<")
;;            ;;              (dom/button #js {:onClick click-save} "Save")
;;            ;;              (dom/button #js {:onClick click-next} ">")
;;            ;;              (dom/div
;;            ;;               #js {:id "debug"}
;;            ;;               (dom/table
;;            ;;                nil
;;            ;;                (dom/tbody
;;            ;;                 nil
;;            ;;                 (for [[k v] state]
;;            ;;                   (dom/tr nil
;;            ;;                           (dom/td nil (str k))
;;            ;;                           (dom/td nil (str v)))))))))))

;;            (defui WeatherGen
;;              Object
;;              (render [this]
;;                      (dom/div nil "Basic app")))

;;            ;; (def reconciler
;;            ;;   (om/reconciler {:state app-state
;;            ;;                   :parser (om/parser {:read read
;;            ;;                                       :mutate mutate})}))

;;            ;; (om/add-root! reconciler
;;            ;;               WeatherGen
;;            ;;               (gdom/getElement "app")
;;            ;;               ;;(.getElementById js/document "app")
;;            ;;               )

;;            ))


;; (defn receive-weather-data
;;   [weather-data]
;;   (println "received weather data")
;;   (swap! app-state assoc :weather-data weather-data)
;;   ;;(om/transact! nil )
;;   )

;; (def computer
;;   (butler/butler worker-path
;;                  {:weather-data receive-weather-data}))

;; (defn generate-weather
;;   [params]
;;   (butler/work! computer :generate-weather params))

;; ;;(generate-weather (:weather-params @app-state))


