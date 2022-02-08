const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.post('/applyshortleave', (req, res) => {

    const { ShortLeaveTime, ShortLeaveDate, ShortLeaveReason, RequestedBy } = req.body;
    const d = new Date();

    db.getConnection(
        (err, connection) => {

            if (err) {
                res.status(503).send(err);
                res.end();

            } else {
                connection.query(
                    "INSERT INTO emp_short_leave_applications (leave_purpose, leave_time, date) VALUES (?,?,?)",
                    [ShortLeaveReason, ShortLeaveTime, ShortLeaveDate],
                    (err, rslt) => {

                        if (err) {

                            res.status(500).send(err);
                            res.end();
                            connection.release();

                        } else {

                            connection.query(
                                "SELECT leave_id FROM emp_short_leave_applications WHERE leave_time = ? AND date = ?",
                                [ShortLeaveTime, ShortLeaveDate],
                                (err, rslt) => {

                                    if (err) {

                                        res.status(500).send(err);
                                        res.end();
                                        connection.release();

                                    } else {

                                        connection.query(
                                            "INSERT INTO emp_short_leave_application_refs (leave_id, requested_by, requested_date, requested_time, request_status) VALUES (?,?,?,?,?)",
                                            [rslt[0].leave_id, RequestedBy, d, d.toTimeString(), 'Sent'],
                                            (err, rslt) => {

                                                if (err) {

                                                    res.status(500).send(err);
                                                    res.end();
                                                    connection.release();

                                                } else {

                                                    res.send(rslt);
                                                    res.end();
                                                    connection.release();

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

        }
    );

});

router.post('/getallshortleaves', (req, res) => {

    const { empID } = req.body;

    db.getConnection(
        (err, connection) => {

            if (err) {

                res.status(503).send(err);
                res.end();

            } else {
                connection.query(
                    "SELECT \
                    employees.emp_id, \
                    emp_short_leave_application_refs.*, \
                    emp_short_leave_applications.* \
                    FROM employees \
                    RIGHT OUTER JOIN emp_short_leave_application_refs ON emp_short_leave_application_refs.requested_by = employees.emp_id \
                    LEFT OUTER JOIN emp_short_leave_applications ON emp_short_leave_applications.leave_id = emp_short_leave_application_refs.leave_id \
                    WHERE emp_id = " + empID + " ORDER BY emp_short_leave_applications.leave_id DESC",
                    (err, rslt) => {

                        if (err) {

                            res.status(500).send(err);
                            res.end();
                            connection.release();

                        } else {

                            res.send(rslt);
                            res.end();
                            connection.release();

                        }

                    }
                )
            }

        }
    );

});

router.post('/getallleaves', (req, res) => {

    const { empID } = req.body;

    db.getConnection(
        (err, connection) => {

            if (err) {

                res.status(503).send(err);
                res.end();

            } else {
                connection.query(
                    "SELECT \
                    employees.emp_id, \
                    emp_leave_application_refs.*, \
                    emp_leave_applications.*, \
                    ADDDATE(emp_leave_applications.leave_from, INTERVAL 1 DAY) `leave_from`, \
                    ADDDATE(emp_leave_applications.leave_to, INTERVAL 1 DAY) `leave_to`, \
                    ADDDATE(emp_leave_application_refs.requested_date, INTERVAL 1 DAY) `requested_date` \
                    FROM employees \
                    RIGHT OUTER JOIN emp_leave_application_refs ON emp_leave_application_refs.requested_by = employees.emp_id \
                    LEFT OUTER JOIN emp_leave_applications ON emp_leave_applications.leave_id = emp_leave_application_refs.leave_id \
                    WHERE emp_leave_applications.availed = 0 AND emp_id = " + empID + " ORDER BY emp_leave_applications.leave_id DESC",
                    (err, rslt) => {

                        if (err) {

                            res.status(500).send(err);
                            res.end();
                            connection.release();

                        } else {

                            res.send(rslt);
                            res.end();
                            connection.release();

                        }

                    }
                )
            }

        }
    );

});

router.post('/getallavailedleaves', (req, res) => {

    const { empID } = req.body;

    db.getConnection(
        (err, connection) => {

            if (err) {

                res.status(503).send(err);
                res.end();

            } else {
                connection.query(
                    "SELECT \
                    employees.emp_id, \
                    emp_leave_application_refs.*, \
                    emp_leave_applications.* \
                    FROM employees \
                    RIGHT OUTER JOIN emp_leave_application_refs ON emp_leave_application_refs.requested_by = employees.emp_id \
                    LEFT OUTER JOIN emp_leave_applications ON emp_leave_applications.leave_id = emp_leave_application_refs.leave_id \
                    WHERE emp_leave_applications.availed = 1 AND emp_id = " + empID,
                    (err, rslt) => {

                        if (err) {

                            res.status(500).send(err);
                            res.end();
                            connection.release();

                        } else {

                            res.send(rslt);
                            res.end();
                            connection.release();

                        }

                    }
                )
            }

        }
    );

});

router.post('/getallshortleaves', (req, res) => {

    const { empID } = req.body;

    db.getConnection(
        (err, connection) => {

            if (err) {


                res.status(503).send(err);
                res.end();

            } else {
                connection.query(
                    "SELECT \
                    employees.emp_id, \
                    emp_short_leave_application_refs.*, \
                    emp_short_leave_applications.*, \
                    ADDDATE(emp_short_leave_applications.date, INTERVAL 1 DAY) `date`, \
                    ADDDATE(emp_short_leave_application_refs.requested_date, INTERVAL 1 DAY) `requested_date` \
                    FROM employees \
                    RIGHT OUTER JOIN emp_short_leave_application_refs ON emp_short_leave_application_refs.requested_by = employees.emp_id \
                    LEFT OUTER JOIN emp_short_leave_applications ON emp_short_leave_applications.leave_id = emp_short_leave_application_refs.leave_id \
                    WHERE emp_id = " + empID,
                    (err, rslt) => {

                        if (err) {

                            res.status(500).send(err);
                            res.end();
                            connection.release();

                        } else {

                            res.send(rslt);
                            res.end();
                            connection.release();

                        }

                    }
                )
            }

        }
    );

});

router.post('/applyleave', (req, res) => {

    const { onDayLeave, leaveType, leaveFrom, leaveTo, NoOfDays, Purpose, AttachementName, Availed, RequestedBy, leaveDate } = req.body;
    const d = new Date();

    let attName = null;

    db.getConnection(
        (err, connection) => {

            if (err) {

                res.status(503).send(err);
                res.end();

            } else {
                connection.query(
                    "INSERT INTO emp_leave_applications (leave_type, availed, one_day_leave, leave_purpose, leave_from, leave_to, days, attachement) VALUES (?,?,?,?,?,?,?,?)",
                    [leaveType, Availed, parseInt(onDayLeave), Purpose, parseInt(onDayLeave) === 1 ? leaveDate : leaveFrom, leaveTo, NoOfDays, attName],
                    (err, rslt) => {

                        if (err) {

                            res.status(500).send(err);
                            res.end();
                            connection.release();

                        } else {

                            connection.query(
                                "SELECT leave_id FROM emp_leave_applications WHERE leave_type = ? AND days = ? AND leave_purpose = ? AND leave_from = ?",
                                [leaveType, NoOfDays, Purpose, parseInt(onDayLeave) === 1 ? leaveDate : leaveFrom],
                                (err, rslt) => {

                                    if (err) {

                                        res.status(500).send(err);
                                        res.end();
                                        connection.release();

                                    } else {
                                        connection.query(
                                            "INSERT INTO emp_leave_application_refs (leave_id, requested_by, requested_date, requested_time, request_status) VALUES (?,?,?,?,?)",
                                            [rslt[0].leave_id, RequestedBy, d, d.toTimeString(), 'Sent'],
                                            (err, rslt) => {

                                                if (err) {

                                                    res.status(500).send(err);
                                                    res.end();
                                                    connection.release();

                                                } else {

                                                    if (AttachementName !== '') {

                                                        const { AttachementFile } = req.files;

                                                        attName = AttachementName + '.' + (AttachementFile.mimetype.split('/')[1]).toString();

                                                        AttachementFile.mv('client/public/images/leave_attatchments/' + attName, (err) => {

                                                            if (!err) {
                                                                res.status(500).send(err);
                                                                res.end();
                                                                connection.release();
                                                            }

                                                        });

                                                    } else {
                                                        res.send(rslt);
                                                        res.end();
                                                        connection.release();
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

        }
    );

});

router.get('/getallempleaves', (req, res) => {

    db.getConnection(
        (err, connection) => {

            if (err) {

                res.status(503).send(err);
                res.end();

            } else {
                connection.query(
                    "SELECT DISTINCT employees.*, locations.location_name, \
                    companies.company_name,departments.department_name,designations.designation_name, \
                    emp_app_profile.emp_image, emp_leave_application_refs.*, \
                    ADDDATE(emp_leave_application_refs.requested_date, INTERVAL 1 DAY) requested_date,\
                    emp_leave_applications.*, \
                    ADDDATE(emp_leave_applications.leave_from, INTERVAL 1 DAY) leave_from, \
                    ADDDATE(emp_leave_applications.leave_to, INTERVAL 1 DAY) leave_to \
                    FROM employees LEFT OUTER JOIN companies ON employees.company_code = companies.company_code LEFT OUTER JOIN departments ON employees.department_code = departments.department_code LEFT OUTER JOIN locations ON employees.location_code = locations.location_code LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code RIGHT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id RIGHT OUTER JOIN emp_leave_application_refs ON employees.emp_id = emp_leave_application_refs.requested_by RIGHT OUTER JOIN emp_leave_applications ON emp_leave_application_refs.leave_id = emp_leave_applications.leave_id ORDER BY emp_leave_application_refs.id DESC;",
                    (err, rslt) => {

                        if (err) {

                            res.status(500).send(err);
                            res.end();
                            connection.release();

                        } else {

                            res.send(rslt);
                            res.end();
                            connection.release();

                        }

                    }
                )
            }

        }
    );

});

router.get('/getallempshrtleaves', (req, res) => {

    db.getConnection(
        (err, connection) => {

            if (err) {


                res.status(503).send(err);
                res.end();

            } else {
                connection.query(
                    "SELECT DISTINCT employees.*, locations.location_name,companies.company_name,departments.department_name, \
                    designations.designation_name,emp_app_profile.emp_image, emp_short_leave_application_refs.*, \
                    emp_short_leave_applications.*, \
                    ADDDATE(emp_short_leave_applications.date, INTERVAL 1 DAY) date, \
                    ADDDATE(emp_short_leave_application_refs.requested_date, INTERVAL 1 DAY) requested_date \
                    FROM employees LEFT OUTER JOIN companies ON employees.company_code = companies.company_code LEFT OUTER JOIN departments ON employees.department_code = departments.department_code LEFT OUTER JOIN locations ON employees.location_code = locations.location_code LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code RIGHT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id RIGHT OUTER JOIN emp_short_leave_application_refs ON employees.emp_id = emp_short_leave_application_refs.requested_by RIGHT OUTER JOIN emp_short_leave_applications ON emp_short_leave_application_refs.leave_id = emp_short_leave_applications.leave_id ORDER BY emp_short_leave_application_refs.id DESC;",
                    (err, rslt) => {

                        if (err) {

                            res.status(500).send(err);
                            res.end();
                            connection.release();

                        } else {

                            res.send(rslt);
                            res.end();
                            connection.release();

                        }

                    }
                )
            }

        }
    );

});

router.post('/getempleavescount', (req, res) => {

    const { empID } = req.body;

    db.getConnection(
        (err, connection) => {

            if (err) {

                res.status(503).send(err);
                res.end();

            } else {
                connection.query(
                    "SELECT DISTINCT emp_leave_applications.days,emp_leave_applications.leave_type FROM employees RIGHT OUTER JOIN emp_leave_application_refs ON employees.emp_id = emp_leave_application_refs.requested_by RIGHT OUTER JOIN emp_leave_applications ON emp_leave_application_refs.leave_id = emp_leave_applications.leave_id WHERE emp_leave_application_refs.request_status = 'Accepted' AND employees.emp_id = " + empID,
                    (err, rslt) => {

                        if (err) {

                            res.status(500).send(err);
                            res.end();
                            connection.release();

                        } else {

                            res.send(rslt);
                            res.end();
                            connection.release();

                        }

                    }
                )
            }

        }
    );

});

router.post('/getempshortleavescount', (req, res) => {

    const { empID } = req.body;

    db.getConnection(
        (err, connection) => {

            if (err) {

                res.status(503).send(err);
                res.end();

            } else {
                connection.query(
                    "SELECT COUNT(id) AS counts FROM `emp_short_leave_application_refs` WHERE emp_short_leave_application_refs.request_status = 'Accepted' AND requested_by = " + empID,
                    (err, rslt) => {

                        if (err) {

                            res.status(500).send(err);
                            res.end();
                            connection.release();

                        } else {

                            res.send(rslt);
                            res.end();
                            connection.release();

                        }

                    }
                )
            }

        }
    );

});

router.post('/updateleavestatusreject', (req, res) => {

    const { empID, leave, handleBY, leave_id, Remarks } = req.body;
    const d = new Date();

    db.getConnection(
        (err, connection) => {

            if (err) {

                res.status(503).send(err);
                res.end();

            } else {
                connection.query(
                    leave === 'leave'
                        ?
                        "UPDATE emp_leave_application_refs SET request_status = 'Rejected', approval_date = '" + d.getFullYear() + '-' + parseInt(d.getMonth() + 1) + '-' + d.getDate() + "', approved_by = " + handleBY + ", approval_time = '" + d.toTimeString() + "', comments = '" + Remarks + "' WHERE request_status = 'Waiting For Approval' AND requested_by = " + empID + " AND emp_leave_application_refs.leave_id = " + leave_id
                        :
                        "UPDATE emp_short_leave_application_refs SET request_status = 'Rejected', approval_date = '" + d.getFullYear() + '-' + parseInt(d.getMonth() + 1) + '-' + d.getDate() + "', approved_by = " + handleBY + ", approval_time = '" + d.toTimeString() + "', comments = '" + Remarks + "' WHERE request_status = 'Waiting For Approval' AND requested_by = " + empID + " AND emp_short_leave_application_refs.leave_id = " + leave_id
                    ,
                    (err, rslt) => {

                        if (err) {

                            res.status(500).send(err);
                            res.end();
                            connection.release();

                        } else {

                            res.send(rslt);
                            res.end();
                            connection.release();

                        }

                    }
                )
            }

        }
    );

});

router.post('/updateleavestatustowaiting', (req, res) => {

    const { empID, leave, handleBY, leave_id } = req.body;
    const d = new Date();
    db.getConnection(
        (err, connection) => {

            if (err) {

                res.status(503).send(err);
                res.end();

            } else {
                connection.query(
                    leave === 'leave'
                        ?
                        "UPDATE emp_leave_application_refs SET request_status = 'Waiting For Approval', view_date = '" + d.getFullYear() + '-' + parseInt(d.getMonth() + 1) + '-' + d.getDate() + "', handle_by = " + handleBY + ", view_time = '" + d.toTimeString() + "' WHERE request_status = 'Sent' AND requested_by = " + empID + " AND emp_leave_application_refs.leave_id = " + leave_id
                        :
                        "UPDATE emp_short_leave_application_refs SET request_status = 'Waiting For Approval', view_date = '" + d.getFullYear() + '-' + parseInt(d.getMonth() + 1) + '-' + d.getDate() + "', handle_by = " + handleBY + ", view_time = '" + d.toTimeString() + "' WHERE request_status = 'Sent' AND requested_by = " + empID + " AND emp_short_leave_application_refs.leave_id = " + leave_id
                    ,
                    (err, rslt) => {

                        if (err) {

                            res.status(500).send(err);
                            res.end();
                            connection.release();

                        } else {

                            res.send(rslt);
                            res.end();
                            connection.release();

                        }

                    }
                )
            }

        }
    );

});

router.post('/updateleavestatustoaccept', (req, res) => {

    const { empID, leave, handleBY, leave_id, Remarks } = req.body;
    const d = new Date();

    db.getConnection(
        (err, connection) => {

            if (err) {
                res.status(503).send(err);
                res.end();

            } else {
                connection.query(
                    leave === 'leave'
                        ?
                        "UPDATE emp_leave_application_refs SET request_status = 'Accepted', approval_date = '" + d.getFullYear() + '-' + parseInt(d.getMonth() + 1) + '-' + d.getDate() + "', approved_by = " + handleBY + ", approval_time = '" + d.toTimeString() + "', comments = '" + Remarks + "' WHERE request_status = 'Waiting For Approval' AND requested_by = " + empID + " AND emp_leave_application_refs.leave_id = " + leave_id
                        :
                        "UPDATE emp_short_leave_application_refs SET request_status = 'Accepted', approval_date = '" + d.getFullYear() + '-' + parseInt(d.getMonth() + 1) + '-' + d.getDate() + "', approved_by = " + handleBY + ", approval_time = '" + d.toTimeString() + "', comments = '" + Remarks + "' WHERE request_status = 'Waiting For Approval' AND requested_by = " + empID + " AND emp_short_leave_application_refs.leave_id = " + leave_id
                    ,
                    (err, rslt) => {

                        if (err) {

                            res.status(500).send(err);
                            res.end();
                            connection.release();

                        } else {

                            if (leave !== 'leave') {
                                connection.query(
                                    'SELECT \
                                    employees.emp_id,\
                                    employees.time_in, \
                                    employees.time_out, \
                                    emp_short_leave_application_refs.*, \
                                    emp_short_leave_applications.* \
                                    FROM employees \
                                    RIGHT OUTER JOIN emp_short_leave_application_refs ON emp_short_leave_application_refs.requested_by = employees.emp_id \
                                    LEFT OUTER JOIN emp_short_leave_applications ON emp_short_leave_applications.leave_id = emp_short_leave_application_refs.leave_id  \
                                    WHERE emp_short_leave_applications.leave_id = ' + leave_id,
                                    (err, rslt) => {

                                        if (err) {

                                            res.status(500).send(err);
                                            res.end();
                                            connection.release();

                                        } else {

                                            let leaveFor = rslt[0].leave_for;
                                            let date = rslt[0].date;

                                            connection.query(
                                                'SELECT time_in FROM emp_attendance WHERE emp_id = ' + empID + " AND emp_date = ?",
                                                [date],
                                                (err, results) => {

                                                    if (err) {

                                                        res.status(500).send(err);
                                                        res.end();
                                                        connection.release();

                                                    } else {
                                                        let timeForBreak = null;
                                                        let q = null;

                                                        if (results[0]) {

                                                            if (leaveFor === 'break_in') {
                                                                timeForBreak = '13:00:00';
                                                                q = {
                                                                    sql: "UPDATE emp_attendance SET status = 'leave', leave_ref = '" + 'short/' + leave_id + "' WHERE emp_id = " + empID + " AND emp_attendance.emp_date = ?",
                                                                    values: [date]
                                                                };
                                                            } else if (leaveFor === 'break_out') {
                                                                timeForBreak = '14:00:00';
                                                                q = {
                                                                    sql: "UPDATE emp_attendance SET status = 'leave', leave_ref = '" + 'short/' + leave_id + "' WHERE emp_id = " + empID + " AND emp_attendance.emp_date = ?",
                                                                    values: [date]
                                                                };
                                                            } else if (leaveFor === 'time_in') {
                                                                q = {
                                                                    sql: "UPDATE emp_attendance SET status = 'leave', leave_ref = '" + 'short/' + leave_id + "' WHERE emp_id = " + empID + " AND emp_attendance.emp_date = ?",
                                                                    values: [date]
                                                                };
                                                            } else {
                                                                q = {
                                                                    sql: "UPDATE emp_attendance SET status = 'leave', leave_ref = '" + 'short/' + leave_id + "' WHERE emp_id = " + empID + " AND emp_attendance.emp_date = ?",
                                                                    values: [date]
                                                                };
                                                            }

                                                            connection.query(
                                                                q,
                                                                [date],
                                                                (err) => {

                                                                    if (err) {

                                                                        res.status(500).send(err);
                                                                        res.end();
                                                                        connection.release();

                                                                    } else {

                                                                        res.send('success');
                                                                        res.end();
                                                                        connection.release();

                                                                    }

                                                                }
                                                            )

                                                        } else {

                                                            if (leaveFor === 'break_in') {
                                                                q = {
                                                                    sql: 'INSERT INTO emp_attendance (emp_id, status, emp_date, leave_ref) VALUES (?,?,?,?)',
                                                                    values: [empID, 'leave', date, 'short/' + leave_id]
                                                                }
                                                            } else if (leaveFor === 'break_out') {
                                                                q = {
                                                                    sql: 'INSERT INTO emp_attendance (emp_id, status, emp_date, leave_ref) VALUES (?,?,?,?)',
                                                                    values: [empID, 'leave', date, 'short/' + leave_id]
                                                                }
                                                            } else if (leaveFor === 'time_in') {
                                                                q = {
                                                                    sql: 'INSERT INTO emp_attendance (emp_id, status, emp_date, leave_ref) VALUES (?,?,?,?)',
                                                                    values: [empID, 'leave', date, 'short/' + leave_id]
                                                                }
                                                            } else {
                                                                q = {
                                                                    sql: 'INSERT INTO emp_attendance (emp_id, status, emp_date, leave_ref) VALUES (?,?,?,?)',
                                                                    values: [empID, 'leave', date, 'short/' + leave_id]
                                                                }
                                                            }

                                                            connection.query(
                                                                q,
                                                                (err) => {

                                                                    if (err) {

                                                                        res.status(500).send(err);
                                                                        res.end();
                                                                        connection.release();

                                                                    } else {

                                                                        res.send('success');
                                                                        res.end();
                                                                        connection.release();

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
                            } else {
                                res.send(rslt);
                                connection.release();
                            }


                        }

                    }
                )
            }

        }
    );

});

router.post('/markleave', (req, res) => {

    const { empID, leaveID, leaveFrom, oneDayLeave, dates } = req.body;

    if (parseInt(oneDayLeave) === 1) {
        db.getConnection(
            (err, connection) => {

                if (err) {
                    res.status(503).send(err);
                    res.end();
                    connection.release();

                    res.send([]);

                } else {
                    connection.query(
                        'INSERT INTO emp_attendance (emp_id, status, emp_date, leave_ref) VALUES (?,?,?,?)',
                        [empID, 'leave', leaveFrom, 'leave/' + leaveID],
                        (err, rslt) => {

                            if (err) {

                                res.status(500).send(err);
                                res.end();
                                connection.release();

                            } else {

                                res.send('success');
                                res.end();
                                connection.release();

                            }

                        }
                    );
                }

            }
        );
    } else {


        db.getConnection(
            (err, connection) => {

                if (err) {

                    res.status(503).send(err);
                    res.end();
                    connection.release();

                    res.send([]);

                } else {
                    for (let x = 0; x < JSON.parse(dates).length; x++) {
                        connection.query(
                            'INSERT INTO emp_attendance (emp_id, status, emp_date, leave_ref) VALUES (?,?,?,?)',
                            [empID, 'leave', JSON.parse(dates)[x], 'leave/' + leaveID],
                            (err, rslt) => {

                                if (err) {

                                    res.status(500).send(err);
                                    res.end();
                                    connection.release();

                                } else {

                                    if ((JSON.parse(dates).length - 1) === x) {
                                        res.send('success');
                                        res.end();
                                        connection.release();
                                    }

                                }

                            }
                        );

                    }
                }

            }
        );

    }

});

module.exports = router;