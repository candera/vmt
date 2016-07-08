// Compiled by ClojureScript 1.9.76 {:static-fns true, :optimize-constants true}
goog.provide('weathergen.fmap');
goog.require('cljs.core');
goog.require('weathergen.math');
goog.require('weathergen.model');
weathergen.fmap.byte_writer = (function weathergen$fmap$byte_writer(size){
var ab = (new ArrayBuffer(size));
var dv = (new DataView(ab));
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$size,size,cljs.core.cst$kw$array_DASH_buffer,ab,cljs.core.cst$kw$data_DASH_view,dv,cljs.core.cst$kw$position,(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)) : cljs.core.atom.call(null,(0)))], null);
});
weathergen.fmap.write_int32 = (function weathergen$fmap$write_int32(p__19539,x){
var map__19542 = p__19539;
var map__19542__$1 = ((((!((map__19542 == null)))?((((map__19542.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19542.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19542):map__19542);
var data_view = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19542__$1,cljs.core.cst$kw$data_DASH_view);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19542__$1,cljs.core.cst$kw$position);
data_view.setInt32((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(position) : cljs.core.deref.call(null,position)),x,true);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(position,((function (map__19542,map__19542__$1,data_view,position){
return (function (p1__19538_SHARP_){
return (p1__19538_SHARP_ + (4));
});})(map__19542,map__19542__$1,data_view,position))
);
});
weathergen.fmap.write_float32 = (function weathergen$fmap$write_float32(p__19545,x){
var map__19548 = p__19545;
var map__19548__$1 = ((((!((map__19548 == null)))?((((map__19548.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19548.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19548):map__19548);
var data_view = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19548__$1,cljs.core.cst$kw$data_DASH_view);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19548__$1,cljs.core.cst$kw$position);
data_view.setFloat32((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(position) : cljs.core.deref.call(null,position)),x,true);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(position,((function (map__19548,map__19548__$1,data_view,position){
return (function (p1__19544_SHARP_){
return (p1__19544_SHARP_ + (4));
});})(map__19548,map__19548__$1,data_view,position))
);
});
weathergen.fmap.blob = (function weathergen$fmap$blob(bw){
return (new Blob([cljs.core.cst$kw$array_DASH_buffer.cljs$core$IFn$_invoke$arity$1(bw)],{"type": "application/x-falcon-bms-fmap"}));
});
weathergen.fmap.weather_type = (function weathergen$fmap$weather_type(w){
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$sunny,(1),cljs.core.cst$kw$fair,(2),cljs.core.cst$kw$poor,(3),cljs.core.cst$kw$inclement,(4)], null).call(null,cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(w));
});
weathergen.fmap.pressure = (function weathergen$fmap$pressure(w){
return weathergen.math.nearest(weathergen.model.inhg__GT_mmhg(cljs.core.cst$kw$pressure.cljs$core$IFn$_invoke$arity$1(w)),(1));
});
weathergen.fmap.wind_speed = (function weathergen$fmap$wind_speed(w){
return weathergen.math.nearest(cljs.core.cst$kw$speed.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(w)),(1));
});
weathergen.fmap.wind_direction = (function weathergen$fmap$wind_direction(w){
return weathergen.math.nearest(cljs.core.cst$kw$heading.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$wind.cljs$core$IFn$_invoke$arity$1(w)),(1));
});
weathergen.fmap.temperature = (function weathergen$fmap$temperature(w){
return weathergen.math.nearest(cljs.core.cst$kw$temperature.cljs$core$IFn$_invoke$arity$1(w),0.1);
});
weathergen.fmap.get_blob = (function weathergen$fmap$get_blob(data,x_cells,y_cells){
var num_cells = (x_cells * y_cells);
var size = ((8) + (((4) * (5)) * num_cells));
var bw = weathergen.fmap.byte_writer(size);
weathergen.fmap.write_int32(bw,x_cells);

weathergen.fmap.write_int32(bw,y_cells);

var seq__19608_19666 = cljs.core.seq(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.fmap.weather_type,weathergen.fmap.write_int32], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.fmap.pressure,weathergen.fmap.write_float32], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.fmap.temperature,weathergen.fmap.write_float32], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.fmap.wind_speed,weathergen.fmap.write_float32], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.fmap.wind_direction,weathergen.fmap.write_float32], null)], null));
var chunk__19625_19667 = null;
var count__19626_19668 = (0);
var i__19627_19669 = (0);
while(true){
if((i__19627_19669 < count__19626_19668)){
var vec__19644_19670 = chunk__19625_19667.cljs$core$IIndexed$_nth$arity$2(null,i__19627_19669);
var f_19671 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19644_19670,(0),null);
var op_19672 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19644_19670,(1),null);
var seq__19628_19673 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(y_cells));
var chunk__19635_19674 = null;
var count__19636_19675 = (0);
var i__19637_19676 = (0);
while(true){
if((i__19637_19676 < count__19636_19675)){
var y_19677 = chunk__19635_19674.cljs$core$IIndexed$_nth$arity$2(null,i__19637_19676);
var seq__19638_19678 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(x_cells));
var chunk__19640_19679 = null;
var count__19641_19680 = (0);
var i__19642_19681 = (0);
while(true){
if((i__19642_19681 < count__19641_19680)){
var x_19682 = chunk__19640_19679.cljs$core$IIndexed$_nth$arity$2(null,i__19642_19681);
var w_19683 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19682,y_19677], null));
var G__19647_19684 = bw;
var G__19648_19685 = (f_19671.cljs$core$IFn$_invoke$arity$1 ? f_19671.cljs$core$IFn$_invoke$arity$1(w_19683) : f_19671.call(null,w_19683));
(op_19672.cljs$core$IFn$_invoke$arity$2 ? op_19672.cljs$core$IFn$_invoke$arity$2(G__19647_19684,G__19648_19685) : op_19672.call(null,G__19647_19684,G__19648_19685));

