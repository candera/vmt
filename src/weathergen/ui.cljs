(ns weathergen.ui
  (:require ;;[cljsjs.filesaverjs]
            [clojure.data]
            [clojure.pprint :refer [pprint]]
            [clojure.set :as set]
            [clojure.string :as str]
            [garden.core :as css :refer [css]]
            [javelin.core
             :as j
             :refer [defc defc= cell cell= cell-let dosync lens with-let]]
            [hoplon.core
             :as h
             :refer [a
                     br
                     case-tpl code cond-tpl
                     datalist defelem div do! do-watch
                     fieldset for-tpl
                     hr html
                     if-tpl img input
                     label legend li link loop-tpl
                     ol optgroup option
                     p pre progress
                     script select span style
                     table tbody td text textarea thead title tr timeout
                     when-tpl with-dom with-init! with-timeout]]
            [hoplon.svg :as svg]
            [garden.selectors :as css-sel]
            [goog.dom :as gdom]
            [goog.crypt.base64 :as base64]
            [goog.events :as gevents]
            [goog.events.MouseWheelHandler]
            [goog.string :as gstring]
            [goog.string.format]
            [goog.style :as gstyle]
            [octet.core :as buf]
            [weathergen.canvas :as canvas]
            [weathergen.compression :refer [compress decompress]]
            [weathergen.coordinates :as coords]
            [weathergen.damage :as damage]
            [weathergen.database :as db]
            [weathergen.dtc :as dtc]
            [weathergen.encoding :refer [encode decode] :as encoding]
            [weathergen.falcon.constants :as c]
            [weathergen.falcon.files.images :as im]
            [weathergen.falcon.files.mission :as mission]
            [weathergen.falcon.install :as install]
            [weathergen.filesystem :as fs]
            [weathergen.fmap :as fmap]
            [weathergen.help :as help :refer [help-icon with-help]]
            [weathergen.ipc  :as ipc]
            [weathergen.math :as math]
            [weathergen.model :as model]
            [weathergen.progress :as progress]
            [weathergen.settings :as settings]
            [weathergen.time :as time]
            [weathergen.twx :as twx]
            [weathergen.ui.buttons :as buttons]
            [weathergen.ui.common :as comm :refer [colors control-section
                                                   dropdown
                                                   ems
                                                   get-image
                                                   format-time inl
                                                   map-lens
                                                   path-lens pct pre-cell px
                                                   styled team-color triangle
                                                   validating-edit
                                                   time-edit]]
            [weathergen.ui.grids :as grids]
            [weathergen.ui.layers.acmi]
            [weathergen.ui.layers.annotations]
            [weathergen.ui.layers.flights]
            [weathergen.ui.trees :as trees]
            [weathergen.ui.tabs :as tabs]
            [weathergen.util :as util]
            ;;[weathergen.ui.slickgrid :as slickgrid]
            [weathergen.wind :as wind]
            ;; [weathergen.route :as route]
            [cljs.core.async :as async
             :refer [<! >! alts!]]
            [cljs.reader :as reader]
            ;; TODO: Get rid of this once we stop being able to link out to shareable forecasts.
            [cljsjs.pako]
            ;;[secretary.core :refer-macros [defroute]]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)])
  (:require-macros
   [cljs.core.async.macros :refer [go go-loop]]
   [weathergen.cljs.macros :refer [with-key-lenses
                                   with-attr-bindings
                                   with-bbox
                                   with-time
                                   formula-of
                                   hint->
                                   hint->>
                                   keyed-for-tpl]])
  (:refer-clojure :exclude [load-file]))

;; (set! *warn-on-infer* true)

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

;;; Integration with the container and external libraries

(def ^js/electron electron (js/require "electron")
  #_(when (= "nodejs" cljs.core/*target*)
      (js/require "electron")))

;; Open all links in external browser
(.addEventListener js/document
                   "click"
                   (fn [event]
                     (when (and
                            (-> event .-target .-tagName (= "A"))
                            (-> event .-target .-href (.startsWith "http")))
                       (log/debug "Clicked a link" (-> event .-target .-href))
                       (.preventDefault event)
                       (-> electron
                           .-shell
                           (.openExternal (-> event .-target .-href))))))

(def ^js/EventEmitter ipcRenderer (.-ipcRenderer electron))

;;; State

(let [^js/window window (js/jQuery js/window)]
 (defc window-size
   [(.width window)
    (.height window)])

 (-> window
     (.resize #(reset! window-size
                       [(.width window)
                        (.height window)]))))

(def default-weather-params
  {:temp-uniformity 0.7
   :pressure        {:min 29 :max 31}
   ;; From Ahmed, cell count is a function of theater size:
   ;; #define CELLSIZE  57344
   ;; #define FMAP_CELLS_FROM_SIZE(s) round(floor((s*1000)*3.28084 / (double)CELLSIZE +1))
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
                                       #(random-int 20000 40000 1000)))]
                  {:sunny s
                   :fair f
                   :poor p
                   :inclement i})}))

(defc cloud-params
  default-cloud-params)

(defc movement-params {:step 60
                       :direction {:heading 135 :speed 20}
                       :looping? false})

;; Min width of controls column
(def controls-min-width 575)

;; Whether the titlebar is shown full size
(defc titlebar-fullsize? true)

(defc= titlebar-height (if titlebar-fullsize? 64 27))

;; Size of the SVG map
(def map-size (formula-of [window-size titlebar-height]
                (let [[window-width window-height] window-size
                      dim (max 250 (min (- window-width controls-min-width)
                                        (-> window-height
                                            (- titlebar-height)
                                            (- 57))))]
                  [dim dim])))

;; These are *weather* display options
(defc display-params {:opacity       0.33
                      :display       :type
                      ;; :map            :korea
                      :mouse-mode    :select
                      :overlay       nil #_:wind
                      :pressure-unit :inhg
                      :flight-paths  nil
                      :multi-save    {:mission-name nil
                                      :from         {:day 1 :hour 5 :minute 0}
                                      :to           {:day 1 :hour 10 :minute 0}
                                      :step         15}})

(defc map-display {:brightness              0.5 ; Range [0 1]
                   :text-size               0   ; Range [-1 1]
                   :icon-size               0   ; Range [-1 1]
                   :flight-path-size        0   ; Range [-1 1]
                   :show-text-background?   true
                   :show-airbase-status?    true
                   :show-airbase-squadrons? true
                   :show-bullseye?          true
                   :airbase-label-style     :all})

(defc= map-text-scale
  (->> map-display :text-size (Math/pow 4.0)))

(defc= map-icon-scale
  (->> map-display :icon-size (Math/pow 4.0)))

(defc= map-show-text-background?
  (:show-text-background? map-display))

(defc selected-cell nil)

(defc hover-cell nil)

;; Records the mouse location in weatherspace
(defc mouse-location nil)
;; Records raw mouse position in pixelspace
(defc mouse-raw-offset [0 0])

(defc suppress-bullseye-info-box? false)

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

(defc hide-empty-airbases? true)
(defc hide-inoperable-airbases? false)

