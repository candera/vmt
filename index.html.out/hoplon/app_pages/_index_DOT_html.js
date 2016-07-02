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
hoplon.app_pages._index_DOT_html.weather_data = javelin.core.formula((function (G__19784,G__19783){
return (G__19783.cljs$core$IFn$_invoke$arity$1 ? G__19783.cljs$core$IFn$_invoke$arity$1(G__19784) : G__19783.call(null,G__19784));
})).call(null,hoplon.app_pages._index_DOT_html.weather_params,weathergen.model.weather_grid);
hoplon.app_pages._index_DOT_html.selected_cell_weather = javelin.core.formula((function (G__19785,G__19787,G__19786){
return (G__19785.cljs$core$IFn$_invoke$arity$2 ? G__19785.cljs$core$IFn$_invoke$arity$2(G__19786,G__19787) : G__19785.call(null,G__19786,G__19787));
})).call(null,cljs.core.get,hoplon.app_pages._index_DOT_html.selected_cell,hoplon.app_pages._index_DOT_html.weather_data);
hoplon.app_pages._index_DOT_html.cell_count = javelin.core.formula((function (G__19788){
return cljs.core.cst$kw$cell_DASH_count.cljs$core$IFn$_invoke$arity$1(G__19788);
})).call(null,hoplon.app_pages._index_DOT_html.weather_params);
hoplon.app_pages._index_DOT_html.dimensions = javelin.core.formula((function (G__19789){
return cljs.core.cst$kw$dimensions.cljs$core$IFn$_invoke$arity$1(G__19789);
})).call(null,hoplon.app_pages._index_DOT_html.display_params);
hoplon.app_pages._index_DOT_html.wind_stability_areas = javelin.core.formula((function (G__19790){
return cljs.core.cst$kw$wind_DASH_stability_DASH_areas.cljs$core$IFn$_invoke$arity$1(G__19790);
})).call(null,hoplon.app_pages._index_DOT_html.weather_params);
hoplon.app_pages._index_DOT_html.grid_data = javelin.core.formula((function (G__19791,G__19794,G__19792,G__19795,G__19793){
return new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$display_DASH_params,G__19791,cljs.core.cst$kw$cell_DASH_count,G__19792,cljs.core.cst$kw$weather_DASH_data,G__19793,cljs.core.cst$kw$selected_DASH_cell,G__19794,cljs.core.cst$kw$wind_DASH_stability_DASH_areas,G__19795], null);
})).call(null,hoplon.app_pages._index_DOT_html.display_params,hoplon.app_pages._index_DOT_html.selected_cell,hoplon.app_pages._index_DOT_html.cell_count,hoplon.app_pages._index_DOT_html.wind_stability_areas,hoplon.app_pages._index_DOT_html.weather_data);
hoplon.app_pages._index_DOT_html.forecast = javelin.core.formula((function (G__19798,G__19800,G__19796,G__19799,G__19797){
if(cljs.core.truth_(G__19796)){
var result = (function (){var G__19804 = G__19796;
var G__19805 = G__19798;
var G__19806 = G__19799;
var G__19807 = (function (){var G__19808 = (5);
var G__19809 = ((360) / cljs.core.cst$kw$step.cljs$core$IFn$_invoke$arity$1(G__19799));
var G__19810 = (15);
return (G__19800.cljs$core$IFn$_invoke$arity$3 ? G__19800.cljs$core$IFn$_invoke$arity$3(G__19808,G__19809,G__19810) : G__19800.call(null,G__19808,G__19809,G__19810));
})();
return (G__19797.cljs$core$IFn$_invoke$arity$4 ? G__19797.cljs$core$IFn$_invoke$arity$4(G__19804,G__19805,G__19806,G__19807) : G__19797.call(null,G__19804,G__19805,G__19806,G__19807));
})();
return result;
} else {
return null;
}
})).call(null,hoplon.app_pages._index_DOT_html.weather_params,weathergen.math.clamp,hoplon.app_pages._index_DOT_html.selected_cell,hoplon.app_pages._index_DOT_html.movement_params,weathergen.model.forecast);
/**
 * Advances the weather by `steps` steps
 */
hoplon.app_pages._index_DOT_html.move = (function hoplon$app_pages$_index_DOT_html$move(steps){
return javelin.core.dosync_STAR_((function (){
var map__19813 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.weather_params,weathergen.model.step,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.movement_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.movement_params)),steps);
var map__19813__$1 = ((((!((map__19813 == null)))?((((map__19813.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19813.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19813):map__19813);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19813__$1,cljs.core.cst$kw$time);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.time_params,cljs.core.assoc,cljs.core.cst$kw$displayed,cljs.core.cst$kw$current.cljs$core$IFn$_invoke$arity$1(time));
}));
});
/**
 * Adjust the time coordinate to match the displayed time.
 */
hoplon.app_pages._index_DOT_html.jump_to_time = (function hoplon$app_pages$_index_DOT_html$jump_to_time(){
return javelin.core.dosync_STAR_((function (){
var map__19817 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.weather_params,weathergen.model.jump_to_time,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.movement_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.movement_params)),cljs.core.cst$kw$displayed.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.time_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.time_params))));
var map__19817__$1 = ((((!((map__19817 == null)))?((((map__19817.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19817.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19817):map__19817);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19817__$1,cljs.core.cst$kw$time);
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
hoplon.app_pages._index_DOT_html.save_data = (function hoplon$app_pages$_index_DOT_html$save_data(blob,filename){
var a = goog.dom.createElement("a");
var _ = (function (){var G__19821 = goog.dom.getDocument().body;
var G__19822 = a;
return goog.dom.appendChild(G__19821,G__19822);
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
var vec__19830 = cljs.core.cst$kw$cell_DASH_count.cljs$core$IFn$_invoke$arity$1(weather_params);
var x_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19830,(0),null);
var y_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19830,(1),null);
var blob = weathergen.fmap.get_blob(weather_data,x_cells,y_cells);
return hoplon.app_pages._index_DOT_html.save_data(blob,(function (){var G__19833 = "%d%02d%02d.fmap";
var G__19834 = cljs.core.cst$kw$day.cljs$core$IFn$_invoke$arity$1(t);
var G__19835 = cljs.core.cst$kw$hour.cljs$core$IFn$_invoke$arity$1(t);
var G__19836 = cljs.core.cst$kw$minute.cljs$core$IFn$_invoke$arity$1(t);
return goog.string.format(G__19833,G__19834,G__19835,G__19836);
})());
});
hoplon.app_pages._index_DOT_html.save_settings = (function hoplon$app_pages$_index_DOT_html$save_settings(_){
return hoplon.app_pages._index_DOT_html.save_data((new Blob([cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$weather_DASH_params,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.weather_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.weather_params)),cljs.core.cst$kw$movement_DASH_params,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.movement_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.movement_params)),cljs.core.cst$kw$display_DASH_params,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.display_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.display_params)),cljs.core.cst$kw$revision,hoplon.app_pages._index_DOT_html.revision], null)], 0))],{"type": "text/plain"})),"weathergen-settings.edn");
});
hoplon.app_pages._index_DOT_html.load_settings = (function hoplon$app_pages$_index_DOT_html$load_settings(_){
var i = goog.dom.createElement("input");
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
i.type = "file";

var G__19871_19904 = goog.dom.getDocument().body;
var G__19872_19905 = i;
goog.dom.appendChild(G__19871_19904,G__19872_19905);

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
return (function (state_19887){
var state_val_19888 = (state_19887[(1)]);
if((state_val_19888 === (1))){
var state_19887__$1 = state_19887;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19887__$1,(2),ch);
} else {
if((state_val_19888 === (2))){
var inst_19874 = (state_19887[(7)]);
var inst_19877 = (state_19887[(8)]);
var inst_19874__$1 = (state_19887[(2)]);
var inst_19875 = inst_19874__$1.target;
var inst_19876 = inst_19875.files;
var inst_19877__$1 = (inst_19876[(0)]);
var state_19887__$1 = (function (){var statearr_19889 = state_19887;
(statearr_19889[(7)] = inst_19874__$1);

(statearr_19889[(8)] = inst_19877__$1);

return statearr_19889;
})();
if(cljs.core.truth_(inst_19877__$1)){
var statearr_19890_19906 = state_19887__$1;
(statearr_19890_19906[(1)] = (3));

} else {
var statearr_19891_19907 = state_19887__$1;
(statearr_19891_19907[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_19888 === (3))){
var inst_19874 = (state_19887[(7)]);
var inst_19877 = (state_19887[(8)]);
var inst_19879 = (new FileReader());
var inst_19880 = (function (){var e = inst_19874;
var temp__6363__auto__ = inst_19877;
var file = inst_19877;
var reader = inst_19879;
return ((function (e,temp__6363__auto__,file,reader,inst_19874,inst_19877,inst_19879,state_val_19888,c__16206__auto__,i,ch){
return (function (p1__19837_SHARP_){
var data = cljs.reader.read_string(p1__19837_SHARP_.target.result);
return javelin.core.dosync_STAR_(((function (data,e,temp__6363__auto__,file,reader,inst_19874,inst_19877,inst_19879,state_val_19888,c__16206__auto__,i,ch){
return (function (){
var map__19892 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.weather_params,cljs.core.merge,cljs.core.cst$kw$weather_DASH_params.cljs$core$IFn$_invoke$arity$1(data));
var map__19892__$1 = ((((!((map__19892 == null)))?((((map__19892.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19892.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19892):map__19892);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19892__$1,cljs.core.cst$kw$time);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.display_params,cljs.core.merge,cljs.core.cst$kw$display_DASH_params.cljs$core$IFn$_invoke$arity$1(data));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.movement_params,cljs.core.merge,cljs.core.cst$kw$movement_DASH_params.cljs$core$IFn$_invoke$arity$1(data));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.time_params,cljs.core.assoc,cljs.core.cst$kw$displayed,cljs.core.cst$kw$current.cljs$core$IFn$_invoke$arity$1(time));
});})(data,e,temp__6363__auto__,file,reader,inst_19874,inst_19877,inst_19879,state_val_19888,c__16206__auto__,i,ch))
);
});
;})(e,temp__6363__auto__,file,reader,inst_19874,inst_19877,inst_19879,state_val_19888,c__16206__auto__,i,ch))
})();
var inst_19881 = inst_19879.onload = inst_19880;
var inst_19882 = inst_19879.readAsText(inst_19877);
var state_19887__$1 = (function (){var statearr_19894 = state_19887;
(statearr_19894[(9)] = inst_19881);

return statearr_19894;
})();
var statearr_19895_19908 = state_19887__$1;
(statearr_19895_19908[(2)] = inst_19882);

(statearr_19895_19908[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_19888 === (4))){
var state_19887__$1 = state_19887;
var statearr_19896_19909 = state_19887__$1;
(statearr_19896_19909[(2)] = null);

(statearr_19896_19909[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_19888 === (5))){
var inst_19885 = (state_19887[(2)]);
var state_19887__$1 = state_19887;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19887__$1,inst_19885);
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
var statearr_19900 = [null,null,null,null,null,null,null,null,null,null];
(statearr_19900[(0)] = hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto__);

(statearr_19900[(1)] = (1));

return statearr_19900;
});
var hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto____1 = (function (state_19887){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_19887);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e19901){if((e19901 instanceof Object)){
var ex__16094__auto__ = e19901;
var statearr_19902_19910 = state_19887;
(statearr_19902_19910[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_19887);

return cljs.core.cst$kw$recur;
} else {
throw e19901;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__19911 = state_19887;
state_19887 = G__19911;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto__ = function(state_19887){
switch(arguments.length){
case 0:
return hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto____0.call(this);
case 1:
return hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto____1.call(this,state_19887);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto____0;
hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto____1;
return hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto__,i,ch))
})();
var state__16208__auto__ = (function (){var statearr_19903 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_19903[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto__);

return statearr_19903;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto__,i,ch))
);

return c__16206__auto__;
});
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
var help_states_20004 = javelin.core.cell.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
/**
 * @param {...*} var_args
 */
hoplon.app_pages._index_DOT_html.help = ((function (help_states_20004){
return (function() { 
var hoplon$app_pages$_index_DOT_html$help__delegate = function (args__13971__auto__){
var vec__19958 = hoplon.core.parse_args(args__13971__auto__);
var map__19961 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19958,(0),null);
var map__19961__$1 = ((((!((map__19961 == null)))?((((map__19961.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19961.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19961):map__19961);
var contents = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19958,(1),null);
var id = [cljs.core.str(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0())].join('');
var content_id = [cljs.core.str("content-"),cljs.core.str(id)].join('');
var img_id = [cljs.core.str("img-"),cljs.core.str(id)].join('');
var G__19978 = cljs.core.cst$kw$class;
var G__19979 = "help";
var G__19980 = (function (){var G__19985 = cljs.core.cst$kw$id;
var G__19986 = content_id;
var G__19987 = cljs.core.cst$kw$fade_DASH_toggle;
var G__19988 = javelin.core.formula(((function (G__19985,G__19986,G__19987,G__19978,G__19979,id,content_id,img_id,vec__19958,map__19961,map__19961__$1,contents,help_states_20004){
return (function (G__19994,G__19995,G__19996){
return (G__19994.cljs$core$IFn$_invoke$arity$2 ? G__19994.cljs$core$IFn$_invoke$arity$2(G__19995,G__19996) : G__19994.call(null,G__19995,G__19996));
});})(G__19985,G__19986,G__19987,G__19978,G__19979,id,content_id,img_id,vec__19958,map__19961,map__19961__$1,contents,help_states_20004))
).call(null,cljs.core.get,help_states_20004,id);
var G__19989 = cljs.core.cst$kw$class;
var G__19990 = "content";
var G__19991 = cljs.core.cst$kw$click;
var G__19992 = ((function (G__19985,G__19986,G__19987,G__19988,G__19989,G__19990,G__19991,G__19978,G__19979,id,content_id,img_id,vec__19958,map__19961,map__19961__$1,contents,help_states_20004){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(help_states_20004,cljs.core.assoc,id,false);
});})(G__19985,G__19986,G__19987,G__19988,G__19989,G__19990,G__19991,G__19978,G__19979,id,content_id,img_id,vec__19958,map__19961,map__19961__$1,contents,help_states_20004))
;
var G__19993 = contents;
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$9 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$9(G__19985,G__19986,G__19987,G__19988,G__19989,G__19990,G__19991,G__19992,G__19993) : hoplon.core.div.call(null,G__19985,G__19986,G__19987,G__19988,G__19989,G__19990,G__19991,G__19992,G__19993));
})();
var G__19981 = (function (){var G__19997 = cljs.core.cst$kw$id;
var G__19998 = img_id;
var G__19999 = cljs.core.cst$kw$class;
var G__20000 = "img";
var G__20001 = cljs.core.cst$kw$click;
var G__20002 = ((function (G__19997,G__19998,G__19999,G__20000,G__20001,G__19978,G__19979,G__19980,id,content_id,img_id,vec__19958,map__19961,map__19961__$1,contents,help_states_20004){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(help_states_20004,((function (G__19997,G__19998,G__19999,G__20000,G__20001,G__19978,G__19979,G__19980,id,content_id,img_id,vec__19958,map__19961,map__19961__$1,contents,help_states_20004){
return (function (hs){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.zipmap(cljs.core.keys(hs),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(false)),cljs.core.PersistentArrayMap.fromArray([id,cljs.core.not(cljs.core.get.cljs$core$IFn$_invoke$arity$2(hs,id))], true, false)], 0));
});})(G__19997,G__19998,G__19999,G__20000,G__20001,G__19978,G__19979,G__19980,id,content_id,img_id,vec__19958,map__19961,map__19961__$1,contents,help_states_20004))
);
});})(G__19997,G__19998,G__19999,G__20000,G__20001,G__19978,G__19979,G__19980,id,content_id,img_id,vec__19958,map__19961,map__19961__$1,contents,help_states_20004))
;
var G__20003 = "?";
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$7 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$7(G__19997,G__19998,G__19999,G__20000,G__20001,G__20002,G__20003) : hoplon.core.div.call(null,G__19997,G__19998,G__19999,G__20000,G__20001,G__20002,G__20003));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__19978,G__19979,G__19980,G__19981) : hoplon.core.div.call(null,G__19978,G__19979,G__19980,G__19981));
};
var hoplon$app_pages$_index_DOT_html$help = function (var_args){
var args__13971__auto__ = null;
if (arguments.length > 0) {
var G__20005__i = 0, G__20005__a = new Array(arguments.length -  0);
while (G__20005__i < G__20005__a.length) {G__20005__a[G__20005__i] = arguments[G__20005__i + 0]; ++G__20005__i;}
  args__13971__auto__ = new cljs.core.IndexedSeq(G__20005__a,0);
} 
return hoplon$app_pages$_index_DOT_html$help__delegate.call(this,args__13971__auto__);};
hoplon$app_pages$_index_DOT_html$help.cljs$lang$maxFixedArity = 0;
hoplon$app_pages$_index_DOT_html$help.cljs$lang$applyTo = (function (arglist__20006){
var args__13971__auto__ = cljs.core.seq(arglist__20006);
return hoplon$app_pages$_index_DOT_html$help__delegate(args__13971__auto__);
});
hoplon$app_pages$_index_DOT_html$help.cljs$core$IFn$_invoke$arity$variadic = hoplon$app_pages$_index_DOT_html$help__delegate;
return hoplon$app_pages$_index_DOT_html$help;
})()
;})(help_states_20004))
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
var vec__20015 = dimensions;
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20015,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20015,(1),null);
var vec__20018 = cell_count;
var nx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20018,(0),null);
var ny = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20018,(1),null);
var canvas = goog.dom.getElement(canvas_id);
var r = canvas.getBoundingClientRect();
var x = ((((e.clientX - r.left) / width) * nx) | (0));
var y = ((((e.clientY - r.top) / height) * ny) | (0));
var G__20021 = hoplon.app_pages._index_DOT_html.selected_cell;
var G__20022 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__20021,G__20022) : cljs.core.reset_BANG_.call(null,G__20021,G__20022));
});
hoplon.app_pages._index_DOT_html.weather_color = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$sunny,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(255),0.25], null),cljs.core.cst$kw$fair,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(255),(0),(1)], null),cljs.core.cst$kw$poor,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(0),(1)], null),cljs.core.cst$kw$inclement,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(192),(0),(0),(1)], null),null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(0),(0),(1)], null)], null);
hoplon.app_pages._index_DOT_html.pressure_map = new cljs.core.PersistentArrayMap(null, 7, [28.5,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(192),(0),(0),(1)], null),28.9,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(192),(0),(0),(1)], null),29.3,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(0),(1)], null),29.5,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(255),(0),(1)], null),29.9,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(128),(255),(1)], null),30.2,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(255),(1)], null),31.0,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(255),(1)], null)], null);
hoplon.app_pages._index_DOT_html.gradient_color = (function hoplon$app_pages$_index_DOT_html$gradient_color(color_map,val){
var vec__20042 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__20051){
var vec__20052 = p__20051;
var vec__20055 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20052,(0),null);
var low = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20055,(0),null);
var l = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20055,(1),null);
var vec__20058 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20052,(1),null);
var high = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20058,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20058,(1),null);
return ((low <= val)) && ((val <= high));
}),cljs.core.partition.cljs$core$IFn$_invoke$arity$3((2),(1),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.sorted_map(),color_map))));
var vec__20045 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20042,(0),null);
var low = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20045,(0),null);
var l = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20045,(1),null);
var vec__20048 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20042,(1),null);
var high = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20048,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20048,(1),null);
return weathergen.math.vector_interpolate(l,h,val,low,high);
});
hoplon.app_pages._index_DOT_html.pressure_color = (function hoplon$app_pages$_index_DOT_html$pressure_color(pressure){
var vec__20064 = hoplon.app_pages._index_DOT_html.gradient_color(hoplon.app_pages._index_DOT_html.pressure_map,pressure);
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20064,(0),null);
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20064,(1),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20064,(2),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20064,(3),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.long$(r),cljs.core.long$(g),cljs.core.long$(b),a], null);
});
hoplon.app_pages._index_DOT_html.temp_map = new cljs.core.PersistentArrayMap(null, 3, [(0),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(255),(1)], null),(20),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(255),(0),(1)], null),(40),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(0),(0),(1)], null)], null);
hoplon.app_pages._index_DOT_html.temperature_color = (function hoplon$app_pages$_index_DOT_html$temperature_color(temp){
var vec__20070 = hoplon.app_pages._index_DOT_html.gradient_color(hoplon.app_pages._index_DOT_html.temp_map,temp);
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20070,(0),null);
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20070,(1),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20070,(2),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20070,(3),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.long$(r),cljs.core.long$(g),cljs.core.long$(b),a], null);
});
hoplon.app_pages._index_DOT_html.fill_color = (function hoplon$app_pages$_index_DOT_html$fill_color(display,w){
var G__20075 = (((display instanceof cljs.core.Keyword))?display.fqn:null);
switch (G__20075) {
case "type":
var G__20076 = cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(w);
return (hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1(G__20076) : hoplon.app_pages._index_DOT_html.weather_color.call(null,G__20076));

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
var vec__20085 = cell_count;
var x_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20085,(0),null);
var y_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20085,(1),null);
var vec__20088 = canvas_dimensions;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20088,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20088,(1),null);
var width = (w / x_cells);
var height = (h / y_cells);
var G__20091 = ctx;
hoplon.app_pages._index_DOT_html.clear_transform(G__20091);

