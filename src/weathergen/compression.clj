(ns weathergen.compression
  "Provices compression/decompression functions.")

(defn compress
  "Compresses a buffer, returing a new buffer with the compressed
  data."
  [buf]
  (let [baos (java.io.ByteArrayOutputStream.)
        gzos (java.util.zip.GZIPOutputStream baos)]
    (.write gzos buf)
    (.close gzos)
    (.toByteArray baos)))

(defn decompress
  "Decompresses a buffer, returning a new buffer with the expanded
  data."
  [buf]
  (let [bais (java.io.ByteArrayInputStream. buf)
        gzis (java.util.zip.GZIPInputStream. bais)
        baos (java.io.ByteArrayOutputStream.)
        len  1024
        temp (byte-array 1024)]
    (loop []
      (let [read (.read gzis temp 0 len)]
        (if (neg? read)
          (do
            (.close gzis)
            (.close bais)
            (.toByteArray baos))
          (do
            (.write baos temp 0 read)
            (recur)))))))


