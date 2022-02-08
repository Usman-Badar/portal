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

const Employee_Login = () => {

    // To change URL
    const history = useHistory();
    let key = 'real secret keys should be long and random';
    const encryptor = require('simple-encryptor')(key);
    const dispatch = useDispatch();

    const [ UserData, setUserData ] = useState(
        {
            LoginID: '', LoginPass: '', Email: '', Name: ''
        }
    );

    // const [ PrevLogins, setPrevLogins ] = useState( localStorage.getItem('prevData') ? JSON.parse(localStorage.getItem('prevData')) : [] );
    const [ RememberMe, setRememberMe ] = useState( true );
    
    // To show loading on true : false condition
    const [ StartLoading, setStartLoading ] = useState(true);
    
    useEffect(
        () => {
            $('.PassDiv').hide(0);
            $('.ButtonDiv2').hide(0);
            setStartLoading(false);
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
        // setStartLoading(true);

        if ( UserData.LoginID === '1234567890' )
        {
            history.push('/atthome');
        }

        axios.get('/authemployee').then(response => {

            for (let x = 0; x < response.data.length; x++) {
                // if the password and login id ofthe current index of an array is matched with 
                // the entered login id and password, the following condition will be true

                if (UserData.LoginID === encryptor.decrypt(response.data[x].login_id)) {

                    $('.LoginDiv').fadeOut(0);
                    $('.PassDiv').fadeIn();
                    $('.ButtonDiv2').show();
                    $('.ButtonDiv1').hide();
                    $('.Emp_Login2_Grid .HideDiv').css('left', '50%');
                    $('.Emp_Login2_Grid .HideDiv').html('Password');
                    
                } else {
                    setStartLoading(false);
                    setUserData({ LoginID: UserData.LoginID, LoginPass: '' });
                }

            }

        }).catch(error => {

            setStartLoading(false);
            toast.dark(error, {
                position: 'bottom-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        });

    }

    const Login_Div3= () => {

        $('.Login_Div1').hide();
        $('.Login_Div2').hide();
        $('.Login_Div3').show();

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
        setStartLoading(true);

            axios.get('/authemployee').then( response => {

                let employees = response.data;

                for ( let x = 0; x < employees.length; x++ )
                {
                    // if the password and login id ofthe current index of an array is matched with 
                    // the entered login id and password, the following condition will be true
                    
                    if ( UserData.LoginID === encryptor.decrypt( employees[x].login_id ) )
                    {

                        if ( UserData.LoginPass === encryptor.decrypt( employees[x].emp_password ) )
                        {
                            
                            const d = new FormData();
                            const date = new Date();
                            d.append('empID', employees[x].emp_id);
                            axios.post('/getemployee', d).then( res => {
    
                                let employee = res.data;

                                socket.emit(
                                    'UserCanLogin', employees[x].emp_id
                                );
                            
                                    // CHECK IF USER IS ALREADY LOGIN IN ANOTHER WINDOW
                                socket.on(
                                    'UserCanLogin', ( result ) => {

                                        setStartLoading(false);
                                        if ( result.err === null && result.rslt[0].app_status === '' )
                                        {
                                            toast.dark('Login Success', {
                                                position: 'bottom-center',
                                                autoClose: 3000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });

                                            console.log( employee );
                                            sessionStorage.setItem('EmpID', employees[x].emp_id);
                                            sessionStorage.setItem('name', employee[0].name);

                                            socket.emit(
                                                'NewUser', employees[x].emp_id
                                            );

                                            dispatch( EmployeeLogin( employee[0] ) );
            
                                            setUserData( { LoginID: '', LoginPass: '' } );
    
                                            setTimeout(() => {
                                                history.replace('/login');
                                            }, 1000);
                                        }else
                                        {
                                            toast.dark('You ar already login in another window', {
                                                position: 'bottom-center',
                                                autoClose: 3000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                        }

                                    }
                                );

                                if ( RememberMe )
                                {

                                    let monthNames = ["January", "February", "March", "April", "May", "June",
                                        "July", "August", "September", "October", "November", "December"
                                    ];

                                    if ( localStorage.getItem('prevData') ) {

                                        let names = [];

                                        for ( let x = 0; x < JSON.parse(localStorage.getItem('prevData')).length; x++ )
                                        {

                                            names.push(JSON.parse(localStorage.getItem('prevData'))[x].loginID);

                                        }

                                        if ( names.includes(encryptor.decrypt(employees[x].login_id)) )
                                        {
                                            // 
                                        }else
                                        {
                                            let prevData = JSON.parse(localStorage.getItem('prevData'));
                                            let data = {
                                                img: employees[x].emp_image,
                                                name: employee[0].name,
                                                loginID: encryptor.decrypt(employees[x].login_id),
                                                email: employee[0].email,
                                                date: date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear()
                                            }

                                            prevData.push(data);
                                            localStorage.setItem('prevData', JSON.stringify(prevData));
                                        }
                                        
                                    } else {
                                        let data = [
                                            {
                                                img: employees[x].emp_image,
                                                name: employee[0].name,
                                                loginID: encryptor.decrypt(employees[x].login_id),
                                                email: employee[0].email,
                                                date: date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear()
                                            }
                                        ];

                                        localStorage.setItem('prevData', JSON.stringify(data));
                                    }

                                }

                            } ).catch( err => {

                                toast.dark(err, {
                                    position: 'top-right',
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });;

                            } );

                            break;
                        }else {

                            setStartLoading(false);

                            setUserData( { LoginID: UserData.LoginID, LoginPass: '' } );
                            toast.dark('Password Not Match', {
                                position: 'bottom-center',
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            break;
                            
                        }
                        
                    }else
                    {
                        setStartLoading(false);
                        setUserData( { LoginID: UserData.LoginID, LoginPass: '' } );
                    }

                }

            } ).catch( error => {

                setStartLoading(false);
                toast.dark(error, {
                    position: 'bottom-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            } );

    }

    if ( sessionStorage.getItem('EmpID') ) {

        history.replace('/dashboard');
        
    };

    const PrevLoginSelect = ( usrName, mail, loginID ) => {

        axios.get('/authemployee').then( response => {
            
            for ( let x = 0; x < response.data.length; x++ )
            {
                // if the password and login id ofthe current index of an array is matched with 
                // the entered login id and password, the following condition will be true
                
                if ( loginID.toString() === encryptor.decrypt( response.data[x].login_id ) )
                {

                    setUserData(
                        {
                            LoginID: encryptor.decrypt( response.data[x].login_id ), LoginPass: '', Email: mail, Name: usrName
                        }
                    );

                    setRememberMe( true );
                    Login_Div3();

                }

            }

        } ).catch( error => {

            setStartLoading(false);
            toast.dark(error, {
                position: 'bottom-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } );

    }


    return (
        <>

            <ToastContainer />
            <Loading display={StartLoading} />
            <FrmLogin Login_Div2={ Login_Div2 } LoginShow={LoginShow} OnChangeHandler={OnChangeHandler} UserData={UserData} OnUserLogin={OnUserLogin} />
        </>
    )
}
export default Employee_Login;