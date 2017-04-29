(ns weathergen.falcon.install
  (:require [weathergen.settings :as settings]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]))

(def win32? (-> "os" js/require .platform (= "win32")))

(def installations (atom nil))

(defn- reg-read-installations
  [cb]
  (let [Registry (js/require "winreg")
        win64?   (= "x64" (.-arch js/process))
        base-key "\\SOFTWARE\\Benchmark Sims\\"
        key      (Registry. #js {:hive (.-HKLM Registry)
                                 :key  base-key
                                 :arch (when win64? "x86")})]
    ;; OMG how do people program like this?
    (.keys key
           (fn [err subkeys]
             (if err
               (cb {})
               (let [n         (.-length subkeys)
                     remaining (atom n)
                     values    (atom nil)]
                 (doseq [subkey subkeys]
                   (.get subkey "baseDir"
                         (fn [err item]
                           (swap! remaining dec)
                           (if err
                             (log/error "Could not read from registry key " (.-path subkey))
                             (swap! values
                                    assoc
                                    (subs (.-key subkey)
                                          (count base-key))
                                    (.-value item)))
                           (when (zero? @remaining)
                             (cb @values)))))))))))

(defn locate-installations
  "Invokes cb with a map from installation names to their installation directories."
  [cb]
  (let [cached  @installations
        ;; Not happy about the cell deref here. Seems like I'm mixing
        ;; callbacks and cells and it's going to be a mess.
        override (:installations (settings/load-settings))]
    (cond
      cached
      (cb cached)

      override
      (do
        (reset! installations override)
        (cb override))

      win32?
      (reg-read-installations (fn [val]
                                (reset! installations val)
                                (cb val)))

      :else
      (cb nil))))

