(ns weathergen.falcon.files.resources
  (:require [octet.core :as buf]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]
            [weathergen.falcon.constants :as c]
            [weathergen.falcon.files :refer [fixed-string larray read->]]
            [weathergen.filesystem :as fs]))

;; There's an .idx and a .rsc. They are paired. The idx contains
;; information about what's in the RSC, which is just a couple of
;; header items and then a big chunk of data. For images, for example,
;; there's an offset to image data and then an offset to palette data.

;; ;; .rsc
;; (buf/spec :size buf/int32
;;           :version buf/int32
;;           :data (buf/repeat size buf/byte))

(def image-header
  (buf/spec
   :id (fixed-string 32)
   :flags buf/int32
   :center-x buf/int16
   :center-y buf/int16
   :w buf/int16
   :h buf/int16
   :image-offset buf/int32
   :palette-size buf/int32
   :pallete-offset buf/int32))

(def sound-header
  (buf/spec
   :id (fixed-string 32)
   :flags buf/int32
   :channels buf/int16
   :sound-type buf/int16
   :offset buf/int32
   :header-size buf/int32))

(def flat-header
  (buf/spec
   :id (fixed-string 32)
   :offset buf/int32
   :size buf/int32))

;; Ref: todo
(defn read-idx
  "Read, parse, and return the idx file at `path`."
  [path]
  (let [buf (fs/file-buf path)]
    (binding [octet.buffer/*byte-order* :little-endian]
      (let [[header-size {:keys [size]}]
            (buf/read* buf (buf/spec :size buf/int32
                                     :version buf/int32))]
        (loop [entries []
               offset header-size]
          (if-not (pos? (- size offset))
            entries
            (let [[datasize data]
                  (read-> buf
                          offset
                          (constantly (buf/spec :type
                                                buf/int32))
                          (fn [{:keys [type]}]
                            (condp = type
                              c/_RSC_IS_IMAGE_ image-header
                              c/_RSC_IS_SOUND_ sound-header
                              c/_RSC_IS_FLAT_  flat-header)))]
              (recur (conj entries data)
                     (+ offset datasize)))))))))

