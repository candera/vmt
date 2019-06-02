(ns weathergen.falcon.files.mission.xml
  "A library for working with the new (as of 4.34) XML database files."
  (:require #?@(:clj [[clojure.data.xml :as xml]]
                :cljs [[tubax.core :as xml]])
            ;; [clojure.data.xml :as xml]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]
            [weathergen.falcon.constants :as c]
            [weathergen.util :as util]))

(defn- field
  [coerce path]
  {:path     path
   :coersion coerce})

(def default
  {:int   0
   :float 0.0})

(def move-types ["NoMove"
                 "Foot"
                 "Wheeled"
                 "Tracked"
                 "LowAir"
                 "Air"
                 "Naval"
                 "Rail"])

(def damage-types ["None"
                   "Penetration"
                   "HighExplosive"
                   "Heave"
                   "Incendairy"
                   "Proximity"
                   "Kinetic"
                   "Hydrostatic"
                   "Chemical"
                   "Nuclear"
                   "Other"])

;; Map from either string or vector to field definition. If from a
;; string, just maps straight. If a vector of the form
;; `["Prefix" :index]` then input element will be scanned for elements
;; called "Prefix_0`, "Prefix_1", etc., which do not have to be
;; consecutive, and this will produce an output array with the
;; corresponding elements.
;;
;; If a vector of the form `["Prefix" ["Suffix1", "Suffix2"]]` then
;; the output will be mapped to an array with all the concatenations
;; of prefix and suffix.

