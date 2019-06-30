(ns weathergen.ui.common
  "Things used across various UI libraries."
  (:require [cljsjs.select2]
            ;; [cljsjs.tinycolor]
            [clojure.data]
            [clojure.pprint :as pp]
            [clojure.set :as set]
            [clojure.string :as str]
            [garden.core :refer [css]]
            [garden.selectors :as css-sel]
            [garden.stylesheet :as css-style]
            [goog.dom :as gdom]
            [goog.string :as gstring]
            [goog.string.format]
            [hoplon.core :refer [a datalist defelem div do-watch fieldset for-tpl h4
                                 i if-tpl img input label legend
                                 option pre select span style with-timeout]]
            [hoplon.jquery]
            [hoplon.storage-atom :refer [local-storage]]
            [hoplon.svg :as svg]
            [javelin.core :refer [cell cell? cell= cell-let dosync formula-of lens with-let]]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]
            [weathergen.falcon.files.images :as im]
            [weathergen.falcon.files.mission :as mission]
            [weathergen.filesystem :as fs]
            [weathergen.math :as math]
            [weathergen.settings :refer [app-dir]]
            [weathergen.time :as time])
  (:require-macros
   [weathergen.cljs.macros :refer [with-attr-bindings with-bbox with-time #_formula-of hint-> hint]]))

(def ^js/electron electron (js/require "electron")
  #_(when (= "nodejs" cljs.core/*target*)
      (js/require "electron")))

;; Here's the old way I was doing it:

#_(def ^js/tinycolor tinycolor js/tinycolor
 ;; This is a massive hack that I had to do at one point, and I have no
 ;; idea what we're going to do if some other library decides to say
 ;; `module.exports` in its code.
  #_ (.-exports js/module)
  #_(if (= "nodejs" cljs.core/*target*)
      (.-exports js/module)
      js/tinycolor))

(def ^js/tinycolor tinycolor (js/require "tinycolor2"))

(defn parse-int
  "Parses an int from a string, returning the int, or nil if it cannot
  be parsed as an int."
  [s]
  (let [n (-> s js/Number. .valueOf)
        l (long n)]
    (when (int? n)
      l)))

(defn parse-float
  "Parses a number from a string, returning it, or nil if it cannot
  be parsed."
  [s]
  (let [n (-> s js/Number. .valueOf)]
    (when-not (js/isNaN n)
      n)))

