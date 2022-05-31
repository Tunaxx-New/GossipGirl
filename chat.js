var fs = require('fs')
var shell = require('shelljs')

function getChat(login, friend)
{
    let file1 = './chat/' + friend + login + '.txt'
    let file2 = './chat/' + login + friend + '.txt'
    let fileOpen1 = __dirname + '/chat/' + friend + login + '.txt'
    let fileOpen2 = __dirname + '/chat/' + login + friend + '.txt'
    try
    {
        if (!fs.existsSync(fileOpen1)) {
            if (!fs.existsSync(fileOpen2)) {
                fs.writeFileSync(fileOpen1, '', function (err) {
                    if (err) throw err;
                    console.log('Saved! ' + file);
                });
            } else {
                fileOpen1 = fileOpen2
            }
        }
    }
    catch(err) {
        console.error(err)
    }

    return fs.readFileSync(fileOpen1, 'utf8')
}

function sendMessage(login, friend, src)
{
    let fileOpen1 = __dirname + '/chat/' + friend + login + '.txt'
    let fileOpen2 = __dirname + '/chat/' + login + friend + '.txt'
    try
    {
        if (!fs.existsSync(fileOpen1)) {
            if (!fs.existsSync(fileOpen2)) {
                fs.writeFileSync(fileOpen1, '', function (err) {
                    if (err) throw err;
                    console.log('Saved! ' + file);
                });
            } else {
                fileOpen1 = fileOpen2
            }
        }
    }
    catch(err) {
        console.error(err)
    }
    let msg = login + ':'
    msg += src
    msg += '\n'
    fs.appendFileSync(fileOpen1, msg, function (err) {
        if (err) throw err;
        console.log('Appended into ' + file + ' message: ' + msg);
    });
}

function deleteChat(login, friend)
{
    let fileOpen = __dirname + '/chat/' + uname + client + '.txt'
    try {
        fs.unlinkSync(fileOpen)
    } catch (e) {
        console.log(e)
    }
}

module.exports =
    {
        getChat: getChat,
        sendMessage: sendMessage,
        deleteChat: deleteChat
    }