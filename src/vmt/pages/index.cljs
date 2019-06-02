(ns ^{:hoplon/page "index.html"} vmt.pages.index
  (:require [cljs.pprint :refer [pprint]]
            ;; [quiescent.core :as q]
            ;; [quiescent.dom :as d]
            [hoplon.core :refer [body case-tpl cond-tpl elem if-tpl div html span when-tpl with-timeout]]
            [hoplon.storage-atom :refer [local-storage]]
            [javelin.core :refer [cell cell= defc dosync formula-of with-let]]
            [weathergen.ipc :as ipc]
            [weathergen.ui :as ui]
            [weathergen.ui.buttons :as buttons]
            [weathergen.ui.common :as comm :refer [external-link inl pct px rinl when-dom*]]
            [weathergen.help :as help :refer [with-help]]
            [weathergen.ui.trees :as trees]
            [taoensso.timbre :as log
             :refer-macros (log trace debug info warn error fatal report
                                logf tracef debugf infof warnf errorf fatalf reportf
                                spy get-env log-env)])
  (:require-macros
   [weathergen.cljs.macros :refer [with-bbox with-time #_formula-of]]))

(def electron (js/require "electron"))

(def update-frequency
  "How often we automatically check for updates."
  (local-storage
   (cell nil)
   (str (get ui/build-info "CHANNEL")
        ::update-frequency)))

(def last-update-check
  "The last time we checked for an update."
  (local-storage
   (cell nil)
   (str (get ui/build-info "CHANNEL")
        ::last-update-check)))

(def latest-build-info
  "The latest build information that we have retrieved from the update
  location."
  (local-storage
   (cell nil)
   (str (get ui/build-info "CHANNEL")
        ::latest-build-info)))

(def ignored-versions
  "This list of versions we'll never prompt the user about."
  (local-storage
   (cell #{})
   (str (get ui/build-info "CHANNEL")
        ::ignored-versions)))

(defc checking-updates? false)

(defc update-check-error nil)

;; A vector of step maps, each of which has
;; keys :state, :id, :name, :parent, and :messages
(defc load-status
  [])

(defc loading? false)

(defn- update-for-id
  "Updates the entry in `status` whose id is `id`, by replacing it with
  the result of calling `f` on it."
  [status id f]
  (->> status
       (mapv #(if (= (:id %) id)
                (f %)
                %))))

(defmethod ipc/on-message "load-step-started"
  [_ _ {:keys [id name parent]}]
  (log/debug "load-step-started" id name parent)
  (when @loading?
    (swap! load-status conj {:state    :started
                             :id       id
                             :name     name
                             :messages []
                             :parent   (or parent ::root)})))

(defmethod ipc/on-message "load-step-succeeded"
  [_ _ {:keys [id]}]
  (log/debug "load-step-succeeded" id)
  (when @loading?
    (swap! load-status update-for-id id #(assoc % :state :succeeded))))

(defmethod ipc/on-message "load-step-warning"
  [_ _ {:keys [id message]}]
  (log/debug "load-step-warning" id message)
  (when @loading?
    (swap! load-status update-for-id id #(-> %
                                             (assoc :state :warning)
                                             (update :messages conj {:type :warning
                                                                     :text message})))))

(defmethod ipc/on-message "load-step-failed"
  [_ _ {:keys [id message]}]
  (log/debug "load-step-failed" id message)
  (when @loading?
    (swap! load-status update-for-id id #(-> %
                                             (assoc :state :failed)
                                             (update :messages (fn [messages]
                                                                 (if message
                                                                   (conj messages {:type :error
                                                                                   :text message})
                                                                   messages)))))))


(defmethod ipc/on-message "load-complete"
  [_ event]
  (log/debug "load-complete")
  (dosync
   (reset! loading? false)
   (swap! load-status update-for-id ::root #(-> %
                                                (assoc :state :succeeded)))))

(defmethod ipc/on-message "load-failed"
  [_ _ err]
  (log/debug "load-failed" err)
  (dosync
   (reset! loading? false)
   (swap! load-status #(->> %
                            (map (fn [step]
                                   (if (= (:state step) :started)
                                     (assoc step :state :failed)
                                     step)))))
   (swap! load-status update-for-id ::root #(-> %
                                                (assoc :state :failed)
                                                (update :messages (fn [messages]
                                                                    (if err
                                                                      (conj messages {:type :error
                                                                                      :text err})
                                                                      messages)))))))

(defn load-mission
  []
  (when-let [[path] (-> electron
                        .-remote
                        .-dialog
                        (.showOpenDialog
                         (clj->js {:title      "Select a campaign or tactical engagement file"
                                   :properties ["openFile"]
                                   :filters    [{:name       "Campaign file"
                                                 :extensions ["cam"]}
                                                {:name       "Tactical engagement file"
                                                 :extensions ["tac"]}]})))]
    (dosync
     (reset! loading? true)
     (reset! load-status [{:id    ::root
                           :state :started
                           :name  "Loading mission"}]))
    (ipc/send-to-main "open-mission" path)))

(defn load-briefing
  []
  (when-let [[path] (-> electron
                        .-remote
                        .-dialog
                        (.showOpenDialog
                         #js {:title "Select a campaign or tactical engagement file"
                              :openFile true
                              :filters #js [#js {:name "VMT Briefing"
                                                 :extensions #js ["vmtb"]}]}))]
    (dosync
     (reset! loading? true)
     (reset! load-status [{:id    ::root
                           :state :started
                           :name  "Loading briefing"}]))
    (ipc/send-to-main "open-briefing" path)))

(defn- tree-item
  "Returns UI for an item in the tree."
  [{:keys [id messages state name] :as item}]
  (rinl
   {}
   (rinl
    {:style {:verticalAlign "top"}}
    (condp = state
      :succeeded (rinl {:style {:font-weight    "bold"
                                  :color          "green"
                                  :width          (px 24)
                                  :vertical-align "top"}}
                         "✓")
      :failed    (rinl {:style {:font-weight    "bold"
                                  :color          "red"
                                  :width          (px 24)
                                  :vertical-align "top"}}
                         "✗")
      :started   [:img {:style {:width          (px 24)
                                :vertical-align "top"
                                :margin-top     (px 5)}
                        :src   "images/spinner.gif"}]
      :warning   [:img {:style {:width          (px 24)
                                :vertical-align "top"
                                :margin-top     (px 5)
                                :margin-right   (px 3)}
                        :src   "images/warning.svg"}])
    (rinl
     {:style {:white-space "normal"}}
     name))
   [:table
    {:style {:margin-left (px 30)}}
    [:tbody
     (for [message messages]
       (let [{:keys [type text]} message]
         [:tr
          [:td
           {:style {:vertical-align "top"}}
           (condp = type
             :warning [:img {:style {:width          (px 24)
                                     :vertical-align "middle"
                                     :margin-top     (px -5)}
                             :src   "images/warning.svg"}]
             :error   (rinl {:style {:font-weight "bold"
                                       :color       "red"
                                       :width       (px 24)}}
                              "✗"))]
          [:td
           [:div
            {:style (if (= type :error)
                      {:white-space "pre"
                       :font-family "monospace"
                       :margin-top  (px 7)}
                      {:white-space "normal"})}
            text]]]))]]))

(defn- tree-level
  "Returns data structure describing tree at level having parent `parent`."
  ([items collapsed] (tree-level items collapsed nil))
  ([items collapsed parent]
   (for [item  items
         :let  [{:keys [id]} item]
         :when (= (:parent item) parent)]
     {:ui        (tree-item item)
      :id        id
      :expanded? (not (get collapsed id))
      :children  (when-let [kids (->> items
                                      (filter #(= (:parent %) id))
                                      seq)]
                   (tree-level items collapsed id))})))

(defn- update-available-message
  "Returns UI for a message to display when a new version is available."
  []
  (let [latest-version (formula-of [latest-build-info]
                         (get latest-build-info "VERSION"))
        ignored?       (formula-of [ignored-versions latest-version]
                         (contains? ignored-versions latest-version))]
    (div
     (if-tpl ignored?
       (div
        "Version "
        latest-version
        " is available, but you told VMT to ignore it.")
       (div
        "You are running "
        (get ui/build-info "VERSION")
        ", but the latest version on the "
        (get ui/build-info "CHANNEL")
        " channel (as of "
        last-update-check
        ") is "
        latest-version
        ". Download it "
        (external-link :href (cell= (get latest-build-info "DOWNLOAD_URL"))
                       "here")
        ", or visit "
        (external-link :href (cell= (get latest-build-info "CHANGELOG_URL"
                                         (str "http://org.craigandera.vmt.s3-website-us-east-1.amazonaws.com/"
                                              (get ui/build-info "CHANNEL")
                                              "/")))
                       "the VMT download page")
        " to see a list of changes and download new versions. Or, "
        (buttons/a-button
         :css {:color "initial"}
         :click #(swap! ignored-versions conj @latest-version)
         "Ignore This Version")
        ".")))))

(defn- check-for-updates
  "Checks for a new version of VMT. Calls `cb` if the latest version is
  different from the current one."
  [cb]
  (reset! checking-updates? true)
  (let [req (js/XMLHttpRequest.)]
    (-> req
        .-onreadystatechange
        (set! #(when (= 4 (.-readyState req))
                 (let [status   (.-status req)
                       response (.-responseText req)]
                   (dosync
                    (reset! checking-updates? false)
                    (reset! last-update-check (str (js/Date.)))
                    (if (= 200 status)
                      (let [lbi (ui/parse-build-info response)]
                        (reset! latest-build-info lbi)
                        (when-not (or (@ignored-versions (get lbi "VERSION"))
                                      (= (get lbi "VERSION")
                                         (get ui/build-info "VERSION")))
                          (cb)))
                      (do
                        (log/error "Error checking latest version" :status status :response response)
                        (reset! update-check-error
                                "There was an error while determining the latest available version. Please try again later."))))))))
    (.open req "GET" (get ui/build-info "UPDATE") true)
    (.send req nil)))

(def settings
  "UI for settings."
  (div
   :css {:margin  (px 0 10 20 10)
         :padding (px 4 24 4 4)}
   (div
    :css {:font-size     (pct 125)
          :font-weight   "bold"
          :margin-bottom (px 7)
          :border-bottom "solid 1px black"}
    (with-help [:settings :updates]
      {:margin-bottom (px 3)}
      "Updates"))
   (div
    (let [this-version (get ui/build-info "VERSION")]
      (if (nil? this-version)
        "You are running a dev build, which does not support update checking."
        (div
         (span
          :css {:margin-right (px 3)
                :margin-left  (px 2)}
          "Automaticallly check for updates")
         (comm/radio-group
          :css {:margin-right (px 3)}
          :value update-frequency
          :choices [{:value :never
                     :label "Never"}
                    {:value :startup
                     :label "When VMT starts"}])
         (div
          (buttons/a-button
           :css {:margin-right (px 7)}
           :click (fn [_]
                    (check-for-updates #()))
           :disabled? checking-updates?
           (if-tpl checking-updates?
             "Checking"
             "Check for updates now"))
          (when-tpl (cell= (not checking-updates?))
            (inl
             "Last update check was: "
             (span
              :css {:font-style "italic"
                    :font-size  (pct 93)}
              (formula-of [last-update-check]
                (or last-update-check "Never")))))
          (let [latest-version (formula-of [latest-build-info]
                                 (get latest-build-info "VERSION"))]
            (div
             (cond-tpl
               checking-updates?
               "Checking"

               update-check-error
               (div
                :css {:color "red"}
                update-check-error)

               (cell= (= this-version latest-version))
               (str "You are running "
                    this-version
                    ", which is the lastest version.")

               (cell= (nil? latest-build-info))
               ""

               :else
               (div
                (span
                 :css {:font-weight "bold"}
                 "Update available!")
                (update-available-message))))))))))))

(defc display-mode :normal)

(html
 (ui/head)
 (body
  :css {:margin 0}
  (div
   :css {:display        "flex"
         :flex-direction "column"
         :height         "100vh"}
   (div
    :css {:padding (px 8 8 0)}
    (ui/titlebar)
    (ui/message-display))
   (let [button-style (formula-of [display-mode]
                        {:display (if (= display-mode :normal) "inline-block" "none")
                         :margin  (px 5 10)})]
     (div
      :css {:font-size (pct 150)}
      (div
       :css (formula-of [display-mode]
              {:font-weight "bold"
               :margin-left (px 13)
               :display     (display-mode {:settings "inline-block"
                                           :normal   "none"})})
       "VMT Settings")
      (buttons/a-button
       :disabled? loading?
       :css button-style
       :click load-mission
       "Load mission (.cam/.tac)")
      (buttons/a-button
       :disabled? loading?
       :css button-style
       :click load-briefing
       "Load briefing (.vmtb)")
      (buttons/image-button
       :css {:float  "right"
             :margin (px 5 10)}
       :width (px 16)
       :title "Settings"
       :click (fn [_]
                (swap! display-mode {:settings :normal
                                     :normal   :settings}))
       :latched? (cell= (= display-mode :settings))
       :src "images/settings.svg")))
   (case-tpl display-mode
     :settings
     settings
     :normal
     (with-let [elem (div
                      :css {:overflow-y "auto"
                            :overflow-x "auto"
                            :flex       1
                            :font-size  (pct 150)
                            :border     "solid 1px black"
                            :margin     (px 0 10 20 10)
                            :padding    (px 4 24 4 4)}
                      (comm/styled
                       :garden [:ol {:margin-top 0}]
                       (let [collapsed        (cell {})
                             load-status-tree (formula-of [load-status collapsed]
                                                (tree-level load-status collapsed))]
                         (trees/rtree load-status-tree
                                      (fn [id]
                                        (swap! collapsed
                                               update
                                               id
                                               not))))))]
       (add-watch load-status
                  ::scroll-notifications
                  (fn [_ _ _ _]
                    (when-dom* elem
                      ;; TODO: Scroll to the bottom of the element, not the top
                     #(-> elem .-scrollTop (set! (.-scrollHeight elem)))))))))))

(with-timeout 500
  (let [latest-version (get @latest-build-info "VERSION")
        this-version   (get ui/build-info "VERSION")]
    (cond
      (nil? @update-frequency)
      (swap! ui/messages
             conj
             (div
              (div "How often would you like VMT to automatically check for updates?"
                   (comm/radio-group
                    :css {:margin-right (px 3)}
                    :value update-frequency
                    :choices [{:value :never
                               :label "Never"}
                              {:value :startup
                               :label "When VMT starts"}]))
              (div "Change this any time in settings ("
                   (buttons/image-button
                    :src "images/settings.svg"
                    :width (px 16)
                    :click #(swap! display-mode {:settings :normal
                                                 :normal   :settings})
                    :latched? (cell= (= display-mode :settings)))
                   ").")))

      (= :startup @update-frequency)
      ;; I have no idea why the with-timeout is required here.
      ;; Something to do with the lifecyle of the page. Without it, I
      ;; get an error when calling `update-available-message`.
      (check-for-updates #(with-timeout 0
                            (swap! ui/messages
                                   conj
                                   (update-available-message))))

      (and latest-version
           this-version
           (not (contains? @ignored-versions latest-version))
           (not= this-version latest-version))
      (swap! ui/messages
             conj
             (update-available-message)))))