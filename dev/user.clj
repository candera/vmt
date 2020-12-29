(ns user
  (:require [clojure.java.io :as io]
            [clojure.pprint :as pprint :refer [pprint]]
            [clojure.repl :refer :all]
            [clojure.set :as set]
            [clojure.spec.alpha :as s]
            [clojure.spec.test.alpha :as stest]
            [clojure.string :as str]
            [clojure.tools.namespace.repl :refer [refresh]]
            [cognitect.transit :as transit]
            [expound.alpha :as expound]
            [garden.core :refer [css]]
            [garden.selectors :as css-sel]
            [lsobot.acmi :as acmi]
            [octet.core :as buf]
            [taoensso.timbre :as log]
            [weathergen.compression :as compress]
            [weathergen.coordinates :as coords]
            [weathergen.dtc :as dtc]
            [weathergen.encoding :as encoding]
            [weathergen.fmap :as fmap]
            [weathergen.falcon.constants :as c]
            [weathergen.falcon.files.mission :as mission]
            [weathergen.falcon.files.mission.xml :as xml]
            [weathergen.falcon.files.resources :as resources]
            [weathergen.filesystem :as fs]
            [weathergen.falcon.files.images :as im]
            [weathergen.lzss :as lzss]
            [weathergen.math :as math]
            [weathergen.model :as model]
            [weathergen.time :as time]
            [weathergen.util :as util]))

#_(defn cljs
  []
  (start-figwheel!)
  (cljs-repl))

#_(in-ns 'boot.user)

(def installs (-> "/Users/candera/Library/Application Support/craigandera.org/VMT/settings.edn"
                  slurp
                  read-string
                  :installations))

(def smpu-old
  (delay
   (log/debug "Reading SMPU...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/SMPU-Day  3 00 41 48.cam")]
     (log/debug "Done reading.")
     mission)))

(def smpu
  (delay
   (log/debug "Reading SMPU...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.33.3/Data/Add-On Korea EM1989 v2/Campaign/SMPU-Day  1 23 55 48.cam")]
     (log/debug "Done reading.")
     mission)))

(def save2
  (delay
   (log/debug "Reading save2...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/save2.cam")]
     (log/debug "Done reading.")
     mission)))

(def stratus-te
  (delay
   (log/debug "Reading stratus.tac...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/stratus.tac")]
     (log/debug "Done reading.")
     mission)))

(def te-new
  (delay
   (log/debug "Reading te_new.tac...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/te_new.tac")]
     (log/debug "Done reading.")
     mission)))

(def wnpu
  (delay
   (log/debug "Reading WNPU...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.33.3/Data/Add-On Korea Strong DPRK/Campaign/WNPU-Day  1 21 07 12.cam")]
     (log/debug "Done reading.")
     mission)))

(def ito
  (delay
   (log/debug "Reading ITO...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.33.3/Data/Add-On Israel/campaign/Solid Truss Start.cam")]
     (log/debug "Done reading.")
     mission)))

(def balkans
  (delay
   (log/debug "Reading Balkans...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.33.3/Data/Add-On Balkans/Campaign/Powder Keg Start.cam")]
     (log/debug "Done reading.")
     mission)))

(def fnpu
  (delay
   (log/debug "Reading FNPU...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.33.3/Data/Campaign/SAVE/FNPU-Day  1 05 12 15.cam")]
     (log/debug "Done reading.")
     mission)))

(def ffw
  (delay
   (log/debug "Reading Custom 1st VFW theater...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.33.3/Data/Add-On 1st VFW/Campaign/Save/Rolling Fire Start.cam")]
     (log/debug "Done reading.")
     mission)))

(def mantis
  (delay
   (log/debug "Reading 4.34 mission...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.34/Data/Campaign/MantisAtDawn-Day  1 18 30 05.cam")]
     (log/debug "Done reading.")
     mission)))

(def tiger-spirit
  (delay
   (log/debug "Reading 4.34 mission...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.34/Data/Campaign/Tiger Spirit-Day 1 08 15 42.cam")]
     (log/debug "Done reading.")
     mission)))

(def iron-fortress
  (delay
   (log/debug "Reading 4.34 mission...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.34/Data/Campaign/Iron Fortress-Day  1 08 00 04.cam")]
     (log/debug "Done reading.")
     mission)))

(def rolling-fire
  (delay
   (log/debug "Reading 4.34 mission...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.34/Data/Campaign/Rolling Fire-Day  1 05 00 07.cam")]
     (log/debug "Done reading.")
     mission)))


