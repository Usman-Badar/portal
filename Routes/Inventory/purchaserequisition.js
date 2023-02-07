const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const fs = require('fs');
const MakeDir = require('fs');
const moment = require('moment');
const io = require('../../server');

const CreateLogs = require('../Employee/logs').CreateLog;
const SendWhatsappNotification = require('../Whatsapp/whatsapp').SendWhatsappNotification;

io.on('connection', ( socket ) => {

    socket.on(
        'new_purchase_requisition_found', () => {
            
            socket.broadcast.emit('new_purchase_requisition_found');
    
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

router.post('/purchase/requisition/submittion&&submit_by=employee', ( req, res ) => {

    const { specifications, data, note, requested_by } = req.body;

    const code = new Date().getTime() + '_' + new Date().getDate() + (new Date().getMonth() + 1) + new Date().getFullYear();
    const received_specifications = JSON.parse( specifications );
    let arr_spacifications_names = []; 
    const received_data = JSON.parse( data );
    let quotations_attached = 0;
    const submitted_to = 20015;
    if ( req.files )
    {
        const { Attachments } = req.files;
        let arr;
        if ( typeof(Attachments) === 'object' && !Attachments.length )
        {
            arr = [Attachments];
        }else
        {
            arr = Attachments;
        }
        quotations_attached = arr.length;
    }

    db.query(
        "INSERT INTO `tbl_inventory_purchase_requisition`(`entry`,`note`, `company_code`, `location_code`, `new_purchase`, `repair_replacement`, `budgeted`, `not_budgeted`, `invoice_attached`, `reason`, `requested_by`, `requested_date`, `requested_time`, `total_value`, `no_items_requested`, `submitted_to`, `quotations_attached`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
        [ code, note, received_data.company_code, received_data.location_code, received_data.new_purchase_checkbox ? 1 :0, received_data.repair_replacement_checkbox ? 1 :0, received_data.budgeted_checkbox ? 1 :0, received_data.not_budgeted_checkbox ? 1 :0, received_data.invoice_attached_checkbox ? 1 :0, received_data.reason, requested_by, new Date(), new Date().toTimeString(), received_data.total_calculated_amount, received_specifications.length, submitted_to, quotations_attached ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                const mPrId = rslt.insertId;
                for ( let x = 0; x < received_specifications.length; x++ )
                {
                    arr_spacifications_names.push(received_specifications[x].specification_description);
                    db.query(
                        "INSERT INTO `tbl_inventory_purchase_requisition_specifications`(`pr_id`, `sr_no`, `description`, `quantity`, `estimated_cost`, `total_estimated_cost`, `entered_by`, `entered_date`) VALUES (?,?,?,?,?,?,?,?);",
                        [ mPrId, received_specifications[x].specification_serial_number, received_specifications[x].specification_description, received_specifications[x].specification_quantity, received_specifications[x].specification_est_cost, received_specifications[x].specification_total_cost, requested_by, new Date() ],
                        ( err ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                                res.send( err );
                                res.end();
                
                            }
                
                        }
                    );
                }

                db.query(
                    "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                    "SELECT name, cell FROM employees WHERE emp_id = ?;",
                    [ requested_by, submitted_to ],
                    ( err, rslt ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            res.send( err );
                            res.end();
            
                        }else
                        {
                            SendWhatsappNotification( null, null, "Hi " + rslt[1][0].name, rslt[0][0].name + " have sent you a purchase requisition for " + arr_spacifications_names.join(', ') + ". The total value of the requisition is Rs " + received_data.total_calculated_amount.toLocaleString('en') + ". Kindly check", rslt[1][0].cell );
                            SendWhatsappNotification( null, null, "Hi " + rslt[0][0].name, "We have received your purchase requisition. Kindly wait while our inventory department starts working on it", rslt[0][0].cell );
                        }
            
                    }
                );

                if ( req.files )
                {
                    const { Attachments } = req.files;
                    let arr;
                    if ( typeof(Attachments) === 'object' && !Attachments.length )
                    {
                        arr = [Attachments];
                    }else
                    {
                        arr = Attachments;
                    }
                    for ( let y = 0; y < arr.length; y++ )
                    {
                        MakeDir.mkdir('assets/inventory/assets/images/quotations',
                            { recursive: true },
                            (err) => {
                                if (err) {
    
                                    console.log( err );
                                    res.status(500).send(err);
                                    res.end();
                                    
                                }
                                else {
                                    
                                    let name = new Date().getTime() + "_" + arr[y].name;
                                    arr[y].mv('assets/inventory/assets/images/quotations/' + name, (err) => {
                                            if (err) 
                                            {
                                            
                                                console.log( err );
                                                res.status(500).send(err);
                                                res.end();
                    
                                            }else
                                            {
                                                db.query(
                                                    "INSERT INTO `tbl_inventory_purchase_requisition_quotations`(`quotation`, `uploaded_by`, `uploaded_date`, `uploaded_time`, `pr_id`) VALUES (?,?,?,?,?);",
                                                    [ 'assets/inventory/assets/images/quotations/' + name, requested_by, new Date(), new Date().toTimeString(), mPrId ],
                                                    ( err ) => {
                                            
                                                        if( err )
                                                        {
                                            
                                                            console.log( err );
                                                            res.send( err );
                                                            res.end();
                                            
                                                        }
                                            
                                                    }
                                                );
                                            }
                                        }
                                    )
                                    
                                }
                            }
                        )

                        if ( (y+1) === arr.length )
                        {
                            res.send("success");
                            res.end();
                        }
                    }
                }else
                {
                    res.send("success");
                    res.end();
                }

            }

        }
    );

} );

router.post('/purchase/requisition/load/requests', ( req, res ) => {

    const { emp_id } = req.body;

    db.query(
        "SELECT tbl_inventory_purchase_requisition.status,  \
        tbl_inventory_purchase_requisition.no_items_requested,  \
        tbl_inventory_purchase_requisition.total_value,  \
        tbl_inventory_purchase_requisition.requested_date,  \
        tbl_inventory_purchase_requisition.requested_time,  \
        tbl_inventory_purchase_requisition.pr_id,  \
        tbl_inventory_purchase_requisition.appr_rejct_by,  \
        requested_employee.name AS requested_employee_name,  \
        requested_employee_designations.designation_name AS requested_employee_designation_name,  \
        companies.company_name, \
        locations.location_name \
        FROM `tbl_inventory_purchase_requisition`  \
        LEFT OUTER JOIN companies ON tbl_inventory_purchase_requisition.company_code = companies.company_code \
        LEFT OUTER JOIN locations ON tbl_inventory_purchase_requisition.location_code = locations.location_code \
        LEFT OUTER JOIN employees requested_employee ON tbl_inventory_purchase_requisition.requested_by = requested_employee.emp_id \
        LEFT OUTER JOIN designations requested_employee_designations ON requested_employee.designation_code = requested_employee_designations.designation_code \
        WHERE requested_by = ? OR request_submitted_on_behalf = ? OR submitted_to = ? OR appr_rejct_by = ? ORDER BY pr_id DESC;",
        [ emp_id, emp_id, emp_id, emp_id ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                
                res.send(rslt);
                res.end();

            }

        }
    );

} );

