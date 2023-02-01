import React, { useEffect, useState } from 'react';
import './Style.css';

import { Route, Switch } from 'react-router-dom';
import Modal from '../../../../../UI/Modal/Modal';

const UI = ( { ApproveRequisition, AttachedQuotations, Specifications, RequestDetails, history, Requests, RejectRequisition, CancelRequisition, SubmitConfirmation, ShowQuotationModal, Quotations, Locations, Companies, SubmitPR, loadRequests, openRequestDetails, PRSubmittion, setSubmitConfirmation, onAttachQuotations, onContentInput, setShowQuotationModal } ) => {
    
    return (
        <>
            <div className="purchase_requisition">
                <Modal show={ ShowQuotationModal } Hide={ () => setShowQuotationModal(!ShowQuotationModal) } content={ <ModalContent setShowQuotationModal={ setShowQuotationModal } Quotations={ Quotations } onAttachQuotations={ onAttachQuotations } /> } />
                <div className="purchase_requisition_form">
                    <Modal show={ SubmitConfirmation } Hide={ () => setSubmitConfirmation(!SubmitConfirmation) } content={ <SubmitConfirmationModal PRSubmittion={ PRSubmittion } /> } />

                    <Switch>
                        <Route exact path="/purchase/requisition/form" render={ 
                            () => (
                                <PRForm 
                                    Locations={ Locations }
                                    Companies={ Companies }
                                    Quotations={ Quotations }
                                    history={ history }
                                    
                                    SubmitPR={ SubmitPR }
                                    onContentInput={ onContentInput }
                                    setShowQuotationModal={ setShowQuotationModal }
                                />
                            )
                        } />
                        <Route exact path="/purchase/requisition/requests" render={ 
                            () => (
                                <PRequests 
                                    Requests={ Requests }
                                    history={ history }

                                    loadRequests={ loadRequests }
                                />
                            )
                        } />
                        <Route exact path="/purchase/requisition/details" render={ 
                            () => (
                                <RequestDetailsView 
                                    RequestDetails={ RequestDetails }
                                    Specifications={ Specifications }
                                    Quotations={ AttachedQuotations }
                                    history={ history }

                                    openRequestDetails={ openRequestDetails }
                                    CancelRequisition={ CancelRequisition }
                                    RejectRequisition={ RejectRequisition }
                                    ApproveRequisition={ ApproveRequisition }
                                />
                            )
                        } />
                    </Switch>
                </div>
            </div>
        </>
    );

}

export default UI;

