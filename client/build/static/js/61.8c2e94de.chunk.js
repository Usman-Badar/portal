(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[61],{744:function(e,t,a){},802:function(e,t,a){"use strict";a.r(t);var c=a(4),s=a(1),n=a.n(s),r=(a(744),a(158)),i=a(0),d=n.a.memo((function(e){var t=Object(s.useState)([]),a=Object(c.a)(t,2),n=a[0],d=a[1],l=Object(s.useState)(!1),j=Object(c.a)(l,2),o=j[0],m=j[1],b=Object(s.useState)(new Date),h=Object(c.a)(b,2),p=h[0],O=h[1],u=Object(s.useState)(),x=Object(c.a)(u,2),g=x[0],y=x[1],w=Object(s.useState)({}),D=Object(c.a)(w,2),S=D[0],_=D[1],v=Object(s.useState)({}),N=Object(c.a)(v,2),f=N[0],T=N[1];return Object(s.useEffect)((function(){m(e.LoadingState),d(e.Chat),O(e.Calender),y(e.EmpID),_(e.ChatEmployee),T(e.CurrentEmployeeData)}),[e.LoadingState,e.Chat,e.Calender,e.EmpID,e.ChatEmployee,e.CurrentEmployeeData]),Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:o?"LoadingStateForDailyChat":"LoadingStateForDailyChat d-none",children:Object(i.jsx)("img",{src:r.a,alt:"Please wait.....",width:"50",height:"50",className:"rounded-circle"})}),n.map((function(t,a){var c="";e.encryptor.decrypt(t.chat_body).includes("/***")&&(c=e.encryptor.decrypt(t.chat_body).split("/***")[1].split("***")[0]);var s=new Date(t.send_date),r=null;if(p.toDateString()===(new Date).toDateString())if(a-1>=0){var d=new Date(n[a-1].send_date).toDateString(),l=new Date(n[a].send_date).toDateString();l!==d&&(r=Object(i.jsxs)("p",{className:"TweetDate",children:[" ",l]}))}else 0===a&&(r=Object(i.jsxs)("p",{className:"TweetDate",children:[" ",new Date(n[a].send_date).toDateString()]}));return Object(i.jsx)(i.Fragment,{children:p.toDateString()===(new Date).toDateString()?Object(i.jsxs)(i.Fragment,{children:[r,Object(i.jsxs)("div",{className:t.sender_id!==g?"Tweet":"Tweet owner",children:[Object(i.jsxs)("p",{className:"Tweeter",children:[" ",t.sender_id!==g?S.name:f.name]}),Object(i.jsx)("div",{className:"TweetBox",children:e.encryptor.decrypt(t.chat_body).includes("/***")?Object(i.jsx)("img",{src:"images/drive/"+c,width:"100%",height:"auto",alt:"drive attachment"}):Object(i.jsx)(i.Fragment,{children:e.encryptor.decrypt(t.chat_body)})}),Object(i.jsxs)("p",{className:"TweetTime",children:[t.sender_id!==g?null:Object(i.jsx)(i.Fragment,{children:"Read"===t.read_status?Object(i.jsx)("i",{style:{fontSize:"12px !important"},className:"las la-check-double mr-1"}):Object(i.jsx)("i",{style:{fontSize:"12px !important"},className:"las la-check mr-1"})}),e.tConvert(t.send_time)]})]},a)]}):s.toDateString()===p.toDateString()?Object(i.jsx)(i.Fragment,{children:Object(i.jsxs)("div",{className:t.sender_id!==g?"Tweet":"Tweet owner",children:[Object(i.jsxs)("p",{className:"Tweeter",children:[" ",t.sender_id!==g?S.name:f.name]}),Object(i.jsx)("div",{className:"TweetBox",children:e.encryptor.decrypt(t.chat_body).includes("/***")?Object(i.jsx)("img",{src:"images/drive/"+c,width:"100%",height:"auto",alt:"drive attachment"}):Object(i.jsx)(i.Fragment,{children:e.encryptor.decrypt(t.chat_body)})}),Object(i.jsxs)("p",{className:"TweetTime",children:["Read"===t.read_status?Object(i.jsx)("i",{style:{fontSize:"12px !important"},className:"las la-check-double mr-1"}):Object(i.jsx)("i",{style:{fontSize:"12px !important"},className:"las la-check mr-1"}),e.tConvert(t.send_time)]})]},a)}):null})}))]})}));t.default=d}}]);
//# sourceMappingURL=61.8c2e94de.chunk.js.map