var G__19686 = seq__19638_19678;
var G__19687 = chunk__19640_19679;
var G__19688 = count__19641_19680;
var G__19689 = (i__19642_19681 + (1));
seq__19638_19678 = G__19686;
chunk__19640_19679 = G__19687;
count__19641_19680 = G__19688;
i__19642_19681 = G__19689;
continue;
} else {
var temp__6363__auto___19690 = cljs.core.seq(seq__19638_19678);
if(temp__6363__auto___19690){
var seq__19638_19691__$1 = temp__6363__auto___19690;
if(cljs.core.chunked_seq_QMARK_(seq__19638_19691__$1)){
var c__7922__auto___19692 = cljs.core.chunk_first(seq__19638_19691__$1);
var G__19693 = cljs.core.chunk_rest(seq__19638_19691__$1);
var G__19694 = c__7922__auto___19692;
var G__19695 = cljs.core.count(c__7922__auto___19692);
var G__19696 = (0);
seq__19638_19678 = G__19693;
chunk__19640_19679 = G__19694;
count__19641_19680 = G__19695;
i__19642_19681 = G__19696;
continue;
} else {
var x_19697 = cljs.core.first(seq__19638_19691__$1);
var w_19698 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19697,y_19677], null));
var G__19649_19699 = bw;
var G__19650_19700 = (f_19671.cljs$core$IFn$_invoke$arity$1 ? f_19671.cljs$core$IFn$_invoke$arity$1(w_19698) : f_19671.call(null,w_19698));
(op_19672.cljs$core$IFn$_invoke$arity$2 ? op_19672.cljs$core$IFn$_invoke$arity$2(G__19649_19699,G__19650_19700) : op_19672.call(null,G__19649_19699,G__19650_19700));

var G__19701 = cljs.core.next(seq__19638_19691__$1);
var G__19702 = null;
var G__19703 = (0);
var G__19704 = (0);
seq__19638_19678 = G__19701;
chunk__19640_19679 = G__19702;
count__19641_19680 = G__19703;
i__19642_19681 = G__19704;
continue;
}
} else {
}
}
break;
}

