(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[16],{126:function(e,t){},127:function(e,t){},129:function(e,t){},130:function(e,t){},132:function(e,t){},133:function(e,t){},134:function(e,t){},135:function(e,t){},136:function(e,t){},137:function(e,t){},138:function(e,t){},139:function(e,t){},140:function(e,t){},141:function(e,t){},160:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return i}));var n=function(e){return{type:"EMPLOGIN",payload:{data:e}}},i=function(e){return{type:"SHOWSIDEBAR",payload:{data:e}}}},359:function(e,t,a){},811:function(e,t,a){"use strict";a.r(t);var n=a(24),i=a(11),o=a(8),s=a(1),r=(a(359),a(23)),c=a.n(r),l=a(3),d=a(25),g=a(76),u=(a(77),a(10)),m=a(27),b=a(160),p=a(0);var h=function(e){return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("div",{className:"Emp_Login2",children:[Object(p.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320",children:Object(p.jsx)("path",{fill:"rgb(26, 34, 38)","fill-opacity":"1",d:"M0,160L120,181.3C240,203,480,245,720,245.3C960,245,1200,203,1320,181.3L1440,160L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"})}),Object(p.jsxs)("div",{className:"Emp_Login2_Div",children:[Object(p.jsx)("h1",{className:"font-weight-bolder text-center",children:"SEABOARD"}),Object(p.jsxs)("div",{className:"Emp_Login2_Div_Box",children:[Object(p.jsxs)("div",{className:"Emp_Login2_Grid",children:[Object(p.jsx)("div",{className:"ClickDiv1",onClick:e.LoginShow,children:Object(p.jsx)("p",{className:"mb-0",children:"Login Id"})}),Object(p.jsx)("div",{className:"ClickDiv2",children:Object(p.jsx)("p",{className:"mb-0",children:"Password"})}),Object(p.jsx)("div",{className:"HideDiv",children:Object(p.jsx)("p",{className:"mb-0",children:"Login Id"})})]}),Object(p.jsx)("div",{className:"LoginDiv",children:Object(p.jsxs)("form",{onSubmit:e.Login_Div2,children:[Object(p.jsx)("input",{className:"w-100 mb-3 form-control border bg-light",value:e.UserData.LoginID,onChange:e.OnChangeHandler,name:"LoginID",required:!0,id:"standard-basic",label:"Login Id",variant:"standard"}),Object(p.jsx)("div",{className:"w-100 text-right py-3",children:Object(p.jsx)("button",{type:"submit",variant:"contained",className:"w-100 btn",style:{backgroundColor:"#0db8de",color:"white"},children:"Next"})})]})}),Object(p.jsx)("div",{className:"PassDiv",children:Object(p.jsxs)("form",{onSubmit:e.OnUserLogin,children:[Object(p.jsx)("input",{className:"w-100 mb-3 form-control border bg-light",value:e.UserData.LoginPass,onChange:e.OnChangeHandler,name:"LoginPass",required:!0,label:"Password",type:"password",autoComplete:"current-password",variant:"standard"}),Object(p.jsx)("div",{className:"w-100 text-right py-3",children:Object(p.jsx)("button",{type:"submit",variant:"contained",className:"w-100 btn",style:{backgroundColor:"#0db8de",color:"white"},children:"Login"})})]})})]})]})]})})},v=a(94);t.default=function(){var e=Object(l.g)(),t=a(101)("real secret keys should be long and random"),r=Object(d.b)(),j=Object(s.useState)({LoginID:"",LoginPass:"",Email:"",Name:""}),O=Object(o.a)(j,2),f=O[0],D=O[1],L=Object(s.useState)(!0),I=Object(o.a)(L,2),x=I[0],w=(I[1],Object(s.useState)(!0)),_=Object(o.a)(w,2),y=_[0],C=_[1];Object(s.useEffect)((function(){c()(".PassDiv").hide(0),c()(".ButtonDiv2").hide(0),C(!1)}),[]);sessionStorage.getItem("EmpID")&&e.replace("/dashboard");return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(g.a,{}),Object(p.jsx)(m.a,{display:y}),Object(p.jsx)(h,{Login_Div2:function(a){a.preventDefault(),"1234567890"===f.LoginID&&e.push("/atthome"),u.a.get("/authemployee").then((function(e){for(var a=0;a<e.data.length;a++)f.LoginID===t.decrypt(e.data[a].login_id)?(c()(".LoginDiv").fadeOut(0),c()(".PassDiv").fadeIn(),c()(".ButtonDiv2").show(),c()(".ButtonDiv1").hide(),c()(".Emp_Login2_Grid .HideDiv").css("left","50%"),c()(".Emp_Login2_Grid .HideDiv").html("Password")):(C(!1),D({LoginID:f.LoginID,LoginPass:""}))})).catch((function(e){C(!1),g.b.dark(e,{position:"bottom-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}))},LoginShow:function(){c()(".LoginDiv").fadeIn(),c()(".PassDiv").fadeOut(0),c()(".ButtonDiv2").hide(),c()(".ButtonDiv1").show(),c()(".Emp_Login2_Grid .HideDiv").css("left","0"),c()(".Emp_Login2_Grid .HideDiv").html("Login ID")},OnChangeHandler:function(e){var t=e.target,a=t.name,o=t.value,s=Object(i.a)(Object(i.a)({},f),{},Object(n.a)({},a,o));D(s)},UserData:f,OnUserLogin:function(a){a.preventDefault(),C(!0),u.a.get("/authemployee").then((function(a){for(var n=a.data,i=function(a){if(f.LoginID===t.decrypt(n[a].login_id)){if(f.LoginPass===t.decrypt(n[a].emp_password)){var i=new FormData,o=new Date;return i.append("empID",n[a].emp_id),u.a.post("/getemployee",i).then((function(i){var s=i.data;if(v.a.emit("UserCanLogin",n[a].emp_id),v.a.on("UserCanLogin",(function(t){C(!1),null===t.err&&""===t.rslt[0].app_status?(g.b.dark("Login Success",{position:"bottom-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),console.log(s),sessionStorage.setItem("EmpID",n[a].emp_id),sessionStorage.setItem("name",s[0].name),v.a.emit("NewUser",n[a].emp_id),r(Object(b.a)(s[0])),D({LoginID:"",LoginPass:""}),setTimeout((function(){e.replace("/login")}),1e3)):g.b.dark("You ar already login in another window",{position:"bottom-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})})),x){var c=["January","February","March","April","May","June","July","August","September","October","November","December"];if(localStorage.getItem("prevData")){for(var l=[],d=0;d<JSON.parse(localStorage.getItem("prevData")).length;d++)l.push(JSON.parse(localStorage.getItem("prevData"))[d].loginID);if(l.includes(t.decrypt(n[a].login_id)));else{var u=JSON.parse(localStorage.getItem("prevData")),m={img:n[a].emp_image,name:s[0].name,loginID:t.decrypt(n[a].login_id),email:s[0].email,date:o.getDate()+" "+c[o.getMonth()]+" "+o.getFullYear()};u.push(m),localStorage.setItem("prevData",JSON.stringify(u))}}else{var p=[{img:n[a].emp_image,name:s[0].name,loginID:t.decrypt(n[a].login_id),email:s[0].email,date:o.getDate()+" "+c[o.getMonth()]+" "+o.getFullYear()}];localStorage.setItem("prevData",JSON.stringify(p))}}})).catch((function(e){g.b.dark(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})})),"break"}return C(!1),D({LoginID:f.LoginID,LoginPass:""}),g.b.dark("Password Not Match",{position:"bottom-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),"break"}C(!1),D({LoginID:f.LoginID,LoginPass:""})},o=0;o<n.length;o++){if("break"===i(o))break}})).catch((function(e){C(!1),g.b.dark(e,{position:"bottom-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})}))}})]})}},94:function(e,t,a){"use strict";var n=a(175).a.connect("https://192.168.10.116:8888",{autoConnect:!0});t.a=n}}]);
//# sourceMappingURL=16.df68da5e.chunk.js.map