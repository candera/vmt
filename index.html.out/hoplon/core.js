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
hoplon.core.static_elements = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p1__14091_SHARP_,p2__14092_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__14091_SHARP_,p2__14092_SHARP_.getAttribute("static-id"),p2__14092_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,jQuery("[static-id]").get());
/**
 * Adds f as a watcher to ref and evaluates (f init @ref) once. The watcher
 *   f is a function of two arguments: the previous and next values. If init is
 *   not provided the default (nil) will be used.
 */
hoplon.core.do_watch = (function hoplon$core$do_watch(var_args){
var args14093 = [];
var len__8202__auto___14098 = arguments.length;
var i__8203__auto___14099 = (0);
while(true){
if((i__8203__auto___14099 < len__8202__auto___14098)){
args14093.push((arguments[i__8203__auto___14099]));

var G__14100 = (i__8203__auto___14099 + (1));
i__8203__auto___14099 = G__14100;
continue;
} else {
}
break;
}

var G__14095 = args14093.length;
switch (G__14095) {
case 2:
return hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14093.length)].join('')));

}
});

hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$2 = (function (ref,f){
return hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$3(ref,null,f);
});

hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$3 = (function (ref,init,f){
var k = cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
var G__14096_14102 = init;
var G__14097_14103 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ref) : cljs.core.deref.call(null,ref));
(f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__14096_14102,G__14097_14103) : f.call(null,G__14096_14102,G__14097_14103));

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
var vec__14110 = cljs.core.reverse(clojure.string.split.cljs$core$IFn$_invoke$arity$2(path,/\//));
var seq__14111 = cljs.core.seq(vec__14110);
var first__14112 = cljs.core.first(seq__14111);
var seq__14111__$1 = cljs.core.next(seq__14111);
var f = first__14112;
var more = seq__14111__$1;
var vec__14113 = clojure.string.split.cljs$core$IFn$_invoke$arity$3(f,/\./,(2));
var f1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14113,(0),null);
var f2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14113,(1),null);
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",cljs.core.reverse(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(more,clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(f1),cljs.core.str("."),cljs.core.str("0f6a33b23fb04c179de3ca515cc7efc7")].join(''),f2], null)))));
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
var G__14116 = (i + (1));
var G__14117 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(ret,x.item(i));
i = G__14116;
ret = G__14117;
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
var G__14119 = [cljs.core.str(x)].join('');
return (hoplon.core.$text.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.$text.cljs$core$IFn$_invoke$arity$1(G__14119) : hoplon.core.$text.call(null,G__14119));
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
var G__14146 = new$__$1;
var vec__14148 = G__14146;
var seq__14149 = cljs.core.seq(vec__14148);
var first__14150 = cljs.core.first(seq__14149);
var seq__14149__$1 = cljs.core.next(seq__14149);
var x = first__14150;
var xs = seq__14149__$1;
var G__14147 = hoplon.core.child_vec(this$);
var vec__14151 = G__14147;
var seq__14152 = cljs.core.seq(vec__14151);
var first__14153 = cljs.core.first(seq__14152);
var seq__14152__$1 = cljs.core.next(seq__14152);
var k = first__14153;
var ks = seq__14152__$1;
var kids = vec__14151;
var G__14146__$1 = G__14146;
var G__14147__$1 = G__14147;
while(true){
var vec__14154 = G__14146__$1;
var seq__14155 = cljs.core.seq(vec__14154);
var first__14156 = cljs.core.first(seq__14155);
var seq__14155__$1 = cljs.core.next(seq__14155);
var x__$1 = first__14156;
var xs__$1 = seq__14155__$1;
var vec__14157 = G__14147__$1;
var seq__14158 = cljs.core.seq(vec__14157);
var first__14159 = cljs.core.first(seq__14158);
var seq__14158__$1 = cljs.core.next(seq__14158);
var k__$1 = first__14159;
var ks__$1 = seq__14158__$1;
var kids__$1 = vec__14157;
if(cljs.core.truth_((function (){var or__7019__auto__ = x__$1;
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
return k__$1;
}
})())){
var G__14160 = xs__$1;
var G__14161 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x__$1,k__$1))?ks__$1:((cljs.core.not(k__$1))?(function (){var ks__$2 = ks__$1;
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
G__14146__$1 = G__14160;
G__14147__$1 = G__14161;
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
var kids_14164 = (function (){var G__14163 = hoplon.core.child_vec(this$__$1);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14163) : cljs.core.atom.call(null,G__14163));
})();
this$__$1.hoplonKids = kids_14164;

hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$2(kids_14164,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(hoplon.core.merge_kids,this$__$1));
}

return this$__$1;
});
hoplon.core.set_appendChild_BANG_ = (function hoplon$core$set_appendChild_BANG_(this$,kidfn){
return this$.appendChild = (function (x){
var this$__$1 = this;
var x__$1 = x;
hoplon.core.ensure_kids_BANG_(this$__$1);

var kids_14167 = (kidfn.cljs$core$IFn$_invoke$arity$1 ? kidfn.cljs$core$IFn$_invoke$arity$1(this$__$1) : kidfn.call(null,this$__$1));
var i_14168 = cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(kids_14167) : cljs.core.deref.call(null,kids_14167)));
if(cljs.core.truth_(javelin.core.cell_QMARK_(x__$1))){
hoplon.core.do_watch.cljs$core$IFn$_invoke$arity$2(x__$1,((function (kids_14167,i_14168,x__$1,this$__$1){
return (function (p1__14166_SHARP_,p2__14165_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kids_14167,cljs.core.assoc,i_14168,p2__14165_SHARP_);
});})(kids_14167,i_14168,x__$1,this$__$1))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(kids_14167,cljs.core.assoc,i_14168,x__$1);
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
return (function (p1__14169_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,x__$1),p1__14169_SHARP_));
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
return (function (p1__14170_SHARP_){
return cljs.core.vec(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (x__$1,this$__$1){
return (function (z){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(z,y)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x__$1,z], null);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [z], null);
}
});})(x__$1,this$__$1))
,cljs.core.array_seq([p1__14170_SHARP_], 0)));
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
return (function (p1__14171_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (y__$1,this$__$1){
return (function (z){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(z,y__$1)){
return x;
} else {
return z;
}
});})(y__$1,this$__$1))
,p1__14171_SHARP_);
});})(y__$1,this$__$1))
);