G__20091.translate(((x + 1.0E-6) * width),((y + 1.0E-5) * height));

G__20091.scale((w / x_cells),(h / y_cells));

G__20091.translate(0.5,0.5);

return G__20091;
});
hoplon.app_pages._index_DOT_html.set_fill = (function hoplon$app_pages$_index_DOT_html$set_fill(ctx,r,g,b,a){
return ctx.fillStyle = [cljs.core.str("rgba("),cljs.core.str(r),cljs.core.str(","),cljs.core.str(g),cljs.core.str(","),cljs.core.str(b),cljs.core.str(","),cljs.core.str(a),cljs.core.str(")")].join('');
});
if(typeof hoplon.app_pages._index_DOT_html.prep_overlay !== 'undefined'){
} else {
hoplon.app_pages._index_DOT_html.prep_overlay = (function (){var method_table__8042__auto__ = (function (){var G__20092 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20092) : cljs.core.atom.call(null,G__20092));
})();
var prefer_table__8043__auto__ = (function (){var G__20093 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20093) : cljs.core.atom.call(null,G__20093));
})();
var method_cache__8044__auto__ = (function (){var G__20094 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20094) : cljs.core.atom.call(null,G__20094));
})();
var cached_hierarchy__8045__auto__ = (function (){var G__20095 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20095) : cljs.core.atom.call(null,G__20095));
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
hoplon.app_pages._index_DOT_html.stroke_overlay = (function (){var method_table__8042__auto__ = (function (){var G__20096 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20096) : cljs.core.atom.call(null,G__20096));
})();
var prefer_table__8043__auto__ = (function (){var G__20097 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20097) : cljs.core.atom.call(null,G__20097));
})();
var method_cache__8044__auto__ = (function (){var G__20098 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20098) : cljs.core.atom.call(null,G__20098));
})();
var cached_hierarchy__8045__auto__ = (function (){var G__20099 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20099) : cljs.core.atom.call(null,G__20099));
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
var map__20100 = cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather);
var map__20100__$1 = ((((!((map__20100 == null)))?((((map__20100.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20100.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20100):map__20100);
var speed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20100__$1,cljs.core.cst$kw$speed);
var heading = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20100__$1,cljs.core.cst$kw$heading);
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

var G__20102_20103 = ctx;
G__20102_20103.rotate(weathergen.math.deg__GT_rad(heading));

G__20102_20103.moveTo((0),(0.5 - tail_slant));

G__20102_20103.lineTo((0),(-0.5 + tail_slant));


var n__8032__auto___20104 = full_tails;
var n_20105 = (0);
while(true){
if((n_20105 < n__8032__auto___20104)){
ctx.moveTo((0),((-0.5 + tail_slant) + (tail_step * n_20105)));

ctx.lineTo(tail_width,(-0.5 + (tail_step * n_20105)));

var G__20106 = (n_20105 + (1));
n_20105 = G__20106;
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
hoplon.app_pages._index_DOT_html.draw_map = (function hoplon$app_pages$_index_DOT_html$draw_map(ctx,map,p__20107){
var vec__20111 = p__20107;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20111,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20111,(1),null);
return null;
});
/**
 * Draws the data layer
 */
hoplon.app_pages._index_DOT_html.draw_data = (function hoplon$app_pages$_index_DOT_html$draw_data(ctx,display,opacity,weather_data,cell_count,dimensions){
if(cljs.core.truth_((hoplon.app_pages._index_DOT_html.display_key__GT_name.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.display_key__GT_name.cljs$core$IFn$_invoke$arity$1(display) : hoplon.app_pages._index_DOT_html.display_key__GT_name.call(null,display)))){
ctx.save();

var seq__20138_20162 = cljs.core.seq(weather_data);
var chunk__20140_20163 = null;
var count__20141_20164 = (0);
var i__20142_20165 = (0);
while(true){
if((i__20142_20165 < count__20141_20164)){
var vec__20144_20166 = chunk__20140_20163.cljs$core$IIndexed$_nth$arity$2(null,i__20142_20165);
var vec__20147_20167 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20144_20166,(0),null);
var x_20168 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20147_20167,(0),null);
var y_20169 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20147_20167,(1),null);
var weather_20170 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20144_20166,(1),null);
var vec__20150_20171 = hoplon.app_pages._index_DOT_html.fill_color(display,weather_20170);
var r_20172 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20150_20171,(0),null);
var g_20173 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20150_20171,(1),null);
var b_20174 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20150_20171,(2),null);
var a_20175 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20150_20171,(3),null);
hoplon.app_pages._index_DOT_html.set_transform(ctx,x_20168,y_20169,cell_count,dimensions);

hoplon.app_pages._index_DOT_html.set_fill(ctx,r_20172,g_20173,b_20174,(a_20175 * opacity));

ctx.fillRect(-0.5,-0.5,(1),(1));

var G__20176 = seq__20138_20162;
var G__20177 = chunk__20140_20163;
var G__20178 = count__20141_20164;
var G__20179 = (i__20142_20165 + (1));
seq__20138_20162 = G__20176;
chunk__20140_20163 = G__20177;
count__20141_20164 = G__20178;
i__20142_20165 = G__20179;
continue;
} else {
var temp__6363__auto___20180 = cljs.core.seq(seq__20138_20162);
if(temp__6363__auto___20180){
var seq__20138_20181__$1 = temp__6363__auto___20180;
if(cljs.core.chunked_seq_QMARK_(seq__20138_20181__$1)){
var c__7922__auto___20182 = cljs.core.chunk_first(seq__20138_20181__$1);
var G__20183 = cljs.core.chunk_rest(seq__20138_20181__$1);
var G__20184 = c__7922__auto___20182;
var G__20185 = cljs.core.count(c__7922__auto___20182);
var G__20186 = (0);
seq__20138_20162 = G__20183;
chunk__20140_20163 = G__20184;
count__20141_20164 = G__20185;
i__20142_20165 = G__20186;
continue;
} else {
var vec__20153_20187 = cljs.core.first(seq__20138_20181__$1);
var vec__20156_20188 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20153_20187,(0),null);
var x_20189 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20156_20188,(0),null);
var y_20190 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20156_20188,(1),null);
var weather_20191 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20153_20187,(1),null);
var vec__20159_20192 = hoplon.app_pages._index_DOT_html.fill_color(display,weather_20191);
var r_20193 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20159_20192,(0),null);
var g_20194 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20159_20192,(1),null);
var b_20195 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20159_20192,(2),null);
var a_20196 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20159_20192,(3),null);
hoplon.app_pages._index_DOT_html.set_transform(ctx,x_20189,y_20190,cell_count,dimensions);

hoplon.app_pages._index_DOT_html.set_fill(ctx,r_20193,g_20194,b_20195,(a_20196 * opacity));

ctx.fillRect(-0.5,-0.5,(1),(1));

var G__20197 = cljs.core.next(seq__20138_20181__$1);
var G__20198 = null;
var G__20199 = (0);
var G__20200 = (0);
seq__20138_20162 = G__20197;
chunk__20140_20163 = G__20198;
count__20141_20164 = G__20199;
i__20142_20165 = G__20200;
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

var seq__20219_20237 = cljs.core.seq(weather_data);
var chunk__20221_20238 = null;
var count__20222_20239 = (0);
var i__20223_20240 = (0);
while(true){
if((i__20223_20240 < count__20222_20239)){
var vec__20225_20241 = chunk__20221_20238.cljs$core$IIndexed$_nth$arity$2(null,i__20223_20240);
var vec__20228_20242 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20225_20241,(0),null);
var x_20243 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20228_20242,(0),null);
var y_20244 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20228_20242,(1),null);
var weather_20245 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20225_20241,(1),null);
var weather_20246__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(weather_20245,cljs.core.cst$kw$x,x_20243,cljs.core.array_seq([cljs.core.cst$kw$y,y_20244], 0));
hoplon.app_pages._index_DOT_html.set_transform(ctx,x_20243,y_20244,cell_count,dimensions);

(hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IFn$_invoke$arity$3 ? hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IFn$_invoke$arity$3(ctx,overlay,weather_20246__$1) : hoplon.app_pages._index_DOT_html.stroke_overlay.call(null,ctx,overlay,weather_20246__$1));

var G__20247 = seq__20219_20237;
var G__20248 = chunk__20221_20238;
var G__20249 = count__20222_20239;
var G__20250 = (i__20223_20240 + (1));
seq__20219_20237 = G__20247;
chunk__20221_20238 = G__20248;
count__20222_20239 = G__20249;
i__20223_20240 = G__20250;
continue;
} else {
var temp__6363__auto___20251 = cljs.core.seq(seq__20219_20237);
if(temp__6363__auto___20251){
var seq__20219_20252__$1 = temp__6363__auto___20251;
if(cljs.core.chunked_seq_QMARK_(seq__20219_20252__$1)){
var c__7922__auto___20253 = cljs.core.chunk_first(seq__20219_20252__$1);
var G__20254 = cljs.core.chunk_rest(seq__20219_20252__$1);
var G__20255 = c__7922__auto___20253;
var G__20256 = cljs.core.count(c__7922__auto___20253);
var G__20257 = (0);
seq__20219_20237 = G__20254;
chunk__20221_20238 = G__20255;
count__20222_20239 = G__20256;
i__20223_20240 = G__20257;
continue;
} else {
var vec__20231_20258 = cljs.core.first(seq__20219_20252__$1);
var vec__20234_20259 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20231_20258,(0),null);
var x_20260 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20234_20259,(0),null);
var y_20261 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20234_20259,(1),null);
var weather_20262 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20231_20258,(1),null);
var weather_20263__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(weather_20262,cljs.core.cst$kw$x,x_20260,cljs.core.array_seq([cljs.core.cst$kw$y,y_20261], 0));
hoplon.app_pages._index_DOT_html.set_transform(ctx,x_20260,y_20261,cell_count,dimensions);

(hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IFn$_invoke$arity$3 ? hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IFn$_invoke$arity$3(ctx,overlay,weather_20263__$1) : hoplon.app_pages._index_DOT_html.stroke_overlay.call(null,ctx,overlay,weather_20263__$1));

