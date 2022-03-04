import React, { useEffect, useState, useMemo } from 'react';

import './SideBar.css';
import $ from 'jquery';

import { useSelector, useDispatch } from 'react-redux';
import { ShowSideBar } from '../../../../../Redux/Actions/Action';

const SideBar = ( props ) => {

    const [ Data, setData ] = useState();

    const ShowBar = useSelector( ( state ) => state.SideBar.ShowSideBar );

    const dispatch = useDispatch();

    useEffect(
        () => {

            $('.Dashboard_links .dropoptions a').on( 'click', () => {

                dispatch( ShowSideBar( false ) );

            } );

            $('.Dashboard .Dashboard_logo').on( 'click', () => {

                dispatch( ShowSideBar( false ) );

            } );

        }, [ dispatch ]
    );

    useMemo(
        () => {

            return setData( props.Data );

        }, [ props.Data ]
    )

    return (
        <>
            <div className={ ShowBar ? "Dashboard_sideBar ShowBar" : "Dashboard_sideBar" }>

                <div className="Dashboard_logo d-center">
                    <div><h4 style={ { whiteSpace: 'nowrap' } } className="mb-0 logo">EMPLOYEE PORTAL</h4></div>
                    <div><button className="btn btn-sm p-0 m-0 sideBar_bars"><i className={ ShowBar ? "las la-times cross" : "" }></i></button></div>
                </div>

                {/* SIDEBAR CONTENT */}
                {
                    Data
                }
            </div>
        </>
    )

};

export default SideBar;