const mongoose = require('mongoose')

var userSchema = new mongoose.Schema
({
    login:
        {
            type: String
        },
    name:
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
        },
    avatarExtension:
        {
            type: String,
            default: '.png'
        },
    city:
        {
            type: String,
            default: ''
        },
    barcode:
        {
            type: String
        },
    isConfirmedEmail:
        {
            type: Boolean,
            default: false
        },
    friends:
        {
            type: Array
        }
})

mongoose.model("user", userSchema)