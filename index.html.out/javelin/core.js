// Compiled by ClojureScript 1.9.76 {:static-fns true, :optimize-constants true}
goog.provide('javelin.core');
goog.require('cljs.core');
goog.require('tailrecursion.priority_map');




javelin.core._STAR_tx_STAR_ = null;
javelin.core.last_rank = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)) : cljs.core.atom.call(null,(0)));
/**
 * Like tree-seq but traversal is breadth-first instead of depth-first.
 */
javelin.core.bf_seq = (function javelin$core$bf_seq(branch_QMARK_,children,root){
var walk = (function javelin$core$bf_seq_$_walk(queue){
var temp__6363__auto__ = cljs.core.peek(queue);
if(cljs.core.truth_(temp__6363__auto__)){
var node = temp__6363__auto__;
return (new cljs.core.LazySeq(null,((function (node,temp__6363__auto__){
return (function (){
return cljs.core.cons(node,javelin$core$bf_seq_$_walk(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.pop(queue),(cljs.core.truth_((branch_QMARK_.cljs$core$IFn$_invoke$arity$1 ? branch_QMARK_.cljs$core$IFn$_invoke$arity$1(node) : branch_QMARK_.call(null,node)))?(children.cljs$core$IFn$_invoke$arity$1 ? children.cljs$core$IFn$_invoke$arity$1(node) : children.call(null,node)):null))));
});})(node,temp__6363__auto__))
,null,null));
} else {
return null;
}
});
return walk(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentQueue.EMPTY,root));
});
javelin.core.propagate_STAR_ = (function javelin$core$propagate_STAR_(pri_map){
while(true){
var temp__6363__auto__ = cljs.core.first(cljs.core.peek(pri_map));
if(cljs.core.truth_(temp__6363__auto__)){
var next = temp__6363__auto__;
var popq = cljs.core.pop(pri_map);
var old = next.prev;
var new$ = (function (){var temp__6361__auto__ = next.thunk;
if(cljs.core.truth_(temp__6361__auto__)){
var f = temp__6361__auto__;
return (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
} else {
return next.state;
}
})();
var diff_QMARK_ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new$,old);
if(diff_QMARK_){
next.prev = new$;

cljs.core._notify_watches(next,old,new$);
} else {
}

var G__13534 = ((!(diff_QMARK_))?popq:cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (pri_map,popq,old,new$,diff_QMARK_,next,temp__6363__auto__){
return (function (p1__13532_SHARP_,p2__13533_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__13532_SHARP_,p2__13533_SHARP_,p2__13533_SHARP_.rank);
});})(pri_map,popq,old,new$,diff_QMARK_,next,temp__6363__auto__))
,popq,next.sinks));
pri_map = G__13534;
continue;
} else {
return null;
}
break;
}
});
javelin.core.deref_STAR_ = (function javelin$core$deref_STAR_(x){
if(cljs.core.truth_((javelin.core.cell_QMARK_.cljs$core$IFn$_invoke$arity$1 ? javelin.core.cell_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : javelin.core.cell_QMARK_.call(null,x)))){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(x) : cljs.core.deref.call(null,x));
} else {
return x;
}
});
javelin.core.next_rank = (function javelin$core$next_rank(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(javelin.core.last_rank,cljs.core.inc);
});
javelin.core.cell__GT_pm = (function javelin$core$cell__GT_pm(c){
return tailrecursion.priority_map.priority_map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([c,c.rank], 0));
});
javelin.core.add_sync_BANG_ = (function javelin$core$add_sync_BANG_(c){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(javelin.core._STAR_tx_STAR_,cljs.core.assoc,c,c.rank);
});
javelin.core.safe_nth = (function javelin$core$safe_nth(c,i){
try{return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(c,i);
}catch (e13536){if((e13536 instanceof Error)){
var _ = e13536;
return null;
} else {
throw e13536;

}
}});
javelin.core.propagate_BANG_ = (function javelin$core$propagate_BANG_(c){
if(cljs.core.truth_(javelin.core._STAR_tx_STAR_)){
var G__13539 = c;
javelin.core.add_sync_BANG_(G__13539);

return G__13539;
} else {
var G__13540 = c;
javelin.core.propagate_STAR_(javelin.core.cell__GT_pm(G__13540));

return G__13540;
}
});
javelin.core.destroy_cell_BANG_ = (function javelin$core$destroy_cell_BANG_(var_args){
var args__8209__auto__ = [];
var len__8202__auto___13551 = arguments.length;
var i__8203__auto___13552 = (0);
while(true){
if((i__8203__auto___13552 < len__8202__auto___13551)){
args__8209__auto__.push((arguments[i__8203__auto___13552]));

var G__13553 = (i__8203__auto___13552 + (1));
i__8203__auto___13552 = G__13553;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((1) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((1)),(0),null)):null);
return javelin.core.destroy_cell_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__8210__auto__);
});

