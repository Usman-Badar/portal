(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[11],{11:function(e,t,c){"use strict";var n=c(37),s=c.n(n).a.create({baseURL:"http://202.63.220.170:3443"});t.a=s},27:function(e,t,c){"use strict";var n=c(4),s=c(1),r=(c(45),c(0));t.a=function(e){var t=Object(s.useState)(!1),c=Object(n.a)(t,2),j=c[0],i=c[1],a=Object(s.useState)({icon:"",txt:""}),d=Object(n.a)(a,2),b=d[0],l=d[1],o=Object(s.useState)({}),x=Object(n.a)(o,2),O=x[0],h=x[1];return Object(s.useEffect)((function(){i(e.display),h(e.styling);var t=0,c=e.txt?e.txt:"",n="";!function s(){t<c.length&&(n+=c.charAt(t),l({icon:e.icon,txt:n}),t++,setTimeout(s,80))}()}),[e.display,e.styling,e.icon,e.txt]),Object(r.jsx)(r.Fragment,{children:j?Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("div",{className:"Loading d-center text-center",style:O,children:Object(r.jsxs)("div",{children:[b.icon,Object(r.jsx)("p",{className:"text-center mb-0",children:b.txt})]})})}):null})}},28:function(e,t,c){"use strict";t.a=c.p+"static/media/icons8-loading-circle.7747c0cb.gif"},43:function(e,t,c){},44:function(e,t,c){},45:function(e,t,c){},47:function(e,t,c){},65:function(e,t,c){},66:function(e,t,c){},67:function(e,t,c){},68:function(e,t,c){},77:function(e,t,c){},78:function(e,t,c){"use strict";c.r(t);var n=c(1),s=c.n(n),r=c(14),j=c.n(r),i=(c(43),c(44),c(3)),a=c(27),d=c(4),b=(c(47),c.p+"static/media/QFS-LOGO.a4ccc54a.PNG"),l=c.p+"static/media/SEABOARD-SERVICES.b1cc0596.PNG",o=c.p+"static/media/SBL-LOGO.3e8ecf8d.PNG",x=c(11),O=c(0),h=function(e){var t=Object(n.useState)({info:[],specifications:[],venders:[],pr_id:null}),c=Object(d.a)(t,2),s=c[0],r=c[1];Object(n.useEffect)((function(){var e=window.location.href.split("/")[window.location.href.split("/").length-2],t=window.location.href.split("/").pop();x.a.post("/getpurchaseorderdetails",{po_id:e,pr_id:0===t||"0"===t?null:t}).then((function(e){r({info:e.data[0],specifications:e.data[1],venders:e.data[3],pr_id:e.data[4].length>0?e.data[4][0].pr_code:null})})).catch((function(e){console.log(e)}))}),[window.location.href.split("/").pop()]);for(var j=[],i=1;i<=12;i++)j.push(15*i);return Object(O.jsx)(O.Fragment,{children:s.info.map((function(t,c){var n=new Date(t.approve_date),r=new Date(t.discard_date),i=new Date(t.request_date);return Object(O.jsx)("div",{id:"PrintDiv",style:{width:"100%",height:"100vh"},className:"PO_PrintUI",children:Object(O.jsxs)("div",{className:"PO_PrintUI_Div",children:[Object(O.jsxs)("div",{className:"PO_PrintUI_header",children:[Object(O.jsx)("h1",{className:" font-weight-bolder text-center",style:{textDecoration:"underline"},children:"Seaboard Group"}),Object(O.jsxs)("div",{className:"PO_PrintUI_Logos",children:[Object(O.jsx)("div",{children:Object(O.jsx)("img",{src:b,alt:"QFS Logo"})}),Object(O.jsx)("div",{children:Object(O.jsx)("img",{src:l,alt:"SBS Logo"})}),Object(O.jsx)("div",{children:Object(O.jsx)("img",{src:o,alt:"SBL Logo"})})]}),Object(O.jsx)("h3",{className:"font-weight-bolder text-center",style:{textDecoration:"underline"},children:"Purchase Order"}),Object(O.jsxs)("div",{className:"PO_PrintUI_Top mt-5",children:[Object(O.jsxs)("div",{children:[Object(O.jsxs)("p",{className:"font-weight-bolder mr-3",children:[" ",t.po_company_name," "]}),Object(O.jsxs)("p",{className:"font-weight-bolder mr-3",children:[" ",t.location_address," "]}),Object(O.jsxs)("p",{className:"font-weight-bolder mr-3",children:["Phone: ",t.location_phone," "]}),Object(O.jsxs)("p",{className:"font-weight-bolder mr-3",children:["Website: ",t.company_website]})]}),Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"d-flex border",children:[Object(O.jsx)("div",{className:"border-right w-50 text-center",children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"PR Number   "})}),Object(O.jsx)("div",{className:"text-center w-50",children:Object(O.jsx)("p",{children:null===s.pr_id?"NO PURCHASE REQUISITION":s.pr_id})})]}),Object(O.jsxs)("div",{className:"d-flex border",children:[Object(O.jsx)("div",{className:"border-right w-50 text-center",children:Object(O.jsx)("p",{className:"font-weight-bolder",children:" Date  "})}),Object(O.jsx)("div",{className:"text-center w-50",children:Object(O.jsx)("p",{children:i.toDateString()})})]}),Object(O.jsxs)("div",{className:"d-flex border",children:[Object(O.jsx)("div",{className:"border-right w-50 text-center",children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"PO Number  "})}),Object(O.jsx)("div",{className:"text-center w-50",children:Object(O.jsxs)("p",{children:[" ",t.po_code," "]})})]})]})]})]}),Object(O.jsxs)("div",{className:"PO_PrinUI_Content",children:[Object(O.jsxs)("div",{className:"PO_PrinUI_Venders",children:[Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{style:{backgroundColor:"rgb(243, 243, 243)"},children:Object(O.jsx)("p",{className:"font-weight-bolder pl-2",children:"Venders"})}),s.venders.map((function(e,t){return Object(O.jsx)(O.Fragment,{children:Object(O.jsxs)("div",{className:"mb-2 pb-2 border-bottom",children:[Object(O.jsx)("p",{children:e.vender_name}),Object(O.jsx)("p",{children:e.vender_phone}),Object(O.jsx)("p",{children:e.vender_address})]})})}))]}),Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{style:{backgroundColor:"rgb(243, 243, 243)"},children:Object(O.jsx)("p",{className:"font-weight-bolder pl-2",children:"Ship TO:"})}),Object(O.jsxs)("p",{children:[" ",t.po_company_name," "]}),Object(O.jsxs)("p",{children:[" ",t.location_address," "]}),Object(O.jsxs)("p",{children:["Phone: ",t.location_phone," "]}),Object(O.jsxs)("p",{children:["Website: ",t.company_website]})]})]}),Object(O.jsxs)("div",{className:"PO_PrintUI_Middle",children:[Object(O.jsxs)("div",{className:"PO_PrintUI_Grid",style:{backgroundColor:"rgb(243, 243, 243)"},children:[Object(O.jsx)("div",{children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Sr No:"})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Description"})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Quantity"})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Unit Price"})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Total"})})]}),s.specifications.map((function(t,c){return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("div",{className:"PO_PrintUI_Grid PO_PrintUI_Grid_hover",onClick:function(){return e.clicked(c)},children:[Object(O.jsx)("div",{children:Object(O.jsx)("p",{children:c+1})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{children:t.description})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{children:t.quantity})}),Object(O.jsx)("div",{children:Object(O.jsxs)("p",{children:["Rs ",t.price.toLocaleString("en-US")]})}),Object(O.jsx)("div",{children:Object(O.jsxs)("p",{children:["Rs ",t.amount.toLocaleString("en-US")]})})]},c),j.includes(c)?Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("div",{style:{breakAfter:"page"}}),Object(O.jsx)("div",{style:{height:"30vh"}})]}):null]})})),Object(O.jsxs)("div",{className:"PO_PrintUI_Grid1",children:[Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{className:"Total",children:Object(O.jsx)("p",{children:"Sub Total"})}),Object(O.jsx)("div",{className:"Total",children:Object(O.jsx)("p",{children:"GST"})}),Object(O.jsx)("div",{className:"Total",children:Object(O.jsx)("p",{children:"Shipping"})}),Object(O.jsx)("div",{className:"Total",children:Object(O.jsx)("p",{children:"Others"})}),Object(O.jsx)("div",{className:"Total",children:Object(O.jsx)("p",{children:"Total"})})]}),Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{className:"Total",children:Object(O.jsxs)("p",{children:[" Rs ",t.total.toLocaleString("en-US")," "]})}),Object(O.jsx)("div",{className:"Total",children:Object(O.jsx)("p",{children:"-"})}),Object(O.jsx)("div",{className:"Total",children:Object(O.jsxs)("p",{children:[" Rs ",t.cartage.toLocaleString("en-US")," "]})}),Object(O.jsx)("div",{className:"Total",children:Object(O.jsxs)("p",{children:[" Rs ",t.others.toLocaleString("en-US")," "]})}),Object(O.jsx)("div",{className:"Total",children:Object(O.jsxs)("p",{children:[" Rs ",t.total.toLocaleString("en-US")," "]})})]})]})]}),Object(O.jsx)("div",{className:"PO_PrintUI_Bottom",children:Object(O.jsxs)("div",{className:"PO_PrintUI_CommentBox pb-4",children:[Object(O.jsx)("div",{style:{backgroundColor:"rgb(243, 243, 243)"},children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Comment and Special instruction"})}),Object(O.jsx)("div",{children:Object(O.jsxs)("p",{children:[" ",t.comments," "]})})]})})]}),Object(O.jsx)("div",{className:"PO_PrintUI_Footer",children:Object(O.jsxs)("div",{className:"w-100",children:[Object(O.jsxs)("div",{className:"PO_PrintUI_Remarks PR_printUI_Remark",style:{backgroundColor:"rgb(243, 243, 243)"},children:[Object(O.jsx)("div",{className:"DIVS",children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Sumbitted By"})}),Object(O.jsx)("div",{className:"DIVS",children:Object(O.jsxs)("p",{className:"font-weight-bolder",children:[" ",null===t.discard_by?"Approved By":"Discard By"," "]})})]}),Object(O.jsxs)("div",{className:"PO_PrintUI_Remarks",children:[Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"DIVS",children:[Object(O.jsx)("p",{className:"font-weight-bolder mr-3",children:"Name : "}),Object(O.jsxs)("p",{children:[" ",t.sender_name," "]})]}),Object(O.jsxs)("div",{className:"DIVS",children:[Object(O.jsx)("p",{className:"font-weight-bolder mr-3",children:"Date : "}),Object(O.jsx)("p",{children:i.toDateString()})]})]}),Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"DIVS",children:[Object(O.jsx)("p",{className:"font-weight-bolder mr-3",children:"Name : "}),Object(O.jsxs)("p",{children:[" ",null===t.discard_by?t.approve_emp_name:t.discard_emp_name," "]})]}),Object(O.jsxs)("div",{className:"DIVS",children:[Object(O.jsx)("p",{className:"font-weight-bolder mr-3",children:"Date : "}),Object(O.jsxs)("p",{children:[" ",null===t.discard_by?n.toDateString():r.toDateString()," "]})]})]})]})]})})]})},c)}))})},u=(c(65),c.p+"static/media/QFS-LOGO.a4ccc54a.PNG"),p=c.p+"static/media/SEABOARD-SERVICES.b1cc0596.PNG",m=c.p+"static/media/SBL-LOGO.3e8ecf8d.PNG",f=function(){var e=Object(n.useState)({info:[],specifications:[]}),t=Object(d.a)(e,2),c=t[0],s=t[1];Object(n.useEffect)((function(){var e=window.location.href.split("/").pop();x.a.post("/getpurchaseorderdetails",{pr_id:e,po_id:null}).then((function(e){s({info:e.data[4],specifications:e.data[5]})})).catch((function(e){console.log(e)}))}),[window.location.href.split("/").pop()]);for(var r=[],j=1;j<=12;j++)r.push(20*j);return Object(O.jsx)(O.Fragment,{children:c.info.map((function(e,t){var n=new Date(e.approve_date),s=new Date(e.discard_date),j=new Date(e.request_date),i=new Date(e.view_date);return Object(O.jsx)(O.Fragment,{children:Object(O.jsx)("div",{className:"PR_printUI",style:{fontFamily:"Poppins"},children:Object(O.jsxs)("div",{className:"PR_printUI_Div",children:[Object(O.jsxs)("div",{className:"PR_printUI_header",children:[Object(O.jsx)("h1",{className:" font-weight-bolder text-center",children:"Seaboard Group"}),Object(O.jsxs)("div",{className:"PR_printUI_Logos",children:[Object(O.jsx)("div",{children:Object(O.jsx)("img",{src:u,alt:"QFS Logo"})}),Object(O.jsx)("div",{children:Object(O.jsx)("img",{src:p,alt:"SBS Logo"})}),Object(O.jsx)("div",{children:Object(O.jsx)("img",{src:m,alt:"SBL Logo"})})]}),Object(O.jsx)("h3",{className:"font-weight-bolder text-center",children:"Purchase Requisition"}),Object(O.jsxs)("div",{className:"PR_printUI_Top mt-5",children:[Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"d-flex",children:[Object(O.jsx)("p",{className:"font-weight-bolder mr-3",children:"Comapny Name : "}),Object(O.jsx)("p",{children:e.pr_company_name})]}),Object(O.jsxs)("div",{className:"d-flex",children:[Object(O.jsx)("p",{className:"font-weight-bolder mr-3",children:"Delivery / Work Location : "}),Object(O.jsxs)("p",{children:[" ",e.location_name," "]})]})]}),Object(O.jsxs)("div",{className:"w-25",children:[Object(O.jsxs)("div",{className:"d-flex border py-1",children:[Object(O.jsx)("div",{className:"border-right w-50 text-center",children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"PR Number  "})}),Object(O.jsx)("div",{className:"text-center w-50",children:Object(O.jsx)("p",{children:e.pr_code})})]}),Object(O.jsxs)("div",{className:"d-flex border py-1",children:[Object(O.jsx)("div",{className:"border-right w-50 text-center",children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Date  "})}),Object(O.jsx)("div",{className:"text-center w-50",children:Object(O.jsx)("p",{children:j?j.toDateString():null})})]})]})]})]}),Object(O.jsx)("div",{className:"PR_prinUI_Content",children:Object(O.jsxs)("div",{className:"PR_printUI_Middle",children:[Object(O.jsxs)("div",{className:"PR_printUI_Grid",style:{backgroundColor:"rgb(243, 243, 243)"},children:[Object(O.jsx)("div",{children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Sr: No:"})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Description"})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Quantity"})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Estimated Cost"})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Total Cost"})})]}),c.specifications.map((function(e,t){return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("div",{className:"PR_printUI_Grid",children:[Object(O.jsx)("div",{children:Object(O.jsx)("p",{children:t+1})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{children:e.description})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{children:e.quantity})}),Object(O.jsx)("div",{children:Object(O.jsxs)("p",{children:["Rs ",e.price.toLocaleString("en-US")]})}),Object(O.jsx)("div",{children:Object(O.jsxs)("p",{children:["Rs ",e.amount.toLocaleString("en-US")]})})]},t),r.includes(t)?Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("div",{style:{breakAfter:"page"}}),Object(O.jsx)("div",{style:{height:"30vh"}})]}):null]})})),Object(O.jsxs)("div",{className:"PR_printUI_Grid",children:[Object(O.jsx)("div",{}),Object(O.jsx)("div",{style:{backgroundColor:"rgb(243, 243, 243)"},children:Object(O.jsx)("p",{className:"font-weight-bolder text-right mr-2",children:"Total :"})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{})}),Object(O.jsx)("div",{children:Object(O.jsx)("p",{})}),Object(O.jsx)("div",{children:Object(O.jsxs)("p",{children:["Rs ",e.total.toLocaleString("en-US")]})})]})]})}),Object(O.jsx)("div",{className:"PR_printUI_Footer",children:Object(O.jsxs)("div",{className:"w-100",children:[Object(O.jsxs)("div",{className:"PR_printUI_Remarks mt-4",style:{backgroundColor:"rgb(243, 243, 243)"},children:[Object(O.jsx)("div",{className:"DIVS",children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Sumbitted By"})}),null===e.discard_emp_name?Object(O.jsx)("div",{className:"DIVS",children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Approved By"})}):Object(O.jsx)("div",{className:"DIVS",children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Discard By"})}),Object(O.jsx)("div",{className:"DIVS",children:Object(O.jsx)("p",{className:"font-weight-bolder",children:"Submitted To"})})]}),Object(O.jsxs)("div",{className:"PR_printUI_Remarks PR_printUI_Remark",children:[Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"DIVS",children:[Object(O.jsx)("p",{className:"font-weight-bolder ",children:"Name : "}),Object(O.jsx)("p",{children:e.sender_name})]}),Object(O.jsxs)("div",{className:"DIVS",children:[Object(O.jsx)("p",{className:"font-weight-bolder",children:"Date : "}),Object(O.jsx)("p",{children:j.toDateString()})]})]}),null===e.discard_emp_name?Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"DIVS",children:[Object(O.jsx)("p",{className:"font-weight-bolder",children:"Name : "}),Object(O.jsxs)("p",{children:[" ",e.approve_emp_name]})]}),Object(O.jsxs)("div",{className:"DIVS",children:[Object(O.jsx)("p",{className:"font-weight-bolder",children:"Date : "}),Object(O.jsx)("p",{children:n.toDateString()})]})]}):Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"DIVS",children:[Object(O.jsx)("p",{className:"font-weight-bolder",children:"Name : "}),Object(O.jsxs)("p",{children:[" ",e.discard_emp_name]})]}),Object(O.jsxs)("div",{className:"DIVS",children:[Object(O.jsx)("p",{className:"font-weight-bolder",children:"Date : "}),Object(O.jsx)("p",{children:s.toDateString()})]})]}),Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"DIVS",children:[Object(O.jsx)("p",{className:"font-weight-bolder",children:"Name : "}),Object(O.jsx)("p",{children:"Antash Javaid"})]}),Object(O.jsxs)("div",{className:"DIVS",children:[Object(O.jsx)("p",{className:"font-weight-bolder",children:"Date : "}),Object(O.jsx)("p",{children:i.toDateString()})]})]})]})]})})]})})})}))})},v=(c(66),function(){var e=Object(n.useState)([]),t=Object(d.a)(e,2),c=t[0],s=t[1];return Object(n.useEffect)((function(){var e=window.location.href.split("/").pop();x.a.post("/getpurchaseorderdetails",{po_id:e,pr_id:null}).then((function(e){console.log(e.data),s(e.data[7])})).catch((function(e){console.log(e)}))}),[]),Object(O.jsx)(O.Fragment,{children:c.map((function(e){return Object(O.jsx)(O.Fragment,{children:Object(O.jsx)("div",{className:"Vouchers",children:Object(O.jsx)("div",{children:Object(O.jsx)("img",{src:"images/Inventory/po_vouchers/"+e.voucher,alt:"voucher"})})})})}))})}),_=(c(67),function(){var e=Object(n.useState)([]),t=Object(d.a)(e,2),c=t[0],s=t[1];return Object(n.useEffect)((function(){var e=window.location.href.split("/").pop();x.a.post("/getpurchaseorderdetails",{po_id:null,pr_id:e}).then((function(e){s(e.data[6])})).catch((function(e){console.log(e)}))}),[]),Object(O.jsx)(O.Fragment,{children:c.map((function(e){return Object(O.jsx)(O.Fragment,{children:Object(O.jsx)("div",{className:"Quatation",children:Object(O.jsx)("div",{children:Object(O.jsx)("img",{src:"images/Inventory/pr_attachments/"+e.image,alt:"Quatation"})})})})}))})}),g=(c(68),function(){var e=Object(n.useState)([]),t=Object(d.a)(e,2),c=t[0],s=t[1];return Object(n.useEffect)((function(){var e=window.location.href.split("/").pop();x.a.post("/getpurchaseorderdetails",{po_id:e,pr_id:null}).then((function(e){s(e.data[2])})).catch((function(e){console.log(e)}))}),[]),Object(O.jsx)(O.Fragment,{children:c.map((function(e){return Object(O.jsx)(O.Fragment,{children:Object(O.jsx)("div",{className:"Bills",children:Object(O.jsx)("div",{children:Object(O.jsx)("img",{src:"images/Inventory/po_attachments/"+e.image,alt:"Bills"})})})})}))})}),N=c(28),w=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(1),c.e(2),c.e(3),c.e(15)]).then(c.bind(null,702))})),S=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(1),c.e(2),c.e(3),c.e(14)]).then(c.bind(null,672))})),y=Object(n.lazy)((function(){return Promise.all([c.e(2),c.e(8),c.e(103)]).then(c.bind(null,673))})),P=Object(n.lazy)((function(){return c.e(51).then(c.bind(null,674))})),I=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(2),c.e(3),c.e(18)]).then(c.bind(null,675))})),D=Object(n.lazy)((function(){return c.e(106).then(c.bind(null,676))})),U=Object(n.lazy)((function(){return c.e(94).then(c.bind(null,677))})),R=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(1),c.e(2),c.e(8),c.e(98)]).then(c.bind(null,678))})),L=function(){c(69).config();var e=Object(O.jsx)(a.a,{display:!0,styling:{zIndex:1e5},icon:Object(O.jsx)("img",{src:N.a,className:"LoadingImg",alt:"LoadingIcon"}),txt:"Please Wait"}),t=function(t){return Object(O.jsxs)(n.Suspense,{fallback:e,children:[" ",t.content," "]})};return Object(O.jsx)(O.Fragment,{children:Object(O.jsxs)(i.d,{children:[Object(O.jsx)(i.a,{exact:!0,path:"/",to:"/login"}),Object(O.jsx)(i.b,{exact:!0,path:"/dashboard",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/chat",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/blackboard",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/outoflocation",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(U,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/login",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(w,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/logout",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(y,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/descuss_chat/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/purchaserequisition/view=:view",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/purchaserequisition/view=form",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/purchaserequisition/view=:view/:pr_id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/purchaserorder",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/purchaseorder/view=:view",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/purchaseorder/view=:view/:id/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/attdevices",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/guests",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/news",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/news/newspaper/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/help",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/drive",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/employeestickets",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/leave_form",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/avail_leave_form",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/short_leave_form",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/leave_history",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/leave_request/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/view_leave_requests",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/attendance_request",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/attendance_request/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/attendance_requests",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/view_employees_attendance",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/profile/:path/:link",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/empdailyattendance",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/admin_login",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(I,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/admin_logout",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(D,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/admin_module",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/admin_employement_requests",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/admin_employement_requests/admin_employement_setup",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/admin_employement_requests/admin_view_temp_employee/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/admin_employement_requests/confirmapproval/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/admin_companies",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/admin_locations",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/admin_departments",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/admin_departments/admin_designations/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/admin_users",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/admin_emp_attendance",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/createuser",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/menu_setup",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/misc_setup",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/configure_attendance_request",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(P,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/inventory/dashboard",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(R,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/inventory/assets",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(R,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/inventory/asset/id=:asset_id&&name=:asset_name&&view=:view",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(R,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/inventory/items_names",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(R,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/inventory/new_items_names",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(R,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/view=purchase_order/:id/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(h,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/view=purchase_requisition/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(f,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/view=quotations/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(_,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/view=bills/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(g,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/view=vouchers/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(v,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/purchaserequisition/home",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/purchaserequisition/view=:view&&id=:pr_id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/purchaseorder/home",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/purchaseorder/window=:view&&id=:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/employment_setup",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/employment_setup/:view",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/employment_setup/requests/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/employment_setup/requests/confirm/:id",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/store/:path",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/store/:path/index=:index",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/item_requests",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/item_requests/:path",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/item_requests/:path/index=:index",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}}),Object(O.jsx)(i.b,{exact:!0,path:"/repair_request",render:function(){return Object(O.jsx)(t,{content:Object(O.jsx)(S,{})})}})]})})},E=function(e){e&&e instanceof Function&&c.e(117).then(c.bind(null,679)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,r=t.getLCP,j=t.getTTFB;c(e),n(e),s(e),r(e),j(e)}))},T=(c(77),c(17)),q=c(16),F=c(9),k={UserData:{}},B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USRLOGIN":var c=t.payload.data;return Object(F.a)(Object(F.a)({},e),{},{UserData:c});default:return e}},V={EmployeeData:{},Relations:[],Menu:[],EmpLogin:!1},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"EMPLOGIN":var c=t.payload.data;return Object(F.a)(Object(F.a)({},e),{},{EmployeeData:c[0][0],Relations:c[1],Menu:c[2],EmpLogin:!0});default:return e}},G={ShowSideBar:!0},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SHOWSIDEBAR":var c=t.payload.data;return Object(F.a)(Object(F.a)({},e),{},{ShowSideBar:c});default:return e}},z={Data:[]},Q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHATBOT":var c=t.payload.data;return Object(F.a)(Object(F.a)({},e),{},{Data:c});default:return e}},M=Object(q.a)({UserAuth:B,EmpAuth:C,Chatbot:Q,SideBar:A}),W=Object(q.b)(M,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),X=c(25);W.subscribe((function(){return W.getState()})),j.a.render(Object(O.jsx)(s.a.StrictMode,{children:Object(O.jsx)(T.a,{children:Object(O.jsx)(X.a,{store:W,children:Object(O.jsx)(L,{})})})}),document.getElementById("root")),E()}},[[78,12,13]]]);