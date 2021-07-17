(ns app.main
  (:require [weathergen.ipc :as ipc]
            [weathergen.falcon.install :as install]))

(def electron      (js/require "electron"))
(def app           (.-app electron))
(def path          (js/require "path"))
(def BrowserWindow (.-BrowserWindow electron))
(def ipcMain       (.-ipcMain electron))

(goog-define dev? false)

(defn load-page
  "When compiling with `:none` the compiled JS that calls .loadURL is
  in a different place than it would be when compiling with optimizations
  that produce a single artifact (`:whitespace, :simple, :advanced`).

  Because of this we need to dispatch the loading based on the used
  optimizations, for this we defined `dev?` above that we can override
  at compile time using the `:clojure-defines` compiler option."
  [window page]
  (.loadURL window (str "file://"
                        (.join path (.getAppPath app) page)))
  #_(if dev?
    (.loadURL window (str "file://" js/__dirname "/../../index.html"))
    (.loadURL window (str "file://" js/__dirname "/index.html"))))

(def app-window (atom nil))

(def mission-windows (atom {}))

(def installations (atom {}))

(defn mk-window [w h frame? show?]
  (doto (BrowserWindow. #js {:width w
                             :height h
                             :frame frame?
                             :show show?
                             :icon "images/440th-logo-500.png"
                             :center true
                             :webPreferences #js {:nodeIntegration true
                                                  :enableRemoteModule true
                                                  :contextIsolation false}})
    (.setMenuBarVisibility false)))

(defn open
  "Kicks off a renderer opening the thing at `path`. `mode` tells us
  whether it's a `:briefing` or a `:mission`."
  [path mode]
  (let [mission-window (mk-window 1300 800 true false)]
    (swap! mission-windows assoc (-> mission-window .-webContents .-id) mission-window)
    (load-page mission-window "mission.html")
    (-> mission-window
        .-webContents
        (.on "did-finish-load"
             (fn []
               (when (-> js/process.env (aget "VMT_DEV_OPEN_WINDOW_EARLY") some?)
                 (.show mission-window))
               (ipc/send-to-renderer mission-window
                                     (mode {:briefing "open-briefing"
                                            :mission  "open-mission"})
                                     @installations
                                     path))))
    (-> mission-window
        .-webContents
        (.on "new-window"
             (fn [e url]
               (-> "electron"
                   js/require
                   .-shell
                   (.openExternal url))
               (.preventDefault e))))
    (.on mission-window "closed" #(swap! mission-windows dissoc path))))

(defmethod ipc/on-message "open-mission"
  [_ event path]
  (open path :mission))

(defmethod ipc/on-message "open-briefing"
  [_ event path]
  (open path :briefing))

(defmethod ipc/on-message "load-complete"
  [_ event]
  (->> event .-sender .-id (get @mission-windows) .show)
  (ipc/send-to-renderer @app-window "load-complete"))

(defmethod ipc/on-message :default
  [msg-name event msg]
  (ipc/send-to-renderer @app-window msg-name msg))

(defn init-browser []
  (reset! app-window (mk-window 800 600 true false))
  (when (-> js/process.env (aget "VMT_DEV_SHOW_TEST_WINDOW") some?)
    (let [test-window (mk-window 1300 800 true false)]
      (load-page test-window "test.html")
        (-> test-window .-webContents (.on "did-finish-load" (fn [] (.show test-window))))))
  (load-page @app-window "index.html")
  (-> @app-window .-webContents (.on "did-finish-load" (fn [] (.show @app-window))))
  ;; Shows how to make a child window that's always on top of the app window:
  #_(BrowserWindow. #js {:width 300 :height 200
                       :backgroundColor "yellow"
                       :title "detail"
                       :show true :parent @app-window})
  (when dev?
    ;; TODO: Anything we want to do differently?
    )
  (.on @app-window "closed" #(reset! app-window nil)))

;; TODO: Maybe show splash screen
(defn init []
  (.on app "window-all-closed" #(when-not (= js/process.platform "darwin") (.quit app)))
  (.on app "ready" #(install/locate-installations
                     (fn [installs]
                       (reset! installations installs)
                       (init-browser))))
  (set! *main-cli-fn* (fn [] nil)))
