// Compiled by ClojureScript 1.9.76 {:static-fns true, :optimize-constants true}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var args16263 = [];
var len__8202__auto___16269 = arguments.length;
var i__8203__auto___16270 = (0);
while(true){
if((i__8203__auto___16270 < len__8202__auto___16269)){
args16263.push((arguments[i__8203__auto___16270]));

var G__16271 = (i__8203__auto___16270 + (1));
i__8203__auto___16270 = G__16271;
continue;
} else {
}
break;
}

var G__16265 = args16263.length;
switch (G__16265) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16263.length)].join('')));

}
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if(typeof cljs.core.async.t_cljs$core$async16266 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16266 = (function (f,blockable,meta16267){
this.f = f;
this.blockable = blockable;
this.meta16267 = meta16267;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async16266.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16268,meta16267__$1){
var self__ = this;
var _16268__$1 = this;
return (new cljs.core.async.t_cljs$core$async16266(self__.f,self__.blockable,meta16267__$1));
});

cljs.core.async.t_cljs$core$async16266.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16268){
var self__ = this;
var _16268__$1 = this;
return self__.meta16267;
});

cljs.core.async.t_cljs$core$async16266.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async16266.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async16266.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
});

cljs.core.async.t_cljs$core$async16266.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async16266.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$f,cljs.core.cst$sym$blockable,cljs.core.cst$sym$meta16267], null);
});

cljs.core.async.t_cljs$core$async16266.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async16266.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16266";

cljs.core.async.t_cljs$core$async16266.cljs$lang$ctorPrWriter = (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async16266");
});

cljs.core.async.__GT_t_cljs$core$async16266 = (function cljs$core$async$__GT_t_cljs$core$async16266(f__$1,blockable__$1,meta16267){
return (new cljs.core.async.t_cljs$core$async16266(f__$1,blockable__$1,meta16267));
});

}

return (new cljs.core.async.t_cljs$core$async16266(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2;

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if(!((buff == null))){
if((false) || (buff.cljs$core$async$impl$protocols$UnblockingBuffer$)){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var args16275 = [];
var len__8202__auto___16278 = arguments.length;
var i__8203__auto___16279 = (0);
while(true){
if((i__8203__auto___16279 < len__8202__auto___16278)){
args16275.push((arguments[i__8203__auto___16279]));

var G__16280 = (i__8203__auto___16279 + (1));
i__8203__auto___16279 = G__16280;
continue;
} else {
}
break;
}

var G__16277 = args16275.length;
switch (G__16277) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16275.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("buffer must be supplied when transducer is"),cljs.core.str("\n"),cljs.core.str("buf-or-n")].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var args16282 = [];
var len__8202__auto___16285 = arguments.length;
var i__8203__auto___16286 = (0);
while(true){
if((i__8203__auto___16286 < len__8202__auto___16285)){
args16282.push((arguments[i__8203__auto___16286]));

var G__16287 = (i__8203__auto___16286 + (1));
i__8203__auto___16286 = G__16287;
continue;
} else {
}
break;
}

var G__16284 = args16282.length;
switch (G__16284) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16282.length)].join('')));

}
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
});

cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var args16289 = [];
var len__8202__auto___16292 = arguments.length;
var i__8203__auto___16293 = (0);
while(true){
if((i__8203__auto___16293 < len__8202__auto___16292)){
args16289.push((arguments[i__8203__auto___16293]));

var G__16294 = (i__8203__auto___16293 + (1));
i__8203__auto___16293 = G__16294;
continue;
} else {
}
break;
}

var G__16291 = args16289.length;
switch (G__16291) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16289.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_16296 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_16296) : fn1.call(null,val_16296));
} else {
cljs.core.async.impl.dispatch.run(((function (val_16296,ret){
return (function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_16296) : fn1.call(null,val_16296));
});})(val_16296,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var args16297 = [];
var len__8202__auto___16300 = arguments.length;
var i__8203__auto___16301 = (0);
while(true){
if((i__8203__auto___16301 < len__8202__auto___16300)){
args16297.push((arguments[i__8203__auto___16301]));

var G__16302 = (i__8203__auto___16301 + (1));
i__8203__auto___16301 = G__16302;
continue;
} else {
}
break;
}

var G__16299 = args16297.length;
switch (G__16299) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16297.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__6361__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__6361__auto__)){
var ret = temp__6361__auto__;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__6361__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__6361__auto__)){
var retb = temp__6361__auto__;
var ret = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(retb) : cljs.core.deref.call(null,retb));
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run(((function (ret,retb,temp__6361__auto__){
return (function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
});})(ret,retb,temp__6361__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__8032__auto___16304 = n;
var x_16305 = (0);
while(true){
if((x_16305 < n__8032__auto___16304)){
(a[x_16305] = (0));

var G__16306 = (x_16305 + (1));
x_16305 = G__16306;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,n)){
return a;
} else {
var j = cljs.core.rand_int(i);
(a[i] = (a[j]));

(a[j] = i);

var G__16307 = (i + (1));
i = G__16307;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true) : cljs.core.atom.call(null,true));
if(typeof cljs.core.async.t_cljs$core$async16311 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16311 = (function (alt_flag,flag,meta16312){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta16312 = meta16312;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async16311.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_16313,meta16312__$1){
var self__ = this;
var _16313__$1 = this;
return (new cljs.core.async.t_cljs$core$async16311(self__.alt_flag,self__.flag,meta16312__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async16311.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_16313){
var self__ = this;
var _16313__$1 = this;
return self__.meta16312;
});})(flag))
;

cljs.core.async.t_cljs$core$async16311.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async16311.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.flag) : cljs.core.deref.call(null,self__.flag));
});})(flag))
;

cljs.core.async.t_cljs$core$async16311.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async16311.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(self__.flag,null) : cljs.core.reset_BANG_.call(null,self__.flag,null));

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async16311.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$alt_DASH_flag,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$private,true,cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),cljs.core.cst$sym$flag,cljs.core.cst$sym$meta16312], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async16311.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async16311.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16311";

cljs.core.async.t_cljs$core$async16311.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async16311");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async16311 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async16311(alt_flag__$1,flag__$1,meta16312){
return (new cljs.core.async.t_cljs$core$async16311(alt_flag__$1,flag__$1,meta16312));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async16311(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async16317 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16317 = (function (alt_handler,flag,cb,meta16318){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta16318 = meta16318;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async16317.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16319,meta16318__$1){
var self__ = this;
var _16319__$1 = this;
return (new cljs.core.async.t_cljs$core$async16317(self__.alt_handler,self__.flag,self__.cb,meta16318__$1));
});

cljs.core.async.t_cljs$core$async16317.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16319){
var self__ = this;
var _16319__$1 = this;
return self__.meta16318;
});

cljs.core.async.t_cljs$core$async16317.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async16317.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
});

cljs.core.async.t_cljs$core$async16317.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async16317.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async16317.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$alt_DASH_handler,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$private,true,cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$flag,cljs.core.cst$sym$cb], null)))], null)),cljs.core.cst$sym$flag,cljs.core.cst$sym$cb,cljs.core.cst$sym$meta16318], null);
});

cljs.core.async.t_cljs$core$async16317.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async16317.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16317";

cljs.core.async.t_cljs$core$async16317.cljs$lang$ctorPrWriter = (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async16317");
});

cljs.core.async.__GT_t_cljs$core$async16317 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async16317(alt_handler__$1,flag__$1,cb__$1,meta16318){
return (new cljs.core.async.t_cljs$core$async16317(alt_handler__$1,flag__$1,cb__$1,meta16318));
});

}

