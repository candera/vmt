(ns weathergen.falcon.files.mission
  (:require [clojure.pprint]
            [clojure.spec.alpha :as s]
            [clojure.set :as set]
            [clojure.string :as str]
            [octet.core :as buf]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]
            [weathergen.coordinates :as coords]
            [weathergen.falcon.constants :as c]
            [weathergen.falcon.files :refer [larray fixed-string lstring bitflags
                                             constant read-> read-trace spec-if]]
            [weathergen.falcon.files.images :as im]
            [weathergen.filesystem :as fs]
            [weathergen.lzss :as lzss]
            [weathergen.math :as math]
            [weathergen.progress :as progress]
            [weathergen.time :as time]
            [weathergen.util :as util :refer [format-list has-flag?]]))

;;; Specs

(def Todo (constantly false))
(def NonNegativeInt (s/and integer? #(<= 0 %)))
(def Path string?)
(def Dir string?)
(def NotImplemented #{:not-yet-implemented})

(def VuId
  (s/keys :req-un [:int/name ::creator]))

(def Vector3 (s/keys :req-un [::x ::y ::z]))

(def CampaignTime
  (s/keys :req-un [::day ::hour ::minute ::second ::millisecond]))

;; TODO: Maybe put into images.cljc
(def ImageDescriptor
  (s/keys :req-un [::art-dir
                   ::base
                   ::idx-modified
                   ::idx-size
                   ::image-data
                   ::image-id
                   ::resource
                   ::rsc-modified
                   ::rsc-size]))

(def ImageData
  (s/keys :req-un [::type
                   ::im/id
                   ::flags
                   ::center
                   ::size
                   ::image-offset
                   ::palette-size
                   ::palette-offset]))

(def CampaignBaseFields
  (s/keys :req-un [::base-flags
                   ::camp-id
                   ::entity-type
                   ::id
                   ::owner
                   ::spot-time
                   ::spotted
                   ::x
                   ::y
                   ::z]))

(def Objective
  (s/merge CampaignBaseFields
           (s/keys :req-un [::f-status
                            ::first-owner
                            ::fuel
                            ::last-repair
                            ::links
                            ::losses
                            ::name-id
                            ::obj-flags
                            ::parent
                            ::priority
                            ::radar-data
                            ::supply])))

(def Airbase
  (s/merge Objective
           (s/keys :req [::squadrons])))

(def Haves
  (s/coll-of (s/or :integer integer? :keyword keyword?)
             :kind set?))

(def InstallName string?)
(def Installs (s/map-of InstallName Path))

(def ObjectiveLink
  (s/keys :req-un [::costs
                   :map/id]))

(def StringsData
  (s/keys :req-un [::objective-type-names
                   ::mission-type-names
                   ::waypoint-type-names
                   ::air-stype-names
                   ::ground-stype-names
                   ::naval-stype-names
                   ::country-names
                   ::time-compression-names
                   ::camera-label-names
                   ::unit-name-format]))

;; TODO: Required/optional not correct
(def Theater (s/keys :req-un [::path
                              ::bitmap
                              ::desc
                              ::name
                              ::art-dir
                              ::campaign-dir]
                     :opt-un [::sim-data-dir
                              ::terrain-dir
                              ::misc-text-dir
                              ::sound-dir
                              ::mintacan
                              ::doubleres2dmap
                              ::magneticdeclination
                              ::3d-data-dir
                              ::object-dir]))

(def Installation
  (s/keys :req-un [::install-dir
                   ::data-dir
                   ::object-dir
                   ::art-dir
                   ::theaters]))

(def ClassInfo
  (s/keys :req-un [::domain
                   ::class
                   ::type
                   ::stype
                   ::sptype
                   ::owner]))

;; I'm not really sure where this version of "class info" comes from,
;; just that it's different than the other one.
(def ClassInfo2
  (s/keys :req-un [::data-pointer
                   ::data-type
                   ::vehicle-data-index
                   ::vis-type
                   ::vu-class-data]
          :req [::index
                ::feature-class-info]))

(def VuEntityFields
  (s/keys :req-un [:int/id
                   ::collision-type
                   ::collision-radius
                   ::class-info
                   ::update-rate
                   ::update-tolerance
                   ::fine-update-range
                   ::fine-update-force-range
                   ::fine-update-multiplier
                   ::damage-speed
                   ::hitpoints
                   ::major-revision-number
                   ::minor-revision-number
                   ::create-priority
                   ::management-domain
                   ::transferable
                   ::private
                   ::tangible
                   ::collidable
                   ::global
                   ::persistent]))

(def Falcon4EntityFields
  (s/keys :req-un [::vu-class-data
                   ::vis-type
                   ::vehicle-data-index
                   ::data-type
                   ::data-pointer]))


(def UnitClassData
  (s/keys ::req-un [::index
                    ::num-elements
                    ::vehicle-type
                    ::vehicle-class
                    ::flags
                    ::name
                    ::movement
                    ::movement
                    ::max
                    ::fuel
                    ::rate
                    ::pt
                    ::scores
                    ::role
                    ::hit
                    ::strength
                    ::range
                    ::detection
                    ::damage
                    ::radar
                    ::special
                    ::icon]))


(def ObjectiveClassData
  (s/keys :req-un [::index
                   ::name
                   ::data-rate
                   ::deag-distance
                   ::pt-data-index
                   ::detection
                   ::damage-mod
                   ;; ::mystery
                   ::icon-index
                   :raw/features
                   ::radar-feature
                   ::first-feature]))


(def VehicleClassData
  (s/keys :req-un [::index
                   ::hit-points
                   ::flags
                   ::name
                   ::nctr
                   ::rcs-factor
                   ::max-wt
                   ::empty-wt
                   ::fuel-wt
                   ::fuel-econ
                   ::engine-sound
                   ::high-alt
                   ::low-alt
                   ::cruise-alt
                   ::max-speed
                   ::radar-type
                   ::number-of-pilots
                   ::rack-flags
                   ::visible-flags
                   ::callsign-index
                   ::callsign-slots
                   ::hit-chance
                   ::strength
                   ::range
                   ::detection
                   ::weapon
                   :vehicle/weapons
                   ::damage-mod]))

(def WeaponClassData
  (s/keys :req-un [::blast-radius
                   ::collective
                   ::damage-type
                   ::drag-index
                   ::fire-rate
                   ::flags
                   ::guidance-flags
                   ::hit-chance
                   ::max-alt
                   ::name
                   ::radar-type
                   ::range
                   ::rariety
                   ::sim-data-idx
                   ::simweap-index
                   ::strength
                   ::weight]
          :req [::index]))

(def Weapon
  (s/merge WeaponClassData
           (s/keys :req [::name])))

(def FeatureClassData
  (s/keys :req-un [::repair-time
                   ::priority
                   ::flags
                   ::name
                   ::hit-points
                   ::height
                   ::angle
                   ::radar-type
                   ::detection
                   ::damage-mod]))

(def FeatureEntryData
  (s/keys :req-un [::index
                   ::flags
                   ::entity-class
                   ::value
                   ::offset
                   ::facing]))

(def PointHeaderData
  (s/keys :req-un [::obj-id
                   ::type
                   ::count
                   :raw/features
                   ::data
                   ::sin-heading
                   ::cos-heading
                   ::first
                   ::tex-idx
                   ::runway-num
                   ::ltrt
                   ::next-header]))

(def IdList
  (s/keys :req-un [::id->name
                   ::name->id]))


(def InitialDatabase
  (s/keys :req-un [::class-table
                   ::unit-class-data
                   ::objective-class-data
                   ::vehicle-class-data
                   ::weapon-class-data
                   ::feature-class-data
                   ::feature-entry-data
                   ::point-header-data
                   ::image-ids
                   ::user-ids]))

(def Database
  (s/merge InitialDatabase
           (s/keys :req-un [::strings])))

(def EventNode
  (s/keys :req-un [::x
                   ::y
                   ::time
                   ::flags
                   ::team
                   ::event-text
                   ::ui-event-node]))

(def SquadronInfo
  (s/keys :req-un [::airbase-icon
                   ::airbase-name
                   ::country
                   ::current-strength
                   ::description-index
                   :vu/id
                   ::name-id
                   ::specialty
                   ::squadron-patch
                   ::x
                   ::y]))

(def TeamBasicInfo
  (s/keys :req-un [::color
                   ::flag
                   ::motto
                   ::name]))

(def CampaignInfo
  (s/keys ::req-un [::active-team
                    ::air-defense-ratio
                    ::air-ratio
                    ::brief
                    ::bullseye-name
                    ::bullseye-x
                    ::bullseye-y
                    ::creation-rand
                    ::creation-time
                    ::creator-ip
                    ::current-day
                    ::current-time
                    ::day-zero
                    ::endgame-result
                    ::enemy-ad-exp
                    ::enemy-air-exp
                    ::ground-ratio
                    ::group
                    ::last-index-num
                    ::last-major-event
                    ::last-reinforcement
                    :int/last-repair
                    ::last-resupply
                    ::map
                    ::naval-ratio
                    ::player-squadron-id
                    ::priority-event-entries
                    ::recent-event-entries
                    ::save-file
                    ::scenario
                    ::situation
                    ::squadron-info
                    ::te-flags
                    ::te-num-aircraft
                    ::te-num-f16s
                    ::te-num-teams
                    ::te-start
                    ::te-team
                    ::te-team-points
                    ::te-time-limit
                    ::te-type
                    ::te-victory-points
                    ::team-info
                    ::tempo
                    ::theater-name
                    ::theater-size-x
                    ::theater-size-y
                    ::time-stamp
                    ::ui-name]))

(def ObjectiveDelta
  (s/keys :req-un [::f-status
                   ::fuel
                   :vu/id
                   ::last-repair
                   ::losses
                   ::owner
                   ::supply]))

(def TaskingManager
  (s/keys :req-un [:vu/id
                   ::entity-type
                   ::manager-flags
                   ::owner]))

(def AtmAirbase
  (s/keys :req-un [:vu/id
                   ::schedule]))

(def MissionRequest
  (s/keys :req-un [::requester
                   ::tawrget
                   ::secondary
                   ::pak
                   ::who
                   ::vs
                   ::tot
                   ::tx
                   ::ty
                   ::flags
                   ::caps
                   ::target-num
                   ::speed
                   ::match-strength
                   ::priority
                   ::tot-type
                   ::action-type
                   :mission-request/mission
                   ::aircraft
                   ::context
                   ::roe-check
                   ::delayed
                   ::start-block
                   ::final-block
                   ::slots
                   ::min-to
                   ::max-to]))

(def AirTaskingManager
  (s/merge TaskingManager
           (s/keys :req-un [:atm/airbases
                            ::average-ca-strength
                            ::average-ca-missions
                            ::cycle
                            ::flags
                            ::mission-requests
                            ::sample-cycles])))

(def GroundTaskingManager
  (s/merge TaskingManager
           (s/keys :req-un [::flags])))

(def NavalTaskingManager
  (s/merge TaskingManager
           (s/keys :req-un [::flags])))

(def TeamStatus
  (s/keys :req-un [::air-defence-vehicles ; buf/uint16
                   :team-status/airbases ; buf/uint16
                   :team-status/aircraft ; buf/uint16
                   ::fuel ; buf/uint16
                   ::fuel-level ; buf/ubyte
                   ::ground-vehicles ; buf/uint16
                   ::ships ; buf/uint16
                   ::supply ; buf/uint16
                   ::supply-level ; buf/ubyte
                   ]))

(def TeamAirAction
  (s/keys :req-un [::last-objective ; vu-id
                   ::objective ; vu-id
                   ::start ; campaign-time
                   ::stop ; campaign-time
                   ::type ; buf/ubyte
                   ]))

(def TeamGroundAction
  (s/keys :req-un [::objective ; vu-id
                   ::points ; buf/ubyte
                   ::tempo ; buf/ubyte
                   ::time ; campaign-time
                   ::timeout ; campaign-time
                   ::type ; buf/ubyte
                   ]))

(def TeamTeam
  (s/keys :req-un [
                   ::air-defense-experience ; buf/ubyte
                   ::air-experience ; buf/ubyte
                   ::bonus-objs ; (buf/repeat 20 vu-id)
                   ::bonus-time ; (buf/repeat 20 buf/uint32)
                   ::c-team ; buf/ubyte
                   ::current-stats ; team-status
                   ::defensive-air-action ; team-air-actionp
                   ::entity-type ; buf/uint16
                   ::equipment ; buf/ubyte
                   ::first-colonel ; buf/int16
                   ::first-commander ; buf/int16
                   ::first-wingman ; buf/int16
                   ::flags ; buf/uint16
                   ::fuel-available ; buf/uint16
                   ::ground-action ; team-ground-action
                   ::ground-experience ; buf/ubyte
                   :vu/id ; vu-id
                   ::initiatve ; buf/int16
                   ::last-player-mission ; campaign-time
                   ::last-wingman ; buf/int16
                   ::max-vehicle ; (buf/repeat 4 buf/ubyte)
                   ::members ; (buf/repeat 8 buf/ubyte)
                   ::mission-priority ; (buf/repeat 41 buf/ubyte)
                   ::motto ; (fixed-string 200)
                   ::name ; (fixed-string 20)
                   ::naval-experience ; buf/ubyte
                   ::obj-type-priority ; (buf/repeat 36 buf/ubyte)
                   ::offensive-air-action ; team-air-action
                   ::player-rating ; buf/float
                   ::reinforcement ; buf/int16
                   ::replacements-available ; buf/uint16
                   ::stance ; (buf/repeat 8 buf/int16)
                   ::start-stats ; team-status
                   ::supply-available ; buf/uint16
                   ::team-color ; buf/ubyte
                   ::team-flag ; buf/ubyte
                   ::unit-type-priority ; (buf/repeat 20 buf/ubyte)
                   ::who ; buf/ubyte
    ]))

(def Team
  (s/keys :req-un [::air-tasking-manager
                   ::ground-tasking-manager
                   ::naval-tasking-manager
                   :team/team]))

(def Events NotImplemented)
(def PrimaryObjectives NotImplemented)
(def Pilots NotImplemented)
(def PersistentObjects NotImplemented)
(def Weather NotImplemented)
(def Version
  (s/keys :req-un [:database/version]))
(def VictoryConditions string?)

(def Buffer bytes?)

(def AugmentedObjective
  (s/merge Objective
           (s/keys :req [::location
                         ::status
                         ::image
                         ::name
                         ::features])))

(def Unit
  (s/merge CampaignBaseFields
           (s/keys :req-un [::cargo-id
                            ::current-wp
                            ::destination-x
                            ::destination-y
                            ::last-check
                            ::losses
                            ::moved
                            ::name-id
                            ::reinforcement
                            ::roster
                            ::tactic
                            ::target-id
                            ::unit-flags
                            ::waypoints])))

(def GroundUnit
  (s/keys :req-un [::aobj
                   ::division
                   ::orders]))

(def UnitFlags
  (s/coll-of (s/or :integer integer? :keyword keyword?)
             :kind set?))

(def Squadron
  (s/merge Unit
           (s/keys :req [::aircraft
                         ::squadron-type
                         ::image])))


(def Waypoint
  (s/keys :req-un [::action
                   ::flags
                   ::formation
                   ::grid-x
                   ::grid-y
                   ::haves
                   ::target-building
                   ::target-id]
          :opt-un [::arrive
                   ::depart]))

(def Aircraft
  (s/keys :req-un [::airframe
                   ::quantity]))

(def Flight
  (s/merge Unit
           (s/keys :req [::airbase
                         ::aircraft
                         ::loadouts
                         ::mission
                         ::package
                         ::squadron
                         ::squadron-image
                         ::waypoints])))

(def Carrier
  (s/merge Unit
           (s/keys :req [::location
                         ::status
                         ::squadrons
                         ::image
                         ::name])))

(def ArmyBase
  (s/merge AugmentedObjective
           (s/keys :req-un [::base-flags
                            ::camp-id
                            ::entity-type
                            ::f-status
                            ::first-owner
                            ::fuel
                            :map/id
                            ::last-repair
                            ::links
                            ::losses
                            ::name-id
                            ::obj-flags
                            ::objective-type
                            ::owner
                            ::parent
                            ::priority
                            ::radar-data
                            ::spot-time
                            ::spotted
                            ::supply
                            ::x
                            ::y
                            ::z]
                   :req [::features
                         ::image
                         ::location
                         ::name
                         ::squadrons
                         ::status])))

(def AugmentedFeature
  (s/keys :req-un [::entity-class
                   ::facing
                   ::flags
                   ::index
                   ::offset
                   ::value]
          :req [::class-info
                ::index
                ::status]))

(def PrePlannedThreat
  (s/keys :req-un [:ppt/id
                   ::radius-ft
                   ::description]))

(def ScenarioFiles
  (s/keys :req-un [::campaign-info
                   ::persistent-objects
                   ::events
                   ::teams
                   ::objective-deltas
                   :raw/objectives
                   ::victory-conditions
                   ::weather
                   ::units
                   ::version
                   ::pilots]))

(def Mission
  (s/keys :req-un [::campaign-info
                   ::candidate-installs
                   ::class-table
                   ::events
                   ::feature-class-data
                   ::feature-entry-data
                   ::image-ids
                   ::installation
                   ::installs
                   ::map-image
                   ::mission-name
                   ::names
                   ::objective-class-data
                   ::objective-deltas
                   :raw/objectives
                   ::path
                   ::persistent-objects
                   ::pilots
                   ::point-header-data
                   ::ppt-data
                   ::primary-objectives
                   ::scenario-files
                   ::strings
                   ::teams
                   ::theater
                   ::unit-class-data
                   ::units
                   ::user-ids
                   ::vehicle-class-data
                   ::version
                   ::weapon-class-data]
          :req [::airbases
                ::army-bases
                ::carriers
                ::flights
                ::objectives
                ::squadrons
                ::weapons]))

;; Lots of the keywords get used in more than one context with more
;; than one specification, hence the or's below. I could consider
;; using more than one namespace instead.
(s/def ::3d-data-dir Dir)
(s/def ::aobj VuId)
(s/def ::action integer?)
(s/def ::action-type integer?)
(s/def ::active-team integer?)
(s/def ::airbase
  (s/keys :req-un [::name]))
(s/def :atm/airbases (s/coll-of AtmAirbase))
(s/def :team-status/airbases integer?)
(s/def ::airbases (s/coll-of Airbase))
(s/def ::airbase-icon integer?)
(s/def ::airbase-name string?)
(s/def ::air-defense-experience integer?)
(s/def ::air-defense-ratio integer?)
(s/def ::air-defence-vehicles integer?)
(s/def ::air-experience integer?)
(s/def ::air-ratio integer?)
(s/def ::aircraft Aircraft)
(s/def :team-status/aircraft integer?)
(s/def ::airframe string?)
(s/def ::angle number?)
(s/def ::arrive CampaignTime)
(s/def ::army-bases (s/coll-of ArmyBase))
(s/def ::art-dir Dir)
(s/def ::average-ca-missions integer?)
(s/def ::average-ca-strength integer?)
(s/def ::base Path)
(s/def ::base-flags integer?)
(s/def ::bitmap Path)
(s/def ::blast-radius integer?)
(s/def ::bonus-objs (s/coll-of VuId :count 20))
(s/def ::bonus-time (s/coll-of integer? :count 20))
(s/def ::brief integer?)
(s/def ::bullseye-name integer?)
(s/def ::bullseye-x integer?)
(s/def ::bullseye-y integer?)
(s/def ::c-team integer?)
(s/def ::callsign-index integer?)
(s/def ::callsign-slots integer?)
(s/def ::camp-id integer?)
(s/def ::campaign-info CampaignInfo)
(s/def ::campaign-dir Dir)
(s/def ::candidate-installs Installs)
(s/def ::caps integer?)
(s/def ::cargo-id VuId)
(s/def ::carriers (s/coll-of Carrier))
(s/def ::center (s/coll-of integer? :count 2))
(s/def ::class integer?)
(s/def ::class-table (s/coll-of Falcon4EntityFields))
(s/def ::class-info (s/or :class-info ClassInfo :class-info-2 ClassInfo2))
(s/def ::collective integer?)
(s/def ::collidable integer?)
(s/def ::collision-radius number?)
(s/def ::collision-type integer?)
(s/def ::color integer?)
(s/def ::context integer?)
(s/def ::cos-heading number?)
(s/def ::costs (s/coll-of integer? :count c/MOVEMENT_TYPES))
(s/def ::count integer?)
(s/def ::country integer?)
(s/def ::create-priority integer?)
(s/def ::creation-rand integer?)
(s/def ::creation-time integer?)
(s/def ::creator integer?)
(s/def ::creator-ip integer?)
(s/def ::cruise-alt integer?)
(s/def ::current-day integer?)
(s/def ::current-stats TeamStatus)
(s/def ::current-strength integer?)
(s/def ::current-time CampaignTime)
(s/def ::current-wp integer?)
(s/def ::cycle integer?)
(s/def ::damage-mod (s/or :multiple (s/coll-of integer? :count (inc c/OtherDam)) :singular integer?))
(s/def ::damage-speed integer?)
(s/def ::damage-type integer?)
(s/def ::data integer?)
(s/def ::data-dir Dir)
(s/def ::data-pointer integer?)
(s/def ::data-rate integer?)
(s/def ::data-type integer?)
(s/def ::day integer?)
(s/def ::day-zero integer?)
(s/def ::deag-distance integer?)
(s/def ::defensive-air-action TeamAirAction)
(s/def ::delayed integer?)
(s/def ::desc string?)
(s/def ::depart CampaignTime)
(s/def ::description string?)
(s/def ::description-index integer?)
(s/def ::destination-x integer?)
(s/def ::destination-y integer?)
(s/def ::detect-ratio (s/coll-of number? :count c/NUM_RADAR_ARCS))
(s/def ::detection (s/or :multiple (s/coll-of integer? :count c/MOVEMENT_TYPES) :singular integer?))
(s/def ::division integer?)
(s/def ::domain integer?)
(s/def ::doubleres2dmap string?)
(s/def ::drag-index integer?)
(s/def ::empty-wt integer?)
(s/def ::endgame-result integer?)
(s/def ::enemy-ad-exp integer?)
(s/def ::enemy-air-exp integer?)
(s/def ::engine-sound integer?)
(s/def ::entity-class (s/coll-of integer? :count 8))
(s/def ::entity-type integer?)
(s/def ::equipment integer?)
(s/def ::event-text string?)
(s/def ::events Events)
(s/def ::f-status (s/coll-of integer?))
(s/def ::facing integer?)
(s/def :raw/features (s/or :single integer? :multiple (s/coll-of integer? :count c/MAX_FEAT_DEPEND)))
(s/def ::features (s/coll-of AugmentedFeature))
(s/def ::feature-class-data (s/coll-of FeatureClassData))
(s/def ::feature-entry-data (s/coll-of FeatureEntryData))
(s/def ::final-block integer?)
(s/def ::fine-update-force-range number?)
(s/def ::fine-update-multiplier number?)
(s/def ::fine-update-range number?)
(s/def ::fire-rate integer?)
(s/def ::first integer?)
(s/def ::first-colonel integer?)
(s/def ::first-commander integer?)
(s/def ::first-feature integer?)
(s/def ::first-owner integer?)
(s/def ::first-wingman integer?)
(s/def ::flag integer?)
(s/def ::flags (s/or :integer integer? :set (s/coll-of (s/or :keyword keyword? :integer integer?) :kind set?)))
(s/def ::flights (s/coll-of Flight))
(s/def ::formation integer?)
(s/def ::fuel integer?)
(s/def ::fuel-available integer?)
(s/def ::fuel-econ integer?)
(s/def ::fuel-level integer?)
(s/def ::fuel-wt integer?)
(s/def ::global integer?)
(s/def ::grid-x integer?)
(s/def ::grid-y integer?)
(s/def ::ground-action TeamGroundAction)
(s/def ::ground-experience integer?)
(s/def ::ground-ratio integer?)
(s/def ::ground-tasking-manager GroundTaskingManager)
(s/def ::ground-vehicles integer?)
(s/def ::group integer?)
(s/def ::guidance-flags integer?)
(s/def ::has-radar-data integer?)
(s/def ::haves Haves)
(s/def ::height integer?)
(s/def ::high-alt integer?)
(s/def ::hit-chance (s/or :multiple (s/coll-of integer? :count c/MOVEMENT_TYPES) :singular integer?))
(s/def ::hit-points integer?) ;; Similar to ::hitpoints
(s/def ::hitpoints integer?)  ;; Similar to ::hit-points
(s/def ::hour integer?)
(s/def ::icon-index integer?)
(s/def ::id->name (s/map-of integer? string?))
(s/def ::idx-modified integer?)
(s/def ::idx-size integer?)
(s/def ::im/id string?)
(s/def :ppt/id string?)
(s/def :int/id integer?)
(s/def :vu/id VuId)
(s/def ::image-id string?)
(s/def ::image-data ImageData)
(s/def ::image (s/nilable ImageDescriptor))
(s/def ::image-offset integer?)
(s/def ::image-ids IdList)
(s/def ::index NonNegativeInt)
(s/def ::initiatve integer?)
(s/def ::installation Installation)
(s/def ::installs Installs)
(s/def ::install-dir Dir)
(s/def ::last-check CampaignTime)
(s/def ::last-index-num integer?)
(s/def ::last-major-event integer?)
(s/def ::last-player-mission CampaignTime)
(s/def ::last-objective VuId)
(s/def ::last-reinforcement integer?)
(s/def :int/last-repair integer?)
(s/def ::last-repair CampaignTime)
(s/def ::last-resupply integer?)
(s/def ::last-wingman integer?)
(s/def ::links (s/coll-of ObjectiveLink))
(s/def ::location (s/keys :req-un [::x ::y]))
(s/def ::losses integer?)
(s/def ::low-alt integer?)
(s/def ::ltrt integer?)
(s/def ::magneticdeclination string?)
(s/def ::major-revision-number integer?)
(s/def ::management-domain integer?)
(s/def ::manager-flags integer?)
(s/def ::map (s/coll-of integer?))
(s/def ::map-image ImageDescriptor)
(s/def ::match-strength integer?)
(s/def ::max-alt integer?)
(s/def ::max-range integer?)
(s/def ::max-speed integer?)
(s/def ::max-to integer?)
(s/def ::max-vehicle (s/coll-of integer? :count 4))
(s/def ::max-wt integer?)
(s/def ::members (s/coll-of integer? :count 8))
(s/def ::millisecond integer?)
(s/def ::min-to integer?)
(s/def ::minor-revision-number integer?)
(s/def ::minute integer?)
(s/def ::mintacan string?)
(s/def ::misc-text-dir Dir)
(s/def :mission-request/mission integer?)
(s/def ::mission
  (s/keys :req-un [::name
                   ::category]))
(s/def ::mission-name string?)
(s/def ::mission-priority (s/coll-of integer? :count 41))
(s/def ::mission-requests (s/coll-of MissionRequest))
(s/def ::motto string?)
(s/def ::moved integer?)
(s/def ::movement-speed integer?)
(s/def ::movement-type integer?)
(s/def ::name string?)
(s/def ::names (s/fspec :args (s/cat :idx NonNegativeInt)
                        :ret (s/nilable string?)))
(s/def ::naval-experience integer?)
(s/def ::naval-ratio integer?)
(s/def ::naval-tasking-manager NavalTaskingManager)
(s/def :int/name integer?)
(s/def ::name->id (s/map-of string? integer?))
(s/def ::name-id integer?)
(s/def ::nctr string?)
(s/def ::next-header integer?)
(s/def ::num-elements (s/coll-of integer? :count c/VEHICLE_GROUPS_PER_UNIT))
(s/def ::number-of-pilots integer?)
(s/def ::obj-flags integer?)
(s/def ::obj-id integer?)
(s/def ::obj-type-priority (s/coll-of integer? :count 36))
(s/def ::object-dir Dir)
(s/def ::objective VuId)
(s/def ::objective-deltas (s/coll-of ObjectiveDelta))
(s/def ::objective-class-data (s/coll-of ObjectiveClassData))
(s/def ::objective-type integer?)
(s/def :raw/objectives (s/coll-of Objective))
(s/def ::objectives (s/coll-of AugmentedObjective))
(s/def ::orders integer?)
(s/def ::offensive-air-action TeamAirAction)
(s/def ::offset Vector3)
(s/def ::owner integer?)
(s/def ::package
  (s/keys :req-un [::name]))
(s/def ::pak VuId)
(s/def ::palette-offset integer?)
(s/def ::palette-size integer?)
(s/def ::parent VuId)
(s/def ::path Path)
(s/def ::persistent integer?)
(s/def ::persistent-objects PersistentObjects)
(s/def ::pilots Pilots)
(s/def ::player-rating number?)
(s/def ::player-squadron-id VuId)
(s/def ::point-header-data (s/coll-of PointHeaderData))
(s/def ::points integer?)
(s/def ::ppt-data (s/coll-of PrePlannedThreat))
(s/def ::primary-objectives PrimaryObjectives)
(s/def ::priority integer?)
(s/def ::priority-event-entries (s/coll-of EventNode))
(s/def ::private integer?)
(s/def ::pt-data-index integer?)
(s/def ::quantity integer?)
(s/def ::rack-flags integer?)
(s/def ::radar-data (s/keys :req-un [::has-radar-data] :opt-un [::detect-ratio]))
(s/def ::radar-feature integer?)
(s/def ::radar-type integer?)
(s/def ::radar-vehicle integer?)
(s/def ::radius-ft number?)
(s/def ::range (s/or :multiple (s/coll-of integer? :count c/MOVEMENT_TYPES) :singular integer?))
(s/def ::rariety integer?)
(s/def ::rate integer?)
(s/def ::rcs-factor number?)
(s/def ::recent-event-entries (s/coll-of EventNode))
(s/def ::reinforcement integer?)
(s/def ::repair-time integer?)
(s/def ::replacements-available integer?)
(s/def ::requester VuId)
(s/def ::resource string?)
(s/def ::roe-check integer?)
(s/def ::role integer?)
(s/def ::roster integer?)
(s/def ::rsc-modified integer?)
(s/def ::rsc-size integer?)
(s/def ::runway-num integer?)
(s/def ::save-file string?)
(s/def ::scenario string?)
(s/def ::scenario-files ScenarioFiles)
(s/def ::schedule (s/coll-of integer? :count c/ATM_MAX_CYCLES))
(s/def ::second integer?)
(s/def ::secondary VuId)
(s/def ::scores (s/coll-of integer? :count c/MAXIMUM_ROLES))
(s/def ::ships integer?)
(s/def ::sim-data-dir Dir)
(s/def ::sim-data-idx integer?)
(s/def ::simweap-index integer?)
(s/def ::sin-heading number?)
(s/def ::size (s/coll-of integer? :count 2))
(s/def ::situation integer?)
(s/def ::slots (s/coll-of integer? :count 4))
(s/def ::sound-dir Dir)
(s/def ::special-index integer?)
(s/def ::specialty integer?)
(s/def ::speed integer?)
(s/def ::spot-time CampaignTime)
(s/def ::spotted integer?)
(s/def ::sptype integer?)
(s/def ::squadron
  (s/keys :req-un [::name]))
(s/def ::squadrons
  (s/or :map (s/map-of VuId (s/coll-of Squadron))
        :seq (s/nilable (s/coll-of Squadron))))
(s/def ::squadron-image ImageDescriptor)
(s/def ::squadron-info (s/coll-of SquadronInfo))
(s/def ::squadron-patch integer?)
(s/def ::stance (s/coll-of integer? :count 8))
(s/def ::start CampaignTime)
(s/def ::start-block integer?)
(s/def ::start-status TeamStatus)
(s/def ::status integer?) ;; Could constrain to 0-100
(s/def ::stop CampaignTime)
(s/def ::strength (s/or :multiple (s/coll-of integer? :count c/MOVEMENT_TYPES) :singular integer?))
(s/def ::strings StringsData)
(s/def ::stype integer?)
(s/def ::supply integer?)
(s/def ::supply-available integer?)
(s/def ::supply-level integer?)
(s/def ::tactic integer?)
(s/def ::tangible integer?)
(s/def ::target-building integer?)
(s/def ::target VuId)
(s/def ::target-id VuId)
(s/def ::target-num integer?)
(s/def ::te-flags integer?)
(s/def ::te-num-aircraft (s/coll-of integer? :count 8))
(s/def ::te-num-f16s (s/coll-of integer? :count 8))
(s/def ::te-num-teams integer?)
(s/def ::te-start CampaignTime)
(s/def ::te-team integer?)
(s/def ::te-team-points (s/coll-of integer? :count 8))
(s/def ::te-time-limit CampaignTime)
(s/def ::te-type integer?)
(s/def ::te-victory-points integer?)
(s/def ::team integer?)
(s/def :team/team TeamTeam)
(s/def ::team-color integer?)
(s/def ::team-flag integer?)
(s/def ::team-info (s/coll-of TeamBasicInfo :count 8))
(s/def ::teams (s/coll-of Team))
(s/def ::tempo integer?)
(s/def ::terrain-dir Dir)
(s/def ::tex-idx integer?)
(s/def ::theater Theater)
(s/def ::theater-name string?)
(s/def ::theater-size-x integer?)
(s/def ::theater-size-y integer?)
(s/def ::theaters (s/coll-of Theater))
(s/def ::time CampaignTime)
(s/def ::time-stamp integer?)
(s/def ::timeout CampaignTime)
(s/def ::tot integer?)
(s/def ::tot-type integer?)
(s/def ::transferable integer?)
(s/def ::tx integer?)
(s/def ::ty integer?)
(s/def ::type integer?)
(s/def ::ui-name string?)
(s/def ::units (s/coll-of Unit))
(s/def ::unit-flags UnitFlags)
(s/def ::unit-class-data (s/coll-of UnitClassData))
(s/def ::unit-type-priority (s/coll-of integer? :count 20))
(s/def ::update-rate integer?)
(s/def ::update-tolerance integer?)
(s/def ::user-ids IdList)
(s/def ::value integer?)
(s/def ::vehicle-class (s/coll-of integer? :count c/VEHICLE_GROUPS_PER_UNIT))
(s/def ::vehicle-class-data (s/coll-of VehicleClassData))
(s/def ::vehicle-data-index integer?)
(s/def ::vehicle-type (s/coll-of integer? :count c/VEHICLE_GROUPS_PER_UNIT))
(s/def :database/version integer?)
(s/def ::version Version)
(s/def ::victory-conditions VictoryConditions)
(s/def ::vis-type (s/coll-of integer? :count 7))
(s/def ::visible-flags integer?)
(s/def ::vu-class-data VuEntityFields)
(s/def ::waypoints (s/coll-of Waypoint))
(s/def ::weapon (s/coll-of integer? :count c/HARDPOINT_MAX))
(s/def :vehicle/weapons (s/coll-of integer? :count c/HARDPOINT_MAX))
(s/def ::weapons (s/coll-of Weapon))
(s/def ::weapon-class-data (s/coll-of WeaponClassData))
(s/def ::weather Weather)
(s/def ::weight integer?)
(s/def ::who integer?)
(s/def ::vs integer?)
(s/def ::x number?)
(s/def ::y number?)
(s/def ::z number?)

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

(defn- weapon-class-entry
  "Returns the class data entry of a weapon."
  [mission id]
  (let [{:keys [weapon-class-data]} mission]
    (-> weapon-class-data
        (nth id))))

(defn active-units
  "Return a seq of the units in `mission` that are not inactive."
  [mission]
  (->> mission
       :units
       (remove #(-> % :unit-flags :inactive))))

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

(defn find-unit
  "Find a unit by the criteria given, or nil if the item can't be found."
  [mission criteria value]
  (condp = criteria
    :id (->> mission active-units (filter #(= (:id %) value)) first)))

(defn unit-lookup-by-id
  "Given a seq of units, return the one with the given id."
  [units id]
  (some (fn [unit]
          (when (= id (:id unit))
            unit))
        units))

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
    (cond
      (nil? name-id)
      "N/A"

      (not (zero? name-id))
      ;; This is sort of a hack - it's barfing on carrier objectives
      ;; because the name id is invalid as an index. But we've already
      ;; set the name, so we can fall back on that for now.
      (or (names name-id) (::name objective) "Unnamed objective")

      :else
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

(def campaign-time
  (reify
    octet.spec/ISpecSize
    (size [_]
      (buf/size buf/uint32))

    octet.spec/ISpec
    (read [_ buff pos]
      (let [[size data] (buf/read* buff buf/uint32 {:offset pos})]
        [size (time/ms->campaign-time data)]))

    (write [_ buff pos t]
      (buf/write! buff buf/int32 (time/campaign-time->ms t)))))

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
  index, or nil if the index is not in range."
  [dir name]
  #_(log/debug "read-strings" :dir dir :name name)
  (let [idx-buf (fs/file-buf (fs/path-combine dir (str name ".idx")))]
    (binding [octet.buffer/*byte-order* :little-endian]
      (let [n (buf/read idx-buf buf/uint16)
            indices (buf/read idx-buf
                              (buf/repeat n buf/uint16)
                              {:offset 2})
            strings (fs/file-text (fs/path-combine dir (str name ".wch")))]
        (fn [idx]
          (when (< idx (dec n))
            (subs strings
                  (nth indices idx)
                  (if (= idx (dec n))
                    (count strings)
                    (nth indices (inc idx))))))))))

(s/fdef read-strings-file
  :args (s/cat :campaign-dir Dir)
  :ret StringsData)

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
            :mystery buf/ubyte    ; Not sure what this is
            :icon-index buf/uint16 ; Index to this objective's icon type
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
(def weapon-class-data
  (buf/spec :index buf/int16       ; ;; descriptionIndex pointing here
            ;; 2002-02-08 MN changed from short to ushort
            :strength buf/uint16    ;; How much damage it'll do.
            ;; See DamageDataType
            :damage-type buf/uint16 ;; What type of damage it does.
            :padding (buf/repeat 2 buf/ubyte)
            :range buf/int16        ;; Range, in km.
            :flags buf/uint16
            :name (fixed-string 20)
            :hit-chance (buf/repeat c/MOVEMENT_TYPES buf/ubyte)
            :fire-rate buf/ubyte ;; # of shots fired per barrage
            :rariety buf/ubyte ;; % of full supply which is actually provided
            :guidance-flags buf/uint16
            :collective buf/ubyte
            :padding2 buf/ubyte
            :simweap-index buf/int16 ;; Index into sim's weapon data tables
            :drag-index buf/int16
            :blast-radius buf/uint16 ;; radius in ft.
            :radar-type buf/int16    ;; Index into RadarDataTable
            :sim-data-idx buf/int16  ;; Index int SimWeaponDataTable
            :max-alt buf/byte ;; Maximum altitude it can hit in thousands of feet
            :padding3 buf/ubyte
            :weight buf/uint16       ;; Weight in lbs.
            ))

;; Ref: entity.h
(def feature-class-data
  (buf/spec :index buf/int16 ; descriptionIndex pointing here
            :repair-time buf/int16 ; How long it takes to repair
            :priority buf/byte    ; Display priority
            :padding1 buf/byte
            ;; See FEAT_ flags in feature.h
            :flags (bitflags buf/uint16
                             {:repairable?         c/FEAT_EREPAIR
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
                              :no-hiteval?         c/FEAT_NO_HITEVAL})
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
  (progress/with-step (str "Reading " (get file-type-description type "data"))
    (fn []
     (read-embedded-file* type entry buf database))))

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

(s/fdef campaign-dir
  :args (s/alt :single-arity (s/cat :mission Todo)
               :two-arity (s/cat :installation Installation :theater Theater))
  :ret Dir)

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

(s/fdef read-theater-def
  :args (s/cat :data-dir Dir :path Path)
  :ret Theater)

(defn read-theater-def
  "Reads the theater TDF from the given path, relative to `data-dir`."
  [data-dir path]
  (let [defpath (fs/path-combine data-dir path)]
    (if-not (fs/exists? defpath)
      (let [msg (str "Can't find theater definition at "
                     defpath
                     ". Ignoring theater.")]
        (log/warn msg)
        (progress/step-warn msg)
        nil)
      (let [d (->> defpath
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
            adjust-art-dir)))))


(s/fdef read-theater-defs
  :args (s/cat :data-dir Dir)
  :ret (s/coll-of Theater))

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
       (mapv #(read-theater-def data-dir %))
       (remove nil?)))

(def whitespace #"[ \t=]+")

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
       (map #(str/split % whitespace))
       (map (fn [[name id]]
              [name (or (util/str->long id)
                        (do (log/error "Error parsing image id"
                                       :name name
                                       :id id
                                       :path path)
                            nil))]))))

(s/fdef read-id-list
  :args (s/cat :installation Installation :id string?)
  :ret IdList)

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

(s/fdef read-image-ids
  :args (s/cat :installation Installation)
  :ret IdList)

(defn read-image-ids
  "Read in the image IDs in this installation. Returns a map with
  keys :id->name and :name->id mapping in each direction."
  [installation]
  (read-id-list installation "IMAGEIDS"))

(s/fdef read-user-ids
  :args (s/cat :installation Installation)
  :ret IdList)

(defn read-user-ids
  "Read in the user IDs in this installation. Returns a map with
  keys :id->name and :name->id mapping in each direction."
  [installation]
  (read-id-list installation "USERIDS"))

(s/fdef load-installation
  :args (s/cat :install-dir Dir)
  :ret Installation)

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

(s/fdef find-theater
  :args (s/cat :installation Installation :path Path)
  :ret Theater)

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

(s/fdef load-initial-database
  :args (s/cat :installation Installation :theater Theater)
  :ret InitialDatabase)

(defn load-initial-database
  "Load the files in known locations needed to process a mission in a
  given theater."
  [installation theater]
  (->> (for [[file k spec] [["FALCON4.ct" :class-table (apply buf/spec falcon4-entity-fields)]
                            ["FALCON4.UCD" :unit-class-data unit-class-data]
                            ["FALCON4.OCD" :objective-class-data objective-class-data]
                            ["FALCON4.VCD" :vehicle-class-data vehicle-class-data]
                            ["FALCON4.WCD" :weapon-class-data weapon-class-data]
                            ["FALCON4.FCD" :feature-class-data feature-class-data]
                            ["falcon4.fed" :feature-entry-data feature-entry-data]
                            ["FALCON4.PHD" :point-header-data point-header-data]]]
         (let [path (fs/path-combine
                     (object-dir installation theater)
                     file)
               buf  (fs/file-buf path)]
           [k
            (binding [octet.buffer/*byte-order* :little-endian]
              (vec
               (map-indexed (fn [i v]
                              (assoc v ::index i))
                            (buf/read (->> file
                                           (fs/path-combine (object-dir installation theater))
                                           fs/file-buf)
                                      (larray buf/uint16 spec)))))]))
       (into {})
       (merge { ;; These next couple might need to be generalized, like to a map
               ;; from the type to the ids in it.
               :image-ids            (read-image-ids installation)
               :user-ids             (read-user-ids installation)})))

(defn- read-embedded-files
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

(defn- flight-aircraft-quantity
  "Returns the number of aircraft in `flight`."
  [flight]
  (->> flight
       :plane-stats
       (remove #{c/AIRCRAFT_NOT_ASSIGNED})
       count))

(defn- loadout-weapons
  "Returns a seq of maps describing weapons in a loadout. Maps contain
  `:quantity` and `:name` keys."
  [mission loadout]
  (let [{ids :id counts :count}     loadout]
    (->> (map vector ids counts)
         (reduce (fn [m [id count]]
                   (if (or (zero? id) (zero? count))
                     m
                     (update m id (fnil + 0) count)))
                 {})
         (mapv (fn [[k v]]
                 (let [weapon (weapon-class-entry mission k)]
                   {:name (:name weapon)
                    :quantity (* v (if (-> weapon :flags (has-flag? c/WEAP_ONETENTH))
                                     10
                                     1))}))))))

(defn- flight-loadouts
  "Given a flight, returns a seq of maps describing the loadouts."
  [mission flight]
  (let [loadouts (:loadouts flight)
        num-ac (flight-aircraft-quantity flight)]
    (for [i (range num-ac)]
      (loadout-weapons mission (if (= (count loadouts) num-ac)
                                 (nth loadouts i)
                                 (first loadouts))))))

;; Ref waypoint.cpp(2012)
(defn- compute-speed
  "Given a ground speed in kts and an altitude in feet, returns mach and IAS in kts."
  [speed altitude]
  (let [ttheta (if (<= altitude 36089)
                 (- 1.0 (* 0.000006875 altitude))
                 0.7519)
        rsigma (if (<= altitude 36089)
                 (Math/pow ttheta 4.256)
                 (* 0.2971 (Math/pow 2.718 (* 0.00004806 (- 36089.0 altitude)))))
        mach   (/ speed (* c/AASLK (Math/sqrt ttheta)))
        pa     (* ttheta rsigma c/PASL)
        qc     (if (<= mach 1.0)
                 (* pa
                    (- (Math/pow (+ 1.0 (* 0.2 mach mach))
                                 3.5)
                       1.0))
                 (* pa
                    (- (/ (* 166.9 mach mach)
                          (Math/pow (- 7.0 (/ 1.0 (* mach mach)))
                                    2.5))
                       1.0)))
        qpasl1 (+ 1.0 (/ qc c/PASL))
        vcas   (* 1479.12 (Math/sqrt (- (Math/pow qpasl1 0.285714)
                                        1.0)))
        ias    (if (< 1889.65 qc)
                 (let [oper (* qpasl1 (Math/pow (- 7.0 (/ (* c/AASLK c/AASLK) (* vcas vcas)))
                                                2.5))]
                   (* 51.1987 (Math/sqrt (if (neg? oper) 0.1 oper))))
                 vcas)]
    {:mach mach
     :ias  ias
     :cas  vcas
     :qc   qc}))

;; Ref: brief.cpp(826)
(defn- waypoint-comments
  "Return the comments section of the flight briefing for a waypoint"
  [mission w]
  (let [strings                             (get-in mission [:strings :fn])
        {:keys [flags action route-action]} w]
    (cond
      (has-flag? flags c/WPF_ALTERNATE) (strings 237)
      (has-flag? flags c/WPF_REPEAT)    (strings 247)
      (= c/WP_NOTHING action)           (strings (+ 1650 route-action))
      :else                             (strings (+ 1650 action)))))

(defn- flight-waypoints
  "Given a flight, returns a seq of maps describing the waypoints"
  [mission flight]
  (let [waypoints (->> flight
                       :waypoints
                       (map-indexed
                        (fn [i w]
                          (let [{:keys [action route-action arrive depart haves]} w
                                action-name         (get-in mission [:strings
                                                                     :waypoint-type-names
                                                                     action])
                                enroute-action-name (get-in mission [:strings
                                                                     :waypoint-type-names
                                                                     route-action])]
                            (assoc
                             w
                             ::number (inc i)
                             ::action-name action-name
                             ::enroute-action-name action-name
                             ::description (if (= action c/WP_NOTHING)
                                             enroute-action-name
                                             action-name)
                             ::remain (when (haves :deptime)
                                        (time/difference-hms arrive depart))
                             ::altitude (-> w :grid-z (* c/GRIDZ_SCALE_FACTOR))
                             ::comments (waypoint-comments mission w))))))]
    (->> waypoints
         (partition 2 1)
         (map (fn [[prev curr]]
                (let [{curr-x :grid-x curr-y :grid-y} curr
                      {prev-x :grid-x prev-y :grid-y} prev
                      dx                              (- curr-x prev-x)
                      dy                              (- curr-y prev-y)
                      dv                              [dx dy]
                      distance                        (-> dv math/magnitude coords/fgrid->nm)
                      delta-t                         (/ (- (-> curr :arrive time/campaign-time->ms)
                                                            (-> prev :depart time/campaign-time->ms))
                                                         1000
                                                         60
                                                         60)
                      gnd-speed                       (if (zero? delta-t)
                                                        0
                                                        (/ distance delta-t))
                      altitude                        (if (-> curr :flags (has-flag? c/WPF_HOLDCURRENT))
                                                        (::altitude prev)
                                                        (::altitude curr))
                      {:keys [mach ias cas]}          (compute-speed gnd-speed altitude)]
                  (assoc curr
                         ::distance distance
                         ::heading  (math/heading dv)
                         ::speed-ias ias
                         ::speed-cas cas
                         ;; TODO: True airspeed would need to take
                         ;; winds into account, which we aren't doing
                         ;; here.
                         ::speed-tas gnd-speed
                         ::speed-gnd gnd-speed
                         ::speed-mach mach
                         ))))
         (into (vec (take 1 waypoints)))
         (map (fn [w]
                (if-not (let [{:keys [action flags]} w]
                          (or (has-flag? flags c/WPF_ALTERNATE)
                              (= c/WP_REFUEL action)))
                  w
                  (dissoc w
                          :arrive :depart ::distance ::heading ::speed-ias
                          ::speed-cas ::speed-gnd ::speed-mach ::speed-tas)))))))

(defn- flight-mission-name
  "Given a flight, returns the name of a flight mission type, e.g. BARCAP."
  [mission flight]
  (get-in mission [:strings :mission-type-names (:mission flight)]))

(defn- flight-mission-category
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
  (let [team-info (get-in mission [:campaign-info :team-info (team-number team)])
        icon-index (get-in c/FlagImageID [(:flag team-info) flag-type])
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
       (sort-by #(-> % :team :last-player-mission time/campaign-time->ms -))
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
        feature-info (subvec feature-entry-data
                             first-feature
                             (+ first-feature features))
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
        feature-class-info (mapv (fn [feature]
                                  (let [ci (-> feature
                                               :index
                                               (->> (nth class-table)))]
                                    (assoc ci
                                           :feature-class-info
                                           (-> ci
                                               :data-pointer
                                               (->> (nth feature-class-data))))))
                                feature-info)
        feature-info (mapv (fn [fi fs fci]
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

(def icon-resource-prefix
  {:white  "wht"
   :green  "grn"
   :blue   "blu"
   :brown  "brn"
   :orange "orn"
   :yellow "ylw"
   :red    "red"
   :grey   "gry"})

(defn- objective-image
  "Returns an image descriptor for an objective."
  [mission objective]
  (let [{:keys [owner]}      objective
        {:keys [icon-index]} (objective-class-entry mission objective)
        {:keys [image-ids]}  mission]
    (im/make-descriptor mission
                        (str "resource/"
                             (-> owner team-color icon-resource-prefix)
                             "dark")
                        (get-in image-ids [:id->name icon-index]))))

(defn- unit-image
  "Returns an image descriptor for a unit."
  [mission unit]
  (let [{:keys [owner]}      unit
        {:keys [icon-index]} (unit-class-entry mission unit)
        {:keys [image-ids]}  mission]
    (im/make-descriptor mission
                        (str "resource/"
                             (-> owner team-color icon-resource-prefix)
                             "dark")
                        (get-in image-ids [:id->name icon-index]))))

(defn- squadron-type
  "Returns a string describing the type of the squadron - Fighter,
  Attack, etc."
  [mission squadron]
  (->> squadron (unit-class-entry mission) :name))

(defn- carrier-name
  "Returns the name of a carrier task force unit."
  [mission carrier]
  (-> (class-table-entry mission carrier)
      :data-pointer
      (->> (nth (:vehicle-class-data mission)))
      :name))

(defn- squadron-airbase
  "Returns the airbase objective for the given squadron."
  [mission squadron]
  (if-let [airbase (find-objective mission :id (:airbase-id squadron))]
    ;; It's a land-based airbase
    (assoc airbase ::name (objective-name mission airbase))
    ;; It's a carrier
    (when-let [carrier (find-unit mission :id (:airbase-id squadron))]
      (assoc carrier ::name (carrier-name mission carrier)))))

(defn- flights
  "Return a seq of all the flights in a mission"
  [mission]
  (progress/with-step "Processing flights"
    (fn []
      (some->> mission
               active-units
               (filter #(= (:type %) :flight))
               (map (fn [flight]
                      (let [squadron (->> flight :squadron (find-unit mission :id))]
                        (assoc flight
                               ::mission {:name     (flight-mission-name mission flight)
                                          :category (flight-mission-category mission flight)}
                               ::squadron {:name (if-not squadron
                                                   "Unknown"
                                                   (unit-name mission squadron))}
                               ::squadron-image (when squadron (squadron-image mission squadron))
                               ::airbase {:name (if-not squadron
                                                  "Unknown"
                                                  (->> squadron
                                                       (squadron-airbase mission)
                                                       ::name))}
                               ::package {:name (->> flight :package (package-name mission))}
                               ::waypoints (flight-waypoints mission flight)
                               ::loadouts (flight-loadouts mission flight)
                               ::aircraft  {:airframe (if-not squadron
                                                        ;; TODO: Somehow Mission Commander knows
                                                        ;; the aircraft type even if there's no
                                                        ;; squadron
                                                        "Unknown"
                                                        (->> squadron
                                                             (squadron-aircraft mission)
                                                             :airframe))
                                            ;; TODO: This might need to change, because the
                                            ;; aircraft in a flight can have different
                                            ;; statuses, like. See e.g.
                                            ;; AIRCRAFT_NOT_ASSIGNED
                                            :quantity (flight-aircraft-quantity flight)}))))))))

(defn- squadrons
  "Return a map of airbase IDs to squadrons in mission."
  [mission]
  (progress/with-step "Processing squadrons"
    (fn []
      (->> mission
           active-units
           (group-by :type)
           :squadron
           (map (fn [squadron]
                  (assoc squadron
                         ::aircraft (squadron-aircraft mission squadron)
                         ::squadron-type (squadron-type mission squadron)
                         ::image (squadron-image mission squadron))))
           (group-by :airbase-id)))))

(defn- objective-features
  [mission objective]
  (let [{:keys [class-table
                objective-class-data
                feature-class-data
                feature-entry-data
                point-header-data
                objectives]}    mission
        oce                     (objective-class-entry mission objective)
        {:keys [features
                first-feature]} oce
        feature-info            (map #(nth feature-entry-data %)
                                     (range first-feature (+ first-feature features)))
        feature-class-info      (map (fn [feature]
                                       (let [ci (-> feature
                                                    :index
                                                    (->> (nth class-table)))]
                                         (assoc ci
                                                ::feature-class-info
                                                (-> ci
                                                    :data-pointer
                                                    (->> (nth feature-class-data))))))
                                     feature-info)
        feature-status          (for [f (range features)]
                                  (let [i  (-> f (/ 4) long)
                                        f* (- f (* i 4))]
                                    (if (or (neg? f*)
                                            (< 255 f*)
                                            ;; For some weird
                                            ;; reason (objectiv.cpp[259]), there
                                            ;; can be more features than status
                                            ;; slots in the objective, in which
                                            ;; case they zero.
                                            (<= (count (:f-status objective)) i))
                                      0
                                      (-> objective
                                          :f-status
                                          (nth i 0)
                                          (bit-shift-right (* f* 2))
                                          (bit-and 0x03)))))]
    (mapv (fn [fi fs fci]
           (assoc fi
                  ::status fs
                  ::class-info fci
                  ))
         feature-info
         feature-status
         feature-class-info)))

(defn- objectives
  "Returns all the objectives."
  [mission]
  (progress/with-step "Processing objectives"
    (fn []
      (->> mission
           :objectives
           (mapv #(assoc %
                         ::location (select-keys % [:x :y])
                         ::status (objective-status mission %)
                         ::image (objective-image mission %)
                         ::name (objective-name mission %)
                         ::features (objective-features mission %)))))))

;; Note that the below will also return carriers, which might be what
;; we want, but might not be.
;;
;; Made this private because it's confusing that it doens't return
;; squadrons etc. Should prefer the OOB functions, which do.
(defn- airbases
  "Returns all the airbase and airstrip objectives."
  [mission]
  (progress/with-step "Processing airbases"
    (fn []
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
             ::objectives
             (filterv (fn [objective]
                        (airbase-classes (- (:entity-type objective) 100))))
             (mapv #(assoc %
                           ::squadrons (get (::squadrons mission) (:id %)))))))))

(defn- carriers
  "Returns all the carrier task force units in the mission."
  [mission]
  (progress/with-step "Processing carriers"
    (fn []
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
             active-units
             (filterv (fn [unit]
                        (carrier-classes (- (:entity-type unit) 100))))
             (mapv #(assoc %
                           ::location (select-keys % [:x :y])
                           ::status 100
                           ::squadrons (get (::squadrons mission) (:id %))
                           ::image (unit-image mission %)
                           ::name (carrier-name mission %))))))))

(defn- army-bases
  "Returns all the army base objectives."
  [mission]
  ;; TODO: There's a lot of commonality here with `airbases` - factor out
  (progress/with-step "Processing army bases"
    (fn []
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
             ::objectives
             (filterv (fn [objective]
                        (armybase-classes (- (:entity-type objective) 100))))
             (mapv #(assoc %
                           ::squadrons (get (::squadrons mission) (:id %)))))))))

(defn- weapons
  "Returns all the weapons."
  [mission]
  (progress/with-step "Processing weapons"
    (fn []
      (->> mission
           :weapon-class-data
           (mapv #(assoc %
                         ::name (:name %)))))))


(defn- report-airbases-with-invalid-owner
  "Throw an error if an airbase has an invalid owner."
  [mission]
  (let [n-sides  (-> mission :teams count)
        problems (for [airbase (::airbases mission)
                       :when (<= n-sides (:owner airbase))]
                   airbase)]
    (when-not (empty? problems)
      (throw (ex-info (str "The following airbases have an invalid owner: \n   "
                           (->> problems
                                (map (fn [{:keys [owner ::name]}]
                                       (str name " has owner " owner)))
                                (format-list {:separator ",\n  "}))
                           ".\n\nValid owners are: \n   "
                           (->> mission
                                :teams
                                (map :team)
                                (map (fn [team]
                                       (str (:name team)
                                            " ("
                                            (:who team)
                                            ")")))
                                (format-list {:separator ",\n  "}))
                           ".")
                      {:reason            :invalid-airbase-owner
                       :omit-stack-trace? true})))))

(defn- report-squadrons-without-airbases
  "Issue warnings for any squadrons that have no airbases."
  [mission]
  (let [problems (for [[airbase squadrons] (::squadrons mission)
                       squadron squadrons
                       :when (nil? (squadron-airbase mission squadron))]
                   squadron)]
    (when-not (empty? problems)
      (progress/step-warn
       (str "The following squadrons have no associated airbase: "
            (->> problems
                 (map (fn [{:keys [owner name]}]
                        (str name " (" (team-name mission owner) ")")))
                 format-list)
            ". Squadrons without an associated airbase are known to cause instability (crashes) in multiplayer flight. The recommended fix is to use Mission Commander to delete and recreate the corrupt squadrons and all associated flights. Please also help the dev team find the source of this bug by reporting it on the BMS website.")))))

(defn- fixup-mission
  "Repair any problems with mission, issuing warnings along the way."
  [mission]
  (progress/with-step "Verifying mission integrity"
    (fn []
      (report-squadrons-without-airbases mission)
      (report-airbases-with-invalid-owner mission)
      mission)))

(defn- postprocess-mission
  "Add in some computed information to the mission from a raw, just-loaded version"
  [mission]
  (let [calc (fn [mission k f]
               (assoc mission k (f mission)))]
    ;; All of this is a bit goofy: I have to thread these through
    ;; because there are places where one type of entity contains
    ;; another. I probably should fix up the representation so that
    ;; everything is by reference instead, probably by ID. Or switch
    ;; to using a real database.
    (-> mission
        (assoc :map-image (im/make-descriptor mission
                                              "resource/campmap"
                                              "BIG_MAP_ID"))
        (calc ::objectives objectives)
        (calc ::squadrons squadrons)
        (calc ::airbases airbases)
        (calc ::flights flights)
        (calc ::carriers carriers)
        (calc ::army-bases army-bases)
        (calc ::weapons weapons)
        fixup-mission)))

(defn- read-ppt-data
  [installation theater]
  (let [dir  (campaign-dir installation theater)
        path (fs/path-combine dir "ppt.ini")]
    (progress/with-step (str "Reading PPT.INI from " dir)
      #(->> path
            fs/file-text
            str/split-lines
            (map str/trim)
            (remove str/blank?)
            (map (fn [line]
                   (str/split line whitespace 3)))
            (mapv (fn [[id radius description]]
                    {:id          id
                     :radius-ft   (util/str->float radius)
                     :description description}))))))

(s/fdef read-mission
  :args (s/cat :installs Installs :path Path)
  :ret Mission)

;; TODO: Consider renaming this read-database, and referring to the resulting object
;; as the database.
(defn read-mission
  "Given a path to a mission (.cam/.tac/.trn) file, read,
  parse, and return it."
  [installs path]
  (let [install-dir   (progress/with-step "Locating installation directory"
                        #(find-install-dir path))
        installation  (progress/with-step (str "Scanning Falcon installation at " install-dir)
                        #(load-installation install-dir))
        theater       (progress/with-step "Determining theater"
                        #(find-theater installation path))
        campaign-dir  (campaign-dir installation theater)
        strings       (progress/with-step "Reading theater strings"
                        #(read-strings-file campaign-dir))
        database      (progress/with-step "Reading theater data"
                        #(assoc (load-initial-database installation theater)
                                :strings strings))
        mission-files (progress/with-step (str "Reading mission files from " path)
                        #(read-embedded-files path database))

        {:keys [theater-name scenario]} (->> mission-files :campaign-info)

        names          (progress/with-step "Reading theater names"
                         #(read-strings campaign-dir theater-name))
        scenario-file  (str scenario (extension path))
        scenario-path  (fs/path-combine (fs/parent path) scenario-file)
        scenario-files (progress/with-step (str "Reading scenario file: "
                                                scenario-file)
                         #(read-embedded-files scenario-path database))
        ppt-data       (read-ppt-data installation theater)
        mission        (merge database
                              mission-files
                              ;; TODO: Figure out if we need to merge persistent objects
                              {:objectives         (merge-objective-deltas
                                                    (:objectives scenario-files)
                                                    (:objective-deltas mission-files))
                               :scenario-files     scenario-files
                               :path               path
                               :names              names
                               :installation       installation
                               ;; Installations are the names of the
                               ;; installations this mission might be in.
                               ;; E.g. 4.33 UI and 4.33. We have to get help
                               ;; from the user, since there's no way to tell
                               ;; a priori
                               :installs           installs
                               :candidate-installs (->> installs
                                                        (filter (fn [[name dir]]
                                                                  (and (fs/exists? dir)
                                                                       (fs/exists? install-dir)
                                                                       (fs/identical? dir install-dir))))
                                                        (into {}))
                               :mission-name       (fs/basename path)
                               :theater            theater
                               :ppt-data           ppt-data})]
    (postprocess-mission mission)))

(defn mission->briefing
  "Converts a mission to a 'briefing', which is a serializable version
  of the mission, containing everything needed to rehydrate the
  mission later."
  [mission install-id build-info]
  (merge {:theaterdef-name (theaterdef-name mission)
          :extension       (or (some-> mission :original-briefing :extension)
                               (-> mission :path extension))
          :install-id      install-id
          :build-info      build-info}
         (select-keys mission (concat (vals file-types) [:mission-name :ppt-data]))))

(defn briefing->mission
  "Loads a mission given a briefing (see `mission->briefing`)."
  [installs briefing]
  (let [{:keys [theaterdef-name
                install-id]} briefing
        ;; This is to handle a bug that I fixed in 20bf6b0
        install-id           (if (string? install-id)
                               install-id
                               (first install-id))
        install-dir          (progress/with-step (str "Looking for installation of BMS version '"
                                                      install-id
                                                      "'.")
                               (fn []
                                 (or (get installs install-id)
                                     (throw (ex-info "Not found"
                                                     {:reason            ::install-not-found
                                                      :omit-stack-trace? true
                                                      :installs          installs
                                                      :install-id        install-id})))))
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
        scenario-files       (progress/with-step (str "Reading scenario file: " scenario-file)
                               (fn []
                                 (read-embedded-files scenario-path database)))
        mission              (merge database
                                    briefing
                                    ;; TODO: Figure out if we need to merge persistent objects
                                    {:objectives        (merge-objective-deltas
                                                         (:objectives scenario-files)
                                                         (:objective-deltas briefing))
                                     :scenario-files    scenario-files
                                     :names             names
                                     :installation      installation
                                     :theater           theater
                                     ;; We re-read the PPT data from the theater, even
                                     ;; though it should be present in the briefing.. We
                                     ;; should probably compare it and figure out what to do
                                     ;; if they're different.
                                     :ppt-data          (read-ppt-data installation theater)
                                     :original-briefing briefing})]
    (postprocess-mission mission)))


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
                 :radar-data   (reify octet.spec/ISpec
                                 (read [_ buf pos]
                                   ;; It was crashing in Balkans when a 17 would appear as the
                                   ;; flag, even though the FreeFalcon source indicates a non-zero
                                   ;; number for the present of detection ratios. It might be that
                                   ;; BMS overloads that number to mean something else, or just a
                                   ;; weirdness in the Balkans databae.
                                   (let [[flag-size flag-val]
                                         (buf/read* buf buf/byte {:offset pos})]
                                     (cond
                                       (and (= 1 flag-val)
                                            (<= (octet.buffer/get-capacity buf) (+ flag-size pos)))
                                       (do
                                         ;; In one of the Balkans versions, the flag would be 1,
                                         ;; but at the end of the buffer where there was no room
                                         ;; for the radar data to appear.
                                         (progress/step-warn "Radar data flag indicates presence of radar detection ratios, but reading them would cause a buffer overflow. This appears to be a data integrity issue in the mission files. Proceeding under the assumption that radar detection ratios are not present.")
                                         [flag-size
                                          {:has-radar-data 0}])

                                       (= 1 flag-val)
                                       (let [[ratio-size ratio-val]
                                             (buf/read* buf
                                                        (buf/repeat c/NUM_RADAR_ARCS buf/float)
                                                        {:offset (+ pos flag-size)})]
                                         [(+ flag-size ratio-size)
                                          {:has-radar-data flag-val
                                           :detect-ratio ratio-val}])

                                       :else
                                       [flag-size {:has-radar-data flag-val}]))))]))

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
      (log/debug "read objectives"
                 :num-objectives num-objectives
                 :compressed-size compressed-size
                 :uncompressed-size uncompressed-size)
      (let [r (buf/read data
                        (buf/repeat num-objectives
                                    (apply buf/spec objective-fields)))]
        (log/debug "Done reading objectives")
        r))))

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
  (buf/read buf (fixed-string length) {:offset offset}))

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
  (let [version-string (buf/read buf (fixed-string length) {:offset offset})]
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
  (let [{:keys [::airbases
                ::carriers
                ::army-bases]} mission]
    (vec (concat airbases carriers army-bases))))

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

;; Bunch of ideas:
;;
;; Things like having a name or being able to be turned into a string
;; should be protocols. The read functions should therefore return
;; records for something like airbases, squadarons, etc.
