/*! For license information please see 40.a93d0d3f.chunk.js.LICENSE.txt */
(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[40],{107:function(e,t,s){"use strict";s.d(t,"a",(function(){return c}));var a=s(19);var n=s(26);function c(e){return function(e){if(Array.isArray(e))return Object(a.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(n.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},137:function(e,t,s){var a;a=function(e){return function(e){var t={};function s(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=e,s.c=t,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(a,n,function(t){return e[t]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s="./src/react-webcam.tsx")}({"./src/react-webcam.tsx":function(e,t,s){"use strict";s.r(t);var a=s("react"),n=function(){var e=function(t,s){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var s in t)t.hasOwnProperty(s)&&(e[s]=t[s])})(t,s)};return function(t,s){function a(){this.constructor=t}e(t,s),t.prototype=null===s?Object.create(s):(a.prototype=s.prototype,new a)}}(),c=function(){return(c=Object.assign||function(e){for(var t,s=1,a=arguments.length;s<a;s++)for(var n in t=arguments[s])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},i=function(e,t){var s={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(s[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(s[a[n]]=e[a[n]])}return s};function r(){return!(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)}"undefined"!==typeof window&&(void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(e){var t=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;return t?new Promise((function(s,a){t.call(navigator,e,s,a)})):Promise.reject(new Error("getUserMedia is not implemented in this browser"))}));var l=function(e){function t(t){var s=e.call(this,t)||this;return s.canvas=null,s.ctx=null,s.unmounted=!1,s.state={hasUserMedia:!1},s}return n(t,e),t.prototype.componentDidMount=function(){var e=this.state,t=this.props;r()?e.hasUserMedia||this.requestUserMedia():t.onUserMediaError("getUserMedia not supported")},t.prototype.componentDidUpdate=function(e){var t=this.props;if(r()){var s=JSON.stringify(e.audioConstraints)!==JSON.stringify(t.audioConstraints),a=JSON.stringify(e.videoConstraints)!==JSON.stringify(t.videoConstraints),n=e.minScreenshotWidth!==t.minScreenshotWidth,c=e.minScreenshotHeight!==t.minScreenshotHeight;(a||n||c)&&(this.canvas=null,this.ctx=null),(s||a)&&(this.stopAndCleanup(),this.requestUserMedia())}else t.onUserMediaError("getUserMedia not supported")},t.prototype.componentWillUnmount=function(){this.unmounted=!0,this.stopAndCleanup()},t.stopMediaStream=function(e){e&&(e.getVideoTracks&&e.getAudioTracks?(e.getVideoTracks().map((function(t){e.removeTrack(t),t.stop()})),e.getAudioTracks().map((function(t){e.removeTrack(t),t.stop()}))):e.stop())},t.prototype.stopAndCleanup=function(){var e=this.state;e.hasUserMedia&&(t.stopMediaStream(this.stream),e.src&&window.URL.revokeObjectURL(e.src))},t.prototype.getScreenshot=function(e){var t=this.state,s=this.props;if(!t.hasUserMedia)return null;var a=this.getCanvas(e);return a&&a.toDataURL(s.screenshotFormat,s.screenshotQuality)},t.prototype.getCanvas=function(e){var t=this.state,s=this.props;if(!this.video)return null;if(!t.hasUserMedia||!this.video.videoHeight)return null;if(!this.ctx){var a=this.video.videoWidth,n=this.video.videoHeight;if(!this.props.forceScreenshotSourceSize){var c=a/n;n=(a=s.minScreenshotWidth||this.video.clientWidth)/c,s.minScreenshotHeight&&n<s.minScreenshotHeight&&(a=(n=s.minScreenshotHeight)*c)}this.canvas=document.createElement("canvas"),this.canvas.width=(null===e||void 0===e?void 0:e.width)||a,this.canvas.height=(null===e||void 0===e?void 0:e.height)||n,this.ctx=this.canvas.getContext("2d")}var i=this.ctx,r=this.canvas;return i&&r&&(s.mirrored&&(i.translate(r.width,0),i.scale(-1,1)),i.imageSmoothingEnabled=s.imageSmoothing,i.drawImage(this.video,0,0,(null===e||void 0===e?void 0:e.width)||r.width,(null===e||void 0===e?void 0:e.height)||r.height),s.mirrored&&(i.scale(-1,1),i.translate(-r.width,0))),r},t.prototype.requestUserMedia=function(){var e=this,s=this.props,a=function(a,n){var c={video:"undefined"===typeof n||n};s.audio&&(c.audio="undefined"===typeof a||a),navigator.mediaDevices.getUserMedia(c).then((function(s){e.unmounted?t.stopMediaStream(s):e.handleUserMedia(null,s)})).catch((function(t){e.handleUserMedia(t)}))};if("mediaDevices"in navigator)a(s.audioConstraints,s.videoConstraints);else{var n=function(e){return{optional:[{sourceId:e}]}},c=function(e){var t=e.deviceId;return"string"===typeof t?t:Array.isArray(t)&&t.length>0?t[0]:"object"===typeof t&&t.ideal?t.ideal:null};MediaStreamTrack.getSources((function(e){var t=null,i=null;e.forEach((function(e){"audio"===e.kind?t=e.id:"video"===e.kind&&(i=e.id)}));var r=c(s.audioConstraints);r&&(t=r);var l=c(s.videoConstraints);l&&(i=l),a(n(t),n(i))}))}},t.prototype.handleUserMedia=function(e,t){var s=this.props;if(e||!t)return this.setState({hasUserMedia:!1}),void s.onUserMediaError(e);this.stream=t;try{this.video&&(this.video.srcObject=t),this.setState({hasUserMedia:!0})}catch(a){this.setState({hasUserMedia:!0,src:window.URL.createObjectURL(t)})}s.onUserMedia(t)},t.prototype.render=function(){var e=this,t=this.state,s=this.props,n=s.audio,r=(s.forceScreenshotSourceSize,s.onUserMedia,s.onUserMediaError,s.screenshotFormat,s.screenshotQuality,s.minScreenshotWidth,s.minScreenshotHeight,s.audioConstraints,s.videoConstraints,s.imageSmoothing,s.mirrored),l=s.style,o=void 0===l?{}:l,d=i(s,["audio","forceScreenshotSourceSize","onUserMedia","onUserMediaError","screenshotFormat","screenshotQuality","minScreenshotWidth","minScreenshotHeight","audioConstraints","videoConstraints","imageSmoothing","mirrored","style"]),m=r?c(c({},o),{transform:(o.transform||"")+" scaleX(-1)"}):o;return a.createElement("video",c({autoPlay:!0,src:t.src,muted:n,playsInline:!0,ref:function(t){e.video=t},style:m},d))},t.defaultProps={audio:!0,forceScreenshotSourceSize:!1,imageSmoothing:!0,mirrored:!1,onUserMedia:function(){},onUserMediaError:function(){},screenshotFormat:"image/webp",screenshotQuality:.92},t}(a.Component);t.default=l},react:function(t,s){t.exports=e}}).default},e.exports=a(s(1))},551:function(e,t,s){"use strict";s.r(t);var a=s(107),n=s(24),c=s(9),i=s(4),r=s(1),l=(s(552),s(137)),o=s.n(l),d=s(80),m=s.n(d),j=s(11),b=s(3),h=s(83),p=(s(82),s(0));t.default=function(){var e=Object(b.g)(),t=Object(r.useRef)(null),s=Object(r.useState)({Name:"",FatherName:"",Dob:"",PoB:"",Image:"",ImageName:"",RsdtAddress:"",PrmtAddress:"",Emergency_contact_person:"",Emergency_contact_number:"",landlineHome:"",personal_no:"",cnic:"",cnic_PoI:"",cnic_DoI:"",cnic_DoE:"",additionalOFF:"",gender:"",email:"",maritalStatus:"",ChildCount:0}),l=Object(i.a)(s,2),d=l[0],u=l[1],f=Object(r.useState)({childName:"",childAge:"",childGender:""}),g=Object(i.a)(f,2),x=g[0],O=g[1],v=Object(r.useState)([]),N=Object(i.a)(v,2),y=N[0],C=N[1],S=Object(r.useState)(!1),_=Object(i.a)(S,2),w=_[0],A=_[1],M=Object(r.useState)(""),D=Object(i.a)(M,2),I=D[0],L=D[1],U=Object(r.useState)({front:"",back:"",frontCNICName:"",backCNICName:""}),P=Object(i.a)(U,2),k=P[0],E=P[1],R=Object(r.useState)({CV:"",CVName:""}),F=Object(i.a)(R,2),q=F[0],H=F[1],B=Object(r.useState)({PrfAddrs:"",PrfAddrsName:""}),T=Object(i.a)(B,2),z=T[0],V=T[1],G=Object(r.useState)({License:"",LicenseName:""}),Z=Object(i.a)(G,2),W=Z[0],J=Z[1],Q=Object(r.useState)({License:"",LicenseName:""}),K=Object(i.a)(Q,2),$=K[0],X=K[1],Y=Object(r.useState)(!1),ee=Object(i.a)(Y,2),te=ee[0],se=ee[1],ae=Object(r.useState)(!1),ne=Object(i.a)(ae,2),ce=ne[0],ie=ne[1];Object(r.useEffect)((function(){setInterval((function(){navigator.getUserMedia({video:!0},(function(){A(!0)}),(function(){A(!1)}))}),100)}),[e]),Object(r.useEffect)((function(){var e=new Date;m()(".Step2").slideUp(0),m()(".Step3").slideUp(0),m()(".Step4").slideUp(0),m()(".Step5").slideUp(0),m()(".form1").on("submit",(function(t){t.preventDefault();var s=m()("input[name=Dob]").val();new Date(s)<e?(m()(".Step1").slideUp(),m()(".Step2").slideDown(),m()(".cnic_icon").addClass("activeStep")):h.b.dark("invalid date of birth",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})})),m()(".step2_btn_prev").on("click",(function(){m()(".Step1").slideDown(),m()(".Step2").slideUp(),m()(".cnic_icon").removeClass("activeStep")})),m()(".form2").on("submit",(function(t){t.preventDefault();var s=m()("input[name=cnic_DoI]").val(),a=m()("input[name=cnic_DoE]").val(),n=new Date(s),c=new Date(a);n.toString()===c.toString()||n>e||c<n?h.b.dark("invalid date",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}):(m()(".Step3").slideDown(),m()(".Step2").slideUp(),m()(".contact_icon").addClass("activeStep"))})),m()(".step3_btn_prev").on("click",(function(){m()(".Step2").slideDown(),m()(".Step3").slideUp(),m()(".contact_icon").removeClass("activeStep")})),m()(".form3").on("submit",(function(e){e.preventDefault(),m()(".Step4").slideDown(),m()(".Step3").slideUp(),m()(".documents_icon").addClass("activeStep")})),m()(".step4_btn_prev").on("click",(function(){m()(".Step3").slideDown(),m()(".Step4").slideUp(),m()(".documents_icon").removeClass("activeStep")})),m()(".form4").on("submit",(function(e){e.preventDefault(),m()(".Step4").slideUp(),m()(".Step5").slideDown(),m()(".documents_icon").addClass("activeStep")}))}),[]);var re=function(e){var t=e.target,s=t.name,a=t.value,i=Object(c.a)(Object(c.a)({},d),{},Object(n.a)({},s,a));u(i),"ChildCount"===s&&a>0&&m()(".AddChildBtn").trigger("click")},le=function(e){var t=e.target,s=t.name,a=t.value,i=Object(c.a)(Object(c.a)({},x),{},Object(n.a)({},s,a));O(i)},oe=function(e){var t=new FileReader,s=e.target.name,a=d.Name.substring(0,3)+d.FatherName.substring(0,3)+d.cnic.substring(0,8);t.onload=function(){2===t.readyState&&("cnic_front_photo"===s?E(Object(c.a)(Object(c.a)({},k),{},{front:e.target.files[0],frontCNICName:a+"_front"})):"cnic_back_photo"===s?E(Object(c.a)(Object(c.a)({},k),{},{back:e.target.files[0],backCNICName:a+"_back"})):"emp_cv"===s?H(Object(c.a)(Object(c.a)({},q),{},{CV:e.target.files[0],CVName:a+"_CV"})):"emp_prfaddrs"===s?V(Object(c.a)(Object(c.a)({},z),{},{PrfAddrs:e.target.files[0],PrfAddrsName:a+"_proof_of_address"})):"DrvLicense"===s?J(Object(c.a)(Object(c.a)({},W),{},{License:e.target.files[0],LicenseName:a+"_Driving_License"})):"ArmdLicense"===s&&X(Object(c.a)(Object(c.a)({},$),{},{License:e.target.files[0],LicenseName:a+"_Armed_License"})))},e.target.files[0]&&t.readAsDataURL(e.target.files[0])},de=function(e){var t=e.target,s=t.value,a=t.checked;"drivingLicense"===s?a?ie(!0):(ie(!1),J(Object(c.a)(Object(c.a)({},W),{},{License:"",LicenseName:""}))):a?se(!0):(se(!1),X(Object(c.a)(Object(c.a)({},$),{},{License:"",LicenseName:""})))};return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("div",{className:"EmployeeForm d-center",children:Object(p.jsx)("div",{className:"EmployeeForm-content",children:Object(p.jsxs)("div",{className:"firstform",children:[Object(p.jsxs)("div",{className:"text-center mb-3 emp_heading",children:[Object(p.jsx)("h3",{className:"text-uppercase formName mb-1",children:"Employment Form"}),Object(p.jsx)("p",{children:"Seaboard Group Employee Data Form"})]}),Object(p.jsxs)("div",{className:"steps",children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("i",{className:"las la-universal-access activeStep"}),Object(p.jsx)("p",{className:"mb-0 mt-1 text-center",children:"Personal"})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("i",{className:"las la-list-ol cnic_icon"}),Object(p.jsx)("p",{className:"mb-0 mt-1 text-center ",children:"CNIC"})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("i",{className:"las la-phone-volume contact_icon"}),Object(p.jsx)("p",{className:"mb-0 mt-1 text-center ",children:"Contact"})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("i",{className:"las la-file-alt documents_icon"}),Object(p.jsx)("p",{className:"mb-0 mt-1 text-center ",children:"Documents"})]})]}),Object(p.jsx)("div",{className:"Step1",children:Object(p.jsxs)("form",{className:"form1",children:[Object(p.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Name:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-font"}),Object(p.jsx)("input",{onChange:re,name:"Name",type:"text",pattern:"[a-zA-Z][a-zA-Z\\s]*",title:"Name only contains letters",className:"form-control",required:!0,minLength:"3"})]})]}),Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Father Name:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-bold"}),Object(p.jsx)("input",{onChange:re,name:"FatherName",type:"text",pattern:"[a-zA-Z][a-zA-Z\\s]*",title:"Father Name only contains letters",className:"form-control",required:!0,minLength:"3"})]})]})]}),Object(p.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Date of Birth:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"lar la-calendar"}),Object(p.jsx)("input",{onChange:re,name:"Dob",type:"date",className:"form-control",required:!0})]})]}),Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Place of Birth:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-location-arrow"}),Object(p.jsx)("input",{list:"cities",onChange:re,name:"PoB",type:"text",className:"form-control",pattern:"^[A-Za-z]+$",title:"Place of birth only contains letters",required:!0,minLength:"3",placeholder:"City"}),Object(p.jsxs)("datalist",{id:"cities",children:[Object(p.jsx)("option",{value:"Karachi"}),Object(p.jsx)("option",{value:"Lahore"}),Object(p.jsx)("option",{value:"Queta"}),Object(p.jsx)("option",{value:"Peshawer"}),Object(p.jsx)("option",{value:"Kashmir"})]})]})]})]}),Object(p.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Gender:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-mercury"}),Object(p.jsxs)("select",{onChange:re,name:"gender",className:"form-control",required:!0,children:[Object(p.jsx)("option",{value:"",children:"Select The Option"}),Object(p.jsx)("option",{value:"Male",children:"Male"}),Object(p.jsx)("option",{value:"FeMale",children:"FeMale"})]})]})]}),Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Email:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-envelope"}),Object(p.jsx)("input",{onChange:re,name:"email",type:"email",className:"form-control",required:!0})]})]})]}),Object(p.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(p.jsxs)("div",{className:"Married"===d.maritalStatus?"leftRight mr-2":"leftRight mr-2 w-100",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Marital Status:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-ring"}),Object(p.jsxs)("select",{onChange:re,name:"maritalStatus",className:"form-control",required:!0,children:[Object(p.jsx)("option",{value:"",children:"Select The Option"}),Object(p.jsx)("option",{value:"Single",children:"Single"}),Object(p.jsx)("option",{value:"Married",children:"Married"})]})]})]}),"Married"===d.maritalStatus?Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"NO. of Children ( if any ):"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-baby"}),Object(p.jsx)("input",{onChange:re,name:"ChildCount",type:"number",className:"form-control",required:!0})]})]}):Object(p.jsx)(p.Fragment,{})]}),d.ChildCount>0&&"Married"===d.maritalStatus?Object(p.jsxs)(p.Fragment,{children:[parseInt(y.length)===parseInt(d.ChildCount)?null:Object(p.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(p.jsx)("input",{type:"text",className:"d-none",required:!0}),Object(p.jsx)("div",{className:"leftRight mr-2 w-100",children:Object(p.jsx)("input",{className:"btn btn-sm d-block mx-auto AddChildBtn",type:"button","data-toggle":"modal","data-target":"#AddChild",value:"Add Child",required:!0})})]}),Object(p.jsx)("div",{className:"d-lg-flex justify-content-center mb-2",children:Object(p.jsxs)("div",{className:"leftRight mr-2 w-100",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Children Details:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-between align-items-center px-5 mx-auto",children:[Object(p.jsx)("p",{className:"font-weight-bold",children:"Sr.NO"}),Object(p.jsx)("p",{className:"font-weight-bold",children:"Name"}),Object(p.jsx)("p",{className:"font-weight-bold",children:"Age"}),Object(p.jsx)("p",{className:"font-weight-bold",children:"Gender"})]}),y.map((function(e,t){return Object(p.jsxs)("div",{className:"d-flex justify-content-between align-items-center px-5 mx-auto",children:[Object(p.jsxs)("p",{className:"mb-0 border-bottom",children:[" ",t+1," "]}),Object(p.jsxs)("p",{className:"mb-0 border-bottom",children:[" ",e.childName," "]}),Object(p.jsxs)("p",{className:"mb-0 border-bottom",children:[" ",e.childAge," "]}),Object(p.jsxs)("p",{className:"mb-0 border-bottom",children:[" ",e.childGender," "]})]},t)}))]})})]}):Object(p.jsx)(p.Fragment,{}),Object(p.jsx)("button",{className:"btn btn-sm d-none mx-auto AddChildBtn",type:"button","data-toggle":"modal","data-target":"#AddChild",children:"Add Child"}),Object(p.jsx)("div",{className:"text-right mt-3 mr-2",children:Object(p.jsx)("button",{type:"submit",className:"btn btn-sm step1_btn_next",children:"Next"})})]})}),Object(p.jsx)("div",{className:"Step2",children:Object(p.jsxs)("form",{className:"form2",children:[Object(p.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"CNIC:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-list-ol"}),Object(p.jsx)("input",{onChange:re,name:"cnic",type:"text",pattern:"^[0-9]+$",title:"CNIC only contains numbers",className:"form-control",required:!0,minLength:"13",maxLength:"13"})]})]}),Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Date of Issue:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"lar la-calendar-check"}),Object(p.jsx)("input",{onChange:re,name:"cnic_DoI",type:"date",className:"form-control",required:!0})]})]})]}),Object(p.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Place of Issue:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-map-marked-alt"}),Object(p.jsx)("input",{onChange:re,name:"cnic_PoI",type:"text",className:"form-control",pattern:"[a-zA-Z][a-zA-Z\\s]*",title:"Place Of Issue only contains letters",required:!0,minLength:"3",maxLength:"30",placeholder:"city"})]})]}),Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Date of Expiry:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"lar la-calendar-times"}),Object(p.jsx)("input",{onChange:re,name:"cnic_DoE",type:"date",className:"form-control",required:!0}),Object(p.jsxs)("datalist",{id:"cities",children:[Object(p.jsx)("option",{value:"Karachi"}),Object(p.jsx)("option",{value:"Lahore"}),Object(p.jsx)("option",{value:"Queta"}),Object(p.jsx)("option",{value:"Peshawer"}),Object(p.jsx)("option",{value:"Kashmir"})]})]})]})]}),Object(p.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"CNIC Front Image:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-id-card-alt"}),Object(p.jsx)("input",{onChange:oe,name:"cnic_front_photo",type:"file",className:"form-control",required:!0,accept:".jpg, .jpeg, .png"})]})]}),Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"CNIC Back Image:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-folder-open"}),Object(p.jsx)("input",{onChange:oe,name:"cnic_back_photo",type:"file",className:"form-control",required:!0,accept:".jpg, .jpeg, .png"})]})]})]}),Object(p.jsxs)("div",{className:"text-right mt-3 mr-2",children:[Object(p.jsx)("button",{type:"button",className:"btn btn-sm step2_btn_prev",children:"Previous"}),Object(p.jsx)("button",{type:"submit",className:"btn btn-sm step2_btn_next",children:"Next"})]})]})}),Object(p.jsx)("div",{className:"Step3",children:Object(p.jsxs)("form",{className:"form3",children:[Object(p.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Residential Address:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-map-marked"}),Object(p.jsx)("input",{onChange:re,name:"RsdtAddress",type:"text",className:"form-control",minLength:"10",required:!0})]})]}),Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Permanent Address:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-map-marker"}),Object(p.jsx)("input",{onChange:re,name:"PrmtAddress",type:"text",className:"form-control",minLength:"10",required:!0})]})]})]}),Object(p.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Emergency Contact Person:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-ambulance"}),Object(p.jsx)("input",{onChange:re,name:"Emergency_contact_person",type:"text",className:"form-control",pattern:"[a-zA-Z][a-zA-Z\\s]*",title:"Emergency Contact Person Name only contains letters",minLength:"3",required:!0})]})]}),Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Emergency Contact Number:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-mobile-alt"}),Object(p.jsx)("input",{onChange:re,name:"Emergency_contact_number",pattern:"^[0-9]+$",title:"Emergency Person Number only contains number",type:"text",className:"form-control",minLength:"11",maxLength:"13",required:!0})]})]})]}),Object(p.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Landline Home:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-phone-volume"}),Object(p.jsx)("input",{onChange:re,name:"landlineHome",type:"text",className:"form-control",pattern:"^[0-9]+$",title:"Lanline Home only contains numbers",minLength:"3",maxLength:"15",required:!0})]})]}),Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Personal Cell Phone Number:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-phone-square-alt"}),Object(p.jsx)("input",{onChange:re,name:"personal_no",pattern:"^[0-9]+$",type:"text",className:"form-control",minLength:"11",maxLength:"13",required:!0})]})]})]}),Object(p.jsxs)("div",{className:"text-right mt-3 mr-2",children:[Object(p.jsx)("button",{type:"button",className:"btn btn-sm step3_btn_prev",children:"Previous"}),Object(p.jsx)("button",{type:"submit",className:"btn btn-sm step3_btn_next",children:"Next"})]})]})}),Object(p.jsx)("div",{className:"Step4",children:Object(p.jsxs)("form",{onSubmit:function(t){if(t.preventDefault(),""!==d.ImageName){m()(".Step5").slideDown(),m()(".Step4").slideUp();var s=new FormData;s.append("Name",d.Name),s.append("FatherName",d.FatherName),s.append("Dob",d.Dob),s.append("PoB",d.PoB),s.append("ImageName",d.ImageName),s.append("RsdtAddress",d.RsdtAddress),s.append("PrmtAddress",d.PrmtAddress),s.append("Emergency_contact_person",d.Emergency_contact_person),s.append("Emergency_contact_number",d.Emergency_contact_number),s.append("landlineHome",d.landlineHome),s.append("personal_no",d.personal_no),s.append("cnic",d.cnic),s.append("cnic_PoI",d.cnic_PoI),s.append("cnic_DoI",d.cnic_DoI),s.append("cnic_DoE",d.cnic_DoE),s.append("children",JSON.stringify(y)),s.append("maritalStatus",d.maritalStatus),s.append("gender",d.gender),s.append("Image",d.Image),s.append("CNICFrontImage",k.front),s.append("CNICFrontImageName",k.frontCNICName),s.append("CNICBackImage",k.back),s.append("CNICBackImageName",k.backCNICName),s.append("CVImage",q.CV),s.append("CVImageName",q.CVName),s.append("AddressImage",z.PrfAddrs),s.append("AddressImageName",z.PrfAddrsName),s.append("DrivingLicense",W.License),s.append("DrivingLicenseName",W.LicenseName),s.append("ArmedLicense",$.License),s.append("ArmedLicenseName",$.LicenseName),s.append("userID",sessionStorage.getItem("UserID")),s.append("Email",d.email),j.a.post("/initializeemployee",s,{headers:{"content-type":"multipart/form-data"}}).then((function(){e.replace("/admin_employement_requests")})).catch((function(e){h.b.dark(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}))}else h.b.dark("Please take employee photo",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})},encType:"multipart/form-data",children:[Object(p.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"CV:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-id-card"}),Object(p.jsx)("input",{onChange:oe,multiple:!0,name:"emp_cv",type:"file",className:"form-control",accept:".jpg, .jpeg, .png, .pdf",required:!0})]})]}),Object(p.jsxs)("div",{className:"leftRight mr-2",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Proof of Address:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"lar la-id-badge"}),Object(p.jsx)("input",{onChange:oe,name:"emp_prfaddrs",type:"file",className:"form-control",accept:".jpg, .jpeg, .png",required:!0})]})]})]}),Object(p.jsx)("div",{className:"d-lg-flex justify-content-center mb-2 px-5",children:Object(p.jsxs)("table",{className:"table",children:[Object(p.jsx)("thead",{children:Object(p.jsx)("tr",{children:Object(p.jsx)("th",{colSpan:"2",children:"Licences ( If the employee is driver or a guard )"})})}),Object(p.jsxs)("tbody",{children:[Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{children:"Driving License"}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{type:"checkbox",value:"drivingLicense",onChange:de})})]}),Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{children:"Armed License"}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{type:"checkbox",value:"armedLicense",onChange:de})})]})]})]})}),ce?Object(p.jsx)("div",{className:"d-lg-flex justify-content-center mb-2",children:Object(p.jsxs)("div",{className:"leftRight mr-2 w-100",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Driving License:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-newspaper"}),Object(p.jsx)("input",{onChange:oe,name:"DrvLicense",type:"file",className:"form-control",accept:".jpg, .jpeg, .png",required:!0})]})]})}):null,te?Object(p.jsx)("div",{className:"d-lg-flex justify-content-center mb-2",children:Object(p.jsxs)("div",{className:"leftRight mr-2 w-100",children:[Object(p.jsx)("label",{className:"mb-0 font-weight-bold",children:"Armed License:"}),Object(p.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(p.jsx)("i",{className:"las la-toilet-paper"}),Object(p.jsx)("input",{onChange:oe,name:"ArmdLicense",type:"file",className:"form-control",accept:".jpg, .jpeg, .png",required:!0})]})]})}):null,Object(p.jsx)("div",{className:"d-lg-flex justify-content-center mb-2",children:Object(p.jsx)("div",{className:"leftRight mr-2 w-100",children:Object(p.jsx)("div",{className:"d-lg-flex justify-content-center mb-2",children:Object(p.jsx)("div",{className:"employee_img","data-toggle":"modal","data-target":"#myModal",style:{backgroundImage:"url('"+I+"')"}})})})}),Object(p.jsxs)("div",{className:"text-right mt-3 mr-2",children:[Object(p.jsx)("button",{type:"button",className:"btn btn-sm step4_btn_prev",children:"Previous"}),Object(p.jsx)("button",{type:"submit",className:"btn btn-sm step4_btn_next",children:"Submit"})]})]})}),Object(p.jsx)("div",{className:"Step5",children:Object(p.jsx)("div",{className:"d-lg-flex justify-content-center mb-2",children:Object(p.jsx)("h3",{className:"mt-4",children:"Form Submitted Successfully"})})})]})})}),Object(p.jsx)("div",{id:"myModal",className:"modal fade empModals",role:"dialog",children:Object(p.jsx)("div",{className:"modal-dialog modal-dialog-centered",children:Object(p.jsxs)("div",{className:"modal-content",children:[Object(p.jsxs)("div",{className:"modal-header",children:[Object(p.jsx)("h4",{className:"modal-title",children:"LIVE CAMERA"}),Object(p.jsx)("button",{type:"button",className:"close","data-dismiss":"modal",children:"\xd7"})]}),Object(p.jsx)("div",{className:"modal-body",children:w?Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(o.a,{audio:!1,screenshotFormat:"image/jpeg",width:"100%",ref:t,videoConstraints:{width:1280,height:720,facingMode:"user"}}),Object(p.jsx)("button",{className:"btn btn-sm btn-block mt-3",onClick:function(){var e=t.current.getScreenshot();console.log(e),u(Object(c.a)(Object(c.a)({},d),{},{Image:e})),L(e),m()(".close").trigger("click");var s=e.split(";"),a=s[0].split(":")[1],n=function(e,t,s){t=t||"",s=s||512;for(var a=atob(e),n=[],c=0;c<a.length;c+=s){for(var i=a.slice(c,c+s),r=new Array(i.length),l=0;l<i.length;l++)r[l]=i.charCodeAt(l);var o=new Uint8Array(r);n.push(o)}return new Blob(n,{type:t})}(s[1].split(",")[1],a),i=d.Name.substring(0,3)+(new Date).getTime()+d.Emergency_contact_person.substring(0,3);u(Object(c.a)(Object(c.a)({},d),{},{Image:n,ImageName:i}))},children:"TAKE YOUR PHOTO"})]}):Object(p.jsx)("h4",{className:"text-center my-3",children:"Camera Not Found"})}),Object(p.jsx)("div",{className:"modal-footer",children:Object(p.jsx)("button",{type:"button",className:"btn btn-default","data-dismiss":"modal",children:"Close"})})]})})}),Object(p.jsx)("div",{id:"AddChild",className:"modal fade empModals",role:"dialog",children:Object(p.jsx)("div",{className:"modal-dialog modal-dialog-centered",children:Object(p.jsxs)("div",{className:"modal-content",children:[Object(p.jsxs)("div",{className:"modal-header",children:[Object(p.jsx)("h4",{className:"modal-title",children:"Enter Children Details"}),Object(p.jsx)("button",{type:"button",className:"close","data-dismiss":"modal",children:"\xd7"})]}),Object(p.jsx)("div",{className:"modal-body",children:Object(p.jsxs)("div",{className:"add_div",children:[Object(p.jsx)("label",{className:"mb-0",children:"Name"}),Object(p.jsx)("input",{onChange:le,name:"childName",type:"text",className:"form-control",value:x.childName}),Object(p.jsx)("label",{className:"mb-0",children:"Age"}),Object(p.jsx)("input",{onChange:le,name:"childAge",type:"number",className:"form-control",value:x.childAge}),Object(p.jsx)("label",{className:"mb-0",children:"Gender"}),Object(p.jsxs)("select",{onChange:le,name:"childGender",className:"form-control",value:x.childGender,children:[Object(p.jsx)("option",{value:"",children:"Select an option"}),Object(p.jsx)("option",{value:"Male",children:"Male"}),Object(p.jsx)("option",{value:"FeMale",children:"FeMale"})]})]})}),Object(p.jsx)("div",{className:"modal-footer",children:Object(p.jsx)("button",{type:"button",className:"btn btn-sm btn-default","data-dismiss":"modal",onClick:function(e){e.preventDefault(),C([].concat(Object(a.a)(y),[x])),O(Object(c.a)(Object(c.a)({},x),{},{childName:"",childAge:"",childGender:""}))},children:"Add"})})]})})}),Object(p.jsx)(h.a,{})]})}},552:function(e,t,s){}}]);