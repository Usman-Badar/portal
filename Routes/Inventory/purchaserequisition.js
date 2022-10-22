const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const fs = require('fs');
const moment = require('moment');
const io = require('../../server');

const CreateLogs = require('../Employee/logs').CreateLog;

io.on('connection', ( socket ) => {

    socket.on(
        'prdiscussions', () => {

            socket.broadcast.emit('prdiscussions');
    
        }
    )

    socket.on(
        'prsubdiscussions', ( id ) => {
            
            socket.broadcast.emit('prsubdiscussions', id);
    
        }
    )

    socket.on(
        'newpurchaserequision', () => {
            
            socket.broadcast.emit('newpurchaserequision');
    
        }
    )

});

router.post('/getmonthlyrequests', ( req, res ) => {

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
                                            "SELECT COUNT(invtry_purchase_requests.pr_id) AS count, MONTHNAME( invtry_purchase_requests.request_date ) AS month, YEAR( invtry_purchase_requests.request_date ) AS year FROM invtry_purchase_requests  \
                                            WHERE invtry_purchase_requests.total < " + parseFloat( rslt[0] ? rslt[0].approval_limit : 0.00 );
                
                                            // if ( access.includes(513) && !access.includes(1) && !access.includes(514) ) // if employee has limited access
                                            // {
                                            //     q = q.concat(' AND ', "invtry_purchase_requests.status != 'Sent' AND invtry_purchase_requests.status != 'Viewed'")
                                            // }
                
                                            if ( !access.includes(516) && !access.includes(1) && !access.includes(514) ) // if employee cannot approve the request for multiple companies
                                            {
                                                if ( result[0] )
                                                {
                                                    q = q.concat(' AND ', "invtry_purchase_requests.company_code = " + result[0].company_code);
                                                    for ( let x = 0; x < result.length; x++ )
                                                    {
                                                        q = q.concat(' OR ', "invtry_purchase_requests.company_code = " + result[x].company_code);
                                                    }
                                                }
                                            }
                                            
                                            q = q.concat(' GROUP BY YEAR(invtry_purchase_requests.request_date), MONTH(invtry_purchase_requests.request_date) ORDER BY invtry_purchase_requests.request_date DESC LIMIT 12');
                                        
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

})

