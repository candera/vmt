(ns weathergen.damage
  "Library for computing damage."
  (:require [clojure.string :as str]
            [weathergen.falcon.files.mission :as mission]))

(defn required-hits
  "Returns a table of the number of hits needed to destroy each feature
  at an objective. `weapon` is the weapon to
  include. `objective` is the objective."
  [mission objective weapon]
  (for [[index feature] (->> objective ::mission/features (map-indexed vector))]
    (let [fci             (-> feature ::mission/class-info ::mission/feature-class-info)
          feature-name    (-> fci :name)
          virtual?        (-> fci :flags :virtual?)
          hit-points      (-> fci :hit-points)
          damage-mods     (-> fci :damage-mod)
          weapon-name     (:name weapon)
          damage-type     (:damage-type weapon)
          damage-strength (:strength weapon)
          damage-mod      (nth damage-mods damage-type)
          hits-required   (/ hit-points (* (/ damage-strength 100.0) damage-mod))]
      ;; TODO: I can't figure out by what criteria features are
      ;; included in the recon target list. I thought it was
      ;; FEAT_VIRTUAL, but that doesn't seem to be it. So for now we
      ;; return all of them.
      {:index         (inc index)
       :feature-name  feature-name
       :hit-points    hit-points
       :resistance    damage-mod
       :virtual?      virtual?
       :hits-required hits-required})))
