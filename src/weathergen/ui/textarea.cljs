(ns weathergen.ui.textarea
  "Controls for editing text."
  (:require [clojure.string :as str]
            [hoplon.core :refer [a datalist defelem div do-watch fieldset for-tpl h4
                                 i if-tpl img input label legend li
                                 option pre select span style ul with-timeout]]
            [javelin.core :refer [cell cell? cell= cell-let dosync formula-of lens with-let]]
            [weathergen.ui.common :as comm :refer [colors control-section
                                                   format-heading format-distance format-speed format-mach format-time
                                                   inl pre-cell pct px styled team-color]])
  (:require-macros
   [weathergen.cljs.macros :refer [keyed-for-tpl with-attr-bindings with-bbox with-time #_formula-of]]))

(defelem textarea2
  "Like textarea, but better."
  [attrs _]
  (with-attr-bindings attrs [value change placeholder css]
    (let [placeholder* (cell= placeholder)
          interim      (cell nil)
          editing?     (cell false)
          placeholder? (cell= (and (not editing?) (str/blank? value)))]
      (with-let [elem (div)]
        (do-watch value
          (fn [_ n]
            (when-not @editing?
              (-> elem .-innerText (set! n)))))
        (do-watch editing?
          (fn [_ n]
            (if n
              ;; Started editing
              (do
                (reset! interim @value)
                (-> elem .-innerText (set! @interim)))
              ;; Stopped editing
              (let [v (-> elem .-innerText)]
                (when change (change v))
                (when (or (zero? (count v))
                          (= "\n" v))
                  (-> elem .-innerText (set! @placeholder*)))))))
        (elem
         :contenteditable "true"
         :click (fn []
                  (reset! editing? true))
         :input (fn [_]
                  ;; Not sure I need both of these...
                  (let [v (-> elem .-innerText)]
                    (reset! interim v)
                    (when change (change v))))
         ;; :keyup (fn [^KeyboardEvent e]
         ;;          ;; Not sure I need both of these...
         ;;          (let [v (-> elem .-innerText)]
         ;;            (reset! interim v)
         ;;            (when change (change v))
         ;;            (when @placeholder?
         ;;              (-> elem .-innerText (set! @placeholder)))))
         :css (formula-of [placeholder? css]
                (merge {:white-space  "pre-wrap"
                        :color        (when placeholder? "#999")
                        :cursor       "text"
                        :background   "white"
                        :border-color "#aaa"
                        :border-width (px 1)
                        :border-style "solid"
                        :padding      (px 5 3 3 3)}
                       css))
         :focus (fn [e]
                  (reset! editing? true))
         :blur (fn [e]
                 (reset! editing? false))
         attrs)))))