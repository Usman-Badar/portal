const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const fs = require('fs');
const MakeDir = require('fs');
const moment = require('moment');
const io = require('../../server');

const SendWhatsappNotification = require('../Whatsapp/whatsapp').SendWhatsappNotification;

io.on('connection', ( socket ) => {

    socket.on(
        'newpurchaseorder', () => {
            
            socket.broadcast.emit('newpurchaseorder');
    
        }
    )

});

router.post('/purchase/order/submission', ( req, res ) => {

    const { submitted_to, specifications, data, note, pr_id, vendor_id, requested_by } = req.body;

    const code = new Date().getTime() + '_' + new Date().getDate() + (new Date().getMonth() + 1) + new Date().getFullYear();
    const received_specifications = JSON.parse( specifications );
    let arr_specifications_names = []; 
    const received_data = JSON.parse( data );
    let bills_attached = 0;
    if ( req.files )
    {
        const { Attachments } = req.files;
        let arr;
        if ( typeof(Attachments) === 'object' && !Attachments.length )
        {
            arr = [Attachments];
        }else
        {
            arr = Attachments;
        }
        bills_attached = arr.length;
    }

    db.query(
        "INSERT INTO `tbl_inventory_purchase_order`(`pr_id`, `invoice_no`, `entry`, `vendor_id`, `company_code`, `ship_to`, `new_purchase`, `repair`, `replace_recycle`, `invoice_attached`, `requested_by`, `requested_date`, `requested_time`, `total_value`, `total_sub_value`, `no_items_requested`, `status`, `appr_rejct_by`, `bills_attached`, `note`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
        [ pr_id == 'undefined' ? null : pr_id, received_data.invoice_no, code, vendor_id, received_data.company_code, received_data.location_code, received_data.new_purchase_checkbox ? 1 :0, received_data.repair_checkbox ? 1 :0, received_data.replace_recycle_checkbox ? 1 :0, received_data.invoice_attached_checkbox ? 1 :0, requested_by, new Date(), new Date().toTimeString(), received_data.total_calculated_amount, received_data.sub_total_calculated_amount, received_specifications.length, "waiting_for_approval", submitted_to, bills_attached, note ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                const mPoId = rslt.insertId;
                for ( let x = 0; x < received_specifications.length; x++ )
                {
                    arr_specifications_names.push(received_specifications[x].specification_description);
                    db.query(
                        "INSERT INTO `tbl_inventory_purchase_order_specifications`(`po_id`, `sr_no`, `description`, `quantity`, `unit`, `unit_price`, `total_cost`, `entered_by`, `entered_date`) VALUES (?,?,?,?,?,?,?,?,?);",
                        [ mPoId, received_specifications[x].specification_serial_number, received_specifications[x].specification_description, received_specifications[x].specification_quantity, received_specifications[x].specification_unit, received_specifications[x].specification_est_cost, received_specifications[x].specification_total_cost, requested_by, new Date() ],
                        ( err ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                                res.send( err );
                                res.end();
                
                            }
                
                        }
                    );
                }

                for ( let x = 0; x < received_data.additional_specifications.length; x++ )
                {
                    db.query(
                        "INSERT INTO `tbl_inventory_purchase_order_additional_specifications`(`po_id`, `label`, `value`, `entered_by`, `entered_date`) VALUES (?,?,?,?,?);",
                        [ mPoId, received_data.additional_specifications[x].additional_label, received_data.additional_specifications[x].additional_value, requested_by, new Date() ],
                        ( err ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                                res.send( err );
                                res.end();
                
                            }
                
                        }
                    );
                }

                db.query(
                    "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                    "SELECT name, cell FROM employees WHERE emp_id = ?;",
                    [ requested_by, submitted_to ],
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            res.send( err );
                            res.end();
            
                        }else
                        {
                            SendWhatsappNotification( null, null, "Hi " + rslt[1][0].name, rslt[0][0].name + " have sent you a purchase order for " + arr_specifications_names.join(', ') + ". The total value of the requisition is Rs " + received_data.total_calculated_amount.toLocaleString('en') + ". Kindly check", rslt[1][0].cell );
                            SendWhatsappNotification( null, null, "Hi " + rslt[0][0].name, "We have received your purchase order. Kindly wait while our accounts department starts working on it", rslt[0][0].cell );
                        }
            
                    }
                );

                if ( req.files )
                {
                    const { Attachments } = req.files;
                    let arr;
                    if ( typeof(Attachments) === 'object' && !Attachments.length )
                    {
                        arr = [Attachments];
                    }else
                    {
                        arr = Attachments;
                    }
                    for ( let y = 0; y < arr.length; y++ )
                    {
                        MakeDir.mkdir('assets/inventory/assets/images/bills',
                            { recursive: true },
                            (err) => {
                                if (err) {
    
                                    console.log( err );
                                    res.status(500).send(err);
                                    res.end();
                                    
                                }
                                else {
                                    
                                    let name = new Date().getTime() + "_" + arr[y].name;
                                    arr[y].mv('assets/inventory/assets/images/bills/' + name, (err) => {
                                            if (err) 
                                            {
                                            
                                                console.log( err );
                                                res.status(500).send(err);
                                                res.end();
                    
                                            }else
                                            {
                                                db.query(
                                                    "INSERT INTO `tbl_inventory_purchase_order_bills`(`bill`, `uploaded_by`, `uploaded_date`, `uploaded_time`, `po_id`) VALUES (?,?,?,?,?);",
                                                    [ 'assets/inventory/assets/images/bills/' + name, requested_by, new Date(), new Date().toTimeString(), mPoId ],
                                                    ( err ) => {
                                            
                                                        if( err )
                                                        {
                                            
                                                            console.log( err );
                                                            res.send( err );
                                                            res.end();
                                            
                                                        }
                                            
                                                    }
                                                );
                                            }
                                        }
                                    )
                                    
                                }
                            }
                        )

                        if ( (y+1) === arr.length )
                        {
                            res.send("success");
                            res.end();
                        }
                    }
                }else
                {
                    res.send("success");
                    res.end();
                }

            }

        }
    );

} );

router.post('/purchase/order/load/requests', ( req, res ) => {

    const { emp_id } = req.body;

    db.query(
        "SELECT tbl_inventory_purchase_order.status,  \
        tbl_inventory_purchase_order.no_items_requested,  \
        tbl_inventory_purchase_order.total_value,  \
        tbl_inventory_purchase_order.requested_date,  \
        tbl_inventory_purchase_order.requested_time,  \
        tbl_inventory_purchase_order.po_id,  \
        tbl_inventory_purchase_order.appr_rejct_by,  \
        requested_employee.name AS requested_employee_name,  \
        requested_employee_designations.designation_name AS requested_employee_designation_name,  \
        companies.company_name, \
        locations.location_name \
        FROM `tbl_inventory_purchase_order`  \
        LEFT OUTER JOIN companies ON tbl_inventory_purchase_order.company_code = companies.company_code \
        LEFT OUTER JOIN locations ON tbl_inventory_purchase_order.ship_to = locations.location_code \
        LEFT OUTER JOIN employees requested_employee ON tbl_inventory_purchase_order.requested_by = requested_employee.emp_id \
        LEFT OUTER JOIN designations requested_employee_designations ON requested_employee.designation_code = requested_employee_designations.designation_code \
        WHERE requested_by = ? OR submitted_to = ? OR appr_rejct_by = ? ORDER BY po_id DESC;",
        [ emp_id, emp_id, emp_id ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                
                res.send(rslt);
                res.end();

            }

        }
    );

} );

