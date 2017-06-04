(ns weathergen.encoding
  "A library for encoding values for use across web worker
  boundaries."
  (:require
   ;; Pako dependency comes in from ui.cljs. Can't remember why I had
   ;; to do it that way. Pako can be removed once we no longer have
   ;; the ability to link out to shared forecasts. Along with most of
   ;; the functions in this namespace.
   ;;[cljsjs.pako]
            [cognitect.transit :as transit]
            [goog.crypt.base64 :as base64])
  (:require-macros [weathergen.cljs.macros :refer [with-time]]))

(def encoder (transit/writer :json))
(def decoder (transit/reader :json))

(defn deflate
  [data]
  (.deflate js/pako data))

(defn deflate-string
  [data]
  (.deflate js/pako data #js {:to "string"}))

(defn inflate
  [data]
  (.inflate js/pako data))

(defn inflate-string
  [data]
  (.inflate js/pako data #js {:to "string"}))

(defn encode
  [val]
  (transit/write encoder val))

(defn decode
  [val]
  (transit/read decoder val))

(defn data->base64
  [data]
  (-> data
      encode
      deflate
      (base64/encodeByteArray true)))

(defn base64->data
  [b64]
  (-> b64
      base64/decodeStringToUint8Array
      inflate-string
      decode))