router.post('/purchaserequision', ( req, res ) => {

    const { items, sender, behalfOf, dateTime } = req.body;

    let specifications = JSON.parse( items );
    let SenderEmployee = sender;
    let BehalfEmployee = behalfOf;
    let total = 0.00;
    const d = new Date( dateTime );


    // calculating total
    for ( let x = 0; x < specifications.length; x++ )
    {
        total = total + specifications[x].amount;
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
                    "SELECT code FROM companies WHERE company_code = ?",
                    [ BehalfEmployee.company_code ],
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            connection.release();
                            res.send( err );
                            res.end();
            
                        }else 
                        {

                            let code = '';
                            if ( rslt.length > 0 )
                            {
                                code = rslt[0].code;
                            }
                            connection.query(
                                "SELECT pr_code FROM invtry_purchase_requests WHERE company_code = ? ORDER BY pr_id DESC LIMIT 1",
                                [ BehalfEmployee.company_code ],
                                ( err, rslt ) => {
                        
                                    if( err )
                                    {
                        
                                        console.log( err );
                                        res.send( err );
                                        connection.release();
                        
                                    }else 
                                    {

                                        let lastPR = '';
                                        if ( rslt.length > 0 )
                                        {
                                            let getCode = (parseInt(rslt[0].pr_code.split('-')[1]) + 1).toString();
                                            if (getCode.length === 1) {
                                                getCode = '0' + getCode;
                                            }
                                            lastPR = getCode;
                                        }else
                                        {
                                            lastPR = '01';
                                        }

                                        let Year = '';
                                        if ( d.getMonth() > 6 )
                                        {
                                            Year = d.getFullYear().toString().substring(2,4) + '/' + ( d.getFullYear() + 1 ).toString().substring(2,4);
                                        }else
                                        {
                                            Year = ( d.getFullYear() - 1 ).toString().substring(2,4) + '/' + d.getFullYear().toString().substring(2,4);
                                        }
                                        
                                        connection.query(
                                            "INSERT INTO `invtry_purchase_requests`(`pr_code`,`location_code`, `company_code`, `request_by`, `request_for`, `request_date`, `request_time`, `status`, `total`) VALUES (?,?,?,?,?,?,?,?,?)",
                                            [ code + '-' + lastPR + '-' + Year, BehalfEmployee.location_code, BehalfEmployee.company_code, SenderEmployee.emp_id, BehalfEmployee.emp_id, d, d.toTimeString(), 'Sent', total ],
                                            ( err ) => {
                                                
                                                if( err )
                                                {
                                    
                                                    console.log( err );
                                                    res.send( err );
                                                    connection.release();
                                    
                                                }else 
                                                {
                        
                                                    connection.query(
                                                        "SELECT pr_id FROM invtry_purchase_requests WHERE pr_code = ?",
                                                        [ code + '-' + lastPR + '-' + Year ],
                                                        ( err, rslt ) => {
                                                            
                                                            if( err )
                                                            {
                                                                
                                                                console.log( err );
                                                                res.send( err );
                                                                connection.release();
                                                                
                                                            }else 
                                                            {
                                                                
                                                                for( let x = 0; x < specifications.length; x++ )
                                                                {
                                                                    connection.query(
                                                                        "INSERT INTO `invtry_purchase_request_specifications`(`pr_id`, `description`, `reason`, `price`, `quantity`, `tax`, `amount`) VALUES (?,?,?,?,?,?,?)",
                                                                        [ rslt[0].pr_id, specifications[x].description, specifications[x].reason, parseFloat(specifications[x].price), parseInt(specifications[x].quantity), 0, parseFloat(specifications[x].amount) ],
                                                                        ( err ) => {
                                                                
                                                                            if( err )
                                                                            {
                                                                
                                                                                console.log( err );
                                                                                res.send( err );
                                                                                connection.release();
                                                                
                                                                            }
                                                                
                                                                        }
                                                                    );
                        
                                                                    if ( ( x + 1 ) === specifications.length )
                                                                    {
                    
                                                                        res.send( rslt );
                                                                        connection.release();
                    
                                                                    }
                                                                }
                                                
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
                )
            }

        }
    );

} );

router.post('/getinvtryemployees', ( req, res ) => {

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
                    "SELECT employees.*, \
                    emp_app_profile.*, \
                    companies.*, \
                    locations.*, \
                    designations.*, \
                    departments.* \
                    FROM employees \
                    LEFT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id \
                    LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code \
                    LEFT OUTER JOIN departments ON designations.department_code = departments.department_code \
                    LEFT OUTER JOIN companies ON employees.company_code = companies.company_code \
                    LEFT OUTER JOIN locations ON employees.location_code = locations.location_code \
                    WHERE employees.name LIKE '%" + key + "%'",
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            res.send( err );
                            connection.release();
            
                        }else 
                        {
            
                            res.send( rslt );
                            connection.release();
            
                        }
            
                    }
                );
            }

        }
    );

} );