const PRForm = ( { history, Locations, Quotations, Companies, SubmitPR, setShowQuotationModal, onContentInput } ) => {

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <h3 className="heading">
                    Purchase Requisition
                    <sub>Application Form</sub>
                </h3>

                <button className="btn submit" type='reset' onClick={ () => history.replace('/purchase/requisition/requests') }>Back To Requests</button>
            </div>
            <hr />

            <form onSubmit={ SubmitPR }>   
                <fieldset>
                    <div className="flex_container mb-3">

                        <div>
                            <label className="mb-0"><b>Company Name</b></label>
                            <select className="form-control" name="company_code" required>
                                <option value=''>Select the option</option>
                                {
                                    Companies.map(
                                        val => {

                                            return <option key={ val.company_code } value={ val.company_code }> { val.company_name } </option>

                                        }
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label className="mb-0"><b>Delivery / Work Location</b></label>
                            <select className="form-control" name="location_code" required>
                                <option value=''>Select the option</option>
                                {
                                    Locations.map(
                                        val => {

                                            return <option key={ val.location_code } value={ val.location_code }> { val.location_name } </option>

                                        }
                                    )
                                }
                            </select>
                        </div>

                    </div>

                    <div className="grid_container mb-3 px-5">

                        <div className='grid_container align-items-center'>
                            <span>New Purchase</span>
                            <input type="checkbox" value="New Purchase" name="new_purchase" className='ml-2' />
                        </div>
                        <div className='grid_container align-items-center'>
                            <span>Repair / Replacement</span>
                            <input type="checkbox" value="Repair / Replacement" name="repair_replacement" className='ml-2' />
                        </div>
                        <div className='grid_container align-items-center'>
                            <span>Budgeted</span>
                            <input type="checkbox" value="Budgeted" name="budgeted" className='ml-2' />
                        </div>
                        <div className='grid_container align-items-center'>
                            <span>Not Budgeted</span>
                            <input type="checkbox" value="Not Budgeted" name="not_budgeted" className='ml-2' />
                        </div>
                        <div className='grid_container align-items-center'>
                            <span>Invoice Attached</span>
                            <input type="checkbox" value="Invoice Attached" name="invoice_attached" className='ml-2' />
                        </div>

                    </div>

                    <label className="mb-0"><b>Reason For Repair / Replacement / New Purchase</b></label>
                    <textarea className="form-control" name="reason" required minLength={20} />

                    <br />

                    <label className="mb-1"><b>Purchase / Repair / Replacement Specifications</b></label>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Sr.No.</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Estimated Cost</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody id="specifications_table_body">
                            <tr id="specification_row_1">
                                <td id="specification_serial_number_1"></td>
                                <td id="specification_description_1" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_quantity_1" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_est_cost_1" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_total_cost_1"></td>
                            </tr>
                            <tr id="specification_row_2">
                                <td id="specification_serial_number_2"></td>
                                <td id="specification_description_2" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_quantity_2" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_est_cost_2" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_total_cost_2"></td>
                            </tr>
                            <tr id="specification_row_3">
                                <td id="specification_serial_number_3"></td>
                                <td id="specification_description_3" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_quantity_3" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_est_cost_3" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_total_cost_3"></td>
                            </tr>
                            <tr id="specification_row_4">
                                <td id="specification_serial_number_4"></td>
                                <td id="specification_description_4" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_quantity_4" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_est_cost_4" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_total_cost_4"></td>
                            </tr>
                            <tr id="specification_row_5">
                                <td id="specification_serial_number_5"></td>
                                <td id="specification_description_5" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_quantity_5" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_est_cost_5" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_total_cost_5"></td>
                            </tr>
                            <tr id="specification_row_6">
                                <td id="specification_serial_number_6"></td>
                                <td id="specification_description_6" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_quantity_6" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_est_cost_6" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_total_cost_6"></td>
                            </tr>
                            <tr id="specification_row_7">
                                <td id="specification_serial_number_7"></td>
                                <td id="specification_description_7" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_quantity_7" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_est_cost_7" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_total_cost_7"></td>
                            </tr>
                            <tr id="specification_row_8">
                                <td id="specification_serial_number_8"></td>
                                <td id="specification_description_8" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_quantity_8" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_est_cost_8" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_total_cost_8"></td>
                            </tr>
                            <tr id="specification_row_9">
                                <td id="specification_serial_number_9"></td>
                                <td id="specification_description_9" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_quantity_9" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_est_cost_9" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_total_cost_9"></td>
                            </tr>
                            <tr id="specification_row_10">
                                <td id="specification_serial_number_10"></td>
                                <td id="specification_description_10" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_quantity_10" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_est_cost_10" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_total_cost_10"></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr id="specification_total_row">
                                <td></td>
                                <td id="total_calculated_amount_label"><b>Total</b></td>
                                <td></td>
                                <td></td>
                                <td id="total_calculated_amount"></td>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="d-flex align-items-center justify-content-between">
                        
                        <button className="btn green" type='button' onClick={ () => setShowQuotationModal(true) }>Attached Quotations ({ Quotations.length })</button>
                        <button className="btn submit" type='submit'>Generate Purchase Requisition</button>

                    </div>
                </fieldset>
            </form>
        </>
    )

}

const RequestDetailsView = ( { ApproveRequisition, history, Quotations, Specifications, RequestDetails, CancelRequisition, RejectRequisition, openRequestDetails } ) => {

    const [ View, setView ] = useState("application");

    useEffect(
        () => {

            const pr_id = window.location.href.split('?').pop().split('=').pop();
            openRequestDetails( pr_id )

        }, []
    )

    return (
        <>
            {
                RequestDetails
                ?
                parseInt(RequestDetails.requested_by) === parseInt(sessionStorage.getItem("EmpID")) ||
                parseInt(RequestDetails.request_submitted_on_behalf) === parseInt(sessionStorage.getItem("EmpID")) ||
                parseInt(RequestDetails.appr_rejct_by) === parseInt(sessionStorage.getItem("EmpID"))
                ?
                <Detailing ApproveRequisition={ ApproveRequisition } pr_id={ window.location.href.split('?').pop().split('=').pop() } RejectRequisition={ RejectRequisition } CancelRequisition={ CancelRequisition } history={ history } Quotations={ Quotations } setView={ setView } View={ View } RequestDetails={ RequestDetails } Specifications={ Specifications } />
                :
                <>
                    <h6 className="text-center">Access Denied</h6>
                    <p className="text-center mb-0">
                        You don't have access to view the purchase requisition details (id#{RequestDetails.pr_id}).
                    </p>
                </>
                :
                <h6 className="text-center">Loading Details....</h6>
            }
        </>
    )

}

const Detailing = ( { pr_id, CancelRequisition, ApproveRequisition, RejectRequisition, history, Quotations, View, setView, RequestDetails, Specifications } ) => {

    const [ CancelConfirm, setCancelConfirm ] = useState(false);
    const [ RejectConfirm, setRejectConfirm ] = useState(false);
    const [ ApprovalConfirm, setApprovalConfirm ] = useState(false);

    return (
        <>
            <div className="purchase_requisition_details">
                <Modal show={ CancelConfirm } Hide={ () => setCancelConfirm(false) } content={ <CancelConfirmation pr_id={ pr_id } CancelRequisition={ CancelRequisition } /> } />
                <Modal show={ ApprovalConfirm } Hide={ () => setApprovalConfirm(false) } content={ <ApprovalConfirmation submitted_to={ RequestDetails.submitted_to } requested_by={ RequestDetails.requested_by } pr_id={ pr_id } ApproveRequisition={ ApproveRequisition } /> } />
                <Modal show={ RejectConfirm } Hide={ () => setRejectConfirm(false) } content={ <RejectConfirmation RequestDetails={ RequestDetails } Specifications={ Specifications } pr_id={ pr_id } RejectRequisition={ RejectRequisition } /> } />

                <div className="d-flex align-items-end justify-content-between">
                    <h4 className="heading">
                        Purchase Requisition
                        <sub>Request Details</sub>
                    </h4>
                    <div className='btn-group'>
                        <button className="btn green" onClick={ () => history.replace('/purchase/requisition/requests') }>Back To Requests</button>
                        <button className={ View === 'application' ? "btn submit" : "btn green" } onClick={ () => setView('application') }>Application</button>
                        <button className={ View === 'request_status' ? "btn submit" : "btn green" } onClick={ () => setView('request_status') }>Request Status</button>
                    </div>
                </div>
                <hr />

                <div className='ml-auto mb-2' style={ { width: 'fit-content' } }>
                    <div className="btn-group">
                        {
                            RequestDetails.requested_by != sessionStorage.getItem('EmpID') &&
                            RequestDetails.appr_rejct_by == sessionStorage.getItem('EmpID') &&
                            RequestDetails.status === 'waiting_for_approval'
                            ?
                            <>
                                <button className="btn cancle" onClick={ () => setRejectConfirm(true) }>Reject</button>
                                <button className="btn submit" onClick={ () => setApprovalConfirm(true) }>Approve</button>
                            </>
                            :null
                        }

                        {
                            RequestDetails.requested_by == sessionStorage.getItem('EmpID') &&
                            ( RequestDetails.status === 'sent' || RequestDetails.status === 'viewed' )
                            ?
                            <>
                                <button className="btn cancle" onClick={ () => setCancelConfirm(true) }>Cancel</button>
                            </>
                            :null
                        }
                    </div>
                </div>

                {
                    View === 'application'
                    ?
                    <form className='popUps'>   
                        <fieldset disabled>
                            <div className="flex_container mb-3">

                                <div>
                                    <label className="mb-0"><b>Company Name</b></label>
                                    <input value={ RequestDetails.company_name } className="form-control" />
                                </div>
                                <div>
                                    <label className="mb-0"><b>Delivery / Work Location</b></label>
                                    <input value={ RequestDetails.location_name } className="form-control" />
                                </div>

                            </div>

                            <div className="grid_container mb-3 px-5">

                                <div className='grid_container align-items-center'>
                                    <span>New Purchase</span>
                                    <input checked={ RequestDetails.new_purchase === 1 ? true : false } type="checkbox" className='ml-2' />
                                </div>
                                <div className='grid_container align-items-center'>
                                    <span>Repair / Replacement</span>
                                    <input checked={ RequestDetails.repair_replacement === 1 ? true : false } type="checkbox" className='ml-2' />
                                </div>
                                <div className='grid_container align-items-center'>
                                    <span>Budgeted</span>
                                    <input checked={ RequestDetails.budgeted === 1 ? true : false } type="checkbox" className='ml-2' />
                                </div>
                                <div className='grid_container align-items-center'>
                                    <span>Not Budgeted</span>
                                    <input checked={ RequestDetails.not_budgeted === 1 ? true : false } type="checkbox" className='ml-2' />
                                </div>
                                <div className='grid_container align-items-center'>
                                    <span>Invoice Attached</span>
                                    <input checked={ RequestDetails.invoice_attached === 1 ? true : false } type="checkbox" className='ml-2' />
                                </div>

                            </div>

                            <label className="mb-0"><b>Reason For Repair / Replacement / New Purchase</b></label>
                            <textarea className="form-control" value={ RequestDetails.reason } />

                            <br />

                            <label className="mb-1"><b>Purchase / Repair / Replacement Specifications</b></label>

                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Sr.No.</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Estimated Cost</th>
                                        <th>Total Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Specifications.map(
                                            ( val, index ) => {
                                                return (
                                                    <tr key={ index }>
                                                        <td> { index + 1 } </td>
                                                        <td> { val.description } </td>
                                                        <td> { val.quantity } </td>
                                                        <td> Rs { val.estimated_cost.toLocaleString('en') } </td>
                                                        <td> Rs { val.total_estimated_cost.toLocaleString('en') } </td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td><b>Total</b></td>
                                        <td></td>
                                        <td></td>
                                        <td> Rs { RequestDetails.total_value.toLocaleString('en') } </td>
                                    </tr>
                                </tfoot>
                            </table>

                            <label className="mb-0"><b>Additional Notes</b></label>
                            <textarea className="form-control" value={ RequestDetails.note } />
                            {/* <div className="d-flex align-items-center justify-content-between">

                                <button className="btn green" type='reset' onClick={ () => history.replace('/purchase/requisition/requests') }>Back To Requests</button>
                                <button className="btn submit" type='submit'>Generate Purchase Requisition</button>

                            </div> */}
                        </fieldset>
                    </form>
                    :
                    <div className='purchase_requisition_details_2' id="accordion">
                        <h6 className='collapse_toogle' data-toggle="collapse" data-target="#general_details" aria-expanded="false" aria-controls="general_details">General Detail</h6>
                        <div className="collapse show" id="general_details" data-parent="#accordion">
                            <table className="table table-bordered popUps">
                                <tbody>
                                    <tr>
                                        <th>Requisition</th>
                                        <td> 
                                            { new Date(RequestDetails.requested_date).toDateString() } <br />
                                            { RequestDetails.requested_time }
                                        </td>
                                        <th>Request Status</th>
                                        <td> <span className={ RequestDetails.status + " text-white status_div" }>{ RequestDetails.status }</span> </td>
                                        <th>Employee Name (On Behalf Of)</th>
                                        <td> { RequestDetails.behalf_employee_name ? RequestDetails.behalf_employee_name : "Requested By The Employee Itself" } </td>
                                    </tr>
                                    <tr>
                                        <th>Submit To (Employee)</th>
                                        <td> 
                                            { RequestDetails.submit_to_employee_name }
                                        </td>
                                        <th>Vision</th>
                                        <td> 
                                            {
                                                RequestDetails.view_date
                                                ?
                                                <>
                                                    { new Date(RequestDetails.view_date).toDateString() } <br />
                                                    { RequestDetails.view_time }
                                                </>
                                                :
                                                <span className={ RequestDetails.status + " text-white status_div" }>Not Viewed</span>
                                            }
                                        </td>
                                        <th>No of Items Requested</th>
                                        <td> { RequestDetails.no_items_requested } </td>
                                    </tr>
                                    <tr>
                                        {
                                            RequestDetails.remarks != null
                                            ?
                                            <>
                                                <th>
                                                    { RequestDetails.status === 'canceled' ? "Reason To Cancel" : "Inventory's Remarks" }
                                                </th>
                                                <td colSpan={5}>
                                                    { RequestDetails.remarks }
                                                </td>
                                            </>
                                            :null
                                        }
                                    </tr>
                                    <tr>
                                    {
                                            RequestDetails.hod_employee_name != null
                                            ?
                                            RequestDetails.status === 'rejected'
                                            ?
                                            <>
                                                <th>Rejected By</th>
                                                <td>{ RequestDetails.hod_employee_name }</td>
                                                <th>Rejection</th>
                                                <td>{ new Date(RequestDetails.act_date).toDateString() } at { RequestDetails.act_time }</td>
                                            </>
                                            :
                                            <>
                                                <th>{ RequestDetails.status === 'canceled' ? "Canceled By" : "Proceed To" }</th>
                                                <td>{ RequestDetails.hod_employee_name }</td>

                                                {
                                                    RequestDetails.status === 'approved'
                                                    ?
                                                    <>
                                                        <th>Approval</th>
                                                        <td>{ new Date(RequestDetails.act_date).toDateString() } at { RequestDetails.act_time }</td>
                                                        <th>H.O.D's Remarks</th>
                                                        <td>{ RequestDetails.remarks_from_hod }</td>
                                                    </>
                                                    :null
                                                }
                                            </>
                                            :null
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div className='collapse_toogle d-flex justify-content-between' data-toggle="collapse" data-target="#attached_quotations" aria-expanded="false" aria-controls="attached_quotations">
                            <h6 className='mb-0'>Quotations Attached</h6>
                            <h6 className='mb-0'>({Quotations.length})</h6>
                        </div>
                        <div className="collapse" id="attached_quotations" data-parent="#accordion">
                            {
                                Quotations.length === 0
                                ?
                                <h6 className="text-center">No Quotation Attached</h6>
                                :
                                <div className="grid_container">
                                        
                                    {
                                        Quotations.map(
                                            (val, index) => {

                                                return (
                                                    <div className='quotation_card'>
                                                        <img src={ process.env.REACT_APP_SERVER + '/' + val.quotation } alt="quotation_preview" key={ index } />
                                                    </div>
                                                )
                                            }
                                        )
                                    }

                                </div>
                            }
                        </div>
                    </div>
                }

            </div>
        </>
    )

}

const ApprovalConfirmation = ( { pr_id, ApproveRequisition, submitted_to, requested_by } ) => {

    return (
        <>
            <form className='pt-1' onSubmit={ (e) => ApproveRequisition( e, pr_id, requested_by, submitted_to ) }>
                <fieldset>
                    <h6 className='font-weight-bold'>Confirm Approval</h6>
                    <hr />
                    <div className="alert alert-success d-none" id="error_alert_approval"></div>
                    <textarea placeholder='Add Your Remarks...' name="reason" cols="30" rows="5" className='form-control' required minLength={30} />
                    <button className='btn d-block ml-auto submit mt-3'>Confirm</button>
                </fieldset>
            </form>
        </>
    )

}

const CancelConfirmation = ( { pr_id, CancelRequisition } ) => {

    return (
        <>
            <form className='pt-1' onSubmit={ (e) => CancelRequisition( e, pr_id ) }>
                <fieldset>
                    <h6 className='font-weight-bold'>Confirm Cancellation</h6>
                    <hr />
                    <div className="alert alert-warning d-none" id="error_alert_cancelation"></div>
                    <textarea placeholder='Any Specific Reason...' name="reason" cols="30" rows="5" className='form-control' required minLength={30} />
                    <button className='btn d-block ml-auto submit mt-3'>Confirm</button>
                </fieldset>
            </form>
        </>
    )

}

const RejectConfirmation = ( { RequestDetails, Specifications, pr_id, RejectRequisition } ) => {

    return (
        <>
            <form className='pt-1' onSubmit={ (e) => RejectRequisition( e, pr_id, RequestDetails.requested_by, Specifications ) }>
                <fieldset>
                    <h6 className='font-weight-bold'>Confirm Rejection</h6>
                    <hr />
                    <div className="alert alert-warning d-none" id="error_alert_rejection"></div>
                    <textarea placeholder='Any Specific Reason...' name="reason" cols="30" rows="5" className='form-control' required minLength={30} />
                    <button className='btn d-block ml-auto submit mt-3'>Confirm</button>
                </fieldset>
            </form>
        </>
    )

}

const PRequests = ( { history, Requests, loadRequests } ) => {

    useEffect(
        () => {

            loadRequests()

        }, []
    )

    return (
        <>
            <div className="purchase_requests">
                <div className="d-flex align-items-end justify-content-between">
                    <h3 className="heading">
                        Purchase Requisition
                        <sub>Previous Requests</sub>
                    </h3>
                    <button className='btn submit' onClick={ () => history.replace('/purchase/requisition/form') }>New</button>
                </div>
                <hr />

                {
                    Requests
                    ?
                    Requests.length === 0
                    ?
                    <h6 className="text-center">No Request Found</h6>
                    :
                    <table className="table table-hover popUps">
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Company</th>
                                <th>Location</th>
                                <th>Items</th>
                                <th>Requisition</th>
                                <th>Status</th>
                                <th>Total Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Requests.map(
                                    ( val, index ) => {
                                        return (
                                            <tr key={ index } title="Double Click To Enter" onDoubleClick={ () => history.push('/purchase/requisition/details?pr_id=' + val.pr_id) }>
                                                <td>{ index + 1 }</td>
                                                <td>{ val.company_name }</td>
                                                <td>{ val.location_name }</td>
                                                <td>{ val.no_items_requested > 1 ? (val.no_items_requested + " Items") : (val.no_items_requested + " Item") }</td>
                                                <td>
                                                    { new Date( val.requested_date ).toDateString() } <br />
                                                    { val.requested_time }
                                                </td>
                                                <td>
                                                    <span className={ "status_div text-white " + val.status }>
                                                        {
                                                            val.status === 'waiting_for_approval' && parseInt(val.appr_rejct_by) === parseInt(sessionStorage.getItem("EmpID"))
                                                            ?
                                                            "Pending"
                                                            :
                                                            val.status.replace('_', " ")
                                                        }
                                                    </span>
                                                </td>
                                                    <td>Rs { val.total_value.toLocaleString('en') }</td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                    :
                    <h6 className="text-center">Please Wait....</h6>
                }
            </div>
        </>
    )

}

const SubmitConfirmationModal = ( { PRSubmittion } ) => {

    return (
        <>
            <form onSubmit={ PRSubmittion }>
                <h5>Confirmation</h5>
                <hr />
                <fieldset>
                    <label className="mb-0"><b>Any Additional Notes</b></label>
                    <textarea className="form-control" name="notes" required />
                    <button className='btn green d-block mx-auto mt-3'>Confirm & Submit</button>
                </fieldset>
            </form>
        </>
    )

}

const ModalContent = ( { Quotations, setShowQuotationModal, onAttachQuotations } ) => {

    return (
        <>
            <div className='modal_content'>

                <div className="d-flex justify-content-between align-items-center">
                    <h4 className='mb-0'>Quotations</h4>
                    <input type="file" className='quotations_file' onChange={ onAttachQuotations } multiple accept="image/*" />
                </div>
                <hr />

                {
                    Quotations.length === 0
                    ?
                    <h6 className="text-center">No Quotation Attached</h6>
                    :
                    <>
                        <div className="quotations_grid_container">

                            {
                                Quotations.map(
                                    ( val, index ) => {
                                        return (
                                            <div>
                                                <img src={ URL.createObjectURL(val.file) } alt="attached_quotation" key={ index } />
                                                <span> { val.name } </span>
                                            </div>
                                        )
                                    }
                                )
                            }

                        </div>
                    </>
                }

                <button className="btn submit d-block mx-auto mt-3" onClick={ () => setShowQuotationModal(false) }>Close</button>

            </div>
        </>
    )

}