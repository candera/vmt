(ns weathergen.falcon.files
  (:require [clojure.string :as str]
            [octet.core :as buf]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]
            [weathergen.falcon.constants :refer :all]
            [weathergen.filesystem :as fs]
            [weathergen.lzss :as lzss]))

;;; Cross-platform error support
(def all-errors #?(:clj Throwable
                   :cljs :default))

;;; Spec helpers

(defn lstring
  "Length prefixed string"
  [length-spec]
  (let [len-size (buf/size length-spec)]
   (reify
     #?@(:clj
         [clojure.lang.IFn
          (invoke [s] s)]
         :cljs
         [cljs.core/IFn
          (-invoke [s] s)])

     octet.spec/ISpecDynamicSize
     (size* [_ data]
       (let [data (octet.spec.string/string->bytes data)]
         (+ len-size (count data))))

     octet.spec/ISpec
     (read [_ buff pos]
       (let [datasize (buf/read buff length-spec
                                {:offset pos})
             data (octet.buffer/read-bytes buff (+ pos len-size) datasize)
             data (octet.spec.string/bytes->string data datasize)]
         [(+ datasize len-size) data]))

     (write [_ buff pos value]
       (let [input (octet.spec.string/string->bytes value)
             length (count input)]
         (buf/write! buff length-spec pos length)
         (octet.buffer/write-bytes buff (+ pos len-size) length input)
         (+ length len-size))))))

(defn- remove-trailing-nulls
  "Returns `s` trimmed of any trailing null characters."
  [s]
  (subs s 0
        (->> s
             (map int)
             (take-while (complement zero?))
             count)))

(defn fixed-string
  "Octet spec for a string of a fixed size. Removes trailing null
  characters, if any."
  [size]
  (let [spc (buf/string size)]
    (reify
      octet.spec/ISpecSize
      (size [_]
        (buf/size spc))

      octet.spec/ISpec
      (read [_ buff pos]
        (let [[size data] (buf/read* buff spc {:offset pos})]
          [size (remove-trailing-nulls data)]))

      (write [_ buff pos value]
        (buf/write! buff spc value {:offset pos})))))

(defn larray
  "Octet spec for a length prefixed array."
  [length-spec item-spec]
  (let [len-size (buf/size length-spec)]
    (reify
      #?@(:clj
          [clojure.lang.IFn
           (invoke [s] s)]
          :cljs
          [cljs.core/IFn
           (-invoke [s] s)])

      ;; octet.spec/ISpecDynamicSize
      ;; (size* [_ data]
      ;;   (let [data (octet.spec.string/string->bytes data)]
      ;;     (+ len-size (count data))))

      octet.spec/ISpec
      (read [_ buff pos]
        (let [n (buf/read buff length-spec
                          {:offset pos})
              ;; _ (log/debug "larray" :n n :pos pos)
              [datasize data] (buf/read* buff
                                         (buf/repeat n item-spec)
                                         {:offset (+ pos len-size)})]
          [(+ datasize len-size) data]))

      (write [_ buff pos value]
        ;;(log/debug "write" :pos pos :value value)
        (let [n (count value)]
          (+ (buf/write! buff n length-spec {:offset pos})
             (buf/write! buff value (buf/repeat n item-spec) {:offset (+ pos len-size)})))))))

(defn enum
  "Returns a spec that decodes from read values via the mapping in m."
  [item-spec m]
  (reify
    octet.spec/ISpecSize
    (size [_]
      (buf/size item-spec))

    octet.spec/ISpec
    (read [_ buf pos]
      (let [[datasize val] (buf/read* buf
                                      item-spec
                                      {:offset pos})]
        [datasize (m val val)]))

    ;; TODO: implement write
    ))

(defn bitflags
  "Returns a spec that decodes from a read value into a set of bits
  based on the mapping in m."
  [item-spec m]
  (reify
    octet.spec/ISpec
    (read [_ buf pos]
      (let [[datasize val] (buf/read* buf
                                      item-spec
                                      {:offset pos})]
        [datasize (->> (for [[flag mask] m]
                         (when-not (zero? (bit-and val mask))
                           flag))
                       (remove nil?)
                       set)]))))

