const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    images: {
        type: Array,
        require: false
    },
    createBy: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        require: true
    }

})

exports.Post = new mongoose.model("Post", postSchema)