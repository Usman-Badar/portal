import React, { useEffect, useState } from 'react';

import './Login.css';
import axios from '../../../../axios';
import { useHistory, Link } from 'react-router-dom';
import Loading from '../../Components/UI/Loading/Loading';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import spoken from '../../../../../node_modules/spoken/build/spoken';

const Login = () => {

    // To change URL
    const history = useHistory();
    const [ StartLoading, setStartLoading ] = useState(true);

    const [ UserData, setUserData ] = useState(
        {
            LoginID: '', LoginPass: ''
        }
    );
    let key = 'real secret keys should be long and random';
    const encryptor = require('simple-encryptor')(key);

    useEffect(
        () => {
            setTimeout(() => {
                setStartLoading( false );
            }, 500);

            setTimeout(() => {
                if (window.location.href.split('/').pop() === 'attlogin') 
                {

                    history.replace('/');

                }
            }, 1000 * 60);
        }, [ history ]
    )

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
        setStartLoading( true );

        axios.get('/authemployee').then( response => {

            for ( let x = 0; x < response.data.length; x++ )
            {
                setStartLoading( false );
                // if the password and login id ofthe current index of an array is matched with 
                // the entered login id and password, the following condition will be true
                if ( UserData.LoginID === encryptor.decrypt( response.data[x].login_id ) )
                {
                    const verifyPass = encryptor.decrypt( response.data[x].emp_password );

                    if ( verifyPass === UserData.LoginPass )
                    {
                        const Data = new FormData();
                        Data.append( 'empID', response.data[x].emp_id );
                        axios.post('/checkattaccess', Data).then( res => {

                            if ( res.data[0] )
                            {
                            
                                if ( JSON.parse( res.data[0].access ).includes(100) || JSON.parse( res.data[0].access ).includes(101) || JSON.parse( res.data[0].access ).includes(102) || JSON.parse( res.data[0].access ).includes(103) )
                                {
                                    spoken.say('Login Successed,... Please wait');
                                    localStorage.setItem('AttLoginID', encryptor.decrypt( response.data[x].login_id ));
                                    localStorage.setItem('AccessControl', res.data[0].access);
                                    setUserData( { LoginID: '', LoginPass: '' } );
                                    setTimeout(() => {
                                        history.replace('/attdashboard');
                                        setTimeout(() => {
                                            spoken.say('Welcome To Dashboard');
                                        }, 1000);
                                    }, 2000);
                                }else
                                {
                                    setUserData( { LoginID: UserData.LoginID, LoginPass: '' } );
                                    spoken.say('Permission Denied!!');
                                }

                            }else
                            {
                                setUserData( { LoginID: UserData.LoginID, LoginPass: '' } );
                                spoken.say('Permission Denied!!');
                            }

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

                    }else {
                        setUserData( { LoginID: UserData.LoginID, LoginPass: '' } );
                        spoken.say('Password Not Matched... please try again');
                    }
                    
                }

            }

        } ).catch( error => {

            setTimeout(() => {
                spoken.say( error + '...., Please Try Later' );
                setStartLoading( false );
                setUserData( { LoginID: UserData.LoginID, LoginPass: '' } );
            }, 1000);

        } );

    }

    return (
        <>
            <Loading show={ StartLoading } />
            <ToastContainer />
            <div className="Login">
                <div className="Login-content">
                    <form onSubmit={  OnUserLogin }>
                        <h3 className="mb-4">Login</h3>
                        <input type="text" value={ UserData.LoginID } onChange={ OnChangeHandler } className="form-control mb-3 rounded-0" placeholder="Login ID" name="LoginID" />
                        <input type="password" value={ UserData.LoginPass } onChange={ OnChangeHandler } className="form-control mb-3 rounded-0" placeholder="Password" name="LoginPass" />
                        <button className="btn" type="submit">Login</button>
                        <Link to='/' className='text-center d-block mb-0 mt-3 text-dark'>Go To Home</Link>
                    </form>
                </div>
            </div>
        </>
    )

}

export default Login;