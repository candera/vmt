(def project 'vmt)

(merge-env!
 :dependencies '[[org.clojure/clojure       "1.10.0"]
                 [org.clojure/clojurescript "1.10.520"]
                 ;;[hoplon "7.2.0"]
                 [jumblerg/hoplon "7.0.4"] ; Official release broken in several ways...

                 ;; [hoplon/boot-hoplon "0.3.0" :scope "test"]
                 [adzerk/boot-cljs          "2.1.5"]
                 [adzerk/boot-reload        "0.6.0"]

                 ;; cljs-repl
                 [adzerk/boot-cljs-repl     "0.4.0" :scope "test"]
                 [cider/piggieback "0.3.9" :scope "test"]
                 [nrepl "0.4.5" :scope "test"]

                 ;;[hoplon/javelin "3.9.0"]

                 [org.clojure/core.async "0.4.490" :exclusions [[org.clojure/tools.reader]]]
                 ;; [tailrecursion/boot-jetty  "0.1.3"]
                 ;; [cljsjs/jquery "3.4.0-0"]
                 [cljsjs/jquery-ui "1.11.4-0"]
                 [org.clojure/data.csv "0.1.4"]
                 [org.clojure/data.json "0.2.6"]
                 [org.clojure/data.xml "0.0.8"]  ; Boot dep, unfortunately
                 ;; [org.clojure/data.xml "0.2.0-alpha6"]
                 [funcool/tubax "0.2.0"]

                 [rum "0.11.3"]
                 [com.cognitect/transit-cljs "0.8.256"]
                 [com.cognitect/transit-clj "0.8.313" :scope "test"]
                 [com.taoensso/timbre "4.10.0"]
                 [hiccups "0.3.0"]
                 ;;[secretary "1.2.3"]
                 ;;[funcool/cuerdas "2.0.0"]
                 ;;[com.cemerick/url "0.1.1"]

                 ;; CLJS REPL dependencies
                 [com.cemerick/piggieback "0.2.2" :scope "test"]
                 [weasel "0.7.0" :scope "test"]
                 [org.clojure/tools.nrepl "0.2.13" :scope "test"]

                 ;; Had to download as the cljsjs one is pretty far out of date
                 ;;[cljsjs/jszip "2.5.0-0"]
                 [cljsjs/pako "0.2.7-0"]
                 [cljsjs/tinycolor "1.4.1-0"]
                 [cljsjs/select2 "4.0.3-1"]
                 [garden "1.3.9"]
                 [funcool/octet "1.1.2"]
                 [org.clojure/core.match "0.3.0"]
                 [org.clojure/tools.namespace "0.2.11" :scope "test"]
                 [quil "3.0.0"]

                 [binaryage/devtools "0.9.10" :scope "test"]
                 [expound "0.7.2" :scope "test"]
                 [org.clojure/test.check "0.10.0-alpha4" :scope "test"]
                 ;;[io.nervous/cljs-nodejs-externs "0.2.0"]
                 ;;[cljsjs/nodejs-externs "1.0.4-1"]
                 ]
 ;; TODO: Really need a way to hook into the repl-server so that dev
 ;; doesn't wind up in the source path for released code.
 :source-paths #{"src" "dev"}
 :asset-paths  #{"assets"}
 :repl-server-port 8728
 :repl-server-name (str project)
 :repl-server-init-ns 'user)

(require
 '[adzerk.boot-cljs         :refer [cljs]]
 '[adzerk.boot-cljs-repl    :refer [cljs-repl start-repl]]
 '[adzerk.boot-reload       :refer [reload]]
 '[hoplon.boot-hoplon       :refer [hoplon prerender]]
 ;; '[tailrecursion.boot-jetty :refer [serve]]
 'complete.core
 '[octet.core :as buf]
 '[clojure.repl :refer :all]
 '[clojure.pprint :refer [pprint]]
 '[weathergen.boot :refer [fixup-source-maps]]
 '[weathergen.falcon.files :as files]
 '[weathergen.filesystem :as fs]
 '[clojure.tools.namespace.repl :refer [refresh]]
 'user)

;; No idea why I have to do this to get things to work.
(clojure.tools.namespace.repl/set-refresh-dirs "src" "dev")

(alter-var-root #'*print-length* (constantly 1000))

(deftask rebl
  []
  (with-pass-thru _
    (merge-env! :source-paths #{"rebl"}
                :dependencies '[[org.openjfx/javafx-fxml     "11.0.1"]
                                [org.openjfx/javafx-controls "11.0.1"]
                                [org.openjfx/javafx-swing    "11.0.1"]
                                [org.openjfx/javafx-base     "11.0.1"]
                                [org.openjfx/javafx-web      "11.0.1"]])))

(deftask dev
  "Build and serve WeatherGen for local development."
  [s source-maps bool "Enable source maps"]
  (comp
   (repl-server)
   (watch :verbose true :exclude #{#"~$" #"^#.*#$" #"^\.#" #"#$"})
   (notify :theme "ordinance"
           :audible true
           ;; :soundfiles {:failure "dev/build-error.mp3"}
           :visual true
           :title "VMT")
   (hoplon)
   ;; Doesn't work with web workers
   ;; Tried this fix from Alan, but it's throwing an exception in the
   ;; global scope code in forecast.html. Which is weird because I
   ;; don't even have that page open.
   #_(reload :ids #{"index.html"}
             ;; :only-by-re [#"^((?!worker).)*$"]
             )
   ;;(cljs-repl :ids #{"index.html"})
   (cljs :ids #{"index.html" "mission.html" "test.html"}
         :optimizations :none
         ;; :optimizations :whitespace
         :compiler-options { ;;:target :nodejs
                            :hashbang false
                            :parallel-build false
                            ;;:externs ["js/slickgrid/slickgrid.ext.js"]
                            :infer-externs false
                            :pretty-print true
                            :pseudo-names true
                            :preloads '[devtools.preload]}
         ;; The problem here is that the .map files have bogus paths
         ;; in them. They're just JSON, though, so it might be worth
         ;; figuring out how to fix them up.
         :source-map (boolean source-maps))
   (cljs :ids #{"worker"}
         ;; :optimizations :none
         :optimizations :whitespace
         :compiler-options { ;;:target :nodejs
                            :hashbang false
                            :parallel-build false
                            ;;:externs ["js/slickgrid/slickgrid.ext.js"]
                            :infer-externs false
                            :pretty-print true
                            :pseudo-names true
                            ;; :preloads '[devtools.preload]
                            }
         :source-map (boolean source-maps))
   (cljs :ids #{"main"}
         :optimizations :none
         ;; :optimizations :simple
         :compiler-options {:asset-path "target/main.out"
                            :closure-defines {'app.main/dev? true}
                            :target :nodejs
                            :hashbang false
                            :parallel-build true
                            :infer-externs false
                            :pretty-print true
                            :pseudo-names true}
         :source-map (boolean source-maps))
   #_(cljs :ids #{"repl"}
         :optimizations :simple
         :compiler-options { ;; :asset-path "target/main.out"
                            ;; :closure-defines {'app.main/dev? true}
                            :externs ["externs.ext.js"]
                            :target :nodejs
                            :hashbang false
                            :parallel-build true
                            :pretty-print true
                            :pseudo-names true}
         :source-map source-maps)
   (fixup-source-maps)
   (target)))

(deftask electron
  "Compile in a way compatible with electron packaging."
  [t target-dir TARGETDIR str "Enable source maps"
   d dev-mode bool "Compile in dev mode"]
  (let [source-maps true
        ;; I suspect that nil is blowing up the compiler
        dev-mode (boolean dev-mode)
        ;; Optimizations apply only to mission UI - main has to comple at simple
        optimizations :simple]
    (comp
     (hoplon)
     (cljs :ids #{"mission.html"}
           :optimizations optimizations
           :compiler-options { ;;:target :nodejs
                              :hashbang false
                              :parallel-build false
                              :externs ["externs.ext.js"]
                              ;;:externs ["js/slickgrid/slickgrid.ext.js"]
                              :infer-externs true
                              :pretty-print dev-mode
                              :pseudo-names dev-mode
                              }
           :source-map source-maps
           )
     (cljs :ids #{"worker" "index.html" #_"mission.html"}
           :optimizations #_:advanced #_:whitespace :simple
           :compiler-options { ;;:target :nodejs
                              :hashbang false
                              :parallel-build false
                              :externs ["externs.ext.js"]
                              ;;:externs ["js/slickgrid/slickgrid.ext.js"]
                              :pretty-print dev-mode
                              :pseudo-names dev-mode}
           :source-map source-maps
           )
     (cljs :ids #{"main"}
           :optimizations :simple
           :compiler-options { ;; :asset-path "target/main.out"
                              ;; :closure-defines {'app.main/dev? true}
                              :externs ["externs.ext.js"]
                              :target :nodejs
                              :hashbang false
                              :parallel-build true
                              :pretty-print dev-mode
                              :pseudo-names dev-mode}
           :source-map source-maps)
     ;; ;; Compile everything except main with advanced opts
     ;; (cljs :ids #{#_"renderer" "worker" "index.html"}
     ;;       :optimizations :simple
     ;;       ;; When I enable advanced optimizations, Electron won't
     ;;       ;; launch. It gives a "nodejs.js" not found error ro some
     ;;       ;; such. I wonder if it's dead code elimination, or some sort
     ;;       ;; of missing extern?
     ;;       ;;:optimizations :advanced
     ;;       :compiler-options {:target :nodejs
     ;;                          :hashbang false})
     ;; (cljs :ids #{"main"}
     ;;       :optimizations :simple
     ;;       :compiler-options {:target :nodejs
     ;;                          :hashbang false})
     (target (or target-dir "target")))))

(deftask dev-repl
  []
  (comp
   (watch)
   (speak)
   (cljs-repl)
   (cljs)))

#_(deftask prod
  "Build WeatherGen for production deployment."
  []
  (comp
    (hoplon)
    (cljs :optimizations :advanced
          :compiler-options {:externs ["externs.js"]})
    (target :dir #{"target"})))

;;; Utility functions
