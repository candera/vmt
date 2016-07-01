// Compiled by ClojureScript 1.9.76 {:static-fns true, :optimize-constants true}
goog.provide('weathergen.canvas');
goog.require('cljs.core');
/**
 * Create a new context object that knwos about things like grid
 *   coordinates
 */
weathergen.canvas.create_context = (function weathergen$canvas$create_context(canvas,cell_count,dimensions){
var vec__19075 = cell_count;
var x_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19075,(0),null);
var y_cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19075,(1),null);
var vec__19078 = dimensions;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19078,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19078,(1),null);
var cell_width = (w / x_cells);
var cell_height = (h / y_cells);
var ctx = canvas.getContext("2d");
ctx.setTransform((1),(0),(0),(1),(0),(0));

return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$context,ctx,cljs.core.cst$kw$cell_DASH_width,cell_width,cljs.core.cst$kw$cell_DASH_height,cell_height], null);
});
