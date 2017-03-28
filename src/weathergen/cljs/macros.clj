(ns weathergen.cljs.macros
  "Macros to support the ClojureScript side of things"
  (:require [clojure.spec :as s]))

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

(defmacro formula-of$
  "EXPERIMENTAL. May remove.

  Emits a form that will produce a cell using the formula over the
  specified input cells. Avoids some of the code-walking problems of
  the Hoplon macros. Binds `cells` in the body to symbols starting
  with `$`.

 E.g.
  (formula-of [x y z] (+ $x $y $z))"
  [cells & body]
  `((javelin.core/formula
     (fn ~(->> cells
               (map name)
               (map #(str "$" %))
               (mapv symbol))
       ~@body))
    ~@cells))

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

(def with-bbox-args
  (s/cat :bounds-bindings (s/* (s/cat :binding-dim keyword?
                                      :binding-name symbol?))
         :elem-binding (s/spec (s/cat :elem-name symbol?
                                      :elem-form some?))
         :body (s/* some?)))

(s/fdef with-bbox
        :args with-bbox-args)

(defmacro with-bbox
  "Binds width, height, x, and y to names whose values are cells for
  the bounding box of an elem. The bounding box will update when the
  element is added to the DOM. Bindings are specified via zero or more
  key-value pairs, and are optional.

  If `:watch` is specified, it will be taken as a cell, and bounds
  will be recomputed and cells updated when its value changes.

  Dimension bindings are available both in the body and in the
  elem-form, so an element can react to its own boundaries.

  Example usage:

  (with-bbox :x x :h h
    [e (span \"hi there\")]
    (div :toggle (cell= (< 42 (+ x h)))
       e))"
  [& args]
  (let [{:keys [bounds-bindings
                elem-binding
                body]}
        (s/conform with-bbox-args args)
        {:keys [elem-name elem-form]} elem-binding
        bounds-map        (zipmap (map :binding-dim bounds-bindings)
                                  (map :binding-name bounds-bindings))
        {:keys [x y w h watch]} bounds-map
        x* (or x (gensym))
        y* (or y (gensym))
        w* (or w (gensym))
        h* (or h (gensym))]
    `(let [~x* (javelin.core/cell 0)
           ~y* (javelin.core/cell 0)
           ~w* (javelin.core/cell 0)
           ~h* (javelin.core/cell 0)
           ~elem-name ~elem-form
           update-bbox#  #(javelin.core/dosync
                           (let [bb# (.getBBox ~elem-name)]
                             (when (.-x bb#)
                               (reset! ~x* (.-x bb#))
                               (reset! ~y* (.-y bb#))
                               (reset! ~w* (.-width bb#))
                               (reset! ~h* (.-height bb#)))))]
       (hoplon.core/when-dom ~elem-name  update-bbox#)
       (when-let [w# ~(:watch bounds-map)]
         (add-watch w#
                    (keyword (gensym))
                    (fn [~'_ ~'_ ~'_ ~'_]
                      ;; (taoensso.timbre/debug "watch fired, updating bbox")
                      (hoplon.core/with-timeout 0 (update-bbox#)))))
       ~@body)))
