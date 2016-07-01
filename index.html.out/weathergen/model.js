// Compiled by ClojureScript 1.9.76 {:static-fns true, :optimize-constants true}
goog.provide('weathergen.model');
goog.require('cljs.core');
goog.require('weathergen.math');
goog.require('org.craigandera.weathergen.pattern_space');
weathergen.model.mmhg__GT_inhg = (function weathergen$model$mmhg__GT_inhg(mmhg){
return ((((mmhg - (950)) / (110)) * 3.25) + 28.05);
});
weathergen.model.inhg__GT_mmhg = (function weathergen$model$inhg__GT_mmhg(inhg){
return ((((inhg - 28.05) / 3.25) * (110)) + (950));
});
weathergen.model.types = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$inclement,cljs.core.cst$kw$poor,cljs.core.cst$kw$fair,cljs.core.cst$kw$sunny], null);
weathergen.model.mix = (function weathergen$model$mix(x,fade,type_params){
var cumulative = cljs.core.reductions.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__19166_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(type_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__19166_SHARP_,cljs.core.cst$kw$weight], null));
}),weathergen.model.types));
var total = cljs.core.last(cumulative);
var vec__19190 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (cumulative,total){
return (function (p1__19167_SHARP_){
return (p1__19167_SHARP_ / total);
});})(cumulative,total))
,cumulative);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19190,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19190,(1),null);
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19190,(2),null);
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19190,(3),null);
var contour = new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(0),(0),(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(((1) - fade) * i),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(0),(0),(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.math.interpolate(i,p,fade),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1),(0),(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.math.interpolate(p,i,fade),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1),(0),(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.math.interpolate(p,f,fade),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(1),(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.math.interpolate(f,p,fade),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(1),(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((1) - fade),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(1)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(1)], null)], null)], null);
var vec__19193 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (cumulative,total,vec__19190,i,p,f,s,contour){
return (function (p__19202){
var vec__19203 = p__19202;
var vec__19206 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19203,(0),null);
var low = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19206,(0),null);
var vec__19209 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19203,(1),null);
var high = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19209,(0),null);
return ((low <= x)) && ((x <= high));
});})(cumulative,total,vec__19190,i,p,f,s,contour))
,cljs.core.partition.cljs$core$IFn$_invoke$arity$3((2),(1),contour)));
var vec__19196 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19193,(0),null);
var x1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19196,(0),null);
var v1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19196,(1),null);
var vec__19199 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19193,(1),null);
var x2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19199,(0),null);
var v2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19199,(1),null);
return cljs.core.zipmap(weathergen.model.types,weathergen.math.vector_interpolate(v1,v2,x,x1,x2));
});
weathergen.model.mix_on = (function weathergen$model$mix_on(categories,mixture,path){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,(function (){var iter__7873__auto__ = (function weathergen$model$mix_on_$_iter__19230(s__19231){
return (new cljs.core.LazySeq(null,(function (){
var s__19231__$1 = s__19231;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__19231__$1);
if(temp__6363__auto__){
var s__19231__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__19231__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__19231__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__19233 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__19232 = (0);
while(true){
if((i__19232 < size__7872__auto__)){
var vec__19242 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__19232);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19242,(0),null);
var weight = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19242,(1),null);
cljs.core.chunk_append(b__19233,(weight * cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(categories,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [type], null),path))));

var G__19248 = (i__19232 + (1));
i__19232 = G__19248;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19233),weathergen$model$mix_on_$_iter__19230(cljs.core.chunk_rest(s__19231__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19233),null);
}
} else {
var vec__19245 = cljs.core.first(s__19231__$2);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19245,(0),null);
var weight = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19245,(1),null);
return cljs.core.cons((weight * cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(categories,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [type], null),path))),weathergen$model$mix_on_$_iter__19230(cljs.core.rest(s__19231__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7873__auto__(mixture);
})());
});
weathergen.model.smoothed_noise_field = (function weathergen$model$smoothed_noise_field(x,y,t,seed,zoom){
var t_STAR_ = cljs.core.long$((function (){var G__19250 = (t + seed);
return Math.floor(G__19250);
})());
return weathergen.math.interpolate(weathergen.math.fractal_field.cljs$core$IFn$_invoke$arity$5(x,y,zoom,(t_STAR_ + 0.01),(1)),weathergen.math.fractal_field.cljs$core$IFn$_invoke$arity$5(x,y,zoom,(t_STAR_ + 1.01),(1)),cljs.core.mod(weathergen.math.frac(t),1.0));
});
weathergen.model.minutes__GT_falcon_time = (function weathergen$model$minutes__GT_falcon_time(min){
var d = ((function (){var G__19254 = ((min / (24)) / (60));
return Math.floor(G__19254);
})() | (0));
var h = ((function (){var G__19255 = (cljs.core.mod(min,((24) * (60))) / (60));
return Math.floor(G__19255);
})() | (0));
var m = ((function (){var G__19256 = cljs.core.mod(min,(60));
return Math.floor(G__19256);
})() | (0));
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$day,(d + (1)),cljs.core.cst$kw$hour,h,cljs.core.cst$kw$minute,m], null);
});
/**
 * Converts from Falcon time to a weather-space time coordinate.
 */
