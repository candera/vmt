(ns weathergen.ui
  (:require [cljsjs.jquery.minicolors]
            [cljsjs.jszip]
            [cljsjs.filesaverjs]
            [cljsjs.tinycolor]
            [clojure.string :as str]
            [javelin.core
             :as j
             :refer [defc defc= cell cell= dosync lens with-let]]
            [hoplon.core
             :as h
             :refer [a
                     br button
                     defelem div do!
                     fieldset
                     hr html
                     img input
                     label legend link loop-tpl
                     option
                     p progress
                     script select span style
                     table tbody td text thead title tr timeout
                     when-dom when-tpl with-init! with-timeout]]
            [hoplon.svg :as svg]
            [garden.core :refer [css]]
            [garden.selectors :as css-sel]
            [goog.dom :as gdom]
            [goog.crypt.base64 :as base64]
            [goog.string :as gstring]
            [goog.string.format]
            [goog.style :as gstyle]
            [octet.core :as buf]
            [weathergen.canvas :as canvas]
            [weathergen.coordinates :as coords]
            [weathergen.database :as db]
            [weathergen.dtc :as dtc]
            [weathergen.encoding :refer [encode decode] :as encoding]
            [weathergen.falcon.files.mission :as mission]
            [weathergen.fmap :as fmap]
            [weathergen.help :as help]
            [weathergen.math :as math]
            [weathergen.model :as model]
            [weathergen.twx :as twx]
            [weathergen.ui.slickgrid :as slickgrid]
            [weathergen.wind :as wind]
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
   [weathergen.cljs.macros :refer [with-time formula-of]])
  (:refer-clojure :exclude [load-file]))

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
                               :msie    "MSIE"
                               :trident "Trident"
                               :firefox "Firefox"
                               :safari  "Safari"
                               :opera   "op"}]
              (zipmap (keys agent-props)
                      (map is-agent? (vals agent-props)))))

(def safari? (and (:safari agents) (not (:chrome agents))))

(def ie? (or (:msie agents) (:trident agents)))

