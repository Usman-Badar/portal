(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[91],{629:function(e,t,s){},689:function(e,t,s){"use strict";s.r(t);s(1),s(629),s(79),s(27),s(28);var c=s(0);t.default=function(e){var t=e.Specifications,s=e.Requests,i=e.Details,a=e.Comments,d=e.OpenRequest,l=e.newComment,j=e.CloseRequest,r=e.issueToInventory;return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{className:"inventory_requests_page",children:Object(c.jsxs)("div",{className:"inventory_requests_page_content",children:[Object(c.jsxs)("h3",{className:"heading",children:["Inventory Requests",Object(c.jsx)("sub",{children:"Item Requirements"})]}),Object(c.jsx)("hr",{}),i?Object(c.jsx)(n,{details:i[0][0],specifications:i[1],Comments:a,Details:i,newComment:l,issueToInventory:r,CloseRequest:j}):s?0===s.length?Object(c.jsx)("h6",{className:"text-center",children:"No Request Found"}):Object(c.jsxs)("table",{className:"table table-bordered tbl table-hover",children:[Object(c.jsx)("thead",{children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Sr.No"}),Object(c.jsx)("th",{children:"Requested By"}),Object(c.jsx)("th",{children:"Request Date/Time"}),Object(c.jsx)("th",{children:"Status"}),Object(c.jsx)("th",{children:"Required Items"})]})}),Object(c.jsx)("tbody",{children:s.map((function(e,s){var n=[];if(t)for(var i=0;i<t.length;i++)t[i].request_id===e.id&&n.push(Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)("span",{children:[t[i].name," : ",Object(c.jsx)("b",{children:t[i].assigned_quantity})," Qty"]})," ",Object(c.jsx)("br",{})]}));return Object(c.jsxs)("tr",{title:"Double Click To View",onDoubleClick:function(){return d(s)},children:[Object(c.jsx)("td",{children:s+1}),Object(c.jsxs)("td",{children:[Object(c.jsx)("b",{children:e.sender_name}),Object(c.jsx)("br",{}),Object(c.jsx)("span",{children:e.sender_designation})]}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{className:"status_column",children:e.accepted_by?e.issued?Object(c.jsx)("span",{className:"badge badge-pill px-3 badge-green",children:" Issued "}):Object(c.jsx)("span",{className:"badge badge-pill px-3 badge-dark",children:" Viewed "}):Object(c.jsx)("span",{className:"badge badge-pill px-3 badge-danger",children:" Pending "})}),new Date(e.request_date).toDateString(),Object(c.jsx)("br",{}),e.request_time]}),Object(c.jsx)("td",{children:e.accepted_by?e.issued?Object(c.jsx)("span",{className:"badge badge-pill px-3 badge-green",children:" Issued "}):Object(c.jsx)("span",{className:"badge badge-pill px-3 badge-dark",children:" Viewed "}):Object(c.jsx)("span",{className:"badge badge-pill px-3 badge-danger",children:" Pending "})}),Object(c.jsx)("td",{children:n})]},s)}))})]}):Object(c.jsx)("h6",{className:"text-center",children:"Loading Requests..."})]})})})};var n=function(e){var t=e.details,s=e.specifications,n=(e.Comments,e.Details,e.newComment,e.issueToInventory),i=e.CloseRequest;return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{className:"details",children:Object(c.jsxs)("div",{children:[Object(c.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[Object(c.jsx)("h5",{className:"mb-0",children:"Request Details & Specifications"}),Object(c.jsx)("button",{className:"btn submit d-flex align-items-center",onClick:i,children:"Go Back"})]}),Object(c.jsx)("hr",{}),Object(c.jsx)("table",{className:"table table-sm table-bordered tbl",children:Object(c.jsxs)("tbody",{children:[Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"bg-light",children:"Requested By"}),Object(c.jsx)("td",{children:t.sender_name})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"bg-light",children:"Request Date/Time"}),Object(c.jsx)("td",{children:new Date(t.request_date).toDateString()+" at "+t.request_time})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"bg-light",children:"Viewed By"}),Object(c.jsx)("td",{children:t.receiver_name?t.receiver_name:"N"})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"bg-light",children:"View Date/Time"}),Object(c.jsx)("td",{children:t.accept_date?new Date(t.accept_date).toDateString()+" at "+t.accept_time:"N"})]})]})}),Object(c.jsx)("br",{}),Object(c.jsx)("div",{className:"products_div",children:Object(c.jsxs)("table",{className:"table table-bordered product_tbl",children:[Object(c.jsx)("thead",{className:"thead-light",children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Sr.No"}),Object(c.jsx)("th",{children:"Product"}),Object(c.jsx)("th",{children:"Description"}),Object(c.jsx)("th",{children:"Company"}),Object(c.jsx)("th",{children:"Location"}),Object(c.jsx)("th",{children:"Sub Location"}),Object(c.jsx)("th",{children:"Required Quantity"}),Object(c.jsx)("th",{children:"Stored Quantity"})]})}),Object(c.jsx)("tbody",{children:s.map((function(e,t){return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{children:t+1}),Object(c.jsx)("td",{children:e.name}),Object(c.jsx)("td",{children:e.description}),Object(c.jsxs)("td",{children:[e.company_name,Object(c.jsxs)("div",{className:"location_name_column",children:[Object(c.jsx)("b",{children:"Location Name"})," ",Object(c.jsx)("br",{}),Object(c.jsx)("span",{children:e.location_name})]}),Object(c.jsxs)("div",{className:"sub_location_name_column",children:[Object(c.jsx)("b",{children:"Sub Location Name"})," ",Object(c.jsx)("br",{}),Object(c.jsx)("span",{children:e.sub_location_name})]})]}),Object(c.jsx)("td",{children:e.location_name}),Object(c.jsx)("td",{children:e.sub_location_name}),Object(c.jsx)("td",{children:e.assigned_quantity}),Object(c.jsx)("td",{children:e.current_stored_quantity})]},t)}))})]})}),t.issued?null:Object(c.jsx)("button",{className:"btn btn-sm submit d-block mx-auto px-4",onDoubleClick:function(){return n(t.request_id,t.id)},title:"Double click to issue",children:"Double Click To Issue"})]})})})}}}]);