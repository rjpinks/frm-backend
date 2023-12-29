const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    poster: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
        minlength: 25,
        maxlength: 500
    },
    date: {
        type: Date,
        required: true
    },
    posts: [postSchema]
},
{
    toJSON: {
        virtuals: true,
    }
});

const Post = model("Post", postSchema);

module.exports = Post;