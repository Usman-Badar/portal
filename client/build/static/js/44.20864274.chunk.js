(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[44],{550:function(e,t,n){"use strict";n.r(t);var s=n(24),a=n(9),c=n(4),i=n(1),r=(n(551),n(3)),l=n(17),o=n(79),d=n.n(o),j=n(85),m=(n(86),n(11)),u=n(94),b=n(25),_=n(93),h=n(0);t.default=function(){var e=Object(r.g)(),t=Object(b.c)((function(e){return e.EmpAuth.Relations})),n=Object(b.c)((function(e){return e.EmpAuth.EmployeeData})),o=Object(i.useState)([]),k=Object(c.a)(o,2),f=k[0],g=k[1],v=Object(i.useState)(!1),N=Object(c.a)(v,2),q=N[0],y=N[1],w=Object(i.useState)(!1),S=Object(c.a)(w,2),C=S[0],D=S[1],I=Object(i.useState)(!1),R=Object(c.a)(I,2),A=R[0],T=R[1],E=Object(i.useState)([]),F=Object(c.a)(E,2),B=F[0],M=F[1],H=Object(i.useState)({date:(new Date).toString(),reason:"",submit_to:"",request_type:"",request_for:""}),L=Object(c.a)(H,2),V=L[0],J=L[1],U=Object(i.useState)(!1),P=Object(c.a)(U,2),Y=P[0],z=P[1],G=Object(i.useState)(null),K=Object(c.a)(G,2),Q=K[0],W=K[1],X=Object(i.useState)(!1),Z=Object(c.a)(X,2),$=Z[0],ee=Z[1],te=Object(i.useState)(),ne=Object(c.a)(te,2),se=ne[0],ae=ne[1],ce=Object(i.useState)({time_in:"",time_out:"",break_in:"",break_out:""}),ie=Object(c.a)(ce,2),re=ie[0],le=ie[1],oe=Object(i.useState)({time_in:"",time_out:"",break_in:"",break_out:"",time_in_check:!1,time_out_check:!1,break_in_check:!1,break_out_check:!1}),de=Object(c.a)(oe,2),je=de[0],me=de[1],ue=Object(i.useState)({emp_info:{},request_info:{},reviews:[]}),be=Object(c.a)(ue,2),_e=be[0],he=be[1],pe=Object(i.useState)({request_action:"",request_send_to:""}),Oe=Object(c.a)(pe,2),xe=Oe[0],ke=Oe[1],fe=Object(i.useState)({mark_time_in:!1,mark_time_out:!1,mark_break_in:!1,mark_break_out:!1}),ge=Object(c.a)(fe,2),ve=ge[0],Ne=ge[1],qe=function(e){var t,n,c=e.target,i=c.value,r=c.name,l=c.checked;r.includes("check")?(n=l,l?d()("#"+r).prop("disabled",!0).val(""):d()("#"+r).prop("disabled",!1)):n=i,t=Object(a.a)(Object(a.a)({},je),{},Object(s.a)({},r,n)),me(t)};Object(i.useEffect)((function(){var e="time_in";ve.mark_time_in?ve.mark_time_out?ve.mark_break_in?ve.mark_break_out||(e="break_out"):e="break_in":e="time_out":e="time_in";var t=Object(a.a)(Object(a.a)({},je),{},Object(s.a)({},e,""));me(t)}),[ve.mark_time_in,ve.mark_time_out,ve.mark_break_in,ve.mark_break_out]),Object(i.useEffect)((function(){u.a.on("newattendancerequest",(function(){y(!q)})),ye()}),[]),Object(i.useEffect)((function(){"update"===V.request_type||"insert"===V.request_type?we():(Ne({mark_time_in:!1,mark_time_out:!1,mark_break_in:!1,mark_break_out:!1}),me({time_in:"",time_out:"",break_in:"",break_out:"",time_in_check:!1,time_out_check:!1,break_in_check:!1,break_out_check:!1}))}),[V.request_type,V.date]);var ye=function(){m.a.get("/get_enabled_att_request_dates").then((function(e){M(e.data)})).catch((function(e){console.log(e)}))},we=function(){m.a.post("/getemptimein",{emp_id:sessionStorage.getItem("EmpID"),date_time:V.date}).then((function(e){e.data.length>0?(le(e.data[0]),me(Object(a.a)(Object(a.a)({},je),{},{time_in:null===e.data[0].time_in?null:e.data[0].time_in,time_out:null===e.data[0].time_out?null:e.data[0].time_out,break_in:null===e.data[0].break_in?null:e.data[0].break_in,break_out:null===e.data[0].break_out?null:e.data[0].break_out})),T(!0)):T(!1)})).catch((function(e){console.log(e)}))};Object(i.useEffect)((function(){m.a.post("/getallattendancerequests",{emp_id:sessionStorage.getItem("EmpID")}).then((function(e){g(e.data)})).catch((function(e){console.log(e)}))}),[q]),Object(i.useEffect)((function(){var e=parseInt(window.location.href.split("/").pop().split("_").shift());isNaN(e)||Se(e),"new"===window.location.href.split("/").pop()&&D(!0)}),[window.location.href.split("/").pop()]),Object(i.useEffect)((function(){_e.reviews[0]&&Re(_e.reviews[0])}),[_e.reviews.length]);var Se=function(e){m.a.post("/getattendancerequestdetails",{request_id:e}).then((function(e){he({emp_info:e.data[2][0],request_info:e.data[0][0],reviews:e.data[1]}),z(!0),D(!1)})).catch((function(e){console.log(e)}))},Ce=new Date,De=function(e){var t=e.target,n=t.value,c=t.name,i={};i="mark"===n||"approve"===n||"reject "===n?Object(a.a)(Object(a.a)({},xe),{},Object(s.a)({request_send_to:""},c,n)):Object(a.a)(Object(a.a)({},xe),{},Object(s.a)({},c,n)),ke(i)},Ie=function(t,n,s){t.preventDefault();var a=document.getElementById("record_status");m.a.post("/performactionforattrequest",{request_id:s,id:n,emp_id:sessionStorage.getItem("EmpID"),date_time:(new Date).toString(),status:xe.request_action,forward_to:xe.request_send_to,remarks:t.target.remarks.value,time_in:je.time_in,time_out:je.time_out,break_in:je.break_in,break_out:je.break_out,time_in_check:je.time_in_check,time_out_check:je.time_out_check,break_in_check:je.break_in_check,break_out_check:je.break_out_check,request_type:_e.request_info.request_type,request_by:_e.reviews[0].request_by,record_date:new Date(_e.request_info.date).toString(),record_status:a?a.value:null}).then((function(){he({emp_info:{},request_info:{},reviews:[]}),ke({request_action:"",request_send_to:""}),z(!1),D(!1),ee(!1);if("null"!==xe.request_send_to&&""!==xe.request_send_to&&null!==xe.request_send_to){var t=new FormData;t.append("eventID",4),t.append("receiverID",xe.request_send_to),t.append("senderID",sessionStorage.getItem("EmpID")),t.append("Title",sessionStorage.getItem("name")),t.append("NotificationBody",sessionStorage.getItem("name")+" put forward an attendance request on the portal."),m.a.post("/newnotification",t).then((function(){m.a.post("/sendmail",t).then((function(){}))}))}var n=new FormData;n.append("eventID",4),n.append("receiverID",_e.reviews[0].request_by),n.append("senderID",sessionStorage.getItem("EmpID")),n.append("Title",sessionStorage.getItem("name")),n.append("NotificationBody","Your attendance request on the portal is now "+xe.request_action+"."),m.a.post("/newnotification",n).then((function(){m.a.post("/sendmail",n).then((function(){}))})),e.replace("/attendance_request")})).catch((function(e){console.log(e)}))},Re=function(e){me(Object(a.a)(Object(a.a)({},je),{},{time_in:e.time_in,time_out:e.time_out,break_in:e.break_in,break_out:e.break_out})),setTimeout((function(){null!==e.time_in&&"null"!==e.time_in||(d()("#time_in_check").prop("disabled",!0),d()("input[type=checkbox][name=time_in_check]").prop("checked",!0)),null!==e.time_out&&"null"!==e.time_out||(d()("#time_out_check").prop("disabled",!0),d()("input[type=checkbox][name=time_out_check]").prop("checked",!0)),null!==e.break_in&&"null"!==e.break_in||(d()("#break_in_check").prop("disabled",!0),d()("input[type=checkbox][name=break_in_check]").prop("checked",!0)),null!==e.break_out&&"null"!==e.break_out||(d()("#break_out_check").prop("disabled",!0),d()("input[type=checkbox][name=break_out_check]").prop("checked",!0))}),150)};return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(_.a,{show:$,Hide:function(){ee(!$)},content:se}),Object(h.jsxs)("div",{className:"Attandence_Request",children:[Object(h.jsxs)("div",{className:"Attandence_Request_Top",children:[Object(h.jsx)("div",{className:"Attandence_Request_Top_left",children:Object(h.jsx)("div",{className:"dropdown_filter",children:Object(h.jsx)("p",{className:"font-weight-bold",children:"Attandence Requests"})})}),Object(h.jsxs)("div",{className:"Attandence_Request_Top_right",children:[_e.emp_info.name?f.map((function(e){if(parseInt(window.location.href.split("/").pop().split("_").pop())===e.id){var s=function(e){return n.access&&a()&&JSON.parse(n.access).includes(101)&&e.push(Object(h.jsx)("option",{value:"mark",children:"Mark"})),e},a=function(){for(var e=!0,t=0;t<_e.reviews.length;t++)"cancel"!==_e.reviews[t].request_status&&"mark"!==_e.reviews[t].request_status&&"mark_&_forward"!==_e.reviews[t].request_status||(e=!1);return e},c=[];return parseInt(e.request_by)===parseInt(sessionStorage.getItem("EmpID"))?a()&&(c.push(Object(h.jsx)("option",{value:"cancel",children:"Cancel"})),s(c)):"sent"===e.request_status?(s(c),c.push(Object(h.jsx)("option",{value:"reject",children:"Reject"}))):"approve & forward"===e.request_status||"approve"===e.request_status?s(c):e.request_status,Object(h.jsxs)(h.Fragment,{children:["mark_&_forward"===e.request_status?null:Object(h.jsxs)("select",{name:"request_action",id:"",className:"form-control col-sm-3 mr-2 form-control-sm request_action",onChange:De,children:[Object(h.jsx)("option",{value:"",children:"select"}),c]}),"approve_&_forward"===xe.request_action||"reject_&_forward"===xe.request_action||"mark_&_forward"===xe.request_action?Object(h.jsxs)("select",{name:"request_send_to",id:"",className:"form-control col-sm-3 mr-2 form-control-sm request_send_to",onChange:De,children:[Object(h.jsx)("option",{value:"",children:"select"}),t.map((function(e,t){var n;return("all"===e.category||e.category.includes("attendance_request"))&&(n=Object(h.jsxs)("option",{value:e.sr,children:[" ",e.name," "]},t)),n}))]}):null,""===xe.request_action?null:0!==xe.request_send_to||"approve_&_forward"!==xe.request_action&&"reject_&_forward"!==xe.request_action?Object(h.jsx)("div",{onClick:function(){return t=e.id,n=e.request_id,ae(Object(h.jsxs)("form",{className:"w-100 text-right",onSubmit:function(e){return Ie(e,t,n)},children:[Object(h.jsx)("textarea",{name:"remarks",className:"form-control",placeholder:"remarks",required:!0,minLength:"10"}),Object(h.jsx)("button",{className:"btn btn-outline-dark btn-sm mt-2",children:"submit"})]})),void ee(!0);var t,n},className:"btn sendbutton",children:"Send"}):null]})}return!1})):null,Object(h.jsxs)(l.c,{to:"/attendance_request/new",className:"btn New_button",children:[" ",Object(h.jsx)("i",{class:"las la-plus"})," ",Object(h.jsx)("p",{children:"New"})]})]})]}),C?Object(h.jsx)(O,{OnChangeHandler:function(e){var t,n=e.target,c=n.value,i=n.name;"request_type"===i?t=Object(a.a)(Object(a.a)({},V),{},Object(s.a)({new_time:"",current_time:""},i,c)):"c"===i||(t=Object(a.a)(Object(a.a)({},V),{},Object(s.a)({},i,c))),J(t)},OnTimeChange:qe,onChangeCheck:function(e){var t,n=e.target,c=n.name;n.checked?(d()("#"+c).prop("disabled",!0).val(""),t=null):(d()("#"+c).prop("disabled",!1),t="");var i=Object(a.a)(Object(a.a)({},je),{},Object(s.a)({},c,t));me(i)},onUploadSnap:function(e){var t=new FileReader;t.onload=function(){2===t.readyState&&W(t.result)},t.readAsDataURL(e.target.files[0])},onMarkChange:function(e){var t=e.target,n=t.checked,c=t.name;c.split("_").shift();var i=Object(a.a)(Object(a.a)({},ve),{},Object(s.a)({},c,n));Ne(i)},closebutton:function(){W(null)},Submit:function(t){if(t.preventDefault(),function(){var e=!0;return"insert"===V.request_type&&A&&(alert("Record of this date is already exist. Select request type [Update]"),e=!1),"insert"!==V.request_type||ve.mark_time_in||(alert("Iime IN must be checked when request type is [Insert]"),e=!1),"insert"!==V.request_type||!ve.mark_time_in||""!==je.time_in&&null!==je.time_in||(alert("Iime IN must be entered when request type is [INSERT]"),e=!1),ve.mark_time_in&&ve.mark_time_out&&je.time_out<je.time_in&&(alert("time_out should be greater than time_in"),e=!1),ve.mark_break_in&&ve.mark_break_out&&je.break_out<je.break_in&&(alert("break_out should be greater than break_in"),e=!1),ve.mark_time_out&&ve.mark_break_out&&je.break_out>je.time_out&&(alert("break_out should be less than time_out"),e=!1),ve.mark_time_out&&ve.mark_break_in&&je.break_in>je.time_out&&(alert("break_in should be less than time_out"),e=!1),ve.mark_time_in&&ve.mark_break_in&&je.break_in<je.time_in&&(alert("break_in should be greater than time_in"),e=!1),ve.mark_time_in&&ve.mark_break_out&&je.break_out<je.time_in&&(alert("break_out should be greater than time_in"),e=!1),e}()){d()("button[type=submit]").prop("disabled",!0);var n=new FormData;n.append("time_in",je.time_in),n.append("time_out",je.time_out),n.append("break_in",je.break_in),n.append("break_out",je.break_out),n.append("date_time",(new Date).toString()),n.append("request_by",sessionStorage.getItem("EmpID")),n.append("request_to",V.submit_to),n.append("request_type",V.request_type),n.append("reason",V.reason),n.append("record_date",V.date),n.append("snapshot",Q),n.append("prev_attendance",JSON.stringify(re)),m.a.post("/newattendancerequest",n).then((function(){var t,n;t="Request sent",n="top-center",j.b.dark(t.toString(),{position:n,autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),D(!1),J({date:"",reason:"",submit_to:"",request_type:"",request_for:"",current_time:"",new_time:""}),z(!1),W(null),le({time_in:"",time_out:"",break_in:"",break_out:""}),me({time_in:"",time_out:"",break_in:"",break_out:"",time_in_check:!1,time_out_check:!1,break_in_check:!1,break_out_check:!1}),d()("a[type=reset]").trigger("click");var s=new FormData;s.append("eventID",4),s.append("receiverID",V.submit_to),s.append("senderID",sessionStorage.getItem("EmpID")),s.append("Title",sessionStorage.getItem("name")),s.append("NotificationBody",sessionStorage.getItem("name")+" sent an attendance request on the portal."),m.a.post("/newnotification",s).then((function(){m.a.post("/sendmail",s).then((function(){}))})),setTimeout((function(){u.a.emit("NewNotification",V.submit_to),u.a.emit("newattendancerequest",""),e.replace("/attendance_request")}),500)})).catch((function(e){console.log(e)}))}},Dates:B,Form:V,date:Ce,Attendance:re,SnapShot:Q,Relations:t,Marking:ve,NewAttendance:je}):Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("div",{className:"Attandence_Request_breadcrums",children:Object(h.jsxs)("div",{className:"d-flex",children:[Object(h.jsx)("p",{children:"Total Requests :"}),Object(h.jsx)("p",{className:"ml-2",style:{color:"gray"},children:f.length})]})}),Y?Object(h.jsx)(x,{RequestList:f,RequestDetails:_e,NewAttendance:je,AccessControls:n,buttonslideSnapeshot:function(){"Hide"===d()(".buttonslideSnapeshot").html()?d()(".buttonslideSnapeshot").html("Show"):d()(".buttonslideSnapeshot").html("Hide"),d()(".slideSnapeshot").slideToggle()},OnTimeChange:qe}):Object(h.jsx)(p,{View:p,RequestList:f})]})]})]})};var p=function(e){var t=e.RequestList;return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("div",{children:Object(h.jsxs)("table",{className:"table table-sm table-hover",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{}),Object(h.jsx)("th",{}),Object(h.jsx)("th",{children:"Request By"}),Object(h.jsx)("th",{className:"column-lg",children:"Date"}),Object(h.jsx)("th",{children:"Status"})]})}),Object(h.jsx)("tbody",{children:t.map((function(e,t){var n=new Date(e.request_date),s=Object(h.jsx)("p",{className:"newBadge dontSHow"});return n&&(new Date).getDate()===n.getDate()&&(s=Object(h.jsx)("p",{className:"newBadge",children:"new"})),Object(h.jsxs)("tr",{children:[s,Object(h.jsxs)("td",{children:[" ",Object(h.jsxs)(l.c,{to:"/attendance_request/"+e.request_id+"_"+e.id,children:[" ",Object(h.jsx)("img",{className:"d-block mx-auto",src:"images/employees/"+e.emp_image,alt:""})]}),"  "]}),Object(h.jsxs)("td",{className:"column-sm",children:[Object(h.jsxs)(l.c,{to:"/attendance_request/"+e.request_id+"_"+e.id,children:[" ",e.sender_name]}),Object(h.jsxs)(l.c,{to:"/attendance_request/"+e.request_id+"_"+e.id,children:[" ",n?n.toDateString():null]})]}),Object(h.jsxs)("td",{className:"column-lg",children:[" ",Object(h.jsxs)(l.c,{to:"/attendance_request/"+e.request_id+"_"+e.id,children:[" ",e.sender_name]}),"  "]}),Object(h.jsxs)("td",{className:"column-lg",children:[" ",Object(h.jsxs)(l.c,{to:"/attendance_request/"+e.request_id+"_"+e.id,children:[" ",n?n.toDateString():null]}),"  "]}),Object(h.jsxs)("td",{children:[" ",Object(h.jsxs)(l.c,{style:{backgroundColor:"var(--black)"},className:"text-white px-3 rounded-pill",to:"/attendance_request/"+e.request_id+"_"+e.id,children:[" ",e.request_status]}),"  "]})]},t)}))})]})})})},O=function(e){var t=Object(i.useState)({time_in:"",time_out:"",break_in:"",break_out:""}),n=Object(c.a)(t,2),s=n[0],a=n[1];return Object(i.useEffect)((function(){a(e.Attendance)}),[e.Attendance]),Object(h.jsxs)("form",{className:"Attandence_Request_form",onSubmit:e.Submit,children:[Object(h.jsx)("h5",{className:"font-weight-bold",children:"Add New Request"}),Object(h.jsxs)("div",{className:"Attandence_Request_form_div",children:[Object(h.jsxs)("div",{children:[Object(h.jsx)("p",{children:"Request type"}),Object(h.jsxs)("select",{id:"",className:"form-control form-control-sm",onChange:e.OnChangeHandler,name:"request_type",required:!0,children:[Object(h.jsx)("option",{value:"",children:"select"}),Object(h.jsx)("option",{value:"update",children:"Update"}),Object(h.jsx)("option",{value:"insert",children:"Insert"})]})]}),Object(h.jsxs)("div",{className:"my-3",children:[Object(h.jsx)("p",{children:"Date"}),Object(h.jsxs)("select",{id:"",className:"form-control form-control-sm",onChange:e.OnChangeHandler,name:"date",required:!0,children:[Object(h.jsx)("option",{value:(new Date).toString(),children:(new Date).toDateString()}),e.Dates.map((function(e){return Object(h.jsx)("option",{value:new Date(e.date).toString(),children:new Date(e.date).toDateString()})}))]})]}),""===e.Form.request_type?null:Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("div",{className:"d-flex align-items-center",children:[Object(h.jsx)("input",{type:"checkbox",name:"mark_time_in",onChange:e.onMarkChange})," ",Object(h.jsx)("span",{className:"pl-2",children:"Mark time in"})]}),Object(h.jsxs)("div",{className:"d-flex align-items-center",children:[Object(h.jsx)("input",{type:"checkbox",name:"mark_time_out",onChange:e.onMarkChange})," ",Object(h.jsx)("span",{className:"pl-2",children:"Mark time out"})]}),Object(h.jsxs)("div",{className:"d-flex align-items-center",children:[Object(h.jsx)("input",{type:"checkbox",name:"mark_break_in",onChange:e.onMarkChange})," ",Object(h.jsx)("span",{className:"pl-2",children:"Mark break in"})]}),Object(h.jsxs)("div",{className:"d-flex align-items-center",children:[Object(h.jsx)("input",{type:"checkbox",name:"mark_break_out",onChange:e.onMarkChange})," ",Object(h.jsx)("span",{className:"pl-2",children:"Mark break out"})]})]}),e.Marking.mark_time_in?Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{className:"d-flex",children:[Object(h.jsxs)("div",{className:"w-100 mr-1",children:[Object(h.jsx)("p",{children:"Time In"}),Object(h.jsx)("input",{type:"time",disabled:!0,className:"form-control form-control-sm",name:"time_in",value:s.time_in})]}),Object(h.jsxs)("div",{className:"w-100 ml-1",children:[Object(h.jsx)("p",{children:"New Time In"}),Object(h.jsx)("input",{type:"time",className:"form-control form-control-sm",onChange:e.OnTimeChange,value:e.NewAttendance.time_in,name:"time_in",id:"time_in"})]})]}),Object(h.jsxs)("div",{className:"d-flex justify-content-end align-items-center mt-1",style:{marginRight:"212px"},children:[Object(h.jsx)("input",{type:"checkbox",name:"time_in",onChange:e.onChangeCheck}),Object(h.jsx)("label",{for:"time_in",children:" Set to Null "})]})]}):null,e.Marking.mark_time_out?Object(h.jsxs)("div",{className:"my-2",children:[Object(h.jsxs)("div",{className:"d-flex",children:[Object(h.jsxs)("div",{className:"w-100 mr-1",children:[Object(h.jsx)("p",{children:"Time Out"}),Object(h.jsx)("input",{type:"time",disabled:!0,className:"form-control form-control-sm",name:"time_out",value:s.time_out})]}),Object(h.jsxs)("div",{className:"w-100 ml-1",children:[Object(h.jsx)("p",{children:"New Time Out"}),Object(h.jsx)("input",{type:"time",className:"form-control form-control-sm",onChange:e.OnTimeChange,value:e.NewAttendance.time_out,name:"time_out",id:"time_out"})]})]}),Object(h.jsxs)("div",{className:"d-flex justify-content-end align-items-center mt-1",style:{marginRight:"212px"},children:[Object(h.jsx)("input",{type:"checkbox",name:"time_out",onChange:e.onChangeCheck}),Object(h.jsx)("label",{for:"time_out",children:" Set to Null "})]})]}):null,e.Marking.mark_break_in?Object(h.jsxs)("div",{className:"mb-2",children:[Object(h.jsxs)("div",{className:"d-flex",children:[Object(h.jsxs)("div",{className:"w-100 mr-1",children:[Object(h.jsx)("p",{children:"Break In"}),Object(h.jsx)("input",{type:"time",disabled:!0,className:"form-control form-control-sm",name:"break_in",value:s.break_in})]}),Object(h.jsxs)("div",{className:"w-100 ml-1",children:[Object(h.jsx)("p",{children:"New Break In"}),Object(h.jsx)("input",{type:"time",className:"form-control form-control-sm",onChange:e.OnTimeChange,value:e.NewAttendance.break_in,name:"break_in",id:"break_in"})]})]}),Object(h.jsxs)("div",{className:"d-flex justify-content-end align-items-center mt-1",style:{marginRight:"212px"},children:[Object(h.jsx)("input",{type:"checkbox",name:"break_in",onChange:e.onChangeCheck}),Object(h.jsx)("label",{for:"break_in",children:" Set to Null "})]})]}):null,e.Marking.mark_break_out?Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{className:"d-flex",children:[Object(h.jsxs)("div",{className:"w-100 mr-1",children:[Object(h.jsx)("p",{children:"Break Out"}),Object(h.jsx)("input",{type:"time",disabled:!0,className:"form-control form-control-sm",name:"break_out",value:s.break_out})]}),Object(h.jsxs)("div",{className:"w-100 ml-1",children:[Object(h.jsx)("p",{children:"New Break Out"}),Object(h.jsx)("input",{type:"time",className:"form-control form-control-sm",onChange:e.OnTimeChange,value:e.NewAttendance.break_out,name:"break_out",id:"break_out"})]})]}),Object(h.jsxs)("div",{className:"d-flex justify-content-end align-items-center mt-1",style:{marginRight:"212px"},children:[Object(h.jsx)("input",{type:"checkbox",name:"break_out",onChange:e.onChangeCheck}),Object(h.jsx)("label",{for:"break_out",children:" Set to Null "})]})]}):null,Object(h.jsxs)("div",{className:"my-3",children:[Object(h.jsx)("p",{children:"Reason"}),Object(h.jsx)("textarea",{onChange:e.OnChangeHandler,value:e.reason,className:"form-control form-control-sm",name:"reason",required:!0})]}),Object(h.jsxs)("div",{children:[null!==e.SnapShot?Object(h.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(h.jsxs)("p",{className:"mb-2",children:["Snapshot ",Object(h.jsx)("sub",{children:"(Optional)"})]}),Object(h.jsx)("i",{class:"las la-times-circle",onClick:e.closebutton,style:{fontSize:"20px",cursor:"pointer"}})]}):Object(h.jsx)("div",{children:Object(h.jsxs)("p",{className:"mb-2",children:["Snapshot ",Object(h.jsx)("sub",{children:"(Optional)"})]})}),null!==e.SnapShot?Object(h.jsx)("img",{src:e.SnapShot,width:"100%",alt:"snap"}):Object(h.jsx)("input",{type:"file",onChange:e.onUploadSnap})]})]}),Object(h.jsxs)("div",{className:"Attandence_Request_form_button",children:[Object(h.jsx)("div",{className:"",children:Object(h.jsxs)("span",{children:["Submit to :",Object(h.jsxs)("select",{name:"submit_to",onChange:e.OnChangeHandler,id:"",className:"form-control form-control-sm",required:!0,children:[Object(h.jsx)("option",{value:"",children:" select "}),e.Relations.map((function(e,t){var n;return("all"===e.category||e.category.includes("attendance_request"))&&(n=Object(h.jsxs)("option",{value:e.sr,children:[" ",e.name," "]},t)),n}))]})]})}),Object(h.jsxs)("div",{className:"d-flex",children:[Object(h.jsx)(l.c,{to:"/attendance_request",className:"btn btn-sm cancle",type:"reset",children:"Cancle"}),""===e.Form.submit_to?null:Object(h.jsx)("button",{className:"btn btn-sm submit",type:"submit",children:"Submit"})]})]})]})},x=function(e){var t=e.RequestList,n=e.RequestDetails,s=e.buttonslideSnapeshot,a=e.OnTimeChange,r=e.NewAttendance,o=e.AccessControls,m=Object(i.useState)(!1),u=Object(c.a)(m,2),b=u[0],_=u[1];return Object(i.useEffect)((function(){var e=!1;n.reviews.filter((function(t){return e=!1,"mark"!==t.request_status&&"mark_&_forward"!==t.request_status&&"cancel"!==t.request_status||(e=!0),e})),_(e)}),[n.reviews]),Object(i.useEffect)((function(){d()(".responsive_left").hide(0)}),[]),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("div",{className:"View2",children:[Object(h.jsx)("div",{className:"View2_left",children:Object(h.jsxs)("table",{className:"table table-sm table-hover",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Request By"}),Object(h.jsx)("th",{children:"Request Date"})]})}),Object(h.jsx)("tbody",{children:t.map((function(e,t){var n=new Date(e.request_date);return Object(h.jsxs)("tr",{children:[Object(h.jsxs)("td",{children:[" ",Object(h.jsxs)(l.c,{to:"/attendance_request/"+e.request_id+"_"+e.id,children:[" ",e.sender_name]}),"  "]}),Object(h.jsxs)("td",{children:[" ",Object(h.jsxs)(l.c,{to:"/attendance_request/"+e.request_id+"_"+e.id,children:[" ",n?n.toDateString():null]}),"  "]})]},t)}))})]})}),Object(h.jsxs)("div",{className:"View2_right",children:[Object(h.jsx)("div",{className:"top",children:Object(h.jsxs)("div",{className:"View2_grid",children:[Object(h.jsx)("div",{className:"View2_image",children:Object(h.jsx)("img",{src:"images/employees/"+n.emp_info.emp_image,alt:""})}),Object(h.jsxs)("div",{children:[Object(h.jsx)("h4",{className:"mb-3",children:"Employee Details"}),Object(h.jsxs)("div",{className:"details",children:[Object(h.jsx)("p",{className:"mr-2",children:"Name :"}),Object(h.jsx)("p",{className:"ml-2",style:{color:"gray"},children:n.emp_info.name})]}),Object(h.jsxs)("div",{className:"details",children:[Object(h.jsx)("p",{className:"mr-2",children:"Designation :"}),Object(h.jsx)("p",{className:"ml-2",style:{color:"gray"},children:n.emp_info.designation_name})]}),Object(h.jsxs)("div",{className:"details",children:[Object(h.jsx)("p",{className:"mr-2",children:"Department :"}),Object(h.jsx)("p",{className:"ml-2",style:{color:"gray"},children:n.emp_info.department_name})]}),Object(h.jsxs)("div",{className:"details",children:[Object(h.jsx)("p",{className:"mr-2",children:"Company :"}),Object(h.jsx)("p",{className:"ml-2",style:{color:"gray"},children:n.emp_info.company_name})]})]})]})}),Object(h.jsxs)("div",{className:"bottom mb-4",children:[Object(h.jsx)("div",{children:Object(h.jsx)("h4",{children:"Request Details"})}),Object(h.jsxs)("div",{className:"details",children:[Object(h.jsx)("p",{children:"Reason : "}),Object(h.jsx)("p",{style:{color:"gray"},children:n.request_info.reason})]}),Object(h.jsxs)("div",{className:"details",children:[Object(h.jsx)("p",{children:"Date : "}),Object(h.jsx)("p",{style:{color:"gray"},children:new Date(n.request_info.date).toDateString()})]}),Object(h.jsxs)("div",{className:"details",children:[Object(h.jsx)("p",{children:"Request Type : "}),Object(h.jsx)("p",{style:{color:"gray"},children:n.request_info.request_type})]}),Object(h.jsxs)("div",{className:"details",children:[Object(h.jsx)("p",{children:"Snapshot : "}),Object(h.jsx)("div",{children:null===n.request_info.snapshot?Object(h.jsx)("p",{style:{color:"gray"},children:"No Snapshot"}):Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("div",{className:"buttonslideSnapeshot",onClick:s,children:"show"}),Object(h.jsx)("div",{className:"slideSnapeshot",children:Object(h.jsx)("img",{src:n.request_info.snapshot,alt:""})})]})})]}),n.reviews.map((function(e,t){var s=[];(s=e.sender_name.split(" ")).length>2&&s.pop();var a=null;return t<n.reviews.length&&(a=Object(h.jsxs)("div",{className:"",children:[Object(h.jsxs)("p",{children:[s.join(" ")," timings : "]}),Object(h.jsx)("div",{children:Object(h.jsxs)("table",{className:"table table-sm",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:" Time in "}),Object(h.jsx)("th",{children:" Time out "}),Object(h.jsx)("th",{children:" Break in "}),Object(h.jsx)("th",{children:" Break out "})]})}),Object(h.jsx)("tbody",{children:Object(h.jsxs)("tr",{children:[Object(h.jsxs)("td",{children:[" ",e.time_in," "]}),Object(h.jsxs)("td",{children:[" ",e.time_out," "]}),Object(h.jsxs)("td",{children:[" ",e.break_in," "]}),Object(h.jsxs)("td",{children:[" ",e.break_out," "]})]})})]})})]},t)),a})),b?null:o.access&&n.reviews.length>0&&(JSON.parse(o.access).includes(101)||JSON.parse(o.access).includes(1))?Object(h.jsxs)("div",{className:"details",children:[Object(h.jsx)("p",{children:"Your timings : "}),Object(h.jsx)("div",{children:Object(h.jsx)("table",{className:"table table-sm",children:Object(h.jsx)("tbody",{children:Object(h.jsxs)("tr",{children:[Object(h.jsxs)("td",{className:"text-left",children:[Object(h.jsx)("input",{type:"time",name:"time_in",id:"time_in_check",value:r.time_in,style:{width:"100% !important"},onChange:a}),Object(h.jsxs)("div",{className:"w-100 text-left d-flex align-items-center",children:[Object(h.jsx)("input",{onChange:a,type:"checkbox",name:"time_in_check"})," ",Object(h.jsx)("span",{children:" Set to null "})]})]}),Object(h.jsxs)("td",{className:"text-left",children:[Object(h.jsx)("input",{type:"time",name:"time_out",id:"time_out_check",value:r.time_out,style:{width:"100% !important"},onChange:a}),Object(h.jsxs)("div",{className:"w-100 text-left d-flex align-items-center",children:[Object(h.jsx)("input",{onChange:a,type:"checkbox",name:"time_out_check"})," ",Object(h.jsx)("span",{children:" Set to null "})]})]}),Object(h.jsxs)("td",{className:"text-left",children:[Object(h.jsx)("input",{type:"time",name:"break_in",id:"break_in_check",value:r.break_in,style:{width:"100% !important"},onChange:a}),Object(h.jsxs)("div",{className:"w-100 text-left d-flex align-items-center",children:[Object(h.jsx)("input",{onChange:a,type:"checkbox",name:"break_in_check"})," ",Object(h.jsx)("span",{children:" Set to null "})]})]}),Object(h.jsxs)("td",{className:"text-left",children:[Object(h.jsx)("input",{type:"time",name:"break_out",id:"break_out_check",value:r.break_out,style:{width:"100% !important"},onChange:a}),Object(h.jsxs)("div",{className:"w-100 text-left d-flex align-items-center",children:[Object(h.jsx)("input",{onChange:a,type:"checkbox",name:"break_out_check"})," ",Object(h.jsx)("span",{children:" Set to null "})]})]}),Object(h.jsx)("td",{className:"text-left",children:Object(h.jsxs)("select",{name:"",id:"record_status",defaultValue:"Present",children:[Object(h.jsx)("option",{value:"Present",children:"Present"}),Object(h.jsx)("option",{value:"Late",children:"Late"}),Object(h.jsx)("option",{value:"Absent",children:"Absent"}),Object(h.jsx)("option",{value:"Holiday",children:"Holiday"}),Object(h.jsx)("option",{value:"OFF",children:"OFF"})]})})]})})})})]}):null,null===n.request_info.marked_time_in&&null===n.request_info.marked_time_out&&null===n.request_info.marked_break_in&&null===n.request_info.marked_break_out?null:Object(h.jsxs)("div",{className:"details",children:[Object(h.jsx)("p",{children:"Marked timings : "}),Object(h.jsx)("div",{children:Object(h.jsxs)("table",{className:"table table-sm",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:" Time in "}),Object(h.jsx)("th",{children:" Time out "}),Object(h.jsx)("th",{children:" Break in "}),Object(h.jsx)("th",{children:" Break out "})]})}),Object(h.jsx)("tbody",{children:Object(h.jsxs)("tr",{children:[Object(h.jsxs)("td",{children:[" ",n.request_info.marked_time_in," "]}),Object(h.jsxs)("td",{children:[" ",n.request_info.marked_time_out," "]}),Object(h.jsxs)("td",{children:[" ",n.request_info.marked_break_in," "]}),Object(h.jsxs)("td",{children:[" ",n.request_info.marked_break_out," "]})]})})]})})]})]}),Object(h.jsxs)("div",{className:"bottom",children:[Object(h.jsx)("div",{children:Object(h.jsx)("h4",{children:"Review / Comments"})}),Object(h.jsx)("div",{className:"ReviewsGrid",children:n.reviews.map((function(e,t){var n=[];return null!==e.receiver_name?(n=e.receiver_name.split(" ")).length>1&&n.pop():(n=[e.sender_name]).length>1&&n.pop(),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{className:"details",children:[Object(h.jsx)("small",{className:"mr-2 d-block",children:"From : "}),Object(h.jsx)("small",{className:"ml-2 d-block",style:{color:"gray"},children:e.sender_name})]},t),Object(h.jsxs)("div",{className:"details",children:[Object(h.jsx)("small",{className:"mr-2 d-block",children:"To : "}),Object(h.jsx)("small",{className:"ml-2 d-block",style:{color:"gray"},children:e.receiver_name})]},t),Object(h.jsxs)("div",{className:"details",children:[Object(h.jsxs)("small",{className:"mr-2 d-block",children:[" ",n.join(" ")," remarks : "]}),Object(h.jsx)("small",{className:"ml-2 d-block",style:{color:"gray"},children:null===e.remarks?"No remrks yet":e.remarks})]})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{children:Object(h.jsx)("p",{children:new Date(e.request_date).toDateString()})}),Object(h.jsx)("div",{className:"statusbox",children:Object(h.jsx)("p",{children:e.request_status})})]})]})}))})]}),Object(h.jsx)(l.c,{to:"/attendance_request",className:"View2_right_cancle",children:Object(h.jsx)("i",{class:"las la-times"})})]})]}),Object(h.jsx)(j.a,{})]})}},551:function(e,t,n){},93:function(e,t,n){"use strict";n(1),n(99);var s=n(0);t.a=function(e){return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("div",{className:"Attandence_Request_Div",style:{display:e.show?"flex":"none"},children:[Object(s.jsx)("div",{className:"dark",onClick:e.Hide}),Object(s.jsx)("div",{style:{animationDelay:"0.1".toString()+"s"},className:e.show?"Attandence_Request_Div_Content Attandence_Request_Div_Content2":"Attandence_Request_Div_Content",children:e.content})]})})}},99:function(e,t,n){}}]);
//# sourceMappingURL=44.20864274.chunk.js.map