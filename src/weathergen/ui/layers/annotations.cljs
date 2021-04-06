(ns weathergen.ui.layers.annotations
  "Responsible for drawing the map annotations and the associated
  controls. Annotations are informational overlays added to the map:
  squares, ovals, text, lines, etc."
  (:require [clojure.pprint :refer [pprint]]
            [clojure.string :as str]
            [goog.string :as gstring]
            [goog.string.format]
            [hoplon.core :refer [a case-tpl datalist defelem div do-watch fieldset for-tpl h4
                                 i if-tpl img input label legend li
                                 option pre select span style
                                 table tbody td thead tr ul when-tpl with-timeout]]
            [hoplon.svg :as svg]
            [javelin.core :refer [cell cell? cell= cell-let dosync formula-of lens with-let]]
            [weathergen.compression :refer [decompress]]
            [weathergen.coordinates :as coords]
            [weathergen.encoding :refer [decode encode]]
            [weathergen.falcon.files.mission :as mission]
            [weathergen.filesystem :as fs]
            [weathergen.help :as help :refer [help-icon with-help]]
            [weathergen.math :as math]
            [weathergen.ui.buttons :as buttons]
            [weathergen.ui.common :as comm :refer [colors control-section
                                                   dropdown
                                                   ems
                                                   get-image
                                                   format-time inl
                                                   map-lens
                                                   path-lens pct pre-cell px
                                                   styled team-color triangle
                                                   validating-edit]]
            [weathergen.ui.tabs :as tabs]
            [weathergen.ui.textarea :as ta]
            [weathergen.util :as util])
  (:require-macros
   [weathergen.cljs.macros :refer [hint->
                                   hint->>
                                   keyed-for-tpl
                                   map-lens-tpl
                                   with-attr-bindings
                                   with-bbox
                                   with-default-lenses
                                   with-key-lenses
                                   with-time]]))

(comm/register-class!
 ::no-focus-border
 [:&:hover {:outline "none"}])

;;; Utilities

(let [counter (atom 0)]
  (defn- unique-id
    []
    (swap! counter inc)))

(defn- point-names
  "Given a cell of points (a map from IDs to 2-tuples), return a cell of
  maps from IDs to names for them."
  [points]
  (formula-of [points]
    (zipmap (sort (keys points))
            (map #(js/String.fromCharCode (+ 65 %))
                 (range)))))

(defn- annotation-rotation
  "Computes the rotation of an arrow (0 is east) given a vector from its
  start to its end."
  [v]
  (-> (- 90 (math/heading v))
      (mod 360)))

(defn- midpoint
  "Returns the vector midpoint of two  "
  [a b]
  (->> a
       (math/vector-add b)
       (math/vector-scale 0.5)))


;;; Overlay

(def font-scale-factor
  7.87406581267874E-4)

;; TODO: Convert these to use linear->exp and exp->linear, below
(let [base 1.0875853314770578
      factor font-scale-factor]
  (defn- font-size->scale
    [font-size]
    (-> (Math/pow base font-size)
        (* factor)))

  (defn- scale->font-size
    [scale]
    (-> scale
        (/ factor)
        Math/log
        (/ (Math/log base)))))

(defn- linear->exp
  "Converts `val`, a value on the linear interval `linear-min` to
  `linear-max`, exponentially along the interval `exp-min` to
  `exp-max`."
  [val linear-min linear-max exp-min exp-max]
  (let [a (/ exp-max exp-min)
        b (Math/pow a (/ 1.0 (- linear-max linear-min)))
        c (/ exp-min (Math/pow b linear-min))]
    (* c (Math/pow b val))))

(defn- exp->linear
  "Complement of `linear->exp`."
  [val linear-min linear-max exp-min exp-max]
  (let [a (/ exp-max exp-min)
        b (Math/pow a (/ 1.0 (- linear-max linear-min)))
        c (/ exp-min (Math/pow b linear-min))]
    (/ (Math/log (/ val c))
       (Math/log b))))

(defn- stroke-and-fill-attrs
  [annotation]
  (with-key-lenses annotation
    [fill-color
     filled?
     edge-color
     edge-dash-length
     edge-dash-spacing
     edge-style
     edge-width
     open?]
    (with-default-lenses
      {edge-dash-length  0
       edge-dash-spacing 0
       edge-width        0}
      (let [bw (formula-of [edge-style edge-width]
                 (if (= :none edge-style)
                   0
                   (/ edge-width 200)))]
        {:stroke           (cell= (comm/to-rgba edge-color))
         :stroke-width     bw
         :fill             (formula-of [open? filled? fill-color]
                             (if (and (not open?) filled?)
                               (comm/to-rgba fill-color)
                               "none"))
         :stroke-dasharray (formula-of [edge-style edge-dash-length edge-dash-spacing]
                             (when (= edge-style :dashed)
                               (let [dash-length (linear->exp edge-dash-length
                                                              1 100
                                                              0.005 10)
                                     gap-length  (* dash-length (linear->exp edge-dash-spacing
                                                                             1 100
                                                                             0.01 100))]
                                 (str dash-length
                                      " "
                                      gap-length))))}))))

(defn- shape-contents-overlay
  "Returns SVG for the contents of the annotation"
  [annotation {:keys [suppress-bullseye-info-box? dragging] :as state}]
  (with-key-lenses annotation
    [edge-color edge-width edge-style edge-dash-length edge-dash-spacing
     editing?
     font-bold? font-color font-italic? font-family font-size
     halign
     height
     text
     shape-type
     valign
     width]
    (with-default-lenses
      {edge-width        0
       edge-dash-length  0
       edge-dash-spacing 0
       width               0
       height              0}
      (let [ew     (formula-of [edge-style edge-width]
                     (if (= :none edge-style)
                       0
                       (/ edge-width 200)))
            offset (cell= (/ ew 2))
            w      (cell= (max 0 (- width ew)))
            h      (cell= (max 0 (- height ew)))]
        (svg/g
         (stroke-and-fill-attrs annotation)
         :css (formula-of [editing?]
                {:pointer-events (when-not editing? "none")})
         (case-tpl shape-type
           :oval (svg/ellipse
                  :cx (cell= (/ (+ offset w) 2))
                  :cy (cell= (/ (+ offset h) 2))
                  :rx (cell= (/ w 2))
                  :ry (cell= (/ h 2)))
           :rectangle (svg/rect
                       :x offset
                       :y offset
                       :width w
                       :height h))
         (let [editing-text? (cell false)
               scale-factor  (formula-of [font-size]
                               (font-size->scale font-size))]
           (svg/g
            :transform (cell= (comm/svg-scale scale-factor))
            (let [fo-width  (cell= (/ width scale-factor))
                  fo-height (cell= (/ height scale-factor))]
              (with-let [fo (svg/foreignObject
                             :width fo-width
                             :height fo-height)]
                (let [text-y (cell 0)]
                  (fo
                   :y text-y
                   (with-let [elem (div :class (comm/class-for ::no-focus-border))]
                     (do-watch (formula-of [annotation scale-factor fo-height]
                                 {:scale-factor scale-factor
                                  :annotation annotation
                                  :fo-height fo-height})
                               (fn [_ {:keys [scale-factor annotation fo-height]}]
                                 (let [{:keys [height valign]} annotation]
                                   (with-timeout 0
                                     (reset! text-y
                                             (cond
                                               (= valign :bottom)
                                               (- fo-height (.-clientHeight elem))

                                               (= valign :middle)
                                               (/ (- fo-height (.-clientHeight elem)) 2)

                                               :else
                                               0))))))
                     (elem
                      :xmlns "http://www.w3.org/1999/xhtml"
                      :contenteditable (when-tpl editing-text? "true")
                      :click (fn []
                               (reset! editing-text? true)
                               (with-timeout 0
                                 (.focus elem)))
                      :keyup (fn [^KeyboardEvent e]
                               (when (= comm/ESCAPE_KEY (.-keyCode e))
                                 (dosync
                                  (reset! text (-> elem .-innerText))
                                  (reset! editing-text? false))))
                      :mousemove (fn [e]
                                   (reset! suppress-bullseye-info-box? true)
                                   (.preventDefault e)
                                   false)
                      :blur (fn [e]
                              (dosync
                               (reset! text (-> elem .-innerText))
                               (reset! editing-text? false)))
                      :css (formula-of [font-bold? font-family font-italic? font-color font-size
                                        editing? dragging halign]
                             {:white-space    "pre-wrap"
                              :pointer-events (if (and editing? (nil? dragging)) "all" "none")
                              :cursor         (when editing? "text")
                              :font-family    font-family
                              :font-weight    (when font-bold? "bold")
                              :font-style     (when font-italic? "italic")
                              :padding        (ems 0 0.2)
                              :color          (comm/to-rgba font-color)
                              :text-align     halign})
                      text)))))))))))))

