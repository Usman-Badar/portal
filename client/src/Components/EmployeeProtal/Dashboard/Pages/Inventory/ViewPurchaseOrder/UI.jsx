import React, { useEffect, useState } from 'react';

// IMPORT CSS
import './UI.css';

// IMPORT page-flip JS LIBRARY TO SHOW A UNIQUE UI FOR PR/PO AND THEIR VOUCHERS AND QUOTATIONS
// import { PageFlip } from 'page-flip';

import bgImg from '../../../../../../images/Capture.png';
import $ from 'jquery';

// IMPORT PURCHASE ORDER EMPLOYEES COMPONENT WHICH SHOWS THE LIST OF THOSE EMPLOYEES WHOSE REQUESTED PO
import Poemployees from './Components/POEmployees/POEmployees';
import Porequests from './Components/PORequests/PORequests';

import PO from './Components/PO_PrintUI/PO_PrintUI';
import PR from './Components/PR_printUI/PR_printUI';
import Docs from './Components/Docs/Docs';
import Vouchers from './Components/Vouchers/Vouchers';

import Modal from '../../../../../UI/Modal/Modal';

const UI = ( props ) => {

    const [ Display, setDisplay ] = useState('PR');

    // TOGGLE MODAL
    const [ Show, setShow ] = useState( false ); // BY DEFAULT THE MODAL IS HIDE
    // MODAL CONTENT (HTML)
    const [ Content, setContent ] = useState(<></>);

    useEffect(
        () => { 
            

        }, []
    )

    const OpenView = ( view ) => {

        setDisplay( view );

    }

    // TO TOGGLE MODAL STATE
    const ModalToggle = () => {

        setShow( !Show );

    }

    // WHEN USER WANT TO APPROVE THE CURRENT REQUEST
    const Approve = ( id ) => {

        if (
            props.Vouchers.length === 0 // AT LEAST ONE VOUCHER IS REQUIRED
        )
        {
            alert('Please upload at least one voucher');
        }
        else
        {
            // DESIGN HTML
            let content = 
            <>
                <p>Do you want to approve this request?</p>
                <form onSubmit={ ( e ) => props.ApproveRequest( id, e ) }>
                    <textarea 
                        className="mb-3 form-control"
                        style={
                            {
                                minHeight: '100px'
                            }
                        }
                        name="remarks"
                        placeholder="Your Remarks"
                        minLength='20'
                        required
                     />
                    <button 
                        className='btn btn-sm d-block ml-auto btn-success'
                        type="submit"
                    >Yes</button>
                </form>
            </>
    
            // SET CONTENT TO STATE MODAL CONTENT
            setContent( content );
            ModalToggle();
        }

    }

    // WHEN USER WANT TO DISCARD THE CURRENT REQUEST
    const Discard = ( id ) => {

        // DESIGN HTML
        let content = 
        <>
            <p>Do you want to discard this request?</p>
            <form onSubmit={ ( e ) => props.DiscardRequest( id, e ) }>
                <textarea 
                    className="mb-3 form-control"
                    style={
                        {
                            minHeight: '100px'
                        }
                    }
                    name="remarks"
                    placeholder="Give Reason..."
                    minLength='20'
                    required
                 />
                <button 
                    className='btn btn-sm d-block ml-auto btn-danger'
                    type="submit"
                >Yes</button>
            </form>
        </>

        // SET CONTENT TO STATE MODAL CONTENT
        setContent( content );
        ModalToggle();

    }

    // IT WILL OPEN AN OPTION DIALOG BOX FOR PRINTING THE DOCUMENTS
    const openPrintOptions = () => {

        $(".RequestDetails .printContainer .options").toggleClass('showOptions');

    }

    const nothing = () => {}

    return (
        <div className="ViewPurchaseOrder">

            {/* LEFT SIDE */}
            <div className="Left">

                {/* REQUESTS CONTAINER */}
                <div className="RequestContainer">

                    {
                        props.EmpPurchaseOrders.length > 0
                        ?
                        props.EmpPurchaseOrders.map(
                            ( val, index ) => {

                                const d = new Date( val.request_date );
                                let status = '';

                                function tConvert(time) 
                                {
                                    // Check correct time format and split into components
                                    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

                                    if (time.length > 1) { // If time format correct
                                        time = time.slice(1);  // Remove full string match value
                                        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
                                        time[0] = +time[0] % 12 || 12; // Adjust hours
                                    }
                                    return time.join(''); // return adjusted time or original string

                                }

                                if ( val.status === 'Approved' || val.status === 'Delivered' )
                                {
                                    status = 'approved';
                                }else
                                if ( val.status === 'Rejected' )
                                {
                                    status = 'rejected';
                                }else
                                if ( val.status === 'Waiting For Approval' )
                                {
                                    status = 'waiting';
                                }else
                                {
                                    status = 'sent';
                                }

                                return (
                                    <>
                                        <Porequests
                                            index={ index }
                                            details={ val }
                                            tConvert={ tConvert }
                                            status={ status }
                                            d={ d }
                                            OpenDetails={ props.OpenDetails }
                                         />
                                    </>
                                )

                            }
                        )
                        :
                        props.PurchaseOrders.length === 0
                        ?
                        <>
                            <h4> No Purchase Order Found </h4>
                        </>
                        :
                        props.PurchaseOrders.map(
                            ( val, index ) => {

                                const d = new Date( val.request_date );
                                let status = '';

                                function tConvert(time) 
                                {
                                    // Check correct time format and split into components
                                    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

                                    if (time.length > 1) { // If time format correct
                                        time = time.slice(1);  // Remove full string match value
                                        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
                                        time[0] = +time[0] % 12 || 12; // Adjust hours
                                    }
                                    return time.join(''); // return adjusted time or original string

                                }

                                if ( val.po_status === 'Approved' || val.po_status === 'Delivered' )
                                {
                                    status = 'approved';
                                }else
                                if ( val.po_status === 'Rejected' )
                                {
                                    status = 'rejected';
                                }else
                                if ( val.po_status === 'Waiting For Approval' )
                                {
                                    status = 'waiting';
                                }else
                                {
                                    status = 'sent';
                                }

                                return (
                                    <>
                                        {/* REQUEST */}
                                        <Poemployees
                                            status={ status }
                                            index={ index }
                                            emp={ val }
                                            tConvert={ tConvert }
                                            d={ d }
                                            OpenEmployeeDetails={ props.OpenEmployeeDetails }
                                         />
                                    </>
                                )

                            }
                        )
                    }


                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="Right">

                {/* REQUEST DETAILS */}
                {
                    props.PurchaseOrder.PO.info.length > 0
                    ?
                    <div className="RequestDetails">

                        <div className="view">

                            {
                                Display === 'PR'
                                ?
                                <>
                                    {
                                        props.PurchaseOrder.PR.info.length > 0
                                        ?
                                        <PR details={ props.PurchaseOrder.PR } />
                                        :
                                        <h1 className="text-center">No Purchase Requisition</h1>
                                    }
                                </>
                                :
                                Display === 'PO'
                                ?
                                <PO details={ props.PurchaseOrder.PO } />
                                :
                                Display === 'Bills'
                                ?
                                <div className="DocsContainer">
                                    {
                                        props.PurchaseOrder.bills.map(
                                            ( val, index ) => {

                                                return (
                                                    <Docs
                                                        index ={ index }
                                                        bgImg={ 'images/Inventory/po_attachments/' + val.image }
                                                    />
                                                )

                                            }
                                        )
                                    }
                                </div>
                                :
                                Display === 'Quotations'
                                ?
                                <div className="DocsContainer">
                                    {
                                        props.PurchaseOrder.quotations.map(
                                            ( val, index ) => {

                                                return (
                                                    <Docs
                                                        index ={ index }
                                                        bgImg={ 'images/Inventory/pr_attachments/' + val.image }
                                                    />
                                                )

                                            }
                                        )
                                    }
                                </div>
                                :
                                Display === 'Vouchers'
                                ?
                                <>
                                    {
                                        props.PurchaseOrder.PO.info[0].status === 'Approved'
                                        ||
                                        props.PurchaseOrder.PO.info[0].status === 'Delivered'
                                        ||
                                        props.PurchaseOrder.PO.info[0].status === 'Rejected'
                                        ?
                                        <div className="DocsContainer">
                                                {
                                                    props.PurchaseOrder.vouchers.map(
                                                        ( val, index ) => {

                                                            return (
                                                                <Vouchers
                                                                    index ={ index }
                                                                    bgImg={ 'images/Inventory/po_vouchers/' + val.voucher }
                                                                    clicked={ nothing }
                                                                />
                                                            )

                                                        }
                                                    )
                                                }
                                        </div>
                                        :
                                        <div className="DocsContainer">
                                            {/* TO UPLOAD NEW VOUCHERS AND OTHER SUPPORTING DOCUMENTS */}
                                            <label for="upload-photo" className="mb-0 UploadVouchers Docs" title="Upload New Vouchers">
                                                <i className="las la-plus"></i>
                                            </label>
                                            <input type="file" onChange={ props.AttachVouchers } name="attachments" className="d-none" id="upload-photo" multiple accept="image/*" />
                                                {
                                                    props.Vouchers.map(
                                                        ( val, index ) => {

                                                            return (
                                                                <Vouchers
                                                                    index ={ index }
                                                                    bgImg={ URL.createObjectURL( val.file ) }
                                                                    clicked={ props.RemoveVoucher }
                                                                />
                                                            )

                                                        }
                                                    )
                                                }
                                        </div>
                                    }
                                </>
                                :
                                null
                            }
                        </div>

                        {/* IFRAMES */}
                        <iframe title="po" id="po" src={ 'https://' + window.location.host + '/#/view=purchase_order/' + props.PurchaseOrder.PO.info[0].po_id + '/' + ( props.PurchaseOrder.PR.info.length > 0 ? props.PurchaseOrder.PR.info[0].pr_id : 0 ) }></iframe>
                        <iframe title="pr" id="pr" src={ 'https://' + window.location.host + '/#/view=purchase_requisition/' + props.PurchaseOrder.PR.info.length > 0 ? props.PurchaseOrder.PR.info[0].pr_id : 0 }></iframe>
                        <iframe title="bills" id="bill" src={ 'https://' + window.location.host + '/#/view=bills/' + props.PurchaseOrder.PO.info[0].po_id }></iframe>
                        <iframe title="vouchers" id="voucher" src={ 'https://' + window.location.host + '/#/view=vouchers/' + props.PurchaseOrder.PO.info[0].po_id }></iframe>
                        <iframe title="quotations" id="quotation" src={ 'https://' + window.location.host + '/#/view=quotations/' + props.PurchaseOrder.PR.info.length > 0 ? props.PurchaseOrder.PR.info[0].pr_id : 0 }></iframe>

                        <div className="d-flex justify-content-center">
                            <div className="Docs btn-group text-center mt-3">
                                <button className="btn btn-dark btn-sm" onClick={ () => OpenView('PR') }>Purchase Requisition</button>
                                <button className="btn btn-dark btn-sm" onClick={ () => OpenView('PO') }>Purchase Order</button>
                                <button className="btn btn-dark btn-sm" onClick={ () => OpenView('Bills') }>Bills</button>
                                <button className="btn btn-dark btn-sm" onClick={ () => OpenView('Quotations') }>Quotations</button>
                                <button className="btn btn-dark btn-sm" onClick={ () => OpenView('Vouchers') }>Vouchers</button>
                            </div>
                        </div>


                        {/* BUTTONS */}
                        <div className="d-flex align-items-center justify-content-end mt-3">
                            {
                                JSON.parse(props.Data.access).includes(1) || JSON.parse(props.Data.access).includes(520)
                                ?
                                <>
                                    {
                                        props.PurchaseOrder.PO.info[0].status === 'Delivered'
                                        ||
                                        props.PurchaseOrder.PO.info[0].status === 'Approved'
                                        ||
                                        props.PurchaseOrder.PO.info[0].status === 'Rejected'
                                        ?
                                        null
                                        :
                                        <>
                                            <button className="btn btn-dark mr-2" onClick={ () => Approve( props.PurchaseOrder.PO.info[0].po_id ) }>Approve</button>
                                            <button className="btn btn-danger" onClick={ () => Discard( props.PurchaseOrder.PO.info[0].po_id ) }>Discard</button>
                                        </>
                                    }
                                </>
                                :
                                null
                            }
                            {/* PRINT THE DOCUMENTS AND BY CLICKING THIS BUTTON A POPUP WILL OPEN TO GIVE THE SUER SOME OPTIONS */}
                            <div className="printContainer">
                                {/* OPTION DIALOG BOX */}
                                <div className="options">
                                    {
                                        props.PurchaseOrder.PR.info.length > 0
                                        ?
                                        <div className="d-flex align-items-center justify-content-between">
                                            <p className='mb-0'>Purchase Requisition</p>
                                            <input className="printCheckboxes" type='checkbox' name="pr" onChange={ props.onChangeHandler } />
                                        </div>
                                        :
                                        null
                                    }
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className='mb-0'>Purchase Order</p>
                                        <input className="printCheckboxes" type='checkbox' name="po" onChange={ props.onChangeHandler } />
                                    </div>
                                    {
                                        props.PurchaseOrder.quotations.length > 0
                                        ?
                                        <div className="d-flex align-items-center justify-content-between">
                                            <p className='mb-0'>Quotations</p>
                                            <input className="printCheckboxes" type='checkbox' name="quotation" onChange={ props.onChangeHandler } />
                                        </div>
                                        :
                                        null
                                    }
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className='mb-0'>Bills</p>
                                        <input className="printCheckboxes" type='checkbox' name="bill" onChange={ props.onChangeHandler } />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className='mb-0'>Vouchers</p>
                                        <input className="printCheckboxes" type='checkbox' name="voucher" onChange={ props.onChangeHandler } />
                                    </div>
                                    <hr />
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className='mb-0'>Check All</p>
                                        <input type='checkbox' name="checkall" onChange={ props.onChangeHandler } />
                                    </div>
                                    <button onClick={ props.Print } className="btn btn-sm btn-block btn-outline-dark mt-2">Print</button>
                                </div>

                                <button className="btn btn-info ml-2" onClick={ openPrintOptions }><i className="las la-ellipsis-h"></i></button>
                            </div>
                            <Modal show={ Show } Hide={ ModalToggle } content={ Content } />
                        </div>

                    </div>                
                    :
                    null
                }

            </div>

        </div>
    );
}

export default UI;
