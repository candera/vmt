(ns weathergen.canvas-macros
  "A library for drawing on the canvas in a less horrible way.")

(defmacro at-location
  "Binds the canvas context to ctx-sym and sets the transform such
  that the grid cell at x,y is mapped to a unit square with an aorigin
  at -0.5,-0.5"
  [ctx ctx-sym x y & body]
  `(let [ctx# ~ctx
         {context# :context
          cell-width# :cell-width
          cell-height# :cell-height} ctx#
         ~ctx-sym ctx#]
     (doto context#
       (.save)
       ;; Some sort of weird bug where this doesn't work when x is 17
       (.translate (* (double (+ ~x 0.000001)) cell-width#)
                   (* (double (+ ~y 0.00001)) cell-height#))
       (.scale cell-width# cell-height#)
       (.translate 0.5 0.5))
     ~@body
     (.restore context#)))

(defmacro with-props
  "Sets up the context with the properties in props and wraps calls to
  `body`, restoring the context when done."
  [ctx props & body]
  (let [context-sym (gensym)]
    `(let [~context-sym (:context ~ctx)]
      (.save ~context-sym)
      ~@(for [[k v] props]
          (list '-> context-sym (symbol (str ".-" k)) (list 'set! v)))
      ~@body
      (.restore ~context-sym))))
