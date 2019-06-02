(ns weathergen.ui.slickgrid
  "Encapsulates the SlickGrid control."
  (:require #_[jquery.event.drag]
            #_[slick.core]
            [javelin.core :refer [formula-of]]
            [slick.grid]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)])
  (:require-macros
   [weathergen.cljs.macros :refer [with-time #_formula-of]]))

;; (set! *warn-on-infer* true)

;; Garden styles that will be inserted into the head of the page
(def styles
  [;; Prevents the header background from extending out into thin air
   :.slick-header-columns {:background "initial"
                           :border-bottom "initial"}])

;; Example of use
(comment
  (let [data [{:a 1 :b 2 :c 3}
              {"a" 4 "b" 5 "c" 6}
              {"a" "a" "b" "b" "c" "c"}]
        columns [{:id "a"
                  :name "A"
                  :field "a"}
                 {:id "b"
                  :name "B"
                  :field "b"}
                 {:id "c"
                  :name "C"
                  :field "c"}]]
    (slickgrid :data (cell data)
               :columns (cell columns)
               :options (cell {}))))

;; This really isn't there yet
(defn clojure-data-view
  [data]
  (reify Object
    (getLength [this] (count data))
    (getItem [this index] (nth data index))
    ;;(getItemMetadata [this index] :todo)
    ))

(defelem slickgrid
  [attrs _]
  (let [{:keys [data columns options]} attrs
        ;; Convert to cells in case they aren't
        data* (cell= data)
        columns* (cell= columns)
        options* (cell= (assoc options :explicitInitialization true))]
    (with-let [elem (div (dissoc attrs :data :columns :options))]
      (let [g (js/Slick.Grid. elem
                              #js []    ; data
                              #js []    ; columns
                              ;; Enabling column reorder requires another jquery module, so turn it off for now
                              #js {:enableColumnReorder false
                                   :explicitInitialization true})]
        (with-dom elem
          (.init g))
        (formula-of [data*]
          (.setData g (clj->js data*)))
        (formula-of [columns*]
          (.setColumns g (clj->js columns*)))
        (formula-of [options*]
          (.setOptions g (clj->js options*)))))))