router.post('/purchase/order/load/subordinates', ( req, res ) => {

    const { emp_id } = req.body;

    db.query(
        "SELECT \
        employees.emp_id, \
        employees.name, \
        emp_props.po_receival \
        FROM \
        employees \
        LEFT OUTER JOIN emp_props ON employees.emp_id = emp_props.emp_id \
        LEFT OUTER JOIN tbl_er ON employees.emp_id = tbl_er.jr \
        WHERE emp_props.po_receival = 1 AND tbl_er.sr = ?;",
        [ emp_id ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                
                res.send(rslt);
                res.end();

            }

        }
    );

} );

router.post('/purchase/order/details', ( req, res ) => {

    const { po_id, viewed } = req.body;

    db.query(
        ( viewed ? "UPDATE tbl_inventory_purchase_order SET view_date = ?, view_time = ? WHERE po_id = ? AND view_date IS NULL;" : "SELECT ? AND ? AND ?;" ) +
        "SELECT tbl_inventory_purchase_order.*,  \
        companies.*, \
        submit_to_employee.name AS submit_to_employee_name, \
        hod_employee.name AS hod_employee_name, \
        requested_employee.name AS requested_employee_name, \
        requested_employee_designation.designation_name AS requested_employee_designation_name, \
        submit_to_employee_designation.designation_name AS submit_to_employee_designation_name, \
        hod_employee_designation.designation_name AS hod_employee_designation_name, \
        locations.location_code, \
        locations.location_name, \
        locations.address, \
        locations.location_phone, \
        tbl_inventory_venders.name AS vendor_name, \
        tbl_inventory_venders.phone AS vendor_phone, \
        tbl_inventory_venders.address AS vendor_address \
        FROM `tbl_inventory_purchase_order`  \
        LEFT OUTER JOIN companies ON tbl_inventory_purchase_order.company_code = companies.company_code \
        LEFT OUTER JOIN locations ON tbl_inventory_purchase_order.ship_to = locations.location_code \
        LEFT OUTER JOIN tbl_inventory_venders ON tbl_inventory_purchase_order.vendor_id = tbl_inventory_venders.vender_id \
        LEFT OUTER JOIN employees requested_employee ON tbl_inventory_purchase_order.requested_by = requested_employee.emp_id \
        LEFT OUTER JOIN employees submit_to_employee ON tbl_inventory_purchase_order.submitted_to = submit_to_employee.emp_id \
        LEFT OUTER JOIN employees hod_employee ON tbl_inventory_purchase_order.appr_rejct_by = hod_employee.emp_id \
        LEFT OUTER JOIN designations requested_employee_designation ON requested_employee.designation_code = requested_employee_designation.designation_code \
        LEFT OUTER JOIN designations submit_to_employee_designation ON submit_to_employee.designation_code = submit_to_employee_designation.designation_code \
        LEFT OUTER JOIN designations hod_employee_designation ON hod_employee.designation_code = hod_employee_designation.designation_code \
        WHERE po_id = ?;" +
        "SELECT * FROM `tbl_inventory_purchase_order_specifications` WHERE po_id = ? ORDER BY sr_no;" +
        "SELECT * FROM `tbl_inventory_purchase_order_bills` WHERE po_id = ?;" +
        "SELECT * FROM `tbl_inventory_purchase_order_additional_specifications` WHERE po_id = ?;",
        [ new Date(), new Date().toTimeString(), po_id, po_id, po_id, po_id, po_id ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err )
                res.send( err );
                res.end();

            }else 
            {

                if ( viewed && rslt[0].affectedRows != 0 )
                {
                    db.query(
                        "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                        "SELECT name, cell FROM employees WHERE emp_id = ?;",
                        [ rslt[1][0].requested_by, rslt[1][0].submitted_to ],
                        ( err, result ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                                res.send( err );
                                res.end();
                
                            }else
                            {
                                SendWhatsappNotification( null, null, "Hi " + result[1][0].name, "The purchase order with PO NO # " + rslt[1][0].po_id + " has been 'viewed'. The requested employee has been notified.", result[1][0].cell );
                                SendWhatsappNotification( null, null, "Hi " + result[0][0].name, "Our accounts department has viewed your purchase order with PO NO # " + rslt[1][0].po_id + ". Kindly wait.", result[0][0].cell );
                            }
                
                        }
                    );
                }

                let arr = [];

                if ( rslt[1][0].pr_id )
                {
                    db.query( 
                        "SELECT tbl_inventory_purchase_requisition.*,  \
                        companies.company_name, \
                        submit_to_employee.name AS submit_to_employee_name, \
                        hod_employee.name AS hod_employee_name, \
                        requested_employee.name AS requested_employee_name, \
                        requested_employee_designation.designation_name AS requested_employee_designation_name, \
                        submit_to_employee_designation.designation_name AS submit_to_employee_designation_name, \
                        hod_employee_designation.designation_name AS hod_employee_designation_name, \
                        locations.location_name \
                        FROM `tbl_inventory_purchase_requisition`  \
                        LEFT OUTER JOIN companies ON tbl_inventory_purchase_requisition.company_code = companies.company_code \
                        LEFT OUTER JOIN locations ON tbl_inventory_purchase_requisition.location_code = locations.location_code \
                        LEFT OUTER JOIN employees requested_employee ON tbl_inventory_purchase_requisition.requested_by = requested_employee.emp_id \
                        LEFT OUTER JOIN employees submit_to_employee ON tbl_inventory_purchase_requisition.submitted_to = submit_to_employee.emp_id \
                        LEFT OUTER JOIN employees hod_employee ON tbl_inventory_purchase_requisition.appr_rejct_by = hod_employee.emp_id \
                        LEFT OUTER JOIN designations requested_employee_designation ON requested_employee.designation_code = requested_employee_designation.designation_code \
                        LEFT OUTER JOIN designations submit_to_employee_designation ON submit_to_employee.designation_code = submit_to_employee_designation.designation_code \
                        LEFT OUTER JOIN designations hod_employee_designation ON hod_employee.designation_code = hod_employee_designation.designation_code \
                        WHERE pr_id = ?;" +
                        "SELECT * FROM `tbl_inventory_purchase_requisition_specifications` WHERE pr_id = ?;",
                        [ rslt[1][0].pr_id, rslt[1][0].pr_id ],
                        ( err, result ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                                res.send( err );
                                res.end();
                
                            }else
                            {
                                arr = result;
                
                                res.send([rslt, arr]);
                                res.end();
                            }
                
                        }
                    );
                }else
                {
                    res.send([rslt, []]);
                    res.end();
                }

            }

        }
    );

} );

router.post('/purchase/order/approval', ( req, res ) => {

    const { emp_id, reason, submit_to, po_id, requested_by } = req.body;

    db.query(
        "UPDATE tbl_inventory_purchase_order SET status = ?, submitted_to = ?, act_date = ?, act_time = ?, remarks_from_hod = ? WHERE po_id = ?;",
        [ 'approved', submit_to, new Date(), new Date().toTimeString(), reason, po_id ],
        ( err ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                
                db.query(
                    "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                    "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                    "SELECT name, cell FROM employees WHERE emp_id = ?;",
                    [ emp_id, requested_by, submit_to ],
                    ( err, result ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            res.send( err );
                            res.end();
            
                        }else
                        {
                            SendWhatsappNotification( null, null, "Hi " + result[0][0].name, "You have approved the purchase order with PO NO # " + po_id + ", and the requested employee has been notified.", result[0][0].cell );
                            SendWhatsappNotification( null, null, "Hi " + result[1][0].name, "Your purchase order with PO NO # " + po_id + " has been approved by the accounts department.", result[1][0].cell );
                            SendWhatsappNotification( null, null, "Hi " + result[2][0].name, "The accounts department has proceed you a purchase order with PO NO # " + po_id + ". Kindly review.", result[2][0].cell );
                            res.send('success');
                            res.end();
                        }
            
                    }
                );

            }

        }
    );

} );

