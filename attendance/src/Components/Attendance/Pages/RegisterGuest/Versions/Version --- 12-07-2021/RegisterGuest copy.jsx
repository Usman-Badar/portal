import React, { useEffect, useState } from 'react';

import './RegisterGuest.css';
import axios from '../../../../axios';
import { Link, useHistory } from 'react-router-dom';

import spoken from '../../../../../node_modules/spoken/build/spoken';

const RegisterGuest = () => {

    const history = useHistory();

    const [ ScheduleMeeting, setScheduleMeeting ] = useState(
        {
            GuestName: '', MeetingWith: ''
        }
    );

    useEffect(
        () => {

            if ( localStorage.getItem('DeviceID') === undefined || localStorage.getItem('DeviceID') === null )
            {
        
                history.replace('/attdevicesetup');
        
            }

            setScheduleMeeting(
                {
                    GuestName: sessionStorage.getItem('GuestName'),
                    MeetingWith: ''
                }
            );

        }, [history]
    )

    // Call on change function to store input field data into usestate()
    const OnChangeHandler = ( e ) => {

        const { name, value } = e.target;
        const setValues = {
            ...ScheduleMeeting,
            [name]: value
        }

        setScheduleMeeting(setValues);

    }

    const OnScheduleMeeting = ( e ) => {

        e.preventDefault();

        const d = new Date();
        const Data = new FormData();
        Data.append('GuestName', ScheduleMeeting.GuestName);
        Data.append('MeetingWith', ScheduleMeeting.MeetingWith);
        Data.append('MeetingTime', d.toLocaleTimeString());
        Data.append('MeetingDate', d.toLocaleDateString());
        Data.append('location', parseInt(localStorage.getItem('DeviceLocation')));
        
        axios.post('/registerguest', Data).then( () => {

            history.replace( '/attrviewguest' );

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

    }

    return (
        <>
            <div className="RegisterGuest">
                <div className="RegisterGuest-content">
                    <form onSubmit={ OnScheduleMeeting }>
                        <h3 className="mb-4">Guest Registration</h3>
                        <p className="mb-0">Guest Name</p>
                        <input type="text" className="form-control mb-4" name="GuestName" value={ ScheduleMeeting.GuestName } onChange={ OnChangeHandler } required pattern="[a-zA-Z][a-zA-Z\s]*" minLength="3" />
                        <p className="mb-0">Meeting With</p>
                        <select type="text" className="form-control mb-4" name="MeetingWith" onChange={ OnChangeHandler } required>
                            <option value="">Select Employee</option>
                            <option value="">Abdul Rasheed Kath</option>
                            <option value="">Salman Ahmed</option>
                            <option value="">Zeeshan Ahmed</option>
                            <option value="">Mustafa Hussain</option>
                            <option value="">Sarfraz</option>
                            <option value="">Rehan</option>
                            <option value="">Abid</option>
                            <option value="">Manzoor</option>
                        </select>
                        <button type="submit" className="btn btn-dark d-block mx-auto px-4">Save</button>
                        <Link to="/attrviewguest" className="text-center d-block mt-3 mb-0 text-dark">View Guests</Link>
                    </form>
                </div>
            </div>
        </>
    )

}

export default RegisterGuest;