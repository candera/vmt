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
var cumulative = cljs.core.reductions.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__19226_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(type_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__19226_SHARP_,cljs.core.cst$kw$weight], null));
}),weathergen.model.types));
var total = cljs.core.last(cumulative);
var vec__19250 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (cumulative,total){
return (function (p1__19227_SHARP_){
return (p1__19227_SHARP_ / total);
});})(cumulative,total))
,cumulative);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19250,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19250,(1),null);
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19250,(2),null);
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19250,(3),null);
var contour = new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(0),(0),(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(((1) - fade) * i),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(0),(0),(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.math.interpolate(i,p,fade),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1),(0),(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.math.interpolate(p,i,fade),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1),(0),(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.math.interpolate(p,f,fade),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(1),(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.math.interpolate(f,p,fade),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(1),(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((1) - fade),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(1)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(1)], null)], null)], null);
var vec__19253 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (cumulative,total,vec__19250,i,p,f,s,contour){
return (function (p__19262){
var vec__19263 = p__19262;
var vec__19266 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19263,(0),null);
var low = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19266,(0),null);
var vec__19269 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19263,(1),null);
var high = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19269,(0),null);
return ((low <= x)) && ((x <= high));
});})(cumulative,total,vec__19250,i,p,f,s,contour))
,cljs.core.partition.cljs$core$IFn$_invoke$arity$3((2),(1),contour)));
var vec__19256 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19253,(0),null);
var x1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19256,(0),null);
var v1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19256,(1),null);
var vec__19259 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19253,(1),null);
var x2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19259,(0),null);
var v2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19259,(1),null);
return cljs.core.zipmap(weathergen.model.types,weathergen.math.vector_interpolate(v1,v2,x,x1,x2));
});
weathergen.model.mix_on = (function weathergen$model$mix_on(categories,mixture,path){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,(function (){var iter__7873__auto__ = (function weathergen$model$mix_on_$_iter__19290(s__19291){
return (new cljs.core.LazySeq(null,(function (){
var s__19291__$1 = s__19291;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__19291__$1);
if(temp__6363__auto__){
var s__19291__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__19291__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__19291__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__19293 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__19292 = (0);
while(true){
if((i__19292 < size__7872__auto__)){
var vec__19302 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__19292);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19302,(0),null);
var weight = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19302,(1),null);
cljs.core.chunk_append(b__19293,(weight * cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(categories,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [type], null),path))));

var G__19308 = (i__19292 + (1));
i__19292 = G__19308;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19293),weathergen$model$mix_on_$_iter__19290(cljs.core.chunk_rest(s__19291__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19293),null);
}
} else {
var vec__19305 = cljs.core.first(s__19291__$2);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19305,(0),null);
var weight = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19305,(1),null);
return cljs.core.cons((weight * cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(categories,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [type], null),path))),weathergen$model$mix_on_$_iter__19290(cljs.core.rest(s__19291__$2)));
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
var t_STAR_ = cljs.core.long$((function (){var G__19310 = (t + seed);
return Math.floor(G__19310);
})());
return weathergen.math.interpolate(weathergen.math.fractal_field.cljs$core$IFn$_invoke$arity$5(x,y,zoom,(t_STAR_ + 0.01),(1)),weathergen.math.fractal_field.cljs$core$IFn$_invoke$arity$5(x,y,zoom,(t_STAR_ + 1.01),(1)),cljs.core.mod(weathergen.math.frac(t),1.0));
});
weathergen.model.minutes__GT_falcon_time = (function weathergen$model$minutes__GT_falcon_time(min){
var d = ((function (){var G__19314 = ((min / (24)) / (60));
return Math.floor(G__19314);
})() | (0));
var h = ((function (){var G__19315 = (cljs.core.mod(min,((24) * (60))) / (60));
return Math.floor(G__19315);
})() | (0));
var m = ((function (){var G__19316 = cljs.core.mod(min,(60));
return Math.floor(G__19316);
})() | (0));
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$day,(d + (1)),cljs.core.cst$kw$hour,h,cljs.core.cst$kw$minute,m], null);
});
/**
 * Converts from Falcon time to a weather-space time coordinate.
 */