(defn constant
  "Returns a spec that consumes and produces no data, but reads a
  constant value."
  [val]
  (reify
    octet.spec/ISpec
    (read [_ _ _]
      [0 val])

    (write [_ _ _ _])))

(defn read->
  "Read thread operator. Composes a read against multiple (potentially
  dynamically determined) specs passing the accumulated read value in
  turn through spec-fns, each a function from the accumulator to a
  spec."
  [buf offset & spec-fns]
  (loop [size 0
         data {}
         [spec-fn & more] spec-fns]
    (if-not spec-fn
      [size data]
      (let [[size* data*] (buf/read* buf
                                     (spec-fn data)
                                     {:offset (+ offset size)})]
        (recur (+ size size*)
               (merge data data*)
               more)))))

;;; Class Table - classtbl.h

(def vu-entity
  (buf/spec :id                      buf/uint16
            :collision-type          buf/uint16
            :collision-radius        buf/float
            :class-info              (buf/spec :domain buf/byte
                                               :class  buf/byte
                                               :type   buf/byte
                                               :stype  buf/byte
                                               :sptype buf/byte
                                               :owner  buf/byte
                                               :field6 buf/byte
                                               :field7 buf/byte)
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
            :management-domain       buf/byte
            :transferable            buf/byte
            :private                 buf/byte
            :tangible                buf/byte
            :collidable              buf/byte
            :global                  buf/byte
            :persistent              buf/byte
            :padding                 (buf/repeat 3 buf/byte)))

(def falcon4-entity
  (buf/spec :vu-class-data      vu-entity
            :vis-type           (buf/repeat 7 buf/int16)
            :vehicle-data-index buf/int16
            :data-type          buf/byte
            ;; Only a pointer in the sense of indexing into the
            ;; appropriate class table.
            :data-pointer       buf/int32))