(defn- edit-frame-overlay
  "Returns SVG for manipulating a shape or PPT via a blue edit frame."
  [annotation
   {:keys [map-zoom map-viewbox dragging] :as state}
   {:keys [register-drag delete-annotation] :as handlers}
   {width-override  :width
    height-override :height
    buttons         :buttons
    :as             opts}]
  (with-key-lenses annotation
    [width height font-size rotation x y editing?]
    (with-default-lenses
      {x        0
       y        0
       rotation 0}
      (let [width  (or width-override width)
            height (or height-override height)]
       (svg/g
        :debug "edit controls"
        (when-tpl editing?
          (let [large-edge-width (cell= (/ 0.2 map-zoom))
                small-edge-width (cell= (* large-edge-width 0.65))
                outer-width      (cell= (+ width (* 2 large-edge-width)))
                outer-height     (cell= (+ height (* 2 large-edge-width)))
                size             (cell= (/ 1.7 map-zoom))]

            (let [path (formula-of [outer-width large-edge-width size]
                         (let [x (- (/ outer-width 2) large-edge-width)
                               y (* size -2.5)]
                           (str "M" x ",0"
                                " L" x "," y)))]
              (svg/g
               (when (buttons :rotate)
                 (svg/g
                  :debug "rotate handle"
                  (svg/path
                   :stroke "lightblue"
                   :fill "none"
                   :stroke-width large-edge-width
                   :d path)
                  (svg/path
                   :stroke "blue"
                   :fill "none"
                   :stroke-width small-edge-width
                   :d path)))
               (svg/rect
                :width (cell= (- outer-width large-edge-width))
                :height (cell= (- outer-height large-edge-width))
                :x (cell= (* large-edge-width -0.5))
                :y (cell= (* large-edge-width -0.5))
                :stroke "lightblue"
                :fill "none"
                :stroke-width large-edge-width)
               (svg/rect
                :width (cell= (- outer-width large-edge-width))
                :height (cell= (- outer-height large-edge-width))
                :x (cell= (* large-edge-width -0.5))
                :y (cell= (* large-edge-width -0.5))
                :stroke "blue"
                :fill "none"
                :stroke-width small-edge-width)
               (let [button (fn [{:keys [x y name src drag click]}]
                              (svg/g
                               :debug name
                               :transform (cell= (comm/svg-translate x y))
                               :mousedown (fn [_]
                                            (when drag
                                              (register-drag
                                               (let [drag-fn (drag)]
                                                 (reset! dragging name)
                                                 (fn [dpos final?]
                                                   (drag-fn dpos final?)
                                                   (when final?
                                                     (reset! dragging nil)))))))
                               :click (fn [_]
                                        (when click (click)))
                               (svg/rect
                                :x 0
                                :y 0
                                :width size
                                :height size
                                :stroke "black"
                                :fill (formula-of [dragging]
                                        (if (= dragging name)
                                          "lightblue"
                                          "white"))
                                :stroke-width (cell= (/ 0.1 map-zoom)))
                               ;; This sort of stupid, but at some
                               ;; point Chromimum started deciding
                               ;; that it wouldn't respect fractional
                               ;; image sizes properly. So we scale
                               ;; down/up to make it happy with our
                               ;; numbers.
                               (svg/g
                                :transform "scale(0.01, 0.01)"
                                (svg/image
                                 :xlink-href src
                                 :x (cell= (* size 10))
                                 :y (cell= (* size 10))
                                 :width (cell= (* size 80))
                                 :height (cell= (* size 80))))))]
                 (svg/g
                  :debug (cell= (str "edit buttons. Dragging: " (pr-str dragging)))
                  (when (buttons :move)
                    (button {:name "Move"
                             :x    (cell= (- (+ size (/ large-edge-width 2))))
                             :y    (cell= (- (+ size (/ large-edge-width 2))))
                             :src  "images/move.svg"
                             :drag (fn []
                                     (let [x0 (:x @annotation)
                                           y0 (:y @annotation)]
                                       (fn [[dx dy] final?]
                                         (swap! annotation
                                                assoc
                                                :x (+ x0 dx)
                                                :y (+ y0 dy)))))}))
                  (when (buttons :rotate)
                    (button {:name "Rotate"
                             :x    (cell= (+ (/ width 2) (/ size -2)))
                             :y    (cell= (- (+ (* size 3) (/ large-edge-width 2))))
                             :src  "images/rotate.svg"
                             :drag (fn []
                                     (let [theta0 @rotation
                                           pivot  (math/rotate (- theta0) [0 (* @size -2.5)])
                                           v      [(- (/ @width 2)) 0]
                                           x0     @x
                                           y0     @y
                                           p0     (math/rotate theta0 v)]
                                       (fn [[dx dy :as dp] final?]
                                         (let [[x1 y1]   (math/vector-add dp pivot)
                                               theta1    (math/heading [x1 (- y1)])
                                               p1        (math/rotate theta1 v)
                                               [dx0 dy0] (math/vector-add p1
                                                                          (math/vector-scale -1 p0))]
                                           (swap! annotation
                                                  assoc
                                                  :rotation (mod theta1 360)
                                                  :x (+ x0 dx0)
                                                  :y (- y0 dy0))))))}))


                  (when (buttons :resize-text)
                    (button {:name "Resize Text"
                             :x    (cell= (+ size (/ large-edge-width -2)))
                             :y    (cell= (- (+ size (/ large-edge-width 2))))
                             :src  "images/text-resize.svg"
                             :drag (fn []
                                     (let [extent (* 0.5 (:width @map-viewbox))
                                           size0  @font-size]
                                       (fn [[dx dy] final?]
                                         (reset! font-size
                                                 (-> dx
                                                     (/ extent)
                                                     (* 100)
                                                     (+ size0)
                                                     (max 1)
                                                     (min 100))))))}))
                  (when (buttons :done)
                    (button {:name  "Done"
                             :x     (cell= (- (+ size (/ large-edge-width 2))))
                             :y     (cell= (+ height (/ large-edge-width 2)))
                             :src   "images/checkmark.png"
                             :click #(reset! editing? false)}))
                  (when (buttons :delete)
                    (button {:name  "Delete"
                             :x     (cell= (+ size (/ large-edge-width -2)))
                             :y     (cell= (+ height (/ large-edge-width 2)))
                             :src   "images/trash.png"
                             :click delete-annotation}))
                  (when (buttons :resize)
                    (button {:name "Resize"
                             :x    (cell= (+ width (/ large-edge-width 2)))
                             :y    (cell= (+ height (/ large-edge-width 2)))
                             :src  "images/resize.svg"
                             :drag (fn []
                                     (let [w0     @width
                                           h0     @height
                                           theta0 @rotation]
                                       (fn [dpos final?]
                                         (let [[dx' dy'] (math/rotate theta0 dpos)
                                               w         (+ w0 dx')
                                               h         (+ h0 dy')]
                                           (swap! annotation
                                                  assoc
                                                  :width (max 0 w)
                                                  :height (max 0 h))))))})))))))))))))

(defn- shape-overlay
  "Returns SVG for a rectangle or oval annotation."
  [annotation
   {:keys [annotations map-viewbox map-zoom] :as state}
   {:keys [register-drag delete-annotation] :as handlers}]
  (with-key-lenses annotation
    [shape-type
     font-size
     font-family
     font-color
     text
     x
     y
     width
     height
     rotation
     editing?]
    (with-default-lenses
      {x         0
       y         0
       width     0
       height    0
       rotation  0
       font-size 0}
      (svg/g
       :transform (cell= (comm/svg-translate x y))
       (svg/g
        :transform (cell= (comm/svg-rotate rotation))
        (let [dragging (cell nil)
              state* (assoc state :dragging dragging)]
          (svg/g
           :debug "shape annotation"
           (shape-contents-overlay annotation state*)
           (when-tpl editing?
             (edit-frame-overlay annotation
                                 state*
                                 handlers
                                 {:buttons #{:move :rotate :resize :resize-text :delete :done}})))))))))

(defn move-all
  "Returns a drag handler that will move all the points."
  [points]
  (let [points0 @points]
    (fn [[dx dy :as dp] _]
      (swap! points
             #(->> %
                   (map (fn [[k _]]
                          [k (math/vector-add (get points0 k) dp)]))
                   (into (sorted-map)))))))

(defn- linear-edit-buttons
  "Returns SVG for an arrow or lines annotation."
  [annotation
   {:keys [annotations map-viewbox map-zoom dragging rotation add-points?] :as state}
   {:keys [register-drag delete-annotation] :as handlers}]
  (with-key-lenses annotation
    [points editing? open?]
    (let [ks        (->> points keys sort cell=)
          k0        (cell= (first ks))
          k1        (cell= (second ks))
          kn-1      (cell= (last (butlast ks)))
          kn        (cell= (last ks))
          p0        (map-lens points k0)
          x0        (map-lens p0 0)
          y0        (map-lens p0 1)
          p1        (map-lens points k1)
          pn-1      (map-lens points kn-1)
          pn        (map-lens points kn)
          n         (cell= (count points))
          rotations (formula-of [points ks k0 kn p0 p1 pn-1 pn n open?]
                      (let [nexts   (->> ks cycle (drop 1))
                            prevs   (->> ks cycle (drop (dec n)))
                            closed? (and (not open?) (< 2 n))
                            bisect  (fn [from to1 to2]
                                      (let [v1 (-> to1
                                                   (math/vector-subtract from)
                                                   math/normalize)
                                            v2 (-> to2
                                                   (math/vector-subtract from)
                                                   math/normalize)]
                                        (annotation-rotation (midpoint v1 v2))))
                            angles  (zipmap ks
                                            (map bisect (map points ks) (map points nexts) (map points prevs)))]
                        (if open?
                          (assoc angles
                                 k0 (bisect p0 p1 p1)
                                 kn (bisect pn pn-1 pn-1))
                          angles)))]
      #_(do-watch rotations
          (fn [_ n]
            (swap! annotation assoc :rotations n)))
      (svg/g
       :debug "edit controls"
       (when-tpl (cell= (and editing? (pos? (count points))))
         (let [size      (cell= (/ 1.0 map-zoom))
               half-size (cell= (/ size 2))]
           (svg/g
            (let [button     (fn [{:keys [x y name label src drag click cursor scale rotation]}]
                               (let [size      (cell= (* size (or scale 1)))
                                     half-size (cell= (/ size 2))]
                                 (svg/g
                                  :debug name
                                  :transform (cell= (comm/svg-xform-combine
                                                     (comm/svg-translate x y)
                                                     (comm/svg-rotate (or rotation 0))))
                                  :mousedown (fn [_]
                                               (when drag
                                                 (register-drag
                                                  (let [drag-fn (drag)]
                                                    (reset! dragging name)
                                                    (fn [dpos final?]
                                                      (drag-fn dpos final?)
                                                      (when final?
                                                        (reset! dragging nil)))))))
                                  :click (fn [_]
                                           (when click (click)))
                                  :css {:cursor cursor}
                                  (svg/rect
                                   :x (cell= (- half-size))
                                   :y (cell= (- half-size))
                                   :width size
                                   :height size
                                   :stroke "black"
                                   :fill (formula-of [dragging]
                                           (if (= dragging name)
                                             "lightblue"
                                             "white"))
                                   :stroke-width (cell= (/ 0.1 map-zoom)))
                                  (when label
                                    (svg/text
                                     :transform (formula-of [size]
                                                  (comm/svg-scale (/ size 17)))
                                     :css {:pointer-events "none"}
                                     :x 0
                                     :y 1.5
                                     :font-family "Helvetica"
                                     :stroke "Black"
                                     :alignment-baseline "middle"
                                     :text-anchor "middle"
                                     :text label))
                                  (when src
                                    (svg/image
                                     :xlink-href src
                                     :x (cell= (* size -0.4))
                                     :y (cell= (* size -0.4))
                                     :width (cell= (* size 0.8))
                                     :height (cell= (* size 0.8)))))))
                  spacing-lg (cell= (* 3 size))
                  spacing-sm (cell= (* spacing-lg 0.75))
                  bar-width  (cell= (* size 0.1))]
              (svg/g
               :debug (cell= (str "edit buttons. Dragging: " (pr-str dragging)))

               (svg/g
                :debug "Big button bars"
                :transform (formula-of [x0 y0 k0 rotations]
                             (comm/svg-xform-combine
                              (comm/svg-translate x0 y0)
                              (comm/svg-rotate (get rotations k0 0))))
                (svg/rect
                 :x (cell= (- spacing-lg))
                 :y 0
                 :width spacing-lg
                 :height bar-width
                 :fill "blue"
                 :stroke "lightblue"
                 :stroke-width (cell= (/ bar-width 2)))
                (svg/rect
                 :x 0
                 :y (cell= (- spacing-lg))
                 :width bar-width
                 :height (cell= (* 2 spacing-lg))
                 :fill "blue"
                 :stroke "lightblue"
                 :stroke-width (cell= (/ bar-width 2))))

               (when-tpl open?
                 (let [rotation (cell= (get rotations kn 0))]
                   (svg/g
                    :debug "Add new point (last) bar"
                    :transform (formula-of [rotation pn]
                                 (let [[xn yn] pn]
                                   (comm/svg-xform-combine
                                    (comm/svg-translate xn yn)
                                    (comm/svg-rotate (+ 180 rotation)))))
                    (svg/rect
                     :x 0
                     :y 0
                     :width spacing-sm
                     :height bar-width
                     :fill "blue"
                     :stroke "lightblue"
                     :stroke-width (cell= (/ bar-width 2))))))

               (let [point-names (point-names points)]
                 (svg/g
                  :debug "Point buttons"
                  (map-lens-tpl points [k point]
                    (let [rotation (map-lens rotations k)]
                      (svg/g
                       :debug (cell= (point-names k))
                       :transform (formula-of [point rotation]
                                    (comm/svg-xform-combine
                                     (comm/svg-translate (get point 0)
                                                         (get point 1))
                                     (comm/svg-rotate (or rotation 0))))
                       (when add-points?
                         (svg/g
                          :debug (cell= (str "Delete point " k))
                          (svg/rect
                           :debug "Delete point bar"
                           :x 0
                           :y 0
                           :width spacing-sm
                           :height bar-width
                           :fill "blue"
                           :stroke "lightblue"
                           :stroke-width (cell= (/ bar-width 2)))
                          (button {:name     (cell= (str "-" (point-names k)))
                                   :label    "-"
                                   :cursor   "pointer"
                                   :scale    0.8
                                   :rotation (cell= (- rotation))
                                   :x        spacing-sm
                                   :y        0
                                   :click    (fn [_]
                                               (swap! points dissoc @k))})))
                       (svg/g
                        :debug "point button"
                        (button {:name     (cell= (point-names k))
                                 :label    (cell= (point-names k))
                                 :cursor   "move"
                                 :x        0
                                 :y        0
                                 :rotation (cell= (- rotation))
                                 :drag     (fn []
                                             (let [p0 (get-in @annotation [:points @k])]
                                               (fn [[dx dy :as dp] final?]
                                                 (swap! points
                                                        assoc
                                                        @k
                                                        (math/vector-add p0 dp)))))})))))))
               (when add-points?
                 (let [intermediaries (formula-of [points open?]
                                        (let [[_ pfirst] (first points)
                                              [_ plast]  (last points)
                                              mids       (mapv (fn [[kprev pprev] [knext pnext]]
                                                                 [(/ (+ kprev knext) 2)
                                                                  (midpoint pprev pnext)])
                                                               points
                                                               (drop 1 points))]
                                          (into (sorted-map)
                                                (if (and (not open?) (< 2 (count points)))
                                                  (conj mids [nil (midpoint pfirst plast)])
                                                  mids))))]
                   #_(do-watch intermediaries
                       (fn [_ n]
                         (swap! annotation assoc :intermediaries n)))
                   (svg/g
                    :debug "Add point buttons"
                    (svg/g
                     :debug "Nonlast"
                     (keyed-for-tpl key [[k _] intermediaries]
                       (svg/g
                        :transform (formula-of [intermediaries k]
                                     (comm/svg-translate (get-in intermediaries [k 0])
                                                         (get-in intermediaries [k 1])))
                        (button {:name   (cell= (str "intermediary" k))
                                 :label  "+"
                                 :cursor "move"
                                 :scale  0.8
                                 :x      0
                                 :y      0
                                 :drag   (fn []
                                           (let [k0 (or @k (unique-id))
                                                 p0 (get @intermediaries @k)]
                                             (fn [[dx dy :as dp] final?]
                                               (swap! annotation
                                                      assoc-in
                                                      [:points k0]
                                                      (math/vector-add p0 dp)))))}))))
                    (svg/g
                     :debug "Last"
                     (when-tpl open?
                       (let [rotation (cell= (get rotations kn 0))]
                         (svg/g
                          :debug "Add new point (last)"
                          :transform (formula-of [rotation pn]
                                       (let [[xn yn] pn]
                                         (comm/svg-xform-combine
                                          (comm/svg-translate xn yn)
                                          (comm/svg-rotate (+ 180 rotation)))))
                          (button {:name     (cell= (str "add" kn))
                                   :label    "+"
                                   :rotation (cell= (- rotation))
                                   :cursor   "move"
                                   :scale    0.8
                                   :x        spacing-sm
                                   :y        0
                                   :drag     (fn []
                                               (let [k0 (unique-id)
                                                     p0 (math/vector-add
                                                         (math/rotate (- 180 @rotation)
                                                                      [@spacing-sm 0])
                                                         @pn)]
                                                 (fn [[dx dy :as dp] final?]
                                                   (swap! annotation
                                                          assoc-in
                                                          [:points k0]
                                                          (math/vector-add p0 dp)))))}))))))))
               (let [r0 (cell= (get rotations k0 0))]
                 (svg/g
                  :debug "Big edit buttons"
                  :transform (formula-of [x0 y0 r0]
                               (comm/svg-xform-combine
                                (comm/svg-translate x0 y0)
                                (comm/svg-rotate r0)))
                  (button {:name     "Move"
                           :cursor   "move"
                           :scale    2
                           :x        (cell= (- spacing-lg))
                           :y        0
                           :rotation (cell= (- r0))
                           :src      "images/move.svg"
                           :drag     (fn []
                                       (move-all points))})
                  (button {:name     "Done"
                           :cursor   "pointer"
                           :scale    2
                           :x        0
                           :y        spacing-lg
                           :rotation (cell= (- r0))
                           :src      "images/checkmark.png"
                           :click    #(reset! editing? false)})
                  (button {:name     "Delete"
                           :cursor   "pointer"
                           :scale    2
                           :x        0
                           :y        (cell= (- spacing-lg))
                           :rotation (cell= (- r0))
                           :src      "images/trash.png"
                           :click    delete-annotation}))))))))))))

(defn- arrow-overlay
  "Returns SVG for an arrow annotation."
  [annotation
   {:keys [annotations map-viewbox map-zoom] :as state}
   {:keys [register-drag delete-annotation] :as handlers}]
  (with-key-lenses annotation
    [points arrowhead-width arrowhead-length shaft heft editing?]
    (with-default-lenses
      {arrowhead-width  0
       arrowhead-length 0
       shaft            0}
      (let [dragging (cell nil)
            rotation (formula-of [points]
                       (let [a (get points 0)
                             b (get points 1)]
                         (-> b
                             (math/vector-subtract a)
                             annotation-rotation)))
            length   (formula-of [points]
                       (let [a (get points 0)
                             b (get points 1)]
                         (-> b
                             (math/vector-subtract a)
                             math/magnitude)))]
        (svg/g
         (svg/g
          :debug "Arrow annotation"
          :transform (formula-of [points]
                       (let [a       (get points 0)
                             [ax ay] a]
                         (comm/svg-translate ax ay)))
          :css (formula-of [editing?]
                 {:cursor         (when editing? "move")
                  :pointer-events (when-not editing? "none")})
          (svg/g
           :transform (cell= (comm/svg-rotate rotation))
           (svg/g
            :mousedown (fn [_]
                         (reset! dragging "all")
                         (let [a (get-in @annotation [:points 0])
                               b (get-in @annotation [:points 1])]
                           (register-drag
                            (fn [[dx dy :as dp] final?]
                              (swap! annotation
                                     #(-> %
                                          (assoc-in [:points 0]
                                                    (math/vector-add a dp))
                                          (assoc-in [:points 1]
                                                    (math/vector-add b dp))))
                              (when final?
                                (reset! dragging nil))))))
            (stroke-and-fill-attrs annotation)
            (svg/polygon
             :points (formula-of [arrowhead-width arrowhead-length shaft heft length]
                       (let [heft*           (linear->exp heft 1 100 0.1 10)
                             shaft*          (* heft* (linear->exp shaft 1 100 0.005 4))
                             head-width      (linear->exp arrowhead-width 1 100 0.005 25)
                             head-length     (linear->exp arrowhead-length 1 100 0.005 10)
                             abs-head-width  (* head-width heft*)
                             abs-head-length (* head-length heft*)
                             shaft-end-x     (- length abs-head-length)
                             shaft-top-y     (/ shaft* -2)
                             shaft-bottom-y  (- shaft-top-y )
                             head-top-y      (/ abs-head-width -2)
                             head-bottom-y   (- head-top-y)]
                         (->> [[0 shaft-top-y]
                               [shaft-end-x shaft-top-y]
                               [shaft-end-x head-top-y]
                               [length 0]
                               [shaft-end-x head-bottom-y]
                               [shaft-end-x shaft-bottom-y]
                               [0 shaft-bottom-y]]
                              (map #(str/join "," %))
                              (str/join " "))))))))
         (linear-edit-buttons annotation
                              (assoc state
                                     :dragging dragging)
                              handlers))))))

(defn- lines-overlay
  [annotation
   {:keys [annotations map-viewbox map-zoom] :as state}
   {:keys [register-drag delete-annotation] :as handlers}]
  (with-key-lenses annotation
    [points editing? open?]
    (let [dragging (cell nil)
          path (formula-of [points]
                 (->> points
                      (sort-by key)
                      (map val)
                      (map (fn [[x y]] (str x "," y)))
                      (str/join " ")))
          attrs (stroke-and-fill-attrs annotation)]
      (svg/g
       :debug "Line annotation"
       :css (formula-of [editing?]
              {:cursor         (when editing? "move")
               :pointer-events (when-not editing? "none")})
       :mousedown (fn [_]
                    (reset! dragging "all")
                    (let [move-all (move-all points)]
                      (register-drag
                       (fn [[dx dy :as dp] final?]
                         (move-all dp final?)
                         (when final?
                           (reset! dragging nil))))))
       (if-tpl open?
         (svg/polyline attrs :points path)
         (svg/polygon attrs :points path))
       (linear-edit-buttons annotation
                            (assoc state
                                   :dragging dragging
                                   :add-points? true)
                            handlers)))))

(defn- ppt-overlay
  "Returns SVG for a PPT annotation."
  [annotation
   {:keys [annotations map-viewbox map-zoom mission map-text-scale map-icon-scale] :as state}
   {:keys [register-drag delete-annotation] :as handlers}]
  (with-key-lenses annotation [edge-style edge-width x y label threat editing?]
    (with-default-lenses
      {x          0
       y          0
       edge-width 0})
    (let [icon-size (cell= (/ map-icon-scale map-zoom))
          dragging  (cell nil)
          radius    (cell= (-> threat :radius-ft (or 0) coords/ft->nm (->> (coords/nm->weather mission))))
          ew        (formula-of [edge-style edge-width]
                      (if (= :none edge-style)
                        0
                        (/ edge-width 200)))]
      (svg/g
       :transform (cell= (comm/svg-translate x y))
       :cursor (when-tpl editing? "move")
       :pointer-events (if-tpl editing? "all" "none")
       :mousedown (fn [_]
                    (reset! dragging "all")
                    (let [x0 @x
                          y0 @y]
                      (register-drag
                       (fn [[dx dy :as dp] final?]
                         (reset! x (+ x0 dx))
                         (reset! y (+ y0 dy))
                         (when final?
                           (reset! dragging nil))))))
       (when-tpl (cell= (< 0.1 radius))
         (svg/circle
          (stroke-and-fill-attrs annotation)
          :cx 0
          :cy 0
          :r (cell= (- radius ew))))
       ;; This sort of stupid, but at some
       ;; point Chromimum started deciding
       ;; that it wouldn't respect fractional
       ;; image sizes properly. So we scale
       ;; down/up to make it happy with our
       ;; numbers.
       (svg/g
        :transform "scale(0.01, 0.01)"
        (svg/image
         :xlink-href "images/ppt.svg"
         :x (cell= (* icon-size -40))
         :y (cell= (* icon-size -40))
         :width (cell= (* icon-size 80))
         :height (cell= (* icon-size 80))))
       (svg/text
        :transform (cell= (comm/svg-xform-combine
                           (comm/svg-translate 0 (/ icon-size 2))
                           (comm/svg-scale (-> map-text-scale (* 0.06) (/ map-zoom)))))
        :x 0
        :y -2.5
        :dominant-baseline "text-before-edge"
        :text-anchor "middle"
        :stroke "none"
        :fill "white"
        :font-family "Courier New"
        (cell= (or label (:id threat))))
       (when editing?
         (let [frame-size (cell= (max (* 2 radius)
                                      (/ 4 map-zoom)))]
           (svg/g
            :transform (cell= (comm/svg-translate (/ frame-size -2) (/ frame-size -2)))
            (edit-frame-overlay annotation
                                (assoc state :dragging dragging)
                                handlers
                                {:width   frame-size
                                 :height  frame-size
                                 :buttons #{:move :done :delete}}))))))))

(defn- overlay
  "Renders the UI for the display of the annotations."
  [{:keys [annotations] :as state}
   register-drag-handler]
  (svg/g
   :id "annotations-overlay"
   (keyed-for-tpl key [[k _] annotations]
     (let [annotation (comm/map-lens annotations k)
           delete     (fn []
                        (swap! annotations dissoc @k))
           handlers   {:register-drag     register-drag-handler
                       :delete-annotation delete}]
       (with-key-lenses annotation
         [rotation type x y editing? hidden?]
         (with-default-lenses
           {rotation 0
            x        0
            y        0}
           (svg/g
            :debug (cell= (name (or type "")))
            :css (formula-of [editing? hidden?]
                   {:display (when (and (not editing?) hidden?)
                               "none")})
            (case-tpl (cell= type)
              :shape
              (shape-overlay annotation state handlers)

              :arrow
              (arrow-overlay annotation state handlers)

              :lines
              (lines-overlay annotation state handlers)

              :ppt
              (ppt-overlay annotation state handlers)

              (svg/g
               :debug "Unsupported type")))))))))

;;; Controls

(defn- coord-edit
  "Returns UI for a coordinate edit over `source`."
  [source]
  (validating-edit
   :width 50
   :source source
   :conform comm/conform-nonnegative-float
   :placeholder "0.00"
   :fmt (fn [v] (.toFixed v 2))))

(defn- helped
  "Wraps `contents` in an appropriate `with-help`."
  [help-tag contents]
  (with-help [:map-controls :annotations help-tag]
    contents))

(defn- location-controls
  "Returns UI for the location of an annotation."
  [label help-tag x y & extra-columns]
  (with-default-lenses
    {x 0
     y 0}
    (apply tr
           (td (helped help-tag label))
           (td (coord-edit x))
           (td (coord-edit y))
           extra-columns)))

(defn- shape-location-controls
  "Returns UI for the location of a shape annotation."
  [annotation]
  (with-key-lenses annotation [x y]
    (with-default-lenses
      {x 0
       y 0}
      (location-controls "Location:" :location x y))))

(defn- size-controls
  "Returns UI for the size of an annotation."
  [annotation]
  (with-key-lenses annotation [width height]
    (with-default-lenses
      {width  0
       height 0}
      (tr (td (helped :size "Size:"))
          (td (coord-edit width))
          (td (coord-edit height))))))

(defn- rotation-controls
  "Returns UI for the rotation of an annotation."
  [annotation]
  (with-key-lenses annotation [rotation]
    (with-default-lenses
      {rotation 0}
      (tr (td (helped :rotation "Rotation:"))
          (td (validating-edit
               :width 50
               :source rotation
               :conform (comm/float-conformer -360 360)
               :placeholder "0.00"
               :fmt (fn [v] (.toFixed v 2))))))))

(defn- range-controls
  "Returns UI for a range slider that moves between 1 and 100."
  [label help-tag source]
  (tr (td (helped help-tag label))
      (td (comm/slider
           :css {:width          (pct 100)
                 :vertical-align "middle"}
           :value source
           :min 1
           :max 100))
      (td (validating-edit
           :source source
           :width 50
           :placeholder "0.00"
           :conform (comm/float-conformer 1 100)
           :fmt (fn [v] (.toFixed v 2))))))

(defn- checkbox-controls
  "Returns UI for a boolean option."
  [label help-tag source]
  (tr (td (helped help-tag label))
      (td (comm/checkbox
           :css {:width          (pct 100)
                 :vertical-align "middle"}
           :value source))))

(defn- color-controls
  "Returns UI for a color picker control."
  [label help-tag source]
  (tr (td (helped help-tag label))
      (td (comm/color-picker2
           :value source
           :alpha? true))
      (td (validating-edit
           :width 70
           :source source
           :conform (fn [source*]
                      (formula-of [source*]
                        (let [c      (comm/tinycolor source*)
                              valid? (.isValid c)]
                          {:valid?  valid?
                           :message (when-not valid? "Must be a valid color")
                           :value   source*})))
           :placeholder "#aarrggbb"
           :fmt identity))))

(defn- point-controls
  [points]
  (table
   (map-lens-tpl points [k point]
    (let [point-names (point-names points)
          x     (comm/path-lens point [0])
          y     (comm/path-lens point [1])]
      (location-controls (cell= (str (point-names k) ":"))
                         :points
                         x
                         y
                         (td
                          (buttons/image-button
                           :click (fn [_]
                                    (swap! points dissoc @k))
                           ;; :css {:margin-left (px 10)}
                           :src "images/trash.png"
                           :title "Delete Point"
                           :width (px 16))))))))

(defn- line-point-controls
  "Returns UI for the locations of points within a line or arrow."
  [annotation map-viewbox]
  (div
   (with-key-lenses annotation [points open?]
     (div
      (inl
       (helped :closed? "Closed?")
       (comm/checkbox :value (comm/not-lens open?)))
      (point-controls points)
      (buttons/a-button
       :click (fn [_]
                (swap! annotation
                       update
                       :points
                       assoc
                       (unique-id)
                       (if (empty? @points)
                         (let [{:keys [x y width height]} @map-viewbox]
                           [(+ x (/ width 2))
                            (+ y (/ height 2))])
                         (-> @points
                             vals
                             last
                             (math/vector-add [0 (-> @map-viewbox
                                                     :width
                                                     (/ 20))])
                             (math/vector-clamp [0 0] [59 59])))))
       "Add New Point")))))

(defn- arrow-point-controls
  [annotation]
  (div
   (with-key-lenses annotation [points]
     (point-controls points))))

(defn- arrow-appearance-controls
  "Returns UI for the appearance of an arrow."
  [annotation]
  (with-key-lenses annotation [shaft arrowhead-length arrowhead-width heft]
    (with-default-lenses
      {shaft            0
       arrowhead-width  0
       arrowhead-length 0
       heft             0}
      (table
       (range-controls "Overall:" :heft heft)
       (range-controls "Shaft:" :shaft shaft)
       (range-controls "Head Width:" :arrowhead-width arrowhead-width)
       (range-controls "Head Length:" :arrowhead-length arrowhead-length)))))

(defn- text-controls
  "Returns UI for the controls used to render a text annotation."
  [annotation]
  (with-key-lenses annotation
    [font-size font-family font-color font-bold? font-italic?
     halign
     height
     rotation
     text
     valign
     width]
    (with-default-lenses
      {font-size 0}
      (table
       (range-controls "Font Size:" :font-size font-size)
       (tr (td (helped :font "Font:"))
           (td :colspan 2
               (comm/select2
                :css {:width (pct 100)}
                :value font-family
                :choices (for [font ["Arial"
                                     "Bookman"
                                     "Comic Sans MS"
                                     "Courier"
                                     "Courier New"
                                     "Garamond"
                                     "Georgia"
                                     "Helvetica"
                                     "Palatino"
                                     "Times"
                                     "Times New Roman"
                                     "Verdana"]]
                           {:value font
                            :label font})
                :formatter (fn [{:keys [label]}]
                             (span :css {:font-family label}
                                   label)))))
       (tr (td (helped :halign "Horizontal alignment:"))
           (td :colspan 2
               (comm/select2
                :css {:width (pct 100)}
                :value halign
                :choices [{:value "left"
                           :label "Left"}
                          {:value "center"
                           :label "Center"}
                          {:value "right"
                           :label "Right"}])))
       (tr (td (helped :valign "Vertical alignment:"))
           (td :colspan 2
               (comm/select2
                :css {:width (pct 100)}
                :value valign
                :choices [{:value :top
                           :label "Top"}
                          {:value :middle
                           :label "Middle"}
                          {:value :bottom
                           :label "Bottom"}])))
       (tr (td (helped :font-bold? "Bold?:"))
           (td (comm/checkbox :value font-bold?)))
       (tr (td (helped :font-italic? "Italic?:"))
           (td (comm/checkbox :value font-italic?)))
       (color-controls "Color:" :color font-color)
       (tr (td (helped :text "Text:"))
           (td :colspan 2
               :css {:padding-right (px 8)}
               (ta/textarea2
                :css (formula-of [font-family font-italic? font-bold?]
                       {:font-family          font-family
                        :font-style           (when font-italic? "italic")
                        :font-weight          (when font-bold? "bold")
                        :font-size            (pct 100)
                        :width                (pct 100)
                        :horizontal-alignment halign})
                :value text
                :change (fn [val]
                          (reset! text val))
                :placeholder "Enter text here")))))))

(defn- edge-controls
  "Returns UI for the controls used to set up edges."
  [annotation]
  (with-key-lenses annotation
    [edge-style
     edge-width
     edge-color
     edge-dash-length
     edge-dash-spacing]
    (with-default-lenses
      {edge-width        0
       edge-dash-length  0
       edge-dash-spacing 0}
      (table
       (let [dashed?     (cell= (= edge-style :dashed))
             has-edge? (cell= (#{:dashed :solid} edge-style))]
         (tbody
          (tr (td (helped :edge-style "Style:"))
              (td :colspan 2
                  (comm/select2
                   :css {:width (pct 100)}
                   :value edge-style
                   :choices [{:value :none
                              :label "No Edge"}
                             {:value :solid
                              :label "Solid"}
                             {:value :dashed
                              :label "Dashed"}]
                   :formatter :label)))
          (when-tpl has-edge?
            (color-controls "Color:" :edge-color edge-color))
          (when-tpl has-edge?
            (range-controls "Width:" :edge-width edge-width))
          (when-tpl dashed?
            (range-controls "Dash length:" :edge-dash-length edge-dash-length))
          (when-tpl dashed?
            (range-controls "Dash spacing:" :edge-dash-spacing edge-dash-spacing))))))))

(defn- threat-controls
  "Returns UI for selecting a pre-planned threat."
  [annotation threats]
  (with-key-lenses annotation [threat label]
    #_(add-watch
       threat
       (gensym)
       (fn [_ _ _ n]
         (when (and n @annotation)
           (reset! label nil))))
    (tbody
     (tr
      (td (helped :threat "Threat:"))
      (td
       (comm/select2
        :css {:width (px 150)}
        :value threat
        :choices (formula-of [threats]
                   (for [{:keys [id radius-ft description] :as threat} threats]
                     {:value threat
                      :label (str id " " description)}))
        :formatter (fn [{:keys [value label]}]
                     (let [{:keys [id radius-ft description]} value]
                       (div
                        (span
                         :css {:font-weight "bold"
                               :margin-right (px 5)}
                         id)
                        (span
                         :css {:margin-right (px 5)}
                         "(" description ")")
                        (span (.toFixed (coords/ft->nm radius-ft) 1)
                              "nm")))))))
     (tr
      (td (helped :label "Label:"))
      (td (input :css {:width (pct 97)}
                 :value label
                 :placeholder (cell= (when-not label (:id threat)))
                 :input #(reset! label @%)))
      (td (buttons/a-button
           :click #(reset! label nil)
           "Reset")
          (help-icon [:map-controls :annotations :reset-label]))))))

(defn- annotation-edit-section
  [{:keys [annotations map-viewbox map-zoom mission] :as state}]
  (control-section
   :title (helped :overview "Annotations")
   (div
    (let [make (fn [type overrides]
                 (let [{:keys [x y width height]} @map-viewbox
                       font-size                  (scale->font-size (/ width 59 4))]
                   (swap! annotations
                          assoc
                          (unique-id)
                          (let [defaults {:type              type
                                          :shape-type        :rectangle
                                          :text              "Edit this text"
                                          :font-size         font-size
                                          :font-color        "white"
                                          :font-family       "Times New Roman"
                                          :halign            "center"
                                          :valign            :middle
                                          :fill-color        "#80000000"
                                          :filled?           true
                                          :x                 (+ x (/ width 4))
                                          :y                 (+ y (/ height 2.0))
                                          :width             (/ width 2)
                                          :height            (/ height 12)
                                          :rotation          0
                                          :editing?          true
                                          :hidden?           false
                                          :edge-style        :solid
                                          :edge-color        "black"
                                          :edge-width        (/ 12 @map-zoom)
                                          :edge-dash-length  font-size
                                          :edge-dash-spacing 50}]
                            (merge defaults (overrides defaults))))))]
      (div
       (buttons/a-button
        :click #(make :shape (constantly nil))
        "Add Shape")
       (buttons/a-button
        :click #(make :arrow (fn [{:keys [font-size width x y]}]
                               (let [zoom    @map-zoom
                                     rescale (fn [val lower upper]
                                               (-> val
                                                   (linear->exp 1 100 lower upper)
                                                   (/ zoom)
                                                   (exp->linear 1 100 lower upper)))]
                                 {:shaft            (rescale 70 0.005 4)
                                  :arrowhead-width  (rescale 65 0.005 25)
                                  :arrowhead-length (rescale 82 0.005 10)
                                  :heft             50
                                  :points           (sorted-map 0 [x y]
                                                                1 [(+ x width) y])})))
        "Add Arrow")
       (buttons/a-button
        :click #(make :lines (fn [{:keys [font-size width x y]}]
                               (let [zoom    @map-zoom
                                     rescale (fn [val lower upper]
                                               (-> val
                                                   (linear->exp 1 100 lower upper)
                                                   (/ zoom)
                                                   (exp->linear 1 100 lower upper)))]
                                 {:points (sorted-map 0 [x y]
                                                      1 [(+ x width) y])
                                  :open?  true})))
        "Add Lines")
       (buttons/a-button
        :click #(make :ppt (fn [{:keys [font-size width x y]}]
                             {:threat      (-> @mission :ppt-data first)
                              :text        (-> @mission :ppt-data first :id)
                              :font-family "Courier New"
                              :filled?     false
                              :fill-color  "#80ff0000"
                              :edge-color  "red"
                              :edge-width  12
                              :x           (+ x (/ width 2))}))
        "Add PPT")))
    (div
     :css {:display   "flex"
           :flex-wrap "wrap"}
     #_(div
        :css {:display "pre-wrap"}
        (cell= (pr-str annotations)))
     (keyed-for-tpl key
         [[k _] annotations]
         (let [annotation (map-lens annotations k)]
           (with-key-lenses annotation [type shape-type editing? hidden? fill-color filled? open?]
             (div
              :css (formula-of [hidden? editing?]
                     {:border-width  (px 3)
                      :border-style  (if hidden? "dashed" "double")
                      :background    (cond editing? "#e0ffff" hidden? "#f0f0f0")
                      :padding       (px 0 5 30)
                      :margin-bottom (px 3)
                      :margin-right  (px 3)
                      :min-width     (px 350)
                      :min-height    (px 330)
                      :position      "relative"})
              (div
               :css {:margin (px 5 0 15 7)}
               (inl
                {:css {:margin-right (px 10)}}
                (helped :type "Type:"))
               (inl
                (case-tpl type
                  :shape
                  (comm/select2
                   :css {:width (px 125)}
                   :value shape-type
                   :choices [{:value :rectangle
                              :label "Rectangle"}
                             {:value :oval
                              :label "Oval"}])

                  :arrow
                  (span {:css {:font-size (pct 110)}}
                        "Arrow")

                  :lines
                  (span {:css {:font-size (pct 110)}}
                        "Lines")

                  :ppt
                  (span {:css {:font-size (pct 110)}}
                        "PPT"))))
              (let [all-tabs [{:id    :shape-positioning
                               :title "Positioning"
                               :ui
                               (table
                                (shape-location-controls annotation)
                                (size-controls annotation)
                                (rotation-controls annotation))}
                              {:id    :arrow-positioning
                               :title "Positioning"
                               :ui    (arrow-point-controls annotation)}
                              {:id    :line-positioning
                               :title "Points"
                               :ui    (line-point-controls annotation
                                                           map-viewbox)}
                              {:id    :ppt-positioning
                               :title "Positioning"
                               :ui
                               (table
                                (shape-location-controls annotation))}
                              {:id    :threat
                               :title "Threat"
                               :ui    (with-key-lenses mission [ppt-data]
                                        (table
                                         (threat-controls annotation ppt-data)))}
                              {:id    :arrow-appearance
                               :title "Appearance"
                               :ui    (arrow-appearance-controls annotation)}
                              {:id    :edge
                               :title "Edges"
                               :ui    (edge-controls annotation)}
                              {:id      :fill
                               :title   "Fill"
                               :hidden? (cell= (and (= type :lines) open?))
                               :ui
                               (comm/styled
                                :garden [:td {:min-width (px 40)}]
                                (table
                                 (checkbox-controls "Fill:" :filled? filled?)
                                 (when-tpl filled?
                                   (color-controls "Color:" :fill-color fill-color))))}
                              {:id    :text
                               :title "Text"
                               :ui    (text-controls annotation)}
                              {:id    :debug
                               :title "Debug"
                               :ui    (pre
                                       :css {:white-space "pre-wrap"}
                                       (cell= (with-out-str (pprint (into (sorted-map) annotation)))))}]
                    tabs     {:shape [:shape-positioning :edge :fill :text #_:debug]
                              :arrow [:arrow-positioning :arrow-appearance :edge :fill #_:debug]
                              :lines [:line-positioning :edge :fill #_:debug]
                              :ppt   [:threat :ppt-positioning :edge :fill #_:debug]}]
                (formula-of [type]
                  (tabs/tabs
                   :selected (cell (-> tabs (get type) first))
                   :tabs (->> all-tabs
                              (filter #(contains? (-> tabs (get type) set)
                                                  (:id %)))))))
              (div
               :css {:position "absolute"
                     :bottom   (px 7)}
               (help-icon [:map-controls :annotations :edit-buttons]))
              (buttons/image-button
               :css {:position "absolute"
                     :bottom   (px 5)
                     :left     (px 30)}
               :click #(swap! editing? not)
               :title "Edit"
               :src "images/edit.svg"
               :width "16px"
               :height "16px"
               :latched? editing?)
              (buttons/image-button
               :css {:position "absolute"
                     :bottom   (px 5)
                     :left     (px (+ 30 27))}
               :click #(swap! hidden? not)
               :title "Hide"
               :src "images/hide-eye.svg"
               :width "16px"
               :height "16px"
               :latched? hidden?)
              (buttons/image-button
               :css {:position "absolute"
                     :bottom   (px 5)
                     :left     (px (+ 30 (* 27 2)))}
               :click #(swap! annotations
                              assoc
                              (unique-id)
                              @annotation)
               :title "Copy"
               :src "images/copy.svg"
               :width "16px"
               :height "16px")
              (buttons/image-button
               :css {:position "absolute"
                     :bottom   (px 5)
                     :right    (px 5)}
               :src "images/trash.png"
               :width "16px"
               :title "Remove"
               :click #(swap! annotations
                              dissoc
                              @k))))))))))

(defn- save-annotations
  [{:keys [mission annotations build-info]}]
  (comm/save-data
   {:data         (encode {:vmt-version (get build-info "VERSION")
                           :annotations (vals @annotations)})
    :title        "Save VMT Annoations"
    :filters      [{:name "VMT Annotations"
                    :extension ["vmta"]}]
    :default-path (-> @mission
                      :mission-name
                      (fs/basename {:omit-extension? true})
                      (str ".vmta"))}))

(defn- load-annotations
  [{:keys [annotations build-info serialization-messages]}]
  (when-let [path (comm/get-path-for-load
                   {:title        "Load VMT Annotations"
                    :filters      [{:name      "VMT Annotations"
                                    :extensions ["vmta"]}]
                    :default-path nil})]
    (let [decoded                           (-> path fs/file-text decode)
          this-version                      (get build-info "VERSION")
          {loaded-version     :vmt-version
           loaded-annotations :annotations} decoded]
      (swap! annotations
             merge
             (zipmap
              (repeatedly unique-id)
              loaded-annotations))
      (when (not= loaded-version (get build-info "VERSION"))
        (swap! serialization-messages
               assoc
               (unique-id)
               (str "You are running version "
                    (or this-version "(no version)")
                    "of VMT, but the loaded annotation file was saved with version "
                    (or loaded-version "(no version)")
                    ". Using different versions of VMT does not usually cause a problem, but if you see anything unusal in the loaded annotations, this may be the reason."))))))

(defn- import-annotations
  [{:keys [annotations mission build-info serialization-messages]}]
  (when-let [path (comm/get-path-for-load
                   {:title        "Choose VMT Briefing"
                    :filters      [{:name       "VMT Briefing"
                                    :extensions ["vmtb"]}]
                    :default-path nil})]
    (let [decoded                        (->> path
                                              fs/file-buffer
                                              decompress
                                              decode)
          {loaded-version  :vmt-version
           briefing-data   :briefing
           annotation-data :annotations} decoded
          loaded-install                 (:install-id briefing-data)
          loaded-theater                 (:theaterdef-name briefing-data)
          loaded-annotations             (:annotations annotation-data)
          this-installs                  (if-let [install-id (:install-id @mission)]
                                           #{install-id}
                                           (-> @mission :installs keys set))
          this-version                   (get build-info "VERSION")
          this-theater                   (mission/theaterdef-name @mission)]
      (.log js/console "briefing" (pr-str (keys briefing-data)))
      (.log js/console "annotation-data" (pr-str annotation-data))
      (.log js/console "annotations" (count loaded-annotations))
      (cond

        (zero? (count loaded-annotations))
        (swap! serialization-messages
               assoc
               (unique-id)
               "No annotations were found in the briefing.")

        :else
        (do
          (when-not (= this-theater loaded-theater)
            (swap! serialization-messages
                   assoc
                   (unique-id)
                   (str "The selected briefing is for theater "
                        loaded-theater
                        " but this mission is for theater "
                        this-theater
                        ". The locations of the loaded annotations may therefore be incorrect.")))

          (when-not (this-installs loaded-install)
            (swap! serialization-messages
                   assoc
                   (unique-id)
                   (str "The imported briefing was saved for installation "
                        loaded-install
                        " but this mission targets "
                        (util/format-list {:conjuction "or"} this-installs)
                        ". Unexpected results may occur.")))
          (when (not= loaded-version (get build-info "VERSION"))
            (swap! serialization-messages
                   assoc
                   (unique-id)
                   (str "You are running version "
                        (or this-version "(no version)")
                        "of VMT, but the loaded annotation file was saved with version "
                        (or loaded-version "(no version)")
                        ". Using different versions of VMT does not usually cause a problem, but if you see anything unusal in the loaded annotations, this may be the reason.")))
          (swap! annotations
                 merge
                 (zipmap (repeatedly unique-id)
                         loaded-annotations)))))))

(defn- annotation-serialization-section
  [{:keys [annotations mission] :as state}]
  (let [messages (cell (sorted-map))
        state (assoc state :serialization-messages messages)]
    (control-section
     :title (helped :serialization "Save/load")
     (buttons/a-button
      :click #(save-annotations state)
      :disabled? (cell= (empty? annotations))
      "Save")
     (buttons/a-button
      :click #(load-annotations state)
      "Load")
     (buttons/a-button
      :click #(import-annotations state)
      "Import From Briefing")
     (help-icon [:map-controls :annotations :serialization-buttons])
     (map-lens-tpl messages [id message]
       (div
        :css {:border        "double"
              :border-color  "black"
              :background    "#945594"
              :color         "white"
              :position      "relative"
              :margin-bottom (px 3)
              :padding       (px 0 3)}
        (styled
         :garden [:a {:color "#ebff00"}]
         :css {:display       "inline-block"
               :padding-right (px 10)}
         message)
        (div
         :css {:position    "absolute"
               :color       "#ff6b6b"
               :font-size   (pct 150)
               :font-weight "bold"
               :top         (px -8)
               :right       (px 5)
               :cursor      "pointer"}
         :click #(swap! messages dissoc @id)
         "×"))))))

(defn- controls
  "Returns UI for the map annotation controls."
  [state]
  (div
   (annotation-serialization-section state)
   (annotation-edit-section state)))

(defn create
  "Creates the annotations layer."
  [mission {:keys [map-viewbox map-zoom] :as state}]
  (let [state (assoc state
                     :annotations (cell (sorted-map))
                     :mission mission)]
    {:controls-fn (fn [] (controls state))
     :overlay-fn  (fn [register-drag-handler]
                    (overlay state register-drag-handler))
     :state       state}))

(defn briefing-data
  "Returns data for saving in a briefing file."
  [layer]
  {:annotations (->> layer
                     :state
                     :annotations
                     deref
                     vals
                     (map #(assoc % :editing? false)))})

(defn load-briefing-data
  "Given briefing data, update the layer with the state from it."
  [layer data]
  (reset! (get-in layer [:state :annotations])
          (into (sorted-map)
                (some->>
                 data
                 :annotations
                 (zipmap (repeatedly unique-id))))))
