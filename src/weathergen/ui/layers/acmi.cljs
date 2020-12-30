(ns weathergen.ui.layers.acmi
  "A layer for displaying what's in an ACMI file."
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [hoplon.core :refer [a datalist defelem div do-watch fieldset for-tpl h4
                                 i if-tpl img input label legend li
                                 option pre select span style
                                 table tbody td thead tr ul when-tpl with-timeout]]
            [hoplon.svg :as svg]
            [javelin.core :refer [cell cell? cell= cell-let dosync formula-of lens with-let]]
            [lsobot.acmi :as acmi]
            [weathergen.coordinates :as coords]
            [weathergen.falcon.files.mission :as mission]
            [weathergen.filesystem :as fs]
            [weathergen.ui.buttons :as buttons]
            [weathergen.ui.common :as comm :refer [control-section map-lens]]
            [weathergen.ui.grids :as grids])
  (:require-macros
   [weathergen.cljs.macros :refer [keyed-for-tpl
                                   map-lens-tpl
                                   with-attr-bindings
                                   with-bbox
                                   with-default-lenses
                                   with-key-lenses
                                   with-time]]))

(def ^js/electron electron (js/require "electron")
  #_(when (= "nodejs" cljs.core/*target*)
      (js/require "electron")))

(defn- load-acmi
  [acmis]
  (let [[path] (-> electron
                   .-remote
                   .-dialog
                   (.showOpenDialogSync
                    (clj->js
                     {:title       "Select an ACMI file"
                      :properties  ["openFile"]
                      :filters     [{:name      "ACMI"
                                     :extensions ["acmi"]}]})))]
    (when path
      (let [data (-> path
                     fs/file-text
                     acmi/read-acmi)]
        (swap! acmis assoc path data)))))

