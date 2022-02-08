import React, { useState, useEffect } from 'react'
import './EmployeeProfile.css';

import { useSelector } from 'react-redux';
// import TodayAttendance from './Components/TodayAttendance/TodayAttendance';
// import Slider from "react-slick";
import $ from 'jquery';
import IMG from '../../../../../images/1519892514579.png';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Model from '../../../../UI/Modal/Modal';

import DailyAttendance from './DailyAttendance/New_Employee_Att';


const EmployeeProfile = () => {
    const [ ModalShow, setModalShow ] = useState( false );
    const [ ModalContent, setModalContent ] = useState(<></>);
    useEffect(
        () => {
            $('.TabsBtn').removeClass('b1-bottom-none');
            $('.Tabs').hide();
            $('.TabBtn0').addClass('b1-bottom-none');
            $('.Tabs0').show();
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
        },
        {
            left: 'Father Name : ',
            right: ProfileData.father_name,
        },
        {
            left: 'Date Of Birth :',
            right: ProfileData.date_of_birth ? ProfileData.date_of_birth.toString().substring(0,10) : null,
        },
        {
            left: 'Gender :',
            right:  ProfileData.gender,
        },
        {
            left: 'Marital Status :',
            right: ProfileData.marital_status,
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
        },
        {
            left: 'Emergency Person Name : ',
            right: ProfileData.emergency_person_name,
        },
        {
            left: 'Emergency Contact No : ',
            right: ProfileData.emergency_person_number,
        },
        {
            left: 'Email : ',
            right: ProfileData.email,
        },
        {
            left: 'Address :',
            right: ProfileData.permanent_address,
        },
        {
            left: 'CNIC :',
            right: ProfileData.cnic,
        },
    ]
    const AboutArr2 = [
        {
            left: 'Employee ID : ',
            right: ProfileData.emp_id,
        },
        {
            left: 'Employee Company : ',
            right: ProfileData.company_name,
        },
        {
            left: 'Department : ',
            right: ProfileData.department_name,
        },
        {
            left: 'Joining Date : ',
            right: ProfileData.date_of_join ? ProfileData.date_of_join.toString().substring(0,10) : null,
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


    return(
        <>
        <div className="NewProfile_Header">
            <div className="NewProfile_Grid">
                <div className="NewProfile_Grid1">
                    <div className="Display_Picture">
                        <img src={'images/employees/' + ProfileData.emp_image} alt="DP" />
                        <div className="Edit_DP">
                            <div><p className="mb-0">View Pic</p></div>
                            <div><p className="mb-0">Edit Pic</p></div>
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
                    {/* <div className="d-flex justify-content-center align-items-center">
                        <button className="btn border">Todays Attendence</button>
                    </div> */}
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
                    <div className="d-flex justify-content-center align-items-center">
                        <button className="btn border">Todays Attendence</button>
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
                        <h3>{ProfileData.location_name}</h3>
                    </div>
                    <div className="Grid2_lower">
                        <div className="Emp_About ">
                            <div className="About_Tabs">
                                <div className="Tab1 TabsBtn TabBtn0" onClick={ () => ShowTabs('Tabs0', 'TabBtn0') } ><p className="font-weight-bolder mb-0 my-3">About</p></div>
                                <div className="Tab2 TabsBtn TabBtn1" onClick={ () => ShowTabs('Tabs1', 'TabBtn1') } ><p className="font-weight-bolder mb-0 my-3">Records</p></div>
                                <div className="Tab2 TabsBtn TabBtn2" onClick={ () => ShowTabs('Tabs2', 'TabBtn2') } ><p className="font-weight-bolder mb-0 my-3">Attendance</p></div>
                            </div>
                            <div className="AboutTabs1 Tabs Tabs0">
                                <div className="Tab1Div">
                                <p className="font-weight-bolder mb-3" style={{ color: "lightgray" }}> - Personal Information </p>
                                    {
                                        AboutArr.map(
                                            (val) => {
                                                return (
                                                    <>
                                                        <div className="d-flex align-items-center py-2">
                                                            <div className="Aboutleft"><p>{val.left}</p></div>
                                                            <div className="AboutInfoDiv">
                                                                <div><p>{val.right}</p></div>
                                                                <div className="Edit_Icon"><i class="las la-edit"></i></div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        )
                                    }
                                </div>
                                <div className="Tab1Div">
                                    <p className="font-weight-bolder mb-3" style={ { color: "lightgray" } }> - Contact Information </p>
                                    {
                                        AboutArr1.map(
                                            (val) => {
                                                return (
                                                    <>
                                                        <div className="d-flex align-items-center py-2">
                                                            <div className="Aboutleft"><p>{val.left}</p></div>
                                                            <div className="AboutInfoDiv">
                                                                <div><p>{val.right}</p></div>
                                                                <div className="Edit_Icon"><i class="las la-edit"></i></div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        )
                                    }
                                </div>
                                <div className="Tab1Div">
                                    <p className="font-weight-bolder mb-3" style={ { color: "lightgray" } }> - Office Information </p>
                                    {
                                        AboutArr2.map(
                                            (val) => {
                                                return (
                                                    <>
                                                        <div className="d-flex align-items-center py-2">
                                                            <div className="Aboutleft"><p>{val.left}</p></div>
                                                            <div className="AboutInfoDiv">
                                                                <div><p>{val.right}</p></div>
                                                                <div className="Edit_Icon"><i class="las la-edit"></i></div>
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
                                <Model show={ ModalShow } Hide={ ShowPicDiv } content={ModalContent} />
                            </div>
                            <div className="Tabs Tabs2">
                                <DailyAttendance />
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