router.get('/purchase/requisition/load/hod', ( req, res ) => {

    db.query(
        "SELECT emp_props.*, employees.name FROM emp_props LEFT OUTER JOIN employees ON emp_props.emp_id = employees.emp_id WHERE emp_props.pr_approval_limit != 0;",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                
                res.send(rslt);
                res.end();

            }

        }
    );

} );

router.post('/purchase/requisition/cancellation', ( req, res ) => {

    const { emp_id, reason, pr_id } = req.body;

    db.query(
        "UPDATE tbl_inventory_purchase_requisition SET status = ?, appr_rejct_by = ?, act_date = ?, act_time = ?, remarks = ? WHERE pr_id = ?;",
        [ 'canceled', emp_id, new Date(), new Date().toTimeString(), reason, pr_id ],
        ( err ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                
                db.query(
                    "SELECT name, cell FROM employees WHERE emp_id = ?;",
                    [ emp_id ],
                    ( err, result ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            res.send( err );
                            res.end();
            
                        }else
                        {
                            SendWhatsappNotification( null, null, "Hi " + result[0].name, "Your purchase requestion with PR NO # " + pr_id + " has been canceled, as it has/there was '" + reason + "'.", result[0].cell );
                            res.send('success');
                            res.end();
                        }
            
                    }
                );

            }

        }
    );

} );

