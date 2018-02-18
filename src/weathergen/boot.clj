(ns weathergen.boot
  {:boot/export-tasks true}
  (:require [boot.core         :as c]
            [clojure.data.json :as json]
            [clojure.java.io   :as io]))

(defn- fixup-source
  [in-file out-file]
  #_(println :length (.length in-file)
           :in-file in-file
           :out-file out-file)
  (io/make-parents out-file)
  (with-open [w (io/writer out-file)]
    (-> in-file
        io/reader
        json/read
        (update "sources"
                (fn [sources]
                  (let [sources2
                        (->> sources
                             (map (fn [source]
                                    (-> source io/file .getName))))]
                    #_(println "Updated sources to " sources2 "in" in-file)
                    sources2)))
        (json/write w))))

;; Because Boot uses filesets and does all its compiling in temp
;; directories, we get weird absolute paths in our output that don't
;; actually point to the source files. By making them relative
;; instead, the map files should be able to port to their new
;; locations.
(c/deftask fixup-source-maps
  "Fix the paths in ClojureScript source maps."
  []
  (let [tmp (c/tmp-dir!)]
    (fn middleware [next-handler]
      (fn handler [fileset]
        (c/empty-dir! tmp)
        (let [in-files (c/input-files fileset)
              map-files (c/by-ext [".js.map"] in-files)]
          (doseq [in map-files]
            (let [in-file (c/tmp-file in)
                  in-path (c/tmp-path in)
                  out-path in-path
                  out-file (io/file tmp out-path)]
              (fixup-source in-file out-file)))
          (-> fileset
              (c/add-resource tmp)
              c/commit!
              next-handler))))))
