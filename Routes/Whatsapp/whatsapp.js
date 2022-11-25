const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

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
client.on("qr", qr => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("WHATSAPP MODULE IS READY TO USE");

    client.on('message', message => {

        if( message.body.toLocaleLowerCase().includes('this is') ) {
            message.reply('Hi!');
            client.sendMessage(message.from, 'Welcome To Seaboard Group!');
        }else
        {
            message.reply("Kindly don't send us random messages. We only reply the valid messages.");
        }
        
    });
})

const SendWhatsappNotification = ( receiverID, senderID, Title, NotificationBody, cell ) => {

    let standardNumber;
    let code = '92';
    let num = cell.substring(1, 11);
    let message;
    standardNumber = code + num + '@c.us';
    console.log(standardNumber)
    message = "*!PORTAL NOTIFICATION!* \
    _" + Title + ": " + NotificationBody + "._";
    client.sendMessage(standardNumber, message);

}

module.exports = {
    router: router,
    SendWhatsappNotification: ( receiverID, senderID, Title, NotificationBody, cell ) => SendWhatsappNotification( receiverID, senderID, Title, NotificationBody, cell )
};