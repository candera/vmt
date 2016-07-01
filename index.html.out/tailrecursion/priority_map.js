// Compiled by ClojureScript 1.9.76 {:static-fns true, :optimize-constants true}
goog.provide('tailrecursion.priority_map');
goog.require('cljs.core');
goog.require('cljs.core');
goog.require('cljs.reader');

/**
* @constructor
 * @implements {cljs.core.IReversible}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.IEmptyableCollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISorted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IStack}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
tailrecursion.priority_map.PersistentPriorityMap = (function (priority__GT_set_of_items,item__GT_priority,meta,__hash){
this.priority__GT_set_of_items = priority__GT_set_of_items;
this.item__GT_priority = item__GT_priority;
this.meta = meta;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2565220111;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this$,item){
var self__ = this;
var this$__$1 = this;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,item,not_found){
var self__ = this;
var coll__$1 = this;
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,not_found);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var self__ = this;
var coll__$1 = this;
var pr_pair = ((function (coll__$1){
return (function (keyval){
return cljs.core.pr_sequential_writer(writer,cljs.core.pr_writer,""," ","",opts,keyval);
});})(coll__$1))
;
return cljs.core.pr_sequential_writer(writer,pr_pair,"#tailrecursion.priority-map {",", ","}",opts,coll__$1);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.meta;
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.count(self__.item__GT_priority);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IStack$_peek$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if((cljs.core.count(self__.item__GT_priority) === (0))){
return null;
} else {
var f = cljs.core.first(self__.priority__GT_set_of_items);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(cljs.core.val(f)),cljs.core.key(f)], null);
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IStack$_pop$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if((cljs.core.count(self__.item__GT_priority) === (0))){
throw (new Error("Can't pop empty priority map"));
} else {
var f = cljs.core.first(self__.priority__GT_set_of_items);
var item_set = cljs.core.val(f);
var item = cljs.core.first(item_set);
var priority = cljs.core.key(f);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(item_set),(1))){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,priority),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item),self__.meta,null));
} else {
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority,cljs.core.disj.cljs$core$IFn$_invoke$arity$2(item_set,item)),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item),self__.meta,null));
}
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
return cljs.core.seq((function (){var iter__7873__auto__ = ((function (coll__$1){
return (function tailrecursion$priority_map$iter__13113(s__13114){
return (new cljs.core.LazySeq(null,((function (coll__$1){
return (function (){
var s__13114__$1 = s__13114;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__13114__$1);
if(temp__6363__auto__){
var xs__6915__auto__ = temp__6363__auto__;
var vec__13125 = cljs.core.first(xs__6915__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13125,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13125,(1),null);
var iterys__7869__auto__ = ((function (s__13114__$1,vec__13125,priority,item_set,xs__6915__auto__,temp__6363__auto__,coll__$1){
return (function tailrecursion$priority_map$iter__13113_$_iter__13115(s__13116){
return (new cljs.core.LazySeq(null,((function (s__13114__$1,vec__13125,priority,item_set,xs__6915__auto__,temp__6363__auto__,coll__$1){
return (function (){
var s__13116__$1 = s__13116;
while(true){
var temp__6363__auto____$1 = cljs.core.seq(s__13116__$1);
if(temp__6363__auto____$1){
var s__13116__$2 = temp__6363__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__13116__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__13116__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__13118 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__13117 = (0);
while(true){
if((i__13117 < size__7872__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__13117);
cljs.core.chunk_append(b__13118,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null));

var G__13164 = (i__13117 + (1));
i__13117 = G__13164;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13118),tailrecursion$priority_map$iter__13113_$_iter__13115(cljs.core.chunk_rest(s__13116__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13118),null);
}
} else {
var item = cljs.core.first(s__13116__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null),tailrecursion$priority_map$iter__13113_$_iter__13115(cljs.core.rest(s__13116__$2)));
}
} else {
return null;
}
break;
}
});})(s__13114__$1,vec__13125,priority,item_set,xs__6915__auto__,temp__6363__auto__,coll__$1))
,null,null));
});})(s__13114__$1,vec__13125,priority,item_set,xs__6915__auto__,temp__6363__auto__,coll__$1))
;
var fs__7870__auto__ = cljs.core.seq(iterys__7869__auto__(item_set));
if(fs__7870__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__7870__auto__,tailrecursion$priority_map$iter__13113(cljs.core.rest(s__13114__$1)));
} else {
var G__13165 = cljs.core.rest(s__13114__$1);
s__13114__$1 = G__13165;
continue;
}
} else {
return null;
}
break;
}
});})(coll__$1))
,null,null));
});})(coll__$1))
;
return iter__7873__auto__(cljs.core.rseq(self__.priority__GT_set_of_items));
})());
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var h__7456__auto__ = self__.__hash;
if(!((h__7456__auto__ == null))){
return h__7456__auto__;
} else {
var h__7456__auto____$1 = cljs.core.hash_imap(this$__$1);
self__.__hash = h__7456__auto____$1;

return h__7456__auto____$1;
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var self__ = this;
var this$__$1 = this;
return cljs.core._equiv(self__.item__GT_priority,other);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.with_meta(tailrecursion.priority_map.PersistentPriorityMap.EMPTY,self__.meta);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this$,item){
var self__ = this;
var this$__$1 = this;
var priority = (self__.item__GT_priority.cljs$core$IFn$_invoke$arity$2 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$2(item,cljs.core.cst$kw$tailrecursion$priority_DASH_map_SLASH_not_DASH_found) : self__.item__GT_priority.call(null,item,cljs.core.cst$kw$tailrecursion$priority_DASH_map_SLASH_not_DASH_found));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(priority,cljs.core.cst$kw$tailrecursion$priority_DASH_map_SLASH_not_DASH_found)){
return this$__$1;
} else {
var item_set = (self__.priority__GT_set_of_items.cljs$core$IFn$_invoke$arity$1 ? self__.priority__GT_set_of_items.cljs$core$IFn$_invoke$arity$1(priority) : self__.priority__GT_set_of_items.call(null,priority));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(item_set),(1))){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,priority),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item),self__.meta,null));
} else {
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority,cljs.core.disj.cljs$core$IFn$_invoke$arity$2(item_set,item)),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item),self__.meta,null));
}
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this$,item,priority){
var self__ = this;
var this$__$1 = this;
var temp__6361__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,null);
if(cljs.core.truth_(temp__6361__auto__)){
var current_priority = temp__6361__auto__;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_priority,priority)){
return this$__$1;
} else {
var item_set = cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,current_priority);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(item_set),(1))){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,current_priority),priority,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority,cljs.core.PersistentHashSet.EMPTY),item)),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,priority),self__.meta,null));
} else {
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(self__.priority__GT_set_of_items,current_priority,cljs.core.disj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,current_priority),item),cljs.core.array_seq([priority,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority,cljs.core.PersistentHashSet.EMPTY),item)], 0)),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,priority),self__.meta,null));
}
}
} else {
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority,cljs.core.PersistentHashSet.EMPTY),item)),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,priority),self__.meta,null));
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this$,item){
var self__ = this;
var this$__$1 = this;
return cljs.core.contains_QMARK_(self__.item__GT_priority,item);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.seq((function (){var iter__7873__auto__ = ((function (this$__$1){
return (function tailrecursion$priority_map$iter__13130(s__13131){
return (new cljs.core.LazySeq(null,((function (this$__$1){
return (function (){
var s__13131__$1 = s__13131;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__13131__$1);
if(temp__6363__auto__){
var xs__6915__auto__ = temp__6363__auto__;
var vec__13142 = cljs.core.first(xs__6915__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13142,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13142,(1),null);
var iterys__7869__auto__ = ((function (s__13131__$1,vec__13142,priority,item_set,xs__6915__auto__,temp__6363__auto__,this$__$1){
return (function tailrecursion$priority_map$iter__13130_$_iter__13132(s__13133){
return (new cljs.core.LazySeq(null,((function (s__13131__$1,vec__13142,priority,item_set,xs__6915__auto__,temp__6363__auto__,this$__$1){
return (function (){
var s__13133__$1 = s__13133;
while(true){
var temp__6363__auto____$1 = cljs.core.seq(s__13133__$1);
if(temp__6363__auto____$1){
var s__13133__$2 = temp__6363__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__13133__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__13133__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__13135 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__13134 = (0);
while(true){
if((i__13134 < size__7872__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__13134);
cljs.core.chunk_append(b__13135,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null));

var G__13166 = (i__13134 + (1));
i__13134 = G__13166;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13135),tailrecursion$priority_map$iter__13130_$_iter__13132(cljs.core.chunk_rest(s__13133__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13135),null);
}
} else {
var item = cljs.core.first(s__13133__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null),tailrecursion$priority_map$iter__13130_$_iter__13132(cljs.core.rest(s__13133__$2)));
}
} else {
return null;
}
break;
}
});})(s__13131__$1,vec__13142,priority,item_set,xs__6915__auto__,temp__6363__auto__,this$__$1))
,null,null));
});})(s__13131__$1,vec__13142,priority,item_set,xs__6915__auto__,temp__6363__auto__,this$__$1))
;
var fs__7870__auto__ = cljs.core.seq(iterys__7869__auto__(item_set));
if(fs__7870__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__7870__auto__,tailrecursion$priority_map$iter__13130(cljs.core.rest(s__13131__$1)));
} else {
var G__13167 = cljs.core.rest(s__13131__$1);
s__13131__$1 = G__13167;
continue;
}
} else {
return null;
}
break;
}
});})(this$__$1))
,null,null));
});})(this$__$1))
;
return iter__7873__auto__(self__.priority__GT_set_of_items);
})());
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this$,meta__$1){
var self__ = this;
var this$__$1 = this;
return (new tailrecursion.priority_map.PersistentPriorityMap(self__.priority__GT_set_of_items,self__.item__GT_priority,meta__$1,self__.__hash));
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this$,entry){
var self__ = this;
var this$__$1 = this;
if(cljs.core.vector_QMARK_(entry)){
return cljs.core._assoc(this$__$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this$__$1,entry);
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.call = (function() {
var G__13168 = null;
var G__13168__2 = (function (self__,item){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
return this$.cljs$core$ILookup$_lookup$arity$2(null,item);
});
var G__13168__3 = (function (self__,item,not_found){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
return this$.cljs$core$ILookup$_lookup$arity$3(null,item,not_found);
});
G__13168 = function(self__,item,not_found){
switch(arguments.length){
case 2:
return G__13168__2.call(this,self__,item);
case 3:
return G__13168__3.call(this,self__,item,not_found);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__13168.cljs$core$IFn$_invoke$arity$2 = G__13168__2;
G__13168.cljs$core$IFn$_invoke$arity$3 = G__13168__3;
return G__13168;
})()
;

tailrecursion.priority_map.PersistentPriorityMap.prototype.apply = (function (self__,args13112){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone(args13112)));
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IFn$_invoke$arity$1 = (function (item){
var self__ = this;
var this$ = this;
return this$.cljs$core$ILookup$_lookup$arity$2(null,item);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IFn$_invoke$arity$2 = (function (item,not_found){
var self__ = this;
var this$ = this;
return this$.cljs$core$ILookup$_lookup$arity$3(null,item,not_found);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = (function (this$,ascending_QMARK_){
var self__ = this;
var this$__$1 = this;
return (cljs.core.truth_(ascending_QMARK_)?cljs.core.seq:cljs.core.rseq).call(null,this$__$1);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = (function (this$,k,ascending_QMARK_){
var self__ = this;
var this$__$1 = this;
var sets = (cljs.core.truth_(ascending_QMARK_)?cljs.core.subseq.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,cljs.core._GT__EQ_,k):cljs.core.rsubseq.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,cljs.core._LT__EQ_,k));
return cljs.core.seq((function (){var iter__7873__auto__ = ((function (sets,this$__$1){
return (function tailrecursion$priority_map$iter__13147(s__13148){
return (new cljs.core.LazySeq(null,((function (sets,this$__$1){
return (function (){
var s__13148__$1 = s__13148;
while(true){
var temp__6363__auto__ = cljs.core.seq(s__13148__$1);
if(temp__6363__auto__){
var xs__6915__auto__ = temp__6363__auto__;
var vec__13159 = cljs.core.first(xs__6915__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13159,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13159,(1),null);
var iterys__7869__auto__ = ((function (s__13148__$1,vec__13159,priority,item_set,xs__6915__auto__,temp__6363__auto__,sets,this$__$1){
return (function tailrecursion$priority_map$iter__13147_$_iter__13149(s__13150){
return (new cljs.core.LazySeq(null,((function (s__13148__$1,vec__13159,priority,item_set,xs__6915__auto__,temp__6363__auto__,sets,this$__$1){
return (function (){
var s__13150__$1 = s__13150;
while(true){
var temp__6363__auto____$1 = cljs.core.seq(s__13150__$1);
if(temp__6363__auto____$1){
var s__13150__$2 = temp__6363__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__13150__$2)){
var c__7871__auto__ = cljs.core.chunk_first(s__13150__$2);
var size__7872__auto__ = cljs.core.count(c__7871__auto__);
var b__13152 = cljs.core.chunk_buffer(size__7872__auto__);
if((function (){var i__13151 = (0);
while(true){
if((i__13151 < size__7872__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__7871__auto__,i__13151);
cljs.core.chunk_append(b__13152,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null));

var G__13169 = (i__13151 + (1));
i__13151 = G__13169;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13152),tailrecursion$priority_map$iter__13147_$_iter__13149(cljs.core.chunk_rest(s__13150__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13152),null);
}
} else {
var item = cljs.core.first(s__13150__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null),tailrecursion$priority_map$iter__13147_$_iter__13149(cljs.core.rest(s__13150__$2)));
}
} else {
return null;
}
break;
}
});})(s__13148__$1,vec__13159,priority,item_set,xs__6915__auto__,temp__6363__auto__,sets,this$__$1))
,null,null));
});})(s__13148__$1,vec__13159,priority,item_set,xs__6915__auto__,temp__6363__auto__,sets,this$__$1))
;
var fs__7870__auto__ = cljs.core.seq(iterys__7869__auto__(item_set));
if(fs__7870__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__7870__auto__,tailrecursion$priority_map$iter__13147(cljs.core.rest(s__13148__$1)));
} else {
var G__13170 = cljs.core.rest(s__13148__$1);
s__13148__$1 = G__13170;
continue;
}
} else {
return null;
}
break;
}
});})(sets,this$__$1))
,null,null));
});})(sets,this$__$1))
;
return iter__7873__auto__(sets);
})());
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISorted$_entry_key$arity$2 = (function (this$,entry){
var self__ = this;
var this$__$1 = this;
return cljs.core.val(entry);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISorted$_comparator$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.compare;
});

tailrecursion.priority_map.PersistentPriorityMap.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$priority_DASH__GT_set_DASH_of_DASH_items,cljs.core.cst$sym$item_DASH__GT_priority,cljs.core.cst$sym$meta,cljs.core.with_meta(cljs.core.cst$sym$__hash,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null);
});

tailrecursion.priority_map.PersistentPriorityMap.cljs$lang$type = true;

tailrecursion.priority_map.PersistentPriorityMap.cljs$lang$ctorStr = "tailrecursion.priority-map/PersistentPriorityMap";

tailrecursion.priority_map.PersistentPriorityMap.cljs$lang$ctorPrWriter = (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"tailrecursion.priority-map/PersistentPriorityMap");
});

tailrecursion.priority_map.__GT_PersistentPriorityMap = (function tailrecursion$priority_map$__GT_PersistentPriorityMap(priority__GT_set_of_items,item__GT_priority,meta,__hash){
return (new tailrecursion.priority_map.PersistentPriorityMap(priority__GT_set_of_items,item__GT_priority,meta,__hash));
});

tailrecursion.priority_map.PersistentPriorityMap.EMPTY = (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.sorted_map(),cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.EMPTY,null));
tailrecursion.priority_map.pm_empty_by = (function tailrecursion$priority_map$pm_empty_by(comparator){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.sorted_map_by(comparator),cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.EMPTY,null));
});
tailrecursion.priority_map.read_priority_map = (function tailrecursion$priority_map$read_priority_map(elems){
if(cljs.core.map_QMARK_(elems)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(tailrecursion.priority_map.PersistentPriorityMap.EMPTY,elems);
} else {
return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(null,cljs.core.array_seq(["Priority map literal expects a map for its elements."], 0));
}
});
cljs.reader.register_tag_parser_BANG_("tailrecursion.priority-map",tailrecursion.priority_map.read_priority_map);
/**
 * keyval => key val
 *   Returns a new priority map with supplied mappings.
 */
