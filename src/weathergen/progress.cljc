(ns weathergen.progress
  "A library for communicating progress between the various processes
  that make up the application.")

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
    (-start-step *reporter* step-name parent)))

(defn step-succeeded
  "Reports that step has succeeded. If no step is provided, uses
  `*current-step*`."
  ([] (step-succeeded *current-step*))
  ([step] (when step (-succeeded step))))

(defn step-warn
  "Reports a warning against `step`, or `*current-step*` if one is not
  provided."
  ([message] (step-warn *current-step* message))
  ([step message] (when step (-warn step message))))

(defn step-failed
  "Reports that `step` has failed. Uses `*current-step*` if one is not
  provided."
  ([message] (step-failed *current-step* message))
  ([step message] (when step (-failed step message))))

(defn with-step
  "Binds `*current-step*` to a new step calls `f`, a function of no
  arguments."
  [step-name f]
  (let [step (start-step step-name *current-step*)]
    (try
      (binding [*current-step* step]
        (let [val (f)]
          (step-succeeded step)
          val))
      (catch #?(:clj Throwable :cljs :default) x
        (step-failed #?(:clj (.getStackTrace x)
                        :cljs (.-stack x)))
        (throw x)))))