router.post('/purchase/requisition/approval', ( req, res ) => {

    const { emp_id, reason, pr_id, requested_by, submitted_to } = req.body;

    db.query(
        "UPDATE tbl_inventory_purchase_requisition SET status = ?, appr_rejct_by = ?, act_date = ?, act_time = ?, remarks_from_hod = ? WHERE pr_id = ?;",
        [ 'approved', emp_id, new Date(), new Date().toTimeString(), reason, pr_id ],
        ( err ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                
                db.query(
                    "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                    "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                    "SELECT name, cell FROM employees WHERE emp_id = ?;",
                    [ emp_id, requested_by, submitted_to ],
                    ( err, result ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            res.send( err );
                            res.end();
            
                        }else
                        {
                            SendWhatsappNotification( null, null, "Hi " + result[0][0].name, "You have approved the purchase requestion with PR NO # " + pr_id + ", and the requested employee has been notified.", result[0][0].cell );
                            SendWhatsappNotification( null, null, "Hi " + result[1][0].name, "Your purchase requestion with PR NO # " + pr_id + " has been approved by the accounts department.", result[1][0].cell );
                            SendWhatsappNotification( null, null, "Hi " + result[2][0].name, "The purchase requestion with PR NO # " + pr_id + " has been approved by the accounts department. Kindly check and proceed to purchase order if necessary.", result[2][0].cell );
                            res.send('success');
                            res.end();
                        }
            
                    }
                );

            }

        }
    );

} );

router.post('/purchase/requisition/details', ( req, res ) => {

    const { pr_id, viewed } = req.body;

    db.query(
        ( viewed ? "UPDATE tbl_inventory_purchase_requisition SET status = 'viewed', view_date = ?, view_time = ? WHERE pr_id = ? AND status = 'sent';" : "SELECT ? AND ? AND ?;" ) +
        "SELECT tbl_inventory_purchase_requisition.*,  \
        companies.company_name, \
        behalf_employee.name AS behalf_employee_name, \
        submit_to_employee.name AS submit_to_employee_name, \
        hod_employee.name AS hod_employee_name, \
        requested_employee.name AS requested_employee_name, \
        requested_employee_designation.designation_name AS requested_employee_designation_name, \
        behalf_employee_designation.designation_name AS behalf_employee_designation_name, \
        submit_to_employee_designation.designation_name AS submit_to_employee_designation_name, \
        hod_employee_designation.designation_name AS hod_employee_designation_name, \
        locations.location_name \
        FROM `tbl_inventory_purchase_requisition`  \
        LEFT OUTER JOIN companies ON tbl_inventory_purchase_requisition.company_code = companies.company_code \
        LEFT OUTER JOIN locations ON tbl_inventory_purchase_requisition.location_code = locations.location_code \
        LEFT OUTER JOIN employees requested_employee ON tbl_inventory_purchase_requisition.requested_by = requested_employee.emp_id \
        LEFT OUTER JOIN employees behalf_employee ON tbl_inventory_purchase_requisition.request_submitted_on_behalf = behalf_employee.emp_id \
        LEFT OUTER JOIN employees submit_to_employee ON tbl_inventory_purchase_requisition.submitted_to = submit_to_employee.emp_id \
        LEFT OUTER JOIN employees hod_employee ON tbl_inventory_purchase_requisition.appr_rejct_by = hod_employee.emp_id \
        LEFT OUTER JOIN designations requested_employee_designation ON requested_employee.designation_code = requested_employee_designation.designation_code \
        LEFT OUTER JOIN designations behalf_employee_designation ON behalf_employee.designation_code = behalf_employee_designation.designation_code \
        LEFT OUTER JOIN designations submit_to_employee_designation ON submit_to_employee.designation_code = submit_to_employee_designation.designation_code \
        LEFT OUTER JOIN designations hod_employee_designation ON hod_employee.designation_code = hod_employee_designation.designation_code \
        WHERE pr_id = ?;" +
        "SELECT * FROM `tbl_inventory_purchase_requisition_specifications` WHERE pr_id = ?;" +
        "SELECT * FROM `tbl_inventory_purchase_requisition_quotations` WHERE pr_id = ?;",
        [ new Date(), new Date().toTimeString(), pr_id, pr_id, pr_id, pr_id ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err )
                res.send( err );
                res.end();

            }else 
            {

                if ( viewed && rslt[0].affectedRows != 0 )
                {
                    db.query(
                        "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                        "SELECT name, cell FROM employees WHERE emp_id = ?;",
                        [ rslt[1][0].request_submitted_on_behalf == null ? rslt[1][0].requested_by : rslt[1][0].request_submitted_on_behalf, rslt[1][0].submitted_to ],
                        ( err, result ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                                res.send( err );
                                res.end();
                
                            }else
                            {
                                SendWhatsappNotification( null, null, "Hi " + result[1][0].name, "The status of the purchase requisition with PR NO # " + rslt[1][0].pr_id + " has been updated from 'sent' to 'viewed'. The employee has been notified.", result[1][0].cell );
                                SendWhatsappNotification( null, null, "Hi " + result[0][0].name, "Our inventory department has viewed your purchase requisition with PR NO # " + rslt[1][0].pr_id + ". Kindly wait... while we are sending your application to our accounts department.", result[0][0].cell );
                            }
                
                        }
                    );
                }
                
                res.send(rslt);
                res.end();

            }

        }
    );

} );

