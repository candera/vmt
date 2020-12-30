(ns ^{:hoplon/page "test.html"} vmt.pages.test
  (:require [clojure.browser.repl :as repl]
            [clojure.pprint :refer [pprint]]
            [clojure.string :as str]
            ;; [cljsjs.pako]
            [goog.crypt.base64 :as base64]
            [goog.string :as gstring]
            [goog.string.format]
            [hoplon.jquery]
            [hoplon.storage-atom :refer [local-storage]]
            [hoplon.core :refer [a body div html textarea]]
            [hoplon.svg :as svg]
            [javelin.core :refer [cell cell= defc formula-of]]
            [weathergen.coordinates :as coords]
            [weathergen.database :as db]
            [weathergen.falcon.install :as install]
            [weathergen.falcon.files.mission :as mission]
            [weathergen.filesystem :as fs]
            [weathergen.help :as help]
            [weathergen.math :as math]
            [weathergen.model :as model]
            [weathergen.ui :as ui]
            [weathergen.ui.buttons :as buttons]
            [weathergen.ui.common :as comm :refer [px]]
            [weathergen.ui.grids :as grids]
            [weathergen.ui.layers.flights :as flights]
            [weathergen.ui.select :refer [select3]]
            [weathergen.ui.tabs :as tabs]
            [weathergen.ui.textarea :as ta])
  (:require-macros
   [cljs.core.async.macros :refer [go go-loop]]
   [weathergen.cljs.macros :refer [with-key-lenses with-time #_formula-of keyed-for-tpl]]))

;; (reset! ui/max-time {:day 2 :hour 2 :minute 2})

(reset! ui/weather-params
        ui/default-weather-params)

;; (ui/weather-page
;;  :test-section {})

(def hidden-columns
  (local-storage
   (cell #{:bar :baaz})
   (str ::hidden-columns)))

(def movable-columns
  (local-storage
   (cell [:foo :bar :baaz :quux])
   (str ::movable-columns2)))

(defc installations nil)

(install/locate-installations
 (fn [installs]
   (reset! installations installs)))

(defn load-mission
  [mission]
  (when-let [[path] (-> "electron"
                        js/require
                        .-remote
                        .-dialog
                        (.showOpenDialogSync
                         (clj->js {:title      "Select a campaign or tactical engagement file"
                                   :properties ["openFile"]
                                   :filters    [{:name       "Campaign file"
                                                 :extensions ["cam"]}
                                                {:name       "Tactical engagement file"
                                                 :extensions ["tac"]}]})))]
    (reset! mission (with-time "read-mission"
                      (mission/read-mission @installations path)))))

#_(defn- save-svg
  "Given an SVG element `svg`, save it (asynchronously) to a PNG at
  `path`, with size `w` by `h`."
  [svg [w h] path]
  (let [data   (-> svg .-outerHTML js/encodeURIComponent)
        src    (str "data:image/svg+xml;utf8," data)
        canvas (.createElement js/document "canvas")
        ctx    (.getContext canvas "2d")
        img    (js/Image.)]
    (-> canvas .-width (set! w))
    (-> canvas .-height (set! h))
    (.log js/console "Canvas created")
    #_(-> js/document .-body (.appendChild canvas))
    (with-timeout 1000
      (.log js/console src)
      (-> img .-onload (set! (fn []
                               (.log js/console "img loaded" img)
                               (.drawImage ctx img 0 0 w h)
                               (.log js/console "image drawn")
                               (.toBlob canvas
                                        (fn [blob]
                                          (.log js/console "Saving blob")
                                          (comm/save-blob-async blob path))))))
      (-> img .-onerror (set! (fn [e a b c]
                                (.log js/console "img failed to load" e a b c))))
      (-> img .-src (set! src)))))

(defn- save-svg
  "Given an SVG element `svg`, save it (asynchronously) to a PNG at
  `path`, with size `w` by `h`."
  [svg [w h] path]
  (let [data   (-> svg .-outerHTML js/encodeURIComponent)
        src    (str "data:image/svg+xml;utf8," data)
        canvas (.createElement js/document "canvas")
        ctx    (.getContext canvas "2d")
        img    (js/Image.)]
    (-> canvas .-width (set! w))
    (-> canvas .-height (set! h))
    (.log js/console "Canvas created")
    #_(-> js/document .-body (.appendChild canvas))
    (.log js/console src)
    (-> img .-onload (set! (fn []
                             (.log js/console "img loaded" img)
                             (.drawImage ctx img 0 0 w h)
                             (.log js/console "image drawn")
                             (.toBlob canvas
                                      (fn [blob]
                                        (.log js/console "Saving blob")
                                        (comm/save-blob-async blob path))))))
    (-> img .-onerror (set! (fn [e a b c]
                              (.log js/console "img failed to load" e a b c))))
    (-> img .-src (set! src))))

(defn dataize-images!
  [elem]
  (when (= "image" (.-tagName elem))
    (let [href (.getAttributeNS elem "http://www.w3.org/1999/xlink" "href")]
      (when-let [b64 (some-> href
                             fs/file-buffer
                             (.toString "base64"))]
        (-> elem
            (.setAttributeNS "http://www.w3.org/1999/xlink"
                             "href"
                             (str "data:image/" (fs/extension href) ";base64," b64))))))
  (doseq [child (-> elem .-childNodes array-seq)]
    (dataize-images! child))
  elem)

(html
 (ui/head)
 (let [b         (body)
       c         (cell {"foo"  true
                        "bar"  false
                        "quux" true})
       value     (cell :a)
       choices   [{:value :a
                   :label "A"}
                  {:value :b
                   :label "B"}]
       disabled? (cell false)]
   (b
    (let [c (cell 10)]
      (div
       (comm/validating-edit
        :source c
        :conform (comm/int-conformer 1 100)
        :width 50)
       (div c)))
    (comment
      (ui/weather-override-parameters {})
      (comm/pre-cell "weather-params" ui/weather-params)
      (buttons/a-button
       :click (fn [_]
                (repl/connect "http://localhost:9000/repl")
                (enable-console-print!))
       "Start REPL")
      (buttons/a-button
       :disabled? disabled?
       "Click me")
      (buttons/a-button
       :click (fn [_] (swap! disabled? not))
       "Invert")
      (let [c (cell :foo)]
        [(comm/dropdown
          :value c
          :choices [{:value :foo
                     :label "foo"}
                    {:value :bar
                     :label "bar"}])
         (buttons/a-button :click (fn [_] (reset! c :bar)) "Bar")])
      (comm/pre-cell "disabled?" disabled?)
      (div
       :id "outer"
       #_(buttons/a-button :click (fn [_] (swap! c update "foo" not)) "Click me")
       #_(a :class (cell= (comm/classes-str c))
            "Wut?")
       #_(comm/dropdown :value value
                        :choices choices)
       (div (cell= (str value)))
       (comm/select2 :choices choices
                     :value value)
       (comm/color-picker2 :value (cell "#000000"))
       (let [val (cell "red")]
         (div
          (comm/color-picker2
           :value val
           :alpha? true)
          (div val)))
       (let [display-params (cell {:opacity       0.33
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
             weather-data (cell nil)
             selected-cell (cell nil)
             computing (cell nil)
             pressure-unit (cell :inhg)
             weather-params (cell weathergen.ui/default-weather-params)]
         (weathergen.ui/grid
          :display-params display-params
          :weather-data weather-data
          :selected-cell selected-cell
          :weather-overrides [] #_weather-overrides
          :computing computing
          :pressure-unit pressure-unit
          ;; TODO: Make these reactive, although they never
          ;; change, so maybe not
          :nx (first (:cell-count @weather-params))
          :ny (second (:cell-count @weather-params)))
         #_(comm/when-dom*
            (div "hi")
            (fn []
              (.log js/console "triggered")))
         #_(let [annotations (cell {1 {:text "something"}})]
             (keyed-for-tpl key [[k _] annotations]
               (let [annotation (comm/map-lens annotations k)]
                 (with-key-lenses annotation [text]
                   (div
                    :id "inner"
                    (div "Value: " (cell= (pr-str text)))
                    ;; (div "Interim: " (cell= (pr-str interim)))
                    (buttons/a-button
                     :click #(reset! text "This is a\ntext.")
                     "Reset")
                    (ta/textarea2
                     :value text
                     :css {:font-family "monospace"}
                     :change (fn [v] (reset! text v))
                     :placeholder "Enter some text")
                    (textarea
                     "This is a bunch of \n multiline text in a normal textarea for comparison."))))))))
))))
