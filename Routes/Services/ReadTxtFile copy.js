const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const fileRead = require('fs');

const NodeCache = require("node-cache");
const myCache = new NodeCache();

const io = require('../../server');


io.on('connection', ( socket ) => {

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

            }else
            {
                // CHECK IF EMPLOYEE IS EXIST OR NOT
                connection.query(
                    "SELECT employees.emp_id, employees.location_code FROM employees;" +
                    "SELECT attendance_mode, location_code FROM locations;",
                    ( err, rslt ) => {

                        if ( err )
                        {
                            connection.release();
                        }else
                        {

                            myCache.set(
                                "employees",
                                JSON.stringify( rslt[0] ),
                                10000000
                            );

                            myCache.set(
                                "locations",
                                JSON.stringify( rslt[1] ),
                                10000000
                            );

                            ReadFile();

                        }

                    }
                )
            }

        }
    )
    
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
                                    let thirdColumn = FirstLine.split(',')[2]; // PUNCH TIMING
        
                                    // REMOVE FIRST LINE FROM THE DATA AND GET THE NEW VALUE
                                    // let newVal = data.split('\n').filter(
                                    //     (val) => {
                                    //         return val !== FirstLine;
                                    //     }
                                    // )

                                    // newVal.join('\n')
                                    if ( data !== '' )
                                    {

                                        fileRead.writeFile(
                                            'client/text.txt', '', 'utf-8', ( err ) => {
            
                                                if ( err )
                                                {
            
                                                    console.error( err );
            
                                                }else
                                                {
            
                                                    db.getConnection(
                                                        ( err, connection ) => {
        
                                                            if ( err )
                                                            {
                                                            }else
                                                            {

                                                                connection.release();
                                                                let employees = JSON.parse( myCache.get('employees') );
                                                                let locations = JSON.parse( myCache.get('locations') );
                                                                
                                                                let employee;
                                                                let location;
                                                                // CHECK IF EMPLOYEE IS EXIST OR NOT
                                                                for ( let x = 0; x < employees.length; x++ )
                                                                {

                                                                    if ( employees[x].emp_id === parseInt( firstColumn ) )
                                                                    {
                                                                        employee = employees[x];
                                                                    }

                                                                }

                                                                for ( let x = 0; x < locations.length; x++ )
                                                                {

                                                                    if ( locations[x].location_code === parseInt( lastColumn ) )
                                                                    {
                                                                        location = locations[x];
                                                                    }

                                                                }

                                                                if ( employee !== undefined && location.attendance_mode === 'tablet' )
                                                                {

                                                                    const d = new Date();

                                                                    connection.query(
                                                                        "INSERT INTO emp_machine_thumbs (emp_id, date, time, location, status) VALUES (?,?,?,?,?)",
                                                                        [employee.emp_id, d, d.toTimeString(), employee.location_code, 'Waiting'],
                                                                        (err) => {

                                                                            if (err) {

                                                                                console.log(err);
                                                                                connection.release();

                                                                            } else {

                                                                                fileRead.close(
                                                                                    fd, (err) => {

                                                                                        if (err) {
                                                                                            console.error(err);
                                                                                        } else {
                                                                                            socket.broadcast.emit(
                                                                                                'Finger', 1
                                                                                            )
                                                                                            ReadFile();
                                                                                        }

                                                                                    }
                                                                                )
                                                                            }
                                                                        }
                                                                    );

                                                                }
                                                                
                                                            }
        
                                                        }
                                                    )
        
                                                }
            
                                            }
                                        )
                                    }else
                                    {
                                        fileRead.close(
                                            fd, ( err ) => {
        
                                                if ( err )
                                                {
                                                    console.error( err );
                                                }else
                                                {
                                                    ReadFile();
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

});

module.exports = router;