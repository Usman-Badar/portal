import React, { lazy, Suspense, useEffect, useState } from 'react';

import axios from '../../../../../../axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { newRequest, getLocations, getRequests } from './Functions';
const UI = lazy( () => import('./UI') );

const RepairRequest = () => {

    const [ Locations, setLocations ] = useState([]);
    const [ RequestsList, setRequestsList ] = useState([]);

    useEffect(
        () => {

            getLocations( axios, setLocations );
            getRequests( axios, setRequestsList );

        }, []
    )
    
    return (
        <>
            <Suspense fallback={ <div>Loading...</div> }>
                <UI 
                    Locations={ Locations }
                    RequestsList={ RequestsList }

                    newRequest={ (e) => newRequest(e, axios, setRequestsList) }
                />
            </Suspense>
            <ToastContainer />
        </>
    );

}

export default RepairRequest;