(ns weathergen.help
  (:require [goog.string :as gstring]
            [goog.string.format]
            [hoplon.core :refer [b dl dt dd div em i img li ol p span strong ul with-timeout]]
            [hoplon.svg :as svg]
            [javelin.core :refer [cell]]
            [weathergen.wind :as wind]))

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

;; These are functions because we need to be able to show the same
;; help in more than one place, and if we simply return a node, it
;; will get moved rather than cloned when we attach it to a new place
;; in the DOM.
(def help-content-ctors
  {:wind-stability-areas
   #(p "Wind stability areas define regions of the map where the wind
   will not be affected by the weather. Although cloud cover,
   temperature, and pressure will change, within the bounds of a wind
   stability region the wind speed and direction will remain
   constant. Use this to stabilize winds in an area to support tanker
   and carrier operations, or to provide fixed, known winds at landing
   or target sites.")

   :serialization-controls
   {:save-single-files
    (fn []
      [(p "This section allows saving and loading of the various files
      that WeatherGen can use. Files should be saved with the same
      name as the mission (.cam or .tac) file, but with the extension
      changed as appropriate. For instance, if you're making a mission
      called 'oca-strike.tac', save the TWX file as 'oca-strike.twx'.
      The filename will use the mission name of the loaded mission
      section if possible.")

       (dl
        (dt "Save Current As FMAP")
        (dd "Saves a single .fmap file with the weather data currently
        displayed on the map. Contains wind, weather type, pressure,
        and temperature data for each cell in the grid.")

        (dt "Save .TWX")
        (dd "Saves a .twx file, which contains the values from the
        'Clouds and Contrails' section. This file should be saved with
        the same name as the mission (.tac or .cam) file, but with a
        .twx extension.")

        (dt "Save Settings")
        (dd "Saves a .vmtw file with all the values from the
        WeatherGen application. Use this to preserve the state of
        WeatherGen so you can later pick up where you left off.")

        (dt "Load Settings")
        (dd "Loads a previously saved .vmtw file. Note that
        this will overwrite any settings currently in use - be sure to
        save first if necessary."))])

    :multi-save
    {:overview
     (fn []
       [(p "Use this feature to save all weather-related files for the
        mission. Requires that a mission be loaded. The following
        files will be saved:")
        (ul
         (li (b (i "mission-name") ".fmap")
             " - "
             "An FMAP file containing the starting weather for the
             designated time block.")
         (li (b (i "mission-name") ".twx")
             " - "
             "A TWX file containing the clouds and contrails settings.")
         (li (b (i "mission-name") ".setting.edn")
             " - "
             "Contains the WeatherGen settings used to generate the
             package.")
         (li (b "WeatherMapsUpdates")
             " - "
             "A folder containing the timestamped FMAP files."))])

     :from
     #(p "The FMAP files in the generated weather package will start from this time.")

     :to
     #(p "The FMAP files in the generated weather package will end at this time.")

     :step
     #(p "The FMAP files in the generated weather package will
     be this many minutes apart.")

     :mission-name
     #(p "The name of the mission file (.cam or .tac) for which
     weather is being generated. This value will be used to name the
     generated .twx and .fmap files.")}}

   :display-controls
   {:map
    #(p "Chooses the map image displayed in the background.")

    :display
    (fn []
      [(p "Selects what will be displayed on the weather grid at the left.")
       (dl
        (dt "None")
        (dd "No data will be displayed")
        (dt "Weather Type")
        (dd "Display the type of weather, which determines cloud cover
   and precipitation in Falcon. Note that unlike a radar map you might
   see on TV, green does " (em "not") " indicate rain."
            (dl
             (dt "Red") (dd "Inclement weather")
             (dt "Yellow") (dd "Poor weather")
             (dt "Green" (dd "Fair weather"))
             (dt "Clear" (dd "Sunny weather"))))
        (dt "Pressure")
        (dd "The barometric pressure will be displayed. Red indicates
      low pressure, white indicates high pressure. Use the pressure
      overlay or click a cell to get exact values.")
        (dt "Temperature")
        (dd "The air pressure will be displayed. White indicates cold
      temperatures. Red indicates high temperatures. Use the pressure
      overlay or click a cell to get exact values."))])

    :overlay
    (fn []
      [(p "Selects what data will be shown in each cell of the grid,
    overlaid on the data selcted for 'Display'. Wind is shown as a
    bent line, with the tail(s) in the direction the wind is coming
    from. Each full tail indicates ten knots of wind speed, and a half
    tail adds five.")
       (p "Text overlays may be hard to read when the map grid is small.
     Use the Make Bigger button above the map to enlarge. Or click a
     cell to read the same data from the forecast section.")])

    :pressure
    (fn []
      [(p "Units for pressure measurements - inches Mercury (InHg) or millibars.")])

    :opacity
    (fn []
      [(p "Controls how opaque or transparent the display layer will be.
    Slide the slider to the left to more easily see the map.")])}

   :weather-params
   {:seed
    #(p "The seed selects a weather system. Changing this will change
    the weather pattern entirely. Use any whole number. Click the
    'Random' button to have the system choose a seed randomly.")

    :crossfade
    #(p "The degree to which adjacent weather types will be blended
    together. Zero means that winds, etc. will shift abruptly at
    weather type boundaries. A good value to use is 0.1. Values above
    about 0.3 will give strange results.")

    :origin
    {:x #(p "The x location in 'weather space' that is displayed
   on the grid. You will not normally edit this field, but you can
   change it to see different parts of the weather pattern.")

     :y #(p "The y location in 'weather space' that is displayed
on the grid. You will not normally edit this field, but you can change
it to see different parts of the weather pattern.")}

    :time
    {:offset
     #(p "The time in 'weather space' that is displayed on the grid.
You will not normally edit this field, but you can change it to move
forward and backward in time. ")
     :falcon-time
     (fn []
       [(p "The current time in the Falcon world. Time cannot be advanced
     past this point, as that would be peeking into the future.")
        (p "Click the 'Jump to' button to set the displayed weather to
     this time.")])
     :browse-time
     (fn []
       [(p "Enter a time here to view the weather at that time. Use the
     format 'dd/hhmm', where 'dd', 'hh', and 'mm' are the numeric day,
     hour, and minute. For example, '01/1200' will show the weather at
     noon of day 1.")
        (p "Note that you will be unable to move the time past 'Falcon
      time' above, as that would be peeking into the future. Use the
      Forecast section below to get a (potentially slightly
      inaccurate) forecast instead.")])}

    :feature-size
    #(p "How 'zoomed in' the weather will be on the underlying weather
    pattern. Make this number bigger to get larger storm cells and
    larger areas of fair weather. Make it smaller to get weather that
    changes more frequently.")

    :pressure
    {:max #(p "The maximum barometric pressure that will be generated.")
     :min #(p "The minimum barometric pressure that will be generated.")}

    :prevailing-wind
    {:heading #(p "The direction of the prevailing
    wind. Although wind direction varies, especially around high- and
    low-pressure areas, more wind will be generated in this direction
    than in any other.")}

    :wind-uniformity
    #(p "Controls how much the wind speed will vary between the bounds
    set under 'Weather type configuration'. Should be between zero and
    one. Lower values produce more winds near the mean for that
    weather type. Higher values produce more wind speeds near the min
    and max for that weather type.")

    :temp-uniformity
    #(p "Controls how much the temperature will vary between the bounds
    set under 'Weather type configuration'. Should be between zero and
    one. Lower values produce more temperatures near the mean for that
    weather type. Higher values produce more temperatures near the min
    and max for that weather type.")

    :turbulence
    {:power
     (fn []
       [(p "Weather patterns are generated by taking an underlying, regular pattern and 'warping' it into random shapes. This parameter controls how strong this warp is. Set it to zero to see the underlying weather pattern with no warping. Higher value produce more warping.")
        (p "As warp strength increases, you will probably have to set a higher zoom to get good results.")])}

    :evolution
    #(p "The number of minutes it takes for the weather to completely
     change, even if not moving.")}

   :weather-type-config
   {:pressure
    #(p "Weather types (sunny, fair, poor, and inclement) are
    determined by the barometric pressure. Set the thresholds for
    which pressures determine which weather types here. ")

    :wind
    #(p "The minimum, maximum, and mean wind speeds for each weather
     type. Due to crossfading, these values are not strict - wind can
     be higher than the maximum or lower than the minimum near the
     edges of other weather types.")

    :temp
    #(p "The minimum, maximum, and mean temperatures for each weather
     type. Due to crossfading, these values are not strict -
     temperature can be higher than the maximum or lower than the
     minimum near the edges of other weather types.")}

   :displayed-time
   (fn []
     [(p "Controls the Falcon Time that the current weather corresponds
   to. Edit the day, minute, and hour and then use one of the two
   buttons.")
      (dl
       (dt "Jump to")
       (dd "Jumps forward or backward to the indicated time. The
     displayed weather may change.")
       (dt "Set to")
       (dd "Sets the time to the indicated time. The displayed weather
     will not change."))
      (p "The time is used to generate file names for downloaded FMAP
   files, which Falcon relies on to automatically update weather.")])

   :movement-params
   {:direction
    {:heading #(p "The direction the weather pattern will move in.")
     :speed #(p "The speed at which the weather pattern will move.")}}

   :step
   #(p "The number of minutes each click of the 'Step forward' or 'Step
   backward' buttons will move in time. Also influences how many rows
   there are in the weather forecast.")

   :forecast
   {:overview
    #(p "Displays the weather forecast for the selected location in
   the weather grid.")
    :share
    #(p "The 'shareable forecast' link goes to a view of the weather
   that can be handed out to other pilots. It does not allow editing,
   nor advancing the weather past the current time, but does include
   the (potentially inaccurate) forecast, any loaded DTC files, wind
   stability regions, etc. etc.")
    :time
    #(p "The date and time of the forecast conditions. Forecasts
     are (as in the real world) not perfectly accurate.")
    :type
    #(p "The forecast Falcon weather type at the selected location.")
    :pressure
    #(p "The forecast barometric pressure at the selected location.")
    :temperature
    #(p "The forecast temperature (in degrees C) at the selected location.")
    :wind
    #(p "The forecast wind strength and direction at the selected
     location. E.g. '05kts@270' is a 5-knot wind from the west. Note
     that wind directions indicate the direction the wind is coming
     from, not the direction it is blowing towards.")
    :visibility
    #(p "The forecast visibility (in nm) at the selected location.")
    :precipitation
    #(p "The forecast precipitation at the selected location.")
    :cloud
    (fn []
      [(p "The forecast cloud cover at the selected location.")
       (dl
        (dt "SKC")
        (dd "Sky is clear - no significant clouds. A thin 'stratus'
        layer may be present.")
        (dt "FEWxxx")
        (dd "Cumulus clouds covering less than 25% of the sky are
        present, with a base at xxx hundreds of feet. E.g. FEW050
        indicates cumulus clouds present at 5000 feet MSL.")
        (dt "SCTxxx")
        (dd "Cumulus clouds covering between 25% and 50% of the sky
        are present, with a base at xxx hundreds of feet. E.g. SCT050
        indicates cumulus clouds present at 5000 feet MSL.")
        (dt "OVCxxx")
        (dd "A solid overcast layer is present with a base at xxx
        hundreds of feet. E.g. OVC050 indicates a solid overcast
        starting at 5000 feet MSL.")
        (dt "COTRAxxx")
        (dd "Contrails form above xxx, in hundreds of feet. E.g.
        COTRA200 indicates contrails above 20000 feet MSL."))])}

   :weather-overrides
   {:overview
    (fn []
      [(p "Weather type is determined from air pressure - lower pressure
   yields inclement or poor weather, and higher pressure fair and
   sunny weather. By default, pressure is generated randomly, but it
   can be overridden for certain locations and times using the
   controls in this section.")])

    :center
    #(p "The X and Y coordinates of the center of the override region.")

    :radius
    #(p "The radius of the override region, measured in cells.")

    :falloff
    #(p "The distance from the center of the region at which the
    override pressure begins to be blended into the surrounding
    pressure. Set this to zero to have a very gradual transition. Set
    it to the radius to have an abrupt edge to the region. Note that
    abrupt changes may result in odd weather effects in the sim. A
    falloff of at least four less than the radius is recommended.")

    :pressure
    #(p "The override pressure for the region. Use the values from the
    Weather Type Configuration section to select an appropriate value
    for the type of weather you are trying to enforce.")

    :strength
    #(p "Controls to what degree the underlying pressure pattern will
    be overridden. This value should be between zero and one. A value
    of one completely replaces the underlying pressure with the value
    from the 'pressure' field above. A value of 0.5 would produce a
    value halfway between the value from the 'pressure' field and the
    underlying pattern.")

    :show-outline?
    #(p "Controls whether the outline of the override region will be
    shown. Note that this setting also affects the shareable
    forecast.")

    :animate?
    #(p "If checked, the weather override will appear and disappear at
    the times specified below. If unchecked, the weather override will
    always be in effect.")

    :begin
    #(p "The time at which the weather override will begin to take
    effect. The pressure (and therefore the weather type) will
    gradually change from the unmodified value to the overridden value
    between this time and the peak time.")

    :peak
    #(p "The time at which the weather override will reach full
    strength. It will continue at full strength from this time until
    the taper time.")

    :taper
    #(p "The time at which the weather override will begin to fade out.
    The pressure (and therefore the weather time) will gradually
    change from the overriden value to the unmodified value between
    this time and the end time.")

    :end
    #(p "The time at which this override will no longer be in effect.")

    :exclude-from-forecast?
    (fn []
      [(p "If checked, the effects of the override will not be included
    in the shareable forecast. This allows weather planners to include
    'surprises'.")
       (p "Note that the effects of the override " (em "will") " be
     visible in the shared forecast for times before 'now'. This is
     because it doesn't make any sense to hide events that occurred in
     the past - the user can simply navigate to them.")])}

   :flight-paths
   {
    :section
    #(p "Load flight plans from a mission .ini/DTC file so they can be
     shown on the map.")
    :name
    #(p "An arbitrary label for this flight path, usually the flight
    callsign. Click the pencil icon to edit it. The name is not shown
    on the map.")
    :show?
    #(p "If checked, flight path will be shown. If unchecked,
    flight path will be hidden.")
    :show-lines?
    #(p "If checked, steerpoint lines from the DTC (if any) will be
    shown. If unchecked, steerpoint lines will be hidden.")
    :show-numbers?
    #(p "If checked, steerpoints not otherwise labeled will be labeled
     with their numbers.")
    :show-labels?
    #(p "If checked, alternate field and tanker steerpoints will be
     labeled as such.")
    :color
    #(p "Change the color in which the flight path and labels will be
    drawn on the map.")
    :scale
    #(p "Drag the slider left and right to decrease or increase the
    size of the text and flight path lines.")
    :remove
    #(p "Click to permanently remove this flight path from the
    list.")}

   :clouds
   {:overview
    #(p "Edit the cloud, visibility, and contrail settings. These
    settings are the same everywhere on the map - they do not vary by
    location.")

    :buttons
    (fn []
      [(p "Randomize: sets the clouds and contrails to random (but
      valid) values.")
       (p "Save TWX: Saves a .twx file, which contains the cloud and
        contrail values from this section. This file should be saved
        with the same name as the mission (.tac or .cam) file, but
        with a .twx extension.")])

    :cumulus-coverage
    (fn []
      [(p "What percentage of the sky the cumulus clouds (if present) will cover.")
       (p "Note that this setting can have a big impact on FPS: decrease
     coverage if you encounter frame rate issues.")])

    :cumulus-size
    (fn []
      [(p "Affects the appearance of the cumulus clouds. Positions
    further to the right will result in more, smaller clouds. Positions
    to the left will result in fewer, larger clouds.")])

    :visibility
    #(p "The visibility (in nm) for each weather type.")

    :stratus-base
    #(p "The altitude (in feet) of the base stratus
    layer. The top of the stratus layer must be at least 1000 feet
    above the cumulus layer.")

    :stratus-top
    #(p "The altitude (in feet) of the top of the stratus layer. The
    top of the stratus layer must be at least 1000 feet above the
    cumulus layer. The top of the stratus layer must be the same for
    poor and inclement weather, and sunny and fair weather must have a
    zero-thickness stratus layer - i.e. the top and base must be the
    same.")

    :cumulus-base
    #(p "The altitude (in feet) of the cumulus layer. Set to zero for
    no cumulus clouds. The cumulus base for a given weather category
    must be at least 1000 feet below the top of the corresponding
    stratus base.")

    :contrails
    #(p "The altitude at which condensation trails will form.")}

   :map
   {:legend
    #(let [section (fn [title & contents]
                     (div
                      (div :css {:background "lightgray"
                                 :margin-top "3px"
                                 :padding "0 0 2px 3px"
                                 :font-size "105%"}
                           title)
                      contents))]
       (div
        (section
         "Weather Type"
         (p "Colors in each square in the map indicate the weather type.")
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
           (div
            :css {:white-space "nowrap"}
            (div
             :css {:display "inline-block"}
             (span
              :css {:width "20px"
                    :height "20px"
                    :display "inline-block"
                    :border "solid 1px black"
                    :margin-right "3px"
                    :vertical-align "middle"
                    :background color}
              ""))
            (div
             :css {:display "inline-block"}
             (div
              :css {:display "inline-block"
                    :margin-right "3px"}
              (span :css {:font-weight "900"
                          :margin-right "3px"}
                    type)
              "-")
             description))))
        (section
         "Wind"
         (p "Wind barbs show the direction and strength of the
         wind in each square. The orientation shows the direction the
         wind, with 'tails' on the upwind side. A half tail indicates
         five knots. Each full tail indicates ten knots. Each
         pennant (filled-in triangle) indicates fifty knots.")
         (for [[speed heading description]
               [[5 0 "Wind at 5 knots from the north."]
                [25 270 "Wind at 25 knots from the west."]
                [115 134 "Wind at 115 knots from the southeast."]]]
           (div :css {:white-space "nowrap"}
                (div :css {:display "inline-block"
                           :vertical-align "middle"}
                     (wind-barb speed heading))
                description)))))
    :mission-time
    #(p "Shows the time in the Falcon world in the format Day/Hour:Minute.")
    :weather-time
    #(p "Shows for what time the weather is being displayed (if
     weather is being shown). Time is displayed in the format
     Day/Hour:Minute.")}

   :mission-info
   {:save-briefing
    #(div
      (p "Saves a VMT briefing file. This is a file with a name ending in
     '.vmtb' that contains information about the mission meant to be
     shared with mission participants. Pilots can open this file in
     VMT to view weather and the disposition of friendly forces.
     Information about hidden enemy forces, future weather, and other
     information available only to the mission creator will not be
     viewable.")
      (p "Check the boxes below the alliances you wish briefing
      recipients to be able to view in full. For instance, check the
      box below ROK/US to enable participants to see all information
      about the ROK and US forces. This includes all flights, ground
      forces, etc. etc.")
      (p "Note that some information will still be available for
      unchecked countries. For instance, the home airbase and strength
      of enemy squadrons is always available.")
      (p "Briefing files must be opened on a machine with the
      indicated version of Falcon BMS and theater installed."))}

   :air-forces
   {:airbase-filtering
    #(p "Controls whether airbases will be shown on the map and in
      the list below based on their status and whether or not they
      have any aircraft stationed there.")

    :hide-no-squadron-airbases
    #(p "If checked, airbases that have no airbases stationed at them
    will hidden. Note that only squadrons of selected types will be
    considered - a base that has only fighters will be hidden if
    'Fighter' is unchecked under 'Squadron Types'.")

    :hide-zero-status-airbases
    #(p "If checked, airbases that are unable to sortie (i.e. that are
     at 0% status), will not be shown.")

    :squadron-types
    #(p "Selects which squadron types will be displayed. If a box is
     not checked, it will be as if squadrons consisting of aircraft of
     that type do not exist - they will not be displayed on the map or
     in the list below.")

    :squadron-type-buttons
    #(p "Use these buttons to quickly check or uncheck all the
    squadron types.")

    :airbases-and-squadrons
    #(div
      (p "This section displays detailed information about all airbases and the squadrons stationed at them. The information is arranged hierarchically: alliances are at the top level, then airbases, then detailed status for each airbase, including the squadrons stationed at each.")
      (img :src "images/air-forces-tree-help.png")
      (ol
       (li (strong "Expand/collapse.")
           " Use this to show or hide details about this airbase.")
       (li (strong "Display on map.")
           " Check this box to have the airbase displayed on the map.")
       (li (strong "Airbase icon.")
           " The icon for this airbase as it will be shown on the map.")
       (li (strong "Airbase status.")
           " The status of this airbase. The box is colored in
           proportion to how close to fully operational the airbase
           is. Green fill indicates status above 75%. Orange status
           indicates status between 25% and 75%. Red indicates status
           below 25%. Completely white indicates an airbase that is at
           0%.")
       (li (strong "Airbase name.")
           " The name of the airbase. Colored to indicate the current owner.")
       (li (strong "Airbase squadron icons.")
           " Icons for the squadrons deployed at this airbase. Colored
           to indicate nationality.")
       (li (strong "Airbase status.")
           " Status of the airbase.")
       (li (strong "Airbase squadron details.")
           " Information about the type and strength of the squadrons
           deployed at this airbase.")))}})

(defn with-help
  "Returns UI for content with embedded help. `help-path` is a vector
  path into the `content` map."
  ([help-path content] (with-help help-path {} content))
  ([help-path opts content]
   (let [help-ctor                 (get-in help-content-ctors help-path)
         {:keys [underline-color
                 omit-underline?]}     opts
         open?                     (cell false)
         doc-click                 (fn click-fn [e]
                                     (.removeEventListener js/document "click" click-fn)
                                     (reset! open? false))]
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
               (when (swap! open? not)
                 (with-timeout 0
                   (.addEventListener js/document "click" doc-click))))
      (div
       :fade-toggle open?
       :class "content"
       :css {:white-space "normal"
             :font-weight "normal"}
       (if help-ctor
         (help-ctor)
         [(p "Help has not yet been written for this feature.")
          (p (str help-path))]))
      content))))

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
