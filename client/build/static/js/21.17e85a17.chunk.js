(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[21],{126:function(e,n){},127:function(e,n){},129:function(e,n){},130:function(e,n){},132:function(e,n){},133:function(e,n){},134:function(e,n){},135:function(e,n){},136:function(e,n){},137:function(e,n){},138:function(e,n){},139:function(e,n){},140:function(e,n){},141:function(e,n){},594:function(e,n,t){},791:function(e,n,t){"use strict";t.r(n);var o=t(24),s=t(11),c=t(8),i=t(1),a=(t(594),t(3)),r=t(76),u=(t(77),t(109)),l=t(25),g=t(0);n.default=function(){var e=Object(l.c)((function(e){return e.EmpAuth.EmployeeData})),n=Object(a.g)(),d=t(101)("real secret keys should be long and random"),p=Object(i.useState)({LoginID:"",LoginPass:""}),b=Object(c.a)(p,2),m=b[0],f=b[1],j=function(e){var n=e.target,t=n.name,c=n.value,i=Object(s.a)(Object(s.a)({},m),{},Object(o.a)({},t,c));f(i)};return sessionStorage.getItem("InvtryEmpID")&&n.replace("/invtry"),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(r.a,{}),Object(g.jsx)("div",{className:"invtry_Login",children:Object(g.jsx)("div",{className:"invtry_Login-content",children:Object(g.jsxs)("form",{onSubmit:function(t){t.preventDefault(),m.LoginID===d.decrypt(e.login_id)?m.LoginPass===d.decrypt(e.emp_password)?(u.a.say("Login success. Please wait"),r.b.dark("Login success",{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),sessionStorage.setItem("InvtryEmpID",e.emp_id),setTimeout((function(){n.replace("/invtry")}),3e3)):(u.a.say("Password Not Matched"),r.b.dark("Password Not Matched",{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})):(u.a.say("Login ID is not correct"),r.b.dark("Login ID is not correct",{position:"bottom-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}))},children:[Object(g.jsx)("h1",{className:"text-uppercase text-center mb-4",children:"Inventory Login"}),Object(g.jsx)("input",{type:"text",className:"form-control",placeholder:"Login ID",value:m.LoginID,onChange:j,name:"LoginID",minLength:"3",required:!0}),Object(g.jsx)("input",{type:"password",className:"form-control",placeholder:"Password",value:m.LoginPass,onChange:j,name:"LoginPass",minLength:"3",required:!0}),Object(g.jsx)("button",{className:"btn",children:"Login"})]})})})]})}}}]);
//# sourceMappingURL=21.17e85a17.chunk.js.map