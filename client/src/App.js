import React, { lazy, Suspense } from 'react';

import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom';
import Loading from './Components/UI/Loading/Loading';
import POPrintUI from './Components/EmployeeProtal/Dashboard/Components/PO_PrintUI/PO_PrintUI';
import PRprintUI from './Components/EmployeeProtal/Dashboard/Components/PR_printUI/PR_printUI';
import Vouchers from './Components/EmployeeProtal/Dashboard/Components/Vouchers/Vouchers';
import Quatation from './Components/EmployeeProtal/Dashboard/Components/Quatation/Quatation';
import Bills from './Components/EmployeeProtal//Dashboard/Components/Bills/Bills';

import LoadingIcon from './images/loadingIcons/icons8-loading-circle.gif';

const Login = lazy( () => import( './Components/EmployeeProtal/Auth/Login/Login' ) );
const Dashboard = lazy( () => import( './Components/EmployeeProtal/Dashboard/Dashboard' ) );
const Logout = lazy( () => import( './Components/EmployeeProtal/Auth/Logout/Logout' ) );

const AdminModule = lazy( () => import( './Components/AdminModule/AdminModule' ) );
const AdminLogin = lazy( () => import( './Components/AdminModule/Admin_login/Admin_login' ) );
const AdminLogout = lazy( () => import( './Components/AdminModule/Admin_Logout/Admin_Logout' ) );

// Attendance
const Home = lazy( () => import( './Components/Attendance/Pages/Home/Home' ) );
const AttDashboard = lazy( () => import( './Components/Attendance/Pages/Dashboard/Dashboard' ) );
const AttLogin = lazy( () => import( './Components/Attendance/Pages/Login/Login' ) );
const Operations = lazy( () => import( './Components/Attendance/Pages/Operations/Operations' ) );

const OutOfLocation = lazy( () => import( './Components/EmployeeProtal/OutOfLocation/OutOfLocation' ) );

const InventoryDashboard = lazy( () => import( './Components/Inventory/Inventory' ) );

// const Leave = lazy( () => import( './Components/Leave/Leave' ) );

