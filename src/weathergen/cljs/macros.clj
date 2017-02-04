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

(defmacro with-file
  "Groups definitions by the file where the information originates"
  [file & body]
  `(do ~@body))

(defn enum*
  [body]
  (loop [[name & more] body
         counter 0
         forms []]
    (if-not name
      forms
      (let [[maybe-eq val & more2] more]
        (if (= maybe-eq '=)
          (recur more2
                 (inc val)
                 (conj forms (list 'def name val)))
          (recur more
                 (inc counter)
                 (conj forms (list 'def name counter))))))))

(defmacro defenum
  [enum & body]
  `(do ~@(enum* body)))

