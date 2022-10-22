const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// setInterval(() => {

    const d = new Date();
    
    // if ( d.getHours() === 23 && d.getMinutes() === 1 )
    // {

        // let tokenDate = new Date();
        // // let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();
        // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        // var d2 = new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
        // var dayName = days[d2.getDay()];

        // db.query(
        //     "SELECT DISTINCT employees.emp_id \
        //     FROM employees \
        //     LEFT OUTER JOIN emp_attendance \
        //     ON employees.emp_id = emp_attendance.emp_id \
        //     WHERE employees.emp_id not in (SELECT DISTINCT employees.emp_id \
        //     FROM employees \
        //     LEFT OUTER JOIN emp_attendance \
        //     ON employees.emp_id = emp_attendance.emp_id \
        //     WHERE emp_attendance.emp_date = '2022-07-09' AND employees.emp_status = 'Active');",
        //     (err, rslt) => {

        //         if (err) {

        //             console.log( err );

        //         } else {

        //             if ( rslt.length > 0 ) {
                        
        //                 for (let x = 0; x < rslt.length; x++) 
        //                 {
        //                     let q = db.query(
        //                         "INSERT INTO emp_attendance (emp_id, status, emp_date) VALUES(?,?,?)",
        //                         [rslt[x].emp_id, dayName === 'Sunday' ? 'OFF' : 'Holiday', '2022-07-09'],
        //                         (err) => {

        //                             if (err) {

        //                                 console.log( err );

        //                             }

        //                         }
        //                     )
        //                 }

        //             }

        //         }

        //     }
        // )

    // }
    
// }, 1000);

module.exports = router;