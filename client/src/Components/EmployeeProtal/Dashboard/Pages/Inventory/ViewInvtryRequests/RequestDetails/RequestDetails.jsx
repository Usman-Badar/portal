import React, { lazy, Suspense, useEffect, useState } from 'react';

import './RequestDetails.css';
import Loading from '../../../../../../UI/Loading/Loading';
import Modal from '../../../../../../UI/Modal/Modal';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';

import Sent from '../../../../../../../images/sent.png';
import Waiting from '../../../../../../../images/waiting.png';
import Rejected from '../../../../../../../images/rejected.png';
import Approval from '../../../../../../../images/approved.png';
import Deliver from '../../../../../../../images/delivery.png';

const InvoiceBuilder = lazy( () => import('../InvoiceBuilder/InvoiceBuilder') );

const RequestDetails = (props) => {

    const [ StartLoading, setStartLoading ] = useState( true );
    const [ ModalShow, setModalShow ] = useState( false );
    const [ ModalContent, setModalContent ] = useState( false );

    const HideModelFunction = () => {

        if ( ModalShow )
        {
            setModalShow( false );
        }else
        {
            setModalShow( true );
        }

    }

    const ZoomAttachment = ( index ) => {

        setModalContent(
            <>
                <img src={ 'images/Inventory/pr_attachments/' + props.RequestDetails.quotations[index].image } width="100%" height="auto" alt="Attachment" />
            </>
        )

        setModalShow( true );

    }

    useEffect(
        () => {

            $('#viewMore').slideUp(0);

            setStartLoading( false ); // set loading to false

        }, []
    );

    return (
        <>
            <ToastContainer />
            <Suspense fallback={ <><Loading display={ StartLoading } /></> }>
                <div className="InvoPrev">

                    <div className="InvoPrevContainer">

                        <div className="Left">
                            {
                                props.EmployeeRequests.length === 0
                                ?
                                <><h6>No Request Found</h6></>
                                :
                                props.EmployeeRequests.map( // if available run map() function
                                    ( val, index ) => {

                                        const d = new Date( val.request_date );

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

                                        let bgColor = '#0eb8de';

                                        if ( val.status === 'Approved' || val.status === 'Delivered' )
                                        {
                                            bgColor = '#307365';
                                        }
                                        if ( val.status === 'Rejected' )
                                        {
                                            bgColor = '#d19399';
                                        }
                                        if ( val.status === 'Waiting For Approval' )
                                        {
                                            bgColor = '#fc9701';
                                        }

                                        return (
                                            <div className="Invorequests" key={index} style={{ animationDelay: (0 + '.' + index).toString() + 's' }}>
                                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                                    <p className="mb-0"> {d ? d.toString().substring(0, 15) + ' at ' + tConvert(val.request_time) : null} </p>
                                                    <p className="mb-0">Rs <b>{val.total === null ? 0 : val.total}</b></p>
                                                </div>

                                                <p className="mb-0 d-flex align-items-center justify-content-between">
                                                    <p className="mb-0 font-weight-bold">{val.name}</p>
                                                    <span className="imp" style={{ backgroundColor: bgColor }}>{val.status}</span>
                                                </p>

                                                <div className="mt-3 d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <p className="mb-0">{val.company_name}</p>
                                                        <p className="mb-0">{val.location_name}</p>
                                                    </div>
                                                    <div>
                                                        <button className="btn" onClick={() => props.OpenRequestDetails(val.pr_id)}>View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )

                                    }
                                )
                            }
                        </div>
                        <div className="Right">
                            {
                                props.RequestDetails.info.length > 0
                                ?
                                props.RequestDetails.info.map(
                                    ( val, index ) => {

                                        let sendDate = val.request_date === null ? '' : new Date(val.request_date);
                                        let viewDate = val.view_date === null ? '' : new Date(val.view_date);
                                        let ApprDate = val.approve_date === null ? '' : new Date(val.approve_date);
                                        let DiscardDate = val.discard_date === null ? '' : new Date(val.discard_date);
                                        let DeliveryDate = val.delivery_date === null ? '' : new Date(val.delivery_date);

                                        function tConvert(time) {
                                            // Check correct time format and split into components
                                            time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

                                            if (time.length > 1) { // If time format correct
                                                time = time.slice(1);  // Remove full string match value
                                                time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
                                                time[0] = +time[0] % 12 || 12; // Adjust hours
                                            }
                                            return time.join(''); // return adjusted time or original string
                                        }

                                        return (


                                            <div className="RequestDetails" key={ index }>
                                                <h5 className="mb-3">Request Details</h5>
                                                <div className='RequestDetailsInner'>
                                                    <div className='RequestDetailsInner_Left'>
                                                        <div className='inner'>
                                                            <h6>Request Summary</h6>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Company</p>
                                                                <p> { val.company_name } </p>
                                                            </div>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Delivery Location</p>
                                                                <p> { val.location_name } </p>
                                                            </div>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Requested By</p>
                                                                <p> { val.sender_name } </p>
                                                            </div>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Requested For</p>
                                                                <p> { val.emp_for_name === val.sender_name ? ( val.sender_gender === 'Male' ? 'Himself' : 'Herself') : val.emp_for_name } </p>
                                                            </div>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Submitted To</p>
                                                                <p> Inventory Department </p>
                                                            </div>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Handle By</p>
                                                                <p> { val.handle_emp_name === null ? 'Not Yet' : val.handle_emp_name } </p>
                                                            </div>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1"> { val.discard_emp_name === null ? 'Approved By' : 'Discard By' } </p>
                                                                {
                                                                    val.discard_emp_name === null
                                                                    ?
                                                                    <p> { val.approve_emp_name === null ? 'Not Yet' : val.approve_emp_name } </p>
                                                                    :
                                                                    <p> { val.discard_emp_name } </p>
                                                                }
                                                            </div>
                                                            <div id="viewMoreBtn" className="text-center viewMore" onClick={ () => { $('#viewMore').slideToggle(400); $('#viewMoreBtn').slideToggle(400) } }>
                                                                <p className="font-weight-bold mr-1 mb-0">View more</p>
                                                                <i className="las la-angle-down"></i>
                                                            </div>

                                                            <div id="viewMore">
                                                                <div className="d-flex align-content-center justify-content-between">
                                                                    <p className="font-weight-bold mr-1">Request Date</p>
                                                                    <p> { sendDate ? sendDate === '' ? 'Not Yet' : sendDate.toString().substring(0,15) + ' at ' + tConvert( val.request_time ) : null } </p>
                                                                </div>
                                                                <div className="d-flex align-content-center justify-content-between">
                                                                    <p className="font-weight-bold mr-1">View Date</p>
                                                                    <p> { viewDate ? viewDate === '' ? 'Not Yet' : viewDate.toString().substring(0,15) + ' at ' + tConvert( val.view_time ) : null } </p>
                                                                </div>
                                                                <div className="d-flex align-content-center justify-content-between">
                                                                    <p className="font-weight-bold mr-1"> { val.discard_emp_name === null ? 'Approval Date' : 'Discard Date' } </p>
                                                                    {
                                                                        val.discard_emp_name === null
                                                                        ?
                                                                        <p> { ApprDate ? ApprDate === '' ? 'Not Yet' : ApprDate.toString().substring(0,15) + ' at ' + tConvert( val.approve_time ) : null } </p>
                                                                        :
                                                                        <p> { DiscardDate ? DiscardDate === '' ? 'Not Yet' : DiscardDate.toString().substring(0,15) + ' at ' + tConvert( val.discard_time ) : null } </p>
                                                                    }
                                                                </div>
                                                                <div className="d-flex align-content-center justify-content-between">
                                                                    <p className="font-weight-bold mr-1">Delivery Date</p>
                                                                    <p> { DeliveryDate ? DeliveryDate === '' ? 'Not Yet' : DeliveryDate.toString().substring(0,15) + ' at ' + tConvert( val.delivery_time ) : null } </p>
                                                                </div>
                                                                <div id="viewLessBtn" className="text-center viewMore" onClick={ () => { $('#viewMore').slideToggle(400); $('#viewMoreBtn').slideToggle(400) } }>
                                                                    <p className="font-weight-bold mr-1 mb-0">View less</p>
                                                                    <i className="las la-angle-up"></i>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Total</p>
                                                                <p>Rs { val.total === null ? 0 : val.total.toLocaleString('en-US') }</p>
                                                            </div>
                                                            {
                                                                val.remarks !== null
                                                                ?
                                                                <>
                                                                    <hr />
                                                                    <div className="d-flex align-content-center justify-content-between">
                                                                        <p className="mb-0 font-weight-bold mr-4">
                                                                            Remarks
                                                                        </p>
                                                                        <p className="mb-0">
                                                                            { val.remarks }
                                                                        </p>
                                                                    </div>
                                                                </>
                                                                :
                                                                null
                                                            }
                                                            {
                                                                val.emp_remarks !== null
                                                                ?
                                                                <>
                                                                    <hr />
                                                                    <div className="d-flex align-content-center justify-content-between">
                                                                        <p className="mb-0 font-weight-bold mr-4">
                                                                            Employee Remarks
                                                                        </p>
                                                                        <p className="mb-0">
                                                                            { val.emp_remarks }
                                                                        </p>
                                                                    </div>
                                                                </>
                                                                :
                                                                null
                                                            }
                                                            {
                                                                JSON.parse( props.EmpData.access).includes(513) || JSON.parse(props.EmpData.access).includes(515)
                                                                ?
                                                                val.status === 'Waiting For Approval'
                                                                ?
                                                                <>
                                                                    <hr />
                                                                    <div className="d-flex align-content-center justify-content-end">
                                                                        <button
                                                                            className="btn btn-sm mr-2"
                                                                            style={{ backgroundColor: 'red', color: 'white', fontSize: '12px' }}
                                                                            onClick={() => props.onDiscard(props.RequestDetails.info[0].pr_id)}>
                                                                            Discard
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-sm"
                                                                            style={{ backgroundColor: '#0eb8de', color: 'white', fontSize: '12px' }}
                                                                            onClick={() => props.onApprove(props.RequestDetails.info[0].pr_id)}>
                                                                            Approve
                                                                        </button>
                                                                    </div>
                                                                </>
                                                                :
                                                                null
                                                                :
                                                                null
                                                            }
                                                        </div>
                                                        
                                                        <h5 className="my-3">Request Specifications</h5>
                                                        <div className="SpecificationsInner">
                                                            {
                                                                props.RequestDetails.specifications.map(
                                                                    ( val, index ) => {
                                                                        return (

                                                                            <div className="inner specifications" key={ index }>
                                                                                <h6 className="font-weight-bold">{ val.description }</h6>
                                                                                <p>
                                                                                    { val.reason }
                                                                                </p>
                                                                                <div className="d-flex align-content-center justify-content-between mt-3">
                                                                                    <div>
                                                                                        <p className="font-weight-bold">Price</p>
                                                                                        <p className="">
                                                                                            Rs { val.price.toLocaleString('en-US') }
                                                                                        </p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="font-weight-bold">Quantity</p>
                                                                                        <p className="">
                                                                                            { val.quantity }
                                                                                        </p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="font-weight-bold">Amount</p>
                                                                                        <p className="">
                                                                                            Rs { val.amount.toLocaleString('en-US') }
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        )
                                                                    }
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='RequestDetailsInner_Right'>
                                                        <div className="inner">
                                                            <h6>Request Status</h6>
                                                            <div className="status">
                                                                <div className="statusItem">
                                                                    <i className="mx-auto las la-check-circle"></i>
                                                                </div>
                                                                <div className="statusItem">
                                                                    <img src={ Sent } className="w-100" alt="SentImg" />
                                                                </div>
                                                                <div className="statusItem">
                                                                    <div>
                                                                        <h6 className="mb-0">Sent</h6>
                                                                        <p>
                                                                            Your request has been sent and received by the inventory department
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="Break">
                                                                <div>
                                                                    <div className="line"></div>
                                                                </div>
                                                            </div>
                                                            {
                                                                val.status === 'Rejected'
                                                                ?
                                                                <>
                                                                    <div className='status'>
                                                                        <div className="statusItem">
                                                                            <i className="mx-auto las la-check-circle"></i>
                                                                        </div>
                                                                        <div className="statusItem">
                                                                            <img src={ Rejected } className="w-75 mx-auto" alt="SentImg" />
                                                                        </div>
                                                                        <div className="statusItem">
                                                                            <div>
                                                                                <h6 className="mb-0">Rejected</h6>
                                                                                <p>
                                                                                    Your request has been rejected
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="Break">
                                                                        <div>
                                                                            <div className="line"></div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                :
                                                                null
                                                            }
                                                            <div className={ val.status !== 'Rejected' && val.status !== 'Sent' ? "status" : "status grayScale" }>
                                                                <div className="statusItem">
                                                                    <i className="mx-auto las la-check-circle"></i>
                                                                </div>
                                                                <div className="statusItem">
                                                                    <img src={ Waiting } className="w-75 mx-auto" alt="SentImg" />
                                                                </div>
                                                                <div className="statusItem">
                                                                    <div>
                                                                        <h6 className="mb-0">Waiting For Approval</h6>
                                                                        <p>
                                                                            Your request has been sent for approval in the accounts department
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="Break">
                                                                <div>
                                                                    <div className="line"></div>
                                                                </div>
                                                            </div>
                                                            <div className={ val.status === 'Approved' || val.status === 'Accepted' || val.status === 'Delivered' ? "status" : "status grayScale" }>
                                                                <div className="statusItem">
                                                                    <i className="mx-auto las la-check-circle"></i>
                                                                </div>
                                                                <div className="statusItem">
                                                                    <img src={ Approval } className="w-75 mx-auto" alt="SentImg" />
                                                                </div>
                                                                <div className="statusItem">
                                                                    <div>
                                                                        <h6 className="mb-0">Approved</h6>
                                                                        <p>
                                                                            Your request has been approved by the accounts department
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="Break">
                                                                <div>
                                                                    <div className="line"></div>
                                                                </div>
                                                            </div>
                                                            <div className={ val.status === 'Delivered' ? "status" : "status grayScale" }>
                                                                <div className="statusItem">
                                                                    <i className="mx-auto las la-check-circle"></i>
                                                                </div>
                                                                <div className="statusItem">
                                                                    <img src={ Deliver } className="w-75 mx-auto" alt="SentImg" />
                                                                </div>
                                                                <div className="statusItem">
                                                                    <div>
                                                                        <h6 className="mb-0">Delivered</h6>
                                                                        <p>
                                                                            Your request has been delivered by the inventory department
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Request Attachments */}
                                                        <h5 className="my-3">Request Attachments</h5>
                                                        <div className="inner">
                                                            <div className='RequestAttachments'>
                                                                {
                                                                    props.RequestDetails.quotations.length > 0
                                                                    ?
                                                                    props.RequestDetails.quotations.map(
                                                                        ( val, index ) => {

                                                                            return (
                                                                                <div className="Attachment" onClick={ () => ZoomAttachment( index ) } key={ index } style={ { backgroundImage: "url('images/Inventory/pr_attachments/" + val.image + "')" } }></div>
                                                                            )

                                                                        }
                                                                    )
                                                                    :
                                                                    <p>No Attachment</p>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        )
                                    }
                                )
                                :
                                null
                            }
                        </div>

                    </div>

                </div>
                {
                    props.RequestDetails.info.length > 0
                        ?
                        props.RequestDetails.info[0].status === 'Viewed' || props.RequestDetails.info[0].status === 'Sent'
                        ?
                            <div className="InvoContainer">
                                <InvoiceBuilder
                                    ShowAllRequests={ props.ShowAllRequests }
                                    RequestDetails={props.RequestDetails}
                                    EmpData={props.EmpData}
                                />
                            </div>
                        :
                        null
                    :
                    null
                }
                <Modal show={ModalShow} Hide={HideModelFunction} content={ModalContent} />
            </Suspense>
        </>
    )

}

export default RequestDetails;