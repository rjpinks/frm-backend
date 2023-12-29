const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = require("bson");
const postSchema = require("./Post");

function checkEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};


const userSchema = new Schema({
    username: {
        type: String,
        required: "A username is required",
        unique: true,
        minlength: 1,
        maxlength: 25
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "An email address is required",
        validate: [checkEmail, "Check the format of the email"],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
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

// set up pre-save middleware to create password
profileSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;