(defn read-class-table
  "Given a path to a class table (.ct) file, read,
  parse, and return it."
  [path]
  (let [buf (fs/file-buf path)]
    (binding [octet.buffer/*byte-order* :little-endian]
      (buf/read buf (larray buf/int16 falcon4-entity)))))

(defn read-strings
  "Given paths to the strings.idx and strings.wch files, return
  a function, given an index that will yield the string at that index."
  [idx-path wch-path]
  (let [idx-buf (fs/file-buf idx-path)
        wch-buf (fs/file-buf wch-path)]
    (binding [octet.buffer/*byte-order* :little-endian]
      (let [n (buf/read idx-buf buf/uint16)
            indices (buf/read idx-buf
                              (buf/repeat n buf/uint16)
                              {:offset 2})
            strings (buf/read wch-buf
                              (fixed-string (nth indices (dec n))))]
        (fn [n]
          (subs strings (nth indices n) (nth indices (inc n))))))))

;;; Unit class table

(def unit-class-data
  ;; Source: entity.h
  (buf/spec :index buf/int16
            :num-elements (buf/repeat VEHICLE_GROUPS_PER_UNIT
                                      buf/int32)
            :vehicle-type  (buf/repeat VEHICLE_GROUPS_PER_UNIT
                                       buf/int16)
            :vehicle-class (buf/repeat VEHICLE_GROUPS_PER_UNIT
                                       (buf/repeat 8 buf/byte))
            :flags buf/int32
            :name (fixed-string 20)
            :movement-type buf/int32
            :movement-speed buf/int16
            :max-range buf/int16
            :fuel buf/int32
            :rate buf/int16
            :pt-data-index buf/int16
            :scores (buf/repeat MAXIMUM_ROLES buf/byte)
            :role buf/byte
            :hit-chance (buf/repeat MOVEMENT_TYPES buf/byte)
            :strength (buf/repeat MOVEMENT_TYPES buf/byte)
            :range (buf/repeat MOVEMENT_TYPES buf/byte)
            :detection (buf/repeat MOVEMENT_TYPES buf/byte)
            :damage-mod (buf/repeat (inc OtherDam) buf/byte)
            :radar-vehicle buf/byte
            :special-index buf/int16
            :padding0 (buf/repeat 2 buf/byte)
            :icon-index buf/int16
            ;; This is a sign that the structure is wrong - just needed to add this to get the alignment right
            :padding (buf/repeat 3 buf/byte)))

(defn read-unit-class-table
  "Given a path to the falcon4.ucd file, read, parse, and return it."
  [path]
  (let [buf (fs/file-buf path)]
    (binding [octet.buffer/*byte-order* :little-endian]
      (buf/read buf (larray buf/uint16 unit-class-data)))))

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

    (write [_ buff pos {:keys [day hour minute second millisecond]}]
      (buf/write! buff buf/int32 (-> day
                                     (* 24)
                                     (+ hour)
                                     (* 60)
                                     (+ minute)
                                     (* 60)
                                     (+ second)
                                     (* 1000)
                                     (+ millisecond))))))

(defn extension
  [file-name]
  (let [i (str/last-index-of file-name ".")]
    (str/upper-case (subs file-name i))))

(defn file-type
  [file-name]
  (get {".CMP" :campaign-info
        ".OBJ" :objectives-list
        ".OBD" :objectives-deltas
        ".UNI" :units
        ".TEA" :teams
        ".EVT" :events
        ".POL" :primary-objectives
        ".PLT" :pilots
        ".PST" :persistent-objects
        ".WTH" :weather
        ".VER" :version
        ".TE"  :victory-conditions}
       (extension file-name)
       :unknown))

(defmulti read-embedded-file*
  (fn [type entry buf database]
    type))

(defn read-embedded-file
  [type entry buf database]
  #_(log/debug "read-embedded-file"
             :type type
             :file-name (:file-name entry))
  (read-embedded-file* type entry buf database))

(def directory-entry
  (buf/spec :file-name (lstring buf/byte)
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
  [installation theater]
  (fs/path-combine (:data-dir installation)
                   (:campaigndir theater)))

(defn object-dir
  "Return the path to the objects directory."
  [installation theater]
  #_(log/debug "object-dir"
             :installation installation
             :theater theater)
  (fs/path-combine (:data-dir installation)
                   (:objectdir theater)))

(defn parse-theater-def-line
  "Parse a line from the theater.tdf file."
  [line]
  (if-let [idx (str/index-of line " ")]
    [(-> line (subs 0 idx) keyword)
     (-> line (subs (inc idx)))]))

(defn read-theater-def
  "Reads the theater TDF from the given path, relative to `data-dir`."
  [data-dir path]
  (->> path
       (fs/path-combine data-dir)
       fs/file-text
       str/split-lines
       (map str/trim)
       (remove str/blank?)
       (remove #(.startsWith % "#"))
       (map parse-theater-def-line)
       (into {})))

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

(defn load-installation
  "Return information about the installed theaters."
  [install-dir]
  (let [data-dir (fs/path-combine install-dir "Data")]
    {:install-dir install-dir
     :data-dir data-dir
     :theaters (read-theater-defs data-dir)}))

(defn find-theater
  "Given the path to a mission file, return the theater it's in."
  [installation path]
  (->> installation
       :theaters
       (filter #(fs/ancestor? (campaign-dir installation %)
                              path))
       first))

(defn load-database
  "Load all the files needed to process a mission in a given theater."
  [installation theater]
  {:class-table (read-class-table
                 (fs/path-combine
                  (object-dir installation theater)
                  "FALCON4.ct"))
   :unit-class-table (read-unit-class-table
                      (fs/path-combine
                       (object-dir installation theater)
                       "FALCON4.UCD"))
   :strings (read-strings (fs/path-combine
                           (campaign-dir installation theater)
                           "Strings.idx")
                          (fs/path-combine
                           (campaign-dir installation theater)
                           "Strings.wch"))})

(defn read-mission
  "Given a path to a mission (.cam/.tac/.trn) file, read,
  parse, and return it."
  [path]
  (let [install-dir  (find-install-dir path)
        installation (load-installation install-dir)
        theater      (find-theater installation path)
        database     (load-database installation theater)
        buf          (fs/file-buf path)]
    (binding [octet.buffer/*byte-order* :little-endian]
      ;; TODO: Make this whole thing into a spec
      (let [dir-offset (buf/read buf buf/uint32)
            dir-file-count (buf/read buf buf/uint32 {:offset dir-offset})
            directory (buf/read buf (buf/repeat dir-file-count directory-entry)
                                {:offset (+ dir-offset 4)})
            files (for [entry directory
                        :let [type (-> entry
                                       :file-name
                                       file-type)]]
                    (assoc entry
                           :type type
                           :data (read-embedded-file type entry buf database)))]
        ;; Making the assumption here that there's exactly one file
        ;; per type
        (assert (->> files
                     (map :type)
                     distinct
                     count
                     (= (count files))))
        {:files (zipmap (map :type files) files)
         :database database
         :installation installation
         :theater theater}))))

;; Common structures
(def vu-id (buf/spec :name buf/uint32
                     :creator buf/uint32))

;; Campaign details file
(def team-basic-info
  (buf/spec :flag buf/byte
            :color buf/byte
            :name (fixed-string 20)
            :motto (fixed-string 200)))

(def squad-info
  (buf/spec :x                 buf/float
            :y                 buf/float
            :id                vu-id
            :description-index buf/int16
            :name-id           buf/int16
            :airbase-icon      buf/int16
            :squadron-path     buf/int16
            :specialty         buf/byte
            :current-strength  buf/byte
            :country           buf/byte
            :airbase-name      (fixed-string 40)
            :padding           buf/byte))

(def event-node
  (buf/spec :x buf/int16
            :y buf/int16
            :time campaign-time
            :flags buf/byte
            :team buf/byte
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
            :current-day        buf/byte
            :active-team        buf/byte
            :day-zero           buf/byte
            :endgame-result     buf/byte
            :situation          buf/byte
            :enemy-air-exp      buf/byte
            :enemy-ad-exp       buf/byte
            :bullseye-name      buf/byte
            :bullseye-x         buf/int16
            :bullseye-y         buf/int16
            :theater-name       (fixed-string 40)
            :scenario           (fixed-string 40)
            :save-file          (fixed-string 40)
            :ui-name            (fixed-string 40)
            :player-squadron-id vu-id
            :recent-event-entries (larray buf/int16 event-node)
            :priority-event-entries (larray buf/int16 event-node)
            :map                (larray buf/int16 buf/byte)
            :last-index-num     buf/int16
            :squad-info         (larray buf/int16 squad-info)
            :tempo              buf/byte
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
(defmethod read-embedded-file* :objectives-list
  [_ {:keys [offset length] :as entry} buf _]
  :todo
  #_(binding [octet.buffer/*byte-order* :little-endian]
    (let [num-objectives (buf/read buf buf/int16 {:offset offset})
          uncompressed-size (buf/read buf buf/int32 {:offset (+ offset 2)})
          compressed-size (buf/read buf/int32 {:offset (+ offset 6)})
          data (lzss/expand buf (+ offset 10) compressed-size uncompressed-size)]
      {:compressed-size compressed-size
       :uncompressed-size uncompressed-size
       :data (->> data .array (into []) (take 10))})))

;; Objectives delta file
(def objective-deltas
  (buf/spec :id vu-id
            :last-repair buf/uint32
            :owner buf/byte
            :supply buf/byte
            :fuel buf/byte
            :losses buf/byte
            :f-status (larray buf/byte buf/byte)))

(defmethod read-embedded-file* :objectives-deltas
  [_ {:keys [offset length] :as entry} buf _]
  :todo
  #_(binding [octet.buffer/*byte-order* :little-endian]
    (let [header-spec (buf/spec :compressed-size buf/int32
                                :num-deltas buf/int16
                                :uncompressed-size buf/int32)
          {:keys [num-deltas
                  compressed-size
                  uncompressed-size]} (buf/read buf
                                                header-spec
                                                {:offset offset})
          _ (log/debug :num-deltas num-deltas
                       :compressed-size compressed-size
                       :uncompressed-size uncompressed-size)
          data (lzss/expand buf
                            (+ offset (buf/size header-spec))
                            compressed-size
                            uncompressed-size)]
      {:compressed-size compressed-size
       :uncompressed-size uncompressed-size
       :data (->> data .array (into []) (map #(format "0x%02x" %)) (take 20))
       #_:todo #_(buf/read data
                       (buf/repeat num-deltas
                                   objective-delta))})))

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
            :action-type buf/byte
            :padding (buf/repeat 3 buf/byte)))

(def team-ground-action
  (buf/spec :time campaign-time
            :timeout campaign-time
            :objective vu-id
            :type buf/byte
            :tempo buf/byte
            :points buf/byte))

(def team-status
  (buf/spec :air-defence-vehicles buf/uint16
            :aircraft buf/uint16
            :ground-vehicles buf/uint16
            :ships buf/uint16
            :supply buf/uint16
            :fuel buf/uint16
            :airbases buf/uint16
            :supply-level buf/byte
            :fuel-level buf/byte))

(def mission-request
  (buf/spec :requester      vu-id
            :target         vu-id
            :secondary      vu-id
            :pak            vu-id
            :who            buf/byte
            :vs             buf/byte
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
            :tot-type       buf/byte
            :action-type    buf/byte
            :mission        buf/byte
            :aircraft       buf/byte
            :context        buf/byte
            :roe-check      buf/byte
            :delayed        buf/byte
            :start-block    buf/byte
            :final-block    buf/byte
            :slots          (buf/repeat 4 buf/byte)
            :min-to         buf/byte
            :max-to         buf/byte
            :more-padding   (buf/repeat 3 buf/byte)))

(def atm-airbase
  (buf/spec :id vu-id
            :schedule (buf/repeat 32 buf/byte)))

(def tasking-manager-fields
  [:id vu-id
   :entity-type buf/uint16
   :manager-flags buf/int16
   :owner buf/byte
   :flags buf/int16])

(def air-tasking-manager
  (apply buf/spec
         (into tasking-manager-fields
               [:average-ca-strength buf/int16
                :average-ca-missions buf/int16
                :sample-cycles buf/byte
                :airbases (larray buf/byte atm-airbase)
                :cycle buf/byte
                :mission-requests (larray buf/int16 mission-request)])))

(def ground-tasking-manager
  (apply buf/spec tasking-manager-fields))

(def naval-tasking-manager
  (apply buf/spec tasking-manager-fields))

(def team
  (buf/spec :id vu-id
            :entity-type buf/uint16
            :who buf/byte
            :c-team buf/byte
            :flags buf/uint16
            :members (buf/repeat 8 buf/byte)
            :stance (buf/repeat 8 buf/int16)
            :first-colonel buf/int16
            :first-commander buf/int16
            :first-wingman buf/int16
            :last-wingman buf/int16
            :air-experience buf/byte
            :air-defense-experience buf/byte
            :ground-experience buf/byte
            :naval-experience buf/byte
            :initiatve buf/int16
            :supply-available buf/uint16
            :fuel-available buf/uint16
            :replacements-available buf/uint16
            :player-rating buf/float
            :last-player-mission buf/uint32
            :current-stats team-status
            :start-stats team-status
            :reinforcement buf/int16
            :bonus-objs (buf/repeat 20 vu-id)
            :bonus-time (buf/repeat 20 buf/uint32)
            ;; TODO: These next few should read into something with
            ;; names rather than an array
            :obj-type-priority (buf/repeat 36 buf/byte)
            :unit-type-priority (buf/repeat 20 buf/byte)
            :mission-priority (buf/repeat 41 buf/byte)
            :max-vehicle (buf/repeat 4 buf/byte)
            :team-flag buf/byte
            :team-color buf/byte
            :equipment buf/byte
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
(def base-fields
  [:id         vu-id
   :type-id    buf/int16
   :x          buf/int16
   :y          buf/int16
   :z          buf/float
   :spot-time  campaign-time
   :spotted    buf/int16
   :base-flags buf/int16
   :owner      buf/byte
   :camp-id    buf/int16])

(def waypoint
  (reify
    octet.spec/ISpec
    (read [_ buf pos]
      (read-> buf
              pos
              (constantly (buf/spec
                           :haves        (bitflags buf/byte
                                                   {:deptime 0x01
                                                    :target  0x02})
                           :grid-x       buf/int16
                           :grid-y       buf/int16
                           :grid-z       buf/int16
                           :arrive       campaign-time
                           :action       buf/byte
                           :route-action buf/byte
                           :formation    buf/byte
                           :flags        buf/uint32))
              (fn [{:keys [haves]}]
                (if (haves :target)
                  (buf/spec :target-id vu-id
                            :target-building buf/byte)
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
  (into base-fields
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
         :moved         buf/byte
         :losses        buf/byte
         :tactic        buf/byte
         :current-wp    buf/uint16
         :name-id       buf/int16
         :reinforcement buf/int16
         :waypoints     (larray buf/uint16 waypoint)]))

;; Air units

(def pilot
  (buf/spec :id               buf/int16
            :skill-and-rating buf/byte
            :status           buf/byte
            :aa-kills         buf/byte
            :ag-kills         buf/byte
            :as-kills         buf/byte
            :an-kills         buf/byte
            :missions-flown   buf/int16))

(def loadout
  (buf/spec :id    (buf/repeat 16 buf/uint16) ; Widened from byte in version 73
            :count (buf/repeat 16 buf/byte)))

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
                :loadouts          (larray buf/byte loadout)
                :mission           buf/byte
                :old-mission       buf/byte
                :last-direction    buf/byte
                :priority          buf/byte
                :mission-id        buf/byte
                :eval-flags        buf/byte ; Only shows up in lightning's tools - not on the PMC wiki. It's also in the freefalcon source.
                :mission-context   buf/byte
                :package           vu-id
                :squadron          vu-id
                :requester         vu-id
                :slots             (buf/repeat 4 buf/byte)
                :pilots            (buf/repeat 4 buf/byte)
                :plane-stats       (buf/repeat 4 buf/byte)
                :player-slots      (buf/repeat 4 buf/byte)
                :last-player-slot  buf/byte
                :callsign-id       buf/byte
                :callsign-num      buf/byte
                :refuel-quantity   buf/uint32 ; >= 72
                ])))

(def squadron
  (apply buf/spec
         (into unit-fields
               [:type           (constant :squadron)
                :fuel           buf/int32
                :specialty      buf/byte
                :stores         (buf/repeat 600 buf/byte)
                :pilots         (buf/repeat 48 pilot)
                :schedule       (buf/repeat 16 buf/int32)
                :airbase-id     vu-id
                :hot-spot       vu-id
                :rating         (buf/repeat 16 buf/byte)
                :aa-kills       buf/int16
                :ag-kills       buf/int16
                :as-kills       buf/int16
                :an-kills       buf/int16
                :missions-flown buf/int16
                :mission-score  buf/int16
                :total-losses   buf/byte
                :pilot-losses   buf/byte
                :squadron-patch buf/byte])))

(def package
  (let [package-common (apply buf/spec
                              (into unit-fields
                                    [:type              (constant :package)
                                     :elements          (larray buf/byte vu-id)
                                     :interceptor       vu-id
                                     :awacs             vu-id
                                     :jstar             vu-id
                                     :ecm               vu-id
                                     :tanker            vu-id
                                     :wait-cycles       buf/byte]))]
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
                                       :action-type buf/byte
                                       :priority buf/int16
                                       :package-flags (constant 0)))
                    (buf/spec
                     :flights buf/byte
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
                     :package-flags buf/int32
                     :caps buf/int16
                     :requests buf/int16
                     :responses buf/int16
                     :ingress-waypoints (larray buf/byte waypoint)
                     :egress-waypoints (larray buf/byte waypoint)
                     :mission-request (buf/spec
                                       :requester vu-id
                                       :target vu-id
                                       :secondary vu-id
                                       :pak vu-id
                                       :who buf/byte
                                       :vs buf/byte
                                       :padding (buf/repeat 2 buf/byte)
                                       :tot buf/uint32
                                       :tx buf/uint32
                                       :ty buf/uint32
                                       :flags buf/uint32
                                       :caps buf/int16
                                       :target-num buf/int16
                                       :speed buf/int16
                                       :match-strength buf/int16
                                       :priority buf/int16
                                       :tot-type buf/byte
                                       :action-type buf/byte
                                       :mission buf/byte
                                       :aircraft buf/byte
                                       :context buf/byte
                                       :roe-check buf/byte
                                       :delayed buf/byte
                                       :start-block buf/byte
                                       :final-block buf/byte
                                       :slots (buf/repeat 4 buf/byte)
                                       :min-to buf/byte ; Hmm. Should be signed byte?
                                       :max-to buf/byte ; Hmm. Should be signed byte?
                                       )
                     :padding (buf/repeat 3 buf/byte)))))))))

;; Land units

(def ground-unit-fields
  (into unit-fields
        [:orders   buf/byte
         :division buf/int16
         :aobj     vu-id]))

(def brigade
  (apply buf/spec
         (into ground-unit-fields
               [:type     (constant :brigade)
                :elements (larray buf/byte vu-id)])))

(def battalion
  (apply buf/spec
         (into ground-unit-fields
               [:type (constant :battalion)
                :last-move campaign-time
                :last-combat campaign-time
                :parent-id vu-id
                :last-obj vu-id
                :supply buf/byte
                :fatigue buf/byte
                :morale buf/byte
                :heading buf/byte
                :final-heading buf/byte
                :position buf/byte])))

;; Sea units

(def task-force
  (apply buf/spec
         (into unit-fields
               [:orders buf/byte
                :supply buf/byte])))

;; unit-record

(defn class-info
  "Retrieves the unit class info (the most important elements of which
  are things like domain and type) for a given unit type."
  [{:keys [class-table] :as database} type-id]
  (let [class-entry (nth class-table
                         (- type-id VU_LAST_ENTITY_TYPE))]
    (-> class-entry
        :vu-class-data
        :class-info)))

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
                      [DOMAIN_AIR  TYPE_FLIGHT] flight
                      [DOMAIN_AIR  TYPE_PACKAGE] package
                      [DOMAIN_AIR  TYPE_SQUADRON] squadron
                      [DOMAIN_LAND TYPE_BATTALION] battalion
                      [DOMAIN_LAND TYPE_BRIGADE] brigade
                      [DOMAIN_SEA  TYPE_TASKFORCE] task-force)
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
            [(+ datasize 2) data]))))

    ;; TODO : implement write
    ))

(defn ordinal-suffix
  "Returns the appropriate ordinal suffix for a given number. I.e. \"st\" for 1, to give \"1st\"."
  [n {:keys [strings] :as database}]
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
    (strings 18)))

(defn partial=
  "Returns true if the coll1 and coll2 have corresponding elements
  equal, ignoring any excess."
  [coll1 coll2]
  (every? identity (map = coll1 coll2)))

(defn get-size-name
  "Returns the size portion of a unit name"
  [unit database]
  (let [{:keys [type-id]} unit
        {:keys [type domain]} (class-info database type-id)
        {:keys [strings]} database]
    #_(log/debug "get-size-name" :domain domain :type type)
    (strings
     (condp partial= [domain type]
       [DOMAIN_AIR TYPE_SQUADRON]   610
       [DOMAIN_AIR TYPE_FLIGHT]     611
       [DOMAIN_AIR TYPE_PACKAGE]    612
       [DOMAIN_LAND TYPE_BRIGADE]   614
       [DOMAIN_LAND TYPE_BATTALION] 615
       [DOMAIN_SEA]               616
       617))))

(defn unit-name
  "Returns a human-readable name for the given unit"
  [unit {:keys [strings class-table unit-class-table] :as database}]
  (let [{:keys [name-id type-id]} unit
        ;; TODO; Refactor this into something more general, and that
        ;; takes the various data tables into account. Also, rename
        ;; unit-class-table to unit-data-table to be more consistent
        ;; with the F4 source.
        class-table-entry (nth class-table (- type-id 100))
        {:keys [data-pointer]} class-table-entry
        {:keys [domain type] :as ci} (class-info database type-id)]
    (log/debug "unit-name"
               :type type
               :data-pointer data-pointer
               :domain domain
               :type type
               :class-table (class class-table))
    ;; Ref: unit.cpp::GetName
    (condp = [domain type]
      [DOMAIN_LAND TYPE_BATTALION]
      (let [{:keys [name-id]} unit]
        (format "%d%s %s %s"
                name-id
                (ordinal-suffix name-id
                                database)
                (-> unit-class-table (nth data-pointer) :name)
                (get-size-name unit database)))
      "TODO")))

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
           (map (fn [unit]
                  (assoc unit :name (unit-name unit database))))))))

(defmethod read-embedded-file* :default
  [_ entry buf _]
  :not-yet-implemented)

