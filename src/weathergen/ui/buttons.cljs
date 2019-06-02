(ns weathergen.ui.buttons
  "A library of button controls."
  (:require [hoplon.core :refer [a datalist defelem div do-watch fieldset for-tpl h4
                                 i if-tpl img input label legend
                                 option pre select span style with-timeout]]
            [javelin.core :refer [cell cell? cell= cell-let dosync formula-of lens with-let]]
            [rum.core :as rum]
            [weathergen.ui.common :as comm]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)])
  (:require-macros
   [weathergen.cljs.macros :refer [with-attr-bindings with-bbox with-time]]))

;; (set! *warn-on-infer* true)

(defn- image-button-style
  [pressed?]
  {:border-style (if pressed? "inset" "outset")
   :border-color "#ddd"
   :border-radius "6px"
   :padding "2px"
   ;; :width "16px"
   ;; :height "16px"
   :background (if pressed? "lightgrey" "white")
   :border-width "2px"
   :vertical-align "middle"})

(defelem image-button
  "A button displaying an image rather than text. Can take a
  `latched?` attribute, which, if a cell evaluating to true, locks the
  button in the pressed state."
  [attrs]
  (with-attr-bindings attrs [css latched?]
    (let [down (cell false)]
      (img
       :css (formula-of
              [latched? down]
              (merge (image-button-style (or latched? down))
                     css))
       :mousedown (fn [e]
                    (let [up (fn up-fn [e]
                               (.removeEventListener js/document "mouseup" up-fn)
                               (reset! down false))]
                      (.addEventListener js/document "mouseup" up))
                    (reset! down true))
       ;; Overriding dragstart stops the browser from trying
       ;; to drag and drop SVG as images, which would
       ;; interfere with our functionality.
       :dragstart (constantly false)
       attrs))))

(rum/defcs RImageButton < (rum/local false ::down?)
  [state attrs]
  (with-attr-bindings attrs [latched? style]
    (let [down? (::down? state)]
      [:img
       (merge
        {:style         (merge (image-button-style (or latched? @down?))
                               style)
         :on-mouse-down (fn [e]
                          (let [up (fn up-fn [e]
                                     (.removeEventListener js/document "mouseup" up-fn)
                                     (reset! down? false))]
                            (.addEventListener js/document "mouseup" up))
                          (reset! down? true))
         ;; Overriding dragstart stops the browser from trying
         ;; to drag and drop SVG as images, which would
         ;; interfere with our functionality.
         :on-drag-start (constantly false)}
        attrs)])))

(defn rimage-button
  "Like image-button, but React-based."
  [attrs]
  (let [{:keys [latched?]} attrs]
    (with-let [parent (div)]
      (do-watch latched?
                (fn [_ latched?]
                  (rum/mount (RImageButton (assoc attrs :latched? latched?)) parent))))))

(comm/register-class!
 ::div-button
 [{:border-width    "0.5px"
   :border-style    "solid"
   :border-color    "#d0d0d0"
   :background      "linear-gradient(white, white 75%, #ededed 100%)"
   :display         "inline-block"
   :font-family     "Lucida Grande, Lucida Sans Unicode, Tahoma, sans-serif"
   :font-size       "72%"
   :margin          "2px"
   :padding         "3px"
   :border-radius   "4px"
   :text-align      "center"
   :text-decoration "none"
   :color           "black"
   :cursor          "pointer"}
  [:&:active
   {:background "linear-gradient(#c0c0c0, #f0f0f0)"}]])

(comm/register-class!
 ::latched-div-button
 [{:background "linear-gradient(#c0c0c0, #f0f0f0)"}])

(comm/register-class!
 ::disabled-button
 [{:pointer-events "none"
   :color          "grey"
   :cursor         "default"}])

(defelem a-button
  "Renders a plain button, but using an anchor tag to better enable
  styling. Can take a `latched?` attribute, which, if a cell
  evaluating to true, locks the button in the pressed state. Can take
  a `disabled?` attribute, which, if a cell evalating to true,
  disables the button."
  [attrs content]
  (with-attr-bindings attrs [latched? disabled?]
    (let [down (cell false)]
      (a (merge attrs
                {:class (formula-of [latched? down disabled?]
                          {(comm/class-for ::div-button) true
                           (comm/class-for ::latched-div-button) (or latched? down)
                           (comm/class-for ::disabled-button) disabled?})})
         content))))

(rum/defcs RAButton < (rum/local false ::down?)
  [state attrs content]
  (with-attr-bindings attrs [latched? disabled?]
    (let [down? (::down? state)]
      [:a (merge attrs
                 {:class (comm/classes
                          {(comm/class-for ::div-button) true
                           (comm/class-for ::latched-div-button) (or latched? down?)
                           (comm/class-for ::disabled-button) disabled?})})
       content])))

(defn ra-button
  "Like a-button, but React-based."
  [attrs content]
  (let [{:keys [latched? disabled?]} attrs]
    (with-let [parent (div)]
      (do-watch (formula-of [latched? disabled?])
                (fn [_ [latched? disabled?]]
                  (rum/mount (RAButton (assoc attrs
                                              :latched? latched?
                                              :disabled? disabled?)
                                       content)
                             parent))))))