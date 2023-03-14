import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loadPRList, addRow, SubTotalCostCalculation, TotalCostCalculation, ApproveRequisition, RejectRequisition, CancelRequisition, openRequestDetails, loadRequests, GetLocations, POSubmittion, SubmitPO, onAttachBills, GetCompanies, onContentInput, searchVendor, addAdditionalRow, onFooterContentInput, loadSubOrdinands } from './Functions';
const UI = lazy( () => import('./UI') );

function PurchaseOrder() {

    const history = useHistory();

    const [ ShowBillModal, setShowBillModal ] = useState(false);
    const [ SubmitConfirmation, setSubmitConfirmation ] = useState(false);
    const [ Bills, setBills ] = useState([]);
    const [ AttachedBills, setAttachedBills ] = useState([]);
    const [ Companies, setCompanies ] = useState([]);
    const [ Locations, setLocations ] = useState([]);
    const [ Specifications, setSpecifications ] = useState([]);
    const [ Data, setData ] = useState();
    const [ PRAttachment, setPRAttachment ] = useState();
    const [ Vendors, setVendors ] = useState();
    const [ Vendor, setVendor ] = useState();
    const [ Requests, setRequests ] = useState();
    const [ PRList, setPRList ] = useState();
    const [ PR, setPR ] = useState();
    const [ PRSPec, setPRSPec ] = useState([]);
    const [ RequestDetails, setRequestDetails ] = useState();
    const [ AdditionalRows, setAdditionalRows ] = useState();
    const [ SubOrdinands, setSubOrdinands ] = useState();

    const [ PRequestDetails, setPRequestDetails ] = useState();
    const [ PRSpecifications, setPRSpecifications ] = useState([]);

    useEffect(
        () => {

            GetCompanies( setCompanies );
            GetLocations( setLocations );

        }, []
    )

    useEffect(
        () => {

            if ( PRAttachment && !PRList )
            {
                loadPRList( setPRList, setPRSPec );
            }

        }, [ PRAttachment ]
    )
    
    return (
        <>
            <Suspense fallback={ <div>Please Wait...</div> }>
                <UI 
                    Companies={ Companies }
                    Locations={ Locations }
                    Bills={ Bills }
                    ShowBillModal={ ShowBillModal }
                    SubmitConfirmation={ SubmitConfirmation }
                    Requests={ Requests }
                    history={ history }
                    RequestDetails={ RequestDetails }
                    Specifications={ Specifications }
                    AttachedBills={ AttachedBills }
                    Vendors={ Vendors }
                    PRAttachment={ PRAttachment }
                    PRList={ PRList }
                    PRSPec={ PRSPec }
                    PR={ PR }
                    AdditionalRows={ AdditionalRows }
                    PRequestDetails={ PRequestDetails }
                    PRSpecifications={ PRSpecifications }
                    SubOrdinands={ SubOrdinands }
                    Data={ Data }
                    Vendor={ Vendor }

                    SubTotalCostCalculation={ SubTotalCostCalculation }
                    TotalCostCalculation={ TotalCostCalculation }
                    loadSubOrdinands={ () => loadSubOrdinands( setSubOrdinands ) }
                    onFooterContentInput={ onFooterContentInput }
                    addAdditionalRow={ addAdditionalRow }
                    attachPR={ ( pr_id ) => { setPR( pr_id ); setPRAttachment(false) } }
                    setPRAttachment={ setPRAttachment }
                    selectVendor={ ( vendor_id, name ) => { document.getElementById('vendor_id').value = name; setVendor( vendor_id ); setVendors(); } }
                    searchVendor={ ( e ) => searchVendor( e, setVendors, setVendor ) }
                    addRow={ addRow }
                    openRequestDetails={ ( po_id ) => openRequestDetails( po_id, setRequestDetails, setSpecifications, setAttachedBills, setAdditionalRows, setPRequestDetails, setPRSpecifications ) }
                    POSubmittion={ ( e ) => POSubmittion( e, history, Bills, Data, PR, Vendor, Specifications ) }
                    SubmitPO={ ( e ) => SubmitPO( e, setData, setSubmitConfirmation, setSpecifications ) }
                    setSubmitConfirmation={ setSubmitConfirmation }
                    onAttachBills={ ( e ) => onAttachBills( e, setBills ) }
                    setShowBillModal={ setShowBillModal }
                    onContentInput={ onContentInput }
                    loadRequests={ () => loadRequests( setRequests ) }
                    CancelRequisition={ ( e, po_id ) => CancelRequisition( e, po_id, history ) }
                    ApproveRequisition={ ( e, po_id, requested_by ) => ApproveRequisition( e, po_id, requested_by, history ) }
                    RejectRequisition={ ( e, po_id, requested_by, Specifications ) => RejectRequisition( e, po_id, requested_by, Specifications, history ) }
                />
            </Suspense>
            <ToastContainer />
        </>
    );

}

export default PurchaseOrder;