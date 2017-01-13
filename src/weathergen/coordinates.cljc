(ns weathergen.coordinates
  "Functions for converting between various ways of locating things in
  the Falcon world."
  (:require [weathergen.math :as math]
            [weathergen.database :as db]))

(def ft-per-nm 6076.12)

;; TODO: This should really be 553, which is the size of the map in
;; nm, then divide it out by nx or ny
(def nm-per-map 553.0)

(defn nm->ft
  [nm]
  (* nm ft-per-nm))

(defn ft->nm
  [ft]
  (/ ft ft-per-nm))

(defn dm->deg [[d m]]
  (+ d (/ m 60.0)))

(defn lat-long->grid
  "Convert from degree/minute coordinates to fractional grid coordinates"
  [[nx ny] theater [lat long]]
  (let [{:keys [left top bottom top-right]} (get-in db/theater-info [theater :mapping])
        [left* top* bottom* top-right* lat* long*] (map dm->deg [left top bottom top-right lat long])
        topr (math/deg->rad top*)
        latr (math/deg->rad lat*)]
    [(-> long*
         (- left*)
         (/ (- top-right* left*))
         (/ (Math/cos topr))
         (* (Math/cos latr))
         (* nx))
     (-> lat*
         (- top*)
         (/ (- bottom* top*))
         (* ny))]))

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

(defn falcon->grid
  "Returns fractional grid coordinates from Falcon-style x/y feet"
  [[nx ny] x y]
  [(-> y ft->nm (/ nm-per-map ny))
   (- nx (-> x ft->nm (/ nm-per-map nx)))])