(let [registry     (atom #{})
      batch        10
      min-interval 1
      interval     (atom min-interval)
      max-interval 200
      pending-call (atom false)]
  (defn- process
    []
    (let [processed? (loop [found?                                   false
                            [{:keys [elem f] :as item} & more-items] (->> @registry
                                                                          shuffle
                                                                          (take batch))]
                       (let [in-dom? (-> js/document .-documentElement (.contains elem))]
                         (when in-dom?
                           (swap! registry disj item)
                           (try
                             (f)
                             (catch :default x
                               (.log js/warn "Error while invoking when-dom handler" elem x))))
                         (if (seq more-items)
                           (recur (or found? in-dom?)
                                  more-items)
                           found?)))]
      (swap! interval (fn [current]
                        (if processed?
                          min-interval
                          (max max-interval (* 2 current)))))
      (reset! pending-call false)
      (with-timeout @interval
        (process))))

  (with-timeout @interval
    (process))

  ;; I tried to use the animation-start trick
  ;; http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted/
  ;; but it didn't work in all cases. This is the only thing that
  ;; worked consistently without killing the CPU.
  (defn- when-dom5
    [elem f]
    (swap! registry conj {:elem elem :f f})
    ;; If someone registers a new element, set up a processing loop to
    ;; happen as soon as possible, but don't pile them up, since we
    ;; probably get bunches of these calls all at once.
    (when-not @pending-call
      (reset! pending-call true)
      (with-timeout min-interval
        (process)))))

(let [agenda         (atom (sorted-map))
      timer-interval 5
      max-interval   150
      now            (fn [] (.getTime (js/Date.)))
      process        (fn process []
                       (let [t (now)]
                         (doseq [[k v] (->> @agenda
                                            (filter (fn [[k v]]
                                                      (< k t))))]
                           (swap! agenda dissoc k)
                           (doseq [{:keys [elem f interval] :as item} v]
                             (if (-> js/document .-documentElement (.contains elem))
                               (try
                                 (f)
                                 (catch :default x
                                   (.log js/warn "Error while invoking when-dom handler" elem x)))
                               (let [new-interval (max max-interval (* 2 interval))
                                     new-time     (+ t new-interval)]
                                 (swap! agenda update new-time conj (assoc item :interval new-interval)))))))
                       (with-timeout timer-interval
                         (process)))]

  (with-timeout timer-interval
    (process))

  (defn- when-dom6
    [elem f]
    (swap! agenda update (now) conj {:elem elem :f f :interval 1})))

(defn when-dom*
  "Like Hoplon's `when-dom`, but hopefully without the CPU problems."
  [elem f]
  ;; The idea here is to dispatch to different implementations based
  ;; on what works best for a given scenario. At the moment there's
  ;; only one strategy.
  (when-dom6 elem f)
  elem)

;; (set! *warn-on-infer* true)


(defn measurement
  "Returns a measurement string, e.g. '2px'. Allows multiple
  arguments, in which case it will return a margin-style string,
  e.g. `(measurement \"px\" 1 2)` returns '1px 2px'."
  [unit & ns]
  (->> ns
       (map #(str % unit))
       (str/join " ")))

(defn px
  "Returns a pixel measurement string, e.g. '2px'. See `measurement`."
  [& ns]
  (apply measurement "px" ns))

(defn pct
  "Returns a percentage measurement string, e.g. '50%'. See `measurement`."
  [& ns]
  (apply measurement "%" ns))

;; Named to avoid conflict with Hoplon's `em`
(defn ems
  "Returns a measurement string in em, e.g. '2em'. See `measurement`."
  [& ns]
  (apply measurement "em" ns))

(def colors
  {:invalid       "#c70505"
   :invalid-background "#fcc"
   :error-message "#c70505"
   :edit "rgba(128,128,255,0.5)"
   :header-background "lightgray"
   :team {:dark-text {:white "gray"
                      :green "green"
                      :blue "blue"
                      :brown "#923c25"
                      :orange "darkorange"
                      :yellow "#caae18"
                      :red "red"
                      :gray "darkgray"}
          :light-text {:white "white"
                       :green "lightgreen"
                       :blue "#8ddbf5"
                       :brown "#e27e43"
                       :orange "orange"
                       :yellow "yellow"
                       :red "#f9adad"
                       :gray "lightgray"}}})

(defn team-color
  "Returns a color for a team."
  [team type]
  (get-in colors [:team type (mission/team-color team)]))

(def class-for
  "Given a keyword, returns a string safe to use as a css class name."
  (memoize
   (fn [kw]
     (-> kw str (subs 1) (str/replace #"[^a-zA-Z0-9]" "-")))))

(defn class-selector-for
  "Given a keyword, returns a garden class selector usable with class-for."
  [kw]
  (->> kw class-for (str ".") css-sel/selector))

(defn classes
  "Given a Hoplon-style map of classes to booleans, return a sequence of
  the class names whose values are true."
  [m]
  (for [[class bool] m
        :when bool]
    class))

;; At some point, it looks like Hoplon stopped allowing maps for
;; values of the :class attribute.
;; Later: turns out that's not
;; actually true. I was just not requiring hoplon.jquery, where the
;; event handlers that result in all that working get set up.
#_(defn classes-str
  "Given a map, return a space-separated concatenation of the strings
  where the values are logically true. Keys must be nameable."
  [m]
  (str/join " " (classes m)))


(let [registered-styles (atom #{})
      pending           (atom {})]

  (defn- register-style!
    [key garden]
    (log/debug "Registering style" key)
    (.appendChild (.-head js/document)
                  (style
                   :type "text/css"
                   :debug (str key)
                   (cell= (css garden))))
    (swap! registered-styles conj key)
    (log/debug "Registered style" key))

  (.addEventListener js/document
                     "DOMContentLoaded"
                     (fn [_]
                       (log/debug "Document loaded. Registering pending styles.")
                       (doseq [[key garden] @pending]
                         (register-style! key garden))
                       (reset! pending {})))

  (defn register-styles!
    "Adds styles to the head of the document. If already registered under `key`, does nothing."
    [key garden]
    (when-not (contains? @registered-styles key)
      (if-not (= "complete" (.-readyState js/document))
        (swap! pending assoc key garden)
        (register-style! key garden)))))

(defn register-class!
  "Adds a style to the head of a document for abstract class `key`.
  `key` should be a namespaced keyword that can then be used as the
  `:class` of an element via `class-for`. `garden` is the tail of a
  garden style statement, i.e. everything except the seelctor.

  Example:

  (register-class!
    ::foobar
    [{:background \"blue\"} [:&:hover {:background \"red\"}]])"
  [key garden]
  (register-styles! key (into [(class-selector-for key)] garden)))

(defn contrasting
  "Returns a color that contrasts well with the specified color.
  Optionally, the colors to use for dark and light can be specified."
  ([color] (contrasting color "black" "white"))
  ([color dark light]
   ;; http://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
   (-> tinycolor (.mostReadable color #js [dark light]) (hint-> js/tinycolor) .toHexString)
   #_(let [rgb (-> color tinycolor .toRgb)
         ;; Advanced compilation is somehow screwing up direct field
         ;; access, so we have to go in by name.
         r (aget rgb "r")
         g (aget rgb "g")
         b (aget rgb "b")]
     (if (< 128 (+ (* r 0.299) (* g 0.587) (* b 0.114)))
       dark
       light))))

(defn darken
  "Darkens a color by an amount from 0-100."
  [color amount]
  ;; Don't like writing this way, but not sure how else to get the
  ;; compiler to correctly avoid symbol renaming in advanced
  ;; compilation.
  (-> color tinycolor (hint-> js/tinycolor) (.darken amount) (hint-> js/tinycolor) .toHexString))

(defn lighten
  "Lightens a color by an amount from 0-100."
  [color amount]
  (-> color tinycolor (hint-> js/tinycolor) (.lighten amount) (hint-> js/tinycolor) .toHexString))

(defn spin
  "Rotates a color by an amount from 0 to 360 degrees."
  [color amount]
  (-> color tinycolor (hint-> js/tinycolor) (.spin amount) (hint-> js/tinycolor) .toHexString))

(defn to-hex-str
  "Converts a color to a hex string."
  [color]
  (-> color tinycolor (hint-> js/tinycolor) .toHexString))

(defn to-hex8-str
  "Converts a color to a hex string including alpha."
  ([color] (-> color tinycolor (hint-> js/tinycolor) .toHex8String))
  ([color alpha]
   (.toHex8String (doto (-> color tinycolor (hint-> js/tinycolor))
                    (.setAlpha alpha)))))

(defn to-rgba
  "Converts a color to an rgba string. Eight-digit hex strings are
  assumed to be in the format #AARRGGBB."
  [color]
  (let [color* (if (and (string? color)
                        (re-matches #"#[0-9A-Fa-f]{8}" color))
                 (str "#" (subs color 3 9) (subs color 1 3))
                 color)]
    (let [tc (-> color* tinycolor .toRgb)]
      (str "rgba(" (.-r tc) ", " (.-g tc) ", " (.-b tc) ", " (.-a tc) ")"))))

(defelem styled
  "Creates an element which is a scope for a set of CSS rules,
  provided via a `:garden` attribute, by adding an element with a
  unique ID and new <style> element to the <head> of the document."
  [attrs content]
  (let [{:keys [garden]} attrs
        attrs (dissoc attrs :garden)
        ^js/Element head (aget (.getElementsByTagName js/document "head") 0)
        id (str (gensym))
        styles (cell= (css [(keyword (str "#" id))
                            garden]))]
    (.appendChild head (style :type "text/css" styles))
    (div
     (merge attrs {:id id})
     content)))

(defelem external-link
  "Creates an element that will open in an external browser."
  [attrs content]
  (a
   (-> attrs
       (assoc :href "")
       (assoc :click (fn [e]
                       (.preventDefault e)
                       (-> electron .-shell (.openExternal (:href attrs))))))
   content))

(defelem inl
  [attrs content]
  (let [{:keys [css]} attrs]
    (div
     (update attrs
             :css
             (fn [css-orig]
               (if (cell? css-orig)
                 (formula-of [css-orig]
                   (assoc css-orig :display "inline-block"))
                 (assoc css-orig :display "inline-block"))))
     content)))

(defn rinl
  "Makes an inline-block div."
  [& [props & content :as args]]
  (if (map? props)
    [:div
     (assoc-in props [:style :display] "inline-block")
     content]
    [:div
     {:style {:display "inline-block"}}
     args]))

(defelem css-triangle
  "Returns a CSS triangle. Rotation is zero when pointed down."
  [attrs _]
  (with-attr-bindings attrs [size rotation color]
    (div
     attrs
     :css (formula-of [rotation]
            {:display            "inline-block"
             :width              0
             :height             0
             :border-left-width  (px (* 0.66 size))
             :border-left-style  "solid"
             :border-left-color  "transparent"
             :border-right-width (px (* 0.66 size))
             :border-right-style "solid"
             :border-right-color "transparent"
             :border-top-width   (px size)
             :border-top-style   "solid"
             :border-top-color   color
             :transform          (str "rotate("
                                      rotation
                                      "deg)")}))))

(defelem triangle
  [attrs _]
  (let [{:keys [r]} attrs
        r*          (cell= r)
        attrs       (dissoc attrs :r)
        alpha       0.8660254037844387 ; sin 60deg
        beta        0.5                ; sin 30deg
        x           (cell= (* r* alpha))
        y           (cell= (* r* alpha))]
    (svg/path
     :d (formula-of [x y]
          (gstring/format "M%f,%f L%f,%f L%f,%f Z"
                          0 (- y)
                          x y
                          (- x) y))
     attrs)))

(defn rtriangle
  "Rum version of `triangle`."
  [attrs]
  (let [{:keys [r]} attrs
        attrs       (dissoc attrs :r)
        alpha       0.8660254037844387  ; sin 60deg
        beta        0.5                 ; sin 30deg
        x           (* r alpha)
        y           (* r alpha)]
    [:path
     (assoc attrs
            :d (gstring/format "M%f,%f L%f,%f L%f,%f Z"
                               0 (- y)
                               x y
                               (- x) y))]))

(defn pre-cell
  "Pretty-prints the value of cell c and displays it in a pre tag."
  [title c]
  (register-styles!
   ::pre-cell
   [[:.pre-cell {:background "black"
                 :color "green"
                 :font-family "monospace"}]])
  (div
   :class "pre-cell"
   (h4 title)
   (pre
    :css {:white-space "pre-wrap"}
    (cell= (pp/write c :stream nil :pretty true)))))

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


(defn format-time
  "Formats a campaign time into a string. `opts` is a map of options:

  `:seconds?` - If true, format time including seconds.
  `:omit-day?` - If true, don't include the day in the result"
  ([{:keys [day hour minute second] :as time}] (format-time time {}))
  ([{:keys [day hour minute second] :as time} {:keys [seconds? omit-day?] :as opts}]
   (when time
     (str (if omit-day? "" (gstring/format "%02d/" day))
          (if seconds?
            (gstring/format "%02d:%02d:%02d"
                            hour
                            minute
                            second)
            (gstring/format "%02d:%02d"
                            hour
                            minute))))))

(defn format-heading
  "Formats a heading"
  [^js/Number heading]
  (some-> heading (.toFixed 0)))

(defn format-distance
  "Formats a distance"
  [^js/Number distance]
  (some-> distance (.toFixed 1)))

(defn format-speed
  "Formats a speed."
  [^js/Number speed]
  (some-> speed (math/nearest 5) (.toFixed 0)))

(defn format-mach
  "Formats a Mach number."
  [^js/Number mach]
  (some-> mach (.toFixed 2)))

(defelem color-picker
  "Renders a color selection element. Attributes can include:

- `value` - a cell holding a hex color string.

- `alpha?` - a boolean indicating whether opacity selection is permitted.

- `change` - a function passed the new color, called when the selected
  color changes.

- `show` - a function of no arguments that will be called when the
  selection UI is shown.

- `hide` - a function of no arguments that will be called when the
  selection UI is hidden."
  [attrs _]
  ;; Because sometimes we want to set the value and not have the
  ;; corresponding change event fire, we override it, and only pass it
  ;; along when the change occurs while the picker is open. If we need
  ;; to, we can add an option or another event for changes that happen
  ;; due to the value cell being updated.
  (with-attr-bindings attrs [change hide show alpha? value]
    (let [open? (atom false)]
      (with-let [i (input #_attrs
                          :id (str (gensym))
                          :value @value
                          :class "minicolors"
                          :type "hidden"
                          #_:change #_(fn [e]
                                        (.log js/console
                                              "Change event on input"
                                              @e)
                                        (reset! value @e)
                                        nil))]
        #_(when-dom i
            #(-> i
                 js/jQuery
                 (hint-> js/HTMLInputElement)
                 (.minicolors "value" (to-hex-str @value))))
        (add-watch value
                   (-> (gensym) str keyword)
                   (fn [_ _ _ n]
                     #_(.log js/console "value changing" n (to-hex-str n) i)
                     (when n
                       (-> i
                           js/jQuery
                           ;; (hint-> js/HTMLInputElement)
                           (.minicolors "value" (to-hex-str n) #_(to-hex8-str n))))))
        (when-dom* i
          #(-> i
               js/jQuery
               (hint-> js/HTMLInputElement)
               (.minicolors #js {"theme"   "weathergen"
                                 "show"    (fn []
                                             (reset! open? true)
                                             (when show (show)))
                                 "hide"    (fn []
                                             (reset! open? false)
                                             (when hide (hide)))
                                 ;; "format"  "hex"
                                 "opacity" (boolean alpha?)
                                 #_"change"  #_(fn [val opacity]
                                                 (.log js/console
                                                       "change event"
                                                       val
                                                       opacity)
                                                 #_(with-timeout 0
                                                     (reset! value "changed"))
                                                 #_(cond
                                                     (not change)
                                                     (do
                                                       (.log js/console "color changing"
                                                             (pr-str val)
                                                             (pr-str opacity)
                                                             (to-hex-str val)
                                                             #_(to-hex8-str val opacity))
                                                       (reset! (:value attrs)
                                                               (to-hex-str val)
                                                               #_(to-hex8-str val opacity)))

                                                     @open?
                                                     (change (to-hex8-str val opacity))))})))))))

(defelem color-picker2
  "Like `color-picker`, but uses spectrum."
  [attrs _]
  (register-styles!
   ::color-picker2
   [:.vmt-color-picker
    [:&.sp-replacer {:padding (px 2)}]
    [:.sp-preview {:width        (px 18)
                   :height       (px 18)
                   :margin-right (px 2)}]])
  (with-attr-bindings attrs [value change alpha?]
    (with-let [elem (input :type "hidden")]
      (let [change* (fn [color]
                      (let [hex (if alpha?
                                  (.toHex8String color)
                                  (.toHexString color))]
                        (if change
                          (change hex)
                          (reset! value hex))))
            f       (fn f []
                      (with-timeout 0
                        (if-let [s (some-> elem
                                           js/jQuery
                                           .-spectrum)]
                          (do
                            (add-watch value
                                       (keyword (str (gensym)))
                                       (fn [_ _ _ n]
                                         (-> elem
                                             js/jQuery
                                             (.spectrum "set" n))))
                            (-> elem
                                js/jQuery
                                (.spectrum
                                 #js {:color              @value
                                      :showAlpha          (boolean alpha?)
                                      :replacerClassName  "vmt-color-picker"
                                      :containerClassName "vmt-color-picker"
                                      :change             change*
                                      :move               change*
                                      :hide               change*})))
                          (f))))]
        (f)))))

(defelem side-label
  "Returns UI for the display name of a side."
  [attrs _]
  (let [{:keys [mission side]} attrs
        allies                 (formula-of [mission side]
                                 (let [side-teams (->> mission
                                                       mission/teams
                                                       (filter #(-> % :team :c-team (= side)))
                                                       (map #(-> % :team :who))
                                                       set)]
                                   (disj side-teams side)))]
    (div
     (dissoc attrs :mission :side)
     (for-tpl [elem (formula-of [mission side allies]
                      (interpose {:color "" :name "/"}
                                 (for [team (into [side] allies)]
                                   {:color (team-color team :dark-text)
                                    :name  (mission/team-name mission team)} )))]
       (cell-let [{:keys [color name]} elem]
         (span
          :css (cell= {:color color})
          (cell= name)))))))

(defn- iterator-seq
  [iter]
  (loop [v    []
         curr (.next iter)]
    (if (.-done curr)
      v
      (recur (conj v (.-value curr))
             (.next iter)))))

;; ;; Doesn't work: MutationObservers don't recursively watch the
;; ;; tree.
;; (defn when-dom2
;;   "Like `when-dom`, but without the infinite loop."
;;   [elem f]
;;   (if (-> js/document .-body (.contains elem))
;;     (f)
;;     (let [observer (atom nil)
;;           check    (fn [records]
;;                      (.log js/console
;;                            "mutated"
;;                            (->> records
;;                                 (mapcat #(-> % .-addedNodes .values iterator-seq))
;;                                 (into [])))
;;                      (when (->> records
;;                                 (mapcat #(-> % .-addedNodes .values iterator-seq))
;;                                 (some #(= % elem)))
;;                        (.log js/console "found it!")
;;                        (.disconnect @observer)
;;                        (f)))]
;;       (reset! observer (js/MutationObserver. check))
;;       (.observe @observer
;;                 (.-body js/document)
;;                 #js {:childList true
;;                      :subtree   true})
;;       elem)))

(defelem select2
  "Renders a jQuery Select2 control. `:choices` is a (cell or non-cell)
  sequence of maps, each of which must contain a `:value` key. These
  values will be used to set the cell passed in for `:value`.
  `:formatter` is a function which, when passed one of the items from
  the `:choices` sequence, returns UI used to display it in the
  dropdown.

  Optional attributes:

  :formatter - defaults to `:label`.
  :placeholder - adds a choice with value nil when present
  :allow-clear? - Adds the 'clear' button."
  [attrs kids]
  (with-attr-bindings attrs [choices formatter value placeholder allow-clear?]
    (let [choices*   (formula-of [choices placeholder]
                       (into (if placeholder
                               [{:value nil ::placeholder? true}]
                               [])
                             choices))
          formatter  (or formatter :label)
          index      (cell= (->> choices*
                                 (zipmap (map #(gstring/format "%05d" %) (range)))
                                 (into (sorted-map))))
          formatter* (fn [state]
                       (let [val (get @index (.-id state))]
                         (if val
                           (formatter val)
                           placeholder)))
          lookup     (fn [val]
                       (some->> @index
                                (filter (fn [[id item]]
                                          (= (:value item) val)))
                                first
                                key))]
      (with-let [elem (select attrs kids)]
        (do-watch value
          (fn [_ n]
            (let [e (js/$ elem)]
              (if-let [found (lookup n)]
                (doto e
                  (.val found)
                  (.trigger "change"))
                ;; TODO: How do we handle this?
                (.warn js/console "select2: item" (pr-str n) "not found")))))
        (add-watch index
                   (gensym)
                   (fn [_ _ _ n]
                     #_(.log js/console "select2: add-watch running " (pr-str n))
                     (let [s (-> elem
                                 js/jQuery
                                 (hint-> js/jQuery)
                                 .empty
                                 #_(.trigger "change"))]
                       (-> (reduce (fn [s {:keys [value ::placeholder?]}]
                                     #_(.log js/console "Adding"
                                             ":label" label
                                             ":id" (lookup value))
                                     (let [id (if placeholder?
                                                ""
                                                (lookup value))]
                                       (.append s (js/Option. id id false false))))
                                   s
                                   @choices*)
                           (.val (lookup @value))
                           (.trigger "change")))))
        (with-timeout 0
          ;; do
          (-> js/jQuery .-fn .-select2 .-defaults (.set "width" "resolve"))
          (-> elem
              js/jQuery
              (hint-> js/jQuery)
              (.select2 (clj->js
                         (cond->
                             {:data              (clj->js (for [[id item] @index]
                                                            {:text (if (::placeholder? item)
                                                                     ""
                                                                     id)
                                                             :id   (if (::placeholder? item)
                                                                     ""
                                                                     id)}))
                              :templateResult    formatter*
                              :templateSelection formatter*
                              :allowClear allow-clear?}
                           placeholder
                           (merge {:placeholder placeholder}))))
              (.on "change" (fn [e]
                              (let [v (->> e
                                           .-currentTarget
                                           .-value
                                           (get @index)
                                           :value)]
                                #_(.log js/console "changed" v)
                                (reset! value v))))
              (.val (lookup @value))
              (.trigger "change")))))))

(defn image-cache-path
  "Returns a path to where we should cache an image."
  [image-descriptor]
  (fs/path-combine app-dir "cache" "images" (str (im/cache-key image-descriptor) ".png")))

(defn save-blob-async
  "Asynchronously saves `blob` to `path`."
  [blob path]
  ;; While it would seem like there must be a better way to do this, I
  ;; haven't found it
  (let [reader (js/FileReader.)]
    (-> reader
        .-onload
        (set! (fn []
                (->> reader
                     .-result
                     js/Buffer.from
                     (fs/save-data path))
                ;; Might need this - no idea what it does.
                ;;   deferred.resolve();
                )))
    (.readAsArrayBuffer reader blob)))

(defn save-data
  "Prompts the user for a path and saves a file.

  `:title` - the title of the dialog that will be shown.
  `:data`  - a string, Blob, or Buffer of data to save.
  `:filters` - A seq of maps containing `:name` (string) and
               `:extension` (vector of strings) to populate the
               dialog's filter dropdown with.
  `:default-path` - Absolute directory path, absolute file path,
                    or file name to use by default."
  [{:keys [data title filters default-path] :as params}]
  (when-let [path (-> electron
                      .-remote
                      .-dialog
                      (.showSaveDialog
                       (clj->js (cond-> {:title       title
                                         :filters     [filters]}
                                  default-path (assoc :defaultPath default-path)))))]
    (if (instance? js/Blob data)
      (save-blob-async data path)
      (fs/save-data path data))))

(defn get-path-for-load
  "Prompts the user for a path from which to load a a file. Returns nil
  if no path was selected.

  `:title` - the title of the dialog that will be shown.
  `:mode` - `:file` or `:directory`. Defaults to `:file`.
  `:filters` - A seq of maps containing `:name` (string) and
               `:extensions` (vector of strings) to populate the
               dialog's filter dropdown with.
  `:default-path` - Absolute directory path, absolute file path,
                    or file name to use by default."
  [{:keys [title filters default-path mode]}]
  (let [mode    (or mode :file)
        filters (or filters [])]
    (when-let [[path] (-> electron
                          .-remote
                          .-dialog
                          (.showOpenDialog
                           (clj->js
                            (cond->
                                {:title       title
                                 :properties  [(if (= :file mode)
                                                 "openFile"
                                                 "openDirectory")]
                                 :filters     filters}
                              default-path (assoc :defaultPath default-path)))))]
      path)))

(defn get-image
  "Return a URL for the image identified by `image-descriptor`."
  [mission image-descriptor]
  (when-not (:base image-descriptor)
    (log/warn "Trying to load an image with no base in its descriptor"
              :image-descriptor image-descriptor))
  (let [path (image-cache-path image-descriptor)]
    (if (fs/exists? path)
      path
      (let [^js/HTMLCanvasElement canvas (.createElement js/document "canvas")]
        (with-time
          (str "Loading image " (:image-id image-descriptor))
          (im/read-image
           mission
           image-descriptor
           (fn [width height]
             (-> canvas .-width (set! width))
             (-> canvas .-height (set! height))
             (let [^js/CanvasRenderingContext2D context (.getContext canvas "2d")
                   ^js/ImageData image-data (.getImageData context 0 0 width height)
                   buf (-> image-data .-data .-length js/ArrayBuffer.)
                   buf8 (js/Uint8ClampedArray. buf)
                   data (js/Uint32Array. buf)]
               {:set-pixel! (fn [^long x ^long y ^long argb]
                              (aset data (+ x (* y width)) argb))
                :finalize (fn []
                            (-> image-data .-data (.set buf8))
                            (-> context (.putImageData image-data 0 0)))}))))
        ;; Async - cache for later use
        (.toBlob canvas
                 (fn [blob]
                   (save-blob-async blob path)))
        (.toDataURL canvas)))))

(defn centered-image
  "Renders an image centered in width and height."
  [mission image size]
  (let [dims (formula-of [image]
               (if-not image
                 {:w size
                  :h size}
                 (let [[w h]  (get-in image [:image-data :size])
                       aspect (/ w h)]
                   (if (< aspect 1)
                     {:w (* aspect size)
                      :h size}
                     {:w size
                      :h (/ size aspect)}))))]
    (div
     :css (formula-of [dims]
            {:display        "inline-block"
             :margin         (px 0 (:w dims) 0 0)
             :vertical-align "middle"
             :text-align     "center"
             :position       "relative"})
     (if-tpl image
       (img
        :css (formula-of [dims]
               {:position "absolute"
                :top      0
                :bottom   0
                :left     0
                :right    0
                :width    (px (:w dims))
                :height   (px (:h dims))
                :margin   "auto"})
        :src (cell= (get-image mission image)))
       " "))))



;; Conformers are functions that take a cell containing a string value
;; to conform, and return a cell (presumably a formula of the input
;; cell) that yields a map containing keys:
;;
;; :valid? - True if the value is acceptable
;; :message - Text describing the problem if any
;; :value - The parsed value
;;
;; Note that even if :valid? is false, value may still contain a
;; value, for those cases where the value could be parsed, but is not
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
          {:valid?  valid?
           :message (when-not valid?
                      message)
           :value   parsed})))))

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

(defn conform-nonnegative-float
  [s]
  (formula-of
   [s]
   (let [parsed (parse-float s)
         valid? (and parsed (not (neg? parsed)))]
     {:valid? valid?
      :message (when-not valid?
                 "Must be a number greater or equal to zero.")
      :value parsed})))

(defn time-conformer
  [max-time]
  (fn [val]
    (formula-of
      [val]
      (let [[all dd hh mm] (re-matches #"(\d+)/(\d\d):(\d\d)" (or val ""))
            day             (->> dd js/Number. long)
            hour            (->> hh js/Number. long)
            min             (->> mm js/Number. long)
            valid?          (and dd hh mm
                                 (int? day)
                                 (int? hour)
                                 (int? min)
                                 (<= 0 hour 23)
                                 (<= 0 min 59))
            val             {:day    day
                             :hour   hour
                             :minute min}
            over-max?       (and valid?
                                 max-time
                                 (< (time/campaign-time->minutes max-time)
                                    (time/campaign-time->minutes val)))]
        {:valid?  (and valid? (not over-max?))
         :message (cond
                    (not valid?) "Time must be in the format 'dd/hh:mm'"
                    over-max?    (str "Time cannot be set later than "
                                      (format-time max-time)))
         :value   {:day    day
                   :hour   hour
                   :minute min}}))))

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

(defelem team-selector
  "Draws a grid of flags and checkboxes to pick teams."
  [attrs _]
  (with-attr-bindings attrs [mission selected-teams selectable-teams]
    (div
     :css {:margin-bottom "5px"}
     attrs
     (for-tpl [team (cell= (mission/teams mission))]
       (inl
        :css (formula-of [team]
               {:margin-right   "3px"
                :padding        "3px"
                :border         (str "2px solid " (team-color team :dark-text))
                :text-align     "center"
                :vertical-align "top"})
        (img :css {:border "solid 1px black"}
             :src (formula-of [mission team]
                    (get-image
                     mission
                     (mission/team-flag mission
                                        team
                                        :big-vert))))
        (div
         :css {:text-align "center"}
         (span :css (cell= {:color (team-color team :dark-text)})
               (->> team :team :who (mission/team-name mission) cell=)))
        (div
         :css {:text-align "center"
               :height     "33px"}
         (let [val      (cell= (contains? selected-teams (mission/team-number team)))
               enabled? (cell= (contains? selectable-teams (mission/team-number team)))]
           (input :css {:margin "auto"}
                  :type "checkbox"
                  :toggle enabled?
                  :value val
                  :change #(swap! selected-teams
                                  (comp set (if @val disj conj))
                                  (mission/team-number @team))))))))))

(defelem side-selector
  "Draws a grid of flags and checkboxes to pick sides."
  [attrs _]
  (with-attr-bindings attrs [mission selected-sides]
    (div
     :css {:margin-bottom "5px"}
     attrs
     (for-tpl [side (cell= (mission/sides mission))]
       (inl
        :css (formula-of [side]
               {:margin-right "3px"
                :padding      "3px"
                :border       (str "2px solid " (team-color side :dark-text))
                :text-align   "center"})
        (for-tpl [team (cell= (mission/teams-for-side mission side))]
          (img :css {:border        "solid 1px black"
                     :padding-right "2px"}
               :src (formula-of [mission team]
                      (get-image
                       mission
                       (mission/team-flag mission
                                          team
                                          :big-vert)))))
        (div
         :css {:text-align "center"}
         (side-label :mission mission :side side))
        (div
         :css {:text-align "center"}
         (let [val (cell= (contains? selected-sides (mission/team-number side)))]
          (input :css {:margin "auto"}
                 :type "checkbox"
                 :value val
                 :change #(swap! selected-sides
                                 (comp set (if @val disj conj))
                                 (mission/team-number @side))))))))))

(defelem dropdown
  "Renders an HTML select. Attrs include :value, a cell or lens
  containing the current choice, which will be updated when the choice
  changes, and :choices, a vector of maps containing :value and :label
  keys."
  [attrs _]
  ;; TODO: Let choices be a cell if we ever need that.
  ;; TODO: Maybe choices should be a map from values to labels, since
  ;; values have to be unique
  (with-attr-bindings attrs [value choices change]
    (let [indexed  (map-indexed (fn [i c] [(str i) (assoc c ::index (str i))])
                                choices)
          by-index (into {} indexed)]
      (with-let [s (select)]
        (s
         (assoc attrs
                :value (formula-of [value]
                         (->> by-index
                              vals
                              (filter #(= value (:value %)))
                              first
                              ::index))
                :change (fn [v]
                          (let [n (-> @v by-index :value)]
                            (when change (change n))
                            (reset! value n))))
         (for [[index choice] indexed]
           (option
            :value index
            :selected (cell= (= value (:value choice)))
            (:label choice))
           #_(with-let [o (option)]
               (o
                {:value    index
                 :selected (formula-of [value]
                             (with-let [selected? (= value (:value choice))]
                               #_(when selected?
                                   (aset o "index" (aget s "selectedIndex")))))}
                (:label choice)))))))))

(register-class!
 ::disabled-radio-button
 [{:pointer-events "none"
   :color          "grey"
   :cursor         "default"}])

(defelem radio-group
  "Renders a group of HTML radio buttons. Attrs include :value, a cell
  or lens containing the current choice, which will be updated when
  the choice changes, and :choices, a vector of maps containing :value
  and :label keys, and optionally a :disabled? key."
  [attrs _]
  (with-attr-bindings attrs [value choices]
    (let [choices* (if (cell? choices)
                     choices
                     (cell choices))
          indexed  (formula-of [choices*]
                     (map-indexed (fn [i c] [(str i) (assoc c ::index (str i))])
                                  choices*))
          by-index (formula-of [indexed]
                     (into {} indexed))
          name     (str (gensym))]
      (div
       attrs
       (for-tpl [item indexed]
         (cell-let [[index choice] item]
           (let [id (str (gensym))]
             (div
              (let [checked? (formula-of [value choice]
                               (with-let [checked? (= value (:value choice))]
                                 #_(.log js/console "checked"
                                       ":id" id
                                       "checked?" checked?
                                       ":value" (pr-str value)
                                       ":choice" (pr-str choice))))
                    disabled? (formula-of [choice]
                                (:disabled? choice))]
                (with-let [elem (input
                                 :type "radio"
                                 :id id
                                 :name name
                                 :value index
                                 :checked checked?
                                 :class (formula-of [disabled?]
                                          {(class-for ::disabled-radio-button) disabled?})
                                 :change (fn [e]
                                           #_(.log js/console "Radio is changing" e)
                                           (reset! value (->> e .-currentTarget .-value (get @by-index) :value))))]
                  (do-watch checked?
                            (fn [_ new-val]
                              (-> elem .-checked (set! new-val))))))
              (label
               :for id
               :class (formula-of [choice]
                        {(class-for ::disabled-radio-button) (:disabled? choice)})
               (cell= (:label choice)))))))))))

(defelem slider
  "Renders an HTML range input. Synchronizes value with cell `:value`,
  which is limited to be between `:min`, and `:max`, inclusive.
  `:ticks` is the number of tickmarks shown on the slider. If `:int?`
  is true, value will be coerced to an integer."
  [attrs _]
  (with-attr-bindings attrs [min max ticks value int? change]
    (let [id (str (gensym))
          coerce (if int? long identity)
          v (lens
             (formula-of [value]
               (-> value
                   (- min)
                   double
                   (/ (- max min))
                   (* 100)
                   long))
             (fn [v]
               (reset! value
                       (-> v
                           (/ 100.0)
                           (* (- max min))
                           (+ min)
                           coerce))))]
      [(when ticks
         (datalist
          :id id
          (for [val (range 0 101 (/ 100 (dec ticks)))]
            (option :value val))))
       (input (merge attrs
                     {:type  "range"
                      :list  (when ticks id)
                      :min   0
                      :max   100
                      :value v
                      :input (fn [e]
                               (let [prev @value]
                                 (reset! v @e)
                                 (when change (change @value prev))))}))])))

(defelem checkbox
  "Renders an HTML checkbox."
  [attrs _]
  (with-attr-bindings attrs [change value]
    (let [change* (or change #(swap! value not))
          change** (fn [e]
                     (change* (-> e .-currentTarget .-checked))
                     (.preventDefault e)
                     false)]
      (input (assoc attrs
                    :type "checkbox"
                    :change change**
                    :value value)))))

(def ESCAPE_KEY 27)
(def ENTER_KEY 13)
(def UP_ARROW 38)
(def DOWN_ARROW 40)


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
  :css: Styling applied to container div.
  :align: Specifies text alignment of the input box"
  [attrs _]
  (with-attr-bindings attrs [conform fmt source update width placeholder css align]
    (assert source "source is required")
    (assert conform "conform is required")
    (let [interim  (cell nil)
          fmt      (or fmt str)
          value    (formula-of
                     [interim source]
                     (if interim
                       interim
                       (fmt source)))
          parsed   (conform value)
          update   (or update
                       #(swap! source
                               (constantly %)))
          state    (cell :set)
          focused? (cell false)
          align    (cell= align)
          valid?   (formula-of
                     [parsed]
                     (empty? (:message parsed)))]
      (div
       attrs
       :css (merge {:position     "relative"
                    :overflow     "show"
                    :white-space  "nowrap"
                    :width        (px (or width 125))
                    :margin-right (px 3)}
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
                      :keyup (fn [^KeyboardEvent e]
                               (when (= ESCAPE_KEY (.-keyCode e))
                                 (dosync
                                  (reset! interim nil)
                                  (reset! state :set))))
                      :focus #(reset! focused? true)
                      :blur #(let [p @parsed]
                               (dosync
                                (reset! focused? false)
                                (when-let [v (:value p)]
                                  (update v)
                                  (reset! interim nil)
                                  (reset! state :set))))
                      :css (formula-of
                             [state valid? align width]
                             {:font-style    (if (= state :editing)
                                               "italic"
                                               "")
                              :color         (if valid?
                                               ""
                                               (colors :invalid))
                              :background    (if valid?
                                               ""
                                               (colors :invalid-background))
                              :width         (px (- (or width 125)
                                                    (if valid? 0 20)))
                              :padding-right (when-not valid? (px 20))
                              :margin-right  (when-not valid? (px -20))
                              :text-align    (when align align)})
                      :value value)]
         [^js/HTMLImageElement i
          (img :src "images/error.png"
               :title (cell= (:message parsed))
               :click #(-> i (hint-> js/HTMLImageElement) .focus)
               :css (formula-of
                      [valid?]
                      {:position       "relative"
                       :right          0
                       :width          (px 14)
                       :margin-left    (px 3)
                       :margin-bottom  (px 2)
                       :vertical-align "middle"
                       :pointer-events (when valid? "none")
                       :opacity        (if valid?
                                         "0"
                                         "1")}))])
       (div
        :toggle (cell= (and (not valid?) focused?))
        :css {:position     "absolute"
              :top          (px 24)
              :font-size    (pct 75)
              :background   "rgba(221,221,221,0.95)"
              :border       "1px solid #888"
              :min-width    (pct 100)
              :max-width    (px 500)
              :padding-left (px 2)
              :z-index      1}
        (cell= (:message parsed)))))))

;; TODO: We could consider using a lens here instead of separate
;; source and update
(defelem time-edit
  [attrs _]
  (with-attr-bindings attrs [max-time]
   (validating-edit
    attrs
    :width 65
    :fmt format-time
    :placeholder "dd/hhmm"
    :conform (time-conformer max-time))))

;; Note that if we ever go back to a default we've used before, we'll
;; pick up whatever the old saved value is. That's a little weird but
;; I'm not sure how else to deal with this.
(defn versioned-local-storage
  "Returns a cell backed by local storage under `key` (a namespaced
  key), where, if the `default` contents change, a new cell will be
  allocated. This allows changing defaults in the code to overwrite
  any stored copies."
  [key default]
  (local-storage
   (cell default)
   (str key "-" (hash default))))

(defn svg-scale
  "Returns an SVG scale string."
  ([s] (gstring/format "scale(%f)" s))
  ([x y] (gstring/format "scale(%f,%f)" x y)))

(defn svg-translate
  "Returns an SVG translate string."
  [x y]
  (if (and x y)
    (gstring/format "translate(%f,%f)" x y)
    ""))

(defn svg-rotate
  "Returns an SVG rotate string."
  [deg]
  (gstring/format "rotate(%f)" deg))

(defn svg-xform-combine
  "Combines xforms into a single SVG transformation string"
  [& xforms]
  (str/join " " xforms))

(let [interval-value 0.45
      interval       (str interval-value "s")]
  (register-styles!
   ::animations
   [
    ;; A pulsing effect for highlight animation
    [(css-style/at-keyframes (class-for ::pulse-animation)
                             [:from {:opacity 1}]
                             [:to   {:opacity 0}])]
    [(class-selector-for ::pulse) {:animation-duration        interval
                                   :animation-name            (class-for ::pulse-animation)
                                   :animation-iteration-count "infinite"
                                   :animation-timing-function "ease-in-out"
                                   :animation-direction       "alternate"
                                   :animation-delay           interval}]
    ;; A one-time collapsing scale
    [(css-style/at-keyframes (class-for ::collapse-animation)
                             [:from {:transform         (svg-scale 1)
                                     :stroke-dashoffset 0}]
                             [:to   {:transform         (svg-scale 0.02)
                                     :stroke-dashoffset 50}])]
    [(class-selector-for ::collapse) {:animation-duration        interval
                                      :animation-name            (class-for ::collapse-animation)
                                      :animation-iteration-count 1
                                      :animation-timing-function "ease-out"
                                      :animation-direction       "normal"}]
    ;; A delayed fade-out
    [(css-style/at-keyframes (class-for ::delayed-fade-out-animation)
                             [:from {:opacity 0.35}]
                             ["80%" {:opacity 0.35}]
                             [:to   {:opacity 0}])]
    [(class-selector-for ::delayed-fade-out) {:animation-duration        (str (/ interval-value 0.8) "s")
                                              :animation-name            (class-for ::delayed-fade-out-animation)
                                              :animation-iteration-count 1
                                              :animation-timing-function "ease-out"
                                              :animation-direction       "normal"}]]))

(def pulse-class (class-for ::pulse))
(def collapse-class (class-for ::collapse))
(def delayed-fade-out-class (class-for ::delayed-fade-out))

(defn heading
  "Renders a heading - white text on a black background"
  ([content] (heading {} content))
  ([{:keys [margin-top]} content]
   (div
    :css {:color         "white"
          :background    "black"
          :margin-top    (px (or margin-top 15))
          :margin-bottom (px 5)
          :padding       (px 2)}
    content)))

(defn path-lens
  "Returns a lens over a `get-in` style path `p` into cell `c`. Path `p`
  can be a cell."
  [c p]
  (lens
   (formula-of
    [c p]
    (get-in c p))
   (fn [v]
     (swap! c assoc-in (if (cell? p) @p p) v))))

(defn map-lens
  "Returns a lens over item at key `k` in map `m`, where both `m` and
  `k` are cells."
  [m k]
  (lens
   (formula-of
     [m k]
     (get m k))
   (fn [v]
     (swap! m assoc @k v))))

(defn xform-lens
  "Returns a lens over cell `c` where the value of the lens is `(f c)`
  and the inverse of `f`. `f'` most be the inverse of `f`."
  [c f f']
  (lens
   (formula-of [c]
     (f c))
   (fn [v]
     (reset! c (f' v)))))

(defn not-lens
  "Returns a lens that is the logical inverse of `c`."
  [c]
  (xform-lens c not not))

;; I wound up needing this because I ran into all sorts of trouble
;; with Hoplon's dealing with collections. Specifically, when
;; reordering a collection, I found that the elements would not match
;; the order of the data. Using a fragment to assemble the existing
;; elements in the new order seems to work, so that's what I'm going
;; with. Need to remember to talk to Micha about this.
;;
;; TODO: It would be great if the resulting cells were lenses. Not
;; sure that's possible.
(defn keyed-loop-tpl*
  "Like Hoplon's `loop-tpl*` but accepts a `key-fn` which, given an item
  returns an (immutable) key under which to cache it. `tpl` is passed
  a cell containing a value from `items` and its (non-cell) id."
  [items key-fn tpl]
  (let [kindex   (formula-of [items]
                   (let [ks (mapv key-fn items)]
                     {:keys     ks
                      :item-map (zipmap ks items)}))
        priors   (atom {})
        ui-cache (atom {})]
    (with-let [current (cell [])]
      (do-watch
          kindex
          (fn [o n]
            (let [old-keys   (->> o :keys set)
                  new-keys   (->> n :keys set)
                  gone-keys  (set/difference old-keys new-keys)
                  added-keys (set/difference new-keys old-keys (-> @ui-cache keys set))]
              #_(.log js/console
                      "old-keys" (pr-str old-keys)
                      "new-keys" (pr-str new-keys)
                      "gone-keys" (pr-str gone-keys)
                      "added-keys" (pr-str added-keys))
              (when (not= (:keys o) (:keys n))
                (doseq [k gone-keys]
                  (swap! priors assoc k (get-in o [:item-map k])))
                (reset! current
                        (with-let [frag (.createDocumentFragment js/document)]
                          (doseq [k added-keys]
                            (swap! ui-cache
                                   assoc
                                   k
                                   (tpl
                                    (formula-of [kindex]
                                      (get-in kindex [:item-map k] (get @priors k)))
                                    k)))
                          (doseq [k (-> kindex deref :keys)]
                            (let [v (get @ui-cache k)]
                              (cond
                                (nil? v)
                                (.warn js/console
                                       "keyed-loop-tpl*: not appending nil node"
                                       k
                                       v)

                                (not (instance? js/Node v))
                                (.error js/console
                                        "keyed-loop-tpl*: trying to append non-node"
                                        k
                                        v)

                                :else
                                (gdom/appendChild frag v)))))))))))))