(defn- overlay
  [mission {:keys [suppress-bullseye-info-box? map-zoom acmis] :as state}]
  (svg/g
   :debug "ACMI layer"
   (map-lens-tpl acmis [path data]
     (let [frame        (formula-of [data]
                          (-> data ::acmi/frames last))
           entities     (formula-of [frame]
                          (->> frame
                               ::acmi/entities
                               (filter (fn [[entity-id entity]]
                                         (->> entity
                                              ::acmi/object-type
                                              (set/intersection #{"Weapon" "Decoy" "Air"})
                                              empty?)))
                               (into {})))
           aspect-ratio 2.8
           width        0.4
           height       (* width aspect-ratio)
           tip-size     3.5
           tip-entity   (cell nil)]
       (do-watch tip-entity
                 (fn [_ n]
                   (reset! suppress-bullseye-info-box? n)))
       (svg/g
        :debug path
        :entities (cell= (count entities))
        (svg/g
         :debug "entities"
         (map-lens-tpl entities [entity-id entity]
           (let [coords (formula-of [mission entity]
                          (let [{:keys [::acmi/u ::acmi/v]} entity]
                            ;; Yet another place we assume 59x59
                            (coords/acmi->weather mission u v)))]
             (svg/g
              :transform (formula-of [coords map-zoom]
                           (let [{:keys [x y]} coords]
                             (comm/svg-xform-combine
                              (comm/svg-translate x y)
                              (comm/svg-scale (/ 1.0 map-zoom)))))
              (svg/rect
               :transform (formula-of [entity]
                            (comm/svg-rotate (::acmi/heading entity 90)))
               :mouseenter #(reset! tip-entity @entity-id)
               :mouseleave #(reset! tip-entity nil)
               :x (/ width -2)
               :y (/ height -2)
               :width width
               :height height
               :fill (cell= (str/lower-case (or (::acmi/color entity) "black")))
               :stroke "black"
               :stroke-width (cell= (* (/ width 25)
                                       (if (= tip-entity entity-id)
                                         2
                                         1))))))))
        (svg/g
         :debug (cell= (str "Tooltip: tip entity " tip-entity))
         (when-tpl tip-entity
           (let [entity (cell= (get entities tip-entity))
                 coords (formula-of [mission entity]
                          (when entity
                            (let [{:keys [::acmi/u ::acmi/v]} entity]
                              (coords/acmi->weather mission u v))))]
             (svg/g
              :debug "Tooltip"
              :transform (formula-of [coords map-zoom]
                           (let [{:keys [x y]} coords]
                             (comm/svg-xform-combine
                              (comm/svg-translate x y)
                              (comm/svg-scale (/ 1.0 map-zoom)))))
              (with-bbox :w w :h h :watch entity
                [t (svg/text
                    :css {:pointer-events "none"}
                    :x 0
                    :y 0
                    (cell= (::acmi/name entity)))]
                (svg/g
                 :transform (comm/svg-scale 0.06)
                 (svg/rect
                  :css {:pointer-events "none"}
                  :x (cell= (* w -0.05))
                  :y (cell= (- (* 0.8 h)))
                  :width (cell= (* w 1.1))
                  :height h
                  :fill (cell= (comm/lighten
                                (str/lower-case (or (::acmi/color entity) "black"))
                                40))
                  :opacity 0.8
                  :stroke "black"
                  :stroke-width (/ width 50))
                 t)))))))))))

(defn- controls
  [mission {:keys [acmis] :as state}]
  (let [current-t (cell 0)
        max-t (cell 0)]
    (div
     ;; TODO: Support multiple ACMIs at some point
     (control-section
      :title "ACMI Import"
      (buttons/a-button
       :click (fn [_]
                (dosync
                 (load-acmi acmis)
                 (reset! current-t
                         (->> @acmis
                              first
                              val
                              ::acmi/frames
                              last
                              ::acmi/t))
                 (reset! max-t @current-t)))
       :disabled? (cell= (not (empty? acmis)))
       "Load ACMI")
      (buttons/a-button
       :click (fn [_] (reset! acmis {}))
       "Clear")
      (map-lens-tpl acmis [path data]
       (div
        (cell= (when path
                 (str (fs/basename path)
                      " ("
                      (-> data ::acmi/frames count)
                      " frames)")))
        (comm/validating-edit
         :conform comm/conform-nonnegative-float
         :fmt str
         :source current-t)
        #_(comm/slider
         :min 0
         :max max-t
         :value current-t)
        #_(grids/table-grid
           :data (formula-of [data]
                   (let [e-map (-> data ::acmi/frames last ::acmi/entities)]
                     (reduce-kv (fn [a k v]
                                  (conj a (assoc v ::acmi/entity-id k)))
                                []
                                e-map)))
           :row-attrs (constantly {})
           :key-fn ::acmi/entity-id
           :fixed-columns [:name :type :heading :removed? :color :coalition]
           :movable-columns (cell [])
           :hidden-columns (cell #{})
           :columns
           {:name      {:title     "Name"
                        :formatter (fn [row _]
                                     (-> row ::acmi/name cell=))}
            :type      {:title     "Type"
                        :formatter (fn [row _]
                                     (-> row ::acmi/object-type pr-str cell=))}
            :heading   {:title     "Heading"
                        :formatter (fn [row _]
                                     (-> row ::acmi/heading str cell=))}
            :removed?  {:title     "Removed?"
                        :formatter (fn [row _]
                                     (-> row ::acmi/removed? str cell=))}
            :color     {:title     "Color"
                        :formatter (fn [row _]
                                     (-> row ::acmi/color str cell=))}
            :coalition {:title     "Coalition"
                        :formatter (fn [row _]
                                     (-> row ::acmi/coalition str cell=))}})))))))

(defn create
  [mission {:keys [map-zoom] :as state}]
  (let [state* (assoc state
                      :acmis (cell {}))]
    {:controls-fn (fn [] (controls mission state*))
     :overlay-fn  (fn []
                    (overlay mission state*))
     :state       state*}))
