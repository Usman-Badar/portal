const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const wbm = require('wbm');

const SendWhatsappNotification = ( receiverID, senderID, Title, NotificationBody, cell ) => {

    const d = new Date();
    // let standardNumber;
    // let code = '+92';
    // let splitNumber = cell.split('03');
    // splitNumber.shift();
    
    // code = code.concat( splitNumber );
    // console.log( code )

    // wbm.start().then(async () => {
    //     const phones = [ cell ];
    //     const message = NotificationBody;
    //     await wbm.send(phones, message);
    //     await wbm.end();
    // }).catch(err => console.log(err));

}

module.exports = {
    router: router,
    SendWhatsappNotification: ( receiverID, senderID, Title, NotificationBody, cell ) => SendWhatsappNotification( receiverID, senderID, Title, NotificationBody, cell )
};