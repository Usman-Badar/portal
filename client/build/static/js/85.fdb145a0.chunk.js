(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[85],{633:function(e,s,n){"use strict";n.r(s);var c=n(4),l=n(1),t=n.n(l),i=n(0),a=t.a.memo((function(e){var s=Object(l.useState)([]),n=Object(c.a)(s,2),t=n[0],a=n[1];return Object(l.useEffect)((function(){a(e.Folders)}),[e.Folders]),Object(i.jsx)(i.Fragment,{children:t.length>0?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h5",{className:"pt-2",children:"Folders"}),Object(i.jsx)("hr",{}),Object(i.jsx)("div",{className:"Employee_Drive_Grid folders",children:0===t.length?null:t.map((function(s,n){return Object(i.jsx)(i.Fragment,{children:Object(i.jsxs)("div",{className:"Div1 d-flex p-2 align-items-center justify-content-between",onDoubleClick:function(){return e.OpenFolder(s.id,s.name)},children:[Object(i.jsxs)("div",{className:"d-flex align-items-center",children:[Object(i.jsx)("i",{className:"las la-wallet"})," ",Object(i.jsxs)("p",{className:"font-weight-bold",children:[" ",s.name," "]})]}),Object(i.jsxs)("div",{className:"Drive_Icon",children:[Object(i.jsx)("i",{className:"las la-ellipsis-v mr-0",onClick:function(){return e.ShowChangesMenuDiv1("Show_Changes_Menu-1"+n)}}),Object(i.jsx)("div",{style:{top:"5%",right:"100%",width:"150px"},className:"Show_Changes_Menu Show_Changes_Menu-1"+n,children:Object(i.jsxs)("div",{className:"DropDown_Drive_Menu",children:[Object(i.jsxs)("div",{className:"d-flex align-items-center my-2 px-3 py-1",onClick:function(){return e.OpenFolder(s.id,s.name)},children:[Object(i.jsx)("i",{className:"las la-share"}),Object(i.jsx)("p",{children:"Open"})]}),Object(i.jsxs)("div",{className:"d-flex align-items-center my-2 px-3 py-1",onClick:function(){return e.DeleteDoc(n,"folder")},children:[Object(i.jsx)("i",{className:"las la-trash-alt"}),Object(i.jsx)("p",{children:"Delete"})]})]})})]})]})})}))})]}):null})}));s.default=a}}]);