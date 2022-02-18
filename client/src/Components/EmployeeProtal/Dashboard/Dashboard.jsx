import React, { lazy, Suspense, useEffect, useState } from 'react';

import './Dashboard.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Route, NavLink } from 'react-router-dom';
import axios from '../../../axios';
import { EmployeeLogin, ShowSideBar } from '../../../Redux/Actions/Action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';

import Loading from '../../UI/Loading/Loading';

import socket from '../../../io';

const SideBar = lazy( () => import('./Components/SideBar/SideBar') );
const TopBar = lazy( () => import('./Components/TopBar/TopBar') );
const Descussion = lazy( () => import('./Pages/Descussion/Descussion') );
const PurchaseRequisition = lazy( () => import('./Pages/Forms/PurchaseRequisition/Employee_Requisition') );
const PurchaseOrder = lazy( () => import('./Pages/Forms/PurchaseOrder/PurchaseOrder') );
const Viewpurchaseorder = lazy( () => import('./Pages/Inventory/ViewPurchaseOrder/ViewPurchaseOrder') );
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

const Attandence_Request_Recieve = lazy( () => import('./Pages/AttendanceRequests/Attandence_Request_Recieve') );
const ChatBotNotification = lazy( () => import('../../UI/ChatBot/ChatBot_Notification') );

const InvtryAssets = lazy( () => import( './Pages/Inventory/InvtryAssets/InvtryAssets' ) );
const InvtrySubAssets = lazy( () => import(  './Pages/Inventory/InvtryAssets/InvtrySubAssets/InvtrySubAssets' ) );

const InvtryHome = lazy( () => import(  '../../Inventory/InvtryHome/InvtryHome' ) );
const Assets = lazy( () => import(  './Pages/Inventory/Assets/New_Inventory_Assets' ) );

const NewAssetEntry = lazy( () => import(  './Pages/Inventory/AssetEntry/AssetEntry' ) );
const ViewInvtryRequests = lazy( () => import(  './Pages/Inventory/ViewInvtryRequests/ViewInvtryRequests' ) );

const PRRequestDetails = lazy( () => import(  '../../Inventory/PRRequests/PRRequestDetails/PRRequestDetails' ) );
const PRRequests = lazy( () => import(  '../../Inventory/PRRequests/New_PR_Request' ) );

const InvtryLocation = lazy( () => import(  './Pages/Inventory/InvtryLocation/InvtryLocation' ) );
const InvtrySubLocations = lazy( () => import(  './Pages/Inventory/InvtryLocation/InvtrySubLocations/InvtrySubLocations' ) );

const ViewPurchaseRequisition = lazy( () => import( './Pages/Procurement/ViewPurchaseRequisition/ViewPurchaseRequisition' ) );
const ViewPurchaseOrder = lazy( () => import( './Pages/Procurement/ViewPurchaseOrder/ViewPurchaseOrder' ) );