router.post('/purchase/order/reject', ( req, res ) => {

    const { po_id, requested_by, emp_id, remarks, specifications, department } = req.body;
    let arr = [];
    for ( let x = 0; x < JSON.parse(specifications).length; x++ )
    {
        arr.push( JSON.parse(specifications)[x].description );
    }

    db.query(
        "UPDATE tbl_inventory_purchase_order SET status = 'rejected', act_date = ?, act_time = ?, remarks_from_hod = ? WHERE po_id = ?;",
        [ new Date(), new Date().toTimeString(), remarks, po_id ],
        ( err ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                
                db.query(
                    "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                    "SELECT name, cell FROM employees WHERE emp_id = ?;",
                    [ emp_id, requested_by ],
                    ( err, result ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            res.send( err );
                            res.end();
            
                        }else
                        {
                            SendWhatsappNotification( null, null, "Hi " + result[0][0].name, "You have rejected the purchase Order with PO NO # " + po_id + " with reason '" + remarks + "'. The requested employee has been notified.", result[0][0].cell );
                            SendWhatsappNotification( null, null, "Hi " + result[1][0].name, "Your Purchase Order with PO NO # " + po_id + " has been rejected by the "  + ( department ) + " department with remarks '" + remarks + "'. If you have any question, kindly contact our " + ( department ) + " department, headoffice.", result[1][0].cell );

                            res.send('success');
                            res.end();
                        }
            
                    }
                );

            }

        }
    );

} );

router.get('/getlastpono', ( req, res ) => {

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "SELECT po_id FROM invtry_purchase_order ORDER BY po_id DESC LIMIT 1",
                    ( err, rslt ) => {
            
                        if( err )
                        {
                            res.status(500).send(err);
                            res.end();
                            connection.release();
            
                        }else 
                        {
            
                            let id = rslt[0] ? rslt[0].po_id : 0;
                            id = id + 1;
                            res.send(
                                [
                                    {
                                        id: id
                                    }
                                ]
                            );
                            connection.release();
            
                        }
            
                    }
                );
            }

        }
    );

} );

router.post('/getpronkey', ( req, res ) => {

    const { key } = req.body;

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
                    employees.emp_id, \
                    employees.name, \
                    locations.location_name,  \
                    companies.company_name, \
                    departments.department_name, \
                    designations.designation_name,  \
                    emp_app_profile.emp_image,  \
                    invtry_purchase_requests.*, \
                    invtry_purchase_requests.status as status \
                    FROM employees  \
                    LEFT OUTER JOIN companies ON employees.company_code = companies.company_code  \
                    LEFT OUTER JOIN departments ON employees.department_code = departments.department_code  \
                    LEFT OUTER JOIN locations ON employees.location_code = locations.location_code  \
                    LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code  \
                    RIGHT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id  \
                    RIGHT OUTER JOIN invtry_purchase_requests ON employees.emp_id = invtry_purchase_requests.request_for \
                    WHERE invtry_purchase_requests.pr_id LIKE '%" + key + "%' AND invtry_purchase_requests.status = 'Approved'",
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            res.status(500).send(err);
                            res.end();
                            connection.release();
            
                        }else 
                        {
            

                            res.send(rslt);
                            res.end();
                            connection.release();
            
                        }
            
                    }
                );
            }

        }
    );

} );

