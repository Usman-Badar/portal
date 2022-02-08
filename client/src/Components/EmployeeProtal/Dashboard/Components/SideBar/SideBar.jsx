import React, { useEffect } from 'react';

import './SideBar.css';
import $ from 'jquery';

import { useSelector, useDispatch } from 'react-redux';
import { ShowSideBar } from '../../../../../Redux/Actions/Action';

const SideBar = ( props ) => {

    const ShowBar = useSelector( ( state ) => state.SideBar.ShowSideBar );

    const dispatch = useDispatch();

    useEffect(
        () => {

            setTimeout(() => {
                $('.dropoptions').slideUp(0);
            }, 100);

            $('.Dashboard_links .dropoptions a').on( 'click', () => {

                dispatch( ShowSideBar( false ) );

            } );

            $('.Dashboard .Dashboard_logo').on( 'click', () => {

                dispatch( ShowSideBar( false ) );

            } );

        }, []
    );

    return (
        <>

            <div className={ ShowBar ? "Dashboard_sideBar ShowBar" : "Dashboard_sideBar" }>

                <div className="Dashboard_logo d-center">
                    <div><h4 className="mb-0 logo">SEABOARD</h4></div>
                    <div><button className="btn btn-sm p-0 m-0 sideBar_bars"><i className={ ShowBar ?"las la-times cross" : "las la-bars" }></i></button></div>
                </div>

                {
                    props.Data
                }
            </div>
        </>
    )

};

export default SideBar;