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
async function sendMail(fields, type)
{
    if (type == 0) {
        ejs.renderFile(__dirname + "\\html\\email\\message.ejs", {
            barcode: fields.barcode,
            login: fields.login
        }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var options = {
                    from: '"Gossip Girl Team" <GisspGirlTeam@gmail.com>',
                    to: fields.email,
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
    } else {
        ejs.renderFile(__dirname + "\\html\\email\\forgot.ejs", {
            password: fields.password
        }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var options = {
                    from: '"Gossip Girl Team" <GisspGirlTeam@gmail.com>',
                    to: fields.email,
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
}



module.exports =
    {
        sendMail: sendMail
    }