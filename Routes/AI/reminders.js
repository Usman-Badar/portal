const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
let key = 'real secret keys should be long and random';
const encryptor = require('simple-encryptor')(key);

const SendWhatsappNotification = require('../Whatsapp/whatsapp').SendWhatsappNotification;

function reminder_on_absent_for_leave()
{
    var prev_date = new Date();
    prev_date.setDate(prev_date.getDate() - 1);

    db.query(
        "SELECT \
        emp_attendance.*, \
        `employees`.`cell`, \
        `employees`.`name` \
        `emp_props`.`whatsapp_notifications` \
        FROM emp_attendance \
        LEFT OUTER JOIN employees ON emp_attendance.emp_id = employees.emp_id \
        LEFT OUTER JOIN emp_props ON employees.emp_id = emp_props.emp_id \
        WHERE emp_attendance.status = 'Absent' \
        AND emp_attendance.emp_date = ?;",
        [ prev_date.getFullYear() + '-' + parseInt(prev_date.getMonth() + 1) + '-' + prev_date.getDate() ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else 
            {
                
                let phrases = [ 
                    "We discovered you were *absent* yesterday. Kindly send a leave request now on the portal, just log in to your account at http://202.63.220.170:3443" ,
                    "We found you were *absent* yesterday. Kindly send a leave request now on the portal, just log in to your account at http://202.63.220.170:3443",
                    "We discovered you were *absent* yesterday. Please send a leave request now on the portal by logging in to your account at http://202.63.220.170:3443.",
                    "We discovered you were *absent* the day before. Please send a leave request now on the portal by logging in to your account at http://202.63.220.170:3443.",
                    "You were *absent* yesterday, we discovered. Please send a leave request now on the portal by logging in to your account at http://202.63.220.170:3443."
                ]
                for ( let x = 0; x < rslt.length; x++ )
                {
                    SendWhatsappNotification( null, null, "Hi " + rslt[x].name, phrases[Math.floor(Math.random() * phrases.length)], rslt[x].cell );
                }

            }

        }
    )
}