(defc included-squadron-types #{})

(defc checked-airbases #{})

(defc highlighted-airbase nil)

(add-watch mission
           :reset-object-data-on-mission-change
           (fn [_ _ _ _]
             (dosync
              (reset! highlighted-airbase nil)
              (reset! checked-airbases #{}))))

;; Zoom and pan for the map

(defc settings (settings/load-settings))
;; TODO: Add a watch to save them back out

;; This is how much zoom you get for each "click" of the mousewheel
(defc= zoom-speed (or (:zoom-speed settings) 0.95))
(defc map-zoom 1)
(defc map-pan {:x 0 :y 0})

(def zoom-min 1)
(def zoom-max 200)

(def map-viewbox
  (formula-of [weather-params map-zoom map-pan]
    (let [[nx ny] (:cell-count weather-params)
          {:keys [x y]} map-pan]
      {:x x
       :y y
       :width (/ nx map-zoom)
       :height (/ ny map-zoom)})))

;; Either :edit or :briefing - :edit is for mission
;; creators. :briefing is for pilots just viewing it.
(defc display-mode :edit)

;; Contains the team numbers of the sides that are visible when in
;; briefing mode.
(defc visible-sides nil)
(def effective-visible-sides
  (formula-of [mission visible-sides display-mode]
    (cond
      (not mission)
      #{}

      (not visible-sides)
      (->> mission mission/sides set)

      (= :edit display-mode)
      (->> mission mission/sides set)

      :else
      visible-sides)))

(def visible-teams
  (formula-of [mission effective-visible-sides]
    (set
     (if (and mission effective-visible-sides)
       (->> mission
            mission/teams
            (filter #(->> % (mission/side mission) effective-visible-sides))
            (map mission/team-number))
       (mission/teams mission)))))

;; Free-form text briefing notes
(defc briefing-notes "")

(defn- parse-build-info
  "Parses the contents of the build.txt file into a map."
  [build-info]
  (->> build-info
       str/split-lines
       (remove str/blank?)
       (map (fn [line]
              (let [[name value] (str/split line #"=")]
                [(or name "")
                 (or value "")])))
       (into {})))

;; Data from the build.txt file
(def build-info
  (let [path (-> electron
                 .-remote
                 .-app
                 .getAppPath
                 (fs/path-combine "build.txt"))]
    (when (fs/exists? path)
      (->> path
           fs/file-text
           parse-build-info))))

(def tools-visible?
  "Whether or not the tools tab is visible"
  (cell false))

;;; Components

(def flight-paths-layer
  (weathergen.ui.layers.flights/create
   mission
   {:map-zoom                  map-zoom
    :map-text-scale            map-text-scale
    :map-show-text-background? map-show-text-background?
    :visible-teams             visible-teams}))

(def annotations-layer
  (weathergen.ui.layers.annotations/create
   mission
   {:map-viewbox                 map-viewbox
    :map-zoom                    map-zoom
    :map-text-scale              map-text-scale
    :map-icon-scale              map-icon-scale
    :suppress-bullseye-info-box? suppress-bullseye-info-box?
    :build-info                  build-info}))

(def acmi-layer
  (weathergen.ui.layers.acmi/create
   mission
   {:map-zoom                    map-zoom
    :map-text-scale              map-text-scale
    :map-icon-scale              map-icon-scale
    :suppress-bullseye-info-box? suppress-bullseye-info-box?}))

;;; Formulas

(defc= selected-cell-weather (get weather-data (:coordinates selected-cell)))

(defc= cell-count (:cell-count weather-params))

(defc= wind-stability-areas
  (->> weather-params
       :wind-stability-areas))

(defc= weather-overrides
  (:weather-overrides weather-params))

(def forecast (formula-of [selected-cell weather-params movement-params]
                (with-time "computing forecast"
                  (when selected-cell
                    (model/forecast
                     (:coordinates selected-cell)
                     (if-let [max-time (-> weather-params :time :max)]
                       (model/jump-to-time weather-params
                                           movement-params
                                           max-time)
                       weather-params)
                     movement-params
                     60
                     6)))))

#_(defc= airbases (->> (db/airbases (:map display-params))
                     (map :name)
                     sort))

(defc= location-type
  (cond
    (-> selected-cell :location not-empty) :named
    (:coordinates selected-cell) :coordinates
    :else :none))

(defc= pressure-unit (:pressure-unit display-params))

(defc= all-squadrons (->> mission
                          mission/order-of-battle
                          :air
                          (mapcat ::mission/squadrons)
                          (into #{})))

(defc= all-squadron-types (->> all-squadrons
                               (map #(mission/squadron-type mission %))
                               (into #{})))

(defc= included-squadrons
  (->> all-squadrons
       (filter #(included-squadron-types (mission/squadron-type mission %)))
       set))

(add-watch all-squadron-types
           :update-included-squadron-types
           (fn [_ _ _ n]
             (reset! included-squadron-types n)))

(defn- list-airbase?
  "Return true if an airbase be shown in the list of airbases."
  [airbase hide-empty? hide-inoperable? included-squadrons]
  (let [is-empty? (->> airbase
                       ::mission/squadrons
                       (filter included-squadrons)
                       count
                       zero?)
        is-inoperable? (-> airbase ::mission/status zero?)
        hide? (or (and is-empty? hide-empty?)
                  (and is-inoperable? hide-inoperable?))]
    (not hide?)))

(defc= all-airbases
  (some->> mission mission/order-of-battle :air))

(def listed-airbases
  (formula-of [all-airbases hide-empty-airbases? hide-inoperable-airbases? included-squadrons]
    (->> all-airbases
         (filter #(list-airbase? % hide-empty-airbases? hide-inoperable-airbases? included-squadrons))
         set)))

(def displayed-airbases
  (formula-of [checked-airbases listed-airbases]
    (set/intersection checked-airbases listed-airbases)))


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

(doseq [{:keys [^js/Worker worker ch]} workers]
  (-> worker
      .-onmessage
      (set! (fn [e] (go (async/>! ch (-> e (aget "data") decode)))))))

(declare move)

(defn- post-message
  "Helper function to post a message to a worker. Needed because the
  go-loop rewrites code so much I can't get type hints to work inside
  it."
  [^js/Worker worker message]
  (.postMessage worker message))

;; TODO: Handle commands other than "compute weather"
(go-loop []
  (let [[command params] (async/<! command-ch)]
    (doseq [{:keys [cells worker]} workers]
      #_(log/debug "Weather data sent to worker")
      ;; This is weird, but makes the compiler happy
      (post-message worker  (encode (assoc params
                                 :cells cells))))
    (reset! computing true)
    (.time js/console "compute-weather")
    (with-time "Receive weather results"
      (loop [chs (set (map :ch workers))
             data (hash-map)]
        #_(log/debug "Weather data received.")
        (if (empty? chs)
          (do
            (dosync
             (.timeEnd js/console "compute-weather")
             (reset! weather-data data)
             (reset! weather-data-params params))
            (when (:looping? @movement-params)
              (async/<! (async/timeout 500))
              (if (= (-> @weather-data-params :time :current time/campaign-time->minutes)
                     (-> @weather-data-params :time :max time/campaign-time->minutes))
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
         current-time   (-> @weather-params :time :current time/campaign-time->minutes)
         desired-time   (+ current-time minutes)
         new-time       (if-let [max-time (-> @weather-params :time :max)]
                          (min (time/campaign-time->minutes max-time)
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
  (let [desired  (:displayed @time-params)
        max-time (-> @weather-params :time :max)]
    (when (or (= :edit @display-mode)
            (not max-time)
            (<= (time/campaign-time->minutes desired)
                (time/campaign-time->minutes max-time)))
      (jump-to-time* (:displayed @time-params)))))

(defn set-time
  "Adjust the time coordinate so that the current time is adjusted to
  match the displayed time without changing the location in weather
  space."
  []
  (swap! weather-params
         model/set-time
         (:displayed @time-params)))

(defn change-location
  [mission airbase]
  (if (empty? airbase)
    (reset! selected-cell nil)
    (reset! selected-cell {:location airbase
                           :coordinates (-> mission
                                            (coords/fgrid->weather (:x airbase) (:y airbase))
                                            ((juxt :x :y))
                                            (->> (mapv long)))})))

;;; Serialization

(defn mission-name-base
  "Compute the extensionless name of the mission file, or default to
  'vmt'."
  [^js/String mission-name]
  (if (empty? mission-name)
    "vmt"
    (let [i (.lastIndexOf mission-name ".")]
      (if (neg? i)
        mission-name
        (subs mission-name 0 i)))))

(defn safari-safe-binary
  [blob]
  ;; https://github.com/Stuk/jszip/issues/279
  (if safari?
    (js/Blob. #js [blob]
              #js {:type "application/octet-stream"})
    blob))

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
  (let [t                 (get-in weather-params [:time :current])
        [x-cells y-cells] (:cell-count weather-params)
        ;; Since processing is async, it's possible the weather data
        ;; can be out of sync with respect to the weather parameters.
        ;; In that case, we compute synchronously.
        data              (if (= weather-params weather-data-params)
                            weather-data
                            (model/weather-grid (assoc weather-params
                                                       :cells (for [x (range x-cells)
                                                                    y (range y-cells)]
                                                                [x y]))))
        blob              (fmap/get-blob data
                                         x-cells
                                         y-cells)]
    (comm/save-data
     {:data     (safari-safe-binary blob)
      :title    "Save FMAP"
      :filters  {:name      "FMAP Files"
                 :extension ["fmap"]}
      :default-path (-> @mission :mission-name mission-name-base (str "-" (fmap-filename t)))})))

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
  (str (mission-name-base mission-name) ".vmtw"))

(defn save-weather-settings
  [_]
  (comm/save-data
   {:data         (pr-str {:weather-params  @weather-params
                           :movement-params @movement-params
                           :display-params  @display-params
                           :cloud-params    @cloud-params
                           :revision        revision})
    :title        "Save weather settings"
    :default-path (-> @mission :mission-name settings-filename)
    :filters      [{:name      "VMT Weather Settings"
                    :extension ["vmtw"]}]}))

(defn twx-blob
  "Returns a JS blob containing TWX file data."
  [cloud-params direction]
  (js/Blob. #js [(twx/get-twx cloud-params direction)]))

(defn save-twx
  "Initiates a download of a TWX file."
  [cloud-params direction mission-name]
  (comm/save-data
   {:data         (safari-safe-binary (twx-blob cloud-params direction))
    :title        "Save TWX"
    :filters      [{:name      "TWX Files"
                    :extension ["twx"]}]
    :default-path (twx-filename mission-name)}))

(defn load-weather-settings
  [_]
  (let [[path] (-> electron
                   .-remote
                   .-dialog
                   (.showOpenDialog
                    (clj->js
                     {:title       "Select a VMT or Weathergen Weather File"
                      :properties  ["openFile"]
                      :defaultPath (mission/campaign-dir @mission)
                      :filters     [{:name      "VMT Weather Settings"
                                     :extensions ["vmtw"]}
                                    {:name      "WeatherGen Settings"
                                     ;; Unfortunately, dots are a
                                     ;; no-no, so we can't limit it to
                                     ;; .wgs.edn files.
                                     :extensions ["edn"]}]})))]
    (when path
      (let [data (-> path
                     fs/file-text
                     reader/read-string
                     (model/upgrade revision))
            t    (mission/mission-time @mission)]
        (dosync
         (reset! weather-params (-> data
                                    :weather-params
                                    (assoc-in [:time :current] t)))
         (reset! display-params (-> data
                                    :display-params
                                    (assoc :multi-save
                                           {:mission-name nil
                                            :from         t
                                            :to           (time/add-minutes t (* 6 60))
                                            :step         (-> data :movement-params :step)})))
         (reset! movement-params (:movement-params data))
         (reset! cloud-params    (:cloud-params data))
         (swap! time-params assoc :displayed t))))))

#_(defn load-dtc
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

;; React to a mission load by updating various other dependent
;; settings.
(do-watch mission
          (fn [_ mission]
            (when mission
              (let [current (mission/mission-time mission)]
                (swap! display-params
                       update
                       :multi-save
                       (fn [ms]
                         (assoc ms
                                :from current
                                :to (time/add-minutes current (* 60 6)))))
                (swap! weather-params
                       model/jump-to-time
                       @movement-params
                       current)
                (swap! time-params
                       assoc-in
                       [:displayed]
                       current)))))

(defn load-mission
  "Loads a mission (.cam/.tac) mission file."
  [installs path]
  (with-time
    "load-mission"
    (let [mission-data (with-time "read-mission"
                         (mission/read-mission installs path))]
      (progress/with-step "Preparing views"
        #(dosync
          (reset! mission mission-data)
          ;; TODO: We'll have to keep this information elsewhere when we
          ;; refactor away from being WeatherGen
          (let [current (mission/mission-time @mission)]
            (reset! visible-sides
                    (->> mission-data
                         mission/last-player-team
                         (mission/side mission-data)
                         (hint->> cljs.core/Hashable)
                         hash-set))))))))

(def ^js/StringDecoder StringDecoder (aget (js/require "string_decoder") "StringDecoder"))

(defn- buf->string
  "Converts a buffer to a string."
  [buf]
  (.write (StringDecoder.) buf))

(defn- string->buf
  "Converts a buffer to a string."
  [s]
  (js/Buffer.from s))

(defn load-briefing
  "Loads a briefing (.vmtb) file given a path to a briefing and a map
  from installation names to their directories."
  [installations path]
  (progress/with-step "Reading briefing file"
    (fn []
      (let [{:keys [revision install-id briefing] :as vmtb}
            (->> path
                 fs/file-buffer
                 decompress
                 decode)]
        (log/debug "load-briefing"
                   :installations installations
                   :revision revision
                   :briefing? (some? briefing))
        (let [mission-data (progress/with-step (str "Loading briefing from " path)
                             (fn []
                               (let [briefing-version (get-in briefing [:build-info "VERSION"])
                                     this-version     (get build-info "VERSION")]
                                 (when-not (= briefing-version this-version)
                                   (progress/step-warn
                                    (str
                                     "The version used to save this briefing file was "
                                     (or briefing-version "(no version present)")
                                     ". The version of VMT you are running is "
                                     (or this-version "(no version present)")
                                     ". While different versions of VMT generally work just fine together, if anything doesn't work right you might want to make sure you and the mission creator are using the same version."))))
                               (mission/briefing->mission installations briefing)))
              unedit       (fn [m] (assoc m :editing? false))]
          (progress/with-step "Preparing views"
            (fn []
              (dosync
               (reset! display-mode :briefing)
               (swap! map-display assoc :hide-wind-stability? true)
               (reset! mission mission-data)
               (reset! visible-sides (:visible-sides vmtb))
               (reset! weather-params (-> vmtb
                                          :weather
                                          :weather-params
                                          (update :wind-stability-areas #(map unedit %))
                                          (update :weather-overrides #(map unedit %))
                                          (assoc-in [:time :max] (mission/mission-time mission-data))))
               (reset! cloud-params (-> vmtb :weather :cloud-params))
               (reset! movement-params (-> vmtb :weather :movement-params))
               (reset! display-params (-> vmtb :weather :display-params))
               (reset! briefing-notes (-> vmtb :briefing-notes (or "")))
               (weathergen.ui.layers.annotations/load-briefing-data
                annotations-layer
                (-> vmtb :annotations))))))))))

(defn save-briefing
  "Prompts the user for a path and saves a briefing file to it."
  [install-id visible-sides]
  (comm/save-data
   {:data         (->> {:revision       revision
                        :vmt-version    (get build-info "VERSION")
                        :briefing       (mission/mission->briefing @mission install-id build-info)
                        :weather        {:weather-params  @weather-params
                                         :cloud-params    @cloud-params
                                         :movement-params @movement-params
                                         :display-params  @display-params}
                        :visible-sides  visible-sides
                        :briefing-notes @briefing-notes
                        :annotations    (weathergen.ui.layers.annotations/briefing-data annotations-layer)}
                       encode
                       compress)
    :title        "Save a briefing file"
    :default-path (-> @mission :mission-name mission-name-base (str ".vmtb"))
    :filters      [{:name      "VMT Briefing"
                    :extension ["vmtb"]}]}))

(def weather-worker
  (let [^js/Worker worker (js/Worker. "worker.js")
        command-ch (async/chan)
        result-ch (async/chan)
        output-ch (async/chan)]
    (-> worker
        .-onmessage
        (set! (fn [e]
                #_(.log js/console "weather-worker received message" e)
                (go (async/>! result-ch (-> e .-data decode))))))
    {:command-ch command-ch
     :worker worker
     :output-ch output-ch
     ;;:result result-ch
     :loop (go-loop []
             (let [params (async/<! command-ch)]
               (.postMessage worker (encode params))
               (async/>! output-ch (async/<! result-ch))
               (recur)))}))

(defn save-weather-files
  [{:keys [weather-params cloud-params weather-direction mission-name
           nx ny from to step save-file progress cancel campaign-dir]}]
  (let [cells (for [x (range nx)
                    y (range ny)]
                [x y])
        start (time/campaign-time->minutes from)
        end (time/campaign-time->minutes to)
        steps (-> end (- start) (/ step) long inc)
        updates-dir (fs/path-combine campaign-dir "WeatherMapsUpdates")
        save-blob (fn [blob path]
                    (reset! save-file path)
                    (comm/save-blob-async blob
                                          (fs/path-combine
                                           campaign-dir
                                           path)))]
    (go-loop [t start
              first-done? false]
      (let [p (-> t (- start) (/ (- end start)) (min 1))]
        (log/debug "progress" p)
        (reset! progress p))
      (if (< end t)
        (do
          (save-blob (twx-blob cloud-params weather-direction)
                     (twx-filename mission-name))
          (save-blob (settings-blob)
                     (settings-filename mission-name))
          (reset! progress nil))
        (do
          (async/>! (:command-ch weather-worker)
                    (-> weather-params
                        (assoc-in [:time :current]
                                  (time/minutes->campaign-time t))
                        (assoc :cells cells)))
          (let [data (async/<! (:output-ch weather-worker))
                blob (fmap/get-blob data nx ny)]
            (when-not first-done?
              (save-blob blob
                         (str (mission-name-base mission-name) ".fmap")))
            (save-blob blob
                       (fs/path-combine
                        "WeatherMapsUpdates"
                        (fmap-filename (time/minutes->campaign-time t)))))
          (if @cancel
            (reset! progress nil)
            (recur (+ t step) true)))))))



;;; Help


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

#_(def map-image
  {:korea "images/kto.jpg"
   :balkans "images/balkans.png"
   :israel "images/ito.jpg"
   :kuriles "images/kuriles.png"})

#_(defn map-image-id
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
  (condp = type
    :sunny "Sunny"
    :fair "Fair"
    :poor "Poor"
    :inclement "Incl."))

(defn format-pressure
  "Format a pressure in inches Mercury as appropriate for the unit."
  [^js/Number inhg unit]
  (if-not inhg
    ""
    (if (= :inhg unit)
      (.toFixed inhg 2)
      (-> inhg inhg->mbar (hint-> js/Number) (.toFixed 0)))))

(defn format-temperature
  "Format a temperature string"
  [^js/Number temp]
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
           (gstring/format "%02d" (-> speed (hint-> js/Number) (.toFixed 0)))
           "kts"))))

(defn format-visibility
  "Format a visibility so that only numbers below 1 get decimal places."
  [^js/Number vis]
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

;; TODO: get all the various coordinate systems sorted out. Maybe use
;; records or something to permit auto conversion?
(defn bullseye
  "Returns bullseye (a map of `:heading` and `:distance`) given
  weatherspace coordinates (a map of `:x` and `:y`)."
  [mission {:keys [x y]}]
  (let [{:keys [bullseye-x bullseye-y]} (-> mission :campaign-info)]
    (gstring/format "%f %f (%d %d)"
                    x y bullseye-x bullseye-y)))

(defn format-bullseye
  "Returns a bullseye string given bullseye coordinates."
  [bullseye]
  (if-not bullseye
    ""
    (let [{:keys [heading distance]} bullseye]
      (gstring/format "%03d %d"
                      (let [h (-> heading (mod 360) long)]
                        (if (zero? h)
                          360
                          h))
                      (long distance)))))

(defn mouse-weather-coords
  "Given a mouse event, determined where on the map it occurred, in weatherspace.
  Returns coordinates as an [x y] pair, where x and y can be
  fractional."
  ([e] (mouse-weather-coords e @map-zoom @map-pan))
  ([e zoom pan]
   (try
     (let [browser-zoom   (.-devicePixelRatio js/window)
           ox             (-> e (aget "offsetX") (* browser-zoom))
           oy             (-> e (aget "offsetY") (* browser-zoom))
           [nx ny]        (:cell-count @weather-params)
           {:keys [x y]}  pan
           [width height] @map-size]
       [(-> ox (* nx) (/ width)  (/ zoom) (/ browser-zoom) (+ x))
        (-> oy (* ny) (/ height) (/ zoom) (/ browser-zoom) (+ y))])
     (catch :default err
       (log/error err "mouse-weather-coords error" :e e)))))

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

;;; Global Styles
(def resize-handle-size 0.75)

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
  [{:keys [limit-time?]
    :as opts}]
  (control-section
   :title (with-help [:forecast :overview] "Forecast")
   :id "forecast-section"
   (div
    :id "forecast"
    (div
     (label :for "locations"
            "Forecast for:")
     ;; formula-of
     ;; [location-type
     ;;  mission
     ;;  selected-cell]
     (let [airbases (->> mission
                         mission/oob-air
                         (sort-by #(mission/objective-name mission %))
                         cell=)]
       (cell-let [{:keys [coordinates]} selected-cell
                  [x y] coordinates]
         ;; TODO: It's not good enough to just set the value of the
         ;; `selected` attribute - that won't cause the browser to
         ;; actually change the selected item. You have to change the
         ;; select's selectedIndex property, too. The `dropdown` elem
         ;; should help with this.
         (select
          :id "locations"
          :change #(change-location @mission (nth @airbases (util/str->long @%)))
          (option :selected (cell= (not= :named location-type))
                  :value ""
                  (formula-of [location-type x y]
                    (condp = location-type
                      :coordinates (str "Location " (format-coords x y))
                      :named ""
                      :none "None selected")))
          (for-tpl [indexed (cell= (map-indexed vector airbases))]
            (cell-let [[index ab] indexed]
              (option :value index
                      :selected (cell= (= ab (:location selected-cell)))
                      (cell= (mission/objective-name mission ab))))))))
     #_(vector
      (a :css {:margin-left "5px"}
         :href (formula-of
                 [weather-params
                  display-params
                  movement-params
                  cloud-params]
                 (str "http://firstfighterwing.com/weathergen/forecast.html?data="
                      (with-time "encoding shareable forecast"
                        (encoding/data->base64
                         {:weather-params weather-params
                          :display-params display-params
                          :movement-params movement-params
                          :cloud-params cloud-params}))))
         :target "_blank"
         "Shareable Forecast")
      (help-icon [:forecast :share]))
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
           (tr (td1 (with-help [:forecast :time] "Weather Time"))
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
  (condp = display
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
                  ^js/SVGRectElement cell (gdom/getElement (str "grid-wind-cell-" x "-" y))]]
      (.setAttribute cell
                     "transform"
                     (comm/svg-rotate heading))
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
  (-> weather :temperature (hint-> js/Number) (.toFixed 1)))

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
                  ^js/SVGTextElement cell (gdom/getElement (str "grid-text-cell-" x "-" y))]]
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
    #_(log/debug "updating primary layer"
               :display (:display display-params)
               :sample (get weather-data [20 20]))
    (doseq [[[x y] weather] weather-data
            :let [[r g b a] (fill-color (:display display-params) weather)
                  ^js/SVGRectElement cell (gdom/getElement (str "grid-primary-cell-" x "-" y))]]
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

(defn wind-vector-defs
  []
  (svg/defs
    (for [speed (range 5 (inc max-wind-vector-speed) 5)]
      (svg/g
       :id (wind-vector-id speed)
       (wind/barb speed)))))

(defn bullseye-info-box
  []
  (let [watched (formula-of [mouse-location map-zoom]
                  [mouse-location map-zoom])]
    (with-bbox :x x :y y :w w :h h :watch watched
      [^js/SVGTextElement t (svg/text
                             :x 0
                             :y 0
                             :font-size "3.5%"
                             :font-family "Source Code Pro"
                             :font-weight 100
                             :stroke "black"
                             :stroke-width 0.03
                             :fill "black"
                             (svg/tspan (cell= (str (some->>
                                                     mouse-location
                                                     (coords/weather->bullseye mission)
                                                     format-bullseye)
                                                    ;; Debug mouse position
                                                    ;; "(" (first mouse-raw-offset) ", " (second mouse-raw-offset) ")"
                                                    ))))]
      (svg/g
       :debug "bullseye-info-box"
       :toggle (cell= (and (some? mouse-location)
                           (not suppress-bullseye-info-box?)))
       :svg/transform (formula-of [mouse-location map-zoom map-size]
                        (let [{:keys [x y]}  mouse-location
                              [width height] map-size]
                          (comm/svg-translate (-> x (+ (/ (/ 1000.0 width)  map-zoom)))
                                              (-> y (+ (/ (/ 1250.0 height) map-zoom))))))
       (svg/g
        :svg/transform (cell= (comm/svg-scale (/ map-text-scale map-zoom)))
        (svg/rect
         :x (cell= (* w -0.05))
         :y (cell= (- (* 0.8 h)))
         :width (cell= (* w 1.1))
         :height h
         :fill "white"
         :opacity 0.8)
        t)))))

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
          :attr {:transform (comm/svg-translate
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
      [indexed map-display]
      (svg/g
       :id "wind-stability-overlay"
       (for [[index area] indexed]
         (let [{:keys [bounds editing?]} area
               {:keys [x y width height]} bounds
               {:keys [hide-wind-stability?]} map-display
               mousedown (fn [e]
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
                                     (reset! prevent-recomputation? false))))))))]
           (svg/g
            :css {:display (when (and (not editing?) hide-wind-stability?)
                             "none")}
            (svg/rect
             :fill (if editing? (colors :edit) "none")
             :mousedown mousedown
             :css {:cursor (when editing? "move")
                   :border-width 0}
             :x x
             :y y
             :width width
             :height height)
            (svg/rect
             :fill "none"
             :stroke "black"
             :stroke-width 0.2
             :stroke-dasharray "0.6 0.6"
             :x x
             :y y
             :width width
             :height height)
            (svg/rect
             :fill "none"
             :stroke "white"
             :stroke-width 0.2
             :stroke-dasharray "0.6 0.6"
             :stroke-dashoffset 0.6
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
                                      (reset! prevent-recomputation? false)))))))))))))))))

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
         landed? false
         s nil]
    (if-let [{:keys [::dtc/coordinates ::dtc/action]} point]
      (let [{:keys [::dtc/x ::dtc/y]} coordinates
            [gx gy] (coords/ffeet->weather size x y)]
        (if landed?
          s
          (recur more
                 (or landed? (= action :land))
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
            [wx wy] (coords/ffeet->weather size x y)]
        (recur more
               (str s
                    (when s " ")
                    (if s "L" "M")
                    (gstring/format "%f,%f" wx wy))))
      s)))

(defn airbase-info-id
  [airbase]
  (str "airbase-info-" (:camp-id airbase)))

(defn airbase-status-color
  "Returns the color a status bar should be given the status of an
  airbase."
  [status]
  (cond
    (< 75 status) "green"
    (< 25 status) "orange"
    :else         "red"))

(defn airbase-info-overlay
  "Renders the airbase portion of the info overlay."
  [mission airbase]
  (let [icon-scale        0.05 ; How big the icons are: converts from
                                        ; pixels in the Falcon resources to SVG
                                        ; coordinates
        coords            (formula-of [mission airbase] (coords/fgrid->weather mission (:x airbase) (:y airbase)))
        x                 (formula-of [coords] (:x coords))
        y                 (formula-of [coords] (:y coords))
        label             (formula-of [airbase] (::mission/name airbase))
        camp-id           (formula-of [airbase] (:camp-id airbase))
        visible?          (formula-of [displayed-airbases airbase] (displayed-airbases airbase))
        highlighted?      (formula-of [highlighted-airbase airbase] (= highlighted-airbase airbase))
        font-size         "3.5%" #_ (formula-of [map-zoom] (str (/ 3.5 map-zoom) "%"))
        color             (formula-of [mission airbase]
                            (team-color (->> airbase
                                             :owner
                                             (mission/side mission))
                                        :light-text))
        text-stroke-width 0.03   #_ (formula-of [map-zoom] (/ 0.03 map-zoom))
        contrasting-color (formula-of [color] (comm/contrasting color))]
    (svg/g
     :debug "airbase-info-overlay"
     (when-tpl (cell= (or visible? highlighted?))
       (svg/g
        :id (cell= (airbase-info-id airbase))
        :airbase label
        :transform (formula-of [x y map-zoom]
                     (when (and x y)
                       (comm/svg-xform-combine
                        (comm/svg-translate x y)
                        (comm/svg-scale (/ 1.0 map-zoom)))))
        (let [label-style             (-> map-display :airbase-label-style cell=)
              label-spacing           0.2
              line-height             0.75
              status                  (cell= (::mission/status airbase))
              dims                    (formula-of [airbase]
                                        (let [image                 (::mission/image airbase)
                                              {:keys [image-data]}  image
                                              {:keys [size center]} image-data
                                              [w h]                 size
                                              [cx cy]               center]
                                          {:x (-> cx (- w) (* icon-scale))
                                           :y (-> h (- cy) - (* icon-scale))
                                           :w (* w icon-scale)
                                           :h (* h icon-scale)
                                           :d (-> cy (* icon-scale))}))
              show-airbase-status?    (path-lens map-display [:show-airbase-status?])
              show-airbase-squadrons? (path-lens map-display [:show-airbase-squadrons?])
              width                   1.0
              height                  0.2
              x                       (cell= (+ (:x dims) (/ (- (:w dims) width) 2)))
              y                       (cell= (- (:y dims) (* 2 height)))]
          (svg/g
           :debug "airbase-and-highlighter"
           ;; :opacity (formula-of [highlighted-airbase airbase]
           ;;            (cond
           ;;              (= highlighted-airbase airbase) 1
           ;;              highlighted-airbase 0.7
           ;;              :else 1))
           (when-tpl highlighted?
             (svg/g
              :debug "highlights"
              (svg/circle
               :debug "moving highlight"
               :svg/class (formula-of [highlighted?]
                            (when highlighted? comm/collapse-class))
               :x x
               :y y
               :r 60
               :stroke "yellow"
               :stroke-width 2
               :stroke-dasharray "5, 5"
               :fill "none"
               :transform (comm/svg-scale 0))
              (svg/circle
               :debug "static highlight"
               :svg/class (formula-of [highlighted?]
                            (when highlighted? comm/delayed-fade-out-class))
               :x x
               :y y
               :r 2.5
               :stroke "none"
               :fill "yellow"
               :opacity 0)))
           (svg/g
            :debug "icon-and-info"
            :svg/class (formula-of [highlighted?]
                         (when highlighted? comm/pulse-class))
            (when-tpl show-airbase-status?
              (svg/g
               :debug "status"
               :transform (cell= (comm/svg-scale map-icon-scale))
               (svg/rect
                :x x
                :y y
                :width width
                :height height
                :stroke "black"
                :stroke-width 0.03
                :fill "white")
               (svg/rect
                :x x
                :y y
                :width (-> width (* status) (/ 100) cell=)
                :height height
                :stroke "black"
                :stroke-width 0.03
                :fill (cell= (airbase-status-color status)))))
            (let [text-y-offset (cell= (+ label-spacing (* map-icon-scale (+ (:y dims) (:h dims)))))
                  bbox-trigger  (cell= #{included-squadrons label-style text-y-offset})]
              (with-bbox :y ty :w tw :h th :watch bbox-trigger
                [^js/SVGElement t (svg/text
                                   :font-size "3.5%"
                                   :font-family "Source Code Pro"
                                   :font-weight 100
                                   :x (-> dims :x (+ (/ (- (:w dims) tw) 2)) cell=)
                                   :y line-height
                                   :stroke color
                                   :stroke-width 0.03
                                   :fill color
                                   (svg/tspan label)
                                   (for-tpl [indexed (formula-of [airbase included-squadrons label-style]
                                                       (when (= label-style :all)
                                                         (->> airbase
                                                              ::mission/squadrons
                                                              (filter included-squadrons)
                                                              (map-indexed vector))))]
                                     (cell-let [[i squadron] indexed]
                                       (svg/tspan
                                        :y (-> i (+ 2) (* line-height) cell=)
                                        :text-anchor "start"
                                        :x (-> tw (/ 2) - cell=)
                                        :dx "0.75em"
                                        (cell= (gstring/format "%d %s"
                                                               (->> squadron ::mission/aircraft :quantity)
                                                               (->> squadron ::mission/aircraft :airframe)))))))]
                (svg/g
                 (when-tpl (-> label-style (not= :nothing) cell=)
                   (svg/g
                    :debug "label"
                    :transform (cell= (comm/svg-translate 0 text-y-offset))
                    (svg/g
                     :transform (cell= (comm/svg-scale map-text-scale))
                     (when-tpl map-show-text-background?
                       (let [padding 0.1
                             tx      (formula-of [dims tw]
                                       (-> dims :x (+ (/ (- (:w dims) tw) 2))))
                             rx      (formula-of [tx] (- tx padding))
                             ry      (formula-of [ty] (- ty padding))
                             rw      (formula-of [tw] (+ tw padding padding))
                             rh      (formula-of [th] (+ th padding padding))]
                         (svg/g
                          :debug "background"
                          ;; :transform (cell= (comm/svg-translate (/ tw -2) 0))
                          (svg/rect
                           :x rx
                           :y ry
                           :width rw
                           :height rh
                           :opacity 0.4
                           :fill contrasting-color
                           :stroke "none"))))
                     t)))
                 (svg/g
                  :transform (cell= (comm/svg-scale map-icon-scale))
                  (when-tpl show-airbase-squadrons?
                    (svg/g
                     :debug "squadron icons"
                     :transform (comm/svg-translate 0.5 0)
                     (let [squadron-icon-scale 0.6
                           squadrons           (formula-of [airbase included-squadrons]
                                                 (->> airbase
                                                      ::mission/squadrons
                                                      (filter included-squadrons)
                                                      (reduce (fn [[squadrons cum-width] squadron]
                                                                (let [width (->> squadron
                                                                                 ::mission/image
                                                                                 :image-data
                                                                                 :size
                                                                                 first)]
                                                                  [(conj squadrons (assoc squadron
                                                                                          ::x-offset
                                                                                          cum-width))
                                                                   (+ cum-width (* width icon-scale squadron-icon-scale) 0.1)]))
                                                              [[] 0])
                                                      first))]
                       (for-tpl [squadron squadrons]
                         (let [info (formula-of [squadron]
                                      (let [image                (::mission/image squadron)
                                            {:keys [image-data]} image
                                            {:keys [size]}       image-data
                                            [w h]                size]
                                        {:w   (* icon-scale squadron-icon-scale w)
                                         :h   (* icon-scale squadron-icon-scale h)
                                         :src (get-image mission image)}))]
                           (svg/image
                            :debug (cell= (gstring/format "ab/y: %f, ab/h: %f, sq/h: %f"
                                                          (:y dims)
                                                          (:h dims)
                                                          (:h info)))
                            :xlink-href (cell= (:src info))
                            :x (cell= (-> squadron ::x-offset (+ (/ (:w dims) 2))))
                            :y (cell= (+ (:y dims) (- (:h dims) (:h info))))
                            :width (cell= (:w info))
                            :height (cell= (:h info))))))))
                  (svg/g
                   :debug "airbase icon"
                   (svg/image
                    :xlink-href (cell= (get-image mission (::mission/image airbase)))
                    :x (-> dims :x cell=)
                    :y (-> dims :y cell=)
                    :width (-> dims :w cell=)
                    :height (-> dims :h cell=)))))))))))))))

(def airbases-info-overlay
  (svg/g
   :section "airbase-info"
   (vector
    (for-tpl [airbase all-airbases]
      (airbase-info-overlay mission airbase))
    ;; This gets the highlighted one to be on top
    (svg/use :xlink-href (cell= (airbase-info-id highlighted-airbase))))))

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

(defn bullseye-overlay
  "Renders the UI for display of bullseye."
  [mission]
  (when-tpl (-> map-display :show-bullseye? cell=)
    (let [stroke-width 0.025            ; TODO: Adjust for zoom?
          bw (formula-of
               [mission]
               (let [{:keys [campaign-info]} mission
                     {bx :bullseye-x by :bullseye-y} campaign-info]
                 (coords/fgrid->weather mission bx by)))
          bx (cell= (:x bw))
          by (cell= (:y bw))]
      (svg/g
       :attr {:debug "bullseye"}
       :svg/transform (cell= (comm/svg-translate bx by))
       (for [r (range 30 200 30)]
         (svg/circle
          :stroke "black"
          :fill "none"
          :stroke-width stroke-width
          :cx 0
          :cy 0
          :r (cell= (coords/nm->weather mission r))))
       (for [theta (range 0 180 30)]
         (svg/line
          :attr {:transform (comm/svg-rotate theta)}
          :stroke "black"
          :stroke-width stroke-width
          :x1 0
          :y1 (cell= (coords/nm->weather mission -200))
          :x2 0
          :y2 (cell= (coords/nm->weather mission 200))))))))

(defn- limit-pan
  "Given a map pan as an x/y map, return a new map that doesn't permit showing areas outside the map."
  [[nx ny] zoom {:keys [x y]}]
  (let [width (/ nx zoom)
        height (/ ny zoom)]
    {:x (math/clamp 0 (- nx width)  x)
     :y (math/clamp 0 (- ny height) y)}))

(defn pixels->weather
  "Converts an x/y offset in pixels to an x/y offset in weatherspace units."
  [[dx dy]]
  (let [zoom           @map-zoom
        [nx ny]        (:cell-count @weather-params)
        [width height] @map-size]
    [(-> dx (* nx) (/ width)  (/ zoom))
     (-> dy (* ny) (/ height) (/ zoom))]))

(defn- zoom-map!
  "Changes the map zoom by a factor of `amount`, centered on `[cx cy]`
  coordinates in weather space, which has dimensions `[nx ny]`."
  [[cx cy] amount]
  (let [[nx ny]         (:cell-count @weather-params)
        {px0 :x py0 :y} @map-pan
        z'              (->> @map-zoom
                             (* amount)
                             (math/clamp zoom-min zoom-max))
        dz              (/ z' @map-zoom)
        px1             (- cx (/ (- cx px0) dz))
        py1             (- cy (/ (- cy py0) dz))
        px              (-> px1 (- px0) (+ px0))
        py              (-> py1 (- py0) (+ py0))]
    (dosync
     (reset! map-zoom z')
     (reset! map-pan (limit-pan [nx ny] z' {:x px :y py})))))

(defn- layer-overlay
  "Return an overlay for a layer."
  [overlay & args]
  (apply (:overlay-fn overlay) args))

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
    :as   attrs}]
  (let [ ;; Drag and drop is complicated by the fact that there isn't a
        ;; good way to capture the mouse when it goes down. So we use
        ;; the document mouse events so that we can get global
        ;; notificaiton of the mouse movements and buttons.
        ;; TODO: See if some core.async love might simplify this a bit.
        drag-handler          (atom nil)
        drag-start            (atom nil)
        register-drag-handler (fn [h]
                                (swap! drag-handler #(or % h)))
        doc-move              (fn [^js/MouseEvent e]
                                (if-let [h @drag-handler]
                                  (let [x       (aget e "pageX")
                                        y       (aget e "pageY")
                                        [sx sy] @drag-start
                                        dx      (- x sx)
                                        dy      (- y sy)]
                                    (h (pixels->weather [dx dy]) false)
                                    (.preventDefault e))))
        doc-up                (fn doc-up [e]
                                (when-let [h @drag-handler]
                                  (let [x       (aget e "pageX")
                                        y       (aget e "pageY")
                                        [sx sy] @drag-start
                                        dx      (- x sx)
                                        dy      (- y sy)]
                                    (h (pixels->weather [dx dy]) true)))
                                (reset! drag-start nil)
                                (reset! drag-handler nil))
        _                     (.addEventListener js/document "mousemove" doc-move)
        _                     (.addEventListener js/document "mouseup" doc-up)
        brightness-layer      (svg/rect
                               :id "brightness-layer"
                               :x 0
                               :y 0
                               :width nx
                               :height ny
                               :fill (formula-of [map-display]
                                       (let [brightness (:brightness map-display)]
                                         (apply gstring/format "rgba(%d,%d,%d,%f)"
                                                (if (<= 0.5 brightness)
                                                  [255 255 255 (-> brightness
                                                                   (- 0.5)
                                                                   (/ 0.5))]
                                                  [0 0 0 (-> brightness
                                                             (- 0.5)
                                                             (/ -0.5))])))))
        primary-layer         (svg/g
                               :id "primary-layer"
                               :toggle (cell= (-> display-params :display some?))
                               :css (cell= {:opacity (-> display-params :opacity)}))
        wind-overlay          (svg/g
                               :id "wind-overlay"
                               :toggle (-> display-params :overlay (= :wind) cell=))
        text-overlay          (svg/g
                               :id "text-overlay"
                               :attr (cell= {:class (str "text-overlay "
                                                         (some-> display-params
                                                                 :overlay
                                                                 name))})
                               :toggle (cell= (-> display-params
                                                  :overlay
                                                  #{:pressure :temperature :type})))
        selected-cell-overlay (let [coords (cell= (:coordinates selected-cell))]
                                (cell-let [[x y] coords]
                                  (when-tpl (formula-of [x y]
                                              (and x y))
                                    (svg/rect
                                     :id "selected-cell-overlay"
                                     :click #(reset! selected-cell nil)
                                     :x x
                                     :y y
                                     :width 1
                                     :height 1))))
        wind-stability-areas  (formula-of
                                [weather-params]
                                (:wind-stability-areas weather-params))
        weather-overrides     (formula-of
                                [weather-params]
                                (:weather-overrides weather-params))
        effective-hover-cell  (formula-of
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
        #_info-overlay        #_ (formula-of
                                   [effective-hover-cell weather-data pressure-unit cloud-params]
                                   (info-overlay effective-hover-cell
                                                 weather-data
                                                 pressure-unit
                                                 nx ny
                                                 cloud-params))]
    (with-let [elem (svg/svg
                     :id "grid"
                     (let [dims (formula-of
                                  [map-size]
                                  ;; Edge doesn't render right, so we
                                  ;; have to make a little extra room
                                  (map #(- % 7) map-size))]
                       (-> attrs
                           (dissoc :display-params
                                   :selected-cell
                                   :weather-data
                                   :wind-stability-areas
                                   :weather-overrides)
                           (assoc :viewBox (formula-of [map-viewbox]
                                             (let [{:keys [x y width height]} map-viewbox]
                                               (gstring/format "%f %f %f %f"
                                                               x y width height)))
                                  :width (cell= (first dims))
                                  :height (cell= (second dims))
                                  :attr {"xmlns:xlink" "http://www.w3.org/1999/xlink"
                                         "xmlns"       "http://www.w3.org/2000/svg"})))
                     :mousemove (fn [e]
                                  (dosync
                                   (reset! suppress-bullseye-info-box? false)
                                   (reset! mouse-location
                                           (let [[x y] (mouse-weather-coords e)]
                                             (when (and (<= 0 x nx)
                                                        (<= 0 y ny))
                                               {:x x :y y})))))
                     :mouseleave (fn [_]
                                   (dosync
                                    (reset! hover-cell nil)))
                     :mousedown (fn [e]
                                  ;; (.log js/console e)
                                  (reset! drag-start
                                          [(aget e "pageX") (aget e "pageY")])
                                  (when-not @drag-handler
                                    (let [{px0 :x py0 :y} @map-pan]
                                      ;; We have to handle drag coordinates
                                      ;; specially, because we're actually
                                      ;; dragging the map around, and therefore
                                      ;; computation of things like, "How far
                                      ;; from initial" mean something different
                                      ;; than when we drag, say, a weather
                                      ;; region.
                                      (register-drag-handler
                                       (fn [[dx dy] final?]
                                         (let [browser-zoom (.-devicePixelRatio js/window)]
                                           (reset! map-pan (limit-pan
                                                            (:cell-count @weather-params)
                                                            @map-zoom
                                                            {:x (- px0 dx)
                                                             :y (- py0 dy)}))))))))
                     ;; Overriding dragstart stops Firefox from trying
                     ;; to drag and drop SVG as images, which would
                     ;; interfere with our drag/resize functionality.
                     :dragstart (constantly false)
                     (wind-vector-defs)
                     (svg/image
                      :id "map-image"
                      ;;:toggle (cell= (some? mission))
                      :xlink-href (cell=
                                   (if-not mission
                                     "images/kto.jpg"
                                     (get-image mission (:map-image mission))))
                      :x 0
                      :y 0
                      :width nx
                      :height ny)
                     brightness-layer
                     primary-layer
                     (bullseye-overlay mission)
                     wind-overlay
                     text-overlay
                     (wind-stability-overlay weather-params register-drag-handler)
                     (weather-overrides-overlay weather-params register-drag-handler)
                     ;;(flight-paths-overlay [nx ny] display-params)
                     selected-cell-overlay
                     (layer-overlay acmi-layer)
                     (layer-overlay annotations-layer register-drag-handler)
                     (layer-overlay flight-paths-layer)
                     airbases-info-overlay
                     (bullseye-info-box))]
      (gevents/listen (gevents/MouseWheelHandler. elem)
                      gevents/MouseWheelHandler.EventType.MOUSEWHEEL
                      (fn [^js/MouseWheelEvent e]
                        (.preventDefault e)
                        (let [amount (* (Math/pow @zoom-speed (aget e "deltaY")))]
                          (zoom-map! (mouse-weather-coords e)
                                     amount))))
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
                (let [^js/SVGRectElement r (.createElementNS
                                            js/document
                                            "http://www.w3.org/2000/svg"
                                            "rect")]
                  (doto r
                    (.setAttribute "id" (str "grid-primary-cell-" x "-" y))
                    (.setAttribute "x" (str x))
                    (.setAttribute "y" (str y))
                    (.setAttribute "width" "1")
                    (.setAttribute "height" "1")
                    (.setAttribute "fill" "none")
                    (-> .-onclick
                        (set! #(reset! selected-cell {:location    nil
                                                      :coordinates [x y]}))))
                  (gdom/appendChild frag r)))
              (gdom/appendChild primary-layer frag))
            ;; Wind vector layer
            (let [frag (.createDocumentFragment js/document)]
              (doseq [x (range nx)
                      y (range ny)]
                (let [^js/SVGElement g    (.createElementNS
                                           js/document
                                           "http://www.w3.org/2000/svg"
                                           "g")
                      ^js/SVGUseElement r (.createElementNS
                                           js/document
                                           "http://www.w3.org/2000/svg"
                                           "use")]
                  (doto g
                    (.setAttribute "transform"
                                   (comm/svg-translate (+ x 0.5)
                                                       (+ y 0.5))))
                  (doto r
                    (.setAttribute "id" (str "grid-wind-cell-" x "-" y)))
                  (gdom/appendChild g r)
                  (gdom/appendChild frag g)))
              (gdom/appendChild wind-overlay frag))
            ;; Text overlay layer
            (let [frag  (.createDocumentFragment js/document)
                  scale 0.03]
              (doseq [x (range nx)
                      y (range ny)]
                (let [^js/SVGTextElement t (.createElementNS
                                            js/document
                                            "http://www.w3.org/2000/svg"
                                            "text")]
                  (doto t
                    (.setAttribute "transform"
                                   (str (comm/svg-scale scale)
                                        " "
                                        (comm/svg-translate (/ (+ x 0.5) scale)
                                                            (/ (+ y 0.9) scale))))
                    (.setAttribute "id" (str "grid-text-cell-" x "-" y))
                    (.setAttribute "text-anchor" "middle"))
                  (gdom/appendChild frag t)))
              (gdom/appendChild text-overlay frag))))
        (let [display-params* (formula-of
                                [display-params]
                                (dissoc display-params
                                        ;;:dimensions
                                        :opacity
                                        :map
                                        :flight-paths
                                        :multi-save))]
          (formula-of
            [weather-data display-params*]
            #_(log/debug "grid should be updating now")
            (update-grid weather-data display-params*)))))))


;;; User Interface

#_(defn two-column
  [left right]
  (div :class "two-column"
       (div :class "left-column" left)
       (div :class "right-column" right)))


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

(defelem time-entry
  "Defines a time-edit box with against `path` into map cell `source`."
  [attrs _]
  ;; TODO: Make fancier
  (let [{:keys [path source]} attrs]
    (time-edit
     (-> attrs
         (dissoc :path)
         (assoc :source (formula-of [source] (get-in source path)))
         (assoc :update #(swap! source assoc-in path %))
         (assoc :max-time (get-in @weather-params [:time :max]))))))

(defn button-bar
  "Returns UI for the 'button bar' that goes across the top of the
  map."
  []
  (div :class "button-bar"
       :css (formula-of
              [map-size]
              {:position "relative"
               :width    (-> map-size first px)
               :margin   "0 0 3px 0"})
       ;; Map legend
       (with-help [:map :legend]
         {:margin-left (px 5)}
         (span "Map Legend"))
       ;; Zoom in/out buttons
       (let [button-size 18
             map-center  (fn []
                           (let [{:keys [x y width height]} @map-viewbox]
                             [(+ x (/ width 2))
                              (+ y (/ height 2))]))]
         (inl
          :css {:margin-left (px 10)}
          (inl
           (buttons/a-button
            :click #(zoom-map! (map-center)
                               1.1)
            (img
             :css {:vertical-align "bottom"}
             :width (px button-size)
             :height (px button-size)
             :src "images/zoomin.svg"
             :title "Zoom Map In"))
           (inl
            (buttons/a-button
             :click #(zoom-map! (map-center)
                                (/ 1.0 1.1))
             (img
              :css {:vertical-align "bottom"}
              :width (px button-size)
              :height (px button-size)
              :src "images/zoomout.svg"
              :title "Zoom Map Out"))))))
       ;; Time indicators
       (div
        :css {:display "inline-block"
              :float   "right"
              :margin  (px 5 32 0 0)}
        (span
         (with-help [:map :mission-time]
           "Mission Time:")
         " "
         (formula-of
           [mission]
           (let [t (-> mission mission/mission-time)]
             (if t
               (format-time t)
               "--/----"))))
        (span
         :css {:margin-left (px 7)}
         (with-help [:map :weather-time]
           "Weather Time:")
         " "
         (formula-of
           [weather-data-params]
           (let [t (-> weather-data-params :time :current)]
             (if t
               (format-time t)
               "--/----")))))
       (formula-of
         [computing]
         (if-not computing
           []
           (img :src "images/spinner.gif"
                :width "24px"
                :height "24px"
                :css {:vertical-align "bottom"
                      :position       "absolute"
                      :right          "3px"
                      :bottom         "0"})))))

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

(defn weather-display-controls
  [{:keys [prevent-map-change? title]}]
  (let [field       (fn [& kids] (apply div :class "field" kids))
        field-help  (fn [& kids] (apply div :class "field-elem field-help" kids))
        field-input (fn [& kids] (apply div :class "field-elem field-input" kids))
        field-label (fn [help-path & kids]
                      (with-help help-path
                        (apply div :class "field-elem field-label" kids)))]
    (control-section
     :title (or title "Display Options")
     :id "weather-display-controls-section"
     (control-layout
      (let [opts {:cell      display-params
                  :help-base :weather-display-controls}]
        [["Display"
          [:display]
          (merge opts
                 {:ui (comm/dropdown
                       :value (path-lens display-params [:display])
                       :choices [{:label "None"}
                                 {:label "Weather Type"
                                  :value :type}
                                 {:label "Pressure"
                                  :value :pressure}
                                 {:label "Temperature"
                                  :value :temperature}])})]
         ["Overlay"
          [:overlay]
          (merge opts {:ui (comm/dropdown
                            :value (path-lens display-params [:overlay])
                            :choices [{:label "None"}
                                      {:label "Wind"
                                       :value :wind}
                                      {:label "Pressure"
                                       :value :pressure}
                                      {:label "Temperature"
                                       :value :temperature}
                                      {:label "Weather Type"
                                       :value :type}])})]
         ["Pressure"
          [:pressure]
          (merge opts {:ui (comm/dropdown
                            :value (path-lens display-params [:pressure-unit])
                            :choices [{:label "InHg"
                                       :value :inhg}
                                      {:label "Millibar"
                                       :value :mbar}])})]
         ["Opacity:"
          [:opacity]
          (merge opts {:ui (input {:type   "range"
                                   :min    0
                                   :max    100
                                   :value  (cell= (-> display-params
                                                      :opacity
                                                      (* 100)
                                                      long))
                                   :input #(swap! display-params
                                                  assoc
                                                  :opacity
                                                  (/ @% 100.0))})})]])))))

(defn weather-parameters
  [_]
  (control-section
   :title "Weather parameters"
   :id "weather-params-section"
   :toggle (cell= (= display-mode :edit))
   (control-layout
    [["Seed"             [:seed] {:ui (div
                                       :css {:white-space "nowrap"}
                                       (edit-field weather-params [:seed])
                                       (buttons/a-button
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
   :toggle (cell= (= display-mode :edit))
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
         (buttons/image-button
          :click #(swap! weather-params
                         update-in
                         [:wind-stability-areas @index :editing?]
                         not)
          :title "Edit"
          :src "images/move.svg"
          :width "16px"
          :height "16px"
          :latched? (cell= (:editing? area)))
         (buttons/image-button
          :css {:float "right"}
          :src "images/trash.png"
          :width "16px"
          :title "Remove"
          :click #(swap! weather-params
                         update
                         :wind-stability-areas
                         (fn [areas]
                           (remove-nth areas @index))))
         (hr)))))
   (buttons/a-button
    :click #(swap! weather-params
                   update
                   :wind-stability-areas
                   (fn [areas]
                     (conj areas
                           {:bounds {:x 0 :y 0 :width 10 :height 10}
                            :wind {:heading 45
                                   :speed 5}
                            :index (count areas)
                            :editing? true})))
    "Add New")
   (div
    (input :type "checkbox"
           ;; Inverted so we can be backward-compatible
           :value (-> map-display :hide-wind-stability? not cell=)
           :change #(swap! map-display update :hide-wind-stability? not))
    (with-help [:map-controls :show-wind-stability?]
      (label "Show wind stability regions?")))))

(defn weather-override-parameters
  [_]
  (control-section
   :title (with-help [:weather-overrides :overview] "Weather override regions")
   :id "weather-override-params-section"
   :toggle (cell= (= display-mode :edit))
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
                   (td (time-entry :source weather-params
                                   :path [:weather-overrides @index k]))))
             (checkbox "Exclude from forecast?" :exclude-from-forecast?
                       {:row-attrs {:toggle (cell= (:animate? override))}}))))
         (buttons/image-button
          :click #(swap! weather-params
                         update-in
                         [:weather-overrides @index :editing?]
                         not)
          :title "Edit"
          :src "images/move.svg"
          :width "16px"
          :height "16px"
          :latched? (cell= (:editing? override)))
         (buttons/image-button
          :css {:float "right"}
          :src "images/trash.png"
          :width "16px"
          :title "Remove"
          :click #(swap! weather-params
                         update
                         :weather-overrides
                         (fn [overrides]
                           (remove-nth overrides @index))))))))
   (buttons/a-button
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
                                      :peak (-> wp :time :current (time/add-minutes 60))
                                      :taper (-> wp :time :current (time/add-minutes 180))
                                      :end (-> wp :time :current (time/add-minutes 240))
                                      :pressure (-> wp :pressure :min)
                                      :strength 1
                                      :show-outline? true
                                      :editing? true
                                      :exclude-from-forecast? false})))))
    "Add New")))

