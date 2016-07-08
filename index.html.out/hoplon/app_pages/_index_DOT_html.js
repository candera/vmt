// Compiled by ClojureScript 1.9.76 {:static-fns true, :optimize-constants true}
goog.provide('hoplon.app_pages._index_DOT_html');
goog.require('cljs.core');
goog.require('hoplon.svg');
goog.require('goog.dom');
goog.require('weathergen.help');
goog.require('goog.string');
goog.require('weathergen.math');
goog.require('weathergen.model');
goog.require('javelin.core');
goog.require('goog.style');
goog.require('cljs.core.async');
goog.require('hoplon.core');
goog.require('weathergen.database');
goog.require('weathergen.coordinates');
goog.require('goog.string.format');
goog.require('weathergen.canvas');
goog.require('weathergen.fmap');
goog.require('cljs.reader');
hoplon.app_pages._index_DOT_html.revision = (6);
hoplon.app_pages._index_DOT_html.agents = (function (){var is_agent_QMARK_ = (function (agent){
return !((navigator.userAgent.indexOf(agent) < (0)));
});
var agent_props = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$chrome,"Chrome",cljs.core.cst$kw$ie,"MSIE",cljs.core.cst$kw$firefox,"Firefox",cljs.core.cst$kw$safari,"Safari",cljs.core.cst$kw$opera,"op"], null);
return cljs.core.zipmap(cljs.core.keys(agent_props),cljs.core.map.cljs$core$IFn$_invoke$arity$2(is_agent_QMARK_,cljs.core.vals(agent_props)));
})();
if(cljs.core.truth_((function (){var and__7007__auto__ = cljs.core.cst$kw$safari.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.agents);
if(cljs.core.truth_(and__7007__auto__)){
return cljs.core.not(cljs.core.cst$kw$chrome.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.agents));
} else {
return and__7007__auto__;
}
})())){
alert("WeatherGen does not work well in Safari, due to Safari's atrocious Javascript performance and some weird layout issues. Chrome and Firefox are the recommended/supported browsers.");
} else {
if(cljs.core.truth_((function (){var or__7019__auto__ = cljs.core.cst$kw$firefox.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.agents);
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
return cljs.core.cst$kw$chrome.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.agents);
}
})())){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Chrome or Firefox detected"], 0));
} else {
alert("Browsers other than Chrome and Firefox are not currently supported by WeatherGen. Some features may not behave as expected. Use of Chrome/Firefox is recommended.");

}
}
hoplon.app_pages._index_DOT_html.weather_params = javelin.core.cell.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$temp_DASH_uniformity,cljs.core.cst$kw$pressure,cljs.core.cst$kw$time,cljs.core.cst$kw$evolution,cljs.core.cst$kw$seed,cljs.core.cst$kw$feature_DASH_size,cljs.core.cst$kw$cell_DASH_count,cljs.core.cst$kw$categories,cljs.core.cst$kw$wind_DASH_stability_DASH_areas,cljs.core.cst$kw$turbulence,cljs.core.cst$kw$origin,cljs.core.cst$kw$wind_DASH_uniformity,cljs.core.cst$kw$crossfade,cljs.core.cst$kw$prevailing_DASH_wind],[0.7,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,28.5,cljs.core.cst$kw$max,(31)], null),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$offset,(1234),cljs.core.cst$kw$current,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$day,(1),cljs.core.cst$kw$hour,(5),cljs.core.cst$kw$minute,(0)], null)], null),(3600),(1234),(10),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(59),(59)], null),new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$sunny,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$weight,(20),cljs.core.cst$kw$wind,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$min,(0),cljs.core.cst$kw$mean,(7),cljs.core.cst$kw$max,(20)], null),cljs.core.cst$kw$temp,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$min,(20),cljs.core.cst$kw$mean,(22),cljs.core.cst$kw$max,(24)], null)], null),cljs.core.cst$kw$fair,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$weight,0.7,cljs.core.cst$kw$wind,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$min,(5),cljs.core.cst$kw$mean,(10),cljs.core.cst$kw$max,(30)], null),cljs.core.cst$kw$temp,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$min,(18),cljs.core.cst$kw$mean,(21),cljs.core.cst$kw$max,(23)], null)], null),cljs.core.cst$kw$poor,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$weight,(5),cljs.core.cst$kw$wind,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$min,(10),cljs.core.cst$kw$mean,(18),cljs.core.cst$kw$max,(30)], null),cljs.core.cst$kw$temp,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$min,(15),cljs.core.cst$kw$mean,(18),cljs.core.cst$kw$max,(21)], null)], null),cljs.core.cst$kw$inclement,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$weight,(2),cljs.core.cst$kw$wind,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$min,(15),cljs.core.cst$kw$mean,(25),cljs.core.cst$kw$max,(60)], null),cljs.core.cst$kw$temp,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$min,(12),cljs.core.cst$kw$mean,(14),cljs.core.cst$kw$max,(16)], null)], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$bounds,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(16),cljs.core.cst$kw$y,(39),cljs.core.cst$kw$width,(6),cljs.core.cst$kw$height,(4)], null),cljs.core.cst$kw$wind,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$speed,(5),cljs.core.cst$kw$heading,(0)], null),cljs.core.cst$kw$index,(0)], null)], null),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$size,(1),cljs.core.cst$kw$power,(250)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1000),(1000)], null),0.7,0.1,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$heading,(325)], null)]));
hoplon.app_pages._index_DOT_html.movement_params = javelin.core.cell.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$step,(60),cljs.core.cst$kw$direction,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$heading,(135),cljs.core.cst$kw$speed,(30)], null)], null));
hoplon.app_pages._index_DOT_html.initial_size = (function (){var x__7352__auto__ = (250);
var y__7353__auto__ = ($(window).width() - (710));
return ((x__7352__auto__ > y__7353__auto__) ? x__7352__auto__ : y__7353__auto__);
})();
hoplon.app_pages._index_DOT_html.display_params = javelin.core.cell.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$dimensions,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [hoplon.app_pages._index_DOT_html.initial_size,hoplon.app_pages._index_DOT_html.initial_size], null),cljs.core.cst$kw$opacity,0.75,cljs.core.cst$kw$display,cljs.core.cst$kw$type,cljs.core.cst$kw$map,cljs.core.cst$kw$korea,cljs.core.cst$kw$mouse_DASH_mode,cljs.core.cst$kw$select,cljs.core.cst$kw$overlay,cljs.core.cst$kw$wind], null));
hoplon.app_pages._index_DOT_html.selected_cell = javelin.core.cell.cljs$core$IFn$_invoke$arity$1(null);
hoplon.app_pages._index_DOT_html.pending_wind_stability_area = javelin.core.cell.cljs$core$IFn$_invoke$arity$1(null);
hoplon.app_pages._index_DOT_html.current_tool = javelin.core.cell.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$select);
hoplon.app_pages._index_DOT_html.time_params = javelin.core.cell.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$displayed,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$day,(1),cljs.core.cst$kw$hour,(5),cljs.core.cst$kw$minute,(0)], null)], null));
hoplon.app_pages._index_DOT_html.weather_data = javelin.core.formula((function (G__19844,G__19843){
return (G__19843.cljs$core$IFn$_invoke$arity$1 ? G__19843.cljs$core$IFn$_invoke$arity$1(G__19844) : G__19843.call(null,G__19844));
})).call(null,hoplon.app_pages._index_DOT_html.weather_params,weathergen.model.weather_grid);
hoplon.app_pages._index_DOT_html.selected_cell_weather = javelin.core.formula((function (G__19845,G__19847,G__19846){
var G__19848 = G__19846;
var G__19849 = cljs.core.cst$kw$coordinates.cljs$core$IFn$_invoke$arity$1(G__19847);
return (G__19845.cljs$core$IFn$_invoke$arity$2 ? G__19845.cljs$core$IFn$_invoke$arity$2(G__19848,G__19849) : G__19845.call(null,G__19848,G__19849));
})).call(null,cljs.core.get,hoplon.app_pages._index_DOT_html.selected_cell,hoplon.app_pages._index_DOT_html.weather_data);
hoplon.app_pages._index_DOT_html.cell_count = javelin.core.formula((function (G__19850){
return cljs.core.cst$kw$cell_DASH_count.cljs$core$IFn$_invoke$arity$1(G__19850);
})).call(null,hoplon.app_pages._index_DOT_html.weather_params);
hoplon.app_pages._index_DOT_html.dimensions = javelin.core.formula((function (G__19851){
return cljs.core.cst$kw$dimensions.cljs$core$IFn$_invoke$arity$1(G__19851);
})).call(null,hoplon.app_pages._index_DOT_html.display_params);
hoplon.app_pages._index_DOT_html.wind_stability_areas = javelin.core.formula((function (G__19852){
return cljs.core.cst$kw$wind_DASH_stability_DASH_areas.cljs$core$IFn$_invoke$arity$1(G__19852);
})).call(null,hoplon.app_pages._index_DOT_html.weather_params);
hoplon.app_pages._index_DOT_html.grid_data = javelin.core.formula((function (G__19853,G__19856,G__19854,G__19857,G__19855){
return new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$display_DASH_params,G__19853,cljs.core.cst$kw$cell_DASH_count,G__19854,cljs.core.cst$kw$weather_DASH_data,G__19855,cljs.core.cst$kw$selected_DASH_cell,G__19856,cljs.core.cst$kw$wind_DASH_stability_DASH_areas,G__19857], null);
})).call(null,hoplon.app_pages._index_DOT_html.display_params,hoplon.app_pages._index_DOT_html.selected_cell,hoplon.app_pages._index_DOT_html.cell_count,hoplon.app_pages._index_DOT_html.wind_stability_areas,hoplon.app_pages._index_DOT_html.weather_data);
hoplon.app_pages._index_DOT_html.forecast = javelin.core.formula((function (G__19860,G__19862,G__19858,G__19861,G__19859){
if(cljs.core.truth_(G__19858)){
var result = (function (){var G__19863 = cljs.core.cst$kw$coordinates.cljs$core$IFn$_invoke$arity$1(G__19858);
var G__19864 = G__19860;
var G__19865 = G__19861;
var G__19866 = (function (){var G__19867 = (5);
var G__19868 = ((360) / cljs.core.cst$kw$step.cljs$core$IFn$_invoke$arity$1(G__19861));
var G__19869 = (15);
return (G__19862.cljs$core$IFn$_invoke$arity$3 ? G__19862.cljs$core$IFn$_invoke$arity$3(G__19867,G__19868,G__19869) : G__19862.call(null,G__19867,G__19868,G__19869));
})();
return (G__19859.cljs$core$IFn$_invoke$arity$4 ? G__19859.cljs$core$IFn$_invoke$arity$4(G__19863,G__19864,G__19865,G__19866) : G__19859.call(null,G__19863,G__19864,G__19865,G__19866));
})();
return result;
} else {
return null;
}
})).call(null,hoplon.app_pages._index_DOT_html.weather_params,weathergen.math.clamp,hoplon.app_pages._index_DOT_html.selected_cell,hoplon.app_pages._index_DOT_html.movement_params,weathergen.model.forecast);
hoplon.app_pages._index_DOT_html.airbases = javelin.core.formula((function (G__19871,G__19870,G__19872,G__19873){
var G__19878 = (function (){var G__19880 = cljs.core.cst$kw$name;
var G__19881 = (function (){var G__19882 = cljs.core.cst$kw$map.cljs$core$IFn$_invoke$arity$1(G__19873);
return (G__19872.cljs$core$IFn$_invoke$arity$1 ? G__19872.cljs$core$IFn$_invoke$arity$1(G__19882) : G__19872.call(null,G__19882));
})();
return (G__19871.cljs$core$IFn$_invoke$arity$2 ? G__19871.cljs$core$IFn$_invoke$arity$2(G__19880,G__19881) : G__19871.call(null,G__19880,G__19881));
})();
return (G__19870.cljs$core$IFn$_invoke$arity$1 ? G__19870.cljs$core$IFn$_invoke$arity$1(G__19878) : G__19870.call(null,G__19878));
})).call(null,cljs.core.map,cljs.core.sort,weathergen.database.airbases,hoplon.app_pages._index_DOT_html.display_params);
hoplon.app_pages._index_DOT_html.location_type = javelin.core.formula((function (G__19884,G__19883){
if(cljs.core.truth_((function (){var G__19885 = cljs.core.cst$kw$location.cljs$core$IFn$_invoke$arity$1(G__19884);
return (G__19883.cljs$core$IFn$_invoke$arity$1 ? G__19883.cljs$core$IFn$_invoke$arity$1(G__19885) : G__19883.call(null,G__19885));
})())){
return cljs.core.cst$kw$named;
} else {
if(cljs.core.truth_(cljs.core.cst$kw$coordinates.cljs$core$IFn$_invoke$arity$1(G__19884))){
return cljs.core.cst$kw$coordinates;
} else {
return cljs.core.cst$kw$none;

}
}
})).call(null,hoplon.app_pages._index_DOT_html.selected_cell,cljs.core.not_empty);
hoplon.app_pages._index_DOT_html.log = cljs.core.println;
hoplon.app_pages._index_DOT_html.remove_nth = (function hoplon$app_pages$_index_DOT_html$remove_nth(coll,n){
return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.take.cljs$core$IFn$_invoke$arity$2(n,coll),cljs.core.drop.cljs$core$IFn$_invoke$arity$2((n + (1)),coll)));
});
hoplon.app_pages._index_DOT_html.invert_map = (function hoplon$app_pages$_index_DOT_html$invert_map(m){
return cljs.core.zipmap(cljs.core.vals(m),cljs.core.keys(m));
});
hoplon.app_pages._index_DOT_html.map_name__GT_key = new cljs.core.PersistentArrayMap(null, 3, ["Israel",cljs.core.cst$kw$israel,"Balkans",cljs.core.cst$kw$balkans,"Korea",cljs.core.cst$kw$korea], null);
hoplon.app_pages._index_DOT_html.map_key__GT_name = hoplon.app_pages._index_DOT_html.invert_map(hoplon.app_pages._index_DOT_html.map_name__GT_key);
hoplon.app_pages._index_DOT_html.map_image = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$korea,"images/kto.jpg",cljs.core.cst$kw$balkans,"images/balkans.png",cljs.core.cst$kw$israel,"images/ito.jpg"], null);
hoplon.app_pages._index_DOT_html.map_image_id = (function hoplon$app_pages$_index_DOT_html$map_image_id(map){
return [cljs.core.str("map-image-"),cljs.core.str(cljs.core.name(map))].join('');
});
hoplon.app_pages._index_DOT_html.display_name__GT_key = new cljs.core.PersistentArrayMap(null, 3, ["Weather Type",cljs.core.cst$kw$type,"Pressure",cljs.core.cst$kw$pressure,"Temperature",cljs.core.cst$kw$temperature], null);
hoplon.app_pages._index_DOT_html.display_key__GT_name = hoplon.app_pages._index_DOT_html.invert_map(hoplon.app_pages._index_DOT_html.display_name__GT_key);
hoplon.app_pages._index_DOT_html.overlay_name__GT_key = new cljs.core.PersistentArrayMap(null, 4, ["Wind",cljs.core.cst$kw$wind,"Pressure",cljs.core.cst$kw$pressure,"Temperature",cljs.core.cst$kw$temperature,"Weather Type",cljs.core.cst$kw$type], null);
hoplon.app_pages._index_DOT_html.overlay_key__GT_name = hoplon.app_pages._index_DOT_html.invert_map(hoplon.app_pages._index_DOT_html.overlay_name__GT_key);
hoplon.app_pages._index_DOT_html.type_name__GT_key = new cljs.core.PersistentArrayMap(null, 4, ["Sunny",cljs.core.cst$kw$sunny,"Fair",cljs.core.cst$kw$fair,"Poor",cljs.core.cst$kw$poor,"Inclement",cljs.core.cst$kw$inclement], null);
hoplon.app_pages._index_DOT_html.type_key__GT_name = hoplon.app_pages._index_DOT_html.invert_map(hoplon.app_pages._index_DOT_html.type_name__GT_key);
/**
 * Advances the weather by `steps` steps
 */
hoplon.app_pages._index_DOT_html.move = (function hoplon$app_pages$_index_DOT_html$move(steps){
return javelin.core.dosync_STAR_((function (){
var map__19888 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.weather_params,weathergen.model.step,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.movement_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.movement_params)),steps);
var map__19888__$1 = ((((!((map__19888 == null)))?((((map__19888.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19888.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19888):map__19888);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19888__$1,cljs.core.cst$kw$time);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.time_params,cljs.core.assoc,cljs.core.cst$kw$displayed,cljs.core.cst$kw$current.cljs$core$IFn$_invoke$arity$1(time));
}));
});
/**
 * Adjust the time coordinate to match the displayed time.
 */
hoplon.app_pages._index_DOT_html.jump_to_time = (function hoplon$app_pages$_index_DOT_html$jump_to_time(){
return javelin.core.dosync_STAR_((function (){
var map__19892 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.weather_params,weathergen.model.jump_to_time,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.movement_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.movement_params)),cljs.core.cst$kw$displayed.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.time_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.time_params))));
var map__19892__$1 = ((((!((map__19892 == null)))?((((map__19892.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19892.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19892):map__19892);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19892__$1,cljs.core.cst$kw$time);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.time_params,cljs.core.assoc,cljs.core.cst$kw$displayed,cljs.core.cst$kw$current.cljs$core$IFn$_invoke$arity$1(time));
}));
});
/**
 * Adjust the time coordinate so that the current time is adjusted to
 *   match the displayed time without changing the location in weather
 *   space.
 */
