// Compiled by ClojureScript 1.9.76 {:static-fns true, :optimize-constants true}
goog.provide('weathergen.math');
goog.require('cljs.core');
weathergen.math.low_bits = (function weathergen$math$low_bits(x,n){
return (x & (((1) << n) - (1)));
});
weathergen.math.high_bits = (function weathergen$math$high_bits(x,n){
return (x >> ((32) - n));
});
weathergen.math.bit_rotate_right = (function weathergen$math$bit_rotate_right(x,n){
return (weathergen.math.high_bits(x,((32) - n)) + (weathergen.math.low_bits(x,n) << ((32) - n)));
});
weathergen.math.bit_rotate_left = (function weathergen$math$bit_rotate_left(x,n){
return (weathergen.math.high_bits(x,n) + (weathergen.math.low_bits(x,((32) - n)) << n));
});
weathergen.math.frac = (function weathergen$math$frac(x){
return (x - cljs.core.long$(x));
});
weathergen.math.whole = cljs.core.long$;
weathergen.math.mean = (function weathergen$math$mean(x,y){
return ((x + y) / 2.0);
});
weathergen.math.interpolate = (function weathergen$math$interpolate(x,y,f){
return (((1.0 - f) * x) + (f * y));
});
weathergen.math.vector_interpolate = (function weathergen$math$vector_interpolate(v1,v2,x,x1,x2){
var f = ((x - x1) / (x2 - x1));
var interp = ((function (f){
return (function (a,b){
return ((((1) - f) * a) + (f * b));
});})(f))
;
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(interp,v1,v2);
});
weathergen.math.vector_add = (function weathergen$math$vector_add(var_args){
var args__8209__auto__ = [];
var len__8202__auto___19084 = arguments.length;
var i__8203__auto___19085 = (0);
while(true){
if((i__8203__auto___19085 < len__8202__auto___19084)){
args__8209__auto__.push((arguments[i__8203__auto___19085]));

var G__19086 = (i__8203__auto___19085 + (1));
i__8203__auto___19085 = G__19086;
continue;
} else {
}
break;
}

var argseq__8210__auto__ = ((((0) < args__8209__auto__.length))?(new cljs.core.IndexedSeq(args__8209__auto__.slice((0)),(0),null)):null);
return weathergen.math.vector_add.cljs$core$IFn$_invoke$arity$variadic(argseq__8210__auto__);
});

weathergen.math.vector_add.cljs$core$IFn$_invoke$arity$variadic = (function (vs){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.mapv,cljs.core._PLUS_,vs);
});

weathergen.math.vector_add.cljs$lang$maxFixedArity = (0);

weathergen.math.vector_add.cljs$lang$applyTo = (function (seq19083){
return weathergen.math.vector_add.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq19083));
});

weathergen.math.scramble = (function weathergen$math$scramble(var_args){
var args19087 = [];
var len__8202__auto___19093 = arguments.length;
var i__8203__auto___19094 = (0);
while(true){
if((i__8203__auto___19094 < len__8202__auto___19093)){
args19087.push((arguments[i__8203__auto___19094]));

var G__19095 = (i__8203__auto___19094 + (1));
i__8203__auto___19094 = G__19095;
continue;
} else {
}
break;
}

var G__19089 = args19087.length;
switch (G__19089) {
case 1:
return weathergen.math.scramble.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return weathergen.math.scramble.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19087.length)].join('')));

}
});

weathergen.math.scramble.cljs$core$IFn$_invoke$arity$1 = (function (x){
return weathergen.math.scramble.cljs$core$IFn$_invoke$arity$2(x,(1));
});

weathergen.math.scramble.cljs$core$IFn$_invoke$arity$2 = (function (x,seed){
var a = (function (){var G__19091 = (function (){var G__19092 = (x * seed);
return Math.sin(G__19092);
})();
return Math.abs(G__19091);
})();
var b = (a * 100000.0);
return weathergen.math.frac(b);
});

weathergen.math.scramble.cljs$lang$maxFixedArity = 2;

weathergen.math.discrete_noise_field = (function weathergen$math$discrete_noise_field(var_args){
var args19097 = [];
var len__8202__auto___19100 = arguments.length;
var i__8203__auto___19101 = (0);
while(true){
if((i__8203__auto___19101 < len__8202__auto___19100)){
args19097.push((arguments[i__8203__auto___19101]));

var G__19102 = (i__8203__auto___19101 + (1));
i__8203__auto___19101 = G__19102;
continue;
} else {
}
break;
}

var G__19099 = args19097.length;
switch (G__19099) {
case 2:
return weathergen.math.discrete_noise_field.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return weathergen.math.discrete_noise_field.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19097.length)].join('')));

}
});

