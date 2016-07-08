// Compiled by ClojureScript 1.9.76 {:static-fns true, :optimize-constants true}
goog.provide('weathergen.coordinates');
goog.require('cljs.core');
goog.require('weathergen.math');
goog.require('weathergen.database');
weathergen.coordinates.dm__GT_deg = (function weathergen$coordinates$dm__GT_deg(p__19161){
var vec__19165 = p__19161;
var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19165,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19165,(1),null);
return (d + (m / 60.0));
});
/**
 * Convert from degree/minute coordinates to grid coordinates
 */
weathergen.coordinates.lat_long__GT_grid = (function weathergen$coordinates$lat_long__GT_grid(p__19168,theater,p__19169){
var vec__19181 = p__19168;
var nx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19181,(0),null);
var ny = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19181,(1),null);
var vec__19184 = p__19169;
var lat = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19184,(0),null);
var long$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19184,(1),null);
var map__19187 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(weathergen.database.theater_info,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [theater,cljs.core.cst$kw$mapping], null));
var map__19187__$1 = ((((!((map__19187 == null)))?((((map__19187.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19187.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19187):map__19187);
var left = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19187__$1,cljs.core.cst$kw$left);
var top = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19187__$1,cljs.core.cst$kw$top);
var bottom = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19187__$1,cljs.core.cst$kw$bottom);
var top_right = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19187__$1,cljs.core.cst$kw$top_DASH_right);
var vec__19188 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(weathergen.coordinates.dm__GT_deg,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [left,top,bottom,top_right,lat,long$], null));
var left_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19188,(0),null);
var top_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19188,(1),null);
var bottom_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19188,(2),null);
var top_right_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19188,(3),null);
var lat_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19188,(4),null);
var long_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19188,(5),null);
var topr = weathergen.math.deg__GT_rad(top_STAR_);
var latr = weathergen.math.deg__GT_rad(lat_STAR_);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["a",cljs.core.cst$kw$topr,topr,cljs.core.cst$kw$latr,latr], 0));

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((((((long_STAR_ - left_STAR_) / (top_right_STAR_ - left_STAR_)) / Math.cos(topr)) * Math.cos(latr)) * nx) | (0)),((((lat_STAR_ - top_STAR_) / (bottom_STAR_ - top_STAR_)) * ny) | (0))], null);
});
/**
 * Returns the grid coordinates of an airbase
 */
weathergen.coordinates.airbase_coordinates = (function weathergen$coordinates$airbase_coordinates(p__19193,theater,airbase){
var vec__19202 = p__19193;
var nx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19202,(0),null);
var ny = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19202,(1),null);
var map__19205 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (vec__19202,nx,ny){
return (function (p1__19192_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(p1__19192_SHARP_),airbase);
});})(vec__19202,nx,ny))
,weathergen.database.airbases(theater)));
var map__19205__$1 = ((((!((map__19205 == null)))?((((map__19205.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19205.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19205):map__19205);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19205__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19205__$1,cljs.core.cst$kw$y);
if(cljs.core.truth_((function (){var and__7007__auto__ = x;
if(cljs.core.truth_(and__7007__auto__)){
return y;
} else {
return and__7007__auto__;
}
})())){
var vec__19207 = cljs.core.cst$kw$size.cljs$core$IFn$_invoke$arity$1((theater.cljs$core$IFn$_invoke$arity$1 ? theater.cljs$core$IFn$_invoke$arity$1(weathergen.database.theater_info) : theater.call(null,weathergen.database.theater_info)));
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19207,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19207,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(((x / width) * nx) | (0)),((ny - (1)) - (((y / height) * ny) | (0)))], null);
} else {
return null;
}
});