weathergen.model.falcon_time__GT_minutes = (function weathergen$model$falcon_time__GT_minutes(t){
var map__19259 = t;
var map__19259__$1 = ((((!((map__19259 == null)))?((((map__19259.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19259.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19259):map__19259);
var day = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19259__$1,cljs.core.cst$kw$day);
var hour = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19259__$1,cljs.core.cst$kw$hour);
var minute = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19259__$1,cljs.core.cst$kw$minute);
return (((((day - (1)) * (24)) + hour) * (60)) + minute);
});
/**
 * Adds minutes to a Falcon time map.
 */
weathergen.model.add_time = (function weathergen$model$add_time(t,min){
return weathergen.model.minutes__GT_falcon_time((weathergen.model.falcon_time__GT_minutes(t) + min));
});
/**
 * Returns the perturbed coordinates of a point given:
 * 
 * x, y, t - coordinates of sample position in pattern space.
 * seed    - PNRG seed
 * t-power - Strength of turbulence factor
 * t-size  - Spatial size of turbulence field
 */
weathergen.model.perturb = (function weathergen$model$perturb(params){
var map__19263 = params;
var map__19263__$1 = ((((!((map__19263 == null)))?((((map__19263.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19263.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19263):map__19263);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19263__$1,cljs.core.cst$kw$org$craigandera$weathergen$pattern_DASH_space_SLASH_x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19263__$1,cljs.core.cst$kw$org$craigandera$weathergen$pattern_DASH_space_SLASH_y);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19263__$1,cljs.core.cst$kw$org$craigandera$weathergen$pattern_DASH_space_SLASH_t);
var seed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19263__$1,cljs.core.cst$kw$seed);
var turbulence = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19263__$1,cljs.core.cst$kw$turbulence);
var t_power = cljs.core.cst$kw$power.cljs$core$IFn$_invoke$arity$1(turbulence);
var t_size = cljs.core.cst$kw$size.cljs$core$IFn$_invoke$arity$1(turbulence);
var x_STAR_ = (x / t_size);
var y_STAR_ = (y / t_size);
var x_turbulence = weathergen.model.smoothed_noise_field(x_STAR_,y_STAR_,t,seed,(32));
var y_turbulence = weathergen.model.smoothed_noise_field(x_STAR_,y_STAR_,(t + (16)),seed,(32));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((t_power * x_turbulence) + x),((t_power * y_turbulence) + y)], null);
});
weathergen.model.pressure_pattern = (function weathergen$model$pressure_pattern(p__19265){
var vec__19271 = p__19265;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19271,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19271,(1),null);
var v = ((Math.sin(x) * Math.sin(y)) + ((function (){var G__19274 = (x / (3));
return Math.sin(G__19274);
})() * (function (){var G__19275 = (y / (3));
return Math.sin(G__19275);
})()));
return ((v + (2)) / (4));
});
weathergen.model.wind_direction = (function weathergen$model$wind_direction(p__19276,v,params){
var vec__19285 = p__19276;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19285,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19285,(1),null);
var h = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prevailing_DASH_wind,cljs.core.cst$kw$heading], null));
var w0 = weathergen.math.rotate((90),weathergen.math.normalize(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((Math.cos(x) * Math.sin(y)) + (((1.0 / (3)) * (function (){var G__19288 = (x / (3));
return Math.cos(G__19288);
})()) * (function (){var G__19289 = (y / (3));
return Math.sin(G__19289);
})())),((Math.sin(x) * Math.cos(y)) + (((1.0 / (3)) * (function (){var G__19290 = (x / (3));
return Math.sin(G__19290);
})()) * (function (){var G__19291 = (y / (3));
return Math.cos(G__19291);
})()))], null)));
var w1 = weathergen.math.rotate(h,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null));
var c = (function (){var G__19292 = (v - 0.5);
return Math.abs(G__19292);
})();
return weathergen.math.normalize(weathergen.math.vector_interpolate(w1,w0,c,(0),0.5));
});
weathergen.model.wind_speed = (function weathergen$model$wind_speed(categories,mixture,v){
var mean = weathergen.model.mix_on(categories,mixture,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind,cljs.core.cst$kw$mean], null));
var min = weathergen.model.mix_on(categories,mixture,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind,cljs.core.cst$kw$min], null));
var max = weathergen.model.mix_on(categories,mixture,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$wind,cljs.core.cst$kw$max], null));
return weathergen.math.distribute(v,min,mean,max,(1));
});
/**
 * Return true if x*,y* is within the bounds of area.
 */
