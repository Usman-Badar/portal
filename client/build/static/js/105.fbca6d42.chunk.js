(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[105],{104:function(e,t,n){"use strict";var s=n(141).a.connect("http://"+window.location.host,{autoConnect:!0});t.a=s},132:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return a}));var s=function(e){return{type:"EMPLOGIN",payload:{data:e}}},a=function(e){return{type:"SHOWSIDEBAR",payload:{data:e}}}},534:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n(3),c=n(17),i=n(24),r=n(132),l=n(88),o=n.n(l),d=n(11),u=n(104),j=n(90),m=(n(91),n(0)),p=Object(s.lazy)((function(){return n.e(103).then(n.bind(null,454))}));t.default=function(){var e=Object(i.c)((function(e){return e.EmpAuth.EmployeeData})),t=Object(i.c)((function(e){return e.EmpAuth.Menu})),n=Object(a.g)(),l=Object(i.b)();Object(s.useEffect)((function(){if(void 0===sessionStorage.getItem("Token")||null===sessionStorage.getItem("Token"))n.replace("/login");else{var e=new FormData;e.append("empID",sessionStorage.getItem("EmpID")),e.append("view","inventory"),d.a.post("/getemployee",e).then((function(e){u.a.open(),u.a.emit("NewUser",sessionStorage.getItem("EmpID")),l(Object(r.a)(e.data))})).catch((function(e){j.b.dark(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}))}}),[l]);var b=function(e,t){o()("."+e).find("i").hasClass("la-caret-right")?(o()("."+e+" .la-caret-right").removeClass("la-caret-right").addClass("la-caret-down"),o()("."+t).slideDown()):(o()("."+e+" .la-caret-down").removeClass("la-caret-down").addClass("la-caret-right"),o()("."+t).slideUp())},h=Object(s.useMemo)((function(){return Object(m.jsx)("div",{className:"Dashboard_links",children:t.map((function(n,s){var a=null===n.access?[]:JSON.parse(n.access),i=null===n.access,r=null;if(e.access){for(var l=0;l<a.length;l++)JSON.parse(e.access).includes(a[l])&&(i=!0);null!==n.option_id&&i?r=Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("div",{className:"d-center links "+n.menu_txt+n.option_id,onClick:function(){return b(n.menu_txt+n.option_id,n.option_id)},children:[Object(m.jsx)("div",{className:"pr-3",children:Object(m.jsx)("i",{className:n.icon_class_name})}),Object(m.jsxs)("div",{className:"d-flex justify-content-between w-100",children:[Object(m.jsxs)("div",{className:"links_txt",children:[" ",n.menu_txt," "]}),Object(m.jsx)("div",{className:"links_txt",children:Object(m.jsx)("i",{className:"las la-caret-right",style:{fontSize:"12px"}})})]})]},s),Object(m.jsx)("div",{className:"Forms_options _options dropoptions "+n.option_id,children:t.map((function(e){var t=null;return e.under_menu===n.option_id&&(t=Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)(c.c,{activeClassName:"Dashboard_active",to:e.link,className:"d-center links",children:[Object(m.jsx)("div",{className:"pr-3",children:Object(m.jsx)("i",{className:e.icon_class_name})}),Object(m.jsx)("div",{className:"links_txt",children:e.menu_txt})]},e.menu_txt)})),t}))})]}):null===n.under_menu&&i&&(r=Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)(c.c,{activeClassName:"Dashboard_active",to:n.link,className:"d-center links",children:[Object(m.jsx)("div",{className:"pr-3",children:Object(m.jsx)("i",{className:n.icon_class_name})}),Object(m.jsx)("div",{className:"links_txt",children:n.menu_txt})]},n.menu_txt)}))}return r}))})}),[e,t]);return Object(m.jsx)(s.Suspense,{fallback:Object(m.jsx)("div",{children:"Loading..."}),children:Object(m.jsx)(p,{FormsLinks:b,content:h,history:n})})}}}]);