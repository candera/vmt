(ns weathergen.help
  (:require [goog.dom :as gdom]
            [goog.string :as gstring]
            [goog.string.format]
            [hiccups.runtime]
            [hoplon.core :refer [b dl dt dd div do-watch em i img li ol p span strong table tbody td tr ul with-timeout]]
            [hoplon.svg :as svg]
            [javelin.core :refer [cell cell= with-let]]
            [rum.core :as rum]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)]
            [weathergen.ui.buttons :as buttons]
            [weathergen.ui.common :as comm :refer [inl px when-dom*]]
            [weathergen.wind :as wind])
  (:require-macros [hiccups.core :as hic]))

;; (set! *warn-on-infer* true)

(defn wind-barb
  [speed heading]
  (svg/svg
   :viewBox "0 0 1 1"
   :width 20
   :height 20
   :attr {"xmlns:xlink" "http://www.w3.org/1999/xlink"
          "xmlns" "http://www.w3.org/2000/svg"
          :overflow "visible"}
   (svg/g
    :transform "translate(0.5, 0.5)"
    (svg/g
     :transform (gstring/format "rotate(%d)" heading)
     (wind/barb speed)))))

(defn- frag
  "Create a document fragment given an HTML string."
  [s]
  (-> js/document .createRange (.createContextualFragment s)))

(defn- hiccup
  "Returns a DOM node given Hiccup data."
  [data]
  (-> data hic/html frag))

(let [ctors {:b      b
             :dl     dl
             :dt     dt
             :dd     dd
             :div    div
             :em     em
             :i      i
             :img    img
             :li     li
             :ol     ol
             :p      p
             :span   span
             :strong strong
             :table  table
             :tbody  tbody
             :td     td
             :tr     tr
             :ul     ul}]
 (defn- hoplonify
   [node]
   #_(println "hoplonify" node)
   (cond
     (keyword? node)
     (get ctors node)

     (vector? node)
     (let [[e & more] node]
       (apply (hoplonify e) (map hoplonify more)))

     (sequential? node)
     (map hoplonify node)

     (map? node)
     (-> node
         (assoc :css (:style node))
         (dissoc :style))

     :else
     node)))

(defn- content
  "Returns a function that renders the content in the standard way - as
  hoplon elements in hoplon mode, and react components in react mode."
  [& data]
  (fn [mode]
    (condp = mode
      :hoplon (with-let [frag (.createDocumentFragment js/document)]
                (doseq [item data]
                  (gdom/appendChild frag (hoplonify item))))
      :react data)))

(defn- content-para
  "Returns `(content [:div [:p contents]])`."
  [contents]
  (content
   [:div
    [:p contents]]))

(def color-text "Use either the color dropdown or the text box. Color names entered into the text box can be color names like \"red\" or \"blue\" or HTML color codes like \"#FF123456\". Note also the transparency slider at the bottom of the color dropdown. Use this to make colors partially for fully transparent.")

(def slider-text "Use the slider to adjust or enter a number between 1 and 100 directly.")

