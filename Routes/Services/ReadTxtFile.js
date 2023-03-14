const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const fileRead = require('fs');
// const axios = require('axios');

const NodeCache = require("node-cache");
const myCache = new NodeCache();

router.get('/get_attendance_employees_devices', ( req, res ) => {

    db.query(
        "SELECT employees.emp_id, employees.location_code, employees.time_in, employees.time_out FROM employees;" +
        "SELECT device_id, current_location FROM tblthumbdevices;",
        ( err, rslt ) => {
    
            if ( err )
            {
                console.log( err );
                res.send( err );
                res.end();
            }else
            {
                res.send( rslt );
                res.end();
            }
    
        }
    )

} );

router.post('/mark_employees_thumbs', ( req, res ) => {

    const { data } = req.body;
    const employees_thumbs = JSON.parse( data );
    for ( let x = 0; x < employees_thumbs.length; x++ )
    {

        const d = new Date(employees_thumbs[x].emp_date);
        db.query(
            "INSERT INTO emp_machine_thumbs (emp_id, date, time, location, status, device_id) VALUES (?,?,?,?,?,?)",
            [employees_thumbs[x].emp_id, d, employees_thumbs[x].time, employees_thumbs[x].location, 'valid', employees_thumbs[x].device_id],
            ( err ) => {
        
                if ( err )
                {
                    console.log( err );
                }else
                {
                    console.log("THUMBS UPDATED AT: ", new Date().toTimeString());
                }
        
            }
        )

        if ( ( x + 1 ) === employees_thumbs.length )
        {
            res.send("SUCCESS");
            res.end();
        }

    }

} );

router.post('/mark_employees_attendance', ( req, res ) => {

    const { data } = req.body;
    const employees_attendance = JSON.parse( data );

    db.query(
        "SELECT * FROM `tbl_holidays`;",
        ( err, holidays ) => {
    
            if ( err )
            {
                console.log( err );
            }else
            {
                for ( let x = 0; x < employees_attendance.length; x++ )
                {
                    const d = new Date(employees_attendance[x].emp_date);
                    let status = employees_attendance[x].status;

                    if ( employees_attendance[x].in_out === 'IN' )
                    {
                        db.query(
                            "SELECT emp_id, time_in, time_out FROM emp_attendance WHERE emp_id = ? AND emp_date = ?;",
                            [ employees_attendance[x].emp_id, d.getFullYear() + '-' + ( parseInt(d.getMonth() + 1).toString().length === 1 ? '0' + parseInt(d.getMonth() + 1).toString() : parseInt(d.getMonth() + 1).toString() ) + '-' + ( d.getDate().toString().length === 1 ? '0' + d.getDate().toString() : d.getDate() ) ],
                            ( err, rslt ) => {
                        
                                if ( err )
                                {
                                    console.log( err );
                                }else
                                {
    
                                    for ( let x = 0; x < holidays.length; x++ )
                                    {
                                        const h_d = new Date(holidays[x].day);
    
                                        if ( ( h_d.getFullYear() + '-' + (h_d.getMonth() + 1) + '-' + h_d.getDate() ) === ( d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() ) )
                                        {
                                            status = holidays[x].status;
                                        }
                                    }

                                    if ( !rslt[0] )
                                    {
                                        db.query(
                                            "INSERT INTO `emp_attendance`(`emp_id`, `status`, `time_in`, `emp_date`) VALUES (?,?,?,?);",
                                            [ employees_attendance[x].emp_id, status, employees_attendance[x].time, d ],
                                            ( err ) => {
                                        
                                                if ( err )
                                                {
                                                    console.log( err );
                                                }else
                                                {
                                                    console.log("RECORD INSERTED REF# - EMP-ID => (" + employees_attendance[x].emp_id + ") AT: ", new Date().toTimeString());
                                                }
                                        
                                            }
                                        )
                                    }else
                                    {
                                        db.query(
                                            "UPDATE `emp_attendance` SET time_in = ?, status = ? WHERE emp_id = ? AND emp_date = ?;",
                                            [ 
                                                rslt[0].time_in === 'null' || employees_attendance[x].time < rslt[0].time_in || rslt[0].time_in === null
                                                ?
                                                employees_attendance[x].time
                                                :
                                                rslt[0].time_in,
                                                employees_attendance[x].status,
                                                employees_attendance[x].emp_id, 
                                                d.getFullYear() + '-' + ( parseInt(d.getMonth() + 1).toString().length === 1 ? '0' + parseInt(d.getMonth() + 1).toString() : parseInt(d.getMonth() + 1).toString() ) + '-' + ( d.getDate().toString().length === 1 ? '0' + d.getDate().toString() : d.getDate() ) 
                                            ],
                                            ( err ) => {
                                        
                                                if ( err )
                                                {
                                                    console.log( err );
                                                }else
                                                {
                                                    console.log("RECORD UPDATED REF# - EMP-ID => (" + employees_attendance[x].emp_id + ") AT: ", new Date().toTimeString());
                                                }
                                        
                                            }
                                        )
                                    }
                                }
                        
                            }
                        )
                    }else
                    {
                        db.query(
                            "SELECT emp_id, time_in, time_out FROM emp_attendance WHERE emp_id = ? AND emp_date = ?;",
                            [ employees_attendance[x].emp_id, d.getFullYear() + '-' + ( parseInt(d.getMonth() + 1).toString().length === 1 ? '0' + parseInt(d.getMonth() + 1).toString() : parseInt(d.getMonth() + 1).toString() ) + '-' + ( d.getDate().toString().length === 1 ? '0' + d.getDate().toString() : d.getDate() ) ],
                            ( err, rslt ) => {
                        
                                if ( err )
                                {
                                    console.log( err );
                                }else
                                {
    
                                    for ( let x = 0; x < holidays.length; x++ )
                                    {
                                        const h_d = new Date(holidays[x].day);
    
                                        if ( ( h_d.getFullYear() + '-' + (h_d.getMonth() + 1) + '-' + h_d.getDate() ) === ( d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() ) )
                                        {
                                            status = holidays[x].status;
                                        }
                                    }

                                    if ( !rslt[0] )
                                    {
                                        db.query(
                                            "INSERT INTO `emp_attendance`(`emp_id`, `status`, `time_out`, `emp_date`) VALUES (?,?,?,?);",
                                            [ employees_attendance[x].emp_id, status, employees_attendance[x].time, d ],
                                            ( err ) => {
                                        
                                                if ( err )
                                                {
                                                    console.log( err );
                                                }else
                                                {
                                                    console.log("RECORD INSERTED REF# - EMP-ID => (" + employees_attendance[x].emp_id + ") AT: ", new Date().toTimeString());
                                                }
                                        
                                            }
                                        )
                                    }else
                                    {
                                        db.query(
                                            "UPDATE `emp_attendance` SET time_out = ? WHERE emp_id = ? AND emp_date = ?;",
                                            [
                                                employees_attendance[x].time,
                                                employees_attendance[x].emp_id, 
                                                d.getFullYear() + '-' + ( parseInt(d.getMonth() + 1).toString().length === 1 ? '0' + parseInt(d.getMonth() + 1).toString() : parseInt(d.getMonth() + 1).toString() ) + '-' + ( d.getDate().toString().length === 1 ? '0' + d.getDate().toString() : d.getDate() ) 
                                            ],
                                            ( err ) => {
                                        
                                                if ( err )
                                                {
                                                    console.log( err );
                                                }else
                                                {
                                                    console.log("RECORD UPDATED REF# - EMP-ID => (" + employees_attendance[x].emp_id + ") AT: ", new Date().toTimeString());
                                                }
                                        
                                            }
                                        )
                                    }
                                }
                        
                            }
                        )
                    }
            
                    if ( ( x + 1 ) === employees_attendance.length )
                    {
                        res.send("SUCCESS");
                        res.end();
                    }
            
                }
            }
    
        }
    )

})