hoplon.app_pages._index_DOT_html.set_time = (function hoplon$app_pages$_index_DOT_html$set_time(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.weather_params,weathergen.model.set_time,cljs.core.cst$kw$displayed.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.time_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.time_params))));
});
hoplon.app_pages._index_DOT_html.change_location = (function hoplon$app_pages$_index_DOT_html$change_location(airbase){
if(cljs.core.empty_QMARK_(airbase)){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.selected_cell,null) : cljs.core.reset_BANG_.call(null,hoplon.app_pages._index_DOT_html.selected_cell,null));
} else {
var G__19896 = hoplon.app_pages._index_DOT_html.selected_cell;
var G__19897 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$location,airbase,cljs.core.cst$kw$coordinates,weathergen.coordinates.airbase_coordinates((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.cell_count) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.cell_count)),cljs.core.cst$kw$map.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.display_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.display_params))),airbase)], null);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__19896,G__19897) : cljs.core.reset_BANG_.call(null,G__19896,G__19897));
}
});
hoplon.app_pages._index_DOT_html.change_theater = (function hoplon$app_pages$_index_DOT_html$change_theater(theater){
return javelin.core.dosync_STAR_((function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.selected_cell,(function (p1__19898_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$named,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.location_type) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.location_type)))){
return null;
} else {
return p1__19898_SHARP_;
}
}));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.display_params,cljs.core.assoc,cljs.core.cst$kw$map,theater);
}));
});
hoplon.app_pages._index_DOT_html.save_data = (function hoplon$app_pages$_index_DOT_html$save_data(blob,filename){
var a = goog.dom.createElement("a");
var _ = (function (){var G__19901 = goog.dom.getDocument().body;
var G__19902 = a;
return goog.dom.appendChild(G__19901,G__19902);
})();
var ___$1 = goog.style.showElement(a,false);
var url = window.URL.createObjectURL(blob);
a.href = url;

a.download = filename;

a.click();

return window.URL.revokeObjectURL(url);
});
hoplon.app_pages._index_DOT_html.save_fmap = (function hoplon$app_pages$_index_DOT_html$save_fmap(weather_params,weather_data){
var t = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time,cljs.core.cst$kw$current], null));
var vec__19910 = cljs.core.cst$kw$cell_DASH_count.cljs$core$IFn$_invoke$arity$1(weather_params);
var x_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19910,(0),null);
var y_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19910,(1),null);
var blob = weathergen.fmap.get_blob(weather_data,x_cells,y_cells);
return hoplon.app_pages._index_DOT_html.save_data(blob,(function (){var G__19913 = "%d%02d%02d.fmap";
var G__19914 = cljs.core.cst$kw$day.cljs$core$IFn$_invoke$arity$1(t);
var G__19915 = cljs.core.cst$kw$hour.cljs$core$IFn$_invoke$arity$1(t);
var G__19916 = cljs.core.cst$kw$minute.cljs$core$IFn$_invoke$arity$1(t);
return goog.string.format(G__19913,G__19914,G__19915,G__19916);
})());
});
hoplon.app_pages._index_DOT_html.save_settings = (function hoplon$app_pages$_index_DOT_html$save_settings(_){
return hoplon.app_pages._index_DOT_html.save_data((new Blob([cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$weather_DASH_params,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.weather_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.weather_params)),cljs.core.cst$kw$movement_DASH_params,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.movement_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.movement_params)),cljs.core.cst$kw$display_DASH_params,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.display_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.display_params)),cljs.core.cst$kw$revision,hoplon.app_pages._index_DOT_html.revision], null)], 0))],{"type": "text/plain"})),"weathergen-settings.edn");
});
hoplon.app_pages._index_DOT_html.load_settings = (function hoplon$app_pages$_index_DOT_html$load_settings(_){
var i = goog.dom.createElement("input");
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
i.type = "file";

var G__19951_19984 = goog.dom.getDocument().body;
var G__19952_19985 = i;
goog.dom.appendChild(G__19951_19984,G__19952_19985);

goog.style.showElement(i,false);

i.onchange = ((function (i,ch){
return (function (e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,e);

return cljs.core.async.close_BANG_(ch);
});})(i,ch))
;

i.click();

var c__16206__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto__,i,ch){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto__,i,ch){
return (function (state_19967){
var state_val_19968 = (state_19967[(1)]);
if((state_val_19968 === (1))){
var state_19967__$1 = state_19967;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19967__$1,(2),ch);
} else {
if((state_val_19968 === (2))){
var inst_19957 = (state_19967[(7)]);
var inst_19954 = (state_19967[(8)]);
var inst_19954__$1 = (state_19967[(2)]);
var inst_19955 = inst_19954__$1.target;
var inst_19956 = inst_19955.files;
var inst_19957__$1 = (inst_19956[(0)]);
var state_19967__$1 = (function (){var statearr_19969 = state_19967;
(statearr_19969[(7)] = inst_19957__$1);

(statearr_19969[(8)] = inst_19954__$1);

return statearr_19969;
})();
if(cljs.core.truth_(inst_19957__$1)){
var statearr_19970_19986 = state_19967__$1;
(statearr_19970_19986[(1)] = (3));

} else {
var statearr_19971_19987 = state_19967__$1;
(statearr_19971_19987[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_19968 === (3))){
var inst_19957 = (state_19967[(7)]);
var inst_19954 = (state_19967[(8)]);
var inst_19959 = (new FileReader());
var inst_19960 = (function (){var e = inst_19954;
var temp__6363__auto__ = inst_19957;
var file = inst_19957;
var reader = inst_19959;
return ((function (e,temp__6363__auto__,file,reader,inst_19957,inst_19954,inst_19959,state_val_19968,c__16206__auto__,i,ch){
return (function (p1__19917_SHARP_){
var data = cljs.reader.read_string(p1__19917_SHARP_.target.result);
return javelin.core.dosync_STAR_(((function (data,e,temp__6363__auto__,file,reader,inst_19957,inst_19954,inst_19959,state_val_19968,c__16206__auto__,i,ch){
return (function (){
var map__19972 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.weather_params,cljs.core.merge,cljs.core.cst$kw$weather_DASH_params.cljs$core$IFn$_invoke$arity$1(data));
var map__19972__$1 = ((((!((map__19972 == null)))?((((map__19972.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19972.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19972):map__19972);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19972__$1,cljs.core.cst$kw$time);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.display_params,cljs.core.merge,cljs.core.cst$kw$display_DASH_params.cljs$core$IFn$_invoke$arity$1(data));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.movement_params,cljs.core.merge,cljs.core.cst$kw$movement_DASH_params.cljs$core$IFn$_invoke$arity$1(data));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.time_params,cljs.core.assoc,cljs.core.cst$kw$displayed,cljs.core.cst$kw$current.cljs$core$IFn$_invoke$arity$1(time));
});})(data,e,temp__6363__auto__,file,reader,inst_19957,inst_19954,inst_19959,state_val_19968,c__16206__auto__,i,ch))
);
});
;})(e,temp__6363__auto__,file,reader,inst_19957,inst_19954,inst_19959,state_val_19968,c__16206__auto__,i,ch))
})();
var inst_19961 = inst_19959.onload = inst_19960;
var inst_19962 = inst_19959.readAsText(inst_19957);
var state_19967__$1 = (function (){var statearr_19974 = state_19967;
(statearr_19974[(9)] = inst_19961);

return statearr_19974;
})();
var statearr_19975_19988 = state_19967__$1;
(statearr_19975_19988[(2)] = inst_19962);

(statearr_19975_19988[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_19968 === (4))){
var state_19967__$1 = state_19967;
var statearr_19976_19989 = state_19967__$1;
(statearr_19976_19989[(2)] = null);

(statearr_19976_19989[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_19968 === (5))){
var inst_19965 = (state_19967[(2)]);
var state_19967__$1 = state_19967;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19967__$1,inst_19965);
} else {
return null;
}
}
}
}
}
});})(c__16206__auto__,i,ch))
;
return ((function (switch__16090__auto__,c__16206__auto__,i,ch){
return (function() {
var hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto__ = null;
var hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto____0 = (function (){
var statearr_19980 = [null,null,null,null,null,null,null,null,null,null];
(statearr_19980[(0)] = hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto__);

(statearr_19980[(1)] = (1));

return statearr_19980;
});
var hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto____1 = (function (state_19967){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_19967);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e19981){if((e19981 instanceof Object)){
var ex__16094__auto__ = e19981;
var statearr_19982_19990 = state_19967;
(statearr_19982_19990[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_19967);

return cljs.core.cst$kw$recur;
} else {
throw e19981;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__19991 = state_19967;
state_19967 = G__19991;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto__ = function(state_19967){
switch(arguments.length){
case 0:
return hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto____0.call(this);
case 1:
return hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto____1.call(this,state_19967);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto____0;
hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto____1;
return hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto__,i,ch))
})();
var state__16208__auto__ = (function (){var statearr_19983 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_19983[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto__);

return statearr_19983;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto__,i,ch))
);

return c__16206__auto__;
});
var help_states_20084 = javelin.core.cell.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
/**
 * @param {...*} var_args
 */
hoplon.app_pages._index_DOT_html.help = ((function (help_states_20084){
return (function() { 
var hoplon$app_pages$_index_DOT_html$help__delegate = function (args__13971__auto__){
var vec__20038 = hoplon.core.parse_args(args__13971__auto__);
var map__20041 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20038,(0),null);
var map__20041__$1 = ((((!((map__20041 == null)))?((((map__20041.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20041.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20041):map__20041);
var contents = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20038,(1),null);
var id = [cljs.core.str(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0())].join('');
var content_id = [cljs.core.str("content-"),cljs.core.str(id)].join('');
var img_id = [cljs.core.str("img-"),cljs.core.str(id)].join('');
var G__20058 = cljs.core.cst$kw$class;
var G__20059 = "help";
var G__20060 = (function (){var G__20065 = cljs.core.cst$kw$id;
var G__20066 = content_id;
var G__20067 = cljs.core.cst$kw$fade_DASH_toggle;
var G__20068 = javelin.core.formula(((function (G__20065,G__20066,G__20067,G__20058,G__20059,id,content_id,img_id,vec__20038,map__20041,map__20041__$1,contents,help_states_20084){
return (function (G__20074,G__20075,G__20076){
return (G__20074.cljs$core$IFn$_invoke$arity$2 ? G__20074.cljs$core$IFn$_invoke$arity$2(G__20075,G__20076) : G__20074.call(null,G__20075,G__20076));
});})(G__20065,G__20066,G__20067,G__20058,G__20059,id,content_id,img_id,vec__20038,map__20041,map__20041__$1,contents,help_states_20084))
).call(null,cljs.core.get,help_states_20084,id);
var G__20069 = cljs.core.cst$kw$class;
var G__20070 = "content";
var G__20071 = cljs.core.cst$kw$click;
var G__20072 = ((function (G__20065,G__20066,G__20067,G__20068,G__20069,G__20070,G__20071,G__20058,G__20059,id,content_id,img_id,vec__20038,map__20041,map__20041__$1,contents,help_states_20084){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(help_states_20084,cljs.core.assoc,id,false);
});})(G__20065,G__20066,G__20067,G__20068,G__20069,G__20070,G__20071,G__20058,G__20059,id,content_id,img_id,vec__20038,map__20041,map__20041__$1,contents,help_states_20084))
;
var G__20073 = contents;
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$9 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$9(G__20065,G__20066,G__20067,G__20068,G__20069,G__20070,G__20071,G__20072,G__20073) : hoplon.core.div.call(null,G__20065,G__20066,G__20067,G__20068,G__20069,G__20070,G__20071,G__20072,G__20073));
})();
var G__20061 = (function (){var G__20077 = cljs.core.cst$kw$id;
var G__20078 = img_id;
var G__20079 = cljs.core.cst$kw$class;
var G__20080 = "img";
var G__20081 = cljs.core.cst$kw$click;
var G__20082 = ((function (G__20077,G__20078,G__20079,G__20080,G__20081,G__20058,G__20059,G__20060,id,content_id,img_id,vec__20038,map__20041,map__20041__$1,contents,help_states_20084){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(help_states_20084,((function (G__20077,G__20078,G__20079,G__20080,G__20081,G__20058,G__20059,G__20060,id,content_id,img_id,vec__20038,map__20041,map__20041__$1,contents,help_states_20084){
return (function (hs){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.zipmap(cljs.core.keys(hs),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(false)),cljs.core.PersistentArrayMap.fromArray([id,cljs.core.not(cljs.core.get.cljs$core$IFn$_invoke$arity$2(hs,id))], true, false)], 0));
});})(G__20077,G__20078,G__20079,G__20080,G__20081,G__20058,G__20059,G__20060,id,content_id,img_id,vec__20038,map__20041,map__20041__$1,contents,help_states_20084))
);
});})(G__20077,G__20078,G__20079,G__20080,G__20081,G__20058,G__20059,G__20060,id,content_id,img_id,vec__20038,map__20041,map__20041__$1,contents,help_states_20084))
;
var G__20083 = "?";
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$7 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$7(G__20077,G__20078,G__20079,G__20080,G__20081,G__20082,G__20083) : hoplon.core.div.call(null,G__20077,G__20078,G__20079,G__20080,G__20081,G__20082,G__20083));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__20058,G__20059,G__20060,G__20061) : hoplon.core.div.call(null,G__20058,G__20059,G__20060,G__20061));
};
var hoplon$app_pages$_index_DOT_html$help = function (var_args){
var args__13971__auto__ = null;
if (arguments.length > 0) {
var G__20085__i = 0, G__20085__a = new Array(arguments.length -  0);
while (G__20085__i < G__20085__a.length) {G__20085__a[G__20085__i] = arguments[G__20085__i + 0]; ++G__20085__i;}
  args__13971__auto__ = new cljs.core.IndexedSeq(G__20085__a,0);
} 
return hoplon$app_pages$_index_DOT_html$help__delegate.call(this,args__13971__auto__);};
hoplon$app_pages$_index_DOT_html$help.cljs$lang$maxFixedArity = 0;
hoplon$app_pages$_index_DOT_html$help.cljs$lang$applyTo = (function (arglist__20086){
var args__13971__auto__ = cljs.core.seq(arglist__20086);
return hoplon$app_pages$_index_DOT_html$help__delegate(args__13971__auto__);
});
hoplon$app_pages$_index_DOT_html$help.cljs$core$IFn$_invoke$arity$variadic = hoplon$app_pages$_index_DOT_html$help__delegate;
return hoplon$app_pages$_index_DOT_html$help;
})()
;})(help_states_20084))
;
hoplon.app_pages._index_DOT_html.help_for = (function hoplon$app_pages$_index_DOT_html$help_for(help_path){
return hoplon.app_pages._index_DOT_html.help.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (){var or__7019__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(weathergen.help.content,help_path);
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
return (hoplon.core.p.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.p.cljs$core$IFn$_invoke$arity$1("Help content has not yet been written for this feature.") : hoplon.core.p.call(null,"Help content has not yet been written for this feature."));
}
})()], 0));
});
/**
 * Handle the mouse clicking on the canvas
 */
hoplon.app_pages._index_DOT_html.grid_click = (function hoplon$app_pages$_index_DOT_html$grid_click(e,canvas_id,cell_count,dimensions){
var vec__20095 = dimensions;
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20095,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20095,(1),null);
var vec__20098 = cell_count;
var nx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20098,(0),null);
var ny = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20098,(1),null);
var canvas = goog.dom.getElement(canvas_id);
var r = canvas.getBoundingClientRect();
var x = ((((e.clientX - r.left) / width) * nx) | (0));
var y = ((((e.clientY - r.top) / height) * ny) | (0));
var G__20101 = hoplon.app_pages._index_DOT_html.selected_cell;
var G__20102 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$location,null,cljs.core.cst$kw$coordinates,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null)], null);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__20101,G__20102) : cljs.core.reset_BANG_.call(null,G__20101,G__20102));
});
hoplon.app_pages._index_DOT_html.weather_color = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$sunny,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(255),0.25], null),cljs.core.cst$kw$fair,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(255),(0),(1)], null),cljs.core.cst$kw$poor,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(0),(1)], null),cljs.core.cst$kw$inclement,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(192),(0),(0),(1)], null),null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(0),(0),(1)], null)], null);
hoplon.app_pages._index_DOT_html.pressure_map = new cljs.core.PersistentArrayMap(null, 7, [28.5,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(192),(0),(0),(1)], null),28.9,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(192),(0),(0),(1)], null),29.3,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(0),(1)], null),29.5,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(255),(0),(1)], null),29.9,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(128),(255),(1)], null),30.2,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(255),(1)], null),31.0,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(255),(1)], null)], null);
hoplon.app_pages._index_DOT_html.gradient_color = (function hoplon$app_pages$_index_DOT_html$gradient_color(color_map,val){
var vec__20122 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__20131){
var vec__20132 = p__20131;
var vec__20135 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20132,(0),null);
var low = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20135,(0),null);
var l = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20135,(1),null);
var vec__20138 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20132,(1),null);
var high = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20138,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20138,(1),null);
return ((low <= val)) && ((val <= high));
}),cljs.core.partition.cljs$core$IFn$_invoke$arity$3((2),(1),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.sorted_map(),color_map))));
var vec__20125 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20122,(0),null);
var low = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20125,(0),null);
var l = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20125,(1),null);
var vec__20128 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20122,(1),null);
var high = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20128,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20128,(1),null);
return weathergen.math.vector_interpolate(l,h,val,low,high);
});
hoplon.app_pages._index_DOT_html.pressure_color = (function hoplon$app_pages$_index_DOT_html$pressure_color(pressure){
var vec__20144 = hoplon.app_pages._index_DOT_html.gradient_color(hoplon.app_pages._index_DOT_html.pressure_map,pressure);
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20144,(0),null);
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20144,(1),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20144,(2),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20144,(3),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.long$(r),cljs.core.long$(g),cljs.core.long$(b),a], null);
});
hoplon.app_pages._index_DOT_html.temp_map = new cljs.core.PersistentArrayMap(null, 3, [(0),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(255),(1)], null),(20),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(255),(0),(1)], null),(40),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(0),(0),(1)], null)], null);
hoplon.app_pages._index_DOT_html.temperature_color = (function hoplon$app_pages$_index_DOT_html$temperature_color(temp){
var vec__20150 = hoplon.app_pages._index_DOT_html.gradient_color(hoplon.app_pages._index_DOT_html.temp_map,temp);
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20150,(0),null);
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20150,(1),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20150,(2),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20150,(3),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.long$(r),cljs.core.long$(g),cljs.core.long$(b),a], null);
});
hoplon.app_pages._index_DOT_html.fill_color = (function hoplon$app_pages$_index_DOT_html$fill_color(display,w){
var G__20155 = (((display instanceof cljs.core.Keyword))?display.fqn:null);
switch (G__20155) {
case "type":
var G__20156 = cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(w);
return (hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1(G__20156) : hoplon.app_pages._index_DOT_html.weather_color.call(null,G__20156));

break;
case "pressure":
return hoplon.app_pages._index_DOT_html.pressure_color(cljs.core.cst$kw$pressure.cljs$core$IFn$_invoke$arity$1(w));

break;
case "temperature":
return hoplon.app_pages._index_DOT_html.temperature_color(cljs.core.cst$kw$temperature.cljs$core$IFn$_invoke$arity$1(w));

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(display)].join('')));

}
});
/**
 * Reset the current transform to the identity transform
 */
hoplon.app_pages._index_DOT_html.clear_transform = (function hoplon$app_pages$_index_DOT_html$clear_transform(ctx){
return ctx.setTransform((1),(0),(0),(1),(0),(0));
});
/**
 * Sets the transform so that the grid cell at the specified x and y
 *   map to the unit square centered at the origin.
 */
hoplon.app_pages._index_DOT_html.set_transform = (function hoplon$app_pages$_index_DOT_html$set_transform(ctx,x,y,cell_count,canvas_dimensions){
var vec__20165 = cell_count;
var x_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20165,(0),null);
var y_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20165,(1),null);
var vec__20168 = canvas_dimensions;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20168,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20168,(1),null);
var width = (w / x_cells);
var height = (h / y_cells);
var G__20171 = ctx;
hoplon.app_pages._index_DOT_html.clear_transform(G__20171);

G__20171.translate(((x + 1.0E-6) * width),((y + 1.0E-5) * height));

G__20171.scale((w / x_cells),(h / y_cells));

G__20171.translate(0.5,0.5);

