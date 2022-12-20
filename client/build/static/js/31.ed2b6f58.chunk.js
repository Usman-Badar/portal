/*! For license information please see 31.ed2b6f58.chunk.js.LICENSE.txt */
(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[31],{101:function(t,e,n){},134:function(t,e,n){"use strict";var r=n(138),o=n(139);function a(){}e.a=a,function(t){"undefined"!==typeof window&&(window.spoken=a);var e=new(window.SpeechRecognition||window.webkitSpeechRecognition||Object);function n(t,e){for(var n=t.results,r=[],o=0;o<n.length;o++)r.push(n[o][0].transcript),n[o].isFinal&&e(n[o][0].transcript,t);a.listen.partialcb(r.join(""),t),r.length=0}e.interimResults=!0,e.lang=navigator.language||"en-US",a.recognition=e,a.voices=function(){var t=Object(o.a)(Object(r.a)().mark((function t(e){return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){var e=speechSynthesis.getVoices();e.length&&t(e),speechSynthesis.onvoiceschanged=function(e){return t(speechSynthesis.getVoices())}})));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),a.say=function(){var t=Object(o.a)(Object(r.a)().mark((function t(n){var i,c,s,u,l=arguments;return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=l.length>1&&void 0!==l[1]?l[1]:"Alex",c=new SpeechSynthesisUtterance(n),t.next=4,a.voices();case 4:return s=t.sent,u=e.lang,c.voice=i?(s.filter((function(t){return t.name==i}))||s)[0]:(s.filter((function(t){return t.lang==u}))||s)[0],t.abrupt("return",new Promise((function(t){c.onend=Object(o.a)(Object(r.a)().mark((function e(){return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t(c));case 1:case"end":return e.stop()}}),e)}))),speechSynthesis.speak(c)})));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),a.listen=Object(o.a)(Object(r.a)().mark((function t(){var i,c=arguments;return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=c.length>0&&void 0!==c[0]?c[0]:{},e.onstart=a.listen.startcb,e.onend=a.listen.endcb,e.onerror=a.listen.errorcb,e.continuous=i.continuous,t.abrupt("return",new Promise((function(t,a){e.onresult=function(){var e=Object(o.a)(Object(r.a)().mark((function e(o){return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",n(o,t));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();try{e.start()}catch(i){a(i)}})));case 6:case"end":return t.stop()}}),t)}))),a.delay=function(t){return new Promise((function(e){return setTimeout(e,t)}))},a.listen.stop=function(){var t=Object(o.a)(Object(r.a)().mark((function t(e){return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a.recognition.stop();case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),a.listen.on={partial:function(t){return a.listen.partialcb=t},start:function(t){return a.listen.startcb=t},end:function(t){return a.listen.endcb=t},error:function(t){return a.listen.errorcb=t}},a.listen.partialcb=function(t){return!0},a.listen.startcb=function(t){return!0},a.listen.endcb=function(t){return!0},a.listen.errorcb=function(t){return!0},a.listen.available=function(t){return!!e.start}}()},137:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},138:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(13);function o(){o=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,a=Object.defineProperty||function(t,e,n){t[e]=n.value},i="function"==typeof Symbol?Symbol:{},c=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(I){l=function(t,e,n){return t[e]=n}}function f(t,e,n,r){var o=e&&e.prototype instanceof d?e:d,i=Object.create(o.prototype),c=new C(r||[]);return a(i,"_invoke",{value:x(t,n,c)}),i}function p(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(I){return{type:"throw",arg:I}}}t.wrap=f;var h={};function d(){}function m(){}function g(){}var b={};l(b,c,(function(){return this}));var v=Object.getPrototypeOf,j=v&&v(v(E([])));j&&j!==e&&n.call(j,c)&&(b=j);var O=g.prototype=d.prototype=Object.create(b);function y(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function o(a,i,c,s){var u=p(t[a],t,i);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==Object(r.a)(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,c,s)}),(function(t){o("throw",t,c,s)})):e.resolve(f).then((function(t){l.value=t,c(l)}),(function(t){return o("throw",t,c,s)}))}s(u.arg)}var i;a(this,"_invoke",{value:function(t,n){function r(){return new e((function(e,r){o(t,n,e,r)}))}return i=i?i.then(r,r):r()}})}function x(t,e,n){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return D()}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var c=k(i,n);if(c){if(c===h)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var s=p(t,e,n);if("normal"===s.type){if(r=n.done?"completed":"suspendedYield",s.arg===h)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r="completed",n.method="throw",n.arg=s.arg)}}}function k(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,k(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),h;var o=p(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,h;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function A(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function C(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(A,this),this.reset(!0)}function E(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:D}}function D(){return{value:void 0,done:!0}}return m.prototype=g,a(O,"constructor",{value:g,configurable:!0}),a(g,"constructor",{value:m,configurable:!0}),m.displayName=l(g,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,l(t,u,"GeneratorFunction")),t.prototype=Object.create(O),t},t.awrap=function(t){return{__await:t}},y(w.prototype),l(w.prototype,s,(function(){return this})),t.AsyncIterator=w,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new w(f(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},y(O),l(O,u,"Generator"),l(O,c,(function(){return this})),l(O,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=E,C.prototype={constructor:C,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),S(n),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;S(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:E(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),h}},t}},139:function(t,e,n){"use strict";function r(t,e,n,r,o,a,i){try{var c=t[a](i),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(r,o)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var i=t.apply(e,n);function c(t){r(i,o,a,c,s,"next",t)}function s(t){r(i,o,a,c,s,"throw",t)}c(void 0)}))}}n.d(e,"a",(function(){return o}))},192:function(t,e,n){var r,o;!function(a){if(void 0===(o="function"===typeof(r=a)?r.call(e,n,e,t):r)||(t.exports=o),!0,t.exports=a(),!!0){var i=window.Cookies,c=window.Cookies=a();c.noConflict=function(){return window.Cookies=i,c}}}((function(){function t(){for(var t=0,e={};t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}function e(t){return t.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function n(r){function o(){}function a(e,n,a){if("undefined"!==typeof document){"number"===typeof(a=t({path:"/"},o.defaults,a)).expires&&(a.expires=new Date(1*new Date+864e5*a.expires)),a.expires=a.expires?a.expires.toUTCString():"";try{var i=JSON.stringify(n);/^[\{\[]/.test(i)&&(n=i)}catch(u){}n=r.write?r.write(n,e):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=encodeURIComponent(String(e)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var c="";for(var s in a)a[s]&&(c+="; "+s,!0!==a[s]&&(c+="="+a[s].split(";")[0]));return document.cookie=e+"="+n+c}}function i(t,n){if("undefined"!==typeof document){for(var o={},a=document.cookie?document.cookie.split("; "):[],i=0;i<a.length;i++){var c=a[i].split("="),s=c.slice(1).join("=");n||'"'!==s.charAt(0)||(s=s.slice(1,-1));try{var u=e(c[0]);if(s=(r.read||r)(s,u)||e(s),n)try{s=JSON.parse(s)}catch(l){}if(o[u]=s,t===u)break}catch(l){}}return t?o[t]:o}}return o.set=a,o.get=function(t){return i(t,!1)},o.getJSON=function(t){return i(t,!0)},o.remove=function(e,n){a(e,"",t(n,{expires:-1}))},o.defaults={},o.withConverter=n,o}((function(){}))}))},354:function(t,e,n){},555:function(t,e,n){"use strict";n.r(e);var r=n(138),o=n(139),a=n(5),i=n(1),c=(n(354),n(11)),s=n(27),u=n(3),l=n(88),f=n.n(l),p=n(90),h=(n(91),n(134)),d=n(98),m=n(192),g=n.n(m),b="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEVklEQVRoge3ZW4hVVRgH8N80UzpeGpMuYBoSVNrtIUq6Ylhh9JB0UYguolZPRVAPQfXQU1RvQT0YQRelwiCsiLDS0iioh4zA0kKKMq0kG5tJzSZPD9/a7HE6ndlnz95nDPrDZm/W5fv+67bX/1uL/1EIR2Ej3k/f/1lciUZ6rhhnLmPCS/KGvDjOXEpjOvZjKD37U1otqHPe3oKJeBvvpO+ba/RXGzaLKXUDbkzfn48roxK4QBDfjQk4Bj+ltPPrcFjX1FqR3s/jDxzE6hF5Rzx68avo/TOHpc9Jaf2YNA682sZSQfjDJnkfpbzbOsqoJDYJssub5K1IeRs7yqgETschDGBqk/wp+E00Zk6Vjqte7MvRhZdFY0ZiEGvS99KKfVeGHuwUvX1hi3IXpTI/4ugO8GobiwTBLwuU3ZLKXlsro5J4XZC7t0DZ+1LZ16py3lWwXK9YqFMxLX1PTu/j0IdHxEKfKXb0VjgBO8QafQB7xd4ziN/Tu1+ss0EhOEdtyK1YkEhNS2Qzon04Ft2FmssrWFKw7BosLlj2L/G32ytv6IBo7CA2dOFn0UOtcCBVyIwNDnsyY3vxNHYVJDcDd4jOyjpxyrAn68QpQjm3wm64OpFpJKJLcDZmi2lTdDTqRLfgMltwWyLfj/pFG8Bp+EKuWC/vNNM2cLEY9Qa+drieQwxj9uf5E3d1kl1B3C7UdAPrxCg1RTcelcfZKx0Zm1aPf/LqKVLxJuxLlTbhxJoIFsF0vJu4HMCydg2ch++Sge1ikXUaZ2Br4rBTa+nTEjPwcTI0gOuqYFcQ18j/pp/ilLEanIDnksFDYq7WefrShfvFJtgQZ2OVRpT3iPOphtiVJ1dpPGEiVsk77WHFZVRbGD7cmzGrQtuz5EdI/clXrZiDbcnhsxXazabvNiWixzJzfas4PYRvS9T/N2S21iUfHUEmZy6p0OalyeaWCm22xAy5wKxy1+8RCrohYpq2UGZqXZXeG4UmqwpD+CB9L2i3cpmGZBc260vUHQ2ZzY5cCn0vhr8OyXJOsv1DDbYPw9zkaJdiG9UcvJWeIr/ULnmsMbckx0K4OzlZNUq5HiEz9sul90Ehb44Zpe7qVL7WeGhtctJKSs8TFzqZzHgmPYfklz3zWtRflsqtrYBvU3TLrwuaSZNe0eOZHtsubnUzXCYO7xpCEK4UBwsjMVMuUwoFT+0iO+pstuvOx1fyMPkJzUVlrxCCWbj6DRY2KZdJoNLxRys8lIw/OSxtmujZbNp8Jq7dRsO5+ES+ftbg+GH5T6X0B8fMugneS8az4Gqx/F5wn+jpdnb6HhEaDCQbv+DOlHd9StswZtYjMEnEy0M4C6/Ke3OTCEnL4lQhQjN7b4oRGxJTsNK4Z6G857ODsT3y+5CxoivZ2iPXcdnhR7M1VBqPy3usgTdwcpUOEk7CCyN8PValg/XJ6A5xD1I3FiVfDRVruvnir9VXpdFR0Jd8zu+gz/HH3/vmLh5v00MyAAAAAElFTkSuQmCC",v=n(28),j=n(133),O=n.n(j),y=n(0);e.default=function(){var t=Object(u.g)(),e=Object(i.useState)({id:0}),n=Object(a.a)(e,2),l=n[0],m=n[1],j=Object(i.useState)([]),w=Object(a.a)(j,2),x=w[0],k=w[1],A=Object(i.useState)([]),S=Object(a.a)(A,2),C=S[0],E=S[1],D=Object(i.useState)(""),I=Object(a.a)(D,2),N=I[0],P=I[1],R=Object(i.useState)(!1),L=Object(a.a)(R,2),F=L[0],T=L[1],B=Object(i.useState)({message:"",func:null}),Y=Object(a.a)(B,2),q=Y[0],H=Y[1],J=Object(i.useState)(!0),U=Object(a.a)(J,2),K=U[0],Z=U[1],X=Object(i.useState)(!0),z=Object(a.a)(X,2),G=z[0],V=z[1],Q=Object(i.useState)(!0),M=Object(a.a)(Q,2),W=M[0],_=M[1],$=Object(i.useState)(!0),tt=Object(a.a)($,2),et=tt[0],nt=tt[1],rt=Object(i.useState)(!0),ot=Object(a.a)(rt,2),at=ot[0],it=ot[1],ct=Object(i.useState)(!1),st=Object(a.a)(ct,2),ut=st[0],lt=st[1];Object(i.useEffect)((function(){P("Please Wait..."),pt();var e=window.location.href.split("=")[1].toString().split("&").shift();localStorage.getItem("empID")?localStorage.getItem("empID")!==e&&t.replace("/atthome"):t.replace("/atthome"),m({id:e}),mt(e);var n=new FormData;if(n.append("empID",e),localStorage.getItem("LocationEmployees")&&"[]"!==localStorage.getItem("LocationEmployees")){var r=ht(e);k([r])}else c.a.post("/getemployee",n).then((function(t){k(t.data)})).catch((function(t){p.b.dark(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}))}),[t]);var ft=function(t){var e=sessionStorage.getItem("MiscId-1"),n=O()((new Date).toTimeString(),"h:mm:ss A").add(0,"seconds").add(parseInt(e),"minutes").format("HH:mm:ss");sessionStorage.setItem(t,n.substring(0,8)),console.log("New employee")},pt=function(){var t=Object(o.a)(Object(r.a)().mark((function t(){var e;return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=[],t.next=3,h.a.voices();case 3:t.sent.filter((function(t){return 0===t.lang.indexOf("en")})).map((function(t){return t.name})).forEach((function(t){return e.push(t)})),E(e);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),ht=function(t){for(var e=JSON.parse(localStorage.getItem("LocationEmployees")),n=0;n<e.length;n++)if(e[n].emp_id===parseInt(t))return e[n]},dt=function(t,e){var n=new FormData;n.append("EmpID",e),c.a.post("/getnotifications",n).then((function(e){for(var n=!1,r=0,o="notification",a=0;a<e.data.length;a++)null===e.data[a].notified&&(n=!0,(r+=1)>1&&(o="notifications"));n&&h.a.say(t+" You have "+r+" "+o+" on your employee portal, Please check",C[1])})).catch((function(t){console.log(t)}))},mt=function(t){var e=new FormData;e.append("empID",t),c.a.post("/gettodaysattendance",e).then((function(t){P(""),void 0===t.data[0]?(it(!1),Z(!1),V(!0),_(!0),nt(!0)):void 0===t.data[0].time_out||null===t.data[0].time_out?void 0===t.data[0].break_in||null===t.data[0].break_in?(it(!1),Z(!0),V(!1),_(!1),nt(!0)):void 0===t.data[0].break_out||null===t.data[0].break_out?(it(!1),Z(!0),V(!1),_(!0),nt(!1)):(it(!1),Z(!0),V(!1),_(!0),nt(!0)):(it(!1),Z(!0),V(!0),_(!0),nt(!0),p.b.dark("Your shift has been end",{position:"top-center",autoClose:7e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}))})).catch((function(t){it(!1),p.b.dark(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}))},gt=function(){it(!0),c.a.post("/setstatustolog",{device_id:localStorage.getItem("device_machine")}).then((function(){localStorage.removeItem("empID"),localStorage.removeItem("empName"),g.a.remove("Session"),f()(".operationModalClose").trigger("click"),t.replace("/atthome"),at(!1)})).catch((function(t){p.b.dark(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}))},bt=function(t,e){vt(),H({message:t,func:function(){return e()}})},vt=function(){setTimeout((function(){T(!F)}),500)},jt=function(t){it(!0);for(var e=1;e<=t;e++)f()(".Operations .OperationsContent .RatingContainer .RatingContent .content .star"+e).attr("src","data:image/png;base64,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");c.a.post("/ratings",{emp_id:x[0].emp_id,date:(new Date).toString(),ratings:t}).then((function(){it(!1),h.a.say("Thanks for rating.",C[1]).then((function(){gt()}))})).catch((function(t){p.b.dark(t,{position:"bottom-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),it(!1)}))};return g.a.get("Session")&&null!==g.a.get("Session")||f()("#LogoutBtn").on("click"),Object(y.jsxs)(y.Fragment,{children:[Object(y.jsxs)("div",{className:"Operations",children:[Object(y.jsx)(s.a,{display:at,styling:{zIndex:1e5},icon:Object(y.jsx)("img",{src:v.a,className:"LoadingImg",alt:"LoadingIcon"}),txt:"Logging Out"}),Object(y.jsx)(d.a,{show:F,Hide:vt,content:Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("h4",{children:"Alert"}),Object(y.jsxs)("h5",{className:"mt-2 mb-3",children:[" ",q.message," "]}),Object(y.jsx)("button",{className:"btn btn-large btn-primary px-4 py-3 btn-block ml-auto",onClick:function(){return q.func()},children:Object(y.jsx)("b",{children:"YES"})})]})}),Object(y.jsxs)("div",{className:"OperationsContent",children:[Object(y.jsx)("button",{onClick:gt,id:"LogoutBtn",className:"btn btn-outline-dark",style:{position:"absolute",right:"3%",top:"5%"},children:"Logout"}),ut?Object(y.jsx)(y.Fragment,{children:Object(y.jsx)("div",{className:"RatingContainer",children:Object(y.jsxs)("div",{className:"RatingContent w-100",children:[Object(y.jsx)("h2",{className:"font-weight-bold",children:"Rate the attendance performance"}),Object(y.jsxs)("div",{className:"content my-5",children:[Object(y.jsx)("img",{src:b,width:"40",height:"40",alt:"stars",className:"stars star1",onClick:function(){return jt(1)}}),Object(y.jsx)("img",{src:b,width:"40",height:"40",alt:"stars",className:"stars star2",onClick:function(){return jt(2)}}),Object(y.jsx)("img",{src:b,width:"40",height:"40",alt:"stars",className:"stars star3",onClick:function(){return jt(3)}}),Object(y.jsx)("img",{src:b,width:"40",height:"40",alt:"stars",className:"stars star4",onClick:function(){return jt(4)}}),Object(y.jsx)("img",{src:b,width:"40",height:"40",alt:"stars",className:"stars star5",onClick:function(){return jt(5)}})]}),Object(y.jsx)("button",{className:"btn btn-lg btn-outline-dark px-5",onClick:gt,children:"Skip & Logout"})]})})}):Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("div",{className:"empImg",style:{backgroundImage:localStorage.getItem("empImg")?"url('images/employees/"+localStorage.getItem("empImg"):"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAMFBMVEXU1NT////Y2Nj7+/va2trm5ubz8/Pf39/29vbe3t7j4+P8/Pzt7e3Z2dn09PTp6enlgXfuAAAEj0lEQVR4nO2dCZarOgxEMVPCkGT/u31N8+mEEIIHVUmf47sC6ghNRhZFkclkMplMJpPJZDKZTCaTyWQymUwmk8lsKLuu75sf+r7rSu2niaNrxrZyK6p2bDrt5wqibtrB7TC0Ta39fH6Uj+ueiIXrw/5r1rdHKmbaXvtJv9JUxxL+PKbRfto9yhAZsxSTb1gfKONXir0XrPb0jXdaYyHssRtujxge2s/+wu0w4H7jetN+/oU+2hz/GcWIp4xpMiZGbQ0TkV6+ptVWUZR3CR3O3ZVTSpnk5q9cVZWUEUlwj0pRiZw9JhRtIuQfC3ctHSLx6hWl2PWQ1uGcSrlykdfh3IWvQzJgPVEIXeIOMkN3kwajwzlyA1wmFrz7DNyXS6Di3YNaCXc4Hc4xDyNFS5N3rjwdPVKHc7yGEWoQokkgOf0VVn4HG4RmEmjImuEELmAOWeDkEki1uKZi6ADH3hlGBAaVvWsYRTCsXHxlwOuAJ5EZfCoBdOqfwHfv8Gw4A8+JJUeHc+j+iuQieCeB9ervoHt3Qn0yg65SKOlwAp0SCYXWDLrcYulwDquDFn3R8bfmCcGORBC6wwVsl3gaIbTEjk7tlPZwBtsknsYip/GR0wg5TR45TYlynqKR1LLjm/bT9COk0yD8edBpDh9OcxzEClv4DwukYxT8px5S/Yv/QEJyEsJECiUlMr7rUg5NGcNOlHeLMutEqFI4c3SEuEUaq4HnRMpn9oLg7qy5RtxA4wxvrBFcy/PmsTHDywvMIWaol1Anf4F1CnE2s4Ae1JGv7sPaEvZNPpS/868r1JBkMijcQYaUXCqXXQFuonTVVTwGcyPvE2mH17tS2Yk6/KC4/KWTvOKqusSmFlNSKS9/kFKiraMobiJKKgN7HySuUOteZv8jOTOaWPkwcUl6vSqFC7p7lAmHdq2N12ohdjeKlZ0oT25RnjIaiFYbuuDwdbW6ke4S5CqtISff0Hi7ymB24VlR9mNQGK7G3lbA+qVsonaL3I1tb/PdBfgJO/sB67A3aks1qpe+P1xE1tXctSPYRW6bk6aUXnYJkpazyFnjT4qGVW6Qr9QtvfaKX8z4HfLaxph1n74Q14KmtFE+sFqttMbWB07zSxmhwx9H1KxLx+CqJXVtqT/YZp42vjwBDMS0i7ozKEeRXS/pA+YkVe4Lgj+IM3oNHQglOjrklWjpkFYi+a0wWIngcaSePX6ViNkEOzDnoUQoCvPzxztC+YR2P2wfkclscl3yGYFqhbbR5TvJZ/fEW8bfSQzC2gHrSWLoMuDoC0kOb8RBZhLcBDOAGUvC4KZ6JlwTPSlI7dB9iOzibb1YE5Evl6GItRAVuYi7XPyJOOyykwpfiUiLJmrFLcHVI/pCWCzBF8mMGiTYJFYNEmwSswYJNMnNrEF+TBLy4dewQYJMYtdDJgK8xFy1uMa/djSZ1J943xInLpqLw/frtcGyd41nEUzcVxqLn7sbd/UJP3c31ql/wqt7Jy7+i8en5zV1lrWHzxmX8E8OMXj8OvF/ELMmjuOWyTOHLcenEOaz4cxxTjRd+D7Z/KDkH+MbT03dnEr6AAAAAElFTkSuQmCC')"}}),Object(y.jsxs)("div",{className:"text-center my-4",children:[Object(y.jsxs)("h3",{children:[" ",x[0]?x[0].name:null," "]}),x[0]?Object(y.jsxs)("h5",{children:[x[0].designation_name," in ",x[0].department_name," Department at ",x[0].company_name]}):null]}),Object(y.jsxs)("div",{className:"BtnContainer",children:[N,K?null:Object(y.jsxs)("div",{className:"btns start",onClick:function(){return function(t){Z(!0),V(!0),_(!0),nt(!0),it(!0);var e=new FormData;e.append("empID",parseInt(t)),c.a.post("/timein",e).then((function(){ft(x[0].emp_id),it(!1),lt(!0),h.a.say("Shift Started",C[1]).then((function(){dt(x[0].name,x[0].emp_id)}))})).catch((function(t){console.log(t),it(!1)}))}(l.id)},children:[Object(y.jsx)("i",{className:"las la-power-off"}),Object(y.jsx)("p",{children:"Start Shift"})]}),W?null:Object(y.jsxs)("div",{className:"btns startb",onClick:function(){return bt("Do You Want To Start Your Break?",(function(){return function(t){Z(!0),V(!0),_(!0),nt(!0),it(!0);var e=new FormData;e.append("empID",parseInt(t)),c.a.post("/breakin",e).then((function(){ft(x[0].emp_id),it(!1),T(!1),lt(!0),h.a.say("Break Started",C[1]).then((function(){dt(x[0].name,x[0].emp_id)}))})).catch((function(t){console.log(t),vt(),it(!1)}))}(l.id)}))},children:[Object(y.jsx)("i",{className:"las la-coffee"}),Object(y.jsx)("p",{children:"Start Break"})]}),et?null:Object(y.jsxs)("div",{className:"btns endb",onClick:function(){return bt("Do You Want To End Your Break?",(function(){return function(t){Z(!0),V(!0),_(!0),nt(!0),it(!0);var e=new FormData;e.append("empID",parseInt(t)),c.a.post("/breakout",e).then((function(){ft(x[0].emp_id),it(!1),T(!1),lt(!0),h.a.say("Break End",C[1]).then((function(){dt(x[0].name,x[0].emp_id)}))})).catch((function(t){p.b.dark(t,{position:"bottom-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),it(!1)}))}(l.id)}))},children:[Object(y.jsx)("i",{className:"lab la-mendeley"}),Object(y.jsx)("p",{children:"End Break"})]}),G?null:Object(y.jsxs)("div",{className:"btns end",onClick:function(){return bt("Do You Want To End Your Shift?",(function(){return function(t){Z(!0),V(!0),_(!0),nt(!0),it(!0);var e=new FormData;e.append("empID",parseInt(t)),c.a.post("/timeout",e).then((function(){ft(x[0].emp_id),it(!1),T(!1),lt(!0),h.a.say("Shift End. Thank You",C[1]).then((function(){dt(x[0].name,x[0].emp_id)}))})).catch((function(t){console.log(t),it(!1)}))}(l.id)}))},children:[Object(y.jsx)("i",{className:"lar la-share-square"}),Object(y.jsx)("p",{children:"End Shift"})]})]})]})]})]}),Object(y.jsx)(p.a,{})]})}},98:function(t,e,n){"use strict";n(1),n(101);var r=n(0);e.a=function(t){return Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)("div",{className:"Attandence_Request_Div",style:{display:t.show?"flex":"none"},children:[Object(r.jsx)("div",{className:"dark",onClick:t.Hide}),Object(r.jsx)("div",{style:{animationDelay:"0.1".toString()+"s"},className:t.show?"Attandence_Request_Div_Content Attandence_Request_Div_Content2":"Attandence_Request_Div_Content",children:t.content})]})})}}}]);