router.post('/purchase/requisition/send_for_approval', ( req, res ) => {

    const { pr_id, requested_by, emp_id, remarks, submit_to, specifications } = req.body;
    let arr = [];
    for ( let x = 0; x < JSON.parse(specifications).length; x++ )
    {
        arr.push( JSON.parse(specifications)[x].description );
    }

    db.query(
        "UPDATE tbl_inventory_purchase_requisition SET status = 'waiting_for_approval', appr_rejct_by = ?, remarks = ? WHERE pr_id = ? AND status = 'viewed';",
        [ submit_to, remarks, pr_id ],
        ( err ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                
                db.query(
                    "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                    "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                    "SELECT name, cell FROM employees WHERE emp_id = ?;",
                    [ emp_id, requested_by, submit_to ],
                    ( err, result ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            res.send( err );
                            res.end();
            
                        }else
                        {
                            SendWhatsappNotification( null, null, "Hi " + result[0][0].name, "Purchase requisition with PR NO # " + pr_id + " has been sent to the accounts department for approval. Please wait... while the accounts department is reviewing your approval request.", result[0][0].cell );
                            SendWhatsappNotification( null, null, "Hi " + result[1][0].name, "Your Purchase Requisition with PR NO # " + pr_id + " has been proceed to the accounts department.", result[1][0].cell );
                            SendWhatsappNotification( null, null, "Hi " + result[2][0].name, "Inventory department has forward you a purchase requisition with PR NO # " + pr_id + " for item(s) " + arr.join(', ') + ", Kindly review.", result[2][0].cell );

                            res.send('success');
                            res.end();
                        }
            
                    }
                );

            }

        }
    );

} );

