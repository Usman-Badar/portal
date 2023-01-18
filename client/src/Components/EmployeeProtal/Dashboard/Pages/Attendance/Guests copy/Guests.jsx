/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import './Guests.css';
import $ from 'jquery';

import axios from "../../../../../../axios";

import Model from '../../../../../UI/Modal/Modal';
import Menu from '../../../../../UI/Menu/Menu';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Leave_Application_Details = () => {

    const [ ShowX, setShowX ] = useState(false);
    const [ EmpSearch, setEmpSearch ] = useState(
        {
            value: ''
        }
    );

    const [ LeaveTook, setLeaveTook ] = useState([]);
    const [ ModalShow, setModalShow ] = useState( false );
    const [ ModalContent, setModalContent ] = useState();

    const [ Employees, setEmployees ] = useState([]);
    const [ Guests, setGuests ] = useState([]);
    const [ SelectedEmployee, setSelectedEmployee ] = useState([]);
    const [ LastGuest, setLastGuest ] = useState([]);
    const [ SelectedGuestMeetings, setSelectedGuestMeetings ] = useState([]);

    const [ Data, setData ] = useState([]);


    useEffect(
        () => {
            $('.shortDetails').slideUp(0);
            $('.Leave_Application_Details').attr('id', 'getallempleaves');
            $('.Details_Grid_Right').hide();
            $('.Grid_Right2').hide();

            GetAllEmployees();

        }, []
    );

    const GetAllEmployees = () => {

        axios.get('/getallguests').then( res => {

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
    
    const searchcancle = ( e ) =>{
        setEmpSearch( { value: e.target.value } );
        if ( $('.Menusearch').val().length > 0 )
            {
                setShowX( true );
                OnSearch( e.target.value );
            }else
            {
                OnSearch( e.target.value );
                setShowX( false );
            }

    }
    const clickcross = () =>{
        setEmpSearch( { value: '' } );
        setShowX( false );
    }

    const OnSearch = ( val ) => {

        // setEmployees([]);
        // const Data = new FormData();
        // Data.append('SearchKey', val);
        // Data.append('currentEmp', sessionStorage.getItem('EmpID'));
        // axios.post('/srchemp', Data).then( res => {

        //     setEmployees( res.data );

        // } ).catch( err => {

        //     toast.dark( err , {
        //             position: 'top-right',
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });;

        // } );

    }

    const ShowShortDetails = ( divID, empID ) => {

        const Data = new FormData();
        Data.append('empID', empID);
        axios.post('/getthatemployeelastguest', Data).then(res => {

            setLastGuest( res.data );
            $('.shortDetails').slideUp(500);
            $('.' + divID).slideToggle(500);

        }).catch(err => {

            console.log(err);

        });


    }

    const openGuests = () => {

        $('.Details_Grid_Left').show();
        $('.Details_Grid_Right').hide();

    }

    const openDiv1 = () => {

        $('.Details_Grid_Left').hide();
        $('.Details_Grid_Right').show();
        $('.Grid_Right2').hide();
        $('.Grid_Right1').show();

    }

    const openDiv2 = () => {

        $('.Grid_Right1').hide();
        $('.Grid_Right2').show();

    }

    const OnShowDetails = ( index, empID ) => {

        setSelectedEmployee( [] );
        setGuests( [] );
        
        setSelectedEmployee( [ Employees[index] ] );

        const Data = new FormData();
        Data.append('empID', empID);

        axios.post('/getthatemployeeallguests', Data).then( res => {
            
            setGuests( res.data );

            setLeaveTook(
                [
                    {
                        leaveType: 'Guests Met',
                        maxLeave: res.data.length,
                    }
                ]
            );

            if ( window.outerWidth < 992 ) {
    
                openDiv1();

                setData(
                    [
                        {
                            icon: 'las la-users',
                            txt: 'Guests',
                            link: false,
                            func: () => openGuests()
                        }
                    ]
                );
    
            }

        } ).catch( err => {

            console.log( err );

        } );


    }

    const PrevRequests = ( guestID, empID ) => {

        const Data = new FormData();
        Data.append('empID', empID);
        Data.append('guestID', guestID);

        axios.post('/getthatempguestallmeetings', Data).then( res => {
            
            setSelectedGuestMeetings( res.data );

            if ( LeaveTook.length > 1 )
            {
                setLeaveTook( [LeaveTook.pop()] );
            }

            setLeaveTook(
                [
                    ...LeaveTook,
                    {
                        leaveType: 'Meetings',
                        maxLeave: res.data.length,
                    }
                ]
            );

            if ( window.outerWidth < 992 ) {
    
                openDiv2();

                setData(
                    [
                        {
                            icon: 'las la-users',
                            txt: 'Guests',
                            link: false,
                            func: () => openGuests()
                        },
                        {
                            icon: 'las la-long-arrow-alt-left',
                            txt: 'Back',
                            link: false,
                            func: () => openDiv1()
                        }
                    ]
                );
    
            }

        } ).catch( err => {

            console.log( err );

        } );
    }

    const ShowHideModal = () => {

        if ( ModalShow )
        {
            setModalShow( false );
        }else
        {
            setModalShow( true );
        }

    }

    return (
        <>
            <Model show={ ModalShow } Hide={ ShowHideModal } content={ ModalContent } />
            <Menu data={ Data } />
            <div className="GuestsList">
                <div className="GuestsList_Grid">
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
                        <div className="guest_requests">
                            {
                                Employees.length === 0
                                ?
                                <h3>No Guest Found</h3>
                                :
                                Employees.map(
                                    ( val, index ) => {

                                        return (
                                            <>
                                            <div className="requests" style={{ animationDelay: (0 + '.' + index).toString() + 's' }}>
                                                <div onClick={ () => ShowShortDetails( 'shortDetails' + index, val.emp_id ) }>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <img src={ 'images/employees/' + val.emp_image } className="rounded-circle mr-2" alt='Employee Img' width='40' height='40' />
                                                                <div>
                                                                    <p className='mb-0 font-weight-bold'>
                                                                        { val.name }
                                                                    </p>
                                                                    <p className='mb-0'>
                                                                        { val.designation_name } at { val.company_name }, { val.location_name }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>
                                                <div className={"text-justify mt-2 shortDetails shortDetails" + index}>
                                                        {
                                                            LastGuest.length === 0
                                                            ?
                                                            null
                                                            :
                                                            LastGuest.map(
                                                                ( val, i ) => {

                                                                    const d = new Date( val.meeting_date.substring(0,10) );

                                                                    return (
                                                                        <>
                                                                            <div className="d-flex align-items-center justify-content-between" key={ i }>
                                                                                <div className="d-flex align-items-center">
                                                                                    <img src={'images/guests/' + val.guest_image} className="rounded-circle mr-2" alt='Employee Img' width='40' height='40' />
                                                                                    <div>
                                                                                        <p className='mb-0 font-weight-bold'>
                                                                                            {val.guest_name}
                                                                                        </p>
                                                                                        <p className='mb-0'>
                                                                                            {val.guest_phone}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-flex align-items-center text-right">
                                                                                    <div>
                                                                                        <p className='mb-0 font-weight-bold'>
                                                                                            { d ? d.toDateString() : null }
                                                                                        </p>
                                                                                        <p className='mb-0'>
                                                                                            {val.meeting_time}
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
                                            </>
                                        )

                                    }
                                )
                            }
                        </div>
                    </div>
                    {
                        SelectedEmployee.length === 0
                        ?
                        <div></div>
                        :
                        SelectedEmployee.map(
                            ( val, index ) => {

                                return (
                                    <div className="Details_Grid_Right" key={ index }>
                                        <div className="Grid_Right1" style={ { animationDelay: ( 0 + '.' + index ).toString() + 's' } }>
                                            <div className="Leave_Emp_Info">
                                                <div className="d-flex align-items-center pb-2">
                                                    <div>
                                                        <img src={ 'images/employees/' + val.emp_image } alt="DP" />
                                                    </div>
                                                    <div className="ml-3 py-2">
                                                        <p className="font-weight-bolder mb-0">{ val.name }</p>
                                                        <p className="mb-0">{ val.designation_name + ' at ' + val.company_name + ', ' + val.location_name }</p>
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
                                            <div className="Emp_Leave_Details">
                                                {
                                                    Guests.length === 0
                                                    ?
                                                    null
                                                    :
                                                    Guests.map(
                                                        ( val, index ) => {

                                                            return (
                                                                <>
                                                                    <div onClick={ () => PrevRequests( val.id, val.emp_id ) } className="requests" style={{ animationDelay: (0 + '.' + index).toString() + 's' }}>
                                                                        <div className="text-justify">
                                                                            <div className="d-flex align-items-center justify-content-between">
                                                                                <div className="d-flex align-items-center">
                                                                                    <img src={'images/guests/' + val.guest_image} className="rounded-circle mr-2" alt='Employee Img' width='40' height='40' />
                                                                                    <div>
                                                                                        <p className='mb-0 font-weight-bold'>
                                                                                            {val.guest_name}
                                                                                        </p>
                                                                                        <p className='mb-0'>
                                                                                            {val.guest_phone}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )

                                                        }
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="Grid_Right2">
                                            <div className="Right2_TopBox mb-3">
                                                {
                                                    LeaveTook.length === 0
                                                    ?
                                                    null
                                                    :
                                                    LeaveTook.map(
                                                        ( value, index )=> {

                                                            return (
                                                                <div style={ { animationDelay: ( 0 + '.' + index ).toString() + 's' } } key={ index } className={ "TopBox_Leave TopBox_Leave" + index }><div><p>{ value.maxLeave }</p><p>{ value.leaveType }</p></div></div>
                                                            )

                                                        }
                                                    )
                                                }
                                            </div>
                                            {
                                                SelectedGuestMeetings.length === 0
                                                ?
                                                    null
                                                :
                                                    <div className="Right2_BottomBox" style={{ animationDelay: (0 + '.' + index).toString() + 's' }}>
                                                        <div className="BottomBox_info">
                                                            <div></div>
                                                            <div className="font-weight-bolder">Meeting Time</div>
                                                            <div className="font-weight-bolder">Meeting Date</div>
                                                            {
                                                                SelectedGuestMeetings.map(
                                                                    ( val, index ) => {

                                                                        return (
                                                                            <>
                                                                                <div></div>
                                                                                <div>
                                                                                    {
                                                                                        val.meeting_time
                                                                                    }
                                                                                </div>
                                                                                <div>
                                                                                    {
                                                                                        val.meeting_date.substring(0,10)
                                                                                    }
                                                                                </div>
                                                                            </>
                                                                        )

                                                                    }
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                )

                            }
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default Leave_Application_Details;