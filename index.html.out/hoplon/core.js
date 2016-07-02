// Compiled by ClojureScript 1.9.76 {:static-fns true, :optimize-constants true}
goog.provide('hoplon.core');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('clojure.set');
goog.require('javelin.core');
goog.require('cljs.reader');
goog.require('clojure.string');



cljs.core.enable_console_print_BANG_();
/**
 * Is the application running in a prerendering container (eg. PhantomJS via
 *   the prerender task)?
 */
hoplon.core.prerendering_QMARK_ = (new goog.Uri(window.location.href)).getParameterValue("prerendering");
/**
 * Experimental.
 */
hoplon.core.static_elements = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p1__14142_SHARP_,p2__14143_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__14142_SHARP_,p2__14143_SHARP_.getAttribute("static-id"),p2__14143_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,jQuery("[static-id]").get());
/**
 * Adds f as a watcher to ref and evaluates (f init @ref) once. The watcher
 *   f is a function of two arguments: the previous and next values. If init is
 *   not provided the default (nil) will be used.
 */
hoplon.core.do_watch = (function hoplon$core$do_watch(var_args){
var args14144 = [];
var len__8202__auto___14149 = arguments.length;
var i__8203__auto___14150 = (0);
while(true){
if((i__8203__auto___14150 < len__8202__auto___14149)){
args14144.push((arguments[i__8203__auto___14150]));

var G__14151 = (i__8203__auto___14150 + (1));
i__8203__auto___14150 = G__14151;
continue;
} else {
}
break;
}

var G__14146 = args14144.length;
switch (G__14146) {
case 2:
return hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14144.length)].join('')));

}
});

hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$2 = (function (ref,f){
return hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$3(ref,null,f);
});

hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$3 = (function (ref,init,f){
var k = cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
var G__14147_14153 = init;
var G__14148_14154 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ref) : cljs.core.deref.call(null,ref));
(f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__14147_14153,G__14148_14154) : f.call(null,G__14147_14153,G__14148_14154));

cljs.core.add_watch(ref,k,((function (k){
return (function (_,___$1,old,new$){
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(old,new$) : f.call(null,old,new$));
});})(k))
);

return k;
});

hoplon.core.do_watch.cljs$lang$maxFixedArity = 3;

/**
 * Experimental.
 */
hoplon.core.bust_cache = (function hoplon$core$bust_cache(path){
var vec__14161 = cljs.core.reverse(clojure.string.split.cljs$core$IFn$_invoke$arity$2(path,/\//));
var seq__14162 = cljs.core.seq(vec__14161);
var first__14163 = cljs.core.first(seq__14162);
var seq__14162__$1 = cljs.core.next(seq__14162);
var f = first__14163;
var more = seq__14162__$1;
var vec__14164 = clojure.string.split.cljs$core$IFn$_invoke$arity$3(f,/\./,(2));
var f1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14164,(0),null);
var f2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14164,(1),null);
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",cljs.core.reverse(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(more,clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(f1),cljs.core.str("."),cljs.core.str("eedd81e4187340e59ecb6f9bbce236aa")].join(''),f2], null)))));
});
hoplon.core.child_vec = (function hoplon$core$child_vec(this$){
var x = this$.childNodes;
var l = x.length;
var i = (0);
var ret = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);
while(true){
var or__7019__auto__ = (function (){var and__7007__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,l);
if(and__7007__auto__){
return cljs.core.persistent_BANG_(ret);
} else {
return and__7007__auto__;
}
})();
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
var G__14167 = (i + (1));
var G__14168 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(ret,x.item(i));
i = G__14167;
ret = G__14168;
continue;
}
break;
}
});
hoplon.core.__GT_node = (function hoplon$core$__GT_node(x){
if(typeof x === 'string'){
return (hoplon.core.$text.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.$text.cljs$core$IFn$_invoke$arity$1(x) : hoplon.core.$text.call(null,x));
} else {
if(typeof x === 'number'){
var G__14170 = [cljs.core.str(x)].join('');
return (hoplon.core.$text.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.$text.cljs$core$IFn$_invoke$arity$1(G__14170) : hoplon.core.$text.call(null,G__14170));
} else {
return x;

}
}
});
hoplon.core.removeChild = Element.prototype.removeChild;
hoplon.core.appendChild = Element.prototype.appendChild;
hoplon.core.insertBefore = Element.prototype.insertBefore;
hoplon.core.replaceChild = Element.prototype.replaceChild;
hoplon.core.setAttribute = Element.prototype.setAttribute;
hoplon.core.merge_kids = (function hoplon$core$merge_kids(this$,old,new$){
var new$__$1 = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.flatten(new$));
var new_QMARK_ = cljs.core.set(new$__$1);
var G__14197 = new$__$1;
var vec__14199 = G__14197;
var seq__14200 = cljs.core.seq(vec__14199);
var first__14201 = cljs.core.first(seq__14200);
var seq__14200__$1 = cljs.core.next(seq__14200);
var x = first__14201;
var xs = seq__14200__$1;
var G__14198 = hoplon.core.child_vec(this$);
var vec__14202 = G__14198;
var seq__14203 = cljs.core.seq(vec__14202);
var first__14204 = cljs.core.first(seq__14203);
var seq__14203__$1 = cljs.core.next(seq__14203);
var k = first__14204;
var ks = seq__14203__$1;
var kids = vec__14202;
var G__14197__$1 = G__14197;
var G__14198__$1 = G__14198;
while(true){
var vec__14205 = G__14197__$1;
var seq__14206 = cljs.core.seq(vec__14205);
var first__14207 = cljs.core.first(seq__14206);
var seq__14206__$1 = cljs.core.next(seq__14206);
var x__$1 = first__14207;
var xs__$1 = seq__14206__$1;
var vec__14208 = G__14198__$1;
var seq__14209 = cljs.core.seq(vec__14208);
var first__14210 = cljs.core.first(seq__14209);
var seq__14209__$1 = cljs.core.next(seq__14209);
var k__$1 = first__14210;
var ks__$1 = seq__14209__$1;
var kids__$1 = vec__14208;
if(cljs.core.truth_((function (){var or__7019__auto__ = x__$1;
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
return k__$1;
}
})())){
var G__14211 = xs__$1;
var G__14212 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x__$1,k__$1))?ks__$1:((cljs.core.not(k__$1))?(function (){var ks__$2 = ks__$1;
hoplon.core.appendChild.call(this$,hoplon.core.__GT_node(x__$1));

return ks__$2;
})():((cljs.core.not(x__$1))?(function (){var ks__$2 = ks__$1;
if(cljs.core.truth_((new_QMARK_.cljs$core$IFn$_invoke$arity$1 ? new_QMARK_.cljs$core$IFn$_invoke$arity$1(k__$1) : new_QMARK_.call(null,k__$1)))){
} else {
hoplon.core.removeChild.call(this$,hoplon.core.__GT_node(k__$1));
}

return ks__$2;
})():(function (){var kids__$2 = kids__$1;
hoplon.core.insertBefore.call(this$,hoplon.core.__GT_node(x__$1),hoplon.core.__GT_node(k__$1));

return kids__$2;
})()
)));
G__14197__$1 = G__14211;
G__14198__$1 = G__14212;
continue;
} else {
return null;
}
break;
}
});
hoplon.core.ensure_kids_BANG_ = (function hoplon$core$ensure_kids_BANG_(this$){
var this$__$1 = this$;
if(cljs.core.truth_(this$__$1.hoplonKids)){
} else {
var kids_14215 = (function (){var G__14214 = hoplon.core.child_vec(this$__$1);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14214) : cljs.core.atom.call(null,G__14214));
})();
this$__$1.hoplonKids = kids_14215;

hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$2(kids_14215,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(hoplon.core.merge_kids,this$__$1));
}

return this$__$1;
});
hoplon.core.set_appendChild_BANG_ = (function hoplon$core$set_appendChild_BANG_(this$,kidfn){
return this$.appendChild = (function (x){
var this$__$1 = this;
var x__$1 = x;
hoplon.core.ensure_kids_BANG_(this$__$1);

var kids_14218 = (kidfn.cljs$core$IFn$_invoke$arity$1 ? kidfn.cljs$core$IFn$_invoke$arity$1(this$__$1) : kidfn.call(null,this$__$1));
var i_14219 = cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(kids_14218) : cljs.core.deref.call(null,kids_14218)));
if(cljs.core.truth_(javelin.core.cell_QMARK_(x__$1))){
hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$2(x__$1,((function (kids_14218,i_14219,x__$1,this$__$1){
return (function (p1__14217_SHARP_,p2__14216_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kids_14218,cljs.core.assoc,i_14219,p2__14216_SHARP_);
});})(kids_14218,i_14219,x__$1,this$__$1))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kids_14218,cljs.core.assoc,i_14219,x__$1);
}

return x__$1;
});
});
hoplon.core.set_removeChild_BANG_ = (function hoplon$core$set_removeChild_BANG_(this$,kidfn){
return this$.removeChild = (function (x){
var this$__$1 = this;
var x__$1 = x;
hoplon.core.ensure_kids_BANG_(this$__$1);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2((kidfn.cljs$core$IFn$_invoke$arity$1 ? kidfn.cljs$core$IFn$_invoke$arity$1(this$__$1) : kidfn.call(null,this$__$1)),((function (x__$1,this$__$1){
return (function (p1__14220_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,x__$1),p1__14220_SHARP_));
});})(x__$1,this$__$1))
);

return x__$1;
});
});
hoplon.core.set_insertBefore_BANG_ = (function hoplon$core$set_insertBefore_BANG_(this$,kidfn){
return this$.insertBefore = (function (x,y){
var this$__$1 = this;
var x__$1 = x;
hoplon.core.ensure_kids_BANG_(this$__$1);

if(cljs.core.not(y)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3((kidfn.cljs$core$IFn$_invoke$arity$1 ? kidfn.cljs$core$IFn$_invoke$arity$1(this$__$1) : kidfn.call(null,this$__$1)),cljs.core.conj,x__$1);
} else {
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(x__$1,y)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2((kidfn.cljs$core$IFn$_invoke$arity$1 ? kidfn.cljs$core$IFn$_invoke$arity$1(this$__$1) : kidfn.call(null,this$__$1)),((function (x__$1,this$__$1){
return (function (p1__14221_SHARP_){
return cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (x__$1,this$__$1){
return (function (z){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(z,y)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x__$1,z], null);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [z], null);
}
});})(x__$1,this$__$1))
,cljs.core.array_seq([p1__14221_SHARP_], 0)));
});})(x__$1,this$__$1))
);
} else {
}
}

