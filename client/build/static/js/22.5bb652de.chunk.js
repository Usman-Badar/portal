(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[22],{239:function(e,t,s){},613:function(e,t,s){"use strict";s.r(t);var a=s(4),c=s(1),i=(s(614),s(24)),n=s(75),l=s.n(n),r=(s(615),s(616),s(80)),d=(s(90),s(10)),o=(s(239),s(177)),j=(s(148),s(0));t.default=function(){var e=Object(c.useState)(!0),t=Object(a.a)(e,2),s=t[0],n=t[1],b=Object(c.useState)(!1),m=Object(a.a)(b,2),h=m[0],u=m[1],x=Object(c.useState)(Object(j.jsx)(j.Fragment,{})),O=Object(a.a)(x,2),p=O[0],g=O[1],f=Object(c.useState)([]),v=Object(a.a)(f,2),N=(v[0],v[1]),_=Object(c.useState)([]),y=Object(a.a)(_,2),w=y[0],T=y[1],S=Object(c.useState)([]),D=Object(a.a)(S,2),C=(D[0],D[1]),M=Object(c.useState)([]),k=Object(a.a)(M,2),I=k[0],E=k[1];Object(c.useEffect)((function(){var e=new FormData;e.append("empID",sessionStorage.getItem("EmpID")),d.a.post("/getempattdetails",e).then((function(t){T(t.data),d.a.post("/getempinoutsdetails",e).then((function(e){C(e.data)})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}),[]),Object(c.useEffect)((function(){l()(".meetingdetials").hide(0)}),[I]),Object(c.useEffect)((function(){l()(".TabsBtn").removeClass("b1-bottom-none"),l()(".Tabs").hide(),l()(".TabBtn0").addClass("b1-bottom-none"),l()(".Tabs0").show(),l()(".EditBox").hide(),l()(".save_Icon").hide(),l()(".Tabs0").show(),l()(".ShowImage").hide(),N([{icon:"las la-user",txt:"About",link:!1,func:function(){return A("Tabs0","TabBtn0")}},{icon:"las la-clipboard",txt:"Records",link:!1,func:function(){return A("Tabs1","TabBtn1")}},{icon:"las la-share",txt:"Attendence",link:!1,func:function(){return A("Tabs2","TabBtn2")}}]);for(var e=[],t=0;t<30;t++)e.push(t);E(e)}),[]);var A=function(e,t){l()(".TabsBtn").removeClass("b1-bottom-none"),l()(".Tabs").hide(),l()("."+t).addClass("b1-bottom-none"),l()("."+e).show(),n("TabBtn0"===t)},P=Object(i.c)((function(e){return e.EmpAuth.EmployeeData})),B=[{left:"Name : ",right:P.name,editable:!0},{left:"Father Name : ",right:P.father_name,editable:!0},{left:"Date Of Birth :",right:P.date_of_birth?P.date_of_birth.toString().substring(0,10):null,editable:!1},{left:"Gender :",right:P.gender,editable:!1},{left:"Marital Status :",right:P.marital_status,editable:!1}],F=[{left:"Contact No :",right:P.cell,editable:!0},{left:"Emergency Person Name : ",right:P.emergency_person_name,editable:!0},{left:"Emergency Contact No : ",right:P.emergency_person_number,editable:!0},{left:"Email : ",right:P.email,editable:!0},{left:"Address :",right:P.permanent_address,editable:!0},{left:"CNIC :",right:P.cnic,editable:!1}],G=[{left:"Employee ID : ",right:P.emp_id,editable:!1},{left:"Employee Company : ",right:P.company_name,editable:!1},{left:"Department : ",right:P.department_name,editable:!1},{left:"Joining Date : ",right:P.date_of_join?P.date_of_join.toString().substring(0,10):null,editable:!1}],R=[{Image:"images/documents/cnic/front/"+P.cnic_front_image,PicName:"CNIC Front"},{Image:"images/documents/cnic/back/"+P.cnic_back_image,PicName:"CNIC Back"},{Image:"images/documents/cv/"+P.cv,PicName:"CV"},{Image:"images/documents/address/"+P.proof_of_address,PicName:"Proof of Address"}],L=(P.cv,P.proof_of_address,[{editleft:"Login ID :",editright:"MMalahim",icon:"las la-eye"},{editleft:"Login Password :",editright:"MMalahim",icon:"las la-eye"},{editleft:"Contact No :",editright:P.cell},{editleft:"Emergency Contact Name :",editright:P.emergency_person_name},{editleft:"Emergency Contact No :",editright:P.emergency_person_number},{editleft:"Email :",editright:P.email},{editleft:"Address :",editright:P.permanent_address},{editleft:"Marital Status :",editright:P.marital_status}]),q=function(){var e=null;h?u(!1):(e=Object(j.jsxs)("div",{className:"ModalDiv",children:[L.map((function(e){return Object(j.jsxs)("div",{className:"ModalGrid",children:[Object(j.jsx)("div",{className:"modalcontentleft",children:Object(j.jsx)("p",{children:e.editleft})}),"Login Password :"===e.editleft||"Login ID :"===e.editleft?Object(j.jsxs)("div",{className:"modalcontentright",children:[Object(j.jsx)("input",{type:"password",className:"form-control credentials "+("Login Password :"===e.editleft?"pass":"id"),value:e.editright}),Object(j.jsx)("i",{className:e.icon,style:{fontSize:"18px",marginRight:"10px"},id:"EyeIcon"+("Login Password :"===e.editleft?"pass":"id"),onClick:function(){return t="Login Password :"===e.editleft?"pass":"id",console.log(t),void("password"===l()(".modalcontentright .form-control.credentials."+t).attr("type")?(l()(".modalcontentright .form-control.credentials."+t).attr("type","text"),l()("#EyeIcon"+t).removeClass("las la-eye"),l()("#EyeIcon"+t).addClass("las la-eye-slash")):(l()(".modalcontentright .form-control.credentials."+t).attr("type","password"),l()("#EyeIcon"+t).removeClass("las la-eye-slash"),l()("#EyeIcon"+t).addClass("las la-eye")));var t}})]}):Object(j.jsx)("div",{className:"modalcontentright",children:Object(j.jsx)("input",{type:"text",className:"form-control",value:e.editright})})]})})),Object(j.jsxs)("div",{className:"Modalbutton",children:[Object(j.jsx)("button",{className:"btn",children:"Cancle"}),Object(j.jsx)("button",{className:"btn",children:"Save changes"})]})]}),g(e),u(!0))},H=new Date;Object(c.useEffect)((function(){J(),l()(".alldays i").on("click",(function(e){var t=e.target.id;l()(".meetingdetial").not("."+t).hide("fast"),l()("."+t).toggle("fast").animate({opacity:1},300)})),l()(".alldays").on("click",(function(e){alert("asdasd")}))}),[]);var J=function(){H.setDate(1);var e=document.querySelector(".days"),t=new Date(H.getFullYear(),H.getMonth()+1,0).getDate(),s=new Date(H.getFullYear(),H.getMonth(),0).getDate(),a=H.getDay(),c=7-new Date(H.getFullYear(),H.getMonth()+1,0).getDay()-1,i=[{date:"2022-02-15",time:"13:00:00",location:"headoffice",participants:["usman","Malahim"]},{date:"2022-02-28",time:"13:00:00",location:"headoffice",participants:["usman","Malahim"]}];document.querySelector(".date h1").innerHTML=["January","February","March","April","May","June","July","August","September","October","November","December"][H.getMonth()],document.querySelector(".date p").innerHTML=(new Date).toDateString();for(var n="",r=a;r>0;r--)n+='<div class="prev-date previous'.concat(s-r+1,'">').concat(s-r+1,"</div>");for(var d=1;d<=t;d++)n+='<div class="'.concat(d===(new Date).getDate()&&H.getMonth()===(new Date).getMonth()?"today alldays current"+((new Date).getMonth()+1)+"-"+d:"alldays current"+((new Date).getMonth()+1)+"-"+d,'">').concat(d,' <i class="las la-bell ').concat(d,'" id="days').concat(d,'"></i> \n                <div class="meetingdetial days').concat(d,'">\n                    <p class=\'font-weight-bolder text-center mb-2\' style="font-size: 15px">Sample Meeting</p>\n                     <div class=\'d-flex align-items-center justify-content-between px-2 py-1\'><i class="las la-clock"></i> <p>3:00 PM - 4:00 PM</p></div>\n                    <div class=\'d-flex align-items-center justify-content-between px-2 py-1\'><i class="las la-map-marker"></i> <p>Conference Room</p></div>\n                    <div class=\'d-flex  justify-content-between px-2 py-1\'><i class="las la-users"></i><div><p>participant 1</p><p>participant 2</p><p>participant 3</p></div></div>\n                </div></div>');for(var o=1;o<=c;o++)n+='<div class="next-date next'.concat(o,'">').concat(o,"</div>"),e.innerHTML=n;for(var j=0;j<t;j++)for(var b=0;b<i.length;b++){var m=i[b].date.toString().split("-").pop(),h=(i[b].date.toString().split("-")[1],document.querySelectorAll(".alldays")),u=void 0;u=isNaN(h[j].className.toString().slice(-2))?h[j].className.toString().slice(-1):h[j].className.toString().slice(-2),parseInt(m)===parseInt(u)&&l()("."+h[j].className.split(" ").pop().toString()+" i").show()}};return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("div",{className:"NewProfile_Header",children:Object(j.jsxs)("div",{className:"NewProfile_Grid",children:[Object(j.jsxs)("div",{className:"NewProfile_Grid1",children:[Object(j.jsxs)("div",{className:"Display_Picture",children:[Object(j.jsx)("img",{src:"images/employees/"+P.emp_image,alt:"DP"}),Object(j.jsx)("div",{className:"Edit_DP",children:Object(j.jsx)("i",{class:"las la-camera",style:{fontSize:"20px"}})})]}),Object(j.jsxs)("div",{className:"Emp_Time",children:[Object(j.jsxs)("div",{className:"",children:[Object(j.jsx)("span",{children:Object(j.jsx)("p",{className:"text-center mb-0",children:"Time In"})}),Object(j.jsx)("h4",{className:"text-center mb-0",children:P.time_in})]}),Object(j.jsxs)("div",{className:"",children:[Object(j.jsx)("span",{children:Object(j.jsx)("p",{className:"text-center mb-0",children:"Time Out"})}),Object(j.jsx)("h4",{className:"text-center mb-0",children:P.time_out})]})]}),Object(j.jsxs)("div",{className:"EmpTodayAtt",children:[Object(j.jsx)("h4",{className:"text-center mb-3",children:"Today's Attendance"}),Object(j.jsxs)("div",{className:"Divs",children:[Object(j.jsx)("p",{children:"Time In"}),Object(j.jsx)("p",{children:w[0]?null===w[0].time_in?null:w[0].time_in.substring(0,5):null})]}),Object(j.jsxs)("div",{className:"Divs",children:[Object(j.jsx)("p",{children:"Time Out"}),Object(j.jsx)("p",{children:w[0]?null===w[1].time_out?null:w[1].time_out.substring(0,5):null})]}),Object(j.jsxs)("div",{className:"Divs",children:[Object(j.jsx)("p",{children:"Break In"}),Object(j.jsx)("p",{children:w[0]?null===w[2].break_in?null:w[2].break_in.substring(0,5):null})]}),Object(j.jsxs)("div",{className:"Divs",children:[Object(j.jsx)("p",{children:"Break Out"}),Object(j.jsx)("p",{children:w[0]?null===w[3].break_out?null:w[3].break_out.substring(0,5):null})]}),Object(j.jsxs)("div",{className:"my-4",children:[Object(j.jsxs)("div",{className:"Divs",children:[Object(j.jsx)("p",{children:"Total Break Time"}),Object(j.jsx)("p",{children:"0.35 / 1.0"})]}),Object(j.jsx)("div",{className:"EmpAttBar",children:Object(j.jsx)("div",{className:"EmpAttBar1",style:{backgroundColor:"#0F7EE3",width:"40%"}})}),Object(j.jsxs)("div",{className:"Divs",children:[Object(j.jsx)("p",{children:"Total Hours"}),Object(j.jsx)("p",{children:"7.35 / 8.0"})]}),Object(j.jsx)("div",{className:"EmpAttBar",children:Object(j.jsx)("div",{className:"EmpAttBar1",style:{backgroundColor:"#5FFE27",width:"70%"}})})]})]})]}),Object(j.jsx)("div",{className:"NewProfile_GridShow ",children:Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{className:"Display_Picture",children:[Object(j.jsx)("img",{src:"images/employees/"+P.emp_image,alt:"DP"}),Object(j.jsx)("div",{className:"Edit_DP",children:Object(j.jsx)("i",{class:"las la-camera",style:{fontSize:"20px"}})})]}),Object(j.jsx)("div",{className:"Grid2_upperShow",children:Object(j.jsxs)("div",{className:"Grid2_upper",children:[Object(j.jsx)("h3",{className:"font-weight-bolder",children:P.name}),Object(j.jsxs)("h5",{children:[P.designation_name," in ",P.department_name," Department at ",P.company_name]})]})}),Object(j.jsxs)("div",{className:"Emp_Time",children:[Object(j.jsxs)("div",{className:"",children:[Object(j.jsx)("span",{children:Object(j.jsx)("p",{className:"text-center mb-0",children:"Time In"})}),Object(j.jsx)("h4",{className:"text-center mb-0",children:P.time_in})]}),Object(j.jsxs)("div",{className:"",children:[Object(j.jsx)("span",{children:Object(j.jsx)("p",{className:"text-center mb-0",children:"Time Out"})}),Object(j.jsx)("h4",{className:"text-center mb-0",children:P.time_out})]})]})]})}),Object(j.jsxs)("div",{className:"NewProfile_Grid2",children:[Object(j.jsxs)("div",{className:"Grid2_upper",children:[Object(j.jsx)("h3",{className:"font-weight-bolder",children:P.name}),Object(j.jsxs)("h5",{children:[P.designation_name," in ",P.department_name," Department at ",P.company_name]})]}),Object(j.jsxs)("div",{className:"Grid2_lower",children:[Object(j.jsxs)("div",{className:"Emp_About ",children:[Object(j.jsxs)("div",{className:"About_Tabs",children:[Object(j.jsx)("div",{className:"Tab1 TabsBtn TabBtn0",onClick:function(){return A("Tabs0","TabBtn0")},style:{backgroundColor:"#2d6be6"},children:Object(j.jsx)("p",{className:"font-weight-bolder mb-0 my-2",children:"About"})}),Object(j.jsx)("div",{className:"Tab2 TabsBtn TabBtn1",onClick:function(){return A("Tabs1","TabBtn1")},style:{backgroundColor:"#385a64"},children:Object(j.jsx)("p",{className:"font-weight-bolder mb-0 my-2",children:"Records"})})]}),s?Object(j.jsxs)("div",{className:"editdiv",children:[Object(j.jsx)(o.a,{id:"editbottondiv",place:"left",children:"Edit"}),Object(j.jsx)("div",{className:"editbotton","data-tip":!0,"data-for":"editbottondiv",onClick:q,children:Object(j.jsx)("i",{className:"las la-pen"})})]}):null]}),Object(j.jsxs)("div",{className:"AboutTabs1 Tabs Tabs0",children:[Object(j.jsx)("p",{className:"font-weight-bolder mb-3",style:{color:"lightgray"},children:" - Personal Information "}),Object(j.jsx)("div",{className:"Tab1Div",children:B.map((function(e,t){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:"AboutTabsGrid py-2",children:[Object(j.jsx)("div",{className:"Aboutleft font-weight-bold",children:Object(j.jsx)("p",{children:e.left})}),Object(j.jsx)("div",{className:"Aboutright",children:Object(j.jsx)("p",{style:{color:"gray"},children:e.right})})]})})}))}),Object(j.jsx)("hr",{}),Object(j.jsx)("p",{className:"font-weight-bolder mb-3",style:{color:"lightgray"},children:" - Contact Information "}),Object(j.jsx)("div",{className:"Tab1Div",children:F.map((function(e,t){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:"AboutTabsGrid py-2",children:[Object(j.jsx)("div",{className:"Aboutleft font-weight-bold pr-2",children:Object(j.jsx)("p",{children:e.left})}),Object(j.jsx)("div",{className:"Aboutright",children:Object(j.jsx)("p",{style:{color:"gray"},children:e.right})})]})})}))}),Object(j.jsx)("hr",{}),Object(j.jsx)("p",{className:"font-weight-bolder mb-3",style:{color:"lightgray"},children:" - Office Information "}),Object(j.jsx)("div",{className:"Tab1Div",children:G.map((function(e){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:"AboutTabsGrid py-2",children:[Object(j.jsx)("div",{className:"Aboutleft font-weight-bold pr-2",children:Object(j.jsx)("p",{children:e.left})}),Object(j.jsx)("div",{className:"Aboutright",children:Object(j.jsx)("p",{style:{color:"gray"},children:e.right})})]})})}))})]}),Object(j.jsxs)("div",{className:"AboutTabs2 Tabs Tabs1",children:[Object(j.jsx)("div",{className:"Recordsdivleft",children:Object(j.jsx)("div",{className:"ShowImage",children:Object(j.jsx)("img",{className:"ShowImage",src:"",style:{width:"100%"},alt:"images"})})}),Object(j.jsx)("div",{className:"Recordsdivright px-3 mb-4",children:Object(j.jsx)("div",{className:"Records_Grid mb-3",children:R.map((function(e,t){var s,a;return 0===t&&(s=Object(j.jsx)("p",{className:"font-weight-bolder mb-3",style:{color:"lightgray"},children:" - CNIC Records "})),2===t&&(a=Object(j.jsx)("p",{className:"font-weight-bolder mb-3",style:{color:"lightgray"},children:" - Other Records "})),Object(j.jsxs)(j.Fragment,{children:[s,a,Object(j.jsxs)("div",{className:"Div1 Div1"+t,onClick:function(){return t=e.Image,l()(".ShowImage").show(),void l()("img.ShowImage").attr("src",t);var t},children:[Object(j.jsx)("img",{src:e.Image,alt:"Image1"}),Object(j.jsx)("div",{className:"InfoText p-3",children:Object(j.jsx)("p",{className:"font-weight-bold",children:e.PicName})})]})]})}))})})]}),Object(j.jsx)("div",{className:"Tabs Tabs2",children:Object(j.jsx)("div",{className:"container",children:Object(j.jsxs)("div",{className:"calendar",children:[Object(j.jsxs)("div",{className:"month",children:[Object(j.jsx)("i",{className:"las la-angle-left prev",onClick:function(){H.setMonth(H.getMonth()-1),J()}}),Object(j.jsxs)("div",{className:"date",children:[Object(j.jsx)("h1",{}),Object(j.jsx)("p",{})]}),Object(j.jsx)("i",{className:"las la-angle-right next",onClick:function(){H.setMonth(H.getMonth()+1),J()}})]}),Object(j.jsxs)("div",{className:"weekdays",children:[Object(j.jsx)("div",{children:"Sun"}),Object(j.jsx)("div",{children:"Mon"}),Object(j.jsx)("div",{children:"Tue"}),Object(j.jsx)("div",{children:"Wed"}),Object(j.jsx)("div",{children:"Thu"}),Object(j.jsx)("div",{children:"Fri"}),Object(j.jsx)("div",{children:"Sat"})]}),Object(j.jsx)("div",{className:"days"})]})})}),Object(j.jsx)(r.a,{show:h,Hide:q,content:p})]})]})]})})})}},614:function(e,t,s){},615:function(e,t,s){},616:function(e,t,s){},80:function(e,t,s){"use strict";s(1),s(85);var a=s(0);t.a=function(e){return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("div",{className:"Attandence_Request_Div",style:{display:e.show?"flex":"none"},children:[Object(a.jsx)("div",{className:"dark",onClick:e.Hide}),Object(a.jsx)("div",{style:{animationDelay:"0.1".toString()+"s"},className:e.show?"Attandence_Request_Div_Content Attandence_Request_Div_Content2":"Attandence_Request_Div_Content",children:e.content})]})})}},85:function(e,t,s){},88:function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},90:function(e,t,s){"use strict";var a=s(1),c=(s(91),s(75)),i=s.n(c),n=s(17),l=s(0);t.a=function(e){Object(a.useEffect)((function(){i()(".Speeddail_Grid").slideToggle(0)}),[]);return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("div",{className:"Menu",children:e.data.length>0?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{className:"Menu_Grid",children:e.data.map((function(e,t){return Object(l.jsx)(l.Fragment,{children:e.txt?e.link?Object(l.jsx)(n.b,{to:e.href,children:Object(l.jsx)("button",{children:Object(l.jsx)("p",{className:"font-weight-bolder mb-0",children:e.txt})})}):Object(l.jsx)("button",{onClick:function(){return e.func()},children:Object(l.jsx)("p",{className:"font-weight-bolder mb-0",children:e.txt})}):null})}))}),Object(l.jsxs)("div",{className:"Menu_Speeddail",children:[Object(l.jsx)("div",{className:"Menu_Speeddail_circle",onClick:function(){i()(".Menu_Speeddail .Speeddail_Grid").slideToggle(200),i()(".Menu_Speeddail .Menu_Speeddail_circle .las").hasClass("la-bars")?(i()(".Menu_Speeddail .Menu_Speeddail_circle .las").removeClass("la-bars"),i()(".Menu_Speeddail .Menu_Speeddail_circle .las").addClass("la-times")):(i()(".Menu_Speeddail .Menu_Speeddail_circle .las").removeClass("la-times"),i()(".Menu_Speeddail .Menu_Speeddail_circle .las").addClass("la-bars"))},children:Object(l.jsx)("i",{class:"las la-times"})}),Object(l.jsx)("div",{className:"Speeddail_Grid",children:e.data.map((function(e,t){return Object(l.jsx)(l.Fragment,{children:e.txt?e.link?Object(l.jsx)(n.b,{to:e.href,children:Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"mb-1 Speeddail_Grid1 divs"+t,children:Object(l.jsx)("i",{className:e.icon})}),Object(l.jsx)("p",{children:e.txt})]},t)}):Object(l.jsxs)("div",{className:"clicks",onClick:function(){return e.func()},children:[Object(l.jsx)("div",{className:"mb-1 Speeddail_Grid1 divs"+t,children:Object(l.jsx)("i",{className:e.icon})}),Object(l.jsx)("p",{children:e.txt})]},t):null})}))})]})]}):null})})}},91:function(e,t,s){}}]);
//# sourceMappingURL=22.5bb652de.chunk.js.map