javelin.core.destroy_cell_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (this$,p__13543){
var vec__13544 = p__13543;
var keep_watches_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13544,(0),null);
var srcs = this$.sources;
this$.sources = cljs.core.PersistentVector.EMPTY;

this$.update = null;

this$.thunk = null;

if(cljs.core.truth_(keep_watches_QMARK_)){
} else {
this$.watches = cljs.core.PersistentArrayMap.EMPTY;
}

var seq__13547 = cljs.core.seq(srcs);
var chunk__13548 = null;
var count__13549 = (0);
var i__13550 = (0);
while(true){
if((i__13550 < count__13549)){
var src = chunk__13548.cljs$core$IIndexed$_nth$arity$2(null,i__13550);
if(cljs.core.truth_((javelin.core.cell_QMARK_.cljs$core$IFn$_invoke$arity$1 ? javelin.core.cell_QMARK_.cljs$core$IFn$_invoke$arity$1(src) : javelin.core.cell_QMARK_.call(null,src)))){
src.sinks = cljs.core.disj.cljs$core$IFn$_invoke$arity$2(src.sinks,this$);
} else {
}

var G__13554 = seq__13547;
var G__13555 = chunk__13548;
var G__13556 = count__13549;
var G__13557 = (i__13550 + (1));
seq__13547 = G__13554;
chunk__13548 = G__13555;
count__13549 = G__13556;
i__13550 = G__13557;
continue;
} else {
var temp__6363__auto__ = cljs.core.seq(seq__13547);
if(temp__6363__auto__){
var seq__13547__$1 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__13547__$1)){
var c__7922__auto__ = cljs.core.chunk_first(seq__13547__$1);
var G__13558 = cljs.core.chunk_rest(seq__13547__$1);
var G__13559 = c__7922__auto__;
var G__13560 = cljs.core.count(c__7922__auto__);
var G__13561 = (0);
seq__13547 = G__13558;
chunk__13548 = G__13559;
count__13549 = G__13560;
i__13550 = G__13561;
continue;
} else {
var src = cljs.core.first(seq__13547__$1);
if(cljs.core.truth_((javelin.core.cell_QMARK_.cljs$core$IFn$_invoke$arity$1 ? javelin.core.cell_QMARK_.cljs$core$IFn$_invoke$arity$1(src) : javelin.core.cell_QMARK_.call(null,src)))){
src.sinks = cljs.core.disj.cljs$core$IFn$_invoke$arity$2(src.sinks,this$);
} else {
}

var G__13562 = cljs.core.next(seq__13547__$1);
var G__13563 = null;
var G__13564 = (0);
var G__13565 = (0);
seq__13547 = G__13562;
chunk__13548 = G__13563;
count__13549 = G__13564;
i__13550 = G__13565;
continue;
}
} else {
return null;
}
}
break;
}
});

javelin.core.destroy_cell_BANG_.cljs$lang$maxFixedArity = (1);

javelin.core.destroy_cell_BANG_.cljs$lang$applyTo = (function (seq13541){
var G__13542 = cljs.core.first(seq13541);
var seq13541__$1 = cljs.core.next(seq13541);
return javelin.core.destroy_cell_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__13542,seq13541__$1);
});

javelin.core.set_formula_BANG_ = (function javelin$core$set_formula_BANG_(var_args){
var args__8209__auto__ = [];
var len__8202__auto___13586 = arguments.length;
var i__8203__auto___13587 = (0);
while(true){
if((i__8203__auto___13587 < len__8202__auto___13586)){
args__8209__auto__.push((arguments[i__8203__auto___13587]));

var G__13588 = (i__8203__auto___13587 + (1));
i__8203__auto___13587 = G__13588;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((1) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((1)),(0),null)):null);
return javelin.core.set_formula_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__8210__auto__);
});

javelin.core.set_formula_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (this$,p__13570){
var vec__13571 = p__13570;
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13571,(0),null);
var sources = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13571,(1),null);
javelin.core.destroy_cell_BANG_.cljs$core$IFn$_invoke$arity$variadic(this$,cljs.core.array_seq([true], 0));

if(cljs.core.truth_(f)){
this$.sources = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(sources),f);

