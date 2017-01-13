(def project 'weathergen)

(set-env!
 :dependencies '[[org.clojure/clojure       "1.9.0-alpha14"]
                 [org.clojure/clojurescript "1.9.293"]
                 [adzerk/boot-cljs          "1.7.228-2"]
                 [adzerk/boot-reload        "0.4.13"]
                 ;;[hoplon/javelin "3.9.0"]
                 [hoplon/hoplon             "6.0.0-alpha17"]
                 [org.clojure/core.async    "0.2.395"
                  :exclusions [org.clojure/tools.reader]]
                 [tailrecursion/boot-jetty  "0.1.3"]
                 ;; [org.clojure/tools.nrepl "0.2.12" :scope "test"]
                 [cljsjs/jquery-ui "1.11.4-0"]
                 [org.clojure/data.csv "0.1.3"]
                 ;; TODO: Update to later version
                 [com.cognitect/transit-cljs "0.8.239"]
                 [com.taoensso/timbre "4.7.4"]
                 ;;[secretary "1.2.3"]
                 ;;[funcool/cuerdas "2.0.0"]
                 ;;[com.cemerick/url "0.1.1"]

                 [cljsjs/filesaverjs "1.3.3-0"]
                 ;; Had to download as the cljsjs one is pretty far out of date
                 ;;[cljsjs/jszip "2.5.0-0"]
                 [cljsjs/pako "0.2.7-0"]
                 [cljsjs/tinycolor "1.3.0-0"]
                 [garden "1.3.2"]
                 [funcool/octet "1.0.1"]

                 [clojure-complete "0.2.4" :scope "test"]]
 :source-paths #{"src"}
 :asset-paths  #{"assets"}
 :repl-server-port 5559
 :repl-server-name (str project))

(require
 '[adzerk.boot-cljs         :refer [cljs]]
 #_'[adzerk.boot-cljs-repl   :refer [cljs-repl start-repl]]
 '[adzerk.boot-reload       :refer [reload]]
 '[hoplon.boot-hoplon       :refer [hoplon prerender]]
 '[tailrecursion.boot-jetty :refer [serve]]
 'complete.core
 '[octet.core :as buf]
 '[clojure.repl :refer :all])

(deftask dev
  "Build weathertest for local development."
  []
  (comp
   (watch)
   (speak)
   (hoplon)
   ;; Doesn't work with web workers
   ;; Tried this fix from Alan, but it's throwing an exception in the
   ;; global scope code in forecast.html. Which is weird because I
   ;; don't even have that page open.
   #_(reload :ids #{"index.html"}
             :only-by-re [#"^((?!worker).)*$"])
   (cljs)
   (serve :port 8006)))

#_(deftask dev-repl
  []
  (comp
   (watch)
   (speak)
   (cljs-repl)
   (cljs)))

(deftask prod
  "Build weathertest for production deployment."
  []
  (comp
    (hoplon)
    (cljs :optimizations :advanced
          :compiler-options {:externs ["externs.js"]})
    (target :dir #{"target"})))
