const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.post('/updateprofile', ( req, res ) => {

    const { 
        emp_id,
        residential_address,
        emergency_person_name,
        emergency_person_number,
        landline,
        cell,
        email,
        login_id,
        emp_password,
        CVName,
        PRFName
    } = req.body;
    const d = new Date();

    db.query(
        "UPDATE employees SET residential_address = ?, emergency_person_name = ?, emergency_person_number = ?, landline = ?, cell = ?, email = ? WHERE emp_id = ?;" +
        "UPDATE emp_app_profile SET login_id = ?, emp_password = ? WHERE emp_id = ?;",
        [residential_address, emergency_person_name, emergency_person_number, landline, cell, email, emp_id, login_id, emp_password, emp_id],
        ( err ) => {

            if( err )
            {

                console.log( err );
                res.status(500).send(err);
                res.end();

            }else 
            {

                if ( req.files )
                {
                    const { CV, PRF } = req.files;
                    let q = "";
                    let pera = [];

                    if ( CV )
                    {
                        q = q.concat("UPDATE emp_cv SET cv = ? WHERE emp_id = ?;");
                        pera.push(CVName + '.' + CV.name.split('.').pop());
                        pera.push(emp_id);
                        CV.mv('client/public/images/documents/cv/' + CVName + '.' + CV.name.split('.').pop(), (err) => {
            
                            if (err) {
                    
                                res.status(500).send(err);
                                res.end();
                    
                            }
                    
                        });
                    }
                    if ( PRF )
                    {
                        q = q.concat("UPDATE emp_prf_address SET proof_of_address = ? WHERE emp_id = ?;");
                        pera.push(PRFName + '.' + PRF.name.split('.').pop());
                        pera.push(emp_id);
                        PRF.mv('client/public/images/documents/address/' + PRFName + '.' + PRF.name.split('.').pop(), (err) => {
            
                            if (err) {
                    
                                res.status(500).send(err);
                                res.end();
                    
                            }
                    
                        });
                    }
                    db.query(
                        q,
                        pera,
                        ( err ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                                res.status(500).send(err);
                                res.end();
                
                            }else 
                            {
                
                                
                                res.send('success');
                                res.end();
                
                            }
                
                        }
                    )
                }else
                {
                    res.send( 'success' );
                    res.end();
                }

            }

        }
    )

} );

module.exports = router;