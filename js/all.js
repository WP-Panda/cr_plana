/**
 * DrSlider Version 0.9.4
 * Developed by devrama.com
 * 
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 *//* slider */
(function(e){var l=function(a,b){this.parent_width=this.height=this.width=void 0;this.num_slides=0;this.$very_current_slide=this.$sliders=this.current_slide=void 0;this.is_pause=!1;this.play_timer=!0;this.on_transition=this.active_timer=!1;this._$progress_bar=void 0;this.all_transitions="slide-left slide-right slide-top slide-bottom fade split split3d door wave-left wave-right wave-top wave-bottom".split(" ");this.requestFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){return window.setTimeout(a,1E3/60)};this.options={width:void 0,height:void 0,userCSS:!1,transitionSpeed:1E3,duration:4E3,showNavigation:!0,classNavigation:void 0,navigationColor:"#9F1F22",navigationHoverColor:"#D52B2F",navigationHighlightColor:"#DFDFDF",navigationNumberColor:"#000000",positionNavigation:"out-center-bottom",navigationType:"number",showControl:!0,classButtonNext:void 0,classButtonPrevious:void 0,controlColor:"#FFFFFF",controlBackgroundColor:"#000000",positionControl:"left-right",transition:"slide-left",showProgress:!0,progressColor:"#797979",pauseOnHover:!0,onReady:void 0};0==e("#devrama-css").length&&(0<e("html>head").length?e("html>head").append('\t\t\t\t\t<style id="devrama-css" type="text/css">\t\t\t\t\t.devrama-slider,\t\t\t\t\t.devrama-slider *,\t\t\t\t\t.devrama-slider *::before,\t\t\t\t\t.devrama-slider *::after{\t\t\t\t\t -webkit-box-sizing: border-box;\t\t\t\t\t    -moz-box-sizing: border-box;\t\t\t\t\t         box-sizing: border-box;\t\t\t\t\t}\t\t\t\t\t</style>\t\t\t\t\t'):e("body").append('\t\t\t\t\t<style id="devrama-css" type="text/css">\t\t\t\t\t.devrama-slider,\t\t\t\t\t.devrama-slider *,\t\t\t\t\t.devrama-slider *::before,\t\t\t\t\t.devrama-slider *::after{\t\t\t\t\t -webkit-box-sizing: border-box;\t\t\t\t\t    -moz-box-sizing: border-box;\t\t\t\t\t         box-sizing: border-box;\t\t\t\t\t}\t\t\t\t\t</style>\t\t\t\t\t'));e.extend(this.options,b);this.$ele=e(a);this.$ele.wrapInner('<div class="inner devrama-slider"><div class="projector"></div></div>');this.$ele_in=this.$ele.children(".inner:first");this.$ele_projector=this.$ele_in.children(".projector:first")};l.prototype={_init:function(){var a=this;this._stopTimer(function(){a._prepare(function(){if("function"==typeof a.options.onReady)a.options.onReady();a._playSlide();e(window).on("resize.DrSlider",function(){a._resize()})})});this.options.pauseOnHover&&(this.$ele_in.on("mouseenter",function(){a.is_pause=!0;a._showButtons()}),this.$ele_in.on("mouseleave",function(){a.is_pause=!1;a._hideButtons()}))},_getEndEvent:function(a){var b=["webkit","Moz","Ms","o","Khtml"];if(a in document.body.style)return a+"end";a=a.charAt(0).toUpperCase()+a.slice(1);for(var c=0;c<b.length;c++)if(b[c]+a in document.body.style)return b[c]+a+"End";return!1},_animate:function(a,b,c,d,f,g,h){var k;f||(f=0);k=a instanceof jQuery?a:e(a);if(0==k.length)"function"==typeof g&&setTimeout(function(){g()},f);else{"number"!=typeof d&&(d=0);"number"!=typeof f&&(f=0);var m;m=h?!1:this._getEndEvent("transition");!1!==m?(a=0,b&&(k.css(b),a=30),setTimeout(function(){var a=e.extend({},{"-webkit-transition":"all "+d+"ms ease "+f+"ms","-moz-transition":"all "+d+"ms ease "+f+"ms","-o-transition":"all "+d+"ms ease "+f+"ms",transition:"all "+d+"ms ease "+f+"ms"},c);k.css(a);k.one(m,function(){k.css({"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""});"function"==typeof g&&g()})},a)):setTimeout(function(){b&&k.css(b);k.animate(c,d,function(){g()})},f)}},_prepare:function(a){var b=this;this.parent_width=this.$ele.parent().width();"static"==this.$ele.css("position")&&this.$ele.css("position","relative");this.$ele.css({visibility:"hidden",width:"auto",height:"auto"});this.$ele_in.css({position:"relative",margin:"0 auto"});this.$ele_projector.css({position:"relative",overflow:"hidden"});var c=this.$ele_projector.children("[class!=slider-progress]");c.css({display:"none",position:"absolute",top:"0",left:"0"});this.$sliders=c;this.num_slides=this.$sliders.length;var d=[];this.$ele_projector.find("[data-lazy-src], [data-lazy-background]").each(function(){var a=e(this).data("lazy-src")||e(this).data("lazy-background");d.push(a)});this._preloadImages(d,function(){});this.$sliders.each(function(){if(!e(this).hasClass("slider-progress")&&!e(this).hasClass("button-slider")){var a=[],b=!0;e(this).data("lazy-background")?(e(this).addClass("primary-img background"),a.push(e(this).data("lazy-background"))):e(this).data("lazy-src")?(e(this).addClass("primary-img image"),e(this).css("vertical-align","bottom"),e(this).attr("src","data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="),a.push(e(this).data("lazy-src"))):1==e(this).children().length&&1==e(this).children("img").length?e(this).children("img[data-lazy-src]:first").addClass("primary-img image"):b=!1;e(this).find("[data-lazy-src]").each(function(){e(this).css("vertical-align","bottom");e(this).attr("src","data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");a.push(e(this).data("lazy-src"))});e(this).find("[data-lazy-background]").each(function(){a.push(e(this).data("lazy-background"))});e(this).data({"has-main-image":b,images:a});e(this).children("[data-pos]").css("display","none")}});if(this.options.width&&this.options.height)c={width:this.options.width,height:this.options.height},this.width=c.width,this.height=c.height,this.$ele_in.css(c),this.$ele_projector.css(c),1<b.num_slides&&b.options.showControl&&b._attachControl(),1<b.num_slides&&b.options.showNavigation&&b._attachNavigation(),b.options.classNavigation&&b._attachUserNavigation(),(b.options.classButtonPrevious||b.options.classButtonNext)&&b._attachUserControlEvent(),a();else{var f=new Image;f.onload=f.onerror=function(){var c={width:f.width,height:f.height};b.width=c.width;b.height=c.height;b.$ele_in.css(c);b.$ele_projector.css(c);1<b.num_slides&&b.options.showControl&&b._attachControl();1<b.num_slides&&b.options.showNavigation&&b._attachNavigation();b.options.classNavigation&&b._attachUserNavigation();(b.options.classButtonPrevious||b.options.classButtonNext)&&b._attachUserControlEvent();a()};f.src=this.$sliders.first().data("images")[0]}},_resetSize:function(a,b,c,d){var f={width:b,height:c},e,h;a?(e=a,h=a.find(".primary-img:first"),$prev_target1=this.$ele_projector.children(".active.primary-img:first"),$prev_target2=this.$ele_projector.children(".active").find(".primary-img:first")):(e=this.$ele_projector.children(".active"),h=this.$ele_projector.children(".active").find(".primary-img:first"));e.css(f);h.css(f);a?this.width!=b||this.height!=c?($prev_target1.animate(f),$prev_target2.animate(f),this.$ele_in.css(f),this.$ele_projector.animate(f,function(){"function"==typeof d&&d()})):"function"==typeof d&&d():(!0==this.on_transition&&this.$very_current_slide.css({display:"block",top:"0",left:"0","z-index":"5",width:b,height:c}),this.$ele_in.css(f),this.$ele_projector.css(f),"function"==typeof d&&d());this.width=b;this.height=c},_resize:function(a,b){this.parent_width=this.$ele.parent().width();var c,d;d=this.options.width&&this.options.height?{width:this.options.width,height:this.options.height}:a?a.data("original"):this.$ele_projector.children(".active").data("original");d.width>this.parent_width?(c=this.parent_width,d=c*d.height/d.width):(c=d.width,d=d.height);this._resetSize(a,c,d,b)},_attachUserControlEvent:function(){var a=this;if(this.options.classButtonPrevious)e("."+this.options.classButtonPrevious).on("click",function(b){b&&b.preventDefault();!1!=a.play_timer&&!0!=a.on_transition&&a._stopTimer(function(){a._startTimer(function(){a._prev()})})});if(this.options.classButtonNext)e("."+this.options.classButtonNext).on("click",function(b){b&&b.preventDefault();!1!=a.play_timer&&!0!=a.on_transition&&a._stopTimer(function(){a._startTimer(function(){a._next()})})})},_attachUserNavigation:function(){var a=this,b=e("."+this.options.classNavigation).find("[data-index]");0==b.length&&(b=e("."+this.options.classNavigation).children());b.on("click",function(c){c&&c.preventDefault();if(!1!=a.play_timer&&!0!=a.on_transition){b.removeClass("active");e(this).addClass("active");var d;e(this).data("index")&&""!=e(this).data("index")?(c=a.$ele_projector.children("[data-index='"+e(this).data("index")+"']").index(),d=0<c?c:e(this).data("index")):d=e(this).index();d!=a.current_slide&&!1!=a.play_timer&&!0!=a.on_transition&&a._stopTimer(function(){a.current_slide=0<d?d-1:a.num_slides-1;a._startTimer(function(){a._next()})})}})},_updateNavigation:function(){if(this.options.classNavigation){e("."+this.options.classNavigation).find(".active").removeClass("active");var a=this.$sliders.eq(this.current_slide).data("index");"undefined"!=typeof a&&""!=a?e("."+this.options.classNavigation).find("[data-index='"+a+"']").addClass("active"):(a=e("."+this.options.classNavigation).children().eq(this.current_slide).data("index"))&&""!=a||e("."+this.options.classNavigation).children().eq(this.current_slide).addClass("active")}this.$ele_projector.next(".navigation").find(".nav-link").removeClass("active");this.$ele_projector.next(".navigation").find(".nav-link.index"+this.current_slide).addClass("active");this.options.userCSS||(this.$ele_projector.next(".navigation").find(".nav-link").css({"background-color":this.options.navigationColor}),this.$ele_projector.next(".navigation").find(".nav-link.index"+this.current_slide).css({"background-color":this.options.navigationHighlightColor}))},_attachNavigation:function(){if(!(2>this.num_slides)){for(var a=this,b="",c=0;c<this.num_slides;c++)b+='<span class="nav-link index'+c+'" data-num="'+c+'">'+(c+1)+"</span>";this.$ele_projector.after('<div class="navigation devrama-slider"><div class="inner">'+b+"</div></div>");var d=this.options.positionNavigation,b=this.$ele_projector.next(".navigation"),c=b.find(".nav-link");b.css({"font-size":"12px","z-index":"3","user-select":"none"});if(!this.options.userCSS){c.css({display:"inline-block",width:"number"!=this.options.navigationType?"13px":"",height:"number"!=this.options.navigationType?"13px":"",padding:"0.2em","font-size":"12px","vertical-align":"bottom",cursor:"pointer",color:this.options.navigationNumberColor,"text-align":"center","text-indent":"number"!=this.options.navigationType?"-10000em":"",width:"number"==this.options.navigationType?c.innerHeight()+"px":"13px",border:"0px solid transparent","border-radius":"circle"==this.options.navigationType?"50%":"","margin-top":"in-left-middle"==d||"in-right-middle"==d?"5px":"","margin-left":"in-left-middle"!=d&&"in-right-middle"!=d?"5px":""});b.find(".nav-link:first").css({"margin-top":"0","margin-left":"0"});b.find(".nav-link:last").css({"margin-bottom":"0","margin-right":"0"});if("in-left-middle"==this.options.positionNavigation||"in-right-middle"==this.options.positionNavigation)b.children(".inner").css({width:c.outerWidth(!0)+"px"});else{var f=0;c.each(function(){f+=e(this).outerWidth(!0)});b.children(".inner").css({width:f+"px"})}var d={},g=b.outerHeight();switch(this.options.positionNavigation){case"out-center-top":case"out-left-top":case"out-right-top":b.css("margin","5px 0");this.$ele.css("padding-top",g+10+"px");d.top=-1*(g+10)+"px";break;case"out-center-bottom":case"out-left-bottom":case"out-right-bottom":d.top="100%";b.css("margin","5px 0");this.$ele.css("padding-bottom",g+10+"px");break;case"in-center-top":case"in-left-top":case"in-right-top":d.top="20px";break;case"in-center-bottom":case"in-left-bottom":case"in-right-bottom":case"out-right-bottom":d.bottom="20px";break;case"in-left-middle":case"in-right-middle":d.top="50%",d["margin-top"]=-1*g/2+"px"}switch(this.options.positionNavigation){case"out-left-top":case"out-left-bottom":case"in-left-top":case"in-left-bottom":case"in-left-middle":d.left="20px";break;case"out-center-top":case"out-center-bottom":case"in-center-top":case"in-center-bottom":d.left="50%";f&&(d["margin-left"]=-1*f/2+"px");break;case"out-right-top":case"out-right-bottom":case"in-right-top":case"in-right-bottom":case"in-right-middle":d.right="20px"}g={position:"absolute","z-index":"3"};e.extend(g,d);b.css(g);c.css({"background-color":a.options.navigationColor});b.find(".nav-link:first").css({"background-color":a.options.navigationHighlightColor});c.hover(function(){e(this).css({"background-color":a.options.navigationHoverColor})},function(){e(this).css({"background-color":e(this).data("num")==a.current_slide?a.options.navigationHighlightColor:a.options.navigationColor})})}c.on("click",function(b){b&&b.preventDefault();var c=e(this).data("num");c!=a.current_slide&&!1!=a.play_timer&&!0!=a.on_transition&&a._stopTimer(function(){a.current_slide=0<c?c-1:a.num_slides-1;a._startTimer(function(){a._next()})})})}},_attachControl:function(){var a=this;this.$ele_in.append('<div class="button-previous button-slider">&lsaquo;</div>');this.$ele_in.append('<div class="button-next button-slider">&rsaquo;</div>');this.$ele_in.children(".button-slider").css({display:"none","z-index":"10","user-select":"none"});if(!this.options.userCSS){this.$ele_in.children(".button-slider").css({position:"absolute",color:this.options.controlColor,"font-size":"50px","font-family":'"Helvetica Neue", Helvetica, Arial, sans-serif',"line-height":"0.65em","text-align":"center","background-color":this.options.controlBackgroundColor,opacity:"0.5",width:"40px",height:"40px","border-radius":"50%",cursor:"pointer"});var b,c;switch(this.options.positionControl){case"left-right":b={left:"10px",top:"50%","margin-top":"-20px"};c={right:"10px",top:"50%","margin-top":"-20px"};break;case"top-center":b={left:"50%",top:"10px","margin-left":"-50px"};c={left:"50%",top:"10px","margin-left":"10px"};break;case"bottom-center":b={left:"50%",bottom:"10px","margin-left":"-50px"};c={left:"50%",bottom:"10px","margin-left":"10px"};break;case"top-left":b={left:"10px",top:"10px"};c={left:"70px",top:"10px"};break;case"top-right":b={right:"70px",top:"10px"};c={right:"10px",top:"10px"};break;case"bottom-left":b={left:"10px",bottom:"10px"};c={left:"70px",bottom:"10px"};break;case"bottom-right":b={right:"70px",bottom:"10px"},c={right:"10px",bottom:"10px"}}this.$ele_in.children(".button-previous").css(b);this.$ele_in.children(".button-next").css(c)}this.$ele_in.children(".button-previous").on("click",function(b){b&&b.preventDefault();!1!=a.play_timer&&!0!=a.on_transition&&a._stopTimer(function(){a._startTimer(function(){a._prev(function(){a.is_pause=!0})})})});this.$ele_in.children(".button-next").on("click",function(b){b&&b.preventDefault();!1!=a.play_timer&&!0!=a.on_transition&&a._stopTimer(function(){a._startTimer(function(){a._next(function(){a.is_pause=!0})})})})},_showProgress:function(a){this.options.showProgress&&(0==this.$ele_in.children(".slider-progress").length&&(this.$ele_in.append('<div class="slider-progress"><div class="bar"></div></div>'),this._$progress_bar=this.$ele_in.find(".slider-progress:first .bar"),this.$ele_in.children(".slider-progress").css({"z-index":"4"}),this._$progress_bar.css({height:"100%"}),this.options.userCSS||(this.$ele_in.children(".slider-progress").css({position:"absolute",bottom:"0",left:"0",height:"1.5%",width:"100%","background-color":"transparent",opacity:"0.7"}),this._$progress_bar.css({width:"0%","background-color":this.options.progressColor}))),"undefined"!=typeof a&&this._$progress_bar.css("width",a+"%"))},_showButtons:function(){this.$ele_in.children(".button-slider").fadeIn()},_hideButtons:function(){this.$ele_in.children(".button-slider").fadeOut()},_playSlide:function(){var a=this;1<this.num_slides?this._startTimer(function(){a._next()}):this._next()},_stopTimer:function(a){var b=this;this.play_timer=!1;var c=setInterval(function(){!1==b.active_timer&&(clearInterval(c),"function"==typeof a&&a())},100)},_startTimer:function(a){var b=this;this.active_timer=this.play_timer=!0;var c=(new Date).getTime(),d=c+b.options.duration,f=0;this._showProgress(0);a();var e=function(){if(!1==b.play_timer)return b._showProgress(0),b.active_timer=!1;var a=(new Date).getTime();!0==b.is_pause||b.on_transition?0==f&&(f=a-c):(0<f&&(c=a-f,d=c+b.options.duration,f=0),a>d?(b._showProgress(100),c=(new Date).getTime(),d=c+b.options.duration,b._next(function(){b._showProgress(0)})):b._showProgress((a-c)/b.options.duration*100));b.requestFrame.call(window,e)};e()},_isLoadedImages:function(a,b,c,d){if("undefined"==typeof a||1>a.length)"function"==typeof b&&b();else{"undefined"==typeof c&&(c=0);"undefined"==typeof d&&(d=[]);var f=this,e=a[c],h=new Image;h.onload=h.onerror=function(){d.push({width:h.width,height:h.height});c==a.length-1&&"function"==typeof b?b(d):f._isLoadedImages(a,b,++c,d)};h.src=e}},_preloadImages:function(a,b){this._isLoadedImages(a,b)},_next:function(a){this.is_pause=this.on_transition=!0;var b;"undefined"==typeof this.current_slide?(this.current_slide=0,b=this.$sliders.eq(0)):(this.current_slide<this.num_slides-1?this.current_slide++:this.current_slide=0,b=this.$sliders.eq(this.current_slide));this._prev_next_process(b,a)},_prev:function(a){this.is_pause=this.on_transition=!0;var b;0<this.current_slide?this.current_slide--:this.current_slide=this.num_slides-1;b=this.$sliders.eq(this.current_slide);this._prev_next_process(b,a)},_prev_next_process:function(a,b){this.$very_current_slide=a;var c=this;a.data("images");this._isLoadedImages(a.data("images"),function(d){c.is_pause=!1;c.$ele.css("visibility","visible");if(a.data("has-main-image"))a.data("original",{width:d[0].width,height:d[0].height});else{var f;c.options.width&&c.options.height?(d=c.options.width,f=c.options.height):(f=c.$ele_projector.children(".active"),d=f.outerWidth(!0),f=f.outerHeight(!0));a.data("original",{width:d,height:f})}"function"==typeof b&&b();c._resize(a,function(){c._updateNavigation();0<a.find("[data-pos]").length?c._showAnimation(a,function(){}):c._showImage(a,function(){})})})},_showImage:function(a,b){var c=this,d=a.data("transition")?a.data("transition"):this.options.transition;this._transition(a,d,function(){c.on_transition=!1;"function"==typeof b&&b()})},_showAnimation:function(a,b,c){var d=this,f=a.data("transition")?a.data("transition"):this.options.transition;this._transition(a,f,function(){d.on_transition=!1;"function"==typeof b&&b();var f=[];a.children("[data-pos]").each(function(){var a=e(this).data("pos");"string"==typeof a&&(a=e(this).data("pos").replace(/[\s\[\]\']/g,"").split(","));2<=a.length&&e(this).css({display:"none",position:"absolute",top:a[0],left:a[1]});f.push(this)});d._playAnimation(f,function(){"function"==typeof c&&c()})})},_transition_prepare:function(a){a.data("lazy-src")&&a.attr("src",a.data("lazy-src"));if(a.data("lazy-background")&&0==a.children(".lazy-background").length){var b='<img src="'+a.data("lazy-background")+'" class="lazy-background"/>';e(b).prependTo(a).css({position:"absolute",top:"0",left:"0",width:"100%",height:"100%","z-index":"-1"})}a.find("[data-lazy-src]").each(function(){e(this).attr("src",e(this).data("lazy-src"))});a.find("[data-lazy-background]").each(function(){e(this).css("background-image","url("+e(this).data("lazy-background")+")")})},_transition:function(a,b,c){var d=this.$ele_projector.children(".active:first"),f=function(){d.css({display:"none",top:"0%",left:"0%"});d.css("z-index","");d.children("[data-pos]").css("display","none");d.removeClass("active");a.css({display:"block",top:"0%",left:"0%","z-index":""});a.addClass("active")};"random"==b&&(b=this.all_transitions[Math.floor(Math.random()*this.all_transitions.length)]);b=b.replace(/-/g,"_");b=eval("this._transition_"+b);"function"==typeof b?(this._transition_prepare(a),b.call(this,a,this.options.transitionSpeed,function(){f();c()})):(this._transition_prepare(a),this._transition_slide(a,this.options.transitionSpeed,function(){f();c()}))},_transition_slide_left:function(a,b,c){this._transition_slide(a,b,c,"left")},_transition_slide_right:function(a,b,c){this._transition_slide(a,b,c,"right")},_transition_slide_top:function(a,b,c){this._transition_slide(a,b,c,"top")},_transition_slide_bottom:function(a,b,c){this._transition_slide(a,b,c,"bottom")},_transition_slide:function(a,b,c,d){var f=this;if(0==this.$ele_projector.children(".active").length)a.css({display:"block",top:"0%",left:"0%"}),a.addClass("active"),"undefined"!=typeof c&&c();else{"undefined"==typeof d&&(d="left");var e,h,k,m;switch(d){case"left":e="0%";h="100%";k="0%";m="-100%";break;case"right":e="0%";h="-100%";k="0%";m="100%";break;case"top":e="100%";h="0%";k="-100%";m="0%";break;case"bottom":e="-100%",h="0%",k="100%",m="0%"}this.$ele_projector.append('<div class="slide-old" style="display: none;"></div>');this.$ele_projector.append('<div class="slide-new" style="display: none;"></div>');this.$ele_projector.children(".active:first").clone().appendTo(this.$ele_projector.children(".slide-old")).removeClass("active");a.clone().appendTo(this.$ele_projector.children(".slide-new")).removeClass("active");var l=this.$ele_projector.children(".slide-old"),n=this.$ele_projector.children(".slide-new");setTimeout(function(){l.css({display:"block",position:"absolute",overflow:"hidden",top:"0",left:"0",width:"100%",height:"100%","z-index":"2"});n.css({display:"block",position:"absolute",overflow:"hidden",top:e,left:h,width:"100%",height:"100%","z-index":"2"});l.children().show();n.children().show();f._animate(l,null,{top:k,left:m},b,null,function(){l.remove()});f._animate(n,null,{top:"0%",left:"0%"},b,null,function(){n.remove();"function"==typeof c&&c()})},30)}},_transition_fade:function(a,b,c){var d=this;if(0==this.$ele_projector.children(".active").length)a.css({display:"block",left:"0%"}),a.addClass("active"),"undefined"!=typeof c&&c();else{this.$ele_projector.append('<div class="fade-old" style="display:none;"></div>');this.$ele_projector.append('<div class="fade-new" style="display:none;"></div>');this.$ele_projector.children(".active:first").clone().appendTo(this.$ele_projector.children(".fade-old")).removeClass("active");a.clone().appendTo(this.$ele_projector.children(".fade-new")).removeClass("active");var f=this.$ele_projector.children(".fade-old"),e=this.$ele_projector.children(".fade-new");setTimeout(function(){f.children().show();e.children().show();d._animate(f,{display:"block",position:"absolute",overflow:"hidden",width:"100%",height:"100%","z-index":"2"},{opacity:"0"},b,null,function(){f.remove()});d._animate(e,{display:"block",position:"absolute",overflow:"hidden",width:"100%",height:"100%","z-index":"2",opacity:"0"},{opacity:"1"},b,null,function(){e.remove();"function"==typeof c&&c()})},30)}},_transition_split3d:function(a,b,c){this._transition_split(a,b,c,!0)},_transition_split:function(a,b,c,d){var f=this;if(0==this.$ele_projector.children(".active").length)a.css({display:"block",left:"0%"}),a.addClass("active"),"undefined"!=typeof c&&c();else{this.$ele_projector.append('<div class="split_up" style="display: none;"></div>');this.$ele_projector.append('<div class="split_down" style="display: none;"></div>');this.$ele_projector.children(".active:first").clone().appendTo(this.$ele_projector.children(".split_up")).removeClass("active");this.$ele_projector.children(".active:first").clone().appendTo(this.$ele_projector.children(".split_down")).removeClass("active");var g=this.$ele_projector.children(".split_up"),h=this.$ele_projector.children(".split_down");setTimeout(function(){g.children().css({top:"0",left:"0",height:f.$ele_projector.height()+"px"});h.children().css({top:"auto",bottom:"0",left:"0",height:f.$ele_projector.height()+"px","background-position":"bottom left"});a.css({left:"0%",display:"block"});f.$ele_projector.children(".active:first").css("display","none");$css_split_up={top:"-50%",opacity:"0"};$css_split_down={bottom:"-50%",opacity:"0"};if("undefined"!=typeof d&&!0==d){var k=10;0==f.current_slide%2&&(k*=-1);f.$ele_projector.css({perspective:"400px"});e.extend($css_split_up,{transform:"rotateZ("+k+"deg) translateZ(238px)"});e.extend($css_split_down,{transform:"rotateZ("+-1*k+"deg) translateZ(238px)"})}f._animate(g,{display:"block",position:"absolute",overflow:"hidden","z-index":"2",top:"0",left:"0",width:"100%",height:f.$ele_projector.height()/2+"px",opacity:"1"},$css_split_up,b,null,null);f._animate(h,{display:"block",position:"absolute",overflow:"hidden","z-index":"2",bottom:"0",left:"0",width:"100%",height:f.$ele_projector.height()/2+"px",opacity:"1"},$css_split_down,b,null,function(){g.remove();h.remove();"function"==typeof c&&c()})},30)}},_transition_door:function(a,b,c){var d=this;if(0==this.$ele_projector.children(".active").length)a.css({display:"block",left:"0%"}),a.addClass("active"),"undefined"!=typeof c&&c();else{this.$ele_projector.append('<div class="split_left" style="display: none;"></div>');this.$ele_projector.append('<div class="split_right" style="display: none;"></div>');this.$ele_projector.children(".active:first").clone().appendTo(this.$ele_projector.children(".split_left")).removeClass("active");this.$ele_projector.children(".active:first").clone().appendTo(this.$ele_projector.children(".split_right")).removeClass("active");var e=this.$ele_projector.children(".split_left"),g=this.$ele_projector.children(".split_right");setTimeout(function(){e.children().css({top:"0",left:"0",width:d.$ele_projector.width()+"px"});g.children().css({top:"0",left:"auto",right:"0",width:d.$ele_projector.width()+"px","background-position":"top right"});a.css({left:"0%",display:"block"});d.$ele_projector.children(".active:first").css("display","none");d._animate(e,{display:"block",position:"absolute",overflow:"hidden","z-index":"2",top:"0",left:"0",width:d.$ele_projector.width()/2+"px",height:"100%"},{left:"-50%"},b,null,function(){e.remove()});d._animate(g,{display:"block",position:"absolute",overflow:"hidden","z-index":"2",top:"0",right:"0",width:d.$ele_projector.width()/2+"px",height:"100%"},{right:"-50%"},b,null,function(){g.remove();"function"==typeof c&&c()})},30)}},_transition_wave_left:function(a,b,c){this._transition_wave(a,b,c,"left")},_transition_wave_right:function(a,b,c){this._transition_wave(a,b,c,"right")},_transition_wave_top:function(a,b,c){this._transition_wave(a,b,c,"top")},_transition_wave_bottom:function(a,b,c){this._transition_wave(a,b,c,"bottom")},_transition_wave:function(a,b,c,d){var e=this;if(0==this.$ele_projector.children(".active").length)a.css({display:"block",left:"0%"}),a.addClass("active"),"undefined"!=typeof c&&c();else{this.$ele_projector.append('<div class="split_wave" style="display: none;"></div>');a.clone().appendTo(this.$ele_projector.children(".split_wave")).removeClass("active");var g=this.$ele_projector.children(".split_wave");"undefined"==typeof d&&(d="left");var h;switch(d){case"left":g.children().css({left:"0",right:"",top:"",bottom:""});g.css({top:"0",left:"0",width:"0%",height:"100%"});h={width:"100%",opacity:"1"};break;case"right":g.children().css({left:"",right:"0",top:"",bottom:""});g.css({top:"0",right:"0",width:"0%",height:"100%"});h={width:"100%",opacity:"1"};break;case"top":g.children().css({left:"",right:"",top:"0",bottom:""});g.css({top:"0",left:"0",width:"100%",height:"0%"});h={height:"100%",opacity:"1"};break;case"bottom":g.children().css({left:"",right:"",top:"",bottom:"0"}),g.css({bottom:"0",left:"0",width:"100%",height:"0%"}),h={height:"100%",opacity:"1"}}g.children().show();setTimeout(function(){var a=!1;if("right"==d||"bottom"==d)a=!0;e._animate(g,{display:"block",position:"absolute",overflow:"hidden","z-index":"2",opacity:"0.3"},h,b,null,function(){g.remove();"function"==typeof c&&c()},a)},30)}},_playAnimation:function(a,b){var c=this,d=e(a.shift());switch(d.data("effect")){case"fadein":this._animate(d,{display:"block",opacity:"0"},{opacity:"1"},d.data("duration")?d.data("duration"):400,d.data("delay")?d.data("delay"):null,function(){0<a.length?c._playAnimation(a,b):b()});break;case"move":d.css({display:"block"});var f=d.data("pos");"string"==typeof f&&(f=d.data("pos").replace(/[\s\[\]\']/g,"").split(","));4==f.length&&this._animate(d,{opacity:"0"},{top:f[2],left:f[3],opacity:1},d.data("duration")?d.data("duration"):400,d.data("delay")?d.data("delay"):null,function(){0<a.length?c._playAnimation(a,b):b()})}}};e.fn.DrSlider=function(a){if("string"===typeof a){var b=$this.data("DrSlider");b||$this.data("DrSlider",b=new l(this,a));return b[a].apply(b,Array.prototype.slice.call(arguments,1))}return this.each(function(){var b=e(this),d=b.data("DrSlider");d?d.constructor(this,a):b.data("DrSlider",d=new l(this,a));d._init()})};e.fn.DrSlider.Constructor=l})(jQuery);

/*
Author: Dharma Poudel (@rogercomred)
Description: Yet another jQuery tabs plugin with unlimited animations and transitions.
Version: 2.0
License:  GPLv3 ( http://www.gnu.org/licenses/gpl-3.0.html )
*/

;(function($, window, document, undefined){
'use strict';

  function jQueryTab(wrapper, options) {
    this.options = $.extend (true, {}, $.fn.jQueryTab.defaults, options );
    this._defaults = $.fn.jQueryTab.defaults;
    this.wrapper = wrapper;
    this.$wrapper = $(wrapper);
    this.tabs = this.$wrapper.find('.'+this.options.tabClass).addClass('tabHeader');
    this.tabItems = this.tabs.find('li');
    this.tabLinks = this.tabItems.find("a");
    this.wrap = this.$wrapper.find('.'+this.options.contentWrapperClass);
    this.contents = this.wrap.find('.'+this.options.contentClass);
    this.headerClass = this.options.accordionClass;
    this.activeClass = this.options.activeClass;
    this.init();
  }

  /* jQueryTab object */
  jQueryTab.prototype = {
  
      init:function(){
        var self = this,
            initialTab = self.getActiveTab();   		// get the tab to open initially

        if(self.options.responsive){
          self.addHeader();                 // call fxn to add accordian headers
          self.alinks = self.wrap.find('.'+self.headerClass);
        }
        
        self.resize();
        self.cssSetUp();
        self.handleEvent();
      },
      
      addHeader: function(){
        var self = this;
            
        self.wrap.find('.'+self.headerClass).remove();
        self.tabLinks.each(function(){
          var $tab_content = self.contents.eq($(this).parent().index());
          $('<a />').attr({ 'class': self.headerClass, 'href' : '#'+$tab_content.attr('id') })
                    .text($(this).text())
                    .insertBefore($tab_content);
        });
      },
      
      cssSetUp: function(){
        this.wrap.addClass('toggle_border');
        this.contents.addClass('toggle_position toggle_display');
        if(this.options.responsive) {
          this.tabs.addClass('toggle_display');
          
        }
        if(this.options.tabPosition==='bottom'){
            this.tabs.insertAfter(this.wrap.addClass('invert_border'));
        }
      },
      
      handleClasses: function(activeContent){
        var self = this;
        self.contents.removeClass(self.options.tabInTransition).addClass(self.options.tabOutTransition);  
        activeContent.removeClass(self.options.tabOutTransition).addClass(self.options.tabInTransition);
      },
      
      resize: function(){
        var self = this,
            currentTab    =  self.getActiveTab(),
            activeContent = self.contents.eq(currentTab);
            self.reOrder(activeContent);
            
        self.tabItems.eq(currentTab).addClass(self.activeClass);
        if(self.options.responsive) self.alinks.eq(currentTab).addClass(self.activeClass);

        if (self.options.responsiveBelow < $(window).width()) {
            self.contents.show();
            self.handleClasses(activeContent);
            self.wrap.height(activeContent.outerHeight());
        }else{
          if(self.options.responsive){
              self.contents.hide().removeClass(self.options.tabOutTransition, self.options.tabInTransition);
              activeContent.fadeIn(self.options.accordionIntime);
            }
        }
        
        (self.options.useCookie) ? self.setCookie.call(self, currentTab) : '';
      },
      
      handleEvent: function(){
        var self = this;
        
        // window is resized
        $(window).on('resize', function(){ self.resize(); } );
        
        
        // navigate to the history -- will look into this after opentab function
        /* if(self.options.useHistory){
            window.onpopstate = function(event){
              console.log(self.tabs.find('a[href="'+window.location.hash+'"]'));
              self.tabLinks.add(self.alinks).filter('a[href="'+window.location.hash+'"]').trigger('click');
            }
        } */
        
        // when tab is focused
        if(self.options.keyboardNavigation){
            self.tabLinks.add(self.alinks).on('focus', function(event) {
                var fxn_to_call = ($(this).hasClass('accordion_tabs'))? 'handleAccordions' : 'handleTabs';
                self.tabber(fxn_to_call, this);
            });
        }
        
        // tab heading is hovered or clicked
        self.tabLinks.add(self.alinks).on((self.options.openOnhover)?'click, mouseenter' :'click', function(event){										// when tab is clicked
            event.preventDefault();																			// prevent default behaviour	
            var fxn_to_call = ($(this).hasClass('accordion_tabs'))? 'handleAccordions' : 'handleTabs';
            self.tabber(fxn_to_call, this);
        });
        
      },
      
      tabber: function(fxn_name, elem){
        var self = this;
        (typeof self.options.before === 'function') ? self.options.before.apply( elem, arguments ) : '';		// call fxn before
        if(self.options.useHistory) self.updateBrowserHisotry($(elem).attr('href'));
        self[fxn_name].call(elem, self); 														// call handleEvent fxn; self.options - data values
        (typeof self.options.after === 'function') ? self.options.after.apply( elem, arguments ) : '';		// call fxn after
      
      },
      
      handleTabs: function(self){
        
        if($(this).parent().hasClass(self.activeClass)) return;												// do nothing when active tab is clicked
        
        var index = $(this).parent().index(),
            activeContent  = self.contents.eq(index);
        
        self.tabItems.removeClass(self.activeClass).eq(index).addClass(self.activeClass);										// add active class to this tab
        self.wrap.height(activeContent.outerHeight());
        self.reOrder(activeContent);
        if(self.options.responsive)
          self.alinks.removeClass(self.activeClass).eq(index).addClass(self.activeClass);												// add class to corresponding accordian header
        
        self.handleClasses(activeContent);
            
        (self.options.useCookie) ? self.setCookie.call(self, index) : '';										//if useCookie is true save the current tab index to cookie
      },
      
      handleAccordions: function(self){
        var $this           = $(this),
            index           = Math.floor(($this.next().index() -1)/2 ),
            intime          = self.options.accordionInTime,
            outtime         = self.options.accordionOutTime;
                
        if(($this.hasClass(self.activeClass)) && !self.options.collapsible) return;								// if active and not collapsible - do nothing
        
        else if( $this.hasClass(self.activeClass) && self.options.collapsible ){									// if active and collapsible
          self.alinks.removeClass(self.activeClass);											// 		remove active class from all accordian headers
          self.tabItems.removeClass(self.activeClass);										// 		remove active class from all tabs
          (self.options.accordionTransition ==='slide')	? self.contents.slideUp(outtime) : self.contents.fadeOut(outtime);				// else hide the visible content in specified time 
          
          (self.options.useCookie) ? self.setCookie.call(self, null) : '';										// 		delete the cookie
        }else{
          self.alinks.removeClass(self.activeClass).eq(index).addClass(self.activeClass);
          self.tabItems.removeClass(self.activeClass).eq(index).addClass(self.activeClass);									// add active class to the corresponding tab
          
          (self.options.accordionTransition ==='slide')												// if the transition is slide
            ? self.contents.slideUp(outtime).eq(index).slideDown(intime)				// 		slide down corresponding tab content
            : self.contents.fadeOut(outtime).eq(index).fadeIn(intime);					// 		show the corresponding tab content
          
          (self.options.useCookie) ? self.setCookie.call(self, index) : '';										// if useCookie is true	save the current tab index to cookie	
        }								
      },
      
      reOrder: function($ontop){
        var self = this,
            count = self.contents.length;
        $ontop.css('zIndex', count+1);
        self.contents.not($ontop).each(function(i){
            $(this).css('zIndex', count-i);
        });
      },
      
      getActiveTab: function(tab){
        var self = this, currentTab;
        
        if(typeof tab ==='number'){  return tab-1; }	// if tab specified return it immediately

        if(self.tabs.find('.'+self.activeClass).index() !==-1){
          return self.tabs.find('.'+self.activeClass).index();
        }
        
        currentTab =(self.options.useCookie)										// if remember last active tab is set to true
            ? (self.getCookie(self.options.cookieName)						// if $.cookie plugin is present & cookie is set
                ? self.getCookie(self.options.cookieName)				// 	set to  the value from cookie
                : self.options.initialTab-1                       // else set to specified tab or default open tab
                )																
            : self.options.initialTab-1;	

        if(window.location.hash) {
          var indexOfHash = self.tabLinks.index($('[href='+window.location.hash+']'));
          if(indexOfHash !== -1) currentTab = indexOfHash;
        }
        return currentTab;
      },
      
      setCookie: function(value){
        var self = this, expires, date, path, domain, secure;
        if (value === null) {
          value = '';
          date = new Date();
          date.setTime(date.getTime() + ((-1)*24*60*60*1000));
        }
        else if(typeof self.options.cookieExpires == 'number'){
          date = new Date();
          date.setTime(date.getTime() + (self.options.cookieExpires*24*60*60*1000));
        } else if( self.options.cookieExpires.toUTCString){
          date = self.options.cookieExpires;
        }
        expires = '; expires=' + date.toUTCString(); 
        path = self.options.cookiePath ? '; path=' + (self.options.cookiePath) : '';
        domain = self.options.cookieDomain ? '; domain=' + (self.options.cookieDomain) : '';
        secure = self.options.cookieSecure ? '; secure' : '';
        document.cookie = ''.concat(self.options.cookieName, '=', encodeURIComponent(value), expires, path, domain, secure);
      },
      
      getCookie: function(name){
        var name = name + "=";
        if (document.cookie && document.cookie != '') {
          var cookieArray = document.cookie.split(";");
          for(var i=0; i < cookieArray.length; i++){
            var cookie = jQuery.trim(cookieArray[i]);
            if(cookie.indexOf(name)==0) 
            return decodeURIComponent(cookie.substring(name.length, cookie.length));
          }
        }
        return null;
      },
      
      //Update Browser History
      updateBrowserHisotry: function(href){
        if(!!(window.history && history.pushState)) {
            if(window.location.hash !== href) history.pushState(null,null,href);
        }
      }
      
  };
  /* initialize the jQueryTab plugin */
  $.fn.jQueryTab = function(options) {
    return this.each(function() {
      var container = $(this);
      if(container.data('jQueryTab')) return;
      var aT = new  jQueryTab(this, options);
      container.data('jQueryTab', aT);
    });
  };

  /* jQueryTab defaults */
  $.fn.jQueryTab.defaults = {
    
    //classes settings
    tabClass:'tabs',				    // class of the tabs
    accordionClass:'accordion_tabs',	// class of the header of accordion on smaller screens
    contentWrapperClass:'tab_content_wrapper',		// class of content wrapper
    contentClass:'tab_content',		// class of container
    activeClass:'active',			// name of the class used for active tab

    //feature settings
    responsive:true,				// enable accordian on smaller screens
    responsiveBelow:600,            // the breakpoint
    collapsible:true,				// allow all tabs to collapse on accordians
    useCookie: true,				// remember last active tab using cookie
    openOnhover: false,			    // open tab on hover
    useHistory: true,               // use the history api
    keyboardNavigation: true,       // use keyboard for navigation
    
    //tabs settings
    tabPosition: 'top',          // position of tab - top|bottom
    initialTab: 1,					// tab to open initially; start count at 1 not 0

    //cookie settings
    cookieName: 'active-tab',		// name of the cookie set to remember last active tab
    cookieExpires: 365,				// when it expires in days or standard UTC time
    cookiePath: '',					// path on which cookie is accessible
    cookieDomain:'',				// domain of the cookie
    cookieSecure: false,			// enable secure cookie - requires https connection to transfer
    
    //tabs transition settings      fade|flip|scaleUp|slideLeft
    tabInTransition: 'fadeIn',      // classname for showing in the tab content
    tabOutTransition: 'fadeOut',    // classname for hiding the tab content
    
    //accordion transition settings
    accordionTransition: 'slide',	// transitions to use - normal or slide
    accordionIntime:500,			// time for animation IN (1000 = 1s)
    accordionOutTime:400,			// time for animation OUT (1000 = 1s)
    
    //api functions
    before: function(){},			// function to call before tab is opened
    after: function(){}				// function to call after tab is opened
  };

})(jQuery, window, document); 


/* to dos */
/* 
1. look into opentab function 
2. look into onpopstate issue
*/
(function($){
	$('.tabs-1').jQueryTab({
	initialTab:2,				// tab to open initially; start count at 1 not 0
    tabInTransition: 'fadeIn',
    tabOutTransition: 'scaleUpOut',
    cookieName: 'active-tab-1',
    //tabPosition : 'bottom'
	});
})(jQuery);