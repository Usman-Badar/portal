import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import './Leave.css';

import { NavLink, useHistory, Route } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { ShowSideBar, EmployeeLogin } from '../../Redux/Actions/Action';
import axios from '../../axios';
import socket from '../../io';
import $ from 'jquery';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Dashboard/Dashboard';
import LeaveForm from './LeaveForm/LeaveForm';
import LeaveRequests from './LeaveRequests/LeaveRequests';
import ShortLeave from './ShortLeave/ShortLeave';

const SideBar = lazy( () => import('../EmployeeProtal/Dashboard/Components/SideBar/SideBar') );
const TopBar = lazy( () => import('../EmployeeProtal/Dashboard/Components/TopBar/TopBar') );

const Leave = () => {

    const [ ShowBar, setShowBar ] = useState( false );
    
    const AccessControls = useSelector( ( state ) => state.EmpAuth.EmployeeData );
    const Menu = useSelector( ( state ) => state.EmpAuth.Menu );
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(
        () => {

            if ( sessionStorage.getItem("Token") === undefined || sessionStorage.getItem("Token") === null )
            {
                history.replace("/login");
            }else
            {
                const d = new FormData();
                d.append('empID', sessionStorage.getItem('EmpID'));
                d.append('view', 'leave');
                axios.post('/getemployee', d).then(res => {
    
                    socket.open();
                    socket.emit(
                        'NewUser', sessionStorage.getItem('EmpID')
                    );
                    
                    dispatch(EmployeeLogin(res.data));
    
                }).catch(err => {
    
                    toast.dark(err, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
    
                });
            }


        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [ dispatch ]
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const SideBarClose = () => {

        dispatch( ShowSideBar( false ) );

    }

    const FormsLinks = ( clas, options ) => {

        if ($('.' + clas).find('i').hasClass('la-caret-right')) {
            $('.' + clas + ' .la-caret-right').removeClass('la-caret-right').addClass('la-caret-down');
            $('.' + options).slideDown();
        } else {
            $('.' + clas + ' .la-caret-down').removeClass('la-caret-down').addClass('la-caret-right');
            $('.' + options).slideUp();
        }

    }

    // SIDEBAR LINKS
    let content = useMemo(
        () => {

            return (
                <div className="Dashboard_links">
                    {
                        Menu.map(
                            ( val, index ) => {

                                let access = val.access === null ? [] : JSON.parse( val.access );
                                let accessKey = val.access === null ? true : false;
                                let content = null;
                                if ( AccessControls.access )
                                {
                                    for ( let x = 0; x < access.length; x++ )
                                    {
                                        if ( JSON.parse(AccessControls.access).includes( access[x] ) )
                                        {
                                            accessKey = true;
                                        }
                                    }

                                    if ( val.option_id !== null && accessKey )
                                    {
                                        content = <>
                                            <div key={ index } className={ "d-center links " + val.menu_txt + val.option_id } onClick={() => FormsLinks(val.menu_txt + val.option_id, val.option_id)}>
                                                <div className="pr-3"><i className={ val.icon_class_name }></i></div>
                                                <div className="d-flex justify-content-between w-100">
                                                    <div className="links_txt"> { val.menu_txt } </div>
                                                    <div className="links_txt"><i className="las la-caret-right" style={{ 'fontSize': '12px' }}></i></div>
                                                </div>
                                            </div>
                                            <div className={ "Forms_options _options dropoptions " + val.option_id }>
    
                                                {
                                                    Menu.map(
                                                        val2 => {
    
                                                            let sub_content = null;
                                                            if ( val2.under_menu === val.option_id )
                                                            {
                                                                sub_content = <>
                                                                    <NavLink key={ val2.menu_txt } activeClassName="Dashboard_active" to={ val2.link } className="d-center links">
                                                                        <div className="pr-3"><i className={ val2.icon_class_name }></i></div>
                                                                        <div className="links_txt">{ val2.menu_txt }</div>
                                                                    </NavLink>
                                                                </>
                                                            }
    
                                                            return sub_content;
    
                                                        }
                                                    )
                                                }
    
                                            </div>
                                        </>
                                    }else if ( val.under_menu === null && accessKey )
                                    {
                                        content = <>
                                            <NavLink key={ val.menu_txt } activeClassName="Dashboard_active" to={ val.link } className="d-center links">
                                                <div className="pr-3"><i className={ val.icon_class_name }></i></div>
                                                <div className="links_txt">{ val.menu_txt }</div>
                                            </NavLink>
                                        </>
                                    }
                                }

                                return content;

                            }
                        )
                    }
                </div> 
            )

        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [ AccessControls, Menu ]
    )

    return (
        <Suspense fallback={ <div>Loading...</div> }>

            <div className="Leave_Dashboard">

                {/* SideBar Start From Here */}
                {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    useMemo(
                        () => {

                            return <SideBar title="Leave Module" Data={ content } show={ShowBar} SideBarClose={ SideBarClose } />

                        }, [ShowBar, content, SideBarClose]
                    )
                }
                {/* SideBar End Here */}

                <div className="Leave_Dashboard_main_content">
                    {/* TopBar Start From Here */}
                    {
                        useMemo(
                            () => {

                                const ShowSide = () => {

                                    if (ShowBar) {
                                        setShowBar(false);
                                    } else {
                                        setShowBar(true);
                                    }

                                }

                                return <TopBar sideBarTrue={ShowSide} />

                            }, [ShowBar]
                        )
                    }

                    <div className="content">

                        <Route exact path='/leave/dashboard' render={ () => <Dashboard /> } />
                        <Route exact path="/leave/leave_form" render={ () => <LeaveForm LeaveForm={ true } Mainheading="Leave Application" heading="Purpose of leave" availed={ false } /> } />
                        <Route exact path="/leave/availed_leave_form" render={ () => <LeaveForm LeaveForm={ false } Mainheading="Availed Leave Application" heading="Purpose of leave" availed={ true } /> } />
                        <Route exact path="/leave/short_leave_form" render={ () => <ShortLeave Mainheading="Short Leave Application" heading="Purpose of leave" /> } />
                        <Route exact path="/leave/requests" render={ () => <LeaveRequests /> } />
                        <Route exact path='/leave/requests/:id' render={ () => <LeaveRequests /> } />

                    </div>

                </div>

            </div>

        </Suspense>
    )

}

export default Leave;