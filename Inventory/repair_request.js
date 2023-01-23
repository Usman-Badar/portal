const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const MakeDir = require('fs');

const SendWhatsappNotification = require('../Routes/Whatsapp/whatsapp').SendWhatsappNotification;

router.post('/inventory/new_repair_request', ( req, res ) => {

    const { location, subject, description, request_by } = req.body;
    const { Attachments } = req.files;
    const forward_to = 20015;
    const d = new Date();
    let date = new Date().toISOString().slice(0, 10).replace('T', ' ');

    db.query(
        "INSERT INTO `tbl_inventory_repair_requests`(`requested_by`, `request_date`, `request_time`, `location_code`, `subject`, `description`, `forward_to`) VALUES (?,?,?,?,?,?,?);" +
        "SELECT request_id FROM tbl_inventory_repair_requests WHERE requested_by = ? AND request_date = ? AND request_time = ?;" +
        "SELECT employees.emp_id, employees.name, employees.email FROM employees WHERE emp_id = ?;",
        [ request_by, d, d.toTimeString(), location, subject, description, forward_to, request_by, date, d.toTimeString().substring(0,8), forward_to ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send(err);
                res.end();

            }else 
            {

                if ( !Attachments )
                {
                    console.log( err );
                    res.send(rslt[2][0]);
                    res.end();
                }else
                {
                    let arr;
                    if ( typeof(Attachments) === 'object' && !Attachments.length )
                    {
                        arr = [Attachments];
                    }else
                    {
                        arr = Attachments;
                    }

                    for ( let x = 0; x < arr.length; x++ )
                    {
                        
                        db.query(
                            "INSERT INTO tbl_inventory_repair_request_attachments (attachment, request_id) VALUES (?,?);",
                            [ 'assets/portal/assets/images/repair/' + arr[x].name, rslt[1][0].request_id ],
                            ( err, rslt ) => {
                    
                                if( err )
                                {
                    
                                    console.log( err );
                                    res.status(500).send(err);
                                    res.end();
                    
                                }
    
                                    MakeDir.mkdir('assets/portal/assets/images/repair',
                                        { recursive: true },
                                        (err) => {
                                            if (err) {
                
                                                console.log( err );
                                                res.status(500).send(err);
                                                res.end();
                                                
                                            }
                                            else {
                
                                                arr[x].mv('assets/portal/assets/images/repair/' + arr[x].name, (err) => {
                                                        if (err) 
                                                        {
                                                        
                                                            console.log( err );
                                                            res.status(500).send(err);
                                                            res.end();
                                
                                                        }
                            
                                                    }
                                                )
                                                
                                            }
                                        }
                                    )
                    
                            }
                        )

                        if ( ( x + 1 ) === arr.length )
                        {
                            res.send(rslt[2][0]);
                            res.end();
                        }

                    }
                }
                
            }
            
        }
    )

} );

router.post('/inventory/get_repair_requests', ( req, res ) => {

    const { request_by } = req.body;

    db.query(
        "SELECT tbl_inventory_repair_requests.*, locations.location_name FROM `tbl_inventory_repair_requests` LEFT OUTER JOIN locations ON tbl_inventory_repair_requests.location_code = locations.location_code WHERE requested_by = ? ORDER BY request_id DESC;",
        [ request_by ],
        ( err, rslt ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {

                let arr = [];
                for ( let x = 0; x < rslt.length; x++ )
                {
                    db.query(
                        "SELECT * FROM tbl_inventory_repair_request_attachments WHERE request_id = ?;",
                        [ rslt[x].request_id ],
                        ( err, rslt1 ) => {
                
                            if( err )
                            {
                
                                res.send(err);
                                res.end();
                
                            }else 
                            {
                
                                for ( let y = 0; y < rslt1.length; y++ )
                                {
                                    arr.push( rslt1[y] );
                                }
                                
                                if ( (x+1) === rslt.length )
                                {
                                    res.send([rslt, arr]);
                                    res.end();
                                }
                                
                            }
                            
                        }
                    )
                }
                
            }
            
        }
    )

} );

router.post('/inventory/get_all_repair_requests', ( req, res ) => {

    const { emp_id } = req.body;

    db.query(
        "SELECT tbl_inventory_repair_requests.*, locations.location_name FROM `tbl_inventory_repair_requests` LEFT OUTER JOIN locations ON tbl_inventory_repair_requests.location_code = locations.location_code WHERE tbl_inventory_repair_requests.forward_to = ? ORDER BY request_id DESC;",
        [ emp_id ],
        ( err, rslt ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {

                res.send(rslt);
                res.end();
                
            }
            
        }
    )

} );

