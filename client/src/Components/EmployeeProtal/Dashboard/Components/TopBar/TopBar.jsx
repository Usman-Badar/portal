/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useEffect } from 'react';

import './TopBar.css';
import Typewriter from 'typewriter-effect';

import $ from 'jquery';
import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { ShowSideBar } from '../../../../../Redux/Actions/Action';

import Notifications from '../Notifications/Notifications';

const TopBar = () => {

    const Data = useSelector( ( state ) => state.EmpAuth.EmployeeData );
    const ShowBar = useSelector( ( state ) => state.SideBar.ShowSideBar );
    const dispatch = useDispatch();

    let key = 'real secret keys should be long and random';
    const encryptor = require('simple-encryptor')(key);

    useEffect(
        () => {

            $('.search i').on('click', () => {
                $('.search_dropdown').toggle(300);
            });

            $('.emp_img').on('click', () => {
                $('.emp_dropdown').toggle(300);
            });

            $('.emp_dropdown').on('click', () => {
                $('.emp_dropdown').toggle(300);
            });

            $('.content').on('click', () => {
                $('.emp_dropdown').hide(300);
            });

            $('.Dashboard_sideBar .links').on('click', () => {
                $('.emp_dropdown').hide(300);
            });

            document.addEventListener(
                'keypress',
                ( e ) => {

                    if ( e.shiftKey && e.keyCode === 43 )
                    {
                        dispatch( ShowSideBar( true ) );
                    }else if ( e.shiftKey && e.keyCode === 45 )
                    {
                        dispatch( ShowSideBar( false ) );
                    }

                }
            )

        }, []
    );

    const TrueOrFalse = () => {

        dispatch( ShowSideBar( !ShowBar ) );

    }

    return (
        <>
            <div className="Dashboard_topbar d-center">
                <marquee direction="left" className="topbar_news d-450-none">
                    <Typewriter
                        options={{
                            strings: ["Tesla is quickly responding to the NHTSA's investigation of in-dash gaming while cars are moving. The Guardian has learned Tesla will deliver an update disabling on-the-move Passenger Play. A spokeswoman for the regulator said Tesla promised the change after."],
                            autoStart: true,
                            loop: true,
                            delay: 50,
                        }}
                    />
                </marquee>
                <div className=" d-450-block"></div>
                <div className="icons d-center">
                    <Notifications Data={ Data } />
                    <div className="px-3 emp_img_container">
                        <div className="emp_img" style={ { "backgroundImage" : "url('images/employees/" + Data.emp_image + "')" } }></div>
                        <div className="emp_dropdown">
                            <p className="pl-4 pb-2 mb-1 font-weight-bold border-bottom"> { encryptor.decrypt( Data.login_id ) } </p>
                            <NavLink to="/profile/personal/info" className="d-center links">
                                <div className="pr-3"><i className="las la-user"></i></div>
                                <div className="links_txt">Profile</div>
                            </NavLink>
                            <NavLink to="/logout" className="d-center links">
                                <div className="pr-3"><i className="las la-sign-out-alt"></i></div>
                                <div className="links_txt">Logout</div>
                            </NavLink>
                        </div>
                    </div>
                    <div className="threeDots d-1400-block" onClick={ TrueOrFalse }>
                        <button className="btn p-0 m-0">
                            <i className="las la-ellipsis-v" style={ { color: "var(--gray-text)" } }></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default TopBar;