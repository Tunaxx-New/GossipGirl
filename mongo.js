const mongoose  = require('mongoose')
const validator = require('./database/validator.js')

mongoose.connect('mongodb://127.0.0.1:27017/GossipGirl', { useNewUrlParser: true }, err => {
    if (!err) {
        console.log("Connection succeeded")
    } else {
        console.log("Error in connection " + err)
    }
})

require('./database/User.model')
require('./database/Post.model')
require('./database/Answer.model')
const User   = mongoose.model('user')
const Post   = mongoose.model('post')
const Answer = mongoose.model('answer')



async function getUser(uname, password) {
    let error = {
        title: "",
        message: ""
    }

    const user = await User.findOne({ login: uname })

    if (user === null) {
        error.title = "User is not exist"
        error.message = "Current user is not exist"
        return error
    }
    if (user.password !== password) {
        error.title = "Wrong password field"
        error.message = "Password doesn't match"
        return error
    }

    return user
}



//
// Creates new user
// @return error || 0
function createUser(login, password)
{
    let error = {
        title: "",
        message: ""
    }

    let passwordParams = validator.checkPassword(password)

    if (!passwordParams.lower) {
        error.title = "Wrong password field"
        error.message = "Password doesn't contains lower case characters!"
        return error
    }
    if (!passwordParams.upper) {
        error.title = "Wrong password field"
        error.message = "Password doesn't contains upper case characters!"
        return error
    }
    if (!passwordParams.special) {
        error.title = "Wrong password field"
        error.message = "Password doesn't contains special characters!"
        return error
    }
    if (!passwordParams.toolong) {
        error.title = "Wrong password field"
        error.message = "Password is too small"
        return error
    }

    let user = new User()
    user.login = login
    user.password = password
    user.isAdmin = false
    user.time = Date.now()
    user.save().then()
}



//
// Get all poster cards from Database
// @return posts
async function getPosts() {
    return await Post.find({})
}



//
// Creates new post
// @return 0
function createPost(user, password, title, src)
{
    let post = new Post()
    let date = new Date
    post.user = user
    post.title = title
    post.src = src
    post.time = date.getTime()
    post.save().then()
}



//
// Get all Answers to post from Database
// @return answers
async function getAnswers(postId) {
    return await Answer.find({ postId: postId })
}



//
// Creates new answer
// @return 0
async function createAnswer(postId, login, password, src)
{
    let error = {
        title: "",
        message: ""
    }

    if (login === undefined) {
        error.title = "Unknown user!"
        error.message = "You are not log in"
        return error
    }

    const user = await getUser(login, password)
    if (user.title)
        return user

    let answer = new Answer()
    answer.postId = postId
    answer.user = login
    answer.src = src
    answer.time = Date.now()
    answer.save().then()
}



module.exports =
    {
        getUser: getUser,
        createUser: createUser,
        getPosts: getPosts,
        createPost: createPost,
        getAnswers: getAnswers,
        createAnswer: createAnswer
    }