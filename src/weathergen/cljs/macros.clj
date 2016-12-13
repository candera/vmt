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
  the Hoplon macros. Cells can be either a vector, in which case the
  cells will be re-bound to their values under the same names within
  `body`, or a map whose keys are binding forms and whose values are
  the cells to bind.

  E.g.
  (formula-of [x y z] (+ x y z))

  (formula-of
    {x-val x-cell
     {:keys [a b]} y-cell}
    (+ x-val a b))"
  [cells & body]
  (if (map? cells)
    `((javelin.core/formula
       (fn ~(-> cells keys vec)
         ~@body))
      ~@(vals cells))
    `((javelin.core/formula
       (fn ~cells
         ~@body))
      ~@cells)))

(defmacro defformula
  [name cells & body]
  `(def ~name (formula-of ~cells ~@body)))
