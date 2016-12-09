(ns weathergen.ui
  (:require [clojure.string :as str]
            [javelin.core
             :as j
             :refer [defc defc= cell cell= dosync lens with-let]]
            [hoplon.core
             :as h
             :refer [a br button defelem div do! fieldset hr html img input
                     label legend link loop-tpl
                     option p script select span table tbody td thead title tr
                     timeout when-dom with-init! with-timeout]]
            [hoplon.svg :as svg]
            [goog.dom :as gdom]
            [goog.crypt.base64 :as base64]
            [goog.string :as gstring]
            [goog.string.format]
            [goog.style :as gstyle]
            ;;[jquery.minicolors]
            [longshi.core :as fress]
            [weathergen.canvas :as canvas]
            [weathergen.coordinates :as coords]
            [weathergen.database :as db]
            [weathergen.dtc :as dtc]
            [weathergen.encoding :refer [encode decode]]
            [weathergen.fmap :as fmap]
            [weathergen.help :as help]
            [weathergen.math :as math]
            [weathergen.model :as model]
            ;; [weathergen.route :as route]
            [cljs.core.async :as async
             :refer [<! >! alts!]]
            [cljs.reader :as reader]
            [cljsjs.pako]
            ;;[secretary.core :refer-macros [defroute]]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)])
  (:require-macros
   [cljs.core.async.macros :refer [go go-loop]]
   [weathergen.cljs.macros :refer [with-time formula-of]]))

;;; Constants

(def revision 7)

;;; Browser detection

(def agents (let [is-agent? (fn [agent]
                              (-> js/navigator
                                  .-userAgent
                                  (.indexOf agent)
                                  neg?
                                  not))
                  agent-props {:chrome  "Chrome"
                               :ie      "MSIE"
                               :firefox "Firefox"
                               :safari  "Safari"
                               :opera   "op"}]
              (zipmap (keys agent-props)
                      (map is-agent? (vals agent-props)))))

(cond
  (and (:safari agents)
       (not (:chrome agents)))
  (js/alert "WeatherGen does not work well in Safari, due to Safari's atrocious Javascript performance and some weird layout issues. Chrome and Firefox are the recommended/supported browsers.")

  (or (:firefox agents) (:chrome agents))
  (println "Chrome or Firefox detected")

  :else
  (js/alert "Browsers other than Chrome and Firefox are not currently supported by WeatherGen. Some features may not behave as expected. Use of Chrome/Firefox is recommended."))

;;; State

(def default-weather-params
  {:temp-uniformity 0.7
   :pressure        {:min 29 :max 31}
   :cell-count      [59 59]
   :feature-size    10
   :categories      {:sunny     {:wind   {:min 5 :mean 10 :max 30}
                                 :temp   {:min 20 :mean 22 :max 24}}
                     :fair      {:pressure 30
                                 :wind   {:min 0 :mean 7 :max 20}
                                 :temp   {:min 18 :mean 21 :max 23}}
                     :poor      {:pressure 29.85
                                 :wind   {:min 10 :mean 15 :max 30}
                                 :temp   {:min 15 :mean 18 :max 21}}
                     :inclement {:pressure 29.40
                                 :wind   {:min 15 :mean 25 :max 60}
                                 :temp   {:min 12 :mean 14 :max 16}}}
   :turbulence      {:size 1 :power 250}
   :origin          [1000 1000]
   :evolution       3600
   :time            {:offset 1234
                     :current {:day 1 :hour 5 :minute 0}
                     :max nil}
   :wind-uniformity 0.7
   :crossfade       0.1
   :prevailing-wind {:heading 325}
   :seed            1234
   :wind-stability-areas [#_{:bounds {:x 16
                                      :y 39
                                      :width 6
                                      :height 4}
                             :wind {:speed 5
                                    :heading 0}
                             :index 0
                             :editing? false}]
   :weather-overrides [#_{:location {:x 22
                                     :y 45}
                          :radius 10
                          :falloff 5
                          :animate? false
                          :begin {:day 1 :hour 5 :minute 0}
                          :peak {:day 1 :hour 6 :minute 0}
                          :taper {:day 1 :hour 8 :minute 0}
                          :end {:day 1 :hour 9 :minute 0}
                          :pressure 28.5
                          :strength 1
                          :show-outline? false
                          :exclude-from-forecast? false
                          :editing? false}]})

(defc weather-params nil)

(defc movement-params {:step 60
                       :direction {:heading 135 :speed 20}
                       :looping? false})

(def initial-size (let [window-width (.width (js/$ js/window))
                        window-height (.height (js/$ js/window))]
                    (max 250 (min (- window-width 600)
                                  (- window-height 140)))))

(defc display-params {:dimensions [initial-size initial-size]
                      :opacity    0.75
                      :display    :type
                      :map        :korea
                      :mouse-mode :select
                      :overlay    :wind
                      :pressure-unit :inhg
                      :flight-paths nil})

(defc selected-cell nil)

(defc hover-cell nil)

(defc prevent-recomputation? false)

;; TODO: This can go away if we introduce a single-input way to input
;; time.
(defc time-params
  "Holds the time that's in the 'jump/set to time' boxes because we
  need to retain a temporary value while people are making up their
  minds."
  {:displayed {:day 1 :hour 5 :minute 0}})

(defc weather-data nil)

(defc weather-data-params nil)

(defc computing true)

;;; Formulas

(defc= selected-cell-weather (get weather-data (:coordinates selected-cell)))

(defc= cell-count (:cell-count weather-params))

(defc= wind-stability-areas
  (->> weather-params
       :wind-stability-areas))

(defc= weather-overrides
  (:weather-overrides weather-params))

(defc= forecast (when selected-cell
                  (let [result (model/forecast
                                (:coordinates selected-cell)
                                (if-let [max-time (-> weather-params :time :max)]
                                  (model/jump-to-time weather-params
                                                      movement-params
                                                      max-time)
                                  weather-params)
                                movement-params
                                60
                                6)]
                    result)))

(defc= airbases (->> (db/airbases (:map display-params))
                     (map :name)
                     sort))

(defc= location-type
  (cond
    (-> selected-cell :location not-empty) :named
    (:coordinates selected-cell) :coordinates
    :else :none))

(defc= pressure-unit (:pressure-unit display-params))

;;; Worker

(def worker-count 4)

(def workers (let [all-cells (for [x (range 59)
                                   y (range 59)]
                               [x y])]
               (map (fn [n cells]
                      {:worker (js/Worker. "worker.js")
                       :n      n
                       :ch     (async/chan)
                       :cells  cells})
                    (range worker-count)
                    (partition-all (/ (* 59 59) worker-count) all-cells))))

(def command-ch (async/chan (async/dropping-buffer 1)))

(doseq [{:keys [worker ch]} workers]
  (-> worker
      .-onmessage
      (set! #(go (async/>! ch (->> % .-data decode))))))

(declare move)

;; TODO: Handle commands other than "compute weather"
(go-loop []
  (let [[command params] (async/<! command-ch)]
    (doseq [{:keys [cells worker]} workers]
      #_(log/debug "Weather data sent to worker")
      (.postMessage worker (encode (assoc params
                                          :cells cells))))
    (reset! computing true)
    (.time js/console "compute-weather")
    (with-time "Receive weather results"
      (loop [chs (set (map :ch workers))
             data {}]
        #_(log/debug "Weather data received.")
        (if (empty? chs)
          (do
            (dosync
               (.timeEnd js/console "compute-weather")
               (reset! weather-data data)
               (reset! weather-data-params params))
            (when (:looping? @movement-params)
              (async/<! (async/timeout 500))
              (if (= (-> @weather-data-params :time :current)
                     (-> @weather-data-params :time :max))
                (move (->> @movement-params :step (/ (* -60 6)) Math/floor))
                (move 1))))
          (let [[val port] (async/alts! (vec chs))]
            (recur (disj chs port)
                   (merge data val))))))
    (reset! computing false)
    (recur)))

(defn recompute
  [params]
  (go
    (async/>! command-ch [:compute-weather params])))

(formula-of
 [weather-params prevent-recomputation?]
 (when (and (not prevent-recomputation?) weather-params)
   (recompute weather-params)))

;;; Mutations

;; TODO: Put more of these here

(defn move
  "Advances the weather by `steps` steps, unless that would move past
  the max time."
  [steps]
  (dosync
   (let [minutes        (* steps (:step @movement-params))
         current-time   (-> @weather-params :time :current model/falcon-time->minutes)
         desired-time   (+ current-time minutes)
         new-time       (if-let [max-time (-> @weather-params :time :max)]
                          (min (model/falcon-time->minutes max-time)
                               desired-time)
                          desired-time)
         actual-steps   (/ (- new-time current-time)
                           (:step @movement-params))
         {:keys [time]} (swap! weather-params
                               model/step
                               @movement-params
                               actual-steps)]
     (swap! time-params
            assoc
            :displayed
            (:current time)))))

(defn jump-to-time*
  [t]
  (dosync
   (let [{:keys [time]} (swap! weather-params
                               model/jump-to-time
                               @movement-params
                               t)]
     (swap! time-params
            assoc
            :displayed
            (:current time)))))

(defn jump-to-time
  "Adjust the time coordinate to match the displayed time."
  []
  (jump-to-time* (:displayed @time-params)))

(defn set-time
  "Adjust the time coordinate so that the current time is adjusted to
  match the displayed time without changing the location in weather
  space."
  []
  (swap! weather-params
         model/set-time
         (:displayed @time-params)))

(defn change-location
  [airbase]
  (if (empty? airbase)
    (reset! selected-cell nil)
    (reset! selected-cell {:location airbase
                           :coordinates (coords/airbase-coordinates
                                         @cell-count
                                         (:map @display-params)
                                         airbase)})))

(defn change-theater
  [theater]
  (dosync
   (swap! selected-cell
          #(if (= :named @location-type)
             nil
             %))
   (swap! display-params assoc :map theater)))

;;; Serialization

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

(defn save-fmap
  [weather-params weather-data]
  (let [t (get-in weather-params [:time :current])
        [x-cells y-cells] (:cell-count weather-params)
        ;; Since processing is async, it's possible the weather data
        ;; can be out of sync with respect to the weather parameters.
        ;; In that case, we compute synchronously.
        data (if (= weather-params weather-data-params)
               weather-data
               (model/weather-grid (assoc weather-params
                                          :cells (for [x (range x-cells)
                                                       y (range y-cells)]
                                                   [x y]))))
        blob (fmap/get-blob data
                            x-cells
                            y-cells)]
    (save-data blob (gstring/format "%d%02d%02d.fmap"
                                    (:day t)
                                    (:hour t)
                                    (:minute t)))))

(defn save-settings
  [_]
  (save-data (js/Blob. #js[(pr-str {:weather-params @weather-params
                                    :movement-params @movement-params
                                    :display-params @display-params
                                    :revision revision})]
                       #js{:type "text/plain"})
             "weathergen-settings.edn"))

