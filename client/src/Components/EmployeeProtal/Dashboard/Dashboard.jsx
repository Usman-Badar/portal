/* eslint-disable react-hooks/exhaustive-deps */
// REACT BASIC COMPONENTS
import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';

// CSS FILE
import './Dashboard.css';
// REACT REDUX
import { useSelector, useDispatch } from 'react-redux';
// REACT NAVIGATION
import { Route, NavLink, useHistory } from 'react-router-dom';
// BACKEND REQUEST API
import axios from '../../../axios';
// REDUX ACTIONS/METHDS
import { EmployeeLogin, ShowSideBar } from '../../../Redux/Actions/Action';
// TOAST CUSTOM COMPONENT
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';

// CUSTOM LOADING COMPONENT
import Loading from '../../UI/Loading/Loading';
import LoadingIcon from '../../../images/loadingIcons/icons8-loading-circle.gif';
// CREATING SOCKET
import socket from '../../../io';

const SideBar = lazy( () => import('./Components/SideBar/SideBar') );
const TopBar = lazy( () => import('./Components/TopBar/TopBar') );
const Descussion = lazy( () => import('./Pages/Descussion/Descussion') );
const PurchaseRequisition = lazy( () => import('./Pages/Forms/PurchaseRequisition/Employee_Requisition') );
const PurchaseOrder = lazy( () => import('./Pages/Forms/PurchaseOrder/PurchaseOrder') );
// const Viewpurchaseorder = lazy( () => import('./Pages/Inventory/ViewPurchaseOrder/ViewPurchaseOrder') );
const Devices = lazy( () => import('./Pages/Attendance/Devices/Devices') );
const EmployeeProfile = lazy( () => import('./Pages/EmployeeProfile/EmployeeProfile') );
const DailyAttendance = lazy( () => import('./Pages/EmployeeProfile/DailyAttendance/DailyAttendance') );

const Chat = lazy( () => import('./Pages/Chat/Employee_Chat') );

const Guests = lazy( () => import('./Pages/Attendance/Guests/Guests') );
const News = lazy( () => import('./Pages/News/News') );
const NewsPaper = lazy( () => import('./Pages/News/NewsPaper/NewsPaper') );

const Help = lazy( () => import('./Pages/Help/Employee_Help') );
const Drive = lazy( () => import('./Pages/Drive/Employee_Drive') );
const AttendanceRequest = lazy( () => import('./Pages/AtendanceRequest/Attandence_Request') );

const Attendance = lazy( () => import('./Pages/Employee/Attendance/Attendance') );

const BlackBoard = lazy( () => import('./Pages/BlackBoard/BlackBoard') );

const LeaveApplication = lazy( () => import('./Pages/Forms/Leave_Application/Leave_Application') );
const LeaveRequests = lazy( () => import('./Pages/LeaveRequests/Leave_Application_Details') );

const ChatBotNotification = lazy( () => import('../../UI/ChatBot/ChatBot_Notification') );
const View_Emp_Attendance = lazy( () => import('./Pages/View_Emp_Attendance/View_Emp_Attendance') );

// const InvtryAssets = lazy( () => import( './Pages/Inventory/InvtryAssets/InvtryAssets' ) );
// const InvtrySubAssets = lazy( () => import(  './Pages/Inventory/InvtryAssets/InvtrySubAssets/InvtrySubAssets' ) );

// const Assets = lazy( () => import(  './Pages/Inventory/Assets/New_Inventory_Assets' ) );

// const NewAssetEntry = lazy( () => import(  './Pages/Inventory/AssetEntry/AssetEntry' ) );
// const ViewInvtryRequests = lazy( () => import(  './Pages/Inventory/ViewInvtryRequests/ViewInvtryRequests' ) );

// const PRRequestDetails = lazy( () => import(  '../../Inventory/PRRequests/PRRequestDetails/PRRequestDetails' ) );
// const PRRequests = lazy( () => import(  '../../Inventory/PRRequests/New_PR_Request' ) );

