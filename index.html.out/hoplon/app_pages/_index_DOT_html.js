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
hoplon.app_pages._index_DOT_html.forecast = javelin.core.formula((function (G__19799,G__19801,G__19797,G__19796,G__19800,G__19798,G__19802){
if(cljs.core.not(G__19796)){
return (G__19797.cljs$core$IFn$_invoke$arity$1 ? G__19797.cljs$core$IFn$_invoke$arity$1("No selected cell") : G__19797.call(null,"No selected cell"));
} else {
var result = (function (){var G__19806 = G__19796;
var G__19807 = G__19799;
var G__19808 = G__19800;
var G__19809 = (function (){var G__19810 = (5);
var G__19811 = ((360) / cljs.core.cst$kw$step.cljs$core$IFn$_invoke$arity$1(G__19800));
var G__19812 = (15);
return (G__19801.cljs$core$IFn$_invoke$arity$3 ? G__19801.cljs$core$IFn$_invoke$arity$3(G__19810,G__19811,G__19812) : G__19801.call(null,G__19810,G__19811,G__19812));
})();
return (G__19798.cljs$core$IFn$_invoke$arity$4 ? G__19798.cljs$core$IFn$_invoke$arity$4(G__19806,G__19807,G__19808,G__19809) : G__19798.call(null,G__19806,G__19807,G__19808,G__19809));
})();
var G__19813_19816 = "Forecast computed";
var G__19814_19817 = cljs.core.cst$kw$count;
var G__19815_19818 = (G__19802.cljs$core$IFn$_invoke$arity$1 ? G__19802.cljs$core$IFn$_invoke$arity$1(result) : G__19802.call(null,result));
(G__19797.cljs$core$IFn$_invoke$arity$3 ? G__19797.cljs$core$IFn$_invoke$arity$3(G__19813_19816,G__19814_19817,G__19815_19818) : G__19797.call(null,G__19813_19816,G__19814_19817,G__19815_19818));

return result;
}
})).call(null,hoplon.app_pages._index_DOT_html.weather_params,weathergen.math.clamp,cljs.core.println,hoplon.app_pages._index_DOT_html.selected_cell,hoplon.app_pages._index_DOT_html.movement_params,weathergen.model.forecast,cljs.core.count);
/**
 * Advances the weather by `steps` steps
 */
hoplon.app_pages._index_DOT_html.move = (function hoplon$app_pages$_index_DOT_html$move(steps){
return javelin.core.dosync_STAR_((function (){
var map__19821 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.weather_params,weathergen.model.step,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.movement_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.movement_params)),steps);
var map__19821__$1 = ((((!((map__19821 == null)))?((((map__19821.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19821.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19821):map__19821);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19821__$1,cljs.core.cst$kw$time);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.time_params,cljs.core.assoc,cljs.core.cst$kw$displayed,cljs.core.cst$kw$current.cljs$core$IFn$_invoke$arity$1(time));
}));
});
/**
 * Adjust the time coordinate to match the displayed time.
 */
hoplon.app_pages._index_DOT_html.jump_to_time = (function hoplon$app_pages$_index_DOT_html$jump_to_time(){
return javelin.core.dosync_STAR_((function (){
var map__19825 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.weather_params,weathergen.model.jump_to_time,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.movement_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.movement_params)),cljs.core.cst$kw$displayed.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.time_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.time_params))));
var map__19825__$1 = ((((!((map__19825 == null)))?((((map__19825.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19825.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19825):map__19825);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19825__$1,cljs.core.cst$kw$time);
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
var _ = (function (){var G__19829 = goog.dom.getDocument().body;
var G__19830 = a;
return goog.dom.appendChild(G__19829,G__19830);
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
var vec__19838 = cljs.core.cst$kw$cell_DASH_count.cljs$core$IFn$_invoke$arity$1(weather_params);
var x_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19838,(0),null);
var y_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19838,(1),null);
var blob = weathergen.fmap.get_blob(weather_data,x_cells,y_cells);
return hoplon.app_pages._index_DOT_html.save_data(blob,(function (){var G__19841 = "%d%02d%02d.fmap";
var G__19842 = cljs.core.cst$kw$day.cljs$core$IFn$_invoke$arity$1(t);
var G__19843 = cljs.core.cst$kw$hour.cljs$core$IFn$_invoke$arity$1(t);
var G__19844 = cljs.core.cst$kw$minute.cljs$core$IFn$_invoke$arity$1(t);
return goog.string.format(G__19841,G__19842,G__19843,G__19844);
})());
});
hoplon.app_pages._index_DOT_html.save_settings = (function hoplon$app_pages$_index_DOT_html$save_settings(_){
return hoplon.app_pages._index_DOT_html.save_data((new Blob([cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$weather_DASH_params,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.weather_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.weather_params)),cljs.core.cst$kw$movement_DASH_params,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.movement_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.movement_params)),cljs.core.cst$kw$display_DASH_params,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.display_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.display_params)),cljs.core.cst$kw$revision,hoplon.app_pages._index_DOT_html.revision], null)], 0))],{"type": "text/plain"})),"weathergen-settings.edn");
});
hoplon.app_pages._index_DOT_html.load_settings = (function hoplon$app_pages$_index_DOT_html$load_settings(_){
var i = goog.dom.createElement("input");
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
i.type = "file";

var G__19877_19908 = goog.dom.getDocument().body;
var G__19878_19909 = i;
goog.dom.appendChild(G__19877_19908,G__19878_19909);

goog.style.showElement(i,false);

i.onchange = ((function (i,ch){
return (function (e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,e);

return cljs.core.async.close_BANG_(ch);
});})(i,ch))
;

i.click();

var c__16204__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto__,i,ch){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto__,i,ch){
return (function (state_19893){
var state_val_19894 = (state_19893[(1)]);
if((state_val_19894 === (1))){
var state_19893__$1 = state_19893;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19893__$1,(2),ch);
} else {
if((state_val_19894 === (2))){
var inst_19883 = (state_19893[(7)]);
var inst_19880 = (state_19893[(8)]);
var inst_19880__$1 = (state_19893[(2)]);
var inst_19881 = inst_19880__$1.target;
var inst_19882 = inst_19881.files;
var inst_19883__$1 = (inst_19882[(0)]);
var state_19893__$1 = (function (){var statearr_19895 = state_19893;
(statearr_19895[(7)] = inst_19883__$1);

(statearr_19895[(8)] = inst_19880__$1);

return statearr_19895;
})();
if(cljs.core.truth_(inst_19883__$1)){
var statearr_19896_19910 = state_19893__$1;
(statearr_19896_19910[(1)] = (3));

} else {
var statearr_19897_19911 = state_19893__$1;
(statearr_19897_19911[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_19894 === (3))){
var inst_19883 = (state_19893[(7)]);
var inst_19880 = (state_19893[(8)]);
var inst_19885 = (new FileReader());
var inst_19886 = (function (){var e = inst_19880;
var temp__6363__auto__ = inst_19883;
var file = inst_19883;
var reader = inst_19885;
return ((function (e,temp__6363__auto__,file,reader,inst_19883,inst_19880,inst_19885,state_val_19894,c__16204__auto__,i,ch){
return (function (p1__19845_SHARP_){
var data = cljs.reader.read_string(p1__19845_SHARP_.target.result);
return javelin.core.dosync_STAR_(((function (data,e,temp__6363__auto__,file,reader,inst_19883,inst_19880,inst_19885,state_val_19894,c__16204__auto__,i,ch){
return (function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.weather_params,cljs.core.merge,cljs.core.cst$kw$weather_DASH_params.cljs$core$IFn$_invoke$arity$1(data));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.display_params,cljs.core.merge,cljs.core.cst$kw$display_DASH_params.cljs$core$IFn$_invoke$arity$1(data));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.movement_params,cljs.core.merge,cljs.core.cst$kw$movement_DASH_params.cljs$core$IFn$_invoke$arity$1(data));
});})(data,e,temp__6363__auto__,file,reader,inst_19883,inst_19880,inst_19885,state_val_19894,c__16204__auto__,i,ch))
);
});
;})(e,temp__6363__auto__,file,reader,inst_19883,inst_19880,inst_19885,state_val_19894,c__16204__auto__,i,ch))
})();
var inst_19887 = inst_19885.onload = inst_19886;
var inst_19888 = inst_19885.readAsText(inst_19883);
var state_19893__$1 = (function (){var statearr_19898 = state_19893;
(statearr_19898[(9)] = inst_19887);

return statearr_19898;
})();
var statearr_19899_19912 = state_19893__$1;
(statearr_19899_19912[(2)] = inst_19888);

(statearr_19899_19912[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_19894 === (4))){
var state_19893__$1 = state_19893;
var statearr_19900_19913 = state_19893__$1;
(statearr_19900_19913[(2)] = null);

(statearr_19900_19913[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_19894 === (5))){
var inst_19891 = (state_19893[(2)]);
var state_19893__$1 = state_19893;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19893__$1,inst_19891);
} else {
return null;
}
}
}
}
}
});})(c__16204__auto__,i,ch))
;
return ((function (switch__16088__auto__,c__16204__auto__,i,ch){
return (function() {
var hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16089__auto__ = null;
var hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16089__auto____0 = (function (){
var statearr_19904 = [null,null,null,null,null,null,null,null,null,null];
(statearr_19904[(0)] = hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16089__auto__);

(statearr_19904[(1)] = (1));

return statearr_19904;
});
var hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16089__auto____1 = (function (state_19893){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_19893);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e19905){if((e19905 instanceof Object)){
var ex__16092__auto__ = e19905;
var statearr_19906_19914 = state_19893;
(statearr_19906_19914[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_19893);

return cljs.core.cst$kw$recur;
} else {
throw e19905;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__19915 = state_19893;
state_19893 = G__19915;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16089__auto__ = function(state_19893){
switch(arguments.length){
case 0:
return hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16089__auto____0.call(this);
case 1:
return hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16089__auto____1.call(this,state_19893);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16089__auto____0;
hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16089__auto____1;
return hoplon$app_pages$_index_DOT_html$load_settings_$_state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto__,i,ch))
})();
var state__16206__auto__ = (function (){var statearr_19907 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_19907[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto__);

return statearr_19907;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto__,i,ch))
);

return c__16204__auto__;
});
hoplon.app_pages._index_DOT_html.remove_nth = (function hoplon$app_pages$_index_DOT_html$remove_nth(coll,n){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["remove-nth",cljs.core.cst$kw$n,n], 0));

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
var help_states_20008 = javelin.core.cell.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
/**
 * @param {...*} var_args
 */
hoplon.app_pages._index_DOT_html.help = ((function (help_states_20008){
return (function() { 
var hoplon$app_pages$_index_DOT_html$help__delegate = function (args__13920__auto__){
var vec__19962 = hoplon.core.parse_args(args__13920__auto__);
var map__19965 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19962,(0),null);
var map__19965__$1 = ((((!((map__19965 == null)))?((((map__19965.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19965.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19965):map__19965);
var contents = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19962,(1),null);
var id = [cljs.core.str(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0())].join('');
var content_id = [cljs.core.str("content-"),cljs.core.str(id)].join('');
var img_id = [cljs.core.str("img-"),cljs.core.str(id)].join('');
var G__19982 = cljs.core.cst$kw$class;
var G__19983 = "help";
var G__19984 = (function (){var G__19989 = cljs.core.cst$kw$id;
var G__19990 = content_id;
var G__19991 = cljs.core.cst$kw$fade_DASH_toggle;
var G__19992 = javelin.core.formula(((function (G__19989,G__19990,G__19991,G__19982,G__19983,id,content_id,img_id,vec__19962,map__19965,map__19965__$1,contents,help_states_20008){
return (function (G__19998,G__19999,G__20000){
return (G__19998.cljs$core$IFn$_invoke$arity$2 ? G__19998.cljs$core$IFn$_invoke$arity$2(G__19999,G__20000) : G__19998.call(null,G__19999,G__20000));
});})(G__19989,G__19990,G__19991,G__19982,G__19983,id,content_id,img_id,vec__19962,map__19965,map__19965__$1,contents,help_states_20008))
).call(null,cljs.core.get,help_states_20008,id);
var G__19993 = cljs.core.cst$kw$class;
var G__19994 = "content";
var G__19995 = cljs.core.cst$kw$click;
var G__19996 = ((function (G__19989,G__19990,G__19991,G__19992,G__19993,G__19994,G__19995,G__19982,G__19983,id,content_id,img_id,vec__19962,map__19965,map__19965__$1,contents,help_states_20008){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(help_states_20008,cljs.core.assoc,id,false);
});})(G__19989,G__19990,G__19991,G__19992,G__19993,G__19994,G__19995,G__19982,G__19983,id,content_id,img_id,vec__19962,map__19965,map__19965__$1,contents,help_states_20008))
;
var G__19997 = contents;
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$9 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$9(G__19989,G__19990,G__19991,G__19992,G__19993,G__19994,G__19995,G__19996,G__19997) : hoplon.core.div.call(null,G__19989,G__19990,G__19991,G__19992,G__19993,G__19994,G__19995,G__19996,G__19997));
})();
var G__19985 = (function (){var G__20001 = cljs.core.cst$kw$id;
var G__20002 = img_id;
var G__20003 = cljs.core.cst$kw$class;
var G__20004 = "img";
var G__20005 = cljs.core.cst$kw$click;
var G__20006 = ((function (G__20001,G__20002,G__20003,G__20004,G__20005,G__19982,G__19983,G__19984,id,content_id,img_id,vec__19962,map__19965,map__19965__$1,contents,help_states_20008){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(help_states_20008,((function (G__20001,G__20002,G__20003,G__20004,G__20005,G__19982,G__19983,G__19984,id,content_id,img_id,vec__19962,map__19965,map__19965__$1,contents,help_states_20008){
return (function (hs){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.zipmap(cljs.core.keys(hs),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(false)),cljs.core.PersistentArrayMap.fromArray([id,cljs.core.not(cljs.core.get.cljs$core$IFn$_invoke$arity$2(hs,id))], true, false)], 0));
});})(G__20001,G__20002,G__20003,G__20004,G__20005,G__19982,G__19983,G__19984,id,content_id,img_id,vec__19962,map__19965,map__19965__$1,contents,help_states_20008))
);
});})(G__20001,G__20002,G__20003,G__20004,G__20005,G__19982,G__19983,G__19984,id,content_id,img_id,vec__19962,map__19965,map__19965__$1,contents,help_states_20008))
;
var G__20007 = "?";
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$7 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$7(G__20001,G__20002,G__20003,G__20004,G__20005,G__20006,G__20007) : hoplon.core.div.call(null,G__20001,G__20002,G__20003,G__20004,G__20005,G__20006,G__20007));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__19982,G__19983,G__19984,G__19985) : hoplon.core.div.call(null,G__19982,G__19983,G__19984,G__19985));
};
var hoplon$app_pages$_index_DOT_html$help = function (var_args){
var args__13920__auto__ = null;
if (arguments.length > 0) {
var G__20009__i = 0, G__20009__a = new Array(arguments.length -  0);
while (G__20009__i < G__20009__a.length) {G__20009__a[G__20009__i] = arguments[G__20009__i + 0]; ++G__20009__i;}
  args__13920__auto__ = new cljs.core.IndexedSeq(G__20009__a,0);
} 
return hoplon$app_pages$_index_DOT_html$help__delegate.call(this,args__13920__auto__);};
hoplon$app_pages$_index_DOT_html$help.cljs$lang$maxFixedArity = 0;
hoplon$app_pages$_index_DOT_html$help.cljs$lang$applyTo = (function (arglist__20010){
var args__13920__auto__ = cljs.core.seq(arglist__20010);
return hoplon$app_pages$_index_DOT_html$help__delegate(args__13920__auto__);
});
hoplon$app_pages$_index_DOT_html$help.cljs$core$IFn$_invoke$arity$variadic = hoplon$app_pages$_index_DOT_html$help__delegate;
return hoplon$app_pages$_index_DOT_html$help;
})()
;})(help_states_20008))
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
var vec__20019 = dimensions;
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20019,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20019,(1),null);
var vec__20022 = cell_count;
var nx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20022,(0),null);
var ny = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20022,(1),null);
var canvas = goog.dom.getElement(canvas_id);
var r = canvas.getBoundingClientRect();
var x = ((((e.clientX - r.left) / width) * nx) | (0));
var y = ((((e.clientY - r.top) / height) * ny) | (0));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["setting selected cell to",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null)], 0));