var seq__13574_13589 = cljs.core.seq(this$.sources);
var chunk__13575_13590 = null;
var count__13576_13591 = (0);
var i__13577_13592 = (0);
while(true){
if((i__13577_13592 < count__13576_13591)){
var source_13593 = chunk__13575_13590.cljs$core$IIndexed$_nth$arity$2(null,i__13577_13592);
if(cljs.core.truth_((javelin.core.cell_QMARK_.cljs$core$IFn$_invoke$arity$1 ? javelin.core.cell_QMARK_.cljs$core$IFn$_invoke$arity$1(source_13593) : javelin.core.cell_QMARK_.call(null,source_13593)))){
source_13593.sinks = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(source_13593.sinks,this$);

if((source_13593.rank > this$.rank)){
var seq__13578_13594 = cljs.core.seq(javelin.core.bf_seq(cljs.core.identity,((function (seq__13574_13589,chunk__13575_13590,count__13576_13591,i__13577_13592,source_13593,vec__13571,f,sources){
return (function (p1__13566_SHARP_){
return p1__13566_SHARP_.sinks;
});})(seq__13574_13589,chunk__13575_13590,count__13576_13591,i__13577_13592,source_13593,vec__13571,f,sources))
,source_13593));
var chunk__13579_13595 = null;
var count__13580_13596 = (0);
var i__13581_13597 = (0);
while(true){
if((i__13581_13597 < count__13580_13596)){
var dep_13598 = chunk__13579_13595.cljs$core$IIndexed$_nth$arity$2(null,i__13581_13597);
dep_13598.rank = javelin.core.next_rank();

var G__13599 = seq__13578_13594;
var G__13600 = chunk__13579_13595;
var G__13601 = count__13580_13596;
var G__13602 = (i__13581_13597 + (1));
seq__13578_13594 = G__13599;
chunk__13579_13595 = G__13600;
count__13580_13596 = G__13601;
i__13581_13597 = G__13602;
continue;
} else {
var temp__6363__auto___13603 = cljs.core.seq(seq__13578_13594);
if(temp__6363__auto___13603){
var seq__13578_13604__$1 = temp__6363__auto___13603;
if(cljs.core.chunked_seq_QMARK_(seq__13578_13604__$1)){
var c__7922__auto___13605 = cljs.core.chunk_first(seq__13578_13604__$1);
var G__13606 = cljs.core.chunk_rest(seq__13578_13604__$1);
var G__13607 = c__7922__auto___13605;
var G__13608 = cljs.core.count(c__7922__auto___13605);
var G__13609 = (0);
seq__13578_13594 = G__13606;
chunk__13579_13595 = G__13607;
count__13580_13596 = G__13608;
i__13581_13597 = G__13609;
continue;
} else {
var dep_13610 = cljs.core.first(seq__13578_13604__$1);
dep_13610.rank = javelin.core.next_rank();

var G__13611 = cljs.core.next(seq__13578_13604__$1);
var G__13612 = null;
var G__13613 = (0);
var G__13614 = (0);
seq__13578_13594 = G__13611;
chunk__13579_13595 = G__13612;
count__13580_13596 = G__13613;
i__13581_13597 = G__13614;
continue;
}
} else {
}
}
break;
}
} else {
}
} else {
}

var G__13615 = seq__13574_13589;
var G__13616 = chunk__13575_13590;
var G__13617 = count__13576_13591;
var G__13618 = (i__13577_13592 + (1));
seq__13574_13589 = G__13615;
chunk__13575_13590 = G__13616;
count__13576_13591 = G__13617;
i__13577_13592 = G__13618;
continue;
} else {
var temp__6363__auto___13619 = cljs.core.seq(seq__13574_13589);
if(temp__6363__auto___13619){
var seq__13574_13620__$1 = temp__6363__auto___13619;
if(cljs.core.chunked_seq_QMARK_(seq__13574_13620__$1)){
var c__7922__auto___13621 = cljs.core.chunk_first(seq__13574_13620__$1);
var G__13622 = cljs.core.chunk_rest(seq__13574_13620__$1);
var G__13623 = c__7922__auto___13621;
var G__13624 = cljs.core.count(c__7922__auto___13621);
var G__13625 = (0);
seq__13574_13589 = G__13622;
chunk__13575_13590 = G__13623;
count__13576_13591 = G__13624;
i__13577_13592 = G__13625;
continue;
} else {
var source_13626 = cljs.core.first(seq__13574_13620__$1);
if(cljs.core.truth_((javelin.core.cell_QMARK_.cljs$core$IFn$_invoke$arity$1 ? javelin.core.cell_QMARK_.cljs$core$IFn$_invoke$arity$1(source_13626) : javelin.core.cell_QMARK_.call(null,source_13626)))){
source_13626.sinks = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(source_13626.sinks,this$);

if((source_13626.rank > this$.rank)){
var seq__13582_13627 = cljs.core.seq(javelin.core.bf_seq(cljs.core.identity,((function (seq__13574_13589,chunk__13575_13590,count__13576_13591,i__13577_13592,source_13626,seq__13574_13620__$1,temp__6363__auto___13619,vec__13571,f,sources){
return (function (p1__13566_SHARP_){
return p1__13566_SHARP_.sinks;
});})(seq__13574_13589,chunk__13575_13590,count__13576_13591,i__13577_13592,source_13626,seq__13574_13620__$1,temp__6363__auto___13619,vec__13571,f,sources))
,source_13626));
var chunk__13583_13628 = null;
var count__13584_13629 = (0);
var i__13585_13630 = (0);
while(true){
if((i__13585_13630 < count__13584_13629)){
var dep_13631 = chunk__13583_13628.cljs$core$IIndexed$_nth$arity$2(null,i__13585_13630);
dep_13631.rank = javelin.core.next_rank();

var G__13632 = seq__13582_13627;
var G__13633 = chunk__13583_13628;
var G__13634 = count__13584_13629;
var G__13635 = (i__13585_13630 + (1));
seq__13582_13627 = G__13632;
chunk__13583_13628 = G__13633;
count__13584_13629 = G__13634;
i__13585_13630 = G__13635;
continue;
} else {
var temp__6363__auto___13636__$1 = cljs.core.seq(seq__13582_13627);
if(temp__6363__auto___13636__$1){
var seq__13582_13637__$1 = temp__6363__auto___13636__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13582_13637__$1)){
var c__7922__auto___13638 = cljs.core.chunk_first(seq__13582_13637__$1);
var G__13639 = cljs.core.chunk_rest(seq__13582_13637__$1);
var G__13640 = c__7922__auto___13638;
var G__13641 = cljs.core.count(c__7922__auto___13638);
var G__13642 = (0);
seq__13582_13627 = G__13639;
chunk__13583_13628 = G__13640;
count__13584_13629 = G__13641;
i__13585_13630 = G__13642;
continue;
} else {
var dep_13643 = cljs.core.first(seq__13582_13637__$1);
dep_13643.rank = javelin.core.next_rank();

var G__13644 = cljs.core.next(seq__13582_13637__$1);
var G__13645 = null;
var G__13646 = (0);
var G__13647 = (0);
seq__13582_13627 = G__13644;
chunk__13583_13628 = G__13645;
count__13584_13629 = G__13646;
i__13585_13630 = G__13647;
continue;
}
} else {
}
}
break;
}
} else {
}
} else {
}

var G__13648 = cljs.core.next(seq__13574_13620__$1);
var G__13649 = null;
var G__13650 = (0);
var G__13651 = (0);
seq__13574_13589 = G__13648;
chunk__13575_13590 = G__13649;
count__13576_13591 = G__13650;
i__13577_13592 = G__13651;
continue;
}
} else {
}
}
break;
}

