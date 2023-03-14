const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// const writeXlsxFile = require('write-excel-file/node');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const txtomp3 = require("text-to-mp3");
const moment = require('moment');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "portal" //Un identificador(Sugiero que no lo modifiques)
    })
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    console.log('Whatsapp authenticated.');
});


client.initialize();
console.log('Connecting To Whatsapp...');
client.on("qr", qr => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("WHATSAPP MODULE IS READY TO USE");

    // client.on('message', async msg => {
    //     const qm = await msg.getQuotedMessage()
    //     console.log( qm );
    //     // const fw = await qm.reply(qm.body, "1111111111@c.us", {
    //     //     media: qm.hasMedia ? await qm.downloadMedia() : undefined
    //     // })
    //     // await fw.reply("should quote fw")
    // });

    client.on('message', message => {

        if( message.body.toLocaleLowerCase().includes('this is') ) {
            message.reply('Hello!');
            client.sendMessage(message.from, 'Welcome To Seaboard Group!');
        }else
        if
        ( 
            message.body.toLocaleLowerCase().includes('send') &&
            message.body.toLocaleLowerCase().includes('notification') &&
            message.body.toLocaleLowerCase().includes(':') &&
            message.body.toLocaleLowerCase().includes('--')
        ) 
        {
            client.sendMessage(message.from, '🤔');
            message.reply('Okay.....');

            let splitting = message.body.split(':').pop();
            let arr = splitting.split('--');
            arr.shift();
            let msg = arr[0];
            let location = arr[1];
            let company = arr[2];
            let dont_send = arr[3] ? JSON.parse(arr[3]) : [];
            
            let q = "SELECT emp_id, name, cell FROM employees WHERE emp_status = 'Active' AND ";

            if ( location )
            {
                q = q.concat(" location_code = " + location );
            }

            if ( company )
            {
                if ( location )
                {
                    q = q.concat(" AND ");
                }
                q = q.concat(" company_code = " + company );
            }

            sendNotifications( client, message, msg, q, dont_send );
        }else
        if
        ( 
            message.body.toLocaleLowerCase().includes('fix') && 
            message.body.toLocaleLowerCase().includes('my') &&  
            message.body.toLocaleLowerCase().includes('attendance') &&
            message.body.toLocaleLowerCase().includes(':') 
        ) 
        {
            message.reply('Hmmm.....🙄');
            client.sendMessage(message.from, 'Let me fix it!🤩');
            setTimeout(() => {
                fixAttendance(client, message.from, message);
            }, 300);
        }else
        if
        ( 
            message.body.toLocaleLowerCase().includes('get') &&
            message.body.toLocaleLowerCase().includes('my') &&
            message.body.toLocaleLowerCase().includes('credentials')
        ) 
        {
            message.reply('Let me identify yourself....');
            setTimeout(() => {
                fetchCredentials(client, message.from, message);
            }, 300);
        }else
        if
        ( 
            message.body.toLocaleLowerCase().includes('get') && 
            message.body.toLocaleLowerCase().includes('my') && 
            message.body.toLocaleLowerCase().includes('monthly') && 
            message.body.toLocaleLowerCase().includes('attendance') &&
            message.body.toLocaleLowerCase().includes(':') 
        )
        {
            message.reply('Okay.... let me fetch your data first...');
            fetchAttendance(client, message.from, message);
        }else
        if( message.body.toLocaleLowerCase().includes('refresh') && message.body.toLocaleLowerCase().includes('index') ) {
            message.reply('Refreshing...');
            db.query(
                "UPDATE employees SET app_status = '';",
                ( err ) => {
            
                    if ( !err )
                    {
                        client.sendMessage(message.from, 'Indexes Refreshed!');
                    }else
                    {
                        client.sendMessage(message.from, 'Error!');
                        client.sendMessage(message.from, err);
                    }
            
                }
            )
        }else
        {    
            client.sendMessage(message.from, "😴");
            txtomp3.getMp3("Kindly don't send us random messages. We only reply the valid messages.", { tl: 'en' }).then(function(binaryStream){
            var file = require('fs').createWriteStream("./err.mp3"); // write it down the file
            file.write(binaryStream);
            file.end();
            file.on('finish', function() {
                console.log("SUCCESS");
                setTimeout(() => {
                    const media = MessageMedia.fromFilePath('./err.mp3');
                    client.sendMessage(message.from, media);
                    require('fs').unlinkSync('./err.mp3');
                }, 300);
            });
            })
            .catch(function(err){
                console.log("Error", err);
            });
        }
        
    });
})

