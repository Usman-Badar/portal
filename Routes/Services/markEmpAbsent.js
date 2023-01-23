const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

setInterval(() => {

    const d = new Date();
    
    if ( d.getHours() === 23 && d.getMinutes() === 1 )
    {

        let tokenDate = new Date();
        // let date = tokenDate.getFullYear() + '-' + monthNames[tokenDate.getMonth()] + '-' + tokenDate.getDate();
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d2 = new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
        var dayName = days[d2.getDay()];

        db.query(
            "SELECT DISTINCT employees.emp_id \
            FROM employees \
            LEFT OUTER JOIN emp_attendance ON employees.emp_id = emp_attendance.emp_id \
            LEFT OUTER JOIN emp_props ON employees.emp_id = emp_props.emp_id \
            WHERE employees.emp_id not in (SELECT DISTINCT employees.emp_id \
            FROM employees \
            LEFT OUTER JOIN emp_attendance ON employees.emp_id = emp_attendance.emp_id \
            WHERE emp_attendance.emp_date = '" + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + "') AND employees.emp_status = 'Active' AND emp_props.attendance_enable = 1;" +
            "SELECT * FROM `tbl_holidays`;",
            (err, rslt) => {

                if (err) {

                    console.log(err);

                } else {

                    if ( rslt[0][0] ) {

                        for (let x = 0; x < rslt[0].length; x++) {

                            let status = 'Absent';

                            if ( dayName === 'Sunday' )
                            {
                                status = 'OFF';
                            }
                            for ( let y = 0; y < rslt[1].length; y++ )
                            {
                                const h_d = new Date(rslt[1][y].day);
                                if ( ( h_d.getFullYear() + '-' + (h_d.getMonth() + 1) + '-' + h_d.getDate() ) === ( d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() ) )
                                {
                                    status = rslt[1][y].status;
                                }
                            }
            
                            db.query(
                                "INSERT INTO emp_attendance (emp_id, status, emp_date) VALUES(?,?,?)",
                                [rslt[0][x].emp_id, status, tokenDate],
                                (err) => {

                                    if (err) {

                                        console.log(err);

                                    }

                                }
                            )
                        }

                    }

                }

            }
        )

    }
    
}, 1000);

// const d = new Date();
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
//     WHERE emp_attendance.emp_date = '2023-01-03') AND employees.emp_status = 'Active';" +
//     "SELECT * FROM `tbl_holidays`;",
//     (err, rslt) => {

//         if (err) {

//             console.log(err);

//         } else {

//             if ( rslt[0][0] ) {

//                 for (let x = 0; x < rslt[0].length; x++) {

//                     let status = 'Absent';

//                     if ( dayName === 'Sunday' )
//                     {
//                         status = 'OFF';
//                     }
//                     for ( let y = 0; y < rslt[1].length; y++ )
//                     {
//                         const h_d = new Date(rslt[1][y].day);
//                         if ( ( h_d.getFullYear() + '-' + (h_d.getMonth() + 1) + '-' + h_d.getDate() ) === "2023-01-03" )
//                         {
//                             status = rslt[1][y].status;
//                         }
//                     }

//                     console.log( status );
    
//                     let aa = db.query(
//                         "INSERT INTO emp_attendance (emp_id, status, emp_date) VALUES(?,?,?)",
//                         [rslt[0][x].emp_id, status, '2023-01-03'],
//                         (err) => {

//                             if (err) {

//                                 console.log(err);

//                             }else
//                             {
//                                 console.log( aa.query );
//                             }

//                         }
//                     )
//                 }

//             }

//         }

//     }
// )

module.exports = router;