var compute_13652 = ((function (vec__13571,f,sources){
return (function (p1__13567_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(javelin.core.deref_STAR_(cljs.core.peek(p1__13567_SHARP_)),cljs.core.map.cljs$core$IFn$_invoke$arity$2(javelin.core.deref_STAR_,cljs.core.pop(p1__13567_SHARP_)));
});})(vec__13571,f,sources))
;
this$.thunk = ((function (compute_13652,vec__13571,f,sources){
return (function (){
return this$.state = compute_13652(this$.sources);
});})(compute_13652,vec__13571,f,sources))
;
} else {
}

return javelin.core.propagate_BANG_(this$);
});

javelin.core.set_formula_BANG_.cljs$lang$maxFixedArity = (1);

javelin.core.set_formula_BANG_.cljs$lang$applyTo = (function (seq13568){
var G__13569 = cljs.core.first(seq13568);
var seq13568__$1 = cljs.core.next(seq13568);
return javelin.core.set_formula_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__13569,seq13568__$1);
});


/**
* @constructor
 * @implements {cljs.core.IWatchable}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IWithMeta}
*/
javelin.core.Cell = (function (meta,state,rank,prev,sources,sinks,thunk,watches,update){
this.meta = meta;
this.state = state;
this.rank = rank;
this.prev = prev;
this.sources = sources;
this.sinks = sinks;
this.thunk = thunk;
this.watches = watches;
this.update = update;
this.cljs$lang$protocol_mask$partition0$ = 2147909632;
this.cljs$lang$protocol_mask$partition1$ = 98306;
})
javelin.core.Cell.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,w,_){
var self__ = this;
var this$__$1 = this;
return cljs.core.write_all.cljs$core$IFn$_invoke$arity$variadic(w,cljs.core.array_seq(["#<Cell: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([self__.state], 0)),">"], 0));
});

javelin.core.Cell.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this$,meta__$1){
var self__ = this;
var this$__$1 = this;
return (new javelin.core.Cell(meta__$1,self__.state,self__.rank,self__.prev,self__.sources,self__.sinks,self__.thunk,self__.watches,self__.update));
});

javelin.core.Cell.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.meta;
});

javelin.core.Cell.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return this$__$1.state;
});