weathergen.math.discrete_noise_field.cljs$core$IFn$_invoke$arity$2 = (function (x,y){
return weathergen.math.discrete_noise_field.cljs$core$IFn$_invoke$arity$3(x,y,(1));
});

weathergen.math.discrete_noise_field.cljs$core$IFn$_invoke$arity$3 = (function (x,y,seed){
return weathergen.math.scramble.cljs$core$IFn$_invoke$arity$2(((x * (65521)) + y),seed);
});

weathergen.math.discrete_noise_field.cljs$lang$maxFixedArity = 3;

weathergen.math.continuous_noise_field = (function weathergen$math$continuous_noise_field(var_args){
var args19104 = [];
var len__8202__auto___19107 = arguments.length;
var i__8203__auto___19108 = (0);
while(true){
if((i__8203__auto___19108 < len__8202__auto___19107)){
args19104.push((arguments[i__8203__auto___19108]));

var G__19109 = (i__8203__auto___19108 + (1));
i__8203__auto___19108 = G__19109;
continue;
} else {
}
break;
}

var G__19106 = args19104.length;
switch (G__19106) {
case 2:
return weathergen.math.continuous_noise_field.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return weathergen.math.continuous_noise_field.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19104.length)].join('')));

}
});

weathergen.math.continuous_noise_field.cljs$core$IFn$_invoke$arity$2 = (function (x,y){
return weathergen.math.continuous_noise_field.cljs$core$IFn$_invoke$arity$3(x,y,1.0);
});

weathergen.math.continuous_noise_field.cljs$core$IFn$_invoke$arity$3 = (function (x,y,seed){
var x_frac = cljs.core.mod(weathergen.math.frac(x),1.0);
var y_frac = cljs.core.mod(weathergen.math.frac(y),1.0);
var x_whole = Math.floor(x);
var y_whole = Math.floor(y);
return weathergen.math.interpolate(weathergen.math.interpolate(weathergen.math.discrete_noise_field.cljs$core$IFn$_invoke$arity$3(x_whole,y_whole,seed),weathergen.math.discrete_noise_field.cljs$core$IFn$_invoke$arity$3((x_whole + (1)),y_whole,seed),x_frac),weathergen.math.interpolate(weathergen.math.discrete_noise_field.cljs$core$IFn$_invoke$arity$3(x_whole,(y_whole + (1)),seed),weathergen.math.discrete_noise_field.cljs$core$IFn$_invoke$arity$3((x_whole + (1)),(y_whole + (1)),seed),x_frac),y_frac);
});

weathergen.math.continuous_noise_field.cljs$lang$maxFixedArity = 3;

weathergen.math.fractal_field = (function weathergen$math$fractal_field(var_args){
var args19111 = [];
var len__8202__auto___19114 = arguments.length;
var i__8203__auto___19115 = (0);
while(true){
if((i__8203__auto___19115 < len__8202__auto___19114)){
args19111.push((arguments[i__8203__auto___19115]));

var G__19116 = (i__8203__auto___19115 + (1));
i__8203__auto___19115 = G__19116;
continue;
} else {
}
break;
}

var G__19113 = args19111.length;
switch (G__19113) {
case 3:
return weathergen.math.fractal_field.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 5:
return weathergen.math.fractal_field.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19111.length)].join('')));

}
});

weathergen.math.fractal_field.cljs$core$IFn$_invoke$arity$3 = (function (x,y,zoom){
return weathergen.math.fractal_field.cljs$core$IFn$_invoke$arity$5(x,y,zoom,(1),1.0);
});

weathergen.math.fractal_field.cljs$core$IFn$_invoke$arity$5 = (function (x,y,zoom,seed,floor){
var result = (0);
var z = zoom;
while(true){
if((z < floor)){
return result;
} else {
var G__19118 = (result + (weathergen.math.continuous_noise_field.cljs$core$IFn$_invoke$arity$3((x / z),(y / z),seed) * ((z / zoom) / 2.0)));
var G__19119 = (z / (2));
result = G__19118;
z = G__19119;
continue;
}
break;
}
});

weathergen.math.fractal_field.cljs$lang$maxFixedArity = 5;

