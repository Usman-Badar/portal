import React, { lazy, Suspense } from 'react';

import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom';
import Loading from './Components/UI/Loading/Loading';
import PO_PrintUI from './Components/EmployeeProtal/Dashboard/Components/PO_PrintUI/PO_PrintUI';
import PR_printUI from './Components/EmployeeProtal/Dashboard/Components/PR_printUI/PR_printUI';
import Vouchers from './Components/EmployeeProtal/Dashboard/Components/Vouchers/Vouchers';
import Quatation from './Components/EmployeeProtal/Dashboard/Components/Quatation/Quatation';
import Bills from './Components/EmployeeProtal//Dashboard/Components/Bills/Bills';

import LoadingIcon from './images/loadingIcons/icons8-loading-circle.gif';

const Login = lazy( () => import( './Components/EmployeeProtal/Auth/Login/Login' ) );
const Dashboard = lazy( () => import( './Components/EmployeeProtal/Dashboard/Dashboard' ) );
const Logout = lazy( () => import( './Components/EmployeeProtal/Auth/Logout/Logout' ) );

const AdminModule = lazy( () => import( './Components/AdminModule/AdminModule' ) );
const Admin_login = lazy( () => import( './Components/AdminModule/Admin_login/Admin_login' ) );
const Admin_logout = lazy( () => import( './Components/AdminModule/Admin_Logout/Admin_Logout' ) );

// Attendance
const Home = lazy( () => import( './Components/Attendance/Pages/Home/Home' ) );
const AttDashboard = lazy( () => import( './Components/Attendance/Pages/Dashboard/Dashboard' ) );
const AttLogin = lazy( () => import( './Components/Attendance/Pages/Login/Login' ) );
const Operations = lazy( () => import( './Components/Attendance/Pages/Operations/Operations' ) );

const InvtryLogin = lazy( () => import( './Components/Inventory/InvtryLogin/InvtryLogin' ) );
const InvtryLogOut = lazy( () => import( './Components/Inventory/Invtry_Logout/Invtry_Logout' ) );
const OutOfLocation = lazy( () => import( './Components/EmployeeProtal/OutOfLocation/OutOfLocation' ) );