javelin.core.Cell.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_((javelin.core.lens_QMARK_.cljs$core$IFn$_invoke$arity$1 ? javelin.core.lens_QMARK_.cljs$core$IFn$_invoke$arity$1(this$__$1) : javelin.core.lens_QMARK_.call(null,this$__$1)))){
this$__$1.update.call(null,x);
} else {
if(cljs.core.truth_((javelin.core.input_QMARK_.cljs$core$IFn$_invoke$arity$1 ? javelin.core.input_QMARK_.cljs$core$IFn$_invoke$arity$1(this$__$1) : javelin.core.input_QMARK_.call(null,this$__$1)))){
this$__$1.state = x;

javelin.core.propagate_BANG_(this$__$1);
} else {
throw (new Error("can't swap! or reset! formula cell"));

}
}

return this$__$1.state;
});

javelin.core.Cell.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (this$,f){
var self__ = this;
var this$__$1 = this;
var G__13654 = this$__$1;
var G__13655 = (function (){var G__13656 = this$__$1.state;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__13656) : f.call(null,G__13656));
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__13654,G__13655) : cljs.core.reset_BANG_.call(null,G__13654,G__13655));
});

javelin.core.Cell.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (this$,f,a){
var self__ = this;
var this$__$1 = this;
var G__13659 = this$__$1;
var G__13660 = (function (){var G__13661 = this$__$1.state;
var G__13662 = a;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__13661,G__13662) : f.call(null,G__13661,G__13662));
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__13659,G__13660) : cljs.core.reset_BANG_.call(null,G__13659,G__13660));
});

javelin.core.Cell.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (this$,f,a,b){
var self__ = this;
var this$__$1 = this;
var G__13666 = this$__$1;
var G__13667 = (function (){var G__13668 = this$__$1.state;
var G__13669 = a;
var G__13670 = b;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__13668,G__13669,G__13670) : f.call(null,G__13668,G__13669,G__13670));
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__13666,G__13667) : cljs.core.reset_BANG_.call(null,G__13666,G__13667));
});

javelin.core.Cell.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (this$,f,a,b,xs){
var self__ = this;
var this$__$1 = this;
var G__13671 = this$__$1;
var G__13672 = cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,this$__$1.state,a,b,xs);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__13671,G__13672) : cljs.core.reset_BANG_.call(null,G__13671,G__13672));
});

javelin.core.Cell.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,o,n){
var self__ = this;
var this$__$1 = this;
var seq__13673 = cljs.core.seq(self__.watches);
var chunk__13674 = null;
var count__13675 = (0);
var i__13676 = (0);
while(true){
if((i__13676 < count__13675)){
var vec__13677 = chunk__13674.cljs$core$IIndexed$_nth$arity$2(null,i__13676);
var key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13677,(0),null);
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13677,(1),null);
(f.cljs$core$IFn$_invoke$arity$4 ? f.cljs$core$IFn$_invoke$arity$4(key,this$__$1,o,n) : f.call(null,key,this$__$1,o,n));

var G__13683 = seq__13673;
var G__13684 = chunk__13674;
var G__13685 = count__13675;
var G__13686 = (i__13676 + (1));
seq__13673 = G__13683;
chunk__13674 = G__13684;
count__13675 = G__13685;
i__13676 = G__13686;
continue;
} else {
var temp__6363__auto__ = cljs.core.seq(seq__13673);
if(temp__6363__auto__){
var seq__13673__$1 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__13673__$1)){
var c__7922__auto__ = cljs.core.chunk_first(seq__13673__$1);
var G__13687 = cljs.core.chunk_rest(seq__13673__$1);
var G__13688 = c__7922__auto__;
var G__13689 = cljs.core.count(c__7922__auto__);
var G__13690 = (0);
seq__13673 = G__13687;
chunk__13674 = G__13688;
count__13675 = G__13689;
i__13676 = G__13690;
continue;
} else {
var vec__13680 = cljs.core.first(seq__13673__$1);
var key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13680,(0),null);
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13680,(1),null);
(f.cljs$core$IFn$_invoke$arity$4 ? f.cljs$core$IFn$_invoke$arity$4(key,this$__$1,o,n) : f.call(null,key,this$__$1,o,n));

var G__13691 = cljs.core.next(seq__13673__$1);
var G__13692 = null;
var G__13693 = (0);
var G__13694 = (0);
seq__13673 = G__13691;
chunk__13674 = G__13692;
count__13675 = G__13693;
i__13676 = G__13694;
continue;
}
} else {
return null;
}
}
break;
}
});

javelin.core.Cell.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,k,f){
var self__ = this;
var this$__$1 = this;
return this$__$1.watches = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.watches,k,f);
});

javelin.core.Cell.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,k){
var self__ = this;
var this$__$1 = this;
return this$__$1.watches = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.watches,k);
});

javelin.core.Cell.getBasis = (function (){
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$meta,cljs.core.cst$sym$state,cljs.core.cst$sym$rank,cljs.core.cst$sym$prev,cljs.core.cst$sym$sources,cljs.core.cst$sym$sinks,cljs.core.cst$sym$thunk,cljs.core.cst$sym$watches,cljs.core.cst$sym$update], null);
});

