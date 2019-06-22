(ns vmt.fmap-worker
  (:require [weathergen.encoding :refer [encode decode]]
            ;; [weathergen.filesystem :as fs]
            [weathergen.model :as model]
            [weathergen.twx :as twx]
            [weathergen.util :as util]
            [vmt.fmap :as fmap])
  (:require-macros
   [weathergen.cljs.macros :refer [with-time]]))


(def fmaps (atom nil))

#_(defmethod handle :load-fmaps
  [{_      :command
    params :params}]
  (let [mission-path (:mission-path params)
        mission-time (:mission-time params)
        mission-dir  (fs/parent mission-path)
        mission-name (fs/basename mission-path {:omit-extension? true})
        twx-path     (fs/path-combine mission-dir
                                      (str mission-name ".twx"))
        twx-data     (when (fs/exists? twx-path)
                       (some-> twx-path fs/file-buf twx/parse))
        fmap-path    (fs/path-combine mission-dir
                                      (str mission-name ".fmap"))
        initial-data (if (and (fs/exists? fmap-path)
                              (= twx/map-model (:model twx-data)))
                       ())
        initial-fmap (when (and (fs/exists? fmap-path)
                                (= twx/map-model (:model twx-data)))
                       {(select-keys mission-time
                                     [:day :hour :minute])
                        (fmap/decode (fs/file-buf fmap-path))})
        maps-dir (fs/path-combine mission-dir "WeatherMapsUpdates")
        fmap-list    (->> maps-dir
                          fs/ls
                          (map #(re-matches #"([1-9]?[0-9])([0-9]{2})([0-9]{2}).[fF][mM][aA][pP]" %))
                          (remove nil?))]
    (reset! fmaps
            (reduce (fn [fmaps fmap-match]
                      (let [[f d h m] fmap-match
                            fmap-path (fs/path-combine maps-dir f)]
                        (.debug js/console "fmap worker loading" fmap-path)
                        (js/postMessage (encode {:type :status
                                                 :message (str (count fmaps) "FMAPS loaded")}))
                        (assoc fmaps
                               {:day (util/str->long d)
                                :hour (util/str->long h)
                                :minute (util/str->long m)}
                               (fmap/decode (fs/file-buf fmap-path)))))
                    initial-fmap
                    fmap-list))
    {:type :load-complete
     :message (str (count @fmaps) "FMAPS loaded")}))


(defn clear-fmaps
  []
  (.debug js/console "Clearing fmaps")
  (reset! fmaps nil))

(defn load-fmaps
  [time path buf]
  #_(.debug js/console "Loading fmap" time path)
  (try
    (swap! fmaps assoc time (fmap/decode buf))
    #_(.debug js/console "FMAP loaded" path)
    (js/postMessage #js ["fmap-loaded" path])
    (catch :default x
      (.error js/console x "Error loading FMAP" path)
      (js/postMessage #js ["fmap-load-error" path]))))

(defn compute-weather
  [weather-params]
  :todo)

(defn main
  []
  (.debug js/console "FMAP worker initializing")
  (set! js/onmessage
        (fn [msg]
          (let [[type & payload] (.-data msg)]
            #_(.debug js/console
                    "FMAP Worker received message" type payload)
            (case type
              "load-fmap"
              (apply load-fmaps payload)

              "clear-fmaps"
              (clear-fmaps)

              "compute-weather"
              (compute-weather (decode (first payload)))

              (.warn js/console "Ignoring unrecognized message type" type))))
        #_(fn [msg]
            (let [decoded (->> msg .-data decode)]
              (.log js/console
                    "FMAP Worker received message" (pr-str val))
              (js/postMessage
               (with-time (name (:command decoded))
                 (let [result (handle decoded)]
                   (encode result))))))))


