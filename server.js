const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const compression = require('compression')
const fs = require('fs');

const d = new Date();

process.on('uncaughtException', function (err) {

    fs.appendFile(
        'logs/log_' + d.toISOString().substring(0,10) + '.txt',
        d.toTimeString() + '\n' +
        'type: error' + '\n' +
        err.toString() + '\n' +
        '\n',
        'utf-8',
        ( err ) => {

            if ( err )
            {
                console.error(
                    err
                );
            }

        }
    )

});

const http = require('http');
const https = require('https');

// const sslserver = https.createServer(
//     {
//         key: fs.readFileSync('client/SSL/key.pem'),
//         cert: fs.readFileSync('client/SSL/cert.pem')
//     },
//     app
// )

const sslserver = http.createServer(app);

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

// different express packages other things
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use( cors() );
app.use( express.json() );

// simulate delay response
app.use((req, res, next) => {
    setTimeout(() => next(), 1500);
});

app.use("/client", express.static(__dirname + "/client"));
app.use("/assets", express.static(__dirname + "/assets"));
app.use( fileUpload() );
app.use( compression() );
require('dotenv').config();

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

// app.get('/', function ( req, res ) {
//     res.sendFile( path.join( __dirname, 'client', 'index.html' ) );
// })

app.get('/testing', function ( req, res ) {
    res.send('success');
})

// Following route for user authentication i.e login/logout
app.use( require('./Routes/Auth/auth') );

// Following route for employee logs
app.use( require('./Routes/Employee/logs').router );

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



app.use( require('./Routes/Inventory/assets') );





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

// STORE MODULE APIS
app.use( require('./Routes/Store/store') );

// ITEM REQUESTS
app.use( require('./Routes/ItemRequests/itemrequests') );

// EMPLOYEE PROFILE
app.use( require('./Routes/Employee/profile') );

// ADMIN ROUTES
app.use( require('./Routes/Admin_Modules/menu') );



















// INVENTORY - STORE MODULE
app.use( require('./Inventory/home') );
app.use( require('./Inventory/products').router );
app.use( require('./Inventory/auth') );
app.use( require('./Inventory/vender') );
app.use( require('./Inventory/locations') );
app.use( require('./Inventory/categories') );
app.use( require('./Inventory/itemrequests') );
app.use( require('./Inventory/repair_request') );




// ATTENDANCE - ATTENDANCE MANAGEMENT SYSTEM
app.use( require('./Attendance/auth') );








// WHATSAPP ROUTES
app.use( require('./Routes/Whatsapp/whatsapp').router );












// MANAGEMENT - ADMIN DASHBOARD SYSTEM
app.use( require('./Management/auth') );
app.use( require('./Management/attendance') );









// AI - AUTO SYSTEM
app.use( require('./Routes/AI/reminders') );


sslserver.listen(process.env.SERVER_PORT, () => {

    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        const tbl = [
            {
                server: "PORTAL",
                status: "RUNNING",
                host: add,
                port: process.env.SERVER_PORT,
                process_id: process.pid
            }
        ]
        console.table(tbl);
        console.log('\n');
        console.log( `\t Please open URL: ${add}:${process.env.SERVER_PORT} in the browser.` );
    })

});