import React, { useState } from 'react';

import './Inventory.css';
import { Route, NavLink } from 'react-router-dom';

import Sidebar from '../EmployeeProtal/Dashboard/Components/SideBar/SideBar';
import TopBar from '../EmployeeProtal/Dashboard/Components/TopBar/TopBar';
import InvtryAssets from './InvtryAssets/InvtryAssets';
import InvtrySubAssets from './InvtryAssets/InvtrySubAssets/InvtrySubAssets';

import InvtryHome from './InvtryHome/InvtryHome';

import PRRequestDetails from './PRRequests/PRRequestDetails/PRRequestDetails';
import PRRequests from './PRRequests/New_PR_Request';

import InvtryLocation from './InvtryLocation/InvtryLocation';
import InvtrySubLocations from './InvtryLocation/InvtrySubLocations/InvtrySubLocations';
import { useSelector } from 'react-redux';

const Inventory = () => {

    const AccessControls = useSelector( ( state ) => state.EmpAuth.EmployeeData );
    const [ ShowBar, setShowBar ] = useState( false );

    const ShowSide = () => {

        if ( ShowBar )
        {
            setShowBar( false );
        }else
        {
            setShowBar( true );
        }

    } 

    const content = 
    <div className="Dashboard_links">
            <NavLink activeClassName="Inventory_Dashboard_active" to="/invtry" className="d-center links">
                <div className="pr-3"><i className="las la-home"></i></div>
                <div className="links_txt">Home</div>
            </NavLink>
            <NavLink activeClassName="Inventory_Dashboard_active" to="/invtry_assets" className="d-center links">
                <div className="pr-3"><i className="las la-file-invoice-dollar"></i></div>
                <div className="links_txt">Assets</div>
            </NavLink>
            <NavLink activeClassName="Inventory_Dashboard_active" to="/invtry_locations" className="d-center links">
                <div className="pr-3"><i className="las la-street-view"></i></div>
                <div className="links_txt">Locations</div>
            </NavLink>
            {
                AccessControls.access ? JSON.parse(AccessControls.access).includes(1)
                    ?
                    <NavLink activeClassName="Inventory_Dashboard_active" to="/invtry_pr_requests" className="d-center links">
                        <div className="pr-3"><i className="las la-money-bill-wave-alt"></i></div>
                        <div className="links_txt">Purchase Requests</div>
                    </NavLink>
                    :
                    null
                    :
                    null
            }
        </div>
        

    return (
        <>
            <div className='Inventory'>
                <Sidebar Data={ content } show={ ShowBar } />

                <div className="Inventory_Dashboard_main_content">
                    {/* TopBar Start From Here */}
                    <TopBar />
                    {/* TopBar End here */}
                    <div className="content">
                        {/* <Route exact path="/invtry" /> */}
                        <Route exact path="/invtry" component={InvtryHome} />
                        <Route exact path="/invtry_assets" component={InvtryAssets} />
                        <Route exact path="/invtry_assets/invtrysubassets/:id" component={InvtrySubAssets} />

                        <Route exact path='/invtry_pr_requests' component={ PRRequests } />
                        <Route exact path="/invtry_pr_requests/invtry_pr_request_details/:id" component={PRRequestDetails} />

                        <Route exact path="/invtry_locations" component={InvtryLocation} />
                        <Route exact path="/invtry_locations/invtrysublocations/:id" component={InvtrySubLocations} />
                    </div>
                </div>
            </div>
        </>
    )

}


export default Inventory;