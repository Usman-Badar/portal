(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[78],{614:function(e,t,c){},691:function(e,t,c){"use strict";c.r(t);c(1),c(614);var s=c(0);t.default=function(e){var t=new Date;return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("div",{className:"PR_printUI",children:Object(s.jsxs)("div",{className:"PR_printUI_Div",children:[Object(s.jsx)("h3",{className:"font-weight-bolder text-center",children:"Purchase Requisition"}),Object(s.jsxs)("div",{className:"PR_printUI_Top mt-5",children:[Object(s.jsxs)("div",{children:[Object(s.jsxs)("div",{className:"PR_printUI_Top_select mb-2",children:[Object(s.jsx)("div",{className:"d-flex align-items-center",children:Object(s.jsx)("p",{className:"font-weight-bolder",children:"Comapny Name : "})}),Object(s.jsx)("div",{children:Object(s.jsxs)("select",{className:"form-control selects",name:"EmployeeCompany",onChange:function(t){return e.onCompanyChange(t.target.value)},children:[Object(s.jsx)("option",{value:"",children:"Select The Option"}),e.Companies.map((function(e){return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("option",{value:e.company_code,children:e.company_name})})}))]})})]}),Object(s.jsxs)("div",{className:"PR_printUI_Top_select",children:[Object(s.jsx)("div",{className:"d-flex align-items-center",children:Object(s.jsx)("p",{className:"font-weight-bolder mr-3",children:"Delivery / Work Location : "})}),Object(s.jsx)("div",{children:Object(s.jsxs)("select",{className:"form-control selects",name:"EmployeeLocation",onChange:function(t){return e.onLocationChange(t.target.value)},children:[Object(s.jsx)("option",{value:"",children:"Select The Option"}),e.Locations.map((function(e){return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("option",{value:e.location_code,children:e.location_name})})}))]})})]})]}),Object(s.jsxs)("div",{children:[Object(s.jsxs)("div",{className:"PR_printUI_Top_select mb-2",children:[Object(s.jsx)("div",{className:"d-flex align-items-center justify-content-center",children:Object(s.jsx)("p",{className:"font-weight-bolder",children:"PR Number  "})}),Object(s.jsx)("div",{children:Object(s.jsx)("input",{type:"text",disabled:!0,className:"form-control selects",value:e.PurchaseRequisitionCode})})]}),Object(s.jsxs)("div",{className:"PR_printUI_Top_select",children:[Object(s.jsx)("div",{className:"d-flex align-items-center justify-content-center",children:Object(s.jsx)("p",{className:"font-weight-bolder",children:" Date "})}),Object(s.jsx)("div",{children:Object(s.jsx)("input",{type:"text",value:t.toDateString(),disabled:!0,className:"form-control"})})]})]})]}),Object(s.jsxs)("div",{className:"PR_printUI_Middle",children:[Object(s.jsxs)("div",{className:"PR_printUI_Grid",style:{backgroundColor:"rgb(243, 243, 243)"},children:[Object(s.jsx)("div",{children:Object(s.jsx)("p",{className:"font-weight-bolder",children:"No"})}),Object(s.jsx)("div",{children:Object(s.jsxs)("p",{className:"font-weight-bolder",children:["Description ",Object(s.jsx)("sub",{className:"d-block",children:"(include specification required)"})," "]})}),Object(s.jsx)("div",{children:Object(s.jsx)("p",{className:"font-weight-bolder",children:"Reason"})}),Object(s.jsx)("div",{children:Object(s.jsx)("p",{className:"font-weight-bolder",children:"Quantity"})}),Object(s.jsx)("div",{children:Object(s.jsxs)("p",{className:"font-weight-bolder",children:["Estimated Cost ",Object(s.jsx)("sub",{children:"(PKR)"})," "]})}),Object(s.jsx)("div",{children:Object(s.jsx)("p",{className:"font-weight-bolder",children:"Total Cost"})})]}),e.Items.map((function(t,c){return Object(s.jsxs)("div",{id:"Item"+c,className:"PR_printUI_Grid MyItems MyItems"+c,onDoubleClick:function(){return e.OnEdit(c)},onContextMenu:function(){return e.onDelete(c)},children:[Object(s.jsxs)("div",{children:[" ",Object(s.jsxs)("p",{children:[" ",c+1," "]}),"  "]}),Object(s.jsxs)("div",{children:[" ",Object(s.jsxs)("p",{children:[" ",t.description," "]})]}),Object(s.jsxs)("div",{children:[" ",Object(s.jsxs)("p",{children:[" ",t.reason," "]})]}),Object(s.jsxs)("div",{children:[" ",Object(s.jsxs)("p",{children:[" ",t.quantity," "]})," "]}),Object(s.jsxs)("div",{children:[" ",Object(s.jsxs)("p",{children:[" ",t.price," "]})," "]}),Object(s.jsxs)("div",{children:[" ",Object(s.jsxs)("p",{children:[" ","Rs "+t.amount.toLocaleString("en-US")," "]})," "]})]},c)})),Object(s.jsxs)("div",{className:"PR_printUI_Grid",children:[Object(s.jsx)("div",{className:"d-flex align-items-center justify-content-center",children:Object(s.jsx)("p",{children:e.Items.length+1})}),Object(s.jsx)("div",{children:Object(s.jsx)("textarea",{className:"form-control",onChange:e.onChnageHandler,onKeyDown:e.AddItem,value:e.Item.description,name:"description"})}),Object(s.jsxs)("div",{children:[Object(s.jsx)("textarea",{className:"form-control",onChange:e.onChnageHandler,onKeyDown:e.AddItem,value:e.Item.reason,name:"reason"}),Object(s.jsx)("p",{className:"err_reason text-danger"})]}),Object(s.jsx)("div",{children:Object(s.jsx)("input",{type:"text",className:"form-control",placeholder:"0",onChange:e.onChnageHandler,onKeyDown:e.AddItem,value:e.Item.quantity,pattern:"[0-9]+",name:"quantity"})}),Object(s.jsx)("div",{children:Object(s.jsx)("input",{type:"text",className:"form-control",placeholder:"0",onChange:e.onChnageHandler,onKeyDown:e.AddItem,value:e.Item.price,pattern:"[0-9]+",name:"price"})}),Object(s.jsx)("div",{children:Object(s.jsx)("input",{type:"text",className:"form-control",placeholder:"0",value:"Rs "+e.Amount.toLocaleString("en-US"),pattern:"[0-9]+",name:"itemAmount",disabled:!0})})]}),Object(s.jsxs)("div",{className:"PR_printUI_Grid",children:[Object(s.jsx)("div",{}),Object(s.jsx)("div",{style:{backgroundColor:"rgb(243, 243, 243)"},children:Object(s.jsx)("p",{className:"font-weight-bolder text-right mr-2",children:"Total :"})}),Object(s.jsx)("div",{}),Object(s.jsx)("div",{}),Object(s.jsx)("div",{}),Object(s.jsx)("div",{children:Object(s.jsx)("p",{children:"Rs "+e.Total.toLocaleString("en-US")})})]})]}),Object(s.jsxs)("div",{className:"w-100",children:[Object(s.jsxs)("div",{className:"PR_printUI_Remarks mt-4",style:{backgroundColor:"rgb(243, 243, 243)"},children:[Object(s.jsx)("div",{className:"DIVS",children:Object(s.jsx)("p",{className:"font-weight-bolder",children:"Requested By"})}),Object(s.jsx)("div",{className:"DIVS",children:Object(s.jsx)("p",{className:"font-weight-bolder",children:"Submitted To"})}),Object(s.jsx)("div",{className:"DIVS",children:Object(s.jsx)("p",{className:"font-weight-bolder",children:"Approved By"})})]}),Object(s.jsxs)("div",{className:"PR_printUI_Remarks PR_printUI_Remark",children:[Object(s.jsxs)("div",{children:[Object(s.jsxs)("div",{className:"DIVS",children:[Object(s.jsx)("p",{className:"font-weight-bolder ",children:"Name : "}),Object(s.jsx)("p",{children:e.RequestedBy.length>0?e.RequestedBy:e.Data.name})]}),Object(s.jsxs)("div",{className:"DIVS",children:[Object(s.jsx)("p",{className:"font-weight-bolder",children:"Date : "}),Object(s.jsx)("p",{children:t.toDateString()})]})]}),Object(s.jsxs)("div",{children:[Object(s.jsxs)("div",{className:"DIVS",children:[Object(s.jsx)("p",{className:"font-weight-bolder",children:"Name : "}),Object(s.jsx)("p",{})]}),Object(s.jsxs)("div",{className:"DIVS",children:[Object(s.jsx)("p",{className:"font-weight-bolder",children:"Date : "}),Object(s.jsx)("p",{})]})]}),Object(s.jsxs)("div",{children:[Object(s.jsxs)("div",{className:"DIVS",children:[Object(s.jsx)("p",{className:"font-weight-bolder",children:"Name : "}),Object(s.jsx)("p",{})]}),Object(s.jsxs)("div",{className:"DIVS",children:[Object(s.jsx)("p",{className:"font-weight-bolder",children:"Date : "}),Object(s.jsx)("p",{})]})]})]})]})]})})})}}}]);
//# sourceMappingURL=78.db41984e.chunk.js.map