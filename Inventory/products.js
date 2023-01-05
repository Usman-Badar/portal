const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const CreateLogs = require('../Routes/Employee/logs').CreateLog;

router.get('/delivery_challan/all', ( req, res ) => {

    db.query(
        "SELECT * FROM `tbl_inventory_delivery_challan`;",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
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

router.post('/delivery_challan', ( req, res ) => {

    const { name, number, invoice_number, items, vender, date_time, received_by } = req.body;
    const challanItems = JSON.parse(items);
    const d = new Date( date_time );
    const date = new Date( date_time ).toISOString().slice(0, 10).replace('T', ' ');

    db.query(
        "INSERT INTO `tbl_inventory_delivery_challan`(`invoice_no`, `vender_id`, `received_from_name`, `received_from_number`, `received_by`, `generate_time`, `generate_date`) VALUES (?,?,?,?,?,?,?);" +
        "SELECT challan_id FROM `tbl_inventory_delivery_challan` WHERE `received_from_name` = ? AND `received_from_number` = ? AND `received_by` = ? AND `generate_time` = ? AND `generate_date` = ?;",
        [ invoice_number, vender, name, number, received_by, d.toTimeString(), d, name, number, received_by, d.toTimeString().substring(0,8), date ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send(err);
                res.end();

            }else 
            {
                
                let q = "";
                let params = [];
                for ( let x = 0; x < challanItems.length; x++ )
                {
                    q = q.concat("INSERT INTO `tbl_inventory_delivery_challan_items`(`challan_id`, `description`, `quantity`) VALUES (?,?,?);");
                    params.push( rslt[1][0].challan_id );
                    params.push( challanItems[x].description );
                    params.push( challanItems[x].quantity );
                }

                db.query(
                    q,
                    params,
                    ( err ) => {
            
                        if( err )
                        {
            
                            res.send(err);
                            res.end();
            
                        }else 
                        {
                            
                            res.send("success");
                            res.end();
                            
                        }
                        
                    }
                )
                
            }
            
        }
    )

} );

router.post('/delivery_challan/preview', ( req, res ) => {

    const { id } = req.body;

    db.query(
        "SELECT \
        tbl_inventory_delivery_challan.*, \
        tbl_inventory_delivery_challan_items.*, \
        tbl_inventory_venders.name AS vender_name, \
        tbl_inventory_venders.phone AS vender_phone, \
        tbl_inventory_venders.address AS vender_address  \
        FROM \
        tbl_inventory_delivery_challan \
        LEFT OUTER JOIN tbl_inventory_delivery_challan_items ON tbl_inventory_delivery_challan.challan_id = tbl_inventory_delivery_challan_items.challan_id \
        LEFT OUTER JOIN tbl_inventory_venders ON tbl_inventory_delivery_challan.vender_id = tbl_inventory_venders.vender_id \
        WHERE \
        tbl_inventory_delivery_challan.challan_id = ?;",
        [ id ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
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

router.post('/inventory/get_products', ( req, res ) => {

    const { type } = req.body;

    let q = "SELECT tbl_inventory_products.*,  \
    tbl_inventory_sub_categories.id as sub_category_id, \
    tbl_inventory_sub_categories.name as sub_category_name, \
    tbl_inventory_categories.category_id as category_id, \
    SUM(tbl_inventory_products.quantity) AS product_physical_quantity  \
    FROM   \
    `tbl_inventory_products`   \
    LEFT OUTER JOIN tbl_inventory_sub_categories ON tbl_inventory_products.sub_category_id = tbl_inventory_sub_categories.id  \
    LEFT OUTER JOIN tbl_inventory_categories ON tbl_inventory_products.category_id = tbl_inventory_categories.category_id  \
    WHERE tbl_inventory_products.status = 'in_stock' AND tbl_inventory_categories.type = ? \
    GROUP BY tbl_inventory_products.sub_category_id";
    let params = [ type ];

    db.query(
        q,
        params,
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send(err);
                res.end();

            }else 
            {
                
                res.send( rslt );
                res.end();
                
            }
            
        }
    )

} );

router.post('/inventory/get_product_details', ( req, res ) => {

    const { sub_category_id, product_id, transaction_id, company_code, location_code, sub_location_code } = req.body;

    let q;
    let params;

    if ( transaction_id )
    {

        q = "SELECT \
        tbl_inventory_product_transactions.*, \
        tbl_inventory_products.name , \
        tbl_inventory_products.description , \
        companies.company_name , \
        locations.location_name , \
        tbl_inventory_sub_locations.sub_location_name, \
        tbl_inventory_categories.name AS category_name, \
        tbl_inventory_sub_categories.name AS sub_category_name \
        FROM `tbl_inventory_product_transactions` \
        LEFT OUTER JOIN tbl_inventory_products ON tbl_inventory_product_transactions.product_id = tbl_inventory_products.product_id \
        LEFT OUTER JOIN tbl_inventory_categories ON tbl_inventory_products.category_id = tbl_inventory_categories.category_id \
        LEFT OUTER JOIN tbl_inventory_sub_categories ON tbl_inventory_products.sub_category_id = tbl_inventory_sub_categories.id \
        LEFT OUTER JOIN companies ON tbl_inventory_product_transactions.company_code = companies.company_code \
        LEFT OUTER JOIN locations ON tbl_inventory_product_transactions.location_code = locations.location_code \
        LEFT OUTER JOIN tbl_inventory_sub_locations ON tbl_inventory_product_transactions.sub_location_code = tbl_inventory_sub_locations.sub_location_code \
        WHERE tbl_inventory_product_transactions.transaction_id = ?;";
        params = [ transaction_id ];
    }else if ( product_id )
    {
        q = "SELECT tbl_inventory_products.*, \
        tbl_inventory_categories.name as category_name,  \
        tbl_inventory_sub_categories.name as sub_category_name  \
        FROM  \
        `tbl_inventory_products`  \
        LEFT OUTER JOIN tbl_inventory_categories ON tbl_inventory_products.category_id = tbl_inventory_categories.category_id \
        LEFT OUTER JOIN tbl_inventory_sub_categories ON tbl_inventory_products.sub_category_id = tbl_inventory_sub_categories.id \
        WHERE tbl_inventory_products.status = 'in_stock' AND tbl_inventory_products.product_id = ?;";
        params = [ product_id ];
    }else if ( sub_category_id )
    {

        q = "SELECT tbl_inventory_products.*,  \
        tbl_inventory_products.quantity as stocked_quantity, \
        tbl_inventory_categories.name as category_name,   \
        tbl_inventory_sub_categories.name as sub_category_name    \
        FROM   \
        `tbl_inventory_products`   \
        LEFT OUTER JOIN tbl_inventory_categories ON tbl_inventory_products.category_id = tbl_inventory_categories.category_id  \
        LEFT OUTER JOIN tbl_inventory_sub_categories ON tbl_inventory_products.sub_category_id = tbl_inventory_sub_categories.id  \
        WHERE tbl_inventory_products.status = 'in_stock' AND tbl_inventory_products.sub_category_id = ?";
        params = [ sub_category_id ];

        // if ( company_code !== '' )
        // {
        //     q = q.concat(" AND tbl_inventory_products.company_code = ?");
        //     params.push( company_code );
        // }
        // if ( location_code !== '' )
        // {
        //     q = q.concat(" AND tbl_inventory_products.location_code = ?");
        //     params.push( location_code );
        // }
        // if ( sub_location_code !== '' )
        // {
        //     q = q.concat(" AND tbl_inventory_products.sub_location_code = ?");
        //     params.push( sub_location_code );
        // }

        q = q.concat(";");
        
        q = q.concat(" \
            SELECT \
            tbl_inventory_product_transactions.*, \
            companies.company_name, \
            locations.location_name, \
            tbl_inventory_sub_locations.sub_location_name, \
            issued_to.name as issued_to_emp,   \
            recorded.name as recorded_emp   \
            FROM   \
            `tbl_inventory_products`   \
            LEFT OUTER JOIN tbl_inventory_product_transactions ON tbl_inventory_products.product_id = tbl_inventory_product_transactions.product_id   \
            LEFT OUTER JOIN employees issued_to ON tbl_inventory_product_transactions.employee = issued_to.emp_id    \
            LEFT OUTER JOIN employees recorded ON tbl_inventory_product_transactions.recorded_by = recorded.emp_id    \
            LEFT OUTER JOIN companies ON tbl_inventory_product_transactions.company_code = companies.company_code    \
            LEFT OUTER JOIN locations ON tbl_inventory_product_transactions.location_code = locations.location_code    \
            LEFT OUTER JOIN tbl_inventory_sub_locations ON tbl_inventory_product_transactions.sub_location_code = tbl_inventory_sub_locations.sub_location_code    \
            WHERE tbl_inventory_products.status = 'in_stock' AND tbl_inventory_products.sub_category_id = ? \
        ");

        params.push( sub_category_id );
        
    }

    db.query(
        q,
        params,
        ( err, rslt ) => {

            if( err )
            {

                console.log( err )
                res.send(err);
                res.end();

            }else 
            {

                let query = "SELECT * FROM `tbl_inventory_product_attributes` WHERE ";
                let params2 = [];
                for ( let x = 0; x < rslt[1].length; x++ )
                {
                    query = query.concat("transaction_id = ?");
                    params2.push( rslt[1][x].transaction_id );

                    if ( ( x + 1 ) === rslt[1].length )
                    {
                        query = query.concat(";");
                    }else
                    {
                        query = query.concat(" OR ");
                    }

                }
                
                db.query(
                    query,
                    params2,
                    ( err, rslt2 ) => {
            
                        if( err )
                        {
            
                            console.log( err )
                            res.send(err);
                            res.end();
            
                        }else 
                        {
                            rslt.push(rslt2)
                            res.send( rslt );
                            res.end();
                            
                        }
                        
                    }
                )
                
            }
            
        }
    )

} );

router.get('/inventory/product/create/load_data', ( req, res ) => {

    db.query(
        "SELECT location_code, location_name FROM `locations`;" +
        "SELECT company_code, company_name FROM `companies`;" +
        "SELECT tbl_inventory_delivery_challan.*, tbl_inventory_venders.name AS vender_name FROM `tbl_inventory_delivery_challan` \
        LEFT OUTER JOIN tbl_inventory_venders ON tbl_inventory_delivery_challan.vender_id = tbl_inventory_venders.vender_id ORDER BY tbl_inventory_delivery_challan.challan_id DESC LIMIT 10;",
        ( err, rslt ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {
                let challanDescriptionQuery = "SELECT 1;";
                let params = [];
                for ( let x = 0; x < rslt[2].length; x++ )
                {
                    challanDescriptionQuery = challanDescriptionQuery.concat("SELECT * FROM `tbl_inventory_delivery_challan_items` WHERE challan_id = ?;");
                    params.push( rslt[2][x].challan_id );
                }
                db.query(
                    challanDescriptionQuery,
                    params,
                    ( err, result ) => {
            
                        if( err )
                        {
            
                            console.log(err)
                            res.send(err);
                            res.end();
            
                        }else 
                        {
                            let arr = rslt;
                            arr.push( result );

                            res.send( arr );
                            res.end();
                            
                        }
                        
                    }
                )
                
            }
            
        }
    )

} );

router.post('/inventory/product/create/load_categories', ( req, res ) => {

    const { type } = req.body;

    db.query(
        "SELECT * FROM `tbl_inventory_categories` WHERE status = ? AND type = ?;",
        [ 'active', type ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err )
                res.send(err);
                res.end();

            }else 
            {
                res.send( rslt );
                res.end();
                
            }
            
        }
    )

} );

router.get('/inventory/product/get_attributes', ( req, res ) => {

    db.query(
        "SELECT * FROM `tbl_inventory_product_attributes` GROUP BY description;",
        ( err, rslt ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {
                
                res.send( rslt );
                res.end();
                
            }
            
        }
    )

} );

router.post('/inventory/products/create', ( req, res ) => {

    const { recorded_by, labeling, company, name, product_acquisition_date, physical_condition, product_type, product_note, delivery_challan, challan_generate_date, location, sub_location, category, sub_category, quantity, unit_price, description, attributes, extension } = req.body;

    db.query(
        "SELECT * FROM `tbl_inventory_products` WHERE sub_category_id = ?;",
        [sub_category],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send(err);
                res.end();

            }else 
            {
                
                if ( rslt.length > 0 )
                {
                    res.send(
                        {
                            title: 'exists',
                            product_id: rslt[0].product_id
                        }
                    );
                    res.end();
                }else
                {
                    const product_attributes = JSON.parse(attributes);
                    const deliveryChallanDate = challan_generate_date === 'null' ? new Date(product_acquisition_date) : new Date(challan_generate_date);
                    const code = new Date().getTime() + '_' + new Date().getDate() + (new Date().getMonth() + 1) + new Date().getFullYear();
                    let file_name;
                
                    if ( req.files )
                    {
                
                        const { Attachment } = req.files;
                        file_name = "products/" + Attachment.name.split('.').shift() + '.';
                        Attachment.mv('assets/inventory/assets/images/' + file_name + extension, (err) => {
                            
                            if (err) {
                    
                                console.log( err );
                    
                            }
                    
                        });
                
                    }
                
                    db.query(
                        "INSERT INTO `tbl_inventory_products`(`name`, `product_type`, `entering_code`, `category_id`, `sub_category_id`, `description`, `quantity`, `recording_date`) VALUES (?,?,?,?,?,?,?,?);" +
                        "SELECT product_id FROM tbl_inventory_products WHERE entering_code = ?",
                        [ name, product_type, code, category, sub_category, description, quantity, new Date(), code ],
                        ( err, rslt ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                                res.send(err);
                                res.end();
                
                            }else 
                            {
                
                                let attr_query = "INSERT INTO `tbl_inventory_product_transactions`(`labeling`,`product_id`, `quantity`, `stored_quantity`, `unit_price`, `total_amount`, `delivery_challan`, `company_code`, `location_code`, `sub_location_code`, `preview`, `physical_condition`, `acquisition_date`, `note`, `recorded_by`, `record_date`, `record_time`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
                                let params = [];

                                params.push(labeling);
                                params.push(rslt[1][0].product_id);
                                params.push(quantity);
                                params.push(quantity);
                                params.push(unit_price);
                                params.push(parseFloat(unit_price)*parseInt(quantity));
                                params.push(delivery_challan === 'null' || delivery_challan === null ? null : delivery_challan);
                                params.push(company);
                                params.push(location);
                                params.push(sub_location);
                                params.push(file_name ? (file_name + extension) : null);
                                params.push(physical_condition);
                                params.push(deliveryChallanDate);
                                params.push(product_note);
                                params.push(recorded_by);
                                params.push(new Date());
                                params.push(new Date().toTimeString());

                                attr_query = attr_query.concat("SELECT transaction_id FROM tbl_inventory_product_transactions WHERE product_id = ? AND record_date = ? AND record_time = ?;");

                                params.push(rslt[1][0].product_id);
                                params.push(new Date().toISOString().slice(0, 10).replace('T', ' '));
                                params.push(new Date().toTimeString().substring(0,8));

                                let attr_query2 = "";
                                let params2 = [];
                                
                                db.query(
                                    attr_query,
                                    params,
                                    ( err, rslt ) => {
                            
                                        if( err )
                                        {
                            
                                            console.log( err );
                                            res.send(err);
                                            res.end();
                            
                                        }else 
                                        {
                                            for ( let x = 0; x < product_attributes.length; x++ )
                                            {
                                                attr_query2 = attr_query2.concat("INSERT INTO `tbl_inventory_product_attributes`(`transaction_id`, `description`, `value_str`, `value_int`, `value_float`, `value_date`, `value_time`) VALUES (?,?,?,?,?,?,?);");
                                                params2.push(rslt[1][0].transaction_id);
                                                params2.push(product_attributes[x].description.toLowerCase());
                                                params2.push(product_attributes[x].type.toLowerCase() === 'value_str' ? product_attributes[x].value.toLowerCase() : null);
                                                params2.push(product_attributes[x].type.toLowerCase() === 'value_int' ? product_attributes[x].value.toLowerCase() : null);
                                                params2.push(product_attributes[x].type.toLowerCase() === 'value_float' ? product_attributes[x].value.toLowerCase() : null);
                                                params2.push(product_attributes[x].type.toLowerCase() === 'value_date' ? product_attributes[x].value.toLowerCase() : null);
                                                params2.push(product_attributes[x].type.toLowerCase() === 'value_time' ? product_attributes[x].value.toLowerCase() : null);
                                            }

                                            db.query(
                                                attr_query2,
                                                params2,
                                                ( err ) => {
                                        
                                                    if( err )
                                                    {
                                        
                                                        console.log( err );
                                                        res.send(err);
                                                        res.end();
                                        
                                                    }else 
                                                    {
                                                        CreateLogs( 
                                                            'tbl_inventory_products', 
                                                            rslt[1][0].product_id,
                                                            "Product '" + name + "' has created",
                                                            'info'
                                                        );
                                                        res.send("success");
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
            
        }
    )


} );

router.post('/inventory/products/create/inward', ( req, res ) => {

    const { attributes, recorded_by, product_id, product_company, product_location, product_sub_location, product_quantity, product_unit_price, product_total_amount, product_physical_condition, product_acquisition_date, product_note, delivery_challan, extension } = req.body;

    const product_attributes = JSON.parse(attributes);
    let query = "INSERT INTO `tbl_inventory_product_transactions`(`product_id`, `quantity`, `stored_quantity`, `unit_price`, `total_amount`, `delivery_challan`, `company_code`, `location_code`, `sub_location_code`, `preview`, `physical_condition`, `acquisition_date`, `note`, `recorded_by`, `record_date`, `record_time`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    let params = [];
    let file_name;

    if ( req.files )
    {

        const { Attachment } = req.files;
        file_name = "products/" + Attachment.name.split('.').shift() + '.';
        Attachment.mv('assets/inventory/assets/images/' + file_name + extension, (err) => {
            
            if (err) {
    
                console.log( err );
    
            }
    
        });

    }

    params.push(product_id);
    params.push(product_quantity);
    params.push(product_quantity);
    params.push(product_unit_price);
    params.push(product_total_amount);
    params.push(delivery_challan === 'null' || delivery_challan === null || delivery_challan === undefined || delivery_challan === 'undefined' ? null : delivery_challan);
    params.push(product_company);
    params.push(product_location);
    params.push(product_sub_location);
    params.push(file_name ? (file_name + extension) : null);
    params.push(product_physical_condition);
    params.push(product_acquisition_date);
    params.push(product_note);
    params.push(recorded_by);
    params.push(new Date());
    params.push(new Date().toTimeString());

    query = query.concat("SELECT transaction_id FROM tbl_inventory_product_transactions WHERE product_id = ? AND record_date = ? AND record_time = ?;");

    params.push(product_id);
    params.push(new Date().toISOString().slice(0, 10).replace('T', ' '));
    params.push(new Date().toTimeString().substring(0,8));

    query = query.concat("UPDATE tbl_inventory_products SET quantity = quantity + ? WHERE product_id = ?;");
    
    params.push(product_quantity);
    params.push(product_id);

    db.query(
        query,
        params,
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send(err);
                res.end();

            }else 
            {

                let query2 = "";
                let params2 = [];
                for ( let x = 0; x < product_attributes.length; x++ )
                {
                    query2 = query2.concat("INSERT INTO `tbl_inventory_product_attributes`(`transaction_id`, `description`, `value_str`, `value_int`, `value_float`, `value_date`, `value_time`) VALUES (?,?,?,?,?,?,?);");
                    params2.push(rslt[1][0].transaction_id);
                    params2.push(product_attributes[x].description.toLowerCase());
                    params2.push(product_attributes[x].type.toLowerCase() === 'value_str' ? product_attributes[x].value.toLowerCase() : null);
                    params2.push(product_attributes[x].type.toLowerCase() === 'value_int' ? product_attributes[x].value.toLowerCase() : null);
                    params2.push(product_attributes[x].type.toLowerCase() === 'value_float' ? product_attributes[x].value.toLowerCase() : null);
                    params2.push(product_attributes[x].type.toLowerCase() === 'value_date' ? product_attributes[x].value.toLowerCase() : null);
                    params2.push(product_attributes[x].type.toLowerCase() === 'value_time' ? product_attributes[x].value.toLowerCase() : null);
                }

                db.query(
                    query2,
                    params2,
                    ( err ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            res.send(err);
                            res.end();
            
                        }else 
                        {
                            res.send("success");
                            res.end();
                            
                        }
                        
                    }
                )
                
            }
            
        }
    )

} );

router.post('/inventory/products/create/get/product', ( req, res ) => {

    const { product_id } = req.body;

    db.query(
        "SELECT name, description, quantity FROM `tbl_inventory_products` WHERE product_id = ?;" +
        "SELECT tbl_inventory_product_transactions.quantity, \
        tbl_inventory_product_transactions.entry, \
        tbl_inventory_product_transactions.record_date, \
        companies.company_name, \
        locations.location_name, \
        tbl_inventory_sub_locations.sub_location_name \
        FROM `tbl_inventory_product_transactions` \
        LEFT OUTER JOIN companies ON tbl_inventory_product_transactions.company_code = companies.company_code \
        LEFT OUTER JOIN locations ON tbl_inventory_product_transactions.location_code = locations.location_code \
        LEFT OUTER JOIN tbl_inventory_sub_locations ON tbl_inventory_product_transactions.sub_location_code = tbl_inventory_sub_locations.sub_location_code \
        WHERE product_id = ? ORDER BY record_date DESC;",
        [ product_id, product_id ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
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

router.post('/inventory/products/scan/verify', ( req, res ) => {

    const { code } = req.body;
    let arr = code.split('_');

    if ( arr[1] )
    {
        arr.shift();
        arr.shift();
        const transaction_id = arr[0];
        db.query(
            "SELECT labeling, labeled FROM `tbl_inventory_product_transactions` WHERE transaction_id = ?;",
            [ transaction_id ],
            ( err, rslt ) => {
    
                if( err )
                {
    
                    console.log( err );
                    res.send(err);
                    res.end();
    
                }else 
                {

                    if ( rslt[0] )
                    {
                        const { labeling, labeled } = rslt[0];
                        if ( labeling === 1 )
                        {
                            if ( labeled === 1 )
                            {
                                res.send("already scanned");
                                res.end();
                            }else
                            {
                                db.query(
                                    "UPDATE `tbl_inventory_product_transactions` SET labeled = ?, label_date = ? WHERE transaction_id = ?;",
                                    [ 1, new Date(), transaction_id ],
                                    ( err ) => {
                            
                                        if( err )
                                        {
                            
                                            console.log( err );
                                            res.send(err);
                                            res.end();
                            
                                        }else 
                                        {
                        
                                            res.send("success");
                                            res.end();
                                            
                                        }
                                        
                                    }
                                )
                            }
                        }else
                        {
                            res.send('not valid');
                            res.end();
                        }
                    }else
                    {
                        res.send('not valid');
                        res.end();
                    }
                    
                }
                
            }
        )
    }else
    {
        res.send('not valid');
        res.end();
    }

} );

router.post('/inventory/get/inward/attributes', ( req, res ) => {

    const { transaction_id } = req.body;

    db.query(
        "SELECT * FROM tbl_inventory_product_attributes WHERE transaction_id = ?;",
        [ transaction_id ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
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

const AssignProduct = ( company, name, physical_condition, product_type, product_note, delivery_challan, challan_generate_date, location, sub_location, category, sub_category, quantity, unit_price, description, attributes, extension, emp_id, request_id ) => {

    const product_attributes = attributes;
    const deliveryChallanDate = challan_generate_date;
    const code = new Date().getTime() + '_' + new Date().getDate() + (new Date().getMonth() + 1) + new Date().getFullYear();
    let file_name = null;

    console.log(extension)
    
    if ( extension !== null )
    {
        
        const fs = require('fs');
        file_name = extension.split('/').pop().split('.').shift().substring(0,10) + code + '.' + extension.split('/').pop().split('.').pop();
        console.log(file_name)

        // File destination.txt will be created or overwritten by default.
        fs.copyFile('assets/inventory/assets/images/' + extension, 'assets/inventory/assets/images/products/' + file_name, (err) => {
            if (err) throw err;
            console.log( extension + ' was copied to ' + file_name );
        });

    }

    db.query(
        "INSERT INTO `tbl_inventory_products`(`entry`,`company_code`, `name`, `physical_condition`, `product_type`, `note`, `delivery_challan`, `location_code`, `entering_code`, `sub_location_code`, `category_id`, `sub_category_id`, `preview`, `description`, `quantity`, `unit_price`, `recording_date`, `acquisition_date`, `employee`, `request_id`, `issued_date`, `issued_time`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);" +
        "SELECT product_id FROM tbl_inventory_products WHERE entering_code = ?",
        [ 'outward', company, name, physical_condition, product_type, product_note, delivery_challan, location, code, sub_location, category, sub_category, file_name ? ('products/' + file_name) : null, description, quantity, unit_price, new Date(), deliveryChallanDate, emp_id, request_id, new Date(), new Date().toTimeString(), code ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else 
            {

                let attr_query = "SELECT 1;";
                let params = [];
                for ( let x = 0; x < product_attributes.length; x++ )
                {
                    attr_query = attr_query.concat("INSERT INTO `tbl_inventory_product_attributes`(`product_id`, `description`, `value_str`, `value_int`, `value_float`, `value_date`, `value_time`) VALUES (?,?,?,?,?,?,?);");
                    params.push(rslt[1][0].product_id);
                    params.push(product_attributes[x].description.toLowerCase());
                    params.push(product_attributes[x].type.toLowerCase() === 'value_str' ? product_attributes[x].value.toLowerCase() : null);
                    params.push(product_attributes[x].type.toLowerCase() === 'value_int' ? product_attributes[x].value.toLowerCase() : null);
                    params.push(product_attributes[x].type.toLowerCase() === 'value_float' ? product_attributes[x].value.toLowerCase() : null);
                    params.push(product_attributes[x].type.toLowerCase() === 'value_date' ? product_attributes[x].value.toLowerCase() : null);
                    params.push(product_attributes[x].type.toLowerCase() === 'value_time' ? product_attributes[x].value.toLowerCase() : null);
                }
                
                db.query(
                    attr_query,
                    params,
                    ( err ) => {
            
                        if( err )
                        {
            
                            console.log( err );
            
                        }else 
                        {
                            CreateLogs( 
                                'tbl_inventory_products', 
                                rslt[1][0].product_id,
                                "Product '" + name + "' has created",
                                'info'
                            );
                            
                        }
                        
                    }
                )
                
            }
            
        }
    )

}

module.exports = {
    router: router,
    AssignProduct: ( company, name, physical_condition, product_type, product_note, delivery_challan, challan_generate_date, location, sub_location, category, sub_category, quantity, unit_price, description, attributes, extension, emp_id, request_id ) => AssignProduct( company, name, physical_condition, product_type, product_note, delivery_challan, challan_generate_date, location, sub_location, category, sub_category, quantity, unit_price, description, attributes, extension, emp_id, request_id )
};