weathergen.model.in_area_QMARK_ = (function weathergen$model$in_area_QMARK_(p__19293,x_STAR_,y_STAR_){
var map__19296 = p__19293;
var map__19296__$1 = ((((!((map__19296 == null)))?((((map__19296.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19296.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19296):map__19296);
var bounds = map__19296__$1;
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19296__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19296__$1,cljs.core.cst$kw$y);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19296__$1,cljs.core.cst$kw$width);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19296__$1,cljs.core.cst$kw$height);
var and__7007__auto__ = x;
if(cljs.core.truth_(and__7007__auto__)){
var and__7007__auto____$1 = y;
if(cljs.core.truth_(and__7007__auto____$1)){
var and__7007__auto____$2 = width;
if(cljs.core.truth_(and__7007__auto____$2)){
var and__7007__auto____$3 = height;
if(cljs.core.truth_(and__7007__auto____$3)){
return ((x <= x_STAR_)) && ((x_STAR_ < (x + width))) && ((y <= y_STAR_)) && ((y_STAR_ < (y + height)));
} else {
return and__7007__auto____$3;
}
} else {
return and__7007__auto____$2;
}
} else {
return and__7007__auto____$1;
}
} else {
return and__7007__auto__;
}
});
/**
 * Returns the wind, stabilized if appropriate by a wind stability region
 */
weathergen.model.stabilize_wind = (function weathergen$model$stabilize_wind(p__19299,pattern_wind){
var map__19302 = p__19299;
var map__19302__$1 = ((((!((map__19302 == null)))?((((map__19302.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19302.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19302):map__19302);
var wind_stability_areas = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19302__$1,cljs.core.cst$kw$wind_DASH_stability_DASH_areas);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19302__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19302__$1,cljs.core.cst$kw$y);
var _QMARK_ = wind_stability_areas;
var _QMARK___$1 = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (_QMARK_,map__19302,map__19302__$1,wind_stability_areas,x,y){
return (function (p1__19298_SHARP_){
return weathergen.model.in_area_QMARK_(cljs.core.cst$kw$bounds.cljs$core$IFn$_invoke$arity$1(p1__19298_SHARP_),x,y);
});})(_QMARK_,map__19302,map__19302__$1,wind_stability_areas,x,y))
,_QMARK_);
var _QMARK___$2 = cljs.core.first(_QMARK___$1);
var _QMARK___$3 = cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(_QMARK___$2);
var or__7019__auto__ = _QMARK___$3;
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
return pattern_wind;
}
});
weathergen.model.temperature = (function weathergen$model$temperature(categories,mixture,v){
var mean = weathergen.model.mix_on(categories,mixture,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$temp,cljs.core.cst$kw$mean], null));
var min = weathergen.model.mix_on(categories,mixture,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$temp,cljs.core.cst$kw$min], null));
var max = weathergen.model.mix_on(categories,mixture,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$temp,cljs.core.cst$kw$max], null));
return weathergen.math.distribute(v,min,mean,max,(1));
});
/**
 * x and y are in cells, t is in minutes.
 */
