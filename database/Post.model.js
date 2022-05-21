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
        }
})

mongoose.model("post", postSchema)