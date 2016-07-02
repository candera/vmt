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
var args16265 = [];
var len__8202__auto___16271 = arguments.length;
var i__8203__auto___16272 = (0);
while(true){
if((i__8203__auto___16272 < len__8202__auto___16271)){
args16265.push((arguments[i__8203__auto___16272]));

var G__16273 = (i__8203__auto___16272 + (1));
i__8203__auto___16272 = G__16273;
continue;
} else {
}
break;
}

var G__16267 = args16265.length;
switch (G__16267) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16265.length)].join('')));

}
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if(typeof cljs.core.async.t_cljs$core$async16268 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16268 = (function (f,blockable,meta16269){
this.f = f;
this.blockable = blockable;
this.meta16269 = meta16269;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async16268.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16270,meta16269__$1){
var self__ = this;
var _16270__$1 = this;
return (new cljs.core.async.t_cljs$core$async16268(self__.f,self__.blockable,meta16269__$1));
});

cljs.core.async.t_cljs$core$async16268.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16270){
var self__ = this;
var _16270__$1 = this;
return self__.meta16269;
});

cljs.core.async.t_cljs$core$async16268.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async16268.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async16268.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
});

cljs.core.async.t_cljs$core$async16268.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async16268.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$f,cljs.core.cst$sym$blockable,cljs.core.cst$sym$meta16269], null);
});

cljs.core.async.t_cljs$core$async16268.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async16268.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16268";

cljs.core.async.t_cljs$core$async16268.cljs$lang$ctorPrWriter = (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async16268");
});

cljs.core.async.__GT_t_cljs$core$async16268 = (function cljs$core$async$__GT_t_cljs$core$async16268(f__$1,blockable__$1,meta16269){
return (new cljs.core.async.t_cljs$core$async16268(f__$1,blockable__$1,meta16269));
});

}

return (new cljs.core.async.t_cljs$core$async16268(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
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
var args16277 = [];
var len__8202__auto___16280 = arguments.length;
var i__8203__auto___16281 = (0);
while(true){
if((i__8203__auto___16281 < len__8202__auto___16280)){
args16277.push((arguments[i__8203__auto___16281]));

var G__16282 = (i__8203__auto___16281 + (1));
i__8203__auto___16281 = G__16282;
continue;
} else {
}
break;
}

var G__16279 = args16277.length;
switch (G__16279) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16277.length)].join('')));

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
var args16284 = [];
var len__8202__auto___16287 = arguments.length;
var i__8203__auto___16288 = (0);
while(true){
if((i__8203__auto___16288 < len__8202__auto___16287)){
args16284.push((arguments[i__8203__auto___16288]));

var G__16289 = (i__8203__auto___16288 + (1));
i__8203__auto___16288 = G__16289;
continue;
} else {
}
break;
}

var G__16286 = args16284.length;
switch (G__16286) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16284.length)].join('')));

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
var args16291 = [];
var len__8202__auto___16294 = arguments.length;
var i__8203__auto___16295 = (0);
while(true){
if((i__8203__auto___16295 < len__8202__auto___16294)){
args16291.push((arguments[i__8203__auto___16295]));

var G__16296 = (i__8203__auto___16295 + (1));
i__8203__auto___16295 = G__16296;
continue;
} else {
}
break;
}

var G__16293 = args16291.length;
switch (G__16293) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16291.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_16298 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_16298) : fn1.call(null,val_16298));
} else {
cljs.core.async.impl.dispatch.run(((function (val_16298,ret){
return (function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_16298) : fn1.call(null,val_16298));
});})(val_16298,ret))
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
var args16299 = [];
var len__8202__auto___16302 = arguments.length;
var i__8203__auto___16303 = (0);
while(true){
if((i__8203__auto___16303 < len__8202__auto___16302)){
args16299.push((arguments[i__8203__auto___16303]));

var G__16304 = (i__8203__auto___16303 + (1));
i__8203__auto___16303 = G__16304;
continue;
} else {
}
break;
}

var G__16301 = args16299.length;
switch (G__16301) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16299.length)].join('')));

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
var n__8032__auto___16306 = n;
var x_16307 = (0);
while(true){
if((x_16307 < n__8032__auto___16306)){
(a[x_16307] = (0));

var G__16308 = (x_16307 + (1));
x_16307 = G__16308;
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

var G__16309 = (i + (1));
i = G__16309;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true) : cljs.core.atom.call(null,true));
if(typeof cljs.core.async.t_cljs$core$async16313 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16313 = (function (alt_flag,flag,meta16314){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta16314 = meta16314;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async16313.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_16315,meta16314__$1){
var self__ = this;
var _16315__$1 = this;
return (new cljs.core.async.t_cljs$core$async16313(self__.alt_flag,self__.flag,meta16314__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async16313.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_16315){
var self__ = this;
var _16315__$1 = this;
return self__.meta16314;
});})(flag))
;

cljs.core.async.t_cljs$core$async16313.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async16313.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.flag) : cljs.core.deref.call(null,self__.flag));
});})(flag))
;

cljs.core.async.t_cljs$core$async16313.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async16313.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(self__.flag,null) : cljs.core.reset_BANG_.call(null,self__.flag,null));

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async16313.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$alt_DASH_flag,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$private,true,cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),cljs.core.cst$sym$flag,cljs.core.cst$sym$meta16314], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async16313.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async16313.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16313";

cljs.core.async.t_cljs$core$async16313.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async16313");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async16313 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async16313(alt_flag__$1,flag__$1,meta16314){
return (new cljs.core.async.t_cljs$core$async16313(alt_flag__$1,flag__$1,meta16314));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async16313(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async16319 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16319 = (function (alt_handler,flag,cb,meta16320){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta16320 = meta16320;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async16319.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16321,meta16320__$1){
var self__ = this;
var _16321__$1 = this;
return (new cljs.core.async.t_cljs$core$async16319(self__.alt_handler,self__.flag,self__.cb,meta16320__$1));
});

cljs.core.async.t_cljs$core$async16319.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16321){
var self__ = this;
var _16321__$1 = this;
return self__.meta16320;
});

cljs.core.async.t_cljs$core$async16319.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async16319.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
});

cljs.core.async.t_cljs$core$async16319.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async16319.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async16319.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$alt_DASH_handler,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$private,true,cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$flag,cljs.core.cst$sym$cb], null)))], null)),cljs.core.cst$sym$flag,cljs.core.cst$sym$cb,cljs.core.cst$sym$meta16320], null);
});

cljs.core.async.t_cljs$core$async16319.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async16319.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16319";

cljs.core.async.t_cljs$core$async16319.cljs$lang$ctorPrWriter = (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async16319");
});

cljs.core.async.__GT_t_cljs$core$async16319 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async16319(alt_handler__$1,flag__$1,cb__$1,meta16320){
return (new cljs.core.async.t_cljs$core$async16319(alt_handler__$1,flag__$1,cb__$1,meta16320));
});

}