weathergen.model.weather = (function weathergen$model$weather(p__19304){
var map__19310 = p__19304;
var map__19310__$1 = ((((!((map__19310 == null)))?((((map__19310.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19310.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19310):map__19310);
var params = map__19310__$1;
var wind_uniformity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19310__$1,cljs.core.cst$kw$wind_DASH_uniformity);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19310__$1,cljs.core.cst$kw$t);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19310__$1,cljs.core.cst$kw$x);
var crossfade = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19310__$1,cljs.core.cst$kw$crossfade);
var prevailing_wind = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19310__$1,cljs.core.cst$kw$prevailing_DASH_wind);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19310__$1,cljs.core.cst$kw$y);
var temp_uniformity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19310__$1,cljs.core.cst$kw$temp_DASH_uniformity);
var pressure = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19310__$1,cljs.core.cst$kw$pressure);
var evolution = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19310__$1,cljs.core.cst$kw$evolution);
var seed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19310__$1,cljs.core.cst$kw$seed);
var feature_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19310__$1,cljs.core.cst$kw$feature_DASH_size);
var categories = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19310__$1,cljs.core.cst$kw$categories);
var origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19310__$1,cljs.core.cst$kw$origin);
var vec__19312 = origin;
var origin_x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19312,(0),null);
var origin_y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19312,(1),null);
var x_STAR_ = ((origin_x + x) / feature_size);
var y_STAR_ = ((origin_y + y) / feature_size);
var t_STAR_ = ((t / evolution) / (10));
var max_pressure = cljs.core.cst$kw$max.cljs$core$IFn$_invoke$arity$1(pressure);
var min_pressure = cljs.core.cst$kw$min.cljs$core$IFn$_invoke$arity$1(pressure);
var params_STAR_ = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(params,cljs.core.cst$kw$org$craigandera$weathergen$pattern_DASH_space_SLASH_x,x_STAR_,cljs.core.array_seq([cljs.core.cst$kw$org$craigandera$weathergen$pattern_DASH_space_SLASH_y,y_STAR_,cljs.core.cst$kw$org$craigandera$weathergen$pattern_DASH_space_SLASH_t,t_STAR_], 0));
var p = weathergen.model.perturb(params_STAR_);
var value = weathergen.model.pressure_pattern(p);
var wind_dir = weathergen.model.wind_direction(p,value,params_STAR_);
var pressure__$1 = weathergen.math.clamp(min_pressure,max_pressure,(min_pressure + ((max_pressure - min_pressure) * value)));
var mixture = weathergen.model.mix(value,crossfade,categories);
var wind_var = weathergen.math.reject_tails(wind_uniformity,weathergen.model.smoothed_noise_field((x_STAR_ * feature_size),(y_STAR_ * feature_size),t_STAR_,(seed + (17)),(32)));
var temp_var = weathergen.math.reject_tails(temp_uniformity,weathergen.model.smoothed_noise_field((x_STAR_ * feature_size),(y_STAR_ * feature_size),t_STAR_,(seed + (18)),(32)));
return cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$pressure,cljs.core.cst$kw$value,cljs.core.cst$kw$type,cljs.core.cst$kw$wind,cljs.core.cst$kw$mixture,cljs.core.cst$kw$wind_DASH_var,cljs.core.cst$kw$wind_DASH_vec,cljs.core.cst$kw$p,cljs.core.cst$kw$temperature],[weathergen.math.nearest(pressure__$1,0.01),value,cljs.core.key(cljs.core.last(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.val,mixture))),weathergen.model.stabilize_wind(params_STAR_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$heading,weathergen.math.heading(wind_dir),cljs.core.cst$kw$speed,weathergen.model.wind_speed(categories,mixture,wind_var)], null)),mixture,wind_var,wind_dir,p,weathergen.model.temperature(categories,mixture,temp_var)]);
});
weathergen.model.weather_grid = (function weathergen$model$weather_grid(p__19315){
var map__19353 = p__19315;
var map__19353__$1 = ((((!((map__19353 == null)))?((((map__19353.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19353.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19353):map__19353);
var params = map__19353__$1;
var map_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19353__$1,cljs.core.cst$kw$map_DASH_fn);
var cell_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19353__$1,cljs.core.cst$kw$cell_DASH_count);
var origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19353__$1,cljs.core.cst$kw$origin);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19353__$1,cljs.core.cst$kw$time);
var vec__19355 = cell_count;
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19355,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19355,(1),null);
var vec__19358 = origin;
var origin_x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19358,(0),null);
var origin_y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19358,(1),null);
var map__19361 = time;
var map__19361__$1 = ((((!((map__19361 == null)))?((((map__19361.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19361.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19361):map__19361);
var offset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19361__$1,cljs.core.cst$kw$offset);
var current = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19361__$1,cljs.core.cst$kw$current);
var map_fn__$1 = (function (){var or__7019__auto__ = map_fn;
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
return cljs.core.map;
}
})();
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.sorted_map(),(function (){var G__19370 = ((function (vec__19355,width,height,vec__19358,origin_x,origin_y,map__19361,map__19361__$1,offset,current,map_fn__$1,map__19353,map__19353__$1,params,map_fn,cell_count,origin,time){
return (function (p__19372){
var vec__19373 = p__19372;
var vec__19376 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19373,(0),null);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19376,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19376,(1),null);
var params__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19373,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null),weathergen.model.weather(params__$1)], null);
});})(vec__19355,width,height,vec__19358,origin_x,origin_y,map__19361,map__19361__$1,offset,current,map_fn__$1,map__19353,map__19353__$1,params,map_fn,cell_count,origin,time))
;
var G__19371 = (function (){var iter__7873__auto__ = ((function (G__19370,vec__19355,width,height,vec__19358,origin_x,origin_y,map__19361,map__19361__$1,offset,current,map_fn__$1,map__19353,map__19353__$1,params,map_fn,cell_count,origin,time){
return (function weathergen$model$weather_grid_$_iter__19379(s__19380){
return (new cljs.core.LazySeq(null,((function (G__19370,vec__19355,width,height,vec__19358,origin_x,origin_y,map__19361,map__19361__$1,offset,current,map_fn__$1,map__19353,map__19353__$1,params,map_fn,cell_count,origin,time){
return (function (){
var s__19380__$1 = s__19380;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__19380__$1);
if(temp__6363__auto__){
var xs__6915__auto__ = temp__6363__auto__;
var x = cljs.core.first(xs__6915__auto__);
var iterys__7869__auto__ = ((function (s__19380__$1,x,xs__6915__auto__,temp__6363__auto__,G__19370,vec__19355,width,height,vec__19358,origin_x,origin_y,map__19361,map__19361__$1,offset,current,map_fn__$1,map__19353,map__19353__$1,params,map_fn,cell_count,origin,time){
return (function weathergen$model$weather_grid_$_iter__19379_$_iter__19381(s__19382){
return (new cljs.core.LazySeq(null,((function (s__19380__$1,x,xs__6915__auto__,temp__6363__auto__,G__19370,vec__19355,width,height,vec__19358,origin_x,origin_y,map__19361,map__19361__$1,offset,current,map_fn__$1,map__19353,map__19353__$1,params,map_fn,cell_count,origin,time){
return (function (){
var s__19382__$1 = s__19382;
while(true){
var temp__6363__auto____$1 = cljs.core.seq(s__19382__$1);
if(temp__6363__auto____$1){
var s__19382__$2 = temp__6363__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__19382__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__19382__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__19384 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__19383 = (0);
while(true){
if((i__19383 < size__7872__auto__)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__19383);
cljs.core.chunk_append(b__19384,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(params,cljs.core.cst$kw$x,x,cljs.core.array_seq([cljs.core.cst$kw$y,y,cljs.core.cst$kw$t,(offset + weathergen.model.falcon_time__GT_minutes(current))], 0))], null));

var G__19390 = (i__19383 + (1));
i__19383 = G__19390;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19384),weathergen$model$weather_grid_$_iter__19379_$_iter__19381(cljs.core.chunk_rest(s__19382__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19384),null);
}
} else {
var y = cljs.core.first(s__19382__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(params,cljs.core.cst$kw$x,x,cljs.core.array_seq([cljs.core.cst$kw$y,y,cljs.core.cst$kw$t,(offset + weathergen.model.falcon_time__GT_minutes(current))], 0))], null),weathergen$model$weather_grid_$_iter__19379_$_iter__19381(cljs.core.rest(s__19382__$2)));
}
} else {
return null;
}
break;
}
});})(s__19380__$1,x,xs__6915__auto__,temp__6363__auto__,G__19370,vec__19355,width,height,vec__19358,origin_x,origin_y,map__19361,map__19361__$1,offset,current,map_fn__$1,map__19353,map__19353__$1,params,map_fn,cell_count,origin,time))
,null,null));
});})(s__19380__$1,x,xs__6915__auto__,temp__6363__auto__,G__19370,vec__19355,width,height,vec__19358,origin_x,origin_y,map__19361,map__19361__$1,offset,current,map_fn__$1,map__19353,map__19353__$1,params,map_fn,cell_count,origin,time))
;
var fs__7870__auto__ = cljs.core.seq(iterys__7869__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(height)));
if(fs__7870__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__7870__auto__,weathergen$model$weather_grid_$_iter__19379(cljs.core.rest(s__19380__$1)));
} else {
var G__19391 = cljs.core.rest(s__19380__$1);
s__19380__$1 = G__19391;
continue;
}
} else {
return null;
}
break;
}
});})(G__19370,vec__19355,width,height,vec__19358,origin_x,origin_y,map__19361,map__19361__$1,offset,current,map_fn__$1,map__19353,map__19353__$1,params,map_fn,cell_count,origin,time))
,null,null));
});})(G__19370,vec__19355,width,height,vec__19358,origin_x,origin_y,map__19361,map__19361__$1,offset,current,map_fn__$1,map__19353,map__19353__$1,params,map_fn,cell_count,origin,time))
;
return iter__7873__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(width));
})();
return (map_fn__$1.cljs$core$IFn$_invoke$arity$2 ? map_fn__$1.cljs$core$IFn$_invoke$arity$2(G__19370,G__19371) : map_fn__$1.call(null,G__19370,G__19371));
})());
});
/**
 * Returns an updated weather-params that has been moved in time and
 *   space according to movement-params by `steps`.
 */
