import React, { useEffect, useState } from 'react';

import './ViewGuests.css';
import { Link, useHistory } from 'react-router-dom';

import axios from '../../../../axios';

import spoken from '../../../../../node_modules/spoken/build/spoken';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewGuests = () => {

    const history = useHistory();

    const [ Guests, setGuests ] = useState([]);
    const [ GuestName, setGuestName ] = useState();

    useEffect(
        () => {

            if ( localStorage.getItem('DeviceID') === undefined || localStorage.getItem('DeviceID') === null )
            {
        
                history.replace('/attdevicesetup');
        
            }

            GetGuests();

        }, [history]
    );

    const GetName =() => {

        history.replace('/attrgstrguest');

        setTimeout(() => {
            spoken.say('Please tell me your name').then( () => {
                spoken.listen().then( transcript =>
                    setGuestName( transcript )
                );
            } );
        }, 1000);

    }

    const GetGuests = () => {

        const Data = new FormData();
        Data.append('location', parseInt(localStorage.getItem('DeviceLocation')));
        axios.post('/getallregisteredguestslocationwise', Data).then( response => {

            setGuests( response.data );

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
            <div className="ViewGuests">
                <div className="ViewGuests-content">
                    
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <h3 className="mb-0">Guests</h3>
                        <button className="btn btn-info" onClick={ GetName }>Register New Guest</button>
                    </div>

                    {
                        Guests.length === 0
                        ?
                        <h3 className="text-center">No Guest Found</h3>
                        :
                        Guests.map(
                            ( val, index ) => {

                                return (
                                    <div className="d-flex align-items-center gests" key={ index }>
                                        <div className="index">
                                            <span> { index + 1 } </span>
                                        </div>
                                        <div className="colum">
                                            <span>Name</span>
                                            <p className="mb-0"> { val.guest_name } </p>
                                        </div>
                                        <div className="colum">
                                            <span>Meeting With</span>
                                            <p className="mb-0">{ val.meeting_person }</p>
                                        </div>
                                        <div className="colum">
                                            <span>Meeting Time</span>
                                            <p className="mb-0">{ val.meeting_time }</p>
                                        </div>
                                    </div>
                                )
                                
                            }
                        )
                    }
                    <Link to="/attdashboard" className="text-center d-block mt-3 mb-0 text-dark">Go To Dashboard</Link>
                </div>
            </div>
        </>
    )

}

export default ViewGuests;