(defn weather-type-configuration
  [_]
  (control-section
   :title "Weather type configuration"
   :id "weather-type-configuration-section"
   :toggle (cell= (= display-mode :edit))
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
  (comm/int-conformer 0 99999))

(defmethod cloud-param-conformer :visibility
  [params column category]
  (comm/float-conformer 0 30))

(defmethod cloud-param-conformer :stratus-base
  [params column category]
  (fn [val-c]
    (let [conformer (comm/int-conformer 0 99999)
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
    (let [ic (comm/int-conformer 0 99999)
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
    (let [ic (comm/int-conformer 0 99999)
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
   (div
    :toggle (cell= (= display-mode :edit))
    (help-icon [:clouds :buttons])
    (buttons/a-button
     :css {:margin-right "3px"}
     :click #(reset! cloud-params (random-cloud-params))
     "Randomize")
    (buttons/a-button
     :click #(save-twx @cloud-params
                       (:direction @movement-params)
                       (:mission-name @mission))
     "Save .TWX"))
   (table
    (tr (td (with-help [:clouds :cumulus-coverage]
              "Cumulus coverage"))
        (td :css {:text-align "right"}
            "5%")
        (let [l (path-lens cloud-params
                           [:cumulus-density])]
          (td (input
               :type "range"
               :disabled (cell= (= display-mode :briefing))
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
               :disabled (cell= (= display-mode :briefing))
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
              (let [path          [column category]
                    literal-style {:font-family  "monospace"
                                   :padding-left "3px"
                                   :padding-top  "2px"
                                   :font-size    "93%"
                                   :text-align   "center"}]
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
                     :css {:margin-right (px 5)
                           :text-align   "right"}
                     (if-tpl (cell= (= display-mode :briefing))
                       (div :css (assoc literal-style
                                        :width
                                        (if (= column :visibility)
                                          (px 35)
                                          (px 55)))
                            (formula-of [l]
                              (if (= column :visibility)
                                (format-visibility l)
                                (str l))))
                       (validating-edit
                        :source l
                        :fmt (if (= column :visibility)
                               format-visibility
                               str)
                        :conform (cloud-param-conformer cloud-params column category)
                        :placeholder (condp = column
                                       :visibility "vis (nm)"
                                       "altitude")
                        :align "right"
                        :width (if (= column :visibility)
                                 35
                                 55)))))))))))))))

(defn advanced-controls
  [_]
  (control-section
   :id "advanced-params-section"
   :title "Advanced configuration"
   :toggle (cell= (= display-mode :edit))
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
  [_]
  (let [mission-time (-> mission mission/mission-time cell=)
        max-time     (-> weather-params :time :max time/campaign-time->minutes cell=)
        weather-time (-> weather-params :time :current time/campaign-time->minutes cell=)]
    (control-section
     :id "time-location-params"
     :title "Time controls"
     (table
      (tbody
       (tr (td (with-help [:weather-params :time :falcon-time]
                 "Falcon time: "))
           (td (-> mission-time format-time cell=))
           (td (buttons/a-button
                :click #(jump-to-time* @mission-time)
                "Jump to")))
       (if-tpl (cell= (= display-mode :browse))
         (tr (td (with-help  [:weather-params :time :browse-time]
                   "Time"))
             (td (time-entry :source weather-params
                             :path [:time :current])))
         (tr (td (with-help [:displayed-time]
                   "Time"))
             (td (time-entry :source time-params
                             :path [:displayed]))
             (td (buttons/a-button
                  :click jump-to-time
                  "Jump to")
                 (buttons/a-button
                  :toggle (cell= (= display-mode :edit))
                  :click set-time
                  "Set to"))))
       (tr (map td [(with-help [:step]
                      "Step interval")
                    (validating-edit
                     :width 50
                     :source (cell= (:step movement-params))
                     :conform comm/conform-positive-integer
                     :update #(swap! movement-params assoc :step %)
                     :placeholder "e.g. 60"
                     :fmt str)]))))
     (buttons/a-button :title "Step back in time"
                       :click #(move -1)
                       "<< Step Back")
     (buttons/a-button
      :title (cell= (if (:looping? movement-params)
                      "Stop weather animation"
                      "Animate weather"))
      :click #(when (:looping? (swap! movement-params update :looping? not))
                (recompute @weather-params))
      (span
       :css (formula-of
              [movement-params]
              (if (:looping? movement-params)
                {:border     "5px solid black"
                 :transform  ""
                 :display    "inline-block"
                 :margin-top "2px"}
                {:border-left   "5px solid transparent"
                 :border-right  "5px solid transparent"
                 :border-top    "7px solid black"
                 :border-bottom ""
                 :display       "inline-block"
                 :transform     "rotate(-90deg)"}))
       ""))
     (buttons/a-button
      :toggle (formula-of [max-time weather-time display-mode]
                (or (= display-mode :edit)
                    (< weather-time max-time)))
      :title "Step forward in time"
      :click #(move 1)
      "Step Forward >>")
     )))

(defn serialization-controls
  [_]
  (let [inline (fn [css & contents]
                 (apply div
                        :css (merge {:display      "inline-block"
                                     :margin-right "5px"}
                                    css)
                        contents))]
    (control-section
     :toggle (cell= (= display-mode :edit))
     :id "load-save-controls"
     :title "Load/save"
     (if-not safari?
       []
       (let [p* #(p :css {:margin-bottom "3px"
                          :margin-top    "3px"}
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
       :css {:display        "flex"
             :flex-direction "row"
             :vertical-align "middle"}
       #_(help-icon [:display-controls :save-single-file-buttons])
       (div
        :class "button-container"
        (buttons/a-button
         :click #(save-fmap @weather-params @weather-data)
         "Save Current as FMAP"))
       (div
        :class "button-container"
        (buttons/a-button
         :click #(save-twx @cloud-params
                           (:direction @movement-params)
                           (:mission-name @mission))
         "Save .TWX"))
       (div
        :class "button-container"
        (buttons/a-button
         :click save-weather-settings
         "Save Weather Settings"))
       (div
        :class "button-container"
        (buttons/a-button :click load-weather-settings "Load Weather Settings"))))
     (control-subsection
      :toggle (cell= (some? mission))
      :title (with-help [:serialization-controls :multi-save :overview]
               "Save mission weather files")
      (let [row (fn [label help-path edit & more]
                  (div
                   :css {:display        "flex"
                         :flex-direction "row"
                         :margin         "0 2px 3px 2px"}
                   (div
                    :css {:white-space "nowrap"
                          :width       "50px"
                          :margin-left "3px"}
                    (with-help help-path
                      label))
                   edit
                   more))]
        [(row "Mission:"
              [:serialization-controls :multi-save :mission-name]
              (div (cell= (or (:mission-name mission) "No Mission Loaded"))))
         (row "From:"
              [:serialization-controls :multi-save :from]
              (time-entry :source display-params
                          :path [:multi-save :from])
              (buttons/a-button
               :css {:margin-left "14px"}
               :toggle (cell= (some? mission))
               :click #(swap! display-params
                              assoc-in
                              [:multi-save :from]
                              (mission/mission-time @mission))
               "Set to mission time"))
         (row "To:"
              [:serialization-controls :multi-save :to]
              (time-entry :source display-params
                          :path [:multi-save :to]))
         (row "Step:"
              [:serialization-controls :multi-save :step]
              (validating-edit
               :width 32
               :source (path-lens display-params [:multi-save :step])
               :conform comm/conform-positive-integer
               :fmt str
               :placeholder "60"))
         (let [progress    (cell nil)
               cancelling? (cell false)
               save-file   (cell nil)]
           [(buttons/a-button
             :css (formula-of
                    [progress cancelling?]
                    {:width      "115px"
                     :display    "inline-block"
                     :text-align "center"
                     :background
                     (when (and (not cancelling?) (some? progress))
                       (let [pct (long (* 100 progress))]
                         (gstring/format "linear-gradient(to right, lightblue, lightblue %f%%, white %f%%)"
                                         pct pct)))})
             :click (fn []
                      (if @progress
                        (dosync
                         (reset! cancelling? true))
                        (do
                          (reset! cancelling? false)
                          (reset! save-file nil)
                          (save-weather-files {:weather-params    @weather-params
                                               :cloud-params      @cloud-params
                                               :weather-direction (:direction @movement-params)
                                               :campaign-dir      (mission/campaign-dir @mission)
                                               :mission-name      (:mission-name @mission)
                                               :from              (get-in @display-params [:multi-save :from])
                                               :to                (get-in @display-params [:multi-save :to])
                                               :step              (get-in @display-params [:multi-save :step])
                                               :progress          progress
                                               :cancel            cancelling?
                                               :save-file         save-file
                                               :nx                (-> @weather-params :cell-count first)
                                               :ny                (-> @weather-params :cell-count second)}))))
             (formula-of
               [progress cancelling?]
               (cond
                 (and progress cancelling?) "Cancelling..."
                 progress                   "Cancel"
                 :else                      "Save Weather Files")))
            (when-tpl (cell= (and progress save-file))
              (inl :css {:margin-left "5px"}
                   (span :css {:margin-right "5px"}
                         "Saving")
                   (span :css {:font-family "monospace"
                               :font-size   "120%"}
                         save-file)))])])))))

