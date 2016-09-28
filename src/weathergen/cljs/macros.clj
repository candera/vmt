(ns weathergen.cljs.macros
  "Macros to support the ClojureScript side of things")

(defmacro with-time
  [timer & body]
  `(let [timer-name# ~timer
         ignore#     (.time js/console timer-name#)
         result#     ~@body]
     (.timeEnd js/console timer-name#)
     result#))

