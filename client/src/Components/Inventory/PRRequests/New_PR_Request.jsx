import React from 'react';
import { useHistory } from 'react-router-dom';
import './New_PR_Request.css';

const New_PR_Request = () => {

    const history = useHistory();

    const RequestDetails = ( index ) => {

        history.replace('/invtry_pr_requests/invtry_pr_request_details/' + index);

    }

    return (
        <>
            <div className="New_PR_Request">
                <div className="New_PR_Request_Box">
                    <div className="New_PR_Request_Details">
                        <h3 className="mb-4"> PR Requests </h3>
                        <div className="one" onClick={ () => RequestDetails(1) }>
                            <div className="d-flex">
                                <div className="d-flex justify-content-center align-items-center">
                                    <img src={ 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThLP6xJXBY_W2tT5waakogfnpHk4uhpVTy7A&usqp=CAU' } alt="new things will display here" />
                                </div>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <p className="mb-0 font-weight-bold">Name</p>
                                        <p className="mb-0">Location</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center Text">
                                <div>
                                    <p className="mb-0 font-weight-bold">Description</p>
                                    <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 font-weight-bold">Status</p>
                                    <p className="mb-0">Approved</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 font-weight-bold">Time Remaining</p>
                                    <p className="mb-0">20:00</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 font-weight-bold">Date</p>
                                    <p className="mb-0">24 September 2021 at 12:00 PM</p>
                                </div>
                            </div>
                            <div className="ShowOnHover">
                                <a href="##" title="Delete"><i class="las la-trash"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default New_PR_Request;