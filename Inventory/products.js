const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const CreateLogs = require('../Routes/Employee/logs').CreateLog;

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

router.get('/inventory/get_products', ( req, res ) => {

    db.query(
        "SELECT tbl_inventory_products.*, \
        tbl_inventory_sub_categories.name as sub_category_name  \
        FROM  \
        `tbl_inventory_products`  \
        LEFT OUTER JOIN tbl_inventory_sub_categories ON tbl_inventory_products.sub_category_id = tbl_inventory_sub_categories.id \
        WHERE tbl_inventory_products.status = 'active';",
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

router.get('/inventory/product/create/load_data', ( req, res ) => {

    db.query(
        "SELECT location_code, location_name FROM `locations`;" +
        "SELECT * FROM `tbl_inventory_categories` WHERE status = 'active';" +
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
                for ( let x = 0; x < rslt[3].length; x++ )
                {
                    challanDescriptionQuery = challanDescriptionQuery.concat("SELECT * FROM `tbl_inventory_delivery_challan_items` WHERE challan_id = ?;");
                    params.push( rslt[3][x].challan_id );
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

    const { company, name, physical_condition, product_type, product_note, delivery_challan, challan_generate_date, location, sub_location, category, sub_category, quantity, unit_price, description, attributes, extension } = req.body;

    const product_attributes = JSON.parse(attributes);
    const deliveryChallanDate = challan_generate_date === 'null' ? null : new Date(challan_generate_date);
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
        "INSERT INTO `tbl_inventory_products`(`company_code`, `name`, `physical_condition`, `product_type`, `note`, `delivery_challan`, `location_code`, `entering_code`, `sub_location_code`, `category_id`, `sub_category_id`, `preview`, `description`, `quantity`, `unit_price`, `recording_date`, `acquisition_date`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);" +
        "SELECT product_id FROM tbl_inventory_products WHERE entering_code = ?",
        [ company, name, physical_condition, product_type, product_note, delivery_challan === 'null' ? null : delivery_challan, location, code, sub_location, category, sub_category, file_name ? (file_name + extension) : null, description, quantity, unit_price, new Date(), deliveryChallanDate, code ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send(err);
                res.end();

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
        "INSERT INTO `tbl_inventory_products`(`company_code`, `name`, `physical_condition`, `product_type`, `note`, `delivery_challan`, `location_code`, `entering_code`, `sub_location_code`, `category_id`, `sub_category_id`, `preview`, `description`, `quantity`, `unit_price`, `recording_date`, `acquisition_date`, `employee`, `request_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);" +
        "SELECT product_id FROM tbl_inventory_products WHERE entering_code = ?",
        [ company, name, physical_condition, product_type, product_note, delivery_challan, location, code, sub_location, category, sub_category, file_name ? ('products/' + file_name) : null, description, quantity, unit_price, new Date(), deliveryChallanDate, emp_id, request_id, code ],
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