var G__20025 = hoplon.app_pages._index_DOT_html.selected_cell;
var G__20026 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__20025,G__20026) : cljs.core.reset_BANG_.call(null,G__20025,G__20026));
});
hoplon.app_pages._index_DOT_html.weather_color = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$sunny,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(255),0.25], null),cljs.core.cst$kw$fair,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(255),(0),(1)], null),cljs.core.cst$kw$poor,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(0),(1)], null),cljs.core.cst$kw$inclement,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(192),(0),(0),(1)], null),null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(0),(0),(1)], null)], null);
hoplon.app_pages._index_DOT_html.pressure_map = new cljs.core.PersistentArrayMap(null, 7, [28.5,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(192),(0),(0),(1)], null),28.9,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(192),(0),(0),(1)], null),29.3,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(0),(1)], null),29.5,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(255),(0),(1)], null),29.9,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(128),(255),(1)], null),30.2,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(255),(1)], null),31.0,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(255),(255),(1)], null)], null);
hoplon.app_pages._index_DOT_html.gradient_color = (function hoplon$app_pages$_index_DOT_html$gradient_color(color_map,val){
var vec__20046 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__20055){
var vec__20056 = p__20055;
var vec__20059 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20056,(0),null);
var low = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20059,(0),null);
var l = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20059,(1),null);
var vec__20062 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20056,(1),null);
var high = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20062,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20062,(1),null);
return ((low <= val)) && ((val <= high));
}),cljs.core.partition.cljs$core$IFn$_invoke$arity$3((2),(1),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.sorted_map(),color_map))));
var vec__20049 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20046,(0),null);
var low = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20049,(0),null);
var l = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20049,(1),null);
var vec__20052 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20046,(1),null);
var high = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20052,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20052,(1),null);
return weathergen.math.vector_interpolate(l,h,val,low,high);
});
hoplon.app_pages._index_DOT_html.pressure_color = (function hoplon$app_pages$_index_DOT_html$pressure_color(pressure){
var vec__20068 = hoplon.app_pages._index_DOT_html.gradient_color(hoplon.app_pages._index_DOT_html.pressure_map,pressure);
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20068,(0),null);
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20068,(1),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20068,(2),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20068,(3),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.long$(r),cljs.core.long$(g),cljs.core.long$(b),a], null);
});
hoplon.app_pages._index_DOT_html.temp_map = new cljs.core.PersistentArrayMap(null, 3, [(0),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(255),(1)], null),(20),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(255),(0),(1)], null),(40),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(255),(0),(0),(1)], null)], null);
hoplon.app_pages._index_DOT_html.temperature_color = (function hoplon$app_pages$_index_DOT_html$temperature_color(temp){
var vec__20074 = hoplon.app_pages._index_DOT_html.gradient_color(hoplon.app_pages._index_DOT_html.temp_map,temp);
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20074,(0),null);
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20074,(1),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20074,(2),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20074,(3),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.long$(r),cljs.core.long$(g),cljs.core.long$(b),a], null);
});
hoplon.app_pages._index_DOT_html.fill_color = (function hoplon$app_pages$_index_DOT_html$fill_color(display,w){
var G__20079 = (((display instanceof cljs.core.Keyword))?display.fqn:null);
switch (G__20079) {
case "type":
var G__20080 = cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(w);
return (hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1(G__20080) : hoplon.app_pages._index_DOT_html.weather_color.call(null,G__20080));

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
var vec__20089 = cell_count;
var x_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20089,(0),null);
var y_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20089,(1),null);
var vec__20092 = canvas_dimensions;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20092,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20092,(1),null);
var width = (w / x_cells);
var height = (h / y_cells);
var G__20095 = ctx;
hoplon.app_pages._index_DOT_html.clear_transform(G__20095);

G__20095.translate(((x + 1.0E-6) * width),((y + 1.0E-5) * height));

G__20095.scale((w / x_cells),(h / y_cells));

G__20095.translate(0.5,0.5);

return G__20095;
});
hoplon.app_pages._index_DOT_html.set_fill = (function hoplon$app_pages$_index_DOT_html$set_fill(ctx,r,g,b,a){
return ctx.fillStyle = [cljs.core.str("rgba("),cljs.core.str(r),cljs.core.str(","),cljs.core.str(g),cljs.core.str(","),cljs.core.str(b),cljs.core.str(","),cljs.core.str(a),cljs.core.str(")")].join('');
});
if(typeof hoplon.app_pages._index_DOT_html.prep_overlay !== 'undefined'){
} else {
hoplon.app_pages._index_DOT_html.prep_overlay = (function (){var method_table__8042__auto__ = (function (){var G__20096 = cljs.core.PersistentArrayMap.EMPTY;
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

ctx.lineWidth = "0.05";

return ctx.font = "0.4px serif";
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
hoplon.app_pages._index_DOT_html.stroke_overlay = (function (){var method_table__8042__auto__ = (function (){var G__20100 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20100) : cljs.core.atom.call(null,G__20100));
})();
var prefer_table__8043__auto__ = (function (){var G__20101 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20101) : cljs.core.atom.call(null,G__20101));
})();
var method_cache__8044__auto__ = (function (){var G__20102 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20102) : cljs.core.atom.call(null,G__20102));
})();
var cached_hierarchy__8045__auto__ = (function (){var G__20103 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__20103) : cljs.core.atom.call(null,G__20103));
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
var map__20104 = cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather);
var map__20104__$1 = ((((!((map__20104 == null)))?((((map__20104.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20104.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20104):map__20104);
var speed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20104__$1,cljs.core.cst$kw$speed);
var heading = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20104__$1,cljs.core.cst$kw$heading);
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

var G__20106_20107 = ctx;
G__20106_20107.rotate(weathergen.math.deg__GT_rad(heading));

G__20106_20107.moveTo((0),(0.5 - tail_slant));

G__20106_20107.lineTo((0),(-0.5 + tail_slant));


var n__8032__auto___20108 = full_tails;
var n_20109 = (0);
while(true){
if((n_20109 < n__8032__auto___20108)){
ctx.moveTo((0),((-0.5 + tail_slant) + (tail_step * n_20109)));

ctx.lineTo(tail_width,(-0.5 + (tail_step * n_20109)));

var G__20110 = (n_20109 + (1));
n_20109 = G__20110;
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
return ctx.strokeText(text,(cljs.core.count(text) * -0.08),0.2);
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
hoplon.app_pages._index_DOT_html.draw_map = (function hoplon$app_pages$_index_DOT_html$draw_map(ctx,map,p__20111){
var vec__20115 = p__20111;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20115,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20115,(1),null);
return null;
});
/**
 * Draws the data layer
 */
hoplon.app_pages._index_DOT_html.draw_data = (function hoplon$app_pages$_index_DOT_html$draw_data(ctx,display,opacity,weather_data,cell_count,dimensions){
if(cljs.core.truth_((hoplon.app_pages._index_DOT_html.display_key__GT_name.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.display_key__GT_name.cljs$core$IFn$_invoke$arity$1(display) : hoplon.app_pages._index_DOT_html.display_key__GT_name.call(null,display)))){
ctx.save();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["drawing data",cljs.core.cst$kw$display,display,cljs.core.cst$kw$cells,cljs.core.count(weather_data)], 0));

var seq__20142_20166 = cljs.core.seq(weather_data);
var chunk__20144_20167 = null;
var count__20145_20168 = (0);
var i__20146_20169 = (0);
while(true){
if((i__20146_20169 < count__20145_20168)){
var vec__20148_20170 = chunk__20144_20167.cljs$core$IIndexed$_nth$arity$2(null,i__20146_20169);
var vec__20151_20171 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20148_20170,(0),null);
var x_20172 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20151_20171,(0),null);
var y_20173 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20151_20171,(1),null);
var weather_20174 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20148_20170,(1),null);
var vec__20154_20175 = hoplon.app_pages._index_DOT_html.fill_color(display,weather_20174);
var r_20176 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20154_20175,(0),null);
var g_20177 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20154_20175,(1),null);
var b_20178 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20154_20175,(2),null);
var a_20179 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20154_20175,(3),null);
hoplon.app_pages._index_DOT_html.set_transform(ctx,x_20172,y_20173,cell_count,dimensions);

hoplon.app_pages._index_DOT_html.set_fill(ctx,r_20176,g_20177,b_20178,(a_20179 * opacity));

ctx.fillRect(-0.5,-0.5,(1),(1));

var G__20180 = seq__20142_20166;
var G__20181 = chunk__20144_20167;
var G__20182 = count__20145_20168;
var G__20183 = (i__20146_20169 + (1));
seq__20142_20166 = G__20180;
chunk__20144_20167 = G__20181;
count__20145_20168 = G__20182;
i__20146_20169 = G__20183;
continue;
} else {
var temp__6363__auto___20184 = cljs.core.seq(seq__20142_20166);
if(temp__6363__auto___20184){
var seq__20142_20185__$1 = temp__6363__auto___20184;
if(cljs.core.chunked_seq_QMARK_(seq__20142_20185__$1)){
var c__7922__auto___20186 = cljs.core.chunk_first(seq__20142_20185__$1);
var G__20187 = cljs.core.chunk_rest(seq__20142_20185__$1);
var G__20188 = c__7922__auto___20186;
var G__20189 = cljs.core.count(c__7922__auto___20186);
var G__20190 = (0);
seq__20142_20166 = G__20187;
chunk__20144_20167 = G__20188;
count__20145_20168 = G__20189;
i__20146_20169 = G__20190;
continue;
} else {
var vec__20157_20191 = cljs.core.first(seq__20142_20185__$1);
var vec__20160_20192 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20157_20191,(0),null);
var x_20193 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20160_20192,(0),null);
var y_20194 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20160_20192,(1),null);
var weather_20195 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20157_20191,(1),null);
var vec__20163_20196 = hoplon.app_pages._index_DOT_html.fill_color(display,weather_20195);
var r_20197 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20163_20196,(0),null);
var g_20198 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20163_20196,(1),null);
var b_20199 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20163_20196,(2),null);
var a_20200 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20163_20196,(3),null);
hoplon.app_pages._index_DOT_html.set_transform(ctx,x_20193,y_20194,cell_count,dimensions);

hoplon.app_pages._index_DOT_html.set_fill(ctx,r_20197,g_20198,b_20199,(a_20200 * opacity));

ctx.fillRect(-0.5,-0.5,(1),(1));

var G__20201 = cljs.core.next(seq__20142_20185__$1);
var G__20202 = null;
var G__20203 = (0);
var G__20204 = (0);
seq__20142_20166 = G__20201;
chunk__20144_20167 = G__20202;
count__20145_20168 = G__20203;
i__20146_20169 = G__20204;
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

var seq__20223_20241 = cljs.core.seq(weather_data);
var chunk__20225_20242 = null;
var count__20226_20243 = (0);
var i__20227_20244 = (0);
while(true){
if((i__20227_20244 < count__20226_20243)){
var vec__20229_20245 = chunk__20225_20242.cljs$core$IIndexed$_nth$arity$2(null,i__20227_20244);
var vec__20232_20246 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20229_20245,(0),null);
var x_20247 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20232_20246,(0),null);
var y_20248 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20232_20246,(1),null);
var weather_20249 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20229_20245,(1),null);
var weather_20250__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(weather_20249,cljs.core.cst$kw$x,x_20247,cljs.core.array_seq([cljs.core.cst$kw$y,y_20248], 0));
hoplon.app_pages._index_DOT_html.set_transform(ctx,x_20247,y_20248,cell_count,dimensions);

(hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IFn$_invoke$arity$3 ? hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IFn$_invoke$arity$3(ctx,overlay,weather_20250__$1) : hoplon.app_pages._index_DOT_html.stroke_overlay.call(null,ctx,overlay,weather_20250__$1));

var G__20251 = seq__20223_20241;
var G__20252 = chunk__20225_20242;
var G__20253 = count__20226_20243;
var G__20254 = (i__20227_20244 + (1));
seq__20223_20241 = G__20251;
chunk__20225_20242 = G__20252;
count__20226_20243 = G__20253;
i__20227_20244 = G__20254;
continue;
} else {
var temp__6363__auto___20255 = cljs.core.seq(seq__20223_20241);
if(temp__6363__auto___20255){
var seq__20223_20256__$1 = temp__6363__auto___20255;
if(cljs.core.chunked_seq_QMARK_(seq__20223_20256__$1)){
var c__7922__auto___20257 = cljs.core.chunk_first(seq__20223_20256__$1);
var G__20258 = cljs.core.chunk_rest(seq__20223_20256__$1);
var G__20259 = c__7922__auto___20257;
var G__20260 = cljs.core.count(c__7922__auto___20257);
var G__20261 = (0);
seq__20223_20241 = G__20258;
chunk__20225_20242 = G__20259;
count__20226_20243 = G__20260;
i__20227_20244 = G__20261;
continue;
} else {
var vec__20235_20262 = cljs.core.first(seq__20223_20256__$1);
var vec__20238_20263 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20235_20262,(0),null);
var x_20264 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20238_20263,(0),null);
var y_20265 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20238_20263,(1),null);
var weather_20266 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20235_20262,(1),null);
var weather_20267__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(weather_20266,cljs.core.cst$kw$x,x_20264,cljs.core.array_seq([cljs.core.cst$kw$y,y_20265], 0));
hoplon.app_pages._index_DOT_html.set_transform(ctx,x_20264,y_20265,cell_count,dimensions);

(hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IFn$_invoke$arity$3 ? hoplon.app_pages._index_DOT_html.stroke_overlay.cljs$core$IFn$_invoke$arity$3(ctx,overlay,weather_20267__$1) : hoplon.app_pages._index_DOT_html.stroke_overlay.call(null,ctx,overlay,weather_20267__$1));

var G__20268 = cljs.core.next(seq__20223_20256__$1);
var G__20269 = null;
var G__20270 = (0);
var G__20271 = (0);
seq__20223_20241 = G__20268;
chunk__20225_20242 = G__20269;
count__20226_20243 = G__20270;
i__20227_20244 = G__20271;
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
hoplon.app_pages._index_DOT_html.draw_selected_cell = (function hoplon$app_pages$_index_DOT_html$draw_selected_cell(ctx,p__20272,cell_count,dimensions){
var vec__20276 = p__20272;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20276,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20276,(1),null);
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
var seq__20287 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$bounds,areas));
var chunk__20288 = null;
var count__20289 = (0);
var i__20290 = (0);
while(true){
if((i__20290 < count__20289)){
var map__20291 = chunk__20288.cljs$core$IIndexed$_nth$arity$2(null,i__20290);
var map__20291__$1 = ((((!((map__20291 == null)))?((((map__20291.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20291.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20291):map__20291);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20291__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20291__$1,cljs.core.cst$kw$y);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20291__$1,cljs.core.cst$kw$width);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20291__$1,cljs.core.cst$kw$height);
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

var G__20295 = seq__20287;
var G__20296 = chunk__20288;
var G__20297 = count__20289;
var G__20298 = (i__20290 + (1));
seq__20287 = G__20295;
chunk__20288 = G__20296;
count__20289 = G__20297;
i__20290 = G__20298;
continue;
} else {
var temp__6363__auto__ = cljs.core.seq(seq__20287);
if(temp__6363__auto__){
var seq__20287__$1 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20287__$1)){
var c__7922__auto__ = cljs.core.chunk_first(seq__20287__$1);
var G__20299 = cljs.core.chunk_rest(seq__20287__$1);
var G__20300 = c__7922__auto__;
var G__20301 = cljs.core.count(c__7922__auto__);
var G__20302 = (0);
seq__20287 = G__20299;
chunk__20288 = G__20300;
count__20289 = G__20301;
i__20290 = G__20302;
continue;
} else {
var map__20293 = cljs.core.first(seq__20287__$1);
var map__20293__$1 = ((((!((map__20293 == null)))?((((map__20293.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20293.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20293):map__20293);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20293__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20293__$1,cljs.core.cst$kw$y);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20293__$1,cljs.core.cst$kw$width);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20293__$1,cljs.core.cst$kw$height);
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

var G__20303 = cljs.core.next(seq__20287__$1);
var G__20304 = null;
var G__20305 = (0);
var G__20306 = (0);
seq__20287 = G__20303;
chunk__20288 = G__20304;
count__20289 = G__20305;
i__20290 = G__20306;
continue;
}
} else {
return null;
}
}
break;
}
});
hoplon.app_pages._index_DOT_html.draw_grid = (function hoplon$app_pages$_index_DOT_html$draw_grid(p__20307){
var map__20377 = p__20307;
var map__20377__$1 = ((((!((map__20377 == null)))?((((map__20377.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20377.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20377):map__20377);
var data = map__20377__$1;
var display_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20377__$1,cljs.core.cst$kw$display_DASH_params);
var cell_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20377__$1,cljs.core.cst$kw$cell_DASH_count);
var wind_stability_areas = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20377__$1,cljs.core.cst$kw$wind_DASH_stability_DASH_areas);
var weather_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20377__$1,cljs.core.cst$kw$weather_DASH_data);
var selected_cell = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20377__$1,cljs.core.cst$kw$selected_DASH_cell);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["draw-grid"], 0));

