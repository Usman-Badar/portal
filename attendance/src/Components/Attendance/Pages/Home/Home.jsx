import React, { useEffect, useState } from 'react';

import './Home.css';
import { useHistory } from 'react-router-dom';

import Clock from 'react-digital-clock';
import axios from '../../../../axios';
import Loading from '../../Components/UI/Loading/Loading';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import socket from '../../../../axios'; 

const Home = () => {

    const history = useHistory();

    const [ StartLoading, setStartLoading ] = useState(true); // For show Loading page or hide

    useEffect(
        () => {

            socket.open();
            // CHECK USER IS ONLINE OR NOT
            socket.on(
                'Finger', ( res ) => {

                    console.log( res );

                }
            )

            socket.emit('Finger', 'hi');

            setStartLoading( false ); // set loading to false

            if ( localStorage.getItem('empID') ) // if page get employee id
            {

                history.replace('/operations?id=' + localStorage.getItem('empID') + '&time=' + localStorage.getItem('empinouttime')); // the system will redirect the user to operations page

            }

            if ( localStorage.getItem('DeviceID') === undefined || localStorage.getItem('DeviceID') === null ) // if page fail to get device id
            {
        
                history.replace('/attdevicesetup'); // it will redirect the user to device setup page
        
            }else
            {
                const Data = new FormData();
                Data.append('DevLocation', localStorage.getItem('DeviceID'));

                axios.post('/getattdevicebycode', Data).then(  res => {

                    setStartLoading( false );

                    setInterval(() => { // this function will only run when the url is /
                        // if ( window.location.href.split('/').pop() === '' )
                        // {

                            const D = new FormData();
                            D.append('location', localStorage.getItem('DeviceLocation'));
                            axios.post('/getempinout', D).then( response => {

                                if (response.data[0] !== undefined) {

                                    setStartLoading(true);
                                    const d = new FormData();
                                    d.append('empID', response.data[0].emp_id);
                                    axios.post('/getemployeedetails', d).then(res => {

                                        localStorage.setItem('empID', response.data[0].emp_id);
                                        localStorage.setItem('empImg', res.data[0].emp_image);
                                        // the user will redirect after a half second to operations page
                                        history.replace('/operations?id=' + response.data[0].emp_id + '&time=' + response.data[0].time);

                                    }).catch(err => {

                                        toast.dark(err, {
                                            position: 'top-right',
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });;

                                    });

                                }

                            }).catch(error => {

                                console.log(error);

                            });

                        // }

                    }, 500);

                    // Device ID
                    localStorage.setItem('DeviceID', res.data[0].device_code);

                }).catch( err => {

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
            }

        }, [ history ]
    )
    
    const refreshPage = () => { 

        alert('asdasdas');
        // window.location.reload();

    }

    // redirect the user to login page
    const GoToGuestRegister = () => {
        
        history.replace('/attdashboard');

    }

    refreshPage();


    return (
        <>
            <Loading show={ StartLoading } />
            <div className="Home" onDoubleClick={ GoToGuestRegister }> 
                <div className="Home_content text-center">
                    <h1 className="mb-0">Seaboard</h1>
                    <div className="d-flex justify-content-between align-items-center px-4 font-weight-bold" style={ { 'fontFamily' : 'JosefinSans', 'fontSize' : '22px' } }>
                        <div>G</div>
                        <div>R</div>
                        <div>O</div>
                        <div>U</div>
                        <div>P</div>
                    </div>
                    <Clock format='hh-mm' />
                </div>
            </div>
        </>
    )

}

export default Home;