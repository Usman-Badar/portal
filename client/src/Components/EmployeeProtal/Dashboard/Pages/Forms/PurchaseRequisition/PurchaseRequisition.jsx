import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addRow, ApproveRequisition, RejectRequisition, CancelRequisition, openRequestDetails, loadRequests, GetLocations, PRSubmittion, SubmitPR, onAttachQuotations, GetCompanies, onContentInput, onContentEdit } from './Functions';
const UI = lazy( () => import('./UI') );

function PurchaseRequisition() {

    const history = useHistory();

    const [ ShowQuotationModal, setShowQuotationModal ] = useState(false);
    const [ SubmitConfirmation, setSubmitConfirmation ] = useState(false);
    const [ Quotations, setQuotations ] = useState([]);
    const [ AttachedQuotations, setAttachedQuotations ] = useState([]);
    const [ Companies, setCompanies ] = useState([]);
    const [ Locations, setLocations ] = useState([]);
    const [ Specifications, setSpecifications ] = useState([]);
    const [ Data, setData ] = useState();
    const [ Requests, setRequests ] = useState();
    const [ RequestDetails, setRequestDetails ] = useState();

    useEffect(
        () => {

            GetCompanies( setCompanies );
            GetLocations( setLocations );

        }, []
    )
    
    return (
        <>
            <Suspense fallback={ <div>Please Wait...</div> }>
                <UI 
                    Companies={ Companies }
                    Locations={ Locations }
                    Quotations={ Quotations }
                    ShowQuotationModal={ ShowQuotationModal }
                    SubmitConfirmation={ SubmitConfirmation }
                    Requests={ Requests }
                    history={ history }
                    RequestDetails={ RequestDetails }
                    Specifications={ Specifications }
                    AttachedQuotations={ AttachedQuotations }

                    addRow={ addRow }
                    openRequestDetails={ ( pr_id ) => openRequestDetails( pr_id, setRequestDetails, setSpecifications, setAttachedQuotations ) }
                    PRSubmittion={ ( e ) => PRSubmittion( e, history, toast, Quotations, Data ) }
                    SubmitPR={ ( e ) => SubmitPR( e, setData, setSubmitConfirmation ) }
                    setSubmitConfirmation={ setSubmitConfirmation }
                    onAttachQuotations={ ( e ) => onAttachQuotations( e, setQuotations ) }
                    setShowQuotationModal={ setShowQuotationModal }
                    onContentEdit={ onContentEdit }
                    onContentInput={ onContentInput }
                    loadRequests={ () => loadRequests( setRequests ) }
                    CancelRequisition={ ( e, pr_id ) => CancelRequisition( e, pr_id, history ) }
                    ApproveRequisition={ ( e, pr_id, requested_by, submitted_to ) => ApproveRequisition( e, pr_id, requested_by, submitted_to, history ) }
                    RejectRequisition={ ( e, pr_id, requested_by, Specifications ) => RejectRequisition( e, pr_id, requested_by, Specifications, history ) }
                />
            </Suspense>
            <ToastContainer />
        </>
    );

}

export default PurchaseRequisition;