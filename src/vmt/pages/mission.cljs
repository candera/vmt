(ns ^{:hoplon/page "mission.html"} vmt.pages.mission
  (:require [weathergen.ipc :as ipc]
            [weathergen.progress :as progress]
            [weathergen.ui :as ui]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]))

;; (set! *warn-on-infer* true)

(defn- make-progress-reporter
  []
  (reify progress/Reporter
    (-start-step [this step-name parent]
      (let [step-id (str (gensym))]
        (ipc/send-to-main "load-step-started" {:id     step-id
                                               :name   step-name
                                               :parent (when parent (progress/-id parent))})
        (reify progress/Step
          (-id [this] step-id)
          (-succeeded [this]
            (ipc/send-to-main "load-step-succeeded" {:id step-id}))
          (-warn [this message]
            (ipc/send-to-main "load-step-warning" {:id      step-id
                                                   :message message}))
          (-failed [this message]
            (ipc/send-to-main "load-step-failed" {:id      step-id
                                                  :message message})))))))

(defmethod ipc/on-message "open-mission"
  [_ event installations path]
  (try
    (binding [progress/*reporter* (make-progress-reporter)]
      (log/debug "open-mission" :installations installations :path path)
      (ui/load-mission installations path))
    (ipc/send-to-main "load-complete")
    (catch :default ^js/Error e
      (log/error e "Load failed" :stack (.-stack e))
      (ipc/send-to-main "load-failed"
                        (when-not (-> e ex-data :type (= ::progress/propagated-error))
                          (.-stack e))))))

(defmethod ipc/on-message "open-briefing"
  [_ event installations path]
  (try
    (binding [progress/*reporter* (make-progress-reporter)]
      (log/debug "open-mission" :installations installations :path path)
      (ui/load-briefing installations path))
    (ipc/send-to-main "load-complete")
    (catch :default ^js/Error e
      (log/error e "Load failed"
                 :ex-data (ex-data e)
                 :propagated? (-> e ex-data :type (= ::progress/propagated-error))
                 :stack (.-stack e))
      (ipc/send-to-main "load-failed"
                        (when-not (-> e ex-data :type (= ::progress/propagated-error))
                          (.-stack e))))))

(reset! ui/weather-params
        ui/default-weather-params)

(when ui/safari?
  (swap! ui/messages conj
         ["Due to bugs related to downloading files in Safari, Safari
  is not recommended for use with WeatherGen. To use Safari, make use
  of the workarounds detailed below. Use of Chrome is recommended."]))

(when ui/ie?
  (swap! ui/messages conj
         ["Unfortunately, the weather design features of
         WeatherGen (i.e. this page) do not currently work correctly
         in Internet Explorer. Shared forecasts work fine, so forecast
         links can be shared with pilots using IE. Use of Chrome is
         recommended."]))

(ui/weather-page
 [{:title    "Mission"
   :id       :mission-info
   :sections [:mission-info-section {}
              :save-briefing-section {}
              :briefing-notes-section {}]}
  {:title    "Map"
   :id       :map-controls
   :sections [:map-controls-section {}
              :weather-display-controls {:title "Weather Display Options"}
              :map-image-save-controls {}]}
  {:title    "Annotations"
   :id       :annotation-controls
   :sections [:annotation-controls {}]}
  {:title    "Air Forces"
   :id       :air-forces
   :sections [:air-forces-section {}]}
  {:title    "Flights"
   :id       :flights
   :sections [:flights-section {}]}
  {:title    "Weather"
   :id       :weather
   :sections [:serialization-controls {}
              :step-controls {}
              :weather-display-controls {}
              :weather-parameters {}
              :forecast-section {:forecast-link? false}
              ;;:flight-path-controls {}
              :weather-type-configuration {}
              :cloud-controls {}
              :wind-stability-parameters {}
              :weather-override-parameters {}
              :advanced-controls {}]}
  #_{:title  "ACMI"
     :id       :acmi
     :sections [:acmi-controls {}]}
  #_{:title  "Test and Debug"
     :id       :test
     :sections [:test-section {}]}])