router.post('/vendersearch', ( req, res ) => {

    const { column, key } = req.body;

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "SELECT * FROM invtry_venders WHERE " + column + " LIKE '%" + key + "%'",
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

router.get('/getallvenders', ( req, res ) => {

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                
                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "SELECT * FROM invtry_venders",
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

router.post('/purchase_order/new', ( req, res ) => {

    const { data } = req.body;
    
    let record = JSON.parse( data );
    const d = new Date();
    let time = d.toTimeString();

    let day = moment(d).format('ddd');

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                let pr = parseInt( record.PrID ) === 0 ? null : parseInt( record.PrID );
                connection.query(
                    "INSERT INTO `invtry_purchase_order`(`po_code`, `pr_id`, `location_code`, `company_code`, `shipto_location_code`, `shipto_company_code`, `request_by`, `request_date`, `request_time`, `status`, `total`, `comments`, `others`, `tax`, `cartage`, `tax_included`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [ record.code, pr, record.RequestInfo.location.location_code, record.RequestInfo.company.company_code, record.RequestInfo.ShipTo.location.location_code, record.RequestInfo.ShipTo.company.company_code, record.SenderInfo, d, time, 'Sent', record.RequestInfo.total, record.RequestInfo.comments, record.RequestInfo.others, record.RequestInfo.gst, record.RequestInfo.cartage, record.TaxMode ],
                    ( err ) => {
                        
                        if( err )
                        {
            
                            console.log( err );
                            res.status(500).send(err);
                            res.end();
                            connection.release();
            
                        }else 
                        {
                            
                            connection.query(
                                "SELECT po_id FROM invtry_purchase_order WHERE po_code = ?",
                                [ record.code ],
                                ( err, rslt ) => {
                        
                                    if( err )
                                    {
                        
                                        res.status(500).send(err);
                                        res.end();
                                        connection.release();
                        
                                    }else
                                    {
                                        if ( req.files )
                                        {
                                            const { Attachments } = req.files;
                                            
                                            let arr;
                                            if ( Attachments.name )
                                            {
                                                arr = [Attachments];
                                            }else
                                            {
                                                arr = Attachments;
                                            }
                                            for( let x = 0; x < arr.length; x++ )
                                            {
                                                let folderName = rslt[0].po_id + "_" + day + " " + moment(d).format("Do MMM YYYY") + ' at ' + d.getHours() + d.getMinutes() + d.getSeconds();
                                                connection.query(
                                                    "INSERT INTO `invtry_purchase_order_bills`(`po_id`, `image`, `image_type`) VALUES (?,?,?)",
                                                    [ rslt[0].po_id, folderName + '/' + arr[x].name, arr[x].mimetype.split('/')[1] ],
                                                    ( err ) => {
                                                    
                                                        if( err )
                                                        {
                                                        
                                                            console.log( err );
                                                            res.status(500).send(err);
                                                            res.end();
                                                            connection.release();
                                                        
                                                        }else 
                                                        {
                                            
                                                            fs.mkdir('client/public/images/Inventory/po_attachments/' + folderName,
                                                                { recursive: true },
                                                                (err) => {
                                                                    if (err) {
                
                                                                        console.log( err );
                                                                        res.send(err);
                                                                        connection.release();
                
                                                                    }
                                                                    else {
                
                                                                        arr[x].mv('client/public/images/Inventory/po_attachments/' + folderName + '/' + arr[x].name, 
                                                                            (err) => {
                
                                                                                if (err) {
                    
                                                                                    console.log( err );
                                                                                    res.send(err);
                                                                                    connection.release();
                    
                                                                                }
                                                                            
                                                                            }
                                                                        )
                
                                                                    }
                                                                }
                                                            )
                                            
                                                        }
                                                    
                                                    }
                                                );
                                            }
                                        }

                                        for( let x = 0; x < record.specifications.length; x++ )
                                        {

                                            connection.query(
                                                "INSERT INTO `invtry_purchase_order_specifications`(`po_id`, `description`, `reason`, `price`, `quantity`, `amount`, `tax`, `tax_included`) VALUES (?,?,?,?,?,?,?,?)",
                                                [ rslt[0].po_id, record.specifications[x].description, record.specifications[x].reason, parseFloat(record.specifications[x].price), parseInt(record.specifications[x].quantity), parseFloat(record.specifications[x].amount), isNaN( parseFloat(record.specifications[x].tax) ) ? 0 : parseFloat(record.specifications[x].tax), record.TaxMode ],
                                                ( err ) => {
                                        
                                                    if( err )
                                                    {
                                        
                                                        res.status(500).send(err);
                                                        res.end();
                                                        connection.release();
                                        
                                                    }
                                        
                                                }
                                            );
                                        }

                                        for( let x = 0; x < record.RequestInfo.venders.length; x++ )
                                        {
            
                                            connection.query(
                                                "SELECT vender_id FROM invtry_venders WHERE vender_name = ?",
                                                [ record.RequestInfo.venders[x].VenderName ],
                                                ( err, result ) => {
                                        
                                                    if( err )
                                                    {
                                        
                                                        console.log( err );
                                                        res.status(500).send(err);
                                                        res.end();
                                                        connection.release();
                                        
                                                    }else
                                                    {
                                                        if ( result.length === 0 )
                                                        {
                                                            connection.query(
                                                                "INSERT INTO `invtry_venders`(`vender_name`, `vender_phone`, `vender_address`) VALUES (?,?,?); \
                                                                SELECT vender_id FROM invtry_venders WHERE vender_name = ?",
                                                                [ record.RequestInfo.venders[x].VenderName, record.RequestInfo.venders[x].VenderPhone, record.RequestInfo.venders[x].VenderAddress, record.RequestInfo.venders[x].VenderName ],
                                                                ( err, result ) => {
                                                        
                                                                    if( err )
                                                                    {
                                                        
                                                                        console.log( err );
                                                                        res.status(500).send(err);
                                                                        res.end();
                                                                        connection.release();
                                                        
                                                                    }else
                                                                    {

                                                                        connection.query(
                                                                            "INSERT INTO `invtry_purchase_order_venders`(po_id, vender_id) VALUES (?,?);",
                                                                            [ rslt[0].po_id, result[1][0].vender_id ],
                                                                            ( err ) => {
                                                                    
                                                                                if( err )
                                                                                {
                                                                    
                                                                                    console.log( err );
                                                                                    res.status(500).send(err);
                                                                                    res.end();
                                                                                    connection.release();
                                                                    
                                                                                }
                                                                    
                                                                            }
                                                                        );
                                                                    }
                                                        
                                                                }
                                                            );
                                                        }else
                                                        {
                                                            connection.query(
                                                                "INSERT INTO `invtry_purchase_order_venders`(po_id, vender_id) VALUES (?,?);",
                                                                [ rslt[0].po_id, result[0].vender_id ],
                                                                ( err ) => {
                                                        
                                                                    if( err )
                                                                    {
                                                        
                                                                        console.log( err );
                                                                        res.status(500).send(err);
                                                                        res.end();
                                                                        connection.release();
                                                        
                                                                    }
                                                        
                                                                }
                                                            );
                                                        }
                                                    }
                                        
                                                }
                                            );

                                            if ( ( x + 1 ) === record.RequestInfo.venders.length )
                                            {
                                                res.send("success");
                                                res.end();
                                                connection.release();
                                            }

                                        }
                                    }
                        
                                }
                            );


                            // if ( req.files )
                            // {
                            //     const { Attachments } = req.files;

                            //     for ( let x = 0; x < Attachments.length; x++ )
                            //     {
                            //         let nm = "PO=" + poid + "&&PR=" + (prid === 0 ? 'null' : prid) + "&&date=" + d.getDate() + '-' + ( d.getMonth() + 1 ) + '-' + d.getFullYear();
                            //         connection.query(
                            //             "INSERT INTO `invtry_purchase_order_bills`(`po_id`, `image`, `image_type`) VALUES (?,?,?)",
                            //             [ poid, nm + '/' + Attachments[x].name, Attachments[x].mimetype.split('/')[1] ],
                            //             ( err ) => {
                                
                            //                 if( err )
                            //                 {
                                
                            //                     res.status(500).send(err);
                            //                     res.end();
                            //                     connection.release();
                                                
                            //                 }else
                            //                 {
                            //                     fs.mkdir('client/public/images/Inventory/po_attachments/' + nm,
                            //                     { recursive: true },
                            //                     (err) => {
                            //                         if (err) {
                                                        
                            //                             res.status(500).send(err);
                            //                             res.end();
                            //                             connection.release();
                            //                             }
                            //                             else {
                            //                                 Attachments[x].mv('client/public/images/Inventory/po_attachments/' + nm + '/' + Attachments[x].name, (err) => {

                            //                                     if (err) {

                            //                                         res.status(500).send(err);
                            //                                         res.end();
                            //                                         connection.release();

                            //                                     }

                            //                                 });
                            //                             }
                            //                         }
                            //                     )
                            //                 }
                                
                            //             }
                            //         );
                            //     }
                            // }

                            // for ( let x = 0; x < venders.length; x++ )
                            // {
                            //     connection.query(
                            //         "SELECT vender_id FROM `invtry_venders` WHERE vender_phone = ?",
                            //         [ venders[x].vender_phone ],
                            //         ( err, rslt ) => {
                            
                            //             if( err )
                            //             {
                            
                            //                 res.status(500).send(err);
                            //                 res.end();
                            //                 connection.release();
                            
                            //             }else
                            //             {

                            //                 connection.query(
                            //                     "INSERT INTO `invtry_purchase_order_venders` (po_id, vender_id) VALUES(?,?)",
                            //                     [ poid, rslt[0].vender_id ],
                            //                     ( err ) => {
                                        
                            //                         if( err )
                            //                         {
                                        
                            //                             res.status(500).send(err);
                            //                             res.end();
                            //                             connection.release();
                                        
                            //                         }
                                        
                            //                     }
                            //                 );
                            //             }
                            
                            //         }
                            //     );
                            //     if (  ( x + 1 ) === venders.length )
                            //     {
                            //         res.send('success');
                            //         res.end();
                            //         connection.release();
                            //     }
                            // }
            
                        }
            
                    }
                );
            }

        }
    );

} );

router.post('/getallpurchaseorders', ( req, res ) => {

    const { payload } = req.body;

    if 
    ( 
        payload !== {} || payload !== '{}' // IF PAYLOAD IS NOT EMPTY
    )
    {
        let data = JSON.parse( payload );
        let id = data.id; // EMPLOYEE ID
        let access = JSON.parse( data.access ); // EMPLOYEE ACCESS
    
        db.getConnection(
            ( err, connection ) => {
    
                if ( err )
                {
                    res.status(503).send(err);
                    res.end();
                    connection.release();
    
                }else
                {
    
                    // GET EMPLOYEE APPROVAL LIMITATION
                    connection.query(
                        "SELECT approval_limit FROM emp_props WHERE emp_id = ?",
                        [ id ],
                        ( err, rslt ) => {
                
                            if( err )
                            {
                
                                res.status(500).send(err);
                                res.end();
                                connection.release();
                
                            }else
                            {
    
                                let limit = rslt[0].approval_limit;
                                
                                // GET THE CODES OF THOSE COMPANIES WHOSE REQUESTS THE EMPLOYEE CAN APPROVE
                                connection.query(
                                    "SELECT company_code FROM invtry_emp_approval_to_related_companies WHERE emp_id = ?",
                                    [ id ],
                                    ( err, rslt ) => {
                
                                        if( err )
                                        {
                
                                            res.status(500).send(err);
                                            res.end();
                                            connection.release();
                
                                        }else
                                        {
    
                                            let companies = rslt;
                                            
    
                                            // THE BASIC QUERY TO GET THE PURCHASE ORDERS
                                            let query = 
                                            "SELECT DISTINCT \
                                            employees.emp_id,  \
                                            employees.name,  \
                                            locations.location_name,   \
                                            companies.company_name,  \
                                            departments.department_name,  \
                                            designations.designation_name,   \
                                            emp_app_profile.emp_image,   \
                                            invtry_purchase_order.*,  \
                                            invtry_purchase_order.location_code as po_location,  \
                                            invtry_purchase_order.status as po_status  \
                                            FROM employees   \
                                            LEFT OUTER JOIN companies ON employees.company_code = companies.company_code   \
                                            LEFT OUTER JOIN departments ON employees.department_code = departments.department_code   \
                                            LEFT OUTER JOIN locations ON employees.location_code = locations.location_code   \
                                            LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code   \
                                            RIGHT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id   \
                                            RIGHT OUTER JOIN invtry_purchase_order ON employees.emp_id = invtry_purchase_order.request_by  \
                                            WHERE invtry_purchase_order.total < " + parseFloat( limit ? limit : 0.00 );
    
                                            // if 
                                            // ( 
                                            //     access.includes(513) // IF EMPLOYEE ONLY HAS THE ACCESS TO APPROVE THE REQUEST
                                            //     && 
                                            //     !access.includes(1) // IF THE EMPLOYEE IS NOT AN ADMIN
                                            //     && 
                                            //     !access.includes(514) // IF EMPLOYEE NOT HAVE THE ACCESS TO OVERRIDE THE REQUEST
                                            // )
                                            // {
                                            //     query = query.concat(' AND ', "invtry_purchase_order.status != 'Sent' AND invtry_purchase_order.status != 'Viewed'")
                                            // }
                    
                                            if 
                                            ( 
                                                !access.includes(516) // IF EMPLOYEE CAN APPROVE ONLY THE REQUESTS RELATED TO HIS/HER COMPANY
                                                && 
                                                !access.includes(1) // IF THE EMPLOYEE IS NOT AN ADMIN
                                                && 
                                                !access.includes(514) // IF EMPLOYEE NOT HAVE THE ACCESS TO OVERRIDE THE REQUEST
                                            )
                                            {
                                                if ( companies.length > 0 )
                                                {
                                                    query = query.concat(' AND ', "invtry_purchase_order.company_code = " + companies[0].company_code);
                                                    for ( let x = 0; x < companies.length; x++ )
                                                    {
                                                        query = query.concat(' OR ', "invtry_purchase_order.company_code = " + companies[x].company_code);
                                                    }
                                                }
                                            }

                                            query = query.concat(' GROUP BY employees.emp_id ORDER BY invtry_purchase_order.po_id DESC');
    
                                            connection.query(
                                                query,
                                                ( err, rslt ) => {
                                        
                                                    if( err )
                                                    {
                                        
                                                        res.set("Connection", "close");
                                                        res.status(500).send(err);
                                                        res.end();
                                                        connection.release();
                                        
                                                    }else 
                                                    {
                                        
                                                        res.set("Connection", "close");
                                                        res.send( rslt );
                                                        res.end();
                                                        connection.release();
                                        
                                                    }
                                        
                                                }
                                            );
    
    
                                        }
                
                                    }
                                );
    
                            }
                
                        }
                    );
                }
    
            }
        );
    }

} );

router.post('/getallpurchaseordersofemployee', ( req, res ) => {

    const { emp_id, current_emp } = req.body;
    
    // LET THE BASIC VARIABLES
    let access = []; // FOR THE EMPLOYEES ACCESS
    let approvalLimit = 0.00; // EMPLOYEE CAN APPROVE ALL REQUESTS UNDER THIS AMOUNT
    let relatedCompanies = []; // EMPLOYEE CAN APPROVE ALL THE REQUESTS COMING FROM THESE COMPANIES

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {
                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "SELECT approval_limit FROM emp_props WHERE emp_id = ?; \
                    SELECT company_code FROM invtry_emp_approval_to_related_companies WHERE emp_id = ?; \
                    SELECT access FROM employees WHERE emp_id = ?",
                    [ current_emp, current_emp, current_emp ],
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            res.status(500).send(err);
                            res.end();
                            connection.release();
            
                        }else 
                        {
            
                            approvalLimit = rslt[0][0].approval_limit;
                            relatedCompanies = rslt[1];
                            access = JSON.parse( rslt[2][0].access );
                            
                            // LET THE BASIC QUERY
                            let query = "SELECT  \
                            employees.name, \
                            invtry_purchase_order.*, \
                            locations.location_name,  \
                            companies.company_name  \
                            FROM employees  \
                            LEFT OUTER JOIN invtry_purchase_order ON employees.emp_id = invtry_purchase_order.request_by  \
                            LEFT OUTER JOIN companies ON employees.company_code = companies.company_code  \
                            LEFT OUTER JOIN locations ON employees.location_code = locations.location_code \
                            WHERE invtry_purchase_order.total < " + parseFloat( approvalLimit ? approvalLimit : 0.00 );

                            if 
                            ( 
                                !access.includes(516) // IF EMPLOYEE CAN APPROVE ONLY THE REQUESTS RELATED TO HIS/HER COMPANY
                                && 
                                !access.includes(1) // IF THE EMPLOYEE IS NOT AN ADMIN
                                && 
                                !access.includes(514) // IF EMPLOYEE NOT HAVE THE ACCESS TO OVERRIDE THE REQUEST
                            )
                            {
                                if ( relatedCompanies.length > 0 )
                                {
                                    query = query.concat(' AND ', "invtry_purchase_order.company_code = " + relatedCompanies[0].company_code);
                                    for ( let x = 0; x < relatedCompanies.length; x++ )
                                    {
                                        query = query.concat(' OR ', "invtry_purchase_order.company_code = " + relatedCompanies[x].company_code);
                                    }
                                }
                            }

                            query = query.concat(" AND employees.emp_id = " + emp_id);

                            connection.query(
                                query,
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
            }

        }
    );

} );

