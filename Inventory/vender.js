const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/inventory/venders/all', ( req, res ) => {

    db.query(
        "SELECT * FROM `tbl_inventory_venders` WHERE status = 'active' ORDER BY vender_id DESC;" +
        "SELECT COUNT(*) AS total_venders FROM tbl_inventory_venders WHERE status = 'active';",
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

router.post('/inventory/venders/create', ( req, res ) => {

    const { name, phone, ntn_no, address } = req.body;

    db.query(
        "SELECT LOWER(`tbl_inventory_venders`.`name`) FROM `tbl_inventory_venders` WHERE name = ? OR phone = ?;",
        [ name.toLowerCase(), phone ],
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
                        "INSERT INTO `tbl_inventory_venders`(`name`, `phone`, `address`, `ntn_no`) VALUES (?,?,?,?);",
                        [ name, phone, address, ntn_no === '' ? null : ntn_no ],
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

router.post('/inventory/venders/remove', ( req, res ) => {

    const { id } = req.body;

    db.query(
        "UPDATE tbl_inventory_venders SET status = 'removed' WHERE vender_id = ?",
        [id],
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

router.post('/inventory/venders/edit', ( req, res ) => {

    const { name, phone, address, ntn_no, vender_id } = req.body;

    db.query(
        "SELECT LOWER(name) FROM `tbl_inventory_venders` WHERE name = ? AND vender_id != ?;",
        [ name, vender_id ],
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
                        "UPDATE `tbl_inventory_venders` SET name = ?, phone = ?, address = ?, ntn_no =? WHERE vender_id = ?;",
                        [ name, phone, address, ntn_no === '' ? null : ntn_no, vender_id ],
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

router.post(
    '/inventory/venders/search',
    ( req, res ) => {

        const { key } = req.body;

        db.query(
            "SELECT * FROM `tbl_inventory_venders` WHERE tbl_inventory_venders.name LIKE '%" + key + "%' AND status = 'active';",
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

    }
)

module.exports = router;