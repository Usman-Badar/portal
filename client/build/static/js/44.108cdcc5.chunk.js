(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[44],{105:function(e,s,t){"use strict";var a=t(1),c=(t(106),t(88)),l=t.n(c),n=t(17),i=t(0);s.a=function(e){Object(a.useEffect)((function(){l()(".Speeddail_Grid").slideToggle(0)}),[]);return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)("div",{className:"Menu",children:e.data.length>0?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:"Menu_Grid",children:e.data.map((function(e,s){return Object(i.jsx)(i.Fragment,{children:e&&e.txt?e.link?Object(i.jsx)(n.b,{to:e.href,children:Object(i.jsx)("button",{children:Object(i.jsx)("p",{className:"font-weight-bolder mb-0",children:e.txt})})}):Object(i.jsx)("button",{onClick:function(){return e.func()},children:Object(i.jsx)("p",{className:"font-weight-bolder mb-0",children:e.txt})}):null})}))}),Object(i.jsxs)("div",{className:"Menu_Speeddail",children:[Object(i.jsx)("div",{className:"Menu_Speeddail_circle",onClick:function(){l()(".Menu_Speeddail .Speeddail_Grid").slideToggle(200),l()(".Menu_Speeddail .Menu_Speeddail_circle .las").hasClass("la-bars")?(l()(".Menu_Speeddail .Menu_Speeddail_circle .las").removeClass("la-bars"),l()(".Menu_Speeddail .Menu_Speeddail_circle .las").addClass("la-times")):(l()(".Menu_Speeddail .Menu_Speeddail_circle .las").removeClass("la-times"),l()(".Menu_Speeddail .Menu_Speeddail_circle .las").addClass("la-bars"))},children:Object(i.jsx)("i",{class:"las la-times"})}),Object(i.jsx)("div",{className:"Speeddail_Grid",children:e.data.map((function(e,s){return Object(i.jsx)(i.Fragment,{children:e&&e.txt?e.link?Object(i.jsx)(n.b,{to:e.href,children:Object(i.jsxs)("div",{children:[Object(i.jsx)("div",{className:"mb-1 Speeddail_Grid1 divs"+s,children:Object(i.jsx)("i",{className:e.icon})}),Object(i.jsx)("p",{children:e.txt})]},s)}):Object(i.jsxs)("div",{className:"clicks",onClick:function(){return e.func()},children:[Object(i.jsx)("div",{className:"mb-1 Speeddail_Grid1 divs"+s,children:Object(i.jsx)("i",{className:e.icon})}),Object(i.jsx)("p",{children:e.txt})]},s):null})}))})]})]}):null})})}},106:function(e,s,t){},388:function(e,s,t){},507:function(e,s,t){"use strict";t.r(s);var a=t(5),c=t(1),l=(t(388),t(88)),n=t.n(l),i=(t.p,t.p,t.p,t(105)),d=t(11),r=t(140),o=t(0);s.default=function(){var e=Object(c.useState)([]),s=Object(a.a)(e,2),t=s[0],l=s[1],j=Object(c.useState)([]),u=Object(a.a)(j,2),b=u[0],h=u[1],m=Object(c.useState)(""),x=Object(a.a)(m,2),O=x[0],p=x[1],v=Object(c.useState)([]),g=Object(a.a)(v,2),f=g[0],_=g[1],N=Object(c.useState)([]),B=Object(a.a)(N,2),C=B[0],y=B[1],k=Object(c.useState)([]),S=Object(a.a)(k,2),w=S[0],M=S[1],D=Object(c.useState)([]),V=Object(a.a)(D,2),E=V[0],I=V[1],T=Object(c.useState)(),F=Object(a.a)(T,2),G=F[0],L=(F[1],Object(c.useState)()),A=Object(a.a)(L,2),z=(A[0],A[1]),P=Object(c.useState)(),J=Object(a.a)(P,2),H=(J[0],J[1]);Object(c.useEffect)((function(){d.a.get("/allcourses").then((function(e){l(e.data)})).catch((function(e){console.log(e)})),n()(".BlackBoard").hide(0),I([{icon:"las la-video",txt:"Courses",link:!1,func:function(){return W()}},{icon:"las la-graduation-cap",txt:"Enrolled",link:!1,func:function(){return U()}},{icon:"las la-play",txt:"Play List",link:!1,func:function(){return q()}}])}),[]),Object(c.useEffect)((function(){"BlackBoard_Videos"===window.location.href.split("/").pop()&&(n()(".Menu_Grid").hide(0),n()(".Menu_Grid").parent(".Menu").css("padding","0")),n()(".BlackBoard_Videos1").hide(0)}),[]);var R=function(){var e=document.getElementById("playedVideo"),s=-1,t=0,a=0;function c(){s=(new Date).getTime()/1e3}function l(e){if(s>0){var c=(new Date).getTime()/1e3-s;s=-1,t+=c}document.getElementById("played").innerHTML=Math.round(t)+"",t>=a&&"ended"==e.type&&(document.getElementById("status").className="complete")}function n(){a=e.duration,document.getElementById("duration").appendChild(new Text(Math.round(a)+"")),console.log("Duration: ",a)}e.readyState>0?n.call(e):e.addEventListener("loadedmetadata",n),e.addEventListener("play",c),e.addEventListener("playing",c),e.addEventListener("ended",l),e.addEventListener("pause",l)},U=function(){var e=new FormData;e.append("empID",sessionStorage.getItem("EmpID")),d.a.post("/getempenrolledcourses",e).then((function(e){h(e.data),n()(".BlackBoard_Videos").hide(),n()(".BlackBoard").show(),n()(".Courses_Available").hide()})).catch((function(e){console.log(e)}))},W=function(){n()(".BlackBoard_Videos").hide(),n()(".BlackBoard").hide(),n()(".Courses_Available").show()},q=function(){n()(".Courses_Content").toggle(),n()(".BlackBoard_Videos1").hide()};return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(i.a,{data:E}),Object(o.jsx)("div",{className:"Courses_Available",children:Object(o.jsxs)("div",{className:"Courses_Available_Data",children:[Object(o.jsx)("h1",{className:"mb-5",children:"Black Board Courses"}),Object(o.jsx)("div",{className:"Courses_Cards",children:t.map((function(e,s){return Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("div",{className:"DIV border",style:{animationDelay:("0."+s).toString()+"s"},children:[Object(o.jsx)("div",{className:"IMAGE",style:{backgroundImage:"url('images/courses/"+e.course_image+"')"},children:Object(o.jsx)("div",{className:"Rect",children:Object(o.jsx)("p",{className:"mb-0 font-weight-bolder",children:"JOIN THIS COURSE"})})}),Object(o.jsx)("div",{className:"d-flex justify-content-center align-items-center w-100 Boxes",children:Object(o.jsx)("h4",{children:e.course_name})})]},s)})}))})]})}),Object(o.jsx)("div",{className:"BlackBoard",children:Object(o.jsx)("div",{className:"BlackBoard_Data",children:Object(o.jsxs)("div",{className:"Data",children:[Object(o.jsxs)("div",{className:"Data_Grid mb-5",children:[Object(o.jsx)("div",{children:Object(o.jsx)("h1",{className:"mb-0",children:"My Courses"})}),Object(o.jsxs)("div",{className:"d-flex align-items-center",children:[Object(o.jsx)("input",{type:"Search",className:"form-control",placeholder:"Search Courses"}),Object(o.jsx)("button",{className:"btn",children:Object(o.jsx)("i",{class:"las la-search"})})]})]}),Object(o.jsx)("div",{className:"Courses_Cards",children:b.map((function(e,s){return Object(o.jsxs)("div",{className:"DIV border",style:{animationDelay:("0."+s).toString()+"s"},children:[Object(o.jsx)("div",{className:"IMAGE",style:{backgroundImage:"url('images/courses/"+e.course_image+"')"},children:Object(o.jsx)("div",{className:"Circle",children:Object(o.jsx)("p",{className:"mb-0",children:e.seened})})}),Object(o.jsxs)("div",{className:"d-flex w-100 Boxes",children:[Object(o.jsxs)("div",{className:"d-flex justify-content-center align-items-center w-100 border-right py-4","data-tip":!0,"data-for":"registerTip"+s,children:[Object(o.jsxs)("div",{className:"d-block text-center",children:[Object(o.jsx)("i",{class:"lar la-calendar-alt"}),Object(o.jsx)("p",{className:"mb-0",children:"Enrolled"})]}),Object(o.jsxs)(r.a,{id:"registerTip"+s,place:"top",children:["Date: ",e.enrolled_date.substring(0,10)," ",Object(o.jsx)("br",{}),"time: ",e.enrolled_time]})]}),Object(o.jsx)("div",{className:"d-flex justify-content-center align-items-center w-100 py-4",onClick:function(){return function(e,s){var t=new FormData;t.append("courseID",e),d.a.post("/getempenrolledcoursevideos",t).then((function(e){for(var t=[],a=0;a<e.data.length;a++)t.push(e.data[a].category_name);y(t),_(e.data),p(b[s].course_name),n()(".BlackBoard_Videos").show(),n()(".BlackBoard").hide(),n()(".Courses_Available").hide(),n()(".divshow").hide()})).catch((function(e){console.log(e)}))}(e.course_id,s)},children:Object(o.jsxs)("div",{className:"d-block text-center",children:[Object(o.jsx)("i",{class:"las la-play"}),Object(o.jsx)("p",{className:"mb-0",children:"Continue Course"})]})})]})]},s)}))})]})})}),Object(o.jsxs)("div",{className:"BlackBoard_Videos",children:[Object(o.jsx)("div",{className:"Courses_Content",children:Object(o.jsxs)("div",{className:"Content_Div",children:[Object(o.jsxs)("div",{className:"Course_heading",children:[Object(o.jsx)("h4",{className:"font-weight-bolder",children:O}),Object(o.jsx)("div",{className:"progress mt-3",style:{height:"3px"},children:Object(o.jsx)("div",{className:"progress_bar",style:{width:G+"%",backgroundColor:"black"},role:"progressbar","aria-valuenow":"25","aria-valuemin":"0","aria-valuemax":"100"})}),Object(o.jsxs)("p",{className:"Views_per",children:[G,"%"]})]}),C.map((function(e,s){for(var t=[],a=0;a<f.length;a++)f[a].category_name===e&&null!==f[a].video&&t.push(1);return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsxs)("div",{className:"d-flex align-items-center justify-content-between py-4 px-2 status",style:{cursor:"pointer"},onClick:function(){return function(e,s){n()("."+e).slideToggle(),n()(".BlackBoard_Videos .Content_Div .las"+s).hasClass("la-angle-down")?(n()(".BlackBoard_Videos .Content_Div .las"+s).removeClass("la-angle-down"),n()(".BlackBoard_Videos .Content_Div .las"+s).addClass("la-angle-up")):(n()(".BlackBoard_Videos .Content_Div .las"+s).removeClass("la-angle-up"),n()(".BlackBoard_Videos .Content_Div .las"+s).addClass("la-angle-down"))}("divshow"+s,s)},children:[Object(o.jsx)("p",{className:"font-weight-bolder",children:e}),Object(o.jsxs)("p",{children:[0===t.length?"No video":1===t.length?t.length+" video":t.length+" videos"," ",Object(o.jsx)("i",{className:"las la-angle-down las"+s})]})]}),Object(o.jsx)("div",{className:"divshow divshow"+s,children:f.map((function(t,a){return Object(o.jsx)(o.Fragment,{children:t.category_name===e?null!==t.video?Object(o.jsxs)("div",{className:"Showdiv Showdiv"+a,onClick:function(){return function(e,s,t){z(e),H(s),M([f[s]]),R(),window.outerWidth<992?(n()(".BlackBoard_Videos1").show(),n()(".Courses_Content").toggle()):n()(".BlackBoard_Videos1").show()}(s,a,t.course_id)},children:[Object(o.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(o.jsxs)("p",{children:["Completed"===t.status?Object(o.jsx)("i",{class:"las la-check-circle mr-1",style:{fontSize:"25px"}}):Object(o.jsx)("i",{class:"las la-circle mr-1",style:{fontSize:"25px"}})," "]}),Object(o.jsxs)("div",{children:[" ",Object(o.jsx)("p",{children:t.video_name}),Object(o.jsxs)("div",{className:"d-flex align-items-center m-0 p-0",children:[Object(o.jsx)("p",{style:{fontSize:"12px"},children:"Video"}),Object(o.jsx)("i",{class:"las la-video pl-2",style:{fontSize:"15px"}})]})]})]}),Object(o.jsx)("div",{children:Object(o.jsx)("i",{class:"las la-long-arrow-alt-right",style:{fontSize:"25px",textAlign:"right"}})})]}):Object(o.jsx)("div",{className:"Showdiv Showdiv"+a,children:Object(o.jsx)("p",{className:"mb-0 py-3 pl-3",children:"No Video Found"})}):null})}))})]})}))]})}),Object(o.jsxs)("div",{className:"BlackBoard_Videos1",children:[Object(o.jsx)("div",{className:"d-flex align-items-center justify-content-center",style:{padding:"20px 0"},children:Object(o.jsx)("div",{className:"d-block text-center",children:Object(o.jsxs)("h1",{className:"font-weight-bolder",children:[" ",w.length>0?w[0].title:null," "]})})}),Object(o.jsx)("div",{className:"BlackBoard_Videos1_grid",children:Object(o.jsxs)("div",{children:[Object(o.jsx)("video",{id:"playedVideo",src:w.length>0?"images/courses/"+w[0].video:null,controls:"controls",autoPlay:"true",type:"video/mp4"}),Object(o.jsxs)("div",{id:"status",class:"incomplete",children:[Object(o.jsx)("span",{children:"Play status: "}),Object(o.jsx)("span",{class:"status complete",children:"COMPLETE"}),Object(o.jsx)("span",{class:"status incomplete",children:"INCOMPLETE"}),Object(o.jsx)("br",{})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("span",{id:"played",children:"0 "})," seconds out of ",Object(o.jsx)("span",{id:"duration",children:" "})," seconds. (only updates when the video pauses)"]})]})}),Object(o.jsx)("div",{className:"d-flex align-items-center justify-content-end mt-4"})]})]})]})}}}]);