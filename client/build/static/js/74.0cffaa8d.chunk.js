(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[74],{758:function(e,t,a){},804:function(e,t,a){"use strict";a.r(t);a(1),a(758);var s=a(17),c=a(0);t.default=function(e){var t="#0eb8de",a=e.data.status;return"Approved"!==e.data.status&&"Delivered"!==e.data.status||(t="#307365",a="Approved By accounts"),"Rejected"===e.data.status&&(t="#d19399",a="Rejected by accounts"),"Waiting For Approval"===e.data.status&&(t="#fc9701",a="Received"),"Sent"===e.data.status&&(a="Received"),"Viewed"===e.data.status&&(a="Viewed"),Object(c.jsxs)("div",{className:"ViewPoRequests_div",children:[Object(c.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[Object(c.jsxs)("div",{className:"d-flex align-items-center w-75",children:[Object(c.jsx)("img",{src:"images/employees/"+e.data.emp_image,alt:""}),Object(c.jsxs)("div",{children:[Object(c.jsxs)("p",{className:"font-weight-bolder",children:[" ",e.data.name," "]}),Object(c.jsxs)("p",{children:[" ",e.data.designation_name+" in "+e.data.department_name+" Department, "+e.data.company_name," "]})]})]}),Object(c.jsxs)("div",{className:"w-25",children:[Object(c.jsx)("p",{className:"font-weight-bolder",children:"Total"}),Object(c.jsxs)("p",{children:[" Rs ",e.data.total.toLocaleString("en-US")]})]})]}),Object(c.jsx)("div",{className:"py-3",children:Object(c.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(c.jsxs)("div",{children:[Object(c.jsx)("p",{className:"font-weight-bolder",children:"Date"}),Object(c.jsx)("p",{children:e.date.toDateString()})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("p",{className:"font-weight-bolder",children:"Status"}),Object(c.jsx)("p",{style:{backgroundColor:t,fontSize:"10px"},className:"text-white text-center rounded-pill px-2",children:a})]})]})}),Object(c.jsxs)("div",{className:"d-flex align-items-center",children:[Object(c.jsx)("i",{class:"las la-map-marker-alt"}),Object(c.jsxs)("div",{children:[Object(c.jsx)("p",{className:"font-weight-bolder",children:e.data.company_name}),Object(c.jsx)("p",{children:e.data.location_name})]})]}),Object(c.jsx)("div",{className:"ViewPoRequests_button",onClick:function(){return e.ViewRequestDetails(e.data.po_id,e.data.status)},children:Object(c.jsx)(s.b,{className:"btn",to:"/purchaseorder/window=purchaseorder&&id="+e.data.po_id,children:"View"})})]},e.key)}}}]);
//# sourceMappingURL=74.0cffaa8d.chunk.js.map