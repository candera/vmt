(ns weathergen.ui.trees
  "A library for rendering collapsable trees of elements."
  (:require [cljs.pprint :refer [pprint]]
            [hoplon.core :refer [a datalist defelem div do-watch fieldset for-tpl h4
                                 i if-tpl img input label legend li
                                 ol option pre select span style ul when-tpl with-timeout]]
            [javelin.core :refer [cell cell? cell= cell-let dosync formula-of lens with-let]]
            [weathergen.ui.common :as comm :refer [inl px pct rinl styled]]
            [rum.core :as rum]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)])
  (:require-macros
   [weathergen.cljs.macros :refer [#_formula-of]]))

;; (set! *warn-on-infer* true)

(defn- tree*
  "Helper function for the tree control."
  [expand-state levels items level-number]
  (let [[level & more-levels] levels
        {:keys [formatter children attrs]} level]
    (styled
     :garden [:li {:margin-left "-28px"}]
     (ol
      :css {:list-style-type "none"}
      (for-tpl [item items]
        (let [kids (if children (children item) (cell nil))
              expanded? (cell true)]
          ;; This looks like it might be a real problem. When the list
          ;; contracts, the do-watch is still active on the now
          ;; non-existent expanded? cell. Or something like that.
          ;; Basically: I hate the loop template macros.
          (when expand-state
            (do-watch expand-state
                      (fn [_ n]
                        (cond
                          (= n :all-expanded)
                          (reset! expanded? true)

                          (= n :all-collapsed)
                          (reset! expanded? false)

                          (= (first n) :expand-through-level)
                          (let [e (< level-number (second n))]
                            (reset! expanded? e))))))
          (li
           (if attrs
             (attrs item)
             {})
           (inl
            :css {:white-space "nowrap"}
            (inl :css {:width "15px"
                       :font-size "120%"
                       :vertical-align "top"}
                 (if-tpl (-> kids seq cell=)
                   (div :css {:display "inline-block"
                              :cursor "pointer"
                              :position "relative"
                              :background "transparent"}
                        :click (fn []
                                 (dosync
                                  (swap! expanded? not)
                                  (when expand-state (reset! expand-state nil))))
                        (div
                         :css (formula-of [expanded?]
                                {:display "inline-block"
                                 :width 0
                                 :height 0
                                 :border-left "5px solid transparent"
                                 :border-right "5px solid transparent"
                                 :border-top "7px solid black"
                                 :vertical-align "middle"
                                 :transform (str "rotate("
                                                 (if expanded?
                                                   0
                                                   -90)
                                                 "deg)")})))
                   ""))
            (formatter expanded? item))
           (when-tpl (cell= (and expanded? kids))
             (tree* expand-state more-levels kids (inc level-number))))))))))

(defn tree
  "Returns a collapable tree with hierarchy defined by `levels`, a seq
  of maps with `:formatter` and `:children` keys, each a function of a
  single item in the hierarchy. The formatter returns UI for that
  item, and children (if present) returns items that will be rendered
  as children. `expand-state` is either nil or a cell containing
  keyword `:all-expanded`, keyword `:all-collapsed`, or vector
  `[:expand-through n]`, where `n` is a nonnegative integer. Changing
  to these values will cause the list to behave as specified."
  [expand-state levels items]
  (tree* expand-state levels items 0))

(rum/defc RTree
  [expander items]
  [:ol
   {:style {:list-style-type "none"}}
   (for [{:keys [ui attrs expanded? children id] :as item} items]
     [:li
      (assoc attrs :key id)
      [:div
       {:style {:display     "inline-flex"
                :white-space "nowrap"}}
       (rinl
        {:style {:width          (px 15)
                 :font-size      (pct 120)
                 :vertical-align "top"}}
        (if (empty? children)
          ""
          (rinl {:style    {:cursor     "pointer"
                              :position   "relative"
                              :background "transparent"}
                   :on-click (fn [e]
                               (expander id))}
                  (rinl
                   {:style {:width          0
                            :height         0
                            :border-left    "5px solid transparent"
                            :border-right   "5px solid transparent"
                            :border-top     "7px solid black"
                            :vertical-align "middle"
                            :margin-top     (px -8)
                            :transform      (str "rotate("
                                                 (if expanded?
                                                   0
                                                   -90)
                                                 "deg)")}}))))
       ui]
      (when (and expanded? children)
        (RTree expander children))])])

(defn rtree
  [items expander]
  (with-let [parent (styled
                     :garden [[:ol {:text-indent (px 2)}]
                              [:li {:margin-left (px -28)}]])]
    (do-watch items
              (fn [_ items*]
                (rum/mount (RTree expander items*) parent)))))

(comment
  [{:ui ...
    :expanded? true
    :children [{:ui ...
                :expanded? false}
               {:ui ...
                :expanded? true}]}])
