(let [{:keys [major minor]} *clojure-version*]
  (when (or (< 1 major)
            (<= 8 minor))
    (load-file "/Users/candera/.boot/repl-server-task.clj")))

(merge-env! :dependencies '[[clojure-complete "0.2.4"
                             :scope "test"
                             :exclusions [org.clojure/clojure]]])