router.post('/inventory/get_repair_request_details', ( req, res ) => {

    const { request_id } = req.body;

    db.query(
        "SELECT  \
        tbl_inventory_repair_requests.*,  \
        locations.location_name,  \
        requestBy.name request_person,  \
        assignedTo.name assigned_person \
        FROM  \
        `tbl_inventory_repair_requests`  \
        LEFT OUTER JOIN locations ON tbl_inventory_repair_requests.location_code = locations.location_code  \
        LEFT OUTER JOIN employees requestBy ON tbl_inventory_repair_requests.requested_by = requestBy.emp_id  \
        LEFT OUTER JOIN employees assignedTo ON tbl_inventory_repair_requests.assign_to = assignedTo.emp_id  \
        WHERE tbl_inventory_repair_requests.request_id = ?;" +
        "SELECT * FROM `tbl_inventory_repair_request_attachments` WHERE request_id = ?;" +
        "SELECT \
        employees.emp_id, \
        employees.name, \
        emp_props.task_assigning \
        FROM \
        employees \
        LEFT OUTER JOIN emp_props ON employees.emp_id = emp_props.emp_id \
        WHERE emp_props.task_assigning = 1",
        [ request_id, request_id ],
        ( err, rslt ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {

                res.send(rslt);
                res.end();
                
            }
            
        }
    )

} );

router.post('/inventory/set_repair_request_to_viewed', ( req, res ) => {

    const { request_id } = req.body;

    db.query(
        "UPDATE tbl_inventory_repair_requests SET status = ? WHERE request_id = ?;" +
        "SELECT tbl_inventory_repair_requests.request_date, tbl_inventory_repair_requests.request_time, employee.name, employee.cell from tbl_inventory_repair_requests LEFT OUTER JOIN employee ON employee.emp_id = tbl_inventory_repair_requests.requested_by WHERE tbl_inventory_repair_requests.request_id = ?;",
        [ 'viewed', request_id, request_id ],
        ( err, rslt ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {

                SendWhatsappNotification( null, null, "Hi " + rslt[1][0].name, "Your Repair Request ( sent on " + new Date(rslt[1][0].request_date).toDateString() + " at " + rslt[1][0].request_time + ") has viewed by the inventory department, headoffice. \n Please wait for the approval.", rslt[1][0].cell );
                res.send('success');
                res.end();
                
            }
            
        }
    )

} );

router.post('/inventory/set_repair_request_to_pending', ( req, res ) => {

    const { request_id, reason } = req.body;

    db.query(
        "UPDATE tbl_inventory_repair_requests SET status = ?, remarks = ? WHERE request_id = ?;" +
        "SELECT tbl_inventory_repair_requests.request_date, tbl_inventory_repair_requests.request_time, employee.name, employee.cell from tbl_inventory_repair_requests LEFT OUTER JOIN employee ON employee.emp_id = tbl_inventory_repair_requests.requested_by WHERE tbl_inventory_repair_requests.request_id = ?;",
        [ 'pending', reason, request_id, request_id ],
        ( err ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {

                SendWhatsappNotification( null, null, "Hi " + rslt[1][0].name, "Your Repair Request ( sent on " + new Date(rslt[1][0].request_date).toDateString() + " at " + rslt[1][0].request_time + ") has set to pending under reason '" + reason + "' by the inventory department, headoffice.", rslt[1][0].cell );
                res.send('success');
                res.end();
                
            }
            
        }
    )

} );

router.post('/inventory/set_repair_request_to_reject', ( req, res ) => {

    const { request_id, reason } = req.body;

    db.query(
        "UPDATE tbl_inventory_repair_requests SET status = ?, remarks = ? WHERE request_id = ?;",
        [ 'rejected', reason, request_id ],
        ( err ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {

                // SendWhatsappNotification( null, null, "Hi " + rslt[1][0].name, "Your Repair Request ( sent on " + new Date(rslt[1][0].request_date).toDateString() + " at " + rslt[1][0].request_time + ") has rejected by the inventory department, headoffice.", rslt[1][0].cell );
                res.send('success');
                res.end();
                
            }
            
        }
    )

} );