router.post('/getpurchaseorderdetails', ( req, res ) => {

    const { po_id, pr_id } = req.body;

    db.query(
        "SELECT DISTINCT \
        sender.name as sender_name, \
        sender.gender as sender_gender, \
        approve_emp.name as approve_emp_name, \
        discard_emp.name as discard_emp_name, \
        handle_emp.name as handle_emp_name, \
        RequestLocations.location_name, \
        RequestLocations.address as location_address, \
        RequestLocations.location_phone, \
        ShipToLocations.location_name as ShipToLocationName, \
        ShipToLocations.address as ShipToLocationAddress, \
        ShipToLocations.location_phone as ShipToLocationPhone, \
        RequestCompanies.company_name as po_company_name, \
        RequestCompanies.website as company_website, \
        ShipToCompanies.company_name as po_shipto_company_name, \
        ShipToCompanies.website as shipto_company_website, \
        invtry_purchase_order.*, \
        invtry_purchase_order.status as status  \
        FROM invtry_purchase_order  \
        RIGHT OUTER JOIN employees sender ON sender.emp_id = invtry_purchase_order.request_by  \
        LEFT OUTER JOIN employees approve_emp ON approve_emp.emp_id = invtry_purchase_order.approve_by \
        LEFT OUTER JOIN employees discard_emp ON discard_emp.emp_id = invtry_purchase_order.discard_by \
        LEFT OUTER JOIN employees handle_emp ON handle_emp.emp_id = invtry_purchase_order.handle_by \
        LEFT OUTER JOIN locations RequestLocations ON invtry_purchase_order.location_code = RequestLocations.location_code \
        LEFT OUTER JOIN companies RequestCompanies ON invtry_purchase_order.company_code = RequestCompanies.company_code \
        LEFT OUTER JOIN locations ShipToLocations ON invtry_purchase_order.shipto_location_code = ShipToLocations.location_code \
        LEFT OUTER JOIN companies ShipToCompanies ON invtry_purchase_order.shipto_company_code = ShipToCompanies.company_code \
        WHERE invtry_purchase_order.po_id = " + po_id + "; \
        SELECT DISTINCT \
        invtry_purchase_order_specifications.*  \
        FROM invtry_purchase_order \
        LEFT OUTER JOIN invtry_purchase_order_specifications ON invtry_purchase_order.po_id = 	invtry_purchase_order_specifications.po_id  \
        WHERE invtry_purchase_order.po_id = " + po_id + "; \
        SELECT DISTINCT \
        invtry_purchase_order_bills.bill_id, \
        invtry_purchase_order_bills.po_id, \
        invtry_purchase_order_bills.image, \
        invtry_purchase_order_bills.image_type \
        FROM invtry_purchase_order \
        LEFT OUTER JOIN invtry_purchase_order_bills ON invtry_purchase_order.po_id = 	invtry_purchase_order_bills.po_id  \
        WHERE invtry_purchase_order.po_id = " + po_id + "; \
        SELECT DISTINCT \
        invtry_venders.vender_name,  \
        invtry_venders.vender_phone,  \
        invtry_venders.vender_address  \
        FROM invtry_venders  \
        RIGHT OUTER JOIN invtry_purchase_order_venders ON invtry_purchase_order_venders.vender_id = invtry_venders.vender_id  \
        RIGHT OUTER JOIN invtry_purchase_order ON invtry_purchase_order_venders.po_id = invtry_purchase_order.po_id  \
        WHERE invtry_purchase_order.po_id = " + po_id + "; \
        SELECT DISTINCT \
        sender.name as sender_name, \
        sender.gender as sender_gender, \
        approve_emp.name as approve_emp_name, \
        discard_emp.name as discard_emp_name, \
        handle_emp.name as handle_emp_name, \
        locations.location_name, \
        locations.address as location_address, \
        locations.location_phone, \
        companies.company_name as pr_company_name, \
        companies.website as company_website, \
        invtry_purchase_requests.*, \
        invtry_purchase_requests.status as status  \
        FROM invtry_purchase_requests  \
        RIGHT OUTER JOIN employees sender ON sender.emp_id = invtry_purchase_requests.request_for  \
        LEFT OUTER JOIN employees approve_emp ON approve_emp.emp_id = invtry_purchase_requests.approve_by \
        LEFT OUTER JOIN employees discard_emp ON discard_emp.emp_id = invtry_purchase_requests.discard_by \
        LEFT OUTER JOIN employees handle_emp ON handle_emp.emp_id = invtry_purchase_requests.handle_by \
        LEFT OUTER JOIN locations ON invtry_purchase_requests.location_code = locations.location_code \
        LEFT OUTER JOIN companies ON invtry_purchase_requests.company_code = companies.company_code \
        WHERE invtry_purchase_requests.pr_id = " + pr_id + "; \
        SELECT DISTINCT \
        invtry_purchase_request_specifications.id, \
        invtry_purchase_request_specifications.pr_id, \
        invtry_purchase_request_specifications.description, \
        invtry_purchase_request_specifications.reason, \
        invtry_purchase_request_specifications.price, \
        invtry_purchase_request_specifications.quantity, \
        invtry_purchase_request_specifications.tax, \
        invtry_purchase_request_specifications.tax_amount, \
        invtry_purchase_request_specifications.amount \
        FROM invtry_purchase_requests \
        LEFT OUTER JOIN invtry_purchase_request_specifications ON invtry_purchase_requests.pr_id = invtry_purchase_request_specifications.pr_id  \
        WHERE invtry_purchase_requests.pr_id = " + pr_id + "; \
        SELECT DISTINCT \
        invtry_purchase_request_quotations.quotation_id, \
        invtry_purchase_request_quotations.pr_id, \
        invtry_purchase_request_quotations.image, \
        invtry_purchase_request_quotations.image_type \
        FROM invtry_purchase_requests \
        RIGHT OUTER JOIN invtry_purchase_request_quotations ON invtry_purchase_requests.pr_id = invtry_purchase_request_quotations.pr_id  \
        WHERE invtry_purchase_requests.pr_id = " + pr_id + "; \
        SELECT DISTINCT \
        invtry_purchase_order_vouchers.id, \
        invtry_purchase_order_vouchers.po_id, \
        invtry_purchase_order_vouchers.voucher, \
        invtry_purchase_order_vouchers.type \
        FROM invtry_purchase_order \
        RIght OUTER JOIN invtry_purchase_order_vouchers ON invtry_purchase_order.po_id = invtry_purchase_order_vouchers.po_id  \
        WHERE invtry_purchase_order.po_id = " + po_id,
        ( err, rslt ) => {

            if( err )
            {

                res.status(500).send(err);
                res.end();

            }else 
            {

                console.log( rslt[5] );
                res.send( rslt );
                res.end();

            }

        }
    );

} );

