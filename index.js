const express    = require('express')
const bodyParser = require('body-parser')
const cookie     = require('cookie-parser')
const session    = require('express-session')
const path       = require('path')
const ejs        = require('ejs')
const nodeMailer = require('nodemailer')
const sql        = require('./sql.js')

const PORT       = process.env.PORT || 3000
const app        = express()
var transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'callmedaddy564@gmail.com',
    pass: 'turarbaev004',
  },
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookie())
app.use(session({
    secret: "asdgetkop",
    cookie: {},
    saveUninitialized: true,
    resave: false
}))
app.set('view engine', 'ejs')

//SendMail-----------------------------------------
function sendMail(email)
{
  let result = transporter.sendMail({
    from: '"Gossip Girl Team" <GisspGirlTeam@gmail.com>',
    to: email,
    subject: 'Registration to GossipGirl forum success',
    text: 'You have been registered to forum',
    html:
    `
<!DOCTYPE html>
<html>
<head>
	<title>HTML Button Generator</title>
	<style>
		button {
			color: #ffffff;
			background-color: pink;
			font-size: 19px;
			border: 1px solid pink;
			padding: 15px 50px;
			cursor: pointer;
		}
		button:hover {
			color: pink;
			background-color: #ffffff;
		}
		.hcentered {
			text-align: center;
		}
	</style>
</head>
<body>
<h1 style="text-align: center;"><span style="color: #000000;"><strong>Welcome to Gossip Girl</strong></span></h1>
<h3 style="text-align: center;"><span style="color: #808080;"><strong>You are ready to send messages</strong></span></h3>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<div class="hcentered">
<form action="tunaxx.me/auth" method="post">
<input name="barcode" value="123" style="visibility: hidden; width: 0; height: 0;">
<button type="button" name="myButton">Confirm email</button>
</form>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><span style="color: #ff99cc; background-color: #000000;"><strong><img style="display: block; margin-left: auto; margin-right: auto;" src="https://www.picng.com/upload/heart/png_heart_31795.png" alt="" width="50" height="50" /></strong></span></p>
</body>
    `
  })
  console.log(result)
}

//MYSQL-TEST1--------------------------------------
function getByName(uname, callback)
{
  let query = "SELECT " + name + " FROM " + database + " WHERE " + name + "='" + uname + "';"
  connection.query(query, (error, results) =>
  {
    if (error) {
      console.log(error.message)
    }
    return callback(results)
  })
}
function getUser(uname, password, callback)
{
  let query = "SELECT *  FROM " + database + " WHERE " + name + "='" + uname + "' AND password='" + password + "';"
  connection.query(query, (error, results) =>
  {
    if (error) {
      console.log(error.message)
    }
    return callback(results)
  })
}
function newUser(id, uname, password, message, callback)
{
  let query  = "INSERT INTO " + database + "(id, " + name + ", password, message)"
  let values = "VALUES (";
  values += "'" + id + "', "
  values += "'" + uname + "', "
  values += "'" + password + "', "
  values += "'" + message + "');"
  query  += values

  connection.query(query, (error, results) =>
  {
    if (error) {
      console.log(error.message)
      return
    }
    return callback(results)
  })
}
function changeMessage(uname, password, message, callback)
{
  let query  = "UPDATE " + database + " SET message = '" + message + "' WHERE " + name + "='" + uname + "' AND password='" + password + "';"

  connection.query(query, (error, results) =>
  {
    if (error) {
      console.log(error.message)
      return
    }
    return callback(results)
  })
}
function getTable(callback)
{
  let query = "SELECT uname, message, likeCount  FROM " + database + ";"
  connection.query(query, (error, results) =>
  {
    if (error) {
      console.log(error.message)
    }
    return callback(results)
  })
}
function getLiked(uname, callback)
{
  let query = "SELECT liked, likeCount FROM " + database + " WHERE uname='" + uname + "';"
  connection.query(query, (error, results) =>
  {
    if (error) {
      console.log(error.message)
    }
    return callback(results)
  })
}
function setLiked(uname, liked, likeCount, callback)
{
  let query  = "UPDATE " + database + " SET liked = '" + liked + "', likeCount = '" + likeCount + "' WHERE " + name + "='" + uname + "';"
  connection.query(query, (error, results) =>
  {
    if (error) {
      console.log(error.message)
      return
    }
    return callback(results)
  })
}
//-------------------------------------------------

//FunMYSQL-----------------------------------------
function getCanvas(callback)
{
  let query = "SELECT bitmap FROM canvas"
  connection.query(query, (error, results) =>
  {
    if (error) {
      console.log(error.message)
    }
    return callback(results)
  })
}
function setCanvas(y, x, color, callback)
{
  let query = "update canvas set bitmap = JSON_SET(bitmap, '$[" + y + "][" + x + "]', '" + color + "');"
console.log(query)
connection.query(query, (error, results) =>
  {
    if (error) {
      console.log(error.message)
    }
    return callback(results)
  })
}
//-------------------------------------------------

