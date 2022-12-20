import React, { useState } from 'react';

import './InvtryLogin.css';
import { useHistory } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import spoken from '../../../../node_modules/spoken/build/spoken';

import { useSelector } from 'react-redux';

const InvtryLogin = () => {

    const Credentials = useSelector( ( state ) => state.EmpAuth.EmployeeData );

    // To change URL
    const history = useHistory();
    let key = 'real secret keys should be long and random';
    const encryptor = require('simple-encryptor')(key);

    const [ UserData, setUserData ] = useState(
        {
            LoginID: '', LoginPass: ''
        }
    );

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
        if( UserData.LoginID === encryptor.decrypt(Credentials.login_id) )
        {
            if (UserData.LoginPass === encryptor.decrypt(Credentials.emp_password)) 
            {
                spoken.say('Login success. Please wait');
                toast.dark("Login success", {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                sessionStorage.setItem('InvtryEmpID', Credentials.emp_id);

                setTimeout(() => {
                    history.replace('/invtry')
                }, 3000);
            }else
            {
                spoken.say('Password Not Matched');
                toast.dark("Password Not Matched", {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }else
        {
            spoken.say('Login ID is not correct');
            toast.dark("Login ID is not correct", {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    if (sessionStorage.getItem('InvtryEmpID')) {
        history.replace('/invtry');
    };

    return (
        <>
            <ToastContainer />
            <div className="invtry_Login">
                <div className="invtry_Login-content">
                    <form onSubmit={  OnUserLogin }>
                        <h1 className="text-uppercase text-center mb-4">Inventory Login</h1>
                        <input type="text" className="form-control" placeholder="Login ID" value={ UserData.LoginID } onChange={ OnChangeHandler } name="LoginID" minLength="3" required />
                        <input type="password" className="form-control" placeholder="Password" value={ UserData.LoginPass } onChange={ OnChangeHandler } name="LoginPass" minLength="3" required />
                        <button className="btn">Login</button>
                    </form>
                </div>
            </div>
        </>
    )

}


export default InvtryLogin;