// const InvtryLocation = lazy( () => import(  './Pages/Inventory/InvtryLocation/InvtryLocation' ) );
// const InvtrySubLocations = lazy( () => import(  './Pages/Inventory/InvtryLocation/InvtrySubLocations/InvtrySubLocations' ) );

const ViewPurchaseRequisition = lazy( () => import( './Pages/Procurement/ViewPurchaseRequisition/ViewPurchaseRequisition' ) );
const ViewPurchaseOrder = lazy( () => import( './Pages/Procurement/ViewPurchaseOrder/ViewPurchaseOrder' ) );

const EmploymentForm = lazy( () => import( './Pages/Forms/EmployementSetup/EmployementForm' ) );
const EmploymentRequests = lazy( () => import( './Pages/Forms/EmployementSetup/Employement_Request/Employement_Request' ) );
const ViewEmployees = lazy( () => import( './Pages/Forms/EmployementSetup/View_Employees/View_Employees' ) );
const ViewTempEmployee = lazy( () => import( './Pages/Forms/EmployementSetup/ViewTempEmployee/ViewTempEmployee' ) );
const ConfirmApproval = lazy( () => import( './Pages/Forms/EmployementSetup/ViewTempEmployee/ConfirmApproval/ConfirmApproval' ) );

const InventoryRequests = lazy( () => import('./Pages/Store/Inventory_requests/InventoryRequests') );
const Items = lazy( () => import('./Pages/Store/Items/Items') );
const Inward = lazy( () => import('./Pages/Store/Inward/Inward') );
const ItemRequest = lazy( () => import('./Pages/Forms/ItemRequest/ItemRequest') );
const RepairRequest = lazy( () => import('./Pages/Forms/RepairRequest/RepairRequest') );

const EmpTickets = lazy( () => import('./Pages/EmpTickets/EmpTickets') );

