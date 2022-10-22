const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/inventory/new_repair_request', ( req, res ) => {

    const { location, subject, description, request_by } = req.body;
    const d = new Date();

    db.query(
        "INSERT INTO `tbl_inventory_repair_requests`(`requested_by`, `request_date`, `request_time`, `location_code`, `subject`, `description`) VALUES (?,?,?,?,?,?);",
        [ request_by, d, d.toTimeString(), location, subject, description ],
        ( err ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {

                res.send('success');
                res.end();
                
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

                res.send(rslt);
                res.end();
                
            }
            
        }
    )

} );

router.get('/inventory/get_all_repair_requests', ( req, res ) => {

    db.query(
        "SELECT tbl_inventory_repair_requests.*, locations.location_name FROM `tbl_inventory_repair_requests` LEFT OUTER JOIN locations ON tbl_inventory_repair_requests.location_code = locations.location_code ORDER BY request_id DESC;",
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
        "SELECT tbl_inventory_repair_requests.*, locations.location_name, employees.name FROM `tbl_inventory_repair_requests` LEFT OUTER JOIN locations ON tbl_inventory_repair_requests.location_code = locations.location_code LEFT OUTER JOIN employees ON tbl_inventory_repair_requests.requested_by = employees.emp_id WHERE tbl_inventory_repair_requests.request_id = ?;",
        [ request_id ],
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
        "UPDATE tbl_inventory_repair_requests SET status = ? WHERE request_id = ?;",
        [ 'viewed', request_id ],
        ( err ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {

                res.send('success');
                res.end();
                
            }
            
        }
    )

} );

module.exports = router;