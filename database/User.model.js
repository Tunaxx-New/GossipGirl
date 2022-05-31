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
        },
    socials: {
        type: Object,
        vk:
            {
                type: String,
                default: ""
            },
        github:
            {
                type: String,
                default: ""
            },
        twitter:
            {
                type: String,
                default: ""
            },
        instagram:
            {
                type: String,
                default: ""
            },
        telegram:
            {
                type: String,
                default: ""
            }
    }
})

mongoose.model("user", userSchema)