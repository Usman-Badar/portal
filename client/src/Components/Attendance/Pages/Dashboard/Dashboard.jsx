import React, { useEffect } from 'react';

import './Dashboard.css';
import { Link, Route, useHistory } from 'react-router-dom';

import DeviceSetup from '../DeviceSetup/DeviceSetup';
import ManualAttendance from '../ManualAttendance/ManualAttendance';
import ViewEmployees from '../ViewEmployees/ViewEmployees';
import EmpDetails from '../ViewEmployees/EmpDetails/EmpDetails';
import Notifications from '../Notifications/Notifications';
import RegisterGuest from '../RegisterGuest/RegisterGuest';
import ViewGuests from '../ViewGuests/ViewGuests';
import EmpPresentDetails from '../EmployeesPresent/Emp_Present_Details';

// import axios from 'axios';

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import socket from '../../../../io';

const Dashboard =() => {

    const history = useHistory();

    useEffect(
        () => {

            if ( localStorage.getItem('device_browser') === undefined || localStorage.getItem('device_browser') === null || localStorage.getItem('device_machine') === undefined || localStorage.getItem('device_machine') === null )
            {
        
                history.replace('/attdevicesetup');
        
            }else
            {

                let userAgent = navigator.userAgent;
                if ( localStorage.getItem('device_browser') !== userAgent )
                {
                    history.replace('/attdevicesetup'); // it will redirect the user to device setup page
                }

            }

            // axios.get('https://api.ipify.org/').then( res => {

            //     console.log( res.data );

            // } ).catch( err => {

            //     toast.dark( err , {
            //         position: 'top-right',
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //     });;

            // } );

            socket.on(
                'Finger', ( res ) => {

                    console.log(' punch ');
        
                }
            )

        }, []
    )

    const DashboardContent =
    <>
        <div className="Dashboard"> 
            <div className="container-fluid pt-5 px-5"> 
                <div className="row pt-5"> 
                    {
                        localStorage.getItem('AccessControl') ? JSON.parse( localStorage.getItem('AccessControl') ).includes(1)
                        ?
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4"> 
                            <Link to='/attdevicesetup'> 
                                <div className="divs"> 
                                    <i className="las la-tablet"></i> 
                                    <h5>Device Setup</h5> 
                                </div> 
                            </Link> 
                        </div> 
                        :
                        null
                        :
                        null
                    }
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4"> 
                        <Link to='/attrgstrguest'>
                                <div className="divs">
                                    <i className="las la-male"></i>
                                    <h5>Guest Registeration</h5>
                                </div>
                        </Link>
                    </div> 
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4"> 
                        <Link to='/arrivedemp'>
                                <div className="divs">
                                    <i className="las la-users"></i>
                                    <h5>Arrived Employees</h5>
                                </div>
                        </Link>
                    </div> 
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <Link to='/atthome'>
                            <div className="divs">
                                <i className="las la-home"></i>
                                <h5>Go To Home</h5>
                            </div>
                        </Link>
                    </div>
                </div> 
            </div> 
        </div>
    </>

    return (
        <>
            <div className="topBar"> 
                <div> 
                    <Link to='/attdashboard' className='text-white'>
                        <p className="mb-0">Welcome</p>
                    </Link> 
                </div>
            </div>
            <Route exact path='/attdashboard' render={ () => DashboardContent } />
            <Route exact path='/attdevicesetup' component={ DeviceSetup } />
            <Route exact path='/setattendance' component={ ManualAttendance } />
            <Route exact path='/arrivedemp' component={ EmpPresentDetails } />
            <Route exact path='/attviewemps' component={ ViewEmployees } />
            <Route exact path='/attrviewguest' component={ ViewGuests } />
            <Route exact path='/attrgstrguest' component={ RegisterGuest } />
            <Route exact path='/empdetails/:id' component={ EmpDetails } />
            <Route exact path='/notifications' component={ Notifications } />
        </>
    )

};

export default Dashboard;