const { Schema, model } = require("mongoose");

const subFrmSchema = new Schema({
    buying: [posts],
    selling: [posts],
    discussion: [posts]
},
{
    toJSON: {
        virtuals: true,
    }
});

const SubFrm = model("SubFrm", subFrmSchema);

module.exports = SubFrm;