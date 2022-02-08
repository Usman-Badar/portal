import React from 'react';

import './ViewInvtryRequestsUI.css';

// import UI Components
import Model from '../../../../../UI/Modal/Modal';

import InvoiceBuilder from '../../Forms/Components/InvoiceBuilder/InvoiceBuilder';
import { useSelector } from 'react-redux';

const ViewInvtryRequestsUI = ( props ) => {

    const AccessControls = useSelector( ( state ) => state.EmpAuth.EmployeeData );

    let override= null;
    let approve= null;
    let forward= null;
    let discard= null;
    if ( AccessControls.access  )
    {
        if ( JSON.parse(AccessControls.access).includes(514) )
        {
            if ( props.MasterData.RequestDetails[0] ? props.MasterData.RequestDetails[0].status !== 'Approved' && props.MasterData.RequestDetails[0].status !== 'Delivered' : null )
            {
                override = {
                    txt: 'Override',
                    func: () => props.onOverride( props.MasterData.RequestDetails[0].pr_id ),
                    bgColor: 'orange',
                    color: 'white'
                }
            }
        }
        if ( JSON.parse(AccessControls.access).includes(513) || JSON.parse(AccessControls.access).includes(515) )
        {
            if ( props.MasterData.RequestDetails[0] ? props.MasterData.RequestDetails[0].status === 'Waiting For Approval' : null )
            {
                approve = {
                    txt: 'Approve',
                    func: () => props.onApprove( props.MasterData.RequestDetails[0].pr_id ),
                    bgColor: 'default',
                    color: 'default',
                }
            }
        }
        if ( JSON.parse(AccessControls.access).includes(512) )
        {
            if ( props.MasterData.RequestDetails[0] ? props.MasterData.RequestDetails[0].status === 'Viewed' : null )
            {
                forward = {
                    txt: 'Forward',
                    func: () => props.onSendingForApproval( props.MasterData.RequestDetails[0].pr_id ),
                    bgColor: 'default',
                    color: 'default',
                }
                discard = {
                    txt: 'Discard',
                    func: () => props.onDiscard( props.MasterData.RequestDetails[0].pr_id ),
                    bgColor: 'red',
                    color: 'white'
                }
            }
        }
    }

    return (
        <>
            <Model show={ props.ModalShow } Hide={ props.ShowHideModal } content={ props.ModalContent } />
            <div className="Invtry_Application_Details">
                <div className="Invtry_Application_Details_Grid">
                    <div className="Details_Grid_Left">
                        <div className="DIV1 searchbarDiv">
                            <input type="text" value={props.EmpSearch.value} placeholder="Search Keywords" className="form-control Menusearch" onChange={props.searchcancle} />
                            {
                                !props.ShowX
                                    ?
                                    <i className="las la-search"></i>
                                    :
                                    <i className="las la-times" onClick={props.clickcross}></i>
                            }
                        </div>
                        <div className="invtry_requests">
                            {
                                props.Requests.length === 0
                                ?
                                <h3>No Request Received</h3>
                                :
                                props.Requests.map(
                                    ( val, index ) => {

                                        let content = <></>
                                        if ( val.pr_status )
                                        {

                                            if ( val.pr_status === 'Approved' )
                                            {
                                                content = 
                                                    <p className='mb-0 status statusa'>
                                                        { val.status }
                                                    </p>
                                            }else if ( val.pr_status === 'Rejected' )
                                            {
                                                content = 
                                                    <p className='mb-0 status statusr'>
                                                        { val.status }
                                                    </p>

                                            }else if ( val.pr_status === 'Waiting For Approval' )
                                            {
                                                content = 
                                                    <p className='mb-0 status statusp'>
                                                        { val.status }
                                                    </p>

                                            }else if ( val.pr_status === 'Viewed' )
                                            {
                                                content = 
                                                    <p className='mb-0 status statusv'>
                                                        { val.status }
                                                    </p>

                                            }else if ( val.pr_status === 'Delivered' )
                                            {
                                                content = 
                                                    <p className='mb-0 status statusa'>
                                                        { val.status }
                                                    </p>

                                            }else
                                            {
                                                content = 
                                                    <p className='mb-0 status statusp'>
                                                        Pending
                                                    </p>

                                            }
                                        }

                                        return (
                                            <>
                                                <div key={ index } className="requests" style={{ animationDelay: (0 + '.' + index).toString() + 's' }}>
                                                    <div onClick={ () => props.onClickListner( 'shortDetails' + index ) }>

                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div></div>
                                                            {
                                                                content
                                                            }
                                                        </div>
                                                        <div className="d-flex align-items-center mt-1">
                                                            <img src={ 'images/employees/' + val.emp_image } className="rounded-circle" alt='Employee Img' width='40' height='40' />
                                                            <div className="pl-1">
                                                                <p className='mb-0'>
                                                                    <b>{val.name}</b>
                                                                </p>
                                                                <p className='mb-0'>
                                                                    { val.designation_name + ' in ' + val.company_name + ', ' + val.location_name }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={"text-justify mt-1 shortDetails shortDetails" + index}>
                                                        <div className="d-flex align-items-center">
                                                            <div className="w-100">
                                                                <p className="text-left mb-0 font-weight-bold">Request Date</p>
                                                                <p className="text-left mb-0">{ val.request_date ? val.request_date.substring(0,10) : null }</p>
                                                            </div>
                                                            <div className="w-100">
                                                                <p className="text-left mb-0 font-weight-bold">View Date</p>
                                                                <p className="text-left mb-0">{ val.view_date === null ? 'Not Viewed' : val.view_date ? val.view_date.substring(0,10) : null }</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <div className="w-100">
                                                                <p className="text-left mb-0 font-weight-bold">Approve Date</p>
                                                                <p className="text-left mb-0">{ val.approve_date === null ? 'Not Approved' : val.approve_date ? val.approve_date.substring(0,10) : null }</p>
                                                            </div>
                                                            <div className="w-100">
                                                                <p className="text-left mb-0 font-weight-bold">Forward Date</p>
                                                                <p className="text-left mb-0">{ val.forward_date === null ? 'Not Forward' : val.forward_date ? val.forward_date.substring(0,10) : null }</p>
                                                            </div>
                                                        </div>
                                                        <button className="btn d-block ml-auto shadow-sm bg-white btn-sm rounded-0" onClick={ () => props.OnShowDetails( val.request_for, index ) }>View Details</button>
                                                    </div>
                                                </div>
                                            </>
                                        )

                                    }
                                )
                            }
                        </div>
                    </div>
                    {
                        props.MasterData.RequestDetails.length === 0
                        ?
                        <div></div>
                        :
                        props.MasterData.RequestDetails.map(
                            ( val, index ) => {
                                
                                return (
                                    <div className="Details_Grid_Right" key={ index }>
                                        <div className="Grid_Right1" style={ { animationDelay: ( 0 + '.' + index ).toString() + 's' } }>
                                            <div className="Leave_Emp_Info">
                                                <div className="d-flex align-items-center pb-2">
                                                    <div>
                                                        <img src={ 'images/employees/' + val.emp_image } alt="DP" />
                                                    </div>
                                                    <div className="ml-3 py-2">
                                                        <p className="font-weight-bolder mb-0">{ val.name }</p>
                                                        <p className="mb-0">{ val.designation_name + ' at ' + val.company_name + ', ' + val.location_name }</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between py-2" style={{ fontSize: "13px" }}>
                                                    <p className="mb-0">Employee Code</p>
                                                    <p className="font-weight-bolder mb-0">{ val.emp_id }</p>
                                                </div>
                                                <div className="d-flex justify-content-between py-2" style={{ fontSize: "13px" }}>
                                                    <p className="mb-0">Email</p>
                                                    <p className="font-weight-bolder mb-0">{ val.email }</p>
                                                </div>
                                                <div className="d-flex justify-content-between py-2" style={{ fontSize: "13px" }}>
                                                    <p className="mb-0">Phone Number</p>
                                                    <p className="font-weight-bolder mb-0">{ val.cell }</p>
                                                </div>
                                            </div>
                                            <div className="Emp_Leave_Details">
                                                {
                                                    props.MasterData.PrevRequests.length === 0
                                                    ?
                                                    null
                                                    :
                                                    props.MasterData.PrevRequests.map(
                                                        ( val, index ) => {

                                                            return (
                                                                <>
                                                                    <div key={ index } className="history" onClick={ () => props.getPrevRequestDetails( val.pr_id ) }>
                                                                        <div>
                                                                            <p>PR</p>
                                                                            <p> { val.pr_id } </p>
                                                                        </div>
                                                                        <div>
                                                                            <p>Company</p>
                                                                            <p> { val.company_name } </p>
                                                                        </div>
                                                                        <div>
                                                                            <p>Location</p>
                                                                            <p> { val.location_name } </p>
                                                                        </div>
                                                                        <div>
                                                                            <p>Request Date</p>
                                                                            <p> { val.request_date ? val.request_date.substring(0,10) : null } </p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )

                                                        }
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="Grid_Right2">
                                            <div className="Right2_TopBox mb-3">
                                                {
                                                    props.LeaveTook.length === 0
                                                    ?
                                                    null
                                                    :
                                                    props.LeaveTook.map(
                                                        ( value, index )=> {

                                                            return (
                                                                <div style={ { animationDelay: ( 0 + '.' + index ).toString() + 's' } } key={ index } className={ "TopBox_Leave TopBox_Leave" + index }><div><p>{ value.maxLeave + '/' + value.val }</p><p>{ value.leaveType }</p></div></div>
                                                            )

                                                        }
                                                    )
                                                }
                                            </div>
                                            <div className="Right2_BottomBox" style={ { animationDelay: ( 0 + '.' + index ).toString() + 's' } }>
                                                <div className="attachments">
                                                    {
                                                        props.MasterData.Attachments.length > 0
                                                        ?
                                                        <div onClick={ props.ViewAttachments }>
                                                            <label className="attachmentBtns">View Attachments</label>
                                                        </div>
                                                        :
                                                        null
                                                    }
                                                    <div>
                                                        <label for="upload-photo" className="attachmentBtns">Attach</label>
                                                        <input type="file" onChange={ props.onAttach } name="attachments" className="d-none" id="upload-photo" multiple />
                                                    </div>
                                                </div>
                                                <InvoiceBuilder
                                                    EmpData={ [] }
                                                    Locations={ props.Locations }
                                                    changeLocation={ () => alert('clicked') }
                                                    title="REQUEST DETAILS"
                                                    ShowTotal={ true }
                                                    MasterData={ props.MasterData }

                                                    onChnageHandler={props.onChnageHandler}
                                                    onDelete={props.onDelete}
                                                    OnEdit={props.OnEdit}
                                                    AddItem={props.AddItem}
                                                    Items={props.Items}
                                                    Amount={props.Amount}
                                                    Item={props.Item}
                                                    EditMode={props.EditMode}
                                                    Total={props.Total}
                                                    Btns={
                                                        [
                                                            override,
                                                            approve,
                                                            discard,
                                                            forward
                                                        ]
                                                    }

                                                    ShowAttachments={ props.ShowAttachments }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )

                            }
                        )
                    }
                </div>
            </div>
        </>
    )

}

export default ViewInvtryRequestsUI;