javelin.core.Cell.cljs$lang$type = true;

javelin.core.Cell.cljs$lang$ctorStr = "javelin.core/Cell";

javelin.core.Cell.cljs$lang$ctorPrWriter = (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"javelin.core/Cell");
});

javelin.core.__GT_Cell = (function javelin$core$__GT_Cell(meta,state,rank,prev,sources,sinks,thunk,watches,update){
return (new javelin.core.Cell(meta,state,rank,prev,sources,sinks,thunk,watches,update));
});

javelin.core.cell_QMARK_ = (function javelin$core$cell_QMARK_(c){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.type(c),javelin.core.Cell)){
return c;
} else {
return null;
}
});
javelin.core.formula_QMARK_ = (function javelin$core$formula_QMARK_(c){
if(cljs.core.truth_((function (){var and__7007__auto__ = javelin.core.cell_QMARK_(c);
if(cljs.core.truth_(and__7007__auto__)){
return c.thunk;
} else {
return and__7007__auto__;
}
})())){
return c;
} else {
return null;
}
});
javelin.core.lens_QMARK_ = (function javelin$core$lens_QMARK_(c){
if(cljs.core.truth_((function (){var and__7007__auto__ = javelin.core.cell_QMARK_(c);
if(cljs.core.truth_(and__7007__auto__)){
return c.update;
} else {
return and__7007__auto__;
}
})())){
return c;
} else {
return null;
}
});
javelin.core.input_QMARK_ = (function javelin$core$input_QMARK_(c){
if(cljs.core.truth_((function (){var and__7007__auto__ = javelin.core.cell_QMARK_(c);
if(cljs.core.truth_(and__7007__auto__)){
return cljs.core.not(javelin.core.formula_QMARK_(c));
} else {
return and__7007__auto__;
}
})())){
return c;
} else {
return null;
}
});
javelin.core.set_cell_BANG_ = (function javelin$core$set_cell_BANG_(c,x){
c.state = x;

return javelin.core.set_formula_BANG_(c);
});
javelin.core.formula = (function javelin$core$formula(f){
return (function() { 
var G__13695__delegate = function (sources){
return javelin.core.set_formula_BANG_.cljs$core$IFn$_invoke$arity$variadic((javelin.core.cell.cljs$core$IFn$_invoke$arity$1 ? javelin.core.cell.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$javelin$core_SLASH_none) : javelin.core.cell.call(null,cljs.core.cst$kw$javelin$core_SLASH_none)),cljs.core.array_seq([f,sources], 0));
};
var G__13695 = function (var_args){
var sources = null;
if (arguments.length > 0) {
var G__13696__i = 0, G__13696__a = new Array(arguments.length -  0);
while (G__13696__i < G__13696__a.length) {G__13696__a[G__13696__i] = arguments[G__13696__i + 0]; ++G__13696__i;}
  sources = new cljs.core.IndexedSeq(G__13696__a,0);
} 
return G__13695__delegate.call(this,sources);};
G__13695.cljs$lang$maxFixedArity = 0;
G__13695.cljs$lang$applyTo = (function (arglist__13697){
var sources = cljs.core.seq(arglist__13697);
return G__13695__delegate(sources);
});
G__13695.cljs$core$IFn$_invoke$arity$variadic = G__13695__delegate;
return G__13695;
})()
;
});
javelin.core.lens = (function javelin$core$lens(c,f){
var c__$1 = javelin.core.formula(cljs.core.identity).call(null,c);
c__$1.update = f;

return c__$1;
});
javelin.core.cell = (function javelin$core$cell(var_args){
var args13698 = [];
var len__8202__auto___13706 = arguments.length;
var i__8203__auto___13707 = (0);
while(true){
if((i__8203__auto___13707 < len__8202__auto___13706)){
args13698.push((arguments[i__8203__auto___13707]));

var G__13708 = (i__8203__auto___13707 + (1));
i__8203__auto___13707 = G__13708;
continue;
} else {
}
break;
}

var G__13702 = args13698.length;
switch (G__13702) {
case 1:
return javelin.core.cell.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
var argseq__8225__auto__ = (new cljs.core.IndexedSeq(args13698.slice((1)),(0),null));
return javelin.core.cell.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__8225__auto__);

}
});

javelin.core.cell.cljs$core$IFn$_invoke$arity$1 = (function (x){
return javelin.core.set_formula_BANG_((new javelin.core.Cell(null,x,javelin.core.next_rank(),x,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentHashSet.EMPTY,null,cljs.core.PersistentArrayMap.EMPTY,null)));
});