function reminder_on_absent_more_than_1_day()
{
    var prev_date = new Date();
    prev_date.setDate(prev_date.getDate() - 1);
    
    var prev_date2 = new Date();
    prev_date2.setDate(prev_date2.getDate() - 4);

    db.query(
        "SELECT \
        emp_attendance.*, \
        `employees`.`cell`, \
        `employees`.`name` \
        FROM emp_attendance \
        LEFT OUTER JOIN employees ON emp_attendance.emp_id = employees.emp_id \
        WHERE emp_attendance.status = 'Absent' \
        AND emp_attendance.emp_date BETWEEN ? AND ?;",
        [
            prev_date2.getFullYear() + '-' + parseInt(prev_date2.getMonth() + 1) + '-' + prev_date2.getDate(),
            prev_date.getFullYear() + '-' + parseInt(prev_date.getMonth() + 1) + '-' + prev_date.getDate()
        ],
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else 
            {

                let arr_for_1_day = [];
                let arr_for_2_days = [];
                let arr_for_3_days = [];
                let arr_for_4_days = [];
                for ( let x = 0; x < rslt.length; x++ )
                {
                    if ( arr_for_1_day.includes(rslt[x].emp_id) )
                    {
                        if ( arr_for_2_days.includes(rslt[x].emp_id) )
                        {
                            if ( arr_for_3_days.includes(rslt[x].emp_id) )
                            {
                                arr_for_4_days.push(rslt[x].emp_id)
                            }else
                            {
                                arr_for_3_days.push(rslt[x].emp_id)
                            }
                        }else
                        {
                            arr_for_2_days.push(rslt[x].emp_id)
                        }
                    }else
                    {
                        arr_for_1_day.push(rslt[x].emp_id)
                    }
                }
                mark_2_days( arr_for_2_days );
                mark_3_days( arr_for_2_days, arr_for_3_days );
                mark_4_days( arr_for_2_days, arr_for_3_days, arr_for_4_days );

            }

        }
    )

    function mark_2_days( arr_for_2_days )
    {
        for ( let a = 0; a < arr_for_2_days.length; a++ )
        {
            db.query(
                "SELECT \
                `employees`.`cell`, \
                `employees`.`name` \
                FROM employees \
                WHERE employees.emp_id = ?;",
                [ arr_for_2_days[a] ],
                ( err, rslt_for_2_days ) => {
        
                    if( err )
                    {
        
                        console.log( err );
        
                    }else 
                    {
                        let phrases_for_2_day = [ 
                            "We found you are continuous *absent* for 2 days, kindly apply for a leave request on the portal at http://202.63.220.170:3443." ,
                            "We discovered you have been continuously *absent* for two days; please submit a leave request via the portal at http://202.63.220.170:3443.",
                            "We found you are continuous *absent* for 2 days, kindly apply for a leave request on the portal at http://202.63.220.170:3443",
                            "We discovered you have been continuously *absent* for two days; please apply for a leave request via the portal at http://202.63.220.170:3443.",
                            "We discovered you have been continuously *absent* for two days; please submit a leave request via the portal at http://202.63.220.170:3443."
                        ];
                        for ( let ax = 0; ax < rslt_for_2_days.length; ax++ )
                        {
                            SendWhatsappNotification( null, null, "Hi " + rslt_for_2_days[ax].name, phrases_for_2_day[Math.floor(Math.random() * phrases_for_2_day.length)], rslt_for_2_days[ax].cell );
                        }

                    }
        
                }
            )
        }
    }
    function mark_3_days( arr_for_2_days, arr_for_3_days )
    {
        for ( let a = 0; a < arr_for_2_days.length; a++ )
        {
            db.query(
                "SELECT \
                `employees`.`cell`, \
                `employees`.`name` \
                FROM employees \
                WHERE employees.emp_id = ?;",
                [ arr_for_2_days[a] ],
                ( err, rslt_for_2_days ) => {
        
                    if( err )
                    {
        
                        console.log( err );
        
                    }else 
                    {
                        for ( let ax = 0; ax < rslt_for_2_days.length; ax++ )
                        {
                            for ( let b = 0; b < arr_for_3_days.length; b++ )
                            {
                                db.query(
                                    "SELECT  \
                                    `employees`.`cell`,  \
                                    `employees`.`name`  \
                                    FROM employees  \
                                    LEFT OUTER JOIN tbl_er ON employees.emp_id = tbl_er.sr \
                                    WHERE tbl_er.jr = ? AND tbl_er.priority = 1;",
                                    [ arr_for_3_days[b] ],
                                    ( err, rslt_for_3_days ) => {
                            
                                        if( err )
                                        {
                            
                                            console.log( err );
                            
                                        }else 
                                        {
                                            for ( let ay = 0; ay < rslt_for_3_days.length; ay++ )
                                            {
                                                let phrases_for_3_day = [ 
                                                    `We found that ${ rslt_for_2_days[ax].name } is *absent* for two days, kindly find out why he/she is *absent* without giving any notification.` ,
                                                    `We discovered that ${ rslt_for_2_days[ax].name } has been *absent* for two days; please investigate why he/she has been *absent* without notification.`,
                                                    `We found that ${ rslt_for_2_days[ax].name } is *absent* for two days, kindly find out why he/she is *absent* without giving any notification.`,
                                                    `We discovered that ${ rslt_for_2_days[ax].name } has been missing for two days; please investigate why he/she has been *absent* without notification.`,
                                                    `We found that ${ rslt_for_2_days[ax].name } is *absent* for two days, kindly find out why he/she is *absent* without giving any notification`
                                                ];
                                                SendWhatsappNotification( null, null, "Hi " + rslt_for_3_days[ay].name, phrases_for_3_day[Math.floor(Math.random() * phrases_for_3_day.length)], rslt_for_3_days[ay].cell );
                                                
                                            }

                                        }
                            
                                    }
                                )
                            }
                        }

                    }
        
                }
            )
        }
    }
    function mark_4_days( arr_for_2_days, arr_for_3_days, arr_for_4_days )
    {
        for ( let a = 0; a < arr_for_2_days.length; a++ )
        {
            db.query(
                "SELECT \
                `employees`.`cell`, \
                `employees`.`name` \
                FROM employees \
                WHERE employees.emp_id = ?;",
                [ arr_for_2_days[a] ],
                ( err, rslt_for_2_days ) => {
        
                    if( err )
                    {
        
                        console.log( err );
        
                    }else 
                    {
                        for ( let ax = 0; ax < rslt_for_2_days.length; ax++ )
                        {
                            for ( let b = 0; b < arr_for_3_days.length; b++ )
                            {
                                db.query(
                                    "SELECT  \
                                    `employees`.`cell`,  \
                                    `employees`.`name`  \
                                    FROM employees  \
                                    LEFT OUTER JOIN tbl_er ON employees.emp_id = tbl_er.sr \
                                    WHERE tbl_er.jr = ? AND tbl_er.priority = 1;",
                                    [ arr_for_3_days[b] ],
                                    ( err, rslt_for_3_days ) => {
                            
                                        if( err )
                                        {
                            
                                            console.log( err );
                            
                                        }else 
                                        {
                                            for ( let ay = 0; ay < rslt_for_3_days.length; ay++ )
                                            {
                                                for ( let c = 0; c < arr_for_4_days.length; c++ )
                                                    {
                                                        db.query(
                                                            "SELECT  \
                                                            `employees`.`cell`,  \
                                                            `employees`.`name`  \
                                                            FROM employees  \
                                                            LEFT OUTER JOIN tbl_er ON employees.emp_id = tbl_er.sr \
                                                            WHERE tbl_er.jr = ? AND tbl_er.priority = 2;",
                                                            [ arr_for_4_days[c] ],
                                                            ( err, rslt_for_4_days ) => {
                                                    
                                                                if( err )
                                                                {
                                                    
                                                                    console.log( err );
                                                    
                                                                }else 
                                                                {
                                                                    for ( let az = 0; az < rslt_for_4_days.length; az++ )
                                                                    {
                                                                        let phrases_for_4_day = [ 
                                                                            `We found that ${ rslt_for_2_days[ax].name } is absent for three days, Also ${ rslt_for_3_days[ay].name } was notified by the system yesterday, kindly find out why he is absent without giving any notification.` ,
                                                                            `We discovered that ${ rslt_for_2_days[ax].name } has been absent for three days. ${ rslt_for_3_days[ay].name } was also notified by the system yesterday; please investigate why he has been absent without notification.`,
                                                                            `We found that ${ rslt_for_2_days[ax].name } is absent for three days, Also ${ rslt_for_3_days[ay].name } was notified by the system yesterday, kindly find out why he is absent without giving any notification.`,
                                                                            `We discovered that ${ rslt_for_2_days[ax].name } has been missing for three days. ${ rslt_for_3_days[ay].name } was also notified by the system yesterday; please investigate why he has been absent without notification.`,
                                                                            `We discovered that ${ rslt_for_2_days[ax].name } has been absent for three days. ${ rslt_for_3_days[ay].name } was also notified by the system yesterday; please investigate why he has been absent without notification.`
                                                                        ];
                                                                        SendWhatsappNotification( null, null, "Hi " + rslt_for_4_days[az].name, phrases_for_4_day[Math.floor(Math.random() * phrases_for_4_day.length)], rslt_for_4_days[az].cell );
                                                                    }
                                                                }
                                                    
                                                            }
                                                        )
                                                    }
                                                
                                            }

                                        }
                            
                                    }
                                )
                            }
                        }

                    }
        
                }
            )
        }
    }
}

