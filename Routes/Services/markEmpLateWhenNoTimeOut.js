const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const moment = require('moment');

setInterval(() => {

    const d =  new Date();
    let date = new Date(moment().subtract(1, 'day')).toISOString().slice(0, 10).replace('T', ' ')
    
    if ( d.getHours() === 23 && d.getMinutes() === 1 )
    {

        db.query(
            "UPDATE emp_attendance SET status = ? WHERE emp_date = ? AND status = 'Present' AND time_out IS NULL;",
            [ 'Late', date ],
            (err) => {

                if (err) {

                    console.log(err);

                }else
                {
                    console.log("Late Marked At :", new Date().toTimeString());
                }

            }
        )

    }
    
}, 1000);

module.exports = router;