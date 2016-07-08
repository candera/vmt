// Compiled by ClojureScript 1.9.76 {:static-fns true, :optimize-constants true}
goog.provide('weathergen.database');
goog.require('cljs.core');
goog.require('weathergen.database.balkans');
goog.require('weathergen.database.israel');
goog.require('weathergen.database.korea');
weathergen.database.theater_info = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$korea,weathergen.database.korea.theater_info,cljs.core.cst$kw$balkans,weathergen.database.balkans.theater_info,cljs.core.cst$kw$israel,weathergen.database.israel.theater_info], null);
/**
 * Return all the airbase and airstrips in the specified theater
 */
weathergen.database.airbases = (function weathergen$database$airbases(theater){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__19077_SHARP_){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["Airstrip",null,"Airbase",null], null), null).call(null,cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(p1__19077_SHARP_));
}),cljs.core.cst$kw$objectives.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$3(weathergen.database.theater_info,theater,cljs.core.PersistentArrayMap.EMPTY)));
});
