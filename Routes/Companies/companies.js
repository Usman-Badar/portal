const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.post('/getcompanylocations', ( req, res ) => {

    const { company_code } = req.body;
    
    db.getConnection(
        ( err, connection ) => {
            
            if ( err )
            {
                
                
                res.status(503).send(err);
                res.end();
                
            }else
            {
                db.query(
                    "SELECT locations.*, \
                    company_locations.* \
                    FROM company_locations \
                    LEFT OUTER JOIN locations ON company_locations.location_code = locations.location_code \
                    WHERE company_locations.company_code = " + company_code,
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
                )
            }

        }
    )

} );

router.get('/getcompaniescodes', ( req, res ) => {

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                db.query(
                    "SELECT * FROM companies",
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
                )
            }

        }
    )

} );

router.post('/getcompany', ( req, res ) => {

    const { CompanyCode } = req.body;

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "SELECT emp_id FROM employees WHERE company_code = " + CompanyCode + " GROUP BY emp_id DESC LIMIT 1",
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
                )
            }

        }
    )

} );

router.get('/getlastcompanycode', ( req, res ) => {

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {
                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "SELECT company_code FROM companies GROUP BY company_code DESC LIMIT 1",
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
                )
            }

        }
    )

} );

router.get('/getallcompanies', ( req, res ) => {

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "SELECT * FROM companies GROUP BY company_code DESC",
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
                )
            }

        }
    )

} );

router.post('/getshortcompanyname', ( req, res ) => {

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
                    "SELECT code FROM companies WHERE company_code = ?",
                    [ company_code ],
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
                )
            }

        }
    )

} );

module.exports = router;