weathergen.model.step = (function weathergen$model$step(weather_params,movement_params,steps){
var map__19396 = movement_params;
var map__19396__$1 = ((((!((map__19396 == null)))?((((map__19396.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19396.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19396):map__19396);
var step__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19396__$1,cljs.core.cst$kw$step);
var direction = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19396__$1,cljs.core.cst$kw$direction);
var map__19397 = direction;
var map__19397__$1 = ((((!((map__19397 == null)))?((((map__19397.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19397.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19397):map__19397);
var speed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19397__$1,cljs.core.cst$kw$speed);
var heading = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19397__$1,cljs.core.cst$kw$heading);
var delta_t = (steps * step__$1);
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time,cljs.core.cst$kw$current], null),weathergen.model.add_time,delta_t),cljs.core.cst$kw$origin,weathergen.math.vector_add,weathergen.math.scale((delta_t * ((speed / (60)) / (9))),weathergen.math.rotate((- heading),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null))));
});
/**
 * Return a map, keyed by time, with the weather forecast for the
 *   given location. First forecast is for start time from weather
 *   params, with `steps` forecasts in total. Step size is as specified
 *   by movement params.
 */
weathergen.model.forecast = (function weathergen$model$forecast(p__19400,weather_params,movement_params,steps){
var vec__19430 = p__19400;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19430,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19430,(1),null);
var map__19433 = weather_params;
var map__19433__$1 = ((((!((map__19433 == null)))?((((map__19433.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19433.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19433):map__19433);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19433__$1,cljs.core.cst$kw$time);
var map__19434 = time;
var map__19434__$1 = ((((!((map__19434 == null)))?((((map__19434.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19434.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19434):map__19434);
var offset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19434__$1,cljs.core.cst$kw$offset);
var current = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19434__$1,cljs.core.cst$kw$current);
var map__19435 = movement_params;
var map__19435__$1 = ((((!((map__19435 == null)))?((((map__19435.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19435.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19435):map__19435);
var direction = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19435__$1,cljs.core.cst$kw$direction);
var step = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19435__$1,cljs.core.cst$kw$step);
var map__19436 = direction;
var map__19436__$1 = ((((!((map__19436 == null)))?((((map__19436.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19436.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19436):map__19436);
var heading = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19436__$1,cljs.core.cst$kw$heading);
var speed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19436__$1,cljs.core.cst$kw$speed);
var now = (offset + weathergen.model.falcon_time__GT_minutes(current));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.sorted_map_by(((function (map__19433,map__19433__$1,time,map__19434,map__19434__$1,offset,current,map__19435,map__19435__$1,direction,step,map__19436,map__19436__$1,heading,speed,now,vec__19430,x,y){
return (function (a,b){
return cljs.core.compare(weathergen.model.falcon_time__GT_minutes(a),weathergen.model.falcon_time__GT_minutes(b));
});})(map__19433,map__19433__$1,time,map__19434,map__19434__$1,offset,current,map__19435,map__19435__$1,direction,step,map__19436,map__19436__$1,heading,speed,now,vec__19430,x,y))
),(function (){var iter__7873__auto__ = ((function (map__19433,map__19433__$1,time,map__19434,map__19434__$1,offset,current,map__19435,map__19435__$1,direction,step,map__19436,map__19436__$1,heading,speed,now,vec__19430,x,y){
return (function weathergen$model$forecast_$_iter__19441(s__19442){
return (new cljs.core.LazySeq(null,((function (map__19433,map__19433__$1,time,map__19434,map__19434__$1,offset,current,map__19435,map__19435__$1,direction,step,map__19436,map__19436__$1,heading,speed,now,vec__19430,x,y){
return (function (){
var s__19442__$1 = s__19442;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__19442__$1);
if(temp__6363__auto__){
var s__19442__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__19442__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__19442__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__19444 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__19443 = (0);
while(true){
if((i__19443 < size__7872__auto__)){
var n = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__19443);
var dt = (((-1) * step) * n);
var vec__19453 = weathergen.math.scale((((-1) * dt) * ((speed / (60)) / (9))),weathergen.math.rotate((- heading),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null)));
var dx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19453,(0),null);
var dy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19453,(1),null);
var dpos = vec__19453;
cljs.core.chunk_append(b__19444,(function (){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$current,current,cljs.core.cst$kw$offset,offset,cljs.core.cst$kw$now,now], 0));

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.model.add_time(current,(step * n)),weathergen.model.weather(cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(weather_params,cljs.core.cst$kw$x,x,cljs.core.array_seq([cljs.core.cst$kw$y,y,cljs.core.cst$kw$t,now], 0)),cljs.core.cst$kw$origin,weathergen.math.vector_add,dpos))], null);
})()
);

var G__19459 = (i__19443 + (1));
i__19443 = G__19459;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19444),weathergen$model$forecast_$_iter__19441(cljs.core.chunk_rest(s__19442__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19444),null);
}
} else {
var n = cljs.core.first(s__19442__$2);
var dt = (((-1) * step) * n);
var vec__19456 = weathergen.math.scale((((-1) * dt) * ((speed / (60)) / (9))),weathergen.math.rotate((- heading),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null)));
var dx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19456,(0),null);
var dy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19456,(1),null);
var dpos = vec__19456;
return cljs.core.cons((function (){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$current,current,cljs.core.cst$kw$offset,offset,cljs.core.cst$kw$now,now], 0));

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.model.add_time(current,(step * n)),weathergen.model.weather(cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(weather_params,cljs.core.cst$kw$x,x,cljs.core.array_seq([cljs.core.cst$kw$y,y,cljs.core.cst$kw$t,now], 0)),cljs.core.cst$kw$origin,weathergen.math.vector_add,dpos))], null);
})()
,weathergen$model$forecast_$_iter__19441(cljs.core.rest(s__19442__$2)));
}
} else {
return null;
}
break;
}
});})(map__19433,map__19433__$1,time,map__19434,map__19434__$1,offset,current,map__19435,map__19435__$1,direction,step,map__19436,map__19436__$1,heading,speed,now,vec__19430,x,y))
,null,null));
});})(map__19433,map__19433__$1,time,map__19434,map__19434__$1,offset,current,map__19435,map__19435__$1,direction,step,map__19436,map__19436__$1,heading,speed,now,vec__19430,x,y))
;
return iter__7873__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(steps));
})());
});
/**
 * Return a new weather params that has been moved to the specified
 *   time. Weather changes.
 */
