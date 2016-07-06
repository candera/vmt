(ns weathergen.lzss
  "An implementation of LZSS decoding, and maybe, some day, encoding."
  (:require [clojure.core.async :as async :refer [>!! <!! close!]])
  (:import [java.io InputStream OutputStream]))

(comment "This is a preliminary implementation, and not tested, since
I decided not to manipulate database files directly just yet. See
http://tactical.nekromantix.com/wiki/doku.php?id=falcon4:file_formats:cam_trn_tac:lzss_compression
for the canonical implementation")


;; Java implementation here:
;; https://github.com/pyrophoric/lzss/blob/master/Java/LZSS.java

;; From http://dev.gameres.com/Program/Other/LZSS.C
;;
;; #define N             4096   /* size of ring buffer */
;; #define F               18   /* upper limit for match_length */
;; #define THRESHOLD    2   /* encode string into position and length
;;                                                 if match_length is greater than this */
;; #define NIL                  N       /* index for root of binary search trees */

;; unsigned long int
;;              textsize = 0,   /* text size counter */
;;              codesize = 0,   /* code size counter */
;;              printcount = 0; /* counter for reporting progress every 1K bytes */
;; unsigned char
;;              text_buf[N + F - 1];    /* ring buffer of size N,
;;                      with extra F-1 bytes to facilitate string comparison */
;; int          match_position, match_length,  /* of longest match.  These are
;;                      set by the InsertNode() procedure. */
;;              lson[N + 1], rson[N + 257], dad[N + 1];  /* left & right children &
;;                      parents -- These constitute binary search trees. */
;; FILE *infile, *outfile;  /* input & output files */
;;
;; void Decode(void)    /* Just the reverse of Encode(). */
;; {
;;      int  i, j, k, r, c;
;;      unsigned int  flags;
;;
;;      for (i = 0; i < N - F; i++) text_buf[i] = ' ';
;;      r = N - F;  flags = 0;
;;      for ( ; ; ) {
;;              if (((flags >>= 1) & 256) == 0) {
;;                      if ((c = getc(infile)) == EOF) break;
;;                      flags = c | 0xff00;             /* uses higher byte cleverly */
;;              }                                                       /* to count eight */
;;              if (flags & 1) {
;;                      if ((c = getc(infile)) == EOF) break;
;;                      putc(c, outfile);  text_buf[r++] = c;  r &= (N - 1);
;;              } else {
;;                      if ((i = getc(infile)) == EOF) break;
;;                      if ((j = getc(infile)) == EOF) break;
;;                      i |= ((j & 0xf0) << 4);  j = (j & 0x0f) + THRESHOLD;
;;                      for (k = 0; k <= j; k++) {
;;                              c = text_buf[(i + k) & (N - 1)];
;;                              putc(c, outfile);  text_buf[r++] = c;  r &= (N - 1);
;;                      }
;;              }
;;      }
;; }

(def N 4096)
(def F 18)
(def THRESHOLD 2)

(defn decode
  "Given a channel delivering bytes, puts bytes onto the output
  channel that are the decompressed bytes from it."
  [input output]
  (let [text-buf (char-array (repeat (dec (+ N F)) \space))]
    (loop [r     (- N F)
           flags 0]
      (let [flags (-> flags (bit-shift-right 1) (bit-or 0x100))
            c (<!! input)]
        (if (zero? flags)
          (when c
            (let [flags (bit-or flags 0xff00)]
              (if-not (zero? (bit-and flags 1))
                (let [c (<!! input)]
                  (if (nil? c)
                    (recur r flags)
                    (do
                      (>!! output c)
                      (aset text-buf r c)
                      (recur (-> r inc (mod (dec N))) flags)))))))
          (let [i (<!! input)
                j (<!! input)]
            (when (and i j)
              (let [i (-> j (bit-and 0xf0) (bit-shift-left 4) (bit-or i))
                    j (-> j (bit-and 0x0f) (+ THRESHOLD))]
                (loop [k 0
                       r r]
                  (when (<= k j)
                    (<!! output (aget text-buf (-> i (+ k) (bit-and (dec N)))))
                    (aset text-buf r c)
                    (recur (inc k) (-> r inc (bit-and (dec N))))))))))))
    (close! output)))

;;; Implementation of
;;; http://tactical.nekromantix.com/wiki/doku.php?id=falcon4:file_formats:cam_trn_tac:lzss_compression

;; Constants
(def a 12)
(def b 4)
(def c 0x1000)
(def d 0x10)
(def e 1)
(def f 0x11)
(def g 0x1000)
(def h 0)
(def i 0)

(defn a1
  [a0]
  (bit-and a0 0xfff))

(defn a2
  [a0]
  )

(defn decode2
  ""
  [])