;; These are functions because we need to be able to show the same
;; help in more than one place, and if we simply return a node, it
;; will get moved rather than cloned when we attach it to a new place
;; in the DOM.
(def help-content-ctors
  {:tools
   {:damage-computer
    (content
     [:div
      [:p "Displays an esimtate of how many weapon hits it
     will required to destroy a target. Choose an objective from the
     left dropdown and a weapon from the right to see an estimate for
     all the features at that objective."]
      [:p "The grid shows all features at an objective. Features with
      a value listed are the ones that are target assignable in BMS
      and will be displayed in the Recon list.."]])

    :database-export
    (content-para "Exports the mission database to a series of CSV files. Use the dialog box to select a directory. Files will be written here with names in the pattern \"THEATER-MISSION-CATEGORY.csv\".")}

   :serialization-controls
   {:save-single-files
    (content
     [:p
      "This section allows saving and loading of the various
      weather-related files that VMT can use. Files should be saved
      with the same name as the mission (.cam or .tac) file, but with
      the extension changed as appropriate. For instance, if you're
      making a mission called 'oca-strike.tac', save the TWX file as
      'oca-strike.twx'. The filename will use the mission name of the
      loaded mission section if possible."]

     [:dl
      [:dt "Save Current As FMAP"]
      [:dd "Saves a single .fmap file with the weather data currently
        displayed on the map. Contains wind, weather type, pressure,
        and temperature data for each cell in the grid."]

      [:dt "Save .TWX"]
      [:dd "Saves a .twx file, which contains the values from the
        'Clouds and Contrails' section. This file should be saved with
        the same name as the mission (.tac or .cam) file, but with a
        .twx extension."]

      [:dt "Save Settings"]
      [:dd "Saves a .vmtw file with all the weather-related values
        from the VMT application. Use this to preserve the state of
        generated weather in VMT so you can later pick up where you
        left off when editing related missions."]

      [:dt "Load Settings"]
      [:dd "Loads a previously saved .vmtw file. Note that
        this will overwrite any settings currently in use - be sure to
        save first if necessary."]])

    :multi-save
    {:overview
     (content
      [:p "Use this feature to save all weather-related files for the
        mission. Requires that a mission be loaded. The following
        files will be saved:"]
      [:ul
       [:li [:b [:i "mission-name"] ".fmap"]
        " - "
        "An FMAP file containing the starting weather for the
             designated time block."]
       [:li [:b [:i "mission-name"] ".twx"]
        " - "
        "A TWX file containing the clouds and contrails settings."]
       [:li [:b [:i "mission-name"] ".setting.edn"]
        " - "
        "Contains the settings used to generate the
             package."]
       [:li [:b "WeatherMapsUpdates"]
        " - "
        "A folder containing the timestamped FMAP files."]])

     :from
     (content-para
      "The generated FMAP files in the WeatherMapsUpdates folder will start from this time.")

     :to
     (content-para
      "The generated FMAP files in the WeatherMapsUpdates folder will end at this time.")

     :step
     (content-para
      "The generated FMAP files in the WeatherMapsUpdates folder will
     be this many minutes apart.")

     :mission-name
     (content-para
      "The name of the mission file (.cam or .tac) for which
     weather is being generated. This value will be used to name the
     generated .twx and .fmap files.")

     :mission-date
     (content-para
      "Sets the date of the flight. This controls sunrise, sunset, moon phase, etc. See BMS manual for more details.")}}

   :weather-display-controls
   {:map
    (content-para
     "Chooses the map image displayed in the background.")

    :display
    (content
     [:p "Selects what will be displayed on the weather grid at the left."]
     [:dl
      [:dt "None"]
      [:dd "No data will be displayed"]
      [:dt "Weather Type"]
      [:dd "Display the type of weather, which determines cloud cover
   and precipitation in Falcon. Note that unlike a radar map you might
   see on TV, green does " (em "not") " indicate rain."
       [:dl
        [:dt "Red"]    [:dd "Inclement weather"]
        [:dt "Yellow"] [:dd "Poor weather"]
        [:dt "Green"]  [:dd "Fair weather"]
        [:dt "Clear"]  [:dd "Sunny weather"]]]
      [:dt "Pressure"]
      [:dd "The barometric pressure will be displayed. Red indicates
      low pressure, white indicates high pressure. Use the pressure
      overlay or click a cell to get exact values."]
      [:dt "Temperature"]
      [:dd "The air pressure will be displayed. White indicates cold
      temperatures. Red indicates high temperatures. Use the pressure
      overlay or click a cell to get exact values."]])

    :overlay
    (content
     [:p "Selects what data will be shown in each cell of the grid,
    overlaid on the data selcted for 'Display'. Wind is shown as a
    bent line, with the tail(s) in the direction the wind is coming
    from. Each full tail indicates ten knots of wind speed, and a half
    tail adds five."]
     [:p "Text overlays may be hard to read when the map grid is
     small. Zoom the map to enlarge. Or click a cell to read the same
     data from the forecast section."])

    :pressure
    (content-para
     "Units for pressure measurements - inches Mercury (InHg) or millibars.")

    :opacity
    (content-para
     "Controls how opaque or transparent the display layer will be.
    Slide the slider to the left to more easily see the map.")}

   :weather-params
   {:seed
    (content-para
     "The seed selects a weather system. Changing this will change
    the weather pattern entirely. Use any whole number. Click the
    'Random' button to have the system choose a seed randomly.")

    :crossfade
    (content-para
     "The degree to which adjacent weather types will be blended
    together. Zero means that winds, etc. will shift abruptly at
    weather type boundaries. A good value to use is 0.1. Values above
    about 0.3 will give strange results.")

    :origin
    {:x
     (content-para
      "The x location in 'weather space' that is displayed
   on the grid. You will not normally edit this field, but you can
   change it to see different parts of the weather pattern.")

     :y
     (content-para
      "The y location in 'weather space' that is displayed
on the grid. You will not normally edit this field, but you can change
it to see different parts of the weather pattern.")}

    :time
    {:offset
     (content-para
      "The time in 'weather space' that is displayed on the grid.
You will not normally edit this field, but you can change it to move
forward and backward in time. ")

     :falcon-time
     (content
      [:p "The current time in the Falcon world. Time cannot be advanced
     past this point, as that would be peeking into the future."]
      [:p "Click the 'Jump to' button to set the displayed weather to
     this time."])

     :browse-time
     (content
      [:p "Enter a time here to view the weather at that time. Use the
     format 'dd/hhmm', where 'dd', 'hh', and 'mm' are the numeric day,
     hour, and minute. For example, '01/1200' will show the weather at
     noon of day 1."]
      [:p "Note that you will be unable to move the time past 'Falcon
      time' above, as that would be peeking into the future. Use the
      Forecast section below to get a (potentially slightly
      inaccurate) forecast instead."])}

    :feature-size
    (content-para
     "How 'zoomed in' the weather will be on the underlying weather
    pattern. Make this number bigger to get larger storm cells and
    larger areas of fair weather. Make it smaller to get weather that
    changes more frequently.")

    :pressure
    {:max (content-para "The maximum barometric pressure that will be generated.")
     :min (content-para "The minimum barometric pressure that will be generated.")
     :variance
     (content-para "To prevent unrealistically large differences in
     pressure across the theater, this value determins the maximum
     allowed difference between the highest and lowest generated
     pressures. The mean pressure will vary over time between the min
     and the max.")
     :speed
     (content-para
     "To prevent unrealistically large jumps in pressure changes that
     were generated by previous versions of VMT, pressure varies
     around a mean pressure (modified by weather type) by only a
     moderate amount across the theater. This mean pressure will vary
     with time in proportion to the speed provided here, with 100
     being a good value and the default.")}

    :prevailing-wind
    {:heading (content-para "The direction of the prevailing
    wind. Although wind direction varies, especially around high- and
    low-pressure areas, more wind will be generated in this direction
    than in any other.")}

    :wind-uniformity
    (content-para
     "Controls how much the wind speed will vary between the bounds
    set under 'Weather type configuration'. Should be between zero and
    one. Lower values produce more winds near the mean for that
    weather type. Higher values produce more wind speeds near the min
    and max for that weather type.")

    :temp-uniformity
    (content-para
     "Controls how much the temperature will vary between the bounds
    set under 'Weather type configuration'. Should be between zero and
    one. Lower values produce more temperatures near the mean for that
    weather type. Higher values produce more temperatures near the min
    and max for that weather type.")

    :turbulence
    {:power
     (content
      [:p "Weather patterns are generated by taking an underlying, regular pattern and 'warping' it into random shapes. This parameter controls how strong this warp is. Set it to zero to see the underlying weather pattern with no warping. Higher value produce more warping."]
      [:p "As warp strength increases, you will probably have to set a higher zoom to get good results."])}

    :evolution
    (content-para
     "The number of minutes it takes for the weather to completely
     change, even if not moving.")}

   :weather-type-config
   {:pressure
    (content-para
     "Weather types (sunny, fair, poor, and inclement) are
    determined by the barometric pressure. Set the thresholds for
    which pressures determine which weather types here. ")

    :wind
    (content-para
     "The minimum, maximum, and mean wind speeds for each weather
     type. Due to crossfading, these values are not strict - wind can
     be higher than the maximum or lower than the minimum near the
     edges of other weather types.")

    :temp
    (content-para
     "The minimum, maximum, and mean temperatures for each weather
     type. Due to crossfading, these values are not strict -
     temperature can be higher than the maximum or lower than the
     minimum near the edges of other weather types.")

    :category
    (content
     [:p
      "Sets the relative amount of the various weather types. Move the
     slider for e.g. `sunny` to the left to decrease the amount of
     sunny weather that will be generated. Note that decreasing the
     amount of one type of weather automatically increases the amount
     of the other types, as every location on the map has to have one
     of the four weather types."]
     [:p
      "If you want to dictate more closely the configuration of
      weather types, consider using weather overrides instead."])}

   :displayed-time
   (content
    [:p "Controls the Falcon Time that the current weather corresponds
   to. Edit the day, minute, and hour and then use one of the two
   buttons."]
    [:dl
     [:dt "Jump to"]
     [:dd "Jumps forward or backward to the indicated time. The
     displayed weather may change."]
     [:dt "Set to"]
     [:dd "Sets the time to the indicated time. The displayed weather
     will not change."]]
    [:p "The time is used to generate file names for downloaded FMAP
   files, which Falcon relies on to automatically update weather."])

   :movement-params
   {:direction
    {:heading (content-para "The direction the weather pattern will move in.")
     :speed   (content-para "The speed at which the weather pattern will move.")}}

   :step
   (content-para
    "The number of minutes each click of the 'Step forward' or 'Step
   backward' buttons will move in time. Also influences how many rows
   there are in the weather forecast.")

   :forecast
   {:overview
    (content-para
     "Displays the weather forecast for the selected location in
   the weather grid.")

    :share
    (content-para
     "The 'shareable forecast' link goes to a view of the weather
   that can be handed out to other pilots. It does not allow editing,
   nor advancing the weather past the current time, but does include
   the (potentially inaccurate) forecast, any loaded DTC files, wind
   stability regions, etc. etc.")

    :time
    (content-para
     "The date and time of the forecast conditions. Forecasts
     are (as in the real world) not perfectly accurate.")

    :type
    (content-para
     "The forecast Falcon weather type at the selected location.")

    :pressure
    (content-para
     "The forecast barometric pressure at the selected location.")
    :temperature
    (content-para
     "The forecast temperature (in degrees C) at the selected location.")
    :wind
    (content-para
     "The forecast wind strength and direction at the selected
     location. E.g. '05kts@270' is a 5-knot wind from the west. Note
     that wind directions indicate the direction the wind is coming
     from, not the direction it is blowing towards.")
    :visibility
    (content-para
     "The forecast visibility (in km) at the selected location.")
    :precipitation
    (content-para
     "The forecast precipitation at the selected location.")
    :cloud
    (content
     [:p "The forecast cloud cover at the selected location."]
     [:dl
      [:dt "SKC"]
      [:dd "Sky is clear - no significant clouds. A thin 'stratus'
        layer may be present."]
      [:dt "FEWxxx"]
      [:dd "Cumulus clouds covering less than 25% of the sky are
        present, with a base at xxx hundreds of feet. E.g. FEW050
        indicates cumulus clouds present at 5000 feet MSL."]
      [:dt "SCTxxx"]
      [:dd "Cumulus clouds covering between 25% and 50% of the sky
        are present, with a base at xxx hundreds of feet. E.g. SCT050
        indicates cumulus clouds present at 5000 feet MSL."]
      [:dt "OVCxxx"]
      [:dd "A solid overcast layer is present with a base at xxx
        hundreds of feet. E.g. OVC050 indicates a solid overcast
        starting at 5000 feet MSL."]
      [:dt "COTRAxxx"]
      [:dd "Contrails form above xxx, in hundreds of feet. E.g.
        COTRA200 indicates contrails above 20000 feet MSL."]])}

   :weather-overrides
   {:overview
    (content-para
     "Weather type is determined from air pressure - lower pressure
   yields inclement or poor weather, and higher pressure fair and
   sunny weather. By default, pressure is generated randomly, but it
   can be overridden for certain locations and times using the
   controls in this section.")

    :center
    (content-para
     "The X and Y coordinates of the center of the override region.")

    :radius
    (content-para
     "The radius of the override region, measured in cells.")

    :falloff
    (content-para
     "The distance from the center of the region at which the
    override pressure begins to be blended into the surrounding
    pressure. Set this to zero to have a very gradual transition. Set
    it to the radius to have an abrupt edge to the region. Note that
    abrupt changes may result in odd weather effects in the sim. A
    falloff of at least four less than the radius is recommended.")

    :pressure
    (content-para
     "The override pressure for the region. Use the values from the
    Weather Type Configuration section to select an appropriate value
    for the type of weather you are trying to enforce.")

    :strength
    (content-para
     "Controls to what degree the underlying pressure pattern will
    be overridden. This value should be between zero and one. A value
    of one completely replaces the underlying pressure with the value
    from the 'pressure' field above. A value of 0.5 would produce a
    value halfway between the value from the 'pressure' field and the
    underlying pattern.")

    :show-outline?
    (content-para
     "Controls whether the outline of the override region will be
    shown. Note that this setting also affects the shareable
    forecast.")

    :animate?
    (content-para
     "If checked, the weather override will appear and disappear at
    the times specified below. If unchecked, the weather override will
    always be in effect.")

    :begin
    (content-para
     "The time at which the weather override will begin to take
    effect. The pressure (and therefore the weather type) will
    gradually change from the unmodified value to the overridden value
    between this time and the peak time.")

    :peak
    (content-para
     "The time at which the weather override will reach full
    strength. It will continue at full strength from this time until
    the taper time.")

    :taper
    (content-para
     "The time at which the weather override will begin to fade out.
    The pressure (and therefore the weather time) will gradually
    change from the overriden value to the unmodified value between
    this time and the end time.")

    :end
    (content-para
     "The time at which this override will no longer be in effect.")

    :exclude-from-forecast?
    (content
     [:p "If checked, the effects of the override will not be included
    in the shareable forecast. This allows weather planners to include
    'surprises'."]
     [:p "Note that the effects of the override " (em "will") " be
     visible in the shared forecast for times before 'now'. This is
     because it doesn't make any sense to hide events that occurred in
     the past - the user can simply navigate to them."])}

   :flight-paths
   {
    :section
    (content-para
     "Load flight plans from a mission .ini/DTC file so they can be
     shown on the map.")
    :name
    (content-para
     "An arbitrary label for this flight path, usually the flight
    callsign. Click the pencil icon to edit it. The name is not shown
    on the map.")
    :show?
    (content-para
     "If checked, flight path will be shown. If unchecked,
    flight path will be hidden.")
    :show-lines?
    (content-para
     "If checked, steerpoint lines from the DTC (if any) will be
    shown. If unchecked, steerpoint lines will be hidden.")
    :show-numbers?
    (content-para
     "If checked, steerpoints not otherwise labeled will be labeled
     with their numbers.")
    :show-labels?
    (content-para
     "If checked, alternate field and tanker steerpoints will be
     labeled as such.")
    :color
    (content-para
     "Change the color in which the flight path and labels will be
    drawn on the map.")
    :scale
    (content-para
     "Drag the slider left and right to decrease or increase the
    size of the text and flight path lines.")
    :remove
    (content-para
     "Click to permanently remove this flight path from the
    list.")}

   :visibility-and-contrails
   {:overview
    (content-para
     "Set the parameters for generated visibility and theater-wide
      contrail altitudes by weather type.")}

   :ground-wind-and-temp
   {:overview
    (content-para
     "Set the winds and temperatures at ground level. BMS will vary
      the temperature by altitude based on its atmospheric model.
      Winds can be varied by altitude using the \"winds aloft\"
      section below.")}

   :wind
   {:min
    (content-para
     "The lowest ground-level wind speed that will be generated for
     each weather type.")

    :mean
    (content-para
     "The mean ground-level wind speed that will be generated for
     each weather type.")

    :max
    (content-para
     "The maximum ground-level wind speed that will be generated for
     each weather type.")}

   :temp
   {:min
    (content-para
     "The lowest ground-level temperature that will be generated for
     each weather type.")

    :mean
    (content-para
     "The mean ground-level temperature that will be generated for
     each weather type.")

    :max
    (content-para
     "The maximum ground-level temperature that will be generated for
     each weather type.")}

   :winds-aloft
   {:overview
    (content-para
     "Defines how winds will change from ground-level values as
     altitude increases. See the BMS Manual for more details.")

    :speed
    (content-para
     "For each altitude, provides overrides for the min and max wind
     speeds that will be generated.")

    :heading-bias
    (content-para
     "A value from 0 to 1 that determines how much the wind will be
     adjusted towards the 'Prevaling Wind' direction. For instance, if
     the generated ground wind in a certain location is at 270
     degress, and the prevailing wind direction is 180, a value of 0.5
     will blend the two values equally, resulting in a wind direction
     of 225.")}

   :clouds
   {:overview
    (content-para
     "Edit the settings controlling generated clouds, visibility, contrails and wind.")

    :buttons
    (content
     [:dl
      [:dt "Randomize Clouds & Vis"]
      [:dl "Set the values for contrails, high clouds, low clouds, and
      visibility to random (but valid) values."]

      [:dt "Randomize Wind"]
      [:dl "Set the wind values to random (but valid) values."]

      [:dt "Randomize Temperature"]
      [:dl "Set the temperature values to random (but valid) values."]

      [:dt "Reset to Defaults"]
      [:dl "Reset the cloud, wind, and temperature values to their default values."]

      [:dt "Save TWX"]
      [:dl
       [:p "Save TWX: Saves a .twx file, which contains the cloud and
        contrail values from this section. This file should be saved
        with the same name as the mission (.tac or .cam) file, but
        with a .twx extension."]]])


    :high
    {:overview
     (content-para
      "Sets the theater-wide (does not vary by location) of the
      altitude of the high cloud layer by weather type.")}

    :low
    {:overview
     (content-para
      "Edit the occurrence and configuration of low clouds. Low clouds
      are those typically occurring below 10,000 feet.")

     :base
     (content-para
      "The altitude (in feet) of the base of the cloud layer for each
      weather type.")

     :size
     (content-para
      "The relative size of the clouds in this layer for each weather
      type. Range is zero to five. Zero is smallest, and corresponds
      to 'Cumulus Congestus' in the BMS UI. ")

     :coverage
     (content
      [:p
       "How much of the sky is covered by clouds for each weather type."]
      [:dl
       [:dt "Few"]
       [:dd "Up to one quarter coverage (0-2 octa)."]

       [:dt "Scattered"]
       [:dd "One quarter to one half coverage (2-4 octa)."]

       [:dt "Broken"]
       [:dd "One half to three quarters coverage (4-6 octa)."]

       [:dt "Overcast"]
       [:dd "Three quarters to full coverage (6-8 octa)."]])

     :towering
     (content-para
      "How often cumulus clouds will tower, as for a thunderstorm.")}

    :cumulus-coverage
    (content
     [:p "What percentage of the sky the cumulus clouds (if present) will cover."]
     [:p "Note that this setting can have a big impact on FPS: decrease
     coverage if you encounter frame rate issues."])

    :cumulus-size
    (content-para
     "Affects the appearance of the cumulus clouds. Positions
    further to the right will result in more, smaller clouds. Positions
    to the left will result in fewer, larger clouds.")

    :visibility
    (content-para
     "The visibility (in nm) for each weather type.")

    :stratus-base
    (content-para
     "The altitude (in feet) of the base stratus
    layer. The top of the stratus layer must be at least 1000 feet
    above the cumulus layer.")

    :stratus-top
    (content-para
     "The altitude (in feet) of the top of the stratus layer. The
    top of the stratus layer must be at least 1000 feet above the
    cumulus layer. The top of the stratus layer must be the same for
    poor and inclement weather, and sunny and fair weather must have a
    zero-thickness stratus layer - i.e. the top and base must be the
    same.")

    :cumulus-base
    (content-para
     "The altitude (in feet) of the cumulus layer. Set to zero for
    no cumulus clouds. The cumulus base for a given weather category
    must be at least 1000 feet below the top of the corresponding
    stratus base.")

    :contrails
    (content-para
     "The altitude at which condensation trails will form.")}

   :map
   {:save-image
    (content-para
     "Save a PNG image of the current map view. Select a preset size or specify your own.")

    :legend
    (content
     (let [section (fn [title & contents]
                     [:div
                      [:div {:style {:background "lightgray"
                                     :margin-top "3px"
                                     :padding    "0 0 2px 3px"
                                     :font-size  "105%"}}
                       title]
                      contents])]
       [:div
        (section
         "Weather Type"
         [:p "Colors in each square in the map indicate the weather type."]
         (for [[type color description]
               [["Sunny"
                 "rgb(128,240,255)"
                 "Clear skies."]
                ["Fair"
                 "rgb(0,255,0)"
                 "Few to scattered cumulus clouds. No precipitation."]
                ["Poor"
                 "rgb(255,255,0)"
                 "Solid overcast with no precipitation."]
                ["Inclement"
                 "rgb(192, 0, 0)"
                 "Solid overcast with precipitation (rain or snow)."]]]
           [:div
            {:style {:white-space "nowrap"}}
            [:div
             {:style {:display "inline-block"}}
             [:span
              {:style {:width          "20px"
                       :height         "20px"
                       :display        "inline-block"
                       :border         "solid 1px black"
                       :margin-right   "3px"
                       :vertical-align "middle"
                       :background     color}}
              ""]]
            [:div
             {:style {:display "inline-block"}}
             [:div
              {:style {:display      "inline-block"
                       :margin-right "3px"}}
              [:span
               {:style {:font-weight  "900"
                        :margin-right "3px"}}
               type]
              "-"]
             description]]))
        (section
         "Wind"
         [:p "Wind barbs show the direction and strength of the
         wind in each square. The orientation shows the direction the
         wind, with 'tails' on the upwind side. A half tail indicates
         five knots. Each full tail indicates ten knots. Each
         pennant (filled-in triangle) indicates fifty knots."]
         (for [[speed heading description]
               [[5 0 "Wind at 5 knots from the north."]
                [25 270 "Wind at 25 knots from the west."]
                [115 134 "Wind at 115 knots from the southeast."]]]
           [:div {:style {:white-space "nowrap"}}
            [:div {:style {:display        "inline-block"
                           :vertical-align "middle"}}
             (wind-barb speed heading)]
            description]))]))
    :mission-time
    (content-para
     "Shows the time in the Falcon world in the format Day/Hour:Minute.")
    :weather-time
    (content-para
     "Shows for what time the weather is being displayed (if
     weather is being shown). Time is displayed in the format
     Day/Hour:Minute.")}

   :mission-info
   {:save-briefing
    (content
     [:div
      [:p "Saves a VMT briefing file. This is a file with a name ending in
     '.vmtb' that contains information about the mission meant to be
     shared with mission participants. Pilots can open this file in
     VMT to view weather and the disposition of friendly forces.
     Information about hidden enemy forces, future weather, and other
     information available only to the mission creator will not be
     viewable."]
      [:p "Check the boxes below the alliances you wish briefing
      recipients to be able to view in full. For instance, check the
      box below ROK/US to enable participants to see all information
      about the ROK and US forces. This includes all flights, ground
      forces, etc. etc."]
      [:p "Note that some information will still be available for
      unchecked countries. For instance, the home airbase and strength
      of enemy squadrons is always available."]
      [:p "Briefing files must be opened on a machine with the
      indicated version of Falcon BMS and theater installed."]])

    :save-briefing-from-briefing
    (content-para "Click this button to save a copy of the briefing.
    The copy will contain any changes you have made, including
    briefing notes and map annotations.")

    :briefing-notes
    {:edit
     (content-para
      "Textual notes that will appear in the briefing file.
      Currently, no formatting is supported - at some point VMT will
      permit links, highlighting, etc.")

     :briefing
     (content-para
      "Optional notes for mission participants.")}}

   :air-forces
   {:airbase-filtering
    (content-para
     "Controls whether airbases will be shown on the map and in
      the list below based on their status and whether or not they
      have any aircraft stationed there.")

    :hide-no-squadron-airbases
    (content-para
     "If checked, airbases that have no airbases stationed at them
    will hidden. Note that only squadrons of selected types will be
    considered - a base that has only fighters will be hidden if
    'Fighter' is unchecked under 'Squadron Types'.")

    :hide-zero-status-airbases
    (content-para
     "If checked, airbases that are unable to sortie (i.e. that are
     at 0% status), will not be shown.")

    :squadron-types
    (content-para
     "Selects which squadron types will be displayed. If a box is
     not checked, it will be as if squadrons consisting of aircraft of
     that type do not exist - they will not be displayed on the map or
     in the list below.")

    :squadron-type-buttons
    (content-para
     "Use these buttons to quickly check or uncheck all the
    squadron types.")

    :display-options
    {:overview
     (content
      [:div
       [:p "Use this section to control the way airbases are displayed
      on the map. Airbases are shown as icons with up to three other
      pieces of information around them:"]
       [:img {:src "images/help/airbase-map-display.png"}]
       [:ol
        [:li [:strong "Airbase icon."]
         " The icon for the airbase."]
        [:li [:strong "Airbase status."]
         " The status of the airbase. Shown as a colored rectangle
           filled in proportion to how much damage the airbase has
           taken:"
         [:ul
          [:li [:strong "Green."]
           " 75% or greater strength."]
          [:li [:strong "Orange."]
           " Between 25% and 75% strength."]
          [:li [:strong "Red."]
           " Less than 25% strength."]]
         "If the rectangle is completely white, the airbase is at 0%
           strength and cannot sortie."]
        [:li [:strong "Squadron icons."]
         " One icon will be shown for each squadron (for squadron
           types that have been selected). The icon indicates the type
           of aircraft in the squadron."]
        [:li [:strong "Airbase name."]
         " The name of the airbase."]
        [:li [:strong "Squadron details."]
         " For each squadron deployed at the airbase, one line of
           text will be shown, indicating the numerical strength of
           and airframe for that squadron. For example, \"14 F-5E\"
           indicates that a squadron consisting of fourteen F-5E Tiger
           II aircraft is located at this airbase."]]])

     :airbase-labels
     (content
      [:div
       [:p "Use this dropdown to control how airbase labels will be shown on the map."]
       [:dl
        [:dt "Airbase name only"]
        [:dd "Only the airbase name will be shown below the airbase."]

        [:dt "Airbase name and squadrons"]
        [:dd "The airbase name will be shown followed by a list of
       squadrons located at that airbase, one line per squadron. Note
       that only squadrons whose type has been selected will be
       shown."]

        [:dt "No label"]
        [:dd "No label will be displayed below the airbase"]]])

     :show-airbase-status?
     (content-para
      "If checked, the status of each airbase will be displayed
      above the airbase icon on the map.")

     :show-airbase-squadrons?
     (content-para
      "If checked, squadron icons will be shown to the right of the
      airbase icon on the map.")}

    :airbases-and-squadrons
    (content
     [:div
      [:p "This section displays detailed information about all airbases and the squadrons stationed at them. The information is arranged hierarchically: alliances are at the top level, then airbases, then detailed status for each airbase, including the squadrons stationed at each."]
      [:img {:src "images/help/air-forces-tree.png"}]
      [:ol
       [:li [:strong "Expand/collapse."]
        " Use this to show or hide details about this airbase."]
       [:li [:strong "Display on map."]
        " Check this box to have the airbase displayed on the map."]
       [:li [:strong "Airbase icon."]
        " The icon for this airbase as it will be shown on the map."]
       [:li [:strong "Airbase status."]
        " The status of this airbase. The box is colored in
           proportion to how close to fully operational the airbase
           is. Green fill indicates status above 75%. Orange status
           indicates status between 25% and 75%. Red indicates status
           below 25%. Completely white indicates an airbase that is at
           0%."]
       [:li [:strong "Airbase name."]
        " The name of the airbase. Colored to indicate the current owner."]
       [:li [:strong "Airbase squadron icons."]
        " Icons for the squadrons deployed at this airbase. Colored
           to indicate nationality."]
       [:li [:strong "Airbase status."]
        " Status of the airbase."]
       [:li [:strong "Airbase squadron details."]
        " Information about the type and strength of the squadrons
           deployed at this airbase."]]])

    :tree-collapse-buttons
    (content
     [:div
      [:p "Use these buttons to show different levels of detail in the airbase list below."]
      [:dl
       [:dt "Expand all"]
       [:dd "Show all available levels of detail for all visible airbases."]

       [:dt "Collapse all"]
       [:dd "Collapse the airbase list so that only alliances/teams are visible."]

       [:dt "Collapse to airbases"]
       [:dd "Show all visible airbases in the list below, but do not
       show their detailed status. This is the default view."]]])

    :airbase-selection-buttons
    (content-para
     "Use these buttons to quickly hide or show all airbases on
      the map. Has the same effect as checking or unchecking each of
      the airbases in the list below.")}

   :map-controls
   {:general
    (content-para
     "Use the controls in this section to affect the overall appearance of the map.")

    :brightness
    (content
     [:div
      [:p "When centered, the map will appear as it does in the
  simulation. When moved to the left, the map will be 'dimmed' towards
  black. When moved to the right, the map will be 'brightened' towards
  white. Full left/right will cause the map to be completely replaced
  by black/white."]
      [:p "Use this to increase the visibility of icons, labels, flight
      paths, etc."]])

    :text-size
    (content-para
     "Use this slider to make the text used in labels larger or
    smaller. Smaller is to the left, larger to the right.")

    :icon-size
    (content-para
     "Use this slider to make the icons on the map larger or
      smaller. Smaller is to the left, larger to the right.")

    :flight-path-size
    (content-para
     "Use this slider to make flight paths wider or narrower.
      Narrower is to the left, wider to the right.")

    :show-text-background?
    (content-para
     "When checked, labels will be shown against a semitransparent
      background of a contrasting color.")

    :show-bullseye?
    (content-para
     "When checked, the bullseye \"spiderweb\" will be shown on
      the map, with range rings every 30nm up to 180nm and bearing
      lines every 30 degrees.")

    :reset-brightness
    (content-para
     "Click this button to reset the brightness to its default value.")

    :reset-text-size
    (content-para
     "Click this button to reset the text size to its default value.")

    :reset-icon-size
    (content-para
     "Click this button to reset the icon sizing to its default value.")

    :annotations
    {:overview
     (content
      [:div
       [:p "Use this section to add annotations - bits of text, arrows, borders, images, etc. - to the map. Annotations are saved in the briefing file so they can be shared with partipating pilots. Use the \"Add ...\" buttons to create annotations, the "
        [:img {:src   "images/edit.svg"
               :width (px 16)}]
        " button to edit existing annotations, the "
        [:img {:src   "images/hide-eye.svg"
               :width (px 16)}]
        " button to hide or show an annotation, and the "
        [:img {:src   "images/trash.png"
               :width (px 16)}]
        " button to delete an annotation."]
       [:p "When editing, the following controls will appear on the screen, depending on what type of annotation is currently being edited:"]
       [:table
        [:tbody
         [:tr
          [:td [:img {:src   "images/rotate.svg"
                      :width (px 16)}]]
          [:td "Click and drag this to rotate the selected annotation."]]
         [:tr
          [:td [:img {:src    "images/move.svg"
                      :width  (px 16)
                      :height (px 16)}]]
          [:td "Click and drag this to move the selected annotation."]]
         [:tr
          [:td [:img {:src   "images/text-resize.svg"
                      :width (px 16)}]]
          [:td "Click and drag this to change the size of the text."]]
         [:tr
          [:td [:img {:src   "images/checkmark.png"
                      :width (px 16)}]]
          [:td "Click this button to finish editing and remove the edit controls from view."]]
         [:tr
          [:td [:img {:src   "images/trash.png"
                      :width (px 16)}]]
          [:td "Click this button to delete the annotation."]]
         [:tr
          [:td [:img {:src   "images/resize.svg"
                      :width (px 16)}]]
          [:td "Click and drag this to change the size of the annotation."]]]]])

     :type
     (content
      [:div
       [:p "The type of the annotation. One of:"]
       [:dl
        [:dt "Shape"]
        [:dd "A rectangle or oval, with or without a border, with or without text inside, and with or without a filled interior region."]

        [:dt "Arrow"]
        [:dd "An arrow shape."]

        [:dt "PPT"]
        [:dd "A pre-planned threat with optional range ring, label, and filled interior."]]])

     :font-size
     (content-para
      "The size of the font in a text annotation. A number between 1.0 and 100.0.")

     :font
     (content-para
      "The font used for drawing a text annotation.")

     :color
     (content-para
      "Use this dropdown to control the color in which the text will be drawn. The slider at the bottom controls transparency.")

     :background
     (content-para
      "Use this dropdown to control the background drawn behind the text. The slider at the bottom controls transparency: move it all the way to the left to have no background drawn.")

     :text
     (content-para
      "Changes the text that will appear. You can also click on the text on the map while editing to change the text directly.")

     :location
     (content
      [:div
       [:p "The X and Y location of this annotation. It is generally easier to move things with the mouse by clicking and dragging the "
        [:img {:src    "images/move.svg"
               :width  (px 16)
               :height (px 16)}]
        " button."]])

     :size
     (content
      [:div
       [:p "The width and height of this annotation. It is generally easier to resize things with the mouse by clicking and dragging the "
        [:img {:src   "images/resize.svg"
               :width (px 16)}]
        " button."]])

     :rotation
     (content-para
      "The rotation of the selected annotation, in degrees.")

     :border-style
     (content-para
      "What type of border, if any, to draw around the annotation.")

     :border-color
     (content-para
      "Sets the color and transparency of the border.")

     :border-width
     (content-para
      "Sets the width or thickness of the border.")

     :border-dash-length
     (content-para
      "When drawing a dashed border, controls how long the dashes are.")

     :border-dash-spacing
     (content-para
      "When drawing a dashed border, controls how much space there is between the dashes.")

     :threat
     (content-para
      "The PPT type. These are drawn from the theater's PPT.INI file.")

     :label
     (content-para
      "An alternate label for the PPT. Reset or leave alone to use the default.")

     :reset-label
     (content-para
      "Reset the PPT label to the default.")

     :edge-style
     (content-para
      "Sets the style of any edges that are drawn.")

     :edge-color
     (content-para
      (str  "Sets the color of any edges that are drawn. " color-text))

     :edge-width
     (content-para
      "Sets the width of any edges that are drawn. Use either the
       slider or the text box to set a value from 1 to 100.")

     :edge-dash-length
     (content-para
      "For a dashed edge, sets how long the dashes are.")

     :edge-dash-spacing
     (content-para
      "For a dashed edge, sets how large the gaps between the dashes are.")

     :filled?
     (content-para
      "If checked, the annotation will have its interior filled by the
     specified color. If unchecked, the annotation will not be
     filled.")

     :fill-color
     (content-para
      (str "The color used to fill the interior of an annotation. " color-text))

     :halign
     (content-para
      "Controls whether the text will be horizontally aligned to the left, center, or right of the annotation.")

     :valign
     (content-para
      "Controls whether the text will be vertically aligned to the top, middle, or bottom of the annotation.")

     :font-bold?
     (content
      [:div
       [:p
        "When checked, the text will be rendered in a "
        [:span {:css {:font-weight "bold"}} "bold"]
        " font."]])

     :font-italic?
     (content
      [:div
       [:p
        "When checked, the text will be rendered in a "
        [:span {:css {:font-style "italic"}} "italic"]
        " font."]])

     :points
     (content
      [:div
       [:p "The X and Y location of each labeled point of the annotation. It is generally easier to move things with the mouse by clicking and dragging the "
        [:img {:src    "images/move.svg"
               :width  (px 16)
               :height (px 16)}]
        " button."]])

     :heft
     (content-para
      (str "Controls the overall thickness of the arrow annotation. " slider-text))

     :shaft
     (content-para
      (str "Controls the width of the straight part of the arrow that excludes the arrowhead. " slider-text))

     :arrowhead-width
     (content-para
      (str "Controls the width of the arrowhead portion of the arrow. " slider-text))

     :arrowhead-length
     (content-para
      (str "Controls the length of the arrowhead portion of the arrow. " slider-text))

     :closed?
     (content-para
      "When checked, the shape formed by the points will be closed - an
    edge will be drawn between the first and last points, and the
    annotation will be able to be filled. When unchecked, there will
    be no line drawn between the first and last points, and the
    annotation will not be able to be filled in.")

     :edit-buttons
     (content
      [:div
       [:p "Use these buttons to perform various operations on this annotation."]
       [:p "Click "
        [:img {:src "images/edit.svg"
               :width (px 16)
               :height (px 16)}]
        " to enable interactive editing of the annotation on the map."]
       [:p "Click "
        [:img {:src "images/hide-eye.svg"
               :width (px 16)
               :height (px 16)}]
        " to hide or show the annotation on the map."]
       [:p "Click "
        [:img {:src "images/copy.svg"
               :width (px 16)
               :height (px 16)}]
        " to make an exact copy of this annotation. Note that the copy will appear on top of the original - you will have to move it."]
       [:p "Click "
        [:img {:src "images/trash.png"
               :width (px 16)
               :height (px 16)}]
        " to delete this annotation. This operation cannot be undone, so be careful."]])

     :serialization
     (content-para
      "Load and save annotations to VMT Annotation files, or import annotations from existing VMT Briefing files.")

     :serialization-buttons
     (content
      [:div
       [:dl
        [:dt "Save"]
        [:dd "Save all annotations to a VMT Annotations (.vmta) file."]

        [:dt "Load"]
        [:dd "Load all annotations from a VMT Annotations (.vmta) file onto the current map."]

        [:dt "Import From Briefing"]
        [:dd "Load all the annoations from a VMT Briefing (.vmtb) file onto the current map."]]])
     } ;; :annotations
    }  ;; :map-controls

   :flights
   {:mission-key
    (content-para
     "Displays the default colors for flights by mission type.
    Click the colored box to make changes. Changes will be remembered
    from session to session.")

    :mission-key-reset
    (content-para
     "Click this button to restore all mission type colors to
      their defaults.")

    :team-visibility
    (content-para
     "Filters the flight list by country. Check the boxes below
      each flag to list flights for that country in the flights
      list. Uncheck the box to hide flights from that country.")

    :display-options
    {:overview
     (content-para
      "Use this section to control the way flight paths are shown
       on the map.")

     :map-flight-path-size
     (content-para
      "Slide this control to the left to render flight paths and
       steerpoint markers with narrower lines. Slide it to the right
       to render them with wider lines.")

     :reset-map-flight-path-size
     (content-para
      "Click this button to restore flight paths to their default
       width.")}

    :flight-info
    (fn [mode]
      (condp = mode
        :hoplon
        (hoplon.core/div
         (hoplon.core/p "This section lists all the upcoming and in-progress flights
      for the teams selected above. Click the settings button "
                        (buttons/image-button
                         :src "images/settings.svg"
                         :width (px 16))
                        " to make changes to the way the information is displayed."))))

    :columns
    {:show?
     (content-para
      "Check the box to display the flight path for this flight on
       the map. Click the colored square to change the color in which
       the flight path is displayed from the default (as determined by
       mission type).")

     :info
     (fn [mode]
       (condp = mode
         :hoplon
         (hoplon.core/div
          (hoplon.core/p
           "Click the "
           (buttons/a-button
            :css {:border-radius "50%"
                  :width         (px 12)
                  :height        (px 12)
                  :text-align    "center"
                  :font-weight   "bold"
                  :font-family   "serif"
                  :font-size     "110%"
                  :line-height   (px 12)}
            "i")
           " button to display additional information about the flight,
          including munitions and detailed flight plan info.")
          (hoplon.core/p
           "Click the "
           (buttons/image-button
            :width (px 12)
            :src "images/open-external.svg")
           " button to toggle displaying flight details in a separate tab."))))

     :combatant
     (content-para
      "The 'owner' of this flight.")

     :package
     (content-para
      "The package number (if any) to which this flight belongs.
       Sort by this column to see package flights listed near each
       other.")

     :squadron
     (content-para
      "The squadron to which this flight belongs.")

     :airbase
     (content-para
      "The airbase that is home to this flight's squadron.")

     :airframe
     (content-para
      "The type and quantity of the aircraft in this flight.")

     :callsign
     (content-para
      "The callsign of this flight.")

     :mission
     (content-para
      "The type of mission this flight is performing. Color coded
       according to the mission key above.")

     :takeoff
     (content-para
      "The takeoff time for this flight in DAY/HH:MM format.")

     :tot
     (content-para
      "The Time-On-Target for this flight in DAY/HH:MM format.")

     :egress
     (content-para
      "The mission end time for this fligth in DAY/HH:MM format.")}

    :waypoint-columns
    {:number
     (content-para "The steerpoint number.")

     :description
     (content-para "A brief description of the steerpoint.")

     :action
     (content-para "The action to be taken at the steerpoint, if any.")

     :enroute
     (content-para "The action to be taken enroute to the steerpoint, if any.")

     :arrive
     (content-para "The scheduled arrival time at the steerpoint, in DAY/HH:MM:SS format.")

     :depart
     (content-para "The scheduled departure time at the steerpoint, in DAY/HH:MM:SS format.")

     :remain
     (content-para "The scheduled duration to remain at the steerpoint, if any, in HH:MM:SS format")

     :distance
     (content-para "The distance to this steerpoint from the previous, in nm.")

     :heading
     (content-para "The heading to this steerpoint from the previous.")

     :speed-cas
     (content-para "The calibrated airspeed to fly en route to this steerpoint.")

     :speed-tas
     (content-para "The true airspeed to fly en route to this steerpoint.")

     :speed-gnd
     (content-para "The ground speed to fly en route to this steerpoint")

     :speed-mach
     (content-para "The speed in mach to fly en route to this steerpoint.")

     :speed-ias
     (content-para "The indicated airspeed to fly en route to this steerpoint.")

     :altitude
     (content-para "The altitude to fly en route to this steerpoint.")

     :comments
     #(div (p "Miscellaneous comments, if any."))}}

   ;; TODO: I wish this could be modular somehow. Like, maybe we
   ;; should be able to register additional keys in the help content
   ;; map dyamically.
   :table-grid
   {:settings
    (fn [mode]
      (condp = mode
        :hoplon                         ; Ignore React for now
        (div
         (p "Press this button to toggle column configuration. When the
  button is depressed, columns can be added, hidden, and
  rearranged.")
         (p "To hide a column, click the checkbox next to the column name
  until it shows a red "
            (span :css {:color "red"}
                  "✗")
            "."
            "To show a column, click the checkbox next to the column name
  until it shows a green "
            (span :css {:color "green"}
                  "✓")
            ".")
         (p "To move a column to the right, click the > button next to
  the column name. To move a column to the left, click the <
  button next to the column name.")
         (p "To sort a column, click the "
            (inl
             :class "sorters"
             (svg/svg
              :width (px 20)
              :viewBox "-100 -100 200 200"
              (comm/triangle :transform "rotate(180) translate(0 -50)"
                             :r 50
                             :stroke "black"
                             :stroke-width "2"
                             :fill "none")
              (comm/triangle :transform "translate(0 -50)"
                             :r 50
                             :stroke "black"
                             :stroke-width "2"
                             :fill "none")))
            " icon next to the column name. Clicking will cycle between
     sorting in ascending and descending order.")
         (p "Note that some columns may not permit hiding, moving, or
  sorting.")
         (p "When you are happy with the column configuration, click the
  settings button again."))))}

   :settings
   {:updates
    (content-para [:p "Set up whether VMT will automatically check for updates, or check for updates manually."])}})

(let [open-instance (cell nil)]
  (with-timeout 0
    (.addEventListener js/document
                       "click"
                       (fn [e]
                         (reset! open-instance nil))))
  (defn with-help
    "Returns UI for content with embedded help. `help-path` is a vector
  path into the `content` map."
    ([help-path content] (with-help help-path {} content))
    ([help-path opts content]
     (let [help-ctor            (get-in help-content-ctors help-path)
           {:keys [underline-color
                   omit-underline?
                   eat-click?]} opts
           this-instance        (gensym)
           open?                (cell= (= open-instance this-instance))]
       (div
        :class "help"
        :css (merge {:cursor        "url(images/helpcursor.png) 4 4, auto"
                     :border-bottom (when-not omit-underline?
                                      (if help-ctor
                                        (str "dashed 1px " (or underline-color "blue"))
                                        ;; This is to clue me in to write help.
                                        "dashed 2px red"))}
                    opts)
        :click (fn [e]
                 (if (= @open-instance this-instance)
                   (reset! open-instance nil)
                   (reset! open-instance this-instance))
                 false)
        (with-let [e (div
                      :fade-toggle open?
                      :class "content"
                      :css {:white-space "normal"
                            :font-weight "normal"}
                      ;; Unfortunately this isn't really working. Not sure why
                       ;; :blur (fn [e]
                       ;;        (.log js/console "Blur firing")
                       ;;        (reset! open-instance nil))
                      (if help-ctor
                        (help-ctor :hoplon)
                        [(p "Help has not yet been written for this feature.")
                         (p (str help-path))]))]
          (do-watch open?
                    (fn [old new]
                      (when (and (not old) new)
                        ;; (.log js/console "Focusing help element")
                        (when-dom* e
                         #(.focus e))))))
        content))))

  (rum/defcs RHelp < rum/reactive (rum/local nil ::this-instance)
    [state opts help-path content]
    ;; This is a little weird, but it was the only way I could find to
    ;; give a unique ID to each instance of the component.
    ;; Using `(gensym)` in the call to rum/local resulted in all of
    ;; them having the same ID.
    (when (-> state ::this-instance deref nil?)
      (reset! (::this-instance state) (gensym)))
    (let [this-instance        (deref (::this-instance state))
          open-instance*       (rum/react open-instance)
          open?                (= open-instance* this-instance)
          {:keys [underline-color
                  omit-underline?
                  eat-click?]} opts
          help-ctor            (get-in help-content-ctors help-path)]
      [:div.help
       {:style    (merge {:cursor       "url(images/helpcursor.png) 4 4, auto"
                          :borderBottom (when-not omit-underline?
                                          (if help-ctor
                                            (str "dashed 1px " (or underline-color "blue"))
                                            ;; This is to clue me in to write help.
                                            "dashed 2px red"))}
                         (dissoc opts
                                 :omit-underline?
                                 :underline-color
                                 :eat-click?))
        :on-click (fn [e]
                    (.log js/console "Content click"
                          "event" e
                          "open?" open?
                          "open-instance*" (pr-str open-instance*)
                          "this-instasnce" (pr-str this-instance))
                    ;; (-> e .-nativeEvent .preventDefault)
                    ;; (-> e .-nativeEvent .stopPropagation)
                    (-> e .-nativeEvent .stopImmediatePropagation)
                    (if open?
                      (reset! open-instance nil)
                      (reset! open-instance this-instance))
                    ;; false
                    )}
       [:div.content
        {:style {:white-space "normal"
                 :font-weight "normal"
                 :display (if open? "block" "none")}}
        (if help-ctor
          (help-ctor :react)
          [:div
           [:p {:key "1"} "Help has not yet been written for this feature."]
           [:p {:key "2"} (str help-path)]])]
       content]))

  (defn with-rhelp
    "Same as `with-help`, but for React rendering."
    ([help-path content] (with-rhelp help-path {} content))
    ([help-path opts content]
     (with-let [parent (div)]
       (rum/mount (RHelp opts help-path content) parent)))))

(defn help-icon
  [help-path]
  (let [help? (get-in help-content-ctors help-path)]
    (with-help help-path
      {:omit-underline? true}
      ;; A circle - maybe want to make this a control at some point
      (div
       :css {:width "18px"
             :height "18px"
             :color "white"
             ;; The color change reminds me to write help
             :background (if help? "darkblue" "darkred")
             :border-radius "9px"
             :text-align "center"
             :display "inline-block"
             :margin-right "3px"
             :margin-left "3px"
             :font-size "80%"}
       "?"))))

(rum/defc RHelpIcon
  [help-path]
  (let [present? (get-in help-content-ctors help-path)]
    (RHelp {:omit-underline? true}
           help-path
           [:div {:style {:width "18px"
                          :height "18px"
                          :color "white"
                          ;; The color change reminds me to write help
                          :background (if present? "darkblue" "darkred")
                          :border-radius "9px"
                          :text-align "center"
                          :display "inline-block"
                          :margin-right "3px"
                          :margin-left "3px"
                          :font-size "80%"}}
            "?"])))

(defn rhelp-icon
  "Like `help-icon` but for React rendering"
  [help-path]
  (let [help? (get-in help-content-ctors help-path)]
    (with-rhelp help-path
      {:omit-underline? true}
      (with-let [parent (div)]
        #_(rum/mount (RHelpIcon help?) parent)))))
