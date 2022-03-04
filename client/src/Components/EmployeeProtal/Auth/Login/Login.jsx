import React, { useEffect, useState } from 'react';

import './Login.css';
import $ from 'jquery';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from '../../../../axios';

import Loading from '../../../UI/Loading/Loading';

import { EmployeeLogin } from '../../../../Redux/Actions/Action';

import FrmLogin from './frmLogin';

import socket from '../../../../io';
import LoadingIcon from '../../../../images/loadingIcons/icons8-loading-circle.gif';

const Employee_Login = () => {

    const [ UserData, setUserData ] = useState(
        {
            LoginID: '', LoginPass: '', Email: '', Name: ''
        }
    );

    const [ Employee, setEmployee ] = useState({});
    const [ Text, setText ] = useState("Loading....");
    
    // To show loading on true : false condition
    const [ StartLoading, setStartLoading ] = useState(true);

    // To change URL
    const history = useHistory();
    const dispatch = useDispatch();

    let key = 'real secret keys should be long and random';
    const encryptor = require('simple-encryptor')(key);
    
    useEffect(
        () => {

            setStartLoading( false );

        }, []

    )

    const LoginShow = () =>{

        $('.LoginDiv').fadeIn();
        $('.PassDiv').fadeOut(0);
        $('.ButtonDiv2').hide();
        $('.ButtonDiv1').show();
        $('.Emp_Login2_Grid .HideDiv').css('left', '0');
        $('.Emp_Login2_Grid .HideDiv').html('Login ID');

    }

    const Login_Div2= ( e ) => {

        e.preventDefault();
        setText("Processing");
        setStartLoading( true );

        // IF USER WANT TO TO GO TO ATTENDANCE PAGE
        if ( UserData.LoginID === '1234567890' )
        {
            history.push('/atthome');
        }

        axios.get('/authemployee').then(response => {

            let failed = true;

            for (let x = 0; x < response.data.length; x++) {

                // if the password and login id ofthe current index of an array is matched with 
                // the entered login id and password, the following condition will be true

                if ( UserData.LoginID === encryptor.decrypt( response.data[x].login_id ) ) {

                    $('.LoginDiv').fadeOut(0);
                    $('.PassDiv').fadeIn();
                    $('.ButtonDiv2').show();
                    $('.ButtonDiv1').hide();
                    $('.Emp_Login2_Grid .HideDiv').css('left', '50%');
                    $('.Emp_Login2_Grid .HideDiv').html('Password');

                    setEmployee(response.data[x]);
                    setStartLoading(false);
                    failed = false;
                    
                } else {

                    setStartLoading(false);
                    
                    setUserData({ LoginID: UserData.LoginID, LoginPass: '' });

                }

            }

            if ( failed )
            {
                ShowNotification( "No Employee Found" );
            }

        }).catch(error => {

            setStartLoading(false);
            ShowNotification( error );

        });

    }

    // Call on change function to store input field data into usestate()
    const OnChangeHandler = ( e ) => {

        const { name, value } = e.target;
        const setValues = {
            ...UserData,
            [name]: value
        }

        setUserData(setValues);

    }

    // On form submition, the following function call
    const OnUserLogin = ( e ) => {

        e.preventDefault();
        setText("Logging");
        setStartLoading(true);

        if ( UserData.LoginPass === encryptor.decrypt( Employee.emp_password ) )
        {
            
            const d = new FormData();
            d.append('empID', Employee.emp_id);
            axios.post('/getemployee', d).then( res => {

                let employee = res.data;

                socket.emit(
                    'UserCanLogin', Employee.emp_id
                );
            
                    // CHECK IF USER IS ALREADY LOGIN IN ANOTHER WINDOW
                socket.on(
                    'UserCanLogin', ( result ) => {

                        LoginSuccess( result, Employee, employee );

                    }
                );

            } ).catch( err => {

                ShowNotification( err );

            } );

        }else {

            setStartLoading(false);

            setUserData( { LoginID: UserData.LoginID, LoginPass: '' } );
            ShowNotification( 'Password Not Matched' );
            
        }

    }

    const LoginSuccess = ( result, emp, employee ) => {

        setStartLoading(false);
        
        if ( result.err === null && result.rslt[0].app_status === '' )
        {
            ShowNotification( 'Login Success' );

            sessionStorage.setItem('EmpID', emp.emp_id);
            sessionStorage.setItem('name', employee[0].name);

            socket.emit(
                'NewUser', emp.emp_id
            );

            dispatch( EmployeeLogin( employee[0] ) );
            
            setUserData( { LoginID: '', LoginPass: '' } );
    
            setTimeout(() => {
                history.replace('/login');
            }, 1000);
        }else
        {
            ShowNotification( 'You are already login in another window' );
        }

    }

    if ( sessionStorage.getItem('EmpID') ) {

        history.replace('/dashboard');
        
    };

    const ShowNotification = ( txt ) => {

        toast.dark( txt.toString() , {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });;

    }


    return (
        <>

            <ToastContainer />
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
                txt={ Text }
            />
            <FrmLogin Login_Div2={ Login_Div2 } LoginShow={LoginShow} OnChangeHandler={OnChangeHandler} UserData={UserData} OnUserLogin={OnUserLogin} />
        </>
    )
}
export default Employee_Login;