(def bear-trap
  (delay
   (log/debug "Reading 4.34 mission...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.34/Data/Campaign/Bear Trap-Day  1 12 00 04.cam")]
     (log/debug "Done reading.")
     mission)))

(def double-dragon
  (delay
   (log/debug "Reading 4.34 mission...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.34/Data/Campaign/Double Dragon-Day  1 16 00 04.cam")]
     (log/debug "Done reading.")
     mission)))

(def generic-te
  (delay
   (log/debug "Reading 4.34 mission...")
   (let [mission (mission/read-mission
                  installs
                  "/Users/candera/falcon/4.34/Data/Campaign/generic.tac")]
     (log/debug "Done reading.")
     mission)))

(defn smoke-test
  []
  (map :mission-name [@balkans @ito @wnpu @te-new @stratus-te @save2 @smpu @smpu-old]))

(defn read-briefing
  [path]
  (-> path
      io/input-stream
      java.util.zip.GZIPInputStream.
      (transit/reader :json)
      transit/read))

(defn dump-mission
  [mission dir]
  (->> mission
       :class-table
       util/csv-ize
       (spit (fs/path-combine dir "class-table.csv")))
  (->> mission
       :vehicle-class-data
       util/csv-ize
       (spit (fs/path-combine dir "vehicle-classes.csv")))
  (->> mission
       :objectives
       util/csv-ize
       (spit (fs/path-combine dir "objectives.csv")))
  (->> mission
       :objective-class-data
       util/csv-ize
       (spit (fs/path-combine dir "objective-classes.csv")))
  (->> mission
       :units
       util/csv-ize
       (spit (fs/path-combine dir "units.csv")))
  (->> mission
       :unit-class-data
       util/csv-ize
       (spit (fs/path-combine dir "unit-classes.csv"))))

(defn expound-explainer
  [data]
  (if (nil? data)
    (println "Success!")
    (expound/printer data)))

