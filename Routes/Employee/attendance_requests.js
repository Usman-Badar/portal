const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/getallattrequests', ( req, res ) => {

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                
                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
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
                    GROUP BY employees.emp_id DESC;",
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            res.status(500).send(err);
                            res.end();
                            connection.release();
            
                        }else 
                        {
                            
                            res.send( rslt );
                            res.end();
                            connection.release();
            
                        }
            
                    }
                );
            }

        }
    );

} );

router.post('/getemployeelastattrequest', ( req, res ) => {

    const { empID } = req.body;

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();
            }else
            {
                connection.query(
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
                            connection.release();
            
                        }else 
                        {

                            res.send( rslt );
                            res.end();
                            connection.release();
            
                        }
            
                    }
                );
            }

        }
    );

} );

module.exports = router;