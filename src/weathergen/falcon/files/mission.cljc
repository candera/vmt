(ns weathergen.falcon.files.mission
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [octet.core :as buf]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]
            [weathergen.falcon.constants :as c]
            [weathergen.falcon.files :refer [larray fixed-string lstring bitflags
                                             constant read-> read-trace spec-if]]
            [weathergen.falcon.files.images :as im]
            [weathergen.filesystem :as fs]
            [weathergen.lzss :as lzss]
            [weathergen.progress :as progress]
            [weathergen.util :as util]))

;;; Database accessors

;; TODO: This file probably needs to be broken up

;; TODO: Make sure this works with entities other than objectives
(defn class-table-entry
  "Given an entity, return its entry in the class table."
  [mission entity]
  (-> entity
      :entity-type
      (- c/VU_LAST_ENTITY_TYPE)
      (->> (nth (:class-table mission)))))

(defn class-info
  "Retrieves the unit class info (the most important elements of which
  are things like domain and type) for a given unit type."
  [{:keys [class-table] :as mission} type-id]
  (let [class-entry (nth class-table
                         (- type-id c/VU_LAST_ENTITY_TYPE))]
    (-> class-entry
        :vu-class-data
        :class-info)))

(defn objective-class-entry
  "Returns an objective's entry from the objectives class table."
  [mission objective]
  (->> objective
       (class-table-entry mission)
       :data-pointer
       (nth (:objective-class-data mission))))

;; This might turn out to be a cleaner way to do this if we have a
;; need to get class entries when we don't know what sort of thing
;; we're working with. So far, that doesn't seem to be the case.

;; (defn data-table
;;   "Return the appropriate data table."
;;   [database data-type]
;;   (let [k (condp = data-type
;;             c/DTYPE_UNIT :unit-class-data
;;             nil)]
;;     (if k
;;       (get database k)
;;       ;; This is a TODO
;;       (vec (repeat 10000 {})))))

;; (defn class-data
;;   "Return the class data appropriate to the type."
;;   [database type-id]
;;   (let [{:keys [class-table]} database
;;         {:keys [data-pointer data-type]} (nth class-table (- type-id c/VU_LAST_ENTITY_TYPE))]
;;     (nth (data-table database data-type) data-pointer)))


(defn unit-class-entry
  "Returns a unit's entry from the unit class table."
  [mission unit]
  (->> unit
       (class-table-entry mission)
       :data-pointer
       (nth (:unit-class-data mission))))

(defn objective-type
  "Given an objective, return its numeric type."
  [mission objective]
  (->> objective (class-table-entry mission) :vu-class-data :class-info :type))

(defn objective-type-name
  "Given an objective, returns the name of its type. E.g. 'Bridge'."
  [mission objective]
  (get-in mission [:strings :objective-type-names (objective-type mission objective)]))

