(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[25],{112:function(e,t){},113:function(e,t){},114:function(e,t){},115:function(e,t){},116:function(e,t){},117:function(e,t){},118:function(e,t){},119:function(e,t){},120:function(e,t){},121:function(e,t){},122:function(e,t){},124:function(e,t){},125:function(e,t){},126:function(e,t){},408:function(e,t,n){},687:function(e,t,n){"use strict";n.r(t);var a=n(24),o=n(9),s=n(4),c=n(1),i=(n(408),n(11)),r=n(3),u=n(17),d=n(27),l=n(85),g=(n(86),n(138)),f=n(0);t.default=function(){var e=Object(r.g)(),t=Object(c.useState)(!0),m=Object(s.a)(t,2),p=m[0],b=m[1],h=Object(c.useState)({LoginID:"",LoginPass:""}),j=Object(s.a)(h,2),L=j[0],O=j[1],D=n(105)("real secret keys should be long and random");Object(c.useEffect)((function(){setTimeout((function(){b(!1)}),500),setTimeout((function(){"attlogin"===window.location.href.split("/").pop()&&e.replace("/atthome")}),6e4)}),[e]);var I=function(e){var t=e.target,n=t.name,s=t.value,c=Object(o.a)(Object(o.a)({},L),{},Object(a.a)({},n,s));O(c)};return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(d.a,{show:p}),Object(f.jsx)(l.a,{}),Object(f.jsx)("div",{className:"Login",children:Object(f.jsx)("div",{className:"Login-content",children:Object(f.jsxs)("form",{onSubmit:function(t){t.preventDefault(),b(!0),i.a.get("/authemployee").then((function(t){for(var n=function(n){if(b(!1),L.LoginID===D.decrypt(t.data[n].login_id))if(D.decrypt(t.data[n].emp_password)===L.LoginPass){var a=new FormData;a.append("empID",t.data[n].emp_id),i.a.post("/checkattaccess",a).then((function(a){a.data[0]&&(JSON.parse(a.data[0].access).includes(100)||JSON.parse(a.data[0].access).includes(101)||JSON.parse(a.data[0].access).includes(102)||JSON.parse(a.data[0].access).includes(103))?(g.a.say("Login Successed,... Please wait"),localStorage.setItem("AttLoginID",D.decrypt(t.data[n].login_id)),localStorage.setItem("AccessControl",a.data[0].access),O({LoginID:"",LoginPass:""}),setTimeout((function(){e.replace("/attdashboard"),setTimeout((function(){g.a.say("Welcome To Dashboard")}),1e3)}),2e3)):(O({LoginID:L.LoginID,LoginPass:""}),g.a.say("Permission Denied!!"))})).catch((function(e){l.b.dark(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}))}else O({LoginID:L.LoginID,LoginPass:""}),g.a.say("Password Not Matched... please try again")},a=0;a<t.data.length;a++)n(a)})).catch((function(e){setTimeout((function(){g.a.say(e+"...., Please Try Later"),b(!1),O({LoginID:L.LoginID,LoginPass:""})}),1e3)}))},children:[Object(f.jsx)("h3",{className:"mb-4",children:"Login"}),Object(f.jsx)("input",{type:"text",value:L.LoginID,onChange:I,className:"form-control mb-3 rounded-0",placeholder:"Login ID",name:"LoginID"}),Object(f.jsx)("input",{type:"password",value:L.LoginPass,onChange:I,className:"form-control mb-3 rounded-0",placeholder:"Password",name:"LoginPass"}),Object(f.jsx)("button",{className:"btn",type:"submit",children:"Login"}),Object(f.jsx)(u.b,{to:"/atthome",className:"text-center d-block mb-0 mt-3 text-dark",children:"Go To Home"})]})})})]})}}}]);
//# sourceMappingURL=25.66f50540.chunk.js.map