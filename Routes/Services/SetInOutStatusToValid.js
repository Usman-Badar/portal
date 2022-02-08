const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

setInterval(() => {

    db.getConnection(
        ( err, connection ) => {

            if ( !err )
            {
                connection.query(
                    "UPDATE emp_machine_thumbs SET emp_machine_thumbs.status = 'valid' WHERE emp_machine_thumbs.status = 'Waiting'",
                    (err) => {
            
                        if (err) {
    
                            console.log( err );
                            res.status(500).send(err);
                            res.end();
                            connection.release();
            
                        }
                        connection.release();
            
                    }
                )
            }else{
                
                res.status(503).send(err);
                res.end();
            }

        }
    )
    
    
}, 60000);

module.exports = router;