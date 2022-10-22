import './App.css';

import { Switch, Route } from 'react-router-dom';

// Attendance
import Home from './Components/Attendance/Pages/Home/Home';
import AttDashboard from './Components/Attendance/Pages/Dashboard/Dashboard';
import AttLogin from './Components/Attendance/Pages/Login/Login';
import Operations from './Components/Attendance/Pages/Operations/Operations';

function App() {
  return (
    <Switch>

      {/* 
        For Attendance
      */}
      <Route exact path='/' component={Home} />
      <Route exact path='/attdashboard' component={AttDashboard} />
      <Route exact path='/attdevicesetup' component={AttDashboard} />
      <Route exact path='/setattendance' component={AttDashboard} />
      <Route exact path='/attviewemps' component={AttDashboard} />
      <Route exact path='/attrviewguest' component={AttDashboard} />
      <Route exact path='/attrgstrguest' component={AttDashboard} />
      <Route exact path='/empdetails/:id' component={AttDashboard} />
      <Route exact path='/notifications' component={AttDashboard} />
      <Route exact path='/operations' component={Operations} />

      <Route exact path='/attlogin' component={AttLogin} />

    </Switch>
  );
}

export default App;