javelin.core.cell.cljs$core$IFn$_invoke$arity$variadic = (function (x,p__13703){
var map__13704 = p__13703;
var map__13704__$1 = ((((!((map__13704 == null)))?((((map__13704.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13704.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13704):map__13704);
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13704__$1,cljs.core.cst$kw$meta);
return javelin.core.set_formula_BANG_((new javelin.core.Cell(meta,x,javelin.core.next_rank(),x,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentHashSet.EMPTY,null,cljs.core.PersistentArrayMap.EMPTY,null)));
});

javelin.core.cell.cljs$lang$applyTo = (function (seq13699){
var G__13700 = cljs.core.first(seq13699);
var seq13699__$1 = cljs.core.next(seq13699);
return javelin.core.cell.cljs$core$IFn$_invoke$arity$variadic(G__13700,seq13699__$1);
});

javelin.core.cell.cljs$lang$maxFixedArity = (1);

javelin.core.lift = javelin.core.formula;
javelin.core.dosync_STAR_ = (function javelin$core$dosync_STAR_(thunk){
var bind = (function (p1__13710_SHARP_){
var _STAR_tx_STAR_13714 = javelin.core._STAR_tx_STAR_;
javelin.core._STAR_tx_STAR_ = (function (){var G__13715 = tailrecursion.priority_map.priority_map();
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13715) : cljs.core.atom.call(null,G__13715));
})();

try{return (p1__13710_SHARP_.cljs$core$IFn$_invoke$arity$0 ? p1__13710_SHARP_.cljs$core$IFn$_invoke$arity$0() : p1__13710_SHARP_.call(null));
}finally {javelin.core._STAR_tx_STAR_ = _STAR_tx_STAR_13714;
}});
var prop = ((function (bind){
return (function (){
var tx = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(javelin.core._STAR_tx_STAR_) : cljs.core.deref.call(null,javelin.core._STAR_tx_STAR_));
var _STAR_tx_STAR_13716 = javelin.core._STAR_tx_STAR_;
javelin.core._STAR_tx_STAR_ = null;

try{return javelin.core.propagate_STAR_(tx);
}finally {javelin.core._STAR_tx_STAR_ = _STAR_tx_STAR_13716;
}});})(bind))
;
if(cljs.core.truth_(javelin.core._STAR_tx_STAR_)){
return (thunk.cljs$core$IFn$_invoke$arity$0 ? thunk.cljs$core$IFn$_invoke$arity$0() : thunk.call(null));
} else {
return bind(((function (bind,prop){
return (function (){
(thunk.cljs$core$IFn$_invoke$arity$0 ? thunk.cljs$core$IFn$_invoke$arity$0() : thunk.call(null));

return prop();
});})(bind,prop))
);
}
});
javelin.core.alts_BANG_ = (function javelin$core$alts_BANG_(var_args){
var args__8209__auto__ = [];
var len__8202__auto___13724 = arguments.length;
var i__8203__auto___13725 = (0);
while(true){
if((i__8203__auto___13725 < len__8202__auto___13724)){
args__8209__auto__.push((arguments[i__8203__auto___13725]));

var G__13726 = (i__8203__auto___13725 + (1));
i__8203__auto___13725 = G__13726;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((0) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((0)),(0),null)):null);
return javelin.core.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(argseq__8210__auto__);
});

javelin.core.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (cells){
var olds = (function (){var G__13723 = cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cells),cljs.core.cst$kw$javelin$core_SLASH_none);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13723) : cljs.core.atom.call(null,G__13723));
})();
var tag_neq = ((function (olds){
return (function (p1__13717_SHARP_,p2__13718_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(p1__13717_SHARP_,p2__13718_SHARP_),p2__13718_SHARP_],null));
});})(olds))
;
var diff = ((function (olds,tag_neq){
return (function (p1__13720_SHARP_,p2__13719_SHARP_){
return cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.map.cljs$core$IFn$_invoke$arity$3(tag_neq,p1__13720_SHARP_,p2__13719_SHARP_))));
});})(olds,tag_neq))
;
var proc = ((function (olds,tag_neq,diff){
return (function() { 
var G__13727__delegate = function (rest__13721_SHARP_){
var news = diff((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(olds) : cljs.core.deref.call(null,olds)),rest__13721_SHARP_);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(olds,rest__13721_SHARP_) : cljs.core.reset_BANG_.call(null,olds,rest__13721_SHARP_));

return news;
};
var G__13727 = function (var_args){
var rest__13721_SHARP_ = null;
if (arguments.length > 0) {
var G__13728__i = 0, G__13728__a = new Array(arguments.length -  0);
while (G__13728__i < G__13728__a.length) {G__13728__a[G__13728__i] = arguments[G__13728__i + 0]; ++G__13728__i;}
  rest__13721_SHARP_ = new cljs.core.IndexedSeq(G__13728__a,0);
} 
return G__13727__delegate.call(this,rest__13721_SHARP_);};
G__13727.cljs$lang$maxFixedArity = 0;
G__13727.cljs$lang$applyTo = (function (arglist__13729){
var rest__13721_SHARP_ = cljs.core.seq(arglist__13729);
return G__13727__delegate(rest__13721_SHARP_);
});
G__13727.cljs$core$IFn$_invoke$arity$variadic = G__13727__delegate;
return G__13727;
})()
;})(olds,tag_neq,diff))
;
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(javelin.core.formula(proc),cells);
});

