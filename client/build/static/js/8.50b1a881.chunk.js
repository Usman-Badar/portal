(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[8],{249:function(e,s,t){"use strict";t.r(s);var a=t(5),i=t(1),n=(t(356),t(88)),c=t.n(n),r=t(24),o=t(0);s.default=function(e){var s=Object(i.useState)(),t=Object(a.a)(s,2),n=t[0],l=t[1],d=Object(r.c)((function(e){return e.SideBar.ShowSideBar}));return Object(i.useMemo)((function(){return l(e.Data)}),[e.Data]),Object(i.useEffect)((function(){window.innerWidth<=1100?e.SideBarClose():window.innerWidth<=600&&c()(".Dashboard_sideBar .links").on("click",(function(){e.SideBarClose()}))}),[n]),Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("div",{className:d?"Dashboard_sideBar ShowBar":"Dashboard_sideBar",children:[Object(o.jsxs)("div",{className:"Dashboard_logo d-center",children:[Object(o.jsxs)("h5",{style:{whiteSpace:"nowrap",fontSize:"16px"},className:"mb-0 logo",children:[" ",e.title?e.title:"Employee Portal"," "]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{className:"btn btn-sm p-0 m-0 sideBar_bars",onClick:e.SideBarClose,children:Object(o.jsx)("i",{className:d?"las la-times cross":""})})})]}),Object(o.jsx)("div",{className:"linksContainer",children:n})]})})}},356:function(e,s,t){}}]);