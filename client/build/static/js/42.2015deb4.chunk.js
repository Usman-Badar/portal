(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[42],{549:function(e,c,s){"use strict";s.r(c);var l=s(4),t=s(11),a=s(1),d=(s(550),s(92)),i=s(0);c.default=function(){var e=Object(a.useState)([]),c=Object(l.a)(e,2),s=c[0],n=c[1],o=Object(a.useState)([]),m=Object(l.a)(o,2),j=m[0],r=m[1],b=Object(a.useState)([{}]),h=Object(l.a)(b,2),x=h[0],O=h[1];Object(a.useEffect)((function(){O([{icon:"las la-cloud-upload-alt",txt:"Create Employee",link:!0,href:"/employment_setup/form"},{icon:"las la-cloud-upload-alt",txt:"View Employee",link:!0,href:"/employment_setup/employees"},{icon:"las la-cloud-upload-alt",txt:"Employement Request",link:!0,href:"/employment_setup/requests"}])}),[]),Object(a.useEffect)((function(){t.a.get("/getemployeesid&name").then((function(e){n(e.data)})).catch((function(e){console.log(e)}))}),[]);var p=function(e){t.a.post("/getemployee",{empID:e.target.value}).then((function(e){r(e.data)})).catch((function(e){console.log(e)}))};return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(d.a,{data:x}),Object(i.jsxs)("div",{className:"View_Employees",children:[Object(i.jsx)("div",{className:"jumbotron-fluid bg-white m-5 mb-0 shadow-sm p-4 rounded",children:Object(i.jsxs)("div",{className:"container-fluid row",children:[Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("h6",{children:" Select Company "}),Object(i.jsxs)("select",{className:"form-control",onChange:p,required:!0,children:[Object(i.jsx)("option",{value:""}),s.map((function(e,c){return Object(i.jsxs)("option",{value:e.emp_id,children:[e.emp_id," ",e.name]})}))]})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("h6",{children:" Select Employee "}),Object(i.jsxs)("select",{className:"form-control",onChange:p,required:!0,children:[Object(i.jsx)("option",{value:""}),s.map((function(e,c){return Object(i.jsxs)("option",{value:e.emp_id,children:[e.emp_id," ",e.name]})}))]})]})]})}),Object(i.jsx)("div",{className:"Details_of_Employee jumbotron-fluid bg-white m-5 mb-0 shadow-sm p-4 rounded",children:j.map((function(e,c){return Object(i.jsx)("div",{className:"container-fluid font-italic",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Emlpoyee ID"}),Object(i.jsx)("p",{className:"text-secondary",children:e.emp_id})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Name"}),Object(i.jsx)("p",{className:"text-secondary",children:e.name})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Father Name"}),Object(i.jsx)("p",{className:"text-secondary",children:e.father_name})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Date of birth"}),Object(i.jsx)("p",{className:"text-secondary",children:e.date_of_birth})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Place of birth"}),Object(i.jsx)("p",{className:"text-secondary",children:e.place_of_birth})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Residential Address"}),Object(i.jsx)("p",{className:"text-secondary",children:e.residential_address})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Permanent Address"}),Object(i.jsx)("p",{className:"text-secondary",children:e.permanent_address})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Emergency person name"}),Object(i.jsx)("p",{className:"text-secondary",children:e.emergency_person_name})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Emergency person number"}),Object(i.jsx)("p",{className:"text-secondary",children:e.emergency_person_number})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Phone Number ( Landline )"}),Object(i.jsx)("p",{className:"text-secondary",children:e.landline})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Phone Number ( Cell )"}),Object(i.jsx)("p",{className:"text-secondary",children:e.cell})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Gender"}),Object(i.jsx)("p",{className:"text-secondary",children:e.gender})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Time in"}),Object(i.jsx)("p",{className:"text-secondary",children:e.time_in})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Time Out"}),Object(i.jsx)("p",{className:"text-secondary",children:e.time_out})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Salary"}),Object(i.jsx)("p",{className:"text-secondary",children:e.salary})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Date of Joining"}),Object(i.jsx)("p",{className:"text-secondary",children:e.date_of_join})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Additional Off"}),Object(i.jsx)("p",{className:"text-secondary",children:e.additional_off})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Employee status"}),Object(i.jsx)("p",{className:"text-secondary",children:e.emp_status})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Email"}),Object(i.jsx)("p",{className:"text-secondary",children:e.email})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Marital Status"}),Object(i.jsx)("p",{className:"text-secondary",children:e.marital_status})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"CNIC"}),Object(i.jsx)("p",{className:"text-secondary",children:e.cnic})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"CNIC Date of issue"}),Object(i.jsx)("p",{className:"text-secondary",children:e.cnic_date_of_issue})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"CNIC Date of expiry"}),Object(i.jsx)("p",{className:"text-secondary",children:e.cnic_date_of_expiry})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"CNIC Place of issue"}),Object(i.jsx)("p",{className:"text-secondary",children:e.cnic_place_of_issue})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"CNIC Front Image"}),Object(i.jsx)("img",{src:"images/documents/cnic/front/"+e.cnic_front_image,alt:"",style:{width:"30%"}})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"CNIC Back Image"}),Object(i.jsx)("img",{src:"images/documents/cnic/back/"+e.cnic_back_image,alt:"",style:{width:"30%"}})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Company Code"}),Object(i.jsx)("p",{className:"text-secondary",children:e.company_code})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Location Code"}),Object(i.jsx)("p",{className:"text-secondary",children:e.location_code})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Department Code"}),Object(i.jsx)("p",{className:"text-secondary",children:e.department_code})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Designation Code"}),Object(i.jsx)("p",{className:"text-secondary",children:e.designation_code})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Grade Code"}),Object(i.jsx)("p",{className:"text-secondary",children:e.grade_code})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Created At"}),Object(i.jsx)("p",{className:"text-secondary",children:e.created_at})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Updated At"}),Object(i.jsx)("p",{className:"text-secondary",children:e.updated_at})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Emp Image"}),Object(i.jsx)("img",{src:"images/employees/"+e.emp_image,alt:"",style:{width:"30%"}})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Emp CV"}),Object(i.jsx)("img",{src:"images/documents/cv/"+e.cv,alt:"",style:{width:"30%"}})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Emp proof of address"}),Object(i.jsx)("img",{src:"images/documents/address/"+e.proof_of_address,alt:"",style:{width:"30%"}})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Emp armed license"}),null===e.armed_license?Object(i.jsx)("p",{children:"misssing"}):Object(i.jsx)("img",{src:"images/documents/licenses/armed/"+e.armed_license,alt:"",style:{width:"30%"}})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Emp driving license"}),null===e.driving_license?Object(i.jsx)("p",{children:"misssing"}):Object(i.jsx)("img",{src:"images/documents/licenses/driving/"+e.driving_license,alt:"",style:{width:"30%"}})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Company Name"}),Object(i.jsx)("p",{className:"text-secondary",children:e.company_name})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Location Name"}),Object(i.jsx)("p",{className:"text-secondary",children:e.location_name})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Designation Name"}),Object(i.jsx)("p",{className:"text-secondary",children:e.designation_name})]}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[Object(i.jsx)("p",{className:"font-weight-bold mb-0",children:"Department Name"}),Object(i.jsx)("p",{className:"text-secondary",children:e.department_name})]})]})},c)}))})]})]})}},550:function(e,c,s){},92:function(e,c,s){"use strict";var l=s(1),t=(s(93),s(79)),a=s.n(t),d=s(17),i=s(0);c.a=function(e){Object(l.useEffect)((function(){a()(".Speeddail_Grid").slideToggle(0)}),[]);return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)("div",{className:"Menu",children:e.data.length>0?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:"Menu_Grid",children:e.data.map((function(e,c){return Object(i.jsx)(i.Fragment,{children:e&&e.txt?e.link?Object(i.jsx)(d.b,{to:e.href,children:Object(i.jsx)("button",{children:Object(i.jsx)("p",{className:"font-weight-bolder mb-0",children:e.txt})})}):Object(i.jsx)("button",{onClick:function(){return e.func()},children:Object(i.jsx)("p",{className:"font-weight-bolder mb-0",children:e.txt})}):null})}))}),Object(i.jsxs)("div",{className:"Menu_Speeddail",children:[Object(i.jsx)("div",{className:"Menu_Speeddail_circle",onClick:function(){a()(".Menu_Speeddail .Speeddail_Grid").slideToggle(200),a()(".Menu_Speeddail .Menu_Speeddail_circle .las").hasClass("la-bars")?(a()(".Menu_Speeddail .Menu_Speeddail_circle .las").removeClass("la-bars"),a()(".Menu_Speeddail .Menu_Speeddail_circle .las").addClass("la-times")):(a()(".Menu_Speeddail .Menu_Speeddail_circle .las").removeClass("la-times"),a()(".Menu_Speeddail .Menu_Speeddail_circle .las").addClass("la-bars"))},children:Object(i.jsx)("i",{class:"las la-times"})}),Object(i.jsx)("div",{className:"Speeddail_Grid",children:e.data.map((function(e,c){return Object(i.jsx)(i.Fragment,{children:e&&e.txt?e.link?Object(i.jsx)(d.b,{to:e.href,children:Object(i.jsxs)("div",{children:[Object(i.jsx)("div",{className:"mb-1 Speeddail_Grid1 divs"+c,children:Object(i.jsx)("i",{className:e.icon})}),Object(i.jsx)("p",{children:e.txt})]},c)}):Object(i.jsxs)("div",{className:"clicks",onClick:function(){return e.func()},children:[Object(i.jsx)("div",{className:"mb-1 Speeddail_Grid1 divs"+c,children:Object(i.jsx)("i",{className:e.icon})}),Object(i.jsx)("p",{children:e.txt})]},c):null})}))})]})]}):null})})}},93:function(e,c,s){}}]);