return y__$1;
});
});
hoplon.core.set_setAttribute_BANG_ = (function hoplon$core$set_setAttribute_BANG_(this$,attrfn){
return this$.setAttribute = (function (k,v){
var this$__$1 = this;
var _ = undefined;
var kk_14172 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k);
var attr_14173 = (attrfn.cljs$core$IFn$_invoke$arity$1 ? attrfn.cljs$core$IFn$_invoke$arity$1(this$__$1) : attrfn.call(null,this$__$1));
var has_QMARK__14174 = (function (){var and__7007__auto__ = attr_14173;
if(cljs.core.truth_(and__7007__auto__)){
return cljs.core.contains_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(attr_14173) : cljs.core.deref.call(null,attr_14173)),kk_14172);
} else {
return and__7007__auto__;
}
})();
if(cljs.core.truth_(has_QMARK__14174)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(attr_14173,cljs.core.assoc,kk_14172,v);
} else {
hoplon.core.setAttribute.call(this$__$1,k,v);
}

return _;
});
});
hoplon.core.set_appendChild_BANG_(Element.prototype,(function (p1__14175_SHARP_){
return p1__14175_SHARP_.hoplonKids;
}));
hoplon.core.set_removeChild_BANG_(Element.prototype,(function (p1__14176_SHARP_){
return p1__14176_SHARP_.hoplonKids;
}));
hoplon.core.set_insertBefore_BANG_(Element.prototype,(function (p1__14177_SHARP_){
return p1__14177_SHARP_.hoplonKids;
}));
hoplon.core.set_replaceChild_BANG_(Element.prototype,(function (p1__14178_SHARP_){
return p1__14178_SHARP_.hoplonKids;
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
var args14179 = [];
var len__8202__auto___14186 = arguments.length;
var i__8203__auto___14187 = (0);
while(true){
if((i__8203__auto___14187 < len__8202__auto___14186)){
args14179.push((arguments[i__8203__auto___14187]));

var G__14188 = (i__8203__auto___14187 + (1));
i__8203__auto___14187 = G__14188;
continue;
} else {
}
break;
}

var G__14185 = args14179.length;
switch (G__14185) {
case 2:
return hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__8225__auto__ = (new cljs.core.IndexedSeq(args14179.slice((3)),(0),null));
return hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__8225__auto__);

}
});

hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (this$,kvs){
return hoplon.core._set_attributes_BANG_(this$,kvs);
});

hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (this$,k,v,kvs){
return hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$2(this$,cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.hash_map,k,v,kvs));
});

hoplon.core.set_attributes_BANG_.cljs$lang$applyTo = (function (seq14180){
var G__14181 = cljs.core.first(seq14180);
var seq14180__$1 = cljs.core.next(seq14180);
var G__14182 = cljs.core.first(seq14180__$1);
var seq14180__$2 = cljs.core.next(seq14180__$1);
var G__14183 = cljs.core.first(seq14180__$2);
var seq14180__$3 = cljs.core.next(seq14180__$2);
return hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__14181,G__14182,G__14183,seq14180__$3);
});

hoplon.core.set_attributes_BANG_.cljs$lang$maxFixedArity = (3);

hoplon.core.set_styles_BANG_ = (function hoplon$core$set_styles_BANG_(var_args){
var args14190 = [];
var len__8202__auto___14197 = arguments.length;
var i__8203__auto___14198 = (0);
while(true){
if((i__8203__auto___14198 < len__8202__auto___14197)){
args14190.push((arguments[i__8203__auto___14198]));

var G__14199 = (i__8203__auto___14198 + (1));
i__8203__auto___14198 = G__14199;
continue;
} else {
}
break;
}

var G__14196 = args14190.length;
switch (G__14196) {
case 2:
return hoplon.core.set_styles_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__8225__auto__ = (new cljs.core.IndexedSeq(args14190.slice((3)),(0),null));
return hoplon.core.set_styles_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__8225__auto__);

}
});

hoplon.core.set_styles_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (this$,kvs){
return hoplon.core._set_styles_BANG_(this$,kvs);
});

hoplon.core.set_styles_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (this$,k,v,kvs){
return hoplon.core.set_styles_BANG_.cljs$core$IFn$_invoke$arity$2(this$,cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.hash_map,k,v,kvs));
});

