!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var r=n(2),o=i(r),s=n(4),u=i(s),a=n(3);window.onload=function(){var e=new u.default;e.onmessage=function(e){var t=e.data,n=t.finalRatio,i=t.stddev;document.querySelector(".finalRatio").innerHTML="Average: <em>"+n+"</em>",document.querySelector(".stddev").innerHTML="Standard Deviation: <em>"+i+"</em>"};var t=document.querySelector(".run"),n=document.querySelector(".simulate"),i=1e3,r=null;t.addEventListener("click",function(e){r&&clearInterval(r);var t=document.querySelector(".percolation-view-container"),n=parseInt(document.querySelector(".n").value),s=parseInt(document.querySelector(".n").value);i=parseInt(s)?s:i;var u=100/n,d=n*n;t.innerHTML="";for(var c=1;c<=d;c++){var l=document.createElement("div");l.id=c,l.classList.add("grid-node"),l.style.width=u+"%",l.style.height=u+"%",t.appendChild(l)}var h=new o.default(d+2),f=!1;r=setInterval(function(){var e=(0,a.getRandomInt)(1,d+1),t=h.connectNeighbors(e),n=h.percolates();if(t&&!f){var i=document.getElementById(e);i.classList.add("grid-node-open"),f=n}if(f){for(var o=h.root(e),s=1;s<=d;s++)if(h.root(s)===o){var u=document.getElementById(s);u.classList.add("grid-node-full")}clearInterval(r)}},i)}),n.addEventListener("click",function(t){var n=parseInt(document.querySelector(".n_r").value),i=parseInt(document.querySelector(".s").value);e.postMessage({n:n*n,s:i})})}},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){function e(t){n(this,e),this.dim=Math.sqrt(t-2),this.nodeZeroId=t-1,this.nodeEndId=t,this.sw=[],this.id=[],this.open=[];for(var i=1;i<=t;i++)this.sw[i]=1,this.id[i]=i,this.open[i]=!1;this.open[this.nodeZeroId]=!0,this.open[this.nodeEndId]=!0,this.counter=t}return i(e,[{key:"root",value:function(e){for(;e!=this.id[e];)this.id[e]=this.id[this.id[e]],e=this.id[e];return e}},{key:"openSite",value:function(e){this.open[e]=!0}},{key:"isOpened",value:function(e){return this.open[e]}},{key:"connectNeighbors",value:function(e){var t=this;return!this.isOpened(e)&&(this.openSite(e),this.getAllNeighbors(e).forEach(function(n){t.isOpened(n)&&t.union(e,n)}),!0)}},{key:"percolates",value:function(){return this.isConnected(this.nodeZeroId,this.nodeEndId)}},{key:"getAllNeighbors",value:function(e){var t=Math.ceil(e/this.dim),n=e%this.dim===0?this.dim:e%this.dim,i=[];if(t>1){var r=this.dim*(t-2)+n;i.push(r)}else i.push(this.nodeZeroId);if(t<this.dim){var o=this.dim*t+n;i.push(o)}else i.push(this.nodeEndId);if(n>1){var s=this.dim*(t-1)+n-1;i.push(s)}if(n<this.dim){var u=this.dim*(t-1)+n+1;i.push(u)}return i}},{key:"union",value:function(e,t){var n=this.root(e),i=this.root(t);return n!==i&&(this.sw[n]<this.sw[i]?(this.id[n]=i,this.sw[i]+=this.sw[n]):(this.id[i]=n,this.sw[n]+=this.sw[i]),this.counter--),this}},{key:"isConnected",value:function(e,t){return this.root(e)===this.root(t)}}]),e}();t.default=r},function(e,t){"use strict";function n(e,t){return Math.floor(Math.random()*(t-e))+e}Object.defineProperty(t,"__esModule",{value:!0}),t.getRandomInt=n},function(e,t,n){e.exports=function(){return new Worker(n.p+"32657c747b225a5ccdac.worker.js")}}]);