const Dashboard = () => {
    
    const AccessControls = useSelector( ( state ) => state.EmpAuth.EmployeeData );

    const dispatch = useDispatch();

    const history = useHistory();
    const [ ShowBar, setShowBar ] = useState( false );

    useEffect(
        () => {

            if ( sessionStorage.getItem('EmpID') )
            {

                const d = new FormData();
                d.append('empID', sessionStorage.getItem('EmpID'));
                axios.post('/getemployee', d).then(res => {

                    socket.open();
                    socket.emit(
                        'NewUser', sessionStorage.getItem('EmpID')
                    );
                    
                    dispatch(EmployeeLogin(res.data[0]));

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

            // dispatch(
            //     Chatbot([{txt:"Welcome Back"}])
            // );

        }, []
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

    const SideBarClose = () => {

        dispatch( ShowSideBar( false ) );

    }

    setInterval(() => {
        
        if ( sessionStorage.getItem("EmpID") === undefined || sessionStorage.getItem("EmpID") === null )
        {
            history.replace('/login');
        }
        
    }, 100);

    const ShowSide = () => {

        if ( ShowBar )
        {
            setShowBar( false );
        }else
        {
            setShowBar( true );
        }

    }

    let content =
        <div className="Dashboard_links">
            <NavLink activeClassName="Dashboard_active" to="/dashboard" className="d-center links" onClick={() => SideBarClose()}>
                <div className="pr-3"><i className="las la-home"></i></div>
                <div className="links_txt">Home</div>
            </NavLink>
            <NavLink activeClassName="Dashboard_active" to="/chat" className="d-center links" onClick={() => SideBarClose()}>
                <div className="pr-3"><i className="lab la-rocketchat"></i></div>
                <div className="links_txt">Chat</div>
            </NavLink>
            <NavLink activeClassName="Dashboard_active" to="/drive" className="d-center links" onClick={() => SideBarClose()}>
                <div className="pr-3"><i className="lab la-google-drive"></i></div>
                <div className="links_txt">Drive</div>
            </NavLink>
            <NavLink activeClassName="Dashboard_active" to="/news" className="d-center links" onClick={() => SideBarClose()}>
                <div className="pr-3"><i className="lar la-newspaper"></i></div>
                <div className="links_txt">News</div>
            </NavLink>
            {
                AccessControls
                ?
                AccessControls.access ? JSON.parse(AccessControls.access).includes(1)
                    ?
                    <>
                        <NavLink activeClassName="Dashboard_active" to="/blackboard" className="d-center links" onClick={() => SideBarClose()}>
                            <div className="pr-3"><i className="las la-video"></i></div>
                            <div className="links_txt">Black Board</div>
                        </NavLink>
                        <NavLink activeClassName="Dashboard_active" to="/help" className="d-center links" onClick={() => SideBarClose()}>
                            <div className="pr-3"><i className="las la-question"></i></div>
                            <div className="links_txt">Help</div>
                        </NavLink>
                    </>
                :
                null
                :
                null
                :
                null
            }
            {
                AccessControls.access ? JSON.parse(AccessControls.access).includes(500) || JSON.parse(AccessControls.access).includes(1)
                    ?
                    <>
                        <div className="d-center links forms_link_inventory" onClick={() => FormsLinks('forms_link_inventory', 'inventory_options')}>
                            <div className="pr-3"><i className="las la-file-invoice-dollar"></i></div>
                            <div className="d-flex justify-content-between w-100">
                                <div className="links_txt">Inventory</div>
                                <div className="links_txt"><i className="las la-caret-right" style={{ 'fontSize': '12px' }}></i></div>
                            </div>
                        </div>

                        <div className="Forms_options _options inventory_options dropoptions">
                        
                            {
                                AccessControls.access ? JSON.parse(AccessControls.access).includes(1)
                                    ?
                                    <>
                                        <NavLink activeClassName="Dashboard_active" to="/invtry" className="d-center links" onClick={() => SideBarClose()}>
                                            <div className="pr-3"><i className="las la-file-invoice-dollar"></i></div>
                                            <div className="links_txt">Assets</div>
                                        </NavLink>
                                    </>
                                    :
                                    null
                                    :
                                    null
                            }
                            {
                                AccessControls.access ? JSON.parse(AccessControls.access).includes(510) || JSON.parse(AccessControls.access).includes(512) || JSON.parse(AccessControls.access).includes(513) || JSON.parse(AccessControls.access).includes(514) || JSON.parse(AccessControls.access).includes(515) || JSON.parse(AccessControls.access).includes(1)
                                    ?
                                    <>
                                        {/* <NavLink activeClassName="Dashboard_active" to="/view_invtry_requests" className="d-center links" onClick={() => SideBarClose()}>
                                            <div className="pr-3"><i className="las la-stream"></i></div>
                                            <div className="links_txt">View Requests</div>
                                        </NavLink>
                                        <NavLink activeClassName="Dashboard_active" to="/invtry/requests=purchase_order" className="d-center links" onClick={() => SideBarClose()}>
                                            <div className="pr-3"><i className="las la-stream"></i></div>
                                            <div className="links_txt">View Purchase Orders</div>
                                        </NavLink> */}
                                    </>
                                    :
                                    null
                                    :
                                    null
                            }
                            {
                                AccessControls.access ? JSON.parse(AccessControls.access).includes(517) || JSON.parse(AccessControls.access).includes(1)
                                    ?
                                    <>
                                        <NavLink activeClassName="Dashboard_active" to="/invtry_assets" className="d-center links" onClick={() => SideBarClose()}>
                                            <div className="pr-3"><i className="las la-code-branch"></i></div>
                                            <div className="links_txt">Asset Categories</div>
                                        </NavLink>
                                    </>
                                    :
                                    null
                                    :
                                    null
                            }
                            {
                                AccessControls.access ? JSON.parse(AccessControls.access).includes(518) || JSON.parse(AccessControls.access).includes(1)
                                    ?
                                    <>
                                        <NavLink activeClassName="Dashboard_active" to="/invtry_locations" className="d-center links" onClick={() => SideBarClose()}>
                                            <div className="pr-3"><i className="las la-street-view"></i></div>
                                            <div className="links_txt">Locations</div>
                                        </NavLink>
                                    </>
                                    :
                                    null
                                    :
                                    null
                            }
                        </div>
                    </>
                    :
                    null
                    :
                    null
            }

            <div className="d-center links forms_link_attendance" onClick={() => FormsLinks('forms_link_attendance', 'attendance_options')}>
                <div className="pr-3"><i className="las la-calendar-day"></i></div>
                <div className="d-flex justify-content-between w-100">
                    <div className="links_txt">Attendance</div>
                    <div className="links_txt"><i className="las la-caret-right" style={{ 'fontSize': '12px' }}></i></div>
                </div>
            </div>
            <div className="Forms_options _options attendance_options dropoptions">

                <NavLink activeClassName="Dashboard_active" to="/attendance_request" className="d-center links" onClick={() => SideBarClose()}>
                    <div className="pr-3"><i className="las la-cash-register"></i></div>
                    <div className="links_txt">Attendance Request</div>
                </NavLink>

                {
                    AccessControls.access ? JSON.parse(AccessControls.access).includes(1)
                        ?
                        <>
                            <NavLink activeClassName="Dashboard_active" to="/attendance_requests" className="d-center links" onClick={() => SideBarClose()}>
                                <div className="pr-3"><i className="las la-traffic-light"></i></div>
                                <div className="links_txt">Attendance Requests</div>
                            </NavLink>
                        </>
                        :
                        null
                        :
                        null
                }

                {
                    AccessControls.access ? JSON.parse(AccessControls.access).includes(503) || JSON.parse(AccessControls.access).includes(1)
                        ?
                        <NavLink activeClassName="Dashboard_active" to="/guests" className="d-center links" onClick={() => SideBarClose()}>
                            <div className="pr-3"><i className="las la-user-injured"></i></div>
                            <div className="links_txt">View Guests</div>
                        </NavLink>
                        :
                        null
                        :
                        null
                }

                {
                    AccessControls.access ? JSON.parse(AccessControls.access).includes(506) || JSON.parse(AccessControls.access).includes(502) || JSON.parse(AccessControls.access).includes(1)
                        ?
                        <NavLink activeClassName="Dashboard_active" to="/view_employees_attendance" className="d-center links" onClick={() => SideBarClose()}>
                            <div className="pr-3"><i className="las la-users"></i></div>
                            <div className="links_txt">View Employees Attendance</div>
                        </NavLink>
                        :
                        null
                        :
                        null
                }

                {
                    AccessControls.access ? JSON.parse(AccessControls.access).includes(509) || JSON.parse(AccessControls.access).includes(1)
                        ?
                        <NavLink activeClassName="Dashboard_active" to="/view_leave_requests" className="d-center links" onClick={() => SideBarClose()}>
                            <div className="pr-3"><i className="las la-mail-bulk"></i></div>
                            <div className="links_txt">View Leave Requests</div>
                        </NavLink>
                        :
                        null
                        :
                        null
                }


            </div>

            {
                AccessControls.access ? JSON.parse(AccessControls.access).includes(521) || JSON.parse(AccessControls.access).includes(1)
                    ?
                    <>
                        <div className="d-center links forms_link_procurement" onClick={() => FormsLinks('forms_link_procurement', 'procurement_options')}>
                            <div className="pr-3"><i className="las la-dollar-sign"></i></div>
                            <div className="d-flex justify-content-between w-100">
                                <div className="links_txt">Procurement</div>
                                <div className="links_txt"><i className="las la-caret-right" style={{ 'fontSize': '12px' }}></i></div>
                            </div>
                        </div>
                        <div className="Forms_options _options procurement_options dropoptions">
                            {
                                AccessControls.access ? JSON.parse(AccessControls.access).includes(510) || JSON.parse(AccessControls.access).includes(512) || JSON.parse(AccessControls.access).includes(513) || JSON.parse(AccessControls.access).includes(514) || JSON.parse(AccessControls.access).includes(515) || JSON.parse(AccessControls.access).includes(524) || JSON.parse(AccessControls.access).includes(523) || JSON.parse(AccessControls.access).includes(1)
                                    ?
                                    <>
                                        <NavLink activeClassName="Dashboard_active" to="/purchaserequisition/home" className="d-center links" onClick={() => SideBarClose()}>
                                            <div className="pr-3"><i className="las la-stream"></i></div>
                                            <div className="links_txt">View Purchase Requisition</div>
                                        </NavLink>
                                        <NavLink activeClassName="Dashboard_active" to="/purchaseorder/home" className="d-center links" onClick={() => SideBarClose()}>
                                            <div className="pr-3"><i className="las la-stream"></i></div>
                                            <div className="links_txt">View Purchase Orders</div>
                                        </NavLink>
                                    </>
                                    :
                                    null
                                    :
                                    null
                            }
                        </div>
                    </>
                    :
                    null
                    :
                    null
            }

            {
                AccessControls.access ? JSON.parse(AccessControls.access).includes(1)
                    ?
                    <>
                        <div className="d-center links forms_link_documentation" onClick={() => FormsLinks('forms_link_documentation', 'documentation_options')}>
                            <div className="pr-3"><i className="las la-archive"></i></div>
                            <div className="d-flex justify-content-between w-100">
                                <div className="links_txt">Archiving</div>
                                <div className="links_txt"><i className="las la-caret-right" style={{ 'fontSize': '12px' }}></i></div>
                            </div>
                        </div>
                        <div className="Forms_options _options documentation_options dropoptions">
                            {
                                AccessControls.access ? JSON.parse(AccessControls.access).includes(1)
                                    ?
                                    <>
                                        <NavLink activeClassName="Dashboard_active" to="/purchaserequisition/home" className="d-center links" onClick={() => SideBarClose()}>
                                            <div className="pr-3"><i className="las la-book"></i></div>
                                            <div className="links_txt">Documentation</div>
                                        </NavLink>
                                    </>
                                    :
                                    null
                                    :
                                    null
                            }
                        </div>
                    </>
                    :
                    null
                    :
                    null
            }

            <div className="d-center links forms_link_forms" onClick={() => FormsLinks('forms_link_forms', 'form_options')}>
                <div className="pr-3"><i className="las la-server"></i></div>
                <div className="d-flex justify-content-between w-100">
                    <div className="links_txt">Forms</div>
                    <div className="links_txt"><i className="las la-caret-right" style={{ 'fontSize': '12px' }}></i></div>
                </div>
            </div>
            <div className="Forms_options _options form_options dropoptions">
                <NavLink activeClassName="Dashboard_active" to='/purchaserequisition/view=home' className="d-center links" onClick={() => SideBarClose()}>
                    <div className="pr-3"><i className="las la-hand-holding-usd"></i></div>
                    <div className="links_txt">Purchase Requisition</div>
                </NavLink>
                <NavLink activeClassName="Dashboard_active" to="/leave_form" className="d-center links" onClick={() => SideBarClose()}>
                    <div className="pr-3"><i className="las la-scroll"></i></div>
                    <div className="links_txt">Leave Form</div>
                </NavLink>
                {
                    AccessControls.access ? JSON.parse(AccessControls.access).includes(1)
                        ?
                        <>
                            <NavLink activeClassName="Dashboard_active" to="/invtry/view=purchase_order" className="d-center links" onClick={() => SideBarClose()}>
                                <div className="pr-3"><i className="las la-paste"></i></div>
                                <div className="links_txt">Documents Request Form</div>
                            </NavLink>
                        </>
                        :
                        null
                        :
                        null
                }
                {
                    AccessControls.access ? JSON.parse(AccessControls.access).includes(1) || JSON.parse(AccessControls.access).includes(519)
                        ?
                        <>
                            <NavLink activeClassName="Dashboard_active" to='/purchaseorder/view=home' className="d-center links" onClick={() => SideBarClose()}>
                                <div className="pr-3"><i className="las la-signature"></i></div>
                                <div className="links_txt">Purchase Order</div>
                            </NavLink>
                        </>
                        :
                        null
                        :
                        null
                }
            </div>
        </div>

    return (
        <>
            <div className="Dashboard">

                {/* SideBar Start From Here */}
                    <SideBar Data={ content } show={ ShowBar } />
                {/* SideBar End Here */}

                <div className="Dashboard_main_content">
                    {/* TopBar Start From Here */}
                        <TopBar sideBarTrue={ ShowSide } />
                    {/* TopBar End here */}
                    <Suspense fallback={ <Loading display={ true } /> }>
                        <div className="content">
                        
                            <ChatBotNotification  />
                            <Route exact path='/dashboard' component={ Descussion } />

                            <Route exact path='/chat' component={ Chat } />

                            <Route exact path='/purchaserequisition/view=home' component={ PurchaseRequisition } />
                            <Route exact path='/purchaserequisition/view=form' component={ PurchaseRequisition } />
                            <Route exact path='/purchaserequisition/view=:view/:pr_id' component={ PurchaseRequisition } />
                            
                            <Route exact path='/purchaserorder' component={ PurchaseOrder } />
                            <Route exact path='/purchaseorder/view=:view' component={ PurchaseOrder } />
                            <Route exact path='/purchaseorder/view=:view/:id/:id' component={PurchaseOrder} />

                            <Route exact path='/attdevices' component={ Devices } />
                            <Route exact path='/guests' component={ Guests } />

                            <Route exact path='/blackboard' component={ BlackBoard } />

                            <Route exact path='/news' component={ News } />
                            <Route exact path='/news/newspaper/:id' component={ NewsPaper } />

                            <Route exact path='/help' component={ Help } />
                            <Route exact path='/drive' component={ Drive } />

                            <Route exact path='/leave_form' component={ LeaveApplication } />
                            <Route exact path='/view_leave_requests' component={ LeaveRequests } />

                            <Route exact path='/attendance_request' component={ AttendanceRequest } />
                            <Route exact path='/attendance_requests' component={ Attandence_Request_Recieve } />

                            <Route exact path='/view_employees_attendance' component={ Attendance } />

                            <Route exact path='/empprofile' component={ EmployeeProfile } />
                            <Route exact path='/empdailyattendance' component={ DailyAttendance } />

                            <Route exact path="/invtry" component={ Assets } />
                            <Route exact path="/invtry_assets" component={InvtryAssets} />

                            <Route exact path="/invtry_assets/new/entry" component={ NewAssetEntry } />

                            <Route exact path="/invtry_assets/invtrysubassets/:id" component={InvtrySubAssets} />

                            <Route exact path='/invtry_pr_requests' component={PRRequests} />
                            <Route exact path="/invtry_pr_requests/invtry_pr_request_details/:id" component={PRRequestDetails} />

                            <Route exact path="/view_invtry_requests" component={ ViewInvtryRequests } />
                            <Route exact path="/view_invtry_requests/employee=:id" component={ ViewInvtryRequests } />
                            <Route exact path="/view_invtry_requests/employee=:id&&request=:id" component={ ViewInvtryRequests } />

                            <Route exact path="/invtry_locations" component={InvtryLocation} />
                            <Route exact path="/invtry_locations/invtrysublocations/:id" component={InvtrySubLocations} />

                            
                            <Route exact path='/invtry/view=purchase_order' component={ PurchaseOrder } />
                            <Route exact path='/invtry/requests=purchase_order' component={ Viewpurchaseorder } />

                            <Route exact path="/purchaserequisition/home" component={ ViewPurchaseRequisition } />
                            <Route exact path="/purchaserequisition/view=:view&&id=:pr_id" component={ ViewPurchaseRequisition } />
                            
                            <Route exact path="/purchaseorder/home" component={ ViewPurchaseOrder } />
                            <Route exact path="/purchaseorder/window=:view&&id=:id" component={ ViewPurchaseOrder } />
                        </div>
                    </Suspense>
                </div>

            </div>
        </>
    )

};

export default Dashboard;