hoplon.core.set_styles_BANG_.cljs$lang$applyTo = (function (seq14191){
var G__14192 = cljs.core.first(seq14191);
var seq14191__$1 = cljs.core.next(seq14191);
var G__14193 = cljs.core.first(seq14191__$1);
var seq14191__$2 = cljs.core.next(seq14191__$1);
var G__14194 = cljs.core.first(seq14191__$2);
var seq14191__$3 = cljs.core.next(seq14191__$2);
return hoplon.core.set_styles_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__14192,G__14193,G__14194,seq14191__$3);
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
hoplon.core.node_QMARK_ = ((cljs.core.not(hoplon.core.is_ie8))?(function (p1__14201_SHARP_){
return (p1__14201_SHARP_ instanceof Node);
}):(function (p1__14202_SHARP_){
try{return p1__14202_SHARP_.nodeType;
}catch (e14203){if((e14203 instanceof Error)){
var _ = e14203;
return null;
} else {
throw e14203;

}
}}));
hoplon.core.vector_QMARK__STAR_ = ((cljs.core.not(hoplon.core.is_ie8))?cljs.core.vector_QMARK_:(function (p1__14204_SHARP_){
try{return cljs.core.vector_QMARK_(p1__14204_SHARP_);
}catch (e14205){if((e14205 instanceof Error)){
var _ = e14205;
return null;
} else {
throw e14205;

}
}}));
hoplon.core.seq_QMARK__STAR_ = ((cljs.core.not(hoplon.core.is_ie8))?cljs.core.seq_QMARK_:(function (p1__14206_SHARP_){
try{return cljs.core.seq_QMARK_(p1__14206_SHARP_);
}catch (e14207){if((e14207 instanceof Error)){
var _ = e14207;
return null;
} else {
throw e14207;

}
}}));
hoplon.core.safe_nth = (function hoplon$core$safe_nth(var_args){
var args14208 = [];
var len__8202__auto___14212 = arguments.length;
var i__8203__auto___14213 = (0);
while(true){
if((i__8203__auto___14213 < len__8202__auto___14212)){
args14208.push((arguments[i__8203__auto___14213]));

var G__14214 = (i__8203__auto___14213 + (1));
i__8203__auto___14213 = G__14214;
continue;
} else {
}
break;
}

var G__14210 = args14208.length;
switch (G__14210) {
case 2:
return hoplon.core.safe_nth.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return hoplon.core.safe_nth.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14208.length)].join('')));

}
});

hoplon.core.safe_nth.cljs$core$IFn$_invoke$arity$2 = (function (coll,index){
return hoplon.core.safe_nth.cljs$core$IFn$_invoke$arity$3(coll,index,null);
});

hoplon.core.safe_nth.cljs$core$IFn$_invoke$arity$3 = (function (coll,index,not_found){
try{return cljs.core.nth.cljs$core$IFn$_invoke$arity$3(coll,index,not_found);
}catch (e14211){if((e14211 instanceof Error)){
var _ = e14211;
return not_found;
} else {
throw e14211;

}
}});

hoplon.core.safe_nth.cljs$lang$maxFixedArity = 3;