var G__19705 = seq__19628_19673;
var G__19706 = chunk__19635_19674;
var G__19707 = count__19636_19675;
var G__19708 = (i__19637_19676 + (1));
seq__19628_19673 = G__19705;
chunk__19635_19674 = G__19706;
count__19636_19675 = G__19707;
i__19637_19676 = G__19708;
continue;
} else {
var temp__6363__auto___19709 = cljs.core.seq(seq__19628_19673);
if(temp__6363__auto___19709){
var seq__19628_19710__$1 = temp__6363__auto___19709;
if(cljs.core.chunked_seq_QMARK_(seq__19628_19710__$1)){
var c__7922__auto___19711 = cljs.core.chunk_first(seq__19628_19710__$1);
var G__19712 = cljs.core.chunk_rest(seq__19628_19710__$1);
var G__19713 = c__7922__auto___19711;
var G__19714 = cljs.core.count(c__7922__auto___19711);
var G__19715 = (0);
seq__19628_19673 = G__19712;
chunk__19635_19674 = G__19713;
count__19636_19675 = G__19714;
i__19637_19676 = G__19715;
continue;
} else {
var y_19716 = cljs.core.first(seq__19628_19710__$1);
var seq__19629_19717 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(x_cells));
var chunk__19631_19718 = null;
var count__19632_19719 = (0);
var i__19633_19720 = (0);
while(true){
if((i__19633_19720 < count__19632_19719)){
var x_19721 = chunk__19631_19718.cljs$core$IIndexed$_nth$arity$2(null,i__19633_19720);
var w_19722 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19721,y_19716], null));
var G__19651_19723 = bw;
var G__19652_19724 = (f_19671.cljs$core$IFn$_invoke$arity$1 ? f_19671.cljs$core$IFn$_invoke$arity$1(w_19722) : f_19671.call(null,w_19722));
(op_19672.cljs$core$IFn$_invoke$arity$2 ? op_19672.cljs$core$IFn$_invoke$arity$2(G__19651_19723,G__19652_19724) : op_19672.call(null,G__19651_19723,G__19652_19724));

var G__19725 = seq__19629_19717;
var G__19726 = chunk__19631_19718;
var G__19727 = count__19632_19719;
var G__19728 = (i__19633_19720 + (1));
seq__19629_19717 = G__19725;
chunk__19631_19718 = G__19726;
count__19632_19719 = G__19727;
i__19633_19720 = G__19728;
continue;
} else {
var temp__6363__auto___19729__$1 = cljs.core.seq(seq__19629_19717);
if(temp__6363__auto___19729__$1){
var seq__19629_19730__$1 = temp__6363__auto___19729__$1;
if(cljs.core.chunked_seq_QMARK_(seq__19629_19730__$1)){
var c__7922__auto___19731 = cljs.core.chunk_first(seq__19629_19730__$1);
var G__19732 = cljs.core.chunk_rest(seq__19629_19730__$1);
var G__19733 = c__7922__auto___19731;
var G__19734 = cljs.core.count(c__7922__auto___19731);
var G__19735 = (0);
seq__19629_19717 = G__19732;
chunk__19631_19718 = G__19733;
count__19632_19719 = G__19734;
i__19633_19720 = G__19735;
continue;
} else {
var x_19736 = cljs.core.first(seq__19629_19730__$1);
var w_19737 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19736,y_19716], null));
var G__19653_19738 = bw;
var G__19654_19739 = (f_19671.cljs$core$IFn$_invoke$arity$1 ? f_19671.cljs$core$IFn$_invoke$arity$1(w_19737) : f_19671.call(null,w_19737));
(op_19672.cljs$core$IFn$_invoke$arity$2 ? op_19672.cljs$core$IFn$_invoke$arity$2(G__19653_19738,G__19654_19739) : op_19672.call(null,G__19653_19738,G__19654_19739));

var G__19740 = cljs.core.next(seq__19629_19730__$1);
var G__19741 = null;
var G__19742 = (0);
var G__19743 = (0);
seq__19629_19717 = G__19740;
chunk__19631_19718 = G__19741;
count__19632_19719 = G__19742;
i__19633_19720 = G__19743;
continue;
}
} else {
}
}
break;
}

var G__19744 = cljs.core.next(seq__19628_19710__$1);
var G__19745 = null;
var G__19746 = (0);
var G__19747 = (0);
seq__19628_19673 = G__19744;
chunk__19635_19674 = G__19745;
count__19636_19675 = G__19746;
i__19637_19676 = G__19747;
continue;
}
} else {
}
}
break;
}