console.time("draw-grid");

var canvas_20446 = goog.dom.getElement("weather-grid");
var map__20379_20447 = display_params;
var map__20379_20448__$1 = ((((!((map__20379_20447 == null)))?((((map__20379_20447.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20379_20447.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20379_20447):map__20379_20447);
var map_20449 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20379_20448__$1,cljs.core.cst$kw$map);
var opacity_20450 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20379_20448__$1,cljs.core.cst$kw$opacity);
var dimensions_20451 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20379_20448__$1,cljs.core.cst$kw$dimensions);
var display_20452 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20379_20448__$1,cljs.core.cst$kw$display);
var overlay_20453 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20379_20448__$1,cljs.core.cst$kw$overlay);
var vec__20380_20454 = dimensions_20451;
var w_20455 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20380_20454,(0),null);
var h_20456 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20380_20454,(1),null);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["canvas",cljs.core.cst$kw$width,canvas_20446.width,cljs.core.cst$kw$w,w_20455], 0));

if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(w_20455,canvas_20446.width))){
var ch_20457 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["canvas is not done loading",cljs.core.cst$kw$dimensions,dimensions_20451,cljs.core.cst$kw$width,canvas_20446.width,cljs.core.cst$kw$height,canvas_20446.height], 0));

var c__16204__auto___20458 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___20458,ch_20457,canvas_20446,map__20379_20447,map__20379_20448__$1,map_20449,opacity_20450,dimensions_20451,display_20452,overlay_20453,vec__20380_20454,w_20455,h_20456,map__20377,map__20377__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___20458,ch_20457,canvas_20446,map__20379_20447,map__20379_20448__$1,map_20449,opacity_20450,dimensions_20451,display_20452,overlay_20453,vec__20380_20454,w_20455,h_20456,map__20377,map__20377__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function (state_20407){
var state_val_20408 = (state_20407[(1)]);
if((state_val_20408 === (7))){
var inst_20403 = (state_20407[(2)]);
var state_20407__$1 = state_20407;
var statearr_20409_20459 = state_20407__$1;
(statearr_20409_20459[(2)] = inst_20403);

(statearr_20409_20459[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20408 === (1))){
var inst_20384 = (200);
var state_20407__$1 = (function (){var statearr_20410 = state_20407;
(statearr_20410[(7)] = inst_20384);

return statearr_20410;
})();
var statearr_20411_20460 = state_20407__$1;
(statearr_20411_20460[(2)] = null);

(statearr_20411_20460[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20408 === (4))){
var inst_20384 = (state_20407[(7)]);
var inst_20388 = (state_20407[(2)]);
var inst_20389 = (inst_20384 > (0));
var state_20407__$1 = (function (){var statearr_20412 = state_20407;
(statearr_20412[(8)] = inst_20388);

return statearr_20412;
})();
if(cljs.core.truth_(inst_20389)){
var statearr_20413_20461 = state_20407__$1;
(statearr_20413_20461[(1)] = (5));

} else {
var statearr_20414_20462 = state_20407__$1;
(statearr_20414_20462[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_20408 === (6))){
var state_20407__$1 = state_20407;
var statearr_20415_20463 = state_20407__$1;
(statearr_20415_20463[(2)] = null);

(statearr_20415_20463[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20408 === (3))){
var inst_20405 = (state_20407[(2)]);
var state_20407__$1 = state_20407;
return cljs.core.async.impl.ioc_helpers.return_chan(state_20407__$1,inst_20405);
} else {
if((state_val_20408 === (2))){
var inst_20386 = cljs.core.async.timeout((10));
var state_20407__$1 = state_20407;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20407__$1,(4),inst_20386);
} else {
if((state_val_20408 === (9))){
var inst_20384 = (state_20407[(7)]);
var inst_20396 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Still waiting for canvas",cljs.core.cst$kw$n,inst_20384], 0));
var inst_20397 = (inst_20384 - (1));
var inst_20384__$1 = inst_20397;
var state_20407__$1 = (function (){var statearr_20416 = state_20407;
(statearr_20416[(9)] = inst_20396);

(statearr_20416[(7)] = inst_20384__$1);

return statearr_20416;
})();
var statearr_20417_20464 = state_20407__$1;
(statearr_20417_20464[(2)] = null);

(statearr_20417_20464[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20408 === (5))){
var inst_20391 = canvas_20446.width;
var inst_20392 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(w_20455,inst_20391);
var state_20407__$1 = state_20407;
if(inst_20392){
var statearr_20418_20465 = state_20407__$1;
(statearr_20418_20465[(1)] = (8));

} else {
var statearr_20419_20466 = state_20407__$1;
(statearr_20419_20466[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_20408 === (10))){
var inst_20400 = (state_20407[(2)]);
var state_20407__$1 = state_20407;
var statearr_20420_20467 = state_20407__$1;
(statearr_20420_20467[(2)] = inst_20400);

(statearr_20420_20467[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_20408 === (8))){
var inst_20394 = hoplon$app_pages$_index_DOT_html$draw_grid(data);
var state_20407__$1 = state_20407;
var statearr_20421_20468 = state_20407__$1;
(statearr_20421_20468[(2)] = inst_20394);

(statearr_20421_20468[(1)] = (10));


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
});})(c__16204__auto___20458,ch_20457,canvas_20446,map__20379_20447,map__20379_20448__$1,map_20449,opacity_20450,dimensions_20451,display_20452,overlay_20453,vec__20380_20454,w_20455,h_20456,map__20377,map__20377__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
;
return ((function (switch__16088__auto__,c__16204__auto___20458,ch_20457,canvas_20446,map__20379_20447,map__20379_20448__$1,map_20449,opacity_20450,dimensions_20451,display_20452,overlay_20453,vec__20380_20454,w_20455,h_20456,map__20377,map__20377__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function() {
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto__ = null;
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto____0 = (function (){
var statearr_20425 = [null,null,null,null,null,null,null,null,null,null];
(statearr_20425[(0)] = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto__);

(statearr_20425[(1)] = (1));

return statearr_20425;
});
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto____1 = (function (state_20407){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_20407);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e20426){if((e20426 instanceof Object)){
var ex__16092__auto__ = e20426;
var statearr_20427_20469 = state_20407;
(statearr_20427_20469[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_20407);

return cljs.core.cst$kw$recur;
} else {
throw e20426;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__20470 = state_20407;
state_20407 = G__20470;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto__ = function(state_20407){
switch(arguments.length){
case 0:
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto____0.call(this);
case 1:
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto____1.call(this,state_20407);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto____0;
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto____1;
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___20458,ch_20457,canvas_20446,map__20379_20447,map__20379_20448__$1,map_20449,opacity_20450,dimensions_20451,display_20452,overlay_20453,vec__20380_20454,w_20455,h_20456,map__20377,map__20377__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
})();
var state__16206__auto__ = (function (){var statearr_20428 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_20428[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___20458);

return statearr_20428;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___20458,ch_20457,canvas_20446,map__20379_20447,map__20379_20448__$1,map_20449,opacity_20450,dimensions_20451,display_20452,overlay_20453,vec__20380_20454,w_20455,h_20456,map__20377,map__20377__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
);

} else {
var ctx_20471 = canvas_20446.getContext("2d");
var vec__20429_20472 = cell_count;
var x_cells_20473 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20429_20472,(0),null);
var y_cells_20474 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20429_20472,(1),null);
var cell_width_20475 = (w_20455 / x_cells_20473);
var cell_height_20476 = (h_20456 / y_cells_20474);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Canvas is correct size",cljs.core.cst$kw$dimensions,dimensions_20451,cljs.core.cst$kw$width,canvas_20446.width,cljs.core.cst$kw$height,canvas_20446.height], 0));

hoplon.app_pages._index_DOT_html.clear_transform(ctx_20471);

ctx_20471.clearRect((0),(0),w_20455,h_20456);

var temp__6361__auto___20477 = hoplon.app_pages._index_DOT_html.draw_map(ctx_20471,map_20449,dimensions_20451);
if(cljs.core.truth_(temp__6361__auto___20477)){
var ch_20478 = temp__6361__auto___20477;
var c__16204__auto___20479 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___20479,ch_20478,temp__6361__auto___20477,ctx_20471,vec__20429_20472,x_cells_20473,y_cells_20474,cell_width_20475,cell_height_20476,canvas_20446,map__20379_20447,map__20379_20448__$1,map_20449,opacity_20450,dimensions_20451,display_20452,overlay_20453,vec__20380_20454,w_20455,h_20456,map__20377,map__20377__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___20479,ch_20478,temp__6361__auto___20477,ctx_20471,vec__20429_20472,x_cells_20473,y_cells_20474,cell_width_20475,cell_height_20476,canvas_20446,map__20379_20447,map__20379_20448__$1,map_20449,opacity_20450,dimensions_20451,display_20452,overlay_20453,vec__20380_20454,w_20455,h_20456,map__20377,map__20377__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function (state_20436){
var state_val_20437 = (state_20436[(1)]);
if((state_val_20437 === (1))){
var state_20436__$1 = state_20436;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20436__$1,(2),ch_20478);
} else {
if((state_val_20437 === (2))){
var inst_20433 = (state_20436[(2)]);
var inst_20434 = hoplon$app_pages$_index_DOT_html$draw_grid(data);
var state_20436__$1 = (function (){var statearr_20438 = state_20436;
(statearr_20438[(7)] = inst_20433);

return statearr_20438;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_20436__$1,inst_20434);
} else {
return null;
}
}
});})(c__16204__auto___20479,ch_20478,temp__6361__auto___20477,ctx_20471,vec__20429_20472,x_cells_20473,y_cells_20474,cell_width_20475,cell_height_20476,canvas_20446,map__20379_20447,map__20379_20448__$1,map_20449,opacity_20450,dimensions_20451,display_20452,overlay_20453,vec__20380_20454,w_20455,h_20456,map__20377,map__20377__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
;
return ((function (switch__16088__auto__,c__16204__auto___20479,ch_20478,temp__6361__auto___20477,ctx_20471,vec__20429_20472,x_cells_20473,y_cells_20474,cell_width_20475,cell_height_20476,canvas_20446,map__20379_20447,map__20379_20448__$1,map_20449,opacity_20450,dimensions_20451,display_20452,overlay_20453,vec__20380_20454,w_20455,h_20456,map__20377,map__20377__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell){
return (function() {
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto__ = null;
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto____0 = (function (){
var statearr_20442 = [null,null,null,null,null,null,null,null];
(statearr_20442[(0)] = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto__);

(statearr_20442[(1)] = (1));

return statearr_20442;
});
var hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto____1 = (function (state_20436){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_20436);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e20443){if((e20443 instanceof Object)){
var ex__16092__auto__ = e20443;
var statearr_20444_20480 = state_20436;
(statearr_20444_20480[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_20436);

return cljs.core.cst$kw$recur;
} else {
throw e20443;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__20481 = state_20436;
state_20436 = G__20481;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto__ = function(state_20436){
switch(arguments.length){
case 0:
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto____0.call(this);
case 1:
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto____1.call(this,state_20436);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto____0;
hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto____1;
return hoplon$app_pages$_index_DOT_html$draw_grid_$_state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___20479,ch_20478,temp__6361__auto___20477,ctx_20471,vec__20429_20472,x_cells_20473,y_cells_20474,cell_width_20475,cell_height_20476,canvas_20446,map__20379_20447,map__20379_20448__$1,map_20449,opacity_20450,dimensions_20451,display_20452,overlay_20453,vec__20380_20454,w_20455,h_20456,map__20377,map__20377__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
})();
var state__16206__auto__ = (function (){var statearr_20445 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_20445[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___20479);

return statearr_20445;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___20479,ch_20478,temp__6361__auto___20477,ctx_20471,vec__20429_20472,x_cells_20473,y_cells_20474,cell_width_20475,cell_height_20476,canvas_20446,map__20379_20447,map__20379_20448__$1,map_20449,opacity_20450,dimensions_20451,display_20452,overlay_20453,vec__20380_20454,w_20455,h_20456,map__20377,map__20377__$1,data,display_params,cell_count,wind_stability_areas,weather_data,selected_cell))
);

} else {
hoplon.app_pages._index_DOT_html.draw_data(ctx_20471,display_20452,opacity_20450,weather_data,cell_count,dimensions_20451);

hoplon.app_pages._index_DOT_html.draw_overlay(ctx_20471,overlay_20453,weather_data,cell_count,dimensions_20451);

hoplon.app_pages._index_DOT_html.draw_selected_cell(ctx_20471,selected_cell,cell_count,dimensions_20451);

hoplon.app_pages._index_DOT_html.draw_wind_stability(ctx_20471,wind_stability_areas,cell_count,dimensions_20451);
}
}

return console.timeEnd("draw-grid");
});
hoplon.app_pages._index_DOT_html.ESCAPE_KEY = (27);
hoplon.app_pages._index_DOT_html.ENTER_KEY = (13);
hoplon.app_pages._index_DOT_html.two_column = (function hoplon$app_pages$_index_DOT_html$two_column(left,right){
var G__20486 = cljs.core.cst$kw$class;
var G__20487 = "two-column";
var G__20488 = (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$class,"left-column",left) : hoplon.core.div.call(null,cljs.core.cst$kw$class,"left-column",left));
var G__20489 = (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$class,"right-column",right) : hoplon.core.div.call(null,cljs.core.cst$kw$class,"right-column",right));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__20486,G__20487,G__20488,G__20489) : hoplon.core.div.call(null,G__20486,G__20487,G__20488,G__20489));
});
hoplon.app_pages._index_DOT_html.edit_field = (function hoplon$app_pages$_index_DOT_html$edit_field(var_args){
var args20492 = [];
var len__8202__auto___20513 = arguments.length;
var i__8203__auto___20514 = (0);
while(true){
if((i__8203__auto___20514 < len__8202__auto___20513)){
args20492.push((arguments[i__8203__auto___20514]));

var G__20515 = (i__8203__auto___20514 + (1));
i__8203__auto___20514 = G__20515;
continue;
} else {
}
break;
}

var G__20494 = args20492.length;
switch (G__20494) {
case 2:
return hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args20492.length)].join('')));

}
});

hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2 = (function (c,path){
return hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3(c,path,cljs.core.PersistentArrayMap.EMPTY);
});

hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3 = (function (c,path,opts){
var map__20495 = opts;
var map__20495__$1 = ((((!((map__20495 == null)))?((((map__20495.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20495.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20495):map__20495);
var change_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20495__$1,cljs.core.cst$kw$change_DASH_fn);
var G__20500 = cljs.core.cst$kw$type;
var G__20501 = "text";
var G__20502 = cljs.core.cst$kw$value;
var G__20503 = javelin.core.formula(((function (G__20500,G__20501,G__20502,map__20495,map__20495__$1,change_fn){
return (function (G__20508,G__20507,G__20506){
return (G__20506.cljs$core$IFn$_invoke$arity$2 ? G__20506.cljs$core$IFn$_invoke$arity$2(G__20507,G__20508) : G__20506.call(null,G__20507,G__20508));
});})(G__20500,G__20501,G__20502,map__20495,map__20495__$1,change_fn))
).call(null,path,c,cljs.core.get_in);
var G__20504 = cljs.core.cst$kw$change;
var G__20505 = (cljs.core.truth_(change_fn)?((function (G__20500,G__20501,G__20502,G__20503,G__20504,map__20495,map__20495__$1,change_fn){
return (function (p1__20490_SHARP_){
var G__20510 = (function (){var G__20511 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__20490_SHARP_) : cljs.core.deref.call(null,p1__20490_SHARP_));
return Number(G__20511);
})();
return (change_fn.cljs$core$IFn$_invoke$arity$1 ? change_fn.cljs$core$IFn$_invoke$arity$1(G__20510) : change_fn.call(null,G__20510));
});})(G__20500,G__20501,G__20502,G__20503,G__20504,map__20495,map__20495__$1,change_fn))
:((function (G__20500,G__20501,G__20502,G__20503,G__20504,map__20495,map__20495__$1,change_fn){
return (function (p1__20491_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(c,cljs.core.assoc_in,path,(function (){var G__20512 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__20491_SHARP_) : cljs.core.deref.call(null,p1__20491_SHARP_));
return Number(G__20512);
})());
});})(G__20500,G__20501,G__20502,G__20503,G__20504,map__20495,map__20495__$1,change_fn))
);
return (hoplon.core.input.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.input.cljs$core$IFn$_invoke$arity$6(G__20500,G__20501,G__20502,G__20503,G__20504,G__20505) : hoplon.core.input.call(null,G__20500,G__20501,G__20502,G__20503,G__20504,G__20505));
});

hoplon.app_pages._index_DOT_html.edit_field.cljs$lang$maxFixedArity = 3;

hoplon.app_pages._index_DOT_html.time_entry = (function hoplon$app_pages$_index_DOT_html$time_entry(c,path){
var G__20539 = cljs.core.cst$kw$class;
var G__20540 = "time-params";
var G__20541 = (function (){var G__20544 = (function (){var G__20545 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__20539,G__20540){
return (function (p1__20517_SHARP_){
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$class,"time-entry-label",p1__20517_SHARP_) : hoplon.core.td.call(null,cljs.core.cst$kw$class,"time-entry-label",p1__20517_SHARP_));
});})(G__20539,G__20540))
,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Day","Hour","Minute"], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__20545) : hoplon.core.tr.call(null,G__20545));
})();
return (hoplon.core.thead.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.thead.cljs$core$IFn$_invoke$arity$1(G__20544) : hoplon.core.thead.call(null,G__20544));
})();
var G__20542 = (function (){var G__20549 = (function (){var G__20551 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__20539,G__20540,G__20541){
return (function (p1__20518_SHARP_){
var G__20552 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(c,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,p1__20518_SHARP_));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__20552) : hoplon.core.td.call(null,G__20552));
});})(G__20539,G__20540,G__20541))
,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$day,cljs.core.cst$kw$hour,cljs.core.cst$kw$minute], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__20551) : hoplon.core.tr.call(null,G__20551));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1(G__20549) : hoplon.core.tbody.call(null,G__20549));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$4(G__20539,G__20540,G__20541,G__20542) : hoplon.core.table.call(null,G__20539,G__20540,G__20541,G__20542));
});
hoplon.app_pages._index_DOT_html.button_bar = (function hoplon$app_pages$_index_DOT_html$button_bar(){
var G__20617 = cljs.core.cst$kw$class;
var G__20618 = "button-bar";
var G__20619 = (function (){var G__20625 = cljs.core.cst$kw$id;
var G__20626 = "enlarge-grid";
var G__20627 = cljs.core.cst$kw$click;
var G__20628 = ((function (G__20625,G__20626,G__20627,G__20617,G__20618){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.display_params,cljs.core.update,cljs.core.cst$kw$dimensions,((function (G__20625,G__20626,G__20627,G__20617,G__20618){
return (function (p__20632){
var vec__20633 = p__20632;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20633,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20633,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x + (50)),(y + (50))], null);
});})(G__20625,G__20626,G__20627,G__20617,G__20618))
);
});})(G__20625,G__20626,G__20627,G__20617,G__20618))
;
var G__20629 = cljs.core.cst$kw$title;
var G__20630 = "Enlarge grid";
var G__20631 = (hoplon.core.img.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$src,"images/bigger.png") : hoplon.core.img.call(null,cljs.core.cst$kw$src,"images/bigger.png"));
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$7 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$7(G__20625,G__20626,G__20627,G__20628,G__20629,G__20630,G__20631) : hoplon.core.button.call(null,G__20625,G__20626,G__20627,G__20628,G__20629,G__20630,G__20631));
})();
var G__20620 = (function (){var G__20640 = cljs.core.cst$kw$id;
var G__20641 = "shrink-grid";
var G__20642 = cljs.core.cst$kw$click;
var G__20643 = ((function (G__20640,G__20641,G__20642,G__20617,G__20618,G__20619){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.display_params,cljs.core.update,cljs.core.cst$kw$dimensions,((function (G__20640,G__20641,G__20642,G__20617,G__20618,G__20619){
return (function (p__20647){
var vec__20648 = p__20647;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20648,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20648,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x - (50)),(y - (50))], null);
});})(G__20640,G__20641,G__20642,G__20617,G__20618,G__20619))
);
});})(G__20640,G__20641,G__20642,G__20617,G__20618,G__20619))
;
var G__20644 = cljs.core.cst$kw$title;
var G__20645 = "Shrink grid";
var G__20646 = (hoplon.core.img.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$src,"images/smaller.png") : hoplon.core.img.call(null,cljs.core.cst$kw$src,"images/smaller.png"));
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$7 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$7(G__20640,G__20641,G__20642,G__20643,G__20644,G__20645,G__20646) : hoplon.core.button.call(null,G__20640,G__20641,G__20642,G__20643,G__20644,G__20645,G__20646));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__20617,G__20618,G__20619,G__20620) : hoplon.core.div.call(null,G__20617,G__20618,G__20619,G__20620));
});
hoplon.app_pages._index_DOT_html.weather_grid = (function hoplon$app_pages$_index_DOT_html$weather_grid(){
var vec__20789 = javelin.core.cell_map(cljs.core.identity,javelin.core.formula((function (p__20792){
var vec__20793 = p__20792;
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20793,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20793,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [width,height], null);
})).call(null,hoplon.app_pages._index_DOT_html.dimensions));
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20789,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20789,(1),null);
var vec__20796 = javelin.core.cell_map(cljs.core.identity,javelin.core.formula(((function (vec__20789,width,height){
return (function (p__20799){
var map__20800 = p__20799;
var map__20800__$1 = ((((!((map__20800 == null)))?((((map__20800.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20800.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20800):map__20800);
var map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20800__$1,cljs.core.cst$kw$map);
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [map], null);
});})(vec__20789,width,height))
).call(null,hoplon.app_pages._index_DOT_html.display_params));
var map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20796,(0),null);
var vec__20802 = javelin.core.cell_map(cljs.core.identity,javelin.core.formula(((function (vec__20796,map,vec__20789,width,height){
return (function (p__20805){
var vec__20806 = p__20805;
var nx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20806,(0),null);
var ny = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20806,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [nx,ny], null);
});})(vec__20796,map,vec__20789,width,height))
).call(null,hoplon.app_pages._index_DOT_html.cell_count));
var nx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20802,(0),null);
var ny = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20802,(1),null);
var G__20810 = cljs.core.cst$kw$id;
var G__20811 = "weather-grid-stack";
var G__20812 = cljs.core.cst$kw$width;
var G__20813 = javelin.core.formula(((function (G__20810,G__20811,G__20812,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (G__20819){
return G__20819;
});})(G__20810,G__20811,G__20812,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
).call(null,width);
var G__20814 = cljs.core.cst$kw$height;
var G__20815 = javelin.core.formula(((function (G__20810,G__20811,G__20812,G__20813,G__20814,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (G__20820){
return G__20820;
});})(G__20810,G__20811,G__20812,G__20813,G__20814,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
).call(null,height);
var G__20816 = (function (){var iter__7873__auto__ = ((function (G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function hoplon$app_pages$_index_DOT_html$weather_grid_$_iter__20821(s__20822){
return (new cljs.core.LazySeq(null,((function (G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (){
var s__20822__$1 = s__20822;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__20822__$1);
if(temp__6363__auto__){
var s__20822__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__20822__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__20822__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__20824 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__20823 = (0);
while(true){
if((i__20823 < size__7872__auto__)){
var vec__20863 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__20823);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20863,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20863,(1),null);
cljs.core.chunk_append(b__20824,(function (){var G__20866 = cljs.core.cst$kw$id;
var G__20867 = hoplon.app_pages._index_DOT_html.map_image_id(k);
var G__20868 = cljs.core.cst$kw$width;
var G__20869 = javelin.core.formula(((function (i__20823,G__20866,G__20867,G__20868,vec__20863,k,v,c__7871__auto__,size__7872__auto__,b__20824,s__20822__$2,temp__6363__auto__,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (G__20876){
return G__20876;
});})(i__20823,G__20866,G__20867,G__20868,vec__20863,k,v,c__7871__auto__,size__7872__auto__,b__20824,s__20822__$2,temp__6363__auto__,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
).call(null,width);
var G__20870 = cljs.core.cst$kw$height;
var G__20871 = javelin.core.formula(((function (i__20823,G__20866,G__20867,G__20868,G__20869,G__20870,vec__20863,k,v,c__7871__auto__,size__7872__auto__,b__20824,s__20822__$2,temp__6363__auto__,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (G__20877){
return G__20877;
});})(i__20823,G__20866,G__20867,G__20868,G__20869,G__20870,vec__20863,k,v,c__7871__auto__,size__7872__auto__,b__20824,s__20822__$2,temp__6363__auto__,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
).call(null,height);
var G__20872 = cljs.core.cst$kw$style;
var G__20873 = javelin.core.formula(((function (i__20823,G__20866,G__20867,G__20868,G__20869,G__20870,G__20871,G__20872,vec__20863,k,v,c__7871__auto__,size__7872__auto__,b__20824,s__20822__$2,temp__6363__auto__,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (G__20878,G__20880,G__20879){
if(cljs.core.truth_((G__20878.cljs$core$IFn$_invoke$arity$2 ? G__20878.cljs$core$IFn$_invoke$arity$2(G__20879,G__20880) : G__20878.call(null,G__20879,G__20880)))){
return "";
} else {
return "display: none";
}
});})(i__20823,G__20866,G__20867,G__20868,G__20869,G__20870,G__20871,G__20872,vec__20863,k,v,c__7871__auto__,size__7872__auto__,b__20824,s__20822__$2,temp__6363__auto__,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
).call(null,cljs.core._EQ_,map,k);
var G__20874 = cljs.core.cst$kw$src;
var G__20875 = v;
return (hoplon.core.img.cljs$core$IFn$_invoke$arity$10 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$10(G__20866,G__20867,G__20868,G__20869,G__20870,G__20871,G__20872,G__20873,G__20874,G__20875) : hoplon.core.img.call(null,G__20866,G__20867,G__20868,G__20869,G__20870,G__20871,G__20872,G__20873,G__20874,G__20875));
})());

var G__20926 = (i__20823 + (1));
i__20823 = G__20926;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__20824),hoplon$app_pages$_index_DOT_html$weather_grid_$_iter__20821(cljs.core.chunk_rest(s__20822__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__20824),null);
}
} else {
var vec__20881 = cljs.core.first(s__20822__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20881,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20881,(1),null);
return cljs.core.cons((function (){var G__20884 = cljs.core.cst$kw$id;
var G__20885 = hoplon.app_pages._index_DOT_html.map_image_id(k);
var G__20886 = cljs.core.cst$kw$width;
var G__20887 = javelin.core.formula(((function (G__20884,G__20885,G__20886,vec__20881,k,v,s__20822__$2,temp__6363__auto__,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (G__20894){
return G__20894;
});})(G__20884,G__20885,G__20886,vec__20881,k,v,s__20822__$2,temp__6363__auto__,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
).call(null,width);
var G__20888 = cljs.core.cst$kw$height;
var G__20889 = javelin.core.formula(((function (G__20884,G__20885,G__20886,G__20887,G__20888,vec__20881,k,v,s__20822__$2,temp__6363__auto__,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (G__20895){
return G__20895;
});})(G__20884,G__20885,G__20886,G__20887,G__20888,vec__20881,k,v,s__20822__$2,temp__6363__auto__,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
).call(null,height);
var G__20890 = cljs.core.cst$kw$style;
var G__20891 = javelin.core.formula(((function (G__20884,G__20885,G__20886,G__20887,G__20888,G__20889,G__20890,vec__20881,k,v,s__20822__$2,temp__6363__auto__,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (G__20896,G__20898,G__20897){
if(cljs.core.truth_((G__20896.cljs$core$IFn$_invoke$arity$2 ? G__20896.cljs$core$IFn$_invoke$arity$2(G__20897,G__20898) : G__20896.call(null,G__20897,G__20898)))){
return "";
} else {
return "display: none";
}
});})(G__20884,G__20885,G__20886,G__20887,G__20888,G__20889,G__20890,vec__20881,k,v,s__20822__$2,temp__6363__auto__,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
).call(null,cljs.core._EQ_,map,k);
var G__20892 = cljs.core.cst$kw$src;
var G__20893 = v;
return (hoplon.core.img.cljs$core$IFn$_invoke$arity$10 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$10(G__20884,G__20885,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,G__20893) : hoplon.core.img.call(null,G__20884,G__20885,G__20886,G__20887,G__20888,G__20889,G__20890,G__20891,G__20892,G__20893));
})(),hoplon$app_pages$_index_DOT_html$weather_grid_$_iter__20821(cljs.core.rest(s__20822__$2)));
}
} else {
return null;
}
break;
}
});})(G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
,null,null));
});})(G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
;
return iter__7873__auto__(hoplon.app_pages._index_DOT_html.map_image);
})();
var G__20817 = (function (){var G__20900 = cljs.core.cst$kw$id;
var G__20901 = "blank-map";
var G__20902 = cljs.core.cst$kw$width;
var G__20903 = javelin.core.formula(((function (G__20900,G__20901,G__20902,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (G__20908){
return G__20908;
});})(G__20900,G__20901,G__20902,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
).call(null,width);
var G__20904 = cljs.core.cst$kw$height;
var G__20905 = javelin.core.formula(((function (G__20900,G__20901,G__20902,G__20903,G__20904,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (G__20909){
return G__20909;
});})(G__20900,G__20901,G__20902,G__20903,G__20904,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
).call(null,height);
var G__20906 = cljs.core.cst$kw$src;
var G__20907 = "images/blank.png";
return (hoplon.core.img.cljs$core$IFn$_invoke$arity$8 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$8(G__20900,G__20901,G__20902,G__20903,G__20904,G__20905,G__20906,G__20907) : hoplon.core.img.call(null,G__20900,G__20901,G__20902,G__20903,G__20904,G__20905,G__20906,G__20907));
})();
var G__20818 = (function (){var G__20912 = cljs.core.cst$kw$id;
var G__20913 = "weather-grid";
var G__20914 = cljs.core.cst$kw$css;
var G__20915 = javelin.core.formula(((function (G__20912,G__20913,G__20914,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,G__20817,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (G__20923){
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cursor,(function (){var G__20922 = (cljs.core.truth_((G__20923 instanceof cljs.core.Keyword))?G__20923.fqn:null);
switch (G__20922) {
case "select":
return "pointer";

break;
case "wind-stability":
return "crosshair";

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(G__20923)].join('')));

}
})()], null);
});})(G__20912,G__20913,G__20914,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,G__20817,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
).call(null,hoplon.app_pages._index_DOT_html.current_tool);
var G__20916 = cljs.core.cst$kw$width;
var G__20917 = javelin.core.formula(((function (G__20912,G__20913,G__20914,G__20915,G__20916,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,G__20817,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (G__20924){
return G__20924;
});})(G__20912,G__20913,G__20914,G__20915,G__20916,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,G__20817,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
).call(null,width);
var G__20918 = cljs.core.cst$kw$height;
var G__20919 = javelin.core.formula(((function (G__20912,G__20913,G__20914,G__20915,G__20916,G__20917,G__20918,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,G__20817,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (G__20925){
return G__20925;
});})(G__20912,G__20913,G__20914,G__20915,G__20916,G__20917,G__20918,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,G__20817,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
).call(null,height);
var G__20920 = cljs.core.cst$kw$click;
var G__20921 = ((function (G__20912,G__20913,G__20914,G__20915,G__20916,G__20917,G__20918,G__20919,G__20920,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,G__20817,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height){
return (function (p1__20651_SHARP_){
return hoplon.app_pages._index_DOT_html.grid_click(p1__20651_SHARP_,"weather-grid",(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.cell_count) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.cell_count)),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.dimensions) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.dimensions)));
});})(G__20912,G__20913,G__20914,G__20915,G__20916,G__20917,G__20918,G__20919,G__20920,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,G__20817,vec__20802,nx,ny,vec__20796,map,vec__20789,width,height))
;
return (hoplon.core.canvas.cljs$core$IFn$_invoke$arity$10 ? hoplon.core.canvas.cljs$core$IFn$_invoke$arity$10(G__20912,G__20913,G__20914,G__20915,G__20916,G__20917,G__20918,G__20919,G__20920,G__20921) : hoplon.core.canvas.call(null,G__20912,G__20913,G__20914,G__20915,G__20916,G__20917,G__20918,G__20919,G__20920,G__20921));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$9 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$9(G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,G__20817,G__20818) : hoplon.core.div.call(null,G__20810,G__20811,G__20812,G__20813,G__20814,G__20815,G__20816,G__20817,G__20818));
});
hoplon.app_pages._index_DOT_html.display_controls = (function hoplon$app_pages$_index_DOT_html$display_controls(){
var select_row = (function (p__21243,help_path){
var map__21244 = p__21243;
var map__21244__$1 = ((((!((map__21244 == null)))?((((map__21244.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21244.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__21244):map__21244);
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21244__$1,cljs.core.cst$kw$label);
var k = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21244__$1,cljs.core.cst$kw$k);
var key__GT_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21244__$1,cljs.core.cst$kw$key_DASH__GT_name);
var name__GT_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21244__$1,cljs.core.cst$kw$name_DASH__GT_key);
var G__21246 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(label) : hoplon.core.td.call(null,label));
var G__21247 = (function (){var G__21352 = (function (){var G__21354 = cljs.core.cst$kw$change;
var G__21355 = ((function (G__21354,G__21246,map__21244,map__21244__$1,label,k,key__GT_name,name__GT_key){
return (function (p1__20928_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.display_params,cljs.core.assoc,k,(function (){var G__21357 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__20928_SHARP_) : cljs.core.deref.call(null,p1__20928_SHARP_));
return (name__GT_key.cljs$core$IFn$_invoke$arity$1 ? name__GT_key.cljs$core$IFn$_invoke$arity$1(G__21357) : name__GT_key.call(null,G__21357));
})());
});})(G__21354,G__21246,map__21244,map__21244__$1,label,k,key__GT_name,name__GT_key))
;
var G__21356 = (function (){var iter__7873__auto__ = ((function (G__21354,G__21355,G__21246,map__21244,map__21244__$1,label,k,key__GT_name,name__GT_key){
return (function hoplon$app_pages$_index_DOT_html$display_controls_$_iter__21358(s__21359){
return (new cljs.core.LazySeq(null,((function (G__21354,G__21355,G__21246,map__21244,map__21244__$1,label,k,key__GT_name,name__GT_key){
return (function (){
var s__21359__$1 = s__21359;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__21359__$1);
if(temp__6363__auto__){
var s__21359__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__21359__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__21359__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__21361 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__21360 = (0);
while(true){
if((i__21360 < size__7872__auto__)){
var name = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__21360);
cljs.core.chunk_append(b__21361,(function (){var G__21419 = cljs.core.cst$kw$value;
var G__21420 = name;
var G__21421 = cljs.core.cst$kw$selected;
var G__21422 = javelin.core.formula(((function (i__21360,G__21419,G__21420,G__21421,name,c__7871__auto__,size__7872__auto__,b__21361,s__21359__$2,temp__6363__auto__,G__21354,G__21355,G__21246,map__21244,map__21244__$1,label,k,key__GT_name,name__GT_key){
return (function (G__21424,G__21425,G__21428,G__21427,G__21426){
var G__21430 = (function (){var G__21432 = (G__21426.cljs$core$IFn$_invoke$arity$1 ? G__21426.cljs$core$IFn$_invoke$arity$1(G__21427) : G__21426.call(null,G__21427));
return (G__21425.cljs$core$IFn$_invoke$arity$1 ? G__21425.cljs$core$IFn$_invoke$arity$1(G__21432) : G__21425.call(null,G__21432));
})();
var G__21431 = G__21428;
return (G__21424.cljs$core$IFn$_invoke$arity$2 ? G__21424.cljs$core$IFn$_invoke$arity$2(G__21430,G__21431) : G__21424.call(null,G__21430,G__21431));
});})(i__21360,G__21419,G__21420,G__21421,name,c__7871__auto__,size__7872__auto__,b__21361,s__21359__$2,temp__6363__auto__,G__21354,G__21355,G__21246,map__21244,map__21244__$1,label,k,key__GT_name,name__GT_key))
).call(null,cljs.core._EQ_,key__GT_name,name,hoplon.app_pages._index_DOT_html.display_params,k);
var G__21423 = name;
return (hoplon.core.option.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.option.cljs$core$IFn$_invoke$arity$5(G__21419,G__21420,G__21421,G__21422,G__21423) : hoplon.core.option.call(null,G__21419,G__21420,G__21421,G__21422,G__21423));
})());

var G__21556 = (i__21360 + (1));
i__21360 = G__21556;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__21361),hoplon$app_pages$_index_DOT_html$display_controls_$_iter__21358(cljs.core.chunk_rest(s__21359__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__21361),null);
}
} else {
var name = cljs.core.first(s__21359__$2);
return cljs.core.cons((function (){var G__21442 = cljs.core.cst$kw$value;
var G__21443 = name;
var G__21444 = cljs.core.cst$kw$selected;
var G__21445 = javelin.core.formula(((function (G__21442,G__21443,G__21444,name,s__21359__$2,temp__6363__auto__,G__21354,G__21355,G__21246,map__21244,map__21244__$1,label,k,key__GT_name,name__GT_key){
return (function (G__21447,G__21448,G__21451,G__21450,G__21449){
var G__21453 = (function (){var G__21455 = (G__21449.cljs$core$IFn$_invoke$arity$1 ? G__21449.cljs$core$IFn$_invoke$arity$1(G__21450) : G__21449.call(null,G__21450));
return (G__21448.cljs$core$IFn$_invoke$arity$1 ? G__21448.cljs$core$IFn$_invoke$arity$1(G__21455) : G__21448.call(null,G__21455));
})();
var G__21454 = G__21451;
return (G__21447.cljs$core$IFn$_invoke$arity$2 ? G__21447.cljs$core$IFn$_invoke$arity$2(G__21453,G__21454) : G__21447.call(null,G__21453,G__21454));
});})(G__21442,G__21443,G__21444,name,s__21359__$2,temp__6363__auto__,G__21354,G__21355,G__21246,map__21244,map__21244__$1,label,k,key__GT_name,name__GT_key))
).call(null,cljs.core._EQ_,key__GT_name,name,hoplon.app_pages._index_DOT_html.display_params,k);
var G__21446 = name;
return (hoplon.core.option.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.option.cljs$core$IFn$_invoke$arity$5(G__21442,G__21443,G__21444,G__21445,G__21446) : hoplon.core.option.call(null,G__21442,G__21443,G__21444,G__21445,G__21446));
})(),hoplon$app_pages$_index_DOT_html$display_controls_$_iter__21358(cljs.core.rest(s__21359__$2)));
}
} else {
return null;
}
break;
}
});})(G__21354,G__21355,G__21246,map__21244,map__21244__$1,label,k,key__GT_name,name__GT_key))
,null,null));
});})(G__21354,G__21355,G__21246,map__21244,map__21244__$1,label,k,key__GT_name,name__GT_key))
;
return iter__7873__auto__(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.keys(name__GT_key),"None"));
})();
return (hoplon.core.select.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.select.cljs$core$IFn$_invoke$arity$3(G__21354,G__21355,G__21356) : hoplon.core.select.call(null,G__21354,G__21355,G__21356));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21352) : hoplon.core.td.call(null,G__21352));
})();
var G__21248 = (function (){var G__21456 = hoplon.app_pages._index_DOT_html.help_for(help_path);
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21456) : hoplon.core.td.call(null,G__21456));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__21246,G__21247,G__21248) : hoplon.core.tr.call(null,G__21246,G__21247,G__21248));
});
var G__21457 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Display controls") : hoplon.core.legend.call(null,"Display controls"));
var G__21458 = (function (){var G__21506 = cljs.core.cst$kw$class;
var G__21507 = "display-controls";
var G__21508 = (function (){var G__21532 = (function (){var G__21533 = select_row(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$label,"Map",cljs.core.cst$kw$k,cljs.core.cst$kw$map,cljs.core.cst$kw$key_DASH__GT_name,hoplon.app_pages._index_DOT_html.map_key__GT_name,cljs.core.cst$kw$name_DASH__GT_key,hoplon.app_pages._index_DOT_html.map_name__GT_key], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$display_DASH_controls,cljs.core.cst$kw$map], null));
var G__21534 = select_row(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$label,"Display",cljs.core.cst$kw$k,cljs.core.cst$kw$display,cljs.core.cst$kw$key_DASH__GT_name,hoplon.app_pages._index_DOT_html.display_key__GT_name,cljs.core.cst$kw$name_DASH__GT_key,hoplon.app_pages._index_DOT_html.display_name__GT_key], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$display_DASH_controls,cljs.core.cst$kw$display], null));
var G__21535 = select_row(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$label,"Overlay",cljs.core.cst$kw$k,cljs.core.cst$kw$overlay,cljs.core.cst$kw$key_DASH__GT_name,hoplon.app_pages._index_DOT_html.overlay_key__GT_name,cljs.core.cst$kw$name_DASH__GT_key,hoplon.app_pages._index_DOT_html.overlay_name__GT_key], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$display_DASH_controls,cljs.core.cst$kw$overlay], null));
var G__21536 = (function (){var G__21537 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("Opacity:") : hoplon.core.td.call(null,"Opacity:"));
var G__21538 = (function (){var G__21547 = (function (){var G__21551 = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$type,"range",cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,(100),cljs.core.cst$kw$value,javelin.core.formula(((function (G__21537,G__21533,G__21534,G__21535,G__21506,G__21507,G__21457,select_row){
return (function (G__21552,G__21553){
var G__21554 = (cljs.core.cst$kw$opacity.cljs$core$IFn$_invoke$arity$1(G__21553) * (100));
return (G__21552.cljs$core$IFn$_invoke$arity$1 ? G__21552.cljs$core$IFn$_invoke$arity$1(G__21554) : G__21552.call(null,G__21554));
});})(G__21537,G__21533,G__21534,G__21535,G__21506,G__21507,G__21457,select_row))
).call(null,cljs.core.long$,hoplon.app_pages._index_DOT_html.display_params),cljs.core.cst$kw$change,((function (G__21537,G__21533,G__21534,G__21535,G__21506,G__21507,G__21457,select_row){
return (function (p1__20929_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.display_params,cljs.core.assoc,cljs.core.cst$kw$opacity,((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__20929_SHARP_) : cljs.core.deref.call(null,p1__20929_SHARP_)) / 100.0));
});})(G__21537,G__21533,G__21534,G__21535,G__21506,G__21507,G__21457,select_row))
], null);
return (hoplon.core.input.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.input.cljs$core$IFn$_invoke$arity$1(G__21551) : hoplon.core.input.call(null,G__21551));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21547) : hoplon.core.td.call(null,G__21547));
})();
var G__21539 = (function (){var G__21555 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$display_DASH_controls,cljs.core.cst$kw$opacity], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21555) : hoplon.core.td.call(null,G__21555));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__21537,G__21538,G__21539) : hoplon.core.tr.call(null,G__21537,G__21538,G__21539));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$4(G__21533,G__21534,G__21535,G__21536) : hoplon.core.tbody.call(null,G__21533,G__21534,G__21535,G__21536));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$1(G__21532) : hoplon.core.table.call(null,G__21532));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__21506,G__21507,G__21508) : hoplon.core.div.call(null,G__21506,G__21507,G__21508));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2(G__21457,G__21458) : hoplon.core.fieldset.call(null,G__21457,G__21458));
});
hoplon.app_pages._index_DOT_html.weather_parameters = (function hoplon$app_pages$_index_DOT_html$weather_parameters(){
var G__21716 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Weather parameters") : hoplon.core.legend.call(null,"Weather parameters"));
var G__21717 = (function (){var G__21795 = cljs.core.cst$kw$id;
var G__21796 = "general-params";
var G__21797 = (function (){var G__21836 = (function (){var iter__7873__auto__ = ((function (G__21795,G__21796,G__21716){
return (function hoplon$app_pages$_index_DOT_html$weather_parameters_$_iter__21837(s__21838){
return (new cljs.core.LazySeq(null,((function (G__21795,G__21796,G__21716){
return (function (){
var s__21838__$1 = s__21838;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__21838__$1);
if(temp__6363__auto__){
var s__21838__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__21838__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__21838__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__21840 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__21839 = (0);
while(true){
if((i__21839 < size__7872__auto__)){
var vec__21859 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__21839);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21859,(0),null);
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21859,(1),null);
var updater = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21859,(2),null);
cljs.core.chunk_append(b__21840,(function (){var G__21862 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(label) : hoplon.core.td.call(null,label));
var G__21863 = (function (){var G__21865 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.weather_params,selector,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$change_DASH_fn,updater], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21865) : hoplon.core.td.call(null,G__21865));
})();
var G__21864 = (function (){var G__21866 = hoplon.app_pages._index_DOT_html.help_for(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params], null),selector));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21866) : hoplon.core.td.call(null,G__21866));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__21862,G__21863,G__21864) : hoplon.core.tr.call(null,G__21862,G__21863,G__21864));
})());

var G__21875 = (i__21839 + (1));
i__21839 = G__21875;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__21840),hoplon$app_pages$_index_DOT_html$weather_parameters_$_iter__21837(cljs.core.chunk_rest(s__21838__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__21840),null);
}
} else {
var vec__21867 = cljs.core.first(s__21838__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21867,(0),null);
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21867,(1),null);
var updater = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21867,(2),null);
return cljs.core.cons((function (){var G__21870 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(label) : hoplon.core.td.call(null,label));
var G__21871 = (function (){var G__21873 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$3(hoplon.app_pages._index_DOT_html.weather_params,selector,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$change_DASH_fn,updater], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21873) : hoplon.core.td.call(null,G__21873));
})();
var G__21872 = (function (){var G__21874 = hoplon.app_pages._index_DOT_html.help_for(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params], null),selector));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__21874) : hoplon.core.td.call(null,G__21874));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__21870,G__21871,G__21872) : hoplon.core.tr.call(null,G__21870,G__21871,G__21872));
})(),hoplon$app_pages$_index_DOT_html$weather_parameters_$_iter__21837(cljs.core.rest(s__21838__$2)));
}
} else {
return null;
}
break;
}
});})(G__21795,G__21796,G__21716))
,null,null));
});})(G__21795,G__21796,G__21716))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Seed",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$seed], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Crossfade",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$crossfade], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Zoom",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$feature_DASH_size], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Max pressure",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pressure,cljs.core.cst$kw$max], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Min pressure",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pressure,cljs.core.cst$kw$min], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Prevailing wind",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prevailing_DASH_wind,cljs.core.cst$kw$heading], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Wind uniformity",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_uniformity], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Temp uniformity",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$temp_DASH_uniformity], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Warp strength",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$turbulence,cljs.core.cst$kw$power], null)], null)], null));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1(G__21836) : hoplon.core.tbody.call(null,G__21836));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$3(G__21795,G__21796,G__21797) : hoplon.core.table.call(null,G__21795,G__21796,G__21797));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2(G__21716,G__21717) : hoplon.core.fieldset.call(null,G__21716,G__21717));
});
var indexed_wind_stability_areas_22119 = javelin.core.formula((function (G__21878,G__21876,G__21877){
var G__21879 = G__21877;
var G__21880 = cljs.core.cst$kw$wind_DASH_stability_DASH_areas.cljs$core$IFn$_invoke$arity$1(G__21878);
return (G__21876.cljs$core$IFn$_invoke$arity$2 ? G__21876.cljs$core$IFn$_invoke$arity$2(G__21879,G__21880) : G__21876.call(null,G__21879,G__21880));
})).call(null,hoplon.app_pages._index_DOT_html.weather_params,cljs.core.map_indexed,cljs.core.vector);
hoplon.app_pages._index_DOT_html.wind_stability_parameters = ((function (indexed_wind_stability_areas_22119){
return (function hoplon$app_pages$_index_DOT_html$wind_stability_parameters(){
var G__22002 = (function (){var G__22005 = "Wind stability regions";
var G__22006 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas], null));
return (hoplon.core.legend.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$2(G__22005,G__22006) : hoplon.core.legend.call(null,G__22005,G__22006));
})();
var G__22003 = hoplon.core.loop_tpl_STAR_(indexed_wind_stability_areas_22119,((function (G__22002,indexed_wind_stability_areas_22119){
return (function (item__13948__auto__){
var vec__22007 = javelin.core.cell_map(cljs.core.identity,javelin.core.formula(((function (G__22002,indexed_wind_stability_areas_22119){
return (function (p__22010){
var vec__22011 = p__22010;
var index = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22011,(0),null);
var area = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22011,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [index,area], null);
});})(G__22002,indexed_wind_stability_areas_22119))
).call(null,item__13948__auto__));
var index = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22007,(0),null);
var area = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22007,(1),null);
var G__22061 = cljs.core.cst$kw$class;
var G__22062 = "wind-stability-params";
var G__22063 = (function (){var G__22089 = (function (){var G__22095 = (function (){var G__22098 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("NW corner") : hoplon.core.td.call(null,"NW corner"));
var G__22099 = (function (){var G__22101 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$bounds,cljs.core.cst$kw$x], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22101) : hoplon.core.td.call(null,G__22101));
})();
var G__22100 = (function (){var G__22102 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$bounds,cljs.core.cst$kw$y], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22102) : hoplon.core.td.call(null,G__22102));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__22098,G__22099,G__22100) : hoplon.core.tr.call(null,G__22098,G__22099,G__22100));
})();
var G__22096 = (function (){var G__22103 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("Width/height") : hoplon.core.td.call(null,"Width/height"));
var G__22104 = (function (){var G__22106 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$bounds,cljs.core.cst$kw$width], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22106) : hoplon.core.td.call(null,G__22106));
})();
var G__22105 = (function (){var G__22107 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$bounds,cljs.core.cst$kw$height], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22107) : hoplon.core.td.call(null,G__22107));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__22103,G__22104,G__22105) : hoplon.core.tr.call(null,G__22103,G__22104,G__22105));
})();
var G__22097 = (function (){var G__22108 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("Wind spd/hdg") : hoplon.core.td.call(null,"Wind spd/hdg"));
var G__22109 = (function (){var G__22111 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$wind,cljs.core.cst$kw$speed], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22111) : hoplon.core.td.call(null,G__22111));
})();
var G__22110 = (function (){var G__22112 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind_DASH_stability_DASH_areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)),cljs.core.cst$kw$wind,cljs.core.cst$kw$heading], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__22112) : hoplon.core.td.call(null,G__22112));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__22108,G__22109,G__22110) : hoplon.core.tr.call(null,G__22108,G__22109,G__22110));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$3(G__22095,G__22096,G__22097) : hoplon.core.tbody.call(null,G__22095,G__22096,G__22097));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$1(G__22089) : hoplon.core.table.call(null,G__22089));
})();
var G__22064 = (function (){var G__22113 = cljs.core.cst$kw$click;
var G__22114 = ((function (G__22113,G__22061,G__22062,G__22063,vec__22007,index,area,G__22002,indexed_wind_stability_areas_22119){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.weather_params,cljs.core.update,cljs.core.cst$kw$wind_DASH_stability_DASH_areas,((function (G__22113,G__22061,G__22062,G__22063,vec__22007,index,area,G__22002,indexed_wind_stability_areas_22119){
return (function (areas){
return hoplon.app_pages._index_DOT_html.remove_nth(areas,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(index) : cljs.core.deref.call(null,index)));
});})(G__22113,G__22061,G__22062,G__22063,vec__22007,index,area,G__22002,indexed_wind_stability_areas_22119))
);
});})(G__22113,G__22061,G__22062,G__22063,vec__22007,index,area,G__22002,indexed_wind_stability_areas_22119))
;
var G__22115 = "Remove";
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(G__22113,G__22114,G__22115) : hoplon.core.button.call(null,G__22113,G__22114,G__22115));
})();
var G__22065 = (hoplon.core.hr.cljs$core$IFn$_invoke$arity$0 ? hoplon.core.hr.cljs$core$IFn$_invoke$arity$0() : hoplon.core.hr.call(null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$5(G__22061,G__22062,G__22063,G__22064,G__22065) : hoplon.core.div.call(null,G__22061,G__22062,G__22063,G__22064,G__22065));
});})(G__22002,indexed_wind_stability_areas_22119))
);
var G__22004 = (function (){var G__22116 = cljs.core.cst$kw$click;
var G__22117 = ((function (G__22116,G__22002,G__22003,indexed_wind_stability_areas_22119){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hoplon.app_pages._index_DOT_html.weather_params,cljs.core.update,cljs.core.cst$kw$wind_DASH_stability_DASH_areas,((function (G__22116,G__22002,G__22003,indexed_wind_stability_areas_22119){
return (function (areas){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(areas,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$bounds,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$width,(10),cljs.core.cst$kw$height,(10)], null),cljs.core.cst$kw$wind,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$heading,(45),cljs.core.cst$kw$speed,(5)], null),cljs.core.cst$kw$index,cljs.core.count(areas)], null));
});})(G__22116,G__22002,G__22003,indexed_wind_stability_areas_22119))
);
});})(G__22116,G__22002,G__22003,indexed_wind_stability_areas_22119))
;
var G__22118 = "Add New";
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(G__22116,G__22117,G__22118) : hoplon.core.button.call(null,G__22116,G__22117,G__22118));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$3(G__22002,G__22003,G__22004) : hoplon.core.fieldset.call(null,G__22002,G__22003,G__22004));
});})(indexed_wind_stability_areas_22119))
;
hoplon.app_pages._index_DOT_html.weather_type_configuration = (function hoplon$app_pages$_index_DOT_html$weather_type_configuration(){
var G__22874 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Weather type configuration") : hoplon.core.legend.call(null,"Weather type configuration"));
var G__22875 = (function (){var G__22903 = cljs.core.cst$kw$id;
var G__22904 = "category-params";
var G__22905 = (function (){var G__22919 = (function (){var G__22921 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("") : hoplon.core.td.call(null,""));
var G__22922 = (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1("") : hoplon.core.td.call(null,""));
var G__22923 = (function (){var G__22925 = cljs.core.cst$kw$colspan;
var G__22926 = (3);
var G__22927 = "Wind";
var G__22928 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_type_DASH_config,cljs.core.cst$kw$wind], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$4(G__22925,G__22926,G__22927,G__22928) : hoplon.core.td.call(null,G__22925,G__22926,G__22927,G__22928));
})();
var G__22924 = (function (){var G__22929 = cljs.core.cst$kw$colspan;
var G__22930 = (3);
var G__22931 = "Temperature";
var G__22932 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_type_DASH_config,cljs.core.cst$kw$temp], null));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$4(G__22929,G__22930,G__22931,G__22932) : hoplon.core.td.call(null,G__22929,G__22930,G__22931,G__22932));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$4(G__22921,G__22922,G__22923,G__22924) : hoplon.core.tr.call(null,G__22921,G__22922,G__22923,G__22924));
})();
var G__22920 = (function (){var G__22933 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__22919,G__22903,G__22904,G__22874){
return (function (p1__22120_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,p1__22120_SHARP_);
});})(G__22919,G__22903,G__22904,G__22874))
,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, ["",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class,"weight","Weight",hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_type_DASH_config,cljs.core.cst$kw$weight], null))], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Min"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Mean"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Max"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Min"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Mean"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Max"], null)], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__22933) : hoplon.core.tr.call(null,G__22933));
})();
return (hoplon.core.thead.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.thead.cljs$core$IFn$_invoke$arity$2(G__22919,G__22920) : hoplon.core.thead.call(null,G__22919,G__22920));
})();
var G__22906 = (function (){var G__23280 = (function (){var iter__7873__auto__ = ((function (G__22903,G__22904,G__22905,G__22874){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23281(s__23282){
return (new cljs.core.LazySeq(null,((function (G__22903,G__22904,G__22905,G__22874){
return (function (){
var s__23282__$1 = s__23282;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__23282__$1);
if(temp__6363__auto__){
var s__23282__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23282__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__23282__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__23284 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__23283 = (0);
while(true){
if((i__23283 < size__7872__auto__)){
var category = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__23283);
cljs.core.chunk_append(b__23284,(function (){var G__23465 = (function (){var G__23468 = cljs.core.cst$kw$class;
var G__23469 = [cljs.core.str("weather-type "),cljs.core.str(cljs.core.name(category))].join('');
var G__23470 = cljs.core.cst$kw$css;
var G__23471 = new cljs.core.PersistentArrayMap(null, 1, ["background-color",(function (){var vec__23473 = (hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1(category) : hoplon.app_pages._index_DOT_html.weather_color.call(null,category));
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23473,(0),null);
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23473,(1),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23473,(2),null);
return [cljs.core.str("rgb("),cljs.core.str(r),cljs.core.str(","),cljs.core.str(g),cljs.core.str(","),cljs.core.str(b),cljs.core.str(")")].join('');
})()], null);
var G__23472 = (hoplon.app_pages._index_DOT_html.type_key__GT_name.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.type_key__GT_name.cljs$core$IFn$_invoke$arity$1(category) : hoplon.app_pages._index_DOT_html.type_key__GT_name.call(null,category));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$5(G__23468,G__23469,G__23470,G__23471,G__23472) : hoplon.core.td.call(null,G__23468,G__23469,G__23470,G__23471,G__23472));
})();
var G__23466 = (function (){var G__23479 = (function (){var G__23480 = cljs.core.cst$kw$class;
var G__23481 = "edit-field";
var G__23482 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,cljs.core.cst$kw$weight], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23480,G__23481,G__23482) : hoplon.core.div.call(null,G__23480,G__23481,G__23482));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__23479) : hoplon.core.td.call(null,G__23479));
})();
var G__23467 = (function (){var iter__7873__auto__ = ((function (i__23283,G__23465,G__23466,category,c__7871__auto__,size__7872__auto__,b__23284,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23281_$_iter__23483(s__23484){
return (new cljs.core.LazySeq(null,((function (i__23283,G__23465,G__23466,category,c__7871__auto__,size__7872__auto__,b__23284,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874){
return (function (){
var s__23484__$1 = s__23484;
while(true){
var temp__6363__auto____$1 = cljs.core.seq(s__23484__$1);
if(temp__6363__auto____$1){
var xs__6915__auto__ = temp__6363__auto____$1;
var param = cljs.core.first(xs__6915__auto__);
var iterys__7869__auto__ = ((function (s__23484__$1,i__23283,param,xs__6915__auto__,temp__6363__auto____$1,G__23465,G__23466,category,c__7871__auto__,size__7872__auto__,b__23284,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23281_$_iter__23483_$_iter__23485(s__23486){
return (new cljs.core.LazySeq(null,((function (s__23484__$1,i__23283,param,xs__6915__auto__,temp__6363__auto____$1,G__23465,G__23466,category,c__7871__auto__,size__7872__auto__,b__23284,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874){
return (function (){
var s__23486__$1 = s__23486;
while(true){
var temp__6363__auto____$2 = cljs.core.seq(s__23486__$1);
if(temp__6363__auto____$2){
var s__23486__$2 = temp__6363__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__23486__$2)){
var c__7871__auto____$1 = cljs.core.chunk_first(s__23486__$2);
var size__7872__auto____$1 = cljs.core.count(c__7871__auto____$1);
var b__23488 = cljs.core.chunk_buffer(size__7872__auto____$1);
if((function (){var i__23487 = (0);
while(true){
if((i__23487 < size__7872__auto____$1)){
var metric = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto____$1,i__23487);
cljs.core.chunk_append(b__23488,(function (){var G__23530 = cljs.core.cst$kw$class;
var G__23531 = [cljs.core.str(cljs.core.name(param)),cljs.core.str(" "),cljs.core.str(cljs.core.name(metric))].join('');
var G__23532 = (function (){var G__23533 = cljs.core.cst$kw$class;
var G__23534 = "edit-field";
var G__23535 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,param,metric], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23533,G__23534,G__23535) : hoplon.core.div.call(null,G__23533,G__23534,G__23535));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(G__23530,G__23531,G__23532) : hoplon.core.td.call(null,G__23530,G__23531,G__23532));
})());

var G__23627 = (i__23487 + (1));
i__23487 = G__23627;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23488),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23281_$_iter__23483_$_iter__23485(cljs.core.chunk_rest(s__23486__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23488),null);
}
} else {
var metric = cljs.core.first(s__23486__$2);
return cljs.core.cons((function (){var G__23536 = cljs.core.cst$kw$class;
var G__23537 = [cljs.core.str(cljs.core.name(param)),cljs.core.str(" "),cljs.core.str(cljs.core.name(metric))].join('');
var G__23538 = (function (){var G__23539 = cljs.core.cst$kw$class;
var G__23540 = "edit-field";
var G__23541 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,param,metric], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23539,G__23540,G__23541) : hoplon.core.div.call(null,G__23539,G__23540,G__23541));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(G__23536,G__23537,G__23538) : hoplon.core.td.call(null,G__23536,G__23537,G__23538));
})(),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23281_$_iter__23483_$_iter__23485(cljs.core.rest(s__23486__$2)));
}
} else {
return null;
}
break;
}
});})(s__23484__$1,i__23283,param,xs__6915__auto__,temp__6363__auto____$1,G__23465,G__23466,category,c__7871__auto__,size__7872__auto__,b__23284,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874))
,null,null));
});})(s__23484__$1,i__23283,param,xs__6915__auto__,temp__6363__auto____$1,G__23465,G__23466,category,c__7871__auto__,size__7872__auto__,b__23284,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874))
;
var fs__7870__auto__ = cljs.core.seq(iterys__7869__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$min,cljs.core.cst$kw$mean,cljs.core.cst$kw$max], null)));
if(fs__7870__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__7870__auto__,hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23281_$_iter__23483(cljs.core.rest(s__23484__$1)));
} else {
var G__23628 = cljs.core.rest(s__23484__$1);
s__23484__$1 = G__23628;
continue;
}
} else {
return null;
}
break;
}
});})(i__23283,G__23465,G__23466,category,c__7871__auto__,size__7872__auto__,b__23284,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874))
,null,null));
});})(i__23283,G__23465,G__23466,category,c__7871__auto__,size__7872__auto__,b__23284,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind,cljs.core.cst$kw$temp], null));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__23465,G__23466,G__23467) : hoplon.core.tr.call(null,G__23465,G__23466,G__23467));
})());

