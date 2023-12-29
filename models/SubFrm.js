const { Schema, model } = require("mongoose");
const postSchema = require("./Post");

const subFrmSchema = new Schema({
    buying: [postSchema],
    selling: [postSchema],
    discussion: [postSchema]
},
{
    toJSON: {
        virtuals: true,
    }
});

const SubFrm = model("SubFrm", subFrmSchema);

module.exports = SubFrm;