return G__20171;
});
hoplon.app_pages._index_DOT_html.set_fill = (function hoplon$app_pages$_index_DOT_html$set_fill(ctx,r,g,b,a){
return ctx.fillStyle = [cljs.core.str("rgba("),cljs.core.str(r),cljs.core.str(","),cljs.core.str(g),cljs.core.str(","),cljs.core.str(b),cljs.core.str(","),cljs.core.str(a),cljs.core.str(")")].join('');
});
if(typeof hoplon.app_pages._index_DOT_html.prep_overlay !== 'undefined'){
} else {
hoplon.app_pages._index_DOT_html.prep_overlay = (function (){var method_table__8042__auto__ = (function (){var G__20172 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20172) : cljs.core.atom.call(null,G__20172));
})();
var prefer_table__8043__auto__ = (function (){var G__20173 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20173) : cljs.core.atom.call(null,G__20173));
})();
var method_cache__8044__auto__ = (function (){var G__20174 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20174) : cljs.core.atom.call(null,G__20174));
})();
var cached_hierarchy__8045__auto__ = (function (){var G__20175 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20175) : cljs.core.atom.call(null,G__20175));
})();
var hierarchy__8046__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("hoplon.app-pages._index_DOT_html","prep-overlay"),((function (method_table__8042__auto__,prefer_table__8043__auto__,method_cache__8044__auto__,cached_hierarchy__8045__auto__,hierarchy__8046__auto__){
return (function (ctx,overlay){
return overlay;
});})(method_table__8042__auto__,prefer_table__8043__auto__,method_cache__8044__auto__,cached_hierarchy__8045__auto__,hierarchy__8046__auto__))
,cljs.core.cst$kw$default,hierarchy__8046__auto__,method_table__8042__auto__,prefer_table__8043__auto__,method_cache__8044__auto__,cached_hierarchy__8045__auto__));
})();
}
hoplon.app_pages._index_DOT_html.prep_overlay.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (_,___$1){
return null;
}));
hoplon.app_pages._index_DOT_html.prep_overlay.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$wind,(function (ctx,_){
return ctx.lineWidth = 0.07;
}));
hoplon.app_pages._index_DOT_html.prep_text_overlay = (function hoplon$app_pages$_index_DOT_html$prep_text_overlay(ctx){
hoplon.app_pages._index_DOT_html.set_fill(ctx,(0),(0),(0),(1));

ctx.lineWidth = "0.07";

return ctx.font = "1px bold serif";
});
hoplon.app_pages._index_DOT_html.prep_overlay.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$temperature,(function (ctx,_){
return hoplon.app_pages._index_DOT_html.prep_text_overlay(ctx);
}));
hoplon.app_pages._index_DOT_html.prep_overlay.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$pressure,(function (ctx,_){
return hoplon.app_pages._index_DOT_html.prep_text_overlay(ctx);
}));
hoplon.app_pages._index_DOT_html.prep_overlay.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$coords,(function (ctx,_){
return hoplon.app_pages._index_DOT_html.prep_text_overlay(ctx);
}));
hoplon.app_pages._index_DOT_html.prep_overlay.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$type,(function (ctx,_){
return hoplon.app_pages._index_DOT_html.prep_text_overlay(ctx);
}));
if(typeof hoplon.app_pages._index_DOT_html.stroke_overlay !== 'undefined'){
} else {
hoplon.app_pages._index_DOT_html.stroke_overlay = (function (){var method_table__8042__auto__ = (function (){var G__20176 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20176) : cljs.core.atom.call(null,G__20176));
})();
var prefer_table__8043__auto__ = (function (){var G__20177 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20177) : cljs.core.atom.call(null,G__20177));
})();
var method_cache__8044__auto__ = (function (){var G__20178 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20178) : cljs.core.atom.call(null,G__20178));
})();
var cached_hierarchy__8045__auto__ = (function (){var G__20179 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20179) : cljs.core.atom.call(null,G__20179));
})();
var hierarchy__8046__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("hoplon.app-pages._index_DOT_html","stroke-overlay"),((function (method_table__8042__auto__,prefer_table__8043__auto__,method_cache__8044__auto__,cached_hierarchy__8045__auto__,hierarchy__8046__auto__){
return (function (ctx,overlay,weather){
return overlay;
});})(method_table__8042__auto__,prefer_table__8043__auto__,method_cache__8044__auto__,cached_hierarchy__8045__auto__,hierarchy__8046__auto__))
,cljs.core.cst$kw$default,hierarchy__8046__auto__,method_table__8042__auto__,prefer_table__8043__auto__,method_cache__8044__auto__,cached_hierarchy__8045__auto__));
})();
}
hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (_,___$1,___$2){
return null;
}));
hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$wind,(function (ctx,overlay,weather){
var map__20180 = cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather);
var map__20180__$1 = ((((!((map__20180 == null)))?((((map__20180.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20180.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20180):map__20180);
var speed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20180__$1,cljs.core.cst$kw$speed);
var heading = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20180__$1,cljs.core.cst$kw$heading);
var effective_speed = weathergen.math.nearest(speed,(5));
var ticks = weathergen.math.clamp((1),(100),((effective_speed / (5)) | (0)));
var full_tails = ((ticks / (2)) | (0));
var half_tail_QMARK_ = cljs.core.odd_QMARK_(ticks);
var scale = (1);
var offset = 0.1;
var tail_step = 0.18;
var tail_slant = 0.1;
var tail_width = (0.25 * 1.5);
ctx.scale(scale,scale);

ctx.translate((0),offset);

var G__20182_20183 = ctx;
G__20182_20183.rotate(weathergen.math.deg__GT_rad(heading));

G__20182_20183.moveTo((0),(0.5 - tail_slant));

G__20182_20183.lineTo((0),(-0.5 + tail_slant));


var n__8032__auto___20184 = full_tails;
var n_20185 = (0);
while(true){
if((n_20185 < n__8032__auto___20184)){
ctx.moveTo((0),((-0.5 + tail_slant) + (tail_step * n_20185)));

ctx.lineTo(tail_width,(-0.5 + (tail_step * n_20185)));

var G__20186 = (n_20185 + (1));
n_20185 = G__20186;
continue;
} else {
}
break;
}

if(half_tail_QMARK_){
ctx.moveTo((0),((-0.5 + tail_slant) + (tail_step * full_tails)));

return ctx.lineTo((tail_width * 0.5),(-0.5 + ((tail_step * full_tails) + (0.5 * tail_step))));
} else {
return null;
}
}));
hoplon.app_pages._index_DOT_html.stroke_text_overlay = (function hoplon$app_pages$_index_DOT_html$stroke_text_overlay(ctx,text){
ctx.save();

ctx.scale(0.42,0.42);

ctx.fillText(text,(cljs.core.count(text) * -0.24),0.2);

return ctx.restore();
});
hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$pressure,(function (ctx,overlay,weather){
return hoplon.app_pages._index_DOT_html.stroke_text_overlay(ctx,cljs.core.cst$kw$pressure.cljs$core$IFn$_invoke$arity$1(weather).toFixed((2)));
}));
hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$temperature,(function (ctx,overlay,weather){
return hoplon.app_pages._index_DOT_html.stroke_text_overlay(ctx,cljs.core.cst$kw$temperature.cljs$core$IFn$_invoke$arity$1(weather).toFixed((1)));
}));
hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$type,(function (ctx,overlay,weather){
return hoplon.app_pages._index_DOT_html.stroke_text_overlay(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$sunny,"S",cljs.core.cst$kw$fair,"F",cljs.core.cst$kw$poor,"P",cljs.core.cst$kw$inclement,"I"], null).call(null,cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(weather)));
}));
hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$coords,(function (ctx,overlay,weather){
return hoplon.app_pages._index_DOT_html.stroke_text_overlay(ctx,[cljs.core.str(cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(weather)),cljs.core.str(","),cljs.core.str(cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(weather))].join(''));
}));
/**
 * Draws the map, unless the image is not ready. In that case, returns
 *   a channel that will close when it is.
 */
hoplon.app_pages._index_DOT_html.draw_map = (function hoplon$app_pages$_index_DOT_html$draw_map(ctx,map,p__20187){
var vec__20191 = p__20187;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20191,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20191,(1),null);
return null;
});
/**
 * Draws the data layer
 */
hoplon.app_pages._index_DOT_html.draw_data = (function hoplon$app_pages$_index_DOT_html$draw_data(ctx,display,opacity,weather_data,cell_count,dimensions){
if(cljs.core.truth_((hoplon.app_pages._index_DOT_html.display_key__GT_name.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.display_key__GT_name.cljs$core$IFn$_invoke$arity$1(display) : hoplon.app_pages._index_DOT_html.display_key__GT_name.call(null,display)))){
ctx.save();

var seq__20218_20242 = cljs.core.seq(weather_data);
var chunk__20220_20243 = null;
var count__20221_20244 = (0);
var i__20222_20245 = (0);
while(true){
if((i__20222_20245 < count__20221_20244)){
var vec__20224_20246 = chunk__20220_20243.cljs$core$IIndexed$_nth$arity$2(null,i__20222_20245);
var vec__20227_20247 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20224_20246,(0),null);
var x_20248 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20227_20247,(0),null);
var y_20249 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20227_20247,(1),null);
var weather_20250 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20224_20246,(1),null);
var vec__20230_20251 = hoplon.app_pages._index_DOT_html.fill_color(display,weather_20250);
var r_20252 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20230_20251,(0),null);
var g_20253 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20230_20251,(1),null);
var b_20254 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20230_20251,(2),null);
var a_20255 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20230_20251,(3),null);
hoplon.app_pages._index_DOT_html.set_transform(ctx,x_20248,y_20249,cell_count,dimensions);

hoplon.app_pages._index_DOT_html.set_fill(ctx,r_20252,g_20253,b_20254,(a_20255 * opacity));

ctx.fillRect(-0.5,-0.5,(1),(1));

var G__20256 = seq__20218_20242;
var G__20257 = chunk__20220_20243;
var G__20258 = count__20221_20244;
var G__20259 = (i__20222_20245 + (1));
seq__20218_20242 = G__20256;
chunk__20220_20243 = G__20257;
count__20221_20244 = G__20258;
i__20222_20245 = G__20259;
continue;
} else {
var temp__6363__auto___20260 = cljs.core.seq(seq__20218_20242);
if(temp__6363__auto___20260){
var seq__20218_20261__$1 = temp__6363__auto___20260;
if(cljs.core.chunked_seq_QMARK_(seq__20218_20261__$1)){
var c__7922__auto___20262 = cljs.core.chunk_first(seq__20218_20261__$1);
var G__20263 = cljs.core.chunk_rest(seq__20218_20261__$1);
var G__20264 = c__7922__auto___20262;
var G__20265 = cljs.core.count(c__7922__auto___20262);
var G__20266 = (0);
seq__20218_20242 = G__20263;
chunk__20220_20243 = G__20264;
count__20221_20244 = G__20265;
i__20222_20245 = G__20266;
continue;
} else {
var vec__20233_20267 = cljs.core.first(seq__20218_20261__$1);
var vec__20236_20268 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20233_20267,(0),null);
var x_20269 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20236_20268,(0),null);
var y_20270 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20236_20268,(1),null);
var weather_20271 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20233_20267,(1),null);
var vec__20239_20272 = hoplon.app_pages._index_DOT_html.fill_color(display,weather_20271);
var r_20273 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20239_20272,(0),null);
var g_20274 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20239_20272,(1),null);
var b_20275 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20239_20272,(2),null);
var a_20276 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20239_20272,(3),null);
hoplon.app_pages._index_DOT_html.set_transform(ctx,x_20269,y_20270,cell_count,dimensions);

hoplon.app_pages._index_DOT_html.set_fill(ctx,r_20273,g_20274,b_20275,(a_20276 * opacity));

ctx.fillRect(-0.5,-0.5,(1),(1));

var G__20277 = cljs.core.next(seq__20218_20261__$1);
var G__20278 = null;
var G__20279 = (0);
var G__20280 = (0);
seq__20218_20242 = G__20277;
chunk__20220_20243 = G__20278;
count__20221_20244 = G__20279;
i__20222_20245 = G__20280;
continue;
}
} else {
}
}
break;
}

return ctx.restore();
} else {
return null;
}
});
/**
 * Draws the overlay layer
 */
hoplon.app_pages._index_DOT_html.draw_overlay = (function hoplon$app_pages$_index_DOT_html$draw_overlay(ctx,overlay,weather_data,cell_count,dimensions){
ctx.save();

(hoplon.app_pages._index_DOT_html.prep_overlay.cljs$core$IFn$_invoke$arity$2 ? hoplon.app_pages._index_DOT_html.prep_overlay.cljs$core$IFn$_invoke$arity$2(ctx,overlay) : hoplon.app_pages._index_DOT_html.prep_overlay.call(null,ctx,overlay));

ctx.beginPath();

var seq__20299_20317 = cljs.core.seq(weather_data);
var chunk__20301_20318 = null;
var count__20302_20319 = (0);
var i__20303_20320 = (0);
while(true){
if((i__20303_20320 < count__20302_20319)){
var vec__20305_20321 = chunk__20301_20318.cljs$core$IIndexed$_nth$arity$2(null,i__20303_20320);
var vec__20308_20322 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20305_20321,(0),null);
var x_20323 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20308_20322,(0),null);
var y_20324 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20308_20322,(1),null);
var weather_20325 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20305_20321,(1),null);
var weather_20326__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(weather_20325,cljs.core.cst$kw$x,x_20323,cljs.core.array_seq([cljs.core.cst$kw$y,y_20324], 0));
hoplon.app_pages._index_DOT_html.set_transform(ctx,x_20323,y_20324,cell_count,dimensions);

(hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IFn$_invoke$arity$3 ? hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IFn$_invoke$arity$3(ctx,overlay,weather_20326__$1) : hoplon.app_pages._index_DOT_html.stroke_overlay.call(null,ctx,overlay,weather_20326__$1));

var G__20327 = seq__20299_20317;
var G__20328 = chunk__20301_20318;
var G__20329 = count__20302_20319;
var G__20330 = (i__20303_20320 + (1));
seq__20299_20317 = G__20327;
chunk__20301_20318 = G__20328;
count__20302_20319 = G__20329;
i__20303_20320 = G__20330;
continue;
} else {
var temp__6363__auto___20331 = cljs.core.seq(seq__20299_20317);
if(temp__6363__auto___20331){
var seq__20299_20332__$1 = temp__6363__auto___20331;
if(cljs.core.chunked_seq_QMARK_(seq__20299_20332__$1)){
var c__7922__auto___20333 = cljs.core.chunk_first(seq__20299_20332__$1);
var G__20334 = cljs.core.chunk_rest(seq__20299_20332__$1);
var G__20335 = c__7922__auto___20333;
var G__20336 = cljs.core.count(c__7922__auto___20333);
var G__20337 = (0);
seq__20299_20317 = G__20334;
chunk__20301_20318 = G__20335;
count__20302_20319 = G__20336;
i__20303_20320 = G__20337;
continue;
} else {
var vec__20311_20338 = cljs.core.first(seq__20299_20332__$1);
var vec__20314_20339 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20311_20338,(0),null);
var x_20340 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20314_20339,(0),null);
var y_20341 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20314_20339,(1),null);
var weather_20342 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20311_20338,(1),null);
var weather_20343__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(weather_20342,cljs.core.cst$kw$x,x_20340,cljs.core.array_seq([cljs.core.cst$kw$y,y_20341], 0));
hoplon.app_pages._index_DOT_html.set_transform(ctx,x_20340,y_20341,cell_count,dimensions);

(hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IFn$_invoke$arity$3 ? hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IFn$_invoke$arity$3(ctx,overlay,weather_20343__$1) : hoplon.app_pages._index_DOT_html.stroke_overlay.call(null,ctx,overlay,weather_20343__$1));

var G__20344 = cljs.core.next(seq__20299_20332__$1);
var G__20345 = null;
var G__20346 = (0);
var G__20347 = (0);
seq__20299_20317 = G__20344;
chunk__20301_20318 = G__20345;
count__20302_20319 = G__20346;
i__20303_20320 = G__20347;
continue;
}
} else {
}
}
break;
}

ctx.stroke();

return ctx.restore();
});
/**
 * Draws a border around the currently selected cell
 */
hoplon.app_pages._index_DOT_html.draw_selected_cell = (function hoplon$app_pages$_index_DOT_html$draw_selected_cell(ctx,p__20348,cell_count,dimensions){
var vec__20352 = p__20348;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20352,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20352,(1),null);
if(cljs.core.truth_((function (){var and__7007__auto__ = x;
if(cljs.core.truth_(and__7007__auto__)){
return y;
} else {
return and__7007__auto__;
}
})())){
ctx.save();

hoplon.app_pages._index_DOT_html.set_transform(ctx,x,y,cell_count,dimensions);

ctx.setLineDash([0.2,0.12]);

ctx.lineWidth = "0.15";

ctx.lineDashOffset = (2);

ctx.fillStyle = "rgba(0,0,0,0.5)";

ctx.fillRect(-0.5,-0.5,(1),(1));

ctx.strokeRect(-0.5,-0.5,(1),(1));

return ctx.restore();
} else {
return null;
}
});
/**
 * Draws a border around the wind stability areas
 */