return (new cljs.core.async.t_cljs$core$async16319(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
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
return (function (p1__16322_SHARP_){
var G__16326 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__16322_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__16326) : fret.call(null,G__16326));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__16323_SHARP_){
var G__16327 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__16323_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__16327) : fret.call(null,G__16327));
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
var G__16328 = (i + (1));
i = G__16328;
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
var len__8202__auto___16334 = arguments.length;
var i__8203__auto___16335 = (0);
while(true){
if((i__8203__auto___16335 < len__8202__auto___16334)){
args__8209__auto__.push((arguments[i__8203__auto___16335]));

var G__16336 = (i__8203__auto___16335 + (1));
i__8203__auto___16335 = G__16336;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((1) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__8210__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__16331){
var map__16332 = p__16331;
var map__16332__$1 = ((((!((map__16332 == null)))?((((map__16332.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16332.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16332):map__16332);
var opts = map__16332__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq16329){
var G__16330 = cljs.core.first(seq16329);
var seq16329__$1 = cljs.core.next(seq16329);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__16330,seq16329__$1);
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
var args16337 = [];
var len__8202__auto___16387 = arguments.length;
var i__8203__auto___16388 = (0);
while(true){
if((i__8203__auto___16388 < len__8202__auto___16387)){
args16337.push((arguments[i__8203__auto___16388]));

var G__16389 = (i__8203__auto___16388 + (1));
i__8203__auto___16388 = G__16389;
continue;
} else {
}
break;
}

var G__16339 = args16337.length;
switch (G__16339) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16337.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__16206__auto___16391 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___16391){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___16391){
return (function (state_16363){
var state_val_16364 = (state_16363[(1)]);
if((state_val_16364 === (7))){
var inst_16359 = (state_16363[(2)]);
var state_16363__$1 = state_16363;
var statearr_16365_16392 = state_16363__$1;
(statearr_16365_16392[(2)] = inst_16359);

(statearr_16365_16392[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16364 === (1))){
var state_16363__$1 = state_16363;
var statearr_16366_16393 = state_16363__$1;
(statearr_16366_16393[(2)] = null);

(statearr_16366_16393[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16364 === (4))){
var inst_16342 = (state_16363[(7)]);
var inst_16342__$1 = (state_16363[(2)]);
var inst_16343 = (inst_16342__$1 == null);
var state_16363__$1 = (function (){var statearr_16367 = state_16363;
(statearr_16367[(7)] = inst_16342__$1);

return statearr_16367;
})();
if(cljs.core.truth_(inst_16343)){
var statearr_16368_16394 = state_16363__$1;
(statearr_16368_16394[(1)] = (5));

} else {
var statearr_16369_16395 = state_16363__$1;
(statearr_16369_16395[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16364 === (13))){
var state_16363__$1 = state_16363;
var statearr_16370_16396 = state_16363__$1;
(statearr_16370_16396[(2)] = null);

(statearr_16370_16396[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16364 === (6))){
var inst_16342 = (state_16363[(7)]);
var state_16363__$1 = state_16363;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16363__$1,(11),to,inst_16342);
} else {
if((state_val_16364 === (3))){
var inst_16361 = (state_16363[(2)]);
var state_16363__$1 = state_16363;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16363__$1,inst_16361);
} else {
if((state_val_16364 === (12))){
var state_16363__$1 = state_16363;
var statearr_16371_16397 = state_16363__$1;
(statearr_16371_16397[(2)] = null);

(statearr_16371_16397[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16364 === (2))){
var state_16363__$1 = state_16363;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16363__$1,(4),from);
} else {
if((state_val_16364 === (11))){
var inst_16352 = (state_16363[(2)]);
var state_16363__$1 = state_16363;
if(cljs.core.truth_(inst_16352)){
var statearr_16372_16398 = state_16363__$1;
(statearr_16372_16398[(1)] = (12));

} else {
var statearr_16373_16399 = state_16363__$1;
(statearr_16373_16399[(1)] = (13));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16364 === (9))){
var state_16363__$1 = state_16363;
var statearr_16374_16400 = state_16363__$1;
(statearr_16374_16400[(2)] = null);

(statearr_16374_16400[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16364 === (5))){
var state_16363__$1 = state_16363;
if(cljs.core.truth_(close_QMARK_)){
var statearr_16375_16401 = state_16363__$1;
(statearr_16375_16401[(1)] = (8));

} else {
var statearr_16376_16402 = state_16363__$1;
(statearr_16376_16402[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16364 === (14))){
var inst_16357 = (state_16363[(2)]);
var state_16363__$1 = state_16363;
var statearr_16377_16403 = state_16363__$1;
(statearr_16377_16403[(2)] = inst_16357);

(statearr_16377_16403[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16364 === (10))){
var inst_16349 = (state_16363[(2)]);
var state_16363__$1 = state_16363;
var statearr_16378_16404 = state_16363__$1;
(statearr_16378_16404[(2)] = inst_16349);

(statearr_16378_16404[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16364 === (8))){
var inst_16346 = cljs.core.async.close_BANG_(to);
var state_16363__$1 = state_16363;
var statearr_16379_16405 = state_16363__$1;
(statearr_16379_16405[(2)] = inst_16346);

(statearr_16379_16405[(1)] = (10));


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
});})(c__16206__auto___16391))
;
return ((function (switch__16090__auto__,c__16206__auto___16391){
return (function() {
var cljs$core$async$state_machine__16091__auto__ = null;
var cljs$core$async$state_machine__16091__auto____0 = (function (){
var statearr_16383 = [null,null,null,null,null,null,null,null];
(statearr_16383[(0)] = cljs$core$async$state_machine__16091__auto__);

(statearr_16383[(1)] = (1));

return statearr_16383;
});
var cljs$core$async$state_machine__16091__auto____1 = (function (state_16363){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_16363);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e16384){if((e16384 instanceof Object)){
var ex__16094__auto__ = e16384;
var statearr_16385_16406 = state_16363;
(statearr_16385_16406[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16363);

return cljs.core.cst$kw$recur;
} else {
throw e16384;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__16407 = state_16363;
state_16363 = G__16407;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$state_machine__16091__auto__ = function(state_16363){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16091__auto____1.call(this,state_16363);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16091__auto____0;
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16091__auto____1;
return cljs$core$async$state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___16391))
})();
var state__16208__auto__ = (function (){var statearr_16386 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_16386[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___16391);

return statearr_16386;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___16391))
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
return (function (p__16595){
var vec__16596 = p__16595;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16596,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16596,(1),null);
var job = vec__16596;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__16206__auto___16782 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___16782,res,vec__16596,v,p,job,jobs,results){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___16782,res,vec__16596,v,p,job,jobs,results){
return (function (state_16603){
var state_val_16604 = (state_16603[(1)]);
if((state_val_16604 === (1))){
var state_16603__$1 = state_16603;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16603__$1,(2),res,v);
} else {
if((state_val_16604 === (2))){
var inst_16600 = (state_16603[(2)]);
var inst_16601 = cljs.core.async.close_BANG_(res);
var state_16603__$1 = (function (){var statearr_16605 = state_16603;
(statearr_16605[(7)] = inst_16600);

return statearr_16605;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_16603__$1,inst_16601);
} else {
return null;
}
}
});})(c__16206__auto___16782,res,vec__16596,v,p,job,jobs,results))
;
return ((function (switch__16090__auto__,c__16206__auto___16782,res,vec__16596,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0 = (function (){
var statearr_16609 = [null,null,null,null,null,null,null,null];
(statearr_16609[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__);

(statearr_16609[(1)] = (1));

return statearr_16609;
});
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1 = (function (state_16603){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_16603);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e16610){if((e16610 instanceof Object)){
var ex__16094__auto__ = e16610;
var statearr_16611_16783 = state_16603;
(statearr_16611_16783[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16603);

return cljs.core.cst$kw$recur;
} else {
throw e16610;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__16784 = state_16603;
state_16603 = G__16784;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__ = function(state_16603){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1.call(this,state_16603);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___16782,res,vec__16596,v,p,job,jobs,results))
})();
var state__16208__auto__ = (function (){var statearr_16612 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_16612[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___16782);

return statearr_16612;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___16782,res,vec__16596,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__16613){
var vec__16614 = p__16613;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16614,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16614,(1),null);
var job = vec__16614;
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
var n__8032__auto___16785 = n;
var __16786 = (0);
while(true){
if((__16786 < n__8032__auto___16785)){
var G__16617_16787 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__16617_16787) {
case "compute":
var c__16206__auto___16789 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__16786,c__16206__auto___16789,G__16617_16787,n__8032__auto___16785,jobs,results,process,async){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (__16786,c__16206__auto___16789,G__16617_16787,n__8032__auto___16785,jobs,results,process,async){
return (function (state_16630){
var state_val_16631 = (state_16630[(1)]);
if((state_val_16631 === (1))){
var state_16630__$1 = state_16630;
var statearr_16632_16790 = state_16630__$1;
(statearr_16632_16790[(2)] = null);

(statearr_16632_16790[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16631 === (2))){
var state_16630__$1 = state_16630;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16630__$1,(4),jobs);
} else {
if((state_val_16631 === (3))){
var inst_16628 = (state_16630[(2)]);
var state_16630__$1 = state_16630;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16630__$1,inst_16628);
} else {
if((state_val_16631 === (4))){
var inst_16620 = (state_16630[(2)]);
var inst_16621 = process(inst_16620);
var state_16630__$1 = state_16630;
if(cljs.core.truth_(inst_16621)){
var statearr_16633_16791 = state_16630__$1;
(statearr_16633_16791[(1)] = (5));

} else {
var statearr_16634_16792 = state_16630__$1;
(statearr_16634_16792[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16631 === (5))){
var state_16630__$1 = state_16630;
var statearr_16635_16793 = state_16630__$1;
(statearr_16635_16793[(2)] = null);

(statearr_16635_16793[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16631 === (6))){
var state_16630__$1 = state_16630;
var statearr_16636_16794 = state_16630__$1;
(statearr_16636_16794[(2)] = null);

(statearr_16636_16794[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16631 === (7))){
var inst_16626 = (state_16630[(2)]);
var state_16630__$1 = state_16630;
var statearr_16637_16795 = state_16630__$1;
(statearr_16637_16795[(2)] = inst_16626);

(statearr_16637_16795[(1)] = (3));


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
});})(__16786,c__16206__auto___16789,G__16617_16787,n__8032__auto___16785,jobs,results,process,async))
;
return ((function (__16786,switch__16090__auto__,c__16206__auto___16789,G__16617_16787,n__8032__auto___16785,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0 = (function (){
var statearr_16641 = [null,null,null,null,null,null,null];
(statearr_16641[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__);

(statearr_16641[(1)] = (1));

return statearr_16641;
});
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1 = (function (state_16630){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_16630);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e16642){if((e16642 instanceof Object)){
var ex__16094__auto__ = e16642;
var statearr_16643_16796 = state_16630;
(statearr_16643_16796[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16630);

return cljs.core.cst$kw$recur;
} else {
throw e16642;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__16797 = state_16630;
state_16630 = G__16797;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__ = function(state_16630){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1.call(this,state_16630);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__;
})()
;})(__16786,switch__16090__auto__,c__16206__auto___16789,G__16617_16787,n__8032__auto___16785,jobs,results,process,async))
})();
var state__16208__auto__ = (function (){var statearr_16644 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_16644[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___16789);

return statearr_16644;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(__16786,c__16206__auto___16789,G__16617_16787,n__8032__auto___16785,jobs,results,process,async))
);


break;
case "async":
var c__16206__auto___16798 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__16786,c__16206__auto___16798,G__16617_16787,n__8032__auto___16785,jobs,results,process,async){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (__16786,c__16206__auto___16798,G__16617_16787,n__8032__auto___16785,jobs,results,process,async){
return (function (state_16657){
var state_val_16658 = (state_16657[(1)]);
if((state_val_16658 === (1))){
var state_16657__$1 = state_16657;
var statearr_16659_16799 = state_16657__$1;
(statearr_16659_16799[(2)] = null);

(statearr_16659_16799[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16658 === (2))){
var state_16657__$1 = state_16657;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16657__$1,(4),jobs);
} else {
if((state_val_16658 === (3))){
var inst_16655 = (state_16657[(2)]);
var state_16657__$1 = state_16657;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16657__$1,inst_16655);
} else {
if((state_val_16658 === (4))){
var inst_16647 = (state_16657[(2)]);
var inst_16648 = async(inst_16647);
var state_16657__$1 = state_16657;
if(cljs.core.truth_(inst_16648)){
var statearr_16660_16800 = state_16657__$1;
(statearr_16660_16800[(1)] = (5));

} else {
var statearr_16661_16801 = state_16657__$1;
(statearr_16661_16801[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16658 === (5))){
var state_16657__$1 = state_16657;
var statearr_16662_16802 = state_16657__$1;
(statearr_16662_16802[(2)] = null);

(statearr_16662_16802[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16658 === (6))){
var state_16657__$1 = state_16657;
var statearr_16663_16803 = state_16657__$1;
(statearr_16663_16803[(2)] = null);

(statearr_16663_16803[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16658 === (7))){
var inst_16653 = (state_16657[(2)]);
var state_16657__$1 = state_16657;
var statearr_16664_16804 = state_16657__$1;
(statearr_16664_16804[(2)] = inst_16653);

(statearr_16664_16804[(1)] = (3));


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
});})(__16786,c__16206__auto___16798,G__16617_16787,n__8032__auto___16785,jobs,results,process,async))
;
return ((function (__16786,switch__16090__auto__,c__16206__auto___16798,G__16617_16787,n__8032__auto___16785,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0 = (function (){
var statearr_16668 = [null,null,null,null,null,null,null];
(statearr_16668[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__);

(statearr_16668[(1)] = (1));

return statearr_16668;
});
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1 = (function (state_16657){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_16657);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e16669){if((e16669 instanceof Object)){
var ex__16094__auto__ = e16669;
var statearr_16670_16805 = state_16657;
(statearr_16670_16805[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16657);

return cljs.core.cst$kw$recur;
} else {
throw e16669;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__16806 = state_16657;
state_16657 = G__16806;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__ = function(state_16657){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1.call(this,state_16657);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__;
})()
;})(__16786,switch__16090__auto__,c__16206__auto___16798,G__16617_16787,n__8032__auto___16785,jobs,results,process,async))
})();
var state__16208__auto__ = (function (){var statearr_16671 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_16671[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___16798);

return statearr_16671;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(__16786,c__16206__auto___16798,G__16617_16787,n__8032__auto___16785,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__16807 = (__16786 + (1));
__16786 = G__16807;
continue;
} else {
}
break;
}

var c__16206__auto___16808 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___16808,jobs,results,process,async){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___16808,jobs,results,process,async){
return (function (state_16693){
var state_val_16694 = (state_16693[(1)]);
if((state_val_16694 === (1))){
var state_16693__$1 = state_16693;
var statearr_16695_16809 = state_16693__$1;
(statearr_16695_16809[(2)] = null);

(statearr_16695_16809[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16694 === (2))){
var state_16693__$1 = state_16693;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16693__$1,(4),from);
} else {
if((state_val_16694 === (3))){
var inst_16691 = (state_16693[(2)]);
var state_16693__$1 = state_16693;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16693__$1,inst_16691);
} else {
if((state_val_16694 === (4))){
var inst_16674 = (state_16693[(7)]);
var inst_16674__$1 = (state_16693[(2)]);
var inst_16675 = (inst_16674__$1 == null);
var state_16693__$1 = (function (){var statearr_16696 = state_16693;
(statearr_16696[(7)] = inst_16674__$1);

return statearr_16696;
})();
if(cljs.core.truth_(inst_16675)){
var statearr_16697_16810 = state_16693__$1;
(statearr_16697_16810[(1)] = (5));

} else {
var statearr_16698_16811 = state_16693__$1;
(statearr_16698_16811[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16694 === (5))){
var inst_16677 = cljs.core.async.close_BANG_(jobs);
var state_16693__$1 = state_16693;
var statearr_16699_16812 = state_16693__$1;
(statearr_16699_16812[(2)] = inst_16677);

(statearr_16699_16812[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16694 === (6))){
var inst_16679 = (state_16693[(8)]);
var inst_16674 = (state_16693[(7)]);
var inst_16679__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_16680 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_16681 = [inst_16674,inst_16679__$1];
var inst_16682 = (new cljs.core.PersistentVector(null,2,(5),inst_16680,inst_16681,null));
var state_16693__$1 = (function (){var statearr_16700 = state_16693;
(statearr_16700[(8)] = inst_16679__$1);

return statearr_16700;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16693__$1,(8),jobs,inst_16682);
} else {
if((state_val_16694 === (7))){
var inst_16689 = (state_16693[(2)]);
var state_16693__$1 = state_16693;
var statearr_16701_16813 = state_16693__$1;
(statearr_16701_16813[(2)] = inst_16689);

(statearr_16701_16813[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16694 === (8))){
var inst_16679 = (state_16693[(8)]);
var inst_16684 = (state_16693[(2)]);
var state_16693__$1 = (function (){var statearr_16702 = state_16693;
(statearr_16702[(9)] = inst_16684);

return statearr_16702;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16693__$1,(9),results,inst_16679);
} else {
if((state_val_16694 === (9))){
var inst_16686 = (state_16693[(2)]);
var state_16693__$1 = (function (){var statearr_16703 = state_16693;
(statearr_16703[(10)] = inst_16686);

return statearr_16703;
})();
var statearr_16704_16814 = state_16693__$1;
(statearr_16704_16814[(2)] = null);

(statearr_16704_16814[(1)] = (2));


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
});})(c__16206__auto___16808,jobs,results,process,async))
;
return ((function (switch__16090__auto__,c__16206__auto___16808,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0 = (function (){
var statearr_16708 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_16708[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__);

(statearr_16708[(1)] = (1));

return statearr_16708;
});
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1 = (function (state_16693){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_16693);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e16709){if((e16709 instanceof Object)){
var ex__16094__auto__ = e16709;
var statearr_16710_16815 = state_16693;
(statearr_16710_16815[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16693);

return cljs.core.cst$kw$recur;
} else {
throw e16709;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__16816 = state_16693;
state_16693 = G__16816;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__ = function(state_16693){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1.call(this,state_16693);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___16808,jobs,results,process,async))
})();
var state__16208__auto__ = (function (){var statearr_16711 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_16711[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___16808);

return statearr_16711;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___16808,jobs,results,process,async))
);


var c__16206__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto__,jobs,results,process,async){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto__,jobs,results,process,async){
return (function (state_16749){
var state_val_16750 = (state_16749[(1)]);
if((state_val_16750 === (7))){
var inst_16745 = (state_16749[(2)]);
var state_16749__$1 = state_16749;
var statearr_16751_16817 = state_16749__$1;
(statearr_16751_16817[(2)] = inst_16745);

(statearr_16751_16817[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (20))){
var state_16749__$1 = state_16749;
var statearr_16752_16818 = state_16749__$1;
(statearr_16752_16818[(2)] = null);

(statearr_16752_16818[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (1))){
var state_16749__$1 = state_16749;
var statearr_16753_16819 = state_16749__$1;
(statearr_16753_16819[(2)] = null);

(statearr_16753_16819[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (4))){
var inst_16714 = (state_16749[(7)]);
var inst_16714__$1 = (state_16749[(2)]);
var inst_16715 = (inst_16714__$1 == null);
var state_16749__$1 = (function (){var statearr_16754 = state_16749;
(statearr_16754[(7)] = inst_16714__$1);

return statearr_16754;
})();
if(cljs.core.truth_(inst_16715)){
var statearr_16755_16820 = state_16749__$1;
(statearr_16755_16820[(1)] = (5));

} else {
var statearr_16756_16821 = state_16749__$1;
(statearr_16756_16821[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (15))){
var inst_16727 = (state_16749[(8)]);
var state_16749__$1 = state_16749;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16749__$1,(18),to,inst_16727);
} else {
if((state_val_16750 === (21))){
var inst_16740 = (state_16749[(2)]);
var state_16749__$1 = state_16749;
var statearr_16757_16822 = state_16749__$1;
(statearr_16757_16822[(2)] = inst_16740);

(statearr_16757_16822[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (13))){
var inst_16742 = (state_16749[(2)]);
var state_16749__$1 = (function (){var statearr_16758 = state_16749;
(statearr_16758[(9)] = inst_16742);

return statearr_16758;
})();
var statearr_16759_16823 = state_16749__$1;
(statearr_16759_16823[(2)] = null);

(statearr_16759_16823[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (6))){
var inst_16714 = (state_16749[(7)]);
var state_16749__$1 = state_16749;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16749__$1,(11),inst_16714);
} else {
if((state_val_16750 === (17))){
var inst_16735 = (state_16749[(2)]);
var state_16749__$1 = state_16749;
if(cljs.core.truth_(inst_16735)){
var statearr_16760_16824 = state_16749__$1;
(statearr_16760_16824[(1)] = (19));

} else {
var statearr_16761_16825 = state_16749__$1;
(statearr_16761_16825[(1)] = (20));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (3))){
var inst_16747 = (state_16749[(2)]);
var state_16749__$1 = state_16749;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16749__$1,inst_16747);
} else {
if((state_val_16750 === (12))){
var inst_16724 = (state_16749[(10)]);
var state_16749__$1 = state_16749;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16749__$1,(14),inst_16724);
} else {
if((state_val_16750 === (2))){
var state_16749__$1 = state_16749;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16749__$1,(4),results);
} else {
if((state_val_16750 === (19))){
var state_16749__$1 = state_16749;
var statearr_16762_16826 = state_16749__$1;
(statearr_16762_16826[(2)] = null);

(statearr_16762_16826[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (11))){
var inst_16724 = (state_16749[(2)]);
var state_16749__$1 = (function (){var statearr_16763 = state_16749;
(statearr_16763[(10)] = inst_16724);

return statearr_16763;
})();
var statearr_16764_16827 = state_16749__$1;
(statearr_16764_16827[(2)] = null);

(statearr_16764_16827[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (9))){
var state_16749__$1 = state_16749;
var statearr_16765_16828 = state_16749__$1;
(statearr_16765_16828[(2)] = null);

(statearr_16765_16828[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (5))){
var state_16749__$1 = state_16749;
if(cljs.core.truth_(close_QMARK_)){
var statearr_16766_16829 = state_16749__$1;
(statearr_16766_16829[(1)] = (8));

} else {
var statearr_16767_16830 = state_16749__$1;
(statearr_16767_16830[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (14))){
var inst_16729 = (state_16749[(11)]);
var inst_16727 = (state_16749[(8)]);
var inst_16727__$1 = (state_16749[(2)]);
var inst_16728 = (inst_16727__$1 == null);
var inst_16729__$1 = cljs.core.not(inst_16728);
var state_16749__$1 = (function (){var statearr_16768 = state_16749;
(statearr_16768[(11)] = inst_16729__$1);

(statearr_16768[(8)] = inst_16727__$1);

return statearr_16768;
})();
if(inst_16729__$1){
var statearr_16769_16831 = state_16749__$1;
(statearr_16769_16831[(1)] = (15));

} else {
var statearr_16770_16832 = state_16749__$1;
(statearr_16770_16832[(1)] = (16));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (16))){
var inst_16729 = (state_16749[(11)]);
var state_16749__$1 = state_16749;
var statearr_16771_16833 = state_16749__$1;
(statearr_16771_16833[(2)] = inst_16729);

(statearr_16771_16833[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (10))){
var inst_16721 = (state_16749[(2)]);
var state_16749__$1 = state_16749;
var statearr_16772_16834 = state_16749__$1;
(statearr_16772_16834[(2)] = inst_16721);

(statearr_16772_16834[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (18))){
var inst_16732 = (state_16749[(2)]);
var state_16749__$1 = state_16749;
var statearr_16773_16835 = state_16749__$1;
(statearr_16773_16835[(2)] = inst_16732);

(statearr_16773_16835[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16750 === (8))){
var inst_16718 = cljs.core.async.close_BANG_(to);
var state_16749__$1 = state_16749;
var statearr_16774_16836 = state_16749__$1;
(statearr_16774_16836[(2)] = inst_16718);

(statearr_16774_16836[(1)] = (10));


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
});})(c__16206__auto__,jobs,results,process,async))
;
return ((function (switch__16090__auto__,c__16206__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0 = (function (){
var statearr_16778 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16778[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__);

(statearr_16778[(1)] = (1));

return statearr_16778;
});
var cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1 = (function (state_16749){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_16749);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e16779){if((e16779 instanceof Object)){
var ex__16094__auto__ = e16779;
var statearr_16780_16837 = state_16749;
(statearr_16780_16837[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16749);

return cljs.core.cst$kw$recur;
} else {
throw e16779;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__16838 = state_16749;
state_16749 = G__16838;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__ = function(state_16749){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1.call(this,state_16749);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__16091__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto__,jobs,results,process,async))
})();
var state__16208__auto__ = (function (){var statearr_16781 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_16781[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto__);

return statearr_16781;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto__,jobs,results,process,async))
);

return c__16206__auto__;
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
var args16839 = [];
var len__8202__auto___16842 = arguments.length;
var i__8203__auto___16843 = (0);
while(true){
if((i__8203__auto___16843 < len__8202__auto___16842)){
args16839.push((arguments[i__8203__auto___16843]));

var G__16844 = (i__8203__auto___16843 + (1));
i__8203__auto___16843 = G__16844;
continue;
} else {
}
break;
}

var G__16841 = args16839.length;
switch (G__16841) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16839.length)].join('')));

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
var args16846 = [];
var len__8202__auto___16849 = arguments.length;
var i__8203__auto___16850 = (0);
while(true){
if((i__8203__auto___16850 < len__8202__auto___16849)){
args16846.push((arguments[i__8203__auto___16850]));

var G__16851 = (i__8203__auto___16850 + (1));
i__8203__auto___16850 = G__16851;
continue;
} else {
}
break;
}

var G__16848 = args16846.length;
switch (G__16848) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16846.length)].join('')));

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
var args16853 = [];
var len__8202__auto___16906 = arguments.length;
var i__8203__auto___16907 = (0);
while(true){
if((i__8203__auto___16907 < len__8202__auto___16906)){
args16853.push((arguments[i__8203__auto___16907]));

var G__16908 = (i__8203__auto___16907 + (1));
i__8203__auto___16907 = G__16908;
continue;
} else {
}
break;
}

var G__16855 = args16853.length;
switch (G__16855) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16853.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__16206__auto___16910 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___16910,tc,fc){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___16910,tc,fc){
return (function (state_16881){
var state_val_16882 = (state_16881[(1)]);
if((state_val_16882 === (7))){
var inst_16877 = (state_16881[(2)]);
var state_16881__$1 = state_16881;
var statearr_16883_16911 = state_16881__$1;
(statearr_16883_16911[(2)] = inst_16877);

(statearr_16883_16911[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16882 === (1))){
var state_16881__$1 = state_16881;
var statearr_16884_16912 = state_16881__$1;
(statearr_16884_16912[(2)] = null);

(statearr_16884_16912[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16882 === (4))){
var inst_16858 = (state_16881[(7)]);
var inst_16858__$1 = (state_16881[(2)]);
var inst_16859 = (inst_16858__$1 == null);
var state_16881__$1 = (function (){var statearr_16885 = state_16881;
(statearr_16885[(7)] = inst_16858__$1);

return statearr_16885;
})();
if(cljs.core.truth_(inst_16859)){
var statearr_16886_16913 = state_16881__$1;
(statearr_16886_16913[(1)] = (5));

} else {
var statearr_16887_16914 = state_16881__$1;
(statearr_16887_16914[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16882 === (13))){
var state_16881__$1 = state_16881;
var statearr_16888_16915 = state_16881__$1;
(statearr_16888_16915[(2)] = null);

(statearr_16888_16915[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16882 === (6))){
var inst_16858 = (state_16881[(7)]);
var inst_16864 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_16858) : p.call(null,inst_16858));
var state_16881__$1 = state_16881;
if(cljs.core.truth_(inst_16864)){
var statearr_16889_16916 = state_16881__$1;
(statearr_16889_16916[(1)] = (9));

} else {
var statearr_16890_16917 = state_16881__$1;
(statearr_16890_16917[(1)] = (10));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16882 === (3))){
var inst_16879 = (state_16881[(2)]);
var state_16881__$1 = state_16881;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16881__$1,inst_16879);
} else {
if((state_val_16882 === (12))){
var state_16881__$1 = state_16881;
var statearr_16891_16918 = state_16881__$1;
(statearr_16891_16918[(2)] = null);

(statearr_16891_16918[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16882 === (2))){
var state_16881__$1 = state_16881;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16881__$1,(4),ch);
} else {
if((state_val_16882 === (11))){
var inst_16858 = (state_16881[(7)]);
var inst_16868 = (state_16881[(2)]);
var state_16881__$1 = state_16881;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16881__$1,(8),inst_16868,inst_16858);
} else {
if((state_val_16882 === (9))){
var state_16881__$1 = state_16881;
var statearr_16892_16919 = state_16881__$1;
(statearr_16892_16919[(2)] = tc);

(statearr_16892_16919[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16882 === (5))){
var inst_16861 = cljs.core.async.close_BANG_(tc);
var inst_16862 = cljs.core.async.close_BANG_(fc);
var state_16881__$1 = (function (){var statearr_16893 = state_16881;
(statearr_16893[(8)] = inst_16861);

return statearr_16893;
})();
var statearr_16894_16920 = state_16881__$1;
(statearr_16894_16920[(2)] = inst_16862);

(statearr_16894_16920[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16882 === (14))){
var inst_16875 = (state_16881[(2)]);
var state_16881__$1 = state_16881;
var statearr_16895_16921 = state_16881__$1;
(statearr_16895_16921[(2)] = inst_16875);

(statearr_16895_16921[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16882 === (10))){
var state_16881__$1 = state_16881;
var statearr_16896_16922 = state_16881__$1;
(statearr_16896_16922[(2)] = fc);

(statearr_16896_16922[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16882 === (8))){
var inst_16870 = (state_16881[(2)]);
var state_16881__$1 = state_16881;
if(cljs.core.truth_(inst_16870)){
var statearr_16897_16923 = state_16881__$1;
(statearr_16897_16923[(1)] = (12));

} else {
var statearr_16898_16924 = state_16881__$1;
(statearr_16898_16924[(1)] = (13));

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
});})(c__16206__auto___16910,tc,fc))
;
return ((function (switch__16090__auto__,c__16206__auto___16910,tc,fc){
return (function() {
var cljs$core$async$state_machine__16091__auto__ = null;
var cljs$core$async$state_machine__16091__auto____0 = (function (){
var statearr_16902 = [null,null,null,null,null,null,null,null,null];
(statearr_16902[(0)] = cljs$core$async$state_machine__16091__auto__);

(statearr_16902[(1)] = (1));

return statearr_16902;
});
var cljs$core$async$state_machine__16091__auto____1 = (function (state_16881){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_16881);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e16903){if((e16903 instanceof Object)){
var ex__16094__auto__ = e16903;
var statearr_16904_16925 = state_16881;
(statearr_16904_16925[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16881);

return cljs.core.cst$kw$recur;
} else {
throw e16903;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__16926 = state_16881;
state_16881 = G__16926;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$state_machine__16091__auto__ = function(state_16881){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16091__auto____1.call(this,state_16881);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16091__auto____0;
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16091__auto____1;
return cljs$core$async$state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___16910,tc,fc))
})();
var state__16208__auto__ = (function (){var statearr_16905 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_16905[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___16910);

return statearr_16905;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___16910,tc,fc))
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
var c__16206__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto__){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto__){
return (function (state_16990){
var state_val_16991 = (state_16990[(1)]);
if((state_val_16991 === (7))){
var inst_16986 = (state_16990[(2)]);
var state_16990__$1 = state_16990;
var statearr_16992_17013 = state_16990__$1;
(statearr_16992_17013[(2)] = inst_16986);

(statearr_16992_17013[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16991 === (1))){
var inst_16970 = init;
var state_16990__$1 = (function (){var statearr_16993 = state_16990;
(statearr_16993[(7)] = inst_16970);

return statearr_16993;
})();
var statearr_16994_17014 = state_16990__$1;
(statearr_16994_17014[(2)] = null);

(statearr_16994_17014[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16991 === (4))){
var inst_16973 = (state_16990[(8)]);
var inst_16973__$1 = (state_16990[(2)]);
var inst_16974 = (inst_16973__$1 == null);
var state_16990__$1 = (function (){var statearr_16995 = state_16990;
(statearr_16995[(8)] = inst_16973__$1);

return statearr_16995;
})();
if(cljs.core.truth_(inst_16974)){
var statearr_16996_17015 = state_16990__$1;
(statearr_16996_17015[(1)] = (5));

} else {
var statearr_16997_17016 = state_16990__$1;
(statearr_16997_17016[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16991 === (6))){
var inst_16973 = (state_16990[(8)]);
var inst_16977 = (state_16990[(9)]);
var inst_16970 = (state_16990[(7)]);
var inst_16977__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_16970,inst_16973) : f.call(null,inst_16970,inst_16973));
var inst_16978 = cljs.core.reduced_QMARK_(inst_16977__$1);
var state_16990__$1 = (function (){var statearr_16998 = state_16990;
(statearr_16998[(9)] = inst_16977__$1);

return statearr_16998;
})();
if(inst_16978){
var statearr_16999_17017 = state_16990__$1;
(statearr_16999_17017[(1)] = (8));

} else {
var statearr_17000_17018 = state_16990__$1;
(statearr_17000_17018[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_16991 === (3))){
var inst_16988 = (state_16990[(2)]);
var state_16990__$1 = state_16990;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16990__$1,inst_16988);
} else {
if((state_val_16991 === (2))){
var state_16990__$1 = state_16990;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16990__$1,(4),ch);
} else {
if((state_val_16991 === (9))){
var inst_16977 = (state_16990[(9)]);
var inst_16970 = inst_16977;
var state_16990__$1 = (function (){var statearr_17001 = state_16990;
(statearr_17001[(7)] = inst_16970);

return statearr_17001;
})();
var statearr_17002_17019 = state_16990__$1;
(statearr_17002_17019[(2)] = null);

(statearr_17002_17019[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16991 === (5))){
var inst_16970 = (state_16990[(7)]);
var state_16990__$1 = state_16990;
var statearr_17003_17020 = state_16990__$1;
(statearr_17003_17020[(2)] = inst_16970);

(statearr_17003_17020[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16991 === (10))){
var inst_16984 = (state_16990[(2)]);
var state_16990__$1 = state_16990;
var statearr_17004_17021 = state_16990__$1;
(statearr_17004_17021[(2)] = inst_16984);

(statearr_17004_17021[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_16991 === (8))){
var inst_16977 = (state_16990[(9)]);
var inst_16980 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_16977) : cljs.core.deref.call(null,inst_16977));
var state_16990__$1 = state_16990;
var statearr_17005_17022 = state_16990__$1;
(statearr_17005_17022[(2)] = inst_16980);

(statearr_17005_17022[(1)] = (10));


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
});})(c__16206__auto__))
;
return ((function (switch__16090__auto__,c__16206__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__16091__auto__ = null;
var cljs$core$async$reduce_$_state_machine__16091__auto____0 = (function (){
var statearr_17009 = [null,null,null,null,null,null,null,null,null,null];
(statearr_17009[(0)] = cljs$core$async$reduce_$_state_machine__16091__auto__);

(statearr_17009[(1)] = (1));

return statearr_17009;
});
var cljs$core$async$reduce_$_state_machine__16091__auto____1 = (function (state_16990){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_16990);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e17010){if((e17010 instanceof Object)){
var ex__16094__auto__ = e17010;
var statearr_17011_17023 = state_16990;
(statearr_17011_17023[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_16990);

return cljs.core.cst$kw$recur;
} else {
throw e17010;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__17024 = state_16990;
state_16990 = G__17024;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__16091__auto__ = function(state_16990){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__16091__auto____1.call(this,state_16990);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__16091__auto____0;
cljs$core$async$reduce_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__16091__auto____1;
return cljs$core$async$reduce_$_state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto__))
})();
var state__16208__auto__ = (function (){var statearr_17012 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_17012[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto__);

return statearr_17012;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto__))
);

return c__16206__auto__;
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
var args17025 = [];
var len__8202__auto___17077 = arguments.length;
var i__8203__auto___17078 = (0);
while(true){
if((i__8203__auto___17078 < len__8202__auto___17077)){
args17025.push((arguments[i__8203__auto___17078]));

var G__17079 = (i__8203__auto___17078 + (1));
i__8203__auto___17078 = G__17079;
continue;
} else {
}
break;
}

var G__17027 = args17025.length;
switch (G__17027) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17025.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__16206__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto__){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto__){
return (function (state_17052){
var state_val_17053 = (state_17052[(1)]);
if((state_val_17053 === (7))){
var inst_17034 = (state_17052[(2)]);
var state_17052__$1 = state_17052;
var statearr_17054_17081 = state_17052__$1;
(statearr_17054_17081[(2)] = inst_17034);

(statearr_17054_17081[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17053 === (1))){
var inst_17028 = cljs.core.seq(coll);
var inst_17029 = inst_17028;
var state_17052__$1 = (function (){var statearr_17055 = state_17052;
(statearr_17055[(7)] = inst_17029);

return statearr_17055;
})();
var statearr_17056_17082 = state_17052__$1;
(statearr_17056_17082[(2)] = null);

(statearr_17056_17082[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17053 === (4))){
var inst_17029 = (state_17052[(7)]);
var inst_17032 = cljs.core.first(inst_17029);
var state_17052__$1 = state_17052;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17052__$1,(7),ch,inst_17032);
} else {
if((state_val_17053 === (13))){
var inst_17046 = (state_17052[(2)]);
var state_17052__$1 = state_17052;
var statearr_17057_17083 = state_17052__$1;
(statearr_17057_17083[(2)] = inst_17046);

(statearr_17057_17083[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17053 === (6))){
var inst_17037 = (state_17052[(2)]);
var state_17052__$1 = state_17052;
if(cljs.core.truth_(inst_17037)){
var statearr_17058_17084 = state_17052__$1;
(statearr_17058_17084[(1)] = (8));

} else {
var statearr_17059_17085 = state_17052__$1;
(statearr_17059_17085[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17053 === (3))){
var inst_17050 = (state_17052[(2)]);
var state_17052__$1 = state_17052;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17052__$1,inst_17050);
} else {
if((state_val_17053 === (12))){
var state_17052__$1 = state_17052;
var statearr_17060_17086 = state_17052__$1;
(statearr_17060_17086[(2)] = null);

(statearr_17060_17086[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17053 === (2))){
var inst_17029 = (state_17052[(7)]);
var state_17052__$1 = state_17052;
if(cljs.core.truth_(inst_17029)){
var statearr_17061_17087 = state_17052__$1;
(statearr_17061_17087[(1)] = (4));

} else {
var statearr_17062_17088 = state_17052__$1;
(statearr_17062_17088[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17053 === (11))){
var inst_17043 = cljs.core.async.close_BANG_(ch);
var state_17052__$1 = state_17052;
var statearr_17063_17089 = state_17052__$1;
(statearr_17063_17089[(2)] = inst_17043);

(statearr_17063_17089[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17053 === (9))){
var state_17052__$1 = state_17052;
if(cljs.core.truth_(close_QMARK_)){
var statearr_17064_17090 = state_17052__$1;
(statearr_17064_17090[(1)] = (11));

} else {
var statearr_17065_17091 = state_17052__$1;
(statearr_17065_17091[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17053 === (5))){
var inst_17029 = (state_17052[(7)]);
var state_17052__$1 = state_17052;
var statearr_17066_17092 = state_17052__$1;
(statearr_17066_17092[(2)] = inst_17029);

(statearr_17066_17092[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17053 === (10))){
var inst_17048 = (state_17052[(2)]);
var state_17052__$1 = state_17052;
var statearr_17067_17093 = state_17052__$1;
(statearr_17067_17093[(2)] = inst_17048);

(statearr_17067_17093[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17053 === (8))){
var inst_17029 = (state_17052[(7)]);
var inst_17039 = cljs.core.next(inst_17029);
var inst_17029__$1 = inst_17039;
var state_17052__$1 = (function (){var statearr_17068 = state_17052;
(statearr_17068[(7)] = inst_17029__$1);

return statearr_17068;
})();
var statearr_17069_17094 = state_17052__$1;
(statearr_17069_17094[(2)] = null);

(statearr_17069_17094[(1)] = (2));


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
});})(c__16206__auto__))
;
return ((function (switch__16090__auto__,c__16206__auto__){
return (function() {
var cljs$core$async$state_machine__16091__auto__ = null;
var cljs$core$async$state_machine__16091__auto____0 = (function (){
var statearr_17073 = [null,null,null,null,null,null,null,null];
(statearr_17073[(0)] = cljs$core$async$state_machine__16091__auto__);

(statearr_17073[(1)] = (1));

return statearr_17073;
});
var cljs$core$async$state_machine__16091__auto____1 = (function (state_17052){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_17052);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e17074){if((e17074 instanceof Object)){
var ex__16094__auto__ = e17074;
var statearr_17075_17095 = state_17052;
(statearr_17075_17095[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_17052);

return cljs.core.cst$kw$recur;
} else {
throw e17074;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__17096 = state_17052;
state_17052 = G__17096;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$state_machine__16091__auto__ = function(state_17052){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16091__auto____1.call(this,state_17052);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16091__auto____0;
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16091__auto____1;
return cljs$core$async$state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto__))
})();
var state__16208__auto__ = (function (){var statearr_17076 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_17076[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto__);

return statearr_17076;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto__))
);

return c__16206__auto__;
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
var cs = (function (){var G__17325 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__17325) : cljs.core.atom.call(null,G__17325));
})();
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async17326 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17326 = (function (mult,ch,cs,meta17327){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta17327 = meta17327;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async17326.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_17328,meta17327__$1){
var self__ = this;
var _17328__$1 = this;
return (new cljs.core.async.t_cljs$core$async17326(self__.mult,self__.ch,self__.cs,meta17327__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async17326.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_17328){
var self__ = this;
var _17328__$1 = this;
return self__.meta17327;
});})(cs))
;

cljs.core.async.t_cljs$core$async17326.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async17326.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async17326.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async17326.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async17326.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async17326.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
var G__17329_17553 = self__.cs;
var G__17330_17554 = cljs.core.PersistentArrayMap.EMPTY;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__17329_17553,G__17330_17554) : cljs.core.reset_BANG_.call(null,G__17329_17553,G__17330_17554));

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async17326.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$mult,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),cljs.core.cst$sym$ch,cljs.core.cst$sym$cs,cljs.core.cst$sym$meta17327], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async17326.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async17326.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17326";

cljs.core.async.t_cljs$core$async17326.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async17326");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async17326 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async17326(mult__$1,ch__$1,cs__$1,meta17327){
return (new cljs.core.async.t_cljs$core$async17326(mult__$1,ch__$1,cs__$1,meta17327));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async17326(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
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
var c__16206__auto___17555 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___17555,cs,m,dchan,dctr,done){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___17555,cs,m,dchan,dctr,done){
return (function (state_17465){
var state_val_17466 = (state_17465[(1)]);
if((state_val_17466 === (7))){
var inst_17461 = (state_17465[(2)]);
var state_17465__$1 = state_17465;
var statearr_17467_17556 = state_17465__$1;
(statearr_17467_17556[(2)] = inst_17461);

(statearr_17467_17556[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (20))){
var inst_17364 = (state_17465[(7)]);
var inst_17376 = cljs.core.first(inst_17364);
var inst_17377 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17376,(0),null);
var inst_17378 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17376,(1),null);
var state_17465__$1 = (function (){var statearr_17468 = state_17465;
(statearr_17468[(8)] = inst_17377);

return statearr_17468;
})();
if(cljs.core.truth_(inst_17378)){
var statearr_17469_17557 = state_17465__$1;
(statearr_17469_17557[(1)] = (22));

} else {
var statearr_17470_17558 = state_17465__$1;
(statearr_17470_17558[(1)] = (23));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (27))){
var inst_17333 = (state_17465[(9)]);
var inst_17413 = (state_17465[(10)]);
var inst_17408 = (state_17465[(11)]);
var inst_17406 = (state_17465[(12)]);
var inst_17413__$1 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_17406,inst_17408);
var inst_17414 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_17413__$1,inst_17333,done);
var state_17465__$1 = (function (){var statearr_17471 = state_17465;
(statearr_17471[(10)] = inst_17413__$1);

return statearr_17471;
})();
if(cljs.core.truth_(inst_17414)){
var statearr_17472_17559 = state_17465__$1;
(statearr_17472_17559[(1)] = (30));

} else {
var statearr_17473_17560 = state_17465__$1;
(statearr_17473_17560[(1)] = (31));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (1))){
var state_17465__$1 = state_17465;
var statearr_17474_17561 = state_17465__$1;
(statearr_17474_17561[(2)] = null);

(statearr_17474_17561[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (24))){
var inst_17364 = (state_17465[(7)]);
var inst_17383 = (state_17465[(2)]);
var inst_17384 = cljs.core.next(inst_17364);
var inst_17342 = inst_17384;
var inst_17343 = null;
var inst_17344 = (0);
var inst_17345 = (0);
var state_17465__$1 = (function (){var statearr_17475 = state_17465;
(statearr_17475[(13)] = inst_17383);

(statearr_17475[(14)] = inst_17342);

(statearr_17475[(15)] = inst_17345);

(statearr_17475[(16)] = inst_17343);

(statearr_17475[(17)] = inst_17344);

return statearr_17475;
})();
var statearr_17476_17562 = state_17465__$1;
(statearr_17476_17562[(2)] = null);

(statearr_17476_17562[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (39))){
var state_17465__$1 = state_17465;
var statearr_17480_17563 = state_17465__$1;
(statearr_17480_17563[(2)] = null);

(statearr_17480_17563[(1)] = (41));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (4))){
var inst_17333 = (state_17465[(9)]);
var inst_17333__$1 = (state_17465[(2)]);
var inst_17334 = (inst_17333__$1 == null);
var state_17465__$1 = (function (){var statearr_17481 = state_17465;
(statearr_17481[(9)] = inst_17333__$1);

return statearr_17481;
})();
if(cljs.core.truth_(inst_17334)){
var statearr_17482_17564 = state_17465__$1;
(statearr_17482_17564[(1)] = (5));

} else {
var statearr_17483_17565 = state_17465__$1;
(statearr_17483_17565[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (15))){
var inst_17342 = (state_17465[(14)]);
var inst_17345 = (state_17465[(15)]);
var inst_17343 = (state_17465[(16)]);
var inst_17344 = (state_17465[(17)]);
var inst_17360 = (state_17465[(2)]);
var inst_17361 = (inst_17345 + (1));
var tmp17477 = inst_17342;
var tmp17478 = inst_17343;
var tmp17479 = inst_17344;
var inst_17342__$1 = tmp17477;
var inst_17343__$1 = tmp17478;
var inst_17344__$1 = tmp17479;
var inst_17345__$1 = inst_17361;
var state_17465__$1 = (function (){var statearr_17484 = state_17465;
(statearr_17484[(14)] = inst_17342__$1);

(statearr_17484[(15)] = inst_17345__$1);

(statearr_17484[(16)] = inst_17343__$1);

(statearr_17484[(18)] = inst_17360);

(statearr_17484[(17)] = inst_17344__$1);

return statearr_17484;
})();
var statearr_17485_17566 = state_17465__$1;
(statearr_17485_17566[(2)] = null);

(statearr_17485_17566[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (21))){
var inst_17387 = (state_17465[(2)]);
var state_17465__$1 = state_17465;
var statearr_17489_17567 = state_17465__$1;
(statearr_17489_17567[(2)] = inst_17387);

(statearr_17489_17567[(1)] = (18));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (31))){
var inst_17413 = (state_17465[(10)]);
var inst_17417 = done(null);
var inst_17418 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_17413);
var state_17465__$1 = (function (){var statearr_17490 = state_17465;
(statearr_17490[(19)] = inst_17417);

return statearr_17490;
})();
var statearr_17491_17568 = state_17465__$1;
(statearr_17491_17568[(2)] = inst_17418);

(statearr_17491_17568[(1)] = (32));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (32))){
var inst_17407 = (state_17465[(20)]);
var inst_17408 = (state_17465[(11)]);
var inst_17406 = (state_17465[(12)]);
var inst_17405 = (state_17465[(21)]);
var inst_17420 = (state_17465[(2)]);
var inst_17421 = (inst_17408 + (1));
var tmp17486 = inst_17407;
var tmp17487 = inst_17406;
var tmp17488 = inst_17405;
var inst_17405__$1 = tmp17488;
var inst_17406__$1 = tmp17487;
var inst_17407__$1 = tmp17486;
var inst_17408__$1 = inst_17421;
var state_17465__$1 = (function (){var statearr_17492 = state_17465;
(statearr_17492[(20)] = inst_17407__$1);

(statearr_17492[(22)] = inst_17420);

(statearr_17492[(11)] = inst_17408__$1);

(statearr_17492[(12)] = inst_17406__$1);

(statearr_17492[(21)] = inst_17405__$1);

return statearr_17492;
})();
var statearr_17493_17569 = state_17465__$1;
(statearr_17493_17569[(2)] = null);

(statearr_17493_17569[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (40))){
var inst_17433 = (state_17465[(23)]);
var inst_17437 = done(null);
var inst_17438 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_17433);
var state_17465__$1 = (function (){var statearr_17494 = state_17465;
(statearr_17494[(24)] = inst_17437);

return statearr_17494;
})();
var statearr_17495_17570 = state_17465__$1;
(statearr_17495_17570[(2)] = inst_17438);

(statearr_17495_17570[(1)] = (41));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (33))){
var inst_17424 = (state_17465[(25)]);
var inst_17426 = cljs.core.chunked_seq_QMARK_(inst_17424);
var state_17465__$1 = state_17465;
if(inst_17426){
var statearr_17496_17571 = state_17465__$1;
(statearr_17496_17571[(1)] = (36));

} else {
var statearr_17497_17572 = state_17465__$1;
(statearr_17497_17572[(1)] = (37));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (13))){
var inst_17354 = (state_17465[(26)]);
var inst_17357 = cljs.core.async.close_BANG_(inst_17354);
var state_17465__$1 = state_17465;
var statearr_17498_17573 = state_17465__$1;
(statearr_17498_17573[(2)] = inst_17357);

(statearr_17498_17573[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (22))){
var inst_17377 = (state_17465[(8)]);
var inst_17380 = cljs.core.async.close_BANG_(inst_17377);
var state_17465__$1 = state_17465;
var statearr_17499_17574 = state_17465__$1;
(statearr_17499_17574[(2)] = inst_17380);

(statearr_17499_17574[(1)] = (24));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (36))){
var inst_17424 = (state_17465[(25)]);
var inst_17428 = cljs.core.chunk_first(inst_17424);
var inst_17429 = cljs.core.chunk_rest(inst_17424);
var inst_17430 = cljs.core.count(inst_17428);
var inst_17405 = inst_17429;
var inst_17406 = inst_17428;
var inst_17407 = inst_17430;
var inst_17408 = (0);
var state_17465__$1 = (function (){var statearr_17500 = state_17465;
(statearr_17500[(20)] = inst_17407);

(statearr_17500[(11)] = inst_17408);

(statearr_17500[(12)] = inst_17406);

(statearr_17500[(21)] = inst_17405);

return statearr_17500;
})();
var statearr_17501_17575 = state_17465__$1;
(statearr_17501_17575[(2)] = null);

(statearr_17501_17575[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (41))){
var inst_17424 = (state_17465[(25)]);
var inst_17440 = (state_17465[(2)]);
var inst_17441 = cljs.core.next(inst_17424);
var inst_17405 = inst_17441;
var inst_17406 = null;
var inst_17407 = (0);
var inst_17408 = (0);
var state_17465__$1 = (function (){var statearr_17502 = state_17465;
(statearr_17502[(27)] = inst_17440);

(statearr_17502[(20)] = inst_17407);

(statearr_17502[(11)] = inst_17408);

(statearr_17502[(12)] = inst_17406);

(statearr_17502[(21)] = inst_17405);

return statearr_17502;
})();
var statearr_17503_17576 = state_17465__$1;
(statearr_17503_17576[(2)] = null);

(statearr_17503_17576[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (43))){
var state_17465__$1 = state_17465;
var statearr_17504_17577 = state_17465__$1;
(statearr_17504_17577[(2)] = null);

(statearr_17504_17577[(1)] = (44));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (29))){
var inst_17449 = (state_17465[(2)]);
var state_17465__$1 = state_17465;
var statearr_17505_17578 = state_17465__$1;
(statearr_17505_17578[(2)] = inst_17449);

(statearr_17505_17578[(1)] = (26));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (44))){
var inst_17458 = (state_17465[(2)]);
var state_17465__$1 = (function (){var statearr_17506 = state_17465;
(statearr_17506[(28)] = inst_17458);

return statearr_17506;
})();
var statearr_17507_17579 = state_17465__$1;
(statearr_17507_17579[(2)] = null);

(statearr_17507_17579[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (6))){
var inst_17397 = (state_17465[(29)]);
var inst_17396 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cs) : cljs.core.deref.call(null,cs));
var inst_17397__$1 = cljs.core.keys(inst_17396);
var inst_17398 = cljs.core.count(inst_17397__$1);
var inst_17399 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,inst_17398) : cljs.core.reset_BANG_.call(null,dctr,inst_17398));
var inst_17404 = cljs.core.seq(inst_17397__$1);
var inst_17405 = inst_17404;
var inst_17406 = null;
var inst_17407 = (0);
var inst_17408 = (0);
var state_17465__$1 = (function (){var statearr_17508 = state_17465;
(statearr_17508[(29)] = inst_17397__$1);

(statearr_17508[(20)] = inst_17407);

(statearr_17508[(11)] = inst_17408);

(statearr_17508[(12)] = inst_17406);

(statearr_17508[(21)] = inst_17405);

(statearr_17508[(30)] = inst_17399);

return statearr_17508;
})();
var statearr_17509_17580 = state_17465__$1;
(statearr_17509_17580[(2)] = null);

(statearr_17509_17580[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (28))){
var inst_17424 = (state_17465[(25)]);
var inst_17405 = (state_17465[(21)]);
var inst_17424__$1 = cljs.core.seq(inst_17405);
var state_17465__$1 = (function (){var statearr_17510 = state_17465;
(statearr_17510[(25)] = inst_17424__$1);

return statearr_17510;
})();
if(inst_17424__$1){
var statearr_17511_17581 = state_17465__$1;
(statearr_17511_17581[(1)] = (33));

} else {
var statearr_17512_17582 = state_17465__$1;
(statearr_17512_17582[(1)] = (34));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (25))){
var inst_17407 = (state_17465[(20)]);
var inst_17408 = (state_17465[(11)]);
var inst_17410 = (inst_17408 < inst_17407);
var inst_17411 = inst_17410;
var state_17465__$1 = state_17465;
if(cljs.core.truth_(inst_17411)){
var statearr_17513_17583 = state_17465__$1;
(statearr_17513_17583[(1)] = (27));

} else {
var statearr_17514_17584 = state_17465__$1;
(statearr_17514_17584[(1)] = (28));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (34))){
var state_17465__$1 = state_17465;
var statearr_17515_17585 = state_17465__$1;
(statearr_17515_17585[(2)] = null);

(statearr_17515_17585[(1)] = (35));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (17))){
var state_17465__$1 = state_17465;
var statearr_17516_17586 = state_17465__$1;
(statearr_17516_17586[(2)] = null);

(statearr_17516_17586[(1)] = (18));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (3))){
var inst_17463 = (state_17465[(2)]);
var state_17465__$1 = state_17465;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17465__$1,inst_17463);
} else {
if((state_val_17466 === (12))){
var inst_17392 = (state_17465[(2)]);
var state_17465__$1 = state_17465;
var statearr_17517_17587 = state_17465__$1;
(statearr_17517_17587[(2)] = inst_17392);

(statearr_17517_17587[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (2))){
var state_17465__$1 = state_17465;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17465__$1,(4),ch);
} else {
if((state_val_17466 === (23))){
var state_17465__$1 = state_17465;
var statearr_17518_17588 = state_17465__$1;
(statearr_17518_17588[(2)] = null);

(statearr_17518_17588[(1)] = (24));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (35))){
var inst_17447 = (state_17465[(2)]);
var state_17465__$1 = state_17465;
var statearr_17519_17589 = state_17465__$1;
(statearr_17519_17589[(2)] = inst_17447);

(statearr_17519_17589[(1)] = (29));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (19))){
var inst_17364 = (state_17465[(7)]);
var inst_17368 = cljs.core.chunk_first(inst_17364);
var inst_17369 = cljs.core.chunk_rest(inst_17364);
var inst_17370 = cljs.core.count(inst_17368);
var inst_17342 = inst_17369;
var inst_17343 = inst_17368;
var inst_17344 = inst_17370;
var inst_17345 = (0);
var state_17465__$1 = (function (){var statearr_17520 = state_17465;
(statearr_17520[(14)] = inst_17342);

(statearr_17520[(15)] = inst_17345);

(statearr_17520[(16)] = inst_17343);

(statearr_17520[(17)] = inst_17344);

return statearr_17520;
})();
var statearr_17521_17590 = state_17465__$1;
(statearr_17521_17590[(2)] = null);

(statearr_17521_17590[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (11))){
var inst_17342 = (state_17465[(14)]);
var inst_17364 = (state_17465[(7)]);
var inst_17364__$1 = cljs.core.seq(inst_17342);
var state_17465__$1 = (function (){var statearr_17522 = state_17465;
(statearr_17522[(7)] = inst_17364__$1);

return statearr_17522;
})();
if(inst_17364__$1){
var statearr_17523_17591 = state_17465__$1;
(statearr_17523_17591[(1)] = (16));

} else {
var statearr_17524_17592 = state_17465__$1;
(statearr_17524_17592[(1)] = (17));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (9))){
var inst_17394 = (state_17465[(2)]);
var state_17465__$1 = state_17465;
var statearr_17525_17593 = state_17465__$1;
(statearr_17525_17593[(2)] = inst_17394);

(statearr_17525_17593[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (5))){
var inst_17340 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cs) : cljs.core.deref.call(null,cs));
var inst_17341 = cljs.core.seq(inst_17340);
var inst_17342 = inst_17341;
var inst_17343 = null;
var inst_17344 = (0);
var inst_17345 = (0);
var state_17465__$1 = (function (){var statearr_17526 = state_17465;
(statearr_17526[(14)] = inst_17342);

(statearr_17526[(15)] = inst_17345);

(statearr_17526[(16)] = inst_17343);

(statearr_17526[(17)] = inst_17344);

return statearr_17526;
})();
var statearr_17527_17594 = state_17465__$1;
(statearr_17527_17594[(2)] = null);

(statearr_17527_17594[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (14))){
var state_17465__$1 = state_17465;
var statearr_17528_17595 = state_17465__$1;
(statearr_17528_17595[(2)] = null);

(statearr_17528_17595[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (45))){
var inst_17455 = (state_17465[(2)]);
var state_17465__$1 = state_17465;
var statearr_17529_17596 = state_17465__$1;
(statearr_17529_17596[(2)] = inst_17455);

(statearr_17529_17596[(1)] = (44));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (26))){
var inst_17397 = (state_17465[(29)]);
var inst_17451 = (state_17465[(2)]);
var inst_17452 = cljs.core.seq(inst_17397);
var state_17465__$1 = (function (){var statearr_17530 = state_17465;
(statearr_17530[(31)] = inst_17451);

return statearr_17530;
})();
if(inst_17452){
var statearr_17531_17597 = state_17465__$1;
(statearr_17531_17597[(1)] = (42));

} else {
var statearr_17532_17598 = state_17465__$1;
(statearr_17532_17598[(1)] = (43));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (16))){
var inst_17364 = (state_17465[(7)]);
var inst_17366 = cljs.core.chunked_seq_QMARK_(inst_17364);
var state_17465__$1 = state_17465;
if(inst_17366){
var statearr_17533_17599 = state_17465__$1;
(statearr_17533_17599[(1)] = (19));

} else {
var statearr_17534_17600 = state_17465__$1;
(statearr_17534_17600[(1)] = (20));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (38))){
var inst_17444 = (state_17465[(2)]);
var state_17465__$1 = state_17465;
var statearr_17535_17601 = state_17465__$1;
(statearr_17535_17601[(2)] = inst_17444);

(statearr_17535_17601[(1)] = (35));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (30))){
var state_17465__$1 = state_17465;
var statearr_17536_17602 = state_17465__$1;
(statearr_17536_17602[(2)] = null);

(statearr_17536_17602[(1)] = (32));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (10))){
var inst_17345 = (state_17465[(15)]);
var inst_17343 = (state_17465[(16)]);
var inst_17353 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_17343,inst_17345);
var inst_17354 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17353,(0),null);
var inst_17355 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17353,(1),null);
var state_17465__$1 = (function (){var statearr_17537 = state_17465;
(statearr_17537[(26)] = inst_17354);

return statearr_17537;
})();
if(cljs.core.truth_(inst_17355)){
var statearr_17538_17603 = state_17465__$1;
(statearr_17538_17603[(1)] = (13));

} else {
var statearr_17539_17604 = state_17465__$1;
(statearr_17539_17604[(1)] = (14));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (18))){
var inst_17390 = (state_17465[(2)]);
var state_17465__$1 = state_17465;
var statearr_17540_17605 = state_17465__$1;
(statearr_17540_17605[(2)] = inst_17390);

(statearr_17540_17605[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (42))){
var state_17465__$1 = state_17465;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17465__$1,(45),dchan);
} else {
if((state_val_17466 === (37))){
var inst_17424 = (state_17465[(25)]);
var inst_17333 = (state_17465[(9)]);
var inst_17433 = (state_17465[(23)]);
var inst_17433__$1 = cljs.core.first(inst_17424);
var inst_17434 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_17433__$1,inst_17333,done);
var state_17465__$1 = (function (){var statearr_17541 = state_17465;
(statearr_17541[(23)] = inst_17433__$1);

return statearr_17541;
})();
if(cljs.core.truth_(inst_17434)){
var statearr_17542_17606 = state_17465__$1;
(statearr_17542_17606[(1)] = (39));

} else {
var statearr_17543_17607 = state_17465__$1;
(statearr_17543_17607[(1)] = (40));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17466 === (8))){
var inst_17345 = (state_17465[(15)]);
var inst_17344 = (state_17465[(17)]);
var inst_17347 = (inst_17345 < inst_17344);
var inst_17348 = inst_17347;
var state_17465__$1 = state_17465;
if(cljs.core.truth_(inst_17348)){
var statearr_17544_17608 = state_17465__$1;
(statearr_17544_17608[(1)] = (10));

} else {
var statearr_17545_17609 = state_17465__$1;
(statearr_17545_17609[(1)] = (11));

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
});})(c__16206__auto___17555,cs,m,dchan,dctr,done))
;
return ((function (switch__16090__auto__,c__16206__auto___17555,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__16091__auto__ = null;
var cljs$core$async$mult_$_state_machine__16091__auto____0 = (function (){
var statearr_17549 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17549[(0)] = cljs$core$async$mult_$_state_machine__16091__auto__);

(statearr_17549[(1)] = (1));

return statearr_17549;
});
var cljs$core$async$mult_$_state_machine__16091__auto____1 = (function (state_17465){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_17465);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e17550){if((e17550 instanceof Object)){
var ex__16094__auto__ = e17550;
var statearr_17551_17610 = state_17465;
(statearr_17551_17610[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_17465);

return cljs.core.cst$kw$recur;
} else {
throw e17550;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__17611 = state_17465;
state_17465 = G__17611;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__16091__auto__ = function(state_17465){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__16091__auto____1.call(this,state_17465);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__16091__auto____0;
cljs$core$async$mult_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__16091__auto____1;
return cljs$core$async$mult_$_state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___17555,cs,m,dchan,dctr,done))
})();
var state__16208__auto__ = (function (){var statearr_17552 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_17552[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___17555);

return statearr_17552;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___17555,cs,m,dchan,dctr,done))
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
var args17612 = [];
var len__8202__auto___17615 = arguments.length;
var i__8203__auto___17616 = (0);
while(true){
if((i__8203__auto___17616 < len__8202__auto___17615)){
args17612.push((arguments[i__8203__auto___17616]));

var G__17617 = (i__8203__auto___17616 + (1));
i__8203__auto___17616 = G__17617;
continue;
} else {
}
break;
}

var G__17614 = args17612.length;
switch (G__17614) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17612.length)].join('')));

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
var len__8202__auto___17629 = arguments.length;
var i__8203__auto___17630 = (0);
while(true){
if((i__8203__auto___17630 < len__8202__auto___17629)){
args__8209__auto__.push((arguments[i__8203__auto___17630]));

var G__17631 = (i__8203__auto___17630 + (1));
i__8203__auto___17630 = G__17631;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((3) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__8210__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__17623){
var map__17624 = p__17623;
var map__17624__$1 = ((((!((map__17624 == null)))?((((map__17624.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17624.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17624):map__17624);
var opts = map__17624__$1;
var statearr_17626_17632 = state;
(statearr_17626_17632[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__6363__auto__ = cljs.core.async.do_alts(((function (map__17624,map__17624__$1,opts){
return (function (val){
var statearr_17627_17633 = state;
(statearr_17627_17633[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
});})(map__17624,map__17624__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__6363__auto__)){
var cb = temp__6363__auto__;
var statearr_17628_17634 = state;
(statearr_17628_17634[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cb) : cljs.core.deref.call(null,cb)));


return cljs.core.cst$kw$recur;
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq17619){
var G__17620 = cljs.core.first(seq17619);
var seq17619__$1 = cljs.core.next(seq17619);
var G__17621 = cljs.core.first(seq17619__$1);
var seq17619__$2 = cljs.core.next(seq17619__$1);
var G__17622 = cljs.core.first(seq17619__$2);
var seq17619__$3 = cljs.core.next(seq17619__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__17620,G__17621,G__17622,seq17619__$3);
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
var cs = (function (){var G__17803 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__17803) : cljs.core.atom.call(null,G__17803));
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
if(typeof cljs.core.async.t_cljs$core$async17804 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17804 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta17805){
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
this.meta17805 = meta17805;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async17804.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_17806,meta17805__$1){
var self__ = this;
var _17806__$1 = this;
return (new cljs.core.async.t_cljs$core$async17804(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta17805__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17804.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_17806){
var self__ = this;
var _17806__$1 = this;
return self__.meta17805;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17804.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async17804.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17804.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async17804.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17804.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17804.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
var G__17807_17971 = self__.cs;
var G__17808_17972 = cljs.core.PersistentArrayMap.EMPTY;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__17807_17971,G__17808_17972) : cljs.core.reset_BANG_.call(null,G__17807_17971,G__17808_17972));

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17804.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17804.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
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

cljs.core.async.t_cljs$core$async17804.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$change,cljs.core.with_meta(cljs.core.cst$sym$mix,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$out], null))),cljs.core.cst$kw$doc,"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),cljs.core.cst$sym$solo_DASH_mode,cljs.core.cst$sym$pick,cljs.core.cst$sym$cs,cljs.core.cst$sym$calc_DASH_state,cljs.core.cst$sym$out,cljs.core.cst$sym$changed,cljs.core.cst$sym$solo_DASH_modes,cljs.core.cst$sym$attrs,cljs.core.cst$sym$meta17805], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17804.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async17804.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17804";

cljs.core.async.t_cljs$core$async17804.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async17804");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async17804 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async17804(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta17805){
return (new cljs.core.async.t_cljs$core$async17804(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta17805));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async17804(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__16206__auto___17973 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___17973,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___17973,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_17908){
var state_val_17909 = (state_17908[(1)]);
if((state_val_17909 === (7))){
var inst_17824 = (state_17908[(2)]);
var state_17908__$1 = state_17908;
var statearr_17910_17974 = state_17908__$1;
(statearr_17910_17974[(2)] = inst_17824);

(statearr_17910_17974[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (20))){
var inst_17836 = (state_17908[(7)]);
var state_17908__$1 = state_17908;
var statearr_17911_17975 = state_17908__$1;
(statearr_17911_17975[(2)] = inst_17836);

(statearr_17911_17975[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (27))){
var state_17908__$1 = state_17908;
var statearr_17912_17976 = state_17908__$1;
(statearr_17912_17976[(2)] = null);

(statearr_17912_17976[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (1))){
var inst_17812 = (state_17908[(8)]);
var inst_17812__$1 = calc_state();
var inst_17814 = (inst_17812__$1 == null);
var inst_17815 = cljs.core.not(inst_17814);
var state_17908__$1 = (function (){var statearr_17913 = state_17908;
(statearr_17913[(8)] = inst_17812__$1);

return statearr_17913;
})();
if(inst_17815){
var statearr_17914_17977 = state_17908__$1;
(statearr_17914_17977[(1)] = (2));

} else {
var statearr_17915_17978 = state_17908__$1;
(statearr_17915_17978[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (24))){
var inst_17868 = (state_17908[(9)]);
var inst_17882 = (state_17908[(10)]);
var inst_17859 = (state_17908[(11)]);
var inst_17882__$1 = (inst_17859.cljs$core$IFn$_invoke$arity$1 ? inst_17859.cljs$core$IFn$_invoke$arity$1(inst_17868) : inst_17859.call(null,inst_17868));
var state_17908__$1 = (function (){var statearr_17916 = state_17908;
(statearr_17916[(10)] = inst_17882__$1);

return statearr_17916;
})();
if(cljs.core.truth_(inst_17882__$1)){
var statearr_17917_17979 = state_17908__$1;
(statearr_17917_17979[(1)] = (29));

} else {
var statearr_17918_17980 = state_17908__$1;
(statearr_17918_17980[(1)] = (30));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (4))){
var inst_17827 = (state_17908[(2)]);
var state_17908__$1 = state_17908;
if(cljs.core.truth_(inst_17827)){
var statearr_17919_17981 = state_17908__$1;
(statearr_17919_17981[(1)] = (8));

} else {
var statearr_17920_17982 = state_17908__$1;
(statearr_17920_17982[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (15))){
var inst_17853 = (state_17908[(2)]);
var state_17908__$1 = state_17908;
if(cljs.core.truth_(inst_17853)){
var statearr_17921_17983 = state_17908__$1;
(statearr_17921_17983[(1)] = (19));

} else {
var statearr_17922_17984 = state_17908__$1;
(statearr_17922_17984[(1)] = (20));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (21))){
var inst_17858 = (state_17908[(12)]);
var inst_17858__$1 = (state_17908[(2)]);
var inst_17859 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17858__$1,cljs.core.cst$kw$solos);
var inst_17860 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17858__$1,cljs.core.cst$kw$mutes);
var inst_17861 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17858__$1,cljs.core.cst$kw$reads);
var state_17908__$1 = (function (){var statearr_17923 = state_17908;
(statearr_17923[(12)] = inst_17858__$1);

(statearr_17923[(11)] = inst_17859);

(statearr_17923[(13)] = inst_17860);

return statearr_17923;
})();
return cljs.core.async.ioc_alts_BANG_(state_17908__$1,(22),inst_17861);
} else {
if((state_val_17909 === (31))){
var inst_17890 = (state_17908[(2)]);
var state_17908__$1 = state_17908;
if(cljs.core.truth_(inst_17890)){
var statearr_17924_17985 = state_17908__$1;
(statearr_17924_17985[(1)] = (32));

} else {
var statearr_17925_17986 = state_17908__$1;
(statearr_17925_17986[(1)] = (33));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (32))){
var inst_17867 = (state_17908[(14)]);
var state_17908__$1 = state_17908;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17908__$1,(35),out,inst_17867);
} else {
if((state_val_17909 === (33))){
var inst_17858 = (state_17908[(12)]);
var inst_17836 = inst_17858;
var state_17908__$1 = (function (){var statearr_17926 = state_17908;
(statearr_17926[(7)] = inst_17836);

return statearr_17926;
})();
var statearr_17927_17987 = state_17908__$1;
(statearr_17927_17987[(2)] = null);

(statearr_17927_17987[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (13))){
var inst_17836 = (state_17908[(7)]);
var inst_17843 = inst_17836.cljs$lang$protocol_mask$partition0$;
var inst_17844 = (inst_17843 & (64));
var inst_17845 = inst_17836.cljs$core$ISeq$;
var inst_17846 = (inst_17844) || (inst_17845);
var state_17908__$1 = state_17908;
if(cljs.core.truth_(inst_17846)){
var statearr_17928_17988 = state_17908__$1;
(statearr_17928_17988[(1)] = (16));

} else {
var statearr_17929_17989 = state_17908__$1;
(statearr_17929_17989[(1)] = (17));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (22))){
var inst_17868 = (state_17908[(9)]);
var inst_17867 = (state_17908[(14)]);
var inst_17866 = (state_17908[(2)]);
var inst_17867__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17866,(0),null);
var inst_17868__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17866,(1),null);
var inst_17869 = (inst_17867__$1 == null);
var inst_17870 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_17868__$1,change);
var inst_17871 = (inst_17869) || (inst_17870);
var state_17908__$1 = (function (){var statearr_17930 = state_17908;
(statearr_17930[(9)] = inst_17868__$1);

(statearr_17930[(14)] = inst_17867__$1);

return statearr_17930;
})();
if(cljs.core.truth_(inst_17871)){
var statearr_17931_17990 = state_17908__$1;
(statearr_17931_17990[(1)] = (23));

} else {
var statearr_17932_17991 = state_17908__$1;
(statearr_17932_17991[(1)] = (24));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (36))){
var inst_17858 = (state_17908[(12)]);
var inst_17836 = inst_17858;
var state_17908__$1 = (function (){var statearr_17933 = state_17908;
(statearr_17933[(7)] = inst_17836);

return statearr_17933;
})();
var statearr_17934_17992 = state_17908__$1;
(statearr_17934_17992[(2)] = null);

(statearr_17934_17992[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (29))){
var inst_17882 = (state_17908[(10)]);
var state_17908__$1 = state_17908;
var statearr_17935_17993 = state_17908__$1;
(statearr_17935_17993[(2)] = inst_17882);

(statearr_17935_17993[(1)] = (31));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (6))){
var state_17908__$1 = state_17908;
var statearr_17936_17994 = state_17908__$1;
(statearr_17936_17994[(2)] = false);

(statearr_17936_17994[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (28))){
var inst_17878 = (state_17908[(2)]);
var inst_17879 = calc_state();
var inst_17836 = inst_17879;
var state_17908__$1 = (function (){var statearr_17937 = state_17908;
(statearr_17937[(7)] = inst_17836);

(statearr_17937[(15)] = inst_17878);

return statearr_17937;
})();
var statearr_17938_17995 = state_17908__$1;
(statearr_17938_17995[(2)] = null);

(statearr_17938_17995[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (25))){
var inst_17904 = (state_17908[(2)]);
var state_17908__$1 = state_17908;
var statearr_17939_17996 = state_17908__$1;
(statearr_17939_17996[(2)] = inst_17904);

(statearr_17939_17996[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (34))){
var inst_17902 = (state_17908[(2)]);
var state_17908__$1 = state_17908;
var statearr_17940_17997 = state_17908__$1;
(statearr_17940_17997[(2)] = inst_17902);

(statearr_17940_17997[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (17))){
var state_17908__$1 = state_17908;
var statearr_17941_17998 = state_17908__$1;
(statearr_17941_17998[(2)] = false);

(statearr_17941_17998[(1)] = (18));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (3))){
var state_17908__$1 = state_17908;
var statearr_17942_17999 = state_17908__$1;
(statearr_17942_17999[(2)] = false);

(statearr_17942_17999[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (12))){
var inst_17906 = (state_17908[(2)]);
var state_17908__$1 = state_17908;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17908__$1,inst_17906);
} else {
if((state_val_17909 === (2))){
var inst_17812 = (state_17908[(8)]);
var inst_17817 = inst_17812.cljs$lang$protocol_mask$partition0$;
var inst_17818 = (inst_17817 & (64));
var inst_17819 = inst_17812.cljs$core$ISeq$;
var inst_17820 = (inst_17818) || (inst_17819);
var state_17908__$1 = state_17908;
if(cljs.core.truth_(inst_17820)){
var statearr_17943_18000 = state_17908__$1;
(statearr_17943_18000[(1)] = (5));

} else {
var statearr_17944_18001 = state_17908__$1;
(statearr_17944_18001[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (23))){
var inst_17867 = (state_17908[(14)]);
var inst_17873 = (inst_17867 == null);
var state_17908__$1 = state_17908;
if(cljs.core.truth_(inst_17873)){
var statearr_17945_18002 = state_17908__$1;
(statearr_17945_18002[(1)] = (26));

} else {
var statearr_17946_18003 = state_17908__$1;
(statearr_17946_18003[(1)] = (27));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (35))){
var inst_17893 = (state_17908[(2)]);
var state_17908__$1 = state_17908;
if(cljs.core.truth_(inst_17893)){
var statearr_17947_18004 = state_17908__$1;
(statearr_17947_18004[(1)] = (36));

} else {
var statearr_17948_18005 = state_17908__$1;
(statearr_17948_18005[(1)] = (37));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (19))){
var inst_17836 = (state_17908[(7)]);
var inst_17855 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_17836);
var state_17908__$1 = state_17908;
var statearr_17949_18006 = state_17908__$1;
(statearr_17949_18006[(2)] = inst_17855);

(statearr_17949_18006[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (11))){
var inst_17836 = (state_17908[(7)]);
var inst_17840 = (inst_17836 == null);
var inst_17841 = cljs.core.not(inst_17840);
var state_17908__$1 = state_17908;
if(inst_17841){
var statearr_17950_18007 = state_17908__$1;
(statearr_17950_18007[(1)] = (13));

} else {
var statearr_17951_18008 = state_17908__$1;
(statearr_17951_18008[(1)] = (14));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (9))){
var inst_17812 = (state_17908[(8)]);
var state_17908__$1 = state_17908;
var statearr_17952_18009 = state_17908__$1;
(statearr_17952_18009[(2)] = inst_17812);

(statearr_17952_18009[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (5))){
var state_17908__$1 = state_17908;
var statearr_17953_18010 = state_17908__$1;
(statearr_17953_18010[(2)] = true);

(statearr_17953_18010[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (14))){
var state_17908__$1 = state_17908;
var statearr_17954_18011 = state_17908__$1;
(statearr_17954_18011[(2)] = false);

(statearr_17954_18011[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (26))){
var inst_17868 = (state_17908[(9)]);
var inst_17875 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_17868);
var state_17908__$1 = state_17908;
var statearr_17955_18012 = state_17908__$1;
(statearr_17955_18012[(2)] = inst_17875);

(statearr_17955_18012[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (16))){
var state_17908__$1 = state_17908;
var statearr_17956_18013 = state_17908__$1;
(statearr_17956_18013[(2)] = true);

(statearr_17956_18013[(1)] = (18));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (38))){
var inst_17898 = (state_17908[(2)]);
var state_17908__$1 = state_17908;
var statearr_17957_18014 = state_17908__$1;
(statearr_17957_18014[(2)] = inst_17898);

(statearr_17957_18014[(1)] = (34));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (30))){
var inst_17868 = (state_17908[(9)]);
var inst_17859 = (state_17908[(11)]);
var inst_17860 = (state_17908[(13)]);
var inst_17885 = cljs.core.empty_QMARK_(inst_17859);
var inst_17886 = (inst_17860.cljs$core$IFn$_invoke$arity$1 ? inst_17860.cljs$core$IFn$_invoke$arity$1(inst_17868) : inst_17860.call(null,inst_17868));
var inst_17887 = cljs.core.not(inst_17886);
var inst_17888 = (inst_17885) && (inst_17887);
var state_17908__$1 = state_17908;
var statearr_17958_18015 = state_17908__$1;
(statearr_17958_18015[(2)] = inst_17888);

(statearr_17958_18015[(1)] = (31));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (10))){
var inst_17812 = (state_17908[(8)]);
var inst_17832 = (state_17908[(2)]);
var inst_17833 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17832,cljs.core.cst$kw$solos);
var inst_17834 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17832,cljs.core.cst$kw$mutes);
var inst_17835 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17832,cljs.core.cst$kw$reads);
var inst_17836 = inst_17812;
var state_17908__$1 = (function (){var statearr_17959 = state_17908;
(statearr_17959[(16)] = inst_17834);

(statearr_17959[(17)] = inst_17835);

(statearr_17959[(7)] = inst_17836);

(statearr_17959[(18)] = inst_17833);

return statearr_17959;
})();
var statearr_17960_18016 = state_17908__$1;
(statearr_17960_18016[(2)] = null);

(statearr_17960_18016[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (18))){
var inst_17850 = (state_17908[(2)]);
var state_17908__$1 = state_17908;
var statearr_17961_18017 = state_17908__$1;
(statearr_17961_18017[(2)] = inst_17850);

(statearr_17961_18017[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (37))){
var state_17908__$1 = state_17908;
var statearr_17962_18018 = state_17908__$1;
(statearr_17962_18018[(2)] = null);

(statearr_17962_18018[(1)] = (38));


return cljs.core.cst$kw$recur;
} else {
if((state_val_17909 === (8))){
var inst_17812 = (state_17908[(8)]);
var inst_17829 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_17812);
var state_17908__$1 = state_17908;
var statearr_17963_18019 = state_17908__$1;
(statearr_17963_18019[(2)] = inst_17829);

(statearr_17963_18019[(1)] = (10));


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
});})(c__16206__auto___17973,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__16090__auto__,c__16206__auto___17973,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__16091__auto__ = null;
var cljs$core$async$mix_$_state_machine__16091__auto____0 = (function (){
var statearr_17967 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17967[(0)] = cljs$core$async$mix_$_state_machine__16091__auto__);

(statearr_17967[(1)] = (1));

return statearr_17967;
});
var cljs$core$async$mix_$_state_machine__16091__auto____1 = (function (state_17908){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_17908);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e17968){if((e17968 instanceof Object)){
var ex__16094__auto__ = e17968;
var statearr_17969_18020 = state_17908;
(statearr_17969_18020[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_17908);

return cljs.core.cst$kw$recur;
} else {
throw e17968;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__18021 = state_17908;
state_17908 = G__18021;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__16091__auto__ = function(state_17908){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__16091__auto____1.call(this,state_17908);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__16091__auto____0;
cljs$core$async$mix_$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__16091__auto____1;
return cljs$core$async$mix_$_state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___17973,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__16208__auto__ = (function (){var statearr_17970 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_17970[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___17973);

return statearr_17970;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___17973,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
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
var args18022 = [];
var len__8202__auto___18025 = arguments.length;
var i__8203__auto___18026 = (0);
while(true){
if((i__8203__auto___18026 < len__8202__auto___18025)){
args18022.push((arguments[i__8203__auto___18026]));

var G__18027 = (i__8203__auto___18026 + (1));
i__8203__auto___18026 = G__18027;
continue;
} else {
}
break;
}

var G__18024 = args18022.length;
switch (G__18024) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18022.length)].join('')));

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
var args18030 = [];
var len__8202__auto___18158 = arguments.length;
var i__8203__auto___18159 = (0);
while(true){
if((i__8203__auto___18159 < len__8202__auto___18158)){
args18030.push((arguments[i__8203__auto___18159]));

var G__18160 = (i__8203__auto___18159 + (1));
i__8203__auto___18159 = G__18160;
continue;
} else {
}
break;
}

var G__18032 = args18030.length;
switch (G__18032) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18030.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = (function (){var G__18033 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__18033) : cljs.core.atom.call(null,G__18033));
})();
var ensure_mult = ((function (mults){
return (function (topic){
var or__7019__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mults) : cljs.core.deref.call(null,mults)),topic);
if(cljs.core.truth_(or__7019__auto__)){
return or__7019__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,((function (or__7019__auto__,mults){
return (function (p1__18029_SHARP_){
if(cljs.core.truth_((p1__18029_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__18029_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__18029_SHARP_.call(null,topic)))){
return p1__18029_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__18029_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
});})(or__7019__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async18034 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18034 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta18035){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta18035 = meta18035;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_18036,meta18035__$1){
var self__ = this;
var _18036__$1 = this;
return (new cljs.core.async.t_cljs$core$async18034(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta18035__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_18036){
var self__ = this;
var _18036__$1 = this;
return self__.meta18035;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
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

cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
var G__18037 = self__.mults;
var G__18038 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__18037,G__18038) : cljs.core.reset_BANG_.call(null,G__18037,G__18038));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18034.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$ch,cljs.core.cst$sym$topic_DASH_fn,cljs.core.cst$sym$buf_DASH_fn,cljs.core.cst$sym$mults,cljs.core.cst$sym$ensure_DASH_mult,cljs.core.cst$sym$meta18035], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async18034.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18034.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18034";

cljs.core.async.t_cljs$core$async18034.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async18034");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async18034 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async18034(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta18035){
return (new cljs.core.async.t_cljs$core$async18034(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta18035));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async18034(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__16206__auto___18162 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___18162,mults,ensure_mult,p){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___18162,mults,ensure_mult,p){
return (function (state_18110){
var state_val_18111 = (state_18110[(1)]);
if((state_val_18111 === (7))){
var inst_18106 = (state_18110[(2)]);
var state_18110__$1 = state_18110;
var statearr_18112_18163 = state_18110__$1;
(statearr_18112_18163[(2)] = inst_18106);

(statearr_18112_18163[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (20))){
var state_18110__$1 = state_18110;
var statearr_18113_18164 = state_18110__$1;
(statearr_18113_18164[(2)] = null);

(statearr_18113_18164[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (1))){
var state_18110__$1 = state_18110;
var statearr_18114_18165 = state_18110__$1;
(statearr_18114_18165[(2)] = null);

(statearr_18114_18165[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (24))){
var inst_18089 = (state_18110[(7)]);
var inst_18098 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_18089);
var state_18110__$1 = state_18110;
var statearr_18115_18166 = state_18110__$1;
(statearr_18115_18166[(2)] = inst_18098);

(statearr_18115_18166[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (4))){
var inst_18041 = (state_18110[(8)]);
var inst_18041__$1 = (state_18110[(2)]);
var inst_18042 = (inst_18041__$1 == null);
var state_18110__$1 = (function (){var statearr_18116 = state_18110;
(statearr_18116[(8)] = inst_18041__$1);

return statearr_18116;
})();
if(cljs.core.truth_(inst_18042)){
var statearr_18117_18167 = state_18110__$1;
(statearr_18117_18167[(1)] = (5));

} else {
var statearr_18118_18168 = state_18110__$1;
(statearr_18118_18168[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (15))){
var inst_18083 = (state_18110[(2)]);
var state_18110__$1 = state_18110;
var statearr_18119_18169 = state_18110__$1;
(statearr_18119_18169[(2)] = inst_18083);

(statearr_18119_18169[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (21))){
var inst_18103 = (state_18110[(2)]);
var state_18110__$1 = (function (){var statearr_18120 = state_18110;
(statearr_18120[(9)] = inst_18103);

return statearr_18120;
})();
var statearr_18121_18170 = state_18110__$1;
(statearr_18121_18170[(2)] = null);

(statearr_18121_18170[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (13))){
var inst_18065 = (state_18110[(10)]);
var inst_18067 = cljs.core.chunked_seq_QMARK_(inst_18065);
var state_18110__$1 = state_18110;
if(inst_18067){
var statearr_18122_18171 = state_18110__$1;
(statearr_18122_18171[(1)] = (16));

} else {
var statearr_18123_18172 = state_18110__$1;
(statearr_18123_18172[(1)] = (17));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (22))){
var inst_18095 = (state_18110[(2)]);
var state_18110__$1 = state_18110;
if(cljs.core.truth_(inst_18095)){
var statearr_18124_18173 = state_18110__$1;
(statearr_18124_18173[(1)] = (23));

} else {
var statearr_18125_18174 = state_18110__$1;
(statearr_18125_18174[(1)] = (24));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (6))){
var inst_18091 = (state_18110[(11)]);
var inst_18089 = (state_18110[(7)]);
var inst_18041 = (state_18110[(8)]);
var inst_18089__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_18041) : topic_fn.call(null,inst_18041));
var inst_18090 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mults) : cljs.core.deref.call(null,mults));
var inst_18091__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_18090,inst_18089__$1);
var state_18110__$1 = (function (){var statearr_18126 = state_18110;
(statearr_18126[(11)] = inst_18091__$1);

(statearr_18126[(7)] = inst_18089__$1);

return statearr_18126;
})();
if(cljs.core.truth_(inst_18091__$1)){
var statearr_18127_18175 = state_18110__$1;
(statearr_18127_18175[(1)] = (19));

} else {
var statearr_18128_18176 = state_18110__$1;
(statearr_18128_18176[(1)] = (20));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (25))){
var inst_18100 = (state_18110[(2)]);
var state_18110__$1 = state_18110;
var statearr_18129_18177 = state_18110__$1;
(statearr_18129_18177[(2)] = inst_18100);

(statearr_18129_18177[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (17))){
var inst_18065 = (state_18110[(10)]);
var inst_18074 = cljs.core.first(inst_18065);
var inst_18075 = cljs.core.async.muxch_STAR_(inst_18074);
var inst_18076 = cljs.core.async.close_BANG_(inst_18075);
var inst_18077 = cljs.core.next(inst_18065);
var inst_18051 = inst_18077;
var inst_18052 = null;
var inst_18053 = (0);
var inst_18054 = (0);
var state_18110__$1 = (function (){var statearr_18130 = state_18110;
(statearr_18130[(12)] = inst_18054);

(statearr_18130[(13)] = inst_18053);

(statearr_18130[(14)] = inst_18051);

(statearr_18130[(15)] = inst_18076);

(statearr_18130[(16)] = inst_18052);

return statearr_18130;
})();
var statearr_18131_18178 = state_18110__$1;
(statearr_18131_18178[(2)] = null);

(statearr_18131_18178[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (3))){
var inst_18108 = (state_18110[(2)]);
var state_18110__$1 = state_18110;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18110__$1,inst_18108);
} else {
if((state_val_18111 === (12))){
var inst_18085 = (state_18110[(2)]);
var state_18110__$1 = state_18110;
var statearr_18132_18179 = state_18110__$1;
(statearr_18132_18179[(2)] = inst_18085);

(statearr_18132_18179[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (2))){
var state_18110__$1 = state_18110;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18110__$1,(4),ch);
} else {
if((state_val_18111 === (23))){
var state_18110__$1 = state_18110;
var statearr_18133_18180 = state_18110__$1;
(statearr_18133_18180[(2)] = null);

(statearr_18133_18180[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (19))){
var inst_18091 = (state_18110[(11)]);
var inst_18041 = (state_18110[(8)]);
var inst_18093 = cljs.core.async.muxch_STAR_(inst_18091);
var state_18110__$1 = state_18110;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18110__$1,(22),inst_18093,inst_18041);
} else {
if((state_val_18111 === (11))){
var inst_18051 = (state_18110[(14)]);
var inst_18065 = (state_18110[(10)]);
var inst_18065__$1 = cljs.core.seq(inst_18051);
var state_18110__$1 = (function (){var statearr_18134 = state_18110;
(statearr_18134[(10)] = inst_18065__$1);

return statearr_18134;
})();
if(inst_18065__$1){
var statearr_18135_18181 = state_18110__$1;
(statearr_18135_18181[(1)] = (13));

} else {
var statearr_18136_18182 = state_18110__$1;
(statearr_18136_18182[(1)] = (14));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (9))){
var inst_18087 = (state_18110[(2)]);
var state_18110__$1 = state_18110;
var statearr_18137_18183 = state_18110__$1;
(statearr_18137_18183[(2)] = inst_18087);

(statearr_18137_18183[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (5))){
var inst_18048 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mults) : cljs.core.deref.call(null,mults));
var inst_18049 = cljs.core.vals(inst_18048);
var inst_18050 = cljs.core.seq(inst_18049);
var inst_18051 = inst_18050;
var inst_18052 = null;
var inst_18053 = (0);
var inst_18054 = (0);
var state_18110__$1 = (function (){var statearr_18138 = state_18110;
(statearr_18138[(12)] = inst_18054);

(statearr_18138[(13)] = inst_18053);

(statearr_18138[(14)] = inst_18051);

(statearr_18138[(16)] = inst_18052);

return statearr_18138;
})();
var statearr_18139_18184 = state_18110__$1;
(statearr_18139_18184[(2)] = null);

(statearr_18139_18184[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (14))){
var state_18110__$1 = state_18110;
var statearr_18143_18185 = state_18110__$1;
(statearr_18143_18185[(2)] = null);

(statearr_18143_18185[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (16))){
var inst_18065 = (state_18110[(10)]);
var inst_18069 = cljs.core.chunk_first(inst_18065);
var inst_18070 = cljs.core.chunk_rest(inst_18065);
var inst_18071 = cljs.core.count(inst_18069);
var inst_18051 = inst_18070;
var inst_18052 = inst_18069;
var inst_18053 = inst_18071;
var inst_18054 = (0);
var state_18110__$1 = (function (){var statearr_18144 = state_18110;
(statearr_18144[(12)] = inst_18054);

(statearr_18144[(13)] = inst_18053);

(statearr_18144[(14)] = inst_18051);

(statearr_18144[(16)] = inst_18052);

return statearr_18144;
})();
var statearr_18145_18186 = state_18110__$1;
(statearr_18145_18186[(2)] = null);

(statearr_18145_18186[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (10))){
var inst_18054 = (state_18110[(12)]);
var inst_18053 = (state_18110[(13)]);
var inst_18051 = (state_18110[(14)]);
var inst_18052 = (state_18110[(16)]);
var inst_18059 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_18052,inst_18054);
var inst_18060 = cljs.core.async.muxch_STAR_(inst_18059);
var inst_18061 = cljs.core.async.close_BANG_(inst_18060);
var inst_18062 = (inst_18054 + (1));
var tmp18140 = inst_18053;
var tmp18141 = inst_18051;
var tmp18142 = inst_18052;
var inst_18051__$1 = tmp18141;
var inst_18052__$1 = tmp18142;
var inst_18053__$1 = tmp18140;
var inst_18054__$1 = inst_18062;
var state_18110__$1 = (function (){var statearr_18146 = state_18110;
(statearr_18146[(12)] = inst_18054__$1);

(statearr_18146[(13)] = inst_18053__$1);

(statearr_18146[(14)] = inst_18051__$1);

(statearr_18146[(16)] = inst_18052__$1);

(statearr_18146[(17)] = inst_18061);

return statearr_18146;
})();
var statearr_18147_18187 = state_18110__$1;
(statearr_18147_18187[(2)] = null);

(statearr_18147_18187[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (18))){
var inst_18080 = (state_18110[(2)]);
var state_18110__$1 = state_18110;
var statearr_18148_18188 = state_18110__$1;
(statearr_18148_18188[(2)] = inst_18080);

(statearr_18148_18188[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18111 === (8))){
var inst_18054 = (state_18110[(12)]);
var inst_18053 = (state_18110[(13)]);
var inst_18056 = (inst_18054 < inst_18053);
var inst_18057 = inst_18056;
var state_18110__$1 = state_18110;
if(cljs.core.truth_(inst_18057)){
var statearr_18149_18189 = state_18110__$1;
(statearr_18149_18189[(1)] = (10));

} else {
var statearr_18150_18190 = state_18110__$1;
(statearr_18150_18190[(1)] = (11));

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
});})(c__16206__auto___18162,mults,ensure_mult,p))
;
return ((function (switch__16090__auto__,c__16206__auto___18162,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__16091__auto__ = null;
var cljs$core$async$state_machine__16091__auto____0 = (function (){
var statearr_18154 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18154[(0)] = cljs$core$async$state_machine__16091__auto__);

(statearr_18154[(1)] = (1));

return statearr_18154;
});
var cljs$core$async$state_machine__16091__auto____1 = (function (state_18110){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_18110);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e18155){if((e18155 instanceof Object)){
var ex__16094__auto__ = e18155;
var statearr_18156_18191 = state_18110;
(statearr_18156_18191[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18110);

return cljs.core.cst$kw$recur;
} else {
throw e18155;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__18192 = state_18110;
state_18110 = G__18192;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$state_machine__16091__auto__ = function(state_18110){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16091__auto____1.call(this,state_18110);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16091__auto____0;
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16091__auto____1;
return cljs$core$async$state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___18162,mults,ensure_mult,p))
})();
var state__16208__auto__ = (function (){var statearr_18157 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_18157[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___18162);

return statearr_18157;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___18162,mults,ensure_mult,p))
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
var args18193 = [];
var len__8202__auto___18196 = arguments.length;
var i__8203__auto___18197 = (0);
while(true){
if((i__8203__auto___18197 < len__8202__auto___18196)){
args18193.push((arguments[i__8203__auto___18197]));

var G__18198 = (i__8203__auto___18197 + (1));
i__8203__auto___18197 = G__18198;
continue;
} else {
}
break;
}

var G__18195 = args18193.length;
switch (G__18195) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18193.length)].join('')));

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
var args18200 = [];
var len__8202__auto___18203 = arguments.length;
var i__8203__auto___18204 = (0);
while(true){
if((i__8203__auto___18204 < len__8202__auto___18203)){
args18200.push((arguments[i__8203__auto___18204]));

var G__18205 = (i__8203__auto___18204 + (1));
i__8203__auto___18204 = G__18205;
continue;
} else {
}
break;
}

var G__18202 = args18200.length;
switch (G__18202) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18200.length)].join('')));

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
var args18207 = [];
var len__8202__auto___18278 = arguments.length;
var i__8203__auto___18279 = (0);
while(true){
if((i__8203__auto___18279 < len__8202__auto___18278)){
args18207.push((arguments[i__8203__auto___18279]));

var G__18280 = (i__8203__auto___18279 + (1));
i__8203__auto___18279 = G__18280;
continue;
} else {
}
break;
}

var G__18209 = args18207.length;
switch (G__18209) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18207.length)].join('')));

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
var c__16206__auto___18282 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___18282,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___18282,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_18248){
var state_val_18249 = (state_18248[(1)]);
if((state_val_18249 === (7))){
var state_18248__$1 = state_18248;
var statearr_18250_18283 = state_18248__$1;
(statearr_18250_18283[(2)] = null);

(statearr_18250_18283[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18249 === (1))){
var state_18248__$1 = state_18248;
var statearr_18251_18284 = state_18248__$1;
(statearr_18251_18284[(2)] = null);

(statearr_18251_18284[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18249 === (4))){
var inst_18212 = (state_18248[(7)]);
var inst_18214 = (inst_18212 < cnt);
var state_18248__$1 = state_18248;
if(cljs.core.truth_(inst_18214)){
var statearr_18252_18285 = state_18248__$1;
(statearr_18252_18285[(1)] = (6));

} else {
var statearr_18253_18286 = state_18248__$1;
(statearr_18253_18286[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18249 === (15))){
var inst_18244 = (state_18248[(2)]);
var state_18248__$1 = state_18248;
var statearr_18254_18287 = state_18248__$1;
(statearr_18254_18287[(2)] = inst_18244);

(statearr_18254_18287[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18249 === (13))){
var inst_18237 = cljs.core.async.close_BANG_(out);
var state_18248__$1 = state_18248;
var statearr_18255_18288 = state_18248__$1;
(statearr_18255_18288[(2)] = inst_18237);

(statearr_18255_18288[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18249 === (6))){
var state_18248__$1 = state_18248;
var statearr_18256_18289 = state_18248__$1;
(statearr_18256_18289[(2)] = null);

(statearr_18256_18289[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18249 === (3))){
var inst_18246 = (state_18248[(2)]);
var state_18248__$1 = state_18248;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18248__$1,inst_18246);
} else {
if((state_val_18249 === (12))){
var inst_18234 = (state_18248[(8)]);
var inst_18234__$1 = (state_18248[(2)]);
var inst_18235 = cljs.core.some(cljs.core.nil_QMARK_,inst_18234__$1);
var state_18248__$1 = (function (){var statearr_18257 = state_18248;
(statearr_18257[(8)] = inst_18234__$1);

return statearr_18257;
})();
if(cljs.core.truth_(inst_18235)){
var statearr_18258_18290 = state_18248__$1;
(statearr_18258_18290[(1)] = (13));

} else {
var statearr_18259_18291 = state_18248__$1;
(statearr_18259_18291[(1)] = (14));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18249 === (2))){
var inst_18211 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cnt) : cljs.core.reset_BANG_.call(null,dctr,cnt));
var inst_18212 = (0);
var state_18248__$1 = (function (){var statearr_18260 = state_18248;
(statearr_18260[(9)] = inst_18211);

(statearr_18260[(7)] = inst_18212);

return statearr_18260;
})();
var statearr_18261_18292 = state_18248__$1;
(statearr_18261_18292[(2)] = null);

(statearr_18261_18292[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18249 === (11))){
var inst_18212 = (state_18248[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame(state_18248,(10),Object,null,(9));
var inst_18221 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_18212) : chs__$1.call(null,inst_18212));
var inst_18222 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_18212) : done.call(null,inst_18212));
var inst_18223 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_18221,inst_18222);
var state_18248__$1 = state_18248;
var statearr_18262_18293 = state_18248__$1;
(statearr_18262_18293[(2)] = inst_18223);


cljs.core.async.impl.ioc_helpers.process_exception(state_18248__$1);

return cljs.core.cst$kw$recur;
} else {
if((state_val_18249 === (9))){
var inst_18212 = (state_18248[(7)]);
var inst_18225 = (state_18248[(2)]);
var inst_18226 = (inst_18212 + (1));
var inst_18212__$1 = inst_18226;
var state_18248__$1 = (function (){var statearr_18263 = state_18248;
(statearr_18263[(7)] = inst_18212__$1);

(statearr_18263[(10)] = inst_18225);

return statearr_18263;
})();
var statearr_18264_18294 = state_18248__$1;
(statearr_18264_18294[(2)] = null);

(statearr_18264_18294[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18249 === (5))){
var inst_18232 = (state_18248[(2)]);
var state_18248__$1 = (function (){var statearr_18265 = state_18248;
(statearr_18265[(11)] = inst_18232);

return statearr_18265;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18248__$1,(12),dchan);
} else {
if((state_val_18249 === (14))){
var inst_18234 = (state_18248[(8)]);
var inst_18239 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_18234);
var state_18248__$1 = state_18248;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18248__$1,(16),out,inst_18239);
} else {
if((state_val_18249 === (16))){
var inst_18241 = (state_18248[(2)]);
var state_18248__$1 = (function (){var statearr_18266 = state_18248;
(statearr_18266[(12)] = inst_18241);

return statearr_18266;
})();
var statearr_18267_18295 = state_18248__$1;
(statearr_18267_18295[(2)] = null);

(statearr_18267_18295[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18249 === (10))){
var inst_18216 = (state_18248[(2)]);
var inst_18217 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_18248__$1 = (function (){var statearr_18268 = state_18248;
(statearr_18268[(13)] = inst_18216);

return statearr_18268;
})();
var statearr_18269_18296 = state_18248__$1;
(statearr_18269_18296[(2)] = inst_18217);


cljs.core.async.impl.ioc_helpers.process_exception(state_18248__$1);

return cljs.core.cst$kw$recur;
} else {
if((state_val_18249 === (8))){
var inst_18230 = (state_18248[(2)]);
var state_18248__$1 = state_18248;
var statearr_18270_18297 = state_18248__$1;
(statearr_18270_18297[(2)] = inst_18230);

(statearr_18270_18297[(1)] = (5));


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
});})(c__16206__auto___18282,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__16090__auto__,c__16206__auto___18282,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__16091__auto__ = null;
var cljs$core$async$state_machine__16091__auto____0 = (function (){
var statearr_18274 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18274[(0)] = cljs$core$async$state_machine__16091__auto__);

(statearr_18274[(1)] = (1));

return statearr_18274;
});
var cljs$core$async$state_machine__16091__auto____1 = (function (state_18248){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_18248);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e18275){if((e18275 instanceof Object)){
var ex__16094__auto__ = e18275;
var statearr_18276_18298 = state_18248;
(statearr_18276_18298[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18248);

return cljs.core.cst$kw$recur;
} else {
throw e18275;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__18299 = state_18248;
state_18248 = G__18299;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$state_machine__16091__auto__ = function(state_18248){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16091__auto____1.call(this,state_18248);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16091__auto____0;
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16091__auto____1;
return cljs$core$async$state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___18282,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__16208__auto__ = (function (){var statearr_18277 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_18277[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___18282);

return statearr_18277;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___18282,chs__$1,out,cnt,rets,dchan,dctr,done))
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
var args18301 = [];
var len__8202__auto___18359 = arguments.length;
var i__8203__auto___18360 = (0);
while(true){
if((i__8203__auto___18360 < len__8202__auto___18359)){
args18301.push((arguments[i__8203__auto___18360]));

var G__18361 = (i__8203__auto___18360 + (1));
i__8203__auto___18360 = G__18361;
continue;
} else {
}
break;
}

var G__18303 = args18301.length;
switch (G__18303) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18301.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16206__auto___18363 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___18363,out){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___18363,out){
return (function (state_18335){
var state_val_18336 = (state_18335[(1)]);
if((state_val_18336 === (7))){
var inst_18315 = (state_18335[(7)]);
var inst_18314 = (state_18335[(8)]);
var inst_18314__$1 = (state_18335[(2)]);
var inst_18315__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_18314__$1,(0),null);
var inst_18316 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_18314__$1,(1),null);
var inst_18317 = (inst_18315__$1 == null);
var state_18335__$1 = (function (){var statearr_18337 = state_18335;
(statearr_18337[(7)] = inst_18315__$1);

(statearr_18337[(8)] = inst_18314__$1);

(statearr_18337[(9)] = inst_18316);

return statearr_18337;
})();
if(cljs.core.truth_(inst_18317)){
var statearr_18338_18364 = state_18335__$1;
(statearr_18338_18364[(1)] = (8));

} else {
var statearr_18339_18365 = state_18335__$1;
(statearr_18339_18365[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18336 === (1))){
var inst_18304 = cljs.core.vec(chs);
var inst_18305 = inst_18304;
var state_18335__$1 = (function (){var statearr_18340 = state_18335;
(statearr_18340[(10)] = inst_18305);

return statearr_18340;
})();
var statearr_18341_18366 = state_18335__$1;
(statearr_18341_18366[(2)] = null);

(statearr_18341_18366[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18336 === (4))){
var inst_18305 = (state_18335[(10)]);
var state_18335__$1 = state_18335;
return cljs.core.async.ioc_alts_BANG_(state_18335__$1,(7),inst_18305);
} else {
if((state_val_18336 === (6))){
var inst_18331 = (state_18335[(2)]);
var state_18335__$1 = state_18335;
var statearr_18342_18367 = state_18335__$1;
(statearr_18342_18367[(2)] = inst_18331);

(statearr_18342_18367[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18336 === (3))){
var inst_18333 = (state_18335[(2)]);
var state_18335__$1 = state_18335;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18335__$1,inst_18333);
} else {
if((state_val_18336 === (2))){
var inst_18305 = (state_18335[(10)]);
var inst_18307 = cljs.core.count(inst_18305);
var inst_18308 = (inst_18307 > (0));
var state_18335__$1 = state_18335;
if(cljs.core.truth_(inst_18308)){
var statearr_18344_18368 = state_18335__$1;
(statearr_18344_18368[(1)] = (4));

} else {
var statearr_18345_18369 = state_18335__$1;
(statearr_18345_18369[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18336 === (11))){
var inst_18305 = (state_18335[(10)]);
var inst_18324 = (state_18335[(2)]);
var tmp18343 = inst_18305;
var inst_18305__$1 = tmp18343;
var state_18335__$1 = (function (){var statearr_18346 = state_18335;
(statearr_18346[(10)] = inst_18305__$1);

(statearr_18346[(11)] = inst_18324);

return statearr_18346;
})();
var statearr_18347_18370 = state_18335__$1;
(statearr_18347_18370[(2)] = null);

(statearr_18347_18370[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18336 === (9))){
var inst_18315 = (state_18335[(7)]);
var state_18335__$1 = state_18335;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18335__$1,(11),out,inst_18315);
} else {
if((state_val_18336 === (5))){
var inst_18329 = cljs.core.async.close_BANG_(out);
var state_18335__$1 = state_18335;
var statearr_18348_18371 = state_18335__$1;
(statearr_18348_18371[(2)] = inst_18329);

(statearr_18348_18371[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18336 === (10))){
var inst_18327 = (state_18335[(2)]);
var state_18335__$1 = state_18335;
var statearr_18349_18372 = state_18335__$1;
(statearr_18349_18372[(2)] = inst_18327);

(statearr_18349_18372[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18336 === (8))){
var inst_18315 = (state_18335[(7)]);
var inst_18305 = (state_18335[(10)]);
var inst_18314 = (state_18335[(8)]);
var inst_18316 = (state_18335[(9)]);
var inst_18319 = (function (){var cs = inst_18305;
var vec__18310 = inst_18314;
var v = inst_18315;
var c = inst_18316;
return ((function (cs,vec__18310,v,c,inst_18315,inst_18305,inst_18314,inst_18316,state_val_18336,c__16206__auto___18363,out){
return (function (p1__18300_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__18300_SHARP_);
});
;})(cs,vec__18310,v,c,inst_18315,inst_18305,inst_18314,inst_18316,state_val_18336,c__16206__auto___18363,out))
})();
var inst_18320 = cljs.core.filterv(inst_18319,inst_18305);
var inst_18305__$1 = inst_18320;
var state_18335__$1 = (function (){var statearr_18350 = state_18335;
(statearr_18350[(10)] = inst_18305__$1);

return statearr_18350;
})();
var statearr_18351_18373 = state_18335__$1;
(statearr_18351_18373[(2)] = null);

(statearr_18351_18373[(1)] = (2));


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
});})(c__16206__auto___18363,out))
;
return ((function (switch__16090__auto__,c__16206__auto___18363,out){
return (function() {
var cljs$core$async$state_machine__16091__auto__ = null;
var cljs$core$async$state_machine__16091__auto____0 = (function (){
var statearr_18355 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18355[(0)] = cljs$core$async$state_machine__16091__auto__);

(statearr_18355[(1)] = (1));

return statearr_18355;
});
var cljs$core$async$state_machine__16091__auto____1 = (function (state_18335){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_18335);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e18356){if((e18356 instanceof Object)){
var ex__16094__auto__ = e18356;
var statearr_18357_18374 = state_18335;
(statearr_18357_18374[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18335);

return cljs.core.cst$kw$recur;
} else {
throw e18356;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__18375 = state_18335;
state_18335 = G__18375;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$state_machine__16091__auto__ = function(state_18335){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16091__auto____1.call(this,state_18335);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16091__auto____0;
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16091__auto____1;
return cljs$core$async$state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___18363,out))
})();
var state__16208__auto__ = (function (){var statearr_18358 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_18358[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___18363);

return statearr_18358;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___18363,out))
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
var args18376 = [];
var len__8202__auto___18425 = arguments.length;
var i__8203__auto___18426 = (0);
while(true){
if((i__8203__auto___18426 < len__8202__auto___18425)){
args18376.push((arguments[i__8203__auto___18426]));

var G__18427 = (i__8203__auto___18426 + (1));
i__8203__auto___18426 = G__18427;
continue;
} else {
}
break;
}

var G__18378 = args18376.length;
switch (G__18378) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18376.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16206__auto___18429 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___18429,out){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___18429,out){
return (function (state_18402){
var state_val_18403 = (state_18402[(1)]);
if((state_val_18403 === (7))){
var inst_18384 = (state_18402[(7)]);
var inst_18384__$1 = (state_18402[(2)]);
var inst_18385 = (inst_18384__$1 == null);
var inst_18386 = cljs.core.not(inst_18385);
var state_18402__$1 = (function (){var statearr_18404 = state_18402;
(statearr_18404[(7)] = inst_18384__$1);

return statearr_18404;
})();
if(inst_18386){
var statearr_18405_18430 = state_18402__$1;
(statearr_18405_18430[(1)] = (8));

} else {
var statearr_18406_18431 = state_18402__$1;
(statearr_18406_18431[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18403 === (1))){
var inst_18379 = (0);
var state_18402__$1 = (function (){var statearr_18407 = state_18402;
(statearr_18407[(8)] = inst_18379);

return statearr_18407;
})();
var statearr_18408_18432 = state_18402__$1;
(statearr_18408_18432[(2)] = null);

(statearr_18408_18432[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18403 === (4))){
var state_18402__$1 = state_18402;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18402__$1,(7),ch);
} else {
if((state_val_18403 === (6))){
var inst_18397 = (state_18402[(2)]);
var state_18402__$1 = state_18402;
var statearr_18409_18433 = state_18402__$1;
(statearr_18409_18433[(2)] = inst_18397);

(statearr_18409_18433[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18403 === (3))){
var inst_18399 = (state_18402[(2)]);
var inst_18400 = cljs.core.async.close_BANG_(out);
var state_18402__$1 = (function (){var statearr_18410 = state_18402;
(statearr_18410[(9)] = inst_18399);

return statearr_18410;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_18402__$1,inst_18400);
} else {
if((state_val_18403 === (2))){
var inst_18379 = (state_18402[(8)]);
var inst_18381 = (inst_18379 < n);
var state_18402__$1 = state_18402;
if(cljs.core.truth_(inst_18381)){
var statearr_18411_18434 = state_18402__$1;
(statearr_18411_18434[(1)] = (4));

} else {
var statearr_18412_18435 = state_18402__$1;
(statearr_18412_18435[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18403 === (11))){
var inst_18379 = (state_18402[(8)]);
var inst_18389 = (state_18402[(2)]);
var inst_18390 = (inst_18379 + (1));
var inst_18379__$1 = inst_18390;
var state_18402__$1 = (function (){var statearr_18413 = state_18402;
(statearr_18413[(10)] = inst_18389);

(statearr_18413[(8)] = inst_18379__$1);

return statearr_18413;
})();
var statearr_18414_18436 = state_18402__$1;
(statearr_18414_18436[(2)] = null);

(statearr_18414_18436[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18403 === (9))){
var state_18402__$1 = state_18402;
var statearr_18415_18437 = state_18402__$1;
(statearr_18415_18437[(2)] = null);

(statearr_18415_18437[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18403 === (5))){
var state_18402__$1 = state_18402;
var statearr_18416_18438 = state_18402__$1;
(statearr_18416_18438[(2)] = null);

(statearr_18416_18438[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18403 === (10))){
var inst_18394 = (state_18402[(2)]);
var state_18402__$1 = state_18402;
var statearr_18417_18439 = state_18402__$1;
(statearr_18417_18439[(2)] = inst_18394);

(statearr_18417_18439[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18403 === (8))){
var inst_18384 = (state_18402[(7)]);
var state_18402__$1 = state_18402;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18402__$1,(11),out,inst_18384);
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
});})(c__16206__auto___18429,out))
;
return ((function (switch__16090__auto__,c__16206__auto___18429,out){
return (function() {
var cljs$core$async$state_machine__16091__auto__ = null;
var cljs$core$async$state_machine__16091__auto____0 = (function (){
var statearr_18421 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_18421[(0)] = cljs$core$async$state_machine__16091__auto__);

(statearr_18421[(1)] = (1));

return statearr_18421;
});
var cljs$core$async$state_machine__16091__auto____1 = (function (state_18402){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_18402);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e18422){if((e18422 instanceof Object)){
var ex__16094__auto__ = e18422;
var statearr_18423_18440 = state_18402;
(statearr_18423_18440[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18402);

return cljs.core.cst$kw$recur;
} else {
throw e18422;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__18441 = state_18402;
state_18402 = G__18441;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$state_machine__16091__auto__ = function(state_18402){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16091__auto____1.call(this,state_18402);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16091__auto____0;
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16091__auto____1;
return cljs$core$async$state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___18429,out))
})();
var state__16208__auto__ = (function (){var statearr_18424 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_18424[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___18429);

return statearr_18424;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___18429,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async18451 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18451 = (function (map_LT_,f,ch,meta18452){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta18452 = meta18452;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18451.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18453,meta18452__$1){
var self__ = this;
var _18453__$1 = this;
return (new cljs.core.async.t_cljs$core$async18451(self__.map_LT_,self__.f,self__.ch,meta18452__$1));
});

cljs.core.async.t_cljs$core$async18451.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18453){
var self__ = this;
var _18453__$1 = this;
return self__.meta18452;
});

cljs.core.async.t_cljs$core$async18451.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async18451.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});

cljs.core.async.t_cljs$core$async18451.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
});

cljs.core.async.t_cljs$core$async18451.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async18451.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async18454 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18454 = (function (map_LT_,f,ch,meta18452,_,fn1,meta18455){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta18452 = meta18452;
this._ = _;
this.fn1 = fn1;
this.meta18455 = meta18455;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18454.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_18456,meta18455__$1){
var self__ = this;
var _18456__$1 = this;
return (new cljs.core.async.t_cljs$core$async18454(self__.map_LT_,self__.f,self__.ch,self__.meta18452,self__._,self__.fn1,meta18455__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async18454.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_18456){
var self__ = this;
var _18456__$1 = this;
return self__.meta18455;
});})(___$1))
;

cljs.core.async.t_cljs$core$async18454.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async18454.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async18454.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
});})(___$1))
;

cljs.core.async.t_cljs$core$async18454.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__18442_SHARP_){
var G__18457 = (((p1__18442_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__18442_SHARP_) : self__.f.call(null,p1__18442_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__18457) : f1.call(null,G__18457));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async18454.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$map_LT_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$f,cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Deprecated - this function will be removed. Use transducer instead"], null)),cljs.core.cst$sym$f,cljs.core.cst$sym$ch,cljs.core.cst$sym$meta18452,cljs.core.with_meta(cljs.core.cst$sym$_,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$sym$cljs$core$async_SLASH_t_cljs$core$async18451], null)),cljs.core.cst$sym$fn1,cljs.core.cst$sym$meta18455], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async18454.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18454.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18454";

cljs.core.async.t_cljs$core$async18454.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async18454");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async18454 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async18454(map_LT___$1,f__$1,ch__$1,meta18452__$1,___$2,fn1__$1,meta18455){
return (new cljs.core.async.t_cljs$core$async18454(map_LT___$1,f__$1,ch__$1,meta18452__$1,___$2,fn1__$1,meta18455));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async18454(self__.map_LT_,self__.f,self__.ch,self__.meta18452,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__7007__auto__ = ret;
if(cljs.core.truth_(and__7007__auto__)){
return !(((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret)) == null));
} else {
return and__7007__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__18458 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__18458) : self__.f.call(null,G__18458));
})());
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async18451.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async18451.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async18451.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$map_LT_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$f,cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Deprecated - this function will be removed. Use transducer instead"], null)),cljs.core.cst$sym$f,cljs.core.cst$sym$ch,cljs.core.cst$sym$meta18452], null);
});

cljs.core.async.t_cljs$core$async18451.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18451.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18451";

cljs.core.async.t_cljs$core$async18451.cljs$lang$ctorPrWriter = (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async18451");
});

cljs.core.async.__GT_t_cljs$core$async18451 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async18451(map_LT___$1,f__$1,ch__$1,meta18452){
return (new cljs.core.async.t_cljs$core$async18451(map_LT___$1,f__$1,ch__$1,meta18452));
});

}

return (new cljs.core.async.t_cljs$core$async18451(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async18462 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18462 = (function (map_GT_,f,ch,meta18463){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta18463 = meta18463;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18462.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18464,meta18463__$1){
var self__ = this;
var _18464__$1 = this;
return (new cljs.core.async.t_cljs$core$async18462(self__.map_GT_,self__.f,self__.ch,meta18463__$1));
});

cljs.core.async.t_cljs$core$async18462.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18464){
var self__ = this;
var _18464__$1 = this;
return self__.meta18463;
});

cljs.core.async.t_cljs$core$async18462.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async18462.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});

cljs.core.async.t_cljs$core$async18462.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async18462.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async18462.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async18462.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
});

cljs.core.async.t_cljs$core$async18462.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$map_GT_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$f,cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Deprecated - this function will be removed. Use transducer instead"], null)),cljs.core.cst$sym$f,cljs.core.cst$sym$ch,cljs.core.cst$sym$meta18463], null);
});

cljs.core.async.t_cljs$core$async18462.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18462.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18462";

cljs.core.async.t_cljs$core$async18462.cljs$lang$ctorPrWriter = (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async18462");
});

cljs.core.async.__GT_t_cljs$core$async18462 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async18462(map_GT___$1,f__$1,ch__$1,meta18463){
return (new cljs.core.async.t_cljs$core$async18462(map_GT___$1,f__$1,ch__$1,meta18463));
});

}

return (new cljs.core.async.t_cljs$core$async18462(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async18468 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18468 = (function (filter_GT_,p,ch,meta18469){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta18469 = meta18469;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18468.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18470,meta18469__$1){
var self__ = this;
var _18470__$1 = this;
return (new cljs.core.async.t_cljs$core$async18468(self__.filter_GT_,self__.p,self__.ch,meta18469__$1));
});

cljs.core.async.t_cljs$core$async18468.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18470){
var self__ = this;
var _18470__$1 = this;
return self__.meta18469;
});

cljs.core.async.t_cljs$core$async18468.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async18468.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});

cljs.core.async.t_cljs$core$async18468.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
});

cljs.core.async.t_cljs$core$async18468.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async18468.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async18468.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async18468.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
});

cljs.core.async.t_cljs$core$async18468.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$filter_GT_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p,cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Deprecated - this function will be removed. Use transducer instead"], null)),cljs.core.cst$sym$p,cljs.core.cst$sym$ch,cljs.core.cst$sym$meta18469], null);
});

cljs.core.async.t_cljs$core$async18468.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18468.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18468";

cljs.core.async.t_cljs$core$async18468.cljs$lang$ctorPrWriter = (function (this__7671__auto__,writer__7672__auto__,opt__7673__auto__){
return cljs.core._write(writer__7672__auto__,"cljs.core.async/t_cljs$core$async18468");
});

cljs.core.async.__GT_t_cljs$core$async18468 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async18468(filter_GT___$1,p__$1,ch__$1,meta18469){
return (new cljs.core.async.t_cljs$core$async18468(filter_GT___$1,p__$1,ch__$1,meta18469));
});

}

return (new cljs.core.async.t_cljs$core$async18468(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
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
var args18471 = [];
var len__8202__auto___18515 = arguments.length;
var i__8203__auto___18516 = (0);
while(true){
if((i__8203__auto___18516 < len__8202__auto___18515)){
args18471.push((arguments[i__8203__auto___18516]));

var G__18517 = (i__8203__auto___18516 + (1));
i__8203__auto___18516 = G__18517;
continue;
} else {
}
break;
}

var G__18473 = args18471.length;
switch (G__18473) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18471.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16206__auto___18519 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___18519,out){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___18519,out){
return (function (state_18494){
var state_val_18495 = (state_18494[(1)]);
if((state_val_18495 === (7))){
var inst_18490 = (state_18494[(2)]);
var state_18494__$1 = state_18494;
var statearr_18496_18520 = state_18494__$1;
(statearr_18496_18520[(2)] = inst_18490);

(statearr_18496_18520[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18495 === (1))){
var state_18494__$1 = state_18494;
var statearr_18497_18521 = state_18494__$1;
(statearr_18497_18521[(2)] = null);

(statearr_18497_18521[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18495 === (4))){
var inst_18476 = (state_18494[(7)]);
var inst_18476__$1 = (state_18494[(2)]);
var inst_18477 = (inst_18476__$1 == null);
var state_18494__$1 = (function (){var statearr_18498 = state_18494;
(statearr_18498[(7)] = inst_18476__$1);

return statearr_18498;
})();
if(cljs.core.truth_(inst_18477)){
var statearr_18499_18522 = state_18494__$1;
(statearr_18499_18522[(1)] = (5));

} else {
var statearr_18500_18523 = state_18494__$1;
(statearr_18500_18523[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18495 === (6))){
var inst_18476 = (state_18494[(7)]);
var inst_18481 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_18476) : p.call(null,inst_18476));
var state_18494__$1 = state_18494;
if(cljs.core.truth_(inst_18481)){
var statearr_18501_18524 = state_18494__$1;
(statearr_18501_18524[(1)] = (8));

} else {
var statearr_18502_18525 = state_18494__$1;
(statearr_18502_18525[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18495 === (3))){
var inst_18492 = (state_18494[(2)]);
var state_18494__$1 = state_18494;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18494__$1,inst_18492);
} else {
if((state_val_18495 === (2))){
var state_18494__$1 = state_18494;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18494__$1,(4),ch);
} else {
if((state_val_18495 === (11))){
var inst_18484 = (state_18494[(2)]);
var state_18494__$1 = state_18494;
var statearr_18503_18526 = state_18494__$1;
(statearr_18503_18526[(2)] = inst_18484);

(statearr_18503_18526[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18495 === (9))){
var state_18494__$1 = state_18494;
var statearr_18504_18527 = state_18494__$1;
(statearr_18504_18527[(2)] = null);

(statearr_18504_18527[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18495 === (5))){
var inst_18479 = cljs.core.async.close_BANG_(out);
var state_18494__$1 = state_18494;
var statearr_18505_18528 = state_18494__$1;
(statearr_18505_18528[(2)] = inst_18479);

(statearr_18505_18528[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18495 === (10))){
var inst_18487 = (state_18494[(2)]);
var state_18494__$1 = (function (){var statearr_18506 = state_18494;
(statearr_18506[(8)] = inst_18487);

return statearr_18506;
})();
var statearr_18507_18529 = state_18494__$1;
(statearr_18507_18529[(2)] = null);

(statearr_18507_18529[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18495 === (8))){
var inst_18476 = (state_18494[(7)]);
var state_18494__$1 = state_18494;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18494__$1,(11),out,inst_18476);
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
});})(c__16206__auto___18519,out))
;
return ((function (switch__16090__auto__,c__16206__auto___18519,out){
return (function() {
var cljs$core$async$state_machine__16091__auto__ = null;
var cljs$core$async$state_machine__16091__auto____0 = (function (){
var statearr_18511 = [null,null,null,null,null,null,null,null,null];
(statearr_18511[(0)] = cljs$core$async$state_machine__16091__auto__);

(statearr_18511[(1)] = (1));

return statearr_18511;
});
var cljs$core$async$state_machine__16091__auto____1 = (function (state_18494){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_18494);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e18512){if((e18512 instanceof Object)){
var ex__16094__auto__ = e18512;
var statearr_18513_18530 = state_18494;
(statearr_18513_18530[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18494);

return cljs.core.cst$kw$recur;
} else {
throw e18512;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__18531 = state_18494;
state_18494 = G__18531;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$state_machine__16091__auto__ = function(state_18494){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16091__auto____1.call(this,state_18494);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16091__auto____0;
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16091__auto____1;
return cljs$core$async$state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___18519,out))
})();
var state__16208__auto__ = (function (){var statearr_18514 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_18514[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___18519);

return statearr_18514;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___18519,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args18532 = [];
var len__8202__auto___18535 = arguments.length;
var i__8203__auto___18536 = (0);
while(true){
if((i__8203__auto___18536 < len__8202__auto___18535)){
args18532.push((arguments[i__8203__auto___18536]));

var G__18537 = (i__8203__auto___18536 + (1));
i__8203__auto___18536 = G__18537;
continue;
} else {
}
break;
}

var G__18534 = args18532.length;
switch (G__18534) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18532.length)].join('')));

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
var c__16206__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto__){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto__){
return (function (state_18704){
var state_val_18705 = (state_18704[(1)]);
if((state_val_18705 === (7))){
var inst_18700 = (state_18704[(2)]);
var state_18704__$1 = state_18704;
var statearr_18706_18747 = state_18704__$1;
(statearr_18706_18747[(2)] = inst_18700);

(statearr_18706_18747[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (20))){
var inst_18670 = (state_18704[(7)]);
var inst_18681 = (state_18704[(2)]);
var inst_18682 = cljs.core.next(inst_18670);
var inst_18656 = inst_18682;
var inst_18657 = null;
var inst_18658 = (0);
var inst_18659 = (0);
var state_18704__$1 = (function (){var statearr_18707 = state_18704;
(statearr_18707[(8)] = inst_18681);

(statearr_18707[(9)] = inst_18658);

(statearr_18707[(10)] = inst_18657);

(statearr_18707[(11)] = inst_18659);

(statearr_18707[(12)] = inst_18656);

return statearr_18707;
})();
var statearr_18708_18748 = state_18704__$1;
(statearr_18708_18748[(2)] = null);

(statearr_18708_18748[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (1))){
var state_18704__$1 = state_18704;
var statearr_18709_18749 = state_18704__$1;
(statearr_18709_18749[(2)] = null);

(statearr_18709_18749[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (4))){
var inst_18645 = (state_18704[(13)]);
var inst_18645__$1 = (state_18704[(2)]);
var inst_18646 = (inst_18645__$1 == null);
var state_18704__$1 = (function (){var statearr_18710 = state_18704;
(statearr_18710[(13)] = inst_18645__$1);

return statearr_18710;
})();
if(cljs.core.truth_(inst_18646)){
var statearr_18711_18750 = state_18704__$1;
(statearr_18711_18750[(1)] = (5));

} else {
var statearr_18712_18751 = state_18704__$1;
(statearr_18712_18751[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (15))){
var state_18704__$1 = state_18704;
var statearr_18716_18752 = state_18704__$1;
(statearr_18716_18752[(2)] = null);

(statearr_18716_18752[(1)] = (16));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (21))){
var state_18704__$1 = state_18704;
var statearr_18717_18753 = state_18704__$1;
(statearr_18717_18753[(2)] = null);

(statearr_18717_18753[(1)] = (23));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (13))){
var inst_18658 = (state_18704[(9)]);
var inst_18657 = (state_18704[(10)]);
var inst_18659 = (state_18704[(11)]);
var inst_18656 = (state_18704[(12)]);
var inst_18666 = (state_18704[(2)]);
var inst_18667 = (inst_18659 + (1));
var tmp18713 = inst_18658;
var tmp18714 = inst_18657;
var tmp18715 = inst_18656;
var inst_18656__$1 = tmp18715;
var inst_18657__$1 = tmp18714;
var inst_18658__$1 = tmp18713;
var inst_18659__$1 = inst_18667;
var state_18704__$1 = (function (){var statearr_18718 = state_18704;
(statearr_18718[(14)] = inst_18666);

(statearr_18718[(9)] = inst_18658__$1);

(statearr_18718[(10)] = inst_18657__$1);

(statearr_18718[(11)] = inst_18659__$1);

(statearr_18718[(12)] = inst_18656__$1);

return statearr_18718;
})();
var statearr_18719_18754 = state_18704__$1;
(statearr_18719_18754[(2)] = null);

(statearr_18719_18754[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (22))){
var state_18704__$1 = state_18704;
var statearr_18720_18755 = state_18704__$1;
(statearr_18720_18755[(2)] = null);

(statearr_18720_18755[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (6))){
var inst_18645 = (state_18704[(13)]);
var inst_18654 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_18645) : f.call(null,inst_18645));
var inst_18655 = cljs.core.seq(inst_18654);
var inst_18656 = inst_18655;
var inst_18657 = null;
var inst_18658 = (0);
var inst_18659 = (0);
var state_18704__$1 = (function (){var statearr_18721 = state_18704;
(statearr_18721[(9)] = inst_18658);

(statearr_18721[(10)] = inst_18657);

(statearr_18721[(11)] = inst_18659);

(statearr_18721[(12)] = inst_18656);

return statearr_18721;
})();
var statearr_18722_18756 = state_18704__$1;
(statearr_18722_18756[(2)] = null);

(statearr_18722_18756[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (17))){
var inst_18670 = (state_18704[(7)]);
var inst_18674 = cljs.core.chunk_first(inst_18670);
var inst_18675 = cljs.core.chunk_rest(inst_18670);
var inst_18676 = cljs.core.count(inst_18674);
var inst_18656 = inst_18675;
var inst_18657 = inst_18674;
var inst_18658 = inst_18676;
var inst_18659 = (0);
var state_18704__$1 = (function (){var statearr_18723 = state_18704;
(statearr_18723[(9)] = inst_18658);

(statearr_18723[(10)] = inst_18657);

(statearr_18723[(11)] = inst_18659);

(statearr_18723[(12)] = inst_18656);

return statearr_18723;
})();
var statearr_18724_18757 = state_18704__$1;
(statearr_18724_18757[(2)] = null);

(statearr_18724_18757[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (3))){
var inst_18702 = (state_18704[(2)]);
var state_18704__$1 = state_18704;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18704__$1,inst_18702);
} else {
if((state_val_18705 === (12))){
var inst_18690 = (state_18704[(2)]);
var state_18704__$1 = state_18704;
var statearr_18725_18758 = state_18704__$1;
(statearr_18725_18758[(2)] = inst_18690);

(statearr_18725_18758[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (2))){
var state_18704__$1 = state_18704;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18704__$1,(4),in$);
} else {
if((state_val_18705 === (23))){
var inst_18698 = (state_18704[(2)]);
var state_18704__$1 = state_18704;
var statearr_18726_18759 = state_18704__$1;
(statearr_18726_18759[(2)] = inst_18698);

(statearr_18726_18759[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (19))){
var inst_18685 = (state_18704[(2)]);
var state_18704__$1 = state_18704;
var statearr_18727_18760 = state_18704__$1;
(statearr_18727_18760[(2)] = inst_18685);

(statearr_18727_18760[(1)] = (16));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (11))){
var inst_18670 = (state_18704[(7)]);
var inst_18656 = (state_18704[(12)]);
var inst_18670__$1 = cljs.core.seq(inst_18656);
var state_18704__$1 = (function (){var statearr_18728 = state_18704;
(statearr_18728[(7)] = inst_18670__$1);

return statearr_18728;
})();
if(inst_18670__$1){
var statearr_18729_18761 = state_18704__$1;
(statearr_18729_18761[(1)] = (14));

} else {
var statearr_18730_18762 = state_18704__$1;
(statearr_18730_18762[(1)] = (15));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (9))){
var inst_18692 = (state_18704[(2)]);
var inst_18693 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_18704__$1 = (function (){var statearr_18731 = state_18704;
(statearr_18731[(15)] = inst_18692);

return statearr_18731;
})();
if(cljs.core.truth_(inst_18693)){
var statearr_18732_18763 = state_18704__$1;
(statearr_18732_18763[(1)] = (21));

} else {
var statearr_18733_18764 = state_18704__$1;
(statearr_18733_18764[(1)] = (22));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (5))){
var inst_18648 = cljs.core.async.close_BANG_(out);
var state_18704__$1 = state_18704;
var statearr_18734_18765 = state_18704__$1;
(statearr_18734_18765[(2)] = inst_18648);

(statearr_18734_18765[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (14))){
var inst_18670 = (state_18704[(7)]);
var inst_18672 = cljs.core.chunked_seq_QMARK_(inst_18670);
var state_18704__$1 = state_18704;
if(inst_18672){
var statearr_18735_18766 = state_18704__$1;
(statearr_18735_18766[(1)] = (17));

} else {
var statearr_18736_18767 = state_18704__$1;
(statearr_18736_18767[(1)] = (18));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (16))){
var inst_18688 = (state_18704[(2)]);
var state_18704__$1 = state_18704;
var statearr_18737_18768 = state_18704__$1;
(statearr_18737_18768[(2)] = inst_18688);

(statearr_18737_18768[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18705 === (10))){
var inst_18657 = (state_18704[(10)]);
var inst_18659 = (state_18704[(11)]);
var inst_18664 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_18657,inst_18659);
var state_18704__$1 = state_18704;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18704__$1,(13),out,inst_18664);
} else {
if((state_val_18705 === (18))){
var inst_18670 = (state_18704[(7)]);
var inst_18679 = cljs.core.first(inst_18670);
var state_18704__$1 = state_18704;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18704__$1,(20),out,inst_18679);
} else {
if((state_val_18705 === (8))){
var inst_18658 = (state_18704[(9)]);
var inst_18659 = (state_18704[(11)]);
var inst_18661 = (inst_18659 < inst_18658);
var inst_18662 = inst_18661;
var state_18704__$1 = state_18704;
if(cljs.core.truth_(inst_18662)){
var statearr_18738_18769 = state_18704__$1;
(statearr_18738_18769[(1)] = (10));

} else {
var statearr_18739_18770 = state_18704__$1;
(statearr_18739_18770[(1)] = (11));

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
});})(c__16206__auto__))
;
return ((function (switch__16090__auto__,c__16206__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__16091__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__16091__auto____0 = (function (){
var statearr_18743 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18743[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__16091__auto__);

(statearr_18743[(1)] = (1));

return statearr_18743;
});
var cljs$core$async$mapcat_STAR__$_state_machine__16091__auto____1 = (function (state_18704){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_18704);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e18744){if((e18744 instanceof Object)){
var ex__16094__auto__ = e18744;
var statearr_18745_18771 = state_18704;
(statearr_18745_18771[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18704);

return cljs.core.cst$kw$recur;
} else {
throw e18744;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__18772 = state_18704;
state_18704 = G__18772;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__16091__auto__ = function(state_18704){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__16091__auto____1.call(this,state_18704);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__16091__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__16091__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto__))
})();
var state__16208__auto__ = (function (){var statearr_18746 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_18746[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto__);

return statearr_18746;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto__))
);

return c__16206__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args18773 = [];
var len__8202__auto___18776 = arguments.length;
var i__8203__auto___18777 = (0);
while(true){
if((i__8203__auto___18777 < len__8202__auto___18776)){
args18773.push((arguments[i__8203__auto___18777]));

var G__18778 = (i__8203__auto___18777 + (1));
i__8203__auto___18777 = G__18778;
continue;
} else {
}
break;
}

var G__18775 = args18773.length;
switch (G__18775) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18773.length)].join('')));

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
var args18780 = [];
var len__8202__auto___18783 = arguments.length;
var i__8203__auto___18784 = (0);
while(true){
if((i__8203__auto___18784 < len__8202__auto___18783)){
args18780.push((arguments[i__8203__auto___18784]));

var G__18785 = (i__8203__auto___18784 + (1));
i__8203__auto___18784 = G__18785;
continue;
} else {
}
break;
}

var G__18782 = args18780.length;
switch (G__18782) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18780.length)].join('')));

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
var args18787 = [];
var len__8202__auto___18838 = arguments.length;
var i__8203__auto___18839 = (0);
while(true){
if((i__8203__auto___18839 < len__8202__auto___18838)){
args18787.push((arguments[i__8203__auto___18839]));

var G__18840 = (i__8203__auto___18839 + (1));
i__8203__auto___18839 = G__18840;
continue;
} else {
}
break;
}

var G__18789 = args18787.length;
switch (G__18789) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18787.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16206__auto___18842 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___18842,out){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___18842,out){
return (function (state_18813){
var state_val_18814 = (state_18813[(1)]);
if((state_val_18814 === (7))){
var inst_18808 = (state_18813[(2)]);
var state_18813__$1 = state_18813;
var statearr_18815_18843 = state_18813__$1;
(statearr_18815_18843[(2)] = inst_18808);

(statearr_18815_18843[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18814 === (1))){
var inst_18790 = null;
var state_18813__$1 = (function (){var statearr_18816 = state_18813;
(statearr_18816[(7)] = inst_18790);

return statearr_18816;
})();
var statearr_18817_18844 = state_18813__$1;
(statearr_18817_18844[(2)] = null);

(statearr_18817_18844[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18814 === (4))){
var inst_18793 = (state_18813[(8)]);
var inst_18793__$1 = (state_18813[(2)]);
var inst_18794 = (inst_18793__$1 == null);
var inst_18795 = cljs.core.not(inst_18794);
var state_18813__$1 = (function (){var statearr_18818 = state_18813;
(statearr_18818[(8)] = inst_18793__$1);

return statearr_18818;
})();
if(inst_18795){
var statearr_18819_18845 = state_18813__$1;
(statearr_18819_18845[(1)] = (5));

} else {
var statearr_18820_18846 = state_18813__$1;
(statearr_18820_18846[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18814 === (6))){
var state_18813__$1 = state_18813;
var statearr_18821_18847 = state_18813__$1;
(statearr_18821_18847[(2)] = null);

(statearr_18821_18847[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18814 === (3))){
var inst_18810 = (state_18813[(2)]);
var inst_18811 = cljs.core.async.close_BANG_(out);
var state_18813__$1 = (function (){var statearr_18822 = state_18813;
(statearr_18822[(9)] = inst_18810);

return statearr_18822;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_18813__$1,inst_18811);
} else {
if((state_val_18814 === (2))){
var state_18813__$1 = state_18813;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18813__$1,(4),ch);
} else {
if((state_val_18814 === (11))){
var inst_18793 = (state_18813[(8)]);
var inst_18802 = (state_18813[(2)]);
var inst_18790 = inst_18793;
var state_18813__$1 = (function (){var statearr_18823 = state_18813;
(statearr_18823[(10)] = inst_18802);

(statearr_18823[(7)] = inst_18790);

return statearr_18823;
})();
var statearr_18824_18848 = state_18813__$1;
(statearr_18824_18848[(2)] = null);

(statearr_18824_18848[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18814 === (9))){
var inst_18793 = (state_18813[(8)]);
var state_18813__$1 = state_18813;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18813__$1,(11),out,inst_18793);
} else {
if((state_val_18814 === (5))){
var inst_18793 = (state_18813[(8)]);
var inst_18790 = (state_18813[(7)]);
var inst_18797 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_18793,inst_18790);
var state_18813__$1 = state_18813;
if(inst_18797){
var statearr_18826_18849 = state_18813__$1;
(statearr_18826_18849[(1)] = (8));

} else {
var statearr_18827_18850 = state_18813__$1;
(statearr_18827_18850[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18814 === (10))){
var inst_18805 = (state_18813[(2)]);
var state_18813__$1 = state_18813;
var statearr_18828_18851 = state_18813__$1;
(statearr_18828_18851[(2)] = inst_18805);

(statearr_18828_18851[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18814 === (8))){
var inst_18790 = (state_18813[(7)]);
var tmp18825 = inst_18790;
var inst_18790__$1 = tmp18825;
var state_18813__$1 = (function (){var statearr_18829 = state_18813;
(statearr_18829[(7)] = inst_18790__$1);

return statearr_18829;
})();
var statearr_18830_18852 = state_18813__$1;
(statearr_18830_18852[(2)] = null);

(statearr_18830_18852[(1)] = (2));


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
});})(c__16206__auto___18842,out))
;
return ((function (switch__16090__auto__,c__16206__auto___18842,out){
return (function() {
var cljs$core$async$state_machine__16091__auto__ = null;
var cljs$core$async$state_machine__16091__auto____0 = (function (){
var statearr_18834 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_18834[(0)] = cljs$core$async$state_machine__16091__auto__);

(statearr_18834[(1)] = (1));

return statearr_18834;
});
var cljs$core$async$state_machine__16091__auto____1 = (function (state_18813){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_18813);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e18835){if((e18835 instanceof Object)){
var ex__16094__auto__ = e18835;
var statearr_18836_18853 = state_18813;
(statearr_18836_18853[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18813);

return cljs.core.cst$kw$recur;
} else {
throw e18835;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__18854 = state_18813;
state_18813 = G__18854;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$state_machine__16091__auto__ = function(state_18813){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16091__auto____1.call(this,state_18813);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16091__auto____0;
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16091__auto____1;
return cljs$core$async$state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___18842,out))
})();
var state__16208__auto__ = (function (){var statearr_18837 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_18837[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___18842);

return statearr_18837;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___18842,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args18855 = [];
var len__8202__auto___18925 = arguments.length;
var i__8203__auto___18926 = (0);
while(true){
if((i__8203__auto___18926 < len__8202__auto___18925)){
args18855.push((arguments[i__8203__auto___18926]));

var G__18927 = (i__8203__auto___18926 + (1));
i__8203__auto___18926 = G__18927;
continue;
} else {
}
break;
}

var G__18857 = args18855.length;
switch (G__18857) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18855.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16206__auto___18929 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___18929,out){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___18929,out){
return (function (state_18895){
var state_val_18896 = (state_18895[(1)]);
if((state_val_18896 === (7))){
var inst_18891 = (state_18895[(2)]);
var state_18895__$1 = state_18895;
var statearr_18897_18930 = state_18895__$1;
(statearr_18897_18930[(2)] = inst_18891);

(statearr_18897_18930[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18896 === (1))){
var inst_18858 = (new Array(n));
var inst_18859 = inst_18858;
var inst_18860 = (0);
var state_18895__$1 = (function (){var statearr_18898 = state_18895;
(statearr_18898[(7)] = inst_18860);

(statearr_18898[(8)] = inst_18859);

return statearr_18898;
})();
var statearr_18899_18931 = state_18895__$1;
(statearr_18899_18931[(2)] = null);

(statearr_18899_18931[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18896 === (4))){
var inst_18863 = (state_18895[(9)]);
var inst_18863__$1 = (state_18895[(2)]);
var inst_18864 = (inst_18863__$1 == null);
var inst_18865 = cljs.core.not(inst_18864);
var state_18895__$1 = (function (){var statearr_18900 = state_18895;
(statearr_18900[(9)] = inst_18863__$1);

return statearr_18900;
})();
if(inst_18865){
var statearr_18901_18932 = state_18895__$1;
(statearr_18901_18932[(1)] = (5));

} else {
var statearr_18902_18933 = state_18895__$1;
(statearr_18902_18933[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18896 === (15))){
var inst_18885 = (state_18895[(2)]);
var state_18895__$1 = state_18895;
var statearr_18903_18934 = state_18895__$1;
(statearr_18903_18934[(2)] = inst_18885);

(statearr_18903_18934[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18896 === (13))){
var state_18895__$1 = state_18895;
var statearr_18904_18935 = state_18895__$1;
(statearr_18904_18935[(2)] = null);

(statearr_18904_18935[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18896 === (6))){
var inst_18860 = (state_18895[(7)]);
var inst_18881 = (inst_18860 > (0));
var state_18895__$1 = state_18895;
if(cljs.core.truth_(inst_18881)){
var statearr_18905_18936 = state_18895__$1;
(statearr_18905_18936[(1)] = (12));

} else {
var statearr_18906_18937 = state_18895__$1;
(statearr_18906_18937[(1)] = (13));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18896 === (3))){
var inst_18893 = (state_18895[(2)]);
var state_18895__$1 = state_18895;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18895__$1,inst_18893);
} else {
if((state_val_18896 === (12))){
var inst_18859 = (state_18895[(8)]);
var inst_18883 = cljs.core.vec(inst_18859);
var state_18895__$1 = state_18895;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18895__$1,(15),out,inst_18883);
} else {
if((state_val_18896 === (2))){
var state_18895__$1 = state_18895;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18895__$1,(4),ch);
} else {
if((state_val_18896 === (11))){
var inst_18875 = (state_18895[(2)]);
var inst_18876 = (new Array(n));
var inst_18859 = inst_18876;
var inst_18860 = (0);
var state_18895__$1 = (function (){var statearr_18907 = state_18895;
(statearr_18907[(7)] = inst_18860);

(statearr_18907[(8)] = inst_18859);

(statearr_18907[(10)] = inst_18875);

return statearr_18907;
})();
var statearr_18908_18938 = state_18895__$1;
(statearr_18908_18938[(2)] = null);

(statearr_18908_18938[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18896 === (9))){
var inst_18859 = (state_18895[(8)]);
var inst_18873 = cljs.core.vec(inst_18859);
var state_18895__$1 = state_18895;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18895__$1,(11),out,inst_18873);
} else {
if((state_val_18896 === (5))){
var inst_18860 = (state_18895[(7)]);
var inst_18859 = (state_18895[(8)]);
var inst_18868 = (state_18895[(11)]);
var inst_18863 = (state_18895[(9)]);
var inst_18867 = (inst_18859[inst_18860] = inst_18863);
var inst_18868__$1 = (inst_18860 + (1));
var inst_18869 = (inst_18868__$1 < n);
var state_18895__$1 = (function (){var statearr_18909 = state_18895;
(statearr_18909[(12)] = inst_18867);

(statearr_18909[(11)] = inst_18868__$1);

return statearr_18909;
})();
if(cljs.core.truth_(inst_18869)){
var statearr_18910_18939 = state_18895__$1;
(statearr_18910_18939[(1)] = (8));

} else {
var statearr_18911_18940 = state_18895__$1;
(statearr_18911_18940[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18896 === (14))){
var inst_18888 = (state_18895[(2)]);
var inst_18889 = cljs.core.async.close_BANG_(out);
var state_18895__$1 = (function (){var statearr_18913 = state_18895;
(statearr_18913[(13)] = inst_18888);

return statearr_18913;
})();
var statearr_18914_18941 = state_18895__$1;
(statearr_18914_18941[(2)] = inst_18889);

(statearr_18914_18941[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18896 === (10))){
var inst_18879 = (state_18895[(2)]);
var state_18895__$1 = state_18895;
var statearr_18915_18942 = state_18895__$1;
(statearr_18915_18942[(2)] = inst_18879);

(statearr_18915_18942[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18896 === (8))){
var inst_18859 = (state_18895[(8)]);
var inst_18868 = (state_18895[(11)]);
var tmp18912 = inst_18859;
var inst_18859__$1 = tmp18912;
var inst_18860 = inst_18868;
var state_18895__$1 = (function (){var statearr_18916 = state_18895;
(statearr_18916[(7)] = inst_18860);

(statearr_18916[(8)] = inst_18859__$1);

return statearr_18916;
})();
var statearr_18917_18943 = state_18895__$1;
(statearr_18917_18943[(2)] = null);

(statearr_18917_18943[(1)] = (2));


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
});})(c__16206__auto___18929,out))
;
return ((function (switch__16090__auto__,c__16206__auto___18929,out){
return (function() {
var cljs$core$async$state_machine__16091__auto__ = null;
var cljs$core$async$state_machine__16091__auto____0 = (function (){
var statearr_18921 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18921[(0)] = cljs$core$async$state_machine__16091__auto__);

(statearr_18921[(1)] = (1));

return statearr_18921;
});
var cljs$core$async$state_machine__16091__auto____1 = (function (state_18895){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_18895);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e18922){if((e18922 instanceof Object)){
var ex__16094__auto__ = e18922;
var statearr_18923_18944 = state_18895;
(statearr_18923_18944[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18895);

return cljs.core.cst$kw$recur;
} else {
throw e18922;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__18945 = state_18895;
state_18895 = G__18945;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$state_machine__16091__auto__ = function(state_18895){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16091__auto____1.call(this,state_18895);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16091__auto____0;
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16091__auto____1;
return cljs$core$async$state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___18929,out))
})();
var state__16208__auto__ = (function (){var statearr_18924 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_18924[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___18929);

return statearr_18924;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___18929,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args18946 = [];
var len__8202__auto___19020 = arguments.length;
var i__8203__auto___19021 = (0);
while(true){
if((i__8203__auto___19021 < len__8202__auto___19020)){
args18946.push((arguments[i__8203__auto___19021]));

var G__19022 = (i__8203__auto___19021 + (1));
i__8203__auto___19021 = G__19022;
continue;
} else {
}
break;
}

var G__18948 = args18946.length;
switch (G__18948) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18946.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16206__auto___19024 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__16206__auto___19024,out){
return (function (){
var f__16207__auto__ = (function (){var switch__16090__auto__ = ((function (c__16206__auto___19024,out){
return (function (state_18990){
var state_val_18991 = (state_18990[(1)]);
if((state_val_18991 === (7))){
var inst_18986 = (state_18990[(2)]);
var state_18990__$1 = state_18990;
var statearr_18992_19025 = state_18990__$1;
(statearr_18992_19025[(2)] = inst_18986);

(statearr_18992_19025[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18991 === (1))){
var inst_18949 = [];
var inst_18950 = inst_18949;
var inst_18951 = cljs.core.cst$kw$cljs$core$async_SLASH_nothing;
var state_18990__$1 = (function (){var statearr_18993 = state_18990;
(statearr_18993[(7)] = inst_18951);

(statearr_18993[(8)] = inst_18950);

return statearr_18993;
})();
var statearr_18994_19026 = state_18990__$1;
(statearr_18994_19026[(2)] = null);

(statearr_18994_19026[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18991 === (4))){
var inst_18954 = (state_18990[(9)]);
var inst_18954__$1 = (state_18990[(2)]);
var inst_18955 = (inst_18954__$1 == null);
var inst_18956 = cljs.core.not(inst_18955);
var state_18990__$1 = (function (){var statearr_18995 = state_18990;
(statearr_18995[(9)] = inst_18954__$1);

return statearr_18995;
})();
if(inst_18956){
var statearr_18996_19027 = state_18990__$1;
(statearr_18996_19027[(1)] = (5));

} else {
var statearr_18997_19028 = state_18990__$1;
(statearr_18997_19028[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18991 === (15))){
var inst_18980 = (state_18990[(2)]);
var state_18990__$1 = state_18990;
var statearr_18998_19029 = state_18990__$1;
(statearr_18998_19029[(2)] = inst_18980);

(statearr_18998_19029[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18991 === (13))){
var state_18990__$1 = state_18990;
var statearr_18999_19030 = state_18990__$1;
(statearr_18999_19030[(2)] = null);

(statearr_18999_19030[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18991 === (6))){
var inst_18950 = (state_18990[(8)]);
var inst_18975 = inst_18950.length;
var inst_18976 = (inst_18975 > (0));
var state_18990__$1 = state_18990;
if(cljs.core.truth_(inst_18976)){
var statearr_19000_19031 = state_18990__$1;
(statearr_19000_19031[(1)] = (12));

} else {
var statearr_19001_19032 = state_18990__$1;
(statearr_19001_19032[(1)] = (13));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18991 === (3))){
var inst_18988 = (state_18990[(2)]);
var state_18990__$1 = state_18990;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18990__$1,inst_18988);
} else {
if((state_val_18991 === (12))){
var inst_18950 = (state_18990[(8)]);
var inst_18978 = cljs.core.vec(inst_18950);
var state_18990__$1 = state_18990;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18990__$1,(15),out,inst_18978);
} else {
if((state_val_18991 === (2))){
var state_18990__$1 = state_18990;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18990__$1,(4),ch);
} else {
if((state_val_18991 === (11))){
var inst_18958 = (state_18990[(10)]);
var inst_18954 = (state_18990[(9)]);
var inst_18968 = (state_18990[(2)]);
var inst_18969 = [];
var inst_18970 = inst_18969.push(inst_18954);
var inst_18950 = inst_18969;
var inst_18951 = inst_18958;
var state_18990__$1 = (function (){var statearr_19002 = state_18990;
(statearr_19002[(7)] = inst_18951);

(statearr_19002[(11)] = inst_18970);

(statearr_19002[(8)] = inst_18950);

(statearr_19002[(12)] = inst_18968);

return statearr_19002;
})();
var statearr_19003_19033 = state_18990__$1;
(statearr_19003_19033[(2)] = null);

(statearr_19003_19033[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18991 === (9))){
var inst_18950 = (state_18990[(8)]);
var inst_18966 = cljs.core.vec(inst_18950);
var state_18990__$1 = state_18990;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18990__$1,(11),out,inst_18966);
} else {
if((state_val_18991 === (5))){
var inst_18958 = (state_18990[(10)]);
var inst_18951 = (state_18990[(7)]);
var inst_18954 = (state_18990[(9)]);
var inst_18958__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_18954) : f.call(null,inst_18954));
var inst_18959 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_18958__$1,inst_18951);
var inst_18960 = cljs.core.keyword_identical_QMARK_(inst_18951,cljs.core.cst$kw$cljs$core$async_SLASH_nothing);
var inst_18961 = (inst_18959) || (inst_18960);
var state_18990__$1 = (function (){var statearr_19004 = state_18990;
(statearr_19004[(10)] = inst_18958__$1);

return statearr_19004;
})();
if(cljs.core.truth_(inst_18961)){
var statearr_19005_19034 = state_18990__$1;
(statearr_19005_19034[(1)] = (8));

} else {
var statearr_19006_19035 = state_18990__$1;
(statearr_19006_19035[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_18991 === (14))){
var inst_18983 = (state_18990[(2)]);
var inst_18984 = cljs.core.async.close_BANG_(out);
var state_18990__$1 = (function (){var statearr_19008 = state_18990;
(statearr_19008[(13)] = inst_18983);

return statearr_19008;
})();
var statearr_19009_19036 = state_18990__$1;
(statearr_19009_19036[(2)] = inst_18984);

(statearr_19009_19036[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18991 === (10))){
var inst_18973 = (state_18990[(2)]);
var state_18990__$1 = state_18990;
var statearr_19010_19037 = state_18990__$1;
(statearr_19010_19037[(2)] = inst_18973);

(statearr_19010_19037[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_18991 === (8))){
var inst_18958 = (state_18990[(10)]);
var inst_18950 = (state_18990[(8)]);
var inst_18954 = (state_18990[(9)]);
var inst_18963 = inst_18950.push(inst_18954);
var tmp19007 = inst_18950;
var inst_18950__$1 = tmp19007;
var inst_18951 = inst_18958;
var state_18990__$1 = (function (){var statearr_19011 = state_18990;
(statearr_19011[(7)] = inst_18951);

(statearr_19011[(14)] = inst_18963);

(statearr_19011[(8)] = inst_18950__$1);

return statearr_19011;
})();
var statearr_19012_19038 = state_18990__$1;
(statearr_19012_19038[(2)] = null);

(statearr_19012_19038[(1)] = (2));


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
});})(c__16206__auto___19024,out))
;
return ((function (switch__16090__auto__,c__16206__auto___19024,out){
return (function() {
var cljs$core$async$state_machine__16091__auto__ = null;
var cljs$core$async$state_machine__16091__auto____0 = (function (){
var statearr_19016 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19016[(0)] = cljs$core$async$state_machine__16091__auto__);

(statearr_19016[(1)] = (1));

return statearr_19016;
});
var cljs$core$async$state_machine__16091__auto____1 = (function (state_18990){
while(true){
var ret_value__16092__auto__ = (function (){try{while(true){
var result__16093__auto__ = switch__16090__auto__(state_18990);
if(cljs.core.keyword_identical_QMARK_(result__16093__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__16093__auto__;
}
break;
}
}catch (e19017){if((e19017 instanceof Object)){
var ex__16094__auto__ = e19017;
var statearr_19018_19039 = state_18990;
(statearr_19018_19039[(5)] = ex__16094__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_18990);

return cljs.core.cst$kw$recur;
} else {
throw e19017;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__16092__auto__,cljs.core.cst$kw$recur)){
var G__19040 = state_18990;
state_18990 = G__19040;
continue;
} else {
return ret_value__16092__auto__;
}
break;
}
});
cljs$core$async$state_machine__16091__auto__ = function(state_18990){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__16091__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__16091__auto____1.call(this,state_18990);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__16091__auto____0;
cljs$core$async$state_machine__16091__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__16091__auto____1;
return cljs$core$async$state_machine__16091__auto__;
})()
;})(switch__16090__auto__,c__16206__auto___19024,out))
})();
var state__16208__auto__ = (function (){var statearr_19019 = (f__16207__auto__.cljs$core$IFn$_invoke$arity$0 ? f__16207__auto__.cljs$core$IFn$_invoke$arity$0() : f__16207__auto__.call(null));
(statearr_19019[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__16206__auto___19024);

return statearr_19019;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16208__auto__);
});})(c__16206__auto___19024,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

