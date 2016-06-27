(ns weathergen.help
  (:require [hoplon.core :refer [p dl dt dd em]]))

(def content
  {:wind-stability-areas
   (p "Wind stability areas define regions of the map where the wind
   will not be affected by the weather. Although cloud cover,
   temperature, and pressure will change, within the bounds of a wind
   stability region the wind speed and direction will remain
   constant. Use this to stabilize winds in an area to support tanker
   and carrier operations, or to provide fixed, known winds at landing
   or target sites.")

   :display-controls
   {:map
    (p "Chooses the map image displayed in the background.")

    :display
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
      overlay or click a cell to get exact values."))]

    :overlay
    [(p "Selects what data will be shown in each cell of the grid,
    overlaid on the data selcted for 'Display'. Wind is shown as a
    bent line, with the tail(s) in the direction the wind is coming
    from. Each full tail indicates ten knots of wind speed, and a half
    tail adds five.")
     (p "Text overlays may be hard to read when the map grid is small.
     Use the Make Bigger button above the map to enlarge. Or click a
     cell to read the same data from the forecast section.")]

    :opacity
    [(p "Controls how opaque or transparent the display layer will be.
    Slide the slider to the left to more easily see the map.")]}

   :weather-params
   {:seed
    (p "The 'random seed': selects a weather system. Changing this
    will change the weather pattern entirely. Use any number, decimal
    or integer.")

    :crossfade
    (p "The degree to which adjacent weather types will be blended
    together. Zero means that winds, etc. will shift abruptly at
    weather type boundaries. A good value to use is 0.1. Values above
    about 0.3 will give strange results.")

    :direction
    {:heading (p "The direction the weather pattern will move in.")
     :speed (p "The speed at which the weather pattern will move.")}

    :time
    {:evolution
     (p "The number of minutes it takes for the weather to completely
     change, even if not moving.")}

    :feature-size
    (p "How 'zoomed in' the weather will be on the underlying weather
    pattern. Make this number bigger to get larger storm cells and
    larger areas of fair weather. Make it smaller to get weather that
    changes more frequently.")

    :pressure
    {:max (p "The maximum barometric pressure that will be generated.")
     :min (p "The minimum barometric pressure that will be generated.")}

    :prevailing-wind
    {:heading (p "The direction of the prevailing
    wind. Although wind direction varies, especially around high- and
    low-pressure areas, more wind will be generated in this direction
    than in any other.")}

    :wind-uniformity
    (p "Controls how much the wind speed will vary between the bounds
    set under 'Weather type configuration'. Should be between zero and
    one. Lower values produce more winds near the mean for that
    weather type. Higher values produce more wind speeds near the min
    and max for that weather type.")

    :temp-uniformity
    (p "Controls how much the temperature will vary between the bounds
    set under 'Weather type configuration'. Should be between zero and
    one. Lower values produce more temperatures near the mean for that
    weather type. Higher values produce more temperatures near the min
    and max for that weather type.")

    :turbulence
    {:power
     [(p "Weather patterns are generated by taking an underlying, regular pattern and 'warping' it into random shapes. This parameter controls how strong this warp is. Set it to zero to see the underlying weather pattern with no warping. Higher value produce more warping.")
      (p "As warp strength increases, you will probably have to set a higher zoom to get good results.")]}}
   :weather-type-config
   {:weight
    (p "How relatively common or uncommon this type of weather should
     be. These numbers are not strict measurements, but rather
     relative values. You will probably have to pick larger numbers
     for sunny than for any of the others to get good results.")

    :wind
    (p "The minimum, maximum, and mean wind speeds for each weather
     type. Due to crossfading, these values are not strict - wind can
     be higher than the maximum or lower than the minimum near the
     edges of other weather types.")

    :temp
    (p "The minimum, maximum, and mean temperatures for each weather
     type. Due to crossfading, these values are not strict - wind can
     be higher than the maximum or lower than the minimum near the
     edges of other weather types.")}

   :displayed-time
   [(p "Controls the Falcon Time that the current weather corresponds
   to. Edit the day, minute, and hour and then use one of the two
   buttons.")
    (dl
     (dt "Jump to")
     (dd "Jumps forward or backward to the indicated time. The weather will update.")
     (dt "Set to")
     (dd "Sets the time to the indicated time. The weather will not update."))
    (p "The time is used to generate file names for downloaded FMAP
   files, which Falcon relies on to automatically update weather.")]

   :origin
   {:x (p "The x location in 'weather space' that is displayed
   on the grid. You will not normally edit this field, but you can
   change it to see different parts of the weather pattern.")

    :y (p "The y location in 'weather space' that is displayed
on the grid. You will not normally edit this field, but you can change
it to see different parts of the weather pattern.")

    :t (p "The time in 'weather space' that is displayed on the grid.
You will not normally edit this field, but you can change it to move
forward and backward in time. ")}

   :step
   (p "The number of minutes each click of the 'Step forward' or 'Step
   backward' buttons will move in time. Also influences how many rows
   there are in the weather forecast.")

   :forecast
   (p "Displays the weather forecast for the selected location in the
   weather grid.")})
