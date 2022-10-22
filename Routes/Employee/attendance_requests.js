const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const moment = require('moment');
const io = require('../../server');

io.on('connection', ( socket ) => {

    socket.on(
        'newattendancerequest', () => {

            socket.broadcast.emit('newattendancerequest');
    
        }
    )

});

router.get('/getallattrequests', ( req, res ) => {

    db.query(
        "SELECT DISTINCT \
        employees.*, \
        locations.location_name,  \
        companies.company_name,  \
        departments.department_name,  \
        designations.designation_name,  \
        emp_app_profile.emp_image,  \
        emp_attendance_requests.*  \
        FROM employees  \
        RIGHT OUTER JOIN emp_attendance_requests_ref ON emp_attendance_requests_ref.requested_by = employees.emp_id \
        RIGHT OUTER JOIN emp_attendance_requests ON emp_attendance_requests_ref.request_id = emp_attendance_requests.id \
        LEFT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id  \
        LEFT OUTER JOIN companies ON employees.company_code = companies.company_code    \
        LEFT OUTER JOIN departments ON employees.department_code = departments.department_code   \
        LEFT OUTER JOIN locations ON employees.location_code = locations.location_code   \
        LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code   \
        GROUP BY employees.emp_id DESC LIMIT 10;",
        ( err, rslt ) => {

            if( err )
            {

                res.status(500).send(err);
                res.end();

            }else 
            {
                
                res.send( rslt );
                res.end();

            }

        }
    );

} );

router.post('/getemployeelastattrequest', ( req, res ) => {

    const { empID } = req.body;

    db.query(
        "SELECT \
        emp_attendance_requests.*,  \
        emp_attendance_requests_ref.*,  \
        ADDDATE(emp_attendance_requests_ref.request_date, INTERVAL 1 DAY) request_date,  \
        employees.emp_id  \
        FROM employees  \
        RIGHT OUTER JOIN emp_attendance_requests_ref ON emp_attendance_requests_ref.requested_by = employees.emp_id  \
        RIGHT OUTER JOIN emp_attendance_requests ON emp_attendance_requests_ref.request_id = emp_attendance_requests.id  \
        WHERE employees.emp_id = " + empID + "  \
        GROUP BY employees.emp_id DESC LIMIT 1;",
        ( err, rslt ) => {

            if( err )
            {

                res.status(500).send(err);
                res.end();

            }else 
            {

                res.send( rslt );
                res.end();

            }

        }
    );

} );

router.post('/getemptimein', ( req, res ) => {

    const { emp_id, date_time } = req.body;
    let date = new Date( date_time ).toISOString().slice(0, 10).replace('T', ' ');

    db.query(
        "SELECT * FROM `emp_attendance` WHERE emp_id = ? AND emp_date = ?;",
        [ emp_id, date ],
        ( err, rslt ) => {

            if( err )
            {

                res.status(500).send(err);
                res.end();

            }else 
            {

                res.send( rslt );
                res.end();

            }

        }
    );

} );

router.post('/getallattendancerequests', ( req, res ) => {

    const { emp_id } = req.body;

    db.query(
        "SELECT  \
        sender.name as sender_name, \
        receiver.name as receiver_name, \
        emp_app_profile.emp_image, \
        tbl_attendance_request_refs.id, \
        tbl_attendance_request_refs.request_by, \
        tbl_attendance_request_refs.request_id, \
        tbl_attendance_request_refs.request_status, \
        tbl_attendance_request_refs.request_date \
        FROM `tbl_attendance_request_refs`  \
        LEFT OUTER JOIN employees sender ON sender.emp_id = tbl_attendance_request_refs.request_by \
        LEFT OUTER JOIN employees receiver ON receiver.emp_id = tbl_attendance_request_refs.request_to \
        LEFT OUTER JOIN emp_app_profile ON sender.emp_id = emp_app_profile.emp_id \
        WHERE request_by = ? OR request_to = ? ORDER BY tbl_attendance_request_refs.id DESC LIMIT 10;",
        [ emp_id, emp_id ],
        ( err, rslt ) => {

            if( err )
            {

                res.status(500).send(err);
                res.end();

            }else 
            {

                res.send( rslt );
                res.end();

            }

        }
    );

} );

router.post('/getattendancerequestdetails', ( req, res ) => {

    const { request_id } = req.body;

    db.query(
        "SELECT * FROM tbl_attendance_requests WHERE id = ?;" +
        "SELECT \
        tbl_attendance_request_refs.*, \
        sender.name as sender_name, \
        receiver.name as receiver_name  \
        FROM tbl_attendance_request_refs  \
        LEFT OUTER JOIN employees sender ON sender.emp_id = tbl_attendance_request_refs.request_by  \
        LEFT OUTER JOIN employees receiver ON receiver.emp_id = tbl_attendance_request_refs.request_to  \
        WHERE tbl_attendance_request_refs.request_id = ?;",
        [ request_id, request_id ],
        (err, rslt) => {

            if (err) {

                console.log( err );
                res.status(500).send(err);
                res.end();

            } else {

                db.query(
                    "SELECT \
                    employees.name, \
                    emp_app_profile.emp_image, \
                    designations.designation_name, \
                    departments.department_name, \
                    companies.company_name \
                    FROM employees \
                    LEFT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id \
                    LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code \
                    LEFT OUTER JOIN departments ON employees.department_code = departments.department_code \
                    LEFT OUTER JOIN companies ON employees.company_code = companies.company_code \
                    WHERE employees.emp_id = ?;",
                    [ rslt[1][0].request_by ],
                    (err, rslt1) => {
            
                        if (err) {
            
                            res.status(500).send(err);
                            res.end();
            
                        } else {
            
                            rslt[2] = rslt1;
                            res.send(rslt);
                            res.end();
            
                        }
            
                    }
                )

            }

        }
    )

} );