function reminder_for_approval_a_leave_request()
{
    db.query(
        "SELECT  \
        emp_leave_application_refs.*, \
        employees.cell, \
        employees.name \
        FROM `emp_leave_application_refs` \
        LEFT OUTER JOIN employees ON emp_leave_application_refs.received_by = employees.emp_id \
        WHERE emp_leave_application_refs.request_status = 'sent' AND CURRENT_TIME() > ADDTIME(emp_leave_application_refs.requested_time, '1000');",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else 
            {
                
                let phrases = [ 
                    "There is a leave request pending at your side for approval. Kindly view that leave request, just log in to your account at http://202.63.220.170:3443",
                    "A leave request is awaiting approval on your end. Log in to your account at http://202.63.220.170:3443 to view that leave request.",
                    "There is a leave request pending at your side for approval. Log in to your account at http://202.63.220.170:3443 to view that leave request.",
                    "There is a leave request pending at your side for approval. Please review that leave request by logging in to your account at http://202.63.220.170:3443.",
                    "There is a leave request awaiting approval on your end. Kindly view that leave request, just log in to your account at http://202.63.220.170:3443"
                ]
                for ( let x = 0; x < rslt.length; x++ )
                {
                    SendWhatsappNotification( null, null, "Hi " + rslt[x].name, phrases[Math.floor(Math.random() * phrases.length)], rslt[x].cell );
                }

            }

        }
    )
}

