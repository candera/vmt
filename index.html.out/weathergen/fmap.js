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
weathergen.fmap.write_int32 = (function weathergen$fmap$write_int32(p__19479,x){
var map__19482 = p__19479;
var map__19482__$1 = ((((!((map__19482 == null)))?((((map__19482.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19482.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19482):map__19482);
var data_view = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19482__$1,cljs.core.cst$kw$data_DASH_view);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19482__$1,cljs.core.cst$kw$position);
data_view.setInt32((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(position) : cljs.core.deref.call(null,position)),x,true);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(position,((function (map__19482,map__19482__$1,data_view,position){
return (function (p1__19478_SHARP_){
return (p1__19478_SHARP_ + (4));
});})(map__19482,map__19482__$1,data_view,position))
);
});
weathergen.fmap.write_float32 = (function weathergen$fmap$write_float32(p__19485,x){
var map__19488 = p__19485;
var map__19488__$1 = ((((!((map__19488 == null)))?((((map__19488.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19488.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19488):map__19488);
var data_view = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19488__$1,cljs.core.cst$kw$data_DASH_view);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19488__$1,cljs.core.cst$kw$position);
data_view.setFloat32((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(position) : cljs.core.deref.call(null,position)),x,true);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(position,((function (map__19488,map__19488__$1,data_view,position){
return (function (p1__19484_SHARP_){
return (p1__19484_SHARP_ + (4));
});})(map__19488,map__19488__$1,data_view,position))
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

var seq__19548_19606 = cljs.core.seq(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.fmap.weather_type,weathergen.fmap.write_int32], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.fmap.pressure,weathergen.fmap.write_float32], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.fmap.temperature,weathergen.fmap.write_float32], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.fmap.wind_speed,weathergen.fmap.write_float32], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [weathergen.fmap.wind_direction,weathergen.fmap.write_float32], null)], null));
var chunk__19565_19607 = null;
var count__19566_19608 = (0);
var i__19567_19609 = (0);
while(true){
if((i__19567_19609 < count__19566_19608)){
var vec__19584_19610 = chunk__19565_19607.cljs$core$IIndexed$_nth$arity$2(null,i__19567_19609);
var f_19611 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19584_19610,(0),null);
var op_19612 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19584_19610,(1),null);
var seq__19568_19613 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(y_cells));
var chunk__19575_19614 = null;
var count__19576_19615 = (0);
var i__19577_19616 = (0);
while(true){
if((i__19577_19616 < count__19576_19615)){
var y_19617 = chunk__19575_19614.cljs$core$IIndexed$_nth$arity$2(null,i__19577_19616);
var seq__19578_19618 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(x_cells));
var chunk__19580_19619 = null;
var count__19581_19620 = (0);
var i__19582_19621 = (0);
while(true){
if((i__19582_19621 < count__19581_19620)){
var x_19622 = chunk__19580_19619.cljs$core$IIndexed$_nth$arity$2(null,i__19582_19621);
var w_19623 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19622,y_19617], null));
var G__19587_19624 = bw;
var G__19588_19625 = (f_19611.cljs$core$IFn$_invoke$arity$1 ? f_19611.cljs$core$IFn$_invoke$arity$1(w_19623) : f_19611.call(null,w_19623));
(op_19612.cljs$core$IFn$_invoke$arity$2 ? op_19612.cljs$core$IFn$_invoke$arity$2(G__19587_19624,G__19588_19625) : op_19612.call(null,G__19587_19624,G__19588_19625));

var G__19626 = seq__19578_19618;
var G__19627 = chunk__19580_19619;
var G__19628 = count__19581_19620;
var G__19629 = (i__19582_19621 + (1));
seq__19578_19618 = G__19626;
chunk__19580_19619 = G__19627;
count__19581_19620 = G__19628;
i__19582_19621 = G__19629;
continue;
} else {
var temp__6363__auto___19630 = cljs.core.seq(seq__19578_19618);
if(temp__6363__auto___19630){
var seq__19578_19631__$1 = temp__6363__auto___19630;
if(cljs.core.chunked_seq_QMARK_(seq__19578_19631__$1)){
var c__7922__auto___19632 = cljs.core.chunk_first(seq__19578_19631__$1);
var G__19633 = cljs.core.chunk_rest(seq__19578_19631__$1);
var G__19634 = c__7922__auto___19632;
var G__19635 = cljs.core.count(c__7922__auto___19632);
var G__19636 = (0);
seq__19578_19618 = G__19633;
chunk__19580_19619 = G__19634;
count__19581_19620 = G__19635;
i__19582_19621 = G__19636;
continue;
} else {
var x_19637 = cljs.core.first(seq__19578_19631__$1);
var w_19638 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19637,y_19617], null));
var G__19589_19639 = bw;
var G__19590_19640 = (f_19611.cljs$core$IFn$_invoke$arity$1 ? f_19611.cljs$core$IFn$_invoke$arity$1(w_19638) : f_19611.call(null,w_19638));
(op_19612.cljs$core$IFn$_invoke$arity$2 ? op_19612.cljs$core$IFn$_invoke$arity$2(G__19589_19639,G__19590_19640) : op_19612.call(null,G__19589_19639,G__19590_19640));