var G__20264 = cljs.core.next(seq__20219_20252__$1);
var G__20265 = null;
var G__20266 = (0);
var G__20267 = (0);
seq__20219_20237 = G__20264;
chunk__20221_20238 = G__20265;
count__20222_20239 = G__20266;
i__20223_20240 = G__20267;
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
hoplon.app_pages._index_DOT_html.draw_selected_cell = (function hoplon$app_pages$_index_DOT_html$draw_selected_cell(ctx,p__20268,cell_count,dimensions){
var vec__20272 = p__20268;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20272,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20272,(1),null);
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
var seq__20283 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$bounds,areas));
var chunk__20284 = null;
var count__20285 = (0);
var i__20286 = (0);
while(true){
if((i__20286 < count__20285)){
var map__20287 = chunk__20284.cljs$core$IIndexed$_nth$arity$2(null,i__20286);
var map__20287__$1 = ((((!((map__20287 == null)))?((((map__20287.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20287.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20287):map__20287);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20287__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20287__$1,cljs.core.cst$kw$y);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20287__$1,cljs.core.cst$kw$width);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20287__$1,cljs.core.cst$kw$height);
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

var G__20291 = seq__20283;
var G__20292 = chunk__20284;
var G__20293 = count__20285;
var G__20294 = (i__20286 + (1));
seq__20283 = G__20291;
chunk__20284 = G__20292;
count__20285 = G__20293;
i__20286 = G__20294;
continue;
} else {
var temp__6363__auto__ = cljs.core.seq(seq__20283);
if(temp__6363__auto__){
var seq__20283__$1 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20283__$1)){
var c__7922__auto__ = cljs.core.chunk_first(seq__20283__$1);
var G__20295 = cljs.core.chunk_rest(seq__20283__$1);
var G__20296 = c__7922__auto__;
var G__20297 = cljs.core.count(c__7922__auto__);
var G__20298 = (0);
seq__20283 = G__20295;
chunk__20284 = G__20296;
count__20285 = G__20297;
i__20286 = G__20298;
continue;
} else {
var map__20289 = cljs.core.first(seq__20283__$1);
var map__20289__$1 = ((((!((map__20289 == null)))?((((map__20289.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20289.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20289):map__20289);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,cljs.core.cst$kw$y);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,cljs.core.cst$kw$width);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,cljs.core.cst$kw$height);
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

var G__20299 = cljs.core.next(seq__20283__$1);
var G__20300 = null;
var G__20301 = (0);
var G__20302 = (0);
seq__20283 = G__20299;
chunk__20284 = G__20300;
count__20285 = G__20301;
i__20286 = G__20302;
continue;
}
} else {
return null;
}
}
break;
}
});
hoplon.app_pages._index_DOT_html.draw_grid = (function hoplon$app_pages$_index_DOT_html$draw_grid(p__20303){
var map__20373 = p__20303;
var map__20373__$1 = ((((!((map__20373 == null)))?((((map__20373.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20373.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20373):map__20373);
var data = map__20373__$1;
var display_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20373__$1,cljs.core.cst$kw$display_DASH_params);
var cell_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20373__$1,cljs.core.cst$kw$cell_DASH_count);
var wind_stability_areas = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20373__$1,cljs.core.cst$kw$wind_DASH_stability_DASH_areas);
var weather_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20373__$1,cljs.core.cst$kw$weather_DASH_data);
var selected_cell = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20373__$1,cljs.core.cst$kw$selected_DASH_cell);
console.time("draw-grid");

var canvas_20442 = goog.dom.getElement("weather-grid");
var map__20375_20443 = display_params;
var map__20375_20444__$1 = ((((!((map__20375_20443 == null)))?((((map__20375_20443.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20375_20443.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20375_20443):map__20375_20443);
var map_20445 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20375_20444__$1,cljs.core.cst$kw$map);
var opacity_20446 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20375_20444__$1,cljs.core.cst$kw$opacity);
var dimensions_20447 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20375_20444__$1,cljs.core.cst$kw$dimensions);
var display_20448 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20375_20444__$1,cljs.core.cst$kw$display);
var overlay_20449 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20375_20444__$1,cljs.core.cst$kw$overlay);
var vec__20376_20450 = dimensions_20447;
var w_20451 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20376_20450,(0),null);
var h_20452 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20376_20450,(1),null);
if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(w_20451,canvas_20442.width))){
var ch_20453 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["canvas is not done loading",cljs.core.cst$kw$dimensions,dimensions_20447,cljs.core.cst$kw$width,canvas_20442.width,cljs.core.cst$kw$height,canvas_20442.height], 0));

