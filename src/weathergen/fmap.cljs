(ns weathergen.fmap
  (:require [weathergen.math :as math]
            [weathergen.model :as model]))

(defn byte-writer
  [size]
  (let [ab (js/ArrayBuffer. size)
        dv (js/DataView. ab)]
   {:size size
    :array-buffer ab
    :data-view dv
    :position (atom 0)}))

(defn write-int32
  [{:keys [data-view position]} x]
  (.setInt32 data-view @position x true)
  (swap! position #(+ % 4)))

(defn write-float32
  [{:keys [data-view position]} x]
  (.setFloat32 data-view @position x true)
  (swap! position #(+ % 4)))

(defn blob
  [bw]
  (js/Blob. #js [(:array-buffer bw)] #js {:type "application/octet-stream"}))

(defn category
  [w]
  (-> w :category {:sunny 1
                   :fair 2
                   :poor 3
                   :inclement 4}))

(defn pressure
  [w]
  ;; TODO: Convert to mmHg
  (model/inhg->mmhg (:pressure w)))

(defn wind-speed
  [w]
  (-> w :wind :speed))

(defn wind-direction
  [w]
  (-> w :wind :heading))

(defn temperature
  [w]
  (-> w :temperature))

(defn get-blob
  [weather-fn xs ys]
  (let [x-cells (count xs)
        y-cells (count ys)
        data      (into {} (for [y ys
                                 x xs]
                             [[x y] (weather-fn x y)]))
        num-cells (* x-cells y-cells)
        size      (+ 8 (* 4 5 num-cells))
        bw        (byte-writer size)]
    (write-int32 bw x-cells)
    (write-int32 bw y-cells)
    (doseq [[f op] [[category write-int32]
                    [pressure write-float32]
                    [temperature write-float32]
                    [wind-speed write-float32]
                    [wind-direction write-float32]]
            y (range y-cells)
            x (range x-cells)
            :let [w (get data [x y])]]
      (->> w f (op bw)))
    (blob bw)))
