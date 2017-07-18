(ns weathergen.interop.node
  "A library for interoperating with Node modules.")

;; There's probably a way to do this with externs, but it isn't really working for me.

(defmacro defimports
  [lib & fns]
  (let [libvar (gensym)]
    `(let [~libvar (js/require ~lib)]
       ~@(map (fn [sym]
                (list 'def sym (list 'aget libvar (str sym))))
              fns))))