weathergen.model.falcon_time__GT_minutes = (function weathergen$model$falcon_time__GT_minutes(t){
var map__19319 = t;
var map__19319__$1 = ((((!((map__19319 == null)))?((((map__19319.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19319.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19319):map__19319);
var day = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19319__$1,cljs.core.cst$kw$day);
var hour = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19319__$1,cljs.core.cst$kw$hour);
var minute = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19319__$1,cljs.core.cst$kw$minute);
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
var map__19323 = params;
var map__19323__$1 = ((((!((map__19323 == null)))?((((map__19323.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19323.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19323):map__19323);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19323__$1,cljs.core.cst$kw$org$craigandera$weathergen$pattern_DASH_space_SLASH_x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19323__$1,cljs.core.cst$kw$org$craigandera$weathergen$pattern_DASH_space_SLASH_y);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19323__$1,cljs.core.cst$kw$org$craigandera$weathergen$pattern_DASH_space_SLASH_t);
var seed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19323__$1,cljs.core.cst$kw$seed);
var turbulence = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19323__$1,cljs.core.cst$kw$turbulence);
var t_power = cljs.core.cst$kw$power.cljs$core$IFn$_invoke$arity$1(turbulence);
var t_size = cljs.core.cst$kw$size.cljs$core$IFn$_invoke$arity$1(turbulence);
var x_STAR_ = (x / t_size);
var y_STAR_ = (y / t_size);
var x_turbulence = weathergen.model.smoothed_noise_field(x_STAR_,y_STAR_,t,seed,(32));
var y_turbulence = weathergen.model.smoothed_noise_field(x_STAR_,y_STAR_,(t + (16)),seed,(32));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((t_power * x_turbulence) + x),((t_power * y_turbulence) + y)], null);
});
weathergen.model.pressure_pattern = (function weathergen$model$pressure_pattern(p__19325){
var vec__19331 = p__19325;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19331,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19331,(1),null);
var v = ((Math.sin(x) * Math.sin(y)) + ((function (){var G__19334 = (x / (3));
return Math.sin(G__19334);
})() * (function (){var G__19335 = (y / (3));
return Math.sin(G__19335);
})()));
return ((v + (2)) / (4));
});
weathergen.model.wind_direction = (function weathergen$model$wind_direction(p__19336,v,params){
var vec__19345 = p__19336;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19345,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19345,(1),null);
var h = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prevailing_DASH_wind,cljs.core.cst$kw$heading], null));
var w0 = weathergen.math.rotate((90),weathergen.math.normalize(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((Math.cos(x) * Math.sin(y)) + (((1.0 / (3)) * (function (){var G__19348 = (x / (3));
return Math.cos(G__19348);
})()) * (function (){var G__19349 = (y / (3));
return Math.sin(G__19349);
})())),((Math.sin(x) * Math.cos(y)) + (((1.0 / (3)) * (function (){var G__19350 = (x / (3));
return Math.sin(G__19350);
})()) * (function (){var G__19351 = (y / (3));
return Math.cos(G__19351);
})()))], null)));
var w1 = weathergen.math.rotate(h,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null));
var c = (function (){var G__19352 = (v - 0.5);
return Math.abs(G__19352);
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
weathergen.model.in_area_QMARK_ = (function weathergen$model$in_area_QMARK_(p__19353,x_STAR_,y_STAR_){
var map__19356 = p__19353;
var map__19356__$1 = ((((!((map__19356 == null)))?((((map__19356.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19356.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19356):map__19356);
var bounds = map__19356__$1;
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19356__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19356__$1,cljs.core.cst$kw$y);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19356__$1,cljs.core.cst$kw$width);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19356__$1,cljs.core.cst$kw$height);
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
weathergen.model.stabilize_wind = (function weathergen$model$stabilize_wind(p__19359,pattern_wind){
var map__19362 = p__19359;
var map__19362__$1 = ((((!((map__19362 == null)))?((((map__19362.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19362.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19362):map__19362);
var wind_stability_areas = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19362__$1,cljs.core.cst$kw$wind_DASH_stability_DASH_areas);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19362__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19362__$1,cljs.core.cst$kw$y);
var _QMARK_ = wind_stability_areas;
var _QMARK___$1 = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (_QMARK_,map__19362,map__19362__$1,wind_stability_areas,x,y){
return (function (p1__19358_SHARP_){
return weathergen.model.in_area_QMARK_(cljs.core.cst$kw$bounds.cljs$core$IFn$_invoke$arity$1(p1__19358_SHARP_),x,y);
});})(_QMARK_,map__19362,map__19362__$1,wind_stability_areas,x,y))
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
weathergen.model.weather = (function weathergen$model$weather(p__19364){
var map__19370 = p__19364;
var map__19370__$1 = ((((!((map__19370 == null)))?((((map__19370.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19370.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19370):map__19370);
var params = map__19370__$1;
var wind_uniformity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19370__$1,cljs.core.cst$kw$wind_DASH_uniformity);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19370__$1,cljs.core.cst$kw$t);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19370__$1,cljs.core.cst$kw$x);
var crossfade = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19370__$1,cljs.core.cst$kw$crossfade);
var prevailing_wind = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19370__$1,cljs.core.cst$kw$prevailing_DASH_wind);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19370__$1,cljs.core.cst$kw$y);
var temp_uniformity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19370__$1,cljs.core.cst$kw$temp_DASH_uniformity);
var pressure = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19370__$1,cljs.core.cst$kw$pressure);
var evolution = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19370__$1,cljs.core.cst$kw$evolution);
var seed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19370__$1,cljs.core.cst$kw$seed);
var feature_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19370__$1,cljs.core.cst$kw$feature_DASH_size);
var categories = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19370__$1,cljs.core.cst$kw$categories);
var origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19370__$1,cljs.core.cst$kw$origin);
var vec__19372 = origin;
var origin_x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19372,(0),null);
var origin_y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19372,(1),null);
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
weathergen.model.weather_grid = (function weathergen$model$weather_grid(p__19375){
var map__19413 = p__19375;
var map__19413__$1 = ((((!((map__19413 == null)))?((((map__19413.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19413.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19413):map__19413);
var params = map__19413__$1;
var map_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19413__$1,cljs.core.cst$kw$map_DASH_fn);
var cell_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19413__$1,cljs.core.cst$kw$cell_DASH_count);
var origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19413__$1,cljs.core.cst$kw$origin);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19413__$1,cljs.core.cst$kw$time);
var vec__19415 = cell_count;
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19415,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19415,(1),null);
var vec__19418 = origin;
var origin_x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19418,(0),null);
var origin_y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19418,(1),null);
var map__19421 = time;
var map__19421__$1 = ((((!((map__19421 == null)))?((((map__19421.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19421.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19421):map__19421);
var offset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19421__$1,cljs.core.cst$kw$offset);
var current = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19421__$1,cljs.core.cst$kw$current);
var map_fn__$1 = (function (){var or__7019__auto__ = map_fn;
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
return cljs.core.map;
}
})();
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.sorted_map(),(function (){var G__19430 = ((function (vec__19415,width,height,vec__19418,origin_x,origin_y,map__19421,map__19421__$1,offset,current,map_fn__$1,map__19413,map__19413__$1,params,map_fn,cell_count,origin,time){
return (function (p__19432){
var vec__19433 = p__19432;
var vec__19436 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19433,(0),null);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19436,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19436,(1),null);
var params__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19433,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null),weathergen.model.weather(params__$1)], null);
});})(vec__19415,width,height,vec__19418,origin_x,origin_y,map__19421,map__19421__$1,offset,current,map_fn__$1,map__19413,map__19413__$1,params,map_fn,cell_count,origin,time))
;
var G__19431 = (function (){var iter__7873__auto__ = ((function (G__19430,vec__19415,width,height,vec__19418,origin_x,origin_y,map__19421,map__19421__$1,offset,current,map_fn__$1,map__19413,map__19413__$1,params,map_fn,cell_count,origin,time){
return (function weathergen$model$weather_grid_$_iter__19439(s__19440){
return (new cljs.core.LazySeq(null,((function (G__19430,vec__19415,width,height,vec__19418,origin_x,origin_y,map__19421,map__19421__$1,offset,current,map_fn__$1,map__19413,map__19413__$1,params,map_fn,cell_count,origin,time){
return (function (){
var s__19440__$1 = s__19440;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__19440__$1);
if(temp__6363__auto__){
var xs__6915__auto__ = temp__6363__auto__;
var x = cljs.core.first(xs__6915__auto__);
var iterys__7869__auto__ = ((function (s__19440__$1,x,xs__6915__auto__,temp__6363__auto__,G__19430,vec__19415,width,height,vec__19418,origin_x,origin_y,map__19421,map__19421__$1,offset,current,map_fn__$1,map__19413,map__19413__$1,params,map_fn,cell_count,origin,time){
return (function weathergen$model$weather_grid_$_iter__19439_$_iter__19441(s__19442){
return (new cljs.core.LazySeq(null,((function (s__19440__$1,x,xs__6915__auto__,temp__6363__auto__,G__19430,vec__19415,width,height,vec__19418,origin_x,origin_y,map__19421,map__19421__$1,offset,current,map_fn__$1,map__19413,map__19413__$1,params,map_fn,cell_count,origin,time){
return (function (){
var s__19442__$1 = s__19442;
while(true){
var temp__6363__auto____$1 = cljs.core.seq(s__19442__$1);
if(temp__6363__auto____$1){
var s__19442__$2 = temp__6363__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__19442__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__19442__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__19444 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__19443 = (0);
while(true){
if((i__19443 < size__7872__auto__)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__19443);
cljs.core.chunk_append(b__19444,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(params,cljs.core.cst$kw$x,x,cljs.core.array_seq([cljs.core.cst$kw$y,y,cljs.core.cst$kw$t,(offset + weathergen.model.falcon_time__GT_minutes(current))], 0))], null));

var G__19450 = (i__19443 + (1));
i__19443 = G__19450;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19444),weathergen$model$weather_grid_$_iter__19439_$_iter__19441(cljs.core.chunk_rest(s__19442__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19444),null);
}
} else {
var y = cljs.core.first(s__19442__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(params,cljs.core.cst$kw$x,x,cljs.core.array_seq([cljs.core.cst$kw$y,y,cljs.core.cst$kw$t,(offset + weathergen.model.falcon_time__GT_minutes(current))], 0))], null),weathergen$model$weather_grid_$_iter__19439_$_iter__19441(cljs.core.rest(s__19442__$2)));
}
} else {
return null;
}
break;
}
});})(s__19440__$1,x,xs__6915__auto__,temp__6363__auto__,G__19430,vec__19415,width,height,vec__19418,origin_x,origin_y,map__19421,map__19421__$1,offset,current,map_fn__$1,map__19413,map__19413__$1,params,map_fn,cell_count,origin,time))
,null,null));
});})(s__19440__$1,x,xs__6915__auto__,temp__6363__auto__,G__19430,vec__19415,width,height,vec__19418,origin_x,origin_y,map__19421,map__19421__$1,offset,current,map_fn__$1,map__19413,map__19413__$1,params,map_fn,cell_count,origin,time))
;
var fs__7870__auto__ = cljs.core.seq(iterys__7869__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(height)));
if(fs__7870__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__7870__auto__,weathergen$model$weather_grid_$_iter__19439(cljs.core.rest(s__19440__$1)));
} else {
var G__19451 = cljs.core.rest(s__19440__$1);
s__19440__$1 = G__19451;
continue;
}
} else {
return null;
}
break;
}
});})(G__19430,vec__19415,width,height,vec__19418,origin_x,origin_y,map__19421,map__19421__$1,offset,current,map_fn__$1,map__19413,map__19413__$1,params,map_fn,cell_count,origin,time))
,null,null));
});})(G__19430,vec__19415,width,height,vec__19418,origin_x,origin_y,map__19421,map__19421__$1,offset,current,map_fn__$1,map__19413,map__19413__$1,params,map_fn,cell_count,origin,time))
;
return iter__7873__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(width));
})();
return (map_fn__$1.cljs$core$IFn$_invoke$arity$2 ? map_fn__$1.cljs$core$IFn$_invoke$arity$2(G__19430,G__19431) : map_fn__$1.call(null,G__19430,G__19431));
})());
});
/**
 * Returns an updated weather-params that has been moved in time and
 *   space according to movement-params by `steps`.
 */