router.post(
    '/approvepurchaseorder', ( req, res ) => {

        const { payload } = req.body;

        let data = JSON.parse( payload )[0];
        const d = new Date( data.date );

        // CREATING CONNECTION
        db.getConnection(
            ( err, connection ) => {
    
                if ( err ) // ERROR
                {
                    
                    res.status(503).send(err);
                    res.end();
                    connection.release();
    
                }else // CONNECTION CREATED
                {
                    connection.query( // RUN QUERY
                        "UPDATE invtry_purchase_order SET approve_by = ?, approve_date = ?, approve_time = ?, status = ?, remarks = ? WHERE po_id = ?",
                        [ data.emp_id, d, d.toTimeString(), 'Approved', data.remarks, data.po_id ],
                        ( err, rslt ) => {
                
                            if( err )
                            {
                
                                res.status(500).send(err);
                                res.end();
                                connection.release();
                
                            }else 
                            {
                
                                if ( req.files )
                                {

                                    const { vouchers } = req.files;

                                    // DECLARING VARIABLES
                                    let query = ''; // BASIC QUERY
                                    let folder = "PO=" + data.po_id + "&&date=" + d.getDate() + '-' + ( d.getMonth() + 1 ) + '-' + d.getFullYear();

                                    for ( let x = 0; x < vouchers.length; x++ )
                                    {

                                        query = query.concat("INSERT INTO invtry_purchase_order_vouchers (po_id , voucher, type) VALUES ('" + data.po_id + "','" + folder + '/' + vouchers[x].name + "','" + vouchers[x].mimetype.split('/')[1] + "');");

                                    }

                                    connection.query( // RUN QUERY
                                        query,
                                        ( err ) => {
                                
                                            if( err )
                                            {
                                
                                                res.status(500).send(err);
                                                res.end();
                                                connection.release();
                                
                                            }else 
                                            {
                                
                                                if ( req.files )
                                                {
                
                                                    const { vouchers } = req.files;
                
                                                    for ( let x = 0; x < vouchers.length; x++ )
                                                    {
                
                                                        fs.mkdir('client/public/images/Inventory/po_vouchers/' + folder,
                                                            { recursive: true },
                                                            (err) => {
                                                                if (err) {

                                                                    res.status(500).send(err);
                                                                    res.end();
                                                                    connection.release();
                                                                }
                                                                else {
                                                                    vouchers[x].mv('client/public/images/Inventory/po_vouchers/' + folder + '/' + vouchers[x].name, (err) => {

                                                                        if (err) {

                                                                            res.status(500).send(err);
                                                                            res.end();
                                                                            connection.release();

                                                                        }

                                                                    });
                                                                }
                                                            }
                                                        )
                
                                                    }
                
                                                }

                                                res.send( 'success' );
                                                res.end();
                                                connection.release();
                                
                                            }
                                
                                        }
                                    );

                                }
                
                            }
                
                        }
                    );
                }
    
            }
        );

    }
)

