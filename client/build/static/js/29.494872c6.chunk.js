/*! For license information please see 29.494872c6.chunk.js.LICENSE.txt */
(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[29],{100:function(e,t,n){"use strict";var o=n(1),i=(n(101),n(79)),r=n.n(i),a=n(17),s=n(0);t.a=function(e){Object(o.useEffect)((function(){r()(".Speeddail_Grid").slideToggle(0)}),[]);return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("div",{className:"Menu",children:e.data.length>0?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("div",{className:"Menu_Grid",children:e.data.map((function(e,t){return Object(s.jsx)(s.Fragment,{children:e.txt?e.link?Object(s.jsx)(a.b,{to:e.href,children:Object(s.jsx)("button",{children:Object(s.jsx)("p",{className:"font-weight-bolder mb-0",children:e.txt})})}):Object(s.jsx)("button",{onClick:function(){return e.func()},children:Object(s.jsx)("p",{className:"font-weight-bolder mb-0",children:e.txt})}):null})}))}),Object(s.jsxs)("div",{className:"Menu_Speeddail",children:[Object(s.jsx)("div",{className:"Menu_Speeddail_circle",onClick:function(){r()(".Menu_Speeddail .Speeddail_Grid").slideToggle(200),r()(".Menu_Speeddail .Menu_Speeddail_circle .las").hasClass("la-bars")?(r()(".Menu_Speeddail .Menu_Speeddail_circle .las").removeClass("la-bars"),r()(".Menu_Speeddail .Menu_Speeddail_circle .las").addClass("la-times")):(r()(".Menu_Speeddail .Menu_Speeddail_circle .las").removeClass("la-times"),r()(".Menu_Speeddail .Menu_Speeddail_circle .las").addClass("la-bars"))},children:Object(s.jsx)("i",{class:"las la-times"})}),Object(s.jsx)("div",{className:"Speeddail_Grid",children:e.data.map((function(e,t){return Object(s.jsx)(s.Fragment,{children:e.txt?e.link?Object(s.jsx)(a.b,{to:e.href,children:Object(s.jsxs)("div",{children:[Object(s.jsx)("div",{className:"mb-1 Speeddail_Grid1 divs"+t,children:Object(s.jsx)("i",{className:e.icon})}),Object(s.jsx)("p",{children:e.txt})]},t)}):Object(s.jsxs)("div",{className:"clicks",onClick:function(){return e.func()},children:[Object(s.jsx)("div",{className:"mb-1 Speeddail_Grid1 divs"+t,children:Object(s.jsx)("i",{className:e.icon})}),Object(s.jsx)("p",{children:e.txt})]},t):null})}))})]})]}):null})})}},101:function(e,t,n){},144:function(e,t,n){var o;o=function(e){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./src/react-webcam.tsx")}({"./src/react-webcam.tsx":function(e,t,n){"use strict";n.r(t);var o=n("react"),i=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),r=function(){return(r=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},a=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]])}return n};function s(){return!(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)}"undefined"!==typeof window&&(void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(e){var t=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;return t?new Promise((function(n,o){t.call(navigator,e,n,o)})):Promise.reject(new Error("getUserMedia is not implemented in this browser"))}));var c=function(e){function t(t){var n=e.call(this,t)||this;return n.canvas=null,n.ctx=null,n.unmounted=!1,n.state={hasUserMedia:!1},n}return i(t,e),t.prototype.componentDidMount=function(){var e=this.state,t=this.props;s()?e.hasUserMedia||this.requestUserMedia():t.onUserMediaError("getUserMedia not supported")},t.prototype.componentDidUpdate=function(e){var t=this.props;if(s()){var n=JSON.stringify(e.audioConstraints)!==JSON.stringify(t.audioConstraints),o=JSON.stringify(e.videoConstraints)!==JSON.stringify(t.videoConstraints),i=e.minScreenshotWidth!==t.minScreenshotWidth,r=e.minScreenshotHeight!==t.minScreenshotHeight;(o||i||r)&&(this.canvas=null,this.ctx=null),(n||o)&&(this.stopAndCleanup(),this.requestUserMedia())}else t.onUserMediaError("getUserMedia not supported")},t.prototype.componentWillUnmount=function(){this.unmounted=!0,this.stopAndCleanup()},t.stopMediaStream=function(e){e&&(e.getVideoTracks&&e.getAudioTracks?(e.getVideoTracks().map((function(t){e.removeTrack(t),t.stop()})),e.getAudioTracks().map((function(t){e.removeTrack(t),t.stop()}))):e.stop())},t.prototype.stopAndCleanup=function(){var e=this.state;e.hasUserMedia&&(t.stopMediaStream(this.stream),e.src&&window.URL.revokeObjectURL(e.src))},t.prototype.getScreenshot=function(e){var t=this.state,n=this.props;if(!t.hasUserMedia)return null;var o=this.getCanvas(e);return o&&o.toDataURL(n.screenshotFormat,n.screenshotQuality)},t.prototype.getCanvas=function(e){var t=this.state,n=this.props;if(!this.video)return null;if(!t.hasUserMedia||!this.video.videoHeight)return null;if(!this.ctx){var o=this.video.videoWidth,i=this.video.videoHeight;if(!this.props.forceScreenshotSourceSize){var r=o/i;i=(o=n.minScreenshotWidth||this.video.clientWidth)/r,n.minScreenshotHeight&&i<n.minScreenshotHeight&&(o=(i=n.minScreenshotHeight)*r)}this.canvas=document.createElement("canvas"),this.canvas.width=(null===e||void 0===e?void 0:e.width)||o,this.canvas.height=(null===e||void 0===e?void 0:e.height)||i,this.ctx=this.canvas.getContext("2d")}var a=this.ctx,s=this.canvas;return a&&s&&(n.mirrored&&(a.translate(s.width,0),a.scale(-1,1)),a.imageSmoothingEnabled=n.imageSmoothing,a.drawImage(this.video,0,0,(null===e||void 0===e?void 0:e.width)||s.width,(null===e||void 0===e?void 0:e.height)||s.height),n.mirrored&&(a.scale(-1,1),a.translate(-s.width,0))),s},t.prototype.requestUserMedia=function(){var e=this,n=this.props,o=function(o,i){var r={video:"undefined"===typeof i||i};n.audio&&(r.audio="undefined"===typeof o||o),navigator.mediaDevices.getUserMedia(r).then((function(n){e.unmounted?t.stopMediaStream(n):e.handleUserMedia(null,n)})).catch((function(t){e.handleUserMedia(t)}))};if("mediaDevices"in navigator)o(n.audioConstraints,n.videoConstraints);else{var i=function(e){return{optional:[{sourceId:e}]}},r=function(e){var t=e.deviceId;return"string"===typeof t?t:Array.isArray(t)&&t.length>0?t[0]:"object"===typeof t&&t.ideal?t.ideal:null};MediaStreamTrack.getSources((function(e){var t=null,a=null;e.forEach((function(e){"audio"===e.kind?t=e.id:"video"===e.kind&&(a=e.id)}));var s=r(n.audioConstraints);s&&(t=s);var c=r(n.videoConstraints);c&&(a=c),o(i(t),i(a))}))}},t.prototype.handleUserMedia=function(e,t){var n=this.props;if(e||!t)return this.setState({hasUserMedia:!1}),void n.onUserMediaError(e);this.stream=t;try{this.video&&(this.video.srcObject=t),this.setState({hasUserMedia:!0})}catch(o){this.setState({hasUserMedia:!0,src:window.URL.createObjectURL(t)})}n.onUserMedia(t)},t.prototype.render=function(){var e=this,t=this.state,n=this.props,i=n.audio,s=(n.forceScreenshotSourceSize,n.onUserMedia,n.onUserMediaError,n.screenshotFormat,n.screenshotQuality,n.minScreenshotWidth,n.minScreenshotHeight,n.audioConstraints,n.videoConstraints,n.imageSmoothing,n.mirrored),c=n.style,d=void 0===c?{}:c,l=a(n,["audio","forceScreenshotSourceSize","onUserMedia","onUserMediaError","screenshotFormat","screenshotQuality","minScreenshotWidth","minScreenshotHeight","audioConstraints","videoConstraints","imageSmoothing","mirrored","style"]),u=s?r(r({},d),{transform:(d.transform||"")+" scaleX(-1)"}):d;return o.createElement("video",r({autoPlay:!0,src:t.src,muted:i,playsInline:!0,ref:function(t){e.video=t},style:u},l))},t.defaultProps={audio:!0,forceScreenshotSourceSize:!1,imageSmoothing:!0,mirrored:!1,onUserMedia:function(){},onUserMediaError:function(){},screenshotFormat:"image/webp",screenshotQuality:.92},t}(o.Component);t.default=c},react:function(t,n){t.exports=e}}).default},e.exports=o(n(1))},548:function(e,t,n){},549:function(e,t,n){},661:function(e,t,n){"use strict";n.r(t);var o=n(9),i=n(4),r=n(1),a=(n(548),n(100)),s=n(93),c=n(144),d=n.n(c),l=n(11),u=n.p+"static/media/771.e074a599.gif",p=n(79),m=n.n(p),h=n(85);n(86);function f(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var g=["children"],j=["count","wrapper","className","containerClassName","containerTestId","circle","style"],b=r.createContext({});function v(e){var t=e.children,n=f(e,g);return r.createElement(b.Provider,{value:n},t)}function x(e){var t,n,i=e.count,a=void 0===i?1:i,s=e.wrapper,c=e.className,d=e.containerClassName,l=e.containerTestId,u=e.circle,p=void 0!==u&&u,m=e.style,h=f(e,j),g=r.useContext(b),v=Object(o.a)(Object(o.a)(Object(o.a)({},g),h),{},{circle:p}),x=Object(o.a)(Object(o.a)({},m),function(e){var t=e.baseColor,n=e.highlightColor,o=e.width,i=e.height,r=e.borderRadius,a=e.circle,s=e.direction,c=e.duration,d=e.enableAnimation,l=void 0===d||d,u={};return"rtl"===s&&(u["--animation-direction"]="reverse"),"number"===typeof c&&(u["--animation-duration"]="".concat(c,"s")),l||(u["--pseudo-element-display"]="none"),"string"!==typeof o&&"number"!==typeof o||(u.width=o),"string"!==typeof i&&"number"!==typeof i||(u.height=i),"string"!==typeof r&&"number"!==typeof r||(u.borderRadius=r),a&&(u.borderRadius="50%"),"undefined"!==typeof t&&(u["--base-color"]=t),"undefined"!==typeof n&&(u["--highlight-color"]=n),u}(v)),O="react-loading-skeleton";c&&(O+=" ".concat(c));for(var y=null!==(t=v.inline)&&void 0!==t&&t,S=[],C=0;C<a;C++){var w=r.createElement("span",{className:O,style:x,key:C},"\u200c");y?S.push(w):S.push(r.createElement(r.Fragment,{key:C},w,r.createElement("br",null)))}return r.createElement("span",{className:d,"data-testid":l,"aria-live":"polite","aria-busy":null===(n=v.enableAnimation)||void 0===n||n},s?S.map((function(e,t){return r.createElement(s,{key:t},e)})):S)}n(549);var O=n(27),y=n(0),S=Object(r.lazy)((function(){return n.e(110).then(n.bind(null,697))})),C=Object(r.lazy)((function(){return n.e(109).then(n.bind(null,718))}));t.default=function(){var e=Object(r.useRef)(),t={width:"100% !important",facingMode:"environment"},n=Object(r.useState)(!1),c=Object(i.a)(n,2),p=c[0],f=c[1],g=Object(r.useState)([]),j=Object(i.a)(g,2),b=j[0],w=j[1],_=Object(r.useState)([]),F=Object(i.a)(_,2),M=F[0],N=F[1],D=Object(r.useState)([]),k=Object(i.a)(D,2),E=k[0],I=k[1],U=Object(r.useState)(!1),L=Object(i.a)(U,2),R=L[0],P=L[1],A=Object(r.useState)(Object(y.jsx)(y.Fragment,{})),T=Object(i.a)(A,2),H=T[0],G=T[1],z=Object(r.useState)(),q=Object(i.a)(z,2),W=q[0],B=q[1],J=Object(r.useState)(0),Q=Object(i.a)(J,2),V=Q[0],Y=(Q[1],Object(r.useState)({image:"",imageName:"",extension:""})),K=Object(i.a)(Y,2),X=K[0],Z=K[1];Object(r.useEffect)((function(){G([Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})}),Object(y.jsx)(v,{baseColor:"#fff",highlightColor:"#ECF0F5",children:Object(y.jsx)(x,{style:{padding:"50px 0",margin:"5px 0",borderRadius:"30px"}})})]),setTimeout((function(){G(Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("div",{}),Object(y.jsx)("div",{children:Object(y.jsx)("h4",{className:"text-center",children:"No"})}),Object(y.jsx)("div",{children:Object(y.jsx)("h4",{className:"text-center",children:"Document"})}),Object(y.jsx)("div",{children:Object(y.jsx)("h4",{className:"text-center",children:"Uploaded"})}),Object(y.jsx)("div",{}),Object(y.jsx)("div",{})]}))}),1e3),ue(),sessionStorage.setItem("SelectedFolder","undefined"),sessionStorage.setItem("FolderName","undefined"),ie(),ee(),m()(".Show_Upload_Div").hide(0)}),[]);var $=function(){ee(),P(!0)},ee=function(){B(Object(y.jsxs)("div",{className:"Modalcontent d-flex justify-content-center",children:[Object(y.jsxs)("button",{className:"btn",onClick:ae,children:[Object(y.jsx)("i",{className:"text-white bg-dark las la-folder-open"}),Object(y.jsx)("p",{className:"mb-0",children:"Files"})]}),Object(y.jsxs)("button",{className:"btn",onClick:re,children:[Object(y.jsx)("i",{className:"text-white bg-primary las la-camera-retro"}),Object(y.jsx)("p",{className:"mb-0",children:"Camera"})]})]}))},te=function(e){var t=document.createElement("a");t.setAttribute("download","images/drive/"+M[e].name),t.href="images/drive/"+M[e].name,document.body.appendChild(t),t.click(),t.remove(),P(!1),"undefined"===sessionStorage.getItem("SelectedFolder")&&ue()},ne=function(e,t){var n=new FormData;n.append("driveID","document"===t?M[e].id:E[e].id),n.append("empID","document"===t?M[e].emp_id:E[e].emp_id),n.append("docName","document"===t?M[e].name:E[e].name),n.append("DID",sessionStorage.getItem("SelectedFolder")),setTimeout((function(){ie()}),1e3),l.a.post("/deletedoc",n).then((function(){h.b.dark("Document Deleted",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),P(!1),ee(),"undefined"===sessionStorage.getItem("SelectedFolder")&&ue()})).catch((function(e){console.log(e),h.b.dark(e.toString(),{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}))},oe=function(e){var t=null;t="jpeg"===M[e].doc_type.toLowerCase()||"jpg"===M[e].doc_type.toLowerCase()||"png"===M[e].doc_type.toLowerCase()||"gif"===M[e].doc_type.toLowerCase()?Object(y.jsx)("img",{src:"images/drive/"+M[e].name,width:"100%",alt:"images"}):"mov"===M[e].doc_type.toLowerCase()||"mp4"===M[e].doc_type.toLowerCase()||"avi"===M[e].doc_type.toLowerCase()||"flv"===M[e].doc_type.toLowerCase()||"mpeg"===M[e].doc_type.toLowerCase()||"wmv"===M[e].doc_type.toLowerCase()||"mpg"===M[e].doc_type.toLowerCase()?Object(y.jsxs)("video",{width:"100%",controls:!0,autoPlay:!0,muted:!0,children:[Object(y.jsx)("source",{src:"images/drive/"+M[e].name,type:"video/mp4"}),"Your browser does not support the video tag."]}):"html"===M[e].doc_type.toLowerCase()||"htm"===M[e].doc_type.toLowerCase()||"xml"===M[e].doc_type.toLowerCase()||"css"===M[e].doc_type.toLowerCase()||"scss"===M[e].doc_type.toLowerCase()||"sass"===M[e].doc_type.toLowerCase()||"less"===M[e].doc_type.toLowerCase()||"js"===M[e].doc_type.toLowerCase()||"jsx"===M[e].doc_type.toLowerCase()||"php"===M[e].doc_type.toLowerCase()||"pdf"===M[e].doc_type.toLowerCase()?Object(y.jsx)("iframe",{src:"images/drive/"+M[e].name,width:"100%",height:"500",title:"description"}):Object(y.jsx)("h4",{className:"text-center",children:"Format Not Supported"}),B(t),P(!0),"undefined"===sessionStorage.getItem("SelectedFolder")&&ue()},ie=function(){var e=new FormData;e.append("empID",sessionStorage.getItem("EmpID")),e.append("subDoc",sessionStorage.getItem("SelectedFolder")),l.a.post("/getemployeedrive",e).then((function(e){N(e.data)})).catch((function(e){console.log(e)})),l.a.post("/getemployeedrivefolders",e).then((function(e){I(e.data)})).catch((function(e){console.log(e)}))},re=function(){var n=Object(y.jsxs)("div",{children:[Object(y.jsx)(d.a,{audio:!1,screenshotFormat:"image/jpeg",ref:e,videoConstraints:t,imageSmoothing:!0,forceScreenshotSourceSize:"true"}),Object(y.jsx)("button",{className:"btn btn-dark btn-block mt-3",onClick:se,children:"TAKE PHOTO"})]});B(n)},ae=function(){m()(".Employee_Drive .docuploads").trigger("click")},se=function(){var t=e.current.getScreenshot(),n=t.split(";"),i=n[0].split(":")[1],r=function(e,t,n){t=t||"",n=n||512;for(var o=atob(e),i=[],r=0;r<o.length;r+=n){for(var a=o.slice(r,r+n),s=new Array(a.length),c=0;c<a.length;c++)s[c]=a.charCodeAt(c);var d=new Uint8Array(s);i.push(d)}return new Blob(i,{type:t})}(n[1].split(",")[1],i),a=new Date,s=a.getDate().toString()+"-"+(a.getMonth()+1).toString()+"-"+a.getFullYear().toString()+"_at_"+a.getHours()+a.getMinutes()+a.getSeconds(),c=Object(o.a)(Object(o.a)({},X),{},{imageName:s,image:r,extension:t.split("/")[1].split(";")[0]});Z(c),ce(c)};console.log(V);var ce=function(e){B(Object(y.jsx)("div",{className:"w-100 d-flex align-items-center justify-content-center",style:{height:"200px"},children:Object(y.jsx)("img",{src:u,width:"60",height:"60",alt:"loading..."})}));var t=new FormData;t.append("docName",e.imageName),t.append("docs",e.image),t.append("empId",sessionStorage.getItem("EmpID")),t.append("MyDocs",e.image),t.append("docsExtension",e.extension),t.append("employee_name",sessionStorage.getItem("name")),t.append("DriveID",sessionStorage.getItem("SelectedFolder")),t.append("FolderName",sessionStorage.getItem("FolderName")),"undefined"===sessionStorage.getItem("SelectedFolder")?l.a.post("/uploaddocument",t,{headers:{"content-type":"multipart/form-data"}}).then((function(){ee(),P(!1),ie()})).catch((function(e){console.log(e),ee(),P(!1)})):l.a.post("/uploadsubdocs",t,{headers:{"content-type":"multipart/form-data"}}).then((function(){ee(),P(!1),ie()})).catch((function(e){console.log(e),ee(),P(!1)}))},de=function(){B(Object(y.jsx)("div",{className:"w-100",children:Object(y.jsxs)("form",{onSubmit:le,children:[Object(y.jsx)("input",{name:"folderName",type:"text",required:!0,className:"form-control mb-3",style:{fontSize:"12px"},placeholder:"Enter the folder name"}),Object(y.jsx)("button",{type:"submit",className:"d-block ml-auto btn btn-primary",style:{fontSize:"12px"},children:"Create"})]})})),P(!0)},le=function(e){e.preventDefault();var t=e.target.folderName.value,n=new FormData;n.append("foldername",t),n.append("empId",sessionStorage.getItem("EmpID")),n.append("employee_name",sessionStorage.getItem("name")),l.a.post("/createnewfolder",n).then((function(){ee(),P(!1),ie()})).catch((function(e){console.log(e),ee(),P(!1)}))},ue=function(){w([{icon:"las la-cloud-upload-alt",txt:"Upload",link:!1,func:function(){return $()}},{icon:"las la-cloud-upload-alt",txt:"New Folder",link:!1,func:function(){return de()}}])},pe=function(e){m()(".Show_Changes_Menu").hide(300),"none"===m()("."+e).css("display")?m()("."+e).show(300):m()("."+e).hide(300)},me=function(e){var t=Object(y.jsx)("div",{className:"Employee_Drive_Grid Employee_Drive_GridForModal",children:0===E.length?null:E.map((function(t,n){return Object(y.jsx)(y.Fragment,{children:Object(y.jsx)("div",{className:"Div1 d-flex p-3 align-items-center justify-content-start",onClick:function(){return he(e,t.id,t.name)},children:Object(y.jsxs)("div",{className:"d-flex align-items-center",children:[Object(y.jsx)("i",{className:"las la-wallet"})," ",Object(y.jsxs)("p",{className:"font-weight-bold",children:[" ",t.name," "]})]})})})}))});B(t),P(!0)},he=function(e,t,n){var o=new FormData;o.append("driveID",M[e].id),o.append("driveName",M[e].name),o.append("folderName",n),o.append("folderID",t),o.append("employee_name",sessionStorage.getItem("name")),o.append("EmpID",sessionStorage.getItem("EmpID")),l.a.post("/movedoctofolder",o).then((function(){ee(),P(!1),ie(),h.b.dark("Document moved".toString(),{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})})).catch((function(e){console.log(e),ee(),P(!1)}))},fe=function(e,t){sessionStorage.setItem("SelectedFolder",e),sessionStorage.setItem("FolderName",t),setTimeout((function(){w([{icon:"las la-cloud-upload-alt",txt:"Upload",link:!1,func:function(){return $()}},{icon:"las la-share",txt:"Back",link:!1,func:function(){return ge()}}])}),500),ie()},ge=function(){sessionStorage.setItem("SelectedFolder","undefined"),sessionStorage.setItem("FolderName","undefined"),setTimeout((function(){w([{icon:"las la-cloud-upload-alt",txt:"Upload",link:!1,func:function(){return $()}},{icon:"las la-cloud-upload-alt",txt:"New Folder",link:!1,func:function(){return de()}}])}),500),ie()};return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(a.a,{data:b}),Object(y.jsx)(O.a,{display:p}),Object(y.jsxs)("div",{className:"Employee_Drive",children:[Object(y.jsx)("input",{type:"file",name:"docuploads",className:"form-control d-none docuploads",onChange:function(e){var t=new FileReader;t.onload=function(){if(f(!0),2===t.readyState){for(var n=[],o=0;o<e.target.files.length;o++)n.push({file:e.target.files[o],name:e.target.files[o].name});var i=new FormData;i.append("File",e.target.files[0]),i.append("FileName",e.target.files[0].name),i.append("employee_name",sessionStorage.getItem("name")),i.append("empId",sessionStorage.getItem("EmpID")),i.append("DriveID",sessionStorage.getItem("SelectedFolder")),i.append("FolderName",sessionStorage.getItem("FolderName")),n.forEach((function(e){i.append("Attachments",e.file)})),l.a.post("/uploaddocuments",i,{headers:{"Content-Type":"multipart/form-data"}}).then((function(){ee(),P(!1),f(!1),ie(),h.b.dark("Document Uploaded",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})})).catch((function(e){console.log(e),ee(),P(!1),f(!1),h.b.dark(e.toString(),{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}))}},e.target.files[0]&&t.readAsDataURL(e.target.files[0])},multiple:!0}),Object(y.jsx)(s.a,{show:R,Hide:function(){R?(P(!1),"undefined"===sessionStorage.getItem("SelectedFolder")&&ue()):P(!0)},content:W}),Object(y.jsxs)(y.Fragment,{children:[Object(r.useMemo)((function(){return Object(y.jsx)(r.Suspense,{fallback:Object(y.jsx)("p",{className:"my-3",children:"Loading Folders...."}),children:Object(y.jsx)(S,{Folders:E,OpenFolder:fe,ShowChangesMenuDiv1:pe,DeleteDoc:ne})})}),[E]),Object(r.useMemo)((function(){return Object(y.jsx)(r.Suspense,{fallback:Object(y.jsx)("p",{className:"my-3",children:"Loading Files...."}),children:Object(y.jsx)(C,{Drive:M,Loading:H,ShowPicDiv:oe,ShowChangesMenuDiv1:pe,DownloadDoc:te,DeleteDoc:ne,MoveDoc:me})})}),[M,H])]})]}),Object(y.jsx)(h.a,{})]})}},93:function(e,t,n){"use strict";n(1),n(99);var o=n(0);t.a=function(e){return Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("div",{className:"Attandence_Request_Div",style:{display:e.show?"flex":"none"},children:[Object(o.jsx)("div",{className:"dark",onClick:e.Hide}),Object(o.jsx)("div",{style:{animationDelay:"0.1".toString()+"s"},className:e.show?"Attandence_Request_Div_Content Attandence_Request_Div_Content2":"Attandence_Request_Div_Content",children:e.content})]})})}},99:function(e,t,n){}}]);
//# sourceMappingURL=29.494872c6.chunk.js.map