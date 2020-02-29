'user strict';

var config = require('../config/config');
var sendGrid = require('@sendgrid/mail');
sendGrid.setApiKey(config.emailApiKey)

exports.send = async (to, subject, body)=>{
    sendGrid.send({
        to: to,
        from: 'cleyton@hurtz.com.br',
        subject: subject,
        html: body
    });
}