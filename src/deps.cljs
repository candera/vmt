{:foreign-libs
 [{:file "cljsjs/development/jquery.minicolors.inc.js",
   :file-min "cljsjs/production/jquery.minicolors.min.inc.js",
   :provides ["cljsjs.jquery.minicolors"]}
  {:file "cljsjs/development/jszip.inc.js",
   :file-min "cljsjs/production/jszip.min.inc.js",
   :provides ["cljsjs.jszip"]}
  ;; {:file "../assets/lib/slickgrid/lib/jquery.event.drag-2.3.0.js"
  ;;  :provides ["jquery.event.drag"]}
  ;; {:file "../assets/lib/slickgrid/slick.core.js"
  ;;  :provides ["slick.core"]
  ;;  :requires ["jquery.event.drag"]}
  ;; {:file "../assets/lib/slickgrid/slick.grid.js"
  ;;  :provides ["slick.grid"]
  ;;  :requires ["slick.core"]}
  ],
 :externs ["cljsjs/common/jquery.minicolors.ext.js"
           "cljsjs/common/jszip.ext.js"]}