return (new cljs.core.async.t_cljs$core$async16317(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag();
var n = cljs.core.count(ports);
var idxs = cljs.core.async.random_array(n);
var priority = cljs.core.cst$kw$priority.cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__16320_SHARP_){
var G__16324 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__16320_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__16324) : fret.call(null,G__16324));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__16321_SHARP_){
var G__16325 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__16321_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__16325) : fret.call(null,G__16325));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(vbox) : cljs.core.deref.call(null,vbox)),(function (){var or__7019__auto__ = wport;
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
return port;
}
})()], null));
} else {
var G__16326 = (i + (1));
i = G__16326;
continue;
}
} else {
return null;
}
break;
}
})();
var or__7019__auto__ = ret;
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,cljs.core.cst$kw$default)){
var temp__6363__auto__ = (function (){var and__7007__auto__ = cljs.core.async.impl.protocols.active_QMARK_(flag);
if(cljs.core.truth_(and__7007__auto__)){
return cljs.core.async.impl.protocols.commit(flag);
} else {
return and__7007__auto__;
}
})();
if(cljs.core.truth_(temp__6363__auto__)){
var got = temp__6363__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$default.cljs$core$IFn$_invoke$arity$1(opts),cljs.core.cst$kw$default], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__8209__auto__ = [];
var len__8202__auto___16332 = arguments.length;
var i__8203__auto___16333 = (0);
while(true){
if((i__8203__auto___16333 < len__8202__auto___16332)){
args__8209__auto__.push((arguments[i__8203__auto___16333]));

var G__16334 = (i__8203__auto___16333 + (1));
i__8203__auto___16333 = G__16334;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((1) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__8210__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__16329){
var map__16330 = p__16329;
var map__16330__$1 = ((((!((map__16330 == null)))?((((map__16330.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16330.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16330):map__16330);
var opts = map__16330__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq16327){
var G__16328 = cljs.core.first(seq16327);
var seq16327__$1 = cljs.core.next(seq16327);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__16328,seq16327__$1);
});

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args16335 = [];
var len__8202__auto___16385 = arguments.length;
var i__8203__auto___16386 = (0);
while(true){
if((i__8203__auto___16386 < len__8202__auto___16385)){
args16335.push((arguments[i__8203__auto___16386]));

var G__16387 = (i__8203__auto___16386 + (1));
i__8203__auto___16386 = G__16387;
continue;
} else {
}
break;
}

var G__16337 = args16335.length;
switch (G__16337) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16335.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__16204__auto___16389 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___16389){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___16389){
return (function (state_16361){
var state_val_16362 = (state_16361[(1)]);
if((state_val_16362 === (7))){
var inst_16357 = (state_16361[(2)]);
var state_16361__$1 = state_16361;
var statearr_16363_16390 = state_16361__$1;
(statearr_16363_16390[(2)] = inst_16357);

(statearr_16363_16390[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16362 === (1))){
var state_16361__$1 = state_16361;
var statearr_16364_16391 = state_16361__$1;
(statearr_16364_16391[(2)] = null);

(statearr_16364_16391[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16362 === (4))){
var inst_16340 = (state_16361[(7)]);
var inst_16340__$1 = (state_16361[(2)]);
var inst_16341 = (inst_16340__$1 == null);
var state_16361__$1 = (function (){var statearr_16365 = state_16361;
(statearr_16365[(7)] = inst_16340__$1);

return statearr_16365;
})();
if(cljs.core.truth_(inst_16341)){
var statearr_16366_16392 = state_16361__$1;
(statearr_16366_16392[(1)] = (5));

} else {
var statearr_16367_16393 = state_16361__$1;
(statearr_16367_16393[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16362 === (13))){
var state_16361__$1 = state_16361;
var statearr_16368_16394 = state_16361__$1;
(statearr_16368_16394[(2)] = null);

(statearr_16368_16394[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16362 === (6))){
var inst_16340 = (state_16361[(7)]);
var state_16361__$1 = state_16361;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16361__$1,(11),to,inst_16340);
} else {
if((state_val_16362 === (3))){
var inst_16359 = (state_16361[(2)]);
var state_16361__$1 = state_16361;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16361__$1,inst_16359);
} else {
if((state_val_16362 === (12))){
var state_16361__$1 = state_16361;
var statearr_16369_16395 = state_16361__$1;
(statearr_16369_16395[(2)] = null);

(statearr_16369_16395[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16362 === (2))){
var state_16361__$1 = state_16361;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16361__$1,(4),from);
} else {
if((state_val_16362 === (11))){
var inst_16350 = (state_16361[(2)]);
var state_16361__$1 = state_16361;
if(cljs.core.truth_(inst_16350)){
var statearr_16370_16396 = state_16361__$1;
(statearr_16370_16396[(1)] = (12));

} else {
var statearr_16371_16397 = state_16361__$1;
(statearr_16371_16397[(1)] = (13));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16362 === (9))){
var state_16361__$1 = state_16361;
var statearr_16372_16398 = state_16361__$1;
(statearr_16372_16398[(2)] = null);

(statearr_16372_16398[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16362 === (5))){
var state_16361__$1 = state_16361;
if(cljs.core.truth_(close_QMARK_)){
var statearr_16373_16399 = state_16361__$1;
(statearr_16373_16399[(1)] = (8));

} else {
var statearr_16374_16400 = state_16361__$1;
(statearr_16374_16400[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16362 === (14))){
var inst_16355 = (state_16361[(2)]);
var state_16361__$1 = state_16361;
var statearr_16375_16401 = state_16361__$1;
(statearr_16375_16401[(2)] = inst_16355);

(statearr_16375_16401[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16362 === (10))){
var inst_16347 = (state_16361[(2)]);
var state_16361__$1 = state_16361;
var statearr_16376_16402 = state_16361__$1;
(statearr_16376_16402[(2)] = inst_16347);

(statearr_16376_16402[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16362 === (8))){
var inst_16344 = cljs.core.async.close_BANG_(to);
var state_16361__$1 = state_16361;
var statearr_16377_16403 = state_16361__$1;
(statearr_16377_16403[(2)] = inst_16344);

(statearr_16377_16403[(1)] = (10));


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
}
}
}
}
});})(c__16204__auto___16389))
;
return ((function (switch__16088__auto__,c__16204__auto___16389){
return (function() {
var cljs$core$async$state_machine__16089__auto__ = null;
var cljs$core$async$state_machine__16089__auto____0 = (function (){
var statearr_16381 = [null,null,null,null,null,null,null,null];
(statearr_16381[(0)] = cljs$core$async$state_machine__16089__auto__);

(statearr_16381[(1)] = (1));

return statearr_16381;
});
var cljs$core$async$state_machine__16089__auto____1 = (function (state_16361){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_16361);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e16382){if((e16382 instanceof Object)){
var ex__16092__auto__ = e16382;
var statearr_16383_16404 = state_16361;
(statearr_16383_16404[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16361);

return cljs.core.cst$kw$recur;
} else {
throw e16382;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__16405 = state_16361;
state_16361 = G__16405;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$state_machine__16089__auto__ = function(state_16361){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16089__auto____1.call(this,state_16361);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16089__auto____0;
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16089__auto____1;
return cljs$core$async$state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___16389))
})();
var state__16206__auto__ = (function (){var statearr_16384 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_16384[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___16389);

return statearr_16384;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___16389))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process = ((function (jobs,results){
return (function (p__16593){
var vec__16594 = p__16593;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16594,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16594,(1),null);
var job = vec__16594;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__16204__auto___16780 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___16780,res,vec__16594,v,p,job,jobs,results){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___16780,res,vec__16594,v,p,job,jobs,results){
return (function (state_16601){
var state_val_16602 = (state_16601[(1)]);
if((state_val_16602 === (1))){
var state_16601__$1 = state_16601;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16601__$1,(2),res,v);
} else {
if((state_val_16602 === (2))){
var inst_16598 = (state_16601[(2)]);
var inst_16599 = cljs.core.async.close_BANG_(res);
var state_16601__$1 = (function (){var statearr_16603 = state_16601;
(statearr_16603[(7)] = inst_16598);

return statearr_16603;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_16601__$1,inst_16599);
} else {
return null;
}
}
});})(c__16204__auto___16780,res,vec__16594,v,p,job,jobs,results))
;
return ((function (switch__16088__auto__,c__16204__auto___16780,res,vec__16594,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0 = (function (){
var statearr_16607 = [null,null,null,null,null,null,null,null];
(statearr_16607[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__);

(statearr_16607[(1)] = (1));

return statearr_16607;
});
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1 = (function (state_16601){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_16601);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e16608){if((e16608 instanceof Object)){
var ex__16092__auto__ = e16608;
var statearr_16609_16781 = state_16601;
(statearr_16609_16781[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16601);

return cljs.core.cst$kw$recur;
} else {
throw e16608;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__16782 = state_16601;
state_16601 = G__16782;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__ = function(state_16601){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1.call(this,state_16601);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___16780,res,vec__16594,v,p,job,jobs,results))
})();
var state__16206__auto__ = (function (){var statearr_16610 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_16610[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___16780);

return statearr_16610;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___16780,res,vec__16594,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__16611){
var vec__16612 = p__16611;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16612,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16612,(1),null);
var job = vec__16612;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});})(jobs,results,process))
;
var n__8032__auto___16783 = n;
var __16784 = (0);
while(true){
if((__16784 < n__8032__auto___16783)){
var G__16615_16785 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__16615_16785) {
case "compute":
var c__16204__auto___16787 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__16784,c__16204__auto___16787,G__16615_16785,n__8032__auto___16783,jobs,results,process,async){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (__16784,c__16204__auto___16787,G__16615_16785,n__8032__auto___16783,jobs,results,process,async){
return (function (state_16628){
var state_val_16629 = (state_16628[(1)]);
if((state_val_16629 === (1))){
var state_16628__$1 = state_16628;
var statearr_16630_16788 = state_16628__$1;
(statearr_16630_16788[(2)] = null);

(statearr_16630_16788[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16629 === (2))){
var state_16628__$1 = state_16628;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16628__$1,(4),jobs);
} else {
if((state_val_16629 === (3))){
var inst_16626 = (state_16628[(2)]);
var state_16628__$1 = state_16628;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16628__$1,inst_16626);
} else {
if((state_val_16629 === (4))){
var inst_16618 = (state_16628[(2)]);
var inst_16619 = process(inst_16618);
var state_16628__$1 = state_16628;
if(cljs.core.truth_(inst_16619)){
var statearr_16631_16789 = state_16628__$1;
(statearr_16631_16789[(1)] = (5));

} else {
var statearr_16632_16790 = state_16628__$1;
(statearr_16632_16790[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16629 === (5))){
var state_16628__$1 = state_16628;
var statearr_16633_16791 = state_16628__$1;
(statearr_16633_16791[(2)] = null);

(statearr_16633_16791[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16629 === (6))){
var state_16628__$1 = state_16628;
var statearr_16634_16792 = state_16628__$1;
(statearr_16634_16792[(2)] = null);

(statearr_16634_16792[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16629 === (7))){
var inst_16624 = (state_16628[(2)]);
var state_16628__$1 = state_16628;
var statearr_16635_16793 = state_16628__$1;
(statearr_16635_16793[(2)] = inst_16624);

(statearr_16635_16793[(1)] = (3));


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
});})(__16784,c__16204__auto___16787,G__16615_16785,n__8032__auto___16783,jobs,results,process,async))
;
return ((function (__16784,switch__16088__auto__,c__16204__auto___16787,G__16615_16785,n__8032__auto___16783,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0 = (function (){
var statearr_16639 = [null,null,null,null,null,null,null];
(statearr_16639[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__);

(statearr_16639[(1)] = (1));

return statearr_16639;
});
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1 = (function (state_16628){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_16628);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e16640){if((e16640 instanceof Object)){
var ex__16092__auto__ = e16640;
var statearr_16641_16794 = state_16628;
(statearr_16641_16794[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16628);

return cljs.core.cst$kw$recur;
} else {
throw e16640;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__16795 = state_16628;
state_16628 = G__16795;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__ = function(state_16628){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1.call(this,state_16628);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__;
})()
;})(__16784,switch__16088__auto__,c__16204__auto___16787,G__16615_16785,n__8032__auto___16783,jobs,results,process,async))
})();
var state__16206__auto__ = (function (){var statearr_16642 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_16642[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___16787);

return statearr_16642;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(__16784,c__16204__auto___16787,G__16615_16785,n__8032__auto___16783,jobs,results,process,async))
);


break;
case "async":
var c__16204__auto___16796 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__16784,c__16204__auto___16796,G__16615_16785,n__8032__auto___16783,jobs,results,process,async){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (__16784,c__16204__auto___16796,G__16615_16785,n__8032__auto___16783,jobs,results,process,async){
return (function (state_16655){
var state_val_16656 = (state_16655[(1)]);
if((state_val_16656 === (1))){
var state_16655__$1 = state_16655;
var statearr_16657_16797 = state_16655__$1;
(statearr_16657_16797[(2)] = null);

(statearr_16657_16797[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16656 === (2))){
var state_16655__$1 = state_16655;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16655__$1,(4),jobs);
} else {
if((state_val_16656 === (3))){
var inst_16653 = (state_16655[(2)]);
var state_16655__$1 = state_16655;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16655__$1,inst_16653);
} else {
if((state_val_16656 === (4))){
var inst_16645 = (state_16655[(2)]);
var inst_16646 = async(inst_16645);
var state_16655__$1 = state_16655;
if(cljs.core.truth_(inst_16646)){
var statearr_16658_16798 = state_16655__$1;
(statearr_16658_16798[(1)] = (5));

} else {
var statearr_16659_16799 = state_16655__$1;
(statearr_16659_16799[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16656 === (5))){
var state_16655__$1 = state_16655;
var statearr_16660_16800 = state_16655__$1;
(statearr_16660_16800[(2)] = null);

(statearr_16660_16800[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16656 === (6))){
var state_16655__$1 = state_16655;
var statearr_16661_16801 = state_16655__$1;
(statearr_16661_16801[(2)] = null);

(statearr_16661_16801[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16656 === (7))){
var inst_16651 = (state_16655[(2)]);
var state_16655__$1 = state_16655;
var statearr_16662_16802 = state_16655__$1;
(statearr_16662_16802[(2)] = inst_16651);

(statearr_16662_16802[(1)] = (3));


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
});})(__16784,c__16204__auto___16796,G__16615_16785,n__8032__auto___16783,jobs,results,process,async))
;
return ((function (__16784,switch__16088__auto__,c__16204__auto___16796,G__16615_16785,n__8032__auto___16783,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0 = (function (){
var statearr_16666 = [null,null,null,null,null,null,null];
(statearr_16666[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__);

(statearr_16666[(1)] = (1));

return statearr_16666;
});
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1 = (function (state_16655){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_16655);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e16667){if((e16667 instanceof Object)){
var ex__16092__auto__ = e16667;
var statearr_16668_16803 = state_16655;
(statearr_16668_16803[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16655);

return cljs.core.cst$kw$recur;
} else {
throw e16667;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__16804 = state_16655;
state_16655 = G__16804;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__ = function(state_16655){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1.call(this,state_16655);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__;
})()
;})(__16784,switch__16088__auto__,c__16204__auto___16796,G__16615_16785,n__8032__auto___16783,jobs,results,process,async))
})();
var state__16206__auto__ = (function (){var statearr_16669 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_16669[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___16796);

return statearr_16669;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(__16784,c__16204__auto___16796,G__16615_16785,n__8032__auto___16783,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__16805 = (__16784 + (1));
__16784 = G__16805;
continue;
} else {
}
break;
}

var c__16204__auto___16806 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___16806,jobs,results,process,async){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___16806,jobs,results,process,async){
return (function (state_16691){
var state_val_16692 = (state_16691[(1)]);
if((state_val_16692 === (1))){
var state_16691__$1 = state_16691;
var statearr_16693_16807 = state_16691__$1;
(statearr_16693_16807[(2)] = null);

(statearr_16693_16807[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16692 === (2))){
var state_16691__$1 = state_16691;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16691__$1,(4),from);
} else {
if((state_val_16692 === (3))){
var inst_16689 = (state_16691[(2)]);
var state_16691__$1 = state_16691;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16691__$1,inst_16689);
} else {
if((state_val_16692 === (4))){
var inst_16672 = (state_16691[(7)]);
var inst_16672__$1 = (state_16691[(2)]);
var inst_16673 = (inst_16672__$1 == null);
var state_16691__$1 = (function (){var statearr_16694 = state_16691;
(statearr_16694[(7)] = inst_16672__$1);

return statearr_16694;
})();
if(cljs.core.truth_(inst_16673)){
var statearr_16695_16808 = state_16691__$1;
(statearr_16695_16808[(1)] = (5));

} else {
var statearr_16696_16809 = state_16691__$1;
(statearr_16696_16809[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16692 === (5))){
var inst_16675 = cljs.core.async.close_BANG_(jobs);
var state_16691__$1 = state_16691;
var statearr_16697_16810 = state_16691__$1;
(statearr_16697_16810[(2)] = inst_16675);

(statearr_16697_16810[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16692 === (6))){
var inst_16672 = (state_16691[(7)]);
var inst_16677 = (state_16691[(8)]);
var inst_16677__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_16678 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_16679 = [inst_16672,inst_16677__$1];
var inst_16680 = (new cljs.core.PersistentVector(null,2,(5),inst_16678,inst_16679,null));
var state_16691__$1 = (function (){var statearr_16698 = state_16691;
(statearr_16698[(8)] = inst_16677__$1);

return statearr_16698;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16691__$1,(8),jobs,inst_16680);
} else {
if((state_val_16692 === (7))){
var inst_16687 = (state_16691[(2)]);
var state_16691__$1 = state_16691;
var statearr_16699_16811 = state_16691__$1;
(statearr_16699_16811[(2)] = inst_16687);

(statearr_16699_16811[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16692 === (8))){
var inst_16677 = (state_16691[(8)]);
var inst_16682 = (state_16691[(2)]);
var state_16691__$1 = (function (){var statearr_16700 = state_16691;
(statearr_16700[(9)] = inst_16682);

return statearr_16700;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16691__$1,(9),results,inst_16677);
} else {
if((state_val_16692 === (9))){
var inst_16684 = (state_16691[(2)]);
var state_16691__$1 = (function (){var statearr_16701 = state_16691;
(statearr_16701[(10)] = inst_16684);

return statearr_16701;
})();
var statearr_16702_16812 = state_16691__$1;
(statearr_16702_16812[(2)] = null);

(statearr_16702_16812[(1)] = (2));


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
});})(c__16204__auto___16806,jobs,results,process,async))
;
return ((function (switch__16088__auto__,c__16204__auto___16806,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0 = (function (){
var statearr_16706 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_16706[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__);

(statearr_16706[(1)] = (1));

return statearr_16706;
});
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1 = (function (state_16691){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_16691);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e16707){if((e16707 instanceof Object)){
var ex__16092__auto__ = e16707;
var statearr_16708_16813 = state_16691;
(statearr_16708_16813[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16691);

return cljs.core.cst$kw$recur;
} else {
throw e16707;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__16814 = state_16691;
state_16691 = G__16814;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__ = function(state_16691){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1.call(this,state_16691);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___16806,jobs,results,process,async))
})();
var state__16206__auto__ = (function (){var statearr_16709 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_16709[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___16806);

return statearr_16709;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___16806,jobs,results,process,async))
);


var c__16204__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto__,jobs,results,process,async){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto__,jobs,results,process,async){
return (function (state_16747){
var state_val_16748 = (state_16747[(1)]);
if((state_val_16748 === (7))){
var inst_16743 = (state_16747[(2)]);
var state_16747__$1 = state_16747;
var statearr_16749_16815 = state_16747__$1;
(statearr_16749_16815[(2)] = inst_16743);

(statearr_16749_16815[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (20))){
var state_16747__$1 = state_16747;
var statearr_16750_16816 = state_16747__$1;
(statearr_16750_16816[(2)] = null);

(statearr_16750_16816[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (1))){
var state_16747__$1 = state_16747;
var statearr_16751_16817 = state_16747__$1;
(statearr_16751_16817[(2)] = null);

(statearr_16751_16817[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (4))){
var inst_16712 = (state_16747[(7)]);
var inst_16712__$1 = (state_16747[(2)]);
var inst_16713 = (inst_16712__$1 == null);
var state_16747__$1 = (function (){var statearr_16752 = state_16747;
(statearr_16752[(7)] = inst_16712__$1);

return statearr_16752;
})();
if(cljs.core.truth_(inst_16713)){
var statearr_16753_16818 = state_16747__$1;
(statearr_16753_16818[(1)] = (5));

} else {
var statearr_16754_16819 = state_16747__$1;
(statearr_16754_16819[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (15))){
var inst_16725 = (state_16747[(8)]);
var state_16747__$1 = state_16747;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16747__$1,(18),to,inst_16725);
} else {
if((state_val_16748 === (21))){
var inst_16738 = (state_16747[(2)]);
var state_16747__$1 = state_16747;
var statearr_16755_16820 = state_16747__$1;
(statearr_16755_16820[(2)] = inst_16738);

(statearr_16755_16820[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (13))){
var inst_16740 = (state_16747[(2)]);
var state_16747__$1 = (function (){var statearr_16756 = state_16747;
(statearr_16756[(9)] = inst_16740);

return statearr_16756;
})();
var statearr_16757_16821 = state_16747__$1;
(statearr_16757_16821[(2)] = null);

(statearr_16757_16821[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (6))){
var inst_16712 = (state_16747[(7)]);
var state_16747__$1 = state_16747;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16747__$1,(11),inst_16712);
} else {
if((state_val_16748 === (17))){
var inst_16733 = (state_16747[(2)]);
var state_16747__$1 = state_16747;
if(cljs.core.truth_(inst_16733)){
var statearr_16758_16822 = state_16747__$1;
(statearr_16758_16822[(1)] = (19));

} else {
var statearr_16759_16823 = state_16747__$1;
(statearr_16759_16823[(1)] = (20));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (3))){
var inst_16745 = (state_16747[(2)]);
var state_16747__$1 = state_16747;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16747__$1,inst_16745);
} else {
if((state_val_16748 === (12))){
var inst_16722 = (state_16747[(10)]);
var state_16747__$1 = state_16747;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16747__$1,(14),inst_16722);
} else {
if((state_val_16748 === (2))){
var state_16747__$1 = state_16747;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16747__$1,(4),results);
} else {
if((state_val_16748 === (19))){
var state_16747__$1 = state_16747;
var statearr_16760_16824 = state_16747__$1;
(statearr_16760_16824[(2)] = null);

(statearr_16760_16824[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (11))){
var inst_16722 = (state_16747[(2)]);
var state_16747__$1 = (function (){var statearr_16761 = state_16747;
(statearr_16761[(10)] = inst_16722);

return statearr_16761;
})();
var statearr_16762_16825 = state_16747__$1;
(statearr_16762_16825[(2)] = null);

(statearr_16762_16825[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (9))){
var state_16747__$1 = state_16747;
var statearr_16763_16826 = state_16747__$1;
(statearr_16763_16826[(2)] = null);

(statearr_16763_16826[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (5))){
var state_16747__$1 = state_16747;
if(cljs.core.truth_(close_QMARK_)){
var statearr_16764_16827 = state_16747__$1;
(statearr_16764_16827[(1)] = (8));

} else {
var statearr_16765_16828 = state_16747__$1;
(statearr_16765_16828[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (14))){
var inst_16727 = (state_16747[(11)]);
var inst_16725 = (state_16747[(8)]);
var inst_16725__$1 = (state_16747[(2)]);
var inst_16726 = (inst_16725__$1 == null);
var inst_16727__$1 = cljs.core.not(inst_16726);
var state_16747__$1 = (function (){var statearr_16766 = state_16747;
(statearr_16766[(11)] = inst_16727__$1);

(statearr_16766[(8)] = inst_16725__$1);

return statearr_16766;
})();
if(inst_16727__$1){
var statearr_16767_16829 = state_16747__$1;
(statearr_16767_16829[(1)] = (15));

} else {
var statearr_16768_16830 = state_16747__$1;
(statearr_16768_16830[(1)] = (16));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (16))){
var inst_16727 = (state_16747[(11)]);
var state_16747__$1 = state_16747;
var statearr_16769_16831 = state_16747__$1;
(statearr_16769_16831[(2)] = inst_16727);

(statearr_16769_16831[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (10))){
var inst_16719 = (state_16747[(2)]);
var state_16747__$1 = state_16747;
var statearr_16770_16832 = state_16747__$1;
(statearr_16770_16832[(2)] = inst_16719);

(statearr_16770_16832[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (18))){
var inst_16730 = (state_16747[(2)]);
var state_16747__$1 = state_16747;
var statearr_16771_16833 = state_16747__$1;
(statearr_16771_16833[(2)] = inst_16730);

(statearr_16771_16833[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16748 === (8))){
var inst_16716 = cljs.core.async.close_BANG_(to);
var state_16747__$1 = state_16747;
var statearr_16772_16834 = state_16747__$1;
(statearr_16772_16834[(2)] = inst_16716);

(statearr_16772_16834[(1)] = (10));


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
}
});})(c__16204__auto__,jobs,results,process,async))
;
return ((function (switch__16088__auto__,c__16204__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0 = (function (){
var statearr_16776 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16776[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__);

(statearr_16776[(1)] = (1));

return statearr_16776;
});
var cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1 = (function (state_16747){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_16747);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e16777){if((e16777 instanceof Object)){
var ex__16092__auto__ = e16777;
var statearr_16778_16835 = state_16747;
(statearr_16778_16835[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16747);

return cljs.core.cst$kw$recur;
} else {
throw e16777;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__16836 = state_16747;
state_16747 = G__16836;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__ = function(state_16747){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1.call(this,state_16747);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__16089__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto__,jobs,results,process,async))
})();
var state__16206__auto__ = (function (){var statearr_16779 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_16779[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto__);

return statearr_16779;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto__,jobs,results,process,async))
);

return c__16204__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var args16837 = [];
var len__8202__auto___16840 = arguments.length;
var i__8203__auto___16841 = (0);
while(true){
if((i__8203__auto___16841 < len__8202__auto___16840)){
args16837.push((arguments[i__8203__auto___16841]));

var G__16842 = (i__8203__auto___16841 + (1));
i__8203__auto___16841 = G__16842;
continue;
} else {
}
break;
}

var G__16839 = args16837.length;
switch (G__16839) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16837.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,cljs.core.cst$kw$async);
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var args16844 = [];
var len__8202__auto___16847 = arguments.length;
var i__8203__auto___16848 = (0);
while(true){
if((i__8203__auto___16848 < len__8202__auto___16847)){
args16844.push((arguments[i__8203__auto___16848]));

var G__16849 = (i__8203__auto___16848 + (1));
i__8203__auto___16848 = G__16849;
continue;
} else {
}
break;
}

var G__16846 = args16844.length;
switch (G__16846) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16844.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,cljs.core.cst$kw$compute);
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var args16851 = [];
var len__8202__auto___16904 = arguments.length;
var i__8203__auto___16905 = (0);
while(true){
if((i__8203__auto___16905 < len__8202__auto___16904)){
args16851.push((arguments[i__8203__auto___16905]));

var G__16906 = (i__8203__auto___16905 + (1));
i__8203__auto___16905 = G__16906;
continue;
} else {
}
break;
}

var G__16853 = args16851.length;
switch (G__16853) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16851.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__16204__auto___16908 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___16908,tc,fc){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___16908,tc,fc){
return (function (state_16879){
var state_val_16880 = (state_16879[(1)]);
if((state_val_16880 === (7))){
var inst_16875 = (state_16879[(2)]);
var state_16879__$1 = state_16879;
var statearr_16881_16909 = state_16879__$1;
(statearr_16881_16909[(2)] = inst_16875);

(statearr_16881_16909[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16880 === (1))){
var state_16879__$1 = state_16879;
var statearr_16882_16910 = state_16879__$1;
(statearr_16882_16910[(2)] = null);

(statearr_16882_16910[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16880 === (4))){
var inst_16856 = (state_16879[(7)]);
var inst_16856__$1 = (state_16879[(2)]);
var inst_16857 = (inst_16856__$1 == null);
var state_16879__$1 = (function (){var statearr_16883 = state_16879;
(statearr_16883[(7)] = inst_16856__$1);

return statearr_16883;
})();
if(cljs.core.truth_(inst_16857)){
var statearr_16884_16911 = state_16879__$1;
(statearr_16884_16911[(1)] = (5));

} else {
var statearr_16885_16912 = state_16879__$1;
(statearr_16885_16912[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16880 === (13))){
var state_16879__$1 = state_16879;
var statearr_16886_16913 = state_16879__$1;
(statearr_16886_16913[(2)] = null);

(statearr_16886_16913[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16880 === (6))){
var inst_16856 = (state_16879[(7)]);
var inst_16862 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_16856) : p.call(null,inst_16856));
var state_16879__$1 = state_16879;
if(cljs.core.truth_(inst_16862)){
var statearr_16887_16914 = state_16879__$1;
(statearr_16887_16914[(1)] = (9));

} else {
var statearr_16888_16915 = state_16879__$1;
(statearr_16888_16915[(1)] = (10));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16880 === (3))){
var inst_16877 = (state_16879[(2)]);
var state_16879__$1 = state_16879;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16879__$1,inst_16877);
} else {
if((state_val_16880 === (12))){
var state_16879__$1 = state_16879;
var statearr_16889_16916 = state_16879__$1;
(statearr_16889_16916[(2)] = null);

(statearr_16889_16916[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16880 === (2))){
var state_16879__$1 = state_16879;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16879__$1,(4),ch);
} else {
if((state_val_16880 === (11))){
var inst_16856 = (state_16879[(7)]);
var inst_16866 = (state_16879[(2)]);
var state_16879__$1 = state_16879;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16879__$1,(8),inst_16866,inst_16856);
} else {
if((state_val_16880 === (9))){
var state_16879__$1 = state_16879;
var statearr_16890_16917 = state_16879__$1;
(statearr_16890_16917[(2)] = tc);

(statearr_16890_16917[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16880 === (5))){
var inst_16859 = cljs.core.async.close_BANG_(tc);
var inst_16860 = cljs.core.async.close_BANG_(fc);
var state_16879__$1 = (function (){var statearr_16891 = state_16879;
(statearr_16891[(8)] = inst_16859);

return statearr_16891;
})();
var statearr_16892_16918 = state_16879__$1;
(statearr_16892_16918[(2)] = inst_16860);

(statearr_16892_16918[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16880 === (14))){
var inst_16873 = (state_16879[(2)]);
var state_16879__$1 = state_16879;
var statearr_16893_16919 = state_16879__$1;
(statearr_16893_16919[(2)] = inst_16873);

(statearr_16893_16919[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16880 === (10))){
var state_16879__$1 = state_16879;
var statearr_16894_16920 = state_16879__$1;
(statearr_16894_16920[(2)] = fc);

(statearr_16894_16920[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16880 === (8))){
var inst_16868 = (state_16879[(2)]);
var state_16879__$1 = state_16879;
if(cljs.core.truth_(inst_16868)){
var statearr_16895_16921 = state_16879__$1;
(statearr_16895_16921[(1)] = (12));

} else {
var statearr_16896_16922 = state_16879__$1;
(statearr_16896_16922[(1)] = (13));

}

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
}
}
}
}
});})(c__16204__auto___16908,tc,fc))
;
return ((function (switch__16088__auto__,c__16204__auto___16908,tc,fc){
return (function() {
var cljs$core$async$state_machine__16089__auto__ = null;
var cljs$core$async$state_machine__16089__auto____0 = (function (){
var statearr_16900 = [null,null,null,null,null,null,null,null,null];
(statearr_16900[(0)] = cljs$core$async$state_machine__16089__auto__);

(statearr_16900[(1)] = (1));

return statearr_16900;
});
var cljs$core$async$state_machine__16089__auto____1 = (function (state_16879){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_16879);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e16901){if((e16901 instanceof Object)){
var ex__16092__auto__ = e16901;
var statearr_16902_16923 = state_16879;
(statearr_16902_16923[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16879);

return cljs.core.cst$kw$recur;
} else {
throw e16901;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__16924 = state_16879;
state_16879 = G__16924;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$state_machine__16089__auto__ = function(state_16879){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16089__auto____1.call(this,state_16879);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16089__auto____0;
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16089__auto____1;
return cljs$core$async$state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___16908,tc,fc))
})();
var state__16206__auto__ = (function (){var statearr_16903 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_16903[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___16908);

return statearr_16903;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___16908,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__16204__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto__){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto__){
return (function (state_16988){
var state_val_16989 = (state_16988[(1)]);
if((state_val_16989 === (7))){
var inst_16984 = (state_16988[(2)]);
var state_16988__$1 = state_16988;
var statearr_16990_17011 = state_16988__$1;
(statearr_16990_17011[(2)] = inst_16984);

(statearr_16990_17011[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16989 === (1))){
var inst_16968 = init;
var state_16988__$1 = (function (){var statearr_16991 = state_16988;
(statearr_16991[(7)] = inst_16968);

return statearr_16991;
})();
var statearr_16992_17012 = state_16988__$1;
(statearr_16992_17012[(2)] = null);

(statearr_16992_17012[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16989 === (4))){
var inst_16971 = (state_16988[(8)]);
var inst_16971__$1 = (state_16988[(2)]);
var inst_16972 = (inst_16971__$1 == null);
var state_16988__$1 = (function (){var statearr_16993 = state_16988;
(statearr_16993[(8)] = inst_16971__$1);

return statearr_16993;
})();
if(cljs.core.truth_(inst_16972)){
var statearr_16994_17013 = state_16988__$1;
(statearr_16994_17013[(1)] = (5));

} else {
var statearr_16995_17014 = state_16988__$1;
(statearr_16995_17014[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16989 === (6))){
var inst_16971 = (state_16988[(8)]);
var inst_16975 = (state_16988[(9)]);
var inst_16968 = (state_16988[(7)]);
var inst_16975__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_16968,inst_16971) : f.call(null,inst_16968,inst_16971));
var inst_16976 = cljs.core.reduced_QMARK_(inst_16975__$1);
var state_16988__$1 = (function (){var statearr_16996 = state_16988;
(statearr_16996[(9)] = inst_16975__$1);

return statearr_16996;
})();
if(inst_16976){
var statearr_16997_17015 = state_16988__$1;
(statearr_16997_17015[(1)] = (8));

} else {
var statearr_16998_17016 = state_16988__$1;
(statearr_16998_17016[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16989 === (3))){
var inst_16986 = (state_16988[(2)]);
var state_16988__$1 = state_16988;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16988__$1,inst_16986);
} else {
if((state_val_16989 === (2))){
var state_16988__$1 = state_16988;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16988__$1,(4),ch);
} else {
if((state_val_16989 === (9))){
var inst_16975 = (state_16988[(9)]);
var inst_16968 = inst_16975;
var state_16988__$1 = (function (){var statearr_16999 = state_16988;
(statearr_16999[(7)] = inst_16968);

return statearr_16999;
})();
var statearr_17000_17017 = state_16988__$1;
(statearr_17000_17017[(2)] = null);

(statearr_17000_17017[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16989 === (5))){
var inst_16968 = (state_16988[(7)]);
var state_16988__$1 = state_16988;
var statearr_17001_17018 = state_16988__$1;
(statearr_17001_17018[(2)] = inst_16968);

(statearr_17001_17018[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16989 === (10))){
var inst_16982 = (state_16988[(2)]);
var state_16988__$1 = state_16988;
var statearr_17002_17019 = state_16988__$1;
(statearr_17002_17019[(2)] = inst_16982);

(statearr_17002_17019[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16989 === (8))){
var inst_16975 = (state_16988[(9)]);
var inst_16978 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_16975) : cljs.core.deref.call(null,inst_16975));
var state_16988__$1 = state_16988;
var statearr_17003_17020 = state_16988__$1;
(statearr_17003_17020[(2)] = inst_16978);

(statearr_17003_17020[(1)] = (10));


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
});})(c__16204__auto__))
;
return ((function (switch__16088__auto__,c__16204__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__16089__auto__ = null;
var cljs$core$async$reduce_$_state_machine__16089__auto____0 = (function (){
var statearr_17007 = [null,null,null,null,null,null,null,null,null,null];
(statearr_17007[(0)] = cljs$core$async$reduce_$_state_machine__16089__auto__);

(statearr_17007[(1)] = (1));

return statearr_17007;
});
var cljs$core$async$reduce_$_state_machine__16089__auto____1 = (function (state_16988){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_16988);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e17008){if((e17008 instanceof Object)){
var ex__16092__auto__ = e17008;
var statearr_17009_17021 = state_16988;
(statearr_17009_17021[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16988);

return cljs.core.cst$kw$recur;
} else {
throw e17008;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__17022 = state_16988;
state_16988 = G__17022;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__16089__auto__ = function(state_16988){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__16089__auto____1.call(this,state_16988);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__16089__auto____0;
cljs$core$async$reduce_$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__16089__auto____1;
return cljs$core$async$reduce_$_state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto__))
})();
var state__16206__auto__ = (function (){var statearr_17010 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_17010[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto__);

return statearr_17010;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto__))
);

return c__16204__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var args17023 = [];
var len__8202__auto___17075 = arguments.length;
var i__8203__auto___17076 = (0);
while(true){
if((i__8203__auto___17076 < len__8202__auto___17075)){
args17023.push((arguments[i__8203__auto___17076]));

var G__17077 = (i__8203__auto___17076 + (1));
i__8203__auto___17076 = G__17077;
continue;
} else {
}
break;
}

var G__17025 = args17023.length;
switch (G__17025) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17023.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__16204__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto__){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto__){
return (function (state_17050){
var state_val_17051 = (state_17050[(1)]);
if((state_val_17051 === (7))){
var inst_17032 = (state_17050[(2)]);
var state_17050__$1 = state_17050;
var statearr_17052_17079 = state_17050__$1;
(statearr_17052_17079[(2)] = inst_17032);

(statearr_17052_17079[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17051 === (1))){
var inst_17026 = cljs.core.seq(coll);
var inst_17027 = inst_17026;
var state_17050__$1 = (function (){var statearr_17053 = state_17050;
(statearr_17053[(7)] = inst_17027);

return statearr_17053;
})();
var statearr_17054_17080 = state_17050__$1;
(statearr_17054_17080[(2)] = null);

(statearr_17054_17080[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17051 === (4))){
var inst_17027 = (state_17050[(7)]);
var inst_17030 = cljs.core.first(inst_17027);
var state_17050__$1 = state_17050;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17050__$1,(7),ch,inst_17030);
} else {
if((state_val_17051 === (13))){
var inst_17044 = (state_17050[(2)]);
var state_17050__$1 = state_17050;
var statearr_17055_17081 = state_17050__$1;
(statearr_17055_17081[(2)] = inst_17044);

(statearr_17055_17081[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17051 === (6))){
var inst_17035 = (state_17050[(2)]);
var state_17050__$1 = state_17050;
if(cljs.core.truth_(inst_17035)){
var statearr_17056_17082 = state_17050__$1;
(statearr_17056_17082[(1)] = (8));

} else {
var statearr_17057_17083 = state_17050__$1;
(statearr_17057_17083[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17051 === (3))){
var inst_17048 = (state_17050[(2)]);
var state_17050__$1 = state_17050;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17050__$1,inst_17048);
} else {
if((state_val_17051 === (12))){
var state_17050__$1 = state_17050;
var statearr_17058_17084 = state_17050__$1;
(statearr_17058_17084[(2)] = null);

(statearr_17058_17084[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17051 === (2))){
var inst_17027 = (state_17050[(7)]);
var state_17050__$1 = state_17050;
if(cljs.core.truth_(inst_17027)){
var statearr_17059_17085 = state_17050__$1;
(statearr_17059_17085[(1)] = (4));

} else {
var statearr_17060_17086 = state_17050__$1;
(statearr_17060_17086[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17051 === (11))){
var inst_17041 = cljs.core.async.close_BANG_(ch);
var state_17050__$1 = state_17050;
var statearr_17061_17087 = state_17050__$1;
(statearr_17061_17087[(2)] = inst_17041);

(statearr_17061_17087[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17051 === (9))){
var state_17050__$1 = state_17050;
if(cljs.core.truth_(close_QMARK_)){
var statearr_17062_17088 = state_17050__$1;
(statearr_17062_17088[(1)] = (11));

} else {
var statearr_17063_17089 = state_17050__$1;
(statearr_17063_17089[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17051 === (5))){
var inst_17027 = (state_17050[(7)]);
var state_17050__$1 = state_17050;
var statearr_17064_17090 = state_17050__$1;
(statearr_17064_17090[(2)] = inst_17027);

(statearr_17064_17090[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17051 === (10))){
var inst_17046 = (state_17050[(2)]);
var state_17050__$1 = state_17050;
var statearr_17065_17091 = state_17050__$1;
(statearr_17065_17091[(2)] = inst_17046);

(statearr_17065_17091[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17051 === (8))){
var inst_17027 = (state_17050[(7)]);
var inst_17037 = cljs.core.next(inst_17027);
var inst_17027__$1 = inst_17037;
var state_17050__$1 = (function (){var statearr_17066 = state_17050;
(statearr_17066[(7)] = inst_17027__$1);

return statearr_17066;
})();
var statearr_17067_17092 = state_17050__$1;
(statearr_17067_17092[(2)] = null);

(statearr_17067_17092[(1)] = (2));


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
}
}
}
});})(c__16204__auto__))
;
return ((function (switch__16088__auto__,c__16204__auto__){
return (function() {
var cljs$core$async$state_machine__16089__auto__ = null;
var cljs$core$async$state_machine__16089__auto____0 = (function (){
var statearr_17071 = [null,null,null,null,null,null,null,null];
(statearr_17071[(0)] = cljs$core$async$state_machine__16089__auto__);

(statearr_17071[(1)] = (1));

return statearr_17071;
});
var cljs$core$async$state_machine__16089__auto____1 = (function (state_17050){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_17050);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e17072){if((e17072 instanceof Object)){
var ex__16092__auto__ = e17072;
var statearr_17073_17093 = state_17050;
(statearr_17073_17093[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_17050);

return cljs.core.cst$kw$recur;
} else {
throw e17072;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__17094 = state_17050;
state_17050 = G__17094;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$state_machine__16089__auto__ = function(state_17050){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16089__auto____1.call(this,state_17050);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16089__auto____0;
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16089__auto____1;
return cljs$core$async$state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto__))
})();
var state__16206__auto__ = (function (){var statearr_17074 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_17074[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto__);

return statearr_17074;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto__))
);

return c__16204__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((!((_ == null))) && (!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__7732__auto__ = (((_ == null))?null:_);
var m__7733__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$1 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__7733__auto__.call(null,_));
} else {
var m__7733__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$1(_) : m__7733__auto____$1.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((!((m == null))) && (!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__7732__auto__ = (((m == null))?null:m);
var m__7733__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$3 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__7733__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__7733__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__7733__auto____$1.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__7732__auto__ = (((m == null))?null:m);
var m__7733__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__7733__auto__.call(null,m,ch));
} else {
var m__7733__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2(m,ch) : m__7733__auto____$1.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__7732__auto__ = (((m == null))?null:m);
var m__7733__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$1 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__7733__auto__.call(null,m));
} else {
var m__7733__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$1(m) : m__7733__auto____$1.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = (function (){var G__17323 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__17323) : cljs.core.atom.call(null,G__17323));
})();
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async17324 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17324 = (function (mult,ch,cs,meta17325){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta17325 = meta17325;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async17324.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_17326,meta17325__$1){
var self__ = this;
var _17326__$1 = this;
return (new cljs.core.async.t_cljs$core$async17324(self__.mult,self__.ch,self__.cs,meta17325__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async17324.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_17326){
var self__ = this;
var _17326__$1 = this;
return self__.meta17325;
});})(cs))
;

cljs.core.async.t_cljs$core$async17324.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async17324.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async17324.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async17324.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async17324.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async17324.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
var G__17327_17551 = self__.cs;
var G__17328_17552 = cljs.core.PersistentArrayMap.EMPTY;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__17327_17551,G__17328_17552) : cljs.core.reset_BANG_.call(null,G__17327_17551,G__17328_17552));

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async17324.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$mult,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),cljs.core.cst$sym$ch,cljs.core.cst$sym$cs,cljs.core.cst$sym$meta17325], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async17324.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async17324.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17324";

cljs.core.async.t_cljs$core$async17324.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async17324");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async17324 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async17324(mult__$1,ch__$1,cs__$1,meta17325){
return (new cljs.core.async.t_cljs$core$async17324(mult__$1,ch__$1,cs__$1,meta17325));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async17324(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__16204__auto___17553 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___17553,cs,m,dchan,dctr,done){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___17553,cs,m,dchan,dctr,done){
return (function (state_17463){
var state_val_17464 = (state_17463[(1)]);
if((state_val_17464 === (7))){
var inst_17459 = (state_17463[(2)]);
var state_17463__$1 = state_17463;
var statearr_17465_17554 = state_17463__$1;
(statearr_17465_17554[(2)] = inst_17459);

(statearr_17465_17554[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (20))){
var inst_17362 = (state_17463[(7)]);
var inst_17374 = cljs.core.first(inst_17362);
var inst_17375 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17374,(0),null);
var inst_17376 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17374,(1),null);
var state_17463__$1 = (function (){var statearr_17466 = state_17463;
(statearr_17466[(8)] = inst_17375);

return statearr_17466;
})();
if(cljs.core.truth_(inst_17376)){
var statearr_17467_17555 = state_17463__$1;
(statearr_17467_17555[(1)] = (22));

} else {
var statearr_17468_17556 = state_17463__$1;
(statearr_17468_17556[(1)] = (23));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (27))){
var inst_17404 = (state_17463[(9)]);
var inst_17331 = (state_17463[(10)]);
var inst_17406 = (state_17463[(11)]);
var inst_17411 = (state_17463[(12)]);
var inst_17411__$1 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_17404,inst_17406);
var inst_17412 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_17411__$1,inst_17331,done);
var state_17463__$1 = (function (){var statearr_17469 = state_17463;
(statearr_17469[(12)] = inst_17411__$1);

return statearr_17469;
})();
if(cljs.core.truth_(inst_17412)){
var statearr_17470_17557 = state_17463__$1;
(statearr_17470_17557[(1)] = (30));

} else {
var statearr_17471_17558 = state_17463__$1;
(statearr_17471_17558[(1)] = (31));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (1))){
var state_17463__$1 = state_17463;
var statearr_17472_17559 = state_17463__$1;
(statearr_17472_17559[(2)] = null);

(statearr_17472_17559[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (24))){
var inst_17362 = (state_17463[(7)]);
var inst_17381 = (state_17463[(2)]);
var inst_17382 = cljs.core.next(inst_17362);
var inst_17340 = inst_17382;
var inst_17341 = null;
var inst_17342 = (0);
var inst_17343 = (0);
var state_17463__$1 = (function (){var statearr_17473 = state_17463;
(statearr_17473[(13)] = inst_17342);

(statearr_17473[(14)] = inst_17341);

(statearr_17473[(15)] = inst_17381);

(statearr_17473[(16)] = inst_17343);

(statearr_17473[(17)] = inst_17340);

return statearr_17473;
})();
var statearr_17474_17560 = state_17463__$1;
(statearr_17474_17560[(2)] = null);

(statearr_17474_17560[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (39))){
var state_17463__$1 = state_17463;
var statearr_17478_17561 = state_17463__$1;
(statearr_17478_17561[(2)] = null);

(statearr_17478_17561[(1)] = (41));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (4))){
var inst_17331 = (state_17463[(10)]);
var inst_17331__$1 = (state_17463[(2)]);
var inst_17332 = (inst_17331__$1 == null);
var state_17463__$1 = (function (){var statearr_17479 = state_17463;
(statearr_17479[(10)] = inst_17331__$1);

return statearr_17479;
})();
if(cljs.core.truth_(inst_17332)){
var statearr_17480_17562 = state_17463__$1;
(statearr_17480_17562[(1)] = (5));

} else {
var statearr_17481_17563 = state_17463__$1;
(statearr_17481_17563[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (15))){
var inst_17342 = (state_17463[(13)]);
var inst_17341 = (state_17463[(14)]);
var inst_17343 = (state_17463[(16)]);
var inst_17340 = (state_17463[(17)]);
var inst_17358 = (state_17463[(2)]);
var inst_17359 = (inst_17343 + (1));
var tmp17475 = inst_17342;
var tmp17476 = inst_17341;
var tmp17477 = inst_17340;
var inst_17340__$1 = tmp17477;
var inst_17341__$1 = tmp17476;
var inst_17342__$1 = tmp17475;
var inst_17343__$1 = inst_17359;
var state_17463__$1 = (function (){var statearr_17482 = state_17463;
(statearr_17482[(13)] = inst_17342__$1);

(statearr_17482[(14)] = inst_17341__$1);

(statearr_17482[(16)] = inst_17343__$1);

(statearr_17482[(18)] = inst_17358);

(statearr_17482[(17)] = inst_17340__$1);

return statearr_17482;
})();
var statearr_17483_17564 = state_17463__$1;
(statearr_17483_17564[(2)] = null);

(statearr_17483_17564[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (21))){
var inst_17385 = (state_17463[(2)]);
var state_17463__$1 = state_17463;
var statearr_17487_17565 = state_17463__$1;
(statearr_17487_17565[(2)] = inst_17385);

(statearr_17487_17565[(1)] = (18));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (31))){
var inst_17411 = (state_17463[(12)]);
var inst_17415 = done(null);
var inst_17416 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_17411);
var state_17463__$1 = (function (){var statearr_17488 = state_17463;
(statearr_17488[(19)] = inst_17415);

return statearr_17488;
})();
var statearr_17489_17566 = state_17463__$1;
(statearr_17489_17566[(2)] = inst_17416);

(statearr_17489_17566[(1)] = (32));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (32))){
var inst_17404 = (state_17463[(9)]);
var inst_17406 = (state_17463[(11)]);
var inst_17403 = (state_17463[(20)]);
var inst_17405 = (state_17463[(21)]);
var inst_17418 = (state_17463[(2)]);
var inst_17419 = (inst_17406 + (1));
var tmp17484 = inst_17404;
var tmp17485 = inst_17403;
var tmp17486 = inst_17405;
var inst_17403__$1 = tmp17485;
var inst_17404__$1 = tmp17484;
var inst_17405__$1 = tmp17486;
var inst_17406__$1 = inst_17419;
var state_17463__$1 = (function (){var statearr_17490 = state_17463;
(statearr_17490[(22)] = inst_17418);

(statearr_17490[(9)] = inst_17404__$1);

(statearr_17490[(11)] = inst_17406__$1);

(statearr_17490[(20)] = inst_17403__$1);

(statearr_17490[(21)] = inst_17405__$1);

return statearr_17490;
})();
var statearr_17491_17567 = state_17463__$1;
(statearr_17491_17567[(2)] = null);

(statearr_17491_17567[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (40))){
var inst_17431 = (state_17463[(23)]);
var inst_17435 = done(null);
var inst_17436 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_17431);
var state_17463__$1 = (function (){var statearr_17492 = state_17463;
(statearr_17492[(24)] = inst_17435);

return statearr_17492;
})();
var statearr_17493_17568 = state_17463__$1;
(statearr_17493_17568[(2)] = inst_17436);

(statearr_17493_17568[(1)] = (41));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (33))){
var inst_17422 = (state_17463[(25)]);
var inst_17424 = cljs.core.chunked_seq_QMARK_(inst_17422);
var state_17463__$1 = state_17463;
if(inst_17424){
var statearr_17494_17569 = state_17463__$1;
(statearr_17494_17569[(1)] = (36));

} else {
var statearr_17495_17570 = state_17463__$1;
(statearr_17495_17570[(1)] = (37));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (13))){
var inst_17352 = (state_17463[(26)]);
var inst_17355 = cljs.core.async.close_BANG_(inst_17352);
var state_17463__$1 = state_17463;
var statearr_17496_17571 = state_17463__$1;
(statearr_17496_17571[(2)] = inst_17355);

(statearr_17496_17571[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (22))){
var inst_17375 = (state_17463[(8)]);
var inst_17378 = cljs.core.async.close_BANG_(inst_17375);
var state_17463__$1 = state_17463;
var statearr_17497_17572 = state_17463__$1;
(statearr_17497_17572[(2)] = inst_17378);

(statearr_17497_17572[(1)] = (24));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (36))){
var inst_17422 = (state_17463[(25)]);
var inst_17426 = cljs.core.chunk_first(inst_17422);
var inst_17427 = cljs.core.chunk_rest(inst_17422);
var inst_17428 = cljs.core.count(inst_17426);
var inst_17403 = inst_17427;
var inst_17404 = inst_17426;
var inst_17405 = inst_17428;
var inst_17406 = (0);
var state_17463__$1 = (function (){var statearr_17498 = state_17463;
(statearr_17498[(9)] = inst_17404);

(statearr_17498[(11)] = inst_17406);

(statearr_17498[(20)] = inst_17403);

(statearr_17498[(21)] = inst_17405);

return statearr_17498;
})();
var statearr_17499_17573 = state_17463__$1;
(statearr_17499_17573[(2)] = null);

(statearr_17499_17573[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (41))){
var inst_17422 = (state_17463[(25)]);
var inst_17438 = (state_17463[(2)]);
var inst_17439 = cljs.core.next(inst_17422);
var inst_17403 = inst_17439;
var inst_17404 = null;
var inst_17405 = (0);
var inst_17406 = (0);
var state_17463__$1 = (function (){var statearr_17500 = state_17463;
(statearr_17500[(9)] = inst_17404);

(statearr_17500[(11)] = inst_17406);

(statearr_17500[(20)] = inst_17403);

(statearr_17500[(21)] = inst_17405);

(statearr_17500[(27)] = inst_17438);

return statearr_17500;
})();
var statearr_17501_17574 = state_17463__$1;
(statearr_17501_17574[(2)] = null);

(statearr_17501_17574[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (43))){
var state_17463__$1 = state_17463;
var statearr_17502_17575 = state_17463__$1;
(statearr_17502_17575[(2)] = null);

(statearr_17502_17575[(1)] = (44));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (29))){
var inst_17447 = (state_17463[(2)]);
var state_17463__$1 = state_17463;
var statearr_17503_17576 = state_17463__$1;
(statearr_17503_17576[(2)] = inst_17447);

(statearr_17503_17576[(1)] = (26));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (44))){
var inst_17456 = (state_17463[(2)]);
var state_17463__$1 = (function (){var statearr_17504 = state_17463;
(statearr_17504[(28)] = inst_17456);

return statearr_17504;
})();
var statearr_17505_17577 = state_17463__$1;
(statearr_17505_17577[(2)] = null);

(statearr_17505_17577[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (6))){
var inst_17395 = (state_17463[(29)]);
var inst_17394 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cs) : cljs.core.deref.call(null,cs));
var inst_17395__$1 = cljs.core.keys(inst_17394);
var inst_17396 = cljs.core.count(inst_17395__$1);
var inst_17397 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,inst_17396) : cljs.core.reset_BANG_.call(null,dctr,inst_17396));
var inst_17402 = cljs.core.seq(inst_17395__$1);
var inst_17403 = inst_17402;
var inst_17404 = null;
var inst_17405 = (0);
var inst_17406 = (0);
var state_17463__$1 = (function (){var statearr_17506 = state_17463;
(statearr_17506[(30)] = inst_17397);

(statearr_17506[(9)] = inst_17404);

(statearr_17506[(29)] = inst_17395__$1);

(statearr_17506[(11)] = inst_17406);

(statearr_17506[(20)] = inst_17403);

(statearr_17506[(21)] = inst_17405);

return statearr_17506;
})();
var statearr_17507_17578 = state_17463__$1;
(statearr_17507_17578[(2)] = null);

(statearr_17507_17578[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (28))){
var inst_17403 = (state_17463[(20)]);
var inst_17422 = (state_17463[(25)]);
var inst_17422__$1 = cljs.core.seq(inst_17403);
var state_17463__$1 = (function (){var statearr_17508 = state_17463;
(statearr_17508[(25)] = inst_17422__$1);

return statearr_17508;
})();
if(inst_17422__$1){
var statearr_17509_17579 = state_17463__$1;
(statearr_17509_17579[(1)] = (33));

} else {
var statearr_17510_17580 = state_17463__$1;
(statearr_17510_17580[(1)] = (34));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (25))){
var inst_17406 = (state_17463[(11)]);
var inst_17405 = (state_17463[(21)]);
var inst_17408 = (inst_17406 < inst_17405);
var inst_17409 = inst_17408;
var state_17463__$1 = state_17463;
if(cljs.core.truth_(inst_17409)){
var statearr_17511_17581 = state_17463__$1;
(statearr_17511_17581[(1)] = (27));

} else {
var statearr_17512_17582 = state_17463__$1;
(statearr_17512_17582[(1)] = (28));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (34))){
var state_17463__$1 = state_17463;
var statearr_17513_17583 = state_17463__$1;
(statearr_17513_17583[(2)] = null);

(statearr_17513_17583[(1)] = (35));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (17))){
var state_17463__$1 = state_17463;
var statearr_17514_17584 = state_17463__$1;
(statearr_17514_17584[(2)] = null);

(statearr_17514_17584[(1)] = (18));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (3))){
var inst_17461 = (state_17463[(2)]);
var state_17463__$1 = state_17463;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17463__$1,inst_17461);
} else {
if((state_val_17464 === (12))){
var inst_17390 = (state_17463[(2)]);
var state_17463__$1 = state_17463;
var statearr_17515_17585 = state_17463__$1;
(statearr_17515_17585[(2)] = inst_17390);

(statearr_17515_17585[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (2))){
var state_17463__$1 = state_17463;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17463__$1,(4),ch);
} else {
if((state_val_17464 === (23))){
var state_17463__$1 = state_17463;
var statearr_17516_17586 = state_17463__$1;
(statearr_17516_17586[(2)] = null);

(statearr_17516_17586[(1)] = (24));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (35))){
var inst_17445 = (state_17463[(2)]);
var state_17463__$1 = state_17463;
var statearr_17517_17587 = state_17463__$1;
(statearr_17517_17587[(2)] = inst_17445);

(statearr_17517_17587[(1)] = (29));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (19))){
var inst_17362 = (state_17463[(7)]);
var inst_17366 = cljs.core.chunk_first(inst_17362);
var inst_17367 = cljs.core.chunk_rest(inst_17362);
var inst_17368 = cljs.core.count(inst_17366);
var inst_17340 = inst_17367;
var inst_17341 = inst_17366;
var inst_17342 = inst_17368;
var inst_17343 = (0);
var state_17463__$1 = (function (){var statearr_17518 = state_17463;
(statearr_17518[(13)] = inst_17342);

(statearr_17518[(14)] = inst_17341);

(statearr_17518[(16)] = inst_17343);

(statearr_17518[(17)] = inst_17340);

return statearr_17518;
})();
var statearr_17519_17588 = state_17463__$1;
(statearr_17519_17588[(2)] = null);

(statearr_17519_17588[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (11))){
var inst_17362 = (state_17463[(7)]);
var inst_17340 = (state_17463[(17)]);
var inst_17362__$1 = cljs.core.seq(inst_17340);
var state_17463__$1 = (function (){var statearr_17520 = state_17463;
(statearr_17520[(7)] = inst_17362__$1);

return statearr_17520;
})();
if(inst_17362__$1){
var statearr_17521_17589 = state_17463__$1;
(statearr_17521_17589[(1)] = (16));

} else {
var statearr_17522_17590 = state_17463__$1;
(statearr_17522_17590[(1)] = (17));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (9))){
var inst_17392 = (state_17463[(2)]);
var state_17463__$1 = state_17463;
var statearr_17523_17591 = state_17463__$1;
(statearr_17523_17591[(2)] = inst_17392);

(statearr_17523_17591[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (5))){
var inst_17338 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cs) : cljs.core.deref.call(null,cs));
var inst_17339 = cljs.core.seq(inst_17338);
var inst_17340 = inst_17339;
var inst_17341 = null;
var inst_17342 = (0);
var inst_17343 = (0);
var state_17463__$1 = (function (){var statearr_17524 = state_17463;
(statearr_17524[(13)] = inst_17342);

(statearr_17524[(14)] = inst_17341);

(statearr_17524[(16)] = inst_17343);

(statearr_17524[(17)] = inst_17340);

return statearr_17524;
})();
var statearr_17525_17592 = state_17463__$1;
(statearr_17525_17592[(2)] = null);

(statearr_17525_17592[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (14))){
var state_17463__$1 = state_17463;
var statearr_17526_17593 = state_17463__$1;
(statearr_17526_17593[(2)] = null);

(statearr_17526_17593[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (45))){
var inst_17453 = (state_17463[(2)]);
var state_17463__$1 = state_17463;
var statearr_17527_17594 = state_17463__$1;
(statearr_17527_17594[(2)] = inst_17453);

(statearr_17527_17594[(1)] = (44));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (26))){
var inst_17395 = (state_17463[(29)]);
var inst_17449 = (state_17463[(2)]);
var inst_17450 = cljs.core.seq(inst_17395);
var state_17463__$1 = (function (){var statearr_17528 = state_17463;
(statearr_17528[(31)] = inst_17449);

return statearr_17528;
})();
if(inst_17450){
var statearr_17529_17595 = state_17463__$1;
(statearr_17529_17595[(1)] = (42));

} else {
var statearr_17530_17596 = state_17463__$1;
(statearr_17530_17596[(1)] = (43));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (16))){
var inst_17362 = (state_17463[(7)]);
var inst_17364 = cljs.core.chunked_seq_QMARK_(inst_17362);
var state_17463__$1 = state_17463;
if(inst_17364){
var statearr_17531_17597 = state_17463__$1;
(statearr_17531_17597[(1)] = (19));

} else {
var statearr_17532_17598 = state_17463__$1;
(statearr_17532_17598[(1)] = (20));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (38))){
var inst_17442 = (state_17463[(2)]);
var state_17463__$1 = state_17463;
var statearr_17533_17599 = state_17463__$1;
(statearr_17533_17599[(2)] = inst_17442);

(statearr_17533_17599[(1)] = (35));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (30))){
var state_17463__$1 = state_17463;
var statearr_17534_17600 = state_17463__$1;
(statearr_17534_17600[(2)] = null);

(statearr_17534_17600[(1)] = (32));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (10))){
var inst_17341 = (state_17463[(14)]);
var inst_17343 = (state_17463[(16)]);
var inst_17351 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_17341,inst_17343);
var inst_17352 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17351,(0),null);
var inst_17353 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17351,(1),null);
var state_17463__$1 = (function (){var statearr_17535 = state_17463;
(statearr_17535[(26)] = inst_17352);

return statearr_17535;
})();
if(cljs.core.truth_(inst_17353)){
var statearr_17536_17601 = state_17463__$1;
(statearr_17536_17601[(1)] = (13));

} else {
var statearr_17537_17602 = state_17463__$1;
(statearr_17537_17602[(1)] = (14));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (18))){
var inst_17388 = (state_17463[(2)]);
var state_17463__$1 = state_17463;
var statearr_17538_17603 = state_17463__$1;
(statearr_17538_17603[(2)] = inst_17388);

(statearr_17538_17603[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (42))){
var state_17463__$1 = state_17463;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17463__$1,(45),dchan);
} else {
if((state_val_17464 === (37))){
var inst_17331 = (state_17463[(10)]);
var inst_17422 = (state_17463[(25)]);
var inst_17431 = (state_17463[(23)]);
var inst_17431__$1 = cljs.core.first(inst_17422);
var inst_17432 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_17431__$1,inst_17331,done);
var state_17463__$1 = (function (){var statearr_17539 = state_17463;
(statearr_17539[(23)] = inst_17431__$1);

return statearr_17539;
})();
if(cljs.core.truth_(inst_17432)){
var statearr_17540_17604 = state_17463__$1;
(statearr_17540_17604[(1)] = (39));

} else {
var statearr_17541_17605 = state_17463__$1;
(statearr_17541_17605[(1)] = (40));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17464 === (8))){
var inst_17342 = (state_17463[(13)]);
var inst_17343 = (state_17463[(16)]);
var inst_17345 = (inst_17343 < inst_17342);
var inst_17346 = inst_17345;
var state_17463__$1 = state_17463;
if(cljs.core.truth_(inst_17346)){
var statearr_17542_17606 = state_17463__$1;
(statearr_17542_17606[(1)] = (10));

} else {
var statearr_17543_17607 = state_17463__$1;
(statearr_17543_17607[(1)] = (11));

}

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
}
}
}
}
}
});})(c__16204__auto___17553,cs,m,dchan,dctr,done))
;
return ((function (switch__16088__auto__,c__16204__auto___17553,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__16089__auto__ = null;
var cljs$core$async$mult_$_state_machine__16089__auto____0 = (function (){
var statearr_17547 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17547[(0)] = cljs$core$async$mult_$_state_machine__16089__auto__);

(statearr_17547[(1)] = (1));

return statearr_17547;
});
var cljs$core$async$mult_$_state_machine__16089__auto____1 = (function (state_17463){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_17463);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e17548){if((e17548 instanceof Object)){
var ex__16092__auto__ = e17548;
var statearr_17549_17608 = state_17463;
(statearr_17549_17608[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_17463);

return cljs.core.cst$kw$recur;
} else {
throw e17548;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__17609 = state_17463;
state_17463 = G__17609;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__16089__auto__ = function(state_17463){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__16089__auto____1.call(this,state_17463);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__16089__auto____0;
cljs$core$async$mult_$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__16089__auto____1;
return cljs$core$async$mult_$_state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___17553,cs,m,dchan,dctr,done))
})();
var state__16206__auto__ = (function (){var statearr_17550 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_17550[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___17553);

return statearr_17550;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___17553,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var args17610 = [];
var len__8202__auto___17613 = arguments.length;
var i__8203__auto___17614 = (0);
while(true){
if((i__8203__auto___17614 < len__8202__auto___17613)){
args17610.push((arguments[i__8203__auto___17614]));

var G__17615 = (i__8203__auto___17614 + (1));
i__8203__auto___17614 = G__17615;
continue;
} else {
}
break;
}

var G__17612 = args17610.length;
switch (G__17612) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17610.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__7732__auto__ = (((m == null))?null:m);
var m__7733__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__7733__auto__.call(null,m,ch));
} else {
var m__7733__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2(m,ch) : m__7733__auto____$1.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__7732__auto__ = (((m == null))?null:m);
var m__7733__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__7733__auto__.call(null,m,ch));
} else {
var m__7733__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2(m,ch) : m__7733__auto____$1.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__7732__auto__ = (((m == null))?null:m);
var m__7733__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$1 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__7733__auto__.call(null,m));
} else {
var m__7733__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$1(m) : m__7733__auto____$1.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((!((m == null))) && (!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__7732__auto__ = (((m == null))?null:m);
var m__7733__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__7733__auto__.call(null,m,state_map));
} else {
var m__7733__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__7733__auto____$1.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((!((m == null))) && (!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__7732__auto__ = (((m == null))?null:m);
var m__7733__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__7733__auto__.call(null,m,mode));
} else {
var m__7733__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2(m,mode) : m__7733__auto____$1.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__8209__auto__ = [];
var len__8202__auto___17627 = arguments.length;
var i__8203__auto___17628 = (0);
while(true){
if((i__8203__auto___17628 < len__8202__auto___17627)){
args__8209__auto__.push((arguments[i__8203__auto___17628]));

var G__17629 = (i__8203__auto___17628 + (1));
i__8203__auto___17628 = G__17629;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((3) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__8210__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__17621){
var map__17622 = p__17621;
var map__17622__$1 = ((((!((map__17622 == null)))?((((map__17622.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17622.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17622):map__17622);
var opts = map__17622__$1;
var statearr_17624_17630 = state;
(statearr_17624_17630[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__6363__auto__ = cljs.core.async.do_alts(((function (map__17622,map__17622__$1,opts){
return (function (val){
var statearr_17625_17631 = state;
(statearr_17625_17631[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
});})(map__17622,map__17622__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__6363__auto__)){
var cb = temp__6363__auto__;
var statearr_17626_17632 = state;
(statearr_17626_17632[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cb) : cljs.core.deref.call(null,cb)));


return cljs.core.cst$kw$recur;
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq17617){
var G__17618 = cljs.core.first(seq17617);
var seq17617__$1 = cljs.core.next(seq17617);
var G__17619 = cljs.core.first(seq17617__$1);
var seq17617__$2 = cljs.core.next(seq17617__$1);
var G__17620 = cljs.core.first(seq17617__$2);
var seq17617__$3 = cljs.core.next(seq17617__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__17618,G__17619,G__17620,seq17617__$3);
});

/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = (function (){var G__17801 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__17801) : cljs.core.atom.call(null,G__17801));
})();
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$pause,null,cljs.core.cst$kw$mute,null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,cljs.core.cst$kw$solo);
var solo_mode = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$mute) : cljs.core.atom.call(null,cljs.core.cst$kw$mute));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv(((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cs) : cljs.core.deref.call(null,cs));
var mode = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(solo_mode) : cljs.core.deref.call(null,solo_mode));
var solos = pick(cljs.core.cst$kw$solo,chs);
var pauses = pick(cljs.core.cst$kw$pause,chs);
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$solos,solos,cljs.core.cst$kw$mutes,pick(cljs.core.cst$kw$mute,chs),cljs.core.cst$kw$reads,cljs.core.conj.cljs$core$IFn$_invoke$arity$2((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,cljs.core.cst$kw$pause)) && (!(cljs.core.empty_QMARK_(solos))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async17802 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17802 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta17803){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta17803 = meta17803;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async17802.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_17804,meta17803__$1){
var self__ = this;
var _17804__$1 = this;
return (new cljs.core.async.t_cljs$core$async17802(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta17803__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17802.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_17804){
var self__ = this;
var _17804__$1 = this;
return self__.meta17803;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17802.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async17802.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17802.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async17802.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17802.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17802.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
var G__17805_17969 = self__.cs;
var G__17806_17970 = cljs.core.PersistentArrayMap.EMPTY;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__17805_17969,G__17806_17970) : cljs.core.reset_BANG_.call(null,G__17805_17969,G__17806_17970));

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17802.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17802.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str("(solo-modes mode)")].join('')));
}

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(self__.solo_mode,mode) : cljs.core.reset_BANG_.call(null,self__.solo_mode,mode));

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17802.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$change,cljs.core.with_meta(cljs.core.cst$sym$mix,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$out], null))),cljs.core.cst$kw$doc,"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),cljs.core.cst$sym$solo_DASH_mode,cljs.core.cst$sym$pick,cljs.core.cst$sym$cs,cljs.core.cst$sym$calc_DASH_state,cljs.core.cst$sym$out,cljs.core.cst$sym$changed,cljs.core.cst$sym$solo_DASH_modes,cljs.core.cst$sym$attrs,cljs.core.cst$sym$meta17803], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17802.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async17802.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17802";

cljs.core.async.t_cljs$core$async17802.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async17802");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async17802 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async17802(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta17803){
return (new cljs.core.async.t_cljs$core$async17802(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta17803));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async17802(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__16204__auto___17971 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___17971,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___17971,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_17906){
var state_val_17907 = (state_17906[(1)]);
if((state_val_17907 === (7))){
var inst_17822 = (state_17906[(2)]);
var state_17906__$1 = state_17906;
var statearr_17908_17972 = state_17906__$1;
(statearr_17908_17972[(2)] = inst_17822);

(statearr_17908_17972[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (20))){
var inst_17834 = (state_17906[(7)]);
var state_17906__$1 = state_17906;
var statearr_17909_17973 = state_17906__$1;
(statearr_17909_17973[(2)] = inst_17834);

(statearr_17909_17973[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (27))){
var state_17906__$1 = state_17906;
var statearr_17910_17974 = state_17906__$1;
(statearr_17910_17974[(2)] = null);

(statearr_17910_17974[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (1))){
var inst_17810 = (state_17906[(8)]);
var inst_17810__$1 = calc_state();
var inst_17812 = (inst_17810__$1 == null);
var inst_17813 = cljs.core.not(inst_17812);
var state_17906__$1 = (function (){var statearr_17911 = state_17906;
(statearr_17911[(8)] = inst_17810__$1);

return statearr_17911;
})();
if(inst_17813){
var statearr_17912_17975 = state_17906__$1;
(statearr_17912_17975[(1)] = (2));

} else {
var statearr_17913_17976 = state_17906__$1;
(statearr_17913_17976[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (24))){
var inst_17880 = (state_17906[(9)]);
var inst_17857 = (state_17906[(10)]);
var inst_17866 = (state_17906[(11)]);
var inst_17880__$1 = (inst_17857.cljs$core$IFn$_invoke$arity$1 ? inst_17857.cljs$core$IFn$_invoke$arity$1(inst_17866) : inst_17857.call(null,inst_17866));
var state_17906__$1 = (function (){var statearr_17914 = state_17906;
(statearr_17914[(9)] = inst_17880__$1);

return statearr_17914;
})();
if(cljs.core.truth_(inst_17880__$1)){
var statearr_17915_17977 = state_17906__$1;
(statearr_17915_17977[(1)] = (29));

} else {
var statearr_17916_17978 = state_17906__$1;
(statearr_17916_17978[(1)] = (30));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (4))){
var inst_17825 = (state_17906[(2)]);
var state_17906__$1 = state_17906;
if(cljs.core.truth_(inst_17825)){
var statearr_17917_17979 = state_17906__$1;
(statearr_17917_17979[(1)] = (8));

} else {
var statearr_17918_17980 = state_17906__$1;
(statearr_17918_17980[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (15))){
var inst_17851 = (state_17906[(2)]);
var state_17906__$1 = state_17906;
if(cljs.core.truth_(inst_17851)){
var statearr_17919_17981 = state_17906__$1;
(statearr_17919_17981[(1)] = (19));

} else {
var statearr_17920_17982 = state_17906__$1;
(statearr_17920_17982[(1)] = (20));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (21))){
var inst_17856 = (state_17906[(12)]);
var inst_17856__$1 = (state_17906[(2)]);
var inst_17857 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17856__$1,cljs.core.cst$kw$solos);
var inst_17858 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17856__$1,cljs.core.cst$kw$mutes);
var inst_17859 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17856__$1,cljs.core.cst$kw$reads);
var state_17906__$1 = (function (){var statearr_17921 = state_17906;
(statearr_17921[(13)] = inst_17858);

(statearr_17921[(12)] = inst_17856__$1);

(statearr_17921[(10)] = inst_17857);

return statearr_17921;
})();
return cljs.core.async.ioc_alts_BANG_(state_17906__$1,(22),inst_17859);
} else {
if((state_val_17907 === (31))){
var inst_17888 = (state_17906[(2)]);
var state_17906__$1 = state_17906;
if(cljs.core.truth_(inst_17888)){
var statearr_17922_17983 = state_17906__$1;
(statearr_17922_17983[(1)] = (32));

} else {
var statearr_17923_17984 = state_17906__$1;
(statearr_17923_17984[(1)] = (33));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (32))){
var inst_17865 = (state_17906[(14)]);
var state_17906__$1 = state_17906;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17906__$1,(35),out,inst_17865);
} else {
if((state_val_17907 === (33))){
var inst_17856 = (state_17906[(12)]);
var inst_17834 = inst_17856;
var state_17906__$1 = (function (){var statearr_17924 = state_17906;
(statearr_17924[(7)] = inst_17834);

return statearr_17924;
})();
var statearr_17925_17985 = state_17906__$1;
(statearr_17925_17985[(2)] = null);

(statearr_17925_17985[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (13))){
var inst_17834 = (state_17906[(7)]);
var inst_17841 = inst_17834.cljs$lang$protocol_mask$partition0$;
var inst_17842 = (inst_17841 & (64));
var inst_17843 = inst_17834.cljs$core$ISeq$;
var inst_17844 = (inst_17842) || (inst_17843);
var state_17906__$1 = state_17906;
if(cljs.core.truth_(inst_17844)){
var statearr_17926_17986 = state_17906__$1;
(statearr_17926_17986[(1)] = (16));

} else {
var statearr_17927_17987 = state_17906__$1;
(statearr_17927_17987[(1)] = (17));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (22))){
var inst_17865 = (state_17906[(14)]);
var inst_17866 = (state_17906[(11)]);
var inst_17864 = (state_17906[(2)]);
var inst_17865__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17864,(0),null);
var inst_17866__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17864,(1),null);
var inst_17867 = (inst_17865__$1 == null);
var inst_17868 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_17866__$1,change);
var inst_17869 = (inst_17867) || (inst_17868);
var state_17906__$1 = (function (){var statearr_17928 = state_17906;
(statearr_17928[(14)] = inst_17865__$1);

(statearr_17928[(11)] = inst_17866__$1);

return statearr_17928;
})();
if(cljs.core.truth_(inst_17869)){
var statearr_17929_17988 = state_17906__$1;
(statearr_17929_17988[(1)] = (23));

} else {
var statearr_17930_17989 = state_17906__$1;
(statearr_17930_17989[(1)] = (24));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (36))){
var inst_17856 = (state_17906[(12)]);
var inst_17834 = inst_17856;
var state_17906__$1 = (function (){var statearr_17931 = state_17906;
(statearr_17931[(7)] = inst_17834);

return statearr_17931;
})();
var statearr_17932_17990 = state_17906__$1;
(statearr_17932_17990[(2)] = null);

(statearr_17932_17990[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (29))){
var inst_17880 = (state_17906[(9)]);
var state_17906__$1 = state_17906;
var statearr_17933_17991 = state_17906__$1;
(statearr_17933_17991[(2)] = inst_17880);

(statearr_17933_17991[(1)] = (31));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (6))){
var state_17906__$1 = state_17906;
var statearr_17934_17992 = state_17906__$1;
(statearr_17934_17992[(2)] = false);

(statearr_17934_17992[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (28))){
var inst_17876 = (state_17906[(2)]);
var inst_17877 = calc_state();
var inst_17834 = inst_17877;
var state_17906__$1 = (function (){var statearr_17935 = state_17906;
(statearr_17935[(15)] = inst_17876);

(statearr_17935[(7)] = inst_17834);

return statearr_17935;
})();
var statearr_17936_17993 = state_17906__$1;
(statearr_17936_17993[(2)] = null);

(statearr_17936_17993[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (25))){
var inst_17902 = (state_17906[(2)]);
var state_17906__$1 = state_17906;
var statearr_17937_17994 = state_17906__$1;
(statearr_17937_17994[(2)] = inst_17902);

(statearr_17937_17994[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (34))){
var inst_17900 = (state_17906[(2)]);
var state_17906__$1 = state_17906;
var statearr_17938_17995 = state_17906__$1;
(statearr_17938_17995[(2)] = inst_17900);

(statearr_17938_17995[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (17))){
var state_17906__$1 = state_17906;
var statearr_17939_17996 = state_17906__$1;
(statearr_17939_17996[(2)] = false);

(statearr_17939_17996[(1)] = (18));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (3))){
var state_17906__$1 = state_17906;
var statearr_17940_17997 = state_17906__$1;
(statearr_17940_17997[(2)] = false);

(statearr_17940_17997[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (12))){
var inst_17904 = (state_17906[(2)]);
var state_17906__$1 = state_17906;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17906__$1,inst_17904);
} else {
if((state_val_17907 === (2))){
var inst_17810 = (state_17906[(8)]);
var inst_17815 = inst_17810.cljs$lang$protocol_mask$partition0$;
var inst_17816 = (inst_17815 & (64));
var inst_17817 = inst_17810.cljs$core$ISeq$;
var inst_17818 = (inst_17816) || (inst_17817);
var state_17906__$1 = state_17906;
if(cljs.core.truth_(inst_17818)){
var statearr_17941_17998 = state_17906__$1;
(statearr_17941_17998[(1)] = (5));

} else {
var statearr_17942_17999 = state_17906__$1;
(statearr_17942_17999[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (23))){
var inst_17865 = (state_17906[(14)]);
var inst_17871 = (inst_17865 == null);
var state_17906__$1 = state_17906;
if(cljs.core.truth_(inst_17871)){
var statearr_17943_18000 = state_17906__$1;
(statearr_17943_18000[(1)] = (26));

} else {
var statearr_17944_18001 = state_17906__$1;
(statearr_17944_18001[(1)] = (27));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (35))){
var inst_17891 = (state_17906[(2)]);
var state_17906__$1 = state_17906;
if(cljs.core.truth_(inst_17891)){
var statearr_17945_18002 = state_17906__$1;
(statearr_17945_18002[(1)] = (36));

} else {
var statearr_17946_18003 = state_17906__$1;
(statearr_17946_18003[(1)] = (37));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (19))){
var inst_17834 = (state_17906[(7)]);
var inst_17853 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_17834);
var state_17906__$1 = state_17906;
var statearr_17947_18004 = state_17906__$1;
(statearr_17947_18004[(2)] = inst_17853);

(statearr_17947_18004[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (11))){
var inst_17834 = (state_17906[(7)]);
var inst_17838 = (inst_17834 == null);
var inst_17839 = cljs.core.not(inst_17838);
var state_17906__$1 = state_17906;
if(inst_17839){
var statearr_17948_18005 = state_17906__$1;
(statearr_17948_18005[(1)] = (13));

} else {
var statearr_17949_18006 = state_17906__$1;
(statearr_17949_18006[(1)] = (14));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (9))){
var inst_17810 = (state_17906[(8)]);
var state_17906__$1 = state_17906;
var statearr_17950_18007 = state_17906__$1;
(statearr_17950_18007[(2)] = inst_17810);

(statearr_17950_18007[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (5))){
var state_17906__$1 = state_17906;
var statearr_17951_18008 = state_17906__$1;
(statearr_17951_18008[(2)] = true);

(statearr_17951_18008[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (14))){
var state_17906__$1 = state_17906;
var statearr_17952_18009 = state_17906__$1;
(statearr_17952_18009[(2)] = false);

(statearr_17952_18009[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (26))){
var inst_17866 = (state_17906[(11)]);
var inst_17873 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_17866);
var state_17906__$1 = state_17906;
var statearr_17953_18010 = state_17906__$1;
(statearr_17953_18010[(2)] = inst_17873);

(statearr_17953_18010[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (16))){
var state_17906__$1 = state_17906;
var statearr_17954_18011 = state_17906__$1;
(statearr_17954_18011[(2)] = true);

(statearr_17954_18011[(1)] = (18));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (38))){
var inst_17896 = (state_17906[(2)]);
var state_17906__$1 = state_17906;
var statearr_17955_18012 = state_17906__$1;
(statearr_17955_18012[(2)] = inst_17896);

(statearr_17955_18012[(1)] = (34));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (30))){
var inst_17858 = (state_17906[(13)]);
var inst_17857 = (state_17906[(10)]);
var inst_17866 = (state_17906[(11)]);
var inst_17883 = cljs.core.empty_QMARK_(inst_17857);
var inst_17884 = (inst_17858.cljs$core$IFn$_invoke$arity$1 ? inst_17858.cljs$core$IFn$_invoke$arity$1(inst_17866) : inst_17858.call(null,inst_17866));
var inst_17885 = cljs.core.not(inst_17884);
var inst_17886 = (inst_17883) && (inst_17885);
var state_17906__$1 = state_17906;
var statearr_17956_18013 = state_17906__$1;
(statearr_17956_18013[(2)] = inst_17886);

(statearr_17956_18013[(1)] = (31));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (10))){
var inst_17810 = (state_17906[(8)]);
var inst_17830 = (state_17906[(2)]);
var inst_17831 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17830,cljs.core.cst$kw$solos);
var inst_17832 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17830,cljs.core.cst$kw$mutes);
var inst_17833 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17830,cljs.core.cst$kw$reads);
var inst_17834 = inst_17810;
var state_17906__$1 = (function (){var statearr_17957 = state_17906;
(statearr_17957[(7)] = inst_17834);

(statearr_17957[(16)] = inst_17833);

(statearr_17957[(17)] = inst_17832);

(statearr_17957[(18)] = inst_17831);

return statearr_17957;
})();
var statearr_17958_18014 = state_17906__$1;
(statearr_17958_18014[(2)] = null);

(statearr_17958_18014[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (18))){
var inst_17848 = (state_17906[(2)]);
var state_17906__$1 = state_17906;
var statearr_17959_18015 = state_17906__$1;
(statearr_17959_18015[(2)] = inst_17848);

(statearr_17959_18015[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (37))){
var state_17906__$1 = state_17906;
var statearr_17960_18016 = state_17906__$1;
(statearr_17960_18016[(2)] = null);

(statearr_17960_18016[(1)] = (38));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17907 === (8))){
var inst_17810 = (state_17906[(8)]);
var inst_17827 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_17810);
var state_17906__$1 = state_17906;
var statearr_17961_18017 = state_17906__$1;
(statearr_17961_18017[(2)] = inst_17827);

(statearr_17961_18017[(1)] = (10));


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
}
}
}
}
}
}
}
}
});})(c__16204__auto___17971,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__16088__auto__,c__16204__auto___17971,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__16089__auto__ = null;
var cljs$core$async$mix_$_state_machine__16089__auto____0 = (function (){
var statearr_17965 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17965[(0)] = cljs$core$async$mix_$_state_machine__16089__auto__);

(statearr_17965[(1)] = (1));

return statearr_17965;
});
var cljs$core$async$mix_$_state_machine__16089__auto____1 = (function (state_17906){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_17906);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e17966){if((e17966 instanceof Object)){
var ex__16092__auto__ = e17966;
var statearr_17967_18018 = state_17906;
(statearr_17967_18018[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_17906);

return cljs.core.cst$kw$recur;
} else {
throw e17966;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__18019 = state_17906;
state_17906 = G__18019;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__16089__auto__ = function(state_17906){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__16089__auto____1.call(this,state_17906);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__16089__auto____0;
cljs$core$async$mix_$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__16089__auto____1;
return cljs$core$async$mix_$_state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___17971,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__16206__auto__ = (function (){var statearr_17968 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_17968[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___17971);

return statearr_17968;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___17971,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((!((p == null))) && (!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__7732__auto__ = (((p == null))?null:p);
var m__7733__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$4 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__7733__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__7733__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$4 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__7733__auto____$1.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__7732__auto__ = (((p == null))?null:p);
var m__7733__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$3 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__7733__auto__.call(null,p,v,ch));
} else {
var m__7733__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__7733__auto____$1.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var args18020 = [];
var len__8202__auto___18023 = arguments.length;
var i__8203__auto___18024 = (0);
while(true){
if((i__8203__auto___18024 < len__8202__auto___18023)){
args18020.push((arguments[i__8203__auto___18024]));

var G__18025 = (i__8203__auto___18024 + (1));
i__8203__auto___18024 = G__18025;
continue;
} else {
}
break;
}

var G__18022 = args18020.length;
switch (G__18022) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18020.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__7732__auto__ = (((p == null))?null:p);
var m__7733__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$1 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__7733__auto__.call(null,p));
} else {
var m__7733__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$1(p) : m__7733__auto____$1.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__7732__auto__ = (((p == null))?null:p);
var m__7733__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__7732__auto__)]);
if(!((m__7733__auto__ == null))){
return (m__7733__auto__.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__7733__auto__.call(null,p,v));
} else {
var m__7733__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__7733__auto____$1 == null))){
return (m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__7733__auto____$1.cljs$core$IFn$_invoke$arity$2(p,v) : m__7733__auto____$1.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var args18028 = [];
var len__8202__auto___18156 = arguments.length;
var i__8203__auto___18157 = (0);
while(true){
if((i__8203__auto___18157 < len__8202__auto___18156)){
args18028.push((arguments[i__8203__auto___18157]));

var G__18158 = (i__8203__auto___18157 + (1));
i__8203__auto___18157 = G__18158;
continue;
} else {
}
break;
}

var G__18030 = args18028.length;
switch (G__18030) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18028.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = (function (){var G__18031 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__18031) : cljs.core.atom.call(null,G__18031));
})();
var ensure_mult = ((function (mults){
return (function (topic){
var or__7019__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mults) : cljs.core.deref.call(null,mults)),topic);
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,((function (or__7019__auto__,mults){
return (function (p1__18027_SHARP_){
if(cljs.core.truth_((p1__18027_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__18027_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__18027_SHARP_.call(null,topic)))){
return p1__18027_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__18027_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
});})(or__7019__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async18032 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18032 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta18033){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta18033 = meta18033;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18032.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_18034,meta18033__$1){
var self__ = this;
var _18034__$1 = this;
return (new cljs.core.async.t_cljs$core$async18032(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta18033__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18032.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_18034){
var self__ = this;
var _18034__$1 = this;
return self__.meta18033;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18032.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async18032.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18032.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async18032.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18032.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__6363__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.mults) : cljs.core.deref.call(null,self__.mults)),topic);
if(cljs.core.truth_(temp__6363__auto__)){
var m = temp__6363__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18032.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
var G__18035 = self__.mults;
var G__18036 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__18035,G__18036) : cljs.core.reset_BANG_.call(null,G__18035,G__18036));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18032.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18032.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$ch,cljs.core.cst$sym$topic_DASH_fn,cljs.core.cst$sym$buf_DASH_fn,cljs.core.cst$sym$mults,cljs.core.cst$sym$ensure_DASH_mult,cljs.core.cst$sym$meta18033], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18032.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18032.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18032";

cljs.core.async.t_cljs$core$async18032.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async18032");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async18032 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async18032(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta18033){
return (new cljs.core.async.t_cljs$core$async18032(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta18033));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async18032(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__16204__auto___18160 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___18160,mults,ensure_mult,p){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___18160,mults,ensure_mult,p){
return (function (state_18108){
var state_val_18109 = (state_18108[(1)]);
if((state_val_18109 === (7))){
var inst_18104 = (state_18108[(2)]);
var state_18108__$1 = state_18108;
var statearr_18110_18161 = state_18108__$1;
(statearr_18110_18161[(2)] = inst_18104);

(statearr_18110_18161[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (20))){
var state_18108__$1 = state_18108;
var statearr_18111_18162 = state_18108__$1;
(statearr_18111_18162[(2)] = null);

(statearr_18111_18162[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (1))){
var state_18108__$1 = state_18108;
var statearr_18112_18163 = state_18108__$1;
(statearr_18112_18163[(2)] = null);

(statearr_18112_18163[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (24))){
var inst_18087 = (state_18108[(7)]);
var inst_18096 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_18087);
var state_18108__$1 = state_18108;
var statearr_18113_18164 = state_18108__$1;
(statearr_18113_18164[(2)] = inst_18096);

(statearr_18113_18164[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (4))){
var inst_18039 = (state_18108[(8)]);
var inst_18039__$1 = (state_18108[(2)]);
var inst_18040 = (inst_18039__$1 == null);
var state_18108__$1 = (function (){var statearr_18114 = state_18108;
(statearr_18114[(8)] = inst_18039__$1);

return statearr_18114;
})();
if(cljs.core.truth_(inst_18040)){
var statearr_18115_18165 = state_18108__$1;
(statearr_18115_18165[(1)] = (5));

} else {
var statearr_18116_18166 = state_18108__$1;
(statearr_18116_18166[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (15))){
var inst_18081 = (state_18108[(2)]);
var state_18108__$1 = state_18108;
var statearr_18117_18167 = state_18108__$1;
(statearr_18117_18167[(2)] = inst_18081);

(statearr_18117_18167[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (21))){
var inst_18101 = (state_18108[(2)]);
var state_18108__$1 = (function (){var statearr_18118 = state_18108;
(statearr_18118[(9)] = inst_18101);

return statearr_18118;
})();
var statearr_18119_18168 = state_18108__$1;
(statearr_18119_18168[(2)] = null);

(statearr_18119_18168[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (13))){
var inst_18063 = (state_18108[(10)]);
var inst_18065 = cljs.core.chunked_seq_QMARK_(inst_18063);
var state_18108__$1 = state_18108;
if(inst_18065){
var statearr_18120_18169 = state_18108__$1;
(statearr_18120_18169[(1)] = (16));

} else {
var statearr_18121_18170 = state_18108__$1;
(statearr_18121_18170[(1)] = (17));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (22))){
var inst_18093 = (state_18108[(2)]);
var state_18108__$1 = state_18108;
if(cljs.core.truth_(inst_18093)){
var statearr_18122_18171 = state_18108__$1;
(statearr_18122_18171[(1)] = (23));

} else {
var statearr_18123_18172 = state_18108__$1;
(statearr_18123_18172[(1)] = (24));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (6))){
var inst_18087 = (state_18108[(7)]);
var inst_18039 = (state_18108[(8)]);
var inst_18089 = (state_18108[(11)]);
var inst_18087__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_18039) : topic_fn.call(null,inst_18039));
var inst_18088 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mults) : cljs.core.deref.call(null,mults));
var inst_18089__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_18088,inst_18087__$1);
var state_18108__$1 = (function (){var statearr_18124 = state_18108;
(statearr_18124[(7)] = inst_18087__$1);

(statearr_18124[(11)] = inst_18089__$1);

return statearr_18124;
})();
if(cljs.core.truth_(inst_18089__$1)){
var statearr_18125_18173 = state_18108__$1;
(statearr_18125_18173[(1)] = (19));

} else {
var statearr_18126_18174 = state_18108__$1;
(statearr_18126_18174[(1)] = (20));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (25))){
var inst_18098 = (state_18108[(2)]);
var state_18108__$1 = state_18108;
var statearr_18127_18175 = state_18108__$1;
(statearr_18127_18175[(2)] = inst_18098);

(statearr_18127_18175[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (17))){
var inst_18063 = (state_18108[(10)]);
var inst_18072 = cljs.core.first(inst_18063);
var inst_18073 = cljs.core.async.muxch_STAR_(inst_18072);
var inst_18074 = cljs.core.async.close_BANG_(inst_18073);
var inst_18075 = cljs.core.next(inst_18063);
var inst_18049 = inst_18075;
var inst_18050 = null;
var inst_18051 = (0);
var inst_18052 = (0);
var state_18108__$1 = (function (){var statearr_18128 = state_18108;
(statearr_18128[(12)] = inst_18051);

(statearr_18128[(13)] = inst_18074);

(statearr_18128[(14)] = inst_18050);

(statearr_18128[(15)] = inst_18052);

(statearr_18128[(16)] = inst_18049);

return statearr_18128;
})();
var statearr_18129_18176 = state_18108__$1;
(statearr_18129_18176[(2)] = null);

(statearr_18129_18176[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (3))){
var inst_18106 = (state_18108[(2)]);
var state_18108__$1 = state_18108;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18108__$1,inst_18106);
} else {
if((state_val_18109 === (12))){
var inst_18083 = (state_18108[(2)]);
var state_18108__$1 = state_18108;
var statearr_18130_18177 = state_18108__$1;
(statearr_18130_18177[(2)] = inst_18083);

(statearr_18130_18177[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (2))){
var state_18108__$1 = state_18108;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18108__$1,(4),ch);
} else {
if((state_val_18109 === (23))){
var state_18108__$1 = state_18108;
var statearr_18131_18178 = state_18108__$1;
(statearr_18131_18178[(2)] = null);

(statearr_18131_18178[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (19))){
var inst_18039 = (state_18108[(8)]);
var inst_18089 = (state_18108[(11)]);
var inst_18091 = cljs.core.async.muxch_STAR_(inst_18089);
var state_18108__$1 = state_18108;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18108__$1,(22),inst_18091,inst_18039);
} else {
if((state_val_18109 === (11))){
var inst_18063 = (state_18108[(10)]);
var inst_18049 = (state_18108[(16)]);
var inst_18063__$1 = cljs.core.seq(inst_18049);
var state_18108__$1 = (function (){var statearr_18132 = state_18108;
(statearr_18132[(10)] = inst_18063__$1);

return statearr_18132;
})();
if(inst_18063__$1){
var statearr_18133_18179 = state_18108__$1;
(statearr_18133_18179[(1)] = (13));

} else {
var statearr_18134_18180 = state_18108__$1;
(statearr_18134_18180[(1)] = (14));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (9))){
var inst_18085 = (state_18108[(2)]);
var state_18108__$1 = state_18108;
var statearr_18135_18181 = state_18108__$1;
(statearr_18135_18181[(2)] = inst_18085);

(statearr_18135_18181[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (5))){
var inst_18046 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mults) : cljs.core.deref.call(null,mults));
var inst_18047 = cljs.core.vals(inst_18046);
var inst_18048 = cljs.core.seq(inst_18047);
var inst_18049 = inst_18048;
var inst_18050 = null;
var inst_18051 = (0);
var inst_18052 = (0);
var state_18108__$1 = (function (){var statearr_18136 = state_18108;
(statearr_18136[(12)] = inst_18051);

(statearr_18136[(14)] = inst_18050);

(statearr_18136[(15)] = inst_18052);

(statearr_18136[(16)] = inst_18049);

return statearr_18136;
})();
var statearr_18137_18182 = state_18108__$1;
(statearr_18137_18182[(2)] = null);

(statearr_18137_18182[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (14))){
var state_18108__$1 = state_18108;
var statearr_18141_18183 = state_18108__$1;
(statearr_18141_18183[(2)] = null);

(statearr_18141_18183[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (16))){
var inst_18063 = (state_18108[(10)]);
var inst_18067 = cljs.core.chunk_first(inst_18063);
var inst_18068 = cljs.core.chunk_rest(inst_18063);
var inst_18069 = cljs.core.count(inst_18067);
var inst_18049 = inst_18068;
var inst_18050 = inst_18067;
var inst_18051 = inst_18069;
var inst_18052 = (0);
var state_18108__$1 = (function (){var statearr_18142 = state_18108;
(statearr_18142[(12)] = inst_18051);

(statearr_18142[(14)] = inst_18050);

(statearr_18142[(15)] = inst_18052);

(statearr_18142[(16)] = inst_18049);

return statearr_18142;
})();
var statearr_18143_18184 = state_18108__$1;
(statearr_18143_18184[(2)] = null);

(statearr_18143_18184[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (10))){
var inst_18051 = (state_18108[(12)]);
var inst_18050 = (state_18108[(14)]);
var inst_18052 = (state_18108[(15)]);
var inst_18049 = (state_18108[(16)]);
var inst_18057 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_18050,inst_18052);
var inst_18058 = cljs.core.async.muxch_STAR_(inst_18057);
var inst_18059 = cljs.core.async.close_BANG_(inst_18058);
var inst_18060 = (inst_18052 + (1));
var tmp18138 = inst_18051;
var tmp18139 = inst_18050;
var tmp18140 = inst_18049;
var inst_18049__$1 = tmp18140;
var inst_18050__$1 = tmp18139;
var inst_18051__$1 = tmp18138;
var inst_18052__$1 = inst_18060;
var state_18108__$1 = (function (){var statearr_18144 = state_18108;
(statearr_18144[(12)] = inst_18051__$1);

(statearr_18144[(14)] = inst_18050__$1);

(statearr_18144[(15)] = inst_18052__$1);

(statearr_18144[(17)] = inst_18059);

(statearr_18144[(16)] = inst_18049__$1);

return statearr_18144;
})();
var statearr_18145_18185 = state_18108__$1;
(statearr_18145_18185[(2)] = null);

(statearr_18145_18185[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (18))){
var inst_18078 = (state_18108[(2)]);
var state_18108__$1 = state_18108;
var statearr_18146_18186 = state_18108__$1;
(statearr_18146_18186[(2)] = inst_18078);

(statearr_18146_18186[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18109 === (8))){
var inst_18051 = (state_18108[(12)]);
var inst_18052 = (state_18108[(15)]);
var inst_18054 = (inst_18052 < inst_18051);
var inst_18055 = inst_18054;
var state_18108__$1 = state_18108;
if(cljs.core.truth_(inst_18055)){
var statearr_18147_18187 = state_18108__$1;
(statearr_18147_18187[(1)] = (10));

} else {
var statearr_18148_18188 = state_18108__$1;
(statearr_18148_18188[(1)] = (11));

}

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
}
}
}
}
}
});})(c__16204__auto___18160,mults,ensure_mult,p))
;
return ((function (switch__16088__auto__,c__16204__auto___18160,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__16089__auto__ = null;
var cljs$core$async$state_machine__16089__auto____0 = (function (){
var statearr_18152 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18152[(0)] = cljs$core$async$state_machine__16089__auto__);

(statearr_18152[(1)] = (1));

return statearr_18152;
});
var cljs$core$async$state_machine__16089__auto____1 = (function (state_18108){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_18108);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e18153){if((e18153 instanceof Object)){
var ex__16092__auto__ = e18153;
var statearr_18154_18189 = state_18108;
(statearr_18154_18189[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18108);

return cljs.core.cst$kw$recur;
} else {
throw e18153;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__18190 = state_18108;
state_18108 = G__18190;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$state_machine__16089__auto__ = function(state_18108){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16089__auto____1.call(this,state_18108);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16089__auto____0;
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16089__auto____1;
return cljs$core$async$state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___18160,mults,ensure_mult,p))
})();
var state__16206__auto__ = (function (){var statearr_18155 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_18155[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___18160);

return statearr_18155;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___18160,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var args18191 = [];
var len__8202__auto___18194 = arguments.length;
var i__8203__auto___18195 = (0);
while(true){
if((i__8203__auto___18195 < len__8202__auto___18194)){
args18191.push((arguments[i__8203__auto___18195]));

var G__18196 = (i__8203__auto___18195 + (1));
i__8203__auto___18195 = G__18196;
continue;
} else {
}
break;
}

var G__18193 = args18191.length;
switch (G__18193) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18191.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var args18198 = [];
var len__8202__auto___18201 = arguments.length;
var i__8203__auto___18202 = (0);
while(true){
if((i__8203__auto___18202 < len__8202__auto___18201)){
args18198.push((arguments[i__8203__auto___18202]));

var G__18203 = (i__8203__auto___18202 + (1));
i__8203__auto___18202 = G__18203;
continue;
} else {
}
break;
}

var G__18200 = args18198.length;
switch (G__18200) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18198.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1(p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2(p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var args18205 = [];
var len__8202__auto___18276 = arguments.length;
var i__8203__auto___18277 = (0);
while(true){
if((i__8203__auto___18277 < len__8202__auto___18276)){
args18205.push((arguments[i__8203__auto___18277]));

var G__18278 = (i__8203__auto___18277 + (1));
i__8203__auto___18277 = G__18278;
continue;
} else {
}
break;
}

var G__18207 = args18205.length;
switch (G__18207) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18205.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
var c__16204__auto___18280 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___18280,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___18280,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_18246){
var state_val_18247 = (state_18246[(1)]);
if((state_val_18247 === (7))){
var state_18246__$1 = state_18246;
var statearr_18248_18281 = state_18246__$1;
(statearr_18248_18281[(2)] = null);

(statearr_18248_18281[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18247 === (1))){
var state_18246__$1 = state_18246;
var statearr_18249_18282 = state_18246__$1;
(statearr_18249_18282[(2)] = null);

(statearr_18249_18282[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18247 === (4))){
var inst_18210 = (state_18246[(7)]);
var inst_18212 = (inst_18210 < cnt);
var state_18246__$1 = state_18246;
if(cljs.core.truth_(inst_18212)){
var statearr_18250_18283 = state_18246__$1;
(statearr_18250_18283[(1)] = (6));

} else {
var statearr_18251_18284 = state_18246__$1;
(statearr_18251_18284[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18247 === (15))){
var inst_18242 = (state_18246[(2)]);
var state_18246__$1 = state_18246;
var statearr_18252_18285 = state_18246__$1;
(statearr_18252_18285[(2)] = inst_18242);

(statearr_18252_18285[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18247 === (13))){
var inst_18235 = cljs.core.async.close_BANG_(out);
var state_18246__$1 = state_18246;
var statearr_18253_18286 = state_18246__$1;
(statearr_18253_18286[(2)] = inst_18235);

(statearr_18253_18286[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18247 === (6))){
var state_18246__$1 = state_18246;
var statearr_18254_18287 = state_18246__$1;
(statearr_18254_18287[(2)] = null);

(statearr_18254_18287[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18247 === (3))){
var inst_18244 = (state_18246[(2)]);
var state_18246__$1 = state_18246;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18246__$1,inst_18244);
} else {
if((state_val_18247 === (12))){
var inst_18232 = (state_18246[(8)]);
var inst_18232__$1 = (state_18246[(2)]);
var inst_18233 = cljs.core.some(cljs.core.nil_QMARK_,inst_18232__$1);
var state_18246__$1 = (function (){var statearr_18255 = state_18246;
(statearr_18255[(8)] = inst_18232__$1);

return statearr_18255;
})();
if(cljs.core.truth_(inst_18233)){
var statearr_18256_18288 = state_18246__$1;
(statearr_18256_18288[(1)] = (13));

} else {
var statearr_18257_18289 = state_18246__$1;
(statearr_18257_18289[(1)] = (14));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18247 === (2))){
var inst_18209 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cnt) : cljs.core.reset_BANG_.call(null,dctr,cnt));
var inst_18210 = (0);
var state_18246__$1 = (function (){var statearr_18258 = state_18246;
(statearr_18258[(9)] = inst_18209);

(statearr_18258[(7)] = inst_18210);

return statearr_18258;
})();
var statearr_18259_18290 = state_18246__$1;
(statearr_18259_18290[(2)] = null);

(statearr_18259_18290[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18247 === (11))){
var inst_18210 = (state_18246[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame(state_18246,(10),Object,null,(9));
var inst_18219 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_18210) : chs__$1.call(null,inst_18210));
var inst_18220 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_18210) : done.call(null,inst_18210));
var inst_18221 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_18219,inst_18220);
var state_18246__$1 = state_18246;
var statearr_18260_18291 = state_18246__$1;
(statearr_18260_18291[(2)] = inst_18221);


cljs.core.async.impl.ioc_helpers.process_exception(state_18246__$1);

return cljs.core.cst$kw$recur;
} else {
if((state_val_18247 === (9))){
var inst_18210 = (state_18246[(7)]);
var inst_18223 = (state_18246[(2)]);
var inst_18224 = (inst_18210 + (1));
var inst_18210__$1 = inst_18224;
var state_18246__$1 = (function (){var statearr_18261 = state_18246;
(statearr_18261[(10)] = inst_18223);

(statearr_18261[(7)] = inst_18210__$1);

return statearr_18261;
})();
var statearr_18262_18292 = state_18246__$1;
(statearr_18262_18292[(2)] = null);

(statearr_18262_18292[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18247 === (5))){
var inst_18230 = (state_18246[(2)]);
var state_18246__$1 = (function (){var statearr_18263 = state_18246;
(statearr_18263[(11)] = inst_18230);

return statearr_18263;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18246__$1,(12),dchan);
} else {
if((state_val_18247 === (14))){
var inst_18232 = (state_18246[(8)]);
var inst_18237 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_18232);
var state_18246__$1 = state_18246;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18246__$1,(16),out,inst_18237);
} else {
if((state_val_18247 === (16))){
var inst_18239 = (state_18246[(2)]);
var state_18246__$1 = (function (){var statearr_18264 = state_18246;
(statearr_18264[(12)] = inst_18239);

return statearr_18264;
})();
var statearr_18265_18293 = state_18246__$1;
(statearr_18265_18293[(2)] = null);

(statearr_18265_18293[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18247 === (10))){
var inst_18214 = (state_18246[(2)]);
var inst_18215 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_18246__$1 = (function (){var statearr_18266 = state_18246;
(statearr_18266[(13)] = inst_18214);

return statearr_18266;
})();
var statearr_18267_18294 = state_18246__$1;
(statearr_18267_18294[(2)] = inst_18215);


cljs.core.async.impl.ioc_helpers.process_exception(state_18246__$1);

return cljs.core.cst$kw$recur;
} else {
if((state_val_18247 === (8))){
var inst_18228 = (state_18246[(2)]);
var state_18246__$1 = state_18246;
var statearr_18268_18295 = state_18246__$1;
(statearr_18268_18295[(2)] = inst_18228);

(statearr_18268_18295[(1)] = (5));


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
}
}
}
}
}
}
});})(c__16204__auto___18280,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__16088__auto__,c__16204__auto___18280,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__16089__auto__ = null;
var cljs$core$async$state_machine__16089__auto____0 = (function (){
var statearr_18272 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18272[(0)] = cljs$core$async$state_machine__16089__auto__);

(statearr_18272[(1)] = (1));

return statearr_18272;
});
var cljs$core$async$state_machine__16089__auto____1 = (function (state_18246){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_18246);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e18273){if((e18273 instanceof Object)){
var ex__16092__auto__ = e18273;
var statearr_18274_18296 = state_18246;
(statearr_18274_18296[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18246);

return cljs.core.cst$kw$recur;
} else {
throw e18273;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__18297 = state_18246;
state_18246 = G__18297;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$state_machine__16089__auto__ = function(state_18246){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16089__auto____1.call(this,state_18246);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16089__auto____0;
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16089__auto____1;
return cljs$core$async$state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___18280,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__16206__auto__ = (function (){var statearr_18275 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_18275[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___18280);

return statearr_18275;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___18280,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var args18299 = [];
var len__8202__auto___18357 = arguments.length;
var i__8203__auto___18358 = (0);
while(true){
if((i__8203__auto___18358 < len__8202__auto___18357)){
args18299.push((arguments[i__8203__auto___18358]));

var G__18359 = (i__8203__auto___18358 + (1));
i__8203__auto___18358 = G__18359;
continue;
} else {
}
break;
}

var G__18301 = args18299.length;
switch (G__18301) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18299.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16204__auto___18361 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___18361,out){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___18361,out){
return (function (state_18333){
var state_val_18334 = (state_18333[(1)]);
if((state_val_18334 === (7))){
var inst_18312 = (state_18333[(7)]);
var inst_18313 = (state_18333[(8)]);
var inst_18312__$1 = (state_18333[(2)]);
var inst_18313__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_18312__$1,(0),null);
var inst_18314 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_18312__$1,(1),null);
var inst_18315 = (inst_18313__$1 == null);
var state_18333__$1 = (function (){var statearr_18335 = state_18333;
(statearr_18335[(7)] = inst_18312__$1);

(statearr_18335[(8)] = inst_18313__$1);

(statearr_18335[(9)] = inst_18314);

return statearr_18335;
})();
if(cljs.core.truth_(inst_18315)){
var statearr_18336_18362 = state_18333__$1;
(statearr_18336_18362[(1)] = (8));

} else {
var statearr_18337_18363 = state_18333__$1;
(statearr_18337_18363[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18334 === (1))){
var inst_18302 = cljs.core.vec(chs);
var inst_18303 = inst_18302;
var state_18333__$1 = (function (){var statearr_18338 = state_18333;
(statearr_18338[(10)] = inst_18303);

return statearr_18338;
})();
var statearr_18339_18364 = state_18333__$1;
(statearr_18339_18364[(2)] = null);

(statearr_18339_18364[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18334 === (4))){
var inst_18303 = (state_18333[(10)]);
var state_18333__$1 = state_18333;
return cljs.core.async.ioc_alts_BANG_(state_18333__$1,(7),inst_18303);
} else {
if((state_val_18334 === (6))){
var inst_18329 = (state_18333[(2)]);
var state_18333__$1 = state_18333;
var statearr_18340_18365 = state_18333__$1;
(statearr_18340_18365[(2)] = inst_18329);

(statearr_18340_18365[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18334 === (3))){
var inst_18331 = (state_18333[(2)]);
var state_18333__$1 = state_18333;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18333__$1,inst_18331);
} else {
if((state_val_18334 === (2))){
var inst_18303 = (state_18333[(10)]);
var inst_18305 = cljs.core.count(inst_18303);
var inst_18306 = (inst_18305 > (0));
var state_18333__$1 = state_18333;
if(cljs.core.truth_(inst_18306)){
var statearr_18342_18366 = state_18333__$1;
(statearr_18342_18366[(1)] = (4));

} else {
var statearr_18343_18367 = state_18333__$1;
(statearr_18343_18367[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18334 === (11))){
var inst_18303 = (state_18333[(10)]);
var inst_18322 = (state_18333[(2)]);
var tmp18341 = inst_18303;
var inst_18303__$1 = tmp18341;
var state_18333__$1 = (function (){var statearr_18344 = state_18333;
(statearr_18344[(11)] = inst_18322);

(statearr_18344[(10)] = inst_18303__$1);

return statearr_18344;
})();
var statearr_18345_18368 = state_18333__$1;
(statearr_18345_18368[(2)] = null);

(statearr_18345_18368[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18334 === (9))){
var inst_18313 = (state_18333[(8)]);
var state_18333__$1 = state_18333;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18333__$1,(11),out,inst_18313);
} else {
if((state_val_18334 === (5))){
var inst_18327 = cljs.core.async.close_BANG_(out);
var state_18333__$1 = state_18333;
var statearr_18346_18369 = state_18333__$1;
(statearr_18346_18369[(2)] = inst_18327);

(statearr_18346_18369[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18334 === (10))){
var inst_18325 = (state_18333[(2)]);
var state_18333__$1 = state_18333;
var statearr_18347_18370 = state_18333__$1;
(statearr_18347_18370[(2)] = inst_18325);

(statearr_18347_18370[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18334 === (8))){
var inst_18312 = (state_18333[(7)]);
var inst_18303 = (state_18333[(10)]);
var inst_18313 = (state_18333[(8)]);
var inst_18314 = (state_18333[(9)]);
var inst_18317 = (function (){var cs = inst_18303;
var vec__18308 = inst_18312;
var v = inst_18313;
var c = inst_18314;
return ((function (cs,vec__18308,v,c,inst_18312,inst_18303,inst_18313,inst_18314,state_val_18334,c__16204__auto___18361,out){
return (function (p1__18298_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__18298_SHARP_);
});
;})(cs,vec__18308,v,c,inst_18312,inst_18303,inst_18313,inst_18314,state_val_18334,c__16204__auto___18361,out))
})();
var inst_18318 = cljs.core.filterv(inst_18317,inst_18303);
var inst_18303__$1 = inst_18318;
var state_18333__$1 = (function (){var statearr_18348 = state_18333;
(statearr_18348[(10)] = inst_18303__$1);

return statearr_18348;
})();
var statearr_18349_18371 = state_18333__$1;
(statearr_18349_18371[(2)] = null);

(statearr_18349_18371[(1)] = (2));


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
}
});})(c__16204__auto___18361,out))
;
return ((function (switch__16088__auto__,c__16204__auto___18361,out){
return (function() {
var cljs$core$async$state_machine__16089__auto__ = null;
var cljs$core$async$state_machine__16089__auto____0 = (function (){
var statearr_18353 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18353[(0)] = cljs$core$async$state_machine__16089__auto__);

(statearr_18353[(1)] = (1));

return statearr_18353;
});
var cljs$core$async$state_machine__16089__auto____1 = (function (state_18333){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_18333);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e18354){if((e18354 instanceof Object)){
var ex__16092__auto__ = e18354;
var statearr_18355_18372 = state_18333;
(statearr_18355_18372[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18333);

return cljs.core.cst$kw$recur;
} else {
throw e18354;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__18373 = state_18333;
state_18333 = G__18373;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$state_machine__16089__auto__ = function(state_18333){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16089__auto____1.call(this,state_18333);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16089__auto____0;
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16089__auto____1;
return cljs$core$async$state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___18361,out))
})();
var state__16206__auto__ = (function (){var statearr_18356 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_18356[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___18361);

return statearr_18356;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___18361,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var args18374 = [];
var len__8202__auto___18423 = arguments.length;
var i__8203__auto___18424 = (0);
while(true){
if((i__8203__auto___18424 < len__8202__auto___18423)){
args18374.push((arguments[i__8203__auto___18424]));

var G__18425 = (i__8203__auto___18424 + (1));
i__8203__auto___18424 = G__18425;
continue;
} else {
}
break;
}

var G__18376 = args18374.length;
switch (G__18376) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18374.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16204__auto___18427 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___18427,out){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___18427,out){
return (function (state_18400){
var state_val_18401 = (state_18400[(1)]);
if((state_val_18401 === (7))){
var inst_18382 = (state_18400[(7)]);
var inst_18382__$1 = (state_18400[(2)]);
var inst_18383 = (inst_18382__$1 == null);
var inst_18384 = cljs.core.not(inst_18383);
var state_18400__$1 = (function (){var statearr_18402 = state_18400;
(statearr_18402[(7)] = inst_18382__$1);

return statearr_18402;
})();
if(inst_18384){
var statearr_18403_18428 = state_18400__$1;
(statearr_18403_18428[(1)] = (8));

} else {
var statearr_18404_18429 = state_18400__$1;
(statearr_18404_18429[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18401 === (1))){
var inst_18377 = (0);
var state_18400__$1 = (function (){var statearr_18405 = state_18400;
(statearr_18405[(8)] = inst_18377);

return statearr_18405;
})();
var statearr_18406_18430 = state_18400__$1;
(statearr_18406_18430[(2)] = null);

(statearr_18406_18430[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18401 === (4))){
var state_18400__$1 = state_18400;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18400__$1,(7),ch);
} else {
if((state_val_18401 === (6))){
var inst_18395 = (state_18400[(2)]);
var state_18400__$1 = state_18400;
var statearr_18407_18431 = state_18400__$1;
(statearr_18407_18431[(2)] = inst_18395);

(statearr_18407_18431[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18401 === (3))){
var inst_18397 = (state_18400[(2)]);
var inst_18398 = cljs.core.async.close_BANG_(out);
var state_18400__$1 = (function (){var statearr_18408 = state_18400;
(statearr_18408[(9)] = inst_18397);

return statearr_18408;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_18400__$1,inst_18398);
} else {
if((state_val_18401 === (2))){
var inst_18377 = (state_18400[(8)]);
var inst_18379 = (inst_18377 < n);
var state_18400__$1 = state_18400;
if(cljs.core.truth_(inst_18379)){
var statearr_18409_18432 = state_18400__$1;
(statearr_18409_18432[(1)] = (4));

} else {
var statearr_18410_18433 = state_18400__$1;
(statearr_18410_18433[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18401 === (11))){
var inst_18377 = (state_18400[(8)]);
var inst_18387 = (state_18400[(2)]);
var inst_18388 = (inst_18377 + (1));
var inst_18377__$1 = inst_18388;
var state_18400__$1 = (function (){var statearr_18411 = state_18400;
(statearr_18411[(10)] = inst_18387);

(statearr_18411[(8)] = inst_18377__$1);

return statearr_18411;
})();
var statearr_18412_18434 = state_18400__$1;
(statearr_18412_18434[(2)] = null);

(statearr_18412_18434[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18401 === (9))){
var state_18400__$1 = state_18400;
var statearr_18413_18435 = state_18400__$1;
(statearr_18413_18435[(2)] = null);

(statearr_18413_18435[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18401 === (5))){
var state_18400__$1 = state_18400;
var statearr_18414_18436 = state_18400__$1;
(statearr_18414_18436[(2)] = null);

(statearr_18414_18436[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18401 === (10))){
var inst_18392 = (state_18400[(2)]);
var state_18400__$1 = state_18400;
var statearr_18415_18437 = state_18400__$1;
(statearr_18415_18437[(2)] = inst_18392);

(statearr_18415_18437[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18401 === (8))){
var inst_18382 = (state_18400[(7)]);
var state_18400__$1 = state_18400;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18400__$1,(11),out,inst_18382);
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
}
});})(c__16204__auto___18427,out))
;
return ((function (switch__16088__auto__,c__16204__auto___18427,out){
return (function() {
var cljs$core$async$state_machine__16089__auto__ = null;
var cljs$core$async$state_machine__16089__auto____0 = (function (){
var statearr_18419 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_18419[(0)] = cljs$core$async$state_machine__16089__auto__);

(statearr_18419[(1)] = (1));

return statearr_18419;
});
var cljs$core$async$state_machine__16089__auto____1 = (function (state_18400){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_18400);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e18420){if((e18420 instanceof Object)){
var ex__16092__auto__ = e18420;
var statearr_18421_18438 = state_18400;
(statearr_18421_18438[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18400);

return cljs.core.cst$kw$recur;
} else {
throw e18420;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__18439 = state_18400;
state_18400 = G__18439;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$state_machine__16089__auto__ = function(state_18400){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16089__auto____1.call(this,state_18400);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16089__auto____0;
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16089__auto____1;
return cljs$core$async$state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___18427,out))
})();
var state__16206__auto__ = (function (){var statearr_18422 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_18422[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___18427);

return statearr_18422;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___18427,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async18449 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18449 = (function (map_LT_,f,ch,meta18450){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta18450 = meta18450;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18449.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18451,meta18450__$1){
var self__ = this;
var _18451__$1 = this;
return (new cljs.core.async.t_cljs$core$async18449(self__.map_LT_,self__.f,self__.ch,meta18450__$1));
});

cljs.core.async.t_cljs$core$async18449.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18451){
var self__ = this;
var _18451__$1 = this;
return self__.meta18450;
});

cljs.core.async.t_cljs$core$async18449.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async18449.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});

cljs.core.async.t_cljs$core$async18449.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
});

cljs.core.async.t_cljs$core$async18449.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async18449.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async18452 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18452 = (function (map_LT_,f,ch,meta18450,_,fn1,meta18453){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta18450 = meta18450;
this._ = _;
this.fn1 = fn1;
this.meta18453 = meta18453;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18452.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_18454,meta18453__$1){
var self__ = this;
var _18454__$1 = this;
return (new cljs.core.async.t_cljs$core$async18452(self__.map_LT_,self__.f,self__.ch,self__.meta18450,self__._,self__.fn1,meta18453__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async18452.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_18454){
var self__ = this;
var _18454__$1 = this;
return self__.meta18453;
});})(___$1))
;

cljs.core.async.t_cljs$core$async18452.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async18452.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async18452.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
});})(___$1))
;

cljs.core.async.t_cljs$core$async18452.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__18440_SHARP_){
var G__18455 = (((p1__18440_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__18440_SHARP_) : self__.f.call(null,p1__18440_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__18455) : f1.call(null,G__18455));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async18452.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$map_LT_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$f,cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Deprecated - this function will be removed. Use transducer instead"], null)),cljs.core.cst$sym$f,cljs.core.cst$sym$ch,cljs.core.cst$sym$meta18450,cljs.core.with_meta(cljs.core.cst$sym$_,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$sym$cljs$core$async_SLASH_t_cljs$core$async18449], null)),cljs.core.cst$sym$fn1,cljs.core.cst$sym$meta18453], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async18452.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18452.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18452";

cljs.core.async.t_cljs$core$async18452.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async18452");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async18452 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async18452(map_LT___$1,f__$1,ch__$1,meta18450__$1,___$2,fn1__$1,meta18453){
return (new cljs.core.async.t_cljs$core$async18452(map_LT___$1,f__$1,ch__$1,meta18450__$1,___$2,fn1__$1,meta18453));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async18452(self__.map_LT_,self__.f,self__.ch,self__.meta18450,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__7007__auto__ = ret;
if(cljs.core.truth_(and__7007__auto__)){
return !(((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret)) == null));
} else {
return and__7007__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__18456 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__18456) : self__.f.call(null,G__18456));
})());
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async18449.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async18449.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async18449.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$map_LT_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$f,cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Deprecated - this function will be removed. Use transducer instead"], null)),cljs.core.cst$sym$f,cljs.core.cst$sym$ch,cljs.core.cst$sym$meta18450], null);
});

cljs.core.async.t_cljs$core$async18449.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18449.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18449";

cljs.core.async.t_cljs$core$async18449.cljs$lang$ctorPrWriter = (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async18449");
});

cljs.core.async.__GT_t_cljs$core$async18449 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async18449(map_LT___$1,f__$1,ch__$1,meta18450){
return (new cljs.core.async.t_cljs$core$async18449(map_LT___$1,f__$1,ch__$1,meta18450));
});

}

return (new cljs.core.async.t_cljs$core$async18449(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async18460 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18460 = (function (map_GT_,f,ch,meta18461){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta18461 = meta18461;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18460.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18462,meta18461__$1){
var self__ = this;
var _18462__$1 = this;
return (new cljs.core.async.t_cljs$core$async18460(self__.map_GT_,self__.f,self__.ch,meta18461__$1));
});

cljs.core.async.t_cljs$core$async18460.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18462){
var self__ = this;
var _18462__$1 = this;
return self__.meta18461;
});

cljs.core.async.t_cljs$core$async18460.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async18460.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});

cljs.core.async.t_cljs$core$async18460.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async18460.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async18460.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async18460.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
});

cljs.core.async.t_cljs$core$async18460.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$map_GT_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$f,cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Deprecated - this function will be removed. Use transducer instead"], null)),cljs.core.cst$sym$f,cljs.core.cst$sym$ch,cljs.core.cst$sym$meta18461], null);
});

cljs.core.async.t_cljs$core$async18460.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18460.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18460";

cljs.core.async.t_cljs$core$async18460.cljs$lang$ctorPrWriter = (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async18460");
});

cljs.core.async.__GT_t_cljs$core$async18460 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async18460(map_GT___$1,f__$1,ch__$1,meta18461){
return (new cljs.core.async.t_cljs$core$async18460(map_GT___$1,f__$1,ch__$1,meta18461));
});

}

return (new cljs.core.async.t_cljs$core$async18460(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async18466 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18466 = (function (filter_GT_,p,ch,meta18467){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta18467 = meta18467;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18466.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18468,meta18467__$1){
var self__ = this;
var _18468__$1 = this;
return (new cljs.core.async.t_cljs$core$async18466(self__.filter_GT_,self__.p,self__.ch,meta18467__$1));
});

cljs.core.async.t_cljs$core$async18466.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18468){
var self__ = this;
var _18468__$1 = this;
return self__.meta18467;
});

cljs.core.async.t_cljs$core$async18466.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async18466.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});

cljs.core.async.t_cljs$core$async18466.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
});

cljs.core.async.t_cljs$core$async18466.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async18466.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async18466.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async18466.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
});

cljs.core.async.t_cljs$core$async18466.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$filter_GT_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p,cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Deprecated - this function will be removed. Use transducer instead"], null)),cljs.core.cst$sym$p,cljs.core.cst$sym$ch,cljs.core.cst$sym$meta18467], null);
});

cljs.core.async.t_cljs$core$async18466.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18466.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18466";

cljs.core.async.t_cljs$core$async18466.cljs$lang$ctorPrWriter = (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async18466");
});

cljs.core.async.__GT_t_cljs$core$async18466 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async18466(filter_GT___$1,p__$1,ch__$1,meta18467){
return (new cljs.core.async.t_cljs$core$async18466(filter_GT___$1,p__$1,ch__$1,meta18467));
});

}

return (new cljs.core.async.t_cljs$core$async18466(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var args18469 = [];
var len__8202__auto___18513 = arguments.length;
var i__8203__auto___18514 = (0);
while(true){
if((i__8203__auto___18514 < len__8202__auto___18513)){
args18469.push((arguments[i__8203__auto___18514]));

var G__18515 = (i__8203__auto___18514 + (1));
i__8203__auto___18514 = G__18515;
continue;
} else {
}
break;
}

var G__18471 = args18469.length;
switch (G__18471) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18469.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16204__auto___18517 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___18517,out){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___18517,out){
return (function (state_18492){
var state_val_18493 = (state_18492[(1)]);
if((state_val_18493 === (7))){
var inst_18488 = (state_18492[(2)]);
var state_18492__$1 = state_18492;
var statearr_18494_18518 = state_18492__$1;
(statearr_18494_18518[(2)] = inst_18488);

(statearr_18494_18518[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18493 === (1))){
var state_18492__$1 = state_18492;
var statearr_18495_18519 = state_18492__$1;
(statearr_18495_18519[(2)] = null);

(statearr_18495_18519[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18493 === (4))){
var inst_18474 = (state_18492[(7)]);
var inst_18474__$1 = (state_18492[(2)]);
var inst_18475 = (inst_18474__$1 == null);
var state_18492__$1 = (function (){var statearr_18496 = state_18492;
(statearr_18496[(7)] = inst_18474__$1);

return statearr_18496;
})();
if(cljs.core.truth_(inst_18475)){
var statearr_18497_18520 = state_18492__$1;
(statearr_18497_18520[(1)] = (5));

} else {
var statearr_18498_18521 = state_18492__$1;
(statearr_18498_18521[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18493 === (6))){
var inst_18474 = (state_18492[(7)]);
var inst_18479 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_18474) : p.call(null,inst_18474));
var state_18492__$1 = state_18492;
if(cljs.core.truth_(inst_18479)){
var statearr_18499_18522 = state_18492__$1;
(statearr_18499_18522[(1)] = (8));

} else {
var statearr_18500_18523 = state_18492__$1;
(statearr_18500_18523[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18493 === (3))){
var inst_18490 = (state_18492[(2)]);
var state_18492__$1 = state_18492;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18492__$1,inst_18490);
} else {
if((state_val_18493 === (2))){
var state_18492__$1 = state_18492;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18492__$1,(4),ch);
} else {
if((state_val_18493 === (11))){
var inst_18482 = (state_18492[(2)]);
var state_18492__$1 = state_18492;
var statearr_18501_18524 = state_18492__$1;
(statearr_18501_18524[(2)] = inst_18482);

(statearr_18501_18524[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18493 === (9))){
var state_18492__$1 = state_18492;
var statearr_18502_18525 = state_18492__$1;
(statearr_18502_18525[(2)] = null);

(statearr_18502_18525[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18493 === (5))){
var inst_18477 = cljs.core.async.close_BANG_(out);
var state_18492__$1 = state_18492;
var statearr_18503_18526 = state_18492__$1;
(statearr_18503_18526[(2)] = inst_18477);

(statearr_18503_18526[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18493 === (10))){
var inst_18485 = (state_18492[(2)]);
var state_18492__$1 = (function (){var statearr_18504 = state_18492;
(statearr_18504[(8)] = inst_18485);

return statearr_18504;
})();
var statearr_18505_18527 = state_18492__$1;
(statearr_18505_18527[(2)] = null);

(statearr_18505_18527[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18493 === (8))){
var inst_18474 = (state_18492[(7)]);
var state_18492__$1 = state_18492;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18492__$1,(11),out,inst_18474);
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
}
});})(c__16204__auto___18517,out))
;
return ((function (switch__16088__auto__,c__16204__auto___18517,out){
return (function() {
var cljs$core$async$state_machine__16089__auto__ = null;
var cljs$core$async$state_machine__16089__auto____0 = (function (){
var statearr_18509 = [null,null,null,null,null,null,null,null,null];
(statearr_18509[(0)] = cljs$core$async$state_machine__16089__auto__);

(statearr_18509[(1)] = (1));

return statearr_18509;
});
var cljs$core$async$state_machine__16089__auto____1 = (function (state_18492){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_18492);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e18510){if((e18510 instanceof Object)){
var ex__16092__auto__ = e18510;
var statearr_18511_18528 = state_18492;
(statearr_18511_18528[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18492);

return cljs.core.cst$kw$recur;
} else {
throw e18510;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__18529 = state_18492;
state_18492 = G__18529;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$state_machine__16089__auto__ = function(state_18492){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16089__auto____1.call(this,state_18492);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16089__auto____0;
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16089__auto____1;
return cljs$core$async$state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___18517,out))
})();
var state__16206__auto__ = (function (){var statearr_18512 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_18512[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___18517);

return statearr_18512;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___18517,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args18530 = [];
var len__8202__auto___18533 = arguments.length;
var i__8203__auto___18534 = (0);
while(true){
if((i__8203__auto___18534 < len__8202__auto___18533)){
args18530.push((arguments[i__8203__auto___18534]));

var G__18535 = (i__8203__auto___18534 + (1));
i__8203__auto___18534 = G__18535;
continue;
} else {
}
break;
}

var G__18532 = args18530.length;
switch (G__18532) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18530.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__16204__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto__){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto__){
return (function (state_18702){
var state_val_18703 = (state_18702[(1)]);
if((state_val_18703 === (7))){
var inst_18698 = (state_18702[(2)]);
var state_18702__$1 = state_18702;
var statearr_18704_18745 = state_18702__$1;
(statearr_18704_18745[(2)] = inst_18698);

(statearr_18704_18745[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (20))){
var inst_18668 = (state_18702[(7)]);
var inst_18679 = (state_18702[(2)]);
var inst_18680 = cljs.core.next(inst_18668);
var inst_18654 = inst_18680;
var inst_18655 = null;
var inst_18656 = (0);
var inst_18657 = (0);
var state_18702__$1 = (function (){var statearr_18705 = state_18702;
(statearr_18705[(8)] = inst_18657);

(statearr_18705[(9)] = inst_18655);

(statearr_18705[(10)] = inst_18654);

(statearr_18705[(11)] = inst_18656);

(statearr_18705[(12)] = inst_18679);

return statearr_18705;
})();
var statearr_18706_18746 = state_18702__$1;
(statearr_18706_18746[(2)] = null);

(statearr_18706_18746[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (1))){
var state_18702__$1 = state_18702;
var statearr_18707_18747 = state_18702__$1;
(statearr_18707_18747[(2)] = null);

(statearr_18707_18747[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (4))){
var inst_18643 = (state_18702[(13)]);
var inst_18643__$1 = (state_18702[(2)]);
var inst_18644 = (inst_18643__$1 == null);
var state_18702__$1 = (function (){var statearr_18708 = state_18702;
(statearr_18708[(13)] = inst_18643__$1);

return statearr_18708;
})();
if(cljs.core.truth_(inst_18644)){
var statearr_18709_18748 = state_18702__$1;
(statearr_18709_18748[(1)] = (5));

} else {
var statearr_18710_18749 = state_18702__$1;
(statearr_18710_18749[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (15))){
var state_18702__$1 = state_18702;
var statearr_18714_18750 = state_18702__$1;
(statearr_18714_18750[(2)] = null);

(statearr_18714_18750[(1)] = (16));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (21))){
var state_18702__$1 = state_18702;
var statearr_18715_18751 = state_18702__$1;
(statearr_18715_18751[(2)] = null);

(statearr_18715_18751[(1)] = (23));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (13))){
var inst_18657 = (state_18702[(8)]);
var inst_18655 = (state_18702[(9)]);
var inst_18654 = (state_18702[(10)]);
var inst_18656 = (state_18702[(11)]);
var inst_18664 = (state_18702[(2)]);
var inst_18665 = (inst_18657 + (1));
var tmp18711 = inst_18655;
var tmp18712 = inst_18654;
var tmp18713 = inst_18656;
var inst_18654__$1 = tmp18712;
var inst_18655__$1 = tmp18711;
var inst_18656__$1 = tmp18713;
var inst_18657__$1 = inst_18665;
var state_18702__$1 = (function (){var statearr_18716 = state_18702;
(statearr_18716[(14)] = inst_18664);

(statearr_18716[(8)] = inst_18657__$1);

(statearr_18716[(9)] = inst_18655__$1);

(statearr_18716[(10)] = inst_18654__$1);

(statearr_18716[(11)] = inst_18656__$1);

return statearr_18716;
})();
var statearr_18717_18752 = state_18702__$1;
(statearr_18717_18752[(2)] = null);

(statearr_18717_18752[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (22))){
var state_18702__$1 = state_18702;
var statearr_18718_18753 = state_18702__$1;
(statearr_18718_18753[(2)] = null);

(statearr_18718_18753[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (6))){
var inst_18643 = (state_18702[(13)]);
var inst_18652 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_18643) : f.call(null,inst_18643));
var inst_18653 = cljs.core.seq(inst_18652);
var inst_18654 = inst_18653;
var inst_18655 = null;
var inst_18656 = (0);
var inst_18657 = (0);
var state_18702__$1 = (function (){var statearr_18719 = state_18702;
(statearr_18719[(8)] = inst_18657);

(statearr_18719[(9)] = inst_18655);

(statearr_18719[(10)] = inst_18654);

(statearr_18719[(11)] = inst_18656);

return statearr_18719;
})();
var statearr_18720_18754 = state_18702__$1;
(statearr_18720_18754[(2)] = null);

(statearr_18720_18754[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (17))){
var inst_18668 = (state_18702[(7)]);
var inst_18672 = cljs.core.chunk_first(inst_18668);
var inst_18673 = cljs.core.chunk_rest(inst_18668);
var inst_18674 = cljs.core.count(inst_18672);
var inst_18654 = inst_18673;
var inst_18655 = inst_18672;
var inst_18656 = inst_18674;
var inst_18657 = (0);
var state_18702__$1 = (function (){var statearr_18721 = state_18702;
(statearr_18721[(8)] = inst_18657);

(statearr_18721[(9)] = inst_18655);

(statearr_18721[(10)] = inst_18654);

(statearr_18721[(11)] = inst_18656);

return statearr_18721;
})();
var statearr_18722_18755 = state_18702__$1;
(statearr_18722_18755[(2)] = null);

(statearr_18722_18755[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (3))){
var inst_18700 = (state_18702[(2)]);
var state_18702__$1 = state_18702;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18702__$1,inst_18700);
} else {
if((state_val_18703 === (12))){
var inst_18688 = (state_18702[(2)]);
var state_18702__$1 = state_18702;
var statearr_18723_18756 = state_18702__$1;
(statearr_18723_18756[(2)] = inst_18688);

(statearr_18723_18756[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (2))){
var state_18702__$1 = state_18702;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18702__$1,(4),in$);
} else {
if((state_val_18703 === (23))){
var inst_18696 = (state_18702[(2)]);
var state_18702__$1 = state_18702;
var statearr_18724_18757 = state_18702__$1;
(statearr_18724_18757[(2)] = inst_18696);

(statearr_18724_18757[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (19))){
var inst_18683 = (state_18702[(2)]);
var state_18702__$1 = state_18702;
var statearr_18725_18758 = state_18702__$1;
(statearr_18725_18758[(2)] = inst_18683);

(statearr_18725_18758[(1)] = (16));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (11))){
var inst_18654 = (state_18702[(10)]);
var inst_18668 = (state_18702[(7)]);
var inst_18668__$1 = cljs.core.seq(inst_18654);
var state_18702__$1 = (function (){var statearr_18726 = state_18702;
(statearr_18726[(7)] = inst_18668__$1);

return statearr_18726;
})();
if(inst_18668__$1){
var statearr_18727_18759 = state_18702__$1;
(statearr_18727_18759[(1)] = (14));

} else {
var statearr_18728_18760 = state_18702__$1;
(statearr_18728_18760[(1)] = (15));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (9))){
var inst_18690 = (state_18702[(2)]);
var inst_18691 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_18702__$1 = (function (){var statearr_18729 = state_18702;
(statearr_18729[(15)] = inst_18690);

return statearr_18729;
})();
if(cljs.core.truth_(inst_18691)){
var statearr_18730_18761 = state_18702__$1;
(statearr_18730_18761[(1)] = (21));

} else {
var statearr_18731_18762 = state_18702__$1;
(statearr_18731_18762[(1)] = (22));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (5))){
var inst_18646 = cljs.core.async.close_BANG_(out);
var state_18702__$1 = state_18702;
var statearr_18732_18763 = state_18702__$1;
(statearr_18732_18763[(2)] = inst_18646);

(statearr_18732_18763[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (14))){
var inst_18668 = (state_18702[(7)]);
var inst_18670 = cljs.core.chunked_seq_QMARK_(inst_18668);
var state_18702__$1 = state_18702;
if(inst_18670){
var statearr_18733_18764 = state_18702__$1;
(statearr_18733_18764[(1)] = (17));

} else {
var statearr_18734_18765 = state_18702__$1;
(statearr_18734_18765[(1)] = (18));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (16))){
var inst_18686 = (state_18702[(2)]);
var state_18702__$1 = state_18702;
var statearr_18735_18766 = state_18702__$1;
(statearr_18735_18766[(2)] = inst_18686);

(statearr_18735_18766[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18703 === (10))){
var inst_18657 = (state_18702[(8)]);
var inst_18655 = (state_18702[(9)]);
var inst_18662 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_18655,inst_18657);
var state_18702__$1 = state_18702;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18702__$1,(13),out,inst_18662);
} else {
if((state_val_18703 === (18))){
var inst_18668 = (state_18702[(7)]);
var inst_18677 = cljs.core.first(inst_18668);
var state_18702__$1 = state_18702;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18702__$1,(20),out,inst_18677);
} else {
if((state_val_18703 === (8))){
var inst_18657 = (state_18702[(8)]);
var inst_18656 = (state_18702[(11)]);
var inst_18659 = (inst_18657 < inst_18656);
var inst_18660 = inst_18659;
var state_18702__$1 = state_18702;
if(cljs.core.truth_(inst_18660)){
var statearr_18736_18767 = state_18702__$1;
(statearr_18736_18767[(1)] = (10));

} else {
var statearr_18737_18768 = state_18702__$1;
(statearr_18737_18768[(1)] = (11));

}

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
}
}
}
});})(c__16204__auto__))
;
return ((function (switch__16088__auto__,c__16204__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__16089__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__16089__auto____0 = (function (){
var statearr_18741 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18741[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__16089__auto__);

(statearr_18741[(1)] = (1));

return statearr_18741;
});
var cljs$core$async$mapcat_STAR__$_state_machine__16089__auto____1 = (function (state_18702){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_18702);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e18742){if((e18742 instanceof Object)){
var ex__16092__auto__ = e18742;
var statearr_18743_18769 = state_18702;
(statearr_18743_18769[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18702);

return cljs.core.cst$kw$recur;
} else {
throw e18742;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__18770 = state_18702;
state_18702 = G__18770;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__16089__auto__ = function(state_18702){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__16089__auto____1.call(this,state_18702);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__16089__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__16089__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto__))
})();
var state__16206__auto__ = (function (){var statearr_18744 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_18744[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto__);

return statearr_18744;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto__))
);

return c__16204__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args18771 = [];
var len__8202__auto___18774 = arguments.length;
var i__8203__auto___18775 = (0);
while(true){
if((i__8203__auto___18775 < len__8202__auto___18774)){
args18771.push((arguments[i__8203__auto___18775]));

var G__18776 = (i__8203__auto___18775 + (1));
i__8203__auto___18775 = G__18776;
continue;
} else {
}
break;
}

var G__18773 = args18771.length;
switch (G__18773) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18771.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var args18778 = [];
var len__8202__auto___18781 = arguments.length;
var i__8203__auto___18782 = (0);
while(true){
if((i__8203__auto___18782 < len__8202__auto___18781)){
args18778.push((arguments[i__8203__auto___18782]));

var G__18783 = (i__8203__auto___18782 + (1));
i__8203__auto___18782 = G__18783;
continue;
} else {
}
break;
}

var G__18780 = args18778.length;
switch (G__18780) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18778.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var args18785 = [];
var len__8202__auto___18836 = arguments.length;
var i__8203__auto___18837 = (0);
while(true){
if((i__8203__auto___18837 < len__8202__auto___18836)){
args18785.push((arguments[i__8203__auto___18837]));

var G__18838 = (i__8203__auto___18837 + (1));
i__8203__auto___18837 = G__18838;
continue;
} else {
}
break;
}

var G__18787 = args18785.length;
switch (G__18787) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18785.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16204__auto___18840 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___18840,out){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___18840,out){
return (function (state_18811){
var state_val_18812 = (state_18811[(1)]);
if((state_val_18812 === (7))){
var inst_18806 = (state_18811[(2)]);
var state_18811__$1 = state_18811;
var statearr_18813_18841 = state_18811__$1;
(statearr_18813_18841[(2)] = inst_18806);

(statearr_18813_18841[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18812 === (1))){
var inst_18788 = null;
var state_18811__$1 = (function (){var statearr_18814 = state_18811;
(statearr_18814[(7)] = inst_18788);

return statearr_18814;
})();
var statearr_18815_18842 = state_18811__$1;
(statearr_18815_18842[(2)] = null);

(statearr_18815_18842[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18812 === (4))){
var inst_18791 = (state_18811[(8)]);
var inst_18791__$1 = (state_18811[(2)]);
var inst_18792 = (inst_18791__$1 == null);
var inst_18793 = cljs.core.not(inst_18792);
var state_18811__$1 = (function (){var statearr_18816 = state_18811;
(statearr_18816[(8)] = inst_18791__$1);

return statearr_18816;
})();
if(inst_18793){
var statearr_18817_18843 = state_18811__$1;
(statearr_18817_18843[(1)] = (5));

} else {
var statearr_18818_18844 = state_18811__$1;
(statearr_18818_18844[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18812 === (6))){
var state_18811__$1 = state_18811;
var statearr_18819_18845 = state_18811__$1;
(statearr_18819_18845[(2)] = null);

(statearr_18819_18845[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18812 === (3))){
var inst_18808 = (state_18811[(2)]);
var inst_18809 = cljs.core.async.close_BANG_(out);
var state_18811__$1 = (function (){var statearr_18820 = state_18811;
(statearr_18820[(9)] = inst_18808);

return statearr_18820;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_18811__$1,inst_18809);
} else {
if((state_val_18812 === (2))){
var state_18811__$1 = state_18811;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18811__$1,(4),ch);
} else {
if((state_val_18812 === (11))){
var inst_18791 = (state_18811[(8)]);
var inst_18800 = (state_18811[(2)]);
var inst_18788 = inst_18791;
var state_18811__$1 = (function (){var statearr_18821 = state_18811;
(statearr_18821[(7)] = inst_18788);

(statearr_18821[(10)] = inst_18800);

return statearr_18821;
})();
var statearr_18822_18846 = state_18811__$1;
(statearr_18822_18846[(2)] = null);

(statearr_18822_18846[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18812 === (9))){
var inst_18791 = (state_18811[(8)]);
var state_18811__$1 = state_18811;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18811__$1,(11),out,inst_18791);
} else {
if((state_val_18812 === (5))){
var inst_18788 = (state_18811[(7)]);
var inst_18791 = (state_18811[(8)]);
var inst_18795 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_18791,inst_18788);
var state_18811__$1 = state_18811;
if(inst_18795){
var statearr_18824_18847 = state_18811__$1;
(statearr_18824_18847[(1)] = (8));

} else {
var statearr_18825_18848 = state_18811__$1;
(statearr_18825_18848[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18812 === (10))){
var inst_18803 = (state_18811[(2)]);
var state_18811__$1 = state_18811;
var statearr_18826_18849 = state_18811__$1;
(statearr_18826_18849[(2)] = inst_18803);

(statearr_18826_18849[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18812 === (8))){
var inst_18788 = (state_18811[(7)]);
var tmp18823 = inst_18788;
var inst_18788__$1 = tmp18823;
var state_18811__$1 = (function (){var statearr_18827 = state_18811;
(statearr_18827[(7)] = inst_18788__$1);

return statearr_18827;
})();
var statearr_18828_18850 = state_18811__$1;
(statearr_18828_18850[(2)] = null);

(statearr_18828_18850[(1)] = (2));


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
}
});})(c__16204__auto___18840,out))
;
return ((function (switch__16088__auto__,c__16204__auto___18840,out){
return (function() {
var cljs$core$async$state_machine__16089__auto__ = null;
var cljs$core$async$state_machine__16089__auto____0 = (function (){
var statearr_18832 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_18832[(0)] = cljs$core$async$state_machine__16089__auto__);

(statearr_18832[(1)] = (1));

return statearr_18832;
});
var cljs$core$async$state_machine__16089__auto____1 = (function (state_18811){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_18811);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e18833){if((e18833 instanceof Object)){
var ex__16092__auto__ = e18833;
var statearr_18834_18851 = state_18811;
(statearr_18834_18851[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18811);

return cljs.core.cst$kw$recur;
} else {
throw e18833;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__18852 = state_18811;
state_18811 = G__18852;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$state_machine__16089__auto__ = function(state_18811){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16089__auto____1.call(this,state_18811);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16089__auto____0;
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16089__auto____1;
return cljs$core$async$state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___18840,out))
})();
var state__16206__auto__ = (function (){var statearr_18835 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_18835[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___18840);

return statearr_18835;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___18840,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args18853 = [];
var len__8202__auto___18923 = arguments.length;
var i__8203__auto___18924 = (0);
while(true){
if((i__8203__auto___18924 < len__8202__auto___18923)){
args18853.push((arguments[i__8203__auto___18924]));

var G__18925 = (i__8203__auto___18924 + (1));
i__8203__auto___18924 = G__18925;
continue;
} else {
}
break;
}

var G__18855 = args18853.length;
switch (G__18855) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18853.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16204__auto___18927 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___18927,out){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___18927,out){
return (function (state_18893){
var state_val_18894 = (state_18893[(1)]);
if((state_val_18894 === (7))){
var inst_18889 = (state_18893[(2)]);
var state_18893__$1 = state_18893;
var statearr_18895_18928 = state_18893__$1;
(statearr_18895_18928[(2)] = inst_18889);

(statearr_18895_18928[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18894 === (1))){
var inst_18856 = (new Array(n));
var inst_18857 = inst_18856;
var inst_18858 = (0);
var state_18893__$1 = (function (){var statearr_18896 = state_18893;
(statearr_18896[(7)] = inst_18858);

(statearr_18896[(8)] = inst_18857);

return statearr_18896;
})();
var statearr_18897_18929 = state_18893__$1;
(statearr_18897_18929[(2)] = null);

(statearr_18897_18929[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18894 === (4))){
var inst_18861 = (state_18893[(9)]);
var inst_18861__$1 = (state_18893[(2)]);
var inst_18862 = (inst_18861__$1 == null);
var inst_18863 = cljs.core.not(inst_18862);
var state_18893__$1 = (function (){var statearr_18898 = state_18893;
(statearr_18898[(9)] = inst_18861__$1);

return statearr_18898;
})();
if(inst_18863){
var statearr_18899_18930 = state_18893__$1;
(statearr_18899_18930[(1)] = (5));

} else {
var statearr_18900_18931 = state_18893__$1;
(statearr_18900_18931[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18894 === (15))){
var inst_18883 = (state_18893[(2)]);
var state_18893__$1 = state_18893;
var statearr_18901_18932 = state_18893__$1;
(statearr_18901_18932[(2)] = inst_18883);

(statearr_18901_18932[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18894 === (13))){
var state_18893__$1 = state_18893;
var statearr_18902_18933 = state_18893__$1;
(statearr_18902_18933[(2)] = null);

(statearr_18902_18933[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18894 === (6))){
var inst_18858 = (state_18893[(7)]);
var inst_18879 = (inst_18858 > (0));
var state_18893__$1 = state_18893;
if(cljs.core.truth_(inst_18879)){
var statearr_18903_18934 = state_18893__$1;
(statearr_18903_18934[(1)] = (12));

} else {
var statearr_18904_18935 = state_18893__$1;
(statearr_18904_18935[(1)] = (13));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18894 === (3))){
var inst_18891 = (state_18893[(2)]);
var state_18893__$1 = state_18893;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18893__$1,inst_18891);
} else {
if((state_val_18894 === (12))){
var inst_18857 = (state_18893[(8)]);
var inst_18881 = cljs.core.vec(inst_18857);
var state_18893__$1 = state_18893;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18893__$1,(15),out,inst_18881);
} else {
if((state_val_18894 === (2))){
var state_18893__$1 = state_18893;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18893__$1,(4),ch);
} else {
if((state_val_18894 === (11))){
var inst_18873 = (state_18893[(2)]);
var inst_18874 = (new Array(n));
var inst_18857 = inst_18874;
var inst_18858 = (0);
var state_18893__$1 = (function (){var statearr_18905 = state_18893;
(statearr_18905[(7)] = inst_18858);

(statearr_18905[(8)] = inst_18857);

(statearr_18905[(10)] = inst_18873);

return statearr_18905;
})();
var statearr_18906_18936 = state_18893__$1;
(statearr_18906_18936[(2)] = null);

(statearr_18906_18936[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18894 === (9))){
var inst_18857 = (state_18893[(8)]);
var inst_18871 = cljs.core.vec(inst_18857);
var state_18893__$1 = state_18893;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18893__$1,(11),out,inst_18871);
} else {
if((state_val_18894 === (5))){
var inst_18858 = (state_18893[(7)]);
var inst_18857 = (state_18893[(8)]);
var inst_18861 = (state_18893[(9)]);
var inst_18866 = (state_18893[(11)]);
var inst_18865 = (inst_18857[inst_18858] = inst_18861);
var inst_18866__$1 = (inst_18858 + (1));
var inst_18867 = (inst_18866__$1 < n);
var state_18893__$1 = (function (){var statearr_18907 = state_18893;
(statearr_18907[(12)] = inst_18865);

(statearr_18907[(11)] = inst_18866__$1);

return statearr_18907;
})();
if(cljs.core.truth_(inst_18867)){
var statearr_18908_18937 = state_18893__$1;
(statearr_18908_18937[(1)] = (8));

} else {
var statearr_18909_18938 = state_18893__$1;
(statearr_18909_18938[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18894 === (14))){
var inst_18886 = (state_18893[(2)]);
var inst_18887 = cljs.core.async.close_BANG_(out);
var state_18893__$1 = (function (){var statearr_18911 = state_18893;
(statearr_18911[(13)] = inst_18886);

return statearr_18911;
})();
var statearr_18912_18939 = state_18893__$1;
(statearr_18912_18939[(2)] = inst_18887);

(statearr_18912_18939[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18894 === (10))){
var inst_18877 = (state_18893[(2)]);
var state_18893__$1 = state_18893;
var statearr_18913_18940 = state_18893__$1;
(statearr_18913_18940[(2)] = inst_18877);

(statearr_18913_18940[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18894 === (8))){
var inst_18857 = (state_18893[(8)]);
var inst_18866 = (state_18893[(11)]);
var tmp18910 = inst_18857;
var inst_18857__$1 = tmp18910;
var inst_18858 = inst_18866;
var state_18893__$1 = (function (){var statearr_18914 = state_18893;
(statearr_18914[(7)] = inst_18858);

(statearr_18914[(8)] = inst_18857__$1);

return statearr_18914;
})();
var statearr_18915_18941 = state_18893__$1;
(statearr_18915_18941[(2)] = null);

(statearr_18915_18941[(1)] = (2));


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
}
}
}
}
}
});})(c__16204__auto___18927,out))
;
return ((function (switch__16088__auto__,c__16204__auto___18927,out){
return (function() {
var cljs$core$async$state_machine__16089__auto__ = null;
var cljs$core$async$state_machine__16089__auto____0 = (function (){
var statearr_18919 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18919[(0)] = cljs$core$async$state_machine__16089__auto__);

(statearr_18919[(1)] = (1));

return statearr_18919;
});
var cljs$core$async$state_machine__16089__auto____1 = (function (state_18893){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_18893);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e18920){if((e18920 instanceof Object)){
var ex__16092__auto__ = e18920;
var statearr_18921_18942 = state_18893;
(statearr_18921_18942[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18893);

return cljs.core.cst$kw$recur;
} else {
throw e18920;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__18943 = state_18893;
state_18893 = G__18943;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$state_machine__16089__auto__ = function(state_18893){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16089__auto____1.call(this,state_18893);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16089__auto____0;
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16089__auto____1;
return cljs$core$async$state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___18927,out))
})();
var state__16206__auto__ = (function (){var statearr_18922 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_18922[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___18927);

return statearr_18922;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___18927,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args18944 = [];
var len__8202__auto___19018 = arguments.length;
var i__8203__auto___19019 = (0);
while(true){
if((i__8203__auto___19019 < len__8202__auto___19018)){
args18944.push((arguments[i__8203__auto___19019]));

var G__19020 = (i__8203__auto___19019 + (1));
i__8203__auto___19019 = G__19020;
continue;
} else {
}
break;
}

var G__18946 = args18944.length;
switch (G__18946) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18944.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16204__auto___19022 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16204__auto___19022,out){
return (function (){
var f__16205__auto__ = (function (){var switch__16088__auto__ = ((function (c__16204__auto___19022,out){
return (function (state_18988){
var state_val_18989 = (state_18988[(1)]);
if((state_val_18989 === (7))){
var inst_18984 = (state_18988[(2)]);
var state_18988__$1 = state_18988;
var statearr_18990_19023 = state_18988__$1;
(statearr_18990_19023[(2)] = inst_18984);

(statearr_18990_19023[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18989 === (1))){
var inst_18947 = [];
var inst_18948 = inst_18947;
var inst_18949 = cljs.core.cst$kw$cljs$core$async_SLASH_nothing;
var state_18988__$1 = (function (){var statearr_18991 = state_18988;
(statearr_18991[(7)] = inst_18948);

(statearr_18991[(8)] = inst_18949);

return statearr_18991;
})();
var statearr_18992_19024 = state_18988__$1;
(statearr_18992_19024[(2)] = null);

(statearr_18992_19024[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18989 === (4))){
var inst_18952 = (state_18988[(9)]);
var inst_18952__$1 = (state_18988[(2)]);
var inst_18953 = (inst_18952__$1 == null);
var inst_18954 = cljs.core.not(inst_18953);
var state_18988__$1 = (function (){var statearr_18993 = state_18988;
(statearr_18993[(9)] = inst_18952__$1);

return statearr_18993;
})();
if(inst_18954){
var statearr_18994_19025 = state_18988__$1;
(statearr_18994_19025[(1)] = (5));

} else {
var statearr_18995_19026 = state_18988__$1;
(statearr_18995_19026[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18989 === (15))){
var inst_18978 = (state_18988[(2)]);
var state_18988__$1 = state_18988;
var statearr_18996_19027 = state_18988__$1;
(statearr_18996_19027[(2)] = inst_18978);

(statearr_18996_19027[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18989 === (13))){
var state_18988__$1 = state_18988;
var statearr_18997_19028 = state_18988__$1;
(statearr_18997_19028[(2)] = null);

(statearr_18997_19028[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18989 === (6))){
var inst_18948 = (state_18988[(7)]);
var inst_18973 = inst_18948.length;
var inst_18974 = (inst_18973 > (0));
var state_18988__$1 = state_18988;
if(cljs.core.truth_(inst_18974)){
var statearr_18998_19029 = state_18988__$1;
(statearr_18998_19029[(1)] = (12));

} else {
var statearr_18999_19030 = state_18988__$1;
(statearr_18999_19030[(1)] = (13));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18989 === (3))){
var inst_18986 = (state_18988[(2)]);
var state_18988__$1 = state_18988;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18988__$1,inst_18986);
} else {
if((state_val_18989 === (12))){
var inst_18948 = (state_18988[(7)]);
var inst_18976 = cljs.core.vec(inst_18948);
var state_18988__$1 = state_18988;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18988__$1,(15),out,inst_18976);
} else {
if((state_val_18989 === (2))){
var state_18988__$1 = state_18988;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18988__$1,(4),ch);
} else {
if((state_val_18989 === (11))){
var inst_18956 = (state_18988[(10)]);
var inst_18952 = (state_18988[(9)]);
var inst_18966 = (state_18988[(2)]);
var inst_18967 = [];
var inst_18968 = inst_18967.push(inst_18952);
var inst_18948 = inst_18967;
var inst_18949 = inst_18956;
var state_18988__$1 = (function (){var statearr_19000 = state_18988;
(statearr_19000[(7)] = inst_18948);

(statearr_19000[(11)] = inst_18966);

(statearr_19000[(12)] = inst_18968);

(statearr_19000[(8)] = inst_18949);

return statearr_19000;
})();
var statearr_19001_19031 = state_18988__$1;
(statearr_19001_19031[(2)] = null);

(statearr_19001_19031[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18989 === (9))){
var inst_18948 = (state_18988[(7)]);
var inst_18964 = cljs.core.vec(inst_18948);
var state_18988__$1 = state_18988;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18988__$1,(11),out,inst_18964);
} else {
if((state_val_18989 === (5))){
var inst_18956 = (state_18988[(10)]);
var inst_18952 = (state_18988[(9)]);
var inst_18949 = (state_18988[(8)]);
var inst_18956__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_18952) : f.call(null,inst_18952));
var inst_18957 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_18956__$1,inst_18949);
var inst_18958 = cljs.core.keyword_identical_QMARK_(inst_18949,cljs.core.cst$kw$cljs$core$async_SLASH_nothing);
var inst_18959 = (inst_18957) || (inst_18958);
var state_18988__$1 = (function (){var statearr_19002 = state_18988;
(statearr_19002[(10)] = inst_18956__$1);

return statearr_19002;
})();
if(cljs.core.truth_(inst_18959)){
var statearr_19003_19032 = state_18988__$1;
(statearr_19003_19032[(1)] = (8));

} else {
var statearr_19004_19033 = state_18988__$1;
(statearr_19004_19033[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18989 === (14))){
var inst_18981 = (state_18988[(2)]);
var inst_18982 = cljs.core.async.close_BANG_(out);
var state_18988__$1 = (function (){var statearr_19006 = state_18988;
(statearr_19006[(13)] = inst_18981);

return statearr_19006;
})();
var statearr_19007_19034 = state_18988__$1;
(statearr_19007_19034[(2)] = inst_18982);

(statearr_19007_19034[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18989 === (10))){
var inst_18971 = (state_18988[(2)]);
var state_18988__$1 = state_18988;
var statearr_19008_19035 = state_18988__$1;
(statearr_19008_19035[(2)] = inst_18971);

(statearr_19008_19035[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18989 === (8))){
var inst_18948 = (state_18988[(7)]);
var inst_18956 = (state_18988[(10)]);
var inst_18952 = (state_18988[(9)]);
var inst_18961 = inst_18948.push(inst_18952);
var tmp19005 = inst_18948;
var inst_18948__$1 = tmp19005;
var inst_18949 = inst_18956;
var state_18988__$1 = (function (){var statearr_19009 = state_18988;
(statearr_19009[(7)] = inst_18948__$1);

(statearr_19009[(14)] = inst_18961);

(statearr_19009[(8)] = inst_18949);

return statearr_19009;
})();
var statearr_19010_19036 = state_18988__$1;
(statearr_19010_19036[(2)] = null);

(statearr_19010_19036[(1)] = (2));


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
}
}
}
}
}
});})(c__16204__auto___19022,out))
;
return ((function (switch__16088__auto__,c__16204__auto___19022,out){
return (function() {
var cljs$core$async$state_machine__16089__auto__ = null;
var cljs$core$async$state_machine__16089__auto____0 = (function (){
var statearr_19014 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19014[(0)] = cljs$core$async$state_machine__16089__auto__);

(statearr_19014[(1)] = (1));

return statearr_19014;
});
var cljs$core$async$state_machine__16089__auto____1 = (function (state_18988){
while(true){
var ret_value__16090__auto__ = (function (){try{while(true){
var result__16091__auto__ = switch__16088__auto__(state_18988);
if(cljs.core.keyword_identical_QMARK_(result__16091__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16091__auto__;
}
break;
}
}catch (e19015){if((e19015 instanceof Object)){
var ex__16092__auto__ = e19015;
var statearr_19016_19037 = state_18988;
(statearr_19016_19037[(5)] = ex__16092__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18988);

return cljs.core.cst$kw$recur;
} else {
throw e19015;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16090__auto__,cljs.core.cst$kw$recur)){
var G__19038 = state_18988;
state_18988 = G__19038;
continue;
} else {
return ret_value__16090__auto__;
}
break;
}
});
cljs$core$async$state_machine__16089__auto__ = function(state_18988){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16089__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16089__auto____1.call(this,state_18988);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16089__auto____0;
cljs$core$async$state_machine__16089__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16089__auto____1;
return cljs$core$async$state_machine__16089__auto__;
})()
;})(switch__16088__auto__,c__16204__auto___19022,out))
})();
var state__16206__auto__ = (function (){var statearr_19017 = (f__16205__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16205__auto__.cljs$core$IFn$_invoke$arity$0() : f__16205__auto__.call(null));
(statearr_19017[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16204__auto___19022);

return statearr_19017;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16206__auto__);
});})(c__16204__auto___19022,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