hoplon.app_pages._index_DOT_html.draw_wind_stability = (function hoplon$app_pages$_index_DOT_html$draw_wind_stability(ctx,areas,cell_count,dimensions){
var seq__20363 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$bounds,areas));
var chunk__20364 = null;
var count__20365 = (0);
var i__20366 = (0);
while(true){
if((i__20366 < count__20365)){
var map__20367 = chunk__20364.cljs$core$IIndexed$_nth$arity$2(null,i__20366);
var map__20367__$1 = ((((!((map__20367 == null)))?((((map__20367.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20367.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20367):map__20367);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20367__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20367__$1,cljs.core.cst$kw$y);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20367__$1,cljs.core.cst$kw$width);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20367__$1,cljs.core.cst$kw$height);
ctx.save();

hoplon.app_pages._index_DOT_html.set_transform(ctx,x,y,cell_count,dimensions);

ctx.setLineDash([0.5,0.5]);

ctx.lineWidth = "0.2";

ctx.lineDashOffset = (0);

ctx.strokeRect(-0.5,-0.5,width,height);

ctx.strokeStyle = "white";

ctx.lineDashOffset = 0.5;

ctx.strokeRect(-0.5,-0.5,width,height);

ctx.restore();

var G__20371 = seq__20363;
var G__20372 = chunk__20364;
var G__20373 = count__20365;
var G__20374 = (i__20366 + (1));
seq__20363 = G__20371;
chunk__20364 = G__20372;
count__20365 = G__20373;
i__20366 = G__20374;
continue;
} else {
var temp__6363__auto__ = cljs.core.seq(seq__20363);
if(temp__6363__auto__){
var seq__20363__$1 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20363__$1)){
var c__7922__auto__ = cljs.core.chunk_first(seq__20363__$1);
var G__20375 = cljs.core.chunk_rest(seq__20363__$1);
var G__20376 = c__7922__auto__;
var G__20377 = cljs.core.count(c__7922__auto__);
var G__20378 = (0);
seq__20363 = G__20375;
chunk__20364 = G__20376;
count__20365 = G__20377;
i__20366 = G__20378;
continue;
} else {
var map__20369 = cljs.core.first(seq__20363__$1);
var map__20369__$1 = ((((!((map__20369 == null)))?((((map__20369.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20369.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20369):map__20369);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20369__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20369__$1,cljs.core.cst$kw$y);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20369__$1,cljs.core.cst$kw$width);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20369__$1,cljs.core.cst$kw$height);
ctx.save();

hoplon.app_pages._index_DOT_html.set_transform(ctx,x,y,cell_count,dimensions);

ctx.setLineDash([0.5,0.5]);

ctx.lineWidth = "0.2";

ctx.lineDashOffset = (0);

ctx.strokeRect(-0.5,-0.5,width,height);

ctx.strokeStyle = "white";

ctx.lineDashOffset = 0.5;

ctx.strokeRect(-0.5,-0.5,width,height);

ctx.restore();

var G__20379 = cljs.core.next(seq__20363__$1);
var G__20380 = null;
var G__20381 = (0);
var G__20382 = (0);
seq__20363 = G__20379;
chunk__20364 = G__20380;
count__20365 = G__20381;
i__20366 = G__20382;
continue;
}
} else {
return null;
}
}
break;
}
});
hoplon.app_pages._index_DOT_html.draw_grid = (function hoplon$app_pages$_index_DOT_html$draw_grid(p__20383){
var map__20453 = p__20383;
var map__20453__$1 = ((((!((map__20453 == null)))?((((map__20453.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20453.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20453):map__20453);
var data = map__20453__$1;
var display_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20453__$1,cljs.core.cst$kw$display_DASH_params);
var cell_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20453__$1,cljs.core.cst$kw$cell_DASH_count);
var wind_stability_areas = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20453__$1,cljs.core.cst$kw$wind_DASH_stability_DASH_areas);
var weather_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20453__$1,cljs.core.cst$kw$weather_DASH_data);
var selected_cell = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20453__$1,cljs.core.cst$kw$selected_DASH_cell);
console.time("draw-grid");

var canvas_20522 = goog.dom.getElement("weather-grid");
var map__20455_20523 = display_params;
var map__20455_20524__$1 = ((((!((map__20455_20523 == null)))?((((map__20455_20523.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20455_20523.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20455_20523):map__20455_20523);
var map_20525 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20455_20524__$1,cljs.core.cst$kw$map);
var opacity_20526 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20455_20524__$1,cljs.core.cst$kw$opacity);
var dimensions_20527 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20455_20524__$1,cljs.core.cst$kw$dimensions);
var display_20528 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20455_20524__$1,cljs.core.cst$kw$display);
var overlay_20529 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20455_20524__$1,cljs.core.cst$kw$overlay);
var vec__20456_20530 = dimensions_20527;
var w_20531 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20456_20530,(0),null);
var h_20532 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20456_20530,(1),null);
if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(w_20531,canvas_20522.width))){
var ch_20533 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var c__16206__auto___20534 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___20534,ch_20533,canvas_20522,map__20455_20523,map__20455_20524__$1,map_20525,opacity_20526,dimensions_20527,display_20528,overlay_20529,vec__20456_20530,w_20531,h_20532,map__20453,map__20453__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___20534,ch_20533,canvas_20522,map__20455_20523,map__20455_20524__$1,map_20525,opacity_20526,dimensions_20527,display_20528,overlay_20529,vec__20456_20530,w_20531,h_20532,map__20453,map__20453__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function (state_20483){
var state_val_20484 = (state_20483[(1)]);
if((state_val_20484 === (7))){
var inst_20479 = (state_20483[(2)]);
var state_20483__$1 = state_20483;
var statearr_20485_20535 = state_20483__$1;
(statearr_20485_20535[(2)] = inst_20479);

(statearr_20485_20535[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20484 === (1))){
var inst_20460 = (200);
var state_20483__$1 = (function (){var statearr_20486 = state_20483;
(statearr_20486[(7)] = inst_20460);

return statearr_20486;
})();
var statearr_20487_20536 = state_20483__$1;
(statearr_20487_20536[(2)] = null);

(statearr_20487_20536[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20484 === (4))){
var inst_20460 = (state_20483[(7)]);
var inst_20464 = (state_20483[(2)]);
var inst_20465 = (inst_20460 > (0));
var state_20483__$1 = (function (){var statearr_20488 = state_20483;
(statearr_20488[(8)] = inst_20464);

return statearr_20488;
})();
if(cljs.core.truth_(inst_20465)){
var statearr_20489_20537 = state_20483__$1;
(statearr_20489_20537[(1)] = (5));

} else {
var statearr_20490_20538 = state_20483__$1;
(statearr_20490_20538[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_20484 === (6))){
var state_20483__$1 = state_20483;
var statearr_20491_20539 = state_20483__$1;
(statearr_20491_20539[(2)] = null);

(statearr_20491_20539[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20484 === (3))){
var inst_20481 = (state_20483[(2)]);
var state_20483__$1 = state_20483;
return cljs.core.async.impl.ioc_helpers.return_chan(state_20483__$1,inst_20481);
} else {
if((state_val_20484 === (2))){
var inst_20462 = cljs.core.async.timeout((10));
var state_20483__$1 = state_20483;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20483__$1,(4),inst_20462);
} else {
if((state_val_20484 === (9))){
var inst_20460 = (state_20483[(7)]);
var inst_20472 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Still waiting for canvas",cljs.core.cst$kw$n,inst_20460], 0));
var inst_20473 = (inst_20460 - (1));
var inst_20460__$1 = inst_20473;
var state_20483__$1 = (function (){var statearr_20492 = state_20483;
(statearr_20492[(9)] = inst_20472);

(statearr_20492[(7)] = inst_20460__$1);

return statearr_20492;
})();
var statearr_20493_20540 = state_20483__$1;
(statearr_20493_20540[(2)] = null);

(statearr_20493_20540[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20484 === (5))){
var inst_20467 = canvas_20522.width;
var inst_20468 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(w_20531,inst_20467);
var state_20483__$1 = state_20483;
if(inst_20468){
var statearr_20494_20541 = state_20483__$1;
(statearr_20494_20541[(1)] = (8));

} else {
var statearr_20495_20542 = state_20483__$1;
(statearr_20495_20542[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_20484 === (10))){
var inst_20476 = (state_20483[(2)]);
var state_20483__$1 = state_20483;
var statearr_20496_20543 = state_20483__$1;
(statearr_20496_20543[(2)] = inst_20476);

(statearr_20496_20543[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20484 === (8))){
var inst_20470 = hoplon$app_pages$_index_DOT_html$draw_grid(data);
var state_20483__$1 = state_20483;
var statearr_20497_20544 = state_20483__$1;
(statearr_20497_20544[(2)] = inst_20470);

(statearr_20497_20544[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});})(c__16206__auto___20534,ch_20533,canvas_20522,map__20455_20523,map__20455_20524__$1,map_20525,opacity_20526,dimensions_20527,display_20528,overlay_20529,vec__20456_20530,w_20531,h_20532,map__20453,map__20453__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
;
return ((function (switch__16090__auto__,c__16206__auto___20534,ch_20533,canvas_20522,map__20455_20523,map__20455_20524__$1,map_20525,opacity_20526,dimensions_20527,display_20528,overlay_20529,vec__20456_20530,w_20531,h_20532,map__20453,map__20453__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function() {
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__ = null;
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____0 = (function (){
var statearr_20501 = [null,null,null,null,null,null,null,null,null,null];
(statearr_20501[(0)] = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__);

(statearr_20501[(1)] = (1));

return statearr_20501;
});
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____1 = (function (state_20483){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_20483);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e20502){if((e20502 instanceof Object)){
var ex__16094__auto__ = e20502;
var statearr_20503_20545 = state_20483;
(statearr_20503_20545[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_20483);

return cljs.core.cst$kw$recur;
} else {
throw e20502;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__20546 = state_20483;
state_20483 = G__20546;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__ = function(state_20483){
switch(arguments.length){
case 0:
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____0.call(this);
case 1:
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____1.call(this,state_20483);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____0;
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____1;
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___20534,ch_20533,canvas_20522,map__20455_20523,map__20455_20524__$1,map_20525,opacity_20526,dimensions_20527,display_20528,overlay_20529,vec__20456_20530,w_20531,h_20532,map__20453,map__20453__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
})();
var state__16208__auto__ = (function (){var statearr_20504 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_20504[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___20534);

return statearr_20504;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___20534,ch_20533,canvas_20522,map__20455_20523,map__20455_20524__$1,map_20525,opacity_20526,dimensions_20527,display_20528,overlay_20529,vec__20456_20530,w_20531,h_20532,map__20453,map__20453__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
);

} else {
var ctx_20547 = canvas_20522.getContext("2d");
var vec__20505_20548 = cell_count;
var x_cells_20549 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20505_20548,(0),null);
var y_cells_20550 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20505_20548,(1),null);
var cell_width_20551 = (w_20531 / x_cells_20549);
var cell_height_20552 = (h_20532 / y_cells_20550);
hoplon.app_pages._index_DOT_html.clear_transform(ctx_20547);

ctx_20547.clearRect((0),(0),w_20531,h_20532);

var temp__6361__auto___20553 = hoplon.app_pages._index_DOT_html.draw_map(ctx_20547,map_20525,dimensions_20527);
if(cljs.core.truth_(temp__6361__auto___20553)){
var ch_20554 = temp__6361__auto___20553;
var c__16206__auto___20555 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___20555,ch_20554,temp__6361__auto___20553,ctx_20547,vec__20505_20548,x_cells_20549,y_cells_20550,cell_width_20551,cell_height_20552,canvas_20522,map__20455_20523,map__20455_20524__$1,map_20525,opacity_20526,dimensions_20527,display_20528,overlay_20529,vec__20456_20530,w_20531,h_20532,map__20453,map__20453__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___20555,ch_20554,temp__6361__auto___20553,ctx_20547,vec__20505_20548,x_cells_20549,y_cells_20550,cell_width_20551,cell_height_20552,canvas_20522,map__20455_20523,map__20455_20524__$1,map_20525,opacity_20526,dimensions_20527,display_20528,overlay_20529,vec__20456_20530,w_20531,h_20532,map__20453,map__20453__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function (state_20512){
var state_val_20513 = (state_20512[(1)]);
if((state_val_20513 === (1))){
var state_20512__$1 = state_20512;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20512__$1,(2),ch_20554);
} else {
if((state_val_20513 === (2))){
var inst_20509 = (state_20512[(2)]);
var inst_20510 = hoplon$app_pages$_index_DOT_html$draw_grid(data);
var state_20512__$1 = (function (){var statearr_20514 = state_20512;
(statearr_20514[(7)] = inst_20509);

return statearr_20514;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_20512__$1,inst_20510);
} else {
return null;
}
}
});})(c__16206__auto___20555,ch_20554,temp__6361__auto___20553,ctx_20547,vec__20505_20548,x_cells_20549,y_cells_20550,cell_width_20551,cell_height_20552,canvas_20522,map__20455_20523,map__20455_20524__$1,map_20525,opacity_20526,dimensions_20527,display_20528,overlay_20529,vec__20456_20530,w_20531,h_20532,map__20453,map__20453__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
;
return ((function (switch__16090__auto__,c__16206__auto___20555,ch_20554,temp__6361__auto___20553,ctx_20547,vec__20505_20548,x_cells_20549,y_cells_20550,cell_width_20551,cell_height_20552,canvas_20522,map__20455_20523,map__20455_20524__$1,map_20525,opacity_20526,dimensions_20527,display_20528,overlay_20529,vec__20456_20530,w_20531,h_20532,map__20453,map__20453__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function() {
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__ = null;
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____0 = (function (){
var statearr_20518 = [null,null,null,null,null,null,null,null];
(statearr_20518[(0)] = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__);

(statearr_20518[(1)] = (1));

return statearr_20518;
});
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____1 = (function (state_20512){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_20512);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e20519){if((e20519 instanceof Object)){
var ex__16094__auto__ = e20519;
var statearr_20520_20556 = state_20512;
(statearr_20520_20556[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_20512);

return cljs.core.cst$kw$recur;
} else {
throw e20519;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__20557 = state_20512;
state_20512 = G__20557;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__ = function(state_20512){
switch(arguments.length){
case 0:
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____0.call(this);
case 1:
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____1.call(this,state_20512);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____0;
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____1;
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___20555,ch_20554,temp__6361__auto___20553,ctx_20547,vec__20505_20548,x_cells_20549,y_cells_20550,cell_width_20551,cell_height_20552,canvas_20522,map__20455_20523,map__20455_20524__$1,map_20525,opacity_20526,dimensions_20527,display_20528,overlay_20529,vec__20456_20530,w_20531,h_20532,map__20453,map__20453__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
})();
var state__16208__auto__ = (function (){var statearr_20521 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_20521[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___20555);

return statearr_20521;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___20555,ch_20554,temp__6361__auto___20553,ctx_20547,vec__20505_20548,x_cells_20549,y_cells_20550,cell_width_20551,cell_height_20552,canvas_20522,map__20455_20523,map__20455_20524__$1,map_20525,opacity_20526,dimensions_20527,display_20528,overlay_20529,vec__20456_20530,w_20531,h_20532,map__20453,map__20453__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
);

} else {
hoplon.app_pages._index_DOT_html.draw_data(ctx_20547,display_20528,opacity_20526,weather_data,cell_count,dimensions_20527);

hoplon.app_pages._index_DOT_html.draw_overlay(ctx_20547,overlay_20529,weather_data,cell_count,dimensions_20527);

hoplon.app_pages._index_DOT_html.draw_selected_cell(ctx_20547,cljs.core.cst$kw$coordinates.cljs$core$IFn$_invoke$arity$1(selected_cell),cell_count,dimensions_20527);

hoplon.app_pages._index_DOT_html.draw_wind_stability(ctx_20547,wind_stability_areas,cell_count,dimensions_20527);
}
}

return console.timeEnd("draw-grid");
});
hoplon.app_pages._index_DOT_html.ESCAPE_KEY = (27);
hoplon.app_pages._index_DOT_html.ENTER_KEY = (13);
hoplon.app_pages._index_DOT_html.two_column = (function hoplon$app_pages$_index_DOT_html$two_column(left,right){
var G__20562 = cljs.core.cst$kw$class;
var G__20563 = "two-column";
var G__20564 = (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$class,"left-column",left) : hoplon.core.div.call(null,cljs.core.cst$kw$class,"left-column",left));
var G__20565 = (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$class,"right-column",right) : hoplon.core.div.call(null,cljs.core.cst$kw$class,"right-column",right));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__20562,G__20563,G__20564,G__20565) : hoplon.core.div.call(null,G__20562,G__20563,G__20564,G__20565));
});
hoplon.app_pages._index_DOT_html.edit_field = (function hoplon$app_pages$_index_DOT_html$edit_field(var_args){
var args20568 = [];
var len__8202__auto___20589 = arguments.length;
var i__8203__auto___20590 = (0);
while(true){
if((i__8203__auto___20590 < len__8202__auto___20589)){
args20568.push((arguments[i__8203__auto___20590]));

var G__20591 = (i__8203__auto___20590 + (1));
i__8203__auto___20590 = G__20591;
continue;
} else {
}
break;
}

var G__20570 = args20568.length;
switch (G__20570) {
case 2:
return hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args20568.length)].join('')));

}
});

hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2 = (function (c,path){
return hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3(c,path,cljs.core.PersistentArrayMap.EMPTY);
});

hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3 = (function (c,path,opts){
var map__20571 = opts;
var map__20571__$1 = ((((!((map__20571 == null)))?((((map__20571.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20571.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20571):map__20571);
var change_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20571__$1,cljs.core.cst$kw$change_DASH_fn);
var G__20576 = cljs.core.cst$kw$type;
var G__20577 = "text";
var G__20578 = cljs.core.cst$kw$value;
var G__20579 = javelin.core.formula(((function (G__20576,G__20577,G__20578,map__20571,map__20571__$1,change_fn){
return (function (G__20584,G__20583,G__20582){
return (G__20582.cljs$core$IFn$_invoke$arity$2 ? G__20582.cljs$core$IFn$_invoke$arity$2(G__20583,G__20584) : G__20582.call(null,G__20583,G__20584));
});})(G__20576,G__20577,G__20578,map__20571,map__20571__$1,change_fn))
).call(null,path,c,cljs.core.get_in);
var G__20580 = cljs.core.cst$kw$change;
var G__20581 = (cljs.core.truth_(change_fn)?((function (G__20576,G__20577,G__20578,G__20579,G__20580,map__20571,map__20571__$1,change_fn){
return (function (p1__20566_SHARP_){
var G__20586 = (function (){var G__20587 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__20566_SHARP_) : cljs.core.deref.call(null,p1__20566_SHARP_));
return Number(G__20587);
})();
return (change_fn.cljs$core$IFn$_invoke$arity$1 ? change_fn.cljs$core$IFn$_invoke$arity$1(G__20586) : change_fn.call(null,G__20586));
});})(G__20576,G__20577,G__20578,G__20579,G__20580,map__20571,map__20571__$1,change_fn))
:((function (G__20576,G__20577,G__20578,G__20579,G__20580,map__20571,map__20571__$1,change_fn){
return (function (p1__20567_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(c,cljs.core.assoc_in,path,(function (){var G__20588 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__20567_SHARP_) : cljs.core.deref.call(null,p1__20567_SHARP_));
return Number(G__20588);
})());
});})(G__20576,G__20577,G__20578,G__20579,G__20580,map__20571,map__20571__$1,change_fn))
);
return (hoplon.core.input.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.input.cljs$core$IFn$_invoke$arity$6(G__20576,G__20577,G__20578,G__20579,G__20580,G__20581) : hoplon.core.input.call(null,G__20576,G__20577,G__20578,G__20579,G__20580,G__20581));
});

hoplon.app_pages._index_DOT_html.edit_field.cljs$lang$maxFixedArity = 3;

hoplon.app_pages._index_DOT_html.time_entry = (function hoplon$app_pages$_index_DOT_html$time_entry(c,path){
var G__20615 = cljs.core.cst$kw$class;
var G__20616 = "time-params";
var G__20617 = (function (){var G__20620 = (function (){var G__20621 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__20615,G__20616){
return (function (p1__20593_SHARP_){
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$class,"time-entry-label",p1__20593_SHARP_) : hoplon.core.td.call(null,cljs.core.cst$kw$class,"time-entry-label",p1__20593_SHARP_));
});})(G__20615,G__20616))
,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Day","Hour","Minute"], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__20621) : hoplon.core.tr.call(null,G__20621));
})();
return (hoplon.core.thead.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.thead.cljs$core$IFn$_invoke$arity$1(G__20620) : hoplon.core.thead.call(null,G__20620));
})();
var G__20618 = (function (){var G__20625 = (function (){var G__20627 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__20615,G__20616,G__20617){
return (function (p1__20594_SHARP_){
var G__20628 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(c,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,p1__20594_SHARP_));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__20628) : hoplon.core.td.call(null,G__20628));
});})(G__20615,G__20616,G__20617))
,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$day,cljs.core.cst$kw$hour,cljs.core.cst$kw$minute], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__20627) : hoplon.core.tr.call(null,G__20627));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1(G__20625) : hoplon.core.tbody.call(null,G__20625));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$4(G__20615,G__20616,G__20617,G__20618) : hoplon.core.table.call(null,G__20615,G__20616,G__20617,G__20618));
});
hoplon.app_pages._index_DOT_html.button_bar = (function hoplon$app_pages$_index_DOT_html$button_bar(){
var G__20693 = cljs.core.cst$kw$class;
var G__20694 = "button-bar";
var G__20695 = (function (){var G__20701 = cljs.core.cst$kw$id;
var G__20702 = "enlarge-grid";
var G__20703 = cljs.core.cst$kw$click;
var G__20704 = ((function (G__20701,G__20702,G__20703,G__20693,G__20694){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.display_params,cljs.core.update,cljs.core.cst$kw$dimensions,((function (G__20701,G__20702,G__20703,G__20693,G__20694){
return (function (p__20708){
var vec__20709 = p__20708;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20709,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20709,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x + (50)),(y + (50))], null);
});})(G__20701,G__20702,G__20703,G__20693,G__20694))
);
});})(G__20701,G__20702,G__20703,G__20693,G__20694))
;
var G__20705 = cljs.core.cst$kw$title;
var G__20706 = "Enlarge grid";
var G__20707 = (hoplon.core.img.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$src,"images/bigger.png") : hoplon.core.img.call(null,cljs.core.cst$kw$src,"images/bigger.png"));
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$7 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$7(G__20701,G__20702,G__20703,G__20704,G__20705,G__20706,G__20707) : hoplon.core.button.call(null,G__20701,G__20702,G__20703,G__20704,G__20705,G__20706,G__20707));
})();
var G__20696 = (function (){var G__20716 = cljs.core.cst$kw$id;
var G__20717 = "shrink-grid";
var G__20718 = cljs.core.cst$kw$click;
var G__20719 = ((function (G__20716,G__20717,G__20718,G__20693,G__20694,G__20695){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.display_params,cljs.core.update,cljs.core.cst$kw$dimensions,((function (G__20716,G__20717,G__20718,G__20693,G__20694,G__20695){
return (function (p__20723){
var vec__20724 = p__20723;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20724,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20724,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x - (50)),(y - (50))], null);
});})(G__20716,G__20717,G__20718,G__20693,G__20694,G__20695))
);
});})(G__20716,G__20717,G__20718,G__20693,G__20694,G__20695))
;
var G__20720 = cljs.core.cst$kw$title;
var G__20721 = "Shrink grid";
var G__20722 = (hoplon.core.img.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$src,"images/smaller.png") : hoplon.core.img.call(null,cljs.core.cst$kw$src,"images/smaller.png"));
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$7 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$7(G__20716,G__20717,G__20718,G__20719,G__20720,G__20721,G__20722) : hoplon.core.button.call(null,G__20716,G__20717,G__20718,G__20719,G__20720,G__20721,G__20722));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__20693,G__20694,G__20695,G__20696) : hoplon.core.div.call(null,G__20693,G__20694,G__20695,G__20696));
});
hoplon.app_pages._index_DOT_html.weather_grid = (function hoplon$app_pages$_index_DOT_html$weather_grid(){
var vec__20865 = javelin.core.cell_map(cljs.core.identity,javelin.core.formula((function (p__20868){
var vec__20869 = p__20868;
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20869,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20869,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [width,height], null);
})).call(null,hoplon.app_pages._index_DOT_html.dimensions));
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20865,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20865,(1),null);
var vec__20872 = javelin.core.cell_map(cljs.core.identity,javelin.core.formula(((function (vec__20865,width,height){
return (function (p__20875){
var map__20876 = p__20875;
var map__20876__$1 = ((((!((map__20876 == null)))?((((map__20876.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20876.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20876):map__20876);
var map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20876__$1,cljs.core.cst$kw$map);
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [map], null);
});})(vec__20865,width,height))
).call(null,hoplon.app_pages._index_DOT_html.display_params));
var map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20872,(0),null);
var vec__20878 = javelin.core.cell_map(cljs.core.identity,javelin.core.formula(((function (vec__20872,map,vec__20865,width,height){
return (function (p__20881){
var vec__20882 = p__20881;
var nx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20882,(0),null);
var ny = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20882,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [nx,ny], null);
});})(vec__20872,map,vec__20865,width,height))
).call(null,hoplon.app_pages._index_DOT_html.cell_count));
var nx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20878,(0),null);
var ny = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20878,(1),null);
var G__20886 = cljs.core.cst$kw$id;
var G__20887 = "weather-grid-stack";
var G__20888 = cljs.core.cst$kw$width;
var G__20889 = javelin.core.formula(((function (G__20886,G__20887,G__20888,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (G__20895){
return G__20895;
});})(G__20886,G__20887,G__20888,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
).call(null,width);
var G__20890 = cljs.core.cst$kw$height;
var G__20891 = javelin.core.formula(((function (G__20886,G__20887,G__20888,G__20889,G__20890,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (G__20896){
return G__20896;
});})(G__20886,G__20887,G__20888,G__20889,G__20890,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
).call(null,height);
var G__20892 = (function (){var iter__7873__auto__ = ((function (G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function hoplon$app_pages$_index_DOT_html$weather_grid_$_iter__20897(s__20898){
return (new cljs.core.LazySeq(null,((function (G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (){
var s__20898__$1 = s__20898;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__20898__$1);
if(temp__6363__auto__){
var s__20898__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__20898__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__20898__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__20900 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__20899 = (0);
while(true){
if((i__20899 < size__7872__auto__)){
var vec__20939 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__20899);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20939,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20939,(1),null);
cljs.core.chunk_append(b__20900,(function (){var G__20942 = cljs.core.cst$kw$id;
var G__20943 = hoplon.app_pages._index_DOT_html.map_image_id(k);
var G__20944 = cljs.core.cst$kw$width;
var G__20945 = javelin.core.formula(((function (i__20899,G__20942,G__20943,G__20944,vec__20939,k,v,c__7871__auto__,size__7872__auto__,b__20900,s__20898__$2,temp__6363__auto__,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (G__20952){
return G__20952;
});})(i__20899,G__20942,G__20943,G__20944,vec__20939,k,v,c__7871__auto__,size__7872__auto__,b__20900,s__20898__$2,temp__6363__auto__,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
).call(null,width);
var G__20946 = cljs.core.cst$kw$height;
var G__20947 = javelin.core.formula(((function (i__20899,G__20942,G__20943,G__20944,G__20945,G__20946,vec__20939,k,v,c__7871__auto__,size__7872__auto__,b__20900,s__20898__$2,temp__6363__auto__,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (G__20953){
return G__20953;
});})(i__20899,G__20942,G__20943,G__20944,G__20945,G__20946,vec__20939,k,v,c__7871__auto__,size__7872__auto__,b__20900,s__20898__$2,temp__6363__auto__,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
).call(null,height);
var G__20948 = cljs.core.cst$kw$style;
var G__20949 = javelin.core.formula(((function (i__20899,G__20942,G__20943,G__20944,G__20945,G__20946,G__20947,G__20948,vec__20939,k,v,c__7871__auto__,size__7872__auto__,b__20900,s__20898__$2,temp__6363__auto__,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (G__20954,G__20956,G__20955){
if(cljs.core.truth_((G__20954.cljs$core$IFn$_invoke$arity$2 ? G__20954.cljs$core$IFn$_invoke$arity$2(G__20955,G__20956) : G__20954.call(null,G__20955,G__20956)))){
return "";
} else {
return "display: none";
}
});})(i__20899,G__20942,G__20943,G__20944,G__20945,G__20946,G__20947,G__20948,vec__20939,k,v,c__7871__auto__,size__7872__auto__,b__20900,s__20898__$2,temp__6363__auto__,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
).call(null,cljs.core._EQ_,map,k);
var G__20950 = cljs.core.cst$kw$src;
var G__20951 = v;
return (hoplon.core.img.cljs$core$IFn$_invoke$arity$10 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$10(G__20942,G__20943,G__20944,G__20945,G__20946,G__20947,G__20948,G__20949,G__20950,G__20951) : hoplon.core.img.call(null,G__20942,G__20943,G__20944,G__20945,G__20946,G__20947,G__20948,G__20949,G__20950,G__20951));
})());

var G__21002 = (i__20899 + (1));
i__20899 = G__21002;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__20900),hoplon$app_pages$_index_DOT_html$weather_grid_$_iter__20897(cljs.core.chunk_rest(s__20898__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__20900),null);
}
} else {
var vec__20957 = cljs.core.first(s__20898__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20957,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20957,(1),null);
return cljs.core.cons((function (){var G__20960 = cljs.core.cst$kw$id;
var G__20961 = hoplon.app_pages._index_DOT_html.map_image_id(k);
var G__20962 = cljs.core.cst$kw$width;
var G__20963 = javelin.core.formula(((function (G__20960,G__20961,G__20962,vec__20957,k,v,s__20898__$2,temp__6363__auto__,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (G__20970){
return G__20970;
});})(G__20960,G__20961,G__20962,vec__20957,k,v,s__20898__$2,temp__6363__auto__,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
).call(null,width);
var G__20964 = cljs.core.cst$kw$height;
var G__20965 = javelin.core.formula(((function (G__20960,G__20961,G__20962,G__20963,G__20964,vec__20957,k,v,s__20898__$2,temp__6363__auto__,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (G__20971){
return G__20971;
});})(G__20960,G__20961,G__20962,G__20963,G__20964,vec__20957,k,v,s__20898__$2,temp__6363__auto__,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
).call(null,height);
var G__20966 = cljs.core.cst$kw$style;
var G__20967 = javelin.core.formula(((function (G__20960,G__20961,G__20962,G__20963,G__20964,G__20965,G__20966,vec__20957,k,v,s__20898__$2,temp__6363__auto__,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (G__20972,G__20974,G__20973){
if(cljs.core.truth_((G__20972.cljs$core$IFn$_invoke$arity$2 ? G__20972.cljs$core$IFn$_invoke$arity$2(G__20973,G__20974) : G__20972.call(null,G__20973,G__20974)))){
return "";
} else {
return "display: none";
}
});})(G__20960,G__20961,G__20962,G__20963,G__20964,G__20965,G__20966,vec__20957,k,v,s__20898__$2,temp__6363__auto__,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
).call(null,cljs.core._EQ_,map,k);
var G__20968 = cljs.core.cst$kw$src;
var G__20969 = v;
return (hoplon.core.img.cljs$core$IFn$_invoke$arity$10 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$10(G__20960,G__20961,G__20962,G__20963,G__20964,G__20965,G__20966,G__20967,G__20968,G__20969) : hoplon.core.img.call(null,G__20960,G__20961,G__20962,G__20963,G__20964,G__20965,G__20966,G__20967,G__20968,G__20969));
})(),hoplon$app_pages$_index_DOT_html$weather_grid_$_iter__20897(cljs.core.rest(s__20898__$2)));
}
} else {
return null;
}
break;
}
});})(G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
,null,null));
});})(G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
;
return iter__7873__auto__(hoplon.app_pages._index_DOT_html.map_image);
})();
var G__20893 = (function (){var G__20976 = cljs.core.cst$kw$id;
var G__20977 = "blank-map";
var G__20978 = cljs.core.cst$kw$width;
var G__20979 = javelin.core.formula(((function (G__20976,G__20977,G__20978,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (G__20984){
return G__20984;
});})(G__20976,G__20977,G__20978,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
).call(null,width);
var G__20980 = cljs.core.cst$kw$height;
var G__20981 = javelin.core.formula(((function (G__20976,G__20977,G__20978,G__20979,G__20980,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (G__20985){
return G__20985;
});})(G__20976,G__20977,G__20978,G__20979,G__20980,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
).call(null,height);
var G__20982 = cljs.core.cst$kw$src;
var G__20983 = "images/blank.png";
return (hoplon.core.img.cljs$core$IFn$_invoke$arity$8 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$8(G__20976,G__20977,G__20978,G__20979,G__20980,G__20981,G__20982,G__20983) : hoplon.core.img.call(null,G__20976,G__20977,G__20978,G__20979,G__20980,G__20981,G__20982,G__20983));
})();
var G__20894 = (function (){var G__20988 = cljs.core.cst$kw$id;
var G__20989 = "weather-grid";
var G__20990 = cljs.core.cst$kw$css;
var G__20991 = javelin.core.formula(((function (G__20988,G__20989,G__20990,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,G__20893,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (G__20999){
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cursor,(function (){var G__20998 = (cljs.core.truth_((G__20999 instanceof cljs.core.Keyword))?G__20999.fqn:null);
switch (G__20998) {
case "select":
return "pointer";

break;
case "wind-stability":
return "crosshair";

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(G__20999)].join('')));

}
})()], null);
});})(G__20988,G__20989,G__20990,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,G__20893,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
).call(null,hoplon.app_pages._index_DOT_html.current_tool);
var G__20992 = cljs.core.cst$kw$width;
var G__20993 = javelin.core.formula(((function (G__20988,G__20989,G__20990,G__20991,G__20992,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,G__20893,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (G__21000){
return G__21000;
});})(G__20988,G__20989,G__20990,G__20991,G__20992,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,G__20893,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
).call(null,width);
var G__20994 = cljs.core.cst$kw$height;
var G__20995 = javelin.core.formula(((function (G__20988,G__20989,G__20990,G__20991,G__20992,G__20993,G__20994,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,G__20893,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (G__21001){
return G__21001;
});})(G__20988,G__20989,G__20990,G__20991,G__20992,G__20993,G__20994,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,G__20893,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
).call(null,height);
var G__20996 = cljs.core.cst$kw$click;
var G__20997 = ((function (G__20988,G__20989,G__20990,G__20991,G__20992,G__20993,G__20994,G__20995,G__20996,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,G__20893,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height){
return (function (p1__20727_SHARP_){
return hoplon.app_pages._index_DOT_html.grid_click(p1__20727_SHARP_,"weather-grid",(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.cell_count) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.cell_count)),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.dimensions) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.dimensions)));
});})(G__20988,G__20989,G__20990,G__20991,G__20992,G__20993,G__20994,G__20995,G__20996,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,G__20893,vec__20878,nx,ny,vec__20872,map,vec__20865,width,height))
;
return (hoplon.core.canvas.cljs$core$IFn$_invoke$arity$10 ? hoplon.core.canvas.cljs$core$IFn$_invoke$arity$10(G__20988,G__20989,G__20990,G__20991,G__20992,G__20993,G__20994,G__20995,G__20996,G__20997) : hoplon.core.canvas.call(null,G__20988,G__20989,G__20990,G__20991,G__20992,G__20993,G__20994,G__20995,G__20996,G__20997));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$9 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$9(G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,G__20893,G__20894) : hoplon.core.div.call(null,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,G__20893,G__20894));
});
hoplon.app_pages._index_DOT_html.display_controls = (function hoplon$app_pages$_index_DOT_html$display_controls(){
var select_row = (function (p__21332,help_path){
var map__21333 = p__21332;
var map__21333__$1 = ((((!((map__21333 == null)))?((((map__21333.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21333.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__21333):map__21333);
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21333__$1,cljs.core.cst$kw$label);
var k = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21333__$1,cljs.core.cst$kw$k);
var key__GT_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21333__$1,cljs.core.cst$kw$key_DASH__GT_name);
var name__GT_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21333__$1,cljs.core.cst$kw$name_DASH__GT_key);
var change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21333__$1,cljs.core.cst$kw$change);
var G__21335 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(label) : hoplon.core.td.call(null,label));
var G__21336 = (function (){var G__21447 = (function (){var G__21452 = cljs.core.cst$kw$change;
var G__21453 = (cljs.core.truth_(change)?((function (G__21452,G__21335,map__21333,map__21333__$1,label,k,key__GT_name,name__GT_key,change){
return (function (p1__21004_SHARP_){
var G__21456 = (function (){var G__21457 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__21004_SHARP_) : cljs.core.deref.call(null,p1__21004_SHARP_));
return (name__GT_key.cljs$core$IFn$_invoke$arity$1 ? name__GT_key.cljs$core$IFn$_invoke$arity$1(G__21457) : name__GT_key.call(null,G__21457));
})();
return (change.cljs$core$IFn$_invoke$arity$1 ? change.cljs$core$IFn$_invoke$arity$1(G__21456) : change.call(null,G__21456));
});})(G__21452,G__21335,map__21333,map__21333__$1,label,k,key__GT_name,name__GT_key,change))
:((function (G__21452,G__21335,map__21333,map__21333__$1,label,k,key__GT_name,name__GT_key,change){
return (function (p1__21005_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.display_params,cljs.core.assoc,k,(function (){var G__21458 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__21005_SHARP_) : cljs.core.deref.call(null,p1__21005_SHARP_));
return (name__GT_key.cljs$core$IFn$_invoke$arity$1 ? name__GT_key.cljs$core$IFn$_invoke$arity$1(G__21458) : name__GT_key.call(null,G__21458));
})());
});})(G__21452,G__21335,map__21333,map__21333__$1,label,k,key__GT_name,name__GT_key,change))
);
var G__21454 = (function (){var iter__7873__auto__ = ((function (G__21452,G__21453,G__21335,map__21333,map__21333__$1,label,k,key__GT_name,name__GT_key,change){
return (function hoplon$app_pages$_index_DOT_html$display_controls_$_iter__21459(s__21460){
return (new cljs.core.LazySeq(null,((function (G__21452,G__21453,G__21335,map__21333,map__21333__$1,label,k,key__GT_name,name__GT_key,change){
return (function (){
var s__21460__$1 = s__21460;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__21460__$1);
if(temp__6363__auto__){
var s__21460__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__21460__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__21460__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__21462 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__21461 = (0);
while(true){
if((i__21461 < size__7872__auto__)){
var name = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__21461);
cljs.core.chunk_append(b__21462,(function (){var G__21520 = cljs.core.cst$kw$value;
var G__21521 = name;
var G__21522 = cljs.core.cst$kw$selected;
var G__21523 = javelin.core.formula(((function (i__21461,G__21520,G__21521,G__21522,name,c__7871__auto__,size__7872__auto__,b__21462,s__21460__$2,temp__6363__auto__,G__21452,G__21453,G__21335,map__21333,map__21333__$1,label,k,key__GT_name,name__GT_key,change){
return (function (G__21525,G__21526,G__21529,G__21528,G__21527){
var G__21531 = (function (){var G__21533 = (G__21527.cljs$core$IFn$_invoke$arity$1 ? G__21527.cljs$core$IFn$_invoke$arity$1(G__21528) : G__21527.call(null,G__21528));
return (G__21526.cljs$core$IFn$_invoke$arity$1 ? G__21526.cljs$core$IFn$_invoke$arity$1(G__21533) : G__21526.call(null,G__21533));
})();
var G__21532 = G__21529;
return (G__21525.cljs$core$IFn$_invoke$arity$2 ? G__21525.cljs$core$IFn$_invoke$arity$2(G__21531,G__21532) : G__21525.call(null,G__21531,G__21532));
});})(i__21461,G__21520,G__21521,G__21522,name,c__7871__auto__,size__7872__auto__,b__21462,s__21460__$2,temp__6363__auto__,G__21452,G__21453,G__21335,map__21333,map__21333__$1,label,k,key__GT_name,name__GT_key,change))
).call(null,cljs.core._EQ_,key__GT_name,name,hoplon.app_pages._index_DOT_html.display_params,k);
var G__21524 = name;
return (hoplon.core.option.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.option.cljs$core$IFn$_invoke$arity$5(G__21520,G__21521,G__21522,G__21523,G__21524) : hoplon.core.option.call(null,G__21520,G__21521,G__21522,G__21523,G__21524));
})());

var G__21657 = (i__21461 + (1));
i__21461 = G__21657;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__21462),hoplon$app_pages$_index_DOT_html$display_controls_$_iter__21459(cljs.core.chunk_rest(s__21460__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__21462),null);
}
} else {
var name = cljs.core.first(s__21460__$2);
return cljs.core.cons((function (){var G__21543 = cljs.core.cst$kw$value;
var G__21544 = name;
var G__21545 = cljs.core.cst$kw$selected;
var G__21546 = javelin.core.formula(((function (G__21543,G__21544,G__21545,name,s__21460__$2,temp__6363__auto__,G__21452,G__21453,G__21335,map__21333,map__21333__$1,label,k,key__GT_name,name__GT_key,change){
return (function (G__21548,G__21549,G__21552,G__21551,G__21550){
var G__21554 = (function (){var G__21556 = (G__21550.cljs$core$IFn$_invoke$arity$1 ? G__21550.cljs$core$IFn$_invoke$arity$1(G__21551) : G__21550.call(null,G__21551));
return (G__21549.cljs$core$IFn$_invoke$arity$1 ? G__21549.cljs$core$IFn$_invoke$arity$1(G__21556) : G__21549.call(null,G__21556));
})();
var G__21555 = G__21552;
return (G__21548.cljs$core$IFn$_invoke$arity$2 ? G__21548.cljs$core$IFn$_invoke$arity$2(G__21554,G__21555) : G__21548.call(null,G__21554,G__21555));
});})(G__21543,G__21544,G__21545,name,s__21460__$2,temp__6363__auto__,G__21452,G__21453,G__21335,map__21333,map__21333__$1,label,k,key__GT_name,name__GT_key,change))
).call(null,cljs.core._EQ_,key__GT_name,name,hoplon.app_pages._index_DOT_html.display_params,k);
var G__21547 = name;
return (hoplon.core.option.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.option.cljs$core$IFn$_invoke$arity$5(G__21543,G__21544,G__21545,G__21546,G__21547) : hoplon.core.option.call(null,G__21543,G__21544,G__21545,G__21546,G__21547));
})(),hoplon$app_pages$_index_DOT_html$display_controls_$_iter__21459(cljs.core.rest(s__21460__$2)));
}
} else {
return null;
}
break;
}
});})(G__21452,G__21453,G__21335,map__21333,map__21333__$1,label,k,key__GT_name,name__GT_key,change))
,null,null));
});})(G__21452,G__21453,G__21335,map__21333,map__21333__$1,label,k,key__GT_name,name__GT_key,change))
;
return iter__7873__auto__(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.keys(name__GT_key),"None"));
})();
return (hoplon.core.select.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.select.cljs$core$IFn$_invoke$arity$3(G__21452,G__21453,G__21454) : hoplon.core.select.call(null,G__21452,G__21453,G__21454));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21447) : hoplon.core.td.call(null,G__21447));
})();
var G__21337 = (function (){var G__21557 = hoplon.app_pages._index_DOT_html.help_for(help_path);
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21557) : hoplon.core.td.call(null,G__21557));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__21335,G__21336,G__21337) : hoplon.core.tr.call(null,G__21335,G__21336,G__21337));
});
var G__21558 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Display controls") : hoplon.core.legend.call(null,"Display controls"));
var G__21559 = (function (){var G__21607 = cljs.core.cst$kw$class;
var G__21608 = "display-controls";
var G__21609 = (function (){var G__21633 = (function (){var G__21634 = select_row(new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$label,"Map",cljs.core.cst$kw$k,cljs.core.cst$kw$map,cljs.core.cst$kw$key_DASH__GT_name,hoplon.app_pages._index_DOT_html.map_key__GT_name,cljs.core.cst$kw$name_DASH__GT_key,hoplon.app_pages._index_DOT_html.map_name__GT_key,cljs.core.cst$kw$change,hoplon.app_pages._index_DOT_html.change_theater], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$display_DASH_controls,cljs.core.cst$kw$map], null));
var G__21635 = select_row(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$label,"Display",cljs.core.cst$kw$k,cljs.core.cst$kw$display,cljs.core.cst$kw$key_DASH__GT_name,hoplon.app_pages._index_DOT_html.display_key__GT_name,cljs.core.cst$kw$name_DASH__GT_key,hoplon.app_pages._index_DOT_html.display_name__GT_key], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$display_DASH_controls,cljs.core.cst$kw$display], null));
var G__21636 = select_row(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$label,"Overlay",cljs.core.cst$kw$k,cljs.core.cst$kw$overlay,cljs.core.cst$kw$key_DASH__GT_name,hoplon.app_pages._index_DOT_html.overlay_key__GT_name,cljs.core.cst$kw$name_DASH__GT_key,hoplon.app_pages._index_DOT_html.overlay_name__GT_key], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$display_DASH_controls,cljs.core.cst$kw$overlay], null));
var G__21637 = (function (){var G__21638 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("Opacity:") : hoplon.core.td.call(null,"Opacity:"));
var G__21639 = (function (){var G__21648 = (function (){var G__21652 = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$type,"range",cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,(100),cljs.core.cst$kw$value,javelin.core.formula(((function (G__21638,G__21634,G__21635,G__21636,G__21607,G__21608,G__21558,select_row){
return (function (G__21653,G__21654){
var G__21655 = (cljs.core.cst$kw$opacity.cljs$core$IFn$_invoke$arity$1(G__21654) * (100));
return (G__21653.cljs$core$IFn$_invoke$arity$1 ? G__21653.cljs$core$IFn$_invoke$arity$1(G__21655) : G__21653.call(null,G__21655));
});})(G__21638,G__21634,G__21635,G__21636,G__21607,G__21608,G__21558,select_row))
).call(null,cljs.core.long$,hoplon.app_pages._index_DOT_html.display_params),cljs.core.cst$kw$change,((function (G__21638,G__21634,G__21635,G__21636,G__21607,G__21608,G__21558,select_row){
return (function (p1__21006_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.display_params,cljs.core.assoc,cljs.core.cst$kw$opacity,((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__21006_SHARP_) : cljs.core.deref.call(null,p1__21006_SHARP_)) / 100.0));
});})(G__21638,G__21634,G__21635,G__21636,G__21607,G__21608,G__21558,select_row))
], null);
return (hoplon.core.input.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.input.cljs$core$IFn$_invoke$arity$1(G__21652) : hoplon.core.input.call(null,G__21652));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21648) : hoplon.core.td.call(null,G__21648));
})();
var G__21640 = (function (){var G__21656 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$display_DASH_controls,cljs.core.cst$kw$opacity], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21656) : hoplon.core.td.call(null,G__21656));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__21638,G__21639,G__21640) : hoplon.core.tr.call(null,G__21638,G__21639,G__21640));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$4(G__21634,G__21635,G__21636,G__21637) : hoplon.core.tbody.call(null,G__21634,G__21635,G__21636,G__21637));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$1(G__21633) : hoplon.core.table.call(null,G__21633));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__21607,G__21608,G__21609) : hoplon.core.div.call(null,G__21607,G__21608,G__21609));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2(G__21558,G__21559) : hoplon.core.fieldset.call(null,G__21558,G__21559));
});
hoplon.app_pages._index_DOT_html.weather_parameters = (function hoplon$app_pages$_index_DOT_html$weather_parameters(){
var G__21817 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Weather parameters") : hoplon.core.legend.call(null,"Weather parameters"));
var G__21818 = (function (){var G__21896 = cljs.core.cst$kw$id;
var G__21897 = "general-params";
var G__21898 = (function (){var G__21937 = (function (){var iter__7873__auto__ = ((function (G__21896,G__21897,G__21817){
return (function hoplon$app_pages$_index_DOT_html$weather_parameters_$_iter__21938(s__21939){
return (new cljs.core.LazySeq(null,((function (G__21896,G__21897,G__21817){
return (function (){
var s__21939__$1 = s__21939;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__21939__$1);
if(temp__6363__auto__){
var s__21939__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__21939__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__21939__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__21941 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__21940 = (0);
while(true){
if((i__21940 < size__7872__auto__)){
var vec__21960 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__21940);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21960,(0),null);
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21960,(1),null);
var updater = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21960,(2),null);
cljs.core.chunk_append(b__21941,(function (){var G__21963 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(label) : hoplon.core.td.call(null,label));
var G__21964 = (function (){var G__21966 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.weather_params,selector,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$change_DASH_fn,updater], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21966) : hoplon.core.td.call(null,G__21966));
})();
var G__21965 = (function (){var G__21967 = hoplon.app_pages._index_DOT_html.help_for(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params], null),selector));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21967) : hoplon.core.td.call(null,G__21967));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__21963,G__21964,G__21965) : hoplon.core.tr.call(null,G__21963,G__21964,G__21965));
})());

var G__21976 = (i__21940 + (1));
i__21940 = G__21976;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__21941),hoplon$app_pages$_index_DOT_html$weather_parameters_$_iter__21938(cljs.core.chunk_rest(s__21939__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__21941),null);
}
} else {
var vec__21968 = cljs.core.first(s__21939__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21968,(0),null);
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21968,(1),null);
var updater = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21968,(2),null);
return cljs.core.cons((function (){var G__21971 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(label) : hoplon.core.td.call(null,label));
var G__21972 = (function (){var G__21974 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.weather_params,selector,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$change_DASH_fn,updater], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21974) : hoplon.core.td.call(null,G__21974));
})();
var G__21973 = (function (){var G__21975 = hoplon.app_pages._index_DOT_html.help_for(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params], null),selector));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21975) : hoplon.core.td.call(null,G__21975));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__21971,G__21972,G__21973) : hoplon.core.tr.call(null,G__21971,G__21972,G__21973));
})(),hoplon$app_pages$_index_DOT_html$weather_parameters_$_iter__21938(cljs.core.rest(s__21939__$2)));
}
} else {
return null;
}
break;
}
});})(G__21896,G__21897,G__21817))
,null,null));
});})(G__21896,G__21897,G__21817))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Seed",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$seed], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Crossfade",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$crossfade], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Zoom",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$feature_DASH_size], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Max pressure",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pressure,cljs.core.cst$kw$max], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Min pressure",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pressure,cljs.core.cst$kw$min], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Prevailing wind",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prevailing_DASH_wind,cljs.core.cst$kw$heading], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Wind uniformity",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_uniformity], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Temp uniformity",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$temp_DASH_uniformity], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Warp strength",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$turbulence,cljs.core.cst$kw$power], null)], null)], null));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1(G__21937) : hoplon.core.tbody.call(null,G__21937));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$3(G__21896,G__21897,G__21898) : hoplon.core.table.call(null,G__21896,G__21897,G__21898));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2(G__21817,G__21818) : hoplon.core.fieldset.call(null,G__21817,G__21818));
});
var indexed_wind_stability_areas_22220 = javelin.core.formula((function (G__21979,G__21977,G__21978){
var G__21980 = G__21978;
var G__21981 = cljs.core.cst$kw$wind_DASH_stability_DASH_areas.cljs$core$IFn$_invoke$arity$1(G__21979);
return (G__21977.cljs$core$IFn$_invoke$arity$2 ? G__21977.cljs$core$IFn$_invoke$arity$2(G__21980,G__21981) : G__21977.call(null,G__21980,G__21981));
})).call(null,hoplon.app_pages._index_DOT_html.weather_params,cljs.core.map_indexed,cljs.core.vector);
hoplon.app_pages._index_DOT_html.wind_stability_parameters = ((function (indexed_wind_stability_areas_22220){
return (function hoplon$app_pages$_index_DOT_html$wind_stability_parameters(){
var G__22103 = (function (){var G__22106 = "Wind stability regions";
var G__22107 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas], null));
return (hoplon.core.legend.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$2(G__22106,G__22107) : hoplon.core.legend.call(null,G__22106,G__22107));
})();
var G__22104 = hoplon.core.loop_tpl_STAR_(indexed_wind_stability_areas_22220,((function (G__22103,indexed_wind_stability_areas_22220){
return (function (item__13999__auto__){
var vec__22108 = javelin.core.cell_map(cljs.core.identity,javelin.core.formula(((function (G__22103,indexed_wind_stability_areas_22220){
return (function (p__22111){
var vec__22112 = p__22111;
var index = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22112,(0),null);
var area = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22112,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [index,area], null);
});})(G__22103,indexed_wind_stability_areas_22220))
).call(null,item__13999__auto__));
var index = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22108,(0),null);
var area = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22108,(1),null);
var G__22162 = cljs.core.cst$kw$class;
var G__22163 = "wind-stability-params";
var G__22164 = (function (){var G__22190 = (function (){var G__22196 = (function (){var G__22199 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("NW corner") : hoplon.core.td.call(null,"NW corner"));
var G__22200 = (function (){var G__22202 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$bounds,cljs.core.cst$kw$x], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22202) : hoplon.core.td.call(null,G__22202));
})();
var G__22201 = (function (){var G__22203 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$bounds,cljs.core.cst$kw$y], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22203) : hoplon.core.td.call(null,G__22203));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__22199,G__22200,G__22201) : hoplon.core.tr.call(null,G__22199,G__22200,G__22201));
})();
var G__22197 = (function (){var G__22204 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("Width/height") : hoplon.core.td.call(null,"Width/height"));
var G__22205 = (function (){var G__22207 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$bounds,cljs.core.cst$kw$width], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22207) : hoplon.core.td.call(null,G__22207));
})();
var G__22206 = (function (){var G__22208 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$bounds,cljs.core.cst$kw$height], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22208) : hoplon.core.td.call(null,G__22208));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__22204,G__22205,G__22206) : hoplon.core.tr.call(null,G__22204,G__22205,G__22206));
})();
var G__22198 = (function (){var G__22209 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("Wind spd/hdg") : hoplon.core.td.call(null,"Wind spd/hdg"));
var G__22210 = (function (){var G__22212 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$wind,cljs.core.cst$kw$speed], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22212) : hoplon.core.td.call(null,G__22212));
})();
var G__22211 = (function (){var G__22213 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$wind,cljs.core.cst$kw$heading], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22213) : hoplon.core.td.call(null,G__22213));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__22209,G__22210,G__22211) : hoplon.core.tr.call(null,G__22209,G__22210,G__22211));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$3(G__22196,G__22197,G__22198) : hoplon.core.tbody.call(null,G__22196,G__22197,G__22198));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$1(G__22190) : hoplon.core.table.call(null,G__22190));
})();
var G__22165 = (function (){var G__22214 = cljs.core.cst$kw$click;
var G__22215 = ((function (G__22214,G__22162,G__22163,G__22164,vec__22108,index,area,G__22103,indexed_wind_stability_areas_22220){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.weather_params,cljs.core.update,cljs.core.cst$kw$wind_DASH_stability_DASH_areas,((function (G__22214,G__22162,G__22163,G__22164,vec__22108,index,area,G__22103,indexed_wind_stability_areas_22220){
return (function (areas){
return hoplon.app_pages._index_DOT_html.remove_nth(areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)));
});})(G__22214,G__22162,G__22163,G__22164,vec__22108,index,area,G__22103,indexed_wind_stability_areas_22220))
);
});})(G__22214,G__22162,G__22163,G__22164,vec__22108,index,area,G__22103,indexed_wind_stability_areas_22220))
;
var G__22216 = "Remove";
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(G__22214,G__22215,G__22216) : hoplon.core.button.call(null,G__22214,G__22215,G__22216));
})();
var G__22166 = (hoplon.core.hr.cljs$core$IFn$_invoke$arity$0 ? hoplon.core.hr.cljs$core$IFn$_invoke$arity$0() : hoplon.core.hr.call(null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$5(G__22162,G__22163,G__22164,G__22165,G__22166) : hoplon.core.div.call(null,G__22162,G__22163,G__22164,G__22165,G__22166));
});})(G__22103,indexed_wind_stability_areas_22220))
);
var G__22105 = (function (){var G__22217 = cljs.core.cst$kw$click;
var G__22218 = ((function (G__22217,G__22103,G__22104,indexed_wind_stability_areas_22220){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.weather_params,cljs.core.update,cljs.core.cst$kw$wind_DASH_stability_DASH_areas,((function (G__22217,G__22103,G__22104,indexed_wind_stability_areas_22220){
return (function (areas){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(areas,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$bounds,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$width,(10),cljs.core.cst$kw$height,(10)], null),cljs.core.cst$kw$wind,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$heading,(45),cljs.core.cst$kw$speed,(5)], null),cljs.core.cst$kw$index,cljs.core.count(areas)], null));
});})(G__22217,G__22103,G__22104,indexed_wind_stability_areas_22220))
);
});})(G__22217,G__22103,G__22104,indexed_wind_stability_areas_22220))
;
var G__22219 = "Add New";
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(G__22217,G__22218,G__22219) : hoplon.core.button.call(null,G__22217,G__22218,G__22219));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$3(G__22103,G__22104,G__22105) : hoplon.core.fieldset.call(null,G__22103,G__22104,G__22105));
});})(indexed_wind_stability_areas_22220))
;
hoplon.app_pages._index_DOT_html.weather_type_configuration = (function hoplon$app_pages$_index_DOT_html$weather_type_configuration(){
var G__22975 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Weather type configuration") : hoplon.core.legend.call(null,"Weather type configuration"));
var G__22976 = (function (){var G__23004 = cljs.core.cst$kw$id;
var G__23005 = "category-params";
var G__23006 = (function (){var G__23020 = (function (){var G__23022 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("") : hoplon.core.td.call(null,""));
var G__23023 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("") : hoplon.core.td.call(null,""));
var G__23024 = (function (){var G__23026 = cljs.core.cst$kw$colspan;
var G__23027 = (3);
var G__23028 = "Wind";
var G__23029 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_type_DASH_config,cljs.core.cst$kw$wind], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$4(G__23026,G__23027,G__23028,G__23029) : hoplon.core.td.call(null,G__23026,G__23027,G__23028,G__23029));
})();
var G__23025 = (function (){var G__23030 = cljs.core.cst$kw$colspan;
var G__23031 = (3);
var G__23032 = "Temperature";
var G__23033 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_type_DASH_config,cljs.core.cst$kw$temp], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$4(G__23030,G__23031,G__23032,G__23033) : hoplon.core.td.call(null,G__23030,G__23031,G__23032,G__23033));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$4(G__23022,G__23023,G__23024,G__23025) : hoplon.core.tr.call(null,G__23022,G__23023,G__23024,G__23025));
})();
var G__23021 = (function (){var G__23034 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__23020,G__23004,G__23005,G__22975){
return (function (p1__22221_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,p1__22221_SHARP_);
});})(G__23020,G__23004,G__23005,G__22975))
,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, ["",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class,"weight","Weight",hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_type_DASH_config,cljs.core.cst$kw$weight], null))], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Min"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Mean"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Max"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Min"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Mean"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Max"], null)], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23034) : hoplon.core.tr.call(null,G__23034));
})();
return (hoplon.core.thead.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.thead.cljs$core$IFn$_invoke$arity$2(G__23020,G__23021) : hoplon.core.thead.call(null,G__23020,G__23021));
})();
var G__23007 = (function (){var G__23381 = (function (){var iter__7873__auto__ = ((function (G__23004,G__23005,G__23006,G__22975){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23382(s__23383){
return (new cljs.core.LazySeq(null,((function (G__23004,G__23005,G__23006,G__22975){
return (function (){
var s__23383__$1 = s__23383;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__23383__$1);
if(temp__6363__auto__){
var s__23383__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23383__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__23383__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__23385 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__23384 = (0);
while(true){
if((i__23384 < size__7872__auto__)){
var category = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__23384);
cljs.core.chunk_append(b__23385,(function (){var G__23566 = (function (){var G__23569 = cljs.core.cst$kw$class;
var G__23570 = [cljs.core.str("weather-type "),cljs.core.str(cljs.core.name(category))].join('');
var G__23571 = cljs.core.cst$kw$css;
var G__23572 = new cljs.core.PersistentArrayMap(null, 1, ["background-color",(function (){var vec__23574 = (hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1(category) : hoplon.app_pages._index_DOT_html.weather_color.call(null,category));
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23574,(0),null);
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23574,(1),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23574,(2),null);
return [cljs.core.str("rgb("),cljs.core.str(r),cljs.core.str(","),cljs.core.str(g),cljs.core.str(","),cljs.core.str(b),cljs.core.str(")")].join('');
})()], null);
var G__23573 = (hoplon.app_pages._index_DOT_html.type_key__GT_name.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.type_key__GT_name.cljs$core$IFn$_invoke$arity$1(category) : hoplon.app_pages._index_DOT_html.type_key__GT_name.call(null,category));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$5(G__23569,G__23570,G__23571,G__23572,G__23573) : hoplon.core.td.call(null,G__23569,G__23570,G__23571,G__23572,G__23573));
})();
var G__23567 = (function (){var G__23580 = (function (){var G__23581 = cljs.core.cst$kw$class;
var G__23582 = "edit-field";
var G__23583 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,cljs.core.cst$kw$weight], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23581,G__23582,G__23583) : hoplon.core.div.call(null,G__23581,G__23582,G__23583));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__23580) : hoplon.core.td.call(null,G__23580));
})();
var G__23568 = (function (){var iter__7873__auto__ = ((function (i__23384,G__23566,G__23567,category,c__7871__auto__,size__7872__auto__,b__23385,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23382_$_iter__23584(s__23585){
return (new cljs.core.LazySeq(null,((function (i__23384,G__23566,G__23567,category,c__7871__auto__,size__7872__auto__,b__23385,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975){
return (function (){
var s__23585__$1 = s__23585;
while(true){
var temp__6363__auto____$1 = cljs.core.seq(s__23585__$1);
if(temp__6363__auto____$1){
var xs__6915__auto__ = temp__6363__auto____$1;
var param = cljs.core.first(xs__6915__auto__);
var iterys__7869__auto__ = ((function (s__23585__$1,i__23384,param,xs__6915__auto__,temp__6363__auto____$1,G__23566,G__23567,category,c__7871__auto__,size__7872__auto__,b__23385,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23382_$_iter__23584_$_iter__23586(s__23587){
return (new cljs.core.LazySeq(null,((function (s__23585__$1,i__23384,param,xs__6915__auto__,temp__6363__auto____$1,G__23566,G__23567,category,c__7871__auto__,size__7872__auto__,b__23385,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975){
return (function (){
var s__23587__$1 = s__23587;
while(true){
var temp__6363__auto____$2 = cljs.core.seq(s__23587__$1);
if(temp__6363__auto____$2){
var s__23587__$2 = temp__6363__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__23587__$2)){
var c__7871__auto____$1 = cljs.core.chunk_first(s__23587__$2);
var size__7872__auto____$1 = cljs.core.count(c__7871__auto____$1);
var b__23589 = cljs.core.chunk_buffer(size__7872__auto____$1);
if((function (){var i__23588 = (0);
while(true){
if((i__23588 < size__7872__auto____$1)){
var metric = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto____$1,i__23588);
cljs.core.chunk_append(b__23589,(function (){var G__23631 = cljs.core.cst$kw$class;
var G__23632 = [cljs.core.str(cljs.core.name(param)),cljs.core.str(" "),cljs.core.str(cljs.core.name(metric))].join('');
var G__23633 = (function (){var G__23634 = cljs.core.cst$kw$class;
var G__23635 = "edit-field";
var G__23636 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,param,metric], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23634,G__23635,G__23636) : hoplon.core.div.call(null,G__23634,G__23635,G__23636));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(G__23631,G__23632,G__23633) : hoplon.core.td.call(null,G__23631,G__23632,G__23633));
})());

var G__23728 = (i__23588 + (1));
i__23588 = G__23728;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23589),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23382_$_iter__23584_$_iter__23586(cljs.core.chunk_rest(s__23587__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23589),null);
}
} else {
var metric = cljs.core.first(s__23587__$2);
return cljs.core.cons((function (){var G__23637 = cljs.core.cst$kw$class;
var G__23638 = [cljs.core.str(cljs.core.name(param)),cljs.core.str(" "),cljs.core.str(cljs.core.name(metric))].join('');
var G__23639 = (function (){var G__23640 = cljs.core.cst$kw$class;
var G__23641 = "edit-field";
var G__23642 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,param,metric], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23640,G__23641,G__23642) : hoplon.core.div.call(null,G__23640,G__23641,G__23642));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(G__23637,G__23638,G__23639) : hoplon.core.td.call(null,G__23637,G__23638,G__23639));
})(),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23382_$_iter__23584_$_iter__23586(cljs.core.rest(s__23587__$2)));
}
} else {
return null;
}
break;
}
});})(s__23585__$1,i__23384,param,xs__6915__auto__,temp__6363__auto____$1,G__23566,G__23567,category,c__7871__auto__,size__7872__auto__,b__23385,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975))
,null,null));
});})(s__23585__$1,i__23384,param,xs__6915__auto__,temp__6363__auto____$1,G__23566,G__23567,category,c__7871__auto__,size__7872__auto__,b__23385,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975))
;
var fs__7870__auto__ = cljs.core.seq(iterys__7869__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$min,cljs.core.cst$kw$mean,cljs.core.cst$kw$max], null)));
if(fs__7870__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__7870__auto__,hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23382_$_iter__23584(cljs.core.rest(s__23585__$1)));
} else {
var G__23729 = cljs.core.rest(s__23585__$1);
s__23585__$1 = G__23729;
continue;
}
} else {
return null;
}
break;
}
});})(i__23384,G__23566,G__23567,category,c__7871__auto__,size__7872__auto__,b__23385,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975))
,null,null));
});})(i__23384,G__23566,G__23567,category,c__7871__auto__,size__7872__auto__,b__23385,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind,cljs.core.cst$kw$temp], null));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__23566,G__23567,G__23568) : hoplon.core.tr.call(null,G__23566,G__23567,G__23568));
})());