tailrecursion.priority_map.priority_map = (function tailrecursion$priority_map$priority_map(var_args){
var args__8209__auto__ = [];
var len__8202__auto___13172 = arguments.length;
var i__8203__auto___13173 = (0);
while(true){
if((i__8203__auto___13173 < len__8202__auto___13172)){
args__8209__auto__.push((arguments[i__8203__auto___13173]));

var G__13174 = (i__8203__auto___13173 + (1));
i__8203__auto___13173 = G__13174;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((0) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((0)),(0),null)):null);
return tailrecursion.priority_map.priority_map.cljs$core$IFn$_invoke$arity$variadic(argseq__8210__auto__);
});

tailrecursion.priority_map.priority_map.cljs$core$IFn$_invoke$arity$variadic = (function (keyvals){
var in$ = cljs.core.seq(keyvals);
var out = tailrecursion.priority_map.PersistentPriorityMap.EMPTY;
while(true){
if(in$){
var G__13175 = cljs.core.nnext(in$);
var G__13176 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__13175;
out = G__13176;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map.cljs$lang$maxFixedArity = (0);

tailrecursion.priority_map.priority_map.cljs$lang$applyTo = (function (seq13171){
return tailrecursion.priority_map.priority_map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13171));
});

/**
 * keyval => key val
 *   Returns a new priority map with supplied
 *   mappings, using the supplied comparator.
 */
tailrecursion.priority_map.priority_map_by = (function tailrecursion$priority_map$priority_map_by(var_args){
var args__8209__auto__ = [];
var len__8202__auto___13179 = arguments.length;
var i__8203__auto___13180 = (0);
while(true){
if((i__8203__auto___13180 < len__8202__auto___13179)){
args__8209__auto__.push((arguments[i__8203__auto___13180]));

var G__13181 = (i__8203__auto___13180 + (1));
i__8203__auto___13180 = G__13181;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((1) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((1)),(0),null)):null);
return tailrecursion.priority_map.priority_map_by.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__8210__auto__);
});

tailrecursion.priority_map.priority_map_by.cljs$core$IFn$_invoke$arity$variadic = (function (comparator,keyvals){
var in$ = cljs.core.seq(keyvals);
var out = tailrecursion.priority_map.pm_empty_by(comparator);
while(true){
if(in$){
var G__13182 = cljs.core.nnext(in$);
var G__13183 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__13182;
out = G__13183;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map_by.cljs$lang$maxFixedArity = (1);

tailrecursion.priority_map.priority_map_by.cljs$lang$applyTo = (function (seq13177){
var G__13178 = cljs.core.first(seq13177);
var seq13177__$1 = cljs.core.next(seq13177);
return tailrecursion.priority_map.priority_map_by.cljs$core$IFn$_invoke$arity$variadic(G__13178,seq13177__$1);
});

