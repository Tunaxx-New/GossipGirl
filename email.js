const nodeMailer    = require("nodemailer")
const fs            = require('fs')
const { promisify } = require('util')
const ejs           = require('ejs')

//
// Object for sending email from Islambek's gmail
//
const transporter = nodeMailer.createTransport(
{
    service: 'gmail',
    auth: {
        user: 'callmedaddy564@gmail.com',
        pass: 'turarbaev004',
    },
})

//
// Send Mail to authenticate
// @param1 email String
async function sendMail(email, barcode, login)
{
    ejs.renderFile(__dirname + "\\html\\email\\message.ejs", { barcode: barcode, login: login }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var options = {
                from: '"Gossip Girl Team" <GisspGirlTeam@gmail.com>',
                to: email,
                subject: 'Registration to GossipGirl forum success',
                text: 'You have been registered to forum',
                html: data
            }
            transporter.sendMail(options, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            })
        }
    })
}



module.exports =
    {
        sendMail: sendMail
    }