var G__19641 = cljs.core.next(seq__19578_19631__$1);
var G__19642 = null;
var G__19643 = (0);
var G__19644 = (0);
seq__19578_19618 = G__19641;
chunk__19580_19619 = G__19642;
count__19581_19620 = G__19643;
i__19582_19621 = G__19644;
continue;
}
} else {
}
}
break;
}

var G__19645 = seq__19568_19613;
var G__19646 = chunk__19575_19614;
var G__19647 = count__19576_19615;
var G__19648 = (i__19577_19616 + (1));
seq__19568_19613 = G__19645;
chunk__19575_19614 = G__19646;
count__19576_19615 = G__19647;
i__19577_19616 = G__19648;
continue;
} else {
var temp__6363__auto___19649 = cljs.core.seq(seq__19568_19613);
if(temp__6363__auto___19649){
var seq__19568_19650__$1 = temp__6363__auto___19649;
if(cljs.core.chunked_seq_QMARK_(seq__19568_19650__$1)){
var c__7922__auto___19651 = cljs.core.chunk_first(seq__19568_19650__$1);
var G__19652 = cljs.core.chunk_rest(seq__19568_19650__$1);
var G__19653 = c__7922__auto___19651;
var G__19654 = cljs.core.count(c__7922__auto___19651);
var G__19655 = (0);
seq__19568_19613 = G__19652;
chunk__19575_19614 = G__19653;
count__19576_19615 = G__19654;
i__19577_19616 = G__19655;
continue;
} else {
var y_19656 = cljs.core.first(seq__19568_19650__$1);
var seq__19569_19657 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(x_cells));
var chunk__19571_19658 = null;
var count__19572_19659 = (0);
var i__19573_19660 = (0);
while(true){
if((i__19573_19660 < count__19572_19659)){
var x_19661 = chunk__19571_19658.cljs$core$IIndexed$_nth$arity$2(null,i__19573_19660);
var w_19662 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19661,y_19656], null));
var G__19591_19663 = bw;
var G__19592_19664 = (f_19611.cljs$core$IFn$_invoke$arity$1 ? f_19611.cljs$core$IFn$_invoke$arity$1(w_19662) : f_19611.call(null,w_19662));
(op_19612.cljs$core$IFn$_invoke$arity$2 ? op_19612.cljs$core$IFn$_invoke$arity$2(G__19591_19663,G__19592_19664) : op_19612.call(null,G__19591_19663,G__19592_19664));

var G__19665 = seq__19569_19657;
var G__19666 = chunk__19571_19658;
var G__19667 = count__19572_19659;
var G__19668 = (i__19573_19660 + (1));
seq__19569_19657 = G__19665;
chunk__19571_19658 = G__19666;
count__19572_19659 = G__19667;
i__19573_19660 = G__19668;
continue;
} else {
var temp__6363__auto___19669__$1 = cljs.core.seq(seq__19569_19657);
if(temp__6363__auto___19669__$1){
var seq__19569_19670__$1 = temp__6363__auto___19669__$1;
if(cljs.core.chunked_seq_QMARK_(seq__19569_19670__$1)){
var c__7922__auto___19671 = cljs.core.chunk_first(seq__19569_19670__$1);
var G__19672 = cljs.core.chunk_rest(seq__19569_19670__$1);
var G__19673 = c__7922__auto___19671;
var G__19674 = cljs.core.count(c__7922__auto___19671);
var G__19675 = (0);
seq__19569_19657 = G__19672;
chunk__19571_19658 = G__19673;
count__19572_19659 = G__19674;
i__19573_19660 = G__19675;
continue;
} else {
var x_19676 = cljs.core.first(seq__19569_19670__$1);
var w_19677 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19676,y_19656], null));
var G__19593_19678 = bw;
var G__19594_19679 = (f_19611.cljs$core$IFn$_invoke$arity$1 ? f_19611.cljs$core$IFn$_invoke$arity$1(w_19677) : f_19611.call(null,w_19677));
(op_19612.cljs$core$IFn$_invoke$arity$2 ? op_19612.cljs$core$IFn$_invoke$arity$2(G__19593_19678,G__19594_19679) : op_19612.call(null,G__19593_19678,G__19594_19679));

