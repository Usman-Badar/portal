import React, { useEffect, useState } from "react";
import './Attandence_Request_Recieve.css';
import $ from 'jquery';
import Model from '../../../../UI/Modal/Modal';
import Img from '../../../../../images/1519892514579.png';

import axios from '../../../../../axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Waiting from '../../../../../images/771.gif';

const Attandence_Request_Recieve = () => {

    const [ShowX, setShowX] = useState(false);
    const [EmpSearch, setEmpSearch] = useState(
        {
            value: ''
        }
    );

    const [ModalShow, setModalShow] = useState(false);

    const [ModalContent, setModalContent] = useState();
    const [ LastRequest, setLastRequest ] = useState( [] );
    const [ Employees, setEmployees ] = useState( [] );
    const [ SelectedEmployee, setSelectedEmployee ] = useState( [] );
    const [ Requests, setRequests ] = useState( [] );

    const [ RequestsTook, setRequestsTook ] = useState( [] );
    const [ Data, setData ] = useState( [] );

    useEffect(
        () => {

            $('.shortDetails').slideUp(0);
            $('.Leave_Application_Details').attr('id', 'getallempleaves');
            $('.Details_Grid_Right').hide();
            $('.Grid_Right2').hide();

            GetAllEmployees();

        }, []
    )

    const GetAllEmployees = () => {

        axios.get('/getallattrequests').then( res => {

            setEmployees( res.data );

        } ).catch( err => {

            toast.dark( err.toString() , {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });;

        } );

    };


    const searchcancle = (e) => {

        setEmpSearch({ value: e.target.value });
        if ($('.Menusearch').val().length > 0) {
            setShowX(true);
            OnSearch(e.target.value);
        } else {
            OnSearch(e.target.value);
            setShowX(false);
        }

    }
    const clickcross = () => {
        setEmpSearch({ value: '' });
        setShowX(false);
    }

    const OnSearch = (val) => {

    }

    const ShowPicDiv = () => {
        let content = null;
        
        if ( ModalShow )
        {
            setModalShow(false);
        }else
        {

            content = <img src={Img} width='500px' height="500px" alt='images' />
            setModalContent(content);
            setModalShow(true);
            
        }

    }

    const ShowShortDetails = ( divID, empID ) => {

        $('.shortDetails').slideUp(500);
        $('.' + divID).slideToggle(500);

        const Data = new FormData();
        Data.append('empID', empID);
        axios.post('/getemployeelastattrequest', Data).then(res => {

            console.log( res.data );
            setLastRequest( res.data );

        }).catch(err => {

            console.log(err);

        });


    }

    const OnShowDetails = ( index, empID ) => {

        setSelectedEmployee( [] );
        setRequests( [] );
        
        setSelectedEmployee( [ Employees[index] ] );

        const Data = new FormData();
        Data.append('empID', empID);

        axios.post('/getthatemployeeallguests', Data).then( res => {
            
            setRequests( res.data );

            setRequestsTook(
                [
                    {
                        leaveType: 'Total Requests',
                        maxLeave: res.data.length,
                    }
                ]
            );

            // if ( window.outerWidth < 992 ) {
    
            //     openDiv1();

            //     setData(
            //         [
            //             {
            //                 icon: 'las la-users',
            //                 txt: 'Guests',
            //                 link: false,
            //                 func: () => openGuests()
            //             }
            //         ]
            //     );
    
            // }

        } ).catch( err => {

            console.log( err );

        } );


    }

    return (
        <>
            <div className="Attandence_Request_Recieve">
                <div className="Attandence_Request_Recieve_Grid">
                    <div className="Details_Grid_Left">
                        <div className="DIV1 searchbarDiv">
                            <input type="text" value={EmpSearch.value} placeholder="Search Keywords" className="form-control Menusearch" onChange={searchcancle} />
                            {
                                !ShowX
                                    ?
                                    <i className="las la-search"></i>
                                    :
                                    <i className="las la-times" onClick={clickcross}></i>
                            }
                        </div>
                        <div className="att_requests">
                            {
                                Employees.length === 0
                                ?
                                    <h3 className="text-center">No Record Found</h3>
                                :
                                Employees.map(
                                    ( val, index ) => {

                                        return (
                                            <div className="requests" style={{ animationDelay: (0 + '.' + 1).toString() + 's' }}>
                                                <div onClick={() => ShowShortDetails('shortDetails' + index, val.emp_id)}>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <img src={ 'images/employees/' + val.emp_image } className="rounded-circle mr-2" alt='Employee Img' width='40' height='40' />
                                                            <div>
                                                                <p className='mb-0 font-weight-bold'>
                                                                    { val.name }
                                                                </p>
                                                                <p className='mb-0'>
                                                                    { val.designation_name + ' in ' + val.department_name + ' Dept. at ' + val.company_name + ', ' + val.location_name }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"text-justify mt-2 shortDetails shortDetails" + index}>
                                                    {
                                                        LastRequest.length === 0
                                                        ?
                                                        <div className="w-100 text-center pt-3">
                                                            <img src={ Waiting } width="40" height='40' />
                                                        </div>
                                                        :
                                                        LastRequest.map(
                                                            ( val, index ) => {

                                                                return (
                                                                    <>
                                                                        <div className="d-flex align-items-center justify-content-between">
                                                                            <div className="d-flex align-items-center justify-content-between">
                                                                                <div className="d-flex align-items-center">
                                                                                    <i className="lab la-wpforms" style={{ fontSize: "30px", marginRight: "10px" }}></i>
                                                                                    <div>
                                                                                        <p className='mb-0 font-weight-bold'>
                                                                                            { val.request_subject }
                                                                                        </p>
                                                                                        <p className='mb-0'>
                                                                                            { val.request_description ? val.request_description.substring(0,30) : null }
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex align-items-center text-right">
                                                                                <div>
                                                                                    <p className='mb-0 font-weight-bold'>
                                                                                        { val.request_date ? val.request_date.substring(0,10) : null }
                                                                                    </p>
                                                                                    <p className='mb-0'>
                                                                                        { val.request_time }
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <button className="btn btn-sm mt-2 d-block ml-auto btn-outline-dark" onClick={() => OnShowDetails( index, val.emp_id )}>View Details</button>
                                                                    </>
                                                                )

                                                            }
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        )

                                    }
                                )
                            }
                        </div>
                    </div>
                    {
                        SelectedEmployee.length === 0
                        ?
                        null
                        :
                        SelectedEmployee.map(
                            ( val, index ) => {

                                return (
                                    <div className="Details_Grid_Right" key={ index }>
                                        <div className="Grid_Right1" style={{ animationDelay: (0 + '.' + index).toString() + 's' }}>
                                            <div className="Att_Emp_Info">
                                                <div className="d-flex align-items-center pb-2">
                                                    <div>
                                                        <img src={ 'images/employees/' + val.emp_image } alt="DP" />
                                                    </div>
                                                    <div className="ml-3 py-2">
                                                        <p className="font-weight-bolder mb-0">{ val.name }</p>
                                                        <p className="mb-0"> { val.designation_name + ' in ' + val.department_name + ' Depart. at ' + val.company_name + ', ' + val.location_name } </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between py-2" style={{ fontSize: "13px" }}>
                                                    <p className="mb-0">Employee Code</p>
                                                    <p className="font-weight-bolder mb-0">{ val.emp_id }</p>
                                                </div>
                                                <div className="d-flex justify-content-between py-2" style={{ fontSize: "13px" }}>
                                                    <p className="mb-0">Email</p>
                                                    <p className="font-weight-bolder mb-0">{ val.email }</p>
                                                </div>
                                                <div className="d-flex justify-content-between py-2" style={{ fontSize: "13px" }}>
                                                    <p className="mb-0">Phone Number</p>
                                                    <p className="font-weight-bolder mb-0">{ val.cell }</p>
                                                </div>
                                            </div>
                                            <div className="Emp_request_Details">
                                                <div className="requests">
                                                    <div className="text-justify">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                            <i className="lab la-wpforms" style={ { fontSize: "30px", marginRight: "10px" } }></i>
                                                                <div>
                                                                    <p className='mb-0 font-weight-bold'>
                                                                        Subject
                                                                    </p>
                                                                    <p className='mb-0'>
                                                                        Discription (short)
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="requests">
                                                    <div className="text-justify">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <i className="lab la-wpforms" style={{ fontSize: "30px", marginRight: "10px" }}></i>
                                                                <div>
                                                                    <p className='mb-0 font-weight-bold'>
                                                                        Subject
                                                                    </p>
                                                                    <p className='mb-0'>
                                                                        Discription (short)
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Grid_Right2">
                                            <div className="Right2_TopBox mb-3">
                                                {
                                                    RequestsTook.length === 0
                                                    ?
                                                    null
                                                    :
                                                    RequestsTook.map(
                                                        ( val, index ) => {

                                                            return (
                                                                <div style={{ animationDelay: (0 + '.' + index).toString() + 's' }} key={index} className={"TopBox_Leave TopBox_Leave" + 0}>
                                                                    <div>
                                                                        <p> { val.maxLeave } </p>
                                                                        <p> { val.leaveType } </p>
                                                                    </div>
                                                                </div>
                                                            )

                                                        }
                                                    )
                                                }
                                            </div>
                                            <div className="Right2_BottomBox" style={{ animationDelay: (0 + '.' + 1).toString() + 's' }}>
                                                <div className="BottomBox_info">
                                                    <div className="d-flex justify-content-between border-bottom">
                                                        <p className="font-weight-bolder mb-2"> { val.request_time } </p>
                                                        <p className="font-weight-bolder mb-2">09, Nov 2021</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-weight-bolder mr-2"> Subject : </p>
                                                        <p className="font-weight-bolder">Multi-layered client-server neural-net</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-weight-bolder mr-2"> Discription : </p>
                                                        <p>In publishing and graphic design, Lorem ipsum is a placeholder </p>
                                                    </div>
                                                    <div className="BottomBox_info_Grid">
                                                        <div className="BottomBox_Grid_Div">
                                                            <div className="d-block">
                                                                <div className="d-flex text-center pb-3 border-bottom">
                                                                    <p className="font-weight-bolder mr-2" style={{ fontSize: "15px" }}>Arival Time : </p>
                                                                    <p className="font-weight-bolder"style={{ fontSize: "15px" }}>10:30 AM</p>
                                                                </div>
                                                                <div className="d-flex text-center">
                                                                    <p className="font-weight-bolder mr-2" style={{ fontSize: "15px" }}>Arival For : </p>
                                                                    <p className="font-weight-bolder"style={{ fontSize: "15px" }}>Time In</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="BottomBox_Grid_Div">
                                                        </div>
                                                        <div className="BottomBox_Grid_Div" onClick={ShowPicDiv}>
                                                            <img src={Img} alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Decision_Div">
                                                <button className="btn mr-3 w-25" style={{ backgroundColor: "red", color: "white" }}>Deny</button>
                                                <button className="btn w-25" style={{ backgroundColor: "Green", color: "white" }}>Accept</button>
                                            </div>
                                        </div>
                                    </div>
                                )

                            }
                        )
                    }
                </div>
                <Model show={ModalShow} Hide={ShowPicDiv} content={ModalContent} />
            </div>
        </>
    )
}
export default Attandence_Request_Recieve;