var G__23730 = (i__23384 + (1));
i__23384 = G__23730;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23385),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23382(cljs.core.chunk_rest(s__23383__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23385),null);
}
} else {
var category = cljs.core.first(s__23383__$2);
return cljs.core.cons((function (){var G__23651 = (function (){var G__23654 = cljs.core.cst$kw$class;
var G__23655 = [cljs.core.str("weather-type "),cljs.core.str(cljs.core.name(category))].join('');
var G__23656 = cljs.core.cst$kw$css;
var G__23657 = new cljs.core.PersistentArrayMap(null, 1, ["background-color",(function (){var vec__23659 = (hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1(category) : hoplon.app_pages._index_DOT_html.weather_color.call(null,category));
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23659,(0),null);
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23659,(1),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23659,(2),null);
return [cljs.core.str("rgb("),cljs.core.str(r),cljs.core.str(","),cljs.core.str(g),cljs.core.str(","),cljs.core.str(b),cljs.core.str(")")].join('');
})()], null);
var G__23658 = (hoplon.app_pages._index_DOT_html.type_key__GT_name.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.type_key__GT_name.cljs$core$IFn$_invoke$arity$1(category) : hoplon.app_pages._index_DOT_html.type_key__GT_name.call(null,category));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$5(G__23654,G__23655,G__23656,G__23657,G__23658) : hoplon.core.td.call(null,G__23654,G__23655,G__23656,G__23657,G__23658));
})();
var G__23652 = (function (){var G__23665 = (function (){var G__23666 = cljs.core.cst$kw$class;
var G__23667 = "edit-field";
var G__23668 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,cljs.core.cst$kw$weight], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23666,G__23667,G__23668) : hoplon.core.div.call(null,G__23666,G__23667,G__23668));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__23665) : hoplon.core.td.call(null,G__23665));
})();
var G__23653 = (function (){var iter__7873__auto__ = ((function (G__23651,G__23652,category,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23382_$_iter__23669(s__23670){
return (new cljs.core.LazySeq(null,((function (G__23651,G__23652,category,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975){
return (function (){
var s__23670__$1 = s__23670;
while(true){
var temp__6363__auto____$1 = cljs.core.seq(s__23670__$1);
if(temp__6363__auto____$1){
var xs__6915__auto__ = temp__6363__auto____$1;
var param = cljs.core.first(xs__6915__auto__);
var iterys__7869__auto__ = ((function (s__23670__$1,param,xs__6915__auto__,temp__6363__auto____$1,G__23651,G__23652,category,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23382_$_iter__23669_$_iter__23671(s__23672){
return (new cljs.core.LazySeq(null,((function (s__23670__$1,param,xs__6915__auto__,temp__6363__auto____$1,G__23651,G__23652,category,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975){
return (function (){
var s__23672__$1 = s__23672;
while(true){
var temp__6363__auto____$2 = cljs.core.seq(s__23672__$1);
if(temp__6363__auto____$2){
var s__23672__$2 = temp__6363__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__23672__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__23672__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__23674 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__23673 = (0);
while(true){
if((i__23673 < size__7872__auto__)){
var metric = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__23673);
cljs.core.chunk_append(b__23674,(function (){var G__23716 = cljs.core.cst$kw$class;
var G__23717 = [cljs.core.str(cljs.core.name(param)),cljs.core.str(" "),cljs.core.str(cljs.core.name(metric))].join('');
var G__23718 = (function (){var G__23719 = cljs.core.cst$kw$class;
var G__23720 = "edit-field";
var G__23721 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,param,metric], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23719,G__23720,G__23721) : hoplon.core.div.call(null,G__23719,G__23720,G__23721));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(G__23716,G__23717,G__23718) : hoplon.core.td.call(null,G__23716,G__23717,G__23718));
})());

var G__23731 = (i__23673 + (1));
i__23673 = G__23731;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23674),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23382_$_iter__23669_$_iter__23671(cljs.core.chunk_rest(s__23672__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23674),null);
}
} else {
var metric = cljs.core.first(s__23672__$2);
return cljs.core.cons((function (){var G__23722 = cljs.core.cst$kw$class;
var G__23723 = [cljs.core.str(cljs.core.name(param)),cljs.core.str(" "),cljs.core.str(cljs.core.name(metric))].join('');
var G__23724 = (function (){var G__23725 = cljs.core.cst$kw$class;
var G__23726 = "edit-field";
var G__23727 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,param,metric], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23725,G__23726,G__23727) : hoplon.core.div.call(null,G__23725,G__23726,G__23727));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(G__23722,G__23723,G__23724) : hoplon.core.td.call(null,G__23722,G__23723,G__23724));
})(),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23382_$_iter__23669_$_iter__23671(cljs.core.rest(s__23672__$2)));
}
} else {
return null;
}
break;
}
});})(s__23670__$1,param,xs__6915__auto__,temp__6363__auto____$1,G__23651,G__23652,category,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975))
,null,null));
});})(s__23670__$1,param,xs__6915__auto__,temp__6363__auto____$1,G__23651,G__23652,category,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975))
;
var fs__7870__auto__ = cljs.core.seq(iterys__7869__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$min,cljs.core.cst$kw$mean,cljs.core.cst$kw$max], null)));
if(fs__7870__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__7870__auto__,hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23382_$_iter__23669(cljs.core.rest(s__23670__$1)));
} else {
var G__23732 = cljs.core.rest(s__23670__$1);
s__23670__$1 = G__23732;
continue;
}
} else {
return null;
}
break;
}
});})(G__23651,G__23652,category,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975))
,null,null));
});})(G__23651,G__23652,category,s__23383__$2,temp__6363__auto__,G__23004,G__23005,G__23006,G__22975))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind,cljs.core.cst$kw$temp], null));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__23651,G__23652,G__23653) : hoplon.core.tr.call(null,G__23651,G__23652,G__23653));
})(),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23382(cljs.core.rest(s__23383__$2)));
}
} else {
return null;
}
break;
}
});})(G__23004,G__23005,G__23006,G__22975))
,null,null));
});})(G__23004,G__23005,G__23006,G__22975))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sunny,cljs.core.cst$kw$fair,cljs.core.cst$kw$poor,cljs.core.cst$kw$inclement], null));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1(G__23381) : hoplon.core.tbody.call(null,G__23381));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$4(G__23004,G__23005,G__23006,G__23007) : hoplon.core.table.call(null,G__23004,G__23005,G__23006,G__23007));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2(G__22975,G__22976) : hoplon.core.fieldset.call(null,G__22975,G__22976));
});
hoplon.app_pages._index_DOT_html.step_controls = (function hoplon$app_pages$_index_DOT_html$step_controls(){
var G__23818 = cljs.core.cst$kw$id;
var G__23819 = "time-location-params";
var G__23820 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Time/location controls") : hoplon.core.legend.call(null,"Time/location controls"));
var G__23821 = (function (){var G__23858 = (function (){var G__23860 = (function (){var G__23866 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["X Offset",hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$origin,(0)], null)),hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params,cljs.core.cst$kw$origin,cljs.core.cst$kw$x], null))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23866) : hoplon.core.tr.call(null,G__23866));
})();
var G__23861 = (function (){var G__23867 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Y Offset",hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$origin,(1)], null)),hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params,cljs.core.cst$kw$origin,cljs.core.cst$kw$y], null))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23867) : hoplon.core.tr.call(null,G__23867));
})();
var G__23862 = (function (){var G__23868 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["T Offset",hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time,cljs.core.cst$kw$offset], null)),hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params,cljs.core.cst$kw$time,cljs.core.cst$kw$offset], null))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23868) : hoplon.core.tr.call(null,G__23868));
})();
var G__23863 = (function (){var iter__7873__auto__ = ((function (G__23860,G__23861,G__23862,G__23818,G__23819,G__23820){
return (function hoplon$app_pages$_index_DOT_html$step_controls_$_iter__23869(s__23870){
return (new cljs.core.LazySeq(null,((function (G__23860,G__23861,G__23862,G__23818,G__23819,G__23820){
return (function (){
var s__23870__$1 = s__23870;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__23870__$1);
if(temp__6363__auto__){
var s__23870__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23870__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__23870__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__23872 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__23871 = (0);
while(true){
if((i__23871 < size__7872__auto__)){
var vec__23883 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__23871);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23883,(0),null);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23883,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23883,(2),null);
var help = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23883,(3),null);
cljs.core.chunk_append(b__23872,(function (){var G__23886 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [label,hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(c,path),hoplon.app_pages._index_DOT_html.help_for(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [help], null),path))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23886) : hoplon.core.tr.call(null,G__23886));
})());

var G__23903 = (i__23871 + (1));
i__23871 = G__23903;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23872),hoplon$app_pages$_index_DOT_html$step_controls_$_iter__23869(cljs.core.chunk_rest(s__23870__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23872),null);
}
} else {
var vec__23887 = cljs.core.first(s__23870__$2);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23887,(0),null);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23887,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23887,(2),null);
var help = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23887,(3),null);
return cljs.core.cons((function (){var G__23890 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [label,hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(c,path),hoplon.app_pages._index_DOT_html.help_for(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [help], null),path))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23890) : hoplon.core.tr.call(null,G__23890));
})(),hoplon$app_pages$_index_DOT_html$step_controls_$_iter__23869(cljs.core.rest(s__23870__$2)));
}
} else {
return null;
}
break;
}
});})(G__23860,G__23861,G__23862,G__23818,G__23819,G__23820))
,null,null));
});})(G__23860,G__23861,G__23862,G__23818,G__23819,G__23820))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [hoplon.app_pages._index_DOT_html.movement_params,"Weather heading",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$direction,cljs.core.cst$kw$heading], null),cljs.core.cst$kw$movement_DASH_params], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [hoplon.app_pages._index_DOT_html.movement_params,"Weather speed",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$direction,cljs.core.cst$kw$speed], null),cljs.core.cst$kw$movement_DASH_params], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [hoplon.app_pages._index_DOT_html.weather_params,"Evolution (min)",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$evolution], null),cljs.core.cst$kw$weather_DASH_params], null)], null));
})();
var G__23864 = (function (){var G__23891 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Time",hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$displayed_DASH_time], null))], null),hoplon.app_pages._index_DOT_html.time_entry(hoplon.app_pages._index_DOT_html.time_params,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$displayed], null)),(hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.jump_to_time,"Jump to") : hoplon.core.button.call(null,cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.jump_to_time,"Jump to")),(hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.set_time,"Set to") : hoplon.core.button.call(null,cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.set_time,"Set to"))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23891) : hoplon.core.tr.call(null,G__23891));
})();
var G__23865 = (function (){var G__23892 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Step interval",hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.movement_params,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$step], null)),hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$step], null))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23892) : hoplon.core.tr.call(null,G__23892));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$6(G__23860,G__23861,G__23862,G__23863,G__23864,G__23865) : hoplon.core.tbody.call(null,G__23860,G__23861,G__23862,G__23863,G__23864,G__23865));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$1(G__23858) : hoplon.core.table.call(null,G__23858));
})();
var G__23822 = (function (){var G__23893 = cljs.core.cst$kw$title;
var G__23894 = "Step back in time";
var G__23895 = cljs.core.cst$kw$click;
var G__23896 = ((function (G__23893,G__23894,G__23895,G__23818,G__23819,G__23820,G__23821){
return (function (){
return hoplon.app_pages._index_DOT_html.move((-1));
});})(G__23893,G__23894,G__23895,G__23818,G__23819,G__23820,G__23821))
;
var G__23897 = "<< Step Back";
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$5(G__23893,G__23894,G__23895,G__23896,G__23897) : hoplon.core.button.call(null,G__23893,G__23894,G__23895,G__23896,G__23897));
})();
var G__23823 = (function (){var G__23898 = cljs.core.cst$kw$title;
var G__23899 = "Step forward in time";
var G__23900 = cljs.core.cst$kw$click;
var G__23901 = ((function (G__23898,G__23899,G__23900,G__23818,G__23819,G__23820,G__23821,G__23822){
return (function (){
return hoplon.app_pages._index_DOT_html.move((1));
});})(G__23898,G__23899,G__23900,G__23818,G__23819,G__23820,G__23821,G__23822))
;
var G__23902 = "Step Forward >>";
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$5(G__23898,G__23899,G__23900,G__23901,G__23902) : hoplon.core.button.call(null,G__23898,G__23899,G__23900,G__23901,G__23902));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$6(G__23818,G__23819,G__23820,G__23821,G__23822,G__23823) : hoplon.core.fieldset.call(null,G__23818,G__23819,G__23820,G__23821,G__23822,G__23823));
});
hoplon.app_pages._index_DOT_html.weather_controls = (function hoplon$app_pages$_index_DOT_html$weather_controls(){
return hoplon.app_pages._index_DOT_html.two_column((function (){var G__23908 = hoplon.app_pages._index_DOT_html.weather_parameters();
var G__23909 = hoplon.app_pages._index_DOT_html.wind_stability_parameters();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$2(G__23908,G__23909) : hoplon.core.div.call(null,G__23908,G__23909));
})(),(function (){var G__23910 = hoplon.app_pages._index_DOT_html.weather_type_configuration();
var G__23911 = hoplon.app_pages._index_DOT_html.step_controls();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$2(G__23910,G__23911) : hoplon.core.div.call(null,G__23910,G__23911));
})());
});
hoplon.app_pages._index_DOT_html.serialization_controls = (function hoplon$app_pages$_index_DOT_html$serialization_controls(){
var G__23998 = cljs.core.cst$kw$id;
var G__23999 = "load-save-controls";
var G__24000 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Load/save") : hoplon.core.legend.call(null,"Load/save"));
var G__24001 = (function (){var G__24029 = cljs.core.cst$kw$class;
var G__24030 = "button-container";
var G__24031 = javelin.core.formula(((function (G__24029,G__24030,G__23998,G__23999,G__24000){
return (function (G__24037,G__24041,G__24038,G__24040,G__24042,G__24039,G__24036){
var t = (function (){var G__24043 = G__24037;
var G__24044 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time,cljs.core.cst$kw$current], null);
return (G__24036.cljs$core$IFn$_invoke$arity$2 ? G__24036.cljs$core$IFn$_invoke$arity$2(G__24043,G__24044) : G__24036.call(null,G__24043,G__24044));
})();
var vec__24033 = cljs.core.cst$kw$cell_DASH_count.cljs$core$IFn$_invoke$arity$1(G__24037);
var x_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24033,(0),null);
var y_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24033,(1),null);
var blob = (G__24038.cljs$core$IFn$_invoke$arity$3 ? G__24038.cljs$core$IFn$_invoke$arity$3(G__24039,x_cells,y_cells) : G__24038.call(null,G__24039,x_cells,y_cells));
var url = window.URL.createObjectURL(blob);
var download = (function (){var G__24045 = "%d%02d%02d.fmap";
var G__24046 = cljs.core.cst$kw$day.cljs$core$IFn$_invoke$arity$1(t);
var G__24047 = cljs.core.cst$kw$hour.cljs$core$IFn$_invoke$arity$1(t);
var G__24048 = cljs.core.cst$kw$minute.cljs$core$IFn$_invoke$arity$1(t);
return (G__24040.cljs$core$IFn$_invoke$arity$4 ? G__24040.cljs$core$IFn$_invoke$arity$4(G__24045,G__24046,G__24047,G__24048) : G__24040.call(null,G__24045,G__24046,G__24047,G__24048));
})();
var G__24049 = cljs.core.cst$kw$href;
var G__24050 = url;
var G__24051 = cljs.core.cst$kw$download;
var G__24052 = download;
var G__24053 = cljs.core.cst$kw$click;
var G__24054 = ((function (G__24049,G__24050,G__24051,G__24052,G__24053,t,vec__24033,x_cells,y_cells,blob,url,download,G__24029,G__24030,G__23998,G__23999,G__24000){
return (function (){
return (G__24042.cljs$core$IFn$_invoke$arity$1 ? G__24042.cljs$core$IFn$_invoke$arity$1((1)) : G__24042.call(null,(1)));
});})(G__24049,G__24050,G__24051,G__24052,G__24053,t,vec__24033,x_cells,y_cells,blob,url,download,G__24029,G__24030,G__23998,G__23999,G__24000))
;
var G__24055 = cljs.core.cst$kw$class;
var G__24056 = "button";
var G__24057 = "Save Current as FMAP";
return (G__24041.cljs$core$IFn$_invoke$arity$9 ? G__24041.cljs$core$IFn$_invoke$arity$9(G__24049,G__24050,G__24051,G__24052,G__24053,G__24054,G__24055,G__24056,G__24057) : G__24041.call(null,G__24049,G__24050,G__24051,G__24052,G__24053,G__24054,G__24055,G__24056,G__24057));
});})(G__24029,G__24030,G__23998,G__23999,G__24000))
).call(null,hoplon.app_pages._index_DOT_html.weather_params,hoplon.core.a,weathergen.fmap.get_blob,goog.string.format,hoplon.app_pages._index_DOT_html.move,hoplon.app_pages._index_DOT_html.weather_data,cljs.core.get_in);
var G__24032 = "(Steps forward in time)";
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__24029,G__24030,G__24031,G__24032) : hoplon.core.div.call(null,G__24029,G__24030,G__24031,G__24032));
})();
var G__24002 = (function (){var G__24068 = cljs.core.cst$kw$class;
var G__24069 = "button-container";
var G__24070 = javelin.core.formula(((function (G__24068,G__24069,G__23998,G__23999,G__24000,G__24001){
return (function (G__24073,G__24077,G__24076,G__24072,G__24075,G__24074,G__24071){
var blob = (new Blob((function (){var G__24079 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__24080 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$weather_DASH_params,G__24073,cljs.core.cst$kw$movement_DASH_params,G__24074,cljs.core.cst$kw$display_DASH_params,G__24075,cljs.core.cst$kw$revision,G__24076], null);
return (G__24072.cljs$core$IFn$_invoke$arity$1 ? G__24072.cljs$core$IFn$_invoke$arity$1(G__24080) : G__24072.call(null,G__24080));
})()], null);
return (G__24071.cljs$core$IFn$_invoke$arity$1 ? G__24071.cljs$core$IFn$_invoke$arity$1(G__24079) : G__24071.call(null,G__24079));
})(),{"type": "text/plain"}));
var url = window.URL.createObjectURL(blob);
return (G__24077.cljs$core$IFn$_invoke$arity$7 ? G__24077.cljs$core$IFn$_invoke$arity$7(cljs.core.cst$kw$href,url,cljs.core.cst$kw$download,"weathergen-settings.edn",cljs.core.cst$kw$class,"button","Save Settings") : G__24077.call(null,cljs.core.cst$kw$href,url,cljs.core.cst$kw$download,"weathergen-settings.edn",cljs.core.cst$kw$class,"button","Save Settings"));
});})(G__24068,G__24069,G__23998,G__23999,G__24000,G__24001))
).call(null,hoplon.app_pages._index_DOT_html.weather_params,hoplon.core.a,hoplon.app_pages._index_DOT_html.revision,cljs.core.pr_str,hoplon.app_pages._index_DOT_html.display_params,hoplon.app_pages._index_DOT_html.movement_params,cljs.core.clj__GT_js);
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__24068,G__24069,G__24070) : hoplon.core.div.call(null,G__24068,G__24069,G__24070));
})();
var G__24003 = (function (){var G__24081 = cljs.core.cst$kw$class;
var G__24082 = "button-container";
var G__24083 = (hoplon.core.button.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$5(cljs.core.cst$kw$class,"button",cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.load_settings,"Load Settings") : hoplon.core.button.call(null,cljs.core.cst$kw$class,"button",cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.load_settings,"Load Settings"));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__24081,G__24082,G__24083) : hoplon.core.div.call(null,G__24081,G__24082,G__24083));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$6(G__23998,G__23999,G__24000,G__24001,G__24002,G__24003) : hoplon.core.fieldset.call(null,G__23998,G__23999,G__24000,G__24001,G__24002,G__24003));
});
hoplon.app_pages._index_DOT_html.forecast_display = (function hoplon$app_pages$_index_DOT_html$forecast_display(){
var G__24842 = (function (){var G__24844 = "Forecast";
var G__24845 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$forecast], null));
return (hoplon.core.legend.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$2(G__24844,G__24845) : hoplon.core.legend.call(null,G__24844,G__24845));
})();
var G__24843 = (function (){var G__25219 = cljs.core.cst$kw$id;
var G__25220 = "forecast";
var G__25221 = javelin.core.formula(((function (G__25219,G__25220,G__24842){
return (function (G__25248,G__25243,G__25251,G__25244,G__25249,G__25254,G__25250,G__25247,G__25246,G__25255,G__25253,G__25252,G__25256,G__25240,G__25241,G__25245,G__25242,G__25257){
var vec__25222 = cljs.core.cst$kw$coordinates.cljs$core$IFn$_invoke$arity$1(G__25240);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__25222,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__25222,(1),null);
var G__25258 = (G__25242.cljs$core$IFn$_invoke$arity$3 ? G__25242.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$for,"locations","Forecast for:") : G__25242.call(null,cljs.core.cst$kw$for,"locations","Forecast for:"));
var G__25259 = (function (){var G__25262 = cljs.core.cst$kw$id;
var G__25263 = "locations";
var G__25264 = cljs.core.cst$kw$change;
var G__25265 = ((function (G__25262,G__25263,G__25264,G__25258,vec__25222,x,y,G__25219,G__25220,G__24842){
return (function (p1__24084_SHARP_){
var G__25268 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__24084_SHARP_) : cljs.core.deref.call(null,p1__24084_SHARP_));
return (G__25244.cljs$core$IFn$_invoke$arity$1 ? G__25244.cljs$core$IFn$_invoke$arity$1(G__25268) : G__25244.call(null,G__25268));
});})(G__25262,G__25263,G__25264,G__25258,vec__25222,x,y,G__25219,G__25220,G__24842))
;
var G__25266 = (function (){var G__25269 = cljs.core.cst$kw$selected;
var G__25270 = (G__25246.cljs$core$IFn$_invoke$arity$2 ? G__25246.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$named,G__25247) : G__25246.call(null,cljs.core.cst$kw$named,G__25247));
var G__25271 = cljs.core.cst$kw$value;
var G__25272 = "";
var G__25273 = (function (){var G__25225 = (cljs.core.truth_((G__25247 instanceof cljs.core.Keyword))?G__25247.fqn:null);
switch (G__25225) {
case "coordinates":
return [cljs.core.str("Cell "),cljs.core.str(x),cljs.core.str(","),cljs.core.str(y)].join('');

break;
case "named":
return "";

break;
case "none":
return "None selected";

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(G__25247)].join('')));

}
})();
return (G__25245.cljs$core$IFn$_invoke$arity$5 ? G__25245.cljs$core$IFn$_invoke$arity$5(G__25269,G__25270,G__25271,G__25272,G__25273) : G__25245.call(null,G__25269,G__25270,G__25271,G__25272,G__25273));
})();
var G__25267 = (function (){var iter__7873__auto__ = ((function (G__25262,G__25263,G__25264,G__25265,G__25266,G__25258,vec__25222,x,y,G__25219,G__25220,G__24842){
return (function hoplon$app_pages$_index_DOT_html$forecast_display_$_iter__25226(s__25227){
return (new cljs.core.LazySeq(null,((function (G__25262,G__25263,G__25264,G__25265,G__25266,G__25258,vec__25222,x,y,G__25219,G__25220,G__24842){
return (function (){
var s__25227__$1 = s__25227;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__25227__$1);
if(temp__6363__auto__){
var s__25227__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__25227__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__25227__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__25229 = cljs.core.chunk_buffer(size__7872__auto__);
if(cljs.core.truth_((function (){var i__25228 = (0);
while(true){
if(cljs.core.truth_((i__25228 < size__7872__auto__))){
var ab = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__25228);
cljs.core.chunk_append(b__25229,(function (){var G__25296 = cljs.core.cst$kw$value;
var G__25297 = ab;
var G__25298 = cljs.core.cst$kw$selected;
var G__25299 = (function (){var G__25301 = ab;
var G__25302 = cljs.core.cst$kw$location.cljs$core$IFn$_invoke$arity$1(G__25240);
return (G__25248.cljs$core$IFn$_invoke$arity$2 ? G__25248.cljs$core$IFn$_invoke$arity$2(G__25301,G__25302) : G__25248.call(null,G__25301,G__25302));
})();
var G__25300 = ab;
return (G__25245.cljs$core$IFn$_invoke$arity$5 ? G__25245.cljs$core$IFn$_invoke$arity$5(G__25296,G__25297,G__25298,G__25299,G__25300) : G__25245.call(null,G__25296,G__25297,G__25298,G__25299,G__25300));
})());

var G__25596 = (i__25228 + (1));
i__25228 = G__25596;
continue;
} else {
return true;
}
break;
}
})())){
return cljs.core.chunk_cons(cljs.core.chunk(b__25229),hoplon$app_pages$_index_DOT_html$forecast_display_$_iter__25226(cljs.core.chunk_rest(s__25227__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__25229),null);
}
} else {
var ab = cljs.core.first(s__25227__$2);
return cljs.core.cons((function (){var G__25305 = cljs.core.cst$kw$value;
var G__25306 = ab;
var G__25307 = cljs.core.cst$kw$selected;
var G__25308 = (function (){var G__25310 = ab;
var G__25311 = cljs.core.cst$kw$location.cljs$core$IFn$_invoke$arity$1(G__25240);
return (G__25248.cljs$core$IFn$_invoke$arity$2 ? G__25248.cljs$core$IFn$_invoke$arity$2(G__25310,G__25311) : G__25248.call(null,G__25310,G__25311));
})();
var G__25309 = ab;
return (G__25245.cljs$core$IFn$_invoke$arity$5 ? G__25245.cljs$core$IFn$_invoke$arity$5(G__25305,G__25306,G__25307,G__25308,G__25309) : G__25245.call(null,G__25305,G__25306,G__25307,G__25308,G__25309));
})(),hoplon$app_pages$_index_DOT_html$forecast_display_$_iter__25226(cljs.core.rest(s__25227__$2)));
}
} else {
return null;
}
break;
}
});})(G__25262,G__25263,G__25264,G__25265,G__25266,G__25258,vec__25222,x,y,G__25219,G__25220,G__24842))
,null,null));
});})(G__25262,G__25263,G__25264,G__25265,G__25266,G__25258,vec__25222,x,y,G__25219,G__25220,G__24842))
;
return iter__7873__auto__(G__25249);
})();
return (G__25243.cljs$core$IFn$_invoke$arity$6 ? G__25243.cljs$core$IFn$_invoke$arity$6(G__25262,G__25263,G__25264,G__25265,G__25266,G__25267) : G__25243.call(null,G__25262,G__25263,G__25264,G__25265,G__25266,G__25267));
})();
var G__25260 = (function (){var G__25325 = (function (){var G__25333 = (function (){var G__25334 = (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1("Day/Time") : G__25253.call(null,"Day/Time"));
var G__25335 = (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1("Weather Type") : G__25253.call(null,"Weather Type"));
var G__25336 = (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1("Pressure") : G__25253.call(null,"Pressure"));
var G__25337 = (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1("Temperature") : G__25253.call(null,"Temperature"));
var G__25338 = (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1("Wind Speed") : G__25253.call(null,"Wind Speed"));
var G__25339 = (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1("Wind Heading") : G__25253.call(null,"Wind Heading"));
return (G__25252.cljs$core$IFn$_invoke$arity$6 ? G__25252.cljs$core$IFn$_invoke$arity$6(G__25334,G__25335,G__25336,G__25337,G__25338,G__25339) : G__25252.call(null,G__25334,G__25335,G__25336,G__25337,G__25338,G__25339));
})();
return (G__25251.cljs$core$IFn$_invoke$arity$1 ? G__25251.cljs$core$IFn$_invoke$arity$1(G__25333) : G__25251.call(null,G__25333));
})();
var G__25326 = (function (){var G__25467 = ((cljs.core.not(G__25255))?(function (){var G__25468 = (G__25253.cljs$core$IFn$_invoke$arity$3 ? G__25253.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$colspan,(6),"No location is selected. Choose a location from the list, or click on the weather map to select one.") : G__25253.call(null,cljs.core.cst$kw$colspan,(6),"No location is selected. Choose a location from the list, or click on the weather map to select one."));
return (G__25252.cljs$core$IFn$_invoke$arity$1 ? G__25252.cljs$core$IFn$_invoke$arity$1(G__25468) : G__25252.call(null,G__25468));
})():(function (){var iter__7873__auto__ = ((function (G__25325,G__25258,G__25259,vec__25222,x,y,G__25219,G__25220,G__24842){
return (function hoplon$app_pages$_index_DOT_html$forecast_display_$_iter__25230(s__25231){
return (new cljs.core.LazySeq(null,((function (G__25325,G__25258,G__25259,vec__25222,x,y,G__25219,G__25220,G__24842){
return (function (){
var s__25231__$1 = s__25231;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__25231__$1);
if(temp__6363__auto__){
var s__25231__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__25231__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__25231__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__25233 = cljs.core.chunk_buffer(size__7872__auto__);
if(cljs.core.truth_((function (){var i__25232 = (0);
while(true){
if(cljs.core.truth_((i__25232 < size__7872__auto__))){
var vec__25234 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__25232);
var time = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__25234,(0),null);
var weather = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__25234,(1),null);
cljs.core.chunk_append(b__25233,(function (){var G__25542 = (function (){var G__25552 = (function (){var G__25553 = "%02d/%02d%02d";
var G__25554 = cljs.core.cst$kw$day.cljs$core$IFn$_invoke$arity$1(time);
var G__25555 = cljs.core.cst$kw$hour.cljs$core$IFn$_invoke$arity$1(time);
var G__25556 = cljs.core.cst$kw$minute.cljs$core$IFn$_invoke$arity$1(time);
return (G__25256.cljs$core$IFn$_invoke$arity$4 ? G__25256.cljs$core$IFn$_invoke$arity$4(G__25553,G__25554,G__25555,G__25556) : G__25256.call(null,G__25553,G__25554,G__25555,G__25556));
})();
return (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1(G__25552) : G__25253.call(null,G__25552));
})();
var G__25543 = (function (){var G__25558 = (function (){var G__25559 = cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(weather);
return (G__25257.cljs$core$IFn$_invoke$arity$1 ? G__25257.cljs$core$IFn$_invoke$arity$1(G__25559) : G__25257.call(null,G__25559));
})();
return (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1(G__25558) : G__25253.call(null,G__25558));
})();
var G__25544 = (function (){var G__25560 = cljs.core.cst$kw$pressure.cljs$core$IFn$_invoke$arity$1(weather).toFixed((2));
return (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1(G__25560) : G__25253.call(null,G__25560));
})();
var G__25545 = (function (){var G__25561 = cljs.core.cst$kw$temperature.cljs$core$IFn$_invoke$arity$1(weather).toFixed((1));
return (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1(G__25561) : G__25253.call(null,G__25561));
})();
var G__25546 = (function (){var G__25562 = cljs.core.cst$kw$speed.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather)).toFixed((0));
return (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1(G__25562) : G__25253.call(null,G__25562));
})();
var G__25547 = (function (){var G__25563 = cljs.core.cst$kw$heading.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather)).toFixed((0));
return (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1(G__25563) : G__25253.call(null,G__25563));
})();
return (G__25252.cljs$core$IFn$_invoke$arity$6 ? G__25252.cljs$core$IFn$_invoke$arity$6(G__25542,G__25543,G__25544,G__25545,G__25546,G__25547) : G__25252.call(null,G__25542,G__25543,G__25544,G__25545,G__25546,G__25547));
})());

var G__25597 = (i__25232 + (1));
i__25232 = G__25597;
continue;
} else {
return true;
}
break;
}
})())){
return cljs.core.chunk_cons(cljs.core.chunk(b__25233),hoplon$app_pages$_index_DOT_html$forecast_display_$_iter__25230(cljs.core.chunk_rest(s__25231__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__25233),null);
}
} else {
var vec__25237 = cljs.core.first(s__25231__$2);
var time = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__25237,(0),null);
var weather = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__25237,(1),null);
return cljs.core.cons((function (){var G__25573 = (function (){var G__25583 = (function (){var G__25584 = "%02d/%02d%02d";
var G__25585 = cljs.core.cst$kw$day.cljs$core$IFn$_invoke$arity$1(time);
var G__25586 = cljs.core.cst$kw$hour.cljs$core$IFn$_invoke$arity$1(time);
var G__25587 = cljs.core.cst$kw$minute.cljs$core$IFn$_invoke$arity$1(time);
return (G__25256.cljs$core$IFn$_invoke$arity$4 ? G__25256.cljs$core$IFn$_invoke$arity$4(G__25584,G__25585,G__25586,G__25587) : G__25256.call(null,G__25584,G__25585,G__25586,G__25587));
})();
return (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1(G__25583) : G__25253.call(null,G__25583));
})();
var G__25574 = (function (){var G__25589 = (function (){var G__25590 = cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(weather);
return (G__25257.cljs$core$IFn$_invoke$arity$1 ? G__25257.cljs$core$IFn$_invoke$arity$1(G__25590) : G__25257.call(null,G__25590));
})();
return (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1(G__25589) : G__25253.call(null,G__25589));
})();
var G__25575 = (function (){var G__25591 = cljs.core.cst$kw$pressure.cljs$core$IFn$_invoke$arity$1(weather).toFixed((2));
return (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1(G__25591) : G__25253.call(null,G__25591));
})();
var G__25576 = (function (){var G__25592 = cljs.core.cst$kw$temperature.cljs$core$IFn$_invoke$arity$1(weather).toFixed((1));
return (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1(G__25592) : G__25253.call(null,G__25592));
})();
var G__25577 = (function (){var G__25593 = cljs.core.cst$kw$speed.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather)).toFixed((0));
return (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1(G__25593) : G__25253.call(null,G__25593));
})();
var G__25578 = (function (){var G__25594 = cljs.core.cst$kw$heading.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather)).toFixed((0));
return (G__25253.cljs$core$IFn$_invoke$arity$1 ? G__25253.cljs$core$IFn$_invoke$arity$1(G__25594) : G__25253.call(null,G__25594));
})();
return (G__25252.cljs$core$IFn$_invoke$arity$6 ? G__25252.cljs$core$IFn$_invoke$arity$6(G__25573,G__25574,G__25575,G__25576,G__25577,G__25578) : G__25252.call(null,G__25573,G__25574,G__25575,G__25576,G__25577,G__25578));
})(),hoplon$app_pages$_index_DOT_html$forecast_display_$_iter__25230(cljs.core.rest(s__25231__$2)));
}
} else {
return null;
}
break;
}
});})(G__25325,G__25258,G__25259,vec__25222,x,y,G__25219,G__25220,G__24842))
,null,null));
});})(G__25325,G__25258,G__25259,vec__25222,x,y,G__25219,G__25220,G__24842))
;
return iter__7873__auto__(G__25255);
})());
return (G__25254.cljs$core$IFn$_invoke$arity$1 ? G__25254.cljs$core$IFn$_invoke$arity$1(G__25467) : G__25254.call(null,G__25467));
})();
return (G__25250.cljs$core$IFn$_invoke$arity$2 ? G__25250.cljs$core$IFn$_invoke$arity$2(G__25325,G__25326) : G__25250.call(null,G__25325,G__25326));
})();
return (G__25241.cljs$core$IFn$_invoke$arity$3 ? G__25241.cljs$core$IFn$_invoke$arity$3(G__25258,G__25259,G__25260) : G__25241.call(null,G__25258,G__25259,G__25260));
});})(G__25219,G__25220,G__24842))
).call(null,cljs.core._EQ_,hoplon.core.select,hoplon.core.thead,hoplon.app_pages._index_DOT_html.change_location,hoplon.app_pages._index_DOT_html.airbases,hoplon.core.tbody,hoplon.core.table,hoplon.app_pages._index_DOT_html.location_type,cljs.core.not_EQ_,hoplon.app_pages._index_DOT_html.forecast,hoplon.core.td,hoplon.core.tr,goog.string.format,hoplon.app_pages._index_DOT_html.selected_cell,hoplon.core.div,hoplon.core.option,hoplon.core.label,hoplon.app_pages._index_DOT_html.type_key__GT_name);
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__25219,G__25220,G__25221) : hoplon.core.div.call(null,G__25219,G__25220,G__25221));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2(G__24842,G__24843) : hoplon.core.fieldset.call(null,G__24842,G__24843));
});
hoplon.app_pages._index_DOT_html.debug_info = (function hoplon$app_pages$_index_DOT_html$debug_info(){
return null;
});
hoplon.core.html.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (){var G__25598 = (hoplon.core.title.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.title.cljs$core$IFn$_invoke$arity$1("WeatherGen") : hoplon.core.title.call(null,"WeatherGen"));
var G__25599 = (hoplon.core.link.cljs$core$IFn$_invoke$arity$8 ? hoplon.core.link.cljs$core$IFn$_invoke$arity$8(cljs.core.cst$kw$href,"style.css",cljs.core.cst$kw$rel,"stylesheet",cljs.core.cst$kw$title,"main",cljs.core.cst$kw$type,"text/css") : hoplon.core.link.call(null,cljs.core.cst$kw$href,"style.css",cljs.core.cst$kw$rel,"stylesheet",cljs.core.cst$kw$title,"main",cljs.core.cst$kw$type,"text/css"));
var G__25600 = (hoplon.core.link.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.link.cljs$core$IFn$_invoke$arity$6(cljs.core.cst$kw$href,"https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300",cljs.core.cst$kw$rel,"stylesheet",cljs.core.cst$kw$type,"text/css") : hoplon.core.link.call(null,cljs.core.cst$kw$href,"https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300",cljs.core.cst$kw$rel,"stylesheet",cljs.core.cst$kw$type,"text/css"));
return (hoplon.core.head.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.head.cljs$core$IFn$_invoke$arity$3(G__25598,G__25599,G__25600) : hoplon.core.head.call(null,G__25598,G__25599,G__25600));
})(),(function (){var G__25698 = (function (){var G__25736 = cljs.core.cst$kw$id;
var G__25737 = "app";
var G__25738 = (function (){var G__25755 = cljs.core.cst$kw$id;
var G__25756 = "titlebar";
var G__25757 = (function (){var G__25759 = cljs.core.cst$kw$id;
var G__25760 = "words";
var G__25761 = (hoplon.core.span.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.span.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$id,"title","WeatherGen") : hoplon.core.span.call(null,cljs.core.cst$kw$id,"title","WeatherGen"));
var G__25762 = (function (){var G__25764 = cljs.core.cst$kw$id;
var G__25765 = "byline";
var G__25766 = "by";
var G__25767 = (hoplon.core.a.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.a.cljs$core$IFn$_invoke$arity$5(cljs.core.cst$kw$href,"http://firstfighterwing.com/VFW/member.php?893-Tyrant",cljs.core.cst$kw$target,"_blank","Tyrant") : hoplon.core.a.call(null,cljs.core.cst$kw$href,"http://firstfighterwing.com/VFW/member.php?893-Tyrant",cljs.core.cst$kw$target,"_blank","Tyrant"));
return (hoplon.core.span.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.span.cljs$core$IFn$_invoke$arity$4(G__25764,G__25765,G__25766,G__25767) : hoplon.core.span.call(null,G__25764,G__25765,G__25766,G__25767));
})();
var G__25763 = (function (){var G__25768 = cljs.core.cst$kw$id;
var G__25769 = "helpstring";
var G__25770 = "Help? Bug? Feature request? Click";
var G__25771 = (hoplon.core.a.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.a.cljs$core$IFn$_invoke$arity$5(cljs.core.cst$kw$href,"help.html",cljs.core.cst$kw$target,"_blank","here") : hoplon.core.a.call(null,cljs.core.cst$kw$href,"help.html",cljs.core.cst$kw$target,"_blank","here"));
var G__25772 = ".";
return (hoplon.core.span.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.span.cljs$core$IFn$_invoke$arity$5(G__25768,G__25769,G__25770,G__25771,G__25772) : hoplon.core.span.call(null,G__25768,G__25769,G__25770,G__25771,G__25772));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$5(G__25759,G__25760,G__25761,G__25762,G__25763) : hoplon.core.div.call(null,G__25759,G__25760,G__25761,G__25762,G__25763));
})();
var G__25758 = (function (){var G__25773 = cljs.core.cst$kw$href;
var G__25774 = "http://firstfighterwing.com";
var G__25775 = cljs.core.cst$kw$target;
var G__25776 = "_blank";
var G__25777 = (hoplon.core.img.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$id,"winglogo",cljs.core.cst$kw$src,"images/1stVFW_Insignia-64.png") : hoplon.core.img.call(null,cljs.core.cst$kw$id,"winglogo",cljs.core.cst$kw$src,"images/1stVFW_Insignia-64.png"));
return (hoplon.core.a.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.a.cljs$core$IFn$_invoke$arity$5(G__25773,G__25774,G__25775,G__25776,G__25777) : hoplon.core.a.call(null,G__25773,G__25774,G__25775,G__25776,G__25777));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__25755,G__25756,G__25757,G__25758) : hoplon.core.div.call(null,G__25755,G__25756,G__25757,G__25758));
})();
var G__25739 = (function (){var G__25782 = cljs.core.cst$kw$class;
var G__25783 = "two-column";
var G__25784 = (function (){var G__25786 = cljs.core.cst$kw$class;
var G__25787 = "left-column";
var G__25788 = hoplon.app_pages._index_DOT_html.button_bar();
var G__25789 = hoplon.app_pages._index_DOT_html.weather_grid();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__25786,G__25787,G__25788,G__25789) : hoplon.core.div.call(null,G__25786,G__25787,G__25788,G__25789));
})();
var G__25785 = (function (){var G__25790 = cljs.core.cst$kw$class;
var G__25791 = "right-column";
var G__25792 = hoplon.app_pages._index_DOT_html.display_controls();
var G__25793 = hoplon.app_pages._index_DOT_html.weather_controls();
var G__25794 = hoplon.app_pages._index_DOT_html.serialization_controls();
var G__25795 = hoplon.app_pages._index_DOT_html.forecast_display();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$6(G__25790,G__25791,G__25792,G__25793,G__25794,G__25795) : hoplon.core.div.call(null,G__25790,G__25791,G__25792,G__25793,G__25794,G__25795));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__25782,G__25783,G__25784,G__25785) : hoplon.core.div.call(null,G__25782,G__25783,G__25784,G__25785));
})();
var G__25740 = hoplon.app_pages._index_DOT_html.debug_info();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$5(G__25736,G__25737,G__25738,G__25739,G__25740) : hoplon.core.div.call(null,G__25736,G__25737,G__25738,G__25739,G__25740));
})();
return (hoplon.core.body.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.body.cljs$core$IFn$_invoke$arity$1(G__25698) : hoplon.core.body.call(null,G__25698));
})()], 0));
cljs.core.add_watch(hoplon.app_pages._index_DOT_html.grid_data,cljs.core.cst$kw$redraw_DASH_triggers,(function (k,r,o,n){
return hoplon.app_pages._index_DOT_html.draw_grid(n);
}));
hoplon.app_pages._index_DOT_html.draw_grid((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.grid_data) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.grid_data)));
