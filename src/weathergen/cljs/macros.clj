(ns weathergen.cljs.macros
  "Macros to support the ClojureScript side of things")

(defmacro with-time
  [timer & body]
  `(let [timer-name# ~timer
         ignore#     (.time js/console timer-name#)
         result#     (do ~@body)]
     (.timeEnd js/console timer-name#)
     result#))

(defmacro formula-of
  "Emits a form that will produce a cell using the formula over the
  specified input cells. Avoids some of the code-walking problems of
  the Hoplon macros."
  [cells & body]
  `((javelin.core/formula
     (fn ~cells
       ~@body))
    ~@cells))

(defmacro defformula
  [name cells & body]
  `(def ~name (formula-of ~cells ~@body)))