(def mappings
  {:class-table
   {:form   :vector
    :root   "CTRecords"
    :item   "CT"
    :index  "Num"
    :fields {"Id"                   (field :int   [:vu-class-data :id])
             "CollisionType"        (field :int   [:vu-class-data :collision-type])
             "CollisionRadius"      (field :float [:vu-class-data :collision-radius])
             "Domain"               (field :int   [:vu-class-data :class-info :domain])
             "Class"                (field :int   [:vu-class-data :class-info :class])
             "Type"                 (field :int   [:vu-class-data :class-info :type])
             "SubType"              (field :int   [:vu-class-data :class-info :stype])
             "Specific"             (field :int   [:vu-class-data :class-info :sptype])
             "Owner"                (field :int   [:vu-class-data :class-info :owner])
             "Class_6"              (field :int   [:vu-class-data :class-info :field6])
             "Class_7"              (field :int   [:vu-class-data :class-info :field7])
             "UpdateRate"           (field :int   [:vu-class-data :update-rate])
             "UpdateTolerance"      (field :int   [:vu-class-data :update-tolerance])
             "FineUpdateRange"      (field :float [:vu-class-data :fine-update-range])
             "FineUpdateForceRange" (field :float [:vu-class-data :fine-update-force-range])
             "FineUpdateMultiplier" (field :float [:vu-class-data :fine-update-multiplier])
             "DamageSeed"           (field :int   [:vu-class-data :damage-speed])
             "HitPoints"            (field :int   [:vu-class-data :hitpoints])
             "MajorRev"             (field :int   [:vu-class-data :major-revision-number])
             "MinRev"               (field :int   [:vu-class-data :minor-revision-number])
             "CreatePriority"       (field :int   [:vu-class-data :create-priority])
             "ManagementDomain"     (field :int   [:vu-class-data :management-domain])
             "Transferable"         (field :int   [:vu-class-data :transferable])
             "Private"              (field :int   [:vu-class-data :private])
             "Tangible"             (field :int   [:vu-class-data :tangible])
             "Collidable"           (field :int   [:vu-class-data :collidable])
             "Global"               (field :int   [:vu-class-data :global])
             "Persistent"           (field :int   [:vu-class-data :persistent])
             ["Graphics"
              ["Normal"
               "Repaired"
               "Damaged"
               "Destroyed"
               "LeftDestroyed"
               "RightDestroyed"
               "BothDestroyed"]]    (field :int   [:vis-type])
             "MoverDefinitionData"  (field :int   [:vehicle-data-index]) ; ?
             "EntityType"           (field :int   [:data-type])   ; ?
             "EntityIdx"            (field :int   [:data-pointer] ; ?
                                           )}}
   :unit-class-data
   {:form   :vector
    :root   "UCDRecords"
    :item   "UCD"
    :index  "Num"
    :fields {
             "CtIdx"                     (field :int [:index])
             ["ElementCount"
              c/VEHICLE_GROUPS_PER_UNIT] (field :int [:num-elements])
             ;; TODO: Is this vehicle type or vehicle class?
             ["VehicleCtIdx"
              c/VEHICLE_GROUPS_PER_UNIT] (field :int [:vehicle-type])
             "Flags"                     (field :int [:flags])
             "Name"                      (field :string [:name])
             "MoveType"                  (field :int [:movement-type])
             "MoveSpeed"                 (field :int [:movement-speed])
             "MaxRange"                  (field :int [:max-range])
             "Fuel"                      (field :int [:fuel])
             "FuelRate"                  (field :int [:rate])
             "PtDataIdx"                 (field :int [:pt-data-index])
             ["RoleScore"
              c/MAXIMUM_ROLES]           (field :int [:scores])
             "MainRole"                  (field :int [:role])
             ["Hit_" move-types]         (field :int [:hit-chance])
             ["Str_" move-types]         (field :int [:strength])
             ["Rng_" move-types]         (field :int [:range])
             ["Det_" move-types]         (field :int [:detection])
             ["Dam_" damage-types]       (field :int [:damage-mod])
             "RadarVehicle"              (field :int [:radar-vehicle])
             "SquadronStoresIdx"         (field :int [:special-index])
             "UnitIcon"                  (field :int [:icon-index])
             ;; New fields - I think these are for naval units
             "Description"               (field :string [:description])
             ;; Guessing at the quantities for the below
             ["ElementDecalIdx_"
              c/VEHICLE_GROUPS_PER_UNIT] (field :int [:element-decal-index])
             ["ElementFlags"
              c/VEHICLE_GROUPS_PER_UNIT] (field :int [:element-flags])
             ["ElementHullNumber"
              c/VEHICLE_GROUPS_PER_UNIT] (field :int [:element-hull-number])
             ["ElementNamePrefix"
              c/VEHICLE_GROUPS_PER_UNIT] (field :string [:element-name-prefix])
             ["ElementName"
              c/VEHICLE_GROUPS_PER_UNIT] (field :string [:element-name])
             ["ElementTextSetIdx"
              c/VEHICLE_GROUPS_PER_UNIT] (field :int [:element-text-set-index])}}

   :objective-class-data
   {:form   :vector
    :root   "OCDRecords"
    :item   "OCD"
    :index  "Num"
    :fields {"CtIdx"               (field :int [:index])
             "Name"                (field :string [:name])
             "DataRate"            (field :int [:data-rate])
             "DeaggDistance"       (field :int [:deag-distance])
             "PtDataIdx"           (field :int [:pt-data-index])
             ["Det_" move-types]   (field :int [:detection])
             ["Dam_" damage-types] (field :int [:damage-mod])
             "ObjectiveIcon"       (field :int [:icon-index])
             "FeatureCount"        (field :int [:features])
             "RadarFeature"        (field :int [:radar-feature])
             "FirstFeature"        (field :int [:first-feature])}}

   :vehicle-class-data
   {:form   :vector
    :root   "VCDRecords"
    :item   "VCD"
    :index  "Num"
    :fields {"CtIdx"                        (field :int [:index])
             "HitPoints"                    (field :int [:hit-points])
             "Flags"                        (field :int [:flags])
             "Name"                         (field :string [:name])
             "NCTR"                         (field :string [:nctr])
             "RadarCs"                      (field :float [:rcs-factor])
             "MaxWeight"                    (field :int [:max-wt])
             "EmptyWeight"                  (field :int [:empty-wt])
             "FuelWeight"                   (field :int [:fuel-wt])
             "FuelRate"                     (field :int [:fuel-econ])
             "EngineSound"                  (field :int [:engine-sound])
             "MaxAlt"                       (field :int [:high-alt])
             "MinAlt"                       (field :int [:low-alt])
             "CruiseAlt"                    (field :int [:cruise-alt])
             "MaxSpeed"                     (field :int [:max-speed])
             "RadarIdx"                     (field :int [:radar-type])
             "NumberOfCrew"                 (field :int [:number-of-pilots])
             "RackFlags"                    (field :int [:rack-flags])
             "VisibleFlags"                 (field :int [:visible-flags])
             "CallsignIdx"                  (field :int [:callsign-index])
             "CallsignSlots"                (field :int [:callsign-slots])
             ["Hit_" move-types]            (field :int [:hit-chance])
             ["Str_" move-types]            (field :int [:strength])
             ["Rng_" move-types]            (field :int [:range])
             ["Det_" move-types]            (field :int [:detection])
             ["Dam_" damage-types]          (field :int [:damage-mod])
             ["WpnOrHpIdx" c/HARDPOINT_MAX] (field :int [:weapon])
             ["WpnCount" c/HARDPOINT_MAX]   (field :int [:weapons])}}

   :weapon-class-data
   {:form    :vector
    :root    "WCDRecords"
    :item    "WCD"
    :index   "Num"
    :missing {[:simweap-index] -1}
    :fields  {"CtIdx"             (field :int [:index])
              "Strength"          (field :int [:strength])
              "DamageType"        (field :int [:damage-type])
              "Range"             (field :int [:range])
              "Flags"             (field :int [:flags])
              "Name"              (field :string [:name])
              ["Hit_" move-types] (field :int [:hit-chance])
              "FireRate"          (field :int [:fire-rate])
              "Rariety"           (field :int [:rariety])
              "Guidance"          (field :int [:guidance-flags])
              "Collective"        (field :int [:collective])
              "Weight"            (field :int [:weight])
              "Drag"              (field :int [:drag-index])
              "BlastRadius"       (field :int [:blast-radius])
              "RadarIdx"          (field :int [:radar-type])
              "SimWeaponDataIdx"  (field :int [:sim-data-idx])
              "MaxAlt"            (field :int [:max-alt])
              ;; Missing: :simweap-idx
              ;; These don't appear in the 4.33 data, so I'm not sure
              ;; what to do with them yet.
              ;; "Rackgroup"          (field :int [])
              ;; "MinAlt"             (field :int [])
              ;; "BulletTTL"          (field :int [])
              ;; "BulletVelocity"     (field :int [])
              ;; "BulletDispersion"   (field :int [])
              ;; "BulletRoundsPerSec" (field :int [])
              }}

   :feature-class-data
   {:form   :vector
    :root   "FCDRecords"
    :item   "FCD"
    :index  "Num"
    :fields {"CtIdx"               (field :int [:index])
             "RepairTime"          (field :int [:repair-time])
             "DisplayPriority"     (field :int [:priority])
             "Flags"               (field [:bitmap {:repairable?         c/FEAT_EREPAIR
                                                    :virtual?            c/FEAT_VIRTUAL
                                                    :has-light-switch?   c/FEAT_HAS_LIGHT_SWITCH
                                                    :has-smoke-stack?    c/FEAT_HAS_SMOKE_STACK
                                                    :flat-container?     c/FEAT_FLAT_CONTAINER
                                                    :elevated-container? c/FEAT_ELEV_CONTAINER
                                                    :can-explode?        c/FEAT_CAN_EXPLODE
                                                    :can-burn?           c/FEAT_CAN_BURN
                                                    :can-collapse?       c/FEAT_CAN_COLAPSE
                                                    :container-top?      c/FEAT_CONTAINER_TOP
                                                    :next-is-top?        c/FEAT_NEXT_IS_TOP
                                                    :no-hiteval?         c/FEAT_NO_HITEVAL}]
                                          [:flags])
             "Name"                (field :string [:name])
             "HitPoints"           (field :int [:hit-points])
             "RampHeight"          (field :int [:height])
             "RampAngle"           (field :float [:angle])
             "RadarIdx"            (field :int [:radar-type])
             ["Det_" move-types]   (field :int [:detection])
             ["Dam_" damage-types] (field :int [:damage-mod])}}

   :feature-entry-data
   {:form    :vector
    :root    "FEDRecords"
    :item    "FED"
    :index   "Num"
    :missing {[:entity-class] [0 0 0 0 0 0 0 0]}
    :fields  {"FeatureCtIdx" (field :int [:index])
              "Flags"        (field :int [:flags])
              "Value"        (field :int [:value])
              "OffsetX"      (field :float [:offset :x])
              "OffsetY"      (field :float [:offset :y])
              "OffsetZ"      (field :float [:offset :z])
              "Heading"      (field :int [:facing])}}

   :point-header-data
   {:form    :vector
    :root    "FEDRecords"
    :item    "FED"
    :index   "Num"
    :missing {[:sin-heading] 0
              [:cos-heading] 0}
    :fields  {"ObjIdx"                   (field :int [:obj-id])
              "Type"                     (field :int [:type])
              "FeaturesDependencieCount" (field :int [:count])
              ["FeaturesDependencieIdx"
               c/MAX_FEAT_DEPEND]        (field :int [:features])
              "Data"                     (field :int [:data])
              "FirstPtIdx"               (field :int [:first])
              "RunwayTexture"            (field :int [:tex-idx])
              "RunwayNumber"             (field :int [:runway-num])
              "LandingPattern"           (field :int [:ltrt])
              "NextHeaderIdx"            (field :int [:next-header])}}

   :sim-weapon-data
   {:form    :vector
    :root    "SWDRecords"
    :item    "SWD"
    :index   "Num"
    :missing {}
    :fields  {"Flags"     (field :int [:flags])
              "Drag"      (field :float [:drag-coefficient])
              "Weight"    (field :float [:weight])
              "Area"      (field :float [:surface-area])
              ;; Consider making these a tuple
              "EjectX"    (field :float [:ejection-velocity :x])
              "EjectY"    (field :float [:ejection-velocity :y])
              "EjectZ"    (field :float [:ejection-velocity :z])
              "WpnName"   (field :string [:sms-mnemonic])
              "WpnClass"  (field :int [:sms-weapon-class])
              "Domain"    (field :int [:sms-weapon-domain])
              "WpnType"   (field :int [:sms-weapon-type])
              "WpnDatIdx" (field :int [:data-index])}}})


