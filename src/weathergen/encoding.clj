(ns weathergen.encoding
  "A library for encoding values for use across web worker
  boundaries."
  (:require [cognitect.transit :as transit]))

(defn encode
  "Encodes `val` as a string."
  [val]
  (let [out (java.io.ByteArrayOutputStream. 4096)
        encoder (transit/writer out :json)]
    (transit/write encoder val)
    (.toString out)))

(defn decode
  "Decodes bytes `buf` into a value."
  [buf]
  (let [in (java.io.ByteArrayInputStream. buf)
        decoder (transit/reader in :json)]
    (transit/read decoder)))
