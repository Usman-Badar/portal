import React from 'react';

// import css
import './ViewInvtryRequestsUI.css';

// import Request Details Component
import RequestDetails from './RequestDetails/RequestDetails';

const ViewInvtryRequestsUI = (props) => {

    return (
        <>
            <div className="ViewPRRequests">
                {/* left Side */}
                <div className="Left">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4>Purchase Requests</h4>
                        <i onClick={ () => window.location.reload() } className="las la-redo-alt"></i>
                    </div>
                    {/* Purchase Requests */}
                    {/* props.RequestDetails.info.map(
                            ( val, index ) => {

                                return (
                                    <></>
                                )

                            }
                        ) */}
                    {
                        props.EmployeeRequests.length > 0
                        ?
                        <RequestDetails
                            EmployeeRequests={ props.EmployeeRequests }
                            RequestDetails={ props.RequestDetails }
                            EmpData={ props.EmpData } 
                            OpenRequestDetails={ props.OpenRequestDetails }
                            ShowAllRequests={ props.ShowAllRequests }

                            // functions
                            // When user dwants to discard the request
                            onDiscard={ props.onDiscard }
                            // when user wants to approve the request
                            onApprove={ props.onApprove }
                         />
                        :
                        props.Requests.length === 0
                        ?
                        <h5>No Request Yet</h5>
                        :
                        props.Requests.map(
                            ( val, index ) => {

                                let d = new Date(val.request_date);
                                const isToday = (someDate) => {
                                    const today = new Date()
                                    return someDate.getDate() === today.getDate() &&
                                        someDate.getMonth() === today.getMonth() &&
                                        someDate.getFullYear() === today.getFullYear()
                                }

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
                                    <div className="Request" key={ index }>
                                        {/* Request Status */}
                                        {/* { isToday(d ? d : null) ? <div className="status" style={{ backgroundColor: '#000', color: '#fff' }}>New</div> : null } */}
                                        {/* Employee Info */}
                                        <div className="empInfo">
                                            <img className="rounded-circle" src={'images/employees/' + val.emp_image} width="35" height="35" alt="empImg" />
                                            <div className="ml-2">
                                                <p className="mb-0 font-weight-bold">{ val.name }</p>
                                                <p className="mb-0">{ val.designation_name } at { val.company_name }, { val.location_name }</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <button className="btn bg-white" disabled>{ d ? d.toString().substring(0,15) + ' at ' + tConvert( val.request_time ) : null }</button>
                                            <button className="btn" onClick={ () => props.ViewThatEmpRequests( val.emp_id ) }>View Requests</button>
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