const fetchCredentials = ( client, messageFrom, message ) => {

    let number = messageFrom.substring(2,12);
    var key = 'real secret keys should be long and random';
    var encryptor = require('simple-encryptor')(key);

    number = number.split('@c.us').shift();
    number = '0' + number;

    db.query(
        "SELECT emp_id, name FROM employees WHERE cell = ?",
        [ number ],
        ( err, rslt ) => {
    
            if ( !err )
            {
                client.sendMessage(messageFrom, 'Employee Identified!!!');
                setTimeout(() => {
                    client.sendMessage(messageFrom, 'Please wait... ' + rslt[0].name);
                    db.query(
                        "SELECT login_id, emp_password FROM emp_app_profile WHERE emp_id = " + rslt[0].emp_id,
                        ( err, rslt ) => {
                    
                            if ( !err )
                            {
                                if ( rslt[0] )
                                {
                                    let emp_id = encryptor.decrypt(rslt[0].login_id);
                                    let emp_pass = encryptor.decrypt(rslt[0].emp_password);
                                    message.reply("Your credentials:\n ID: " + emp_id + '\n Password: ' + emp_pass);
                                }else
                                {
                                    message.reply("No credentials matched!!! You are not registered on portal, kindly contact our IT team.");
                                }
                            }else
                            {
                                client.sendMessage(message.from, 'Error!');
                                client.sendMessage(message.from, err);
                            }
                    
                        }
                    )
                }, 300);
            }else
            {
                console.log( err )
                client.sendMessage(messageFrom, 'Error!');
            }
    
        }
    )

}

const fetchAttendance = ( client, messageFrom, message ) => {

    let number = messageFrom.substring(2,12);
    let body = message._data.body;

    number = number.split('@c.us').shift();
    number = '0' + number;
    
    body = body.split(':').pop();
    let month = parseInt(body.split('/').shift());
    let year = parseInt(body.split('/').pop());

    db.query(
        "SELECT emp_id, name FROM employees WHERE cell = ?",
        [ number ],
        ( err, rslt ) => {
    
            if ( !err )
            {
                let name = rslt[0].name;
                client.sendMessage(messageFrom, 'Hi ' + rslt[0].name);
                client.sendMessage(messageFrom, 'Your employee id is ' + rslt[0].emp_id);
                message.reply('Fetching your attendance...');
                createExcel( client, messageFrom, message, rslt[0].emp_id, month, year, name );
            }else
            {
                client.sendMessage(messageFrom, 'Error!');
                client.sendMessage(messageFrom, err);
            }
    
        }
    )

}

const fixAttendance = ( client, messageFrom, message ) => {

    let number = messageFrom.substring(2,12);
    let body = message._data.body;

    number = number.split('@c.us').shift();
    number = '0' + number;

    body = body.split(':').pop();
    let month = parseInt(body.split('/').shift());
    let year = parseInt(body.split('/').pop());

    db.query(
        "SELECT emp_id, name, time_in, time_out FROM employees WHERE cell = ?",
        [ number ],
        ( err, rslt ) => {
    
            if ( !err )
            {
                let name = rslt[0].name;
                let emp_id = rslt[0].emp_id;
                let time_in = rslt[0].time_in;
                let time_out = rslt[0].time_out;

                let real_time_in = moment(time_in, 'hh:mm A').add(16, 'minutes').format('HH:mm:ss');
                let real_time_out = moment(time_out, 'hh:mm A').add(16, 'minutes').format('HH:mm:ss');
                client.sendMessage(messageFrom, 'Please Wait... ' + rslt[0].name + "\n Your timings are: \n IN: " + time_in + "\n OUT: " + time_out);
                setTimeout(() => {
                    message.reply('Fixing your attendance...');
                    let dt = new Date().toISOString().slice(0, 10).replace('T', ' ');

                    db.query(
                        "UPDATE emp_attendance SET status = 'Present' WHERE time_in IS NOT NULL AND time_out IS NOT NULL AND status = 'Late' AND emp_id = " + emp_id + " AND MONTH(emp_date) = " + month + " AND YEAR(emp_date) = " + year + ";" +
                        "UPDATE emp_attendance SET status = 'Late' WHERE time_in IS NOT NULL AND time_out IS NULL AND status = 'Present' AND emp_id = " + emp_id + " AND MONTH(emp_date) = " + month + " AND YEAR(emp_date) = " + year + ";" +
                        "UPDATE emp_attendance SET status = 'Late' WHERE time_in > ? AND status = 'Present' AND emp_id = " + emp_id + " AND MONTH(emp_date) = " + month + " AND YEAR(emp_date) = " + year + ";" +
                        "UPDATE emp_attendance SET status = 'Present' WHERE time_in < ? AND time_out IS NOT NULL AND status = 'Late' AND emp_id = " + emp_id + " AND MONTH(emp_date) = " + month + " AND YEAR(emp_date) = " + year + ";" +
                        "UPDATE emp_attendance SET status = 'Present' WHERE time_in < ? AND emp_id = " + emp_id + " AND emp_date = ?;",
                        [ real_time_in, real_time_in, real_time_in, dt ],
                        ( err, rslt ) => {
                    
                            if ( !err )
                            {
                                console.log(rslt);
                                message.reply('Your attendance has been fixed!');

                                setTimeout(() => {
                                    client.sendMessage(messageFrom, `Summary \n No. of records changed to 'Present': ${rslt[0].affectedRows} \n No. of records changed to 'Late' (because of no time out): ${rslt[1].affectedRows} \n No. of records changed to 'Late' (because of late comings): ${rslt[2].affectedRows} \n No. of records changed to 'Present' (because of comings before ${real_time_in}): ${rslt[3].affectedRows}`);                  
                                    createExcel( client, messageFrom, message, emp_id, month, year, name );
                                }, 500);
                            }else
                            {
                                client.sendMessage(message.from, 'Error!');
                                client.sendMessage(message.from, err);
                            }
                    
                        }
                    )
                }, 500);
            }else
            {
                client.sendMessage(messageFrom, 'Error!');
                client.sendMessage(messageFrom, err);
            }
    
        }
    )

}