router.post('/purchase/requisition/request_from_inventory', ( req, res ) => {

    const { emp_id, note, request_in_behalf, submit_to, data, specifications } = req.body;
    let received_data = JSON.parse( data );
    let arr_spacifications_names = []; 
    let quotations_attached = 0;
    const code = new Date().getTime() + '_' + new Date().getDate() + (new Date().getMonth() + 1) + new Date().getFullYear();
    const received_specifications = JSON.parse( specifications );

    if ( req.files )
    {
        const { Attachments } = req.files;
        let arr;
        if ( typeof(Attachments) === 'object' && !Attachments.length )
        {
            arr = [Attachments];
        }else
        {
            arr = Attachments;
        }
        quotations_attached = arr.length;
    }

    const submitted_to = submit_to;

    db.query(
        "INSERT INTO `tbl_inventory_purchase_requisition`(`entry`,`note`, `company_code`, `location_code`, `new_purchase`, `repair_replacement`, `budgeted`, `not_budgeted`, `invoice_attached`, `reason`, `requested_by`, `requested_date`, `requested_time`, `total_value`, `no_items_requested`, `submitted_to`, `quotations_attached`, `request_submitted_on_behalf`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
        [ code, note, received_data.company_code, received_data.location_code, received_data.new_purchase_checkbox ? 1 :0, received_data.repair_replacement_checkbox ? 1 :0, received_data.budgeted_checkbox ? 1 :0, received_data.not_budgeted_checkbox ? 1 :0, received_data.invoice_attached_checkbox ? 1 :0, received_data.reason, emp_id, new Date(), new Date().toTimeString(), received_data.total_calculated_amount, received_specifications.length, submitted_to, quotations_attached, request_in_behalf == null || request_in_behalf == 'null' ? null : request_in_behalf ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                const mPrId = rslt.insertId;
                for ( let x = 0; x < received_specifications.length; x++ )
                {
                    arr_spacifications_names.push(received_specifications[x].specification_description);
                    db.query(
                        "INSERT INTO `tbl_inventory_purchase_requisition_specifications`(`pr_id`, `sr_no`, `description`, `quantity`, `estimated_cost`, `total_estimated_cost`, `entered_by`, `entered_date`) VALUES (?,?,?,?,?,?,?,?);",
                        [ mPrId, received_specifications[x].specification_serial_number, received_specifications[x].specification_description, received_specifications[x].specification_quantity, received_specifications[x].specification_est_cost, received_specifications[x].specification_total_cost, emp_id, new Date() ],
                        ( err ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                                res.send( err );
                                res.end();
                
                            }
                
                        }
                    );
                }
                db.query(
                    "UPDATE tbl_inventory_purchase_requisition SET status = 'waiting_for_approval', appr_rejct_by = ?, remarks = ?, view_date = ?, view_time = ? WHERE pr_id = ?;",
                    [ submit_to, note, new Date(), new Date().toTimeString(), mPrId ],
                    ( err ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            res.send( err );
                            res.end();
            
                        }else 
                        {
                            
                            db.query(
                                "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                                "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                                "SELECT name, cell FROM employees WHERE emp_id = ?;",
                                [ emp_id, request_in_behalf == null || request_in_behalf == 'null' ? emp_id : request_in_behalf, submit_to ],
                                ( err, result ) => {
                        
                                    if( err )
                                    {
                        
                                        console.log( err );
                                        res.send( err );
                                        res.end();
                        
                                    }else
                                    {

                                        console.log( result );
                                        SendWhatsappNotification( null, null, "Hi " + result[0][0].name, "Purchase requisition with PR NO # " + mPrId + " has been sent to the accounts department for approval. Please wait... while the accounts department is reviewing your approval request.", result[0][0].cell );
                                        if ( request_in_behalf != null || request_in_behalf != 'null' )
                                        {
                                            SendWhatsappNotification( null, null, "Hi " + result[1][0].name, "A Purchase Requisition with PR NO # " + mPrId + " has been generated by the inventory department in your behalf, for item(s) " + arr_spacifications_names.join(', ') + ". The request has been proceed to the accounts department.", result[1][0].cell );
                                        }
                                        SendWhatsappNotification( null, null, "Hi " + result[2][0].name, "Inventory department has forward you a purchase requisition with PR NO # " + mPrId + " for item(s) " + arr_spacifications_names.join(', ') + ", Kindly review.", result[2][0].cell );
            
                                        res.send('success');
                                        res.end();
                                    }
                        
                                }
                            );
            
                        }
            
                    }
                );

                if ( req.files )
                {
                    const { Attachments } = req.files;
                    let arr;
                    if ( typeof(Attachments) === 'object' && !Attachments.length )
                    {
                        arr = [Attachments];
                    }else
                    {
                        arr = Attachments;
                    }
                    for ( let y = 0; y < arr.length; y++ )
                    {
                        MakeDir.mkdir('assets/inventory/assets/images/quotations',
                            { recursive: true },
                            (err) => {
                                if (err) {
    
                                    console.log( err );
                                    res.status(500).send(err);
                                    res.end();
                                    
                                }
                                else {
                                    
                                    let name = new Date().getTime() + "_" + arr[y].name;
                                    arr[y].mv('assets/inventory/assets/images/quotations/' + name, (err) => {
                                            if (err) 
                                            {
                                            
                                                console.log( err );
                                                res.status(500).send(err);
                                                res.end();
                    
                                            }else
                                            {
                                                db.query(
                                                    "INSERT INTO `tbl_inventory_purchase_requisition_quotations`(`quotation`, `uploaded_by`, `uploaded_date`, `uploaded_time`, `pr_id`) VALUES (?,?,?,?,?);",
                                                    [ 'assets/inventory/assets/images/quotations/' + name, emp_id, new Date(), new Date().toTimeString(), mPrId ],
                                                    ( err ) => {
                                            
                                                        if( err )
                                                        {
                                            
                                                            console.log( err );
                                                            res.send( err );
                                                            res.end();
                                            
                                                        }
                                            
                                                    }
                                                );
                                            }
                                        }
                                    )
                                    
                                }
                            }
                        )

                        if ( (y+1) === arr.length )
                        {
                            res.send("success");
                            res.end();
                        }
                    }
                }else
                {
                    res.send("success");
                    res.end();
                }

            }

        }
    );

} );

