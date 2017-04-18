(ns weathergen.progress
  "A library for communicating progress between the various processes
  that make up the application.")

(def ^:dynamic *reporter* nil)

(defn report
  "Reports progress via `*reporter*`, if bound."
  [message]
  (when *reporter*
    (*reporter* message)))

