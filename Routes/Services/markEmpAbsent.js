const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

setInterval(() => {

    const d = new Date();
    
    if ( d.getHours() === 20 && d.getMinutes() === 1 )
    {

        let tokenDate = new Date();
        // let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d2 = new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
        var dayName = days[d2.getDay()];

        db.getConnection(
            ( err, connection ) => {
    
                if ( !err )
                {
    
                    connection.query(
                        "SELECT DISTINCT employees.emp_id \
                        FROM employees \
                        LEFT OUTER JOIN emp_attendance \
                        ON employees.emp_id = emp_attendance.emp_id \
                        WHERE employees.emp_id not in (SELECT DISTINCT employees.emp_id \
                        FROM employees \
                        LEFT OUTER JOIN emp_attendance \
                        ON employees.emp_id = emp_attendance.emp_id \
                        WHERE emp_attendance.emp_date = '" + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + "');",
                        (err, rslt) => {
            
                            if (err) {
            
                                res.status(500).send(err);
                                res.end();
                                connection.release();
            
                            } else {
                                if ( rslt[0] ) {
            
                                    for (let x = 0; x < rslt.length; x++) {
                        
                                        db.query(
                                            "INSERT INTO emp_attendance (emp_id, status, emp_date) VALUES(?,?,?)",
                                            [rslt[x].emp_id, dayName === 'Sunday' ? 'OFF' : 'Absent', tokenDate],
                                            (err, rslt) => {
            
                                                if (err) {
            
                                                    res.status(500).send(err);
                                                    res.end();
                                                    connection.release();
            
                                                }
            
                                            }
                                        )
            
                                        if ( ( x + 1 ) === rslt.length )
                                        {
                                            connection.release();    
                                        }
                                    }
    
            
            
                                }else
                                {
                                    connection.release();
                                }
            
                            }
            
                        }
                    )
    
                }else{
                
                    res.status(503).send(err);
                    res.end();
                    connection.release();
                }
    
            }
        )

    }
    
}, 1000);

module.exports = router;