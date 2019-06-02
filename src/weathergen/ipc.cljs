(ns weathergen.ipc
  "A library for communicating between the various processes that make
  up the application."
  (:require [weathergen.encoding :refer [encode decode]])
  (:require-macros [weathergen.cljs.macros :refer [hint-> hint]]))

;; (set! *warn-on-infer* true)

(def ^js/electron electron (js/require "electron"))
(def channel "weathergen-ipc")

(defmulti on-message (fn [type event & args] type))

(defn send-to-main
  "Sends a message from a renderer process to the main process."
  [type & args]
  (apply (-> electron .-ipcRenderer (hint-> js/EventEmitter) .-send) channel type (map encode args)))

(defn send-to-renderer
  "Sends a message from the main process to a renderer process."
  [^js/BrowserWindow window type & args]
  (let [^js/EventEmitter wc (.-webContents window)
        send (.-send wc)]
    (.apply send wc (->> args (map encode) (into [channel type]) clj->js))))

(def ipc
  (if (= js/undefined (.-ipcMain electron))
    (.-ipcRenderer electron)
    (.-ipcMain electron))
  #_(if (= "renderer" (.-type js/process))
      (.-ipcRenderer electron)
      (.-ipcMain electron)))

(.on ipc
     channel
     (fn [event & [type & args]]
       (apply on-message type event (map decode args))))
