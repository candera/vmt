(ns weathergen.worker
  (:require [weathergen.model :as model]
            [weathergen.encoding :refer [encode decode]]
            [cljs.core.async :as async])
  (:require-macros
   [cljs.core.async.macros :refer [go go-loop]]
   [weathergen.cljs.macros :refer [with-time]]))

(defn main
  []
  (.debug js/console "Generated weather worker is initializing")
  (set! js/onmessage
        (fn [msg]
          (let [val (->> msg .-data decode)]
            #_(.log js/console
                  "Worker received message" (pr-str val))
            (js/postMessage
             (with-time "Compute weather grid"
               (let [w (model/weather-grid val)]
                 #_(.log js/console
                       "Returning weather" (count w))
                 (encode w))))))))


