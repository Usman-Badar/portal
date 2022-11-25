import React, { lazy, Suspense, useEffect, useState } from 'react';

import axios from '../../../../../../axios';
import $ from 'jquery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { newRequest, getLocations, getRequests, onAttachFiles } from './Functions';
const UI = lazy( () => import('./UI') );
const Mail = lazy( () => import('../../../../../UI/Mail/Mail') );

const RepairRequest = () => {

    const [ Locations, setLocations ] = useState([]);
    const [ RequestsList, setRequestsList ] = useState([]);
    const [ ListAttachments, setListAttachments ] = useState([]);
    const [ Files, setFiles ] = useState([]);
    const [MailData, setMailData] = useState(
        {
            subject: "",
            send_to: "",
            gender: "",
            receiver: "",
            message: ""
        }
    );

    useEffect(
        () => {
            
            getLocations( axios, setLocations );
            getRequests( axios, setRequestsList, setListAttachments );

        }, []
    )

    useEffect(
        () => {
            
            if ( MailData.subject !== '' && MailData.send_to !== '' && MailData.gender !== '' && MailData.receiver !== '' && MailData.message !== '' )
            {
                $('#mail_form').trigger('click');
            }

        }, [ MailData.subject, MailData.send_to, MailData.gender, MailData.receiver, MailData.message ]
    );
    
    return (
        <>
            <Suspense fallback={ <div>Loading...</div> }>
                <UI 
                    Locations={ Locations }
                    RequestsList={ RequestsList }
                    ListAttachments={ ListAttachments }
                    Files={ Files }

                    newRequest={ (e) => newRequest(e, axios, Files, setRequestsList, setFiles, setListAttachments, setMailData) }
                    onAttachFiles={ (e) => onAttachFiles( e, setFiles ) }
                />
            </Suspense>
            <ToastContainer />
            <Mail
                data={ MailData }
            />
        </>
    );

}

export default RepairRequest;