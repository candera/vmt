(ns weathergen.falcon.install
  (:require [weathergen.settings :as settings]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]))

(def win32? (-> "os" js/require .platform (= "win32")))

#_(def install-dir (atom nil))

#_(defn- locate-install-dir-windows
  [version cb]
 (let [Registry (js/require "winreg")
       key64 (Registry. {:hive (.-HKLM Registry)}
                        :key (str "SOFTWARE\\Wow6432Node\\Benchmark Sims\\" version))
       key32 (Registry. {:hive (.-HKLM Registry)
                         :key (str "SOFTWARE\\Benchmark Sims\\" version)})]
   (.get key64 "baseDir"
         (fn [err result]
           (if-not err
             (cb (.-value result))
             (.get key32 "baseDir"
                   (fn [err result]
                     (if err
                       (do
                         (log/error "Could not read install dir from registry.")
                         (cb nil))
                       (cb (.-value result))))))))))

#_(defn locate-install-dir
  "Uses the Windows registry to locate the BMS install directory for
  the given version. Calls `cb` with the path when located, or `nil`
  if it could not be found."
  [version cb]
  (cond
    @install-dir
    (cb @install-dir)

    win32?
    (locate-install-dir-windows version cb)

    :else
    (let [dir (get-in (settings/load-settings) [:install-dir version])]
      (reset! install-dir dir)
      (cb dir))))

(def installations (atom nil))

(defn- reg-read-installations
  [cb]
  (let [Registry (js/require "winreg")
        win64?   (= "x64" (.-arch js/process))
        key      (Registry. {:hive (.-HKLM Registry)
                             :key  "SOFTWARE\\Benchmark Sims\\"
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
                             (swap! values assoc (.-key subkey) (.-value item)))
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

#_(if win32?
  (do
    (defc install-dir nil)
    (locate-install-dir install-dir "4.33 U1"))
  (defc= install-dir ))