router.post('/purchase/requisition/reject', ( req, res ) => {

    const { pr_id, requested_by, emp_id, remarks, specifications, department } = req.body;
    let arr = [];
    for ( let x = 0; x < JSON.parse(specifications).length; x++ )
    {
        arr.push( JSON.parse(specifications)[x].description );
    }

    db.query(
        "UPDATE tbl_inventory_purchase_requisition SET status = 'rejected', appr_rejct_by = ?, act_date = ?, act_time = ?, remarks = ? WHERE pr_id = ?;",
        [ emp_id, new Date(), new Date().toTimeString(), remarks, pr_id ],
        ( err ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                
                db.query(
                    "SELECT name, cell FROM employees WHERE emp_id = ?;" + 
                    "SELECT name, cell FROM employees WHERE emp_id = ?;",
                    [ emp_id, requested_by ],
                    ( err, result ) => {
            
                        if( err )
                        {
            
                            console.log( err );
                            res.send( err );
                            res.end();
            
                        }else
                        {
                            SendWhatsappNotification( null, null, "Hi " + result[0][0].name, "You have rejected the purchase requisition with PR NO # " + pr_id + " with reason '" + remarks + "'. The requested employee has been notified.", result[0][0].cell );
                            SendWhatsappNotification( null, null, "Hi " + result[1][0].name, "Your Purchase Requisition with PR NO # " + pr_id + " has been rejected by the "  + ( department ? department : "inventory" ) + " department with remarks '" + remarks + "'. If you have any question, kindly contact our " + ( department ? department : "inventory" ) + " department, headoffice.", result[1][0].cell );

                            res.send('success');
                            res.end();
                        }
            
                    }
                );

            }

        }
    );

} );

router.post('/inventory/pusrchase/requisition/search/employees', ( req, res ) => {

    const { key } = req.body;

    db.query(
        "SELECT employees.emp_id, employees.name, designations.designation_name, emp_app_profile.emp_image FROM employees LEFT OUTER JOIN designations ON employees.designation_code = designations.designation_code LEFT OUTER JOIN emp_app_profile ON employees.emp_id = emp_app_profile.emp_id WHERE employees.name LIKE '%" + key + "%' ORDER BY employees.name ASC;",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );
                res.send( err );
                res.end();

            }else 
            {
                
                res.send(rslt);
                res.end();

            }

        }
    );

} );

module.exports = router;