return x__$1;
});
});
hoplon.core.set_replaceChild_BANG_ = (function hoplon$core$set_replaceChild_BANG_(this$,kidfn){
return this$.replaceChild = (function (x,y){
var this$__$1 = this;
var y__$1 = y;
hoplon.core.ensure_kids_BANG_(this$__$1);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2((kidfn.cljs$core$IFn$_invoke$arity$1 ? kidfn.cljs$core$IFn$_invoke$arity$1(this$__$1) : kidfn.call(null,this$__$1)),((function (y__$1,this$__$1){
return (function (p1__14222_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (y__$1,this$__$1){
return (function (z){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(z,y__$1)){
return x;
} else {
return z;
}
});})(y__$1,this$__$1))
,p1__14222_SHARP_);
});})(y__$1,this$__$1))
);

return y__$1;
});
});
hoplon.core.set_setAttribute_BANG_ = (function hoplon$core$set_setAttribute_BANG_(this$,attrfn){
return this$.setAttribute = (function (k,v){
var this$__$1 = this;
var _ = undefined;
var kk_14223 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k);
var attr_14224 = (attrfn.cljs$core$IFn$_invoke$arity$1 ? attrfn.cljs$core$IFn$_invoke$arity$1(this$__$1) : attrfn.call(null,this$__$1));
var has_QMARK__14225 = (function (){var and__7007__auto__ = attr_14224;
if(cljs.core.truth_(and__7007__auto__)){
return cljs.core.contains_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(attr_14224) : cljs.core.deref.call(null,attr_14224)),kk_14223);
} else {
return and__7007__auto__;
}
})();
if(cljs.core.truth_(has_QMARK__14225)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(attr_14224,cljs.core.assoc,kk_14223,v);
} else {
hoplon.core.setAttribute.call(this$__$1,k,v);
}

return _;
});
});
hoplon.core.set_appendChild_BANG_(Element.prototype,(function (p1__14226_SHARP_){
return p1__14226_SHARP_.hoplonKids;
}));
hoplon.core.set_removeChild_BANG_(Element.prototype,(function (p1__14227_SHARP_){
return p1__14227_SHARP_.hoplonKids;
}));
hoplon.core.set_insertBefore_BANG_(Element.prototype,(function (p1__14228_SHARP_){
return p1__14228_SHARP_.hoplonKids;
}));
hoplon.core.set_replaceChild_BANG_(Element.prototype,(function (p1__14229_SHARP_){
return p1__14229_SHARP_.hoplonKids;
}));

/**
 * @interface
 */
hoplon.core.ICustomElement = function(){};

hoplon.core._set_attributes_BANG_ = (function hoplon$core$_set_attributes_BANG_(this$,kvs){
if((!((this$ == null))) && (!((this$.hoplon$core$ICustomElement$_set_attributes_BANG_$arity$2 == null)))){
return this$.hoplon$core$ICustomElement$_set_attributes_BANG_$arity$2(this$,kvs);
} else {
var x__7732__auto__ = (((this$ == null))?null:this$);
var m__7733__auto__ = (hoplon.core._set_attributes_BANG_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$2(this$,kvs) : m__7733__auto__.call(null,this$,kvs));
} else {
var m__7733__auto____$1 = (hoplon.core._set_attributes_BANG_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,kvs) : m__7733__auto____$1.call(null,this$,kvs));
} else {
throw cljs.core.missing_protocol("ICustomElement.-set-attributes!",this$);
}
}
}
});

hoplon.core._set_styles_BANG_ = (function hoplon$core$_set_styles_BANG_(this$,kvs){
if((!((this$ == null))) && (!((this$.hoplon$core$ICustomElement$_set_styles_BANG_$arity$2 == null)))){
return this$.hoplon$core$ICustomElement$_set_styles_BANG_$arity$2(this$,kvs);
} else {
var x__7732__auto__ = (((this$ == null))?null:this$);
var m__7733__auto__ = (hoplon.core._set_styles_BANG_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$2(this$,kvs) : m__7733__auto__.call(null,this$,kvs));
} else {
var m__7733__auto____$1 = (hoplon.core._set_styles_BANG_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,kvs) : m__7733__auto____$1.call(null,this$,kvs));
} else {
throw cljs.core.missing_protocol("ICustomElement.-set-styles!",this$);
}
}
}
});

hoplon.core._append_child_BANG_ = (function hoplon$core$_append_child_BANG_(this$,child){
if((!((this$ == null))) && (!((this$.hoplon$core$ICustomElement$_append_child_BANG_$arity$2 == null)))){
return this$.hoplon$core$ICustomElement$_append_child_BANG_$arity$2(this$,child);
} else {
var x__7732__auto__ = (((this$ == null))?null:this$);
var m__7733__auto__ = (hoplon.core._append_child_BANG_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$2(this$,child) : m__7733__auto__.call(null,this$,child));
} else {
var m__7733__auto____$1 = (hoplon.core._append_child_BANG_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,child) : m__7733__auto____$1.call(null,this$,child));
} else {
throw cljs.core.missing_protocol("ICustomElement.-append-child!",this$);
}
}
}
});

hoplon.core._remove_child_BANG_ = (function hoplon$core$_remove_child_BANG_(this$,child){
if((!((this$ == null))) && (!((this$.hoplon$core$ICustomElement$_remove_child_BANG_$arity$2 == null)))){
return this$.hoplon$core$ICustomElement$_remove_child_BANG_$arity$2(this$,child);
} else {
var x__7732__auto__ = (((this$ == null))?null:this$);
var m__7733__auto__ = (hoplon.core._remove_child_BANG_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$2(this$,child) : m__7733__auto__.call(null,this$,child));
} else {
var m__7733__auto____$1 = (hoplon.core._remove_child_BANG_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,child) : m__7733__auto____$1.call(null,this$,child));
} else {
throw cljs.core.missing_protocol("ICustomElement.-remove-child!",this$);
}
}
}
});

hoplon.core._replace_child_BANG_ = (function hoplon$core$_replace_child_BANG_(this$,new$,existing){
if((!((this$ == null))) && (!((this$.hoplon$core$ICustomElement$_replace_child_BANG_$arity$3 == null)))){
return this$.hoplon$core$ICustomElement$_replace_child_BANG_$arity$3(this$,new$,existing);
} else {
var x__7732__auto__ = (((this$ == null))?null:this$);
var m__7733__auto__ = (hoplon.core._replace_child_BANG_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$3 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$3(this$,new$,existing) : m__7733__auto__.call(null,this$,new$,existing));
} else {
var m__7733__auto____$1 = (hoplon.core._replace_child_BANG_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,new$,existing) : m__7733__auto____$1.call(null,this$,new$,existing));
} else {
throw cljs.core.missing_protocol("ICustomElement.-replace-child!",this$);
}
}
}
});

hoplon.core._insert_before_BANG_ = (function hoplon$core$_insert_before_BANG_(this$,new$,existing){
if((!((this$ == null))) && (!((this$.hoplon$core$ICustomElement$_insert_before_BANG_$arity$3 == null)))){
return this$.hoplon$core$ICustomElement$_insert_before_BANG_$arity$3(this$,new$,existing);
} else {
var x__7732__auto__ = (((this$ == null))?null:this$);
var m__7733__auto__ = (hoplon.core._insert_before_BANG_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$3 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$3(this$,new$,existing) : m__7733__auto__.call(null,this$,new$,existing));
} else {
var m__7733__auto____$1 = (hoplon.core._insert_before_BANG_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,new$,existing) : m__7733__auto____$1.call(null,this$,new$,existing));
} else {
throw cljs.core.missing_protocol("ICustomElement.-insert-before!",this$);
}
}
}
});

hoplon.core.set_attributes_BANG_ = (function hoplon$core$set_attributes_BANG_(var_args){
var args14230 = [];
var len__8202__auto___14237 = arguments.length;
var i__8203__auto___14238 = (0);
while(true){
if((i__8203__auto___14238 < len__8202__auto___14237)){
args14230.push((arguments[i__8203__auto___14238]));

var G__14239 = (i__8203__auto___14238 + (1));
i__8203__auto___14238 = G__14239;
continue;
} else {
}
break;
}

var G__14236 = args14230.length;
switch (G__14236) {
case 2:
return hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__8225__auto__ = (new cljs.core.IndexedSeq(args14230.slice((3)),(0),null));
return hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__8225__auto__);

}
});

hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (this$,kvs){
return hoplon.core._set_attributes_BANG_(this$,kvs);
});

hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (this$,k,v,kvs){
return hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$2(this$,cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.hash_map,k,v,kvs));
});

hoplon.core.set_attributes_BANG_.cljs$lang$applyTo = (function (seq14231){
var G__14232 = cljs.core.first(seq14231);
var seq14231__$1 = cljs.core.next(seq14231);
var G__14233 = cljs.core.first(seq14231__$1);
var seq14231__$2 = cljs.core.next(seq14231__$1);
var G__14234 = cljs.core.first(seq14231__$2);
var seq14231__$3 = cljs.core.next(seq14231__$2);
return hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__14232,G__14233,G__14234,seq14231__$3);
});

hoplon.core.set_attributes_BANG_.cljs$lang$maxFixedArity = (3);

hoplon.core.set_styles_BANG_ = (function hoplon$core$set_styles_BANG_(var_args){
var args14241 = [];
var len__8202__auto___14248 = arguments.length;
var i__8203__auto___14249 = (0);
while(true){
if((i__8203__auto___14249 < len__8202__auto___14248)){
args14241.push((arguments[i__8203__auto___14249]));

var G__14250 = (i__8203__auto___14249 + (1));
i__8203__auto___14249 = G__14250;
continue;
} else {
}
break;
}

var G__14247 = args14241.length;
switch (G__14247) {
case 2:
return hoplon.core.set_styles_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__8225__auto__ = (new cljs.core.IndexedSeq(args14241.slice((3)),(0),null));
return hoplon.core.set_styles_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__8225__auto__);

}
});

hoplon.core.set_styles_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (this$,kvs){
return hoplon.core._set_styles_BANG_(this$,kvs);
});

hoplon.core.set_styles_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (this$,k,v,kvs){
return hoplon.core.set_styles_BANG_.cljs$core$IFn$_invoke$arity$2(this$,cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.hash_map,k,v,kvs));
});

hoplon.core.set_styles_BANG_.cljs$lang$applyTo = (function (seq14242){
var G__14243 = cljs.core.first(seq14242);
var seq14242__$1 = cljs.core.next(seq14242);
var G__14244 = cljs.core.first(seq14242__$1);
var seq14242__$2 = cljs.core.next(seq14242__$1);
var G__14245 = cljs.core.first(seq14242__$2);
var seq14242__$3 = cljs.core.next(seq14242__$2);
return hoplon.core.set_styles_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__14243,G__14244,G__14245,seq14242__$3);
});

hoplon.core.set_styles_BANG_.cljs$lang$maxFixedArity = (3);

hoplon.core.append_child_BANG_ = (function hoplon$core$append_child_BANG_(this$,child){
return hoplon.core._append_child_BANG_(this$,child);
});
hoplon.core.remove_child_BANG_ = (function hoplon$core$remove_child_BANG_(this$,child){
return hoplon.core._remove_child_BANG_(this$,child);
});
hoplon.core.replace_child_BANG_ = (function hoplon$core$replace_child_BANG_(this$,new$,existing){
return hoplon.core._replace_child_BANG_(this$,new$,existing);
});
hoplon.core.insert_before_BANG_ = (function hoplon$core$insert_before_BANG_(this$,new$,existing){
return hoplon.core._insert_before_BANG_(this$,new$,existing);
});
hoplon.core.is_ie8 = cljs.core.not((window["Node"]));
hoplon.core.node_QMARK_ = ((cljs.core.not(hoplon.core.is_ie8))?(function (p1__14252_SHARP_){
return (p1__14252_SHARP_ instanceof Node);
}):(function (p1__14253_SHARP_){
try{return p1__14253_SHARP_.nodeType;
}catch (e14254){if((e14254 instanceof Error)){
var _ = e14254;
return null;
} else {
throw e14254;

}
}}));
hoplon.core.vector_QMARK__STAR_ = ((cljs.core.not(hoplon.core.is_ie8))?cljs.core.vector_QMARK_:(function (p1__14255_SHARP_){
try{return cljs.core.vector_QMARK_(p1__14255_SHARP_);
}catch (e14256){if((e14256 instanceof Error)){
var _ = e14256;
return null;
} else {
throw e14256;

}
}}));
hoplon.core.seq_QMARK__STAR_ = ((cljs.core.not(hoplon.core.is_ie8))?cljs.core.seq_QMARK_:(function (p1__14257_SHARP_){
try{return cljs.core.seq_QMARK_(p1__14257_SHARP_);
}catch (e14258){if((e14258 instanceof Error)){
var _ = e14258;
return null;
} else {
throw e14258;

}
}}));
hoplon.core.safe_nth = (function hoplon$core$safe_nth(var_args){
var args14259 = [];
var len__8202__auto___14263 = arguments.length;
var i__8203__auto___14264 = (0);
while(true){
if((i__8203__auto___14264 < len__8202__auto___14263)){
args14259.push((arguments[i__8203__auto___14264]));

var G__14265 = (i__8203__auto___14264 + (1));
i__8203__auto___14264 = G__14265;
continue;
} else {
}
break;
}

var G__14261 = args14259.length;
switch (G__14261) {
case 2:
return hoplon.core.safe_nth.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return hoplon.core.safe_nth.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14259.length)].join('')));

}
});

hoplon.core.safe_nth.cljs$core$IFn$_invoke$arity$2 = (function (coll,index){
return hoplon.core.safe_nth.cljs$core$IFn$_invoke$arity$3(coll,index,null);
});

hoplon.core.safe_nth.cljs$core$IFn$_invoke$arity$3 = (function (coll,index,not_found){
try{return cljs.core.nth.cljs$core$IFn$_invoke$arity$3(coll,index,not_found);
}catch (e14262){if((e14262 instanceof Error)){
var _ = e14262;
return not_found;
} else {
throw e14262;

}
}});

hoplon.core.safe_nth.cljs$lang$maxFixedArity = 3;

hoplon.core.timeout = (function hoplon$core$timeout(var_args){
var args14267 = [];
var len__8202__auto___14270 = arguments.length;
var i__8203__auto___14271 = (0);
while(true){
if((i__8203__auto___14271 < len__8202__auto___14270)){
args14267.push((arguments[i__8203__auto___14271]));

var G__14272 = (i__8203__auto___14271 + (1));
i__8203__auto___14271 = G__14272;
continue;
} else {
}
break;
}

var G__14269 = args14267.length;
switch (G__14269) {
case 1:
return hoplon.core.timeout.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return hoplon.core.timeout.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14267.length)].join('')));

}
});

hoplon.core.timeout.cljs$core$IFn$_invoke$arity$1 = (function (f){
return hoplon.core.timeout.cljs$core$IFn$_invoke$arity$2(f,(0));
});

hoplon.core.timeout.cljs$core$IFn$_invoke$arity$2 = (function (f,t){
return window.setTimeout(f,t);
});

hoplon.core.timeout.cljs$lang$maxFixedArity = 2;