function reminder_for_authorize_a_leave_request()
{
    db.query(
        "SELECT  \
        emp_leave_application_refs.*, \
        employees.cell, \
        employees.name \
        FROM `emp_leave_application_refs` \
        LEFT OUTER JOIN employees ON emp_leave_application_refs.authorized_to = employees.emp_id \
        WHERE emp_leave_application_refs.request_status = 'Accepted' AND CURRENT_TIME() > ADDTIME(emp_leave_application_refs.approval_time, '1000');",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else 
            {
                
                let phrases = [ 
                    "There is a leave request pending at your side for approval. Kindly view that leave request, just log in to your account at http://202.63.220.170:3443",
                    "A leave request is awaiting approval on your end. Log in to your account at http://202.63.220.170:3443 to view that leave request.",
                    "There is a leave request pending at your side for approval. Log in to your account at http://202.63.220.170:3443 to view that leave request.",
                    "There is a leave request pending at your side for approval. Please review that leave request by logging in to your account at http://202.63.220.170:3443.",
                    "There is a leave request awaiting approval on your end. Kindly view that leave request, just log in to your account at http://202.63.220.170:3443"
                ]
                for ( let x = 0; x < rslt.length; x++ )
                {
                    SendWhatsappNotification( null, null, "Hi " + rslt[x].name, phrases[Math.floor(Math.random() * phrases.length)], rslt[x].cell );
                }

            }

        }
    )
}

function reminder_for_approval_a_short_leave_request()
{
    db.query(
        "SELECT  \
        emp_short_leave_application_refs.*, \
        employees.cell, \
        employees.name \
        FROM `emp_short_leave_application_refs` \
        LEFT OUTER JOIN employees ON emp_short_leave_application_refs.received_by = employees.emp_id \
        WHERE emp_short_leave_application_refs.request_status = 'sent' AND CURRENT_TIME() > ADDTIME(emp_short_leave_application_refs.requested_time, '1000');",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else 
            {
                
                let phrases = [ 
                    "There is a short leave pending at your side for approval. Kindly view that short leave, just log in to your account at http://202.63.220.170:3443",
                    "A short leave is awaiting approval on your end. Log in to your account at http://202.63.220.170:3443 to view that short leave.",
                    "There is a short leave pending at your side for approval. Log in to your account at http://202.63.220.170:3443 to view that short leave.",
                    "There is a short leave pending at your side for approval. Please review that short leave by logging in to your account at http://202.63.220.170:3443.",
                    "There is a short leave awaiting approval on your end. Kindly view that short leave, just log in to your account at http://202.63.220.170:3443"
                ]
                for ( let x = 0; x < rslt.length; x++ )
                {
                    SendWhatsappNotification( null, null, "Hi " + rslt[x].name, phrases[Math.floor(Math.random() * phrases.length)], rslt[x].cell );
                }

            }

        }
    )
}