router.post('/inventory/assign_repair_request', ( req, res ) => {

    const { request_id, assign_to } = req.body;
    const d = new Date();

    db.query(
        "UPDATE tbl_inventory_repair_requests SET assign_to = ?, assign_date = ?, assign_time = ?, status = ? WHERE request_id = ?;" +
        "SELECT tbl_inventory_repair_requests.request_date, tbl_inventory_repair_requests.request_time, employee.name, employee.cell from tbl_inventory_repair_requests LEFT OUTER JOIN employee ON employee.emp_id = tbl_inventory_repair_requests.requested_by WHERE tbl_inventory_repair_requests.request_id = ?;",
        [ assign_to, d, d.toTimeString(), 'working', request_id, request_id ],
        ( err, rslt ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {

                SendWhatsappNotification( null, null, "Hi " + rslt[1][0].name, "Inventory Department has assigned you a task related to a repar request, kindly contact our inventory department", rslt[1][0].cell );
                res.send('success');
                res.end();
                
            }
            
        }
    )

} );

router.get('/inventory/load/:path', ( req, res ) => {

    let q;

    if ( req.url === '/inventory/load/repair' )
    {
        q = "SELECT \
        COUNT(tbl_inventory_repair_requests.request_id) AS requests_count, \
        MONTH(tbl_inventory_repair_requests.request_date) AS month  \
        FROM `tbl_inventory_repair_requests` \
        GROUP BY MONTH(tbl_inventory_repair_requests.request_date);";
    }else
    if ( req.url === '/inventory/load/general_info' )
    {
        q = "SELECT  \
        COUNT(tbl_inventory_repair_requests.request_id) AS requests_count, \
        'Repair Requests' AS title, \
        'repair' AS id \
        FROM `tbl_inventory_repair_requests`;";

        q = q.concat(
            "SELECT  \
            COUNT(tbl_item_requests.id) AS requests_count, \
            'Item Requests' AS title, \
            'item_requests' AS id \
            FROM `tbl_item_requests`;"
        )
    }else
    {
        q = "SELECT \
        COUNT(tbl_item_requests.id) AS requests_count, \
        MONTH(tbl_item_requests.request_date) AS month  \
        FROM `tbl_item_requests` \
        GROUP BY MONTH(tbl_item_requests.request_date);";
    }
    db.query(
        q,
        ( err, rslt ) => {

            if( err )
            {

                console.log( err )
                res.send(err);
                res.end();

            }else 
            {

                res.send([rslt, []]);
                res.end();
                
            }
            
        }
    )


} );

router.post('/inventory/complete_repair_request', ( req, res ) => {

    const { request_id, remarks, closed_by, AttachmentName } = req.body;
    const { Attachments } = req.files;
    const d = new Date();

    db.query(
        "UPDATE tbl_inventory_repair_requests SET closed_by = ?, close_date = ?, close_time = ?, status = ?, remarks = ? WHERE request_id = ?;",
        [ closed_by, d, d.toTimeString(), 'closed', remarks, request_id ],
        ( err ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {

                console.log( Attachments )
                if ( !Attachments )
                {
                    res.send('error');
                    res.end();
                }else
                {
                    let arr;
                    if ( typeof(Attachments) === 'object' && !Attachments.length )
                    {
                        arr = [Attachments];
                    }else
                    {
                        arr = Attachments;
                    }

                    for ( let x = 0; x < arr.length; x++ )
                    {
                        
                        console.log( arr[x] );
                        // console.log( arr[x] );
                        db.query(
                            "INSERT INTO tbl_inventory_repair_request_attachments (attachment, request_id) VALUES (?,?);",
                            [ 'assets/portal/assets/images/repair/' + arr[x].name, request_id ],
                            ( err ) => {
                    
                                if( err )
                                {
                    
                                    console.log( err );
                                    res.status(500).send(err);
                                    res.end();
                    
                                }
    
                                    MakeDir.mkdir('assets/portal/assets/images/repair',
                                        { recursive: true },
                                        (err) => {
                                            if (err) {
                
                                                console.log( err );
                                                res.status(500).send(err);
                                                res.end();
                                                
                                            }
                                            else {
                
                                                arr[x].mv('assets/portal/assets/images/repair/' + AttachmentName, (err) => {
                                                        if (err) 
                                                        {
                                                        
                                                            console.log( err );
                                                            res.status(500).send(err);
                                                            res.end();
                                
                                                        }
                            
                                                    }
                                                )
                                                
                                            }
                                        }
                                    )
                    
                            }
                        )

                        if ( ( x + 1 ) === arr.length )
                        {
                            res.send('success');
                            res.end();
                        }

                    }
                }
                
            }
            
        }
    )

} );

module.exports = router;