hoplon.core.when_dom = (function hoplon$core$when_dom(this$,f){
if(!((this$ instanceof Element))){
return (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
} else {
return hoplon.core.timeout.cljs$core$IFn$_invoke$arity$1((function hoplon$core$when_dom_$_doit(){
if(cljs.core.truth_(document.documentElement.contains(this$))){
return (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
} else {
return hoplon.core.timeout.cljs$core$IFn$_invoke$arity$2(hoplon$core$when_dom_$_doit,(20));
}
}));
}
});
hoplon.core.parse_args = (function hoplon$core$parse_args(args){
var attr = cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY);
var kids = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);
var G__14290 = args;
var vec__14291 = G__14290;
var seq__14292 = cljs.core.seq(vec__14291);
var first__14293 = cljs.core.first(seq__14292);
var seq__14292__$1 = cljs.core.next(seq__14292);
var arg = first__14293;
var args__$1 = seq__14292__$1;
var attr__$1 = attr;
var kids__$1 = kids;
var G__14290__$1 = G__14290;
while(true){
var attr__$2 = attr__$1;
var kids__$2 = kids__$1;
var vec__14294 = G__14290__$1;
var seq__14295 = cljs.core.seq(vec__14294);
var first__14296 = cljs.core.first(seq__14295);
var seq__14295__$1 = cljs.core.next(seq__14295);
var arg__$1 = first__14296;
var args__$2 = seq__14295__$1;
if(cljs.core.not(arg__$1)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.persistent_BANG_(attr__$2),cljs.core.persistent_BANG_(kids__$2)], null);
} else {
if(cljs.core.map_QMARK_(arg__$1)){
var G__14297 = cljs.core.reduce_kv(((function (attr__$1,kids__$1,G__14290__$1,attr__$2,kids__$2,vec__14294,seq__14295,first__14296,seq__14295__$1,arg__$1,args__$2,attr,kids,G__14290,vec__14291,seq__14292,first__14293,seq__14292__$1,arg,args__$1){
return (function (p1__14274_SHARP_,p2__14275_SHARP_,p3__14276_SHARP_){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(p1__14274_SHARP_,p2__14275_SHARP_,p3__14276_SHARP_);
});})(attr__$1,kids__$1,G__14290__$1,attr__$2,kids__$2,vec__14294,seq__14295,first__14296,seq__14295__$1,arg__$1,args__$2,attr,kids,G__14290,vec__14291,seq__14292,first__14293,seq__14292__$1,arg,args__$1))
,attr__$2,arg__$1);
var G__14298 = kids__$2;
var G__14299 = args__$2;
attr__$1 = G__14297;
kids__$1 = G__14298;
G__14290__$1 = G__14299;
continue;
} else {
if((arg__$1 instanceof cljs.core.Keyword)){
var G__14300 = cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(attr__$2,arg__$1,cljs.core.first(args__$2));
var G__14301 = kids__$2;
var G__14302 = cljs.core.rest(args__$2);
attr__$1 = G__14300;
kids__$1 = G__14301;
G__14290__$1 = G__14302;
continue;
} else {
if(cljs.core.truth_((hoplon.core.seq_QMARK__STAR_.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.seq_QMARK__STAR_.cljs$core$IFn$_invoke$arity$1(arg__$1) : hoplon.core.seq_QMARK__STAR_.call(null,arg__$1)))){
var G__14303 = attr__$2;
var G__14304 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,kids__$2,cljs.core.flatten(arg__$1));
var G__14305 = args__$2;
attr__$1 = G__14303;
kids__$1 = G__14304;
G__14290__$1 = G__14305;
continue;
} else {
if(cljs.core.truth_((hoplon.core.vector_QMARK__STAR_.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.vector_QMARK__STAR_.cljs$core$IFn$_invoke$arity$1(arg__$1) : hoplon.core.vector_QMARK__STAR_.call(null,arg__$1)))){
var G__14306 = attr__$2;
var G__14307 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,kids__$2,cljs.core.flatten(arg__$1));
var G__14308 = args__$2;
attr__$1 = G__14306;
kids__$1 = G__14307;
G__14290__$1 = G__14308;
continue;
} else {
var G__14309 = attr__$2;
var G__14310 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(kids__$2,arg__$1);
var G__14311 = args__$2;
attr__$1 = G__14309;
kids__$1 = G__14310;
G__14290__$1 = G__14311;
continue;

}
}
}
}
}
break;
}
});
hoplon.core.add_attributes_BANG_ = (function hoplon$core$add_attributes_BANG_(this$,attr){
var this$__$1 = this$;
cljs.core.reduce_kv(((function (this$__$1){
return (function (this$__$2,k,v){
var this$__$3 = this$__$2;
if(cljs.core.truth_(javelin.core.cell_QMARK_(v))){
hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$2(v,((function (this$__$3,this$__$1){
return (function (p1__14313_SHARP_,p2__14312_SHARP_){
return (hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3(this$__$3,k,p2__14312_SHARP_) : hoplon.core.do_BANG_.call(null,this$__$3,k,p2__14312_SHARP_));
});})(this$__$3,this$__$1))
);
} else {
if(cljs.core.fn_QMARK_(v)){
(hoplon.core.on_BANG_.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.on_BANG_.cljs$core$IFn$_invoke$arity$3(this$__$3,k,v) : hoplon.core.on_BANG_.call(null,this$__$3,k,v));
} else {
(hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3(this$__$3,k,v) : hoplon.core.do_BANG_.call(null,this$__$3,k,v));

}
}

return this$__$3;
});})(this$__$1))
,this$__$1,attr);

return this$__$1;
});
hoplon.core.add_children_BANG_ = (function hoplon$core$add_children_BANG_(this$,p__14314){
var vec__14322 = p__14314;
var seq__14323 = cljs.core.seq(vec__14322);
var first__14324 = cljs.core.first(seq__14323);
var seq__14323__$1 = cljs.core.next(seq__14323);
var child_cell = first__14324;
var _ = seq__14323__$1;
var kids = vec__14322;
var this$__$1 = this$;
var seq__14325_14329 = cljs.core.seq(cljs.core.flatten(kids));
var chunk__14326_14330 = null;
var count__14327_14331 = (0);
var i__14328_14332 = (0);
while(true){
if((i__14328_14332 < count__14327_14331)){
var x_14333 = chunk__14326_14330.cljs$core$IIndexed$_nth$arity$2(null,i__14328_14332);
var temp__6363__auto___14334 = hoplon.core.__GT_node(x_14333);
if(cljs.core.truth_(temp__6363__auto___14334)){
var x_14335__$1 = temp__6363__auto___14334;
hoplon.core.append_child_BANG_(this$__$1,x_14335__$1);
} else {
}

var G__14336 = seq__14325_14329;
var G__14337 = chunk__14326_14330;
var G__14338 = count__14327_14331;
var G__14339 = (i__14328_14332 + (1));
seq__14325_14329 = G__14336;
chunk__14326_14330 = G__14337;
count__14327_14331 = G__14338;
i__14328_14332 = G__14339;
continue;
} else {
var temp__6363__auto___14340 = cljs.core.seq(seq__14325_14329);
if(temp__6363__auto___14340){
var seq__14325_14341__$1 = temp__6363__auto___14340;
if(cljs.core.chunked_seq_QMARK_(seq__14325_14341__$1)){
var c__7922__auto___14342 = cljs.core.chunk_first(seq__14325_14341__$1);
var G__14343 = cljs.core.chunk_rest(seq__14325_14341__$1);
var G__14344 = c__7922__auto___14342;
var G__14345 = cljs.core.count(c__7922__auto___14342);
var G__14346 = (0);
seq__14325_14329 = G__14343;
chunk__14326_14330 = G__14344;
count__14327_14331 = G__14345;
i__14328_14332 = G__14346;
continue;
} else {
var x_14347 = cljs.core.first(seq__14325_14341__$1);
var temp__6363__auto___14348__$1 = hoplon.core.__GT_node(x_14347);
if(cljs.core.truth_(temp__6363__auto___14348__$1)){
var x_14349__$1 = temp__6363__auto___14348__$1;
hoplon.core.append_child_BANG_(this$__$1,x_14349__$1);
} else {
}

var G__14350 = cljs.core.next(seq__14325_14341__$1);
var G__14351 = null;
var G__14352 = (0);
var G__14353 = (0);
seq__14325_14329 = G__14350;
chunk__14326_14330 = G__14351;
count__14327_14331 = G__14352;
i__14328_14332 = G__14353;
continue;
}
} else {
}
}
break;
}

return this$__$1;
});
Element.prototype.cljs$core$IPrintWithWriter$ = true;

Element.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){
var this$__$1 = this;
return cljs.core.write_all.cljs$core$IFn$_invoke$arity$variadic(writer,cljs.core.array_seq(["#<Element: ",this$__$1.tagName,">"], 0));
});

Element.prototype.cljs$core$IFn$ = true;

Element.prototype.call = (function() { 
var G__14386__delegate = function (self__,args){
var self____$1 = this;
var this$ = self____$1;
var vec__14355 = hoplon.core.parse_args(args);
var attr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14355,(0),null);
var kids = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14355,(1),null);
var G__14358 = this$;
hoplon.core.add_attributes_BANG_(G__14358,attr);

hoplon.core.add_children_BANG_(G__14358,kids);

return G__14358;
};
var G__14386 = function (self__,var_args){
var args = null;
if (arguments.length > 1) {
var G__14387__i = 0, G__14387__a = new Array(arguments.length -  1);
while (G__14387__i < G__14387__a.length) {G__14387__a[G__14387__i] = arguments[G__14387__i + 1]; ++G__14387__i;}
  args = new cljs.core.IndexedSeq(G__14387__a,0);
} 
return G__14386__delegate.call(this,self__,args);};
G__14386.cljs$lang$maxFixedArity = 1;
G__14386.cljs$lang$applyTo = (function (arglist__14388){
var self__ = cljs.core.first(arglist__14388);
var args = cljs.core.rest(arglist__14388);
return G__14386__delegate(self__,args);
});
G__14386.cljs$core$IFn$_invoke$arity$variadic = G__14386__delegate;
return G__14386;
})()
;

Element.prototype.apply = (function (self__,args14354){
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone(args14354)));
});

Element.prototype.cljs$core$IFn$_invoke$arity$2 = (function() { 
var G__14389__delegate = function (args){
var this$ = this;
var vec__14359 = hoplon.core.parse_args(args);
var attr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14359,(0),null);
var kids = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14359,(1),null);
var G__14362 = this$;
hoplon.core.add_attributes_BANG_(G__14362,attr);

hoplon.core.add_children_BANG_(G__14362,kids);

return G__14362;
};
var G__14389 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14390__i = 0, G__14390__a = new Array(arguments.length -  0);
while (G__14390__i < G__14390__a.length) {G__14390__a[G__14390__i] = arguments[G__14390__i + 0]; ++G__14390__i;}
  args = new cljs.core.IndexedSeq(G__14390__a,0);
} 
return G__14389__delegate.call(this,args);};
G__14389.cljs$lang$maxFixedArity = 0;
G__14389.cljs$lang$applyTo = (function (arglist__14391){
var args = cljs.core.seq(arglist__14391);
return G__14389__delegate(args);
});
G__14389.cljs$core$IFn$_invoke$arity$variadic = G__14389__delegate;
return G__14389;
})()
;

Element.prototype.hoplon$core$ICustomElement$ = true;

Element.prototype.hoplon$core$ICustomElement$_set_attributes_BANG_$arity$2 = (function (this$,kvs){
var this$__$1 = this;
var e = jQuery(this$__$1);
var seq__14363 = cljs.core.seq(kvs);
var chunk__14365 = null;
var count__14366 = (0);
var i__14367 = (0);
while(true){
if((i__14367 < count__14366)){
var vec__14369 = chunk__14365.cljs$core$IIndexed$_nth$arity$2(null,i__14367);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14369,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14369,(1),null);
var k_14392__$1 = cljs.core.name(k);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(false,v)){
e.removeAttr(k_14392__$1);
} else {
e.attr(k_14392__$1,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(true,v))?k_14392__$1:v));
}

