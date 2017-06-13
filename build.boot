(def project 'weathergen)

(set-env!
 :dependencies '[[org.clojure/clojure       "1.9.0-alpha15"]
                 [org.clojure/clojurescript "1.9.521"]
                 [adzerk/boot-cljs          "2.0.0"]
                 [adzerk/boot-reload        "0.5.1"]
                 ;; [adzerk/boot-cljs-repl     "0.3.3"]
                 ;;[hoplon/javelin "3.9.0"]
                 [hoplon/hoplon             "7.0.1"]
                 [org.clojure/core.async    "0.3.442"
                  :exclusions [org.clojure/tools.reader]]
                 [tailrecursion/boot-jetty  "0.1.3"]
                 [cljsjs/jquery-ui "1.11.4-0"]
                 [org.clojure/data.csv "0.1.3"]
                 ;; TODO: Update to later version
                 [com.cognitect/transit-cljs "0.8.239"]
                 [com.cognitect/transit-clj "0.8.300" :scope "test"]
                 [com.taoensso/timbre "4.10.0"]
                 ;;[secretary "1.2.3"]
                 ;;[funcool/cuerdas "2.0.0"]
                 ;;[com.cemerick/url "0.1.1"]

                 ;; CLJS REPL dependencies
                 [com.cemerick/piggieback "0.2.1" :scope "test"]
                 [weasel "0.7.0" :scope "test"]
                 [org.clojure/tools.nrepl "0.2.13" :scope "test"]

                 [cljsjs/tether "1.4.0-0"]
;;                 [cljsjs/filesaverjs "1.3.3-0"]
                 ;; Had to download as the cljsjs one is pretty far out of date
                 ;;[cljsjs/jszip "2.5.0-0"]
                 [cljsjs/pako "0.2.7-0"]
                 [cljsjs/tinycolor "1.3.0-0"]
                 [cljsjs/select2 "4.0.3-0"]
                 [garden "1.3.2"]
                 [funcool/octet "1.0.1"]
                 [org.clojure/core.match "0.3.0-alpha4"]
                 [org.clojure/tools.namespace "0.2.11" :scope "test"]
                 [quil "2.6.0"]]
 ;; TODO: Really need a way to hook into the repl-server so that dev
 ;; doesn't wind up in the source path for released code.
 :source-paths #{"src" "dev"}
 :asset-paths  #{"assets"}
 :repl-server-port 5559
 :repl-server-name (str project)
 :repl-server-init-ns 'user)

(require
 '[adzerk.boot-cljs         :refer [cljs]]
;; '[adzerk.boot-cljs-repl    :refer [cljs-repl start-repl]]
 '[adzerk.boot-reload       :refer [reload]]
 '[hoplon.boot-hoplon       :refer [hoplon prerender]]
 '[tailrecursion.boot-jetty :refer [serve]]
 'complete.core
 '[octet.core :as buf]
 '[clojure.repl :refer :all]
 '[clojure.pprint :refer [pprint]]
 '[weathergen.falcon.files :as files]
 '[weathergen.filesystem :as fs]
 '[clojure.tools.namespace.repl :refer [refresh]]
 'user)

;; No idea why I have to do this to get things to work.
(clojure.tools.namespace.repl/set-refresh-dirs "src" "dev")

(alter-var-root #'*print-length* (constantly 1000))

(deftask dev
  "Build and serve WeatherGen for local development."
  [s source-maps bool "Enable source maps"]
  (comp
   (repl-server)
   (watch)
   (speak)
   (hoplon)
   ;; Doesn't work with web workers
   ;; Tried this fix from Alan, but it's throwing an exception in the
   ;; global scope code in forecast.html. Which is weird because I
   ;; don't even have that page open.
   #_(reload :ids #{"index.html"}
             ;; :only-by-re [#"^((?!worker).)*$"]
             )
   ;;(cljs-repl :ids #{"index.html"})
   (cljs :ids #{"worker" "index.html" "mission.html" "test.html"}
         :optimizations :whitespace
         :compiler-options {;;:target :nodejs
                            :hashbang false
                            :parallel-build false
                            ;;:externs ["js/slickgrid/slickgrid.ext.js"]
                            }
         :source-map source-maps)
   (cljs :ids #{"main"}
         ;; :optimizations :simple
         :compiler-options {:asset-path "target/main.out"
                            :closure-defines {'app.main/dev? true}
                            :target :nodejs
                            :hashbang false
                            :parallel-build true})
   (target)
   #_(serve :port 8006)))

#_(deftask electron-build []
  (comp
   (speak)
   (hoplon)
   ;; Compile everything except main
   (cljs      :ids #{"renderer" "worker" "index.html"})
   ;; Compile JS for main process ==============================
   ;; path.resolve(".") which is used in CLJS's node shim
   ;; returns the directory `electron` was invoked in and
   ;; not the directory our main.js file is in.
   ;; Because of this we need to override the compilers `:asset-path option`
   ;; See http://dev.clojure.org/jira/browse/CLJS-1444 for details.
   (cljs      :ids #{"main"}
              :compiler-options {;; :asset-path "/main.out"
                                 :closure-defines {'app.main/dev? false}})
   (target)))

(deftask electron
  "Compile in a way compatible with electron packaging."
  []
  (let [source-maps true]
    (comp
     (hoplon)
     (cljs :ids #{"worker" "index.html" "mission.html"}
           :optimizations #_:advanced #_:whitespace :simple
           :compiler-options { ;;:target :nodejs
                              :hashbang false
                              :parallel-build false
                              ;;:externs ["js/slickgrid/slickgrid.ext.js"]
                              }
           ;;:source-map source-maps
           )
     (cljs :ids #{"main"}
           :optimizations :simple
           :compiler-options {;; :asset-path "target/main.out"
                              ;; :closure-defines {'app.main/dev? true}
                              :target :nodejs
                              :hashbang false
                              :parallel-build true})
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
     (target))))

#_(deftask dev-repl
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
