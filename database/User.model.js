const mongoose = require('mongoose')

var userSchema = new mongoose.Schema
({
    login:
        {
            type: String
        },
    password:
        {
            type: String
        },
    isAdmin:
        {
            type: Boolean
        },
    email:
        {
            type: String
        },
    time:
        {
            type: String
        }
})

mongoose.model("user", userSchema)