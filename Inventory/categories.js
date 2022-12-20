const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const CreateLogs = require('../Routes/Employee/logs').CreateLog;

router.get('/inventory/get_categories', ( req, res ) => {

    db.query(
        "SELECT * FROM `tbl_inventory_categories` WHERE status = 'active';",
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

router.post('/inventory/add_new_category', ( req, res ) => {

    const { category, icon, type } = req.body;

    db.query(
        "SELECT category_id, LOWER(`tbl_inventory_categories`.`name`), status FROM tbl_inventory_categories WHERE name = ?;",
        [ category.toLowerCase() ],
        ( err, rslt ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {
                if ( rslt[0] )
                {
                    if ( rslt[0].status === 'active' )
                    {
                        res.send( 'exists' );
                        res.end();
                    }else if ( rslt[0].status === 'removed' )
                    {
                        db.query(
                            "UPDATE `tbl_inventory_categories` SET status = ?, icon = ?, type = ? WHERE category_id = ?;",
                            [ 'active', icon, type, rslt[0].category_id ],
                            ( err ) => {
                    
                                if( err )
                                {
                    
                                    res.send(err);
                                    res.end();
                    
                                }else 
                                {
    
                                    CreateLogs( 
                                        'tbl_inventory_categories', 
                                        rslt[0].category_id,
                                        "Category '" + category + "'was removed and now re-active.",
                                        'info'
                                    );
                                    res.send( 'found' );
                                    res.end();
                                    
                                }
                                
                            }
                        )
                    }
                }else
                {
                    db.query(
                        "INSERT INTO `tbl_inventory_categories`(`name`, `icon`, `type`) VALUES (?,?,?);" +
                        "SELECT category_id FROM tbl_inventory_categories WHERE name = ? AND icon = ? AND type = ?;",
                        [ category, icon, type, category, icon, type ],
                        ( err, rslt ) => {
                
                            if( err )
                            {
                
                                res.send(err);
                                res.end();
                
                            }else 
                            {

                                CreateLogs( 
                                    'tbl_inventory_categories', 
                                    rslt[1][0].category_id,
                                    "Category '" + category + "' has created",
                                    'info'
                                );
                                res.send( rslt );
                                res.end();
                                
                            }
                            
                        }
                    )
                }
            }
            
        }
    )

} );

router.post('/inventory/edit_category', ( req, res ) => {

    const { category, category_id, icon, type, labeling } = req.body;

    db.query(
        "SELECT LOWER(name) FROM `tbl_inventory_categories` WHERE name = ? AND category_id != ?;",
        [ category, category_id ],
        ( err, rslt ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {
                
                if ( rslt[0] )
                {
                    res.send( 'exists' );
                    res.end();
                }else
                {
                    db.query(
                        "UPDATE `tbl_inventory_categories` SET name = ?, icon = ?, type = ?, labeling = ? WHERE category_id = ?;",
                        [ category, icon, type, labeling ? 1 : 0, category_id ],
                        ( err ) => {
                
                            if( err )
                            {
                
                                res.send(err);
                                res.end();
                
                            }else 
                            {
                                
                                // CreateLogs( 
                                //     'tbl_inventory_categories', 
                                //     category_id,
                                //     "Category '" + category + "' has updated",
                                //     'info'
                                // );
                                res.send( 'success' );
                                res.end();
                                
                            }
                            
                        }
                    )
                }
                
            }
            
        }
    )

} );

router.post('/inventory/remove_category', ( req, res ) => {

    const { category_id } = req.body;

    db.query(
        "UPDATE `tbl_inventory_categories` SET status = 'removed' WHERE category_id = ?;",
        [ category_id ],
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

router.post('/inventory/get_sub_categories', ( req, res ) => {

    const { category_id } = req.body;

    db.query(
        "SELECT * FROM `tbl_inventory_sub_categories` WHERE category_id = ? AND status = 'active';",
        [ category_id ],
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

router.post('/inventory/add_new_sub_category', ( req, res ) => {

    const { category_id, sub_category, labeling, icon } = req.body;

    db.query(
        "SELECT id, LOWER(`tbl_inventory_sub_categories`.`name`), status FROM tbl_inventory_sub_categories WHERE name = ? AND category_id = ?;",
        [ sub_category.toLowerCase(), category_id ],
        ( err, rslt ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {
                if ( rslt[0] )
                {
                    if ( rslt[0].status === 'active' )
                    {
                        res.send( 'exists' );
                        res.end();
                    }else if ( rslt[0].status === 'removed' )
                    {
                        db.query(
                            "UPDATE `tbl_inventory_sub_categories` SET status = ?, icon = ?, labeling = ? WHERE id = ?;",
                            [ 'active', icon, labeling ? 1 : 0, rslt[0].id ],
                            ( err ) => {
                    
                                if( err )
                                {
                    
                                    res.send(err);
                                    res.end();
                    
                                }else 
                                {
    
                                    CreateLogs( 
                                        'tbl_inventory_sub_categories', 
                                        rslt[0].id,
                                        "Sub-Category '" + sub_category + "'was removed and now re-active.",
                                        'info'
                                    );
                                    res.send( 'found' );
                                    res.end();
                                    
                                }
                                
                            }
                        )
                    }
                }else
                {
                    db.query(
                        "INSERT INTO `tbl_inventory_sub_categories`(`category_id`, `name`, `icon`, `labeling`) VALUES (?,?,?,?);",
                        [ category_id, sub_category, icon, labeling ? 1 : 0 ],
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
                }
            }
            
        }
    )

} );

router.post('/inventory/remove_sub_category', ( req, res ) => {

    const { id } = req.body;

    db.query(
        "UPDATE `tbl_inventory_sub_categories` SET status = 'removed' WHERE id = ?;",
        [ id ],
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

router.post('/inventory/edit_sub_category', ( req, res ) => {

    const { category, id, icon, labeling, category_id } = req.body;

    db.query(
        "SELECT LOWER(name) FROM `tbl_inventory_sub_categories` WHERE name = ? AND id != ? AND category_id = ?;",
        [ category, id, category_id ],
        ( err, rslt ) => {

            if( err )
            {

                res.send(err);
                res.end();

            }else 
            {
                
                if ( rslt[0] )
                {
                    res.send( 'exists' );
                    res.end();
                }else
                {
                    db.query(
                        "UPDATE `tbl_inventory_sub_categories` SET name = ?, icon = ?, labeling = ? WHERE id = ?;" +
                        "UPDATE `tbl_inventory_products` SET labeling = ? WHERE sub_category_id = ?;",
                        [ category, icon, labeling ? 1 : 0, id, 1, id ],
                        ( err ) => {
                
                            if( err )
                            {
                
                                res.send(err);
                                res.end();
                
                            }else 
                            {
                                
                                res.send( 'success' );
                                res.end();
                                
                            }
                            
                        }
                    )
                }
                
            }
            
        }
    )

} );

module.exports = router;