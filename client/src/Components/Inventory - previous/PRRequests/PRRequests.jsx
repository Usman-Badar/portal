import React from 'react';
import './PRRequests.css';
import IMG from '../../../images/Inventry-logo.png';

const PR_Requests = () => {

    return (
        <>
            <div className="PR_Requests_Box">
                <div className="PR_Requests_Upper">
                    <div className="Search">
                        <h5>Search Requests</h5>
                        <input type="search" placeholder="Search Requests" className="form-control" required />
                    </div>
                </div>
                <div className="PR_Requests_Lower">
                    <div className="PR_Requests_Details2">
                        <h4 className="mb-4"> All Requests </h4>
                        <div className="one">
                            <div className="index"> <span>1</span></div>
                            <div className="d-flex">
                                <div className="d-flex justify-content-center align-items-center">
                                    <img src={IMG} alt="Image" />
                                </div>
                                <div className="d-block d-flex justify-content-start align-items-center ml-3">
                                    <div>
                                        <p className="center mb-0 font-weight-bold">Name</p>
                                        <p className="center mb-0">Location</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-block">
                                <p className="center mb-0 font-weight-bold">Date</p>
                                <p className="center mb-0">11-Sep-2021</p>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <button type="button" className="form-control">View Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PR_Requests;