app.get("/", (req, res) =>
{
  let ses
  let now = Date.now() / 1000
  ses = Math.trunc(now - req.session.first_online)
  req.session.first_online = Date.now() / 1000
  sql.getPosts((result) =>
  {
          res.render(path.join(__dirname, 'html', 'index'),
          {
            uname: req.cookies.uname,
            posts: result,
            time: ses
          })
  })
})
app.get("/getAnswer", (req, res) =>
{
  let postId = req.query.postId
  sql.getAnswers(postId, (resultAns) =>
  {
    res.render(path.join(__dirname, 'html', 'view', 'answer'),
        {
            answers: resultAns
        })
  })
})
app.get("/test1", (req, res) =>
{
  let ses
  let now = Date.now() / 1000
  ses = Math.trunc(now - req.session.first_online)
  req.session.first_online = Date.now() / 1000
  getTable((result) =>
  {
  res.render(path.join(__dirname, 'html', 'test1', 'index'),
          {
            uname: req.cookies.uname,
            table: result,
            time: ses
         })
  })
})
app.get("/test1/index.css", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html', 'test1', 'index.css'))
})
app.get("/index.css", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html','index.css'))
})




app.post("/answer", (req, res) =>
{
  createAnswer(req.body.id, req.body.src, (results) =>
  {
    res.redirect("/")
  })
})




app.get("/login", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html','login.html'))
})

app.get("/register", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html','register.html'))
})

app.get("/register.css", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html','register.css'))
})



app.post("/login", (req, res) =>
{
  var uname    = req.body.uname
  var password = req.body.password
  getByName(uname, (result) =>
  {
    let exist = result.length > 0
    if (exist) {
      getUser(uname, password, (result) =>
      {
        if (result.length > 0) {
          res.cookie('uname', uname)
          res.cookie('password', password)
          res.redirect('/')
        }
        else {
          res.send("password is wrong!")
        }
      })
    }
    else {
      res.send("No such user!")
    }
  })
})

app.post("/register", (req, res) =>
{
  var uname    = req.body.uname
  var message  = req.body.message
  var password = req.body.password
  var email    = req.body.email
  getByName(uname, (result) =>
  {
    var size  = result.length
    let exist = result.length > 0
    if (!exist) {
      if (password.length > 0) {
        newUser(size, uname, password, message, (result) =>
        {
          sendMail(email)
          res.redirect('/')
        })
      }
      else {
        res.send("No password!")
      }
    }
    else {
      res.send("This user already exist!")
    }
  })
})

app.post("/changeMessage", (req, res) =>
{
  var message  = req.body.message
  var uname    = req.cookies.uname
  var password = req.cookies.password
  if (!password) {
    res.redirect('/login')
  }
  else {
    changeMessage(uname, password, message, (result) =>
    {
      res.redirect('/')
    })
  }
})

app.post("/like", (req, res) =>
{
  var unameTarget = req.body.target
  var uname       = req.cookies.uname
  var password    = req.cookies.password
  if (!password) {
    res.redirect('/login')
  }
  else {
    getLiked(unameTarget, (results) =>
    {
      var result = Object.values(JSON.parse(JSON.stringify(results)))[0]
      let exist = false
      result.liked = JSON.parse(result.liked)
      if (!result.liked)
        result.liked = []

      for (var i = 0; i < result.liked.length; i++)
        if (result.liked[i] == uname)
          exist = true
      if (!exist) {
        result.liked.push(uname)
        result.likeCount += 1
        setLiked(unameTarget, JSON.stringify(result.liked), result.likeCount, (result) =>
        {
          res.redirect('/')
        })
      }
      else
        res.redirect('/')
    })
  }
})



app.get("/auth", (req, res) =>
{
  console.log(req.query.barcode)
})




app.get("/canvas", (req, res) =>
{
  getCanvas((results) =>
  {
    var bitmap = Object.values(JSON.parse(JSON.stringify(results)))[0].bitmap
    res.render(path.join(__dirname, 'html/fun', 'canvas'),
    {
col: req.cookies.color,
w:500,
h:700,
      bitmap: bitmap
    })
  })
})
app.get("/canvas.css", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html/fun','canvas.css'))
})
app.post("/canvas", (req, res) =>
{
  var x = req.body.x
  var y = req.body.y
  res.cookie('color', req.body.color)
  var color = req.body.color
  setCanvas(x, y, color, (results) =>
  {
    res.redirect("/canvas")
  })
})


app.listen(PORT, () =>
{
  console.log(`Express server listening on port ${PORT}`)
})