(defn load-text-file
  [cb]
  (let [i (gdom/createElement "input")
        ch (async/chan)]
    (-> i .-type (set! "file"))
    (-> (gdom/getDocument) .-body (gdom/appendChild i))
    (gstyle/showElement i false)
    (-> i .-onchange (set! (fn [e]
                             (async/put! ch e)
                             (async/close! ch))))
    (.click i)
    (go
      (let [e (<! ch)]
        (when-let [file (aget (.. e -target -files) 0)]
          (let [reader (js/FileReader.)]
            (-> reader
                .-onload
                (set! #(let [data (-> %
                                      .-target
                                      .-result)]
                         (cb data (.-name file)))))
            (.readAsText reader file)))))))

(defn load-settings
  [_]
  (load-text-file
   (fn [contents name]
     (let [data (-> contents
                    reader/read-string
                    (model/upgrade revision))]
       (dosync
        (let [{:keys [time]} (reset! weather-params (:weather-params data))]
          (reset! display-params (:display-params data))
          (reset! movement-params (:movement-params data))
          (swap! time-params assoc :displayed (:current time))))))))

(defn load-dtc
  [_]
  (load-text-file
   (fn [contents name]
     (log/debug "load-dtc" :name name)
     (let [flight-path (-> contents dtc/parse dtc/flight-path)]
       (swap! display-params
              update
              :flight-paths
              (fn [flight-paths]
                (conj (vec flight-paths)
                      {:label {:editing? false
                               :value (if (str/ends-with? name ".ini")
                                        (subs name 0 (- (count name) 4))
                                        name)}
                       :show? true
                       :show-labels? true
                       :uniquifier (rand-int 1000000)
                       :color "#FFFFFF"
                       :path flight-path})))))))

;;; Help

(let [help-states (cell {})]
  (defelem help [{:keys []} contents]
    (let [id (str (gensym))
          content-id (str "content-" id)
          img-id (str "img-" id)]
      (div
       :class "help"
       (div
        :id content-id
        :fade-toggle (cell= (get help-states id))
        :class "content"
        :click #(swap! help-states assoc id false)
        contents)
       (div
        :id img-id
        :class "img"
        :click #(swap! help-states
                       (fn [hs]
                         (merge (zipmap (keys hs) (repeat false))
                                {id (not (get hs id))})))
        ;; TODO; Don't make the help go away if the place the mouse
        ;; has gone is the help content.
        ;; :mouseout (fn []
        ;;             (go (<! (async/timeout 1000))
        ;;                 (swap! help-states assoc id false)))
        "?")))))

(defn with-help
  [help-path & contents]
  (let [open? (cell false)
	doc-click (fn click-fn [e]
                    (.removeEventListener js/document "click" click-fn)
                    (reset! open? false))]
    (div
     :class "help"
     :css {:cursor "url(images/helpcursor.png) 4 4, auto"
           :border-bottom "dashed 1px blue"}
     :click (fn [e]
              (swap! open? not)
              (with-timeout 0
                (.addEventListener js/document "click" doc-click)))
     (div
      :fade-toggle open?
      :class "content"
      :click (fn [e]
               (reset! open? false)
               (.removeEventListener js/document "click" doc-click)
               false)
      (get-in help/content help-path))
     contents)))

(defn help-for
  [help-path]
  (help (or (get-in help/content help-path)
            (p "Help content has not yet been written for this feature."))))


;;; Utility

(defn remove-nth
  [coll n]
  (vec (concat (take n coll) (drop (inc n) coll))))

(defn invert-map
  [m]
  (zipmap (vals m) (keys m)))

(def map-name->key
  {"Israel" :israel
   "Balkans" :balkans
   "Korea" :korea
   "Kuriles" :kuriles})

(def map-key->name
  (invert-map map-name->key))

(def map-image
  {:korea "images/kto.jpg"
   :balkans "images/balkans.png"
   :israel "images/ito.jpg"
   :kuriles "images/kuriles.png"})

(defn map-image-id
  [map]
  (str "map-image-" (name map)))

(def display-name->key
  {"Weather Type" :type
   "Pressure" :pressure
   "Temperature" :temperature})

(def display-key->name
  (invert-map display-name->key))

(def overlay-name->key
  {"Wind" :wind
   "Pressure" :pressure
   "Temperature" :temperature
   "Weather Type" :type})

(def overlay-key->name
  (invert-map overlay-name->key))

(def type-name->key
  {"Sunny" :sunny
   "Fair" :fair
   "Poor" :poor
   "Inclement" :inclement})

(def type-key->name
  (invert-map type-name->key))

(def pressure-unit-name->key
  {"InHg"     :inhg
   "Millibar" :mbar})

(def pressure-unit-key->name
  (invert-map pressure-unit-name->key))

(def mbar-per-inhg 33.8637526)

(defn mbar->inhg
  [mbar]
  (/ mbar mbar-per-inhg))

(defn inhg->mbar
  [inhg]
  (* inhg mbar-per-inhg))

(defn format-pressure
  "Format a pressure in inches Mercury as appropriate for the unit."
  [inhg unit]
  (if (= :inhg unit)
    (.toFixed inhg 2)
    (-> inhg inhg->mbar (.toFixed 0))))

(defn format-time
  [{:keys [day hour minute]}]
  (gstring/format "%02d/%02d%02d"
                  day
                  hour
                  minute))

(defn grid-coords
  "Given a mouse event, determined where on the grid it occurred.
  Returns coordinates as an [x y] pair, where x and y can be
  fractional."
  [e]
  (let [px             (.-pageX e)
        py             (.-pageY e)
        offset         (-> "#grid" js/$ .offset)
        top            (.-top offset)
        left           (.-left offset)
        x              (- px left)
        y              (- py top)
        [nx ny]        (:cell-count @weather-params)
        [width height] (:dimensions @display-params)]
    [(-> x (* nx) (/ width))
     (-> y (* ny) (/ height))]))

(defn retry
  "Perform `f` asynchronously every `interval` milliseconds until it
  returns a logical true value."
  [interval f]
  (go-loop []
    (when-not (f)
      (async/<! (async/timeout interval))
      (recur))))

(defn later
  "Perform `f` asynchronously `interval` milliseconds from now."
  [interval f]
  (go
    (async/<! (async/timeout interval))
    (f)))

;;; Styles
(def colors
  {:invalid       "#c70505"
   :error-message "#c70505"
   :edit "rgba(128,128,255,0.5)"})

(def resize-handle-size 0.75)

(defn image-button-style
  [pressed?]
  {:border-style (if pressed? "inset" "outset")
   :border-radius "6px"
   :padding "2px"
   :width "16px"
   :background (if pressed? "lightgrey" "white")
   :border-width "2px"
   :vertical-align "middle"})

(defn triangle-style
  []
  {:width          0
   :height         0
   :border-left    "5px solid transparent"
   :border-right   "5px solid transparent"
   :border-top     "7px solid black"
   :display        "inline-block"
   :margin-right   "3px"
   :vertical-align "middle"})

;;; Controls

