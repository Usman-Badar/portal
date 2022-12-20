import React, { useState, useEffect } from 'react'
import './EmployeeProfile.css';

import { useSelector } from 'react-redux';
// import TodayAttendance from './Components/TodayAttendance/TodayAttendance';
// import Slider from "react-slick";
import $ from 'jquery';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Model from '../../../../UI/Modal/Modal';
import Menu from '../../../../UI/Menu/Menu.jsx';
import axios from '../../../../../axios';

// import DailyAttendance from './DailyAttendance/New_Employee_Att';
// import New_Employee_Att from './DailyAttendance/New_Employee_Att';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import ReactTooltip from 'react-tooltip';


import moment from "moment";
import AttendanceList from './Components/AttendanceList/AttendanceList';

const EmployeeProfile = () => {

    const [EditableProfile, setEditableProfile] = useState(
        {
            login_id: '',
            password: '',
            contact: '',
            emergency_contact: '',
            emergency_contact_no: '',
            email: '',
            address: ''
        }
    );
    const [ShowEditBtn, setShowEditBtn] = useState( true );
    const [ModalShow, setModalShow] = useState(false);
    const [ModalContent, setModalContent] = useState(<></>);
    const [Data, setData] = useState([]);

    const [Attendance, setAttendance] = useState([]);
    const [AttendanceInOuts, setAttendanceInOuts] = useState([]);

    const [NoofDays, setNoofDays] = useState([]);

    let key = 'real secret keys should be long and random';
    const encryptor = require('simple-encryptor')(key);

    useEffect(
        () => {

            const Data = new FormData();
            Data.append('empID', sessionStorage.getItem('EmpID'));
            axios.post('/getempattdetails', Data).then(response => {

                setAttendance(response.data);
                axios.post('/getempinoutsdetails', Data).then(response => {

                    setAttendanceInOuts(response.data);


                }).catch(err => {

                    console.log(err);

                });

            }).catch(err => {

                console.log(err);

            });


        }, []
    )

    useEffect(
        () => {
            
            $('.meetingdetials').hide(0);

        }, [ NoofDays ]
    )

    useEffect(
        () => {
            $('.TabsBtn').removeClass('b1-bottom-none');
            $('.Tabs').hide();
            $('.TabBtn0').addClass('b1-bottom-none');
            $('.Tabs0').show();
            $('.EditBox').hide();
            $('.save_Icon').hide(); 
            $('.Tabs0').show();
            $('.ShowImage').hide(); 

            setData(
                [
                    {
                        icon: 'las la-user',
                        txt: 'About',
                        link: false, // || true
                        func: () => ShowTabs('Tabs0', 'TabBtn0')
                    },
                    {
                        icon: 'las la-clipboard',
                        txt: 'Records',
                        link: false, // || true
                        func: () => ShowTabs('Tabs1', 'TabBtn1')
                    },
                    {
                        icon: 'las la-share',
                        txt: 'Attendence',
                        link: false, // || true
                        func: () => ShowTabs('Tabs2', 'TabBtn2')
                    },
                ]
            )

            let arr = [];
        
            for ( let x = 0; x < 30; x++ )
            {
                arr.push( x );
            }
        
            setNoofDays( arr );
        }, []

    );


    const ShowTabs = (OpenTab, TabBtn) => {

        $('.TabsBtn').removeClass('b1-bottom-none');
        $('.Tabs').hide();
        $('.' + TabBtn).addClass('b1-bottom-none');
        $('.' + OpenTab).show();

        if ( TabBtn === 'TabBtn0' )
        {
            setShowEditBtn( true );
        }else
        {
            setShowEditBtn( false );
        }

    }

    const ProfileData = useSelector((state) => state.EmpAuth.EmployeeData);

    const AboutArr = [
        {
            left: 'Name : ',
            right: ProfileData.name,
            editable: true
        },
        {
            left: 'Father Name : ',
            right: ProfileData.father_name,
            editable: true
        },
        {
            left: 'Date Of Birth :',
            right: ProfileData.date_of_birth ? ProfileData.date_of_birth.toString().substring(0, 10) : null,
            editable: false
        },
        {
            left: 'Gender :',
            right: ProfileData.gender,
            editable: false
        },
        {
            left: 'Marital Status :',
            right: ProfileData.marital_status,
            editable: false
        },
        // {
        //     left: 'No: Of Childrens :',
        //     right: ProfileData.children,
        // },
        // {
        //     left: 'Name :',
        //     right: 'ksdnvjnsv',
        // },
        // {
        //     left: 'Name :',
        //     right: 'avsfbsb',
        // }
    ]
    const AboutArr1 = [
        {
            left: 'Contact No :',
            right: ProfileData.cell,
            editable: true

        },
        {
            left: 'Emergency Person Name : ',
            right: ProfileData.emergency_person_name,
            editable: true
        },
        {
            left: 'Emergency Contact No : ',
            right: ProfileData.emergency_person_number,
            editable: true
        },
        {
            left: 'Email : ',
            right: ProfileData.email,
            editable: true
        },
        {
            left: 'Address :',
            right: ProfileData.permanent_address,
            editable: true
        },
        {
            left: 'CNIC :',
            right: ProfileData.cnic,
            editable: false
        },
    ]
    const AboutArr2 = [
        {
            left: 'Employee ID : ',
            right: ProfileData.emp_id,
            editable: false

        },
        {
            left: 'Employee Company : ',
            right: ProfileData.company_name,
            editable: false
        },
        {
            left: 'Department : ',
            right: ProfileData.department_name,
            editable: false
        },
        {
            left: 'Joining Date : ',
            right: ProfileData.date_of_join ? ProfileData.date_of_join.toString().substring(0, 10) : null,
            editable: false
        },
    ]
    const RecordsArr1 = [
        {
            Image: 'images/documents/cnic/front/' + ProfileData.cnic_front_image,
            PicName: 'CNIC Front',
        },
        {
            Image: 'images/documents/cnic/back/' + ProfileData.cnic_back_image,
            PicName: 'CNIC Back',
        },
        {
            Image: 'images/documents/cv/' + ProfileData.cv,
            PicName: 'CV',
        },
        {
            Image: 'images/documents/address/' + ProfileData.proof_of_address,
            PicName: 'Proof of Address',
        },
    ]
    const RecordsArr2 = [
        {
            Image: 'images/documents/cv/' + ProfileData.cv,
            PicName: 'CV',
        },
        {
            Image: 'images/documents/address/' + ProfileData.proof_of_address,
            PicName: 'Proof of Address',
        },
    ]

    const editarr = [
        {
            editleft: "Login ID :",
            editright: encryptor.decrypt(ProfileData.login_id),
            icon: 'las la-eye'
        },
        {
            editleft: "Login Password :",
            editright: encryptor.decrypt( ProfileData.emp_password ),
            icon: 'las la-eye'
        },
        {
            editleft: "Contact No :",
            editright: ProfileData.cell
        },
        {
            editleft: "Emergency Contact Name :",
            editright: ProfileData.emergency_person_name
        },
        {
            editleft: "Emergency Contact No :",
            editright: ProfileData.emergency_person_number
        },
        {
            editleft: "Email :",
            editright: ProfileData.email
        },
        {
            editleft: "Address :",
            editright: ProfileData.permanent_address
        }
    ]
    const ShowPicDiv = (img) => {
        $('.ShowImage').show();
        $('img.ShowImage').attr('src', img);
    }

    const hideshowicon = (className) => {

        console.log(className);

        if ($('.modalcontentright .form-control.credentials.' + className).attr('type') === 'password') {
            $('.modalcontentright .form-control.credentials.' + className).attr('type', 'text');
            $('#EyeIcon' + className).removeClass('las la-eye');
            $('#EyeIcon' + className).addClass('las la-eye-slash');
        } else {
            $('.modalcontentright .form-control.credentials.' + className).attr('type', 'password');
            $('#EyeIcon' + className).removeClass('las la-eye-slash');
            $('#EyeIcon' + className).addClass('las la-eye');
        }

        // $('#Passicon').toggle();
        // if ($('.modalcontentright .form-control').attr('type', 'password')) {

        //     $('.modalcontentright .form-control').attr('type', 'text');
        //     $('#Passicon').addClass('las la-eye-slash');

        // }else if ($('.modalcontentright .form-control').attr('type', 'text')) {

        //     $('.modalcontentright .form-control').attr('type', 'password');
        //     $('#Passicon').addClass('las la-eye-slash');

        // }
    }



    const ShowEditDiv = () => {
        let content = null;

        if (ModalShow) {
            setModalShow(false);
        } else {

            content = 
            <form onSubmit={ EditProfile } className='ModalDiv'>
                {
                    editarr.map(
                        (val) => {

                            return (
                                <div className='ModalGrid'>
                                    <div className='modalcontentleft font-italic'><p>{val.editleft}</p></div>
                                    {
                                        val.editleft === "Login Password :" || val.editleft === "Login ID :"
                                            ?
                                            <div className='modalcontentright'>
                                                <input onChange={ onEditProfileChange } required type="password" className={'form-control credentials font-italic ' + (val.editleft === "Login Password :" ? "pass" : 'id')} value={val.editright} />
                                                <i
                                                    className={val.icon}
                                                    style={{ fontSize: "18px", marginRight: "10px" }}
                                                    id={'EyeIcon' + (val.editleft === "Login Password :" ? "pass" : 'id')}
                                                    onClick={() => hideshowicon((val.editleft === "Login Password :" ? "pass" : 'id'))}
                                                ></i>
                                            </div>
                                            :
                                            <div className='modalcontentright'><input onChange={ onEditProfileChange } required type="text" className='form-control font-italic' value={val.editright} /></div>
                                    }
                                </div>
                            )
                        }
                    )
                }
                <div className='Modalbutton'>
                    <button type="reset" className='btn' onClick={ () => setModalShow(false) }>Cancle</button>
                    <button type="submit" className='btn'>Save changes</button>
                </div>
            </form>
            setModalContent(content);
            setModalShow(true);
        }

    }

    const onEditProfileChange = ( e ) => {

        e.preventDefault();

    }

    const EditProfile = ( e ) => {

        e.preventDefault();

    }

    const todayAtt = ( time_in, break_in, break_out, time_out ) => {

        const d = new Date();

        var breakinTime2 = null;
        var breakoutTime2 = null;
        var duration2 = null;
        var hours2 = null;
        var minutes2 = null;

        if (break_out === null) {

            breakinTime2 = moment(break_in, "HH:mm:ss");
            breakoutTime2 = moment(d.toTimeString(), "HH:mm:ss");
            duration2 = moment.duration(breakoutTime2.diff(breakinTime2));
            hours2 = parseInt(duration2.asHours());
            minutes2 = parseInt(duration2.asMinutes()) - hours2 * 60;

        } else {

            breakinTime2 = moment(break_in, "HH:mm:ss");
            breakoutTime2 = moment(break_out, "HH:mm:ss");
            duration2 = moment.duration(breakoutTime2.diff(breakinTime2));
            hours2 = parseInt(duration2.asHours());
            minutes2 = parseInt(duration2.asMinutes()) - hours2 * 60;

        }

        let b = null;
        if (Number.isNaN(duration2.asMinutes()) || duration2.asMinutes() === null) {
            b = 0 / 60 * 100;
        } else {
            b = parseInt(duration2.asMinutes()) / 60 * 100;
        }


        var startTime4 = null;
        var endTime4 = null;
        var duration4 = null;
        var hours4 = null;
        // var minutes4 = null;

        if (time_out === null) {

            startTime4 = moment(time_in, "HH:mm:ss");
            endTime4 = moment(d.toTimeString(), "HH:mm:ss");
            duration4 = moment.duration(endTime4.diff(startTime4));
            hours4 = parseInt(duration4.asHours());
            // minutes4 = parseInt(duration4.asMinutes()) - hours4 * 60;

        } else {

            startTime4 = moment(time_in, "HH:mm:ss");
            endTime4 = moment(time_out, "HH:mm:ss");
            duration4 = moment.duration(endTime4.diff(startTime4));
            hours4 = parseInt(duration4.asHours());
            // minutes4 = parseInt(duration4.asMinutes()) - hours4 * 60;
        }


    }

    const OpenDiv = ( id ) => {

        $('.meetingdetial' + id).toggle();

    }

    //calender function *

    const date = new Date();

    useEffect(
        () => {

            renderCalendar();

            $('.alldays i').on(
                'click', ( e ) => {

                    const { id } = e.target;
                    $('.meetingdetial').not('.' + id).hide('fast');
                    $('.' + id).toggle('fast').animate( { opacity: 1 }, 300 );

                }
            )

            $('.alldays').on(
                'click', ( e ) => {

                    alert('asdasd')

                }
            )

        }, []
    );

    const renderCalendar = () => {
        date.setDate(1);

        const monthDays = document.querySelector(".days");

        const lastDay = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        const prevLastDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        ).getDate();

        const firstDayIndex = date.getDay();

        const lastDayIndex = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDay();

        const nextDays = 7 - lastDayIndex - 1;

        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const meetings = [
            {
                date: "2022-02-15",
                time: '13:00:00',
                location: 'headoffice',
                participants: ["usman", "Malahim"]
            },
            {
                date: "2022-02-28",
                time: '13:00:00',
                location: 'headoffice',
                participants: ["usman", "Malahim"]
            }
        ]

        // document.querySelector(".date h1").innerHTML = months[date.getMonth()];

        // document.querySelector(".date p").innerHTML = new Date().toDateString();

        // let days = "";

        // for (let x = firstDayIndex; x > 0; x--) {
        //     days += `<div class="prev-date previous${ prevLastDay - x + 1 }">${prevLastDay - x + 1}</div>`;
        // }

        // for (let i = 1; i <= lastDay; i++) {
        //     days += `<div class="${ i === new Date().getDate() && date.getMonth() === new Date().getMonth() ? 'today alldays current' + ( new Date().getMonth() + 1 ) + '-' + i : 'alldays current' + ( new Date().getMonth() + 1 ) + '-' + i }">${i} <i class="las la-bell ${ i }" id="days${ i }"></i> 
        //         <div class="meetingdetial days${ i }">
        //             <p class='font-weight-bolder text-center mb-2' style="font-size: 15px">Sample Meeting</p>
        //              <div class='d-flex align-items-center justify-content-between px-2 py-1'><i class="las la-clock"></i> <p>3:00 PM - 4:00 PM</p></div>
        //             <div class='d-flex align-items-center justify-content-between px-2 py-1'><i class="las la-map-marker"></i> <p>Conference Room</p></div>
        //             <div class='d-flex  justify-content-between px-2 py-1'><i class="las la-users"></i><div><p>participant 1</p><p>participant 2</p><p>participant 3</p></div></div>
        //         </div></div>`;
        // }

        // for (let j = 1; j <= nextDays; j++) {
        //     days += `<div class="next-date next${j}">${j}</div>`;
        //     monthDays.innerHTML = days;
        // }

        // // GET THE NUMBER OF THE DAYS
        // // IN THE CURRENT MONTH
        // for ( let r = 0; r < lastDay; r++ )
        // {
            
        //     // GET ALL MEETINGS
        //     for ( let s = 0; s < meetings.length; s++ )
        //     {
        //         let date = meetings[s].date.toString().split('-').pop(); // MEETING DATE
        //         // let month = meetings[s].date.toString().split('-')[1]; // MEETING MONTH
        //         let dates = document.querySelectorAll('.alldays'); // GET ALL DATES OF THE MONTH
        //         let className; // CLASS NAME
    
        //         if ( isNaN( dates[r].className.toString().slice(-2) ) ) // IF THE NUMBER IS LESS THAN 2
        //         {
        //             className = dates[r].className.toString().slice(-1)
        //         }else
        //         {
        //             className = dates[r].className.toString().slice(-2)
        //         }

        //         // console.log( parseInt( dates[r].className.toString().split('current')[1].split('-')[0] ) )
        //         if ( parseInt( date ) === parseInt( className ) )
        //         {
        //             $('.' + dates[r].className.split(' ').pop().toString() + ' i').show();
        //         }
        //     }

            
        // }
    };

    const back = () =>{

        date.setMonth(date.getMonth() - 1);
        renderCalendar();

    } 

    const forword = () => {

        date.setMonth(date.getMonth() + 1);
        renderCalendar();

    }

    function tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string

    }

    const GetTotalWorkingHours = ( time_in ) => {
        
        if ( time_in !== null )
        {
            
            const d = new Date();
    
            let TotalHours;
            let startTime;
            let currentTime;
            startTime = moment(time_in, "HH:mm:ss");
            currentTime = moment(d.toTimeString(), "HH:mm:ss");
            TotalHours = moment.duration(currentTime.diff(startTime));
            return TotalHours.asHours().toFixed(2);

        }

    }

    const GetTotalBreakHours = ( break_in, break_out ) => {
        
        let TotalHours;
        let startTime;
        let endTime;
        if( break_in === null )
        {

            return 0;

        }else
        if ( break_out === null )
        {
            
            const d = new Date();
            startTime = moment(break_in, "HH:mm:ss");
            endTime = moment(d.toTimeString(), "HH:mm:ss");
            TotalHours = moment.duration(endTime.diff(startTime));
            return TotalHours.asHours().toFixed(2);

        }else
        {
            startTime = moment(break_in, "HH:mm:ss");
            endTime = moment(break_out, "HH:mm:ss");
            TotalHours = moment.duration(endTime.diff(startTime));
            return TotalHours.asHours().toFixed(2);
        }

    }

    return (
        <>
            <div className="NewProfile_Header">
                {/* <Menu data={Data} /> */}
                <div className="NewProfile_Grid">
                    <div className="NewProfile_Grid1">
                        <div className="Display_Picture">
                            <img src={'images/employees/' + ProfileData.emp_image} alt="DP" />
                            {/* <div className="Edit_DP">
                                <i class="las la-camera" style={{ fontSize: "20px" }}></i>
                            </div> */}
                        </div>
                        <div className="Emp_Time">
                            <div className="">
                                <span><p className="text-center mb-0">Time In</p></span>
                                <h4 className="text-center mb-0">{ProfileData.time_in}</h4>
                            </div>
                            <div className="">
                                <span><p className="text-center mb-0">Time Out</p></span>
                                <h4 className="text-center mb-0">{ProfileData.time_out}</h4>
                            </div>
                        </div>
                        {
                            Attendance[0]
                            ?
                            <div className='EmpTodayAtt'>
                                <h4 className='text-center mb-3'>Today's Attendance</h4>
                                <div className='Divs'>
                                    <p>Time In</p>
                                    <p>
                                        { 
                                            Attendance[0].time_in === null 
                                            ? 
                                            "No Time In" 
                                            : 
                                            tConvert( Attendance[0].time_in )
                                        }
                                    </p>
                                </div>
                                <div className='Divs'>
                                    <p>Time Out</p>
                                    <p>
                                        { 
                                            Attendance[0].time_out === null 
                                            ? 
                                            "No Time Out" 
                                            : 
                                            tConvert( Attendance[0].time_out.substring(0, 5) )
                                        }
                                    </p>
                                </div>
                                <div className='Divs'>
                                    <p>Break In</p>
                                    <p>
                                        { 
                                            Attendance[0].break_in === null 
                                            ? 
                                            "No Break" 
                                            : 
                                            tConvert( Attendance[0].break_in.substring(0, 5) )
                                        }
                                    </p>
                                </div>
                                <div className='Divs'>
                                    <p>Break Out</p>
                                    <p>
                                        { 
                                            Attendance[0].break_out === null 
                                            ? 
                                            "No Break"
                                            : 
                                            tConvert( Attendance[0].break_out.substring(0, 5) )
                                        }
                                    </p>
                                </div>
                                <div className='my-4'>
                                    <div className='Divs'>
                                        <p>Total Break Time</p>
                                        <p>{ GetTotalBreakHours( Attendance[0].break_in, Attendance[0].break_out ) } / 1.0</p>
                                    </div>
                                    <div className='EmpAttBar'>
                                        <div 
                                            className='EmpAttBar1' 
                                            style={
                                                { 
                                                    backgroundColor: "#081C34", 
                                                    width: ( 
                                                        (
                                                            ( 
                                                                GetTotalBreakHours( Attendance[0].break_in, Attendance[0].break_out ) 
                                                                / 1.0 
                                                            ) * 100 
                                                        ) > 100
                                                        ?
                                                        100
                                                        :
                                                        ( 
                                                            GetTotalBreakHours( Attendance[0].break_in, Attendance[0].break_out ) 
                                                            / 1.0 
                                                        ) * 100 
                                                    ) + "%" 
                                                }
                                            }
                                        ></div>
                                        {
                                            (
                                                ( 
                                                    GetTotalBreakHours( Attendance[0].break_in, Attendance[0].break_out ) 
                                                    / 1.0 
                                                ) * 100 
                                            ) > 100
                                            ?
                                            <div 
                                                className='EmpAttBar1' 
                                                style={
                                                    { 
                                                        backgroundColor: "red", 
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        width: ( 
                                                            ( 
                                                                1.0 /
                                                                GetTotalBreakHours( Attendance[0].break_in, Attendance[0].break_out ) 
                                                            ) * 100 
                                                        ) + "%" 
                                                    }
                                                }
                                            ></div>
                                            :
                                            null
                                        }
                                    </div>
                                    <div className='Divs'>
                                        <p>Total Hours</p>
                                        <p>{ GetTotalWorkingHours( Attendance[0].time_in ) } / 8.0</p>
                                    </div>
                                    <div className='EmpAttBar'>
                                        <div className='EmpAttBar1' style={{ backgroundColor: "#385A64", width: ( ( GetTotalWorkingHours( Attendance[0].time_in ) / 8.0 ) * 100 ) + "%" }}></div>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>
                    <div className="NewProfile_GridShow">
                        <div>
                            <div className="Display_Picture">
                                <img src={'images/employees/' + ProfileData.emp_image} alt="DP" />
                                <div className="Edit_DP">
                                    <i class="las la-camera" style={{ fontSize: "20px" }}></i>
                                </div>
                            </div>
                            <div className="Grid2_upperShow">
                                <div className="Grid2_upper">
                                    <h3 className="mb-0">{ProfileData.name}</h3>
                                    <h5>{ProfileData.designation_name} in {ProfileData.department_name} Department at {ProfileData.company_name}</h5>
                                </div>
                            </div>
                            <div className="Emp_Time">
                                <div className="">
                                    <span><p className="text-center mb-0">Time In</p></span>
                                    <h4 className="text-center mb-0">{ProfileData.time_in}</h4>
                                </div>
                                <div className="">
                                    <span><p className="text-center mb-0">Time Out</p></span>
                                    <h4 className="text-center mb-0">{ProfileData.time_out}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="NewProfile_Grid2">
                        <div className="Grid2_upper">
                            <h3 className="mb-0">{ProfileData.name}</h3>
                            <h5>{ProfileData.designation_name} in {ProfileData.department_name} Department at {ProfileData.company_name}</h5>
                        </div>
                        <div className="Grid2_lower">
                            <div className="Emp_About ">
                                <div className="About_Tabs">
                                    <div className="Tab1 TabsBtn TabBtn0" onClick={() => ShowTabs('Tabs0', 'TabBtn0')} style={{ backgroundColor: "#2d6be6" }} ><p className="font-weight-bolder mb-0 my-2">About</p></div>
                                    <div className="Tab2 TabsBtn TabBtn1" onClick={() => ShowTabs('Tabs1', 'TabBtn1')} style={{ backgroundColor: "#385a64" }} ><p className="font-weight-bolder mb-0 my-2">Records</p></div>
                                    <div className="Tab2 TabsBtn TabBtn2" onClick={() => ShowTabs('Tabs2', 'TabBtn2')} style={{ backgroundColor: "#081c34" }} ><p className="font-weight-bolder mb-0 my-2">Attendance</p></div>
                                </div>
                                {
                                    ShowEditBtn
                                    ?
                                    <div className='editdiv'>
                                        <ReactTooltip id="editbottondiv" place="left">
                                            Edit Profile
                                        </ReactTooltip>
                                        <div className='editbotton' data-tip data-for="editbottondiv" onClick={ShowEditDiv}><i className="las la-pen"></i></div>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            <div className="AboutTabs1 Tabs Tabs0">
                                <p className="font-weight-bolder mb-3 infoTitle" style={{ color: "lightgray" }}> - Personal Information </p>
                                <div className="Tab1Div">
                                    {
                                        AboutArr.map(
                                            (val, index) => {
                                                return (
                                                    <>
                                                        <div className="AboutTabsGrid py-2">
                                                            <div className="Aboutleft font-weight-bold"><p>{val.left}</p></div>
                                                            <div className="Aboutright" ><p style={{ color: "gray" }}>{val.right}</p></div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        )
                                    }
                                </div>
                                <hr />
                                <p className="font-weight-bolder mb-3 infoTitle" style={{ color: "lightgray" }}> - Contact Information </p>
                                <div className="Tab1Div">
                                    {
                                        AboutArr1.map(
                                            (val, index) => {
                                                return (
                                                    <>
                                                        <div className="AboutTabsGrid py-2">
                                                            <div className="Aboutleft font-weight-bold pr-2"><p>{val.left}</p></div>
                                                            <div className="Aboutright"><p style={{ color: "gray" }}>{val.right}</p></div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        )
                                    }
                                </div>
                                <hr />
                                <p className="font-weight-bolder mb-3 infoTitle" style={{ color: "lightgray" }}> - Office Information </p>
                                <div className="Tab1Div">
                                    {
                                        AboutArr2.map(
                                            (val) => {
                                                return (
                                                    <>
                                                        <div className="AboutTabsGrid py-2">
                                                            <div className="Aboutleft font-weight-bold pr-2"><p>{val.left}</p></div>
                                                            <div className="Aboutright"><p style={{ color: "gray" }}>{val.right}</p></div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        )
                                    }
                                </div>

                            </div>
                            <div className="AboutTabs2 Tabs Tabs1">
                                <div className='Recordsdivleft'>
                                    <div className="ShowImage">
                                        <img className="ShowImage" src='' style={{ width: "100%", height: '100%' }} alt='images' />
                                    </div>
                                </div>
                                <div className="Recordsdivright px-3 mb-4">
                                    <div className="Records_Grid mb-3" >
                                        {
                                            RecordsArr1.map(
                                                (val, index) => {

                                                    let heading1;
                                                    if (index === 0) {
                                                        heading1 = <p className="font-weight-bolder mb-3 infoTitle" style={{ color: "lightgray" }}> - CNIC Records </p>
                                                    }

                                                    let heading2;
                                                    if (index === 2) {
                                                        heading2 = <p className="font-weight-bolder mb-3 infoTitle" style={{ color: "lightgray" }}> - Other Records </p>
                                                    }

                                                    return (
                                                        <>
                                                            {heading1}
                                                            {heading2}
                                                            <div className={"Div1 Div1" + index} onClick={() => ShowPicDiv(val.Image)} >
                                                                <img src={val.Image} alt="Image1" />
                                                                <div className="InfoText p-3">
                                                                    <p className="font-weight-bold">{val.PicName}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            )
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="Tabs Tabs2">

                                <AttendanceList/>

                                {/* <div className="container">
                                    <div className="calendar">
                                        <div className="month">
                                            <i className="las la-angle-left prev" onClick={back} ></i>
                                            <div className="date">
                                                <h1></h1>
                                                <p></p>
                                            </div>
                                            <i className="las la-angle-right next" onClick={forword}></i>
                                        </div>
                                        <div className="weekdays">
                                            <div>Sun</div>
                                            <div>Mon</div>
                                            <div>Tue</div>
                                            <div>Wed</div>
                                            <div>Thu</div>
                                            <div>Fri</div>
                                            <div>Sat</div>
                                        </div>
                                        <div className="days"></div>
                                    </div>
                                </div>

                                <div className='Calender'>
                                    <div className='CalenderMonth'>
                                        <div> <h2 className='mb-0'>Febraury 2022</h2> </div>
                                        <div className='d-flex align-items-center'> <i class="las la-chevron-left"></i> <i class="las la-chevron-right"></i>  </div>
                                    </div>
                                    <div className='Calendergrid Calenderweeks'>
                                        <div><h4>Mon</h4></div>
                                        <div><h4>Tue</h4></div>
                                        <div><h4>Wed</h4></div>
                                        <div><h4>Thu</h4></div>
                                        <div><h4>Fri</h4></div>
                                        <div><h4>Sat</h4></div>
                                        <div><h4>Sun</h4></div>
                                    </div>
                                    <div className='Calendergrid Calenderdays'>

                                        {
                                            NoofDays.map(
                                                (val, index) => {

                                                    const d = new Date();
                                                    let today;
                                                    let bell;
                                                    if ( index + 1 === d.getDate() )
                                                    {
                                                        today = 'Today'
                                                    }

                                                    if (val === 16) {
                                                        bell = <i data-tip data-for="icon" className="las la-bell" onClick={() => OpenDiv(index)}></i>
                                                    }

                                                    return (
                                                        <>
                                                            <div className='Days'><h4> {index + 1} {today} {bell} </h4>
                                                                <ReactTooltip id="icon" place="top">
                                                                    Meeting at 3:00 PM
                                                                </ReactTooltip>
                                                                <div className={'meetingdetials meetingdetial' + index}>
                                                                    <p className='font-weight-bolder text-center mb-2'>Sample Meeting</p>
                                                                    <div className='d-flex align-items-center justify-content-between px-3 py-1'><i class="las la-clock"></i> <p>3:00 PM - 4:00 PM</p></div>
                                                                    <div className='d-flex align-items-center justify-content-between px-3 py-1'><i class="las la-map-marker"></i> <p>Conference Room</p></div>
                                                                    <div className='d-flex  justify-content-between px-3 py-1'><i class="las la-users"></i><div><p>participant 1</p><p>participant 2</p><p>participant 3</p></div></div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )

                                                }
                                            )
                                        }
                                    </div>
                                </div> */}
                            </div>
                            <Model show={ModalShow} Hide={ShowEditDiv} content={ModalContent} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default EmployeeProfile;