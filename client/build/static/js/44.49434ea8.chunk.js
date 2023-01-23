(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[44],{158:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(1),s=c(i),l=c(n(12));function c(e){return e&&e.__esModule?e:{default:e}}var o={table:l.default.string.isRequired,filename:l.default.string.isRequired,sheet:l.default.string.isRequired,id:l.default.string,className:l.default.string,buttonText:l.default.string},r=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleDownload=n.handleDownload.bind(n),n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"handleDownload",value:function(){if(!document)return null;if(1!==document.getElementById(this.props.table).nodeType||"TABLE"!==document.getElementById(this.props.table).nodeName)return null;var e=document.getElementById(this.props.table).outerHTML,n=String(this.props.sheet),a=String(this.props.filename)+".xls",i={worksheet:n||"Worksheet",table:e};if(window.navigator.msSaveOrOpenBlob){var s=new Blob(['<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body>'+e+"</body></html>"]);return document.getElementById("react-html-table-to-excel").click()((function(){window.navigator.msSaveOrOpenBlob(s,a)})),!0}var l=window.document.createElement("a");return l.href="data:application/vnd.ms-excel;base64,"+t.base64(t.format('<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body>{table}</body></html>',i)),l.download=a,document.body.appendChild(l),l.click(),document.body.removeChild(l),!0}},{key:"render",value:function(){return s.default.createElement("button",{id:this.props.id,className:this.props.className,type:"button",onClick:this.handleDownload},this.props.buttonText)}}],[{key:"base64",value:function(e){return window.btoa(unescape(encodeURIComponent(e)))}},{key:"format",value:function(e,t){return e.replace(/{(\w+)}/g,(function(e,n){return t[n]}))}}]),t}(i.Component);r.propTypes=o,r.defaultProps={id:"button-download-as-xls",className:"button-download",buttonText:"Download"},t.default=r},391:function(e,t,n){"use strict";n.r(t);var a=n(24),i=n(9),s=n(4),l=n(1),c=n.n(l),o=(n(392),n(3)),r=n(80),d=n.n(r),m=n(25),b=n(109),j=n(11),f=n(158),u=n.n(f),p=n(159),x=n.n(p),h=n(0);t.default=function(){var e=Object(o.g)(),t=Object(m.c)((function(e){return e.EmpAuth.EmployeeData})),n=Object(l.useState)(""),a=Object(s.a)(n,2),i=a[0],c=a[1],r=Object(l.useState)(""),b=Object(s.a)(r,2),f=b[0],u=b[1],p=Object(l.useState)([]),x=Object(s.a)(p,2),g=x[0],_=x[1],v=Object(l.useState)([]),N=Object(s.a)(v,2),C=N[0],k=N[1],P=Object(l.useState)([]),E=Object(s.a)(P,2),S=E[0],I=E[1];Object(l.useEffect)((function(){var e=window.location.href.split("/");c(e[e.length-2]),d()("#"+e[e.length-2]).addClass("active")}),[window.location.href]),Object(l.useEffect)((function(){_([[{title:"Account",link:"/profile/personal/info",id:"info"},{title:"Contact",link:"/profile/personal/contact",id:"contact"},{title:"Email",link:"/profile/personal/email",id:"email"},{title:"Office",link:"/profile/personal/office",id:"office"},{title:"Password",link:"/profile/personal/password",id:"password"},{title:"Documents",link:"/profile/personal/documents",id:"documents"}],[{title:"Attendance Sheet",link:"/profile/attendance/sheet",id:"sheet"}],[{title:"Notifications",link:"/profile/notifications/all",id:"all"}]])}),[]),Object(l.useEffect)((function(){if(""!==i){"personal"===i?k(g[0]):"attendance"===i?k(g[1]):"notifications"===i&&(V(),k(g[2]));var e=window.location.href.split("/");u(e[e.length-1])}}),[i]),Object(l.useEffect)((function(){if(""!==f){var e=window.location.href.split("/");d()("#"+e[e.length-1]).addClass("active")}}),[f,window.location.href]);var V=function(){j.a.post("/getallnotifications",{emp_id:sessionStorage.getItem("EmpID")}).then((function(e){I(e.data)})).catch((function(e){console.log(e)}))};return Object(h.jsxs)("div",{className:"Profile",children:[Object(h.jsxs)("div",{className:"Left w-100",children:[Object(h.jsxs)("div",{className:"d-flex justify-content-start align-items-center mt-3 ml-3 mb-2",children:[Object(h.jsx)("hr",{style:{width:"20px",height:"2px",display:"inline-block",background:"var(--dark-c-green)"},className:"m-0 mr-2"}),Object(h.jsx)("h3",{className:"mb-0",children:" Profile "})]}),Object(h.jsx)(O,{event:function(){return e.replace("/profile/personal/info")},icon:Object(h.jsx)("i",{style:{color:"var(--blue)"},className:"las la-user"}),title:"Personal",desc:"info, name, password",id:"personal"}),Object(h.jsx)(O,{event:function(){return e.replace("/profile/attendance/sheet")},icon:Object(h.jsx)("i",{style:{color:"var(--c-green)"},className:"las la-calendar-week"}),title:"Attendance",desc:"view daily attendance",id:"attendance"}),Object(h.jsx)(O,{event:function(){return e.replace("/profile/notifications/all")},icon:Object(h.jsx)("i",{style:{color:"var(--orange)"},className:"las la-bell"}),title:"Notifications",desc:"desktop notifications",id:"notifications"})]}),Object(h.jsx)("div",{className:"Center w-100",children:"personal"===i?Object(h.jsx)(y,{ProfileData:t,View:i,SubView:f}):"attendance"===i?Object(h.jsx)(D,{ProfileData:t,View:i,SubView:f}):"notifications"===i?Object(h.jsx)(w,{ProfileData:t,EmpNotifications:S,View:i,SubView:f}):null}),Object(h.jsx)("div",{className:"Right w-100",children:Object(h.jsxs)("div",{className:"NavigationContainer",children:[Object(h.jsx)("div",{className:"Heading navigationItem",children:"Navigation"}),C.map((function(t,n){return Object(h.jsx)("div",{className:"navigationItem",onClick:function(){return e.replace(t.link)},id:t.id,children:t.title},n)}))]})})]})};var O=function(e){var t=e.icon,n=e.title,a=e.desc,i=e.event,s=e.id;return Object(h.jsxs)("div",{className:"LinkItem",onClick:i,id:s,children:[t,Object(h.jsxs)("div",{className:"pl-2",children:[Object(h.jsxs)("p",{children:[" ",n," "]}),Object(h.jsxs)("p",{children:[" ",a," "]})]})]})},g=function(e){var t=e.label,n=e.txt;return Object(h.jsxs)("div",{className:"AccountInfoItem",children:[Object(h.jsxs)("label",{children:[" ",t," "]}),Object(h.jsxs)("p",{children:[" ",n," "]})]})},_=function(e){var t,n,a=e.label,i=e.source;return i.includes("CV")?n="/documents/cv/":i.includes("Driving_License")?n="/documents/licenses/driving/":i.includes("Armed_License")?n="/documents/licenses/armed/":i.includes("proof_of_address")?n="/documents/address/":i.includes("_front")?n="/documents/cnic/front/":i.includes("_back")&&(n="/documents/cnic/back/"),t=i.includes(".pdf")?Object(h.jsx)("iframe",{src:"images"+n+i,width:"100%",title:"CV"}):Object(h.jsx)("img",{src:"images"+n+i,alt:"document",width:"100%",title:"CV"}),Object(h.jsxs)("div",{className:"AccountInfoItem",children:[Object(h.jsxs)("label",{children:[" ",a," "]}),t]})},v=function(e){var t=e.label,n=e.value,a=e.type,i=e.name,s=e.onChangeHandler;return Object(h.jsxs)("div",{className:"AccountInfoItem",children:[Object(h.jsxs)("label",{children:[" ",t," "]}),Object(h.jsx)("input",{type:a,className:"inputs",value:n,onChange:s,name:i})]})},y=function(e){var t=n(97)("real secret keys should be long and random"),c=Object(m.b)(),o=Object(l.useState)({residential_address:e.ProfileData.residential_address,emergency_person_name:e.ProfileData.emergency_person_name,emergency_person_number:e.ProfileData.emergency_person_number,landline:e.ProfileData.landline,cell:e.ProfileData.cell,email:e.ProfileData.email,login_id:t.decrypt(e.ProfileData.login_id),emp_password:t.decrypt(e.ProfileData.emp_password)}),r=Object(s.a)(o,2),f=r[0],u=r[1],p=Object(l.useState)(sessionStorage.getItem("Mode")),x=Object(s.a)(p,2),O=x[0],y=x[1],w=Object(l.useState)(!1),N=Object(s.a)(w,2),D=N[0],C=N[1],k=Object(l.useState)({file:"",name:""}),P=Object(s.a)(k,2),E=P[0],S=P[1],I=Object(l.useState)({file:"",name:""}),V=Object(s.a)(I,2),M=V[0],A=V[1],H=Object(l.useState)(!1),T=Object(s.a)(H,2),W=T[0],R=T[1],F=Object(l.useState)(!1),B=Object(s.a)(F,2),L=B[0],J=B[1];Object(l.useEffect)((function(){sessionStorage.getItem("Mode")?d()(".Profile .ContainerHeader .ModeContainer #"+sessionStorage.getItem("Mode")).addClass("active"):d()(".Profile .ContainerHeader .ModeContainer #Normal").addClass("active")}),[O,sessionStorage.getItem("Mode")]),Object(l.useEffect)((function(){""===f.residential_address||""===f.emergency_person_name||""===f.emergency_person_number||""===f.landline||""===f.cell||""===f.email||""===f.login_id||""===f.emp_password?J(!0):J(!1)}),[f.residential_address,f.emergency_person_name,f.emergency_person_number,f.landline,f.cell,f.email,f.login_id,f.emp_password]);var U=function(e){d()(".Profile .ContainerHeader .ModeContainer .mode").removeClass("active"),d()(".Profile .ContainerHeader .ModeContainer #"+e).addClass("active"),sessionStorage.setItem("Mode",e),y(e)},Y=function(t){var n=new FileReader,a=t.target.name,i=e.ProfileData.name.substring(0,3)+e.ProfileData.father_name.substring(0,3)+e.ProfileData.cnic.substring(0,8);n.onload=function(){2===n.readyState&&("CV"===a?S({file:t.target.files[0],name:i+"_CV"}):"PRF"===a&&A({file:t.target.files[0],name:i+"_proof_of_address"}))},t.target.files[0]&&n.readAsDataURL(t.target.files[0])},q=function(e){var t=e.target,n=t.name,s=t.value,l=Object(i.a)(Object(i.a)({},f),{},Object(a.a)({},n,s));u(l)};return Object(h.jsxs)("div",{className:"AccountInfo w-100",children:[Object(h.jsxs)("div",{className:"ContainerHeader",children:[Object(h.jsx)("h4",{children:" Account Settings "}),Object(h.jsxs)("div",{className:"ModeContainer",children:[Object(h.jsx)("div",{id:"Normal",onClick:function(){return U("Normal")},className:"mode",children:"Default"}),Object(h.jsx)("div",{id:"Edit",onClick:function(){return U("Edit")},className:"mode",children:"Edit"})]})]}),Object(h.jsx)("br",{}),Object(h.jsxs)("div",{className:"FirstContainer",children:[Object(h.jsx)("div",{children:Object(h.jsx)("img",{src:"images/employees/"+e.ProfileData.emp_image,alt:"employee"})}),Object(h.jsxs)("div",{className:"pl-3 w-100",children:[Object(h.jsxs)("h5",{children:[" ",e.ProfileData.name," "]}),Object(h.jsx)("br",{}),"info"===e.SubView?Object(h.jsxs)("div",{className:"detailsContainer",children:[Object(h.jsx)(g,{label:"employee id",txt:e.ProfileData.emp_id}),Object(h.jsx)(g,{label:"father name",txt:e.ProfileData.father_name}),Object(h.jsx)(g,{label:"date of birth",txt:new Date(e.ProfileData.date_of_birth.substring(0,10)).toDateString()}),Object(h.jsx)(g,{label:"place of birth",txt:e.ProfileData.place_of_birth}),Object(h.jsx)(g,{label:"gender",txt:e.ProfileData.gender})]}):"contact"===e.SubView?Object(h.jsxs)("div",{className:"detailsContainer",children:["Edit"===O?Object(h.jsx)(v,{label:"residential address",value:f.residential_address,onChangeHandler:q,type:"text",name:"residential_address"}):Object(h.jsx)(g,{label:"residential address",txt:e.ProfileData.residential_address}),Object(h.jsx)(g,{label:"permanent address",txt:e.ProfileData.permanent_address}),"Edit"===O?Object(h.jsx)(v,{label:"emergency person",value:f.emergency_person_name,onChangeHandler:q,type:"text",name:"emergency_person_name"}):Object(h.jsx)(g,{label:"emergency person",txt:e.ProfileData.emergency_person_name}),"Edit"===O?Object(h.jsx)(v,{label:"emergency person number",value:f.emergency_person_number,onChangeHandler:q,type:"number",name:"emergency_person_number"}):Object(h.jsx)(g,{label:"emergency person number",txt:e.ProfileData.emergency_person_number}),"Edit"===O?Object(h.jsx)(v,{label:"landline",value:f.landline,onChangeHandler:q,type:"number",name:"landline"}):Object(h.jsx)(g,{label:"landline",txt:e.ProfileData.landline}),"Edit"===O?Object(h.jsx)(v,{label:"cell phone",value:f.cell,onChangeHandler:q,type:"number",name:"cell"}):Object(h.jsx)(g,{label:"cell phone",txt:e.ProfileData.cell})]}):"email"===e.SubView?Object(h.jsx)("div",{className:"detailsContainer",children:"Edit"===O?Object(h.jsx)(v,{label:"email",value:f.email,onChangeHandler:q,type:"email",name:"email"}):Object(h.jsx)(g,{label:"email",txt:e.ProfileData.email})}):"office"===e.SubView?Object(h.jsxs)("div",{className:"detailsContainer",children:[Object(h.jsx)(g,{label:"designation",txt:e.ProfileData.designation_name}),Object(h.jsx)(g,{label:"department",txt:e.ProfileData.department_name}),Object(h.jsx)(g,{label:"company",txt:e.ProfileData.company_name}),Object(h.jsx)(g,{label:"location",txt:e.ProfileData.location_name}),Object(h.jsx)(g,{label:"Employment",txt:e.ProfileData.emp_status}),Object(h.jsx)(g,{label:"Date of Join",txt:new Date(e.ProfileData.date_of_join.substring(0,10)).toDateString()}),Object(h.jsx)(g,{label:"time in",txt:e.ProfileData.time_in}),Object(h.jsx)(g,{label:"time out",txt:e.ProfileData.time_out}),Object(h.jsx)(g,{label:"Additional off",txt:0===JSON.parse(e.ProfileData.additional_off).length?"No Additional Off":JSON.parse(e.ProfileData.additional_off).map((function(t,n){return Object(h.jsxs)("span",{children:[t," ",n+1===JSON.parse(e.ProfileData.additional_off).length?"":", "]})}))})]}):"password"===e.SubView?Object(h.jsxs)("div",{className:"detailsContainer",children:["Edit"===O?Object(h.jsxs)("div",{children:[Object(h.jsx)(v,{label:"login id",value:f.login_id,onChangeHandler:q,type:D?"text":"password",name:"login_id"}),Object(h.jsxs)("div",{className:"d-flex align-items-center mt-2",children:[Object(h.jsx)("input",{type:"checkbox",onChange:function(e){return C(e.target.checked)},className:"mr-1"})," Show Login ID"]})]}):Object(h.jsx)(g,{label:"login id",txt:t.decrypt(e.ProfileData.login_id).split("").map((function(){return Object(h.jsx)("span",{style:{fontSize:"15px"},children:" * "})}))}),"Edit"===O?Object(h.jsxs)("div",{children:[Object(h.jsx)(v,{label:"password",value:f.emp_password,onChangeHandler:q,type:W?"text":"password",name:"emp_password"}),Object(h.jsxs)("div",{className:"d-flex align-items-center mt-2",children:[Object(h.jsx)("input",{type:"checkbox",onChange:function(e){return R(e.target.checked)},className:"mr-1"})," Show Password"]})]}):Object(h.jsx)(g,{label:"password",txt:t.decrypt(e.ProfileData.emp_password).split("").map((function(){return Object(h.jsx)("span",{style:{fontSize:"15px"},children:" * "})}))})]}):"documents"===e.SubView?Object(h.jsxs)("div",{className:"detailsContainer",children:[Object(h.jsx)(_,{label:"CNIC (front)",source:e.ProfileData.cnic_front_image}),Object(h.jsx)(_,{label:"CNIC (back)",source:e.ProfileData.cnic_back_image}),"Edit"===O?Object(h.jsxs)("div",{className:"AccountInfoItem",children:[Object(h.jsxs)("label",{children:[" ","CV"," "]}),Object(h.jsx)("input",{type:"file",className:"inputs",name:"CV",onChange:Y,accept:".jpg, .jpeg, .png, .pdf"})]}):Object(h.jsx)(_,{label:"CV",source:e.ProfileData.cv}),"Edit"===O?Object(h.jsxs)("div",{className:"AccountInfoItem",children:[Object(h.jsxs)("label",{children:[" ","Proof of address"," "]}),Object(h.jsx)("input",{type:"file",className:"inputs",name:"PRF",onChange:Y,accept:".jpg, .jpeg, .png, .pdf"})]}):Object(h.jsx)(_,{label:"Proof of address",source:e.ProfileData.proof_of_address}),null!==e.ProfileData.driving_license?Object(h.jsx)(_,{label:"driving license",source:e.ProfileData.driving_license}):null,null!==e.ProfileData.armed_license?Object(h.jsx)(_,{label:"armed license",source:e.ProfileData.armed_license}):null]}):null,"Edit"===O?Object(h.jsx)("button",{className:"btn updateBtn",disabled:L,onClick:function(){var e=new FormData;e.append("emp_id",sessionStorage.getItem("EmpID")),e.append("residential_address",f.residential_address),e.append("emergency_person_name",f.emergency_person_name),e.append("emergency_person_number",f.emergency_person_number),e.append("landline",f.landline),e.append("cell",f.cell),e.append("email",f.email),e.append("login_id",t.encrypt(f.login_id)),e.append("emp_password",t.encrypt(f.emp_password)),e.append("CV",E.file),e.append("CVName",E.name),e.append("PRF",M.file),e.append("PRFName",M.name),j.a.post("/updateprofile",e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(){alert("Profile Updated"),j.a.post("/getemployee",{empID:sessionStorage.getItem("EmpID"),view:"portal"}).then((function(e){c(Object(b.a)(e.data))})).catch((function(e){alert(e)}))})).catch((function(e){console.log(e)}))},children:"Update"}):null]})]})]})},w=function(e){var t=e.EmpNotifications;return Object(h.jsxs)("div",{className:"notificationsContainer",children:[Object(h.jsx)("div",{className:"ContainerHeader",children:Object(h.jsx)("h4",{children:" Notifications "})}),Object(h.jsx)("br",{}),t.map((function(e){return Object(h.jsx)(N,{title:e.notification_title,body:e.notification_body,date_time:e.notification_date,event_id:e.event_id},e.notification_id)}))]})},N=function(e){var t=e.title,n=e.body,a=e.event_id,i=e.key,s=e.date_time,l=new Date(s.substring(0,10)),c=l.getFullYear().toString(),o=1===(l.getMonth()+1).toString().length?"0"+(l.getMonth()+1):(l.getMonth()+1).toString(),r=1===l.getDate().toString().length?"0"+l.getDate():l.getDate().toString(),d=x()(c+o+r,"YYYYMMDD").fromNow();return Object(h.jsxs)("div",{className:"NotificationItem",children:[1===a?Object(h.jsx)("i",{className:"las la-comments mainIcon"}):2===a?Object(h.jsx)("i",{className:"las la-mail-bulk mainIcon"}):3===a?Object(h.jsx)("i",{className:"lar la-credit-card mainIcon"}):4===a?Object(h.jsx)("i",{className:"las la-calendar-day mainIcon"}):null,Object(h.jsxs)("div",{children:[Object(h.jsxs)("h6",{children:[" ",t," "]}),Object(h.jsxs)("p",{className:"mb-0",children:[" ",n," "]}),Object(h.jsxs)("div",{className:"d-flex align-items-center",children:[Object(h.jsx)("i",{className:"las la-history"})," ",Object(h.jsx)("small",{className:"text-secondary pl-1",children:d})]})]})]},i)},D=function(){var e=c.a.createRef(),t=Object(l.useState)([]),n=Object(s.a)(t,2),a=n[0],i=n[1];return Object(l.useEffect)((function(){j.a.post("/getempattdetails",{empID:sessionStorage.getItem("EmpID")}).then((function(e){i(e.data)})).catch((function(e){console.log(e)}))}),[]),Object(h.jsxs)("div",{className:"AttendanceContainer",children:[Object(h.jsxs)("div",{className:"ContainerHeader",children:[Object(h.jsx)("h4",{children:" Attendance "}),Object(h.jsx)("div",{className:"ModeContainer",children:Object(h.jsx)("div",{id:"Edit",onClick:function(){},style:{backgroundColor:"var(--blue)"},className:"mode text-white",children:Object(h.jsx)(u.a,{id:"test-table-xls-button",className:"download-table-xls-button",table:"table-to-xls",filename:sessionStorage.getItem("EmpID")+"_attendance-sheet",sheet:["Employees","Employees","Employees","Employees"],buttonText:"Export"})})})]}),Object(h.jsx)("br",{}),Object(h.jsxs)("table",{className:"table",id:"table-to-xls",ref:e,children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{className:"d-none",children:"ID"}),Object(h.jsx)("th",{children:"Name"}),Object(h.jsx)("th",{children:"Date"}),Object(h.jsx)("th",{className:"d-none",children:"Day"}),Object(h.jsx)("th",{children:"Time in"}),Object(h.jsx)("th",{children:"Break in"}),Object(h.jsx)("th",{children:"Break out"}),Object(h.jsx)("th",{children:"Time out"}),Object(h.jsx)("th",{children:"Status"})]})}),Object(h.jsx)("tbody",{children:a.map((function(e,t){var n=new Date(e.emp_date),a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][n.getDay()];return Object(h.jsxs)("tr",{style:{backgroundColor:"Sunday"===a||"Holiday"===e.status||"OFF"===e.status?"#bbbdc3":"Absent"===e.status||"leave"===e.status||"Late"===e.status?"#F1F3F2":"#fff"},children:[Object(h.jsxs)("td",{className:"d-none",children:[" ",sessionStorage.getItem("EmpID")," "]}),Object(h.jsx)("td",{children:sessionStorage.getItem("name")}),Object(h.jsx)("td",{children:n?n.toDateString():null}),Object(h.jsxs)("td",{className:"d-none",children:[" ",a," "]}),Object(h.jsx)("td",{children:e.time_in}),Object(h.jsx)("td",{children:e.break_in}),Object(h.jsx)("td",{children:e.break_out}),Object(h.jsx)("td",{children:e.time_out}),Object(h.jsx)("td",{children:e.status})]},t)}))})]})]})}},392:function(e,t,n){}}]);