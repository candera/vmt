// Compiled by ClojureScript 1.9.76 {:static-fns true, :optimize-constants true}
goog.provide('hoplon.svg');
goog.require('cljs.core');
goog.require('hoplon.core');
hoplon.svg.make_svg_ctor = (function hoplon$svg$make_svg_ctor(tag){
var xmlns = "http://www.w3.org/2000/svg";
return ((function (xmlns){
return (function() { 
var G__14511__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(hoplon.core.ensure_kids_BANG_(document.createElementNS(xmlns,tag)),args);
};
var G__14511 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14512__i = 0, G__14512__a = new Array(arguments.length -  0);
while (G__14512__i < G__14512__a.length) {G__14512__a[G__14512__i] = arguments[G__14512__i + 0]; ++G__14512__i;}
  args = new cljs.core.IndexedSeq(G__14512__a,0);
} 
return G__14511__delegate.call(this,args);};
G__14511.cljs$lang$maxFixedArity = 0;
G__14511.cljs$lang$applyTo = (function (arglist__14513){
var args = cljs.core.seq(arglist__14513);
return G__14511__delegate(args);
});
G__14511.cljs$core$IFn$_invoke$arity$variadic = G__14511__delegate;
return G__14511;
})()
;
;})(xmlns))
});
hoplon.svg.a = hoplon.svg.make_svg_ctor("a");
hoplon.svg.altGlyph = hoplon.svg.make_svg_ctor("altGlyph");
hoplon.svg.altGlyphDef = hoplon.svg.make_svg_ctor("altGlyphDef");
hoplon.svg.altGlyphItem = hoplon.svg.make_svg_ctor("altGlyphItem");
hoplon.svg.animate = hoplon.svg.make_svg_ctor("animate");
hoplon.svg.animateColor = hoplon.svg.make_svg_ctor("animateColor");
hoplon.svg.animateMotion = hoplon.svg.make_svg_ctor("animateMotion");
hoplon.svg.animateTransform = hoplon.svg.make_svg_ctor("animateTransform");
hoplon.svg.circle = hoplon.svg.make_svg_ctor("circle");
hoplon.svg.clipPath = hoplon.svg.make_svg_ctor("clipPath");
hoplon.svg.color_profile = hoplon.svg.make_svg_ctor("color-profile");
hoplon.svg.cursor = hoplon.svg.make_svg_ctor("cursor");
hoplon.svg.defs = hoplon.svg.make_svg_ctor("defs");
hoplon.svg.desc = hoplon.svg.make_svg_ctor("desc");
hoplon.svg.ellipse = hoplon.svg.make_svg_ctor("ellipse");
hoplon.svg.feBlend = hoplon.svg.make_svg_ctor("feBlend");
hoplon.svg.feColorMatrix = hoplon.svg.make_svg_ctor("feColorMatrix");
hoplon.svg.feComponentTransfer = hoplon.svg.make_svg_ctor("feComponentTransfer");
hoplon.svg.feComposite = hoplon.svg.make_svg_ctor("feComposite");
hoplon.svg.feConvolveMatrix = hoplon.svg.make_svg_ctor("feConvolveMatrix");
hoplon.svg.feDiffuseLighting = hoplon.svg.make_svg_ctor("feDiffuseLighting");
hoplon.svg.feDisplacementMap = hoplon.svg.make_svg_ctor("feDisplacementMap");
hoplon.svg.feDistantLight = hoplon.svg.make_svg_ctor("feDistantLight");
hoplon.svg.feFlood = hoplon.svg.make_svg_ctor("feFlood");
hoplon.svg.feFuncA = hoplon.svg.make_svg_ctor("feFuncA");
hoplon.svg.feFuncB = hoplon.svg.make_svg_ctor("feFuncB");
hoplon.svg.feFuncG = hoplon.svg.make_svg_ctor("feFuncG");
hoplon.svg.feFuncR = hoplon.svg.make_svg_ctor("feFuncR");
hoplon.svg.feGaussianBlur = hoplon.svg.make_svg_ctor("feGaussianBlur");
hoplon.svg.feImage = hoplon.svg.make_svg_ctor("feImage");
hoplon.svg.feMerge = hoplon.svg.make_svg_ctor("feMerge");
hoplon.svg.feMergeNode = hoplon.svg.make_svg_ctor("feMergeNode");
hoplon.svg.feMorphology = hoplon.svg.make_svg_ctor("feMorphology");
hoplon.svg.feOffset = hoplon.svg.make_svg_ctor("feOffset");
hoplon.svg.fePointLight = hoplon.svg.make_svg_ctor("fePointLight");
hoplon.svg.feSpecularLighting = hoplon.svg.make_svg_ctor("feSpecularLighting");
hoplon.svg.feSpotLight = hoplon.svg.make_svg_ctor("feSpotLight");
hoplon.svg.feTile = hoplon.svg.make_svg_ctor("feTile");
hoplon.svg.feTurbulence = hoplon.svg.make_svg_ctor("feTurbulence");
hoplon.svg.filter = hoplon.svg.make_svg_ctor("filter");
hoplon.svg.font = hoplon.svg.make_svg_ctor("font");
hoplon.svg.font_face = hoplon.svg.make_svg_ctor("font-face");
hoplon.svg.font_face_format = hoplon.svg.make_svg_ctor("font-face-format");
hoplon.svg.font_face_name = hoplon.svg.make_svg_ctor("font-face-name");
hoplon.svg.font_face_src = hoplon.svg.make_svg_ctor("font-face-src");
hoplon.svg.font_face_uri = hoplon.svg.make_svg_ctor("font-face-uri");
hoplon.svg.foreignObject = hoplon.svg.make_svg_ctor("foreignObject");
hoplon.svg.g = hoplon.svg.make_svg_ctor("g");
hoplon.svg.glyph = hoplon.svg.make_svg_ctor("glyph");
hoplon.svg.glyphRef = hoplon.svg.make_svg_ctor("glyphRef");
hoplon.svg.hkern = hoplon.svg.make_svg_ctor("hkern");
hoplon.svg.image = hoplon.svg.make_svg_ctor("image");
hoplon.svg.line = hoplon.svg.make_svg_ctor("line");
hoplon.svg.linearGradient = hoplon.svg.make_svg_ctor("linearGradient");
hoplon.svg.marker = hoplon.svg.make_svg_ctor("marker");
hoplon.svg.mask = hoplon.svg.make_svg_ctor("mask");
hoplon.svg.metadata = hoplon.svg.make_svg_ctor("metadata");
hoplon.svg.missing_glyph = hoplon.svg.make_svg_ctor("missing-glyph");
hoplon.svg.mpath = hoplon.svg.make_svg_ctor("mpath");
hoplon.svg.path = hoplon.svg.make_svg_ctor("path");
hoplon.svg.pattern = hoplon.svg.make_svg_ctor("pattern");
hoplon.svg.polygon = hoplon.svg.make_svg_ctor("polygon");
hoplon.svg.polyline = hoplon.svg.make_svg_ctor("polyline");
hoplon.svg.radialGradient = hoplon.svg.make_svg_ctor("radialGradient");
hoplon.svg.rect = hoplon.svg.make_svg_ctor("rect");
hoplon.svg.script = hoplon.svg.make_svg_ctor("script");
hoplon.svg.set = hoplon.svg.make_svg_ctor("set");
hoplon.svg.stop = hoplon.svg.make_svg_ctor("stop");
hoplon.svg.style = hoplon.svg.make_svg_ctor("style");
hoplon.svg.svg = hoplon.svg.make_svg_ctor("svg");
hoplon.svg.switch$ = hoplon.svg.make_svg_ctor("switch");
hoplon.svg.symbol = hoplon.svg.make_svg_ctor("symbol");
hoplon.svg.text = hoplon.svg.make_svg_ctor("text");
hoplon.svg.textPath = hoplon.svg.make_svg_ctor("textPath");
hoplon.svg.title = hoplon.svg.make_svg_ctor("title");
hoplon.svg.tref = hoplon.svg.make_svg_ctor("tref");
hoplon.svg.tspan = hoplon.svg.make_svg_ctor("tspan");
hoplon.svg.use = hoplon.svg.make_svg_ctor("use");
hoplon.svg.view = hoplon.svg.make_svg_ctor("view");
hoplon.svg.vkern = hoplon.svg.make_svg_ctor("vkern");