hoplon.core.timeout = (function hoplon$core$timeout(var_args){
var args14216 = [];
var len__8202__auto___14219 = arguments.length;
var i__8203__auto___14220 = (0);
while(true){
if((i__8203__auto___14220 < len__8202__auto___14219)){
args14216.push((arguments[i__8203__auto___14220]));

var G__14221 = (i__8203__auto___14220 + (1));
i__8203__auto___14220 = G__14221;
continue;
} else {
}
break;
}

var G__14218 = args14216.length;
switch (G__14218) {
case 1:
return hoplon.core.timeout.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return hoplon.core.timeout.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14216.length)].join('')));

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
var G__14239 = args;
var vec__14240 = G__14239;
var seq__14241 = cljs.core.seq(vec__14240);
var first__14242 = cljs.core.first(seq__14241);
var seq__14241__$1 = cljs.core.next(seq__14241);
var arg = first__14242;
var args__$1 = seq__14241__$1;
var attr__$1 = attr;
var kids__$1 = kids;
var G__14239__$1 = G__14239;
while(true){
var attr__$2 = attr__$1;
var kids__$2 = kids__$1;
var vec__14243 = G__14239__$1;
var seq__14244 = cljs.core.seq(vec__14243);
var first__14245 = cljs.core.first(seq__14244);
var seq__14244__$1 = cljs.core.next(seq__14244);
var arg__$1 = first__14245;
var args__$2 = seq__14244__$1;
if(cljs.core.not(arg__$1)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.persistent_BANG_(attr__$2),cljs.core.persistent_BANG_(kids__$2)], null);
} else {
if(cljs.core.map_QMARK_(arg__$1)){
var G__14246 = cljs.core.reduce_kv(((function (attr__$1,kids__$1,G__14239__$1,attr__$2,kids__$2,vec__14243,seq__14244,first__14245,seq__14244__$1,arg__$1,args__$2,attr,kids,G__14239,vec__14240,seq__14241,first__14242,seq__14241__$1,arg,args__$1){
return (function (p1__14223_SHARP_,p2__14224_SHARP_,p3__14225_SHARP_){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(p1__14223_SHARP_,p2__14224_SHARP_,p3__14225_SHARP_);
});})(attr__$1,kids__$1,G__14239__$1,attr__$2,kids__$2,vec__14243,seq__14244,first__14245,seq__14244__$1,arg__$1,args__$2,attr,kids,G__14239,vec__14240,seq__14241,first__14242,seq__14241__$1,arg,args__$1))
,attr__$2,arg__$1);
var G__14247 = kids__$2;
var G__14248 = args__$2;
attr__$1 = G__14246;
kids__$1 = G__14247;
G__14239__$1 = G__14248;
continue;
} else {
if((arg__$1 instanceof cljs.core.Keyword)){
var G__14249 = cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(attr__$2,arg__$1,cljs.core.first(args__$2));
var G__14250 = kids__$2;
var G__14251 = cljs.core.rest(args__$2);
attr__$1 = G__14249;
kids__$1 = G__14250;
G__14239__$1 = G__14251;
continue;
} else {
if(cljs.core.truth_((hoplon.core.seq_QMARK__STAR_.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.seq_QMARK__STAR_.cljs$core$IFn$_invoke$arity$1(arg__$1) : hoplon.core.seq_QMARK__STAR_.call(null,arg__$1)))){
var G__14252 = attr__$2;
var G__14253 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,kids__$2,cljs.core.flatten(arg__$1));
var G__14254 = args__$2;
attr__$1 = G__14252;
kids__$1 = G__14253;
G__14239__$1 = G__14254;
continue;
} else {
if(cljs.core.truth_((hoplon.core.vector_QMARK__STAR_.cljs$core$IFn$_invoke$arity$1 ? hoplon.core.vector_QMARK__STAR_.cljs$core$IFn$_invoke$arity$1(arg__$1) : hoplon.core.vector_QMARK__STAR_.call(null,arg__$1)))){
var G__14255 = attr__$2;
var G__14256 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,kids__$2,cljs.core.flatten(arg__$1));
var G__14257 = args__$2;
attr__$1 = G__14255;
kids__$1 = G__14256;
G__14239__$1 = G__14257;
continue;
} else {
var G__14258 = attr__$2;
var G__14259 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(kids__$2,arg__$1);
var G__14260 = args__$2;
attr__$1 = G__14258;
kids__$1 = G__14259;
G__14239__$1 = G__14260;
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
return (function (p1__14262_SHARP_,p2__14261_SHARP_){
return (hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3(this$__$3,k,p2__14261_SHARP_) : hoplon.core.do_BANG_.call(null,this$__$3,k,p2__14261_SHARP_));
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
hoplon.core.add_children_BANG_ = (function hoplon$core$add_children_BANG_(this$,p__14263){
var vec__14271 = p__14263;
var seq__14272 = cljs.core.seq(vec__14271);
var first__14273 = cljs.core.first(seq__14272);
var seq__14272__$1 = cljs.core.next(seq__14272);
var child_cell = first__14273;
var _ = seq__14272__$1;
var kids = vec__14271;
var this$__$1 = this$;
var seq__14274_14278 = cljs.core.seq(cljs.core.flatten(kids));
var chunk__14275_14279 = null;
var count__14276_14280 = (0);
var i__14277_14281 = (0);
while(true){
if((i__14277_14281 < count__14276_14280)){
var x_14282 = chunk__14275_14279.cljs$core$IIndexed$_nth$arity$2(null,i__14277_14281);
var temp__6363__auto___14283 = hoplon.core.__GT_node(x_14282);
if(cljs.core.truth_(temp__6363__auto___14283)){
var x_14284__$1 = temp__6363__auto___14283;
hoplon.core.append_child_BANG_(this$__$1,x_14284__$1);
} else {
}

var G__14285 = seq__14274_14278;
var G__14286 = chunk__14275_14279;
var G__14287 = count__14276_14280;
var G__14288 = (i__14277_14281 + (1));
seq__14274_14278 = G__14285;
chunk__14275_14279 = G__14286;
count__14276_14280 = G__14287;
i__14277_14281 = G__14288;
continue;
} else {
var temp__6363__auto___14289 = cljs.core.seq(seq__14274_14278);
if(temp__6363__auto___14289){
var seq__14274_14290__$1 = temp__6363__auto___14289;
if(cljs.core.chunked_seq_QMARK_(seq__14274_14290__$1)){
var c__7922__auto___14291 = cljs.core.chunk_first(seq__14274_14290__$1);
var G__14292 = cljs.core.chunk_rest(seq__14274_14290__$1);
var G__14293 = c__7922__auto___14291;
var G__14294 = cljs.core.count(c__7922__auto___14291);
var G__14295 = (0);
seq__14274_14278 = G__14292;
chunk__14275_14279 = G__14293;
count__14276_14280 = G__14294;
i__14277_14281 = G__14295;
continue;
} else {
var x_14296 = cljs.core.first(seq__14274_14290__$1);
var temp__6363__auto___14297__$1 = hoplon.core.__GT_node(x_14296);
if(cljs.core.truth_(temp__6363__auto___14297__$1)){
var x_14298__$1 = temp__6363__auto___14297__$1;
hoplon.core.append_child_BANG_(this$__$1,x_14298__$1);
} else {
}

var G__14299 = cljs.core.next(seq__14274_14290__$1);
var G__14300 = null;
var G__14301 = (0);
var G__14302 = (0);
seq__14274_14278 = G__14299;
chunk__14275_14279 = G__14300;
count__14276_14280 = G__14301;
i__14277_14281 = G__14302;
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
var G__14335__delegate = function (self__,args){
var self____$1 = this;
var this$ = self____$1;
var vec__14304 = hoplon.core.parse_args(args);
var attr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14304,(0),null);
var kids = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14304,(1),null);
var G__14307 = this$;
hoplon.core.add_attributes_BANG_(G__14307,attr);

hoplon.core.add_children_BANG_(G__14307,kids);

return G__14307;
};
var G__14335 = function (self__,var_args){
var args = null;
if (arguments.length > 1) {
var G__14336__i = 0, G__14336__a = new Array(arguments.length -  1);
while (G__14336__i < G__14336__a.length) {G__14336__a[G__14336__i] = arguments[G__14336__i + 1]; ++G__14336__i;}
  args = new cljs.core.IndexedSeq(G__14336__a,0);
} 
return G__14335__delegate.call(this,self__,args);};
G__14335.cljs$lang$maxFixedArity = 1;
G__14335.cljs$lang$applyTo = (function (arglist__14337){
var self__ = cljs.core.first(arglist__14337);
var args = cljs.core.rest(arglist__14337);
return G__14335__delegate(self__,args);
});
G__14335.cljs$core$IFn$_invoke$arity$variadic = G__14335__delegate;
return G__14335;
})()
;

Element.prototype.apply = (function (self__,args14303){
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone(args14303)));
});

Element.prototype.cljs$core$IFn$_invoke$arity$2 = (function() { 
var G__14338__delegate = function (args){
var this$ = this;
var vec__14308 = hoplon.core.parse_args(args);
var attr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14308,(0),null);
var kids = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14308,(1),null);
var G__14311 = this$;
hoplon.core.add_attributes_BANG_(G__14311,attr);

hoplon.core.add_children_BANG_(G__14311,kids);

return G__14311;
};
var G__14338 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14339__i = 0, G__14339__a = new Array(arguments.length -  0);
while (G__14339__i < G__14339__a.length) {G__14339__a[G__14339__i] = arguments[G__14339__i + 0]; ++G__14339__i;}
  args = new cljs.core.IndexedSeq(G__14339__a,0);
} 
return G__14338__delegate.call(this,args);};
G__14338.cljs$lang$maxFixedArity = 0;
G__14338.cljs$lang$applyTo = (function (arglist__14340){
var args = cljs.core.seq(arglist__14340);
return G__14338__delegate(args);
});
G__14338.cljs$core$IFn$_invoke$arity$variadic = G__14338__delegate;
return G__14338;
})()
;

Element.prototype.hoplon$core$ICustomElement$ = true;

Element.prototype.hoplon$core$ICustomElement$_set_attributes_BANG_$arity$2 = (function (this$,kvs){
var this$__$1 = this;
var e = jQuery(this$__$1);
var seq__14312 = cljs.core.seq(kvs);
var chunk__14314 = null;
var count__14315 = (0);
var i__14316 = (0);
while(true){
if((i__14316 < count__14315)){
var vec__14318 = chunk__14314.cljs$core$IIndexed$_nth$arity$2(null,i__14316);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14318,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14318,(1),null);
var k_14341__$1 = cljs.core.name(k);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(false,v)){
e.removeAttr(k_14341__$1);
} else {
e.attr(k_14341__$1,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(true,v))?k_14341__$1:v));
}

var G__14342 = seq__14312;
var G__14343 = chunk__14314;
var G__14344 = count__14315;
var G__14345 = (i__14316 + (1));
seq__14312 = G__14342;
chunk__14314 = G__14343;
count__14315 = G__14344;
i__14316 = G__14345;
continue;
} else {
var temp__6363__auto__ = cljs.core.seq(seq__14312);
if(temp__6363__auto__){
var seq__14312__$1 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14312__$1)){
var c__7922__auto__ = cljs.core.chunk_first(seq__14312__$1);
var G__14346 = cljs.core.chunk_rest(seq__14312__$1);
var G__14347 = c__7922__auto__;
var G__14348 = cljs.core.count(c__7922__auto__);
var G__14349 = (0);
seq__14312 = G__14346;
chunk__14314 = G__14347;
count__14315 = G__14348;
i__14316 = G__14349;
continue;
} else {
var vec__14321 = cljs.core.first(seq__14312__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14321,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14321,(1),null);
var k_14350__$1 = cljs.core.name(k);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(false,v)){
e.removeAttr(k_14350__$1);
} else {
e.attr(k_14350__$1,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(true,v))?k_14350__$1:v));
}

