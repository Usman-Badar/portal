import React, { useEffect } from 'react';

import './AdminModule.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import Sidebar from './Components/SideBar/SideBar';
import TopBar from './Components/TopBar/TopBar';
import Breadcrumbs from './Components/Breadcrumbs/Breadcrumbs';
import Home from './Pages/Home/Home';
import Employement_Requests from './Pages/Employement_Setup/Employement_Requests/Employement_Requests';
import Admin_View_Employees from './Pages/Employement_Setup/Employement_Requests/Admin_View_Employees/Admin_View_Employees';
import Employement_Form from './Pages/Employement_Setup/EmployeeSetup/EmployeeForm';
import Departments from './Pages/Departments/Departments';
import Designations from './Pages/Departments/Designations/Designations';
import ViewTempEmployee from './Pages/Employement_Setup/Employement_Requests/ViewTempEmployee/ViewTempEmployee';
import ConfirmApproval from './Pages/Employement_Setup/Employement_Requests/ViewTempEmployee/ConfirmApproval/ConfirmApproval';
import Companies from './Pages/Companies/Companies';
import Locations from './Pages/Locations/Locations';
import SubLocations from './Pages/Locations/SubLocations/SubLocations';
import Users from './Pages/Users/Users';
import CreateUser from './Pages/Users/CreateUser/CreateUser';
import EmployeesAttendance from './Pages/EmployeesAttendance/EmployeesAttendance';
import AdminLogbook from './Pages/AdminLogbook/AdminLogbook';



const AdminModule = () => {

    const history = useHistory();

    useEffect(
        () => {

            if (sessionStorage.getItem('UserID') === undefined || sessionStorage.getItem('UserID') === null) {
                history.replace('/admin_login');
            }

        }, [history]
    )

    return (
        <>
            <div className='AdminModule'>
                <Sidebar />

                <div className="Admin_Dashboard_main_content">
                    {/* TopBar Start From Here */}
                    <TopBar />
                    {/* TopBar End here */}
                    <div className="content">
                        <Breadcrumbs />
                        <Route exact path='/admin_module' component={Home} />
                        <Route exact path='/admin_employement_requests' component={Employement_Requests} />
                        <Route exact path='/admin_employement_requests/admin_employement_setup' component={Employement_Form} />
                        <Route exact path='/admin_view_employees' component={Admin_View_Employees} />
                        <Route exact path='/admin_employement_requests/admin_view_temp_employee/:id' component={ViewTempEmployee} />
                        <Route exact path='/admin_employement_requests/confirmapproval/:id' component={ConfirmApproval} />
                        <Route exact path='/admin_companies' component={Companies} />
                        <Route exact path='/admin_locations' component={Locations} />
                        <Route exact path='/admin_locations/:id&&find=sublocation' component={SubLocations} />
                        <Route exact path='/admin_departments' component={Departments} />
                        <Route exact path='/admin_departments/admin_designations/:id' component={Designations} />
                        <Route exact path='/admin_users' component={Users} />
                        <Route exact path='/createuser' component={CreateUser} />
                        <Route exact path='/admin_emp_attendance' component={ EmployeesAttendance } />
                        <Route exact path='/admin_logbook' component={ AdminLogbook } />
                        
                    </div>
                </div>
            </div>
        </>
    )

}

export default AdminModule;