const App = () => {

    require('dotenv').config();

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
                <Switch>

                    {/* 
                        For Employee Portal
                    */}

                    <Redirect exact path='/' to='/login' />
                    <Route exact path='/dashboard' render={ () => <Sus content={ <Dashboard /> }/> } />

                    <Route exact path='/chat' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/blackboard' render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path='/outoflocation' render={ () => <Sus content={ <OutOfLocation /> } /> } />
                    <Route exact path='/login' render={ () => <Sus content={ <Login /> } /> } />
                    <Route exact path='/logout' render={ () => <Sus content={ <Logout /> } /> } />
                    <Route exact path='/descuss_chat/:id' render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path='/purchaserequisition/view=:view' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/purchaserequisition/view=form' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/purchaserequisition/view=:view/:pr_id' render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path='/purchaserorder' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/purchaseorder/view=:view' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/purchaseorder/view=:view/:id/:id' render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path='/attdevices' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/guests' render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path='/news' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/news/newspaper/:id' render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path='/help' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/drive' render={ () => <Sus content={ <Dashboard /> } /> } />

                    {/* LEAVE MODULE */}
                    
                    {/* <Route exact path='/leave/dashboard' render={ () => <Sus content={ <Leave /> } /> } />
                    <Route exact path='/leave/leave_form' render={ () => <Sus content={ <Leave /> } /> } />
                    <Route exact path='/leave/availed_leave_form' render={ () => <Sus content={ <Leave /> } /> } />
                    <Route exact path='/leave/short_leave_form' render={ () => <Sus content={ <Leave /> } /> } />
                    <Route exact path='/leave/requests' render={ () => <Sus content={ <Leave /> } /> } />
                    <Route exact path='/leave/requests/:id' render={ () => <Sus content={ <Leave /> } /> } /> */}


                    <Route exact path='/leave_form' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/avail_leave_form' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/short_leave_form' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/leave_history' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/leave_request/:id' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/view_leave_requests' render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path='/attendance_request' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/attendance_request/:id' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/attendance_requests' render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path='/view_employees_attendance' render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path='/profile/:path/:link' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/empdailyattendance' render={ () => <Sus content={ <Dashboard /> } /> } />

                    {/* 
                        For Admin Module
                    */}

                    <Route exact path='/admin_login' render={ () => <Sus content={ <AdminLogin /> } /> } />
                    <Route exact path='/admin_logout' render={ () => <Sus content={ <AdminLogout /> } /> } />
                    <Route exact path='/admin_module' render={ () => <Sus content={ <AdminModule /> } /> } />
                    <Route exact path='/admin_employement_requests' render={ () => <Sus content={ <AdminModule /> } /> } />
                    <Route exact path='/admin_employement_requests/admin_employement_setup' render={ () => <Sus content={ <AdminModule /> } /> } />
                    <Route exact path='/admin_employement_requests/admin_view_temp_employee/:id' render={ () => <Sus content={ <AdminModule /> } /> } />
                    <Route exact path='/admin_employement_requests/confirmapproval/:id' render={ () => <Sus content={ <AdminModule /> } /> } />
                    <Route exact path='/admin_companies' render={ () => <Sus content={ <AdminModule /> } /> } />
                    <Route exact path='/admin_locations' render={ () => <Sus content={ <AdminModule /> } /> } />
                    <Route exact path='/admin_departments' render={ () => <Sus content={ <AdminModule /> } /> } />
                    <Route exact path='/admin_departments/admin_designations/:id' render={ () => <Sus content={ <AdminModule /> } /> } />
                    <Route exact path='/admin_users' render={ () => <Sus content={ <AdminModule /> } /> } />
                    <Route exact path='/admin_emp_attendance' render={ () => <Sus content={ <AdminModule /> } />  } />
                    <Route exact path='/createuser' render={ () => <Sus content={ <AdminModule /> } /> } />
                    <Route exact path='/menu_setup' render={ () => <Sus content={ <AdminModule /> } /> } />
                    <Route exact path='/misc_setup' render={ () => <Sus content={ <AdminModule /> } /> } />
                    <Route exact path='/configure_attendance_request' render={ () => <Sus content={ <AdminModule /> } /> } />

                    {/* 
                        For Attendance
                    */}
                    <Route exact path='/atthome' render={ () => <Sus content={ <Home /> } /> } />
                    <Route exact path='/attdashboard' render={ () => <Sus content={ <AttDashboard /> } /> } />
                    <Route exact path='/attdevicesetup' render={ () => <Sus content={ <AttDashboard /> } /> } />
                    <Route exact path='/setattendance' render={ () => <Sus content={ <AttDashboard /> } /> } />
                    <Route exact path='/attviewemps' render={ () => <Sus content={ <AttDashboard /> } /> } />
                    <Route exact path='/attrviewguest' render={ () => <Sus content={ <AttDashboard /> } /> } />
                    <Route exact path='/arrivedemp' render={ () => <Sus content={ < AttDashboard /> } />  } />
                    <Route exact path='/attrgstrguest' render={ () => <Sus content={ <AttDashboard /> } /> } />
                    <Route exact path='/empdetails/:id' render={ () => <Sus content={ <AttDashboard /> } /> } />
                    <Route exact path='/notifications' render={ () => <Sus content={ <AttDashboard /> } /> } />
                    <Route exact path='/operations' render={ () => <Sus content={ <Operations /> } /> } />

                    <Route exact path='/attlogin' render={ () => <Sus content={ <AttLogin /> } /> } />

                    {/* FOR INVENTORY MODULE */}
                    
                    <Route exact path='/inventory/dashboard' render={ () => <Sus content={ <InventoryDashboard /> } /> } />
                    <Route exact path='/inventory/assets' render={ () => <Sus content={ <InventoryDashboard /> } /> } />
                    <Route exact path='/inventory/asset/id=:asset_id&&name=:asset_name&&view=:view' render={ () => <Sus content={ <InventoryDashboard /> } /> } />
                    <Route exact path='/inventory/items_names' render={ () => <Sus content={ <InventoryDashboard /> } /> } />
                    <Route exact path='/inventory/new_items_names' render={ () => <Sus content={ <InventoryDashboard /> } /> } />


                    {/* 
                        For Inventory
                    */}
                    {/* <Route exact path='/invtry' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/invtry_assets" render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/invtry_assets/invtrysubassets/:id' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/invtry_assets/new/entry" render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path='/invtry_pr_requests' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path='/invtry_pr_requests/invtry_pr_request_details/:id' render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path="/view_invtry_requests" render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/view_invtry_requests/employee=:id" render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path="/invtry_locations" render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/invtry_locations/invtrysublocations/:id" render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/invtry_locations/invtrysublocations/:id&&request=:id" render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path='/invtry_Login' render={ () => <Sus content={ <InvtryLogin /> } /> } />
                    <Route exact path='/invtry_logout' render={ () => <Sus content={ <InvtryLogOut /> } /> } />

                    <Route exact path='/invtry/view=purchase_order' render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/invtry/requests=purchase_order" render={ () => <Sus content={ <Dashboard /> } /> } /> */}

                    {/* VIEWS */}
                    <Route exact path="/view=purchase_order/:id/:id" render={ () => <Sus content={ <POPrintUI /> } /> } />
                    <Route exact path="/view=purchase_requisition/:id" render={ () => <Sus content={ <PRprintUI /> } /> } />
                    <Route exact path="/view=quotations/:id" render={ () => <Sus content={ <Quatation /> } /> } />
                    <Route exact path="/view=bills/:id" render={ () => <Sus content={ <Bills /> } /> } />
                    <Route exact path="/view=vouchers/:id" render={ () => <Sus content={ <Vouchers /> } /> } />

                    {/* 
                        For Procurement
                    */}

                    <Route exact path="/purchaserequisition/home" render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/purchaserequisition/view=:view&&id=:pr_id" render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path="/purchaseorder/home" render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/purchaseorder/window=:view&&id=:id" render={ () => <Sus content={ <Dashboard /> } /> } />

                    <Route exact path="/employment_setup" render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/employment_setup/:view" render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/employment_setup/requests/:id" render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/employment_setup/requests/confirm/:id" render={ () => <Sus content={ <Dashboard /> } /> } />

                    {/* 
                        FOR STORE MODULE
                    */}
                    <Route exact path="/store/:path" render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/store/:path/index=:index" render={ () => <Sus content={ <Dashboard /> } /> } />
                    
                    {/* 
                        FOR ITEM REQUESTS
                    */}
                    <Route exact path="/item_requests" render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/item_requests/:path" render={ () => <Sus content={ <Dashboard /> } /> } />
                    <Route exact path="/item_requests/:path/index=:index" render={ () => <Sus content={ <Dashboard /> } /> } />


                    {/* REPAIR REQUEST */}
                    <Route exact path="/repair_request" render={ () => <Sus content={ <Dashboard /> } /> } />
                </Switch>
            </>
        )
}

export default App;