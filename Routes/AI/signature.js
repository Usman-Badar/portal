const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const SendWhatsappNotification = require('../Whatsapp/whatsapp').SendWhatsappNotification;

router.post('/validate/signature', ( req, res ) => {

    const { signature } = req.body;
    const base64Data = signature.replace(/^data:image\/png;base64,/, "");

    require("fs").writeFile("assets/portal/assets/images/signatures/signature_to_match.png", base64Data, 'base64', function(err) {
        console.log(err);
    });

    res.send("success");
    res.end();

} );

module.exports = router;