router.post('/newattendancerequest', ( req, res ) => {

    const { request_type, time_in, time_out, break_in, break_out, reason, snapshot, date_time, request_by, request_to, record_date, prev_attendance } = req.body;
    let date = new Date( date_time );
    let recordDate = new Date( record_date );
    let date2 = new Date( record_date ).toISOString().slice(0, 10).replace('T', ' ');

    let attendance = JSON.parse( prev_attendance );
    let sn = '';
    if ( snapshot === 'null' )
    {
        sn = ' snapshot IS NULL;';
    }else
    {
        sn = ' snapshot = ?;';
    }

    let timeIn = time_in;
    let timeOut = time_out;
    let breakIn = break_in;
    let breakOut = break_out;

    if ( request_type === 'update' )
    {
        if ( timeIn === '' )
        {
            timeIn = attendance.time_in;
        }
        if ( timeOut === '' )
        {
            timeOut = attendance.time_out;
        }
        if ( breakIn === '' )
        {
            breakIn = attendance.break_in;
        }
        if ( breakOut === '' )
        {
            breakOut = attendance.break_out;
        }
    }else
    {
        if ( timeIn === '' )
        {
            timeIn = null;
        }
        if ( timeOut === '' )
        {
            timeOut = null;
        }
        if ( breakIn === '' )
        {
            breakIn = null;
        }
        if ( breakOut === '' )
        {
            breakOut = null;
        }
    }
    
    if ( timeIn === 'null' )
    {
        timeIn = null;
    }
    if ( timeOut === 'null' )
    {
        timeOut = null;
    }
    if ( breakIn === 'null' )
    {
        breakIn = null;
    }
    if ( breakOut === 'null' )
    {
        breakOut = null;
    }

    db.query(
        "INSERT INTO `tbl_attendance_requests`(`request_type`, `time`, `date`, `reason`, `snapshot`) VALUES (?,?,?,?,?);" +
        "SELECT id FROM tbl_attendance_requests WHERE request_type = ? AND date = ? AND reason = ? AND" + sn,
        [ request_type, recordDate.toTimeString(), recordDate, reason, snapshot === 'null' ? null : snapshot, request_type, date2, reason, snapshot === 'null' ? null : snapshot ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.status(500).send(err);
                res.end();

            }else 
            {

                db.query(
                    "INSERT INTO `tbl_attendance_request_refs`(`request_id`, `request_by`, `request_date`, `request_time`, `request_to`, `request_status`, `time_in`, `time_out`, `break_in`, `break_out`) VALUES (?,?,?,?,?,?,?,?,?,?);",
                    [ rslt[1][0].id, request_by, date, date.toTimeString(), request_to, 'sent', timeIn, timeOut, breakIn, breakOut ],
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            res.status(500).send(err);
                            res.end();
            
                        }else 
                        {
            
                            res.send( rslt );
                            res.end();
            
                        }
            
                    }
                );

            }

        }
    );

} );

