import React, { useEffect, useState } from 'react';
import './LeaveRequests.css';

import axios from '../../../axios';
import $ from 'jquery';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LeaveRequests = () => {

    const history= useHistory();
    const Relations = useSelector( ( state ) => state.EmpAuth.Relations );

    const [ Leaves, setLeaves ] = useState([]);
    const [ RequestType, setRequestType ] = useState('');
    const [ NextAction, setNextAction ] = useState('');
    const [ DatailedView, setDatailedView ] = useState(false);
    const [ Request, setRequest ] = useState(
        {
            info: {},
            requests: [],
            emp: {}
        }
    );
    const [ SubmitTo, setSubmitTo ] = useState(0);

    useEffect(
        () => {

            if ( localStorage.getItem('leaveRequestType') )
            {
                setRequestType(localStorage.getItem('leaveRequestType'));
                $('.typeBtns').removeClass('btn-secondary').addClass('btn-outline-secondary');
                $('.typeBtns#' + localStorage.getItem('leaveRequestType')).removeClass('btn-outline-secondary').addClass('btn-secondary');
            }else
            {
                localStorage.setItem('leaveRequestType', 'Leaves');
            }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    )

    useEffect(
        () => {

            setLeaves( [] );
            if ( RequestType === 'Leaves' )
            {
                GetAllLeaveRequests();
            }else
            {
                GetAllShortLeaveRequests();
            }

        }, [ RequestType ]
    )

    useEffect(
        () => {

            let id = parseInt( window.location.href.split('/').pop() );

            if ( !isNaN( id ) )
            {
                setDatailedView( true );
                GetRequestDetails( id );
            }else
            {
                setDatailedView( false );
            }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [ window.location.href.split('/').pop() ]
    )

    const GetRequestDetails = ( id ) => {

        let type;
        if ( localStorage.getItem('leaveRequestType') )
        {

            if ( localStorage.getItem('leaveRequestType') === 'Leaves' )
            {
                type = 'Leave';
            }else
            {
                type = 'ShortLeave';
            }

        }
        axios.post(
            '/getleaverequestdetail',
            {
                leave_id: id,
                type: type
            }
        ).then(
            res => {

                setRequest(
                    {
                        info: res.data[0][0],
                        requests: res.data[1],
                        emp: res.data[2][0]
                    }
                )

            }
        ).catch(
            err => {

                console.log( err );

            }
        )

    }

    const GetAllLeaveRequests = () => {

        axios.post(
            '/getallleavesrequests',
            {
                emp_id: sessionStorage.getItem('EmpID')
            }
        ).then(
            res => {

                setLeaves( res.data );

            }
        ).catch(
            err => {

                console.log( err );

            }
        )

    }

    const GetAllShortLeaveRequests= () => {

        axios.post(
            '/getallshortleavesrequests',
            {
                emp_id: sessionStorage.getItem('EmpID')
            }
        ).then(
            res => {

                setLeaves( res.data );

            }
        ).catch(
            err => {

                console.log( err );

            }
        )

    }

    const ChangeRequestType = ( type ) => {

        setRequestType( type );
        $('.typeBtns').removeClass('btn-secondary').addClass('btn-outline-secondary');
        $('.typeBtns#' + type).removeClass('btn-outline-secondary').addClass('btn-secondary');

    }

    const PerformNextAction = () => {

        let id = parseInt( window.location.href.split('/').pop() );
        axios.post(
            '/performactiononleave',
            {
                request_from: sessionStorage.getItem('EmpID'),
                request_to: SubmitTo,
                leave_id: id,
                action: NextAction,
                date_time: new Date().toString()
            }
        ).then(
            () => {

                GetRequestDetails( id );

            }
        ).catch(
            err => {

                console.log( err );

            }
        )

    }

    return (
        <div className="LeaveRequests">

            <div className="header">

                <div>
                    <h4>Leave Requests</h4>
                    <small> Requests Found : { Leaves.length } </small>
                </div>

                <div>

                    <div className="btn-group">
                        <button onClick={ () => ChangeRequestType('Leaves') } id="Leaves" className="btn typeBtns btn-sm btn-secondary"> Leave </button>
                        <button onClick={ () => ChangeRequestType('ShortLeaves') } id="ShortLeaves" className="btn typeBtns btn-sm btn-outline-secondary"> Short Leave </button>
                    </div>

                    {
                        DatailedView && Request.requests.length > 0
                        ?
                        <>
                            <div className="btn-group ml-3">
                                <select className="form-control form-control-sm" style={ { display: 'unset' } } onChange={ ( e ) => { setNextAction( e.target.value ); setSubmitTo( 0 ) } }>
                                    <option value="">Select</option>
                                    {
                                        [Request.requests[0]].map(
                                            ( val ) => {

                                                let options = [];
                                                if ( parseInt( val.request_by ) === parseInt( sessionStorage.getItem('EmpID') ) )
                                                {
                                                    options.push(<option value="cancel">Cancel</option>);
                                                }

                                                if ( parseInt( val.request_to ) === parseInt( sessionStorage.getItem('EmpID') ) )
                                                {
                                                    if ( val.request_status === 'sent' )
                                                    {
                                                        options.push(<option value="approve">Approve</option>);
                                                        options.push(<option value="approve_&_forward">Approve and forward</option>);
                                                        options.push(<option value="reject">Reject</option>);
                                                        options.push(<option value="reject_&_forward">Reject and forward</option>);
                                                    }
                                                }

                                                return options;

                                            }
                                        )
                                    }
                                </select>
                                {
                                    NextAction === "approve_&_forward" || NextAction === "reject_&_forward"
                                    ?
                                    <select className="form-control form-control-sm" value={ SubmitTo } style={ { display: 'unset' } } onChange={ ( e ) => setSubmitTo( parseInt( e.target.value ) ) }>
                                        <option value={ 0 }>Select</option>
                                        {
                                            Relations.map(
                                                ( val, index ) => {

                                                    return (
                                                        <option value={ val.sr } key={ index }> { val.name } </option>
                                                    )

                                                }
                                            )
                                        }
                                    </select>
                                    :
                                    null
                                }
                                {
                                    NextAction === ''
                                    ?
                                    null
                                    :
                                    SubmitTo === 0 && ( NextAction === "approve_&_forward" || NextAction === "reject_&_forward" )
                                    ?
                                    null
                                    :
                                    <button onClick={ PerformNextAction } id="ShortLeaves" className="btn btn-sm btn-info"> Done </button>
                                }
                            </div>
                            
                            <button onClick={ () => ChangeRequestType('ShortLeaves') } id="ShortLeaves" className="btn ml-3 btn-sm btn-dark"> Close </button>
                        </>
                        :
                        null
                    }

                </div>

            </div>

            {
                DatailedView
                ?
                <div className='RecordContainer'>

                    <div>
                        <table className="table table-sm table-hover">

                            <thead>
                                <tr>

                                    <th> Requested By </th>
                                    <th> Request Date </th>

                                </tr>
                            </thead>

                            <tbody className='text-secondary'>
                                {
                                    Leaves.map(
                                        ( val, index ) => {

                                            const d = new Date( val.request_date );

                                            return (
                                                <tr key={ index } onClick={ () => { history.replace('/leave/requests/' + val.leave_id) } }>

                                                    <td>
                                                        { val.sender_name }
                                                    </td>
                                                    <td>
                                                        { d ? d.toDateString() : null }
                                                    </td>

                                                </tr>
                                            )

                                        }
                                    )
                                }
                            </tbody>

                        </table>
                    </div>
                    
                    {
                        Request.requests.length > 0
                        ?
                        <div className='border LeaveInfo'>

                            <div className='EmployeeInfo shadow-sm p-3 rounded'>

                                <img src={ 'images/employees/' + Request.emp.emp_image } alt="emp" width='100%' />

                                <div>
                                    <h5> Employee Details </h5>
                                    <br />
                                    <div className="info">

                                        <div>
                                            <b>Name:</b>
                                        </div>
                                        <div>
                                            <span> { Request.emp.name } </span>
                                        </div>

                                        <div>
                                            <b>Designation:</b>
                                        </div>
                                        <div>
                                            <span> { Request.emp.designation_name } </span>
                                        </div>

                                        <div>
                                            <b>Department:</b>
                                        </div>
                                        <div>
                                            <span> { Request.emp.department_name } </span>
                                        </div>

                                        <div>
                                            <b>Company:</b>
                                        </div>
                                        <div>
                                            <span> { Request.emp.company_name } </span>
                                        </div>

                                    </div>
                                </div>
                                
                            </div>

                            <div className="requestInfo shadow-sm p-3 rounded mt-3">

                                <h5> Request Details </h5>
                                <br />
                                <div className="info w-100">

                                    <div>
                                        <b>Request Type:</b>
                                    </div>
                                    <div>
                                        <span> { Request.info.leave_type } </span>
                                    </div>

                                    <div>
                                        <b>Availed:</b>
                                    </div>
                                    <div>
                                        <span> { Request.info.availed === 1 ? "Y" : "N" } </span>
                                    </div>

                                    {
                                        Request.info.one_day_leave === 0
                                        ?
                                        <>
                                            <div>
                                                <b>Leave From:</b>
                                            </div>
                                            <div>
                                                <span> { new Date( Request.info.leave_from ).toDateString() } </span>
                                            </div>
                                            <div>
                                                <b>Leave To:</b>
                                            </div>
                                            <div>
                                                <span> { new Date( Request.info.leave_to ).toDateString() } </span>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div>
                                                <b>Leave Date:</b>
                                            </div>
                                            <div>
                                                <span> { new Date( Request.info.leave_from ).toDateString() } </span>
                                            </div>
                                        </>
                                    }

                                    <div>
                                        <b>Total Days:</b>
                                    </div>
                                    <div>
                                        <span> { Request.info.days } </span>
                                    </div>

                                    <div>
                                        <b>Leave Purpose:</b>
                                    </div>
                                    <div>
                                        <span> { Request.info.leave_purpose } </span>
                                    </div>

                                </div>

                            </div>

                            <div className="reviews shadow-sm p-3 rounded mt-3">

                                <h5>Reviews / Comments</h5>
                                <br />
                                
                                {
                                    Request.requests.map(
                                        ( val, index ) => {

                                            let className = 'border-bottom pb-2 info info2 mb-3';
                                            let remarks = val.remarks;
                                            let receiver = val.receiver_name.split(' ');
                                            let classN;
                                            let update_date = new Date( val.update_date );
                                            let request_date = new Date( val.request_date );
                                            
                                            if ( Request.requests.length === ( index + 1 ) )
                                            {
                                                className = 'border-bottom pb-2 info info2';
                                            }

                                            if ( val.remarks === null )
                                            {
                                                remarks = 'No Remarks';
                                            }

                                            if ( val.request_status === 'sent' )
                                            {
                                                classN = 'bg-secondary text-white px-3 py-0 rounded-pill';
                                            }else
                                            if ( val.request_status === 'approved' )
                                            {
                                                classN = 'bg-success text-white px-3 py-0 rounded-pill';
                                            }else
                                            if ( val.request_status === 'rejected' )
                                            {
                                                classN = 'bg-danger text-white px-3 py-0 rounded-pill';
                                            }

                                            receiver.pop();

                                            return (
                                                <div className={ className } key={ index }>
                                                    <div>
                                                        <b>From:</b>
                                                    </div>
                                                    <div className="d-flex justify-content-between w-100">
                                                        <span> { val.sender_name } </span>
                                                        <span> { request_date ? request_date.toDateString() : null } at { val.request_time } </span>
                                                    </div>
                                                    <div>
                                                        <b>To:</b>
                                                    </div>
                                                    <div className="d-flex justify-content-between w-100">
                                                        <span> { val.receiver_name } </span>
                                                        <span className={ classN }> { val.request_status } </span>
                                                    </div>
                                                    <div>
                                                        <b> { receiver.join(' ') } Remarks:</b>
                                                    </div>
                                                    <div>
                                                        <span> { remarks } </span>
                                                    </div>

                                                    {
                                                        val.remarks === null
                                                        ?
                                                        <>
                                                        <div>
                                                            <b> Review Date: </b>
                                                        </div>
                                                        <div>
                                                            <span> { update_date ? update_date.toDateString() : null } </span>
                                                        </div>
                                                        </>
                                                        :
                                                        null
                                                    }
                                                </div>
                                            )

                                        }
                                    )
                                }

                            </div>

                        </div>
                        :
                        <h3 className="text-center">Processing...</h3>
                    }

                </div>
                :
                null
            }

            {
                !DatailedView
                ?
                Leaves.length === 0
                ?
                <h5 className="text-center"> No Request Found </h5>
                :

                <table className="table table-sm table-hover">

                    <thead>
                        <tr>

                            <th>
                                Requested By
                            </th>
                            <th>
                                Requested To
                            </th>
                            <th>
                                Request Date
                            </th>
                            <th>
                                Status
                            </th>

                        </tr>
                    </thead>

                    <tbody className='text-secondary'>
                        {
                            Leaves.map(
                                ( val, index ) => {

                                    const d = new Date( val.request_date );
                                    let classN;
                                    if ( val.request_status === 'sent' )
                                    {
                                        classN = 'bg-secondary text-white px-3 rounded';
                                    }else
                                    if ( val.request_status === 'approved' )
                                    {
                                        classN = 'bg-success text-white px-3 rounded';
                                    }else
                                    if ( val.request_status === 'rejected' )
                                    {
                                        classN = 'bg-danger text-white px-3 rounded';
                                    }

                                    return (
                                        <tr key={ index } onClick={ () => { history.replace('/leave/requests/' + val.leave_id) } }>

                                            <td>
                                                { val.sender_name }
                                            </td>
                                            <td>
                                                { val.receiver_name }
                                            </td>
                                            <td>
                                                { d ? d.toDateString() : null }
                                            </td>
                                            <td>
                                                <span className={ classN }>{ val.request_status }</span>
                                            </td>

                                        </tr>
                                    )

                                }
                            )
                        }
                    </tbody>

                </table>
                :
                null
            }

        </div>
    )

}

export default LeaveRequests;