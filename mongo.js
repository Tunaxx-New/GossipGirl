const mongoose  = require('mongoose')
const utils     = require('./utils.js')
const validator = require('./database/validator.js')

//mongodb+srv://gg:wp@cluster0.2qhvm.mongodb.net/GossipGirl?retryWrites=true&w=majority
//mongodb://127.0.0.1:27017/GossipGirl
const uri = "mongodb+srv://gg:wp@cluster0.2qhvm.mongodb.net/GossipGirl?retryWrites=true&w=majority"
let db

mongoose.connect(uri, { useNewUrlParser: true }, err => {
    if (!err) {
        console.log("Connection succeeded")
        db = mongoose.connection
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
//
//
async function getUserBy(key, value)
{
    var query = {}
    query[key] = value
    return await User.findOne(query)
}



//
//
//
async function getUsersBy(key, value)
{
    var query = {}
    query[key] = value
    return await User.find(query)
}



//
// Creates new user
// @return error || 0
async function createUser(body)
{
    let error = {
        title: "",
        message: ""
    }

    let passwordParams = validator.checkPassword(body.password)
    let loginParams = validator.checkPassword(body.login)

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
    if (loginParams.special) {
        error.title = "Login contains special characters"
        error.message = "Please try to not use special characters in login"
        return error
    }

    const existLogin = await getUserBy('login', body.login)
    if (existLogin) {
        error.title = "User exist"
        error.message = "Please choose another login!"
        return error
    }
    const existEmail = await getUserBy('email', body.email)
    if (existEmail) {
        error.title = "Email exist"
        error.message = "Please choose another email!"
        return error
    }

    let user = new User()
    user.login = body.login
    user.password = body.password
    user.isAdmin = false
    let date = new Date
    let time = date.getSeconds() + ':' + date.getMinutes() + ':' + date.getHours() + ':' + date.getDate() + ':' + (date.getMonth() + 1) + ':' + date.getFullYear()
    user.time = time
    user.email = body.email
    user.barcode = body.barcode
    user.socials = {
        vk: '',
        github: '',
        instagram: '',
        twitter: '',
        telegram: ''
    }
    user.save().then()
}



//
// Create user by admin
//
async function createUserByAdmin(body) {

    let user = new User()
    user.login = body.login
    user.password = body.password
    if (body.isAdmin === 'true')
        user.isAdmin = true
    else
        user.isAdmin = false
    user.city = body.city
    let date = new Date
    let time = date.getSeconds() + ':' + date.getMinutes() + ':' + date.getHours() + ':' + date.getDay() + ':' + (date.getMonth() + 1) + ':' + date.getFullYear()
    user.time = time
    user.email = body.email
    user.barcode = body.barcode
    user.save().then()
}



//
// Get all poster cards from Database
// @return posts
async function getPosts() {
    return await Post.find({})
}



//
// Get all poster cards from Database
// @return posts
async function getPostsBy(key, value) {
    var query = {}
    query[key] = value
    return await Post.find(query)
}



//
// Get all poster cards from Database
// @return posts
async function getSortedPosts(key, value) {
    var query = {}
    query[key] = value
    return await Post.find().sort(query)
}



//
// Get all poster cards from Database
// @return posts
async function getPostsByMany(keys, values) {
    var query = {}
    for (let i = 0; i < keys.length; i++)
        if (!(keys[i] === 'topic' && values[i] === 'All topics'))
            query[keys[i]] = values[i]
    return await Post.find(query)
}



//
// Creates new post
// @return 0
async function createPost(user, password, data)
{
    let post = new Post()
    let date = new Date
    let time = date.getSeconds() + ':' + date.getMinutes() + ':' + date.getHours() + ':' + date.getDate() + ':' + (date.getMonth() + 1) + ':' + date.getFullYear()
    post.user = user

    const topics = await getTopics()
    if (topics.list.includes(data.topic)) {
        post.topic = data.topic
    } else {
        post.topic = 'All topics'
    }

    post.src = data.src
    post.link = data.url
    post.time = time
    post.title = data.title
    post.realTime = time.split("").reverse().join("")
    post.save().then()
}



//
// Get all Answers to post from Database
// @return answers
async function getAnswers(postId, parent) {
    let date = new Date()
    let current = date.getSeconds() + ':' + date.getMinutes() + ':' + date.getHours() + ':' + date.getDate() + ':' + (date.getMonth() + 1) + ':' + date.getFullYear()
    const answers = await Answer.find({postId: postId , parent: parent })
    for (let i = 0; i < answers.length; i++)
        changeAnswer({ _id: answers[i]._id }, { timeAgo: utils.deltaTime(current, answers[i].time) })
    return await Answer.find({postId: postId , parent: parent })
}



//
// Creates new answer
// @return 0
async function createAnswer(data)
{
    let error = {
        title: "",
        message: ""
    }

    if (data.user.login === undefined) {
        error.title = "Unknown user!"
        error.message = "You are not log in"
        return error
    }

    const user = await getUser(data.user.login, data.password)
    if (user.title)
        return user

    let answer = new Answer()
    let date = new Date()
    let time = date.getSeconds() + ':' + date.getMinutes() + ':' + date.getHours() + ':' + date.getDate() + ':' + (date.getMonth() + 1) + ':' + date.getFullYear()

    answer.postId = data.id
    answer.user = data.user
    answer.src = data.src
    answer.time = time
    answer.realTime = time.split("").reverse().join("")
    answer.parent = data.parent
    answer.save().then()
}



function changeAnswer(filter, options)
{
    Answer.updateMany(filter, { $set: options }).then((err) => {})
}




function changePost(filter, options)
{
    Post.updateMany(filter, { $set: options }).then((err) => {})
}




//
// Getting topics from already assets collection
// {
//  type: topics
//  list: array<string>
// }
async function getTopics()
{
    const cursor = await db.collection('assets').findOne({type: 'topics'})
    const topics = await cursor
    return topics
}


// CHECKING PASSWORD IS REQUIRED!
function changeUser(login, key, value)
{
    var query = {}
    query[key] = value
    User.updateOne({ login: login }, { $set: query }).then((err) => {})
}



//
// Get all users sorted
//
async function getSortedUsers(key, by) {
    var query = {}
    query[key] = by
    return await User.find({}).sort(query)
}



//
// Send a password
//



//
// Like
//
async function like(postId, login, password) {
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


}



//
// Accept or delete post
//
async function postActions(key, id) {
    if(key == 1) {
        Post.updateOne({_id: id}, {$set: {visible: true}}).then()
    } else {
        Answer.deleteMany({postId: id}).then()
        Post.deleteOne({_id: id}).then()
    }
}



//
// Delete existed user
//
async function deleteUser(id) {
    await User.deleteOne({_id: id})
}



//
// Editing user in admin panel
//
async function editUser(changes, id) {
    await User.updateOne({_id: id}, {$set: {login: changes.username, password: changes.password, email: changes.email, city: changes.city, isAdmin: changes.NewUserPrivilege}}).then()
}



//
// Set like with checking if like exist or dislike
//
async function setDLike(login, id, type, likeType) {
    let object
    if (type === 'post') {
        object = await getPostsBy('_id', id)
        object = object[0]
        if (likeType === 'like') {
            if (object.dislikes.includes(login, 0)) {
                Post.updateOne({_id: id}, { $pull: {dislikes: login} }).then((err) => {})
            }
            if (!object.likes.includes(login, 0)) {
                Post.updateOne({_id: id}, { $push: {likes: login} }).then((err) => {})
            }
        } else if (likeType === 'dislike') {
            if (object.likes.includes(login, 0)) {
                Post.updateOne({_id: id}, { $pull: {likes: login} }).then((err) => {})
            }
            if (!object.dislikes.includes(login, 0)) {
                Post.updateOne({_id: id}, { $push: {dislikes: login} }).then((err) => {})
            }
        }
    } else if (type === 'answer') {
        object = await Answer.findOne({_id: id}).then()
        if (likeType === 'like') {
            if (object.dislikes.includes(login, 0)) {
                Answer.updateOne({_id: id}, { $pull: {dislikes: login} }).then((err) => {})
            }
            if (!object.likes.includes(login, 0)) {
                Answer.updateOne({_id: id}, { $push: {likes: login} }).then((err) => {})
            }
        } else if (likeType === 'dislike') {
            if (object.likes.includes(login, 0)) {
                Answer.updateOne({_id: id}, { $pull: {likes: login} }).then((err) => {})
            }
            if (!object.dislikes.includes(login, 0)) {
                Answer.updateOne({_id: id}, { $push: {dislikes: login} }).then((err) => {})
            }
        }
    }
}



//
// Delete answer by admin
//
async function deleteAnswer(id) {
    const anodes = await Answer.find({parent: id})
    for (let i = 0; i < anodes.length; i++)
        await deleteAnswer(anodes[i]._id)
    await Answer.deleteOne({_id: id}).then()
}



async function friend(login, friend, command) {
    const user = await getUserBy('login', login)
    if (command === 'add') {
        if (!user.friends.find(e => e.login === friend)) {
            const date = new Date()
            const frd = await getUserBy('login', friend)
            const obj = {
                time: date.getTime(),
                login: friend,
                confirmed: false,
                realFriend: false,
                avatarExtension: frd.avatarExtension
            }
            User.updateOne({login: login}, {$push: {friends: obj}}).then((err) => {})
            obj.login = login
            obj.confirmed = true
            avatarExtension = user.avatarExtension
            User.updateOne({login: friend}, {$push: {friends: obj}}).then((err) => {})
        }
    } else if (command === 'show') {
        console.log(user.friends.find(friend))
    } else if (command === 'confirm') {
        db.collection('users').update({login: friend, "friends.login": login}, {$set: {"friends.$.confirmed": true, "friends.$.realFriend": true}}, {multi: true}).then((err) => {})
        db.collection('users').update({login: login, "friends.login": friend}, {$set: {"friends.$.confirmed": true, "friends.$.realFriend": true}}, {multi: true}).then((err) => {})
    } else if (command === 'delete') {
        db.collection('users').update({login: login}, {$pull: {friends: {login: friend}}}, {multi: true}).then((err) => {})
        db.collection('users').update({login: friend}, {$pull: {friends: {login: login}}}, {multi: true}).then((err) => {})
    }
}



//
// Update the social networks
//
async function changeSocialNetworks(changes, id){
    await User.updateOne({_id: id}, {$set: {"socials.vk": changes.vk, "socials.github": changes.github, "socials.twitter": changes.twitter, "socials.instagram": changes.instagram, "socials.telegram": changes.telegram}}).then()
}

module.exports =
    {
        getUser: getUser,
        getUserBy: getUserBy,
        getUsersBy: getUsersBy,
        createUser: createUser,
        createUserByAdmin: createUserByAdmin,
        getPosts: getPosts,
        getPostsBy: getPostsBy,
        getSortedPosts: getSortedPosts,
        getPostsByMany: getPostsByMany,
        createPost: createPost,
        getAnswers: getAnswers,
        createAnswer: createAnswer,

        changePost: changePost,
        changeAnswer: changeAnswer,
        getTopics: getTopics,
        changeUser: changeUser,
        getSortedUsers: getSortedUsers,
        postActions: postActions,
        deleteUser: deleteUser,
        editUser: editUser,

        setDLike: setDLike,
        deleteAnswer: deleteAnswer,

        friend: friend,

        changeSocialNetworks:changeSocialNetworks
    }