router.post('/performactionforattrequest', ( req, res ) => {

    const {
        request_id,
        date_time,
        emp_id,
        status,
        forward_to,
        remarks,
        id,
        time_in,
        time_out,
        break_in,
        break_out,
        time_in_check,
        time_out_check,
        break_in_check,
        break_out_check,
        request_type,
        request_by,
        record_date,
        record_status
    } = req.body;

    let date = new Date( date_time );
    let date2 = new Date( record_date );
    var date3 = moment( record_date ).format('YYYY-MM-DD');

    if ( status === 'cancel' )
    {
        db.query(
            "INSERT INTO `tbl_attendance_request_refs`(`request_id`, `request_by`, `request_date`, `request_time`, `request_status`, `remarks`) VALUES (?,?,?,?,?,?);",
            [ request_id, emp_id, date, date.toTimeString(), 'cancel', remarks ],
            ( err, rslt ) => {
    
                if( err )
                {
    
                    res.status(500).send(err);
                    res.end();
    
                }else 
                {
    
                    res.send( rslt );
                    res.end();
    
                }
    
            }
        );
    }else
    {

        let forward = false;
        if ( forward_to === 'null' || forward_to === '' || forward_to === null )
        {
            forward = false;
        }else
        {
            forward = true;
        }

        let timeIn = time_in;
        let timeOut = time_out;
        let breakIn = break_in;
        let breakOut = break_out;

        if ( time_in_check )
        {
            timeIn = null;
        }
        if ( time_out_check )
        {
            timeOut = null;
        }
        if ( break_in_check )
        {
            breakIn = null;
        }
        if ( break_out_check )
        {
            breakOut = null;
        }

        db.query(
            "UPDATE `tbl_attendance_request_refs` SET update_date = ?, update_time = ?, remarks = ?, request_status = ? WHERE id = ?",
            [ date, date.toTimeString(), remarks, status, id ],
            ( err, rslt ) => {

                if( err )
                {

                    res.status(500).send(err);
                    res.end();

                }else 
                {
                    if ( status === 'mark' || status === 'mark_&_forward' )
                    {
                        let q = "";
                        let parameters = [];
                        if ( request_type === 'insert' )
                        {
                            q = "INSERT INTO `emp_attendance`(`emp_id`, `status`, `time_in`, `time_out`, `break_in`, `break_out`, `emp_date`) VALUES (?,?,?,?,?,?,?);";
                            parameters = [ request_by, record_status, timeIn, timeOut, breakIn, breakOut, date2 ];
                        }else
                        if ( request_type === 'update' )
                        {
                            q = "UPDATE `emp_attendance` SET `status` = ?, `time_in` = ?, `time_out` = ?, `break_in` = ?, `break_out` = ? WHERE emp_id = ? AND emp_date = ?;";
                            parameters = [ record_status, timeIn, timeOut, breakIn, breakOut, request_by, date3 ];
                        }

                        q = q.concat("UPDATE tbl_attendance_requests SET marked_time_in = ?, marked_time_out = ?, marked_break_in = ?, marked_break_out = ? WHERE id = ?");
                        parameters.push( timeIn );
                        parameters.push( timeOut );
                        parameters.push( breakIn );
                        parameters.push( breakOut );
                        parameters.push( request_id );

                        db.query(
                            q,
                            parameters,
                            ( err ) => {
                    
                                if( err )
                                {
                    
                                    console.log( err );
                                    res.status(500).send(err);
                                    res.end();
                    
                                }
                    
                            }
                        );
                    }

                    if ( forward )
                    {
                        db.query(
                            "INSERT INTO `tbl_attendance_request_refs`(`request_id`, `request_by`, `request_date`, `request_time`, `request_to`, `request_status`, `time_in`, `time_out`, `break_in`, `break_out`) VALUES (?,?,?,?,?,?,?,?,?,?);",
                            [ request_id, emp_id, date, date.toTimeString(), forward_to, 'sent', timeIn, timeOut, breakIn, breakOut ],
                            ( err, rslt ) => {
                    
                                if( err )
                                {
                    
                                    res.status(500).send(err);
                                    res.end();
                    
                                }else 
                                {
                    
                                    res.send( rslt );
                                    res.end();
                    
                                }
                    
                            }
                        );
                    }else
                    {
                        res.send( rslt );
                        res.end();
                    }

                }

            }
        );
    }

} );

router.post('/att_request_dates', ( req, res ) => {

    const { date } = req.body;

    db.query(
        "INSERT INTO `tbl_attendance_request_dates`(`date`) VALUES (?)",
        [ date ],
        ( err ) => {

            if( err )
            {

                res.status(500).send(err);
                res.end();

            }else 
            {
                
                res.send('success');
                res.end();

            }

        }
    )

} );

router.get('/get_att_request_dates', ( req, res ) => {

    db.query(
        "SELECT * FROM `tbl_attendance_request_dates` ORDER BY date DESC;",
        ( err, rslt ) => {

            if( err )
            {

                res.status(500).send(err);
                res.end();

            }else 
            {
                
                res.send( rslt );
                res.end();

            }

        }
    )

} );

router.get('/get_enabled_att_request_dates', ( req, res ) => {

    db.query(
        "SELECT * FROM `tbl_attendance_request_dates` WHERE enabled = 1 ORDER BY date DESC;",
        ( err, rslt ) => {

            if( err )
            {

                res.status(500).send(err);
                res.end();

            }else 
            {
                
                res.send( rslt );
                res.end();

            }

        }
    )

} );

router.post('/get_att_request_dates_show_hide', ( req, res ) => {

    const { status, id } = req.body;

    db.query(
        "UPDATE `tbl_attendance_request_dates` SET enabled = ? WHERE id = ?;",
        [ status, id ],
        ( err ) => {

            if( err )
            {

                res.status(500).send(err);
                res.end();

            }else 
            {
                
                res.send( 'success' );
                res.end();

            }

        }
    )

} );

router.post('/del_att_request_dates_', ( req, res ) => {

    const { id } = req.body;

    db.query(
        "DELETE FROM `tbl_attendance_request_dates` WHERE id = ?;",
        [ id ],
        ( err ) => {

            if( err )
            {

                res.status(500).send(err);
                res.end();

            }else 
            {
                
                res.send( 'success' );
                res.end();

            }

        }
    )

} );

module.exports = router;