(ns weathergen.falcon.files.images
  (:require [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]
            [octet.core :as buf]
            [weathergen.falcon.constants :as c]
            [weathergen.filesystem :as fs]
            [weathergen.util :as util :refer [has-flag?]]))

(def read-index
  (memoize
   (fn [path]
     #_(log/debug "read-index" :path (pr-str path))
     (let [common-header (buf/spec
                          :type buf/int32
                          :id (buf/string 32))
           image-header  (buf/spec
                          :flags buf/int32
                          :center (buf/repeat 2 buf/int16)
                          :size (buf/repeat 2 buf/int16)
                          :image-offset buf/int32
                          :palette-size buf/int32
                          :palette-offset buf/int32)
           sound-header  (buf/spec
                          :flags buf/int32
                          :channels buf/int16
                          :sound-type buf/int16
                          :offset buf/int32
                          :header-size buf/int32)
           flat-header   (buf/spec
                          :offset buf/int32
                          :size   buf/int32)
           file-header   (buf/spec :size buf/int32
                                   :version buf/int32)
           idx-buf       (fs/file-buf path)]
       (binding [octet.buffer/*byte-order* :little-endian]
         (let [{:keys [size]} (buf/read idx-buf file-header)]
           (loop [offset (buf/size file-header)
                  items []]
             (if-not (-> size (- offset) pos?)
               items
               (let [[size common]    (buf/read* idx-buf common-header
                                                 {:offset offset})
                     offset           (+ offset size)
                     [size specifics] (buf/read* idx-buf
                                                 (condp = (:type common)
                                                   c/_RSC_IS_IMAGE_  image-header
                                                   c/_RSC_IS_SOUND_ sound-header
                                                   c/_RSC_IS_FLAT_  flat-header)
                                                 {:offset offset})]
                 (recur (+ offset size)
                        (conj items (into common specifics))))))))))))

(defn palette
  [image-buf image-data]
  (let [{:keys [palette-size palette-offset]} image-data]
    (binding [octet.buffer/*byte-order* :little-endian]
      (buf/read image-buf
                (buf/repeat palette-size buf/uint16)
                ;; Eight bytes accounts for the size and
                ;; version longs at the beginning of the
                ;; file.
                {:offset (+ palette-offset 8)}))))

;; The fact that we're packing argb into a single arg is a hack due to
;; the limitations of Clojure passing primitives - functions can't
;; have more than four primitive args
(defn read-image
  "Reads image described by `image-descriptor`. `allocator` is a
  function of a width and height. It returns a map of two functions.
  The function under `:set-pixel!` will be called with x, y, and argb
  for each pixel in the image, where argb is a long in 0xAABBGGRR
  format. The function under the `:finalize` key will be called with
  no arguments after all pixels are set. `read-image` returns the
  result of calling the finalize function."
  [mission image-descriptor allocator]
  ;; TODO: Try theater directory first and fall back to Falcon dir
  (let [{:keys [resource
                image-id
                base
                image-data]} image-descriptor
        image-buf            (fs/file-buf (str base ".rsc"))
        palette              (palette image-buf image-data)
        {:keys [palette-size
                palette-offset
                center
                image-offset
                size]}       image-data

        is-8-bit?            (-> image-data :flags (has-flag? c/_RSC_8_BIT_))
        use-transparency?    (-> image-data :flags (has-flag? c/_RSC_USECOLORKEY_))
        [width height]       size]
    (log/debug "read-image" :image-descriptor image-descriptor)
    (when-not (-> image-data :type (= c/_RSC_IS_IMAGE_))
      (throw (ex-info "Not an image" {:reason ::not-an-image})))
    (when (and (not is-8-bit?) (not (-> image-data :flags (has-flag? c/_RSC_16_BIT_))))
      (throw (ex-info "Image is neither 8-bit nor 16-bit" {:reason ::bit-size-unknown})))
    (let [{:keys [set-pixel! finalize]} (allocator width height)
          pixel-bytes                   (if is-8-bit? 1 2)
          read-pixel                    (if is-8-bit?
                                          octet.buffer/read-ubyte
                                          octet.buffer/read-ushort)]
      (binding [octet.buffer/*byte-order* :little-endian]
        ;; TODO: Take out the limits
        (doseq [y (range height)
                x (range width)]
          (let [offset       (+ 8 image-offset (* pixel-bytes (+ x (* y width))))
                c            (read-pixel image-buf offset)
                raw          ^long (if is-8-bit? (nth palette c) c)
                r            ^long (-> raw (bit-shift-right 10) (bit-and 0x1f))
                g            ^long (-> raw (bit-shift-right 5)  (bit-and 0x1f))
                b            ^long (-> raw                      (bit-and 0x1f))
                transparent? (and use-transparency?
                                  (if is-8-bit?
                                    (zero? c)
                                    (= [31 0 31] [r g b])))
                argb         ^long (-> (if transparent? 0 255)
                                       (bit-shift-left 8)
                                       (+ (* b 8))
                                       (bit-shift-left 8)
                                       (+ (* g 8))
                                       (bit-shift-left 8)
                                       (+ (* r 8)))]
            (set-pixel! x y argb))))
      (finalize))))

(defn cache-key
  "Return a string unique to this image. Intended to be used as a key
  for caching across sessions."
  [image-descriptor]
  (let [{:keys [resource image-id art-dir idx-size idx-modified rsc-size rsc-modified]}
        image-descriptor]
    (str art-dir
         "/"
         resource
         "/"
         image-id
         "/"
         idx-size "-" idx-modified
         "-"
         rsc-size "-" rsc-modified)))

(defn make-descriptor
  "Creates an image descriptor."
  [mission resource image-id]
  (let [data-dir          (-> mission :installation :data-dir)
        theater-art-dir   (-> mission :theater :art-dir)
        install-art-dir   (-> mission :installation :art-dir)

        theater-resource  (fs/path-combine data-dir
                                           theater-art-dir
                                           resource)
        install-resource  (fs/path-combine data-dir
                                           install-art-dir
                                           resource)
        theater-resource? (fs/exists? (str theater-resource ".idx"))
        resource-art-dir  (if theater-resource?
                            theater-art-dir
                            install-art-dir)
        base     (fs/path-combine data-dir
                                  (if theater-resource?
                                    theater-resource
                                    install-resource))
        idx-path          (str base ".idx")
        rsc-path          (str base ".rsc")
        idx-stats         (fs/stat idx-path)
        rsc-stats         (fs/stat rsc-path)
        data-dir          (-> mission :installation :data-dir)
        index             (read-index idx-path)
        image-data        (->> index (filter #(= image-id (:id %))) first)
        _                 (assert image-data (with-out-str
                                               (print "Couldn't find an image with that ID"
                                                      :resource resource
                                                      :image-id image-id)))]
    {:image-data    image-data
     :resource      resource
     :image-id      image-id
     :art-dir       resource-art-dir
     :base          base
     :idx-size      (:size idx-stats)
     :idx-modified  (:modified idx-stats)
     :rsc-size      (:size rsc-stats)
     :rsc-modified  (:modified rsc-stats)}))
