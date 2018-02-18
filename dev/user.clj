(ns user
  (:require [clojure.java.io :as io]
            [clojure.pprint :as pprint :refer [pprint]]
            [clojure.repl :refer :all]
            [clojure.set :as set]
            ;; [clojure.spec :as s]
            [clojure.string :as str]
            [clojure.tools.namespace.repl :refer [refresh]]
            [cognitect.transit :as transit]
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


