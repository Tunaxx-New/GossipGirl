const mongoose = require('mongoose')

var answerSchema = mongoose.Schema
({
    user:
        {
            type: String
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
        }
})

mongoose.model("answer", answerSchema)