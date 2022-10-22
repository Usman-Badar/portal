const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const fs =  require('fs');

router.post('/timein', ( req, res ) => {

    const { empID } = req.body;
    const d = new Date();

    db.query(
        'SELECT time_in FROM emp_attendance WHERE emp_id = ' + empID + ' AND emp_date = ?',
        [ d ],
        ( err, rslt ) => {

            if( err )
            {

                res.status(500).send(err);
                res.end();

            }else 
            {
                
                if ( !rslt[0] )
                {
                    db.query(
                        'SELECT time_in, time_out FROM employees WHERE emp_id = ' + empID,
                        ( err, rslt ) => {
                
                            if( err )
                            {
                
                                res.status(500).send(err);
                                res.end();
                
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
                                    [ empID, status, d.toTimeString(), d ],
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
                
                            }
                
                        }
                    )
                }

            }

        }
    )

} );

router.post('/timeout', ( req, res ) => {

    const { empID } = req.body;
    const d = new Date();

    db.query(
        "UPDATE emp_attendance SET time_out = '" + d.toTimeString() + "' WHERE emp_id = " + empID + " AND emp_attendance.emp_date = '" + d.getFullYear() + '-' + ( parseInt(d.getMonth() + 1).toString().length === 1 ? '0' + parseInt(d.getMonth() + 1).toString() : parseInt(d.getMonth() + 1).toString() ) + '-' + ( d.getDate().toString().length === 1 ? '0' + d.getDate().toString() : d.getDate() ) + "'",
        ( err ) => {

            if( err )
            {

                res.send( err );
                res.end();

            }else 
            {

                res.send( 'success' );
                res.end();

            }

        }
    )

} );

router.post('/breakin', ( req, res ) => {

    const { empID } = req.body;
    const d = new Date();

    db.query(
        "UPDATE emp_attendance SET break_in = '" + d.toTimeString() + "' WHERE emp_id = " + empID + " AND emp_attendance.emp_date = '" + d.getFullYear() + '-' + ( parseInt(d.getMonth() + 1).toString().length === 1 ? '0' + parseInt(d.getMonth() + 1).toString() : parseInt(d.getMonth() + 1).toString() ) + '-' + ( d.getDate().toString().length === 1 ? '0' + d.getDate().toString() : d.getDate() ) + "'",
        ( err, rslt ) => {

            if( err )
            {

                res.send( err );
                res.end();

            }else 
            {

                res.send( 'success' );
                res.end();

            }

        }
    )

} );

router.post('/breakout', ( req, res ) => {

    const { empID } = req.body;
    const d = new Date();

    db.query(
        "UPDATE emp_attendance SET break_out = '" + d.toTimeString() + "' WHERE emp_id = " + empID + " AND emp_attendance.emp_date = '" + d.getFullYear() + '-' + ( parseInt(d.getMonth() + 1).toString().length === 1 ? '0' + parseInt(d.getMonth() + 1).toString() : parseInt(d.getMonth() + 1).toString() ) + '-' + ( d.getDate().toString().length === 1 ? '0' + d.getDate().toString() : d.getDate() ) + "'",
        ( err ) => {

            if( err )
            {

                res.send( err );
                res.end();

            }else 
            {

                res.send( 'success' );
                res.end();

            }

        }
    )

} );

router.post('/setstatustolog', ( req, res ) => {

    const { device_id } = req.body;

    db.query(
        "UPDATE emp_machine_thumbs SET status = 'valid' WHERE status = 'Waiting' AND device_id = ?",
        [ device_id ],
        ( err ) => {

            if( err )
            {

                res.send( err );
                res.end();

            }else 
            {

                res.send( 'success' );
                res.end();

            }

        }
    )

} );

router.get('/getemployeesforattendance', ( req, res ) => {

    db.query(
        "SELECT employees.emp_id, employees.name, companies.company_name, departments.department_name, locations.location_name, designations.designation_name, emp_app_profile.emp_image \
        FROM employees \
        LEFT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id \
        LEFT OUTER JOIN companies ON employees.company_code = companies.company_code \
        LEFT OUTER JOIN departments ON employees.department_code = departments.department_code \
        LEFT OUTER JOIN locations ON employees.location_code = locations.location_code \
        LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code;",
        ( err, rslt ) => {

            if( err )
            {

                res.send( err );
                res.end();

            }else 
            {
                res.send(rslt);
                res.end();

            }

        }
    )

} );

router.post('/ratings', ( req, res ) => {

    const { emp_id, date, ratings } = req.body;

    const d = new Date( date );

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                let correspondingDate = d.getFullYear() + '-' + ( parseInt(d.getMonth() + 1).toString().length === 1 ? '0' + parseInt(d.getMonth() + 1).toString() : parseInt(d.getMonth() + 1).toString() ) + '-' + ( d.getDate().toString().length === 1 ? '0' + d.getDate().toString() : d.getDate() );
                connection.query(
                    "UPDATE emp_attendance SET total_ratings = total_ratings + 5, emp_ratings = emp_ratings + " + parseInt( ratings ) + " WHERE emp_id = " + parseInt( emp_id ) + " AND emp_date = '" + correspondingDate + "'",
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            connection.release();
                            res.send( err );
                            res.end();
            
                        }else 
                        {
            
                            connection.release();
                            res.send(rslt);
                            res.end();
            
                        }
            
                    }
                )
            }

        }
    )

} );

router.post('/getallpresentofthelocation', ( req, res ) => {

    const { machine_id } = req.body;

    let date = new Date().toISOString().slice(0, 10).replace('T', ' ');

    db.query(
        "SELECT current_location FROM tblthumbdevices WHERE device_id = ?",
        [ machine_id ],
        ( err, rslt ) => {

            if( err )
            {

                res.send( err );
                res.end();

            }else 
            {
                db.query(
                    "SELECT \
                    emp_attendance.emp_id, \
                    emp_attendance.status, \
                    emp_attendance.time_in, \
                    emp_attendance.time_out, \
                    employees.location_code, \
                    employees.name, \
                    emp_app_profile.emp_image \
                    FROM \
                    emp_attendance \
                    LEFT OUTER JOIN employees ON emp_attendance.emp_id = employees.emp_id \
                    LEFT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id \
                    WHERE emp_attendance.emp_date = ? AND employees.location_code = ?;",
                    [ date, rslt[0].current_location ],
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            res.send( err );
                            res.end();
            
                        }else 
                        {
                            res.send(rslt);
                            res.end();
            
                        }
            
                    }
                )

            }

        }
    )

} );

module.exports = router;