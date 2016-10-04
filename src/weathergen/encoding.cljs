(ns weathergen.encoding
  "A library for encoding values for use across web worker
  boundaries."
  (:require [cognitect.transit :as transit])
  (:require-macros [weathergen.cljs.macros :refer [with-time]]))

(def encoder (transit/writer :json))
(def decoder (transit/reader :json))

(defn encode
  [val]
  (with-time "Encoding"
    (transit/write encoder val)))

(defn decode
  [val]
  (with-time "Decoding"
    (transit/read decoder val)))

