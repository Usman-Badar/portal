const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

const CreateLogs = require('../Employee/logs').CreateLog;
const io = require('../../server');

io.on('connection', ( socket ) => {

    // WHEN NEW USER LOGGED IN
    socket.on(
        'somethingchangeinitemrequest', ( request_id ) => {
            
            socket.broadcast.emit(
                'somethingchangeinitemrequest', request_id 
            )
    
        }
    )

    socket.on(
        'newitemrequestcomment', ( request_id ) => {
            
            socket.broadcast.emit(
                'newitemrequestcomment', request_id 
            )
    
        }
    )

});

router.post('/getallitemrequests', ( req, res ) => {

    const { emp_id, access } = req.body;

    // const empAccess = JSON.parse( access );
    let query;
    let perameters;
    // if ( empAccess.includes(530) || empAccess.includes(1) )
    // {
    //     query = "SELECT \
    //     tbl_item_requests.*, \
    //     locations.location_name, \
    //     companies.company_name, \
    //     receiver.name AS receiver_name, \
    //     sender.name AS sender_name \
    //     FROM \
    //     tbl_item_requests \
    //     LEFT OUTER JOIN locations ON tbl_item_requests.location_code = locations.location_code \
    //     LEFT OUTER JOIN companies ON tbl_item_requests.company_code = companies.company_code \
    //     LEFT OUTER JOIN employees receiver ON tbl_item_requests.received_by = receiver.emp_id \
    //     LEFT OUTER JOIN employees sender ON tbl_item_requests.request_by = sender.emp_id \
    //     WHERE \
    //     tbl_item_requests.request_by = ? OR tbl_item_requests.received_by = ? OR tbl_item_requests.acted_by = ? OR tbl_item_requests.status = 'approved' OR tbl_item_requests.status = 'proceed to purchase requisition' OR tbl_item_requests.status = 'delivery is in process' OR tbl_item_requests.status = 'delivered' ORDER BY tbl_item_requests.id DESC LIMIT 15;";
    //     perameters = [ emp_id, emp_id, emp_id ];
    // }else
    // {
        query = "SELECT \
        tbl_item_requests.*, \
        locations.location_name, \
        companies.company_name, \
        receiver.name AS receiver_name, \
        sender.name AS sender_name \
        FROM \
        tbl_item_requests \
        LEFT OUTER JOIN locations ON tbl_item_requests.location_code = locations.location_code \
        LEFT OUTER JOIN companies ON tbl_item_requests.company_code = companies.company_code \
        LEFT OUTER JOIN employees receiver ON tbl_item_requests.received_by = receiver.emp_id \
        LEFT OUTER JOIN employees sender ON tbl_item_requests.request_by = sender.emp_id \
        WHERE \
        tbl_item_requests.request_by = ? OR tbl_item_requests.received_by = ? OR tbl_item_requests.acted_by = ? ORDER BY tbl_item_requests.id DESC LIMIT 10;";
        perameters = [ emp_id, emp_id, emp_id ];
    // }

    db.query(
        query,
        perameters,
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

router.post('/getitemrequestdetails', ( req, res ) => {

    const { id } = req.body;

    db.query(
        "SELECT \
        tbl_item_requests.*, \
        companies.company_name, \
        locations.location_name, \
        receiver.name AS receiver_name, \
        requisition.name AS requisition_name, \
        sender.name AS sender_name \
        FROM \
        tbl_item_requests \
        LEFT OUTER JOIN companies ON tbl_item_requests.company_code = companies.company_code \
        LEFT OUTER JOIN locations ON tbl_item_requests.location_code = locations.location_code \
        LEFT OUTER JOIN employees receiver ON tbl_item_requests.received_by = receiver.emp_id \
        LEFT OUTER JOIN employees requisition ON tbl_item_requests.pr_request_generate_by = requisition.emp_id \
        LEFT OUTER JOIN employees sender ON tbl_item_requests.request_by = sender.emp_id \
        WHERE tbl_item_requests.id = ?;",
        [ id ],
        ( err, rslt ) => {

            if( err )
            {

                console.log(err);
                res.status(500).send(err);
                res.end();

            }else 
            {
                
                db.query(
                    "SELECT \
                    tbl_item_requests_specifications.*, \
                    tbl_inventory_sub_categories.name  \
                    FROM \
                    tbl_item_requests_specifications \
                    LEFT OUTER JOIN tbl_inventory_sub_categories ON tbl_item_requests_specifications.item_id = tbl_inventory_sub_categories.id \
                    WHERE tbl_item_requests_specifications.request_id = ?",
                    [ rslt[0].id ],
                    ( err, result ) => {
            
                        if( err )
                        {
            
                            console.log(err);
                            res.status(500).send(err);
                            res.end();
            
                        }else 
                        {
                            
                            db.query(
                                "SELECT * FROM `tbl_logs` WHERE tbl_name = 'tbl_item_requests' AND id = ?",
                                [ rslt[0].id ], 
                                ( err, result2 ) => {
                        
                                    if( err )
                                    {
                        
                                        console.log(err);
                                        res.status(500).send(err);
                                        res.end();
                        
                                    }else 
                                    {
                                        
                                        db.query(
                                            "SELECT \
                                            tbl_inventory_sub_categories.* \
                                            FROM \
                                            tbl_item_requests_specifications \
                                            LEFT OUTER JOIN tbl_inventory_sub_categories ON tbl_item_requests_specifications.item_id = tbl_inventory_sub_categories.id \
                                            WHERE \
                                            tbl_item_requests_specifications.request_id = ?;",
                                            [ rslt[0].id ], 
                                            ( err, result3 ) => {
                                    
                                                if( err )
                                                {
                                    
                                                    console.log(err);
                                                    res.status(500).send(err);
                                                    res.end();
                                    
                                                }else 
                                                {
                                                    
                                                    let arr = [];
                                                    arr.push( rslt );
                                                    arr.push( result );
                                                    arr.push( result2 );
                                                    arr.push( result3 );
                                                    res.send( arr );
                                                    res.end();
                                    
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
    )
    
} );

router.post('/newitemrequest', ( req, res ) => {

    const { request, specifications } = req.body;

    let requestData = JSON.parse( request );
    let specificationsData = JSON.parse( specifications );
    const d = new Date( requestData.request_date );

    db.query(
        "INSERT INTO `tbl_item_requests`(`location_code`, `company_code`, `request_by`, `request_date`, `request_time`, `received_by`, `received_date`, `received_time`) VALUES (?,?,?,?,?,?,?,?);" +
        "SELECT id FROM tbl_item_requests WHERE request_by = ? AND received_by = ? AND received_time = ?;",
        [ requestData.location_code, requestData.company_code, requestData.request_by, d, d.toTimeString(), requestData.request_to, d, d.toTimeString(), requestData.request_by, requestData.request_to, d.toTimeString().substring(0,8) ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.status(500).send(err);
                res.end();

            }else 
            {
                
                for ( let x = 0; x < specificationsData.length; x++ )
                {
                    db.query(
                        "INSERT INTO `tbl_item_requests_specifications`(`request_id`, `item_id`, `reason`, `required_quantity`) VALUES (?,?,?,?);",
                        [ rslt[1][0].id, specificationsData[x].item_id, specificationsData[x].reason, specificationsData[x].required_quantity ],
                        ( err ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                                res.status(500).send(err);
                                res.end();
                
                            }else 
                            {
                                
                                if ( ( x + 1 ) === specificationsData.length )
                                {
                                    CreateLogs( 
                                        'tbl_item_requests', 
                                        rslt[1][0].id,
                                        "New item request initialized",
                                        'info'
                                    );
                                    res.send("Success");
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

router.post('/cancelitemrequest', ( req, res ) => {

    const { request_id, emp_id, reason } = req.body;

    db.query(
        "UPDATE tbl_item_requests SET status = ?, acted_by = ?, acted_date = ?, acted_time = ?, remarks = ? WHERE id = ?",
        [ 'canceled', emp_id, new Date(), new Date().toTimeString(), reason, request_id ],
        ( err ) => {

            if( err )
            {

                console.log( err );
                res.status(500).send(err);
                res.end();

            }else 
            {
             
                CreateLogs( 
                    'tbl_item_requests', 
                    request_id,
                    "This request has been canceled",
                    'info'
                );
                res.send("Success");
                res.end();

            }

        }
    )

} );

router.post('/newitemrequestcomment', ( req, res ) => {

    const { comment, item_request_id, sender_id } = req.body;
    const d = new Date();

    db.query(
        "INSERT INTO `tbl_item_request_comments`(`item_request_id`, `sender_id`, `send_date`, `send_time`, `comment`) VALUES (?,?,?,?,?);",
        [ item_request_id, sender_id, d, d.toTimeString(), comment ],
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

router.post('/getitemrequestcomments', ( req, res ) => {

    const { id } = req.body;

    db.query(
        "SELECT \
        tbl_item_request_comments.*, \
        employees.name \
        FROM  \
        tbl_item_request_comments \
        LEFT OUTER JOIN employees ON tbl_item_request_comments.sender_id = employees.emp_id \
        WHERE \
        tbl_item_request_comments.item_request_id = ?;",
        [ id ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.status(500).send(err);
                res.end();

            }else 
            {

                res.send(rslt);
                res.end();

            }

        }
    )

} );

router.post('/approveitemrequest', ( req, res ) => {

    const { request_id, emp_id, reason } = req.body;

    db.query(
        "UPDATE tbl_item_requests SET status = ?, acted_by = ?, acted_date = ?, acted_time = ?, remarks = ? WHERE id = ?",
        [ 'approved', emp_id, new Date(), new Date().toTimeString(), reason, request_id ],
        ( err ) => {

            if( err )
            {

                console.log( err );
                res.status(500).send(err);
                res.end();

            }else 
            {
             
                CreateLogs( 
                    'tbl_item_requests', 
                    request_id,
                    "This request has been approved",
                    'info'
                );
                CreateLogs( 
                    'tbl_item_requests', 
                    request_id,
                    "Pending for delivery",
                    'info'
                );
                res.send("Success");
                res.end();

            }

        }
    )

} );

router.post('/rejectitemrequest', ( req, res ) => {

    const { request_id, emp_id, reason } = req.body;

    db.query(
        "UPDATE tbl_item_requests SET status = ?, acted_by = ?, acted_date = ?, acted_time = ?, remarks = ? WHERE id = ?",
        [ 'rejected', emp_id, new Date(), new Date().toTimeString(), reason, request_id ],
        ( err ) => {

            if( err )
            {

                console.log( err );
                res.status(500).send(err);
                res.end();

            }else 
            {
             
                CreateLogs( 
                    'tbl_item_requests', 
                    request_id,
                    "This request has been approved",
                    'info'
                );
                res.send("Success");
                res.end();

            }

        }
    )

} );

router.post('/deliveritemrequest', ( req, res ) => {

    const { request_id } = req.body;

    db.query(
        "UPDATE tbl_item_requests SET status = ?, delivery_date = ?, delivery_time = ? WHERE id = ?",
        [ 'delivery is in process', new Date(), new Date().toTimeString(), request_id ],
        ( err ) => {

            if( err )
            {

                console.log( err );
                res.status(500).send(err);
                res.end();

            }else 
            {
             
                CreateLogs( 
                    'tbl_item_requests', 
                    request_id,
                    "The delivery of this request is in process",
                    'info'
                );
                res.send("Success");
                res.end();

            }

        }
    )

} );

router.post('/delivereditemrequest', ( req, res ) => {

    const { request_id } = req.body;

    db.query(
        "UPDATE tbl_item_requests SET status = ? WHERE id = ?",
        [ 'delivered', request_id ],
        ( err ) => {

            if( err )
            {

                console.log( err );
                res.status(500).send(err);
                res.end();

            }else 
            {
             
                CreateLogs( 
                    'tbl_item_requests', 
                    request_id,
                    "The items of this request has delivered",
                    'info'
                );

                CreateLogs( 
                    'tbl_item_requests', 
                    request_id,
                    "Request Completed",
                    'info'
                );
                res.send("Success");
                res.end();

            }

        }
    )

} );

module.exports = router;