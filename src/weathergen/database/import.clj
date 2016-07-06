(ns weathergen.database.import
  "A library for importing information from various Falcon database
  files."
  (:require [clojure.data.csv :as csv]
            [clojure.string :as str]
            [weathergen.database.balkans :as balkans]
            [weathergen.database.israel :as israel]
            [weathergen.database.korea :as korea]))

(def ->long (fn [_ v] (Long. v)))

(def theater-info
  {:korea   korea/theater-info
   :balkans balkans/theater-info
   :israel  israel/theater-info})

(def column-mappings
  {"Objective" [:objective ->long]
   "Name" [:name]
   "Type" [:type]
   "Owner" [:owner ->long]
   "X" [:x ->long]
   "Y" [:y ->long]
   "ID" [:id ->long]})

(defn convert-row
  [theater header row]
  (let [mappings (map #(get column-mappings %) header)]
    (into {}
          (map (fn [k [k* xform] v]
                 [(or k* k)
                  (if xform
                    (xform theater v)
                    v)])
               header
               mappings
               row))))

(defn import-objectives-csv
  "Reads a TacEdit objectives export and returns a sequence of maps,
  one for each row. Input should be a Reader."
  [theater input]
  (let [[header & rows] (->> input
                             csv/read-csv
                             (drop 1))
        header* (map str/trim header)]
    (map #(convert-row theater %1 %2)
         (repeat header*)
         (map #(map str/trim %) rows))))

