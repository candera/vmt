(ns user
  (:require [clojure.pprint :as pprint :refer [pprint]]
            [clojure.repl :refer :all]
            [clojure.set :as set]
            [clojure.spec :as s]
            [clojure.string :as str]
            [clojure.tools.namespace.repl :refer [refresh]]
            [octet.core :as buf]
            [taoensso.timbre :as log]
            [weathergen.dtc :as dtc]
            [weathergen.fmap :as fmap]
            [weathergen.falcon.files :as files]
            [weathergen.filesystem :as fs]
            [weathergen.lzss :as lzss]
            [weathergen.math :as math]
            [weathergen.model :as model]))

#_(defn cljs
  []
  (start-figwheel!)
  (cljs-repl))

#_(in-ns 'boot.user)

(defn enquote
  [v]
  (str "\"" v "\""))

(defn vectorize
  "Turn x into a vector if it isn't already."
  [x]
  (if (vector? x) x [x]))

(defn flatten-map
  "Given a nested map, flatten it so all keys are top-level."
  [m]
  ;; This is pretty cheezy, but works well enough for what I'm using
  ;; it for.
  (reduce-kv (fn [m k v]
               (if-not (map? v)
                 (assoc m (vectorize k) v)
                 (merge m
                        (flatten-map
                         (->> v
                              (map (fn [[ki vi]]
                                     [(conj (vectorize k) ki)
                                      vi]))
                              (into {}))))))
             {}
             m))

(defn csv-ize
  "Given a collection of maps, return out a CSV string. Options can
  include :initial-columns, an ordering of columns to appear first. Remaining
  columns will be lexically sorted."
  ([maps] (csv-ize maps {}))
  ([maps {:keys [initial-columns] :or {initial-columns []} :as options}]
   (let [flattened-initial (mapv vectorize initial-columns)
         flattened (mapv flatten-map maps)
         cols (as-> flattened ?
                (mapcat keys ?)
                (set ?)
                (set/difference ? (set flattened-initial))
                (sort ?)
                (vec ?)
                (into flattened-initial ?))
         get-vals (fn [item]
                    (for [col cols]
                      (get item col)))
         header (->> cols
                     (map str)
                     (interpose ",")
                     (apply str "index,"))
         row  (fn [index item]
                #_(log/debug "row" :index index :item (class item))
                (->> item
                     get-vals
                     (map enquote)
                     (interpose ",")
                     (apply str index ",")))]
     (->> flattened
          (map-indexed row)
          (into [header])
          (interpose "\n")
          (apply str)))))


(def smpu
  (delay
   (log/debug "Reading SMPU...")
   (let [mission (files/read-mission
                  "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/SMPU-Day  3 00 41 48.cam")]
     (log/debug "Done reading.")
     mission)))