var G__19680 = cljs.core.next(seq__19569_19670__$1);
var G__19681 = null;
var G__19682 = (0);
var G__19683 = (0);
seq__19569_19657 = G__19680;
chunk__19571_19658 = G__19681;
count__19572_19659 = G__19682;
i__19573_19660 = G__19683;
continue;
}
} else {
}
}
break;
}

var G__19684 = cljs.core.next(seq__19568_19650__$1);
var G__19685 = null;
var G__19686 = (0);
var G__19687 = (0);
seq__19568_19613 = G__19684;
chunk__19575_19614 = G__19685;
count__19576_19615 = G__19686;
i__19577_19616 = G__19687;
continue;
}
} else {
}
}
break;
}

var G__19688 = seq__19548_19606;
var G__19689 = chunk__19565_19607;
var G__19690 = count__19566_19608;
var G__19691 = (i__19567_19609 + (1));
seq__19548_19606 = G__19688;
chunk__19565_19607 = G__19689;
count__19566_19608 = G__19690;
i__19567_19609 = G__19691;
continue;
} else {
var temp__6363__auto___19692 = cljs.core.seq(seq__19548_19606);
if(temp__6363__auto___19692){
var seq__19548_19693__$1 = temp__6363__auto___19692;
if(cljs.core.chunked_seq_QMARK_(seq__19548_19693__$1)){
var c__7922__auto___19694 = cljs.core.chunk_first(seq__19548_19693__$1);
var G__19695 = cljs.core.chunk_rest(seq__19548_19693__$1);
var G__19696 = c__7922__auto___19694;
var G__19697 = cljs.core.count(c__7922__auto___19694);
var G__19698 = (0);
seq__19548_19606 = G__19695;
chunk__19565_19607 = G__19696;
count__19566_19608 = G__19697;
i__19567_19609 = G__19698;
continue;
} else {
var vec__19595_19699 = cljs.core.first(seq__19548_19693__$1);
var f_19700 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19595_19699,(0),null);
var op_19701 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19595_19699,(1),null);
var seq__19549_19702 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(y_cells));
var chunk__19556_19703 = null;
var count__19557_19704 = (0);
var i__19558_19705 = (0);
while(true){
if((i__19558_19705 < count__19557_19704)){
var y_19706 = chunk__19556_19703.cljs$core$IIndexed$_nth$arity$2(null,i__19558_19705);
var seq__19559_19707 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(x_cells));
var chunk__19561_19708 = null;
var count__19562_19709 = (0);
var i__19563_19710 = (0);
while(true){
if((i__19563_19710 < count__19562_19709)){
var x_19711 = chunk__19561_19708.cljs$core$IIndexed$_nth$arity$2(null,i__19563_19710);
var w_19712 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19711,y_19706], null));
var G__19598_19713 = bw;
var G__19599_19714 = (f_19700.cljs$core$IFn$_invoke$arity$1 ? f_19700.cljs$core$IFn$_invoke$arity$1(w_19712) : f_19700.call(null,w_19712));
(op_19701.cljs$core$IFn$_invoke$arity$2 ? op_19701.cljs$core$IFn$_invoke$arity$2(G__19598_19713,G__19599_19714) : op_19701.call(null,G__19598_19713,G__19599_19714));

