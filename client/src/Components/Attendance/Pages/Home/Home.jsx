import React, { useEffect, useState } from 'react';

import './Home.css';
import { useHistory } from 'react-router-dom';

import Clock from 'react-digital-clock';
import axios from '../../../../axios';
import Loading from '../../../UI/Loading/Loading';
import $ from 'jquery';

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import moment from 'moment';
import LoadingIcon from '../../../../images/loadingIcons/icons8-loading-circle.gif';

const Home = () => {

    const history = useHistory();

    const [ StartLoading, setStartLoading ] = useState(true); // For show Loading page or hide

    useEffect(
        () => {

            setStartLoading( false ); // set loading to false
            if ( localStorage.getItem('empID') ) // if page get employee id
            {

                history.replace('/operations?id=' + localStorage.getItem('empID') + '&time=' + localStorage.getItem('empinouttime')); // the system will redirect the user to operations page

            }

            if ( localStorage.getItem('device_browser') === undefined || localStorage.getItem('device_browser') === null || localStorage.getItem('device_machine') === undefined || localStorage.getItem('device_machine') === null ) // if page fail to get device id
            {
        
                history.replace('/attdevicesetup'); // it will redirect the user to device setup page
        
            }else
            {

                let userAgent = navigator.userAgent;
                if ( localStorage.getItem('device_browser') !== userAgent )
                {
                    history.replace('/attdevicesetup'); // it will redirect the user to device setup page
                }

            }

            setInterval(() => {
                $('.Home').trigger('click');
            }, 5000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    )

    useEffect(
        () => {

            if ( !localStorage.getItem('LocationEmployees') || localStorage.getItem('LocationEmployees') === '[]' )
            {
                GetLocationEmployees();
            }

            GetInouts();
            getNextTimeLimit();


        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    )

    const getNextTimeLimit = () => {

        axios.get(
            '/getnextattendancetimelimit'
        ).then(
            res => {

                sessionStorage.setItem('MiscId-1', res.data[0].valueInt1);

            }
        ).catch(
            error => {

                console.log( error );

            }
        );

    }

    const InMemory = ( emp_id ) => {

        let data = sessionStorage.getItem( emp_id.toString() );
        return data;

    }

    const GetInouts = () => {

        const D = new FormData();
        D.append('machine', localStorage.getItem('device_machine'));
        axios.post('/getempinout', D).then(response => {

            if (response.data[0] !== undefined) {

                setStartLoading(true);

                let timing = InMemory(response.data[0].emp_id);
                let pass = false;
                if ( timing === null )
                {
                    pass = true;
                }else
                {
                    // let current_time = new Date().toTimeString();
                    let current_time = moment(new Date().toTimeString(), "h:mm:ss A")
                    .format("HH:mm:ss");
                    
                    if ( current_time > timing )
                    {
                        sessionStorage.removeItem(response.data[0].emp_id.toString());
                        pass = true;
                    }else
                    {
                        pass = false; 
                        goToHome();
                    }
                }

                if ( pass )
                {
                    let emp = GetEmployee(response.data[0].emp_id);
    
                    localStorage.setItem('empID', response.data[0].emp_id);
                    localStorage.setItem('empImg', emp.emp_image);
    
                    let inTenSeconds = new Date(new Date().getTime() + 10 * 1000);
                    Cookies.set('Session', "FOR ATTENDANCE", { expires: inTenSeconds });
                    // the user will redirect after a half second to operations page
                    history.replace('/operations?id=' + response.data[0].emp_id + '&time=' + response.data[0].time);
                }

            }else
            {
                GetInouts();
            }

        }).catch(error => {

            console.log(error);

        });

    }

    const goToHome = () => {
        
        axios.post('/setstatustolog', { device_id: localStorage.getItem('device_machine') }).then(() => {

            localStorage.removeItem('empID');
            localStorage.removeItem('empName');
            setStartLoading( false );
            GetInouts();

        }).catch(error => {

            console.log( error );

        });

    }

    // GET ALL EMPLOYEES OF THE LOCATION
    const GetLocationEmployees = () => {

        axios.get('/getemployeesforattendance').then(
            res => {

                localStorage.setItem(
                    'LocationEmployees', JSON.stringify( res.data )
                );

            }
        ).catch(
            err => {

                console.log( err );

            }
        )

    }

    const GetEmployee = ( emp_id ) => {

        let data = JSON.parse( localStorage.getItem('LocationEmployees') );

        for ( let x = 0; x < data.length; x++ )
        {

            if ( data[x].emp_id === parseInt( emp_id ) )
            {
                return data[x];
            }

        }

    }

    // redirect the user to login page
    const GoToGuestRegister = () => {
        
        history.replace('/attdashboard');

    }


    return (
        <>
            <Loading 
                display={ StartLoading }
                styling={
                    {
                        zIndex: 100000
                    }
                }
                icon={ 
                    <img 
                        src={ LoadingIcon }
                        className="LoadingImg"
                        alt="LoadingIcon"
                    /> 
                }
                txt="Loading"
            />
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