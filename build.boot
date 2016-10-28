(def project 'lsobot)

(set-env!
 :dependencies '[[org.clojure/clojurescript "1.9.76"]
                 [adzerk/boot-cljs          "1.7.228-1"]
                 [adzerk/boot-reload        "0.4.8"]
                 [hoplon/boot-hoplon        "0.1.13"]
                 [hoplon/hoplon             "6.0.0-alpha16"]
                 [org.clojure/clojure       "1.9.0-alpha6"]
                 [org.clojure/core.async    "0.2.374"
                  :exclusions [org.clojure/tools.reader]]
                 [tailrecursion/boot-jetty  "0.1.3"]
                 #_[adzerk/boot-cljs-repl     "0.3.0"]
                 #_[com.cemerick/piggieback "0.2.1" :scope "test"]
                 #_[weasel "0.7.0" :scope "test"]
                 [org.clojure/tools.nrepl "0.2.12" :scope "test"]
                 [cljsjs/jquery-ui "1.11.4-0"]
                 [org.clojure/data.csv "0.1.3"]
                 ;; TODO: Update to later version
                 [com.cognitect/transit-cljs "0.8.239"]
                 [clojure-complete "0.2.4" :scope "test"]]
 :source-paths #{"src"}
 :asset-paths  #{"assets"})

(require
 '[adzerk.boot-cljs         :refer [cljs]]
 #_'[adzerk.boot-cljs-repl   :refer [cljs-repl start-repl]]
 '[adzerk.boot-reload       :refer [reload]]
 '[hoplon.boot-hoplon       :refer [hoplon prerender]]
 '[tailrecursion.boot-jetty :refer [serve]])

(deftask dev
  "Build weathertest for local development."
  []
  (comp
    (watch)
    (speak)
    (hoplon)
    ;;(reload)
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
    (cljs :optimizations :advanced)
    (target :dir #{"target"})))

(defn run-repl-server
  [port]
  (clojure.core.server/start-server {:port port
                                     :name (name project)
                                     :accept 'clojure.core.server/repl
                                     :daemon false}))

(deftask repl-server
  "Run a REPL socket server"
  [p port PORT int "Port to run the server on. Defaults to 5555."]
  (let [port (or port 5559)]
    (run-repl-server port)
    (println "Server is running on port" port)
    (Thread/sleep Long/MAX_VALUE)))
