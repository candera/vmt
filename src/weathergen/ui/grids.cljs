(ns weathergen.ui.grids
  "Homegrown grid controls."
  (:require [garden.core :refer [css]]
            [garden.selectors :as css-sel]
            [hoplon.core :refer [a datalist defelem div do-watch fieldset for-tpl h4
                                 i if-tpl img input label legend li
                                 option pre select span style
                                 table tbody td thead tr ul when-tpl with-timeout]]
            [hoplon.svg :as svg]
            [javelin.core :refer [cell cell? cell= cell-let dosync formula-of lens with-let]]
            [rum.core :as rum]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]
            [weathergen.help :as help]
            [weathergen.ui.buttons :as buttons]
            [weathergen.ui.common :as comm :refer [inl px register-styles! rinl triangle]])
  (:require-macros
   [weathergen.cljs.macros :refer [with-time #_formula-of with-attr-bindings keyed-for-tpl]]))

;; (set! *warn-on-infer* true)

(defelem master-detail
  "Creates a master-detail grid view. TODO: explain options."
  [attrs _]
  (let [{:keys [data detail columns formatter options]} attrs]
    (div
     (dissoc attrs :data :detail :columns :formatter :options)
     (let [data* (cell= data)
           columns* (cell= columns)
           options* (cell= options)
           ;; TODO: Should detail be permitted to be a cell?
           td* (fn [& args]
                 (apply td :css {:border "solid 1px #eee"
                                 :padding "0 2px 0 2px"} args))]
       (table
        :css {:background "white"
              :border-collapse "collapse"
              :outline "solid 1px #ccc"}
        (thead
         (tr
          :css {:background "linear-gradient(to bottom, white, white 33%, #eee 66%)"}
          (formula-of [columns*]
            (for [column columns*]
              (td (:name column))))
          #_(for-tpl [column columns*]
              (td (-> column :name cell=)))))
        (formula-of [data* columns*]
          (for [item data*]
            (let [expanded? (cell true)
                  subitems (detail item)
                  spacer-width "12px"
                  spacer-margin "3px"
                  spacing {:width spacer-width
                           :margin-right spacer-margin
                           :display "inline-block"}
                  spacer (fn [] (span :css spacing))]
              [(tbody
                (tr
                 (td*
                  :colspan (count columns*)
                  (if (-> subitems count zero?)
                    (spacer)
                    (div :css {:width spacer-width
                               :margin-right spacer-margin
                               :display "inline-block"
                               :text-align "center"
                               :vertical-align "middle"
                               :height "12px"
                               :border-radius "50%"
                               :border-color "black"
                               :border-style "solid"
                               :border-width "1px"
                               :text-anchor "6px"
                               :font-size "120%"
                               :line-height "12px"
                               :font-weight "bold"}
                         :click #(swap! expanded? not)
                         (if-tpl expanded? "-" "+")))
                  (formatter item))))
               (tbody
                (for [subitem subitems]
                  (tr
                   :fade-toggle expanded?
                   (let [formatter (:formatter (first columns*))]
                     (td*
                      (spacer)
                      (spacer)
                      (formatter subitem)))
                   (for [column (drop 1 columns*)]
                     (td*
                      (let [formatter (:formatter column)]
                        (formatter subitem)))))))])))
        #_(for-tpl [item data*]
            (let [expanded? (cell true)
                  subitems (formula-of [item] (detail item))]
              [(tbody
                (tr
                 (for-tpl [column columns*]
                   [(if-tpl (-> subitems count zero? cell=)
                      ""
                      (button :click #(swap! expanded? not) (if-tpl expanded? "-" "+")))
                    (cell=
                     (td* (formula-of [column item]
                            (let [fmt (:formatter column)]
                              (fmt :master item)))))])))
               (tbody
                :fade-toggle expanded?
                (for-tpl [subitem subitems]
                  (tr
                   (for-tpl [column columns*]
                     (td* (formula-of [column subitem]
                            (let [fmt (:formatter column)]
                              (fmt :detail subitem))))))))])))))))

(defn- sorters
  "Returns UI for the sort handles at the top of a column.
  `sort-state` is a tuple of column index and direction for the
  current sort. `column-id` is a cell the index of the column we're
  rendering."
  [sort-criteria column-id]
  (inl
   :class "sorters"
   (svg/svg
    :width "20px"
    :viewBox "-100 -100 200 200"
    (comm/triangle :transform "rotate(180) translate(0 -50)"
                   :r 50
                   :stroke "black"
                   :stroke-width "2"
                   :fill (formula-of [sort-criteria column-id]
                           (if (= sort-criteria [column-id :ascending])
                             "black"
                             "none")))
    (comm/triangle :transform "translate(0 -50)"
                   :r 50
                   :stroke "black"
                   :stroke-width "2"
                   :fill (formula-of [sort-criteria column-id]
                           (if (= sort-criteria [column-id :descending])
                                  "black"
                                  "none"))))))

(defn- rsorters
  "Rum version of `sorters`."
  [sort-criteria column-id]
  (rinl
   {:class "sorters"}
   [:svg {:width   (px 20)
          :viewBox "-100 -100 200 200"}
    (comm/rtriangle
     {:transform "rotate(180) translate(0 -50)"
      :r 50
      :stroke "black"
      :stroke-width "2"
      :fill (if (= sort-criteria [column-id :ascending])
              "black"
              "none")})
    (comm/rtriangle
     {:transform "translate(0 -50)"
      :r 50
      :stroke "black"
      :stroke-width "2"
      :fill (if (= sort-criteria [column-id :descending])
              "black"
              "none")})]))

(defn- nudge
  "Moves item `item` in `coll` by one position earlier or later,
  depending on the sign of `n`.

  E.g. `(reorder [:a :b :c] :b -1)` returns `[:b :a :c]`"
  [coll item n]
  (->> coll
       (map-indexed (fn [i v]
                      [(if (= v item)
                         (if (pos? n)
                           (+ i 1.5)
                           (- i 1.5))
                         i)
                       v]))
       (sort-by first)
       (mapv second)))

(defn register-table-grid-styles!
  []
  (register-styles!
   ::table-grid
   [[:table.table-grid {:border-collapse "collapse"}
     [:tr.table-grid-row (css-sel/& (css-sel/nth-child :even))
      {:background "#eee"}]
     [:tr.table-grid-row (css-sel/& (css-sel/nth-child :odd))
      {:background "white"}]
     [:thead.table-grid-header
      [:td.table-grid-cell {:background  "#ddd"
                            :border      "solid 1px grey"
                            :padding     "2px 4px 4px 4px"
                            :white-space "nowrap"}]
      [:.sorters { ;; :float "right"
                  :display "inline-block"
                  }
       [:svg {:vertical-align "bottom"}]]]
     [:tbody.table-grid-body
      [:td.table-grid-cell
       {:padding "2px 3px 2px 3px"
        :border  "solid 1px lightgray"
        ;;:border-bottom "none"
        ;;:border-top "none"
        }]]]
    [:td.table-grid-cell.hidden-column {:display "none"}]]))

;; TODO: Don't bonk when row-attrs is nil
(defelem table-grid
  "Returns a table grid control. Attributes

:data - A cell containing a seq of maps.
:key-fn - Function from item in data to unique value for it
:row-attrs - A function from a cell containing a row to an Hoplon
             attrs map
:when-empty - UI to show when there are no rows in the data
:columns - A map from column IDs to column descriptions
:fixed-columns - A seq of IDs of unmovable columns
:movable-columns - [cell] A seq of IDs of movable columns
:hidden-columns - [cell] A set of IDs of hidden columns
:initial-sort - [non-cell] An initial sort criteria in the form
                `[sort-key sort-direction]`, where `sort-direction` is
                either `:ascending` or `:descending`

Column description:
:title - Shows up in the header row
:sort-key - Function from a row value (not cell) to a sort value
:formatter - Function from a row cell and row number cell to UI
:css - Function from cell of row item and cell of row number to
         map of css values."
  [attrs _]
  (register-table-grid-styles!)
  (with-attr-bindings attrs [data key-fn columns row-attrs when-empty fixed-columns movable-columns hidden-columns initial-sort]
    (assert key-fn "key-fn is required")
    (let [sort-criteria    (cell initial-sort)
          sorted-items     (formula-of [data sort-criteria]
                             (if-not sort-criteria
                               data
                               (let [[sort-column sort-direction] sort-criteria
                                     {:keys [sort-key]}           (get columns sort-column)]
                                 (sort-by sort-key
                                          (if (= sort-direction :ascending)
                                            compare
                                            (fn [a b]
                                              (- (compare a b))))
                                          data))))
          num-columns      (count columns)
          column-order     (formula-of [fixed-columns movable-columns]
                             (into (vec fixed-columns)
                                   (vec movable-columns)))
          editing-columns? (cell false)
          classify (fn [elem class]
                     (fn [& args]
                       (apply elem :class class args)))
          table (classify hoplon.core/table "table-grid")
          thead (classify hoplon.core/thead "table-grid-header")
          tbody (classify hoplon.core/tbody "table-grid-body")
          tr    (classify hoplon.core/tr "table-grid-row")
          td    (classify hoplon.core/td "table-grid-cell")]
      (table
       (thead
        (tr
         (td
          :class "table-grid-cell"
          :colspan num-columns
          (buttons/image-button
           :src "images/settings.svg"
           :width (px 16)
           :title "Settings"
           :latched? editing-columns?
           :click #(swap! editing-columns? not))
          (help/help-icon [:table-grid :settings])))
        (tr (for [n (range num-columns)]
              (let [column-id    (formula-of [column-order]
                                   (nth column-order n))
                    hidden?      (formula-of [hidden-columns column-id]
                                   (hidden-columns column-id))
                    disable-sort (formula-of [column-id]
                                   (-> columns (get column-id) :disable-sort))]
                (td
                 :class (formula-of [editing-columns? hidden?]
                          {:hidden-column (and (not editing-columns?) hidden?)
                           :table-grid-cell true})
                 :click #(when-not @disable-sort
                           (swap! sort-criteria
                                  (fn [[old-index direction]]
                                    [@column-id
                                     (cond
                                       (not= old-index @column-id)
                                       :ascending

                                       (= direction :ascending)
                                       :descending

                                       :else
                                       :ascending)]))
                           true)
                 (when-tpl (cell= (and (< (count fixed-columns) n)
                                       editing-columns?))
                   (buttons/a-button
                    :title "Move column left"
                    :css {:background "linear-gradient(white, white 50%, rgb(195, 194, 194) 100%)"}
                    :click #(do
                              (swap! movable-columns nudge @column-id -1)
                              false)
                    "<"))
                 (when-tpl editing-columns?
                   (inl
                    :css (formula-of [hidden?]
                           {:border-width  (px 2)
                            :border-style  "inset"
                            :border-radius (px 3)
                            :color         (if hidden? "red" "green")
                            :background    "white"
                            :line-height   "90%"
                            :padding       (px 1)
                            :cursor        "pointer"
                            :width         (px 10)})
                    :click (fn [_]
                             (swap! hidden-columns (if @hidden? disj conj) @column-id)
                             false)
                    (if-tpl hidden? "✗" "✓")))
                 (formula-of [column-id]
                   (-> columns (get column-id) :title))
                 (if-tpl disable-sort
                   []
                   (sorters sort-criteria column-id))
                 (when-tpl (cell= (and (<= (count fixed-columns) n)
                                       (< n (dec num-columns))
                                       editing-columns?))
                   (buttons/a-button
                    :title "Move column right"
                    :css {:background "linear-gradient(white, white 50%, rgb(195, 194, 194) 100%)"}
                    :click #(do
                              (swap! movable-columns nudge @column-id 1)
                              false)
                    ">")))))))
       (if-tpl (-> sorted-items count zero? (and when-empty) cell=)
         (tbody
          (tr
           (td
            :colspan num-columns
            when-empty)))
         (tbody
          (keyed-for-tpl (fn [[_ item]] (key-fn item))
              [[rownum item] (cell= (map-indexed vector sorted-items))]
              (tr
               (row-attrs item rownum)
               ;; Here we have a map with functions that produce
               ;; cells, and we sort of invert it into cells that
               ;; contain maps from the keys to the value resulting
               ;; from calling the function. Hard to explain, and so
               ;; probably not a very good way to do this.
               (let [formatteds (apply
                                 (javelin.core/formula
                                  (fn [& formatteds]
                                    (zipmap (map key columns)
                                            formatteds)))
                                 (->> columns
                                      vals
                                      (map :formatter)
                                      (map (fn [formatter]
                                             (formatter item)))))
                     csses      (apply
                                 (javelin.core/formula
                                  (fn [& csses]
                                    (zipmap (map key columns)
                                            csses)))
                                 (->> columns
                                      vals
                                      (map :css)
                                      (map (fn [css]
                                             (when css
                                               (css item rownum))))))]
                 (for [n (range num-columns)]
                   (let [column-id (formula-of [column-order]
                                     (nth column-order n))
                         hidden?   (formula-of [hidden-columns column-id]
                                     (hidden-columns column-id))]
                     (with-let [^js/HTMLTableDataCellElement c (td)]
                       (c :class (formula-of [editing-columns? hidden?]
                                   {:hidden-column (and (not editing-columns?) hidden?)
                                    :table-grid-cell true})
                          :css (formula-of [column-id csses]
                                 ;; This is horrible, but it appears
                                 ;; that Hoplon won't actually remove
                                 ;; the style attribute it's already
                                 ;; set if the value is nil. Or an
                                 ;; empty map, or anything else I
                                 ;; could figure out to provide.
                                 (or (get csses column-id)
                                     (do
                                       (.removeAttribute c "style")
                                       nil))
                                 (get csses column-id))
                          (formula-of [column-id formatteds]
                            (get formatteds column-id)))))))))))))))

;; Unfortunately, none of the below seems to work. I think there's
;; something in Hoplon that messes up Rum or React somehow, because I
;; can't get a a table to sort correctly. Don't use.


;; ;; It's weird that this is a separate component, but I found that it
;; ;; was the only way to get around a problem with :key attributes.
;; (rum/defc RTableGridBodyRow <
;;   rum/reactive
;;   [{:keys [item rownum editing-columns? row-attrs columns column-order hidden-columns*]}]
;;   (let [num-columns (count column-order)]
;;     [:tr.table-grid-row
;;      (row-attrs item)
;;      (for [n (range num-columns)]
;;        (let [column-id               (nth column-order n)
;;              {:keys [css formatter]} (get columns column-id)
;;              hidden?                 (hidden-columns* column-id)]
;;          [:td.table-grid-cell
;;           {;; :key   column-id
;;            :class (comm/classes
;;                    {:hidden-column (and (not (rum/react editing-columns?))
;;                                         hidden?)})
;;            :style (when css
;;                     (css item rownum))}
;;           (formatter item)]))]))

;; (rum/defcs RTableGrid <
;;   (rum/local false ::editing-columns?)
;;   (rum/local nil ::sort-criteria)
;;   rum/reactive
;;   [state {:keys [data
;;                  row-attrs
;;                  when-empty
;;                  columns
;;                  fixed-columns
;;                  movable-columns
;;                  hidden-columns
;;                  key-fn]}]
;;   (assert key-fn "RTableGrid: key-fn is required")
;;   (let [movable-columns* (rum/react movable-columns)
;;         hidden-columns*  (rum/react hidden-columns)
;;         data*            (rum/react data)
;;         editing-columns? (::editing-columns? state)
;;         sort-criteria    (::sort-criteria state)
;;         column-order     (->> (vec movable-columns*)
;;                               (into (vec fixed-columns))
;;                               (remove (if @editing-columns?
;;                                         (constantly false)
;;                                         hidden-columns*)))
;;         num-columns      (count column-order)
;;         sorted-items     (if-not @sort-criteria
;;                            data*
;;                            (let [[sort-column sort-direction] @sort-criteria
;;                                  {:keys [sort-key]}           (get columns sort-column)]
;;                              (sort-by sort-key
;;                                       (if (= sort-direction :ascending)
;;                                         compare
;;                                         (fn [a b]
;;                                           (- (compare a b))))
;;                                       data*)))]
;;     ;; (.log js/console "Columns" (pr-str column-order))
;;     ;; (.log js/console "Hidden" (pr-str hidden-columns*))
;;     ;; (.log js/console "Column order" (pr-str column-order))
;;     ;; (.log js/console "Sort" (pr-str @sort-criteria))
;;     [:div
;;      [:pre
;;       {:style {:font-family "monospace"
;;                :white-space "pre-wrap"
;;                :background  "black"
;;                :color       "green"}}
;;       (pr-str sorted-items)]
;;      [:table.table-grid
;;       [:thead.table-grid-header
;;        [:tr.table-grid-row
;;         [:td.table-grid-cell
;;          {:col-span num-columns}
;;          (buttons/RImageButton
;;           {:src      "images/settings.svg"
;;            :width    (px 16)
;;            :title    "Settings"
;;            :latched? @editing-columns?
;;            :on-click (fn [e] (swap! editing-columns? not))})
;;          (help/RHelpIcon [:table-grid :settings])]]
;;        [:tr.table-grid-row
;;         (for [n (range num-columns)]
;;           (let [column-id    (nth column-order n)
;;                 hidden?      (hidden-columns* column-id)
;;                 disable-sort (-> columns (get column-id) :disable-sort)]
;;             [:td.table-grid-cell
;;              {;; :key      column-id
;;               :class    (comm/classes
;;                          {"hidden-column" (and (not @editing-columns?)
;;                                                hidden?)})
;;               :on-click (fn [_]
;;                           (when-not disable-sort
;;                             (swap! sort-criteria
;;                                    (fn [[old-index direction]]
;;                                      [column-id
;;                                       (cond
;;                                         (not= old-index column-id)
;;                                         :ascending

;;                                         (= direction :ascending)
;;                                         :descending

;;                                         :else
;;                                         :ascending)]))))}
;;              ;; Header row
;;              (when (and (< (count fixed-columns) n)
;;                         @editing-columns?)
;;                (buttons/RAButton
;;                 {:title    "Move column left"
;;                  :style    {:background "linear-gradient(white, white 50%, rgb(195, 194, 194) 100%)"}
;;                  :on-click (fn [e]
;;                              (.preventDefault e)
;;                              (.stopPropagation e)
;;                              (-> e .-nativeEvent .preventDefault)
;;                              (-> e .-nativeEvent .stopPropagation)
;;                              (-> e .-nativeEvent .stopImmediatePropagation)
;;                              (swap! movable-columns nudge column-id -1))}
;;                 "<"))
;;              (when @editing-columns?
;;                (rinl
;;                 {:style    {:border-width  (px 2)
;;                             :border-style  "inset"
;;                             :border-radius (px 3)
;;                             :color         (if hidden? "red" "green")
;;                             :background    "white"
;;                             :line-height   "90%"
;;                             :padding       (px 1)
;;                             :cursor        "pointer"
;;                             :width         (px 10)}
;;                  :on-click (fn [e]
;;                              (.preventDefault e)
;;                              (.stopPropagation e)
;;                              (-> e .-nativeEvent .preventDefault)
;;                              (-> e .-nativeEvent .stopPropagation)
;;                              (-> e .-nativeEvent .stopImmediatePropagation)
;;                              (swap! hidden-columns (if hidden? disj conj) column-id))}
;;                 (if hidden? "✗" "✓")))
;;              (-> columns (get column-id) :title)
;;              (when-not disable-sort
;;                (rsorters @sort-criteria column-id))
;;              (when (and (<= (count fixed-columns) n)
;;                         (< n (dec num-columns))
;;                         @editing-columns?)
;;                (buttons/RAButton
;;                 {:title    "Move column right"
;;                  :style    {:background "linear-gradient(white, white 50%, rgb(195, 194, 194) 100%)"}
;;                  :on-click (fn [e]
;;                              (.preventDefault e)
;;                              (.stopPropagation e)
;;                              (-> e .-nativeEvent .preventDefault)
;;                              (-> e .-nativeEvent .stopPropagation)
;;                              (-> e .-nativeEvent .stopImmediatePropagation)
;;                              (swap! movable-columns nudge column-id 1))}
;;                 ">"))]))]]
;;       [:tbody.table-grid-body
;;        (if (-> sorted-items count zero? (and when-empty))
;;          [:tr.table-grid-row
;;           [:td {:col-span num-columns}
;;            when-empty]]
;;          (for [[rownum item] (map-indexed vector sorted-items)]
;;            (RTableGridBodyRow {:item             item
;;                                :editing-columns? editing-columns?
;;                                :rownum           rownum
;;                                :key-fn           key-fn
;;                                :row-attrs        row-attrs
;;                                :columns          columns
;;                                :column-order     column-order
;;                                :hidden-columns*  hidden-columns*})))]]]))

;; (defn rtable-grid
;;   "Retruns a Rum table grid control. Opts:

;;   :data - A cell containing a seq of maps
;;   :row-attrs - A function from a row to an attrs map
;;   :when-empty - UI to show when there are no rows in the data
;;   :columns - A map from column IDs to column descriptions
;;   :fixed-columns - A seq of IDs of unmovable columns
;;   :movable-columns - [cell] A seq of IDs of movable columns
;;   :hidden-columns - [cell] A set of IDs of hidden columns
;;   :key-fn - Function returning identity given a row from the data.

;; Column description:
;; :title - Shows up in the header row
;; :sort-key - Function from a row value (not cell) to a sort value
;; :formatter - Function from a row item to UI
;; :css - Function from row item  row number to map of css values."
;;   [{:keys [data row-attrs when-empty columns fixed-columns movable-columns hidden-columns]
;;     :as opts}]
;;   (register-table-grid-styles!)
;;   (with-let [parent (div)]
;;     (let [opts-cell (formula-of [data movable-columns hidden-columns]
;;                       (assoc opts
;;                              :data data
;;                              :movable-columns movable-columns
;;                              :hidden-columns hidden-columns))]
;;       (rum/mount (RTableGrid opts) parent))))

;; (rum/defc RTableGridRow
;;   [row columns]
;;   [:tr.table-grid-row
;;    {:key (:id row)}
;;    (for [col columns]
;;      [:td.table-grid-cell
;;       {:key (name col)}
;;       (get row col)])])

;; (rum/defcs RSimpleGrid < (rum/local nil ::sort-criteria)
;;   [{:keys [::sort-criteria]} data columns]
;;   (let [sorted-items (if-not @sort-criteria
;;                        data
;;                        (let [[sort-column sort-direction] @sort-criteria]
;;                          (sort-by sort-column
;;                                   (if (= sort-direction :ascending)
;;                                     compare
;;                                     (fn [a b]
;;                                       (- (compare a b))))
;;                                   data)))]
;;     [:table.table-grid
;;      [:thead.table-grid-header
;;       [:tr.table-grid-row
;;        (for [col columns]
;;          [:td.table-grid-cell
;;           {:key col
;;            :on-click (fn [_]
;;                        (.log js/console "Sorting" (str col))
;;                        (swap! sort-criteria
;;                               (fn [[_ sort-direction]]
;;                                 [col (if (= sort-direction :ascending)
;;                                        :descending
;;                                        :ascending)])))}
;;           (str col)
;;           " "
;;           [:a {:style    {:cursor        "pointer"
;;                           :border-radius (px 3)
;;                           :border-style  "sold"
;;                           :border-color  "grey"
;;                           :border-width  (px 1)}}
;;            "sort"]])]]
;;      [:tbody.table-grid-body
;;       (for [row sorted-items]
;;         #_(RTableGridRow row columns)
;;         [:tr.table-grid-row
;;          {:key (:id row)}
;;          (for [col columns]
;;            [:td.table-grid-cell
;;             {:key (name col)}
;;             (get row col)])])]]))