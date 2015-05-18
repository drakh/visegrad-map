/* Chartist.js 0.7.3
 * Copyright © 2015 Gion Kunz
 * Free to use under the WTFPL license.
 * http://www.wtfpl.net/
 */

!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.Chartist=b()}):"object"==typeof exports?module.exports=b():a.Chartist=b()}(this,function(){var a={version:"0.7.3"};return function(a,b,c){"use strict";c.noop=function(a){return a},c.alphaNumerate=function(a){return String.fromCharCode(97+a%26)},c.extend=function(a){a=a||{};var b=Array.prototype.slice.call(arguments,1);return b.forEach(function(b){for(var d in b)a[d]="object"!=typeof b[d]||b[d]instanceof Array?b[d]:c.extend({},a[d],b[d])}),a},c.replaceAll=function(a,b,c){return a.replace(new RegExp(b,"g"),c)},c.stripUnit=function(a){return"string"==typeof a&&(a=a.replace(/[^0-9\+-\.]/g,"")),+a},c.ensureUnit=function(a,b){return"number"==typeof a&&(a+=b),a},c.querySelector=function(a){return a instanceof Node?a:b.querySelector(a)},c.times=function(a){return Array.apply(null,new Array(a))},c.sum=function(a,b){return a+b},c.serialMap=function(a,b){var d=[],e=Math.max.apply(null,a.map(function(a){return a.length}));return c.times(e).forEach(function(c,e){var f=a.map(function(a){return a[e]});d[e]=b.apply(null,f)}),d},c.roundWithPrecision=function(a,b){var d=Math.pow(10,b||c.precision);return Math.round(a*d)/d},c.precision=8,c.escapingMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"},c.serialize=function(a){return null===a||void 0===a?a:("number"==typeof a?a=""+a:"object"==typeof a&&(a=JSON.stringify({data:a})),Object.keys(c.escapingMap).reduce(function(a,b){return c.replaceAll(a,b,c.escapingMap[b])},a))},c.deserialize=function(a){if("string"!=typeof a)return a;a=Object.keys(c.escapingMap).reduce(function(a,b){return c.replaceAll(a,c.escapingMap[b],b)},a);try{a=JSON.parse(a),a=void 0!==a.data?a.data:a}catch(b){}return a},c.createSvg=function(a,b,d,e){var f;return b=b||"100%",d=d||"100%",Array.prototype.slice.call(a.querySelectorAll("svg")).filter(function(a){return a.getAttribute(c.xmlNs.qualifiedName)}).forEach(function(b){a.removeChild(b)}),f=new c.Svg("svg").attr({width:b,height:d}).addClass(e).attr({style:"width: "+b+"; height: "+d+";"}),a.appendChild(f._node),f},c.reverseData=function(a){a.labels.reverse(),a.series.reverse();for(var b=0;b<a.series.length;b++)"object"==typeof a.series[b]&&void 0!==a.series[b].data?a.series[b].data.reverse():a.series[b].reverse()},c.getDataArray=function(a,b){var d,e,f=[];(b&&!a.reversed||!b&&a.reversed)&&(c.reverseData(a),a.reversed=!a.reversed);for(var g=0;g<a.series.length;g++){e="object"==typeof a.series[g]&&void 0!==a.series[g].data?a.series[g].data:a.series[g],e instanceof Array?(f[g]=[],Array.prototype.push.apply(f[g],e)):f[g]=e;for(var h=0;h<f[g].length;h++)d=f[g][h],d=0===d.value?0:d.value||d,f[g][h]=+d}return f},c.normalizePadding=function(a,b){return b=b||0,"number"==typeof a?{top:a,right:a,bottom:a,left:a}:{top:"number"==typeof a.top?a.top:b,right:"number"==typeof a.right?a.right:b,bottom:"number"==typeof a.bottom?a.bottom:b,left:"number"==typeof a.left?a.left:b}},c.normalizeDataArray=function(a,b){for(var c=0;c<a.length;c++)if(a[c].length!==b)for(var d=a[c].length;b>d;d++)a[c][d]=0;return a},c.getMetaData=function(a,b){var d=a.data?a.data[b]:a[b];return d?c.serialize(d.meta):void 0},c.orderOfMagnitude=function(a){return Math.floor(Math.log(Math.abs(a))/Math.LN10)},c.projectLength=function(a,b,c){return b/c.range*a},c.getAvailableHeight=function(a,b){return Math.max((c.stripUnit(b.height)||a.height())-(b.chartPadding.top+b.chartPadding.bottom)-b.axisX.offset,0)},c.getHighLow=function(a){var b,c,d={high:-Number.MAX_VALUE,low:Number.MAX_VALUE};for(b=0;b<a.length;b++)for(c=0;c<a[b].length;c++)a[b][c]>d.high&&(d.high=a[b][c]),a[b][c]<d.low&&(d.low=a[b][c]);return d},c.getBounds=function(a,b,d,e){var f,g,h,i={high:b.high,low:b.low};i.high===i.low&&(0===i.low?i.high=1:i.low<0?i.high=0:i.low=0),(e||0===e)&&(i.high=Math.max(e,i.high),i.low=Math.min(e,i.low)),i.valueRange=i.high-i.low,i.oom=c.orderOfMagnitude(i.valueRange),i.min=Math.floor(i.low/Math.pow(10,i.oom))*Math.pow(10,i.oom),i.max=Math.ceil(i.high/Math.pow(10,i.oom))*Math.pow(10,i.oom),i.range=i.max-i.min,i.step=Math.pow(10,i.oom),i.numberOfSteps=Math.round(i.range/i.step);for(var j=c.projectLength(a,i.step,i),k=d>j;;)if(k&&c.projectLength(a,i.step,i)<=d)i.step*=2;else{if(k||!(c.projectLength(a,i.step/2,i)>=d))break;i.step/=2}for(g=i.min,h=i.max,f=i.min;f<=i.max;f+=i.step)f+i.step<i.low&&(g+=i.step),f-i.step>=i.high&&(h-=i.step);for(i.min=g,i.max=h,i.range=i.max-i.min,i.values=[],f=i.min;f<=i.max;f+=i.step)i.values.push(c.roundWithPrecision(f));return i},c.polarToCartesian=function(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}},c.createChartRect=function(a,b,d){var e=b.axisY?b.axisY.offset||0:0,f=b.axisX?b.axisX.offset||0:0,g=c.stripUnit(b.width)||a.width(),h=c.stripUnit(b.height)||a.height(),i=c.normalizePadding(b.chartPadding,d);return{x1:i.left+e,y1:Math.max(h-i.bottom-f,i.bottom),x2:Math.max(g-i.right,i.right+e),y2:i.top,width:function(){return this.x2-this.x1},height:function(){return this.y1-this.y2}}},c.createGrid=function(a,b,d,e,f,g,h,i){var j={};j[d.units.pos+"1"]=a.pos,j[d.units.pos+"2"]=a.pos,j[d.counterUnits.pos+"1"]=e,j[d.counterUnits.pos+"2"]=e+f;var k=g.elem("line",j,h.join(" "));i.emit("draw",c.extend({type:"grid",axis:d.units.pos,index:b,group:g,element:k},j))},c.createLabel=function(a,b,d,e,f,g,h,i,j,k){var l,m={};if(m[e.units.pos]=a.pos+g[e.units.pos],m[e.counterUnits.pos]=g[e.counterUnits.pos],m[e.units.len]=a.len,m[e.counterUnits.len]=f,j){var n='<span class="'+i.join(" ")+'">'+d[b]+"</span>";l=h.foreignObject(n,c.extend({style:"overflow: visible;"},m))}else l=h.elem("text",m,i.join(" ")).text(d[b]);k.emit("draw",c.extend({type:"label",axis:e,index:b,group:h,element:l,text:d[b]},m))},c.createAxis=function(a,b,d,e,f,g,h,i){var j=h["axis"+a.units.pos.toUpperCase()],k=b.map(a.projectValue.bind(a)).map(a.transform),l=b.map(j.labelInterpolationFnc);k.forEach(function(b,k){(l[k]||0===l[k])&&(j.showGrid&&c.createGrid(b,k,a,a.gridOffset,d[a.counterUnits.len](),e,[h.classNames.grid,h.classNames[a.units.dir]],i),j.showLabel&&c.createLabel(b,k,l,a,j.offset,a.labelOffset,f,[h.classNames.label,h.classNames[a.units.dir]],g,i))})},c.optionsProvider=function(b,d,e){function f(b){var f=h;if(h=c.extend({},j),d)for(i=0;i<d.length;i++){var g=a.matchMedia(d[i][0]);g.matches&&(h=c.extend(h,d[i][1]))}e&&!b&&e.emit("optionsChanged",{previousOptions:f,currentOptions:h})}function g(){k.forEach(function(a){a.removeListener(f)})}var h,i,j=c.extend({},b),k=[];if(!a.matchMedia)throw"window.matchMedia not found! Make sure you're using a polyfill.";if(d)for(i=0;i<d.length;i++){var l=a.matchMedia(d[i][0]);l.addListener(f),k.push(l)}return f(!0),{get currentOptions(){return c.extend({},h)},removeMediaQueryListeners:g}}}(window,document,a),function(a,b,c){"use strict";c.Interpolation={},c.Interpolation.none=function(){return function(a){for(var b=(new c.Svg.Path).move(a[0],a[1]),d=3;d<a.length;d+=2)b.line(a[d-1],a[d]);return b}},c.Interpolation.simple=function(a){var b={divisor:2};a=c.extend({},b,a);var d=1/Math.max(1,a.divisor);return function(a){for(var b=(new c.Svg.Path).move(a[0],a[1]),e=2;e<a.length;e+=2){var f=a[e-2],g=a[e-1],h=a[e],i=a[e+1],j=(h-f)*d;b.curve(f+j,g,h-j,i,h,i)}return b}},c.Interpolation.cardinal=function(a){var b={tension:1};a=c.extend({},b,a);var d=Math.min(1,Math.max(0,a.tension)),e=1-d;return function(a){if(a.length<=4)return c.Interpolation.none()(a);for(var b,f=(new c.Svg.Path).move(a[0],a[1]),g=0,h=a.length;h-2*!b>g;g+=2){var i=[{x:+a[g-2],y:+a[g-1]},{x:+a[g],y:+a[g+1]},{x:+a[g+2],y:+a[g+3]},{x:+a[g+4],y:+a[g+5]}];b?g?h-4===g?i[3]={x:+a[0],y:+a[1]}:h-2===g&&(i[2]={x:+a[0],y:+a[1]},i[3]={x:+a[2],y:+a[3]}):i[0]={x:+a[h-2],y:+a[h-1]}:h-4===g?i[3]=i[2]:g||(i[0]={x:+a[g],y:+a[g+1]}),f.curve(d*(-i[0].x+6*i[1].x+i[2].x)/6+e*i[2].x,d*(-i[0].y+6*i[1].y+i[2].y)/6+e*i[2].y,d*(i[1].x+6*i[2].x-i[3].x)/6+e*i[2].x,d*(i[1].y+6*i[2].y-i[3].y)/6+e*i[2].y,i[2].x,i[2].y)}return f}}}(window,document,a),function(a,b,c){"use strict";c.EventEmitter=function(){function a(a,b){d[a]=d[a]||[],d[a].push(b)}function b(a,b){d[a]&&(b?(d[a].splice(d[a].indexOf(b),1),0===d[a].length&&delete d[a]):delete d[a])}function c(a,b){d[a]&&d[a].forEach(function(a){a(b)}),d["*"]&&d["*"].forEach(function(c){c(a,b)})}var d=[];return{addEventHandler:a,removeEventHandler:b,emit:c}}}(window,document,a),function(a,b,c){"use strict";function d(a){var b=[];if(a.length)for(var c=0;c<a.length;c++)b.push(a[c]);return b}function e(a,b){var d=b||this.prototype||c.Class,e=Object.create(d);c.Class.cloneDefinitions(e,a);var f=function(){var a,b=e.constructor||function(){};return a=this===c?Object.create(e):this,b.apply(a,Array.prototype.slice.call(arguments,0)),a};return f.prototype=e,f["super"]=d,f.extend=this.extend,f}function f(){var a=d(arguments),b=a[0];return a.splice(1,a.length-1).forEach(function(a){Object.getOwnPropertyNames(a).forEach(function(c){delete b[c],Object.defineProperty(b,c,Object.getOwnPropertyDescriptor(a,c))})}),b}c.Class={extend:e,cloneDefinitions:f}}(window,document,a),function(a,b,c){"use strict";function d(a,b,d){return a&&(this.data=a,this.eventEmitter.emit("data",{type:"update",data:this.data})),b&&(this.options=c.extend({},d?this.options:this.defaultOptions,b),this.initializeTimeoutId||(this.optionsProvider.removeMediaQueryListeners(),this.optionsProvider=c.optionsProvider(this.options,this.responsiveOptions,this.eventEmitter))),this.initializeTimeoutId||this.createChart(this.optionsProvider.currentOptions),this}function e(){return a.removeEventListener("resize",this.resizeListener),this.optionsProvider.removeMediaQueryListeners(),this}function f(a,b){return this.eventEmitter.addEventHandler(a,b),this}function g(a,b){return this.eventEmitter.removeEventHandler(a,b),this}function h(){a.addEventListener("resize",this.resizeListener),this.optionsProvider=c.optionsProvider(this.options,this.responsiveOptions,this.eventEmitter),this.eventEmitter.addEventHandler("optionsChanged",function(){this.update()}.bind(this)),this.options.plugins&&this.options.plugins.forEach(function(a){a instanceof Array?a[0](this,a[1]):a(this)}.bind(this)),this.eventEmitter.emit("data",{type:"initial",data:this.data}),this.createChart(this.optionsProvider.currentOptions),this.initializeTimeoutId=void 0}function i(b,d,e,f,g){this.container=c.querySelector(b),this.data=d,this.defaultOptions=e,this.options=f,this.responsiveOptions=g,this.eventEmitter=c.EventEmitter(),this.supportsForeignObject=c.Svg.isSupported("Extensibility"),this.supportsAnimations=c.Svg.isSupported("AnimationEventsAttribute"),this.resizeListener=function(){this.update()}.bind(this),this.container&&(this.container.__chartist__&&(this.container.__chartist__.initializeTimeoutId?a.clearTimeout(this.container.__chartist__.initializeTimeoutId):this.container.__chartist__.detach()),this.container.__chartist__=this),this.initializeTimeoutId=setTimeout(h.bind(this),0)}c.Base=c.Class.extend({constructor:i,optionsProvider:void 0,container:void 0,svg:void 0,eventEmitter:void 0,createChart:function(){throw new Error("Base chart type can't be instantiated!")},update:d,detach:e,on:f,off:g,version:c.version,supportsForeignObject:!1})}(window,document,a),function(a,b,c){"use strict";function d(a,d,e,f,g){a instanceof SVGElement?this._node=a:(this._node=b.createElementNS(y,a),"svg"===a&&this._node.setAttributeNS(z,c.xmlNs.qualifiedName,c.xmlNs.uri),d&&this.attr(d),e&&this.addClass(e),f&&(g&&f._node.firstChild?f._node.insertBefore(this._node,f._node.firstChild):f._node.appendChild(this._node)))}function e(a,b){return"string"==typeof a?b?this._node.getAttributeNS(b,a):this._node.getAttribute(a):(Object.keys(a).forEach(function(d){void 0!==a[d]&&(b?this._node.setAttributeNS(b,[c.xmlNs.prefix,":",d].join(""),a[d]):this._node.setAttribute(d,a[d]))}.bind(this)),this)}function f(a,b,d,e){return new c.Svg(a,b,d,this,e)}function g(){return this._node.parentNode instanceof SVGElement?new c.Svg(this._node.parentNode):null}function h(){for(var a=this._node;"svg"!==a.nodeName;)a=a.parentNode;return new c.Svg(a)}function i(a){var b=this._node.querySelector(a);return b?new c.Svg(b):null}function j(a){var b=this._node.querySelectorAll(a);return b.length?new c.Svg.List(b):null}function k(a,c,d,e){if("string"==typeof a){var f=b.createElement("div");f.innerHTML=a,a=f.firstChild}a.setAttribute("xmlns",A);var g=this.elem("foreignObject",c,d,e);return g._node.appendChild(a),g}function l(a){return this._node.appendChild(b.createTextNode(a)),this}function m(){for(;this._node.firstChild;)this._node.removeChild(this._node.firstChild);return this}function n(){return this._node.parentNode.removeChild(this._node),this.parent()}function o(a){return this._node.parentNode.replaceChild(a._node,this._node),a}function p(a,b){return b&&this._node.firstChild?this._node.insertBefore(a._node,this._node.firstChild):this._node.appendChild(a._node),this}function q(){return this._node.getAttribute("class")?this._node.getAttribute("class").trim().split(/\s+/):[]}function r(a){return this._node.setAttribute("class",this.classes(this._node).concat(a.trim().split(/\s+/)).filter(function(a,b,c){return c.indexOf(a)===b}).join(" ")),this}function s(a){var b=a.trim().split(/\s+/);return this._node.setAttribute("class",this.classes(this._node).filter(function(a){return-1===b.indexOf(a)}).join(" ")),this}function t(){return this._node.setAttribute("class",""),this}function u(){return this._node.clientHeight||Math.round(this._node.getBBox().height)||this._node.parentNode.clientHeight}function v(){return this._node.clientWidth||Math.round(this._node.getBBox().width)||this._node.parentNode.clientWidth}function w(a,b,d){return void 0===b&&(b=!0),Object.keys(a).forEach(function(e){function f(a,b){var f,g,h,i={};a.easing&&(h=a.easing instanceof Array?a.easing:c.Svg.Easing[a.easing],delete a.easing),a.begin=c.ensureUnit(a.begin,"ms"),a.dur=c.ensureUnit(a.dur,"ms"),h&&(a.calcMode="spline",a.keySplines=h.join(" "),a.keyTimes="0;1"),b&&(a.fill="freeze",i[e]=a.from,this.attr(i),g=c.stripUnit(a.begin||0),a.begin="indefinite"),f=this.elem("animate",c.extend({attributeName:e},a)),b&&setTimeout(function(){try{f._node.beginElement()}catch(b){i[e]=a.to,this.attr(i),f.remove()}}.bind(this),g),d&&f._node.addEventListener("beginEvent",function(){d.emit("animationBegin",{element:this,animate:f._node,params:a})}.bind(this)),f._node.addEventListener("endEvent",function(){d&&d.emit("animationEnd",{element:this,animate:f._node,params:a}),b&&(i[e]=a.to,this.attr(i),f.remove())}.bind(this))}a[e]instanceof Array?a[e].forEach(function(a){f.bind(this)(a,!1)}.bind(this)):f.bind(this)(a[e],b)}.bind(this)),this}function x(a){var b=this;this.svgElements=[];for(var d=0;d<a.length;d++)this.svgElements.push(new c.Svg(a[d]));Object.keys(c.Svg.prototype).filter(function(a){return-1===["constructor","parent","querySelector","querySelectorAll","replace","append","classes","height","width"].indexOf(a)}).forEach(function(a){b[a]=function(){var d=Array.prototype.slice.call(arguments,0);return b.svgElements.forEach(function(b){c.Svg.prototype[a].apply(b,d)}),b}})}var y="http://www.w3.org/2000/svg",z="http://www.w3.org/2000/xmlns/",A="http://www.w3.org/1999/xhtml";c.xmlNs={qualifiedName:"xmlns:ct",prefix:"ct",uri:"http://gionkunz.github.com/chartist-js/ct"},c.Svg=c.Class.extend({constructor:d,attr:e,elem:f,parent:g,root:h,querySelector:i,querySelectorAll:j,foreignObject:k,text:l,empty:m,remove:n,replace:o,append:p,classes:q,addClass:r,removeClass:s,removeAllClasses:t,height:u,width:v,animate:w}),c.Svg.isSupported=function(a){return b.implementation.hasFeature("www.http://w3.org/TR/SVG11/feature#"+a,"1.1")};var B={easeInSine:[.47,0,.745,.715],easeOutSine:[.39,.575,.565,1],easeInOutSine:[.445,.05,.55,.95],easeInQuad:[.55,.085,.68,.53],easeOutQuad:[.25,.46,.45,.94],easeInOutQuad:[.455,.03,.515,.955],easeInCubic:[.55,.055,.675,.19],easeOutCubic:[.215,.61,.355,1],easeInOutCubic:[.645,.045,.355,1],easeInQuart:[.895,.03,.685,.22],easeOutQuart:[.165,.84,.44,1],easeInOutQuart:[.77,0,.175,1],easeInQuint:[.755,.05,.855,.06],easeOutQuint:[.23,1,.32,1],easeInOutQuint:[.86,0,.07,1],easeInExpo:[.95,.05,.795,.035],easeOutExpo:[.19,1,.22,1],easeInOutExpo:[1,0,0,1],easeInCirc:[.6,.04,.98,.335],easeOutCirc:[.075,.82,.165,1],easeInOutCirc:[.785,.135,.15,.86],easeInBack:[.6,-.28,.735,.045],easeOutBack:[.175,.885,.32,1.275],easeInOutBack:[.68,-.55,.265,1.55]};c.Svg.Easing=B,c.Svg.List=c.Class.extend({constructor:x})}(window,document,a),function(a,b,c){"use strict";function d(a,b,d,e,f){d.splice(e,0,c.extend({command:f?a.toLowerCase():a.toUpperCase()},b))}function e(a,b){a.forEach(function(c,d){r[c.command.toLowerCase()].forEach(function(e,f){b(c,e,d,f,a)})})}function f(a,b){this.pathElements=[],this.pos=0,this.close=a,this.options=c.extend({},s,b)}function g(a){return void 0!==a?(this.pos=Math.max(0,Math.min(this.pathElements.length,a)),this):this.pos}function h(a){return this.pathElements.splice(this.pos,a),this}function i(a,b,c){return d("M",{x:+a,y:+b},this.pathElements,this.pos++,c),this}function j(a,b,c){return d("L",{x:+a,y:+b},this.pathElements,this.pos++,c),this}function k(a,b,c,e,f,g,h){return d("C",{x1:+a,y1:+b,x2:+c,y2:+e,x:+f,y:+g},this.pathElements,this.pos++,h),this}function l(a){var b=a.replace(/([A-Za-z])([0-9])/g,"$1 $2").replace(/([0-9])([A-Za-z])/g,"$1 $2").split(/[\s,]+/).reduce(function(a,b){return b.match(/[A-Za-z]/)&&a.push([]),a[a.length-1].push(b),a},[]);"Z"===b[b.length-1][0].toUpperCase()&&b.pop();var d=b.map(function(a){var b=a.shift(),d=r[b.toLowerCase()];return c.extend({command:b},d.reduce(function(b,c,d){return b[c]=+a[d],b},{}))}),e=[this.pos,0];return Array.prototype.push.apply(e,d),Array.prototype.splice.apply(this.pathElements,e),this.pos+=d.length,this}function m(){var a=Math.pow(10,this.options.accuracy);return this.pathElements.reduce(function(b,c){var d=r[c.command.toLowerCase()].map(function(b){return this.options.accuracy?Math.round(c[b]*a)/a:c[b]}.bind(this));return b+c.command+d.join(",")}.bind(this),"")+(this.close?"Z":"")}function n(a,b){return e(this.pathElements,function(c,d){c[d]*="x"===d[0]?a:b}),this}function o(a,b){return e(this.pathElements,function(c,d){c[d]+="x"===d[0]?a:b}),this}function p(a){return e(this.pathElements,function(b,c,d,e,f){var g=a(b,c,d,e,f);(g||0===g)&&(b[c]=g)}),this}function q(){var a=new c.Svg.Path(this.close);return a.pos=this.pos,a.pathElements=this.pathElements.slice().map(function(a){return c.extend({},a)}),a.options=c.extend({},this.options),a}var r={m:["x","y"],l:["x","y"],c:["x1","y1","x2","y2","x","y"]},s={accuracy:3};c.Svg.Path=c.Class.extend({constructor:f,position:g,remove:h,move:i,line:j,curve:k,scale:n,translate:o,transform:p,parse:l,stringify:m,clone:q}),c.Svg.Path.elementDescriptions=r}(window,document,a),function(a,b,c){"use strict";function d(a,b,c,d,f){this.units=a,this.counterUnits=a===e.x?e.y:e.x,this.chartRect=b,this.axisLength=b[a.rectEnd]-b[a.rectStart],this.gridOffset=b[a.rectOffset],this.transform=c,this.labelOffset=d,this.options=f}var e={x:{pos:"x",len:"width",dir:"horizontal",rectStart:"x1",rectEnd:"x2",rectOffset:"y2"},y:{pos:"y",len:"height",dir:"vertical",rectStart:"y2",rectEnd:"y1",rectOffset:"x1"}};c.Axis=c.Class.extend({constructor:d,projectValue:function(){throw new Error("Base axis can't be instantiated!")}}),c.Axis.units=e}(window,document,a),function(a,b,c){"use strict";function d(a,b,d,e,f){c.LinearScaleAxis["super"].constructor.call(this,a,b,d,e,f),this.bounds=c.getBounds(this.axisLength,f.highLow,f.scaleMinSpace,f.referenceValue)}function e(a){return{pos:this.axisLength*(a-this.bounds.min)/(this.bounds.range+this.bounds.step),len:c.projectLength(this.axisLength,this.bounds.step,this.bounds)}}c.LinearScaleAxis=c.Axis.extend({constructor:d,projectValue:e})}(window,document,a),function(a,b,c){"use strict";function d(a,b,d,e,f){c.StepAxis["super"].constructor.call(this,a,b,d,e,f),this.stepLength=this.axisLength/(f.stepCount-(f.stretch?1:0))}function e(a,b){return{pos:this.stepLength*b,len:this.stepLength}}c.StepAxis=c.Axis.extend({constructor:d,projectValue:e})}(window,document,a),function(a,b,c){"use strict";function d(a){var b=[],d=c.normalizeDataArray(c.getDataArray(this.data,a.reverseData),this.data.labels.length),e=c.normalizePadding(a.chartPadding,f.padding);this.svg=c.createSvg(this.container,a.width,a.height,a.classNames.chart);var g=c.createChartRect(this.svg,a,f.padding),h=c.getHighLow(d);h.high=+a.high||(0===a.high?0:h.high),h.low=+a.low||(0===a.low?0:h.low);var i=new c.StepAxis(c.Axis.units.x,g,function(a){return a.pos=g.x1+a.pos,a},{x:a.axisX.labelOffset.x,y:g.y1+a.axisX.labelOffset.y+(this.supportsForeignObject?5:20)},{stepCount:this.data.labels.length,stretch:a.fullWidth}),j=new c.LinearScaleAxis(c.Axis.units.y,g,function(a){return a.pos=g.y1-a.pos,a},{x:e.left+a.axisY.labelOffset.x+(this.supportsForeignObject?-10:0),y:a.axisY.labelOffset.y+(this.supportsForeignObject?-15:0)},{highLow:h,scaleMinSpace:a.axisY.scaleMinSpace}),k=this.svg.elem("g").addClass(a.classNames.labelGroup),l=this.svg.elem("g").addClass(a.classNames.gridGroup);c.createAxis(i,this.data.labels,g,l,k,this.supportsForeignObject,a,this.eventEmitter),c.createAxis(j,j.bounds.values,g,l,k,this.supportsForeignObject,a,this.eventEmitter),this.data.series.forEach(function(e,f){b[f]=this.svg.elem("g"),b[f].attr({"series-name":e.name,meta:c.serialize(e.meta)},c.xmlNs.uri),b[f].addClass([a.classNames.series,e.className||a.classNames.series+"-"+c.alphaNumerate(f)].join(" "));var h=[];if(d[f].forEach(function(k,l){var m={x:g.x1+i.projectValue(k,l,d[f]).pos,y:g.y1-j.projectValue(k,l,d[f]).pos};if(h.push(m.x,m.y),a.showPoint){var n=b[f].elem("line",{x1:m.x,y1:m.y,x2:m.x+.01,y2:m.y},a.classNames.point).attr({value:k,meta:c.getMetaData(e,l)},c.xmlNs.uri);this.eventEmitter.emit("draw",{type:"point",value:k,index:l,group:b[f],element:n,x:m.x,y:m.y})}}.bind(this)),a.showLine||a.showArea){var k="function"==typeof a.lineSmooth?a.lineSmooth:a.lineSmooth?c.Interpolation.cardinal():c.Interpolation.none(),l=k(h);if(a.showLine){var m=b[f].elem("path",{d:l.stringify()},a.classNames.line,!0).attr({values:d[f]},c.xmlNs.uri);this.eventEmitter.emit("draw",{type:"line",values:d[f],path:l.clone(),chartRect:g,index:f,group:b[f],element:m})}if(a.showArea){var n=Math.max(Math.min(a.areaBase,j.bounds.max),j.bounds.min),o=g.y1-j.projectValue(n).pos,p=l.clone();p.position(0).remove(1).move(g.x1,o).line(h[0],h[1]).position(p.pathElements.length).line(h[h.length-2],o);var q=b[f].elem("path",{d:p.stringify()},a.classNames.area,!0).attr({values:d[f]},c.xmlNs.uri);this.eventEmitter.emit("draw",{type:"area",values:d[f],path:p.clone(),chartRect:g,index:f,group:b[f],element:q})}}}.bind(this)),this.eventEmitter.emit("created",{bounds:j.bounds,chartRect:g,svg:this.svg,options:a})}function e(a,b,d,e){c.Line["super"].constructor.call(this,a,b,f,c.extend({},f,d),e)}var f={axisX:{offset:30,labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop},axisY:{offset:40,labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop,scaleMinSpace:20},width:void 0,height:void 0,showLine:!0,showPoint:!0,showArea:!1,areaBase:0,lineSmooth:!0,low:void 0,high:void 0,chartPadding:5,fullWidth:!1,reverseData:!1,classNames:{chart:"ct-chart-line",label:"ct-label",labelGroup:"ct-labels",series:"ct-series",line:"ct-line",point:"ct-point",area:"ct-area",grid:"ct-grid",gridGroup:"ct-grids",vertical:"ct-vertical",horizontal:"ct-horizontal"}};c.Line=c.Base.extend({constructor:e,createChart:d})}(window,document,a),function(a,b,c){"use strict";function d(a){var b,d=[],e=c.normalizeDataArray(c.getDataArray(this.data,a.reverseData),this.data.labels.length),g=c.normalizePadding(a.chartPadding,f.padding);if(this.svg=c.createSvg(this.container,a.width,a.height,a.classNames.chart),a.stackBars){var h=c.serialMap(e,function(){return Array.prototype.slice.call(arguments).reduce(c.sum,0)});b=c.getHighLow([h])}else b=c.getHighLow(e);b.high=+a.high||(0===a.high?0:b.high),b.low=+a.low||(0===a.low?0:b.low);var i,j,k=c.createChartRect(this.svg,a,f.padding);a.horizontalBars?(j=new c.StepAxis(c.Axis.units.y,k,function(a){return a.pos=k.y1-a.pos,a},{x:g.left+a.axisY.labelOffset.x+(this.supportsForeignObject?-10:0),y:a.axisY.labelOffset.y-k.height()/this.data.labels.length},{stepCount:this.data.labels.length,stretch:a.fullHeight}),i=new c.LinearScaleAxis(c.Axis.units.x,k,function(a){return a.pos=k.x1+a.pos,a},{x:a.axisX.labelOffset.x,y:k.y1+a.axisX.labelOffset.y+(this.supportsForeignObject?5:20)},{highLow:b,scaleMinSpace:a.axisX.scaleMinSpace,referenceValue:0})):(j=new c.StepAxis(c.Axis.units.x,k,function(a){return a.pos=k.x1+a.pos,a},{x:a.axisX.labelOffset.x,y:k.y1+a.axisX.labelOffset.y+(this.supportsForeignObject?5:20)},{stepCount:this.data.labels.length}),i=new c.LinearScaleAxis(c.Axis.units.y,k,function(a){return a.pos=k.y1-a.pos,a},{x:g.left+a.axisY.labelOffset.x+(this.supportsForeignObject?-10:0),y:a.axisY.labelOffset.y+(this.supportsForeignObject?-15:0)},{highLow:b,scaleMinSpace:a.axisY.scaleMinSpace,referenceValue:0}));var l=this.svg.elem("g").addClass(a.classNames.labelGroup),m=this.svg.elem("g").addClass(a.classNames.gridGroup),n=a.horizontalBars?k.x1+i.projectValue(0).pos:k.y1-i.projectValue(0).pos,o=[];c.createAxis(j,this.data.labels,k,m,l,this.supportsForeignObject,a,this.eventEmitter),c.createAxis(i,i.bounds.values,k,m,l,this.supportsForeignObject,a,this.eventEmitter),this.data.series.forEach(function(b,f){var g=f-(this.data.series.length-1)/2,h=k[j.units.len]()/e[f].length/2;d[f]=this.svg.elem("g"),d[f].attr({"series-name":b.name,meta:c.serialize(b.meta)},c.xmlNs.uri),d[f].addClass([a.classNames.series,b.className||a.classNames.series+"-"+c.alphaNumerate(f)].join(" ")),e[f].forEach(function(l,m){var p,q,r={x:k.x1+(a.horizontalBars?i:j).projectValue(l,m,e[f]).pos,y:k.y1-(a.horizontalBars?j:i).projectValue(l,m,e[f]).pos};r[j.units.pos]+=h*(a.horizontalBars?-1:1),r[j.units.pos]+=a.stackBars?0:g*a.seriesBarDistance*(a.horizontalBars?-1:1),q=o[m]||n,o[m]=q-(n-r[j.counterUnits.pos]);var s={};s[j.units.pos+"1"]=r[j.units.pos],s[j.units.pos+"2"]=r[j.units.pos],s[j.counterUnits.pos+"1"]=a.stackBars?q:n,s[j.counterUnits.pos+"2"]=a.stackBars?o[m]:r[j.counterUnits.pos],p=d[f].elem("line",s,a.classNames.bar).attr({value:l,meta:c.getMetaData(b,m)},c.xmlNs.uri),this.eventEmitter.emit("draw",c.extend({type:"bar",value:l,index:m,chartRect:k,group:d[f],element:p},s))}.bind(this))}.bind(this)),this.eventEmitter.emit("created",{bounds:i.bounds,chartRect:k,svg:this.svg,options:a})}function e(a,b,d,e){c.Bar["super"].constructor.call(this,a,b,f,c.extend({},f,d),e)}var f={axisX:{offset:30,labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop,scaleMinSpace:40},axisY:{offset:40,labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop,scaleMinSpace:20},width:void 0,height:void 0,high:void 0,low:void 0,chartPadding:5,seriesBarDistance:15,stackBars:!1,horizontalBars:!1,reverseData:!1,classNames:{chart:"ct-chart-bar",label:"ct-label",labelGroup:"ct-labels",series:"ct-series",bar:"ct-bar",grid:"ct-grid",gridGroup:"ct-grids",vertical:"ct-vertical",horizontal:"ct-horizontal"}};c.Bar=c.Base.extend({constructor:e,createChart:d})}(window,document,a),function(a,b,c){"use strict";function d(a,b,c){var d=b.x>a.x;return d&&"explode"===c||!d&&"implode"===c?"start":d&&"implode"===c||!d&&"explode"===c?"end":"middle"}function e(a){var b,e,f,h,i=[],j=a.startAngle,k=c.getDataArray(this.data,a.reverseData);this.svg=c.createSvg(this.container,a.width,a.height,a.classNames.chart),b=c.createChartRect(this.svg,a,g.padding),e=Math.min(b.width()/2,b.height()/2),h=a.total||k.reduce(function(a,b){return a+b},0),e-=a.donut?a.donutWidth/2:0,f=a.donut?e:e/2,f+=a.labelOffset;for(var l={x:b.x1+b.width()/2,y:b.y2+b.height()/2},m=1===this.data.series.filter(function(a){return 0!==a}).length,n=0;n<this.data.series.length;n++){i[n]=this.svg.elem("g",null,null,!0),this.data.series[n].name&&i[n].attr({"series-name":this.data.series[n].name,meta:c.serialize(this.data.series[n].meta)},c.xmlNs.uri),i[n].addClass([a.classNames.series,this.data.series[n].className||a.classNames.series+"-"+c.alphaNumerate(n)].join(" "));var o=j+k[n]/h*360;o-j===360&&(o-=.01);var p=c.polarToCartesian(l.x,l.y,e,j-(0===n||m?0:.2)),q=c.polarToCartesian(l.x,l.y,e,o),r=180>=o-j?"0":"1",s=["M",q.x,q.y,"A",e,e,0,r,0,p.x,p.y];a.donut===!1&&s.push("L",l.x,l.y);var t=i[n].elem("path",{d:s.join(" ")},a.classNames.slice+(a.donut?" "+a.classNames.donut:""));if(t.attr({value:k[n]},c.xmlNs.uri),a.donut===!0&&t.attr({style:"stroke-width: "+ +a.donutWidth+"px"}),this.eventEmitter.emit("draw",{type:"slice",value:k[n],totalDataSum:h,index:n,group:i[n],element:t,center:l,radius:e,startAngle:j,endAngle:o}),a.showLabel){var u=c.polarToCartesian(l.x,l.y,f,j+(o-j)/2),v=a.labelInterpolationFnc(this.data.labels?this.data.labels[n]:k[n],n),w=i[n].elem("text",{dx:u.x,dy:u.y,"text-anchor":d(l,u,a.labelDirection)},a.classNames.label).text(""+v);this.eventEmitter.emit("draw",{type:"label",index:n,group:i[n],element:w,text:""+v,x:u.x,y:u.y})}j=o}this.eventEmitter.emit("created",{chartRect:b,svg:this.svg,options:a})}function f(a,b,d,e){c.Pie["super"].constructor.call(this,a,b,g,c.extend({},g,d),e)}var g={width:void 0,height:void 0,chartPadding:5,classNames:{chart:"ct-chart-pie",series:"ct-series",slice:"ct-slice",donut:"ct-donut",label:"ct-label"},startAngle:0,total:void 0,donut:!1,donutWidth:60,showLabel:!0,labelOffset:0,labelInterpolationFnc:c.noop,labelDirection:"neutral",reverseData:!1};c.Pie=c.Base.extend({constructor:f,createChart:e,determineAnchorPosition:d})}(window,document,a),a});
//# sourceMappingURL=chartist.min.js.map
/*
 Leaflet, a JavaScript library for mobile-friendly interactive maps. http://leafletjs.com
 (c) 2010-2013, Vladimir Agafonkin
 (c) 2010-2011, CloudMade
*/
!function(t,e,i){var n=t.L,o={};o.version="0.7.3","object"==typeof module&&"object"==typeof module.exports?module.exports=o:"function"==typeof define&&define.amd&&define(o),o.noConflict=function(){return t.L=n,this},t.L=o,o.Util={extend:function(t){var e,i,n,o,s=Array.prototype.slice.call(arguments,1);for(i=0,n=s.length;n>i;i++){o=s[i]||{};for(e in o)o.hasOwnProperty(e)&&(t[e]=o[e])}return t},bind:function(t,e){var i=arguments.length>2?Array.prototype.slice.call(arguments,2):null;return function(){return t.apply(e,i||arguments)}},stamp:function(){var t=0,e="_leaflet_id";return function(i){return i[e]=i[e]||++t,i[e]}}(),invokeEach:function(t,e,i){var n,o;if("object"==typeof t){o=Array.prototype.slice.call(arguments,3);for(n in t)e.apply(i,[n,t[n]].concat(o));return!0}return!1},limitExecByInterval:function(t,e,i){var n,o;return function s(){var a=arguments;return n?void(o=!0):(n=!0,setTimeout(function(){n=!1,o&&(s.apply(i,a),o=!1)},e),void t.apply(i,a))}},falseFn:function(){return!1},formatNum:function(t,e){var i=Math.pow(10,e||5);return Math.round(t*i)/i},trim:function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")},splitWords:function(t){return o.Util.trim(t).split(/\s+/)},setOptions:function(t,e){return t.options=o.extend({},t.options,e),t.options},getParamString:function(t,e,i){var n=[];for(var o in t)n.push(encodeURIComponent(i?o.toUpperCase():o)+"="+encodeURIComponent(t[o]));return(e&&-1!==e.indexOf("?")?"&":"?")+n.join("&")},template:function(t,e){return t.replace(/\{ *([\w_]+) *\}/g,function(t,n){var o=e[n];if(o===i)throw new Error("No value provided for variable "+t);return"function"==typeof o&&(o=o(e)),o})},isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},emptyImageUrl:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="},function(){function e(e){var i,n,o=["webkit","moz","o","ms"];for(i=0;i<o.length&&!n;i++)n=t[o[i]+e];return n}function i(e){var i=+new Date,o=Math.max(0,16-(i-n));return n=i+o,t.setTimeout(e,o)}var n=0,s=t.requestAnimationFrame||e("RequestAnimationFrame")||i,a=t.cancelAnimationFrame||e("CancelAnimationFrame")||e("CancelRequestAnimationFrame")||function(e){t.clearTimeout(e)};o.Util.requestAnimFrame=function(e,n,a,r){return e=o.bind(e,n),a&&s===i?void e():s.call(t,e,r)},o.Util.cancelAnimFrame=function(e){e&&a.call(t,e)}}(),o.extend=o.Util.extend,o.bind=o.Util.bind,o.stamp=o.Util.stamp,o.setOptions=o.Util.setOptions,o.Class=function(){},o.Class.extend=function(t){var e=function(){this.initialize&&this.initialize.apply(this,arguments),this._initHooks&&this.callInitHooks()},i=function(){};i.prototype=this.prototype;var n=new i;n.constructor=e,e.prototype=n;for(var s in this)this.hasOwnProperty(s)&&"prototype"!==s&&(e[s]=this[s]);t.statics&&(o.extend(e,t.statics),delete t.statics),t.includes&&(o.Util.extend.apply(null,[n].concat(t.includes)),delete t.includes),t.options&&n.options&&(t.options=o.extend({},n.options,t.options)),o.extend(n,t),n._initHooks=[];var a=this;return e.__super__=a.prototype,n.callInitHooks=function(){if(!this._initHooksCalled){a.prototype.callInitHooks&&a.prototype.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,e=n._initHooks.length;e>t;t++)n._initHooks[t].call(this)}},e},o.Class.include=function(t){o.extend(this.prototype,t)},o.Class.mergeOptions=function(t){o.extend(this.prototype.options,t)},o.Class.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i="function"==typeof t?t:function(){this[t].apply(this,e)};this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i)};var s="_leaflet_events";o.Mixin={},o.Mixin.Events={addEventListener:function(t,e,i){if(o.Util.invokeEach(t,this.addEventListener,this,e,i))return this;var n,a,r,h,l,u,c,d=this[s]=this[s]||{},p=i&&i!==this&&o.stamp(i);for(t=o.Util.splitWords(t),n=0,a=t.length;a>n;n++)r={action:e,context:i||this},h=t[n],p?(l=h+"_idx",u=l+"_len",c=d[l]=d[l]||{},c[p]||(c[p]=[],d[u]=(d[u]||0)+1),c[p].push(r)):(d[h]=d[h]||[],d[h].push(r));return this},hasEventListeners:function(t){var e=this[s];return!!e&&(t in e&&e[t].length>0||t+"_idx"in e&&e[t+"_idx_len"]>0)},removeEventListener:function(t,e,i){if(!this[s])return this;if(!t)return this.clearAllEventListeners();if(o.Util.invokeEach(t,this.removeEventListener,this,e,i))return this;var n,a,r,h,l,u,c,d,p,_=this[s],m=i&&i!==this&&o.stamp(i);for(t=o.Util.splitWords(t),n=0,a=t.length;a>n;n++)if(r=t[n],u=r+"_idx",c=u+"_len",d=_[u],e){if(h=m&&d?d[m]:_[r]){for(l=h.length-1;l>=0;l--)h[l].action!==e||i&&h[l].context!==i||(p=h.splice(l,1),p[0].action=o.Util.falseFn);i&&d&&0===h.length&&(delete d[m],_[c]--)}}else delete _[r],delete _[u],delete _[c];return this},clearAllEventListeners:function(){return delete this[s],this},fireEvent:function(t,e){if(!this.hasEventListeners(t))return this;var i,n,a,r,h,l=o.Util.extend({},e,{type:t,target:this}),u=this[s];if(u[t])for(i=u[t].slice(),n=0,a=i.length;a>n;n++)i[n].action.call(i[n].context,l);r=u[t+"_idx"];for(h in r)if(i=r[h].slice())for(n=0,a=i.length;a>n;n++)i[n].action.call(i[n].context,l);return this},addOneTimeEventListener:function(t,e,i){if(o.Util.invokeEach(t,this.addOneTimeEventListener,this,e,i))return this;var n=o.bind(function(){this.removeEventListener(t,e,i).removeEventListener(t,n,i)},this);return this.addEventListener(t,e,i).addEventListener(t,n,i)}},o.Mixin.Events.on=o.Mixin.Events.addEventListener,o.Mixin.Events.off=o.Mixin.Events.removeEventListener,o.Mixin.Events.once=o.Mixin.Events.addOneTimeEventListener,o.Mixin.Events.fire=o.Mixin.Events.fireEvent,function(){var n="ActiveXObject"in t,s=n&&!e.addEventListener,a=navigator.userAgent.toLowerCase(),r=-1!==a.indexOf("webkit"),h=-1!==a.indexOf("chrome"),l=-1!==a.indexOf("phantom"),u=-1!==a.indexOf("android"),c=-1!==a.search("android [23]"),d=-1!==a.indexOf("gecko"),p=typeof orientation!=i+"",_=t.navigator&&t.navigator.msPointerEnabled&&t.navigator.msMaxTouchPoints&&!t.PointerEvent,m=t.PointerEvent&&t.navigator.pointerEnabled&&t.navigator.maxTouchPoints||_,f="devicePixelRatio"in t&&t.devicePixelRatio>1||"matchMedia"in t&&t.matchMedia("(min-resolution:144dpi)")&&t.matchMedia("(min-resolution:144dpi)").matches,g=e.documentElement,v=n&&"transition"in g.style,y="WebKitCSSMatrix"in t&&"m11"in new t.WebKitCSSMatrix&&!c,P="MozPerspective"in g.style,L="OTransition"in g.style,x=!t.L_DISABLE_3D&&(v||y||P||L)&&!l,w=!t.L_NO_TOUCH&&!l&&function(){var t="ontouchstart";if(m||t in g)return!0;var i=e.createElement("div"),n=!1;return i.setAttribute?(i.setAttribute(t,"return;"),"function"==typeof i[t]&&(n=!0),i.removeAttribute(t),i=null,n):!1}();o.Browser={ie:n,ielt9:s,webkit:r,gecko:d&&!r&&!t.opera&&!n,android:u,android23:c,chrome:h,ie3d:v,webkit3d:y,gecko3d:P,opera3d:L,any3d:x,mobile:p,mobileWebkit:p&&r,mobileWebkit3d:p&&y,mobileOpera:p&&t.opera,touch:w,msPointer:_,pointer:m,retina:f}}(),o.Point=function(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e},o.Point.prototype={clone:function(){return new o.Point(this.x,this.y)},add:function(t){return this.clone()._add(o.point(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(o.point(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},distanceTo:function(t){t=o.point(t);var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},equals:function(t){return t=o.point(t),t.x===this.x&&t.y===this.y},contains:function(t){return t=o.point(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+o.Util.formatNum(this.x)+", "+o.Util.formatNum(this.y)+")"}},o.point=function(t,e,n){return t instanceof o.Point?t:o.Util.isArray(t)?new o.Point(t[0],t[1]):t===i||null===t?t:new o.Point(t,e,n)},o.Bounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;o>n;n++)this.extend(i[n])},o.Bounds.prototype={extend:function(t){return t=o.point(t),this.min||this.max?(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(t.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(t.y,this.max.y)):(this.min=t.clone(),this.max=t.clone()),this},getCenter:function(t){return new o.Point((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return new o.Point(this.min.x,this.max.y)},getTopRight:function(){return new o.Point(this.max.x,this.min.y)},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i;return t="number"==typeof t[0]||t instanceof o.Point?o.point(t):o.bounds(t),t instanceof o.Bounds?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=o.bounds(t);var e=this.min,i=this.max,n=t.min,s=t.max,a=s.x>=e.x&&n.x<=i.x,r=s.y>=e.y&&n.y<=i.y;return a&&r},isValid:function(){return!(!this.min||!this.max)}},o.bounds=function(t,e){return!t||t instanceof o.Bounds?t:new o.Bounds(t,e)},o.Transformation=function(t,e,i,n){this._a=t,this._b=e,this._c=i,this._d=n},o.Transformation.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new o.Point((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}},o.DomUtil={get:function(t){return"string"==typeof t?e.getElementById(t):t},getStyle:function(t,i){var n=t.style[i];if(!n&&t.currentStyle&&(n=t.currentStyle[i]),(!n||"auto"===n)&&e.defaultView){var o=e.defaultView.getComputedStyle(t,null);n=o?o[i]:null}return"auto"===n?null:n},getViewportOffset:function(t){var i,n=0,s=0,a=t,r=e.body,h=e.documentElement;do{if(n+=a.offsetTop||0,s+=a.offsetLeft||0,n+=parseInt(o.DomUtil.getStyle(a,"borderTopWidth"),10)||0,s+=parseInt(o.DomUtil.getStyle(a,"borderLeftWidth"),10)||0,i=o.DomUtil.getStyle(a,"position"),a.offsetParent===r&&"absolute"===i)break;if("fixed"===i){n+=r.scrollTop||h.scrollTop||0,s+=r.scrollLeft||h.scrollLeft||0;break}if("relative"===i&&!a.offsetLeft){var l=o.DomUtil.getStyle(a,"width"),u=o.DomUtil.getStyle(a,"max-width"),c=a.getBoundingClientRect();("none"!==l||"none"!==u)&&(s+=c.left+a.clientLeft),n+=c.top+(r.scrollTop||h.scrollTop||0);break}a=a.offsetParent}while(a);a=t;do{if(a===r)break;n-=a.scrollTop||0,s-=a.scrollLeft||0,a=a.parentNode}while(a);return new o.Point(s,n)},documentIsLtr:function(){return o.DomUtil._docIsLtrCached||(o.DomUtil._docIsLtrCached=!0,o.DomUtil._docIsLtr="ltr"===o.DomUtil.getStyle(e.body,"direction")),o.DomUtil._docIsLtr},create:function(t,i,n){var o=e.createElement(t);return o.className=i,n&&n.appendChild(o),o},hasClass:function(t,e){if(t.classList!==i)return t.classList.contains(e);var n=o.DomUtil._getClass(t);return n.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(n)},addClass:function(t,e){if(t.classList!==i)for(var n=o.Util.splitWords(e),s=0,a=n.length;a>s;s++)t.classList.add(n[s]);else if(!o.DomUtil.hasClass(t,e)){var r=o.DomUtil._getClass(t);o.DomUtil._setClass(t,(r?r+" ":"")+e)}},removeClass:function(t,e){t.classList!==i?t.classList.remove(e):o.DomUtil._setClass(t,o.Util.trim((" "+o.DomUtil._getClass(t)+" ").replace(" "+e+" "," ")))},_setClass:function(t,e){t.className.baseVal===i?t.className=e:t.className.baseVal=e},_getClass:function(t){return t.className.baseVal===i?t.className:t.className.baseVal},setOpacity:function(t,e){if("opacity"in t.style)t.style.opacity=e;else if("filter"in t.style){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n)}catch(o){if(1===e)return}e=Math.round(100*e),i?(i.Enabled=100!==e,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"}},testProp:function(t){for(var i=e.documentElement.style,n=0;n<t.length;n++)if(t[n]in i)return t[n];return!1},getTranslateString:function(t){var e=o.Browser.webkit3d,i="translate"+(e?"3d":"")+"(",n=(e?",0":"")+")";return i+t.x+"px,"+t.y+"px"+n},getScaleString:function(t,e){var i=o.DomUtil.getTranslateString(e.add(e.multiplyBy(-1*t))),n=" scale("+t+") ";return i+n},setPosition:function(t,e,i){t._leaflet_pos=e,!i&&o.Browser.any3d?t.style[o.DomUtil.TRANSFORM]=o.DomUtil.getTranslateString(e):(t.style.left=e.x+"px",t.style.top=e.y+"px")},getPosition:function(t){return t._leaflet_pos}},o.DomUtil.TRANSFORM=o.DomUtil.testProp(["transform","WebkitTransform","OTransform","MozTransform","msTransform"]),o.DomUtil.TRANSITION=o.DomUtil.testProp(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),o.DomUtil.TRANSITION_END="webkitTransition"===o.DomUtil.TRANSITION||"OTransition"===o.DomUtil.TRANSITION?o.DomUtil.TRANSITION+"End":"transitionend",function(){if("onselectstart"in e)o.extend(o.DomUtil,{disableTextSelection:function(){o.DomEvent.on(t,"selectstart",o.DomEvent.preventDefault)},enableTextSelection:function(){o.DomEvent.off(t,"selectstart",o.DomEvent.preventDefault)}});else{var i=o.DomUtil.testProp(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);o.extend(o.DomUtil,{disableTextSelection:function(){if(i){var t=e.documentElement.style;this._userSelect=t[i],t[i]="none"}},enableTextSelection:function(){i&&(e.documentElement.style[i]=this._userSelect,delete this._userSelect)}})}o.extend(o.DomUtil,{disableImageDrag:function(){o.DomEvent.on(t,"dragstart",o.DomEvent.preventDefault)},enableImageDrag:function(){o.DomEvent.off(t,"dragstart",o.DomEvent.preventDefault)}})}(),o.LatLng=function(t,e,n){if(t=parseFloat(t),e=parseFloat(e),isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=t,this.lng=e,n!==i&&(this.alt=parseFloat(n))},o.extend(o.LatLng,{DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,MAX_MARGIN:1e-9}),o.LatLng.prototype={equals:function(t){if(!t)return!1;t=o.latLng(t);var e=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return e<=o.LatLng.MAX_MARGIN},toString:function(t){return"LatLng("+o.Util.formatNum(this.lat,t)+", "+o.Util.formatNum(this.lng,t)+")"},distanceTo:function(t){t=o.latLng(t);var e=6378137,i=o.LatLng.DEG_TO_RAD,n=(t.lat-this.lat)*i,s=(t.lng-this.lng)*i,a=this.lat*i,r=t.lat*i,h=Math.sin(n/2),l=Math.sin(s/2),u=h*h+l*l*Math.cos(a)*Math.cos(r);return 2*e*Math.atan2(Math.sqrt(u),Math.sqrt(1-u))},wrap:function(t,e){var i=this.lng;return t=t||-180,e=e||180,i=(i+e)%(e-t)+(t>i||i===e?e:t),new o.LatLng(this.lat,i)}},o.latLng=function(t,e){return t instanceof o.LatLng?t:o.Util.isArray(t)?"number"==typeof t[0]||"string"==typeof t[0]?new o.LatLng(t[0],t[1],t[2]):null:t===i||null===t?t:"object"==typeof t&&"lat"in t?new o.LatLng(t.lat,"lng"in t?t.lng:t.lon):e===i?null:new o.LatLng(t,e)},o.LatLngBounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;o>n;n++)this.extend(i[n])},o.LatLngBounds.prototype={extend:function(t){if(!t)return this;var e=o.latLng(t);return t=null!==e?e:o.latLngBounds(t),t instanceof o.LatLng?this._southWest||this._northEast?(this._southWest.lat=Math.min(t.lat,this._southWest.lat),this._southWest.lng=Math.min(t.lng,this._southWest.lng),this._northEast.lat=Math.max(t.lat,this._northEast.lat),this._northEast.lng=Math.max(t.lng,this._northEast.lng)):(this._southWest=new o.LatLng(t.lat,t.lng),this._northEast=new o.LatLng(t.lat,t.lng)):t instanceof o.LatLngBounds&&(this.extend(t._southWest),this.extend(t._northEast)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,s=Math.abs(e.lng-i.lng)*t;return new o.LatLngBounds(new o.LatLng(e.lat-n,e.lng-s),new o.LatLng(i.lat+n,i.lng+s))},getCenter:function(){return new o.LatLng((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new o.LatLng(this.getNorth(),this.getWest())},getSouthEast:function(){return new o.LatLng(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){t="number"==typeof t[0]||t instanceof o.LatLng?o.latLng(t):o.latLngBounds(t);var e,i,n=this._southWest,s=this._northEast;return t instanceof o.LatLngBounds?(e=t.getSouthWest(),i=t.getNorthEast()):e=i=t,e.lat>=n.lat&&i.lat<=s.lat&&e.lng>=n.lng&&i.lng<=s.lng},intersects:function(t){t=o.latLngBounds(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),a=s.lat>=e.lat&&n.lat<=i.lat,r=s.lng>=e.lng&&n.lng<=i.lng;return a&&r},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t){return t?(t=o.latLngBounds(t),this._southWest.equals(t.getSouthWest())&&this._northEast.equals(t.getNorthEast())):!1},isValid:function(){return!(!this._southWest||!this._northEast)}},o.latLngBounds=function(t,e){return!t||t instanceof o.LatLngBounds?t:new o.LatLngBounds(t,e)},o.Projection={},o.Projection.SphericalMercator={MAX_LATITUDE:85.0511287798,project:function(t){var e=o.LatLng.DEG_TO_RAD,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),s=t.lng*e,a=n*e;return a=Math.log(Math.tan(Math.PI/4+a/2)),new o.Point(s,a)},unproject:function(t){var e=o.LatLng.RAD_TO_DEG,i=t.x*e,n=(2*Math.atan(Math.exp(t.y))-Math.PI/2)*e;return new o.LatLng(n,i)}},o.Projection.LonLat={project:function(t){return new o.Point(t.lng,t.lat)},unproject:function(t){return new o.LatLng(t.y,t.x)}},o.CRS={latLngToPoint:function(t,e){var i=this.projection.project(t),n=this.scale(e);return this.transformation._transform(i,n)},pointToLatLng:function(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},scale:function(t){return 256*Math.pow(2,t)},getSize:function(t){var e=this.scale(t);return o.point(e,e)}},o.CRS.Simple=o.extend({},o.CRS,{projection:o.Projection.LonLat,transformation:new o.Transformation(1,0,-1,0),scale:function(t){return Math.pow(2,t)}}),o.CRS.EPSG3857=o.extend({},o.CRS,{code:"EPSG:3857",projection:o.Projection.SphericalMercator,transformation:new o.Transformation(.5/Math.PI,.5,-.5/Math.PI,.5),project:function(t){var e=this.projection.project(t),i=6378137;return e.multiplyBy(i)}}),o.CRS.EPSG900913=o.extend({},o.CRS.EPSG3857,{code:"EPSG:900913"}),o.CRS.EPSG4326=o.extend({},o.CRS,{code:"EPSG:4326",projection:o.Projection.LonLat,transformation:new o.Transformation(1/360,.5,-1/360,.5)}),o.Map=o.Class.extend({includes:o.Mixin.Events,options:{crs:o.CRS.EPSG3857,fadeAnimation:o.DomUtil.TRANSITION&&!o.Browser.android23,trackResize:!0,markerZoomAnimation:o.DomUtil.TRANSITION&&o.Browser.any3d},initialize:function(t,e){e=o.setOptions(this,e),this._initContainer(t),this._initLayout(),this._onResize=o.bind(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),e.center&&e.zoom!==i&&this.setView(o.latLng(e.center),e.zoom,{reset:!0}),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._tileLayersNum=0,this.callInitHooks(),this._addLayers(e.layers)},setView:function(t,e){return e=e===i?this.getZoom():e,this._resetView(o.latLng(t),this._limitZoom(e)),this},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=this._limitZoom(t),this)},zoomIn:function(t,e){return this.setZoom(this._zoom+(t||1),e)},zoomOut:function(t,e){return this.setZoom(this._zoom-(t||1),e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),s=this.getSize().divideBy(2),a=t instanceof o.Point?t:this.latLngToContainerPoint(t),r=a.subtract(s).multiplyBy(1-1/n),h=this.containerPointToLatLng(s.add(r));return this.setView(h,e,{zoom:i})},fitBounds:function(t,e){e=e||{},t=t.getBounds?t.getBounds():o.latLngBounds(t);var i=o.point(e.paddingTopLeft||e.padding||[0,0]),n=o.point(e.paddingBottomRight||e.padding||[0,0]),s=this.getBoundsZoom(t,!1,i.add(n)),a=n.subtract(i).divideBy(2),r=this.project(t.getSouthWest(),s),h=this.project(t.getNorthEast(),s),l=this.unproject(r.add(h).divideBy(2).add(a),s);return s=e&&e.maxZoom?Math.min(e.maxZoom,s):s,this.setView(l,s,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t){return this.fire("movestart"),this._rawPanBy(o.point(t)),this.fire("move"),this.fire("moveend")},setMaxBounds:function(t){return t=o.latLngBounds(t),this.options.maxBounds=t,t?(this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds,this)):this.off("moveend",this._panInsideMaxBounds,this)},panInsideBounds:function(t,e){var i=this.getCenter(),n=this._limitCenter(i,this._zoom,t);return i.equals(n)?this:this.panTo(n,e)},addLayer:function(t){var e=o.stamp(t);return this._layers[e]?this:(this._layers[e]=t,!t.options||isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[e]=t,this._updateZoomLevels()),this.options.zoomAnimation&&o.TileLayer&&t instanceof o.TileLayer&&(this._tileLayersNum++,this._tileLayersToLoad++,t.on("load",this._onTileLayerLoad,this)),this._loaded&&this._layerAdd(t),this)},removeLayer:function(t){var e=o.stamp(t);return this._layers[e]?(this._loaded&&t.onRemove(this),delete this._layers[e],this._loaded&&this.fire("layerremove",{layer:t}),this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels()),this.options.zoomAnimation&&o.TileLayer&&t instanceof o.TileLayer&&(this._tileLayersNum--,this._tileLayersToLoad--,t.off("load",this._onTileLayerLoad,this)),this):this},hasLayer:function(t){return t?o.stamp(t)in this._layers:!1},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},invalidateSize:function(t){if(!this._loaded)return this;t=o.extend({animate:!1,pan:!0},t===!0?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._initialCenter=null;var i=this.getSize(),n=e.divideBy(2).round(),s=i.divideBy(2).round(),a=n.subtract(s);return a.x||a.y?(t.animate&&t.pan?this.panBy(a):(t.pan&&this._rawPanBy(a),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(o.bind(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:i})):this},addHandler:function(t,e){if(!e)return this;var i=this[t]=new e(this);return this._handlers.push(i),this.options[t]&&i.enable(),this},remove:function(){this._loaded&&this.fire("unload"),this._initEvents("off");try{delete this._container._leaflet}catch(t){this._container._leaflet=i}return this._clearPanes(),this._clearControlPos&&this._clearControlPos(),this._clearHandlers(),this},getCenter:function(){return this._checkIfLoaded(),this._initialCenter&&!this._moved()?this._initialCenter:this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight());return new o.LatLngBounds(e,i)},getMinZoom:function(){return this.options.minZoom===i?this._layersMinZoom===i?0:this._layersMinZoom:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===i?this._layersMaxZoom===i?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,i){t=o.latLngBounds(t);var n,s=this.getMinZoom()-(e?1:0),a=this.getMaxZoom(),r=this.getSize(),h=t.getNorthWest(),l=t.getSouthEast(),u=!0;i=o.point(i||[0,0]);do s++,n=this.project(l,s).subtract(this.project(h,s)).add(i),u=e?n.x<r.x||n.y<r.y:r.contains(n);while(u&&a>=s);return u&&e?null:e?s:s-1},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new o.Point(this._container.clientWidth,this._container.clientHeight),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(){var t=this._getTopLeftPoint();return new o.Bounds(t,t.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._initialTopLeftPoint},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t){var e=this.options.crs;return e.scale(t)/e.scale(this._zoom)},getScaleZoom:function(t){return this._zoom+Math.log(t)/Math.LN2},project:function(t,e){return e=e===i?this._zoom:e,this.options.crs.latLngToPoint(o.latLng(t),e)},unproject:function(t,e){return e=e===i?this._zoom:e,this.options.crs.pointToLatLng(o.point(t),e)},layerPointToLatLng:function(t){var e=o.point(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){var e=this.project(o.latLng(t))._round();return e._subtract(this.getPixelOrigin())},containerPointToLayerPoint:function(t){return o.point(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return o.point(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(o.point(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))},mouseEventToContainerPoint:function(t){return o.DomEvent.getMousePosition(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=o.DomUtil.get(t);if(!e)throw new Error("Map container not found.");if(e._leaflet)throw new Error("Map container is already initialized.");e._leaflet=!0},_initLayout:function(){var t=this._container;o.DomUtil.addClass(t,"leaflet-container"+(o.Browser.touch?" leaflet-touch":"")+(o.Browser.retina?" leaflet-retina":"")+(o.Browser.ielt9?" leaflet-oldie":"")+(this.options.fadeAnimation?" leaflet-fade-anim":""));var e=o.DomUtil.getStyle(t,"position");"absolute"!==e&&"relative"!==e&&"fixed"!==e&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._mapPane=t.mapPane=this._createPane("leaflet-map-pane",this._container),this._tilePane=t.tilePane=this._createPane("leaflet-tile-pane",this._mapPane),t.objectsPane=this._createPane("leaflet-objects-pane",this._mapPane),t.shadowPane=this._createPane("leaflet-shadow-pane"),t.overlayPane=this._createPane("leaflet-overlay-pane"),t.markerPane=this._createPane("leaflet-marker-pane"),t.popupPane=this._createPane("leaflet-popup-pane");var e=" leaflet-zoom-hide";this.options.markerZoomAnimation||(o.DomUtil.addClass(t.markerPane,e),o.DomUtil.addClass(t.shadowPane,e),o.DomUtil.addClass(t.popupPane,e))},_createPane:function(t,e){return o.DomUtil.create("div",t,e||this._panes.objectsPane)},_clearPanes:function(){this._container.removeChild(this._mapPane)},_addLayers:function(t){t=t?o.Util.isArray(t)?t:[t]:[];for(var e=0,i=t.length;i>e;e++)this.addLayer(t[e])},_resetView:function(t,e,i,n){var s=this._zoom!==e;n||(this.fire("movestart"),s&&this.fire("zoomstart")),this._zoom=e,this._initialCenter=t,this._initialTopLeftPoint=this._getNewTopLeftPoint(t),i?this._initialTopLeftPoint._add(this._getMapPanePos()):o.DomUtil.setPosition(this._mapPane,new o.Point(0,0)),this._tileLayersToLoad=this._tileLayersNum;var a=!this._loaded;this._loaded=!0,this.fire("viewreset",{hard:!i}),a&&(this.fire("load"),this.eachLayer(this._layerAdd,this)),this.fire("move"),(s||n)&&this.fire("zoomend"),this.fire("moveend",{hard:!i})},_rawPanBy:function(t){o.DomUtil.setPosition(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_updateZoomLevels:function(){var t,e=1/0,n=-1/0,o=this._getZoomSpan();for(t in this._zoomBoundLayers){var s=this._zoomBoundLayers[t];isNaN(s.options.minZoom)||(e=Math.min(e,s.options.minZoom)),isNaN(s.options.maxZoom)||(n=Math.max(n,s.options.maxZoom))}t===i?this._layersMaxZoom=this._layersMinZoom=i:(this._layersMaxZoom=n,this._layersMinZoom=e),o!==this._getZoomSpan()&&this.fire("zoomlevelschange")},_panInsideMaxBounds:function(){this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(e){if(o.DomEvent){e=e||"on",o.DomEvent[e](this._container,"click",this._onMouseClick,this);var i,n,s=["dblclick","mousedown","mouseup","mouseenter","mouseleave","mousemove","contextmenu"];for(i=0,n=s.length;n>i;i++)o.DomEvent[e](this._container,s[i],this._fireMouseEvent,this);this.options.trackResize&&o.DomEvent[e](t,"resize",this._onResize,this)}},_onResize:function(){o.Util.cancelAnimFrame(this._resizeRequest),this._resizeRequest=o.Util.requestAnimFrame(function(){this.invalidateSize({debounceMoveend:!0})},this,!1,this._container)},_onMouseClick:function(t){!this._loaded||!t._simulated&&(this.dragging&&this.dragging.moved()||this.boxZoom&&this.boxZoom.moved())||o.DomEvent._skipped(t)||(this.fire("preclick"),this._fireMouseEvent(t))},_fireMouseEvent:function(t){if(this._loaded&&!o.DomEvent._skipped(t)){var e=t.type;if(e="mouseenter"===e?"mouseover":"mouseleave"===e?"mouseout":e,this.hasEventListeners(e)){"contextmenu"===e&&o.DomEvent.preventDefault(t);var i=this.mouseEventToContainerPoint(t),n=this.containerPointToLayerPoint(i),s=this.layerPointToLatLng(n);this.fire(e,{latlng:s,layerPoint:n,containerPoint:i,originalEvent:t})}}},_onTileLayerLoad:function(){this._tileLayersToLoad--,this._tileLayersNum&&!this._tileLayersToLoad&&this.fire("tilelayersload")},_clearHandlers:function(){for(var t=0,e=this._handlers.length;e>t;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,this):this.on("load",t,e),this},_layerAdd:function(t){t.onAdd(this),this.fire("layeradd",{layer:t})},_getMapPanePos:function(){return o.DomUtil.getPosition(this._mapPane)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(){return this.getPixelOrigin().subtract(this._getMapPanePos())},_getNewTopLeftPoint:function(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._round()},_latLngToNewLayerPoint:function(t,e,i){var n=this._getNewTopLeftPoint(i,e).add(this._getMapPanePos());return this.project(t,e)._subtract(n)},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,i){if(!i)return t;var n=this.project(t,e),s=this.getSize().divideBy(2),a=new o.Bounds(n.subtract(s),n.add(s)),r=this._getBoundsOffset(a,i,e);return this.unproject(n.add(r),e)},_limitOffset:function(t,e){if(!e)return t;var i=this.getPixelBounds(),n=new o.Bounds(i.min.add(t),i.max.add(t));return t.add(this._getBoundsOffset(n,e))},_getBoundsOffset:function(t,e,i){var n=this.project(e.getNorthWest(),i).subtract(t.min),s=this.project(e.getSouthEast(),i).subtract(t.max),a=this._rebound(n.x,-s.x),r=this._rebound(n.y,-s.y);return new o.Point(a,r)},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom();return Math.max(e,Math.min(i,t))}}),o.map=function(t,e){return new o.Map(t,e)},o.Projection.Mercator={MAX_LATITUDE:85.0840591556,R_MINOR:6356752.314245179,R_MAJOR:6378137,project:function(t){var e=o.LatLng.DEG_TO_RAD,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),s=this.R_MAJOR,a=this.R_MINOR,r=t.lng*e*s,h=n*e,l=a/s,u=Math.sqrt(1-l*l),c=u*Math.sin(h);c=Math.pow((1-c)/(1+c),.5*u);var d=Math.tan(.5*(.5*Math.PI-h))/c;return h=-s*Math.log(d),new o.Point(r,h)},unproject:function(t){for(var e,i=o.LatLng.RAD_TO_DEG,n=this.R_MAJOR,s=this.R_MINOR,a=t.x*i/n,r=s/n,h=Math.sqrt(1-r*r),l=Math.exp(-t.y/n),u=Math.PI/2-2*Math.atan(l),c=15,d=1e-7,p=c,_=.1;Math.abs(_)>d&&--p>0;)e=h*Math.sin(u),_=Math.PI/2-2*Math.atan(l*Math.pow((1-e)/(1+e),.5*h))-u,u+=_;
return new o.LatLng(u*i,a)}},o.CRS.EPSG3395=o.extend({},o.CRS,{code:"EPSG:3395",projection:o.Projection.Mercator,transformation:function(){var t=o.Projection.Mercator,e=t.R_MAJOR,i=.5/(Math.PI*e);return new o.Transformation(i,.5,-i,.5)}()}),o.TileLayer=o.Class.extend({includes:o.Mixin.Events,options:{minZoom:0,maxZoom:18,tileSize:256,subdomains:"abc",errorTileUrl:"",attribution:"",zoomOffset:0,opacity:1,unloadInvisibleTiles:o.Browser.mobile,updateWhenIdle:o.Browser.mobile},initialize:function(t,e){e=o.setOptions(this,e),e.detectRetina&&o.Browser.retina&&e.maxZoom>0&&(e.tileSize=Math.floor(e.tileSize/2),e.zoomOffset++,e.minZoom>0&&e.minZoom--,this.options.maxZoom--),e.bounds&&(e.bounds=o.latLngBounds(e.bounds)),this._url=t;var i=this.options.subdomains;"string"==typeof i&&(this.options.subdomains=i.split(""))},onAdd:function(t){this._map=t,this._animated=t._zoomAnimated,this._initContainer(),t.on({viewreset:this._reset,moveend:this._update},this),this._animated&&t.on({zoomanim:this._animateZoom,zoomend:this._endZoomAnim},this),this.options.updateWhenIdle||(this._limitedUpdate=o.Util.limitExecByInterval(this._update,150,this),t.on("move",this._limitedUpdate,this)),this._reset(),this._update()},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){this._container.parentNode.removeChild(this._container),t.off({viewreset:this._reset,moveend:this._update},this),this._animated&&t.off({zoomanim:this._animateZoom,zoomend:this._endZoomAnim},this),this.options.updateWhenIdle||t.off("move",this._limitedUpdate,this),this._container=null,this._map=null},bringToFront:function(){var t=this._map._panes.tilePane;return this._container&&(t.appendChild(this._container),this._setAutoZIndex(t,Math.max)),this},bringToBack:function(){var t=this._map._panes.tilePane;return this._container&&(t.insertBefore(this._container,t.firstChild),this._setAutoZIndex(t,Math.min)),this},getAttribution:function(){return this.options.attribution},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},setUrl:function(t,e){return this._url=t,e||this.redraw(),this},redraw:function(){return this._map&&(this._reset({hard:!0}),this._update()),this},_updateZIndex:function(){this._container&&this.options.zIndex!==i&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t,e){var i,n,o,s=t.children,a=-e(1/0,-1/0);for(n=0,o=s.length;o>n;n++)s[n]!==this._container&&(i=parseInt(s[n].style.zIndex,10),isNaN(i)||(a=e(a,i)));this.options.zIndex=this._container.style.zIndex=(isFinite(a)?a:0)+e(1,-1)},_updateOpacity:function(){var t,e=this._tiles;if(o.Browser.ielt9)for(t in e)o.DomUtil.setOpacity(e[t],this.options.opacity);else o.DomUtil.setOpacity(this._container,this.options.opacity)},_initContainer:function(){var t=this._map._panes.tilePane;if(!this._container){if(this._container=o.DomUtil.create("div","leaflet-layer"),this._updateZIndex(),this._animated){var e="leaflet-tile-container";this._bgBuffer=o.DomUtil.create("div",e,this._container),this._tileContainer=o.DomUtil.create("div",e,this._container)}else this._tileContainer=this._container;t.appendChild(this._container),this.options.opacity<1&&this._updateOpacity()}},_reset:function(t){for(var e in this._tiles)this.fire("tileunload",{tile:this._tiles[e]});this._tiles={},this._tilesToLoad=0,this.options.reuseTiles&&(this._unusedTiles=[]),this._tileContainer.innerHTML="",this._animated&&t&&t.hard&&this._clearBgBuffer(),this._initContainer()},_getTileSize:function(){var t=this._map,e=t.getZoom()+this.options.zoomOffset,i=this.options.maxNativeZoom,n=this.options.tileSize;return i&&e>i&&(n=Math.round(t.getZoomScale(e)/t.getZoomScale(i)*n)),n},_update:function(){if(this._map){var t=this._map,e=t.getPixelBounds(),i=t.getZoom(),n=this._getTileSize();if(!(i>this.options.maxZoom||i<this.options.minZoom)){var s=o.bounds(e.min.divideBy(n)._floor(),e.max.divideBy(n)._floor());this._addTilesFromCenterOut(s),(this.options.unloadInvisibleTiles||this.options.reuseTiles)&&this._removeOtherTiles(s)}}},_addTilesFromCenterOut:function(t){var i,n,s,a=[],r=t.getCenter();for(i=t.min.y;i<=t.max.y;i++)for(n=t.min.x;n<=t.max.x;n++)s=new o.Point(n,i),this._tileShouldBeLoaded(s)&&a.push(s);var h=a.length;if(0!==h){a.sort(function(t,e){return t.distanceTo(r)-e.distanceTo(r)});var l=e.createDocumentFragment();for(this._tilesToLoad||this.fire("loading"),this._tilesToLoad+=h,n=0;h>n;n++)this._addTile(a[n],l);this._tileContainer.appendChild(l)}},_tileShouldBeLoaded:function(t){if(t.x+":"+t.y in this._tiles)return!1;var e=this.options;if(!e.continuousWorld){var i=this._getWrapTileNum();if(e.noWrap&&(t.x<0||t.x>=i.x)||t.y<0||t.y>=i.y)return!1}if(e.bounds){var n=e.tileSize,o=t.multiplyBy(n),s=o.add([n,n]),a=this._map.unproject(o),r=this._map.unproject(s);if(e.continuousWorld||e.noWrap||(a=a.wrap(),r=r.wrap()),!e.bounds.intersects([a,r]))return!1}return!0},_removeOtherTiles:function(t){var e,i,n,o;for(o in this._tiles)e=o.split(":"),i=parseInt(e[0],10),n=parseInt(e[1],10),(i<t.min.x||i>t.max.x||n<t.min.y||n>t.max.y)&&this._removeTile(o)},_removeTile:function(t){var e=this._tiles[t];this.fire("tileunload",{tile:e,url:e.src}),this.options.reuseTiles?(o.DomUtil.removeClass(e,"leaflet-tile-loaded"),this._unusedTiles.push(e)):e.parentNode===this._tileContainer&&this._tileContainer.removeChild(e),o.Browser.android||(e.onload=null,e.src=o.Util.emptyImageUrl),delete this._tiles[t]},_addTile:function(t,e){var i=this._getTilePos(t),n=this._getTile();o.DomUtil.setPosition(n,i,o.Browser.chrome),this._tiles[t.x+":"+t.y]=n,this._loadTile(n,t),n.parentNode!==this._tileContainer&&e.appendChild(n)},_getZoomForUrl:function(){var t=this.options,e=this._map.getZoom();return t.zoomReverse&&(e=t.maxZoom-e),e+=t.zoomOffset,t.maxNativeZoom?Math.min(e,t.maxNativeZoom):e},_getTilePos:function(t){var e=this._map.getPixelOrigin(),i=this._getTileSize();return t.multiplyBy(i).subtract(e)},getTileUrl:function(t){return o.Util.template(this._url,o.extend({s:this._getSubdomain(t),z:t.z,x:t.x,y:t.y},this.options))},_getWrapTileNum:function(){var t=this._map.options.crs,e=t.getSize(this._map.getZoom());return e.divideBy(this._getTileSize())._floor()},_adjustTilePoint:function(t){var e=this._getWrapTileNum();this.options.continuousWorld||this.options.noWrap||(t.x=(t.x%e.x+e.x)%e.x),this.options.tms&&(t.y=e.y-t.y-1),t.z=this._getZoomForUrl()},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_getTile:function(){if(this.options.reuseTiles&&this._unusedTiles.length>0){var t=this._unusedTiles.pop();return this._resetTile(t),t}return this._createTile()},_resetTile:function(){},_createTile:function(){var t=o.DomUtil.create("img","leaflet-tile");return t.style.width=t.style.height=this._getTileSize()+"px",t.galleryimg="no",t.onselectstart=t.onmousemove=o.Util.falseFn,o.Browser.ielt9&&this.options.opacity!==i&&o.DomUtil.setOpacity(t,this.options.opacity),o.Browser.mobileWebkit3d&&(t.style.WebkitBackfaceVisibility="hidden"),t},_loadTile:function(t,e){t._layer=this,t.onload=this._tileOnLoad,t.onerror=this._tileOnError,this._adjustTilePoint(e),t.src=this.getTileUrl(e),this.fire("tileloadstart",{tile:t,url:t.src})},_tileLoaded:function(){this._tilesToLoad--,this._animated&&o.DomUtil.addClass(this._tileContainer,"leaflet-zoom-animated"),this._tilesToLoad||(this.fire("load"),this._animated&&(clearTimeout(this._clearBgBufferTimer),this._clearBgBufferTimer=setTimeout(o.bind(this._clearBgBuffer,this),500)))},_tileOnLoad:function(){var t=this._layer;this.src!==o.Util.emptyImageUrl&&(o.DomUtil.addClass(this,"leaflet-tile-loaded"),t.fire("tileload",{tile:this,url:this.src})),t._tileLoaded()},_tileOnError:function(){var t=this._layer;t.fire("tileerror",{tile:this,url:this.src});var e=t.options.errorTileUrl;e&&(this.src=e),t._tileLoaded()}}),o.tileLayer=function(t,e){return new o.TileLayer(t,e)},o.TileLayer.WMS=o.TileLayer.extend({defaultWmsParams:{service:"WMS",request:"GetMap",version:"1.1.1",layers:"",styles:"",format:"image/jpeg",transparent:!1},initialize:function(t,e){this._url=t;var i=o.extend({},this.defaultWmsParams),n=e.tileSize||this.options.tileSize;i.width=i.height=e.detectRetina&&o.Browser.retina?2*n:n;for(var s in e)this.options.hasOwnProperty(s)||"crs"===s||(i[s]=e[s]);this.wmsParams=i,o.setOptions(this,e)},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,o.TileLayer.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._map,i=this.options.tileSize,n=t.multiplyBy(i),s=n.add([i,i]),a=this._crs.project(e.unproject(n,t.z)),r=this._crs.project(e.unproject(s,t.z)),h=this._wmsVersion>=1.3&&this._crs===o.CRS.EPSG4326?[r.y,a.x,a.y,r.x].join(","):[a.x,r.y,r.x,a.y].join(","),l=o.Util.template(this._url,{s:this._getSubdomain(t)});return l+o.Util.getParamString(this.wmsParams,l,!0)+"&BBOX="+h},setParams:function(t,e){return o.extend(this.wmsParams,t),e||this.redraw(),this}}),o.tileLayer.wms=function(t,e){return new o.TileLayer.WMS(t,e)},o.TileLayer.Canvas=o.TileLayer.extend({options:{async:!1},initialize:function(t){o.setOptions(this,t)},redraw:function(){this._map&&(this._reset({hard:!0}),this._update());for(var t in this._tiles)this._redrawTile(this._tiles[t]);return this},_redrawTile:function(t){this.drawTile(t,t._tilePoint,this._map._zoom)},_createTile:function(){var t=o.DomUtil.create("canvas","leaflet-tile");return t.width=t.height=this.options.tileSize,t.onselectstart=t.onmousemove=o.Util.falseFn,t},_loadTile:function(t,e){t._layer=this,t._tilePoint=e,this._redrawTile(t),this.options.async||this.tileDrawn(t)},drawTile:function(){},tileDrawn:function(t){this._tileOnLoad.call(t)}}),o.tileLayer.canvas=function(t){return new o.TileLayer.Canvas(t)},o.ImageOverlay=o.Class.extend({includes:o.Mixin.Events,options:{opacity:1},initialize:function(t,e,i){this._url=t,this._bounds=o.latLngBounds(e),o.setOptions(this,i)},onAdd:function(t){this._map=t,this._image||this._initImage(),t._panes.overlayPane.appendChild(this._image),t.on("viewreset",this._reset,this),t.options.zoomAnimation&&o.Browser.any3d&&t.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(t){t.getPanes().overlayPane.removeChild(this._image),t.off("viewreset",this._reset,this),t.options.zoomAnimation&&t.off("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},bringToFront:function(){return this._image&&this._map._panes.overlayPane.appendChild(this._image),this},bringToBack:function(){var t=this._map._panes.overlayPane;return this._image&&t.insertBefore(this._image,t.firstChild),this},setUrl:function(t){this._url=t,this._image.src=this._url},getAttribution:function(){return this.options.attribution},_initImage:function(){this._image=o.DomUtil.create("img","leaflet-image-layer"),this._map.options.zoomAnimation&&o.Browser.any3d?o.DomUtil.addClass(this._image,"leaflet-zoom-animated"):o.DomUtil.addClass(this._image,"leaflet-zoom-hide"),this._updateOpacity(),o.extend(this._image,{galleryimg:"no",onselectstart:o.Util.falseFn,onmousemove:o.Util.falseFn,onload:o.bind(this._onImageLoad,this),src:this._url})},_animateZoom:function(t){var e=this._map,i=this._image,n=e.getZoomScale(t.zoom),s=this._bounds.getNorthWest(),a=this._bounds.getSouthEast(),r=e._latLngToNewLayerPoint(s,t.zoom,t.center),h=e._latLngToNewLayerPoint(a,t.zoom,t.center)._subtract(r),l=r._add(h._multiplyBy(.5*(1-1/n)));i.style[o.DomUtil.TRANSFORM]=o.DomUtil.getTranslateString(l)+" scale("+n+") "},_reset:function(){var t=this._image,e=this._map.latLngToLayerPoint(this._bounds.getNorthWest()),i=this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(e);o.DomUtil.setPosition(t,e),t.style.width=i.x+"px",t.style.height=i.y+"px"},_onImageLoad:function(){this.fire("load")},_updateOpacity:function(){o.DomUtil.setOpacity(this._image,this.options.opacity)}}),o.imageOverlay=function(t,e,i){return new o.ImageOverlay(t,e,i)},o.Icon=o.Class.extend({options:{className:""},initialize:function(t){o.setOptions(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var i=this._getIconUrl(t);if(!i){if("icon"===t)throw new Error("iconUrl not set in Icon options (see the docs).");return null}var n;return n=e&&"IMG"===e.tagName?this._createImg(i,e):this._createImg(i),this._setIconStyles(n,t),n},_setIconStyles:function(t,e){var i,n=this.options,s=o.point(n[e+"Size"]);i=o.point("shadow"===e?n.shadowAnchor||n.iconAnchor:n.iconAnchor),!i&&s&&(i=s.divideBy(2,!0)),t.className="leaflet-marker-"+e+" "+n.className,i&&(t.style.marginLeft=-i.x+"px",t.style.marginTop=-i.y+"px"),s&&(t.style.width=s.x+"px",t.style.height=s.y+"px")},_createImg:function(t,i){return i=i||e.createElement("img"),i.src=t,i},_getIconUrl:function(t){return o.Browser.retina&&this.options[t+"RetinaUrl"]?this.options[t+"RetinaUrl"]:this.options[t+"Url"]}}),o.icon=function(t){return new o.Icon(t)},o.Icon.Default=o.Icon.extend({options:{iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]},_getIconUrl:function(t){var e=t+"Url";if(this.options[e])return this.options[e];o.Browser.retina&&"icon"===t&&(t+="-2x");var i=o.Icon.Default.imagePath;if(!i)throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");return i+"/marker-"+t+".png"}}),o.Icon.Default.imagePath=function(){var t,i,n,o,s,a=e.getElementsByTagName("script"),r=/[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;for(t=0,i=a.length;i>t;t++)if(n=a[t].src,o=n.match(r))return s=n.split(r)[0],(s?s+"/":"")+"images"}(),o.Marker=o.Class.extend({includes:o.Mixin.Events,options:{icon:new o.Icon.Default,title:"",alt:"",clickable:!0,draggable:!1,keyboard:!0,zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250},initialize:function(t,e){o.setOptions(this,e),this._latlng=o.latLng(t)},onAdd:function(t){this._map=t,t.on("viewreset",this.update,this),this._initIcon(),this.update(),this.fire("add"),t.options.zoomAnimation&&t.options.markerZoomAnimation&&t.on("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){this.dragging&&this.dragging.disable(),this._removeIcon(),this._removeShadow(),this.fire("remove"),t.off({viewreset:this.update,zoomanim:this._animateZoom},this),this._map=null},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=o.latLng(t),this.update(),this.fire("move",{latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update(),this},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup),this},update:function(){if(this._icon){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e=this._map,i=e.options.zoomAnimation&&e.options.markerZoomAnimation,n=i?"leaflet-zoom-animated":"leaflet-zoom-hide",s=t.icon.createIcon(this._icon),a=!1;s!==this._icon&&(this._icon&&this._removeIcon(),a=!0,t.title&&(s.title=t.title),t.alt&&(s.alt=t.alt)),o.DomUtil.addClass(s,n),t.keyboard&&(s.tabIndex="0"),this._icon=s,this._initInteraction(),t.riseOnHover&&o.DomEvent.on(s,"mouseover",this._bringToFront,this).on(s,"mouseout",this._resetZIndex,this);var r=t.icon.createShadow(this._shadow),h=!1;r!==this._shadow&&(this._removeShadow(),h=!0),r&&o.DomUtil.addClass(r,n),this._shadow=r,t.opacity<1&&this._updateOpacity();var l=this._map._panes;a&&l.markerPane.appendChild(this._icon),r&&h&&l.shadowPane.appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&o.DomEvent.off(this._icon,"mouseover",this._bringToFront).off(this._icon,"mouseout",this._resetZIndex),this._map._panes.markerPane.removeChild(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&this._map._panes.shadowPane.removeChild(this._shadow),this._shadow=null},_setPos:function(t){o.DomUtil.setPosition(this._icon,t),this._shadow&&o.DomUtil.setPosition(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon.style.zIndex=this._zIndex+t},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e)},_initInteraction:function(){if(this.options.clickable){var t=this._icon,e=["dblclick","mousedown","mouseover","mouseout","contextmenu"];o.DomUtil.addClass(t,"leaflet-clickable"),o.DomEvent.on(t,"click",this._onMouseClick,this),o.DomEvent.on(t,"keypress",this._onKeyPress,this);for(var i=0;i<e.length;i++)o.DomEvent.on(t,e[i],this._fireMouseEvent,this);o.Handler.MarkerDrag&&(this.dragging=new o.Handler.MarkerDrag(this),this.options.draggable&&this.dragging.enable())}},_onMouseClick:function(t){var e=this.dragging&&this.dragging.moved();(this.hasEventListeners(t.type)||e)&&o.DomEvent.stopPropagation(t),e||(this.dragging&&this.dragging._enabled||!this._map.dragging||!this._map.dragging.moved())&&this.fire(t.type,{originalEvent:t,latlng:this._latlng})},_onKeyPress:function(t){13===t.keyCode&&this.fire("click",{originalEvent:t,latlng:this._latlng})},_fireMouseEvent:function(t){this.fire(t.type,{originalEvent:t,latlng:this._latlng}),"contextmenu"===t.type&&this.hasEventListeners(t.type)&&o.DomEvent.preventDefault(t),"mousedown"!==t.type?o.DomEvent.stopPropagation(t):o.DomEvent.preventDefault(t)},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){o.DomUtil.setOpacity(this._icon,this.options.opacity),this._shadow&&o.DomUtil.setOpacity(this._shadow,this.options.opacity)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)}}),o.marker=function(t,e){return new o.Marker(t,e)},o.DivIcon=o.Icon.extend({options:{iconSize:[12,12],className:"leaflet-div-icon",html:!1},createIcon:function(t){var i=t&&"DIV"===t.tagName?t:e.createElement("div"),n=this.options;return i.innerHTML=n.html!==!1?n.html:"",n.bgPos&&(i.style.backgroundPosition=-n.bgPos.x+"px "+-n.bgPos.y+"px"),this._setIconStyles(i,"icon"),i},createShadow:function(){return null}}),o.divIcon=function(t){return new o.DivIcon(t)},o.Map.mergeOptions({closePopupOnClick:!0}),o.Popup=o.Class.extend({includes:o.Mixin.Events,options:{minWidth:50,maxWidth:300,autoPan:!0,closeButton:!0,offset:[0,7],autoPanPadding:[5,5],keepInView:!1,className:"",zoomAnimation:!0},initialize:function(t,e){o.setOptions(this,t),this._source=e,this._animated=o.Browser.any3d&&this.options.zoomAnimation,this._isOpen=!1},onAdd:function(t){this._map=t,this._container||this._initLayout();var e=t.options.fadeAnimation;e&&o.DomUtil.setOpacity(this._container,0),t._panes.popupPane.appendChild(this._container),t.on(this._getEvents(),this),this.update(),e&&o.DomUtil.setOpacity(this._container,1),this.fire("open"),t.fire("popupopen",{popup:this}),this._source&&this._source.fire("popupopen",{popup:this})},addTo:function(t){return t.addLayer(this),this},openOn:function(t){return t.openPopup(this),this},onRemove:function(t){t._panes.popupPane.removeChild(this._container),o.Util.falseFn(this._container.offsetWidth),t.off(this._getEvents(),this),t.options.fadeAnimation&&o.DomUtil.setOpacity(this._container,0),this._map=null,this.fire("close"),t.fire("popupclose",{popup:this}),this._source&&this._source.fire("popupclose",{popup:this})},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=o.latLng(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},_getEvents:function(){var t={viewreset:this._updatePosition};return this._animated&&(t.zoomanim=this._zoomAnimation),("closeOnClick"in this.options?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this._close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_close:function(){this._map&&this._map.closePopup(this)},_initLayout:function(){var t,e="leaflet-popup",i=e+" "+this.options.className+" leaflet-zoom-"+(this._animated?"animated":"hide"),n=this._container=o.DomUtil.create("div",i);this.options.closeButton&&(t=this._closeButton=o.DomUtil.create("a",e+"-close-button",n),t.href="#close",t.innerHTML="&#215;",o.DomEvent.disableClickPropagation(t),o.DomEvent.on(t,"click",this._onCloseButtonClick,this));var s=this._wrapper=o.DomUtil.create("div",e+"-content-wrapper",n);o.DomEvent.disableClickPropagation(s),this._contentNode=o.DomUtil.create("div",e+"-content",s),o.DomEvent.disableScrollPropagation(this._contentNode),o.DomEvent.on(s,"contextmenu",o.DomEvent.stopPropagation),this._tipContainer=o.DomUtil.create("div",e+"-tip-container",n),this._tip=o.DomUtil.create("div",e+"-tip",this._tipContainer)},_updateContent:function(){if(this._content){if("string"==typeof this._content)this._contentNode.innerHTML=this._content;else{for(;this._contentNode.hasChildNodes();)this._contentNode.removeChild(this._contentNode.firstChild);this._contentNode.appendChild(this._content)}this.fire("contentupdate")}},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var i=t.offsetWidth;i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="";var n=t.offsetHeight,s=this.options.maxHeight,a="leaflet-popup-scrolled";s&&n>s?(e.height=s+"px",o.DomUtil.addClass(t,a)):o.DomUtil.removeClass(t,a),this._containerWidth=this._container.offsetWidth},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=this._animated,i=o.point(this.options.offset);e&&o.DomUtil.setPosition(this._container,t),this._containerBottom=-i.y-(e?0:t.y),this._containerLeft=-Math.round(this._containerWidth/2)+i.x+(e?0:t.x),this._container.style.bottom=this._containerBottom+"px",this._container.style.left=this._containerLeft+"px"}},_zoomAnimation:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);o.DomUtil.setPosition(this._container,e)},_adjustPan:function(){if(this.options.autoPan){var t=this._map,e=this._container.offsetHeight,i=this._containerWidth,n=new o.Point(this._containerLeft,-e-this._containerBottom);this._animated&&n._add(o.DomUtil.getPosition(this._container));var s=t.layerPointToContainerPoint(n),a=o.point(this.options.autoPanPadding),r=o.point(this.options.autoPanPaddingTopLeft||a),h=o.point(this.options.autoPanPaddingBottomRight||a),l=t.getSize(),u=0,c=0;s.x+i+h.x>l.x&&(u=s.x+i-l.x+h.x),s.x-u-r.x<0&&(u=s.x-r.x),s.y+e+h.y>l.y&&(c=s.y+e-l.y+h.y),s.y-c-r.y<0&&(c=s.y-r.y),(u||c)&&t.fire("autopanstart").panBy([u,c])}},_onCloseButtonClick:function(t){this._close(),o.DomEvent.stop(t)}}),o.popup=function(t,e){return new o.Popup(t,e)},o.Map.include({openPopup:function(t,e,i){if(this.closePopup(),!(t instanceof o.Popup)){var n=t;t=new o.Popup(i).setLatLng(e).setContent(n)}return t._isOpen=!0,this._popup=t,this.addLayer(t)},closePopup:function(t){return t&&t!==this._popup||(t=this._popup,this._popup=null),t&&(this.removeLayer(t),t._isOpen=!1),this}}),o.Marker.include({openPopup:function(){return this._popup&&this._map&&!this._map.hasLayer(this._popup)&&(this._popup.setLatLng(this._latlng),this._map.openPopup(this._popup)),this},closePopup:function(){return this._popup&&this._popup._close(),this},togglePopup:function(){return this._popup&&(this._popup._isOpen?this.closePopup():this.openPopup()),this},bindPopup:function(t,e){var i=o.point(this.options.icon.options.popupAnchor||[0,0]);return i=i.add(o.Popup.prototype.options.offset),e&&e.offset&&(i=i.add(e.offset)),e=o.extend({offset:i},e),this._popupHandlersAdded||(this.on("click",this.togglePopup,this).on("remove",this.closePopup,this).on("move",this._movePopup,this),this._popupHandlersAdded=!0),t instanceof o.Popup?(o.setOptions(t,e),this._popup=t):this._popup=new o.Popup(e,this).setContent(t),this},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},unbindPopup:function(){return this._popup&&(this._popup=null,this.off("click",this.togglePopup,this).off("remove",this.closePopup,this).off("move",this._movePopup,this),this._popupHandlersAdded=!1),this},getPopup:function(){return this._popup},_movePopup:function(t){this._popup.setLatLng(t.latlng)}}),o.LayerGroup=o.Class.extend({initialize:function(t){this._layers={};var e,i;if(t)for(e=0,i=t.length;i>e;e++)this.addLayer(t[e])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){return t?t in this._layers||this.getLayerId(t)in this._layers:!1},clearLayers:function(){return this.eachLayer(this.removeLayer,this),this},invoke:function(t){var e,i,n=Array.prototype.slice.call(arguments,1);for(e in this._layers)i=this._layers[e],i[t]&&i[t].apply(i,n);return this},onAdd:function(t){this._map=t,this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t),this._map=null},addTo:function(t){return t.addLayer(this),this},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];for(var e in this._layers)t.push(this._layers[e]);return t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return o.stamp(t)}}),o.layerGroup=function(t){return new o.LayerGroup(t)},o.FeatureGroup=o.LayerGroup.extend({includes:o.Mixin.Events,statics:{EVENTS:"click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose"},addLayer:function(t){return this.hasLayer(t)?this:("on"in t&&t.on(o.FeatureGroup.EVENTS,this._propagateEvent,this),o.LayerGroup.prototype.addLayer.call(this,t),this._popupContent&&t.bindPopup&&t.bindPopup(this._popupContent,this._popupOptions),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.off(o.FeatureGroup.EVENTS,this._propagateEvent,this),o.LayerGroup.prototype.removeLayer.call(this,t),this._popupContent&&this.invoke("unbindPopup"),this.fire("layerremove",{layer:t})):this},bindPopup:function(t,e){return this._popupContent=t,this._popupOptions=e,this.invoke("bindPopup",t,e)},openPopup:function(t){for(var e in this._layers){this._layers[e].openPopup(t);break}return this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new o.LatLngBounds;return this.eachLayer(function(e){t.extend(e instanceof o.Marker?e.getLatLng():e.getBounds())}),t},_propagateEvent:function(t){t=o.extend({layer:t.target,target:this},t),this.fire(t.type,t)}}),o.featureGroup=function(t){return new o.FeatureGroup(t)},o.Path=o.Class.extend({includes:[o.Mixin.Events],statics:{CLIP_PADDING:function(){var e=o.Browser.mobile?1280:2e3,i=(e/Math.max(t.outerWidth,t.outerHeight)-1)/2;return Math.max(0,Math.min(.5,i))}()},options:{stroke:!0,color:"#0033ff",dashArray:null,lineCap:null,lineJoin:null,weight:5,opacity:.5,fill:!1,fillColor:null,fillOpacity:.2,clickable:!0},initialize:function(t){o.setOptions(this,t)},onAdd:function(t){this._map=t,this._container||(this._initElements(),this._initEvents()),this.projectLatlngs(),this._updatePath(),this._container&&this._map._pathRoot.appendChild(this._container),this.fire("add"),t.on({viewreset:this.projectLatlngs,moveend:this._updatePath},this)},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){t._pathRoot.removeChild(this._container),this.fire("remove"),this._map=null,o.Browser.vml&&(this._container=null,this._stroke=null,this._fill=null),t.off({viewreset:this.projectLatlngs,moveend:this._updatePath},this)},projectLatlngs:function(){},setStyle:function(t){return o.setOptions(this,t),this._container&&this._updateStyle(),this},redraw:function(){return this._map&&(this.projectLatlngs(),this._updatePath()),this}}),o.Map.include({_updatePathViewport:function(){var t=o.Path.CLIP_PADDING,e=this.getSize(),i=o.DomUtil.getPosition(this._mapPane),n=i.multiplyBy(-1)._subtract(e.multiplyBy(t)._round()),s=n.add(e.multiplyBy(1+2*t)._round());this._pathViewport=new o.Bounds(n,s)}}),o.Path.SVG_NS="http://www.w3.org/2000/svg",o.Browser.svg=!(!e.createElementNS||!e.createElementNS(o.Path.SVG_NS,"svg").createSVGRect),o.Path=o.Path.extend({statics:{SVG:o.Browser.svg},bringToFront:function(){var t=this._map._pathRoot,e=this._container;return e&&t.lastChild!==e&&t.appendChild(e),this},bringToBack:function(){var t=this._map._pathRoot,e=this._container,i=t.firstChild;return e&&i!==e&&t.insertBefore(e,i),this},getPathString:function(){},_createElement:function(t){return e.createElementNS(o.Path.SVG_NS,t)},_initElements:function(){this._map._initPathRoot(),this._initPath(),this._initStyle()},_initPath:function(){this._container=this._createElement("g"),this._path=this._createElement("path"),this.options.className&&o.DomUtil.addClass(this._path,this.options.className),this._container.appendChild(this._path)},_initStyle:function(){this.options.stroke&&(this._path.setAttribute("stroke-linejoin","round"),this._path.setAttribute("stroke-linecap","round")),this.options.fill&&this._path.setAttribute("fill-rule","evenodd"),this.options.pointerEvents&&this._path.setAttribute("pointer-events",this.options.pointerEvents),this.options.clickable||this.options.pointerEvents||this._path.setAttribute("pointer-events","none"),this._updateStyle()},_updateStyle:function(){this.options.stroke?(this._path.setAttribute("stroke",this.options.color),this._path.setAttribute("stroke-opacity",this.options.opacity),this._path.setAttribute("stroke-width",this.options.weight),this.options.dashArray?this._path.setAttribute("stroke-dasharray",this.options.dashArray):this._path.removeAttribute("stroke-dasharray"),this.options.lineCap&&this._path.setAttribute("stroke-linecap",this.options.lineCap),this.options.lineJoin&&this._path.setAttribute("stroke-linejoin",this.options.lineJoin)):this._path.setAttribute("stroke","none"),this.options.fill?(this._path.setAttribute("fill",this.options.fillColor||this.options.color),this._path.setAttribute("fill-opacity",this.options.fillOpacity)):this._path.setAttribute("fill","none")},_updatePath:function(){var t=this.getPathString();t||(t="M0 0"),this._path.setAttribute("d",t)},_initEvents:function(){if(this.options.clickable){(o.Browser.svg||!o.Browser.vml)&&o.DomUtil.addClass(this._path,"leaflet-clickable"),o.DomEvent.on(this._container,"click",this._onMouseClick,this);for(var t=["dblclick","mousedown","mouseover","mouseout","mousemove","contextmenu"],e=0;e<t.length;e++)o.DomEvent.on(this._container,t[e],this._fireMouseEvent,this)}},_onMouseClick:function(t){this._map.dragging&&this._map.dragging.moved()||this._fireMouseEvent(t)},_fireMouseEvent:function(t){if(this.hasEventListeners(t.type)){var e=this._map,i=e.mouseEventToContainerPoint(t),n=e.containerPointToLayerPoint(i),s=e.layerPointToLatLng(n);this.fire(t.type,{latlng:s,layerPoint:n,containerPoint:i,originalEvent:t}),"contextmenu"===t.type&&o.DomEvent.preventDefault(t),"mousemove"!==t.type&&o.DomEvent.stopPropagation(t)}}}),o.Map.include({_initPathRoot:function(){this._pathRoot||(this._pathRoot=o.Path.prototype._createElement("svg"),this._panes.overlayPane.appendChild(this._pathRoot),this.options.zoomAnimation&&o.Browser.any3d?(o.DomUtil.addClass(this._pathRoot,"leaflet-zoom-animated"),this.on({zoomanim:this._animatePathZoom,zoomend:this._endPathZoom})):o.DomUtil.addClass(this._pathRoot,"leaflet-zoom-hide"),this.on("moveend",this._updateSvgViewport),this._updateSvgViewport())
},_animatePathZoom:function(t){var e=this.getZoomScale(t.zoom),i=this._getCenterOffset(t.center)._multiplyBy(-e)._add(this._pathViewport.min);this._pathRoot.style[o.DomUtil.TRANSFORM]=o.DomUtil.getTranslateString(i)+" scale("+e+") ",this._pathZooming=!0},_endPathZoom:function(){this._pathZooming=!1},_updateSvgViewport:function(){if(!this._pathZooming){this._updatePathViewport();var t=this._pathViewport,e=t.min,i=t.max,n=i.x-e.x,s=i.y-e.y,a=this._pathRoot,r=this._panes.overlayPane;o.Browser.mobileWebkit&&r.removeChild(a),o.DomUtil.setPosition(a,e),a.setAttribute("width",n),a.setAttribute("height",s),a.setAttribute("viewBox",[e.x,e.y,n,s].join(" ")),o.Browser.mobileWebkit&&r.appendChild(a)}}}),o.Path.include({bindPopup:function(t,e){return t instanceof o.Popup?this._popup=t:((!this._popup||e)&&(this._popup=new o.Popup(e,this)),this._popup.setContent(t)),this._popupHandlersAdded||(this.on("click",this._openPopup,this).on("remove",this.closePopup,this),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this._popup=null,this.off("click",this._openPopup).off("remove",this.closePopup),this._popupHandlersAdded=!1),this},openPopup:function(t){return this._popup&&(t=t||this._latlng||this._latlngs[Math.floor(this._latlngs.length/2)],this._openPopup({latlng:t})),this},closePopup:function(){return this._popup&&this._popup._close(),this},_openPopup:function(t){this._popup.setLatLng(t.latlng),this._map.openPopup(this._popup)}}),o.Browser.vml=!o.Browser.svg&&function(){try{var t=e.createElement("div");t.innerHTML='<v:shape adj="1"/>';var i=t.firstChild;return i.style.behavior="url(#default#VML)",i&&"object"==typeof i.adj}catch(n){return!1}}(),o.Path=o.Browser.svg||!o.Browser.vml?o.Path:o.Path.extend({statics:{VML:!0,CLIP_PADDING:.02},_createElement:function(){try{return e.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return e.createElement("<lvml:"+t+' class="lvml">')}}catch(t){return function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}}(),_initPath:function(){var t=this._container=this._createElement("shape");o.DomUtil.addClass(t,"leaflet-vml-shape"+(this.options.className?" "+this.options.className:"")),this.options.clickable&&o.DomUtil.addClass(t,"leaflet-clickable"),t.coordsize="1 1",this._path=this._createElement("path"),t.appendChild(this._path),this._map._pathRoot.appendChild(t)},_initStyle:function(){this._updateStyle()},_updateStyle:function(){var t=this._stroke,e=this._fill,i=this.options,n=this._container;n.stroked=i.stroke,n.filled=i.fill,i.stroke?(t||(t=this._stroke=this._createElement("stroke"),t.endcap="round",n.appendChild(t)),t.weight=i.weight+"px",t.color=i.color,t.opacity=i.opacity,t.dashStyle=i.dashArray?o.Util.isArray(i.dashArray)?i.dashArray.join(" "):i.dashArray.replace(/( *, *)/g," "):"",i.lineCap&&(t.endcap=i.lineCap.replace("butt","flat")),i.lineJoin&&(t.joinstyle=i.lineJoin)):t&&(n.removeChild(t),this._stroke=null),i.fill?(e||(e=this._fill=this._createElement("fill"),n.appendChild(e)),e.color=i.fillColor||i.color,e.opacity=i.fillOpacity):e&&(n.removeChild(e),this._fill=null)},_updatePath:function(){var t=this._container.style;t.display="none",this._path.v=this.getPathString()+" ",t.display=""}}),o.Map.include(o.Browser.svg||!o.Browser.vml?{}:{_initPathRoot:function(){if(!this._pathRoot){var t=this._pathRoot=e.createElement("div");t.className="leaflet-vml-container",this._panes.overlayPane.appendChild(t),this.on("moveend",this._updatePathViewport),this._updatePathViewport()}}}),o.Browser.canvas=function(){return!!e.createElement("canvas").getContext}(),o.Path=o.Path.SVG&&!t.L_PREFER_CANVAS||!o.Browser.canvas?o.Path:o.Path.extend({statics:{CANVAS:!0,SVG:!1},redraw:function(){return this._map&&(this.projectLatlngs(),this._requestUpdate()),this},setStyle:function(t){return o.setOptions(this,t),this._map&&(this._updateStyle(),this._requestUpdate()),this},onRemove:function(t){t.off("viewreset",this.projectLatlngs,this).off("moveend",this._updatePath,this),this.options.clickable&&(this._map.off("click",this._onClick,this),this._map.off("mousemove",this._onMouseMove,this)),this._requestUpdate(),this.fire("remove"),this._map=null},_requestUpdate:function(){this._map&&!o.Path._updateRequest&&(o.Path._updateRequest=o.Util.requestAnimFrame(this._fireMapMoveEnd,this._map))},_fireMapMoveEnd:function(){o.Path._updateRequest=null,this.fire("moveend")},_initElements:function(){this._map._initPathRoot(),this._ctx=this._map._canvasCtx},_updateStyle:function(){var t=this.options;t.stroke&&(this._ctx.lineWidth=t.weight,this._ctx.strokeStyle=t.color),t.fill&&(this._ctx.fillStyle=t.fillColor||t.color)},_drawPath:function(){var t,e,i,n,s,a;for(this._ctx.beginPath(),t=0,i=this._parts.length;i>t;t++){for(e=0,n=this._parts[t].length;n>e;e++)s=this._parts[t][e],a=(0===e?"move":"line")+"To",this._ctx[a](s.x,s.y);this instanceof o.Polygon&&this._ctx.closePath()}},_checkIfEmpty:function(){return!this._parts.length},_updatePath:function(){if(!this._checkIfEmpty()){var t=this._ctx,e=this.options;this._drawPath(),t.save(),this._updateStyle(),e.fill&&(t.globalAlpha=e.fillOpacity,t.fill()),e.stroke&&(t.globalAlpha=e.opacity,t.stroke()),t.restore()}},_initEvents:function(){this.options.clickable&&(this._map.on("mousemove",this._onMouseMove,this),this._map.on("click",this._onClick,this))},_onClick:function(t){this._containsPoint(t.layerPoint)&&this.fire("click",t)},_onMouseMove:function(t){this._map&&!this._map._animatingZoom&&(this._containsPoint(t.layerPoint)?(this._ctx.canvas.style.cursor="pointer",this._mouseInside=!0,this.fire("mouseover",t)):this._mouseInside&&(this._ctx.canvas.style.cursor="",this._mouseInside=!1,this.fire("mouseout",t)))}}),o.Map.include(o.Path.SVG&&!t.L_PREFER_CANVAS||!o.Browser.canvas?{}:{_initPathRoot:function(){var t,i=this._pathRoot;i||(i=this._pathRoot=e.createElement("canvas"),i.style.position="absolute",t=this._canvasCtx=i.getContext("2d"),t.lineCap="round",t.lineJoin="round",this._panes.overlayPane.appendChild(i),this.options.zoomAnimation&&(this._pathRoot.className="leaflet-zoom-animated",this.on("zoomanim",this._animatePathZoom),this.on("zoomend",this._endPathZoom)),this.on("moveend",this._updateCanvasViewport),this._updateCanvasViewport())},_updateCanvasViewport:function(){if(!this._pathZooming){this._updatePathViewport();var t=this._pathViewport,e=t.min,i=t.max.subtract(e),n=this._pathRoot;o.DomUtil.setPosition(n,e),n.width=i.x,n.height=i.y,n.getContext("2d").translate(-e.x,-e.y)}}}),o.LineUtil={simplify:function(t,e){if(!e||!t.length)return t.slice();var i=e*e;return t=this._reducePoints(t,i),t=this._simplifyDP(t,i)},pointToSegmentDistance:function(t,e,i){return Math.sqrt(this._sqClosestPointOnSegment(t,e,i,!0))},closestPointOnSegment:function(t,e,i){return this._sqClosestPointOnSegment(t,e,i)},_simplifyDP:function(t,e){var n=t.length,o=typeof Uint8Array!=i+""?Uint8Array:Array,s=new o(n);s[0]=s[n-1]=1,this._simplifyDPStep(t,s,e,0,n-1);var a,r=[];for(a=0;n>a;a++)s[a]&&r.push(t[a]);return r},_simplifyDPStep:function(t,e,i,n,o){var s,a,r,h=0;for(a=n+1;o-1>=a;a++)r=this._sqClosestPointOnSegment(t[a],t[n],t[o],!0),r>h&&(s=a,h=r);h>i&&(e[s]=1,this._simplifyDPStep(t,e,i,n,s),this._simplifyDPStep(t,e,i,s,o))},_reducePoints:function(t,e){for(var i=[t[0]],n=1,o=0,s=t.length;s>n;n++)this._sqDist(t[n],t[o])>e&&(i.push(t[n]),o=n);return s-1>o&&i.push(t[s-1]),i},clipSegment:function(t,e,i,n){var o,s,a,r=n?this._lastCode:this._getBitCode(t,i),h=this._getBitCode(e,i);for(this._lastCode=h;;){if(!(r|h))return[t,e];if(r&h)return!1;o=r||h,s=this._getEdgeIntersection(t,e,o,i),a=this._getBitCode(s,i),o===r?(t=s,r=a):(e=s,h=a)}},_getEdgeIntersection:function(t,e,i,n){var s=e.x-t.x,a=e.y-t.y,r=n.min,h=n.max;return 8&i?new o.Point(t.x+s*(h.y-t.y)/a,h.y):4&i?new o.Point(t.x+s*(r.y-t.y)/a,r.y):2&i?new o.Point(h.x,t.y+a*(h.x-t.x)/s):1&i?new o.Point(r.x,t.y+a*(r.x-t.x)/s):void 0},_getBitCode:function(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i},_sqDist:function(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n},_sqClosestPointOnSegment:function(t,e,i,n){var s,a=e.x,r=e.y,h=i.x-a,l=i.y-r,u=h*h+l*l;return u>0&&(s=((t.x-a)*h+(t.y-r)*l)/u,s>1?(a=i.x,r=i.y):s>0&&(a+=h*s,r+=l*s)),h=t.x-a,l=t.y-r,n?h*h+l*l:new o.Point(a,r)}},o.Polyline=o.Path.extend({initialize:function(t,e){o.Path.prototype.initialize.call(this,e),this._latlngs=this._convertLatLngs(t)},options:{smoothFactor:1,noClip:!1},projectLatlngs:function(){this._originalPoints=[];for(var t=0,e=this._latlngs.length;e>t;t++)this._originalPoints[t]=this._map.latLngToLayerPoint(this._latlngs[t])},getPathString:function(){for(var t=0,e=this._parts.length,i="";e>t;t++)i+=this._getPathPartStr(this._parts[t]);return i},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._latlngs=this._convertLatLngs(t),this.redraw()},addLatLng:function(t){return this._latlngs.push(o.latLng(t)),this.redraw()},spliceLatLngs:function(){var t=[].splice.apply(this._latlngs,arguments);return this._convertLatLngs(this._latlngs,!0),this.redraw(),t},closestLayerPoint:function(t){for(var e,i,n=1/0,s=this._parts,a=null,r=0,h=s.length;h>r;r++)for(var l=s[r],u=1,c=l.length;c>u;u++){e=l[u-1],i=l[u];var d=o.LineUtil._sqClosestPointOnSegment(t,e,i,!0);n>d&&(n=d,a=o.LineUtil._sqClosestPointOnSegment(t,e,i))}return a&&(a.distance=Math.sqrt(n)),a},getBounds:function(){return new o.LatLngBounds(this.getLatLngs())},_convertLatLngs:function(t,e){var i,n,s=e?t:[];for(i=0,n=t.length;n>i;i++){if(o.Util.isArray(t[i])&&"number"!=typeof t[i][0])return;s[i]=o.latLng(t[i])}return s},_initEvents:function(){o.Path.prototype._initEvents.call(this)},_getPathPartStr:function(t){for(var e,i=o.Path.VML,n=0,s=t.length,a="";s>n;n++)e=t[n],i&&e._round(),a+=(n?"L":"M")+e.x+" "+e.y;return a},_clipPoints:function(){var t,e,i,n=this._originalPoints,s=n.length;if(this.options.noClip)return void(this._parts=[n]);this._parts=[];var a=this._parts,r=this._map._pathViewport,h=o.LineUtil;for(t=0,e=0;s-1>t;t++)i=h.clipSegment(n[t],n[t+1],r,t),i&&(a[e]=a[e]||[],a[e].push(i[0]),(i[1]!==n[t+1]||t===s-2)&&(a[e].push(i[1]),e++))},_simplifyPoints:function(){for(var t=this._parts,e=o.LineUtil,i=0,n=t.length;n>i;i++)t[i]=e.simplify(t[i],this.options.smoothFactor)},_updatePath:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),o.Path.prototype._updatePath.call(this))}}),o.polyline=function(t,e){return new o.Polyline(t,e)},o.PolyUtil={},o.PolyUtil.clipPolygon=function(t,e){var i,n,s,a,r,h,l,u,c,d=[1,4,2,8],p=o.LineUtil;for(n=0,l=t.length;l>n;n++)t[n]._code=p._getBitCode(t[n],e);for(a=0;4>a;a++){for(u=d[a],i=[],n=0,l=t.length,s=l-1;l>n;s=n++)r=t[n],h=t[s],r._code&u?h._code&u||(c=p._getEdgeIntersection(h,r,u,e),c._code=p._getBitCode(c,e),i.push(c)):(h._code&u&&(c=p._getEdgeIntersection(h,r,u,e),c._code=p._getBitCode(c,e),i.push(c)),i.push(r));t=i}return t},o.Polygon=o.Polyline.extend({options:{fill:!0},initialize:function(t,e){o.Polyline.prototype.initialize.call(this,t,e),this._initWithHoles(t)},_initWithHoles:function(t){var e,i,n;if(t&&o.Util.isArray(t[0])&&"number"!=typeof t[0][0])for(this._latlngs=this._convertLatLngs(t[0]),this._holes=t.slice(1),e=0,i=this._holes.length;i>e;e++)n=this._holes[e]=this._convertLatLngs(this._holes[e]),n[0].equals(n[n.length-1])&&n.pop();t=this._latlngs,t.length>=2&&t[0].equals(t[t.length-1])&&t.pop()},projectLatlngs:function(){if(o.Polyline.prototype.projectLatlngs.call(this),this._holePoints=[],this._holes){var t,e,i,n;for(t=0,i=this._holes.length;i>t;t++)for(this._holePoints[t]=[],e=0,n=this._holes[t].length;n>e;e++)this._holePoints[t][e]=this._map.latLngToLayerPoint(this._holes[t][e])}},setLatLngs:function(t){return t&&o.Util.isArray(t[0])&&"number"!=typeof t[0][0]?(this._initWithHoles(t),this.redraw()):o.Polyline.prototype.setLatLngs.call(this,t)},_clipPoints:function(){var t=this._originalPoints,e=[];if(this._parts=[t].concat(this._holePoints),!this.options.noClip){for(var i=0,n=this._parts.length;n>i;i++){var s=o.PolyUtil.clipPolygon(this._parts[i],this._map._pathViewport);s.length&&e.push(s)}this._parts=e}},_getPathPartStr:function(t){var e=o.Polyline.prototype._getPathPartStr.call(this,t);return e+(o.Browser.svg?"z":"x")}}),o.polygon=function(t,e){return new o.Polygon(t,e)},function(){function t(t){return o.FeatureGroup.extend({initialize:function(t,e){this._layers={},this._options=e,this.setLatLngs(t)},setLatLngs:function(e){var i=0,n=e.length;for(this.eachLayer(function(t){n>i?t.setLatLngs(e[i++]):this.removeLayer(t)},this);n>i;)this.addLayer(new t(e[i++],this._options));return this},getLatLngs:function(){var t=[];return this.eachLayer(function(e){t.push(e.getLatLngs())}),t}})}o.MultiPolyline=t(o.Polyline),o.MultiPolygon=t(o.Polygon),o.multiPolyline=function(t,e){return new o.MultiPolyline(t,e)},o.multiPolygon=function(t,e){return new o.MultiPolygon(t,e)}}(),o.Rectangle=o.Polygon.extend({initialize:function(t,e){o.Polygon.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=o.latLngBounds(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}}),o.rectangle=function(t,e){return new o.Rectangle(t,e)},o.Circle=o.Path.extend({initialize:function(t,e,i){o.Path.prototype.initialize.call(this,i),this._latlng=o.latLng(t),this._mRadius=e},options:{fill:!0},setLatLng:function(t){return this._latlng=o.latLng(t),this.redraw()},setRadius:function(t){return this._mRadius=t,this.redraw()},projectLatlngs:function(){var t=this._getLngRadius(),e=this._latlng,i=this._map.latLngToLayerPoint([e.lat,e.lng-t]);this._point=this._map.latLngToLayerPoint(e),this._radius=Math.max(this._point.x-i.x,1)},getBounds:function(){var t=this._getLngRadius(),e=this._mRadius/40075017*360,i=this._latlng;return new o.LatLngBounds([i.lat-e,i.lng-t],[i.lat+e,i.lng+t])},getLatLng:function(){return this._latlng},getPathString:function(){var t=this._point,e=this._radius;return this._checkIfEmpty()?"":o.Browser.svg?"M"+t.x+","+(t.y-e)+"A"+e+","+e+",0,1,1,"+(t.x-.1)+","+(t.y-e)+" z":(t._round(),e=Math.round(e),"AL "+t.x+","+t.y+" "+e+","+e+" 0,23592600")},getRadius:function(){return this._mRadius},_getLatRadius:function(){return this._mRadius/40075017*360},_getLngRadius:function(){return this._getLatRadius()/Math.cos(o.LatLng.DEG_TO_RAD*this._latlng.lat)},_checkIfEmpty:function(){if(!this._map)return!1;var t=this._map._pathViewport,e=this._radius,i=this._point;return i.x-e>t.max.x||i.y-e>t.max.y||i.x+e<t.min.x||i.y+e<t.min.y}}),o.circle=function(t,e,i){return new o.Circle(t,e,i)},o.CircleMarker=o.Circle.extend({options:{radius:10,weight:2},initialize:function(t,e){o.Circle.prototype.initialize.call(this,t,null,e),this._radius=this.options.radius},projectLatlngs:function(){this._point=this._map.latLngToLayerPoint(this._latlng)},_updateStyle:function(){o.Circle.prototype._updateStyle.call(this),this.setRadius(this.options.radius)},setLatLng:function(t){return o.Circle.prototype.setLatLng.call(this,t),this._popup&&this._popup._isOpen&&this._popup.setLatLng(t),this},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius}}),o.circleMarker=function(t,e){return new o.CircleMarker(t,e)},o.Polyline.include(o.Path.CANVAS?{_containsPoint:function(t,e){var i,n,s,a,r,h,l,u=this.options.weight/2;for(o.Browser.touch&&(u+=10),i=0,a=this._parts.length;a>i;i++)for(l=this._parts[i],n=0,r=l.length,s=r-1;r>n;s=n++)if((e||0!==n)&&(h=o.LineUtil.pointToSegmentDistance(t,l[s],l[n]),u>=h))return!0;return!1}}:{}),o.Polygon.include(o.Path.CANVAS?{_containsPoint:function(t){var e,i,n,s,a,r,h,l,u=!1;if(o.Polyline.prototype._containsPoint.call(this,t,!0))return!0;for(s=0,h=this._parts.length;h>s;s++)for(e=this._parts[s],a=0,l=e.length,r=l-1;l>a;r=a++)i=e[a],n=e[r],i.y>t.y!=n.y>t.y&&t.x<(n.x-i.x)*(t.y-i.y)/(n.y-i.y)+i.x&&(u=!u);return u}}:{}),o.Circle.include(o.Path.CANVAS?{_drawPath:function(){var t=this._point;this._ctx.beginPath(),this._ctx.arc(t.x,t.y,this._radius,0,2*Math.PI,!1)},_containsPoint:function(t){var e=this._point,i=this.options.stroke?this.options.weight/2:0;return t.distanceTo(e)<=this._radius+i}}:{}),o.CircleMarker.include(o.Path.CANVAS?{_updateStyle:function(){o.Path.prototype._updateStyle.call(this)}}:{}),o.GeoJSON=o.FeatureGroup.extend({initialize:function(t,e){o.setOptions(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e,i,n,s=o.Util.isArray(t)?t:t.features;if(s){for(e=0,i=s.length;i>e;e++)n=s[e],(n.geometries||n.geometry||n.features||n.coordinates)&&this.addData(s[e]);return this}var a=this.options;if(!a.filter||a.filter(t)){var r=o.GeoJSON.geometryToLayer(t,a.pointToLayer,a.coordsToLatLng,a);return r.feature=o.GeoJSON.asFeature(t),r.defaultOptions=r.options,this.resetStyle(r),a.onEachFeature&&a.onEachFeature(t,r),this.addLayer(r)}},resetStyle:function(t){var e=this.options.style;e&&(o.Util.extend(t.options,t.defaultOptions),this._setLayerStyle(t,e))},setStyle:function(t){this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){"function"==typeof e&&(e=e(t.feature)),t.setStyle&&t.setStyle(e)}}),o.extend(o.GeoJSON,{geometryToLayer:function(t,e,i,n){var s,a,r,h,l="Feature"===t.type?t.geometry:t,u=l.coordinates,c=[];switch(i=i||this.coordsToLatLng,l.type){case"Point":return s=i(u),e?e(t,s):new o.Marker(s);case"MultiPoint":for(r=0,h=u.length;h>r;r++)s=i(u[r]),c.push(e?e(t,s):new o.Marker(s));return new o.FeatureGroup(c);case"LineString":return a=this.coordsToLatLngs(u,0,i),new o.Polyline(a,n);case"Polygon":if(2===u.length&&!u[1].length)throw new Error("Invalid GeoJSON object.");return a=this.coordsToLatLngs(u,1,i),new o.Polygon(a,n);case"MultiLineString":return a=this.coordsToLatLngs(u,1,i),new o.MultiPolyline(a,n);case"MultiPolygon":return a=this.coordsToLatLngs(u,2,i),new o.MultiPolygon(a,n);case"GeometryCollection":for(r=0,h=l.geometries.length;h>r;r++)c.push(this.geometryToLayer({geometry:l.geometries[r],type:"Feature",properties:t.properties},e,i,n));return new o.FeatureGroup(c);default:throw new Error("Invalid GeoJSON object.")}},coordsToLatLng:function(t){return new o.LatLng(t[1],t[0],t[2])},coordsToLatLngs:function(t,e,i){var n,o,s,a=[];for(o=0,s=t.length;s>o;o++)n=e?this.coordsToLatLngs(t[o],e-1,i):(i||this.coordsToLatLng)(t[o]),a.push(n);return a},latLngToCoords:function(t){var e=[t.lng,t.lat];return t.alt!==i&&e.push(t.alt),e},latLngsToCoords:function(t){for(var e=[],i=0,n=t.length;n>i;i++)e.push(o.GeoJSON.latLngToCoords(t[i]));return e},getFeature:function(t,e){return t.feature?o.extend({},t.feature,{geometry:e}):o.GeoJSON.asFeature(e)},asFeature:function(t){return"Feature"===t.type?t:{type:"Feature",properties:{},geometry:t}}});var a={toGeoJSON:function(){return o.GeoJSON.getFeature(this,{type:"Point",coordinates:o.GeoJSON.latLngToCoords(this.getLatLng())})}};o.Marker.include(a),o.Circle.include(a),o.CircleMarker.include(a),o.Polyline.include({toGeoJSON:function(){return o.GeoJSON.getFeature(this,{type:"LineString",coordinates:o.GeoJSON.latLngsToCoords(this.getLatLngs())})}}),o.Polygon.include({toGeoJSON:function(){var t,e,i,n=[o.GeoJSON.latLngsToCoords(this.getLatLngs())];if(n[0].push(n[0][0]),this._holes)for(t=0,e=this._holes.length;e>t;t++)i=o.GeoJSON.latLngsToCoords(this._holes[t]),i.push(i[0]),n.push(i);return o.GeoJSON.getFeature(this,{type:"Polygon",coordinates:n})}}),function(){function t(t){return function(){var e=[];return this.eachLayer(function(t){e.push(t.toGeoJSON().geometry.coordinates)}),o.GeoJSON.getFeature(this,{type:t,coordinates:e})}}o.MultiPolyline.include({toGeoJSON:t("MultiLineString")}),o.MultiPolygon.include({toGeoJSON:t("MultiPolygon")}),o.LayerGroup.include({toGeoJSON:function(){var e,i=this.feature&&this.feature.geometry,n=[];if(i&&"MultiPoint"===i.type)return t("MultiPoint").call(this);var s=i&&"GeometryCollection"===i.type;return this.eachLayer(function(t){t.toGeoJSON&&(e=t.toGeoJSON(),n.push(s?e.geometry:o.GeoJSON.asFeature(e)))}),s?o.GeoJSON.getFeature(this,{geometries:n,type:"GeometryCollection"}):{type:"FeatureCollection",features:n}}})}(),o.geoJson=function(t,e){return new o.GeoJSON(t,e)},o.DomEvent={addListener:function(t,e,i,n){var s,a,r,h=o.stamp(i),l="_leaflet_"+e+h;return t[l]?this:(s=function(e){return i.call(n||t,e||o.DomEvent._getEvent())},o.Browser.pointer&&0===e.indexOf("touch")?this.addPointerListener(t,e,s,h):(o.Browser.touch&&"dblclick"===e&&this.addDoubleTapListener&&this.addDoubleTapListener(t,s,h),"addEventListener"in t?"mousewheel"===e?(t.addEventListener("DOMMouseScroll",s,!1),t.addEventListener(e,s,!1)):"mouseenter"===e||"mouseleave"===e?(a=s,r="mouseenter"===e?"mouseover":"mouseout",s=function(e){return o.DomEvent._checkMouse(t,e)?a(e):void 0},t.addEventListener(r,s,!1)):"click"===e&&o.Browser.android?(a=s,s=function(t){return o.DomEvent._filterClick(t,a)},t.addEventListener(e,s,!1)):t.addEventListener(e,s,!1):"attachEvent"in t&&t.attachEvent("on"+e,s),t[l]=s,this))},removeListener:function(t,e,i){var n=o.stamp(i),s="_leaflet_"+e+n,a=t[s];return a?(o.Browser.pointer&&0===e.indexOf("touch")?this.removePointerListener(t,e,n):o.Browser.touch&&"dblclick"===e&&this.removeDoubleTapListener?this.removeDoubleTapListener(t,n):"removeEventListener"in t?"mousewheel"===e?(t.removeEventListener("DOMMouseScroll",a,!1),t.removeEventListener(e,a,!1)):"mouseenter"===e||"mouseleave"===e?t.removeEventListener("mouseenter"===e?"mouseover":"mouseout",a,!1):t.removeEventListener(e,a,!1):"detachEvent"in t&&t.detachEvent("on"+e,a),t[s]=null,this):this},stopPropagation:function(t){return t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,o.DomEvent._skipped(t),this},disableScrollPropagation:function(t){var e=o.DomEvent.stopPropagation;return o.DomEvent.on(t,"mousewheel",e).on(t,"MozMousePixelScroll",e)},disableClickPropagation:function(t){for(var e=o.DomEvent.stopPropagation,i=o.Draggable.START.length-1;i>=0;i--)o.DomEvent.on(t,o.Draggable.START[i],e);return o.DomEvent.on(t,"click",o.DomEvent._fakeStop).on(t,"dblclick",e)},preventDefault:function(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this},stop:function(t){return o.DomEvent.preventDefault(t).stopPropagation(t)},getMousePosition:function(t,e){if(!e)return new o.Point(t.clientX,t.clientY);var i=e.getBoundingClientRect();return new o.Point(t.clientX-i.left-e.clientLeft,t.clientY-i.top-e.clientTop)},getWheelDelta:function(t){var e=0;return t.wheelDelta&&(e=t.wheelDelta/120),t.detail&&(e=-t.detail/3),e},_skipEvents:{},_fakeStop:function(t){o.DomEvent._skipEvents[t.type]=!0},_skipped:function(t){var e=this._skipEvents[t.type];return this._skipEvents[t.type]=!1,e},_checkMouse:function(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;)i=i.parentNode}catch(n){return!1}return i!==t},_getEvent:function(){var e=t.event;if(!e)for(var i=arguments.callee.caller;i&&(e=i.arguments[0],!e||t.Event!==e.constructor);)i=i.caller;return e},_filterClick:function(t,e){var i=t.timeStamp||t.originalEvent.timeStamp,n=o.DomEvent._lastClick&&i-o.DomEvent._lastClick;return n&&n>100&&500>n||t.target._simulatedClick&&!t._simulated?void o.DomEvent.stop(t):(o.DomEvent._lastClick=i,e(t))}},o.DomEvent.on=o.DomEvent.addListener,o.DomEvent.off=o.DomEvent.removeListener,o.Draggable=o.Class.extend({includes:o.Mixin.Events,statics:{START:o.Browser.touch?["touchstart","mousedown"]:["mousedown"],END:{mousedown:"mouseup",touchstart:"touchend",pointerdown:"touchend",MSPointerDown:"touchend"},MOVE:{mousedown:"mousemove",touchstart:"touchmove",pointerdown:"touchmove",MSPointerDown:"touchmove"}},initialize:function(t,e){this._element=t,this._dragStartTarget=e||t},enable:function(){if(!this._enabled){for(var t=o.Draggable.START.length-1;t>=0;t--)o.DomEvent.on(this._dragStartTarget,o.Draggable.START[t],this._onDown,this);this._enabled=!0}},disable:function(){if(this._enabled){for(var t=o.Draggable.START.length-1;t>=0;t--)o.DomEvent.off(this._dragStartTarget,o.Draggable.START[t],this._onDown,this);this._enabled=!1,this._moved=!1}},_onDown:function(t){if(this._moved=!1,!(t.shiftKey||1!==t.which&&1!==t.button&&!t.touches||(o.DomEvent.stopPropagation(t),o.Draggable._disabled||(o.DomUtil.disableImageDrag(),o.DomUtil.disableTextSelection(),this._moving)))){var i=t.touches?t.touches[0]:t;this._startPoint=new o.Point(i.clientX,i.clientY),this._startPos=this._newPos=o.DomUtil.getPosition(this._element),o.DomEvent.on(e,o.Draggable.MOVE[t.type],this._onMove,this).on(e,o.Draggable.END[t.type],this._onUp,this)}},_onMove:function(t){if(t.touches&&t.touches.length>1)return void(this._moved=!0);var i=t.touches&&1===t.touches.length?t.touches[0]:t,n=new o.Point(i.clientX,i.clientY),s=n.subtract(this._startPoint);(s.x||s.y)&&(o.Browser.touch&&Math.abs(s.x)+Math.abs(s.y)<3||(o.DomEvent.preventDefault(t),this._moved||(this.fire("dragstart"),this._moved=!0,this._startPos=o.DomUtil.getPosition(this._element).subtract(s),o.DomUtil.addClass(e.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,o.DomUtil.addClass(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(s),this._moving=!0,o.Util.cancelAnimFrame(this._animRequest),this._animRequest=o.Util.requestAnimFrame(this._updatePosition,this,!0,this._dragStartTarget)))},_updatePosition:function(){this.fire("predrag"),o.DomUtil.setPosition(this._element,this._newPos),this.fire("drag")},_onUp:function(){o.DomUtil.removeClass(e.body,"leaflet-dragging"),this._lastTarget&&(o.DomUtil.removeClass(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null);for(var t in o.Draggable.MOVE)o.DomEvent.off(e,o.Draggable.MOVE[t],this._onMove).off(e,o.Draggable.END[t],this._onUp);o.DomUtil.enableImageDrag(),o.DomUtil.enableTextSelection(),this._moved&&this._moving&&(o.Util.cancelAnimFrame(this._animRequest),this.fire("dragend",{distance:this._newPos.distanceTo(this._startPos)})),this._moving=!1}}),o.Handler=o.Class.extend({initialize:function(t){this._map=t},enable:function(){this._enabled||(this._enabled=!0,this.addHooks())},disable:function(){this._enabled&&(this._enabled=!1,this.removeHooks())},enabled:function(){return!!this._enabled}}),o.Map.mergeOptions({dragging:!0,inertia:!o.Browser.android23,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,inertiaThreshold:o.Browser.touch?32:18,easeLinearity:.25,worldCopyJump:!1}),o.Map.Drag=o.Handler.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new o.Draggable(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDrag,this),t.on("viewreset",this._onViewReset,this),t.whenReady(this._onViewReset,this))}this._draggable.enable()},removeHooks:function(){this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){var t=this._map;t._panAnim&&t._panAnim.stop(),t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(){if(this._map.options.inertia){var t=this._lastTime=+new Date,e=this._lastPos=this._draggable._newPos;this._positions.push(e),this._times.push(t),t-this._times[0]>200&&(this._positions.shift(),this._times.shift())}this._map.fire("move").fire("drag")},_onViewReset:function(){var t=this._map.getSize()._divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.project([0,180]).x},_onPreDrag:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,o=(n-e+i)%t+e-i,s=(n+e+i)%t-e-i,a=Math.abs(o+i)<Math.abs(s+i)?o:s;this._draggable._newPos.x=a},_onDragEnd:function(t){var e=this._map,i=e.options,n=+new Date-this._lastTime,s=!i.inertia||n>i.inertiaThreshold||!this._positions[0];if(e.fire("dragend",t),s)e.fire("moveend");else{var a=this._lastPos.subtract(this._positions[0]),r=(this._lastTime+n-this._times[0])/1e3,h=i.easeLinearity,l=a.multiplyBy(h/r),u=l.distanceTo([0,0]),c=Math.min(i.inertiaMaxSpeed,u),d=l.multiplyBy(c/u),p=c/(i.inertiaDeceleration*h),_=d.multiplyBy(-p/2).round();_.x&&_.y?(_=e._limitOffset(_,e.options.maxBounds),o.Util.requestAnimFrame(function(){e.panBy(_,{duration:p,easeLinearity:h,noMoveStart:!0})})):e.fire("moveend")}}}),o.Map.addInitHook("addHandler","dragging",o.Map.Drag),o.Map.mergeOptions({doubleClickZoom:!0}),o.Map.DoubleClickZoom=o.Handler.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,i=e.getZoom()+(t.originalEvent.shiftKey?-1:1);"center"===e.options.doubleClickZoom?e.setZoom(i):e.setZoomAround(t.containerPoint,i)}}),o.Map.addInitHook("addHandler","doubleClickZoom",o.Map.DoubleClickZoom),o.Map.mergeOptions({scrollWheelZoom:!0}),o.Map.ScrollWheelZoom=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"mousewheel",this._onWheelScroll,this),o.DomEvent.on(this._map._container,"MozMousePixelScroll",o.DomEvent.preventDefault),this._delta=0},removeHooks:function(){o.DomEvent.off(this._map._container,"mousewheel",this._onWheelScroll),o.DomEvent.off(this._map._container,"MozMousePixelScroll",o.DomEvent.preventDefault)},_onWheelScroll:function(t){var e=o.DomEvent.getWheelDelta(t);this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var i=Math.max(40-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(o.bind(this._performZoom,this),i),o.DomEvent.preventDefault(t),o.DomEvent.stopPropagation(t)},_performZoom:function(){var t=this._map,e=this._delta,i=t.getZoom();e=e>0?Math.ceil(e):Math.floor(e),e=Math.max(Math.min(e,4),-4),e=t._limitZoom(i+e)-i,this._delta=0,this._startTime=null,e&&("center"===t.options.scrollWheelZoom?t.setZoom(i+e):t.setZoomAround(this._lastMousePos,i+e))}}),o.Map.addInitHook("addHandler","scrollWheelZoom",o.Map.ScrollWheelZoom),o.extend(o.DomEvent,{_touchstart:o.Browser.msPointer?"MSPointerDown":o.Browser.pointer?"pointerdown":"touchstart",_touchend:o.Browser.msPointer?"MSPointerUp":o.Browser.pointer?"pointerup":"touchend",addDoubleTapListener:function(t,i,n){function s(t){var e;if(o.Browser.pointer?(_.push(t.pointerId),e=_.length):e=t.touches.length,!(e>1)){var i=Date.now(),n=i-(r||i);h=t.touches?t.touches[0]:t,l=n>0&&u>=n,r=i}}function a(t){if(o.Browser.pointer){var e=_.indexOf(t.pointerId);if(-1===e)return;_.splice(e,1)}if(l){if(o.Browser.pointer){var n,s={};for(var a in h)n=h[a],s[a]="function"==typeof n?n.bind(h):n;h=s}h.type="dblclick",i(h),r=null}}var r,h,l=!1,u=250,c="_leaflet_",d=this._touchstart,p=this._touchend,_=[];t[c+d+n]=s,t[c+p+n]=a;var m=o.Browser.pointer?e.documentElement:t;return t.addEventListener(d,s,!1),m.addEventListener(p,a,!1),o.Browser.pointer&&m.addEventListener(o.DomEvent.POINTER_CANCEL,a,!1),this},removeDoubleTapListener:function(t,i){var n="_leaflet_";return t.removeEventListener(this._touchstart,t[n+this._touchstart+i],!1),(o.Browser.pointer?e.documentElement:t).removeEventListener(this._touchend,t[n+this._touchend+i],!1),o.Browser.pointer&&e.documentElement.removeEventListener(o.DomEvent.POINTER_CANCEL,t[n+this._touchend+i],!1),this}}),o.extend(o.DomEvent,{POINTER_DOWN:o.Browser.msPointer?"MSPointerDown":"pointerdown",POINTER_MOVE:o.Browser.msPointer?"MSPointerMove":"pointermove",POINTER_UP:o.Browser.msPointer?"MSPointerUp":"pointerup",POINTER_CANCEL:o.Browser.msPointer?"MSPointerCancel":"pointercancel",_pointers:[],_pointerDocumentListener:!1,addPointerListener:function(t,e,i,n){switch(e){case"touchstart":return this.addPointerListenerStart(t,e,i,n);case"touchend":return this.addPointerListenerEnd(t,e,i,n);case"touchmove":return this.addPointerListenerMove(t,e,i,n);default:throw"Unknown touch event type"}},addPointerListenerStart:function(t,i,n,s){var a="_leaflet_",r=this._pointers,h=function(t){o.DomEvent.preventDefault(t);for(var e=!1,i=0;i<r.length;i++)if(r[i].pointerId===t.pointerId){e=!0;
break}e||r.push(t),t.touches=r.slice(),t.changedTouches=[t],n(t)};if(t[a+"touchstart"+s]=h,t.addEventListener(this.POINTER_DOWN,h,!1),!this._pointerDocumentListener){var l=function(t){for(var e=0;e<r.length;e++)if(r[e].pointerId===t.pointerId){r.splice(e,1);break}};e.documentElement.addEventListener(this.POINTER_UP,l,!1),e.documentElement.addEventListener(this.POINTER_CANCEL,l,!1),this._pointerDocumentListener=!0}return this},addPointerListenerMove:function(t,e,i,n){function o(t){if(t.pointerType!==t.MSPOINTER_TYPE_MOUSE&&"mouse"!==t.pointerType||0!==t.buttons){for(var e=0;e<a.length;e++)if(a[e].pointerId===t.pointerId){a[e]=t;break}t.touches=a.slice(),t.changedTouches=[t],i(t)}}var s="_leaflet_",a=this._pointers;return t[s+"touchmove"+n]=o,t.addEventListener(this.POINTER_MOVE,o,!1),this},addPointerListenerEnd:function(t,e,i,n){var o="_leaflet_",s=this._pointers,a=function(t){for(var e=0;e<s.length;e++)if(s[e].pointerId===t.pointerId){s.splice(e,1);break}t.touches=s.slice(),t.changedTouches=[t],i(t)};return t[o+"touchend"+n]=a,t.addEventListener(this.POINTER_UP,a,!1),t.addEventListener(this.POINTER_CANCEL,a,!1),this},removePointerListener:function(t,e,i){var n="_leaflet_",o=t[n+e+i];switch(e){case"touchstart":t.removeEventListener(this.POINTER_DOWN,o,!1);break;case"touchmove":t.removeEventListener(this.POINTER_MOVE,o,!1);break;case"touchend":t.removeEventListener(this.POINTER_UP,o,!1),t.removeEventListener(this.POINTER_CANCEL,o,!1)}return this}}),o.Map.mergeOptions({touchZoom:o.Browser.touch&&!o.Browser.android23,bounceAtZoomLimits:!0}),o.Map.TouchZoom=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){o.DomEvent.off(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var i=this._map;if(t.touches&&2===t.touches.length&&!i._animatingZoom&&!this._zooming){var n=i.mouseEventToLayerPoint(t.touches[0]),s=i.mouseEventToLayerPoint(t.touches[1]),a=i._getCenterLayerPoint();this._startCenter=n.add(s)._divideBy(2),this._startDist=n.distanceTo(s),this._moved=!1,this._zooming=!0,this._centerOffset=a.subtract(this._startCenter),i._panAnim&&i._panAnim.stop(),o.DomEvent.on(e,"touchmove",this._onTouchMove,this).on(e,"touchend",this._onTouchEnd,this),o.DomEvent.preventDefault(t)}},_onTouchMove:function(t){var e=this._map;if(t.touches&&2===t.touches.length&&this._zooming){var i=e.mouseEventToLayerPoint(t.touches[0]),n=e.mouseEventToLayerPoint(t.touches[1]);this._scale=i.distanceTo(n)/this._startDist,this._delta=i._add(n)._divideBy(2)._subtract(this._startCenter),1!==this._scale&&(e.options.bounceAtZoomLimits||!(e.getZoom()===e.getMinZoom()&&this._scale<1||e.getZoom()===e.getMaxZoom()&&this._scale>1))&&(this._moved||(o.DomUtil.addClass(e._mapPane,"leaflet-touching"),e.fire("movestart").fire("zoomstart"),this._moved=!0),o.Util.cancelAnimFrame(this._animRequest),this._animRequest=o.Util.requestAnimFrame(this._updateOnMove,this,!0,this._map._container),o.DomEvent.preventDefault(t))}},_updateOnMove:function(){var t=this._map,e=this._getScaleOrigin(),i=t.layerPointToLatLng(e),n=t.getScaleZoom(this._scale);t._animateZoom(i,n,this._startCenter,this._scale,this._delta,!1,!0)},_onTouchEnd:function(){if(!this._moved||!this._zooming)return void(this._zooming=!1);var t=this._map;this._zooming=!1,o.DomUtil.removeClass(t._mapPane,"leaflet-touching"),o.Util.cancelAnimFrame(this._animRequest),o.DomEvent.off(e,"touchmove",this._onTouchMove).off(e,"touchend",this._onTouchEnd);var i=this._getScaleOrigin(),n=t.layerPointToLatLng(i),s=t.getZoom(),a=t.getScaleZoom(this._scale)-s,r=a>0?Math.ceil(a):Math.floor(a),h=t._limitZoom(s+r),l=t.getZoomScale(h)/this._scale;t._animateZoom(n,h,i,l)},_getScaleOrigin:function(){var t=this._centerOffset.subtract(this._delta).divideBy(this._scale);return this._startCenter.add(t)}}),o.Map.addInitHook("addHandler","touchZoom",o.Map.TouchZoom),o.Map.mergeOptions({tap:!0,tapTolerance:15}),o.Map.Tap=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){o.DomEvent.off(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(t.touches){if(o.DomEvent.preventDefault(t),this._fireClick=!0,t.touches.length>1)return this._fireClick=!1,void clearTimeout(this._holdTimeout);var i=t.touches[0],n=i.target;this._startPos=this._newPos=new o.Point(i.clientX,i.clientY),n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.addClass(n,"leaflet-active"),this._holdTimeout=setTimeout(o.bind(function(){this._isTapValid()&&(this._fireClick=!1,this._onUp(),this._simulateEvent("contextmenu",i))},this),1e3),o.DomEvent.on(e,"touchmove",this._onMove,this).on(e,"touchend",this._onUp,this)}},_onUp:function(t){if(clearTimeout(this._holdTimeout),o.DomEvent.off(e,"touchmove",this._onMove,this).off(e,"touchend",this._onUp,this),this._fireClick&&t&&t.changedTouches){var i=t.changedTouches[0],n=i.target;n&&n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.removeClass(n,"leaflet-active"),this._isTapValid()&&this._simulateEvent("click",i)}},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_onMove:function(t){var e=t.touches[0];this._newPos=new o.Point(e.clientX,e.clientY)},_simulateEvent:function(i,n){var o=e.createEvent("MouseEvents");o._simulated=!0,n.target._simulatedClick=!0,o.initMouseEvent(i,!0,!0,t,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),n.target.dispatchEvent(o)}}),o.Browser.touch&&!o.Browser.pointer&&o.Map.addInitHook("addHandler","tap",o.Map.Tap),o.Map.mergeOptions({boxZoom:!0}),o.Map.BoxZoom=o.Handler.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._moved=!1},addHooks:function(){o.DomEvent.on(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){o.DomEvent.off(this._container,"mousedown",this._onMouseDown),this._moved=!1},moved:function(){return this._moved},_onMouseDown:function(t){return this._moved=!1,!t.shiftKey||1!==t.which&&1!==t.button?!1:(o.DomUtil.disableTextSelection(),o.DomUtil.disableImageDrag(),this._startLayerPoint=this._map.mouseEventToLayerPoint(t),void o.DomEvent.on(e,"mousemove",this._onMouseMove,this).on(e,"mouseup",this._onMouseUp,this).on(e,"keydown",this._onKeyDown,this))},_onMouseMove:function(t){this._moved||(this._box=o.DomUtil.create("div","leaflet-zoom-box",this._pane),o.DomUtil.setPosition(this._box,this._startLayerPoint),this._container.style.cursor="crosshair",this._map.fire("boxzoomstart"));var e=this._startLayerPoint,i=this._box,n=this._map.mouseEventToLayerPoint(t),s=n.subtract(e),a=new o.Point(Math.min(n.x,e.x),Math.min(n.y,e.y));o.DomUtil.setPosition(i,a),this._moved=!0,i.style.width=Math.max(0,Math.abs(s.x)-4)+"px",i.style.height=Math.max(0,Math.abs(s.y)-4)+"px"},_finish:function(){this._moved&&(this._pane.removeChild(this._box),this._container.style.cursor=""),o.DomUtil.enableTextSelection(),o.DomUtil.enableImageDrag(),o.DomEvent.off(e,"mousemove",this._onMouseMove).off(e,"mouseup",this._onMouseUp).off(e,"keydown",this._onKeyDown)},_onMouseUp:function(t){this._finish();var e=this._map,i=e.mouseEventToLayerPoint(t);if(!this._startLayerPoint.equals(i)){var n=new o.LatLngBounds(e.layerPointToLatLng(this._startLayerPoint),e.layerPointToLatLng(i));e.fitBounds(n),e.fire("boxzoomend",{boxZoomBounds:n})}},_onKeyDown:function(t){27===t.keyCode&&this._finish()}}),o.Map.addInitHook("addHandler","boxZoom",o.Map.BoxZoom),o.Map.mergeOptions({keyboard:!0,keyboardPanOffset:80,keyboardZoomOffset:1}),o.Map.Keyboard=o.Handler.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,173]},initialize:function(t){this._map=t,this._setPanOffset(t.options.keyboardPanOffset),this._setZoomOffset(t.options.keyboardZoomOffset)},addHooks:function(){var t=this._map._container;-1===t.tabIndex&&(t.tabIndex="0"),o.DomEvent.on(t,"focus",this._onFocus,this).on(t,"blur",this._onBlur,this).on(t,"mousedown",this._onMouseDown,this),this._map.on("focus",this._addHooks,this).on("blur",this._removeHooks,this)},removeHooks:function(){this._removeHooks();var t=this._map._container;o.DomEvent.off(t,"focus",this._onFocus,this).off(t,"blur",this._onBlur,this).off(t,"mousedown",this._onMouseDown,this),this._map.off("focus",this._addHooks,this).off("blur",this._removeHooks,this)},_onMouseDown:function(){if(!this._focused){var i=e.body,n=e.documentElement,o=i.scrollTop||n.scrollTop,s=i.scrollLeft||n.scrollLeft;this._map._container.focus(),t.scrollTo(s,o)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanOffset:function(t){var e,i,n=this._panKeys={},o=this.keyCodes;for(e=0,i=o.left.length;i>e;e++)n[o.left[e]]=[-1*t,0];for(e=0,i=o.right.length;i>e;e++)n[o.right[e]]=[t,0];for(e=0,i=o.down.length;i>e;e++)n[o.down[e]]=[0,t];for(e=0,i=o.up.length;i>e;e++)n[o.up[e]]=[0,-1*t]},_setZoomOffset:function(t){var e,i,n=this._zoomKeys={},o=this.keyCodes;for(e=0,i=o.zoomIn.length;i>e;e++)n[o.zoomIn[e]]=t;for(e=0,i=o.zoomOut.length;i>e;e++)n[o.zoomOut[e]]=-t},_addHooks:function(){o.DomEvent.on(e,"keydown",this._onKeyDown,this)},_removeHooks:function(){o.DomEvent.off(e,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){var e=t.keyCode,i=this._map;if(e in this._panKeys){if(i._panAnim&&i._panAnim._inProgress)return;i.panBy(this._panKeys[e]),i.options.maxBounds&&i.panInsideBounds(i.options.maxBounds)}else{if(!(e in this._zoomKeys))return;i.setZoom(i.getZoom()+this._zoomKeys[e])}o.DomEvent.stop(t)}}),o.Map.addInitHook("addHandler","keyboard",o.Map.Keyboard),o.Handler.MarkerDrag=o.Handler.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new o.Draggable(t,t)),this._draggable.on("dragstart",this._onDragStart,this).on("drag",this._onDrag,this).on("dragend",this._onDragEnd,this),this._draggable.enable(),o.DomUtil.addClass(this._marker._icon,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off("dragstart",this._onDragStart,this).off("drag",this._onDrag,this).off("dragend",this._onDragEnd,this),this._draggable.disable(),o.DomUtil.removeClass(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){this._marker.closePopup().fire("movestart").fire("dragstart")},_onDrag:function(){var t=this._marker,e=t._shadow,i=o.DomUtil.getPosition(t._icon),n=t._map.layerPointToLatLng(i);e&&o.DomUtil.setPosition(e,i),t._latlng=n,t.fire("move",{latlng:n}).fire("drag")},_onDragEnd:function(t){this._marker.fire("moveend").fire("dragend",t)}}),o.Control=o.Class.extend({options:{position:"topright"},initialize:function(t){o.setOptions(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i];return o.DomUtil.addClass(e,"leaflet-control"),-1!==i.indexOf("bottom")?n.insertBefore(e,n.firstChild):n.appendChild(e),this},removeFrom:function(t){var e=this.getPosition(),i=t._controlCorners[e];return i.removeChild(this._container),this._map=null,this.onRemove&&this.onRemove(t),this},_refocusOnMap:function(){this._map&&this._map.getContainer().focus()}}),o.control=function(t){return new o.Control(t)},o.Map.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.removeFrom(this),this},_initControlPos:function(){function t(t,s){var a=i+t+" "+i+s;e[t+s]=o.DomUtil.create("div",a,n)}var e=this._controlCorners={},i="leaflet-",n=this._controlContainer=o.DomUtil.create("div",i+"control-container",this._container);t("top","left"),t("top","right"),t("bottom","left"),t("bottom","right")},_clearControlPos:function(){this._container.removeChild(this._controlContainer)}}),o.Control.Zoom=o.Control.extend({options:{position:"topleft",zoomInText:"+",zoomInTitle:"Zoom in",zoomOutText:"-",zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",i=o.DomUtil.create("div",e+" leaflet-bar");return this._map=t,this._zoomInButton=this._createButton(this.options.zoomInText,this.options.zoomInTitle,e+"-in",i,this._zoomIn,this),this._zoomOutButton=this._createButton(this.options.zoomOutText,this.options.zoomOutTitle,e+"-out",i,this._zoomOut,this),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},_zoomIn:function(t){this._map.zoomIn(t.shiftKey?3:1)},_zoomOut:function(t){this._map.zoomOut(t.shiftKey?3:1)},_createButton:function(t,e,i,n,s,a){var r=o.DomUtil.create("a",i,n);r.innerHTML=t,r.href="#",r.title=e;var h=o.DomEvent.stopPropagation;return o.DomEvent.on(r,"click",h).on(r,"mousedown",h).on(r,"dblclick",h).on(r,"click",o.DomEvent.preventDefault).on(r,"click",s,a).on(r,"click",this._refocusOnMap,a),r},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";o.DomUtil.removeClass(this._zoomInButton,e),o.DomUtil.removeClass(this._zoomOutButton,e),t._zoom===t.getMinZoom()&&o.DomUtil.addClass(this._zoomOutButton,e),t._zoom===t.getMaxZoom()&&o.DomUtil.addClass(this._zoomInButton,e)}}),o.Map.mergeOptions({zoomControl:!0}),o.Map.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new o.Control.Zoom,this.addControl(this.zoomControl))}),o.control.zoom=function(t){return new o.Control.Zoom(t)},o.Control.Attribution=o.Control.extend({options:{position:"bottomright",prefix:'<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'},initialize:function(t){o.setOptions(this,t),this._attributions={}},onAdd:function(t){this._container=o.DomUtil.create("div","leaflet-control-attribution"),o.DomEvent.disableClickPropagation(this._container);for(var e in t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return t.on("layeradd",this._onLayerAdd,this).on("layerremove",this._onLayerRemove,this),this._update(),this._container},onRemove:function(t){t.off("layeradd",this._onLayerAdd).off("layerremove",this._onLayerRemove)},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):void 0},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):void 0},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var i=[];this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(" | ")}},_onLayerAdd:function(t){t.layer.getAttribution&&this.addAttribution(t.layer.getAttribution())},_onLayerRemove:function(t){t.layer.getAttribution&&this.removeAttribution(t.layer.getAttribution())}}),o.Map.mergeOptions({attributionControl:!0}),o.Map.addInitHook(function(){this.options.attributionControl&&(this.attributionControl=(new o.Control.Attribution).addTo(this))}),o.control.attribution=function(t){return new o.Control.Attribution(t)},o.Control.Scale=o.Control.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0,updateWhenIdle:!1},onAdd:function(t){this._map=t;var e="leaflet-control-scale",i=o.DomUtil.create("div",e),n=this.options;return this._addScales(n,e,i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=o.DomUtil.create("div",e+"-line",i)),t.imperial&&(this._iScale=o.DomUtil.create("div",e+"-line",i))},_update:function(){var t=this._map.getBounds(),e=t.getCenter().lat,i=6378137*Math.PI*Math.cos(e*Math.PI/180),n=i*(t.getNorthEast().lng-t.getSouthWest().lng)/180,o=this._map.getSize(),s=this.options,a=0;o.x>0&&(a=n*(s.maxWidth/o.x)),this._updateScales(s,a)},_updateScales:function(t,e){t.metric&&e&&this._updateMetric(e),t.imperial&&e&&this._updateImperial(e)},_updateMetric:function(t){var e=this._getRoundNum(t);this._mScale.style.width=this._getScaleWidth(e/t)+"px",this._mScale.innerHTML=1e3>e?e+" m":e/1e3+" km"},_updateImperial:function(t){var e,i,n,o=3.2808399*t,s=this._iScale;o>5280?(e=o/5280,i=this._getRoundNum(e),s.style.width=this._getScaleWidth(i/e)+"px",s.innerHTML=i+" mi"):(n=this._getRoundNum(o),s.style.width=this._getScaleWidth(n/o)+"px",s.innerHTML=n+" ft")},_getScaleWidth:function(t){return Math.round(this.options.maxWidth*t)-10},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e;return i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1,e*i}}),o.control.scale=function(t){return new o.Control.Scale(t)},o.Control.Layers=o.Control.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0},initialize:function(t,e,i){o.setOptions(this,i),this._layers={},this._lastZIndex=0,this._handlingClick=!1;for(var n in t)this._addLayer(t[n],n);for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){return this._initLayout(),this._update(),t.on("layeradd",this._onLayerChange,this).on("layerremove",this._onLayerChange,this),this._container},onRemove:function(t){t.off("layeradd",this._onLayerChange,this).off("layerremove",this._onLayerChange,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._update(),this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._update(),this},removeLayer:function(t){var e=o.stamp(t);return delete this._layers[e],this._update(),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=o.DomUtil.create("div",t);e.setAttribute("aria-haspopup",!0),o.Browser.touch?o.DomEvent.on(e,"click",o.DomEvent.stopPropagation):o.DomEvent.disableClickPropagation(e).disableScrollPropagation(e);var i=this._form=o.DomUtil.create("form",t+"-list");if(this.options.collapsed){o.Browser.android||o.DomEvent.on(e,"mouseover",this._expand,this).on(e,"mouseout",this._collapse,this);var n=this._layersLink=o.DomUtil.create("a",t+"-toggle",e);n.href="#",n.title="Layers",o.Browser.touch?o.DomEvent.on(n,"click",o.DomEvent.stop).on(n,"click",this._expand,this):o.DomEvent.on(n,"focus",this._expand,this),o.DomEvent.on(i,"click",function(){setTimeout(o.bind(this._onInputClick,this),0)},this),this._map.on("click",this._collapse,this)}else this._expand();this._baseLayersList=o.DomUtil.create("div",t+"-base",i),this._separator=o.DomUtil.create("div",t+"-separator",i),this._overlaysList=o.DomUtil.create("div",t+"-overlays",i),e.appendChild(i)},_addLayer:function(t,e,i){var n=o.stamp(t);this._layers[n]={layer:t,name:e,overlay:i},this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex))},_update:function(){if(this._container){this._baseLayersList.innerHTML="",this._overlaysList.innerHTML="";var t,e,i=!1,n=!1;for(t in this._layers)e=this._layers[t],this._addItem(e),n=n||e.overlay,i=i||!e.overlay;this._separator.style.display=n&&i?"":"none"}},_onLayerChange:function(t){var e=this._layers[o.stamp(t.layer)];if(e){this._handlingClick||this._update();var i=e.overlay?"layeradd"===t.type?"overlayadd":"overlayremove":"layeradd"===t.type?"baselayerchange":null;i&&this._map.fire(i,e)}},_createRadioElement:function(t,i){var n='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"';i&&(n+=' checked="checked"'),n+="/>";var o=e.createElement("div");return o.innerHTML=n,o.firstChild},_addItem:function(t){var i,n=e.createElement("label"),s=this._map.hasLayer(t.layer);t.overlay?(i=e.createElement("input"),i.type="checkbox",i.className="leaflet-control-layers-selector",i.defaultChecked=s):i=this._createRadioElement("leaflet-base-layers",s),i.layerId=o.stamp(t.layer),o.DomEvent.on(i,"click",this._onInputClick,this);var a=e.createElement("span");a.innerHTML=" "+t.name,n.appendChild(i),n.appendChild(a);var r=t.overlay?this._overlaysList:this._baseLayersList;return r.appendChild(n),n},_onInputClick:function(){var t,e,i,n=this._form.getElementsByTagName("input"),o=n.length;for(this._handlingClick=!0,t=0;o>t;t++)e=n[t],i=this._layers[e.layerId],e.checked&&!this._map.hasLayer(i.layer)?this._map.addLayer(i.layer):!e.checked&&this._map.hasLayer(i.layer)&&this._map.removeLayer(i.layer);this._handlingClick=!1,this._refocusOnMap()},_expand:function(){o.DomUtil.addClass(this._container,"leaflet-control-layers-expanded")},_collapse:function(){this._container.className=this._container.className.replace(" leaflet-control-layers-expanded","")}}),o.control.layers=function(t,e,i){return new o.Control.Layers(t,e,i)},o.PosAnimation=o.Class.extend({includes:o.Mixin.Events,run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._newPos=e,this.fire("start"),t.style[o.DomUtil.TRANSITION]="all "+(i||.25)+"s cubic-bezier(0,0,"+(n||.5)+",1)",o.DomEvent.on(t,o.DomUtil.TRANSITION_END,this._onTransitionEnd,this),o.DomUtil.setPosition(t,e),o.Util.falseFn(t.offsetWidth),this._stepTimer=setInterval(o.bind(this._onStep,this),50)},stop:function(){this._inProgress&&(o.DomUtil.setPosition(this._el,this._getPos()),this._onTransitionEnd(),o.Util.falseFn(this._el.offsetWidth))},_onStep:function(){var t=this._getPos();return t?(this._el._leaflet_pos=t,void this.fire("step")):void this._onTransitionEnd()},_transformRe:/([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,_getPos:function(){var e,i,n,s=this._el,a=t.getComputedStyle(s);if(o.Browser.any3d){if(n=a[o.DomUtil.TRANSFORM].match(this._transformRe),!n)return;e=parseFloat(n[1]),i=parseFloat(n[2])}else e=parseFloat(a.left),i=parseFloat(a.top);return new o.Point(e,i,!0)},_onTransitionEnd:function(){o.DomEvent.off(this._el,o.DomUtil.TRANSITION_END,this._onTransitionEnd,this),this._inProgress&&(this._inProgress=!1,this._el.style[o.DomUtil.TRANSITION]="",this._el._leaflet_pos=this._newPos,clearInterval(this._stepTimer),this.fire("step").fire("end"))}}),o.Map.include({setView:function(t,e,n){if(e=e===i?this._zoom:this._limitZoom(e),t=this._limitCenter(o.latLng(t),e,this.options.maxBounds),n=n||{},this._panAnim&&this._panAnim.stop(),this._loaded&&!n.reset&&n!==!0){n.animate!==i&&(n.zoom=o.extend({animate:n.animate},n.zoom),n.pan=o.extend({animate:n.animate},n.pan));var s=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,n.zoom):this._tryAnimatedPan(t,n.pan);if(s)return clearTimeout(this._sizeTimer),this}return this._resetView(t,e),this},panBy:function(t,e){if(t=o.point(t).round(),e=e||{},!t.x&&!t.y)return this;if(this._panAnim||(this._panAnim=new o.PosAnimation,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),e.animate!==!1){o.DomUtil.addClass(this._mapPane,"leaflet-pan-anim");var i=this._getMapPanePos().subtract(t);this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){o.DomUtil.removeClass(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var i=this._getCenterOffset(t)._floor();return(e&&e.animate)===!0||this.getSize().contains(i)?(this.panBy(i,e),!0):!1}}),o.PosAnimation=o.DomUtil.TRANSITION?o.PosAnimation:o.PosAnimation.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=o.DomUtil.getPosition(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(),this._complete())},_animate:function(){this._animId=o.Util.requestAnimFrame(this._animate,this),this._step()},_step:function(){var t=+new Date-this._startTime,e=1e3*this._duration;e>t?this._runFrame(this._easeOut(t/e)):(this._runFrame(1),this._complete())},_runFrame:function(t){var e=this._startPos.add(this._offset.multiplyBy(t));o.DomUtil.setPosition(this._el,e),this.fire("step")},_complete:function(){o.Util.cancelAnimFrame(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),o.Map.mergeOptions({zoomAnimation:!0,zoomAnimationThreshold:4}),o.DomUtil.TRANSITION&&o.Map.addInitHook(function(){this._zoomAnimated=this.options.zoomAnimation&&o.DomUtil.TRANSITION&&o.Browser.any3d&&!o.Browser.android23&&!o.Browser.mobileOpera,this._zoomAnimated&&o.DomEvent.on(this._mapPane,o.DomUtil.TRANSITION_END,this._catchTransitionEnd,this)}),o.Map.include(o.DomUtil.TRANSITION?{_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,i){if(this._animatingZoom)return!0;if(i=i||{},!this._zoomAnimated||i.animate===!1||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),o=this._getCenterOffset(t)._divideBy(1-1/n),s=this._getCenterLayerPoint()._add(o);return i.animate===!0||this.getSize().contains(o)?(this.fire("movestart").fire("zoomstart"),this._animateZoom(t,e,s,n,null,!0),!0):!1},_animateZoom:function(t,e,i,n,s,a,r){r||(this._animatingZoom=!0),o.DomUtil.addClass(this._mapPane,"leaflet-zoom-anim"),this._animateToCenter=t,this._animateToZoom=e,o.Draggable&&(o.Draggable._disabled=!0),o.Util.requestAnimFrame(function(){this.fire("zoomanim",{center:t,zoom:e,origin:i,scale:n,delta:s,backwards:a})},this)},_onZoomTransitionEnd:function(){this._animatingZoom=!1,o.DomUtil.removeClass(this._mapPane,"leaflet-zoom-anim"),this._resetView(this._animateToCenter,this._animateToZoom,!0,!0),o.Draggable&&(o.Draggable._disabled=!1)}}:{}),o.TileLayer.include({_animateZoom:function(t){this._animating||(this._animating=!0,this._prepareBgBuffer());var e=this._bgBuffer,i=o.DomUtil.TRANSFORM,n=t.delta?o.DomUtil.getTranslateString(t.delta):e.style[i],s=o.DomUtil.getScaleString(t.scale,t.origin);e.style[i]=t.backwards?s+" "+n:n+" "+s},_endZoomAnim:function(){var t=this._tileContainer,e=this._bgBuffer;t.style.visibility="",t.parentNode.appendChild(t),o.Util.falseFn(e.offsetWidth),this._animating=!1},_clearBgBuffer:function(){var t=this._map;!t||t._animatingZoom||t.touchZoom._zooming||(this._bgBuffer.innerHTML="",this._bgBuffer.style[o.DomUtil.TRANSFORM]="")},_prepareBgBuffer:function(){var t=this._tileContainer,e=this._bgBuffer,i=this._getLoadedTilesPercentage(e),n=this._getLoadedTilesPercentage(t);return e&&i>.5&&.5>n?(t.style.visibility="hidden",void this._stopLoadingImages(t)):(e.style.visibility="hidden",e.style[o.DomUtil.TRANSFORM]="",this._tileContainer=e,e=this._bgBuffer=t,this._stopLoadingImages(e),void clearTimeout(this._clearBgBufferTimer))},_getLoadedTilesPercentage:function(t){var e,i,n=t.getElementsByTagName("img"),o=0;for(e=0,i=n.length;i>e;e++)n[e].complete&&o++;return o/i},_stopLoadingImages:function(t){var e,i,n,s=Array.prototype.slice.call(t.getElementsByTagName("img"));for(e=0,i=s.length;i>e;e++)n=s[e],n.complete||(n.onload=o.Util.falseFn,n.onerror=o.Util.falseFn,n.src=o.Util.emptyImageUrl,n.parentNode.removeChild(n))}}),o.Map.include({_defaultLocateOptions:{watch:!1,setView:!1,maxZoom:1/0,timeout:1e4,maximumAge:0,enableHighAccuracy:!1},locate:function(t){if(t=this._locateOptions=o.extend(this._defaultLocateOptions,t),!navigator.geolocation)return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=o.bind(this._handleGeolocationResponse,this),i=o.bind(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){var e=t.code,i=t.message||(1===e?"permission denied":2===e?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."})},_handleGeolocationResponse:function(t){var e=t.coords.latitude,i=t.coords.longitude,n=new o.LatLng(e,i),s=180*t.coords.accuracy/40075017,a=s/Math.cos(o.LatLng.DEG_TO_RAD*e),r=o.latLngBounds([e-s,i-a],[e+s,i+a]),h=this._locateOptions;if(h.setView){var l=Math.min(this.getBoundsZoom(r),h.maxZoom);this.setView(n,l)}var u={latlng:n,bounds:r,timestamp:t.timestamp};for(var c in t.coords)"number"==typeof t.coords[c]&&(u[c]=t.coords[c]);this.fire("locationfound",u)}})}(window,document);
/*! MooTools: the javascript framework. license: MIT-style license. copyright: Copyright (c) 2006-2014 [Valerio Proietti](http://mad4milk.net/).*/
!function(){this.MooTools={version:"1.5.1",build:"0542c135fdeb7feed7d9917e01447a408f22c876"};var typeOf=this.typeOf=function(item){if(null==item)return"null";if(null!=item.$family)return item.$family();if(item.nodeName){if(1==item.nodeType)return"element";if(3==item.nodeType)return/\S/.test(item.nodeValue)?"textnode":"whitespace"}else if("number"==typeof item.length){if("callee"in item)return"arguments";if("item"in item)return"collection"}return typeof item},Function=(this.instanceOf=function(item,object){if(null==item)return!1;for(var constructor=item.$constructor||item.constructor;constructor;){if(constructor===object)return!0;constructor=constructor.parent}return item.hasOwnProperty?item instanceof object:!1},this.Function),enumerables=!0;for(var i in{toString:1})enumerables=null;enumerables&&(enumerables=["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","constructor"]),Function.prototype.overloadSetter=function(usePlural){var self=this;return function(a,b){if(null==a)return this;if(usePlural||"string"!=typeof a){for(var k in a)self.call(this,k,a[k]);if(enumerables)for(var i=enumerables.length;i--;)k=enumerables[i],a.hasOwnProperty(k)&&self.call(this,k,a[k])}else self.call(this,a,b);return this}},Function.prototype.overloadGetter=function(usePlural){var self=this;return function(a){var args,result;if("string"!=typeof a?args=a:arguments.length>1?args=arguments:usePlural&&(args=[a]),args){result={};for(var i=0;i<args.length;i++)result[args[i]]=self.call(this,args[i])}else result=self.call(this,a);return result}},Function.prototype.extend=function(key,value){this[key]=value}.overloadSetter(),Function.prototype.implement=function(key,value){this.prototype[key]=value}.overloadSetter();var slice=Array.prototype.slice;Function.from=function(item){return"function"==typeOf(item)?item:function(){return item}},Array.from=function(item){return null==item?[]:Type.isEnumerable(item)&&"string"!=typeof item?"array"==typeOf(item)?item:slice.call(item):[item]},Number.from=function(item){var number=parseFloat(item);return isFinite(number)?number:null},String.from=function(item){return item+""},Function.implement({hide:function(){return this.$hidden=!0,this},protect:function(){return this.$protected=!0,this}});var Type=this.Type=function(name,object){if(name){var lower=name.toLowerCase(),typeCheck=function(item){return typeOf(item)==lower};Type["is"+name]=typeCheck,null!=object&&(object.prototype.$family=function(){return lower}.hide())}return null==object?null:(object.extend(this),object.$constructor=Type,object.prototype.$constructor=object,object)},toString=Object.prototype.toString;Type.isEnumerable=function(item){return null!=item&&"number"==typeof item.length&&"[object Function]"!=toString.call(item)};var hooks={},hooksOf=function(object){var type=typeOf(object.prototype);return hooks[type]||(hooks[type]=[])},implement=function(name,method){if(!method||!method.$hidden){for(var hooks=hooksOf(this),i=0;i<hooks.length;i++){var hook=hooks[i];"type"==typeOf(hook)?implement.call(hook,name,method):hook.call(this,name,method)}var previous=this.prototype[name];null!=previous&&previous.$protected||(this.prototype[name]=method),null==this[name]&&"function"==typeOf(method)&&extend.call(this,name,function(item){return method.apply(item,slice.call(arguments,1))})}},extend=function(name,method){if(!method||!method.$hidden){var previous=this[name];null!=previous&&previous.$protected||(this[name]=method)}};Type.implement({implement:implement.overloadSetter(),extend:extend.overloadSetter(),alias:function(name,existing){implement.call(this,name,this.prototype[existing])}.overloadSetter(),mirror:function(hook){return hooksOf(this).push(hook),this}}),new Type("Type",Type);var force=function(name,object,methods){var isType=object!=Object,prototype=object.prototype;isType&&(object=new Type(name,object));for(var i=0,l=methods.length;l>i;i++){var key=methods[i],generic=object[key],proto=prototype[key];generic&&generic.protect(),isType&&proto&&object.implement(key,proto.protect())}if(isType){var methodsEnumerable=prototype.propertyIsEnumerable(methods[0]);object.forEachMethod=function(fn){if(!methodsEnumerable)for(var i=0,l=methods.length;l>i;i++)fn.call(prototype,prototype[methods[i]],methods[i]);for(var key in prototype)fn.call(prototype,prototype[key],key)}}return force};force("String",String,["charAt","charCodeAt","concat","contains","indexOf","lastIndexOf","match","quote","replace","search","slice","split","substr","substring","trim","toLowerCase","toUpperCase"])("Array",Array,["pop","push","reverse","shift","sort","splice","unshift","concat","join","slice","indexOf","lastIndexOf","filter","forEach","every","map","some","reduce","reduceRight"])("Number",Number,["toExponential","toFixed","toLocaleString","toPrecision"])("Function",Function,["apply","call","bind"])("RegExp",RegExp,["exec","test"])("Object",Object,["create","defineProperty","defineProperties","keys","getPrototypeOf","getOwnPropertyDescriptor","getOwnPropertyNames","preventExtensions","isExtensible","seal","isSealed","freeze","isFrozen"])("Date",Date,["now"]),Object.extend=extend.overloadSetter(),Date.extend("now",function(){return+new Date}),new Type("Boolean",Boolean),Number.prototype.$family=function(){return isFinite(this)?"number":"null"}.hide(),Number.extend("random",function(min,max){return Math.floor(Math.random()*(max-min+1)+min)});var hasOwnProperty=Object.prototype.hasOwnProperty;Object.extend("forEach",function(object,fn,bind){for(var key in object)hasOwnProperty.call(object,key)&&fn.call(bind,object[key],key,object)}),Object.each=Object.forEach,Array.implement({forEach:function(fn,bind){for(var i=0,l=this.length;l>i;i++)i in this&&fn.call(bind,this[i],i,this)},each:function(fn,bind){return Array.forEach(this,fn,bind),this}});var cloneOf=function(item){switch(typeOf(item)){case"array":return item.clone();case"object":return Object.clone(item);default:return item}};Array.implement("clone",function(){for(var i=this.length,clone=new Array(i);i--;)clone[i]=cloneOf(this[i]);return clone});var mergeOne=function(source,key,current){switch(typeOf(current)){case"object":"object"==typeOf(source[key])?Object.merge(source[key],current):source[key]=Object.clone(current);break;case"array":source[key]=current.clone();break;default:source[key]=current}return source};Object.extend({merge:function(source,k,v){if("string"==typeOf(k))return mergeOne(source,k,v);for(var i=1,l=arguments.length;l>i;i++){var object=arguments[i];for(var key in object)mergeOne(source,key,object[key])}return source},clone:function(object){var clone={};for(var key in object)clone[key]=cloneOf(object[key]);return clone},append:function(original){for(var i=1,l=arguments.length;l>i;i++){var extended=arguments[i]||{};for(var key in extended)original[key]=extended[key]}return original}}),["Object","WhiteSpace","TextNode","Collection","Arguments"].each(function(name){new Type(name)});var UID=Date.now();String.extend("uniqueID",function(){return(UID++).toString(36)})}(),Array.implement({every:function(fn,bind){for(var i=0,l=this.length>>>0;l>i;i++)if(i in this&&!fn.call(bind,this[i],i,this))return!1;return!0},filter:function(fn,bind){for(var value,results=[],i=0,l=this.length>>>0;l>i;i++)i in this&&(value=this[i],fn.call(bind,value,i,this)&&results.push(value));return results},indexOf:function(item,from){for(var length=this.length>>>0,i=0>from?Math.max(0,length+from):from||0;length>i;i++)if(this[i]===item)return i;return-1},map:function(fn,bind){for(var length=this.length>>>0,results=Array(length),i=0;length>i;i++)i in this&&(results[i]=fn.call(bind,this[i],i,this));return results},some:function(fn,bind){for(var i=0,l=this.length>>>0;l>i;i++)if(i in this&&fn.call(bind,this[i],i,this))return!0;return!1},clean:function(){return this.filter(function(item){return null!=item})},invoke:function(methodName){var args=Array.slice(arguments,1);return this.map(function(item){return item[methodName].apply(item,args)})},associate:function(keys){for(var obj={},length=Math.min(this.length,keys.length),i=0;length>i;i++)obj[keys[i]]=this[i];return obj},link:function(object){for(var result={},i=0,l=this.length;l>i;i++)for(var key in object)if(object[key](this[i])){result[key]=this[i],delete object[key];break}return result},contains:function(item,from){return-1!=this.indexOf(item,from)},append:function(array){return this.push.apply(this,array),this},getLast:function(){return this.length?this[this.length-1]:null},getRandom:function(){return this.length?this[Number.random(0,this.length-1)]:null},include:function(item){return this.contains(item)||this.push(item),this},combine:function(array){for(var i=0,l=array.length;l>i;i++)this.include(array[i]);return this},erase:function(item){for(var i=this.length;i--;)this[i]===item&&this.splice(i,1);return this},empty:function(){return this.length=0,this},flatten:function(){for(var array=[],i=0,l=this.length;l>i;i++){var type=typeOf(this[i]);"null"!=type&&(array=array.concat("array"==type||"collection"==type||"arguments"==type||instanceOf(this[i],Array)?Array.flatten(this[i]):this[i]))}return array},pick:function(){for(var i=0,l=this.length;l>i;i++)if(null!=this[i])return this[i];return null},hexToRgb:function(array){if(3!=this.length)return null;var rgb=this.map(function(value){return 1==value.length&&(value+=value),parseInt(value,16)});return array?rgb:"rgb("+rgb+")"},rgbToHex:function(array){if(this.length<3)return null;if(4==this.length&&0==this[3]&&!array)return"transparent";for(var hex=[],i=0;3>i;i++){var bit=(this[i]-0).toString(16);hex.push(1==bit.length?"0"+bit:bit)}return array?hex:"#"+hex.join("")}}),Function.extend({attempt:function(){for(var i=0,l=arguments.length;l>i;i++)try{return arguments[i]()}catch(e){}return null}}),Function.implement({attempt:function(args,bind){try{return this.apply(bind,Array.from(args))}catch(e){}return null},bind:function(that){var self=this,args=arguments.length>1?Array.slice(arguments,1):null,F=function(){},bound=function(){var context=that,length=arguments.length;this instanceof bound&&(F.prototype=self.prototype,context=new F);var result=args||length?self.apply(context,args&&length?args.concat(Array.slice(arguments)):args||arguments):self.call(context);return context==that?result:context};return bound},pass:function(args,bind){var self=this;return null!=args&&(args=Array.from(args)),function(){return self.apply(bind,args||arguments)}},delay:function(delay,bind,args){return setTimeout(this.pass(null==args?[]:args,bind),delay)},periodical:function(periodical,bind,args){return setInterval(this.pass(null==args?[]:args,bind),periodical)}}),Number.implement({limit:function(min,max){return Math.min(max,Math.max(min,this))},round:function(precision){return precision=Math.pow(10,precision||0).toFixed(0>precision?-precision:0),Math.round(this*precision)/precision},times:function(fn,bind){for(var i=0;this>i;i++)fn.call(bind,i,this)},toFloat:function(){return parseFloat(this)},toInt:function(base){return parseInt(this,base||10)}}),Number.alias("each","times"),function(math){var methods={};math.each(function(name){Number[name]||(methods[name]=function(){return Math[name].apply(null,[this].concat(Array.from(arguments)))})}),Number.implement(methods)}(["abs","acos","asin","atan","atan2","ceil","cos","exp","floor","log","max","min","pow","sin","sqrt","tan"]),String.implement({contains:function(string,index){return(index?String(this).slice(index):String(this)).indexOf(string)>-1},test:function(regex,params){return("regexp"==typeOf(regex)?regex:new RegExp(""+regex,params)).test(this)},trim:function(){return String(this).replace(/^\s+|\s+$/g,"")},clean:function(){return String(this).replace(/\s+/g," ").trim()},camelCase:function(){return String(this).replace(/-\D/g,function(match){return match.charAt(1).toUpperCase()})},hyphenate:function(){return String(this).replace(/[A-Z]/g,function(match){return"-"+match.charAt(0).toLowerCase()})},capitalize:function(){return String(this).replace(/\b[a-z]/g,function(match){return match.toUpperCase()})},escapeRegExp:function(){return String(this).replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1")},toInt:function(base){return parseInt(this,base||10)},toFloat:function(){return parseFloat(this)},hexToRgb:function(array){var hex=String(this).match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);return hex?hex.slice(1).hexToRgb(array):null},rgbToHex:function(array){var rgb=String(this).match(/\d{1,3}/g);return rgb?rgb.rgbToHex(array):null},substitute:function(object,regexp){return String(this).replace(regexp||/\\?\{([^{}]+)\}/g,function(match,name){return"\\"==match.charAt(0)?match.slice(1):null!=object[name]?object[name]:""})}}),function(){var document=this.document,window=document.window=this,parse=function(ua,platform){ua=ua.toLowerCase(),platform=platform?platform.toLowerCase():"";var UA=ua.match(/(opera|ie|firefox|chrome|trident|crios|version)[\s\/:]([\w\d\.]+)?.*?(safari|(?:rv[\s\/:]|version[\s\/:])([\w\d\.]+)|$)/)||[null,"unknown",0];return"trident"==UA[1]?(UA[1]="ie",UA[4]&&(UA[2]=UA[4])):"crios"==UA[1]&&(UA[1]="chrome"),platform=ua.match(/ip(?:ad|od|hone)/)?"ios":(ua.match(/(?:webos|android)/)||platform.match(/mac|win|linux/)||["other"])[0],"win"==platform&&(platform="windows"),{extend:Function.prototype.extend,name:"version"==UA[1]?UA[3]:UA[1],version:parseFloat("opera"==UA[1]&&UA[4]?UA[4]:UA[2]),platform:platform}},Browser=this.Browser=parse(navigator.userAgent,navigator.platform);if("ie"==Browser.name&&(Browser.version=document.documentMode),Browser.extend({Features:{xpath:!!document.evaluate,air:!!window.runtime,query:!!document.querySelector,json:!!window.JSON},parseUA:parse}),Browser.Request=function(){var XMLHTTP=function(){return new XMLHttpRequest},MSXML2=function(){return new ActiveXObject("MSXML2.XMLHTTP")},MSXML=function(){return new ActiveXObject("Microsoft.XMLHTTP")};return Function.attempt(function(){return XMLHTTP(),XMLHTTP},function(){return MSXML2(),MSXML2},function(){return MSXML(),MSXML})}(),Browser.Features.xhr=!!Browser.Request,Browser.exec=function(text){if(!text)return text;if(window.execScript)window.execScript(text);else{var script=document.createElement("script");script.setAttribute("type","text/javascript"),script.text=text,document.head.appendChild(script),document.head.removeChild(script)}return text},String.implement("stripScripts",function(exec){var scripts="",text=this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(all,code){return scripts+=code+"\n",""});return exec===!0?Browser.exec(scripts):"function"==typeOf(exec)&&exec(scripts,text),text}),Browser.extend({Document:this.Document,Window:this.Window,Element:this.Element,Event:this.Event}),this.Window=this.$constructor=new Type("Window",function(){}),this.$family=Function.from("window").hide(),Window.mirror(function(name,method){window[name]=method}),this.Document=document.$constructor=new Type("Document",function(){}),document.$family=Function.from("document").hide(),Document.mirror(function(name,method){document[name]=method}),document.html=document.documentElement,document.head||(document.head=document.getElementsByTagName("head")[0]),document.execCommand)try{document.execCommand("BackgroundImageCache",!1,!0)}catch(e){}if(this.attachEvent&&!this.addEventListener){var unloadEvent=function(){this.detachEvent("onunload",unloadEvent),document.head=document.html=document.window=null,window=this.Window=document=null};this.attachEvent("onunload",unloadEvent)}var arrayFrom=Array.from;try{arrayFrom(document.html.childNodes)}catch(e){Array.from=function(item){if("string"!=typeof item&&Type.isEnumerable(item)&&"array"!=typeOf(item)){for(var i=item.length,array=new Array(i);i--;)array[i]=item[i];return array}return arrayFrom(item)};var prototype=Array.prototype,slice=prototype.slice;["pop","push","reverse","shift","sort","splice","unshift","concat","join","slice"].each(function(name){var method=prototype[name];Array[name]=function(item){return method.apply(Array.from(item),slice.call(arguments,1))}})}}(),function(){var Class=this.Class=new Type("Class",function(params){instanceOf(params,Function)&&(params={initialize:params});var newClass=function(){if(reset(this),newClass.$prototyping)return this;this.$caller=null;var value=this.initialize?this.initialize.apply(this,arguments):this;return this.$caller=this.caller=null,value}.extend(this).implement(params);return newClass.$constructor=Class,newClass.prototype.$constructor=newClass,newClass.prototype.parent=parent,newClass}),parent=function(){if(!this.$caller)throw new Error('The method "parent" cannot be called.');var name=this.$caller.$name,parent=this.$caller.$owner.parent,previous=parent?parent.prototype[name]:null;if(!previous)throw new Error('The method "'+name+'" has no parent.');return previous.apply(this,arguments)},reset=function(object){for(var key in object){var value=object[key];switch(typeOf(value)){case"object":var F=function(){};F.prototype=value,object[key]=reset(new F);break;case"array":object[key]=value.clone()}}return object},wrap=function(self,key,method){method.$origin&&(method=method.$origin);var wrapper=function(){if(method.$protected&&null==this.$caller)throw new Error('The method "'+key+'" cannot be called.');var caller=this.caller,current=this.$caller;this.caller=current,this.$caller=wrapper;var result=method.apply(this,arguments);return this.$caller=current,this.caller=caller,result}.extend({$owner:self,$origin:method,$name:key});return wrapper},implement=function(key,value,retain){if(Class.Mutators.hasOwnProperty(key)&&(value=Class.Mutators[key].call(this,value),null==value))return this;if("function"==typeOf(value)){if(value.$hidden)return this;this.prototype[key]=retain?value:wrap(this,key,value)}else Object.merge(this.prototype,key,value);return this},getInstance=function(klass){klass.$prototyping=!0;var proto=new klass;return delete klass.$prototyping,proto};Class.implement("implement",implement.overloadSetter()),Class.Mutators={Extends:function(parent){this.parent=parent,this.prototype=getInstance(parent)},Implements:function(items){Array.from(items).each(function(item){var instance=new item;for(var key in instance)implement.call(this,key,instance[key],!0)},this)}}}(),function(){this.Chain=new Class({$chain:[],chain:function(){return this.$chain.append(Array.flatten(arguments)),this},callChain:function(){return this.$chain.length?this.$chain.shift().apply(this,arguments):!1},clearChain:function(){return this.$chain.empty(),this}});var removeOn=function(string){return string.replace(/^on([A-Z])/,function(full,first){return first.toLowerCase()})};this.Events=new Class({$events:{},addEvent:function(type,fn,internal){return type=removeOn(type),this.$events[type]=(this.$events[type]||[]).include(fn),internal&&(fn.internal=!0),this},addEvents:function(events){for(var type in events)this.addEvent(type,events[type]);return this},fireEvent:function(type,args,delay){type=removeOn(type);var events=this.$events[type];return events?(args=Array.from(args),events.each(function(fn){delay?fn.delay(delay,this,args):fn.apply(this,args)},this),this):this},removeEvent:function(type,fn){type=removeOn(type);var events=this.$events[type];if(events&&!fn.internal){var index=events.indexOf(fn);-1!=index&&delete events[index]}return this},removeEvents:function(events){var type;if("object"==typeOf(events)){for(type in events)this.removeEvent(type,events[type]);return this}events&&(events=removeOn(events));for(type in this.$events)if(!events||events==type)for(var fns=this.$events[type],i=fns.length;i--;)i in fns&&this.removeEvent(type,fns[i]);return this}}),this.Options=new Class({setOptions:function(){var options=this.options=Object.merge.apply(null,[{},this.options].append(arguments));if(this.addEvent)for(var option in options)"function"==typeOf(options[option])&&/^on[A-Z]/.test(option)&&(this.addEvent(option,options[option]),delete options[option]);return this}})}(),function(){var hasOwnProperty=Object.prototype.hasOwnProperty;Object.extend({subset:function(object,keys){for(var results={},i=0,l=keys.length;l>i;i++){var k=keys[i];k in object&&(results[k]=object[k])}return results},map:function(object,fn,bind){var results={};for(var key in object)hasOwnProperty.call(object,key)&&(results[key]=fn.call(bind,object[key],key,object));return results},filter:function(object,fn,bind){var results={};for(var key in object){var value=object[key];hasOwnProperty.call(object,key)&&fn.call(bind,value,key,object)&&(results[key]=value)}return results},every:function(object,fn,bind){for(var key in object)if(hasOwnProperty.call(object,key)&&!fn.call(bind,object[key],key))return!1;return!0},some:function(object,fn,bind){for(var key in object)if(hasOwnProperty.call(object,key)&&fn.call(bind,object[key],key))return!0;return!1},keys:function(object){var keys=[];for(var key in object)hasOwnProperty.call(object,key)&&keys.push(key);return keys},values:function(object){var values=[];for(var key in object)hasOwnProperty.call(object,key)&&values.push(object[key]);return values},getLength:function(object){return Object.keys(object).length},keyOf:function(object,value){for(var key in object)if(hasOwnProperty.call(object,key)&&object[key]===value)return key;return null},contains:function(object,value){return null!=Object.keyOf(object,value)},toQueryString:function(object,base){var queryString=[];return Object.each(object,function(value,key){base&&(key=base+"["+key+"]");var result;switch(typeOf(value)){case"object":result=Object.toQueryString(value,key);break;case"array":var qs={};value.each(function(val,i){qs[i]=val}),result=Object.toQueryString(qs,key);break;default:result=key+"="+encodeURIComponent(value)}null!=value&&queryString.push(result)}),queryString.join("&")}})}(),function(){function parser(rawMatch,separator,combinator,combinatorChildren,tagName,id,className,attributeKey,attributeOperator,attributeQuote,attributeValue,pseudoMarker,pseudoClass,pseudoQuote,pseudoClassQuotedValue,pseudoClassValue){if((separator||-1===separatorIndex)&&(parsed.expressions[++separatorIndex]=[],combinatorIndex=-1,separator))return"";if(combinator||combinatorChildren||-1===combinatorIndex){combinator=combinator||" ";var currentSeparator=parsed.expressions[separatorIndex];reversed&&currentSeparator[combinatorIndex]&&(currentSeparator[combinatorIndex].reverseCombinator=reverseCombinator(combinator)),currentSeparator[++combinatorIndex]={combinator:combinator,tag:"*"}}var currentParsed=parsed.expressions[separatorIndex][combinatorIndex];if(tagName)currentParsed.tag=tagName.replace(reUnescape,"");else if(id)currentParsed.id=id.replace(reUnescape,"");else if(className)className=className.replace(reUnescape,""),currentParsed.classList||(currentParsed.classList=[]),currentParsed.classes||(currentParsed.classes=[]),currentParsed.classList.push(className),currentParsed.classes.push({value:className,regexp:new RegExp("(^|\\s)"+escapeRegExp(className)+"(\\s|$)")});else if(pseudoClass)pseudoClassValue=pseudoClassValue||pseudoClassQuotedValue,pseudoClassValue=pseudoClassValue?pseudoClassValue.replace(reUnescape,""):null,currentParsed.pseudos||(currentParsed.pseudos=[]),currentParsed.pseudos.push({key:pseudoClass.replace(reUnescape,""),value:pseudoClassValue,type:1==pseudoMarker.length?"class":"element"});else if(attributeKey){attributeKey=attributeKey.replace(reUnescape,""),attributeValue=(attributeValue||"").replace(reUnescape,"");var test,regexp;switch(attributeOperator){case"^=":regexp=new RegExp("^"+escapeRegExp(attributeValue));break;case"$=":regexp=new RegExp(escapeRegExp(attributeValue)+"$");break;case"~=":regexp=new RegExp("(^|\\s)"+escapeRegExp(attributeValue)+"(\\s|$)");break;case"|=":regexp=new RegExp("^"+escapeRegExp(attributeValue)+"(-|$)");break;case"=":test=function(value){return attributeValue==value};break;case"*=":test=function(value){return value&&value.indexOf(attributeValue)>-1};break;case"!=":test=function(value){return attributeValue!=value};break;default:test=function(value){return!!value}}""==attributeValue&&/^[*$^]=$/.test(attributeOperator)&&(test=function(){return!1}),test||(test=function(value){return value&&regexp.test(value)}),currentParsed.attributes||(currentParsed.attributes=[]),currentParsed.attributes.push({key:attributeKey,operator:attributeOperator,value:attributeValue,test:test})}return""}var parsed,separatorIndex,combinatorIndex,reversed,cache={},reverseCache={},reUnescape=/\\/g,parse=function(expression,isReversed){if(null==expression)return null;if(expression.Slick===!0)return expression;expression=(""+expression).replace(/^\s+|\s+$/g,""),reversed=!!isReversed;var currentCache=reversed?reverseCache:cache;if(currentCache[expression])return currentCache[expression];for(parsed={Slick:!0,expressions:[],raw:expression,reverse:function(){return parse(this.raw,!0)}},separatorIndex=-1;expression!=(expression=expression.replace(regexp,parser)););return parsed.length=parsed.expressions.length,currentCache[parsed.raw]=reversed?reverse(parsed):parsed},reverseCombinator=function(combinator){return"!"===combinator?" ":" "===combinator?"!":/^!/.test(combinator)?combinator.replace(/^!/,""):"!"+combinator},reverse=function(expression){for(var expressions=expression.expressions,i=0;i<expressions.length;i++){for(var exp=expressions[i],last={parts:[],tag:"*",combinator:reverseCombinator(exp[0].combinator)},j=0;j<exp.length;j++){var cexp=exp[j];cexp.reverseCombinator||(cexp.reverseCombinator=" "),cexp.combinator=cexp.reverseCombinator,delete cexp.reverseCombinator}exp.reverse().push(last)}return expression},escapeRegExp=function(string){return string.replace(/[-[\]{}()*+?.\\^$|,#\s]/g,function(match){return"\\"+match})},regexp=new RegExp("^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:([\"']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:([\"'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)".replace(/<combinator>/,"["+escapeRegExp(">+~`!@$%^&={}\\;</")+"]").replace(/<unicode>/g,"(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])").replace(/<unicode1>/g,"(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])")),Slick=this.Slick||{};Slick.parse=function(expression){return parse(expression)},Slick.escapeRegExp=escapeRegExp,this.Slick||(this.Slick=Slick)}.apply("undefined"!=typeof exports?exports:this),function(){var local={},featuresCache={},toString=Object.prototype.toString;local.isNativeCode=function(fn){return/\{\s*\[native code\]\s*\}/.test(""+fn)},local.isXML=function(document){return!!document.xmlVersion||!!document.xml||"[object XMLDocument]"==toString.call(document)||9==document.nodeType&&"HTML"!=document.documentElement.nodeName},local.setDocument=function(document){var nodeType=document.nodeType;if(9==nodeType);else if(nodeType)document=document.ownerDocument;else{if(!document.navigator)return;document=document.document}if(this.document!==document){this.document=document;var feature,root=document.documentElement,rootUid=this.getUIDXML(root),features=featuresCache[rootUid];if(features)for(feature in features)this[feature]=features[feature];else{features=featuresCache[rootUid]={},features.root=root,features.isXMLDocument=this.isXML(document),features.brokenStarGEBTN=features.starSelectsClosedQSA=features.idGetsName=features.brokenMixedCaseQSA=features.brokenGEBCN=features.brokenCheckedQSA=features.brokenEmptyAttributeQSA=features.isHTMLDocument=features.nativeMatchesSelector=!1;var starSelectsClosed,starSelectsComments,brokenSecondClassNameGEBCN,cachedGetElementsByClassName,brokenFormAttributeGetter,selected,id="slick_uniqueid",testNode=document.createElement("div"),testRoot=document.body||document.getElementsByTagName("body")[0]||root;testRoot.appendChild(testNode);try{testNode.innerHTML='<a id="'+id+'"></a>',features.isHTMLDocument=!!document.getElementById(id)}catch(e){}if(features.isHTMLDocument){testNode.style.display="none",testNode.appendChild(document.createComment("")),starSelectsComments=testNode.getElementsByTagName("*").length>1;try{testNode.innerHTML="foo</foo>",selected=testNode.getElementsByTagName("*"),starSelectsClosed=selected&&!!selected.length&&"/"==selected[0].nodeName.charAt(0)}catch(e){}features.brokenStarGEBTN=starSelectsComments||starSelectsClosed;try{testNode.innerHTML='<a name="'+id+'"></a><b id="'+id+'"></b>',features.idGetsName=document.getElementById(id)===testNode.firstChild}catch(e){}if(testNode.getElementsByClassName){try{testNode.innerHTML='<a class="f"></a><a class="b"></a>',testNode.getElementsByClassName("b").length,testNode.firstChild.className="b",cachedGetElementsByClassName=2!=testNode.getElementsByClassName("b").length}catch(e){}try{testNode.innerHTML='<a class="a"></a><a class="f b a"></a>',brokenSecondClassNameGEBCN=2!=testNode.getElementsByClassName("a").length}catch(e){}features.brokenGEBCN=cachedGetElementsByClassName||brokenSecondClassNameGEBCN}if(testNode.querySelectorAll){try{testNode.innerHTML="foo</foo>",selected=testNode.querySelectorAll("*"),features.starSelectsClosedQSA=selected&&!!selected.length&&"/"==selected[0].nodeName.charAt(0)}catch(e){}try{testNode.innerHTML='<a class="MiX"></a>',features.brokenMixedCaseQSA=!testNode.querySelectorAll(".MiX").length}catch(e){}try{testNode.innerHTML='<select><option selected="selected">a</option></select>',features.brokenCheckedQSA=0==testNode.querySelectorAll(":checked").length}catch(e){}try{testNode.innerHTML='<a class=""></a>',features.brokenEmptyAttributeQSA=0!=testNode.querySelectorAll('[class*=""]').length}catch(e){}}try{testNode.innerHTML='<form action="s"><input id="action"/></form>',brokenFormAttributeGetter="s"!=testNode.firstChild.getAttribute("action")}catch(e){}if(features.nativeMatchesSelector=root.matches||root.mozMatchesSelector||root.webkitMatchesSelector,features.nativeMatchesSelector)try{features.nativeMatchesSelector.call(root,":slick"),features.nativeMatchesSelector=null}catch(e){}}try{root.slick_expando=1,delete root.slick_expando,features.getUID=this.getUIDHTML}catch(e){features.getUID=this.getUIDXML}testRoot.removeChild(testNode),testNode=selected=testRoot=null,features.getAttribute=features.isHTMLDocument&&brokenFormAttributeGetter?function(node,name){var method=this.attributeGetters[name];if(method)return method.call(node);var attributeNode=node.getAttributeNode(name);return attributeNode?attributeNode.nodeValue:null}:function(node,name){var method=this.attributeGetters[name];return method?method.call(node):node.getAttribute(name)},features.hasAttribute=root&&this.isNativeCode(root.hasAttribute)?function(node,attribute){return node.hasAttribute(attribute)}:function(node,attribute){return node=node.getAttributeNode(attribute),!(!node||!node.specified&&!node.nodeValue)};var nativeRootContains=root&&this.isNativeCode(root.contains),nativeDocumentContains=document&&this.isNativeCode(document.contains);features.contains=nativeRootContains&&nativeDocumentContains?function(context,node){return context.contains(node)}:nativeRootContains&&!nativeDocumentContains?function(context,node){return context===node||(context===document?document.documentElement:context).contains(node)}:root&&root.compareDocumentPosition?function(context,node){return context===node||!!(16&context.compareDocumentPosition(node))}:function(context,node){if(node)do if(node===context)return!0;while(node=node.parentNode);return!1},features.documentSorter=root.compareDocumentPosition?function(a,b){return a.compareDocumentPosition&&b.compareDocumentPosition?4&a.compareDocumentPosition(b)?-1:a===b?0:1:0}:"sourceIndex"in root?function(a,b){return a.sourceIndex&&b.sourceIndex?a.sourceIndex-b.sourceIndex:0}:document.createRange?function(a,b){if(!a.ownerDocument||!b.ownerDocument)return 0;var aRange=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();return aRange.setStart(a,0),aRange.setEnd(a,0),bRange.setStart(b,0),bRange.setEnd(b,0),aRange.compareBoundaryPoints(Range.START_TO_END,bRange)}:null,root=null;for(feature in features)this[feature]=features[feature]}}};var reSimpleSelector=/^([#.]?)((?:[\w-]+|\*))$/,reEmptyAttribute=/\[.+[*$^]=(?:""|'')?\]/,qsaFailExpCache={};
local.search=function(context,expression,append,first){var found=this.found=first?null:append||[];if(!context)return found;if(context.navigator)context=context.document;else if(!context.nodeType)return found;var parsed,i,uniques=this.uniques={},hasOthers=!(!append||!append.length),contextIsDocument=9==context.nodeType;if(this.document!==(contextIsDocument?context:context.ownerDocument)&&this.setDocument(context),hasOthers)for(i=found.length;i--;)uniques[this.getUID(found[i])]=!0;if("string"==typeof expression){var simpleSelector=expression.match(reSimpleSelector);simpleSelectors:if(simpleSelector){var node,nodes,symbol=simpleSelector[1],name=simpleSelector[2];if(symbol){if("#"==symbol){if(!this.isHTMLDocument||!contextIsDocument)break simpleSelectors;if(node=context.getElementById(name),!node)return found;if(this.idGetsName&&node.getAttributeNode("id").nodeValue!=name)break simpleSelectors;if(first)return node||null;hasOthers&&uniques[this.getUID(node)]||found.push(node)}else if("."==symbol){if(!this.isHTMLDocument||(!context.getElementsByClassName||this.brokenGEBCN)&&context.querySelectorAll)break simpleSelectors;if(context.getElementsByClassName&&!this.brokenGEBCN){if(nodes=context.getElementsByClassName(name),first)return nodes[0]||null;for(i=0;node=nodes[i++];)hasOthers&&uniques[this.getUID(node)]||found.push(node)}else{var matchClass=new RegExp("(^|\\s)"+Slick.escapeRegExp(name)+"(\\s|$)");for(nodes=context.getElementsByTagName("*"),i=0;node=nodes[i++];)if(className=node.className,className&&matchClass.test(className)){if(first)return node;hasOthers&&uniques[this.getUID(node)]||found.push(node)}}}}else{if("*"==name&&this.brokenStarGEBTN)break simpleSelectors;if(nodes=context.getElementsByTagName(name),first)return nodes[0]||null;for(i=0;node=nodes[i++];)hasOthers&&uniques[this.getUID(node)]||found.push(node)}return hasOthers&&this.sort(found),first?null:found}querySelector:if(context.querySelectorAll){if(!this.isHTMLDocument||qsaFailExpCache[expression]||this.brokenMixedCaseQSA||this.brokenCheckedQSA&&expression.indexOf(":checked")>-1||this.brokenEmptyAttributeQSA&&reEmptyAttribute.test(expression)||!contextIsDocument&&expression.indexOf(",")>-1||Slick.disableQSA)break querySelector;var _expression=expression,_context=context;if(!contextIsDocument){var currentId=_context.getAttribute("id"),slickid="slickid__";_context.setAttribute("id",slickid),_expression="#"+slickid+" "+_expression,context=_context.parentNode}try{if(first)return context.querySelector(_expression)||null;nodes=context.querySelectorAll(_expression)}catch(e){qsaFailExpCache[expression]=1;break querySelector}finally{contextIsDocument||(currentId?_context.setAttribute("id",currentId):_context.removeAttribute("id"),context=_context)}if(this.starSelectsClosedQSA)for(i=0;node=nodes[i++];)!(node.nodeName>"@")||hasOthers&&uniques[this.getUID(node)]||found.push(node);else for(i=0;node=nodes[i++];)hasOthers&&uniques[this.getUID(node)]||found.push(node);return hasOthers&&this.sort(found),found}if(parsed=this.Slick.parse(expression),!parsed.length)return found}else{if(null==expression)return found;if(!expression.Slick)return this.contains(context.documentElement||context,expression)?(found?found.push(expression):found=expression,found):found;parsed=expression}this.posNTH={},this.posNTHLast={},this.posNTHType={},this.posNTHTypeLast={},this.push=!hasOthers&&(first||1==parsed.length&&1==parsed.expressions[0].length)?this.pushArray:this.pushUID,null==found&&(found=[]);var j,m,n,combinator,tag,id,classList,classes,attributes,pseudos,currentItems,currentExpression,currentBit,lastBit,expressions=parsed.expressions;search:for(i=0;currentExpression=expressions[i];i++)for(j=0;currentBit=currentExpression[j];j++){if(combinator="combinator:"+currentBit.combinator,!this[combinator])continue search;if(tag=this.isXMLDocument?currentBit.tag:currentBit.tag.toUpperCase(),id=currentBit.id,classList=currentBit.classList,classes=currentBit.classes,attributes=currentBit.attributes,pseudos=currentBit.pseudos,lastBit=j===currentExpression.length-1,this.bitUniques={},lastBit?(this.uniques=uniques,this.found=found):(this.uniques={},this.found=[]),0===j){if(this[combinator](context,tag,id,classes,attributes,pseudos,classList),first&&lastBit&&found.length)break search}else if(first&&lastBit){for(m=0,n=currentItems.length;n>m;m++)if(this[combinator](currentItems[m],tag,id,classes,attributes,pseudos,classList),found.length)break search}else for(m=0,n=currentItems.length;n>m;m++)this[combinator](currentItems[m],tag,id,classes,attributes,pseudos,classList);currentItems=this.found}return(hasOthers||parsed.expressions.length>1)&&this.sort(found),first?found[0]||null:found},local.uidx=1,local.uidk="slick-uniqueid",local.getUIDXML=function(node){var uid=node.getAttribute(this.uidk);return uid||(uid=this.uidx++,node.setAttribute(this.uidk,uid)),uid},local.getUIDHTML=function(node){return node.uniqueNumber||(node.uniqueNumber=this.uidx++)},local.sort=function(results){return this.documentSorter?(results.sort(this.documentSorter),results):results},local.cacheNTH={},local.matchNTH=/^([+-]?\d*)?([a-z]+)?([+-]\d+)?$/,local.parseNTHArgument=function(argument){var parsed=argument.match(this.matchNTH);if(!parsed)return!1;var special=parsed[2]||!1,a=parsed[1]||1;"-"==a&&(a=-1);var b=+parsed[3]||0;return parsed="n"==special?{a:a,b:b}:"odd"==special?{a:2,b:1}:"even"==special?{a:2,b:0}:{a:0,b:a},this.cacheNTH[argument]=parsed},local.createNTHPseudo=function(child,sibling,positions,ofType){return function(node,argument){var uid=this.getUID(node);if(!this[positions][uid]){var parent=node.parentNode;if(!parent)return!1;var el=parent[child],count=1;if(ofType){var nodeName=node.nodeName;do el.nodeName==nodeName&&(this[positions][this.getUID(el)]=count++);while(el=el[sibling])}else do 1==el.nodeType&&(this[positions][this.getUID(el)]=count++);while(el=el[sibling])}argument=argument||"n";var parsed=this.cacheNTH[argument]||this.parseNTHArgument(argument);if(!parsed)return!1;var a=parsed.a,b=parsed.b,pos=this[positions][uid];if(0==a)return b==pos;if(a>0){if(b>pos)return!1}else if(pos>b)return!1;return(pos-b)%a==0}},local.pushArray=function(node,tag,id,classes,attributes,pseudos){this.matchSelector(node,tag,id,classes,attributes,pseudos)&&this.found.push(node)},local.pushUID=function(node,tag,id,classes,attributes,pseudos){var uid=this.getUID(node);!this.uniques[uid]&&this.matchSelector(node,tag,id,classes,attributes,pseudos)&&(this.uniques[uid]=!0,this.found.push(node))},local.matchNode=function(node,selector){if(this.isHTMLDocument&&this.nativeMatchesSelector)try{return this.nativeMatchesSelector.call(node,selector.replace(/\[([^=]+)=\s*([^'"\]]+?)\s*\]/g,'[$1="$2"]'))}catch(matchError){}var parsed=this.Slick.parse(selector);if(!parsed)return!0;var i,currentExpression,expressions=parsed.expressions,simpleExpCounter=0;for(i=0;currentExpression=expressions[i];i++)if(1==currentExpression.length){var exp=currentExpression[0];if(this.matchSelector(node,this.isXMLDocument?exp.tag:exp.tag.toUpperCase(),exp.id,exp.classes,exp.attributes,exp.pseudos))return!0;simpleExpCounter++}if(simpleExpCounter==parsed.length)return!1;var item,nodes=this.search(this.document,parsed);for(i=0;item=nodes[i++];)if(item===node)return!0;return!1},local.matchPseudo=function(node,name,argument){var pseudoName="pseudo:"+name;if(this[pseudoName])return this[pseudoName](node,argument);var attribute=this.getAttribute(node,name);return argument?argument==attribute:!!attribute},local.matchSelector=function(node,tag,id,classes,attributes,pseudos){if(tag){var nodeName=this.isXMLDocument?node.nodeName:node.nodeName.toUpperCase();if("*"==tag){if("@">nodeName)return!1}else if(nodeName!=tag)return!1}if(id&&node.getAttribute("id")!=id)return!1;var i,part,cls;if(classes)for(i=classes.length;i--;)if(cls=this.getAttribute(node,"class"),!cls||!classes[i].regexp.test(cls))return!1;if(attributes)for(i=attributes.length;i--;)if(part=attributes[i],part.operator?!part.test(this.getAttribute(node,part.key)):!this.hasAttribute(node,part.key))return!1;if(pseudos)for(i=pseudos.length;i--;)if(part=pseudos[i],!this.matchPseudo(node,part.key,part.value))return!1;return!0};var combinators={" ":function(node,tag,id,classes,attributes,pseudos,classList){var i,item,children;if(this.isHTMLDocument){getById:if(id){if(item=this.document.getElementById(id),!item&&node.all||this.idGetsName&&item&&item.getAttributeNode("id").nodeValue!=id){if(children=node.all[id],!children)return;for(children[0]||(children=[children]),i=0;item=children[i++];){var idNode=item.getAttributeNode("id");if(idNode&&idNode.nodeValue==id){this.push(item,tag,null,classes,attributes,pseudos);break}}return}if(!item){if(this.contains(this.root,node))return;break getById}if(this.document!==node&&!this.contains(node,item))return;return void this.push(item,tag,null,classes,attributes,pseudos)}getByClass:if(classes&&node.getElementsByClassName&&!this.brokenGEBCN){if(children=node.getElementsByClassName(classList.join(" ")),!children||!children.length)break getByClass;for(i=0;item=children[i++];)this.push(item,tag,id,null,attributes,pseudos);return}}if(children=node.getElementsByTagName(tag),children&&children.length)for(this.brokenStarGEBTN||(tag=null),i=0;item=children[i++];)this.push(item,tag,id,classes,attributes,pseudos)},">":function(node,tag,id,classes,attributes,pseudos){if(node=node.firstChild)do 1==node.nodeType&&this.push(node,tag,id,classes,attributes,pseudos);while(node=node.nextSibling)},"+":function(node,tag,id,classes,attributes,pseudos){for(;node=node.nextSibling;)if(1==node.nodeType){this.push(node,tag,id,classes,attributes,pseudos);break}},"^":function(node,tag,id,classes,attributes,pseudos){node=node.firstChild,node&&(1==node.nodeType?this.push(node,tag,id,classes,attributes,pseudos):this["combinator:+"](node,tag,id,classes,attributes,pseudos))},"~":function(node,tag,id,classes,attributes,pseudos){for(;node=node.nextSibling;)if(1==node.nodeType){var uid=this.getUID(node);if(this.bitUniques[uid])break;this.bitUniques[uid]=!0,this.push(node,tag,id,classes,attributes,pseudos)}},"++":function(node,tag,id,classes,attributes,pseudos){this["combinator:+"](node,tag,id,classes,attributes,pseudos),this["combinator:!+"](node,tag,id,classes,attributes,pseudos)},"~~":function(node,tag,id,classes,attributes,pseudos){this["combinator:~"](node,tag,id,classes,attributes,pseudos),this["combinator:!~"](node,tag,id,classes,attributes,pseudos)},"!":function(node,tag,id,classes,attributes,pseudos){for(;node=node.parentNode;)node!==this.document&&this.push(node,tag,id,classes,attributes,pseudos)},"!>":function(node,tag,id,classes,attributes,pseudos){node=node.parentNode,node!==this.document&&this.push(node,tag,id,classes,attributes,pseudos)},"!+":function(node,tag,id,classes,attributes,pseudos){for(;node=node.previousSibling;)if(1==node.nodeType){this.push(node,tag,id,classes,attributes,pseudos);break}},"!^":function(node,tag,id,classes,attributes,pseudos){node=node.lastChild,node&&(1==node.nodeType?this.push(node,tag,id,classes,attributes,pseudos):this["combinator:!+"](node,tag,id,classes,attributes,pseudos))},"!~":function(node,tag,id,classes,attributes,pseudos){for(;node=node.previousSibling;)if(1==node.nodeType){var uid=this.getUID(node);if(this.bitUniques[uid])break;this.bitUniques[uid]=!0,this.push(node,tag,id,classes,attributes,pseudos)}}};for(var c in combinators)local["combinator:"+c]=combinators[c];var pseudos={empty:function(node){var child=node.firstChild;return!(child&&1==child.nodeType||(node.innerText||node.textContent||"").length)},not:function(node,expression){return!this.matchNode(node,expression)},contains:function(node,text){return(node.innerText||node.textContent||"").indexOf(text)>-1},"first-child":function(node){for(;node=node.previousSibling;)if(1==node.nodeType)return!1;return!0},"last-child":function(node){for(;node=node.nextSibling;)if(1==node.nodeType)return!1;return!0},"only-child":function(node){for(var prev=node;prev=prev.previousSibling;)if(1==prev.nodeType)return!1;for(var next=node;next=next.nextSibling;)if(1==next.nodeType)return!1;return!0},"nth-child":local.createNTHPseudo("firstChild","nextSibling","posNTH"),"nth-last-child":local.createNTHPseudo("lastChild","previousSibling","posNTHLast"),"nth-of-type":local.createNTHPseudo("firstChild","nextSibling","posNTHType",!0),"nth-last-of-type":local.createNTHPseudo("lastChild","previousSibling","posNTHTypeLast",!0),index:function(node,index){return this["pseudo:nth-child"](node,""+(index+1))},even:function(node){return this["pseudo:nth-child"](node,"2n")},odd:function(node){return this["pseudo:nth-child"](node,"2n+1")},"first-of-type":function(node){for(var nodeName=node.nodeName;node=node.previousSibling;)if(node.nodeName==nodeName)return!1;return!0},"last-of-type":function(node){for(var nodeName=node.nodeName;node=node.nextSibling;)if(node.nodeName==nodeName)return!1;return!0},"only-of-type":function(node){for(var prev=node,nodeName=node.nodeName;prev=prev.previousSibling;)if(prev.nodeName==nodeName)return!1;for(var next=node;next=next.nextSibling;)if(next.nodeName==nodeName)return!1;return!0},enabled:function(node){return!node.disabled},disabled:function(node){return node.disabled},checked:function(node){return node.checked||node.selected},focus:function(node){return this.isHTMLDocument&&this.document.activeElement===node&&(node.href||node.type||this.hasAttribute(node,"tabindex"))},root:function(node){return node===this.root},selected:function(node){return node.selected}};for(var p in pseudos)local["pseudo:"+p]=pseudos[p];var attributeGetters=local.attributeGetters={"for":function(){return"htmlFor"in this?this.htmlFor:this.getAttribute("for")},href:function(){return"href"in this?this.getAttribute("href",2):this.getAttribute("href")},style:function(){return this.style?this.style.cssText:this.getAttribute("style")},tabindex:function(){var attributeNode=this.getAttributeNode("tabindex");return attributeNode&&attributeNode.specified?attributeNode.nodeValue:null},type:function(){return this.getAttribute("type")},maxlength:function(){var attributeNode=this.getAttributeNode("maxLength");return attributeNode&&attributeNode.specified?attributeNode.nodeValue:null}};attributeGetters.MAXLENGTH=attributeGetters.maxLength=attributeGetters.maxlength;var Slick=local.Slick=this.Slick||{};Slick.version="1.1.7",Slick.search=function(context,expression,append){return local.search(context,expression,append)},Slick.find=function(context,expression){return local.search(context,expression,null,!0)},Slick.contains=function(container,node){return local.setDocument(container),local.contains(container,node)},Slick.getAttribute=function(node,name){return local.setDocument(node),local.getAttribute(node,name)},Slick.hasAttribute=function(node,name){return local.setDocument(node),local.hasAttribute(node,name)},Slick.match=function(node,selector){return node&&selector?selector&&selector!==node?(local.setDocument(node),local.matchNode(node,selector)):!0:!1},Slick.defineAttributeGetter=function(name,fn){return local.attributeGetters[name]=fn,this},Slick.lookupAttributeGetter=function(name){return local.attributeGetters[name]},Slick.definePseudo=function(name,fn){return local["pseudo:"+name]=function(node,argument){return fn.call(node,argument)},this},Slick.lookupPseudo=function(name){var pseudo=local["pseudo:"+name];return pseudo?function(argument){return pseudo.call(this,argument)}:null},Slick.override=function(regexp,fn){return local.override(regexp,fn),this},Slick.isXML=local.isXML,Slick.uidOf=function(node){return local.getUIDHTML(node)},this.Slick||(this.Slick=Slick)}.apply("undefined"!=typeof exports?exports:this);var Element=this.Element=function(tag,props){var konstructor=Element.Constructors[tag];if(konstructor)return konstructor(props);if("string"!=typeof tag)return document.id(tag).set(props);if(props||(props={}),!/^[\w-]+$/.test(tag)){var parsed=Slick.parse(tag).expressions[0][0];tag="*"==parsed.tag?"div":parsed.tag,parsed.id&&null==props.id&&(props.id=parsed.id);var attributes=parsed.attributes;if(attributes)for(var attr,i=0,l=attributes.length;l>i;i++)attr=attributes[i],null==props[attr.key]&&(null!=attr.value&&"="==attr.operator?props[attr.key]=attr.value:attr.value||attr.operator||(props[attr.key]=!0));parsed.classList&&null==props["class"]&&(props["class"]=parsed.classList.join(" "))}return document.newElement(tag,props)};Browser.Element&&(Element.prototype=Browser.Element.prototype,Element.prototype._fireEvent=function(fireEvent){return function(type,event){return fireEvent.call(this,type,event)}}(Element.prototype.fireEvent)),new Type("Element",Element).mirror(function(name){if(!Array.prototype[name]){var obj={};obj[name]=function(){for(var results=[],args=arguments,elements=!0,i=0,l=this.length;l>i;i++){var element=this[i],result=results[i]=element[name].apply(element,args);elements=elements&&"element"==typeOf(result)}return elements?new Elements(results):results},Elements.implement(obj)}}),Browser.Element||(Element.parent=Object,Element.Prototype={$constructor:Element,$family:Function.from("element").hide()},Element.mirror(function(name,method){Element.Prototype[name]=method})),Element.Constructors={};var IFrame=new Type("IFrame",function(){var iframe,params=Array.link(arguments,{properties:Type.isObject,iframe:function(obj){return null!=obj}}),props=params.properties||{};params.iframe&&(iframe=document.id(params.iframe));var onload=props.onload||function(){};delete props.onload,props.id=props.name=[props.id,props.name,iframe?iframe.id||iframe.name:"IFrame_"+String.uniqueID()].pick(),iframe=new Element(iframe||"iframe",props);var onLoad=function(){onload.call(iframe.contentWindow)};return window.frames[props.id]?onLoad():iframe.addListener("load",onLoad),iframe}),Elements=this.Elements=function(nodes){if(nodes&&nodes.length)for(var node,uniques={},i=0;node=nodes[i++];){var uid=Slick.uidOf(node);uniques[uid]||(uniques[uid]=!0,this.push(node))}};Elements.prototype={length:0},Elements.parent=Array,new Type("Elements",Elements).implement({filter:function(filter,bind){return filter?new Elements(Array.filter(this,"string"==typeOf(filter)?function(item){return item.match(filter)}:filter,bind)):this}.protect(),push:function(){for(var length=this.length,i=0,l=arguments.length;l>i;i++){var item=document.id(arguments[i]);item&&(this[length++]=item)}return this.length=length}.protect(),unshift:function(){for(var items=[],i=0,l=arguments.length;l>i;i++){var item=document.id(arguments[i]);item&&items.push(item)}return Array.prototype.unshift.apply(this,items)}.protect(),concat:function(){for(var newElements=new Elements(this),i=0,l=arguments.length;l>i;i++){var item=arguments[i];Type.isEnumerable(item)?newElements.append(item):newElements.push(item)}return newElements}.protect(),append:function(collection){for(var i=0,l=collection.length;l>i;i++)this.push(collection[i]);return this}.protect(),empty:function(){for(;this.length;)delete this[--this.length];return this}.protect()}),function(){var splice=Array.prototype.splice,object={0:0,1:1,length:2};splice.call(object,1,1),1==object[1]&&Elements.implement("splice",function(){for(var length=this.length,result=splice.apply(this,arguments);length>=this.length;)delete this[length--];return result}.protect()),Array.forEachMethod(function(method,name){Elements.implement(name,method)}),Array.mirror(Elements);var createElementAcceptsHTML;try{createElementAcceptsHTML="x"==document.createElement("<input name=x>").name}catch(e){}var escapeQuotes=function(html){return(""+html).replace(/&/g,"&amp;").replace(/"/g,"&quot;")},canChangeStyleHTML=function(){var div=document.createElement("style"),flag=!1;try{div.innerHTML="#justTesing{margin: 0px;}",flag=!!div.innerHTML}catch(e){}return flag}();Document.implement({newElement:function(tag,props){if(props){if(null!=props.checked&&(props.defaultChecked=props.checked),"checkbox"!=props.type&&"radio"!=props.type||null!=props.value||(props.value="on"),!canChangeStyleHTML&&"style"==tag){var styleElement=document.createElement("style");return styleElement.setAttribute("type","text/css"),props.type&&delete props.type,this.id(styleElement).set(props)}createElementAcceptsHTML&&(tag="<"+tag,props.name&&(tag+=' name="'+escapeQuotes(props.name)+'"'),props.type&&(tag+=' type="'+escapeQuotes(props.type)+'"'),tag+=">",delete props.name,delete props.type)}return this.id(this.createElement(tag)).set(props)}})}(),function(){Slick.uidOf(window),Slick.uidOf(document),Document.implement({newTextNode:function(text){return this.createTextNode(text)},getDocument:function(){return this},getWindow:function(){return this.window},id:function(){var types={string:function(id,nocash,doc){return id=Slick.find(doc,"#"+id.replace(/(\W)/g,"\\$1")),id?types.element(id,nocash):null},element:function(el,nocash){if(Slick.uidOf(el),!nocash&&!el.$family&&!/^(?:object|embed)$/i.test(el.tagName)){var fireEvent=el.fireEvent;el._fireEvent=function(type,event){return fireEvent(type,event)},Object.append(el,Element.Prototype)}return el},object:function(obj,nocash,doc){return obj.toElement?types.element(obj.toElement(doc),nocash):null}};return types.textnode=types.whitespace=types.window=types.document=function(zero){return zero},function(el,nocash,doc){if(el&&el.$family&&el.uniqueNumber)return el;var type=typeOf(el);return types[type]?types[type](el,nocash,doc||document):null}}()}),null==window.$&&Window.implement("$",function(el,nc){return document.id(el,nc,this.document)}),Window.implement({getDocument:function(){return this.document},getWindow:function(){return this}}),[Document,Element].invoke("implement",{getElements:function(expression){return Slick.search(this,expression,new Elements)},getElement:function(expression){return document.id(Slick.find(this,expression))}});var contains={contains:function(element){return Slick.contains(this,element)}};document.contains||Document.implement(contains),document.createElement("div").contains||Element.implement(contains);var injectCombinator=function(expression,combinator){if(!expression)return combinator;expression=Object.clone(Slick.parse(expression));for(var expressions=expression.expressions,i=expressions.length;i--;)expressions[i][0].combinator=combinator;return expression};Object.forEach({getNext:"~",getPrevious:"!~",getParent:"!"},function(combinator,method){Element.implement(method,function(expression){return this.getElement(injectCombinator(expression,combinator))})}),Object.forEach({getAllNext:"~",getAllPrevious:"!~",getSiblings:"~~",getChildren:">",getParents:"!"},function(combinator,method){Element.implement(method,function(expression){return this.getElements(injectCombinator(expression,combinator))})}),Element.implement({getFirst:function(expression){return document.id(Slick.search(this,injectCombinator(expression,">"))[0])},getLast:function(expression){return document.id(Slick.search(this,injectCombinator(expression,">")).getLast())},getWindow:function(){return this.ownerDocument.window},getDocument:function(){return this.ownerDocument},getElementById:function(id){return document.id(Slick.find(this,"#"+(""+id).replace(/(\W)/g,"\\$1")))},match:function(expression){return!expression||Slick.match(this,expression)}}),null==window.$$&&Window.implement("$$",function(selector){if(1==arguments.length){if("string"==typeof selector)return Slick.search(this.document,selector,new Elements);if(Type.isEnumerable(selector))return new Elements(selector)}return new Elements(arguments)});var inserters={before:function(context,element){var parent=element.parentNode;parent&&parent.insertBefore(context,element)},after:function(context,element){var parent=element.parentNode;parent&&parent.insertBefore(context,element.nextSibling)},bottom:function(context,element){element.appendChild(context)},top:function(context,element){element.insertBefore(context,element.firstChild)}};inserters.inside=inserters.bottom;var propertyGetters={},propertySetters={},properties={};Array.forEach(["type","value","defaultValue","accessKey","cellPadding","cellSpacing","colSpan","frameBorder","rowSpan","tabIndex","useMap"],function(property){properties[property.toLowerCase()]=property}),properties.html="innerHTML",properties.text=null==document.createElement("div").textContent?"innerText":"textContent",Object.forEach(properties,function(real,key){propertySetters[key]=function(node,value){node[real]=value},propertyGetters[key]=function(node){return node[real]}}),propertySetters.text=function(){return function(node,value){"style"==node.get("tag")?node.set("html",value):node[properties.text]=value}}(propertySetters.text),propertyGetters.text=function(getter){return function(node){return"style"==node.get("tag")?node.innerHTML:getter(node)}}(propertyGetters.text);var bools=["compact","nowrap","ismap","declare","noshade","checked","disabled","readOnly","multiple","selected","noresize","defer","defaultChecked","autofocus","controls","autoplay","loop"],booleans={};Array.forEach(bools,function(bool){var lower=bool.toLowerCase();booleans[lower]=bool,propertySetters[lower]=function(node,value){node[bool]=!!value},propertyGetters[lower]=function(node){return!!node[bool]}}),Object.append(propertySetters,{"class":function(node,value){"className"in node?node.className=value||"":node.setAttribute("class",value)},"for":function(node,value){"htmlFor"in node?node.htmlFor=value:node.setAttribute("for",value)},style:function(node,value){node.style?node.style.cssText=value:node.setAttribute("style",value)},value:function(node,value){node.value=null!=value?value:""}}),propertyGetters["class"]=function(node){return"className"in node?node.className||null:node.getAttribute("class")};var el=document.createElement("button");try{el.type="button"}catch(e){}"button"!=el.type&&(propertySetters.type=function(node,value){node.setAttribute("type",value)}),el=null;var volatileInputValue,html5InputSupport,canChangeStyleHTML=function(){var div=document.createElement("style"),flag=!1;try{div.innerHTML="#justTesing{margin: 0px;}",flag=!!div.innerHTML}catch(e){}return flag}(),input=document.createElement("input");input.value="t",input.type="submit",volatileInputValue="t"!=input.value;try{input.type="email",html5InputSupport="email"==input.type}catch(e){}input=null,(volatileInputValue||!html5InputSupport)&&(propertySetters.type=function(node,type){try{var value=node.value;node.type=type,node.value=value}catch(e){}});var pollutesGetAttribute=function(div){return div.random="attribute","attribute"==div.getAttribute("random")}(document.createElement("div")),hasCloneBug=function(test){return test.innerHTML='<object><param name="should_fix" value="the unknown" /></object>',1!=test.cloneNode(!0).firstChild.childNodes.length}(document.createElement("div")),hasClassList=!!document.createElement("div").classList,classes=function(className){var classNames=(className||"").clean().split(" "),uniques={};return classNames.filter(function(className){return""===className||uniques[className]?void 0:uniques[className]=className})},addToClassList=function(name){this.classList.add(name)},removeFromClassList=function(name){this.classList.remove(name)};Element.implement({setProperty:function(name,value){var setter=propertySetters[name.toLowerCase()];if(setter)setter(this,value);else{var attributeWhiteList;pollutesGetAttribute&&(attributeWhiteList=this.retrieve("$attributeWhiteList",{})),null==value?(this.removeAttribute(name),pollutesGetAttribute&&delete attributeWhiteList[name]):(this.setAttribute(name,""+value),pollutesGetAttribute&&(attributeWhiteList[name]=!0))}return this},setProperties:function(attributes){for(var attribute in attributes)this.setProperty(attribute,attributes[attribute]);return this},getProperty:function(name){var getter=propertyGetters[name.toLowerCase()];if(getter)return getter(this);if(pollutesGetAttribute){var attr=this.getAttributeNode(name),attributeWhiteList=this.retrieve("$attributeWhiteList",{});if(!attr)return null;if(attr.expando&&!attributeWhiteList[name]){var outer=this.outerHTML;if(outer.substr(0,outer.search(/\/?['"]?>(?![^<]*<['"])/)).indexOf(name)<0)return null;attributeWhiteList[name]=!0}}var result=Slick.getAttribute(this,name);return result||Slick.hasAttribute(this,name)?result:null},getProperties:function(){var args=Array.from(arguments);return args.map(this.getProperty,this).associate(args)},removeProperty:function(name){return this.setProperty(name,null)},removeProperties:function(){return Array.each(arguments,this.removeProperty,this),this},set:function(prop,value){var property=Element.Properties[prop];property&&property.set?property.set.call(this,value):this.setProperty(prop,value)}.overloadSetter(),get:function(prop){var property=Element.Properties[prop];return property&&property.get?property.get.apply(this):this.getProperty(prop)}.overloadGetter(),erase:function(prop){var property=Element.Properties[prop];return property&&property.erase?property.erase.apply(this):this.removeProperty(prop),this},hasClass:hasClassList?function(className){return this.classList.contains(className)}:function(className){return classes(this.className).contains(className)},addClass:hasClassList?function(className){return classes(className).forEach(addToClassList,this),this}:function(className){return this.className=classes(className+" "+this.className).join(" "),this},removeClass:hasClassList?function(className){return classes(className).forEach(removeFromClassList,this),this}:function(className){var classNames=classes(this.className);return classes(className).forEach(classNames.erase,classNames),this.className=classNames.join(" "),this},toggleClass:function(className,force){return null==force&&(force=!this.hasClass(className)),force?this.addClass(className):this.removeClass(className)},adopt:function(){var fragment,parent=this,elements=Array.flatten(arguments),length=elements.length;length>1&&(parent=fragment=document.createDocumentFragment());for(var i=0;length>i;i++){var element=document.id(elements[i],!0);element&&parent.appendChild(element)}return fragment&&this.appendChild(fragment),this},appendText:function(text,where){return this.grab(this.getDocument().newTextNode(text),where)},grab:function(el,where){return inserters[where||"bottom"](document.id(el,!0),this),this},inject:function(el,where){return inserters[where||"bottom"](this,document.id(el,!0)),this},replaces:function(el){return el=document.id(el,!0),el.parentNode.replaceChild(this,el),this},wraps:function(el,where){return el=document.id(el,!0),this.replaces(el).grab(el,where)},getSelected:function(){return this.selectedIndex,new Elements(Array.from(this.options).filter(function(option){return option.selected}))},toQueryString:function(){var queryString=[];return this.getElements("input, select, textarea").each(function(el){var type=el.type;if(el.name&&!el.disabled&&"submit"!=type&&"reset"!=type&&"file"!=type&&"image"!=type){var value="select"==el.get("tag")?el.getSelected().map(function(opt){return document.id(opt).get("value")}):"radio"!=type&&"checkbox"!=type||el.checked?el.get("value"):null;Array.from(value).each(function(val){"undefined"!=typeof val&&queryString.push(encodeURIComponent(el.name)+"="+encodeURIComponent(val))})}}),queryString.join("&")}});var appendInserters={before:"beforeBegin",after:"afterEnd",bottom:"beforeEnd",top:"afterBegin",inside:"beforeEnd"};Element.implement("appendHTML","insertAdjacentHTML"in document.createElement("div")?function(html,where){return this.insertAdjacentHTML(appendInserters[where||"bottom"],html),this}:function(html,where){var temp=new Element("div",{html:html}),children=temp.childNodes,fragment=temp.firstChild;if(!fragment)return this;if(children.length>1){fragment=document.createDocumentFragment();for(var i=0,l=children.length;l>i;i++)fragment.appendChild(children[i])}return inserters[where||"bottom"](fragment,this),this});var collected={},storage={},get=function(uid){return storage[uid]||(storage[uid]={})},clean=function(item){var uid=item.uniqueNumber;return item.removeEvents&&item.removeEvents(),item.clearAttributes&&item.clearAttributes(),null!=uid&&(delete collected[uid],delete storage[uid]),item
},formProps={input:"checked",option:"selected",textarea:"value"};if(Element.implement({destroy:function(){var children=clean(this).getElementsByTagName("*");return Array.each(children,clean),Element.dispose(this),null},empty:function(){return Array.from(this.childNodes).each(Element.dispose),this},dispose:function(){return this.parentNode?this.parentNode.removeChild(this):this},clone:function(contents,keepid){contents=contents!==!1;var i,clone=this.cloneNode(contents),ce=[clone],te=[this];for(contents&&(ce.append(Array.from(clone.getElementsByTagName("*"))),te.append(Array.from(this.getElementsByTagName("*")))),i=ce.length;i--;){var node=ce[i],element=te[i];if(keepid||node.removeAttribute("id"),node.clearAttributes&&(node.clearAttributes(),node.mergeAttributes(element),node.removeAttribute("uniqueNumber"),node.options))for(var no=node.options,eo=element.options,j=no.length;j--;)no[j].selected=eo[j].selected;var prop=formProps[element.tagName.toLowerCase()];prop&&element[prop]&&(node[prop]=element[prop])}if(hasCloneBug){var co=clone.getElementsByTagName("object"),to=this.getElementsByTagName("object");for(i=co.length;i--;)co[i].outerHTML=to[i].outerHTML}return document.id(clone)}}),[Element,Window,Document].invoke("implement",{addListener:function(type,fn){return window.attachEvent&&!window.addEventListener&&(collected[Slick.uidOf(this)]=this),this.addEventListener?this.addEventListener(type,fn,!!arguments[2]):this.attachEvent("on"+type,fn),this},removeListener:function(type,fn){return this.removeEventListener?this.removeEventListener(type,fn,!!arguments[2]):this.detachEvent("on"+type,fn),this},retrieve:function(property,dflt){var storage=get(Slick.uidOf(this)),prop=storage[property];return null!=dflt&&null==prop&&(prop=storage[property]=dflt),null!=prop?prop:null},store:function(property,value){var storage=get(Slick.uidOf(this));return storage[property]=value,this},eliminate:function(property){var storage=get(Slick.uidOf(this));return delete storage[property],this}}),window.attachEvent&&!window.addEventListener){var gc=function(){Object.each(collected,clean),window.CollectGarbage&&CollectGarbage(),window.removeListener("unload",gc)};window.addListener("unload",gc)}Element.Properties={},Element.Properties.style={set:function(style){this.style.cssText=style},get:function(){return this.style.cssText},erase:function(){this.style.cssText=""}},Element.Properties.tag={get:function(){return this.tagName.toLowerCase()}},Element.Properties.html={set:function(html){null==html?html="":"array"==typeOf(html)&&(html=html.join("")),this.styleSheet&&!canChangeStyleHTML?this.styleSheet.cssText=html:this.innerHTML=html},erase:function(){this.set("html","")}};var supportsHTML5Elements=!0,supportsTableInnerHTML=!0,supportsTRInnerHTML=!0,div=document.createElement("div");if(div.innerHTML="<nav></nav>",supportsHTML5Elements=1==div.childNodes.length,!supportsHTML5Elements)for(var tags="abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(" "),fragment=document.createDocumentFragment(),l=tags.length;l--;)fragment.createElement(tags[l]);div=null,supportsTableInnerHTML=Function.attempt(function(){var table=document.createElement("table");return table.innerHTML="<tr><td></td></tr>",!0});var tr=document.createElement("tr"),html="<td></td>";tr.innerHTML=html,supportsTRInnerHTML=tr.innerHTML==html,tr=null,supportsTableInnerHTML&&supportsTRInnerHTML&&supportsHTML5Elements||(Element.Properties.html.set=function(set){var translations={table:[1,"<table>","</table>"],select:[1,"<select>","</select>"],tbody:[2,"<table><tbody>","</tbody></table>"],tr:[3,"<table><tbody><tr>","</tr></tbody></table>"]};return translations.thead=translations.tfoot=translations.tbody,function(html){if(this.styleSheet)return set.call(this,html);var wrap=translations[this.get("tag")];if(wrap||supportsHTML5Elements||(wrap=[0,"",""]),!wrap)return set.call(this,html);var level=wrap[0],wrapper=document.createElement("div"),target=wrapper;for(supportsHTML5Elements||fragment.appendChild(wrapper),wrapper.innerHTML=[wrap[1],html,wrap[2]].flatten().join("");level--;)target=target.firstChild;this.empty().adopt(target.childNodes),supportsHTML5Elements||fragment.removeChild(wrapper),wrapper=null}}(Element.Properties.html.set));var testForm=document.createElement("form");testForm.innerHTML="<select><option>s</option></select>","s"!=testForm.firstChild.value&&(Element.Properties.value={set:function(value){var tag=this.get("tag");if("select"!=tag)return this.setProperty("value",value);var options=this.getElements("option");value=String(value);for(var i=0;i<options.length;i++){var option=options[i],attr=option.getAttributeNode("value"),optionValue=attr&&attr.specified?option.value:option.get("text");if(optionValue===value)return option.selected=!0}},get:function(){var option=this,tag=option.get("tag");if("select"!=tag&&"option"!=tag)return this.getProperty("value");if("select"==tag&&!(option=option.getSelected()[0]))return"";var attr=option.getAttributeNode("value");return attr&&attr.specified?option.value:option.get("text")}}),testForm=null,document.createElement("div").getAttributeNode("id")&&(Element.Properties.id={set:function(id){this.id=this.getAttributeNode("id").value=id},get:function(){return this.id||null},erase:function(){this.id=this.getAttributeNode("id").value=""}})}(),function(){var _keys={},normalizeWheelSpeed=function(event){var normalized;if(event.wheelDelta)normalized=event.wheelDelta%120==0?event.wheelDelta/120:event.wheelDelta/12;else{var rawAmount=event.deltaY||event.detail||0;normalized=-(rawAmount%3==0?rawAmount/3:10*rawAmount)}return normalized},DOMEvent=this.DOMEvent=new Type("DOMEvent",function(event,win){if(win||(win=window),event=event||win.event,event.$extended)return event;this.event=event,this.$extended=!0,this.shift=event.shiftKey,this.control=event.ctrlKey,this.alt=event.altKey,this.meta=event.metaKey;for(var type=this.type=event.type,target=event.target||event.srcElement;target&&3==target.nodeType;)target=target.parentNode;if(this.target=document.id(target),0==type.indexOf("key")){var code=this.code=event.which||event.keyCode;this.key=_keys[code],("keydown"==type||"keyup"==type)&&(code>111&&124>code?this.key="f"+(code-111):code>95&&106>code&&(this.key=code-96)),null==this.key&&(this.key=String.fromCharCode(code).toLowerCase())}else if("click"==type||"dblclick"==type||"contextmenu"==type||"wheel"==type||"DOMMouseScroll"==type||0==type.indexOf("mouse")){var doc=win.document;if(doc=doc.compatMode&&"CSS1Compat"!=doc.compatMode?doc.body:doc.html,this.page={x:null!=event.pageX?event.pageX:event.clientX+doc.scrollLeft,y:null!=event.pageY?event.pageY:event.clientY+doc.scrollTop},this.client={x:null!=event.pageX?event.pageX-win.pageXOffset:event.clientX,y:null!=event.pageY?event.pageY-win.pageYOffset:event.clientY},("DOMMouseScroll"==type||"wheel"==type||"mousewheel"==type)&&(this.wheel=normalizeWheelSpeed(event)),this.rightClick=3==event.which||2==event.button,"mouseover"==type||"mouseout"==type){for(var related=event.relatedTarget||event[("mouseover"==type?"from":"to")+"Element"];related&&3==related.nodeType;)related=related.parentNode;this.relatedTarget=document.id(related)}}else if(0==type.indexOf("touch")||0==type.indexOf("gesture")){this.rotation=event.rotation,this.scale=event.scale,this.targetTouches=event.targetTouches,this.changedTouches=event.changedTouches;var touches=this.touches=event.touches;if(touches&&touches[0]){var touch=touches[0];this.page={x:touch.pageX,y:touch.pageY},this.client={x:touch.clientX,y:touch.clientY}}}this.client||(this.client={}),this.page||(this.page={})});DOMEvent.implement({stop:function(){return this.preventDefault().stopPropagation()},stopPropagation:function(){return this.event.stopPropagation?this.event.stopPropagation():this.event.cancelBubble=!0,this},preventDefault:function(){return this.event.preventDefault?this.event.preventDefault():this.event.returnValue=!1,this}}),DOMEvent.defineKey=function(code,key){return _keys[code]=key,this},DOMEvent.defineKeys=DOMEvent.defineKey.overloadSetter(!0),DOMEvent.defineKeys({38:"up",40:"down",37:"left",39:"right",27:"esc",32:"space",8:"backspace",9:"tab",46:"delete",13:"enter"})}(),function(){Element.Properties.events={set:function(events){this.addEvents(events)}},[Element,Window,Document].invoke("implement",{addEvent:function(type,fn){var events=this.retrieve("events",{});if(events[type]||(events[type]={keys:[],values:[]}),events[type].keys.contains(fn))return this;events[type].keys.push(fn);var realType=type,custom=Element.Events[type],condition=fn,self=this;custom&&(custom.onAdd&&custom.onAdd.call(this,fn,type),custom.condition&&(condition=function(event){return custom.condition.call(this,event,type)?fn.call(this,event):!0}),custom.base&&(realType=Function.from(custom.base).call(this,type)));var defn=function(){return fn.call(self)},nativeEvent=Element.NativeEvents[realType];return nativeEvent&&(2==nativeEvent&&(defn=function(event){event=new DOMEvent(event,self.getWindow()),condition.call(self,event)===!1&&event.stop()}),this.addListener(realType,defn,arguments[2])),events[type].values.push(defn),this},removeEvent:function(type,fn){var events=this.retrieve("events");if(!events||!events[type])return this;var list=events[type],index=list.keys.indexOf(fn);if(-1==index)return this;var value=list.values[index];delete list.keys[index],delete list.values[index];var custom=Element.Events[type];return custom&&(custom.onRemove&&custom.onRemove.call(this,fn,type),custom.base&&(type=Function.from(custom.base).call(this,type))),Element.NativeEvents[type]?this.removeListener(type,value,arguments[2]):this},addEvents:function(events){for(var event in events)this.addEvent(event,events[event]);return this},removeEvents:function(events){var type;if("object"==typeOf(events)){for(type in events)this.removeEvent(type,events[type]);return this}var attached=this.retrieve("events");if(!attached)return this;if(events)attached[events]&&(attached[events].keys.each(function(fn){this.removeEvent(events,fn)},this),delete attached[events]);else{for(type in attached)this.removeEvents(type);this.eliminate("events")}return this},fireEvent:function(type,args,delay){var events=this.retrieve("events");return events&&events[type]?(args=Array.from(args),events[type].keys.each(function(fn){delay?fn.delay(delay,this,args):fn.apply(this,args)},this),this):this},cloneEvents:function(from,type){from=document.id(from);var events=from.retrieve("events");if(!events)return this;if(type)events[type]&&events[type].keys.each(function(fn){this.addEvent(type,fn)},this);else for(var eventType in events)this.cloneEvents(from,eventType);return this}}),Element.NativeEvents={click:2,dblclick:2,mouseup:2,mousedown:2,contextmenu:2,wheel:2,mousewheel:2,DOMMouseScroll:2,mouseover:2,mouseout:2,mousemove:2,selectstart:2,selectend:2,keydown:2,keypress:2,keyup:2,orientationchange:2,touchstart:2,touchmove:2,touchend:2,touchcancel:2,gesturestart:2,gesturechange:2,gestureend:2,focus:2,blur:2,change:2,reset:2,select:2,submit:2,paste:2,input:2,load:2,unload:1,beforeunload:2,resize:1,move:1,DOMContentLoaded:1,readystatechange:1,hashchange:1,popstate:2,error:1,abort:1,scroll:1,message:2},Element.Events={mousewheel:{base:"onwheel"in document?"wheel":"onmousewheel"in document?"mousewheel":"DOMMouseScroll"}};var check=function(event){var related=event.relatedTarget;return null==related?!0:related?related!=this&&"xul"!=related.prefix&&"document"!=typeOf(this)&&!this.contains(related):!1};"onmouseenter"in document.documentElement?(Element.NativeEvents.mouseenter=Element.NativeEvents.mouseleave=2,Element.MouseenterCheck=check):(Element.Events.mouseenter={base:"mouseover",condition:check},Element.Events.mouseleave={base:"mouseout",condition:check}),window.addEventListener||(Element.NativeEvents.propertychange=2,Element.Events.change={base:function(){var type=this.type;return"input"!=this.get("tag")||"radio"!=type&&"checkbox"!=type?"change":"propertychange"},condition:function(event){return"propertychange"!=event.type||"checked"==event.event.propertyName}})}(),function(){var eventListenerSupport=!!window.addEventListener;Element.NativeEvents.focusin=Element.NativeEvents.focusout=2;var bubbleUp=function(self,match,fn,event,target){for(;target&&target!=self;){if(match(target,event))return fn.call(target,event,target);target=document.id(target.parentNode)}},map={mouseenter:{base:"mouseover",condition:Element.MouseenterCheck},mouseleave:{base:"mouseout",condition:Element.MouseenterCheck},focus:{base:"focus"+(eventListenerSupport?"":"in"),capture:!0},blur:{base:eventListenerSupport?"blur":"focusout",capture:!0}},_key="$delegation:",formObserver=function(type){return{base:"focusin",remove:function(self,uid){var list=self.retrieve(_key+type+"listeners",{})[uid];if(list&&list.forms)for(var i=list.forms.length;i--;)list.forms[i].removeEvent&&list.forms[i].removeEvent(type,list.fns[i])},listen:function(self,match,fn,event,target,uid){var form="form"==target.get("tag")?target:event.target.getParent("form");if(form){var listeners=self.retrieve(_key+type+"listeners",{}),listener=listeners[uid]||{forms:[],fns:[]},forms=listener.forms,fns=listener.fns;if(-1==forms.indexOf(form)){forms.push(form);var _fn=function(event){bubbleUp(self,match,fn,event,target)};form.addEvent(type,_fn),fns.push(_fn),listeners[uid]=listener,self.store(_key+type+"listeners",listeners)}}}}},inputObserver=function(type){return{base:"focusin",listen:function(self,match,fn,event,target){var events={blur:function(){this.removeEvents(events)}};events[type]=function(event){bubbleUp(self,match,fn,event,target)},event.target.addEvents(events)}}};eventListenerSupport||Object.append(map,{submit:formObserver("submit"),reset:formObserver("reset"),change:inputObserver("change"),select:inputObserver("select")});var proto=Element.prototype,addEvent=proto.addEvent,removeEvent=proto.removeEvent,relay=function(old,method){return function(type,fn,useCapture){if(-1==type.indexOf(":relay"))return old.call(this,type,fn,useCapture);var parsed=Slick.parse(type).expressions[0][0];if("relay"!=parsed.pseudos[0].key)return old.call(this,type,fn,useCapture);var newType=parsed.tag;return parsed.pseudos.slice(1).each(function(pseudo){newType+=":"+pseudo.key+(pseudo.value?"("+pseudo.value+")":"")}),old.call(this,type,fn),method.call(this,newType,parsed.pseudos[0].value,fn)}},delegation={addEvent:function(type,match,fn){var storage=this.retrieve("$delegates",{}),stored=storage[type];if(stored)for(var _uid in stored)if(stored[_uid].fn==fn&&stored[_uid].match==match)return this;var _type=type,_match=match,_fn=fn,_map=map[type]||{};type=_map.base||_type,match=function(target){return Slick.match(target,_match)};var elementEvent=Element.Events[_type];if(_map.condition||elementEvent&&elementEvent.condition){var __match=match,condition=_map.condition||elementEvent.condition;match=function(target,event){return __match(target,event)&&condition.call(target,event,type)}}var self=this,uid=String.uniqueID(),delegator=_map.listen?function(event,target){!target&&event&&event.target&&(target=event.target),target&&_map.listen(self,match,fn,event,target,uid)}:function(event,target){!target&&event&&event.target&&(target=event.target),target&&bubbleUp(self,match,fn,event,target)};return stored||(stored={}),stored[uid]={match:_match,fn:_fn,delegator:delegator},storage[_type]=stored,addEvent.call(this,type,delegator,_map.capture)},removeEvent:function(type,match,fn,_uid){var storage=this.retrieve("$delegates",{}),stored=storage[type];if(!stored)return this;if(_uid){var _type=type,delegator=stored[_uid].delegator,_map=map[type]||{};return type=_map.base||_type,_map.remove&&_map.remove(this,_uid),delete stored[_uid],storage[_type]=stored,removeEvent.call(this,type,delegator,_map.capture)}var __uid,s;if(fn){for(__uid in stored)if(s=stored[__uid],s.match==match&&s.fn==fn)return delegation.removeEvent.call(this,type,match,fn,__uid)}else for(__uid in stored)s=stored[__uid],s.match==match&&delegation.removeEvent.call(this,type,match,s.fn,__uid);return this}};[Element,Window,Document].invoke("implement",{addEvent:relay(addEvent,delegation.addEvent),removeEvent:relay(removeEvent,delegation.removeEvent)})}(),function(){var el,html=document.html;el=document.createElement("div"),el.style.color="red",el.style.color=null;var doesNotRemoveStyles="red"==el.style.color,border="1px solid #123abc";el.style.border=border;var returnsBordersInWrongOrder=el.style.border!=border;el=null;var hasGetComputedStyle=!!window.getComputedStyle,supportBorderRadius=null!=document.createElement("div").style.borderRadius;Element.Properties.styles={set:function(styles){this.setStyles(styles)}};var hasOpacity=null!=html.style.opacity,hasFilter=null!=html.style.filter,reAlpha=/alpha\(opacity=([\d.]+)\)/i,setVisibility=function(element,opacity){element.store("$opacity",opacity),element.style.visibility=opacity>0||null==opacity?"visible":"hidden"},setFilter=function(element,regexp,value){var style=element.style,filter=style.filter||element.getComputedStyle("filter")||"";style.filter=(regexp.test(filter)?filter.replace(regexp,value):filter+" "+value).trim(),style.filter||style.removeAttribute("filter")},setOpacity=hasOpacity?function(element,opacity){element.style.opacity=opacity}:hasFilter?function(element,opacity){element.currentStyle&&element.currentStyle.hasLayout||(element.style.zoom=1),null==opacity||1==opacity?(setFilter(element,reAlpha,""),1==opacity&&1!=getOpacity(element)&&setFilter(element,reAlpha,"alpha(opacity=100)")):setFilter(element,reAlpha,"alpha(opacity="+(100*opacity).limit(0,100).round()+")")}:setVisibility,getOpacity=hasOpacity?function(element){var opacity=element.style.opacity||element.getComputedStyle("opacity");return""==opacity?1:opacity.toFloat()}:hasFilter?function(element){var opacity,filter=element.style.filter||element.getComputedStyle("filter");return filter&&(opacity=filter.match(reAlpha)),null==opacity||null==filter?1:opacity[1]/100}:function(element){var opacity=element.retrieve("$opacity");return null==opacity&&(opacity="hidden"==element.style.visibility?0:1),opacity},floatName=null==html.style.cssFloat?"styleFloat":"cssFloat",namedPositions={left:"0%",top:"0%",center:"50%",right:"100%",bottom:"100%"},hasBackgroundPositionXY=null!=html.style.backgroundPositionX,removeStyle=function(style,property){"backgroundPosition"==property&&(style.removeAttribute(property+"X"),property+="Y"),style.removeAttribute(property)};Element.implement({getComputedStyle:function(property){if(!hasGetComputedStyle&&this.currentStyle)return this.currentStyle[property.camelCase()];var defaultView=Element.getDocument(this).defaultView,computed=defaultView?defaultView.getComputedStyle(this,null):null;return computed?computed.getPropertyValue(property==floatName?"float":property.hyphenate()):""},setStyle:function(property,value){if("opacity"==property)return null!=value&&(value=parseFloat(value)),setOpacity(this,value),this;if(property=("float"==property?floatName:property).camelCase(),"string"!=typeOf(value)){var map=(Element.Styles[property]||"@").split(" ");value=Array.from(value).map(function(val,i){return map[i]?"number"==typeOf(val)?map[i].replace("@",Math.round(val)):val:""}).join(" ")}else value==String(Number(value))&&(value=Math.round(value));return this.style[property]=value,(""==value||null==value)&&doesNotRemoveStyles&&this.style.removeAttribute&&removeStyle(this.style,property),this},getStyle:function(property){if("opacity"==property)return getOpacity(this);if(property=("float"==property?floatName:property).camelCase(),supportBorderRadius&&-1!=property.indexOf("borderRadius"))return["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"].map(function(corner){return this.style[corner]||"0px"},this).join(" ");var result=this.style[property];if(!result||"zIndex"==property){if(Element.ShortStyles.hasOwnProperty(property)){result=[];for(var s in Element.ShortStyles[property])result.push(this.getStyle(s));return result.join(" ")}result=this.getComputedStyle(property)}if(hasBackgroundPositionXY&&/^backgroundPosition[XY]?$/.test(property))return result.replace(/(top|right|bottom|left)/g,function(position){return namedPositions[position]})||"0px";if(!result&&"backgroundPosition"==property)return"0px 0px";if(result){result=String(result);var color=result.match(/rgba?\([\d\s,]+\)/);color&&(result=result.replace(color[0],color[0].rgbToHex()))}if(!hasGetComputedStyle&&!this.style[property]){if(/^(height|width)$/.test(property)&&!/px$/.test(result)){var values="width"==property?["left","right"]:["top","bottom"],size=0;return values.each(function(value){size+=this.getStyle("border-"+value+"-width").toInt()+this.getStyle("padding-"+value).toInt()},this),this["offset"+property.capitalize()]-size+"px"}if(/^border(.+)Width|margin|padding/.test(property)&&isNaN(parseFloat(result)))return"0px"}return returnsBordersInWrongOrder&&/^border(Top|Right|Bottom|Left)?$/.test(property)&&/^#/.test(result)?result.replace(/^(.+)\s(.+)\s(.+)$/,"$2 $3 $1"):result},setStyles:function(styles){for(var style in styles)this.setStyle(style,styles[style]);return this},getStyles:function(){var result={};return Array.flatten(arguments).each(function(key){result[key]=this.getStyle(key)},this),result}}),Element.Styles={left:"@px",top:"@px",bottom:"@px",right:"@px",width:"@px",height:"@px",maxWidth:"@px",maxHeight:"@px",minWidth:"@px",minHeight:"@px",backgroundColor:"rgb(@, @, @)",backgroundSize:"@px",backgroundPosition:"@px @px",color:"rgb(@, @, @)",fontSize:"@px",letterSpacing:"@px",lineHeight:"@px",clip:"rect(@px @px @px @px)",margin:"@px @px @px @px",padding:"@px @px @px @px",border:"@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)",borderWidth:"@px @px @px @px",borderStyle:"@ @ @ @",borderColor:"rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)",zIndex:"@",zoom:"@",fontWeight:"@",textIndent:"@px",opacity:"@",borderRadius:"@px @px @px @px"},Element.ShortStyles={margin:{},padding:{},border:{},borderWidth:{},borderStyle:{},borderColor:{}},["Top","Right","Bottom","Left"].each(function(direction){var Short=Element.ShortStyles,All=Element.Styles;["margin","padding"].each(function(style){var sd=style+direction;Short[style][sd]=All[sd]="@px"});var bd="border"+direction;Short.border[bd]=All[bd]="@px @ rgb(@, @, @)";var bdw=bd+"Width",bds=bd+"Style",bdc=bd+"Color";Short[bd]={},Short.borderWidth[bdw]=Short[bd][bdw]=All[bdw]="@px",Short.borderStyle[bds]=Short[bd][bds]=All[bds]="@",Short.borderColor[bdc]=Short[bd][bdc]=All[bdc]="rgb(@, @, @)"}),hasBackgroundPositionXY&&(Element.ShortStyles.backgroundPosition={backgroundPositionX:"@",backgroundPositionY:"@"})}(),function(){function styleNumber(element,style){return styleString(element,style).toInt()||0}function topBorder(element){return styleNumber(element,"border-top-width")}function leftBorder(element){return styleNumber(element,"border-left-width")}function isBody(element){return/^(?:body|html)$/i.test(element.tagName)}function getCompatElement(element){var doc=element.getDocument();return doc.compatMode&&"CSS1Compat"!=doc.compatMode?doc.body:doc.html}var element=document.createElement("div"),child=document.createElement("div");element.style.height="0",element.appendChild(child);var brokenOffsetParent=child.offsetParent===element;element=child=null;var heightComponents=["height","paddingTop","paddingBottom","borderTopWidth","borderBottomWidth"],widthComponents=["width","paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],svgCalculateSize=function(el){var gCS=window.getComputedStyle(el),bounds={x:0,y:0};return heightComponents.each(function(css){bounds.y+=parseFloat(gCS[css])}),widthComponents.each(function(css){bounds.x+=parseFloat(gCS[css])}),bounds},isOffset=function(el){return"static"!=styleString(el,"position")||isBody(el)},isOffsetStatic=function(el){return isOffset(el)||/^(?:table|td|th)$/i.test(el.tagName)};Element.implement({scrollTo:function(x,y){return isBody(this)?this.getWindow().scrollTo(x,y):(this.scrollLeft=x,this.scrollTop=y),this},getSize:function(){if(isBody(this))return this.getWindow().getSize();if(!window.getComputedStyle)return{x:this.offsetWidth,y:this.offsetHeight};if("svg"==this.get("tag"))return svgCalculateSize(this);var bounds=this.getBoundingClientRect();return{x:bounds.width,y:bounds.height}},getScrollSize:function(){return isBody(this)?this.getWindow().getScrollSize():{x:this.scrollWidth,y:this.scrollHeight}},getScroll:function(){return isBody(this)?this.getWindow().getScroll():{x:this.scrollLeft,y:this.scrollTop}},getScrolls:function(){for(var element=this.parentNode,position={x:0,y:0};element&&!isBody(element);)position.x+=element.scrollLeft,position.y+=element.scrollTop,element=element.parentNode;return position},getOffsetParent:brokenOffsetParent?function(){var element=this;if(isBody(element)||"fixed"==styleString(element,"position"))return null;for(var isOffsetCheck="static"==styleString(element,"position")?isOffsetStatic:isOffset;element=element.parentNode;)if(isOffsetCheck(element))return element;return null}:function(){var element=this;if(isBody(element)||"fixed"==styleString(element,"position"))return null;try{return element.offsetParent}catch(e){}return null},getOffsets:function(){var hasGetBoundingClientRect=this.getBoundingClientRect;if(hasGetBoundingClientRect){var bound=this.getBoundingClientRect(),html=document.id(this.getDocument().documentElement),htmlScroll=html.getScroll(),elemScrolls=this.getScrolls(),isFixed="fixed"==styleString(this,"position");return{x:bound.left.toInt()+elemScrolls.x+(isFixed?0:htmlScroll.x)-html.clientLeft,y:bound.top.toInt()+elemScrolls.y+(isFixed?0:htmlScroll.y)-html.clientTop}}var element=this,position={x:0,y:0};if(isBody(this))return position;for(;element&&!isBody(element);)position.x+=element.offsetLeft,position.y+=element.offsetTop,element=element.offsetParent;return position},getPosition:function(relative){var offset=this.getOffsets(),scroll=this.getScrolls(),position={x:offset.x-scroll.x,y:offset.y-scroll.y};if(relative&&(relative=document.id(relative))){var relativePosition=relative.getPosition();return{x:position.x-relativePosition.x-leftBorder(relative),y:position.y-relativePosition.y-topBorder(relative)}}return position},getCoordinates:function(element){if(isBody(this))return this.getWindow().getCoordinates();var position=this.getPosition(element),size=this.getSize(),obj={left:position.x,top:position.y,width:size.x,height:size.y};return obj.right=obj.left+obj.width,obj.bottom=obj.top+obj.height,obj},computePosition:function(obj){return{left:obj.x-styleNumber(this,"margin-left"),top:obj.y-styleNumber(this,"margin-top")}},setPosition:function(obj){return this.setStyles(this.computePosition(obj))}}),[Document,Window].invoke("implement",{getSize:function(){var doc=getCompatElement(this);return{x:doc.clientWidth,y:doc.clientHeight}},getScroll:function(){var win=this.getWindow(),doc=getCompatElement(this);return{x:win.pageXOffset||doc.scrollLeft,y:win.pageYOffset||doc.scrollTop}},getScrollSize:function(){var doc=getCompatElement(this),min=this.getSize(),body=this.getDocument().body;return{x:Math.max(doc.scrollWidth,body.scrollWidth,min.x),y:Math.max(doc.scrollHeight,body.scrollHeight,min.y)}},getPosition:function(){return{x:0,y:0}},getCoordinates:function(){var size=this.getSize();return{top:0,left:0,bottom:size.y,right:size.x,height:size.y,width:size.x}}});var styleString=Element.getComputedStyle}(),Element.alias({position:"setPosition"}),[Window,Document,Element].invoke("implement",{getHeight:function(){return this.getSize().y},getWidth:function(){return this.getSize().x},getScrollTop:function(){return this.getScroll().y},getScrollLeft:function(){return this.getScroll().x},getScrollHeight:function(){return this.getScrollSize().y},getScrollWidth:function(){return this.getScrollSize().x},getTop:function(){return this.getPosition().y},getLeft:function(){return this.getPosition().x}}),function(){var Fx=this.Fx=new Class({Implements:[Chain,Events,Options],options:{fps:60,unit:!1,duration:500,frames:null,frameSkip:!0,link:"ignore"},initialize:function(options){this.subject=this.subject||this,this.setOptions(options)},getTransition:function(){return function(p){return-(Math.cos(Math.PI*p)-1)/2}},step:function(now){if(this.options.frameSkip){var diff=null!=this.time?now-this.time:0,frames=diff/this.frameInterval;this.time=now,this.frame+=frames}else this.frame++;if(this.frame<this.frames){var delta=this.transition(this.frame/this.frames);this.set(this.compute(this.from,this.to,delta))}else this.frame=this.frames,this.set(this.compute(this.from,this.to,1)),this.stop()},set:function(now){return now},compute:function(from,to,delta){return Fx.compute(from,to,delta)},check:function(){if(!this.isRunning())return!0;switch(this.options.link){case"cancel":return this.cancel(),!0;case"chain":return this.chain(this.caller.pass(arguments,this)),!1}return!1},start:function(from,to){if(!this.check(from,to))return this;this.from=from,this.to=to,this.frame=this.options.frameSkip?0:-1,this.time=null,this.transition=this.getTransition();var frames=this.options.frames,fps=this.options.fps,duration=this.options.duration;return this.duration=Fx.Durations[duration]||duration.toInt(),this.frameInterval=1e3/fps,this.frames=frames||Math.round(this.duration/this.frameInterval),this.fireEvent("start",this.subject),pushInstance.call(this,fps),this},stop:function(){return this.isRunning()&&(this.time=null,pullInstance.call(this,this.options.fps),this.frames==this.frame?(this.fireEvent("complete",this.subject),this.callChain()||this.fireEvent("chainComplete",this.subject)):this.fireEvent("stop",this.subject)),this},cancel:function(){return this.isRunning()&&(this.time=null,pullInstance.call(this,this.options.fps),this.frame=this.frames,this.fireEvent("cancel",this.subject).clearChain()),this},pause:function(){return this.isRunning()&&(this.time=null,pullInstance.call(this,this.options.fps)),this},resume:function(){return this.isPaused()&&pushInstance.call(this,this.options.fps),this},isRunning:function(){var list=instances[this.options.fps];return list&&list.contains(this)},isPaused:function(){return this.frame<this.frames&&!this.isRunning()}});Fx.compute=function(from,to,delta){return(to-from)*delta+from},Fx.Durations={"short":250,normal:500,"long":1e3};var instances={},timers={},loop=function(){for(var now=Date.now(),i=this.length;i--;){var instance=this[i];instance&&instance.step(now)}},pushInstance=function(fps){var list=instances[fps]||(instances[fps]=[]);list.push(this),timers[fps]||(timers[fps]=loop.periodical(Math.round(1e3/fps),list))},pullInstance=function(fps){var list=instances[fps];list&&(list.erase(this),!list.length&&timers[fps]&&(delete instances[fps],timers[fps]=clearInterval(timers[fps])))}}(),Fx.CSS=new Class({Extends:Fx,prepare:function(element,property,values){values=Array.from(values);var from=values[0],to=values[1];if(null==to){to=from,from=element.getStyle(property);var unit=this.options.unit;if(unit&&from&&"string"==typeof from&&from.slice(-unit.length)!=unit&&0!=parseFloat(from)){element.setStyle(property,to+unit);var value=element.getComputedStyle(property);if(!/px$/.test(value)&&(value=element.style[("pixel-"+property).camelCase()],null==value)){var left=element.style.left;element.style.left=to+unit,value=element.style.pixelLeft,element.style.left=left}from=(to||1)/(parseFloat(value)||1)*(parseFloat(from)||0),element.setStyle(property,from+unit)}}return{from:this.parse(from),to:this.parse(to)}},parse:function(value){return value=Function.from(value)(),value="string"==typeof value?value.split(" "):Array.from(value),value.map(function(val){val=String(val);var found=!1;return Object.each(Fx.CSS.Parsers,function(parser){if(!found){var parsed=parser.parse(val);(parsed||0===parsed)&&(found={value:parsed,parser:parser})}}),found=found||{value:val,parser:Fx.CSS.Parsers.String}})},compute:function(from,to,delta){var computed=[];
return Math.min(from.length,to.length).times(function(i){computed.push({value:from[i].parser.compute(from[i].value,to[i].value,delta),parser:from[i].parser})}),computed.$family=Function.from("fx:css:value"),computed},serve:function(value,unit){"fx:css:value"!=typeOf(value)&&(value=this.parse(value));var returned=[];return value.each(function(bit){returned=returned.concat(bit.parser.serve(bit.value,unit))}),returned},render:function(element,property,value,unit){element.setStyle(property,this.serve(value,unit))},search:function(selector){if(Fx.CSS.Cache[selector])return Fx.CSS.Cache[selector];var to={},selectorTest=new RegExp("^"+selector.escapeRegExp()+"$"),searchStyles=function(rules){Array.each(rules,function(rule){if(rule.media)return void searchStyles(rule.rules||rule.cssRules);if(rule.style){var selectorText=rule.selectorText?rule.selectorText.replace(/^\w+/,function(m){return m.toLowerCase()}):null;selectorText&&selectorTest.test(selectorText)&&Object.each(Element.Styles,function(value,style){rule.style[style]&&!Element.ShortStyles[style]&&(value=String(rule.style[style]),to[style]=/^rgb/.test(value)?value.rgbToHex():value)})}})};return Array.each(document.styleSheets,function(sheet){var href=sheet.href;if(!(href&&href.indexOf("://")>-1&&-1==href.indexOf(document.domain))){var rules=sheet.rules||sheet.cssRules;searchStyles(rules)}}),Fx.CSS.Cache[selector]=to}}),Fx.CSS.Cache={},Fx.CSS.Parsers={Color:{parse:function(value){return value.match(/^#[0-9a-f]{3,6}$/i)?value.hexToRgb(!0):(value=value.match(/(\d+),\s*(\d+),\s*(\d+)/))?[value[1],value[2],value[3]]:!1},compute:function(from,to,delta){return from.map(function(value,i){return Math.round(Fx.compute(from[i],to[i],delta))})},serve:function(value){return value.map(Number)}},Number:{parse:parseFloat,compute:Fx.compute,serve:function(value,unit){return unit?value+unit:value}},String:{parse:Function.from(!1),compute:function(zero,one){return one},serve:function(zero){return zero}}},Fx.Morph=new Class({Extends:Fx.CSS,initialize:function(element,options){this.element=this.subject=document.id(element),this.parent(options)},set:function(now){"string"==typeof now&&(now=this.search(now));for(var p in now)this.render(this.element,p,now[p],this.options.unit);return this},compute:function(from,to,delta){var now={};for(var p in from)now[p]=this.parent(from[p],to[p],delta);return now},start:function(properties){if(!this.check(properties))return this;"string"==typeof properties&&(properties=this.search(properties));var from={},to={};for(var p in properties){var parsed=this.prepare(this.element,p,properties[p]);from[p]=parsed.from,to[p]=parsed.to}return this.parent(from,to)}}),Element.Properties.morph={set:function(options){return this.get("morph").cancel().setOptions(options),this},get:function(){var morph=this.retrieve("morph");return morph||(morph=new Fx.Morph(this,{link:"cancel"}),this.store("morph",morph)),morph}},Element.implement({morph:function(props){return this.get("morph").start(props),this}}),Fx.implement({getTransition:function(){var trans=this.options.transition||Fx.Transitions.Sine.easeInOut;if("string"==typeof trans){var data=trans.split(":");trans=Fx.Transitions,trans=trans[data[0]]||trans[data[0].capitalize()],data[1]&&(trans=trans["ease"+data[1].capitalize()+(data[2]?data[2].capitalize():"")])}return trans}}),Fx.Transition=function(transition,params){params=Array.from(params);var easeIn=function(pos){return transition(pos,params)};return Object.append(easeIn,{easeIn:easeIn,easeOut:function(pos){return 1-transition(1-pos,params)},easeInOut:function(pos){return(.5>=pos?transition(2*pos,params):2-transition(2*(1-pos),params))/2}})},Fx.Transitions={linear:function(zero){return zero}},Fx.Transitions.extend=function(transitions){for(var transition in transitions)Fx.Transitions[transition]=new Fx.Transition(transitions[transition])},Fx.Transitions.extend({Pow:function(p,x){return Math.pow(p,x&&x[0]||6)},Expo:function(p){return Math.pow(2,8*(p-1))},Circ:function(p){return 1-Math.sin(Math.acos(p))},Sine:function(p){return 1-Math.cos(p*Math.PI/2)},Back:function(p,x){return x=x&&x[0]||1.618,Math.pow(p,2)*((x+1)*p-x)},Bounce:function(p){for(var value,a=0,b=1;1;a+=b,b/=2)if(p>=(7-4*a)/11){value=b*b-Math.pow((11-6*a-11*p)/4,2);break}return value},Elastic:function(p,x){return Math.pow(2,10*--p)*Math.cos(20*p*Math.PI*(x&&x[0]||1)/3)}}),["Quad","Cubic","Quart","Quint"].each(function(transition,i){Fx.Transitions[transition]=new Fx.Transition(function(p){return Math.pow(p,i+2)})}),Fx.Tween=new Class({Extends:Fx.CSS,initialize:function(element,options){this.element=this.subject=document.id(element),this.parent(options)},set:function(property,now){return 1==arguments.length&&(now=property,property=this.property||this.options.property),this.render(this.element,property,now,this.options.unit),this},start:function(property,from,to){if(!this.check(property,from,to))return this;var args=Array.flatten(arguments);this.property=this.options.property||args.shift();var parsed=this.prepare(this.element,this.property,args);return this.parent(parsed.from,parsed.to)}}),Element.Properties.tween={set:function(options){return this.get("tween").cancel().setOptions(options),this},get:function(){var tween=this.retrieve("tween");return tween||(tween=new Fx.Tween(this,{link:"cancel"}),this.store("tween",tween)),tween}},Element.implement({tween:function(property,from,to){return this.get("tween").start(property,from,to),this},fade:function(){var method,toggle,fade=this.get("tween"),args=["opacity"].append(arguments);switch(null==args[1]&&(args[1]="toggle"),args[1]){case"in":method="start",args[1]=1;break;case"out":method="start",args[1]=0;break;case"show":method="set",args[1]=1;break;case"hide":method="set",args[1]=0;break;case"toggle":var flag=this.retrieve("fade:flag",1==this.getStyle("opacity"));method="start",args[1]=flag?0:1,this.store("fade:flag",!flag),toggle=!0;break;default:method="start"}toggle||this.eliminate("fade:flag"),fade[method].apply(fade,args);var to=args[args.length-1];return"set"==method||0!=to?this.setStyle("visibility",0==to?"hidden":"visible"):fade.chain(function(){this.element.setStyle("visibility","hidden"),this.callChain()}),this},highlight:function(start,end){end||(end=this.retrieve("highlight:original",this.getStyle("background-color")),end="transparent"==end?"#fff":end);var tween=this.get("tween");return tween.start("background-color",start||"#ffff88",end).chain(function(){this.setStyle("background-color",this.retrieve("highlight:original")),tween.callChain()}.bind(this)),this}}),function(){var empty=function(){},progressSupport="onprogress"in new Browser.Request,Request=this.Request=new Class({Implements:[Chain,Events,Options],options:{url:"",data:"",headers:{"X-Requested-With":"XMLHttpRequest",Accept:"text/javascript, text/html, application/xml, text/xml, */*"},async:!0,format:!1,method:"post",link:"ignore",isSuccess:null,emulation:!0,urlEncoded:!0,encoding:"utf-8",evalScripts:!1,evalResponse:!1,timeout:0,noCache:!1},initialize:function(options){this.xhr=new Browser.Request,this.setOptions(options),this.headers=this.options.headers},onStateChange:function(){var xhr=this.xhr;4==xhr.readyState&&this.running&&(this.running=!1,this.status=0,Function.attempt(function(){var status=xhr.status;this.status=1223==status?204:status}.bind(this)),xhr.onreadystatechange=empty,progressSupport&&(xhr.onprogress=xhr.onloadstart=empty),this.timer&&(clearTimeout(this.timer),delete this.timer),this.response={text:this.xhr.responseText||"",xml:this.xhr.responseXML},this.options.isSuccess.call(this,this.status)?this.success(this.response.text,this.response.xml):this.failure())},isSuccess:function(){var status=this.status;return status>=200&&300>status},isRunning:function(){return!!this.running},processScripts:function(text){return this.options.evalResponse||/(ecma|java)script/.test(this.getHeader("Content-type"))?Browser.exec(text):text.stripScripts(this.options.evalScripts)},success:function(text,xml){this.onSuccess(this.processScripts(text),xml)},onSuccess:function(){this.fireEvent("complete",arguments).fireEvent("success",arguments).callChain()},failure:function(){this.onFailure()},onFailure:function(){this.fireEvent("complete").fireEvent("failure",this.xhr)},loadstart:function(event){this.fireEvent("loadstart",[event,this.xhr])},progress:function(event){this.fireEvent("progress",[event,this.xhr])},timeout:function(){this.fireEvent("timeout",this.xhr)},setHeader:function(name,value){return this.headers[name]=value,this},getHeader:function(name){return Function.attempt(function(){return this.xhr.getResponseHeader(name)}.bind(this))},check:function(){if(!this.running)return!0;switch(this.options.link){case"cancel":return this.cancel(),!0;case"chain":return this.chain(this.caller.pass(arguments,this)),!1}return!1},send:function(options){if(!this.check(options))return this;this.options.isSuccess=this.options.isSuccess||this.isSuccess,this.running=!0;var type=typeOf(options);("string"==type||"element"==type)&&(options={data:options});var old=this.options;options=Object.append({data:old.data,url:old.url,method:old.method},options);var data=options.data,url=String(options.url),method=options.method.toLowerCase();switch(typeOf(data)){case"element":data=document.id(data).toQueryString();break;case"object":case"hash":data=Object.toQueryString(data)}if(this.options.format){var format="format="+this.options.format;data=data?format+"&"+data:format}if(this.options.emulation&&!["get","post"].contains(method)){var _method="_method="+method;data=data?_method+"&"+data:_method,method="post"}if(this.options.urlEncoded&&["post","put"].contains(method)){var encoding=this.options.encoding?"; charset="+this.options.encoding:"";this.headers["Content-type"]="application/x-www-form-urlencoded"+encoding}url||(url=document.location.pathname);var trimPosition=url.lastIndexOf("/");trimPosition>-1&&(trimPosition=url.indexOf("#"))>-1&&(url=url.substr(0,trimPosition)),this.options.noCache&&(url+=(url.indexOf("?")>-1?"&":"?")+String.uniqueID()),!data||"get"!=method&&"delete"!=method||(url+=(url.indexOf("?")>-1?"&":"?")+data,data=null);var xhr=this.xhr;return progressSupport&&(xhr.onloadstart=this.loadstart.bind(this),xhr.onprogress=this.progress.bind(this)),xhr.open(method.toUpperCase(),url,this.options.async,this.options.user,this.options.password),this.options.withCredentials&&"withCredentials"in xhr&&(xhr.withCredentials=!0),xhr.onreadystatechange=this.onStateChange.bind(this),Object.each(this.headers,function(value,key){try{xhr.setRequestHeader(key,value)}catch(e){this.fireEvent("exception",[key,value])}},this),this.fireEvent("request"),xhr.send(data),this.options.async?this.options.timeout&&(this.timer=this.timeout.delay(this.options.timeout,this)):this.onStateChange(),this},cancel:function(){if(!this.running)return this;this.running=!1;var xhr=this.xhr;return xhr.abort(),this.timer&&(clearTimeout(this.timer),delete this.timer),xhr.onreadystatechange=empty,progressSupport&&(xhr.onprogress=xhr.onloadstart=empty),this.xhr=new Browser.Request,this.fireEvent("cancel"),this}}),methods={};["get","post","put","delete","patch","head","GET","POST","PUT","DELETE","PATCH","HEAD"].each(function(method){methods[method]=function(data){var object={method:method};return null!=data&&(object.data=data),this.send(object)}}),Request.implement(methods),Element.Properties.send={set:function(options){var send=this.get("send").cancel();return send.setOptions(options),this},get:function(){var send=this.retrieve("send");return send||(send=new Request({data:this,link:"cancel",method:this.get("method")||"post",url:this.get("action")}),this.store("send",send)),send}},Element.implement({send:function(url){var sender=this.get("send");return sender.send({data:this,url:url||sender.options.url}),this}})}(),Request.HTML=new Class({Extends:Request,options:{update:!1,append:!1,evalScripts:!0,filter:!1,headers:{Accept:"text/html, application/xml, text/xml, */*"}},success:function(text){var options=this.options,response=this.response;response.html=text.stripScripts(function(script){response.javascript=script});var match=response.html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);match&&(response.html=match[1]);var temp=new Element("div").set("html",response.html);if(response.tree=temp.childNodes,response.elements=temp.getElements(options.filter||"*"),options.filter&&(response.tree=response.elements),options.update){var update=document.id(options.update).empty();options.filter?update.adopt(response.elements):update.set("html",response.html)}else if(options.append){var append=document.id(options.append);options.filter?response.elements.reverse().inject(append):append.adopt(temp.getChildren())}options.evalScripts&&Browser.exec(response.javascript),this.onSuccess(response.tree,response.elements,response.html,response.javascript)}}),Element.Properties.load={set:function(options){var load=this.get("load").cancel();return load.setOptions(options),this},get:function(){var load=this.retrieve("load");return load||(load=new Request.HTML({data:this,link:"cancel",update:this,method:"get"}),this.store("load",load)),load}},Element.implement({load:function(){return this.get("load").send(Array.link(arguments,{data:Type.isObject,url:Type.isString})),this}}),"undefined"==typeof JSON&&(this.JSON={}),function(){var special={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},escape=function(chr){return special[chr]||"\\u"+("0000"+chr.charCodeAt(0).toString(16)).slice(-4)};JSON.validate=function(string){return string=string.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""),/^[\],:{}\s]*$/.test(string)},JSON.encode=JSON.stringify?function(obj){return JSON.stringify(obj)}:function(obj){switch(obj&&obj.toJSON&&(obj=obj.toJSON()),typeOf(obj)){case"string":return'"'+obj.replace(/[\x00-\x1f\\"]/g,escape)+'"';case"array":return"["+obj.map(JSON.encode).clean()+"]";case"object":case"hash":var string=[];return Object.each(obj,function(value,key){var json=JSON.encode(value);json&&string.push(JSON.encode(key)+":"+json)}),"{"+string+"}";case"number":case"boolean":return""+obj;case"null":return"null"}return null},JSON.secure=!0,JSON.decode=function(string,secure){if(!string||"string"!=typeOf(string))return null;if(null==secure&&(secure=JSON.secure),secure){if(JSON.parse)return JSON.parse(string);if(!JSON.validate(string))throw new Error("JSON could not decode the input; security is enabled and the value is not secure.")}return eval("("+string+")")}}(),Request.JSON=new Class({Extends:Request,options:{secure:!0},initialize:function(options){this.parent(options),Object.append(this.headers,{Accept:"application/json","X-Request":"JSON"})},success:function(text){var json;try{json=this.response.json=JSON.decode(text,this.options.secure)}catch(error){return void this.fireEvent("error",[text,error])}null==json?this.onFailure():this.onSuccess(json,text)}});var Cookie=new Class({Implements:Options,options:{path:"/",domain:!1,duration:!1,secure:!1,document:document,encode:!0},initialize:function(key,options){this.key=key,this.setOptions(options)},write:function(value){if(this.options.encode&&(value=encodeURIComponent(value)),this.options.domain&&(value+="; domain="+this.options.domain),this.options.path&&(value+="; path="+this.options.path),this.options.duration){var date=new Date;date.setTime(date.getTime()+24*this.options.duration*60*60*1e3),value+="; expires="+date.toGMTString()}return this.options.secure&&(value+="; secure"),this.options.document.cookie=this.key+"="+value,this},read:function(){var value=this.options.document.cookie.match("(?:^|;)\\s*"+this.key.escapeRegExp()+"=([^;]*)");return value?decodeURIComponent(value[1]):null},dispose:function(){return new Cookie(this.key,Object.merge({},this.options,{duration:-1})).write(""),this}});Cookie.write=function(key,value,options){return new Cookie(key,options).write(value)},Cookie.read=function(key){return new Cookie(key).read()},Cookie.dispose=function(key,options){return new Cookie(key,options).dispose()},function(window,document){var ready,loaded,shouldPoll,timer,checks=[],testElement=document.createElement("div"),domready=function(){clearTimeout(timer),ready||(Browser.loaded=ready=!0,document.removeListener("DOMContentLoaded",domready).removeListener("readystatechange",check),document.fireEvent("domready"),window.fireEvent("domready")),document=window=testElement=null},check=function(){for(var i=checks.length;i--;)if(checks[i]())return domready(),!0;return!1},poll=function(){clearTimeout(timer),check()||(timer=setTimeout(poll,10))};document.addListener("DOMContentLoaded",domready);var doScrollWorks=function(){try{return testElement.doScroll(),!0}catch(e){}return!1};testElement.doScroll&&!doScrollWorks()&&(checks.push(doScrollWorks),shouldPoll=!0),document.readyState&&checks.push(function(){var state=document.readyState;return"loaded"==state||"complete"==state}),"onreadystatechange"in document?document.addListener("readystatechange",check):shouldPoll=!0,shouldPoll&&poll(),Element.Events.domready={onAdd:function(fn){ready&&fn.call(this)}},Element.Events.load={base:"load",onAdd:function(fn){loaded&&this==window&&fn.call(this)},condition:function(){return this==window&&(domready(),delete Element.Events.load),!0}},window.addEvent("load",function(){loaded=!0})}(window,document);
/*
---

name: Core

description: The heart of MooTools.

license: MIT-style license.

copyright: Copyright (c) 2006-2014 [Valerio Proietti](http://mad4milk.net/).

authors: The MooTools production team (http://mootools.net/developers/)

inspiration:
  - Class implementation inspired by [Base.js](http://dean.edwards.name/weblog/2006/03/base/) Copyright (c) 2006 Dean Edwards, [GNU Lesser General Public License](http://opensource.org/licenses/lgpl-license.php)
  - Some functionality inspired by [Prototype.js](http://prototypejs.org) Copyright (c) 2005-2007 Sam Stephenson, [MIT License](http://opensource.org/licenses/mit-license.php)

provides: [Core, MooTools, Type, typeOf, instanceOf, Native]

...
*/
/*! MooTools: the javascript framework. license: MIT-style license. copyright: Copyright (c) 2006-2014 [Valerio Proietti](http://mad4milk.net/).*/
(function(){

this.MooTools = {
	version: '1.5.2-dev',
	build: '%build%'
};

// typeOf, instanceOf

var typeOf = this.typeOf = function(item){
	if (item == null) return 'null';
	if (item.$family != null) return item.$family();

	if (item.nodeName){
		if (item.nodeType == 1) return 'element';
		if (item.nodeType == 3) return (/\S/).test(item.nodeValue) ? 'textnode' : 'whitespace';
	} else if (typeof item.length == 'number'){
		if ('callee' in item) return 'arguments';
		if ('item' in item) return 'collection';
	}

	return typeof item;
};

var instanceOf = this.instanceOf = function(item, object){
	if (item == null) return false;
	var constructor = item.$constructor || item.constructor;
	while (constructor){
		if (constructor === object) return true;
		constructor = constructor.parent;
	}
	/*<ltIE8>*/
	if (!item.hasOwnProperty) return false;
	/*</ltIE8>*/
	return item instanceof object;
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

/*<ltIE8>*/
var enumerables = true;
for (var i in {toString: 1}) enumerables = null;
if (enumerables) enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];
function forEachObjectEnumberableKey(object, fn, bind) {
	if (enumerables) for (var i = enumerables.length; i--;){
		var k = enumerables[i];
		// signature has key-value, so overloadSetter can directly pass the
		// method function, without swapping arguments.
		if (hasOwnProperty.call(object, k)) fn.call(bind, k, object[k]);
	}
}
/*</ltIE8>*/

// Function overloading

var Function = this.Function;

Function.prototype.overloadSetter = function(usePlural){
	var self = this;
	return function(a, b){
		if (a == null) return this;
		if (usePlural || typeof a != 'string'){
			for (var k in a) self.call(this, k, a[k]);
			/*<ltIE8>*/
			forEachObjectEnumberableKey(a, self, this);
			/*</ltIE8>*/
		} else {
			self.call(this, a, b);
		}
		return this;
	};
};

Function.prototype.overloadGetter = function(usePlural){
	var self = this;
	return function(a){
		var args, result;
		if (typeof a != 'string') args = a;
		else if (arguments.length > 1) args = arguments;
		else if (usePlural) args = [a];
		if (args){
			result = {};
			for (var i = 0; i < args.length; i++) result[args[i]] = self.call(this, args[i]);
		} else {
			result = self.call(this, a);
		}
		return result;
	};
};

Function.prototype.extend = function(key, value){
	this[key] = value;
}.overloadSetter();

Function.prototype.implement = function(key, value){
	this.prototype[key] = value;
}.overloadSetter();

// From

var slice = Array.prototype.slice;

Function.from = function(item){
	return (typeOf(item) == 'function') ? item : function(){
		return item;
	};
};

Array.from = function(item){
	if (item == null) return [];
	return (Type.isEnumerable(item) && typeof item != 'string') ? (typeOf(item) == 'array') ? item : slice.call(item) : [item];
};

Number.from = function(item){
	var number = parseFloat(item);
	return isFinite(number) ? number : null;
};

String.from = function(item){
	return item + '';
};

// hide, protect

Function.implement({

	hide: function(){
		this.$hidden = true;
		return this;
	},

	protect: function(){
		this.$protected = true;
		return this;
	}

});

// Type

var Type = this.Type = function(name, object){
	if (name){
		var lower = name.toLowerCase();
		var typeCheck = function(item){
			return (typeOf(item) == lower);
		};

		Type['is' + name] = typeCheck;
		if (object != null){
			object.prototype.$family = (function(){
				return lower;
			}).hide();
			
		}
	}

	if (object == null) return null;

	object.extend(this);
	object.$constructor = Type;
	object.prototype.$constructor = object;

	return object;
};

var toString = Object.prototype.toString;

Type.isEnumerable = function(item){
	return (item != null && typeof item.length == 'number' && toString.call(item) != '[object Function]' );
};

var hooks = {};

var hooksOf = function(object){
	var type = typeOf(object.prototype);
	return hooks[type] || (hooks[type] = []);
};

var implement = function(name, method){
	if (method && method.$hidden) return;

	var hooks = hooksOf(this);

	for (var i = 0; i < hooks.length; i++){
		var hook = hooks[i];
		if (typeOf(hook) == 'type') implement.call(hook, name, method);
		else hook.call(this, name, method);
	}

	var previous = this.prototype[name];
	if (previous == null || !previous.$protected) this.prototype[name] = method;

	if (this[name] == null && typeOf(method) == 'function') extend.call(this, name, function(item){
		return method.apply(item, slice.call(arguments, 1));
	});
};

var extend = function(name, method){
	if (method && method.$hidden) return;
	var previous = this[name];
	if (previous == null || !previous.$protected) this[name] = method;
};

Type.implement({

	implement: implement.overloadSetter(),

	extend: extend.overloadSetter(),

	alias: function(name, existing){
		implement.call(this, name, this.prototype[existing]);
	}.overloadSetter(),

	mirror: function(hook){
		hooksOf(this).push(hook);
		return this;
	}

});

new Type('Type', Type);

// Default Types

var force = function(name, object, methods){
	var isType = (object != Object),
		prototype = object.prototype;

	if (isType) object = new Type(name, object);

	for (var i = 0, l = methods.length; i < l; i++){
		var key = methods[i],
			generic = object[key],
			proto = prototype[key];

		if (generic) generic.protect();
		if (isType && proto) object.implement(key, proto.protect());
	}

	if (isType){
		var methodsEnumerable = prototype.propertyIsEnumerable(methods[0]);
		object.forEachMethod = function(fn){
			if (!methodsEnumerable) for (var i = 0, l = methods.length; i < l; i++){
				fn.call(prototype, prototype[methods[i]], methods[i]);
			}
			for (var key in prototype) fn.call(prototype, prototype[key], key);
		};
	}

	return force;
};

force('String', String, [
	'charAt', 'charCodeAt', 'concat', 'contains', 'indexOf', 'lastIndexOf', 'match', 'quote', 'replace', 'search',
	'slice', 'split', 'substr', 'substring', 'trim', 'toLowerCase', 'toUpperCase'
])('Array', Array, [
	'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'concat', 'join', 'slice',
	'indexOf', 'lastIndexOf', 'filter', 'forEach', 'every', 'map', 'some', 'reduce', 'reduceRight', 'contains'
])('Number', Number, [
	'toExponential', 'toFixed', 'toLocaleString', 'toPrecision'
])('Function', Function, [
	'apply', 'call', 'bind'
])('RegExp', RegExp, [
	'exec', 'test'
])('Object', Object, [
	'create', 'defineProperty', 'defineProperties', 'keys',
	'getPrototypeOf', 'getOwnPropertyDescriptor', 'getOwnPropertyNames',
	'preventExtensions', 'isExtensible', 'seal', 'isSealed', 'freeze', 'isFrozen'
])('Date', Date, ['now']);

Object.extend = extend.overloadSetter();

Date.extend('now', function(){
	return +(new Date);
});

new Type('Boolean', Boolean);

// fixes NaN returning as Number

Number.prototype.$family = function(){
	return isFinite(this) ? 'number' : 'null';
}.hide();

// Number.random

Number.extend('random', function(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
});

// forEach, each, keys

Array.implement({

	/*<!ES5>*/
	forEach: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++){
			if (i in this) fn.call(bind, this[i], i, this);
		}
	},
	/*</!ES5>*/

	each: function(fn, bind){
		Array.forEach(this, fn, bind);
		return this;
	}

});

Object.extend({

	keys: function(object){
		var keys = [];
		for (var k in object){
			if (hasOwnProperty.call(object, k)) keys.push(k);
		}
		/*<ltIE8>*/
		forEachObjectEnumberableKey(object, function(k){
			keys.push(k);
		});
		/*</ltIE8>*/
		return keys;
	},

	forEach: function(object, fn, bind){
		Object.keys(object).forEach(function(key){
			fn.call(bind, object[key], key, object);
		});
	}

});

Object.each = Object.forEach;


// Array & Object cloning, Object merging and appending

var cloneOf = function(item){
	switch (typeOf(item)){
		case 'array': return item.clone();
		case 'object': return Object.clone(item);
		default: return item;
	}
};

Array.implement('clone', function(){
	var i = this.length, clone = new Array(i);
	while (i--) clone[i] = cloneOf(this[i]);
	return clone;
});

var mergeOne = function(source, key, current){
	switch (typeOf(current)){
		case 'object':
			if (typeOf(source[key]) == 'object') Object.merge(source[key], current);
			else source[key] = Object.clone(current);
		break;
		case 'array': source[key] = current.clone(); break;
		default: source[key] = current;
	}
	return source;
};

Object.extend({

	merge: function(source, k, v){
		if (typeOf(k) == 'string') return mergeOne(source, k, v);
		for (var i = 1, l = arguments.length; i < l; i++){
			var object = arguments[i];
			for (var key in object) mergeOne(source, key, object[key]);
		}
		return source;
	},

	clone: function(object){
		var clone = {};
		for (var key in object) clone[key] = cloneOf(object[key]);
		return clone;
	},

	append: function(original){
		for (var i = 1, l = arguments.length; i < l; i++){
			var extended = arguments[i] || {};
			for (var key in extended) original[key] = extended[key];
		}
		return original;
	}

});

// Object-less types

['Object', 'WhiteSpace', 'TextNode', 'Collection', 'Arguments'].each(function(name){
	new Type(name);
});

// Unique ID

var UID = Date.now();

String.extend('uniqueID', function(){
	return (UID++).toString(36);
});



})();

/*
---

name: Array

description: Contains Array Prototypes like each, contains, and erase.

license: MIT-style license.

requires: [Type]

provides: Array

...
*/

Array.implement({

	/*<!ES5>*/
	every: function(fn, bind){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && !fn.call(bind, this[i], i, this)) return false;
		}
		return true;
	},

	filter: function(fn, bind){
		var results = [];
		for (var value, i = 0, l = this.length >>> 0; i < l; i++) if (i in this){
			value = this[i];
			if (fn.call(bind, value, i, this)) results.push(value);
		}
		return results;
	},

	indexOf: function(item, from){
		var length = this.length >>> 0;
		for (var i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++){
			if (this[i] === item) return i;
		}
		return -1;
	},

	map: function(fn, bind){
		var length = this.length >>> 0, results = Array(length);
		for (var i = 0; i < length; i++){
			if (i in this) results[i] = fn.call(bind, this[i], i, this);
		}
		return results;
	},

	some: function(fn, bind){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && fn.call(bind, this[i], i, this)) return true;
		}
		return false;
	},
	/*</!ES5>*/

	clean: function(){
		return this.filter(function(item){
			return item != null;
		});
	},

	invoke: function(methodName){
		var args = Array.slice(arguments, 1);
		return this.map(function(item){
			return item[methodName].apply(item, args);
		});
	},

	associate: function(keys){
		var obj = {}, length = Math.min(this.length, keys.length);
		for (var i = 0; i < length; i++) obj[keys[i]] = this[i];
		return obj;
	},

	link: function(object){
		var result = {};
		for (var i = 0, l = this.length; i < l; i++){
			for (var key in object){
				if (object[key](this[i])){
					result[key] = this[i];
					delete object[key];
					break;
				}
			}
		}
		return result;
	},

	contains: function(item, from){
		return this.indexOf(item, from) != -1;
	},

	append: function(array){
		this.push.apply(this, array);
		return this;
	},

	getLast: function(){
		return (this.length) ? this[this.length - 1] : null;
	},

	getRandom: function(){
		return (this.length) ? this[Number.random(0, this.length - 1)] : null;
	},

	include: function(item){
		if (!this.contains(item)) this.push(item);
		return this;
	},

	combine: function(array){
		for (var i = 0, l = array.length; i < l; i++) this.include(array[i]);
		return this;
	},

	erase: function(item){
		for (var i = this.length; i--;){
			if (this[i] === item) this.splice(i, 1);
		}
		return this;
	},

	empty: function(){
		this.length = 0;
		return this;
	},

	flatten: function(){
		var array = [];
		for (var i = 0, l = this.length; i < l; i++){
			var type = typeOf(this[i]);
			if (type == 'null') continue;
			array = array.concat((type == 'array' || type == 'collection' || type == 'arguments' || instanceOf(this[i], Array)) ? Array.flatten(this[i]) : this[i]);
		}
		return array;
	},

	pick: function(){
		for (var i = 0, l = this.length; i < l; i++){
			if (this[i] != null) return this[i];
		}
		return null;
	},

	hexToRgb: function(array){
		if (this.length != 3) return null;
		var rgb = this.map(function(value){
			if (value.length == 1) value += value;
			return parseInt(value, 16);
		});
		return (array) ? rgb : 'rgb(' + rgb + ')';
	},

	rgbToHex: function(array){
		if (this.length < 3) return null;
		if (this.length == 4 && this[3] == 0 && !array) return 'transparent';
		var hex = [];
		for (var i = 0; i < 3; i++){
			var bit = (this[i] - 0).toString(16);
			hex.push((bit.length == 1) ? '0' + bit : bit);
		}
		return (array) ? hex : '#' + hex.join('');
	}

});



/*
---

name: Function

description: Contains Function Prototypes like create, bind, pass, and delay.

license: MIT-style license.

requires: Type

provides: Function

...
*/

Function.extend({

	attempt: function(){
		for (var i = 0, l = arguments.length; i < l; i++){
			try {
				return arguments[i]();
			} catch (e){}
		}
		return null;
	}

});

Function.implement({

	attempt: function(args, bind){
		try {
			return this.apply(bind, Array.from(args));
		} catch (e){}

		return null;
	},

	/*<!ES5-bind>*/
	bind: function(that){
		var self = this,
			args = arguments.length > 1 ? Array.slice(arguments, 1) : null,
			F = function(){};

		var bound = function(){
			var context = that, length = arguments.length;
			if (this instanceof bound){
				F.prototype = self.prototype;
				context = new F;
			}
			var result = (!args && !length)
				? self.call(context)
				: self.apply(context, args && length ? args.concat(Array.slice(arguments)) : args || arguments);
			return context == that ? result : context;
		};
		return bound;
	},
	/*</!ES5-bind>*/

	pass: function(args, bind){
		var self = this;
		if (args != null) args = Array.from(args);
		return function(){
			return self.apply(bind, args || arguments);
		};
	},

	delay: function(delay, bind, args){
		return setTimeout(this.pass((args == null ? [] : args), bind), delay);
	},

	periodical: function(periodical, bind, args){
		return setInterval(this.pass((args == null ? [] : args), bind), periodical);
	}

});



/*
---

name: Number

description: Contains Number Prototypes like limit, round, times, and ceil.

license: MIT-style license.

requires: Type

provides: Number

...
*/

Number.implement({

	limit: function(min, max){
		return Math.min(max, Math.max(min, this));
	},

	round: function(precision){
		precision = Math.pow(10, precision || 0).toFixed(precision < 0 ? -precision : 0);
		return Math.round(this * precision) / precision;
	},

	times: function(fn, bind){
		for (var i = 0; i < this; i++) fn.call(bind, i, this);
	},

	toFloat: function(){
		return parseFloat(this);
	},

	toInt: function(base){
		return parseInt(this, base || 10);
	}

});

Number.alias('each', 'times');

(function(math){
	var methods = {};
	math.each(function(name){
		if (!Number[name]) methods[name] = function(){
			return Math[name].apply(null, [this].concat(Array.from(arguments)));
		};
	});
	Number.implement(methods);
})(['abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor', 'log', 'max', 'min', 'pow', 'sin', 'sqrt', 'tan']);

/*
---

name: String

description: Contains String Prototypes like camelCase, capitalize, test, and toInt.

license: MIT-style license.

requires: [Type, Array]

provides: String

...
*/

String.implement({

	//<!ES6>
	contains: function(string, index){
		return (index ? String(this).slice(index) : String(this)).indexOf(string) > -1;
	},
	//</!ES6>

	test: function(regex, params){
		return ((typeOf(regex) == 'regexp') ? regex : new RegExp('' + regex, params)).test(this);
	},

	trim: function(){
		return String(this).replace(/^\s+|\s+$/g, '');
	},

	clean: function(){
		return String(this).replace(/\s+/g, ' ').trim();
	},

	camelCase: function(){
		return String(this).replace(/-\D/g, function(match){
			return match.charAt(1).toUpperCase();
		});
	},

	hyphenate: function(){
		return String(this).replace(/[A-Z]/g, function(match){
			return ('-' + match.charAt(0).toLowerCase());
		});
	},

	capitalize: function(){
		return String(this).replace(/\b[a-z]/g, function(match){
			return match.toUpperCase();
		});
	},

	escapeRegExp: function(){
		return String(this).replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
	},

	toInt: function(base){
		return parseInt(this, base || 10);
	},

	toFloat: function(){
		return parseFloat(this);
	},

	hexToRgb: function(array){
		var hex = String(this).match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
		return (hex) ? hex.slice(1).hexToRgb(array) : null;
	},

	rgbToHex: function(array){
		var rgb = String(this).match(/\d{1,3}/g);
		return (rgb) ? rgb.rgbToHex(array) : null;
	},

	substitute: function(object, regexp){
		return String(this).replace(regexp || (/\\?\{([^{}]+)\}/g), function(match, name){
			if (match.charAt(0) == '\\') return match.slice(1);
			return (object[name] != null) ? object[name] : '';
		});
	}

});



/*
---

name: Browser

description: The Browser Object. Contains Browser initialization, Window and Document, and the Browser Hash.

license: MIT-style license.

requires: [Array, Function, Number, String]

provides: [Browser, Window, Document]

...
*/

(function(){

var document = this.document;
var window = document.window = this;

var parse = function(ua, platform){
	ua = ua.toLowerCase();
	platform = (platform ? platform.toLowerCase() : '');

	var UA = ua.match(/(opera|ie|firefox|chrome|trident|crios|version)[\s\/:]([\w\d\.]+)?.*?(safari|(?:rv[\s\/:]|version[\s\/:])([\w\d\.]+)|$)/) || [null, 'unknown', 0];

	if (UA[1] == 'trident'){
		UA[1] = 'ie';
		if (UA[4]) UA[2] = UA[4];
	} else if (UA[1] == 'crios'){
		UA[1] = 'chrome';
	}

	platform = ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0];
	if (platform == 'win') platform = 'windows';

	return {
		extend: Function.prototype.extend,
		name: (UA[1] == 'version') ? UA[3] : UA[1],
		version: parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]),
		platform: platform
	};
};

var Browser = this.Browser = parse(navigator.userAgent, navigator.platform);

if (Browser.name == 'ie' && document.documentMode){
	Browser.version = document.documentMode;
}

Browser.extend({
	Features: {
		xpath: !!(document.evaluate),
		air: !!(window.runtime),
		query: !!(document.querySelector),
		json: !!(window.JSON)
	},
	parseUA: parse
});



// Request

Browser.Request = (function(){

	var XMLHTTP = function(){
		return new XMLHttpRequest();
	};

	var MSXML2 = function(){
		return new ActiveXObject('MSXML2.XMLHTTP');
	};

	var MSXML = function(){
		return new ActiveXObject('Microsoft.XMLHTTP');
	};

	return Function.attempt(function(){
		XMLHTTP();
		return XMLHTTP;
	}, function(){
		MSXML2();
		return MSXML2;
	}, function(){
		MSXML();
		return MSXML;
	});

})();

Browser.Features.xhr = !!(Browser.Request);



// String scripts

Browser.exec = function(text){
	if (!text) return text;
	if (window.execScript){
		window.execScript(text);
	} else {
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.text = text;
		document.head.appendChild(script);
		document.head.removeChild(script);
	}
	return text;
};

String.implement('stripScripts', function(exec){
	var scripts = '';
	var text = this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(all, code){
		scripts += code + '\n';
		return '';
	});
	if (exec === true) Browser.exec(scripts);
	else if (typeOf(exec) == 'function') exec(scripts, text);
	return text;
});

// Window, Document

Browser.extend({
	Document: this.Document,
	Window: this.Window,
	Element: this.Element,
	Event: this.Event
});

this.Window = this.$constructor = new Type('Window', function(){});

this.$family = Function.from('window').hide();

Window.mirror(function(name, method){
	window[name] = method;
});

this.Document = document.$constructor = new Type('Document', function(){});

document.$family = Function.from('document').hide();

Document.mirror(function(name, method){
	document[name] = method;
});

document.html = document.documentElement;
if (!document.head) document.head = document.getElementsByTagName('head')[0];

if (document.execCommand) try {
	document.execCommand("BackgroundImageCache", false, true);
} catch (e){}

/*<ltIE9>*/
if (this.attachEvent && !this.addEventListener){
	var unloadEvent = function(){
		this.detachEvent('onunload', unloadEvent);
		document.head = document.html = document.window = null;
		window = this.Window = document = null;
	};
	this.attachEvent('onunload', unloadEvent);
}

// IE fails on collections and <select>.options (refers to <select>)
var arrayFrom = Array.from;
try {
	arrayFrom(document.html.childNodes);
} catch(e){
	Array.from = function(item){
		if (typeof item != 'string' && Type.isEnumerable(item) && typeOf(item) != 'array'){
			var i = item.length, array = new Array(i);
			while (i--) array[i] = item[i];
			return array;
		}
		return arrayFrom(item);
	};

	var prototype = Array.prototype,
		slice = prototype.slice;
	['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'concat', 'join', 'slice'].each(function(name){
		var method = prototype[name];
		Array[name] = function(item){
			return method.apply(Array.from(item), slice.call(arguments, 1));
		};
	});
}
/*</ltIE9>*/



})();

/*
---

name: Class

description: Contains the Class Function for easily creating, extending, and implementing reusable Classes.

license: MIT-style license.

requires: [Array, String, Function, Number]

provides: Class

...
*/

(function(){

var Class = this.Class = new Type('Class', function(params){
	if (instanceOf(params, Function)) params = {initialize: params};

	var newClass = function(){
		reset(this);
		if (newClass.$prototyping) return this;
		this.$caller = null;
		this.$family = null;
		var value = (this.initialize) ? this.initialize.apply(this, arguments) : this;
		this.$caller = this.caller = null;
		return value;
	}.extend(this).implement(params);

	newClass.$constructor = Class;
	newClass.prototype.$constructor = newClass;
	newClass.prototype.parent = parent;

	return newClass;
});

var parent = function(){
	if (!this.$caller) throw new Error('The method "parent" cannot be called.');
	var name = this.$caller.$name,
		parent = this.$caller.$owner.parent,
		previous = (parent) ? parent.prototype[name] : null;
	if (!previous) throw new Error('The method "' + name + '" has no parent.');
	return previous.apply(this, arguments);
};

var reset = function(object){
	for (var key in object){
		var value = object[key];
		switch (typeOf(value)){
			case 'object':
				var F = function(){};
				F.prototype = value;
				object[key] = reset(new F);
			break;
			case 'array': object[key] = value.clone(); break;
		}
	}
	return object;
};

var wrap = function(self, key, method){
	if (method.$origin) method = method.$origin;
	var wrapper = function(){
		if (method.$protected && this.$caller == null) throw new Error('The method "' + key + '" cannot be called.');
		var caller = this.caller, current = this.$caller;
		this.caller = current; this.$caller = wrapper;
		var result = method.apply(this, arguments);
		this.$caller = current; this.caller = caller;
		return result;
	}.extend({$owner: self, $origin: method, $name: key});
	return wrapper;
};

var implement = function(key, value, retain){
	if (Class.Mutators.hasOwnProperty(key)){
		value = Class.Mutators[key].call(this, value);
		if (value == null) return this;
	}

	if (typeOf(value) == 'function'){
		if (value.$hidden) return this;
		this.prototype[key] = (retain) ? value : wrap(this, key, value);
	} else {
		Object.merge(this.prototype, key, value);
	}

	return this;
};

var getInstance = function(klass){
	klass.$prototyping = true;
	var proto = new klass;
	delete klass.$prototyping;
	return proto;
};

Class.implement('implement', implement.overloadSetter());

Class.Mutators = {

	Extends: function(parent){
		this.parent = parent;
		this.prototype = getInstance(parent);
	},

	Implements: function(items){
		Array.from(items).each(function(item){
			var instance = new item;
			for (var key in instance) implement.call(this, key, instance[key], true);
		}, this);
	}
};

})();

/*
---

name: Class.Extras

description: Contains Utility Classes that can be implemented into your own Classes to ease the execution of many common tasks.

license: MIT-style license.

requires: Class

provides: [Class.Extras, Chain, Events, Options]

...
*/

(function(){

this.Chain = new Class({

	$chain: [],

	chain: function(){
		this.$chain.append(Array.flatten(arguments));
		return this;
	},

	callChain: function(){
		return (this.$chain.length) ? this.$chain.shift().apply(this, arguments) : false;
	},

	clearChain: function(){
		this.$chain.empty();
		return this;
	}

});

var removeOn = function(string){
	return string.replace(/^on([A-Z])/, function(full, first){
		return first.toLowerCase();
	});
};

this.Events = new Class({

	$events: {},

	addEvent: function(type, fn, internal){
		type = removeOn(type);

		

		this.$events[type] = (this.$events[type] || []).include(fn);
		if (internal) fn.internal = true;
		return this;
	},

	addEvents: function(events){
		for (var type in events) this.addEvent(type, events[type]);
		return this;
	},

	fireEvent: function(type, args, delay){
		type = removeOn(type);
		var events = this.$events[type];
		if (!events) return this;
		args = Array.from(args);
		events.each(function(fn){
			if (delay) fn.delay(delay, this, args);
			else fn.apply(this, args);
		}, this);
		return this;
	},

	removeEvent: function(type, fn){
		type = removeOn(type);
		var events = this.$events[type];
		if (events && !fn.internal){
			var index = events.indexOf(fn);
			if (index != -1) delete events[index];
		}
		return this;
	},

	removeEvents: function(events){
		var type;
		if (typeOf(events) == 'object'){
			for (type in events) this.removeEvent(type, events[type]);
			return this;
		}
		if (events) events = removeOn(events);
		for (type in this.$events){
			if (events && events != type) continue;
			var fns = this.$events[type];
			for (var i = fns.length; i--;) if (i in fns){
				this.removeEvent(type, fns[i]);
			}
		}
		return this;
	}

});

this.Options = new Class({

	setOptions: function(){
		var options = this.options = Object.merge.apply(null, [{}, this.options].append(arguments));
		if (this.addEvent) for (var option in options){
			if (typeOf(options[option]) != 'function' || !(/^on[A-Z]/).test(option)) continue;
			this.addEvent(option, options[option]);
			delete options[option];
		}
		return this;
	}

});

})();

/*
---

name: Object

description: Object generic methods

license: MIT-style license.

requires: Type

provides: [Object, Hash]

...
*/

(function(){

var hasOwnProperty = Object.prototype.hasOwnProperty;

Object.extend({

	subset: function(object, keys){
		var results = {};
		for (var i = 0, l = keys.length; i < l; i++){
			var k = keys[i];
			if (k in object) results[k] = object[k];
		}
		return results;
	},

	map: function(object, fn, bind){
		var results = {};
		var keys = Object.keys(object);
		for (var i = 0; i < keys.length; i++){
			var key = keys[i];
			results[key] = fn.call(bind, object[key], key, object);
		}
		return results;
	},

	filter: function(object, fn, bind){
		var results = {};
		var keys = Object.keys(object);
		for (var i = 0; i < keys.length; i++){
			var key = keys[i], value = object[key];
			if (fn.call(bind, value, key, object)) results[key] = value;
		}
		return results;
	},

	every: function(object, fn, bind){
		var keys = Object.keys(object);
		for (var i = 0; i < keys.length; i++){
			var key = keys[i];
			if (!fn.call(bind, object[key], key)) return false;
		}
		return true;
	},

	some: function(object, fn, bind){
		var keys = Object.keys(object);
		for (var i = 0; i < keys.length; i++){
			var key = keys[i];
			if (fn.call(bind, object[key], key)) return true;
		}
		return false;
	},

	values: function(object){
		var values = [];
		var keys = Object.keys(object);
		for (var i = 0; i < keys.length; i++){
			var k = keys[i];
			values.push(object[k]);
		}
		return values;
	},

	getLength: function(object){
		return Object.keys(object).length;
	},

	keyOf: function(object, value){
		var keys = Object.keys(object);
		for (var i = 0; i < keys.length; i++){
			var key = keys[i];
			if (object[key] === value) return key;
		}
		return null;
	},

	contains: function(object, value){
		return Object.keyOf(object, value) != null;
	},

	toQueryString: function(object, base){
		var queryString = [];

		Object.each(object, function(value, key){
			if (base) key = base + '[' + key + ']';
			var result;
			switch (typeOf(value)){
				case 'object': result = Object.toQueryString(value, key); break;
				case 'array':
					var qs = {};
					value.each(function(val, i){
						qs[i] = val;
					});
					result = Object.toQueryString(qs, key);
				break;
				default: result = key + '=' + encodeURIComponent(value);
			}
			if (value != null) queryString.push(result);
		});

		return queryString.join('&');
	}

});

})();



/*
---
name: Slick.Parser
description: Standalone CSS3 Selector parser
provides: Slick.Parser
...
*/

;(function(){

var parsed,
	separatorIndex,
	combinatorIndex,
	reversed,
	cache = {},
	reverseCache = {},
	reUnescape = /\\/g;

var parse = function(expression, isReversed){
	if (expression == null) return null;
	if (expression.Slick === true) return expression;
	expression = ('' + expression).replace(/^\s+|\s+$/g, '');
	reversed = !!isReversed;
	var currentCache = (reversed) ? reverseCache : cache;
	if (currentCache[expression]) return currentCache[expression];
	parsed = {
		Slick: true,
		expressions: [],
		raw: expression,
		reverse: function(){
			return parse(this.raw, true);
		}
	};
	separatorIndex = -1;
	while (expression != (expression = expression.replace(regexp, parser)));
	parsed.length = parsed.expressions.length;
	return currentCache[parsed.raw] = (reversed) ? reverse(parsed) : parsed;
};

var reverseCombinator = function(combinator){
	if (combinator === '!') return ' ';
	else if (combinator === ' ') return '!';
	else if ((/^!/).test(combinator)) return combinator.replace(/^!/, '');
	else return '!' + combinator;
};

var reverse = function(expression){
	var expressions = expression.expressions;
	for (var i = 0; i < expressions.length; i++){
		var exp = expressions[i];
		var last = {parts: [], tag: '*', combinator: reverseCombinator(exp[0].combinator)};

		for (var j = 0; j < exp.length; j++){
			var cexp = exp[j];
			if (!cexp.reverseCombinator) cexp.reverseCombinator = ' ';
			cexp.combinator = cexp.reverseCombinator;
			delete cexp.reverseCombinator;
		}

		exp.reverse().push(last);
	}
	return expression;
};

var escapeRegExp = function(string){// Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License
	return string.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, function(match){
		return '\\' + match;
	});
};

var regexp = new RegExp(
/*
#!/usr/bin/env ruby
puts "\t\t" + DATA.read.gsub(/\(\?x\)|\s+#.*$|\s+|\\$|\\n/,'')
__END__
	"(?x)^(?:\
	  \\s* ( , ) \\s*               # Separator          \n\
	| \\s* ( <combinator>+ ) \\s*   # Combinator         \n\
	|      ( \\s+ )                 # CombinatorChildren \n\
	|      ( <unicode>+ | \\* )     # Tag                \n\
	| \\#  ( <unicode>+       )     # ID                 \n\
	| \\.  ( <unicode>+       )     # ClassName          \n\
	|                               # Attribute          \n\
	\\[  \
		\\s* (<unicode1>+)  (?:  \
			\\s* ([*^$!~|]?=)  (?:  \
				\\s* (?:\
					([\"']?)(.*?)\\9 \
				)\
			)  \
		)?  \\s*  \
	\\](?!\\]) \n\
	|   :+ ( <unicode>+ )(?:\
	\\( (?:\
		(?:([\"'])([^\\12]*)\\12)|((?:\\([^)]+\\)|[^()]*)+)\
	) \\)\
	)?\
	)"
*/
	"^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:([\"']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:([\"'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)"
	.replace(/<combinator>/, '[' + escapeRegExp(">+~`!@$%^&={}\\;</") + ']')
	.replace(/<unicode>/g, '(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])')
	.replace(/<unicode1>/g, '(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])')
);

function parser(
	rawMatch,

	separator,
	combinator,
	combinatorChildren,

	tagName,
	id,
	className,

	attributeKey,
	attributeOperator,
	attributeQuote,
	attributeValue,

	pseudoMarker,
	pseudoClass,
	pseudoQuote,
	pseudoClassQuotedValue,
	pseudoClassValue
){
	if (separator || separatorIndex === -1){
		parsed.expressions[++separatorIndex] = [];
		combinatorIndex = -1;
		if (separator) return '';
	}

	if (combinator || combinatorChildren || combinatorIndex === -1){
		combinator = combinator || ' ';
		var currentSeparator = parsed.expressions[separatorIndex];
		if (reversed && currentSeparator[combinatorIndex])
			currentSeparator[combinatorIndex].reverseCombinator = reverseCombinator(combinator);
		currentSeparator[++combinatorIndex] = {combinator: combinator, tag: '*'};
	}

	var currentParsed = parsed.expressions[separatorIndex][combinatorIndex];

	if (tagName){
		currentParsed.tag = tagName.replace(reUnescape, '');

	} else if (id){
		currentParsed.id = id.replace(reUnescape, '');

	} else if (className){
		className = className.replace(reUnescape, '');

		if (!currentParsed.classList) currentParsed.classList = [];
		if (!currentParsed.classes) currentParsed.classes = [];
		currentParsed.classList.push(className);
		currentParsed.classes.push({
			value: className,
			regexp: new RegExp('(^|\\s)' + escapeRegExp(className) + '(\\s|$)')
		});

	} else if (pseudoClass){
		pseudoClassValue = pseudoClassValue || pseudoClassQuotedValue;
		pseudoClassValue = pseudoClassValue ? pseudoClassValue.replace(reUnescape, '') : null;

		if (!currentParsed.pseudos) currentParsed.pseudos = [];
		currentParsed.pseudos.push({
			key: pseudoClass.replace(reUnescape, ''),
			value: pseudoClassValue,
			type: pseudoMarker.length == 1 ? 'class' : 'element'
		});

	} else if (attributeKey){
		attributeKey = attributeKey.replace(reUnescape, '');
		attributeValue = (attributeValue || '').replace(reUnescape, '');

		var test, regexp;

		switch (attributeOperator){
			case '^=' : regexp = new RegExp(       '^'+ escapeRegExp(attributeValue)            ); break;
			case '$=' : regexp = new RegExp(            escapeRegExp(attributeValue) +'$'       ); break;
			case '~=' : regexp = new RegExp( '(^|\\s)'+ escapeRegExp(attributeValue) +'(\\s|$)' ); break;
			case '|=' : regexp = new RegExp(       '^'+ escapeRegExp(attributeValue) +'(-|$)'   ); break;
			case  '=' : test = function(value){
				return attributeValue == value;
			}; break;
			case '*=' : test = function(value){
				return value && value.indexOf(attributeValue) > -1;
			}; break;
			case '!=' : test = function(value){
				return attributeValue != value;
			}; break;
			default   : test = function(value){
				return !!value;
			};
		}

		if (attributeValue == '' && (/^[*$^]=$/).test(attributeOperator)) test = function(){
			return false;
		};

		if (!test) test = function(value){
			return value && regexp.test(value);
		};

		if (!currentParsed.attributes) currentParsed.attributes = [];
		currentParsed.attributes.push({
			key: attributeKey,
			operator: attributeOperator,
			value: attributeValue,
			test: test
		});

	}

	return '';
};

// Slick NS

var Slick = (this.Slick || {});

Slick.parse = function(expression){
	return parse(expression);
};

Slick.escapeRegExp = escapeRegExp;

if (!this.Slick) this.Slick = Slick;

}).apply(/*<CommonJS>*/(typeof exports != 'undefined') ? exports : /*</CommonJS>*/this);

/*
---
name: Slick.Finder
description: The new, superfast css selector engine.
provides: Slick.Finder
requires: Slick.Parser
...
*/

;(function(){

var local = {},
	featuresCache = {},
	toString = Object.prototype.toString;

// Feature / Bug detection

local.isNativeCode = function(fn){
	return (/\{\s*\[native code\]\s*\}/).test('' + fn);
};

local.isXML = function(document){
	return (!!document.xmlVersion) || (!!document.xml) || (toString.call(document) == '[object XMLDocument]') ||
	(document.nodeType == 9 && document.documentElement.nodeName != 'HTML');
};

local.setDocument = function(document){

	// convert elements / window arguments to document. if document cannot be extrapolated, the function returns.
	var nodeType = document.nodeType;
	if (nodeType == 9); // document
	else if (nodeType) document = document.ownerDocument; // node
	else if (document.navigator) document = document.document; // window
	else return;

	// check if it's the old document

	if (this.document === document) return;
	this.document = document;

	// check if we have done feature detection on this document before

	var root = document.documentElement,
		rootUid = this.getUIDXML(root),
		features = featuresCache[rootUid],
		feature;

	if (features){
		for (feature in features){
			this[feature] = features[feature];
		}
		return;
	}

	features = featuresCache[rootUid] = {};

	features.root = root;
	features.isXMLDocument = this.isXML(document);

	features.brokenStarGEBTN
	= features.starSelectsClosedQSA
	= features.idGetsName
	= features.brokenMixedCaseQSA
	= features.brokenGEBCN
	= features.brokenCheckedQSA
	= features.brokenEmptyAttributeQSA
	= features.isHTMLDocument
	= features.nativeMatchesSelector
	= false;

	var starSelectsClosed, starSelectsComments,
		brokenSecondClassNameGEBCN, cachedGetElementsByClassName,
		brokenFormAttributeGetter;

	var selected, id = 'slick_uniqueid';
	var testNode = document.createElement('div');

	var testRoot = document.body || document.getElementsByTagName('body')[0] || root;
	testRoot.appendChild(testNode);

	// on non-HTML documents innerHTML and getElementsById doesnt work properly
	try {
		testNode.innerHTML = '<a id="'+id+'"></a>';
		features.isHTMLDocument = !!document.getElementById(id);
	} catch(e){}

	if (features.isHTMLDocument){

		testNode.style.display = 'none';

		// IE returns comment nodes for getElementsByTagName('*') for some documents
		testNode.appendChild(document.createComment(''));
		starSelectsComments = (testNode.getElementsByTagName('*').length > 1);

		// IE returns closed nodes (EG:"</foo>") for getElementsByTagName('*') for some documents
		try {
			testNode.innerHTML = 'foo</foo>';
			selected = testNode.getElementsByTagName('*');
			starSelectsClosed = (selected && !!selected.length && selected[0].nodeName.charAt(0) == '/');
		} catch(e){};

		features.brokenStarGEBTN = starSelectsComments || starSelectsClosed;

		// IE returns elements with the name instead of just id for getElementsById for some documents
		try {
			testNode.innerHTML = '<a name="'+ id +'"></a><b id="'+ id +'"></b>';
			features.idGetsName = document.getElementById(id) === testNode.firstChild;
		} catch(e){}

		if (testNode.getElementsByClassName){

			// Safari 3.2 getElementsByClassName caches results
			try {
				testNode.innerHTML = '<a class="f"></a><a class="b"></a>';
				testNode.getElementsByClassName('b').length;
				testNode.firstChild.className = 'b';
				cachedGetElementsByClassName = (testNode.getElementsByClassName('b').length != 2);
			} catch(e){};

			// Opera 9.6 getElementsByClassName doesnt detects the class if its not the first one
			try {
				testNode.innerHTML = '<a class="a"></a><a class="f b a"></a>';
				brokenSecondClassNameGEBCN = (testNode.getElementsByClassName('a').length != 2);
			} catch(e){}

			features.brokenGEBCN = cachedGetElementsByClassName || brokenSecondClassNameGEBCN;
		}

		if (testNode.querySelectorAll){
			// IE 8 returns closed nodes (EG:"</foo>") for querySelectorAll('*') for some documents
			try {
				testNode.innerHTML = 'foo</foo>';
				selected = testNode.querySelectorAll('*');
				features.starSelectsClosedQSA = (selected && !!selected.length && selected[0].nodeName.charAt(0) == '/');
			} catch(e){}

			// Safari 3.2 querySelectorAll doesnt work with mixedcase on quirksmode
			try {
				testNode.innerHTML = '<a class="MiX"></a>';
				features.brokenMixedCaseQSA = !testNode.querySelectorAll('.MiX').length;
			} catch(e){}

			// Webkit and Opera dont return selected options on querySelectorAll
			try {
				testNode.innerHTML = '<select><option selected="selected">a</option></select>';
				features.brokenCheckedQSA = (testNode.querySelectorAll(':checked').length == 0);
			} catch(e){};

			// IE returns incorrect results for attr[*^$]="" selectors on querySelectorAll
			try {
				testNode.innerHTML = '<a class=""></a>';
				features.brokenEmptyAttributeQSA = (testNode.querySelectorAll('[class*=""]').length != 0);
			} catch(e){}

		}

		// IE6-7, if a form has an input of id x, form.getAttribute(x) returns a reference to the input
		try {
			testNode.innerHTML = '<form action="s"><input id="action"/></form>';
			brokenFormAttributeGetter = (testNode.firstChild.getAttribute('action') != 's');
		} catch(e){}

		// native matchesSelector function

		features.nativeMatchesSelector = root.matches || /*root.msMatchesSelector ||*/ root.mozMatchesSelector || root.webkitMatchesSelector;
		if (features.nativeMatchesSelector) try {
			// if matchesSelector trows errors on incorrect sintaxes we can use it
			features.nativeMatchesSelector.call(root, ':slick');
			features.nativeMatchesSelector = null;
		} catch(e){}

	}

	try {
		root.slick_expando = 1;
		delete root.slick_expando;
		features.getUID = this.getUIDHTML;
	} catch(e){
		features.getUID = this.getUIDXML;
	}

	testRoot.removeChild(testNode);
	testNode = selected = testRoot = null;

	// getAttribute

	features.getAttribute = (features.isHTMLDocument && brokenFormAttributeGetter) ? function(node, name){
		var method = this.attributeGetters[name];
		if (method) return method.call(node);
		var attributeNode = node.getAttributeNode(name);
		return (attributeNode) ? attributeNode.nodeValue : null;
	} : function(node, name){
		var method = this.attributeGetters[name];
		return (method) ? method.call(node) : node.getAttribute(name);
	};

	// hasAttribute

	features.hasAttribute = (root && this.isNativeCode(root.hasAttribute)) ? function(node, attribute){
		return node.hasAttribute(attribute);
	} : function(node, attribute){
		node = node.getAttributeNode(attribute);
		return !!(node && (node.specified || node.nodeValue));
	};

	// contains
	// FIXME: Add specs: local.contains should be different for xml and html documents?
	var nativeRootContains = root && this.isNativeCode(root.contains),
		nativeDocumentContains = document && this.isNativeCode(document.contains);

	features.contains = (nativeRootContains && nativeDocumentContains) ? function(context, node){
		return context.contains(node);
	} : (nativeRootContains && !nativeDocumentContains) ? function(context, node){
		// IE8 does not have .contains on document.
		return context === node || ((context === document) ? document.documentElement : context).contains(node);
	} : (root && root.compareDocumentPosition) ? function(context, node){
		return context === node || !!(context.compareDocumentPosition(node) & 16);
	} : function(context, node){
		if (node) do {
			if (node === context) return true;
		} while ((node = node.parentNode));
		return false;
	};

	// document order sorting
	// credits to Sizzle (http://sizzlejs.com/)

	features.documentSorter = (root.compareDocumentPosition) ? function(a, b){
		if (!a.compareDocumentPosition || !b.compareDocumentPosition) return 0;
		return a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
	} : ('sourceIndex' in root) ? function(a, b){
		if (!a.sourceIndex || !b.sourceIndex) return 0;
		return a.sourceIndex - b.sourceIndex;
	} : (document.createRange) ? function(a, b){
		if (!a.ownerDocument || !b.ownerDocument) return 0;
		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.setStart(a, 0);
		aRange.setEnd(a, 0);
		bRange.setStart(b, 0);
		bRange.setEnd(b, 0);
		return aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
	} : null ;

	root = null;

	for (feature in features){
		this[feature] = features[feature];
	}
};

// Main Method

var reSimpleSelector = /^([#.]?)((?:[\w-]+|\*))$/,
	reEmptyAttribute = /\[.+[*$^]=(?:""|'')?\]/,
	qsaFailExpCache = {};

local.search = function(context, expression, append, first){

	var found = this.found = (first) ? null : (append || []);

	if (!context) return found;
	else if (context.navigator) context = context.document; // Convert the node from a window to a document
	else if (!context.nodeType) return found;

	// setup

	var parsed, i,
		uniques = this.uniques = {},
		hasOthers = !!(append && append.length),
		contextIsDocument = (context.nodeType == 9);

	if (this.document !== (contextIsDocument ? context : context.ownerDocument)) this.setDocument(context);

	// avoid duplicating items already in the append array
	if (hasOthers) for (i = found.length; i--;) uniques[this.getUID(found[i])] = true;

	// expression checks

	if (typeof expression == 'string'){ // expression is a string

		/*<simple-selectors-override>*/
		var simpleSelector = expression.match(reSimpleSelector);
		simpleSelectors: if (simpleSelector){

			var symbol = simpleSelector[1],
				name = simpleSelector[2],
				node, nodes;

			if (!symbol){

				if (name == '*' && this.brokenStarGEBTN) break simpleSelectors;
				nodes = context.getElementsByTagName(name);
				if (first) return nodes[0] || null;
				for (i = 0; node = nodes[i++];){
					if (!(hasOthers && uniques[this.getUID(node)])) found.push(node);
				}

			} else if (symbol == '#'){

				if (!this.isHTMLDocument || !contextIsDocument) break simpleSelectors;
				node = context.getElementById(name);
				if (!node) return found;
				if (this.idGetsName && node.getAttributeNode('id').nodeValue != name) break simpleSelectors;
				if (first) return node || null;
				if (!(hasOthers && uniques[this.getUID(node)])) found.push(node);

			} else if (symbol == '.'){

				if (!this.isHTMLDocument || ((!context.getElementsByClassName || this.brokenGEBCN) && context.querySelectorAll)) break simpleSelectors;
				if (context.getElementsByClassName && !this.brokenGEBCN){
					nodes = context.getElementsByClassName(name);
					if (first) return nodes[0] || null;
					for (i = 0; node = nodes[i++];){
						if (!(hasOthers && uniques[this.getUID(node)])) found.push(node);
					}
				} else {
					var matchClass = new RegExp('(^|\\s)'+ Slick.escapeRegExp(name) +'(\\s|$)');
					nodes = context.getElementsByTagName('*');
					for (i = 0; node = nodes[i++];){
						className = node.className;
						if (!(className && matchClass.test(className))) continue;
						if (first) return node;
						if (!(hasOthers && uniques[this.getUID(node)])) found.push(node);
					}
				}

			}

			if (hasOthers) this.sort(found);
			return (first) ? null : found;

		}
		/*</simple-selectors-override>*/

		/*<query-selector-override>*/
		querySelector: if (context.querySelectorAll){

			if (!this.isHTMLDocument
				|| qsaFailExpCache[expression]
				//TODO: only skip when expression is actually mixed case
				|| this.brokenMixedCaseQSA
				|| (this.brokenCheckedQSA && expression.indexOf(':checked') > -1)
				|| (this.brokenEmptyAttributeQSA && reEmptyAttribute.test(expression))
				|| (!contextIsDocument //Abort when !contextIsDocument and...
					//  there are multiple expressions in the selector
					//  since we currently only fix non-document rooted QSA for single expression selectors
					&& expression.indexOf(',') > -1
				)
				|| Slick.disableQSA
			) break querySelector;

			var _expression = expression, _context = context;
			if (!contextIsDocument){
				// non-document rooted QSA
				// credits to Andrew Dupont
				var currentId = _context.getAttribute('id'), slickid = 'slickid__';
				_context.setAttribute('id', slickid);
				_expression = '#' + slickid + ' ' + _expression;
				context = _context.parentNode;
			}

			try {
				if (first) return context.querySelector(_expression) || null;
				else nodes = context.querySelectorAll(_expression);
			} catch(e){
				qsaFailExpCache[expression] = 1;
				break querySelector;
			} finally {
				if (!contextIsDocument){
					if (currentId) _context.setAttribute('id', currentId);
					else _context.removeAttribute('id');
					context = _context;
				}
			}

			if (this.starSelectsClosedQSA) for (i = 0; node = nodes[i++];){
				if (node.nodeName > '@' && !(hasOthers && uniques[this.getUID(node)])) found.push(node);
			} else for (i = 0; node = nodes[i++];){
				if (!(hasOthers && uniques[this.getUID(node)])) found.push(node);
			}

			if (hasOthers) this.sort(found);
			return found;

		}
		/*</query-selector-override>*/

		parsed = this.Slick.parse(expression);
		if (!parsed.length) return found;
	} else if (expression == null){ // there is no expression
		return found;
	} else if (expression.Slick){ // expression is a parsed Slick object
		parsed = expression;
	} else if (this.contains(context.documentElement || context, expression)){ // expression is a node
		(found) ? found.push(expression) : found = expression;
		return found;
	} else { // other junk
		return found;
	}

	/*<pseudo-selectors>*//*<nth-pseudo-selectors>*/

	// cache elements for the nth selectors

	this.posNTH = {};
	this.posNTHLast = {};
	this.posNTHType = {};
	this.posNTHTypeLast = {};

	/*</nth-pseudo-selectors>*//*</pseudo-selectors>*/

	// if append is null and there is only a single selector with one expression use pushArray, else use pushUID
	this.push = (!hasOthers && (first || (parsed.length == 1 && parsed.expressions[0].length == 1))) ? this.pushArray : this.pushUID;

	if (found == null) found = [];

	// default engine

	var j, m, n;
	var combinator, tag, id, classList, classes, attributes, pseudos;
	var currentItems, currentExpression, currentBit, lastBit, expressions = parsed.expressions;

	search: for (i = 0; (currentExpression = expressions[i]); i++) for (j = 0; (currentBit = currentExpression[j]); j++){

		combinator = 'combinator:' + currentBit.combinator;
		if (!this[combinator]) continue search;

		tag        = (this.isXMLDocument) ? currentBit.tag : currentBit.tag.toUpperCase();
		id         = currentBit.id;
		classList  = currentBit.classList;
		classes    = currentBit.classes;
		attributes = currentBit.attributes;
		pseudos    = currentBit.pseudos;
		lastBit    = (j === (currentExpression.length - 1));

		this.bitUniques = {};

		if (lastBit){
			this.uniques = uniques;
			this.found = found;
		} else {
			this.uniques = {};
			this.found = [];
		}

		if (j === 0){
			this[combinator](context, tag, id, classes, attributes, pseudos, classList);
			if (first && lastBit && found.length) break search;
		} else {
			if (first && lastBit) for (m = 0, n = currentItems.length; m < n; m++){
				this[combinator](currentItems[m], tag, id, classes, attributes, pseudos, classList);
				if (found.length) break search;
			} else for (m = 0, n = currentItems.length; m < n; m++) this[combinator](currentItems[m], tag, id, classes, attributes, pseudos, classList);
		}

		currentItems = this.found;
	}

	// should sort if there are nodes in append and if you pass multiple expressions.
	if (hasOthers || (parsed.expressions.length > 1)) this.sort(found);

	return (first) ? (found[0] || null) : found;
};

// Utils

local.uidx = 1;
local.uidk = 'slick-uniqueid';

local.getUIDXML = function(node){
	var uid = node.getAttribute(this.uidk);
	if (!uid){
		uid = this.uidx++;
		node.setAttribute(this.uidk, uid);
	}
	return uid;
};

local.getUIDHTML = function(node){
	return node.uniqueNumber || (node.uniqueNumber = this.uidx++);
};

// sort based on the setDocument documentSorter method.

local.sort = function(results){
	if (!this.documentSorter) return results;
	results.sort(this.documentSorter);
	return results;
};

/*<pseudo-selectors>*//*<nth-pseudo-selectors>*/

local.cacheNTH = {};

local.matchNTH = /^([+-]?\d*)?([a-z]+)?([+-]\d+)?$/;

local.parseNTHArgument = function(argument){
	var parsed = argument.match(this.matchNTH);
	if (!parsed) return false;
	var special = parsed[2] || false;
	var a = parsed[1] || 1;
	if (a == '-') a = -1;
	var b = +parsed[3] || 0;
	parsed =
		(special == 'n')	? {a: a, b: b} :
		(special == 'odd')	? {a: 2, b: 1} :
		(special == 'even')	? {a: 2, b: 0} : {a: 0, b: a};

	return (this.cacheNTH[argument] = parsed);
};

local.createNTHPseudo = function(child, sibling, positions, ofType){
	return function(node, argument){
		var uid = this.getUID(node);
		if (!this[positions][uid]){
			var parent = node.parentNode;
			if (!parent) return false;
			var el = parent[child], count = 1;
			if (ofType){
				var nodeName = node.nodeName;
				do {
					if (el.nodeName != nodeName) continue;
					this[positions][this.getUID(el)] = count++;
				} while ((el = el[sibling]));
			} else {
				do {
					if (el.nodeType != 1) continue;
					this[positions][this.getUID(el)] = count++;
				} while ((el = el[sibling]));
			}
		}
		argument = argument || 'n';
		var parsed = this.cacheNTH[argument] || this.parseNTHArgument(argument);
		if (!parsed) return false;
		var a = parsed.a, b = parsed.b, pos = this[positions][uid];
		if (a == 0) return b == pos;
		if (a > 0){
			if (pos < b) return false;
		} else {
			if (b < pos) return false;
		}
		return ((pos - b) % a) == 0;
	};
};

/*</nth-pseudo-selectors>*//*</pseudo-selectors>*/

local.pushArray = function(node, tag, id, classes, attributes, pseudos){
	if (this.matchSelector(node, tag, id, classes, attributes, pseudos)) this.found.push(node);
};

local.pushUID = function(node, tag, id, classes, attributes, pseudos){
	var uid = this.getUID(node);
	if (!this.uniques[uid] && this.matchSelector(node, tag, id, classes, attributes, pseudos)){
		this.uniques[uid] = true;
		this.found.push(node);
	}
};

local.matchNode = function(node, selector){
	if (this.isHTMLDocument && this.nativeMatchesSelector){
		try {
			return this.nativeMatchesSelector.call(node, selector.replace(/\[([^=]+)=\s*([^'"\]]+?)\s*\]/g, '[$1="$2"]'));
		} catch(matchError){}
	}

	var parsed = this.Slick.parse(selector);
	if (!parsed) return true;

	// simple (single) selectors
	var expressions = parsed.expressions, simpleExpCounter = 0, i, currentExpression;
	for (i = 0; (currentExpression = expressions[i]); i++){
		if (currentExpression.length == 1){
			var exp = currentExpression[0];
			if (this.matchSelector(node, (this.isXMLDocument) ? exp.tag : exp.tag.toUpperCase(), exp.id, exp.classes, exp.attributes, exp.pseudos)) return true;
			simpleExpCounter++;
		}
	}

	if (simpleExpCounter == parsed.length) return false;

	var nodes = this.search(this.document, parsed), item;
	for (i = 0; item = nodes[i++];){
		if (item === node) return true;
	}
	return false;
};

local.matchPseudo = function(node, name, argument){
	var pseudoName = 'pseudo:' + name;
	if (this[pseudoName]) return this[pseudoName](node, argument);
	var attribute = this.getAttribute(node, name);
	return (argument) ? argument == attribute : !!attribute;
};

local.matchSelector = function(node, tag, id, classes, attributes, pseudos){
	if (tag){
		var nodeName = (this.isXMLDocument) ? node.nodeName : node.nodeName.toUpperCase();
		if (tag == '*'){
			if (nodeName < '@') return false; // Fix for comment nodes and closed nodes
		} else {
			if (nodeName != tag) return false;
		}
	}

	if (id && node.getAttribute('id') != id) return false;

	var i, part, cls;
	if (classes) for (i = classes.length; i--;){
		cls = this.getAttribute(node, 'class');
		if (!(cls && classes[i].regexp.test(cls))) return false;
	}
	if (attributes) for (i = attributes.length; i--;){
		part = attributes[i];
		if (part.operator ? !part.test(this.getAttribute(node, part.key)) : !this.hasAttribute(node, part.key)) return false;
	}
	if (pseudos) for (i = pseudos.length; i--;){
		part = pseudos[i];
		if (!this.matchPseudo(node, part.key, part.value)) return false;
	}
	return true;
};

var combinators = {

	' ': function(node, tag, id, classes, attributes, pseudos, classList){ // all child nodes, any level

		var i, item, children;

		if (this.isHTMLDocument){
			getById: if (id){
				item = this.document.getElementById(id);
				if ((!item && node.all) || (this.idGetsName && item && item.getAttributeNode('id').nodeValue != id)){
					// all[id] returns all the elements with that name or id inside node
					// if theres just one it will return the element, else it will be a collection
					children = node.all[id];
					if (!children) return;
					if (!children[0]) children = [children];
					for (i = 0; item = children[i++];){
						var idNode = item.getAttributeNode('id');
						if (idNode && idNode.nodeValue == id){
							this.push(item, tag, null, classes, attributes, pseudos);
							break;
						}
					}
					return;
				}
				if (!item){
					// if the context is in the dom we return, else we will try GEBTN, breaking the getById label
					if (this.contains(this.root, node)) return;
					else break getById;
				} else if (this.document !== node && !this.contains(node, item)) return;
				this.push(item, tag, null, classes, attributes, pseudos);
				return;
			}
			getByClass: if (classes && node.getElementsByClassName && !this.brokenGEBCN){
				children = node.getElementsByClassName(classList.join(' '));
				if (!(children && children.length)) break getByClass;
				for (i = 0; item = children[i++];) this.push(item, tag, id, null, attributes, pseudos);
				return;
			}
		}
		getByTag: {
			children = node.getElementsByTagName(tag);
			if (!(children && children.length)) break getByTag;
			if (!this.brokenStarGEBTN) tag = null;
			for (i = 0; item = children[i++];) this.push(item, tag, id, classes, attributes, pseudos);
		}
	},

	'>': function(node, tag, id, classes, attributes, pseudos){ // direct children
		if ((node = node.firstChild)) do {
			if (node.nodeType == 1) this.push(node, tag, id, classes, attributes, pseudos);
		} while ((node = node.nextSibling));
	},

	'+': function(node, tag, id, classes, attributes, pseudos){ // next sibling
		while ((node = node.nextSibling)) if (node.nodeType == 1){
			this.push(node, tag, id, classes, attributes, pseudos);
			break;
		}
	},

	'^': function(node, tag, id, classes, attributes, pseudos){ // first child
		node = node.firstChild;
		if (node){
			if (node.nodeType == 1) this.push(node, tag, id, classes, attributes, pseudos);
			else this['combinator:+'](node, tag, id, classes, attributes, pseudos);
		}
	},

	'~': function(node, tag, id, classes, attributes, pseudos){ // next siblings
		while ((node = node.nextSibling)){
			if (node.nodeType != 1) continue;
			var uid = this.getUID(node);
			if (this.bitUniques[uid]) break;
			this.bitUniques[uid] = true;
			this.push(node, tag, id, classes, attributes, pseudos);
		}
	},

	'++': function(node, tag, id, classes, attributes, pseudos){ // next sibling and previous sibling
		this['combinator:+'](node, tag, id, classes, attributes, pseudos);
		this['combinator:!+'](node, tag, id, classes, attributes, pseudos);
	},

	'~~': function(node, tag, id, classes, attributes, pseudos){ // next siblings and previous siblings
		this['combinator:~'](node, tag, id, classes, attributes, pseudos);
		this['combinator:!~'](node, tag, id, classes, attributes, pseudos);
	},

	'!': function(node, tag, id, classes, attributes, pseudos){ // all parent nodes up to document
		while ((node = node.parentNode)) if (node !== this.document) this.push(node, tag, id, classes, attributes, pseudos);
	},

	'!>': function(node, tag, id, classes, attributes, pseudos){ // direct parent (one level)
		node = node.parentNode;
		if (node !== this.document) this.push(node, tag, id, classes, attributes, pseudos);
	},

	'!+': function(node, tag, id, classes, attributes, pseudos){ // previous sibling
		while ((node = node.previousSibling)) if (node.nodeType == 1){
			this.push(node, tag, id, classes, attributes, pseudos);
			break;
		}
	},

	'!^': function(node, tag, id, classes, attributes, pseudos){ // last child
		node = node.lastChild;
		if (node){
			if (node.nodeType == 1) this.push(node, tag, id, classes, attributes, pseudos);
			else this['combinator:!+'](node, tag, id, classes, attributes, pseudos);
		}
	},

	'!~': function(node, tag, id, classes, attributes, pseudos){ // previous siblings
		while ((node = node.previousSibling)){
			if (node.nodeType != 1) continue;
			var uid = this.getUID(node);
			if (this.bitUniques[uid]) break;
			this.bitUniques[uid] = true;
			this.push(node, tag, id, classes, attributes, pseudos);
		}
	}

};

for (var c in combinators) local['combinator:' + c] = combinators[c];

var pseudos = {

	/*<pseudo-selectors>*/

	'empty': function(node){
		var child = node.firstChild;
		return !(child && child.nodeType == 1) && !(node.innerText || node.textContent || '').length;
	},

	'not': function(node, expression){
		return !this.matchNode(node, expression);
	},

	'contains': function(node, text){
		return (node.innerText || node.textContent || '').indexOf(text) > -1;
	},

	'first-child': function(node){
		while ((node = node.previousSibling)) if (node.nodeType == 1) return false;
		return true;
	},

	'last-child': function(node){
		while ((node = node.nextSibling)) if (node.nodeType == 1) return false;
		return true;
	},

	'only-child': function(node){
		var prev = node;
		while ((prev = prev.previousSibling)) if (prev.nodeType == 1) return false;
		var next = node;
		while ((next = next.nextSibling)) if (next.nodeType == 1) return false;
		return true;
	},

	/*<nth-pseudo-selectors>*/

	'nth-child': local.createNTHPseudo('firstChild', 'nextSibling', 'posNTH'),

	'nth-last-child': local.createNTHPseudo('lastChild', 'previousSibling', 'posNTHLast'),

	'nth-of-type': local.createNTHPseudo('firstChild', 'nextSibling', 'posNTHType', true),

	'nth-last-of-type': local.createNTHPseudo('lastChild', 'previousSibling', 'posNTHTypeLast', true),

	'index': function(node, index){
		return this['pseudo:nth-child'](node, '' + (index + 1));
	},

	'even': function(node){
		return this['pseudo:nth-child'](node, '2n');
	},

	'odd': function(node){
		return this['pseudo:nth-child'](node, '2n+1');
	},

	/*</nth-pseudo-selectors>*/

	/*<of-type-pseudo-selectors>*/

	'first-of-type': function(node){
		var nodeName = node.nodeName;
		while ((node = node.previousSibling)) if (node.nodeName == nodeName) return false;
		return true;
	},

	'last-of-type': function(node){
		var nodeName = node.nodeName;
		while ((node = node.nextSibling)) if (node.nodeName == nodeName) return false;
		return true;
	},

	'only-of-type': function(node){
		var prev = node, nodeName = node.nodeName;
		while ((prev = prev.previousSibling)) if (prev.nodeName == nodeName) return false;
		var next = node;
		while ((next = next.nextSibling)) if (next.nodeName == nodeName) return false;
		return true;
	},

	/*</of-type-pseudo-selectors>*/

	// custom pseudos

	'enabled': function(node){
		return !node.disabled;
	},

	'disabled': function(node){
		return node.disabled;
	},

	'checked': function(node){
		return node.checked || node.selected;
	},

	'focus': function(node){
		return this.isHTMLDocument && this.document.activeElement === node && (node.href || node.type || this.hasAttribute(node, 'tabindex'));
	},

	'root': function(node){
		return (node === this.root);
	},

	'selected': function(node){
		return node.selected;
	}

	/*</pseudo-selectors>*/
};

for (var p in pseudos) local['pseudo:' + p] = pseudos[p];

// attributes methods

var attributeGetters = local.attributeGetters = {

	'for': function(){
		return ('htmlFor' in this) ? this.htmlFor : this.getAttribute('for');
	},

	'href': function(){
		return ('href' in this) ? this.getAttribute('href', 2) : this.getAttribute('href');
	},

	'style': function(){
		return (this.style) ? this.style.cssText : this.getAttribute('style');
	},

	'tabindex': function(){
		var attributeNode = this.getAttributeNode('tabindex');
		return (attributeNode && attributeNode.specified) ? attributeNode.nodeValue : null;
	},

	'type': function(){
		return this.getAttribute('type');
	},

	'maxlength': function(){
		var attributeNode = this.getAttributeNode('maxLength');
		return (attributeNode && attributeNode.specified) ? attributeNode.nodeValue : null;
	}

};

attributeGetters.MAXLENGTH = attributeGetters.maxLength = attributeGetters.maxlength;

// Slick

var Slick = local.Slick = (this.Slick || {});

Slick.version = '1.1.7';

// Slick finder

Slick.search = function(context, expression, append){
	return local.search(context, expression, append);
};

Slick.find = function(context, expression){
	return local.search(context, expression, null, true);
};

// Slick containment checker

Slick.contains = function(container, node){
	local.setDocument(container);
	return local.contains(container, node);
};

// Slick attribute getter

Slick.getAttribute = function(node, name){
	local.setDocument(node);
	return local.getAttribute(node, name);
};

Slick.hasAttribute = function(node, name){
	local.setDocument(node);
	return local.hasAttribute(node, name);
};

// Slick matcher

Slick.match = function(node, selector){
	if (!(node && selector)) return false;
	if (!selector || selector === node) return true;
	local.setDocument(node);
	return local.matchNode(node, selector);
};

// Slick attribute accessor

Slick.defineAttributeGetter = function(name, fn){
	local.attributeGetters[name] = fn;
	return this;
};

Slick.lookupAttributeGetter = function(name){
	return local.attributeGetters[name];
};

// Slick pseudo accessor

Slick.definePseudo = function(name, fn){
	local['pseudo:' + name] = function(node, argument){
		return fn.call(node, argument);
	};
	return this;
};

Slick.lookupPseudo = function(name){
	var pseudo = local['pseudo:' + name];
	if (pseudo) return function(argument){
		return pseudo.call(this, argument);
	};
	return null;
};

// Slick overrides accessor

Slick.override = function(regexp, fn){
	local.override(regexp, fn);
	return this;
};

Slick.isXML = local.isXML;

Slick.uidOf = function(node){
	return local.getUIDHTML(node);
};

if (!this.Slick) this.Slick = Slick;

}).apply(/*<CommonJS>*/(typeof exports != 'undefined') ? exports : /*</CommonJS>*/this);

/*
---

name: Element

description: One of the most important items in MooTools. Contains the dollar function, the dollars function, and an handful of cross-browser, time-saver methods to let you easily work with HTML Elements.

license: MIT-style license.

requires: [Window, Document, Array, String, Function, Object, Number, Slick.Parser, Slick.Finder]

provides: [Element, Elements, $, $$, IFrame, Selectors]

...
*/

var Element = this.Element = function(tag, props){
	var konstructor = Element.Constructors[tag];
	if (konstructor) return konstructor(props);
	if (typeof tag != 'string') return document.id(tag).set(props);

	if (!props) props = {};

	if (!(/^[\w-]+$/).test(tag)){
		var parsed = Slick.parse(tag).expressions[0][0];
		tag = (parsed.tag == '*') ? 'div' : parsed.tag;
		if (parsed.id && props.id == null) props.id = parsed.id;

		var attributes = parsed.attributes;
		if (attributes) for (var attr, i = 0, l = attributes.length; i < l; i++){
			attr = attributes[i];
			if (props[attr.key] != null) continue;

			if (attr.value != null && attr.operator == '=') props[attr.key] = attr.value;
			else if (!attr.value && !attr.operator) props[attr.key] = true;
		}

		if (parsed.classList && props['class'] == null) props['class'] = parsed.classList.join(' ');
	}

	return document.newElement(tag, props);
};


if (Browser.Element){
	Element.prototype = Browser.Element.prototype;
	// IE8 and IE9 require the wrapping.
	Element.prototype._fireEvent = (function(fireEvent){
		return function(type, event){
			return fireEvent.call(this, type, event);
		};
	})(Element.prototype.fireEvent);
}

new Type('Element', Element).mirror(function(name){
	if (Array.prototype[name]) return;

	var obj = {};
	obj[name] = function(){
		var results = [], args = arguments, elements = true;
		for (var i = 0, l = this.length; i < l; i++){
			var element = this[i], result = results[i] = element[name].apply(element, args);
			elements = (elements && typeOf(result) == 'element');
		}
		return (elements) ? new Elements(results) : results;
	};

	Elements.implement(obj);
});

if (!Browser.Element){
	Element.parent = Object;

	Element.Prototype = {
		'$constructor': Element,
		'$family': Function.from('element').hide()
	};

	Element.mirror(function(name, method){
		Element.Prototype[name] = method;
	});
}

Element.Constructors = {};



var IFrame = new Type('IFrame', function(){
	var params = Array.link(arguments, {
		properties: Type.isObject,
		iframe: function(obj){
			return (obj != null);
		}
	});

	var props = params.properties || {}, iframe;
	if (params.iframe) iframe = document.id(params.iframe);
	var onload = props.onload || function(){};
	delete props.onload;
	props.id = props.name = [props.id, props.name, iframe ? (iframe.id || iframe.name) : 'IFrame_' + String.uniqueID()].pick();
	iframe = new Element(iframe || 'iframe', props);

	var onLoad = function(){
		onload.call(iframe.contentWindow);
	};

	if (window.frames[props.id]) onLoad();
	else iframe.addListener('load', onLoad);
	return iframe;
});

var Elements = this.Elements = function(nodes){
	if (nodes && nodes.length){
		var uniques = {}, node;
		for (var i = 0; node = nodes[i++];){
			var uid = Slick.uidOf(node);
			if (!uniques[uid]){
				uniques[uid] = true;
				this.push(node);
			}
		}
	}
};

Elements.prototype = {length: 0};
Elements.parent = Array;

new Type('Elements', Elements).implement({

	filter: function(filter, bind){
		if (!filter) return this;
		return new Elements(Array.filter(this, (typeOf(filter) == 'string') ? function(item){
			return item.match(filter);
		} : filter, bind));
	}.protect(),

	push: function(){
		var length = this.length;
		for (var i = 0, l = arguments.length; i < l; i++){
			var item = document.id(arguments[i]);
			if (item) this[length++] = item;
		}
		return (this.length = length);
	}.protect(),

	unshift: function(){
		var items = [];
		for (var i = 0, l = arguments.length; i < l; i++){
			var item = document.id(arguments[i]);
			if (item) items.push(item);
		}
		return Array.prototype.unshift.apply(this, items);
	}.protect(),

	concat: function(){
		var newElements = new Elements(this);
		for (var i = 0, l = arguments.length; i < l; i++){
			var item = arguments[i];
			if (Type.isEnumerable(item)) newElements.append(item);
			else newElements.push(item);
		}
		return newElements;
	}.protect(),

	append: function(collection){
		for (var i = 0, l = collection.length; i < l; i++) this.push(collection[i]);
		return this;
	}.protect(),

	empty: function(){
		while (this.length) delete this[--this.length];
		return this;
	}.protect()

});



(function(){

// FF, IE
var splice = Array.prototype.splice, object = {'0': 0, '1': 1, length: 2};

splice.call(object, 1, 1);
if (object[1] == 1) Elements.implement('splice', function(){
	var length = this.length;
	var result = splice.apply(this, arguments);
	while (length >= this.length) delete this[length--];
	return result;
}.protect());

Array.forEachMethod(function(method, name){
	Elements.implement(name, method);
});

Array.mirror(Elements);

/*<ltIE8>*/
var createElementAcceptsHTML;
try {
	createElementAcceptsHTML = (document.createElement('<input name=x>').name == 'x');
} catch (e){}

var escapeQuotes = function(html){
	return ('' + html).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
};
/*</ltIE8>*/

/*<ltIE9>*/
// #2479 - IE8 Cannot set HTML of style element
var canChangeStyleHTML = (function(){
    var div = document.createElement('style'),
        flag = false;
    try {
        div.innerHTML = '#justTesing{margin: 0px;}';
        flag = !!div.innerHTML;
    } catch(e){}
    return flag;
})();
/*</ltIE9>*/

Document.implement({

	newElement: function(tag, props){
		if (props){
			if (props.checked != null) props.defaultChecked = props.checked;
			if ((props.type == 'checkbox' || props.type == 'radio') && props.value == null) props.value = 'on'; 
			/*<ltIE9>*/ // IE needs the type to be set before changing content of style element
			if (!canChangeStyleHTML && tag == 'style'){
				var styleElement = document.createElement('style');
				styleElement.setAttribute('type', 'text/css');
				if (props.type) delete props.type;
				return this.id(styleElement).set(props);
			}
			/*</ltIE9>*/
			/*<ltIE8>*/// Fix for readonly name and type properties in IE < 8
			if (createElementAcceptsHTML){
				tag = '<' + tag;
				if (props.name) tag += ' name="' + escapeQuotes(props.name) + '"';
				if (props.type) tag += ' type="' + escapeQuotes(props.type) + '"';
				tag += '>';
				delete props.name;
				delete props.type;
			}
			/*</ltIE8>*/
		}
		return this.id(this.createElement(tag)).set(props);
	}

});

})();

(function(){

Slick.uidOf(window);
Slick.uidOf(document);

Document.implement({

	newTextNode: function(text){
		return this.createTextNode(text);
	},

	getDocument: function(){
		return this;
	},

	getWindow: function(){
		return this.window;
	},

	id: (function(){

		var types = {

			string: function(id, nocash, doc){
				id = Slick.find(doc, '#' + id.replace(/(\W)/g, '\\$1'));
				return (id) ? types.element(id, nocash) : null;
			},

			element: function(el, nocash){
				Slick.uidOf(el);
				if (!nocash && !el.$family && !(/^(?:object|embed)$/i).test(el.tagName)){
					var fireEvent = el.fireEvent;
					// wrapping needed in IE7, or else crash
					el._fireEvent = function(type, event){
						return fireEvent(type, event);
					};
					Object.append(el, Element.Prototype);
				}
				return el;
			},

			object: function(obj, nocash, doc){
				if (obj.toElement) return types.element(obj.toElement(doc), nocash);
				return null;
			}

		};

		types.textnode = types.whitespace = types.window = types.document = function(zero){
			return zero;
		};

		return function(el, nocash, doc){
			if (el && el.$family && el.uniqueNumber) return el;
			var type = typeOf(el);
			return (types[type]) ? types[type](el, nocash, doc || document) : null;
		};

	})()

});

if (window.$ == null) Window.implement('$', function(el, nc){
	return document.id(el, nc, this.document);
});

Window.implement({

	getDocument: function(){
		return this.document;
	},

	getWindow: function(){
		return this;
	}

});

[Document, Element].invoke('implement', {

	getElements: function(expression){
		return Slick.search(this, expression, new Elements);
	},

	getElement: function(expression){
		return document.id(Slick.find(this, expression));
	}

});

var contains = {contains: function(element){
	return Slick.contains(this, element);
}};

if (!document.contains) Document.implement(contains);
if (!document.createElement('div').contains) Element.implement(contains);



// tree walking

var injectCombinator = function(expression, combinator){
	if (!expression) return combinator;

	expression = Object.clone(Slick.parse(expression));

	var expressions = expression.expressions;
	for (var i = expressions.length; i--;)
		expressions[i][0].combinator = combinator;

	return expression;
};

Object.forEach({
	getNext: '~',
	getPrevious: '!~',
	getParent: '!'
}, function(combinator, method){
	Element.implement(method, function(expression){
		return this.getElement(injectCombinator(expression, combinator));
	});
});

Object.forEach({
	getAllNext: '~',
	getAllPrevious: '!~',
	getSiblings: '~~',
	getChildren: '>',
	getParents: '!'
}, function(combinator, method){
	Element.implement(method, function(expression){
		return this.getElements(injectCombinator(expression, combinator));
	});
});

Element.implement({

	getFirst: function(expression){
		return document.id(Slick.search(this, injectCombinator(expression, '>'))[0]);
	},

	getLast: function(expression){
		return document.id(Slick.search(this, injectCombinator(expression, '>')).getLast());
	},

	getWindow: function(){
		return this.ownerDocument.window;
	},

	getDocument: function(){
		return this.ownerDocument;
	},

	getElementById: function(id){
		return document.id(Slick.find(this, '#' + ('' + id).replace(/(\W)/g, '\\$1')));
	},

	match: function(expression){
		return !expression || Slick.match(this, expression);
	}

});



if (window.$$ == null) Window.implement('$$', function(selector){
	if (arguments.length == 1){
		if (typeof selector == 'string') return Slick.search(this.document, selector, new Elements);
		else if (Type.isEnumerable(selector)) return new Elements(selector);
	}
	return new Elements(arguments);
});

// Inserters

var inserters = {

	before: function(context, element){
		var parent = element.parentNode;
		if (parent) parent.insertBefore(context, element);
	},

	after: function(context, element){
		var parent = element.parentNode;
		if (parent) parent.insertBefore(context, element.nextSibling);
	},

	bottom: function(context, element){
		element.appendChild(context);
	},

	top: function(context, element){
		element.insertBefore(context, element.firstChild);
	}

};

inserters.inside = inserters.bottom;



// getProperty / setProperty

var propertyGetters = {}, propertySetters = {};

// properties

var properties = {};
Array.forEach([
	'type', 'value', 'defaultValue', 'accessKey', 'cellPadding', 'cellSpacing', 'colSpan',
	'frameBorder', 'rowSpan', 'tabIndex', 'useMap'
], function(property){
	properties[property.toLowerCase()] = property;
});

properties.html = 'innerHTML';
properties.text = (document.createElement('div').textContent == null) ? 'innerText': 'textContent';

Object.forEach(properties, function(real, key){
	propertySetters[key] = function(node, value){
		node[real] = value;
	};
	propertyGetters[key] = function(node){
		return node[real];
	};
});

/*<ltIE9>*/
propertySetters.text = (function(setter){
	return function(node, value){
		if (node.get('tag') == 'style') node.set('html', value);
		else node[properties.text] = value;
	};
})(propertySetters.text);

propertyGetters.text = (function(getter){
	return function(node){
		return (node.get('tag') == 'style') ? node.innerHTML : getter(node);
	};
})(propertyGetters.text);
/*</ltIE9>*/

// Booleans

var bools = [
	'compact', 'nowrap', 'ismap', 'declare', 'noshade', 'checked',
	'disabled', 'readOnly', 'multiple', 'selected', 'noresize',
	'defer', 'defaultChecked', 'autofocus', 'controls', 'autoplay',
	'loop'
];

var booleans = {};
Array.forEach(bools, function(bool){
	var lower = bool.toLowerCase();
	booleans[lower] = bool;
	propertySetters[lower] = function(node, value){
		node[bool] = !!value;
	};
	propertyGetters[lower] = function(node){
		return !!node[bool];
	};
});

// Special cases

Object.append(propertySetters, {

	'class': function(node, value){
		('className' in node) ? node.className = (value || '') : node.setAttribute('class', value);
	},

	'for': function(node, value){
		('htmlFor' in node) ? node.htmlFor = value : node.setAttribute('for', value);
	},

	'style': function(node, value){
		(node.style) ? node.style.cssText = value : node.setAttribute('style', value);
	},

	'value': function(node, value){
		node.value = (value != null) ? value : '';
	}

});

propertyGetters['class'] = function(node){
	return ('className' in node) ? node.className || null : node.getAttribute('class');
};

/* <webkit> */
var el = document.createElement('button');
// IE sets type as readonly and throws
try { el.type = 'button'; } catch(e){}
if (el.type != 'button') propertySetters.type = function(node, value){
	node.setAttribute('type', value);
};
el = null;
/* </webkit> */

/*<IE>*/

/*<ltIE9>*/
// #2479 - IE8 Cannot set HTML of style element
var canChangeStyleHTML = (function(){
    var div = document.createElement('style'),
        flag = false;
    try {
        div.innerHTML = '#justTesing{margin: 0px;}';
        flag = !!div.innerHTML;
    } catch(e){}
    return flag;
})();
/*</ltIE9>*/

var input = document.createElement('input'), volatileInputValue, html5InputSupport;

// #2178
input.value = 't';
input.type = 'submit';
volatileInputValue = input.value != 't';

// #2443 - IE throws "Invalid Argument" when trying to use html5 input types
try {
	input.value = '';
	input.type = 'email';
	html5InputSupport = input.type == 'email';
} catch(e){}

input = null;

if (volatileInputValue || !html5InputSupport) propertySetters.type = function(node, type){
	try {
		var value = node.value;
		node.type = type;
		node.value = value;
	} catch (e){}
};
/*</IE>*/

/* getProperty, setProperty */

/* <ltIE9> */
var pollutesGetAttribute = (function(div){
	div.random = 'attribute';
	return (div.getAttribute('random') == 'attribute');
})(document.createElement('div'));

var hasCloneBug = (function(test){
	test.innerHTML = '<object><param name="should_fix" value="the unknown" /></object>';
	return test.cloneNode(true).firstChild.childNodes.length != 1;
})(document.createElement('div'));
/* </ltIE9> */

var hasClassList = !!document.createElement('div').classList;

var classes = function(className){
	var classNames = (className || '').clean().split(" "), uniques = {};
	return classNames.filter(function(className){
		if (className !== "" && !uniques[className]) return uniques[className] = className;
	});
};

var addToClassList = function(name){
	this.classList.add(name);
};

var removeFromClassList = function(name){
	this.classList.remove(name);
};

Element.implement({

	setProperty: function(name, value){
		var setter = propertySetters[name.toLowerCase()];
		if (setter){
			setter(this, value);
		} else {
			/* <ltIE9> */
			var attributeWhiteList;
			if (pollutesGetAttribute) attributeWhiteList = this.retrieve('$attributeWhiteList', {});
			/* </ltIE9> */

			if (value == null){
				this.removeAttribute(name);
				/* <ltIE9> */
				if (pollutesGetAttribute) delete attributeWhiteList[name];
				/* </ltIE9> */
			} else {
				this.setAttribute(name, '' + value);
				/* <ltIE9> */
				if (pollutesGetAttribute) attributeWhiteList[name] = true;
				/* </ltIE9> */
			}
		}
		return this;
	},

	setProperties: function(attributes){
		for (var attribute in attributes) this.setProperty(attribute, attributes[attribute]);
		return this;
	},

	getProperty: function(name){
		var getter = propertyGetters[name.toLowerCase()];
		if (getter) return getter(this);
		/* <ltIE9> */
		if (pollutesGetAttribute){
			var attr = this.getAttributeNode(name), attributeWhiteList = this.retrieve('$attributeWhiteList', {});
			if (!attr) return null;
			if (attr.expando && !attributeWhiteList[name]){
				var outer = this.outerHTML;
				// segment by the opening tag and find mention of attribute name
				if (outer.substr(0, outer.search(/\/?['"]?>(?![^<]*<['"])/)).indexOf(name) < 0) return null;
				attributeWhiteList[name] = true;
			}
		}
		/* </ltIE9> */
		var result = Slick.getAttribute(this, name);
		return (!result && !Slick.hasAttribute(this, name)) ? null : result;
	},

	getProperties: function(){
		var args = Array.from(arguments);
		return args.map(this.getProperty, this).associate(args);
	},

	removeProperty: function(name){
		return this.setProperty(name, null);
	},

	removeProperties: function(){
		Array.each(arguments, this.removeProperty, this);
		return this;
	},

	set: function(prop, value){
		var property = Element.Properties[prop];
		(property && property.set) ? property.set.call(this, value) : this.setProperty(prop, value);
	}.overloadSetter(),

	get: function(prop){
		var property = Element.Properties[prop];
		return (property && property.get) ? property.get.apply(this) : this.getProperty(prop);
	}.overloadGetter(),

	erase: function(prop){
		var property = Element.Properties[prop];
		(property && property.erase) ? property.erase.apply(this) : this.removeProperty(prop);
		return this;
	},

	hasClass: hasClassList ? function(className){
		return this.classList.contains(className);
	} : function(className){
		return classes(this.className).contains(className);
	},

	addClass: hasClassList ? function(className){
		classes(className).forEach(addToClassList, this);
		return this;
	} : function(className){
		this.className = classes(className + ' ' + this.className).join(' ');
		return this;
	},

	removeClass: hasClassList ? function(className){
		classes(className).forEach(removeFromClassList, this);
		return this;
	} : function(className){
		var classNames = classes(this.className);
		classes(className).forEach(classNames.erase, classNames);
		this.className = classNames.join(' ');
		return this;
	},

	toggleClass: function(className, force){
		if (force == null) force = !this.hasClass(className);
		return (force) ? this.addClass(className) : this.removeClass(className);
	},

	adopt: function(){
		var parent = this, fragment, elements = Array.flatten(arguments), length = elements.length;
		if (length > 1) parent = fragment = document.createDocumentFragment();

		for (var i = 0; i < length; i++){
			var element = document.id(elements[i], true);
			if (element) parent.appendChild(element);
		}

		if (fragment) this.appendChild(fragment);

		return this;
	},

	appendText: function(text, where){
		return this.grab(this.getDocument().newTextNode(text), where);
	},

	grab: function(el, where){
		inserters[where || 'bottom'](document.id(el, true), this);
		return this;
	},

	inject: function(el, where){
		inserters[where || 'bottom'](this, document.id(el, true));
		return this;
	},

	replaces: function(el){
		el = document.id(el, true);
		el.parentNode.replaceChild(this, el);
		return this;
	},

	wraps: function(el, where){
		el = document.id(el, true);
		return this.replaces(el).grab(el, where);
	},

	getSelected: function(){
		this.selectedIndex; // Safari 3.2.1
		return new Elements(Array.from(this.options).filter(function(option){
			return option.selected;
		}));
	},

	toQueryString: function(){
		var queryString = [];
		this.getElements('input, select, textarea').each(function(el){
			var type = el.type;
			if (!el.name || el.disabled || type == 'submit' || type == 'reset' || type == 'file' || type == 'image') return;

			var value = (el.get('tag') == 'select') ? el.getSelected().map(function(opt){
				// IE
				return document.id(opt).get('value');
			}) : ((type == 'radio' || type == 'checkbox') && !el.checked) ? null : el.get('value');

			Array.from(value).each(function(val){
				if (typeof val != 'undefined') queryString.push(encodeURIComponent(el.name) + '=' + encodeURIComponent(val));
			});
		});
		return queryString.join('&');
	}

});


// appendHTML

var appendInserters = {
	before: 'beforeBegin',
	after: 'afterEnd',
	bottom: 'beforeEnd',
	top: 'afterBegin',
	inside: 'beforeEnd'
};

Element.implement('appendHTML', ('insertAdjacentHTML' in document.createElement('div')) ? function(html, where){
	this.insertAdjacentHTML(appendInserters[where || 'bottom'], html);
	return this;
} : function(html, where){
	var temp = new Element('div', {html: html}),
		children = temp.childNodes,
		fragment = temp.firstChild;

	if (!fragment) return this;
	if (children.length > 1){
		fragment = document.createDocumentFragment();
		for (var i = 0, l = children.length; i < l; i++){
			fragment.appendChild(children[i]);
		}
	}

	inserters[where || 'bottom'](fragment, this);
	return this;
});

var collected = {}, storage = {};

var get = function(uid){
	return (storage[uid] || (storage[uid] = {}));
};

var clean = function(item){
	var uid = item.uniqueNumber;
	if (item.removeEvents) item.removeEvents();
	if (item.clearAttributes) item.clearAttributes();
	if (uid != null){
		delete collected[uid];
		delete storage[uid];
	}
	return item;
};

var formProps = {input: 'checked', option: 'selected', textarea: 'value'};

Element.implement({

	destroy: function(){
		var children = clean(this).getElementsByTagName('*');
		Array.each(children, clean);
		Element.dispose(this);
		return null;
	},

	empty: function(){
		Array.from(this.childNodes).each(Element.dispose);
		return this;
	},

	dispose: function(){
		return (this.parentNode) ? this.parentNode.removeChild(this) : this;
	},

	clone: function(contents, keepid){
		contents = contents !== false;
		var clone = this.cloneNode(contents), ce = [clone], te = [this], i;

		if (contents){
			ce.append(Array.from(clone.getElementsByTagName('*')));
			te.append(Array.from(this.getElementsByTagName('*')));
		}

		for (i = ce.length; i--;){
			var node = ce[i], element = te[i];
			if (!keepid) node.removeAttribute('id');
			/*<ltIE9>*/
			if (node.clearAttributes){
				node.clearAttributes();
				node.mergeAttributes(element);
				node.removeAttribute('uniqueNumber');
				if (node.options){
					var no = node.options, eo = element.options;
					for (var j = no.length; j--;) no[j].selected = eo[j].selected;
				}
			}
			/*</ltIE9>*/
			var prop = formProps[element.tagName.toLowerCase()];
			if (prop && element[prop]) node[prop] = element[prop];
		}

		/*<ltIE9>*/
		if (hasCloneBug){
			var co = clone.getElementsByTagName('object'), to = this.getElementsByTagName('object');
			for (i = co.length; i--;) co[i].outerHTML = to[i].outerHTML;
		}
		/*</ltIE9>*/
		return document.id(clone);
	}

});

[Element, Window, Document].invoke('implement', {

	addListener: function(type, fn){
		if (window.attachEvent && !window.addEventListener){
			collected[Slick.uidOf(this)] = this;
		}
		if (this.addEventListener) this.addEventListener(type, fn, !!arguments[2]);
		else this.attachEvent('on' + type, fn);
		return this;
	},

	removeListener: function(type, fn){
		if (this.removeEventListener) this.removeEventListener(type, fn, !!arguments[2]);
		else this.detachEvent('on' + type, fn);
		return this;
	},

	retrieve: function(property, dflt){
		var storage = get(Slick.uidOf(this)), prop = storage[property];
		if (dflt != null && prop == null) prop = storage[property] = dflt;
		return prop != null ? prop : null;
	},

	store: function(property, value){
		var storage = get(Slick.uidOf(this));
		storage[property] = value;
		return this;
	},

	eliminate: function(property){
		var storage = get(Slick.uidOf(this));
		delete storage[property];
		return this;
	}

});

/*<ltIE9>*/
if (window.attachEvent && !window.addEventListener){
	var gc = function(){
		Object.each(collected, clean);
		if (window.CollectGarbage) CollectGarbage();
		window.removeListener('unload', gc);
	};
	window.addListener('unload', gc);
}
/*</ltIE9>*/

Element.Properties = {};



Element.Properties.style = {

	set: function(style){
		this.style.cssText = style;
	},

	get: function(){
		return this.style.cssText;
	},

	erase: function(){
		this.style.cssText = '';
	}

};

Element.Properties.tag = {

	get: function(){
		return this.tagName.toLowerCase();
	}

};

Element.Properties.html = {

	set: function(html){
		if (html == null) html = '';
		else if (typeOf(html) == 'array') html = html.join('');

		/*<ltIE9>*/
		if (this.styleSheet && !canChangeStyleHTML) this.styleSheet.cssText = html;
		else /*</ltIE9>*/this.innerHTML = html;
	},
	erase: function(){
		this.set('html', '');
	}

};

var supportsHTML5Elements = true, supportsTableInnerHTML = true, supportsTRInnerHTML = true;

/*<ltIE9>*/
// technique by jdbarlett - http://jdbartlett.com/innershiv/
var div = document.createElement('div');
div.innerHTML = '<nav></nav>';
supportsHTML5Elements = (div.childNodes.length == 1);
if (!supportsHTML5Elements){
	var tags = 'abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video'.split(' '),
		fragment = document.createDocumentFragment(), l = tags.length;
	while (l--) fragment.createElement(tags[l]);
}
div = null;
/*</ltIE9>*/

/*<IE>*/
supportsTableInnerHTML = Function.attempt(function(){
	var table = document.createElement('table');
	table.innerHTML = '<tr><td></td></tr>';
	return true;
});

/*<ltFF4>*/
var tr = document.createElement('tr'), html = '<td></td>';
tr.innerHTML = html;
supportsTRInnerHTML = (tr.innerHTML == html);
tr = null;
/*</ltFF4>*/

if (!supportsTableInnerHTML || !supportsTRInnerHTML || !supportsHTML5Elements){

	Element.Properties.html.set = (function(set){

		var translations = {
			table: [1, '<table>', '</table>'],
			select: [1, '<select>', '</select>'],
			tbody: [2, '<table><tbody>', '</tbody></table>'],
			tr: [3, '<table><tbody><tr>', '</tr></tbody></table>']
		};

		translations.thead = translations.tfoot = translations.tbody;

		return function(html){

			/*<ltIE9>*/
			if (this.styleSheet) return set.call(this, html);
			/*</ltIE9>*/
			var wrap = translations[this.get('tag')];
			if (!wrap && !supportsHTML5Elements) wrap = [0, '', ''];
			if (!wrap) return set.call(this, html);

			var level = wrap[0], wrapper = document.createElement('div'), target = wrapper;
			if (!supportsHTML5Elements) fragment.appendChild(wrapper);
			wrapper.innerHTML = [wrap[1], html, wrap[2]].flatten().join('');
			while (level--) target = target.firstChild;
			this.empty().adopt(target.childNodes);
			if (!supportsHTML5Elements) fragment.removeChild(wrapper);
			wrapper = null;
		};

	})(Element.Properties.html.set);
}
/*</IE>*/

/*<ltIE9>*/
var testForm = document.createElement('form');
testForm.innerHTML = '<select><option>s</option></select>';

if (testForm.firstChild.value != 's') Element.Properties.value = {

	set: function(value){
		var tag = this.get('tag');
		if (tag != 'select') return this.setProperty('value', value);
		var options = this.getElements('option');
		value = String(value);
		for (var i = 0; i < options.length; i++){
			var option = options[i],
				attr = option.getAttributeNode('value'),
				optionValue = (attr && attr.specified) ? option.value : option.get('text');
			if (optionValue === value) return option.selected = true;
		}
	},

	get: function(){
		var option = this, tag = option.get('tag');

		if (tag != 'select' && tag != 'option') return this.getProperty('value');

		if (tag == 'select' && !(option = option.getSelected()[0])) return '';

		var attr = option.getAttributeNode('value');
		return (attr && attr.specified) ? option.value : option.get('text');
	}

};
testForm = null;
/*</ltIE9>*/

/*<IE>*/
if (document.createElement('div').getAttributeNode('id')) Element.Properties.id = {
	set: function(id){
		this.id = this.getAttributeNode('id').value = id;
	},
	get: function(){
		return this.id || null;
	},
	erase: function(){
		this.id = this.getAttributeNode('id').value = '';
	}
};
/*</IE>*/

})();

/*
---

name: Event

description: Contains the Event Type, to make the event object cross-browser.

license: MIT-style license.

requires: [Window, Document, Array, Function, String, Object]

provides: Event

...
*/

(function(){

var _keys = {};
var normalizeWheelSpeed = function(event){
    var normalized;
    if (event.wheelDelta){
        normalized = event.wheelDelta % 120 == 0 ? event.wheelDelta / 120 : event.wheelDelta / 12;
    } else {
        var rawAmount = event.deltaY || event.detail || 0;
        normalized = -(rawAmount % 3 == 0 ? rawAmount / 3 : rawAmount * 10);
    }
    return normalized;
}

var DOMEvent = this.DOMEvent = new Type('DOMEvent', function(event, win){
	if (!win) win = window;
	event = event || win.event;
	if (event.$extended) return event;
	this.event = event;
	this.$extended = true;
	this.shift = event.shiftKey;
	this.control = event.ctrlKey;
	this.alt = event.altKey;
	this.meta = event.metaKey;
	var type = this.type = event.type;
	var target = event.target || event.srcElement;
	while (target && target.nodeType == 3) target = target.parentNode;
	this.target = document.id(target);

	if (type.indexOf('key') == 0){
		var code = this.code = (event.which || event.keyCode);
		if (!this.shift || type != 'keypress') this.key = _keys[code];
		if (type == 'keydown' || type == 'keyup'){
			if (code > 111 && code < 124) this.key = 'f' + (code - 111);
			else if (code > 95 && code < 106) this.key = code - 96;
		}
		if (this.key == null) this.key = String.fromCharCode(code).toLowerCase();
	} else if (type == 'click' || type == 'dblclick' || type == 'contextmenu' || type == 'wheel' || type == 'DOMMouseScroll' || type.indexOf('mouse') == 0){
		var doc = win.document;
		doc = (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.html : doc.body;
		this.page = {
			x: (event.pageX != null) ? event.pageX : event.clientX + doc.scrollLeft,
			y: (event.pageY != null) ? event.pageY : event.clientY + doc.scrollTop
		};
		this.client = {
			x: (event.pageX != null) ? event.pageX - win.pageXOffset : event.clientX,
			y: (event.pageY != null) ? event.pageY - win.pageYOffset : event.clientY
		};
		if (type == 'DOMMouseScroll' || type == 'wheel' || type == 'mousewheel') this.wheel = normalizeWheelSpeed(event);
		this.rightClick = (event.which == 3 || event.button == 2);
		if (type == 'mouseover' || type == 'mouseout' || type == 'mouseenter' || type == 'mouseleave'){
			var overTarget = type == 'mouseover' || type == 'mouseenter';
			var related = event.relatedTarget || event[(overTarget ? 'from' : 'to') + 'Element'];
			while (related && related.nodeType == 3) related = related.parentNode;
			this.relatedTarget = document.id(related);
		}
	} else if (type.indexOf('touch') == 0 || type.indexOf('gesture') == 0){
		this.rotation = event.rotation;
		this.scale = event.scale;
		this.targetTouches = event.targetTouches;
		this.changedTouches = event.changedTouches;
		var touches = this.touches = event.touches;
		if (touches && touches[0]){
			var touch = touches[0];
			this.page = {x: touch.pageX, y: touch.pageY};
			this.client = {x: touch.clientX, y: touch.clientY};
		}
	}

	if (!this.client) this.client = {};
	if (!this.page) this.page = {};
});

DOMEvent.implement({

	stop: function(){
		return this.preventDefault().stopPropagation();
	},

	stopPropagation: function(){
		if (this.event.stopPropagation) this.event.stopPropagation();
		else this.event.cancelBubble = true;
		return this;
	},

	preventDefault: function(){
		if (this.event.preventDefault) this.event.preventDefault();
		else this.event.returnValue = false;
		return this;
	}

});

DOMEvent.defineKey = function(code, key){
	_keys[code] = key;
	return this;
};

DOMEvent.defineKeys = DOMEvent.defineKey.overloadSetter(true);

DOMEvent.defineKeys({
	'38': 'up', '40': 'down', '37': 'left', '39': 'right',
	'27': 'esc', '32': 'space', '8': 'backspace', '9': 'tab',
	'46': 'delete', '13': 'enter'
});

})();





/*
---

name: Element.Event

description: Contains Element methods for dealing with events. This file also includes mouseenter and mouseleave custom Element Events, if necessary.

license: MIT-style license.

requires: [Element, Event]

provides: Element.Event

...
*/

(function(){

Element.Properties.events = {set: function(events){
	this.addEvents(events);
}};

[Element, Window, Document].invoke('implement', {

	addEvent: function(type, fn){
		var events = this.retrieve('events', {});
		if (!events[type]) events[type] = {keys: [], values: []};
		if (events[type].keys.contains(fn)) return this;
		events[type].keys.push(fn);
		var realType = type,
			custom = Element.Events[type],
			condition = fn,
			self = this;
		if (custom){
			if (custom.onAdd) custom.onAdd.call(this, fn, type);
			if (custom.condition){
				condition = function(event){
					if (custom.condition.call(this, event, type)) return fn.call(this, event);
					return true;
				};
			}
			if (custom.base) realType = Function.from(custom.base).call(this, type);
		}
		var defn = function(){
			return fn.call(self);
		};
		var nativeEvent = Element.NativeEvents[realType];
		if (nativeEvent){
			if (nativeEvent == 2){
				defn = function(event){
					event = new DOMEvent(event, self.getWindow());
					if (condition.call(self, event) === false) event.stop();
				};
			}
			this.addListener(realType, defn, arguments[2]);
		}
		events[type].values.push(defn);
		return this;
	},

	removeEvent: function(type, fn){
		var events = this.retrieve('events');
		if (!events || !events[type]) return this;
		var list = events[type];
		var index = list.keys.indexOf(fn);
		if (index == -1) return this;
		var value = list.values[index];
		delete list.keys[index];
		delete list.values[index];
		var custom = Element.Events[type];
		if (custom){
			if (custom.onRemove) custom.onRemove.call(this, fn, type);
			if (custom.base) type = Function.from(custom.base).call(this, type);
		}
		return (Element.NativeEvents[type]) ? this.removeListener(type, value, arguments[2]) : this;
	},

	addEvents: function(events){
		for (var event in events) this.addEvent(event, events[event]);
		return this;
	},

	removeEvents: function(events){
		var type;
		if (typeOf(events) == 'object'){
			for (type in events) this.removeEvent(type, events[type]);
			return this;
		}
		var attached = this.retrieve('events');
		if (!attached) return this;
		if (!events){
			for (type in attached) this.removeEvents(type);
			this.eliminate('events');
		} else if (attached[events]){
			attached[events].keys.each(function(fn){
				this.removeEvent(events, fn);
			}, this);
			delete attached[events];
		}
		return this;
	},

	fireEvent: function(type, args, delay){
		var events = this.retrieve('events');
		if (!events || !events[type]) return this;
		args = Array.from(args);

		events[type].keys.each(function(fn){
			if (delay) fn.delay(delay, this, args);
			else fn.apply(this, args);
		}, this);
		return this;
	},

	cloneEvents: function(from, type){
		from = document.id(from);
		var events = from.retrieve('events');
		if (!events) return this;
		if (!type){
			for (var eventType in events) this.cloneEvents(from, eventType);
		} else if (events[type]){
			events[type].keys.each(function(fn){
				this.addEvent(type, fn);
			}, this);
		}
		return this;
	}

});

Element.NativeEvents = {
	click: 2, dblclick: 2, mouseup: 2, mousedown: 2, contextmenu: 2, //mouse buttons
	wheel: 2, mousewheel: 2, DOMMouseScroll: 2, //mouse wheel
	mouseover: 2, mouseout: 2, mousemove: 2, selectstart: 2, selectend: 2, //mouse movement
	keydown: 2, keypress: 2, keyup: 2, //keyboard
	orientationchange: 2, // mobile
	touchstart: 2, touchmove: 2, touchend: 2, touchcancel: 2, // touch
	gesturestart: 2, gesturechange: 2, gestureend: 2, // gesture
	focus: 2, blur: 2, change: 2, reset: 2, select: 2, submit: 2, paste: 2, input: 2, //form elements
	load: 2, unload: 1, beforeunload: 2, resize: 1, move: 1, DOMContentLoaded: 1, readystatechange: 1, //window
	hashchange: 1, popstate: 2, pageshow: 2, pagehide: 2, // history
	error: 1, abort: 1, scroll: 1, message: 2 //misc
};

Element.Events = {
	mousewheel: {
		base: 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll'
	}
};

var check = function(event){
	var related = event.relatedTarget;
	if (related == null) return true;
	if (!related) return false;
	return (related != this && related.prefix != 'xul' && typeOf(this) != 'document' && !this.contains(related));
};

if ('onmouseenter' in document.documentElement){
	Element.NativeEvents.mouseenter = Element.NativeEvents.mouseleave = 2;
	Element.MouseenterCheck = check;
} else {
	Element.Events.mouseenter = {
		base: 'mouseover',
		condition: check
	};

	Element.Events.mouseleave = {
		base: 'mouseout',
		condition: check
	};
}

/*<ltIE9>*/
if (!window.addEventListener){
	Element.NativeEvents.propertychange = 2;
	Element.Events.change = {
		base: function(){
			var type = this.type;
			return (this.get('tag') == 'input' && (type == 'radio' || type == 'checkbox')) ? 'propertychange' : 'change';
		},
		condition: function(event){
			return event.type != 'propertychange' || event.event.propertyName == 'checked';
		}
	};
}
/*</ltIE9>*/



})();

/*
---

name: Element.Delegation

description: Extends the Element native object to include the delegate method for more efficient event management.

license: MIT-style license.

requires: [Element.Event]

provides: [Element.Delegation]

...
*/

(function(){

var eventListenerSupport = !!window.addEventListener;

Element.NativeEvents.focusin = Element.NativeEvents.focusout = 2;

var bubbleUp = function(self, match, fn, event, target){
	while (target && target != self){
		if (match(target, event)) return fn.call(target, event, target);
		target = document.id(target.parentNode);
	}
};

var map = {
	mouseenter: {
		base: 'mouseover',
		condition: Element.MouseenterCheck
	},
	mouseleave: {
		base: 'mouseout',
		condition: Element.MouseenterCheck
	},
	focus: {
		base: 'focus' + (eventListenerSupport ? '' : 'in'),
		capture: true
	},
	blur: {
		base: eventListenerSupport ? 'blur' : 'focusout',
		capture: true
	}
};

/*<ltIE9>*/
var _key = '$delegation:';
var formObserver = function(type){

	return {

		base: 'focusin',

		remove: function(self, uid){
			var list = self.retrieve(_key + type + 'listeners', {})[uid];
			if (list && list.forms) for (var i = list.forms.length; i--;){
				// the form may have been destroyed, so it won't have the
				// removeEvent method anymore. In that case the event was
				// removed as well.
				if (list.forms[i].removeEvent) list.forms[i].removeEvent(type, list.fns[i]);
			}
		},

		listen: function(self, match, fn, event, target, uid){
			var form = (target.get('tag') == 'form') ? target : event.target.getParent('form');
			if (!form) return;

			var listeners = self.retrieve(_key + type + 'listeners', {}),
				listener = listeners[uid] || {forms: [], fns: []},
				forms = listener.forms, fns = listener.fns;

			if (forms.indexOf(form) != -1) return;
			forms.push(form);

			var _fn = function(event){
				bubbleUp(self, match, fn, event, target);
			};
			form.addEvent(type, _fn);
			fns.push(_fn);

			listeners[uid] = listener;
			self.store(_key + type + 'listeners', listeners);
		}
	};
};

var inputObserver = function(type){
	return {
		base: 'focusin',
		listen: function(self, match, fn, event, target){
			var events = {blur: function(){
				this.removeEvents(events);
			}};
			events[type] = function(event){
				bubbleUp(self, match, fn, event, target);
			};
			event.target.addEvents(events);
		}
	};
};

if (!eventListenerSupport) Object.append(map, {
	submit: formObserver('submit'),
	reset: formObserver('reset'),
	change: inputObserver('change'),
	select: inputObserver('select')
});
/*</ltIE9>*/

var proto = Element.prototype,
	addEvent = proto.addEvent,
	removeEvent = proto.removeEvent;

var relay = function(old, method){
	return function(type, fn, useCapture){
		if (type.indexOf(':relay') == -1) return old.call(this, type, fn, useCapture);
		var parsed = Slick.parse(type).expressions[0][0];
		if (parsed.pseudos[0].key != 'relay') return old.call(this, type, fn, useCapture);
		var newType = parsed.tag;
		parsed.pseudos.slice(1).each(function(pseudo){
			newType += ':' + pseudo.key + (pseudo.value ? '(' + pseudo.value + ')' : '');
		});
		old.call(this, type, fn);
		return method.call(this, newType, parsed.pseudos[0].value, fn);
	};
};

var delegation = {

	addEvent: function(type, match, fn){
		var storage = this.retrieve('$delegates', {}), stored = storage[type];
		if (stored) for (var _uid in stored){
			if (stored[_uid].fn == fn && stored[_uid].match == match) return this;
		}

		var _type = type, _match = match, _fn = fn, _map = map[type] || {};
		type = _map.base || _type;

		match = function(target){
			return Slick.match(target, _match);
		};

		var elementEvent = Element.Events[_type];
		if (_map.condition || elementEvent && elementEvent.condition){
			var __match = match, condition = _map.condition || elementEvent.condition;
			match = function(target, event){
				return __match(target, event) && condition.call(target, event, type);
			};
		}

		var self = this, uid = String.uniqueID();
		var delegator = _map.listen ? function(event, target){
			if (!target && event && event.target) target = event.target;
			if (target) _map.listen(self, match, fn, event, target, uid);
		} : function(event, target){
			if (!target && event && event.target) target = event.target;
			if (target) bubbleUp(self, match, fn, event, target);
		};

		if (!stored) stored = {};
		stored[uid] = {
			match: _match,
			fn: _fn,
			delegator: delegator
		};
		storage[_type] = stored;
		return addEvent.call(this, type, delegator, _map.capture);
	},

	removeEvent: function(type, match, fn, _uid){
		var storage = this.retrieve('$delegates', {}), stored = storage[type];
		if (!stored) return this;

		if (_uid){
			var _type = type, delegator = stored[_uid].delegator, _map = map[type] || {};
			type = _map.base || _type;
			if (_map.remove) _map.remove(this, _uid);
			delete stored[_uid];
			storage[_type] = stored;
			return removeEvent.call(this, type, delegator, _map.capture);
		}

		var __uid, s;
		if (fn) for (__uid in stored){
			s = stored[__uid];
			if (s.match == match && s.fn == fn) return delegation.removeEvent.call(this, type, match, fn, __uid);
		} else for (__uid in stored){
			s = stored[__uid];
			if (s.match == match) delegation.removeEvent.call(this, type, match, s.fn, __uid);
		}
		return this;
	}

};

[Element, Window, Document].invoke('implement', {
	addEvent: relay(addEvent, delegation.addEvent),
	removeEvent: relay(removeEvent, delegation.removeEvent)
});

})();

/*
---

name: Element.Style

description: Contains methods for interacting with the styles of Elements in a fashionable way.

license: MIT-style license.

requires: Element

provides: Element.Style

...
*/

(function(){

var html = document.html, el;

//<ltIE9>
// Check for oldIE, which does not remove styles when they're set to null
el = document.createElement('div');
el.style.color = 'red';
el.style.color = null;
var doesNotRemoveStyles = el.style.color == 'red';

// check for oldIE, which returns border* shorthand styles in the wrong order (color-width-style instead of width-style-color)
var border = '1px solid #123abc';
el.style.border = border;
var returnsBordersInWrongOrder = el.style.border != border;
el = null;
//</ltIE9>

var hasGetComputedStyle = !!window.getComputedStyle,
	supportBorderRadius = document.createElement('div').style.borderRadius != null;

Element.Properties.styles = {set: function(styles){
	this.setStyles(styles);
}};

var hasOpacity = (html.style.opacity != null),
	hasFilter = (html.style.filter != null),
	reAlpha = /alpha\(opacity=([\d.]+)\)/i;

var setVisibility = function(element, opacity){
	element.store('$opacity', opacity);
	element.style.visibility = opacity > 0 || opacity == null ? 'visible' : 'hidden';
};

//<ltIE9>
var setFilter = function(element, regexp, value){
	var style = element.style,
		filter = style.filter || element.getComputedStyle('filter') || '';
	style.filter = (regexp.test(filter) ? filter.replace(regexp, value) : filter + ' ' + value).trim();
	if (!style.filter) style.removeAttribute('filter');
};
//</ltIE9>

var setOpacity = (hasOpacity ? function(element, opacity){
	element.style.opacity = opacity;
} : (hasFilter ? function(element, opacity){
	if (!element.currentStyle || !element.currentStyle.hasLayout) element.style.zoom = 1;
	if (opacity == null || opacity == 1){
		setFilter(element, reAlpha, '');
		if (opacity == 1 && getOpacity(element) != 1) setFilter(element, reAlpha, 'alpha(opacity=100)');
	} else {
		setFilter(element, reAlpha, 'alpha(opacity=' + (opacity * 100).limit(0, 100).round() + ')');
	}
} : setVisibility));

var getOpacity = (hasOpacity ? function(element){
	var opacity = element.style.opacity || element.getComputedStyle('opacity');
	return (opacity == '') ? 1 : opacity.toFloat();
} : (hasFilter ? function(element){
	var filter = (element.style.filter || element.getComputedStyle('filter')),
		opacity;
	if (filter) opacity = filter.match(reAlpha);
	return (opacity == null || filter == null) ? 1 : (opacity[1] / 100);
} : function(element){
	var opacity = element.retrieve('$opacity');
	if (opacity == null) opacity = (element.style.visibility == 'hidden' ? 0 : 1);
	return opacity;
}));

var floatName = (html.style.cssFloat == null) ? 'styleFloat' : 'cssFloat',
	namedPositions = {left: '0%', top: '0%', center: '50%', right: '100%', bottom: '100%'},
	hasBackgroundPositionXY = (html.style.backgroundPositionX != null),
	prefixPattern = /^-(ms)-/;

var camelCase = function(property){
	return property.replace(prefixPattern, '$1-').camelCase();
}

//<ltIE9>
var removeStyle = function(style, property){
	if (property == 'backgroundPosition'){
		style.removeAttribute(property + 'X');
		property += 'Y';
	}
	style.removeAttribute(property);
};
//</ltIE9>

Element.implement({

	getComputedStyle: function(property){
		if (!hasGetComputedStyle && this.currentStyle) return this.currentStyle[camelCase(property)];
		var defaultView = Element.getDocument(this).defaultView,
			computed = defaultView ? defaultView.getComputedStyle(this, null) : null;
		return (computed) ? computed.getPropertyValue((property == floatName) ? 'float' : property.hyphenate()) : '';
	},

	setStyle: function(property, value){
		if (property == 'opacity'){
			if (value != null) value = parseFloat(value);
			setOpacity(this, value);
			return this;
		}
		property = camelCase(property == 'float' ? floatName : property);
		if (typeOf(value) != 'string'){
			var map = (Element.Styles[property] || '@').split(' ');
			value = Array.from(value).map(function(val, i){
				if (!map[i]) return '';
				return (typeOf(val) == 'number') ? map[i].replace('@', Math.round(val)) : val;
			}).join(' ');
		} else if (value == String(Number(value))){
			value = Math.round(value);
		}
		this.style[property] = value;
		//<ltIE9>
		if ((value == '' || value == null) && doesNotRemoveStyles && this.style.removeAttribute){
			removeStyle(this.style, property);
		}
		//</ltIE9>
		return this;
	},

	getStyle: function(property){
		if (property == 'opacity') return getOpacity(this);
		property = camelCase(property == 'float' ? floatName : property);
		if (supportBorderRadius && property.indexOf('borderRadius') != -1){
			return ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'].map(function(corner){
				return this.style[corner] || '0px';
			}, this).join(' ');
		}
		var result = this.style[property];
		if (!result || property == 'zIndex'){
			if (Element.ShortStyles.hasOwnProperty(property)){
				result = [];
				for (var s in Element.ShortStyles[property]) result.push(this.getStyle(s));
				return result.join(' ');
			}
			result = this.getComputedStyle(property);
		}
		if (hasBackgroundPositionXY && /^backgroundPosition[XY]?$/.test(property)){
			return result.replace(/(top|right|bottom|left)/g, function(position){
				return namedPositions[position];
			}) || '0px';
		}
		if (!result && property == 'backgroundPosition') return '0px 0px';
		if (result){
			result = String(result);
			var color = result.match(/rgba?\([\d\s,]+\)/);
			if (color) result = result.replace(color[0], color[0].rgbToHex());
		}
		if (!hasGetComputedStyle && !this.style[property]){
			if ((/^(height|width)$/).test(property) && !(/px$/.test(result))){
				var values = (property == 'width') ? ['left', 'right'] : ['top', 'bottom'], size = 0;
				values.each(function(value){
					size += this.getStyle('border-' + value + '-width').toInt() + this.getStyle('padding-' + value).toInt();
				}, this);
				return this['offset' + property.capitalize()] - size + 'px';
			}
			if ((/^border(.+)Width|margin|padding/).test(property) && isNaN(parseFloat(result))){
				return '0px';
			}
		}
		//<ltIE9>
		if (returnsBordersInWrongOrder && /^border(Top|Right|Bottom|Left)?$/.test(property) && /^#/.test(result)){
			return result.replace(/^(.+)\s(.+)\s(.+)$/, '$2 $3 $1');
		}
		//</ltIE9>

		return result;
	},

	setStyles: function(styles){
		for (var style in styles) this.setStyle(style, styles[style]);
		return this;
	},

	getStyles: function(){
		var result = {};
		Array.flatten(arguments).each(function(key){
			result[key] = this.getStyle(key);
		}, this);
		return result;
	}

});

Element.Styles = {
	left: '@px', top: '@px', bottom: '@px', right: '@px',
	width: '@px', height: '@px', maxWidth: '@px', maxHeight: '@px', minWidth: '@px', minHeight: '@px',
	backgroundColor: 'rgb(@, @, @)', backgroundSize: '@px', backgroundPosition: '@px @px', color: 'rgb(@, @, @)',
	fontSize: '@px', letterSpacing: '@px', lineHeight: '@px', clip: 'rect(@px @px @px @px)',
	margin: '@px @px @px @px', padding: '@px @px @px @px', border: '@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)',
	borderWidth: '@px @px @px @px', borderStyle: '@ @ @ @', borderColor: 'rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)',
	zIndex: '@', 'zoom': '@', fontWeight: '@', textIndent: '@px', opacity: '@', borderRadius: '@px @px @px @px'
};





Element.ShortStyles = {margin: {}, padding: {}, border: {}, borderWidth: {}, borderStyle: {}, borderColor: {}};

['Top', 'Right', 'Bottom', 'Left'].each(function(direction){
	var Short = Element.ShortStyles;
	var All = Element.Styles;
	['margin', 'padding'].each(function(style){
		var sd = style + direction;
		Short[style][sd] = All[sd] = '@px';
	});
	var bd = 'border' + direction;
	Short.border[bd] = All[bd] = '@px @ rgb(@, @, @)';
	var bdw = bd + 'Width', bds = bd + 'Style', bdc = bd + 'Color';
	Short[bd] = {};
	Short.borderWidth[bdw] = Short[bd][bdw] = All[bdw] = '@px';
	Short.borderStyle[bds] = Short[bd][bds] = All[bds] = '@';
	Short.borderColor[bdc] = Short[bd][bdc] = All[bdc] = 'rgb(@, @, @)';
});

if (hasBackgroundPositionXY) Element.ShortStyles.backgroundPosition = {backgroundPositionX: '@', backgroundPositionY: '@'};
})();

/*
---

name: Element.Dimensions

description: Contains methods to work with size, scroll, or positioning of Elements and the window object.

license: MIT-style license.

credits:
  - Element positioning based on the [qooxdoo](http://qooxdoo.org/) code and smart browser fixes, [LGPL License](http://www.gnu.org/licenses/lgpl.html).
  - Viewport dimensions based on [YUI](http://developer.yahoo.com/yui/) code, [BSD License](http://developer.yahoo.com/yui/license.html).

requires: [Element, Element.Style]

provides: [Element.Dimensions]

...
*/

(function(){

var element = document.createElement('div'),
	child = document.createElement('div');
element.style.height = '0';
element.appendChild(child);
var brokenOffsetParent = (child.offsetParent === element);
element = child = null;

var heightComponents = ['height', 'paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth'],
	widthComponents = ['width', 'paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'];

var svgCalculateSize = function(el){

	var gCS = window.getComputedStyle(el),
		bounds = {x: 0, y: 0};

	heightComponents.each(function(css){
		bounds.y += parseFloat(gCS[css]);
	});
	widthComponents.each(function(css){
		bounds.x += parseFloat(gCS[css]);
	});
	return bounds;
};

var isOffset = function(el){
	return styleString(el, 'position') != 'static' || isBody(el);
};

var isOffsetStatic = function(el){
	return isOffset(el) || (/^(?:table|td|th)$/i).test(el.tagName);
};

Element.implement({

	scrollTo: function(x, y){
		if (isBody(this)){
			this.getWindow().scrollTo(x, y);
		} else {
			this.scrollLeft = x;
			this.scrollTop = y;
		}
		return this;
	},

	getSize: function(){
		if (isBody(this)) return this.getWindow().getSize();

		//<ltIE9>
		// This if clause is because IE8- cannot calculate getBoundingClientRect of elements with visibility hidden.
		if (!window.getComputedStyle) return {x: this.offsetWidth, y: this.offsetHeight};
		//</ltIE9>

		// This svg section under, calling `svgCalculateSize()`, can be removed when FF fixed the svg size bug.
		// Bug info: https://bugzilla.mozilla.org/show_bug.cgi?id=530985
		if (this.get('tag') == 'svg') return svgCalculateSize(this);
		
		try {
			var bounds = this.getBoundingClientRect();
			return {x: bounds.width, y: bounds.height};
		} catch(e) {
			return {x: 0, y: 0};
		}
	},

	getScrollSize: function(){
		if (isBody(this)) return this.getWindow().getScrollSize();
		return {x: this.scrollWidth, y: this.scrollHeight};
	},

	getScroll: function(){
		if (isBody(this)) return this.getWindow().getScroll();
		return {x: this.scrollLeft, y: this.scrollTop};
	},

	getScrolls: function(){
		var element = this.parentNode, position = {x: 0, y: 0};
		while (element && !isBody(element)){
			position.x += element.scrollLeft;
			position.y += element.scrollTop;
			element = element.parentNode;
		}
		return position;
	},

	getOffsetParent: brokenOffsetParent ? function(){
		var element = this;
		if (isBody(element) || styleString(element, 'position') == 'fixed') return null;

		var isOffsetCheck = (styleString(element, 'position') == 'static') ? isOffsetStatic : isOffset;
		while ((element = element.parentNode)){
			if (isOffsetCheck(element)) return element;
		}
		return null;
	} : function(){
		var element = this;
		if (isBody(element) || styleString(element, 'position') == 'fixed') return null;

		try {
			return element.offsetParent;
		} catch(e){}
		return null;
	},

	getOffsets: function(){
		var hasGetBoundingClientRect = this.getBoundingClientRect;

		if (hasGetBoundingClientRect){
			var bound = this.getBoundingClientRect(),
				html = document.id(this.getDocument().documentElement),
				htmlScroll = html.getScroll(),
				elemScrolls = this.getScrolls(),
				isFixed = (styleString(this, 'position') == 'fixed');

			return {
				x: bound.left.toInt() + elemScrolls.x + ((isFixed) ? 0 : htmlScroll.x) - html.clientLeft,
				y: bound.top.toInt() + elemScrolls.y + ((isFixed) ? 0 : htmlScroll.y) - html.clientTop
			};
		}

		var element = this, position = {x: 0, y: 0};
		if (isBody(this)) return position;

		while (element && !isBody(element)){
			position.x += element.offsetLeft;
			position.y += element.offsetTop;

			element = element.offsetParent;
		}

		return position;
	},

	getPosition: function(relative){
		var offset = this.getOffsets(),
			scroll = this.getScrolls();
		var position = {
			x: offset.x - scroll.x,
			y: offset.y - scroll.y
		};

		if (relative && (relative = document.id(relative))){
			var relativePosition = relative.getPosition();
			return {x: position.x - relativePosition.x - leftBorder(relative), y: position.y - relativePosition.y - topBorder(relative)};
		}
		return position;
	},

	getCoordinates: function(element){
		if (isBody(this)) return this.getWindow().getCoordinates();
		var position = this.getPosition(element),
			size = this.getSize();
		var obj = {
			left: position.x,
			top: position.y,
			width: size.x,
			height: size.y
		};
		obj.right = obj.left + obj.width;
		obj.bottom = obj.top + obj.height;
		return obj;
	},

	computePosition: function(obj){
		return {
			left: obj.x - styleNumber(this, 'margin-left'),
			top: obj.y - styleNumber(this, 'margin-top')
		};
	},

	setPosition: function(obj){
		return this.setStyles(this.computePosition(obj));
	}

});


[Document, Window].invoke('implement', {

	getSize: function(){
		var doc = getCompatElement(this);
		return {x: doc.clientWidth, y: doc.clientHeight};
	},

	getScroll: function(){
		var win = this.getWindow(), doc = getCompatElement(this);
		return {x: win.pageXOffset || doc.scrollLeft, y: win.pageYOffset || doc.scrollTop};
	},

	getScrollSize: function(){
		var doc = getCompatElement(this),
			min = this.getSize(),
			body = this.getDocument().body;

		return {x: Math.max(doc.scrollWidth, body.scrollWidth, min.x), y: Math.max(doc.scrollHeight, body.scrollHeight, min.y)};
	},

	getPosition: function(){
		return {x: 0, y: 0};
	},

	getCoordinates: function(){
		var size = this.getSize();
		return {top: 0, left: 0, bottom: size.y, right: size.x, height: size.y, width: size.x};
	}

});

// private methods

var styleString = Element.getComputedStyle;

function styleNumber(element, style){
	return styleString(element, style).toInt() || 0;
}

function borderBox(element){
	return styleString(element, '-moz-box-sizing') == 'border-box';
}

function topBorder(element){
	return styleNumber(element, 'border-top-width');
}

function leftBorder(element){
	return styleNumber(element, 'border-left-width');
}

function isBody(element){
	return (/^(?:body|html)$/i).test(element.tagName);
}

function getCompatElement(element){
	var doc = element.getDocument();
	return (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.html : doc.body;
}

})();

//aliases
Element.alias({position: 'setPosition'}); //compatability

[Window, Document, Element].invoke('implement', {

	getHeight: function(){
		return this.getSize().y;
	},

	getWidth: function(){
		return this.getSize().x;
	},

	getScrollTop: function(){
		return this.getScroll().y;
	},

	getScrollLeft: function(){
		return this.getScroll().x;
	},

	getScrollHeight: function(){
		return this.getScrollSize().y;
	},

	getScrollWidth: function(){
		return this.getScrollSize().x;
	},

	getTop: function(){
		return this.getPosition().y;
	},

	getLeft: function(){
		return this.getPosition().x;
	}

});

/*
---

name: Fx

description: Contains the basic animation logic to be extended by all other Fx Classes.

license: MIT-style license.

requires: [Chain, Events, Options]

provides: Fx

...
*/

(function(){

var Fx = this.Fx = new Class({

	Implements: [Chain, Events, Options],

	options: {
		/*
		onStart: nil,
		onCancel: nil,
		onComplete: nil,
		*/
		fps: 60,
		unit: false,
		duration: 500,
		frames: null,
		frameSkip: true,
		link: 'ignore'
	},

	initialize: function(options){
		this.subject = this.subject || this;
		this.setOptions(options);
	},

	getTransition: function(){
		return function(p){
			return -(Math.cos(Math.PI * p) - 1) / 2;
		};
	},

	step: function(now){
		if (this.options.frameSkip){
			var diff = (this.time != null) ? (now - this.time) : 0, frames = diff / this.frameInterval;
			this.time = now;
			this.frame += frames;
		} else {
			this.frame++;
		}

		if (this.frame < this.frames){
			var delta = this.transition(this.frame / this.frames);
			this.set(this.compute(this.from, this.to, delta));
		} else {
			this.frame = this.frames;
			this.set(this.compute(this.from, this.to, 1));
			this.stop();
		}
	},

	set: function(now){
		return now;
	},

	compute: function(from, to, delta){
		return Fx.compute(from, to, delta);
	},

	check: function(){
		if (!this.isRunning()) return true;
		switch (this.options.link){
			case 'cancel': this.cancel(); return true;
			case 'chain': this.chain(this.caller.pass(arguments, this)); return false;
		}
		return false;
	},

	start: function(from, to){
		if (!this.check(from, to)) return this;
		this.from = from;
		this.to = to;
		this.frame = (this.options.frameSkip) ? 0 : -1;
		this.time = null;
		this.transition = this.getTransition();
		var frames = this.options.frames, fps = this.options.fps, duration = this.options.duration;
		this.duration = Fx.Durations[duration] || duration.toInt();
		this.frameInterval = 1000 / fps;
		this.frames = frames || Math.round(this.duration / this.frameInterval);
		this.fireEvent('start', this.subject);
		pushInstance.call(this, fps);
		return this;
	},

	stop: function(){
		if (this.isRunning()){
			this.time = null;
			pullInstance.call(this, this.options.fps);
			if (this.frames == this.frame){
				this.fireEvent('complete', this.subject);
				if (!this.callChain()) this.fireEvent('chainComplete', this.subject);
			} else {
				this.fireEvent('stop', this.subject);
			}
		}
		return this;
	},

	cancel: function(){
		if (this.isRunning()){
			this.time = null;
			pullInstance.call(this, this.options.fps);
			this.frame = this.frames;
			this.fireEvent('cancel', this.subject).clearChain();
		}
		return this;
	},

	pause: function(){
		if (this.isRunning()){
			this.time = null;
			pullInstance.call(this, this.options.fps);
		}
		return this;
	},

	resume: function(){
		if (this.isPaused()) pushInstance.call(this, this.options.fps);
		return this;
	},

	isRunning: function(){
		var list = instances[this.options.fps];
		return list && list.contains(this);
	},

	isPaused: function(){
		return (this.frame < this.frames) && !this.isRunning();
	}

});

Fx.compute = function(from, to, delta){
	return (to - from) * delta + from;
};

Fx.Durations = {'short': 250, 'normal': 500, 'long': 1000};

// global timers

var instances = {}, timers = {};

var loop = function(){
	var now = Date.now();
	for (var i = this.length; i--;){
		var instance = this[i];
		if (instance) instance.step(now);
	}
};

var pushInstance = function(fps){
	var list = instances[fps] || (instances[fps] = []);
	list.push(this);
	if (!timers[fps]) timers[fps] = loop.periodical(Math.round(1000 / fps), list);
};

var pullInstance = function(fps){
	var list = instances[fps];
	if (list){
		list.erase(this);
		if (!list.length && timers[fps]){
			delete instances[fps];
			timers[fps] = clearInterval(timers[fps]);
		}
	}
};

})();

/*
---

name: Fx.CSS

description: Contains the CSS animation logic. Used by Fx.Tween, Fx.Morph, Fx.Elements.

license: MIT-style license.

requires: [Fx, Element.Style]

provides: Fx.CSS

...
*/

Fx.CSS = new Class({

	Extends: Fx,

	//prepares the base from/to object

	prepare: function(element, property, values){
		values = Array.from(values);
		var from = values[0], to = values[1];
		if (to == null){
			to = from;
			from = element.getStyle(property);
			var unit = this.options.unit;
			// adapted from: https://github.com/ryanmorr/fx/blob/master/fx.js#L299
			if (unit && from && typeof from == 'string' && from.slice(-unit.length) != unit && parseFloat(from) != 0){
				element.setStyle(property, to + unit);
				var value = element.getComputedStyle(property);
				// IE and Opera support pixelLeft or pixelWidth
				if (!(/px$/.test(value))){
					value = element.style[('pixel-' + property).camelCase()];
					if (value == null){
						// adapted from Dean Edwards' http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
						var left = element.style.left;
						element.style.left = to + unit;
						value = element.style.pixelLeft;
						element.style.left = left;
					}
				}
				from = (to || 1) / (parseFloat(value) || 1) * (parseFloat(from) || 0);
				element.setStyle(property, from + unit);
			}
		}
		return {from: this.parse(from), to: this.parse(to)};
	},

	//parses a value into an array

	parse: function(value){
		value = Function.from(value)();
		value = (typeof value == 'string') ? value.split(' ') : Array.from(value);
		return value.map(function(val){
			val = String(val);
			var found = false;
			Object.each(Fx.CSS.Parsers, function(parser, key){
				if (found) return;
				var parsed = parser.parse(val);
				if (parsed || parsed === 0) found = {value: parsed, parser: parser};
			});
			found = found || {value: val, parser: Fx.CSS.Parsers.String};
			return found;
		});
	},

	//computes by a from and to prepared objects, using their parsers.

	compute: function(from, to, delta){
		var computed = [];
		(Math.min(from.length, to.length)).times(function(i){
			computed.push({value: from[i].parser.compute(from[i].value, to[i].value, delta), parser: from[i].parser});
		});
		computed.$family = Function.from('fx:css:value');
		return computed;
	},

	//serves the value as settable

	serve: function(value, unit){
		if (typeOf(value) != 'fx:css:value') value = this.parse(value);
		var returned = [];
		value.each(function(bit){
			returned = returned.concat(bit.parser.serve(bit.value, unit));
		});
		return returned;
	},

	//renders the change to an element

	render: function(element, property, value, unit){
		element.setStyle(property, this.serve(value, unit));
	},

	//searches inside the page css to find the values for a selector

	search: function(selector){
		if (Fx.CSS.Cache[selector]) return Fx.CSS.Cache[selector];
		var to = {}, selectorTest = new RegExp('^' + selector.escapeRegExp() + '$');

		var searchStyles = function(rules){
			Array.each(rules, function(rule, i){
				if (rule.media){
					searchStyles(rule.rules || rule.cssRules);
					return;
				}
				if (!rule.style) return;
				var selectorText = (rule.selectorText) ? rule.selectorText.replace(/^\w+/, function(m){
					return m.toLowerCase();
				}) : null;
				if (!selectorText || !selectorTest.test(selectorText)) return;
				Object.each(Element.Styles, function(value, style){
					if (!rule.style[style] || Element.ShortStyles[style]) return;
					value = String(rule.style[style]);
					to[style] = ((/^rgb/).test(value)) ? value.rgbToHex() : value;
				});
			});
		};

		Array.each(document.styleSheets, function(sheet, j){
			var href = sheet.href;
			if (href && href.indexOf('://') > -1 && href.indexOf(document.domain) == -1) return;
			var rules = sheet.rules || sheet.cssRules;
			searchStyles(rules);
		});
		return Fx.CSS.Cache[selector] = to;
	}

});

Fx.CSS.Cache = {};

Fx.CSS.Parsers = {

	Color: {
		parse: function(value){
			if (value.match(/^#[0-9a-f]{3,6}$/i)) return value.hexToRgb(true);
			return ((value = value.match(/(\d+),\s*(\d+),\s*(\d+)/))) ? [value[1], value[2], value[3]] : false;
		},
		compute: function(from, to, delta){
			return from.map(function(value, i){
				return Math.round(Fx.compute(from[i], to[i], delta));
			});
		},
		serve: function(value){
			return value.map(Number);
		}
	},

	Number: {
		parse: parseFloat,
		compute: Fx.compute,
		serve: function(value, unit){
			return (unit) ? value + unit : value;
		}
	},

	String: {
		parse: Function.from(false),
		compute: function(zero, one){
			return one;
		},
		serve: function(zero){
			return zero;
		}
	}

};



/*
---

name: Fx.Morph

description: Formerly Fx.Styles, effect to transition any number of CSS properties for an element using an object of rules, or CSS based selector rules.

license: MIT-style license.

requires: Fx.CSS

provides: Fx.Morph

...
*/

Fx.Morph = new Class({

	Extends: Fx.CSS,

	initialize: function(element, options){
		this.element = this.subject = document.id(element);
		this.parent(options);
	},

	set: function(now){
		if (typeof now == 'string') now = this.search(now);
		for (var p in now) this.render(this.element, p, now[p], this.options.unit);
		return this;
	},

	compute: function(from, to, delta){
		var now = {};
		for (var p in from) now[p] = this.parent(from[p], to[p], delta);
		return now;
	},

	start: function(properties){
		if (!this.check(properties)) return this;
		if (typeof properties == 'string') properties = this.search(properties);
		var from = {}, to = {};
		for (var p in properties){
			var parsed = this.prepare(this.element, p, properties[p]);
			from[p] = parsed.from;
			to[p] = parsed.to;
		}
		return this.parent(from, to);
	}

});

Element.Properties.morph = {

	set: function(options){
		this.get('morph').cancel().setOptions(options);
		return this;
	},

	get: function(){
		var morph = this.retrieve('morph');
		if (!morph){
			morph = new Fx.Morph(this, {link: 'cancel'});
			this.store('morph', morph);
		}
		return morph;
	}

};

Element.implement({

	morph: function(props){
		this.get('morph').start(props);
		return this;
	}

});

/*
---

name: Fx.Transitions

description: Contains a set of advanced transitions to be used with any of the Fx Classes.

license: MIT-style license.

credits:
  - Easing Equations by Robert Penner, <http://www.robertpenner.com/easing/>, modified and optimized to be used with MooTools.

requires: Fx

provides: Fx.Transitions

...
*/

Fx.implement({

	getTransition: function(){
		var trans = this.options.transition || Fx.Transitions.Sine.easeInOut;
		if (typeof trans == 'string'){
			var data = trans.split(':');
			trans = Fx.Transitions;
			trans = trans[data[0]] || trans[data[0].capitalize()];
			if (data[1]) trans = trans['ease' + data[1].capitalize() + (data[2] ? data[2].capitalize() : '')];
		}
		return trans;
	}

});

Fx.Transition = function(transition, params){
	params = Array.from(params);
	var easeIn = function(pos){
		return transition(pos, params);
	};
	return Object.append(easeIn, {
		easeIn: easeIn,
		easeOut: function(pos){
			return 1 - transition(1 - pos, params);
		},
		easeInOut: function(pos){
			return (pos <= 0.5 ? transition(2 * pos, params) : (2 - transition(2 * (1 - pos), params))) / 2;
		}
	});
};

Fx.Transitions = {

	linear: function(zero){
		return zero;
	}

};



Fx.Transitions.extend = function(transitions){
	for (var transition in transitions) Fx.Transitions[transition] = new Fx.Transition(transitions[transition]);
};

Fx.Transitions.extend({

	Pow: function(p, x){
		return Math.pow(p, x && x[0] || 6);
	},

	Expo: function(p){
		return Math.pow(2, 8 * (p - 1));
	},

	Circ: function(p){
		return 1 - Math.sin(Math.acos(p));
	},

	Sine: function(p){
		return 1 - Math.cos(p * Math.PI / 2);
	},

	Back: function(p, x){
		x = x && x[0] || 1.618;
		return Math.pow(p, 2) * ((x + 1) * p - x);
	},

	Bounce: function(p){
		var value;
		for (var a = 0, b = 1; 1; a += b, b /= 2){
			if (p >= (7 - 4 * a) / 11){
				value = b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
				break;
			}
		}
		return value;
	},

	Elastic: function(p, x){
		return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x && x[0] || 1) / 3);
	}

});

['Quad', 'Cubic', 'Quart', 'Quint'].each(function(transition, i){
	Fx.Transitions[transition] = new Fx.Transition(function(p){
		return Math.pow(p, i + 2);
	});
});

/*
---

name: Fx.Tween

description: Formerly Fx.Style, effect to transition any CSS property for an element.

license: MIT-style license.

requires: Fx.CSS

provides: [Fx.Tween, Element.fade, Element.highlight]

...
*/

Fx.Tween = new Class({

	Extends: Fx.CSS,

	initialize: function(element, options){
		this.element = this.subject = document.id(element);
		this.parent(options);
	},

	set: function(property, now){
		if (arguments.length == 1){
			now = property;
			property = this.property || this.options.property;
		}
		this.render(this.element, property, now, this.options.unit);
		return this;
	},

	start: function(property, from, to){
		if (!this.check(property, from, to)) return this;
		var args = Array.flatten(arguments);
		this.property = this.options.property || args.shift();
		var parsed = this.prepare(this.element, this.property, args);
		return this.parent(parsed.from, parsed.to);
	}

});

Element.Properties.tween = {

	set: function(options){
		this.get('tween').cancel().setOptions(options);
		return this;
	},

	get: function(){
		var tween = this.retrieve('tween');
		if (!tween){
			tween = new Fx.Tween(this, {link: 'cancel'});
			this.store('tween', tween);
		}
		return tween;
	}

};

Element.implement({

	tween: function(property, from, to){
		this.get('tween').start(property, from, to);
		return this;
	},

	fade: function(how){
		var fade = this.get('tween'), method, args = ['opacity'].append(arguments), toggle;
		if (args[1] == null) args[1] = 'toggle';
		switch (args[1]){
			case 'in': method = 'start'; args[1] = 1; break;
			case 'out': method = 'start'; args[1] = 0; break;
			case 'show': method = 'set'; args[1] = 1; break;
			case 'hide': method = 'set'; args[1] = 0; break;
			case 'toggle':
				var flag = this.retrieve('fade:flag', this.getStyle('opacity') == 1);
				method = 'start';
				args[1] = flag ? 0 : 1;
				this.store('fade:flag', !flag);
				toggle = true;
			break;
			default: method = 'start';
		}
		if (!toggle) this.eliminate('fade:flag');
		fade[method].apply(fade, args);
		var to = args[args.length - 1];
		
		if (method == 'set'){
			this.setStyle('visibility', to == 0 ? 'hidden' : 'visible');
		} else if (to != 0){
			if (fade.$chain.length){
				fade.chain(function(){
					this.element.setStyle('visibility', 'visible');
					this.callChain();
				});
			} else {
				this.setStyle('visibility', 'visible');
			}
		} else {
			fade.chain(function(){
				if (this.element.getStyle('opacity')) return;
				this.element.setStyle('visibility', 'hidden');
				this.callChain();
			});
		}

		return this;
	},

	highlight: function(start, end){
		if (!end){
			end = this.retrieve('highlight:original', this.getStyle('background-color'));
			end = (end == 'transparent') ? '#fff' : end;
		}
		var tween = this.get('tween');
		tween.start('background-color', start || '#ffff88', end).chain(function(){
			this.setStyle('background-color', this.retrieve('highlight:original'));
			tween.callChain();
		}.bind(this));
		return this;
	}

});

/*
---

name: Request

description: Powerful all purpose Request Class. Uses XMLHTTPRequest.

license: MIT-style license.

requires: [Object, Element, Chain, Events, Options, Browser]

provides: Request

...
*/

(function(){

var empty = function(){},
	progressSupport = ('onprogress' in new Browser.Request);

var Request = this.Request = new Class({

	Implements: [Chain, Events, Options],

	options: {/*
		onRequest: function(){},
		onLoadstart: function(event, xhr){},
		onProgress: function(event, xhr){},
		onComplete: function(){},
		onCancel: function(){},
		onSuccess: function(responseText, responseXML){},
		onFailure: function(xhr){},
		onException: function(headerName, value){},
		onTimeout: function(){},
		user: '',
		password: '',
		withCredentials: false,*/
		url: '',
		data: '',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
		},
		async: true,
		format: false,
		method: 'post',
		link: 'ignore',
		isSuccess: null,
		emulation: true,
		urlEncoded: true,
		encoding: 'utf-8',
		evalScripts: false,
		evalResponse: false,
		timeout: 0,
		noCache: false
	},

	initialize: function(options){
		this.xhr = new Browser.Request();
		this.setOptions(options);
		this.headers = this.options.headers;
	},

	onStateChange: function(){
		var xhr = this.xhr;
		if (xhr.readyState != 4 || !this.running) return;
		this.running = false;
		this.status = 0;
		Function.attempt(function(){
			var status = xhr.status;
			this.status = (status == 1223) ? 204 : status;
		}.bind(this));
		xhr.onreadystatechange = empty;
		if (progressSupport) xhr.onprogress = xhr.onloadstart = empty;
		if (this.timer){
			clearTimeout(this.timer);
			delete this.timer;
		}

		this.response = {text: this.xhr.responseText || '', xml: this.xhr.responseXML};
		if (this.options.isSuccess.call(this, this.status))
			this.success(this.response.text, this.response.xml);
		else
			this.failure();
	},

	isSuccess: function(){
		var status = this.status;
		return (status >= 200 && status < 300);
	},

	isRunning: function(){
		return !!this.running;
	},

	processScripts: function(text){
		if (this.options.evalResponse || (/(ecma|java)script/).test(this.getHeader('Content-type'))) return Browser.exec(text);
		return text.stripScripts(this.options.evalScripts);
	},

	success: function(text, xml){
		this.onSuccess(this.processScripts(text), xml);
	},

	onSuccess: function(){
		this.fireEvent('complete', arguments).fireEvent('success', arguments).callChain();
	},

	failure: function(){
		this.onFailure();
	},

	onFailure: function(){
		this.fireEvent('complete').fireEvent('failure', this.xhr);
	},

	loadstart: function(event){
		this.fireEvent('loadstart', [event, this.xhr]);
	},

	progress: function(event){
		this.fireEvent('progress', [event, this.xhr]);
	},

	timeout: function(){
		this.fireEvent('timeout', this.xhr);
	},

	setHeader: function(name, value){
		this.headers[name] = value;
		return this;
	},

	getHeader: function(name){
		return Function.attempt(function(){
			return this.xhr.getResponseHeader(name);
		}.bind(this));
	},

	check: function(){
		if (!this.running) return true;
		switch (this.options.link){
			case 'cancel': this.cancel(); return true;
			case 'chain': this.chain(this.caller.pass(arguments, this)); return false;
		}
		return false;
	},

	send: function(options){
		if (!this.check(options)) return this;

		this.options.isSuccess = this.options.isSuccess || this.isSuccess;
		this.running = true;

		var type = typeOf(options);
		if (type == 'string' || type == 'element') options = {data: options};

		var old = this.options;
		options = Object.append({data: old.data, url: old.url, method: old.method}, options);
		var data = options.data, url = String(options.url), method = options.method.toLowerCase();

		switch (typeOf(data)){
			case 'element': data = document.id(data).toQueryString(); break;
			case 'object': case 'hash': data = Object.toQueryString(data);
		}

		if (this.options.format){
			var format = 'format=' + this.options.format;
			data = (data) ? format + '&' + data : format;
		}

		if (this.options.emulation && !['get', 'post'].contains(method)){
			var _method = '_method=' + method;
			data = (data) ? _method + '&' + data : _method;
			method = 'post';
		}

		if (this.options.urlEncoded && ['post', 'put'].contains(method)){
			var encoding = (this.options.encoding) ? '; charset=' + this.options.encoding : '';
			this.headers['Content-type'] = 'application/x-www-form-urlencoded' + encoding;
		}

		if (!url) url = document.location.pathname;

		var trimPosition = url.lastIndexOf('/');
		if (trimPosition > -1 && (trimPosition = url.indexOf('#')) > -1) url = url.substr(0, trimPosition);

		if (this.options.noCache)
			url += (url.indexOf('?') > -1 ? '&' : '?') + String.uniqueID();

		if (data && (method == 'get' || method == 'delete')){
			url += (url.indexOf('?') > -1 ? '&' : '?') + data;
			data = null;
		}

		var xhr = this.xhr;
		if (progressSupport){
			xhr.onloadstart = this.loadstart.bind(this);
			xhr.onprogress = this.progress.bind(this);
		}

		xhr.open(method.toUpperCase(), url, this.options.async, this.options.user, this.options.password);
		if ((this.options.withCredentials) && 'withCredentials' in xhr) xhr.withCredentials = true;

		xhr.onreadystatechange = this.onStateChange.bind(this);

		Object.each(this.headers, function(value, key){
			try {
				xhr.setRequestHeader(key, value);
			} catch (e){
				this.fireEvent('exception', [key, value]);
			}
		}, this);

		this.fireEvent('request');
		xhr.send(data);
		if (!this.options.async) this.onStateChange();
		else if (this.options.timeout) this.timer = this.timeout.delay(this.options.timeout, this);
		return this;
	},

	cancel: function(){
		if (!this.running) return this;
		this.running = false;
		var xhr = this.xhr;
		xhr.abort();
		if (this.timer){
			clearTimeout(this.timer);
			delete this.timer;
		}
		xhr.onreadystatechange = empty;
		if (progressSupport) xhr.onprogress = xhr.onloadstart = empty;
		this.xhr = new Browser.Request();
		this.fireEvent('cancel');
		return this;
	}

});

var methods = {};
['get', 'post', 'put', 'delete', 'patch', 'head', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'].each(function(method){
	methods[method] = function(data){
		var object = {
			method: method
		};
		if (data != null) object.data = data;
		return this.send(object);
	};
});

Request.implement(methods);

Element.Properties.send = {

	set: function(options){
		var send = this.get('send').cancel();
		send.setOptions(options);
		return this;
	},

	get: function(){
		var send = this.retrieve('send');
		if (!send){
			send = new Request({
				data: this, link: 'cancel', method: this.get('method') || 'post', url: this.get('action')
			});
			this.store('send', send);
		}
		return send;
	}

};

Element.implement({

	send: function(url){
		var sender = this.get('send');
		sender.send({data: this, url: url || sender.options.url});
		return this;
	}

});

})();

/*
---

name: Request.HTML

description: Extends the basic Request Class with additional methods for interacting with HTML responses.

license: MIT-style license.

requires: [Element, Request]

provides: Request.HTML

...
*/

Request.HTML = new Class({

	Extends: Request,

	options: {
		update: false,
		append: false,
		evalScripts: true,
		filter: false,
		headers: {
			Accept: 'text/html, application/xml, text/xml, */*'
		}
	},

	success: function(text){
		var options = this.options, response = this.response;

		response.html = text.stripScripts(function(script){
			response.javascript = script;
		});

		var match = response.html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
		if (match) response.html = match[1];
		var temp = new Element('div').set('html', response.html);

		response.tree = temp.childNodes;
		response.elements = temp.getElements(options.filter || '*');

		if (options.filter) response.tree = response.elements;
		if (options.update){
			var update = document.id(options.update).empty();
			if (options.filter) update.adopt(response.elements);
			else update.set('html', response.html);
		} else if (options.append){
			var append = document.id(options.append);
			if (options.filter) response.elements.reverse().inject(append);
			else append.adopt(temp.getChildren());
		}
		if (options.evalScripts) Browser.exec(response.javascript);

		this.onSuccess(response.tree, response.elements, response.html, response.javascript);
	}

});

Element.Properties.load = {

	set: function(options){
		var load = this.get('load').cancel();
		load.setOptions(options);
		return this;
	},

	get: function(){
		var load = this.retrieve('load');
		if (!load){
			load = new Request.HTML({data: this, link: 'cancel', update: this, method: 'get'});
			this.store('load', load);
		}
		return load;
	}

};

Element.implement({

	load: function(){
		this.get('load').send(Array.link(arguments, {data: Type.isObject, url: Type.isString}));
		return this;
	}

});

/*
---

name: JSON

description: JSON encoder and decoder.

license: MIT-style license.

SeeAlso: <http://www.json.org/>

requires: [Array, String, Number, Function]

provides: JSON

...
*/

if (typeof JSON == 'undefined') this.JSON = {};



(function(){

var special = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\'};

var escape = function(chr){
	return special[chr] || '\\u' + ('0000' + chr.charCodeAt(0).toString(16)).slice(-4);
};

JSON.validate = function(string){
	string = string.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
					replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
					replace(/(?:^|:|,)(?:\s*\[)+/g, '');

	return (/^[\],:{}\s]*$/).test(string);
};

JSON.encode = JSON.stringify ? function(obj){
	return JSON.stringify(obj);
} : function(obj){
	if (obj && obj.toJSON) obj = obj.toJSON();

	switch (typeOf(obj)){
		case 'string':
			return '"' + obj.replace(/[\x00-\x1f\\"]/g, escape) + '"';
		case 'array':
			return '[' + obj.map(JSON.encode).clean() + ']';
		case 'object': case 'hash':
			var string = [];
			Object.each(obj, function(value, key){
				var json = JSON.encode(value);
				if (json) string.push(JSON.encode(key) + ':' + json);
			});
			return '{' + string + '}';
		case 'number': case 'boolean': return '' + obj;
		case 'null': return 'null';
	}

	return null;
};

JSON.secure = true;


JSON.decode = function(string, secure){
	if (!string || typeOf(string) != 'string') return null;
    
	if (secure == null) secure = JSON.secure; 
	if (secure){
		if (JSON.parse) return JSON.parse(string);
		if (!JSON.validate(string)) throw new Error('JSON could not decode the input; security is enabled and the value is not secure.');
	}

	return eval('(' + string + ')');
};

})();

/*
---

name: Request.JSON

description: Extends the basic Request Class with additional methods for sending and receiving JSON data.

license: MIT-style license.

requires: [Request, JSON]

provides: Request.JSON

...
*/

Request.JSON = new Class({

	Extends: Request,

	options: {
		/*onError: function(text, error){},*/
		secure: true
	},

	initialize: function(options){
		this.parent(options);
		Object.append(this.headers, {
			'Accept': 'application/json',
			'X-Request': 'JSON'
		});
	},

	success: function(text){
		var json;
		try {
			json = this.response.json = JSON.decode(text, this.options.secure);
		} catch (error){
			this.fireEvent('error', [text, error]);
			return;
		}
		if (json == null) this.onFailure();
		else this.onSuccess(json, text);
	}

});

/*
---

name: Cookie

description: Class for creating, reading, and deleting browser Cookies.

license: MIT-style license.

credits:
  - Based on the functions by Peter-Paul Koch (http://quirksmode.org).

requires: [Options, Browser]

provides: Cookie

...
*/

var Cookie = new Class({

	Implements: Options,

	options: {
		path: '/',
		domain: false,
		duration: false,
		secure: false,
		document: document,
		encode: true,
		httpOnly: false
	},

	initialize: function(key, options){
		this.key = key;
		this.setOptions(options);
	},

	write: function(value){
		if (this.options.encode) value = encodeURIComponent(value);
		if (this.options.domain) value += '; domain=' + this.options.domain;
		if (this.options.path) value += '; path=' + this.options.path;
		if (this.options.duration){
			var date = new Date();
			date.setTime(date.getTime() + this.options.duration * 24 * 60 * 60 * 1000);
			value += '; expires=' + date.toGMTString();
		}
		if (this.options.secure) value += '; secure';
		if (this.options.httpOnly) value += '; HttpOnly';
		this.options.document.cookie = this.key + '=' + value;
		return this;
	},

	read: function(){
		var value = this.options.document.cookie.match('(?:^|;)\\s*' + this.key.escapeRegExp() + '=([^;]*)');
		return (value) ? decodeURIComponent(value[1]) : null;
	},

	dispose: function(){
		new Cookie(this.key, Object.merge({}, this.options, {duration: -1})).write('');
		return this;
	}

});

Cookie.write = function(key, value, options){
	return new Cookie(key, options).write(value);
};

Cookie.read = function(key){
	return new Cookie(key).read();
};

Cookie.dispose = function(key, options){
	return new Cookie(key, options).dispose();
};

/*
---

name: DOMReady

description: Contains the custom event domready.

license: MIT-style license.

requires: [Browser, Element, Element.Event]

provides: [DOMReady, DomReady]

...
*/

(function(window, document){

var ready,
	loaded,
	checks = [],
	shouldPoll,
	timer,
	testElement = document.createElement('div');

var domready = function(){
	clearTimeout(timer);
	if (!ready) {
		Browser.loaded = ready = true;
		document.removeListener('DOMContentLoaded', domready).removeListener('readystatechange', check);
		document.fireEvent('domready');
		window.fireEvent('domready');
	}
	// cleanup scope vars
	document = window = testElement = null;
};

var check = function(){
	for (var i = checks.length; i--;) if (checks[i]()){
		domready();
		return true;
	}
	return false;
};

var poll = function(){
	clearTimeout(timer);
	if (!check()) timer = setTimeout(poll, 10);
};

document.addListener('DOMContentLoaded', domready);

/*<ltIE8>*/
// doScroll technique by Diego Perini http://javascript.nwbox.com/IEContentLoaded/
// testElement.doScroll() throws when the DOM is not ready, only in the top window
var doScrollWorks = function(){
	try {
		testElement.doScroll();
		return true;
	} catch (e){}
	return false;
};
// If doScroll works already, it can't be used to determine domready
//   e.g. in an iframe
if (testElement.doScroll && !doScrollWorks()){
	checks.push(doScrollWorks);
	shouldPoll = true;
}
/*</ltIE8>*/

if (document.readyState) checks.push(function(){
	var state = document.readyState;
	return (state == 'loaded' || state == 'complete');
});

if ('onreadystatechange' in document) document.addListener('readystatechange', check);
else shouldPoll = true;

if (shouldPoll) poll();

Element.Events.domready = {
	onAdd: function(fn){
		if (ready) fn.call(this);
	}
};

// Make sure that domready fires before load
Element.Events.load = {
	base: 'load',
	onAdd: function(fn){
		if (loaded && this == window) fn.call(this);
	},
	condition: function(){
		if (this == window){
			domready();
			delete Element.Events.load;
		}
		return true;
	}
};

// This is based on the custom load event
window.addEvent('load', function(){
	loaded = true;
});

})(window, document);

/*
---

script: More.js

name: More

description: MooTools More

license: MIT-style license

authors:
  - Guillermo Rauch
  - Thomas Aylott
  - Scott Kyle
  - Arian Stolwijk
  - Tim Wienk
  - Christoph Pojer
  - Aaron Newton
  - Jacob Thornton

requires:
  - Core/MooTools

provides: [MooTools.More]

...
*/

MooTools.More = {
	version: '1.5.1',
	build: '2dd695ba957196ae4b0275a690765d6636a61ccd'
};

/*
---

script: Chain.Wait.js

name: Chain.Wait

description: value, Adds a method to inject pauses between chained events.

license: MIT-style license.

authors:
  - Aaron Newton

requires:
  - Core/Chain
  - Core/Element
  - Core/Fx
  - MooTools.More

provides: [Chain.Wait]

...
*/

(function(){

	var wait = {
		wait: function(duration){
			return this.chain(function(){
				this.callChain.delay(duration == null ? 500 : duration, this);
				return this;
			}.bind(this));
		}
	};

	Chain.implement(wait);

	if (this.Fx) Fx.implement(wait);

	if (this.Element && Element.implement && this.Fx){
		Element.implement({

			chains: function(effects){
				Array.from(effects || ['tween', 'morph', 'reveal']).each(function(effect){
					effect = this.get(effect);
					if (!effect) return;
					effect.setOptions({
						link:'chain'
					});
				}, this);
				return this;
			},

			pauseFx: function(duration, effect){
				this.chains(effect).get(effect || 'tween').wait(duration);
				return this;
			}

		});
	}

})();

/*
---

script: Class.Binds.js

name: Class.Binds

description: Automagically binds specified methods in a class to the instance of the class.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Class
  - MooTools.More

provides: [Class.Binds]

...
*/

Class.Mutators.Binds = function(binds){
	if (!this.prototype.initialize) this.implement('initialize', function(){});
	return Array.from(binds).concat(this.prototype.Binds || []);
};

Class.Mutators.initialize = function(initialize){
	return function(){
		Array.from(this.Binds).each(function(name){
			var original = this[name];
			if (original) this[name] = original.bind(this);
		}, this);
		return initialize.apply(this, arguments);
	};
};

/*
---

script: Class.Occlude.js

name: Class.Occlude

description: Prevents a class from being applied to a DOM element twice.

license: MIT-style license.

authors:
  - Aaron Newton

requires:
  - Core/Class
  - Core/Element
  - MooTools.More

provides: [Class.Occlude]

...
*/

Class.Occlude = new Class({

	occlude: function(property, element){
		element = document.id(element || this.element);
		var instance = element.retrieve(property || this.property);
		if (instance && !this.occluded)
			return (this.occluded = instance);

		this.occluded = false;
		element.store(property || this.property, this);
		return this.occluded;
	}

});

/*
---

script: Class.Refactor.js

name: Class.Refactor

description: Extends a class onto itself with new property, preserving any items attached to the class's namespace.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Class
  - MooTools.More

# Some modules declare themselves dependent on Class.Refactor
provides: [Class.refactor, Class.Refactor]

...
*/

Class.refactor = function(original, refactors){

	Object.each(refactors, function(item, name){
		var origin = original.prototype[name];
		origin = (origin && origin.$origin) || origin || function(){};
		original.implement(name, (typeof item == 'function') ? function(){
			var old = this.previous;
			this.previous = origin;
			var value = item.apply(this, arguments);
			this.previous = old;
			return value;
		} : item);
	});

	return original;

};

/*
---

name: Events.Pseudos

description: Adds the functionality to add pseudo events

license: MIT-style license

authors:
  - Arian Stolwijk

requires: [Core/Class.Extras, Core/Slick.Parser, MooTools.More]

provides: [Events.Pseudos]

...
*/

(function(){

Events.Pseudos = function(pseudos, addEvent, removeEvent){

	var storeKey = '_monitorEvents:';

	var storageOf = function(object){
		return {
			store: object.store ? function(key, value){
				object.store(storeKey + key, value);
			} : function(key, value){
				(object._monitorEvents || (object._monitorEvents = {}))[key] = value;
			},
			retrieve: object.retrieve ? function(key, dflt){
				return object.retrieve(storeKey + key, dflt);
			} : function(key, dflt){
				if (!object._monitorEvents) return dflt;
				return object._monitorEvents[key] || dflt;
			}
		};
	};

	var splitType = function(type){
		if (type.indexOf(':') == -1 || !pseudos) return null;

		var parsed = Slick.parse(type).expressions[0][0],
			parsedPseudos = parsed.pseudos,
			l = parsedPseudos.length,
			splits = [];

		while (l--){
			var pseudo = parsedPseudos[l].key,
				listener = pseudos[pseudo];
			if (listener != null) splits.push({
				event: parsed.tag,
				value: parsedPseudos[l].value,
				pseudo: pseudo,
				original: type,
				listener: listener
			});
		}
		return splits.length ? splits : null;
	};

	return {

		addEvent: function(type, fn, internal){
			var split = splitType(type);
			if (!split) return addEvent.call(this, type, fn, internal);

			var storage = storageOf(this),
				events = storage.retrieve(type, []),
				eventType = split[0].event,
				args = Array.slice(arguments, 2),
				stack = fn,
				self = this;

			split.each(function(item){
				var listener = item.listener,
					stackFn = stack;
				if (listener == false) eventType += ':' + item.pseudo + '(' + item.value + ')';
				else stack = function(){
					listener.call(self, item, stackFn, arguments, stack);
				};
			});

			events.include({type: eventType, event: fn, monitor: stack});
			storage.store(type, events);

			if (type != eventType) addEvent.apply(this, [type, fn].concat(args));
			return addEvent.apply(this, [eventType, stack].concat(args));
		},

		removeEvent: function(type, fn){
			var split = splitType(type);
			if (!split) return removeEvent.call(this, type, fn);

			var storage = storageOf(this),
				events = storage.retrieve(type);
			if (!events) return this;

			var args = Array.slice(arguments, 2);

			removeEvent.apply(this, [type, fn].concat(args));
			events.each(function(monitor, i){
				if (!fn || monitor.event == fn) removeEvent.apply(this, [monitor.type, monitor.monitor].concat(args));
				delete events[i];
			}, this);

			storage.store(type, events);
			return this;
		}

	};

};

var pseudos = {

	once: function(split, fn, args, monitor){
		fn.apply(this, args);
		this.removeEvent(split.event, monitor)
			.removeEvent(split.original, fn);
	},

	throttle: function(split, fn, args){
		if (!fn._throttled){
			fn.apply(this, args);
			fn._throttled = setTimeout(function(){
				fn._throttled = false;
			}, split.value || 250);
		}
	},

	pause: function(split, fn, args){
		clearTimeout(fn._pause);
		fn._pause = fn.delay(split.value || 250, this, args);
	}

};

Events.definePseudo = function(key, listener){
	pseudos[key] = listener;
	return this;
};

Events.lookupPseudo = function(key){
	return pseudos[key];
};

var proto = Events.prototype;
Events.implement(Events.Pseudos(pseudos, proto.addEvent, proto.removeEvent));

['Request', 'Fx'].each(function(klass){
	if (this[klass]) this[klass].implement(Events.prototype);
});

})();

/*
---

script: Drag.js

name: Drag

description: The base Drag Class. Can be used to drag and resize Elements using mouse events.

license: MIT-style license

authors:
  - Valerio Proietti
  - Tom Occhinno
  - Jan Kassens

requires:
  - Core/Events
  - Core/Options
  - Core/Element.Event
  - Core/Element.Style
  - Core/Element.Dimensions
  - MooTools.More

provides: [Drag]
...

*/

var Drag = new Class({

	Implements: [Events, Options],

	options: {/*
		onBeforeStart: function(thisElement){},
		onStart: function(thisElement, event){},
		onSnap: function(thisElement){},
		onDrag: function(thisElement, event){},
		onCancel: function(thisElement){},
		onComplete: function(thisElement, event){},*/
		snap: 6,
		unit: 'px',
		grid: false,
		style: true,
		limit: false,
		handle: false,
		invert: false,
		preventDefault: false,
		stopPropagation: false,
		compensateScroll: false,
		modifiers: {x: 'left', y: 'top'}
	},

	initialize: function(){
		var params = Array.link(arguments, {
			'options': Type.isObject,
			'element': function(obj){
				return obj != null;
			}
		});

		this.element = document.id(params.element);
		this.document = this.element.getDocument();
		this.setOptions(params.options || {});
		var htype = typeOf(this.options.handle);
		this.handles = ((htype == 'array' || htype == 'collection') ? $$(this.options.handle) : document.id(this.options.handle)) || this.element;
		this.mouse = {'now': {}, 'pos': {}};
		this.value = {'start': {}, 'now': {}};
		this.offsetParent = (function(el){
			var offsetParent = el.getOffsetParent();
			var isBody = !offsetParent || (/^(?:body|html)$/i).test(offsetParent.tagName);
			return isBody ? window : document.id(offsetParent);
		})(this.element);
		this.selection = 'selectstart' in document ? 'selectstart' : 'mousedown';

		this.compensateScroll = {start: {}, diff: {}, last: {}};

		if ('ondragstart' in document && !('FileReader' in window) && !Drag.ondragstartFixed){
			document.ondragstart = Function.from(false);
			Drag.ondragstartFixed = true;
		}

		this.bound = {
			start: this.start.bind(this),
			check: this.check.bind(this),
			drag: this.drag.bind(this),
			stop: this.stop.bind(this),
			cancel: this.cancel.bind(this),
			eventStop: Function.from(false),
			scrollListener: this.scrollListener.bind(this)
		};
		this.attach();
	},

	attach: function(){
		this.handles.addEvent('mousedown', this.bound.start);
		if (this.options.compensateScroll) this.offsetParent.addEvent('scroll', this.bound.scrollListener);
		return this;
	},

	detach: function(){
		this.handles.removeEvent('mousedown', this.bound.start);
		if (this.options.compensateScroll) this.offsetParent.removeEvent('scroll', this.bound.scrollListener);
		return this;
	},

	scrollListener: function(){

		if (!this.mouse.start) return;
		var newScrollValue = this.offsetParent.getScroll();

		if (this.element.getStyle('position') == 'absolute'){
			var scrollDiff = this.sumValues(newScrollValue, this.compensateScroll.last, -1);
			this.mouse.now = this.sumValues(this.mouse.now, scrollDiff, 1);
		} else {
			this.compensateScroll.diff = this.sumValues(newScrollValue, this.compensateScroll.start, -1);
		}
		if (this.offsetParent != window) this.compensateScroll.diff = this.sumValues(this.compensateScroll.start, newScrollValue, -1);
		this.compensateScroll.last = newScrollValue;
		this.render(this.options);
	},

	sumValues: function(alpha, beta, op){
		var sum = {}, options = this.options;
		for (z in options.modifiers){
			if (!options.modifiers[z]) continue;
			sum[z] = alpha[z] + beta[z] * op;
		}
		return sum;
	},

	start: function(event){
		var options = this.options;

		if (event.rightClick) return;

		if (options.preventDefault) event.preventDefault();
		if (options.stopPropagation) event.stopPropagation();
		this.compensateScroll.start = this.compensateScroll.last = this.offsetParent.getScroll();
		this.compensateScroll.diff = {x: 0, y: 0};
		this.mouse.start = event.page;
		this.fireEvent('beforeStart', this.element);

		var limit = options.limit;
		this.limit = {x: [], y: []};

		var z, coordinates, offsetParent = this.offsetParent == window ? null : this.offsetParent;
		for (z in options.modifiers){
			if (!options.modifiers[z]) continue;

			var style = this.element.getStyle(options.modifiers[z]);

			// Some browsers (IE and Opera) don't always return pixels.
			if (style && !style.match(/px$/)){
				if (!coordinates) coordinates = this.element.getCoordinates(offsetParent);
				style = coordinates[options.modifiers[z]];
			}

			if (options.style) this.value.now[z] = (style || 0).toInt();
			else this.value.now[z] = this.element[options.modifiers[z]];

			if (options.invert) this.value.now[z] *= -1;

			this.mouse.pos[z] = event.page[z] - this.value.now[z];

			if (limit && limit[z]){
				var i = 2;
				while (i--){
					var limitZI = limit[z][i];
					if (limitZI || limitZI === 0) this.limit[z][i] = (typeof limitZI == 'function') ? limitZI() : limitZI;
				}
			}
		}

		if (typeOf(this.options.grid) == 'number') this.options.grid = {
			x: this.options.grid,
			y: this.options.grid
		};

		var events = {
			mousemove: this.bound.check,
			mouseup: this.bound.cancel
		};
		events[this.selection] = this.bound.eventStop;
		this.document.addEvents(events);
	},

	check: function(event){
		if (this.options.preventDefault) event.preventDefault();
		var distance = Math.round(Math.sqrt(Math.pow(event.page.x - this.mouse.start.x, 2) + Math.pow(event.page.y - this.mouse.start.y, 2)));
		if (distance > this.options.snap){
			this.cancel();
			this.document.addEvents({
				mousemove: this.bound.drag,
				mouseup: this.bound.stop
			});
			this.fireEvent('start', [this.element, event]).fireEvent('snap', this.element);
		}
	},

	drag: function(event){
		var options = this.options;
		if (options.preventDefault) event.preventDefault();
		this.mouse.now = this.sumValues(event.page, this.compensateScroll.diff, -1);

		this.render(options);
		this.fireEvent('drag', [this.element, event]);
	},  

	render: function(options){
		for (var z in options.modifiers){
			if (!options.modifiers[z]) continue;
			this.value.now[z] = this.mouse.now[z] - this.mouse.pos[z];

			if (options.invert) this.value.now[z] *= -1;
			if (options.limit && this.limit[z]){
				if ((this.limit[z][1] || this.limit[z][1] === 0) && (this.value.now[z] > this.limit[z][1])){
					this.value.now[z] = this.limit[z][1];
				} else if ((this.limit[z][0] || this.limit[z][0] === 0) && (this.value.now[z] < this.limit[z][0])){
					this.value.now[z] = this.limit[z][0];
				}
			}
			if (options.grid[z]) this.value.now[z] -= ((this.value.now[z] - (this.limit[z][0]||0)) % options.grid[z]);
			if (options.style) this.element.setStyle(options.modifiers[z], this.value.now[z] + options.unit);
			else this.element[options.modifiers[z]] = this.value.now[z];
		}
	},

	cancel: function(event){
		this.document.removeEvents({
			mousemove: this.bound.check,
			mouseup: this.bound.cancel
		});
		if (event){
			this.document.removeEvent(this.selection, this.bound.eventStop);
			this.fireEvent('cancel', this.element);
		}
	},

	stop: function(event){
		var events = {
			mousemove: this.bound.drag,
			mouseup: this.bound.stop
		};
		events[this.selection] = this.bound.eventStop;
		this.document.removeEvents(events);
		this.mouse.start = null;
		if (event) this.fireEvent('complete', [this.element, event]);
	}

});

Element.implement({

	makeResizable: function(options){
		var drag = new Drag(this, Object.merge({
			modifiers: {
				x: 'width',
				y: 'height'
			}
		}, options));

		this.store('resizer', drag);
		return drag.addEvent('drag', function(){
			this.fireEvent('resize', drag);
		}.bind(this));
	}

});

/*
---

script: Drag.Move.js

name: Drag.Move

description: A Drag extension that provides support for the constraining of draggables to containers and droppables.

license: MIT-style license

authors:
  - Valerio Proietti
  - Tom Occhinno
  - Jan Kassens
  - Aaron Newton
  - Scott Kyle

requires:
  - Core/Element.Dimensions
  - Drag

provides: [Drag.Move]

...
*/

Drag.Move = new Class({

	Extends: Drag,

	options: {/*
		onEnter: function(thisElement, overed){},
		onLeave: function(thisElement, overed){},
		onDrop: function(thisElement, overed, event){},*/
		droppables: [],
		container: false,
		precalculate: false,
		includeMargins: true,
		checkDroppables: true
	},

	initialize: function(element, options){
		this.parent(element, options);
		element = this.element;

		this.droppables = $$(this.options.droppables);
		this.setContainer(this.options.container);

		if (this.options.style){
			if (this.options.modifiers.x == 'left' && this.options.modifiers.y == 'top'){
				var parent = element.getOffsetParent(),
					styles = element.getStyles('left', 'top');
				if (parent && (styles.left == 'auto' || styles.top == 'auto')){
					element.setPosition(element.getPosition(parent));
				}
			}

			if (element.getStyle('position') == 'static') element.setStyle('position', 'absolute');
		}

		this.addEvent('start', this.checkDroppables, true);
		this.overed = null;
	},
	
	setContainer: function(container) {
		this.container = document.id(container);
		if (this.container && typeOf(this.container) != 'element'){
			this.container = document.id(this.container.getDocument().body);
		}
	},

	start: function(event){
		if (this.container) this.options.limit = this.calculateLimit();

		if (this.options.precalculate){
			this.positions = this.droppables.map(function(el){
				return el.getCoordinates();
			});
		}

		this.parent(event);
	},

	calculateLimit: function(){
		var element = this.element,
			container = this.container,

			offsetParent = document.id(element.getOffsetParent()) || document.body,
			containerCoordinates = container.getCoordinates(offsetParent),
			elementMargin = {},
			elementBorder = {},
			containerMargin = {},
			containerBorder = {},
			offsetParentPadding = {},
			offsetScroll = offsetParent.getScroll();

		['top', 'right', 'bottom', 'left'].each(function(pad){
			elementMargin[pad] = element.getStyle('margin-' + pad).toInt();
			elementBorder[pad] = element.getStyle('border-' + pad).toInt();
			containerMargin[pad] = container.getStyle('margin-' + pad).toInt();
			containerBorder[pad] = container.getStyle('border-' + pad).toInt();
			offsetParentPadding[pad] = offsetParent.getStyle('padding-' + pad).toInt();
		}, this);

		var width = element.offsetWidth + elementMargin.left + elementMargin.right,
			height = element.offsetHeight + elementMargin.top + elementMargin.bottom,
			left = 0 + offsetScroll.x,
			top = 0 + offsetScroll.y,
			right = containerCoordinates.right - containerBorder.right - width + offsetScroll.x,
			bottom = containerCoordinates.bottom - containerBorder.bottom - height + offsetScroll.y;

		if (this.options.includeMargins){
			left += elementMargin.left;
			top += elementMargin.top;
		} else {
			right += elementMargin.right;
			bottom += elementMargin.bottom;
		}

		if (element.getStyle('position') == 'relative'){
			var coords = element.getCoordinates(offsetParent);
			coords.left -= element.getStyle('left').toInt();
			coords.top -= element.getStyle('top').toInt();

			left -= coords.left;
			top -= coords.top;
			if (container.getStyle('position') != 'relative'){
				left += containerBorder.left;
				top += containerBorder.top;
			}
			right += elementMargin.left - coords.left;
			bottom += elementMargin.top - coords.top;

			if (container != offsetParent){
				left += containerMargin.left + offsetParentPadding.left;
				if (!offsetParentPadding.left && left < 0) left = 0;
				top += offsetParent == document.body ? 0 : containerMargin.top + offsetParentPadding.top;
				if (!offsetParentPadding.top && top < 0) top = 0;
			}
		} else {
			left -= elementMargin.left;
			top -= elementMargin.top;
			if (container != offsetParent){
				left += containerCoordinates.left + containerBorder.left;
				top += containerCoordinates.top + containerBorder.top;
			}
		}

		return {
			x: [left, right],
			y: [top, bottom]
		};
	},

	getDroppableCoordinates: function(element){
		var position = element.getCoordinates();
		if (element.getStyle('position') == 'fixed'){
			var scroll = window.getScroll();
			position.left += scroll.x;
			position.right += scroll.x;
			position.top += scroll.y;
			position.bottom += scroll.y;
		}
		return position;
	},

	checkDroppables: function(){
		var overed = this.droppables.filter(function(el, i){
			el = this.positions ? this.positions[i] : this.getDroppableCoordinates(el);
			var now = this.mouse.now;
			return (now.x > el.left && now.x < el.right && now.y < el.bottom && now.y > el.top);
		}, this).getLast();

		if (this.overed != overed){
			if (this.overed) this.fireEvent('leave', [this.element, this.overed]);
			if (overed) this.fireEvent('enter', [this.element, overed]);
			this.overed = overed;
		}
	},

	drag: function(event){
		this.parent(event);
		if (this.options.checkDroppables && this.droppables.length) this.checkDroppables();
	},

	stop: function(event){
		this.checkDroppables();
		this.fireEvent('drop', [this.element, this.overed, event]);
		this.overed = null;
		return this.parent(event);
	}

});

Element.implement({

	makeDraggable: function(options){
		var drag = new Drag.Move(this, options);
		this.store('dragger', drag);
		return drag;
	}

});

/*
---

script: Element.Measure.js

name: Element.Measure

description: Extends the Element native object to include methods useful in measuring dimensions.

credits: "Element.measure / .expose methods by Daniel Steigerwald License: MIT-style license. Copyright: Copyright (c) 2008 Daniel Steigerwald, daniel.steigerwald.cz"

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Element.Style
  - Core/Element.Dimensions
  - MooTools.More

provides: [Element.Measure]

...
*/

(function(){

var getStylesList = function(styles, planes){
	var list = [];
	Object.each(planes, function(directions){
		Object.each(directions, function(edge){
			styles.each(function(style){
				list.push(style + '-' + edge + (style == 'border' ? '-width' : ''));
			});
		});
	});
	return list;
};

var calculateEdgeSize = function(edge, styles){
	var total = 0;
	Object.each(styles, function(value, style){
		if (style.test(edge)) total = total + value.toInt();
	});
	return total;
};

var isVisible = function(el){
	return !!(!el || el.offsetHeight || el.offsetWidth);
};


Element.implement({

	measure: function(fn){
		if (isVisible(this)) return fn.call(this);
		var parent = this.getParent(),
			toMeasure = [];
		while (!isVisible(parent) && parent != document.body){
			toMeasure.push(parent.expose());
			parent = parent.getParent();
		}
		var restore = this.expose(),
			result = fn.call(this);
		restore();
		toMeasure.each(function(restore){
			restore();
		});
		return result;
	},

	expose: function(){
		if (this.getStyle('display') != 'none') return function(){};
		var before = this.style.cssText;
		this.setStyles({
			display: 'block',
			position: 'absolute',
			visibility: 'hidden'
		});
		return function(){
			this.style.cssText = before;
		}.bind(this);
	},

	getDimensions: function(options){
		options = Object.merge({computeSize: false}, options);
		var dim = {x: 0, y: 0};

		var getSize = function(el, options){
			return (options.computeSize) ? el.getComputedSize(options) : el.getSize();
		};

		var parent = this.getParent('body');

		if (parent && this.getStyle('display') == 'none'){
			dim = this.measure(function(){
				return getSize(this, options);
			});
		} else if (parent){
			try { //safari sometimes crashes here, so catch it
				dim = getSize(this, options);
			}catch(e){}
		}

		return Object.append(dim, (dim.x || dim.x === 0) ? {
				width: dim.x,
				height: dim.y
			} : {
				x: dim.width,
				y: dim.height
			}
		);
	},

	getComputedSize: function(options){
		

		options = Object.merge({
			styles: ['padding','border'],
			planes: {
				height: ['top','bottom'],
				width: ['left','right']
			},
			mode: 'both'
		}, options);

		var styles = {},
			size = {width: 0, height: 0},
			dimensions;

		if (options.mode == 'vertical'){
			delete size.width;
			delete options.planes.width;
		} else if (options.mode == 'horizontal'){
			delete size.height;
			delete options.planes.height;
		}

		getStylesList(options.styles, options.planes).each(function(style){
			styles[style] = this.getStyle(style).toInt();
		}, this);

		Object.each(options.planes, function(edges, plane){

			var capitalized = plane.capitalize(),
				style = this.getStyle(plane);

			if (style == 'auto' && !dimensions) dimensions = this.getDimensions();

			style = styles[plane] = (style == 'auto') ? dimensions[plane] : style.toInt();
			size['total' + capitalized] = style;

			edges.each(function(edge){
				var edgesize = calculateEdgeSize(edge, styles);
				size['computed' + edge.capitalize()] = edgesize;
				size['total' + capitalized] += edgesize;
			});

		}, this);

		return Object.append(size, styles);
	}

});

})();

/*
---

script: Slider.js

name: Slider

description: Class for creating horizontal and vertical slider controls.

license: MIT-style license

authors:
  - Valerio Proietti

requires:
  - Core/Element.Dimensions
  - Core/Number
  - Class.Binds
  - Drag
  - Element.Measure

provides: [Slider]

...
*/

var Slider = new Class({

	Implements: [Events, Options],

	Binds: ['clickedElement', 'draggedKnob', 'scrolledElement'],

	options: {/*
		onTick: function(intPosition){},
		onMove: function(){},
		onChange: function(intStep){},
		onComplete: function(strStep){},*/
		onTick: function(position){
			this.setKnobPosition(position);
		},
		initialStep: 0,
		snap: false,
		offset: 0,
		range: false,
		wheel: false,
		steps: 100,
		mode: 'horizontal'
	},

	initialize: function(element, knob, options){
		this.setOptions(options);
		options = this.options;
		this.element = document.id(element);
		knob = this.knob = document.id(knob);
		this.previousChange = this.previousEnd = this.step = options.initialStep ? options.initialStep : options.range ? options.range[0] : 0;

		var limit = {},
			modifiers = {x: false, y: false};

		switch (options.mode){
			case 'vertical':
				this.axis = 'y';
				this.property = 'top';
				this.offset = 'offsetHeight';
				break;
			case 'horizontal':
				this.axis = 'x';
				this.property = 'left';
				this.offset = 'offsetWidth';
		}

		this.setSliderDimensions();
		this.setRange(options.range, null, true);

		if (knob.getStyle('position') == 'static') knob.setStyle('position', 'relative');
		knob.setStyle(this.property, -options.offset);
		modifiers[this.axis] = this.property;
		limit[this.axis] = [-options.offset, this.full - options.offset];

		var dragOptions = {
			snap: 0,
			limit: limit,
			modifiers: modifiers,
			onDrag: this.draggedKnob,
			onStart: this.draggedKnob,
			onBeforeStart: (function(){
				this.isDragging = true;
			}).bind(this),
			onCancel: function(){
				this.isDragging = false;
			}.bind(this),
			onComplete: function(){
				this.isDragging = false;
				this.draggedKnob();
				this.end();
			}.bind(this)
		};
		if (options.snap) this.setSnap(dragOptions);

		this.drag = new Drag(knob, dragOptions);
		if (options.initialStep != null) this.set(options.initialStep, true);
		this.attach();
	},

	attach: function(){
		this.element.addEvent('mousedown', this.clickedElement);
		if (this.options.wheel) this.element.addEvent('mousewheel', this.scrolledElement);
		this.drag.attach();
		return this;
	},

	detach: function(){
		this.element.removeEvent('mousedown', this.clickedElement)
			.removeEvent('mousewheel', this.scrolledElement);
		this.drag.detach();
		return this;
	},

	autosize: function(){
		this.setSliderDimensions()
			.setKnobPosition(this.toPosition(this.step));
		this.drag.options.limit[this.axis] = [-this.options.offset, this.full - this.options.offset];
		if (this.options.snap) this.setSnap();
		return this;
	},

	setSnap: function(options){
		if (!options) options = this.drag.options;
		options.grid = Math.ceil(this.stepWidth);
		options.limit[this.axis][1] = this.element[this.offset];
		return this;
	},

	setKnobPosition: function(position){
		if (this.options.snap) position = this.toPosition(this.step);
		this.knob.setStyle(this.property, position);
		return this;
	},

	setSliderDimensions: function(){
		this.full = this.element.measure(function(){
			this.half = this.knob[this.offset] / 2;
			return this.element[this.offset] - this.knob[this.offset] + (this.options.offset * 2);
		}.bind(this));
		return this;
	},

	set: function(step, silently){
		if (!((this.range > 0) ^ (step < this.min))) step = this.min;
		if (!((this.range > 0) ^ (step > this.max))) step = this.max;

		this.step = (step).round(this.modulus.decimalLength);
		if (silently) this.checkStep().setKnobPosition(this.toPosition(this.step));
		else this.checkStep().fireEvent('tick', this.toPosition(this.step)).fireEvent('move').end();
		return this;
	},

	setRange: function(range, pos, silently){
		this.min = Array.pick([range[0], 0]);
		this.max = Array.pick([range[1], this.options.steps]);
		this.range = this.max - this.min;
		this.steps = this.options.steps || this.full;
		var stepSize = this.stepSize = Math.abs(this.range) / this.steps;
		this.stepWidth = this.stepSize * this.full / Math.abs(this.range);
		this.setModulus();

		if (range) this.set(Array.pick([pos, this.step]).limit(this.min,this.max), silently);
		return this;
	},
    
	setModulus: function(){
		var decimals = ((this.stepSize + '').split('.')[1] || []).length,
			modulus = 1 + '';
		while (decimals--) modulus += '0';
		this.modulus = {multiplier: (modulus).toInt(10), decimalLength: modulus.length - 1};
	},

	clickedElement: function(event){
		if (this.isDragging || event.target == this.knob) return;

		var dir = this.range < 0 ? -1 : 1,
			position = event.page[this.axis] - this.element.getPosition()[this.axis] - this.half;

		position = position.limit(-this.options.offset, this.full - this.options.offset);

		this.step = (this.min + dir * this.toStep(position)).round(this.modulus.decimalLength);

		this.checkStep()
			.fireEvent('tick', position)
			.fireEvent('move')
			.end();
	},

	scrolledElement: function(event){
		var mode = (this.options.mode == 'horizontal') ? (event.wheel < 0) : (event.wheel > 0);
		this.set(this.step + (mode ? -1 : 1) * this.stepSize);
		event.stop();
	},

	draggedKnob: function(){
		var dir = this.range < 0 ? -1 : 1,
			position = this.drag.value.now[this.axis];

		position = position.limit(-this.options.offset, this.full -this.options.offset);

		this.step = (this.min + dir * this.toStep(position)).round(this.modulus.decimalLength);
		this.checkStep();
		this.fireEvent('move');
	},

	checkStep: function(){
		var step = this.step;
		if (this.previousChange != step){
			this.previousChange = step;
			this.fireEvent('change', step);
		}
		return this;
	},

	end: function(){
		var step = this.step;
		if (this.previousEnd !== step){
			this.previousEnd = step;
			this.fireEvent('complete', step + '');
		}
		return this;
	},

	toStep: function(position){
		var step = (position + this.options.offset) * this.stepSize / this.full * this.steps;
		return this.options.steps ? (step - (step * this.modulus.multiplier) % (this.stepSize * this.modulus.multiplier) / this.modulus.multiplier).round(this.modulus.decimalLength) : step;
	},

	toPosition: function(step){
		return (this.full * Math.abs(this.min - step)) / (this.steps * this.stepSize) - this.options.offset || 0;
	}

});

/*
---

script: Sortables.js

name: Sortables

description: Class for creating a drag and drop sorting interface for lists of items.

license: MIT-style license

authors:
  - Tom Occhino

requires:
  - Core/Fx.Morph
  - Drag.Move

provides: [Sortables]

...
*/

var Sortables = new Class({

	Implements: [Events, Options],

	options: {/*
		onSort: function(element, clone){},
		onStart: function(element, clone){},
		onComplete: function(element){},*/
		opacity: 1,
		clone: false,
		revert: false,
		handle: false,
		dragOptions: {},
		unDraggableTags: ['button', 'input', 'a', 'textarea', 'select', 'option']
	},

	initialize: function(lists, options){
		this.setOptions(options);

		this.elements = [];
		this.lists = [];
		this.idle = true;

		this.addLists($$(document.id(lists) || lists));

		if (!this.options.clone) this.options.revert = false;
		if (this.options.revert) this.effect = new Fx.Morph(null, Object.merge({
			duration: 250,
			link: 'cancel'
		}, this.options.revert));
	},

	attach: function(){
		this.addLists(this.lists);
		return this;
	},

	detach: function(){
		this.lists = this.removeLists(this.lists);
		return this;
	},

	addItems: function(){
		Array.flatten(arguments).each(function(element){
			this.elements.push(element);
			var start = element.retrieve('sortables:start', function(event){
				this.start.call(this, event, element);
			}.bind(this));
			(this.options.handle ? element.getElement(this.options.handle) || element : element).addEvent('mousedown', start);
		}, this);
		return this;
	},

	addLists: function(){
		Array.flatten(arguments).each(function(list){
			this.lists.include(list);
			this.addItems(list.getChildren());
		}, this);
		return this;
	},

	removeItems: function(){
		return $$(Array.flatten(arguments).map(function(element){
			this.elements.erase(element);
			var start = element.retrieve('sortables:start');
			(this.options.handle ? element.getElement(this.options.handle) || element : element).removeEvent('mousedown', start);

			return element;
		}, this));
	},

	removeLists: function(){
		return $$(Array.flatten(arguments).map(function(list){
			this.lists.erase(list);
			this.removeItems(list.getChildren());

			return list;
		}, this));
	},
    
	getDroppableCoordinates: function (element){
		var offsetParent = element.getOffsetParent();
		var position = element.getPosition(offsetParent);
		var scroll = {
			w: window.getScroll(),
			offsetParent: offsetParent.getScroll()
		};
		position.x += scroll.offsetParent.x;
		position.y += scroll.offsetParent.y;

		if (offsetParent.getStyle('position') == 'fixed'){
			position.x -= scroll.w.x;
			position.y -= scroll.w.y;
		}

        return position;
	},

	getClone: function(event, element){
		if (!this.options.clone) return new Element(element.tagName).inject(document.body);
		if (typeOf(this.options.clone) == 'function') return this.options.clone.call(this, event, element, this.list);
		var clone = element.clone(true).setStyles({
			margin: 0,
			position: 'absolute',
			visibility: 'hidden',
			width: element.getStyle('width')
		}).addEvent('mousedown', function(event){
			element.fireEvent('mousedown', event);
		});
		//prevent the duplicated radio inputs from unchecking the real one
		if (clone.get('html').test('radio')){
			clone.getElements('input[type=radio]').each(function(input, i){
				input.set('name', 'clone_' + i);
				if (input.get('checked')) element.getElements('input[type=radio]')[i].set('checked', true);
			});
		}

		return clone.inject(this.list).setPosition(this.getDroppableCoordinates(this.element));
	},

	getDroppables: function(){
		var droppables = this.list.getChildren().erase(this.clone).erase(this.element);
		if (!this.options.constrain) droppables.append(this.lists).erase(this.list);
		return droppables;
	},

	insert: function(dragging, element){
		var where = 'inside';
		if (this.lists.contains(element)){
			this.list = element;
			this.drag.droppables = this.getDroppables();
		} else {
			where = this.element.getAllPrevious().contains(element) ? 'before' : 'after';
		}
		this.element.inject(element, where);
		this.fireEvent('sort', [this.element, this.clone]);
	},

	start: function(event, element){
		if (
			!this.idle ||
			event.rightClick ||
			(!this.options.handle && this.options.unDraggableTags.contains(event.target.get('tag')))
		) return;

		this.idle = false;
		this.element = element;
		this.opacity = element.getStyle('opacity');
		this.list = element.getParent();
		this.clone = this.getClone(event, element);

		this.drag = new Drag.Move(this.clone, Object.merge({
			
			droppables: this.getDroppables()
		}, this.options.dragOptions)).addEvents({
			onSnap: function(){
				event.stop();
				this.clone.setStyle('visibility', 'visible');
				this.element.setStyle('opacity', this.options.opacity || 0);
				this.fireEvent('start', [this.element, this.clone]);
			}.bind(this),
			onEnter: this.insert.bind(this),
			onCancel: this.end.bind(this),
			onComplete: this.end.bind(this)
		});

		this.clone.inject(this.element, 'before');
		this.drag.start(event);
	},

	end: function(){
		this.drag.detach();
		this.element.setStyle('opacity', this.opacity);
		var self = this;
		if (this.effect){
			var dim = this.element.getStyles('width', 'height'),
				clone = this.clone,
				pos = clone.computePosition(this.getDroppableCoordinates(clone));

			var destroy = function(){
				this.removeEvent('cancel', destroy);
				clone.destroy();
				self.reset();
			};

			this.effect.element = clone;
			this.effect.start({
				top: pos.top,
				left: pos.left,
				width: dim.width,
				height: dim.height,
				opacity: 0.25
			}).addEvent('cancel', destroy).chain(destroy);
		} else {
			this.clone.destroy();
			self.reset();
		}
		
	},

	reset: function(){
		this.idle = true;
		this.fireEvent('complete', this.element);
	},

	serialize: function(){
		var params = Array.link(arguments, {
			modifier: Type.isFunction,
			index: function(obj){
				return obj != null;
			}
		});
		var serial = this.lists.map(function(list){
			return list.getChildren().map(params.modifier || function(element){
				return element.get('id');
			}, this);
		}, this);

		var index = params.index;
		if (this.lists.length == 1) index = 0;
		return (index || index === 0) && index >= 0 && index < this.lists.length ? serial[index] : serial;
	}

});

/*
---

name: Element.Event.Pseudos

description: Adds the functionality to add pseudo events for Elements

license: MIT-style license

authors:
  - Arian Stolwijk

requires: [Core/Element.Event, Core/Element.Delegation, Events.Pseudos]

provides: [Element.Event.Pseudos, Element.Delegation.Pseudo]

...
*/

(function(){

var pseudos = {relay: false},
	copyFromEvents = ['once', 'throttle', 'pause'],
	count = copyFromEvents.length;

while (count--) pseudos[copyFromEvents[count]] = Events.lookupPseudo(copyFromEvents[count]);

DOMEvent.definePseudo = function(key, listener){
	pseudos[key] = listener;
	return this;
};

var proto = Element.prototype;
[Element, Window, Document].invoke('implement', Events.Pseudos(pseudos, proto.addEvent, proto.removeEvent));

})();

/*
---

name: Element.Event.Pseudos.Keys

description: Adds functionality fire events if certain keycombinations are pressed

license: MIT-style license

authors:
  - Arian Stolwijk

requires: [Element.Event.Pseudos]

provides: [Element.Event.Pseudos.Keys]

...
*/

(function(){

var keysStoreKey = '$moo:keys-pressed',
	keysKeyupStoreKey = '$moo:keys-keyup';


DOMEvent.definePseudo('keys', function(split, fn, args){

	var event = args[0],
		keys = [],
		pressed = this.retrieve(keysStoreKey, []),
		value = split.value;

	if (value != '+') keys.append(value.replace('++', function(){
		keys.push('+'); // shift++ and shift+++a
		return '';
	}).split('+'));
	else keys = ['+'];

	pressed.include(event.key);

	if (keys.every(function(key){
		return pressed.contains(key);
	})) fn.apply(this, args);

	this.store(keysStoreKey, pressed);

	if (!this.retrieve(keysKeyupStoreKey)){
		var keyup = function(event){
			(function(){
				pressed = this.retrieve(keysStoreKey, []).erase(event.key);
				this.store(keysStoreKey, pressed);
			}).delay(0, this); // Fix for IE
		};
		this.store(keysKeyupStoreKey, keyup).addEvent('keyup', keyup);
	}

});

DOMEvent.defineKeys({
	'16': 'shift',
	'17': 'control',
	'18': 'alt',
	'20': 'capslock',
	'33': 'pageup',
	'34': 'pagedown',
	'35': 'end',
	'36': 'home',
	'144': 'numlock',
	'145': 'scrolllock',
	'186': ';',
	'187': '=',
	'188': ',',
	'190': '.',
	'191': '/',
	'192': '`',
	'219': '[',
	'220': '\\',
	'221': ']',
	'222': "'",
	'107': '+',
	'109': '-', // subtract
	'189': '-'  // dash
})

})();

/*
---

script: String.Extras.js

name: String.Extras

description: Extends the String native object to include methods useful in managing various kinds of strings (query strings, urls, html, etc).

license: MIT-style license

authors:
  - Aaron Newton
  - Guillermo Rauch
  - Christopher Pitt

requires:
  - Core/String
  - Core/Array
  - MooTools.More

provides: [String.Extras]

...
*/

(function(){

var special = {
	'a': /[àáâãäåăą]/g,
	'A': /[ÀÁÂÃÄÅĂĄ]/g,
	'c': /[ćčç]/g,
	'C': /[ĆČÇ]/g,
	'd': /[ďđ]/g,
	'D': /[ĎÐ]/g,
	'e': /[èéêëěę]/g,
	'E': /[ÈÉÊËĚĘ]/g,
	'g': /[ğ]/g,
	'G': /[Ğ]/g,
	'i': /[ìíîï]/g,
	'I': /[ÌÍÎÏ]/g,
	'l': /[ĺľł]/g,
	'L': /[ĹĽŁ]/g,
	'n': /[ñňń]/g,
	'N': /[ÑŇŃ]/g,
	'o': /[òóôõöøő]/g,
	'O': /[ÒÓÔÕÖØ]/g,
	'r': /[řŕ]/g,
	'R': /[ŘŔ]/g,
	's': /[ššş]/g,
	'S': /[ŠŞŚ]/g,
	't': /[ťţ]/g,
	'T': /[ŤŢ]/g,
	'u': /[ùúûůüµ]/g,
	'U': /[ÙÚÛŮÜ]/g,
	'y': /[ÿý]/g,
	'Y': /[ŸÝ]/g,
	'z': /[žźż]/g,
	'Z': /[ŽŹŻ]/g,
	'th': /[þ]/g,
	'TH': /[Þ]/g,
	'dh': /[ð]/g,
	'DH': /[Ð]/g,
	'ss': /[ß]/g,
	'oe': /[œ]/g,
	'OE': /[Œ]/g,
	'ae': /[æ]/g,
	'AE': /[Æ]/g
},

tidy = {
	' ': /[\xa0\u2002\u2003\u2009]/g,
	'*': /[\xb7]/g,
	'\'': /[\u2018\u2019]/g,
	'"': /[\u201c\u201d]/g,
	'...': /[\u2026]/g,
	'-': /[\u2013]/g,
//	'--': /[\u2014]/g,
	'&raquo;': /[\uFFFD]/g
},

conversions = {
	ms: 1,
	s: 1000,
	m: 6e4,
	h: 36e5
},

findUnits = /(\d*.?\d+)([msh]+)/;

var walk = function(string, replacements){
	var result = string, key;
	for (key in replacements) result = result.replace(replacements[key], key);
	return result;
};

var getRegexForTag = function(tag, contents){
	tag = tag || '';
	var regstr = contents ? "<" + tag + "(?!\\w)[^>]*>([\\s\\S]*?)<\/" + tag + "(?!\\w)>" : "<\/?" + tag + "([^>]+)?>",
		reg = new RegExp(regstr, "gi");
	return reg;
};

String.implement({

	standardize: function(){
		return walk(this, special);
	},

	repeat: function(times){
		return new Array(times + 1).join(this);
	},

	pad: function(length, str, direction){
		if (this.length >= length) return this;

		var pad = (str == null ? ' ' : '' + str)
			.repeat(length - this.length)
			.substr(0, length - this.length);

		if (!direction || direction == 'right') return this + pad;
		if (direction == 'left') return pad + this;

		return pad.substr(0, (pad.length / 2).floor()) + this + pad.substr(0, (pad.length / 2).ceil());
	},

	getTags: function(tag, contents){
		return this.match(getRegexForTag(tag, contents)) || [];
	},

	stripTags: function(tag, contents){
		return this.replace(getRegexForTag(tag, contents), '');
	},

	tidy: function(){
		return walk(this, tidy);
	},

	truncate: function(max, trail, atChar){
		var string = this;
		if (trail == null && arguments.length == 1) trail = '…';
		if (string.length > max){
			string = string.substring(0, max);
			if (atChar){
				var index = string.lastIndexOf(atChar);
				if (index != -1) string = string.substr(0, index);
			}
			if (trail) string += trail;
		}
		return string;
	},

	ms: function(){
	  // "Borrowed" from https://gist.github.com/1503944
		var units = findUnits.exec(this);
		if (units == null) return Number(this);
		return Number(units[1]) * conversions[units[2]];
	}

});

})();

/*
---

script: Element.Forms.js

name: Element.Forms

description: Extends the Element native object to include methods useful in managing inputs.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Element
  - String.Extras
  - MooTools.More

provides: [Element.Forms]

...
*/

Element.implement({

	tidy: function(){
		this.set('value', this.get('value').tidy());
	},

	getTextInRange: function(start, end){
		return this.get('value').substring(start, end);
	},

	getSelectedText: function(){
		if (this.setSelectionRange) return this.getTextInRange(this.getSelectionStart(), this.getSelectionEnd());
		return document.selection.createRange().text;
	},

	getSelectedRange: function(){
		if (this.selectionStart != null){
			return {
				start: this.selectionStart,
				end: this.selectionEnd
			};
		}

		var pos = {
			start: 0,
			end: 0
		};
		var range = this.getDocument().selection.createRange();
		if (!range || range.parentElement() != this) return pos;
		var duplicate = range.duplicate();

		if (this.type == 'text'){
			pos.start = 0 - duplicate.moveStart('character', -100000);
			pos.end = pos.start + range.text.length;
		} else {
			var value = this.get('value');
			var offset = value.length;
			duplicate.moveToElementText(this);
			duplicate.setEndPoint('StartToEnd', range);
			if (duplicate.text.length) offset -= value.match(/[\n\r]*$/)[0].length;
			pos.end = offset - duplicate.text.length;
			duplicate.setEndPoint('StartToStart', range);
			pos.start = offset - duplicate.text.length;
		}
		return pos;
	},

	getSelectionStart: function(){
		return this.getSelectedRange().start;
	},

	getSelectionEnd: function(){
		return this.getSelectedRange().end;
	},

	setCaretPosition: function(pos){
		if (pos == 'end') pos = this.get('value').length;
		this.selectRange(pos, pos);
		return this;
	},

	getCaretPosition: function(){
		return this.getSelectedRange().start;
	},

	selectRange: function(start, end){
		if (this.setSelectionRange){
			this.focus();
			this.setSelectionRange(start, end);
		} else {
			var value = this.get('value');
			var diff = value.substr(start, end - start).replace(/\r/g, '').length;
			start = value.substr(0, start).replace(/\r/g, '').length;
			var range = this.createTextRange();
			range.collapse(true);
			range.moveEnd('character', start + diff);
			range.moveStart('character', start);
			range.select();
		}
		return this;
	},

	insertAtCursor: function(value, select){
		var pos = this.getSelectedRange();
		var text = this.get('value');
		this.set('value', text.substring(0, pos.start) + value + text.substring(pos.end, text.length));
		if (select !== false) this.selectRange(pos.start, pos.start + value.length);
		else this.setCaretPosition(pos.start + value.length);
		return this;
	},

	insertAroundCursor: function(options, select){
		options = Object.append({
			before: '',
			defaultMiddle: '',
			after: ''
		}, options);

		var value = this.getSelectedText() || options.defaultMiddle;
		var pos = this.getSelectedRange();
		var text = this.get('value');

		if (pos.start == pos.end){
			this.set('value', text.substring(0, pos.start) + options.before + value + options.after + text.substring(pos.end, text.length));
			this.selectRange(pos.start + options.before.length, pos.end + options.before.length + value.length);
		} else {
			var current = text.substring(pos.start, pos.end);
			this.set('value', text.substring(0, pos.start) + options.before + current + options.after + text.substring(pos.end, text.length));
			var selStart = pos.start + options.before.length;
			if (select !== false) this.selectRange(selStart, selStart + current.length);
			else this.setCaretPosition(selStart + text.length);
		}
		return this;
	}

});

/*
---

script: Element.Pin.js

name: Element.Pin

description: Extends the Element native object to include the pin method useful for fixed positioning for elements.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Element.Event
  - Core/Element.Dimensions
  - Core/Element.Style
  - MooTools.More

provides: [Element.Pin]

...
*/

(function(){
	var supportsPositionFixed = false,
		supportTested = false;

	var testPositionFixed = function(){
		var test = new Element('div').setStyles({
			position: 'fixed',
			top: 0,
			right: 0
		}).inject(document.body);
		supportsPositionFixed = (test.offsetTop === 0);
		test.dispose();
		supportTested = true;
	};

	Element.implement({

		pin: function(enable, forceScroll){
			if (!supportTested) testPositionFixed();
			if (this.getStyle('display') == 'none') return this;

			var pinnedPosition,
				scroll = window.getScroll(),
				parent,
				scrollFixer;

			if (enable !== false){
				pinnedPosition = this.getPosition();
				if (!this.retrieve('pin:_pinned')) {
					var currentPosition = {
						top: pinnedPosition.y - scroll.y,
						left: pinnedPosition.x - scroll.x,
						margin: '0px',
						padding: '0px'
					};

					if (supportsPositionFixed && !forceScroll){
						this.setStyle('position', 'fixed').setStyles(currentPosition);
					} else {

						parent = this.getOffsetParent();
						var position = this.getPosition(parent),
							styles = this.getStyles('left', 'top');

						if (parent && styles.left == 'auto' || styles.top == 'auto') this.setPosition(position);
						if (this.getStyle('position') == 'static') this.setStyle('position', 'absolute');

						position = {
							x: styles.left.toInt() - scroll.x,
							y: styles.top.toInt() - scroll.y
						};

						scrollFixer = function(){
							if (!this.retrieve('pin:_pinned')) return;
							var scroll = window.getScroll();
							this.setStyles({
								left: position.x + scroll.x,
								top: position.y + scroll.y
							});
						}.bind(this);

						this.store('pin:_scrollFixer', scrollFixer);
						window.addEvent('scroll', scrollFixer);
					}
					this.store('pin:_pinned', true);
				}

			} else {
				if (!this.retrieve('pin:_pinned')) return this;

				parent = this.getParent();
				var offsetParent = (parent.getComputedStyle('position') != 'static' ? parent : parent.getOffsetParent());

				pinnedPosition = this.getPosition();

				this.store('pin:_pinned', false);
				scrollFixer = this.retrieve('pin:_scrollFixer');
				if (!scrollFixer){
					this.setStyles({
						position: 'absolute',
						top: pinnedPosition.y + scroll.y,
						left: pinnedPosition.x + scroll.x
					});
				} else {
					this.store('pin:_scrollFixer', null);
					window.removeEvent('scroll', scrollFixer);
				}
				this.removeClass('isPinned');
			}
			return this;
		},

		unpin: function(){
			return this.pin(false);
		},

		togglePin: function(){
			return this.pin(!this.retrieve('pin:_pinned'));
		}

	});



})();

/*
---

script: Element.Position.js

name: Element.Position

description: Extends the Element native object to include methods useful positioning elements relative to others.

license: MIT-style license

authors:
  - Aaron Newton
  - Jacob Thornton

requires:
  - Core/Options
  - Core/Element.Dimensions
  - Element.Measure

provides: [Element.Position]

...
*/

(function(original){

var local = Element.Position = {

	options: {/*
		edge: false,
		returnPos: false,
		minimum: {x: 0, y: 0},
		maximum: {x: 0, y: 0},
		relFixedPosition: false,
		ignoreMargins: false,
		ignoreScroll: false,
		allowNegative: false,*/
		relativeTo: document.body,
		position: {
			x: 'center', //left, center, right
			y: 'center' //top, center, bottom
		},
		offset: {x: 0, y: 0}
	},

	getOptions: function(element, options){
		options = Object.merge({}, local.options, options);
		local.setPositionOption(options);
		local.setEdgeOption(options);
		local.setOffsetOption(element, options);
		local.setDimensionsOption(element, options);
		return options;
	},

	setPositionOption: function(options){
		options.position = local.getCoordinateFromValue(options.position);
	},

	setEdgeOption: function(options){
		var edgeOption = local.getCoordinateFromValue(options.edge);
		options.edge = edgeOption ? edgeOption :
			(options.position.x == 'center' && options.position.y == 'center') ? {x: 'center', y: 'center'} :
			{x: 'left', y: 'top'};
	},

	setOffsetOption: function(element, options){
		var parentOffset = {x: 0, y: 0};
		var parentScroll = {x: 0, y: 0};
		var offsetParent = element.measure(function(){
			return document.id(this.getOffsetParent());
		});

		if (!offsetParent || offsetParent == element.getDocument().body) return;

		parentScroll = offsetParent.getScroll();
		parentOffset = offsetParent.measure(function(){
			var position = this.getPosition();
			if (this.getStyle('position') == 'fixed'){
				var scroll = window.getScroll();
				position.x += scroll.x;
				position.y += scroll.y;
			}
			return position;
		});

		options.offset = {
			parentPositioned: offsetParent != document.id(options.relativeTo),
			x: options.offset.x - parentOffset.x + parentScroll.x,
			y: options.offset.y - parentOffset.y + parentScroll.y
		};
	},

	setDimensionsOption: function(element, options){
		options.dimensions = element.getDimensions({
			computeSize: true,
			styles: ['padding', 'border', 'margin']
		});
	},

	getPosition: function(element, options){
		var position = {};
		options = local.getOptions(element, options);
		var relativeTo = document.id(options.relativeTo) || document.body;

		local.setPositionCoordinates(options, position, relativeTo);
		if (options.edge) local.toEdge(position, options);

		var offset = options.offset;
		position.left = ((position.x >= 0 || offset.parentPositioned || options.allowNegative) ? position.x : 0).toInt();
		position.top = ((position.y >= 0 || offset.parentPositioned || options.allowNegative) ? position.y : 0).toInt();

		local.toMinMax(position, options);

		if (options.relFixedPosition || relativeTo.getStyle('position') == 'fixed') local.toRelFixedPosition(relativeTo, position);
		if (options.ignoreScroll) local.toIgnoreScroll(relativeTo, position);
		if (options.ignoreMargins) local.toIgnoreMargins(position, options);

		position.left = Math.ceil(position.left);
		position.top = Math.ceil(position.top);
		delete position.x;
		delete position.y;

		return position;
	},

	setPositionCoordinates: function(options, position, relativeTo){
		var offsetY = options.offset.y,
			offsetX = options.offset.x,
			calc = (relativeTo == document.body) ? window.getScroll() : relativeTo.getPosition(),
			top = calc.y,
			left = calc.x,
			winSize = window.getSize();

		switch(options.position.x){
			case 'left': position.x = left + offsetX; break;
			case 'right': position.x = left + offsetX + relativeTo.offsetWidth; break;
			default: position.x = left + ((relativeTo == document.body ? winSize.x : relativeTo.offsetWidth) / 2) + offsetX; break;
		}

		switch(options.position.y){
			case 'top': position.y = top + offsetY; break;
			case 'bottom': position.y = top + offsetY + relativeTo.offsetHeight; break;
			default: position.y = top + ((relativeTo == document.body ? winSize.y : relativeTo.offsetHeight) / 2) + offsetY; break;
		}
	},

	toMinMax: function(position, options){
		var xy = {left: 'x', top: 'y'}, value;
		['minimum', 'maximum'].each(function(minmax){
			['left', 'top'].each(function(lr){
				value = options[minmax] ? options[minmax][xy[lr]] : null;
				if (value != null && ((minmax == 'minimum') ? position[lr] < value : position[lr] > value)) position[lr] = value;
			});
		});
	},

	toRelFixedPosition: function(relativeTo, position){
		var winScroll = window.getScroll();
		position.top += winScroll.y;
		position.left += winScroll.x;
	},

	toIgnoreScroll: function(relativeTo, position){
		var relScroll = relativeTo.getScroll();
		position.top -= relScroll.y;
		position.left -= relScroll.x;
	},

	toIgnoreMargins: function(position, options){
		position.left += options.edge.x == 'right'
			? options.dimensions['margin-right']
			: (options.edge.x != 'center'
				? -options.dimensions['margin-left']
				: -options.dimensions['margin-left'] + ((options.dimensions['margin-right'] + options.dimensions['margin-left']) / 2));

		position.top += options.edge.y == 'bottom'
			? options.dimensions['margin-bottom']
			: (options.edge.y != 'center'
				? -options.dimensions['margin-top']
				: -options.dimensions['margin-top'] + ((options.dimensions['margin-bottom'] + options.dimensions['margin-top']) / 2));
	},

	toEdge: function(position, options){
		var edgeOffset = {},
			dimensions = options.dimensions,
			edge = options.edge;

		switch(edge.x){
			case 'left': edgeOffset.x = 0; break;
			case 'right': edgeOffset.x = -dimensions.x - dimensions.computedRight - dimensions.computedLeft; break;
			// center
			default: edgeOffset.x = -(Math.round(dimensions.totalWidth / 2)); break;
		}

		switch(edge.y){
			case 'top': edgeOffset.y = 0; break;
			case 'bottom': edgeOffset.y = -dimensions.y - dimensions.computedTop - dimensions.computedBottom; break;
			// center
			default: edgeOffset.y = -(Math.round(dimensions.totalHeight / 2)); break;
		}

		position.x += edgeOffset.x;
		position.y += edgeOffset.y;
	},

	getCoordinateFromValue: function(option){
		if (typeOf(option) != 'string') return option;
		option = option.toLowerCase();

		return {
			x: option.test('left') ? 'left'
				: (option.test('right') ? 'right' : 'center'),
			y: option.test(/upper|top/) ? 'top'
				: (option.test('bottom') ? 'bottom' : 'center')
		};
	}

};

Element.implement({

	position: function(options){
		if (options && (options.x != null || options.y != null)){
			return (original ? original.apply(this, arguments) : this);
		}
		var position = this.setStyle('position', 'absolute').calculatePosition(options);
		return (options && options.returnPos) ? position : this.setStyles(position);
	},

	calculatePosition: function(options){
		return local.getPosition(this, options);
	}

});

})(Element.prototype.position);

/*
---

script: Element.Shortcuts.js

name: Element.Shortcuts

description: Extends the Element native object to include some shortcut methods.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Element.Style
  - MooTools.More

provides: [Element.Shortcuts]

...
*/

Element.implement({

	isDisplayed: function(){
		return this.getStyle('display') != 'none';
	},

	isVisible: function(){
		var w = this.offsetWidth,
			h = this.offsetHeight;
		return (w == 0 && h == 0) ? false : (w > 0 && h > 0) ? true : this.style.display != 'none';
	},

	toggle: function(){
		return this[this.isDisplayed() ? 'hide' : 'show']();
	},

	hide: function(){
		var d;
		try {
			//IE fails here if the element is not in the dom
			d = this.getStyle('display');
		} catch(e){}
		if (d == 'none') return this;
		return this.store('element:_originalDisplay', d || '').setStyle('display', 'none');
	},

	show: function(display){
		if (!display && this.isDisplayed()) return this;
		display = display || this.retrieve('element:_originalDisplay') || 'block';
		return this.setStyle('display', (display == 'none') ? 'block' : display);
	},

	swapClass: function(remove, add){
		return this.removeClass(remove).addClass(add);
	}

});

Document.implement({

	clearSelection: function(){
		if (window.getSelection){
			var selection = window.getSelection();
			if (selection && selection.removeAllRanges) selection.removeAllRanges();
		} else if (document.selection && document.selection.empty){
			try {
				//IE fails here if selected element is not in dom
				document.selection.empty();
			} catch(e){}
		}
	}

});

/*
---

script: Elements.From.js

name: Elements.From

description: Returns a collection of elements from a string of html.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/String
  - Core/Element
  - MooTools.More

provides: [Elements.from, Elements.From]

...
*/

Elements.from = function(text, excludeScripts){
	if (excludeScripts || excludeScripts == null) text = text.stripScripts();

	var container, match = text.match(/^\s*(?:<!--.*?-->\s*)*<(t[dhr]|tbody|tfoot|thead)/i);

	if (match){
		container = new Element('table');
		var tag = match[1].toLowerCase();
		if (['td', 'th', 'tr'].contains(tag)){
			container = new Element('tbody').inject(container);
			if (tag != 'tr') container = new Element('tr').inject(container);
		}
	}

	return (container || new Element('div')).set('html', text).getChildren();
};

/*
---

script: IframeShim.js

name: IframeShim

description: Defines IframeShim, a class for obscuring select lists and flash objects in IE.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Element.Event
  - Core/Element.Style
  - Core/Options
  - Core/Events
  - Element.Position
  - Class.Occlude

provides: [IframeShim]

...
*/

(function(){

var browsers = false;


this.IframeShim = new Class({

	Implements: [Options, Events, Class.Occlude],

	options: {
		className: 'iframeShim',
		src: 'javascript:false;document.write("");',
		display: false,
		zIndex: null,
		margin: 0,
		offset: {x: 0, y: 0},
		browsers: browsers
	},

	property: 'IframeShim',

	initialize: function(element, options){
		this.element = document.id(element);
		if (this.occlude()) return this.occluded;
		this.setOptions(options);
		this.makeShim();
		return this;
	},

	makeShim: function(){
		if (this.options.browsers){
			var zIndex = this.element.getStyle('zIndex').toInt();

			if (!zIndex){
				zIndex = 1;
				var pos = this.element.getStyle('position');
				if (pos == 'static' || !pos) this.element.setStyle('position', 'relative');
				this.element.setStyle('zIndex', zIndex);
			}
			zIndex = ((this.options.zIndex != null || this.options.zIndex === 0) && zIndex > this.options.zIndex) ? this.options.zIndex : zIndex - 1;
			if (zIndex < 0) zIndex = 1;
			this.shim = new Element('iframe', {
				src: this.options.src,
				scrolling: 'no',
				frameborder: 0,
				styles: {
					zIndex: zIndex,
					position: 'absolute',
					border: 'none',
					filter: 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'
				},
				'class': this.options.className
			}).store('IframeShim', this);
			var inject = (function(){
				this.shim.inject(this.element, 'after');
				this[this.options.display ? 'show' : 'hide']();
				this.fireEvent('inject');
			}).bind(this);
			if (!IframeShim.ready) window.addEvent('load', inject);
			else inject();
		} else {
			this.position = this.hide = this.show = this.dispose = Function.from(this);
		}
	},

	position: function(){
		if (!IframeShim.ready || !this.shim) return this;
		var size = this.element.measure(function(){
			return this.getSize();
		});
		if (this.options.margin != undefined){
			size.x = size.x - (this.options.margin * 2);
			size.y = size.y - (this.options.margin * 2);
			this.options.offset.x += this.options.margin;
			this.options.offset.y += this.options.margin;
		}
		this.shim.set({width: size.x, height: size.y}).position({
			relativeTo: this.element,
			offset: this.options.offset
		});
		return this;
	},

	hide: function(){
		if (this.shim) this.shim.setStyle('display', 'none');
		return this;
	},

	show: function(){
		if (this.shim) this.shim.setStyle('display', 'block');
		return this.position();
	},

	dispose: function(){
		if (this.shim) this.shim.dispose();
		return this;
	},

	destroy: function(){
		if (this.shim) this.shim.destroy();
		return this;
	}

});

})();

window.addEvent('load', function(){
	IframeShim.ready = true;
});

/*
---

script: Mask.js

name: Mask

description: Creates a mask element to cover another.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Options
  - Core/Events
  - Core/Element.Event
  - Class.Binds
  - Element.Position
  - IframeShim

provides: [Mask]

...
*/

var Mask = new Class({

	Implements: [Options, Events],

	Binds: ['position'],

	options: {/*
		onShow: function(){},
		onHide: function(){},
		onDestroy: function(){},
		onClick: function(event){},
		inject: {
			where: 'after',
			target: null,
		},
		hideOnClick: false,
		id: null,
		destroyOnHide: false,*/
		style: {},
		'class': 'mask',
		maskMargins: false,
		useIframeShim: true,
		iframeShimOptions: {}
	},

	initialize: function(target, options){
		this.target = document.id(target) || document.id(document.body);
		this.target.store('mask', this);
		this.setOptions(options);
		this.render();
		this.inject();
	},

	render: function(){
		this.element = new Element('div', {
			'class': this.options['class'],
			id: this.options.id || 'mask-' + String.uniqueID(),
			styles: Object.merge({}, this.options.style, {
				display: 'none'
			}),
			events: {
				click: function(event){
					this.fireEvent('click', event);
					if (this.options.hideOnClick) this.hide();
				}.bind(this)
			}
		});

		this.hidden = true;
	},

	toElement: function(){
		return this.element;
	},

	inject: function(target, where){
		where = where || (this.options.inject ? this.options.inject.where : '') || (this.target == document.body ? 'inside' : 'after');
		target = target || (this.options.inject && this.options.inject.target) || this.target;

		this.element.inject(target, where);

		if (this.options.useIframeShim){
			this.shim = new IframeShim(this.element, this.options.iframeShimOptions);

			this.addEvents({
				show: this.shim.show.bind(this.shim),
				hide: this.shim.hide.bind(this.shim),
				destroy: this.shim.destroy.bind(this.shim)
			});
		}
	},

	position: function(){
		this.resize(this.options.width, this.options.height);

		this.element.position({
			relativeTo: this.target,
			position: 'topLeft',
			ignoreMargins: !this.options.maskMargins,
			ignoreScroll: this.target == document.body
		});

		return this;
	},

	resize: function(x, y){
		var opt = {
			styles: ['padding', 'border']
		};
		if (this.options.maskMargins) opt.styles.push('margin');

		var dim = this.target.getComputedSize(opt);
		if (this.target == document.body){
			this.element.setStyles({width: 0, height: 0});
			var win = window.getScrollSize();
			if (dim.totalHeight < win.y) dim.totalHeight = win.y;
			if (dim.totalWidth < win.x) dim.totalWidth = win.x;
		}
		this.element.setStyles({
			width: Array.pick([x, dim.totalWidth, dim.x]),
			height: Array.pick([y, dim.totalHeight, dim.y])
		});

		return this;
	},

	show: function(){
		if (!this.hidden) return this;

		window.addEvent('resize', this.position);
		this.position();
		this.showMask.apply(this, arguments);

		return this;
	},

	showMask: function(){
		this.element.setStyle('display', 'block');
		this.hidden = false;
		this.fireEvent('show');
	},

	hide: function(){
		if (this.hidden) return this;

		window.removeEvent('resize', this.position);
		this.hideMask.apply(this, arguments);
		if (this.options.destroyOnHide) return this.destroy();

		return this;
	},

	hideMask: function(){
		this.element.setStyle('display', 'none');
		this.hidden = true;
		this.fireEvent('hide');
	},

	toggle: function(){
		this[this.hidden ? 'show' : 'hide']();
	},

	destroy: function(){
		this.hide();
		this.element.destroy();
		this.fireEvent('destroy');
		this.target.eliminate('mask');
	}

});

Element.Properties.mask = {

	set: function(options){
		var mask = this.retrieve('mask');
		if (mask) mask.destroy();
		return this.eliminate('mask').store('mask:options', options);
	},

	get: function(){
		var mask = this.retrieve('mask');
		if (!mask){
			mask = new Mask(this, this.retrieve('mask:options'));
			this.store('mask', mask);
		}
		return mask;
	}

};

Element.implement({

	mask: function(options){
		if (options) this.set('mask', options);
		this.get('mask').show();
		return this;
	},

	unmask: function(){
		this.get('mask').hide();
		return this;
	}

});

/*
---

script: Spinner.js

name: Spinner

description: Adds a semi-transparent overlay over a dom element with a spinnin ajax icon.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Fx.Tween
  - Core/Request
  - Class.refactor
  - Mask

provides: [Spinner]

...
*/

var Spinner = new Class({

	Extends: Mask,

	Implements: Chain,

	options: {/*
		message: false,*/
		'class': 'spinner',
		containerPosition: {},
		content: {
			'class': 'spinner-content'
		},
		messageContainer: {
			'class': 'spinner-msg'
		},
		img: {
			'class': 'spinner-img'
		},
		fxOptions: {
			link: 'chain'
		}
	},

	initialize: function(target, options){
		this.target = document.id(target) || document.id(document.body);
		this.target.store('spinner', this);
		this.setOptions(options);
		this.render();
		this.inject();

		// Add this to events for when noFx is true; parent methods handle hide/show.
		var deactivate = function(){ this.active = false; }.bind(this);
		this.addEvents({
			hide: deactivate,
			show: deactivate
		});
	},

	render: function(){
		this.parent();

		this.element.set('id', this.options.id || 'spinner-' + String.uniqueID());

		this.content = document.id(this.options.content) || new Element('div', this.options.content);
		this.content.inject(this.element);

		if (this.options.message){
			this.msg = document.id(this.options.message) || new Element('p', this.options.messageContainer).appendText(this.options.message);
			this.msg.inject(this.content);
		}

		if (this.options.img){
			this.img = document.id(this.options.img) || new Element('div', this.options.img);
			this.img.inject(this.content);
		}

		this.element.set('tween', this.options.fxOptions);
	},

	show: function(noFx){
		if (this.active) return this.chain(this.show.bind(this));
		if (!this.hidden){
			this.callChain.delay(20, this);
			return this;
		}

		this.target.set('aria-busy', 'true');
		this.active = true;

		return this.parent(noFx);
	},

	showMask: function(noFx){
		var pos = function(){
			this.content.position(Object.merge({
				relativeTo: this.element
			}, this.options.containerPosition));
		}.bind(this);

		if (noFx){
			this.parent();
			pos();
		} else {
			if (!this.options.style.opacity) this.options.style.opacity = this.element.getStyle('opacity').toFloat();
			this.element.setStyles({
				display: 'block',
				opacity: 0
			}).tween('opacity', this.options.style.opacity);
			pos();
			this.hidden = false;
			this.fireEvent('show');
			this.callChain();
		}
	},

	hide: function(noFx){
		if (this.active) return this.chain(this.hide.bind(this));
		if (this.hidden){
			this.callChain.delay(20, this);
			return this;
		}

		this.target.set('aria-busy', 'false');
		this.active = true;

		return this.parent(noFx);
	},

	hideMask: function(noFx){
		if (noFx) return this.parent();
		this.element.tween('opacity', 0).get('tween').chain(function(){
			this.element.setStyle('display', 'none');
			this.hidden = true;
			this.fireEvent('hide');
			this.callChain();
		}.bind(this));
	},

	destroy: function(){
		this.content.destroy();
		this.parent();
		this.target.eliminate('spinner');
	}

});

Request = Class.refactor(Request, {

	options: {
		useSpinner: false,
		spinnerOptions: {},
		spinnerTarget: false
	},

	initialize: function(options){
		this._send = this.send;
		this.send = function(options){
			var spinner = this.getSpinner();
			if (spinner) spinner.chain(this._send.pass(options, this)).show();
			else this._send(options);
			return this;
		};
		this.previous(options);
	},

	getSpinner: function(){
		if (!this.spinner){
			var update = document.id(this.options.spinnerTarget) || document.id(this.options.update);
			if (this.options.useSpinner && update){
				update.set('spinner', this.options.spinnerOptions);
				var spinner = this.spinner = update.get('spinner');
				['complete', 'exception', 'cancel'].each(function(event){
					this.addEvent(event, spinner.hide.bind(spinner));
				}, this);
			}
		}
		return this.spinner;
	}

});

Element.Properties.spinner = {

	set: function(options){
		var spinner = this.retrieve('spinner');
		if (spinner) spinner.destroy();
		return this.eliminate('spinner').store('spinner:options', options);
	},

	get: function(){
		var spinner = this.retrieve('spinner');
		if (!spinner){
			spinner = new Spinner(this, this.retrieve('spinner:options'));
			this.store('spinner', spinner);
		}
		return spinner;
	}

};

Element.implement({

	spin: function(options){
		if (options) this.set('spinner', options);
		this.get('spinner').show();
		return this;
	},

	unspin: function(){
		this.get('spinner').hide();
		return this;
	}

});

/*
---

script: String.QueryString.js

name: String.QueryString

description: Methods for dealing with URI query strings.

license: MIT-style license

authors:
  - Sebastian Markbåge
  - Aaron Newton
  - Lennart Pilon
  - Valerio Proietti

requires:
  - Core/Array
  - Core/String
  - MooTools.More

provides: [String.QueryString]

...
*/

String.implement({

	parseQueryString: function(decodeKeys, decodeValues){
		if (decodeKeys == null) decodeKeys = true;
		if (decodeValues == null) decodeValues = true;

		var vars = this.split(/[&;]/),
			object = {};
		if (!vars.length) return object;

		vars.each(function(val){
			var index = val.indexOf('=') + 1,
				value = index ? val.substr(index) : '',
				keys = index ? val.substr(0, index - 1).match(/([^\]\[]+|(\B)(?=\]))/g) : [val],
				obj = object;
			if (!keys) return;
			if (decodeValues) value = decodeURIComponent(value);
			keys.each(function(key, i){
				if (decodeKeys) key = decodeURIComponent(key);
				var current = obj[key];

				if (i < keys.length - 1) obj = obj[key] = current || {};
				else if (typeOf(current) == 'array') current.push(value);
				else obj[key] = current != null ? [current, value] : value;
			});
		});

		return object;
	},

	cleanQueryString: function(method){
		return this.split('&').filter(function(val){
			var index = val.indexOf('='),
				key = index < 0 ? '' : val.substr(0, index),
				value = val.substr(index + 1);

			return method ? method.call(null, key, value) : (value || value === 0);
		}).join('&');
	}

});

/*
---

script: Form.Request.js

name: Form.Request

description: Handles the basic functionality of submitting a form and updating a dom element with the result.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Request.HTML
  - Class.Binds
  - Class.Occlude
  - Spinner
  - String.QueryString
  - Element.Delegation.Pseudo

provides: [Form.Request]

...
*/

if (!window.Form) window.Form = {};

(function(){

	Form.Request = new Class({

		Binds: ['onSubmit', 'onFormValidate'],

		Implements: [Options, Events, Class.Occlude],

		options: {/*
			onFailure: function(){},
			onSuccess: function(){}, // aliased to onComplete,
			onSend: function(){}*/
			requestOptions: {
				evalScripts: true,
				useSpinner: true,
				emulation: false,
				link: 'ignore'
			},
			sendButtonClicked: true,
			extraData: {},
			resetForm: true
		},

		property: 'form.request',

		initialize: function(form, target, options){
			this.element = document.id(form);
			if (this.occlude()) return this.occluded;
			this.setOptions(options)
				.setTarget(target)
				.attach();
		},

		setTarget: function(target){
			this.target = document.id(target);
			if (!this.request){
				this.makeRequest();
			} else {
				this.request.setOptions({
					update: this.target
				});
			}
			return this;
		},

		toElement: function(){
			return this.element;
		},

		makeRequest: function(){
			var self = this;
			this.request = new Request.HTML(Object.merge({
					update: this.target,
					emulation: false,
					spinnerTarget: this.element,
					method: this.element.get('method') || 'post'
			}, this.options.requestOptions)).addEvents({
				success: function(tree, elements, html, javascript){
					['complete', 'success'].each(function(evt){
						self.fireEvent(evt, [self.target, tree, elements, html, javascript]);
					});
				},
				failure: function(){
					self.fireEvent('complete', arguments).fireEvent('failure', arguments);
				},
				exception: function(){
					self.fireEvent('failure', arguments);
				}
			});
			return this.attachReset();
		},

		attachReset: function(){
			if (!this.options.resetForm) return this;
			this.request.addEvent('success', function(){
				Function.attempt(function(){
					this.element.reset();
				}.bind(this));
				if (window.OverText) OverText.update();
			}.bind(this));
			return this;
		},

		attach: function(attach){
			var method = (attach != false) ? 'addEvent' : 'removeEvent';
			this.element[method]('click:relay(button, input[type=submit])', this.saveClickedButton.bind(this));

			var fv = this.element.retrieve('validator');
			if (fv) fv[method]('onFormValidate', this.onFormValidate);
			else this.element[method]('submit', this.onSubmit);

			return this;
		},

		detach: function(){
			return this.attach(false);
		},

		//public method
		enable: function(){
			return this.attach();
		},

		//public method
		disable: function(){
			return this.detach();
		},

		onFormValidate: function(valid, form, event){
			//if there's no event, then this wasn't a submit event
			if (!event) return;
			var fv = this.element.retrieve('validator');
			if (valid || (fv && !fv.options.stopOnFailure)){
				event.stop();
				this.send();
			}
		},

		onSubmit: function(event){
			var fv = this.element.retrieve('validator');
			if (fv){
				//form validator was created after Form.Request
				this.element.removeEvent('submit', this.onSubmit);
				fv.addEvent('onFormValidate', this.onFormValidate);
				fv.validate(event);
				return;
			}
			if (event) event.stop();
			this.send();
		},

		saveClickedButton: function(event, target){
			var targetName = target.get('name');
			if (!targetName || !this.options.sendButtonClicked) return;
			this.options.extraData[targetName] = target.get('value') || true;
			this.clickedCleaner = function(){
				delete this.options.extraData[targetName];
				this.clickedCleaner = function(){};
			}.bind(this);
		},

		clickedCleaner: function(){},

		send: function(){
			var str = this.element.toQueryString().trim(),
				data = Object.toQueryString(this.options.extraData);

			if (str) str += "&" + data;
			else str = data;

			this.fireEvent('send', [this.element, str.parseQueryString()]);
			this.request.send({
				data: str,
				url: this.options.requestOptions.url || this.element.get('action')
			});
			this.clickedCleaner();
			return this;
		}

	});

	Element.implement('formUpdate', function(update, options){
		var fq = this.retrieve('form.request');
		if (!fq){
			fq = new Form.Request(this, update, options);
		} else {
			if (update) fq.setTarget(update);
			if (options) fq.setOptions(options).makeRequest();
		}
		fq.send();
		return this;
	});

})();

/*
---

script: Fx.Reveal.js

name: Fx.Reveal

description: Defines Fx.Reveal, a class that shows and hides elements with a transition.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Fx.Morph
  - Element.Shortcuts
  - Element.Measure

provides: [Fx.Reveal]

...
*/

(function(){


var hideTheseOf = function(object){
	var hideThese = object.options.hideInputs;
	if (window.OverText){
		var otClasses = [null];
		OverText.each(function(ot){
			otClasses.include('.' + ot.options.labelClass);
		});
		if (otClasses) hideThese += otClasses.join(', ');
	}
	return (hideThese) ? object.element.getElements(hideThese) : null;
};


Fx.Reveal = new Class({

	Extends: Fx.Morph,

	options: {/*
		onShow: function(thisElement){},
		onHide: function(thisElement){},
		onComplete: function(thisElement){},
		heightOverride: null,
		widthOverride: null,*/
		link: 'cancel',
		styles: ['padding', 'border', 'margin'],
		transitionOpacity: 'opacity' in document.documentElement,
		mode: 'vertical',
		display: function(){
			return this.element.get('tag') != 'tr' ? 'block' : 'table-row';
		},
		opacity: 1,
		hideInputs: !('opacity' in document.documentElement) ? 'select, input, textarea, object, embed' : null
	},

	dissolve: function(){
		if (!this.hiding && !this.showing){
			if (this.element.getStyle('display') != 'none'){
				this.hiding = true;
				this.showing = false;
				this.hidden = true;
				this.cssText = this.element.style.cssText;

				var startStyles = this.element.getComputedSize({
					styles: this.options.styles,
					mode: this.options.mode
				});
				if (this.options.transitionOpacity) startStyles.opacity = this.options.opacity;

				var zero = {};
				Object.each(startStyles, function(style, name){
					zero[name] = [style, 0];
				});

				this.element.setStyles({
					display: Function.from(this.options.display).call(this),
					overflow: 'hidden'
				});

				var hideThese = hideTheseOf(this);
				if (hideThese) hideThese.setStyle('visibility', 'hidden');

				this.$chain.unshift(function(){
					if (this.hidden){
						this.hiding = false;
						this.element.style.cssText = this.cssText;
						this.element.setStyle('display', 'none');
						if (hideThese) hideThese.setStyle('visibility', 'visible');
					}
					this.fireEvent('hide', this.element);
					this.callChain();
				}.bind(this));

				this.start(zero);
			} else {
				this.callChain.delay(10, this);
				this.fireEvent('complete', this.element);
				this.fireEvent('hide', this.element);
			}
		} else if (this.options.link == 'chain'){
			this.chain(this.dissolve.bind(this));
		} else if (this.options.link == 'cancel' && !this.hiding){
			this.cancel();
			this.dissolve();
		}
		return this;
	},

	reveal: function(){
		if (!this.showing && !this.hiding){
			if (this.element.getStyle('display') == 'none'){
				this.hiding = false;
				this.showing = true;
				this.hidden = false;
				this.cssText = this.element.style.cssText;

				var startStyles;
				this.element.measure(function(){
					startStyles = this.element.getComputedSize({
						styles: this.options.styles,
						mode: this.options.mode
					});
				}.bind(this));
				if (this.options.heightOverride != null) startStyles.height = this.options.heightOverride.toInt();
				if (this.options.widthOverride != null) startStyles.width = this.options.widthOverride.toInt();
				if (this.options.transitionOpacity){
					this.element.setStyle('opacity', 0);
					startStyles.opacity = this.options.opacity;
				}

				var zero = {
					height: 0,
					display: Function.from(this.options.display).call(this)
				};
				Object.each(startStyles, function(style, name){
					zero[name] = 0;
				});
				zero.overflow = 'hidden';

				this.element.setStyles(zero);

				var hideThese = hideTheseOf(this);
				if (hideThese) hideThese.setStyle('visibility', 'hidden');

				this.$chain.unshift(function(){
					this.element.style.cssText = this.cssText;
					this.element.setStyle('display', Function.from(this.options.display).call(this));
					if (!this.hidden) this.showing = false;
					if (hideThese) hideThese.setStyle('visibility', 'visible');
					this.callChain();
					this.fireEvent('show', this.element);
				}.bind(this));

				this.start(startStyles);
			} else {
				this.callChain();
				this.fireEvent('complete', this.element);
				this.fireEvent('show', this.element);
			}
		} else if (this.options.link == 'chain'){
			this.chain(this.reveal.bind(this));
		} else if (this.options.link == 'cancel' && !this.showing){
			this.cancel();
			this.reveal();
		}
		return this;
	},

	toggle: function(){
		if (this.element.getStyle('display') == 'none'){
			this.reveal();
		} else {
			this.dissolve();
		}
		return this;
	},

	cancel: function(){
		this.parent.apply(this, arguments);
		if (this.cssText != null) this.element.style.cssText = this.cssText;
		this.hiding = false;
		this.showing = false;
		return this;
	}

});

Element.Properties.reveal = {

	set: function(options){
		this.get('reveal').cancel().setOptions(options);
		return this;
	},

	get: function(){
		var reveal = this.retrieve('reveal');
		if (!reveal){
			reveal = new Fx.Reveal(this);
			this.store('reveal', reveal);
		}
		return reveal;
	}

};

Element.Properties.dissolve = Element.Properties.reveal;

Element.implement({

	reveal: function(options){
		this.get('reveal').setOptions(options).reveal();
		return this;
	},

	dissolve: function(options){
		this.get('reveal').setOptions(options).dissolve();
		return this;
	},

	nix: function(options){
		var params = Array.link(arguments, {destroy: Type.isBoolean, options: Type.isObject});
		this.get('reveal').setOptions(options).dissolve().chain(function(){
			this[params.destroy ? 'destroy' : 'dispose']();
		}.bind(this));
		return this;
	},

	wink: function(){
		var params = Array.link(arguments, {duration: Type.isNumber, options: Type.isObject});
		var reveal = this.get('reveal').setOptions(params.options);
		reveal.reveal().chain(function(){
			(function(){
				reveal.dissolve();
			}).delay(params.duration || 2000);
		});
	}

});

})();

/*
---

script: Form.Request.Append.js

name: Form.Request.Append

description: Handles the basic functionality of submitting a form and updating a dom element with the result. The result is appended to the DOM element instead of replacing its contents.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Form.Request
  - Fx.Reveal
  - Elements.from

provides: [Form.Request.Append]

...
*/

Form.Request.Append = new Class({

	Extends: Form.Request,

	options: {
		//onBeforeEffect: function(){},
		useReveal: true,
		revealOptions: {},
		inject: 'bottom'
	},

	makeRequest: function(){
		this.request = new Request.HTML(Object.merge({
				url: this.element.get('action'),
				method: this.element.get('method') || 'post',
				spinnerTarget: this.element
			}, this.options.requestOptions, {
				evalScripts: false
			})
		).addEvents({
			success: function(tree, elements, html, javascript){
				var container;
				var kids = Elements.from(html);
				if (kids.length == 1){
					container = kids[0];
				} else {
					 container = new Element('div', {
						styles: {
							display: 'none'
						}
					}).adopt(kids);
				}
				container.inject(this.target, this.options.inject);
				if (this.options.requestOptions.evalScripts) Browser.exec(javascript);
				this.fireEvent('beforeEffect', container);
				var finish = function(){
					this.fireEvent('success', [container, this.target, tree, elements, html, javascript]);
				}.bind(this);
				if (this.options.useReveal){
					container.set('reveal', this.options.revealOptions).get('reveal').chain(finish);
					container.reveal();
				} else {
					finish();
				}
			}.bind(this),
			failure: function(xhr){
				this.fireEvent('failure', xhr);
			}.bind(this)
		});
		this.attachReset();
	}

});

/*
---

script: Object.Extras.js

name: Object.Extras

description: Extra Object generics, like getFromPath which allows a path notation to child elements.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Object
  - MooTools.More

provides: [Object.Extras]

...
*/

(function(){

var defined = function(value){
	return value != null;
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

Object.extend({

	getFromPath: function(source, parts){
		if (typeof parts == 'string') parts = parts.split('.');
		for (var i = 0, l = parts.length; i < l; i++){
			if (hasOwnProperty.call(source, parts[i])) source = source[parts[i]];
			else return null;
		}
		return source;
	},

	cleanValues: function(object, method){
		method = method || defined;
		for (var key in object) if (!method(object[key])){
			delete object[key];
		}
		return object;
	},

	erase: function(object, key){
		if (hasOwnProperty.call(object, key)) delete object[key];
		return object;
	},

	run: function(object){
		var args = Array.slice(arguments, 1);
		for (var key in object) if (object[key].apply){
			object[key].apply(object, args);
		}
		return object;
	}

});

})();

/*
---

script: Locale.js

name: Locale

description: Provides methods for localization.

license: MIT-style license

authors:
  - Aaron Newton
  - Arian Stolwijk

requires:
  - Core/Events
  - Object.Extras
  - MooTools.More

provides: [Locale, Lang]

...
*/

(function(){

var current = null,
	locales = {},
	inherits = {};

var getSet = function(set){
	if (instanceOf(set, Locale.Set)) return set;
	else return locales[set];
};

var Locale = this.Locale = {

	define: function(locale, set, key, value){
		var name;
		if (instanceOf(locale, Locale.Set)){
			name = locale.name;
			if (name) locales[name] = locale;
		} else {
			name = locale;
			if (!locales[name]) locales[name] = new Locale.Set(name);
			locale = locales[name];
		}

		if (set) locale.define(set, key, value);

		

		if (!current) current = locale;

		return locale;
	},

	use: function(locale){
		locale = getSet(locale);

		if (locale){
			current = locale;

			this.fireEvent('change', locale);

			
		}

		return this;
	},

	getCurrent: function(){
		return current;
	},

	get: function(key, args){
		return (current) ? current.get(key, args) : '';
	},

	inherit: function(locale, inherits, set){
		locale = getSet(locale);

		if (locale) locale.inherit(inherits, set);
		return this;
	},

	list: function(){
		return Object.keys(locales);
	}

};

Object.append(Locale, new Events);

Locale.Set = new Class({

	sets: {},

	inherits: {
		locales: [],
		sets: {}
	},

	initialize: function(name){
		this.name = name || '';
	},

	define: function(set, key, value){
		var defineData = this.sets[set];
		if (!defineData) defineData = {};

		if (key){
			if (typeOf(key) == 'object') defineData = Object.merge(defineData, key);
			else defineData[key] = value;
		}
		this.sets[set] = defineData;

		return this;
	},

	get: function(key, args, _base){
		var value = Object.getFromPath(this.sets, key);
		if (value != null){
			var type = typeOf(value);
			if (type == 'function') value = value.apply(null, Array.from(args));
			else if (type == 'object') value = Object.clone(value);
			return value;
		}

		// get value of inherited locales
		var index = key.indexOf('.'),
			set = index < 0 ? key : key.substr(0, index),
			names = (this.inherits.sets[set] || []).combine(this.inherits.locales).include('en-US');
		if (!_base) _base = [];

		for (var i = 0, l = names.length; i < l; i++){
			if (_base.contains(names[i])) continue;
			_base.include(names[i]);

			var locale = locales[names[i]];
			if (!locale) continue;

			value = locale.get(key, args, _base);
			if (value != null) return value;
		}

		return '';
	},

	inherit: function(names, set){
		names = Array.from(names);

		if (set && !this.inherits.sets[set]) this.inherits.sets[set] = [];

		var l = names.length;
		while (l--) (set ? this.inherits.sets[set] : this.inherits.locales).unshift(names[l]);

		return this;
	}

});



})();

/*
---

name: Locale.en-US.Date

description: Date messages for US English.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Locale

provides: [Locale.en-US.Date]

...
*/

Locale.define('en-US', 'Date', {

	months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	months_abbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	days_abbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

	// Culture's date order: MM/DD/YYYY
	dateOrder: ['month', 'date', 'year'],
	shortDate: '%m/%d/%Y',
	shortTime: '%I:%M%p',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 0,

	// Date.Extras
	ordinal: function(dayOfMonth){
		// 1st, 2nd, 3rd, etc.
		return (dayOfMonth > 3 && dayOfMonth < 21) ? 'th' : ['th', 'st', 'nd', 'rd', 'th'][Math.min(dayOfMonth % 10, 4)];
	},

	lessThanMinuteAgo: 'less than a minute ago',
	minuteAgo: 'about a minute ago',
	minutesAgo: '{delta} minutes ago',
	hourAgo: 'about an hour ago',
	hoursAgo: 'about {delta} hours ago',
	dayAgo: '1 day ago',
	daysAgo: '{delta} days ago',
	weekAgo: '1 week ago',
	weeksAgo: '{delta} weeks ago',
	monthAgo: '1 month ago',
	monthsAgo: '{delta} months ago',
	yearAgo: '1 year ago',
	yearsAgo: '{delta} years ago',

	lessThanMinuteUntil: 'less than a minute from now',
	minuteUntil: 'about a minute from now',
	minutesUntil: '{delta} minutes from now',
	hourUntil: 'about an hour from now',
	hoursUntil: 'about {delta} hours from now',
	dayUntil: '1 day from now',
	daysUntil: '{delta} days from now',
	weekUntil: '1 week from now',
	weeksUntil: '{delta} weeks from now',
	monthUntil: '1 month from now',
	monthsUntil: '{delta} months from now',
	yearUntil: '1 year from now',
	yearsUntil: '{delta} years from now'

});

/*
---

script: Date.js

name: Date

description: Extends the Date native object to include methods useful in managing dates.

license: MIT-style license

authors:
  - Aaron Newton
  - Nicholas Barthelemy - https://svn.nbarthelemy.com/date-js/
  - Harald Kirshner - mail [at] digitarald.de; http://digitarald.de
  - Scott Kyle - scott [at] appden.com; http://appden.com

requires:
  - Core/Array
  - Core/String
  - Core/Number
  - MooTools.More
  - Locale
  - Locale.en-US.Date

provides: [Date]

...
*/

(function(){

var Date = this.Date;

var DateMethods = Date.Methods = {
	ms: 'Milliseconds',
	year: 'FullYear',
	min: 'Minutes',
	mo: 'Month',
	sec: 'Seconds',
	hr: 'Hours'
};

['Date', 'Day', 'FullYear', 'Hours', 'Milliseconds', 'Minutes', 'Month', 'Seconds', 'Time', 'TimezoneOffset',
	'Week', 'Timezone', 'GMTOffset', 'DayOfYear', 'LastMonth', 'LastDayOfMonth', 'UTCDate', 'UTCDay', 'UTCFullYear',
	'AMPM', 'Ordinal', 'UTCHours', 'UTCMilliseconds', 'UTCMinutes', 'UTCMonth', 'UTCSeconds', 'UTCMilliseconds'].each(function(method){
	Date.Methods[method.toLowerCase()] = method;
});

var pad = function(n, digits, string){
	if (digits == 1) return n;
	return n < Math.pow(10, digits - 1) ? (string || '0') + pad(n, digits - 1, string) : n;
};

Date.implement({

	set: function(prop, value){
		prop = prop.toLowerCase();
		var method = DateMethods[prop] && 'set' + DateMethods[prop];
		if (method && this[method]) this[method](value);
		return this;
	}.overloadSetter(),

	get: function(prop){
		prop = prop.toLowerCase();
		var method = DateMethods[prop] && 'get' + DateMethods[prop];
		if (method && this[method]) return this[method]();
		return null;
	}.overloadGetter(),

	clone: function(){
		return new Date(this.get('time'));
	},

	increment: function(interval, times){
		interval = interval || 'day';
		times = times != null ? times : 1;

		switch (interval){
			case 'year':
				return this.increment('month', times * 12);
			case 'month':
				var d = this.get('date');
				this.set('date', 1).set('mo', this.get('mo') + times);
				return this.set('date', d.min(this.get('lastdayofmonth')));
			case 'week':
				return this.increment('day', times * 7);
			case 'day':
				return this.set('date', this.get('date') + times);
		}

		if (!Date.units[interval]) throw new Error(interval + ' is not a supported interval');

		return this.set('time', this.get('time') + times * Date.units[interval]());
	},

	decrement: function(interval, times){
		return this.increment(interval, -1 * (times != null ? times : 1));
	},

	isLeapYear: function(){
		return Date.isLeapYear(this.get('year'));
	},

	clearTime: function(){
		return this.set({hr: 0, min: 0, sec: 0, ms: 0});
	},

	diff: function(date, resolution){
		if (typeOf(date) == 'string') date = Date.parse(date);

		return ((date - this) / Date.units[resolution || 'day'](3, 3)).round(); // non-leap year, 30-day month
	},

	getLastDayOfMonth: function(){
		return Date.daysInMonth(this.get('mo'), this.get('year'));
	},

	getDayOfYear: function(){
		return (Date.UTC(this.get('year'), this.get('mo'), this.get('date') + 1)
			- Date.UTC(this.get('year'), 0, 1)) / Date.units.day();
	},

	setDay: function(day, firstDayOfWeek){
		if (firstDayOfWeek == null){
			firstDayOfWeek = Date.getMsg('firstDayOfWeek');
			if (firstDayOfWeek === '') firstDayOfWeek = 1;
		}

		day = (7 + Date.parseDay(day, true) - firstDayOfWeek) % 7;
		var currentDay = (7 + this.get('day') - firstDayOfWeek) % 7;

		return this.increment('day', day - currentDay);
	},

	getWeek: function(firstDayOfWeek){
		if (firstDayOfWeek == null){
			firstDayOfWeek = Date.getMsg('firstDayOfWeek');
			if (firstDayOfWeek === '') firstDayOfWeek = 1;
		}

		var date = this,
			dayOfWeek = (7 + date.get('day') - firstDayOfWeek) % 7,
			dividend = 0,
			firstDayOfYear;

		if (firstDayOfWeek == 1){
			// ISO-8601, week belongs to year that has the most days of the week (i.e. has the thursday of the week)
			var month = date.get('month'),
				startOfWeek = date.get('date') - dayOfWeek;

			if (month == 11 && startOfWeek > 28) return 1; // Week 1 of next year

			if (month == 0 && startOfWeek < -2){
				// Use a date from last year to determine the week
				date = new Date(date).decrement('day', dayOfWeek);
				dayOfWeek = 0;
			}

			firstDayOfYear = new Date(date.get('year'), 0, 1).get('day') || 7;
			if (firstDayOfYear > 4) dividend = -7; // First week of the year is not week 1
		} else {
			// In other cultures the first week of the year is always week 1 and the last week always 53 or 54.
			// Days in the same week can have a different weeknumber if the week spreads across two years.
			firstDayOfYear = new Date(date.get('year'), 0, 1).get('day');
		}

		dividend += date.get('dayofyear');
		dividend += 6 - dayOfWeek; // Add days so we calculate the current date's week as a full week
		dividend += (7 + firstDayOfYear - firstDayOfWeek) % 7; // Make up for first week of the year not being a full week

		return (dividend / 7);
	},

	getOrdinal: function(day){
		return Date.getMsg('ordinal', day || this.get('date'));
	},

	getTimezone: function(){
		return this.toString()
			.replace(/^.*? ([A-Z]{3}).[0-9]{4}.*$/, '$1')
			.replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/, '$1$2$3');
	},

	getGMTOffset: function(){
		var off = this.get('timezoneOffset');
		return ((off > 0) ? '-' : '+') + pad((off.abs() / 60).floor(), 2) + pad(off % 60, 2);
	},

	setAMPM: function(ampm){
		ampm = ampm.toUpperCase();
		var hr = this.get('hr');
		if (hr > 11 && ampm == 'AM') return this.decrement('hour', 12);
		else if (hr < 12 && ampm == 'PM') return this.increment('hour', 12);
		return this;
	},

	getAMPM: function(){
		return (this.get('hr') < 12) ? 'AM' : 'PM';
	},

	parse: function(str){
		this.set('time', Date.parse(str));
		return this;
	},

	isValid: function(date){
		if (!date) date = this;
		return typeOf(date) == 'date' && !isNaN(date.valueOf());
	},

	format: function(format){
		if (!this.isValid()) return 'invalid date';

		if (!format) format = '%x %X';
		if (typeof format == 'string') format = formats[format.toLowerCase()] || format;
		if (typeof format == 'function') return format(this);

		var d = this;
		return format.replace(/%([a-z%])/gi,
			function($0, $1){
				switch ($1){
					case 'a': return Date.getMsg('days_abbr')[d.get('day')];
					case 'A': return Date.getMsg('days')[d.get('day')];
					case 'b': return Date.getMsg('months_abbr')[d.get('month')];
					case 'B': return Date.getMsg('months')[d.get('month')];
					case 'c': return d.format('%a %b %d %H:%M:%S %Y');
					case 'd': return pad(d.get('date'), 2);
					case 'e': return pad(d.get('date'), 2, ' ');
					case 'H': return pad(d.get('hr'), 2);
					case 'I': return pad((d.get('hr') % 12) || 12, 2);
					case 'j': return pad(d.get('dayofyear'), 3);
					case 'k': return pad(d.get('hr'), 2, ' ');
					case 'l': return pad((d.get('hr') % 12) || 12, 2, ' ');
					case 'L': return pad(d.get('ms'), 3);
					case 'm': return pad((d.get('mo') + 1), 2);
					case 'M': return pad(d.get('min'), 2);
					case 'o': return d.get('ordinal');
					case 'p': return Date.getMsg(d.get('ampm'));
					case 's': return Math.round(d / 1000);
					case 'S': return pad(d.get('seconds'), 2);
					case 'T': return d.format('%H:%M:%S');
					case 'U': return pad(d.get('week'), 2);
					case 'w': return d.get('day');
					case 'x': return d.format(Date.getMsg('shortDate'));
					case 'X': return d.format(Date.getMsg('shortTime'));
					case 'y': return d.get('year').toString().substr(2);
					case 'Y': return d.get('year');
					case 'z': return d.get('GMTOffset');
					case 'Z': return d.get('Timezone');
				}
				return $1;
			}
		);
	},

	toISOString: function(){
		return this.format('iso8601');
	}

}).alias({
	toJSON: 'toISOString',
	compare: 'diff',
	strftime: 'format'
});

// The day and month abbreviations are standardized, so we cannot use simply %a and %b because they will get localized
var rfcDayAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	rfcMonthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var formats = {
	db: '%Y-%m-%d %H:%M:%S',
	compact: '%Y%m%dT%H%M%S',
	'short': '%d %b %H:%M',
	'long': '%B %d, %Y %H:%M',
	rfc822: function(date){
		return rfcDayAbbr[date.get('day')] + date.format(', %d ') + rfcMonthAbbr[date.get('month')] + date.format(' %Y %H:%M:%S %Z');
	},
	rfc2822: function(date){
		return rfcDayAbbr[date.get('day')] + date.format(', %d ') + rfcMonthAbbr[date.get('month')] + date.format(' %Y %H:%M:%S %z');
	},
	iso8601: function(date){
		return (
			date.getUTCFullYear() + '-' +
			pad(date.getUTCMonth() + 1, 2) + '-' +
			pad(date.getUTCDate(), 2) + 'T' +
			pad(date.getUTCHours(), 2) + ':' +
			pad(date.getUTCMinutes(), 2) + ':' +
			pad(date.getUTCSeconds(), 2) + '.' +
			pad(date.getUTCMilliseconds(), 3) + 'Z'
		);
	}
};

var parsePatterns = [],
	nativeParse = Date.parse;

var parseWord = function(type, word, num){
	var ret = -1,
		translated = Date.getMsg(type + 's');
	switch (typeOf(word)){
		case 'object':
			ret = translated[word.get(type)];
			break;
		case 'number':
			ret = translated[word];
			if (!ret) throw new Error('Invalid ' + type + ' index: ' + word);
			break;
		case 'string':
			var match = translated.filter(function(name){
				return this.test(name);
			}, new RegExp('^' + word, 'i'));
			if (!match.length) throw new Error('Invalid ' + type + ' string');
			if (match.length > 1) throw new Error('Ambiguous ' + type);
			ret = match[0];
	}

	return (num) ? translated.indexOf(ret) : ret;
};

var startCentury = 1900,
	startYear = 70;

Date.extend({

	getMsg: function(key, args){
		return Locale.get('Date.' + key, args);
	},

	units: {
		ms: Function.from(1),
		second: Function.from(1000),
		minute: Function.from(60000),
		hour: Function.from(3600000),
		day: Function.from(86400000),
		week: Function.from(608400000),
		month: function(month, year){
			var d = new Date;
			return Date.daysInMonth(month != null ? month : d.get('mo'), year != null ? year : d.get('year')) * 86400000;
		},
		year: function(year){
			year = year || new Date().get('year');
			return Date.isLeapYear(year) ? 31622400000 : 31536000000;
		}
	},

	daysInMonth: function(month, year){
		return [31, Date.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	},

	isLeapYear: function(year){
		return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
	},

	parse: function(from){
		var t = typeOf(from);
		if (t == 'number') return new Date(from);
		if (t != 'string') return from;
		from = from.clean();
		if (!from.length) return null;

		var parsed;
		parsePatterns.some(function(pattern){
			var bits = pattern.re.exec(from);
			return (bits) ? (parsed = pattern.handler(bits)) : false;
		});

		if (!(parsed && parsed.isValid())){
			parsed = new Date(nativeParse(from));
			if (!(parsed && parsed.isValid())) parsed = new Date(from.toInt());
		}
		return parsed;
	},

	parseDay: function(day, num){
		return parseWord('day', day, num);
	},

	parseMonth: function(month, num){
		return parseWord('month', month, num);
	},

	parseUTC: function(value){
		var localDate = new Date(value);
		var utcSeconds = Date.UTC(
			localDate.get('year'),
			localDate.get('mo'),
			localDate.get('date'),
			localDate.get('hr'),
			localDate.get('min'),
			localDate.get('sec'),
			localDate.get('ms')
		);
		return new Date(utcSeconds);
	},

	orderIndex: function(unit){
		return Date.getMsg('dateOrder').indexOf(unit) + 1;
	},

	defineFormat: function(name, format){
		formats[name] = format;
		return this;
	},

	

	defineParser: function(pattern){
		parsePatterns.push((pattern.re && pattern.handler) ? pattern : build(pattern));
		return this;
	},

	defineParsers: function(){
		Array.flatten(arguments).each(Date.defineParser);
		return this;
	},

	define2DigitYearStart: function(year){
		startYear = year % 100;
		startCentury = year - startYear;
		return this;
	}

}).extend({
	defineFormats: Date.defineFormat.overloadSetter()
});

var regexOf = function(type){
	return new RegExp('(?:' + Date.getMsg(type).map(function(name){
		return name.substr(0, 3);
	}).join('|') + ')[a-z]*');
};

var replacers = function(key){
	switch (key){
		case 'T':
			return '%H:%M:%S';
		case 'x': // iso8601 covers yyyy-mm-dd, so just check if month is first
			return ((Date.orderIndex('month') == 1) ? '%m[-./]%d' : '%d[-./]%m') + '([-./]%y)?';
		case 'X':
			return '%H([.:]%M)?([.:]%S([.:]%s)?)? ?%p? ?%z?';
	}
	return null;
};

var keys = {
	d: /[0-2]?[0-9]|3[01]/,
	H: /[01]?[0-9]|2[0-3]/,
	I: /0?[1-9]|1[0-2]/,
	M: /[0-5]?\d/,
	s: /\d+/,
	o: /[a-z]*/,
	p: /[ap]\.?m\.?/,
	y: /\d{2}|\d{4}/,
	Y: /\d{4}/,
	z: /Z|[+-]\d{2}(?::?\d{2})?/
};

keys.m = keys.I;
keys.S = keys.M;

var currentLanguage;

var recompile = function(language){
	currentLanguage = language;

	keys.a = keys.A = regexOf('days');
	keys.b = keys.B = regexOf('months');

	parsePatterns.each(function(pattern, i){
		if (pattern.format) parsePatterns[i] = build(pattern.format);
	});
};

var build = function(format){
	if (!currentLanguage) return {format: format};

	var parsed = [];
	var re = (format.source || format) // allow format to be regex
	 .replace(/%([a-z])/gi,
		function($0, $1){
			return replacers($1) || $0;
		}
	).replace(/\((?!\?)/g, '(?:') // make all groups non-capturing
	 .replace(/ (?!\?|\*)/g, ',? ') // be forgiving with spaces and commas
	 .replace(/%([a-z%])/gi,
		function($0, $1){
			var p = keys[$1];
			if (!p) return $1;
			parsed.push($1);
			return '(' + p.source + ')';
		}
	).replace(/\[a-z\]/gi, '[a-z\\u00c0-\\uffff;\&]'); // handle unicode words

	return {
		format: format,
		re: new RegExp('^' + re + '$', 'i'),
		handler: function(bits){
			bits = bits.slice(1).associate(parsed);
			var date = new Date().clearTime(),
				year = bits.y || bits.Y;

			if (year != null) handle.call(date, 'y', year); // need to start in the right year
			if ('d' in bits) handle.call(date, 'd', 1);
			if ('m' in bits || bits.b || bits.B) handle.call(date, 'm', 1);

			for (var key in bits) handle.call(date, key, bits[key]);
			return date;
		}
	};
};

var handle = function(key, value){
	if (!value) return this;

	switch (key){
		case 'a': case 'A': return this.set('day', Date.parseDay(value, true));
		case 'b': case 'B': return this.set('mo', Date.parseMonth(value, true));
		case 'd': return this.set('date', value);
		case 'H': case 'I': return this.set('hr', value);
		case 'm': return this.set('mo', value - 1);
		case 'M': return this.set('min', value);
		case 'p': return this.set('ampm', value.replace(/\./g, ''));
		case 'S': return this.set('sec', value);
		case 's': return this.set('ms', ('0.' + value) * 1000);
		case 'w': return this.set('day', value);
		case 'Y': return this.set('year', value);
		case 'y':
			value = +value;
			if (value < 100) value += startCentury + (value < startYear ? 100 : 0);
			return this.set('year', value);
		case 'z':
			if (value == 'Z') value = '+00';
			var offset = value.match(/([+-])(\d{2}):?(\d{2})?/);
			offset = (offset[1] + '1') * (offset[2] * 60 + (+offset[3] || 0)) + this.getTimezoneOffset();
			return this.set('time', this - offset * 60000);
	}

	return this;
};

Date.defineParsers(
	'%Y([-./]%m([-./]%d((T| )%X)?)?)?', // "1999-12-31", "1999-12-31 11:59pm", "1999-12-31 23:59:59", ISO8601
	'%Y%m%d(T%H(%M%S?)?)?', // "19991231", "19991231T1159", compact
	'%x( %X)?', // "12/31", "12.31.99", "12-31-1999", "12/31/2008 11:59 PM"
	'%d%o( %b( %Y)?)?( %X)?', // "31st", "31st December", "31 Dec 1999", "31 Dec 1999 11:59pm"
	'%b( %d%o)?( %Y)?( %X)?', // Same as above with month and day switched
	'%Y %b( %d%o( %X)?)?', // Same as above with year coming first
	'%o %b %d %X %z %Y', // "Thu Oct 22 08:11:23 +0000 2009"
	'%T', // %H:%M:%S
	'%H:%M( ?%p)?' // "11:05pm", "11:05 am" and "11:05"
);

Locale.addEvent('change', function(language){
	if (Locale.get('Date')) recompile(language);
}).fireEvent('change', Locale.getCurrent());

})();

/*
---

name: Locale.en-US.Form.Validator

description: Form Validator messages for English.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Locale

provides: [Locale.en-US.Form.Validator]

...
*/

Locale.define('en-US', 'FormValidator', {

	required: 'This field is required.',
	length: 'Please enter {length} characters (you entered {elLength} characters)',
	minLength: 'Please enter at least {minLength} characters (you entered {length} characters).',
	maxLength: 'Please enter no more than {maxLength} characters (you entered {length} characters).',
	integer: 'Please enter an integer in this field. Numbers with decimals (e.g. 1.25) are not permitted.',
	numeric: 'Please enter only numeric values in this field (i.e. "1" or "1.1" or "-1" or "-1.1").',
	digits: 'Please use numbers and punctuation only in this field (for example, a phone number with dashes or dots is permitted).',
	alpha: 'Please use only letters (a-z) within this field. No spaces or other characters are allowed.',
	alphanum: 'Please use only letters (a-z) or numbers (0-9) in this field. No spaces or other characters are allowed.',
	dateSuchAs: 'Please enter a valid date such as {date}',
	dateInFormatMDY: 'Please enter a valid date such as MM/DD/YYYY (i.e. "12/31/1999")',
	email: 'Please enter a valid email address. For example "fred@domain.com".',
	url: 'Please enter a valid URL such as http://www.example.com.',
	currencyDollar: 'Please enter a valid $ amount. For example $100.00 .',
	oneRequired: 'Please enter something for at least one of these inputs.',
	errorPrefix: 'Error: ',
	warningPrefix: 'Warning: ',

	// Form.Validator.Extras
	noSpace: 'There can be no spaces in this input.',
	reqChkByNode: 'No items are selected.',
	requiredChk: 'This field is required.',
	reqChkByName: 'Please select a {label}.',
	match: 'This field needs to match the {matchName} field',
	startDate: 'the start date',
	endDate: 'the end date',
	currentDate: 'the current date',
	afterDate: 'The date should be the same or after {label}.',
	beforeDate: 'The date should be the same or before {label}.',
	startMonth: 'Please select a start month',
	sameMonth: 'These two dates must be in the same month - you must change one or the other.',
	creditcard: 'The credit card number entered is invalid. Please check the number and try again. {length} digits entered.'

});

/*
---

script: Form.Validator.js

name: Form.Validator

description: A css-class based form validation system.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Options
  - Core/Events
  - Core/Element.Delegation
  - Core/Slick.Finder
  - Core/Element.Event
  - Core/Element.Style
  - Core/JSON
  - Locale
  - Class.Binds
  - Date
  - Element.Forms
  - Locale.en-US.Form.Validator
  - Element.Shortcuts

provides: [Form.Validator, InputValidator, FormValidator.BaseValidators]

...
*/
if (!window.Form) window.Form = {};

var InputValidator = this.InputValidator = new Class({

	Implements: [Options],

	options: {
		errorMsg: 'Validation failed.',
		test: Function.from(true)
	},

	initialize: function(className, options){
		this.setOptions(options);
		this.className = className;
	},

	test: function(field, props){
		field = document.id(field);
		return (field) ? this.options.test(field, props || this.getProps(field)) : false;
	},

	getError: function(field, props){
		field = document.id(field);
		var err = this.options.errorMsg;
		if (typeOf(err) == 'function') err = err(field, props || this.getProps(field));
		return err;
	},

	getProps: function(field){
		field = document.id(field);
		return (field) ? field.get('validatorProps') : {};
	}

});

Element.Properties.validators = {

	get: function(){
		return (this.get('data-validators') || this.className).clean().split(' ');
	}

};

Element.Properties.validatorProps = {

	set: function(props){
		return this.eliminate('$moo:validatorProps').store('$moo:validatorProps', props);
	},

	get: function(props){
		if (props) this.set(props);
		if (this.retrieve('$moo:validatorProps')) return this.retrieve('$moo:validatorProps');
		if (this.getProperty('data-validator-properties') || this.getProperty('validatorProps')){
			try {
				this.store('$moo:validatorProps', JSON.decode(this.getProperty('validatorProps') || this.getProperty('data-validator-properties'), false));
			}catch(e){
				return {};
			}
		} else {
			var vals = this.get('validators').filter(function(cls){
				return cls.test(':');
			});
			if (!vals.length){
				this.store('$moo:validatorProps', {});
			} else {
				props = {};
				vals.each(function(cls){
					var split = cls.split(':');
					if (split[1]){
						try {
							props[split[0]] = JSON.decode(split[1], false);
						} catch(e){}
					}
				});
				this.store('$moo:validatorProps', props);
			}
		}
		return this.retrieve('$moo:validatorProps');
	}

};

Form.Validator = new Class({

	Implements: [Options, Events],

	options: {/*
		onFormValidate: function(isValid, form, event){},
		onElementValidate: function(isValid, field, className, warn){},
		onElementPass: function(field){},
		onElementFail: function(field, validatorsFailed){}, */
		fieldSelectors: 'input, select, textarea',
		ignoreHidden: true,
		ignoreDisabled: true,
		useTitles: false,
		evaluateOnSubmit: true,
		evaluateFieldsOnBlur: true,
		evaluateFieldsOnChange: true,
		serial: true,
		stopOnFailure: true,
		warningPrefix: function(){
			return Form.Validator.getMsg('warningPrefix') || 'Warning: ';
		},
		errorPrefix: function(){
			return Form.Validator.getMsg('errorPrefix') || 'Error: ';
		}
	},

	initialize: function(form, options){
		this.setOptions(options);
		this.element = document.id(form);
		this.warningPrefix = Function.from(this.options.warningPrefix)();
		this.errorPrefix = Function.from(this.options.errorPrefix)();
		this._bound = {
			onSubmit: this.onSubmit.bind(this),
			blurOrChange: function(event, field){
				this.validationMonitor(field, true);
			}.bind(this)
		};
		this.enable();
	},

	toElement: function(){
		return this.element;
	},

	getFields: function(){
		return (this.fields = this.element.getElements(this.options.fieldSelectors));
	},

	enable: function(){
		this.element.store('validator', this);
		if (this.options.evaluateOnSubmit) this.element.addEvent('submit', this._bound.onSubmit);
		if (this.options.evaluateFieldsOnBlur){
			this.element.addEvent('blur:relay(input,select,textarea)', this._bound.blurOrChange);
		}
		if (this.options.evaluateFieldsOnChange){
			this.element.addEvent('change:relay(input,select,textarea)', this._bound.blurOrChange);
		}
	},

	disable: function(){
		this.element.eliminate('validator');
		this.element.removeEvents({
			submit: this._bound.onSubmit,
			'blur:relay(input,select,textarea)': this._bound.blurOrChange,
			'change:relay(input,select,textarea)': this._bound.blurOrChange
		});
	},

	validationMonitor: function(){
		clearTimeout(this.timer);
		this.timer = this.validateField.delay(50, this, arguments);
	},

	onSubmit: function(event){
		if (this.validate(event)) this.reset();
	},

	reset: function(){
		this.getFields().each(this.resetField, this);
		return this;
	},

	validate: function(event){
		var result = this.getFields().map(function(field){
			return this.validateField(field, true);
		}, this).every(function(v){
			return v;
		});
		this.fireEvent('formValidate', [result, this.element, event]);
		if (this.options.stopOnFailure && !result && event) event.preventDefault();
		return result;
	},

	validateField: function(field, force){
		if (this.paused) return true;
		field = document.id(field);
		var passed = !field.hasClass('validation-failed');
		var failed, warned;
		if (this.options.serial && !force){
			failed = this.element.getElement('.validation-failed');
			warned = this.element.getElement('.warning');
		}
		if (field && (!failed || force || field.hasClass('validation-failed') || (failed && !this.options.serial))){
			var validationTypes = field.get('validators');
			var validators = validationTypes.some(function(cn){
				return this.getValidator(cn);
			}, this);
			var validatorsFailed = [];
			validationTypes.each(function(className){
				if (className && !this.test(className, field)) validatorsFailed.include(className);
			}, this);
			passed = validatorsFailed.length === 0;
			if (validators && !this.hasValidator(field, 'warnOnly')){
				if (passed){
					field.addClass('validation-passed').removeClass('validation-failed');
					this.fireEvent('elementPass', [field]);
				} else {
					field.addClass('validation-failed').removeClass('validation-passed');
					this.fireEvent('elementFail', [field, validatorsFailed]);
				}
			}
			if (!warned){
				var warnings = validationTypes.some(function(cn){
					if (cn.test('^warn'))
						return this.getValidator(cn.replace(/^warn-/,''));
					else return null;
				}, this);
				field.removeClass('warning');
				var warnResult = validationTypes.map(function(cn){
					if (cn.test('^warn'))
						return this.test(cn.replace(/^warn-/,''), field, true);
					else return null;
				}, this);
			}
		}
		return passed;
	},

	test: function(className, field, warn){
		field = document.id(field);
		if ((this.options.ignoreHidden && !field.isVisible()) || (this.options.ignoreDisabled && field.get('disabled'))) return true;
		var validator = this.getValidator(className);
		if (warn != null) warn = false;
		if (this.hasValidator(field, 'warnOnly')) warn = true;
		var isValid = field.hasClass('ignoreValidation') || (validator ? validator.test(field) : true);
		if (validator) this.fireEvent('elementValidate', [isValid, field, className, warn]);
		if (warn) return true;
		return isValid;
	},

	hasValidator: function(field, value){
		return field.get('validators').contains(value);
	},

	resetField: function(field){
		field = document.id(field);
		if (field){
			field.get('validators').each(function(className){
				if (className.test('^warn-')) className = className.replace(/^warn-/, '');
				field.removeClass('validation-failed');
				field.removeClass('warning');
				field.removeClass('validation-passed');
			}, this);
		}
		return this;
	},

	stop: function(){
		this.paused = true;
		return this;
	},

	start: function(){
		this.paused = false;
		return this;
	},

	ignoreField: function(field, warn){
		field = document.id(field);
		if (field){
			this.enforceField(field);
			if (warn) field.addClass('warnOnly');
			else field.addClass('ignoreValidation');
		}
		return this;
	},

	enforceField: function(field){
		field = document.id(field);
		if (field) field.removeClass('warnOnly').removeClass('ignoreValidation');
		return this;
	}

});

Form.Validator.getMsg = function(key){
	return Locale.get('FormValidator.' + key);
};

Form.Validator.adders = {

	validators:{},

	add : function(className, options){
		this.validators[className] = new InputValidator(className, options);
		//if this is a class (this method is used by instances of Form.Validator and the Form.Validator namespace)
		//extend these validators into it
		//this allows validators to be global and/or per instance
		if (!this.initialize){
			this.implement({
				validators: this.validators
			});
		}
	},

	addAllThese : function(validators){
		Array.from(validators).each(function(validator){
			this.add(validator[0], validator[1]);
		}, this);
	},

	getValidator: function(className){
		return this.validators[className.split(':')[0]];
	}

};

Object.append(Form.Validator, Form.Validator.adders);

Form.Validator.implement(Form.Validator.adders);

Form.Validator.add('IsEmpty', {

	errorMsg: false,
	test: function(element){
		if (element.type == 'select-one' || element.type == 'select')
			return !(element.selectedIndex >= 0 && element.options[element.selectedIndex].value != '');
		else
			return ((element.get('value') == null) || (element.get('value').length == 0));
	}

});

Form.Validator.addAllThese([

	['required', {
		errorMsg: function(){
			return Form.Validator.getMsg('required');
		},
		test: function(element){
			return !Form.Validator.getValidator('IsEmpty').test(element);
		}
	}],

	['length', {
		errorMsg: function(element, props){
			if (typeOf(props.length) != 'null')
				return Form.Validator.getMsg('length').substitute({length: props.length, elLength: element.get('value').length});
			else return '';
		},
		test: function(element, props){
			if (typeOf(props.length) != 'null') return (element.get('value').length == props.length || element.get('value').length == 0);
			else return true;
		}
	}],

	['minLength', {
		errorMsg: function(element, props){
			if (typeOf(props.minLength) != 'null')
				return Form.Validator.getMsg('minLength').substitute({minLength: props.minLength, length: element.get('value').length});
			else return '';
		},
		test: function(element, props){
			if (typeOf(props.minLength) != 'null') return (element.get('value').length >= (props.minLength || 0));
			else return true;
		}
	}],

	['maxLength', {
		errorMsg: function(element, props){
			//props is {maxLength:10}
			if (typeOf(props.maxLength) != 'null')
				return Form.Validator.getMsg('maxLength').substitute({maxLength: props.maxLength, length: element.get('value').length});
			else return '';
		},
		test: function(element, props){
			return element.get('value').length <= (props.maxLength || 10000);
		}
	}],

	['validate-integer', {
		errorMsg: Form.Validator.getMsg.pass('integer'),
		test: function(element){
			return Form.Validator.getValidator('IsEmpty').test(element) || (/^(-?[1-9]\d*|0)$/).test(element.get('value'));
		}
	}],

	['validate-numeric', {
		errorMsg: Form.Validator.getMsg.pass('numeric'),
		test: function(element){
			return Form.Validator.getValidator('IsEmpty').test(element) ||
				(/^-?(?:0$0(?=\d*\.)|[1-9]|0)\d*(\.\d+)?$/).test(element.get('value'));
		}
	}],

	['validate-digits', {
		errorMsg: Form.Validator.getMsg.pass('digits'),
		test: function(element){
			return Form.Validator.getValidator('IsEmpty').test(element) || (/^[\d() .:\-\+#]+$/.test(element.get('value')));
		}
	}],

	['validate-alpha', {
		errorMsg: Form.Validator.getMsg.pass('alpha'),
		test: function(element){
			return Form.Validator.getValidator('IsEmpty').test(element) || (/^[a-zA-Z]+$/).test(element.get('value'));
		}
	}],

	['validate-alphanum', {
		errorMsg: Form.Validator.getMsg.pass('alphanum'),
		test: function(element){
			return Form.Validator.getValidator('IsEmpty').test(element) || !(/\W/).test(element.get('value'));
		}
	}],

	['validate-date', {
		errorMsg: function(element, props){
			if (Date.parse){
				var format = props.dateFormat || '%x';
				return Form.Validator.getMsg('dateSuchAs').substitute({date: new Date().format(format)});
			} else {
				return Form.Validator.getMsg('dateInFormatMDY');
			}
		},
		test: function(element, props){
			if (Form.Validator.getValidator('IsEmpty').test(element)) return true;
			var dateLocale = Locale.get('Date'),
				dateNouns = new RegExp([dateLocale.days, dateLocale.days_abbr, dateLocale.months, dateLocale.months_abbr, dateLocale.AM, dateLocale.PM].flatten().join('|'), 'i'),
				value = element.get('value'),
				wordsInValue = value.match(/[a-z]+/gi);

			if (wordsInValue && !wordsInValue.every(dateNouns.exec, dateNouns)) return false;

			var date = Date.parse(value);
			if (!date) return false;

			var format = props.dateFormat || '%x',
				formatted = date.format(format);
			if (formatted != 'invalid date') element.set('value', formatted);
			return date.isValid();
		}
	}],

	['validate-email', {
		errorMsg: Form.Validator.getMsg.pass('email'),
		test: function(element){
			/*
			var chars = "[a-z0-9!#$%&'*+/=?^_`{|}~-]",
				local = '(?:' + chars + '\\.?){0,63}' + chars,

				label = '[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?',
				hostname = '(?:' + label + '\\.)*' + label;

				octet = '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)',
				ipv4 = '\\[(?:' + octet + '\\.){3}' + octet + '\\]',

				domain = '(?:' + hostname + '|' + ipv4 + ')';

			var regex = new RegExp('^' + local + '@' + domain + '$', 'i');
			*/
			return Form.Validator.getValidator('IsEmpty').test(element) || (/^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]\.?){0,63}[a-z0-9!#$%&'*+\/=?^_`{|}~-]@(?:(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\])$/i).test(element.get('value'));
		}
	}],

	['validate-url', {
		errorMsg: Form.Validator.getMsg.pass('url'),
		test: function(element){
			return Form.Validator.getValidator('IsEmpty').test(element) || (/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i).test(element.get('value'));
		}
	}],

	['validate-currency-dollar', {
		errorMsg: Form.Validator.getMsg.pass('currencyDollar'),
		test: function(element){
			return Form.Validator.getValidator('IsEmpty').test(element) || (/^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/).test(element.get('value'));
		}
	}],

	['validate-one-required', {
		errorMsg: Form.Validator.getMsg.pass('oneRequired'),
		test: function(element, props){
			var p = document.id(props['validate-one-required']) || element.getParent(props['validate-one-required']);
			return p.getElements('input').some(function(el){
				if (['checkbox', 'radio'].contains(el.get('type'))) return el.get('checked');
				return el.get('value');
			});
		}
	}]

]);

Element.Properties.validator = {

	set: function(options){
		this.get('validator').setOptions(options);
	},

	get: function(){
		var validator = this.retrieve('validator');
		if (!validator){
			validator = new Form.Validator(this);
			this.store('validator', validator);
		}
		return validator;
	}

};

Element.implement({

	validate: function(options){
		if (options) this.set('validator', options);
		return this.get('validator').validate();
	}

});






/*
---

script: Form.Validator.Extras.js

name: Form.Validator.Extras

description: Additional validators for the Form.Validator class.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Form.Validator

provides: [Form.Validator.Extras]

...
*/
Form.Validator.addAllThese([

	['validate-enforce-oncheck', {
		test: function(element, props){
			var fv = element.getParent('form').retrieve('validator');
			if (!fv) return true;
			(props.toEnforce || document.id(props.enforceChildrenOf).getElements('input, select, textarea')).map(function(item){
				if (element.checked){
					fv.enforceField(item);
				} else {
					fv.ignoreField(item);
					fv.resetField(item);
				}
			});
			return true;
		}
	}],

	['validate-ignore-oncheck', {
		test: function(element, props){
			var fv = element.getParent('form').retrieve('validator');
			if (!fv) return true;
			(props.toIgnore || document.id(props.ignoreChildrenOf).getElements('input, select, textarea')).each(function(item){
				if (element.checked){
					fv.ignoreField(item);
					fv.resetField(item);
				} else {
					fv.enforceField(item);
				}
			});
			return true;
		}
	}],

	['validate-nospace', {
		errorMsg: function(){
			return Form.Validator.getMsg('noSpace');
		},
		test: function(element, props){
			return !element.get('value').test(/\s/);
		}
	}],

	['validate-toggle-oncheck', {
		test: function(element, props){
			var fv = element.getParent('form').retrieve('validator');
			if (!fv) return true;
			var eleArr = props.toToggle || document.id(props.toToggleChildrenOf).getElements('input, select, textarea');
			if (!element.checked){
				eleArr.each(function(item){
					fv.ignoreField(item);
					fv.resetField(item);
				});
			} else {
				eleArr.each(function(item){
					fv.enforceField(item);
				});
			}
			return true;
		}
	}],

	['validate-reqchk-bynode', {
		errorMsg: function(){
			return Form.Validator.getMsg('reqChkByNode');
		},
		test: function(element, props){
			return (document.id(props.nodeId).getElements(props.selector || 'input[type=checkbox], input[type=radio]')).some(function(item){
				return item.checked;
			});
		}
	}],

	['validate-required-check', {
		errorMsg: function(element, props){
			return props.useTitle ? element.get('title') : Form.Validator.getMsg('requiredChk');
		},
		test: function(element, props){
			return !!element.checked;
		}
	}],

	['validate-reqchk-byname', {
		errorMsg: function(element, props){
			return Form.Validator.getMsg('reqChkByName').substitute({label: props.label || element.get('type')});
		},
		test: function(element, props){
			var grpName = props.groupName || element.get('name');
			var oneCheckedItem = $$(document.getElementsByName(grpName)).some(function(item, index){
				return item.checked;
			});
			var fv = element.getParent('form').retrieve('validator');
			if (oneCheckedItem && fv) fv.resetField(element);
			return oneCheckedItem;
		}
	}],

	['validate-match', {
		errorMsg: function(element, props){
			return Form.Validator.getMsg('match').substitute({matchName: props.matchName || document.id(props.matchInput).get('name')});
		},
		test: function(element, props){
			var eleVal = element.get('value');
			var matchVal = document.id(props.matchInput) && document.id(props.matchInput).get('value');
			return eleVal && matchVal ? eleVal == matchVal : true;
		}
	}],

	['validate-after-date', {
		errorMsg: function(element, props){
			return Form.Validator.getMsg('afterDate').substitute({
				label: props.afterLabel || (props.afterElement ? Form.Validator.getMsg('startDate') : Form.Validator.getMsg('currentDate'))
			});
		},
		test: function(element, props){
			var start = document.id(props.afterElement) ? Date.parse(document.id(props.afterElement).get('value')) : new Date();
			var end = Date.parse(element.get('value'));
			return end && start ? end >= start : true;
		}
	}],

	['validate-before-date', {
		errorMsg: function(element, props){
			return Form.Validator.getMsg('beforeDate').substitute({
				label: props.beforeLabel || (props.beforeElement ? Form.Validator.getMsg('endDate') : Form.Validator.getMsg('currentDate'))
			});
		},
		test: function(element, props){
			var start = Date.parse(element.get('value'));
			var end = document.id(props.beforeElement) ? Date.parse(document.id(props.beforeElement).get('value')) : new Date();
			return end && start ? end >= start : true;
		}
	}],

	['validate-custom-required', {
		errorMsg: function(){
			return Form.Validator.getMsg('required');
		},
		test: function(element, props){
			return element.get('value') != props.emptyValue;
		}
	}],

	['validate-same-month', {
		errorMsg: function(element, props){
			var startMo = document.id(props.sameMonthAs) && document.id(props.sameMonthAs).get('value');
			var eleVal = element.get('value');
			if (eleVal != '') return Form.Validator.getMsg(startMo ? 'sameMonth' : 'startMonth');
		},
		test: function(element, props){
			var d1 = Date.parse(element.get('value'));
			var d2 = Date.parse(document.id(props.sameMonthAs) && document.id(props.sameMonthAs).get('value'));
			return d1 && d2 ? d1.format('%B') == d2.format('%B') : true;
		}
	}],


	['validate-cc-num', {
		errorMsg: function(element){
			var ccNum = element.get('value').replace(/[^0-9]/g, '');
			return Form.Validator.getMsg('creditcard').substitute({length: ccNum.length});
		},
		test: function(element){
			// required is a different test
			if (Form.Validator.getValidator('IsEmpty').test(element)) return true;

			// Clean number value
			var ccNum = element.get('value');
			ccNum = ccNum.replace(/[^0-9]/g, '');

			var valid_type = false;

			if (ccNum.test(/^4[0-9]{12}([0-9]{3})?$/)) valid_type = 'Visa';
			else if (ccNum.test(/^5[1-5]([0-9]{14})$/)) valid_type = 'Master Card';
			else if (ccNum.test(/^3[47][0-9]{13}$/)) valid_type = 'American Express';
			else if (ccNum.test(/^6(?:011|5[0-9]{2})[0-9]{12}$/)) valid_type = 'Discover';
			else if (ccNum.test(/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/)) valid_type = 'Diners Club';

			if (valid_type){
				var sum = 0;
				var cur = 0;

				for (var i=ccNum.length-1; i>=0; --i){
					cur = ccNum.charAt(i).toInt();
					if (cur == 0) continue;

					if ((ccNum.length-i) % 2 == 0) cur += cur;
					if (cur > 9){
						cur = cur.toString().charAt(0).toInt() + cur.toString().charAt(1).toInt();
					}

					sum += cur;
				}
				if ((sum % 10) == 0) return true;
			}

			var chunks = '';
			while (ccNum != ''){
				chunks += ' ' + ccNum.substr(0,4);
				ccNum = ccNum.substr(4);
			}

			element.getParent('form').retrieve('validator').ignoreField(element);
			element.set('value', chunks.clean());
			element.getParent('form').retrieve('validator').enforceField(element);
			return false;
		}
	}]


]);

/*
---

script: Form.Validator.Inline.js

name: Form.Validator.Inline

description: Extends Form.Validator to add inline messages.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Form.Validator

provides: [Form.Validator.Inline]

...
*/

Form.Validator.Inline = new Class({

	Extends: Form.Validator,

	options: {
		showError: function(errorElement){
			if (errorElement.reveal) errorElement.reveal();
			else errorElement.setStyle('display', 'block');
		},
		hideError: function(errorElement){
			if (errorElement.dissolve) errorElement.dissolve();
			else errorElement.setStyle('display', 'none');
		},
		scrollToErrorsOnSubmit: true,
		scrollToErrorsOnBlur: false,
		scrollToErrorsOnChange: false,
		scrollFxOptions: {
			transition: 'quad:out',
			offset: {
				y: -20
			}
		}
	},

	initialize: function(form, options){
		this.parent(form, options);
		this.addEvent('onElementValidate', function(isValid, field, className, warn){
			var validator = this.getValidator(className);
			if (!isValid && validator.getError(field)){
				if (warn) field.addClass('warning');
				var advice = this.makeAdvice(className, field, validator.getError(field), warn);
				this.insertAdvice(advice, field);
				this.showAdvice(className, field);
			} else {
				this.hideAdvice(className, field);
			}
		});
	},

	makeAdvice: function(className, field, error, warn){
		var errorMsg = (warn) ? this.warningPrefix : this.errorPrefix;
			errorMsg += (this.options.useTitles) ? field.title || error:error;
		var cssClass = (warn) ? 'warning-advice' : 'validation-advice';
		var advice = this.getAdvice(className, field);
		if (advice){
			advice = advice.set('html', errorMsg);
		} else {
			advice = new Element('div', {
				html: errorMsg,
				styles: { display: 'none' },
				id: 'advice-' + className.split(':')[0] + '-' + this.getFieldId(field)
			}).addClass(cssClass);
		}
		field.store('$moo:advice-' + className, advice);
		return advice;
	},

	getFieldId : function(field){
		return field.id ? field.id : field.id = 'input_' + field.name;
	},

	showAdvice: function(className, field){
		var advice = this.getAdvice(className, field);
		if (
			advice &&
			!field.retrieve('$moo:' + this.getPropName(className)) &&
			(
				advice.getStyle('display') == 'none' ||
				advice.getStyle('visibility') == 'hidden' ||
				advice.getStyle('opacity') == 0
			)
		){
			field.store('$moo:' + this.getPropName(className), true);
			this.options.showError(advice);
			this.fireEvent('showAdvice', [field, advice, className]);
		}
	},

	hideAdvice: function(className, field){
		var advice = this.getAdvice(className, field);
		if (advice && field.retrieve('$moo:' + this.getPropName(className))){
			field.store('$moo:' + this.getPropName(className), false);
			this.options.hideError(advice);
			this.fireEvent('hideAdvice', [field, advice, className]);
		}
	},

	getPropName: function(className){
		return 'advice' + className;
	},

	resetField: function(field){
		field = document.id(field);
		if (!field) return this;
		this.parent(field);
		field.get('validators').each(function(className){
			this.hideAdvice(className, field);
		}, this);
		return this;
	},

	getAllAdviceMessages: function(field, force){
		var advice = [];
		if (field.hasClass('ignoreValidation') && !force) return advice;
		var validators = field.get('validators').some(function(cn){
			var warner = cn.test('^warn-') || field.hasClass('warnOnly');
			if (warner) cn = cn.replace(/^warn-/, '');
			var validator = this.getValidator(cn);
			if (!validator) return;
			advice.push({
				message: validator.getError(field),
				warnOnly: warner,
				passed: validator.test(),
				validator: validator
			});
		}, this);
		return advice;
	},

	getAdvice: function(className, field){
		return field.retrieve('$moo:advice-' + className);
	},

	insertAdvice: function(advice, field){
		//Check for error position prop
		var props = field.get('validatorProps');
		//Build advice
		if (!props.msgPos || !document.id(props.msgPos)){
			if (field.type && field.type.toLowerCase() == 'radio') field.getParent().adopt(advice);
			else advice.inject(document.id(field), 'after');
		} else {
			document.id(props.msgPos).grab(advice);
		}
	},

	validateField: function(field, force, scroll){
		var result = this.parent(field, force);
		if (((this.options.scrollToErrorsOnSubmit && scroll == null) || scroll) && !result){
			var failed = document.id(this).getElement('.validation-failed');
			var par = document.id(this).getParent();
			while (par != document.body && par.getScrollSize().y == par.getSize().y){
				par = par.getParent();
			}
			var fx = par.retrieve('$moo:fvScroller');
			if (!fx && window.Fx && Fx.Scroll){
				fx = new Fx.Scroll(par, this.options.scrollFxOptions);
				par.store('$moo:fvScroller', fx);
			}
			if (failed){
				if (fx) fx.toElement(failed);
				else par.scrollTo(par.getScroll().x, failed.getPosition(par).y - 20);
			}
		}
		return result;
	},

	watchFields: function(fields){
		fields.each(function(el){
		if (this.options.evaluateFieldsOnBlur){
			el.addEvent('blur', this.validationMonitor.pass([el, false, this.options.scrollToErrorsOnBlur], this));
		}
		if (this.options.evaluateFieldsOnChange){
				el.addEvent('change', this.validationMonitor.pass([el, true, this.options.scrollToErrorsOnChange], this));
			}
		}, this);
	}

});

/*
---

script: OverText.js

name: OverText

description: Shows text over an input that disappears when the user clicks into it. The text remains hidden if the user adds a value.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Options
  - Core/Events
  - Core/Element.Event
  - Class.Binds
  - Class.Occlude
  - Element.Position
  - Element.Shortcuts

provides: [OverText]

...
*/

var OverText = new Class({

	Implements: [Options, Events, Class.Occlude],

	Binds: ['reposition', 'assert', 'focus', 'hide'],

	options: {/*
		textOverride: null,
		onFocus: function(){},
		onTextHide: function(textEl, inputEl){},
		onTextShow: function(textEl, inputEl){}, */
		element: 'label',
		labelClass: 'overTxtLabel',
		positionOptions: {
			position: 'upperLeft',
			edge: 'upperLeft',
			offset: {
				x: 4,
				y: 2
			}
		},
		poll: false,
		pollInterval: 250,
		wrap: false
	},

	property: 'OverText',

	initialize: function(element, options){
		element = this.element = document.id(element);

		if (this.occlude()) return this.occluded;
		this.setOptions(options);

		this.attach(element);
		OverText.instances.push(this);

		if (this.options.poll) this.poll();
	},

	toElement: function(){
		return this.element;
	},

	attach: function(){
		var element = this.element,
			options = this.options,
			value = options.textOverride || element.get('alt') || element.get('title');

		if (!value) return this;

		var text = this.text = new Element(options.element, {
			'class': options.labelClass,
			styles: {
				lineHeight: 'normal',
				position: 'absolute',
				cursor: 'text'
			},
			html: value,
			events: {
				click: this.hide.pass(options.element == 'label', this)
			}
		}).inject(element, 'after');

		if (options.element == 'label'){
			if (!element.get('id')) element.set('id', 'input_' + String.uniqueID());
			text.set('for', element.get('id'));
		}

		if (options.wrap){
			this.textHolder = new Element('div.overTxtWrapper', {
				styles: {
					lineHeight: 'normal',
					position: 'relative'
				}
			}).grab(text).inject(element, 'before');
		}

		return this.enable();
	},

	destroy: function(){
		this.element.eliminate(this.property); // Class.Occlude storage
		this.disable();
		if (this.text) this.text.destroy();
		if (this.textHolder) this.textHolder.destroy();
		return this;
	},

	disable: function(){
		this.element.removeEvents({
			focus: this.focus,
			blur: this.assert,
			change: this.assert
		});
		window.removeEvent('resize', this.reposition);
		this.hide(true, true);
		return this;
	},

	enable: function(){
		this.element.addEvents({
			focus: this.focus,
			blur: this.assert,
			change: this.assert
		});
		window.addEvent('resize', this.reposition);
		this.reposition();
		return this;
	},

	wrap: function(){
		if (this.options.element == 'label'){
			if (!this.element.get('id')) this.element.set('id', 'input_' + String.uniqueID());
			this.text.set('for', this.element.get('id'));
		}
	},

	startPolling: function(){
		this.pollingPaused = false;
		return this.poll();
	},

	poll: function(stop){
		//start immediately
		//pause on focus
		//resumeon blur
		if (this.poller && !stop) return this;
		if (stop){
			clearInterval(this.poller);
		} else {
			this.poller = (function(){
				if (!this.pollingPaused) this.assert(true);
			}).periodical(this.options.pollInterval, this);
		}

		return this;
	},

	stopPolling: function(){
		this.pollingPaused = true;
		return this.poll(true);
	},

	focus: function(){
		if (this.text && (!this.text.isDisplayed() || this.element.get('disabled'))) return this;
		return this.hide();
	},

	hide: function(suppressFocus, force){
		if (this.text && (this.text.isDisplayed() && (!this.element.get('disabled') || force))){
			this.text.hide();
			this.fireEvent('textHide', [this.text, this.element]);
			this.pollingPaused = true;
			if (!suppressFocus){
				try {
					this.element.fireEvent('focus');
					this.element.focus();
				} catch(e){} //IE barfs if you call focus on hidden elements
			}
		}
		return this;
	},

	show: function(){
		if (document.id(this.text) && !this.text.isDisplayed()){
			this.text.show();
			this.reposition();
			this.fireEvent('textShow', [this.text, this.element]);
			this.pollingPaused = false;
		}
		return this;
	},

	test: function(){
		return !this.element.get('value');
	},

	assert: function(suppressFocus){
		return this[this.test() ? 'show' : 'hide'](suppressFocus);
	},

	reposition: function(){
		this.assert(true);
		if (!this.element.isVisible()) return this.stopPolling().hide();
		if (this.text && this.test()){
			this.text.position(Object.merge(this.options.positionOptions, {
				relativeTo: this.element
			}));
		}
		return this;
	}

});

OverText.instances = [];

Object.append(OverText, {

	each: function(fn){
		return OverText.instances.each(function(ot, i){
			if (ot.element && ot.text) fn.call(OverText, ot, i);
		});
	},

	update: function(){

		return OverText.each(function(ot){
			return ot.reposition();
		});

	},

	hideAll: function(){

		return OverText.each(function(ot){
			return ot.hide(true, true);
		});

	},

	showAll: function(){
		return OverText.each(function(ot){
			return ot.show();
		});
	}

});


/*
---

script: Fx.Elements.js

name: Fx.Elements

description: Effect to change any number of CSS properties of any number of Elements.

license: MIT-style license

authors:
  - Valerio Proietti

requires:
  - Core/Fx.CSS
  - MooTools.More

provides: [Fx.Elements]

...
*/

Fx.Elements = new Class({

	Extends: Fx.CSS,

	initialize: function(elements, options){
		this.elements = this.subject = $$(elements);
		this.parent(options);
	},

	compute: function(from, to, delta){
		var now = {};

		for (var i in from){
			var iFrom = from[i], iTo = to[i], iNow = now[i] = {};
			for (var p in iFrom) iNow[p] = this.parent(iFrom[p], iTo[p], delta);
		}

		return now;
	},

	set: function(now){
		for (var i in now){
			if (!this.elements[i]) continue;

			var iNow = now[i];
			for (var p in iNow) this.render(this.elements[i], p, iNow[p], this.options.unit);
		}

		return this;
	},

	start: function(obj){
		if (!this.check(obj)) return this;
		var from = {}, to = {};

		for (var i in obj){
			if (!this.elements[i]) continue;

			var iProps = obj[i], iFrom = from[i] = {}, iTo = to[i] = {};

			for (var p in iProps){
				var parsed = this.prepare(this.elements[i], p, iProps[p]);
				iFrom[p] = parsed.from;
				iTo[p] = parsed.to;
			}
		}

		return this.parent(from, to);
	}

});

/*
---

script: Fx.Accordion.js

name: Fx.Accordion

description: An Fx.Elements extension which allows you to easily create accordion type controls.

license: MIT-style license

authors:
  - Valerio Proietti

requires:
  - Core/Element.Event
  - Fx.Elements

provides: [Fx.Accordion]

...
*/

Fx.Accordion = new Class({

	Extends: Fx.Elements,

	options: {/*
		onActive: function(toggler, section){},
		onBackground: function(toggler, section){},*/
		fixedHeight: false,
		fixedWidth: false,
		display: 0,
		show: false,
		height: true,
		width: false,
		opacity: true,
		alwaysHide: false,
		trigger: 'click',
		initialDisplayFx: true,
		resetHeight: true
	},

	initialize: function(){
		var defined = function(obj){
			return obj != null;
		};

		var params = Array.link(arguments, {
			'container': Type.isElement, //deprecated
			'options': Type.isObject,
			'togglers': defined,
			'elements': defined
		});
		this.parent(params.elements, params.options);

		var options = this.options,
			togglers = this.togglers = $$(params.togglers);

		this.previous = -1;
		this.internalChain = new Chain();

		if (options.alwaysHide) this.options.link = 'chain';

		if (options.show || this.options.show === 0){
			options.display = false;
			this.previous = options.show;
		}

		if (options.start){
			options.display = false;
			options.show = false;
		}

		var effects = this.effects = {};

		if (options.opacity) effects.opacity = 'fullOpacity';
		if (options.width) effects.width = options.fixedWidth ? 'fullWidth' : 'offsetWidth';
		if (options.height) effects.height = options.fixedHeight ? 'fullHeight' : 'scrollHeight';

		for (var i = 0, l = togglers.length; i < l; i++) this.addSection(togglers[i], this.elements[i]);

		this.elements.each(function(el, i){
			if (options.show === i){
				this.fireEvent('active', [togglers[i], el]);
			} else {
				for (var fx in effects) el.setStyle(fx, 0);
			}
		}, this);

		if (options.display || options.display === 0 || options.initialDisplayFx === false){
			this.display(options.display, options.initialDisplayFx);
		}

		if (options.fixedHeight !== false) options.resetHeight = false;
		this.addEvent('complete', this.internalChain.callChain.bind(this.internalChain));
	},

	addSection: function(toggler, element){
		toggler = document.id(toggler);
		element = document.id(element);
		this.togglers.include(toggler);
		this.elements.include(element);

		var togglers = this.togglers,
			options = this.options,
			test = togglers.contains(toggler),
			idx = togglers.indexOf(toggler),
			displayer = this.display.pass(idx, this);

		toggler.store('accordion:display', displayer)
			.addEvent(options.trigger, displayer);

		if (options.height) element.setStyles({'padding-top': 0, 'border-top': 'none', 'padding-bottom': 0, 'border-bottom': 'none'});
		if (options.width) element.setStyles({'padding-left': 0, 'border-left': 'none', 'padding-right': 0, 'border-right': 'none'});

		element.fullOpacity = 1;
		if (options.fixedWidth) element.fullWidth = options.fixedWidth;
		if (options.fixedHeight) element.fullHeight = options.fixedHeight;
		element.setStyle('overflow', 'hidden');

		if (!test) for (var fx in this.effects){
			element.setStyle(fx, 0);
		}
		return this;
	},

	removeSection: function(toggler, displayIndex){
		var togglers = this.togglers,
			idx = togglers.indexOf(toggler),
			element = this.elements[idx];

		var remover = function(){
			togglers.erase(toggler);
			this.elements.erase(element);
			this.detach(toggler);
		}.bind(this);

		if (this.now == idx || displayIndex != null){
			this.display(displayIndex != null ? displayIndex : (idx - 1 >= 0 ? idx - 1 : 0)).chain(remover);
		} else {
			remover();
		}
		return this;
	},

	detach: function(toggler){
		var remove = function(toggler){
			toggler.removeEvent(this.options.trigger, toggler.retrieve('accordion:display'));
		}.bind(this);

		if (!toggler) this.togglers.each(remove);
		else remove(toggler);
		return this;
	},

	display: function(index, useFx){
		if (!this.check(index, useFx)) return this;

		var obj = {},
			elements = this.elements,
			options = this.options,
			effects = this.effects;

		if (useFx == null) useFx = true;
		if (typeOf(index) == 'element') index = elements.indexOf(index);
		if (index == this.current && !options.alwaysHide) return this;

		if (options.resetHeight){
			var prev = elements[this.current];
			if (prev && !this.selfHidden){
				for (var fx in effects) prev.setStyle(fx, prev[effects[fx]]);
			}
		}

		if ((this.timer && options.link == 'chain') || (index === this.current && !options.alwaysHide)) return this;

		if (this.current != null) this.previous = this.current;
		this.current = index;
		this.selfHidden = false;

		elements.each(function(el, i){
			obj[i] = {};
			var hide;
			if (i != index){
				hide = true;
			} else if (options.alwaysHide && ((el.offsetHeight > 0 && options.height) || el.offsetWidth > 0 && options.width)){
				hide = true;
				this.selfHidden = true;
			}
			this.fireEvent(hide ? 'background' : 'active', [this.togglers[i], el]);
			for (var fx in effects) obj[i][fx] = hide ? 0 : el[effects[fx]];
			if (!useFx && !hide && options.resetHeight) obj[i].height = 'auto';
		}, this);

		this.internalChain.clearChain();
		this.internalChain.chain(function(){
			if (options.resetHeight && !this.selfHidden){
				var el = elements[index];
				if (el) el.setStyle('height', 'auto');
			}
		}.bind(this));

		return useFx ? this.start(obj) : this.set(obj).internalChain.callChain();
	}

});



/*
---

script: Fx.Move.js

name: Fx.Move

description: Defines Fx.Move, a class that works with Element.Position.js to transition an element from one location to another.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Fx.Morph
  - Element.Position

provides: [Fx.Move]

...
*/

Fx.Move = new Class({

	Extends: Fx.Morph,

	options: {
		relativeTo: document.body,
		position: 'center',
		edge: false,
		offset: {x: 0, y: 0}
	},

	start: function(destination){
		var element = this.element,
			topLeft = element.getStyles('top', 'left');
		if (topLeft.top == 'auto' || topLeft.left == 'auto'){
			element.setPosition(element.getPosition(element.getOffsetParent()));
		}
		return this.parent(element.position(Object.merge({}, this.options, destination, {returnPos: true})));
	}

});

Element.Properties.move = {

	set: function(options){
		this.get('move').cancel().setOptions(options);
		return this;
	},

	get: function(){
		var move = this.retrieve('move');
		if (!move){
			move = new Fx.Move(this, {link: 'cancel'});
			this.store('move', move);
		}
		return move;
	}

};

Element.implement({

	move: function(options){
		this.get('move').start(options);
		return this;
	}

});

/*
---

script: Fx.Scroll.js

name: Fx.Scroll

description: Effect to smoothly scroll any element, including the window.

license: MIT-style license

authors:
  - Valerio Proietti

requires:
  - Core/Fx
  - Core/Element.Event
  - Core/Element.Dimensions
  - MooTools.More

provides: [Fx.Scroll]

...
*/

(function(){

Fx.Scroll = new Class({

	Extends: Fx,

	options: {
		offset: {x: 0, y: 0},
		wheelStops: true
	},

	initialize: function(element, options){
		this.element = this.subject = document.id(element);
		this.parent(options);

		if (typeOf(this.element) != 'element') this.element = document.id(this.element.getDocument().body);

		if (this.options.wheelStops){
			var stopper = this.element,
				cancel = this.cancel.pass(false, this);
			this.addEvent('start', function(){
				stopper.addEvent('mousewheel', cancel);
			}, true);
			this.addEvent('complete', function(){
				stopper.removeEvent('mousewheel', cancel);
			}, true);
		}
	},

	set: function(){
		var now = Array.flatten(arguments);
		this.element.scrollTo(now[0], now[1]);
		return this;
	},

	compute: function(from, to, delta){
		return [0, 1].map(function(i){
			return Fx.compute(from[i], to[i], delta);
		});
	},

	start: function(x, y){
		if (!this.check(x, y)) return this;
		var scroll = this.element.getScroll();
		return this.parent([scroll.x, scroll.y], [x, y]);
	},

	calculateScroll: function(x, y){
		var element = this.element,
			scrollSize = element.getScrollSize(),
			scroll = element.getScroll(),
			size = element.getSize(),
			offset = this.options.offset,
			values = {x: x, y: y};

		for (var z in values){
			if (!values[z] && values[z] !== 0) values[z] = scroll[z];
			if (typeOf(values[z]) != 'number') values[z] = scrollSize[z] - size[z];
			values[z] += offset[z];
		}

		return [values.x, values.y];
	},

	toTop: function(){
		return this.start.apply(this, this.calculateScroll(false, 0));
	},

	toLeft: function(){
		return this.start.apply(this, this.calculateScroll(0, false));
	},

	toRight: function(){
		return this.start.apply(this, this.calculateScroll('right', false));
	},

	toBottom: function(){
		return this.start.apply(this, this.calculateScroll(false, 'bottom'));
	},

	toElement: function(el, axes){
		axes = axes ? Array.from(axes) : ['x', 'y'];
		var scroll = isBody(this.element) ? {x: 0, y: 0} : this.element.getScroll();
		var position = Object.map(document.id(el).getPosition(this.element), function(value, axis){
			return axes.contains(axis) ? value + scroll[axis] : false;
		});
		return this.start.apply(this, this.calculateScroll(position.x, position.y));
	},

	toElementEdge: function(el, axes, offset){
		axes = axes ? Array.from(axes) : ['x', 'y'];
		el = document.id(el);
		var to = {},
			position = el.getPosition(this.element),
			size = el.getSize(),
			scroll = this.element.getScroll(),
			containerSize = this.element.getSize(),
			edge = {
				x: position.x + size.x,
				y: position.y + size.y
			};

		['x', 'y'].each(function(axis){
			if (axes.contains(axis)){
				if (edge[axis] > scroll[axis] + containerSize[axis]) to[axis] = edge[axis] - containerSize[axis];
				if (position[axis] < scroll[axis]) to[axis] = position[axis];
			}
			if (to[axis] == null) to[axis] = scroll[axis];
			if (offset && offset[axis]) to[axis] = to[axis] + offset[axis];
		}, this);

		if (to.x != scroll.x || to.y != scroll.y) this.start(to.x, to.y);
		return this;
	},

	toElementCenter: function(el, axes, offset){
		axes = axes ? Array.from(axes) : ['x', 'y'];
		el = document.id(el);
		var to = {},
			position = el.getPosition(this.element),
			size = el.getSize(),
			scroll = this.element.getScroll(),
			containerSize = this.element.getSize();

		['x', 'y'].each(function(axis){
			if (axes.contains(axis)){
				to[axis] = position[axis] - (containerSize[axis] - size[axis]) / 2;
			}
			if (to[axis] == null) to[axis] = scroll[axis];
			if (offset && offset[axis]) to[axis] = to[axis] + offset[axis];
		}, this);

		if (to.x != scroll.x || to.y != scroll.y) this.start(to.x, to.y);
		return this;
	}

});



function isBody(element){
	return (/^(?:body|html)$/i).test(element.tagName);
}

})();

/*
---

script: Fx.Slide.js

name: Fx.Slide

description: Effect to slide an element in and out of view.

license: MIT-style license

authors:
  - Valerio Proietti

requires:
  - Core/Fx
  - Core/Element.Style
  - MooTools.More

provides: [Fx.Slide]

...
*/

Fx.Slide = new Class({

	Extends: Fx,

	options: {
		mode: 'vertical',
		wrapper: false,
		hideOverflow: true,
		resetHeight: false
	},

	initialize: function(element, options){
		element = this.element = this.subject = document.id(element);
		this.parent(options);
		options = this.options;

		var wrapper = element.retrieve('wrapper'),
			styles = element.getStyles('margin', 'position', 'overflow');

		if (options.hideOverflow) styles = Object.append(styles, {overflow: 'hidden'});
		if (options.wrapper) wrapper = document.id(options.wrapper).setStyles(styles);

		if (!wrapper) wrapper = new Element('div', {
			styles: styles
		}).wraps(element);

		element.store('wrapper', wrapper).setStyle('margin', 0);
		if (element.getStyle('overflow') == 'visible') element.setStyle('overflow', 'hidden');

		this.now = [];
		this.open = true;
		this.wrapper = wrapper;

		this.addEvent('complete', function(){
			this.open = (wrapper['offset' + this.layout.capitalize()] != 0);
			if (this.open && this.options.resetHeight) wrapper.setStyle('height', '');
		}, true);
	},

	vertical: function(){
		this.margin = 'margin-top';
		this.layout = 'height';
		this.offset = this.element.offsetHeight;
	},

	horizontal: function(){
		this.margin = 'margin-left';
		this.layout = 'width';
		this.offset = this.element.offsetWidth;
	},

	set: function(now){
		this.element.setStyle(this.margin, now[0]);
		this.wrapper.setStyle(this.layout, now[1]);
		return this;
	},

	compute: function(from, to, delta){
		return [0, 1].map(function(i){
			return Fx.compute(from[i], to[i], delta);
		});
	},

	start: function(how, mode){
		if (!this.check(how, mode)) return this;
		this[mode || this.options.mode]();

		var margin = this.element.getStyle(this.margin).toInt(),
			layout = this.wrapper.getStyle(this.layout).toInt(),
			caseIn = [[margin, layout], [0, this.offset]],
			caseOut = [[margin, layout], [-this.offset, 0]],
			start;

		switch (how){
			case 'in': start = caseIn; break;
			case 'out': start = caseOut; break;
			case 'toggle': start = (layout == 0) ? caseIn : caseOut;
		}
		return this.parent(start[0], start[1]);
	},

	slideIn: function(mode){
		return this.start('in', mode);
	},

	slideOut: function(mode){
		return this.start('out', mode);
	},

	hide: function(mode){
		this[mode || this.options.mode]();
		this.open = false;
		return this.set([-this.offset, 0]);
	},

	show: function(mode){
		this[mode || this.options.mode]();
		this.open = true;
		return this.set([0, this.offset]);
	},

	toggle: function(mode){
		return this.start('toggle', mode);
	}

});

Element.Properties.slide = {

	set: function(options){
		this.get('slide').cancel().setOptions(options);
		return this;
	},

	get: function(){
		var slide = this.retrieve('slide');
		if (!slide){
			slide = new Fx.Slide(this, {link: 'cancel'});
			this.store('slide', slide);
		}
		return slide;
	}

};

Element.implement({

	slide: function(how, mode){
		how = how || 'toggle';
		var slide = this.get('slide'), toggle;
		switch (how){
			case 'hide': slide.hide(mode); break;
			case 'show': slide.show(mode); break;
			case 'toggle':
				var flag = this.retrieve('slide:flag', slide.open);
				slide[flag ? 'slideOut' : 'slideIn'](mode);
				this.store('slide:flag', !flag);
				toggle = true;
			break;
			default: slide.start(how, mode);
		}
		if (!toggle) this.eliminate('slide:flag');
		return this;
	}

});

/*
---

script: Fx.SmoothScroll.js

name: Fx.SmoothScroll

description: Class for creating a smooth scrolling effect to all internal links on the page.

license: MIT-style license

authors:
  - Valerio Proietti

requires:
  - Core/Slick.Finder
  - Fx.Scroll

provides: [Fx.SmoothScroll]

...
*/

Fx.SmoothScroll = new Class({

	Extends: Fx.Scroll,

	options: {
		axes: ['x', 'y']
	},

	initialize: function(options, context){
		context = context || document;
		this.doc = context.getDocument();
		this.parent(this.doc, options);

		var win = context.getWindow(),
			location = win.location.href.match(/^[^#]*/)[0] + '#',
			links = $$(this.options.links || this.doc.links);

		links.each(function(link){
			if (link.href.indexOf(location) != 0) return;
			var anchor = link.href.substr(location.length);
			if (anchor) this.useLink(link, anchor);
		}, this);

		this.addEvent('complete', function(){
			win.location.hash = this.anchor;
			this.element.scrollTo(this.to[0], this.to[1]);
		}, true);
	},

	useLink: function(link, anchor){

		link.addEvent('click', function(event){
			var el = document.id(anchor) || this.doc.getElement('a[name=' + anchor + ']');
			if (!el) return;

			event.preventDefault();
			this.toElement(el, this.options.axes).chain(function(){
				this.fireEvent('scrolledTo', [link, el]);
			}.bind(this));

			this.anchor = anchor;

		}.bind(this));

		return this;
	}
});

/*
---

script: Fx.Sort.js

name: Fx.Sort

description: Defines Fx.Sort, a class that reorders lists with a transition.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Element.Dimensions
  - Fx.Elements
  - Element.Measure

provides: [Fx.Sort]

...
*/

Fx.Sort = new Class({

	Extends: Fx.Elements,

	options: {
		mode: 'vertical'
	},

	initialize: function(elements, options){
		this.parent(elements, options);
		this.elements.each(function(el){
			if (el.getStyle('position') == 'static') el.setStyle('position', 'relative');
		});
		this.setDefaultOrder();
	},

	setDefaultOrder: function(){
		this.currentOrder = this.elements.map(function(el, index){
			return index;
		});
	},

	sort: function(){
		if (!this.check(arguments)) return this;
		var newOrder = Array.flatten(arguments);

		var top = 0,
			left = 0,
			next = {},
			zero = {},
			vert = this.options.mode == 'vertical';

		var current = this.elements.map(function(el, index){
			var size = el.getComputedSize({styles: ['border', 'padding', 'margin']});
			var val;
			if (vert){
				val = {
					top: top,
					margin: size['margin-top'],
					height: size.totalHeight
				};
				top += val.height - size['margin-top'];
			} else {
				val = {
					left: left,
					margin: size['margin-left'],
					width: size.totalWidth
				};
				left += val.width;
			}
			var plane = vert ? 'top' : 'left';
			zero[index] = {};
			var start = el.getStyle(plane).toInt();
			zero[index][plane] = start || 0;
			return val;
		}, this);

		this.set(zero);
		newOrder = newOrder.map(function(i){ return i.toInt(); });
		if (newOrder.length != this.elements.length){
			this.currentOrder.each(function(index){
				if (!newOrder.contains(index)) newOrder.push(index);
			});
			if (newOrder.length > this.elements.length)
				newOrder.splice(this.elements.length-1, newOrder.length - this.elements.length);
		}
		var margin = 0;
		top = left = 0;
		newOrder.each(function(item){
			var newPos = {};
			if (vert){
				newPos.top = top - current[item].top - margin;
				top += current[item].height;
			} else {
				newPos.left = left - current[item].left;
				left += current[item].width;
			}
			margin = margin + current[item].margin;
			next[item]=newPos;
		}, this);
		var mapped = {};
		Array.clone(newOrder).sort().each(function(index){
			mapped[index] = next[index];
		});
		this.start(mapped);
		this.currentOrder = newOrder;

		return this;
	},

	rearrangeDOM: function(newOrder){
		newOrder = newOrder || this.currentOrder;
		var parent = this.elements[0].getParent();
		var rearranged = [];
		this.elements.setStyle('opacity', 0);
		//move each element and store the new default order
		newOrder.each(function(index){
			rearranged.push(this.elements[index].inject(parent).setStyles({
				top: 0,
				left: 0
			}));
		}, this);
		this.elements.setStyle('opacity', 1);
		this.elements = $$(rearranged);
		this.setDefaultOrder();
		return this;
	},

	getDefaultOrder: function(){
		return this.elements.map(function(el, index){
			return index;
		});
	},

	getCurrentOrder: function(){
		return this.currentOrder;
	},

	forward: function(){
		return this.sort(this.getDefaultOrder());
	},

	backward: function(){
		return this.sort(this.getDefaultOrder().reverse());
	},

	reverse: function(){
		return this.sort(this.currentOrder.reverse());
	},

	sortByElements: function(elements){
		return this.sort(elements.map(function(el){
			return this.elements.indexOf(el);
		}, this));
	},

	swap: function(one, two){
		if (typeOf(one) == 'element') one = this.elements.indexOf(one);
		if (typeOf(two) == 'element') two = this.elements.indexOf(two);

		var newOrder = Array.clone(this.currentOrder);
		newOrder[this.currentOrder.indexOf(one)] = two;
		newOrder[this.currentOrder.indexOf(two)] = one;

		return this.sort(newOrder);
	}

});

/*
---

script: Keyboard.js

name: Keyboard

description: KeyboardEvents used to intercept events on a class for keyboard and format modifiers in a specific order so as to make alt+shift+c the same as shift+alt+c.

license: MIT-style license

authors:
  - Perrin Westrich
  - Aaron Newton
  - Scott Kyle

requires:
  - Core/Events
  - Core/Options
  - Core/Element.Event
  - Element.Event.Pseudos.Keys

provides: [Keyboard]

...
*/

(function(){

	var Keyboard = this.Keyboard = new Class({

		Extends: Events,

		Implements: [Options],

		options: {/*
			onActivate: function(){},
			onDeactivate: function(){},*/
			defaultEventType: 'keydown',
			active: false,
			manager: null,
			events: {},
			nonParsedEvents: ['activate', 'deactivate', 'onactivate', 'ondeactivate', 'changed', 'onchanged']
		},

		initialize: function(options){
			if (options && options.manager){
				this._manager = options.manager;
				delete options.manager;
			}
			this.setOptions(options);
			this._setup();
		},

		addEvent: function(type, fn, internal){
			return this.parent(Keyboard.parse(type, this.options.defaultEventType, this.options.nonParsedEvents), fn, internal);
		},

		removeEvent: function(type, fn){
			return this.parent(Keyboard.parse(type, this.options.defaultEventType, this.options.nonParsedEvents), fn);
		},

		toggleActive: function(){
			return this[this.isActive() ? 'deactivate' : 'activate']();
		},

		activate: function(instance){
			if (instance){
				if (instance.isActive()) return this;
				//if we're stealing focus, store the last keyboard to have it so the relinquish command works
				if (this._activeKB && instance != this._activeKB){
					this.previous = this._activeKB;
					this.previous.fireEvent('deactivate');
				}
				//if we're enabling a child, assign it so that events are now passed to it
				this._activeKB = instance.fireEvent('activate');
				Keyboard.manager.fireEvent('changed');
			} else if (this._manager){
				//else we're enabling ourselves, we must ask our parent to do it for us
				this._manager.activate(this);
			}
			return this;
		},

		isActive: function(){
			return this._manager ? (this._manager._activeKB == this) : (Keyboard.manager == this);
		},

		deactivate: function(instance){
			if (instance){
				if (instance === this._activeKB){
					this._activeKB = null;
					instance.fireEvent('deactivate');
					Keyboard.manager.fireEvent('changed');
				}
			} else if (this._manager){
				this._manager.deactivate(this);
			}
			return this;
		},

		relinquish: function(){
			if (this.isActive() && this._manager && this._manager.previous) this._manager.activate(this._manager.previous);
			else this.deactivate();
			return this;
		},

		//management logic
		manage: function(instance){
			if (instance._manager) instance._manager.drop(instance);
			this._instances.push(instance);
			instance._manager = this;
			if (!this._activeKB) this.activate(instance);
			return this;
		},

		drop: function(instance){
			instance.relinquish();
			this._instances.erase(instance);
			if (this._activeKB == instance){
				if (this.previous && this._instances.contains(this.previous)) this.activate(this.previous);
				else this._activeKB = this._instances[0];
			}
			return this;
		},

		trace: function(){
			Keyboard.trace(this);
		},

		each: function(fn){
			Keyboard.each(this, fn);
		},

		/*
			PRIVATE METHODS
		*/

		_instances: [],

		_disable: function(instance){
			if (this._activeKB == instance) this._activeKB = null;
		},

		_setup: function(){
			this.addEvents(this.options.events);
			//if this is the root manager, nothing manages it
			if (Keyboard.manager && !this._manager) Keyboard.manager.manage(this);
			if (this.options.active) this.activate();
			else this.relinquish();
		},

		_handle: function(event, type){
			//Keyboard.stop(event) prevents key propagation
			if (event.preventKeyboardPropagation) return;

			var bubbles = !!this._manager;
			if (bubbles && this._activeKB){
				this._activeKB._handle(event, type);
				if (event.preventKeyboardPropagation) return;
			}
			this.fireEvent(type, event);

			if (!bubbles && this._activeKB) this._activeKB._handle(event, type);
		}

	});

	var parsed = {};
	var modifiers = ['shift', 'control', 'alt', 'meta'];
	var regex = /^(?:shift|control|ctrl|alt|meta)$/;

	Keyboard.parse = function(type, eventType, ignore){
		if (ignore && ignore.contains(type.toLowerCase())) return type;

		type = type.toLowerCase().replace(/^(keyup|keydown):/, function($0, $1){
			eventType = $1;
			return '';
		});

		if (!parsed[type]){
		    if (type != '+'){
				var key, mods = {};
				type.split('+').each(function(part){
					if (regex.test(part)) mods[part] = true;
					else key = part;
				});

				mods.control = mods.control || mods.ctrl; // allow both control and ctrl

				var keys = [];
				modifiers.each(function(mod){
					if (mods[mod]) keys.push(mod);
				});

				if (key) keys.push(key);
				parsed[type] = keys.join('+');
			} else {
			    parsed[type] = type;
			}
		}

		return eventType + ':keys(' + parsed[type] + ')';
	};

	Keyboard.each = function(keyboard, fn){
		var current = keyboard || Keyboard.manager;
		while (current){
			fn(current);
			current = current._activeKB;
		}
	};

	Keyboard.stop = function(event){
		event.preventKeyboardPropagation = true;
	};

	Keyboard.manager = new Keyboard({
		active: true
	});

	Keyboard.trace = function(keyboard){
		keyboard = keyboard || Keyboard.manager;
		var hasConsole = window.console && console.log;
		if (hasConsole) console.log('the following items have focus: ');
		Keyboard.each(keyboard, function(current){
			if (hasConsole) console.log(document.id(current.widget) || current.wiget || current);
		});
	};

	var handler = function(event){
		var keys = [];
		modifiers.each(function(mod){
			if (event[mod]) keys.push(mod);
		});

		if (!regex.test(event.key)) keys.push(event.key);
		Keyboard.manager._handle(event, event.type + ':keys(' + keys.join('+') + ')');
	};

	document.addEvents({
		'keyup': handler,
		'keydown': handler
	});

})();

/*
---

script: Keyboard.Extras.js

name: Keyboard.Extras

description: Enhances Keyboard by adding the ability to name and describe keyboard shortcuts, and the ability to grab shortcuts by name and bind the shortcut to different keys.

license: MIT-style license

authors:
  - Perrin Westrich

requires:
  - Keyboard
  - MooTools.More

provides: [Keyboard.Extras]

...
*/
Keyboard.prototype.options.nonParsedEvents.combine(['rebound', 'onrebound']);

Keyboard.implement({

	/*
		shortcut should be in the format of:
		{
			'keys': 'shift+s', // the default to add as an event.
			'description': 'blah blah blah', // a brief description of the functionality.
			'handler': function(){} // the event handler to run when keys are pressed.
		}
	*/
	addShortcut: function(name, shortcut){
		this._shortcuts = this._shortcuts || [];
		this._shortcutIndex = this._shortcutIndex || {};

		shortcut.getKeyboard = Function.from(this);
		shortcut.name = name;
		this._shortcutIndex[name] = shortcut;
		this._shortcuts.push(shortcut);
		if (shortcut.keys) this.addEvent(shortcut.keys, shortcut.handler);
		return this;
	},

	addShortcuts: function(obj){
		for (var name in obj) this.addShortcut(name, obj[name]);
		return this;
	},

	removeShortcut: function(name){
		var shortcut = this.getShortcut(name);
		if (shortcut && shortcut.keys){
			this.removeEvent(shortcut.keys, shortcut.handler);
			delete this._shortcutIndex[name];
			this._shortcuts.erase(shortcut);
		}
		return this;
	},

	removeShortcuts: function(names){
		names.each(this.removeShortcut, this);
		return this;
	},

	getShortcuts: function(){
		return this._shortcuts || [];
	},

	getShortcut: function(name){
		return (this._shortcutIndex || {})[name];
	}

});

Keyboard.rebind = function(newKeys, shortcuts){
	Array.from(shortcuts).each(function(shortcut){
		shortcut.getKeyboard().removeEvent(shortcut.keys, shortcut.handler);
		shortcut.getKeyboard().addEvent(newKeys, shortcut.handler);
		shortcut.keys = newKeys;
		shortcut.getKeyboard().fireEvent('rebound');
	});
};


Keyboard.getActiveShortcuts = function(keyboard){
	var activeKBS = [], activeSCS = [];
	Keyboard.each(keyboard, [].push.bind(activeKBS));
	activeKBS.each(function(kb){ activeSCS.extend(kb.getShortcuts()); });
	return activeSCS;
};

Keyboard.getShortcut = function(name, keyboard, opts){
	opts = opts || {};
	var shortcuts = opts.many ? [] : null,
		set = opts.many ? function(kb){
				var shortcut = kb.getShortcut(name);
				if (shortcut) shortcuts.push(shortcut);
			} : function(kb){
				if (!shortcuts) shortcuts = kb.getShortcut(name);
			};
	Keyboard.each(keyboard, set);
	return shortcuts;
};

Keyboard.getShortcuts = function(name, keyboard){
	return Keyboard.getShortcut(name, keyboard, { many: true });
};

/*
---

script: HtmlTable.js

name: HtmlTable

description: Builds table elements with methods to add rows.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Options
  - Core/Events
  - Class.Occlude

provides: [HtmlTable]

...
*/

var HtmlTable = new Class({

	Implements: [Options, Events, Class.Occlude],

	options: {
		properties: {
			cellpadding: 0,
			cellspacing: 0,
			border: 0
		},
		rows: [],
		headers: [],
		footers: []
	},

	property: 'HtmlTable',

	initialize: function(){
		var params = Array.link(arguments, {options: Type.isObject, table: Type.isElement, id: Type.isString});
		this.setOptions(params.options);
		if (!params.table && params.id) params.table = document.id(params.id);
		this.element = params.table || new Element('table', this.options.properties);
		if (this.occlude()) return this.occluded;
		this.build();
	},

	build: function(){
		this.element.store('HtmlTable', this);

		this.body = document.id(this.element.tBodies[0]) || new Element('tbody').inject(this.element);
		$$(this.body.rows);

		if (this.options.headers.length) this.setHeaders(this.options.headers);
		else this.thead = document.id(this.element.tHead);

		if (this.thead) this.head = this.getHead();
		if (this.options.footers.length) this.setFooters(this.options.footers);

		this.tfoot = document.id(this.element.tFoot);
		if (this.tfoot) this.foot = document.id(this.tfoot.rows[0]);

		this.options.rows.each(function(row){
			this.push(row);
		}, this);
	},

	toElement: function(){
		return this.element;
	},

	empty: function(){
		this.body.empty();
		return this;
	},

	set: function(what, items){
		var target = (what == 'headers') ? 'tHead' : 'tFoot',
			lower = target.toLowerCase();

		this[lower] = (document.id(this.element[target]) || new Element(lower).inject(this.element, 'top')).empty();
		var data = this.push(items, {}, this[lower], what == 'headers' ? 'th' : 'td');

		if (what == 'headers') this.head = this.getHead();
		else this.foot = this.getHead();

		return data;
	},

	getHead: function(){
		var rows = this.thead.rows;
		return rows.length > 1 ? $$(rows) : rows.length ? document.id(rows[0]) : false;
	},

	setHeaders: function(headers){
		this.set('headers', headers);
		return this;
	},

	setFooters: function(footers){
		this.set('footers', footers);
		return this;
	},

	update: function(tr, row, tag){
		var tds = tr.getChildren(tag || 'td'), last = tds.length - 1;

		row.each(function(data, index){
			var td = tds[index] || new Element(tag || 'td').inject(tr),
				content = ((data && Object.prototype.hasOwnProperty.call(data, 'content')) ? data.content : '') || data,
				type = typeOf(content);

			if (data && Object.prototype.hasOwnProperty.call(data, 'properties')) td.set(data.properties);
			if (/(element(s?)|array|collection)/.test(type)) td.empty().adopt(content);
			else td.set('html', content);

			if (index > last) tds.push(td);
			else tds[index] = td;
		});

		return {
			tr: tr,
			tds: tds
		};
	},

	push: function(row, rowProperties, target, tag, where){
		if (typeOf(row) == 'element' && row.get('tag') == 'tr'){
			row.inject(target || this.body, where);
			return {
				tr: row,
				tds: row.getChildren('td')
			};
		}
		return this.update(new Element('tr', rowProperties).inject(target || this.body, where), row, tag);
	},

	pushMany: function(rows, rowProperties, target, tag, where){
		return rows.map(function(row){
			return this.push(row, rowProperties, target, tag, where);
		}, this);
	}

});


['adopt', 'inject', 'wraps', 'grab', 'replaces', 'dispose'].each(function(method){
	HtmlTable.implement(method, function(){
		this.element[method].apply(this.element, arguments);
		return this;
	});
});



/*
---

script: HtmlTable.Select.js

name: HtmlTable.Select

description: Builds a stripy, sortable table with methods to add rows. Rows can be selected with the mouse or keyboard navigation.

license: MIT-style license

authors:
  - Harald Kirschner
  - Aaron Newton

requires:
  - Keyboard
  - Keyboard.Extras
  - HtmlTable
  - Class.refactor
  - Element.Delegation.Pseudo
  - Element.Shortcuts

provides: [HtmlTable.Select]

...
*/

HtmlTable = Class.refactor(HtmlTable, {

	options: {
		/*onRowFocus: function(){},
		onRowUnfocus: function(){},*/
		useKeyboard: true,
		classRowSelected: 'table-tr-selected',
		classRowHovered: 'table-tr-hovered',
		classSelectable: 'table-selectable',
		shiftForMultiSelect: true,
		allowMultiSelect: true,
		selectable: false,
		selectHiddenRows: false
	},

	initialize: function(){
		this.previous.apply(this, arguments);
		if (this.occluded) return this.occluded;

		this.selectedRows = new Elements();

		if (!this.bound) this.bound = {};
		this.bound.mouseleave = this.mouseleave.bind(this);
		this.bound.clickRow = this.clickRow.bind(this);
		this.bound.activateKeyboard = function(){
			if (this.keyboard && this.selectEnabled) this.keyboard.activate();
		}.bind(this);

		if (this.options.selectable) this.enableSelect();
	},

	empty: function(){
		if (this.body.rows.length) this.selectNone();
		return this.previous();
	},

	enableSelect: function(){
		this.selectEnabled = true;
		this.attachSelects();
		this.element.addClass(this.options.classSelectable);
		return this;
	},

	disableSelect: function(){
		this.selectEnabled = false;
		this.attachSelects(false);
		this.element.removeClass(this.options.classSelectable);
		return this;
	},

	push: function(){
		var ret = this.previous.apply(this, arguments);
		this.updateSelects();
		return ret;
	},

	toggleRow: function(row){
		return this[(this.isSelected(row) ? 'de' : '') + 'selectRow'](row);
	},

	selectRow: function(row, _nocheck){
		//private variable _nocheck: boolean whether or not to confirm the row is in the table body
		//added here for optimization when selecting ranges
		if (this.isSelected(row) || (!_nocheck && !this.body.getChildren().contains(row))) return;
		if (!this.options.allowMultiSelect) this.selectNone();

		if (!this.isSelected(row)){
			this.selectedRows.push(row);
			row.addClass(this.options.classRowSelected);
			this.fireEvent('rowFocus', [row, this.selectedRows]);
			this.fireEvent('stateChanged');
		}

		this.focused = row;
		document.clearSelection();

		return this;
	},

	isSelected: function(row){
		return this.selectedRows.contains(row);
	},

	getSelected: function(){
		return this.selectedRows;
	},

	serialize: function(){
		var previousSerialization = this.previous.apply(this, arguments) || {};
		if (this.options.selectable){
			previousSerialization.selectedRows = this.selectedRows.map(function(row){
				return Array.indexOf(this.body.rows, row);
			}.bind(this));
		}
		return previousSerialization;
	},

	restore: function(tableState){
		if(this.options.selectable && tableState.selectedRows){
			tableState.selectedRows.each(function(index){
				this.selectRow(this.body.rows[index]);
			}.bind(this));
		}
		this.previous.apply(this, arguments);
	},

	deselectRow: function(row, _nocheck){
		if (!this.isSelected(row) || (!_nocheck && !this.body.getChildren().contains(row))) return;

		this.selectedRows = new Elements(Array.from(this.selectedRows).erase(row));
		row.removeClass(this.options.classRowSelected);
		this.fireEvent('rowUnfocus', [row, this.selectedRows]);
		this.fireEvent('stateChanged');
		return this;
	},

	selectAll: function(selectNone){
		if (!selectNone && !this.options.allowMultiSelect) return;
		this.selectRange(0, this.body.rows.length, selectNone);
		return this;
	},

	selectNone: function(){
		return this.selectAll(true);
	},

	selectRange: function(startRow, endRow, _deselect){
		if (!this.options.allowMultiSelect && !_deselect) return;
		var method = _deselect ? 'deselectRow' : 'selectRow',
			rows = Array.clone(this.body.rows);

		if (typeOf(startRow) == 'element') startRow = rows.indexOf(startRow);
		if (typeOf(endRow) == 'element') endRow = rows.indexOf(endRow);
		endRow = endRow < rows.length - 1 ? endRow : rows.length - 1;

		if (endRow < startRow){
			var tmp = startRow;
			startRow = endRow;
			endRow = tmp;
		}

		for (var i = startRow; i <= endRow; i++){
			if (this.options.selectHiddenRows || rows[i].isDisplayed()) this[method](rows[i], true);
		}

		return this;
	},

	deselectRange: function(startRow, endRow){
		this.selectRange(startRow, endRow, true);
	},

/*
	Private methods:
*/

	enterRow: function(row){
		if (this.hovered) this.hovered = this.leaveRow(this.hovered);
		this.hovered = row.addClass(this.options.classRowHovered);
	},

	leaveRow: function(row){
		row.removeClass(this.options.classRowHovered);
	},

	updateSelects: function(){
		Array.each(this.body.rows, function(row){
			var binders = row.retrieve('binders');
			if (!binders && !this.selectEnabled) return;
			if (!binders){
				binders = {
					mouseenter: this.enterRow.pass([row], this),
					mouseleave: this.leaveRow.pass([row], this)
				};
				row.store('binders', binders);
			}
			if (this.selectEnabled) row.addEvents(binders);
			else row.removeEvents(binders);
		}, this);
	},

	shiftFocus: function(offset, event){
		if (!this.focused) return this.selectRow(this.body.rows[0], event);
		var to = this.getRowByOffset(offset, this.options.selectHiddenRows);
		if (to === null || this.focused == this.body.rows[to]) return this;
		this.toggleRow(this.body.rows[to], event);
	},

	clickRow: function(event, row){
		var selecting = (event.shift || event.meta || event.control) && this.options.shiftForMultiSelect;
		if (!selecting && !(event.rightClick && this.isSelected(row) && this.options.allowMultiSelect)) this.selectNone();

		if (event.rightClick) this.selectRow(row);
		else this.toggleRow(row);

		if (event.shift){
			this.selectRange(this.rangeStart || this.body.rows[0], row, this.rangeStart ? !this.isSelected(row) : true);
			this.focused = row;
		}
		this.rangeStart = row;
	},

	getRowByOffset: function(offset, includeHiddenRows){
		if (!this.focused) return 0;
		var index = Array.indexOf(this.body.rows, this.focused);
		if ((index == 0 && offset < 0) || (index == this.body.rows.length -1 && offset > 0)) return null;
		if (includeHiddenRows){
			index += offset;
		} else {
			var limit = 0,
			    count = 0;
			if (offset > 0){
				while (count < offset && index < this.body.rows.length -1){
					if (this.body.rows[++index].isDisplayed()) count++;
				}
			} else {
				while (count > offset && index > 0){
					if (this.body.rows[--index].isDisplayed()) count--;
				}
			}
		}
		return index;
	},

	attachSelects: function(attach){
		attach = attach != null ? attach : true;

		var method = attach ? 'addEvents' : 'removeEvents';
		this.element[method]({
			mouseleave: this.bound.mouseleave,
			click: this.bound.activateKeyboard
		});

		this.body[method]({
			'click:relay(tr)': this.bound.clickRow,
			'contextmenu:relay(tr)': this.bound.clickRow
		});

		if (this.options.useKeyboard || this.keyboard){
			if (!this.keyboard) this.keyboard = new Keyboard();
			if (!this.selectKeysDefined){
				this.selectKeysDefined = true;
				var timer, held;

				var move = function(offset){
					var mover = function(e){
						clearTimeout(timer);
						e.preventDefault();
						var to = this.body.rows[this.getRowByOffset(offset, this.options.selectHiddenRows)];
						if (e.shift && to && this.isSelected(to)){
							this.deselectRow(this.focused);
							this.focused = to;
						} else {
							if (to && (!this.options.allowMultiSelect || !e.shift)){
								this.selectNone();
							}
							this.shiftFocus(offset, e);
						}

						if (held){
							timer = mover.delay(100, this, e);
						} else {
							timer = (function(){
								held = true;
								mover(e);
							}).delay(400);
						}
					}.bind(this);
					return mover;
				}.bind(this);

				var clear = function(){
					clearTimeout(timer);
					held = false;
				};

				this.keyboard.addEvents({
					'keydown:shift+up': move(-1),
					'keydown:shift+down': move(1),
					'keyup:shift+up': clear,
					'keyup:shift+down': clear,
					'keyup:up': clear,
					'keyup:down': clear
				});

				var shiftHint = '';
				if (this.options.allowMultiSelect && this.options.shiftForMultiSelect && this.options.useKeyboard){
					shiftHint = " (Shift multi-selects).";
				}

				this.keyboard.addShortcuts({
					'Select Previous Row': {
						keys: 'up',
						shortcut: 'up arrow',
						handler: move(-1),
						description: 'Select the previous row in the table.' + shiftHint
					},
					'Select Next Row': {
						keys: 'down',
						shortcut: 'down arrow',
						handler: move(1),
						description: 'Select the next row in the table.' + shiftHint
					}
				});

			}
			this.keyboard[attach ? 'activate' : 'deactivate']();
		}
		this.updateSelects();
	},

	mouseleave: function(){
		if (this.hovered) this.leaveRow(this.hovered);
	}

});

/*
---

script: HtmlTable.Sort.js

name: HtmlTable.Sort

description: Builds a stripy, sortable table with methods to add rows.

license: MIT-style license

authors:
  - Harald Kirschner
  - Aaron Newton
  - Jacob Thornton

requires:
  - Core/Hash
  - HtmlTable
  - Class.refactor
  - Element.Delegation.Pseudo
  - String.Extras
  - Date

provides: [HtmlTable.Sort]

...
*/
(function(){

var readOnlyNess = document.createElement('table');
try {
	readOnlyNess.innerHTML = '<tr><td></td></tr>';
	readOnlyNess = readOnlyNess.childNodes.length === 0;
} catch (e){
	readOnlyNess = true;
}

HtmlTable = Class.refactor(HtmlTable, {

	options: {/*
		onSort: function(){}, */
		sortIndex: 0,
		sortReverse: false,
		parsers: [],
		defaultParser: 'string',
		classSortable: 'table-sortable',
		classHeadSort: 'table-th-sort',
		classHeadSortRev: 'table-th-sort-rev',
		classNoSort: 'table-th-nosort',
		classGroupHead: 'table-tr-group-head',
		classGroup: 'table-tr-group',
		classCellSort: 'table-td-sort',
		classSortSpan: 'table-th-sort-span',
		sortable: false,
		thSelector: 'th'
	},

	initialize: function (){
		this.previous.apply(this, arguments);
		if (this.occluded) return this.occluded;
		this.sorted = {index: null, dir: 1};
		if (!this.bound) this.bound = {};
		this.bound.headClick = this.headClick.bind(this);
		this.sortSpans = new Elements();
		if (this.options.sortable){
			this.enableSort();
			if (this.options.sortIndex != null) this.sort(this.options.sortIndex, this.options.sortReverse);
		}
	},

	attachSorts: function(attach){
		this.detachSorts();
		if (attach !== false) this.element.addEvent('click:relay(' + this.options.thSelector + ')', this.bound.headClick);
	},

	detachSorts: function(){
		this.element.removeEvents('click:relay(' + this.options.thSelector + ')');
	},

	setHeaders: function(){
		this.previous.apply(this, arguments);
		if (this.sortable) this.setParsers();
	},

	setParsers: function(){
		this.parsers = this.detectParsers();
	},

	detectParsers: function(){
		return this.head && this.head.getElements(this.options.thSelector).flatten().map(this.detectParser, this);
	},

	detectParser: function(cell, index){
		if (cell.hasClass(this.options.classNoSort) || cell.retrieve('htmltable-parser')) return cell.retrieve('htmltable-parser');
		var thDiv = new Element('div');
		thDiv.adopt(cell.childNodes).inject(cell);
		var sortSpan = new Element('span', {'class': this.options.classSortSpan}).inject(thDiv, 'top');
		this.sortSpans.push(sortSpan);
		var parser = this.options.parsers[index],
			rows = this.body.rows,
			cancel;
		switch (typeOf(parser)){
			case 'function': parser = {convert: parser}; cancel = true; break;
			case 'string': parser = parser; cancel = true; break;
		}
		if (!cancel){
			HtmlTable.ParserPriority.some(function(parserName){
				var current = HtmlTable.Parsers[parserName],
					match = current.match;
				if (!match) return false;
				for (var i = 0, j = rows.length; i < j; i++){
					var cell = document.id(rows[i].cells[index]),
						text = cell ? cell.get('html').clean() : '';
					if (text && match.test(text)){
						parser = current;
						return true;
					}
				}
			});
		}
		if (!parser) parser = this.options.defaultParser;
		cell.store('htmltable-parser', parser);
		return parser;
	},

	headClick: function(event, el){
		if (!this.head || el.hasClass(this.options.classNoSort)) return;
		return this.sort(Array.indexOf(this.head.getElements(this.options.thSelector).flatten(), el) % this.body.rows[0].cells.length);
	},

	serialize: function(){
		var previousSerialization = this.previous.apply(this, arguments) || {};
		if (this.options.sortable){
			previousSerialization.sortIndex = this.sorted.index;
			previousSerialization.sortReverse = this.sorted.reverse;
		}
		return previousSerialization;
	},

	restore: function(tableState){
		if(this.options.sortable && tableState.sortIndex){
			this.sort(tableState.sortIndex, tableState.sortReverse);
		}
		this.previous.apply(this, arguments);
	},

	setSortedState: function(index, reverse){
		if (reverse != null) this.sorted.reverse = reverse;
		else if (this.sorted.index == index) this.sorted.reverse = !this.sorted.reverse;
		else this.sorted.reverse = this.sorted.index == null;

		if (index != null) this.sorted.index = index;
	},

	setHeadSort: function(sorted){
		var head = $$(!this.head.length ? this.head.cells[this.sorted.index] : this.head.map(function(row){
			return row.getElements(this.options.thSelector)[this.sorted.index];
		}, this).clean());
		if (!head.length) return;
		if (sorted){
			head.addClass(this.options.classHeadSort);
			if (this.sorted.reverse) head.addClass(this.options.classHeadSortRev);
			else head.removeClass(this.options.classHeadSortRev);
		} else {
			head.removeClass(this.options.classHeadSort).removeClass(this.options.classHeadSortRev);
		}
	},

	setRowSort: function(data, pre){
		var count = data.length,
			body = this.body,
			group,
			rowIndex;

		while (count){
			var item = data[--count],
				position = item.position,
				row = body.rows[position];

			if (row.disabled) continue;
			if (!pre){
				group = this.setGroupSort(group, row, item);
				this.setRowStyle(row, count);
			}
			body.appendChild(row);

			for (rowIndex = 0; rowIndex < count; rowIndex++){
				if (data[rowIndex].position > position) data[rowIndex].position--;
			}
		}
	},

	setRowStyle: function(row, i){
		this.previous(row, i);
		row.cells[this.sorted.index].addClass(this.options.classCellSort);
	},

	setGroupSort: function(group, row, item){
		if (group == item.value) row.removeClass(this.options.classGroupHead).addClass(this.options.classGroup);
		else row.removeClass(this.options.classGroup).addClass(this.options.classGroupHead);
		return item.value;
	},

	getParser: function(){
		var parser = this.parsers[this.sorted.index];
		return typeOf(parser) == 'string' ? HtmlTable.Parsers[parser] : parser;
	},

	sort: function(index, reverse, pre, sortFunction){
		if (!this.head) return;

		if (!pre){
			this.clearSort();
			this.setSortedState(index, reverse);
			this.setHeadSort(true);
		}

		var parser = this.getParser();
		if (!parser) return;

		var rel;
		if (!readOnlyNess){
			rel = this.body.getParent();
			this.body.dispose();
		}

		var data = this.parseData(parser).sort(sortFunction ? sortFunction : function(a, b){
			if (a.value === b.value) return 0;
			return a.value > b.value ? 1 : -1;
		});

		if (this.sorted.reverse == (parser == HtmlTable.Parsers['input-checked'])) data.reverse(true);
		this.setRowSort(data, pre);

		if (rel) rel.grab(this.body);
		this.fireEvent('stateChanged');
		return this.fireEvent('sort', [this.body, this.sorted.index]);
	},

	parseData: function(parser){
		return Array.map(this.body.rows, function(row, i){
			var value = parser.convert.call(document.id(row.cells[this.sorted.index]));
			return {
				position: i,
				value: value
			};
		}, this);
	},

	clearSort: function(){
		this.setHeadSort(false);
		this.body.getElements('td').removeClass(this.options.classCellSort);
	},

	reSort: function(){
		if (this.sortable) this.sort.call(this, this.sorted.index, this.sorted.reverse);
		return this;
	},

	enableSort: function(){
		this.element.addClass(this.options.classSortable);
		this.attachSorts(true);
		this.setParsers();
		this.sortable = true;
		return this;
	},

	disableSort: function(){
		this.element.removeClass(this.options.classSortable);
		this.attachSorts(false);
		this.sortSpans.each(function(span){
			span.destroy();
		});
		this.sortSpans.empty();
		this.sortable = false;
		return this;
	}

});

HtmlTable.ParserPriority = ['date', 'input-checked', 'input-value', 'float', 'number'];

HtmlTable.Parsers = {

	'date': {
		match: /^\d{2}[-\/ ]\d{2}[-\/ ]\d{2,4}$/,
		convert: function(){
			var d = Date.parse(this.get('text').stripTags());
			return (typeOf(d) == 'date') ? d.format('db') : '';
		},
		type: 'date'
	},
	'input-checked': {
		match: / type="(radio|checkbox)"/,
		convert: function(){
			return this.getElement('input').checked;
		}
	},
	'input-value': {
		match: /<input/,
		convert: function(){
			return this.getElement('input').value;
		}
	},
	'number': {
		match: /^\d+[^\d.,]*$/,
		convert: function(){
			return this.get('text').stripTags().toInt();
		},
		number: true
	},
	'numberLax': {
		match: /^[^\d]+\d+$/,
		convert: function(){
			return this.get('text').replace(/[^-?^0-9]/, '').stripTags().toInt();
		},
		number: true
	},
	'float': {
		match: /^[\d]+\.[\d]+/,
		convert: function(){
			return this.get('text').replace(/[^-?^\d.e]/, '').stripTags().toFloat();
		},
		number: true
	},
	'floatLax': {
		match: /^[^\d]+[\d]+\.[\d]+$/,
		convert: function(){
			return this.get('text').replace(/[^-?^\d.]/, '').stripTags().toFloat();
		},
		number: true
	},
	'string': {
		match: null,
		convert: function(){
			return this.get('text').stripTags().toLowerCase();
		}
	},
	'title': {
		match: null,
		convert: function(){
			return this.title;
		}
	}

};



HtmlTable.defineParsers = function(parsers){
	HtmlTable.Parsers = Object.append(HtmlTable.Parsers, parsers);
	for (var parser in parsers){
		HtmlTable.ParserPriority.unshift(parser);
	}
};

})();


/*
---

script: HtmlTable.Zebra.js

name: HtmlTable.Zebra

description: Builds a stripy table with methods to add rows.

license: MIT-style license

authors:
  - Harald Kirschner
  - Aaron Newton

requires:
  - HtmlTable
  - Element.Shortcuts
  - Class.refactor

provides: [HtmlTable.Zebra]

...
*/

HtmlTable = Class.refactor(HtmlTable, {

	options: {
		classZebra: 'table-tr-odd',
		zebra: true,
		zebraOnlyVisibleRows: true
	},

	initialize: function(){
		this.previous.apply(this, arguments);
		if (this.occluded) return this.occluded;
		if (this.options.zebra) this.updateZebras();
	},

	updateZebras: function(){
		var index = 0;
		Array.each(this.body.rows, function(row){
			if (!this.options.zebraOnlyVisibleRows || row.isDisplayed()){
				this.zebra(row, index++);
			}
		}, this);
	},

	setRowStyle: function(row, i){
		if (this.previous) this.previous(row, i);
		this.zebra(row, i);
	},

	zebra: function(row, i){
		return row[((i % 2) ? 'remove' : 'add')+'Class'](this.options.classZebra);
	},

	push: function(){
		var pushed = this.previous.apply(this, arguments);
		if (this.options.zebra) this.updateZebras();
		return pushed;
	}

});

/*
---

script: Scroller.js

name: Scroller

description: Class which scrolls the contents of any Element (including the window) when the mouse reaches the Element's boundaries.

license: MIT-style license

authors:
  - Valerio Proietti

requires:
  - Core/Events
  - Core/Options
  - Core/Element.Event
  - Core/Element.Dimensions
  - MooTools.More

provides: [Scroller]

...
*/

var Scroller = new Class({

	Implements: [Events, Options],

	options: {
		area: 20,
		velocity: 1,
		onChange: function(x, y){
			this.element.scrollTo(x, y);
		},
		fps: 50
	},

	initialize: function(element, options){
		this.setOptions(options);
		this.element = document.id(element);
		this.docBody = document.id(this.element.getDocument().body);
		this.listener = (typeOf(this.element) != 'element') ? this.docBody : this.element;
		this.timer = null;
		this.bound = {
			attach: this.attach.bind(this),
			detach: this.detach.bind(this),
			getCoords: this.getCoords.bind(this)
		};
	},

	start: function(){
		this.listener.addEvents({
			mouseover: this.bound.attach,
			mouseleave: this.bound.detach
		});
		return this;
	},

	stop: function(){
		this.listener.removeEvents({
			mouseover: this.bound.attach,
			mouseleave: this.bound.detach
		});
		this.detach();
		this.timer = clearInterval(this.timer);
		return this;
	},

	attach: function(){
		this.listener.addEvent('mousemove', this.bound.getCoords);
	},

	detach: function(){
		this.listener.removeEvent('mousemove', this.bound.getCoords);
		this.timer = clearInterval(this.timer);
	},

	getCoords: function(event){
		this.page = (this.listener.get('tag') == 'body') ? event.client : event.page;
		if (!this.timer) this.timer = this.scroll.periodical(Math.round(1000 / this.options.fps), this);
	},

	scroll: function(){
		var size = this.element.getSize(),
			scroll = this.element.getScroll(),
			pos = ((this.element != this.docBody) && (this.element != window)) ? element.getOffsets() : {x: 0, y: 0},
			scrollSize = this.element.getScrollSize(),
			change = {x: 0, y: 0},
			top = this.options.area.top || this.options.area,
			bottom = this.options.area.bottom || this.options.area;
		for (var z in this.page){
			if (this.page[z] < (top + pos[z]) && scroll[z] != 0){
				change[z] = (this.page[z] - top - pos[z]) * this.options.velocity;
			} else if (this.page[z] + bottom > (size[z] + pos[z]) && scroll[z] + size[z] != scrollSize[z]){
				change[z] = (this.page[z] - size[z] + bottom - pos[z]) * this.options.velocity;
			}
			change[z] = change[z].round();
		}
		if (change.y || change.x) this.fireEvent('change', [scroll.x + change.x, scroll.y + change.y]);
	}

});

/*
---

script: Tips.js

name: Tips

description: Class for creating nice tips that follow the mouse cursor when hovering an element.

license: MIT-style license

authors:
  - Valerio Proietti
  - Christoph Pojer
  - Luis Merino

requires:
  - Core/Options
  - Core/Events
  - Core/Element.Event
  - Core/Element.Style
  - Core/Element.Dimensions
  - MooTools.More

provides: [Tips]

...
*/

(function(){

var read = function(option, element){
	return (option) ? (typeOf(option) == 'function' ? option(element) : element.get(option)) : '';
};

this.Tips = new Class({

	Implements: [Events, Options],

	options: {/*
		id: null,
		onAttach: function(element){},
		onDetach: function(element){},
		onBound: function(coords){},*/
		onShow: function(){
			this.tip.setStyle('display', 'block');
		},
		onHide: function(){
			this.tip.setStyle('display', 'none');
		},
		title: 'title',
		text: function(element){
			return element.get('rel') || element.get('href');
		},
		showDelay: 100,
		hideDelay: 100,
		className: 'tip-wrap',
		offset: {x: 16, y: 16},
		windowPadding: {x:0, y:0},
		fixed: false,
		waiAria: true
	},

	initialize: function(){
		var params = Array.link(arguments, {
			options: Type.isObject,
			elements: function(obj){
				return obj != null;
			}
		});
		this.setOptions(params.options);
		if (params.elements) this.attach(params.elements);
		this.container = new Element('div', {'class': 'tip'});

		if (this.options.id){
			this.container.set('id', this.options.id);
			if (this.options.waiAria) this.attachWaiAria();
		}
	},

	toElement: function(){
		if (this.tip) return this.tip;

		this.tip = new Element('div', {
			'class': this.options.className,
			styles: {
				position: 'absolute',
				top: 0,
				left: 0
			}
		}).adopt(
			new Element('div', {'class': 'tip-top'}),
			this.container,
			new Element('div', {'class': 'tip-bottom'})
		);

		return this.tip;
	},

	attachWaiAria: function(){
		var id = this.options.id;
		this.container.set('role', 'tooltip');

		if (!this.waiAria){
			this.waiAria = {
				show: function(element){
					if (id) element.set('aria-describedby', id);
					this.container.set('aria-hidden', 'false');
				},
				hide: function(element){
					if (id) element.erase('aria-describedby');
					this.container.set('aria-hidden', 'true');
				}
			};
		}
		this.addEvents(this.waiAria);
	},

	detachWaiAria: function(){
		if (this.waiAria){
			this.container.erase('role');
			this.container.erase('aria-hidden');
			this.removeEvents(this.waiAria);
		}
	},

	attach: function(elements){
		$$(elements).each(function(element){
			var title = read(this.options.title, element),
				text = read(this.options.text, element);

			element.set('title', '').store('tip:native', title).retrieve('tip:title', title);
			element.retrieve('tip:text', text);
			this.fireEvent('attach', [element]);

			var events = ['enter', 'leave'];
			if (!this.options.fixed) events.push('move');

			events.each(function(value){
				var event = element.retrieve('tip:' + value);
				if (!event) event = function(event){
					this['element' + value.capitalize()].apply(this, [event, element]);
				}.bind(this);

				element.store('tip:' + value, event).addEvent('mouse' + value, event);
			}, this);
		}, this);

		return this;
	},

	detach: function(elements){
		$$(elements).each(function(element){
			['enter', 'leave', 'move'].each(function(value){
				element.removeEvent('mouse' + value, element.retrieve('tip:' + value)).eliminate('tip:' + value);
			});

			this.fireEvent('detach', [element]);

			if (this.options.title == 'title'){ // This is necessary to check if we can revert the title
				var original = element.retrieve('tip:native');
				if (original) element.set('title', original);
			}
		}, this);

		return this;
	},

	elementEnter: function(event, element){
		clearTimeout(this.timer);
		this.timer = (function(){
			this.container.empty();

			['title', 'text'].each(function(value){
				var content = element.retrieve('tip:' + value);
				var div = this['_' + value + 'Element'] = new Element('div', {
						'class': 'tip-' + value
					}).inject(this.container);
				if (content) this.fill(div, content);
			}, this);
			this.show(element);
			this.position((this.options.fixed) ? {page: element.getPosition()} : event);
		}).delay(this.options.showDelay, this);
	},

	elementLeave: function(event, element){
		clearTimeout(this.timer);
		this.timer = this.hide.delay(this.options.hideDelay, this, element);
		this.fireForParent(event, element);
	},

	setTitle: function(title){
		if (this._titleElement){
			this._titleElement.empty();
			this.fill(this._titleElement, title);
		}
		return this;
	},

	setText: function(text){
		if (this._textElement){
			this._textElement.empty();
			this.fill(this._textElement, text);
		}
		return this;
	},

	fireForParent: function(event, element){
		element = element.getParent();
		if (!element || element == document.body) return;
		if (element.retrieve('tip:enter')) element.fireEvent('mouseenter', event);
		else this.fireForParent(event, element);
	},

	elementMove: function(event, element){
		this.position(event);
	},

	position: function(event){
		if (!this.tip) document.id(this);

		var size = window.getSize(), scroll = window.getScroll(),
			tip = {x: this.tip.offsetWidth, y: this.tip.offsetHeight},
			props = {x: 'left', y: 'top'},
			bounds = {y: false, x2: false, y2: false, x: false},
			obj = {};

		for (var z in props){
			obj[props[z]] = event.page[z] + this.options.offset[z];
			if (obj[props[z]] < 0) bounds[z] = true;
			if ((obj[props[z]] + tip[z] - scroll[z]) > size[z] - this.options.windowPadding[z]){
				obj[props[z]] = event.page[z] - this.options.offset[z] - tip[z];
				bounds[z+'2'] = true;
			}
		}

		this.fireEvent('bound', bounds);
		this.tip.setStyles(obj);
	},

	fill: function(element, contents){
		if (typeof contents == 'string') element.set('html', contents);
		else element.adopt(contents);
	},

	show: function(element){
		if (!this.tip) document.id(this);
		if (!this.tip.getParent()) this.tip.inject(document.body);
		this.fireEvent('show', [this.tip, element]);
	},

	hide: function(element){
		if (!this.tip) document.id(this);
		this.fireEvent('hide', [this.tip, element]);
	}

});

})();

/*
---

name: Locale.EU.Number

description: Number messages for Europe.

license: MIT-style license

authors:
  - Arian Stolwijk

requires:
  - Locale

provides: [Locale.EU.Number]

...
*/

Locale.define('EU', 'Number', {

	decimal: ',',
	group: '.',

	currency: {
		prefix: '€ '
	}

});

/*
---

script: Locale.Set.From.js

name: Locale.Set.From

description: Provides an alternative way to create Locale.Set objects.

license: MIT-style license

authors:
  - Tim Wienk

requires:
  - Core/JSON
  - Locale

provides: Locale.Set.From

...
*/

(function(){

var parsers = {
	'json': JSON.decode
};

Locale.Set.defineParser = function(name, fn){
	parsers[name] = fn;
};

Locale.Set.from = function(set, type){
	if (instanceOf(set, Locale.Set)) return set;

	if (!type && typeOf(set) == 'string') type = 'json';
	if (parsers[type]) set = parsers[type](set);

	var locale = new Locale.Set;

	locale.sets = set.sets || {};

	if (set.inherits){
		locale.inherits.locales = Array.from(set.inherits.locales);
		locale.inherits.sets = set.inherits.sets || {};
	}

	return locale;
};

})();

/*
---

name: Locale.ZA.Number

description: Number messages for ZA.

license: MIT-style license

authors:
  - Werner Mollentze

requires:
  - Locale

provides: [Locale.ZA.Number]

...
*/

Locale.define('ZA', 'Number', {

	decimal: '.',
	group: ',',

	currency: {
		prefix: 'R '
	}

});



/*
---

name: Locale.af-ZA.Date

description: Date messages for ZA Afrikaans.

license: MIT-style license

authors:
  - Werner Mollentze

requires:
  - Locale

provides: [Locale.af-ZA.Date]

...
*/

Locale.define('af-ZA', 'Date', {

	months: ['Januarie', 'Februarie', 'Maart', 'April', 'Mei', 'Junie', 'Julie', 'Augustus', 'September', 'Oktober', 'November', 'Desember'],
	months_abbr: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
	days: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag'],
	days_abbr: ['Son', 'Maa', 'Din', 'Woe', 'Don', 'Vry', 'Sat'],

	// Culture's date order: MM/DD/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d-%m-%Y',
	shortTime: '%H:%M',
	AM: 'VM',
	PM: 'NM',
	firstDayOfWeek: 1,
   
	// Date.Extras
	ordinal: function(dayOfMonth){
		return ((dayOfMonth > 1 && dayOfMonth < 20 && dayOfMonth != 8) || (dayOfMonth > 100 && dayOfMonth.toString().substr(-2, 1) == '1')) ? 'de' : 'ste';
	},

	lessThanMinuteAgo: 'minder as \'n minuut gelede',
	minuteAgo: 'ongeveer \'n minuut gelede',
	minutesAgo: '{delta} minute gelede',
	hourAgo: 'omtret \'n uur gelede',
	hoursAgo: 'ongeveer {delta} ure gelede',
	dayAgo: '1 dag gelede',
	daysAgo: '{delta} dae gelede',
	weekAgo: '1 week gelede',
	weeksAgo: '{delta} weke gelede',
	monthAgo: '1 maand gelede',
	monthsAgo: '{delta} maande gelede',
	yearAgo: '1 jaar gelede',
	yearsAgo: '{delta} jare gelede',

	lessThanMinuteUntil: 'oor minder as \'n minuut',
	minuteUntil: 'oor ongeveer \'n minuut',
	minutesUntil: 'oor {delta} minute',
	hourUntil: 'oor ongeveer \'n uur',
	hoursUntil: 'oor {delta} uur',
	dayUntil: 'oor ongeveer \'n dag',
	daysUntil: 'oor {delta} dae',
	weekUntil: 'oor \'n week',
	weeksUntil: 'oor {delta} weke',
	monthUntil: 'oor \'n maand',
	monthsUntil: 'oor {delta} maande',
	yearUntil: 'oor \'n jaar',
	yearsUntil: 'oor {delta} jaar'

});

/*
---

name: Locale.af-ZA.Form.Validator

description: Form Validator messages for Afrikaans.

license: MIT-style license

authors:
  - Werner Mollentze

requires:
  - Locale

provides: [Locale.af-ZA.Form.Validator]

...
*/

Locale.define('af-ZA', 'FormValidator', {

	required: 'Hierdie veld word vereis.',
	length: 'Voer asseblief {length} karakters in (u het {elLength} karakters ingevoer)',
	minLength: 'Voer asseblief ten minste {minLength} karakters in (u het {length} karakters ingevoer).',
	maxLength: 'Moet asseblief nie meer as {maxLength} karakters invoer nie (u het {length} karakters ingevoer).',
	integer: 'Voer asseblief \'n heelgetal in hierdie veld in. Getalle met desimale (bv. 1.25) word nie toegelaat nie.',
	numeric: 'Voer asseblief slegs numeriese waardes in hierdie veld in (bv. "1" of "1.1" of "-1" of "-1.1").',
	digits: 'Gebruik asseblief slegs nommers en punktuasie in hierdie veld. (by voorbeeld, \'n telefoon nommer wat koppeltekens en punte bevat is toelaatbaar).',
	alpha: 'Gebruik asseblief slegs letters (a-z) binne-in hierdie veld. Geen spasies of ander karakters word toegelaat nie.',
	alphanum: 'Gebruik asseblief slegs letters (a-z) en nommers (0-9) binne-in hierdie veld. Geen spasies of ander karakters word toegelaat nie.',
	dateSuchAs: 'Voer asseblief \'n geldige datum soos {date} in',
	dateInFormatMDY: 'Voer asseblief \'n geldige datum soos MM/DD/YYYY in (bv. "12/31/1999")',
	email: 'Voer asseblief \'n geldige e-pos adres in. Byvoorbeeld "fred@domain.com".',
	url: 'Voer asseblief \'n geldige bronadres (URL) soos http://www.example.com in.',
	currencyDollar: 'Voer asseblief \'n geldige $ bedrag in. Byvoorbeeld $100.00 .',
	oneRequired: 'Voer asseblief iets in vir ten minste een van hierdie velde.',
	errorPrefix: 'Fout: ',
	warningPrefix: 'Waarskuwing: ',

	// Form.Validator.Extras
	noSpace: 'Daar mag geen spasies in hierdie toevoer wees nie.',
	reqChkByNode: 'Geen items is gekies nie.',
	requiredChk: 'Hierdie veld word vereis.',
	reqChkByName: 'Kies asseblief \'n {label}.',
	match: 'Hierdie veld moet by die {matchName} veld pas',
	startDate: 'die begin datum',
	endDate: 'die eind datum',
	currentDate: 'die huidige datum',
	afterDate: 'Die datum moet dieselfde of na {label} wees.',
	beforeDate: 'Die datum moet dieselfde of voor {label} wees.',
	startMonth: 'Kies asseblief \'n begin maand',
	sameMonth: 'Hierdie twee datums moet in dieselfde maand wees - u moet een of beide verander.',
	creditcard: 'Die ingevoerde kredietkaart nommer is ongeldig. Bevestig asseblief die nommer en probeer weer. {length} syfers is ingevoer.'

});

/*
---

name: Locale.af-ZA.Number

description: Number messages for ZA Afrikaans.

license: MIT-style license

authors:
  - Werner Mollentze

requires:
  - Locale
  - Locale.ZA.Number

provides: [Locale.af-ZA.Number]

...
*/

Locale.define('af-ZA').inherit('ZA', 'Number');

/*
---

name: Locale.ar.Date

description: Date messages for Arabic.

license: MIT-style license

authors:
  - Chafik Barbar

requires:
  - Locale

provides: [Locale.ar.Date]

...
*/

Locale.define('ar', 'Date', {

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M'

});

/*
---

name: Locale.ar.Form.Validator

description: Form Validator messages for Arabic.

license: MIT-style license

authors:
  - Chafik Barbar

requires:
  - Locale

provides: [Locale.ar.Form.Validator]

...
*/

Locale.define('ar', 'FormValidator', {

	required: 'هذا الحقل مطلوب.',
	minLength: 'رجاءً إدخال {minLength} أحرف على الأقل (تم إدخال {length} أحرف).',
	maxLength: 'الرجاء عدم إدخال أكثر من {maxLength} أحرف (تم إدخال {length} أحرف).',
	integer: 'الرجاء إدخال عدد صحيح في هذا الحقل. أي رقم ذو كسر عشري أو مئوي (مثال 1.25 ) غير مسموح.',
	numeric: 'الرجاء إدخال قيم رقمية في هذا الحقل (مثال "1" أو "1.1" أو "-1" أو "-1.1").',
	digits: 'الرجاء أستخدام قيم رقمية وعلامات ترقيمية فقط في هذا الحقل (مثال, رقم هاتف مع نقطة أو شحطة)',
	alpha: 'الرجاء أستخدام أحرف فقط (ا-ي) في هذا الحقل. أي فراغات أو علامات غير مسموحة.',
	alphanum: 'الرجاء أستخدام أحرف فقط (ا-ي) أو أرقام (0-9) فقط في هذا الحقل. أي فراغات أو علامات غير مسموحة.',
	dateSuchAs: 'الرجاء إدخال تاريخ صحيح كالتالي {date}',
	dateInFormatMDY: 'الرجاء إدخال تاريخ صحيح (مثال, 31-12-1999)',
	email: 'الرجاء إدخال بريد إلكتروني صحيح.',
	url: 'الرجاء إدخال عنوان إلكتروني صحيح مثل http://www.example.com',
	currencyDollar: 'الرجاء إدخال قيمة $ صحيحة. مثال, 100.00$',
	oneRequired: 'الرجاء إدخال قيمة في أحد هذه الحقول على الأقل.',
	errorPrefix: 'خطأ: ',
	warningPrefix: 'تحذير: '

});

/*
---

name: Locale.ca-CA.Date

description: Date messages for Catalan.

license: MIT-style license

authors:
  - Ãlfons Sanchez

requires:
  - Locale

provides: [Locale.ca-CA.Date]

...
*/

Locale.define('ca-CA', 'Date', {

	months: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juli', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
	months_abbr: ['gen.', 'febr.', 'març', 'abr.', 'maig', 'juny', 'jul.', 'ag.', 'set.', 'oct.', 'nov.', 'des.'],
	days: ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'],
	days_abbr: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'],

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 0,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: 'fa menys d`un minut',
	minuteAgo: 'fa un minut',
	minutesAgo: 'fa {delta} minuts',
	hourAgo: 'fa un hora',
	hoursAgo: 'fa unes {delta} hores',
	dayAgo: 'fa un dia',
	daysAgo: 'fa {delta} dies',

	lessThanMinuteUntil: 'menys d`un minut des d`ara',
	minuteUntil: 'un minut des d`ara',
	minutesUntil: '{delta} minuts des d`ara',
	hourUntil: 'un hora des d`ara',
	hoursUntil: 'unes {delta} hores des d`ara',
	dayUntil: '1 dia des d`ara',
	daysUntil: '{delta} dies des d`ara'

});

/*
---

name: Locale.ca-CA.Form.Validator

description: Form Validator messages for Catalan.

license: MIT-style license

authors:
  - Miquel Hudin
  - Ãlfons Sanchez

requires:
  - Locale

provides: [Locale.ca-CA.Form.Validator]

...
*/

Locale.define('ca-CA', 'FormValidator', {

	required: 'Aquest camp es obligatori.',
	minLength: 'Per favor introdueix al menys {minLength} caracters (has introduit {length} caracters).',
	maxLength: 'Per favor introdueix no mes de {maxLength} caracters (has introduit {length} caracters).',
	integer: 'Per favor introdueix un nombre enter en aquest camp. Nombres amb decimals (p.e. 1,25) no estan permesos.',
	numeric: 'Per favor introdueix sols valors numerics en aquest camp (p.e. "1" o "1,1" o "-1" o "-1,1").',
	digits: 'Per favor usa sols numeros i puntuacio en aquest camp (per exemple, un nombre de telefon amb guions i punts no esta permes).',
	alpha: 'Per favor utilitza lletres nomes (a-z) en aquest camp. No s´admiteixen espais ni altres caracters.',
	alphanum: 'Per favor, utilitza nomes lletres (a-z) o numeros (0-9) en aquest camp. No s´admiteixen espais ni altres caracters.',
	dateSuchAs: 'Per favor introdueix una data valida com {date}',
	dateInFormatMDY: 'Per favor introdueix una data valida com DD/MM/YYYY (p.e. "31/12/1999")',
	email: 'Per favor, introdueix una adreça de correu electronic valida. Per exemple, "fred@domain.com".',
	url: 'Per favor introdueix una URL valida com http://www.example.com.',
	currencyDollar: 'Per favor introdueix una quantitat valida de €. Per exemple €100,00 .',
	oneRequired: 'Per favor introdueix alguna cosa per al menys una d´aquestes entrades.',
	errorPrefix: 'Error: ',
	warningPrefix: 'Avis: ',

	// Form.Validator.Extras
	noSpace: 'No poden haver espais en aquesta entrada.',
	reqChkByNode: 'No hi han elements seleccionats.',
	requiredChk: 'Aquest camp es obligatori.',
	reqChkByName: 'Per favor selecciona una {label}.',
	match: 'Aquest camp necessita coincidir amb el camp {matchName}',
	startDate: 'la data de inici',
	endDate: 'la data de fi',
	currentDate: 'la data actual',
	afterDate: 'La data deu ser igual o posterior a {label}.',
	beforeDate: 'La data deu ser igual o anterior a {label}.',
	startMonth: 'Per favor selecciona un mes d´orige',
	sameMonth: 'Aquestes dos dates deuen estar dins del mateix mes - deus canviar una o altra.'

});

/*
---

name: Locale.cs-CZ.Date

description: Date messages for Czech.

license: MIT-style license

authors:
  - Jan Černý chemiX
  - Christopher Zukowski

requires:
  - Locale

provides: [Locale.cs-CZ.Date]

...
*/
(function(){

// Czech language pluralization rules, see http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html
// one -> n is 1;            1
// few -> n in 2..4;         2-4
// other -> everything else  0, 5-999, 1.31, 2.31, 5.31...
var pluralize = function (n, one, few, other){
	if (n == 1) return one;
	else if (n == 2 || n == 3 || n == 4) return few;
	else return other;
};

Locale.define('cs-CZ', 'Date', {

	months: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
	months_abbr: ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'],
	days: ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
	days_abbr: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],

	// Culture's date order: DD.MM.YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d.%m.%Y',
	shortTime: '%H:%M',
	AM: 'dop.',
	PM: 'odp.',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '.',

	lessThanMinuteAgo: 'před chvílí',
	minuteAgo: 'přibližně před minutou',
	minutesAgo: function(delta){ return 'před {delta} ' + pluralize(delta, 'minutou', 'minutami', 'minutami'); },
	hourAgo: 'přibližně před hodinou',
	hoursAgo: function(delta){ return 'před {delta} ' + pluralize(delta, 'hodinou', 'hodinami', 'hodinami'); },
	dayAgo: 'před dnem',
	daysAgo: function(delta){ return 'před {delta} ' + pluralize(delta, 'dnem', 'dny', 'dny'); },
	weekAgo: 'před týdnem',
	weeksAgo: function(delta){ return 'před {delta} ' + pluralize(delta, 'týdnem', 'týdny', 'týdny'); },
	monthAgo: 'před měsícem',
	monthsAgo: function(delta){ return 'před {delta} ' + pluralize(delta, 'měsícem', 'měsíci', 'měsíci'); },
	yearAgo: 'před rokem',
	yearsAgo: function(delta){ return 'před {delta} ' + pluralize(delta, 'rokem', 'lety', 'lety'); },

	lessThanMinuteUntil: 'za chvíli',
	minuteUntil: 'přibližně za minutu',
	minutesUntil: function(delta){ return 'za {delta} ' + pluralize(delta, 'minutu', 'minuty', 'minut'); },
	hourUntil: 'přibližně za hodinu',
	hoursUntil: function(delta){ return 'za {delta} ' + pluralize(delta, 'hodinu', 'hodiny', 'hodin'); },
	dayUntil: 'za den',
	daysUntil: function(delta){ return 'za {delta} ' + pluralize(delta, 'den', 'dny', 'dnů'); },
	weekUntil: 'za týden',
	weeksUntil: function(delta){ return 'za {delta} ' + pluralize(delta, 'týden', 'týdny', 'týdnů'); },
	monthUntil: 'za měsíc',
	monthsUntil: function(delta){ return 'za {delta} ' + pluralize(delta, 'měsíc', 'měsíce', 'měsíců'); },
	yearUntil: 'za rok',
	yearsUntil: function(delta){ return 'za {delta} ' + pluralize(delta, 'rok', 'roky', 'let'); }
});

})();

/*
---

name: Locale.cs-CZ.Form.Validator

description: Form Validator messages for Czech.

license: MIT-style license

authors:
  - Jan Černý chemiX

requires:
  - Locale

provides: [Locale.cs-CZ.Form.Validator]

...
*/

Locale.define('cs-CZ', 'FormValidator', {

	required: 'Tato položka je povinná.',
	minLength: 'Zadejte prosím alespoň {minLength} znaků (napsáno {length} znaků).',
	maxLength: 'Zadejte prosím méně než {maxLength} znaků (nápsáno {length} znaků).',
	integer: 'Zadejte prosím celé číslo. Desetinná čísla (např. 1.25) nejsou povolena.',
	numeric: 'Zadejte jen číselné hodnoty (tj. "1" nebo "1.1" nebo "-1" nebo "-1.1").',
	digits: 'Zadejte prosím pouze čísla a interpunkční znaménka(například telefonní číslo s pomlčkami nebo tečkami je povoleno).',
	alpha: 'Zadejte prosím pouze písmena (a-z). Mezery nebo jiné znaky nejsou povoleny.',
	alphanum: 'Zadejte prosím pouze písmena (a-z) nebo číslice (0-9). Mezery nebo jiné znaky nejsou povoleny.',
	dateSuchAs: 'Zadejte prosím platné datum jako {date}',
	dateInFormatMDY: 'Zadejte prosím platné datum jako MM / DD / RRRR (tj. "12/31/1999")',
	email: 'Zadejte prosím platnou e-mailovou adresu. Například "fred@domain.com".',
	url: 'Zadejte prosím platnou URL adresu jako http://www.example.com.',
	currencyDollar: 'Zadejte prosím platnou částku. Například $100.00.',
	oneRequired: 'Zadejte prosím alespoň jednu hodnotu pro tyto položky.',
	errorPrefix: 'Chyba: ',
	warningPrefix: 'Upozornění: ',

	// Form.Validator.Extras
	noSpace: 'V této položce nejsou povoleny mezery',
	reqChkByNode: 'Nejsou vybrány žádné položky.',
	requiredChk: 'Tato položka je vyžadována.',
	reqChkByName: 'Prosím vyberte {label}.',
	match: 'Tato položka se musí shodovat s položkou {matchName}',
	startDate: 'datum zahájení',
	endDate: 'datum ukončení',
	currentDate: 'aktuální datum',
	afterDate: 'Datum by mělo být stejné nebo větší než {label}.',
	beforeDate: 'Datum by mělo být stejné nebo menší než {label}.',
	startMonth: 'Vyberte počáteční měsíc.',
	sameMonth: 'Tyto dva datumy musí být ve stejném měsíci - změňte jeden z nich.',
	creditcard: 'Zadané číslo kreditní karty je neplatné. Prosím opravte ho. Bylo zadáno {length} čísel.'

});

/*
---

name: Locale.da-DK.Date

description: Date messages for Danish.

license: MIT-style license

authors:
  - Martin Overgaard
  - Henrik Hansen

requires:
  - Locale

provides: [Locale.da-DK.Date]

...
*/

Locale.define('da-DK', 'Date', {

	months: ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
	months_abbr: ['jan.', 'feb.', 'mar.', 'apr.', 'maj.', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
	days: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
	days_abbr: ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'],

	// Culture's date order: DD-MM-YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d-%m-%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '.',

	lessThanMinuteAgo: 'mindre end et minut siden',
	minuteAgo: 'omkring et minut siden',
	minutesAgo: '{delta} minutter siden',
	hourAgo: 'omkring en time siden',
	hoursAgo: 'omkring {delta} timer siden',
	dayAgo: '1 dag siden',
	daysAgo: '{delta} dage siden',
	weekAgo: '1 uge siden',
	weeksAgo: '{delta} uger siden',
	monthAgo: '1 måned siden',
	monthsAgo: '{delta} måneder siden',
	yearAgo: '1 år siden',
	yearsAgo: '{delta} år siden',

	lessThanMinuteUntil: 'mindre end et minut fra nu',
	minuteUntil: 'omkring et minut fra nu',
	minutesUntil: '{delta} minutter fra nu',
	hourUntil: 'omkring en time fra nu',
	hoursUntil: 'omkring {delta} timer fra nu',
	dayUntil: '1 dag fra nu',
	daysUntil: '{delta} dage fra nu',
	weekUntil: '1 uge fra nu',
	weeksUntil: '{delta} uger fra nu',
	monthUntil: '1 måned fra nu',
	monthsUntil: '{delta} måneder fra nu',
	yearUntil: '1 år fra nu',
	yearsUntil: '{delta} år fra nu'

});

/*
---

name: Locale.da-DK.Form.Validator

description: Form Validator messages for Danish.

license: MIT-style license

authors:
  - Martin Overgaard

requires:
  - Locale

provides: [Locale.da-DK.Form.Validator]

...
*/

Locale.define('da-DK', 'FormValidator', {

	required: 'Feltet skal udfyldes.',
	minLength: 'Skriv mindst {minLength} tegn (du skrev {length} tegn).',
	maxLength: 'Skriv maksimalt {maxLength} tegn (du skrev {length} tegn).',
	integer: 'Skriv et tal i dette felt. Decimal tal (f.eks. 1.25) er ikke tilladt.',
	numeric: 'Skriv kun tal i dette felt (i.e. "1" eller "1.1" eller "-1" eller "-1.1").',
	digits: 'Skriv kun tal og tegnsætning i dette felt (eksempel, et telefon nummer med bindestreg eller punktum er tilladt).',
	alpha: 'Skriv kun bogstaver (a-z) i dette felt. Mellemrum og andre tegn er ikke tilladt.',
	alphanum: 'Skriv kun bogstaver (a-z) eller tal (0-9) i dette felt. Mellemrum og andre tegn er ikke tilladt.',
	dateSuchAs: 'Skriv en gyldig dato som {date}',
	dateInFormatMDY: 'Skriv dato i formatet DD-MM-YYYY (f.eks. "31-12-1999")',
	email: 'Skriv en gyldig e-mail adresse. F.eks "fred@domain.com".',
	url: 'Skriv en gyldig URL adresse. F.eks "http://www.example.com".',
	currencyDollar: 'Skriv et gldigt beløb. F.eks Kr.100.00 .',
	oneRequired: 'Et eller flere af felterne i denne formular skal udfyldes.',
	errorPrefix: 'Fejl: ',
	warningPrefix: 'Advarsel: ',

	// Form.Validator.Extras
	noSpace: 'Der må ikke benyttes mellemrum i dette felt.',
	reqChkByNode: 'Foretag et valg.',
	requiredChk: 'Dette felt skal udfyldes.',
	reqChkByName: 'Vælg en {label}.',
	match: 'Dette felt skal matche {matchName} feltet',
	startDate: 'start dato',
	endDate: 'slut dato',
	currentDate: 'dags dato',
	afterDate: 'Datoen skal være større end eller lig med {label}.',
	beforeDate: 'Datoen skal være mindre end eller lig med {label}.',
	startMonth: 'Vælg en start måned',
	sameMonth: 'De valgte datoer skal være i samme måned - skift en af dem.'

});

/*
---

name: Locale.de-DE.Date

description: Date messages for German.

license: MIT-style license

authors:
  - Christoph Pojer
  - Frank Rossi
  - Ulrich Petri
  - Fabian Beiner

requires:
  - Locale

provides: [Locale.de-DE.Date]

...
*/

Locale.define('de-DE', 'Date', {

	months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
	months_abbr: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
	days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
	days_abbr: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],

	// Culture's date order: DD.MM.YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d.%m.%Y',
	shortTime: '%H:%M',
	AM: 'vormittags',
	PM: 'nachmittags',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '.',

	lessThanMinuteAgo: 'vor weniger als einer Minute',
	minuteAgo: 'vor einer Minute',
	minutesAgo: 'vor {delta} Minuten',
	hourAgo: 'vor einer Stunde',
	hoursAgo: 'vor {delta} Stunden',
	dayAgo: 'vor einem Tag',
	daysAgo: 'vor {delta} Tagen',
	weekAgo: 'vor einer Woche',
	weeksAgo: 'vor {delta} Wochen',
	monthAgo: 'vor einem Monat',
	monthsAgo: 'vor {delta} Monaten',
	yearAgo: 'vor einem Jahr',
	yearsAgo: 'vor {delta} Jahren',

	lessThanMinuteUntil: 'in weniger als einer Minute',
	minuteUntil: 'in einer Minute',
	minutesUntil: 'in {delta} Minuten',
	hourUntil: 'in ca. einer Stunde',
	hoursUntil: 'in ca. {delta} Stunden',
	dayUntil: 'in einem Tag',
	daysUntil: 'in {delta} Tagen',
	weekUntil: 'in einer Woche',
	weeksUntil: 'in {delta} Wochen',
	monthUntil: 'in einem Monat',
	monthsUntil: 'in {delta} Monaten',
	yearUntil: 'in einem Jahr',
	yearsUntil: 'in {delta} Jahren'

});

/*
---

name: Locale.de-CH.Date

description: Date messages for German (Switzerland).

license: MIT-style license

authors:
  - Michael van der Weg

requires:
  - Locale
  - Locale.de-DE.Date

provides: [Locale.de-CH.Date]

...
*/

Locale.define('de-CH').inherit('de-DE', 'Date');

/*
---

name: Locale.de-CH.Form.Validator

description: Form Validator messages for German (Switzerland).

license: MIT-style license

authors:
  - Michael van der Weg

requires:
  - Locale

provides: [Locale.de-CH.Form.Validator]

...
*/

Locale.define('de-CH', 'FormValidator', {

	required: 'Dieses Feld ist obligatorisch.',
	minLength: 'Geben Sie bitte mindestens {minLength} Zeichen ein (Sie haben {length} Zeichen eingegeben).',
	maxLength: 'Bitte geben Sie nicht mehr als {maxLength} Zeichen ein (Sie haben {length} Zeichen eingegeben).',
	integer: 'Geben Sie bitte eine ganze Zahl ein. Dezimalzahlen (z.B. 1.25) sind nicht erlaubt.',
	numeric: 'Geben Sie bitte nur Zahlenwerte in dieses Eingabefeld ein (z.B. &quot;1&quot;, &quot;1.1&quot;, &quot;-1&quot; oder &quot;-1.1&quot;).',
	digits: 'Benutzen Sie bitte nur Zahlen und Satzzeichen in diesem Eingabefeld (erlaubt ist z.B. eine Telefonnummer mit Bindestrichen und Punkten).',
	alpha: 'Benutzen Sie bitte nur Buchstaben (a-z) in diesem Feld. Leerzeichen und andere Zeichen sind nicht erlaubt.',
	alphanum: 'Benutzen Sie bitte nur Buchstaben (a-z) und Zahlen (0-9) in diesem Eingabefeld. Leerzeichen und andere Zeichen sind nicht erlaubt.',
	dateSuchAs: 'Geben Sie bitte ein g&uuml;ltiges Datum ein. Wie zum Beispiel {date}',
	dateInFormatMDY: 'Geben Sie bitte ein g&uuml;ltiges Datum ein. Wie zum Beispiel TT.MM.JJJJ (z.B. &quot;31.12.1999&quot;)',
	email: 'Geben Sie bitte eine g&uuml;ltige E-Mail Adresse ein. Wie zum Beispiel &quot;maria@bernasconi.ch&quot;.',
	url: 'Geben Sie bitte eine g&uuml;ltige URL ein. Wie zum Beispiel http://www.example.com.',
	currencyDollar: 'Geben Sie bitte einen g&uuml;ltigen Betrag in Schweizer Franken ein. Wie zum Beispiel 100.00 CHF .',
	oneRequired: 'Machen Sie f&uuml;r mindestens eines der Eingabefelder einen Eintrag.',
	errorPrefix: 'Fehler: ',
	warningPrefix: 'Warnung: ',

	// Form.Validator.Extras
	noSpace: 'In diesem Eingabefeld darf kein Leerzeichen sein.',
	reqChkByNode: 'Es wurden keine Elemente gew&auml;hlt.',
	requiredChk: 'Dieses Feld ist obligatorisch.',
	reqChkByName: 'Bitte w&auml;hlen Sie ein {label}.',
	match: 'Dieses Eingabefeld muss mit dem Feld {matchName} &uuml;bereinstimmen.',
	startDate: 'Das Anfangsdatum',
	endDate: 'Das Enddatum',
	currentDate: 'Das aktuelle Datum',
	afterDate: 'Das Datum sollte zur gleichen Zeit oder sp&auml;ter sein {label}.',
	beforeDate: 'Das Datum sollte zur gleichen Zeit oder fr&uuml;her sein {label}.',
	startMonth: 'W&auml;hlen Sie bitte einen Anfangsmonat',
	sameMonth: 'Diese zwei Datumsangaben m&uuml;ssen im selben Monat sein - Sie m&uuml;ssen eine von beiden ver&auml;ndern.',
	creditcard: 'Die eingegebene Kreditkartennummer ist ung&uuml;ltig. Bitte &uuml;berpr&uuml;fen Sie diese und versuchen Sie es erneut. {length} Zahlen eingegeben.'

});

/*
---

name: Locale.de-DE.Form.Validator

description: Form Validator messages for German.

license: MIT-style license

authors:
  - Frank Rossi
  - Ulrich Petri
  - Fabian Beiner

requires:
  - Locale

provides: [Locale.de-DE.Form.Validator]

...
*/

Locale.define('de-DE', 'FormValidator', {

	required: 'Dieses Eingabefeld muss ausgefüllt werden.',
	minLength: 'Geben Sie bitte mindestens {minLength} Zeichen ein (Sie haben nur {length} Zeichen eingegeben).',
	maxLength: 'Geben Sie bitte nicht mehr als {maxLength} Zeichen ein (Sie haben {length} Zeichen eingegeben).',
	integer: 'Geben Sie in diesem Eingabefeld bitte eine ganze Zahl ein. Dezimalzahlen (z.B. "1.25") sind nicht erlaubt.',
	numeric: 'Geben Sie in diesem Eingabefeld bitte nur Zahlenwerte (z.B. "1", "1.1", "-1" oder "-1.1") ein.',
	digits: 'Geben Sie in diesem Eingabefeld bitte nur Zahlen und Satzzeichen ein (z.B. eine Telefonnummer mit Bindestrichen und Punkten ist erlaubt).',
	alpha: 'Geben Sie in diesem Eingabefeld bitte nur Buchstaben (a-z) ein. Leerzeichen und andere Zeichen sind nicht erlaubt.',
	alphanum: 'Geben Sie in diesem Eingabefeld bitte nur Buchstaben (a-z) und Zahlen (0-9) ein. Leerzeichen oder andere Zeichen sind nicht erlaubt.',
	dateSuchAs: 'Geben Sie bitte ein gültiges Datum ein (z.B. "{date}").',
	dateInFormatMDY: 'Geben Sie bitte ein gültiges Datum im Format TT.MM.JJJJ ein (z.B. "31.12.1999").',
	email: 'Geben Sie bitte eine gültige E-Mail-Adresse ein (z.B. "max@mustermann.de").',
	url: 'Geben Sie bitte eine gültige URL ein (z.B. "http://www.example.com").',
	currencyDollar: 'Geben Sie bitte einen gültigen Betrag in EURO ein (z.B. 100.00€).',
	oneRequired: 'Bitte füllen Sie mindestens ein Eingabefeld aus.',
	errorPrefix: 'Fehler: ',
	warningPrefix: 'Warnung: ',

	// Form.Validator.Extras
	noSpace: 'Es darf kein Leerzeichen in diesem Eingabefeld sein.',
	reqChkByNode: 'Es wurden keine Elemente gewählt.',
	requiredChk: 'Dieses Feld muss ausgefüllt werden.',
	reqChkByName: 'Bitte wählen Sie ein {label}.',
	match: 'Dieses Eingabefeld muss mit dem {matchName} Eingabefeld übereinstimmen.',
	startDate: 'Das Anfangsdatum',
	endDate: 'Das Enddatum',
	currentDate: 'Das aktuelle Datum',
	afterDate: 'Das Datum sollte zur gleichen Zeit oder später sein als {label}.',
	beforeDate: 'Das Datum sollte zur gleichen Zeit oder früher sein als {label}.',
	startMonth: 'Wählen Sie bitte einen Anfangsmonat',
	sameMonth: 'Diese zwei Datumsangaben müssen im selben Monat sein - Sie müssen eines von beiden verändern.',
	creditcard: 'Die eingegebene Kreditkartennummer ist ungültig. Bitte überprüfen Sie diese und versuchen Sie es erneut. {length} Zahlen eingegeben.'

});

/*
---

name: Locale.de-DE.Number

description: Number messages for German.

license: MIT-style license

authors:
  - Christoph Pojer

requires:
  - Locale
  - Locale.EU.Number

provides: [Locale.de-DE.Number]

...
*/

Locale.define('de-DE').inherit('EU', 'Number');

/*
---

name: Locale.el-GR.Date

description: Date messages for Greek language.

license: MIT-style license

authors:
  - Periklis Argiriadis

requires:
  - Locale

provides: [Locale.el-GR.Date]

...
*/

Locale.define('el-GR', 'Date', {

	months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
	months_abbr: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μάι', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'],
	days: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
	days_abbr: ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'],

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%I:%M%p',
	AM: 'πμ',
	PM: 'μμ',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: function(dayOfMonth){
		// 1st, 2nd, 3rd, etc.
		return (dayOfMonth > 3 && dayOfMonth < 21) ? 'ος' : ['ος'][Math.min(dayOfMonth % 10, 4)];
	},

	lessThanMinuteAgo: 'λιγότερο από ένα λεπτό πριν',
	minuteAgo: 'περίπου ένα λεπτό πριν',
	minutesAgo: '{delta} λεπτά πριν',
	hourAgo: 'περίπου μια ώρα πριν',
	hoursAgo: 'περίπου {delta} ώρες πριν',
	dayAgo: '1 ημέρα πριν',
	daysAgo: '{delta} ημέρες πριν',
	weekAgo: '1 εβδομάδα πριν',
	weeksAgo: '{delta} εβδομάδες πριν',
	monthAgo: '1 μήνα πριν',
	monthsAgo: '{delta} μήνες πριν',
	yearAgo: '1 χρόνο πριν',
	yearsAgo: '{delta} χρόνια πριν',

	lessThanMinuteUntil: 'λιγότερο από λεπτό από τώρα',
	minuteUntil: 'περίπου ένα λεπτό από τώρα',
	minutesUntil: '{delta} λεπτά από τώρα',
	hourUntil: 'περίπου μια ώρα από τώρα',
	hoursUntil: 'περίπου {delta} ώρες από τώρα',
	dayUntil: '1 ημέρα από τώρα',
	daysUntil: '{delta} ημέρες από τώρα',
	weekUntil: '1 εβδομάδα από τώρα',
	weeksUntil: '{delta} εβδομάδες από τώρα',
	monthUntil: '1 μήνας από τώρα',
	monthsUntil: '{delta} μήνες από τώρα',
	yearUntil: '1 χρόνος από τώρα',
	yearsUntil: '{delta} χρόνια από τώρα'

});

/*
---

name: Locale.el-GR.Form.Validator

description: Form Validator messages for Greek language.

license: MIT-style license

authors:
  - Dimitris Tsironis

requires:
  - Locale

provides: [Locale.el-GR.Form.Validator]

...
*/

Locale.define('el-GR', 'FormValidator', {

    required: 'Αυτό το πεδίο είναι απαραίτητο.',
    length: 'Παρακαλούμε, εισάγετε {length} χαρακτήρες (έχετε ήδη εισάγει {elLength} χαρακτήρες).',
    minLength: 'Παρακαλούμε, εισάγετε τουλάχιστον {minLength} χαρακτήρες (έχετε ήδη εισάγε {length} χαρακτήρες).',
    maxlength: 'Παρακαλούμε, εισάγετε εώς {maxlength} χαρακτήρες (έχετε ήδη εισάγε {length} χαρακτήρες).',
    integer: 'Παρακαλούμε, εισάγετε έναν ακέραιο αριθμό σε αυτό το πεδίο. Οι αριθμοί με δεκαδικά ψηφία (π.χ. 1.25) δεν επιτρέπονται.',
    numeric: 'Παρακαλούμε, εισάγετε μόνο αριθμητικές τιμές σε αυτό το πεδίο (π.χ." 1 " ή " 1.1 " ή " -1 " ή " -1.1 " ).',
    digits: 'Παρακαλούμε, χρησιμοποιήστε μόνο αριθμούς και σημεία στίξης σε αυτόν τον τομέα (π.χ. επιτρέπεται αριθμός τηλεφώνου με παύλες ή τελείες).',
    alpha: 'Παρακαλούμε, χρησιμοποιήστε μόνο γράμματα (a-z) σε αυτό το πεδίο. Δεν επιτρέπονται κενά ή άλλοι χαρακτήρες.',
    alphanum: 'Παρακαλούμε, χρησιμοποιήστε μόνο γράμματα (a-z) ή αριθμούς (0-9) σε αυτόν τον τομέα. Δεν επιτρέπονται κενά ή άλλοι χαρακτήρες.',
    dateSuchAs: 'Παρακαλούμε, εισάγετε μια έγκυρη ημερομηνία, όπως {date}',
    dateInFormatMDY: 'Παρακαλώ εισάγετε μια έγκυρη ημερομηνία, όπως ΜΜ/ΗΗ/ΕΕΕΕ (π.χ. "12/31/1999").',
    email: 'Παρακαλούμε, εισάγετε μια έγκυρη διεύθυνση ηλεκτρονικού ταχυδρομείου (π.χ. "fred@domain.com").',
    url: 'Παρακαλούμε, εισάγετε μια έγκυρη URL διεύθυνση, όπως http://www.example.com',
    currencyDollar: 'Παρακαλούμε, εισάγετε ένα έγκυρο ποσό σε δολλάρια (π.χ. $100.00).',
    oneRequired: 'Παρακαλούμε, εισάγετε κάτι για τουλάχιστον ένα από αυτά τα πεδία.',
    errorPrefix: 'Σφάλμα: ',
    warningPrefix: 'Προσοχή: ',

    // Form.Validator.Extras
    noSpace: 'Δεν επιτρέπονται τα κενά σε αυτό το πεδίο.',
    reqChkByNode: 'Δεν έχει επιλεγεί κάποιο αντικείμενο',
    requiredChk: 'Αυτό το πεδίο είναι απαραίτητο.',
    reqChkByName: 'Παρακαλούμε, επιλέξτε μια ετικέτα {label}.',
    match: 'Αυτό το πεδίο πρέπει να ταιριάζει με το πεδίο {matchName}.',
    startDate: 'η ημερομηνία έναρξης',
    endDate: 'η ημερομηνία λήξης',
    currentDate: 'η τρέχουσα ημερομηνία',
    afterDate: 'Η ημερομηνία πρέπει να είναι η ίδια ή μετά από την {label}.',
    beforeDate: 'Η ημερομηνία πρέπει να είναι η ίδια ή πριν από την {label}.',
    startMonth: 'Παρακαλώ επιλέξτε ένα μήνα αρχής.',
    sameMonth: 'Αυτές οι δύο ημερομηνίες πρέπει να έχουν τον ίδιο μήνα - θα πρέπει να αλλάξετε ή το ένα ή το άλλο',
    creditcard: 'Ο αριθμός της πιστωτικής κάρτας δεν είναι έγκυρος. Παρακαλούμε ελέγξτε τον αριθμό και δοκιμάστε ξανά. {length} μήκος ψηφίων.'

});

/*
---

name: Locale.en-GB.Date

description: Date messages for British English.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Locale
  - Locale.en-US.Date

provides: [Locale.en-GB.Date]

...
*/

Locale.define('en-GB', 'Date', {

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M'

}).inherit('en-US', 'Date');

/*
---

name: Locale.en-US.Number

description: Number messages for US English.

license: MIT-style license

authors:
  - Arian Stolwijk

requires:
  - Locale

provides: [Locale.en-US.Number]

...
*/

Locale.define('en-US', 'Number', {

	decimal: '.',
	group: ',',

/* 	Commented properties are the defaults for Number.format
	decimals: 0,
	precision: 0,
	scientific: null,

	prefix: null,
	suffic: null,

	// Negative/Currency/percentage will mixin Number
	negative: {
		prefix: '-'
	},*/

	currency: {
//		decimals: 2,
		prefix: '$ '
	}/*,

	percentage: {
		decimals: 2,
		suffix: '%'
	}*/

});



/*
---

name: Locale.es-ES.Date

description: Date messages for Spanish.

license: MIT-style license

authors:
  - Ãlfons Sanchez

requires:
  - Locale

provides: [Locale.es-ES.Date]

...
*/

Locale.define('es-ES', 'Date', {

	months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	months_abbr: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
	days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
	days_abbr: ['dom', 'lun', 'mar', 'mié', 'juv', 'vie', 'sáb'],

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: 'hace menos de un minuto',
	minuteAgo: 'hace un minuto',
	minutesAgo: 'hace {delta} minutos',
	hourAgo: 'hace una hora',
	hoursAgo: 'hace unas {delta} horas',
	dayAgo: 'hace un día',
	daysAgo: 'hace {delta} días',
	weekAgo: 'hace una semana',
	weeksAgo: 'hace unas {delta} semanas',
	monthAgo: 'hace un mes',
	monthsAgo: 'hace {delta} meses',
	yearAgo: 'hace un año',
	yearsAgo: 'hace {delta} años',

	lessThanMinuteUntil: 'menos de un minuto desde ahora',
	minuteUntil: 'un minuto desde ahora',
	minutesUntil: '{delta} minutos desde ahora',
	hourUntil: 'una hora desde ahora',
	hoursUntil: 'unas {delta} horas desde ahora',
	dayUntil: 'un día desde ahora',
	daysUntil: '{delta} días desde ahora',
	weekUntil: 'una semana desde ahora',
	weeksUntil: 'unas {delta} semanas desde ahora',
	monthUntil: 'un mes desde ahora',
	monthsUntil: '{delta} meses desde ahora',
	yearUntil: 'un año desde ahora',
	yearsUntil: '{delta} años desde ahora'

});

/*
---

name: Locale.es-AR.Date

description: Date messages for Spanish (Argentina).

license: MIT-style license

authors:
  - Ãlfons Sanchez
  - Diego Massanti

requires:
  - Locale
  - Locale.es-ES.Date

provides: [Locale.es-AR.Date]

...
*/

Locale.define('es-AR').inherit('es-ES', 'Date');

/*
---

name: Locale.es-AR.Form.Validator

description: Form Validator messages for Spanish (Argentina).

license: MIT-style license

authors:
  - Diego Massanti

requires:
  - Locale

provides: [Locale.es-AR.Form.Validator]

...
*/

Locale.define('es-AR', 'FormValidator', {

	required: 'Este campo es obligatorio.',
	minLength: 'Por favor ingrese al menos {minLength} caracteres (ha ingresado {length} caracteres).',
	maxLength: 'Por favor no ingrese más de {maxLength} caracteres (ha ingresado {length} caracteres).',
	integer: 'Por favor ingrese un número entero en este campo. Números con decimales (p.e. 1,25) no se permiten.',
	numeric: 'Por favor ingrese solo valores numéricos en este campo (p.e. "1" o "1,1" o "-1" o "-1,1").',
	digits: 'Por favor use sólo números y puntuación en este campo (por ejemplo, un número de teléfono con guiones y/o puntos no está permitido).',
	alpha: 'Por favor use sólo letras (a-z) en este campo. No se permiten espacios ni otros caracteres.',
	alphanum: 'Por favor, usa sólo letras (a-z) o números (0-9) en este campo. No se permiten espacios u otros caracteres.',
	dateSuchAs: 'Por favor ingrese una fecha válida como {date}',
	dateInFormatMDY: 'Por favor ingrese una fecha válida, utulizando el formato DD/MM/YYYY (p.e. "31/12/1999")',
	email: 'Por favor, ingrese una dirección de e-mail válida. Por ejemplo, "fred@dominio.com".',
	url: 'Por favor ingrese una URL válida como http://www.example.com.',
	currencyDollar: 'Por favor ingrese una cantidad válida de pesos. Por ejemplo $100,00 .',
	oneRequired: 'Por favor ingrese algo para por lo menos una de estas entradas.',
	errorPrefix: 'Error: ',
	warningPrefix: 'Advertencia: ',

	// Form.Validator.Extras
	noSpace: 'No se permiten espacios en este campo.',
	reqChkByNode: 'No hay elementos seleccionados.',
	requiredChk: 'Este campo es obligatorio.',
	reqChkByName: 'Por favor selecciona una {label}.',
	match: 'Este campo necesita coincidir con el campo {matchName}',
	startDate: 'la fecha de inicio',
	endDate: 'la fecha de fin',
	currentDate: 'la fecha actual',
	afterDate: 'La fecha debe ser igual o posterior a {label}.',
	beforeDate: 'La fecha debe ser igual o anterior a {label}.',
	startMonth: 'Por favor selecciona un mes de origen',
	sameMonth: 'Estas dos fechas deben estar en el mismo mes - debes cambiar una u otra.'

});

/*
---

name: Locale.es-ES.Form.Validator

description: Form Validator messages for Spanish.

license: MIT-style license

authors:
  - Ãlfons Sanchez

requires:
  - Locale

provides: [Locale.es-ES.Form.Validator]

...
*/

Locale.define('es-ES', 'FormValidator', {

	required: 'Este campo es obligatorio.',
	minLength: 'Por favor introduce al menos {minLength} caracteres (has introducido {length} caracteres).',
	maxLength: 'Por favor introduce no m&aacute;s de {maxLength} caracteres (has introducido {length} caracteres).',
	integer: 'Por favor introduce un n&uacute;mero entero en este campo. N&uacute;meros con decimales (p.e. 1,25) no se permiten.',
	numeric: 'Por favor introduce solo valores num&eacute;ricos en este campo (p.e. "1" o "1,1" o "-1" o "-1,1").',
	digits: 'Por favor usa solo n&uacute;meros y puntuaci&oacute;n en este campo (por ejemplo, un n&uacute;mero de tel&eacute;fono con guiones y puntos no esta permitido).',
	alpha: 'Por favor usa letras solo (a-z) en este campo. No se admiten espacios ni otros caracteres.',
	alphanum: 'Por favor, usa solo letras (a-z) o n&uacute;meros (0-9) en este campo. No se admiten espacios ni otros caracteres.',
	dateSuchAs: 'Por favor introduce una fecha v&aacute;lida como {date}',
	dateInFormatMDY: 'Por favor introduce una fecha v&aacute;lida como DD/MM/YYYY (p.e. "31/12/1999")',
	email: 'Por favor, introduce una direcci&oacute;n de email v&aacute;lida. Por ejemplo, "fred@domain.com".',
	url: 'Por favor introduce una URL v&aacute;lida como http://www.example.com.',
	currencyDollar: 'Por favor introduce una cantidad v&aacute;lida de €. Por ejemplo €100,00 .',
	oneRequired: 'Por favor introduce algo para por lo menos una de estas entradas.',
	errorPrefix: 'Error: ',
	warningPrefix: 'Aviso: ',

	// Form.Validator.Extras
	noSpace: 'No pueden haber espacios en esta entrada.',
	reqChkByNode: 'No hay elementos seleccionados.',
	requiredChk: 'Este campo es obligatorio.',
	reqChkByName: 'Por favor selecciona una {label}.',
	match: 'Este campo necesita coincidir con el campo {matchName}',
	startDate: 'la fecha de inicio',
	endDate: 'la fecha de fin',
	currentDate: 'la fecha actual',
	afterDate: 'La fecha debe ser igual o posterior a {label}.',
	beforeDate: 'La fecha debe ser igual o anterior a {label}.',
	startMonth: 'Por favor selecciona un mes de origen',
	sameMonth: 'Estas dos fechas deben estar en el mismo mes - debes cambiar una u otra.'

});

/*
---

name: Locale.es-VE.Date

description: Date messages for Spanish (Venezuela).

license: MIT-style license

authors:
  - Daniel Barreto

requires:
  - Locale
  - Locale.es-ES.Date

provides: [Locale.es-VE.Date]

...
*/

Locale.define('es-VE').inherit('es-ES', 'Date');

/*
---

name: Locale.es-VE.Form.Validator

description: Form Validator messages for Spanish (Venezuela).

license: MIT-style license

authors:
  - Daniel Barreto

requires:
  - Locale
  - Locale.es-ES.Form.Validator

provides: [Locale.es-VE.Form.Validator]

...
*/

Locale.define('es-VE', 'FormValidator', {

	digits: 'Por favor usa solo n&uacute;meros y puntuaci&oacute;n en este campo. Por ejemplo, un n&uacute;mero de tel&eacute;fono con guiones y puntos no esta permitido.',
	alpha: 'Por favor usa solo letras (a-z) en este campo. No se admiten espacios ni otros caracteres.',
	currencyDollar: 'Por favor introduce una cantidad v&aacute;lida de Bs. Por ejemplo Bs. 100,00 .',
	oneRequired: 'Por favor introduce un valor para por lo menos una de estas entradas.',

	// Form.Validator.Extras
	startDate: 'La fecha de inicio',
	endDate: 'La fecha de fin',
	currentDate: 'La fecha actual'

}).inherit('es-ES', 'FormValidator');

/*
---

name: Locale.es-VE.Number

description: Number messages for Spanish (Venezuela).

license: MIT-style license

authors:
  - Daniel Barreto

requires:
  - Locale

provides: [Locale.es-VE.Number]

...
*/

Locale.define('es-VE', 'Number', {

	decimal: ',',
	group: '.',
/*
	decimals: 0,
	precision: 0,
*/
	// Negative/Currency/percentage will mixin Number
	negative: {
		prefix: '-'
	},

	currency: {
		decimals: 2,
		prefix: 'Bs. '
	},

	percentage: {
		decimals: 2,
		suffix: '%'
	}

});

/*
---

name: Locale.et-EE.Date

description: Date messages for Estonian.

license: MIT-style license

authors:
  - Kevin Valdek

requires:
  - Locale

provides: [Locale.et-EE.Date]

...
*/

Locale.define('et-EE', 'Date', {

	months: ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'],
	months_abbr: ['jaan', 'veebr', 'märts', 'apr', 'mai', 'juuni', 'juuli', 'aug', 'sept', 'okt', 'nov', 'dets'],
	days: ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev'],
	days_abbr: ['pühap', 'esmasp', 'teisip', 'kolmap', 'neljap', 'reede', 'laup'],

	// Culture's date order: MM.DD.YYYY
	dateOrder: ['month', 'date', 'year'],
	shortDate: '%m.%d.%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: 'vähem kui minut aega tagasi',
	minuteAgo: 'umbes minut aega tagasi',
	minutesAgo: '{delta} minutit tagasi',
	hourAgo: 'umbes tund aega tagasi',
	hoursAgo: 'umbes {delta} tundi tagasi',
	dayAgo: '1 päev tagasi',
	daysAgo: '{delta} päeva tagasi',
	weekAgo: '1 nädal tagasi',
	weeksAgo: '{delta} nädalat tagasi',
	monthAgo: '1 kuu tagasi',
	monthsAgo: '{delta} kuud tagasi',
	yearAgo: '1 aasta tagasi',
	yearsAgo: '{delta} aastat tagasi',

	lessThanMinuteUntil: 'vähem kui minuti aja pärast',
	minuteUntil: 'umbes minuti aja pärast',
	minutesUntil: '{delta} minuti pärast',
	hourUntil: 'umbes tunni aja pärast',
	hoursUntil: 'umbes {delta} tunni pärast',
	dayUntil: '1 päeva pärast',
	daysUntil: '{delta} päeva pärast',
	weekUntil: '1 nädala pärast',
	weeksUntil: '{delta} nädala pärast',
	monthUntil: '1 kuu pärast',
	monthsUntil: '{delta} kuu pärast',
	yearUntil: '1 aasta pärast',
	yearsUntil: '{delta} aasta pärast'

});

/*
---

name: Locale.et-EE.Form.Validator

description: Form Validator messages for Estonian.

license: MIT-style license

authors:
  - Kevin Valdek

requires:
  - Locale

provides: [Locale.et-EE.Form.Validator]

...
*/

Locale.define('et-EE', 'FormValidator', {

	required: 'Väli peab olema täidetud.',
	minLength: 'Palun sisestage vähemalt {minLength} tähte (te sisestasite {length} tähte).',
	maxLength: 'Palun ärge sisestage rohkem kui {maxLength} tähte (te sisestasite {length} tähte).',
	integer: 'Palun sisestage väljale täisarv. Kümnendarvud (näiteks 1.25) ei ole lubatud.',
	numeric: 'Palun sisestage ainult numbreid väljale (näiteks "1", "1.1", "-1" või "-1.1").',
	digits: 'Palun kasutage ainult numbreid ja kirjavahemärke (telefoninumbri sisestamisel on lubatud kasutada kriipse ja punkte).',
	alpha: 'Palun kasutage ainult tähti (a-z). Tühikud ja teised sümbolid on keelatud.',
	alphanum: 'Palun kasutage ainult tähti (a-z) või numbreid (0-9). Tühikud ja teised sümbolid on keelatud.',
	dateSuchAs: 'Palun sisestage kehtiv kuupäev kujul {date}',
	dateInFormatMDY: 'Palun sisestage kehtiv kuupäev kujul MM.DD.YYYY (näiteks: "12.31.1999").',
	email: 'Palun sisestage kehtiv e-maili aadress (näiteks: "fred@domain.com").',
	url: 'Palun sisestage kehtiv URL (näiteks: http://www.example.com).',
	currencyDollar: 'Palun sisestage kehtiv $ summa (näiteks: $100.00).',
	oneRequired: 'Palun sisestage midagi vähemalt ühele antud väljadest.',
	errorPrefix: 'Viga: ',
	warningPrefix: 'Hoiatus: ',

	// Form.Validator.Extras
	noSpace: 'Väli ei tohi sisaldada tühikuid.',
	reqChkByNode: 'Ükski väljadest pole valitud.',
	requiredChk: 'Välja täitmine on vajalik.',
	reqChkByName: 'Palun valige üks {label}.',
	match: 'Väli peab sobima {matchName} väljaga',
	startDate: 'algkuupäev',
	endDate: 'lõppkuupäev',
	currentDate: 'praegune kuupäev',
	afterDate: 'Kuupäev peab olema võrdne või pärast {label}.',
	beforeDate: 'Kuupäev peab olema võrdne või enne {label}.',
	startMonth: 'Palun valige algkuupäev.',
	sameMonth: 'Antud kaks kuupäeva peavad olema samas kuus - peate muutma ühte kuupäeva.'

});

/*
---

name: Locale.fa.Date

description: Date messages for Persian.

license: MIT-style license

authors:
  - Amir Hossein Hodjaty Pour

requires:
  - Locale

provides: [Locale.fa.Date]

...
*/

Locale.define('fa', 'Date', {

	months: ['ژانویه', 'فوریه', 'مارس', 'آپریل', 'مه', 'ژوئن', 'ژوئیه', 'آگوست', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
	months_abbr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	days: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'],
	days_abbr: ['ي', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],

	// Culture's date order: MM/DD/YYYY
	dateOrder: ['month', 'date', 'year'],
	shortDate: '%m/%d/%Y',
	shortTime: '%I:%M%p',
	AM: 'ق.ظ',
	PM: 'ب.ظ',

	// Date.Extras
	ordinal: 'ام',

	lessThanMinuteAgo: 'کمتر از یک دقیقه پیش',
	minuteAgo: 'حدود یک دقیقه پیش',
	minutesAgo: '{delta} دقیقه پیش',
	hourAgo: 'حدود یک ساعت پیش',
	hoursAgo: 'حدود {delta} ساعت پیش',
	dayAgo: '1 روز پیش',
	daysAgo: '{delta} روز پیش',
	weekAgo: '1 هفته پیش',
	weeksAgo: '{delta} هفته پیش',
	monthAgo: '1 ماه پیش',
	monthsAgo: '{delta} ماه پیش',
	yearAgo: '1 سال پیش',
	yearsAgo: '{delta} سال پیش',

	lessThanMinuteUntil: 'کمتر از یک دقیقه از حالا',
	minuteUntil: 'حدود یک دقیقه از حالا',
	minutesUntil: '{delta} دقیقه از حالا',
	hourUntil: 'حدود یک ساعت از حالا',
	hoursUntil: 'حدود {delta} ساعت از حالا',
	dayUntil: '1 روز از حالا',
	daysUntil: '{delta} روز از حالا',
	weekUntil: '1 هفته از حالا',
	weeksUntil: '{delta} هفته از حالا',
	monthUntil: '1 ماه از حالا',
	monthsUntil: '{delta} ماه از حالا',
	yearUntil: '1 سال از حالا',
	yearsUntil: '{delta} سال از حالا'

});

/*
---

name: Locale.fa.Form.Validator

description: Form Validator messages for Persian.

license: MIT-style license

authors:
  - Amir Hossein Hodjaty Pour

requires:
  - Locale

provides: [Locale.fa.Form.Validator]

...
*/

Locale.define('fa', 'FormValidator', {

	required: 'این فیلد الزامی است.',
	minLength: 'شما باید حداقل {minLength} حرف وارد کنید ({length} حرف وارد کرده اید).',
	maxLength: 'لطفا حداکثر {maxLength} حرف وارد کنید (شما {length} حرف وارد کرده اید).',
	integer: 'لطفا از عدد صحیح استفاده کنید. اعداد اعشاری (مانند 1.25) مجاز نیستند.',
	numeric: 'لطفا فقط داده عددی وارد کنید (مانند "1" یا "1.1" یا "1-" یا "1.1-").',
	digits: 'لطفا فقط از اعداد و علامتها در این فیلد استفاده کنید (برای مثال شماره تلفن با خط تیره و نقطه قابل قبول است).',
	alpha: 'لطفا فقط از حروف الفباء برای این بخش استفاده کنید. کاراکترهای دیگر و فاصله مجاز نیستند.',
	alphanum: 'لطفا فقط از حروف الفباء و اعداد در این بخش استفاده کنید. کاراکترهای دیگر و فاصله مجاز نیستند.',
	dateSuchAs: 'لطفا یک تاریخ معتبر مانند {date} وارد کنید.',
	dateInFormatMDY: 'لطفا یک تاریخ معتبر به شکل MM/DD/YYYY وارد کنید (مانند "12/31/1999").',
	email: 'لطفا یک آدرس ایمیل معتبر وارد کنید. برای مثال "fred@domain.com".',
	url: 'لطفا یک URL معتبر مانند http://www.example.com وارد کنید.',
	currencyDollar: 'لطفا یک محدوده معتبر برای این بخش وارد کنید مانند 100.00$ .',
	oneRequired: 'لطفا حداقل یکی از فیلدها را پر کنید.',
	errorPrefix: 'خطا: ',
	warningPrefix: 'هشدار: ',

	// Form.Validator.Extras
	noSpace: 'استفاده از فاصله در این بخش مجاز نیست.',
	reqChkByNode: 'موردی انتخاب نشده است.',
	requiredChk: 'این فیلد الزامی است.',
	reqChkByName: 'لطفا یک {label} را انتخاب کنید.',
	match: 'این فیلد باید با فیلد {matchName} مطابقت داشته باشد.',
	startDate: 'تاریخ شروع',
	endDate: 'تاریخ پایان',
	currentDate: 'تاریخ کنونی',
	afterDate: 'تاریخ میبایست برابر یا بعد از {label} باشد',
	beforeDate: 'تاریخ میبایست برابر یا قبل از {label} باشد',
	startMonth: 'لطفا ماه شروع را انتخاب کنید',
	sameMonth: 'این دو تاریخ باید در یک ماه باشند - شما باید یکی یا هر دو را تغییر دهید.',
	creditcard: 'شماره کارت اعتباری که وارد کرده اید معتبر نیست. لطفا شماره را بررسی کنید و مجددا تلاش کنید. {length} رقم وارد شده است.'

});

/*
---

name: Locale.fi-FI.Date

description: Date messages for Finnish.

license: MIT-style license

authors:
  - ksel

requires:
  - Locale

provides: [Locale.fi-FI.Date]

...
*/

Locale.define('fi-FI', 'Date', {

	// NOTE: months and days are not capitalized in finnish
	months: ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu'],

	// these abbreviations are really not much used in finnish because they obviously won't abbreviate very much. ;)
	// NOTE: sometimes one can see forms such as "tammi", "helmi", etc. but that is not proper finnish.
	months_abbr: ['tammik.', 'helmik.', 'maalisk.', 'huhtik.', 'toukok.', 'kesäk.', 'heinäk.', 'elok.', 'syysk.', 'lokak.', 'marrask.', 'jouluk.'],

	days: ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai'],
	days_abbr: ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d.%m.%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '.',

	lessThanMinuteAgo: 'vajaa minuutti sitten',
	minuteAgo: 'noin minuutti sitten',
	minutesAgo: '{delta} minuuttia sitten',
	hourAgo: 'noin tunti sitten',
	hoursAgo: 'noin {delta} tuntia sitten',
	dayAgo: 'päivä sitten',
	daysAgo: '{delta} päivää sitten',
	weekAgo: 'viikko sitten',
	weeksAgo: '{delta} viikkoa sitten',
	monthAgo: 'kuukausi sitten',
	monthsAgo: '{delta} kuukautta sitten',
	yearAgo: 'vuosi sitten',
	yearsAgo: '{delta} vuotta sitten',

	lessThanMinuteUntil: 'vajaan minuutin kuluttua',
	minuteUntil: 'noin minuutin kuluttua',
	minutesUntil: '{delta} minuutin kuluttua',
	hourUntil: 'noin tunnin kuluttua',
	hoursUntil: 'noin {delta} tunnin kuluttua',
	dayUntil: 'päivän kuluttua',
	daysUntil: '{delta} päivän kuluttua',
	weekUntil: 'viikon kuluttua',
	weeksUntil: '{delta} viikon kuluttua',
	monthUntil: 'kuukauden kuluttua',
	monthsUntil: '{delta} kuukauden kuluttua',
	yearUntil: 'vuoden kuluttua',
	yearsUntil: '{delta} vuoden kuluttua'

});

/*
---

name: Locale.fi-FI.Form.Validator

description: Form Validator messages for Finnish.

license: MIT-style license

authors:
  - ksel

requires:
  - Locale

provides: [Locale.fi-FI.Form.Validator]

...
*/

Locale.define('fi-FI', 'FormValidator', {

	required: 'Tämä kenttä on pakollinen.',
	minLength: 'Ole hyvä ja anna vähintään {minLength} merkkiä (annoit {length} merkkiä).',
	maxLength: 'Älä anna enempää kuin {maxLength} merkkiä (annoit {length} merkkiä).',
	integer: 'Ole hyvä ja anna kokonaisluku. Luvut, joissa on desimaaleja (esim. 1.25) eivät ole sallittuja.',
	numeric: 'Anna tähän kenttään lukuarvo (kuten "1" tai "1.1" tai "-1" tai "-1.1").',
	digits: 'Käytä pelkästään numeroita ja välimerkkejä tässä kentässä (syötteet, kuten esim. puhelinnumero, jossa on väliviivoja, pilkkuja tai pisteitä, kelpaa).',
	alpha: 'Anna tähän kenttään vain kirjaimia (a-z). Välilyönnit tai muut merkit eivät ole sallittuja.',
	alphanum: 'Anna tähän kenttään vain kirjaimia (a-z) tai numeroita (0-9). Välilyönnit tai muut merkit eivät ole sallittuja.',
	dateSuchAs: 'Ole hyvä ja anna kelvollinen päivmäärä, kuten esimerkiksi {date}',
	dateInFormatMDY: 'Ole hyvä ja anna kelvollinen päivämäärä muodossa pp/kk/vvvv (kuten "12/31/1999")',
	email: 'Ole hyvä ja anna kelvollinen sähköpostiosoite (kuten esimerkiksi "matti@meikalainen.com").',
	url: 'Ole hyvä ja anna kelvollinen URL, kuten esimerkiksi http://www.example.com.',
	currencyDollar: 'Ole hyvä ja anna kelvollinen eurosumma (kuten esimerkiksi 100,00 EUR) .',
	oneRequired: 'Ole hyvä ja syötä jotakin ainakin johonkin näistä kentistä.',
	errorPrefix: 'Virhe: ',
	warningPrefix: 'Varoitus: ',

	// Form.Validator.Extras
	noSpace: 'Tässä syötteessä ei voi olla välilyöntejä',
	reqChkByNode: 'Ei valintoja.',
	requiredChk: 'Tämä kenttä on pakollinen.',
	reqChkByName: 'Ole hyvä ja valitse {label}.',
	match: 'Tämän kentän tulee vastata kenttää {matchName}',
	startDate: 'alkupäivämäärä',
	endDate: 'loppupäivämäärä',
	currentDate: 'nykyinen päivämäärä',
	afterDate: 'Päivämäärän tulisi olla sama tai myöhäisempi ajankohta kuin {label}.',
	beforeDate: 'Päivämäärän tulisi olla sama tai aikaisempi ajankohta kuin {label}.',
	startMonth: 'Ole hyvä ja valitse aloituskuukausi',
	sameMonth: 'Näiden kahden päivämäärän tulee olla saman kuun sisällä -- sinun pitää muuttaa jompaa kumpaa.',
	creditcard: 'Annettu luottokortin numero ei kelpaa. Ole hyvä ja tarkista numero sekä yritä uudelleen. {length} numeroa syötetty.'

});

/*
---

name: Locale.fi-FI.Number

description: Finnish number messages

license: MIT-style license

authors:
  - ksel

requires:
  - Locale
  - Locale.EU.Number

provides: [Locale.fi-FI.Number]

...
*/

Locale.define('fi-FI', 'Number', {

	group: ' ' // grouped by space

}).inherit('EU', 'Number');

/*
---

name: Locale.fr-FR.Date

description: Date messages for French.

license: MIT-style license

authors:
  - Nicolas Sorosac
  - Antoine Abt

requires:
  - Locale

provides: [Locale.fr-FR.Date]

...
*/

Locale.define('fr-FR', 'Date', {

	months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
	months_abbr: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
	days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
	days_abbr: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: function(dayOfMonth){
		return (dayOfMonth > 1) ? '' : 'er';
	},

	lessThanMinuteAgo: "il y a moins d'une minute",
	minuteAgo: 'il y a une minute',
	minutesAgo: 'il y a {delta} minutes',
	hourAgo: 'il y a une heure',
	hoursAgo: 'il y a {delta} heures',
	dayAgo: 'il y a un jour',
	daysAgo: 'il y a {delta} jours',
	weekAgo: 'il y a une semaine',
	weeksAgo: 'il y a {delta} semaines',
	monthAgo: 'il y a 1 mois',
	monthsAgo: 'il y a {delta} mois',
	yearthAgo: 'il y a 1 an',
	yearsAgo: 'il y a {delta} ans',

	lessThanMinuteUntil: "dans moins d'une minute",
	minuteUntil: 'dans une minute',
	minutesUntil: 'dans {delta} minutes',
	hourUntil: 'dans une heure',
	hoursUntil: 'dans {delta} heures',
	dayUntil: 'dans un jour',
	daysUntil: 'dans {delta} jours',
	weekUntil: 'dans 1 semaine',
	weeksUntil: 'dans {delta} semaines',
	monthUntil: 'dans 1 mois',
	monthsUntil: 'dans {delta} mois',
	yearUntil: 'dans 1 an',
	yearsUntil: 'dans {delta} ans'

});

/*
---

name: Locale.fr-FR.Form.Validator

description: Form Validator messages for French.

license: MIT-style license

authors:
  - Miquel Hudin
  - Nicolas Sorosac

requires:
  - Locale

provides: [Locale.fr-FR.Form.Validator]

...
*/

Locale.define('fr-FR', 'FormValidator', {

	required: 'Ce champ est obligatoire.',
	length: 'Veuillez saisir {length} caract&egrave;re(s) (vous avez saisi {elLength} caract&egrave;re(s)',
	minLength: 'Veuillez saisir un minimum de {minLength} caract&egrave;re(s) (vous avez saisi {length} caract&egrave;re(s)).',
	maxLength: 'Veuillez saisir un maximum de {maxLength} caract&egrave;re(s) (vous avez saisi {length} caract&egrave;re(s)).',
	integer: 'Veuillez saisir un nombre entier dans ce champ. Les nombres d&eacute;cimaux (ex : "1,25") ne sont pas autoris&eacute;s.',
	numeric: 'Veuillez saisir uniquement des chiffres dans ce champ (ex : "1" ou "1,1" ou "-1" ou "-1,1").',
	digits: "Veuillez saisir uniquement des chiffres et des signes de ponctuation dans ce champ (ex : un num&eacute;ro de t&eacute;l&eacute;phone avec des traits d'union est autoris&eacute;).",
	alpha: 'Veuillez saisir uniquement des lettres (a-z) dans ce champ. Les espaces ou autres caract&egrave;res ne sont pas autoris&eacute;s.',
	alphanum: 'Veuillez saisir uniquement des lettres (a-z) ou des chiffres (0-9) dans ce champ. Les espaces ou autres caract&egrave;res ne sont pas autoris&eacute;s.',
	dateSuchAs: 'Veuillez saisir une date correcte comme {date}',
	dateInFormatMDY: 'Veuillez saisir une date correcte, au format JJ/MM/AAAA (ex : "31/11/1999").',
	email: 'Veuillez saisir une adresse de courrier &eacute;lectronique. Par exemple "fred@domaine.com".',
	url: 'Veuillez saisir une URL, comme http://www.exemple.com.',
	currencyDollar: 'Veuillez saisir une quantit&eacute; correcte. Par exemple 100,00&euro;.',
	oneRequired: 'Veuillez s&eacute;lectionner au moins une de ces options.',
	errorPrefix: 'Erreur : ',
	warningPrefix: 'Attention : ',

	// Form.Validator.Extras
	noSpace: "Ce champ n'accepte pas les espaces.",
	reqChkByNode: "Aucun &eacute;l&eacute;ment n'est s&eacute;lectionn&eacute;.",
	requiredChk: 'Ce champ est obligatoire.',
	reqChkByName: 'Veuillez s&eacute;lectionner un(e) {label}.',
	match: 'Ce champ doit correspondre avec le champ {matchName}.',
	startDate: 'date de d&eacute;but',
	endDate: 'date de fin',
	currentDate: 'date actuelle',
	afterDate: 'La date doit &ecirc;tre identique ou post&eacute;rieure &agrave; {label}.',
	beforeDate: 'La date doit &ecirc;tre identique ou ant&eacute;rieure &agrave; {label}.',
	startMonth: 'Veuillez s&eacute;lectionner un mois de d&eacute;but.',
	sameMonth: 'Ces deux dates doivent &ecirc;tre dans le m&ecirc;me mois - vous devez en modifier une.',
	creditcard: 'Le num&eacute;ro de carte de cr&eacute;dit est invalide. Merci de v&eacute;rifier le num&eacute;ro et de r&eacute;essayer. Vous avez entr&eacute; {length} chiffre(s).'

});

/*
---

name: Locale.fr-FR.Number

description: Number messages for French.

license: MIT-style license

authors:
  - Arian Stolwijk
  - sv1l

requires:
  - Locale
  - Locale.EU.Number

provides: [Locale.fr-FR.Number]

...
*/

Locale.define('fr-FR', 'Number', {

	group: ' ' // In fr-FR localization, group character is a blank space

}).inherit('EU', 'Number');

/*
---

name: Locale.he-IL.Date

description: Date messages for Hebrew.

license: MIT-style license

authors:
  - Elad Ossadon

requires:
  - Locale

provides: [Locale.he-IL.Date]

...
*/

Locale.define('he-IL', 'Date', {

	months: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
	months_abbr: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
	days: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
	days_abbr: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],

	// Culture's date order: MM/DD/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 0,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: 'לפני פחות מדקה',
	minuteAgo: 'לפני כדקה',
	minutesAgo: 'לפני {delta} דקות',
	hourAgo: 'לפני כשעה',
	hoursAgo: 'לפני {delta} שעות',
	dayAgo: 'לפני יום',
	daysAgo: 'לפני {delta} ימים',
	weekAgo: 'לפני שבוע',
	weeksAgo: 'לפני {delta} שבועות',
	monthAgo: 'לפני חודש',
	monthsAgo: 'לפני {delta} חודשים',
	yearAgo: 'לפני שנה',
	yearsAgo: 'לפני {delta} שנים',

	lessThanMinuteUntil: 'בעוד פחות מדקה',
	minuteUntil: 'בעוד כדקה',
	minutesUntil: 'בעוד {delta} דקות',
	hourUntil: 'בעוד כשעה',
	hoursUntil: 'בעוד {delta} שעות',
	dayUntil: 'בעוד יום',
	daysUntil: 'בעוד {delta} ימים',
	weekUntil: 'בעוד שבוע',
	weeksUntil: 'בעוד {delta} שבועות',
	monthUntil: 'בעוד חודש',
	monthsUntil: 'בעוד {delta} חודשים',
	yearUntil: 'בעוד שנה',
	yearsUntil: 'בעוד {delta} שנים'

});

/*
---

name: Locale.he-IL.Form.Validator

description: Form Validator messages for Hebrew.

license: MIT-style license

authors:
  - Elad Ossadon

requires:
  - Locale

provides: [Locale.he-IL.Form.Validator]

...
*/

Locale.define('he-IL', 'FormValidator', {

	required: 'נא למלא שדה זה.',
	minLength: 'נא להזין לפחות {minLength} תווים (הזנת {length} תווים).',
	maxLength: 'נא להזין עד {maxLength} תווים (הזנת {length} תווים).',
	integer: 'נא להזין מספר שלם לשדה זה. מספרים עשרוניים (כמו 1.25) אינם חוקיים.',
	numeric: 'נא להזין ערך מספרי בלבד בשדה זה (כמו "1", "1.1", "-1" או "-1.1").',
	digits: 'נא להזין רק ספרות וסימני הפרדה בשדה זה (למשל, מספר טלפון עם מקפים או נקודות הוא חוקי).',
	alpha: 'נא להזין רק אותיות באנגלית (a-z) בשדה זה. רווחים או תווים אחרים אינם חוקיים.',
	alphanum: 'נא להזין רק אותריות באנגלית (a-z) או ספרות (0-9) בשדה זה. אווחרים או תווים אחרים אינם חוקיים.',
	dateSuchAs: 'נא להזין תאריך חוקי, כמו {date}',
	dateInFormatMDY: 'נא להזין תאריך חוקי בפורמט MM/DD/YYYY (כמו "12/31/1999")',
	email: 'נא להזין כתובת אימייל חוקית. לדוגמה: "fred@domain.com".',
	url: 'נא להזין כתובת אתר חוקית, כמו http://www.example.com.',
	currencyDollar: 'נא להזין סכום דולרי חוקי. לדוגמה $100.00.',
	oneRequired: 'נא לבחור לפחות בשדה אחד.',
	errorPrefix: 'שגיאה: ',
	warningPrefix: 'אזהרה: ',

	// Form.Validator.Extras
	noSpace: 'אין להזין רווחים בשדה זה.',
	reqChkByNode: 'נא לבחור אחת מהאפשרויות.',
	requiredChk: 'שדה זה נדרש.',
	reqChkByName: 'נא לבחור {label}.',
	match: 'שדה זה צריך להתאים לשדה {matchName}',
	startDate: 'תאריך ההתחלה',
	endDate: 'תאריך הסיום',
	currentDate: 'התאריך הנוכחי',
	afterDate: 'התאריך צריך להיות זהה או אחרי {label}.',
	beforeDate: 'התאריך צריך להיות זהה או לפני {label}.',
	startMonth: 'נא לבחור חודש התחלה',
	sameMonth: 'שני תאריכים אלה צריכים להיות באותו חודש - נא לשנות אחד התאריכים.',
	creditcard: 'מספר כרטיס האשראי שהוזן אינו חוקי. נא לבדוק שנית. הוזנו {length} ספרות.'

});

/*
---

name: Locale.he-IL.Number

description: Number messages for Hebrew.

license: MIT-style license

authors:
  - Elad Ossadon

requires:
  - Locale

provides: [Locale.he-IL.Number]

...
*/

Locale.define('he-IL', 'Number', {

	decimal: '.',
	group: ',',

	currency: {
		suffix: ' ₪'
	}

});

/*
---

name: Locale.hu-HU.Date

description: Date messages for Hungarian.

license: MIT-style license

authors:
  - Zsolt Szegheő

requires:
  - Locale

provides: [Locale.hu-HU.Date]

...
*/

Locale.define('hu-HU', 'Date', {

	months: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
	months_abbr: ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'],
	days: ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
	days_abbr: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],

	// Culture's date order: YYYY.MM.DD.
	dateOrder: ['year', 'month', 'date'],
	shortDate: '%Y.%m.%d.',
	shortTime: '%I:%M',
	AM: 'de.',
	PM: 'du.',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '.',

	lessThanMinuteAgo: 'alig egy perce',
	minuteAgo: 'egy perce',
	minutesAgo: '{delta} perce',
	hourAgo: 'egy órája',
	hoursAgo: '{delta} órája',
	dayAgo: '1 napja',
	daysAgo: '{delta} napja',
	weekAgo: '1 hete',
	weeksAgo: '{delta} hete',
	monthAgo: '1 hónapja',
	monthsAgo: '{delta} hónapja',
	yearAgo: '1 éve',
	yearsAgo: '{delta} éve',

	lessThanMinuteUntil: 'alig egy perc múlva',
	minuteUntil: 'egy perc múlva',
	minutesUntil: '{delta} perc múlva',
	hourUntil: 'egy óra múlva',
	hoursUntil: '{delta} óra múlva',
	dayUntil: '1 nap múlva',
	daysUntil: '{delta} nap múlva',
	weekUntil: '1 hét múlva',
	weeksUntil: '{delta} hét múlva',
	monthUntil: '1 hónap múlva',
	monthsUntil: '{delta} hónap múlva',
	yearUntil: '1 év múlva',
	yearsUntil: '{delta} év múlva'

});

/*
---

name: Locale.hu-HU.Form.Validator

description: Form Validator messages for Hungarian.

license: MIT-style license

authors:
  - Zsolt Szegheő

requires:
  - Locale

provides: [Locale.hu-HU.Form.Validator]

...
*/

Locale.define('hu-HU', 'FormValidator', {

	required: 'A mező kitöltése kötelező.',
	minLength: 'Legalább {minLength} karakter megadása szükséges (megadva {length} karakter).',
	maxLength: 'Legfeljebb {maxLength} karakter megadása lehetséges (megadva {length} karakter).',
	integer: 'Egész szám megadása szükséges. A tizedesjegyek (pl. 1.25) nem engedélyezettek.',
	numeric: 'Szám megadása szükséges (pl. "1" vagy "1.1" vagy "-1" vagy "-1.1").',
	digits: 'Csak számok és írásjelek megadása lehetséges (pl. telefonszám kötőjelek és/vagy perjelekkel).',
	alpha: 'Csak betűk (a-z) megadása lehetséges. Szóköz és egyéb karakterek nem engedélyezettek.',
	alphanum: 'Csak betűk (a-z) vagy számok (0-9) megadása lehetséges. Szóköz és egyéb karakterek nem engedélyezettek.',
	dateSuchAs: 'Valós dátum megadása szükséges (pl. {date}).',
	dateInFormatMDY: 'Valós dátum megadása szükséges ÉÉÉÉ.HH.NN. formában. (pl. "1999.12.31.")',
	email: 'Valós e-mail cím megadása szükséges (pl. "fred@domain.hu").',
	url: 'Valós URL megadása szükséges (pl. http://www.example.com).',
	currencyDollar: 'Valós pénzösszeg megadása szükséges (pl. 100.00 Ft.).',
	oneRequired: 'Az alábbi mezők legalább egyikének kitöltése kötelező.',
	errorPrefix: 'Hiba: ',
	warningPrefix: 'Figyelem: ',

	// Form.Validator.Extras
	noSpace: 'A mező nem tartalmazhat szóközöket.',
	reqChkByNode: 'Nincs egyetlen kijelölt elem sem.',
	requiredChk: 'A mező kitöltése kötelező.',
	reqChkByName: 'Egy {label} kiválasztása szükséges.',
	match: 'A mezőnek egyeznie kell a(z) {matchName} mezővel.',
	startDate: 'a kezdet dátuma',
	endDate: 'a vég dátuma',
	currentDate: 'jelenlegi dátum',
	afterDate: 'A dátum nem lehet kisebb, mint {label}.',
	beforeDate: 'A dátum nem lehet nagyobb, mint {label}.',
	startMonth: 'Kezdeti hónap megadása szükséges.',
	sameMonth: 'A két dátumnak ugyanazon hónapban kell lennie.',
	creditcard: 'A megadott bankkártyaszám nem valódi (megadva {length} számjegy).'

});

/*
---

name: Locale.it-IT.Date

description: Date messages for Italian.

license: MIT-style license.

authors:
  - Andrea Novero
  - Valerio Proietti

requires:
  - Locale

provides: [Locale.it-IT.Date]

...
*/

Locale.define('it-IT', 'Date', {

	months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
	months_abbr: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
	days: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
	days_abbr: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H.%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: 'º',

	lessThanMinuteAgo: 'meno di un minuto fa',
	minuteAgo: 'circa un minuto fa',
	minutesAgo: 'circa {delta} minuti fa',
	hourAgo: "circa un'ora fa",
	hoursAgo: 'circa {delta} ore fa',
	dayAgo: 'circa 1 giorno fa',
	daysAgo: 'circa {delta} giorni fa',
	weekAgo: 'una settimana fa',
	weeksAgo: '{delta} settimane fa',
	monthAgo: 'un mese fa',
	monthsAgo: '{delta} mesi fa',
	yearAgo: 'un anno fa',
	yearsAgo: '{delta} anni fa',

	lessThanMinuteUntil: 'tra meno di un minuto',
	minuteUntil: 'tra circa un minuto',
	minutesUntil: 'tra circa {delta} minuti',
	hourUntil: "tra circa un'ora",
	hoursUntil: 'tra circa {delta} ore',
	dayUntil: 'tra circa un giorno',
	daysUntil: 'tra circa {delta} giorni',
	weekUntil: 'tra una settimana',
	weeksUntil: 'tra {delta} settimane',
	monthUntil: 'tra un mese',
	monthsUntil: 'tra {delta} mesi',
	yearUntil: 'tra un anno',
	yearsUntil: 'tra {delta} anni'

});

/*
---

name: Locale.it-IT.Form.Validator

description: Form Validator messages for Italian.

license: MIT-style license

authors:
  - Leonardo Laureti
  - Andrea Novero

requires:
  - Locale

provides: [Locale.it-IT.Form.Validator]

...
*/

Locale.define('it-IT', 'FormValidator', {

	required: 'Il campo &egrave; obbligatorio.',
	minLength: 'Inserire almeno {minLength} caratteri (ne sono stati inseriti {length}).',
	maxLength: 'Inserire al massimo {maxLength} caratteri (ne sono stati inseriti {length}).',
	integer: 'Inserire un numero intero. Non sono consentiti decimali (es.: 1.25).',
	numeric: 'Inserire solo valori numerici (es.: "1" oppure "1.1" oppure "-1" oppure "-1.1").',
	digits: 'Inserire solo numeri e caratteri di punteggiatura. Per esempio &egrave; consentito un numero telefonico con trattini o punti.',
	alpha: 'Inserire solo lettere (a-z). Non sono consentiti spazi o altri caratteri.',
	alphanum: 'Inserire solo lettere (a-z) o numeri (0-9). Non sono consentiti spazi o altri caratteri.',
	dateSuchAs: 'Inserire una data valida del tipo {date}',
	dateInFormatMDY: 'Inserire una data valida nel formato MM/GG/AAAA (es.: "12/31/1999")',
	email: 'Inserire un indirizzo email valido. Per esempio "nome@dominio.com".',
	url: 'Inserire un indirizzo valido. Per esempio "http://www.example.com".',
	currencyDollar: 'Inserire un importo valido. Per esempio "$100.00".',
	oneRequired: 'Completare almeno uno dei campi richiesti.',
	errorPrefix: 'Errore: ',
	warningPrefix: 'Attenzione: ',

	// Form.Validator.Extras
	noSpace: 'Non sono consentiti spazi.',
	reqChkByNode: 'Nessuna voce selezionata.',
	requiredChk: 'Il campo &egrave; obbligatorio.',
	reqChkByName: 'Selezionare un(a) {label}.',
	match: 'Il valore deve corrispondere al campo {matchName}',
	startDate: "data d'inizio",
	endDate: 'data di fine',
	currentDate: 'data attuale',
	afterDate: 'La data deve corrispondere o essere successiva al {label}.',
	beforeDate: 'La data deve corrispondere o essere precedente al {label}.',
	startMonth: "Selezionare un mese d'inizio",
	sameMonth: 'Le due date devono essere dello stesso mese - occorre modificarne una.'

});

/*
---

name: Locale.ja-JP.Date

description: Date messages for Japanese.

license: MIT-style license

authors:
  - Noritaka Horio

requires:
  - Locale

provides: [Locale.ja-JP.Date]

...
*/

Locale.define('ja-JP', 'Date', {

	months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
	months_abbr: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
	days: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
	days_abbr: ['日', '月', '火', '水', '木', '金', '土'],

	// Culture's date order: YYYY/MM/DD
	dateOrder: ['year', 'month', 'date'],
	shortDate: '%Y/%m/%d',
	shortTime: '%H:%M',
	AM: '午前',
	PM: '午後',
	firstDayOfWeek: 0,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: '1分以内前',
	minuteAgo: '約1分前',
	minutesAgo: '約{delta}分前',
	hourAgo: '約1時間前',
	hoursAgo: '約{delta}時間前',
	dayAgo: '1日前',
	daysAgo: '{delta}日前',
	weekAgo: '1週間前',
	weeksAgo: '{delta}週間前',
	monthAgo: '1ヶ月前',
	monthsAgo: '{delta}ヶ月前',
	yearAgo: '1年前',
	yearsAgo: '{delta}年前',

	lessThanMinuteUntil: '今から約1分以内',
	minuteUntil: '今から約1分',
	minutesUntil: '今から約{delta}分',
	hourUntil: '今から約1時間',
	hoursUntil: '今から約{delta}時間',
	dayUntil: '今から1日間',
	daysUntil: '今から{delta}日間',
	weekUntil: '今から1週間',
	weeksUntil: '今から{delta}週間',
	monthUntil: '今から1ヶ月',
	monthsUntil: '今から{delta}ヶ月',
	yearUntil: '今から1年',
	yearsUntil: '今から{delta}年'

});

/*
---

name: Locale.ja-JP.Form.Validator

description: Form Validator messages for Japanese.

license: MIT-style license

authors:
  - Noritaka Horio

requires:
  - Locale

provides: [Locale.ja-JP.Form.Validator]

...
*/

Locale.define("ja-JP", "FormValidator", {

	required: '入力は必須です。',
	minLength: '入力文字数は{minLength}以上にしてください。({length}文字)',
	maxLength: '入力文字数は{maxLength}以下にしてください。({length}文字)',
	integer: '整数を入力してください。',
	numeric: '入力できるのは数値だけです。(例: "1", "1.1", "-1", "-1.1"....)',
	digits: '入力できるのは数値と句読記号です。 (例: -や+を含む電話番号など).',
	alpha: '入力できるのは半角英字だけです。それ以外の文字は入力できません。',
	alphanum: '入力できるのは半角英数字だけです。それ以外の文字は入力できません。',
	dateSuchAs: '有効な日付を入力してください。{date}',
	dateInFormatMDY: '日付の書式に誤りがあります。YYYY/MM/DD (i.e. "1999/12/31")',
	email: 'メールアドレスに誤りがあります。',
	url: 'URLアドレスに誤りがあります。',
	currencyDollar: '金額に誤りがあります。',
	oneRequired: 'ひとつ以上入力してください。',
	errorPrefix: 'エラー: ',
	warningPrefix: '警告: ',

	// FormValidator.Extras
	noSpace: 'スペースは入力できません。',
	reqChkByNode: '選択されていません。',
	requiredChk: 'この項目は必須です。',
	reqChkByName: '{label}を選択してください。',
	match: '{matchName}が入力されている場合必須です。',
	startDate: '開始日',
	endDate: '終了日',
	currentDate: '今日',
	afterDate: '{label}以降の日付にしてください。',
	beforeDate: '{label}以前の日付にしてください。',
	startMonth: '開始月を選択してください。',
	sameMonth: '日付が同一です。どちらかを変更してください。'

});

/*
---

name: Locale.ja-JP.Number

description: Number messages for Japanese.

license: MIT-style license

authors:
  - Noritaka Horio

requires:
  - Locale

provides: [Locale.ja-JP.Number]

...
*/

Locale.define('ja-JP', 'Number', {

	decimal: '.',
	group: ',',

	currency: {
		decimals: 0,
		prefix: '\\'
	}

});

/*
---

name: Locale.nl-NL.Date

description: Date messages for Dutch.

license: MIT-style license

authors:
  - Lennart Pilon
  - Tim Wienk

requires:
  - Locale

provides: [Locale.nl-NL.Date]

...
*/

Locale.define('nl-NL', 'Date', {

	months: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
	months_abbr: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
	days: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
	days_abbr: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],

	// Culture's date order: DD-MM-YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d-%m-%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: 'e',

	lessThanMinuteAgo: 'minder dan een minuut geleden',
	minuteAgo: 'ongeveer een minuut geleden',
	minutesAgo: '{delta} minuten geleden',
	hourAgo: 'ongeveer een uur geleden',
	hoursAgo: 'ongeveer {delta} uur geleden',
	dayAgo: 'een dag geleden',
	daysAgo: '{delta} dagen geleden',
	weekAgo: 'een week geleden',
	weeksAgo: '{delta} weken geleden',
	monthAgo: 'een maand geleden',
	monthsAgo: '{delta} maanden geleden',
	yearAgo: 'een jaar geleden',
	yearsAgo: '{delta} jaar geleden',

	lessThanMinuteUntil: 'over minder dan een minuut',
	minuteUntil: 'over ongeveer een minuut',
	minutesUntil: 'over {delta} minuten',
	hourUntil: 'over ongeveer een uur',
	hoursUntil: 'over {delta} uur',
	dayUntil: 'over ongeveer een dag',
	daysUntil: 'over {delta} dagen',
	weekUntil: 'over een week',
	weeksUntil: 'over {delta} weken',
	monthUntil: 'over een maand',
	monthsUntil: 'over {delta} maanden',
	yearUntil: 'over een jaar',
	yearsUntil: 'over {delta} jaar'

});

/*
---

name: Locale.nl-NL.Form.Validator

description: Form Validator messages for Dutch.

license: MIT-style license

authors:
  - Lennart Pilon
  - Arian Stolwijk
  - Tim Wienk

requires:
  - Locale

provides: [Locale.nl-NL.Form.Validator]

...
*/

Locale.define('nl-NL', 'FormValidator', {

	required: 'Dit veld is verplicht.',
	length: 'Vul precies {length} karakters in (je hebt {elLength} karakters ingevoerd).',
	minLength: 'Vul minimaal {minLength} karakters in (je hebt {length} karakters ingevoerd).',
	maxLength: 'Vul niet meer dan {maxLength} karakters in (je hebt {length} karakters ingevoerd).',
	integer: 'Vul een getal in. Getallen met decimalen (bijvoorbeeld 1.25) zijn niet toegestaan.',
	numeric: 'Vul alleen numerieke waarden in (bijvoorbeeld "1" of "1.1" of "-1" of "-1.1").',
	digits: 'Vul alleen nummers en leestekens in (bijvoorbeeld een telefoonnummer met streepjes is toegestaan).',
	alpha: 'Vul alleen letters in (a-z). Spaties en andere karakters zijn niet toegestaan.',
	alphanum: 'Vul alleen letters (a-z) of nummers (0-9) in. Spaties en andere karakters zijn niet toegestaan.',
	dateSuchAs: 'Vul een geldige datum in, zoals {date}',
	dateInFormatMDY: 'Vul een geldige datum, in het formaat MM/DD/YYYY (bijvoorbeeld "12/31/1999")',
	email: 'Vul een geldig e-mailadres in. Bijvoorbeeld "fred@domein.nl".',
	url: 'Vul een geldige URL in, zoals http://www.example.com.',
	currencyDollar: 'Vul een geldig $ bedrag in. Bijvoorbeeld $100.00 .',
	oneRequired: 'Vul iets in bij in ieder geval een van deze velden.',
	warningPrefix: 'Waarschuwing: ',
	errorPrefix: 'Fout: ',

	// Form.Validator.Extras
	noSpace: 'Spaties zijn niet toegestaan in dit veld.',
	reqChkByNode: 'Er zijn geen items geselecteerd.',
	requiredChk: 'Dit veld is verplicht.',
	reqChkByName: 'Selecteer een {label}.',
	match: 'Dit veld moet overeen komen met het {matchName} veld',
	startDate: 'de begin datum',
	endDate: 'de eind datum',
	currentDate: 'de huidige datum',
	afterDate: 'De datum moet hetzelfde of na {label} zijn.',
	beforeDate: 'De datum moet hetzelfde of voor {label} zijn.',
	startMonth: 'Selecteer een begin maand',
	sameMonth: 'Deze twee data moeten in dezelfde maand zijn - u moet een van beide aanpassen.',
	creditcard: 'Het ingevulde creditcardnummer is niet geldig. Controleer het nummer en probeer opnieuw. {length} getallen ingevuld.'

});

/*
---

name: Locale.nl-NL.Number

description: Number messages for Dutch.

license: MIT-style license

authors:
  - Arian Stolwijk

requires:
  - Locale
  - Locale.EU.Number

provides: [Locale.nl-NL.Number]

...
*/

Locale.define('nl-NL').inherit('EU', 'Number');




/*
---

name: Locale.no-NO.Date

description: Date messages for Norwegian.

license: MIT-style license

authors:
  - Espen 'Rexxars' Hovlandsdal
  - Ole Tøsse Kolvik
requires:
  - Locale

provides: [Locale.no-NO.Date]

...
*/

Locale.define('no-NO', 'Date', {
	months: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
	months_abbr: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
	days: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
	days_abbr: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],

	// Culture's date order: DD.MM.YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d.%m.%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	lessThanMinuteAgo: 'mindre enn et minutt siden',
	minuteAgo: 'omtrent et minutt siden',
	minutesAgo: '{delta} minutter siden',
	hourAgo: 'omtrent en time siden',
	hoursAgo: 'omtrent {delta} timer siden',
	dayAgo: '{delta} dag siden',
	daysAgo: '{delta} dager siden',
	weekAgo: 'en uke siden',
	weeksAgo: '{delta} uker siden',
	monthAgo: 'en måned siden',
	monthsAgo: '{delta} måneder siden',
	yearAgo: 'ett år siden',
	yearsAgo: '{delta} år siden',

	lessThanMinuteUntil: 'mindre enn et minutt til',
	minuteUntil: 'omtrent et minutt til',
	minutesUntil: '{delta} minutter til',
	hourUntil: 'omtrent en time til',
	hoursUntil: 'omtrent {delta} timer til',
	dayUntil: 'en dag til',
	daysUntil: '{delta} dager til',
	weekUntil: 'en uke til',
	weeksUntil: '{delta} uker til',
	monthUntil: 'en måned til',
	monthsUntil: '{delta} måneder til',
	yearUntil: 'et år til',
	yearsUntil: '{delta} år til'
});

/*
---

name: Locale.no-NO.Form.Validator

description: Form Validator messages for Norwegian.

license: MIT-style license

authors:
  - Espen 'Rexxars' Hovlandsdal

requires:
  - Locale

provides: [Locale.no-NO.Form.Validator]

...
*/

Locale.define('no-NO', 'FormValidator', {

	required: 'Dette feltet er pÃ¥krevd.',
	minLength: 'Vennligst skriv inn minst {minLength} tegn (du skrev {length} tegn).',
	maxLength: 'Vennligst skriv inn maksimalt {maxLength} tegn (du skrev {length} tegn).',
	integer: 'Vennligst skriv inn et tall i dette feltet. Tall med desimaler (for eksempel 1,25) er ikke tillat.',
	numeric: 'Vennligst skriv inn kun numeriske verdier i dette feltet (for eksempel "1", "1.1", "-1" eller "-1.1").',
	digits: 'Vennligst bruk kun nummer og skilletegn i dette feltet.',
	alpha: 'Vennligst bruk kun bokstaver (a-z) i dette feltet. Ingen mellomrom eller andre tegn er tillat.',
	alphanum: 'Vennligst bruk kun bokstaver (a-z) eller nummer (0-9) i dette feltet. Ingen mellomrom eller andre tegn er tillat.',
	dateSuchAs: 'Vennligst skriv inn en gyldig dato, som {date}',
	dateInFormatMDY: 'Vennligst skriv inn en gyldig dato, i formatet MM/DD/YYYY (for eksempel "12/31/1999")',
	email: 'Vennligst skriv inn en gyldig epost-adresse. For eksempel "espen@domene.no".',
	url: 'Vennligst skriv inn en gyldig URL, for eksempel http://www.example.com.',
	currencyDollar: 'Vennligst fyll ut et gyldig $ belÃ¸p. For eksempel $100.00 .',
	oneRequired: 'Vennligst fyll ut noe i minst ett av disse feltene.',
	errorPrefix: 'Feil: ',
	warningPrefix: 'Advarsel: '

});

/*
---

name: Locale.pl-PL.Date

description: Date messages for Polish.

license: MIT-style license

authors:
  - Oskar Krawczyk

requires:
  - Locale

provides: [Locale.pl-PL.Date]

...
*/

Locale.define('pl-PL', 'Date', {

	months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
	months_abbr: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
	days: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
	days_abbr: ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],

	// Culture's date order: YYYY-MM-DD
	dateOrder: ['year', 'month', 'date'],
	shortDate: '%Y-%m-%d',
	shortTime: '%H:%M',
	AM: 'nad ranem',
	PM: 'po południu',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: function(dayOfMonth){
		return (dayOfMonth > 3 && dayOfMonth < 21) ? 'ty' : ['ty', 'szy', 'gi', 'ci', 'ty'][Math.min(dayOfMonth % 10, 4)];
	},

	lessThanMinuteAgo: 'mniej niż minute temu',
	minuteAgo: 'około minutę temu',
	minutesAgo: '{delta} minut temu',
	hourAgo: 'około godzinę temu',
	hoursAgo: 'około {delta} godzin temu',
	dayAgo: 'Wczoraj',
	daysAgo: '{delta} dni temu',

	lessThanMinuteUntil: 'za niecałą minutę',
	minuteUntil: 'za około minutę',
	minutesUntil: 'za {delta} minut',
	hourUntil: 'za około godzinę',
	hoursUntil: 'za około {delta} godzin',
	dayUntil: 'za 1 dzień',
	daysUntil: 'za {delta} dni'

});

/*
---

name: Locale.pl-PL.Form.Validator

description: Form Validator messages for Polish.

license: MIT-style license

authors:
  - Oskar Krawczyk

requires:
  - Locale

provides: [Locale.pl-PL.Form.Validator]

...
*/

Locale.define('pl-PL', 'FormValidator', {

	required: 'To pole jest wymagane.',
	minLength: 'Wymagane jest przynajmniej {minLength} znaków (wpisanych zostało tylko {length}).',
	maxLength: 'Dozwolone jest nie więcej niż {maxLength} znaków (wpisanych zostało {length})',
	integer: 'To pole wymaga liczb całych. Liczby dziesiętne (np. 1.25) są niedozwolone.',
	numeric: 'Prosimy używać tylko numerycznych wartości w tym polu (np. "1", "1.1", "-1" lub "-1.1").',
	digits: 'Prosimy używać liczb oraz zankow punktuacyjnych w typ polu (dla przykładu, przy numerze telefonu myślniki i kropki są dozwolone).',
	alpha: 'Prosimy używać tylko liter (a-z) w tym polu. Spacje oraz inne znaki są niedozwolone.',
	alphanum: 'Prosimy używać tylko liter (a-z) lub liczb (0-9) w tym polu. Spacje oraz inne znaki są niedozwolone.',
	dateSuchAs: 'Prosimy podać prawidłową datę w formacie: {date}',
	dateInFormatMDY: 'Prosimy podać poprawną date w formacie DD.MM.RRRR (i.e. "12.01.2009")',
	email: 'Prosimy podać prawidłowy adres e-mail, np. "jan@domena.pl".',
	url: 'Prosimy podać prawidłowy adres URL, np. http://www.example.com.',
	currencyDollar: 'Prosimy podać prawidłową sumę w PLN. Dla przykładu: 100.00 PLN.',
	oneRequired: 'Prosimy wypełnić chociaż jedno z pól.',
	errorPrefix: 'Błąd: ',
	warningPrefix: 'Uwaga: ',

	// Form.Validator.Extras
	noSpace: 'W tym polu nie mogą znajdować się spacje.',
	reqChkByNode: 'Brak zaznaczonych elementów.',
	requiredChk: 'To pole jest wymagane.',
	reqChkByName: 'Prosimy wybrać z {label}.',
	match: 'To pole musi być takie samo jak {matchName}',
	startDate: 'data początkowa',
	endDate: 'data końcowa',
	currentDate: 'aktualna data',
	afterDate: 'Podana data poinna być taka sama lub po {label}.',
	beforeDate: 'Podana data poinna być taka sama lub przed {label}.',
	startMonth: 'Prosimy wybrać początkowy miesiąc.',
	sameMonth: 'Te dwie daty muszą być w zakresie tego samego miesiąca - wymagana jest zmiana któregoś z pól.'

});

/*
---

name: Locale.pt-PT.Date

description: Date messages for Portuguese.

license: MIT-style license

authors:
  - Fabio Miranda Costa

requires:
  - Locale

provides: [Locale.pt-PT.Date]

...
*/

Locale.define('pt-PT', 'Date', {

	months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
	months_abbr: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
	days: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
	days_abbr: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],

	// Culture's date order: DD-MM-YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d-%m-%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: 'º',

	lessThanMinuteAgo: 'há menos de um minuto',
	minuteAgo: 'há cerca de um minuto',
	minutesAgo: 'há {delta} minutos',
	hourAgo: 'há cerca de uma hora',
	hoursAgo: 'há cerca de {delta} horas',
	dayAgo: 'há um dia',
	daysAgo: 'há {delta} dias',
	weekAgo: 'há uma semana',
	weeksAgo: 'há {delta} semanas',
	monthAgo: 'há um mês',
	monthsAgo: 'há {delta} meses',
	yearAgo: 'há um ano',
	yearsAgo: 'há {delta} anos',

	lessThanMinuteUntil: 'em menos de um minuto',
	minuteUntil: 'em um minuto',
	minutesUntil: 'em {delta} minutos',
	hourUntil: 'em uma hora',
	hoursUntil: 'em {delta} horas',
	dayUntil: 'em um dia',
	daysUntil: 'em {delta} dias',
	weekUntil: 'em uma semana',
	weeksUntil: 'em {delta} semanas',
	monthUntil: 'em um mês',
	monthsUntil: 'em {delta} meses',
	yearUntil: 'em um ano',
	yearsUntil: 'em {delta} anos'

});

/*
---

name: Locale.pt-BR.Date

description: Date messages for Portuguese (Brazil).

license: MIT-style license

authors:
  - Fabio Miranda Costa

requires:
  - Locale
  - Locale.pt-PT.Date

provides: [Locale.pt-BR.Date]

...
*/

Locale.define('pt-BR', 'Date', {

	// Culture's date order: DD/MM/YYYY
	shortDate: '%d/%m/%Y'

}).inherit('pt-PT', 'Date');

/*
---

name: Locale.pt-BR.Form.Validator

description: Form Validator messages for Portuguese (Brazil).

license: MIT-style license

authors:
  - Fábio Miranda Costa

requires:
  - Locale

provides: [Locale.pt-BR.Form.Validator]

...
*/

Locale.define('pt-BR', 'FormValidator', {

	required: 'Este campo é obrigatório.',
	minLength: 'Digite pelo menos {minLength} caracteres (tamanho atual: {length}).',
	maxLength: 'Não digite mais de {maxLength} caracteres (tamanho atual: {length}).',
	integer: 'Por favor digite apenas um número inteiro neste campo. Não são permitidos números decimais (por exemplo, 1,25).',
	numeric: 'Por favor digite apenas valores numéricos neste campo (por exemplo, "1" ou "1.1" ou "-1" ou "-1,1").',
	digits: 'Por favor use apenas números e pontuação neste campo (por exemplo, um número de telefone com traços ou pontos é permitido).',
	alpha: 'Por favor use somente letras (a-z). Espaço e outros caracteres não são permitidos.',
	alphanum: 'Use somente letras (a-z) ou números (0-9) neste campo. Espaço e outros caracteres não são permitidos.',
	dateSuchAs: 'Digite uma data válida, como {date}',
	dateInFormatMDY: 'Digite uma data válida, como DD/MM/YYYY (por exemplo, "31/12/1999")',
	email: 'Digite um endereço de email válido. Por exemplo "nome@dominio.com".',
	url: 'Digite uma URL válida. Exemplo: http://www.example.com.',
	currencyDollar: 'Digite um valor em dinheiro válido. Exemplo: R$100,00 .',
	oneRequired: 'Digite algo para pelo menos um desses campos.',
	errorPrefix: 'Erro: ',
	warningPrefix: 'Aviso: ',

	// Form.Validator.Extras
	noSpace: 'Não é possível digitar espaços neste campo.',
	reqChkByNode: 'Não foi selecionado nenhum item.',
	requiredChk: 'Este campo é obrigatório.',
	reqChkByName: 'Por favor digite um {label}.',
	match: 'Este campo deve ser igual ao campo {matchName}.',
	startDate: 'a data inicial',
	endDate: 'a data final',
	currentDate: 'a data atual',
	afterDate: 'A data deve ser igual ou posterior a {label}.',
	beforeDate: 'A data deve ser igual ou anterior a {label}.',
	startMonth: 'Por favor selecione uma data inicial.',
	sameMonth: 'Estas duas datas devem ter o mesmo mês - você deve modificar uma das duas.',
	creditcard: 'O número do cartão de crédito informado é inválido. Por favor verifique o valor e tente novamente. {length} números informados.'

});

/*
---

name: Locale.pt-BR.Number

description: Number messages for PT Brazilian.

license: MIT-style license

authors:
  - Arian Stolwijk
  - Danillo César

requires:
  - Locale

provides: [Locale.pt-BR.Number]

...
*/

Locale.define('pt-BR', 'Number', {

	decimal: ',',
	group: '.',

	currency: {
		prefix: 'R$ '
	}

});



/*
---

name: Locale.pt-PT.Form.Validator

description: Form Validator messages for Portuguese.

license: MIT-style license

authors:
  - Miquel Hudin

requires:
  - Locale

provides: [Locale.pt-PT.Form.Validator]

...
*/

Locale.define('pt-PT', 'FormValidator', {

	required: 'Este campo é necessário.',
	minLength: 'Digite pelo menos{minLength} caracteres (comprimento {length} caracteres).',
	maxLength: 'Não insira mais de {maxLength} caracteres (comprimento {length} caracteres).',
	integer: 'Digite um número inteiro neste domínio. Com números decimais (por exemplo, 1,25), não são permitidas.',
	numeric: 'Digite apenas valores numéricos neste domínio (p.ex., "1" ou "1.1" ou "-1" ou "-1,1").',
	digits: 'Por favor, use números e pontuação apenas neste campo (p.ex., um número de telefone com traços ou pontos é permitida).',
	alpha: 'Por favor use somente letras (a-z), com nesta área. Não utilize espaços nem outros caracteres são permitidos.',
	alphanum: 'Use somente letras (a-z) ou números (0-9) neste campo. Não utilize espaços nem outros caracteres são permitidos.',
	dateSuchAs: 'Digite uma data válida, como {date}',
	dateInFormatMDY: 'Digite uma data válida, como DD/MM/YYYY (p.ex. "31/12/1999")',
	email: 'Digite um endereço de email válido. Por exemplo "fred@domain.com".',
	url: 'Digite uma URL válida, como http://www.example.com.',
	currencyDollar: 'Digite um valor válido $. Por exemplo $ 100,00. ',
	oneRequired: 'Digite algo para pelo menos um desses insumos.',
	errorPrefix: 'Erro: ',
	warningPrefix: 'Aviso: '

});

/*
---

name: Locale.ru-RU-unicode.Date

description: Date messages for Russian (utf-8).

license: MIT-style license

authors:
  - Evstigneev Pavel
  - Kuryanovich Egor

requires:
  - Locale

provides: [Locale.ru-RU.Date]

...
*/

(function(){

// Russian language pluralization rules, taken from CLDR project, http://unicode.org/cldr/
// one -> n mod 10 is 1 and n mod 100 is not 11;
// few -> n mod 10 in 2..4 and n mod 100 not in 12..14;
// many -> n mod 10 is 0 or n mod 10 in 5..9 or n mod 100 in 11..14;
// other -> everything else (example 3.14)
var pluralize = function (n, one, few, many, other){
	var modulo10 = n % 10,
		modulo100 = n % 100;

	if (modulo10 == 1 && modulo100 != 11){
		return one;
	} else if ((modulo10 == 2 || modulo10 == 3 || modulo10 == 4) && !(modulo100 == 12 || modulo100 == 13 || modulo100 == 14)){
		return few;
	} else if (modulo10 == 0 || (modulo10 == 5 || modulo10 == 6 || modulo10 == 7 || modulo10 == 8 || modulo10 == 9) || (modulo100 == 11 || modulo100 == 12 || modulo100 == 13 || modulo100 == 14)){
		return many;
	} else {
		return other;
	}
};

Locale.define('ru-RU', 'Date', {

	months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
	months_abbr: ['янв', 'февр', 'март', 'апр', 'май','июнь','июль','авг','сент','окт','нояб','дек'],
	days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
	days_abbr: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],

	// Culture's date order: DD.MM.YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d.%m.%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: 'меньше минуты назад',
	minuteAgo: 'минуту назад',
	minutesAgo: function(delta){ return '{delta} ' + pluralize(delta, 'минуту', 'минуты', 'минут') + ' назад'; },
	hourAgo: 'час назад',
	hoursAgo: function(delta){ return '{delta} ' + pluralize(delta, 'час', 'часа', 'часов') + ' назад'; },
	dayAgo: 'вчера',
	daysAgo: function(delta){ return '{delta} ' + pluralize(delta, 'день', 'дня', 'дней') + ' назад'; },
	weekAgo: 'неделю назад',
	weeksAgo: function(delta){ return '{delta} ' + pluralize(delta, 'неделя', 'недели', 'недель') + ' назад'; },
	monthAgo: 'месяц назад',
	monthsAgo: function(delta){ return '{delta} ' + pluralize(delta, 'месяц', 'месяца', 'месяцев') + ' назад'; },
	yearAgo: 'год назад',
	yearsAgo: function(delta){ return '{delta} ' + pluralize(delta, 'год', 'года', 'лет') + ' назад'; },

	lessThanMinuteUntil: 'меньше чем через минуту',
	minuteUntil: 'через минуту',
	minutesUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'минуту', 'минуты', 'минут') + ''; },
	hourUntil: 'через час',
	hoursUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'час', 'часа', 'часов') + ''; },
	dayUntil: 'завтра',
	daysUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'день', 'дня', 'дней') + ''; },
	weekUntil: 'через неделю',
	weeksUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'неделю', 'недели', 'недель') + ''; },
	monthUntil: 'через месяц',
	monthsUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'месяц', 'месяца', 'месяцев') + ''; },
	yearUntil: 'через',
	yearsUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'год', 'года', 'лет') + ''; }

});



})();

/*
---

name: Locale.ru-RU-unicode.Form.Validator

description: Form Validator messages for Russian (utf-8).

license: MIT-style license

authors:
  - Chernodarov Egor

requires:
  - Locale

provides: [Locale.ru-RU.Form.Validator]

...
*/

Locale.define('ru-RU', 'FormValidator', {

	required: 'Это поле обязательно к заполнению.',
	minLength: 'Пожалуйста, введите хотя бы {minLength} символов (Вы ввели {length}).',
	maxLength: 'Пожалуйста, введите не больше {maxLength} символов (Вы ввели {length}).',
	integer: 'Пожалуйста, введите в это поле число. Дробные числа (например 1.25) тут не разрешены.',
	numeric: 'Пожалуйста, введите в это поле число (например "1" или "1.1", или "-1", или "-1.1").',
	digits: 'В этом поле Вы можете использовать только цифры и знаки пунктуации (например, телефонный номер со знаками дефиса или с точками).',
	alpha: 'В этом поле можно использовать только латинские буквы (a-z). Пробелы и другие символы запрещены.',
	alphanum: 'В этом поле можно использовать только латинские буквы (a-z) и цифры (0-9). Пробелы и другие символы запрещены.',
	dateSuchAs: 'Пожалуйста, введите корректную дату {date}',
	dateInFormatMDY: 'Пожалуйста, введите дату в формате ММ/ДД/ГГГГ (например "12/31/1999")',
	email: 'Пожалуйста, введите корректный емейл-адрес. Для примера "fred@domain.com".',
	url: 'Пожалуйста, введите правильную ссылку вида http://www.example.com.',
	currencyDollar: 'Пожалуйста, введите сумму в долларах. Например: $100.00 .',
	oneRequired: 'Пожалуйста, выберите хоть что-нибудь в одном из этих полей.',
	errorPrefix: 'Ошибка: ',
	warningPrefix: 'Внимание: '

});



/*
---

name: Locale.sk-SK.Date

description: Date messages for Slovak.

license: MIT-style license

authors:
  - Ivan Masár

requires:
  - Locale

provides: [Locale.sk-SK.Date]

...
*/
(function(){

// Slovak language pluralization rules, see http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html
// one -> n is 1;            1
// few -> n in 2..4;         2-4
// other -> everything else  0, 5-999, 1.31, 2.31, 5.31...
var pluralize = function (n, one, few, other){
	if (n == 1) return one;
	else if (n == 2 || n == 3 || n == 4) return few;
	else return other;
};

Locale.define('sk-SK', 'Date', {

	months: ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'],
	months_abbr: ['januára', 'februára', 'marca', 'apríla', 'mája', 'júna', 'júla', 'augusta', 'septembra', 'októbra', 'novembra', 'decembra'],
	days: ['Nedele', 'Pondelí', 'Úterý', 'Streda', 'Čtvrtek', 'Pátek', 'Sobota'],
	days_abbr: ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so'],

	// Culture's date order: DD.MM.YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d.%m.%Y',
	shortTime: '%H:%M',
	AM: 'dop.',
	PM: 'pop.',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '.',

	lessThanMinuteAgo: 'pred chvíľou',
	minuteAgo: 'približne pred minútou',
	minutesAgo: function(delta){ return 'pred {delta} ' + pluralize(delta, 'minútou', 'minútami', 'minútami'); },
	hourAgo: 'približne pred hodinou',
	hoursAgo: function(delta){ return 'pred {delta} ' + pluralize(delta, 'hodinou', 'hodinami', 'hodinami'); },
	dayAgo: 'pred dňom',
	daysAgo: function(delta){ return 'pred {delta} ' + pluralize(delta, 'dňom', 'dňami', 'dňami'); },
	weekAgo: 'pred týždňom',
	weeksAgo: function(delta){ return 'pred {delta} ' + pluralize(delta, 'týždňom', 'týždňami', 'týždňami'); },
	monthAgo: 'pred mesiacom',
	monthsAgo: function(delta){ return 'pred {delta} ' + pluralize(delta, 'mesiacom', 'mesiacmi', 'mesiacmi'); },
	yearAgo: 'pred rokom',
	yearsAgo: function(delta){ return 'pred {delta} ' + pluralize(delta, 'rokom', 'rokmi', 'rokmi'); },

	lessThanMinuteUntil: 'o chvíľu',
	minuteUntil: 'približne o minútu',
	minutesUntil: function(delta){ return 'o {delta} ' + pluralize(delta, 'minútu', 'minúty', 'minúty'); },
	hourUntil: 'približne o hodinu',
	hoursUntil: function(delta){ return 'o {delta} ' + pluralize(delta, 'hodinu', 'hodiny', 'hodín'); },
	dayUntil: 'o deň',
	daysUntil: function(delta){ return 'o {delta} ' + pluralize(delta, 'deň', 'dni', 'dní'); },
	weekUntil: 'o týždeň',
	weeksUntil: function(delta){ return 'o {delta} ' + pluralize(delta, 'týždeň', 'týždne', 'týždňov'); },
	monthUntil: 'o mesiac',
	monthsUntil: function(delta){ return 'o {delta} ' + pluralize(delta, 'mesiac', 'mesiace', 'mesiacov'); },
	yearUntil: 'o rok',
	yearsUntil: function(delta){ return 'o {delta} ' + pluralize(delta, 'rok', 'roky', 'rokov'); }
});

})();

/*
---

name: Locale.sk-SK.Form.Validator

description: Form Validator messages for Czech.

license: MIT-style license

authors:
  - Ivan Masár

requires:
  - Locale

provides: [Locale.sk-SK.Form.Validator]

...
*/

Locale.define('sk-SK', 'FormValidator', {

	required: 'Táto položka je povinná.',
	minLength: 'Zadajte prosím aspoň {minLength} znakov (momentálne {length} znakov).',
	maxLength: 'Zadajte prosím menej ako {maxLength} znakov (momentálne {length} znakov).',
	integer: 'Zadajte prosím celé číslo. Desetinné čísla (napr. 1.25) nie sú povolené.',
	numeric: 'Zadajte len číselné hodnoty (t.j. „1“ alebo „1.1“ alebo „-1“ alebo „-1.1“).',
	digits: 'Zadajte prosím len čísla a interpunkčné znamienka (napríklad telefónne číslo s pomlčkami albo bodkami je povolené).',
	alpha: 'Zadajte prosím len písmená (a-z). Medzery alebo iné znaky nie sú povolené.',
	alphanum: 'Zadajte prosím len písmená (a-z) alebo číslice (0-9). Medzery alebo iné znaky nie sú povolené.',
	dateSuchAs: 'Zadajte prosím platný dátum v tvare {date}',
	dateInFormatMDY: 'Zadajte prosím platný datum v tvare MM / DD / RRRR (t.j. „12/31/1999“)',
	email: 'Zadajte prosím platnú emailovú adresu. Napríklad „fred@domain.com“.',
	url: 'Zadajte prosím platnoú adresu URL v tvare http://www.example.com.',
	currencyDollar: 'Zadajte prosím platnú čiastku. Napríklad $100.00.',
	oneRequired: 'Zadajte prosím aspoň jednu hodnotu z týchto položiek.',
	errorPrefix: 'Chyba: ',
	warningPrefix: 'Upozornenie: ',

	// Form.Validator.Extras
	noSpace: 'V tejto položle nie sú povolené medzery',
	reqChkByNode: 'Nie sú vybrané žiadne položky.',
	requiredChk: 'Táto položka je povinná.',
	reqChkByName: 'Prosím vyberte {label}.',
	match: 'Táto položka sa musí zhodovať s položkou {matchName}',
	startDate: 'dátum začiatku',
	endDate: 'dátum ukončenia',
	currendDate: 'aktuálny dátum',
	afterDate: 'Dátum by mal býť rovnaký alebo väčší ako {label}.',
	beforeDate: 'Dátum by mal byť rovnaký alebo menší ako {label}.',
	startMonth: 'Vyberte počiatočný mesiac.',
	sameMonth: 'Tieto dva dátumy musia býť v rovnakom mesiaci - zmeňte jeden z nich.',
	creditcard: 'Zadané číslo kreditnej karty je neplatné. Prosím, opravte ho. Bolo zadaných {length} číslic.'

});

/*
---

name: Locale.si-SI.Date

description: Date messages for Slovenian.

license: MIT-style license

authors:
  - Radovan Lozej

requires:
  - Locale

provides: [Locale.si-SI.Date]

...
*/

(function(){

var pluralize = function(n, one, two, three, other){
	return (n >= 1 && n <= 3) ? arguments[n] : other;
};

Locale.define('sl-SI', 'Date', {

	months: ['januar', 'februar', 'marec', 'april', 'maj', 'junij', 'julij', 'avgust', 'september', 'oktober', 'november', 'december'],
	months_abbr: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
	days: ['nedelja', 'ponedeljek', 'torek', 'sreda', 'četrtek', 'petek', 'sobota'],
	days_abbr: ['ned', 'pon', 'tor', 'sre', 'čet', 'pet', 'sob'],

	// Culture's date order: DD.MM.YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d.%m.%Y',
	shortTime: '%H.%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '.',

	lessThanMinuteAgo: 'manj kot minuto nazaj',
	minuteAgo: 'minuto nazaj',
	minutesAgo: function(delta){ return '{delta} ' + pluralize(delta, 'minuto', 'minuti', 'minute', 'minut') + ' nazaj'; },
	hourAgo: 'uro nazaj',
	hoursAgo: function(delta){ return '{delta} ' + pluralize(delta, 'uro', 'uri', 'ure', 'ur') + ' nazaj'; },
	dayAgo: 'dan nazaj',
	daysAgo: function(delta){ return '{delta} ' + pluralize(delta, 'dan', 'dneva', 'dni', 'dni') + ' nazaj'; },
	weekAgo: 'teden nazaj',
	weeksAgo: function(delta){ return '{delta} ' + pluralize(delta, 'teden', 'tedna', 'tedne', 'tednov') + ' nazaj'; },
	monthAgo: 'mesec nazaj',
	monthsAgo: function(delta){ return '{delta} ' + pluralize(delta, 'mesec', 'meseca', 'mesece', 'mesecov') + ' nazaj'; },
	yearthAgo: 'leto nazaj',
	yearsAgo: function(delta){ return '{delta} ' + pluralize(delta, 'leto', 'leti', 'leta', 'let') + ' nazaj'; },

	lessThanMinuteUntil: 'še manj kot minuto',
	minuteUntil: 'še minuta',
	minutesUntil: function(delta){ return 'še {delta} ' + pluralize(delta, 'minuta', 'minuti', 'minute', 'minut'); },
	hourUntil: 'še ura',
	hoursUntil: function(delta){ return 'še {delta} ' + pluralize(delta, 'ura', 'uri', 'ure', 'ur'); },
	dayUntil: 'še dan',
	daysUntil: function(delta){ return 'še {delta} ' + pluralize(delta, 'dan', 'dneva', 'dnevi', 'dni'); },
	weekUntil: 'še tedn',
	weeksUntil: function(delta){ return 'še {delta} ' + pluralize(delta, 'teden', 'tedna', 'tedni', 'tednov'); },
	monthUntil: 'še mesec',
	monthsUntil: function(delta){ return 'še {delta} ' + pluralize(delta, 'mesec', 'meseca', 'meseci', 'mesecov'); },
	yearUntil: 'še leto',
	yearsUntil: function(delta){ return 'še {delta} ' + pluralize(delta, 'leto', 'leti', 'leta', 'let'); }

});

})();

/*
---

name: Locale.si-SI.Form.Validator

description: Form Validator messages for Slovenian.

license: MIT-style license

authors:
  - Radovan Lozej

requires:
  - Locale

provides: [Locale.si-SI.Form.Validator]

...
*/

Locale.define('sl-SI', 'FormValidator', {

	required: 'To polje je obvezno',
	minLength: 'Prosim, vnesite vsaj {minLength} znakov (vnesli ste {length} znakov).',
	maxLength: 'Prosim, ne vnesite več kot {maxLength} znakov (vnesli ste {length} znakov).',
	integer: 'Prosim, vnesite celo število. Decimalna števila (kot 1,25) niso dovoljena.',
	numeric: 'Prosim, vnesite samo numerične vrednosti (kot "1" ali "1.1" ali "-1" ali "-1.1").',
	digits: 'Prosim, uporabite številke in ločila le na tem polju (na primer, dovoljena je telefonska številka z pomišlaji ali pikami).',
	alpha: 'Prosim, uporabite le črke v tem plju. Presledki in drugi znaki niso dovoljeni.',
	alphanum: 'Prosim, uporabite samo črke ali številke v tem polju. Presledki in drugi znaki niso dovoljeni.',
	dateSuchAs: 'Prosim, vnesite pravilen datum kot {date}',
	dateInFormatMDY: 'Prosim, vnesite pravilen datum kot MM.DD.YYYY (primer "12.31.1999")',
	email: 'Prosim, vnesite pravilen email naslov. Na primer "fred@domain.com".',
	url: 'Prosim, vnesite pravilen URL kot http://www.example.com.',
	currencyDollar: 'Prosim, vnesit epravilno vrednost €. Primer 100,00€ .',
	oneRequired: 'Prosimo, vnesite nekaj za vsaj eno izmed teh polj.',
	errorPrefix: 'Napaka: ',
	warningPrefix: 'Opozorilo: ',

	// Form.Validator.Extras
	noSpace: 'To vnosno polje ne dopušča presledkov.',
	reqChkByNode: 'Nič niste izbrali.',
	requiredChk: 'To polje je obvezno',
	reqChkByName: 'Prosim, izberite {label}.',
	match: 'To polje se mora ujemati z poljem {matchName}',
	startDate: 'datum začetka',
	endDate: 'datum konca',
	currentDate: 'trenuten datum',
	afterDate: 'Datum bi moral biti isti ali po {label}.',
	beforeDate: 'Datum bi moral biti isti ali pred {label}.',
	startMonth: 'Prosim, vnesite začetni datum',
	sameMonth: 'Ta dva datuma morata biti v istem mesecu - premeniti morate eno ali drugo.',
	creditcard: 'Številka kreditne kartice ni pravilna. Preverite številko ali poskusite še enkrat. Vnešenih {length} znakov.'

});

/*
---

name: Locale.sv-SE.Date

description: Date messages for Swedish.

license: MIT-style license

authors:
  - Martin Lundgren

requires:
  - Locale

provides: [Locale.sv-SE.Date]

...
*/

Locale.define('sv-SE', 'Date', {

	months: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'],
	months_abbr: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
	days: ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'],
	days_abbr: ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'],

	// Culture's date order: YYYY-MM-DD
	dateOrder: ['year', 'month', 'date'],
	shortDate: '%Y-%m-%d',
	shortTime: '%H:%M',
	AM: '',
	PM: '',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: 'mindre än en minut sedan',
	minuteAgo: 'ungefär en minut sedan',
	minutesAgo: '{delta} minuter sedan',
	hourAgo: 'ungefär en timme sedan',
	hoursAgo: 'ungefär {delta} timmar sedan',
	dayAgo: '1 dag sedan',
	daysAgo: '{delta} dagar sedan',

	lessThanMinuteUntil: 'mindre än en minut sedan',
	minuteUntil: 'ungefär en minut sedan',
	minutesUntil: '{delta} minuter sedan',
	hourUntil: 'ungefär en timme sedan',
	hoursUntil: 'ungefär {delta} timmar sedan',
	dayUntil: '1 dag sedan',
	daysUntil: '{delta} dagar sedan'

});

/*
---

name: Locale.sv-SE.Form.Validator

description: Form Validator messages for Swedish.

license: MIT-style license

authors:
  - Martin Lundgren

requires:
  - Locale

provides: [Locale.sv-SE.Form.Validator]

...
*/

Locale.define('sv-SE', 'FormValidator', {

	required: 'Fältet är obligatoriskt.',
	minLength: 'Ange minst {minLength} tecken (du angav {length} tecken).',
	maxLength: 'Ange högst {maxLength} tecken (du angav {length} tecken). ',
	integer: 'Ange ett heltal i fältet. Tal med decimaler (t.ex. 1,25) är inte tillåtna.',
	numeric: 'Ange endast numeriska värden i detta fält (t.ex. "1" eller "1.1" eller "-1" eller "-1,1").',
	digits: 'Använd endast siffror och skiljetecken i detta fält (till exempel ett telefonnummer med bindestreck tillåtet).',
	alpha: 'Använd endast bokstäver (a-ö) i detta fält. Inga mellanslag eller andra tecken är tillåtna.',
	alphanum: 'Använd endast bokstäver (a-ö) och siffror (0-9) i detta fält. Inga mellanslag eller andra tecken är tillåtna.',
	dateSuchAs: 'Ange ett giltigt datum som t.ex. {date}',
	dateInFormatMDY: 'Ange ett giltigt datum som t.ex. YYYY-MM-DD (i.e. "1999-12-31")',
	email: 'Ange en giltig e-postadress. Till exempel "erik@domain.com".',
	url: 'Ange en giltig webbadress som http://www.example.com.',
	currencyDollar: 'Ange en giltig belopp. Exempelvis 100,00.',
	oneRequired: 'Vänligen ange minst ett av dessa alternativ.',
	errorPrefix: 'Fel: ',
	warningPrefix: 'Varning: ',

	// Form.Validator.Extras
	noSpace: 'Det får inte finnas några mellanslag i detta fält.',
	reqChkByNode: 'Inga objekt är valda.',
	requiredChk: 'Detta är ett obligatoriskt fält.',
	reqChkByName: 'Välj en {label}.',
	match: 'Detta fält måste matcha {matchName}',
	startDate: 'startdatumet',
	endDate: 'slutdatum',
	currentDate: 'dagens datum',
	afterDate: 'Datumet bör vara samma eller senare än {label}.',
	beforeDate: 'Datumet bör vara samma eller tidigare än {label}.',
	startMonth: 'Välj en start månad',
	sameMonth: 'Dessa två datum måste vara i samma månad - du måste ändra det ena eller det andra.'

});

/*
---

name: Locale.sv-SE.Number

description: Number messages for Swedish.

license: MIT-style license

authors:
  - Arian Stolwijk
  - Martin Lundgren

requires:
  - Locale
  - Locale.EU.Number

provides: [Locale.sv-SE.Number]

...
*/

Locale.define('sv-SE', 'Number', {

	currency: {
		prefix: 'SEK '
	}

}).inherit('EU', 'Number');

/*
---

name: Locale.tr-TR.Date

description: Date messages for Turkish.

license: MIT-style license

authors:
  - Faruk Can Bilir

requires:
  - Locale

provides: [Locale.tr-TR.Date]

...
*/

Locale.define('tr-TR', 'Date', {

	months: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
	months_abbr: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
	days: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
	days_abbr: ['Pa', 'Pzt', 'Sa', 'Ça', 'Pe', 'Cu', 'Cmt'],

	// Culture's date order: MM/DD/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H.%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: 'bir dakikadan önce',
	minuteAgo: 'yaklaşık bir dakika önce',
	minutesAgo: '{delta} dakika önce',
	hourAgo: 'bir saat kadar önce',
	hoursAgo: '{delta} saat kadar önce',
	dayAgo: 'bir gün önce',
	daysAgo: '{delta} gün önce',
	weekAgo: 'bir hafta önce',
	weeksAgo: '{delta} hafta önce',
	monthAgo: 'bir ay önce',
	monthsAgo: '{delta} ay önce',
	yearAgo: 'bir yıl önce',
	yearsAgo: '{delta} yıl önce',

	lessThanMinuteUntil: 'bir dakikadan az sonra',
	minuteUntil: 'bir dakika kadar sonra',
	minutesUntil: '{delta} dakika sonra',
	hourUntil: 'bir saat kadar sonra',
	hoursUntil: '{delta} saat kadar sonra',
	dayUntil: 'bir gün sonra',
	daysUntil: '{delta} gün sonra',
	weekUntil: 'bir hafta sonra',
	weeksUntil: '{delta} hafta sonra',
	monthUntil: 'bir ay sonra',
	monthsUntil: '{delta} ay sonra',
	yearUntil: 'bir yıl sonra',
	yearsUntil: '{delta} yıl sonra'

});

/*
---

name: Locale.tr-TR.Form.Validator

description: Form Validator messages for Turkish.

license: MIT-style license

authors:
  - Faruk Can Bilir

requires:
  - Locale

provides: [Locale.tr-TR.Form.Validator]

...
*/

Locale.define('tr-TR', 'FormValidator', {

	required: 'Bu alan zorunlu.',
	minLength: 'Lütfen en az {minLength} karakter girin (siz {length} karakter girdiniz).',
	maxLength: 'Lütfen en fazla {maxLength} karakter girin (siz {length} karakter girdiniz).',
	integer: 'Lütfen bu alana sadece tamsayı girin. Ondalıklı sayılar (ör: 1.25) kullanılamaz.',
	numeric: 'Lütfen bu alana sadece sayısal değer girin (ör: "1", "1.1", "-1" ya da "-1.1").',
	digits: 'Lütfen bu alana sadece sayısal değer ve noktalama işareti girin (örneğin, nokta ve tire içeren bir telefon numarası kullanılabilir).',
	alpha: 'Lütfen bu alanda yalnızca harf kullanın. Boşluk ve diğer karakterler kullanılamaz.',
	alphanum: 'Lütfen bu alanda sadece harf ve rakam kullanın. Boşluk ve diğer karakterler kullanılamaz.',
	dateSuchAs: 'Lütfen geçerli bir tarih girin (Ör: {date})',
	dateInFormatMDY: 'Lütfen geçerli bir tarih girin (GG/AA/YYYY, ör: "31/12/1999")',
	email: 'Lütfen geçerli bir email adresi girin. Ör: "kemal@etikan.com".',
	url: 'Lütfen geçerli bir URL girin. Ör: http://www.example.com.',
	currencyDollar: 'Lütfen geçerli bir TL miktarı girin. Ör: 100,00 TL .',
	oneRequired: 'Lütfen en az bir tanesini doldurun.',
	errorPrefix: 'Hata: ',
	warningPrefix: 'Uyarı: ',

	// Form.Validator.Extras
	noSpace: 'Bu alanda boşluk kullanılamaz.',
	reqChkByNode: 'Hiçbir öğe seçilmemiş.',
	requiredChk: 'Bu alan zorunlu.',
	reqChkByName: 'Lütfen bir {label} girin.',
	match: 'Bu alan, {matchName} alanıyla uyuşmalı',
	startDate: 'başlangıç tarihi',
	endDate: 'bitiş tarihi',
	currentDate: 'bugünün tarihi',
	afterDate: 'Tarih, {label} tarihiyle aynı gün ya da ondan sonra olmalıdır.',
	beforeDate: 'Tarih, {label} tarihiyle aynı gün ya da ondan önce olmalıdır.',
	startMonth: 'Lütfen bir başlangıç ayı seçin',
	sameMonth: 'Bu iki tarih aynı ayda olmalı - bir tanesini değiştirmeniz gerekiyor.',
	creditcard: 'Girdiğiniz kredi kartı numarası geçersiz. Lütfen kontrol edip tekrar deneyin. {length} hane girildi.'

});

/*
---

name: Locale.tr-TR.Number

description: Number messages for Turkish.

license: MIT-style license

authors:
  - Faruk Can Bilir

requires:
  - Locale
  - Locale.EU.Number

provides: [Locale.tr-TR.Number]

...
*/

Locale.define('tr-TR', 'Number', {

	currency: {
		decimals: 0,
		suffix: ' TL'
	}

}).inherit('EU', 'Number');

/*
---

name: Locale.uk-UA.Date

description: Date messages for Ukrainian (utf-8).

license: MIT-style license

authors:
  - Slik

requires:
  - Locale

provides: [Locale.uk-UA.Date]

...
*/

(function(){

var pluralize = function(n, one, few, many, other){
	var d = (n / 10).toInt(),
		z = n % 10,
		s = (n / 100).toInt();

	if (d == 1 && n > 10) return many;
	if (z == 1) return one;
	if (z > 0 && z < 5) return few;
	return many;
};

Locale.define('uk-UA', 'Date', {

	months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
	months_abbr: ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд' ],
	days: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота'],
	days_abbr: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M',
	AM: 'до полудня',
	PM: 'по полудню',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: 'меньше хвилини тому',
	minuteAgo: 'хвилину тому',
	minutesAgo: function(delta){ return '{delta} ' + pluralize(delta, 'хвилину', 'хвилини', 'хвилин') + ' тому'; },
	hourAgo: 'годину тому',
	hoursAgo: function(delta){ return '{delta} ' + pluralize(delta, 'годину', 'години', 'годин') + ' тому'; },
	dayAgo: 'вчора',
	daysAgo: function(delta){ return '{delta} ' + pluralize(delta, 'день', 'дня', 'днів') + ' тому'; },
	weekAgo: 'тиждень тому',
	weeksAgo: function(delta){ return '{delta} ' + pluralize(delta, 'тиждень', 'тижні', 'тижнів') + ' тому'; },
	monthAgo: 'місяць тому',
	monthsAgo: function(delta){ return '{delta} ' + pluralize(delta, 'місяць', 'місяці', 'місяців') + ' тому'; },
	yearAgo: 'рік тому',
	yearsAgo: function(delta){ return '{delta} ' + pluralize(delta, 'рік', 'роки', 'років') + ' тому'; },

	lessThanMinuteUntil: 'за мить',
	minuteUntil: 'через хвилину',
	minutesUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'хвилину', 'хвилини', 'хвилин'); },
	hourUntil: 'через годину',
	hoursUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'годину', 'години', 'годин'); },
	dayUntil: 'завтра',
	daysUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'день', 'дня', 'днів'); },
	weekUntil: 'через тиждень',
	weeksUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'тиждень', 'тижні', 'тижнів'); },
	monthUntil: 'через місяць',
	monthesUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'місяць', 'місяці', 'місяців'); },
	yearUntil: 'через рік',
	yearsUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'рік', 'роки', 'років'); }

});

})();

/*
---

name: Locale.uk-UA.Form.Validator

description: Form Validator messages for Ukrainian (utf-8).

license: MIT-style license

authors:
  - Slik

requires:
  - Locale

provides: [Locale.uk-UA.Form.Validator]

...
*/

Locale.define('uk-UA', 'FormValidator', {

	required: 'Це поле повинне бути заповненим.',
	minLength: 'Введіть хоча б {minLength} символів (Ви ввели {length}).',
	maxLength: 'Кількість символів не може бути більше {maxLength} (Ви ввели {length}).',
	integer: 'Введіть в це поле число. Дробові числа (наприклад 1.25) не дозволені.',
	numeric: 'Введіть в це поле число (наприклад "1" або "1.1", або "-1", або "-1.1").',
	digits: 'В цьому полі ви можете використовувати лише цифри і знаки пунктіації (наприклад, телефонний номер з знаками дефізу або з крапками).',
	alpha: 'В цьому полі можна використовувати лише латинські літери (a-z). Пробіли і інші символи заборонені.',
	alphanum: 'В цьому полі можна використовувати лише латинські літери (a-z) і цифри (0-9). Пробіли і інші символи заборонені.',
	dateSuchAs: 'Введіть коректну дату {date}.',
	dateInFormatMDY: 'Введіть дату в форматі ММ/ДД/РРРР (наприклад "12/31/2009").',
	email: 'Введіть коректну адресу електронної пошти (наприклад "name@domain.com").',
	url: 'Введіть коректне інтернет-посилання (наприклад http://www.example.com).',
	currencyDollar: 'Введіть суму в доларах (наприклад "$100.00").',
	oneRequired: 'Заповніть одне з полів.',
	errorPrefix: 'Помилка: ',
	warningPrefix: 'Увага: ',

	noSpace: 'Пробіли заборонені.',
	reqChkByNode: 'Не відмічено жодного варіанту.',
	requiredChk: 'Це поле повинне бути віміченим.',
	reqChkByName: 'Будь ласка, відмітьте {label}.',
	match: 'Це поле повинно відповідати {matchName}',
	startDate: 'початкова дата',
	endDate: 'кінцева дата',
	currentDate: 'сьогоднішня дата',
	afterDate: 'Ця дата повинна бути такою ж, або пізнішою за {label}.',
	beforeDate: 'Ця дата повинна бути такою ж, або ранішою за {label}.',
	startMonth: 'Будь ласка, виберіть початковий місяць',
	sameMonth: 'Ці дати повинні відноситись одного і того ж місяця. Будь ласка, змініть одну з них.',
	creditcard: 'Номер кредитної карти введений неправильно. Будь ласка, перевірте його. Введено {length} символів.'

});

/*
---

name: Locale.zh-CH.Date

description: Date messages for Chinese (simplified and traditional).

license: MIT-style license

authors:
  - YMind Chan

requires:
  - Locale

provides: [Locale.zh-CH.Date]

...
*/

// Simplified Chinese
Locale.define('zh-CHS', 'Date', {

	months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	months_abbr: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
	days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	days_abbr: ['日', '一', '二', '三', '四', '五', '六'],

	// Culture's date order: YYYY-MM-DD
	dateOrder: ['year', 'month', 'date'],
	shortDate: '%Y-%m-%d',
	shortTime: '%I:%M%p',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: '不到1分钟前',
	minuteAgo: '大约1分钟前',
	minutesAgo: '{delta}分钟之前',
	hourAgo: '大约1小时前',
	hoursAgo: '大约{delta}小时前',
	dayAgo: '1天前',
	daysAgo: '{delta}天前',
	weekAgo: '1星期前',
	weeksAgo: '{delta}星期前',
	monthAgo: '1个月前',
	monthsAgo: '{delta}个月前',
	yearAgo: '1年前',
	yearsAgo: '{delta}年前',

	lessThanMinuteUntil: '从现在开始不到1分钟',
	minuteUntil: '从现在开始約1分钟',
	minutesUntil: '从现在开始约{delta}分钟',
	hourUntil: '从现在开始1小时',
	hoursUntil: '从现在开始约{delta}小时',
	dayUntil: '从现在开始1天',
	daysUntil: '从现在开始{delta}天',
	weekUntil: '从现在开始1星期',
	weeksUntil: '从现在开始{delta}星期',
	monthUntil: '从现在开始一个月',
	monthsUntil: '从现在开始{delta}个月',
	yearUntil: '从现在开始1年',
	yearsUntil: '从现在开始{delta}年'

});

// Traditional Chinese
Locale.define('zh-CHT', 'Date', {

	months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	months_abbr: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
	days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	days_abbr: ['日', '一', '二', '三', '四', '五', '六'],

	// Culture's date order: YYYY-MM-DD
	dateOrder: ['year', 'month', 'date'],
	shortDate: '%Y-%m-%d',
	shortTime: '%I:%M%p',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: '不到1分鐘前',
	minuteAgo: '大約1分鐘前',
	minutesAgo: '{delta}分鐘之前',
	hourAgo: '大約1小時前',
	hoursAgo: '大約{delta}小時前',
	dayAgo: '1天前',
	daysAgo: '{delta}天前',
	weekAgo: '1星期前',
	weeksAgo: '{delta}星期前',
	monthAgo: '1个月前',
	monthsAgo: '{delta}个月前',
	yearAgo: '1年前',
	yearsAgo: '{delta}年前',

	lessThanMinuteUntil: '從現在開始不到1分鐘',
	minuteUntil: '從現在開始約1分鐘',
	minutesUntil: '從現在開始約{delta}分鐘',
	hourUntil: '從現在開始1小時',
	hoursUntil: '從現在開始約{delta}小時',
	dayUntil: '從現在開始1天',
	daysUntil: '從現在開始{delta}天',
	weekUntil: '從現在開始1星期',
	weeksUntil: '從現在開始{delta}星期',
	monthUntil: '從現在開始一個月',
	monthsUntil: '從現在開始{delta}個月',
	yearUntil: '從現在開始1年',
	yearsUntil: '從現在開始{delta}年'

});

/*
---

name: Locale.zh-CH.Form.Validator

description: Form Validator messages for Chinese (simplified and traditional).

license: MIT-style license

authors:
  - YMind Chan

requires:
  - Locale
  - Form.Validator

provides: [Form.zh-CH.Form.Validator, Form.Validator.CurrencyYuanValidator]

...
*/

// Simplified Chinese
Locale.define('zh-CHS', 'FormValidator', {

	required: '此项必填。',
	minLength: '请至少输入 {minLength} 个字符 (已输入 {length} 个)。',
	maxLength: '最多只能输入 {maxLength} 个字符 (已输入 {length} 个)。',
	integer: '请输入一个整数，不能包含小数点。例如："1", "200"。',
	numeric: '请输入一个数字，例如："1", "1.1", "-1", "-1.1"。',
	digits: '请输入由数字和标点符号组成的内容。例如电话号码。',
	alpha: '请输入 A-Z 的 26 个字母，不能包含空格或任何其他字符。',
	alphanum: '请输入 A-Z 的 26 个字母或 0-9 的 10 个数字，不能包含空格或任何其他字符。',
	dateSuchAs: '请输入合法的日期格式，如：{date}。',
	dateInFormatMDY: '请输入合法的日期格式，例如：YYYY-MM-DD ("2010-12-31")。',
	email: '请输入合法的电子信箱地址，例如："fred@domain.com"。',
	url: '请输入合法的 Url 地址，例如：http://www.example.com。',
	currencyDollar: '请输入合法的货币符号，例如：￥100.0',
	oneRequired: '请至少选择一项。',
	errorPrefix: '错误：',
	warningPrefix: '警告：',

	// Form.Validator.Extras
	noSpace: '不能包含空格。',
	reqChkByNode: '未选择任何内容。',
	requiredChk: '此项必填。',
	reqChkByName: '请选择 {label}.',
	match: '必须与{matchName}相匹配',
	startDate: '起始日期',
	endDate: '结束日期',
	currentDate: '当前日期',
	afterDate: '日期必须等于或晚于 {label}.',
	beforeDate: '日期必须早于或等于 {label}.',
	startMonth: '请选择起始月份',
	sameMonth: '您必须修改两个日期中的一个，以确保它们在同一月份。',
	creditcard: '您输入的信用卡号码不正确。当前已输入{length}个字符。'

});

// Traditional Chinese
Locale.define('zh-CHT', 'FormValidator', {

	required: '此項必填。 ',
	minLength: '請至少輸入{minLength} 個字符(已輸入{length} 個)。 ',
	maxLength: '最多只能輸入{maxLength} 個字符(已輸入{length} 個)。 ',
	integer: '請輸入一個整數，不能包含小數點。例如："1", "200"。 ',
	numeric: '請輸入一個數字，例如："1", "1.1", "-1", "-1.1"。 ',
	digits: '請輸入由數字和標點符號組成的內容。例如電話號碼。 ',
	alpha: '請輸入AZ 的26 個字母，不能包含空格或任何其他字符。 ',
	alphanum: '請輸入AZ 的26 個字母或0-9 的10 個數字，不能包含空格或任何其他字符。 ',
	dateSuchAs: '請輸入合法的日期格式，如：{date}。 ',
	dateInFormatMDY: '請輸入合法的日期格式，例如：YYYY-MM-DD ("2010-12-31")。 ',
	email: '請輸入合法的電子信箱地址，例如："fred@domain.com"。 ',
	url: '請輸入合法的Url 地址，例如：http://www.example.com。 ',
	currencyDollar: '請輸入合法的貨幣符號，例如：￥100.0',
	oneRequired: '請至少選擇一項。 ',
	errorPrefix: '錯誤：',
	warningPrefix: '警告：',

	// Form.Validator.Extras
	noSpace: '不能包含空格。 ',
	reqChkByNode: '未選擇任何內容。 ',
	requiredChk: '此項必填。 ',
	reqChkByName: '請選擇 {label}.',
	match: '必須與{matchName}相匹配',
	startDate: '起始日期',
	endDate: '結束日期',
	currentDate: '當前日期',
	afterDate: '日期必須等於或晚於{label}.',
	beforeDate: '日期必須早於或等於{label}.',
	startMonth: '請選擇起始月份',
	sameMonth: '您必須修改兩個日期中的一個，以確保它們在同一月份。 ',
	creditcard: '您輸入的信用卡號碼不正確。當前已輸入{length}個字符。 '

});

Form.Validator.add('validate-currency-yuan', {

	errorMsg: function(){
		return Form.Validator.getMsg('currencyYuan');
	},

	test: function(element){
		// [￥]1[##][,###]+[.##]
		// [￥]1###+[.##]
		// [￥]0.##
		// [￥].##
		return Form.Validator.getValidator('IsEmpty').test(element) || (/^￥?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/).test(element.get('value'));
	}

});

/*
---

name: Locale.zh-CH.Number

description: Number messages for for Chinese (simplified and traditional).

license: MIT-style license

authors:
  - YMind Chan

requires:
  - Locale
  - Locale.en-US.Number

provides: [Locale.zh-CH.Number]

...
*/

// Simplified Chinese
Locale.define('zh-CHS', 'Number', {

	currency: {
		prefix: '￥ '
	}

}).inherit('en-US', 'Number');

// Traditional Chinese
Locale.define('zh-CHT').inherit('zh-CHS', 'Number');

/*
---

script: Request.JSONP.js

name: Request.JSONP

description: Defines Request.JSONP, a class for cross domain javascript via script injection.

license: MIT-style license

authors:
  - Aaron Newton
  - Guillermo Rauch
  - Arian Stolwijk

requires:
  - Core/Element
  - Core/Request
  - MooTools.More

provides: [Request.JSONP]

...
*/

Request.JSONP = new Class({

	Implements: [Chain, Events, Options],

	options: {/*
		onRequest: function(src, scriptElement){},
		onComplete: function(data){},
		onSuccess: function(data){},
		onCancel: function(){},
		onTimeout: function(){},
		onError: function(){}, */
		onRequest: function(src){
			if (this.options.log && window.console && console.log){
				console.log('JSONP retrieving script with url:' + src);
			}
		},
		onError: function(src){
			if (this.options.log && window.console && console.warn){
				console.warn('JSONP '+ src +' will fail in Internet Explorer, which enforces a 2083 bytes length limit on URIs');
			}
		},
		url: '',
		callbackKey: 'callback',
		injectScript: document.head,
		data: '',
		link: 'ignore',
		timeout: 0,
		log: false
	},

	initialize: function(options){
		this.setOptions(options);
	},

	send: function(options){
		if (!Request.prototype.check.call(this, options)) return this;
		this.running = true;

		var type = typeOf(options);
		if (type == 'string' || type == 'element') options = {data: options};
		options = Object.merge(this.options, options || {});

		var data = options.data;
		switch (typeOf(data)){
			case 'element': data = document.id(data).toQueryString(); break;
			case 'object': case 'hash': data = Object.toQueryString(data);
		}

		var index = this.index = Request.JSONP.counter++;

		var src = options.url +
			(options.url.test('\\?') ? '&' :'?') +
			(options.callbackKey) +
			'=Request.JSONP.request_map.request_'+ index +
			(data ? '&' + data : '');

		if (src.length > 2083) this.fireEvent('error', src);

		Request.JSONP.request_map['request_' + index] = function(){
			this.success(arguments, index);
		}.bind(this);

		var script = this.getScript(src).inject(options.injectScript);
		this.fireEvent('request', [src, script]);

		if (options.timeout) this.timeout.delay(options.timeout, this);

		return this;
	},

	getScript: function(src){
		if (!this.script) this.script = new Element('script', {
			type: 'text/javascript',
			async: true,
			src: src
		});
		return this.script;
	},

	success: function(args, index){
		if (!this.running) return;
		this.clear()
			.fireEvent('complete', args).fireEvent('success', args)
			.callChain();
	},

	cancel: function(){
		if (this.running) this.clear().fireEvent('cancel');
		return this;
	},

	isRunning: function(){
		return !!this.running;
	},

	clear: function(){
		this.running = false;
		if (this.script){
			this.script.destroy();
			this.script = null;
		}
		return this;
	},

	timeout: function(){
		if (this.running){
			this.running = false;
			this.fireEvent('timeout', [this.script.get('src'), this.script]).fireEvent('failure').cancel();
		}
		return this;
	}

});

Request.JSONP.counter = 0;
Request.JSONP.request_map = {};

/*
---

script: Request.Periodical.js

name: Request.Periodical

description: Requests the same URL to pull data from a server but increases the intervals if no data is returned to reduce the load

license: MIT-style license

authors:
  - Christoph Pojer

requires:
  - Core/Request
  - MooTools.More

provides: [Request.Periodical]

...
*/

Request.implement({

	options: {
		initialDelay: 5000,
		delay: 5000,
		limit: 60000
	},

	startTimer: function(data){
		var fn = function(){
			if (!this.running) this.send({data: data});
		};
		this.lastDelay = this.options.initialDelay;
		this.timer = fn.delay(this.lastDelay, this);
		this.completeCheck = function(response){
			clearTimeout(this.timer);
			this.lastDelay = (response) ? this.options.delay : (this.lastDelay + this.options.delay).min(this.options.limit);
			this.timer = fn.delay(this.lastDelay, this);
		};
		return this.addEvent('complete', this.completeCheck);
	},

	stopTimer: function(){
		clearTimeout(this.timer);
		return this.removeEvent('complete', this.completeCheck);
	}

});

/*
---

script: Request.Queue.js

name: Request.Queue

description: Controls several instances of Request and its variants to run only one request at a time.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Element
  - Core/Request
  - Class.Binds

provides: [Request.Queue]

...
*/

Request.Queue = new Class({

	Implements: [Options, Events],

	Binds: ['attach', 'request', 'complete', 'cancel', 'success', 'failure', 'exception'],

	options: {/*
		onRequest: function(argsPassedToOnRequest){},
		onSuccess: function(argsPassedToOnSuccess){},
		onComplete: function(argsPassedToOnComplete){},
		onCancel: function(argsPassedToOnCancel){},
		onException: function(argsPassedToOnException){},
		onFailure: function(argsPassedToOnFailure){},
		onEnd: function(){},
		*/
		stopOnFailure: true,
		autoAdvance: true,
		concurrent: 1,
		requests: {}
	},

	initialize: function(options){
		var requests;
		if (options){
			requests = options.requests;
			delete options.requests;
		}
		this.setOptions(options);
		this.requests = {};
		this.queue = [];
		this.reqBinders = {};

		if (requests) this.addRequests(requests);
	},

	addRequest: function(name, request){
		this.requests[name] = request;
		this.attach(name, request);
		return this;
	},

	addRequests: function(obj){
		Object.each(obj, function(req, name){
			this.addRequest(name, req);
		}, this);
		return this;
	},

	getName: function(req){
		return Object.keyOf(this.requests, req);
	},

	attach: function(name, req){
		if (req._groupSend) return this;
		['request', 'complete', 'cancel', 'success', 'failure', 'exception'].each(function(evt){
			if (!this.reqBinders[name]) this.reqBinders[name] = {};
			this.reqBinders[name][evt] = function(){
				this['on' + evt.capitalize()].apply(this, [name, req].append(arguments));
			}.bind(this);
			req.addEvent(evt, this.reqBinders[name][evt]);
		}, this);
		req._groupSend = req.send;
		req.send = function(options){
			this.send(name, options);
			return req;
		}.bind(this);
		return this;
	},

	removeRequest: function(req){
		var name = typeOf(req) == 'object' ? this.getName(req) : req;
		if (!name && typeOf(name) != 'string') return this;
		req = this.requests[name];
		if (!req) return this;
		['request', 'complete', 'cancel', 'success', 'failure', 'exception'].each(function(evt){
			req.removeEvent(evt, this.reqBinders[name][evt]);
		}, this);
		req.send = req._groupSend;
		delete req._groupSend;
		return this;
	},

	getRunning: function(){
		return Object.filter(this.requests, function(r){
			return r.running;
		});
	},

	isRunning: function(){
		return !!(Object.keys(this.getRunning()).length);
	},

	send: function(name, options){
		var q = function(){
			this.requests[name]._groupSend(options);
			this.queue.erase(q);
		}.bind(this);

		q.name = name;
		if (Object.keys(this.getRunning()).length >= this.options.concurrent || (this.error && this.options.stopOnFailure)) this.queue.push(q);
		else q();
		return this;
	},

	hasNext: function(name){
		return (!name) ? !!this.queue.length : !!this.queue.filter(function(q){ return q.name == name; }).length;
	},

	resume: function(){
		this.error = false;
		(this.options.concurrent - Object.keys(this.getRunning()).length).times(this.runNext, this);
		return this;
	},

	runNext: function(name){
		if (!this.queue.length) return this;
		if (!name){
			this.queue[0]();
		} else {
			var found;
			this.queue.each(function(q){
				if (!found && q.name == name){
					found = true;
					q();
				}
			});
		}
		return this;
	},

	runAll: function(){
		this.queue.each(function(q){
			q();
		});
		return this;
	},

	clear: function(name){
		if (!name){
			this.queue.empty();
		} else {
			this.queue = this.queue.map(function(q){
				if (q.name != name) return q;
				else return false;
			}).filter(function(q){
				return q;
			});
		}
		return this;
	},

	cancel: function(name){
		this.requests[name].cancel();
		return this;
	},

	onRequest: function(){
		this.fireEvent('request', arguments);
	},

	onComplete: function(){
		this.fireEvent('complete', arguments);
		if (!this.queue.length) this.fireEvent('end');
	},

	onCancel: function(){
		if (this.options.autoAdvance && !this.error) this.runNext();
		this.fireEvent('cancel', arguments);
	},

	onSuccess: function(){
		if (this.options.autoAdvance && !this.error) this.runNext();
		this.fireEvent('success', arguments);
	},

	onFailure: function(){
		this.error = true;
		if (!this.options.stopOnFailure && this.options.autoAdvance) this.runNext();
		this.fireEvent('failure', arguments);
	},

	onException: function(){
		this.error = true;
		if (!this.options.stopOnFailure && this.options.autoAdvance) this.runNext();
		this.fireEvent('exception', arguments);
	}

});

/*
---

script: Array.Extras.js

name: Array.Extras

description: Extends the Array native object to include useful methods to work with arrays.

license: MIT-style license

authors:
  - Christoph Pojer
  - Sebastian Markbåge

requires:
  - Core/Array
  - MooTools.More

provides: [Array.Extras]

...
*/

(function(nil){

Array.implement({

	min: function(){
		return Math.min.apply(null, this);
	},

	max: function(){
		return Math.max.apply(null, this);
	},

	average: function(){
		return this.length ? this.sum() / this.length : 0;
	},

	sum: function(){
		var result = 0, l = this.length;
		if (l){
			while (l--){
				if (this[l] != null) result += parseFloat(this[l]);
			}
		}
		return result;
	},

	unique: function(){
		return [].combine(this);
	},

	shuffle: function(){
		for (var i = this.length; i && --i;){
			var temp = this[i], r = Math.floor(Math.random() * ( i + 1 ));
			this[i] = this[r];
			this[r] = temp;
		}
		return this;
	},

	reduce: function(fn, value){
		for (var i = 0, l = this.length; i < l; i++){
			if (i in this) value = value === nil ? this[i] : fn.call(null, value, this[i], i, this);
		}
		return value;
	},

	reduceRight: function(fn, value){
		var i = this.length;
		while (i--){
			if (i in this) value = value === nil ? this[i] : fn.call(null, value, this[i], i, this);
		}
		return value;
	},

	pluck: function(prop){
		return this.map(function(item){
			return item[prop];
		});
	}

});

})();

/*
---

script: Date.Extras.js

name: Date.Extras

description: Extends the Date native object to include extra methods (on top of those in Date.js).

license: MIT-style license

authors:
  - Aaron Newton
  - Scott Kyle

requires:
  - Date

provides: [Date.Extras]

...
*/

Date.implement({

	timeDiffInWords: function(to){
		return Date.distanceOfTimeInWords(this, to || new Date);
	},

	timeDiff: function(to, separator){
		if (to == null) to = new Date;
		var delta = ((to - this) / 1000).floor().abs();

		var vals = [],
			durations = [60, 60, 24, 365, 0],
			names = ['s', 'm', 'h', 'd', 'y'],
			value, duration;

		for (var item = 0; item < durations.length; item++){
			if (item && !delta) break;
			value = delta;
			if ((duration = durations[item])){
				value = (delta % duration);
				delta = (delta / duration).floor();
			}
			vals.unshift(value + (names[item] || ''));
		}

		return vals.join(separator || ':');
	}

}).extend({

	distanceOfTimeInWords: function(from, to){
		return Date.getTimePhrase(((to - from) / 1000).toInt());
	},

	getTimePhrase: function(delta){
		var suffix = (delta < 0) ? 'Until' : 'Ago';
		if (delta < 0) delta *= -1;

		var units = {
			minute: 60,
			hour: 60,
			day: 24,
			week: 7,
			month: 52 / 12,
			year: 12,
			eon: Infinity
		};

		var msg = 'lessThanMinute';

		for (var unit in units){
			var interval = units[unit];
			if (delta < 1.5 * interval){
				if (delta > 0.75 * interval) msg = unit;
				break;
			}
			delta /= interval;
			msg = unit + 's';
		}

		delta = delta.round();
		return Date.getMsg(msg + suffix, delta).substitute({delta: delta});
	}

}).defineParsers(

	{
		// "today", "tomorrow", "yesterday"
		re: /^(?:tod|tom|yes)/i,
		handler: function(bits){
			var d = new Date().clearTime();
			switch (bits[0]){
				case 'tom': return d.increment();
				case 'yes': return d.decrement();
				default: return d;
			}
		}
	},

	{
		// "next Wednesday", "last Thursday"
		re: /^(next|last) ([a-z]+)$/i,
		handler: function(bits){
			var d = new Date().clearTime();
			var day = d.getDay();
			var newDay = Date.parseDay(bits[2], true);
			var addDays = newDay - day;
			if (newDay <= day) addDays += 7;
			if (bits[1] == 'last') addDays -= 7;
			return d.set('date', d.getDate() + addDays);
		}
	}

).alias('timeAgoInWords', 'timeDiffInWords');

/*
---

name: Hash

description: Contains Hash Prototypes. Provides a means for overcoming the JavaScript practical impossibility of extending native Objects.

license: MIT-style license.

requires:
  - Core/Object
  - MooTools.More

provides: [Hash]

...
*/

(function(){

if (this.Hash) return;

var Hash = this.Hash = new Type('Hash', function(object){
	if (typeOf(object) == 'hash') object = Object.clone(object.getClean());
	for (var key in object) this[key] = object[key];
	return this;
});

this.$H = function(object){
	return new Hash(object);
};

Hash.implement({

	forEach: function(fn, bind){
		Object.forEach(this, fn, bind);
	},

	getClean: function(){
		var clean = {};
		for (var key in this){
			if (this.hasOwnProperty(key)) clean[key] = this[key];
		}
		return clean;
	},

	getLength: function(){
		var length = 0;
		for (var key in this){
			if (this.hasOwnProperty(key)) length++;
		}
		return length;
	}

});

Hash.alias('each', 'forEach');

Hash.implement({

	has: Object.prototype.hasOwnProperty,

	keyOf: function(value){
		return Object.keyOf(this, value);
	},

	hasValue: function(value){
		return Object.contains(this, value);
	},

	extend: function(properties){
		Hash.each(properties || {}, function(value, key){
			Hash.set(this, key, value);
		}, this);
		return this;
	},

	combine: function(properties){
		Hash.each(properties || {}, function(value, key){
			Hash.include(this, key, value);
		}, this);
		return this;
	},

	erase: function(key){
		if (this.hasOwnProperty(key)) delete this[key];
		return this;
	},

	get: function(key){
		return (this.hasOwnProperty(key)) ? this[key] : null;
	},

	set: function(key, value){
		if (!this[key] || this.hasOwnProperty(key)) this[key] = value;
		return this;
	},

	empty: function(){
		Hash.each(this, function(value, key){
			delete this[key];
		}, this);
		return this;
	},

	include: function(key, value){
		if (this[key] == undefined) this[key] = value;
		return this;
	},

	map: function(fn, bind){
		return new Hash(Object.map(this, fn, bind));
	},

	filter: function(fn, bind){
		return new Hash(Object.filter(this, fn, bind));
	},

	every: function(fn, bind){
		return Object.every(this, fn, bind);
	},

	some: function(fn, bind){
		return Object.some(this, fn, bind);
	},

	getKeys: function(){
		return Object.keys(this);
	},

	getValues: function(){
		return Object.values(this);
	},

	toQueryString: function(base){
		return Object.toQueryString(this, base);
	}

});

Hash.alias({indexOf: 'keyOf', contains: 'hasValue'});


})();


/*
---

script: Hash.Extras.js

name: Hash.Extras

description: Extends the Hash Type to include getFromPath which allows a path notation to child elements.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Hash
  - Object.Extras

provides: [Hash.Extras]

...
*/

Hash.implement({

	getFromPath: function(notation){
		return Object.getFromPath(this, notation);
	},

	cleanValues: function(method){
		return new Hash(Object.cleanValues(this, method));
	},

	run: function(){
		Object.run(arguments);
	}

});

/*
---
name: Number.Format
description: Extends the Number Type object to include a number formatting method.
license: MIT-style license
authors: [Arian Stolwijk]
requires: [Core/Number, Locale.en-US.Number]
# Number.Extras is for compatibility
provides: [Number.Format, Number.Extras]
...
*/


Number.implement({

	format: function(options){
		// Thanks dojo and YUI for some inspiration
		var value = this;
		options = options ? Object.clone(options) : {};
		var getOption = function(key){
			if (options[key] != null) return options[key];
			return Locale.get('Number.' + key);
		};

		var negative = value < 0,
			decimal = getOption('decimal'),
			precision = getOption('precision'),
			group = getOption('group'),
			decimals = getOption('decimals');

		if (negative){
			var negativeLocale = getOption('negative') || {};
			if (negativeLocale.prefix == null && negativeLocale.suffix == null) negativeLocale.prefix = '-';
			['prefix', 'suffix'].each(function(key){
				if (negativeLocale[key]) options[key] = getOption(key) + negativeLocale[key];
			});

			value = -value;
		}

		var prefix = getOption('prefix'),
			suffix = getOption('suffix');

		if (decimals !== '' && decimals >= 0 && decimals <= 20) value = value.toFixed(decimals);
		if (precision >= 1 && precision <= 21) value = (+value).toPrecision(precision);

		value += '';
		var index;
		if (getOption('scientific') === false && value.indexOf('e') > -1){
			var match = value.split('e'),
				zeros = +match[1];
			value = match[0].replace('.', '');

			if (zeros < 0){
				zeros = -zeros - 1;
				index = match[0].indexOf('.');
				if (index > -1) zeros -= index - 1;
				while (zeros--) value = '0' + value;
				value = '0.' + value;
			} else {
				index = match[0].lastIndexOf('.');
				if (index > -1) zeros -= match[0].length - index - 1;
				while (zeros--) value += '0';
			}
		}

		if (decimal != '.') value = value.replace('.', decimal);

		if (group){
			index = value.lastIndexOf(decimal);
			index = (index > -1) ? index : value.length;
			var newOutput = value.substring(index),
				i = index;

			while (i--){
				if ((index - i - 1) % 3 == 0 && i != (index - 1)) newOutput = group + newOutput;
				newOutput = value.charAt(i) + newOutput;
			}

			value = newOutput;
		}

		if (prefix) value = prefix + value;
		if (suffix) value += suffix;

		return value;
	},

	formatCurrency: function(decimals){
		var locale = Locale.get('Number.currency') || {};
		if (locale.scientific == null) locale.scientific = false;
		locale.decimals = decimals != null ? decimals
			: (locale.decimals == null ? 2 : locale.decimals);

		return this.format(locale);
	},

	formatPercentage: function(decimals){
		var locale = Locale.get('Number.percentage') || {};
		if (locale.suffix == null) locale.suffix = '%';
		locale.decimals = decimals != null ? decimals
			: (locale.decimals == null ? 2 : locale.decimals);

		return this.format(locale);
	}

});

/*
---

script: URI.js

name: URI

description: Provides methods useful in managing the window location and uris.

license: MIT-style license

authors:
  - Sebastian Markbåge
  - Aaron Newton

requires:
  - Core/Object
  - Core/Class
  - Core/Class.Extras
  - Core/Element
  - String.QueryString

provides: [URI]

...
*/

(function(){

var toString = function(){
	return this.get('value');
};

var URI = this.URI = new Class({

	Implements: Options,

	options: {
		/*base: false*/
	},

	regex: /^(?:(\w+):)?(?:\/\/(?:(?:([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)?(\.\.?$|(?:[^?#\/]*\/)*)([^?#]*)(?:\?([^#]*))?(?:#(.*))?/,
	parts: ['scheme', 'user', 'password', 'host', 'port', 'directory', 'file', 'query', 'fragment'],
	schemes: {http: 80, https: 443, ftp: 21, rtsp: 554, mms: 1755, file: 0},

	initialize: function(uri, options){
		this.setOptions(options);
		var base = this.options.base || URI.base;
		if (!uri) uri = base;

		if (uri && uri.parsed) this.parsed = Object.clone(uri.parsed);
		else this.set('value', uri.href || uri.toString(), base ? new URI(base) : false);
	},

	parse: function(value, base){
		var bits = value.match(this.regex);
		if (!bits) return false;
		bits.shift();
		return this.merge(bits.associate(this.parts), base);
	},

	merge: function(bits, base){
		if ((!bits || !bits.scheme) && (!base || !base.scheme)) return false;
		if (base){
			this.parts.every(function(part){
				if (bits[part]) return false;
				bits[part] = base[part] || '';
				return true;
			});
		}
		bits.port = bits.port || this.schemes[bits.scheme.toLowerCase()];
		bits.directory = bits.directory ? this.parseDirectory(bits.directory, base ? base.directory : '') : '/';
		return bits;
	},

	parseDirectory: function(directory, baseDirectory){
		directory = (directory.substr(0, 1) == '/' ? '' : (baseDirectory || '/')) + directory;
		if (!directory.test(URI.regs.directoryDot)) return directory;
		var result = [];
		directory.replace(URI.regs.endSlash, '').split('/').each(function(dir){
			if (dir == '..' && result.length > 0) result.pop();
			else if (dir != '.') result.push(dir);
		});
		return result.join('/') + '/';
	},

	combine: function(bits){
		return bits.value || bits.scheme + '://' +
			(bits.user ? bits.user + (bits.password ? ':' + bits.password : '') + '@' : '') +
			(bits.host || '') + (bits.port && bits.port != this.schemes[bits.scheme] ? ':' + bits.port : '') +
			(bits.directory || '/') + (bits.file || '') +
			(bits.query ? '?' + bits.query : '') +
			(bits.fragment ? '#' + bits.fragment : '');
	},

	set: function(part, value, base){
		if (part == 'value'){
			var scheme = value.match(URI.regs.scheme);
			if (scheme) scheme = scheme[1];
			if (scheme && this.schemes[scheme.toLowerCase()] == null) this.parsed = { scheme: scheme, value: value };
			else this.parsed = this.parse(value, (base || this).parsed) || (scheme ? { scheme: scheme, value: value } : { value: value });
		} else if (part == 'data'){
			this.setData(value);
		} else {
			this.parsed[part] = value;
		}
		return this;
	},

	get: function(part, base){
		switch (part){
			case 'value': return this.combine(this.parsed, base ? base.parsed : false);
			case 'data' : return this.getData();
		}
		return this.parsed[part] || '';
	},

	go: function(){
		document.location.href = this.toString();
	},

	toURI: function(){
		return this;
	},

	getData: function(key, part){
		var qs = this.get(part || 'query');
		if (!(qs || qs === 0)) return key ? null : {};
		var obj = qs.parseQueryString();
		return key ? obj[key] : obj;
	},

	setData: function(values, merge, part){
		if (typeof values == 'string'){
			var data = this.getData();
			data[arguments[0]] = arguments[1];
			values = data;
		} else if (merge){
			values = Object.merge(this.getData(null, part), values);
		}
		return this.set(part || 'query', Object.toQueryString(values));
	},

	clearData: function(part){
		return this.set(part || 'query', '');
	},

	toString: toString,
	valueOf: toString

});

URI.regs = {
	endSlash: /\/$/,
	scheme: /^(\w+):/,
	directoryDot: /\.\/|\.$/
};

URI.base = new URI(Array.from(document.getElements('base[href]', true)).getLast(), {base: document.location});

String.implement({

	toURI: function(options){
		return new URI(this, options);
	}

});

})();

/*
---

script: URI.Relative.js

name: URI.Relative

description: Extends the URI class to add methods for computing relative and absolute urls.

license: MIT-style license

authors:
  - Sebastian Markbåge


requires:
  - Class.refactor
  - URI

provides: [URI.Relative]

...
*/

URI = Class.refactor(URI, {

	combine: function(bits, base){
		if (!base || bits.scheme != base.scheme || bits.host != base.host || bits.port != base.port)
			return this.previous.apply(this, arguments);
		var end = bits.file + (bits.query ? '?' + bits.query : '') + (bits.fragment ? '#' + bits.fragment : '');

		if (!base.directory) return (bits.directory || (bits.file ? '' : './')) + end;

		var baseDir = base.directory.split('/'),
			relDir = bits.directory.split('/'),
			path = '',
			offset;

		var i = 0;
		for (offset = 0; offset < baseDir.length && offset < relDir.length && baseDir[offset] == relDir[offset]; offset++);
		for (i = 0; i < baseDir.length - offset - 1; i++) path += '../';
		for (i = offset; i < relDir.length - 1; i++) path += relDir[i] + '/';

		return (path || (bits.file ? '' : './')) + end;
	},

	toAbsolute: function(base){
		base = new URI(base);
		if (base) base.set('directory', '').set('file', '');
		return this.toRelative(base);
	},

	toRelative: function(base){
		return this.get('value', new URI(base));
	}

});

/*
---

script: Assets.js

name: Assets

description: Provides methods to dynamically load JavaScript, CSS, and Image files into the document.

license: MIT-style license

authors:
  - Valerio Proietti

requires:
  - Core/Element.Event
  - MooTools.More

provides: [Assets]

...
*/

var Asset = {

	javascript: function(source, properties){
		if (!properties) properties = {};

		var script = new Element('script', {src: source, type: 'text/javascript'}),
			doc = properties.document || document,
			load = properties.onload || properties.onLoad;

		delete properties.onload;
		delete properties.onLoad;
		delete properties.document;

		if (load){
			if (!script.addEventListener){
				script.addEvent('readystatechange', function(){
					if (['loaded', 'complete'].contains(this.readyState)) load.call(this);
				});
			} else {
				script.addEvent('load', load);
			}
		}

		return script.set(properties).inject(doc.head);
	},

	css: function(source, properties){
		if (!properties) properties = {};

		var load = properties.onload || properties.onLoad,
			doc = properties.document || document,
			timeout = properties.timeout || 3000;

		['onload', 'onLoad', 'document'].each(function(prop){
			delete properties[prop];
		});

		var link = new Element('link', {
			type: 'text/css',
			rel: 'stylesheet',
			media: 'screen',
			href: source
		}).setProperties(properties).inject(doc.head);

		if (load){
			// based on article at http://www.yearofmoo.com/2011/03/cross-browser-stylesheet-preloading.html
			var loaded = false, retries = 0;
			var check = function(){
				var stylesheets = document.styleSheets;
				for (var i = 0; i < stylesheets.length; i++){
					var file = stylesheets[i];
					var owner = file.ownerNode ? file.ownerNode : file.owningElement;
					if (owner && owner == link){
						loaded = true;
						return load.call(link);
					}
				}
				retries++;
				if (!loaded && retries < timeout / 50) return setTimeout(check, 50);
			}
			setTimeout(check, 0);
		}
		return link;
	},

	image: function(source, properties){
		if (!properties) properties = {};

		var image = new Image(),
			element = document.id(image) || new Element('img');

		['load', 'abort', 'error'].each(function(name){
			var type = 'on' + name,
				cap = 'on' + name.capitalize(),
				event = properties[type] || properties[cap] || function(){};

			delete properties[cap];
			delete properties[type];

			image[type] = function(){
				if (!image) return;
				if (!element.parentNode){
					element.width = image.width;
					element.height = image.height;
				}
				image = image.onload = image.onabort = image.onerror = null;
				event.delay(1, element, element);
				element.fireEvent(name, element, 1);
			};
		});

		image.src = element.src = source;
		if (image && image.complete) image.onload.delay(1);
		return element.set(properties);
	},

	images: function(sources, options){
		sources = Array.from(sources);

		var fn = function(){},
			counter = 0;

		options = Object.merge({
			onComplete: fn,
			onProgress: fn,
			onError: fn,
			properties: {}
		}, options);

		return new Elements(sources.map(function(source, index){
			return Asset.image(source, Object.append(options.properties, {
				onload: function(){
					counter++;
					options.onProgress.call(this, counter, index, source);
					if (counter == sources.length) options.onComplete();
				},
				onerror: function(){
					counter++;
					options.onError.call(this, counter, index, source);
					if (counter == sources.length) options.onComplete();
				}
			}));
		}));
	}

};

/*
---

script: Color.js

name: Color

description: Class for creating and manipulating colors in JavaScript. Supports HSB -> RGB Conversions and vice versa.

license: MIT-style license

authors:
  - Valerio Proietti

requires:
  - Core/Array
  - Core/String
  - Core/Number
  - Core/Hash
  - Core/Function
  - MooTools.More

provides: [Color]

...
*/

(function(){

var Color = this.Color = new Type('Color', function(color, type){
	if (arguments.length >= 3){
		type = 'rgb'; color = Array.slice(arguments, 0, 3);
	} else if (typeof color == 'string'){
		if (color.match(/rgb/)) color = color.rgbToHex().hexToRgb(true);
		else if (color.match(/hsb/)) color = color.hsbToRgb();
		else color = color.hexToRgb(true);
	}
	type = type || 'rgb';
	switch (type){
		case 'hsb':
			var old = color;
			color = color.hsbToRgb();
			color.hsb = old;
		break;
		case 'hex': color = color.hexToRgb(true); break;
	}
	color.rgb = color.slice(0, 3);
	color.hsb = color.hsb || color.rgbToHsb();
	color.hex = color.rgbToHex();
	return Object.append(color, this);
});

Color.implement({

	mix: function(){
		var colors = Array.slice(arguments);
		var alpha = (typeOf(colors.getLast()) == 'number') ? colors.pop() : 50;
		var rgb = this.slice();
		colors.each(function(color){
			color = new Color(color);
			for (var i = 0; i < 3; i++) rgb[i] = Math.round((rgb[i] / 100 * (100 - alpha)) + (color[i] / 100 * alpha));
		});
		return new Color(rgb, 'rgb');
	},

	invert: function(){
		return new Color(this.map(function(value){
			return 255 - value;
		}));
	},

	setHue: function(value){
		return new Color([value, this.hsb[1], this.hsb[2]], 'hsb');
	},

	setSaturation: function(percent){
		return new Color([this.hsb[0], percent, this.hsb[2]], 'hsb');
	},

	setBrightness: function(percent){
		return new Color([this.hsb[0], this.hsb[1], percent], 'hsb');
	}

});

this.$RGB = function(r, g, b){
	return new Color([r, g, b], 'rgb');
};

this.$HSB = function(h, s, b){
	return new Color([h, s, b], 'hsb');
};

this.$HEX = function(hex){
	return new Color(hex, 'hex');
};

Array.implement({

	rgbToHsb: function(){
		var red = this[0],
				green = this[1],
				blue = this[2],
				hue = 0;
		var max = Math.max(red, green, blue),
				min = Math.min(red, green, blue);
		var delta = max - min;
		var brightness = max / 255,
				saturation = (max != 0) ? delta / max : 0;
		if (saturation != 0){
			var rr = (max - red) / delta;
			var gr = (max - green) / delta;
			var br = (max - blue) / delta;
			if (red == max) hue = br - gr;
			else if (green == max) hue = 2 + rr - br;
			else hue = 4 + gr - rr;
			hue /= 6;
			if (hue < 0) hue++;
		}
		return [Math.round(hue * 360), Math.round(saturation * 100), Math.round(brightness * 100)];
	},

	hsbToRgb: function(){
		var br = Math.round(this[2] / 100 * 255);
		if (this[1] == 0){
			return [br, br, br];
		} else {
			var hue = this[0] % 360;
			var f = hue % 60;
			var p = Math.round((this[2] * (100 - this[1])) / 10000 * 255);
			var q = Math.round((this[2] * (6000 - this[1] * f)) / 600000 * 255);
			var t = Math.round((this[2] * (6000 - this[1] * (60 - f))) / 600000 * 255);
			switch (Math.floor(hue / 60)){
				case 0: return [br, t, p];
				case 1: return [q, br, p];
				case 2: return [p, br, t];
				case 3: return [p, q, br];
				case 4: return [t, p, br];
				case 5: return [br, p, q];
			}
		}
		return false;
	}

});

String.implement({

	rgbToHsb: function(){
		var rgb = this.match(/\d{1,3}/g);
		return (rgb) ? rgb.rgbToHsb() : null;
	},

	hsbToRgb: function(){
		var hsb = this.match(/\d{1,3}/g);
		return (hsb) ? hsb.hsbToRgb() : null;
	}

});

})();


/*
---

script: Group.js

name: Group

description: Class for monitoring collections of events

license: MIT-style license

authors:
  - Valerio Proietti

requires:
  - Core/Events
  - MooTools.More

provides: [Group]

...
*/

(function(){

this.Group = new Class({

	initialize: function(){
		this.instances = Array.flatten(arguments);
	},

	addEvent: function(type, fn){
		var instances = this.instances,
			len = instances.length,
			togo = len,
			args = new Array(len),
			self = this;

		instances.each(function(instance, i){
			instance.addEvent(type, function(){
				if (!args[i]) togo--;
				args[i] = arguments;
				if (!togo){
					fn.call(self, instances, instance, args);
					togo = len;
					args = new Array(len);
				}
			});
		});
	}

});

})();

/*
---

script: Hash.Cookie.js

name: Hash.Cookie

description: Class for creating, reading, and deleting Cookies in JSON format.

license: MIT-style license

authors:
  - Valerio Proietti
  - Aaron Newton

requires:
  - Core/Cookie
  - Core/JSON
  - MooTools.More
  - Hash

provides: [Hash.Cookie]

...
*/

Hash.Cookie = new Class({

	Extends: Cookie,

	options: {
		autoSave: true
	},

	initialize: function(name, options){
		this.parent(name, options);
		this.load();
	},

	save: function(){
		var value = JSON.encode(this.hash);
		if (!value || value.length > 4096) return false; //cookie would be truncated!
		if (value == '{}') this.dispose();
		else this.write(value);
		return true;
	},

	load: function(){
		this.hash = new Hash(JSON.decode(this.read(), true));
		return this;
	}

});

Hash.each(Hash.prototype, function(method, name){
	if (typeof method == 'function') Hash.Cookie.implement(name, function(){
		var value = method.apply(this.hash, arguments);
		if (this.options.autoSave) this.save();
		return value;
	});
});

/*
---

name: Swiff

description: Wrapper for embedding SWF movies. Supports External Interface Communication.

license: MIT-style license.

credits:
  - Flash detection & Internet Explorer + Flash Player 9 fix inspired by SWFObject.

requires: [Core/Options, Core/Object, Core/Element]

provides: Swiff

...
*/

(function(){

var Swiff = this.Swiff = new Class({

	Implements: Options,

	options: {
		id: null,
		height: 1,
		width: 1,
		container: null,
		properties: {},
		params: {
			quality: 'high',
			allowScriptAccess: 'always',
			wMode: 'window',
			swLiveConnect: true
		},
		callBacks: {},
		vars: {}
	},

	toElement: function(){
		return this.object;
	},

	initialize: function(path, options){
		this.instance = 'Swiff_' + String.uniqueID();

		this.setOptions(options);
		options = this.options;
		var id = this.id = options.id || this.instance;
		var container = document.id(options.container);

		Swiff.CallBacks[this.instance] = {};

		var params = options.params, vars = options.vars, callBacks = options.callBacks;
		var properties = Object.append({height: options.height, width: options.width}, options.properties);

		var self = this;

		for (var callBack in callBacks){
			Swiff.CallBacks[this.instance][callBack] = (function(option){
				return function(){
					return option.apply(self.object, arguments);
				};
			})(callBacks[callBack]);
			vars[callBack] = 'Swiff.CallBacks.' + this.instance + '.' + callBack;
		}

		params.flashVars = Object.toQueryString(vars);
		if ('ActiveXObject' in window){
			properties.classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
			params.movie = path;
		} else {
			properties.type = 'application/x-shockwave-flash';
		}
		properties.data = path;

		var build = '<object id="' + id + '"';
		for (var property in properties) build += ' ' + property + '="' + properties[property] + '"';
		build += '>';
		for (var param in params){
			if (params[param]) build += '<param name="' + param + '" value="' + params[param] + '" />';
		}
		build += '</object>';
		this.object = ((container) ? container.empty() : new Element('div')).set('html', build).firstChild;
	},

	replaces: function(element){
		element = document.id(element, true);
		element.parentNode.replaceChild(this.toElement(), element);
		return this;
	},

	inject: function(element){
		document.id(element, true).appendChild(this.toElement());
		return this;
	},

	remote: function(){
		return Swiff.remote.apply(Swiff, [this.toElement()].append(arguments));
	}

});

Swiff.CallBacks = {};

Swiff.remote = function(obj, fn){
	var rs = obj.CallFunction('<invoke name="' + fn + '" returntype="javascript">' + __flash__argumentsToXML(arguments, 2) + '</invoke>');
	return eval(rs);
};

})();

/*
---
name: Table
description: LUA-Style table implementation.
license: MIT-style license
authors:
  - Valerio Proietti
requires: [Core/Array]
provides: [Table]
...
*/

(function(){

var Table = this.Table = function(){

	this.length = 0;
	var keys = [],
	    values = [];
	
	this.set = function(key, value){
		var index = keys.indexOf(key);
		if (index == -1){
			var length = keys.length;
			keys[length] = key;
			values[length] = value;
			this.length++;
		} else {
			values[index] = value;
		}
		return this;
	};

	this.get = function(key){
		var index = keys.indexOf(key);
		return (index == -1) ? null : values[index];
	};

	this.erase = function(key){
		var index = keys.indexOf(key);
		if (index != -1){
			this.length--;
			keys.splice(index, 1);
			return values.splice(index, 1)[0];
		}
		return null;
	};

	this.each = this.forEach = function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++) fn.call(bind, keys[i], values[i], this);
	};
	
};

if (this.Type) new Type('Table', Table);

})();

/*
 ---

 script: Array.sortOn.js

 description: Adds Array.sortOn function and related constants that works like in ActionScript for sorting arrays of objects (applying all same strict rules)

 license: MIT-style license.

 authors:
 - gonchuki

 docs: http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/Array.html#sortOn()

 requires:
 - core/1.2.4: [Array]

 provides:
 - [Array.sortOn, Array.CASEINSENSITIVE, Array.DESCENDING, Array.UNIQUESORT, Array.RETURNINDEXEDARRAY, Array.NUMERIC]

 ...
 */

Array.CASEINSENSITIVE = 1;
Array.DESCENDING = 2;
Array.UNIQUESORT = 4;
Array.RETURNINDEXEDARRAY = 8;

Array.NUMERIC = 16;
Array.DESC_NUMERIC = 17;
Array.STRING=18;
Array.DESC_STRING=19;

(function ()
{
	var dup_fn = function (field, field_options)
	{
		var filtered = (field_options & Array.NUMERIC)
			? this.map(function (item)
		{
			return item[field].toFloat();
		})
			: (field_options & Array.CASEINSENSITIVE)
			? this.map(function (item)
		{
			return item[field].toLowerCase();
		})
			: this.map(function (item)
		{
			return item[field];
		});
		return filtered.length !== [].combine(filtered).length;
	};

	var sort_fn = function (item_a, item_b, fields, options)
	{
		return (function sort_by(fields, options)
		{
			var ret, a, b,
				opts = options[0],
				sub_fields = fields[0].match(/[^.]+/g);
			(function get_values(s_fields, s_a, s_b)
			{
				var field = s_fields[0];
				if (s_fields.length > 1)
				{
					get_values(s_fields.slice(1), s_a[field], s_b[field]);
				}
				else
				{
					a = s_a[field].toString();
					b = s_b[field].toString();
				}
			})(sub_fields, item_a, item_b);
			if ((opts == Array.NUMERIC) || (opts == Array.DESC_NUMERIC))
			{
				ret = (a.toFloat() - b.toFloat());
			}
			else
			{
				if ((opts == Array.CASEINSENSITIVE) || (opts == Array.STRING) || (opts == Array.DESC_STRING))
				{

					a = a.toLowerCase();
					b = b.toLowerCase();
				}

				ret = (a > b) ? 1 : (a < b) ? -1 : 0;
			}

			if ((ret === 0) && (fields.length > 1))
			{
				ret = sort_by(fields.slice(1), options.slice(1));
			}
			else if ((opts == Array.DESCENDING) || (opts == Array.DESC_NUMERIC) || (opts == Array.DESC_STRING))
			{
				ret *= -1;
			}

			return ret;
		})(fields, options);
	};

	Array.implement({
		sortOn: function (fields, options)
		{
			fields = Array.from(fields);
			options = Array.from(options);

			if (options.length !== fields.length)
			{
				options = [];
			}

			if ((options[0] & Array.UNIQUESORT) && (fields.some(function (field, i)
				{
					return dup_fn(field, options[i]);
				})))
			{
				return 0;
			}

			var curry_sort = function (item_a, item_b)
			{
				return sort_fn(item_a, item_b, fields, options);
			};

			if (options[0] & Array.RETURNINDEXEDARRAY)
			{
				return this.slice().sort(curry_sort);
			}
			else
			{
				this.sort(curry_sort);
			}
		}
	});

})();
var countries_geo =
{
	/* keep this as first four rows!!*/
	"CZ": {"s": "Czech Republic", "lon": 15.472962, "lat": 49.817492, "c": "CZ"},
	"HU": {"s": "Hungary", "lon": 19.503304, "lat": 47.162494, "c": "HU"},
	"PL": {"s": "Poland", "lon": 19.145136, "lat": 51.919438, "c": "PL"},
	"SK": {"s": "Slovakia", "lon": 19.699024, "lat": 48.669026, "c": "SK"},
	/* keep this as first four rows!!*/
	"AF": {"s": "Afghanistan", "lon": 67.709953, "lat": 33.93911, "c": "AF"},
	"AL": {"s": "Albania", "lon": 20.168331, "lat": 41.153332, "c": "AL"},
	"DZ": {"s": "Algeria", "lon": 1.659626, "lat": 28.033886, "c": "DZ"},
	"AS": {"s": "American Samoa", "lon": -170.132217, "lat": -14.270972, "c": "AS"},
	"AD": {"s": "Andorra", "lon": 1.601554, "lat": 42.546245, "c": "AD"},
	"AO": {"s": "Angola", "lon": 17.873887, "lat": -11.202692, "c": "AO"},
	"AI": {"s": "Anguilla", "lon": -63.068615, "lat": 18.220554, "c": "AI"},
	"AQ": {"s": "Antarctica", "lon": -0.071389, "lat": -75.250973, "c": "AQ"},
	"AG": {"s": "Antigua and Barbuda", "lon": -61.796428, "lat": 17.060816, "c": "AG"},
	"AR": {"s": "Argentina", "lon": -63.616672, "lat": -38.416097, "c": "AR"},
	"AM": {"s": "Armenia", "lon": 45.038189, "lat": 40.069099, "c": "AM"},
	"AW": {"s": "Aruba", "lon": -69.968338, "lat": 12.52111, "c": "AW"},
	"AU": {"s": "Australia", "lon": 133.775136, "lat": -25.274398, "c": "AU"},
	"AT": {"s": "Austria", "lon": 14.550072, "lat": 47.516231, "c": "AT"},
	"AZ": {"s": "Azerbaijan", "lon": 47.576927, "lat": 40.143105, "c": "AZ"},
	"BS": {"s": "Bahamas", "lon": -77.39628, "lat": 25.03428, "c": "BS"},
	"BH": {"s": "Bahrain", "lon": 50.637772, "lat": 25.930414, "c": "BH"},
	"BD": {"s": "Bangladesh", "lon": 90.356331, "lat": 23.684994, "c": "BD"},
	"BB": {"s": "Barbados", "lon": -59.543198, "lat": 13.193887, "c": "BB"},
	"BY": {"s": "Belarus", "lon": 27.953389, "lat": 53.709807, "c": "BY"},
	"BE": {"s": "Belgium", "lon": 4.469936, "lat": 50.503887, "c": "BE"},
	"BZ": {"s": "Belize", "lon": -88.49765, "lat": 17.189877, "c": "BZ"},
	"BJ": {"s": "Benin", "lon": 2.315834, "lat": 9.30769, "c": "BJ"},
	"BM": {"s": "Bermuda", "lon": -64.75737, "lat": 32.321384, "c": "BM"},
	"BT": {"s": "Bhutan", "lon": 90.433601, "lat": 27.514162, "c": "BT"},
	"BO": {"s": "Bolivia", "lon": -63.588653, "lat": -16.290154, "c": "BO"},
	"BA": {"s": "Bosnia and Herzegovina", "lon": 17.679076, "lat": 43.915886, "c": "BA"},
	"BW": {"s": "Botswana", "lon": 24.684866, "lat": -22.328474, "c": "BW"},
	"BV": {"s": "Bouvet Island", "lon": 3.413194, "lat": -54.423199, "c": "BV"},
	"BR": {"s": "Brazil", "lon": -51.92528, "lat": -14.235004, "c": "BR"},
	"IO": {"s": "British Indian Ocean Territory", "lon": 71.876519, "lat": -6.343194, "c": "IO"},
	"BN": {"s": "Brunei Darussalam", "lon": 114.727669, "lat": 4.535277, "c": "BN"},
	"BG": {"s": "Bulgaria", "lon": 25.48583, "lat": 42.733883, "c": "BG"},
	"BF": {"s": "Burkina Faso", "lon": -1.561593, "lat": 12.238333, "c": "BF"},
	"BI": {"s": "Burundi", "lon": 29.918886, "lat": -3.373056, "c": "BI"},
	"KH": {"s": "Cambodia", "lon": 104.990963, "lat": 12.565679, "c": "KH"},
	"CM": {"s": "Cameroon", "lon": 12.354722, "lat": 7.369722, "c": "CM"},
	"CA": {"s": "Canada", "lon": -106.346771, "lat": 56.130366, "c": "CA"},
	"CV": {"s": "Cape Verde", "lon": -24.013197, "lat": 16.002082, "c": "CV"},
	"KY": {"s": "Cayman Islands", "lon": -80.566956, "lat": 19.513469, "c": "KY"},
	"CF": {"s": "Central African Republic", "lon": 20.939444, "lat": 6.611111, "c": "CF"},
	"TD": {"s": "Chad", "lon": 18.732207, "lat": 15.454166, "c": "TD"},
	"CL": {"s": "Chile", "lon": -71.542969, "lat": -35.675147, "c": "CL"},
	"CN": {"s": "China", "lon": 104.195397, "lat": 35.86166, "c": "CN"},
	"CX": {"s": "Christmas Island", "lon": 105.690449, "lat": -10.447525, "c": "CX"},
	"CC": {"s": "Cocos (Keeling) Islands", "lon": 96.870956, "lat": -12.164165, "c": "CC"},
	"CO": {"s": "Colombia", "lon": -74.297333, "lat": 4.570868, "c": "CO"},
	"KM": {"s": "Comoros", "lon": 43.872219, "lat": -11.875001, "c": "KM"},
	"CG": {"s": "Congo", "lon": 15.827659, "lat": -0.228021, "c": "CG"},
	"CD": {"s": "Congo, The Democratic Republic of", "lon": 21.758664, "lat": -4.038333, "c": "CD"},
	"CK": {"s": "Cook Islands", "lon": -159.777671, "lat": -21.236736, "c": "CK"},
	"CR": {"s": "Costa Rica", "lon": -83.753428, "lat": 9.748917, "c": "CR"},
	"CI": {"s": "Côte d'ivoire", "lon": -5.54708, "lat": 7.539989, "c": "CI"},
	"HR": {"s": "Croatia", "lon": 15.2, "lat": 45.1, "c": "HR"},
	"CU": {"s": "Cuba", "lon": -77.781167, "lat": 21.521757, "c": "CU"},
	"CW": "Curaçao",
	"CY": {"s": "Cyprus", "lon": 33.429859, "lat": 35.126413, "c": "CY"},
	"DK": {"s": "Denmark", "lon": 9.501785, "lat": 56.26392, "c": "DK"},
	"DJ": {"s": "Djibouti", "lon": 42.590275, "lat": 11.825138, "c": "DJ"},
	"DM": {"s": "Dominica", "lon": -61.370976, "lat": 15.414999, "c": "DM"},
	"DO": {"s": "Dominican Republic", "lon": -70.162651, "lat": 18.735693, "c": "DO"},
	"EC": {"s": "Ecuador", "lon": -78.183406, "lat": -1.831239, "c": "EC"},
	"EG": {"s": "Egypt", "lon": 30.802498, "lat": 26.820553, "c": "EG"},
	"SV": {"s": "El Salvador", "lon": -88.89653, "lat": 13.794185, "c": "SV"},
	"GQ": {"s": "Equatorial Guinea", "lon": 10.267895, "lat": 1.650801, "c": "GQ"},
	"ER": {"s": "Eritrea", "lon": 39.782334, "lat": 15.179384, "c": "ER"},
	"EE": {"s": "Estonia", "lon": 25.013607, "lat": 58.595272, "c": "EE"},
	"ET": {"s": "Ethiopia", "lon": 40.489673, "lat": 9.145, "c": "ET"},
	"FK": {"s": "Falkland Islands (Malvinas)", "lon": -59.523613, "lat": -51.796253, "c": "FK"},
	"FO": {"s": "Faroe Islands", "lon": -6.911806, "lat": 61.892635, "c": "FO"},
	"FJ": {"s": "Fiji", "lon": 179.414413, "lat": -16.578193, "c": "FJ"},
	"FI": {"s": "Finland", "lon": 25.748151, "lat": 61.92411, "c": "FI"},
	"FR": {"s": "France", "lon": 2.213749, "lat": 46.227638, "c": "FR"},
	"GF": {"s": "French Guiana", "lon": -53.125782, "lat": 3.933889, "c": "GF"},
	"PF": {"s": "French Polynesia", "lon": -149.406843, "lat": -17.679742, "c": "PF"},
	"TF": {"s": "French Southern Territories", "lon": 69.348557, "lat": -49.280366, "c": "TF"},
	"GA": {"s": "Gabon", "lon": 11.609444, "lat": -0.803689, "c": "GA"},
	"GM": {"s": "Gambia", "lon": -15.310139, "lat": 13.443182, "c": "GM"},
	"GE": {"s": "Georgia", "lon": 43.356892, "lat": 42.315407, "c": "GE"},
	"DE": {"s": "Germany", "lon": 10.451526, "lat": 51.165691, "c": "DE"},
	"GH": {"s": "Ghana", "lon": -1.023194, "lat": 7.946527, "c": "GH"},
	"GI": {"s": "Gibraltar", "lon": -5.345374, "lat": 36.137741, "c": "GI"},
	"GR": {"s": "Greece", "lon": 21.824312, "lat": 39.074208, "c": "GR"},
	"GL": {"s": "Greenland", "lon": -42.604303, "lat": 71.706936, "c": "GL"},
	"GD": {"s": "Grenada", "lon": -61.604171, "lat": 12.262776, "c": "GD"},
	"GP": {"s": "Guadeloupe", "lon": -62.067641, "lat": 16.995971, "c": "GP"},
	"GU": {"s": "Guam", "lon": 144.793731, "lat": 13.444304, "c": "GU"},
	"GT": {"s": "Guatemala", "lon": -90.230759, "lat": 15.783471, "c": "GT"},
	"GG": {"s": "Guernsey", "lon": -2.585278, "lat": 49.465691, "c": "GG"},
	"GN": {"s": "Guinea", "lon": -9.696645, "lat": 9.945587, "c": "GN"},
	"GW": {"s": "Guinea-Bissau", "lon": -15.180413, "lat": 11.803749, "c": "GW"},
	"GY": {"s": "Guyana", "lon": -58.93018, "lat": 4.860416, "c": "GY"},
	"HT": {"s": "Haiti", "lon": -72.285215, "lat": 18.971187, "c": "HT"},
	"HM": {"s": "Heard Island and McDonald Islands", "lon": 73.504158, "lat": -53.08181, "c": "HM"},
	"VA": {"s": "Holy See (Vatican City State)", "lon": 12.453389, "lat": 41.902916, "c": "VA"},
	"HN": {"s": "Honduras", "lon": -86.241905, "lat": 15.199999, "c": "HN"},
	"HK": {"s": "Hong Kong", "lon": 114.109497, "lat": 22.396428, "c": "HK"},
	"IS": {"s": "Iceland", "lon": -19.020835, "lat": 64.963051, "c": "IS"},
	"IN": {"s": "India", "lon": 78.96288, "lat": 20.593684, "c": "IN"},
	"ID": {"s": "Indonesia", "lon": 113.921327, "lat": -0.789275, "c": "ID"},
	"IR": {"s": "Iran, Islamic Republic of", "lon": 53.688046, "lat": 32.427908, "c": "IR"},
	"IQ": {"s": "Iraq", "lon": 43.679291, "lat": 33.223191, "c": "IQ"},
	"IE": {"s": "Ireland", "lon": -8.24389, "lat": 53.41291, "c": "IE"},
	"IM": {"s": "Isle of Man", "lon": -4.548056, "lat": 54.236107, "c": "IM"},
	"IL": {"s": "Israel", "lon": 34.851612, "lat": 31.046051, "c": "IL"},
	"IT": {"s": "Italy", "lon": 12.56738, "lat": 41.87194, "c": "IT"},
	"JM": {"s": "Jamaica", "lon": -77.297508, "lat": 18.109581, "c": "JM"},
	"JP": {"s": "Japan", "lon": 138.252924, "lat": 36.204824, "c": "JP"},
	"JE": {"s": "Jersey", "lon": -2.13125, "lat": 49.214439, "c": "JE"},
	"JO": {"s": "Jordan", "lon": 36.238414, "lat": 30.585164, "c": "JO"},
	"KZ": {"s": "Kazakhstan", "lon": 66.923684, "lat": 48.019573, "c": "KZ"},
	"KE": {"s": "Kenya", "lon": 37.906193, "lat": -0.023559, "c": "KE"},
	"KI": {"s": "Kiribati", "lon": -168.734039, "lat": -3.370417, "c": "KI"},
	"XK": {"s": "Kosovo", "lon": 21.0072222222, "lat": 42.5269444444, "c": "XK"},
	"KP": {"s": "Korea, Democratic People's Republic of", "lon": 127.510093, "lat": 40.339852, "c": "KP"},
	"KR": {"s": "Korea, Republic of", "lon": 127.766922, "lat": 35.907757, "c": "KR"},
	"KW": {"s": "Kuwait", "lon": 47.481766, "lat": 29.31166, "c": "KW"},
	"KG": {"s": "Kyrgyzstan", "lon": 74.766098, "lat": 41.20438, "c": "KG"},
	"LA": {"s": "Lao People's Democratic Republic", "lon": 102.495496, "lat": 19.85627, "c": "LA"},
	"LV": {"s": "Latvia", "lon": 24.603189, "lat": 56.879635, "c": "LV"},
	"LB": {"s": "Lebanon", "lon": 35.862285, "lat": 33.854721, "c": "LB"},
	"LS": {"s": "Lesotho", "lon": 28.233608, "lat": -29.609988, "c": "LS"},
	"LR": {"s": "Liberia", "lon": -9.429499, "lat": 6.428055, "c": "LR"},
	"LY": {"s": "Libya", "lon": 17.228331, "lat": 26.3351, "c": "LY"},
	"LI": {"s": "Liechtenstein", "lon": 9.555373, "lat": 47.166, "c": "LI"},
	"LT": {"s": "Lithuania", "lon": 23.881275, "lat": 55.169438, "c": "LT"},
	"LU": {"s": "Luxembourg", "lon": 6.129583, "lat": 49.815273, "c": "LU"},
	"MO": {"s": "Macao", "lon": 113.543873, "lat": 22.198745, "c": "MO"},
	"MK": {"s": "Macedonia, The Former Yugoslav Republic of", "lon": 21.745275, "lat": 41.608635, "c": "MK"},
	"MG": {"s": "Madagascar", "lon": 46.869107, "lat": -18.766947, "c": "MG"},
	"MW": {"s": "Malawi", "lon": 34.301525, "lat": -13.254308, "c": "MW"},
	"MY": {"s": "Malaysia", "lon": 101.975766, "lat": 4.210484, "c": "MY"},
	"MV": {"s": "Maldives", "lon": 73.22068, "lat": 3.202778, "c": "MV"},
	"ML": {"s": "Mali", "lon": -3.996166, "lat": 17.570692, "c": "ML"},
	"MT": {"s": "Malta", "lon": 14.375416, "lat": 35.937496, "c": "MT"},
	"MH": {"s": "Marshall Islands", "lon": 171.184478, "lat": 7.131474, "c": "MH"},
	"MQ": {"s": "Martinique", "lon": -61.024174, "lat": 14.641528, "c": "MQ"},
	"MR": {"s": "Mauritania", "lon": -10.940835, "lat": 21.00789, "c": "MR"},
	"MU": {"s": "Mauritius", "lon": 57.552152, "lat": -20.348404, "c": "MU"},
	"YT": {"s": "Mayotte", "lon": 45.166244, "lat": -12.8275, "c": "YT"},
	"MX": {"s": "Mexico", "lon": -102.552784, "lat": 23.634501, "c": "MX"},
	"FM": {"s": "Micronesia, Federated States of", "lon": 150.550812, "lat": 7.425554, "c": "FM"},
	"MD": {"s": "Moldova, Republic of", "lon": 28.369885, "lat": 47.411631, "c": "MD"},
	"MC": {"s": "Monaco", "lon": 7.412841, "lat": 43.750298, "c": "MC"},
	"MN": {"s": "Mongolia", "lon": 103.846656, "lat": 46.862496, "c": "MN"},
	"ME": {"s": "Montenegro", "lon": 19.37439, "lat": 42.708678, "c": "ME"},
	"MS": {"s": "Montserrat", "lon": -62.187366, "lat": 16.742498, "c": "MS"},
	"MA": {"s": "Morocco", "lon": -7.09262, "lat": 31.791702, "c": "MA"},
	"MZ": {"s": "Mozambique", "lon": 35.529562, "lat": -18.665695, "c": "MZ"},
	"MM": {"s": "Myanmar", "lon": 95.956223, "lat": 21.913965, "c": "MM"},
	"NA": {"s": "Namibia", "lon": 18.49041, "lat": -22.95764, "c": "NA"},
	"NR": {"s": "Nauru", "lon": 166.931503, "lat": -0.522778, "c": "NR"},
	"NP": {"s": "Nepal", "lon": 84.124008, "lat": 28.394857, "c": "NP"},
	"NL": {"s": "Netherlands", "lon": 5.291266, "lat": 52.132633, "c": "NL"},
	"NC": {"s": "New Caledonia", "lon": 165.618042, "lat": -20.904305, "c": "NC"},
	"NZ": {"s": "New Zealand", "lon": 174.885971, "lat": -40.900557, "c": "NZ"},
	"NI": {"s": "Nicaragua", "lon": -85.207229, "lat": 12.865416, "c": "NI"},
	"NE": {"s": "Niger", "lon": 8.081666, "lat": 17.607789, "c": "NE"},
	"NG": {"s": "Nigeria", "lon": 8.675277, "lat": 9.081999, "c": "NG"},
	"NU": {"s": "Niue", "lon": -169.867233, "lat": -19.054445, "c": "NU"},
	"NF": {"s": "Norfolk Island", "lon": 167.954712, "lat": -29.040835, "c": "NF"},
	"MP": {"s": "Northern Mariana Islands", "lon": 145.38469, "lat": 17.33083, "c": "MP"},
	"NO": {"s": "Norway", "lon": 8.468946, "lat": 60.472024, "c": "NO"},
	"OM": {"s": "Oman", "lon": 55.923255, "lat": 21.512583, "c": "OM"},
	"PK": {"s": "Pakistan", "lon": 69.345116, "lat": 30.375321, "c": "PK"},
	"PW": {"s": "Palau", "lon": 134.58252, "lat": 7.51498, "c": "PW"},
	"PS": {"s": "Palestinian Territory, Occupied", "lon": 35.233154, "lat": 31.952162, "c": "PS"},
	"PA": {"s": "Panama", "lon": -80.782127, "lat": 8.537981, "c": "PA"},
	"PG": {"s": "Papua New Guinea", "lon": 143.95555, "lat": -6.314993, "c": "PG"},
	"PY": {"s": "Paraguay", "lon": -58.443832, "lat": -23.442503, "c": "PY"},
	"PE": {"s": "Peru", "lon": -75.015152, "lat": -9.189967, "c": "PE"},
	"PH": {"s": "Philippines", "lon": 121.774017, "lat": 12.879721, "c": "PH"},
	"PN": {"s": "Pitcairn", "lon": -127.439308, "lat": -24.703615, "c": "PN"},
	"PT": {"s": "Portugal", "lon": -8.224454, "lat": 39.399872, "c": "PT"},
	"PR": {"s": "Puerto Rico", "lon": -66.590149, "lat": 18.220833, "c": "PR"},
	"QA": {"s": "Qatar", "lon": 51.183884, "lat": 25.354826, "c": "QA"},
	"RE": {"s": "Réunion", "lon": 55.536384, "lat": -21.115141, "c": "RE"},
	"RO": {"s": "Romania", "lon": 24.96676, "lat": 45.943161, "c": "RO"},
	"RU": {"s": "Russian Federation", "lon": 105.318756, "lat": 61.52401, "c": "RU"},
	"RW": {"s": "Rwanda", "lon": 29.873888, "lat": -1.940278, "c": "RW"},
	"SH": {"s": "Saint Helena, Ascension and Tristan da Cunha", "lon": -10.030696, "lat": -24.143474, "c": "SH"},
	"KN": {"s": "Saint Kitts and Nevis", "lon": -62.782998, "lat": 17.357822, "c": "KN"},
	"LC": {"s": "Saint Lucia", "lon": -60.978893, "lat": 13.909444, "c": "LC"},
	"PM": {"s": "Saint Pierre and Miquelon", "lon": -56.27111, "lat": 46.941936, "c": "PM"},
	"VC": {"s": "Saint Vincent and The Grenadines", "lon": -61.287228, "lat": 12.984305, "c": "VC"},
	"WS": {"s": "Samoa", "lon": -172.104629, "lat": -13.759029, "c": "WS"},
	"SM": {"s": "San Marino", "lon": 12.457777, "lat": 43.94236, "c": "SM"},
	"ST": {"s": "Sao Tome and Principe", "lon": 6.613081, "lat": 0.18636, "c": "ST"},
	"SA": {"s": "Saudi Arabia", "lon": 45.079162, "lat": 23.885942, "c": "SA"},
	"SN": {"s": "Senegal", "lon": -14.452362, "lat": 14.497401, "c": "SN"},
	"RS": {"s": "Serbia", "lon": 21.005859, "lat": 44.016521, "c": "RS"},
	"SC": {"s": "Seychelles", "lon": 55.491977, "lat": -4.679574, "c": "SC"},
	"SL": {"s": "Sierra Leone", "lon": -11.779889, "lat": 8.460555, "c": "SL"},
	"SG": {"s": "Singapore", "lon": 103.819836, "lat": 1.352083, "c": "SG"},
	"SI": {"s": "Slovenia", "lon": 14.995463, "lat": 46.151241, "c": "SI"},
	"SB": {"s": "Solomon Islands", "lon": 160.156194, "lat": -9.64571, "c": "SB"},
	"SO": {"s": "Somalia", "lon": 46.199616, "lat": 5.152149, "c": "SO"},
	"ZA": {"s": "South Africa", "lon": 22.937506, "lat": -30.559482, "c": "ZA"},
	"GS": {"s": "South Georgia and The South Sandwich Islands", "lon": -36.587909, "lat": -54.429579, "c": "GS"},
	"ES": {"s": "Spain", "lon": -3.74922, "lat": 40.463667, "c": "ES"},
	"LK": {"s": "Sri Lanka", "lon": 80.771797, "lat": 7.873054, "c": "LK"},
	"SD": {"s": "Sudan", "lon": 30.217636, "lat": 12.862807, "c": "SD"},
	"SR": {"s": "Suriname", "lon": -56.027783, "lat": 3.919305, "c": "SR"},
	"SJ": {"s": "Svalbard and Jan Mayen", "lon": 23.670272, "lat": 77.553604, "c": "SJ"},
	"SZ": {"s": "Swaziland", "lon": 31.465866, "lat": -26.522503, "c": "SZ"},
	"SE": {"s": "Sweden", "lon": 18.643501, "lat": 60.128161, "c": "SE"},
	"CH": {"s": "Switzerland", "lon": 8.227512, "lat": 46.818188, "c": "CH"},
	"SY": {"s": "Syrian Arab Republic", "lon": 38.996815, "lat": 34.802075, "c": "SY"},
	"TW": {"s": "Taiwan, Province of China", "lon": 120.960515, "lat": 23.69781, "c": "TW"},
	"TJ": {"s": "Tajikistan", "lon": 71.276093, "lat": 38.861034, "c": "TJ"},
	"TZ": {"s": "Tanzania, United Republic of", "lon": 34.888822, "lat": -6.369028, "c": "TZ"},
	"TH": {"s": "Thailand", "lon": 100.992541, "lat": 15.870032, "c": "TH"},
	"TL": {"s": "Timor-Leste", "lon": 125.727539, "lat": -8.874217, "c": "TL"},
	"TG": {"s": "Togo", "lon": 0.824782, "lat": 8.619543, "c": "TG"},
	"TK": {"s": "Tokelau", "lon": -171.855881, "lat": -8.967363, "c": "TK"},
	"TO": {"s": "Tonga", "lon": -175.198242, "lat": -21.178986, "c": "TO"},
	"TT": {"s": "Trinidad and Tobago", "lon": -61.222503, "lat": 10.691803, "c": "TT"},
	"TN": {"s": "Tunisia", "lon": 9.537499, "lat": 33.886917, "c": "TN"},
	"TR": {"s": "Turkey", "lon": 35.243322, "lat": 38.963745, "c": "TR"},
	"TM": {"s": "Turkmenistan", "lon": 59.556278, "lat": 38.969719, "c": "TM"},
	"TC": {"s": "Turks and Caicos Islands", "lon": -71.797928, "lat": 21.694025, "c": "TC"},
	"TV": {"s": "Tuvalu", "lon": 177.64933, "lat": -7.109535, "c": "TV"},
	"UG": {"s": "Uganda", "lon": 32.290275, "lat": 1.373333, "c": "UG"},
	"UA": {"s": "Ukraine", "lon": 31.16558, "lat": 48.379433, "c": "UA"},
	"AE": {"s": "United Arab Emirates", "lon": 53.847818, "lat": 23.424076, "c": "AE"},
	"UK": {"s": "United Kingdom", "lon": -3.435973, "lat": 55.378051, "c": "GB"},
	"GB": {"s": "United Kingdom", "lon": -3.435973, "lat": 55.378051, "c": "GB"},
	"US": {"s": "United States", "lon": -95.712891, "lat": 37.09024, "c": "US"},
	"UM": {"s": "United States Minor Outlying Islands", "lon": 0, "lat": 0, "c": "UM"},
	"UY": {"s": "Uruguay", "lon": -55.765835, "lat": -32.522779, "c": "UY"},
	"UZ": {"s": "Uzbekistan", "lon": 64.585262, "lat": 41.377491, "c": "UZ"},
	"VU": {"s": "Vanuatu", "lon": 166.959158, "lat": -15.376706, "c": "VU"},
	"VE": {"s": "Venezuela", "lon": -66.58973, "lat": 6.42375, "c": "VE"},
	"VN": {"s": "Viet Nam", "lon": 108.277199, "lat": 14.058324, "c": "VN"},
	"VG": {"s": "Virgin Islands, British", "lon": -64.639968, "lat": 18.420695, "c": "VG"},
	"VI": {"s": "Virgin Islands, U.S.", "lon": -64.896335, "lat": 18.335765, "c": "VI"},
	"WF": {"s": "Wallis and Futuna", "lon": -177.156097, "lat": -13.768752, "c": "WF"},
	"EH": {"s": "Western Sahara", "lon": -12.885834, "lat": 24.215527, "c": "EH"},
	"YE": {"s": "Yemen", "lon": 48.516388, "lat": 15.552727, "c": "YE"},
	"ZM": {"s": "Zambia", "lon": 27.849332, "lat": -13.133897, "c": "ZM"},
	"ZW": {"s": "Zimbabwe", "lon": 29.154857, "lat": -19.015438, "c": "ZW"}
};

var filter_countries = {
	/* keep this as first four rows!!*/
	"CZ": "Czech Republic",
	"HU": "Hungary",
	"PL": "Poland",
	"SK": "Slovakia",
	/* keep this as first four rows!!*/
	"AF": "Afghanistan",
	"AX": "Åland Islands",
	"AL": "Albania",
	"DZ": "Algeria",
	"AS": "American Samoa",
	"AD": "Andorra",
	"AO": "Angola",
	"AI": "Anguilla",
	"AQ": "Antarctica",
	"AG": "Antigua and Barbuda",
	"AR": "Argentina",
	"AM": "Armenia",
	"AW": "Aruba",
	"AU": "Australia",
	"AT": "Austria",
	"AZ": "Azerbaijan",
	"BS": "Bahamas",
	"BH": "Bahrain",
	"BD": "Bangladesh",
	"BB": "Barbados",
	"BY": "Belarus",
	"BE": "Belgium",
	"BZ": "Belize",
	"BJ": "Benin",
	"BM": "Bermuda",
	"BT": "Bhutan",
	"BO": "Bolivia",
	"BQ": "Bonaire, Sint Eustatius and Saba",
	"BA": "Bosnia and Herzegovina",
	"BW": "Botswana",
	"BV": "Bouvet Island",
	"BR": "Brazil",
	"IO": "British Indian Ocean Territory",
	"BN": "Brunei Darussalam",
	"BG": "Bulgaria",
	"BF": "Burkina Faso",
	"BI": "Burundi",
	"KH": "Cambodia",
	"CM": "Cameroon",
	"CA": "Canada",
	"CV": "Cape Verde",
	"KY": "Cayman Islands",
	"CF": "Central African Republic",
	"TD": "Chad",
	"CL": "Chile",
	"CN": "China",
	"CX": "Christmas Island",
	"CC": "Cocos (Keeling) Islands",
	"CO": "Colombia",
	"KM": "Comoros",
	"CG": "Congo",
	"CD": "Congo, The Democratic Republic of",
	"CK": "Cook Islands",
	"CR": "Costa Rica",
	"CI": "Côte d'ivoire",
	"HR": "Croatia",
	"CU": "Cuba",
	"CW": "Curaçao",
	"CY": "Cyprus",
	"DK": "Denmark",
	"DJ": "Djibouti",
	"DM": "Dominica",
	"DO": "Dominican Republic",
	"EC": "Ecuador",
	"EG": "Egypt",
	"SV": "El Salvador",
	"GQ": "Equatorial Guinea",
	"ER": "Eritrea",
	"EE": "Estonia",
	"ET": "Ethiopia",
	"FK": "Falkland Islands (Malvinas)",
	"FO": "Faroe Islands",
	"FJ": "Fiji",
	"FI": "Finland",
	"FR": "France",
	"GF": "French Guiana",
	"PF": "French Polynesia",
	"TF": "French Southern Territories",
	"GA": "Gabon",
	"GM": "Gambia",
	"GE": "Georgia",
	"DE": "Germany",
	"GH": "Ghana",
	"GI": "Gibraltar",
	"GR": "Greece",
	"GL": "Greenland",
	"GD": "Grenada",
	"GP": "Guadeloupe",
	"GU": "Guam",
	"GT": "Guatemala",
	"GG": "Guernsey",
	"GN": "Guinea",
	"GW": "Guinea-Bissau",
	"GY": "Guyana",
	"HT": "Haiti",
	"HM": "Heard Island and McDonald Islands",
	"VA": "Holy See (Vatican City State)",
	"HN": "Honduras",
	"HK": "Hong Kong",
	"IS": "Iceland",
	"IN": "India",
	"ID": "Indonesia",
	"IR": "Iran, Islamic Republic of",
	"IQ": "Iraq",
	"IE": "Ireland",
	"IM": "Isle of Man",
	"IL": "Israel",
	"IT": "Italy",
	"JM": "Jamaica",
	"JP": "Japan",
	"JE": "Jersey",
	"JO": "Jordan",
	"KZ": "Kazakhstan",
	"KE": "Kenya",
	"KI": "Kiribati",
	"XK": "Kosovo",
	"KP": "Korea, Democratic People's Republic of",
	"KR": "Korea, Republic of",
	"KW": "Kuwait",
	"KG": "Kyrgyzstan",
	"LA": "Lao People's Democratic Republic",
	"LV": "Latvia",
	"LB": "Lebanon",
	"LS": "Lesotho",
	"LR": "Liberia",
	"LY": "Libya",
	"LI": "Liechtenstein",
	"LT": "Lithuania",
	"LU": "Luxembourg",
	"MO": "Macao",
	"MK": "Macedonia, The Former Yugoslav Republic of",
	"MG": "Madagascar",
	"MW": "Malawi",
	"MY": "Malaysia",
	"MV": "Maldives",
	"ML": "Mali",
	"MT": "Malta",
	"MH": "Marshall Islands",
	"MQ": "Martinique",
	"MR": "Mauritania",
	"MU": "Mauritius",
	"YT": "Mayotte",
	"MX": "Mexico",
	"FM": "Micronesia, Federated States of",
	"MD": "Moldova, Republic of",
	"MC": "Monaco",
	"MN": "Mongolia",
	"ME": "Montenegro",
	"MS": "Montserrat",
	"MA": "Morocco",
	"MZ": "Mozambique",
	"MM": "Myanmar",
	"NA": "Namibia",
	"NR": "Nauru",
	"NP": "Nepal",
	"NL": "Netherlands",
	"NC": "New Caledonia",
	"NZ": "New Zealand",
	"NI": "Nicaragua",
	"NE": "Niger",
	"NG": "Nigeria",
	"NU": "Niue",
	"NF": "Norfolk Island",
	"MP": "Northern Mariana Islands",
	"NO": "Norway",
	"OM": "Oman",
	"PK": "Pakistan",
	"PW": "Palau",
	"PS": "Palestinian Territory, Occupied",
	"PA": "Panama",
	"PG": "Papua New Guinea",
	"PY": "Paraguay",
	"PE": "Peru",
	"PH": "Philippines",
	"PN": "Pitcairn",
	"PT": "Portugal",
	"PR": "Puerto Rico",
	"QA": "Qatar",
	"RE": "Réunion",
	"RO": "Romania",
	"RU": "Russian Federation",
	"RW": "Rwanda",
	"BL": "Saint Barthélemy",
	"SH": "Saint Helena, Ascension and Tristan da Cunha",
	"KN": "Saint Kitts and Nevis",
	"LC": "Saint Lucia",
	"MF": "Saint Martin (French Part)",
	"PM": "Saint Pierre and Miquelon",
	"VC": "Saint Vincent and The Grenadines",
	"WS": "Samoa",
	"SM": "San Marino",
	"ST": "Sao Tome and Principe",
	"SA": "Saudi Arabia",
	"SN": "Senegal",
	"RS": "Serbia",
	"SC": "Seychelles",
	"SL": "Sierra Leone",
	"SG": "Singapore",
	"SX": "Sint Maarten (Dutch Part)",
	"SI": "Slovenia",
	"SB": "Solomon Islands",
	"SO": "Somalia",
	"ZA": "South Africa",
	"GS": "South Georgia and The South Sandwich Islands",
	"SS": "South Sudan",
	"ES": "Spain",
	"LK": "Sri Lanka",
	"SD": "Sudan",
	"SR": "Suriname",
	"SJ": "Svalbard and Jan Mayen",
	"SZ": "Swaziland",
	"SE": "Sweden",
	"CH": "Switzerland",
	"SY": "Syrian Arab Republic",
	"TW": "Taiwan, Province of China",
	"TJ": "Tajikistan",
	"TZ": "Tanzania, United Republic of",
	"TH": "Thailand",
	"TL": "Timor-Leste",
	"TG": "Togo",
	"TK": "Tokelau",
	"TO": "Tonga",
	"TT": "Trinidad and Tobago",
	"TN": "Tunisia",
	"TR": "Turkey",
	"TM": "Turkmenistan",
	"TC": "Turks and Caicos Islands",
	"TV": "Tuvalu",
	"UG": "Uganda",
	"UA": "Ukraine",
	"AE": "United Arab Emirates",
	"GB": "United Kingdom",
	"UK": "United Kingdom",
	"US": "United States",
	"UM": "United States Minor Outlying Islands",
	"UY": "Uruguay",
	"UZ": "Uzbekistan",
	"VU": "Vanuatu",
	"VE": "Venezuela",
	"VN": "Viet Nam",
	"VG": "Virgin Islands, British",
	"VI": "Virgin Islands, U.S.",
	"WF": "Wallis and Futuna",
	"EH": "Western Sahara",
	"YE": "Yemen",
	"ZM": "Zambia",
	"ZW": "Zimbabwe"
};
var AppMap = new Class({
	Implements: [Events, Options],
	options: {
		tips: null
	},
	initialize: function (el, c, conf, options)
	{
		this.setOptions(options);
		this.conf = conf;
		this.markers = [];
		var a_map = L.map($(mapid), {
			attributionControl: false,
			zoomControl: false
		});

		L.tileLayer(conf.url, {
			attribution: conf.attr,
			id: conf.map_id,
			subdomains: conf.subdomains,
			minZoom: conf.min_z,
			maxZoom: conf.max_z
		}).addTo(a_map);

		this.pane = a_map.getPanes().popupPane;

		if (c)
		{
			this.initialize_controls(c);
		}
		this.map = a_map;
		this.zoom_to_v4();

	},

	initialize_controls: function (el)
	{
		var els = el.getElements('a');
		els[0].addEvent('click', this.zoom_to_bounds.bind(this));
		els[1].addEvent('click', this.zoom_to_v4.bind(this));
		els[2].addEvent('click', this.zoom_in.bind(this));
		els[3].addEvent('click', this.zoom_out.bind(this));
	},

	zoom_in: function (e)
	{
		if (e)
		{
			e.stop();
		}
		this.map.zoomIn();
	},
	zoom_out: function (e)
	{
		if (e)
		{
			e.stop();
		}
		this.map.zoomOut();

	},
	zoom_to_v4: function (e)
	{
		if (e)
		{
			e.stop();
		}
		this.map.fitBounds(this.conf.v4_bounds);
	},
	zoom_to_bounds: function (e)
	{
		if (e)
		{
			e.stop();
		}
		if (this.bounds)
		{
			this.map.fitBounds(this.bounds);
		}
	},
	draw_points: function (data, points, f)
	{

		this.remove_markers();

		var pts_data = DataUtil.group_by_place(data);
		var cts_data = DataUtil.group_by_country(data);
		var data = {
			cities: pts_data,
			countries: cts_data
		};
		var pts = {
			cities: points,
			countries: countries_geo
		};
		var w = 'cities';
		this.data = data;
		this.graph_f = f;
		var dt = data[w];
		var pt_d = pts[w];
		var max = DataUtil.get_max_len(dt);
		var markers = [];
		var o = this.options;
		var pane = this.pane;
		var map = this.map;
		var b_arr = [];
		for (var pid in pt_d)
		{
			if (dt[pid] && dt[pid].length > 0)
			{
				var p = {
					pt: pt_d[pid],
					data: dt[pid]
				};
				var marker = new CityMarker(map, p, max, {
					tips: o.tips,
					pane: pane,
					onClick: this.show_graph.bind(this)
				});
				markers.include(marker);
				b_arr.include([p.pt.lat, p.pt.lon]);
			}
		}
		this.markers = markers;
		var conf = this.conf;
		if (markers.length > 0)
		{
			var bounds = L.bounds(b_arr);
			this.bounds = bounds;

			//var z = this.map.getBoundsZoom(bounds);
			/*
			 if (z > conf.max_z)
			 {
			 z = conf.max_z;
			 }
			 if (z < conf.min_z)
			 {
			 z = conf.min_z;
			 }
			 */
			//map.setMaxBounds(bounds);
			//map.options.minZoom = z;
			//this.zoom_to_bounds();
		}
		/*
		 this.graph_f = f;

		 var pane = this.pane;
		 var map = this.map;

		 var points = data.points;
		 var bounds = data.bounds;
		 this.map.options.minZoom = 0;
		 var conf = this.conf;

		 if (points.length > 0)
		 {
		 var z = this.map.getBoundsZoom(bounds);
		 if (z > conf.max_z)
		 {
		 z = conf.max_z;
		 }
		 if (z < conf.min_z)
		 {
		 z = conf.min_z;
		 }

		 this.map.setMaxBounds(bounds);
		 this.map.options.minZoom = z;
		 this.bounds = bounds;
		 this.points = points;
		 var rel = points.rel;
		 for (var i = 0; i < points.length; i++)
		 {
		 var p = points[i];
		 this.markers[i] = new CityMarker(map, p, rel, {
		 tips: this.options.tips,
		 pane: pane,
		 onClick: this.show_graph.bind(this, i)
		 });
		 }
		 this.zoom_to_bounds();
		 }
		 */
	},
	show_graph: function (data)
	{
		var map = this.map;
		var pane = this.pane;
		var graph_f = this.graph_f;
		this.destroy_graph(map);
		this.graph = new GraphMarker(data, map, graph_f, {
			pane: pane,
			tips: this.options.tips,
			onDestroy: this.graph_destroyed.bind(this, map)
		});
	},
	destroy_graph: function (map)
	{
		if (this.graph)
		{
			this.graph.destroy(map);
		}
	},
	graph_destroyed: function (map)
	{
		this.graph = null;
	},
	remove_markers: function ()
	{
		var m = this.markers;
		var map = this.map;
		for (var i = 0; i < m.length; i++)
		{
			m[i].destroy(map);
		}
		this.markers = [];
		this.destroy_graph(map);
	}
});
var CityMarker = new Class({
	Implements: [
		Events,
		Options
	],
	options: {
		pane: null,
		front_z: 997,
		max_z: 996,
		min_z: 1
	},
	initialize: function (map, pt, b, options)
	{
		this.setOptions(options);

		var o = this.options;
		var max_z = o.max_z;
		var min_z = o.min_z;
		this.pt = pt;


		var r = pt.total / b.min;
		var l = Math.log(r);
		var z = max_z - Math.round(l * 10);
		if (z < min_z)
		{
			z = min_z;
		}

		var w = Math.round((mapconf.min_radius + (l * 5)));
		w=20;
		z=30;
		var el = new Element('div', {
			title: pt.pt.s,
			styles: {
				position: 'absolute',
				'z-index': z
			},
			events: {
				click: this.fire_click.bind(this)
			}
		}).inject(o.pane);

		new Element('div', {
			styles: {
				position: 'absolute',
				width: w * 2,
				height: w * 2,
				left: -w,
				top: -w
			},
			class: 'marker-circle'
		}).inject(el);
		this.z = z;

		this.el = el;
		this.g = null;
		this.reposition(map);
		map.on('zoomstart', this.before_zoom.bind(this));
		map.on('zoomend', this.reposition.bind(this, map));

	},
	fire_click: function ()
	{
		this.fireEvent('click', this.pt);
	},
	to_front: function ()
	{
		this.el.setStyles({
			'z-index': this.options.front_z
		});
	},
	to_back: function ()
	{
		this.el.setStyles({
			'z-index': this.z
		});
	},
	before_zoom: function ()
	{
		this.el.setStyles({
			display: 'none'
		});
	},
	reposition: function (map)
	{
		var ps = map.latLngToLayerPoint([
			this.pt.pt.lat,
			this.pt.pt.lon
		]);

		this.el.setStyles({
			display: 'block',
			transform: 'translate3d(' + ps.x + 'px, ' + ps.y + 'px, 0px)'
		});
	},
	destroy: function ()
	{
		this.el.destroy();
	}
});
var DGraph = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (el, options)
	{
		this.setOptions(options);
		this.g = [];
		this.el = el;
	},
	set_data: function (data)
	{
		this.data = data;
		this.el.empty();
		this.build_graphs();
	},
	build_graphs: function ()
	{
		this.build_topic_graph();
		this.build_tag_graph();
		this.build_country_graph();
	},
	build_topic_graph: function ()
	{
		var w = this.el;
		var s = new Element('section', {class: 'graph-section'}).inject(w);
		new Element('header', {html: mapconf.graph_names[0] + ':'}).inject(s);
		var grid = new Element('div', {class: 'pure-g'}).inject(s);
		var pie = new Element('div', {class: 'pure-u-1 pure-u-md-1-3 ct-chart'}).inject(grid);
		var bar = new Element('div', {class: 'pure-u-1 pure-u-md-2-3 ct-chart'}).inject(grid);
		var data = this.data.points;

		var c_d = {};
		var y_d = {};

		for (var i = 0; i < data.length; i++)
		{
			var d = data[i].data;
			for (var yr in d)
			{
				var dd = d[yr];
				if (!y_d[yr])
				{
					y_d[yr] = {};
				}
				for (var k = 0; k < dd.length; k++)
				{
					var g_g = dd[k].g
					if (!c_d[g_g])
					{
						c_d[g_g] = 0;
					}
					if (!y_d[yr][g_g])
					{
						y_d[yr][g_g] = 0;
					}
					y_d[yr][g_g]++;
					c_d[g_g]++;
				}
			}
		}
		var i = 0;
		var r = [];
		var l = [];
		for (var pid in c_d)
		{
			l[i] = pid;
			r[i] = {
				data: c_d[pid],
				className: 'graph-' + (i % 17)
			};
			i++;
		}
		new Chartist.Pie(pie, {
			series: r,
			labels: l
		}, {showLabel: false});


		r = [];
		l = [];
		i = 0;
		for (var yr in y_d)
		{
			l[i] = yr;
			r[i] = [];
			for (var ct in y_d[yr])
			{
				r[i].include(y_d[yr][ct]);
			}
			i++;
		}
		new Chartist.Bar(bar, {
			labels: l,
			series: r
		}, {stackBars: true});
	},
	build_tag_graph: function ()
	{

		var w = this.el;
		var s = new Element('section', {class: 'graph-section'}).inject(w);
		new Element('header', {html: mapconf.graph_names[1] + ':'}).inject(s);
		var grid = new Element('div', {class: 'pure-g'}).inject(s);
		var pie = new Element('div', {class: 'pure-u-1 pure-u-md-1-3 ct-chart'}).inject(grid);
		var bar = new Element('div', {class: 'pure-u-1 pure-u-md-2-3 ct-chart'}).inject(grid);
		var data = this.data.points;

		var c_d = {};
		var y_d = {};

		for (var i = 0; i < data.length; i++)
		{
			var d = data[i].data;
			for (var yr in d)
			{
				var dd = d[yr];
				if (!y_d[yr])
				{
					y_d[yr] = {};
				}
				for (var k = 0; k < dd.length; k++)
				{
					var qg_g = dd[k].c;
					for (var j = 0; j < qg_g.length; j++)
					{
						var g_g = qg_g[j];
						if (!c_d[g_g])
						{
							c_d[g_g] = 0;
						}
						if (!y_d[yr][g_g])
						{
							y_d[yr][g_g] = 0;
						}
						y_d[yr][g_g]++;
						c_d[g_g]++;
					}

				}
			}
		}
		var i = 0;
		var r = [];
		var l = [];
		for (var pid in c_d)
		{
			l[i] = pid;
			r[i] = {
				data: c_d[pid],
				className: 'graph-' + (i % 17)
			};
			i++;
		}
		new Chartist.Pie(pie, {
			series: r,
			labels: l
		}, {showLabel: false});


		r = [];
		l = [];
		i = 0;
		for (var yr in y_d)
		{
			l[i] = yr;
			r[i] = [];
			for (var ct in y_d[yr])
			{
				r[i].include(y_d[yr][ct]);
			}
			i++;
		}
		new Chartist.Bar(bar, {
			labels: l,
			series: r
		}, {stackBars: true});
	},
	build_country_graph: function ()
	{
		var w = this.el;
		var s = new Element('section', {class: 'graph-section'}).inject(w);
		new Element('header', {html: mapconf.graph_names[2] + ':'}).inject(s);
		var grid = new Element('div', {class: 'pure-g'}).inject(s);
		var pie = new Element('div', {class: 'pure-u-1 pure-u-md-1-3 ct-chart'}).inject(grid);
		var bar = new Element('div', {class: 'pure-u-1 pure-u-md-2-3 ct-chart'}).inject(grid);
		var data = this.data.points;
		var c_d = {};
		var y_d = {};
		for (var i = 0; i < data.length; i++)
		{
			var c = data[i].c;
			var d = data[i].data;

			if (!c_d[c])
			{
				c_d[c] = 0;
			}
			c_d[c]++;
			for (var yr in d)
			{
				if (!y_d[yr])
				{
					y_d[yr] = {};
				}
				if (!y_d[yr][c])
				{
					y_d[yr][c] = 0;
				}
				var yr_d = d[yr];
				y_d[yr][c] = yr_d.length;
			}

		}
		var i = 0;
		var r = [];
		var l = [];
		for (var pid in c_d)
		{
			l[i] = pid;
			r[i] = {
				data: c_d[pid],
				className: 'graph-' + (i % 17)
			};
			i++;
		}
		new Chartist.Pie(pie, {
			series: r,
			labels: l
		}, {showLabel: false});

		r = [];
		l = [];
		i = 0;
		for (var yr in y_d)
		{
			l[i] = yr;
			r[i] = [];
			for (var ct in y_d[yr])
			{
				r[i].include(y_d[yr][ct]);
			}
			i++;
		}
		new Chartist.Bar(bar, {
			labels: l,
			series: r
		}, {stackBars: true});
	}
});
var DPager = new Class({
	Implements: [Events, Options],
	initialize: function (el, options)
	{
		this.setOptions(options);
		this.pagination = {};
		var e = new Element('div', {
			class: 'pure-menu pure-menu-horizontal'
		}).inject(el);
		this.w = new Element('ul', {class: 'pure-menu-list'}).inject(e);
	},
	set_data: function (p)
	{
		this.pagination = p;
		this.rebuild();
	},
	rebuild: function ()
	{
		var p = this.pagination;
		var page = p.page;
		var w = this.w;
		w.empty();
		var pages = Math.ceil(p.count / p.limit) - 1;
		if (page > 0)
		{
			var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
			new Element('a', {
				html: '<i class="el el-fast-backward"></i>',
				class: 'pure-button pure-menu-link',
				events: {
					click: this.change_page.bind(this, (0))
				}
			}).inject(li);

			var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
			new Element('a', {
				html: '<i class="el el-backward"></i>',
				class: 'pure-button pure-menu-link',
				events: {
					click: this.change_page.bind(this, (page - 1))
				}
			}).inject(li);
		}

		var start = page - 3;
		if (start < 0)
		{
			start = 0;
		}
		var end = page + 3;
		if (start == 0)
		{
			end = start + 6;
		}
		if (end > pages)
		{
			end = pages;
		}
		if (end >= pages)
		{
			start = end - (6 - (pages - end));
		}
		if (start < 0)
		{
			start = 0;
		}

		for (var i = start; i <= end; i++)
		{
			if (i == page)
			{
				var li = new Element('li', {
					html: '<span class="pure-button pure-button-active">' + (i + 1) + '</span>',
					class: 'pure-menu-selected pure-menu-item'
				}).inject(w);
			}
			else
			{
				var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
				new Element('a', {
					html: (i + 1),
					class: 'pure-button pure-menu-link',
					events: {
						click: this.change_page.bind(this, (i))
					}
				}).inject(li);
			}

		}
		if (page < pages)
		{
			var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
			new Element('a', {
				html: '<i class="el el-forward"></i>',
				class: 'pure-button pure-menu-link',
				events: {
					click: this.change_page.bind(this, (page + 1))
				}
			}).inject(li);

			var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
			new Element('a', {
				html: '<i class="el el-fast-forward"></i>',
				class: 'pure-button pure-menu-link',
				events: {
					click: this.change_page.bind(this, (pages))
				}
			}).inject(li);
		}
		this.set_page();
	},
	change_page: function (i, e)
	{
		if (e)
		{
			e.stop();
		}
		this.pagination.page = i;
		this.rebuild();
	},
	set_page: function ()
	{
		this.fireEvent('pagechanged', this.pagination);
	}

});
var DTable = new Class({
	Implements: [
		Events,
		Options
	],
	options: {
		table_headers: [
			{
				name: 'City',
				pid: 'city',
				type: 's'
			},
			{
				name: 'Year',
				pid: 'year',
				type: 'n'
			},
			{
				name: 'Applicant',
				pid: 'a',
				type: 's'
			},
			{
				name: 'Project title',
				pid: 'name',
				type: 's'
			}
		],
		sort_els: {
			'asc': '<i class="el el-caret-up"></i>',
			'desc': '<i class="el el-caret-down"></i>'
		}
	},
	initialize: function (el, options)
	{
		this.setOptions(options);
		this.pagination = {
			limit: 50,
			page: 0,
			count: 0
		};


		var t = new Element('table', {class: 'pure-table pure-table-bordered pure-table-striped'}).inject(el);
		this.build_head(t);
		this.pager = new DPager(el, {onPagechanged: this.change_page.bind(this)});
		this.el = new Element('tbody').inject(t);
	},
	build_head: function (t)
	{
		var h = new Element('thead').inject(t);
		var r = new Element('tr').inject(h);
		var o = this.options;
		var ho = o.table_headers;
		var se = o.sort_els;
		for (var i = 0; i < ho.length; i++)
		{
			var th = new Element('th').inject(r);
			var e = new Element('div', {
				class: 'pure-menu pure-menu-horizontal'
			}).inject(th);
			new Element('span', {class: 'pure-menu-heading', text: ho[i].name}).inject(e);
			var ul = new Element('ul', {class: 'pure-menu-list'}).inject(e);
			for (var pid in se)
			{
				var li = new Element('li', {class: 'pure-menu-item'}).inject(ul);
				new Element('a', {
					html: se[pid],
					class: 'pure-button pure-menu-link',
					events: {
						click: this.sort_table.bind(this, {col: ho[i], sort_type: pid})
					}
				}).inject(li);
			}
		}
	},
	set_data: function (data)
	{
		this.pagination.page = 0;
		this.pagination.count = data.length;
		this.table_data = data;
		this.pager.set_data(this.pagination);
	},
	change_page: function (p)
	{
		this.pagination = p;
		this.fill_table();
	},
	sort_table: function (o, e)
	{
		if (e)
		{
			e.stop();
		}
		console.log(o);
		var st = '';
		if (o.sort_type == 'desc')
		{
			st = 'DESC_';
		}
		switch (o.col.type)
		{
			case 's':
				st += 'STRING'
				break;
			case 'n':
				st += 'NUMERIC';
				break;
		}
		console.log(o.col.pid);
		console.log(Array[st]);
		this.table_data.sortOn(o.col.pid, Array[st]);
		this.pager.change_page(0);
	},
	fill_table: function ()
	{

		var w = this.el;
		w.empty();
		var pg = this.pagination;
		var d = this.table_data;
		var min = pg.page * pg.limit;
		var max = min + pg.limit;
		var ho = this.options.table_headers;
		if (max > d.length)
		{
			max = d.length;
		}
		for (var i = min; i < max; i++)
		{
			var r = new Element('tr');
			for (var j = 0; j < ho.length; j++)
			{
				var pid = ho[j].pid;
				new Element('td', {text: d[i][pid]}).inject(r);
			}
			r.inject(w);
		}
	}
});
Number.prototype.map = function (in_min, in_max, out_min, out_max)
{
	return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
};

var DataUtil = {
	point_graph: function ()
	{

	},
	count_arr: function (data)
	{
		var r = [];
		for (var pid in data)
		{
			r.include({pid: pid, count: data[pid].length});
		}
		return r;
	},
	get_max_len: function (data)
	{
		var max = 0;
		for (var pid in data)
		{
			var l = data[pid].length;
			if (l > max)
			{
				max = l;
			}
		}
		return max;
	},
	group_by_country: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			if (!r[d.country])
			{
				r[d.country] = [];
			}
			r[d.country].include(d);
		}
		return r;
	},
	group_by_year: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			if (!r[d.year])
			{
				r[d.year] = [];
			}
			r[d.year].include(d);
		}
		return r;
	},
	group_by_place: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			if (!r[d.pt_id])
			{
				r[d.pt_id] = [];
			}
			r[d.pt_id].include(d);
		}
		return r;
	},
	group_by_c: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			for (var j = 0; j < d.c.length; j++)
			{
				var dc = d.c[j];
				if (!r[dc])
				{
					r[dc] = [];
				}
				r[dc].include(d);
			}
		}
		return r;
	},
	group_by_g: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			if (!r[d.g])
			{
				r[d.g] = [];
			}
			r[d.g].include(d);
		}
		return r;
	},
	flatten_data: function (data)
	{
		var d = [];//data
		var p = {};
		var pd = [];//point data
		var pxd = {};
		var pid = 0;
		for (var i = 0; i < data.length; i++)
		{
			var dx = data[i];
			if (!p[dx.s])
			{
				p[dx.s] = {idx: pid};
				pxd[pid] = {s: dx.s, lat: dx.lat, lon: dx.lon, c: dx.c};
				pd.include({s: dx.s, lat: dx.lat, lon: dx.lon});
				pid = pd.length - 1;
			}
			else
			{
				pid = p[dx.s].idx;
			}
			var dt = dx.data;
			for (var pt_year in dt)
			{
				var y_d = dt[pt_year];
				for (var j = 0; j < y_d.length; j++)
				{
					var fd = y_d[j];
					var f_tp = [];
					for (var k = 0; k < fd.c.length; k++)
					{
						f_tp[k] = String.from(fd.c[k]);
					}
					var o = {
						pt_name: pd[pid].s,
						pt_id: pid,
						city: dx.s,
						country: dx.c,
						year: String.from(pt_year),
						a: fd.a,
						c: f_tp,
						g: String.from(fd.g),
						amount: fd.amount,
						name: fd.name
					};
					d.include(o);
				}
			}
		}
		return {
			data: d,
			points: pxd
		}
	}
};

(function ()
{
	Array.implement({
		filterOn: function (fields)
		{
			return this.filter(function (item)
			{
				var ret = true;
				for (var pid in fields)
				{
					var a = fields[pid];
					switch (pid)
					{
						case 'countries':
							if (!a.contains(item.country))
							{
								ret = false;
								return ret;
							}
							break;
						case 'years':
							if (!a.contains(item.year))
							{
								ret = false;
								return ret;
							}
							break;

						case 'tags':
							var b = [];
							for (var i = 0; i < item.c.length; i++)
							{
								if (a.contains(item.c[i]))
								{
									b.include(item.c[i]);
								}
							}
							if (b.length == 0)
							{
								ret = false;
								return ret;
							}
							break;
						case 'types':
							if (!a.contains(item.g))
							{
								ret = false;
								return ret;
							}
							break;

					}
				}
				return ret;
			});
		}
	});
})();

var FilterWin = new Class({
	Implements: [
		Events,
		Options
	],
	options: {current_switch: 0},
	initialize: function (el, options)
	{
		this.setOptions(options);
		this.visible = false;
		this.el = el;
		var b = el.getElement('a.switch');
		b.addEvent('click', this.sw.bind(this));
		this.switches = el.getElements('a.g-switch');
		this.bind_switches();
	},
	bind_switches: function ()
	{
		var s = this.switches;
		for (var i = 0; i < s.length; i++)
		{
			s[i].addEvent('click', this.switch_grants.bind(this, i));
		}
		this.switch_tabs(this.options.current_switch);
	},
	switch_grants: function (i, e)
	{
		if (e)
		{
			e.stop();
		}
		if (i != this.options.current_switch)
		{
			this.options.current_switch = i;//store current switch
			this.switch_tabs(i);
			this.show();//open the filter window
		}
		else
		{
			this.sw();//use as win show/hide switch
		}
	},
	switch_tabs: function (i)
	{
		var s = this.switches;
		for (var j = 0; j < s.length; j++)
		{
			if (j == i)
			{
				s[j].removeClass('dark-bg');
				s[j].addClass('light-bg');
			}
			else
			{
				s[j].removeClass('light-bg');
				s[j].addClass('dark-bg');
			}
		}
		this.fireEvent('typeswitch', this.options.current_switch);
	},
	sw: function (e)
	{
		if (e)
		{
			e.stop();
		}
		switch (this.visible)
		{
			case true:
				this.hide();
				break;
			default :
				this.show();
				break;

		}
	},
	show: function ()
	{
		this.visible = true;
		this.el.addClass('visible');
	},
	hide: function ()
	{
		this.visible = false;
		this.el.removeClass('visible');
	}
});
var GraphMarker = new Class({
	Implements: [
		Events,
		Options
	],
	options: {
		tips: null,
		pane: null
	},
	initialize: function (pt, map, graph_f, options)
	{
		this.setOptions(options);
		this.pt = pt;
		this.graph_f = graph_f;
		var o = this.options;
		this.tooltip_visible = false;
		var el = new Element('div', {
			styles: {
				title: pt.s,
				position: 'absolute',
				'z-index': 998
			},
			events: {
				mouseenter: this.to_front.bind(this),
				mouseleave: this.to_back.bind(this)
			}
		}).inject(o.pane);

		var g_el = new Element('div', {
			styles: {
				position: 'absolute',
				width: 200,
				height: 200,
				left: -100,
				top: -100,
				background: '#fff',
				'border-radius': '50%'
			},
			class: 'ct-chart'
		}).inject(el);

		var g_d = {
			graph_data: pt.data,
			graph_descs: graph_f.c,
			graph_group: 'c'
		}

		new PieGraph(g_el, g_d, {
			tips: this.options.tips
		});
		/*
		 var g = new Chartist.Pie(g_el,
		 {
		 series: this.mk_graph(pt)
		 },
		 {
		 donut: true,
		 donutWidth: 50,
		 showLabel: false
		 });
		 g.on('created', this.graph_bind_events.bind(this, g_el));
		 */

		new Element('div',
			{
				html: '<div><header>' + pt.pt.s + '</header></div><div>' + pt.data.length + '</div>',
				class: 'graph-inner',
				events: {
					click: this.destroy.bind(this, map)
				}
			}).inject(el);
		//this.g = g;


		this.el = el;
		this.reposition(map);

		map.on('zoomstart', this.before_zoom.bind(this));
		map.on('zoomend', this.reposition.bind(this, map));
	},
	graph_bind_events: function (el)
	{
		var s = el.getElements('.ct-series');
		var l = s.length;
		for (var i = 0; i < s.length; i++)
		{
			var j = (l - 1 - i);
			s[i].addEvents({
				click: this.show_hide_tooltip.bind(this, j)
			});
			s[i].store('tip:title', this.pt.s);
			s[i].store('tip:text', this.mk_text(j));
		}
		this.slices = s;
		var o = this.options;
		if (o.tips !== null)
		{
			o.tips.attach(s);
		}
	},
	mk_text: function (i)
	{

		var g = this.g_data[i].v;
		var p = this.pt_data;
		var d = this.desc;
		var str = d[i].nm + ': <strong>' + d[i].count + '</strong>';
		return str;
	},
	show_tooltip: function (i)
	{
		this.options.tips.show();
		this.tooltip_visible = true;
	},
	hide_tooltip: function (i)
	{
		this.tooltip_visible = false;
	},
	show_hide_tooltip: function (i)
	{
		if (this.tooltip_visible == true)
		{
			this.hide_tooltip(i);
		}
		else
		{
			this.show_tooltip(i);
		}
	},
	mk_graph: function (p)
	{
		var graph_f = this.graph_f;
		var d = {};
		var pdt = [];
		for (var pid in p.data)
		{
			var a = p.data[pid];
			for (var i = 0; i < a.length; i++)
			{
				var dt = a[i].c;
				for (var j = 0; j < dt.length; j++)
				{
					var t = dt[j];
					if (!d[t])
					{
						d[t] = 0;
					}
					d[t]++;
				}
			}
		}
		for (var pid in d)
		{
			pdt.include({
				name: pid,
				value: d[pid]
			});
		}
		pdt.sortOn("value", Array.NUMERIC);
		var g_data = [];
		var desc = [];
		var r = [];
		var l = pdt.length - 1;
		for (var i = 0; i <= l; i++)
		{
			var k = l - i;
			desc[i] = {
				nm: graph_f.c[pdt[k].name],
				count: pdt[k].value
			}
			g_data[i] = {
				v: pdt[k].value,
				t: pdt[k].name
			}
			r[i] = {
				data: pdt[k].value,
				className: 'graph-' + (i % 17)
			}
		}
		this.pt_data = p;
		this.g_data = g_data;
		this.desc = desc;
		return (r);
	},
	before_zoom: function ()
	{
		this.el.setStyles({
			display: 'none'
		});
	},
	reposition: function (map)
	{
		var pt = this.pt;
		var ps = map.latLngToLayerPoint([
			pt.pt.lat,
			pt.pt.lon
		]);

		this.el.setStyles({
			display: 'block',
			transform: 'translate3d(' + ps.x + 'px, ' + ps.y + 'px, 0px)'
		});

	},
	destroy: function (map)
	{
		this.options.tips.detach(this.slices);
		//this.g.detach();
		this.el.destroy();
		map.off('zoomstart', this.before_zoom.bind(this));
		map.off('zoomend', this.reposition.bind.bind(this, map));

		this.fireEvent('destroy');
		this.removeEvents();
	},
	to_front: function ()
	{
		this.el.setStyles({
			'z-index': 999
		});
	},
	to_back: function ()
	{
		this.el.setStyles({
			'z-index': 998
		});
	}
});
var MessageWin = new Class({
	initialize: function (el)
	{
		this.el = el;
	},
	set_message: function (m)
	{
		this.el.empty();
		this.el.set('html', m);
	}
});
var PageScroller = new Class({
	Implements: [Events, Options],
	initialize: function (els, options)
	{
		var titles = [];
		for (var i = 0; i < els.length; i++)
		{
			titles[i] = els[i].get('title');
		}
		this.titles = titles;
		this.els = els;
		this.s = 0;
		this.classes = [
			'el el-arrow-up scroll-btn pure-button light-bg',
			'el el-arrow-down scroll-btn pure-button light-bg'
		];
		this.setOptions(options);
		this.build_html();
		this.recalculate();
		window.addEvents(
			{
				resize: this.recalculate.bind(this),
				scroll: this.recalculate.bind(this)
			}
		);
	},
	build_html: function ()
	{
		var c = this.classes;
		var s = [];
		var w = new Element('div', {class: 'page-scroller'}).inject(document.body);
		for (var i = 0; i < 2; i++)
		{
			s[i] = new Element('i', {class: c[i], events: {click: this.sc_clicked.bind(this, i)}}).inject(w);
		}
		this.c = s;
	},
	sc_clicked: function (i, e)
	{
		if (e)
		{
			e.stop();
		}
		var s = this.s;
		switch (i)
		{
			case 0:
				s--;
				break;
			case 1:
				s++;
				break;
		}
		if (s < 0)
		{
			s = 0;
		}
		if (s >= this.els.length)
		{
			s = this.els.length - 1;
		}
		this.scroll_to(s);
	},
	scroll_to: function (i)
	{
		if (i != this.s)
		{
			new Fx.Scroll(window).toElement(this.els[i], 'y');
			this.s = i;
		}
	},
	recalculate: function ()
	{
		var els = this.els;
		var ws = window.getScroll();
		var s = 0;
		for (var i = 0; i < els.length; i++)
		{
			var c = els[i].getCoordinates();
			if (ws.y >= c.top)
			{
				s = i;
			}
		}
		if (s <= 0)
		{
			this.c[0].addClass('c-hidden');
		}
		else
		{
			this.c[0].set('title', this.titles[s - 1]);
			this.c[0].removeClass('c-hidden');
		}

		if (s >= this.els.length - 1)
		{
			this.c[1].addClass('c-hidden');
		}
		else
		{
			this.c[1].set('title', this.titles[s + 1]);
			this.c[1].removeClass('c-hidden');
		}
		this.s = s;
	}
});
var PieGraph = new Class({
	options: {
		tips: null
	},
	Implements: [Events, Options],
	initialize: function (el, data, options)
	{
		this.data = data;
		this.setOptions(options);
		var g_data = this.mk_graph(data);
		this.g_data = g_data;

		var g = new Chartist.Pie(el,
			{
				series: g_data.g
			},
			{
				donut: true,
				donutWidth: 50,
				showLabel: false
			});
		g.on('created', this.graph_bind_events.bind(this, el));
	},
	mk_graph: function (data)
	{
		console.log(data);
		var c_d = DataUtil.group_by_c(data.graph_data);
		var s = DataUtil.count_arr(c_d);
		s.sortOn("count", Array.DESC_NUMERIC);
		var c = [];
		var d = [];
		for (var i = 0; i < s.length; i++)
		{
			c.include({data: s[i].count, className: 'graph-' + (i % 17)});
			d.include(s[i].pid);
		}
		return {g: c, d: d};
	},
	graph_bind_events: function (el)
	{
		console.log('bind tips');
		console.log(this.data);
		var d = this.data.graph_descs;
		var map = this.g_data.d;

		var s = el.getElements('.ct-series');
		var l = s.length;
		var l1 = l - 1;
		for (var i = 0; i < l; i++)
		{
			console.log(i);
			var j = (l1 - i);
			s[i].store('tip:title', d[map[j]]);
			/*
			 s[i].store('tip:text', this.mk_text(j));
			 */
		}
		this.slices = s;
		var o = this.options;

		if (o.tips !== null)
		{
			o.tips.attach(s);
		}

	}
});
var PlaceFilter = new Class({
	Implements: [Events, Options],
	initialize: function (data, filterdata, country_filters, options)
	{
		console.log(data);
		this.setOptions(options);

		this.created_filter = {years: false, countries: false, types: false, tags: false};

		var p = $('filter_pane');


		this.select_filters = ['countries', 'types', 'tags'];
		this.cc_s = 0;

		this.msg = {};

		this.data = data;
		this.p_data = [];
		this.f_data = [];
		this.f_points = [];
		this.f_filters = {};

		this.filterdata = filterdata;
		this.country_filters = country_filters;

		this.pref = [];
		this.filtered_data = [];//all filtersdata


		this.year_sel = new YearSel($$('ul.years')[0], mapconf.year_bounds, {
			onRangechanged: this.filter_years.bind(this)
		});

		this.build_selects(p);

		new FilterWin(p, {
			onTypeswitch: this.switch_data.bind(this)
		});

		this.cc_switches = $$('#city-country a');
		this.cc_switches_bind();

	},

	check_created: function ()
	{
		var c = this.created_filter;
		var created = true;
		for (var pid in c)
		{
			if (c[pid] == false)
			{
				created = false;
			}
		}
		if (created == true)
		{
			this.fireEvent('created');
		}
	},
	cc_switches_bind: function ()
	{
		var cc = this.cc_switches;
		for (var i = 0; i < cc.length; i++)
		{
			cc[i].addEvent('click', this.cc_sw.bind(this, i));
		}
		this.cc_sw(this.cc_s);
	},
	cc_sw: function (i, e)
	{
		if (e)
		{
			e.stop();
		}
		var cc = this.cc_switches;
		for (var j = 0; j < cc.length; j++)
		{
			if (j == i)
			{
				cc[j].removeClass('dark-bg');
				cc[j].addClass('light-bg');
			}
			else
			{
				cc[j].removeClass('light-bg');
				cc[j].addClass('dark-bg');
			}
		}
		if (i != this.cc_s)
		{
			this.cc_s = i;
			this.switch_data(this.sel_filter);
		}
	},
	get_cc_data: function (data)
	{
		var r = [];
		var cc = this.cc_s;
		if (cc == 0)
		{
			r = data;
		}
		else
		{
			var c = {};
			for (var i = 0; i < data.length; i++)
			{
				var d = data[i];
				if (!c[d.c])
				{
					c[d.c] = countries_geo[d.c]
					c[d.c]['data'] = {};
				}
				for (var pid in d.data)
				{
					if (!c[d.c]['data'][pid])
					{
						c[d.c]['data'][pid] = [];
					}
					c[d.c]['data'][pid].append(d.data[pid]);
				}
			}
			for (var pid in c)
			{
				r.include(c[pid]);
			}
		}
		return r;
	},
	prepare_countries: function (d)
	{
		var cts = this.country_filters;
		var a = mapconf.visegrad;
		var r = {};
		for (var pid in cts)
		{
			if (a.contains(pid) || d[pid])
			{
				r[pid] = cts[pid];
			}
		}
		this.countries_prefiltered = r;
		return r;
	},
	get_msg: function ()
	{
		var m = 'All grants hosted ';
		var msgs = this.msg;
		var m_a = [];
		for (var pid in msgs)
		{
			switch (pid)
			{
				case 'years':
					m_a[1] = 'for period ' + msgs[pid];
					break;
				case 'countries':
					if (msgs[pid] == 'all')
					{
						m_a[0] = 'in ' + msgs[pid] + ' ' + pid;
					}
					else
					{
						m_a[0] = 'in ' + msgs[pid];
					}
					break;
				case 'types':
					if (msgs[pid] == 'all')
					{
						m_a[2] = 'in ' + msgs[pid] + ' ' + pid;
					}
					else
					{
						m_a[2] = 'in ' + msgs[pid];
					}
					break;
				case 'tags':
					if (msgs[pid] == 'all')
					{
						m_a[3] = 'in ' + msgs[pid] + ' ' + pid;
					}
					else
					{
						m_a[3] = 'in ' + msgs[pid];
					}
					break;
			}
		}
		m = m + m_a.join(' ');
		return m;
	},
	build_selects: function (el)
	{
		var s = el.getElements('select');
		var a = el.getElements('a.s-all');
		var n = el.getElements('a.s-none');
		var d = this.select_filters;
		var selects = {};
		this.filt_arr = {};
		for (var i = 0; i < s.length; i++)
		{
			this.filt_arr[d[i]] = [];
			selects[d[i]] = new SelectFilter(s[i], a[i], n[i], {
				onFilterchange: this.set_filt_arr.bind(this, d[i])
			});
		}
		this.selects = selects;

	},
	set_filt_arr: function (i, d)
	{
		this.msg[i] = d.msg;
		this.filt_arr[i] = d.filter;
		var prefiltered = this.prefilter();
		this.p_data = prefiltered;
		this.year_sel.set_data(prefiltered);
	},
	switch_data: function (i)
	{
		this.sel_filter = i;

		var s = this.selects;
		var data = this.data;
		var fd = this.filterdata[i];

		this.f_points = data[i].points;
		this.f_data = data[i].data;
		this.p_data = [];

		this.f_filters = fd;

		var dc = DataUtil.group_by_country(data[i].data);
		s['countries'].set_data(this.prepare_countries(dc));
		s['types'].set_data(fd.g);
		s['tags'].set_data(fd.c);
	},
	filter_years: function (y)
	{
		this.msg['years'] = y.msg;
		var yrs = y.years;
		var d = this.p_data;
		var f = {years: yrs};
		var tmp_d = d.filterOn(f);
		this.filter(tmp_d);
	},
	prefilter: function ()
	{
		var f = this.filt_arr;
		var data = this.f_data;
		return data.filterOn(f);
	},
	filter: function (data)
	{
		var msg = this.get_msg();
		var r = {
			points: this.f_points,
			data: data,
			message: msg,
			sel: this.sel_filter
		};
		this.fireEvent('filterchanged', r);
	}
});
var SelectFilter = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (el, a, n, options)
	{
		this.created = false;
		this.setOptions(options);
		this.el = el;
		this.filter = [];
		this.els = [];
		a.addEvent('click', this.select_all.bind(this));
		n.addEvent('click', this.select_none.bind(this));
	},
	get_message: function ()
	{
		var els = this.els;
		var a = this.filter;
		var r_a = [];
		var all = true;
		var m = 'none';
		for (var pid in els)
		{
			if (a.contains(pid))
			{
				r_a.include(els[pid].get('text'));
			}
			else
			{
				all = false;
			}
		}
		if (all == true)
		{
			m = 'all'
		}
		else if (r_a.length > 0)
		{
			m = r_a.join(', ');
		}
		return m;
	},
	set_data: function (data)
	{
		this.rebuild(data);
		this.select_all();
	},
	rebuild: function (data)
	{
		var el = this.el;
		el.empty();
		var els = {}
		for (var pid in data)
		{
			var e = new Element('option', {
				value: pid,
				text: data[pid],
				events: {
					mousedown: this.prevent.bind(this),
					mouseup: this.prevent.bind(this),
					click: this.change_filters.bind(this, pid)
				}
			}).inject(el);
			els[pid] = e;
		}
		this.els = els;
	},
	prevent: function (e)
	{
		e.stop();
	},
	change_filters: function (pid, e)
	{
		if (e)
		{
			e.stop();
		}
		var els = this.els;
		if (els[pid].selected == true)
		{
			els[pid].selected = false;
		}
		else
		{
			els[pid].selected = true;
		}
		var tmps = [];
		for (var pid in els)
		{
			if (els[pid].selected == true)
			{
				tmps.push(pid);
			}
		}
		this.filter = tmps;
		this.select_change();
	},
	select_all: function (e)
	{
		if (e)
		{
			e.stop();
		}
		var els = this.els;
		var tmps = [];
		for (var pid in els)
		{
			els[pid].selected = true;
			tmps.push(pid);
		}
		this.filter = tmps;
		this.select_change();
	},
	select_none: function (e)
	{
		if (e)
		{
			e.stop();
		}
		var els = this.els;
		for (var pid in els)
		{
			els[pid].selected = false;
		}
		this.filter = [];
		this.select_change();
	},
	select_change: function ()
	{
		var msg = this.get_message();
		this.fireEvent('filterchange', {filter: this.filter, msg: msg});
	}
});
var VisegradApp = {
	initiated: false,
	init: function ()
	{
		if (this.initiated == false)
		{
			this.initiated = true;
			var dt = [];
			for (var i = 0; i < mapdata.length; i++)
			{
				dt[i] = DataUtil.flatten_data(mapdata[i]);
			}

			this.msg_win = new MessageWin($('filter-message'));

			new PageScroller($$('section.page-section'));

			var tips = new Tips();
			this.map = new AppMap($(mapid), $('map-controls'), mapconf, {tips: tips});
			//this.graph = new DGraph($('e-graphs'));
			this.table = new DTable($('e-table'));

			this.filter = new PlaceFilter(dt, filters, filter_countries, {
				onFilterchanged: this.draw.bind(this)
			});
		}
	},
	draw: function (d)
	{
		var data = d.data;
		var message = d.message;
		var pts=d.points;
		var sel = d.sel;
		this.msg_win.set_message(message);
		this.map.draw_points(data, pts, filters[sel]);
		//this.graph.set_data(data);
		this.table.set_data(data);
	}
};

window.addEvent('domready', VisegradApp.init.bind(VisegradApp));
var YearDrag = new Class({
	Implements: [
		Events,
		Options
	],
	drags: [
		'min',
		'max'
	],
	initialize: function (el, divs, options)
	{
		this.setOptions(options);
		var w = el.getParent();
		w.setStyles({
			position: 'relative'
		});

		var el = new Element('div', {
			styles: {
				position: 'absolute',
				width: '100%',
				height: '20px',
				bottom: 10,
				left: 0,
				padding: '1em'
			}
		}).inject(w);
		var d_w = new Element('div', {
			styles: {
				position: 'relative',
				'border-top': '2px solid #000'
			}
		}).inject(el);
		var sliders = [];
		for (var i = 0; i < 2; i++)
		{
			sliders[i] = new Element('a', {
				styles: {
					display: 'block',
					width: 20,
					height: 30,
					top: -15,
					cursor: 'pointer',
					'text-align': 'center',
					'padding-top': '0.2em',
					position: 'absolute'
				},
				html: '<i class="el el-caret-up"></i>'
			}).inject(d_w);
		}
		new YearSlider(d_w, sliders, divs, {
			onChanged: this.sliders_changed.bind(this)
		});
	},
	sliders_changed: function (range)
	{
		this.fireEvent('changed', range);
	}
});
var YearSel = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (el, bounds, options)
	{
		this.created = false;
		this.setOptions(options);
		this.p_d = {
			data: {},
			max: 0
		};
		this.bounds = bounds;
		this.build_elements(bounds, el);
		this.data = [];
		this.drag = new YearDrag(el, this.vals.length, {
			onChanged: this.change_vals.bind(this)
		});
	},
	get_message: function ()
	{
		var f = this.range;
		var min = f[0];
		var max;
		var m = '';
		for (var i = 0; i < f.length; i++)
		{
			max = Number.from(f[i]);
		}
		if (min != max)
		{
			m = min + '-' + max
		}
		else
		{
			m = min;
		}
		return m;
	},
	build_elements: function (b, el)
	{
		var bars = [];
		var vals = [];
		for (var i = b.min; i <= b.max; i++)
		{
			var li = new Element('li');
			var y_c = new Element('div', {
				class: 'year-container'
			}).inject(li);

			var ba = new Element('div').inject(y_c);
			var va = new Element('div', {class: 'year-val', text: i}).inject(li);
			li.inject(el);
			vals.include(va);
			bars.include(ba);
		}
		this.bars = bars;
		this.vals = vals;
	},
	set_data: function (data)
	{
		this.p_d = this.prepare_data(DataUtil.group_by_year(data));

		this.redraw_divs();

		if (this.created == false)
		{
			this.created = true;
			this.fireEvent('filtercreated');
		}
	},
	redraw_divs: function ()
	{
		var bars = this.bars;
		var vals = this.vals;
		var lim = this.limit;

		var f = [];

		var dt = this.p_d;
		var data = dt.data;
		var m = dt.max / 100;

		for (var i = 0; i < vals.length; i++)
		{
			var y = vals[i].get('text');
			var v = 0;
			var hg = 0;
			var t = '';
			if (data[y])
			{
				v = data[y].length;
			}
			if (v > 0)
			{
				hg = v / m;
				t = String.from(v);
			}
			bars[i].set('text', t).setStyles({
				height: hg + '%'
			});
			if (i >= lim.min && i < lim.max)
			{
				bars[i].addClass('sel');
				f.include(y);
			}
			else
			{
				bars[i].removeClass('sel');
			}
		}
		this.range = f;
		var ret = {
			years: f,
			msg: this.get_message()
		}
		this.fireEvent('rangechanged', ret);

	},
	change_vals: function (d)
	{
		this.limit = d;
		this.redraw_divs();
	},
	prepare_data: function (data)
	{
		var max = DataUtil.get_max_len(data);
		return {data: data, max: max};
	}
});
var YearSlider = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (wrapper, sliders, divs, options)
	{
		this.setOptions(options);
		this.w = wrapper;
		this.sliders = sliders;

		var d = [];
		var l = sliders.length - 1;

		this.bounds = {};
		this.bounds['divs'] = divs;

		for (var i = 0; i < l + 1; i++)
		{
			d[i] = new Drag(sliders[i], {
				onComplete: this.snap.bind(this, i)
			});
		}
		this.drags = d;

		this.slidersel = [0, divs];
		this.set_size();
		this.chng();
		window.addEvent('resize', this.set_size.bind(this));
	},
	set_size: function ()
	{
		var wrapper = this.w;
		var w_s = wrapper.getSize();
		var divs = this.bounds.divs;

		var grid = Math.round(w_s.x / divs);
		var d = this.drags;
		var sliders = this.sliders;
		var slidersel = this.slidersel;
		var l = sliders.length - 1;

		for (var i = 0; i < d.length; i++)
		{
			var s_s = sliders[i].getSize();
			var x = Math.round(s_s.x / 2);
			var y = Math.round(s_s.y / 2);

			var s_p = (slidersel[i] * grid - x);
			sliders[i].setStyles({
				left: s_p
			});
			var min_x = 0 - x;
			var max_x = w_s.x - x;

			d[i].options.limit = {
				x: [
					min_x + (Math.round(w_s.x / divs) * i),
					max_x - Math.round(w_s.x / divs) * (l - i)
				],
				y: [
					0 - y,
					0 - y
				]
			};
			d[i].options.grid = grid;
		}
		this.bounds['x'] = {
			min: min_x,
			max: max_x
		};
		this.bounds['grid'] = grid;
	},
	snap: function (i, el)
	{
		var b = this.bounds;
		var p = el.getPosition(this.w);
		switch (i)
		{
			case 0:
				this.drags[1].options.limit.x[0] = p.x + b.grid;
				this.slidersel[0] = Math.round((p.x - b.x.min) / b.grid);
				break;
			case 1:
				this.drags[0].options.limit.x[1] = p.x - b.grid;
				this.slidersel[1] = Math.round((p.x - b.x.min) / b.grid);
				break;
		}
		this.chng();
	},
	chng: function ()
	{
		var s = this.slidersel;
		var r = {
			min: s[0],
			max: s[1]
		}
		this.fireEvent('changed', r);
	}
});
var mapconf = {
	url: 'http://{s}.tile.stamen.com/{id}/{z}/{x}/{y}.png',
	attr: 'one',
	graph_names: ["Grant programs", "Activity fields", "Countries"],
	visegrad: ["CZ", "HU", "PL", "SK"],
	subdomains: 'a.b.c.d'.split('.'),
	map_id: 'toner',
	min_z: 5,
	max_z: 10,
	min_radius: 5,
	v4_bounds: [
		[
			55.0721744,
			12.1004461
		],
		[
			45.7268402,
			24.1729511
		]
	],
	year_bounds: {
		min: 2000,
		max: 2015
	}
};
var mapid = 'map-main';