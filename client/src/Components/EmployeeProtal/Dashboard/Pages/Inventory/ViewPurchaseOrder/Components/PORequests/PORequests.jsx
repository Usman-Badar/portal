import React from 'react';

// IMPORT CSS
import './PORequests.css';

const Porequests = ( props ) => {
    return (
        <div className="PoEmpRequests" onClick={ () => props.OpenDetails( props.index ) }>
            {/* REQUEST STATUS */}
            <div className={ "RequestStatus py-auto status " + props.status }>
                { props.details.status }
            </div>
            <div>
                <p>
                    ID
                </p>
                <p>
                    { props.details.po_id }
                </p>
            </div>        
            <div>
                <p>
                    Date
                </p>
                <p>
                    {props.d ? props.d.toString().substring(0, 15) + ' at ' + props.tConvert(props.details.request_time) : null}
                </p>
            </div>
            <div>
                <p>
                    Company
                </p>
                <p>
                    { props.details.company_name }
                </p>
            </div>        
            <div>
                <p>
                    Location
                </p>
                <p>
                    { props.details.location_name }
                </p>
            </div>
        </div>
    );
}

export default Porequests;