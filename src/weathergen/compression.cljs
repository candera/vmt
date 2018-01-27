(ns weathergen.compression
  "Provices compression/decompression functions.")

(def ^js/zlib zlib (js/require "zlib"))

(defn compress
  "Compresses a buffer, returing a new buffer with the compressed
  data."
  [buf]
  (.gzipSync zlib buf))

(defn decompress
  "Decompresses a buffer, returning a new buffer with the expanded
  data."
  [buf]
  (.gunzipSync zlib buf))


