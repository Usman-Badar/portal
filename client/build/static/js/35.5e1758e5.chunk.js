(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[35],{157:function(e,t,n){"use strict";t.a=n.p+"static/media/icons8-iphone-spinner.e2bb0653.gif"},565:function(e,t,n){},566:function(e,t,n){},672:function(e,t,n){"use strict";n.r(t);var a=n(9),c=n(4),s=n(1),i=n(85),r=n(93),o=n(11),l=n(79),d=n.n(l),u=n(157),j=(n(565),n(25)),b=n(94),p=n(3),h=(n(566),n(0)),O=function(e){var t=Object(s.useState)([]),n=Object(c.a)(t,2),a=n[0],i=n[1],r=Object(s.useState)([]),o=Object(c.a)(r,2),l=o[0],d=o[1];return Object(s.useEffect)((function(){i(e.Companies),d(e.Locations)}),[e.Locations,e.Companies]),Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("div",{className:"SearchContainer",children:[Object(h.jsxs)("div",{className:"SearchBar",children:[Object(h.jsx)("div",{children:Object(h.jsx)("i",{class:"las la-search"})}),Object(h.jsx)("input",{type:"text",placeholder:"Tap To Search",className:"form-control",onChange:function(t){return e.onSearchPO("Key",t)}})]}),Object(h.jsxs)("div",{className:"SearchFiltersContainer",children:[Object(h.jsxs)("div",{children:[Object(h.jsx)("label",{children:"Companies"}),Object(h.jsxs)("select",{name:"companies",id:"",onChange:e.onChangeCompany,className:"form-control",children:[Object(h.jsx)("option",{value:"",children:"Default"}),a.map((function(e){return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("option",{value:e.company_code,children:e.company_name})})}))]})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)("label",{children:"Locations"}),Object(h.jsxs)("select",{onChange:e.onChangeLocation,className:"form-control",children:[Object(h.jsx)("option",{value:"",children:"Default"}),l.map((function(e){return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("option",{value:e.location_code,children:e.location_name})})}))]})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)("label",{children:"Status"}),Object(h.jsxs)("select",{onChange:function(t){return e.onSearchPO("Status",t)},className:"form-control",children:[Object(h.jsx)("option",{value:"",children:"Default"}),Object(h.jsx)("option",{value:"Approved",children:"Approved"}),Object(h.jsx)("option",{value:"Rejected",children:"Rejected"}),Object(h.jsx)("option",{value:"Waiting For Approval",children:"Waiting For Approval"}),Object(h.jsx)("option",{value:"Sent",children:"Sent"}),Object(h.jsx)("option",{value:"Viewed",children:"Viewed"})]})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)("label",{children:"Date"}),Object(h.jsx)("input",{type:"date",onChange:function(t){return e.onSearchPO("MyDate",t)},className:"form-control",name:""})]})]})]})})},m=Object(s.lazy)((function(){return n.e(87).then(n.bind(null,698))})),f=Object(s.lazy)((function(){return Promise.all([n.e(4),n.e(6),n.e(58)]).then(n.bind(null,699))})),x=Object(s.lazy)((function(){return n.e(39).then(n.bind(null,719))})),v=Object(s.lazy)((function(){return n.e(85).then(n.bind(null,712))})),g=Object(s.lazy)((function(){return n.e(86).then(n.bind(null,700))})),w=Object(s.lazy)((function(){return n.e(84).then(n.bind(null,701))})),N=Object(s.lazy)((function(){return n.e(88).then(n.bind(null,702))}));t.default=function(){var e=Object(s.useState)(!1),t=Object(c.a)(e,2),n=t[0],l=t[1],S=Object(s.useState)(Object(h.jsx)(h.Fragment,{})),y=Object(c.a)(S,2),C=y[0],D=y[1],k=Object(s.useState)([]),_=Object(c.a)(k,2),P=_[0],q=(_[1],Object(s.useState)({column:"employees.name",value:""})),L=Object(c.a)(q,2),R=L[0],I=L[1],B=Object(s.useState)({column:"companies.company_code",value:""}),V=Object(c.a)(B,2),A=V[0],F=V[1],E=Object(s.useState)({column:"locations.location_code",value:""}),W=Object(c.a)(E,2),J=W[0],z=W[1],T=Object(s.useState)({column:"invtry_purchase_order.status",value:""}),H=Object(c.a)(T,2),M=H[0],G=H[1],Q=Object(s.useState)({column:"invtry_purchase_order.request_date",value:""}),K=Object(c.a)(Q,2),Y=K[0],U=K[1],X=Object(s.useState)([]),Z=Object(c.a)(X,2),$=Z[0],ee=Z[1],te=Object(s.useState)([]),ne=Object(c.a)(te,2),ae=ne[0],ce=ne[1],se=Object(s.useState)([]),ie=Object(c.a)(se,2),re=ie[0],oe=ie[1],le=Object(s.useState)([]),de=Object(c.a)(le,2),ue=de[0],je=de[1],be=Object(s.useState)([]),pe=Object(c.a)(be,2),he=pe[0],Oe=pe[1],me=Object(s.useState)({info:[],specifications:[],venders:[]}),fe=Object(c.a)(me,2),xe=fe[0],ve=fe[1],ge=Object(s.useState)({info:[],specifications:[]}),we=Object(c.a)(ge,2),Ne=we[0],Se=we[1],ye=Object(s.useState)(0),Ce=Object(c.a)(ye,2),De=Ce[0],ke=Ce[1],_e=Object(s.useState)([]),Pe=Object(c.a)(_e,2),qe=Pe[0],Le=Pe[1],Re=Object(s.useState)([]),Ie=Object(c.a)(Re,2),Be=Ie[0],Ve=Ie[1],Ae=Object(s.useState)([]),Fe=Object(c.a)(Ae,2),Ee=Fe[0],We=Fe[1],Je=Object(s.useState)([]),ze=Object(c.a)(Je,2),Te=ze[0],He=ze[1],Me=Object(s.useState)([]),Ge=Object(c.a)(Me,2),Qe=Ge[0],Ke=Ge[1],Ye=Object(s.useState)([]),Ue=Object(c.a)(Ye,2),Xe=Ue[0],Ze=Ue[1],$e=Object(s.useState)(),et=Object(c.a)($e,2),tt=et[0],nt=et[1],at=Object(j.c)((function(e){return e.EmpAuth.EmployeeData})),ct=Object(p.g)();Object(s.useMemo)((function(){return nt(window.location.href.split("/").pop().split("id=").pop())}),[parseInt(window.location.href.split("/").pop().split("id=").pop())]),Object(s.useEffect)((function(){if(!isNaN(parseInt(tt))){var e=window.location.href.split("/").pop().split("id=").pop();o.a.post("/getpridfrompo",{po_id:e}).then((function(t){o.a.post("/getpurchaseorderdetails",{pr_id:t.data[0]?t.data[0].pr_id:null,po_id:e}).then((function(t){Ve([]),He([]),Ze([]);var n=t.data[0];t.data[4][0]&&(n[0].pr_code=t.data[4][0].pr_code),Oe(t.data[0]),ve(Object(a.a)(Object(a.a)({},xe),{},{info:n,specifications:t.data[1],venders:t.data[3]})),We(t.data[2]),Ke(t.data[7]),t.data[4][0]?(Se(Object(a.a)(Object(a.a)({},Ne),{},{info:t.data[4],specifications:t.data[5]})),Le(t.data[6])):(Se(Object(a.a)(Object(a.a)({},Ne),{},{info:[],specifications:[]})),Le([])),ke(parseInt(e))})).catch((function(e){console.log(e)}))}))}}),[tt]),Object(s.useEffect)((function(){it()}),[R,A,J,M,Y]),Object(s.useEffect)((function(){b.a.on("newpurchaseorder",(function(){st()})),st(),jt(),ut()}),[]);var st=function(){var e={emp_id:at.emp_id,access:at.access};o.a.post("/getallpo",{myData:JSON.stringify(e)}).then((function(e){oe(e.data)})).catch((function(e){console.log(e)}))},it=function(){var e={emp_id:at.emp_id,access:at.access},t=[R,A,J,M,Y];o.a.post("/getallposorted",{myData:JSON.stringify(e),filters:t}).then((function(e){oe(e.data);for(var t=[],n=0;n<e.data.length;n++)t.push(e.data[n].status);je(t)})).catch((function(e){console.log(e)}))},rt=function(){l(!n)},ot=function(e,t){var n=t.target.value;"Key"===e?I(Object(a.a)(Object(a.a)({},R),{},{value:n})):"Company"===e?F(Object(a.a)(Object(a.a)({},A),{},{value:n})):"Location"===e?z(Object(a.a)(Object(a.a)({},J),{},{value:n})):"Status"===e?G(Object(a.a)(Object(a.a)({},M),{},{value:n})):U(Object(a.a)(Object(a.a)({},Y),{},{value:n})),"Key"===e&&""===n?I(Object(a.a)(Object(a.a)({},R),{},{value:""})):"Company"===e&&""===n?F(Object(a.a)(Object(a.a)({},A),{},{value:""})):"Location"===e&&""===n?z(Object(a.a)(Object(a.a)({},J),{},{value:""})):"Status"===e&&""===n?G(Object(a.a)(Object(a.a)({},M),{},{value:""})):"MyDate"===e&&""===n&&U(Object(a.a)(Object(a.a)({},Y),{},{value:""}))},lt=function(e){ot("Company",e),""!==e.target.value?o.a.post("/getcompanylocations",{company_code:e.target.value}).then((function(e){ce(e.data)})).catch((function(e){console.log(e)})):ut()},dt=function(e){ot("Location",e),ut()},ut=function(){o.a.get("/getalllocations").then((function(e){ce(e.data)})).catch((function(e){console.log(e)}))},jt=function(){o.a.get("/getallcompanies").then((function(e){ee(e.data)})).catch((function(e){console.log(e)}))},bt=function(e,t){if("Sent"===t&&(JSON.parse(at.access).includes(523)||JSON.parse(at.access).includes(524)||JSON.parse(at.access).includes(1))){var n=new FormData;n.append("poID",e),n.append("empID",at.emp_id),o.a.post("/setpotoviewed",n).then((function(){b.a.emit("newpurchaseorder")})).catch((function(e){console.log(e)}))}},pt=function(e){var t=[];t=qe[0].image?qe.filter((function(t,n,a){return a[n].image===a[e].image})):qe.filter((function(t,n,a){return a[n].name===a[e].name})),Ve(t)},ht=function(e){var t=[];t=Ee[0].image?Ee.filter((function(t,n,a){return a[n].image===a[e].image})):Ee.filter((function(t,n,a){return a[n].name===a[e].name})),He(t)},Ot=function(e){var t=[];t=Qe[0].image?Qe.filter((function(t,n,a){return a[n].image===a[e].image})):Qe.filter((function(t,n,a){return a[n].name===a[e].name})),Ze(t)},mt=function(e){var t=new FileReader,n=e.target.files;t.onload=function(){if(2===t.readyState){for(var e=[],a=0;a<n.length;a++)e.push({name:n[a].name,file:n[a]});Ke(e)}},n[0]&&t.readAsDataURL(n[0])},ft=function(e){var t=Qe.filter((function(t,n,a){return a[n].name!==a[e].name}));Ke(t),Ze([])},xt=function(e,t){t.preventDefault();var n=new FormData;n.append("poID",e),n.append("empID",at.emp_id),n.append("remarks",t.target.remarks.value),o.a.post("/setpotodiscard",n).then((function(){var n=new FormData;n.append("eventID",3),n.append("link",""),n.append("receiverID",he[0].request_by),n.append("senderID",sessionStorage.getItem("EmpID")),n.append("Title",sessionStorage.getItem("name")),n.append("NotificationBody",sessionStorage.getItem("name")+" has discard your purchase order with id#"+he[0].po_code+" under this reason '"+t.target.remarks.value+"'"),o.a.post("/newnotification",n).then((function(){o.a.post("/sendmail",n).then((function(){b.a.emit("newpurchaseorder"),ct.replace("/purchaseorder/window=purchaseorder&&id="+(e-1)),setTimeout((function(){ct.replace("/purchaseorder/window=purchaseorder&&id="+e)}),100),it()}))})),i.b.dark("Request has been Discard",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),l(!1)})).catch((function(e){console.log(e)}))},vt=function(e,t){t.preventDefault();var n=new FormData;n.append("poID",e),n.append("empID",at.emp_id),n.append("remarks",t.target.remarks.value),Qe.forEach((function(e){n.append("Attachments",e.file)})),o.a.post("/setpotoapprove",n,{headers:{"Content-Type":"multipart/form-data"}}).then((function(){l(!1);var t=new FormData;t.append("eventID",3),t.append("receiverID",he[0].request_by),t.append("senderID",sessionStorage.getItem("EmpID")),t.append("Title",sessionStorage.getItem("name")),t.append("NotificationBody",sessionStorage.getItem("name")+" has approved your purchase order with id#"+he[0].po_code),o.a.post("/newnotification",t).then((function(){o.a.post("/sendmail",t).then((function(){b.a.emit("newpurchaseorder"),ct.replace("/purchaseorder/window=purchaseorder&&id="+(e-1)),setTimeout((function(){ct.replace("/purchaseorder/window=purchaseorder&&id="+e)}),100),it()}))})),i.b.dark("Request has been approved".toString(),{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})})).catch((function(e){console.log(e)}))},gt=function(){d()(".ViewPurchaseOrderContainer .ViewPurchaseOrderGridContainer").toggleClass("d-block"),d()(".ViewPurchaseOrderContainer .ViewPurchaseOrderGridContainer .Right.RequestDetails .PreviewWindow .openBtn").toggleClass("d-block"),d()(".ViewPurchaseOrderContainer .ViewPurchaseOrderGridContainer .Left.RequestsList").toggle("slow")};return Object(h.jsxs)("div",{className:"ViewPurchaseOrderContainer",children:[Object(h.jsx)(i.a,{}),Object(h.jsx)(r.a,{show:n,Hide:rt,content:C}),Object(h.jsx)("iframe",{title:"po",id:"po",className:"d-none w-100",src:"https://"+window.location.host+"/#/view=purchase_order/"+De+"/"+(Ne.info[0]?Ne.info[0].pr_id:0)}),Object(h.jsx)(s.Suspense,{fallback:Object(h.jsx)("div",{className:"w-100 d-flex justify-content-center mt-5",children:Object(h.jsxs)("div",{children:[Object(h.jsx)("img",{className:"rounded-circle",src:u.a,width:"60",height:"60",alt:"Loading...."}),Object(h.jsx)("p",{className:"mb-0",children:"Processing...."})]})}),children:Object(s.useMemo)((function(){return Object(h.jsx)(O,{Locations:ae,Companies:$,onChangeLocation:dt,onChangeCompany:lt,onSearchPO:ot})}),[ae,$])}),Object(h.jsxs)("div",{className:"ViewPurchaseOrderGridContainer",children:[Object(h.jsx)(s.Suspense,{fallback:Object(h.jsx)("div",{className:"w-100 d-flex justify-content-center mt-5",children:Object(h.jsxs)("div",{className:"text-center",children:[Object(h.jsx)("img",{className:"rounded-circle",src:u.a,width:"60",height:"60",alt:"Loading...."}),Object(h.jsx)("p",{className:"mb-0",children:"Loading Requests"})]})}),children:Object(h.jsxs)("div",{className:"Left RequestsList",children:[Object(h.jsx)("button",{onClick:gt,className:"btn btn-sm collapseBtn btn-dark",children:Object(h.jsx)("i",{className:"las la-chevron-left"})}),re.map((function(e,t){var n=new Date(e.request_date);return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)(m,{data:e,date:n,EmpData:at,ViewRequestDetails:bt},t)})}))]})}),Object(h.jsxs)("div",{className:"Right RequestDetails",children:[Object(h.jsxs)("div",{className:"PreviewWindow",children:[Object(h.jsx)("button",{onClick:gt,className:"btn btn-sm openBtn btn-dark mb-2",children:Object(h.jsx)("i",{className:"las la-chevron-down"})}),Object(h.jsx)(p.b,{exact:!0,path:"/purchaseorder/home",render:function(){return Object(h.jsx)(s.Suspense,{fallback:Object(h.jsx)("div",{className:"w-100 d-flex justify-content-center mt-5",children:Object(h.jsxs)("div",{children:[Object(h.jsx)("img",{className:"rounded-circle",src:u.a,width:"60",height:"60",alt:"Loading...."}),Object(h.jsx)("p",{className:"mb-0",children:"Please Wait"})]})}),children:Object(h.jsx)(f,{ViewRequest:re,CountRequests:re.length,CountStatus:ue,MonthlyRequests:P,EmpData:at})})}}),Object(h.jsx)(p.b,{exact:!0,path:"/purchaseorder/window=purchaseorder&&id=:id",render:function(){return Object(h.jsx)(s.Suspense,{fallback:Object(h.jsx)("div",{className:"w-100 d-flex justify-content-center mt-5",children:Object(h.jsxs)("div",{children:[Object(h.jsx)("img",{className:"rounded-circle",src:u.a,width:"60",height:"60",alt:"Loading...."}),Object(h.jsx)("p",{className:"mb-0",children:"Please Wait"})]})}),children:Object(h.jsx)(x,{PurchaseOrderDetails:xe})})}}),Object(h.jsx)(p.b,{exact:!0,path:"/purchaseorder/window=purchaserequisition&&id=:id",render:function(){return Object(h.jsx)(s.Suspense,{fallback:Object(h.jsx)("div",{className:"w-100 d-flex justify-content-center mt-5",children:Object(h.jsxs)("div",{children:[Object(h.jsx)("img",{className:"rounded-circle",src:u.a,width:"60",height:"60",alt:"Loading...."}),Object(h.jsx)("p",{className:"mb-0",children:"Please Wait"})]})}),children:Object(h.jsx)(v,{PurchaseRequisitionDetails:Ne})})}}),Object(h.jsx)(p.b,{exact:!0,path:"/purchaseorder/window=quotations&&id=:id",render:function(){return Object(h.jsx)(s.Suspense,{fallback:Object(h.jsx)("div",{className:"w-100 d-flex justify-content-center mt-5",children:Object(h.jsxs)("div",{children:[Object(h.jsx)("img",{className:"rounded-circle",src:u.a,width:"60",height:"60",alt:"Loading...."}),Object(h.jsx)("p",{className:"mb-0",children:"Please Wait"})]})}),children:Object(h.jsx)(g,{List:he,AttachQuotations:qe,QuotationPreview:Be,PreviewQuotation:pt})})}}),Object(h.jsx)(p.b,{exact:!0,path:"/purchaseorder/window=bills&&id=:id",render:function(){return Object(h.jsx)(s.Suspense,{fallback:Object(h.jsx)("div",{className:"w-100 d-flex justify-content-center mt-5",children:Object(h.jsxs)("div",{children:[Object(h.jsx)("img",{className:"rounded-circle",src:u.a,width:"60",height:"60",alt:"Loading...."}),Object(h.jsx)("p",{className:"mb-0",children:"Please Wait"})]})}),children:Object(h.jsx)(w,{AttachBills:Ee,BillPreview:Te,PreviewBill:ht})})}}),Object(h.jsx)(p.b,{exact:!0,path:"/purchaseorder/window=vouchers&&id=:id",render:function(){return Object(h.jsx)(s.Suspense,{fallback:Object(h.jsx)("div",{className:"w-100 d-flex justify-content-center mt-5",children:Object(h.jsxs)("div",{children:[Object(h.jsx)("img",{className:"rounded-circle",src:u.a,width:"60",height:"60",alt:"Loading...."}),Object(h.jsx)("p",{className:"mb-0",children:"Please Wait"})]})}),children:Object(h.jsx)(N,{Details:he,AttachVouchers:Qe,VoucherPreview:Xe,PreviewVoucher:Ot,onAttachVouchers:mt,RemoveVoucher:ft})})}})]}),Object(h.jsx)("div",{className:"POControls",children:"home"!==window.location.href.split("/").pop()?Object(h.jsxs)("div",{className:"btn-group",children:[Object(h.jsx)("button",{className:"btn firstBtn",onClick:function(){return ct.replace("/purchaseorder/window=purchaseorder&&id="+De)},children:"Purchase Order"}),Ne.info[0]?Object(h.jsx)("button",{className:"btn secondBtn",onClick:function(){return ct.replace("/purchaseorder/window=purchaserequisition&&id="+De)},children:"Purchase Requisition"}):null,qe.length>0?Object(h.jsx)("button",{className:"btn thirdBtn",onClick:function(){return ct.replace("/purchaseorder/window=quotations&&id="+De)},children:"Quotations"}):null,Object(h.jsx)("button",{className:"btn forthBtn",onClick:function(){return ct.replace("/purchaseorder/window=bills&&id="+De)},children:"Bills"}),Object(h.jsx)("button",{className:"btn firstBtn",onClick:function(){return ct.replace("/purchaseorder/window=vouchers&&id="+De)},children:"Vouchers"}),Object(h.jsx)("button",{className:"btn secondBtn",onClick:function(){return function(e){var t=document.getElementById("po");t.contentWindow.print(),setTimeout((function(){t.contentWindow.print()}),500)}()},children:"Print"}),he[0]&&("Viewed"===he[0].status||"Sent"===he[0].status)&&at.access&&(JSON.parse(at.access).includes(523)||JSON.parse(at.access).includes(524)||JSON.parse(at.access).includes(1))?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("button",{className:"btn btn-sm fifthBtn",onClick:function(){return e=window.location.href.split("/").pop().split("id=").pop(),D(Object(h.jsxs)("div",{children:[Object(h.jsx)("p",{children:"Do you want to discard this request?"}),Object(h.jsxs)("form",{onSubmit:function(t){return xt(e,t)},children:[Object(h.jsx)("textarea",{style:{fontSize:"13px"},name:"remarks",className:"form-control mb-3",placeholder:"Add Remarks",required:!0,minLength:"10"}),Object(h.jsx)("button",{type:"submit",className:"btn btn-sm btn-danger d-block ml-auto px-3",children:"Yes"})]})]})),void rt();var e},children:"Discard"}),Object(h.jsx)("button",{className:"btn btn-sm sixthBtn",onClick:function(){return e=window.location.href.split("/").pop().split("id=").pop(),void(0===Qe.length?i.b.dark("Please attach at least one voucher",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}):(D(Object(h.jsxs)("div",{children:[Object(h.jsx)("p",{children:"Do you want to approve this request?"}),Object(h.jsxs)("form",{onSubmit:function(t){return vt(e,t)},children:[Object(h.jsx)("textarea",{style:{fontSize:"13px"},name:"remarks",className:"form-control mb-3",placeholder:"Add Remarks",required:!0,minLength:"10"}),Object(h.jsx)("button",{type:"submit",className:"btn btn-sm btn-success d-block ml-auto px-3",children:"Yes"})]})]})),rt()));var e},children:"Approve"})]}):null]}):null})]})]})]})}},93:function(e,t,n){"use strict";n(1),n(99);var a=n(0);t.a=function(e){return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("div",{className:"Attandence_Request_Div",style:{display:e.show?"flex":"none"},children:[Object(a.jsx)("div",{className:"dark",onClick:e.Hide}),Object(a.jsx)("div",{style:{animationDelay:"0.1".toString()+"s"},className:e.show?"Attandence_Request_Div_Content Attandence_Request_Div_Content2":"Attandence_Request_Div_Content",children:e.content})]})})}},99:function(e,t,n){}}]);
//# sourceMappingURL=35.5e1758e5.chunk.js.map