var G__14351 = cljs.core.next(seq__14312__$1);
var G__14352 = null;
var G__14353 = (0);
var G__14354 = (0);
seq__14312 = G__14351;
chunk__14314 = G__14352;
count__14315 = G__14353;
i__14316 = G__14354;
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
var seq__14324 = cljs.core.seq(kvs);
var chunk__14325 = null;
var count__14326 = (0);
var i__14327 = (0);
while(true){
if((i__14327 < count__14326)){
var vec__14328 = chunk__14325.cljs$core$IIndexed$_nth$arity$2(null,i__14327);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14328,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14328,(1),null);
e.css(cljs.core.name(k),[cljs.core.str(v)].join(''));

var G__14355 = seq__14324;
var G__14356 = chunk__14325;
var G__14357 = count__14326;
var G__14358 = (i__14327 + (1));
seq__14324 = G__14355;
chunk__14325 = G__14356;
count__14326 = G__14357;
i__14327 = G__14358;
continue;
} else {
var temp__6363__auto__ = cljs.core.seq(seq__14324);
if(temp__6363__auto__){
var seq__14324__$1 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14324__$1)){
var c__7922__auto__ = cljs.core.chunk_first(seq__14324__$1);
var G__14359 = cljs.core.chunk_rest(seq__14324__$1);
var G__14360 = c__7922__auto__;
var G__14361 = cljs.core.count(c__7922__auto__);
var G__14362 = (0);
seq__14324 = G__14359;
chunk__14325 = G__14360;
count__14326 = G__14361;
i__14327 = G__14362;
continue;
} else {
var vec__14331 = cljs.core.first(seq__14324__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14331,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14331,(1),null);
e.css(cljs.core.name(k),[cljs.core.str(v)].join(''));

var G__14363 = cljs.core.next(seq__14324__$1);
var G__14364 = null;
var G__14365 = (0);
var G__14366 = (0);
seq__14324 = G__14363;
chunk__14325 = G__14364;
count__14326 = G__14365;
i__14327 = G__14366;
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
}catch (e14334){if((e14334 instanceof Error)){
var _ = e14334;
return null;
} else {
throw e14334;

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
var G__14373__delegate = function (args){
var vec__14370 = hoplon.core.parse_args(args);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14370,(0),null);
var kids = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14370,(1),null);
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
var G__14373 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14374__i = 0, G__14374__a = new Array(arguments.length -  0);
while (G__14374__i < G__14374__a.length) {G__14374__a[G__14374__i] = arguments[G__14374__i + 0]; ++G__14374__i;}
  args = new cljs.core.IndexedSeq(G__14374__a,0);
} 
return G__14373__delegate.call(this,args);};
G__14373.cljs$lang$maxFixedArity = 0;
G__14373.cljs$lang$applyTo = (function (arglist__14375){
var args = cljs.core.seq(arglist__14375);
return G__14373__delegate(args);
});
G__14373.cljs$core$IFn$_invoke$arity$variadic = G__14373__delegate;
return G__14373;
})()
;
});
hoplon.core.make_elem_ctor = (function hoplon$core$make_elem_ctor(tag){
return (function() { 
var G__14376__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(hoplon.core.ensure_kids_BANG_(document.createElement(tag)),args);
};
var G__14376 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14377__i = 0, G__14377__a = new Array(arguments.length -  0);
while (G__14377__i < G__14377__a.length) {G__14377__a[G__14377__i] = arguments[G__14377__i + 0]; ++G__14377__i;}
  args = new cljs.core.IndexedSeq(G__14377__a,0);
} 
return G__14376__delegate.call(this,args);};
G__14376.cljs$lang$maxFixedArity = 0;
G__14376.cljs$lang$applyTo = (function (arglist__14378){
var args = cljs.core.seq(arglist__14378);
return G__14376__delegate(args);
});
G__14376.cljs$core$IFn$_invoke$arity$variadic = G__14376__delegate;
return G__14376;
})()
;
});
hoplon.core.html = (function hoplon$core$html(var_args){
var args__8209__auto__ = [];
var len__8202__auto___14383 = arguments.length;
var i__8203__auto___14384 = (0);
while(true){
if((i__8203__auto___14384 < len__8202__auto___14383)){
args__8209__auto__.push((arguments[i__8203__auto___14384]));

var G__14385 = (i__8203__auto___14384 + (1));
i__8203__auto___14384 = G__14385;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((0) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((0)),(0),null)):null);
return hoplon.core.html.cljs$core$IFn$_invoke$arity$variadic(argseq__8210__auto__);
});

