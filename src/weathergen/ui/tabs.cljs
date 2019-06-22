(ns weathergen.ui.tabs
  "Homegrown tab controls."
  (:require [weathergen.ui.common :as comm :refer [inl pct px keyed-loop-tpl*]]
            [hoplon.core :refer [a datalist defelem div do-watch fieldset for-tpl h4
                                 i if-tpl img input label legend li
                                 option pre select span style ul with-timeout]]
            [javelin.core :refer [cell cell? cell= cell-let dosync formula-of lens with-let]])
  (:require-macros
   [weathergen.cljs.macros :refer [with-attr-bindings with-bbox with-time #_formula-of]]))

;; (set! *warn-on-infer* true)

(defelem tabs
  "Renders a tab control. `selected` is a cell containing the ID of
  the currently selected tab. `tabs` is a vector of maps describing
  the tabs.

  `:tab-background` - background color of tabs

  Keys include:

  `:id` - Unique ID for the tab.
  `:title` - Title for the tab.
  `:ui` - Content for the tab.
  `:hidden?` - A cell for whether the tab is hidden or not
  "
  [attrs _]
  (with-attr-bindings attrs [tab-background selected tabs]
    (doseq [{:keys [id hidden?]} tabs]
      (when hidden?
        (add-watch hidden?
                   (gensym)
                   (fn [_ _ _ n]
                     (when (and n (= id @selected))
                       (reset! selected (-> tabs first :id)))))))
    (div
     (div
      :debug "buttons and spacer"
      :css {:position    "sticky"
            :top        0
            :background tab-background
            :z-index    100}
      (div
       :debug "tab buttons"
       :css {:border-bottom-width (px 1)
             :border-bottom-style "solid"
             :border-bottom-color "lightgray"}
       (for [{:keys [title id hidden?]} tabs]
         (div
          :click #(reset! selected id)
          :css (formula-of [selected hidden?]
                 (let [selected? (= selected id)]
                   {:display                 (if hidden? "none" "inline-block")
                    :background              (when selected? "black")
                    :border-top-left-radius  (px 5)
                    :border-top-right-radius (px 5)
                    :border-style            "solid"
                    :border-bottom-style     "none"
                    :border-width            (px 1)
                    :border-color            (if selected?
                                               "black"
                                               "lightgray")
                    :color                   (if (= selected id)
                                               "white"
                                               "#737373")
                    :font-size               (pct 120)
                    :padding                 (px 0 10 3 10)
                    :cursor                  "pointer"
                    :user-select             "none"}))
          title)))
      (div
       :debug "spacer"
       :css {:background tab-background
             :height     (px 3)}))
     (for [{:keys [id ui]} tabs]
       (div
        :toggle (cell= (= id selected))
        ui)))))

(defelem tabs2
  "Renders a tab control like `tabs`, but allows for dynamic tabs. Attributes:

  `data` - a cell containing one item per tab.
  `key-fn` - function from item in `data` to a unique, immutable key for it.
  `value` - the value of `key-fn` for the currently displayed tab
  `formatter` - A function from a cell of one item in `data` to UI for that item.
  `title-formatter` - A function from a cell of one item in `data` to UI for the title.
  `tab-background` - the background color of tabs."
  [attrs _]
  (with-attr-bindings attrs [data key-fn value formatter title-formatter tab-background]
    (add-watch data
               (gensym)
               (fn [_ _ o n]
                 (when-not (some #(= @value (key-fn %)) n)
                   (reset! value (-> n first key-fn)))))
    (div
     (div
      :debug "buttons and spacer"
      :css {:position   "sticky"
            :top        0
            :background tab-background
            :z-index    100}
      (div
       :debug "tab buttons"
       :css {:border-bottom-width (px 1)
             :border-bottom-style "solid"
             :border-bottom-color "lightgray"}
       (keyed-loop-tpl*
        data key-fn
        (fn [item id]
          (div
           :click (fn [e]
                    ;; Sometimes we do things like have a close button
                    ;; in the tab title. Which means we might get a
                    ;; propagated click event for a tab that's no
                    ;; longer present in the data. So we check first.
                    (let [current (set (map key-fn @data))]
                      (when (current id)
                        (reset! value id))))
           :css (formula-of [item value]
                  (let [id        (key-fn item)
                        selected? (= value id)]
                    {:display                 "inline-block"
                     :background              (when selected? "black")
                     :border-top-left-radius  (px 5)
                     :border-top-right-radius (px 5)
                     :border-style            "solid"
                     :border-bottom-style     "none"
                     :border-width            (px 1)
                     :border-color            (if selected?
                                                "black"
                                                "lightgray")
                     :color                   (if (= value id)
                                                "white"
                                                "#737373")
                     :font-size               (pct 120)
                     :padding                 (px 0 10 3 10)
                     :cursor                  "pointer"}))
           (title-formatter item id (cell= (= value id)))))))
      (div
       :debug "spacer"
       :css {:background tab-background
             :height     (px 3)}))
     (keyed-loop-tpl*
      data key-fn
      (fn [item id]
        (div :css (formula-of [item value]
                    {:display (when (not= (:id item) value)
                                "none")})
         (formatter item id)))))))
