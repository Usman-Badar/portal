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

            
        </div>
    )

}

export default LeaveRequests;