var G__19715 = seq__19559_19707;
var G__19716 = chunk__19561_19708;
var G__19717 = count__19562_19709;
var G__19718 = (i__19563_19710 + (1));
seq__19559_19707 = G__19715;
chunk__19561_19708 = G__19716;
count__19562_19709 = G__19717;
i__19563_19710 = G__19718;
continue;
} else {
var temp__6363__auto___19719__$1 = cljs.core.seq(seq__19559_19707);
if(temp__6363__auto___19719__$1){
var seq__19559_19720__$1 = temp__6363__auto___19719__$1;
if(cljs.core.chunked_seq_QMARK_(seq__19559_19720__$1)){
var c__7922__auto___19721 = cljs.core.chunk_first(seq__19559_19720__$1);
var G__19722 = cljs.core.chunk_rest(seq__19559_19720__$1);
var G__19723 = c__7922__auto___19721;
var G__19724 = cljs.core.count(c__7922__auto___19721);
var G__19725 = (0);
seq__19559_19707 = G__19722;
chunk__19561_19708 = G__19723;
count__19562_19709 = G__19724;
i__19563_19710 = G__19725;
continue;
} else {
var x_19726 = cljs.core.first(seq__19559_19720__$1);
var w_19727 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19726,y_19706], null));
var G__19600_19728 = bw;
var G__19601_19729 = (f_19700.cljs$core$IFn$_invoke$arity$1 ? f_19700.cljs$core$IFn$_invoke$arity$1(w_19727) : f_19700.call(null,w_19727));
(op_19701.cljs$core$IFn$_invoke$arity$2 ? op_19701.cljs$core$IFn$_invoke$arity$2(G__19600_19728,G__19601_19729) : op_19701.call(null,G__19600_19728,G__19601_19729));

var G__19730 = cljs.core.next(seq__19559_19720__$1);
var G__19731 = null;
var G__19732 = (0);
var G__19733 = (0);
seq__19559_19707 = G__19730;
chunk__19561_19708 = G__19731;
count__19562_19709 = G__19732;
i__19563_19710 = G__19733;
continue;
}
} else {
}
}
break;
}

