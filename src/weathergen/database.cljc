(ns weathergen.database
  "A library providing information from various Falcon database
  files."
  (:require [weathergen.database.balkans :as balkans]
            [weathergen.database.israel :as israel]
            [weathergen.database.korea :as korea]
            [weathergen.database.kuriles :as kuriles]))

(def theater-info
  {:korea   korea/theater-info
   :balkans balkans/theater-info
   :israel  israel/theater-info
   :kuriles kuriles/theater-info})

(defn airbases
  "Return all the airbase and airstrips in the specified theater"
  [theater]
  (->> (get theater-info theater {})
       :objectives
       (filter #(#{"Airbase" "Airstrip"} (:type %)))))