(defn find-objective
  "Find an objective by the criteria given, or nil if the item can't be found."
  [mission criteria value]
  (condp = criteria
    :id (->> mission :objectives (filter #(= (:id %) value)) first)))

;; This doesn't do well with carrier airbase names. For that, we need
;; to somehow figure out how to chase our way into the vehicle info
;; and get the carrier vehicle name, which is where we get things
;; like "CVN70 Vinson". Airbase unit names for carrier are things
;; like "Carrier 7". There's a section in the BMS Manual PDF about how
;; carrier squadrons are associated with carrier airbases that might
;; be helpful.
(defn objective-name
  "Returns the name of the given objective."
  [mission objective]
  (let [{:keys [class-table
                objective-class-data
                names
                strings]} mission
        name-id (-> objective :name-id)]
    (if (not (zero? name-id))
      (names name-id)
      (if-let [parent (->> objective :parent (find-objective mission :id))]
        (str (-> parent :name-id names)
             " "
             (objective-type-name mission objective))
        (names 0)))))

(defn ordinal-suffix
  "Returns the appropriate ordinal suffix for a given number. I.e. \"st\" for 1, to give \"1st\"."
  [mission n]
  (let [strings (-> mission :strings :fn)]
    (cond
      (and (= 1 (mod n 10))
           (not= n 11))
      (strings 15)

      (and (= 2 (mod n 10))
           (not= n 12))
      (strings 16)

      (and (= 3 (mod n 10))
           (not= n 13))
      (strings 17)

      :else
      (strings 18))))

(defn- partial=
  "Returns true if the coll1 and coll2 have corresponding elements
  equal, ignoring any excess."
  [coll1 coll2]
  (every? identity (map = coll1 coll2)))

(defn get-size-name
  "Returns the size portion of a unit name"
  [mission unit]
  (let [{:keys [type-id]} unit
        {:keys [type domain]} (class-info mission type-id)
        strings (-> mission :strings :fn)]
    #_(log/debug "get-size-name" :domain domain :type type)
    (strings
     (condp partial= [domain type]
       [c/DOMAIN_AIR  c/TYPE_SQUADRON]   610
       [c/DOMAIN_AIR  c/TYPE_FLIGHT]     611
       [c/DOMAIN_AIR  c/TYPE_PACKAGE]    612
       [c/DOMAIN_LAND c/TYPE_BRIGADE]   614
       [c/DOMAIN_LAND c/TYPE_BATTALION] 615
       [c/DOMAIN_SEA]               616
       617))))

(defn unit-name
  "Returns a human-readable name for the given unit"
  [mission unit]
  (let [{:keys [name-id type-id]} unit
        {:keys [name]} (unit-class-entry mission unit)
        {:keys [domain type] :as ci} (class-info mission type-id)
        strings (-> mission :strings :fn)]
    ;; Ref: unit.cpp::GetName
    (condp = [domain type]
      [c/DOMAIN_AIR c/TYPE_FLIGHT]
      (let [{:keys [callsign-id callsign-num]} unit]
        (str (strings (+ c/FIRST_CALLSIGN_ID callsign-id))
             " "
             callsign-num))

      [c/DOMAIN_AIR c/TYPE_PACKAGE]
      (let [{:keys [camp-id]} unit]
        (str "Package " camp-id))

      (let [{:keys [name-id]} unit]
        (str name-id
             (ordinal-suffix mission name-id)
             " "
             name
             " "
             (get-size-name mission unit))))))

;;; File parsing

;; There's some weirdness in these next few entries, as it looks like
;; there might be some overlap (or even total replication) with the
;; unit descriptions below. But there's a separation in the C++ code
;; between the inheritance hierarchy and whether the classes let their
;; base classes read from the input stream. So just because one class
;; derives from another doesn't mean that instances of that class read
;; all the base class's data, too.

;; Common structures
(def vu-id (buf/spec :name buf/uint32
                     :creator buf/uint32))

(defn campaign-time->long
  "Converts a campaign time map to a long."
  [{:keys [day hour minute second millisecond] :as t}]
  (-> day
      (* 24)
      (+ hour)
      (* 60)
      (+ minute)
      (* 60)
      (+ second)
      (* 1000)
      (+ millisecond)))

(def campaign-time
  (reify
    octet.spec/ISpecSize
    (size [_]
      (buf/size buf/uint32))

    octet.spec/ISpec
    (read [_ buff pos]
      (let [[size data] (buf/read* buff buf/uint32 {:offset pos})]
        [size
         (let [d (-> data (/ 24 60 60 1000) long)
               h (-> data (mod (* 24 60 60 1000)) (/ 60 60 1000) long)
               m (-> data (mod (* 60 60 1000)) (/ 60 1000) long)
               s (-> data (mod (* 60 1000)) (/ 1000) long)
               ms (mod data 1000)]
           {:day (inc d)
            :hour h
            :minute m
            :second s
            :millisecond ms})]))

    (write [_ buff pos t]
      (buf/write! buff buf/int32 (campaign-time->long t)))))

;; Ref: f4vu.h
(def vector3
  (buf/spec :x buf/float
            :y buf/float
            :z buf/float))

;; Ref: vuentity.h
(def vu-entity-fields
  [:id                      buf/uint16
   :collision-type          buf/uint16
   :collision-radius        buf/float
   :class-info              (buf/spec :domain buf/ubyte
                                      :class  buf/ubyte
                                      :type   buf/ubyte
                                      :stype  buf/ubyte
                                      :sptype buf/ubyte
                                      :owner  buf/ubyte
                                      :field6 buf/ubyte
                                      :field7 buf/ubyte)
   :update-rate             buf/uint32
   :update-tolerance        buf/uint32
   :fine-update-range       buf/float
   :fine-update-force-range buf/float
   :fine-update-multiplier  buf/float
   :damage-speed            buf/uint32
   :hitpoints               buf/int32
   :major-revision-number   buf/uint16
   :minor-revision-number   buf/uint16
   :create-priority         buf/uint16
   :management-domain       buf/ubyte
   :transferable            buf/ubyte
   :private                 buf/ubyte
   :tangible                buf/ubyte
   :collidable              buf/ubyte
   :global                  buf/ubyte
   :persistent              buf/ubyte
   :padding                 (buf/repeat 3 buf/byte)])

;; Ref: falcent.h
(def falcon4-entity-fields
  [:vu-class-data      (apply buf/spec vu-entity-fields)
   :vis-type           (buf/repeat 7 buf/int16)
   :vehicle-data-index buf/int16
   :data-type          buf/ubyte
   ;; Only a pointer in the sense of indexing into the
   ;; appropriate class table.
   :data-pointer       buf/int32])

;; Ref: campbase.cpp
(def camp-base-fields
  [:id          vu-id
   :entity-type buf/uint16
   :x           buf/int16
   :y           buf/int16
   :z           buf/float
   :spot-time   campaign-time
   :spotted     buf/int16
   :base-flags  buf/int16
   :owner       buf/ubyte
   :camp-id     buf/int16])

(defn read-strings
  "Given a directory with a `name`.idx and `name`.wch files, return a
  function that given an index that will yield the string at that
  index."
  [dir name]
  (log/debug "read-strings" :dir dir :name name)
  (let [idx-buf (fs/file-buf (fs/path-combine dir (str name ".idx")))
        wch-buf (fs/file-buf (fs/path-combine dir (str name ".wch")))]
    (binding [octet.buffer/*byte-order* :little-endian]
      (let [n (buf/read idx-buf buf/uint16)
            indices (buf/read idx-buf
                              (buf/repeat n buf/uint16)
                              {:offset 2})
            strings (buf/read wch-buf
                              (fixed-string (nth indices (dec n))))]
        (fn [n]
          (subs strings (nth indices n) (nth indices (inc n))))))))

;; Ref campstr.cpp(129)
(defn read-strings-file
  "Reads the strings.idx/wch file from the campaign directory and
  returns a map with the strings data. Also returns, under the `:fn`
  key, a function that will read any string given its index ."
  [campaign-dir]
  (let [strings (read-strings campaign-dir "strings")
        indexed (fn [start count]
                  (->> (range start (+ start count))
                       (map strings)
                       (map-indexed vector)
                       (into (sorted-map))))]
    {:fn strings
     :objective-type-names (indexed 500 c/MAXIMUM_OBJTYPES)
     :mission-type-names (indexed 300 c/AMIS_OTHER)
     :waypoint-type-names (indexed 350 c/WP_LAST)
     :air-stype-names (indexed 540 20)
     :ground-stype-names (indexed 560 20)
     :naval-stype-names (indexed 580 20)
     :country-names (indexed 40 c/NUM_COUNS)
     :time-compression-names (indexed 75 5)
     :camera-label-names (indexed 60 c/NUM_CAMERA_LABELS)
     :unit-name-format (strings 58)}))

(def unit-class-data
  ;; Source: entity.cpp::LoadUnitData and UcdFile.cs
  (buf/spec :index buf/int32
            :num-elements (buf/repeat c/VEHICLE_GROUPS_PER_UNIT
                                      buf/int32)
            :vehicle-type  (buf/repeat c/VEHICLE_GROUPS_PER_UNIT
                                       buf/int16)
            :vehicle-class (buf/repeat c/VEHICLE_GROUPS_PER_UNIT
                                       (buf/repeat 8 buf/ubyte))
            :flags buf/uint16
            :name (fixed-string 20)
            :padding buf/int16
            :movement-type buf/int32
            :movement-speed buf/int16
            :max-range buf/int16
            :fuel buf/int32
            :rate buf/int16
            :pt-data-index buf/int16
            :scores (buf/repeat c/MAXIMUM_ROLES buf/ubyte)
            :role buf/ubyte
            :hit-chance (buf/repeat c/MOVEMENT_TYPES buf/ubyte)
            :strength (buf/repeat c/MOVEMENT_TYPES buf/ubyte)
            :range (buf/repeat c/MOVEMENT_TYPES buf/ubyte)
            :detection (buf/repeat c/MOVEMENT_TYPES buf/ubyte)
            :damage-mod (buf/repeat (inc c/OtherDam) buf/ubyte)
            :radar-vehicle buf/ubyte
            :padding2 buf/byte
            :special-index buf/int16
            :icon-index buf/uint16
            :padding3 (buf/repeat 2 buf/byte)))

;; Ref: entity.h
(def objective-class-data
  (buf/spec :index buf/int16 ; Matches the index in the class table
            :name (fixed-string 20)
            :data-rate buf/int16 ; Sorte Rate and other cool data
            :deag-distance buf/int16 ; Distance to deaggregate at.
            :pt-data-index buf/int16 ; Index into pt header data table
            :detection (buf/repeat c/MOVEMENT_TYPES buf/ubyte) ; Detection ranges
            :damage-mod (buf/repeat (inc c/OtherDam) buf/ubyte) ; How much each type will hurt me (% of strength applied)
            :icon-index buf/int16 ; Index to this objective's icon type
            :mystery buf/ubyte    ; Not sure what this is
            :features buf/ubyte ; Number of features in this objective
            :radar-feature buf/ubyte ; ID of the radar feature for this objective
            :first-feature buf/int16 ; Index of first feature entry
            ))

;; Ref: entity.h
(def vehicle-class-data
  (buf/spec     :index buf/int16      ; descriptionIndex pointing here
                :hit-points buf/int16 ; Damage this thing can take
                :flags buf/uint32     ; see VEH_ flags in vehicle.h
                :name (fixed-string 15)
                :nctr (fixed-string 5)
                :rcs-factor buf/float ; log2( 1 + RCS relative to an F16 )
                :max-wt buf/int32     ; Max loaded weight in lbs.
                :empty-wt buf/int32   ; Empty weight in lbs.
                :fuel-wt buf/int32    ; Weight of max fuel in lbs.
                :fuel-econ buf/int16  ; Fuel usage in lbs./min.
                :engine-sound buf/int16 ; SoundFX sample index of corresponding engine sound
                :high-alt buf/int16     ; in hundreds of feet
                :low-alt buf/int16      ; in hundreds of feet
                :cruise-alt buf/int16   ; in hundreds of feet
                :max-speed buf/int16   ; Maximum vehicle speed, in kph
                :radar-type buf/int16 ; Index into RadarDataTable
                :number-of-pilots buf/int16 ; # of pilots (for eject)
                :rack-flags buf/uint16 ; 0x01 means hardpoint 0 needs a rack, 0x02 -> hdpt 1, etc
                :visible-flags buf/uint16 ; 0x01 means hardpoint 0 is visible, 0x02 -> hdpt 1, etc
                :callsign-index buf/ubyte
                :callsign-slots buf/ubyte
                :hit-chance (buf/repeat c/MOVEMENT_TYPES buf/ubyte) ; // Vehicle hit chances (best hitchance bitand bonus)
                :strength (buf/repeat c/MOVEMENT_TYPES buf/ubyte) ; // Combat strengths (full strength only) (calculated)
                :range (buf/repeat c/MOVEMENT_TYPES buf/ubyte) ; // Firing ranges (full strength only) (calculated)
                :detection (buf/repeat c/MOVEMENT_TYPES buf/ubyte) ; // Electronic detection ranges
                :weapon (buf/repeat c/HARDPOINT_MAX buf/int16); // Weapon id of weapons (or weapon list)
                :weapons (buf/repeat c/HARDPOINT_MAX buf/ubyte); // Number of shots each (fully supplied)
                :damage-mod (buf/repeat (inc c/OtherDam) buf/ubyte) ; // How much each type will hurt me (% of strength applied
                :mystery (buf/repeat 3 buf/ubyte)
                ))

;; Ref: entity.h
(def feature-class-data
  (buf/spec :index buf/int16 ; descriptionIndex pointing here
            :repair-time buf/int16 ; How long it takes to repair
            :priority buf/byte    ; Display priority
            :padding1 buf/byte
            :flags buf/uint16     ; See FEAT_ flags in feature.h
            :name (fixed-string 20)    ; 'Control Tower'
            :hit-points buf/int16      ; Damage this thing can take
            :height buf/int16       ; Height of vehicle ramp, if any
            :angle buf/float            ; Angle of vehicle ramp, if any
            :radar-type buf/int16   ; Index into RadarDataTable
            :detection (buf/repeat c/MOVEMENT_TYPES buf/ubyte) ; Electronic detection ranges
            :damage-mod (buf/repeat (inc c/OtherDam) buf/ubyte) ; How much each type will hurt me (% of strength appl
            :padding2 (buf/repeat 3 buf/ubyte)))

;; Ref: entity.h
(def feature-entry-data
  (buf/spec :index buf/int16        ; Entity class index of feature
            :flags buf/uint16
            :entity-class (buf/repeat 8 buf/ubyte) ; Entity class array of feature
            :value buf/ubyte ; % loss in operational status for destruction
            :padding1 (buf/repeat 3 buf/byte)
            :offset vector3
            :facing buf/int16
            :padding2 (buf/repeat 2 buf/byte)))

(def point-header-data
  (buf/spec :obj-id buf/int16 ; ID of the objective this belongs to
            :type buf/ubyte    ; The type of pt data this contains
            :count buf/ubyte ; Number of points
            :features (buf/repeat c/MAX_FEAT_DEPEND buf/ubyte) ; Features this list
                                                               ; depends on (# in
                                                               ; objective's feature
                                        ; list)
            :padding buf/byte
            :data buf/int16             ; Other data (runway heading, for example)
            :sin-heading buf/float
            :cos-heading buf/float
            :first buf/int16            ; Index of first point
            :tex-idx buf/int16          ; texture to apply to this runway
            :runway-num buf/byte ; -1 if not a runway, indicates which runway this list
                                 ; applies to
            :ltrt buf/byte       ; put base pt to rt or left
            :next-header buf/int16 ; Index of next header, if any
            ))

(defn extension
  [file-name]
  (let [i (str/last-index-of file-name ".")]
    (subs file-name i)))

(def file-types
  {".CMP" :campaign-info
   ".OBJ" :objectives
   ".OBD" :objective-deltas
   ".UNI" :units
   ".TEA" :teams
   ".EVT" :events
   ".POL" :primary-objectives
   ".PLT" :pilots
   ".PST" :persistent-objects
   ".WTH" :weather
   ".VER" :version
   ".TE"  :victory-conditions})

(defn file-type
  [file-name]
  (get file-types
       (str/upper-case (extension file-name))
       :unknown))

(def file-type-description
  {:campaign-info      "campaign info"
   :objectives         "objectives"
   :objective-deltas   "objective deltas"
   :units              "units"
   :teams              "teams"
   :events             "events"
   :primary-objectives "primary objectives"
   :pilots             "pilots"
   :persistent-objects "persistent objects"
   :weather            "weather"
   :version            "version"
   :victory-conditions "victory conditions"})

(defmulti read-embedded-file*
  (fn [type entry buf database]
    type))

(defn read-embedded-file
  [type entry buf database]
  (log/debug "read-embedded-file"
             :type type
             :file-name (:file-name entry))
  (progress/report (str "Reading " (get file-type-description type "data")))
  (read-embedded-file* type entry buf database))

(def directory-entry
  (buf/spec :file-name (lstring buf/ubyte)
            :offset buf/uint32
            :length buf/uint32))

(defn find-install-dir
  "Given a path somewhere in the filesystem, figure out which theater
  it's in and return a map describing it."
  [path]
  (loop [dir (fs/parent path)]
    (when dir
      (if (every? #(fs/exists? (fs/path-combine dir %))
                  ["Bin" "Data" "Tools" "User"])
        dir
        (recur (fs/parent dir))))))

(defn campaign-dir
  "Return the path to the campaign directory."
  ([mission]
   (let [{:keys [installation theater]} mission]
     (campaign-dir installation theater)))
  ([installation theater]
   (fs/path-combine (:data-dir installation)
                    (:campaign-dir theater))))

(defn object-dir
  "Return the path to the objects directory."
  [installation theater]
  #_(log/debug "object-dir"
             :installation installation
             :theater theater)
  (fs/path-combine (:data-dir installation)
                   (or (:object-dir theater)
                       (:object-dir installation))))

(defn parse-theater-def-line
  "Parse a line from the theater.tdf file."
  [line]
  (if-let [idx (str/index-of line " ")]
    [(-> line (subs 0 idx) keyword)
     (-> line (subs (inc idx)))]))

(defn adjust-art-dir
  "Fix up the art directory, since KTO is special - all other theaters
  don't include the Art subdirectory in the path. Which is nonsense.
  So we add it."
  [theater]
  (cond-> theater
    (-> theater :art-dir str/lower-case (not= "art"))
    (update :art-dir fs/path-combine "Art")))

(defn read-theater-def
  "Reads the theater TDF from the given path, relative to `data-dir`."
  [data-dir path]
  (let [d (->> path
               (fs/path-combine data-dir)
               fs/file-text
               str/split-lines
               (map str/trim)
               (remove str/blank?)
               (remove #(.startsWith % "#"))
               (map parse-theater-def-line)
               (into {:path path}))]
    (-> d
        (set/rename-keys {:artdir :art-dir
                          :misctexdir :misc-tex-dir
                          :objectdir :object-dir
                          :terraindir :terrain-dir
                          :campaigndir :campaign-dir
                          :simdatadir :sim-data-dir
                          :mintact :min-tacan
                          :3ddatadir :3d-data-dir
                          :sounddir :sound-dir})
        adjust-art-dir)))

(defn read-theater-defs
  "Read, parse, and return information about the installled theaters
  from the theater list."
  [data-dir]
  (->> "Terrdata/theaterdefinition/theater.lst"
       (fs/path-combine data-dir)
       fs/file-text
       str/split-lines
       (map str/trim)
       (remove #(.startsWith % "#"))
       (remove str/blank?)
       (map #(read-theater-def data-dir %))))

(defn read-id-list-file
  "Reads an id list file consisting of pairs of names and ids. Returns
  a seq of those pairs."
  [installation path]
  (->> path
       (fs/path-combine (:data-dir installation))
       fs/file-text
       str/split-lines
       (map str/trim)
       (remove str/blank?)
       ;; The equals is because one of the files uses it, I think
       ;; mistakenly
       (map #(str/split % #"[ \t=]+"))
       (map (fn [[name id]]
              [name (or (util/str->long id)
                        (do (log/error "Error parsing image id"
                                       :name name
                                       :id id
                                       :path path)
                            nil))]))))

(defn read-id-list
  "Read in the id list file with `id`"
  [installation id]
  (let [pairs (->> (fs/path-combine (:data-dir installation)
                                    (:art-dir installation)
                                    (str id ".LST"))
                   fs/file-text
                   str/split-lines
                   (map str/trim)
                   (remove str/blank?)
                   (mapcat #(read-id-list-file installation %)))]
    {:name->id (zipmap (map first pairs) (map second pairs))
     :id->name (zipmap (map second pairs) (map first pairs))}))

(defn read-image-ids
  "Read in the image IDs in this installation. Returns a map with
  keys :id->name and :name->id mapping in each direction."
  [installation]
  (read-id-list installation "IMAGEIDS"))

(defn read-user-ids
  "Read in the user IDs in this installation. Returns a map with
  keys :id->name and :name->id mapping in each direction."
  [installation]
  (read-id-list installation "USERIDS"))

(defn load-installation
  "Return information about the installed theaters."
  [install-dir]
  (let [data-dir (fs/path-combine install-dir "Data")
        art-dir "Art"
        object-dir "Terrdata/objects"]
    {:install-dir install-dir
     :data-dir data-dir
     :art-dir art-dir
     :object-dir object-dir
     :theaters (read-theater-defs data-dir)}))

(defn find-theater
  "Given the path to a mission file, return the theater it's in."
  [installation path]
  (->> installation
       :theaters
       (filter #(fs/ancestor? (campaign-dir installation %)
                              path))
       first))

(defn theaterdef-name
  "Returns the display name of the theater as given in the theaterdef file."
  [mission]
  (get-in mission [:theater :name]))

(defn load-initial-database
  "Load the files in known locations needed to process a mission in a
  given theater."
  [installation theater]
  (->> (for [[file k spec] [["FALCON4.ct" :class-table (apply buf/spec falcon4-entity-fields)]
                            ["FALCON4.UCD" :unit-class-data unit-class-data]
                            ["FALCON4.OCD" :objective-class-data objective-class-data]
                            ["FALCON4.VCD" :vehicle-class-data vehicle-class-data]
                            ["FALCON4.FCD" :feature-class-data feature-class-data]
                            ["falcon4.fed" :feature-entry-data feature-entry-data]
                            ["FALCON4.PHD" :point-header-data point-header-data]]]
         (let [path (fs/path-combine
                     (object-dir installation theater)
                     file)
               buf  (fs/file-buf path)]
           [k
            (binding [octet.buffer/*byte-order* :little-endian]
              (map-indexed (fn [i v]
                             (assoc v ::index i))
                           (buf/read (->> file
                                          (fs/path-combine (object-dir installation theater))
                                          fs/file-buf)
                                     (larray buf/uint16 spec))))]))
       (into {})
       (merge { ;; These next couple might need to be generalized, like to a map
               ;; from the type to the ids in it.
               :image-ids            (read-image-ids installation)
               :user-ids             (read-user-ids installation)})))

(defn read-embedded-files
  "Reads and parses a .tac/.cmp file, returning a map from the
  embedded file type to its contents."
  [path database]
  (let [buf (fs/file-buf path)]
    (binding [octet.buffer/*byte-order* :little-endian]
      ;; TODO: Make this whole thing into a spec
      (let [dir-offset (buf/read buf buf/uint32)
            dir-file-count (buf/read buf buf/uint32 {:offset dir-offset})
            directory (buf/read buf (buf/repeat dir-file-count directory-entry)
                                {:offset (+ dir-offset 4)})
            files (for [entry directory
                        :let [type (-> entry :file-name file-type)]]
                    (assoc entry
                           :type type
                           :data (read-embedded-file type entry buf database)))]
        ;; Ensure that there's exactly one file per type
        (assert (->> files
                     (map :type)
                     distinct
                     count
                     (= (count files))))
        (zipmap (map :type files) (map :data files))))))

(defn merge-objective-deltas
  "Given objectives and objective deltas, merge the deltas and return
  an updated objectives list."
  [objectives deltas]
  (let [objectives-map (zipmap (map :id objectives) objectives)]
    (->> deltas
         (reduce (fn [objectives-map delta]
                    (update objectives-map (:id delta) merge delta))
                 objectives-map)
         vals
         vec)))

;; TODO: Consider renaming this read-database, and referring to the resulting object
;; as the database.
(defn read-mission
  "Given a path to a mission (.cam/.tac/.trn) file, read,
  parse, and return it."
  [installs path]
  (let [install-dir   (find-install-dir path)
        installation  (load-installation install-dir)
        theater       (find-theater installation path)
        strings       (read-strings-file (campaign-dir installation theater))
        database      (assoc (load-initial-database installation theater)
                             :strings strings)
        _             (progress/report (str "Reading mission files from" path))
        mission-files (read-embedded-files path database)
        {:keys [theater-name scenario]} (->> mission-files :campaign-info)
        names         (read-strings (campaign-dir installation theater)
                                    theater-name)
        scenario-file (str scenario (extension path))
        scenario-path (fs/path-combine (fs/parent path) scenario-file)
        _              (progress/report (str "Reading scenario file: "
                                             scenario-file))
        scenario-files (read-embedded-files scenario-path database)
        mission (merge database
                       mission-files
                       ;; TODO: Figure out if we need to merge persistent objects
                       {:objectives     (merge-objective-deltas
                                         (:objectives scenario-files)
                                         (:objective-deltas mission-files))
                        :scenario-files scenario-files
                        :path           path
                        :names          names
                        :installation   installation
                        ;; Installations are the names of the
                        ;; installations this mission might be in.
                        ;; E.g. 4.33 UI and 4.33. We have to get help
                        ;; from the user, since there's no way to tell
                        ;; a priori
                        :installs installs
                        :candidate-installs (->> installs
                                                 (filter (fn [[name dir]]
                                                           (and (fs/exists? dir)
                                                                (fs/exists? install-dir)
                                                                (fs/identical? dir install-dir))))
                                                 (mapv key))
                        :mission-name   (fs/basename path)
                        :theater        theater})]
    (-> mission
        (assoc :map-image (im/make-descriptor mission
                                              "resource/campmap"
                                              "BIG_MAP_ID")))))

(defn mission->briefing
  "Converts a mission to a 'briefing', which is a serializable version
  of the mission, containing everything needed to rehydrate the
  mission later."
  [mission install-id]
  (merge {:theaterdef-name (theaterdef-name mission)
          :extension       (-> mission :path extension)
          :install-id      install-id}
         (select-keys mission (concat (vals file-types) [:mission-name]))))

(defn briefing->mission
  "Loads a mission given a briefing (see `mission->briefing`)."
  [installs briefing]
  (let [{:keys [theaterdef-name
                install-id]} briefing
        install-dir          (get installs install-id)
        installation         (load-installation install-dir)
        theater              (->> installation
                                  :theaters
                                  (filter #(= theaterdef-name (:name %)))
                                  first)
        _                    (when-not theater
                               (throw (ex-info (str "Theater " theaterdef-name
                                                    " does not seem to be installed.")
                                               {:reason          ::theater-not-found
                                                :install-dir     install-dir
                                                :theaterdef-name theaterdef-name})))
        strings              (read-strings-file (campaign-dir installation theater))
        database             (assoc (load-initial-database installation theater)
                                    :strings strings)
        {:keys [theater-name
                scenario]}   (->> briefing :campaign-info)
        names                (read-strings (campaign-dir installation theater)
                                           theater-name)
        database             (assoc (load-initial-database installation theater)
                                    :strings strings)
        scenario-file        (str scenario (:extension briefing))
        scenario-path        (fs/path-combine (campaign-dir installation theater)
                                              scenario-file)
        _                    (progress/report (str "Reading scenario file: "
                                                   scenario-file))
        scenario-files       (read-embedded-files scenario-path database)
        mission              (merge database
                                    briefing
                                    ;; TODO: Figure out if we need to merge persistent objects
                                    {:objectives     (merge-objective-deltas
                                                      (:objectives scenario-files)
                                                      (:objective-deltas briefing))
                                     :scenario-files scenario-files
                                     :names          names
                                     :installation   installation
                                     :theater        theater})]
    (-> mission
        (assoc :map-image (im/make-descriptor mission
                                              "resource/campmap"
                                              "BIG_MAP_ID")))))


;; Campaign details file
(def team-basic-info
  (buf/spec :flag buf/ubyte
            :color buf/ubyte
            :name (fixed-string 20)
            :motto (fixed-string 200)))

(def squadron-info
  (buf/spec :x                 buf/float
            :y                 buf/float
            :id                vu-id
            :description-index buf/int16
            :name-id           buf/int16 ; The UI's id into name and patch data
            :airbase-icon      buf/int16
            :squadron-patch    buf/int16
            :specialty         buf/ubyte
            :current-strength  buf/ubyte ; # of current active aircraft
            :country           buf/ubyte
            :airbase-name      (fixed-string 40)
            :padding           buf/byte))

(def event-node
  (buf/spec :x buf/int16
            :y buf/int16
            :time campaign-time
            :flags buf/ubyte
            :team buf/ubyte
            :padding (buf/repeat 2 buf/byte)
            :event-text buf/int32 ; Pointer - no meaning in file
            :ui-event-node buf/int32 ; Pointer - no meaning in file
            :event-text (lstring buf/uint16)))

(def cmp-spec
  (buf/spec :current-time       campaign-time
            :te-start           campaign-time
            :te-time-limit      campaign-time
            :te-victory-points  buf/int32
            :te-type            buf/int32
            :te-num-teams       buf/int32
            :te-num-aircraft    (buf/repeat 8 buf/int32)
            :te-num-f16s        (buf/repeat 8 buf/int32)
            :te-team            buf/int32
            :te-team-points     (buf/repeat 8 buf/int32)
            :te-flags           buf/int32
            :team-info          (buf/repeat 8 team-basic-info)
            :last-major-event   buf/uint32
            :last-resupply      buf/uint32
            :last-repair        buf/uint32
            :last-reinforcement buf/uint32
            :time-stamp         buf/int16
            :group              buf/int16
            :ground-ratio       buf/int16
            :air-ratio          buf/int16
            :air-defense-ratio  buf/int16
            :naval-ratio        buf/int16
            :brief              buf/int16
            :theater-size-x     buf/int16
            :theater-size-y     buf/int16
            :current-day        buf/ubyte
            :active-team        buf/ubyte
            :day-zero           buf/ubyte
            :endgame-result     buf/ubyte
            :situation          buf/ubyte
            :enemy-air-exp      buf/ubyte
            :enemy-ad-exp       buf/ubyte
            :bullseye-name      buf/ubyte
            :bullseye-x         buf/int16
            :bullseye-y         buf/int16
            :theater-name       (fixed-string 40)
            :scenario           (fixed-string 40)
            :save-file          (fixed-string 40)
            :ui-name            (fixed-string 40)
            :player-squadron-id vu-id
            :recent-event-entries (larray buf/int16 event-node)
            :priority-event-entries (larray buf/int16 event-node)
            :map                (larray buf/int16 buf/ubyte)
            :last-index-num     buf/int16
            :squadron-info      (larray buf/int16 squadron-info)
            :tempo              buf/ubyte
            :creator-ip         buf/int32
            :creation-time      buf/int32
            :creation-rand      buf/int32))

(defmethod read-embedded-file* :campaign-info
  [_ {:keys [offset length] :as entry} buf _]
  (binding [octet.buffer/*byte-order* :little-endian]
    (let [header-spec (buf/spec :compressed-size buf/int32
                                :uncompressed-size buf/int32)
          {:keys [compressed-size
                  uncompressed-size]} (buf/read buf header-spec {:offset offset})
          ;; For some weird reason, the compressed size includes the field
          ;; for the uncompressed size
          adjusted-compressed-size (- compressed-size (buf/size buf/int32))
          data (lzss/expand buf
                            (+ offset (buf/size header-spec))
                            adjusted-compressed-size
                            uncompressed-size)]
      (into (sorted-map) (buf/read data cmp-spec)))))

;; Objectives file

;; Ref: objectiv.h
(def objective-link
  (buf/spec :costs (buf/repeat c/MOVEMENT_TYPES buf/ubyte) ; Cost to go here depending
                                                           ; on movement type
            :id    vu-id))

;; Ref: objectiv.cpp
;; TODO: Combine this with the objective delta stuff
(def objective-fields
  (util/concatv [:objective-type buf/uint16]
                camp-base-fields
                [:last-repair  campaign-time
                 :obj-flags    buf/uint32
                 :supply       buf/ubyte
                 :fuel         buf/ubyte
                 :losses       buf/ubyte
                 ;; This gets weird - see objectiv.cpp:251
                 :f-status     (larray buf/ubyte buf/ubyte)
                 :priority     buf/ubyte
                 :name-id      buf/int16
                 :parent       vu-id
                 :first-owner  buf/ubyte
                 :links        (larray buf/ubyte objective-link)
                 :radar-data   (spec-if :has-radar-data
                                        buf/byte
                                        ;; It was crashing in Balkans when a 17
                                        ;; would appear here, even though the
                                        ;; FreeFalcon source indicates a non-zero
                                        ;; number for the present of detection
                                        ;; ratios. It might be that BMS overloads
                                        ;; that number to mean something else, or
                                        ;; just a weirdness in the Balkans databae.
                                        #(= 1 %) #_pos?
                                        :detect-ratio
                                        (buf/repeat c/NUM_RADAR_ARCS buf/float)
                                        (constant nil))]))

(defmethod read-embedded-file* :objectives
  [_ {:keys [offset length] :as entry} buf _]
  (binding [octet.buffer/*byte-order* :little-endian]
    (let [header-spec (buf/spec :num-objectives buf/int16
                                :uncompressed-size buf/int32
                                :compressed-size buf/int32)
          {:keys [num-objectives
                  compressed-size
                  uncompressed-size]} (buf/read buf
                                                header-spec
                                                {:offset offset})
          data (lzss/expand buf
                            (+ offset (buf/size header-spec))
                            compressed-size
                            uncompressed-size)]
      #_(log/debug "read objectives"
                 :num-objectives num-objectives
                 :compressed-size compressed-size
                 :uncompressed-size uncompressed-size)
      (buf/read data
                (buf/repeat num-objectives
                            (apply buf/spec objective-fields))))))

;; Objectives delta file
(def objective-delta
  (buf/spec :id vu-id
            :last-repair campaign-time
            :owner buf/ubyte
            :supply buf/ubyte
            :fuel buf/ubyte
            :losses buf/ubyte
            :f-status (larray buf/ubyte buf/ubyte)))

(defmethod read-embedded-file* :objective-deltas
  [_ {:keys [offset length] :as entry} buf _]
  (binding [octet.buffer/*byte-order* :little-endian]
    (let [header-spec (buf/spec :compressed-size buf/int32
                                :num-deltas buf/int16
                                :uncompressed-size buf/int32)
          {:keys [num-deltas
                  compressed-size
                  uncompressed-size]} (buf/read buf
                                                header-spec
                                                {:offset offset})
          data (lzss/expand buf
                            (+ offset (buf/size header-spec))
                            compressed-size
                            uncompressed-size)]
      (buf/read data
                (buf/repeat num-deltas objective-delta)))))

;; Victory conditions
(defmethod read-embedded-file* :victory-conditions
  [_ {:keys [offset length] :as entry} buf _]
  (buf/read buf (buf/string length) {:offset offset}))

;; Team definition file

(def team-air-action
  (buf/spec :start campaign-time
            :stop campaign-time
            :objective vu-id
            :last-objective vu-id
            :type buf/ubyte
            :padding (buf/repeat 3 buf/byte)))

(def team-ground-action
  (buf/spec :time campaign-time
            :timeout campaign-time
            :objective vu-id
            :type buf/ubyte
            :tempo buf/ubyte
            :points buf/ubyte))

(def team-status
  (buf/spec :air-defence-vehicles buf/uint16
            :aircraft buf/uint16
            :ground-vehicles buf/uint16
            :ships buf/uint16
            :supply buf/uint16
            :fuel buf/uint16
            :airbases buf/uint16
            :supply-level buf/ubyte
            :fuel-level buf/ubyte))

(def atm-airbase
  (buf/spec :id vu-id
            :schedule (buf/repeat c/ATM_MAX_CYCLES buf/ubyte)))

(def tasking-manager-fields
  [:id vu-id
   :entity-type buf/uint16
   :manager-flags buf/int16
   :owner buf/ubyte])

(def mission-request
  ;; Ref AirTaskingManager.cs
  (buf/spec
   :requester      vu-id
   :target         vu-id
   :secondary      vu-id
   :pak            vu-id
   :who            buf/ubyte
   :vs             buf/ubyte
   :padding        (buf/repeat 2 buf/byte)
   :tot            buf/uint32
   :tx             buf/int16
   :ty             buf/int16
   :flags          buf/uint32
   :caps           buf/int16
   :target-num     buf/int16
   :speed          buf/int16
   :match-strength buf/int16
   :priority       buf/int16
   :tot-type       buf/ubyte
   :action-type    buf/ubyte
   :mission        buf/ubyte
   :aircraft       buf/ubyte
   :context        buf/ubyte
   :roe-check      buf/ubyte
   :delayed        buf/ubyte
   :start-block    buf/ubyte
   :final-block    buf/ubyte
   :slots          (buf/repeat 4 buf/ubyte)
   :min-to         buf/byte ; Yes, signed
   :max-to         buf/byte ; Yes, signed
   :padding        (buf/repeat 3 buf/byte)))

(def air-tasking-manager
  (apply buf/spec
         (into tasking-manager-fields
               [:flags buf/int16
                :average-ca-strength buf/int16
                :average-ca-missions buf/int16
                :sample-cycles buf/ubyte
                :airbases (larray buf/ubyte atm-airbase)
                :cycle buf/ubyte
                ;; This differs between the C# and the CPP...
                :mission-requests (larray buf/int16 mission-request)])))

(def ground-tasking-manager
  (apply buf/spec
         (into tasking-manager-fields
               [:flags buf/int16])))

(def naval-tasking-manager
  (apply buf/spec
         (into tasking-manager-fields
               [:flags buf/int16])))

(def team
  (buf/spec :id vu-id
            :entity-type buf/uint16
            :who buf/ubyte
            :c-team buf/ubyte
            :flags buf/uint16
            :members (buf/repeat 8 buf/ubyte)
            :stance (buf/repeat 8 buf/int16)
            :first-colonel buf/int16
            :first-commander buf/int16
            :first-wingman buf/int16
            :last-wingman buf/int16
            :air-experience buf/ubyte
            :air-defense-experience buf/ubyte
            :ground-experience buf/ubyte
            :naval-experience buf/ubyte
            :initiatve buf/int16
            :supply-available buf/uint16
            :fuel-available buf/uint16
            :replacements-available buf/uint16
            :player-rating buf/float
            :last-player-mission campaign-time
            :current-stats team-status
            :start-stats team-status
            :reinforcement buf/int16
            :bonus-objs (buf/repeat 20 vu-id)
            :bonus-time (buf/repeat 20 buf/uint32)
            ;; TODO: These next few should read into something with
            ;; names rather than an array
            :obj-type-priority (buf/repeat 36 buf/ubyte)
            :unit-type-priority (buf/repeat 20 buf/ubyte)
            :mission-priority (buf/repeat 41 buf/ubyte)
            :max-vehicle (buf/repeat 4 buf/ubyte)
            :team-flag buf/ubyte
            :team-color buf/ubyte
            :equipment buf/ubyte
            :name (fixed-string 20)
            :motto (fixed-string 200)
            :ground-action team-ground-action
            :defensive-air-action team-air-action
            :offensive-air-action team-air-action))

(def team-record
  (buf/spec :team team
            :air-tasking-manager air-tasking-manager
            :ground-tasking-manager ground-tasking-manager
            :naval-tasking-manager naval-tasking-manager))

(defmethod read-embedded-file* :teams
  [_ {:keys [offset length] :as entry} buf _]
  (binding [octet.buffer/*byte-order* :little-endian]
    (buf/read buf
              (larray buf/int16 team-record)
              {:offset offset})))

;; Version file
(defmethod read-embedded-file* :version
  [_ {:keys [offset length] :as entry} buf _]
  (let [version-string (buf/read buf (buf/string length) {:offset offset})]
    {:version #?(:clj (Long. version-string)
                 :cljs (-> version-string js/Number. .valueOf long))}))

;; Units file
(def waypoint
  (reify
    octet.spec/ISpec
    (read [_ buf pos]
      (read-> buf
              pos
              (constantly (buf/spec
                           :haves        (bitflags buf/ubyte
                                                   {:deptime 0x01
                                                    :target  0x02})
                           :grid-x       buf/int16
                           :grid-y       buf/int16
                           :grid-z       buf/int16
                           :arrive       campaign-time
                           :action       buf/ubyte
                           :route-action buf/ubyte
                           :formation    buf/ubyte
                           :flags        buf/uint32))
              (fn [{:keys [haves]}]
                (if (haves :target)
                  (buf/spec :target-id vu-id
                            :target-building buf/ubyte)
                  (constant {:target-id {:name    0
                                         :creator 0}
                             :target-building 255})))
              (fn [{:keys [haves arrive]}]
                (if (haves :deptime)
                  (buf/spec :depart campaign-time)
                  (constant {:depart arrive})))))

    ;; TODO: Implement write
    ))

(def unit-fields
  (into camp-base-fields
        [:last-check    campaign-time
         :roster        buf/int32
         :unit-flags    (bitflags buf/int32 {:dead        0x1
                                             :b3          0x2
                                             :assigned    0x04
                                             :ordered     0x08
                                             :no-pllaning 0x10
                                             :parent      0x20
                                             :engaged     0x40
                                             :b1          0x80
                                             :scripted    0x100
                                             :commando    0x200
                                             :moving      0x400
                                             :refused     0x800
                                             :has-ecm     0x1000
                                             :cargo       0x2000
                                             :combat      0x4000
                                             :broken      0x8000
                                             :losses      0x10000
                                             :inactive    0x20000
                                             :fragmented  0x40000
                                             ;; Ground unit specific
                                             :targeted    0x100000
                                             :retreating  0x200000
                                             :detached    0x400000
                                             :supported   0x800000
                                             :temp-dest   0x1000000
                                             ;; Air unit specific
                                             :final       0x100000
                                             :has-pilots  0x200000
                                             :diverted    0x400000
                                             :fired       0x800000
                                             :locked      0x1000000
                                             :ia-kill     0x2000000
                                             :no-abort    0x4000000})
         :destination-x buf/int16
         :destination-y buf/int16
         :target-id     vu-id
         :cargo-id      vu-id
         :moved         buf/ubyte
         :losses        buf/ubyte
         :tactic        buf/ubyte
         :current-wp    buf/uint16
         :name-id       buf/int16
         :reinforcement buf/int16
         :waypoints     (larray buf/uint16 waypoint)]))

;; Air units

(def pilot
  (buf/spec :id               buf/int16
            :skill-and-rating buf/ubyte
            :status           buf/ubyte
            :aa-kills         buf/ubyte
            :ag-kills         buf/ubyte
            :as-kills         buf/ubyte
            :an-kills         buf/ubyte
            :missions-flown   buf/int16))

(def loadout
  (buf/spec :id    (buf/repeat 16 buf/uint16) ; Widened from byte in version 73
            :count (buf/repeat 16 buf/ubyte)))

;; Ref: flight.cpp::FlightClass ctor
(def flight
  (apply buf/spec
         (into unit-fields
               [:type              (constant :flight)
                :pos-z             buf/float
                :fuel-burnt        buf/int32
                :last-move         campaign-time
                :last-combat       campaign-time
                :time-on-target    campaign-time
                :mission-over-time campaign-time
                :mission-target    buf/int16
                :loadouts          (larray buf/ubyte loadout)
                :mission           buf/ubyte
                :old-mission       buf/ubyte
                :last-direction    buf/ubyte
                :priority          buf/ubyte
                :mission-id        buf/ubyte
                :eval-flags        buf/ubyte ; Only shows up in lightning's tools - not on the PMC wiki. It's also in the freefalcon source.
                :mission-context   buf/ubyte
                :package           vu-id
                :squadron          vu-id
                :requester         vu-id
                :slots             (buf/repeat 4 buf/ubyte)
                :pilots            (buf/repeat 4 buf/ubyte)
                :plane-stats       (buf/repeat 4 buf/ubyte)
                :player-slots      (buf/repeat 4 buf/ubyte)
                :last-player-slot  buf/ubyte
                :callsign-id       buf/ubyte
                :callsign-num      buf/ubyte
                :refuel-quantity   buf/uint32 ; >= 72
                ])))

(def squadron
  (apply buf/spec
         (into unit-fields
               [:type           (constant :squadron)
                :fuel           buf/int32
                :specialty      buf/ubyte
                :stores         (buf/repeat 600 buf/ubyte)
                :pilots         (buf/repeat 48 pilot)
                :schedule       (buf/repeat 16 buf/int32)
                :airbase-id     vu-id
                :hot-spot       vu-id
                :rating         (buf/repeat 16 buf/ubyte)
                :aa-kills       buf/int16
                :ag-kills       buf/int16
                :as-kills       buf/int16
                :an-kills       buf/int16
                :missions-flown buf/int16
                :mission-score  buf/int16
                :total-losses   buf/ubyte
                :pilot-losses   buf/ubyte
                :squadron-patch buf/ubyte])))

(def package
  (let [package-common (apply buf/spec
                              (into unit-fields
                                    [:type              (constant :package)
                                     :elements          (larray buf/ubyte vu-id)
                                     :interceptor       vu-id
                                     :awacs             vu-id
                                     :jstar             vu-id
                                     :ecm               vu-id
                                     :tanker            vu-id
                                     :wait-cycles       buf/ubyte]))]
    (reify
      octet.spec/ISpec
      (read [_ buf pos]
        (read-> buf
                pos
                (constantly  package-common)
                (fn [{:keys [unit-flags wait-cycles] :as val}]
                  (if (and (zero? wait-cycles)
                           (unit-flags :final))
                    (buf/spec
                     :requests buf/int16
                     :responses buf/int16
                     :mission-request (buf/spec
                                       :mission buf/int16
                                       :context buf/int16
                                       :requester vu-id
                                       :target vu-id
                                       :tot buf/uint32
                                       :action-type buf/ubyte
                                       :priority buf/int16
                                       :package-flags (constant 0)))
                    (buf/spec
                     :flights buf/ubyte
                     :wait-for buf/int16
                     :iax buf/int16
                     :iay buf/int16
                     :eax buf/int16
                     :eay buf/int16
                     :bpx buf/int16
                     :bpy buf/int16
                     :tpx buf/int16
                     :tpy buf/int16
                     :takeoff campaign-time
                     :tp-time campaign-time
                     :package-flags buf/uint32
                     :caps buf/int16
                     :requests buf/int16
                     :responses buf/int16
                     :ingress-waypoints (larray buf/ubyte waypoint)
                     :egress-waypoints (larray buf/ubyte waypoint)
                     :mission-request mission-request))))))))

;; Land units

(def ground-unit-fields
  (into unit-fields
        [:orders   buf/ubyte
         :division buf/int16
         :aobj     vu-id]))

(def brigade
  (apply buf/spec
         (into ground-unit-fields
               [:type     (constant :brigade)
                :elements (larray buf/ubyte vu-id)])))

(def battalion
  (apply buf/spec
         (into ground-unit-fields
               [:type (constant :battalion)
                :last-move campaign-time
                :last-combat campaign-time
                :parent-id vu-id
                :last-obj vu-id
                :supply buf/ubyte
                :fatigue buf/ubyte
                :morale buf/ubyte
                :heading buf/ubyte
                :final-heading buf/ubyte
                :position buf/ubyte])))

;; Sea units

(def task-force
  (apply buf/spec
         (into unit-fields
               [:type (constant :task-force)
                :orders buf/ubyte
                :supply buf/ubyte])))

;; unit-record

(defn unit-record
  "Returns an octet spec for unit records against the given
  class table."
  [database]
  (reify
    octet.spec/ISpec
    (read [_ buf pos]
      (let [type-id (buf/read buf buf/int16 {:offset pos})]
        #_(log/debug "unit-record reading"
                   :pos pos
                   :unit-type unit-type)
        (if (zero? type-id)
          (do
            #_(log/debug "unit-record: found zero unit-type entry..")
            [2 nil])
          (let [{:keys [domain type]} (class-info
                                       database
                                       type-id)
                ;; _ (log/debug "unit-record decoding"
                ;;              :pos pos
                ;;              :domain domain
                ;;              :type type)
                spc (condp = [domain type]
                      [c/DOMAIN_AIR  c/TYPE_FLIGHT] flight
                      [c/DOMAIN_AIR  c/TYPE_PACKAGE] package
                      [c/DOMAIN_AIR  c/TYPE_SQUADRON] squadron
                      [c/DOMAIN_LAND c/TYPE_BATTALION] battalion
                      [c/DOMAIN_LAND c/TYPE_BRIGADE] brigade
                      [c/DOMAIN_SEA  c/TYPE_TASKFORCE] task-force)
                [datasize data] (try
                                  (buf/read* buf
                                             spc
                                             {:offset (+ pos 2)})
                                  (catch #?(:clj Throwable
                                            :cljs :default)
                                      x
                                      (log/error x
                                                 "unit-record read"
                                                 :domain domain
                                                 :type type
                                                 :pos pos)
                                      (throw x)))]
            #_(log/debug "unit-record decoded"
                         :data (keys data)
                         :datasize datasize)
            [(+ datasize 2) (assoc data :type-id type-id)]))))

    ;; TODO : implement write
    ))

(defn unit-lookup-by-id
  "Given a seq of units, return the one with the given id."
  [units id]
  (some (fn [unit]
          (when (= id (:id unit))
            unit))
        units))

(defmethod read-embedded-file* :units
  ;; Ref: UniFile.cs, units.cpp
  [_
   {:keys [offset length] :as entry}
   buf
   {:keys [class-table] :as database}]
  (binding [octet.buffer/*byte-order* :little-endian]
    (let [header-spec (buf/spec :compressed-size buf/int32
                                :num-units buf/int16
                                :uncompressed-size buf/int32)
          {:keys [compressed-size
                  num-units
                  uncompressed-size]} (buf/read buf
                                                header-spec
                                                {:offset offset})
          data (lzss/expand buf
                            (+ offset (buf/size header-spec))
                            (- length 6)
                            uncompressed-size)]
      ;; Oddly, there can be entries in the table where the unit type
      ;; is zero. That'll return a nil unit when read, which we throw
      ;; away.
      #_(log/debug "read-embedded-file* (:units)"
                   :num-units num-units
                   :compressed-size compressed-size
                   :uncompressed-size uncompressed-size)
      (->> (buf/read
            data
            (buf/repeat num-units (unit-record database)))
           (remove nil?)
           (mapv (fn [unit]
                   (assoc unit :name (unit-name database unit))))))))

(defmethod read-embedded-file* :default
  [_ entry buf _]
  :not-yet-implemented)

(defn flight-mission-name
  "Given a flight, returns the name of a flight mission type, e.g. BARCAP."
  [mission flight]
  (get-in mission [:strings :mission-type-names (:mission flight)]))

(defn flight-mission-category
  "Given a flight, return its mission category, e.g. ATO_DCA."
  [mission flight]
  (let [{:keys [mission]} flight]
    (condp contains? mission
      #{c/AMIS_OCASTRIKE
        c/AMIS_SWEEP
        c/AMIS_TARCAP
        c/AMIS_ESCORT}
      c/ATO_OCA

      #{c/AMIS_STRIKE
        c/AMIS_DEEPSTRIKE
        c/AMIS_STSTRIKE
        c/AMIS_STRATBOMB}
      c/ATO_STRIKE

      #{c/AMIS_INTSTRIKE
        c/AMIS_INT
        c/AMIS_SAD
        c/AMIS_BAI}
      c/ATO_INTERDICTION

      #{c/AMIS_SEADSTRIKE
        c/AMIS_SEADESCORT}
      c/ATO_SEAD

      #{c/AMIS_PRPLANCAS
        c/AMIS_CAS
        c/AMIS_ONCALLCAS
        c/AMIS_FAC}
      c/ATO_CAS

      #{c/AMIS_BARCAP
        c/AMIS_BARCAP2
        c/AMIS_HAVCAP
        c/AMIS_AMBUSHCAP
        c/AMIS_INTERCEPT
        c/AMIS_ALERT}
      c/ATO_DCA

      #{c/AMIS_AWACS
        c/AMIS_JSTAR
        c/AMIS_ECM
        c/AMIS_RECON
        c/AMIS_BDA
        c/AMIS_RECONPATROL
        c/AMIS_PATROL}
      c/ATO_CCCI

      #{c/AMIS_ASW
        c/AMIS_ASHIP}
      c/ATO_MARITIME

      #{c/AMIS_TANKER
        c/AMIS_AIRLIFT
        c/AMIS_SAR
        c/AMIS_RESCAP}
      c/ATO_SUPPORT

      c/ATO_OTHER)))

(defn team-number
  "Returns the team number given a team or team number."
  [team-or-number]
  (cond
    (nil? team-or-number)
    0

    (number? team-or-number)
    team-or-number

    :else
    (-> team-or-number :team :who)))

(defn team-name
  "Given a team, return its name, e.g. 'DPRK'."
  [mission team]
  (-> mission :teams (nth (team-number team)) :team :name))

(defn team-flag
  "Returns an image descriptor for the flag of `team`. `flag-type` can
  be one of `:big-vert-dark`, `:big-vert`, `:big-horiz`, and
  `:small-horiz`."
  [mission team flag-type]
  (let [icon-index (get-in c/FlagImageID [(team-number team) flag-type])
        image-id (get-in mission [:image-ids :id->name icon-index])]
    (im/make-descriptor mission
                        "resource/main"
                        image-id)))


;; We've got a terminology problem here. A team is both a structure
;; and a team number. Need terms that refer to them separately.
;; Probably should also ditch "side" for "alliance"

(defn side
  "Returns the side number given a team. Team indicates the individual
  combatant, side denots the alliance."
  [mission team]
  (-> mission :teams (nth (team-number team)) :team :c-team))

(defn team-priority
  "Returns a sort priority for `team` relative to `who` - allies
  first, then enemies, then neutrals."
  [mission who team]
  (let [stance (-> mission :teams (nth who) :team :stance (nth (team-number team)))]
    ({c/Allied   0
      c/Friendly 1
      c/War      2
      c/Hostile  3
      c/Neutral  4}
     stance
     5)))

(defn teams
  "Returns a seq of the teams."
  [mission]
  (let [teams-with-units      (->> mission
                                   :units
                                   (map :owner)
                                   distinct
                                   set)
        teams-with-objectives (->> mission
                                   :objectives
                                   (map :owner)
                                   distinct
                                   set)
        active-team-nums      (into teams-with-units teams-with-objectives)
        active-teams          (->> mission
                                   :teams
                                   (filter #(-> % team-number active-team-nums)))
        first-team-num        (->> active-teams first :team :who)]
    (sort-by #(team-priority mission first-team-num (-> % :team :who)) active-teams)))

(defn last-player-team
  "Returns the team with the most-recently player-played mission."
  [mission]
  (->> mission
       teams
       (sort-by #(-> % :team :last-player-mission campaign-time->long -))
       first))

(defn sides
  "Returns a seq of team numbers representing the sides."
  [mission]
  (->> mission
       teams
       (map :team)
       (map :c-team)
       distinct))

(defn teams-for-side
  "Returns a set of the team numbers for a given side."
  [mission side]
  (->> mission
       teams
       (filter #(-> % :team :c-team (= side)))
       (map team-number)
       set))

;; These are abstract, not particular RGB colors
(defn team-color
  "Returns the abstract color corresponding to `team-or-number`."
  [team]
  (nth [:white
        :green
        :blue
        :brown
        :orange
        :yellow
        :red
        :grey]
       (team-number team)))

(defn package-name
  "Given a package ID, return its string name, e.g. Package 12345."
  [mission package-id]
   (let [packages (->> mission
                      :units
                      (util/filter= :type :package))]
    (->> package-id
         (unit-lookup-by-id packages)
         :name-id
         str)))

(defn squadron-airbase
  "Returns the airbase objective for the given squadron."
  [mission squadron]
  (let [squadron-id (-> squadron :id :name)
        unit (->> mission :units (util/filter= :camp-id squadron-id) util/only)
        airbase-id (:airbase-id unit)]
    (->> mission :objectives (util/filter= :id airbase-id) util/only)))


(defn squadron-aircraft
  "Returns a map of `:airframe` and `:quantity` for a squadron."
  [mission squadron]
  {:airframe (-> squadron
                 :type-id
                 (- 100)
                 (->> (nth (:class-table mission)))
                 :data-pointer
                 (->> (nth (:unit-class-data mission)))
                 :vehicle-type
                 first
                 (->> (nth (:class-table mission)))
                 :data-pointer
                 (->> (nth (:vehicle-class-data mission)))
                 :name)
   :quantity (reduce +
                     (for [i (range 16)]
                       (-> squadron
                           :roster
                           (bit-shift-right (* i 2))
                           (bit-and 0x03))))})

;; Status algorithm at objectiv.cpp(2455)
(defn airbase-status
  "Return the status of an airbase as a number from 0 to 100."
  [mission airbase]
  ;; For each non-runway feature
  ;; - Start with 100.
  ;; - Subtract half the feature value [objective.cpp(2396)] if it's
  ;;   damaged, and the full value if it's destroyed.
  ;; - This number is the status
  ;; For each runway feature
  ;; - For each entry in the point data
  ;;   - If it is a runway point, increment the runway count. If it's
  ;;     also destroyed, increment the inactive account.
  ;; Use the lower of the status and the percentage of active runways
  (let [{:keys [class-table
                objective-class-data
                feature-class-data
                feature-entry-data
                point-header-data]} mission
        airbase-class (->> airbase
                           (class-table-entry mission)
                           :data-pointer
                           (nth objective-class-data))
        {:keys [features first-feature]} airbase-class
        feature-info (map #(nth feature-entry-data %)
                          (range first-feature (+ first-feature features)))
        feature-status (for [f (range features)]
                         (let [i (-> f (/ 4) long)
                               f* (- f (* i 4))]
                           (if (or (neg? f*)
                                   (< 255 f*)
                                   ;; For some weird
                                   ;; reason (objectiv.cpp[259], there
                                   ;; can be more features than status
                                   ;; slots in the objective, in which
                                   ;; case they zero.
                                   (<= (count (:f-status airbase)) i))
                             0
                             (-> airbase
                                 :f-status
                                 (nth i 0)
                                 (bit-shift-right (* f* 2))
                                 (bit-and 0x03)))))
        feature-class-info (map (fn [feature]
                                  (let [ci (-> feature
                                               :index
                                               (->> (nth class-table)))]
                                    (assoc ci
                                           :feature-class-info
                                           (-> ci
                                               :data-pointer
                                               (->> (nth feature-class-data))))))
                                feature-info)
        feature-info (map (fn [fi fs fci]
                            (assoc fi
                                   :status fs
                                   :class-info fci
                                   ))
                          feature-info
                          feature-status
                          feature-class-info)
        runway? (fn [feature]
                  (-> feature
                      :class-info
                      :vu-class-data
                      :class-info
                      :type
                      (= c/TYPE_RUNWAY)))
        nonrunway-statuses (->> feature-info
                                (remove runway?)
                                (reduce (fn [score feature]
                                          (+ score
                                             (condp = (:status feature)
                                               c/VIS_DAMAGED (-> feature
                                                                 :value
                                                                 (/ 2)
                                                                 long)
                                               c/VIS_DESTROYED (:value feature)
                                               0)))
                                        0)
                                (- 100)
                                (max 0))
        ;; The point header data contains information about a "logical
        ;; runway". That is, what we would think of as a runway. These
        ;; reference runway features. Status of a runway is the worst status
        ;; of any of its features. Overall status is the worse of nonrunway
        ;; and runway status.
        runway-statuses (loop [index (:pt-data-index airbase-class)
                               runway-stats {:total 0
                                             :destroyed 0}]
                          (let [point-header (nth point-header-data index)]
                            (cond
                              (zero? index)
                              runway-stats

                              :else
                              (recur (:next-header point-header)
                                     (if-not (= c/RunwayPt (:type point-header))
                                       runway-stats
                                       (-> runway-stats
                                           (update :total inc)
                                           (update :destroyed
                                                   +
                                                   (if (->> point-header
                                                            :features
                                                            (take-while #(< % 255))
                                                            (map #(nth feature-info %))
                                                            (map :status)
                                                            (some #{c/VIS_DESTROYED}))
                                                     1
                                                     0))))))))
        {:keys [total destroyed]} runway-statuses
        runway-score (if (zero? total)
                       100
                       (->> (/ destroyed total)
                            (* 100)
                            long
                            (- 100)))]
    (min runway-score nonrunway-statuses)))

(defn- objective-status
  [mission objective]
  ;; Will this work for non-airbases?
  (airbase-status mission objective))

;; Note that the below will also return carriers, which might be what
;; we want, but might not be.
;;
;; Made this private because it's confusing that it doens't return
;; squadrons etc. Should prefer the OOB functions, which do.
(defn- airbases
  "Returns all the airbase and airstrip objectives."
  [mission]
  (let [airbase-classes (->> mission
                             :class-table
                             (util/filter= #(get-in % [:vu-class-data :class-info :domain])
                                           c/DOMAIN_LAND)
                             (util/filter= #(get-in % [:vu-class-data :class-info :class])
                                           c/CLASS_OBJECTIVE)
                             (filter #(#{c/TYPE_AIRBASE c/TYPE_AIRSTRIP}
                                       (get-in % [:vu-class-data :class-info :type])))
                             ;;  Carrier airbases have subtype 7 and specific type 7.
                             (remove (fn [cls]
                                       (= [7 7]
                                          [(get-in cls [:vu-class-data :class-info :stype])
                                           (get-in cls [:vu-class-data :class-info :sptype])])))
                             (map ::index)
                             set)]
    (->> mission
         :objectives
         (filterv (fn [objective]
                    (airbase-classes (- (:entity-type objective) 100)))))))

(defn- carriers
  "Returns all the carrier task force units in the mission."
  [mission]
  (let [carrier-classes (->> mission
                             :class-table
                             (util/filter= #(get-in % [:vu-class-data :class-info :domain]
                                                    c/DOMAIN_SEA)
                                           c/DOMAIN_SEA)
                             (util/filter= #(get-in % [:vu-class-data :class-info :class])
                                           c/CLASS_UNIT)
                             (util/filter= #(get-in % [:vu-class-data :class-info :type])
                                           c/TYPE_TASKFORCE)
                             (util/filter= #(get-in % [:vu-class-data :class-info :stype])
                                           c/STYPE_UNIT_CARRIER)
                             (map ::index)
                             set)]
    (->> mission
         :units
         (filterv (fn [unit]
                    (carrier-classes (- (:entity-type unit) 100)))))))

(defn- army-bases
  "Returns all the army base objectives."
  [mission]
  ;; TODO: There's a lot of commonality here with `airbases` - factor out
  (let [armybase-classes (->> mission
                              :class-table
                              (util/filter= #(get-in % [:vu-class-data :class-info :domain])
                                            c/DOMAIN_LAND)
                              (util/filter= #(get-in % [:vu-class-data :class-info :class])
                                            c/CLASS_OBJECTIVE)
                              (util/filter= #(get-in % [:vu-class-data :class-info :type])
                                            c/TYPE_ARMYBASE)
                              (map ::index)
                              set)]
    (->> mission
         :objectives
         (filterv (fn [objective]
                    (armybase-classes (- (:entity-type objective) 100)))))))

(defn- carrier-name
  "Returns the name of a carrier task force unit."
  [mission carrier]
  (-> (class-table-entry mission carrier)
      :data-pointer
      (->> (nth (:vehicle-class-data mission)))
      :name))

(def air-icon-resource-prefix
  {:white  "wh"
   :green  "gn"
   :blue   "bl"
   :brown  "br"
   :orange "or"
   :yellow "yl"
   :red    "rd"
   :grey   "gy"})

(defn- squadron-image
  "Returns an image descriptor for a squadron."
  [mission squadron]
  (let [{:keys [owner]}      squadron
        {:keys [icon-index]} (unit-class-entry mission squadron)
        {:keys [image-ids]}  mission]
    (im/make-descriptor mission
                        (str "resource/"
                             (-> owner team-color air-icon-resource-prefix)
                             "air_nn")
                        (get-in image-ids [:id->name icon-index]))))

(defn- squadron-type
  "Returns a string describing the type of the squadron - Fighter,
  Attack, etc."
  [mission squadron]
  (->> squadron (unit-class-entry mission) :name))


(defn oob-air
  "Returns a seq of airbases."
  [mission]
  ;; TODO: Squadrons can be assigned to air bases, air strips, army
  ;; bases, or carriers. Need to deal with all of those.
  ;; The squadron's :airbase-id will point to the one of the following
  ;; things:
  ;; - The :id of the an airbase objective.
  ;; - The :id of a task force unit.
  ;; - The :id of a non-airbase objective
  (let [squadrons   (->> mission
                         :units
                         (group-by :type)
                         :squadron
                         (map (fn [squadron]
                                (assoc squadron
                                       ::aircraft (squadron-aircraft mission squadron)
                                       ::squadron-type (squadron-type mission squadron)
                                       ::image (squadron-image mission squadron))))
                         (group-by :airbase-id))
        airbases    (airbases mission)
        carriers    (carriers mission)
        army-bases  (army-bases mission)
        airbases*   (->> airbases
                         (mapv #(assoc %
                                       ::location (select-keys % [:x :y])
                                       ::status (airbase-status mission %)
                                       ::squadrons (get squadrons (:id %))
                                       ::name (objective-name mission %))))
        ;; airbase-id => unit with this ID => entity-type - 100 => class-table -> data-pointer -> vehicle-class-table -> name
        carriers*   (->> carriers
                         (mapv #(assoc %
                                       ::location (select-keys % [:x :y])
                                       ::status 100
                                       ::squadrons (get squadrons (:id %))
                                       ::name (carrier-name mission %))))
        army-bases* (->> army-bases
                         (mapv #(assoc %
                                       ::location (select-keys % [:x :y])
                                       ::status (objective-status mission %)
                                       ::squadrons (get squadrons (:id %))
                                       ::name (objective-name mission %))))]
    (vec (concat airbases* carriers* army-bases*))))

(defn order-of-battle
  "Returns the order of battle, a map from category (air,
  army, naval, objective) to entries (specific to category)."
  [mission]
  ;; TODO: Group by side, category
  ;; TODO: Add army, navy, objective
  {:air (oob-air mission)})

(defn mission-time
  "Returns the current time in the virtual world."
  [mission]
  (->> mission :campaign-info :current-time))

(defn mission-name
  "Returns the display name of the mission."
  [mission]
  (-> mission :mission-name))

;; Bunch of ideas:
;;
;; Things like having a name or being able to be turned into a string
;; should be protocols. The read functions should therefore return
;; records for something like airbases, squadarons, etc.