var c__16206__auto___20454 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___20454,ch_20453,canvas_20442,map__20375_20443,map__20375_20444__$1,map_20445,opacity_20446,dimensions_20447,display_20448,overlay_20449,vec__20376_20450,w_20451,h_20452,map__20373,map__20373__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___20454,ch_20453,canvas_20442,map__20375_20443,map__20375_20444__$1,map_20445,opacity_20446,dimensions_20447,display_20448,overlay_20449,vec__20376_20450,w_20451,h_20452,map__20373,map__20373__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function (state_20403){
var state_val_20404 = (state_20403[(1)]);
if((state_val_20404 === (7))){
var inst_20399 = (state_20403[(2)]);
var state_20403__$1 = state_20403;
var statearr_20405_20455 = state_20403__$1;
(statearr_20405_20455[(2)] = inst_20399);

(statearr_20405_20455[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20404 === (1))){
var inst_20380 = (200);
var state_20403__$1 = (function (){var statearr_20406 = state_20403;
(statearr_20406[(7)] = inst_20380);

return statearr_20406;
})();
var statearr_20407_20456 = state_20403__$1;
(statearr_20407_20456[(2)] = null);

(statearr_20407_20456[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20404 === (4))){
var inst_20380 = (state_20403[(7)]);
var inst_20384 = (state_20403[(2)]);
var inst_20385 = (inst_20380 > (0));
var state_20403__$1 = (function (){var statearr_20408 = state_20403;
(statearr_20408[(8)] = inst_20384);

return statearr_20408;
})();
if(cljs.core.truth_(inst_20385)){
var statearr_20409_20457 = state_20403__$1;
(statearr_20409_20457[(1)] = (5));

} else {
var statearr_20410_20458 = state_20403__$1;
(statearr_20410_20458[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_20404 === (6))){
var state_20403__$1 = state_20403;
var statearr_20411_20459 = state_20403__$1;
(statearr_20411_20459[(2)] = null);

(statearr_20411_20459[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20404 === (3))){
var inst_20401 = (state_20403[(2)]);
var state_20403__$1 = state_20403;
return cljs.core.async.impl.ioc_helpers.return_chan(state_20403__$1,inst_20401);
} else {
if((state_val_20404 === (2))){
var inst_20382 = cljs.core.async.timeout((10));
var state_20403__$1 = state_20403;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20403__$1,(4),inst_20382);
} else {
if((state_val_20404 === (9))){
var inst_20380 = (state_20403[(7)]);
var inst_20392 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Still waiting for canvas",cljs.core.cst$kw$n,inst_20380], 0));
var inst_20393 = (inst_20380 - (1));
var inst_20380__$1 = inst_20393;
var state_20403__$1 = (function (){var statearr_20412 = state_20403;
(statearr_20412[(9)] = inst_20392);

(statearr_20412[(7)] = inst_20380__$1);

return statearr_20412;
})();
var statearr_20413_20460 = state_20403__$1;
(statearr_20413_20460[(2)] = null);

(statearr_20413_20460[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20404 === (5))){
var inst_20387 = canvas_20442.width;
var inst_20388 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(w_20451,inst_20387);
var state_20403__$1 = state_20403;
if(inst_20388){
var statearr_20414_20461 = state_20403__$1;
(statearr_20414_20461[(1)] = (8));

} else {
var statearr_20415_20462 = state_20403__$1;
(statearr_20415_20462[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_20404 === (10))){
var inst_20396 = (state_20403[(2)]);
var state_20403__$1 = state_20403;
var statearr_20416_20463 = state_20403__$1;
(statearr_20416_20463[(2)] = inst_20396);

(statearr_20416_20463[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20404 === (8))){
var inst_20390 = hoplon$app_pages$_index_DOT_html$draw_grid(data);
var state_20403__$1 = state_20403;
var statearr_20417_20464 = state_20403__$1;
(statearr_20417_20464[(2)] = inst_20390);

(statearr_20417_20464[(1)] = (10));


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
});})(c__16206__auto___20454,ch_20453,canvas_20442,map__20375_20443,map__20375_20444__$1,map_20445,opacity_20446,dimensions_20447,display_20448,overlay_20449,vec__20376_20450,w_20451,h_20452,map__20373,map__20373__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
;
return ((function (switch__16090__auto__,c__16206__auto___20454,ch_20453,canvas_20442,map__20375_20443,map__20375_20444__$1,map_20445,opacity_20446,dimensions_20447,display_20448,overlay_20449,vec__20376_20450,w_20451,h_20452,map__20373,map__20373__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function() {
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__ = null;
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____0 = (function (){
var statearr_20421 = [null,null,null,null,null,null,null,null,null,null];
(statearr_20421[(0)] = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__);

(statearr_20421[(1)] = (1));

return statearr_20421;
});
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____1 = (function (state_20403){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_20403);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e20422){if((e20422 instanceof Object)){
var ex__16094__auto__ = e20422;
var statearr_20423_20465 = state_20403;
(statearr_20423_20465[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_20403);

return cljs.core.cst$kw$recur;
} else {
throw e20422;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__20466 = state_20403;
state_20403 = G__20466;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__ = function(state_20403){
switch(arguments.length){
case 0:
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____0.call(this);
case 1:
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____1.call(this,state_20403);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____0;
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____1;
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___20454,ch_20453,canvas_20442,map__20375_20443,map__20375_20444__$1,map_20445,opacity_20446,dimensions_20447,display_20448,overlay_20449,vec__20376_20450,w_20451,h_20452,map__20373,map__20373__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
})();
var state__16208__auto__ = (function (){var statearr_20424 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_20424[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___20454);

return statearr_20424;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___20454,ch_20453,canvas_20442,map__20375_20443,map__20375_20444__$1,map_20445,opacity_20446,dimensions_20447,display_20448,overlay_20449,vec__20376_20450,w_20451,h_20452,map__20373,map__20373__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
);

} else {
var ctx_20467 = canvas_20442.getContext("2d");
var vec__20425_20468 = cell_count;
var x_cells_20469 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20425_20468,(0),null);
var y_cells_20470 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20425_20468,(1),null);
var cell_width_20471 = (w_20451 / x_cells_20469);
var cell_height_20472 = (h_20452 / y_cells_20470);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Canvas is correct size",cljs.core.cst$kw$dimensions,dimensions_20447,cljs.core.cst$kw$width,canvas_20442.width,cljs.core.cst$kw$height,canvas_20442.height], 0));

hoplon.app_pages._index_DOT_html.clear_transform(ctx_20467);

ctx_20467.clearRect((0),(0),w_20451,h_20452);

var temp__6361__auto___20473 = hoplon.app_pages._index_DOT_html.draw_map(ctx_20467,map_20445,dimensions_20447);
if(cljs.core.truth_(temp__6361__auto___20473)){
var ch_20474 = temp__6361__auto___20473;
var c__16206__auto___20475 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___20475,ch_20474,temp__6361__auto___20473,ctx_20467,vec__20425_20468,x_cells_20469,y_cells_20470,cell_width_20471,cell_height_20472,canvas_20442,map__20375_20443,map__20375_20444__$1,map_20445,opacity_20446,dimensions_20447,display_20448,overlay_20449,vec__20376_20450,w_20451,h_20452,map__20373,map__20373__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___20475,ch_20474,temp__6361__auto___20473,ctx_20467,vec__20425_20468,x_cells_20469,y_cells_20470,cell_width_20471,cell_height_20472,canvas_20442,map__20375_20443,map__20375_20444__$1,map_20445,opacity_20446,dimensions_20447,display_20448,overlay_20449,vec__20376_20450,w_20451,h_20452,map__20373,map__20373__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function (state_20432){
var state_val_20433 = (state_20432[(1)]);
if((state_val_20433 === (1))){
var state_20432__$1 = state_20432;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20432__$1,(2),ch_20474);
} else {
if((state_val_20433 === (2))){
var inst_20429 = (state_20432[(2)]);
var inst_20430 = hoplon$app_pages$_index_DOT_html$draw_grid(data);
var state_20432__$1 = (function (){var statearr_20434 = state_20432;
(statearr_20434[(7)] = inst_20429);

return statearr_20434;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_20432__$1,inst_20430);
} else {
return null;
}
}
});})(c__16206__auto___20475,ch_20474,temp__6361__auto___20473,ctx_20467,vec__20425_20468,x_cells_20469,y_cells_20470,cell_width_20471,cell_height_20472,canvas_20442,map__20375_20443,map__20375_20444__$1,map_20445,opacity_20446,dimensions_20447,display_20448,overlay_20449,vec__20376_20450,w_20451,h_20452,map__20373,map__20373__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
;
return ((function (switch__16090__auto__,c__16206__auto___20475,ch_20474,temp__6361__auto___20473,ctx_20467,vec__20425_20468,x_cells_20469,y_cells_20470,cell_width_20471,cell_height_20472,canvas_20442,map__20375_20443,map__20375_20444__$1,map_20445,opacity_20446,dimensions_20447,display_20448,overlay_20449,vec__20376_20450,w_20451,h_20452,map__20373,map__20373__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function() {
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__ = null;
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____0 = (function (){
var statearr_20438 = [null,null,null,null,null,null,null,null];
(statearr_20438[(0)] = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__);

(statearr_20438[(1)] = (1));

return statearr_20438;
});
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____1 = (function (state_20432){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_20432);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e20439){if((e20439 instanceof Object)){
var ex__16094__auto__ = e20439;
var statearr_20440_20476 = state_20432;
(statearr_20440_20476[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_20432);

return cljs.core.cst$kw$recur;
} else {
throw e20439;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__20477 = state_20432;
state_20432 = G__20477;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__ = function(state_20432){
switch(arguments.length){
case 0:
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____0.call(this);
case 1:
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____1.call(this,state_20432);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____0;
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto____1;
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___20475,ch_20474,temp__6361__auto___20473,ctx_20467,vec__20425_20468,x_cells_20469,y_cells_20470,cell_width_20471,cell_height_20472,canvas_20442,map__20375_20443,map__20375_20444__$1,map_20445,opacity_20446,dimensions_20447,display_20448,overlay_20449,vec__20376_20450,w_20451,h_20452,map__20373,map__20373__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
})();
var state__16208__auto__ = (function (){var statearr_20441 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_20441[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___20475);

return statearr_20441;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___20475,ch_20474,temp__6361__auto___20473,ctx_20467,vec__20425_20468,x_cells_20469,y_cells_20470,cell_width_20471,cell_height_20472,canvas_20442,map__20375_20443,map__20375_20444__$1,map_20445,opacity_20446,dimensions_20447,display_20448,overlay_20449,vec__20376_20450,w_20451,h_20452,map__20373,map__20373__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
);

} else {
hoplon.app_pages._index_DOT_html.draw_data(ctx_20467,display_20448,opacity_20446,weather_data,cell_count,dimensions_20447);

hoplon.app_pages._index_DOT_html.draw_overlay(ctx_20467,overlay_20449,weather_data,cell_count,dimensions_20447);

hoplon.app_pages._index_DOT_html.draw_selected_cell(ctx_20467,selected_cell,cell_count,dimensions_20447);

hoplon.app_pages._index_DOT_html.draw_wind_stability(ctx_20467,wind_stability_areas,cell_count,dimensions_20447);
}
}

return console.timeEnd("draw-grid");
});
hoplon.app_pages._index_DOT_html.ESCAPE_KEY = (27);
hoplon.app_pages._index_DOT_html.ENTER_KEY = (13);
hoplon.app_pages._index_DOT_html.two_column = (function hoplon$app_pages$_index_DOT_html$two_column(left,right){
var G__20482 = cljs.core.cst$kw$class;
var G__20483 = "two-column";
var G__20484 = (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$class,"left-column",left) : hoplon.core.div.call(null,cljs.core.cst$kw$class,"left-column",left));
var G__20485 = (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$class,"right-column",right) : hoplon.core.div.call(null,cljs.core.cst$kw$class,"right-column",right));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__20482,G__20483,G__20484,G__20485) : hoplon.core.div.call(null,G__20482,G__20483,G__20484,G__20485));
});
hoplon.app_pages._index_DOT_html.edit_field = (function hoplon$app_pages$_index_DOT_html$edit_field(var_args){
var args20488 = [];
var len__8202__auto___20509 = arguments.length;
var i__8203__auto___20510 = (0);
while(true){
if((i__8203__auto___20510 < len__8202__auto___20509)){
args20488.push((arguments[i__8203__auto___20510]));

var G__20511 = (i__8203__auto___20510 + (1));
i__8203__auto___20510 = G__20511;
continue;
} else {
}
break;
}

var G__20490 = args20488.length;
switch (G__20490) {
case 2:
return hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args20488.length)].join('')));

}
});

hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2 = (function (c,path){
return hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3(c,path,cljs.core.PersistentArrayMap.EMPTY);
});

hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3 = (function (c,path,opts){
var map__20491 = opts;
var map__20491__$1 = ((((!((map__20491 == null)))?((((map__20491.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20491.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20491):map__20491);
var change_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20491__$1,cljs.core.cst$kw$change_DASH_fn);
var G__20496 = cljs.core.cst$kw$type;
var G__20497 = "text";
var G__20498 = cljs.core.cst$kw$value;
var G__20499 = javelin.core.formula(((function (G__20496,G__20497,G__20498,map__20491,map__20491__$1,change_fn){
return (function (G__20504,G__20503,G__20502){
return (G__20502.cljs$core$IFn$_invoke$arity$2 ? G__20502.cljs$core$IFn$_invoke$arity$2(G__20503,G__20504) : G__20502.call(null,G__20503,G__20504));
});})(G__20496,G__20497,G__20498,map__20491,map__20491__$1,change_fn))
).call(null,path,c,cljs.core.get_in);
var G__20500 = cljs.core.cst$kw$change;
var G__20501 = (cljs.core.truth_(change_fn)?((function (G__20496,G__20497,G__20498,G__20499,G__20500,map__20491,map__20491__$1,change_fn){
return (function (p1__20486_SHARP_){
var G__20506 = (function (){var G__20507 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__20486_SHARP_) : cljs.core.deref.call(null,p1__20486_SHARP_));
return Number(G__20507);
})();
return (change_fn.cljs$core$IFn$_invoke$arity$1 ? change_fn.cljs$core$IFn$_invoke$arity$1(G__20506) : change_fn.call(null,G__20506));
});})(G__20496,G__20497,G__20498,G__20499,G__20500,map__20491,map__20491__$1,change_fn))
:((function (G__20496,G__20497,G__20498,G__20499,G__20500,map__20491,map__20491__$1,change_fn){
return (function (p1__20487_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(c,cljs.core.assoc_in,path,(function (){var G__20508 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__20487_SHARP_) : cljs.core.deref.call(null,p1__20487_SHARP_));
return Number(G__20508);
})());
});})(G__20496,G__20497,G__20498,G__20499,G__20500,map__20491,map__20491__$1,change_fn))
);
return (hoplon.core.input.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.input.cljs$core$IFn$_invoke$arity$6(G__20496,G__20497,G__20498,G__20499,G__20500,G__20501) : hoplon.core.input.call(null,G__20496,G__20497,G__20498,G__20499,G__20500,G__20501));
});

hoplon.app_pages._index_DOT_html.edit_field.cljs$lang$maxFixedArity = 3;

hoplon.app_pages._index_DOT_html.time_entry = (function hoplon$app_pages$_index_DOT_html$time_entry(c,path){
var G__20535 = cljs.core.cst$kw$class;
var G__20536 = "time-params";
var G__20537 = (function (){var G__20540 = (function (){var G__20541 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__20535,G__20536){
return (function (p1__20513_SHARP_){
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$class,"time-entry-label",p1__20513_SHARP_) : hoplon.core.td.call(null,cljs.core.cst$kw$class,"time-entry-label",p1__20513_SHARP_));
});})(G__20535,G__20536))
,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Day","Hour","Minute"], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__20541) : hoplon.core.tr.call(null,G__20541));
})();
return (hoplon.core.thead.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.thead.cljs$core$IFn$_invoke$arity$1(G__20540) : hoplon.core.thead.call(null,G__20540));
})();
var G__20538 = (function (){var G__20545 = (function (){var G__20547 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__20535,G__20536,G__20537){
return (function (p1__20514_SHARP_){
var G__20548 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(c,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,p1__20514_SHARP_));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__20548) : hoplon.core.td.call(null,G__20548));
});})(G__20535,G__20536,G__20537))
,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$day,cljs.core.cst$kw$hour,cljs.core.cst$kw$minute], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__20547) : hoplon.core.tr.call(null,G__20547));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1(G__20545) : hoplon.core.tbody.call(null,G__20545));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$4(G__20535,G__20536,G__20537,G__20538) : hoplon.core.table.call(null,G__20535,G__20536,G__20537,G__20538));
});
hoplon.app_pages._index_DOT_html.button_bar = (function hoplon$app_pages$_index_DOT_html$button_bar(){
var G__20613 = cljs.core.cst$kw$class;
var G__20614 = "button-bar";
var G__20615 = (function (){var G__20621 = cljs.core.cst$kw$id;
var G__20622 = "enlarge-grid";
var G__20623 = cljs.core.cst$kw$click;
var G__20624 = ((function (G__20621,G__20622,G__20623,G__20613,G__20614){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.display_params,cljs.core.update,cljs.core.cst$kw$dimensions,((function (G__20621,G__20622,G__20623,G__20613,G__20614){
return (function (p__20628){
var vec__20629 = p__20628;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20629,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20629,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x + (50)),(y + (50))], null);
});})(G__20621,G__20622,G__20623,G__20613,G__20614))
);
});})(G__20621,G__20622,G__20623,G__20613,G__20614))
;
var G__20625 = cljs.core.cst$kw$title;
var G__20626 = "Enlarge grid";
var G__20627 = (hoplon.core.img.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$src,"images/bigger.png") : hoplon.core.img.call(null,cljs.core.cst$kw$src,"images/bigger.png"));
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$7 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$7(G__20621,G__20622,G__20623,G__20624,G__20625,G__20626,G__20627) : hoplon.core.button.call(null,G__20621,G__20622,G__20623,G__20624,G__20625,G__20626,G__20627));
})();
var G__20616 = (function (){var G__20636 = cljs.core.cst$kw$id;
var G__20637 = "shrink-grid";
var G__20638 = cljs.core.cst$kw$click;
var G__20639 = ((function (G__20636,G__20637,G__20638,G__20613,G__20614,G__20615){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.display_params,cljs.core.update,cljs.core.cst$kw$dimensions,((function (G__20636,G__20637,G__20638,G__20613,G__20614,G__20615){
return (function (p__20643){
var vec__20644 = p__20643;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20644,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20644,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x - (50)),(y - (50))], null);
});})(G__20636,G__20637,G__20638,G__20613,G__20614,G__20615))
);
});})(G__20636,G__20637,G__20638,G__20613,G__20614,G__20615))
;
var G__20640 = cljs.core.cst$kw$title;
var G__20641 = "Shrink grid";
var G__20642 = (hoplon.core.img.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$src,"images/smaller.png") : hoplon.core.img.call(null,cljs.core.cst$kw$src,"images/smaller.png"));
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$7 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$7(G__20636,G__20637,G__20638,G__20639,G__20640,G__20641,G__20642) : hoplon.core.button.call(null,G__20636,G__20637,G__20638,G__20639,G__20640,G__20641,G__20642));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__20613,G__20614,G__20615,G__20616) : hoplon.core.div.call(null,G__20613,G__20614,G__20615,G__20616));
});
hoplon.app_pages._index_DOT_html.weather_grid = (function hoplon$app_pages$_index_DOT_html$weather_grid(){
var vec__20785 = javelin.core.cell_map(cljs.core.identity,javelin.core.formula((function (p__20788){
var vec__20789 = p__20788;
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20789,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20789,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [width,height], null);
})).call(null,hoplon.app_pages._index_DOT_html.dimensions));
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20785,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20785,(1),null);
var vec__20792 = javelin.core.cell_map(cljs.core.identity,javelin.core.formula(((function (vec__20785,width,height){
return (function (p__20795){
var map__20796 = p__20795;
var map__20796__$1 = ((((!((map__20796 == null)))?((((map__20796.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20796.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20796):map__20796);
var map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20796__$1,cljs.core.cst$kw$map);
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [map], null);
});})(vec__20785,width,height))
).call(null,hoplon.app_pages._index_DOT_html.display_params));
var map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20792,(0),null);
var vec__20798 = javelin.core.cell_map(cljs.core.identity,javelin.core.formula(((function (vec__20792,map,vec__20785,width,height){
return (function (p__20801){
var vec__20802 = p__20801;
var nx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20802,(0),null);
var ny = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20802,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [nx,ny], null);
});})(vec__20792,map,vec__20785,width,height))
).call(null,hoplon.app_pages._index_DOT_html.cell_count));
var nx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20798,(0),null);
var ny = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20798,(1),null);
var G__20806 = cljs.core.cst$kw$id;
var G__20807 = "weather-grid-stack";
var G__20808 = cljs.core.cst$kw$width;
var G__20809 = javelin.core.formula(((function (G__20806,G__20807,G__20808,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (G__20815){
return G__20815;
});})(G__20806,G__20807,G__20808,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
).call(null,width);
var G__20810 = cljs.core.cst$kw$height;
var G__20811 = javelin.core.formula(((function (G__20806,G__20807,G__20808,G__20809,G__20810,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (G__20816){
return G__20816;
});})(G__20806,G__20807,G__20808,G__20809,G__20810,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
).call(null,height);
var G__20812 = (function (){var iter__7873__auto__ = ((function (G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function hoplon$app_pages$_index_DOT_html$weather_grid_$_iter__20817(s__20818){
return (new cljs.core.LazySeq(null,((function (G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (){
var s__20818__$1 = s__20818;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__20818__$1);
if(temp__6363__auto__){
var s__20818__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__20818__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__20818__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__20820 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__20819 = (0);
while(true){
if((i__20819 < size__7872__auto__)){
var vec__20859 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__20819);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20859,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20859,(1),null);
cljs.core.chunk_append(b__20820,(function (){var G__20862 = cljs.core.cst$kw$id;
var G__20863 = hoplon.app_pages._index_DOT_html.map_image_id(k);
var G__20864 = cljs.core.cst$kw$width;
var G__20865 = javelin.core.formula(((function (i__20819,G__20862,G__20863,G__20864,vec__20859,k,v,c__7871__auto__,size__7872__auto__,b__20820,s__20818__$2,temp__6363__auto__,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (G__20872){
return G__20872;
});})(i__20819,G__20862,G__20863,G__20864,vec__20859,k,v,c__7871__auto__,size__7872__auto__,b__20820,s__20818__$2,temp__6363__auto__,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
).call(null,width);
var G__20866 = cljs.core.cst$kw$height;
var G__20867 = javelin.core.formula(((function (i__20819,G__20862,G__20863,G__20864,G__20865,G__20866,vec__20859,k,v,c__7871__auto__,size__7872__auto__,b__20820,s__20818__$2,temp__6363__auto__,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (G__20873){
return G__20873;
});})(i__20819,G__20862,G__20863,G__20864,G__20865,G__20866,vec__20859,k,v,c__7871__auto__,size__7872__auto__,b__20820,s__20818__$2,temp__6363__auto__,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
).call(null,height);
var G__20868 = cljs.core.cst$kw$style;
var G__20869 = javelin.core.formula(((function (i__20819,G__20862,G__20863,G__20864,G__20865,G__20866,G__20867,G__20868,vec__20859,k,v,c__7871__auto__,size__7872__auto__,b__20820,s__20818__$2,temp__6363__auto__,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (G__20874,G__20876,G__20875){
if(cljs.core.truth_((G__20874.cljs$core$IFn$_invoke$arity$2 ? G__20874.cljs$core$IFn$_invoke$arity$2(G__20875,G__20876) : G__20874.call(null,G__20875,G__20876)))){
return "";
} else {
return "display: none";
}
});})(i__20819,G__20862,G__20863,G__20864,G__20865,G__20866,G__20867,G__20868,vec__20859,k,v,c__7871__auto__,size__7872__auto__,b__20820,s__20818__$2,temp__6363__auto__,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
).call(null,cljs.core._EQ_,map,k);
var G__20870 = cljs.core.cst$kw$src;
var G__20871 = v;
return (hoplon.core.img.cljs$core$IFn$_invoke$arity$10 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$10(G__20862,G__20863,G__20864,G__20865,G__20866,G__20867,G__20868,G__20869,G__20870,G__20871) : hoplon.core.img.call(null,G__20862,G__20863,G__20864,G__20865,G__20866,G__20867,G__20868,G__20869,G__20870,G__20871));
})());

var G__20922 = (i__20819 + (1));
i__20819 = G__20922;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__20820),hoplon$app_pages$_index_DOT_html$weather_grid_$_iter__20817(cljs.core.chunk_rest(s__20818__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__20820),null);
}
} else {
var vec__20877 = cljs.core.first(s__20818__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20877,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20877,(1),null);
return cljs.core.cons((function (){var G__20880 = cljs.core.cst$kw$id;
var G__20881 = hoplon.app_pages._index_DOT_html.map_image_id(k);
var G__20882 = cljs.core.cst$kw$width;
var G__20883 = javelin.core.formula(((function (G__20880,G__20881,G__20882,vec__20877,k,v,s__20818__$2,temp__6363__auto__,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (G__20890){
return G__20890;
});})(G__20880,G__20881,G__20882,vec__20877,k,v,s__20818__$2,temp__6363__auto__,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
).call(null,width);
var G__20884 = cljs.core.cst$kw$height;
var G__20885 = javelin.core.formula(((function (G__20880,G__20881,G__20882,G__20883,G__20884,vec__20877,k,v,s__20818__$2,temp__6363__auto__,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (G__20891){
return G__20891;
});})(G__20880,G__20881,G__20882,G__20883,G__20884,vec__20877,k,v,s__20818__$2,temp__6363__auto__,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
).call(null,height);
var G__20886 = cljs.core.cst$kw$style;
var G__20887 = javelin.core.formula(((function (G__20880,G__20881,G__20882,G__20883,G__20884,G__20885,G__20886,vec__20877,k,v,s__20818__$2,temp__6363__auto__,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (G__20892,G__20894,G__20893){
if(cljs.core.truth_((G__20892.cljs$core$IFn$_invoke$arity$2 ? G__20892.cljs$core$IFn$_invoke$arity$2(G__20893,G__20894) : G__20892.call(null,G__20893,G__20894)))){
return "";
} else {
return "display: none";
}
});})(G__20880,G__20881,G__20882,G__20883,G__20884,G__20885,G__20886,vec__20877,k,v,s__20818__$2,temp__6363__auto__,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
).call(null,cljs.core._EQ_,map,k);
var G__20888 = cljs.core.cst$kw$src;
var G__20889 = v;
return (hoplon.core.img.cljs$core$IFn$_invoke$arity$10 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$10(G__20880,G__20881,G__20882,G__20883,G__20884,G__20885,G__20886,G__20887,G__20888,G__20889) : hoplon.core.img.call(null,G__20880,G__20881,G__20882,G__20883,G__20884,G__20885,G__20886,G__20887,G__20888,G__20889));
})(),hoplon$app_pages$_index_DOT_html$weather_grid_$_iter__20817(cljs.core.rest(s__20818__$2)));
}
} else {
return null;
}
break;
}
});})(G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
,null,null));
});})(G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
;
return iter__7873__auto__(hoplon.app_pages._index_DOT_html.map_image);
})();
var G__20813 = (function (){var G__20896 = cljs.core.cst$kw$id;
var G__20897 = "blank-map";
var G__20898 = cljs.core.cst$kw$width;
var G__20899 = javelin.core.formula(((function (G__20896,G__20897,G__20898,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (G__20904){
return G__20904;
});})(G__20896,G__20897,G__20898,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
).call(null,width);
var G__20900 = cljs.core.cst$kw$height;
var G__20901 = javelin.core.formula(((function (G__20896,G__20897,G__20898,G__20899,G__20900,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (G__20905){
return G__20905;
});})(G__20896,G__20897,G__20898,G__20899,G__20900,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
).call(null,height);
var G__20902 = cljs.core.cst$kw$src;
var G__20903 = "images/blank.png";
return (hoplon.core.img.cljs$core$IFn$_invoke$arity$8 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$8(G__20896,G__20897,G__20898,G__20899,G__20900,G__20901,G__20902,G__20903) : hoplon.core.img.call(null,G__20896,G__20897,G__20898,G__20899,G__20900,G__20901,G__20902,G__20903));
})();
var G__20814 = (function (){var G__20908 = cljs.core.cst$kw$id;
var G__20909 = "weather-grid";
var G__20910 = cljs.core.cst$kw$css;
var G__20911 = javelin.core.formula(((function (G__20908,G__20909,G__20910,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,G__20813,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (G__20919){
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cursor,(function (){var G__20918 = (cljs.core.truth_((G__20919 instanceof cljs.core.Keyword))?G__20919.fqn:null);
switch (G__20918) {
case "select":
return "pointer";

break;
case "wind-stability":
return "crosshair";

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(G__20919)].join('')));

}
})()], null);
});})(G__20908,G__20909,G__20910,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,G__20813,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
).call(null,hoplon.app_pages._index_DOT_html.current_tool);
var G__20912 = cljs.core.cst$kw$width;
var G__20913 = javelin.core.formula(((function (G__20908,G__20909,G__20910,G__20911,G__20912,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,G__20813,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (G__20920){
return G__20920;
});})(G__20908,G__20909,G__20910,G__20911,G__20912,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,G__20813,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
).call(null,width);
var G__20914 = cljs.core.cst$kw$height;
var G__20915 = javelin.core.formula(((function (G__20908,G__20909,G__20910,G__20911,G__20912,G__20913,G__20914,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,G__20813,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (G__20921){
return G__20921;
});})(G__20908,G__20909,G__20910,G__20911,G__20912,G__20913,G__20914,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,G__20813,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
).call(null,height);
var G__20916 = cljs.core.cst$kw$click;
var G__20917 = ((function (G__20908,G__20909,G__20910,G__20911,G__20912,G__20913,G__20914,G__20915,G__20916,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,G__20813,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height){
return (function (p1__20647_SHARP_){
return hoplon.app_pages._index_DOT_html.grid_click(p1__20647_SHARP_,"weather-grid",(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.cell_count) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.cell_count)),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.dimensions) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.dimensions)));
});})(G__20908,G__20909,G__20910,G__20911,G__20912,G__20913,G__20914,G__20915,G__20916,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,G__20813,vec__20798,nx,ny,vec__20792,map,vec__20785,width,height))
;
return (hoplon.core.canvas.cljs$core$IFn$_invoke$arity$10 ? hoplon.core.canvas.cljs$core$IFn$_invoke$arity$10(G__20908,G__20909,G__20910,G__20911,G__20912,G__20913,G__20914,G__20915,G__20916,G__20917) : hoplon.core.canvas.call(null,G__20908,G__20909,G__20910,G__20911,G__20912,G__20913,G__20914,G__20915,G__20916,G__20917));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$9 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$9(G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,G__20813,G__20814) : hoplon.core.div.call(null,G__20806,G__20807,G__20808,G__20809,G__20810,G__20811,G__20812,G__20813,G__20814));
});
hoplon.app_pages._index_DOT_html.display_controls = (function hoplon$app_pages$_index_DOT_html$display_controls(){
var select_row = (function (p__21239,help_path){
var map__21240 = p__21239;
var map__21240__$1 = ((((!((map__21240 == null)))?((((map__21240.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21240.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__21240):map__21240);
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21240__$1,cljs.core.cst$kw$label);
var k = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21240__$1,cljs.core.cst$kw$k);
var key__GT_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21240__$1,cljs.core.cst$kw$key_DASH__GT_name);
var name__GT_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21240__$1,cljs.core.cst$kw$name_DASH__GT_key);
var G__21242 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(label) : hoplon.core.td.call(null,label));
var G__21243 = (function (){var G__21348 = (function (){var G__21350 = cljs.core.cst$kw$change;
var G__21351 = ((function (G__21350,G__21242,map__21240,map__21240__$1,label,k,key__GT_name,name__GT_key){
return (function (p1__20924_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.display_params,cljs.core.assoc,k,(function (){var G__21353 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__20924_SHARP_) : cljs.core.deref.call(null,p1__20924_SHARP_));
return (name__GT_key.cljs$core$IFn$_invoke$arity$1 ? name__GT_key.cljs$core$IFn$_invoke$arity$1(G__21353) : name__GT_key.call(null,G__21353));
})());
});})(G__21350,G__21242,map__21240,map__21240__$1,label,k,key__GT_name,name__GT_key))
;
var G__21352 = (function (){var iter__7873__auto__ = ((function (G__21350,G__21351,G__21242,map__21240,map__21240__$1,label,k,key__GT_name,name__GT_key){
return (function hoplon$app_pages$_index_DOT_html$display_controls_$_iter__21354(s__21355){
return (new cljs.core.LazySeq(null,((function (G__21350,G__21351,G__21242,map__21240,map__21240__$1,label,k,key__GT_name,name__GT_key){
return (function (){
var s__21355__$1 = s__21355;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__21355__$1);
if(temp__6363__auto__){
var s__21355__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__21355__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__21355__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__21357 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__21356 = (0);
while(true){
if((i__21356 < size__7872__auto__)){
var name = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__21356);
cljs.core.chunk_append(b__21357,(function (){var G__21415 = cljs.core.cst$kw$value;
var G__21416 = name;
var G__21417 = cljs.core.cst$kw$selected;
var G__21418 = javelin.core.formula(((function (i__21356,G__21415,G__21416,G__21417,name,c__7871__auto__,size__7872__auto__,b__21357,s__21355__$2,temp__6363__auto__,G__21350,G__21351,G__21242,map__21240,map__21240__$1,label,k,key__GT_name,name__GT_key){
return (function (G__21420,G__21421,G__21424,G__21423,G__21422){
var G__21426 = (function (){var G__21428 = (G__21422.cljs$core$IFn$_invoke$arity$1 ? G__21422.cljs$core$IFn$_invoke$arity$1(G__21423) : G__21422.call(null,G__21423));
return (G__21421.cljs$core$IFn$_invoke$arity$1 ? G__21421.cljs$core$IFn$_invoke$arity$1(G__21428) : G__21421.call(null,G__21428));
})();
var G__21427 = G__21424;
return (G__21420.cljs$core$IFn$_invoke$arity$2 ? G__21420.cljs$core$IFn$_invoke$arity$2(G__21426,G__21427) : G__21420.call(null,G__21426,G__21427));
});})(i__21356,G__21415,G__21416,G__21417,name,c__7871__auto__,size__7872__auto__,b__21357,s__21355__$2,temp__6363__auto__,G__21350,G__21351,G__21242,map__21240,map__21240__$1,label,k,key__GT_name,name__GT_key))
).call(null,cljs.core._EQ_,key__GT_name,name,hoplon.app_pages._index_DOT_html.display_params,k);
var G__21419 = name;
return (hoplon.core.option.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.option.cljs$core$IFn$_invoke$arity$5(G__21415,G__21416,G__21417,G__21418,G__21419) : hoplon.core.option.call(null,G__21415,G__21416,G__21417,G__21418,G__21419));
})());

var G__21552 = (i__21356 + (1));
i__21356 = G__21552;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__21357),hoplon$app_pages$_index_DOT_html$display_controls_$_iter__21354(cljs.core.chunk_rest(s__21355__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__21357),null);
}
} else {
var name = cljs.core.first(s__21355__$2);
return cljs.core.cons((function (){var G__21438 = cljs.core.cst$kw$value;
var G__21439 = name;
var G__21440 = cljs.core.cst$kw$selected;
var G__21441 = javelin.core.formula(((function (G__21438,G__21439,G__21440,name,s__21355__$2,temp__6363__auto__,G__21350,G__21351,G__21242,map__21240,map__21240__$1,label,k,key__GT_name,name__GT_key){
return (function (G__21443,G__21444,G__21447,G__21446,G__21445){
var G__21449 = (function (){var G__21451 = (G__21445.cljs$core$IFn$_invoke$arity$1 ? G__21445.cljs$core$IFn$_invoke$arity$1(G__21446) : G__21445.call(null,G__21446));
return (G__21444.cljs$core$IFn$_invoke$arity$1 ? G__21444.cljs$core$IFn$_invoke$arity$1(G__21451) : G__21444.call(null,G__21451));
})();
var G__21450 = G__21447;
return (G__21443.cljs$core$IFn$_invoke$arity$2 ? G__21443.cljs$core$IFn$_invoke$arity$2(G__21449,G__21450) : G__21443.call(null,G__21449,G__21450));
});})(G__21438,G__21439,G__21440,name,s__21355__$2,temp__6363__auto__,G__21350,G__21351,G__21242,map__21240,map__21240__$1,label,k,key__GT_name,name__GT_key))
).call(null,cljs.core._EQ_,key__GT_name,name,hoplon.app_pages._index_DOT_html.display_params,k);
var G__21442 = name;
return (hoplon.core.option.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.option.cljs$core$IFn$_invoke$arity$5(G__21438,G__21439,G__21440,G__21441,G__21442) : hoplon.core.option.call(null,G__21438,G__21439,G__21440,G__21441,G__21442));
})(),hoplon$app_pages$_index_DOT_html$display_controls_$_iter__21354(cljs.core.rest(s__21355__$2)));
}
} else {
return null;
}
break;
}
});})(G__21350,G__21351,G__21242,map__21240,map__21240__$1,label,k,key__GT_name,name__GT_key))
,null,null));
});})(G__21350,G__21351,G__21242,map__21240,map__21240__$1,label,k,key__GT_name,name__GT_key))
;
return iter__7873__auto__(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.keys(name__GT_key),"None"));
})();
return (hoplon.core.select.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.select.cljs$core$IFn$_invoke$arity$3(G__21350,G__21351,G__21352) : hoplon.core.select.call(null,G__21350,G__21351,G__21352));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21348) : hoplon.core.td.call(null,G__21348));
})();
var G__21244 = (function (){var G__21452 = hoplon.app_pages._index_DOT_html.help_for(help_path);
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21452) : hoplon.core.td.call(null,G__21452));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__21242,G__21243,G__21244) : hoplon.core.tr.call(null,G__21242,G__21243,G__21244));
});
var G__21453 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Display controls") : hoplon.core.legend.call(null,"Display controls"));
var G__21454 = (function (){var G__21502 = cljs.core.cst$kw$class;
var G__21503 = "display-controls";
var G__21504 = (function (){var G__21528 = (function (){var G__21529 = select_row(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$label,"Map",cljs.core.cst$kw$k,cljs.core.cst$kw$map,cljs.core.cst$kw$key_DASH__GT_name,hoplon.app_pages._index_DOT_html.map_key__GT_name,cljs.core.cst$kw$name_DASH__GT_key,hoplon.app_pages._index_DOT_html.map_name__GT_key], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$display_DASH_controls,cljs.core.cst$kw$map], null));
var G__21530 = select_row(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$label,"Display",cljs.core.cst$kw$k,cljs.core.cst$kw$display,cljs.core.cst$kw$key_DASH__GT_name,hoplon.app_pages._index_DOT_html.display_key__GT_name,cljs.core.cst$kw$name_DASH__GT_key,hoplon.app_pages._index_DOT_html.display_name__GT_key], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$display_DASH_controls,cljs.core.cst$kw$display], null));
var G__21531 = select_row(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$label,"Overlay",cljs.core.cst$kw$k,cljs.core.cst$kw$overlay,cljs.core.cst$kw$key_DASH__GT_name,hoplon.app_pages._index_DOT_html.overlay_key__GT_name,cljs.core.cst$kw$name_DASH__GT_key,hoplon.app_pages._index_DOT_html.overlay_name__GT_key], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$display_DASH_controls,cljs.core.cst$kw$overlay], null));
var G__21532 = (function (){var G__21533 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("Opacity:") : hoplon.core.td.call(null,"Opacity:"));
var G__21534 = (function (){var G__21543 = (function (){var G__21547 = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$type,"range",cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,(100),cljs.core.cst$kw$value,javelin.core.formula(((function (G__21533,G__21529,G__21530,G__21531,G__21502,G__21503,G__21453,select_row){
return (function (G__21548,G__21549){
var G__21550 = (cljs.core.cst$kw$opacity.cljs$core$IFn$_invoke$arity$1(G__21549) * (100));
return (G__21548.cljs$core$IFn$_invoke$arity$1 ? G__21548.cljs$core$IFn$_invoke$arity$1(G__21550) : G__21548.call(null,G__21550));
});})(G__21533,G__21529,G__21530,G__21531,G__21502,G__21503,G__21453,select_row))
).call(null,cljs.core.long$,hoplon.app_pages._index_DOT_html.display_params),cljs.core.cst$kw$change,((function (G__21533,G__21529,G__21530,G__21531,G__21502,G__21503,G__21453,select_row){
return (function (p1__20925_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.display_params,cljs.core.assoc,cljs.core.cst$kw$opacity,((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__20925_SHARP_) : cljs.core.deref.call(null,p1__20925_SHARP_)) / 100.0));
});})(G__21533,G__21529,G__21530,G__21531,G__21502,G__21503,G__21453,select_row))
], null);
return (hoplon.core.input.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.input.cljs$core$IFn$_invoke$arity$1(G__21547) : hoplon.core.input.call(null,G__21547));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21543) : hoplon.core.td.call(null,G__21543));
})();
var G__21535 = (function (){var G__21551 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$display_DASH_controls,cljs.core.cst$kw$opacity], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21551) : hoplon.core.td.call(null,G__21551));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__21533,G__21534,G__21535) : hoplon.core.tr.call(null,G__21533,G__21534,G__21535));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$4(G__21529,G__21530,G__21531,G__21532) : hoplon.core.tbody.call(null,G__21529,G__21530,G__21531,G__21532));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$1(G__21528) : hoplon.core.table.call(null,G__21528));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__21502,G__21503,G__21504) : hoplon.core.div.call(null,G__21502,G__21503,G__21504));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2(G__21453,G__21454) : hoplon.core.fieldset.call(null,G__21453,G__21454));
});
hoplon.app_pages._index_DOT_html.weather_parameters = (function hoplon$app_pages$_index_DOT_html$weather_parameters(){
var G__21712 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Weather parameters") : hoplon.core.legend.call(null,"Weather parameters"));
var G__21713 = (function (){var G__21791 = cljs.core.cst$kw$id;
var G__21792 = "general-params";
var G__21793 = (function (){var G__21832 = (function (){var iter__7873__auto__ = ((function (G__21791,G__21792,G__21712){
return (function hoplon$app_pages$_index_DOT_html$weather_parameters_$_iter__21833(s__21834){
return (new cljs.core.LazySeq(null,((function (G__21791,G__21792,G__21712){
return (function (){
var s__21834__$1 = s__21834;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__21834__$1);
if(temp__6363__auto__){
var s__21834__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__21834__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__21834__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__21836 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__21835 = (0);
while(true){
if((i__21835 < size__7872__auto__)){
var vec__21855 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__21835);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21855,(0),null);
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21855,(1),null);
var updater = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21855,(2),null);
cljs.core.chunk_append(b__21836,(function (){var G__21858 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(label) : hoplon.core.td.call(null,label));
var G__21859 = (function (){var G__21861 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.weather_params,selector,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$change_DASH_fn,updater], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21861) : hoplon.core.td.call(null,G__21861));
})();
var G__21860 = (function (){var G__21862 = hoplon.app_pages._index_DOT_html.help_for(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params], null),selector));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21862) : hoplon.core.td.call(null,G__21862));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__21858,G__21859,G__21860) : hoplon.core.tr.call(null,G__21858,G__21859,G__21860));
})());

var G__21871 = (i__21835 + (1));
i__21835 = G__21871;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__21836),hoplon$app_pages$_index_DOT_html$weather_parameters_$_iter__21833(cljs.core.chunk_rest(s__21834__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__21836),null);
}
} else {
var vec__21863 = cljs.core.first(s__21834__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21863,(0),null);
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21863,(1),null);
var updater = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21863,(2),null);
return cljs.core.cons((function (){var G__21866 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(label) : hoplon.core.td.call(null,label));
var G__21867 = (function (){var G__21869 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.weather_params,selector,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$change_DASH_fn,updater], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21869) : hoplon.core.td.call(null,G__21869));
})();
var G__21868 = (function (){var G__21870 = hoplon.app_pages._index_DOT_html.help_for(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params], null),selector));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21870) : hoplon.core.td.call(null,G__21870));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__21866,G__21867,G__21868) : hoplon.core.tr.call(null,G__21866,G__21867,G__21868));
})(),hoplon$app_pages$_index_DOT_html$weather_parameters_$_iter__21833(cljs.core.rest(s__21834__$2)));
}
} else {
return null;
}
break;
}
});})(G__21791,G__21792,G__21712))
,null,null));
});})(G__21791,G__21792,G__21712))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Seed",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$seed], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Crossfade",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$crossfade], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Zoom",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$feature_DASH_size], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Max pressure",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pressure,cljs.core.cst$kw$max], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Min pressure",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pressure,cljs.core.cst$kw$min], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Prevailing wind",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prevailing_DASH_wind,cljs.core.cst$kw$heading], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Wind uniformity",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_uniformity], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Temp uniformity",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$temp_DASH_uniformity], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Warp strength",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$turbulence,cljs.core.cst$kw$power], null)], null)], null));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1(G__21832) : hoplon.core.tbody.call(null,G__21832));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$3(G__21791,G__21792,G__21793) : hoplon.core.table.call(null,G__21791,G__21792,G__21793));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2(G__21712,G__21713) : hoplon.core.fieldset.call(null,G__21712,G__21713));
});
var indexed_wind_stability_areas_22115 = javelin.core.formula((function (G__21874,G__21872,G__21873){
var G__21875 = G__21873;
var G__21876 = cljs.core.cst$kw$wind_DASH_stability_DASH_areas.cljs$core$IFn$_invoke$arity$1(G__21874);
return (G__21872.cljs$core$IFn$_invoke$arity$2 ? G__21872.cljs$core$IFn$_invoke$arity$2(G__21875,G__21876) : G__21872.call(null,G__21875,G__21876));
})).call(null,hoplon.app_pages._index_DOT_html.weather_params,cljs.core.map_indexed,cljs.core.vector);
hoplon.app_pages._index_DOT_html.wind_stability_parameters = ((function (indexed_wind_stability_areas_22115){
return (function hoplon$app_pages$_index_DOT_html$wind_stability_parameters(){
var G__21998 = (function (){var G__22001 = "Wind stability regions";
var G__22002 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas], null));
return (hoplon.core.legend.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$2(G__22001,G__22002) : hoplon.core.legend.call(null,G__22001,G__22002));
})();
var G__21999 = hoplon.core.loop_tpl_STAR_(indexed_wind_stability_areas_22115,((function (G__21998,indexed_wind_stability_areas_22115){
return (function (item__13999__auto__){
var vec__22003 = javelin.core.cell_map(cljs.core.identity,javelin.core.formula(((function (G__21998,indexed_wind_stability_areas_22115){
return (function (p__22006){
var vec__22007 = p__22006;
var index = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22007,(0),null);
var area = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22007,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [index,area], null);
});})(G__21998,indexed_wind_stability_areas_22115))
).call(null,item__13999__auto__));
var index = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22003,(0),null);
var area = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22003,(1),null);
var G__22057 = cljs.core.cst$kw$class;
var G__22058 = "wind-stability-params";
var G__22059 = (function (){var G__22085 = (function (){var G__22091 = (function (){var G__22094 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("NW corner") : hoplon.core.td.call(null,"NW corner"));
var G__22095 = (function (){var G__22097 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$bounds,cljs.core.cst$kw$x], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22097) : hoplon.core.td.call(null,G__22097));
})();
var G__22096 = (function (){var G__22098 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$bounds,cljs.core.cst$kw$y], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22098) : hoplon.core.td.call(null,G__22098));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__22094,G__22095,G__22096) : hoplon.core.tr.call(null,G__22094,G__22095,G__22096));
})();
var G__22092 = (function (){var G__22099 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("Width/height") : hoplon.core.td.call(null,"Width/height"));
var G__22100 = (function (){var G__22102 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$bounds,cljs.core.cst$kw$width], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22102) : hoplon.core.td.call(null,G__22102));
})();
var G__22101 = (function (){var G__22103 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$bounds,cljs.core.cst$kw$height], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22103) : hoplon.core.td.call(null,G__22103));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__22099,G__22100,G__22101) : hoplon.core.tr.call(null,G__22099,G__22100,G__22101));
})();
var G__22093 = (function (){var G__22104 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("Wind spd/hdg") : hoplon.core.td.call(null,"Wind spd/hdg"));
var G__22105 = (function (){var G__22107 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$wind,cljs.core.cst$kw$speed], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22107) : hoplon.core.td.call(null,G__22107));
})();
var G__22106 = (function (){var G__22108 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$wind,cljs.core.cst$kw$heading], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22108) : hoplon.core.td.call(null,G__22108));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__22104,G__22105,G__22106) : hoplon.core.tr.call(null,G__22104,G__22105,G__22106));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$3(G__22091,G__22092,G__22093) : hoplon.core.tbody.call(null,G__22091,G__22092,G__22093));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$1(G__22085) : hoplon.core.table.call(null,G__22085));
})();
var G__22060 = (function (){var G__22109 = cljs.core.cst$kw$click;
var G__22110 = ((function (G__22109,G__22057,G__22058,G__22059,vec__22003,index,area,G__21998,indexed_wind_stability_areas_22115){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.weather_params,cljs.core.update,cljs.core.cst$kw$wind_DASH_stability_DASH_areas,((function (G__22109,G__22057,G__22058,G__22059,vec__22003,index,area,G__21998,indexed_wind_stability_areas_22115){
return (function (areas){
return hoplon.app_pages._index_DOT_html.remove_nth(areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)));
});})(G__22109,G__22057,G__22058,G__22059,vec__22003,index,area,G__21998,indexed_wind_stability_areas_22115))
);
});})(G__22109,G__22057,G__22058,G__22059,vec__22003,index,area,G__21998,indexed_wind_stability_areas_22115))
;
var G__22111 = "Remove";
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(G__22109,G__22110,G__22111) : hoplon.core.button.call(null,G__22109,G__22110,G__22111));
})();
var G__22061 = (hoplon.core.hr.cljs$core$IFn$_invoke$arity$0 ? hoplon.core.hr.cljs$core$IFn$_invoke$arity$0() : hoplon.core.hr.call(null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$5(G__22057,G__22058,G__22059,G__22060,G__22061) : hoplon.core.div.call(null,G__22057,G__22058,G__22059,G__22060,G__22061));
});})(G__21998,indexed_wind_stability_areas_22115))
);
var G__22000 = (function (){var G__22112 = cljs.core.cst$kw$click;
var G__22113 = ((function (G__22112,G__21998,G__21999,indexed_wind_stability_areas_22115){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.weather_params,cljs.core.update,cljs.core.cst$kw$wind_DASH_stability_DASH_areas,((function (G__22112,G__21998,G__21999,indexed_wind_stability_areas_22115){
return (function (areas){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(areas,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$bounds,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$width,(10),cljs.core.cst$kw$height,(10)], null),cljs.core.cst$kw$wind,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$heading,(45),cljs.core.cst$kw$speed,(5)], null),cljs.core.cst$kw$index,cljs.core.count(areas)], null));
});})(G__22112,G__21998,G__21999,indexed_wind_stability_areas_22115))
);
});})(G__22112,G__21998,G__21999,indexed_wind_stability_areas_22115))
;
var G__22114 = "Add New";
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(G__22112,G__22113,G__22114) : hoplon.core.button.call(null,G__22112,G__22113,G__22114));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$3(G__21998,G__21999,G__22000) : hoplon.core.fieldset.call(null,G__21998,G__21999,G__22000));
});})(indexed_wind_stability_areas_22115))
;
hoplon.app_pages._index_DOT_html.weather_type_configuration = (function hoplon$app_pages$_index_DOT_html$weather_type_configuration(){
var G__22870 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Weather type configuration") : hoplon.core.legend.call(null,"Weather type configuration"));
var G__22871 = (function (){var G__22899 = cljs.core.cst$kw$id;
var G__22900 = "category-params";
var G__22901 = (function (){var G__22915 = (function (){var G__22917 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("") : hoplon.core.td.call(null,""));
var G__22918 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("") : hoplon.core.td.call(null,""));
var G__22919 = (function (){var G__22921 = cljs.core.cst$kw$colspan;
var G__22922 = (3);
var G__22923 = "Wind";
var G__22924 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_type_DASH_config,cljs.core.cst$kw$wind], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$4(G__22921,G__22922,G__22923,G__22924) : hoplon.core.td.call(null,G__22921,G__22922,G__22923,G__22924));
})();
var G__22920 = (function (){var G__22925 = cljs.core.cst$kw$colspan;
var G__22926 = (3);
var G__22927 = "Temperature";
var G__22928 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_type_DASH_config,cljs.core.cst$kw$temp], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$4(G__22925,G__22926,G__22927,G__22928) : hoplon.core.td.call(null,G__22925,G__22926,G__22927,G__22928));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$4(G__22917,G__22918,G__22919,G__22920) : hoplon.core.tr.call(null,G__22917,G__22918,G__22919,G__22920));
})();
var G__22916 = (function (){var G__22929 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__22915,G__22899,G__22900,G__22870){
return (function (p1__22116_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,p1__22116_SHARP_);
});})(G__22915,G__22899,G__22900,G__22870))
,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, ["",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class,"weight","Weight",hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_type_DASH_config,cljs.core.cst$kw$weight], null))], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Min"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Mean"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Max"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Min"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Mean"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Max"], null)], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__22929) : hoplon.core.tr.call(null,G__22929));
})();
return (hoplon.core.thead.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.thead.cljs$core$IFn$_invoke$arity$2(G__22915,G__22916) : hoplon.core.thead.call(null,G__22915,G__22916));
})();
var G__22902 = (function (){var G__23276 = (function (){var iter__7873__auto__ = ((function (G__22899,G__22900,G__22901,G__22870){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23277(s__23278){
return (new cljs.core.LazySeq(null,((function (G__22899,G__22900,G__22901,G__22870){
return (function (){
var s__23278__$1 = s__23278;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__23278__$1);
if(temp__6363__auto__){
var s__23278__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23278__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__23278__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__23280 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__23279 = (0);
while(true){
if((i__23279 < size__7872__auto__)){
var category = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__23279);
cljs.core.chunk_append(b__23280,(function (){var G__23461 = (function (){var G__23464 = cljs.core.cst$kw$class;
var G__23465 = [cljs.core.str("weather-type "),cljs.core.str(cljs.core.name(category))].join('');
var G__23466 = cljs.core.cst$kw$css;
var G__23467 = new cljs.core.PersistentArrayMap(null, 1, ["background-color",(function (){var vec__23469 = (hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1(category) : hoplon.app_pages._index_DOT_html.weather_color.call(null,category));
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23469,(0),null);
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23469,(1),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23469,(2),null);
return [cljs.core.str("rgb("),cljs.core.str(r),cljs.core.str(","),cljs.core.str(g),cljs.core.str(","),cljs.core.str(b),cljs.core.str(")")].join('');
})()], null);
var G__23468 = (hoplon.app_pages._index_DOT_html.type_key__GT_name.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.type_key__GT_name.cljs$core$IFn$_invoke$arity$1(category) : hoplon.app_pages._index_DOT_html.type_key__GT_name.call(null,category));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$5(G__23464,G__23465,G__23466,G__23467,G__23468) : hoplon.core.td.call(null,G__23464,G__23465,G__23466,G__23467,G__23468));
})();
var G__23462 = (function (){var G__23475 = (function (){var G__23476 = cljs.core.cst$kw$class;
var G__23477 = "edit-field";
var G__23478 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,cljs.core.cst$kw$weight], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23476,G__23477,G__23478) : hoplon.core.div.call(null,G__23476,G__23477,G__23478));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__23475) : hoplon.core.td.call(null,G__23475));
})();
var G__23463 = (function (){var iter__7873__auto__ = ((function (i__23279,G__23461,G__23462,category,c__7871__auto__,size__7872__auto__,b__23280,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23277_$_iter__23479(s__23480){
return (new cljs.core.LazySeq(null,((function (i__23279,G__23461,G__23462,category,c__7871__auto__,size__7872__auto__,b__23280,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870){
return (function (){
var s__23480__$1 = s__23480;
while(true){
var temp__6363__auto____$1 = cljs.core.seq(s__23480__$1);
if(temp__6363__auto____$1){
var xs__6915__auto__ = temp__6363__auto____$1;
var param = cljs.core.first(xs__6915__auto__);
var iterys__7869__auto__ = ((function (s__23480__$1,i__23279,param,xs__6915__auto__,temp__6363__auto____$1,G__23461,G__23462,category,c__7871__auto__,size__7872__auto__,b__23280,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23277_$_iter__23479_$_iter__23481(s__23482){
return (new cljs.core.LazySeq(null,((function (s__23480__$1,i__23279,param,xs__6915__auto__,temp__6363__auto____$1,G__23461,G__23462,category,c__7871__auto__,size__7872__auto__,b__23280,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870){
return (function (){
var s__23482__$1 = s__23482;
while(true){
var temp__6363__auto____$2 = cljs.core.seq(s__23482__$1);
if(temp__6363__auto____$2){
var s__23482__$2 = temp__6363__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__23482__$2)){
var c__7871__auto____$1 = cljs.core.chunk_first(s__23482__$2);
var size__7872__auto____$1 = cljs.core.count(c__7871__auto____$1);
var b__23484 = cljs.core.chunk_buffer(size__7872__auto____$1);
if((function (){var i__23483 = (0);
while(true){
if((i__23483 < size__7872__auto____$1)){
var metric = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto____$1,i__23483);
cljs.core.chunk_append(b__23484,(function (){var G__23526 = cljs.core.cst$kw$class;
var G__23527 = [cljs.core.str(cljs.core.name(param)),cljs.core.str(" "),cljs.core.str(cljs.core.name(metric))].join('');
var G__23528 = (function (){var G__23529 = cljs.core.cst$kw$class;
var G__23530 = "edit-field";
var G__23531 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,param,metric], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23529,G__23530,G__23531) : hoplon.core.div.call(null,G__23529,G__23530,G__23531));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(G__23526,G__23527,G__23528) : hoplon.core.td.call(null,G__23526,G__23527,G__23528));
})());

var G__23623 = (i__23483 + (1));
i__23483 = G__23623;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23484),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23277_$_iter__23479_$_iter__23481(cljs.core.chunk_rest(s__23482__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23484),null);
}
} else {
var metric = cljs.core.first(s__23482__$2);
return cljs.core.cons((function (){var G__23532 = cljs.core.cst$kw$class;
var G__23533 = [cljs.core.str(cljs.core.name(param)),cljs.core.str(" "),cljs.core.str(cljs.core.name(metric))].join('');
var G__23534 = (function (){var G__23535 = cljs.core.cst$kw$class;
var G__23536 = "edit-field";
var G__23537 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,param,metric], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23535,G__23536,G__23537) : hoplon.core.div.call(null,G__23535,G__23536,G__23537));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(G__23532,G__23533,G__23534) : hoplon.core.td.call(null,G__23532,G__23533,G__23534));
})(),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23277_$_iter__23479_$_iter__23481(cljs.core.rest(s__23482__$2)));
}
} else {
return null;
}
break;
}
});})(s__23480__$1,i__23279,param,xs__6915__auto__,temp__6363__auto____$1,G__23461,G__23462,category,c__7871__auto__,size__7872__auto__,b__23280,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870))
,null,null));
});})(s__23480__$1,i__23279,param,xs__6915__auto__,temp__6363__auto____$1,G__23461,G__23462,category,c__7871__auto__,size__7872__auto__,b__23280,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870))
;
var fs__7870__auto__ = cljs.core.seq(iterys__7869__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$min,cljs.core.cst$kw$mean,cljs.core.cst$kw$max], null)));
if(fs__7870__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__7870__auto__,hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23277_$_iter__23479(cljs.core.rest(s__23480__$1)));
} else {
var G__23624 = cljs.core.rest(s__23480__$1);
s__23480__$1 = G__23624;
continue;
}
} else {
return null;
}
break;
}
});})(i__23279,G__23461,G__23462,category,c__7871__auto__,size__7872__auto__,b__23280,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870))
,null,null));
});})(i__23279,G__23461,G__23462,category,c__7871__auto__,size__7872__auto__,b__23280,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind,cljs.core.cst$kw$temp], null));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__23461,G__23462,G__23463) : hoplon.core.tr.call(null,G__23461,G__23462,G__23463));
})());