var G__14393 = seq__14363;
var G__14394 = chunk__14365;
var G__14395 = count__14366;
var G__14396 = (i__14367 + (1));
seq__14363 = G__14393;
chunk__14365 = G__14394;
count__14366 = G__14395;
i__14367 = G__14396;
continue;
} else {
var temp__6363__auto__ = cljs.core.seq(seq__14363);
if(temp__6363__auto__){
var seq__14363__$1 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14363__$1)){
var c__7922__auto__ = cljs.core.chunk_first(seq__14363__$1);
var G__14397 = cljs.core.chunk_rest(seq__14363__$1);
var G__14398 = c__7922__auto__;
var G__14399 = cljs.core.count(c__7922__auto__);
var G__14400 = (0);
seq__14363 = G__14397;
chunk__14365 = G__14398;
count__14366 = G__14399;
i__14367 = G__14400;
continue;
} else {
var vec__14372 = cljs.core.first(seq__14363__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14372,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14372,(1),null);
var k_14401__$1 = cljs.core.name(k);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(false,v)){
e.removeAttr(k_14401__$1);
} else {
e.attr(k_14401__$1,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(true,v))?k_14401__$1:v));
}

var G__14402 = cljs.core.next(seq__14363__$1);
var G__14403 = null;
var G__14404 = (0);
var G__14405 = (0);
seq__14363 = G__14402;
chunk__14365 = G__14403;
count__14366 = G__14404;
i__14367 = G__14405;
continue;
}
} else {
return null;
}
}
break;
}
});

Element.prototype.hoplon$core$ICustomElement$_set_styles_BANG_$arity$2 = (function (this$,kvs){
var this$__$1 = this;
var e = jQuery(this$__$1);
var seq__14375 = cljs.core.seq(kvs);
var chunk__14376 = null;
var count__14377 = (0);
var i__14378 = (0);
while(true){
if((i__14378 < count__14377)){
var vec__14379 = chunk__14376.cljs$core$IIndexed$_nth$arity$2(null,i__14378);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14379,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14379,(1),null);
e.css(cljs.core.name(k),[cljs.core.str(v)].join(''));

var G__14406 = seq__14375;
var G__14407 = chunk__14376;
var G__14408 = count__14377;
var G__14409 = (i__14378 + (1));
seq__14375 = G__14406;
chunk__14376 = G__14407;
count__14377 = G__14408;
i__14378 = G__14409;
continue;
} else {
var temp__6363__auto__ = cljs.core.seq(seq__14375);
if(temp__6363__auto__){
var seq__14375__$1 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14375__$1)){
var c__7922__auto__ = cljs.core.chunk_first(seq__14375__$1);
var G__14410 = cljs.core.chunk_rest(seq__14375__$1);
var G__14411 = c__7922__auto__;
var G__14412 = cljs.core.count(c__7922__auto__);
var G__14413 = (0);
seq__14375 = G__14410;
chunk__14376 = G__14411;
count__14377 = G__14412;
i__14378 = G__14413;
continue;
} else {
var vec__14382 = cljs.core.first(seq__14375__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14382,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14382,(1),null);
e.css(cljs.core.name(k),[cljs.core.str(v)].join(''));

var G__14414 = cljs.core.next(seq__14375__$1);
var G__14415 = null;
var G__14416 = (0);
var G__14417 = (0);
seq__14375 = G__14414;
chunk__14376 = G__14415;
count__14377 = G__14416;
i__14378 = G__14417;
continue;
}
} else {
return null;
}
}
break;
}
});

Element.prototype.hoplon$core$ICustomElement$_append_child_BANG_$arity$2 = (function (this$,child){
var this$__$1 = this;
if(cljs.core.not(hoplon.core.is_ie8)){
return this$__$1.appendChild(child);
} else {
try{return this$__$1.appendChild(child);
}catch (e14385){if((e14385 instanceof Error)){
var _ = e14385;
return null;
} else {
throw e14385;

}
}}
});

Element.prototype.hoplon$core$ICustomElement$_remove_child_BANG_$arity$2 = (function (this$,child){
var this$__$1 = this;
return this$__$1.removeChild(child);
});

Element.prototype.hoplon$core$ICustomElement$_replace_child_BANG_$arity$3 = (function (this$,new$,existing){
var this$__$1 = this;
return this$__$1.replaceChild(new$,existing);
});

Element.prototype.hoplon$core$ICustomElement$_insert_before_BANG_$arity$3 = (function (this$,new$,existing){
var this$__$1 = this;
return this$__$1.insertBefore(new$,existing);
});
hoplon.core.make_singleton_ctor = (function hoplon$core$make_singleton_ctor(tag){
return (function() { 
var G__14424__delegate = function (args){
var vec__14421 = hoplon.core.parse_args(args);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14421,(0),null);
var kids = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14421,(1),null);
var elem = (document.getElementsByTagName(tag)[(0)]);
hoplon.core.add_attributes_BANG_(elem,attrs);

if(cljs.core.not(cljs.core.cst$kw$static.cljs$core$IFn$_invoke$arity$1(attrs))){
elem.hoplonKids = null;

elem.innerHTML = "";

return hoplon.core.add_children_BANG_(elem,kids);
} else {
return null;
}
};
var G__14424 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14425__i = 0, G__14425__a = new Array(arguments.length -  0);
while (G__14425__i < G__14425__a.length) {G__14425__a[G__14425__i] = arguments[G__14425__i + 0]; ++G__14425__i;}
  args = new cljs.core.IndexedSeq(G__14425__a,0);
} 
return G__14424__delegate.call(this,args);};
G__14424.cljs$lang$maxFixedArity = 0;
G__14424.cljs$lang$applyTo = (function (arglist__14426){
var args = cljs.core.seq(arglist__14426);
return G__14424__delegate(args);
});
G__14424.cljs$core$IFn$_invoke$arity$variadic = G__14424__delegate;
return G__14424;
})()
;
});
hoplon.core.make_elem_ctor = (function hoplon$core$make_elem_ctor(tag){
return (function() { 
var G__14427__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(hoplon.core.ensure_kids_BANG_(document.createElement(tag)),args);
};
var G__14427 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14428__i = 0, G__14428__a = new Array(arguments.length -  0);
while (G__14428__i < G__14428__a.length) {G__14428__a[G__14428__i] = arguments[G__14428__i + 0]; ++G__14428__i;}
  args = new cljs.core.IndexedSeq(G__14428__a,0);
} 
return G__14427__delegate.call(this,args);};
G__14427.cljs$lang$maxFixedArity = 0;
G__14427.cljs$lang$applyTo = (function (arglist__14429){
var args = cljs.core.seq(arglist__14429);
return G__14427__delegate(args);
});
G__14427.cljs$core$IFn$_invoke$arity$variadic = G__14427__delegate;
return G__14427;
})()
;
});
hoplon.core.html = (function hoplon$core$html(var_args){
var args__8209__auto__ = [];
var len__8202__auto___14434 = arguments.length;
var i__8203__auto___14435 = (0);
while(true){
if((i__8203__auto___14435 < len__8202__auto___14434)){
args__8209__auto__.push((arguments[i__8203__auto___14435]));

var G__14436 = (i__8203__auto___14435 + (1));
i__8203__auto___14435 = G__14436;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((0) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((0)),(0),null)):null);
return hoplon.core.html.cljs$core$IFn$_invoke$arity$variadic(argseq__8210__auto__);
});

hoplon.core.html.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var vec__14431 = hoplon.core.parse_args(args);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14431,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14431,(1),null);
return hoplon.core.add_attributes_BANG_((document.getElementsByTagName("html")[(0)]),attrs);
});

hoplon.core.html.cljs$lang$maxFixedArity = (0);

hoplon.core.html.cljs$lang$applyTo = (function (seq14430){
return hoplon.core.html.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq14430));
});