(defn debug-info
  []
  ;; var canvasWidth  = canvas.width;
  ;;   var canvasHeight = canvas.height;
  ;;   var ctx = canvas.getContext('2d');
  ;;   var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  ;;   var buf = new ArrayBuffer(imageData.data.length);
  ;;   var buf8 = new Uint8ClampedArray(buf);
  ;;   var data = new Uint32Array(buf);
  ;;   for (var y = 0; y < canvasHeight; ++y) {
  ;;       for (var x = 0; x < canvasWidth; ++x) {
  ;;           var value = dataset[y][x];
  ;;           data[y * canvasWidth + x] =
  ;;               (255   << 24) |    // alpha
  ;;               (value/2 << 16) |    // blue
  ;;               (value <<  8) |    // green
  ;;               255;            // red
  ;;       }
  ;;   }
  ;;   imageData.data.set(buf8);
  ;;   ctx.putImageData(imageData, 0, 0);
)

(defmethod do! :viewBox
  [^SVGElement elem _ value]
  (if (= false value)
    (.removeAttribute elem "viewBox")
    (.setAttribute elem "viewBox" value)))

(defmethod do! :xlink-href
  [^SVGElement elem _ value]
  (if (= false value)
    (.removeAttributeNS elem "http://www.w3.org/1999/xlink" "href")
    (do
      (.setAttributeNS elem "http://www.w3.org/1999/xlink" "href" value))))

