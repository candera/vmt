(ns weathergen.canvas
  "A library for drawing on the canvas in a less horrible way.")

(defn create-context
  "Create a new context object that knwos about things like grid
  coordinates"
  [canvas cell-count dimensions]
  (let [[x-cells y-cells] cell-count
        [w h] dimensions
        cell-width (/ w x-cells)
        cell-height (/ h y-cells)
        ctx (.getContext canvas "2d")]
    (.setTransform ctx 1 0 0 1 0 0)
    {:context ctx
     :cell-width cell-width
     :cell-height cell-height}))
