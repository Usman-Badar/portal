import React, { useState } from 'react';

import './Admin_login.css';
import { useHistory } from 'react-router-dom';
import axios from '../../../axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin_login = () => {

    const history = useHistory();

    const [ User, setUser ] = useState(
        {
            userName: '', userPass: ''
        }
    );

    let key = 'real secret keys should be long and random';
    const encryptor = require('simple-encryptor')(key);

    // Call on change function to store input field data into usestate()
    const OnChangeHandler = ( e ) => {

        const { name, value } = e.target;
        const setValues = {
            ...User,
            [name]: value
        }

        setUser(setValues);

    }

    // On form submition, the following function call
    const OnUserLogin = ( e ) => {

        e.preventDefault();

        axios.get('/getallusers').then( response => {

            for ( let x = 0; x < response.data.length; x++ )
            {
                // if the password and login id ofthe current index of an array is matched with 
                // the entered login id and password, the following condition will be true
                if ( User.userName === encryptor.decrypt( response.data[x].user_name ) )
                {
                    const verifyPass = encryptor.decrypt( response.data[x].user_password );

                    if ( verifyPass === User.userPass )
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

                        sessionStorage.setItem('UserID', response.data[x].user_id);
                        sessionStorage.setItem('userName', encryptor.decrypt( response.data[x].user_name ));
                        sessionStorage.setItem('UserImg', response.data[x].user_image);

                        setUser( { userName: '', userPass: '' } );

                        setTimeout(() => {
                            history.replace('/admin_module');
                        }, 1000);

                        break;
                    }else {

                        setUser( { userName: User.userName, userPass: '' } );
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
                    
                    setUser( { userName: User.userName, userPass: '' } );

                }

            }

        } ).catch( error => {

            
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

    if ( sessionStorage.getItem('UserID') )
    {
        history.replace('/admin_module');
    }

    return (
        <>
            <ToastContainer />
            <div className='Admin_login'>
                <div className="Admin_login-content">
                    <i className="lar la-user"></i>
                    <form onSubmit={ OnUserLogin }>
                        <h3 className="text-uppercase mb-5" style={ { 'fontFamily' : 'JosefinSans' } }>Admin Panel</h3>
                        <input type="text" className="form-control" name="userName" placeholder="Username" value={ User.userName } onChange={ OnChangeHandler } minLength="3" required />
                        <input type="password" className="form-control" name="userPass" placeholder="Password" value={ User.userPass } onChange={ OnChangeHandler } minLength="3" required />
                        <button className="btn" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    )

}

export default Admin_login;