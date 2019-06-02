(ns weathergen.ui.select
  "Homegrown select controls."
  (:require [clojure.string :as str]
            [garden.core :refer [css]]
            [garden.selectors :as css-sel]
            [hoplon.core :refer [a datalist defelem div do-watch fieldset for-tpl h4
                                 i if-tpl img input label legend li
                                 option pre select span style ul with-timeout]]
            [hoplon.svg :as svg]
            [javelin.core :refer [cell cell? cell= cell-let dosync formula-of lens with-let]]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]
            [weathergen.help :as help]
            [weathergen.ui.buttons :as buttons]
            [weathergen.ui.common :as comm :refer [inl pct pre-cell px register-styles! rinl triangle]])
  (:require-macros
   [weathergen.cljs.macros :refer [with-time #_formula-of with-attr-bindings keyed-for-tpl]]))

(comm/register-class!
 ::hidden
 [{:display "none"}])

#_(comm/register-class!
 ::highlighted
 [{:background "#5897fb"
   :color      "white"}])

(defelem select3
  "Like select2, but artisinal and bespoke.

:data - A cell containing a seq of values.
:width - px width
:value - A cell. The currently selected value, or `nil` if no selection.
:key-fn - Function of choice value returning immutable unique ID.
:search-fn - Function from value to text it should match when searching.
:formatter - Function from cell of value to UI for that item.
:change - Function called with selected value when value changes.
:highlight - Function called with highlighted value when highlight changes.
:max-dropdown-height - (Optional) Max height of dropdown"
  [attrs _]
  (with-attr-bindings attrs [data width value key-fn search-fn formatter highlight change max-dropdown-height placeholder]
    (assert search-fn "search-fn is required")
    (assert key-fn "key-fn is required")
    (assert formatter "formatter is required")
    (let [highlighted   (cell nil)
          search-text   (cell nil)
          open?         (cell false)
          border-radius 4
          filtered-data (formula-of [open? data search-text]
                          (cond
                            (not open?)
                            nil

                            (str/blank? search-text)
                            data

                            :else
                            (->> data
                                 (filter #(str/index-of (str/lower-case (search-fn %))
                                                        (str/lower-case search-text))))))
          matching-items (formula-of [filtered-data]
                           {:index-to-item (zipmap (range) filtered-data)
                            :key-to-index  (zipmap (map key-fn filtered-data) (range))})
          ids            (formula-of [data]
                           (zipmap (map key-fn data)
                                   (repeatedly #(str (gensym)))))
          highlighted-item (formula-of [matching-items highlighted]
                             (get-in matching-items [:index-to-item highlighted]))]
      (when highlight
        (do-watch highlighted-item
          (fn [_ n]
            (highlight n))))
      (do-watch open?
        (fn [_ n]
          (when-not n
            (reset! search-text nil))))
      (do-watch filtered-data
        (fn [_ n]
          (reset! highlighted (if @open? 0 nil))))
      (with-let [elem (div :debug "select3 outer")]
        ;; Handling Blur isn't a good solution because clicking on one
        ;; of the list elements also causes a blur, and it happens
        ;; before the click, which screws up our ability to handle the
        ;; click.
        (.addEventListener js/document
                           "click"
                           (fn [e]
                             (when (and @open?
                                        (not (.contains elem (.-target e))))
                               (reset! open? false))))
        (elem
         attrs
         :css
         ;; TODO: Might be able to remove width here if we can just
         ;; use attrs both here and below.
         {:width       width
          :font-family "Open Sans Condensed"
          :position    "relative"}
         (div
          :debug "top row"
          :click #(swap! open? not)
          :css {:cursor "pointer"}
          (div
           :css
           (formula-of [open?]
             {:border-color               "#aaa"
              :border-width               (px 1)
              :border-style               "solid"
              :border-top-left-radius     (px border-radius)
              :border-top-right-radius    (px border-radius)
              :border-bottom-left-radius  (px (if open? 0 border-radius))
              :border-bottom-right-radius (px (if open? 0 border-radius))
              :background                 "white"
              :padding                    (px 3 25 3 5)})
           (formula-of [value]
             (if value
               (formatter value)
               (div
                :css {:color "#999"}
                placeholder))))
          (let [arrow-size 6]
            (div
             :debug "arrow container"
             :css {:display  "inline-block"
                   :position "absolute"
                   :right    (px 7)
                   :top      (px (/ arrow-size 2))}
             (div
              :css (formula-of [open?]
                     {:display            "inline-block"
                      :width              0
                      :height             0
                      :border-left-width  (px (* 0.66 arrow-size))
                      :border-left-style  "solid"
                      :border-left-color  "transparent"
                      :border-right-width (px (* 0.66 arrow-size))
                      :border-right-style "solid"
                      :border-right-color "transparent"
                      :border-top-width   (px arrow-size)
                      :border-top-style   "solid"
                      :border-top-color   "#888"
                      :transform          (str "rotate("
                                               (if open? 180 0)
                                               "deg)")})))))
         (div
          :debug "spacer")
         (div
          :debug "dropdown area container"
          :css {:position "relative"}
          (div
           :debug "dropdown area"
           :css
           (formula-of [open?]
             {:display                    (if open? "block" "none")
              :top                        0
              :position                   "absolute"
              :z-index                    100
              :background                 "white"
              ;; :padding                    (px 0 5)
              :border-color               "#aaa"
              :border-width               (px 1)
              :border-style               "solid"
              :border-top-style           "none"
              :border-bottom-left-radius  (px border-radius)
              :border-bottom-right-radius (px border-radius)})
           (div
            :debug "sets width"
            :css {:width width
                  :margin-left (px -2)  ; accounts for border
                  }
            )
           ;; something like this: http://jsfiddle.net/v7YTT/90/
           (let [gap 5]
             (div
              :debug "Search box"
              :css
              {:padding (px 0 gap 2 (* 2 gap))}
              (with-let [i (input
                            :css {:width    (pct 100)
                                  :position "relative"
                                  :right    (px gap)}
                            :value search-text
                            :input #(reset! search-text @%)
                            :keydown (fn [^KeyboardEvent e]
                                       (condp = (.-keyCode e)
                                         comm/ESCAPE_KEY
                                         (reset! open? false)

                                         comm/ENTER_KEY
                                         (when-not (empty? @filtered-data)
                                           (let [new-val (get-in @matching-items [:index-to-item @highlighted])]
                                             (dosync
                                              (reset! open? false)
                                              (reset! value new-val)
                                              (when change
                                                (change new-val)))))

                                         comm/DOWN_ARROW
                                         (swap! highlighted
                                                #(min (inc %)
                                                      (dec (count @filtered-data))))

                                         comm/UP_ARROW
                                         (swap! highlighted
                                                #(max 0 (dec %)))

                                         nil)))]
                (do-watch open?
                  (fn [_ n]
                    (when n
                      (with-timeout 0
                        (.focus i))))))))
           (let [has-matches? (cell= (not (empty? filtered-data)))]
             (comm/styled
              :garden (formula-of [highlighted matching-items ids]
                        [(css-sel/selector (str "#" (get ids (key-fn (get-in matching-items [:index-to-item highlighted])))))
                         {:background "#5897fb"
                          :color      "white"}])
              (div :css {:padding-left (px 5)
                         :user-select  "none"}
                   :toggle (cell= (not has-matches?))
                   "No results found")
              (with-let [elem (ul)]
                (do-watch filtered-data
                  (fn [_ _]
                    (-> elem .-scrollTop (set! 0))))
                (elem
                 :toggle has-matches?
                 :debug "item list area"
                 :css {:overflow-y  "scroll"
                       :max-height  (or max-dropdown-height (px 150))
                       :padding     0
                       :margin      0
                       :user-select "none"
                       :list-style "none"}
                 (keyed-for-tpl key-fn [item data]
                   (with-let [elem (li)]
                     (do-watch highlighted
                       (fn [_ n]
                         (when (= @item (get-in @matching-items [:index-to-item n]))
                           ;; with-timeout 0
                           (.scrollIntoViewIfNeeded elem))))
                     (elem
                      :id (-> item key-fn ids cell=)
                      :mouseenter #(reset! highlighted (get-in @matching-items [:key-to-index (key-fn @item)]))
                      :class (formula-of [item matching-items]
                               {(comm/class-for ::hidden)
                                (not (contains? (:key-to-index matching-items)
                                                (key-fn item)))})
                      (div
                       :css {:padding-left (px 5)}
                       :click #(dosync
                                (reset! value @item)
                                (reset! open? false)
                                (when change
                                  (change @item)))
                       (formatter item)))))))))))
         #_(div
            (pre-cell "open?" open?)
            (pre-cell "search-text" search-text)
            (pre-cell "highlighted" highlighted)
            #_(pre-cell "index-to-item" (cell= (:index-to-item matching-items)))
            #_(pre-cell "key-to-index" (cell= (:key-to-index matching-items)))))))))