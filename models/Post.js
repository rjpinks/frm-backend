const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    poster: {
        type: String,
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
        default: Date.now
    },
    subFrm: {
        type: String,
        require: true
    },
    //posts: [postSchema]
},
{
    toJSON: {
        virtuals: true,
    }
});

//const Post = model("Post", postSchema);

module.exports = postSchema;