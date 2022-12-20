(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[38],{161:function(e,s,c){"use strict";s.a=c.p+"static/media/QFS-LOGO.d97e6918.PNG"},162:function(e,s,c){"use strict";s.a=c.p+"static/media/SBL-LOGO.3e8ecf8d.PNG"},163:function(e,s,c){"use strict";s.a=c.p+"static/media/SEABOARD-SERVICES.b1cc0596.PNG"},463:function(e,s,c){},464:function(e,s,c){},561:function(e,s,c){"use strict";c.r(s);var t=c(5),i=c(1),n=(c(463),c(11),c(161)),d=c(162),j=c(163),l=(c(464),c(0)),r=function(e){return Object(l.jsxs)("div",{className:"Vender",children:[Object(l.jsx)("p",{className:"font-weight-bold",children:e.name}),Object(l.jsx)("p",{children:e.phone}),Object(l.jsx)("p",{children:e.address})]},e.key)};s.default=function(e){var s=Object(i.useState)({info:[],specifications:[],venders:[]}),c=Object(t.a)(s,2),a=c[0],h=c[1];return Object(i.useEffect)((function(){h({info:e.PurchaseOrderDetails.info,specifications:e.PurchaseOrderDetails.specifications,venders:e.PurchaseOrderDetails.venders})}),[e.PurchaseOrderDetails]),Object(l.jsx)(l.Fragment,{children:a.info.length>0?a.info.map((function(s,c){for(var t=new Date(s.request_date),i=0,h=0;h<a.specifications.length;h++)i+=a.specifications[h].amount;return Object(l.jsxs)("div",{className:"ViewPOForm",children:[Object(l.jsx)("h1",{className:"text-center",style:{textDecoration:"underline"},children:"Seaboard Group"}),Object(l.jsxs)("div",{className:"ViewPOFormGrid",children:[Object(l.jsx)("img",{src:n.a,alt:"QFS LOGO",width:"100%"}),Object(l.jsx)("img",{src:d.a,alt:"SBL LOGO",width:"100%"}),Object(l.jsx)("img",{src:j.a,alt:"SBS LOGO",width:"100%"})]}),Object(l.jsx)("h3",{className:"text-center mb-4",style:{textDecoration:"underline"},children:"Purchase Order"}),Object(l.jsxs)("div",{className:"Upper RequestInfo",children:[Object(l.jsxs)("div",{className:"Left CompanyInfo",children:[Object(l.jsxs)("p",{className:"font-weight-bold",children:[" ",s.po_company_name," "]}),Object(l.jsx)("p",{children:s.location_address}),Object(l.jsxs)("p",{children:[Object(l.jsx)("b",{className:"mr-2",children:"Phone:"}),s.location_phone]}),Object(l.jsxs)("p",{children:[Object(l.jsx)("b",{className:"mr-2",children:"Website:"}),s.company_website]})]}),Object(l.jsx)("div",{className:"Right RequestInfo",children:Object(l.jsxs)("div",{className:"TableDiv",children:[Object(l.jsx)("div",{className:"divs",children:"PR Number"}),Object(l.jsx)("div",{className:"divs d-flex align-items-center justify-content-between",children:null===s.pr_code||0===s.pr_code||void 0===s.pr_code?"No Purchase Requisition":Object(l.jsxs)(l.Fragment,{children:[s.pr_code,Object(l.jsx)("i",{className:"las la-external-link-alt",style:{fontSize:"15px",cursor:"pointer"},onClick:function(){return e.ShowModal(s.pr_id)}})]})}),Object(l.jsx)("div",{className:"divs",children:"PO Number"}),Object(l.jsx)("div",{className:"divs",children:s.po_code}),Object(l.jsx)("div",{className:"divs",children:"Date"}),Object(l.jsx)("div",{className:"divs",children:t?t.toDateString():null})]})})]}),Object(l.jsxs)("div",{className:"GridContainer Venders ShipTo",children:[Object(l.jsxs)("div",{className:"VendersList",children:[Object(l.jsx)("div",{className:"title d-flex align-items-center justify-content-start",children:"Venders"}),a.venders.map((function(e,s){return Object(l.jsx)(r,{name:e.vender_name,phone:e.vender_phone,address:e.vender_address},s)}))]}),Object(l.jsxs)("div",{className:"ShippingCompany",children:[Object(l.jsx)("div",{className:"title",children:"Ship To"}),Object(l.jsx)("p",{className:"font-weight-bold mx-2",children:s.po_shipto_company_name}),Object(l.jsx)("p",{className:"mx-2",children:s.ShipToLocationAddress}),Object(l.jsxs)("p",{children:[Object(l.jsx)("b",{className:"mx-2",children:"Phone:"}),s.ShipToLocationPhone]}),Object(l.jsxs)("p",{children:[Object(l.jsx)("b",{className:"mx-2",children:"Website:"}),s.shipto_company_website]})]})]}),Object(l.jsxs)("div",{className:"PO_printUI_Middle",children:[Object(l.jsxs)("div",{className:"PO_printUI_Grid",style:{backgroundColor:"rgb(243, 243, 243)"},children:[Object(l.jsx)("div",{children:Object(l.jsx)("p",{className:"font-weight-bolder",children:"No"})}),Object(l.jsx)("div",{children:Object(l.jsx)("p",{className:"font-weight-bolder",children:"Description"})}),Object(l.jsx)("div",{children:Object(l.jsx)("p",{className:"font-weight-bolder",children:"Quantity"})}),Object(l.jsx)("div",{children:Object(l.jsx)("p",{className:"font-weight-bolder",children:"Unit Price"})}),Object(l.jsx)("div",{children:Object(l.jsx)("p",{className:"font-weight-bolder",children:"Tax"})}),Object(l.jsx)("div",{children:Object(l.jsx)("p",{className:"font-weight-bolder",children:"Total Cost"})})]}),a.specifications.map((function(e,s){return Object(l.jsxs)("div",{className:"PO_printUI_Grid MyItems MyItems"+s,children:[Object(l.jsxs)("div",{children:[" ",Object(l.jsxs)("p",{children:[" ",s+1," "]}),"  "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsxs)("p",{children:[" ",e.description," "]})]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsxs)("p",{children:[" ",e.quantity," "]})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsxs)("p",{children:[" ",e.price," "]})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsxs)("p",{children:[" ",e.tax+"%"," "]})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsxs)("p",{children:[" ","Rs "+e.amount.toLocaleString("en-US")," "]})," "]})]},s)})),Object(l.jsxs)("div",{className:"PO_printUI_Grid PO_printUI_Grid_Bottom MyItems MyItems0",children:[Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "}),"  "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{className:"font-weight-bold",children:" Sub Total "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsxs)("p",{children:[" ","Rs "+i.toLocaleString("en-US")," "]})," "]})]},c),Object(l.jsxs)("div",{className:"PO_printUI_Grid PO_printUI_Grid_Bottom MyItems MyItems0",children:[Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "}),"  "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{className:"font-weight-bold",children:" Tax "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsxs)("p",{children:[" ",s.tax+"%"," "]})," "]})]},c),Object(l.jsxs)("div",{className:"PO_printUI_Grid PO_printUI_Grid_Bottom MyItems MyItems0",children:[Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "}),"  "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{className:"font-weight-bold",children:" Cartage "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsxs)("p",{children:[" ","Rs "+s.cartage.toLocaleString("en-US")," "]})," "]})]},c),Object(l.jsxs)("div",{className:"PO_printUI_Grid PO_printUI_Grid_Bottom MyItems MyItems0",children:[Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "}),"  "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{className:"font-weight-bold",children:" Others "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsxs)("p",{children:[" ","Rs "+s.others.toLocaleString("en-US")," "]})," "]})]},c),Object(l.jsxs)("div",{className:"PO_printUI_Grid PO_printUI_Grid_Bottom MyItems MyItems0",children:[Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "}),"  "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{children:"  "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsx)("p",{className:"font-weight-bold",children:" Total "})," "]}),Object(l.jsxs)("div",{children:[" ",Object(l.jsxs)("p",{children:[" ","Rs "+s.total.toLocaleString("en-US")," "]})," "]})]},c)]}),Object(l.jsxs)("div",{className:"Comments",children:[Object(l.jsx)("div",{className:"title rounded-0",children:"Comments"}),Object(l.jsx)("textarea",{placeholder:"Please enter your comments on the request.",className:"form-control rounded-0",value:s.comments,disabled:!0})]}),Object(l.jsxs)("div",{className:"Footer",children:[Object(l.jsxs)("div",{className:"Left RequestedBy",children:[Object(l.jsx)("div",{className:"title",children:"Requested By"}),Object(l.jsxs)("div",{className:"d-flex align-items-center pl-2 py-1",children:[Object(l.jsx)("p",{className:"w-100 font-weight-bold",children:"Name"}),Object(l.jsx)("p",{className:"w-100",children:s.sender_name})]}),Object(l.jsxs)("div",{className:"d-flex align-items-center pl-2 py-1",children:[Object(l.jsx)("p",{className:"w-100 font-weight-bold",children:"Date"}),Object(l.jsx)("p",{className:"w-100",children:t?t.toDateString():null})]})]}),Object(l.jsxs)("div",{className:"Right ApprovedBy",children:[Object(l.jsx)("div",{className:"title",children:"Approved By"}),Object(l.jsxs)("div",{className:"d-flex align-items-center pl-2 py-1",children:[Object(l.jsx)("p",{className:"w-100 font-weight-bold",children:"Name"}),Object(l.jsx)("p",{className:"w-100"})]}),Object(l.jsxs)("div",{className:"d-flex align-items-center pl-2 py-1",children:[Object(l.jsx)("p",{className:"w-100 font-weight-bold",children:"Date"}),Object(l.jsx)("p",{className:"w-100"})]})]})]})]},c)})):null})}}}]);