(defmethod do! :preserveAspectRatio
  [^SVGElement elem _ value]
  (if (= false value)
    (.removeAttribute elem "preserveAspectRatio")
    (.setAttribute elem "preserveAspectRatio" value)))

(defn test-section
  [{:keys []}]
  (control-section
   :title "Test"
   (tabs/tabs
    :selected (cell :one)
    :tabs [{:title "Version"
            :id    :one
            :ui    "test"}
           {:title "App Path"
            :id    :two
            :ui    (div (-> electron
                            .-remote
                            .-app
                            .getAppPath))}
           {:title "Three"
            :id    :three
            :ui    (let [choice (cell :a)]
                     (div
                      (comm/radio-group
                       :value choice
                       :choices (cell [{:value :a
                                        :label "a"}
                                       {:value :b
                                        :label "b"}]))
                      (div (cell= (str "value: " (pr-str choice))))))}])
   ;; (pre-cell "visible-sides" visible-sides)
   ;; (pre-cell "effective-visible-sides" effective-visible-sides)
   ;; (pre-cell "visible-teams" visible-teams)
   ;; (pre-cell "display-mode" display-mode)
   ;; (pre-cell "selected-cell" selected-cell)
   #_(let [color (cell (comm/to-hex-str "blue"))]
       (vector
        (inl
         (comm/color-picker
          :value color
          :change (fn [e] (log/debug "Color picker 1 changed " :color @e))))
        (inl
         (comm/color-picker
          :value color
          :change (fn [e] (log/debug "Color picker 2 changed " :color @e))))
        (button :click #(reset! color (comm/to-hex-str "green")) "Green")))
   #_(let [expand-state (cell :all-expanded)]
       (trees/tree
        expand-state
        [ ;; Sides
         {:formatter (fn [expanded? item]
                       (pre-cell "side" (cell= {:expanded? expanded? :item item})))
          :children  (fn [item]
                       (formula-of [item]
                         (:children item)))}
         ;; Airbases
         {:formatter (fn [expanded? item]
                       (pre-cell "airbase" (cell= {:expanded? expanded? :item item})))}
         ]
        (cell [{:name "side one" :children [:ab1 :ab2]}
               {:name "side two" :children [:ab3 :ab4]}])
        ))
   #_(let [data     (cell [{:a        1 :b 2 :c 3
                            :children [{:a 4 :b 5 :c 6}
                                       {"a" "a" "b" "b" "c" "c"}]}])
           columns  (cell [{:id    :a
                            :name  "A"
                            :field :a}
                           {:id    :b
                            :name  "B"
                            :field :b}
                           {:id    :c
                            :name  "C"
                            :field :c}])
           clicked? (cell false)]
       [(button :click (fn [_]
                         (log/debug "Button clicked")
                         (reset! clicked? true))
                "Click me.")
        (formula-of [clicked?]
          (if-not clicked?
            []
            (do
              (log/debug "Adding grid")
              (grids/master-detail
               :data data
               :detail :children
               :columns columns
               :options {}
               :css {}))))])
   #_(div :id "my-test-grid")
   #_(let [c1 (cell "hi")
           c2 (cell true)]
       [(when-tpl c2
          (.log js/console "Evaluated")
          (span c1))
        (button :click #(swap! c2 not) "toggle")
        (button :click #(swap! c1 str "x") "x")])
   #_(let [path          (cell {:color "FFFFFF"})
           current-color (cell= (:color path))]
       (triple-border
        :inner current-color
        :outer (cell= (contrasting current-color))
        [(span (cell= (str current-color)))
         (color-picker
          :value current-color
          :change (fn [val opacity]
                    (swap! path assoc :color @val)))]))))