javelin.core.alts_BANG_.cljs$lang$maxFixedArity = (0);

javelin.core.alts_BANG_.cljs$lang$applyTo = (function (seq13722){
return javelin.core.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13722));
});

javelin.core.cell_map = (function javelin$core$cell_map(f,c){
var cseq = javelin.core.formula(cljs.core.seq).call(null,c);
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (cseq){
return (function (p1__13730_SHARP_){
return javelin.core.formula(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(f,javelin.core.safe_nth)).call(null,cseq,p1__13730_SHARP_);
});})(cseq))
,cljs.core.range.cljs$core$IFn$_invoke$arity$2((0),cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cseq) : cljs.core.deref.call(null,cseq)))));
});
javelin.core.cell_doseq_STAR_ = (function javelin$core$cell_doseq_STAR_(items_seq,f){
var pool_size = javelin.core.cell.cljs$core$IFn$_invoke$arity$1((0));
var cur_count = javelin.core.formula(cljs.core.count).call(null,items_seq);
var ith_item = ((function (pool_size,cur_count){
return (function (p1__13731_SHARP_){
return javelin.core.formula(javelin.core.safe_nth).call(null,items_seq,p1__13731_SHARP_);
});})(pool_size,cur_count))
;
return javelin.core.formula(((function (pool_size,cur_count,ith_item){
return (function (pool_size__$1,cur_count__$1,f__$1,ith_item__$1,reset_pool_size_BANG_){
if((pool_size__$1 < cur_count__$1)){
var seq__13738_13744 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$2(pool_size__$1,cur_count__$1));
var chunk__13739_13745 = null;
var count__13740_13746 = (0);
var i__13741_13747 = (0);
while(true){
if((i__13741_13747 < count__13740_13746)){
var i_13748 = chunk__13739_13745.cljs$core$IIndexed$_nth$arity$2(null,i__13741_13747);
var G__13742_13749 = (ith_item__$1.cljs$core$IFn$_invoke$arity$1 ? ith_item__$1.cljs$core$IFn$_invoke$arity$1(i_13748) : ith_item__$1.call(null,i_13748));
(f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(G__13742_13749) : f__$1.call(null,G__13742_13749));

var G__13750 = seq__13738_13744;
var G__13751 = chunk__13739_13745;
var G__13752 = count__13740_13746;
var G__13753 = (i__13741_13747 + (1));
seq__13738_13744 = G__13750;
chunk__13739_13745 = G__13751;
count__13740_13746 = G__13752;
i__13741_13747 = G__13753;
continue;
} else {
var temp__6363__auto___13754 = cljs.core.seq(seq__13738_13744);
if(temp__6363__auto___13754){
var seq__13738_13755__$1 = temp__6363__auto___13754;
if(cljs.core.chunked_seq_QMARK_(seq__13738_13755__$1)){
var c__7922__auto___13756 = cljs.core.chunk_first(seq__13738_13755__$1);
var G__13757 = cljs.core.chunk_rest(seq__13738_13755__$1);
var G__13758 = c__7922__auto___13756;
var G__13759 = cljs.core.count(c__7922__auto___13756);
var G__13760 = (0);
seq__13738_13744 = G__13757;
chunk__13739_13745 = G__13758;
count__13740_13746 = G__13759;
i__13741_13747 = G__13760;
continue;
} else {
var i_13761 = cljs.core.first(seq__13738_13755__$1);
var G__13743_13762 = (ith_item__$1.cljs$core$IFn$_invoke$arity$1 ? ith_item__$1.cljs$core$IFn$_invoke$arity$1(i_13761) : ith_item__$1.call(null,i_13761));
(f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(G__13743_13762) : f__$1.call(null,G__13743_13762));

var G__13763 = cljs.core.next(seq__13738_13755__$1);
var G__13764 = null;
var G__13765 = (0);
var G__13766 = (0);
seq__13738_13744 = G__13763;
chunk__13739_13745 = G__13764;
count__13740_13746 = G__13765;
i__13741_13747 = G__13766;
continue;
}
} else {
}
}
break;
}

return (reset_pool_size_BANG_.cljs$core$IFn$_invoke$arity$1 ? reset_pool_size_BANG_.cljs$core$IFn$_invoke$arity$1(cur_count__$1) : reset_pool_size_BANG_.call(null,cur_count__$1));
} else {
return null;
}
});})(pool_size,cur_count,ith_item))
).call(null,pool_size,cur_count,f,ith_item,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.reset_BANG_,pool_size));
});
