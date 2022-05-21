const nodeMailer    = require("nodemailer")
const fs            = require('fs')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)

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
async function sendMail(email)
{
    await transporter.sendMail(
        {
            from: '"Gossip Girl Team" <GisspGirlTeam@gmail.com>',
            to: email,
            subject: 'Registration to GossipGirl forum success',
            text: 'You have been registered to forum',
            html: await readFile(path.join(__dirname, 'html', 'email', 'message.html'))
        })
}



module.exports =
    {
        sendMail: sendMail
    }