// CHECK IF EMPLOYEE IS EXIST OR NOT
db.query(
    "SELECT employees.emp_id, employees.location_code FROM employees;" +
    "SELECT device_id, current_location FROM tblthumbdevices;",
    ( err, rslt ) => {

        myCache.set(
            "employees",
            JSON.stringify( rslt[0] ),
            10000000000
        );

        myCache.set(
            "machines",
            JSON.stringify( rslt[1] ),
            10000000000
        );

    }
)

// READING FILE
const ReadFile = () => {

    fileRead.open(
        'client/text.txt', ( err, fd ) => {

            if ( err ) 
            {

                console.error( err );

            }
            else
            {
                fileRead.readFile(
                    'client/text.txt', 'utf-8', ( err, data ) => {

                        if ( err )
                        {

                            console.error( err );

                        }else
                        {

                                let FirstLine = data.split('\n').shift(); // EXTRACT FIRST LINE
                                let firstColumn = FirstLine.split(',').shift(); // EMPLOYEE ID
                                let lastColumn = FirstLine.split(',').pop().substring(0, 2); // DEVICE LOCATION EXAMPLE: HEADOFFICE, NLC, TPX
                                // let thirdColumn = FirstLine.split(',')[2]; // PUNCH TIMING
                                
                                
                                fileRead.writeFile(
                                    'client/text.txt', '', 'utf-8', ( err ) => {
    
                                        if ( err )
                                        {
                                            
                                            console.error( err );
    
                                        }else
                                        {
                                            
                                            if ( FirstLine.length > 0 )
                                            {

                                                let employees = JSON.parse( myCache.get('employees') );
                                                let machines = JSON.parse( myCache.get('machines') );

                                                console.log( machines );
                                                
                                                let employee;
                                                let machine;
                                                // CHECK IF EMPLOYEE IS EXIST OR NOT
                                                for ( let x = 0; x < employees.length; x++ )
                                                {
                                                    
                                                    if ( employees[x].emp_id === parseInt( firstColumn ) )
                                                    {
                                                        employee = employees[x];
                                                    }
    
                                                }
    
                                                for ( let x = 0; x < machines.length; x++ )
                                                {
    
                                                    if ( machines[x].device_id === parseInt( lastColumn ) )
                                                    {
                                                        machine = machines[x];
                                                    }
    
                                                };
    
                                                if ( employee !== undefined && machine.device_id !== undefined )
                                                {
    
                                                    const d = new Date();
    
                                                    db.query(
                                                        "INSERT INTO emp_machine_thumbs (emp_id, date, time, location, status, device_id) VALUES (?,?,?,?,?,?)",
                                                        [employee.emp_id, d, d.toTimeString(), machine.current_location, 'Waiting', lastColumn],
                                                        (err) => {
    
                                                            if (err) {
    
                                                                console.log(err);
    
                                                            } else {
    
                                                                if ( machine.device_id === 1 )
                                                                {
                                                                    fileRead.close(
                                                                        fd, (err) => {
        
                                                                            if (err) {
                                                                                console.error(err);
                                                                            }
        
                                                                        }
                                                                    )
                                                                }else
                                                                {
                                                                    db.query(
                                                                        "SELECT * FROM emp_attendance WHERE emp_id = ? AND emp_date = ?;",
                                                                        [employee.emp_id, new Date().toISOString().slice(0, 10).replace('T', ' ')],
                                                                        (err, rslt) => {
                    
                                                                            if (err) {
                    
                                                                                console.log(err);
                    
                                                                            } else {
                    
                                                                                if ( !rslt[0] )
                                                                                {
                                                                                    db.query(
                                                                                        'SELECT time_in, time_out FROM employees WHERE emp_id = ' + employee.emp_id,
                                                                                        ( err, rslt ) => {
                                                                                
                                                                                            if( err )
                                                                                            {
                                                                                
                                                                                                console.log(err);
                                                                                
                                                                                            }else 
                                                                                            {
                                                                                                
                                                                                                let time1 = rslt[0].time_in.substring(3, 5);
                                                                                                let time2 = d.toTimeString();
                                                                                                time1 = parseInt(time1) + 16;
                                                                                                time1 = rslt[0].time_in.substring(0, 3) + time1.toString() + ':00';
                                                                                
                                                                                                let status = 'Present';
                                                                                                
                                                                                                if ( time2 > time1 )
                                                                                                {
                                                                                                    status = 'Late';
                                                                                                }
                                                                                
                                                                                                db.query(
                                                                                                    'INSERT IGNORE INTO emp_attendance (emp_id, status, time_in, emp_date) VALUES (?,?,?,?)',
                                                                                                    [ employee.emp_id, status, d.toTimeString(), d ],
                                                                                                    ( err ) => {
                                                                                            
                                                                                                        if( err )
                                                                                                        {
                                                                                            
                                                                                                            console.log(err);
                                                                                            
                                                                                                        }else 
                                                                                                        {
                                                                
                                                                                                            console.log("SUCCESS AT :", new Date().toTimeString());
                                                                                            
                                                                                                        }
                                                                                            
                                                                                                    }
                                                                                                )
                                                                                
                                                                                            }
                                                                                
                                                                                        }
                                                                                    )
                                                                                }else
                                                                                {
                                                                                    db.query(
                                                                                        "UPDATE emp_attendance SET time_out = '" + new Date().toTimeString() + "' WHERE emp_id = " + employee.emp_id + " AND emp_attendance.emp_date = '" + new Date().getFullYear() + '-' + ( parseInt(new Date().getMonth() + 1).toString().length === 1 ? '0' + parseInt(new Date().getMonth() + 1).toString() : parseInt(new Date().getMonth() + 1).toString() ) + '-' + ( new Date().getDate().toString().length === 1 ? '0' + new Date().getDate().toString() : new Date().getDate() ) + "'",
                                                                                        ( err ) => {
                                                                                
                                                                                            if( err )
                                                                                            {
                                                                                
                                                                                                console.log(err);
                                                                                
                                                                                            }else 
                                                                                            {
                                                                                
                                                                                                console.log("SUCCESS AT: ", new Date().toTimeString());
                                                                                
                                                                                            }
                                                                                
                                                                                        }
                                                                                    )
                                                                                }
                
                                                                            }
                                                                        }
                                                                    );
                                                                }

                                                            }
                                                        }
                                                    );
    
                                                }
                                            }else
                                            {
                                                fileRead.close(
                                                    fd, (err) => {

                                                        if (err) {
                                                            console.error(err);
                                                        }

                                                    }
                                                )
                                            }

                                        }
    
                                    }
                                )
    

                        }

                    }
                )
            }

        }
    )

}

setInterval(() => {
    ReadFile();
}, 500);

module.exports = router;