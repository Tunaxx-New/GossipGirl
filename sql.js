const mysql = require("mysql")



const connection = mysql.createConnection
({
    host:     '127.0.0.1',
    user:     'root'     ,
    password: 'OSAIdfkji1o2idWA!#@LO'
})



function ifError(error, endMessage)
{
    if (error) {
        console.log(error.message)
        return
    }
    if (endMessage != '')
        console.log(endMessage)
}



function useDatabase(database)
{
    connection.query("use " + database + ";", (error) => ifError(error, 'Using ' + database + ' database'))
}



connection.connect((error) => ifError(error, 'Connection established sucessfully'))
useDatabase('users')



function querySql(query, callback)
{
    connection.query(query, (error, results) =>
    {
        ifError(error, '')
        return callback(results)
    })
}



function getPosts(callback)
{
    let query = "SELECT * FROM posts;"
    querySql(query, (results) => { return callback(results) })
}



function getAnswers(postId, callback)
{
    let query = "SELECT * FROM answers WHERE postId = " + postId + ";"
    querySql(query, (results) => { return callback(results) })
}



function createAnswer(idPost, src, callback)
{
    connection.query("select * from answers", (err, res) =>
    {
        var query = "INSERT INTO answers VALUES("
        query += "'" + res.length + "',"
        query += "'" + src + "',"
        query += "'potato',"
        query += "'0000',"
        query += "'0',"
        query += "'0',"
        query += "'" + idPost + "');"

        querySql(query, (results) => { return callback(results) })
    })
}



module.exports =
    {
        getPosts: getPosts,
        getAnswers: getAnswers,
        createAnswer: createAnswer
    }