var G__19748 = seq__19608_19666;
var G__19749 = chunk__19625_19667;
var G__19750 = count__19626_19668;
var G__19751 = (i__19627_19669 + (1));
seq__19608_19666 = G__19748;
chunk__19625_19667 = G__19749;
count__19626_19668 = G__19750;
i__19627_19669 = G__19751;
continue;
} else {
var temp__6363__auto___19752 = cljs.core.seq(seq__19608_19666);
if(temp__6363__auto___19752){
var seq__19608_19753__$1 = temp__6363__auto___19752;
if(cljs.core.chunked_seq_QMARK_(seq__19608_19753__$1)){
var c__7922__auto___19754 = cljs.core.chunk_first(seq__19608_19753__$1);
var G__19755 = cljs.core.chunk_rest(seq__19608_19753__$1);
var G__19756 = c__7922__auto___19754;
var G__19757 = cljs.core.count(c__7922__auto___19754);
var G__19758 = (0);
seq__19608_19666 = G__19755;
chunk__19625_19667 = G__19756;
count__19626_19668 = G__19757;
i__19627_19669 = G__19758;
continue;
} else {
var vec__19655_19759 = cljs.core.first(seq__19608_19753__$1);
var f_19760 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19655_19759,(0),null);
var op_19761 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19655_19759,(1),null);
var seq__19609_19762 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(y_cells));
var chunk__19616_19763 = null;
var count__19617_19764 = (0);
var i__19618_19765 = (0);
while(true){
if((i__19618_19765 < count__19617_19764)){
var y_19766 = chunk__19616_19763.cljs$core$IIndexed$_nth$arity$2(null,i__19618_19765);
var seq__19619_19767 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(x_cells));
var chunk__19621_19768 = null;
var count__19622_19769 = (0);
var i__19623_19770 = (0);
while(true){
if((i__19623_19770 < count__19622_19769)){
var x_19771 = chunk__19621_19768.cljs$core$IIndexed$_nth$arity$2(null,i__19623_19770);
var w_19772 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19771,y_19766], null));
var G__19658_19773 = bw;
var G__19659_19774 = (f_19760.cljs$core$IFn$_invoke$arity$1 ? f_19760.cljs$core$IFn$_invoke$arity$1(w_19772) : f_19760.call(null,w_19772));
(op_19761.cljs$core$IFn$_invoke$arity$2 ? op_19761.cljs$core$IFn$_invoke$arity$2(G__19658_19773,G__19659_19774) : op_19761.call(null,G__19658_19773,G__19659_19774));

var G__19775 = seq__19619_19767;
var G__19776 = chunk__19621_19768;
var G__19777 = count__19622_19769;
var G__19778 = (i__19623_19770 + (1));
seq__19619_19767 = G__19775;
chunk__19621_19768 = G__19776;
count__19622_19769 = G__19777;
i__19623_19770 = G__19778;
continue;
} else {
var temp__6363__auto___19779__$1 = cljs.core.seq(seq__19619_19767);
if(temp__6363__auto___19779__$1){
var seq__19619_19780__$1 = temp__6363__auto___19779__$1;
if(cljs.core.chunked_seq_QMARK_(seq__19619_19780__$1)){
var c__7922__auto___19781 = cljs.core.chunk_first(seq__19619_19780__$1);
var G__19782 = cljs.core.chunk_rest(seq__19619_19780__$1);
var G__19783 = c__7922__auto___19781;
var G__19784 = cljs.core.count(c__7922__auto___19781);
var G__19785 = (0);
seq__19619_19767 = G__19782;
chunk__19621_19768 = G__19783;
count__19622_19769 = G__19784;
i__19623_19770 = G__19785;
continue;
} else {
var x_19786 = cljs.core.first(seq__19619_19780__$1);
var w_19787 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19786,y_19766], null));
var G__19660_19788 = bw;
var G__19661_19789 = (f_19760.cljs$core$IFn$_invoke$arity$1 ? f_19760.cljs$core$IFn$_invoke$arity$1(w_19787) : f_19760.call(null,w_19787));
(op_19761.cljs$core$IFn$_invoke$arity$2 ? op_19761.cljs$core$IFn$_invoke$arity$2(G__19660_19788,G__19661_19789) : op_19761.call(null,G__19660_19788,G__19661_19789));

var G__19790 = cljs.core.next(seq__19619_19780__$1);
var G__19791 = null;
var G__19792 = (0);
var G__19793 = (0);
seq__19619_19767 = G__19790;
chunk__19621_19768 = G__19791;
count__19622_19769 = G__19792;
i__19623_19770 = G__19793;
continue;
}
} else {
}
}
break;
}

