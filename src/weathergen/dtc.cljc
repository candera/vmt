(ns weathergen.dtc
  "A library for parsing BMS DTC (ini) files."
  (:require [clojure.string :as str]
            [clojure.spec :as s]
            [taoensso.timbre :as log
             #?@(:cljs [:refer-macros
                        (log trace debug info warn error fatal report
                             logf tracef debugf infof warnf errorf fatalf
                             reportf spy get-env log-env)])]))

(defn number
  [^String s]
  #?(:clj (Double. s)
     :cljs (-> s js/Number. .valueOf)))

(defn integer
  [^String s]
  #?(:clj (Long. s)
     :cljs (long s)))

;; TODO: Add more mappings. See https://github.com/FreeFalcon/freefalcon-central/blob/c28d807183ab447ef6a801068aa3769527d55deb/src/campaign/include/campwp.h#L19
(def stpt-action
  {-1 :none
   0 :nav
   1 :takeoff
   2 :push
   3 :split
   4 :refuel
   5 :rearm
   6 :pickup
   7 :land
   8 :holding-point
   9 :cas-contact
   10 :escort
   11 :sweep
   12 :cap
   13 :intercept
   14 :strike
   15 :strike
   16 :strike
   17 :strike
   18 :bomb
   19 :sead
   20 :elint
   21 :recon
   22 :rescue
   23 :asw
   24 :tanker
   25 :airdrop
   26 :jam})

(s/def ::x number?
  ;; East-west position in Falcon feet.
)

(s/def ::y number?
  ;; North-south position in Falcon feet.
)

(s/def ::z number?
  ;; Altitude in Falcon feet.
)

(s/def ::coordinates
  (s/keys :req [::x ::y ::z]))

(s/def ::ordinal (s/and integer? (complement neg?))
  ;; Steerpoint ordinal - identifies what slot in the DTC navigation
  ;; points this item occupies.
)

(s/def ::action
  (s/nilable (s/or :keyword (-> stpt-action vals set)
                   :string string?))
  ;; Steerpoint action.
)

(s/def ::comment string?
  ;; Steerpoint comment.
)

(s/def ::alternate? boolean?
  ;; Identifies a steerpoint as an alternate landing site
)

(def target (s/keys :req [::coordinates ::ordinal]
                    :opt [::comment ::action ::alternate?])
  ;; A target line from the DTC
)
(s/def ::targets (s/* target))

(def line (s/keys :req [::coordinates ::ordinal])
  ;; A lineSTPT line from the DTC
  )
(s/def ::lines (s/* line))

(def ppt (s/keys :req [::coordinates ::ordinal ::radius]
                 :opt [::threat])
  ;; A PPT line from the DTC
)
(s/def ::ppts (s/* ppt))


(def weapon-target (s/keys :req [::coordinates ::ordinal]
                           :opt [::comment])
  ;; A wpntarget line from the DTC
)
(s/def ::weapon-targets (s/* weapon-target))

(s/def ::steerpoints
  (s/keys :req [::targets
                ;; ::ppts
                ::lines
                ;; ::weapon-targets
                ]))

(s/def ::category #{::targets})

(def dtc (s/keys :req [::steerpoints]))

(s/fdef parse-stpt-line
        :args (s/cat :line string?)
        :ret (s/keys :req [::category]))

;; Only parsing targets and lines for now. Other categories later
(defn parse-stpt-line
  [line]
  (let [[id v] (str/split line #"=")
        [category num-str] (str/split id #"_")]
    (case category
      "target"
      (let [[x-str y-str z-str action-str comment] (map str/trim (str/split v #","))
            action (some-> action-str number long)]
        {::category ::targets
         ::coordinates {::x (number x-str)
                        ::y (number y-str)
                        ::z (number z-str)}
         ::ordinal (integer num-str)
         ::action (stpt-action action action)
         ::comment comment})

      "lineSTPT"
      (let [[x-str y-str z-str] (map str/trim (str/split v #","))]
        {::category ::lines
         ::coordinates {::x (number x-str)
                       ::y (number y-str)
                       ::z (number z-str)}
         ::ordinal (integer num-str)})

      nil)))

(s/fdef parse
        :args (s/cat :contents string?)
        :ret dtc)

(defn parse
  "Given the contents of an ini file, parse it into its relevant
  sections."
  ;; Currently supporting only the steerpoint section
  ;; TODO: Add more
  [contents]
  {::steerpoints
   (->> contents
        str/split-lines
        (map str/trim)
        (remove empty?)
        (drop-while #(not= % "[STPT]"))
        (drop 1)
        (take-while #(not (str/starts-with? % "[")))
        (map parse-stpt-line)
        (remove nil?)
        (group-by ::category))})

(s/fdef flight-path
        :args (s/cat :dtc dtc)
        :ret (s/* target))

(defn flight-path
  [dtc]
  (let [land?     (fn [navpoint] (= :land (::action navpoint)))
        targets   (-> dtc ::steerpoints ::targets)
        navpoints (take-while #(not= (::action %) :none) targets)]
    (loop [[point & more] navpoints
           path []
           landed? false]
      (if-not point
        path
        (let [is-land? (land? point)]
          (recur more
                 (conj path (if (and landed? is-land?)
                              (assoc point ::alternate? true)
                              point))
                 (or landed? is-land?)))))))

(s/fdef lines
        :args (s/cat :dtc dtc)
        :ret (s/coll-of (s/coll-of line :min-count 1 :max-count 5)
                        :min-count 0 :max-count 4))

(defn lines
  "Returns a description of the steerpoint lines (e.g. tanker area) in
  the DTC."
  [dtc]
  (->> dtc
       ::steerpoints
       ::lines
       (remove (fn [{:keys [::coordinates]}]
                 (let [{:keys [::x ::y ::z]} coordinates]
                   (and (zero? x) (zero? y) (zero? z)))))
       (group-by #(-> % ::ordinal (/ 5) long inc))
       (sort-by first)
       (map second)))
