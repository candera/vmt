(ns weathergen.coordinates
  "Functions for converting between various ways of locating things in
  the Falcon world."
  (:require [weathergen.math :as math]
            [weathergen.database :as db]))

;; Weatherspace is a 59x59 grid covering the whole world. Origin is at
;; the upper left. TODO: Is it still 59x59 in a bigger theater?

;; Falcon has two coordinate systems. One is in feet (ffeet), with
;; altitude being negative. The other is Falcon grid (fgrid), and is
;; in km. A standard theater is 1024x1024 km, and starts in the lower
;; left.

;; All of this is a total mess. I need to go through and fix the way
;; that coordinates are done so that it's consistent.

(def ft-per-nm 6076.12)
(def ft-per-km 3280.84)
(def nm-per-km (/ ft-per-km ft-per-nm))

;; TODO: The problem here is that not all maps are 1024x1024.
(def nm-per-map (-> 1024 (* ft-per-km) (/ ft-per-nm)))

(defn nm->ft
  [nm]
  (* nm ft-per-nm))

(defn fgrid->nm
  "Converts from Falcon grid (km) to nm"
  [km]
  (* km nm-per-km))

(def km->nm fgrid->nm)

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

(defn ffeet->weather
  "Returns fractional weatherspace coordinates given Falcon-style x/y feet"
  [[nx ny] x y]
  [(-> y ft->nm (/ nm-per-map) (* ny))
   (- nx (-> x ft->nm (/ nm-per-map) (* nx)))])

(defn weather->fgrid
  "Converts from weatherspace coordinates to fgrid coords."
  [mission {:keys [x y]}]
  {:x (-> x
          (/ 59.0)
          (* (-> mission :campaign-info :theater-size-x)))
   :y (-> y
          (/ 59.0)
          (->> (- 1))
          (* (-> mission :campaign-info :theater-size-y)))})

(defn weather->nm
  "Converts from weatherspace linear units (squares) to nm"
  [mission squares]
  (-> squares
      (/ 59.0)
      (* (-> mission :campaign-info :theater-size-x))
      (* nm-per-km)))

(defn nm->weather
  "Converts from nm to weatherspace linear units (squares)."
  [mission nm]
  (-> nm
      (/ nm-per-km)
      (/ (-> mission :campaign-info :theater-size-x))
      (* 59)))

(defn fgrid->weather
  "Returns a map of :x and :y coordinates (in weather space) given
  coordinates in Falcon grid space."
  [mission x y]
  ;; TODO: Another place where we're assuming 59x59.
  {:x (-> x
          (/ (-> mission :campaign-info :theater-size-x))
          (* 59.0))
   :y (-> y
          (/ (-> mission :campaign-info :theater-size-y))
          (->> (- 1))
          (* 59.0))})

(defn weather->bullseye
  "Convert from weatherspace coordinates to bullseye, a map with
  `:heading` and `:distance` keys. Distance is in nm, heading in
  degrees."
  [mission {:keys [x y] :as coords}]
  ;; We're going to assume 59x59 for now.
  (when mission
    (let [{:keys [campaign-info]} mission
          {:keys [bullseye-x bullseye-y]} campaign-info
          {fx :x fy :y} (weather->fgrid mission coords)
          dx (- fx bullseye-x)
          dy (- fy bullseye-y)
          d [dx dy]]
      {:heading (math/heading d)
       :distance (-> d math/magnitude (* nm-per-km))})))