;; TODO: Maybe remove
#_(defn flight-path-controls
  [_]
  (control-section
   :id "flight-path-controls"
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
            :outer (-> path :color comm/contrasting cell=)
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
                        (buttons/image-button
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
                      (comm/color-picker
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
                     (buttons/image-button
                      :src "images/trash.png"
                      :click #(swap! display-params
                                     update
                                     :flight-paths
                                     (fn [paths]
                                       (remove-nth paths index)))))))))))))))
   (buttons/a-button :click load-dtc "Load DTC")))


(defn airbase-squadrons
  "Given mission and airbase cells, return a formula cell with the
  squadron for that airbase in the canonical order."
  [mission airbase]
  (formula-of [mission airbase]
    (->> airbase
         ::mission/squadrons
         (sort-by (juxt ::mission/squadron-type :name)))))

(defn airbase-display-controls
  "Returns a control section that affects how airbases display on the
  map."
  [title]
  (control-section
   :title (with-help [:air-forces :display-options :overview]
            title)
   (let [map-airbase-label-style (path-lens map-display [:airbase-label-style])]
     (div
      (with-help [:air-forces :display-options :airbase-labels]
        {:margin (px 0 5)}
        (label "Airbase labels:"))
      (comm/dropdown
       :value map-airbase-label-style
       :choices [{:label "Airbase name only"
                  :value :name-only}
                 {:label "Airbase name and squadrons"
                  :value :all}
                 {:label "No label"
                  :value :nothing}])))
   (let [map-airbase-show-status? (path-lens map-display [:show-airbase-status?])]
     (div
      (input :type "checkbox"
             :value map-airbase-show-status?
             :change #(swap! map-airbase-show-status? not))
      (with-help [:air-forces :display-options :show-airbase-status?]
        (label "Show airbase status?"))))
   (let [map-airbase-show-squadrons? (path-lens map-display [:show-airbase-squadrons?])]
     (div
      (input :type "checkbox"
             :value map-airbase-show-squadrons?
             :change #(swap! map-airbase-show-squadrons? not))
      (with-help [:air-forces :display-options :show-airbase-squadrons?]
        (label "Show airbase squadrons?"))))))

(defn air-forces-section
  [_]
  (let [expand-state (cell [:expand-through-level 1])
        row          (fn [& args] (apply div :class "row" args))]
    (cond-tpl
      (-> mission not cell=)
      "No mission loaded"

      (-> all-airbases count zero? cell=)
      "No airbases present in the mission."

      :else
      (styled
       :garden [[:div.row {:margin-bottom "3px"}]
                [:button {:margin-right "3px"}]]
       (control-section
        :title (with-help [:air-forces :airbase-filtering]
                 "Airbase Filtering")
        (row
         (input :type "checkbox"
                :value hide-empty-airbases?
                :change #(swap! hide-empty-airbases? not))
         (with-help [:air-forces :hide-no-squadron-airbases]
           (label "Hide airbases with no squadrons")))
        (row
         (input :type "checkbox"
                :value hide-inoperable-airbases?
                :change #(swap! hide-inoperable-airbases? not))
         (with-help [:air-forces :hide-zero-status-airbases]
           (label "Hide airbases at 0% status"))))
       (control-section
        :title (with-help [:air-forces :squadron-types]
                 "Squadron Types")
        (row
         (buttons/a-button
          :click #(reset! included-squadron-types @all-squadron-types)
          "Check all")
         (buttons/a-button
          :click #(reset! included-squadron-types #{})
          "Uncheck all")
         (help-icon [:air-forces :squadron-type-buttons]))
        (div
         :css {:display   "flex"
               :flex-wrap "wrap"
               :max-width (px 275)}
         (for-tpl [squadron-type (cell= (sort all-squadron-types))]
           (div
            :css {:width       (px 75)
                  :white-space "nowrap"}
            (let [val (cell= (contains? included-squadron-types squadron-type))]
              (input :type "checkbox"
                     :value val
                     :change #(swap! included-squadron-types (if @val disj conj) @squadron-type)))
            (label squadron-type)))))
       (airbase-display-controls "Display Options")
       (control-section
        :title (with-help [:air-forces :airbases-and-squadrons]
                 "Airbases and Squadrons")
        (row
         (buttons/a-button
          :click #(reset! expand-state :all-expanded)
          "Expand all")
         (buttons/a-button
          :click #(reset! expand-state :all-collapsed)
          "Collapse all")
         (buttons/a-button
          :click #(reset! expand-state [:expand-through-level 1])
          "Collapse to airbases")
         (help-icon [:air-forces :tree-collapse-buttons]))
        (row
         (buttons/a-button
          :click #(reset! checked-airbases @listed-airbases)
          "Show all")
         ;; Bit of an asymmetry here, but to me, it seems less surprising that uncheck all should
         ;; clear the map, even if some of the checked airbases are not currently displayed.
         (buttons/a-button
          :click #(reset! checked-airbases #{})
          "Hide all")
         (help-icon [:air-forces :airbase-selection-buttons]))
        (row
         :css {:overflow    "scroll"
               :font-family "monospace"
               :font-size   "120%"
               :background  "white"
               :border      "inset 1px lightgray"}
         (let [by-side (formula-of [mission all-airbases]
                         (group-by (fn [airbase]
                                     (->> airbase :owner (mission/side mission)))
                                   all-airbases))
               sorted  (formula-of [mission by-side]
                         (with-time
                           "Updating air forces tree"
                           (for [side  (mission/sides mission)
                                 :let  [airbases (get by-side side)]
                                 :when (-> airbases count pos?)]
                             [side airbases])))]
           (->> sorted
                (trees/tree
                 expand-state
                 [ ;; Sides
                  {:formatter (fn [expanded? item]
                                (cell-let [[side airbases] item]
                                  (inl
                                   :id (cell= (gstring/format "air-forces-side-%d" side))
                                   :css (formula-of [side]
                                          {:height       "20px"
                                           :font-weight  "bold"
                                           :margin-right "3px"
                                           :margin-top   "4px"
                                           :color        (team-color side :dark-text)})
                                   (formula-of [mission side]
                                     (comm/side-label :mission mission :side side)
                                     #_(mission/team-name mission side)))))
                   :children  (fn [item]
                                (formula-of [item mission]
                                  (let [[side airbases] item]
                                    (sort-by (fn [airbase]
                                               (mission/objective-name mission airbase))
                                             airbases))))}
                  ;; Airbases
                  {:attrs     (fn [airbase]
                                {:toggle (formula-of [airbase listed-airbases]
                                           (listed-airbases airbase))})
                   :children  (fn [airbase]
                                (formula-of [airbase]
                                  (->> airbase
                                       ::mission/squadrons
                                       (sort-by (juxt ::mission/squadron-type ::mission/name)))))
                   :formatter (fn [expanded? airbase]
                                (let [ab-name (formula-of [airbase]
                                                (::mission/name airbase))
                                      status  (formula-of [airbase]
                                                (->> airbase
                                                     ::mission/status))]
                                  (div
                                   :id (cell= (gstring/format "air-forces-airbase-%d"
                                                              (:camp-id airbase)))
                                   :css (formula-of [expanded?]
                                          {:display    "inline-block"
                                           :height     "20px"
                                           :margin-top "4px"
                                           :cursor     "pointer"})
                                   :click #(dosync
                                            (swap! checked-airbases util/toggle-set-membership @airbase)
                                            (reset! highlighted-airbase (@checked-airbases @airbase)))
                                   :mouseenter #(reset! highlighted-airbase @airbase)
                                   :mouseleave #(reset! highlighted-airbase nil)
                                   (input :type "checkbox"
                                          :css {:margin-right "7px"}
                                          :value (formula-of [airbase checked-airbases]
                                                   (checked-airbases airbase)))
                                   (let [width 25]
                                     (inl
                                      :css {:width        (px width)
                                            :margin-right (px 3)
                                            :text-align   "center"}
                                      (img
                                       :src (formula-of [mission airbase]
                                              (->> airbase
                                                   ::mission/image
                                                   (get-image mission)))
                                       :css {:max-width      (px width)
                                             :max-height     (px width)
                                             :vertical-align "middle"})))
                                   (inl
                                    :css (formula-of [status]
                                           {:width          (px 25)
                                            :height         (px 8)
                                            :margin-right   (px 5)
                                            :margin-bottom  (px 2)
                                            :vertical-align "middle"
                                            :border         "solid 1px black"
                                            :background     (let [color (airbase-status-color status)]
                                                              (gstring/format "linear-gradient(to right, %s, %s %f%%, white %f%%)"
                                                                              color color
                                                                              status status))}))
                                   (inl
                                    :css (formula-of [airbase highlighted-airbase]
                                           {:font-weight  "bold"
                                            :color        (team-color (:owner airbase) :dark-text)
                                            :margin-right "10px"
                                            :background   (when (= airbase highlighted-airbase)
                                                            "lightgoldenrodyellow")})
                                    ab-name)
                                   (inl
                                    :css {:margin-right "5px"}
                                    (for-tpl [squadron (airbase-squadrons mission airbase)]
                                      (img
                                       :toggle (formula-of [squadron included-squadrons]
                                                 (included-squadrons squadron))
                                       :src (formula-of [mission squadron]
                                              (->> squadron
                                                   ::mission/image
                                                   (get-image mission)))
                                       :css {:height         "20px"
                                             :margin-left    "3px"
                                             :vertical-align "middle"})))
                                   (div
                                    :toggle expanded?
                                    :css {:margin-left "22px"
                                          :font-style  "italic"
                                          :color       "gray"}
                                    (formula-of [status]
                                      (gstring/format "Status: %d%%" status))))))}
                  ;; Squadrons
                  {:attrs     (fn [squadron]
                                {:toggle (formula-of [squadron included-squadrons]
                                           (included-squadrons squadron))})
                   :formatter (fn [expanded? squadron]
                                (inl
                                 :id (cell= (gstring/format "air-forces-squadron-%d"
                                                            (:camp-id squadron)))
                                 (inl
                                  :css {:width      "35px"
                                        :text-align "center"}
                                  (img :src (formula-of [mission squadron]
                                              (->> squadron
                                                   ::mission/image
                                                   (get-image mission)))))
                                 (inl :css { ;;:background "#eee"
                                            :padding       "2px 4px 0 5px"
                                            :margin-bottom "3px"
                                            :margin-top    "3px"}
                                      (div :css {:font-weight "bold"}
                                           (inl :css {:margin-right "7px"}
                                                (-> squadron ::mission/aircraft :quantity str cell=))
                                           (inl (-> squadron ::mission/aircraft :airframe cell=)))
                                      (div (-> squadron :name cell=)))))}])))))))))

(defn order-of-battle-section
  [_]
  (control-section
   :title "Order of Battle"
   (if-tpl (cell= (not mission))
     "No mission loaded"
     (let [side-type-units (->> mission
                                :units
                                (group-by #(->> % :owner (mission/side mission)))
                                (reduce-kv (fn [m side units]
                                             (assoc m side (group-by :type units)))
                                           {})
                                cell=)
           search-text (cell "")]
       (div
        (span "Search:")
        ;; TODO: Add a popup (maybe use Select2) such that, when you
        ;; arrow down, it scrolls to the appropriate entry in the OOB.
        ;; Because filtering the list is all sorts of weird.
        (input :type "text"
               :value search-text
               :change #(reset! search-text @%))
        (ol
         (for-tpl [[side type-units] side-type-units]
           (li
            (span :css (cell= {:color (get-in colors [:team
                                                      :dark-text
                                                      (mission/team-color side)])})
                  (cell= (mission/team-name mission side)))
            (ol
             (for-tpl [[type units] type-units]
               (li
                (span (cell= (name type)))
                (ol
                 (for-tpl [unit units]
                   (li
                    (span (cell= (:name unit)))))))))))))))))

(defn mission-info-section
  "Returns UI for the mission info section."
  [_]
  (control-section
   :title "Mission Info"
   (div
    :css {:padding "5px"}
    (if-tpl mission
      (div
       :css {:padding "3px"}
       (div :css {:text-decoration "underline"
                  :font-size "110%"}
            "Loaded mission")
       (div (span :css {:font-weight "bold"}
                  "Theater: ")
            (cell= (mission/theaterdef-name mission)))
       (div (span :css {:font-weight "bold"}
                  "Mission: ")
            (cell= (:mission-name mission)))
       (div (span :css {:font-weight "bold"}
                  "Falcon Time: ")
            (cell= (-> mission mission/mission-time format-time))))
      (div :css {:font-size "110%"
                 :font-style "italic"}
           "No mission loaded.")))))

(defn save-briefing-section
  "Returns UI for the save briefing section."
  [_]
  (control-section
   :title (with-help [:mission-info :save-briefing]
            "Save Mission Briefing")
   (case-tpl display-mode
     :briefing
     (div
      (buttons/a-button
       :click #(save-briefing (-> @mission :original-briefing :install-id)
                              (-> @mission :original-briefing :visible-sides))
       "Save Briefing (.vmtb)")
      (help-icon [:mission-info :save-briefing-from-briefing]))
     (let [only-install     (formula-of [mission]
                              (when (-> mission :candidate-installs count (= 1))
                                (-> mission :candidate-installs keys first)))
           selected-install (cell nil)
           install-to-save  (formula-of [only-install selected-install]
                              (or only-install selected-install))]
       (div
        :css {:padding "5px"}
        (div
         (cond-tpl
           only-install
           (div (span "Briefing will be saved for installation: ")
                (span :css {:font-family "monospace"
                            :font-size   "120%"}
                      (cell= (-> mission :candidate-installs first key))))

           (-> mission :candidate-installs count zero? cell=)
           "Cannot find a matching installation of Falcon BMS for this mission."

           :else
           (div
            (div
             (span "Multiple installed copies of Falcon BMS point at the mission directory, ")
             (span
              :css {:font-family "monospace"
                    :font-size "110%"}
              (formula-of [mission]
                (-> mission :candidate-installs first val)))
             (span ". Select which installation this mission is for. (If unsure, choose 'Falcon BMS 4.33 U1'.)"))
            (comm/radio-group
             :value selected-install
             :choices (formula-of [mission]
                        (for [[install-name install-path] (:candidate-installs mission)]
                          {:value install-name
                           :label (inl install-name)}))))
           #_""))
        (div
         :css {:border        "1px solid black"
               :margin-top    "10px"
               :margin-bottom "10px"}
         (div
          :css {:color         "white"
                :background    "black"
                :margin-bottom "5px"
                :padding       "2px"}
          "Visibility")
         (comm/side-selector
          :css {:padding "0 0 5px 5px"}
          :mission mission
          :selected-sides visible-sides))
        (buttons/a-button
         :disabled? (cell= (not install-to-save))
         :click #(save-briefing @install-to-save @visible-sides)
         "Save Briefing (.vmtb)")
        (help-icon [:mission-info :save-briefing]))))))

;; TODO: Make this into something other than straight text at some point
(defn briefing-notes-section
  "Returns UI for the briefing notes section"
  [_]
  (control-section
   :title (formula-of [display-mode]
            (with-help [:mission-info :briefing-notes display-mode]
              "Briefing Notes"))
   (div
    (textarea
     :css {:font-family "monospace"
           :font-size   (pct 110)
           :width       (pct 100)}
     :rows 10
     :value briefing-notes
     :placeholder "Enter briefing notes here"
     :change #(reset! briefing-notes @%)))))

(defn map-controls-section
  "Controls for how the map is displayed."
  [_]
  (div
   (control-section
    :title (with-help [:map-controls :general] "General Display Options")
    (let [slider-row                  (fn [{:keys [label key init min max]}]
                                        (tr
                                         (with-help [:map-controls key]
                                           (td label))
                                         (td
                                          (comm/slider
                                           :min min
                                           :max max
                                           :ticks 5
                                           :value (path-lens map-display [key])))
                                         (td
                                          (buttons/a-button
                                           :click #(swap! map-display
                                                          assoc
                                                          key
                                                          init)
                                           "Reset")
                                          (help-icon [:map-controls (keyword (str "reset-" (name key)))]))))]
      (div
       (table
        (slider-row {:label "Brightness:"
                     :key   :brightness
                     :init  0.5
                     :min   0
                     :max   1.0})
        (slider-row {:label "Text size:"
                     :key   :text-size
                     :init  0
                     :min   -1.0
                     :max   1.0})
        (slider-row {:label "Icon size:"
                     :key   :icon-size
                     :init  0
                     :min   -1.0
                     :max   1.0}))
       (div
        (input :type "checkbox"
               :value (-> map-display :show-text-background? cell=)
               :change #(swap! map-display update :show-text-background? not))
        (with-help [:map-controls :show-text-background?]
          (label "Display text with contrasting background")))
       (div
        (input :type "checkbox"
               :value (-> map-display :show-bullseye? cell=)
               :change #(swap! map-display update :show-bullseye? not))
        (with-help [:map-controls :show-bullseye?]
          (label "Show bullseye")))
       (div
        (input :type "checkbox"
               ;; Inverted so we can be backward-compatible
               :value (-> map-display :hide-wind-stability? not cell=)
               :change #(swap! map-display update :hide-wind-stability? not))
        (with-help [:map-controls :show-wind-stability?]
          (label "Show wind stability regions?"))))))
   (airbase-display-controls "Airbase Display Options")
   (let [flight-path-display-controls (:map-display-controls-fn flight-paths-layer)]
     (flight-path-display-controls "Flight Path Display Options"))))

(defn damage-computer-section
  [_]
  ;; TODO: Make it possible to add a column for each weapon of
  ;; interest, so it's easy to compare.
  (control-section
   :title (with-help [:tools :damage-computer]
            "Damage computer")
   (let [selected-objective (cell nil)
         selected-weapon    (cell nil)
         selection-mode     (cell :by-weapon)]
     (div
      :css {:margin (px 0 5)}
      (inl (inl
            {:css {:margin-right (px 3)}}
            "Objective:")
           (comm/select2
            :css {:width (px 150)}
            :value selected-objective
            :choices (formula-of [mission]
                       (for [objective (->> mission
                                            ::mission/objectives
                                            (sort-by ::mission/name))]
                         {:value objective
                          :label (::mission/name objective)}))))
      (inl (inl
            {:css {:margin-left  (px 7)
                   :margin-right (px 3)}}
            "Weapon:")
           (comm/select2
            :css {:width (px 150)}
            :value selected-weapon
            :choices (formula-of [mission]
                       (for [weapon (->> mission
                                         ::mission/weapons
                                         (remove #(-> %
                                                      :hit-chance
                                                      (get c/NoMove)
                                                      zero?))
                                         (sort-by ::mission/name))]
                         {:value weapon
                          :label (::mission/name weapon)}))))
      (when-tpl selected-weapon
        (div
         (div
          (inl
           :css {:font-weight  "bold"
                 :margin-right (px 5)}
           "Damage Type:")
          (inl (formula-of [selected-weapon]
                 (get {c/NoDamage         "None"
                       c/PenetrationDam   "Penetration"
                       c/HighExplosiveDam "HE"
                       c/HeaveDam         "Heave"
                       c/IncendairyDam    "Incendiary"
                       c/ProximityDam     "Proximity"
                       c/KineticDam       "Kinetic"
                       c/HydrostaticDam   "Hydrostatic"
                       c/ChemicalDam      "Chemical"
                       c/NuclearDam       "Nuclear"
                       c/OtherDam         "Other"}
                      (:damage-type selected-weapon)
                      "Unknown"))))))
      (let [hit-data (formula-of [mission selected-objective selected-weapon]
                       (when (and selected-objective selected-weapon)
                         (damage/required-hits mission selected-objective selected-weapon)))
            col      (fn [title key]
                       {:title     title
                        :sort-key  key
                        :formatter (fn [item _]
                                     (cell= (get item key)))})]
        (when-tpl hit-data
          (grids/table-grid
           :data hit-data
           :initial-sort [:feature-value :descending]
           :key-fn identity
           :row-attrs (fn [_] {})
           :when-empty "No results available"
           :fixed-columns []
           :movable-columns (cell [:index :feature-name :feature-value :hits-required])
           :hidden-columns (cell #{})
           :columns
           {:index         (col "#" :index)
            :feature-name  (col "Name" :feature-name)
            :feature-value {:title "Value"
                            ;; Disambiguate ties through the index
                            :sort-key (fn [item]
                                        [(:feature-value item)
                                         (- (:index item))])
                            #_(juxt :feature-value :index)
                            :formatter (fn [item _]
                                         (formula-of [item _]
                                           (let [value (:feature-value item)]
                                             (if (zero? value)
                                               ""
                                               (condp > value
                                                 10 "Very Low"
                                                 25 "Low"
                                                 40 "Medium"
                                                 50 "High"
                                                 "Very High")))))}
            :hits-required {:title     "Hits Required"
                            :sort-key  :hits-required
                            :formatter (fn [item _]
                                         (formula-of [item]
                                           (let [req (:hits-required item)]
                                             (cond
                                               (nil? req)              ""
                                               (js/isNaN req)          ""
                                               (not (js/isFinite req)) "∞"
                                               :else
                                               (let [fuzz 0.25
                                                     lower (Math/ceil (max 1 (* req (- 1.0 fuzz))))
                                                     upper (Math/ceil (max 1 (* req (+ 1.0 fuzz))))]
                                                 (if (= lower upper)
                                                   (str lower)
                                                   (str lower "-" upper)))))))}})))))))


(declare make-friendly-export-key)

(defn- make-friendly-export-key
  "Given a key like comes back from `csv-ize`, turn it into something a
  little less Clojure-centric."
  [k]
  (cond
    (string? k)
    k

    (vector? k)
    (->> k
         (mapv make-friendly-export-key)
         (interpose ".")
         (apply str))

    (keyword? k)
    (let [ns (namespace k)]
      (str
       (if (= ns (namespace ::mission/foo))
         "vmt"
         ns)
       (when ns "/")
       (name k)))))

(defn- export-database
  [mission]
  (let [basename (str (-> mission :theater :name)
                      "-"
                      (-> mission :mission-name))]
    (when-let [dir (comm/get-path-for-load
                    {:title "Select directory for export"
                     :mode :directory})]
      (doseq [[k type] [[:campaign-info :map]
                        ;; :candidate-installs
                        [:class-table :vector]
                        [:events :not-yet-implemented]
                        [:feature-class-data :vector]
                        [:feature-entry-data :vector]
                        ;; :image-ids
                        ;; :installation
                        ;; :installs
                        ;; :map-image
                        ;; :mission-name
                        ;; :names
                        [:objective-class-data :vector]
                        [:objective-deltas :vector]
                        [:objectives :vector]
                        ;; :path
                        [:persistent-objects :not-yet-implemented]
                        [:pilots :not-yet-implemented]
                        [:point-header-data :vector]
                        [:ppt-data :vector]
                        [:primary-objectives :not-yet-implemented]
                        ;; :scenario-files
                        ;; :strings
                        [:teams :vector]
                        ;; :theater
                        [:unit-class-data :vector]
                        [:units :vector]
                        ;; :user-ids
                        [:vehicle-class-data :vector]
                        ;; :version
                        [:weapon-class-data :vector]]]
        (let [raw (get mission k)
              data (condp = type
                     :map [raw]
                     :vector raw
                     :not-yet-implemented [{:todo "Not yet implemented"}])]
          (-> data
              (util/csv-ize {:key-remap make-friendly-export-key})
              (->> (fs/save-data (fs/path-combine dir (str basename "-" (name k) ".csv"))))))))))

(defn database-export-section
  [_]
  (control-section
   :title (with-help [:tools :database-export]
            "Mission Database Export")
   (div
    :css {:margin (px 0 5)}
    (buttons/a-button
     :click #(export-database @mission)
     "Export"))))

(defn hidden-tools-tab
  []
  (div
   (when-tpl (cell= (= :edit display-mode))
     (database-export-section {}))
   (damage-computer-section {})))

;;; General layout

(defn head
  []
  (h/head
   (title (formula-of [mission display-mode]
            (if-not mission
              "Virtual Mission Tools"
              (str (mission/theaterdef-name mission)
                   " - "
                   (:mission-name mission)
                   (when (= :briefing display-mode)
                     ".vmtb")))))
   ;; (link :href "lib/slickgrid/slick.grid.css" :rel "stylesheet" :title "main" :type "text/css")
   ;; (link :href "lib/slickgrid/slick-default-theme.css" :rel "stylesheet" :title "main" :type "text/css")

   ;; It would be great to use ClojureScript's inclusion mechanism,
   ;; but something about the combination of that, Boot, and who knows
   ;; what else makes it not work with source maps, which are too
   ;; important to give up. So I hacked it this way. Maybe some day
   ;; I'll figure out how to fix this.
   (link :href "lib/jquery-minicolors/jquery.minicolors.css" :rel "stylesheet" :title "main" :type "text/css")
   (script :src "lib/jquery-minicolors/jquery.minicolors.min.js" :type "text/javascript")
   (link :href "lib/bgrins-spectrum-98454b5/spectrum.css" :rel "stylesheet" :type "text/css")
   (script :src "lib/bgrins-spectrum-98454b5/spectrum.js" :type "text/javascript")
   (link :href "select2.css" :rel "stylesheet" :type "text/css")
   (link :href "style.css" :rel "stylesheet" :title "main" :type "text/css")
   (link :href "fonts/open-sans-condensed/open-sans-condensed.css"
         :rel "stylesheet"
         :type "text/css")
   (link :href "fonts/share-tech-mono/share-tech-mono.css"
         :rel "stylesheet"
         :type "text/css")
   (link :href "fonts/source-code-pro/source-code-pro.css"
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
     ;;slickgrid/styles
     ))))

(defn message-display
  []
  (formula-of
    [messages]
    (for [message messages]
      (let [visible? (cell true)]
        (div
         :fade-toggle visible?
         :css {:border        "double"
               :border-color  "black"
               :background    "#945594"
               :color         "white"
               :position      "relative"
               :margin-bottom (px 3)
               :padding       (px 0 3)}
         (styled
          :garden [:a {:color "#ebff00"}]
          :css {:display       "inline-block"
                :padding-right (px 10)}
          message)
         (div
          :css {:position    "absolute"
                :color       "#ff6b6b"
                :font-size   (pct 150)
                :font-weight "bold"
                :top         (px -8)
                :right       (px 5)
                :cursor      "pointer"}
          :click #(reset! visible? false)
          "×"))))))

(defn titlebar
  "Returns UI that renders the titlebar."
  []
  (div
   :debug "titlebar"
   :css (formula-of [titlebar-fullsize?]
          {:background    "black"
           :color         "white"
           :padding       (px 4 13)
           :margin-bottom (px 2)
           :height        (px (if titlebar-fullsize? 64 27))
           :position      "relative"})
   (inl
    :debug "titlebar-contents"
    (a
     :css {:position "absolute"
           :left     (px 5)
           :top      (px -5)}
     :click #(swap! titlebar-fullsize? not)
     (comm/css-triangle
      :rotation (cell= (if titlebar-fullsize? 0 -90))
      :size 6
      :color "#888"))
    (inl
     :debug "left-words"
     :css (formula-of [titlebar-fullsize?]
            {:margin-top  (when titlebar-fullsize? (px 14))
             :margin-left (when-not titlebar-fullsize? (px 7))})
     (span
      :debug "title"
      :css (formula-of [titlebar-fullsize?]
             {:padding-top (px 16)
              :font-size   (pct (if titlebar-fullsize? 200 125))})
      "Virtual Mission Tools")
     (span
      :debug "version"
      :css {:padding-left (px 10)}
      (let [{:strs [VERSION CHANNEL]} build-info]
        (str "("
             (or VERSION "dev-build")
             (when (and CHANNEL
                        (not= CHANNEL "stable"))
               (str "@" CHANNEL))
             ")")))
     (span
      :debug "byline"
      :css {:padding-left (px 5)}
      "by"
      (styled
       :css {:display "inline-block"}
       :garden [[:a         {:padding-left (px 5)}]
                [:a:link    {:color "white"}]
                [:a:visited {:color "white"}]
                [:a:hover   {:color "lightblue"}]]
       (a :href "http://firstfighterwing.com/VFW/member.php?893-Tyrant"
          :target "_blank"
          "Tyrant"))))
    (inl
     :debug "right-words"
     (styled
      :debug "helpstring"
      :garden (formula-of [titlebar-fullsize?]
                [[:span {:position "absolute"
                         :right    (px (if titlebar-fullsize? 100 54))
                         :bottom   (px 7)}]
                 [:a {:color       "white"
                      :margin-left (ems 0.2)}]
                 [:a:visited {:color "white"}]
                 [:a:hover {:color "lightblue"} ]])
      (span
       "Help? Bug? Feature request? Click"
       (a :href "https://www.bmsforum.org/forum/showthread.php?31611-Release-Tyrant-s-Virtual-Mission-Tools-(VMT)&p=441129#post441129"
          :target "_blank"
          "here")
       "."))
     (a
      :css {:position "absolute"
            :right    (px 20)
            :top      (px 7)}
      :href "http://firstfighterwing.com"
      :target "_blank"
      (img
       :css (formula-of [titlebar-fullsize?]
              {:display "inline-block"
               :height  (px (if titlebar-fullsize? 64 24))})
       :src "images/1stVFW_Insignia-64.png"))))))

(defn- layer-controls
  "Return controls for a layer."
  [layer & args]
  (let [ctor (:controls-fn layer)]
    (apply ctor args)))

(def section-ctor
  {:mission-info-section        mission-info-section
   :save-briefing-section       save-briefing-section
   :briefing-notes-section      briefing-notes-section
   :serialization-controls      serialization-controls
   :step-controls               step-controls
   :weather-display-controls    weather-display-controls
   :weather-parameters          weather-parameters
   :forecast-section            forecast-section
   :weather-type-configuration  weather-type-configuration
   :cloud-controls              cloud-controls
   :wind-stability-parameters   wind-stability-parameters
   :weather-override-parameters weather-override-parameters
   :advanced-controls           advanced-controls
   ;; :flight-path-controls flight-path-controls
   :flights-section             (fn [opts]
                                  (layer-controls flight-paths-layer
                                                  (::scroll-container opts)))
   :air-forces-section          air-forces-section
   :map-controls-section        map-controls-section
   :annotation-controls         (fn [opts]
                                  (layer-controls annotations-layer))
   :oob-section                 order-of-battle-section
   :acmi-controls               (fn [opts]
                                  (layer-controls acmi-layer))
   :test-section                test-section})

(defn weather-page
  "Emits an app page. `section-infos` is a seq of maps, one for each
  tab, with keys `:title`, `:id`, and `:sections`. The sections are a
  seq of keys into `section-ctor` and the parameters for that
  section."
  [section-infos]
  (html
   (head)
   (h/body
    {:css {:margin "8px"}}
    (div
     :id "app"
     (titlebar)
     (message-display)
     (let [right-width controls-min-width]
       (div
        :css (formula-of
               {titlebar-height              titlebar-height
                [window-width window-height] window-size}
               {:display        "flex"
                :flex-direction "row"
                ;; These next plus the overflow/height in the columns are
                ;; what let the two sides scroll separately
                :overflow       "hidden"
                :height         (px (-> window-height
                                        (- titlebar-height)
                                        (- 26)))})
        (div
         :class "left-column"
         :css {:overflow "auto"
               :height   "auto"}
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
        (let [right-column (div)]
          (right-column
           :class "right-column"
           :css {:display       "block"
                 :align-content "flex-start"
                 :flex-wrap     "wrap"
                 :flex-grow     1
                 :min-width     (str (- right-width 20) "px")
                 ;;  This one weird trick keeps the column from expanding
                 ;;  past where it should. Yay CSS.
                 :width         0
                 :overflow      "auto"
                 :height        "auto"}
           (let [first-tab    (-> section-infos first :id)
                 selected-tab (cell first-tab)]
             (.addEventListener js/document
                                "keydown"
                                (fn [event]
                                  (when (and (= (.-code event) "KeyT")
                                             (or (.-altKey event)
                                                 (.-metaKey event))
                                             (.-ctrlKey event))
                                    (dosync
                                     (swap! tools-visible? not)
                                     (reset! selected-tab
                                             (if @tools-visible?
                                               :tools-tab
                                               first-tab))))))
             (tabs/tabs
              :tab-background "#FDFFD9"
              :selected selected-tab
              :tabs (concat
                     (for [{:keys [title id sections]} section-infos]
                       {:title title
                        :id    id
                        :ui    (for [[section opts] (partition 2 sections)
                                     :let           [ctor (section-ctor section)]]
                                 (with-time
                                   (str "Rendering " section)
                                   (ctor (assoc opts ::scroll-container right-column))))})
                     [{:title   "Tools"
                       :id      :tools-tab
                       :ui      (hidden-tools-tab)
                       :hidden? (cell= (not tools-visible?))}]))))))))
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

#_(defmethod hoplon.core/on! :hoplon.core/default
  [elem event callback]
  (when-dom elem #(do
                    (.log js/console "Executing default on! method"
                           "elem" elem "event" event "callback" callback)
                    (.on (js/jQuery elem) (name event) callback))))

#_(defmethod hoplon.core/do! :hoplon.core/default
  [elem key val]
  (hoplonc.core/do! elem :attr {key val}))