hoplon.core.html.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var vec__14380 = hoplon.core.parse_args(args);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14380,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14380,(1),null);
return hoplon.core.add_attributes_BANG_((document.getElementsByTagName("html")[(0)]),attrs);
});

hoplon.core.html.cljs$lang$maxFixedArity = (0);

hoplon.core.html.cljs$lang$applyTo = (function (seq14379){
return hoplon.core.html.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq14379));
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
hoplon.core.$text = (function hoplon$core$$text(p1__14386_SHARP_){
return document.createTextNode(p1__14386_SHARP_);
});
hoplon.core.$comment = (function hoplon$core$$comment(p1__14387_SHARP_){
return document.createComment(p1__14387_SHARP_);
});
hoplon.core._LT__BANG___ = hoplon.core.$comment;
hoplon.core.___GT_ = cljs.core.cst$kw$hoplon$core_SLASH__DASH__DASH__GT_;
hoplon.core.add_initfn_BANG_ = (function hoplon$core$add_initfn_BANG_(f){
var G__14395 = (function (){
var G__14396 = (function (){
return (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
});
var G__14397 = (0);
return setTimeout(G__14396,G__14397);
});
return jQuery(G__14395);
});
hoplon.core.page_load = (function hoplon$core$page_load(){
return jQuery(document).trigger("page-load");
});
hoplon.core.on_page_load = (function hoplon$core$on_page_load(f){
return jQuery(document).on("page-load",f);
});
hoplon.core.add_initfn_BANG_((function (){
return jQuery("body").on("submit",(function (p1__14398_SHARP_){
var e = (function (){var G__14399 = p1__14398_SHARP_.target;
return jQuery(G__14399);
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
return p1__14398_SHARP_.preventDefault();
}
}));
}));
hoplon.core.text_val_BANG_ = (function hoplon$core$text_val_BANG_(var_args){
var args14400 = [];
var len__8202__auto___14403 = arguments.length;
var i__8203__auto___14404 = (0);
while(true){
if((i__8203__auto___14404 < len__8202__auto___14403)){
args14400.push((arguments[i__8203__auto___14404]));

var G__14405 = (i__8203__auto___14404 + (1));
i__8203__auto___14404 = G__14405;
continue;
} else {
}
break;
}

var G__14402 = args14400.length;
switch (G__14402) {
case 1:
return hoplon.core.text_val_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return hoplon.core.text_val_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14400.length)].join('')));

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
var args14407 = [];
var len__8202__auto___14410 = arguments.length;
var i__8203__auto___14411 = (0);
while(true){
if((i__8203__auto___14411 < len__8202__auto___14410)){
args14407.push((arguments[i__8203__auto___14411]));

var G__14412 = (i__8203__auto___14411 + (1));
i__8203__auto___14411 = G__14412;
continue;
} else {
}
break;
}

var G__14409 = args14407.length;
switch (G__14409) {
case 1:
return hoplon.core.check_val_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return hoplon.core.check_val_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14407.length)].join('')));

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
hoplon.core.do_BANG_ = (function (){var method_table__8042__auto__ = (function (){var G__14414 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14414) : cljs.core.atom.call(null,G__14414));
})();
var prefer_table__8043__auto__ = (function (){var G__14415 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14415) : cljs.core.atom.call(null,G__14415));
})();
var method_cache__8044__auto__ = (function (){var G__14416 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14416) : cljs.core.atom.call(null,G__14416));
})();
var cached_hierarchy__8045__auto__ = (function (){var G__14417 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14417) : cljs.core.atom.call(null,G__14417));
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
var G__14418 = elem;
var G__14419 = cljs.core.cst$kw$attr;
var G__14420 = cljs.core.PersistentArrayMap.fromArray([key,val], true, false);
return (hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3 ? hoplon.core.do_BANG_.cljs$core$IFn$_invoke$arity$3(G__14418,G__14419,G__14420) : hoplon.core.do_BANG_.call(null,G__14418,G__14419,G__14420));
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
var G__14421__delegate = function (elem,_,args){
var e = jQuery(elem);
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("checkbox",e.attr("type")))?hoplon.core.check_val_BANG_:hoplon.core.text_val_BANG_),e,args);
};
var G__14421 = function (elem,_,var_args){
var args = null;
if (arguments.length > 2) {
var G__14422__i = 0, G__14422__a = new Array(arguments.length -  2);
while (G__14422__i < G__14422__a.length) {G__14422__a[G__14422__i] = arguments[G__14422__i + 2]; ++G__14422__i;}
  args = new cljs.core.IndexedSeq(G__14422__a,0);
} 
return G__14421__delegate.call(this,elem,_,args);};
G__14421.cljs$lang$maxFixedArity = 2;
G__14421.cljs$lang$applyTo = (function (arglist__14423){
var elem = cljs.core.first(arglist__14423);
arglist__14423 = cljs.core.next(arglist__14423);
var _ = cljs.core.first(arglist__14423);
var args = cljs.core.rest(arglist__14423);
return G__14421__delegate(elem,_,args);
});
G__14421.cljs$core$IFn$_invoke$arity$variadic = G__14421__delegate;
return G__14421;
})()
);
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$attr,(function (elem,_,kvs){
return hoplon.core.set_attributes_BANG_.cljs$core$IFn$_invoke$arity$2(elem,kvs);
}));
hoplon.core.do_BANG_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$class,(function (elem,_,kvs){
var elem__$1 = jQuery(elem);
var __GT_map = ((function (elem__$1){
return (function (p1__14424_SHARP_){
return cljs.core.zipmap(p1__14424_SHARP_,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(true));
});})(elem__$1))
;
var clmap = ((cljs.core.map_QMARK_(kvs))?kvs:__GT_map(((typeof kvs === 'string')?kvs.split(/\s+/):cljs.core.seq(kvs))));
var seq__14425 = cljs.core.seq(clmap);
var chunk__14426 = null;
var count__14427 = (0);
var i__14428 = (0);
while(true){
if((i__14428 < count__14427)){
var vec__14429 = chunk__14426.cljs$core$IIndexed$_nth$arity$2(null,i__14428);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14429,(0),null);
var p_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14429,(1),null);
elem__$1.toggleClass(cljs.core.name(c),cljs.core.boolean$(p_QMARK_));

var G__14435 = seq__14425;
var G__14436 = chunk__14426;
var G__14437 = count__14427;
var G__14438 = (i__14428 + (1));
seq__14425 = G__14435;
chunk__14426 = G__14436;
count__14427 = G__14437;
i__14428 = G__14438;
continue;
} else {
var temp__6363__auto__ = cljs.core.seq(seq__14425);
if(temp__6363__auto__){
var seq__14425__$1 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14425__$1)){
var c__7922__auto__ = cljs.core.chunk_first(seq__14425__$1);
var G__14439 = cljs.core.chunk_rest(seq__14425__$1);
var G__14440 = c__7922__auto__;
var G__14441 = cljs.core.count(c__7922__auto__);
var G__14442 = (0);
seq__14425 = G__14439;
chunk__14426 = G__14440;
count__14427 = G__14441;
i__14428 = G__14442;
continue;
} else {
var vec__14432 = cljs.core.first(seq__14425__$1);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14432,(0),null);
var p_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14432,(1),null);
elem__$1.toggleClass(cljs.core.name(c),cljs.core.boolean$(p_QMARK_));