var G__19734 = seq__19549_19702;
var G__19735 = chunk__19556_19703;
var G__19736 = count__19557_19704;
var G__19737 = (i__19558_19705 + (1));
seq__19549_19702 = G__19734;
chunk__19556_19703 = G__19735;
count__19557_19704 = G__19736;
i__19558_19705 = G__19737;
continue;
} else {
var temp__6363__auto___19738__$1 = cljs.core.seq(seq__19549_19702);
if(temp__6363__auto___19738__$1){
var seq__19549_19739__$1 = temp__6363__auto___19738__$1;
if(cljs.core.chunked_seq_QMARK_(seq__19549_19739__$1)){
var c__7922__auto___19740 = cljs.core.chunk_first(seq__19549_19739__$1);
var G__19741 = cljs.core.chunk_rest(seq__19549_19739__$1);
var G__19742 = c__7922__auto___19740;
var G__19743 = cljs.core.count(c__7922__auto___19740);
var G__19744 = (0);
seq__19549_19702 = G__19741;
chunk__19556_19703 = G__19742;
count__19557_19704 = G__19743;
i__19558_19705 = G__19744;
continue;
} else {
var y_19745 = cljs.core.first(seq__19549_19739__$1);
var seq__19550_19746 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(x_cells));
var chunk__19552_19747 = null;
var count__19553_19748 = (0);
var i__19554_19749 = (0);
while(true){
if((i__19554_19749 < count__19553_19748)){
var x_19750 = chunk__19552_19747.cljs$core$IIndexed$_nth$arity$2(null,i__19554_19749);
var w_19751 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19750,y_19745], null));
var G__19602_19752 = bw;
var G__19603_19753 = (f_19700.cljs$core$IFn$_invoke$arity$1 ? f_19700.cljs$core$IFn$_invoke$arity$1(w_19751) : f_19700.call(null,w_19751));
(op_19701.cljs$core$IFn$_invoke$arity$2 ? op_19701.cljs$core$IFn$_invoke$arity$2(G__19602_19752,G__19603_19753) : op_19701.call(null,G__19602_19752,G__19603_19753));

var G__19754 = seq__19550_19746;
var G__19755 = chunk__19552_19747;
var G__19756 = count__19553_19748;
var G__19757 = (i__19554_19749 + (1));
seq__19550_19746 = G__19754;
chunk__19552_19747 = G__19755;
count__19553_19748 = G__19756;
i__19554_19749 = G__19757;
continue;
} else {
var temp__6363__auto___19758__$2 = cljs.core.seq(seq__19550_19746);
if(temp__6363__auto___19758__$2){
var seq__19550_19759__$1 = temp__6363__auto___19758__$2;
if(cljs.core.chunked_seq_QMARK_(seq__19550_19759__$1)){
var c__7922__auto___19760 = cljs.core.chunk_first(seq__19550_19759__$1);
var G__19761 = cljs.core.chunk_rest(seq__19550_19759__$1);
var G__19762 = c__7922__auto___19760;
var G__19763 = cljs.core.count(c__7922__auto___19760);
var G__19764 = (0);
seq__19550_19746 = G__19761;
chunk__19552_19747 = G__19762;
count__19553_19748 = G__19763;
i__19554_19749 = G__19764;
continue;
} else {
var x_19765 = cljs.core.first(seq__19550_19759__$1);
var w_19766 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_19765,y_19745], null));
var G__19604_19767 = bw;
var G__19605_19768 = (f_19700.cljs$core$IFn$_invoke$arity$1 ? f_19700.cljs$core$IFn$_invoke$arity$1(w_19766) : f_19700.call(null,w_19766));
(op_19701.cljs$core$IFn$_invoke$arity$2 ? op_19701.cljs$core$IFn$_invoke$arity$2(G__19604_19767,G__19605_19768) : op_19701.call(null,G__19604_19767,G__19605_19768));

var G__19769 = cljs.core.next(seq__19550_19759__$1);
var G__19770 = null;
var G__19771 = (0);
var G__19772 = (0);
seq__19550_19746 = G__19769;
chunk__19552_19747 = G__19770;
count__19553_19748 = G__19771;
i__19554_19749 = G__19772;
continue;
}
} else {
}
}
break;
}

var G__19773 = cljs.core.next(seq__19549_19739__$1);
var G__19774 = null;
var G__19775 = (0);
var G__19776 = (0);
seq__19549_19702 = G__19773;
chunk__19556_19703 = G__19774;
count__19557_19704 = G__19775;
i__19558_19705 = G__19776;
continue;
}
} else {
}
}
break;
}

var G__19777 = cljs.core.next(seq__19548_19693__$1);
var G__19778 = null;
var G__19779 = (0);
var G__19780 = (0);
seq__19548_19606 = G__19777;
chunk__19565_19607 = G__19778;
count__19566_19608 = G__19779;
i__19567_19609 = G__19780;
continue;
}
} else {
}
}
break;
}

return weathergen.fmap.blob(bw);
});
