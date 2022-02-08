const express = require('express');
const path = require('path');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const compression = require('compression')
const fs = require('fs');

const NodeCache = require("node-cache");
const myCache = new NodeCache();

const d = new Date();

process.on('uncaughtException', function (err) {
    console.error( d.toLocaleDateString(), err);
});

const http = require('http');
const https = require('https');

const sslserver = https.createServer(
    {
        key: fs.readFileSync('client/SSL/key.pem'),
        cert: fs.readFileSync('client/SSL/cert.pem')
    },
    app
)

// CREATE SOCKET
const io = require('socket.io')( sslserver,
    {
        cors: {
            origin: "*",
            methods: ['GET','POST']
        }
    }
);

module.exports = io;
    
const PORT = process.env.PORT || 8888;

// different express packages other things

app.use( cors() );
app.use( express.json() );
app.use( express.static( path.join( __dirname, 'client' ) ) );
app.use( fileUpload() );
app.use( compression() );

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

// if ( process.env.NODE_ENV === 'production' )
// {
    //     app.use( express.static( 'client/' ) );
//     app.get("*", (req, res) => {
        
//         res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
    
//     });
// }

// app.get('/', function ( req, res ) {
//     res.sendFile( path.join( __dirname, 'client', 'index.html' ) );
// })

// Following route for user authentication i.e login/logout
app.use( require('./Routes/Auth/auth') );

// Following route for employee logs
app.use( require('./Routes/Employee/logs') );

// Following route for employee form
app.use( require('./Routes/Employee/employee') );

// Following route for employee attendance
app.use( require('./Routes/Attendance/attendance') );

// Following route for employee descussions
app.use( require('./Routes/Employee/descussions') );

// Following route for employee companies
app.use( require('./Routes/Companies/companies') );

// Following route for employee attendance devices
app.use( require('./Routes/Attendance/devices') );

// Following route for employee attendance devices in/out
app.use( require('./Routes/Attendance/inout') );

// Following route for guest registration
app.use( require('./Routes/Attendance/guests') );

// Following route for employee departments
app.use( require('./Routes/Companies/departments') );

// Following route for employee designations
app.use( require('./Routes/Companies/designations') );

// Following route for employee locations
app.use( require('./Routes/Locations/locations') );

// Following route for employee sub locations
app.use( require('./Routes/Locations/sub_locations') );

// Following route for employee grades
app.use( require('./Routes/Companies/grades') );

// Following route for employee access
app.use( require('./Routes/Companies/access') );

// Following route for custom web services
app.use( require('./Routes/Services/ReadTxtFile') );

// Following route for custom web services
app.use( require('./Routes/Services/markEmpAbsent') );

// Following route for set status to valid
app.use( require('./Routes/Services/SetInOutStatusToValid') );

// Following route for employee leave
app.use( require('./Routes/Employee/leave') );

// Following route for inventory categories
app.use( require('./Routes/Inventory/Assets/category') );

// Following route for inventory sub categories
app.use( require('./Routes/Inventory/Assets/sub_category') );

// Following route for inventory PR requests
app.use( require('./Routes/Inventory/purchaserequisition') );

// Following route for inventory PO requests
app.use( require('./Routes/Inventory/purchaseorder') );

// Following route for chat
app.use( require('./Routes/Employee/chat') );

// Following route for employee guests
app.use( require('./Routes/Employee/guests') );

// Following route for employee courses
app.use( require('./Routes/Employee/courses') );

// Following route for employee attendance
app.use( require('./Routes/Employee/attendance') );

// Following route for employee news paper
app.use( require('./Routes/Employee/newspaper') );

// Following route for employee notifications
app.use( require('./Routes/Employee/notifications') );

// Following route for employee drive
app.use( require('./Routes/Employee/drive') );

// Following route for Employee Attendance Requests
app.use( require('./Routes/Employee/attendance_requests') );

// Following route for Admin Module users
app.use( require('./Routes/Admin_Modules/auth') );

// Following route for Admin Module users
app.use( require('./Routes/Admin_Modules/users') );

// Following route for Admin Module users
app.use( require('./Routes/Admin_Modules/user_roles') );

// the following block of code is to define the port number which is dynamic

setInterval(() => {
    sslserver.getConnections(function(error, count) {
        // console.log( error );
        console.log( count );
    });
}, 1000);


sslserver.listen(PORT, () => {
    
    console.log(`Server run on localhost:${PORT} with id = ${ process.pid }`);
    
});