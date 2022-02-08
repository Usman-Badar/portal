import React from "react";

import './Requests.css';
import { Link } from 'react-router-dom';

const Requests = ( props ) => {

    let bgColor = '#0eb8de';
    let txt = props.data.status;

    if (props.data.status === 'Approved' || props.data.status === 'Delivered') {
        bgColor = '#307365';
        txt = "Approved By accounts";
    }
    if (props.data.status === 'Rejected') {
        bgColor = '#d19399';
        if ( props.data.forward_by === null )
        {
            txt = "Rejected by inventory";
        }
        else
        {
            txt = "Rejected by accounts";
        }
    }
    if (props.data.status === 'Waiting For Approval') {
        bgColor = '#fc9701';
        if ( props.EmpData.department_code !== 1 ) // DEPARTMENT IS NOT ACCOUNTS
        {
            txt = "Transferred to accounts";
        }else
        if ( props.EmpData.department_code === 1 ) // DEPARTMENT IS NOT ACCOUNTS
        {
            txt = "Received";
        }
    }
    if ( props.data.status === "Sent" )
    {
        if ( props.EmpData.department_code !== 1 ) // DEPARTMENT IS NOT ACCOUNTS
        {
            txt = "Received";
        }else
        if ( props.EmpData.department_code === 1 ) // DEPARTMENT IS NOT ACCOUNTS
        {
            txt = "Received at inventory";
        }
    }
    if ( props.data.status === "Viewed" )
    {
        if ( props.EmpData.department_code === 1 ) // DEPARTMENT IS NOT ACCOUNTS
        {
            txt = "Viewed at inventory";
        }
    }

    return (
        <div className="ViewPrRequests_div" key={ props.key }>
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center w-75">
                    <img src={'images/employees/' + props.data.emp_image} alt="" />
                    <div>
                        <p className="font-weight-bolder"> {props.data.name} </p>
                        <p> {props.data.designation_name + ' in ' + props.data.department_name + ' Department, ' + props.data.company_name} </p>
                    </div>
                </div>
                <div className="w-25">
                    <p className="font-weight-bolder">Total</p>
                    <p> Rs {props.data.total.toLocaleString('en-US')}</p>
                </div>
            </div>
            <div className="py-3">
                <div className="d-flex justify-content-between">
                    <div>
                        <p className="font-weight-bolder">Date</p>
                        <p>{props.date.toDateString()}</p>
                    </div>
                    <div>
                        <p className="font-weight-bolder">Status</p>
                        <p style={ { backgroundColor: bgColor, fontSize: '10px' } } className="text-white text-center rounded-pill px-2">{ txt }</p>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <i class="las la-map-marker-alt"></i>
                <div>
                    <p className="font-weight-bolder">{props.data.company_name}</p>
                    <p>{props.data.location_name}</p>
                </div>
            </div>
            <div className="ViewPrRequests_button" onClick={ () => props.ViewTheRequest( props.data.pr_id ) }>
                {/* <button className="btn">Decline</button> */}
                <Link className="btn" to={ "/purchaserequisition/view=purchase_requisition&&id=" + props.data.pr_id }>
                    View
                </Link>
            </div>
        </div>
    )

}

export default Requests;