hoplon.core.body = hoplon.core.make_singleton_ctor("body");
hoplon.core.head = hoplon.core.make_singleton_ctor("head");
hoplon.core.a = hoplon.core.make_elem_ctor("a");
hoplon.core.abbr = hoplon.core.make_elem_ctor("abbr");
hoplon.core.acronym = hoplon.core.make_elem_ctor("acronym");
hoplon.core.address = hoplon.core.make_elem_ctor("address");
hoplon.core.applet = hoplon.core.make_elem_ctor("applet");
hoplon.core.area = hoplon.core.make_elem_ctor("area");
hoplon.core.article = hoplon.core.make_elem_ctor("article");
hoplon.core.aside = hoplon.core.make_elem_ctor("aside");
hoplon.core.audio = hoplon.core.make_elem_ctor("audio");
hoplon.core.b = hoplon.core.make_elem_ctor("b");
hoplon.core.base = hoplon.core.make_elem_ctor("base");
hoplon.core.basefont = hoplon.core.make_elem_ctor("basefont");
hoplon.core.bdi = hoplon.core.make_elem_ctor("bdi");
hoplon.core.bdo = hoplon.core.make_elem_ctor("bdo");
hoplon.core.big = hoplon.core.make_elem_ctor("big");
hoplon.core.blockquote = hoplon.core.make_elem_ctor("blockquote");
hoplon.core.br = hoplon.core.make_elem_ctor("br");
hoplon.core.button = hoplon.core.make_elem_ctor("button");
hoplon.core.canvas = hoplon.core.make_elem_ctor("canvas");
hoplon.core.caption = hoplon.core.make_elem_ctor("caption");
hoplon.core.center = hoplon.core.make_elem_ctor("center");
hoplon.core.cite = hoplon.core.make_elem_ctor("cite");
hoplon.core.code = hoplon.core.make_elem_ctor("code");
hoplon.core.col = hoplon.core.make_elem_ctor("col");
hoplon.core.colgroup = hoplon.core.make_elem_ctor("colgroup");
hoplon.core.command = hoplon.core.make_elem_ctor("command");
hoplon.core.data = hoplon.core.make_elem_ctor("data");
hoplon.core.datalist = hoplon.core.make_elem_ctor("datalist");
hoplon.core.dd = hoplon.core.make_elem_ctor("dd");
hoplon.core.del = hoplon.core.make_elem_ctor("del");
hoplon.core.details = hoplon.core.make_elem_ctor("details");
hoplon.core.dfn = hoplon.core.make_elem_ctor("dfn");
hoplon.core.dialog = hoplon.core.make_elem_ctor("dialog");
hoplon.core.dir = hoplon.core.make_elem_ctor("dir");
hoplon.core.div = hoplon.core.make_elem_ctor("div");
hoplon.core.dl = hoplon.core.make_elem_ctor("dl");
hoplon.core.dt = hoplon.core.make_elem_ctor("dt");
hoplon.core.em = hoplon.core.make_elem_ctor("em");
hoplon.core.embed = hoplon.core.make_elem_ctor("embed");
hoplon.core.eventsource = hoplon.core.make_elem_ctor("eventsource");
hoplon.core.fieldset = hoplon.core.make_elem_ctor("fieldset");
hoplon.core.figcaption = hoplon.core.make_elem_ctor("figcaption");
hoplon.core.figure = hoplon.core.make_elem_ctor("figure");
hoplon.core.font = hoplon.core.make_elem_ctor("font");
hoplon.core.footer = hoplon.core.make_elem_ctor("footer");
hoplon.core.form = hoplon.core.make_elem_ctor("form");
hoplon.core.frame = hoplon.core.make_elem_ctor("frame");
hoplon.core.frameset = hoplon.core.make_elem_ctor("frameset");
hoplon.core.h1 = hoplon.core.make_elem_ctor("h1");
hoplon.core.h2 = hoplon.core.make_elem_ctor("h2");
hoplon.core.h3 = hoplon.core.make_elem_ctor("h3");
hoplon.core.h4 = hoplon.core.make_elem_ctor("h4");
hoplon.core.h5 = hoplon.core.make_elem_ctor("h5");
hoplon.core.h6 = hoplon.core.make_elem_ctor("h6");
hoplon.core.header = hoplon.core.make_elem_ctor("header");
hoplon.core.hgroup = hoplon.core.make_elem_ctor("hgroup");
hoplon.core.hr = hoplon.core.make_elem_ctor("hr");
hoplon.core.i = hoplon.core.make_elem_ctor("i");
hoplon.core.iframe = hoplon.core.make_elem_ctor("iframe");
hoplon.core.img = hoplon.core.make_elem_ctor("img");
hoplon.core.input = hoplon.core.make_elem_ctor("input");
hoplon.core.ins = hoplon.core.make_elem_ctor("ins");
hoplon.core.isindex = hoplon.core.make_elem_ctor("isindex");
hoplon.core.kbd = hoplon.core.make_elem_ctor("kbd");
hoplon.core.keygen = hoplon.core.make_elem_ctor("keygen");
hoplon.core.label = hoplon.core.make_elem_ctor("label");
hoplon.core.legend = hoplon.core.make_elem_ctor("legend");
hoplon.core.li = hoplon.core.make_elem_ctor("li");
hoplon.core.link = hoplon.core.make_elem_ctor("link");
hoplon.core.main = hoplon.core.make_elem_ctor("main");
hoplon.core.html_map = hoplon.core.make_elem_ctor("map");
hoplon.core.mark = hoplon.core.make_elem_ctor("mark");
hoplon.core.menu = hoplon.core.make_elem_ctor("menu");
hoplon.core.menuitem = hoplon.core.make_elem_ctor("menuitem");
hoplon.core.html_meta = hoplon.core.make_elem_ctor("meta");
hoplon.core.meter = hoplon.core.make_elem_ctor("meter");
hoplon.core.nav = hoplon.core.make_elem_ctor("nav");
hoplon.core.noframes = hoplon.core.make_elem_ctor("noframes");
hoplon.core.noscript = hoplon.core.make_elem_ctor("noscript");
hoplon.core.object = hoplon.core.make_elem_ctor("object");
hoplon.core.ol = hoplon.core.make_elem_ctor("ol");
hoplon.core.optgroup = hoplon.core.make_elem_ctor("optgroup");
hoplon.core.option = hoplon.core.make_elem_ctor("option");
hoplon.core.output = hoplon.core.make_elem_ctor("output");
hoplon.core.p = hoplon.core.make_elem_ctor("p");
hoplon.core.param = hoplon.core.make_elem_ctor("param");
hoplon.core.pre = hoplon.core.make_elem_ctor("pre");
hoplon.core.progress = hoplon.core.make_elem_ctor("progress");
hoplon.core.q = hoplon.core.make_elem_ctor("q");
hoplon.core.rp = hoplon.core.make_elem_ctor("rp");
hoplon.core.rt = hoplon.core.make_elem_ctor("rt");
hoplon.core.rtc = hoplon.core.make_elem_ctor("rtc");
hoplon.core.ruby = hoplon.core.make_elem_ctor("ruby");
hoplon.core.s = hoplon.core.make_elem_ctor("s");
hoplon.core.samp = hoplon.core.make_elem_ctor("samp");
hoplon.core.script = hoplon.core.make_elem_ctor("script");
hoplon.core.section = hoplon.core.make_elem_ctor("section");
hoplon.core.select = hoplon.core.make_elem_ctor("select");
hoplon.core.small = hoplon.core.make_elem_ctor("small");
hoplon.core.source = hoplon.core.make_elem_ctor("source");
hoplon.core.span = hoplon.core.make_elem_ctor("span");
hoplon.core.strike = hoplon.core.make_elem_ctor("strike");
hoplon.core.strong = hoplon.core.make_elem_ctor("strong");
hoplon.core.style = hoplon.core.make_elem_ctor("style");
hoplon.core.sub = hoplon.core.make_elem_ctor("sub");
hoplon.core.summary = hoplon.core.make_elem_ctor("summary");
hoplon.core.sup = hoplon.core.make_elem_ctor("sup");
hoplon.core.table = hoplon.core.make_elem_ctor("table");
hoplon.core.tbody = hoplon.core.make_elem_ctor("tbody");
hoplon.core.td = hoplon.core.make_elem_ctor("td");
hoplon.core.textarea = hoplon.core.make_elem_ctor("textarea");
hoplon.core.tfoot = hoplon.core.make_elem_ctor("tfoot");
hoplon.core.th = hoplon.core.make_elem_ctor("th");
hoplon.core.thead = hoplon.core.make_elem_ctor("thead");
hoplon.core.html_time = hoplon.core.make_elem_ctor("time");
hoplon.core.title = hoplon.core.make_elem_ctor("title");
hoplon.core.tr = hoplon.core.make_elem_ctor("tr");
hoplon.core.track = hoplon.core.make_elem_ctor("track");
hoplon.core.tt = hoplon.core.make_elem_ctor("tt");
hoplon.core.u = hoplon.core.make_elem_ctor("u");
hoplon.core.ul = hoplon.core.make_elem_ctor("ul");
hoplon.core.html_var = hoplon.core.make_elem_ctor("var");
hoplon.core.video = hoplon.core.make_elem_ctor("video");
hoplon.core.wbr = hoplon.core.make_elem_ctor("wbr");
hoplon.core.spliced = cljs.core.vector;
hoplon.core.$text = (function hoplon$core$$text(p1__14437_SHARP_){
return document.createTextNode(p1__14437_SHARP_);
});
hoplon.core.$comment = (function hoplon$core$$comment(p1__14438_SHARP_){
return document.createComment(p1__14438_SHARP_);
});
hoplon.core._LT__BANG___ = hoplon.core.$comment;
hoplon.core.___GT_ = cljs.core.cst$kw$hoplon$core_SLASH__DASH__DASH__GT_;
hoplon.core.add_initfn_BANG_ = (function hoplon$core$add_initfn_BANG_(f){
var G__14446 = (function (){
var G__14447 = (function (){
return (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
});
var G__14448 = (0);
return setTimeout(G__14447,G__14448);
});
return jQuery(G__14446);
});
hoplon.core.page_load = (function hoplon$core$page_load(){
return jQuery(document).trigger("page-load");
});
hoplon.core.on_page_load = (function hoplon$core$on_page_load(f){
return jQuery(document).on("page-load",f);
});
hoplon.core.add_initfn_BANG_((function (){
return jQuery("body").on("submit",(function (p1__14449_SHARP_){
var e = (function (){var G__14450 = p1__14449_SHARP_.target;
return jQuery(G__14450);
})();
if(cljs.core.truth_((function (){var or__7019__auto__ = e.attr("action");
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
return e.attr("method");
}
})())){
return null;
} else {
return p1__14449_SHARP_.preventDefault();
}
}));
}));
hoplon.core.text_val_BANG_ = (function hoplon$core$text_val_BANG_(var_args){
var args14451 = [];
var len__8202__auto___14454 = arguments.length;
var i__8203__auto___14455 = (0);
while(true){
if((i__8203__auto___14455 < len__8202__auto___14454)){
args14451.push((arguments[i__8203__auto___14455]));

var G__14456 = (i__8203__auto___14455 + (1));
i__8203__auto___14455 = G__14456;
continue;
} else {
}
break;
}

var G__14453 = args14451.length;
switch (G__14453) {
case 1:
return hoplon.core.text_val_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return hoplon.core.text_val_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14451.length)].join('')));

}
});

