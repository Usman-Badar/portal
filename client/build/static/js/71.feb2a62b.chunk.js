(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[71],{762:function(e,t,c){},802:function(e,t,c){"use strict";c.r(t);var s=c(8),a=c(1),l=(c(762),c(0));t.default=function(e){var t=Object(a.useState)([]),c=Object(s.a)(t,2),n=c[0],i=c[1],r=Object(a.useState)([]),o=Object(s.a)(r,2),h=o[0],u=o[1],j=Object(a.useState)([]),b=Object(s.a)(j,2),d=b[0],m=b[1];return Object(a.useEffect)((function(){i(e.AttachVouchers),m(e.VoucherPreview),u(e.Details)}),[e.AttachVouchers,e.VoucherPreview,e.Details]),Object(l.jsxs)("div",{className:"AttachedVouchers",children:[Object(l.jsx)("div",{className:"Attach",children:h[0]?"Viewed"===h[0].status||"Sent"===h[0].status?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("input",{type:"file",onChange:e.onAttachVouchers,name:"attachments",className:"d-none",id:"upload-vouchers",multiple:!0,accept:"image/*"}),Object(l.jsx)("label",{className:"label",children:" UPLOAD VOUCHERS "}),Object(l.jsx)("label",{className:"AttachContent",for:"upload-vouchers",children:Object(l.jsxs)("div",{children:[Object(l.jsx)("i",{className:"las la-file"}),Object(l.jsx)("p",{children:"Upload Vouchers in image format"})]})})]}):null:Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("input",{type:"file",onChange:e.onAttachVouchers,name:"attachments",className:"d-none",id:"upload-vouchers",multiple:!0,accept:"image/*"}),Object(l.jsx)("label",{className:"label",children:" UPLOAD VOUCHERS "}),Object(l.jsx)("label",{className:"AttachContent",for:"upload-vouchers",children:Object(l.jsxs)("div",{children:[Object(l.jsx)("i",{className:"las la-file"}),Object(l.jsx)("p",{children:"Upload Vouchers in image format"})]})})]})}),Object(l.jsxs)("div",{className:"AttachmentPreview",children:[Object(l.jsx)("label",{className:"label",children:" VOUCHER PREVIEW "}),Object(l.jsx)("div",{className:"Preview",style:{backgroundImage:"url('"+(d.length>0?d[0].voucher?"images/Inventory/po_vouchers/"+d[0].voucher:URL.createObjectURL(d[0].file):null)+"')"},children:0===d.length?Object(l.jsx)("p",{children:"No Voucher Selected"}):null})]}),Object(l.jsx)("div",{className:"VouchersList",children:n.map((function(t,c){var s;return s=t.voucher?"images/Inventory/po_vouchers/"+t.voucher:URL.createObjectURL(t.file),Object(l.jsxs)("div",{className:"VoucherItem",children:[Object(l.jsx)("div",{className:"thumbnail",style:{backgroundImage:"url('"+s+"')"}}),Object(l.jsxs)("div",{className:"d-flex justify-content-between flex-column",children:[Object(l.jsx)("p",{className:"font-weight-bold",children:t.name}),Object(l.jsxs)("div",{className:"btn-group",children:[Object(l.jsx)("button",{className:"btn btn-sm btn-light",onClick:function(){return e.PreviewVoucher(c)},children:"View"}),h[0]?"Viewed"===h[0].status||"Sent"===h[0].status?Object(l.jsx)("button",{className:"btn btn-sm btn-light",onClick:function(){return e.RemoveVoucher(c)},children:"Remove"}):null:Object(l.jsx)("button",{className:"btn btn-sm btn-light",onClick:function(){return e.RemoveVoucher(c)},children:"Remove"})]})]})]},c)}))})]})}}}]);
//# sourceMappingURL=71.feb2a62b.chunk.js.map