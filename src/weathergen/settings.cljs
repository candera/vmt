(ns weathergen.settings
  "Reads and writes the settings file."
  (:require [cljs.reader :as reader]
            [weathergen.filesystem :as fs]))

(defn remote-if-necessary
  [electron]
  (if (= "renderer" (.-type js/process))
    (.-remote electron)
    electron))

(def app-dir
  (-> "electron"
      js/require
      remote-if-necessary
      .-app
      (.getPath "appData")
      (fs/path-combine "craigandera.org" "VMT")))

(def settings-path (fs/path-combine app-dir "settings.edn"))

(defn load-settings
  []
  (when (fs/exists? settings-path)
    (-> settings-path fs/file-text reader/read-string)))




