import React, { useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import './SideBar.css';
import $ from 'jquery';

import { ShowSideBar } from '../../../../Redux/Actions/Action';
import { useSelector, useDispatch } from 'react-redux';

const SideBar = (props) => {

    const ShowBar = useSelector( ( state ) => state.SideBar.ShowSideBar );
    const dispatch = useDispatch();

    useEffect(
        () => {

            $('.Forms_options').slideUp(0);
            $('.attendance_options').slideUp(0);

            $('.Inventory_Dashboard_links a').on( 'click', () => {

                dispatch( ShowSideBar( false ) );

            } );

            $('.Inventory .Inventory_Dashboard_logo').on( 'click', () => {

                dispatch( ShowSideBar( false ) );

            } );

        }, []
    );

    return (
        <>
            <div className={ ShowBar ? "Inventory_Dashboard_sideBar ShowBar" : "Inventory_Dashboard_sideBar" }>

                <div className="Inventory_Dashboard_logo d-center">
                    <div><h4 className="mb-0 logo">INVENTORY PANEL</h4></div>
                    <div><button className="btn btn-sm p-0 m-0 sideBar_bars"><i className={ ShowBar ?"las la-times cross" : "las la-bars" }></i></button></div>
                </div>

                <div className="Inventory_Dashboard_links">
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
                        sessionStorage.getItem('InvtryEmpID') === '500'
                            ?
                            <>
                                <NavLink activeClassName="Inventory_Dashboard_active" to="/invtry_pr_requests" className="d-center links">
                                    <div className="pr-3"><i className="las la-money-bill-wave-alt"></i></div>
                                    <div className="links_txt">Purchase Requests</div>
                                </NavLink>
                            </>
                            :
                            null
                    }
                </div>
            </div>
        </>
    )

};

export default SideBar;