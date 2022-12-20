const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/inventory/get_data/home', ( req, res ) => {

    db.query(
        "SELECT  \
        tbl_inventory_products.name, \
        tbl_inventory_products.entry, \
        tbl_inventory_products.sub_category_id, \
        tbl_inventory_sub_categories.name AS sub_category_name, \
        SUM(tbl_inventory_products.quantity) AS quantity \
        FROM `tbl_inventory_products` \
        LEFT OUTER JOIN tbl_inventory_sub_categories ON tbl_inventory_products.sub_category_id = tbl_inventory_sub_categories.id \
        GROUP BY tbl_inventory_products.sub_category_id, tbl_inventory_products.entry ORDER BY tbl_inventory_products.product_id DESC LIMIT 10;" +
        "SELECT * FROM `tbl_inventory_venders` ORDER BY vender_id DESC LIMIT 10;",
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

module.exports = router;