weathergen.model.step = (function weathergen$model$step(weather_params,movement_params,steps){
var map__19456 = movement_params;
var map__19456__$1 = ((((!((map__19456 == null)))?((((map__19456.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19456.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19456):map__19456);
var step__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19456__$1,cljs.core.cst$kw$step);
var direction = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19456__$1,cljs.core.cst$kw$direction);
var map__19457 = direction;
var map__19457__$1 = ((((!((map__19457 == null)))?((((map__19457.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19457.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19457):map__19457);
var speed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19457__$1,cljs.core.cst$kw$speed);
var heading = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19457__$1,cljs.core.cst$kw$heading);
var delta_t = (steps * step__$1);
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(weather_params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time,cljs.core.cst$kw$current], null),weathergen.model.add_time,delta_t),cljs.core.cst$kw$origin,weathergen.math.vector_add,weathergen.math.scale((delta_t * ((speed / (60)) / (9))),weathergen.math.rotate((- heading),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null))));
});
/**
 * Return a map, keyed by time, with the weather forecast for the
 *   given location. First forecast is for start time from weather
 *   params, with `steps` forecasts in total. Step size is as specified
 *   by movement params.
 */
weathergen.model.forecast = (function weathergen$model$forecast(p__19460,weather_params,movement_params,steps){
var vec__19490 = p__19460;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19490,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19490,(1),null);
var map__19493 = weather_params;
var map__19493__$1 = ((((!((map__19493 == null)))?((((map__19493.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19493.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19493):map__19493);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19493__$1,cljs.core.cst$kw$time);
var map__19494 = time;
var map__19494__$1 = ((((!((map__19494 == null)))?((((map__19494.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19494.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19494):map__19494);
var offset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19494__$1,cljs.core.cst$kw$offset);
var current = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19494__$1,cljs.core.cst$kw$current);
var map__19495 = movement_params;
var map__19495__$1 = ((((!((map__19495 == null)))?((((map__19495.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19495.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19495):map__19495);
var direction = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19495__$1,cljs.core.cst$kw$direction);
var step = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19495__$1,cljs.core.cst$kw$step);
var map__19496 = direction;
var map__19496__$1 = ((((!((map__19496 == null)))?((((map__19496.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19496.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19496):map__19496);
var heading = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19496__$1,cljs.core.cst$kw$heading);
var speed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19496__$1,cljs.core.cst$kw$speed);
var now = (offset + weathergen.model.falcon_time__GT_minutes(current));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.sorted_map_by(((function (map__19493,map__19493__$1,time,map__19494,map__19494__$1,offset,current,map__19495,map__19495__$1,direction,step,map__19496,map__19496__$1,heading,speed,now,vec__19490,x,y){
return (function (a,b){
return cljs.core.compare(weathergen.model.falcon_time__GT_minutes(a),weathergen.model.falcon_time__GT_minutes(b));
});})(map__19493,map__19493__$1,time,map__19494,map__19494__$1,offset,current,map__19495,map__19495__$1,direction,step,map__19496,map__19496__$1,heading,speed,now,vec__19490,x,y))
),(function (){var iter__7873__auto__ = ((function (map__19493,map__19493__$1,time,map__19494,map__19494__$1,offset,current,map__19495,map__19495__$1,direction,step,map__19496,map__19496__$1,heading,speed,now,vec__19490,x,y){
return (function weathergen$model$forecast_$_iter__19501(s__19502){
return (new cljs.core.LazySeq(null,((function (map__19493,map__19493__$1,time,map__19494,map__19494__$1,offset,current,map__19495,map__19495__$1,direction,step,map__19496,map__19496__$1,heading,speed,now,vec__19490,x,y){
return (function (){
var s__19502__$1 = s__19502;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__19502__$1);
if(temp__6363__auto__){
var s__19502__$2 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(s__19502__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__19502__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__19504 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__19503 = (0);
while(true){
if((i__19503 < size__7872__auto__)){
var n = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__19503);
var dt = (((-1) * step) * n);
var vec__19513 = weathergen.math.scale((((-1) * dt) * ((speed / (60)) / (9))),weathergen.math.rotate((- heading),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null)));
var dx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19513,(0),null);
var dy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19513,(1),null);
var dpos = vec__19513;
cljs.core.chunk_append(b__19504,(function (){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$current,current,cljs.core.cst$kw$offset,offset,cljs.core.cst$kw$now,now], 0));

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.model.add_time(current,(step * n)),weathergen.model.weather(cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(weather_params,cljs.core.cst$kw$x,x,cljs.core.array_seq([cljs.core.cst$kw$y,y,cljs.core.cst$kw$t,now], 0)),cljs.core.cst$kw$origin,weathergen.math.vector_add,dpos))], null);
})()
);

var G__19519 = (i__19503 + (1));
i__19503 = G__19519;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19504),weathergen$model$forecast_$_iter__19501(cljs.core.chunk_rest(s__19502__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19504),null);
}
} else {
var n = cljs.core.first(s__19502__$2);
var dt = (((-1) * step) * n);
var vec__19516 = weathergen.math.scale((((-1) * dt) * ((speed / (60)) / (9))),weathergen.math.rotate((- heading),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null)));
var dx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19516,(0),null);
var dy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19516,(1),null);
var dpos = vec__19516;
return cljs.core.cons((function (){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$current,current,cljs.core.cst$kw$offset,offset,cljs.core.cst$kw$now,now], 0));

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.model.add_time(current,(step * n)),weathergen.model.weather(cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(weather_params,cljs.core.cst$kw$x,x,cljs.core.array_seq([cljs.core.cst$kw$y,y,cljs.core.cst$kw$t,now], 0)),cljs.core.cst$kw$origin,weathergen.math.vector_add,dpos))], null);
})()
,weathergen$model$forecast_$_iter__19501(cljs.core.rest(s__19502__$2)));
}
} else {
return null;
}
break;
}
});})(map__19493,map__19493__$1,time,map__19494,map__19494__$1,offset,current,map__19495,map__19495__$1,direction,step,map__19496,map__19496__$1,heading,speed,now,vec__19490,x,y))
,null,null));
});})(map__19493,map__19493__$1,time,map__19494,map__19494__$1,offset,current,map__19495,map__19495__$1,direction,step,map__19496,map__19496__$1,heading,speed,now,vec__19490,x,y))
;
return iter__7873__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(steps));
})());
});
/**
 * Return a new weather params that has been moved to the specified
 *   time. Weather changes.
 */
weathergen.model.jump_to_time = (function weathergen$model$jump_to_time(weather_params,movement_params,t){
var map__19528 = movement_params;
var map__19528__$1 = ((((!((map__19528 == null)))?((((map__19528.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19528.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19528):map__19528);
var evolution = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19528__$1,cljs.core.cst$kw$evolution);
var direction = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19528__$1,cljs.core.cst$kw$direction);
var map__19529 = direction;
var map__19529__$1 = ((((!((map__19529 == null)))?((((map__19529.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19529.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19529):map__19529);
var speed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19529__$1,cljs.core.cst$kw$speed);
var heading = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19529__$1,cljs.core.cst$kw$heading);
var map__19530 = weather_params;
var map__19530__$1 = ((((!((map__19530 == null)))?((((map__19530.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19530.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19530):map__19530);
var time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19530__$1,cljs.core.cst$kw$time);
var map__19531 = time;
var map__19531__$1 = ((((!((map__19531 == null)))?((((map__19531.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19531.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19531):map__19531);
var current = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19531__$1,cljs.core.cst$kw$current);
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