var G__19794 = seq__19609_19762;
var G__19795 = chunk__19616_19763;
var G__19796 = count__19617_19764;
var G__19797 = (i__19618_19765 + (1));
seq__19609_19762 = G__19794;
chunk__19616_19763 = G__19795;
count__19617_19764 = G__19796;
i__19618_19765 = G__19797;
continue;
} else {
var temp__6363__auto___19798__$1 = cljs.core.seq(seq__19609_19762);
if(temp__6363__auto___19798__$1){
var seq__19609_19799__$1 = temp__6363__auto___19798__$1;
if(cljs.core.chunked_seq_QMARK_(seq__19609_19799__$1)){
var c__7922__auto___19800 = cljs.core.chunk_first(seq__19609_19799__$1);
var G__19801 = cljs.core.chunk_rest(seq__19609_19799__$1);
var G__19802 = c__7922__auto___19800;
var G__19803 = cljs.core.count(c__7922__auto___19800);
var G__19804 = (0);
seq__19609_19762 = G__19801;
chunk__19616_19763 = G__19802;
count__19617_19764 = G__19803;
i__19618_19765 = G__19804;
continue;
} else {
var y_19805 = cljs.core.first(seq__19609_19799__$1);
var seq__19610_19806 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(x_cells));
var chunk__19612_19807 = null;
var count__19613_19808 = (0);
var i__19614_19809 = (0);
while(true){
if((i__19614_19809 < count__19613_19808)){
var x_19810 = chunk__19612_19807.cljs$core$IIndexed$_nth$arity$2(null,i__19614_19809);
var w_19811 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19810,y_19805], null));
var G__19662_19812 = bw;
var G__19663_19813 = (f_19760.cljs$core$IFn$_invoke$arity$1 ? f_19760.cljs$core$IFn$_invoke$arity$1(w_19811) : f_19760.call(null,w_19811));
(op_19761.cljs$core$IFn$_invoke$arity$2 ? op_19761.cljs$core$IFn$_invoke$arity$2(G__19662_19812,G__19663_19813) : op_19761.call(null,G__19662_19812,G__19663_19813));

var G__19814 = seq__19610_19806;
var G__19815 = chunk__19612_19807;
var G__19816 = count__19613_19808;
var G__19817 = (i__19614_19809 + (1));
seq__19610_19806 = G__19814;
chunk__19612_19807 = G__19815;
count__19613_19808 = G__19816;
i__19614_19809 = G__19817;
continue;
} else {
var temp__6363__auto___19818__$2 = cljs.core.seq(seq__19610_19806);
if(temp__6363__auto___19818__$2){
var seq__19610_19819__$1 = temp__6363__auto___19818__$2;
if(cljs.core.chunked_seq_QMARK_(seq__19610_19819__$1)){
var c__7922__auto___19820 = cljs.core.chunk_first(seq__19610_19819__$1);
var G__19821 = cljs.core.chunk_rest(seq__19610_19819__$1);
var G__19822 = c__7922__auto___19820;
var G__19823 = cljs.core.count(c__7922__auto___19820);
var G__19824 = (0);
seq__19610_19806 = G__19821;
chunk__19612_19807 = G__19822;
count__19613_19808 = G__19823;
i__19614_19809 = G__19824;
continue;
} else {
var x_19825 = cljs.core.first(seq__19610_19819__$1);
var w_19826 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19825,y_19805], null));
var G__19664_19827 = bw;
var G__19665_19828 = (f_19760.cljs$core$IFn$_invoke$arity$1 ? f_19760.cljs$core$IFn$_invoke$arity$1(w_19826) : f_19760.call(null,w_19826));
(op_19761.cljs$core$IFn$_invoke$arity$2 ? op_19761.cljs$core$IFn$_invoke$arity$2(G__19664_19827,G__19665_19828) : op_19761.call(null,G__19664_19827,G__19665_19828));

var G__19829 = cljs.core.next(seq__19610_19819__$1);
var G__19830 = null;
var G__19831 = (0);
var G__19832 = (0);
seq__19610_19806 = G__19829;
chunk__19612_19807 = G__19830;
count__19613_19808 = G__19831;
i__19614_19809 = G__19832;
continue;
}
} else {
}
}
break;
}

var G__19833 = cljs.core.next(seq__19609_19799__$1);
var G__19834 = null;
var G__19835 = (0);
var G__19836 = (0);
seq__19609_19762 = G__19833;
chunk__19616_19763 = G__19834;
count__19617_19764 = G__19835;
i__19618_19765 = G__19836;
continue;
}
} else {
}
}
break;
}

var G__19837 = cljs.core.next(seq__19608_19753__$1);
var G__19838 = null;
var G__19839 = (0);
var G__19840 = (0);
seq__19608_19666 = G__19837;
chunk__19625_19667 = G__19838;
count__19626_19668 = G__19839;
i__19627_19669 = G__19840;
continue;
}
} else {
}
}
break;
}

return weathergen.fmap.blob(bw);
});
