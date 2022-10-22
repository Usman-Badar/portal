const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const fs = require('fs');
const moment = require('moment');
const io = require('../../server');

io.on('connection', ( socket ) => {

    socket.on(
        'newpurchaseorder', () => {
            
            socket.broadcast.emit('newpurchaseorder');
    
        }
    )

});

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