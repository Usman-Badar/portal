import React from 'react';
import { Link } from 'react-router-dom';

import './Notifications.css';

const Notifications = () => {

    return (
        <>
            <div className="Notifications">
                <div className="Notifications-content">
                    <h3>Today's News</h3>
                    <div className="Notifications-div text-justify">
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                    </div>
                    <Link to='/attdashboard' className="text-right d-block text-dark pr-3 font-weight-bold mt-3 mb-0">Go To Dashboard</Link>
                </div>
            </div>
        </>
    )

}

export default Notifications;