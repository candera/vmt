(ns weathergen.coordinates
  "Functions for converting between various ways of locating things in
  the Falcon world."
  (:require [weathergen.math :as math]
            [weathergen.database :as db]))

(defn dm->deg [[d m]]
  (+ d (/ m 60.0)))

(defn lat-long->grid
  "Convert from degree/minute coordinates to grid coordinates"
  [[nx ny] theater [lat long]]
  (let [{:keys [left top bottom top-right]} (get-in db/theater-info [theater :mapping])
        [left* top* bottom* top-right* lat* long*] (map dm->deg [left top bottom top-right lat long])
        topr (math/deg->rad top*)
        latr (math/deg->rad lat*)]
    (println "a" :topr topr :latr latr)
    [(-> long*
         (- left*)
         (/ (- top-right* left*))
         (/ (Math/cos topr))
         (* (Math/cos latr))
         (* nx)
         int)
     (-> lat*
         (- top*)
         (/ (- bottom* top*))
         (* ny)
         int)]))

(defn airbase-coordinates
  "Returns the grid coordinates of an airbase"
  [[nx ny] theater airbase]
  (let [{:keys [x y]} (->> theater
                           db/airbases
                           (filter #(= (:name %) airbase))
                           first)]
    (when (and x y)
      (let [[width height] (-> db/theater-info theater :size)]
        [(-> x (/ width) (* nx) int)
         (- ny 1 (-> y (/ height) (* ny) int))]))))