router.post('/getemployeeprrequests', ( req, res ) => {

    const { empID } = req.body;

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {
                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "SELECT invtry_purchase_requests.*, \
                    employees.*, \
                    invtry_purchase_request_specifications.*  \
                    FROM invtry_purchase_requests \
                    LEFT OUTER JOIN invtry_purchase_request_specifications ON invtry_purchase_requests.pr_id = invtry_purchase_request_specifications.pr_id \
                    LEFT OUTER JOIN employees ON invtry_purchase_requests.request_by = employees.emp_id \
                    WHERE invtry_purchase_requests.request_by = " + parseInt( empID ) + " OR invtry_purchase_requests.request_for = " + parseInt( empID ) + " ORDER BY invtry_purchase_requests.pr_id DESC;" +
                    "SELECT invtry_purchase_requests.*, \
                    employees.*, \
                    invtry_purchase_request_specifications.*  \
                    FROM invtry_purchase_requests \
                    LEFT OUTER JOIN invtry_purchase_request_specifications ON invtry_purchase_requests.pr_id = invtry_purchase_request_specifications.pr_id \
                    LEFT OUTER JOIN employees ON invtry_purchase_requests.request_for = employees.emp_id \
                    WHERE invtry_purchase_requests.request_by = " + parseInt( empID ) + " OR invtry_purchase_requests.request_for = " + parseInt( empID ) + " ORDER BY invtry_purchase_requests.pr_id DESC",
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            res.send( err );
                            connection.release();
            
                        }else 
                        {
            
                            res.send( rslt );
                            connection.release();
            
                        }
            
                    }
                );
            }

        }
    );

} );