function fixingAttendance( client, messageFrom, message )
{

    let number = messageFrom.substring(2,12);
    let body = message._data.body;

    number = number.split('@c.us').shift();
    number = '0' + number;

    body = body.split(':').pop();
    let month = parseInt(body.split('/').shift());
    let year = parseInt(body.split('/').pop());

    db.query(
        "UPDATE emp_attendance a \
        JOIN employees b ON a.emp_id = b.emp_id \
        SET a.status = 'Present' \
        WHERE a.time_in < '11:16:00' AND MONTH(a.emp_date) = ? AND YEAR(a.emp_date) = ? AND b.time_in = '11:00 AM' AND b.location_code = ? AND b.company_code = ?;",
        [ month, year ],
        ( err ) => {

            if( err )
            {

                console.log( err );

            }else 
            {
                console.log("Attendance Updated Success");
            }

        }
    )
}

const SendWhatsappNotification = ( receiverID, senderID, Title, NotificationBody, cell ) => {

    let standardNumber;
    let code = '92';
    let message;
    let num = "";
    if ( cell.includes('+') )
    {
        num = cell.replace('+', '');
        standardNumber = num + '@c.us';
    }else
    {
        num = cell.substring(1, 11);
        standardNumber = code + num + '@c.us';
    }
    console.log(standardNumber)
    message = "*!PORTAL NOTIFICATION!* \n \
    _" + Title + ": " + NotificationBody + "._";
    client.sendMessage(standardNumber, message);

}