var G__14443 = cljs.core.next(seq__14425__$1);
var G__14444 = null;
var G__14445 = (0);
var G__14446 = (0);
seq__14425 = G__14443;
chunk__14426 = G__14444;
count__14427 = G__14445;
i__14428 = G__14446;
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
var G__14447 = (function (){
if(cljs.core.truth_(v)){
return jQuery(elem).focus();
} else {
return jQuery(elem).focusout();
}
});
var G__14448 = (0);
return setTimeout(G__14447,G__14448);
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
hoplon.core.on_BANG_ = (function (){var method_table__8042__auto__ = (function (){var G__14449 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14449) : cljs.core.atom.call(null,G__14449));
})();
var prefer_table__8043__auto__ = (function (){var G__14450 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14450) : cljs.core.atom.call(null,G__14450));
})();
var method_cache__8044__auto__ = (function (){var G__14451 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14451) : cljs.core.atom.call(null,G__14451));
})();
var cached_hierarchy__8045__auto__ = (function (){var G__14452 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14452) : cljs.core.atom.call(null,G__14452));
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
return (function (){var G__14453 = this$__$1.target;
return jQuery(G__14453);
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
var on_deck = (function (){var G__14468 = cljs.core.List.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14468) : cljs.core.atom.call(null,G__14468));
})();
var items_seq = javelin.core.formula(((function (on_deck){
return (function (G__14469,G__14470){
return (G__14469.cljs$core$IFn$_invoke$arity$1 ? G__14469.cljs$core$IFn$_invoke$arity$1(G__14470) : G__14469.call(null,G__14470));
});})(on_deck))
).call(null,cljs.core.seq,items);
var ith_item = ((function (on_deck,items_seq){
return (function (p1__14454_SHARP_){
return javelin.core.formula(((function (on_deck,items_seq){
return (function (G__14472,G__14473,G__14471){
return (G__14471.cljs$core$IFn$_invoke$arity$2 ? G__14471.cljs$core$IFn$_invoke$arity$2(G__14472,G__14473) : G__14471.call(null,G__14472,G__14473));
});})(on_deck,items_seq))
).call(null,items_seq,p1__14454_SHARP_,hoplon.core.safe_nth);
});})(on_deck,items_seq))
;
var shift_BANG_ = ((function (on_deck,items_seq,ith_item){
return (function (p1__14455_SHARP_){
var x = cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(p1__14455_SHARP_) : cljs.core.deref.call(null,p1__14455_SHARP_)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(p1__14455_SHARP_,cljs.core.rest);

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
var seq__14474 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$2(old,new$));
var chunk__14475 = null;
var count__14476 = (0);
var i__14477 = (0);
while(true){
if((i__14477 < count__14476)){
var i = chunk__14475.cljs$core$IIndexed$_nth$arity$2(null,i__14477);
var e_14480 = (function (){var or__7019__auto__ = shift_BANG_(on_deck);
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
var G__14478 = ith_item(i);
return (tpl.cljs$core$IFn$_invoke$arity$1 ? tpl.cljs$core$IFn$_invoke$arity$1(G__14478) : tpl.call(null,G__14478));
}
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(current,cljs.core.conj,e_14480);

var G__14481 = seq__14474;
var G__14482 = chunk__14475;
var G__14483 = count__14476;
var G__14484 = (i__14477 + (1));
seq__14474 = G__14481;
chunk__14475 = G__14482;
count__14476 = G__14483;
i__14477 = G__14484;
continue;
} else {
var temp__6363__auto__ = cljs.core.seq(seq__14474);
if(temp__6363__auto__){
var seq__14474__$1 = temp__6363__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14474__$1)){
var c__7922__auto__ = cljs.core.chunk_first(seq__14474__$1);
var G__14485 = cljs.core.chunk_rest(seq__14474__$1);
var G__14486 = c__7922__auto__;
var G__14487 = cljs.core.count(c__7922__auto__);
var G__14488 = (0);
seq__14474 = G__14485;
chunk__14475 = G__14486;
count__14476 = G__14487;
i__14477 = G__14488;
continue;
} else {
var i = cljs.core.first(seq__14474__$1);
var e_14489 = (function (){var or__7019__auto__ = shift_BANG_(on_deck);
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
var G__14479 = ith_item(i);
return (tpl.cljs$core$IFn$_invoke$arity$1 ? tpl.cljs$core$IFn$_invoke$arity$1(G__14479) : tpl.call(null,G__14479));
}
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(current,cljs.core.conj,e_14489);

var G__14490 = cljs.core.next(seq__14474__$1);
var G__14491 = null;
var G__14492 = (0);
var G__14493 = (0);
seq__14474 = G__14490;
chunk__14475 = G__14491;
count__14476 = G__14492;
i__14477 = G__14493;
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
var e_14494 = cljs.core.peek((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current) : cljs.core.deref.call(null,current)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(current,cljs.core.pop);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(on_deck,cljs.core.conj,e_14494);

var G__14495 = (_ + (1));
_ = G__14495;
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
var len__8202__auto___14506 = arguments.length;
var i__8203__auto___14507 = (0);
while(true){
if((i__8203__auto___14507 < len__8202__auto___14506)){
args__8209__auto__.push((arguments[i__8203__auto___14507]));

var G__14508 = (i__8203__auto___14507 + (1));
i__8203__auto___14507 = G__14508;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((0) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((0)),(0),null)):null);
return hoplon.core.route_cell.cljs$core$IFn$_invoke$arity$variadic(argseq__8210__auto__);
});

hoplon.core.route_cell.cljs$core$IFn$_invoke$arity$variadic = (function (p__14497){
var vec__14498 = p__14497;
var default$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14498,(0),null);
var c = javelin.core.cell.cljs$core$IFn$_invoke$arity$1(window.location.hash);
var _ = javelin.core.formula(((function (c,vec__14498,default$){
return (function (G__14501,G__14503,G__14502){
var or__7019__auto__ = (function (){var and__7007__auto__ = (G__14501.cljs$core$IFn$_invoke$arity$1 ? G__14501.cljs$core$IFn$_invoke$arity$1(G__14502) : G__14501.call(null,G__14502));
if(cljs.core.truth_(and__7007__auto__)){
return G__14502;
} else {
return and__7007__auto__;
}
})();
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
return G__14503;
}
});})(c,vec__14498,default$))
).call(null,cljs.core.seq,default$,c);
jQuery(window).on("hashchange",((function (_,c,vec__14498,default$){
return (function (){
var G__14504 = c;
var G__14505 = window.location.hash;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__14504,G__14505) : cljs.core.reset_BANG_.call(null,G__14504,G__14505));
});})(_,c,vec__14498,default$))
);

return _;
});

hoplon.core.route_cell.cljs$lang$maxFixedArity = (0);

hoplon.core.route_cell.cljs$lang$applyTo = (function (seq14496){
return hoplon.core.route_cell.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq14496));
});

