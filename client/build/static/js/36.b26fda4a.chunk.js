/*! For license information please see 36.b26fda4a.chunk.js.LICENSE.txt */
(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[36],{105:function(e,t,n){"use strict";var a=n(1),s=(n(106),n(88)),c=n.n(s),i=n(17),l=n(0);t.a=function(e){Object(a.useEffect)((function(){c()(".Speeddail_Grid").slideToggle(0)}),[]);return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("div",{className:"Menu",children:e.data.length>0?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{className:"Menu_Grid",children:e.data.map((function(e,t){return Object(l.jsx)(l.Fragment,{children:e&&e.txt?e.link?Object(l.jsx)(i.b,{to:e.href,children:Object(l.jsx)("button",{children:Object(l.jsx)("p",{className:"font-weight-bolder mb-0",children:e.txt})})}):Object(l.jsx)("button",{onClick:function(){return e.func()},children:Object(l.jsx)("p",{className:"font-weight-bolder mb-0",children:e.txt})}):null})}))}),Object(l.jsxs)("div",{className:"Menu_Speeddail",children:[Object(l.jsx)("div",{className:"Menu_Speeddail_circle",onClick:function(){c()(".Menu_Speeddail .Speeddail_Grid").slideToggle(200),c()(".Menu_Speeddail .Menu_Speeddail_circle .las").hasClass("la-bars")?(c()(".Menu_Speeddail .Menu_Speeddail_circle .las").removeClass("la-bars"),c()(".Menu_Speeddail .Menu_Speeddail_circle .las").addClass("la-times")):(c()(".Menu_Speeddail .Menu_Speeddail_circle .las").removeClass("la-times"),c()(".Menu_Speeddail .Menu_Speeddail_circle .las").addClass("la-bars"))},children:Object(l.jsx)("i",{class:"las la-times"})}),Object(l.jsx)("div",{className:"Speeddail_Grid",children:e.data.map((function(e,t){return Object(l.jsx)(l.Fragment,{children:e&&e.txt?e.link?Object(l.jsx)(i.b,{to:e.href,children:Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"mb-1 Speeddail_Grid1 divs"+t,children:Object(l.jsx)("i",{className:e.icon})}),Object(l.jsx)("p",{children:e.txt})]},t)}):Object(l.jsxs)("div",{className:"clicks",onClick:function(){return e.func()},children:[Object(l.jsx)("div",{className:"mb-1 Speeddail_Grid1 divs"+t,children:Object(l.jsx)("i",{className:e.icon})}),Object(l.jsx)("p",{children:e.txt})]},t):null})}))})]})]}):null})})}},106:function(e,t,n){},107:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(19);var s=n(25);function c(e){return function(e){if(Array.isArray(e))return Object(a.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||Object(s.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},135:function(e,t,n){var a;a=function(e){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var s=t[a]={i:a,l:!1,exports:{}};return e[a].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(a,s,function(t){return e[t]}.bind(null,s));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./src/react-webcam.tsx")}({"./src/react-webcam.tsx":function(e,t,n){"use strict";n.r(t);var a=n("react"),s=function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},e(t,n)};return function(t,n){function a(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}(),c=function(){return c=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var s in t=arguments[n])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},c.apply(this,arguments)},i=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var s=0;for(a=Object.getOwnPropertySymbols(e);s<a.length;s++)t.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(e,a[s])&&(n[a[s]]=e[a[s]])}return n};function l(){return!(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)}"undefined"!==typeof window&&(void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(e){var t=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;return t?new Promise((function(n,a){t.call(navigator,e,n,a)})):Promise.reject(new Error("getUserMedia is not implemented in this browser"))}));var r=function(e){function t(t){var n=e.call(this,t)||this;return n.canvas=null,n.ctx=null,n.unmounted=!1,n.state={hasUserMedia:!1},n}return s(t,e),t.prototype.componentDidMount=function(){var e=this.state,t=this.props;l()?e.hasUserMedia||this.requestUserMedia():t.onUserMediaError("getUserMedia not supported")},t.prototype.componentDidUpdate=function(e){var t=this.props;if(l()){var n=JSON.stringify(e.audioConstraints)!==JSON.stringify(t.audioConstraints),a=JSON.stringify(e.videoConstraints)!==JSON.stringify(t.videoConstraints),s=e.minScreenshotWidth!==t.minScreenshotWidth,c=e.minScreenshotHeight!==t.minScreenshotHeight;(a||s||c)&&(this.canvas=null,this.ctx=null),(n||a)&&(this.stopAndCleanup(),this.requestUserMedia())}else t.onUserMediaError("getUserMedia not supported")},t.prototype.componentWillUnmount=function(){this.unmounted=!0,this.stopAndCleanup()},t.stopMediaStream=function(e){e&&(e.getVideoTracks&&e.getAudioTracks?(e.getVideoTracks().map((function(t){e.removeTrack(t),t.stop()})),e.getAudioTracks().map((function(t){e.removeTrack(t),t.stop()}))):e.stop())},t.prototype.stopAndCleanup=function(){var e=this.state;e.hasUserMedia&&(t.stopMediaStream(this.stream),e.src&&window.URL.revokeObjectURL(e.src))},t.prototype.getScreenshot=function(e){var t=this.state,n=this.props;if(!t.hasUserMedia)return null;var a=this.getCanvas(e);return a&&a.toDataURL(n.screenshotFormat,n.screenshotQuality)},t.prototype.getCanvas=function(e){var t=this.state,n=this.props;if(!this.video)return null;if(!t.hasUserMedia||!this.video.videoHeight)return null;if(!this.ctx){var a=this.video.videoWidth,s=this.video.videoHeight;if(!this.props.forceScreenshotSourceSize){var c=a/s;s=(a=n.minScreenshotWidth||this.video.clientWidth)/c,n.minScreenshotHeight&&s<n.minScreenshotHeight&&(a=(s=n.minScreenshotHeight)*c)}this.canvas=document.createElement("canvas"),this.canvas.width=(null===e||void 0===e?void 0:e.width)||a,this.canvas.height=(null===e||void 0===e?void 0:e.height)||s,this.ctx=this.canvas.getContext("2d")}var i=this.ctx,l=this.canvas;return i&&l&&(n.mirrored&&(i.translate(l.width,0),i.scale(-1,1)),i.imageSmoothingEnabled=n.imageSmoothing,i.drawImage(this.video,0,0,(null===e||void 0===e?void 0:e.width)||l.width,(null===e||void 0===e?void 0:e.height)||l.height),n.mirrored&&(i.scale(-1,1),i.translate(-l.width,0))),l},t.prototype.requestUserMedia=function(){var e=this,n=this.props,a=function(a,s){var c={video:"undefined"===typeof s||s};n.audio&&(c.audio="undefined"===typeof a||a),navigator.mediaDevices.getUserMedia(c).then((function(n){e.unmounted?t.stopMediaStream(n):e.handleUserMedia(null,n)})).catch((function(t){e.handleUserMedia(t)}))};if("mediaDevices"in navigator)a(n.audioConstraints,n.videoConstraints);else{var s=function(e){return{optional:[{sourceId:e}]}},c=function(e){var t=e.deviceId;return"string"===typeof t?t:Array.isArray(t)&&t.length>0?t[0]:"object"===typeof t&&t.ideal?t.ideal:null};MediaStreamTrack.getSources((function(e){var t=null,i=null;e.forEach((function(e){"audio"===e.kind?t=e.id:"video"===e.kind&&(i=e.id)}));var l=c(n.audioConstraints);l&&(t=l);var r=c(n.videoConstraints);r&&(i=r),a(s(t),s(i))}))}},t.prototype.handleUserMedia=function(e,t){var n=this.props;if(e||!t)return this.setState({hasUserMedia:!1}),void n.onUserMediaError(e);this.stream=t;try{this.video&&(this.video.srcObject=t),this.setState({hasUserMedia:!0})}catch(a){this.setState({hasUserMedia:!0,src:window.URL.createObjectURL(t)})}n.onUserMedia(t)},t.prototype.render=function(){var e=this,t=this.state,n=this.props,s=n.audio,l=(n.forceScreenshotSourceSize,n.onUserMedia,n.onUserMediaError,n.screenshotFormat,n.screenshotQuality,n.minScreenshotWidth,n.minScreenshotHeight,n.audioConstraints,n.videoConstraints,n.imageSmoothing,n.mirrored),r=n.style,o=void 0===r?{}:r,d=i(n,["audio","forceScreenshotSourceSize","onUserMedia","onUserMediaError","screenshotFormat","screenshotQuality","minScreenshotWidth","minScreenshotHeight","audioConstraints","videoConstraints","imageSmoothing","mirrored","style"]),m=l?c(c({},o),{transform:(o.transform||"")+" scaleX(-1)"}):o;return a.createElement("video",c({autoPlay:!0,src:t.src,muted:s,playsInline:!0,ref:function(t){e.video=t},style:m},d))},t.defaultProps={audio:!0,forceScreenshotSourceSize:!1,imageSmoothing:!0,mirrored:!1,onUserMedia:function(){},onUserMediaError:function(){},screenshotFormat:"image/webp",screenshotQuality:.92},t}(a.Component);t.default=r},react:function(t,n){t.exports=e}}).default},e.exports=a(n(1))},403:function(e,t,n){"use strict";n.r(t);var a=n(107),s=n(23),c=n(4),i=n(5),l=n(1),r=(n(404),n(135)),o=n.n(r),d=n(88),m=n.n(d),j=n(11),b=n(3),h=n(105),u=n(0);t.default=function(){var e=Object(b.g)(),t=Object(l.useRef)(null),n=Object(l.useState)({Name:"",FatherName:"",Dob:"",PoB:"",Image:"",ImageName:"",RsdtAddress:"",PrmtAddress:"",Emergency_contact_person:"",Emergency_contact_number:"",landlineHome:"",personal_no:"",cnic:"",cnic_PoI:"",cnic_DoI:"",cnic_DoE:"",additionalOFF:"",gender:"",email:"",maritalStatus:"",ChildCount:0}),r=Object(i.a)(n,2),d=r[0],p=r[1],f=Object(l.useState)({childName:"",childAge:"",childGender:""}),x=Object(i.a)(f,2),O=x[0],g=x[1],v=Object(l.useState)([]),N=Object(i.a)(v,2),y=N[0],S=N[1],C=Object(l.useState)(!1),_=Object(i.a)(C,2),w=_[0],M=_[1],A=Object(l.useState)(""),D=Object(i.a)(A,2),I=D[0],L=D[1],U=Object(l.useState)({front:"",back:"",frontCNICName:"",backCNICName:""}),k=Object(i.a)(U,2),P=k[0],E=k[1],R=Object(l.useState)({CV:"",CVName:""}),F=Object(i.a)(R,2),q=F[0],G=F[1],T=Object(l.useState)({PrfAddrs:"",PrfAddrsName:""}),H=Object(i.a)(T,2),z=H[0],V=H[1],B=Object(l.useState)({License:"",LicenseName:""}),Z=Object(i.a)(B,2),W=Z[0],J=Z[1],Q=Object(l.useState)({License:"",LicenseName:""}),K=Object(i.a)(Q,2),$=K[0],X=K[1],Y=Object(l.useState)(!1),ee=Object(i.a)(Y,2),te=ee[0],ne=ee[1],ae=Object(l.useState)(!1),se=Object(i.a)(ae,2),ce=se[0],ie=se[1],le=Object(l.useState)([{}]),re=Object(i.a)(le,2),oe=re[0],de=re[1];Object(l.useEffect)((function(){de([{icon:"las la-cloud-upload-alt",txt:"Create Employee",link:!0,href:"/employment_setup/form"},{icon:"las la-cloud-upload-alt",txt:"View Employee",link:!0,href:"/employment_setup/employees"},{icon:"las la-cloud-upload-alt",txt:"Employement Request",link:!0,href:"/employment_setup/requests"}])}),[]),Object(l.useEffect)((function(){setInterval((function(){navigator.getUserMedia({video:!0},(function(){M(!0)}),(function(){M(!1)}))}),100)}),[e]),Object(l.useEffect)((function(){var e=new Date;m()(".Step2").slideUp(0),m()(".Step3").slideUp(0),m()(".Step4").slideUp(0),m()(".Step5").slideUp(0),m()(".form1").on("submit",(function(t){t.preventDefault();var n=m()("input[name=Dob]").val();new Date(n)<e?(m()(".Step1").slideUp(),m()(".Step2").slideDown(),m()(".cnic_icon").addClass("activeStep")):console.log(alert("invalid date of birth"))})),m()(".step2_btn_prev").on("click",(function(){m()(".Step1").slideDown(),m()(".Step2").slideUp(),m()(".cnic_icon").removeClass("activeStep")})),m()(".form2").on("submit",(function(t){t.preventDefault();var n=m()("input[name=cnic_DoI]").val(),a=m()("input[name=cnic_DoE]").val(),s=new Date(n),c=new Date(a);s.toString()===c.toString()||s>e||c<s?console.log(alert("invalid date")):(m()(".Step3").slideDown(),m()(".Step2").slideUp(),m()(".contact_icon").addClass("activeStep"))})),m()(".step3_btn_prev").on("click",(function(){m()(".Step2").slideDown(),m()(".Step3").slideUp(),m()(".contact_icon").removeClass("activeStep")})),m()(".form3").on("submit",(function(e){e.preventDefault(),m()(".Step4").slideDown(),m()(".Step3").slideUp(),m()(".documents_icon").addClass("activeStep")})),m()(".step4_btn_prev").on("click",(function(){m()(".Step3").slideDown(),m()(".Step4").slideUp(),m()(".documents_icon").removeClass("activeStep")})),m()(".form4").on("submit",(function(e){e.preventDefault(),m()(".Step4").slideUp(),m()(".Step5").slideDown(),m()(".documents_icon").addClass("activeStep")}))}),[]);var me=function(e){var t=e.target,n=t.name,a=t.value,i=Object(c.a)(Object(c.a)({},d),{},Object(s.a)({},n,a));p(i),"ChildCount"===n&&a>0&&m()(".AddChildBtn").trigger("click")},je=function(e){var t=e.target,n=t.name,a=t.value,i=Object(c.a)(Object(c.a)({},O),{},Object(s.a)({},n,a));g(i)},be=function(e){var t=new FileReader,n=e.target.name,a=d.Name.substring(0,3)+d.FatherName.substring(0,3)+d.cnic.substring(0,8);t.onload=function(){2===t.readyState&&("cnic_front_photo"===n?E(Object(c.a)(Object(c.a)({},P),{},{front:e.target.files[0],frontCNICName:a+"_front"})):"cnic_back_photo"===n?E(Object(c.a)(Object(c.a)({},P),{},{back:e.target.files[0],backCNICName:a+"_back"})):"emp_cv"===n?G(Object(c.a)(Object(c.a)({},q),{},{CV:e.target.files[0],CVName:a+"_CV"})):"emp_prfaddrs"===n?V(Object(c.a)(Object(c.a)({},z),{},{PrfAddrs:e.target.files[0],PrfAddrsName:a+"_proof_of_address"})):"DrvLicense"===n?J(Object(c.a)(Object(c.a)({},W),{},{License:e.target.files[0],LicenseName:a+"_Driving_License"})):"ArmdLicense"===n&&X(Object(c.a)(Object(c.a)({},$),{},{License:e.target.files[0],LicenseName:a+"_Armed_License"})))},t.readAsDataURL(e.target.files[0])},he=function(e){var t=e.target,n=t.value,a=t.checked;"drivingLicense"===n?a?ie(!0):(ie(!1),J(Object(c.a)(Object(c.a)({},W),{},{License:"",LicenseName:""}))):a?ne(!0):(ne(!1),X(Object(c.a)(Object(c.a)({},$),{},{License:"",LicenseName:""})))};return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(h.a,{data:oe}),Object(u.jsx)("div",{className:"EmployeeForm d-center",children:Object(u.jsx)("div",{className:"EmployeeForm-content",children:Object(u.jsxs)("div",{className:"firstform",children:[Object(u.jsxs)("div",{className:"text-center mb-3 emp_heading",children:[Object(u.jsx)("h3",{className:"text-uppercase formName mb-1",children:"Employment Form"}),Object(u.jsx)("p",{children:"Seaboard Group Employee Data Form"})]}),Object(u.jsxs)("div",{className:"steps",children:[Object(u.jsxs)("div",{children:[Object(u.jsx)("i",{className:"las la-universal-access activeStep"}),Object(u.jsx)("p",{className:"mb-0 mt-1 text-center",children:"Personal"})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("i",{className:"las la-list-ol cnic_icon"}),Object(u.jsx)("p",{className:"mb-0 mt-1 text-center ",children:"CNIC"})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("i",{className:"las la-phone-volume contact_icon"}),Object(u.jsx)("p",{className:"mb-0 mt-1 text-center ",children:"Contact"})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("i",{className:"las la-file-alt documents_icon"}),Object(u.jsx)("p",{className:"mb-0 mt-1 text-center ",children:"Documents"})]})]}),Object(u.jsx)("div",{className:"Step1",children:Object(u.jsxs)("form",{className:"form1",children:[Object(u.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Name:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-font"}),Object(u.jsx)("input",{onChange:me,name:"Name",type:"text",pattern:"[a-zA-Z][a-zA-Z\\s]*",title:"Name only contains letters",className:"form-control",required:!0,minLength:"3"})]})]}),Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Father Name:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-bold"}),Object(u.jsx)("input",{onChange:me,name:"FatherName",type:"text",pattern:"[a-zA-Z][a-zA-Z\\s]*",title:"Father Name only contains letters",className:"form-control",required:!0,minLength:"3"})]})]})]}),Object(u.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Date of Birth:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"lar la-calendar"}),Object(u.jsx)("input",{onChange:me,name:"Dob",type:"date",className:"form-control",required:!0})]})]}),Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Place of Birth:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-location-arrow"}),Object(u.jsx)("input",{list:"cities",onChange:me,name:"PoB",type:"text",className:"form-control",pattern:"^[A-Za-z]+$",title:"Place of birth only contains letters",required:!0,minLength:"3",placeholder:"City"}),Object(u.jsxs)("datalist",{id:"cities",children:[Object(u.jsx)("option",{value:"Karachi"}),Object(u.jsx)("option",{value:"Lahore"}),Object(u.jsx)("option",{value:"Queta"}),Object(u.jsx)("option",{value:"Peshawer"}),Object(u.jsx)("option",{value:"Kashmir"})]})]})]})]}),Object(u.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Gender:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-mercury"}),Object(u.jsxs)("select",{onChange:me,name:"gender",className:"form-control",required:!0,children:[Object(u.jsx)("option",{value:"",children:"Select The Option"}),Object(u.jsx)("option",{value:"Male",children:"Male"}),Object(u.jsx)("option",{value:"FeMale",children:"FeMale"})]})]})]}),Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Email:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-envelope"}),Object(u.jsx)("input",{onChange:me,name:"email",type:"email",className:"form-control",required:!0})]})]})]}),Object(u.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(u.jsxs)("div",{className:"Married"===d.maritalStatus?"leftRight mr-2":"leftRight mr-2 w-100",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Marital Status:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-ring"}),Object(u.jsxs)("select",{onChange:me,name:"maritalStatus",className:"form-control",required:!0,children:[Object(u.jsx)("option",{value:"",children:"Select The Option"}),Object(u.jsx)("option",{value:"Single",children:"Single"}),Object(u.jsx)("option",{value:"Married",children:"Married"})]})]})]}),"Married"===d.maritalStatus?Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"NO. of Children ( if any ):"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-baby"}),Object(u.jsx)("input",{onChange:me,name:"ChildCount",type:"number",className:"form-control",required:!0})]})]}):Object(u.jsx)(u.Fragment,{})]}),d.ChildCount>0&&"Married"===d.maritalStatus?Object(u.jsxs)(u.Fragment,{children:[parseInt(y.length)===parseInt(d.ChildCount)?null:Object(u.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(u.jsx)("input",{type:"text",className:"d-none",required:!0}),Object(u.jsx)("div",{className:"leftRight mr-2 w-100",children:Object(u.jsx)("input",{className:"btn btn-sm d-block mx-auto AddChildBtn",type:"button","data-toggle":"modal","data-target":"#AddChild",value:"Add Child",required:!0})})]}),Object(u.jsx)("div",{className:"d-lg-flex justify-content-center mb-2",children:Object(u.jsxs)("div",{className:"leftRight mr-2 w-100",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Children Details:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-between align-items-center px-5 mx-auto",children:[Object(u.jsx)("p",{className:"font-weight-bold",children:"Sr.NO"}),Object(u.jsx)("p",{className:"font-weight-bold",children:"Name"}),Object(u.jsx)("p",{className:"font-weight-bold",children:"Age"}),Object(u.jsx)("p",{className:"font-weight-bold",children:"Gender"})]}),y.map((function(e,t){return Object(u.jsxs)("div",{className:"d-flex justify-content-between align-items-center px-5 mx-auto",children:[Object(u.jsxs)("p",{className:"mb-0 border-bottom",children:[" ",t+1," "]}),Object(u.jsxs)("p",{className:"mb-0 border-bottom",children:[" ",e.childName," "]}),Object(u.jsxs)("p",{className:"mb-0 border-bottom",children:[" ",e.childAge," "]}),Object(u.jsxs)("p",{className:"mb-0 border-bottom",children:[" ",e.childGender," "]})]},t)}))]})})]}):Object(u.jsx)(u.Fragment,{}),Object(u.jsx)("button",{className:"btn btn-sm d-none mx-auto AddChildBtn",type:"button","data-toggle":"modal","data-target":"#AddChild",children:"Add Child"}),Object(u.jsx)("div",{className:"text-right mt-3 mr-2",children:Object(u.jsx)("button",{type:"submit",className:"btn btn-sm step1_btn_next",children:"Next"})})]})}),Object(u.jsx)("div",{className:"Step2",children:Object(u.jsxs)("form",{className:"form2",children:[Object(u.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"CNIC:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-list-ol"}),Object(u.jsx)("input",{onChange:me,name:"cnic",type:"text",pattern:"^[0-9]+$",title:"CNIC only contains numbers",className:"form-control",required:!0,minLength:"13",maxLength:"13"})]})]}),Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Date of Issue:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"lar la-calendar-check"}),Object(u.jsx)("input",{onChange:me,name:"cnic_DoI",type:"date",className:"form-control",required:!0})]})]})]}),Object(u.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Place of Issue:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-map-marked-alt"}),Object(u.jsx)("input",{onChange:me,name:"cnic_PoI",type:"text",className:"form-control",pattern:"[a-zA-Z][a-zA-Z\\s]*",title:"Place Of Issue only contains letters",required:!0,minLength:"3",maxLength:"30",placeholder:"city"})]})]}),Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Date of Expiry:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"lar la-calendar-times"}),Object(u.jsx)("input",{onChange:me,name:"cnic_DoE",type:"date",className:"form-control",required:!0}),Object(u.jsxs)("datalist",{id:"cities",children:[Object(u.jsx)("option",{value:"Karachi"}),Object(u.jsx)("option",{value:"Lahore"}),Object(u.jsx)("option",{value:"Queta"}),Object(u.jsx)("option",{value:"Peshawer"}),Object(u.jsx)("option",{value:"Kashmir"})]})]})]})]}),Object(u.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"CNIC Front Image:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-id-card-alt"}),Object(u.jsx)("input",{onChange:be,name:"cnic_front_photo",type:"file",className:"form-control",required:!0,accept:".jpg, .jpeg, .png"})]})]}),Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"CNIC Back Image:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-folder-open"}),Object(u.jsx)("input",{onChange:be,name:"cnic_back_photo",type:"file",className:"form-control",required:!0,accept:".jpg, .jpeg, .png"})]})]})]}),Object(u.jsxs)("div",{className:"text-right mt-3 mr-2",children:[Object(u.jsx)("button",{type:"button",className:"btn btn-sm step2_btn_prev",children:"Previous"}),Object(u.jsx)("button",{type:"submit",className:"btn btn-sm step2_btn_next",children:"Next"})]})]})}),Object(u.jsx)("div",{className:"Step3",children:Object(u.jsxs)("form",{className:"form3",children:[Object(u.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Residential Address:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-map-marked"}),Object(u.jsx)("input",{onChange:me,name:"RsdtAddress",type:"text",className:"form-control",minLength:"10",required:!0})]})]}),Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Permanent Address:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-map-marker"}),Object(u.jsx)("input",{onChange:me,name:"PrmtAddress",type:"text",className:"form-control",minLength:"10",required:!0})]})]})]}),Object(u.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Emergency Contact Person:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-ambulance"}),Object(u.jsx)("input",{onChange:me,name:"Emergency_contact_person",type:"text",className:"form-control",pattern:"[a-zA-Z][a-zA-Z\\s]*",title:"Emergency Contact Person Name only contains letters",minLength:"3",required:!0})]})]}),Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Emergency Contact Number:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-mobile-alt"}),Object(u.jsx)("input",{onChange:me,name:"Emergency_contact_number",pattern:"^[0-9]+$",title:"Emergency Person Number only contains number",type:"text",className:"form-control",minLength:"11",maxLength:"13",required:!0})]})]})]}),Object(u.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Landline Home:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-phone-volume"}),Object(u.jsx)("input",{onChange:me,name:"landlineHome",type:"text",className:"form-control",pattern:"^[0-9]+$",title:"Lanline Home only contains numbers",minLength:"3",maxLength:"15",required:!0})]})]}),Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Personal Cell Phone Number:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-phone-square-alt"}),Object(u.jsx)("input",{onChange:me,name:"personal_no",pattern:"^[0-9]+$",type:"text",className:"form-control",minLength:"11",maxLength:"13",required:!0})]})]})]}),Object(u.jsxs)("div",{className:"text-right mt-3 mr-2",children:[Object(u.jsx)("button",{type:"button",className:"btn btn-sm step3_btn_prev",children:"Previous"}),Object(u.jsx)("button",{type:"submit",className:"btn btn-sm step3_btn_next",children:"Next"})]})]})}),Object(u.jsx)("div",{className:"Step4",children:Object(u.jsxs)("form",{onSubmit:function(t){if(t.preventDefault(),""!==d.ImageName){m()(".Step5").slideDown(),m()(".Step4").slideUp();var n=new FormData;n.append("Name",d.Name),n.append("FatherName",d.FatherName),n.append("Dob",d.Dob),n.append("PoB",d.PoB),n.append("ImageName",d.ImageName),n.append("RsdtAddress",d.RsdtAddress),n.append("PrmtAddress",d.PrmtAddress),n.append("Emergency_contact_person",d.Emergency_contact_person),n.append("Emergency_contact_number",d.Emergency_contact_number),n.append("landlineHome",d.landlineHome),n.append("personal_no",d.personal_no),n.append("cnic",d.cnic),n.append("cnic_PoI",d.cnic_PoI),n.append("cnic_DoI",d.cnic_DoI),n.append("cnic_DoE",d.cnic_DoE),n.append("children",JSON.stringify(y)),n.append("maritalStatus",d.maritalStatus),n.append("gender",d.gender),n.append("Image",d.Image),n.append("CNICFrontImage",P.front),n.append("CNICFrontImageName",P.frontCNICName),n.append("CNICBackImage",P.back),n.append("CNICBackImageName",P.backCNICName),n.append("CVImage",q.CV),n.append("CVImageName",q.CVName),n.append("AddressImage",z.PrfAddrs),n.append("AddressImageName",z.PrfAddrsName),n.append("DrivingLicense",W.License),n.append("DrivingLicenseName",W.LicenseName),n.append("ArmedLicense",$.License),n.append("ArmedLicenseName",$.LicenseName),n.append("userID",sessionStorage.getItem("UserID")),n.append("Email",d.email),j.a.post("/initializeemployee",n,{headers:{"content-type":"multipart/form-data"}}).then((function(){e.replace("/employment_setup/form")})).catch((function(e){console.log(e)}))}else alert("Please take employee photo")},encType:"multipart/form-data",children:[Object(u.jsxs)("div",{className:"d-lg-flex justify-content-center mb-2",children:[Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"CV:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-id-card"}),Object(u.jsx)("input",{onChange:be,multiple:!0,name:"emp_cv",type:"file",className:"form-control",accept:".jpg, .jpeg, .png, .pdf",required:!0})]})]}),Object(u.jsxs)("div",{className:"leftRight mr-2",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Proof of Address:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"lar la-id-badge"}),Object(u.jsx)("input",{onChange:be,name:"emp_prfaddrs",type:"file",className:"form-control",accept:".jpg, .jpeg, .png",required:!0})]})]})]}),Object(u.jsx)("div",{className:"d-lg-flex justify-content-center mb-2 px-5",children:Object(u.jsxs)("table",{className:"table",children:[Object(u.jsx)("thead",{children:Object(u.jsx)("tr",{children:Object(u.jsx)("th",{colSpan:"2",children:"Licences ( If the employee is driver or a guard )"})})}),Object(u.jsxs)("tbody",{children:[Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"Driving License"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{type:"checkbox",value:"drivingLicense",onChange:he})})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"Armed License"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{type:"checkbox",value:"armedLicense",onChange:he})})]})]})]})}),ce?Object(u.jsx)("div",{className:"d-lg-flex justify-content-center mb-2",children:Object(u.jsxs)("div",{className:"leftRight mr-2 w-100",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Driving License:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-newspaper"}),Object(u.jsx)("input",{onChange:be,name:"DrvLicense",type:"file",className:"form-control",accept:".jpg, .jpeg, .png",required:!0})]})]})}):null,te?Object(u.jsx)("div",{className:"d-lg-flex justify-content-center mb-2",children:Object(u.jsxs)("div",{className:"leftRight mr-2 w-100",children:[Object(u.jsx)("label",{className:"mb-0 font-weight-bold",children:"Armed License:"}),Object(u.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(u.jsx)("i",{className:"las la-toilet-paper"}),Object(u.jsx)("input",{onChange:be,name:"ArmdLicense",type:"file",className:"form-control",accept:".jpg, .jpeg, .png",required:!0})]})]})}):null,Object(u.jsx)("div",{className:"d-lg-flex justify-content-center mb-2",children:Object(u.jsx)("div",{className:"leftRight mr-2 w-100",children:Object(u.jsx)("div",{className:"d-lg-flex justify-content-center mb-2",children:Object(u.jsx)("div",{className:"employee_img","data-toggle":"modal","data-target":"#myModal",style:{backgroundImage:"url('"+I+"')"}})})})}),Object(u.jsxs)("div",{className:"text-right mt-3 mr-2",children:[Object(u.jsx)("button",{type:"button",className:"btn btn-sm step4_btn_prev",children:"Previous"}),Object(u.jsx)("button",{type:"submit",className:"btn btn-sm step4_btn_next",children:"Submit"})]})]})}),Object(u.jsx)("div",{className:"Step5",children:Object(u.jsx)("div",{className:"d-lg-flex justify-content-center mb-2",children:Object(u.jsx)("h3",{className:"mt-4",children:"Form Submitted Successfully"})})})]})})}),Object(u.jsx)("div",{id:"myModal",className:"modal fade empModals",role:"dialog",children:Object(u.jsx)("div",{className:"modal-dialog modal-dialog-centered",children:Object(u.jsxs)("div",{className:"modal-content",children:[Object(u.jsxs)("div",{className:"modal-header",children:[Object(u.jsx)("h4",{className:"modal-title",children:"LIVE CAMERA"}),Object(u.jsx)("button",{type:"button",className:"close","data-dismiss":"modal",children:"\xd7"})]}),Object(u.jsx)("div",{className:"modal-body",children:w?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(o.a,{audio:!1,screenshotFormat:"image/jpeg",width:"100%",ref:t,videoConstraints:{width:1280,height:720,facingMode:"user"}}),Object(u.jsx)("button",{className:"btn btn-sm btn-block mt-3",onClick:function(){var e=t.current.getScreenshot();p(Object(c.a)(Object(c.a)({},d),{},{Image:e})),L(e),m()(".close").trigger("click");var n=e.split(";"),a=n[0].split(":")[1],s=function(e,t,n){t=t||"",n=n||512;for(var a=atob(e),s=[],c=0;c<a.length;c+=n){for(var i=a.slice(c,c+n),l=new Array(i.length),r=0;r<i.length;r++)l[r]=i.charCodeAt(r);var o=new Uint8Array(l);s.push(o)}return new Blob(s,{type:t})}(n[1].split(",")[1],a),i=d.Name.substring(0,3)+(new Date).getTime()+d.Emergency_contact_person.substring(0,3);p(Object(c.a)(Object(c.a)({},d),{},{Image:s,ImageName:i}))},children:"TAKE YOUR PHOTO"})]}):Object(u.jsx)("h4",{className:"text-center my-3",children:"Camera Not Found"})}),Object(u.jsx)("div",{className:"modal-footer",children:Object(u.jsx)("button",{type:"button",className:"btn btn-default","data-dismiss":"modal",children:"Close"})})]})})}),Object(u.jsx)("div",{id:"AddChild",className:"modal fade empModals",role:"dialog",children:Object(u.jsx)("div",{className:"modal-dialog modal-dialog-centered",children:Object(u.jsxs)("div",{className:"modal-content",children:[Object(u.jsxs)("div",{className:"modal-header",children:[Object(u.jsx)("h4",{className:"modal-title",children:"Enter Children Details"}),Object(u.jsx)("button",{type:"button",className:"close","data-dismiss":"modal",children:"\xd7"})]}),Object(u.jsx)("div",{className:"modal-body",children:Object(u.jsxs)("div",{className:"add_div",children:[Object(u.jsx)("label",{className:"mb-0",children:"Name"}),Object(u.jsx)("input",{onChange:je,name:"childName",type:"text",className:"form-control",value:O.childName}),Object(u.jsx)("label",{className:"mb-0",children:"Age"}),Object(u.jsx)("input",{onChange:je,name:"childAge",type:"number",className:"form-control",value:O.childAge}),Object(u.jsx)("label",{className:"mb-0",children:"Gender"}),Object(u.jsxs)("select",{onChange:je,name:"childGender",className:"form-control",value:O.childGender,children:[Object(u.jsx)("option",{value:"",children:"Select an option"}),Object(u.jsx)("option",{value:"Male",children:"Male"}),Object(u.jsx)("option",{value:"FeMale",children:"FeMale"})]})]})}),Object(u.jsx)("div",{className:"modal-footer",children:Object(u.jsx)("button",{type:"button",className:"btn btn-sm btn-default","data-dismiss":"modal",onClick:function(e){e.preventDefault(),S([].concat(Object(a.a)(y),[O])),g(Object(c.a)(Object(c.a)({},O),{},{childName:"",childAge:"",childGender:""}))},children:"Add"})})]})})})]})}},404:function(e,t,n){}}]);