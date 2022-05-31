const mongoose = require('mongoose')

var postSchema = new mongoose.Schema
({
        user:
            {
                type: String
            },
        title:
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
        realTime:
            {
              type: String
            },
        topic:
            {
                type: String,
                default: 'All topics'
            },
        likes:
            {
                type: Array
            },
        dislikes:
            {
                type: Array
            },
        visible:
            {
                type: Boolean,
                default: false
            },
        link:
            {
                type: String
            }
    }
)

mongoose.model("post", postSchema)