const App = () => {

    // window.onload = function () {
    //     var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart; 
    //     console.log('Page load time is '+ loadTime);
    // }

    // const geolocation = require('geolocation');
    // const history = useHistory();

    // useEffect(
    //     () => {

            // geolocation.getCurrentPosition( 
            //     function ( err, position ) 
            //     {
            //         if (err) throw err
            //         console.log(position.coords);
            //         if (position.coords.latitude < 67.017000 && position.coords.longitude < 24.8150000) 
            //         {
            //             history.push('/outoflocation');
            //         }else 
            //         {
            //             console.log('You are in head office');
            //             // history.push('/outoflocation');
            //         }
            //     } 
            // );

        // }, [ geolocation, history ]
    // );
    
        return ( 
            <>
                <Suspense 
                    fallback={ 
                        <Loading 
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
                    }
                >
                    <Switch>

                        {/* 
                            For Employee Portal
                        */}

                        <Redirect exact path='/' to='/login' />
                        <Route exact path='/dashboard' component={Dashboard} />

                        <Route exact path='/chat' component={Dashboard} />
                        <Route exact path='/blackboard' component={Dashboard} />

                        <Route exact path='/outoflocation' component={OutOfLocation} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/logout' component={Logout} />
                        <Route exact path='/descuss_chat/:id' component={Dashboard} />

                        <Route exact path='/purchaserequisition/view=:view' component={Dashboard} />
                        <Route exact path='/purchaserequisition/view=form' component={Dashboard} />
                        <Route exact path='/purchaserequisition/view=:view/:pr_id' component={Dashboard} />

                        <Route exact path='/purchaserorder' component={Dashboard} />
                        <Route exact path='/purchaseorder/view=:view' component={Dashboard} />
                        <Route exact path='/purchaseorder/view=:view/:id/:id' component={Dashboard} />

                        <Route exact path='/attdevices' component={Dashboard} />
                        <Route exact path='/guests' component={Dashboard} />

                        <Route exact path='/news' component={Dashboard} />
                        <Route exact path='/news/newspaper/:id' component={Dashboard} />

                        <Route exact path='/help' component={Dashboard} />
                        <Route exact path='/drive' component={Dashboard} />

                        <Route exact path='/leave_form' component={Dashboard} />
                        <Route exact path='/view_leave_requests' component={Dashboard} />

                        <Route exact path='/attendance_request' component={Dashboard} />
                        <Route exact path='/attendance_requests' component={Dashboard} />

                        <Route exact path='/view_employees_attendance' component={Dashboard} />

                        <Route exact path='/empprofile' component={Dashboard} />
                        <Route exact path='/empdailyattendance' component={Dashboard} />

                        {/* 
                            For Admin Module
                        */}

                        <Route exact path='/admin_login' component={Admin_login} />
                        <Route exact path='/admin_logout' component={Admin_logout} />
                        <Route exact path='/admin_module' component={AdminModule} />
                        <Route exact path='/admin_employement_requests' component={AdminModule} />
                        <Route exact path='/admin_employement_requests/admin_employement_setup' component={AdminModule} />
                        <Route exact path='/admin_employement_requests/admin_view_temp_employee/:id' component={AdminModule} />
                        <Route exact path='/admin_employement_requests/confirmapproval/:id' component={AdminModule} />
                        <Route exact path='/admin_companies' component={AdminModule} />
                        <Route exact path='/admin_locations' component={AdminModule} />
                        <Route exact path='/admin_departments' component={AdminModule} />
                        <Route exact path='/admin_departments/admin_designations/:id' component={AdminModule} />
                        <Route exact path='/admin_users' component={AdminModule} />
                        <Route exact path='/admin_emp_attendance' component={ AdminModule } />
                        <Route exact path='/createuser' component={AdminModule} />

                        {/* 
                            For Attendance
                        */}
                        <Route exact path='/atthome' component={Home} />
                        <Route exact path='/attdashboard' component={AttDashboard} />
                        <Route exact path='/attdevicesetup' component={AttDashboard} />
                        <Route exact path='/setattendance' component={AttDashboard} />
                        <Route exact path='/attviewemps' component={AttDashboard} />
                        <Route exact path='/attrviewguest' component={AttDashboard} />
                        <Route exact path='/arrivedemp' component={ AttDashboard } />
                        <Route exact path='/attrgstrguest' component={AttDashboard} />
                        <Route exact path='/empdetails/:id' component={AttDashboard} />
                        <Route exact path='/notifications' component={AttDashboard} />
                        <Route exact path='/operations' component={Operations} />

                        <Route exact path='/attlogin' component={AttLogin} />


                        {/* 
                            For Inventory
                        */}
                        <Route exact path='/invtry' component={ Dashboard } />
                        <Route exact path="/invtry_assets" component={ Dashboard } />
                        <Route exact path='/invtry_assets/invtrysubassets/:id' component={ Dashboard } />
                        <Route exact path="/invtry_assets/new/entry" component={ Dashboard } />

                        <Route exact path='/invtry_pr_requests' component={ Dashboard } />
                        <Route exact path='/invtry_pr_requests/invtry_pr_request_details/:id' component={ Dashboard } />

                        <Route exact path="/view_invtry_requests" component={ Dashboard } />
                        <Route exact path="/view_invtry_requests/employee=:id" component={ Dashboard } />

                        <Route exact path="/invtry_locations" component={ Dashboard } />
                        <Route exact path="/invtry_locations/invtrysublocations/:id" component={ Dashboard } />
                        <Route exact path="/invtry_locations/invtrysublocations/:id&&request=:id" component={ Dashboard } />

                        <Route exact path='/invtry_Login' component={InvtryLogin} />
                        <Route exact path='/invtry_logout' component={InvtryLogOut} />

                        <Route exact path='/invtry/view=purchase_order' component={ Dashboard } />
                        <Route exact path="/invtry/requests=purchase_order" component={ Dashboard } />

                        {/* VIEWS */}
                        <Route exact path="/view=purchase_order/:id/:id" component={ PO_PrintUI } />
                        <Route exact path="/view=purchase_requisition/:id" component={ PR_printUI } />
                        <Route exact path="/view=quotations/:id" component={ Quatation } />
                        <Route exact path="/view=bills/:id" component={ Bills } />
                        <Route exact path="/view=vouchers/:id" component={ Vouchers } />

                        {/* 
                            For Procurement
                        */}

                        <Route exact path="/purchaserequisition/home" component={ Dashboard } />
                        <Route exact path="/purchaserequisition/view=:view&&id=:pr_id" component={ Dashboard } />

                        <Route exact path="/purchaseorder/home" component={ Dashboard } />
                        <Route exact path="/purchaseorder/window=:view&&id=:id" component={ Dashboard } />
                    </Switch>
                </Suspense>
            </>
        )
}

export default App;