(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[33],{101:function(e,t,s){},105:function(e,t,s){"use strict";var n=s(1),i=(s(106),s(88)),c=s.n(i),a=s(17),l=s(0);t.a=function(e){Object(n.useEffect)((function(){c()(".Speeddail_Grid").slideToggle(0)}),[]);return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("div",{className:"Menu",children:e.data.length>0?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{className:"Menu_Grid",children:e.data.map((function(e,t){return Object(l.jsx)(l.Fragment,{children:e&&e.txt?e.link?Object(l.jsx)(a.b,{to:e.href,children:Object(l.jsx)("button",{children:Object(l.jsx)("p",{className:"font-weight-bolder mb-0",children:e.txt})})}):Object(l.jsx)("button",{onClick:function(){return e.func()},children:Object(l.jsx)("p",{className:"font-weight-bolder mb-0",children:e.txt})}):null})}))}),Object(l.jsxs)("div",{className:"Menu_Speeddail",children:[Object(l.jsx)("div",{className:"Menu_Speeddail_circle",onClick:function(){c()(".Menu_Speeddail .Speeddail_Grid").slideToggle(200),c()(".Menu_Speeddail .Menu_Speeddail_circle .las").hasClass("la-bars")?(c()(".Menu_Speeddail .Menu_Speeddail_circle .las").removeClass("la-bars"),c()(".Menu_Speeddail .Menu_Speeddail_circle .las").addClass("la-times")):(c()(".Menu_Speeddail .Menu_Speeddail_circle .las").removeClass("la-times"),c()(".Menu_Speeddail .Menu_Speeddail_circle .las").addClass("la-bars"))},children:Object(l.jsx)("i",{class:"las la-times"})}),Object(l.jsx)("div",{className:"Speeddail_Grid",children:e.data.map((function(e,t){return Object(l.jsx)(l.Fragment,{children:e&&e.txt?e.link?Object(l.jsx)(a.b,{to:e.href,children:Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"mb-1 Speeddail_Grid1 divs"+t,children:Object(l.jsx)("i",{className:e.icon})}),Object(l.jsx)("p",{children:e.txt})]},t)}):Object(l.jsxs)("div",{className:"clicks",onClick:function(){return e.func()},children:[Object(l.jsx)("div",{className:"mb-1 Speeddail_Grid1 divs"+t,children:Object(l.jsx)("i",{className:e.icon})}),Object(l.jsx)("p",{children:e.txt})]},t):null})}))})]})]}):null})})}},106:function(e,t,s){},107:function(e,t,s){"use strict";s.d(t,"a",(function(){return c}));var n=s(19);var i=s(25);function c(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||Object(i.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},375:function(e,t,s){"use strict";s.r(t);var n=s(107),i=s(5),c=s(1),a=(s(376),s(88)),l=s.n(a),d=s(11),r=s(98),j=s(105),o=s(90),m=(s(91),s(0));t.default=function(){var e=Object(c.useState)(!1),t=Object(i.a)(e,2),s=t[0],a=t[1],b=Object(c.useState)({value:""}),u=Object(i.a)(b,2),h=u[0],x=u[1],O=Object(c.useState)([]),g=Object(i.a)(O,2),p=g[0],f=g[1],v=Object(c.useState)(!1),_=Object(i.a)(v,2),N=_[0],y=_[1],S=Object(c.useState)(),w=Object(i.a)(S,2),D=w[0],G=(w[1],Object(c.useState)([])),k=Object(i.a)(G,2),M=k[0],C=k[1],R=Object(c.useState)([]),F=Object(i.a)(R,2),L=F[0],I=F[1],T=Object(c.useState)([]),E=Object(i.a)(T,2),B=E[0],A=E[1],q=Object(c.useState)([]),z=Object(i.a)(q,2),H=z[0],P=z[1],J=Object(c.useState)([]),U=Object(i.a)(J,2),V=U[0],W=U[1],K=Object(c.useState)([]),Q=Object(i.a)(K,2),X=Q[0],Y=Q[1];Object(c.useEffect)((function(){l()(".shortDetails").slideUp(0),l()(".Leave_Application_Details").attr("id","getallempleaves"),l()(".Details_Grid_Right").hide(),l()(".Grid_Right2").hide(),Z()}),[]);var Z=function(){d.a.get("/getallguests").then((function(e){C(e.data)})).catch((function(e){o.b.dark(e.toString(),{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}))},$=function(e){},ee=function(){l()(".Details_Grid_Left").show(),l()(".Details_Grid_Right").hide()},te=function(){l()(".Details_Grid_Left").hide(),l()(".Details_Grid_Right").show(),l()(".Grid_Right2").hide(),l()(".Grid_Right1").show()},se=function(e,t){var s=new FormData;s.append("empID",t),s.append("guestID",e),d.a.post("/getthatempguestallmeetings",s).then((function(e){W(e.data),p.length>1&&f([p.pop()]),f([].concat(Object(n.a)(p),[{leaveType:"Meetings",maxLeave:e.data.length}])),window.outerWidth<992&&(l()(".Grid_Right1").hide(),l()(".Grid_Right2").show(),Y([{icon:"las la-users",txt:"Guests",link:!1,func:function(){return ee()}},{icon:"las la-long-arrow-alt-left",txt:"Back",link:!1,func:function(){return te()}}]))})).catch((function(e){console.log(e)}))};return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(r.a,{show:N,Hide:function(){y(!N)},content:D}),Object(m.jsx)(j.a,{data:X}),Object(m.jsx)("div",{className:"GuestsList",children:Object(m.jsxs)("div",{className:"GuestsList_Grid",children:[Object(m.jsxs)("div",{className:"Details_Grid_Left",children:[Object(m.jsxs)("div",{className:"DIV1 searchbarDiv",children:[Object(m.jsx)("input",{type:"text",value:h.value,placeholder:"Search Keywords",className:"form-control Menusearch",onChange:function(e){x({value:e.target.value}),l()(".Menusearch").val().length>0?(a(!0),$(e.target.value)):($(e.target.value),a(!1))}}),s?Object(m.jsx)("i",{className:"las la-times",onClick:function(){x({value:""}),a(!1)}}):Object(m.jsx)("i",{className:"las la-search"})]}),Object(m.jsx)("div",{className:"guest_requests",children:0===M.length?Object(m.jsx)("h3",{children:"No Guest Found"}):M.map((function(e,t){return Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)("div",{className:"requests",style:{animationDelay:("0."+t).toString()+"s"},children:[Object(m.jsx)("div",{onClick:function(){return function(e,t){var s=new FormData;s.append("empID",t),d.a.post("/getthatemployeelastguest",s).then((function(t){P(t.data),l()(".shortDetails").slideUp(500),l()("."+e).slideToggle(500)})).catch((function(e){console.log(e)}))}("shortDetails"+t,e.emp_id)},children:Object(m.jsx)("div",{className:"d-flex align-items-center justify-content-between",children:Object(m.jsxs)("div",{className:"d-flex align-items-center",children:[Object(m.jsx)("img",{src:"images/employees/"+e.emp_image,className:"rounded-circle mr-2",alt:"Employee Img",width:"40",height:"40"}),Object(m.jsxs)("div",{children:[Object(m.jsx)("p",{className:"mb-0 font-weight-bold",children:e.name}),Object(m.jsxs)("p",{className:"mb-0",children:[e.designation_name," at ",e.company_name,", ",e.location_name]})]})]})})}),Object(m.jsx)("div",{className:"text-justify mt-2 shortDetails shortDetails"+t,children:0===H.length?null:H.map((function(e,s){var n=new Date(e.meeting_date.substring(0,10));return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[Object(m.jsxs)("div",{className:"d-flex align-items-center",children:[Object(m.jsx)("img",{src:"images/guests/"+e.guest_image,className:"rounded-circle mr-2",alt:"Employee Img",width:"40",height:"40"}),Object(m.jsxs)("div",{children:[Object(m.jsx)("p",{className:"mb-0 font-weight-bold",children:e.guest_name}),Object(m.jsx)("p",{className:"mb-0",children:e.guest_phone})]})]}),Object(m.jsx)("div",{className:"d-flex align-items-center text-right",children:Object(m.jsxs)("div",{children:[Object(m.jsx)("p",{className:"mb-0 font-weight-bold",children:n?n.toDateString():null}),Object(m.jsx)("p",{className:"mb-0",children:e.meeting_time})]})})]},s),Object(m.jsx)("button",{className:"btn btn-sm mt-2 d-block ml-auto btn-outline-dark",onClick:function(){return function(e,t){A([]),I([]),A([M[e]]);var s=new FormData;s.append("empID",t),d.a.post("/getthatemployeeallguests",s).then((function(e){I(e.data),f([{leaveType:"Guests Met",maxLeave:e.data.length}]),window.outerWidth<992&&(te(),Y([{icon:"las la-users",txt:"Guests",link:!1,func:function(){return ee()}}]))})).catch((function(e){console.log(e)}))}(t,e.emp_id)},children:"View Details"})]})}))})]})})}))})]}),0===B.length?Object(m.jsx)("div",{}):B.map((function(e,t){return Object(m.jsxs)("div",{className:"Details_Grid_Right",children:[Object(m.jsxs)("div",{className:"Grid_Right1",style:{animationDelay:("0."+t).toString()+"s"},children:[Object(m.jsxs)("div",{className:"Leave_Emp_Info",children:[Object(m.jsxs)("div",{className:"d-flex align-items-center pb-2",children:[Object(m.jsx)("div",{children:Object(m.jsx)("img",{src:"images/employees/"+e.emp_image,alt:"DP"})}),Object(m.jsxs)("div",{className:"ml-3 py-2",children:[Object(m.jsx)("p",{className:"font-weight-bolder mb-0",children:e.name}),Object(m.jsx)("p",{className:"mb-0",children:e.designation_name+" at "+e.company_name+", "+e.location_name})]})]}),Object(m.jsxs)("div",{className:"d-flex justify-content-between py-2",style:{fontSize:"13px"},children:[Object(m.jsx)("p",{className:"mb-0",children:"Employee Code"}),Object(m.jsx)("p",{className:"font-weight-bolder mb-0",children:e.emp_id})]}),Object(m.jsxs)("div",{className:"d-flex justify-content-between py-2",style:{fontSize:"13px"},children:[Object(m.jsx)("p",{className:"mb-0",children:"Email"}),Object(m.jsx)("p",{className:"font-weight-bolder mb-0",children:e.email})]}),Object(m.jsxs)("div",{className:"d-flex justify-content-between py-2",style:{fontSize:"13px"},children:[Object(m.jsx)("p",{className:"mb-0",children:"Phone Number"}),Object(m.jsx)("p",{className:"font-weight-bolder mb-0",children:e.cell})]})]}),Object(m.jsx)("div",{className:"Emp_Leave_Details",children:0===L.length?null:L.map((function(e,t){return Object(m.jsx)(m.Fragment,{children:Object(m.jsx)("div",{onClick:function(){return se(e.id,e.emp_id)},className:"requests",style:{animationDelay:("0."+t).toString()+"s"},children:Object(m.jsx)("div",{className:"text-justify",children:Object(m.jsx)("div",{className:"d-flex align-items-center justify-content-between",children:Object(m.jsxs)("div",{className:"d-flex align-items-center",children:[Object(m.jsx)("img",{src:"images/guests/"+e.guest_image,className:"rounded-circle mr-2",alt:"Employee Img",width:"40",height:"40"}),Object(m.jsxs)("div",{children:[Object(m.jsx)("p",{className:"mb-0 font-weight-bold",children:e.guest_name}),Object(m.jsx)("p",{className:"mb-0",children:e.guest_phone})]})]})})})})})}))})]}),Object(m.jsxs)("div",{className:"Grid_Right2",children:[Object(m.jsx)("div",{className:"Right2_TopBox mb-3",children:0===p.length?null:p.map((function(e,t){return Object(m.jsx)("div",{style:{animationDelay:("0."+t).toString()+"s"},className:"TopBox_Leave TopBox_Leave"+t,children:Object(m.jsxs)("div",{children:[Object(m.jsx)("p",{children:e.maxLeave}),Object(m.jsx)("p",{children:e.leaveType})]})},t)}))}),0===V.length?null:Object(m.jsx)("div",{className:"Right2_BottomBox",style:{animationDelay:("0."+t).toString()+"s"},children:Object(m.jsxs)("div",{className:"BottomBox_info",children:[Object(m.jsx)("div",{}),Object(m.jsx)("div",{className:"font-weight-bolder",children:"Meeting Time"}),Object(m.jsx)("div",{className:"font-weight-bolder",children:"Meeting Date"}),V.map((function(e,t){return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("div",{}),Object(m.jsx)("div",{children:e.meeting_time}),Object(m.jsx)("div",{children:e.meeting_date.substring(0,10)})]})}))]})})]})]},t)}))]})})]})}},376:function(e,t,s){},98:function(e,t,s){"use strict";s(1),s(101);var n=s(0);t.a=function(e){return Object(n.jsx)(n.Fragment,{children:Object(n.jsxs)("div",{className:"Attandence_Request_Div",style:{display:e.show?"flex":"none"},children:[Object(n.jsx)("div",{className:"dark",onClick:e.Hide}),Object(n.jsx)("div",{style:{animationDelay:"0.1".toString()+"s"},className:e.show?"Attandence_Request_Div_Content Attandence_Request_Div_Content2":"Attandence_Request_Div_Content",children:e.content})]})})}}}]);