(defelem color-picker
  [attrs _]
  (with-let [i (input attrs
                      :class "minicolors"
                      :type "hidden")]
    (retry 20
           #(when (-> i js/jQuery .-minicolors)
              (-> i js/jQuery (.minicolors #js {"theme" "weathergen"}))
              true))))

;;; Page sections

(defelem control-section
  [attributes children]
  (let [visible (cell (not (:collapsed? attributes)))
        change-visibility #(swap! visible not)]
    (fieldset
     :class "controls"
     (dissoc attributes :title :collapsed? :help-for)
     (legend
      (div
       :click change-visibility
       :class (formula-of [visible]
                          {:toggle true
                           :visible visible})
       "")
      (span
       (:title attributes)))
     (div
      :class "control-visibility-container"
      :toggle visible
      :fade-toggle visible
      (div :class "control-container" children)))))

(defn forecast-section
  [{:keys [forecast-link? limit-time?]
    :as opts}]
  (control-section
   :title (with-help [:forecast] "Forecast")
   :id "forecast-section"
   (div
    :id "forecast"
    (div
     (label :for "locations"
            "Forecast for:")
     (formula-of
      [location-type
       airbases
       selected-cell]
      (let [[x y] (:coordinates selected-cell)]
       (select
        :id "locations"
        :change #(change-location @%)
        (option :selected (not= :named location-type)
                :value ""
                (case location-type
                  :coordinates (str "Cell " x "," y)
                  :named ""
                  :none "None selected"))
        (for [ab airbases]
          (option :value ab
                  :selected (= ab (:location selected-cell))
                  ab)))))
     (if-not forecast-link?
       []
       (a :href (formula-of
                 [weather-params
                  display-params
                  movement-params
                  time-params]
                 (let [deflate #(.deflate js/pako %)
                       write-buf (-> {:weather-params weather-params
                                      :display-params display-params
                                      :movement-params movement-params}
                                     ;; encode
                                     (fress/write {:handlers fress/clojure-write-handlers}))]
                   (str "forecast.html?data="
                        (-> write-buf
                            longshi.fressian.byte-stream-protocols/get-bytes
                            (.subarray 0 (longshi.fressian.byte-stream-protocols/bytes-written write-buf))
                            deflate
                            (base64/encodeByteArray true)))))
          :target "_blank"
          "Shareable Forecast"))
     (formula-of
      [pressure-unit
       forecast]
      (table
       (thead
        (tr (td "Day/Time")
            (td "Weather Type")
            (td "Pressure")
            (td "Temperature")
            (td "Wind Speed")
            (td "Wind Heading")))
       (tbody
        (if-not forecast
          (tr (td :colspan 6
                  "No location is selected. Choose a location from the list, or click on the weather map to select one."))
          (for [[time weather] forecast]
            (tr (td (format-time time))
                (td (-> weather :type type-key->name))
                (td (-> weather :pressure (format-pressure pressure-unit)))
                (td (-> weather :temperature (.toFixed 1)))
                (td (-> weather :wind :speed (.toFixed 0)))
                (td (-> weather :wind :heading (.toFixed 0)))))))))))))

;;; Grid interaction


;;; Grid rendering

(def weather-color
  {:sunny [255 255 255 0.25]
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
  {0  [0 0 255 1]
   20 [0 255 0 1]
   40 [255 0 0 1]})

(defn temperature-color
  [temp]
  (let [[r g b a] (gradient-color temp-map temp)]
    [(long r) (long g) (long b) a]))

(def transparent
  [0 0 0 1])

(defn fill-color
  [display w]
  ;;(println "fill-color" :w w :display display :alpha alpha)
  (case display
    :type (-> w :type weather-color)
    :pressure (-> w
                  :pressure
                  pressure-color)
    :temperature (-> w
                     :temperature
                     temperature-color)
    transparent))

(defn convert-pressure
  "Return a pressure in inches Mercury given a value and a unit"
  [val unit]
  (if (= :inhg unit)
    val
    (mbar->inhg val)))

(def max-wind-vector-speed 50)

(defn wind-vector-id
  [speed]
  (str "wind-vector-" (math/clamp 5 max-wind-vector-speed (math/nearest speed 5))))

(defn update-wind-layer
  [weather-data display-params]
  (with-time "update-wind-layer"
    (doseq [[[x y] weather] weather-data
            :let [{:keys [speed heading]} (:wind weather)
                  cell (gdom/getElement (str "grid-wind-cell-" x "-" y))]]
      (.setAttribute cell
                     "transform"
                     (str "rotate(" (long heading) ")"))
      (.setAttributeNS cell
                       "http://www.w3.org/1999/xlink"
                       "href"
                       (str "#" (wind-vector-id speed))))))

(defmulti overlay-text
  (fn [weather display-params] (:overlay display-params)))

(defmethod overlay-text :default
  [_ _]
  "")

(defmethod overlay-text :pressure
  [weather display-params]
  (-> weather :pressure (format-pressure (:pressure-unit display-params))))

(defmethod overlay-text :temperature
  [weather _]
  (-> weather :temperature (.toFixed 1)))

(defmethod overlay-text :type
  [weather _]
  (-> weather :type {:sunny "S"
                     :fair "F"
                     :poor "P"
                     :inclement "I"}))

(defmethod overlay-text :coords
  [weather overlay]
  (str (:x weather) "," (:y weather)))

(defn update-text-layer
  [weather-data display-params]
  (with-time "update-text-layer"
    (doseq [[[x y] weather] weather-data
            :let [text (overlay-text weather display-params)
                  cell (gdom/getElement (str "grid-text-cell-" x "-" y))]]
      (-> cell .-innerHTML (set! text)))))

(defn update-overlay
  [weather-data display-params]
  (with-time "update-overlay"
   (condp contains? (:overlay display-params)
     #{:wind}
     (update-wind-layer weather-data display-params)

     #{:type :pressure :temperature}
     (update-text-layer weather-data display-params)
     nil)))

(defn update-primary-layer
  [weather-data display-params]
  (with-time "update-primary-layer"
    (doseq [[[x y] weather] weather-data
            :let [[r g b a] (fill-color (:display display-params) weather)
                  cell (gdom/getElement (str "grid-primary-cell-" x "-" y))]]
      (when cell
        (.setAttribute cell "fill" (str "rgba("
                                        r ","
                                        g ","
                                        b ","
                                        a ")"))))))

(defn update-grid-data
  [weather-data display-params]
  (with-time "update-grid-data"
    (do
      (update-primary-layer weather-data display-params)
      (update-overlay weather-data display-params))))

(defn update-grid
  [weather-data display-params]
  (with-time "update-grid"
    (update-grid-data weather-data display-params)))

(def wind-vector-defs
  (svg/defs
    (for [speed (range 5 (inc max-wind-vector-speed) 5)]
      (let [ticks (math/clamp 1 100 (int (/ speed 5)))
            full-tails (int (/ ticks 2))
            half-tail? (odd? ticks)
            scale 1
            offset 0.1
            tail-step 0.18
            tail-slant 0.1
            tail-width (* 0.25 1.5)]
        (svg/g
         :id (wind-vector-id speed)
         ;; TODO: Combine the vector line and the first tail into a
         ;; single stroke so we eliminate the corner artifacts.
         ;; Vector line
         (svg/line
          :attr {:class "wind-vector"}
          :x1 0
          :x2 0
          :y1 (- 0.5 tail-slant)
          :y2 (+ -0.5 tail-slant))

         ;; Full tails
         (svg/g
          :attr {:class "wind-vector full-tail"}
          (for [n (range full-tails)]
            (svg/line :x1 0
                      :y1 (+ (+ -0.5 tail-slant)
                             (* tail-step n))
                      :x2 tail-width
                      :y2 (+ -0.50 (* tail-step n)))))

         ;; Half tails
         (when half-tail?
           (svg/line
            :attr {:class "wind-vector half-tail"}
            :x1 0
            :y1 (+ (+ -0.50 tail-slant)
                   (* tail-step full-tails))
            :x2 (* tail-width 0.5)
            :y2 (+ -0.50 (+ (* tail-step full-tails)
                            (* 0.5 tail-step))))))))))

(defn info-overlay
  [hover-cell weather-data pressure-unit nx ny]
  (if-not hover-cell
    []
    (let [width 8
          height 5
          {:keys [x y]} hover-cell
          {:keys [pressure temperature wind type]} (get weather-data [x y])
          {:keys [speed heading]} wind]
      #_(log/debug :x x
                 :y y
                 :hover-cell hover-cell
                 :pressure pressure
                 :temperature temperature
                 :wind wind
                 :type type)
      [(svg/rect
        :attr {:fill "black"
               :opacity "0.5"
               :pointer-events "none"}
        :x x
        :y y
        :width 1
        :height 1)
       (svg/g
        :id "info-overlay"
        :toggle (cell= (some? hover-cell))
        :attr {:transform (gstring/format
                           "translate(%d, %d)"
                           (if (< x (- nx width))
                             (+ x 1)
                             (- x width))
                           (if (< y (- nx height))
                             (inc y)
                             (- y height)))}
        (svg/rect
         :attr {:fill         "white"
                :opacity      "0.85"
                :stroke       "black"
                :stroke-width "0.1px"}
         :x 0
         :y 0
         :width width
         :height height)
        (svg/g
         :css {:font-size "6%"}
         (for [[line label value] [[0 "Pressure" (format-pressure pressure
                                                                  pressure-unit)]
                                   [1 "Temp" (.toFixed temperature 1)]
                                   [2 "Wind" (str (.toFixed speed 0)
                                                "kts@"
                                                (gstring/format "%03d" heading))]
                                   [3 "Weather" (type-key->name type)]]]
           [(svg/text
              :x 0.2
              :y (+ line 1.2)
              (str label ":"))
            (svg/text
             :x 4
             :y (+ line 1.2)
             value)])))])))

(defn adjust-west
  "Returns a `bounds` with its west edge adjusted by `dx` units from
  `starting-bounds`."
  [bounds starting-bounds dx]
  (-> bounds
      (assoc :x
             (+ (:x starting-bounds)
                dx))
      (assoc :width
             (- (:width starting-bounds)
                dx))))

(defn adjust-east
  "Returns a `bounds` with its east edge adjusted by `dx` units from
  `starting-bounds`."
  [bounds starting-bounds dx]
  (-> bounds
      (assoc :width
             (+ (:width starting-bounds)
                dx))))

(defn adjust-north
  "Returns a `bounds` with its north edge adjusted by `dy` units from
  `starting-bounds`."
  [bounds starting-bounds dy]
  (-> bounds
      (assoc :y
             (+ (:y starting-bounds)
                dy))
      (assoc :height
             (- (:height starting-bounds)
                dy))))

(defn adjust-south
  "Returns a `bounds` with its south edge adjusted by `dy` units from
  `starting-bounds`."
  [bounds starting-bounds dy]
  (-> bounds
      (assoc :height
             (+ (:height starting-bounds)
                dy))))

(defn restrict
  "Given `proposed` bounds, limit it to falling completely within
  an `nx` by `ny` rectangle. Otherwise return nil."
  [nx ny proposed]
  (let [{:keys [x y width height]} proposed
        right (+ x width)
        bottom (+ y height)]
    (when (and (<= 0 x)
               (<= 0 y)
               (<= right nx)
               (<= bottom ny)
               (pos? width)
               (pos? height))
      proposed)))

(defn wind-stability-overlay
  [weather-params register-drag-handler]
  (let [indexed (->> weather-params
                     :wind-stability-areas
                     (map-indexed vector)
                     cell=)
        [nx ny] (:cell-count @weather-params)]
    (formula-of
     [indexed]
     (svg/g
      :id "wind-stability-overlay"
      (for [[index area] indexed]
        (let [{:keys [bounds editing?]} area
              {:keys [x y width height]} bounds]
          [(svg/rect
            :attr {:class "wind-stability-area"}
            :css {:fill (if editing?
                          (colors :edit)
                          "none")
                  :cursor (when editing?
                            "move")}
            :mousedown (fn [e]
                         (reset! prevent-recomputation? true)
                         (register-drag-handler
                          (let [starting-bounds bounds]
                            (fn [[dx dy] final?]
                              (let [dx (long dx)
                                    dy (long dy)]
                                (dosync
                                 (swap! weather-params
                                        update-in
                                        [:wind-stability-areas index :bounds]
                                        (fn [bounds]
                                          (assoc bounds
                                                 :x (math/clamp
                                                     0
                                                     (- nx (:width bounds))
                                                     (+ (:x starting-bounds)
                                                        dx))
                                                 :y (math/clamp
                                                     0
                                                     (- ny (:height bounds))
                                                     (+ (:y starting-bounds)
                                                        dy)))))
                                 (when final?
                                   (reset! prevent-recomputation? false))))))))
            :x x
            :y y
            :width width
            :height height)
           (svg/rect
            :attr {:class "wind-stability-area alternate"}
            :x x
            :y y
            :width width
            :height height)
           (if-not editing?
             []
             (for [[dx dir-h] [[0 "w"] [(/ width 2) nil] [width "e"]]
                   [dy dir-v] [[0 "n"] [(/ height 2) nil] [height "s"]]
                   :when (not= [nil nil] [dir-h dir-v])]
               (svg/rect
                :attr {:stroke "black"
                       :stroke-width "0.1"
                       :fill "white"
                       :cursor (str dir-v dir-h "-resize")}
                :x (+ dx (- x (/ resize-handle-size 2)))
                :y (+ dy (- y (/ resize-handle-size 2)))
                :width resize-handle-size
                :height resize-handle-size
                :mousedown (fn [e]
                             (reset! prevent-recomputation? true)
                             (register-drag-handler
                              (let [starting-bounds bounds]
                                (fn [[dx dy] final?]
                                  (dosync
                                   (swap! weather-params
                                          update-in
                                          [:wind-stability-areas index :bounds]
                                          (fn [bounds]
                                            (let [dx (long dx)
                                                  dy (long dy)]
                                              (or (restrict
                                                   nx ny
                                                   (cond-> bounds
                                                     (= dir-h "w") (adjust-west starting-bounds dx)
                                                     (= dir-h "e") (adjust-east starting-bounds dx)
                                                     (= dir-v "n") (adjust-north starting-bounds dy)
                                                     (= dir-v "s") (adjust-south starting-bounds dy)))
                                                  bounds))))
                                   (when final?
                                     (reset! prevent-recomputation? false))))))))))]))))))

(defn weather-overrides-overlay
  [weather-params register-drag-handler]
  (let [indexed (->> weather-params
                     :weather-overrides
                     (map-indexed vector)
                     cell=)
        [nx ny] (:cell-count @weather-params)]
    (formula-of
     [indexed]
     (svg/g
      :id "weather-overrides-overlay"
      (for [[index override] indexed
            :let [{:keys [location radius falloff show-outline? editing?]} override
                  {:keys [x y]} location]
            :when (or show-outline? editing?)]
        [(svg/circle
          :css {:fill (if editing?
                        (colors :edit)
                        "none")
                :cursor (when editing?
                          "move")
                :stroke-width "0.2"
                :stroke "fuchsia"
                :stroke-dasharray "0.2 0.1"}
          :cx (+ x 0.5)
          :cy (+ y 0.5)
          :r (- radius 0.5)
          :mousedown (fn [e]
                       (reset! prevent-recomputation? true)
                       (register-drag-handler
                        (let [starting location]
                          (fn [[dx dy] final?]
                            (let [dx (long dx)
                                  dy (long dy)]
                              (dosync
                               (swap! weather-params
                                      update-in
                                      [:weather-overrides index :location]
                                      (fn [location]
                                        (assoc location
                                               :x (math/clamp
                                                   0
                                                   (dec nx)
                                                   (+ (:x starting)
                                                      dx))
                                               :y (math/clamp
                                                   0
                                                   (dec ny)
                                                   (+ (:y starting)
                                                      dy)))))
                               (when final?
                                 (reset! prevent-recomputation? false)))))))))
         (svg/circle
          :css {:fill "none"
                :stroke-width "0.2"
                :stroke "fuchsia"
                :stroke-dasharray "0.1 0.2"}
          :cx (+ x 0.5)
          :cy (+ y 0.5)
          :r (- falloff 0.5))
         (let [circle-edit (fn [rad mutate]
                             (for [theta (range 0 360 45)]
                               (let [alpha (math/deg->rad theta)
                                     r (- rad 0.5)
                                     sin-a (Math/sin alpha)
                                     cos-a (Math/cos alpha)
                                     x-offset (* r sin-a)
                                     y-offset (* r cos-a)
                                     lx (cond
                                          (< 0.1 sin-a) "e"
                                          (< sin-a -0.1) "w"
                                          :else "")
                                     ly (cond
                                          (< 0.1 cos-a) "s"
                                          (< cos-a -0.1) "n"
                                          :else "")]
                                 (svg/rect
                                  :attr {:stroke "black"
                                         :stroke-width "0.1"
                                         :fill "white"
                                         :cursor (str ly lx "-resize")}
                                  :x (-> x (+ x-offset) (+ 0.5) (- (/ resize-handle-size 2)))
                                  :y (-> y (+ y-offset) (+ 0.5) (- (/ resize-handle-size 2)))
                                  :width resize-handle-size
                                  :height resize-handle-size
                                  :mousedown
                                  (fn [e]
                                    (reset! prevent-recomputation? true)
                                    (register-drag-handler
                                     (fn [[dx dy] final?]
                                       (let [dx' (+ x-offset dx)
                                             dy' (+ y-offset dy)
                                             r' (+ 0.5
                                                   (Math/sqrt (+ (* dx' dx')
                                                                 (* dy' dy'))))]
                                         (dosync
                                          (mutate r')
                                          (when final?
                                            (reset! prevent-recomputation? false)))))))))))]
           (if-not editing?
             []
             [(circle-edit falloff
                           (fn [r]
                             (swap! weather-params
                                    update-in
                                    [:weather-overrides index]
                                    (fn [{:keys [falloff radius] :as override}]
                                      (assoc override
                                             :falloff
                                             (math/clamp 0 radius (long r)))))))
              (circle-edit radius
                           (fn [r]
                             (swap! weather-params
                                    assoc-in
                                    [:weather-overrides index :radius]
                                    (max 1 (long r)))
                             (swap! weather-params
                                    update-in
                                    [:weather-overrides index :falloff]
                                    #(math/clamp 0 (long r) %))))]))])))))

(defn flight-path->path
  [size path]
  (loop [[point & more] path
         s nil]
    (if-let [{:keys [::dtc/coordinates ::dtc/alternate?]} point]
      (let [{:keys [::dtc/x ::dtc/y]} coordinates
            [gx gy] (coords/falcon->grid size x y)]
        (recur more
               (if alternate?
                 s
                 (str s
                      (when s " ")
                      (if s "L" "M")
                      (gstring/format "%f,%f" gx gy)))))
      s)))

(defelem triangle
  [attrs _]
  (let [{:keys [r]} attrs
        attrs (dissoc attrs :r)
        alpha 0.8660254037844387 ; sin 60deg
        beta 0.5 ; sin 30deg
        x (* r alpha)
        y (* r alpha)]
    (svg/path
     :d (gstring/format "M%f,%f L%f,%f L%f,%f Z"
                        0 (- y)
                        x y
                        (- x) y)
     attrs)))

(defn flight-paths-overlay
  [size display-params]
  (svg/g
   :id "flight-paths-overlay"
   (formula-of
    [display-params]
    (for [{:keys [show? show-labels? color path]} (:flight-paths display-params)
          :when show?
          :let [opacity 0.9]]
      [(svg/g
        (for [{:keys [::dtc/coordinates ::dtc/ordinal ::dtc/alternate? ::dtc/action]} path
              :let [{:keys [::dtc/x ::dtc/y]} coordinates
                    [gx gy] (coords/falcon->grid size x y)
                    marker-size 0.5
                    style {:stroke         color
                           :stroke-width   "0.15"
                           :pointer-events "none"
                           :fill           "none"
                           :opacity        opacity}]]
          [(svg/g
            :attr {:transform (gstring/format "translate(%f,%f)" gx gy)}
            (if (#{:cap :strike :bomb :sead :elint} action)
              (triangle
               style
               :r (/ marker-size 2))
              (svg/circle
               style
               :cx 0
               :cy 0
               :r (/ marker-size 2))))
           (if-not show-labels?
             []
             (svg/text
              :stroke color
              :stroke-width "0.01"
              :fill color
              :font-size "4%"
              :text-anchor "middle"
              :opacity opacity
              :x gx
              :y (- gy marker-size)
              ;; TODO: Understand and display tanker steerpoint, plus
              ;; triangles for targets and patrol points.
              ;; Also need to alter flight path detection algorithm:
              ;; type goes to -1 when it switches to target point.
              (if alternate?
                "Alternate Field"
                (inc ordinal))))]))
       (svg/path
        :stroke color
        :stroke-width "0.1"
        :fill "none"
        :pointer-events "none"
        :opacity opacity
        :d (flight-path->path size path))]))))

(defn within-area?
  "Return true if the specified coordinates fall within the wind
  stability area."
  [area cell]
  (let [{:keys [bounds]}           area
        {:keys [x y width height]} bounds
        left                       x
        top                        y
        right                      (+ x width)
        bottom                     (+ y height)
        {:keys [x y]}              cell]
    (and (<= left x right)
         (<= top y bottom))))

(defn within-override?
  "Returns true if the specified coordinates fall within the weather
  override."
  [override cell]
  (let [{:keys [location radius]} override
        {:keys [x y]} location
        cx x
        cy y
        {:keys [x y]} cell
        dx (- cx x)
        dy (- cy y)]
    (< (+ (* dx dx) (* dy dy))
       (* radius radius))))

(defelem grid
  [{:keys [display-params
           selected-cell
           weather-data
           wind-stability-areas
           weather-overrides
           pressure-unit
           computing
           nx
           ny]
    :as attrs}]
  (let [;; Drag and drop is complicated by the fact that there isn't a
        ;; good way to capture the mouse when it goes down. So we use
        ;; the document mouse events so that we can get global
        ;; notificaiton of the mouse movements and buttons.
        ;; TODO: See if some core.async love might simplify this a bit.
        drag-handler (atom nil)
        drag-start (atom nil)
        register-drag-handler (fn [h]
                                (swap! drag-handler #(or % h)))
        doc-move (fn [e]
                   (if-let [h @drag-handler]
                     (let [[x y] (grid-coords e)
                           [sx sy] @drag-start]
                       (h [(- x sx) (- y sy)] false)
                       (reset! hover-cell nil)
                       (.preventDefault e))
                     (reset! hover-cell
                             (let [[x y] (grid-coords e)]
                               (when (and (<= 0 x nx)
                                          (<= 0 y ny))
                                 {:x (long x)
                                  :y (long y)})))))
        doc-up (fn doc-up [e]
                 (when-let [h @drag-handler]
                   (let [[x y] (grid-coords e)
                         [sx sy] @drag-start]
                     (h [(- x sx) (- y sy)] true)))
                 (reset! drag-start nil)
                 (reset! drag-handler nil))
        _      (.addEventListener js/document "mousemove" doc-move)
        _      (.addEventListener js/document "mouseup" doc-up)
        primary-layer (svg/g
                       :id "primary-layer"
                       :toggle (cell= (-> display-params :display some?))
                       :css (cell= {:opacity (-> display-params :opacity)}))
        wind-overlay (svg/g
                      :id "wind-overlay"
                      :toggle (cell= (-> display-params
                                         :overlay
                                         (= :wind))))
        text-overlay (svg/g
                      :id "text-overlay"
                      :attr (cell= {:class (str "text-overlay "
                                                (some-> display-params
                                                        :overlay
                                                        name))})
                      :toggle (cell= (-> display-params
                                         :overlay
                                         #{:pressure :temperature :type})))
        selected-cell-overlay (formula-of
                               [selected-cell]
                               (let [[x y] (:coordinates selected-cell)]
                                 (if (and x y)
                                   (svg/rect
                                    :id "selected-cell-overlay"
                                    :x x
                                    :y y
                                    :width 1
                                    :height 1)
                                   [])))
        wind-stability-areas     (formula-of
                                  [weather-params]
                                  (:wind-stability-areas weather-params))
        weather-overrides        (formula-of
                                  [weather-params]
                                  (:weather-overrides weather-params))
        effective-hover-cell     (formula-of
                                  [hover-cell wind-stability-areas weather-overrides]
                                  ;; Don't show the hover info when
                                  ;; we're in an area where something
                                  ;; can be dragged.
                                  (if (or (some (fn [area]
                                                  (and (within-area? area hover-cell)
                                                       (:editing? area)))
                                                wind-stability-areas)
                                          (some (fn [override]
                                                  (and (within-override? override hover-cell)
                                                       (:editing? override)))
                                                weather-overrides))
                                    nil
                                    hover-cell))
        info-overlay             (formula-of
                                  [effective-hover-cell weather-data pressure-unit]
                                  (info-overlay effective-hover-cell
                                                weather-data
                                                pressure-unit
                                                nx ny))]
    (with-let [elem (svg/svg
                     :id "grid"
                     (-> attrs
                         (dissoc :display-params
                                 :selected-cell
                                 :weather-data
                                 :wind-stability-areas
                                 :weather-overrides)
                         (assoc :viewBox (gstring/format "0 0 %d %d" nx ny)
                                :width (cell= (-> display-params :dimensions first))
                                :height (cell= (-> display-params :dimensions second))
                                :attr {"xmlns:xlink" "http://www.w3.org/1999/xlink"
                                       "xmlns" "http://www.w3.org/2000/svg"}))
                     :mouseleave (fn [_]
                                   (dosync
                                    (reset! hover-cell nil)))
                     :mousedown (fn [e]
                                  (when @drag-handler
                                    (reset! drag-start (grid-coords e))))
                     wind-vector-defs
                     ;; TODO: Not working in Firefox/Safari because
                     ;; the image tag doesn't render as
                     ;; self-closing. Not sure how to convince
                     ;; Hoplon to change that.
                     (svg/image
                      :id "map-image"
                      :toggle (cell= (-> display-params :map #{:none nil} not))
                      :xlink-href (cell= (or (-> display-params :map map-image) ""))
                      :x 0
                      :y 0
                      :width nx
                      :height ny)
                     primary-layer
                     wind-overlay
                     text-overlay
                     (wind-stability-overlay weather-params register-drag-handler)
                     (weather-overrides-overlay weather-params register-drag-handler)
                     (flight-paths-overlay [nx ny] display-params)
                     selected-cell-overlay
                     info-overlay)]
      ;; TODO: We're capturing the value of the number of cells, but it
      ;; never changes. One of these days I should probably factor this
      ;; out. Either that or just react to changes in the number of
      ;; cells by re-inserting the child rects.
      (with-init!
        (with-time "Initial create"
          (do
            ;; Primary layer
            (let [frag (.createDocumentFragment js/document)]
              (doseq [x (range nx)
                      y (range ny)]
                (let [r (doto (.createElementNS
                               js/document
                               "http://www.w3.org/2000/svg"
                               "rect")
                          (.setAttribute "id" (str "grid-primary-cell-" x "-" y))
                          (.setAttribute "x" (str x))
                          (.setAttribute "y" (str y))
                          (.setAttribute "width" "1")
                          (.setAttribute "height" "1")
                          (.setAttribute "fill" "none")
                          (-> .-onclick
                              (set! #(reset! selected-cell {:location nil
                                                            :coordinates [x y]}))))]
                  (gdom/appendChild frag r)))
              (gdom/appendChild primary-layer frag))
            ;; Wind vector layer
            (let [frag (.createDocumentFragment js/document)]
              (doseq [x (range nx)
                      y (range ny)]
                (let [g (doto (.createElementNS
                               js/document
                               "http://www.w3.org/2000/svg"
                               "g")
                          (.setAttribute "transform"
                                         (gstring/format "translate(%f, %f)"
                                                         (+ x 0.5)
                                                         (+ y 0.5))))
                      r (doto (.createElementNS
                               js/document
                               "http://www.w3.org/2000/svg"
                               "use")
                          (.setAttribute "id" (str "grid-wind-cell-" x "-" y)))]
                  (gdom/appendChild g r)
                  (gdom/appendChild frag g)))
              (gdom/appendChild wind-overlay frag))
            ;; Text overlay layer
            (let [frag (.createDocumentFragment js/document)
                  scale 0.03]
              (doseq [x (range nx)
                      y (range ny)]
                (let [t (doto (.createElementNS
                               js/document
                               "http://www.w3.org/2000/svg"
                               "text")
                          (.setAttribute "transform"
                                         ;; TODO: figure out how to center these stupid things
                                         (gstring/format "scale(%f) translate(%f, %f)"
                                                         scale
                                                         (/ (+ x 0.5) scale)
                                                         (/ (+ y 0.9) scale)))
                          (.setAttribute "id" (str "grid-text-cell-" x "-" y))
                          (.setAttribute "text-anchor" "middle"))]
                  (gdom/appendChild frag t)))
              (gdom/appendChild text-overlay frag))))
        (let [display-params* (formula-of
                               [display-params]
                               (dissoc display-params
                                       :dimensions
                                       :opacity
                                       :map
                                       :flight-paths))]
          (formula-of
           [weather-data display-params*]
           (update-grid weather-data display-params*)))))))


;;; User Interface

(def ESCAPE_KEY 27)
(def ENTER_KEY 13)

(defn two-column
  [left right]
  (div :class "two-column"
       (div :class "left-column" left)
       (div :class "right-column" right)))

(defelem dropdown
  [attrs _]
  (let [{:keys [value select items]} attrs
        attrs (dissoc attrs :value :select :items)
        show? (cell false)
        selected (formula-of
                  [items value]
                  (log/debug "selected changing" :value value :items items)
                  (->> items
                       (filter #(= value (:value %)))
                       first))
        _ (formula-of
           [selected]
           (log/debug "selected changed" :selected selected))]
    (log/debug "dropdown"
               :dropdown-value @value
               :selected @selected
               :items @items)
    (div
     :css {:border "solid 1px black"
           :background "white"
           :border-radius "4px"
           :padding-left "4px"
           :padding-top "2px"}
     attrs
     [(formula-of
       [selected value]
       (if (= (:value selected) value)
         (:ui selected)
         ""))
      (span
       :css (merge (triangle-style)
                   {:margin-bottom "6px"
                    :margin-left "4px"})
       :click #(swap! show? not))
      (div
       :toggle show?
       (formula-of
        [items value]
        (for [item items]
          (a
           :href "#"
           :click #(dosync
                    (reset! show? false)
                    (select item))
           :css {:margin-left "4px"
                 :display "block"}
           (div
            :css {:width "8px"
                  :display "inline-block"}
            (if (= value (:value item))
              "✓"
              " "))
           (:ui item)))))])))

(defn conform-nonnegative-integer
  [s]
  (let [n (js/Number. s)
        l (long n)
        valid? (and (int? l)
                    (not (neg? l)))]
    {:valid? valid?
     :message (when-not valid?
                "Must be whole number, greather than or equal to zero.")
     :value l}))

(defn conform-positive-integer
  [s]
  (let [n (js/Number. s)
        l (long n)
        valid? (and (int? l)
                    (pos? l))]
    {:valid? valid?
     :message (when-not valid?
                "Must be an integer greater than zero.")
     :value l}))

(defelem validating-edit
  [{:keys [conform fmt source update width placeholder] :as attrs}
   _]
  (let [attrs (dissoc attrs :source :conform :update :width :fmt :placeholder)
        interim (cell nil)
        parsed (formula-of
                [interim]
                (if interim
                  (conform interim)
                  {:valid? true
                   :value @source}))
        state (cell :set)]
    (div
     attrs
     :css {:position "relative"}
     (input :type "text"
            :placeholder placeholder
            :input #(do
                      (reset! interim @%)
                      (if (and (:valid? @parsed)
                               (= (:value @parsed) @source))
                        (dosync
                         (reset! state :set)
                         (reset! interim nil))
                        (reset! state :editing)))
            :change #(do
                       (let [p @parsed]
                         (when (:valid? p)
                           (update (:value p))
                           (dosync
                            (reset! interim nil)
                            (reset! state :set)))))
            :keyup (fn [e]
                     (when (= ESCAPE_KEY (.-keyCode e))
                       (dosync
                        (reset! interim nil)
                        (reset! state :set))))
            :css (cell= {"font-style" (if (= state :editing)
                                        "italic"
                                        "")
                         "color" (if (:valid? parsed)
                                   ""
                                   (colors :invalid))
                         "width" (or width "initial")})
            :value (formula-of
                    [interim source]
                    (if interim
                      interim
                      (fmt source))))
     (img :src "images/error.png"
          :title (cell= (:message parsed))
          :css (formula-of
                [parsed]
                {"width" "14px"
                 "vertical-align" "middle"
                 "margin-left" "3px"
                 "opacity" (if (:valid? parsed)
                             "0"
                             "1")})))))

;; TODO: We could consider using a lens here instead of separate
;; source and update
(defelem time-edit
  [{:keys [source update] :as attrs} _]
  (validating-edit
   attrs
   :width "50px"
   :fmt format-time
   :placeholder "dd/hhmm"
   :conform #(let [[all dd hh mm] (re-matches #"(\d+)/(\d\d)(\d\d)" %)
                   day            (->> dd js/Number. long)
                   hour           (->> hh js/Number. long)
                   min            (->> mm js/Number. long)
                   valid?         (and dd hh mm
                                       (int? day)
                                       (int? hour)
                                       (int? min)
                                       (<= 0 hour 23)
                                       (<= 0 min 59))
                   val            {:day    day
                                   :hour   hour
                                   :minute min}
                   over-max?      (and valid?
                                       (-> @weather-params :time :max)
                                       (< (-> @weather-params
                                              :time
                                              :max
                                              model/falcon-time->minutes)
                                          (model/falcon-time->minutes val)))]
               {:valid? (and valid? (not over-max?))
                :message (cond
                           (not valid?) "Time must be in the format 'dd/hhmm'"
                           over-max? (str "Time cannot be set later than "
                                          (-> @weather-params :time :max format-time)))
                :value {:day    day
                        :hour   hour
                        :minute min}})))

(defn edit-field
  ([c path] (edit-field c path {}))
  ([c path opts]
   ;; TODO: Add conversion to/from string and validation
   (let [{:keys [change-fn input-attrs]
          :or {input-attrs {}}} opts]
     (input
      input-attrs
      :type "text"
      :value (cell= (get-in c path))
      :change (if change-fn
                #(change-fn (js/Number @%))
                #(swap! c assoc-in path (js/Number @%)))))))

(defn pressure-edit-field
  "Renders an input that will edit a pressure value, in whatever units
  the cell `unit-c` indicates"
  [c path unit-c]
  (input :type "text"
         :value (formula-of
                 [c unit-c]
                 (format-pressure (get-in c path) unit-c))
         :change #(swap! c assoc-in path (-> @%
                                             js/Number
                                             (convert-pressure @unit-c)))))

(defn time-entry
  [c path]
  ;; TODO: Make fancier
  (time-edit
   :source (formula-of [c] (get-in c path))
   :update #(swap! c assoc-in path %)))

(defelem image-button
  [attrs]
  (let [down (cell false)
        css (:css attrs)
        attrs (dissoc attrs :css)]
    (img
     :css (formula-of
           [down]
           (merge (image-button-style down)
                  css))
     :mousedown (fn [e]
                  (log/debug "down")
                  (let [up (fn up-fn [e]
                             (log/debug "up")
                             (.removeEventListener js/document "mouseup" up-fn)
                             (reset! down false))]
                    (.addEventListener js/document "mouseup" up))
                  (reset! down true))
     attrs)))


(defn button-bar
  []
  (div :class "button-bar"
       :css {"position" "relative"}
       (button :id "enlarge-grid"
               :click #(swap! display-params
                              update
                              :dimensions
                              (fn [[x y]]
                                [(+ x 50) (+ y 50)]))
               :title "Enlarge grid"
               (img :src "images/bigger.png"))
       (button :id "shrink-grid"
               :click #(swap! display-params
                              update
                              :dimensions
                              (fn [[x y]]
                                [(- x 50) (- y 50)]))
               :title "Shrink grid"
               (img :src "images/smaller.png"))
       (span
        :css {"position" "absolute"
              "right" "27px"
              "bottom" "0"}
        "Day/Time: " (formula-of
                      [weather-data-params]
                      (let [t (-> weather-data-params :time :current)]
                        (if t
                          (format-time t)
                          "--/----"))))
       (formula-of
        [computing]
        (if-not computing
          []
          (img :src "images/spinner.gif"
               :width "24"
               :height "24"
               :css {"vertical-align" "bottom"
                     "position" "absolute"
                     "right" "3px"
                     "bottom" "0"})))))

(defn control-layout
  "Lays out controls for a control section"
  [controls]
  (let [field      (fn [& kids] (apply div :class "field" kids))
        field-help (fn [& kids] (apply div :class "field-elem field-help" kids))
        field-input (fn [& kids] (apply div :class "field-elem field-input" kids))
        field-label (fn [& kids] (apply div :class "field-elem field-label" kids))]
    (for [[label selector {:keys [extra type help-base help-path cell ui] :as opts}]
          controls
          :let [cell (or cell weather-params)]]
      (field
       (field-label (with-help (into [(or help-base :weather-params)]
                                     (or help-path selector))
                      label))
       (field-input (or ui (if (= :pressure type)
                             (pressure-edit-field cell
                                                  selector
                                                  pressure-unit)
                             (edit-field cell selector)))
                    (or extra []))))))

(defn display-controls
  [{:keys [prevent-map-change?]}]
  (let [dropdown (fn [{:keys [k key->name name->key change]}]
                   (select
                    :change (if change
                              #(change (name->key @%))
                              #(swap! display-params assoc k (name->key @%)))
                    (for [name (conj (keys name->key) "None")]
                      (option
                       :value name
                       :selected (cell= (-> display-params
                                            k
                                            key->name
                                            (= name)))
                       name))))
        field      (fn [& kids] (apply div :class "field" kids))
        field-help (fn [& kids] (apply div :class "field-elem field-help" kids))
        field-input (fn [& kids] (apply div :class "field-elem field-input" kids))
        field-label (fn [help-path & kids]
                      (with-help help-path
                        (apply div :class "field-elem field-label" kids)))]
    (control-section
     :title "Display controls"
     :id "display-controls-section"
     (control-layout
      (let [opts {:cell display-params
                  :help-base :display-controls}]
        (into (if prevent-map-change?
                []
                [["Map"
                  [:map]
                  (merge opts
                         {:ui (dropdown {:k :map
                                         :key->name map-key->name
                                         :name->key map-name->key
                                         :change change-theater})})]])
              [["Display"
                [:display]
                (merge opts
                       {:ui (dropdown {:k :display
                                       :key->name display-key->name
                                       :name->key display-name->key})})]
               ["Overlay"
                [:overlay]
                (merge opts {:ui (dropdown {:label "Overlay"
                                            :k :overlay
                                            :key->name overlay-key->name
                                            :name->key overlay-name->key})})]
               ["Pressure"
                [:pressure]
                (merge opts {:ui (select
                                  :change #(do
                                             (swap! display-params
                                                    assoc
                                                    :pressure-unit
                                                    (pressure-unit-name->key @%)))
                                  (for [name (keys pressure-unit-name->key)]
                                    (option
                                     :value name
                                     :selected (cell= (-> display-params
                                                          :pressure-unit
                                                          pressure-unit-key->name
                                                          (= name)))
                                     name)))})]
               ["Opacity:"
                [:opacity]
                (merge opts {:ui (input {:type "range"
                                         :min 0
                                         :max 100
                                         :value (cell= (-> display-params
                                                           :opacity
                                                           (* 100)
                                                           long))
                                         :change #(swap! display-params
                                                         assoc
                                                         :opacity
                                                         (/ @% 100.0))})})]]))))))

(defn weather-parameters
  [_]
  (control-section
   :title "Weather parameters"
   :id "weather-params-section"
   (control-layout
    [["Seed"             [:seed] {:extra (button
                                          :click #(swap! weather-params
                                                         assoc
                                                         :seed
                                                         (+ (rand-int 5000) 100))
                                          "Random")}]
     ["Min pressure"     [:pressure :min] {:type :pressure}]
     ["Max pressure"     [:pressure :max] {:type :pressure}]
     ["Prevailing wind"  [:prevailing-wind :heading]]
     ["Weather heading"  [:direction :heading] {:cell movement-params
                                                :help-base :movement-params}]
     ["Weather speed"    [:direction :speed]   {:cell movement-params
                                                :help-base :movement-params}]])))

(defn wind-stability-parameters
  [_]
  (control-section
   :title (with-help [:wind-stability-areas] "Wind stability regions")
   :id "wind-stability-params-section"
   (let [indexed-wind-stability-areas (->> weather-params
                                           :wind-stability-areas
                                           (map-indexed vector)
                                           cell=)]
     (div
      :class "wind-stability-boxes"
      (loop-tpl :bindings [[index area] indexed-wind-stability-areas]
        (div
         :class "wind-stability-params"
         (table
          (tbody
           (tr (td "NW corner")
               (td (edit-field weather-params [:wind-stability-areas @index :bounds :x]))
               (td (edit-field weather-params [:wind-stability-areas @index :bounds :y])))
           (tr (td "Width/height")
               (td (edit-field weather-params [:wind-stability-areas @index :bounds :width]))
               (td (edit-field weather-params [:wind-stability-areas @index :bounds :height])))
           (tr (td "Wind spd/hdg")
               (td (edit-field weather-params [:wind-stability-areas @index :wind :speed]))
               (td (edit-field weather-params [:wind-stability-areas @index :wind :heading])))))
         (image-button
          :src "images/trash.png"
          :width "16px"
          :title "Remove"
          :click #(swap! weather-params
                         update
                         :wind-stability-areas
                         (fn [areas]
                           (remove-nth areas @index))))
         (img
          :click #(swap! weather-params
                         update-in
                         [:wind-stability-areas @index :editing?]
                         not)
          :title "Edit"
          :src "images/move.svg"
          :width "16px"
          :height "16px"
          :css (formula-of
                [area]
                (log/debug "area" area)
                (log/spy (image-button-style (:editing? area)))))
         (hr)))))
   (button
    :click #(swap! weather-params
                   update
                   :wind-stability-areas
                   (fn [areas]
                     (conj areas
                           {:bounds {:x 0 :y 0 :width 10 :height 10}
                            :wind {:heading 45
                                   :speed 5}
                            :index (count areas)})))
    "Add New")))

(defn weather-override-parameters
  [_]
  (control-section
   :title (with-help [:weather-overrides :overview] "Weather override regions")
   :id "weather-override-params-section"
   (let [indexed-weather-overrides (formula-of
                                    [weather-params]
                                    (->> weather-params
                                         :weather-overrides
                                         (map-indexed vector)))]
     (div
      :class "weather-override-boxes"
      (loop-tpl :bindings [[index override] indexed-weather-overrides]
        (div
         :class "weather-overrides"
         (table
          :id "weather-override-params"
          (let [checkbox (fn checkbox
                           ([l k {:keys [change row-attrs]}]
                            (let [id (gensym)]
                              (tr
                               (or row-attrs [])
                               (td
                                :colspan 2
                                (input :id id
                                       :css {:width "25px"}
                                       :type "checkbox"
                                       :value (cell= (k override))
                                       :change (or change
                                                   (fn [_]
                                                     (swap! weather-params
                                                            update-in
                                                            [:weather-overrides @index k]
                                                            not))))
                                (with-help [:weather-overrides k]
                                  (label :for id l)))))))]
            (tbody
             (tr (td :class "override-label"
                     (with-help [:weather-overrides :center]
                       "Center X/Y"))
                 (td (edit-field weather-params
                                 [:weather-overrides @index :location :x]
                                 {:input-attrs {:css {:margin-right "3px"}}})
                     (edit-field weather-params [:weather-overrides @index :location :y])))
             (tr (td :class "override-label"
                     (with-help [:weather-overrides :radius]
                       "Radius"))
                 (td (edit-field weather-params [:weather-overrides @index :radius])))
             (tr (td :class "override-label"
                     (with-help [:weather-overrides :falloff]
                       "Falloff"))
                 (td (edit-field weather-params [:weather-overrides @index :falloff])))
             (tr (td :class "override-label"
                     (with-help [:weather-overrides :pressure]
                       "Pressure"))
                 (td (pressure-edit-field
                      weather-params
                      [:weather-overrides @index :pressure]
                      pressure-unit)))
             (tr (td :class "override-label"
                     (with-help [:weather-overrides :strength]
                       "Strength"))
                 (td (edit-field weather-params [:weather-overrides @index :strength])))
             (checkbox "Show outline?" :show-outline? {})
             (checkbox "Fade in/out?" :animate?
                       {:change (fn [_]
                                  (dosync
                                   (swap! weather-params
                                          update-in
                                          [:weather-overrides @index :animate?]
                                          not)
                                   (swap! weather-params
                                          (fn [weather-params]
                                            (if (get-in weather-params
                                                        [:weather-overrides @index :animate?])
                                              weather-params
                                              (assoc-in weather-params
                                                        [:weather-overrides @index :exclude-from-forecast?]
                                                        false))))))})
             (for [[label k] [["Begin" :begin]
                              ["Peak" :peak]
                              ["Taper" :taper]
                              ["End" :end]]]
               (tr :toggle (cell= (:animate? override))
                   (td (with-help [:weather-overrides k]
                         label))
                   (td (time-entry weather-params [:weather-overrides @index k]))))
             (checkbox "Exclude from forecast?" :exclude-from-forecast?
                       {:row-attrs {:toggle (cell= (:animate? override))}}))))
         (image-button
          :src "images/trash.png"
          :width "16px"
          :title "Remove"
          :click #(swap! weather-params
                         update
                         :weather-overrides
                         (fn [overrides]
                           (remove-nth overrides @index))))
         (img
          :click #(swap! weather-params
                         update-in
                         [:weather-overrides @index :editing?]
                         not)
          :title "Edit"
          :src "images/move.svg"
          :width "16px"
          :height "16px"
          :css (formula-of
                {{:keys [editing?]} override}
                (image-button-style editing?)))))))
   (button
    :click #(swap! weather-params
                   (fn [wp]
                     (update wp
                             :weather-overrides
                             (fn [overrides]
                               (conj overrides
                                     {:location {:x 30
                                                 :y 30}
                                      :radius 8
                                      :falloff 2
                                      :begin (-> wp :time :current)
                                      :peak (-> wp :time :current (model/add-time 60))
                                      :taper (-> wp :time :current (model/add-time 180))
                                      :end (-> wp :time :current (model/add-time 240))
                                      :pressure (-> wp :pressure :min)
                                      :strength 1
                                      :show-outline? true
                                      :exclude-from-forecast? false})))))
    "Add New")))

(defn weather-type-configuration
  [_]
  (control-section
   :title "Weather type configuration"
   :id "weather-type-configuration-section"
   (table
    :id "category-params"
    (thead
     (tr (td "")
         (td :colspan 2 (with-help [:weather-type-config :pressure]
                          "Pressure"))
         (td :colspan 3 (with-help [:weather-type-config :wind]
                          "Wind"))
         (td :colspan 3 (with-help [:weather-type-config :temp]
                          "Temperature")))
     (tr (map #(apply td %)
              [[""]
               ["From"] ["To"]
               ["Min"] ["Mean"] ["Max"]
               ["Min"] ["Mean"] ["Max"]])))
    (tbody
     (for [category [:sunny :fair :poor :inclement]]
       (tr (td
            :class (str "weather-type " (name category))
            :css {"background-color" (let [[r g b] (weather-color category)]
                                       (str "rgb(" r "," g "," b ")"))}
            (type-key->name category))
           (condp contains? category
             #{:sunny}
             [(td
               :class "derived"
               (formula-of
                [weather-params pressure-unit]
                (-> weather-params
                    (get-in [:categories :fair :pressure])
                    (format-pressure pressure-unit))))
              (td
               :class "derived"
               (formula-of
                [weather-params pressure-unit]
                (-> weather-params
                    (get-in [:pressure :max])
                    (format-pressure pressure-unit))))]

             #{:fair :poor}
             [(td
               :class "derived"
               (formula-of
                [weather-params pressure-unit]
                (->  weather-params
                     (get-in [:categories
                              (if (= :fair category)
                                :poor :inclement)
                              :pressure])
                     (format-pressure pressure-unit))))
              (td (div
                   :class "edit-field"
                   (pressure-edit-field
                    weather-params
                    [:categories category :pressure]
                    pressure-unit)))]

             #{:inclement}
             [(td
               :class "derived"
               (formula-of
                [weather-params pressure-unit]
                (-> weather-params
                    (get-in [:pressure :min])
                    (format-pressure pressure-unit))))
              (td (div
                   :class "edit-field"
                   (pressure-edit-field
                    weather-params
                    [:categories category :pressure]
                    pressure-unit)))])
           (for [param [:wind :temp]
                 metric [:min :mean :max]]
             (td :class (str (name param) " " (name metric))
                 (div :class "edit-field"
                      (edit-field weather-params [:categories category param metric]))))))))))

(defn advanced-controls
  [_]
  (control-section
   :id "advanced-params-section"
   :title "Advanced Controls"
   (control-layout
    [["X Offset"         [:origin 0] {:help-path [:origin :x]}]
     ["Y Offset"         [:origin 1] {:help-path [:origin :y]}]
     ["T Offset"         [:time :offset]]
     ["Evolution"        [:evolution]]
     ["Wind uniformity"  [:wind-uniformity]]
     ["Temp uniformity"  [:temp-uniformity]]
     ["Warp strength"    [:turbulence :power]]
     ["Crossfade"        [:crossfade]]
     ["Zoom"             [:feature-size]]])))

(defn step-controls
  [{:keys [mode]}]
  (control-section
   :id "time-location-params"
   :title "Time controls"
   (table
    (tbody
     (if (= mode :browse)
       (tr (td (with-help [:weather-params :time :falcon-time]
                 "Falcon time: "))
           (td (cell= (-> weather-params :time :max format-time)))
           (td (button
                :click #(jump-to-time* (-> @weather-params :time :max))
                "Jump to")))
       [])
     (if (= mode :browse)
       (tr (td (with-help  [:weather-params :time :browse-time]
                 "Time"))
           (td (time-entry weather-params [:time :current])))
       (tr (td (with-help [:displayed-time]
                 "Time"))
           (td (time-entry time-params [:displayed]))
           (td (button
                :click jump-to-time
                "Jump to")
               (button
                :click set-time
                "Set to"))))
     (tr (map td [(with-help [:step]
                    "Step interval")
                  (validating-edit
                   :width "50px"
                   :source (cell= (:step movement-params))
                   :conform conform-positive-integer
                   :update #(swap! movement-params assoc :step %)
                   :placeholder "e.g. 60"
                   :fmt str)]))))
   (button :title "Step back in time"
           :click #(move -1)
           "<< Step Back")
   (button
    :title (cell= (if (:looping? movement-params)
                    "Stop weather animation"
                    "Animate weather"))
    :click #(when (:looping? (swap! movement-params update :looping? not))
              (recompute @weather-params))
    (span
     :css (formula-of
           [movement-params]
           (if (:looping? movement-params)
             {:border "5px solid black"
              :transform ""
              :display "inline-block"
              :margin-top "2px"}
             {:border-left "5px solid transparent"
              :border-right "5px solid transparent"
              :border-top "7px solid black"
              :border-bottom ""
              :display "inline-block"
              :transform "rotate(-90deg)"}))
     ""))
   (formula-of
    [weather-params]
    (if (and (-> weather-params :time :max)
             (<= (-> weather-params :time :max model/falcon-time->minutes)
                 (-> weather-params :time :current model/falcon-time->minutes)))
      []
      (button :title "Step forward in time"
              :click #(move 1)
              "Step Forward >>")))))

(defn serialization-controls
  [_]
  (control-section
   :id "load-save-controls"
   :title "Load/save"
   (div
    :class "button-container"
    (a :click (fn []
                (save-fmap @weather-params @weather-data)
                (move 1))
       :class "button"
       "Save Current as FMAP")
    "(Steps forward in time)")
   (div
    :class "button-container"
    (cell=
     (let [blob (js/Blob. (clj->js [(pr-str {:weather-params weather-params
                                             :movement-params movement-params
                                             :display-params display-params
                                             :revision revision})])
                          #js{:type "text/plain"})
           url (-> js/window .-URL (.createObjectURL blob))]
       (a :href url
          :download "weathergen-settings.edn"
          :class "button"
          "Save Settings"))))
   (div
    :class "button-container"
    (button :class "button" :click load-settings "Load Settings"))))

(defn debug-info
  []
  #_(div "Route" route))

(defmethod do! :viewBox
  [elem _ value]
  (if (= false value)
    (.removeAttribute elem "viewBox")
    (.setAttribute elem "viewBox" value)))

(defmethod do! :xlink-href
  [elem _ value]
  (if (= false value)
    (.removeAttributeNS elem "http://www.w3.org/1999/xlink" "href")
    (do
      (.setAttributeNS elem "http://www.w3.org/1999/xlink" "href" value))))

(defmethod do! :preserveAspectRatio
  [elem _ value]
  (if (= false value)
    (.removeAttribute elem "preserveAspectRatio")
    (.setAttribute elem "preserveAspectRatio" value)))

(defn test-section
  [{:keys []}]
  (control-section
   :title "Test"
   (let [path (cell {:color "FFFFFF"})
         current-color (cell= (:color path))]
     [(span (cell= (str current-color)))
      (color-picker
       :value current-color
       :change (fn [val opacity]
                 (log/debug "color changed" :val @val :opacity opacity)
                 (swap! path assoc :color @val)))])))

(defn flightpath-controls
  [_]
  (control-section
   :id "flightpath-controls"
   :title (with-help [:flightpath :section]
            "Flight Paths")
   (div
    (let [indexes (formula-of
                   [display-params]
                   (->> display-params
                        :flight-paths
                        count
                        range))]
      (table
       (thead
        (formula-of
         [indexes]
         (when-not (empty? indexes)
           (tr (td :colspan 2
                   (with-help [:flightpath :name] "Name"))
               (td (with-help [:flightpath :show?]
                       "Show?"))
               (td (with-help [:flightpath :labels?]
                     "Labels?"))
               (td (with-help [:flightpath :color]
                     "Color"))
               (td (with-help [:flightpath :remove]
                     "Remove"))))))
       (tbody
        (formula-of
         [indexes]
         (for [index indexes]
           (let [path (lens
                       (formula-of
                        [display-params]
                        (get-in display-params [:flight-paths index]))
                       (fn [v]
                         (swap! display-params assoc-in [:flight-paths index] v)))
                 label (formula-of
                        [path]
                        (-> path :label :value))
                 editor (input
                         :type "text"
                         :value label
                         ;; :blur (fn [_]
                         ;;         (log/debug "blur start")
                         ;;         (swap! path
                         ;;                assoc-in
                         ;;                [:label :editing?]
                         ;;                false)
                         ;;         (log/debug "blur end"))
                         :keypress (fn [e]
                                     (when (= (.-keyCode e) ENTER_KEY)
                                       (swap! path
                                              assoc-in
                                              [:label :editing?]
                                              false)))
                         :change #(dosync
                                   (swap! path
                                          update
                                          :label
                                          assoc
                                          :value @%
                                          :editing? false)))
                 focus-later (fn [e] (with-timeout 0 (.focus e)))]
             (tr
              (td
               (image-button
                :css {:width "12px"}
                :src (formula-of
                      [path]
                      (if (-> path :label :editing?)
                        "images/checkmark.png"
                        "images/edit.svg"))
                :click (fn [_]
                         (log/debug "click")
                         (let [path* (swap! path update-in [:label :editing?] not)]
                           (when (get-in path* [:label :editing?])
                             (log/debug "editing")
                             (focus-later editor))))))
              (td
               (formula-of
                {p path}
                (if (-> p :label :editing?)
                  editor
                  (div
                   :css {:display "inline-block"
                         :margin-right "3px"}
                   :click #(do
                             (focus-later editor)
                             (swap! path
                                    assoc-in
                                    [:label :editing?]
                                    true))
                   label))))
              (td
               :css {:text-align "center"}
               (input
                :css {:margin-bottom "6px"}
                :type "checkbox"
                :value (cell= (:show? path))
                :change #(swap! path update :show? not)))
              (td
               :css {:text-align "center"}
               (input
                :css {:margin-bottom "6px"}
                :type "checkbox"
                :value (cell= (:show-labels? path))
                :change #(swap! path update :show-labels? not)))
              (td
               :css {:text-align "center"}
               (div
                :css {:padding-left "5px"
                      :padding-top "2px"}
                (color-picker
                 :value (cell= (:color path))
                 :change #(swap! path assoc :color @%))))
              (td
               :css {:text-align "center"}
               (image-button
                :src "images/trash.png"
                :click #(swap! display-params
                               update
                               :flight-paths
                               (fn [paths]
                                 (remove-nth paths index)))))))))))))
   (button :click load-dtc "Load DTC")))

;;; General layout

(defn head
  []
  (h/head
   (title "WeatherGen")
   (link :href "js/jquery.minicolors.css" :rel "stylesheet" :title "main" :type "text/css")
   (link :href "style.css" :rel "stylesheet" :title "main" :type "text/css")
   (link :href "https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300"
         :rel "stylesheet"
         :type "text/css")
   ;; TODO: Figure out the whole deps.cljs
   (script :src "js/jquery.minicolors.min.js")))

(defelem body
  [{:keys [] :as attrs}
   contents]
  (h/body
   (div
    :id "app"
    (div :id "titlebar"
           (div :id "words"
                  (span :id "title"
                          "WeatherGen")
                  (span :id "byline"
                          "by"
                          (a :href "http://firstfighterwing.com/VFW/member.php?893-Tyrant"
                               :target "_blank"
                               "Tyrant"))
                  (span :id "helpstring"
                          "Help? Bug? Feature request? Click"
                          (a :href "help.html"
                               :target "_blank"
                               "here")
                          "."))
           (a :href "http://firstfighterwing.com"
                :target "_blank"
                (img :id "winglogo"
                       :src "images/1stVFW_Insignia-64.png")))
    contents)))

(def sections
  {:serialization-controls serialization-controls
   :step-controls step-controls
   :display-controls display-controls
   :weather-parameters weather-parameters
   :forecast-section forecast-section
   :weather-type-configuration weather-type-configuration
   :wind-stability-parameters wind-stability-parameters
   :weather-override-parameters weather-override-parameters
   :advanced-controls advanced-controls
   :flightpath-controls flightpath-controls
   :test-section test-section})

(defn weather-page
  [& section-infos]
  (html
   (head)
   (body
    (div :class "two-column"
         (div :class "left-column"
              (button-bar)
              (grid :display-params display-params
                    :weather-data weather-data
                    :selected-cell selected-cell
                    :wind-stability-areas wind-stability-areas
                    :weather-overrides weather-overrides
                    :computing computing
                    :pressure-unit pressure-unit
                    ;; TODO: Make these reactive, although they never
                    ;; change, so maybe not
                    :nx (first (:cell-count @weather-params))
                    :ny (second (:cell-count @weather-params))))
         (div :class "right-column"
              (for [[section opts] (partition 2 section-infos)
                    :let [ctor (sections section)]]
                (ctor opts))))
    (debug-info))))

#_(with-init!
  (go-loop []
    (if-let [mc (-> "input.minicolors" js/$ .-minicolors)]
      (do
        (log/debug "It loaded")
        (mc #js {}))
      (do
        (log/debug "Trying again")
        (async/<! (async/timeout 500))
        (recur)))))
