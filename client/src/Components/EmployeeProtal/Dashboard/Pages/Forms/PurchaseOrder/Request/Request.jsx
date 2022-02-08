import React from 'react';
import { Link } from 'react-router-dom';

import './Request.css';

const Request = () => {
    return (
        <div className="PreviousPORequest">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center w-75">
                    <img src={'https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg'} alt="employeeImg" />
                    <div>
                        <p className="font-weight-bolder"> Usman Badar </p>
                        <p> Developer at seatech iT </p>
                    </div>
                </div>
                <div className="w-25">
                    <p className="font-weight-bolder">Total</p>
                    <p> Rs 10000</p>
                </div>
            </div>
            <div className="py-3">
                <div className="d-flex justify-content-between">
                    <div>
                        <p className="font-weight-bolder">Date</p>
                        <p> 2022-01-20 </p>
                    </div>
                    <div>
                        <p className="font-weight-bolder">Status</p>
                        <p style={{ backgroundColor: 'red', fontSize: '10px' }} className="text-white text-center rounded-pill px-2"> Rejected </p>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <i className="las la-map-marker-alt"></i>
                <div>
                    <p className="font-weight-bolder"> Seatech </p>
                    <p> Headoffice </p>
                </div>
            </div>
            <div className="ViewPrRequests_button">
                <Link to={"/purchaserequisition/view=previousrequests/" + 1}>
                    <button className="btn">View</button>
                </Link>
            </div>
        </div>
    );
}

export default Request;