function createExcel( client, messageFrom, message, emp_id, month, year, name )
{
    db.query(
        "SELECT `id`, `emp_id`, `time_in`, `time_out`, `break_in`, `break_out`, `status`, `emp_date` FROM emp_attendance WHERE emp_id = " + emp_id + " AND MONTH(emp_date) = " + month + " AND YEAR(emp_date) = " + year + " ORDER BY emp_date DESC",
        ( err, rslt ) => {
    
            if ( !err )
            {
                message.reply('Data Fetched!');

                // Require library
                var xl = require('excel4node');

                // Create a new instance of a Workbook class
                var wb = new xl.Workbook();

                // Add Worksheets to the workbook
                var ws = wb.addWorksheet('Sheet 1');

                // Create a reusable style
                var style = wb.createStyle(
                    {
                        font: {
                            color: '#000000',
                            size: 12,
                        },
                        numberFormat: '$#,##0.00; ($#,##0.00); -',
                        alignment: {
                            shrinkToFit: true,
                            wrapText: true,
                            relativeIndent: 2,
                            indent: 2
                        },
                    }
                );

                var headerStyle = {
                    font: {
                        bold: true,
                        size: 14,
                        color: '#ffffff'
                    },
                    fill: {
                        type: 'pattern', // the only one implemented so far.
                        patternType: 'solid', // most common.
                        fgColor: '2172d7', // you can add two extra characters to serve as alpha, i.e. '2172d7aa'.
                        // bgColor: 'ffffff' // bgColor only applies on patternTypes other than solid.
                    }
                }

                // Set value of cell A1 to 100 as a number type styled with paramaters of style
                ws.cell(1, 1)
                .string('Employee ID')
                .style(style)
                .style(headerStyle);
                
                ws.cell(1, 2)
                .string('Name')
                .style(style)
                .style(headerStyle);
                
                ws.cell(1, 3)
                .string('Date')
                .style(style)
                .style(headerStyle);
                
                ws.cell(1, 4)
                .string('Day')
                .style(style)
                .style(headerStyle);
                
                ws.cell(1, 5)
                .string('Start Time')
                .style(style)
                .style(headerStyle);
                
                ws.cell(1, 6)
                .string('End Time')
                .style(style)
                .style(headerStyle);
                
                ws.cell(1, 7)
                .string('Start Break')
                .style(style)
                .style(headerStyle);
                
                ws.cell(1, 8)
                .string('End Break')
                .style(style)
                .style(headerStyle);
                
                ws.cell(1, 9)
                .string('Status')
                .style(style)
                .style(headerStyle);
                
                for ( let c = 0; c < rslt.length; c++ )
                {

                    var otherStyle = {
                        fill: {
                            type: 'pattern', // the only one implemented so far.
                            patternType: 'solid', // most common.
                            fgColor: rslt[c].status === 'Late' ? 'd3d3d3' : 'ffffff', // you can add two extra characters to serve as alpha, i.e. '2172d7aa'.
                            // bgColor: 'ffffff' // bgColor only applies on patternTypes other than solid.
                        }
                    };

                    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    let d = new Date(rslt[c].emp_date);
                    let dayName = days[d.getDay()];

                    ws.cell(2 + c, 1)
                    .string(rslt[c].emp_id.toString())
                    .style(style)
                    .style( otherStyle );
                    ws.cell(2 + c, 2)
                    .string(name)
                    .style(style)
                    .style( otherStyle );
                    ws.cell(2 + c, 3)
                    .string(new Date(rslt[c].emp_date).toDateString())
                    .style(style)
                    .style( otherStyle );
                    ws.cell(2 + c, 4)
                    .string(dayName)
                    .style(style)
                    .style( otherStyle );

                    ws.cell(2 + c, 5)
                    .string(rslt[c].time_in)
                    .style(style)
                    .style( otherStyle );
                    ws.cell(2 + c, 6)
                    .string(rslt[c].time_out)
                    .style(style)
                    .style( otherStyle );
                    ws.cell(2 + c, 7)
                    .string(rslt[c].break_in)
                    .style(style)
                    .style( otherStyle );
                    ws.cell(2 + c, 8)
                    .string(rslt[c].break_out)
                    .style(style)
                    .style( otherStyle );
                    
                    ws.cell(2 + c, 9)
                    .string(rslt[c].status)
                    .style(style)
                    .style( otherStyle );
                }

                // Set value of cell B1 to 200 as a number type styled with paramaters of style

                // // Set value of cell C1 to a formula styled with paramaters of style
                // ws.cell(1, 3)
                // .formula('A1 + B1')
                // .style(style)
                // .style(headerStyle);

                // Set value of cell A2 to 'string' styled with paramaters of style
                // ws.cell(2, 1)
                // .string('string')
                // .style(style);

                // // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
                // ws.cell(3, 1)
                // .bool(true)
                // .style(style)
                // .style({font: {size: 14}});
                let fileName = month + '-' + year + '-monthly_attendance.xlsx';

                wb.write('./' + fileName);

                message.reply("Excel file created! Sending....");
                setTimeout(() => {
                    const media = MessageMedia.fromFilePath('./' + fileName);
                    client.sendMessage(messageFrom, media);
                    require('fs').unlinkSync('./' + fileName);
                }, 1000);
            }else
            {
                client.sendMessage(message.from, 'Error!');
                client.sendMessage(message.from, err);
            }
    
        }
    )
}

function sendNotifications( client, message, msg, q, dont_send )
{
    db.query(
        q,
        ( err, rslt ) => {
    
            if ( !err )
            {
                let count = 0;
                for ( let c = 0; c < rslt.length; c++ )
                {
                    if ( !dont_send.includes( parseInt(rslt[c].emp_id) ) )
                    {
                        count = count + 1;
                        let standardNumber;
                        let code = '92';
                        let num = "";
                        if ( rslt[c].cell.includes('+') )
                        {
                            num = rslt[c].cell.replace('+', '');
                            standardNumber = num + '@c.us';
                        }else   
                        {
                            num = rslt[c].cell.substring(1, 11);
                            standardNumber = code + num + '@c.us';
                        }

                        client.sendMessage(standardNumber, msg);
                    }
                }
                
                setTimeout(() => {
                    message.reply('Notification has been sent! (' + count + ')');
                }, 500);
            }else
            {
                client.sendMessage(message.from, 'Error!');
                client.sendMessage(message.from, err);
            }
    
        }
    )
}

module.exports = {
    router: router,
    SendWhatsappNotification: ( receiverID, senderID, Title, NotificationBody, cell ) => SendWhatsappNotification( receiverID, senderID, Title, NotificationBody, cell )
};