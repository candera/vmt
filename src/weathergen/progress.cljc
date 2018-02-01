(ns weathergen.progress
  "A library for communicating progress between the various processes
  that make up the application."
  (:require [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]))

(def ^:dynamic *reporter* nil)

(def ^:dynamic *current-step* nil)

(defprotocol Reporter
  (-start-step [this step-name parent]
    "Begins a new logical step in the reported sequence, a child of
    `parent` if non-nil. Returns a `Step` instance."))

(defprotocol Step
  (-succeeded [this]
    "Reports that the step has succeeded. Implicitly closes the step.")
  (-warn [this message]
    "Reports that something nonfatal but of concern has happened.")
  (-failed [this message]
    "Reports that the step has failed. Implicitly closes the step.")
  (-id [this]
    "Returns this step's id, if any."))

(defn ^:deprecated report
  "Reports progress via `*reporter*`, if bound."
  [message]
  (when *reporter*
    (*reporter* message)))

(defn start-step
  "Reports that `step-name` has started. Returns a `Step` instance."
  [step-name parent]
  (when *reporter*
    (log/info "Starting " step-name)
    (-start-step *reporter* step-name parent)))

(defn step-succeeded
  "Reports that step has succeeded. If no step is provided, uses
  `*current-step*`."
  ([] (step-succeeded *current-step*))
  ([step]
   (when step
     (log/info "Step Succeeded")
     (-succeeded step))))

(defn step-warn
  "Reports a warning against `step`, or `*current-step*` if one is not
  provided."
  ([message] (step-warn *current-step* message))
  ([step message]
   (when step
     (log/warn "Step warning" message)
     (-warn step message))))

(defn step-failed
  "Reports that `step` has failed. Uses `*current-step*` if one is not
  provided."
  ([message] (step-failed *current-step* message))
  ([step message]
   (when step
     (log/error "Step error" message)
     (-failed step message))))

(defn with-step
  "Binds `*current-step*` to a new step calls `f`, a function of no
  arguments."
  [step-name f]
  (let [step (start-step step-name *current-step*)]
    (binding [*current-step* step]
      (try
        (let [val (f)]
          (step-succeeded)
          val)
        (catch #?(:clj Throwable :cljs :default) x
          #?(:cljs (.error js/console "Caught error"
                           "propagated?" (-> x ex-data :type (= ::propagated-error))
                           ":x" x
                           ":data" (ex-data x)))
          (step-failed (let [{:keys [type omit-stack-trace?]} (ex-data x)]
                         (cond
                           (= type ::propagated-error) nil
                           omit-stack-trace? #?(:clj (.getMessage x)
                                                :cljs (.-message x))
                           :else #?(:clj (.getStackTrace x)
                                    :cljs (.-stack x)))))
          ;; Cascade the fact that the step failed, but not the error
          ;; message
          (throw (ex-info "Propagated error" {:type ::propagated-error} x)))))))