const Dashboard = () => {
    
    const AccessControls = useSelector( ( state ) => state.EmpAuth.EmployeeData );
    const Menu = useSelector( ( state ) => state.EmpAuth.Menu );
    
    const history = useHistory();
    let key = 'real secret keys should be long and random';
    const encryptor = require('simple-encryptor')(key);

    const dispatch = useDispatch();
    const [ ShowBar, setShowBar ] = useState( false );

    useEffect(
        () => {

            if ( sessionStorage.getItem("Token") === undefined || sessionStorage.getItem("Token") === null )
            {
                history.replace("/login");
            }else
            {
                const d = new FormData();
                d.append('empID', sessionStorage.getItem('EmpID'));
                d.append('view', 'portal');
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

        }, [ dispatch ]
    );

    const FormsLinks = ( clas, options ) => {

        if ($('.' + clas).find('i').hasClass('la-caret-right')) {
            $('.' + clas + ' .la-caret-right').removeClass('la-caret-right').addClass('la-caret-down');
            $('.' + options).slideDown();
        } else {
            $('.' + clas + ' .la-caret-down').removeClass('la-caret-down').addClass('la-caret-right');
            $('.' + options).slideUp();
        }

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const SideBarClose = () => {

        dispatch( ShowSideBar( false ) );

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
                                        for ( let y = 0; y < JSON.parse(AccessControls.access).length; y++ )
                                        {
                                            if ( parseInt(JSON.parse(AccessControls.access)[y]) === parseInt(access[x]) )
                                            {
                                                accessKey = true;
                                            }
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

        }, [AccessControls, SideBarClose, Menu ]
    )

    if ( sessionStorage.getItem("Token") )
    {
        if 
        ( 
            parseInt( encryptor.decrypt( sessionStorage.getItem("Token") ) )
            !==
            parseInt( sessionStorage.getItem('EmpID') )
        )
        {
            history.replace("/login");
        }
    }

    const Load = <Loading 
        display={ true }
        styling={
            {
                zIndex: 100000
            }
        }
        icon={ 
            <img 
                src={ LoadingIcon }
                className="LoadingImg"
                alt="LoadingIcon"
            /> 
        }
        txt="Please Wait"
    />

    const Sus = ( props ) => {

        return <Suspense fallback={ Load }> { props.content } </Suspense>

    }

    return (
        <>
            <div className="Dashboard">

                {/* SideBar Start From Here */}
                {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    useMemo(
                        () => {

                            return <SideBar Data={ content } show={ ShowBar } SideBarClose={ SideBarClose } />

                        }, [ ShowBar, content, SideBarClose ]
                    )
                }
                {/* SideBar End Here */}

                <div className="Dashboard_main_content">
                    {/* TopBar Start From Here */}
                    {
                        useMemo(
                            () => {

                                const ShowSide = () => {

                                    if ( ShowBar )
                                    {
                                        setShowBar( false );
                                    }else
                                    {
                                        setShowBar( true );
                                    }

                                }

                                return <TopBar sideBarTrue={ ShowSide } />

                            }, [ ShowBar ]
                        )
                    }

                    {/* TopBar End here */}
                    <div className="content" id="dashboard_content">
                    
                        <ChatBotNotification  />
                        <Route exact path='/dashboard' render={ () => <Sus content={ <Descussion /> } /> } />

                        <Route exact path='/chat' render={ () => <Sus content={ <Chat /> } /> } />

                        <Route exact path='/purchaserequisition/view=home' render={ () => <Sus content={ <PurchaseRequisition /> } /> } />
                        <Route exact path='/purchaserequisition/view=form' render={ () => <Sus content={ <PurchaseRequisition /> } /> } />
                        <Route exact path='/purchaserequisition/view=:view/:pr_id' render={ () => <Sus content={ <PurchaseRequisition /> } /> } />
                        
                        <Route exact path='/purchaserorder' render={ () => <Sus content={ <PurchaseOrder /> } /> } />
                        <Route exact path='/purchaseorder/view=:view' render={ () => <Sus content={ <PurchaseOrder /> } /> } />
                        <Route exact path='/purchaseorder/view=:view/:id/:id' render={ () => <Sus content={<PurchaseOrder />}  /> }/>

                        <Route exact path='/attdevices' render={ () => <Sus content={ <Devices /> } /> } />
                        <Route exact path='/guests' render={ () => <Sus content={ <Guests /> } /> } />

                        <Route exact path='/blackboard' render={ () => <Sus content={ <BlackBoard /> } /> } />

                        <Route exact path='/news' render={ () => <Sus content={ <News /> } /> } />
                        <Route exact path='/news/newspaper/:id' render={ () => <Sus content={ <NewsPaper /> } /> } />

                        <Route exact path='/help' render={ () => <Sus content={ <Help /> } /> } />
                        <Route exact path='/drive' render={ () => <Sus content={ <Drive /> } /> } />

                        <Route exact path='/leave_form' render={ () => <Sus content={ <LeaveApplication /> } /> } />
                        <Route exact path='/avail_leave_form' render={ () => <Sus content={ <LeaveApplication /> } /> } />
                        <Route exact path='/short_leave_form' render={ () => <Sus content={ <LeaveApplication /> } /> } />
                        <Route exact path='/leave_history' render={ () => <Sus content={ <LeaveApplication /> } /> } />
                        <Route exact path='/leave_request/:id' render={ () => <Sus content={ <LeaveApplication /> } /> } />

                        <Route exact path='/view_leave_requests' render={ () => <Sus content={ <LeaveRequests /> } /> } />

                        <Route exact path='/attendance_request' render={ () => <Sus content={ <AttendanceRequest /> } /> } />
                        <Route exact path='/attendance_request/:id' render={ () => <Sus content={ <AttendanceRequest /> } /> } />
                        <Route exact path='/attendance_requests' render={ () => <Sus content={ <View_Emp_Attendance /> } /> } />

                        <Route exact path='/view_employees_attendance' render={ () => <Sus content={ <Attendance /> } /> } />

                        <Route exact path='/profile/:path/:link' render={ () => <Sus content={ <EmployeeProfile /> } /> } />
                        <Route exact path='/empdailyattendance' render={ () => <Sus content={ <DailyAttendance /> } /> } />

                        <Route exact path='/employeestickets' render={ () => <Sus content={ <EmpTickets /> } /> } />
                        <Route exact path='/employeestickets/form' render={ () => <Sus content={ <EmpTickets /> } /> } />


                        {/* <Route exact path="/invtry" component={ Assets } />
                        <Route exact path="/invtry_assets" component={InvtryAssets} />

                        <Route exact path="/invtry_assets/new/entry" component={ NewAssetEntry } />

                        <Route exact path="/invtry_assets/invtrysubassets/:id" component={InvtrySubAssets} />

                        <Route exact path="/view_invtry_requests" component={ ViewInvtryRequests } />
                        <Route exact path="/view_invtry_requests/employee=:id" component={ ViewInvtryRequests } />
                        <Route exact path="/view_invtry_requests/employee=:id&&request=:id" component={ ViewInvtryRequests } />

                        <Route exact path="/invtry_locations" component={InvtryLocation} />
                        <Route exact path="/invtry_locations/invtrysublocations/:id" component={InvtrySubLocations} />
                        
                        <Route exact path='/invtry/view=purchase_order' component={ PurchaseOrder } />
                        <Route exact path='/invtry/requests=purchase_order' component={ Viewpurchaseorder } /> */}

                        <Route exact path="/purchaserequisition/home" render={ () => <Sus content={ <ViewPurchaseRequisition /> } /> } />
                        <Route exact path="/purchaserequisition/view=:view&&id=:pr_id" render={ () => <Sus content={ <ViewPurchaseRequisition /> } /> } />
                        
                        <Route exact path="/purchaseorder/home" render={ () => <Sus content={ <ViewPurchaseOrder /> } /> } />
                        <Route exact path="/purchaseorder/window=:view&&id=:id" render={ () => <Sus content={ <ViewPurchaseOrder /> } /> } />
                        
                        <Route exact path="/employment_setup" render={ () => <Sus content={ <EmploymentForm /> } /> } />
                        <Route exact path="/employment_setup/form" render={ () => <Sus content={ <EmploymentForm /> } /> } />
                        <Route exact path="/employment_setup/requests" render={ () => <Sus content={ <EmploymentRequests /> } /> } />
                        <Route exact path="/employment_setup/requests/:id" render={ () => <Sus content={ <ViewTempEmployee /> } /> } />
                        <Route exact path="/employment_setup/requests/confirm/:id" render={ () => <Sus content={ <ConfirmApproval /> } /> } />
                        <Route exact path="/employment_setup/employees" render={ () => <Sus content={ <ViewEmployees /> } /> } />

                        {/* 
                            FOR STORE MODULE
                        */}
                        <Route exact path="/store/inventory_requests" render={ () => <Sus content={ <InventoryRequests /> } /> } />
                        <Route exact path="/store/items" render={ () => <Sus content={ <Items /> } /> } />
                        <Route exact path="/store/items/index=:index" render={ () => <Sus content={ <Items /> } /> } />
                        <Route exact path="/store/inward" render={ () => <Sus content={ <Inward /> } /> } />

                        {/* 
                            FOR ITEM REQUESTS
                        */}
                        <Route exact path="/item_requests" render={ () => <Sus content={ <ItemRequest /> } /> } />
                        <Route exact path="/item_requests/:path" render={ () => <Sus content={ <ItemRequest /> } /> } />
                        <Route exact path="/item_requests/:path/index=:index" render={ () => <Sus content={ <ItemRequest /> } /> } />
                        

                        {/* REPAIR REQUEST */}
                        <Route exact path="/repair_request" render={ () => <Sus content={ <RepairRequest /> } /> } />
                    </div>

                </div>

            </div>
        </>
    )

};

export default Dashboard;