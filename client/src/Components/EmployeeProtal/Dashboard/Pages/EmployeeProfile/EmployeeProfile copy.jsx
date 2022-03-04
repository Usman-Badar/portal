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

import DailyAttendance from './DailyAttendance/New_Employee_Att';
import New_Employee_Att from './DailyAttendance/New_Employee_Att';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const EmployeeProfile = () => {
    const [ ModalShow, setModalShow ] = useState( false );
    const [ ModalContent, setModalContent ] = useState(<></>);
    const [Data, setData] = useState( [] );

    useEffect(
        () => {
            $('.TabsBtn').removeClass('b1-bottom-none');
            $('.Tabs').hide();
            $('.TabBtn0').addClass('b1-bottom-none');
            $('.Tabs0').show();
            $('.EditBox').hide();
            $('.save_Icon').hide();
            $('.Tabs0').show();

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
        }, []

    );

    const ShowTabs = ( OpenTab, TabBtn ) => {

        $('.TabsBtn').removeClass('b1-bottom-none');
        $('.Tabs').hide();
        $('.' + TabBtn).addClass('b1-bottom-none');
        $('.' + OpenTab).show();

    }

    const ProfileData = useSelector( ( state ) => state.EmpAuth.EmployeeData );

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
            right: ProfileData.date_of_birth ? ProfileData.date_of_birth.toString().substring(0,10) : null,
            editable: false
        },
        {
            left: 'Gender :',
            right:  ProfileData.gender,
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
            right: ProfileData.date_of_join ? ProfileData.date_of_join.toString().substring(0,10) : null,
            editable: false
        },
    ]
    const RecordsArr1 = [
        {
            Image: 'images/documents/cnic/front/' + ProfileData.cnic_front_image,
            PicName: 'CNIC Front',
        },
        {
            Image: 'images/documents/cnic/back/' + ProfileData.cnic_back_image ,
            PicName: 'CNIC Back',
        },
    ]
    const RecordsArr2 = [
        {
            Image: 'images/documents/cv/' + ProfileData.cv ,
            PicName: 'CV',
        },
        {
            Image:  'images/documents/address/' + ProfileData.proof_of_address ,
            PicName: 'Proof of Address',
        },
    ]
    const ShowPicDiv = ( index ) => {
        let content = null;
        
        if ( ModalShow )
        {
            setModalShow(false);
        }else
        {

            // content = <img src={RecordsArr1[index].Image} width='100%' alt='images' />
            content = <img src={RecordsArr2[index].Image} style={ { width: "100%"} } alt='images' />
            setModalContent(content);
            setModalShow(true);    
        }

    }

    const ShowInputBox = (className, className2, className3, className4) => {

        HideAll();

        $('.' + className2).hide();
        $('.' + className).show();

        $('.' + className3).hide();
        $('.' + className4).show();
    }

    const SaveInputBox = (className, className2, className3, className4) => {

        HideAll();

        $('.' + className2).show();
        $('.' + className).hide();

        $('.' + className3).show();
        $('.' + className4).hide();
    }

    const HideAll = () => {
        $('.EditBox').hide();
        $('.Aboutright').show();
    }

    const ShowInputBox1 = (className5, className6, className7, className8) => {
        $('.' + className6).hide();
        $('.' + className5).show();
        $('.' + className7).hide();
        $('.' + className8).show();
    }
    const SaveInputBox1 = (className5, className6, className7, className8) => {
        $('.' + className6).show();
        $('.' + className5).hide();
        $('.' + className7).show();
        $('.' + className8).hide();
    }

    const OnEditProfile = ( e ) => {

    }

    const [value, onChange] = useState(new Date());

    const [Attendance, setAttendance] = useState([]);
    const [AttendanceInOuts, setAttendanceInOuts] = useState([]);

    useEffect(
        () => {

            const Data = new FormData();
            Data.append('empID', sessionStorage.getItem('EmpID'));
            axios.post('/getempattdetails', Data).then(response => {

                setAttendance(response.data);
                axios.post('/getempinoutsdetails', Data).then(response => {

                    setAttendanceInOuts(response.data);


                }).catch(err => {

                    console.log( err );

                });

            }).catch(err => {

                console.log( err );

            });


        }, []
    )

    return (
        <>
            <div className="NewProfile_Header">
                <Menu data={ Data } />
                <div className="NewProfile_Grid">
                    <div className="NewProfile_Grid1">
                    <div className="Display_Picture">
                        <img src={'images/employees/' + ProfileData.emp_image} alt="DP" />
                        <div className="Edit_DP">
                            <i class="las la-camera" style={{ fontSize: "20px" }}></i>
                        </div>
                    </div>
                    <div className="Emp_Time">
                        <div className="w-50 border-right">
                            <h5 className="text-center mb-0">Time In</h5>
                            <p className="text-center mb-0">{ProfileData.time_in}</p>
                        </div>
                        <div className="w-50">
                            <h5 className="text-center mb-0">Time Out</h5>
                            <p className="text-center mb-0">{ProfileData.time_out}</p>
                        </div>
                    </div>
                </div>
                <div className="NewProfile_GridShow ">
                    <div className="Display_Picture">
                        <img src={ 'images/employees/' + ProfileData.emp_image } alt="DP" />
                        <div className="Edit_DP">
                            <div><p className="mb-0">View Pic</p></div>
                            <div><p className="mb-0">Edit Pic</p></div>
                        </div>
                    </div>
                    <div className="Grid2_upperShow d-flex justify-content-center align-items-center">
                        <div className="pt-3">
                            <h3 className="font-weight-bolder text-center">{ProfileData.name}</h3>
                            <div style={{ color: "#2196f3" }}>
                                <p className="font-weight-bolder mb-0">
                                    <span className="border-right px-1">
                                        {ProfileData.company_name}
                                    </span>
                                    <span className="border-right px-1">
                                        {ProfileData.department_name}
                                    </span>
                                    <span className="border-right px-1">
                                        {ProfileData.designation_name}
                                    </span>
                                    <span className="border-right px-1">
                                        {ProfileData.location_name}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="Emp_Time">
                        <div className="w-50 border-right">
                            <h5 className="text-center mb-0">Time In</h5>
                            <p className="text-center mb-0">{ProfileData.time_in}</p>
                        </div>
                        <div className="w-50">
                            <h5 className="text-center mb-0">Time Out</h5>
                            <p className="text-center mb-0">{ProfileData.time_out}</p>
                        </div>
                    </div>
                </div>
                <div className="NewProfile_Grid2">
                    <div className="Grid2_upper">
                        <h3 className="font-weight-bolder">{ProfileData.name}</h3>
                        <div className="Emp_Desig d-flex mb-5">
                            <div style={ { color: "#0db8de" } } className='border-right'>
                                <p className="font-weight-bolder">{ProfileData.designation_name}</p>
                            </div>
                            <div className="border-right" style={ { color: "#0db8de" } }>
                                <p className="font-weight-bolder">{ProfileData.department_name}</p>
                            </div>
                            <div className="" style={ { color: "#0db8de" } }>
                                <p className="font-weight-bolder">{ProfileData.company_name}</p>
                            </div>
                        </div>
                        {/* <h3>{ProfileData.location_name}</h3> */}
                        <New_Employee_Att />
                    </div>
                        <div className="Grid2_lower">
                            <div className="Emp_About ">
                                <div className="About_Tabs">
                                    <div className="Tab1 TabsBtn TabBtn0" onClick={() => ShowTabs('Tabs0', 'TabBtn0')} ><p className="font-weight-bolder mb-0 my-3">About</p></div>
                                    <div className="Tab2 TabsBtn TabBtn1" onClick={() => ShowTabs('Tabs1', 'TabBtn1')} ><p className="font-weight-bolder mb-0 my-3">Records</p></div>
                                    <div className="Tab2 TabsBtn TabBtn2" onClick={() => ShowTabs('Tabs2', 'TabBtn2')} ><p className="font-weight-bolder mb-0 my-3">Attendance</p></div>
                                </div>
                                <div className="AboutTabs1 Tabs Tabs0">
                                    <div className="Tab1Div">
                                        <p className="font-weight-bolder mb-3" style={{ color: "lightgray" }}> - Personal Information </p>
                                        {
                                            AboutArr.map(
                                                (val, index) => {
                                                    return (
                                                        <>
                                                            <div className="d-flex align-items-center py-2">
                                                                <div className="Aboutleft font-weight-bold pr-2"><p>{val.left}</p></div>
                                                                <div className="AboutInfoDiv">
                                                                    <div className={"Aboutright Aboutright" + index}><p>{val.right}</p></div>
                                                                    <div className={"mr-1 EditBox EditBox" + index}><input type="text" onChange={ OnEditProfile } className="form-control" value={val.right} /></div>
                                                                    {
                                                                        val.editable === true
                                                                            ?
                                                                            <>
                                                                                <div className={"save_Icon save_Icon" + index} style={{ cursor: "pointer" }} ><i class="las la-save" onClick={() => SaveInputBox('EditBox' + index, "Aboutright" + index, 'Edit_Icon' + index, 'save_Icon' + index)}></i></div>
                                                                                <div className={"Edit_Icon Edit_Icon" + index}><i class="las la-edit" onClick={() => ShowInputBox('EditBox' + index, "Aboutright" + index, 'Edit_Icon' + index, 'save_Icon' + index)}></i></div>
                                                                            </>
                                                                            :
                                                                            null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                    <div className="Tab1Div">
                                        <p className="font-weight-bolder mb-3" style={{ color: "lightgray" }}> - Contact Information </p>
                                        {
                                            AboutArr1.map(
                                                (val, index) => {
                                                    return (
                                                        <>
                                                            <div className="d-flex align-items-center py-2">
                                                                <div className="Aboutleft font-weight-bold pr-2"><p>{val.left}</p></div>
                                                                <div className="AboutInfoDiv">
                                                                    <div className={"Aboutright Aboutright1" + index}><p>{val.right}</p></div>
                                                                    <div className={"mr-1 EditBox EditBox1" + index}><input type="text" onChange={ OnEditProfile } className="form-control" value={val.right} /></div>
                                                                    {
                                                                        val.editable === true
                                                                            ?
                                                                            <>
                                                                                <div className={"Edit_Icon Edit_Icon1" + index}><i class="las la-edit" onClick={() => ShowInputBox1('EditBox1' + index, "Aboutright1" + index, "Edit_Icon1" + index, "save_Icon1" + index)}></i></div>
                                                                                <div className={"save_Icon save_Icon1" + index} style={{ cursor: "pointer" }} ><i class="las la-save" onClick={() => SaveInputBox1('EditBox1' + index, "Aboutright1" + index, "Edit_Icon1" + index, "save_Icon1" + index)}></i></div>
                                                                            </>
                                                                            :
                                                                            null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                    <div className="Tab1Div">
                                        <p className="font-weight-bolder mb-3" style={{ color: "lightgray" }}> - Office Information </p>
                                        {
                                        AboutArr2.map(
                                            (val) => {
                                                return (
                                                    <>
                                                        <div className="d-flex align-items-center py-2">
                                                            <div className="Aboutleft font-weight-bold pr-2"><p>{val.left}</p></div>
                                                            <div className="AboutInfoDiv">
                                                                <div><p>{val.right}</p></div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        )
                                    }
                                </div>
                            </div>
                            <div className="AboutTabs2 Tabs Tabs1">
                                <div className="px-3 mb-4">
                                    <p className="font-weight-bolder mb-3" style={{ color: "lightgray" }}> - CNIC Records </p>
                                    <div className="Records_Grid" >
                                        {
                                            RecordsArr1.map(
                                                (val, index) => {
                                                    return (
                                                        <>
                                                            <div className="Div1">
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
                                <div className="px-3 mb-4">
                                    <p className="font-weight-bolder mb-3" style={{ color: "lightgray" }}> - Other Records </p>
                                    <div className="Records_Grid" >
                                        {
                                            RecordsArr2.map(
                                                (val, index) => {
                                                    return (
                                                        <>
                                                            <div className="Div1" onClick={() => ShowPicDiv(index)}>
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
                                    <Model show={ModalShow} Hide={ShowPicDiv} content={ModalContent} />
                                </div>
                                <div className="Tabs Tabs2">
                                    <table className='w-100 table'>
                                        <tr>
                                            <th>Date</th>
                                            <th>Time In</th>
                                            <th>Time Out</th>
                                            <th>Break In</th>
                                            <th>Break Out</th>
                                            <th>Total Hours</th>
                                        </tr>
                                        {
                                            Attendance.map(
                                                (val) => {
                                                    return (
                                                        <>
                                                            {/* <tr>
                                                                <td>{val.emp_date}</td>
                                                                <td>{val.time_in}</td>
                                                                <td>{val.time_out}</td>
                                                                <td>{val.break_in}</td>
                                                                <td>{val.break_out}</td>
                                                                <td>15:28:13</td>
                                                            </tr> */}
                                                            <tr style={ { position: 'relative' } }>
                                                                {
                                                                    val.status === 'leave' && val.time_in === null && val.time_out === null && val.break_in === null && val.break_out === null
                                                                        ?
                                                                        <>
                                                                                <td>{val.emp_date}</td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td
                                                                                    style={
                                                                                        {
                                                                                            position: 'absolute',
                                                                                            top: '0',
                                                                                            left: '0',
                                                                                            width: '100%',
                                                                                            textAlign: 'center'
                                                                                        }
                                                                                    }
                                                                                > leave </td>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <td>{val.emp_date}</td>
                                                                            <td> {val.time_in === null ? <span>No Time In</span> : val.time_in} </td>
                                                                            <td> {val.time_out === null ? <span>No Time Out</span> : val.time_out} </td>
                                                                            <td> {val.break_in === null ? <span>No Break In</span> : val.break_in} </td>
                                                                            <td> {val.break_out === null ? <span>No Break Out</span> : val.break_out} </td>
                                                                        </>
                                                                }
                                                                <td className=""> {val.status} </td>
                                                            </tr>

                                                        </>
                                                    )
                                                }
                                            )

                                        }
                                    </table>
                                </div>
                                <div className='PdfButton'>
                                    <button className='btn' >Export to PDF</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default EmployeeProfile;