router.post('/getallpr', ( req, res ) => {

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
                                            emp_app_profile.emp_image,  \
                                            invtry_purchase_requests.*, \
                                            invtry_purchase_requests.location_code as pr_location, \
                                            invtry_purchase_requests.status as status \
                                            FROM employees  \
                                            RIGHT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id  \
                                            RIGHT OUTER JOIN invtry_purchase_requests ON employees.emp_id = invtry_purchase_requests.request_for \
                                            LEFT OUTER JOIN companies ON invtry_purchase_requests.company_code = companies.company_code  \
                                            LEFT OUTER JOIN locations ON invtry_purchase_requests.location_code = locations.location_code  \
                                            WHERE invtry_purchase_requests.total < " + parseFloat( rslt[0] ? rslt[0].approval_limit : 0.00 );
                
                                            if ( result[0] )
                                            {
                                                q = q.concat(' AND ', "invtry_purchase_requests.company_code = " + result[0].company_code);
                                                for ( let x = 0; x < result.length; x++ )
                                                {
                                                    q = q.concat(' OR ', "invtry_purchase_requests.company_code = " + result[x].company_code);
                                                }
                                            }
                                            
                                            q = q.concat(' ORDER BY invtry_purchase_requests.pr_id DESC');
                                        
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

router.post('/getallprsorted', ( req, res ) => {

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
                                            emp_app_profile.emp_image,  \
                                            invtry_purchase_requests.*, \
                                            invtry_purchase_requests.location_code as pr_location, \
                                            invtry_purchase_requests.status as status \
                                            FROM employees  \
                                            RIGHT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id  \
                                            RIGHT OUTER JOIN invtry_purchase_requests ON employees.emp_id = invtry_purchase_requests.request_for \
                                            LEFT OUTER JOIN companies ON invtry_purchase_requests.company_code = companies.company_code  \
                                            LEFT OUTER JOIN locations ON invtry_purchase_requests.location_code = locations.location_code  \
                                            WHERE " + filteredQuery + " invtry_purchase_requests.total < " + parseFloat( rslt[0] ? rslt[0].approval_limit : 0.00 );
                
                                            if ( result[0] )
                                            {
                                                q = q.concat(' AND ', "invtry_purchase_requests.company_code = " + result[0].company_code);
                                                for ( let x = 0; x < result.length; x++ )
                                                {
                                                    q = q.concat(' OR ', "invtry_purchase_requests.company_code = " + result[x].company_code);
                                                }
                                            }
                                            
                                            q = q.concat(' ORDER BY invtry_purchase_requests.pr_id DESC');
                                        
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

router.post('/getthatrequestfulldetails', ( req, res ) => {

    const { prID } = req.body;

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
                    emp_for.name as emp_for_name, \
                    sender.name as sender_name, \
                    sender.gender as sender_gender, \
                    approve_emp.name as approve_emp_name, \
                    discard_emp.name as discard_emp_name, \
                    handle_emp.name as handle_emp_name, \
                    locations.location_name, \
                    companies.company_name, \
                    invtry_purchase_requests.*, \
                    invtry_purchase_requests.status as status  \
                    FROM invtry_purchase_requests  \
                    RIGHT OUTER JOIN employees emp_for ON emp_for.emp_id = invtry_purchase_requests.request_for  \
                    RIGHT OUTER JOIN employees sender ON sender.emp_id = invtry_purchase_requests.request_by  \
                    LEFT OUTER JOIN employees approve_emp ON approve_emp.emp_id = invtry_purchase_requests.approve_by \
                    LEFT OUTER JOIN employees discard_emp ON discard_emp.emp_id = invtry_purchase_requests.discard_by \
                    LEFT OUTER JOIN employees handle_emp ON handle_emp.emp_id = invtry_purchase_requests.handle_by \
                    LEFT OUTER JOIN locations ON invtry_purchase_requests.location_code = locations.location_code \
                    LEFT OUTER JOIN companies ON invtry_purchase_requests.company_code = companies.company_code \
                    WHERE invtry_purchase_requests.pr_id = " + prID,
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

router.post('/getthatempinvtryrequests', ( req, res ) => {

    const { empID, colunms, approvalLimit } = req.body;

    let q = "SELECT  \
    employees.name, \
    emp_app_profile.emp_image, \
    invtry_purchase_requests.*, \
    locations.location_name,                              \
    companies.company_name       \
    FROM employees  \
    LEFT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id  \
    LEFT OUTER JOIN invtry_purchase_requests ON employees.emp_id = invtry_purchase_requests.request_by  \
    RIGHT OUTER JOIN locations ON invtry_purchase_requests.location_code = locations.location_code                              \
    RIGHT OUTER JOIN companies ON invtry_purchase_requests.company_code = companies.company_code ";

    if ( colunms )
    {
        let acc = colunms.split(',');
        
        q = q.concat(' WHERE ', "invtry_purchase_requests.status LIKE '%" + acc[0] + "%'");
        for ( let x = 0; x < acc.length; x++ )
        {
            q = q.concat(" OR ", "invtry_purchase_requests.status LIKE '%" + acc[x] + "%'");
        }
    }

    if ( approvalLimit === '>150000' )
    {
        q = q.concat(" AND invtry_purchase_requests.total < 150000 ");
        q = q.concat(" AND invtry_purchase_requests.request_by = " + empID + " ORDER BY invtry_purchase_requests.pr_id DESC");
    }else
    {
        if ( q.indexOf('WHERE') !== -1 )
        {
            q = q.concat(" AND invtry_purchase_requests.request_by = " + empID + " ORDER BY invtry_purchase_requests.pr_id DESC");
        }else
        {
            q = q.concat("WHERE invtry_purchase_requests.request_by = " + empID + " ORDER BY invtry_purchase_requests.pr_id DESC");
        }
    }

    db.query(
        q,
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {

                // let arr = [];
                // if ( rslt[0] )
                // {
                //     for ( let x= 0; x < rslt.length; x++ )
                //     {

                //         if ( rslt[x].request_for === parseInt( empID ) )
                //         {
                //             arr.push( rslt[x] );
                //         }
                    
                //     }
                // }
                res.send( rslt );
                res.end();

            }

        }
    );

} );

router.post('/getrequestspecifications', ( req, res ) => {

    const { prID } = req.body;

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
                    invtry_purchase_request_specifications.id, \
                    invtry_purchase_request_specifications.pr_id, \
                    invtry_purchase_request_specifications.description, \
                    invtry_purchase_request_specifications.reason, \
                    invtry_purchase_request_specifications.price, \
                    invtry_purchase_request_specifications.quantity, \
                    invtry_purchase_request_specifications.amount \
                    FROM invtry_purchase_requests \
                    LEFT OUTER JOIN invtry_purchase_request_specifications ON invtry_purchase_requests.pr_id = 	invtry_purchase_request_specifications.pr_id  \
                    WHERE invtry_purchase_requests.pr_id = " + prID,
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

router.post('/getrequestquotations', ( req, res ) => {

const { prID } = req.body;

db.getConnection(
    ( err, connection ) => {

        if ( err )
        {

            
            res.send([]);

        }else
        {
            connection.query(
                "SELECT DISTINCT \
                invtry_purchase_request_quotations.quotation_id, \
                invtry_purchase_request_quotations.pr_id, \
                invtry_purchase_request_quotations.image, \
                invtry_purchase_request_quotations.image_type \
                FROM invtry_purchase_requests \
                RIGHT OUTER JOIN invtry_purchase_request_quotations ON invtry_purchase_requests.pr_id = 	invtry_purchase_request_quotations.pr_id  \
                WHERE invtry_purchase_requests.pr_id = " + prID,
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

router.post('/setprtofinal', ( req, res ) => {

    const { Items, deletedItems, prID, Total, TaxMode, Tax, TaxAmount, NetTotal } = req.body;
    
    let q = "UPDATE invtry_purchase_requests SET total = '" + Total + "', tax_mode = '" + TaxMode + "', tax_per = '" + Tax + "', tax_amt = '" + TaxAmount + "', net_amt = '" + NetTotal + "' WHERE pr_id = " + prID + ";";
    let items = JSON.parse( Items );
    let deleteItems = JSON.parse( deletedItems );
    
    for ( let x = 0; x < items.length; x++ )
    {
        if ( items[x].id )
        {
            q = q.concat('UPDATE invtry_purchase_request_specifications SET ');
            q = q.concat( Object.keys(items[0])[0] + " = " + Object.entries(items[0])[0][1] );
            for ( let y = 0; y < Object.keys(items[x]).length; y++ )
            {
                if ( Object.keys(items[x])[y] !== 'taxRequired' )
                {
                    q = q.concat(' ,', Object.keys(items[x])[y] + " = '" + Object.entries(items[x])[y][1] + "'" );
                }
            }

            q = q.concat(' WHERE invtry_purchase_request_specifications.id = ' + items[x].id);
            q = q.concat(' AND invtry_purchase_request_specifications.pr_id = ' + items[x].pr_id);
            q = q.concat(';');
        }else
        {
            q = q.concat("INSERT INTO `invtry_purchase_request_specifications`(`pr_id`, `description`, `reason`, `price`, `quantity`, `tax`, `amount`, `tax_amount`) VALUES ('" + prID + "','" + items[x].description + "','" + items[x].reason + "','" + items[x].price + "','" + items[x].quantity + "', '" + items[x].tax + "','" + items[x].amount + "','" + items[x].tax_amount + "')");
            q = q.concat(";");
        }
    }

    for ( let x = 0; x < deleteItems.length; x++ )
    {

        q = q.concat('DELETE FROM invtry_purchase_request_specifications WHERE invtry_purchase_request_specifications.id = ' + deleteItems[x].id);
        q = q.concat(";");
    }

    db.query(
        q,
        ( err ) => {

            if( err )
            {

                res.send( err );
                res.end();

            }else 
            {

                res.send('success');
                res.end();

            }

        }
    );

} );

router.post('/setprtoviewed', ( req, res ) => {

    const { prID, empID } = req.body;
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
                    "UPDATE invtry_purchase_requests SET status = 'Viewed', handle_by = ?, view_date = ?, view_time = ? WHERE pr_id = ? AND status = 'Sent'",
                    [ empID, d, d.toTimeString(), prID ],
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

router.post('/setprtowaitforapproval', ( req, res ) => {

    const { prID, empID } = req.body;
    const d = new Date();

    let day = moment(d).format('ddd');

    db.query(
        "UPDATE invtry_purchase_requests SET status = 'Waiting For Approval', forward_by = ?, forward_date = ?, forward_time = ? WHERE pr_id = ? AND status = 'Viewed'",
        [ empID, d, d.toTimeString(), prID ],
        ( err ) => {

            if( err )
            {

                res.send( err );
                res.end();

            }else 
            {
                
                // IF THERE ARE SOME FILES ATTACHED
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
                        let folderName = prID + "_" + day + " " + moment(d).format("Do MMM YYYY") + ' at ' + d.getHours() + d.getMinutes() + d.getSeconds();
                        db.query(
                            "INSERT INTO invtry_purchase_request_quotations (pr_id, image, image_type) VALUES (?,?,?)",
                            [ prID, folderName + '/' + arr[x].name, arr[x].mimetype.split('/')[1] ],
                            ( err ) => {
                    
                                if( err )
                                {
                    
                                    console.log( err );
                                    res.send( err );
                                    res.end();
                    
                                }else 
                                {
                    
                                    fs.mkdir('client/public/images/Inventory/pr_attachments/' + folderName,
                                        { recursive: true },
                                        (err) => {
                                            if (err) {

                                                console.log( err );
                                                res.send(err);
                                                res.end();

                                            }
                                            else {

                                                arr[x].mv('client/public/images/Inventory/pr_attachments/' + folderName + '/' + arr[x].name, 
                                                    (err) => {

                                                        if (err) {

                                                            console.log( err );
                                                            res.send(err);
                                                            res.end();

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
                }else
                {
                    res.send( 'success' );
                    connection.release();
                }

            }

        }
    );

} );

router.post('/setprtodiscard', ( req, res ) => {

    const { prID, empID, remarks } = req.body;
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
                    "UPDATE invtry_purchase_requests SET status = 'Rejected', discard_by = ?, discard_date = ?, discard_time = ?, remarks = ? WHERE pr_id = ?",
                    [ empID, d, d.toTimeString(), remarks, prID ],
                    ( err, rslt ) => {
            
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

router.post('/setprtoapprove', ( req, res ) => {

    const { prID, empID, remarks } = req.body;
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
                    "UPDATE invtry_purchase_requests SET status = 'Approved', approve_by = ?, approve_date = ?, approve_time = ?, remarks = ? WHERE pr_id = ? AND status = 'Waiting For Approval'",
                    [ empID, d, d.toTimeString(), remarks, prID ],
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

router.post('/setprtodeliver', ( req, res ) => {

    const { prID, remarks } = req.body;
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
                    "UPDATE invtry_purchase_requests SET status = 'Delivered', delivery_date = ?, delivery_time = ?, emp_remarks = ? WHERE pr_id = ? AND status = 'Approved'",
                    [ d, d.toTimeString(), remarks, prID ],
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

router.post('/prdiscussion', ( req, res ) => {

    const { pr_id, emp_id, body, reply, date } = req.body;

    const d = new Date( date );

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "INSERT INTO invtry_purchase_request_chat (pr_id, emp_id, body, reply_to, date, time) VALUES (?,?,?,?,?,?)",
                    [ pr_id, emp_id, body, reply, d, d.toTimeString() ],
                    ( err ) => {
            
                        if( err )
                        {
            
                            res.send( err );
                            connection.release();
            
                        }else 
                        {
            

                            res.send('success');
                            res.end();
                            connection.release();
            
                        }
            
                    }
                );
            }

        }
    );

} );

router.post('/getprdiscussion', ( req, res ) => {

    const { pr_id } = req.body;

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {
                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "SELECT employees.emp_id,      \
                    employees.name,          \
                    locations.location_name,                              \
                    companies.company_name,                              \
                    departments.department_name,                              \
                    designations.designation_name,                              \
                    emp_app_profile.emp_image,                              \
                    invtry_purchase_request_chat.*                               \
                    FROM employees                            \
                    LEFT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id                              \
                    LEFT OUTER JOIN locations ON employees.location_code = locations.location_code                              \
                    LEFT OUTER JOIN companies ON employees.company_code = companies.company_code                              \
                    LEFT OUTER JOIN departments ON employees.department_code = departments.department_code                              \
                    LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code                              \
                    RIGHT OUTER JOIN invtry_purchase_request_chat ON employees.emp_id = invtry_purchase_request_chat.emp_id                              \
                    WHERE invtry_purchase_request_chat.pr_id = ? AND invtry_purchase_request_chat.reply_to = 0 ORDER BY invtry_purchase_request_chat.chat_id ASC",
                    [ pr_id ],
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

router.post('/getsubdiscussions', ( req, res ) => {

    const { chat_id } = req.body;

    db.getConnection(
        ( err, connection ) => {

            if ( err )
            {

                res.status(503).send(err);
                res.end();

            }else
            {
                connection.query(
                    "SELECT employees.emp_id,      \
                    employees.name,          \
                    locations.location_name,                              \
                    companies.company_name,                              \
                    departments.department_name,                              \
                    designations.designation_name,                              \
                    emp_app_profile.emp_image,                              \
                    invtry_purchase_request_chat.*                               \
                    FROM employees                            \
                    LEFT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id                              \
                    LEFT OUTER JOIN locations ON employees.location_code = locations.location_code                              \
                    LEFT OUTER JOIN companies ON employees.company_code = companies.company_code                              \
                    LEFT OUTER JOIN departments ON employees.department_code = departments.department_code                              \
                    LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code                              \
                    RIGHT OUTER JOIN invtry_purchase_request_chat ON employees.emp_id = invtry_purchase_request_chat.emp_id                              \
                    WHERE invtry_purchase_request_chat.reply_to = ? ORDER BY invtry_purchase_request_chat.chat_id ASC",
                    [ chat_id ],
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

router.post('/getprcode', ( req, res ) => {

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
                    "SELECT pr_code FROM invtry_purchase_requests WHERE company_code = ? ORDER BY pr_id DESC LIMIT 1",
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

router.post('/generatepronitemrequest', ( req, res ) => {

    const { request, specifications, itemRequest, logs, itemsDetails } = req.body;

    let requestData = JSON.parse( request );
    let specificationsData = JSON.parse( specifications );
    let details = JSON.parse( itemRequest );
    let requestLogs = JSON.parse( logs );
    let itemsSpecificationsDetials = JSON.parse( itemsDetails );
    const d = new Date();
    const total = 0.00;

    for ( let i = 0; i < requestLogs.length; i++ )
    {
        CreateLogs( 
            'tbl_item_requests', 
            details.id,
            requestLogs[i],
            'info'
        );
    }

    db.query(
        "SELECT code FROM companies WHERE company_code = ?",
        [ requestData.company_code ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {

                let code = '';
                if ( rslt.length > 0 )
                {
                    code = rslt[0].code;
                }
                db.query(
                    "SELECT pr_code FROM invtry_purchase_requests WHERE company_code = ? ORDER BY pr_id DESC LIMIT 1",
                    [ requestData.company_code ],
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            res.send( err );
            
                        }else 
                        {

                            let lastPR = '';
                            if ( rslt.length > 0 )
                            {
                                let getCode = (parseInt(rslt[0].pr_code.split('-')[1]) + 1).toString();
                                if (getCode.length === 1) {
                                    getCode = '0' + getCode;
                                }
                                lastPR = getCode;
                            }else
                            {
                                lastPR = '01';
                            }

                            let Year = '';
                            if ( d.getMonth() > 6 )
                            {
                                Year = d.getFullYear().toString().substring(2,4) + '/' + ( d.getFullYear() + 1 ).toString().substring(2,4);
                            }else
                            {
                                Year = ( d.getFullYear() - 1 ).toString().substring(2,4) + '/' + d.getFullYear().toString().substring(2,4);
                            }
                            
                            db.query(
                                "INSERT INTO `invtry_purchase_requests`(`pr_code`, `item_request_id`, `location_code`, `company_code`, `request_by`, `request_for`, `request_date`, `request_time`, `status`, `total`) VALUES (?,?,?,?,?,?,?,?,?,?)",
                                [ code + '-' + lastPR + '-' + Year, details.id, requestData.location_code, requestData.company_code, requestData.request_by, details.request_by, d, d.toTimeString(), 'Sent', total ],
                                ( err ) => {
                                    
                                    if( err )
                                    {
                        
                                        console.log( err );
                                        res.send( err );
                        
                                    }else 
                                    {
            
                                        db.query(
                                            "SELECT pr_id FROM invtry_purchase_requests WHERE pr_code = ?",
                                            [ code + '-' + lastPR + '-' + Year ],
                                            ( err, rslt ) => {
                                                
                                                if( err )
                                                {
                                                    
                                                    console.log( err );
                                                    res.send( err );
                                                    
                                                }else 
                                                {
                                                    
                                                    db.query(
                                                        "DELETE FROM `tbl_item_requests_specifications` WHERE request_id = ?;" +
                                                        "UPDATE `tbl_item_requests` SET company_code = ?, location_code = ? WHERE id = ?;",
                                                        [ details.id, requestData.company_code, requestData.location_code, details.id ],
                                                        ( err ) => {

                                                            if( err )
                                                            {

                                                                console.log( err );
                                                                res.status(500).send(err);
                                                                res.end();

                                                            }else 
                                                            {
                                                                
                                                                for ( let x = 0; x < specificationsData.length; x++ )
                                                                {
                                                                    let availability = 0;
                                                                    if ( itemsSpecificationsDetials[x] )
                                                                    {
                                                                        if ( parseInt( itemsSpecificationsDetials[x].availble_quantity ) > parseInt( specificationsData[x].required_quantity ) )
                                                                        {
                                                                            availability = 1;
                                                                        }
                                                                    }
                                                                    db.query(
                                                                        "INSERT INTO `tbl_item_requests_specifications`(`request_id`, `item_id`, `reason`, `required_quantity`, edited, new_added, availability) VALUES (?,?,?,?,?,?,?);",
                                                                        [ details.id, specificationsData[x].item_id ? specificationsData[x].item_id : specificationsData[x].id, specificationsData[x].reason, specificationsData[x].required_quantity, specificationsData[x].edited ? 1 : 0, specificationsData[x].new_added ? 1 : 0, availability ],
                                                                        ( err ) => {
                                                                
                                                                            if( err )
                                                                            {
                                                                
                                                                                console.log( err );
                                                                                res.status(500).send(err);
                                                                                res.end();
                                                                
                                                                            }
                                                                
                                                                        }
                                                                    )
                                                                }

                                                            }

                                                        }
                                                    )
                                                    for( let x = 0; x < specificationsData.length; x++ )
                                                    {
                                                        db.query(
                                                            "INSERT INTO `invtry_purchase_request_specifications`(`pr_id`, `description`, `reason`, `price`, `quantity`, `tax`, `amount`) VALUES (?,?,?,?,?,?,?)",
                                                            [ rslt[0].pr_id, specificationsData[x].item_name, specificationsData[x].reason, 0, parseInt(specificationsData[x].required_quantity), 0, 0 ],
                                                            ( err ) => {
                                                    
                                                                if( err )
                                                                {
                                                    
                                                                    console.log( err );
                                                                    res.send( err );
                                                    
                                                                }
                                                    
                                                            }
                                                        );
            
                                                        if ( ( x + 1 ) === specificationsData.length )
                                                        {
                                                            db.query(
                                                                "UPDATE tbl_item_requests SET status = 'proceed to purchase requisition', pr_request_generate_date = ?, pr_request_generate_time = ?, pr_request_generate_by = ? WHERE id = ?",
                                                                [ new Date(), new Date().toTimeString(), requestData.request_by, details.id ],
                                                                ( err ) => {
                                                        
                                                                    if( err )
                                                                    {
                                                        
                                                                        console.log( err );
                                                                        res.send( err );
                                                        
                                                                    }else
                                                                    {
                                                                        CreateLogs( 
                                                                            'tbl_item_requests', 
                                                                            details.id,
                                                                            "Request has proceed to purchase requisition",
                                                                            'info'
                                                                        );
                                                                        console.log("**************************************SUCCESS**************************************");
                                                                        res.send( rslt );
                                                                    }
                                                        
                                                                }
                                                            );
        
                                                        }
                                                    }
                                    
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
    )

} );

module.exports = router;