var G__23625 = (i__23279 + (1));
i__23279 = G__23625;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23280),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23277(cljs.core.chunk_rest(s__23278__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23280),null);
}
} else {
var category = cljs.core.first(s__23278__$2);
return cljs.core.cons((function (){var G__23546 = (function (){var G__23549 = cljs.core.cst$kw$class;
var G__23550 = [cljs.core.str("weather-type "),cljs.core.str(cljs.core.name(category))].join('');
var G__23551 = cljs.core.cst$kw$css;
var G__23552 = new cljs.core.PersistentArrayMap(null, 1, ["background-color",(function (){var vec__23554 = (hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1(category) : hoplon.app_pages._index_DOT_html.weather_color.call(null,category));
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23554,(0),null);
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23554,(1),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23554,(2),null);
return [cljs.core.str("rgb("),cljs.core.str(r),cljs.core.str(","),cljs.core.str(g),cljs.core.str(","),cljs.core.str(b),cljs.core.str(")")].join('');
})()], null);
var G__23553 = (hoplon.app_pages._index_DOT_html.type_key__GT_name.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.type_key__GT_name.cljs$core$IFn$_invoke$arity$1(category) : hoplon.app_pages._index_DOT_html.type_key__GT_name.call(null,category));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$5(G__23549,G__23550,G__23551,G__23552,G__23553) : hoplon.core.td.call(null,G__23549,G__23550,G__23551,G__23552,G__23553));
})();
var G__23547 = (function (){var G__23560 = (function (){var G__23561 = cljs.core.cst$kw$class;
var G__23562 = "edit-field";
var G__23563 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,cljs.core.cst$kw$weight], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23561,G__23562,G__23563) : hoplon.core.div.call(null,G__23561,G__23562,G__23563));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__23560) : hoplon.core.td.call(null,G__23560));
})();
var G__23548 = (function (){var iter__7873__auto__ = ((function (G__23546,G__23547,category,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23277_$_iter__23564(s__23565){
return (new cljs.core.LazySeq(null,((function (G__23546,G__23547,category,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870){
return (function (){
var s__23565__$1 = s__23565;
while(true){
var temp__6363__auto____$1 = cljs.core.seq(s__23565__$1);
if(temp__6363__auto____$1){
var xs__6915__auto__ = temp__6363__auto____$1;
var param = cljs.core.first(xs__6915__auto__);
var iterys__7869__auto__ = ((function (s__23565__$1,param,xs__6915__auto__,temp__6363__auto____$1,G__23546,G__23547,category,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23277_$_iter__23564_$_iter__23566(s__23567){
return (new cljs.core.LazySeq(null,((function (s__23565__$1,param,xs__6915__auto__,temp__6363__auto____$1,G__23546,G__23547,category,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870){
return (function (){
var s__23567__$1 = s__23567;
while(true){
var temp__6363__auto____$2 = cljs.core.seq(s__23567__$1);
if(temp__6363__auto____$2){
var s__23567__$2 = temp__6363__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__23567__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__23567__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__23569 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__23568 = (0);
while(true){
if((i__23568 < size__7872__auto__)){
var metric = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__23568);
cljs.core.chunk_append(b__23569,(function (){var G__23611 = cljs.core.cst$kw$class;
var G__23612 = [cljs.core.str(cljs.core.name(param)),cljs.core.str(" "),cljs.core.str(cljs.core.name(metric))].join('');
var G__23613 = (function (){var G__23614 = cljs.core.cst$kw$class;
var G__23615 = "edit-field";
var G__23616 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,param,metric], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23614,G__23615,G__23616) : hoplon.core.div.call(null,G__23614,G__23615,G__23616));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(G__23611,G__23612,G__23613) : hoplon.core.td.call(null,G__23611,G__23612,G__23613));
})());

var G__23626 = (i__23568 + (1));
i__23568 = G__23626;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23569),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23277_$_iter__23564_$_iter__23566(cljs.core.chunk_rest(s__23567__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23569),null);
}
} else {
var metric = cljs.core.first(s__23567__$2);
return cljs.core.cons((function (){var G__23617 = cljs.core.cst$kw$class;
var G__23618 = [cljs.core.str(cljs.core.name(param)),cljs.core.str(" "),cljs.core.str(cljs.core.name(metric))].join('');
var G__23619 = (function (){var G__23620 = cljs.core.cst$kw$class;
var G__23621 = "edit-field";
var G__23622 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,param,metric], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23620,G__23621,G__23622) : hoplon.core.div.call(null,G__23620,G__23621,G__23622));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(G__23617,G__23618,G__23619) : hoplon.core.td.call(null,G__23617,G__23618,G__23619));
})(),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23277_$_iter__23564_$_iter__23566(cljs.core.rest(s__23567__$2)));
}
} else {
return null;
}
break;
}
});})(s__23565__$1,param,xs__6915__auto__,temp__6363__auto____$1,G__23546,G__23547,category,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870))
,null,null));
});})(s__23565__$1,param,xs__6915__auto__,temp__6363__auto____$1,G__23546,G__23547,category,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870))
;
var fs__7870__auto__ = cljs.core.seq(iterys__7869__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$min,cljs.core.cst$kw$mean,cljs.core.cst$kw$max], null)));
if(fs__7870__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__7870__auto__,hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23277_$_iter__23564(cljs.core.rest(s__23565__$1)));
} else {
var G__23627 = cljs.core.rest(s__23565__$1);
s__23565__$1 = G__23627;
continue;
}
} else {
return null;
}
break;
}
});})(G__23546,G__23547,category,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870))
,null,null));
});})(G__23546,G__23547,category,s__23278__$2,temp__6363__auto__,G__22899,G__22900,G__22901,G__22870))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind,cljs.core.cst$kw$temp], null));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__23546,G__23547,G__23548) : hoplon.core.tr.call(null,G__23546,G__23547,G__23548));
})(),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23277(cljs.core.rest(s__23278__$2)));
}
} else {
return null;
}
break;
}
});})(G__22899,G__22900,G__22901,G__22870))
,null,null));
});})(G__22899,G__22900,G__22901,G__22870))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sunny,cljs.core.cst$kw$fair,cljs.core.cst$kw$poor,cljs.core.cst$kw$inclement], null));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1(G__23276) : hoplon.core.tbody.call(null,G__23276));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$4(G__22899,G__22900,G__22901,G__22902) : hoplon.core.table.call(null,G__22899,G__22900,G__22901,G__22902));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2(G__22870,G__22871) : hoplon.core.fieldset.call(null,G__22870,G__22871));
});
hoplon.app_pages._index_DOT_html.step_controls = (function hoplon$app_pages$_index_DOT_html$step_controls(){
var G__23713 = cljs.core.cst$kw$id;
var G__23714 = "time-location-params";
var G__23715 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Time/location controls") : hoplon.core.legend.call(null,"Time/location controls"));
var G__23716 = (function (){var G__23753 = (function (){var G__23755 = (function (){var G__23761 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["X Offset",hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$origin,(0)], null)),hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params,cljs.core.cst$kw$origin,cljs.core.cst$kw$x], null))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23761) : hoplon.core.tr.call(null,G__23761));
})();
var G__23756 = (function (){var G__23762 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Y Offset",hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$origin,(1)], null)),hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params,cljs.core.cst$kw$origin,cljs.core.cst$kw$y], null))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23762) : hoplon.core.tr.call(null,G__23762));
})();
var G__23757 = (function (){var G__23763 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["T Offset",hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time,cljs.core.cst$kw$offset], null)),hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params,cljs.core.cst$kw$time,cljs.core.cst$kw$offset], null))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23763) : hoplon.core.tr.call(null,G__23763));
})();
var G__23758 = (function (){var iter__7873__auto__ = ((function (G__23755,G__23756,G__23757,G__23713,G__23714,G__23715){
return (function hoplon$app_pages$_index_DOT_html$step_controls_$_iter__23764(s__23765){
return (new cljs.core.LazySeq(null,((function (G__23755,G__23756,G__23757,G__23713,G__23714,G__23715){
return (function (){
var s__23765__$1 = s__23765;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__23765__$1);
if(temp__6363__auto__){
var s__23765__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23765__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__23765__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__23767 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__23766 = (0);
while(true){
if((i__23766 < size__7872__auto__)){
var vec__23778 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__23766);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23778,(0),null);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23778,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23778,(2),null);
var help = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23778,(3),null);
cljs.core.chunk_append(b__23767,(function (){var G__23781 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [label,hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(c,path),hoplon.app_pages._index_DOT_html.help_for(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [help], null),path))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23781) : hoplon.core.tr.call(null,G__23781));
})());

var G__23798 = (i__23766 + (1));
i__23766 = G__23798;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23767),hoplon$app_pages$_index_DOT_html$step_controls_$_iter__23764(cljs.core.chunk_rest(s__23765__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23767),null);
}
} else {
var vec__23782 = cljs.core.first(s__23765__$2);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23782,(0),null);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23782,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23782,(2),null);
var help = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23782,(3),null);
return cljs.core.cons((function (){var G__23785 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [label,hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(c,path),hoplon.app_pages._index_DOT_html.help_for(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [help], null),path))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23785) : hoplon.core.tr.call(null,G__23785));
})(),hoplon$app_pages$_index_DOT_html$step_controls_$_iter__23764(cljs.core.rest(s__23765__$2)));
}
} else {
return null;
}
break;
}
});})(G__23755,G__23756,G__23757,G__23713,G__23714,G__23715))
,null,null));
});})(G__23755,G__23756,G__23757,G__23713,G__23714,G__23715))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [hoplon.app_pages._index_DOT_html.movement_params,"Weather heading",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$direction,cljs.core.cst$kw$heading], null),cljs.core.cst$kw$movement_DASH_params], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [hoplon.app_pages._index_DOT_html.movement_params,"Weather speed",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$direction,cljs.core.cst$kw$speed], null),cljs.core.cst$kw$movement_DASH_params], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [hoplon.app_pages._index_DOT_html.weather_params,"Evolution (min)",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$evolution], null),cljs.core.cst$kw$weather_DASH_params], null)], null));
})();
var G__23759 = (function (){var G__23786 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Time",hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$displayed_DASH_time], null))], null),hoplon.app_pages._index_DOT_html.time_entry(hoplon.app_pages._index_DOT_html.time_params,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$displayed], null)),(hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.jump_to_time,"Jump to") : hoplon.core.button.call(null,cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.jump_to_time,"Jump to")),(hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.set_time,"Set to") : hoplon.core.button.call(null,cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.set_time,"Set to"))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23786) : hoplon.core.tr.call(null,G__23786));
})();
var G__23760 = (function (){var G__23787 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Step interval",hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.movement_params,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$step], null)),hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$step], null))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23787) : hoplon.core.tr.call(null,G__23787));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$6(G__23755,G__23756,G__23757,G__23758,G__23759,G__23760) : hoplon.core.tbody.call(null,G__23755,G__23756,G__23757,G__23758,G__23759,G__23760));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$1(G__23753) : hoplon.core.table.call(null,G__23753));
})();
var G__23717 = (function (){var G__23788 = cljs.core.cst$kw$title;
var G__23789 = "Step back in time";
var G__23790 = cljs.core.cst$kw$click;
var G__23791 = ((function (G__23788,G__23789,G__23790,G__23713,G__23714,G__23715,G__23716){
return (function (){
return hoplon.app_pages._index_DOT_html.move((-1));
});})(G__23788,G__23789,G__23790,G__23713,G__23714,G__23715,G__23716))
;
var G__23792 = "<< Step Back";
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$5(G__23788,G__23789,G__23790,G__23791,G__23792) : hoplon.core.button.call(null,G__23788,G__23789,G__23790,G__23791,G__23792));
})();
var G__23718 = (function (){var G__23793 = cljs.core.cst$kw$title;
var G__23794 = "Step forward in time";
var G__23795 = cljs.core.cst$kw$click;
var G__23796 = ((function (G__23793,G__23794,G__23795,G__23713,G__23714,G__23715,G__23716,G__23717){
return (function (){
return hoplon.app_pages._index_DOT_html.move((1));
});})(G__23793,G__23794,G__23795,G__23713,G__23714,G__23715,G__23716,G__23717))
;
var G__23797 = "Step Forward >>";
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$5(G__23793,G__23794,G__23795,G__23796,G__23797) : hoplon.core.button.call(null,G__23793,G__23794,G__23795,G__23796,G__23797));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$6(G__23713,G__23714,G__23715,G__23716,G__23717,G__23718) : hoplon.core.fieldset.call(null,G__23713,G__23714,G__23715,G__23716,G__23717,G__23718));
});
hoplon.app_pages._index_DOT_html.weather_controls = (function hoplon$app_pages$_index_DOT_html$weather_controls(){
return hoplon.app_pages._index_DOT_html.two_column((function (){var G__23803 = hoplon.app_pages._index_DOT_html.weather_parameters();
var G__23804 = hoplon.app_pages._index_DOT_html.wind_stability_parameters();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$2(G__23803,G__23804) : hoplon.core.div.call(null,G__23803,G__23804));
})(),(function (){var G__23805 = hoplon.app_pages._index_DOT_html.weather_type_configuration();
var G__23806 = hoplon.app_pages._index_DOT_html.step_controls();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$2(G__23805,G__23806) : hoplon.core.div.call(null,G__23805,G__23806));
})());
});
hoplon.app_pages._index_DOT_html.serialization_controls = (function hoplon$app_pages$_index_DOT_html$serialization_controls(){
var G__23893 = cljs.core.cst$kw$id;
var G__23894 = "load-save-controls";
var G__23895 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Load/save") : hoplon.core.legend.call(null,"Load/save"));
var G__23896 = (function (){var G__23924 = cljs.core.cst$kw$class;
var G__23925 = "button-container";
var G__23926 = javelin.core.formula(((function (G__23924,G__23925,G__23893,G__23894,G__23895){
return (function (G__23932,G__23936,G__23933,G__23935,G__23937,G__23934,G__23931){
var t = (function (){var G__23938 = G__23932;
var G__23939 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time,cljs.core.cst$kw$current], null);
return (G__23931.cljs$core$IFn$_invoke$arity$2 ? G__23931.cljs$core$IFn$_invoke$arity$2(G__23938,G__23939) : G__23931.call(null,G__23938,G__23939));
})();
var vec__23928 = cljs.core.cst$kw$cell_DASH_count.cljs$core$IFn$_invoke$arity$1(G__23932);
var x_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23928,(0),null);
var y_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23928,(1),null);
var blob = (G__23933.cljs$core$IFn$_invoke$arity$3 ? G__23933.cljs$core$IFn$_invoke$arity$3(G__23934,x_cells,y_cells) : G__23933.call(null,G__23934,x_cells,y_cells));
var url = window.URL.createObjectURL(blob);
var download = (function (){var G__23940 = "%d%02d%02d.fmap";
var G__23941 = cljs.core.cst$kw$day.cljs$core$IFn$_invoke$arity$1(t);
var G__23942 = cljs.core.cst$kw$hour.cljs$core$IFn$_invoke$arity$1(t);
var G__23943 = cljs.core.cst$kw$minute.cljs$core$IFn$_invoke$arity$1(t);
return (G__23935.cljs$core$IFn$_invoke$arity$4 ? G__23935.cljs$core$IFn$_invoke$arity$4(G__23940,G__23941,G__23942,G__23943) : G__23935.call(null,G__23940,G__23941,G__23942,G__23943));
})();
var G__23944 = cljs.core.cst$kw$href;
var G__23945 = url;
var G__23946 = cljs.core.cst$kw$download;
var G__23947 = download;
var G__23948 = cljs.core.cst$kw$click;
var G__23949 = ((function (G__23944,G__23945,G__23946,G__23947,G__23948,t,vec__23928,x_cells,y_cells,blob,url,download,G__23924,G__23925,G__23893,G__23894,G__23895){
return (function (){
return (G__23937.cljs$core$IFn$_invoke$arity$1 ? G__23937.cljs$core$IFn$_invoke$arity$1((1)) : G__23937.call(null,(1)));
});})(G__23944,G__23945,G__23946,G__23947,G__23948,t,vec__23928,x_cells,y_cells,blob,url,download,G__23924,G__23925,G__23893,G__23894,G__23895))
;
var G__23950 = cljs.core.cst$kw$class;
var G__23951 = "button";
var G__23952 = "Save Current as FMAP";
return (G__23936.cljs$core$IFn$_invoke$arity$9 ? G__23936.cljs$core$IFn$_invoke$arity$9(G__23944,G__23945,G__23946,G__23947,G__23948,G__23949,G__23950,G__23951,G__23952) : G__23936.call(null,G__23944,G__23945,G__23946,G__23947,G__23948,G__23949,G__23950,G__23951,G__23952));
});})(G__23924,G__23925,G__23893,G__23894,G__23895))
).call(null,hoplon.app_pages._index_DOT_html.weather_params,hoplon.core.a,weathergen.fmap.get_blob,goog.string.format,hoplon.app_pages._index_DOT_html.move,hoplon.app_pages._index_DOT_html.weather_data,cljs.core.get_in);
var G__23927 = "(Steps forward in time)";
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__23924,G__23925,G__23926,G__23927) : hoplon.core.div.call(null,G__23924,G__23925,G__23926,G__23927));
})();
var G__23897 = (function (){var G__23963 = cljs.core.cst$kw$class;
var G__23964 = "button-container";
var G__23965 = javelin.core.formula(((function (G__23963,G__23964,G__23893,G__23894,G__23895,G__23896){
return (function (G__23968,G__23972,G__23971,G__23967,G__23970,G__23969,G__23966){
var blob = (new Blob((function (){var G__23974 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__23975 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$weather_DASH_params,G__23968,cljs.core.cst$kw$movement_DASH_params,G__23969,cljs.core.cst$kw$display_DASH_params,G__23970,cljs.core.cst$kw$revision,G__23971], null);
return (G__23967.cljs$core$IFn$_invoke$arity$1 ? G__23967.cljs$core$IFn$_invoke$arity$1(G__23975) : G__23967.call(null,G__23975));
})()], null);
return (G__23966.cljs$core$IFn$_invoke$arity$1 ? G__23966.cljs$core$IFn$_invoke$arity$1(G__23974) : G__23966.call(null,G__23974));
})(),{"type": "text/plain"}));
var url = window.URL.createObjectURL(blob);
return (G__23972.cljs$core$IFn$_invoke$arity$7 ? G__23972.cljs$core$IFn$_invoke$arity$7(cljs.core.cst$kw$href,url,cljs.core.cst$kw$download,"weathergen-settings.edn",cljs.core.cst$kw$class,"button","Save Settings") : G__23972.call(null,cljs.core.cst$kw$href,url,cljs.core.cst$kw$download,"weathergen-settings.edn",cljs.core.cst$kw$class,"button","Save Settings"));
});})(G__23963,G__23964,G__23893,G__23894,G__23895,G__23896))
).call(null,hoplon.app_pages._index_DOT_html.weather_params,hoplon.core.a,hoplon.app_pages._index_DOT_html.revision,cljs.core.pr_str,hoplon.app_pages._index_DOT_html.display_params,hoplon.app_pages._index_DOT_html.movement_params,cljs.core.clj__GT_js);
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23963,G__23964,G__23965) : hoplon.core.div.call(null,G__23963,G__23964,G__23965));
})();
var G__23898 = (function (){var G__23976 = cljs.core.cst$kw$class;
var G__23977 = "button-container";
var G__23978 = (hoplon.core.button.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$5(cljs.core.cst$kw$class,"button",cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.load_settings,"Load Settings") : hoplon.core.button.call(null,cljs.core.cst$kw$class,"button",cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.load_settings,"Load Settings"));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23976,G__23977,G__23978) : hoplon.core.div.call(null,G__23976,G__23977,G__23978));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$6(G__23893,G__23894,G__23895,G__23896,G__23897,G__23898) : hoplon.core.fieldset.call(null,G__23893,G__23894,G__23895,G__23896,G__23897,G__23898));
});
hoplon.app_pages._index_DOT_html.forecast_display = (function hoplon$app_pages$_index_DOT_html$forecast_display(){
var G__24602 = (function (){var G__24604 = "Forecast";
var G__24605 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$forecast], null));
return (hoplon.core.legend.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$2(G__24604,G__24605) : hoplon.core.legend.call(null,G__24604,G__24605));
})();
var G__24603 = (function (){var G__24912 = cljs.core.cst$kw$id;
var G__24913 = "forecast";
var G__24914 = javelin.core.formula(((function (G__24912,G__24913,G__24602){
return (function (G__24932,G__24935,G__24931,G__24928,G__24934,G__24933,G__24936,G__24929,G__24930,G__24937){
if(cljs.core.not(G__24928)){
return "No location is selected. Click a location on the weather grid to get a forecast for it.";
} else {
var vec__24915 = G__24929;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24915,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24915,(1),null);
var G__24938 = [cljs.core.str("Forecast for location "),cljs.core.str(x),cljs.core.str(","),cljs.core.str(y)].join('');
var G__24939 = (function (){var G__24953 = (function (){var G__24961 = (function (){var G__24962 = (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1("Day/Time") : G__24934.call(null,"Day/Time"));
var G__24963 = (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1("Weather Type") : G__24934.call(null,"Weather Type"));
var G__24964 = (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1("Pressure") : G__24934.call(null,"Pressure"));
var G__24965 = (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1("Temperature") : G__24934.call(null,"Temperature"));
var G__24966 = (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1("Wind Speed") : G__24934.call(null,"Wind Speed"));
var G__24967 = (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1("Wind Heading") : G__24934.call(null,"Wind Heading"));
return (G__24933.cljs$core$IFn$_invoke$arity$6 ? G__24933.cljs$core$IFn$_invoke$arity$6(G__24962,G__24963,G__24964,G__24965,G__24966,G__24967) : G__24933.call(null,G__24962,G__24963,G__24964,G__24965,G__24966,G__24967));
})();
return (G__24932.cljs$core$IFn$_invoke$arity$1 ? G__24932.cljs$core$IFn$_invoke$arity$1(G__24961) : G__24932.call(null,G__24961));
})();
var G__24954 = (function (){var G__25094 = (function (){var iter__7873__auto__ = ((function (G__24953,G__24938,vec__24915,x,y,G__24912,G__24913,G__24602){
return (function hoplon$app_pages$_index_DOT_html$forecast_display_$_iter__24918(s__24919){
return (new cljs.core.LazySeq(null,((function (G__24953,G__24938,vec__24915,x,y,G__24912,G__24913,G__24602){
return (function (){
var s__24919__$1 = s__24919;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__24919__$1);
if(temp__6363__auto__){
var s__24919__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__24919__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__24919__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__24921 = cljs.core.chunk_buffer(size__7872__auto__);
if(cljs.core.truth_((function (){var i__24920 = (0);
while(true){
if(cljs.core.truth_((i__24920 < size__7872__auto__))){
var vec__24922 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__24920);
var time = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24922,(0),null);
var weather = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24922,(1),null);
cljs.core.chunk_append(b__24921,(function (){var G__25168 = (function (){var G__25178 = (function (){var G__25179 = "%02d/%02d%02d";
var G__25180 = cljs.core.cst$kw$day.cljs$core$IFn$_invoke$arity$1(time);
var G__25181 = cljs.core.cst$kw$hour.cljs$core$IFn$_invoke$arity$1(time);
var G__25182 = cljs.core.cst$kw$minute.cljs$core$IFn$_invoke$arity$1(time);
return (G__24936.cljs$core$IFn$_invoke$arity$4 ? G__24936.cljs$core$IFn$_invoke$arity$4(G__25179,G__25180,G__25181,G__25182) : G__24936.call(null,G__25179,G__25180,G__25181,G__25182));
})();
return (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1(G__25178) : G__24934.call(null,G__25178));
})();
var G__25169 = (function (){var G__25184 = (function (){var G__25185 = cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(weather);
return (G__24937.cljs$core$IFn$_invoke$arity$1 ? G__24937.cljs$core$IFn$_invoke$arity$1(G__25185) : G__24937.call(null,G__25185));
})();
return (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1(G__25184) : G__24934.call(null,G__25184));
})();
var G__25170 = (function (){var G__25186 = cljs.core.cst$kw$pressure.cljs$core$IFn$_invoke$arity$1(weather).toFixed((2));
return (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1(G__25186) : G__24934.call(null,G__25186));
})();
var G__25171 = (function (){var G__25187 = cljs.core.cst$kw$temperature.cljs$core$IFn$_invoke$arity$1(weather).toFixed((1));
return (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1(G__25187) : G__24934.call(null,G__25187));
})();
var G__25172 = (function (){var G__25188 = cljs.core.cst$kw$speed.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather)).toFixed((0));
return (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1(G__25188) : G__24934.call(null,G__25188));
})();
var G__25173 = (function (){var G__25189 = cljs.core.cst$kw$heading.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather)).toFixed((0));
return (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1(G__25189) : G__24934.call(null,G__25189));
})();
return (G__24933.cljs$core$IFn$_invoke$arity$6 ? G__24933.cljs$core$IFn$_invoke$arity$6(G__25168,G__25169,G__25170,G__25171,G__25172,G__25173) : G__24933.call(null,G__25168,G__25169,G__25170,G__25171,G__25172,G__25173));
})());

var G__25221 = (i__24920 + (1));
i__24920 = G__25221;
continue;
} else {
return true;
}
break;
}
})())){
return cljs.core.chunk_cons(cljs.core.chunk(b__24921),hoplon$app_pages$_index_DOT_html$forecast_display_$_iter__24918(cljs.core.chunk_rest(s__24919__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__24921),null);
}
} else {
var vec__24925 = cljs.core.first(s__24919__$2);
var time = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24925,(0),null);
var weather = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24925,(1),null);
return cljs.core.cons((function (){var G__25199 = (function (){var G__25209 = (function (){var G__25210 = "%02d/%02d%02d";
var G__25211 = cljs.core.cst$kw$day.cljs$core$IFn$_invoke$arity$1(time);
var G__25212 = cljs.core.cst$kw$hour.cljs$core$IFn$_invoke$arity$1(time);
var G__25213 = cljs.core.cst$kw$minute.cljs$core$IFn$_invoke$arity$1(time);
return (G__24936.cljs$core$IFn$_invoke$arity$4 ? G__24936.cljs$core$IFn$_invoke$arity$4(G__25210,G__25211,G__25212,G__25213) : G__24936.call(null,G__25210,G__25211,G__25212,G__25213));
})();
return (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1(G__25209) : G__24934.call(null,G__25209));
})();
var G__25200 = (function (){var G__25215 = (function (){var G__25216 = cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(weather);
return (G__24937.cljs$core$IFn$_invoke$arity$1 ? G__24937.cljs$core$IFn$_invoke$arity$1(G__25216) : G__24937.call(null,G__25216));
})();
return (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1(G__25215) : G__24934.call(null,G__25215));
})();
var G__25201 = (function (){var G__25217 = cljs.core.cst$kw$pressure.cljs$core$IFn$_invoke$arity$1(weather).toFixed((2));
return (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1(G__25217) : G__24934.call(null,G__25217));
})();
var G__25202 = (function (){var G__25218 = cljs.core.cst$kw$temperature.cljs$core$IFn$_invoke$arity$1(weather).toFixed((1));
return (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1(G__25218) : G__24934.call(null,G__25218));
})();
var G__25203 = (function (){var G__25219 = cljs.core.cst$kw$speed.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather)).toFixed((0));
return (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1(G__25219) : G__24934.call(null,G__25219));
})();
var G__25204 = (function (){var G__25220 = cljs.core.cst$kw$heading.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather)).toFixed((0));
return (G__24934.cljs$core$IFn$_invoke$arity$1 ? G__24934.cljs$core$IFn$_invoke$arity$1(G__25220) : G__24934.call(null,G__25220));
})();
return (G__24933.cljs$core$IFn$_invoke$arity$6 ? G__24933.cljs$core$IFn$_invoke$arity$6(G__25199,G__25200,G__25201,G__25202,G__25203,G__25204) : G__24933.call(null,G__25199,G__25200,G__25201,G__25202,G__25203,G__25204));
})(),hoplon$app_pages$_index_DOT_html$forecast_display_$_iter__24918(cljs.core.rest(s__24919__$2)));
}
} else {
return null;
}
break;
}
});})(G__24953,G__24938,vec__24915,x,y,G__24912,G__24913,G__24602))
,null,null));
});})(G__24953,G__24938,vec__24915,x,y,G__24912,G__24913,G__24602))
;
return iter__7873__auto__(G__24928);
})();
return (G__24935.cljs$core$IFn$_invoke$arity$1 ? G__24935.cljs$core$IFn$_invoke$arity$1(G__25094) : G__24935.call(null,G__25094));
})();
return (G__24931.cljs$core$IFn$_invoke$arity$2 ? G__24931.cljs$core$IFn$_invoke$arity$2(G__24953,G__24954) : G__24931.call(null,G__24953,G__24954));
})();
return (G__24930.cljs$core$IFn$_invoke$arity$2 ? G__24930.cljs$core$IFn$_invoke$arity$2(G__24938,G__24939) : G__24930.call(null,G__24938,G__24939));
}
});})(G__24912,G__24913,G__24602))
).call(null,hoplon.core.thead,hoplon.core.tbody,hoplon.core.table,hoplon.app_pages._index_DOT_html.forecast,hoplon.core.td,hoplon.core.tr,goog.string.format,hoplon.app_pages._index_DOT_html.selected_cell,hoplon.core.div,hoplon.app_pages._index_DOT_html.type_key__GT_name);
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__24912,G__24913,G__24914) : hoplon.core.div.call(null,G__24912,G__24913,G__24914));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2(G__24602,G__24603) : hoplon.core.fieldset.call(null,G__24602,G__24603));
});
hoplon.app_pages._index_DOT_html.debug_info = (function hoplon$app_pages$_index_DOT_html$debug_info(){
return null;
});
hoplon.core.html.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (){var G__25222 = (hoplon.core.title.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.title.cljs$core$IFn$_invoke$arity$1("WeatherGen") : hoplon.core.title.call(null,"WeatherGen"));
var G__25223 = (hoplon.core.link.cljs$core$IFn$_invoke$arity$8 ? hoplon.core.link.cljs$core$IFn$_invoke$arity$8(cljs.core.cst$kw$href,"style.css",cljs.core.cst$kw$rel,"stylesheet",cljs.core.cst$kw$title,"main",cljs.core.cst$kw$type,"text/css") : hoplon.core.link.call(null,cljs.core.cst$kw$href,"style.css",cljs.core.cst$kw$rel,"stylesheet",cljs.core.cst$kw$title,"main",cljs.core.cst$kw$type,"text/css"));
var G__25224 = (hoplon.core.link.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.link.cljs$core$IFn$_invoke$arity$6(cljs.core.cst$kw$href,"https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300",cljs.core.cst$kw$rel,"stylesheet",cljs.core.cst$kw$type,"text/css") : hoplon.core.link.call(null,cljs.core.cst$kw$href,"https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300",cljs.core.cst$kw$rel,"stylesheet",cljs.core.cst$kw$type,"text/css"));
return (hoplon.core.head.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.head.cljs$core$IFn$_invoke$arity$3(G__25222,G__25223,G__25224) : hoplon.core.head.call(null,G__25222,G__25223,G__25224));
})(),(function (){var G__25322 = (function (){var G__25360 = cljs.core.cst$kw$id;
var G__25361 = "app";
var G__25362 = (function (){var G__25379 = cljs.core.cst$kw$id;
var G__25380 = "titlebar";
var G__25381 = (function (){var G__25383 = cljs.core.cst$kw$id;
var G__25384 = "words";
var G__25385 = (hoplon.core.span.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.span.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$id,"title","WeatherGen") : hoplon.core.span.call(null,cljs.core.cst$kw$id,"title","WeatherGen"));
var G__25386 = (function (){var G__25388 = cljs.core.cst$kw$id;
var G__25389 = "byline";
var G__25390 = "by";
var G__25391 = (hoplon.core.a.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.a.cljs$core$IFn$_invoke$arity$5(cljs.core.cst$kw$href,"http://firstfighterwing.com/VFW/member.php?893-Tyrant",cljs.core.cst$kw$target,"_blank","Tyrant") : hoplon.core.a.call(null,cljs.core.cst$kw$href,"http://firstfighterwing.com/VFW/member.php?893-Tyrant",cljs.core.cst$kw$target,"_blank","Tyrant"));
return (hoplon.core.span.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.span.cljs$core$IFn$_invoke$arity$4(G__25388,G__25389,G__25390,G__25391) : hoplon.core.span.call(null,G__25388,G__25389,G__25390,G__25391));
})();
var G__25387 = (function (){var G__25392 = cljs.core.cst$kw$id;
var G__25393 = "helpstring";
var G__25394 = "Help? Bug? Feature request? Click";
var G__25395 = (hoplon.core.a.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.a.cljs$core$IFn$_invoke$arity$5(cljs.core.cst$kw$href,"help.html",cljs.core.cst$kw$target,"_blank","here") : hoplon.core.a.call(null,cljs.core.cst$kw$href,"help.html",cljs.core.cst$kw$target,"_blank","here"));
var G__25396 = ".";
return (hoplon.core.span.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.span.cljs$core$IFn$_invoke$arity$5(G__25392,G__25393,G__25394,G__25395,G__25396) : hoplon.core.span.call(null,G__25392,G__25393,G__25394,G__25395,G__25396));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$5(G__25383,G__25384,G__25385,G__25386,G__25387) : hoplon.core.div.call(null,G__25383,G__25384,G__25385,G__25386,G__25387));
})();
var G__25382 = (function (){var G__25397 = cljs.core.cst$kw$href;
var G__25398 = "http://firstfighterwing.com";
var G__25399 = cljs.core.cst$kw$target;
var G__25400 = "_blank";
var G__25401 = (hoplon.core.img.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$id,"winglogo",cljs.core.cst$kw$src,"images/1stVFW_Insignia-64.png") : hoplon.core.img.call(null,cljs.core.cst$kw$id,"winglogo",cljs.core.cst$kw$src,"images/1stVFW_Insignia-64.png"));
return (hoplon.core.a.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.a.cljs$core$IFn$_invoke$arity$5(G__25397,G__25398,G__25399,G__25400,G__25401) : hoplon.core.a.call(null,G__25397,G__25398,G__25399,G__25400,G__25401));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__25379,G__25380,G__25381,G__25382) : hoplon.core.div.call(null,G__25379,G__25380,G__25381,G__25382));
})();
var G__25363 = (function (){var G__25406 = cljs.core.cst$kw$class;
var G__25407 = "two-column";
var G__25408 = (function (){var G__25410 = cljs.core.cst$kw$class;
var G__25411 = "left-column";
var G__25412 = hoplon.app_pages._index_DOT_html.button_bar();
var G__25413 = hoplon.app_pages._index_DOT_html.weather_grid();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__25410,G__25411,G__25412,G__25413) : hoplon.core.div.call(null,G__25410,G__25411,G__25412,G__25413));
})();
var G__25409 = (function (){var G__25414 = cljs.core.cst$kw$class;
var G__25415 = "right-column";
var G__25416 = hoplon.app_pages._index_DOT_html.display_controls();
var G__25417 = hoplon.app_pages._index_DOT_html.weather_controls();
var G__25418 = hoplon.app_pages._index_DOT_html.serialization_controls();
var G__25419 = hoplon.app_pages._index_DOT_html.forecast_display();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$6(G__25414,G__25415,G__25416,G__25417,G__25418,G__25419) : hoplon.core.div.call(null,G__25414,G__25415,G__25416,G__25417,G__25418,G__25419));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__25406,G__25407,G__25408,G__25409) : hoplon.core.div.call(null,G__25406,G__25407,G__25408,G__25409));
})();
var G__25364 = hoplon.app_pages._index_DOT_html.debug_info();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$5(G__25360,G__25361,G__25362,G__25363,G__25364) : hoplon.core.div.call(null,G__25360,G__25361,G__25362,G__25363,G__25364));
})();
return (hoplon.core.body.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.body.cljs$core$IFn$_invoke$arity$1(G__25322) : hoplon.core.body.call(null,G__25322));
})()], 0));
cljs.core.add_watch(hoplon.app_pages._index_DOT_html.grid_data,cljs.core.cst$kw$redraw_DASH_triggers,(function (k,r,o,n){
return hoplon.app_pages._index_DOT_html.draw_grid(n);
}));
hoplon.app_pages._index_DOT_html.draw_grid((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.grid_data) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.grid_data)));