hoplon.core.text_val_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (e){
return e.val();
});

hoplon.core.text_val_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (e,v){
var v__$1 = [cljs.core.str(v)].join('');
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(v__$1,hoplon.core.text_val_BANG_.cljs$core$IFn$_invoke$arity$1(e))){
return e.val(v__$1);
} else {
return null;
}
});

hoplon.core.text_val_BANG_.cljs$lang$maxFixedArity = 2;

hoplon.core.check_val_BANG_ = (function hoplon$core$check_val_BANG_(var_args){
var args14458 = [];
var len__8202__auto___14461 = arguments.length;
var i__8203__auto___14462 = (0);
while(true){
if((i__8203__auto___14462 < len__8202__auto___14461)){
args14458.push((arguments[i__8203__auto___14462]));

var G__14463 = (i__8203__auto___14462 + (1));
i__8203__auto___14462 = G__14463;
continue;
} else {
}
break;
}

var G__14460 = args14458.length;
switch (G__14460) {
case 1:
return hoplon.core.check_val_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return hoplon.core.check_val_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14458.length)].join('')));

}
});

hoplon.core.check_val_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (e){
return e.is(":checked");
});

hoplon.core.check_val_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (e,v){
return e.prop("checked",cljs.core.boolean$(v));
});

hoplon.core.check_val_BANG_.cljs$lang$maxFixedArity = 2;

if(typeof hoplon.core.do_BANG_ !== 'undefined'){
} else {
hoplon.core.do_BANG_ = (function (){var method_table__8042__auto__ = (function (){var G__14465 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14465) : cljs.core.atom.call(null,G__14465));
})();
var prefer_table__8043__auto__ = (function (){var G__14466 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14466) : cljs.core.atom.call(null,G__14466));
})();
var method_cache__8044__auto__ = (function (){var G__14467 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14467) : cljs.core.atom.call(null,G__14467));
})();
var cached_hierarchy__8045__auto__ = (function (){var G__14468 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14468) : cljs.core.atom.call(null,G__14468));
})();
var hierarchy__8046__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$default,cljs.core.cst$kw$hoplon$core_SLASH_default], null),cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("hoplon.core","do!"),((function (method_table__8042__auto__,prefer_table__8043__auto__,method_cache__8044__auto__,cached_hierarchy__8045__auto__,hierarchy__8046__auto__){
return (function (elem,key,val){
var temp__6361__auto__ = cljs.core.namespace(key);
if(cljs.core.truth_(temp__6361__auto__)){
var n = temp__6361__auto__;
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(n,"*");
} else {
return key;
}
});})(method_table__8042__auto__,prefer_table__8043__auto__,method_cache__8044__auto__,cached_hierarchy__8045__auto__,hierarchy__8046__auto__))
,cljs.core.cst$kw$hoplon$core_SLASH_default,hierarchy__8046__auto__,method_table__8042__auto__,prefer_table__8043__auto__,method_cache__8044__auto__,cached_hierarchy__8045__auto__));
})();
}
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$hoplon$core_SLASH_default,(function (elem,key,val){
var G__14469 = elem;
var G__14470 = cljs.core.cst$kw$attr;
var G__14471 = cljs.core.PersistentArrayMap.fromArray([key,val], true, false);
return (hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3(G__14469,G__14470,G__14471) : hoplon.core.do_BANG_.call(null,G__14469,G__14470,G__14471));
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$css_SLASH__STAR_,(function (elem,key,val){
return hoplon.core.set_styles_BANG_(elem,key,val);
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$html_SLASH__STAR_,(function (elem,key,val){
return hoplon.core.set_attributes_BANG_(elem,key,val);
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$svg_SLASH__STAR_,(function (elem,key,val){
return hoplon.core.set_attributes_BANG_(elem,key,val);
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$value,(function() { 
var G__14472__delegate = function (elem,_,args){
var e = jQuery(elem);
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("checkbox",e.attr("type")))?hoplon.core.check_val_BANG_:hoplon.core.text_val_BANG_),e,args);
};
var G__14472 = function (elem,_,var_args){
var args = null;
if (arguments.length > 2) {
var G__14473__i = 0, G__14473__a = new Array(arguments.length -  2);
while (G__14473__i < G__14473__a.length) {G__14473__a[G__14473__i] = arguments[G__14473__i + 2]; ++G__14473__i;}
  args = new cljs.core.IndexedSeq(G__14473__a,0);
} 
return G__14472__delegate.call(this,elem,_,args);};
G__14472.cljs$lang$maxFixedArity = 2;
G__14472.cljs$lang$applyTo = (function (arglist__14474){
var elem = cljs.core.first(arglist__14474);
arglist__14474 = cljs.core.next(arglist__14474);
var _ = cljs.core.first(arglist__14474);
var args = cljs.core.rest(arglist__14474);
return G__14472__delegate(elem,_,args);
});
G__14472.cljs$core$IFn$_invoke$arity$variadic = G__14472__delegate;
return G__14472;
})()
);
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$attr,(function (elem,_,kvs){
return hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$2(elem,kvs);
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$class,(function (elem,_,kvs){
var elem__$1 = jQuery(elem);
var __GT_map = ((function (elem__$1){
return (function (p1__14475_SHARP_){
return cljs.core.zipmap(p1__14475_SHARP_,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(true));
});})(elem__$1))
;
var clmap = ((cljs.core.map_QMARK_(kvs))?kvs:__GT_map(((typeof kvs === 'string')?kvs.split(/\s+/):cljs.core.seq(kvs))));
var seq__14476 = cljs.core.seq(clmap);
var chunk__14477 = null;
var count__14478 = (0);
var i__14479 = (0);
while(true){
if((i__14479 < count__14478)){
var vec__14480 = chunk__14477.cljs$core$IIndexed$_nth$arity$2(null,i__14479);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14480,(0),null);
var p_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14480,(1),null);
elem__$1.toggleClass(cljs.core.name(c),cljs.core.boolean$(p_QMARK_));

var G__14486 = seq__14476;
var G__14487 = chunk__14477;
var G__14488 = count__14478;
var G__14489 = (i__14479 + (1));
seq__14476 = G__14486;
chunk__14477 = G__14487;
count__14478 = G__14488;
i__14479 = G__14489;
continue;
} else {
var temp__6363__auto__ = cljs.core.seq(seq__14476);
if(temp__6363__auto__){
var seq__14476__$1 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14476__$1)){
var c__7922__auto__ = cljs.core.chunk_first(seq__14476__$1);
var G__14490 = cljs.core.chunk_rest(seq__14476__$1);
var G__14491 = c__7922__auto__;
var G__14492 = cljs.core.count(c__7922__auto__);
var G__14493 = (0);
seq__14476 = G__14490;
chunk__14477 = G__14491;
count__14478 = G__14492;
i__14479 = G__14493;
continue;
} else {
var vec__14483 = cljs.core.first(seq__14476__$1);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14483,(0),null);
var p_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14483,(1),null);
elem__$1.toggleClass(cljs.core.name(c),cljs.core.boolean$(p_QMARK_));

var G__14494 = cljs.core.next(seq__14476__$1);
var G__14495 = null;
var G__14496 = (0);
var G__14497 = (0);
seq__14476 = G__14494;
chunk__14477 = G__14495;
count__14478 = G__14496;
i__14479 = G__14497;
continue;
}
} else {
return null;
}
}
break;
}
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$css,(function (elem,_,kvs){
return hoplon.core.set_styles_BANG_.cljs$core$IFn$_invoke$arity$2(elem,kvs);
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$toggle,(function (elem,_,v){
return jQuery(elem).toggle(cljs.core.boolean$(v));
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$slide_DASH_toggle,(function (elem,_,v){
if(cljs.core.truth_(v)){
return jQuery(elem).hide().slideDown("fast");
} else {
return jQuery(elem).slideUp("fast");
}
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$fade_DASH_toggle,(function (elem,_,v){
if(cljs.core.truth_(v)){
return jQuery(elem).hide().fadeIn("fast");
} else {
return jQuery(elem).fadeOut("fast");
}
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$focus,(function (elem,_,v){
var G__14498 = (function (){
if(cljs.core.truth_(v)){
return jQuery(elem).focus();
} else {
return jQuery(elem).focusout();
}
});
var G__14499 = (0);
return setTimeout(G__14498,G__14499);
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$select,(function (elem,_,___$1){
return jQuery(elem).select();
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$focus_DASH_select,(function (elem,_,v){
if(cljs.core.truth_(v)){
(hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3(elem,cljs.core.cst$kw$focus,v) : hoplon.core.do_BANG_.call(null,elem,cljs.core.cst$kw$focus,v));

return (hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3(elem,cljs.core.cst$kw$select,v) : hoplon.core.do_BANG_.call(null,elem,cljs.core.cst$kw$select,v));
} else {
return null;
}
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$text,(function (elem,_,v){
return jQuery(elem).text([cljs.core.str(v)].join(''));
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$html,(function (elem,_,v){
return jQuery(elem).html(v);
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$scroll_DASH_to,(function (elem,_,v){
if(cljs.core.truth_(v)){
var body = jQuery("body,html");
var elem__$1 = jQuery(elem);
return body.animate(cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$scrollTop,elem__$1.offset().top], null)));
} else {
return null;
}
}));
if(typeof hoplon.core.on_BANG_ !== 'undefined'){
} else {
hoplon.core.on_BANG_ = (function (){var method_table__8042__auto__ = (function (){var G__14500 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14500) : cljs.core.atom.call(null,G__14500));
})();
var prefer_table__8043__auto__ = (function (){var G__14501 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14501) : cljs.core.atom.call(null,G__14501));
})();
var method_cache__8044__auto__ = (function (){var G__14502 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14502) : cljs.core.atom.call(null,G__14502));
})();
var cached_hierarchy__8045__auto__ = (function (){var G__14503 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14503) : cljs.core.atom.call(null,G__14503));
})();
var hierarchy__8046__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$default,cljs.core.cst$kw$hoplon$core_SLASH_default], null),cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("hoplon.core","on!"),((function (method_table__8042__auto__,prefer_table__8043__auto__,method_cache__8044__auto__,cached_hierarchy__8045__auto__,hierarchy__8046__auto__){
return (function (elem,key,val){
var temp__6361__auto__ = cljs.core.namespace(key);
if(cljs.core.truth_(temp__6361__auto__)){
var n = temp__6361__auto__;
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(n,"*");
} else {
return key;
}
});})(method_table__8042__auto__,prefer_table__8043__auto__,method_cache__8044__auto__,cached_hierarchy__8045__auto__,hierarchy__8046__auto__))
,cljs.core.cst$kw$hoplon$core_SLASH_default,hierarchy__8046__auto__,method_table__8042__auto__,prefer_table__8043__auto__,method_cache__8044__auto__,cached_hierarchy__8045__auto__));
})();
}
jQuery.Event.prototype.cljs$core$IDeref$ = true;

jQuery.Event.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var this$__$1 = this;
return (function (){var G__14504 = this$__$1.target;
return jQuery(G__14504);
})().val();
});
hoplon.core.on_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$hoplon$core_SLASH_default,(function (elem,event,callback){
return hoplon.core.when_dom(elem,(function (){
return jQuery(elem).on(cljs.core.name(event),callback);
}));
}));
hoplon.core.on_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$html_SLASH__STAR_,(function (elem,event,callback){
return hoplon.core.when_dom(elem,(function (){
return jQuery(elem).on(cljs.core.name(event),callback);
}));
}));
/**
 * Given a cell items containing a seqable collection, constructs a cell that
 *   works like a fill vector. The template tpl is a function of one argument: the
 *   formula cell containing the ith item in items. The tpl function is called
 *   once (and only once) for each index in items. When the items collection
 *   shrinks the DOM element created by the template is not destroyed--it is only
 *   removed from the DOM and cached. When the items collection grows again those
 *   cached elements will be reinserted into the DOM at their original index.
 */