router.post(
    '/discardpurchaseorder', ( req, res ) => {

        const { payload } = req.body;

        let data = JSON.parse( payload )[0];
        const d = new Date( data.date );

        // CREATING CONNECTION
        db.getConnection(
            ( err, connection ) => {
    
                if ( err ) // ERROR
                {
                    
                    res.status(503).send(err);
                    res.end();
                    connection.release();
    
                }else // CONNECTION CREATED
                {
                    connection.query( // RUN QUERY
                        "UPDATE invtry_purchase_order SET discard_by = ?, discard_date = ?, discard_time = ?, status = ?, remarks = ? WHERE po_id = ?",
                        [ data.emp_id, d, d.toTimeString(), 'Rejected', data.remarks, data.po_id ],
                        ( err ) => {
                
                            if( err )
                            {
                
                                res.status(500).send(err);
                                res.end();
                                connection.release();
                
                            }else 
                            {
                
                                res.send( 'success' );
                                res.end();
                                connection.release();
                
                            }
                
                        }
                    );
                }
    
            }
        );

    }
)

router.post('/getpocode', ( req, res ) => {

    const { company_code } = req.body;

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "SELECT po_code FROM invtry_purchase_order WHERE company_code = ? ORDER BY po_id DESC LIMIT 1",
                    [ company_code ],
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            res.send( err );
                            connection.release();
            
                        }else 
                        {
                            
                            res.send(rslt);
                            connection.release();
            
                        }
            
                    }
                );
            }

        }
    );

} );

router.post('/getprforpo', ( req, res ) => {

    const { pr_code } = req.body;

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "SELECT pr_id, total FROM invtry_purchase_requests WHERE pr_code = ? AND status = 'Approved'",
                    [ pr_code ],
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            res.send( err );
                            connection.release();
            
                        }else 
                        {
                            
                            if ( rslt[0] )
                            {
                                connection.query(
                                    "SELECT * FROM invtry_purchase_request_specifications WHERE pr_id = ?",
                                    [ rslt[0].pr_id ],
                                    ( err, rslt2 ) => {
                            
                                        if( err )
                                        {
                            
                                            res.send( err );
                                            connection.release();
                            
                                        }else 
                                        {
                                            
                                            res.send(
                                                [
                                                    rslt2,
                                                    rslt
                                                ]
                                            );
                                            connection.release();
                            
                                        }
                            
                                    }
                                );
                            }else
                            {
                                res.send(rslt);
                                connection.release();
                            }
            
                        }
            
                    }
                );
            }

        }
    );

} );

router.post('/getthatempinvtrypos', ( req, res ) => {

    const { empID, colunms, approvalLimit } = req.body;

    let q = "SELECT  \
    employees.name, \
    emp_app_profile.emp_image, \
    invtry_purchase_order.*, \
    locations.location_name,                              \
    companies.company_name,                              \
    departments.department_name,                              \
    designations.designation_name  \
    FROM employees  \
    LEFT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id  \
    LEFT OUTER JOIN invtry_purchase_order ON employees.emp_id = invtry_purchase_order.request_by  \
    LEFT OUTER JOIN locations ON employees.location_code = locations.location_code                              \
    LEFT OUTER JOIN companies ON employees.company_code = companies.company_code                              \
    LEFT OUTER JOIN departments ON employees.department_code = departments.department_code                              \
    LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code ";

    if ( colunms )
    {
        let acc = colunms.split(',');
        
        q = q.concat(' WHERE ', "invtry_purchase_order.status LIKE '%" + acc[0] + "%'");
        for ( let x = 0; x < acc.length; x++ )
        {
            q = q.concat(" OR ", "invtry_purchase_order.status LIKE '%" + acc[x] + "%'");
        }
    }

    if ( approvalLimit === '>150000' )
    {
        q = q.concat(" AND invtry_purchase_order.total < 150000 ");
        q = q.concat(" AND invtry_purchase_order.request_by = " + empID + " ORDER BY invtry_purchase_order.po_id DESC");
    }else
    {
        if ( q.indexOf('WHERE') !== -1 )
        {
            q = q.concat(" AND invtry_purchase_order.request_by = " + empID + " ORDER BY invtry_purchase_order.po_id DESC");
        }else
        {
            q = q.concat("WHERE invtry_purchase_order.request_by = " + empID + " ORDER BY invtry_purchase_order.po_id DESC");
        }
    }

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {

                connection.query(
                    q,
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            res.send( err );
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

router.post('/getpridfrompo', ( req, res ) => {

    const { po_id } = req.body;

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "SELECT pr_id FROM invtry_purchase_order WHERE po_id = ?",
                    [ po_id ],
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            res.send( err );
                            connection.release();
            
                        }else 
                        {
                            
                            res.send(rslt);
                            res.end();
                            connection.release();
            
                        }
            
                    }
                );
            }

        }
    );

} );

router.post('/getallpo', ( req, res ) => {

    const { myData } = req.body;
    
    if ( myData !== '{}' )
    {
        let Data = JSON.parse( myData ); // Employee Data
        let access = JSON.parse( Data.access ); // Employee Access
        
        db.getConnection(
            ( err, connection ) => {
    
                if ( err )
                {
                    res.status(503).send(err);
                    res.end();
                    connection.release();
    
                }else
                {
                    connection.query(
                        "SELECT approval_limit FROM emp_props WHERE emp_id = " + Data.emp_id, // retrieving employee approval limit
                        ( err, rslt ) => {
                
                            if( err )
                            {
                
                                res.set("Connection", "close");
                                res.send( err );
                                res.end();
                                connection.release();
                
                            }else 
                            {
                                
                                connection.query(
                                    "SELECT company_code FROM invtry_emp_approval_to_related_companies WHERE emp_id = " + Data.emp_id, // retrieving employee approval limit
                                    ( err, result ) => {
                            
                                        if( err )
                                        {
                            
                                            res.set("Connection", "close");
                                            res.send( err );
                                            res.end();
                                            connection.release();
                            
                                        }else 
                                        {
                                            
                                            // basic query
                                            let q = 
                                            "SELECT DISTINCT \
                                            employees.emp_id, \
                                            employees.name, \
                                            locations.location_name,  \
                                            companies.company_name, \
                                            departments.department_name, \
                                            designations.designation_name,  \
                                            emp_app_profile.emp_image,  \
                                            invtry_purchase_order.*, \
                                            invtry_purchase_order.location_code as po_location, \
                                            invtry_purchase_order.status as status \
                                            FROM employees  \
                                            LEFT OUTER JOIN companies ON employees.company_code = companies.company_code  \
                                            LEFT OUTER JOIN departments ON employees.department_code = departments.department_code  \
                                            LEFT OUTER JOIN locations ON employees.location_code = locations.location_code  \
                                            LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code  \
                                            RIGHT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id  \
                                            RIGHT OUTER JOIN invtry_purchase_order ON employees.emp_id = invtry_purchase_order.request_by \
                                            WHERE invtry_purchase_order.total < " + parseFloat( rslt[0] ? rslt[0].approval_limit : 0.00 );
                
                                            if ( result[0] )
                                            {
                                                q = q.concat(' AND ', "invtry_purchase_order.company_code = " + result[0].company_code);
                                                for ( let x = 0; x < result.length; x++ )
                                                {
                                                    q = q.concat(' OR ', "invtry_purchase_order.company_code = " + result[x].company_code);
                                                }
                                            }
                                            
                                            q = q.concat(' ORDER BY invtry_purchase_order.po_id DESC');
                                        
                                            connection.query(
                                                q,
                                                ( err, rslt ) => {
                                        
                                                    if( err )
                                                    {
                                        
                                                        res.set("Connection", "close");
                                                        res.send( err );
                                                        res.end();
                                                        connection.release();
                                        
                                                    }else 
                                                    {
                                        
                                                        res.set("Connection", "close");
                                                        res.send( rslt );
                                                        res.end();
                                                        connection.release();
                                        
                                                    }
                                        
                                                }
                                            );
                            
                                        }
                            
                                    }
                                );
                
                            }
                
                        }
                    );
                }
    
            }
        );
    }

} );