weathergen.model.jump_to_time = (function weathergen$model$jump_to_time(weather_params,movement_params,t){
var map__19468 = movement_params;
var map__19468__$1 = ((((!((map__19468 == null)))?((((map__19468.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19468.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19468):map__19468);
var evolution = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19468__$1,cljs.core.cst$kw$evolution);
var direction = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19468__$1,cljs.core.cst$kw$direction);
var map__19469 = direction;
var map__19469__$1 = ((((!((map__19469 == null)))?((((map__19469.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19469.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19469):map__19469);
var speed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19469__$1,cljs.core.cst$kw$speed);
var heading = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19469__$1,cljs.core.cst$kw$heading);
var map__19470 = weather_params;
var map__19470__$1 = ((((!((map__19470 == null)))?((((map__19470.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19470.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19470):map__19470);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19470__$1,cljs.core.cst$kw$time);
var map__19471 = time;
var map__19471__$1 = ((((!((map__19471 == null)))?((((map__19471.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19471.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19471):map__19471);
var current = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19471__$1,cljs.core.cst$kw$current);
var delta_t = (weathergen.model.falcon_time__GT_minutes(t) - weathergen.model.falcon_time__GT_minutes(current));
var new$ = cljs.core.assoc_in(cljs.core.update.cljs$core$IFn$_invoke$arity$4(weather_params,cljs.core.cst$kw$origin,weathergen.math.vector_add,weathergen.math.scale((delta_t * ((speed / (60)) / (9))),weathergen.math.rotate((- heading),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null)))),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time,cljs.core.cst$kw$current], null),t);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$new,new$], 0));

return new$;
});
/**
 * Adjust the time coordinate so that the current time is adjusted to
 *   match the provided time without changing the location in weather
 *   space.
 */
weathergen.model.set_time = (function weathergen$model$set_time(weather_params,time){
var offset = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time,cljs.core.cst$kw$offset], null));
var current_time = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time,cljs.core.cst$kw$current], null));
var delta = (weathergen.model.falcon_time__GT_minutes(current_time) - weathergen.model.falcon_time__GT_minutes(time));
return cljs.core.assoc_in(cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time,cljs.core.cst$kw$offset], null),cljs.core._PLUS_,delta),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time,cljs.core.cst$kw$current], null),time);
});
