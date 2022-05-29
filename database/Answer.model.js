const mongoose = require('mongoose')

var answerSchema = mongoose.Schema
({
    user:
        {
            type: Object,
            login: {
                type: String
            },
            avatarExtension: {
                type: String,
            }
        },
    postId:
        {
            type: String
        },
    src:
        {
            type: String
        },
    time:
        {
            type: String
        },
    timeAgo:
        {
            type: String
        },
    parent:
        {
            type: String,
            default: 'post'
        },
    likes:
        {
            type: Array
        },
    dislikes:
        {
            type: Array
        }
})

mongoose.model("answer", answerSchema)