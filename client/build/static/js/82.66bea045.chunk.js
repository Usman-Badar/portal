(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[82],{620:function(n,e,t){"use strict";t.r(e);var c=t(4),i=t(1),a=t(24),u=t(9),o=function(n,e){n.get("/admin_getallmenuitems").then((function(n){e(n.data)})).catch((function(n){console.log(n),e(n.message)}))},l=function(n,e){n.get("/admin_getallmenuitemviews").then((function(n){e(n.data)})).catch((function(n){console.log(n),e(n.message)}))},s=function(n,e){n.get("/admin_getallmenuitemoptions").then((function(n){e(n.data)})).catch((function(n){console.log(n),e(n.message)}))},m=t(11),d=t(0),r=Object(i.lazy)((function(){return t.e(58).then(t.bind(null,640))}));e.default=function(){var n=Object(i.useState)([]),e=Object(c.a)(n,2),t=e[0],f=e[1],_=Object(i.useState)([]),g=Object(c.a)(_,2),b=g[0],j=g[1],h=Object(i.useState)([]),p=Object(c.a)(h,2),O=p[0],v=p[1],S=Object(i.useState)(),x=Object(c.a)(S,2),k=x[0],w=x[1],C=Object(i.useState)({menu_txt:"",icon_class_name:"",type:"link",option_id:null,link:null,view:"portal",under_menu:null,access:null}),y=Object(c.a)(C,2),E=y[0],I=y[1];return Object(i.useEffect)((function(){o(m.a,f),l(m.a,j),s(m.a,v)}),[]),Object(d.jsx)(d.Fragment,{children:Object(d.jsx)(i.Suspense,{fallback:Object(d.jsx)("div",{children:"Loading...."}),children:Object(d.jsx)(r,{MenuItems:t,AllViews:b,AllOptions:O,Form:E,Edit:k,onChangeHandler:function(n){return function(n,e,t){var c=n.target,i=c.name,o=c.value;t(Object(u.a)(Object(u.a)({},e),{},Object(a.a)({},i,o)))}(n,E,I)},AddNewMenuItem:function(n){return function(n,e,t,c,i,a,u,m,d){n.preventDefault();var r="/admin_enternewmenuitem";c&&(r="/admin_editmenuitem"),t.post(r,{id:e.id?e.id:null,menu_txt:e.menu_txt,icon_class_name:e.icon_class_name,type:e.type,option_id:e.option_id,link:e.link,view:e.view,under_menu:e.under_menu,access:e.access}).then((function(){alert("SUCCESS"),a({menu_txt:"",icon_class_name:"",type:"link",option_id:null,link:null,view:"portal",under_menu:null,access:null}),i(),o(t,u),s(t,m),l(t,d)})).catch((function(n){console.log(n),u(n.message)}))}(n,E,m.a,k,w,I,f,v,j)},EditItem:function(n){return function(n,e,t,c){var i=e[n];t(i.menu_txt),c(i)}(n,t,w,I)},RemoveItem:function(n){return function(n,e,t,c){var i=e[n];t.post("/admin_removemenuitem",{id:i.id}).then((function(){alert("SUCCESS"),o(t,c)})).catch((function(n){console.log(n)}))}(n,t,m.a,f)},onChangeIndex:function(n,e){return function(n,e,t,c,i){13===n.keyCode&&t.post("/admin_changemenuitemindexing",{index:n.target.value,id:c[e].id}).then((function(){alert("SUCCESS"),i([]),o(t,i)})).catch((function(n){console.log(n)}))}(n,e,m.a,t,f)}})})})}}}]);