hoplon.core.loop_tpl_STAR_ = (function hoplon$core$loop_tpl_STAR_(items,tpl){
var on_deck = (function (){var G__14519 = cljs.core.List.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14519) : cljs.core.atom.call(null,G__14519));
})();
var items_seq = javelin.core.formula(((function (on_deck){
return (function (G__14520,G__14521){
return (G__14520.cljs$core$IFn$_invoke$arity$1 ? G__14520.cljs$core$IFn$_invoke$arity$1(G__14521) : G__14520.call(null,G__14521));
});})(on_deck))
).call(null,cljs.core.seq,items);
var ith_item = ((function (on_deck,items_seq){
return (function (p1__14505_SHARP_){
return javelin.core.formula(((function (on_deck,items_seq){
return (function (G__14524,G__14523,G__14522){
return (G__14522.cljs$core$IFn$_invoke$arity$2 ? G__14522.cljs$core$IFn$_invoke$arity$2(G__14523,G__14524) : G__14522.call(null,G__14523,G__14524));
});})(on_deck,items_seq))
).call(null,p1__14505_SHARP_,items_seq,hoplon.core.safe_nth);
});})(on_deck,items_seq))
;
var shift_BANG_ = ((function (on_deck,items_seq,ith_item){
return (function (p1__14506_SHARP_){
var x = cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__14506_SHARP_) : cljs.core.deref.call(null,p1__14506_SHARP_)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(p1__14506_SHARP_,cljs.core.rest);

return x;
});})(on_deck,items_seq,ith_item))
;
var current = javelin.core.cell.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$2(items_seq,((function (current,on_deck,items_seq,ith_item,shift_BANG_){
return (function (old_items,new_items){
var old = cljs.core.count(old_items);
var new$ = cljs.core.count(new_items);
var diff = (new$ - old);
if((diff > (0))){
var seq__14525 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$2(old,new$));
var chunk__14526 = null;
var count__14527 = (0);
var i__14528 = (0);
while(true){
if((i__14528 < count__14527)){
var i = chunk__14526.cljs$core$IIndexed$_nth$arity$2(null,i__14528);
var e_14531 = (function (){var or__7019__auto__ = shift_BANG_(on_deck);
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
var G__14529 = ith_item(i);
return (tpl.cljs$core$IFn$_invoke$arity$1 ? tpl.cljs$core$IFn$_invoke$arity$1(G__14529) : tpl.call(null,G__14529));
}
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(current,cljs.core.conj,e_14531);

var G__14532 = seq__14525;
var G__14533 = chunk__14526;
var G__14534 = count__14527;
var G__14535 = (i__14528 + (1));
seq__14525 = G__14532;
chunk__14526 = G__14533;
count__14527 = G__14534;
i__14528 = G__14535;
continue;
} else {
var temp__6363__auto__ = cljs.core.seq(seq__14525);
if(temp__6363__auto__){
var seq__14525__$1 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14525__$1)){
var c__7922__auto__ = cljs.core.chunk_first(seq__14525__$1);
var G__14536 = cljs.core.chunk_rest(seq__14525__$1);
var G__14537 = c__7922__auto__;
var G__14538 = cljs.core.count(c__7922__auto__);
var G__14539 = (0);
seq__14525 = G__14536;
chunk__14526 = G__14537;
count__14527 = G__14538;
i__14528 = G__14539;
continue;
} else {
var i = cljs.core.first(seq__14525__$1);
var e_14540 = (function (){var or__7019__auto__ = shift_BANG_(on_deck);
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
var G__14530 = ith_item(i);
return (tpl.cljs$core$IFn$_invoke$arity$1 ? tpl.cljs$core$IFn$_invoke$arity$1(G__14530) : tpl.call(null,G__14530));
}
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(current,cljs.core.conj,e_14540);

var G__14541 = cljs.core.next(seq__14525__$1);
var G__14542 = null;
var G__14543 = (0);
var G__14544 = (0);
seq__14525 = G__14541;
chunk__14526 = G__14542;
count__14527 = G__14543;
i__14528 = G__14544;
continue;
}
} else {
return null;
}
}
break;
}
} else {
if((diff < (0))){
var n__8032__auto__ = (- diff);
var _ = (0);
while(true){
if((_ < n__8032__auto__)){
var e_14545 = cljs.core.peek((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current) : cljs.core.deref.call(null,current)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(current,cljs.core.pop);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(on_deck,cljs.core.conj,e_14545);

var G__14546 = (_ + (1));
_ = G__14546;
continue;
} else {
return null;
}
break;
}
} else {
return null;
}
}
});})(current,on_deck,items_seq,ith_item,shift_BANG_))
);

return current;
});
/**
 * Defines a cell whose value is the URI fragment.
 */
hoplon.core.route_cell = (function hoplon$core$route_cell(var_args){
var args__8209__auto__ = [];
var len__8202__auto___14557 = arguments.length;
var i__8203__auto___14558 = (0);
while(true){
if((i__8203__auto___14558 < len__8202__auto___14557)){
args__8209__auto__.push((arguments[i__8203__auto___14558]));

var G__14559 = (i__8203__auto___14558 + (1));
i__8203__auto___14558 = G__14559;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((0) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((0)),(0),null)):null);
return hoplon.core.route_cell.cljs$core$IFn$_invoke$arity$variadic(argseq__8210__auto__);
});

hoplon.core.route_cell.cljs$core$IFn$_invoke$arity$variadic = (function (p__14548){
var vec__14549 = p__14548;
var default$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14549,(0),null);
var c = javelin.core.cell.cljs$core$IFn$_invoke$arity$1(window.location.hash);
var _ = javelin.core.formula(((function (c,vec__14549,default$){
return (function (G__14552,G__14554,G__14553){
var or__7019__auto__ = (function (){var and__7007__auto__ = (G__14552.cljs$core$IFn$_invoke$arity$1 ? G__14552.cljs$core$IFn$_invoke$arity$1(G__14553) : G__14552.call(null,G__14553));
if(cljs.core.truth_(and__7007__auto__)){
return G__14553;
} else {
return and__7007__auto__;
}
})();
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
return G__14554;
}
});})(c,vec__14549,default$))
).call(null,cljs.core.seq,default$,c);
jQuery(window).on("hashchange",((function (_,c,vec__14549,default$){
return (function (){
var G__14555 = c;
var G__14556 = window.location.hash;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__14555,G__14556) : cljs.core.reset_BANG_.call(null,G__14555,G__14556));
});})(_,c,vec__14549,default$))
);

return _;
});

hoplon.core.route_cell.cljs$lang$maxFixedArity = (0);

hoplon.core.route_cell.cljs$lang$applyTo = (function (seq14547){
return hoplon.core.route_cell.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq14547));
});

