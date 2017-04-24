(ns weathergen.ipc
  "A library for communicating between the various processes that make
  up the application."
  (:require [weathergen.encoding :refer [encode decode]]))

(def electron (js/require "electron"))
(def channel "weathergen-ipc")

(defmulti on-message (fn [type event & args] type))

(defn send-to-main
  "Sends a message from a renderer process to the main process."
  [type & args]
  (apply (-> electron .-ipcRenderer .-send) channel type (map encode args)))

(defn send-to-renderer
  "Sends a message from the main process to a renderer process."
  [window type & args]
  (let [wc (.-webContents window)
        send (.-send wc)]
    (.apply send wc (->> args (map encode) (into [channel type]) clj->js))))

(def ipc
  (if (= "renderer" (.-type js/process))
    (.-ipcRenderer electron)
    (.-ipcMain electron)))

(.on ipc
     channel
     (fn [event & [type & args]]
       (apply on-message type event (map decode args))))