weathergen.math.magnitude = (function weathergen$math$magnitude(p__19120){
var vec__19125 = p__19120;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19125,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19125,(1),null);
var G__19128 = ((x * x) + (y * y));
return Math.sqrt(G__19128);
});
weathergen.math.heading = (function weathergen$math$heading(p__19129){
var vec__19133 = p__19129;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19133,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19133,(1),null);
return cljs.core.mod(((Math.atan2(x,y) * 180.0) / Math.PI),(360));
});
weathergen.math.gradient = (function weathergen$math$gradient(var_args){
var args19136 = [];
var len__8202__auto___19143 = arguments.length;
var i__8203__auto___19144 = (0);
while(true){
if((i__8203__auto___19144 < len__8202__auto___19143)){
args19136.push((arguments[i__8203__auto___19144]));

var G__19145 = (i__8203__auto___19144 + (1));
i__8203__auto___19144 = G__19145;
continue;
} else {
}
break;
}

var G__19138 = args19136.length;
switch (G__19138) {
case 4:
return weathergen.math.gradient.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return weathergen.math.gradient.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19136.length)].join('')));

}
});

weathergen.math.gradient.cljs$core$IFn$_invoke$arity$4 = (function (x,y,field,delta){
return weathergen.math.gradient.cljs$core$IFn$_invoke$arity$5(x,y,field,delta,(field.cljs$core$IFn$_invoke$arity$2 ? field.cljs$core$IFn$_invoke$arity$2(x,y) : field.call(null,x,y)));
});

weathergen.math.gradient.cljs$core$IFn$_invoke$arity$5 = (function (x,y,field,delta,f0){
var fx = (function (){var G__19139 = (x + delta);
var G__19140 = y;
return (field.cljs$core$IFn$_invoke$arity$2 ? field.cljs$core$IFn$_invoke$arity$2(G__19139,G__19140) : field.call(null,G__19139,G__19140));
})();
var fy = (function (){var G__19141 = x;
var G__19142 = (y + delta);
return (field.cljs$core$IFn$_invoke$arity$2 ? field.cljs$core$IFn$_invoke$arity$2(G__19141,G__19142) : field.call(null,G__19141,G__19142));
})();
var dfdx = ((fx - f0) / delta);
var dfdy = ((fy - f0) / delta);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dfdx,dfdy], null);
});

weathergen.math.gradient.cljs$lang$maxFixedArity = 5;

weathergen.math.clamp = (function weathergen$math$clamp(min,max,val){
if((val < min)){
return min;
} else {
if((max < val)){
return max;
} else {
return val;

}
}
});
/**
 * Round x to the nearest n. E.g. (nearest 10 15) => 20
 */
weathergen.math.nearest = (function weathergen$math$nearest(x,n){
return ((function (){var G__19148 = (x / n);
return Math.round(G__19148);
})() * n);
});
weathergen.math.scale = (function weathergen$math$scale(c,v){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__19149_SHARP_){
return (c * p1__19149_SHARP_);
}),v);
});
weathergen.math.deg__GT_rad = (function weathergen$math$deg__GT_rad(deg){
return ((deg * Math.PI) / 180.0);
});
weathergen.math.rotate = (function weathergen$math$rotate(deg,p__19150){
var vec__19154 = p__19150;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19154,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19154,(1),null);
var rad = weathergen.math.deg__GT_rad((- deg));
var cs = Math.cos(rad);
var sn = Math.sin(rad);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((x * cs) - (y * sn)),((x * sn) + (y * cs))], null);
});
weathergen.math.normalize = (function weathergen$math$normalize(v){
var m = weathergen.math.magnitude(v);
if((m === (0))){
return v;
} else {
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (m){
return (function (p1__19157_SHARP_){
return (p1__19157_SHARP_ / m);
});})(m))
,v);
}
});
/**
 * Map x via a sort of gamma-shaped distribution. Shape determines how
 *   close to the mean the values will cluster - lower values spread them
 *   out more. Values below one will actually make a U-shaped
 *   distribution, with values towards the min and max more likely.
 */
weathergen.math.distribute = (function weathergen$math$distribute(x,min,mean,max,shape){
var x1 = ((x * (2)) - (1));
var x2 = (function (){var G__19160 = Math.abs(x1);
var G__19161 = shape;
return Math.pow(G__19160,G__19161);
})();
if((x1 < (0))){
return ((((1) - x2) * (mean - min)) + min);
} else {
return ((x2 * (max - mean)) + mean);
}
});
/**
 * Take a number in the range [0,1], presumably normally distributed
 *   with a mean of 0.5, and 'spread' it so that the tails are thrown
 *   away and the remainder of the distribution stretched into it.
 *   `spread` determins the amount - zero does not change the
 *   distribution and 1 throws away all but the mean.
 */
weathergen.math.reject_tails = (function weathergen$math$reject_tails(spread,x){
var x1 = (((x - 0.5) * (2)) * ((1) / ((1) - spread)));
return ((weathergen.math.clamp((-1),(1),x1) / (2)) + 0.5);
});