(defn- coerce
  [coersion val]
  (cond
    (= :int coersion)
    (util/str->long val)

    (= :float coersion)
    (util/str->float val)

    (and (vector? coersion)
         (= (first coersion) :bitmap))
    (let [[_ m] coersion
          val*  (util/str->long val)]
      (->> (for [[flag mask] m]
             (when (util/has-flag? val* mask)
               flag))
           (remove nil?)
           (into #{val*})))

    :else
    val))

(defn- parse-vector-field
  [from coersion item]
  (let [[head tail] from]
    (cond
      (number? tail)
      (mapv (fn [index]
              (coerce coersion (get item (str head "_" index) (default coersion))))
            (range tail))

      :else
      (mapv #(coerce coersion (get item (str head %))) tail))))

(defn- parse-field
  [from coersion item]
  #_(log/debug "parse-field" from coersion (get item from))
  (cond
    (string? from)
    (or (coerce coersion (get item from))
        (default coersion))

    (vector? from)
    (parse-vector-field from coersion item)))

(defn- element?
  [node]
  #?(:clj (map? node) #_(xml/element? node)
     :cljs (map? node)))

(defn- attrs
  [node]
  #?(:clj (:attrs node)
     :cljs (:attributes node)))

(defn- parse-elem
  [mapping elem]
  #_(log/debug "parse-elem" mapping elem)
  (let [{fields  :fields
         missing :missing} mapping
        content-map        (->> elem
                                :content
                                (filter element?)
                                (reduce (fn [m subelem]
                                          (assoc m
                                                 (name (:tag subelem))
                                                 (reduce str (:content subelem))))
                                        {}))]
    #_(log/debug "parse-elem content-map" content-map)
    (reduce-kv assoc-in
               (-> (reduce-kv (fn [m from to]
                                (let [{:keys [coersion path]} to]
                                  (assoc-in m path
                                            (parse-field from coersion content-map))))
                              {}
                              fields)
                   (assoc :weathergen.falcon.files.mission/index
                          (-> elem attrs :Num util/str->long)))
               missing)))

(def parse-str #?(:clj xml/parse-str
                  :cljs xml/xml->clj))

#_(def parse-str xml/parse-str)

(defn parse
  "Parses `xml` as an XML file of `type`."
  [xml type]
  #_(log/debug "parsing xml for" type)
  (let [data (parse-str xml)
        mapping (get mappings type)]
    (->> data
         :content
         (filter element?)
         (mapv #(parse-elem mapping %)))))