var G__23629 = (i__23283 + (1));
i__23283 = G__23629;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23284),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23281(cljs.core.chunk_rest(s__23282__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23284),null);
}
} else {
var category = cljs.core.first(s__23282__$2);
return cljs.core.cons((function (){var G__23550 = (function (){var G__23553 = cljs.core.cst$kw$class;
var G__23554 = [cljs.core.str("weather-type "),cljs.core.str(cljs.core.name(category))].join('');
var G__23555 = cljs.core.cst$kw$css;
var G__23556 = new cljs.core.PersistentArrayMap(null, 1, ["background-color",(function (){var vec__23558 = (hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.weather_color.cljs$core$IFn$_invoke$arity$1(category) : hoplon.app_pages._index_DOT_html.weather_color.call(null,category));
var r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23558,(0),null);
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23558,(1),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23558,(2),null);
return [cljs.core.str("rgb("),cljs.core.str(r),cljs.core.str(","),cljs.core.str(g),cljs.core.str(","),cljs.core.str(b),cljs.core.str(")")].join('');
})()], null);
var G__23557 = (hoplon.app_pages._index_DOT_html.type_key__GT_name.cljs$core$IFn$_invoke$arity$1 ? hoplon.app_pages._index_DOT_html.type_key__GT_name.cljs$core$IFn$_invoke$arity$1(category) : hoplon.app_pages._index_DOT_html.type_key__GT_name.call(null,category));
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$5(G__23553,G__23554,G__23555,G__23556,G__23557) : hoplon.core.td.call(null,G__23553,G__23554,G__23555,G__23556,G__23557));
})();
var G__23551 = (function (){var G__23564 = (function (){var G__23565 = cljs.core.cst$kw$class;
var G__23566 = "edit-field";
var G__23567 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,cljs.core.cst$kw$weight], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23565,G__23566,G__23567) : hoplon.core.div.call(null,G__23565,G__23566,G__23567));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$1(G__23564) : hoplon.core.td.call(null,G__23564));
})();
var G__23552 = (function (){var iter__7873__auto__ = ((function (G__23550,G__23551,category,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23281_$_iter__23568(s__23569){
return (new cljs.core.LazySeq(null,((function (G__23550,G__23551,category,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874){
return (function (){
var s__23569__$1 = s__23569;
while(true){
var temp__6363__auto____$1 = cljs.core.seq(s__23569__$1);
if(temp__6363__auto____$1){
var xs__6915__auto__ = temp__6363__auto____$1;
var param = cljs.core.first(xs__6915__auto__);
var iterys__7869__auto__ = ((function (s__23569__$1,param,xs__6915__auto__,temp__6363__auto____$1,G__23550,G__23551,category,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874){
return (function hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23281_$_iter__23568_$_iter__23570(s__23571){
return (new cljs.core.LazySeq(null,((function (s__23569__$1,param,xs__6915__auto__,temp__6363__auto____$1,G__23550,G__23551,category,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874){
return (function (){
var s__23571__$1 = s__23571;
while(true){
var temp__6363__auto____$2 = cljs.core.seq(s__23571__$1);
if(temp__6363__auto____$2){
var s__23571__$2 = temp__6363__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__23571__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__23571__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__23573 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__23572 = (0);
while(true){
if((i__23572 < size__7872__auto__)){
var metric = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__23572);
cljs.core.chunk_append(b__23573,(function (){var G__23615 = cljs.core.cst$kw$class;
var G__23616 = [cljs.core.str(cljs.core.name(param)),cljs.core.str(" "),cljs.core.str(cljs.core.name(metric))].join('');
var G__23617 = (function (){var G__23618 = cljs.core.cst$kw$class;
var G__23619 = "edit-field";
var G__23620 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,param,metric], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23618,G__23619,G__23620) : hoplon.core.div.call(null,G__23618,G__23619,G__23620));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(G__23615,G__23616,G__23617) : hoplon.core.td.call(null,G__23615,G__23616,G__23617));
})());

var G__23630 = (i__23572 + (1));
i__23572 = G__23630;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23573),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23281_$_iter__23568_$_iter__23570(cljs.core.chunk_rest(s__23571__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23573),null);
}
} else {
var metric = cljs.core.first(s__23571__$2);
return cljs.core.cons((function (){var G__23621 = cljs.core.cst$kw$class;
var G__23622 = [cljs.core.str(cljs.core.name(param)),cljs.core.str(" "),cljs.core.str(cljs.core.name(metric))].join('');
var G__23623 = (function (){var G__23624 = cljs.core.cst$kw$class;
var G__23625 = "edit-field";
var G__23626 = hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$categories,category,param,metric], null));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__23624,G__23625,G__23626) : hoplon.core.div.call(null,G__23624,G__23625,G__23626));
})();
return (hoplon.core.td.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.td.cljs$core$IFn$_invoke$arity$3(G__23621,G__23622,G__23623) : hoplon.core.td.call(null,G__23621,G__23622,G__23623));
})(),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23281_$_iter__23568_$_iter__23570(cljs.core.rest(s__23571__$2)));
}
} else {
return null;
}
break;
}
});})(s__23569__$1,param,xs__6915__auto__,temp__6363__auto____$1,G__23550,G__23551,category,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874))
,null,null));
});})(s__23569__$1,param,xs__6915__auto__,temp__6363__auto____$1,G__23550,G__23551,category,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874))
;
var fs__7870__auto__ = cljs.core.seq(iterys__7869__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$min,cljs.core.cst$kw$mean,cljs.core.cst$kw$max], null)));
if(fs__7870__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__7870__auto__,hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23281_$_iter__23568(cljs.core.rest(s__23569__$1)));
} else {
var G__23631 = cljs.core.rest(s__23569__$1);
s__23569__$1 = G__23631;
continue;
}
} else {
return null;
}
break;
}
});})(G__23550,G__23551,category,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874))
,null,null));
});})(G__23550,G__23551,category,s__23282__$2,temp__6363__auto__,G__22903,G__22904,G__22905,G__22874))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind,cljs.core.cst$kw$temp], null));
})();
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$3(G__23550,G__23551,G__23552) : hoplon.core.tr.call(null,G__23550,G__23551,G__23552));
})(),hoplon$app_pages$_index_DOT_html$weather_type_configuration_$_iter__23281(cljs.core.rest(s__23282__$2)));
}
} else {
return null;
}
break;
}
});})(G__22903,G__22904,G__22905,G__22874))
,null,null));
});})(G__22903,G__22904,G__22905,G__22874))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sunny,cljs.core.cst$kw$fair,cljs.core.cst$kw$poor,cljs.core.cst$kw$inclement], null));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$1(G__23280) : hoplon.core.tbody.call(null,G__23280));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$4(G__22903,G__22904,G__22905,G__22906) : hoplon.core.table.call(null,G__22903,G__22904,G__22905,G__22906));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2(G__22874,G__22875) : hoplon.core.fieldset.call(null,G__22874,G__22875));
});
hoplon.app_pages._index_DOT_html.step_controls = (function hoplon$app_pages$_index_DOT_html$step_controls(){
var G__23717 = cljs.core.cst$kw$id;
var G__23718 = "time-location-params";
var G__23719 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Time/location controls") : hoplon.core.legend.call(null,"Time/location controls"));
var G__23720 = (function (){var G__23757 = (function (){var G__23759 = (function (){var G__23765 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["X Offset",hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$origin,(0)], null)),hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params,cljs.core.cst$kw$origin,cljs.core.cst$kw$x], null))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23765) : hoplon.core.tr.call(null,G__23765));
})();
var G__23760 = (function (){var G__23766 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Y Offset",hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$origin,(1)], null)),hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params,cljs.core.cst$kw$origin,cljs.core.cst$kw$y], null))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23766) : hoplon.core.tr.call(null,G__23766));
})();
var G__23761 = (function (){var G__23767 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["T Offset",hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time,cljs.core.cst$kw$offset], null)),hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$weather_DASH_params,cljs.core.cst$kw$time,cljs.core.cst$kw$offset], null))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23767) : hoplon.core.tr.call(null,G__23767));
})();
var G__23762 = (function (){var iter__7873__auto__ = ((function (G__23759,G__23760,G__23761,G__23717,G__23718,G__23719){
return (function hoplon$app_pages$_index_DOT_html$step_controls_$_iter__23768(s__23769){
return (new cljs.core.LazySeq(null,((function (G__23759,G__23760,G__23761,G__23717,G__23718,G__23719){
return (function (){
var s__23769__$1 = s__23769;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__23769__$1);
if(temp__6363__auto__){
var s__23769__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23769__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__23769__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__23771 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__23770 = (0);
while(true){
if((i__23770 < size__7872__auto__)){
var vec__23782 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__23770);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23782,(0),null);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23782,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23782,(2),null);
var help = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23782,(3),null);
cljs.core.chunk_append(b__23771,(function (){var G__23785 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [label,hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(c,path),hoplon.app_pages._index_DOT_html.help_for(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [help], null),path))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23785) : hoplon.core.tr.call(null,G__23785));
})());

var G__23802 = (i__23770 + (1));
i__23770 = G__23802;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23771),hoplon$app_pages$_index_DOT_html$step_controls_$_iter__23768(cljs.core.chunk_rest(s__23769__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23771),null);
}
} else {
var vec__23786 = cljs.core.first(s__23769__$2);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23786,(0),null);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23786,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23786,(2),null);
var help = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23786,(3),null);
return cljs.core.cons((function (){var G__23789 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [label,hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(c,path),hoplon.app_pages._index_DOT_html.help_for(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [help], null),path))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23789) : hoplon.core.tr.call(null,G__23789));
})(),hoplon$app_pages$_index_DOT_html$step_controls_$_iter__23768(cljs.core.rest(s__23769__$2)));
}
} else {
return null;
}
break;
}
});})(G__23759,G__23760,G__23761,G__23717,G__23718,G__23719))
,null,null));
});})(G__23759,G__23760,G__23761,G__23717,G__23718,G__23719))
;
return iter__7873__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [hoplon.app_pages._index_DOT_html.movement_params,"Weather heading",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$direction,cljs.core.cst$kw$heading], null),cljs.core.cst$kw$movement_DASH_params], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [hoplon.app_pages._index_DOT_html.movement_params,"Weather speed",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$direction,cljs.core.cst$kw$speed], null),cljs.core.cst$kw$movement_DASH_params], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [hoplon.app_pages._index_DOT_html.weather_params,"Evolution (min)",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$evolution], null),cljs.core.cst$kw$weather_DASH_params], null)], null));
})();
var G__23763 = (function (){var G__23790 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Time",hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$displayed_DASH_time], null))], null),hoplon.app_pages._index_DOT_html.time_entry(hoplon.app_pages._index_DOT_html.time_params,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$displayed], null)),(hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.jump_to_time,"Jump to") : hoplon.core.button.call(null,cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.jump_to_time,"Jump to")),(hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.set_time,"Set to") : hoplon.core.button.call(null,cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.set_time,"Set to"))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23790) : hoplon.core.tr.call(null,G__23790));
})();
var G__23764 = (function (){var G__23791 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(hoplon.core.td,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Step interval",hoplon.app_pages._index_DOT_html.edit_field.cljs$core$IFn$_invoke$arity$2(hoplon.app_pages._index_DOT_html.movement_params,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$step], null)),hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$step], null))], null));
return (hoplon.core.tr.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.tr.cljs$core$IFn$_invoke$arity$1(G__23791) : hoplon.core.tr.call(null,G__23791));
})();
return (hoplon.core.tbody.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.tbody.cljs$core$IFn$_invoke$arity$6(G__23759,G__23760,G__23761,G__23762,G__23763,G__23764) : hoplon.core.tbody.call(null,G__23759,G__23760,G__23761,G__23762,G__23763,G__23764));
})();
return (hoplon.core.table.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.table.cljs$core$IFn$_invoke$arity$1(G__23757) : hoplon.core.table.call(null,G__23757));
})();
var G__23721 = (function (){var G__23792 = cljs.core.cst$kw$title;
var G__23793 = "Step back in time";
var G__23794 = cljs.core.cst$kw$click;
var G__23795 = ((function (G__23792,G__23793,G__23794,G__23717,G__23718,G__23719,G__23720){
return (function (){
return hoplon.app_pages._index_DOT_html.move((-1));
});})(G__23792,G__23793,G__23794,G__23717,G__23718,G__23719,G__23720))
;
var G__23796 = "<< Step Back";
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$5(G__23792,G__23793,G__23794,G__23795,G__23796) : hoplon.core.button.call(null,G__23792,G__23793,G__23794,G__23795,G__23796));
})();
var G__23722 = (function (){var G__23797 = cljs.core.cst$kw$title;
var G__23798 = "Step forward in time";
var G__23799 = cljs.core.cst$kw$click;
var G__23800 = ((function (G__23797,G__23798,G__23799,G__23717,G__23718,G__23719,G__23720,G__23721){
return (function (){
return hoplon.app_pages._index_DOT_html.move((1));
});})(G__23797,G__23798,G__23799,G__23717,G__23718,G__23719,G__23720,G__23721))
;
var G__23801 = "Step Forward >>";
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$5(G__23797,G__23798,G__23799,G__23800,G__23801) : hoplon.core.button.call(null,G__23797,G__23798,G__23799,G__23800,G__23801));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$6(G__23717,G__23718,G__23719,G__23720,G__23721,G__23722) : hoplon.core.fieldset.call(null,G__23717,G__23718,G__23719,G__23720,G__23721,G__23722));
});
hoplon.app_pages._index_DOT_html.weather_controls = (function hoplon$app_pages$_index_DOT_html$weather_controls(){
return hoplon.app_pages._index_DOT_html.two_column((function (){var G__23807 = hoplon.app_pages._index_DOT_html.weather_parameters();
var G__23808 = hoplon.app_pages._index_DOT_html.wind_stability_parameters();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$2(G__23807,G__23808) : hoplon.core.div.call(null,G__23807,G__23808));
})(),(function (){var G__23809 = hoplon.app_pages._index_DOT_html.weather_type_configuration();
var G__23810 = hoplon.app_pages._index_DOT_html.step_controls();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$2(G__23809,G__23810) : hoplon.core.div.call(null,G__23809,G__23810));
})());
});
hoplon.app_pages._index_DOT_html.serialization_controls = (function hoplon$app_pages$_index_DOT_html$serialization_controls(){
var G__23827 = cljs.core.cst$kw$id;
var G__23828 = "load-save-controls";
var G__23829 = (hoplon.core.legend.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$1("Load/save") : hoplon.core.legend.call(null,"Load/save"));
var G__23830 = (function (){var G__23836 = (function (){var G__23838 = cljs.core.cst$kw$click;
var G__23839 = ((function (G__23838,G__23827,G__23828,G__23829){
return (function (){
hoplon.app_pages._index_DOT_html.save_fmap((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.weather_params) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.weather_params)),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.weather_data) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.weather_data)));

return hoplon.app_pages._index_DOT_html.move((1));
});})(G__23838,G__23827,G__23828,G__23829))
;
var G__23840 = "Save Current as Single FMAP";
return (hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(G__23838,G__23839,G__23840) : hoplon.core.button.call(null,G__23838,G__23839,G__23840));
})();
var G__23837 = "(Steps forward in time)";
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$2(G__23836,G__23837) : hoplon.core.div.call(null,G__23836,G__23837));
})();
var G__23831 = (function (){var G__23841 = (hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.save_settings,"Save Settings") : hoplon.core.button.call(null,cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.save_settings,"Save Settings"));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$1(G__23841) : hoplon.core.div.call(null,G__23841));
})();
var G__23832 = (function (){var G__23842 = (hoplon.core.button.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.button.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.load_settings,"Load Settings") : hoplon.core.button.call(null,cljs.core.cst$kw$click,hoplon.app_pages._index_DOT_html.load_settings,"Load Settings"));
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$1(G__23842) : hoplon.core.div.call(null,G__23842));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$6(G__23827,G__23828,G__23829,G__23830,G__23831,G__23832) : hoplon.core.fieldset.call(null,G__23827,G__23828,G__23829,G__23830,G__23831,G__23832));
});
hoplon.app_pages._index_DOT_html.forecast_display = (function hoplon$app_pages$_index_DOT_html$forecast_display(){
var G__24466 = (function (){var G__24468 = "Forecast";
var G__24469 = hoplon.app_pages._index_DOT_html.help_for(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$forecast], null));
return (hoplon.core.legend.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.legend.cljs$core$IFn$_invoke$arity$2(G__24468,G__24469) : hoplon.core.legend.call(null,G__24468,G__24469));
})();
var G__24467 = (function (){var G__24776 = cljs.core.cst$kw$id;
var G__24777 = "forecast";
var G__24778 = javelin.core.formula(((function (G__24776,G__24777,G__24466){
return (function (G__24796,G__24799,G__24795,G__24792,G__24798,G__24797,G__24800,G__24793,G__24794,G__24801){
if(cljs.core.not(G__24792)){
return "No location is selected. Click a location on the weather grid to get a forecast for it.";
} else {
var vec__24779 = G__24793;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24779,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24779,(1),null);
var G__24802 = [cljs.core.str("Forecast for location "),cljs.core.str(x),cljs.core.str(","),cljs.core.str(y)].join('');
var G__24803 = (function (){var G__24817 = (function (){var G__24825 = (function (){var G__24826 = (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1("Day/Time") : G__24798.call(null,"Day/Time"));
var G__24827 = (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1("Weather Type") : G__24798.call(null,"Weather Type"));
var G__24828 = (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1("Pressure") : G__24798.call(null,"Pressure"));
var G__24829 = (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1("Temperature") : G__24798.call(null,"Temperature"));
var G__24830 = (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1("Wind Speed") : G__24798.call(null,"Wind Speed"));
var G__24831 = (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1("Wind Heading") : G__24798.call(null,"Wind Heading"));
return (G__24797.cljs$core$IFn$_invoke$arity$6 ? G__24797.cljs$core$IFn$_invoke$arity$6(G__24826,G__24827,G__24828,G__24829,G__24830,G__24831) : G__24797.call(null,G__24826,G__24827,G__24828,G__24829,G__24830,G__24831));
})();
return (G__24796.cljs$core$IFn$_invoke$arity$1 ? G__24796.cljs$core$IFn$_invoke$arity$1(G__24825) : G__24796.call(null,G__24825));
})();
var G__24818 = (function (){var G__24958 = (function (){var iter__7873__auto__ = ((function (G__24817,G__24802,vec__24779,x,y,G__24776,G__24777,G__24466){
return (function hoplon$app_pages$_index_DOT_html$forecast_display_$_iter__24782(s__24783){
return (new cljs.core.LazySeq(null,((function (G__24817,G__24802,vec__24779,x,y,G__24776,G__24777,G__24466){
return (function (){
var s__24783__$1 = s__24783;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__24783__$1);
if(temp__6363__auto__){
var s__24783__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__24783__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__24783__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__24785 = cljs.core.chunk_buffer(size__7872__auto__);
if(cljs.core.truth_((function (){var i__24784 = (0);
while(true){
if(cljs.core.truth_((i__24784 < size__7872__auto__))){
var vec__24786 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__24784);
var time = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24786,(0),null);
var weather = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24786,(1),null);
cljs.core.chunk_append(b__24785,(function (){var G__25032 = (function (){var G__25042 = (function (){var G__25043 = "%02d/%02d%02d";
var G__25044 = cljs.core.cst$kw$day.cljs$core$IFn$_invoke$arity$1(time);
var G__25045 = cljs.core.cst$kw$hour.cljs$core$IFn$_invoke$arity$1(time);
var G__25046 = cljs.core.cst$kw$minute.cljs$core$IFn$_invoke$arity$1(time);
return (G__24800.cljs$core$IFn$_invoke$arity$4 ? G__24800.cljs$core$IFn$_invoke$arity$4(G__25043,G__25044,G__25045,G__25046) : G__24800.call(null,G__25043,G__25044,G__25045,G__25046));
})();
return (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1(G__25042) : G__24798.call(null,G__25042));
})();
var G__25033 = (function (){var G__25048 = (function (){var G__25049 = cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(weather);
return (G__24801.cljs$core$IFn$_invoke$arity$1 ? G__24801.cljs$core$IFn$_invoke$arity$1(G__25049) : G__24801.call(null,G__25049));
})();
return (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1(G__25048) : G__24798.call(null,G__25048));
})();
var G__25034 = (function (){var G__25050 = cljs.core.cst$kw$pressure.cljs$core$IFn$_invoke$arity$1(weather).toFixed((2));
return (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1(G__25050) : G__24798.call(null,G__25050));
})();
var G__25035 = (function (){var G__25051 = cljs.core.cst$kw$temperature.cljs$core$IFn$_invoke$arity$1(weather).toFixed((1));
return (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1(G__25051) : G__24798.call(null,G__25051));
})();
var G__25036 = (function (){var G__25052 = cljs.core.cst$kw$speed.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather)).toFixed((0));
return (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1(G__25052) : G__24798.call(null,G__25052));
})();
var G__25037 = (function (){var G__25053 = cljs.core.cst$kw$heading.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather)).toFixed((0));
return (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1(G__25053) : G__24798.call(null,G__25053));
})();
return (G__24797.cljs$core$IFn$_invoke$arity$6 ? G__24797.cljs$core$IFn$_invoke$arity$6(G__25032,G__25033,G__25034,G__25035,G__25036,G__25037) : G__24797.call(null,G__25032,G__25033,G__25034,G__25035,G__25036,G__25037));
})());

var G__25085 = (i__24784 + (1));
i__24784 = G__25085;
continue;
} else {
return true;
}
break;
}
})())){
return cljs.core.chunk_cons(cljs.core.chunk(b__24785),hoplon$app_pages$_index_DOT_html$forecast_display_$_iter__24782(cljs.core.chunk_rest(s__24783__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__24785),null);
}
} else {
var vec__24789 = cljs.core.first(s__24783__$2);
var time = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24789,(0),null);
var weather = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24789,(1),null);
return cljs.core.cons((function (){var G__25063 = (function (){var G__25073 = (function (){var G__25074 = "%02d/%02d%02d";
var G__25075 = cljs.core.cst$kw$day.cljs$core$IFn$_invoke$arity$1(time);
var G__25076 = cljs.core.cst$kw$hour.cljs$core$IFn$_invoke$arity$1(time);
var G__25077 = cljs.core.cst$kw$minute.cljs$core$IFn$_invoke$arity$1(time);
return (G__24800.cljs$core$IFn$_invoke$arity$4 ? G__24800.cljs$core$IFn$_invoke$arity$4(G__25074,G__25075,G__25076,G__25077) : G__24800.call(null,G__25074,G__25075,G__25076,G__25077));
})();
return (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1(G__25073) : G__24798.call(null,G__25073));
})();
var G__25064 = (function (){var G__25079 = (function (){var G__25080 = cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(weather);
return (G__24801.cljs$core$IFn$_invoke$arity$1 ? G__24801.cljs$core$IFn$_invoke$arity$1(G__25080) : G__24801.call(null,G__25080));
})();
return (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1(G__25079) : G__24798.call(null,G__25079));
})();
var G__25065 = (function (){var G__25081 = cljs.core.cst$kw$pressure.cljs$core$IFn$_invoke$arity$1(weather).toFixed((2));
return (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1(G__25081) : G__24798.call(null,G__25081));
})();
var G__25066 = (function (){var G__25082 = cljs.core.cst$kw$temperature.cljs$core$IFn$_invoke$arity$1(weather).toFixed((1));
return (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1(G__25082) : G__24798.call(null,G__25082));
})();
var G__25067 = (function (){var G__25083 = cljs.core.cst$kw$speed.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather)).toFixed((0));
return (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1(G__25083) : G__24798.call(null,G__25083));
})();
var G__25068 = (function (){var G__25084 = cljs.core.cst$kw$heading.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(weather)).toFixed((0));
return (G__24798.cljs$core$IFn$_invoke$arity$1 ? G__24798.cljs$core$IFn$_invoke$arity$1(G__25084) : G__24798.call(null,G__25084));
})();
return (G__24797.cljs$core$IFn$_invoke$arity$6 ? G__24797.cljs$core$IFn$_invoke$arity$6(G__25063,G__25064,G__25065,G__25066,G__25067,G__25068) : G__24797.call(null,G__25063,G__25064,G__25065,G__25066,G__25067,G__25068));
})(),hoplon$app_pages$_index_DOT_html$forecast_display_$_iter__24782(cljs.core.rest(s__24783__$2)));
}
} else {
return null;
}
break;
}
});})(G__24817,G__24802,vec__24779,x,y,G__24776,G__24777,G__24466))
,null,null));
});})(G__24817,G__24802,vec__24779,x,y,G__24776,G__24777,G__24466))
;
return iter__7873__auto__(G__24792);
})();
return (G__24799.cljs$core$IFn$_invoke$arity$1 ? G__24799.cljs$core$IFn$_invoke$arity$1(G__24958) : G__24799.call(null,G__24958));
})();
return (G__24795.cljs$core$IFn$_invoke$arity$2 ? G__24795.cljs$core$IFn$_invoke$arity$2(G__24817,G__24818) : G__24795.call(null,G__24817,G__24818));
})();
return (G__24794.cljs$core$IFn$_invoke$arity$2 ? G__24794.cljs$core$IFn$_invoke$arity$2(G__24802,G__24803) : G__24794.call(null,G__24802,G__24803));
}
});})(G__24776,G__24777,G__24466))
).call(null,hoplon.core.thead,hoplon.core.tbody,hoplon.core.table,hoplon.app_pages._index_DOT_html.forecast,hoplon.core.td,hoplon.core.tr,goog.string.format,hoplon.app_pages._index_DOT_html.selected_cell,hoplon.core.div,hoplon.app_pages._index_DOT_html.type_key__GT_name);
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$3(G__24776,G__24777,G__24778) : hoplon.core.div.call(null,G__24776,G__24777,G__24778));
})();
return (hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2 ? hoplon.core.fieldset.cljs$core$IFn$_invoke$arity$2(G__24466,G__24467) : hoplon.core.fieldset.call(null,G__24466,G__24467));
});
hoplon.app_pages._index_DOT_html.debug_info = (function hoplon$app_pages$_index_DOT_html$debug_info(){
return null;
});
hoplon.core.html.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (){var G__25086 = (hoplon.core.title.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.title.cljs$core$IFn$_invoke$arity$1("WeatherGen") : hoplon.core.title.call(null,"WeatherGen"));
var G__25087 = (hoplon.core.link.cljs$core$IFn$_invoke$arity$8 ? hoplon.core.link.cljs$core$IFn$_invoke$arity$8(cljs.core.cst$kw$href,"style.css",cljs.core.cst$kw$rel,"stylesheet",cljs.core.cst$kw$title,"main",cljs.core.cst$kw$type,"text/css") : hoplon.core.link.call(null,cljs.core.cst$kw$href,"style.css",cljs.core.cst$kw$rel,"stylesheet",cljs.core.cst$kw$title,"main",cljs.core.cst$kw$type,"text/css"));
var G__25088 = (hoplon.core.link.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.link.cljs$core$IFn$_invoke$arity$6(cljs.core.cst$kw$href,"https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300",cljs.core.cst$kw$rel,"stylesheet",cljs.core.cst$kw$type,"text/css") : hoplon.core.link.call(null,cljs.core.cst$kw$href,"https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300",cljs.core.cst$kw$rel,"stylesheet",cljs.core.cst$kw$type,"text/css"));
return (hoplon.core.head.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.head.cljs$core$IFn$_invoke$arity$3(G__25086,G__25087,G__25088) : hoplon.core.head.call(null,G__25086,G__25087,G__25088));
})(),(function (){var G__25182 = (function (){var G__25218 = cljs.core.cst$kw$id;
var G__25219 = "app";
var G__25220 = (function (){var G__25237 = cljs.core.cst$kw$id;
var G__25238 = "titlebar";
var G__25239 = (function (){var G__25241 = cljs.core.cst$kw$id;
var G__25242 = "words";
var G__25243 = (hoplon.core.span.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.span.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$id,"title","WeatherGen") : hoplon.core.span.call(null,cljs.core.cst$kw$id,"title","WeatherGen"));
var G__25244 = (function (){var G__25246 = cljs.core.cst$kw$id;
var G__25247 = "byline";
var G__25248 = "by";
var G__25249 = (hoplon.core.a.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.a.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$href,"http://firstfighterwing.com/VFW/member.php?893-Tyrant","Tyrant") : hoplon.core.a.call(null,cljs.core.cst$kw$href,"http://firstfighterwing.com/VFW/member.php?893-Tyrant","Tyrant"));
return (hoplon.core.span.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.span.cljs$core$IFn$_invoke$arity$4(G__25246,G__25247,G__25248,G__25249) : hoplon.core.span.call(null,G__25246,G__25247,G__25248,G__25249));
})();
var G__25245 = (function (){var G__25250 = cljs.core.cst$kw$id;
var G__25251 = "helpstring";
var G__25252 = "Help? Bug? Feature request? Click";
var G__25253 = (hoplon.core.a.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.a.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$href,"help.html","here") : hoplon.core.a.call(null,cljs.core.cst$kw$href,"help.html","here"));
var G__25254 = ".";
return (hoplon.core.span.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.span.cljs$core$IFn$_invoke$arity$5(G__25250,G__25251,G__25252,G__25253,G__25254) : hoplon.core.span.call(null,G__25250,G__25251,G__25252,G__25253,G__25254));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$5(G__25241,G__25242,G__25243,G__25244,G__25245) : hoplon.core.div.call(null,G__25241,G__25242,G__25243,G__25244,G__25245));
})();
var G__25240 = (function (){var G__25255 = cljs.core.cst$kw$href;
var G__25256 = "http://firstfighterwing.com";
var G__25257 = (hoplon.core.img.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.img.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$id,"winglogo",cljs.core.cst$kw$src,"images/1stVFW_Insignia-64.png") : hoplon.core.img.call(null,cljs.core.cst$kw$id,"winglogo",cljs.core.cst$kw$src,"images/1stVFW_Insignia-64.png"));
return (hoplon.core.a.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.a.cljs$core$IFn$_invoke$arity$3(G__25255,G__25256,G__25257) : hoplon.core.a.call(null,G__25255,G__25256,G__25257));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__25237,G__25238,G__25239,G__25240) : hoplon.core.div.call(null,G__25237,G__25238,G__25239,G__25240));
})();
var G__25221 = (function (){var G__25262 = cljs.core.cst$kw$class;
var G__25263 = "two-column";
var G__25264 = (function (){var G__25266 = cljs.core.cst$kw$class;
var G__25267 = "left-column";
var G__25268 = hoplon.app_pages._index_DOT_html.button_bar();
var G__25269 = hoplon.app_pages._index_DOT_html.weather_grid();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__25266,G__25267,G__25268,G__25269) : hoplon.core.div.call(null,G__25266,G__25267,G__25268,G__25269));
})();
var G__25265 = (function (){var G__25270 = cljs.core.cst$kw$class;
var G__25271 = "right-column";
var G__25272 = hoplon.app_pages._index_DOT_html.display_controls();
var G__25273 = hoplon.app_pages._index_DOT_html.weather_controls();
var G__25274 = hoplon.app_pages._index_DOT_html.serialization_controls();
var G__25275 = hoplon.app_pages._index_DOT_html.forecast_display();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$6 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$6(G__25270,G__25271,G__25272,G__25273,G__25274,G__25275) : hoplon.core.div.call(null,G__25270,G__25271,G__25272,G__25273,G__25274,G__25275));
})();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$4 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$4(G__25262,G__25263,G__25264,G__25265) : hoplon.core.div.call(null,G__25262,G__25263,G__25264,G__25265));
})();
var G__25222 = hoplon.app_pages._index_DOT_html.debug_info();
return (hoplon.core.div.cljs$core$IFn$_invoke$arity$5 ? hoplon.core.div.cljs$core$IFn$_invoke$arity$5(G__25218,G__25219,G__25220,G__25221,G__25222) : hoplon.core.div.call(null,G__25218,G__25219,G__25220,G__25221,G__25222));
})();
return (hoplon.core.body.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.body.cljs$core$IFn$_invoke$arity$1(G__25182) : hoplon.core.body.call(null,G__25182));
})()], 0));
cljs.core.add_watch(hoplon.app_pages._index_DOT_html.grid_data,cljs.core.cst$kw$redraw_DASH_triggers,(function (k,r,o,n){
return hoplon.app_pages._index_DOT_html.draw_grid(n);
}));
hoplon.app_pages._index_DOT_html.draw_grid((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hoplon.app_pages._index_DOT_html.grid_data) : cljs.core.deref.call(null,hoplon.app_pages._index_DOT_html.grid_data)));
