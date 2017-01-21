(ns weathergen.lzss
  "Library for compressing and decompressing data using the LZSS
  algorithm."
  (:require [octet.buffer :as buffer]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]))

;; LZSS.CPP
;; #define INDEX_BIT_COUNT      12
;; #define LENGTH_BIT_COUNT     4
;; #define WINDOW_SIZE          ( 1 << INDEX_BIT_COUNT ) = 4096
;; #define RAW_LOOK_AHEAD_SIZE  ( 1 << LENGTH_BIT_COUNT ) = 16
;; #define BREAK_EVEN           ( ( 1 + INDEX_BIT_COUNT + LENGTH_BIT_COUNT ) / 9 ) = 1.8888 ??
;; #define LOOK_AHEAD_SIZE      ( RAW_LOOK_AHEAD_SIZE + BREAK_EVEN ) = 4098? 4097?
;; #define TREE_ROOT            WINDOW_SIZE = 16
;; #define END_OF_STREAM        0
;; #define UNUSED               0
;; #define MOD_WINDOW( a )      ( ( a ) & ( WINDOW_SIZE - 1 ) )

;; lzss.java
;; RING_SIZE = 4096
;; MAX_STORE_LENGTH = 18;
;; THRESHOLD = 3
;; NOT_USED = RING_SIZE;
;; buffer is RING_SIZE + MAX_STORE_LENGTH + 1 long

(def ring-buffer-size 4096)
(def break-even 2) ; TODO: Should this be 2?

;; The algorithm is pretty simple. All reads from input are copied to
;; a ring buffer. We read a code word, which contains 8 bits. Each bit
;; tells us what to do on each of 8 reads. If the bit is 1, we simply
;; copy one byte of the input to the output. If it's 0, then we read
;; 12 bits of position and 4 bits of length. We add one to the length
;; and then copy that many bytes to the output from the ring buffer at
;; the specified position. Copied bytes are also written to the ring
;; buffer.
(defn expand
  "Expands compressed data in buffer `input`, in positions indicated
  by `offset` and `length`. Returns a buffer of size `output-length`."
  [input offset input-length output-length]
  (let [output (buffer/allocate output-length)
        ring-buf (buffer/allocate ring-buffer-size)]
    (loop [input-pos offset      ; Where we are in the input.
           code-bit 0            ; Which bit of the code word we're on
           code-byte nil         ; The code word
           output-pos 0]
      #_(log/debug :input-pos input-pos
                   :code-bit code-bit
                   :code-byte code-byte
                   :output-pos output-pos)
      (if (<= output-length output-pos)
        output
        (let [code-bit* (mod code-bit 8)
              code-byte (if (zero? code-bit*)
                          (buffer/read-byte input input-pos)
                          code-byte)
              input-pos (if (zero? code-bit*)
                          (inc input-pos)
                          input-pos)]
          #_(log/debug :code-bit* code-bit*
                     :code-bit code-bit
                     :code-byte code-byte
                     :input-pos input-pos)
          (if (bit-test code-byte code-bit*)
            ;; Copy a single byte from input
            (let [data (buffer/read-byte input input-pos)]
              #_(log/debug "single byte copy"
                         :data data
                         :input-pos input-pos
                         :output-pos output-pos
                         :ring-pos (mod (inc output-pos) ring-buffer-size))
              (buffer/write-byte output output-pos data)
              (buffer/write-byte ring-buf (mod (inc output-pos) ring-buffer-size) data)
              (recur (inc input-pos)
                     (inc code-bit)
                     code-byte
                     (inc output-pos)))
            ;; Copy from the ring buffer
            (let [data0 (buffer/read-ubyte input input-pos)
                  data1 (buffer/read-ubyte input (inc input-pos))
                  pos (+ data1 (bit-shift-left (bit-and data0 0x0f) 8))
                  len (+ break-even (bit-shift-right data0 4))]
              ;; Comment from Lightning:
              ;; This if prevents us from overrunning the output buffer if the last
              ;; match we find is longer than the remaining space in the output buffer.
              ;; This might best be fixed in the Compression routine, but it was much
              ;; easier to do here, so...  SCR 11/11/98
              (let [len* (min len (- output-length output-pos 1))]
                #_(log/debug "ring buffer copy"
                           :pos pos
                           :len len
                           :len* len*
                           :data0 data0
                           :data1 data1)
                (dotimes [i len*]
                  (let [data (buffer/read-byte ring-buf (mod (+ pos i) ring-buffer-size))]
                    #_(log/debug "ring buffer copy" :data data)
                    (buffer/write-byte ring-buf
                                       (mod (+ output-pos i 1) ring-buffer-size)
                                       data)
                    (buffer/write-byte output (+ output-pos i) data)))
                (recur (+ input-pos 2)
                       (inc code-bit)
                       code-byte
                       (+ output-pos len*))))))))))


(comment
  ;; A simple hand-rolled test. Should produce [1 2 3 4 2 3 5 6]
  ;; WRONG! The bit pattern for pos/len is wrong in the below
  (let [input (buf/allocate 100)]
    (require :reload '[weathergen.lzss :as lzss])
    (doseq [[idx data] (map-indexed vector [0x6f 1 2 3 4 1 1 5 6])]
      (octet.buffer/write-byte input idx data))
    (->> (lzss/expand input 0 100 8)
         .array
         (into []))))