(defn rebl
  []
  (require '[cognitect.rebl])
  (let [f (resolve 'cognitect.rebl/ui)]
    (f)))

(defn inspect
  [x]
  (require '[cognitect.rebl])
  (eval `(cognitect.rebl/inspect ~x)))

(defmacro inspect
  [x]
  `(do
     (require '[cognitect.rebl])
     (cognitect.rebl/inspect ~x)))

#_(set! s/*explain-out* expound/printer)
#_(alter-var-root #'s/*explain-out* expound-explainer)

#_(stest/instrument)

(def weather-params
    {:temp-uniformity      0.7
   :pressure             {:min 28 :max 31 :variance 1.2 :speed 100}
   ;; From Ahmed, cell count is a function of theater size:
   ;; #define CELLSIZE  57344
   ;; #define FMAP_CELLS_FROM_SIZE(s) round(floor((s*1000)*3.28084 / (double)CELLSIZE +1))
   :cell-count           [59 59]
   :feature-size         10
   :categories           {:sunny     {:weight     50
                                      :wind       {:min 5 :mean 10 :max 30}
                                      :temp       {:min 20 :mean 22 :max 24}
                                      :visibility {:from 15 :to 30}}
                          :fair      {:weight     50
                                      :wind       {:min 0 :mean 7 :max 20}
                                      :temp       {:min 18 :mean 21 :max 23}
                                      :visibility {:from 10 :to 30}
                                      :low-clouds {:base     {:from 3000 :to 10000}
                                                   :size     {:from 0 :to 5}
                                                   :coverage {:from :few :to :broken}
                                                   :towering 0.48}}
                          :poor      {:weight     50
                                      :wind       {:min 10 :mean 15 :max 30}
                                      :temp       {:min 15 :mean 18 :max 21}
                                      :visibility {:from 2 :to 10}
                                      :low-clouds {:base     {:from 0 :to 10000}
                                                   :size     {:from 0 :to 5}
                                                   :coverage {:from :scattered
                                                              :to   :overcast}
                                                   :towering 0.35}}
                          :inclement {:weight     50
                                      :wind       {:min 15 :mean 25 :max 60}
                                      :temp       {:min 12 :mean 14 :max 16}
                                      :visibility {:from 15 :to 30}
                                      :low-clouds {:base     {:from 0 :to 10000}
                                                   :size     {:from 0 :to 5}
                                                   :coverage {:from :scattered
                                                              :to   :overcast}
                                                   :towering 0.25}}}
   :winds-aloft          {3000  {:speed {:from 2 :to 3}
                                 :bias  0.1}
                          6000  {:speed {:from 4 :to 6}
                                 :bias  0.2}
                          9000  {:speed {:from 7 :to 9}
                                 :bias  0.3}
                          12000 {:speed {:from 8 :to 12}
                                 :bias  0.4}
                          18000 {:speed {:from 11 :to 13}
                                 :bias  0.5}
                          24000 {:speed {:from 13 :to 17}
                                 :bias  0.6}
                          30000 {:speed {:from 16 :to 18}
                                 :bias  0.7}
                          40000 {:speed {:from 18 :to 22}
                                 :bias  0.8}
                          50000 {:speed {:from 20 :to 25}
                                 :bias  0.9}}
   :turbulence           {:size 1 :power 250}
   :origin               [1000 1000]
   :evolution            3600
   :time                 {:offset  1234
                          :current {:day 1 :hour 5 :minute 0}
                          :max     nil}
   :wind-uniformity      0.7
   :crossfade            0.1
   :prevailing-wind      {:heading 325}
   :seed                 1234
   :weather-overrides    [#_{:location               {:x 22
                                                      :y 45}
                             :radius                 10
                             :falloff                5
                             :animate?               false
                             :begin                  {:day 1 :hour 5 :minute 0}
                             :peak                   {:day 1 :hour 6 :minute 0}
                             :taper                  {:day 1 :hour 8 :minute 0}
                             :end                    {:day 1 :hour 9 :minute 0}
                             :pressure               28.5
                             :strength               1
                             :show-outline?          false
                             :exclude-from-forecast? false
                             :editing?               false}]}
  #_{:temp-uniformity      0.7
   :pressure             {:min 28 :max 31 :variance 1.2 :speed 100}
   ;; From Ahmed, cell count is a function of theater size:
   ;; #define CELLSIZE  57344
   ;; #define FMAP_CELLS_FROM_SIZE(s) round(floor((s*1000)*3.28084 / (double)CELLSIZE +1))
   :cell-count           [59 59]
   :feature-size         10
   :categories           {:sunny     {:weight     50
                                      :wind       {:min 5 :mean 10 :max 30}
                                      :temp       {:min 20 :mean 22 :max 24}
                                      :visibility {:from 15 :to 30}}
                          :fair      {:weight     50
                                      :wind       {:min 0 :mean 7 :max 20}
                                      :temp       {:min 18 :mean 21 :max 23}
                                      :visibility {:from 10 :to 30}
                                      :low-clouds {:base     {:from 3000 :to 10000}
                                                   :size     {:from 0 :to 5}
                                                   :coverage {:from :few :to :broken}}}
                          :poor      {:weight     50
                                      :wind       {:min 10 :mean 15 :max 30}
                                      :temp       {:min 15 :mean 18 :max 21}
                                      :visibility {:from 2 :to 10}
                                      :low-clouds {:base     {:from 0 :to 10000}
                                                   :size     {:from 0 :to 5}
                                                   :coverage {:from :scattered
                                                              :to   :overcast}}}
                          :inclement {:weight     50
                                      :wind       {:min 15 :mean 25 :max 60}
                                      :temp       {:min 12 :mean 14 :max 16}
                                      :visibility {:from 15 :to 30}
                                      :low-clouds {:base     {:from 0 :to 10000}
                                                   :size     {:from 0 :to 5}
                                                   :coverage {:from :scattered
                                                              :to   :overcast}}}}
   :winds-aloft          {3000  {:speed {:from 2 :to 3}
                                 :bias  0.1}
                          6000  {:speed {:from 4 :to 6}
                                 :bias  0.2}
                          9000  {:speed {:from 7 :to 9}
                                 :bias  0.3}
                          12000 {:speed {:from 8 :to 12}
                                 :bias  0.4}
                          18000 {:speed {:from 11 :to 13}
                                 :bias  0.5}
                          24000 {:speed {:from 13 :to 17}
                                 :bias  0.6}
                          30000 {:speed {:from 16 :to 18}
                                 :bias  0.7}
                          40000 {:speed {:from 18 :to 22}
                                 :bias  0.8}
                          50000 {:speed {:from 20 :to 25}
                                 :bias  0.9}}
   :turbulence           {:size 1 :power 250}
   :origin               [1000 1000]
   :evolution            3600
   :time                 {:offset  1234
                          :current {:day 1 :hour 5 :minute 0}
                          :max     nil}
   :wind-uniformity      0.7
   :crossfade            0.1
   :prevailing-wind      {:heading 325}
   :seed                 1234
   :weather-overrides    []})

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