function reminder_for_authorize_a_short_leave_request()
{
    let query = db.query(
        "SELECT  \
        emp_short_leave_application_refs.*, \
        employees.cell, \
        employees.name \
        FROM `emp_short_leave_application_refs` \
        LEFT OUTER JOIN employees ON emp_short_leave_application_refs.authorized_to = employees.emp_id \
        WHERE emp_short_leave_application_refs.request_status = 'Accepted' AND CURRENT_TIME() > ADDTIME(emp_short_leave_application_refs.approval_time, '1000');",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else 
            {
                
                console.log( query.sql );
                let phrases = [ 
                    "There is a short leave pending at your side for approval. Kindly view that short leave, just log in to your account at http://202.63.220.170:3443",
                    "A short leave is awaiting approval on your end. Log in to your account at http://202.63.220.170:3443 to view that short leave.",
                    "There is a short leave pending at your side for approval. Log in to your account at http://202.63.220.170:3443 to view that short leave.",
                    "There is a short leave pending at your side for approval. Please review that short leave by logging in to your account at http://202.63.220.170:3443.",
                    "There is a short leave awaiting approval on your end. Kindly view that short leave, just log in to your account at http://202.63.220.170:3443"
                ]
                for ( let x = 0; x < rslt.length; x++ )
                {
                    // SendWhatsappNotification( null, null, "Hi " + rslt[x].name, phrases[Math.floor(Math.random() * phrases.length)], rslt[x].cell );
                }

            }

        }
    )
}

function password_reset()
{
    let phrases = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0'];

    db.query(
        "SELECT emp_id, cell, name FROM employees WHERE company_code = 7;",
        ( err, rslt ) => {

            if( err )
            {

                console.log( err );

            }else 
            {
                
                for ( let z = 0; z < rslt.length; z++ )
                {
                    console.log( 'Credentials Updating...' );

                    let login_id = phrases[Math.floor(Math.random() * phrases.length)] + phrases[Math.floor(Math.random() * phrases.length)] + phrases[Math.floor(Math.random() * phrases.length)] + phrases[Math.floor(Math.random() * phrases.length)] + phrases[Math.floor(Math.random() * phrases.length)] + phrases[Math.floor(Math.random() * phrases.length)];
                    let password = phrases[Math.floor(Math.random() * phrases.length)] + phrases[Math.floor(Math.random() * phrases.length)] + phrases[Math.floor(Math.random() * phrases.length)] + phrases[Math.floor(Math.random() * phrases.length)] + phrases[Math.floor(Math.random() * phrases.length)] + phrases[Math.floor(Math.random() * phrases.length)];

                    db.query(
                        "UPDATE emp_app_profile SET login_id = ?, emp_password = ? WHERE emp_id = ?;",
                        [ encryptor.encrypt( login_id ), encryptor.encrypt( password ), rslt[z].emp_id ],
                        ( err ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                
                            }else 
                            {
                                console.log( 'login_id: ', login_id );
                                console.log( 'password: ', password );
                                SendWhatsappNotification( null, null, "Hi " + rslt[z].name, "Your login id and password has been changed, your new login_id is '" + login_id + "' and password is '" + password + "'. Kindly login to http://portal.seaboard.pk and change you credentials first.", rslt[z].cell );
                
                            }
                
                        }
                    )
                }

            }

        }
    )
}

// setTimeout(() => {
//     password_reset();
// }, 1000);

// reminder_for_authorize_a_short_leave_request();

// setInterval(() => {
//     reminder_on_absent_more_than_1_day();
// }, 1000 * 60 * 60 * 10);

// setInterval(() => {

//     reminder_on_absent_for_leave();
    
// }, ( 1000 * 60 ) * 500);

// setInterval(() => {

//     reminder_for_approval_a_short_leave_request();
//     reminder_for_approval_a_leave_request();
    
// }, 1000 * 60 * 60 * 1.67);

// setInterval(() => {

//     reminder_for_authorize_a_short_leave_request();
//     reminder_for_authorize_a_leave_request();
    
// }, 1000 * 60 * 60 * 1.88);

module.exports = router;