(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[68],{433:function(e,c,s){"use strict";s.r(c);var t=s(5),i=s(11),d=s(1),n=(s(434),s(0));c.default=function(){var e=Object(d.useState)([]),c=Object(t.a)(e,2),s=c[0],l=c[1],j=Object(d.useState)([]),b=Object(t.a)(j,2),a=b[0],r=b[1];Object(d.useEffect)((function(){i.a.get("/getemployeesid&name").then((function(e){l(e.data)})).catch((function(e){console.log(e)}))}),[]);return Object(n.jsx)(n.Fragment,{children:Object(n.jsxs)("div",{className:"Admin_View_Employees",children:[Object(n.jsxs)("select",{className:"form-control",onChange:function(e){i.a.post("/getemployee",{empID:e.target.value}).then((function(e){r(e.data)})).catch((function(e){console.log(e)}))},required:!0,children:[Object(n.jsx)("option",{value:"",children:"Select Employee"}),s.map((function(e,c){return Object(n.jsxs)("option",{value:e.emp_id,children:[e.emp_id," ",e.name]})}))]}),Object(n.jsx)("div",{className:"Details_of_Employee",children:a.map((function(e){return Object(n.jsxs)("div",{className:"InputDetailsGrid",children:[Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Emlpoyee ID"}),Object(n.jsx)("p",{children:e.emp_id})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Name"}),Object(n.jsx)("p",{children:e.name})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Father Name"}),Object(n.jsx)("p",{children:e.father_name})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Date of birth"}),Object(n.jsx)("p",{children:e.date_of_birth})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Place of birth"}),Object(n.jsx)("p",{children:e.place_of_birth})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Residential Address"}),Object(n.jsx)("p",{children:e.residential_address})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Permanent Address"}),Object(n.jsx)("p",{children:e.permanent_address})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Emergency person name"}),Object(n.jsx)("p",{children:e.emergency_person_name})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Emergency person number"}),Object(n.jsx)("p",{children:e.emergency_person_number})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Phone Number ( Landline )"}),Object(n.jsx)("p",{children:e.landline})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Phone Number ( Cell )"}),Object(n.jsx)("p",{children:e.cell})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Gender"}),Object(n.jsx)("p",{children:e.gender})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Time in"}),Object(n.jsx)("p",{children:e.time_in})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Time Out"}),Object(n.jsx)("p",{children:e.time_out})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Salary"}),Object(n.jsx)("p",{children:e.salary})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Date of Joining"}),Object(n.jsx)("p",{children:e.date_of_join})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Additional Off"}),Object(n.jsx)("p",{children:e.additional_off})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Employee status"}),Object(n.jsx)("p",{children:e.emp_status})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Email"}),Object(n.jsx)("p",{children:e.email})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Access"}),Object(n.jsx)("p",{children:e.access})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Marital Status"}),Object(n.jsx)("p",{children:e.marital_status})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"CNIC"}),Object(n.jsx)("p",{children:e.cnic})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"CNIC Date of issue"}),Object(n.jsx)("p",{children:e.cnic_date_of_issue})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"CNIC Date of expiry"}),Object(n.jsx)("p",{children:e.cnic_date_of_expiry})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"CNIC Place of issue"}),Object(n.jsx)("p",{children:e.cnic_place_of_issue})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"CNIC Front Image"}),Object(n.jsx)("img",{src:"images/documents/cnic/front/"+e.cnic_front_image,alt:"",style:{width:"30%"}})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"CNIC Back Image"}),Object(n.jsx)("img",{src:"images/documents/cnic/back/"+e.cnic_back_image,alt:"",style:{width:"30%"}})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Guest Meetable"}),Object(n.jsx)("p",{children:e.guest_meetable})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Company Code"}),Object(n.jsx)("p",{children:e.company_code})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Location Code"}),Object(n.jsx)("p",{children:e.location_code})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Department Code"}),Object(n.jsx)("p",{children:e.department_code})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Designation Code"}),Object(n.jsx)("p",{children:e.designation_code})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"User ID"}),Object(n.jsx)("p",{children:e.user_id})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Grade Code"}),Object(n.jsx)("p",{children:e.grade_code})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Created At"}),Object(n.jsx)("p",{children:e.created_at})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Updated At"}),Object(n.jsx)("p",{children:e.updated_at})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"User Name"}),Object(n.jsx)("p",{children:e.user_name})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"User Image"}),Object(n.jsx)("img",{src:"images/users/"+e.user_image,alt:"",style:{width:"30%"}})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"ID"}),Object(n.jsx)("p",{children:e.id})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Login ID"}),Object(n.jsx)("p",{children:e.login_id})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Emp Password"}),Object(n.jsx)("p",{children:e.emp_password})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Emp Image"}),Object(n.jsx)("img",{src:"images/employees/"+e.emp_image,alt:"",style:{width:"30%"}})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Emp CV"}),Object(n.jsx)("img",{src:"images/documents/cv/"+e.cv,alt:"",style:{width:"30%"}})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Emp proof of address"}),Object(n.jsx)("img",{src:"images/documents/address/"+e.proof_of_address,alt:"",style:{width:"30%"}})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Emp armed license"}),null===e.armed_license?Object(n.jsx)("p",{children:"misssing"}):Object(n.jsx)("img",{src:"images/documents/licenses/armed/"+e.armed_license,alt:"",style:{width:"30%"}})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Emp driving license"}),null===e.driving_license?Object(n.jsx)("p",{children:"misssing"}):Object(n.jsx)("img",{src:"images/documents/licenses/driving/"+e.driving_license,alt:"",style:{width:"30%"}})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Company Name"}),Object(n.jsx)("p",{children:e.company_name})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Location Name"}),Object(n.jsx)("p",{children:e.location_name})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Designation Name"}),Object(n.jsx)("p",{children:e.designation_name})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{className:"font-weight-bold mb-0",children:"Department Name"}),Object(n.jsx)("p",{children:e.department_name})]})]})}))})]})})}},434:function(e,c,s){}}]);