router.post('/getallposorted', ( req, res ) => {

    const { myData, filters } = req.body;

    let filteredQuery = '';

    for ( let x = 0; x < filters.length; x++ )
    {
        filteredQuery = filteredQuery.concat( filters[x].column + " LIKE '%" + filters[x].value + "%' AND " );
    }

    
    if ( myData !== '{}' )
    {
        let Data = JSON.parse( myData ); // Employee Data
        let access = JSON.parse( Data.access ); // Employee Access
        
        db.getConnection(
            ( err, connection ) => {
    
                if ( err )
                {
                    
                    res.status(503).send(err);
                    res.end();
                    connection.release();
    
                }else
                {
                    connection.query(
                        "SELECT approval_limit FROM emp_props WHERE emp_id = " + Data.emp_id, // retrieving employee approval limit
                        ( err, rslt ) => {
                
                            if( err )
                            {
                
                                res.set("Connection", "close");
                                res.send( err );
                                res.end();
                                connection.release();
                
                            }else 
                            {
                                
                                connection.query(
                                    "SELECT company_code FROM invtry_emp_approval_to_related_companies WHERE emp_id = " + Data.emp_id, // retrieving employee approval limit
                                    ( err, result ) => {
                            
                                        if( err )
                                        {
                            
                                            res.set("Connection", "close");
                                            res.send( err );
                                            res.end();
                                            connection.release();
                            
                                        }else 
                                        {
                                            
                                            // basic query
                                            let q = 
                                            "SELECT DISTINCT \
                                            employees.emp_id, \
                                            employees.name, \
                                            locations.location_name,  \
                                            companies.company_name, \
                                            departments.department_name, \
                                            designations.designation_name,  \
                                            emp_app_profile.emp_image,  \
                                            invtry_purchase_order.*, \
                                            invtry_purchase_order.location_code as po_location, \
                                            invtry_purchase_order.status as status \
                                            FROM employees  \
                                            LEFT OUTER JOIN companies ON employees.company_code = companies.company_code  \
                                            LEFT OUTER JOIN departments ON employees.department_code = departments.department_code  \
                                            LEFT OUTER JOIN locations ON employees.location_code = locations.location_code  \
                                            LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code  \
                                            RIGHT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id  \
                                            RIGHT OUTER JOIN invtry_purchase_order ON employees.emp_id = invtry_purchase_order.request_by \
                                            WHERE " + filteredQuery + " invtry_purchase_order.total < " + parseFloat( rslt[0] ? rslt[0].approval_limit : 0.00 );
                
                                            if ( result[0] )
                                            {
                                                q = q.concat(' AND ', "invtry_purchase_order.company_code = " + result[0].company_code);
                                                for ( let x = 0; x < result.length; x++ )
                                                {
                                                    q = q.concat(' OR ', "invtry_purchase_order.company_code = " + result[x].company_code);
                                                }
                                            }
                                            
                                            q = q.concat(' ORDER BY invtry_purchase_order.po_id DESC');
                                        
                                            connection.query(
                                                q,
                                                ( err, rslt ) => {
                                        
                                                    if( err )
                                                    {
                                        
                                                        res.set("Connection", "close");
                                                        res.send( err );
                                                        res.end();
                                                        connection.release();
                                        
                                                    }else 
                                                    {
                                        
                                                        res.set("Connection", "close");
                                                        res.send( rslt );
                                                        res.end();
                                                        connection.release();
                                        
                                                    }
                                        
                                                }
                                            );
                            
                                        }
                            
                                    }
                                );
                
                            }
                
                        }
                    );
                }
    
            }
        );
    }

} );

router.post('/setpotoviewed', ( req, res ) => {

    const { poID, empID } = req.body;
    const d = new Date();

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "UPDATE invtry_purchase_order SET status = 'Viewed', handle_by = ?, view_date = ?, view_time = ? WHERE po_id = ? AND status = 'Sent'",
                    [ empID, d, d.toTimeString(), poID ],
                    ( err ) => {
            
                        if( err )
                        {
            
                            res.send( err );
                            res.end();
                            connection.release();
            
                        }else 
                        {
            
                            res.send( 'success' );
                            res.end();
                            connection.release();
            
                        }
            
                    }
                );
            }

        }
    );

} );

router.post('/setpotodiscard', ( req, res ) => {

    const { poID, empID, remarks } = req.body;
    const d = new Date();

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "UPDATE invtry_purchase_order SET status = 'Rejected', discard_by = ?, discard_date = ?, discard_time = ?, remarks = ? WHERE po_id = ?",
                    [ empID, d, d.toTimeString(), remarks, poID ],
                    ( err ) => {
            
                        if( err )
                        {
            
                            res.send( err );
                            connection.release();
            
                        }else 
                        {
            
                            res.send( 'success' );
                            connection.release();
            
                        }
            
                    }
                );
            }

        }
    );

} );

router.post('/setpotoapprove', ( req, res ) => {

    const { poID, empID, remarks } = req.body;
    const d = new Date();

    let day = moment(d).format('ddd');

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "UPDATE invtry_purchase_order SET status = 'Approved', approve_by = ?, approve_date = ?, approve_time = ?, remarks = ? WHERE po_id = ? AND status = 'Viewed'",
                    [ empID, d, d.toTimeString(), remarks, poID ],
                    ( err ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            res.send( err );
                            connection.release();
            
                        }else 
                        {
            
                            if ( req.files )
                            {
                                const { Attachments } = req.files;
                                let arr;
                                if ( Attachments.name )
                                {
                                    arr = [Attachments];
                                }else
                                {
                                    arr = Attachments;
                                }

                                for ( let x= 0; x < arr.length; x++ )
                                {
                                    let folderName = poID + "_" + day + " " + moment(d).format("Do MMM YYYY") + ' at ' + d.getHours() + d.getMinutes() + d.getSeconds();
                                    connection.query(
                                        "INSERT INTO invtry_purchase_order_vouchers (po_id, voucher, type) VALUES (?,?,?)",
                                        [ poID, folderName + '/' + arr[x].name, arr[x].mimetype.split('/')[1] ],
                                        ( err ) => {
                                
                                            if( err )
                                            {
                                
                                                console.log( err );
                                                res.send( err );
                                                connection.release();
                                
                                            }else 
                                            {
                                
                                                fs.mkdir('client/public/images/Inventory/po_vouchers/' + folderName,
                                                    { recursive: true },
                                                    (err) => {
                                                        if (err) {
    
                                                            console.log( err );
                                                            res.send(err);
                                                            connection.release();
    
                                                        }
                                                        else {
    
                                                            arr[x].mv('client/public/images/Inventory/po_vouchers/' + folderName + '/' + arr[x].name, 
                                                                (err) => {
    
                                                                    if (err) {
        
                                                                        console.log( err );
                                                                        res.send(err);
                                                                        connection.release();
        
                                                                    }
                                                                
                                                                }
                                                            )
    
                                                        }
                                                    }
                                                )
                                
                                            }
                                
                                        }
                                    );
        
                                    if ( ( x + 1 ) === arr.length )
                                    {
                                        res.send( 'success' );
                                        connection.release();
                                    }
                                        
                                }

                            }
            
                        }
            
                    }
                );
            }

        }
    );

} );

module.exports = router;