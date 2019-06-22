(ns weathergen.settings
  "Reads and writes the settings file."
  (:require [cljs.reader :as reader]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]
            [weathergen.filesystem :as fs])
  (:require-macros
   [weathergen.cljs.macros :refer [with-trace]]))

;; (set! *warn-on-infer* true)

(def electron ^js/electron (js/require "electron"))
(def remote ^js/remote (.-remote electron))

#_(defn remote-if-necessary
  [electron]
  (if (= "renderer" (.-type js/process))
    remote
    electron))

(defn ^js/app app
  []
  (if (= js/undefined remote)
    (.-app electron)
    (.-app remote))
  #_(if (= "renderer" (.-type js/process))
    (.-app remote)
    (.-app electron)))

(def app-dir
  (fs/path-combine
   (.getPath (app) "appData")
   "craigandera.org"
   "VMT"))

#_(def app-dir
  (->> "electron"
       js/require
       remote-if-necessary
       .-app
       (-> (.getPath "appData"))
       (-> (fs/path-combine "craigandera.org" "VMT"))))

(def settings-path
  (fs/path-combine app-dir "settings.edn"))

(defn load-settings
  []
  (when (fs/exists? settings-path)
    (-> settings-path fs/file-text reader/read-string)))

