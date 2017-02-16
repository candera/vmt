(ns app.main
  #_(:require [cljs.repl]
            [cljs.repl.node]))

#_(cljs.repl/repl (cljs.repl.node/repl-env))

(def electron      (js/require "electron"))
(def app           (.-app electron))
(def path          (js/require "path"))
(def BrowserWindow (.-BrowserWindow electron))

(goog-define dev? false)

(defn load-page
  "When compiling with `:none` the compiled JS that calls .loadURL is
  in a different place than it would be when compiling with optimizations
  that produce a single artifact (`:whitespace, :simple, :advanced`).

  Because of this we need to dispatch the loading based on the used
  optimizations, for this we defined `dev?` above that we can override
  at compile time using the `:clojure-defines` compiler option."
  [window]
  (.loadURL window (str "file://"
                        (.join path (.getAppPath app) "index.html")))
  #_(if dev?
    (.loadURL window (str "file://" js/__dirname "/../../index.html"))
    (.loadURL window (str "file://" js/__dirname "/index.html"))))

(def main-window (atom nil))

(defn mk-window [w h frame? show?]
  (BrowserWindow. #js {:width w :height h :frame frame? :show show?}))

(defn init-browser []
  (reset! main-window (mk-window 1300 800 true true))
  (-> @main-window
      .-webContents
      (.on "new-window"
           (fn [e url]
             (-> "electron"
                 js/require
                 .-shell
                 (.openExternal url))
             (.preventDefault e))))
  (load-page @main-window)
  ;; Shows how to make a child window that's always on top of the main window:
  #_(BrowserWindow. #js {:width 300 :height 200
                       :backgroundColor "yellow"
                       :title "detail"
                       :show true :parent @main-window})
  (when dev?
    ;; TODO: Anything we want to do differently?
    )
  (.on @main-window "closed" #(reset! main-window nil)))

(defn init []
  (.on app "window-all-closed" #(when-not (= js/process.platform "darwin") (.quit app)))
  (.on app "ready" init-browser)
  (set! *main-cli-fn* (fn [] nil)))
