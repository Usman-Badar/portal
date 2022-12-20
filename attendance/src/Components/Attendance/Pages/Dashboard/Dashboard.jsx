import React, { useEffect } from 'react';

import './Dashboard.css';
import { Link, useHistory, Route } from 'react-router-dom';

import DeviceSetup from '../DeviceSetup/DeviceSetup';
import ManualAttendance from '../ManualAttendance/ManualAttendance';
import ViewEmployees from '../ViewEmployees/ViewEmployees';
import EmpDetails from '../ViewEmployees/EmpDetails/EmpDetails';
import Notifications from '../Notifications/Notifications';
import RegisterGuest from '../RegisterGuest/RegisterGuest';
import ViewGuests from '../ViewGuests/ViewGuests';

import spoken from '../../../../../node_modules/spoken/build/spoken';
import axios from 'axios';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard =() => {

    const history = useHistory();

    useEffect(
        () => {

            axios.get('https://api.ipify.org/').then( res => {

                console.log( res.data );

            } ).catch( err => {

                toast.dark( err , {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });;

            } );

        }, []
    )

    const dashboardContent =
    <>
        <div className="Dashboard"> 
            <div className="container-fluid pt-5 px-5"> 
                <div className="row pt-5"> 
                    {
                        localStorage.getItem('AccessControl') ? JSON.parse( localStorage.getItem('AccessControl') ).includes(102)
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
                        <Link to='/'>
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
            <Route exact path='/attdashboard' render={ () => dashboardContent } />
            <Route exact path='/attdevicesetup' render={ () => <DeviceSetup /> } />
            <Route exact path='/setattendance' render={ () => <ManualAttendance /> } />
            <Route exact path='/attviewemps' render={ () => <ViewEmployees /> } />
            <Route exact path='/attrviewguest' render={ () => <ViewGuests /> } />
            <Route exact path='/attrgstrguest' render={ () => <RegisterGuest /> } />
            <Route exact path='/empdetails/:id' render={ () => <EmpDetails /> } />
            <Route exact path='/notifications' render={ () => <Notifications /> } />
        </>
    )

};

export default Dashboard;