const express    = require('express')
const bodyParser = require('body-parser')
const cookie     = require('cookie-parser')
const session    = require('express-session')
const path       = require('path')
const ejs        = require('ejs')
const mongo        = require('./mongo.js')
const email      = require('./email.js')
const {getUser} = require("./mongo");

const PORT       = process.env.PORT || 3000
const app        = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookie())
app.set('view engine', 'ejs')



//
// GET  -> Main page
// SEND -> render 'html/index.ejs'
app.get("/", async (req, res) =>
{
  const posts = await mongo.getPosts()
  res.render(path.join(__dirname, 'html', 'view', 'index'),
      {
        posts: posts
  })
})



//
// GET  -> *.html
// SEND -> render *.html || ejs
app.get("/login", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html','login.html'))
})
app.get("/register", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html','register.html'))
})



//
// GET  -> Answers iframe
// SEND -> render 'html/view/index.ejs'
app.get("/getAnswers", async (req, res) =>
{
  const postId = req.query.postId
  const answers = await mongo.getAnswers(postId)
  res.render(path.join(__dirname, 'html', 'view', 'answer'),
      {
        answers: answers
  })
})



//
// POST -> Creating answer
// SEND -> Resending to '/'
app.post("/createAnswer", async (req, res) =>
{
  let error = await mongo.createAnswer(req.body.id, req.cookies.login, req.cookies.password, req.body.src)
  if (error !== undefined) {
    res.render(path.join(__dirname, 'html', 'view', 'error'),
        {
          error: error
        })
  } else {
    res.redirect("/")
  }
})



//
// POST -> Creating post
// SEND -> Resending to '/'
app.post("/createPost", async (req, res) =>
{
  mongo.createPost(req.cookies.login, req.cookies.password, req.body.title, req.body.src)
  let error = await mongo.createAnswer(req.body.id, req.cookies.login, req.cookies.password, req.body.src)
  if (error !== undefined) {
    res.render(path.join(__dirname, 'html', 'view', 'error'),
        {
          error: error
        })
  } else {
    res.redirect("/")
  }
})



app.post("/login", async (req, res) =>
{
  const user = await mongo.getUser(req.body.uname, req.body.password)
  if (user.title == null)
  {
    res.cookie('login', user.login)
    res.cookie('password', user.password)
    res.redirect('/')
  } else {
    res.render(path.join(__dirname, 'html', 'view', 'error'),
        {
          error: user
        })
  }
})



app.post("/register", (req, res) =>
{
  let error = mongo.createUser(req.body.login, req.body.password)
  if (error == null) {
    res.redirect('login')
  } else {
    res.render(path.join(__dirname, 'html', 'view', 'error'),
        {
          error: error
        })
  }
})



//
// SEND -> like
//
/*app.post("/like", (req, res) =>
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
})*/



app.get("/auth", (req, res) =>
{
  console.log(req.query.barcode)
})



//
// GET  -> *.css
// SEND -> *.css file
app.get("/index.css", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html', 'style', 'index.css'))
})
app.get("/register.css", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html', 'style', 'register.css'))
})
app.get("/error.css", (req, res) =>
{
  res.sendFile(path.join(__dirname, 'html', 'style', 'error.css'))
})



//
// Admin Page
//
app.get('/adminPage', async (req, res) => {
  const users = await mongo.getUsers(req.cookies.login, req.cookies.password)
  res.render(path.join(__dirname, 'html', 'view', 'admin'), {
    username: req.cookies.login,
    users: users
  })
})
app.get('/adminPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'style', 'admin'))
})


//
// Starting server
//
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
})
