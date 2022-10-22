const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const fileRead = require('fs');

const NodeCache = require("node-cache");
const myCache = new NodeCache();

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
    
                                                                fileRead.close(
                                                                    fd, (err) => {
    
                                                                        if (err) {
                                                                            console.error(err);
                                                                        }
    
                                                                    }
                                                                )
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