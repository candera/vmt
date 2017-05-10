;; In a separate file because we can't even try to load this if the
;; version of Clojure is less than 1.8

(defn repl-server-accept
  "Override the default so we land in the boot.user namespace instead
  of the default (user)."
  []
  (clojure.main/repl
   :init (fn []
           (let [init-ns-sym (or (get-env :repl-server-init-ns) 'boot.user)]
             (require init-ns-sym)
             (in-ns init-ns-sym)
             (apply require clojure.main/repl-requires)))
   :read clojure.core.server/repl-read))

(defn run-repl-server
  [port name]
  (clojure.core.server/start-server {:port port
                                     :name name
                                     :accept 'boot.user/repl-server-accept
                                     :daemon false}))

(deftask repl-server
  "Run a REPL socket server"
  [p port PORT int "Port to run the server on. Defaults to a random number."
   n name NAME str "Name of the repl server. Defaults to a randomly generated name."]
  (with-pass-thru _
    (let [port (or port (get-env :repl-server-port) (+ 1024 (rand-int (- 9999 1024))))
          name (or name (get-env :repl-server-name) (str (gensym)))]
      (run-repl-server port name)
      (println "Server" name "is running on port" port))))