(def electron (when (= "nodejs" cljs.core/*target*)
                 (js/require "electron")))

;;; State

(defc window-size [(-> js/window js/jQuery .width)
                   (-> js/window js/jQuery .height)])

(-> js/window
    js/jQuery
    (.resize #(reset! window-size
                      [(-> js/window js/jQuery .width)
                       (-> js/window js/jQuery .height)])))

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

(def default-cloud-params
  {:cumulus-density 5                   ; Percent: 5-50
   :cumulus-size 0.98                   ; 0 (Thick) - 5.0 (Scattered)
   :visibility {:sunny     30
                :fair      20
                :poor      10
                :inclement 5}
   :stratus-base {:sunny     35000
                  :fair      30000
                  :poor      11300
                  :inclement 6300}
   ;; Sunny and fair cannot have thick stratus layers, and poor and
   ;; inclement must have the same top
   :stratus-top 13300
   :cumulus-base {:sunny     0
                  :fair      8000
                  :poor      7500
                  :inclement 2000}
   :contrails {:sunny     34000
               :fair      28000
               :poor      25000
               :inclement 20000}})

(defn random-int
  ([from to] (random-int from to 1))
  ([from to step]
   (let [range (- to from)
         steps (-> range (/ step) long inc)]
     (-> (rand)
         (* steps)
         long
         (* step)
         (+ from)))))

(defn random-cloud-params
  "Returns a plausible but random set of global weather paramaters."
  []
  (let [stratus-base (let [[i p f s] (sort (repeatedly
                                            4
                                            #(random-int
                                              1500
                                              40000
                                              500)))]
                       {:sunny s
                        :fair f
                        :poor p
                        :inclement i})
        stratus-top (+ (max (:poor stratus-base)
                            (:inclement stratus-base))
                       (random-int 500 10000 500))]
    {:cumulus-density (random-int 5 50)
     :cumulus-size (* 5.0 (rand))
     :visibility (let [[i p f s] (sort (repeatedly
                                        4
                                        ;; Under 2, we allow a decimal point
                                        #(let [r (random-int 0 30)]
                                           (if (< r 2)
                                             (/ (random-int 0 20) 10.0)
                                             r))))]
                   {:sunny s
                    :fair f
                    :poor p
                    :inclement i})
     :stratus-base stratus-base
     :stratus-top stratus-top
     ;; The BMS UI enforces that cumulus base must be at least 1000
     ;; feet below the stratus top, so we do, too
     :cumulus-base (let [[i p f] (sort (repeatedly
                                        3
                                        #(random-int 1000 22000 1000)))]
                     {:sunny 0
                      :fair (-> stratus-base
                                :fair
                                (- 1000)
                                (min f))
                      :poor (-> stratus-top
                                (- 1000)
                                (min p))
                      :inclement (-> stratus-top
                                     (- 1000)
                                     (min i))})
     :contrails (let [[i p f s] (sort (repeatedly
                                       4
                                       #(random-int 2000 40000 1000)))]
                  {:sunny s
                   :fair f
                   :poor p
                   :inclement i})}))

(defc cloud-params
  default-cloud-params)

(defc movement-params {:step 60
                       :direction {:heading 135 :speed 20}
                       :looping? false})

(def initial-size (let [[window-width window-height] @window-size]
                    (max 250 (min window-width
                                  (- window-height 140)))))

(defc display-params {:dimensions [initial-size initial-size]
                      :opacity    0.75
                      :display    :type
                      :map        :korea
                      :mouse-mode :select
                      :overlay    :wind
                      :pressure-unit :inhg
                      :flight-paths nil
                      :multi-save {:mission-name nil
                                   :from {:day 1 :hour 5 :minute 0}
                                   :to {:day 1 :hour 10 :minute 0}
                                   :step 60}})

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

(defc messages [])

(defc mission nil)

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
            (:current time))
     (swap! display-params
            update
            :multi-save
            (fn [{:keys [from to] :as ms}]
              (assoc ms
                     :from (:current time)
                     :to (-> to
                             model/falcon-time->minutes
                             (- (model/falcon-time->minutes from))
                             (+ (model/falcon-time->minutes (:current time)))
                             model/minutes->falcon-time)))))))

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

(defn mission-name-base
  "Compute the extensionless name of the mission file, or default to
  'weathergen'."
  [mission-name]
  (if (empty? mission-name)
    "weathergen"
    (let [i (.lastIndexOf mission-name ".")]
      (if (neg? i)
        mission-name
        (subs mission-name 0 i)))))

(defn safari-safe-binary
  [blob]
  ;; https://github.com/Stuk/jszip/issues/279
  (if safari?
    (js/Blob. #js [blob]
              #js {:type "application/octet-stream"})))

(defn save-data
  [blob filename]
  (js/saveAs blob filename))

(defn fmap-filename
  "Returns the filename for an FMAP at time `t`."
  [t]
  (gstring/format "%d%02d%02d.fmap"
                  (:day t)
                  (:hour t)
                  (:minute t)))

(defn twx-filename
  [mission-name]
  (str (mission-name-base mission-name) ".twx"))

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
    (save-data (safari-safe-binary blob) (fmap-filename t))))

;; TODO: make these functional instead of relying on the global state?
(defn settings-blob
  []
  (js/Blob. #js [(pr-str {:weather-params @weather-params
                          :movement-params @movement-params
                          :display-params @display-params
                          :cloud-params @cloud-params
                          :revision revision})]
            #js{:type "text/plain"}))

(defn settings-filename
  [mission-name]
  (str (mission-name-base mission-name) ".wgs.edn"))

(defn save-settings
  [_]
  (save-data (settings-blob)
             (settings-filename (get-in @display-params [:multi-save :mission-name]))))

(defn twx-blob
  "Returns a JS blob containing TWX file data."
  [cloud-params direction]
  (js/Blob. #js [(twx/get-twx cloud-params direction)]))

(defn save-twx
  "Initiates a download of a TWX file."
  [cloud-params direction mission-name]
  (save-data (safari-safe-binary (twx-blob cloud-params direction))
             (twx-filename mission-name)))

(defn load-file
  "Asynchronously loads a file. Opts can include `:extensions` a CSV
  of extensions to accept. Extensions must start with a period."
  ([cb read-fn] (load-file cb read-fn {}))
  ([cb read-fn opts]
   (let [{:keys [extensions]} opts
         attrs (cond-> {:type "file"}
                 extensions (assoc :accept extensions))
         i (input attrs)
         ch (async/chan)]
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
             (read-fn reader file))))))))

(defn load-text-file
  ([cb] (load-text-file cb {}))
  ([cb opts]
   (load-file
    cb
    (fn [reader file]
      (.readAsText reader file))
    opts)))

(defn load-file-name
  "Asks the user to open a file, does nothing with its contents, and
   asynchronously sets cell `c` to the filename."
  ([c] (load-file c {}))
  ([c opts]
   (load-file
    ;; We're not doing anything with the contents - all we need is the name.
    (fn [contents name]
      (log/debug "Received name" name)
      (reset! c name))
    (fn [reader file]
      (.readAsArrayBuffer reader file))
    opts)))

(defn load-settings
  [_]
  (load-text-file
   (fn [contents name]
     (let [data (-> contents
                    reader/read-string
                    (model/upgrade revision))
           ;; Conversions for the upgrade from the first public
           ;; release to the second
           data (cond-> data
                  (-> data :display-params :multi-save nil?)
                  (assoc-in [:display-params :multi-save]
                            {:mission-name nil
                             :from         (-> data :weather-params :time :current)
                             :to           (-> data :weather-params :time :current (model/add-time (* 6 60)))
                             :step         (-> data :movement-params :step)}))]
       (dosync
        (let [{:keys [time]} (reset! weather-params (:weather-params data))]
          (reset! display-params (:display-params data))
          (reset! movement-params (:movement-params data))
          (swap! time-params assoc :displayed (:current time))))))
   {:extensions ".edn"}))

(defn load-dtc
  [_]
  (load-text-file
   (fn [contents name]
     (log/debug "load-dtc" :name name)
     (let [dtc  (dtc/parse contents)
           flight-path (dtc/flight-path dtc)
           lines (dtc/lines dtc)]
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
                       :show-numbers? true
                       :show-lines? true
                       :uniquifier (rand-int 1000000)
                       :color "#FFFFFF"
                       :path flight-path
                       :lines lines
                       :scale 0.5})))))
   {:extensions ".ini"}))

;; TODO: probably going to need to run this on a worker.
(defn load-mission
  "Prompts the user for a mission file to load, and loads it."
  []
  (when-let [[path] (-> electron
                      .-remote
                      .-dialog
                      (.showOpenDialog
                       #js {:title "Select a campaign or tactical engagement file"
                            :openFile true
                            :filters #js [#js {:name "Campaign file"
                                               :extensions #js ["cam"]}
                                          #js {:name "Tactical engagement file"
                                               :extensions #js ["tac"]}]
                            #_[(js/FileFilter. #js
                                               {:name "Campaign file"
                                                :extensions #js [".cam"]})
                               #_(js/FileFilter. )]}))]
    (reset! mission (mission/read-mission path))))

(def zipbuilder-worker
  (let [worker (js/Worker. "worker.js")
        command-ch (async/chan)
        result-ch (async/chan)
        output-ch (async/chan)]
    (-> worker
        .-onmessage
        (set! #(go (async/>! result-ch (->> % .-data decode)))))
    {:command-ch command-ch
     :worker worker
     :output-ch output-ch
     ;;:result result-ch
     :loop (go-loop []
             (let [params (async/<! command-ch)]
               (.postMessage worker (encode params))
               (async/>! output-ch (async/<! result-ch))
               (recur)))}))

(defn multi-download
  [{:keys [weather-params cloud-params weather-direction mission-name
           nx ny from to step progress cancel]}]
  (let [cells (for [x (range nx)
                    y (range ny)]
                [x y])
        start (model/falcon-time->minutes from)
        end (model/falcon-time->minutes to)
        steps (-> end (- start) (/ step) long inc)
        zip (js/JSZip.)
        folder (.folder zip "WeatherMapsUpdates")]
    (go-loop [t start
              first-done? false]
      (let [p (-> t (- start) (/ (- end start)) (min 1))]
        (log/debug "progress" p)
        (reset! progress p))
      (if (< end t)
        (-> zip
            (.file (twx-filename mission-name)
                   (twx-blob cloud-params weather-direction)
                   #js {:binary true})
            (.file (settings-filename mission-name)
                   (settings-blob)
                   #js {:binary true})
            (.generateAsync (if safari?
                              ;; https://github.com/Stuk/jszip/issues/279
                              #js {:type "blob" :mimeType "application/octet-stream"}
                              #js {:type "blob"}))
            (.then (fn [blob]
                     (save-data blob (str (mission-name-base mission-name) ".zip"))
                     (reset! progress nil))))
        (do
          (async/>! (:command-ch zipbuilder-worker)
                    (-> weather-params
                        (assoc-in [:time :current]
                                  (model/minutes->falcon-time t))
                        (assoc :cells cells)))
          (let [data (async/<! (:output-ch zipbuilder-worker))
                blob (fmap/get-blob data nx ny)]
            (when-not first-done?
              (.file zip
                     (str (mission-name-base mission-name) ".fmap")
                     blob
                     #js {:binary true}))
            (.file folder
                   (fmap-filename (model/minutes->falcon-time t))
                   blob
                   #js {:binary true}))
          (if @cancel
            (reset! progress nil)
            (recur (+ t step) true)))))))

;;; Help

(defn with-help
  [help-path & contents]
  (let [help-ctor (get-in help/content help-path)
        [css contents] (if (= (first contents) :css)
                         [(second contents) (drop 2 contents)]
                         [{} contents])
        open? (cell false)
        doc-click (fn click-fn [e]
                    (.removeEventListener js/document "click" click-fn)
                    (reset! open? false))]
    (div
     :class "help"
     :css (merge {:cursor "url(images/helpcursor.png) 4 4, auto"
                  :border-bottom (if help-ctor
                                   "dashed 1px blue"
                                   ;; This is to clue me in to write help.
                                   "dashed 2px red")}
                 css)
     :click (fn [e]
              (when (swap! open? not)
                (with-timeout 0
                  (.addEventListener js/document "click" doc-click))))
     (div
      :fade-toggle open?
      :class "content"
      :css {:white-space "normal"
            :font-weight "normal"}
      (if help-ctor
        (help-ctor)
        [(p "Help has not yet been written for this feature.")
         (p (str help-path))]))
     contents)))

(defn help-icon
  [help-path]
  (let [help? (get-in help/content help-path)]
    (with-help help-path
      :css {:border-bottom "none"}
      ;; A circle - maybe want to make this a control at some point
      (div
       :css {:width "18px"
             :height "18px"
             :color "white"
             ;; The color change reminds me to write help
             :background (if help? "darkblue" "darkred")
             :border-radius "9px"
             :text-align "center"
             :display "inline-block"
             :margin-right "3px"
             :margin-left "3px"
             :font-size "80%"}
       "?"))))

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

(defn format-type
  "Returns a string describing a weather type."
  [type]
  (case type
    :sunny "Sunny"
    :fair "Fair"
    :poor "Poor"
    :inclement "Incl."))

(defn format-pressure
  "Format a pressure in inches Mercury as appropriate for the unit."
  [inhg unit]
  (if-not inhg
    ""
    (if (= :inhg unit)
      (.toFixed inhg 2)
      (-> inhg inhg->mbar (.toFixed 0)))))

(defn format-temperature
  "Format a temperature string"
  [temp]
  (if-not temp
    ""
    (.toFixed temp 0)))

(defn format-wind
  "Format a wind string."
  [wind]
  (if-not wind
    ""
    (let [{:keys [speed heading]} wind]
      (str (gstring/format "%03d" heading)
           "@"
           (gstring/format "%02d" (.toFixed speed 0))
           "kts"))))

(defn format-visibility
  "Format a visibility so that only numbers below 1 get decimal places."
  [vis]
  (if-not vis
    ""
    (if (< vis 2)
      (.toFixed vis 1)
      (.toFixed vis 0))))

(defn format-coords
  [x y]
  (str x ", " y))

(defn cloud-descriptions
  [cloud-params type]
  (if (= type :sunny)
    ["SKC"]
    (let [stratus-base (get-in cloud-params [:stratus-base type])
          cumulus-base (get-in cloud-params [:cumulus-base type])
          cumulus-density (:cumulus-density cloud-params)
          density-str (if (< 25 cumulus-density)
                        "SCT"
                        "FEW")
          cumulus-level (gstring/format "%03d" (-> cumulus-base (/ 100) long))
          stratus-level (gstring/format "%03d" (-> stratus-base (/ 100) long))]
      (cond-> []
        (and (pos? cumulus-base)
             (< cumulus-base stratus-base))
        (conj (str density-str cumulus-level " "))

        (not= type :fair)
        (conj (str "OVC" stratus-level))))))

(defn contrail-description
  [cloud-params type]
  (gstring/format "COTRA%03d"
                  (-> cloud-params
                      :contrails
                      (get type)
                      (/ 100)
                      long)))

(defn format-cloud
  "Returns a string describing the clouds for the given weather type."
  [cloud-params type]
  (str (->> (cloud-descriptions cloud-params type)
            (interpose " ")
            (reduce str))
       " "
       (contrail-description cloud-params type)))

(defn format-precipitation
  "Returns a string describing precipitation."
  [temperature type]
  (if (= type :inclement)
    (if (pos? temperature)
      "Rain"
      "Snow")
    "None"))

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

(defn path-lens
  "Returns a lens over a `get-in` style path `p` into cell `c`."
  [c p]
  (lens
   (formula-of
    [c]
    (get-in c p))
   (fn [v]
     (swap! c assoc-in p v))))

;;; Global Styles
(def colors
  {:invalid       "#c70505"
   :invalid-background "#fcc"
   :error-message "#c70505"
   :edit "rgba(128,128,255,0.5)"
   :header-background "lightgray"})

(def resize-handle-size 0.75)

(defn image-button-style
  [pressed?]
  {:border-style (if pressed? "inset" "outset")
   :border-color "#ddd"
   :border-radius "6px"
   :padding "2px"
   :width "16px"
   :height "16px"
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

(defn contrasting
  "Returns a color that contrasts well with the specified color."
  [color]
  ;; http://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
  (let [rgb (-> color js/tinycolor .toRgb)
        ;; Advanced compilation is somehow screwing up direct field
        ;; access, so we have to go in by name.
        r (aget rgb "r")
        g (aget rgb "g")
        b (aget rgb "b")]
    (if (< 128 (+ (* r 0.299) (* g 0.587) (* b 0.114)))
      "black"
      "white")))

;;; Controls

(defelem color-picker
  [attrs _]
  (with-let [i (input attrs
                      :class "minicolors"
                      :type "hidden")]
    (when-dom i
      #(-> i js/jQuery (.minicolors #js {"theme" "weathergen"})))))

(defelem triple-border
  "Creates a three-layer border with :inner and :outer colors."
  [attrs contents]
  (let [{:keys [inner outer css]} attrs
        attrs (dissoc attrs :inner :outer :css)]
    (div
     :css (->> css
               (merge {:border-width "1px"
                       :border-style "solid"
                       :border-color outer
                       :margin 0
                       :padding 0})
               cell=)
     (div
      :css (->> css
                (merge {:border-width "2px"
                        :border-style "solid"
                        :border-color inner
                        :margin 0
                        :padding 0})
                cell=)
      (div
       :css (->> css
                 (merge {:border-width "1px"
                         :border-style "solid"
                         :border-color outer
                         :margin 0})
                 cell=)
       contents)))))

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

(defelem control-subsection
  "Renders a bordered box with a title bar."
  [attributes children]
  (let [{:keys [title]} attributes]
    (div
     (dissoc attributes :title)
     :css {:border "solid 1px #444"
           :margin "3px"
           :padding-bottom "2px"}
     (div
      :css {:background (colors :header-background)
            :margin "3px"
            :padding "3px"
            :padding-top 0
            :font-size "90%"
            :font-weight "bold"}
      title)
     children)))

(defn forecast-section
  [{:keys [forecast-link? limit-time?]
    :as opts}]
  (control-section
   :title (with-help [:forecast :overview] "Forecast")
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
                   :coordinates (str "Location " (format-coords x y))
                   :named ""
                   :none "None selected"))
         (for [ab airbases]
           (option :value ab
                   :selected (= ab (:location selected-cell))
                   ab)))))
     (if-not forecast-link?
       []
       [(a :css {:margin-left "5px"}
           :href (formula-of
                  [weather-params
                   display-params
                   movement-params
                   cloud-params]
                  (str "forecast.html?data="
                       (with-time "encoding shareable forecast"
                         (encoding/data->base64
                          {:weather-params weather-params
                           :display-params display-params
                           :movement-params movement-params
                           :cloud-params cloud-params}))))
           :target "_blank"
           "Shareable Forecast")
        (help-icon [:forecast :share])])
     (formula-of
      [pressure-unit
       forecast
       cloud-params]
      (let [td1 (fn [& args] (apply td
                                    :css {:padding-right "3px"
                                          :padding-left "3px"}
                                    args))
            td2 (fn [& args] (apply td
                                    :css {:padding-right "3px"
                                          :padding-left "3px"
                                          :text-align "center"}
                                    args))]
        (table
         :class "info-grid"
         (thead
          (tr (td1(with-help [:forecast :time] "Day/Time"))
              (td1 (with-help [:forecast :type] "Type"))
              (td1 (with-help [:forecast :pressure] "Press"))
              (td2 (with-help [:forecast :temperature] "Temp"))
              (td2 (with-help [:forecast :wind] "Wind"))
              (td2 (with-help [:forecast :visibility] "Vis"))
              (td1 (with-help [:forecast :precipitation] "Precip"))
              (td1 (with-help [:forecast :cloud] "Cloud"))))
         (tbody
          (if-not forecast
            (tr (td :colspan 8
                    "No location is selected. Choose a location from the list, or click on the weather map to select one."))
            (for [[time weather] forecast
                  :let [{:keys [pressure temperature wind type]} weather]]
              (tr (td1 (format-time time))
                  (td1 (format-type type))
                  (td1 (format-pressure pressure pressure-unit))
                  (td2 (format-temperature temperature))
                  (td1 (format-wind wind))
                  (td2 (format-visibility (get-in cloud-params [:visibility type])))
                  (td1 (format-precipitation temperature type))
                  (td1 (format-cloud cloud-params type)))))))))))))

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

(def max-wind-vector-speed 150)

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
      (svg/g
       :id (wind-vector-id speed)
       (wind/barb speed)))))

(defn info-overlay
  [hover-cell weather-data pressure-unit nx ny cloud-params]
  (let [{:keys [x y]} hover-cell]
    (if (not (and x y (<= 0 x (dec nx)) (<= 0 y (dec ny))))
      []
      (let [width 13
            height 8
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
           (let [cloud-descriptions (cloud-descriptions cloud-params type)]
             (for [[line [label value]] (map-indexed
                                         vector
                                         [["Location" (format-coords x y)]
                                          ["Pressure" (format-pressure pressure pressure-unit)]
                                          ["Temp" (format-temperature temperature)]
                                          ["Wind" (format-wind wind)]
                                          ["Vis" (format-visibility (get-in cloud-params [:visibility type]))]
                                          ["Precip" (format-precipitation temperature type)]
                                          ["Cloud" (format-cloud cloud-params type)]])]
               [(svg/text
                 :x 0.2
                 :y (+ line 1.2)
                 (str label ":"))
                (svg/text
                 :x 4
                 :y (+ line 1.2)
                 value)]))))]))))

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

(defn line->path
  [size line]
  (loop [[point & more] line
         s nil]
    (if-let [{:keys [::dtc/coordinates]} point]
      (let [{:keys [::dtc/x ::dtc/y]} coordinates
            [gx gy] (coords/falcon->grid size x y)]
        (recur more
               (str s
                    (when s " ")
                    (if s "L" "M")
                    (gstring/format "%f,%f" gx gy))))
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
  (let [ ;; cells
        flightpaths (formula-of
                     [display-params]
                     (->> display-params
                          :flight-paths))
        indexes (-> flightpaths count range cell=)
        ;; Styling
        opacity             0.8
        label-stroke-width  0.01
        narrow-stroke-width 0.1
        lines-stroke-dasharray-on 0.1
        lines-stroke-dasharray-off 0.1
        wide-stroke-width   0.15
        font-size           4           ; Percent
        font-weight         400
        marker-size         0.4
        background-opacity  0.4
        strokes (fn [color]
                  [[wide-stroke-width (contrasting color)]
                   [narrow-stroke-width color]])
        magnify (fn [scale]
                  (->> scale (* 1.5) (+ 1)))]
    (svg/g
     :id "flight-paths-overlays"
     (formula-of
      [indexes]
      (for [index indexes
            :let [flightpath (formula-of [flightpaths] (get flightpaths index))
                  show? (-> flightpath :show? cell=)
                  show-lines? (-> flightpath :show-lines? cell=)
                  path (-> flightpath :path cell=)
                  lines (-> flightpath :lines cell=)
                  magnification (-> flightpath :scale magnify cell=)
                  color (-> flightpath :color cell=)
                  anticolor (-> color contrasting cell=)
                  strokes (-> color strokes cell=)]]
        (svg/g
         :attr {:class "flight-path-overlay"}
         :toggle show?
         ;; The lines
         (formula-of
          [strokes magnification lines]
          (for [line lines]
            (svg/g
             :attr {:class "steerpoint-line"}
             :toggle show-lines?
             (for [[stroke-width stroke-color] strokes]
               (svg/path
                :stroke stroke-color
                :stroke-width (* stroke-width magnification 0.75)
                :stroke-dasharray (str lines-stroke-dasharray-on lines-stroke-dasharray-off)
                :fill "none"
                :pointer-events "none"
                :opacity opacity
                :d (line->path size line)))
             (svg/g
              :attr {:class "steerpoint-line-markers"}
              (for [{:keys [::dtc/coordinates]} line
                    :let [{:keys [::dtc/x ::dtc/y]} coordinates
                          [gx gy] (coords/falcon->grid size x y)]]
                (svg/circle
                 {:pointer-events "none"
                  :fill           "none"
                  :opacity        opacity}
                 :attr {:transform (gstring/format "translate(%f,%f)" gx gy)}
                 :cx 0
                 :cy 0
                 :r (/ (* marker-size magnification) 2)))))))
         ;; The flight path route itself
         (formula-of
          [strokes magnification]
          (for [[stroke-width stroke-color] strokes]
            (svg/path
             :stroke stroke-color
             :stroke-width (* stroke-width magnification)
             :fill "none"
             :pointer-events "none"
             :opacity opacity
             :d (formula-of [path] (flight-path->path size path)))))
         (formula-of
          [path]
          (for [{:keys [::dtc/coordinates ::dtc/ordinal ::dtc/alternate? ::dtc/action]} path
                :let [{:keys [::dtc/x ::dtc/y]} coordinates
                      [gx gy] (coords/falcon->grid size x y)
                      style {:pointer-events "none"
                             :fill           "none"
                             :opacity        opacity}]]
            (svg/g
             :attr {:transform (gstring/format "translate(%f,%f)" gx gy)}
             ;; Steerpoint markers
             [(formula-of
               [strokes magnification]
               (for [[stroke-width stroke-color] strokes
                     :let [style (assoc style
                                        :opacity opacity
                                        :stroke stroke-color
                                        :stroke-width (* 0.6 stroke-width magnification))]]
                 (if (#{:cap :strike :bomb :sead :elint} action)
                   (triangle
                    style
                    :r (/ (* marker-size magnification) 2))
                   (svg/circle
                    style
                    :cx 0
                    :cy 0
                    :r (/ (* marker-size magnification) 2)))))
              ;; Steerpoint labels
              (formula-of
               {show-labels? (-> flightpath :show-labels? cell=)
                show-numbers? (-> flightpath :show-numbers? cell=)
                magnification magnification}
               (let [txt (cond
                           ;; TODO: This whole setup is suboptimal.
                           ;; Seems like what you really want is to be
                           ;; able to decide, for each steerpoint,
                           ;; whether it gets a number or a label, and
                           ;; to be able to do the same thing for the
                           ;; whole setup all-up. It's similar to the
                           ;; PPT problem - still need a solution.
                           (and show-labels? alternate?)
                           "Alternate Field"

                           (and show-labels? (= action :refuel))
                           (when show-labels? "Tanker")

                           :else
                           (when show-numbers? (inc ordinal)))
                     tw (cell 0)
                     th (cell 0)
                     tx (cell 0)
                     ty (cell 0)
                     t (svg/text
                        :stroke color
                        :stroke-width (* label-stroke-width magnification)
                        :fill color
                        :font-size (str (* font-size magnification) "%")
                        :text-anchor "middle"
                        :opacity opacity
                        :x 0
                        :y (- (* marker-size magnification))
                        txt)
                     r (svg/rect
                        :x tx
                        :y ty
                        :width tw
                        :height th
                        :fill anticolor
                        :opacity background-opacity)]
                 (when-dom t
                   #(dosync
                     (let [bb (.getBBox t)]
                       (when (.-x bb)
                         (reset! tx (.-x bb))
                         (reset! ty (.-y bb))
                         (reset! tw (.-width bb))
                         (reset! th (.-height bb))))))
                 (svg/g
                  :display (if (some? txt) "normal" "none")
                  r
                  t)))])))
         (svg/g
          :class "steerpoint-lines"
          (formula-of
           [lines]
           ))))))))

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
                                  [effective-hover-cell weather-data pressure-unit cloud-params]
                                  (info-overlay effective-hover-cell
                                                weather-data
                                                pressure-unit
                                                nx ny
                                                cloud-params))]
    (with-let [elem (svg/svg
                     :id "grid"
                     (let [dims (formula-of
                                 [display-params]
                                 ;; Edge doesn't render right, so we
                                 ;; have to make a little extra room
                                 (map #(- % 7) (:dimensions display-params)))]
                       (-> attrs
                           (dissoc :display-params
                                   :selected-cell
                                   :weather-data
                                   :wind-stability-areas
                                   :weather-overrides)
                           (assoc :viewBox (gstring/format "0 0 %d %d" nx ny)
                                  :width (cell= (first dims))
                                  :height (cell= (second dims))
                                  :attr {"xmlns:xlink" "http://www.w3.org/1999/xlink"
                                         "xmlns" "http://www.w3.org/2000/svg"})))
                     :mouseleave (fn [_]
                                   (dosync
                                    (reset! hover-cell nil)))
                     :mousedown (fn [e]
                                  (when @drag-handler
                                    (reset! drag-start (grid-coords e))))
                     ;; Overriding dragstart stops Firefox from trying
                     ;; to drag and drop SVG as images, which would
                     ;; interfere with our drag/resize functionality.
                     :dragstart (constantly false)
                     wind-vector-defs
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
                                       :flight-paths
                                       :multi-save))]
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
                  (->> items
                       (filter #(= value (:value %)))
                       first))
        _ (formula-of
           [selected])]
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

(defn parse-int
  "Parses an int from a string, returning the int, or nil if it cannot
  be parsed as an int."
  [s]
  (let [n (-> s js/Number. .valueOf)
        l (long n)]
    (when (int? n)
      l)))

;; Conformers are functions that take a cell containing a string value
;; to conform, and return a cell (presumably a formula of the input
;; cell) that yields a map containing keys:
;;
;; :valid? - True if the value is acceptable
;; :message - Text describing the problem if any
;; :value - The parsed
;;
;; Note that even if :valid? is false, value may still contain a
;; value, for those cases wher ethe value could be parsed, but is not
;; actually valid, like an altitude that's out of bounds. This is
;; useful in cases where the invalid value is affected by other
;; values, and may become valid due to changes elsewhere.

(defn conform-nonnegative-integer
  [s]
  (formula-of
   [s]
   (let [parsed (parse-int s)
         valid? (and parsed
                     (not (neg? parsed)))]
     {:valid? valid?
      :message (when-not valid?
                 "Must be whole number, greather than or equal to zero.")
      :value parsed})))

(defn conform-positive-integer
  [s]
  (formula-of
   [s]
   (let [parsed (parse-int s)
         valid? (and parsed (pos? parsed))]
     {:valid? valid?
      :message (when-not valid?
                 "Must be an integer greater than zero.")
      :value parsed})))

(defn int-conformer
  "Returns a conformer that will ensure a value parses to an int
  between `from` and `to`, inclusive."
  [from to]
  (let [message (gstring/format "Must be an integer between %d and %d."
                                from to)]
    (fn [s]
      (formula-of
       [s]
       (let [parsed (parse-int s)
             valid? (and parsed (<= from parsed to))]
         {:valid? parsed
          :message (when-not parsed
                     message)
          :value parsed})))))

(defn float-conformer
  "Returns a conformer that will ensure a value parses to a floating
  point number between `from` and `to`, inclusive."
  [from to]
  (let [message (gstring/format "Must be a number between %f and %f."
                                from to)]
    (fn [s]
      (formula-of
       [s]
       (let [n (-> s js/Number. .valueOf)
             valid? (<= from n to)]
         {:valid? valid?
          :message (when-not valid?
                     message)
          :value (when-not (js/isNaN n)
                   n)})))))

(defn compose-conformers
  "Given two conformers, returns a conformer that will validate only
  if both of them do. Checks c1 first."
  [c1 c2]
  (fn [s]
    (let [p1 (c1 s)
          p2 (c2 s)]
     (formula-of
      [p1 p2]
      (if (:valid? p1)
        p2
        p1)))))

(defelem validating-edit
  "Renders a control that will provide feedback as to whether the
  contents are valid.

  :conform : A function of one argument, a cell containing the current
  value of the control. Returns a call whose value is a map with keys
  `:valid?`, `:value`, and `:message`, expressing whether the value is
  valid, and if not, why not.
  :fmt : A function that turns the validated value into a displayable
  string
  :source: A cell containing the source data for the input control.
  :update: A function that will be called with the new, valid value.
  Defaults to setting the source cell.
  :width: Width in pixels of the input area.
  :placeholder: Placeholder when input is empty.
  :css: Styling applied to container div."
  [{:keys [conform fmt source update width placeholder css] :as attrs}
   _]
  (let [attrs (dissoc attrs :source :conform :update :width :fmt :placeholder :css)
        interim (cell nil)
        fmt (or fmt str)
        value (formula-of
               [interim source]
               (if interim
                 interim
                 (fmt source)))
        parsed (conform value)
        update (or update
                   #(swap! source
                           (constantly %)))
        state (cell :set)
        focused? (cell false)
        valid? (formula-of
                [parsed]
                (empty? (:message parsed)))]
    (div
     attrs
     :css (merge {:position "relative"
                  :overflow "show"
                  :white-space "nowrap"
                  :width (or width "125px")}
                 css)
     (let [i (input :type "text"
                    :placeholder placeholder
                    :input #(do
                              (reset! interim @%)
                              (reset! state :editing)
                              #_(if (and (:valid? @parsed)
                                         (= (:value @parsed) @source))
                                  (dosync
                                   (reset! state :set)
                                   (reset! interim nil))
                                  (reset! state :editing)))
                    :change #(let [p @parsed]
                               (when-let [v (:value p)]
                                 (dosync
                                  (update v)
                                  (reset! interim nil)
                                  (reset! state :set))))
                    :keyup (fn [e]
                             (when (= ESCAPE_KEY (.-keyCode e))
                               (dosync
                                (reset! interim nil)
                                (reset! state :set))))
                    :focus #(reset! focused? true)
                    :blur #(let [p @parsed]
                             (log/debug "blur happening" :p p)
                             (dosync
                              (reset! focused? false)
                              (when-let [v (:value p)]
                                (log/debug "blur has value" :v v)
                                (update v)
                                (reset! interim nil)
                                (reset! state :set)
                                (log/debug "blur done"))))
                    :css (formula-of
                          [state valid?]
                          {:font-style (if (= state :editing)
                                         "italic"
                                         "")
                           :color (if valid?
                                    ""
                                    (colors :invalid))
                           :background (if valid?
                                         ""
                                         (colors :invalid-background))
                           :width (or width "125px")})
                    :value value)]
       [i
        (img :src "images/error.png"
             :title (cell= (:message parsed))
             :click #(.focus i)
             :css (formula-of
                   [valid?]
                   {:position "relative"
                    :right "20px"
                    :width "14px"
                    :margin-left "3px"
                    :margin-bottom "2px"
                    :vertical-align "middle"
                    :opacity (if valid?
                               "0"
                               "1")}))])
     (div
      :toggle (cell= (and (not valid?) focused?))
      :css {:position "absolute"
            :top "24px"
            :font-size "75%"
            :background "rgba(221,221,221,0.95)"
            :border "1px solid #888"
            :min-width "100%"
            :max-width "500px"
            :padding-left "2px"
            :z-index 1}
      (cell= (:message parsed))))))

;; TODO: We could consider using a lens here instead of separate
;; source and update
(defelem time-edit
  [{:keys [source update] :as attrs} _]
  (validating-edit
   attrs
   :width "65px"
   :fmt format-time
   :placeholder "dd/hhmm"
   :conform (fn [val]
              (formula-of
               [val]
               (let [[all dd hh mm] (re-matches #"(\d+)/(\d\d)(\d\d)" val)
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
                          :minute min}})))))

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
                  (log/debug "mouse down in image button")
                  (let [up (fn up-fn [e]
                             (.removeEventListener js/document "mouseup" up-fn)
                             (reset! down false))]
                    (.addEventListener js/document "mouseup" up))
                  (reset! down true))
     attrs)))

(defn button-bar
  []
  (div :class "button-bar"
       :css (formula-of
             [display-params]
             {:position "relative"
              :width (-> display-params :dimensions first (str "px"))
              :margin "0 0 3px 0"})
       (button :id "enlarge-grid"
               :click #(swap! display-params
                              update
                              :dimensions
                              (fn [[x y]]
                                [(+ x 50) (+ y 50)]))
               :title "Enlarge grid"
               (img
                :css {:width "24px"
                      :height "24px"}
                :src "images/bigger.png"))
       (button :id "shrink-grid"
               :click #(swap! display-params
                              update
                              :dimensions
                              (fn [[x y]]
                                [(- x 50) (- y 50)]))
               :title "Shrink grid"
               (img
                :css {:width "24px"
                      :height "24px"}
                :src "images/smaller.png"))
       (with-help [:map :legend]
         :css {:margin-left "5px"}
         (span "Map Legend"))
       (span
        :css {:position "absolute"
              :right "27px"
              :bottom "0"}
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
               :width "24px"
               :height "24px"
               :css {:vertical-align "bottom"
                     :position "absolute"
                     :right "3px"
                     :bottom "0"})))))

(defn control-layout
  "Lays out controls for a control section. `controls` is a sequence
  of [label selector opts] tuples, where `opts` is a map with
  keys :extra, :type, :help-base, :help-paths, :cell, or :ui."
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
    [["Seed"             [:seed] {:ui (div
                                       :css {:white-space "nowrap"}
                                       (edit-field weather-params [:seed])
                                       (button
                                        :css {:width "75px"}
                                        :click #(swap! weather-params
                                                       assoc
                                                       :seed
                                                       (+ (rand-int 5000) 100))
                                        "Random"))}]
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
                (image-button-style (:editing? area))))
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
                            (tr
                             (or row-attrs [])
                             (td
                              :colspan 2
                              (input :css {:width "25px"}
                                     :type "checkbox"
                                     :value (cell= (k override))
                                     :change (or change
                                                 (fn [_]
                                                   (swap! weather-params
                                                          update-in
                                                          [:weather-overrides @index k]
                                                          not))))
                              (with-help [:weather-overrides k]
                                (label l))))))]
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

(defmulti cloud-param-conformer
  (fn [params column category] column))

(defmethod cloud-param-conformer :default
  [params column category]
  (int-conformer 0 99999))

(defmethod cloud-param-conformer :visibility
  [params column category]
  (float-conformer 0 30))

(defmethod cloud-param-conformer :stratus-base
  [params column category]
  (fn [val-c]
    (let [conformer (int-conformer 0 99999)
          conformed (conformer val-c)]
     (formula-of
      [params conformed]
      (let [stratus-top (:stratus-top params)]
        (cond
          (not (:valid? conformed))
          conformed

          (and (#{:poor :inclement} category)
               (< stratus-top (:value conformed)))
          {:valid? false
           :message "Stratus base must be below stratus top."
           :value (:value conformed)}

          :else
          conformed))))))

(defmethod cloud-param-conformer :stratus-top
  [params column category]
  (fn [val-c]
    (let [ic (int-conformer 0 99999)
          conformed (ic val-c)]
      (formula-of
       [params conformed]
       (let [stratus-base (max (get-in params [:stratus-base :poor])
                               (get-in params [:stratus-base :inclement]))]
         (cond
           (not (:valid? conformed))
           conformed

           (and (#{:poor :inclement} category)
                (< (:value conformed) stratus-base))
           {:valid? false
            :message "Stratus base must be below stratus top."
            :value (:value conformed)}

           :else
           conformed))))))

(defmethod cloud-param-conformer :cumulus-base
  [params column category]
  (fn [val-c]
    (let [ic (int-conformer 0 99999)
          conformed (ic val-c)]
      (formula-of
       [params conformed]
       (let [stratus-top (if (#{:sunny :fair} category)
                           (get-in params [:stratus-base category])
                           (:stratus-top params))]
         (cond
           (not (:valid? conformed))
           conformed

           (< (- stratus-top 1000) (:value conformed))
           {:valid? false
            :message "Cumulus base must be at least 1000 feet below stratus top."
            :value (:value conformed)}

           :else
           conformed))))))

(defn cloud-controls
  [opts]
  (control-section
   :title (with-help [:clouds :overview] "Clouds and contrails")
   :id (gensym)
   (help-icon [:clouds :buttons])
   (button
    :css {:margin-right "3px"}
    :click #(reset! cloud-params (random-cloud-params))
    "Randomize")
   (button
    :click #(save-twx @cloud-params
                      (:direction @movement-params)
                      (get-in @display-params [:multi-save :mission-name]))
    "Save .TWX")
   (table
    (tr (td (with-help [:clouds :cumulus-coverage]
              "Cumulus coverage"))
        (td :css {:text-align "right"}
            "5%")
        (let [l (path-lens cloud-params
                           [:cumulus-density])]
          (td (input
               :type "range"
               :value l
               :min 5
               :max 50
               :change #(reset! l (long @%)))))
        (td "50%"))
    (tr (td (with-help [:clouds :cumulus-size]
              "Cumulus qty/size"))
        (td (div "Fewer/" (br) "Larger"))
        (let [l (path-lens cloud-params
                           [:cumulus-size])]
          (td (input
               :type "range"
               :value (-> l (* 20) long cell=)
               :min 0
               :max 100
               :change #(reset! l (/ (long @%) 20.0)))))
        (td :css {:text-align "right"}
            (div "More/" (br) "Smaller"))))
   (table
    (thead
     (let [header (fn [path words]
                    (td (map #(div
                               (with-help path
                                 %))
                             words)))]
       (tr :css {:text-align "center"}
           (td)
           (header [:clouds :visibility] ["Visibility"])
           (header [:clouds :stratus-base] ["Stratus" "Base"])
           (header [:clouds :stratus-top] ["Stratus" "Top"])
           (header [:clouds :cumulus-base] ["Cumulus" "Base"])
           (header [:clouds :contrails] ["Contrails"]))))
    (tbody
     (for [category [:sunny :fair :poor :inclement]]
       (tr (td
            :class (str "weather-type " (name category))
            :css {:background-color (let [[r g b] (weather-color category)]
                                      (str "rgb(" r "," g "," b ")"))}
            (type-key->name category))
           (for [column [:visibility :stratus-base :stratus-top :cumulus-base :contrails]]
             (td
              (let [path [column category]
                    literal-style {:font-family "monospace"
                                   :padding-left "3px"
                                   :padding-top "2px"
                                   :font-size "93%"}]
                (cond
                  (and (= :stratus-top column)
                       (#{:sunny :fair} category))
                  (div :css literal-style
                       (formula-of
                        [cloud-params]
                        (get-in cloud-params [:stratus-base category])))

                  (= [:cumulus-base :sunny] [column category])
                  (div :css literal-style "0")

                  (= [:stratus-top :inclement] path)
                  (div
                   :css literal-style
                   (formula-of
                    [cloud-params]
                    (:stratus-top cloud-params)))

                  :else
                  (let [l (path-lens
                           cloud-params
                           (if (= column :stratus-top)
                             [:stratus-top]
                             path))]
                    (div
                     :css {:margin-right "5px"}
                     (validating-edit
                      :source l
                      :fmt (if (= column :visibility)
                             format-visibility
                             str)
                      :conform (cloud-param-conformer cloud-params column category)
                      :placeholder (case column
                                     :visibility "vis (nm)"
                                     "altitude")
                      :width (if (= column :visibility)
                               "35px"
                               "55px"))))))))))))))

(defn advanced-controls
  [_]
  (control-section
   :id "advanced-params-section"
   :title "Advanced configuration"
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
  (let [inline (fn [css & contents]
                 (apply div
                        :css (merge {:display "inline-block"
                                     :margin-right "5px"}
                                    css)
                        contents))]
    (control-section
     :id "load-save-controls"
     :title "Load/save"
     (if-not safari?
       []
       (let [p* #(p :css {:margin-bottom "3px"
                          :margin-top "3px"}
                    %&)]
         (div
          :css {:font-size "80%"}
          (p* "Due to a bug in Safari, settings files will open in a new
        tab Use the browser's File->Save As to save the file. Be sure
        to select 'Page Source' for the format. ")
          (p* "Due to the same bug, all other files will download with
        name 'Unknown'. For these, once downloaded rename it with the
        appropriate extension: .fmap for FMAPs, .twx for TWX files,
        and .zip for weather packages.")
          (p* "Better still, don't use Safari. This application works
        best in Chrome, but has also been tested in Firefox and
        Internet Explorer."))))
     (control-subsection
      :title (with-help [:serialization-controls :save-single-files]
               "Load/Save individual files")
      (div
       :css {:display "flex"
             :flex-direction "row"
             :vertical-align "middle"}
       #_(help-icon [:display-controls :save-single-file-buttons])
       (div
        :class "button-container"
        (a :click #(save-fmap @weather-params @weather-data)
           :class "button"
           "Save Current as FMAP"))
       (div
        :class "button-container"
        (a
         :class "button"
         :click #(save-twx @cloud-params
                           (:direction @movement-params)
                           (get-in @display-params
                                   [:multi-save :mission-name]))
         "Save .TWX"))
       (div
        :class "button-container"
        (a
         :class "button"
         :click save-settings
         "Save Settings"))
       (div
        :class "button-container"
        (a :class "button" :click load-settings "Load Settings"))))
     (control-subsection
      :title (with-help [:serialization-controls :multi-save :overview]
               "Save weather package")
      (let [row (fn [label help-path edit]
                  (div
                   :css {:display "flex"
                         :flex-direction "row"
                         :margin "0 2px 3px 2px"}
                   (div
                    :css {:white-space "nowrap"
                          :width "50px"
                          :margin-left "3px"}
                    (with-help help-path
                      label))
                   edit))]
        [(row "Mission:"
              [:serialization-controls :multi-save :mission-name]
              (let [l (path-lens display-params [:multi-save :mission-name])]
                [(validating-edit
                  :conform (fn [v]
                             (formula-of
                              [v]
                              (let [valid? (not-empty v)]
                                {:valid? valid?
                                 :message (when-not valid?
                                            "Mission name should be set when saving a weather package. It will default to 'weathergen'.")
                                 :value v})))
                  :source l
                  :placeholder "Name of mission file")
                 (div
                  :css {:margin-left "8px"
                        ;; Weird fix for Chrome bug, where clicking
                        ;; was getting eaten (I think) by the
                        ;; relatively-positioned error image in the
                        ;; text box to the left.
                        :z-index 2}
                  (image-button :src "images/file-open.png"
                                :width "14px"
                                :title "Load Mission File (.cam/.tac)"
                                :click load-mission))]))
         (row "From:"
              [:serialization-controls :multi-save :from]
              (time-entry display-params [:multi-save :from]))
         (row "To:"
              [:serialization-controls :multi-save :to]
              (time-entry display-params [:multi-save :to]))
         (row "Step:"
              [:serialization-controls :multi-save :step]
              (validating-edit
               :width "32px"
               :source (path-lens display-params [:multi-save :step])
               :conform conform-positive-integer
               :fmt str
               :placeholder "60"))])
      (let [progress (cell nil)
            cancelling? (cell false)]
        [(button :css (formula-of
                       [progress cancelling?]
                       {:width "105px"
                        :background
                        (if (and (not cancelling?) (some? progress))
                          (let [pct (long (* 100 progress))]
                            (gstring/format "linear-gradient(to right, lightblue, lightblue %f%%, white %f%%)"
                                            pct pct))
                          "white")})
                 :class "button"
                 :click (fn []
                          (if @progress
                            (dosync
                             (reset! cancelling? true))
                            (do
                              (reset! cancelling? false)
                              (multi-download {:weather-params @weather-params
                                               :cloud-params @cloud-params
                                               :weather-direction (:direction @movement-params)
                                               :mission-name (get-in @display-params [:multi-save :mission-name])
                                               :from (get-in @display-params [:multi-save :from])
                                               :to (get-in @display-params [:multi-save :to])
                                               :step (get-in @display-params [:multi-save :step])
                                               :progress progress
                                               :cancel cancelling?
                                               :nx (-> @weather-params :cell-count first)
                                               :ny (-> @weather-params :cell-count second)}))))
                 (formula-of
                  [progress cancelling?]
                  (cond
                    (and progress cancelling?) "Cancelling..."
                    progress "Cancel"
                    :else "Save Package")))])))))

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
   (let [data (cell [{"a" 1 "b" 2 "c" 3}
                     {"a" 4 "b" 5 "c" 6}
                     {"a" "a" "b" "b" "c" "c"}])
         columns (cell [{:id "a"
                         :name "A"
                         :field "a"}
                        {:id "b"
                         :name "B"
                         :field "b"}
                        {:id "c"
                         :name "C"
                         :field "c"}])]
     (slickgrid/slickgrid
      :data data
      :columns columns
      :options (cell {:enableColumnReorder false
                      :autoHeight true
                      :fullWidthRows true})
      :css { ;;:width "600px"
            :height "500px"}))
   (div :id "my-test-grid")
   #_(let [c1 (cell "hi")
           c2 (cell true)]
       [(when-tpl c2
          (.log js/console "Evaluated")
          (span c1))
        (button :click #(swap! c2 not) "toggle")
        (button :click #(swap! c1 str "x") "x")])
   #_(let [path (cell {:color "FFFFFF"})
           current-color (cell= (:color path))]
       (triple-border
        :inner current-color
        :outer (cell= (contrasting current-color))
        [(span (cell= (str current-color)))
         (color-picker
          :value current-color
          :change (fn [val opacity]
                    (swap! path assoc :color @val)))]))))

(defn flightpath-controls
  [_]
 (control-section
   :id "flightpath-controls"
   :title (with-help [:flight-paths :section]
            "Flight Paths")
   (let [indexes (formula-of
                  [display-params]
                  (->> display-params
                       :flight-paths
                       count
                       range))]
     (div
      :class "weather-override-boxes"
      (formula-of
       [indexes]
       (for [index indexes
             :let [path (path-lens display-params [:flight-paths index])]]
         (div
          :css {:margin-right "5px"}
          (triple-border
           :inner (-> path :color cell=)
           :outer (-> path :color contrasting cell=)
           (table
            (let [checkbox-row (fn checkbox
                                 ([l k {:keys [change row-attrs]}]
                                  (tr
                                   (or row-attrs [])
                                   (td
                                    (with-help [:flight-paths k]
                                      (label l)))
                                   (td
                                    (input :css {:width "25px"}
                                           :type "checkbox"
                                           :value (cell= (k path))
                                           :change (or change
                                                       (fn [_]
                                                         (swap! path update k not))))))))
                  label (formula-of
                         [path]
                         (-> path :label :value))
                  editor (input
                          :type "text"
                          :value label
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
              (tbody
               (tr (td (with-help [:flight-paths :name]
                         "Name"))
                   (td (formula-of
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
                           label)))
                       (image-button
                        :css {:width "12px"
                              :height "12px"}
                        :src (formula-of
                              [path]
                              (if (-> path :label :editing?)
                                "images/checkmark.png"
                                "images/edit.svg"))
                        :click (fn [_]
                                 (let [path* (swap! path update-in [:label :editing?] not)]
                                   (when (get-in path* [:label :editing?])
                                     (focus-later editor)))))))
               (checkbox-row "Show?" :show? {})
               (checkbox-row "Lines?" :show-lines? {})
               (checkbox-row "Numbers?" :show-numbers? {})
               (checkbox-row "Labels?" :show-labels? {})
               (tr (td (with-help [:flight-paths :color]
                         "Color"))
                   (td
                    (div
                     :css {:padding-left "5px"
                           :padding-top "2px"}
                     (color-picker
                      :value (cell= (:color path))
                      :change #(swap! path assoc :color @%)))))
               (tr (td (with-help [:flight-paths :scale]
                         "Size"))
                   (td
                    (input
                     :css {:width "50px"}
                     :type "range"
                     :min 0
                     :max 100
                     :value (-> path :scale (* 100) long cell=)
                     :change #(swap! path assoc :scale (/ @% 100.0)))))
               (tr (td
                    (image-button
                     :src "images/trash.png"
                     :click #(swap! display-params
                                    update
                                    :flight-paths
                                    (fn [paths]
                                      (remove-nth paths index)))))))))))))))
   (button :click load-dtc "Load DTC")))


(defn unit-lookup-by-id
  "Given a seq of units, return the one with the given id."
  [units id]
  (some (fn [unit]
          (when (= id (:id unit))
            unit))
        units))

(defn flights-section
  [_]
  (control-section
   :title "Flights"
   (formula-of [mission]
     (log/debug "mission changed"
                :units (-> mission :files :units :data count))
     (if-not mission
       "No mission loaded"
       (let [{flights :flight
              packages :package}
             (->> mission
                  :files
                  :units
                  :data
                  (group-by :type))]
         (if (-> flights count zero?)
           "No flights in mission, or no mission loaded."
           (let [td* (fn [& contents]
                       (td
                        :css {:padding-right "3px"}
                        contents))]
             (table
              :class "info-grid"
              (thead
               (td* "Team")
               (td* "Package")
               (td* "Callsign")
               (td* "Mission")
               (td* "T/O")
               (td* "TOT"))
              (for [flight flights
                    :let [package (unit-lookup-by-id packages (:package flight))]]
                (tr
                 (td* (->> flight :owner (mission/stringify mission :team-name)))
                 (td* (:name-id package))
                 (td* (:name flight))
                 (td* (->> flight :mission (mission/stringify mission :flight-mission)))
                 (td* (-> flight :waypoints first :depart format-time))
                 (td* (-> flight :time-on-target format-time))))))))))))

;;; General layout

(defn head
  []
  (h/head
   (title "WeatherGen")
   (link :href "lib/slickgrid/slick.grid.css" :rel "stylesheet" :title "main" :type "text/css")
   (link :href "lib/slickgrid/slick-default-theme.css" :rel "stylesheet" :title "main" :type "text/css")
   (link :href "jquery.minicolors.css" :rel "stylesheet" :title "main" :type "text/css")
   (link :href "style.css" :rel "stylesheet" :title "main" :type "text/css")
   (link :href "fonts/open-sans-condensed/open-sans-condensed.css"
         :rel "stylesheet"
         :type "text/css")
   ;; (script :src "js/jquery/jquery.event.drag-2.3.0.js")
   (style
    :type "text/css"
    ;; TODO: Move the rest of the stylesheet stuff into here
    (css
     ;; IE fixes
     [:fieldset
      {:padding-left "10px"}]
     [(css-sel/input (css-sel/attr= :type :range))
      {:padding "5px"}]
     ;; General
     [:.info-grid
      {:border-collapse "collapse"
              :border "solid 1px"}
      [:thead
       {:background "lightgray"
        :border-bottom "1px solid black"}]
      [:tr
       [(css-sel/& (css-sel/nth-child :even))
        {:background "#F2F0E0"}]]]
     ;; SlickGrid styling and overrides
     slickgrid/styles))))

(defelem body
  [{:keys [] :as attrs}
   contents]
  (h/body
   :css {:margin "8px"}
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
    ;; Messages
    (formula-of
     [messages]
     (for [message messages]
       (let [visible? (cell true)]
         (div
          :fade-toggle visible?
          :css {:border "double"
                :border-color "black"
                :background "#945594"
                :color "white"
                :position "relative"
                :margin-bottom "3px"}
          (div
           :css {:display "inline-block"
                 :padding-right "5px"}
           message)
          (div
           :css {:position "absolute"
                 :font-size "150%"
                 :font-weight "bold"
                 :top "-8px"
                 :right "5px"
                 :cursor "pointer"}
           :click #(reset! visible? false)
           "×")))))
    contents)))

(def sections
  {:serialization-controls serialization-controls
   :step-controls step-controls
   :display-controls display-controls
   :weather-parameters weather-parameters
   :forecast-section forecast-section
   :weather-type-configuration weather-type-configuration
   :cloud-controls cloud-controls
   :wind-stability-parameters wind-stability-parameters
   :weather-override-parameters weather-override-parameters
   :advanced-controls advanced-controls
   :flightpath-controls flightpath-controls
   :flights-section flights-section
   :test-section test-section})

(defn weather-page
  [& section-infos]
  (html
   (head)
   (body
    (let [right-width 575               ; Min width of controls column
          portrait? (formula-of
                     [display-params window-size]
                     (let [[grid-width grid-height] (:dimensions display-params)
                           [window-width window-height] window-size]
                       (< window-width (+ grid-width right-width -10))))]
      (div
       :css (formula-of
             {portrait? portrait?
              [window-width window-height] window-size}
             {:display "flex"
              :flex-direction (if portrait? "column" "row")
              ;; These next plus the overflow/height in the columns are
              ;; what let the two sides scroll separately
              :overflow (if portrait? "show" "hidden")
              :height (if portrait?
                        "100%"
                        (str (- window-height 90) "px"))})
       (div
        :class "left-column"
        :css (formula-of
              [portrait?]
              (if portrait?
                {}
                {:overflow "auto"
                 :height "auto"}))
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
       (div
        :class "right-column"
        :css (formula-of
              [portrait?]
              (merge {:display "block"
                      :align-content "flex-start"
                      :flex-wrap "wrap"
                      :flex-grow 1
                      :min-width (str (- right-width 20) "px")
                      ;;  This one weird trick keeps the column from expanding
                      ;;  past where it should. Yay CSS.
                      :width 0}
                     (when-not portrait?
                       {:overflow "auto"
                        :height "auto"})))
        (for [[section opts] (partition 2 section-infos)
              :let [ctor (sections section)]]
          (ctor opts)))))
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
