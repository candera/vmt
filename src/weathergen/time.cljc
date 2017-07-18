(ns weathergen.time
  "Library for converting and manipulating time.")

(defn campaign-time->ms
  "Converts a campaign time map to a long - a time in milliseconds."
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

(defn ms->campaign-time
  "Converts a time in milliseconds to a campaign time map."
  [data]
  (let [d (-> data (/ 24 60 60 1000) long)
        h (-> data (mod (* 24 60 60 1000)) (/ 60 60 1000) long)
        m (-> data (mod (* 60 60 1000)) (/ 60 1000) long)
        s (-> data (mod (* 60 1000)) (/ 1000) long)
        ms (mod data 1000)]
    {:day (inc d)
     :hour h
     :minute m
     :second s
     :millisecond ms}))

(defn minutes->campaign-time
  "Converts a time in minutes to a campaign time map."
  [min]
  (let [d (-> min (/ 24 60) Math/floor int)
        h (-> min (mod (* 24 60)) (/ 60) Math/floor int)
        m (-> min (mod 60) Math/floor int)]
    {:day (inc d)
     :hour h
     :minute m}))

(defn campaign-time->minutes
  "Converts from Falcon time to a weather-space time coordinate."
  [t]
  (let [{:keys [day hour minute]} t]
    (-> day dec (* 24) (+ hour) (* 60) (+ minute))))

(defn add-minutes
  "Adds minutes to a Falcon time map."
  [t min]
  (-> t campaign-time->minutes (+ min) minutes->campaign-time))

(defn difference-hms
  "Returns a difference in hours, minutes, and seconds (in a map) between two campaign times"
  [t1 t2]
  (let [{:keys [day hour] :as t} (ms->campaign-time  (- (campaign-time->ms t2)
                                                        (campaign-time->ms t1)))]
    (-> t
        (dissoc :day)
        (update :hour + (* 24 (dec day))))))
