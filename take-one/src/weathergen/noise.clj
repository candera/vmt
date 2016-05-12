(ns weathergen.noise
  "Functions for generating pseudorandom noise fields")

(defn bit-rotate-left
  [x n]
  (let [high-bits (bit-shift-right x n)
        low-bits (-> x (- high-bits) bit-shift-left n)]
    (+ high-bits low-bits)))

(defn scramble
  "Maps x onto a 32-bit integer in a highly non-linear way"
  [x]
  ;; Inspired by Murmur3
  (-> x
      (unchecked-multiply-int 0xcc9e2d51)
      (bit-rotate-left 15)
      (unchecked-multiply-int 0x1b873593)))

(defn discrete-noise
  [x y]
)

