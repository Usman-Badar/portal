(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[93],{470:function(e,t,a){"use strict";a.r(t);a(1),a(471);var s=a(17),c=a(0);t.default=function(e){var t="var(--blue)",a=e.data.status;return"Approved"!==e.data.status&&"Delivered"!==e.data.status||(t="var(--success)",a="Approved By accounts"),"Rejected"===e.data.status&&(t="var(--orange)",a=null===e.data.forward_by?"Rejected by inventory":"Rejected by accounts"),"Waiting For Approval"===e.data.status&&(t="var(--c-green)",1!==e.EmpData.department_code?a="Transferred to accounts":1===e.EmpData.department_code&&(a="Received")),"Sent"===e.data.status&&(1!==e.EmpData.department_code?a="Received":1===e.EmpData.department_code&&(a="Received at inventory")),"Viewed"===e.data.status&&1===e.EmpData.department_code&&(a="Viewed at inventory"),Object(c.jsxs)("div",{className:"ViewPrRequests_div",children:[Object(c.jsx)("div",{className:"d-flex align-items-center justify-content-between",children:Object(c.jsxs)("div",{className:"d-flex align-items-center",children:[Object(c.jsx)("img",{src:"images/employees/"+e.data.emp_image,alt:""}),Object(c.jsxs)("div",{children:[Object(c.jsxs)("p",{className:"font-weight-bolder",children:[" ",e.data.name," "]}),Object(c.jsx)("p",{style:{backgroundColor:t,fontSize:"10px"},className:"text-white text-center rounded-pill px-1",children:a})]})]})}),Object(c.jsx)("div",{className:"py-2",children:Object(c.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(c.jsxs)("div",{children:[Object(c.jsx)("p",{className:"font-weight-bolder",children:"Request Date"}),Object(c.jsx)("p",{children:e.date.toDateString()})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("p",{className:"font-weight-bolder",children:"Total"}),Object(c.jsxs)("p",{children:[" Rs ",e.data.total.toLocaleString("en-US")," "]})]})]})}),Object(c.jsxs)("div",{className:"d-flex align-items-center bg-light py-2 px-1 rounded",children:[Object(c.jsx)("i",{class:"las la-map-marker-alt"}),Object(c.jsxs)("div",{children:[Object(c.jsx)("p",{className:"font-weight-bolder",children:e.data.company_name}),Object(c.jsx)("p",{children:e.data.location_name})]})]}),Object(c.jsx)("div",{className:"ViewPrRequests_button",onClick:function(){return e.ViewTheRequest(e.data.pr_id,e.data.status)},children:Object(c.jsx)(s.b,{className:"btn",to:"/purchaserequisition/view=purchase_requisition&&id="+e.data.pr_id,children:"View"})})]},e.key)}},471:function(e,t,a){}}]);