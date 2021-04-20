const mongoose = require("mongoose");

const schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    key: String,
    value:String

});



module.exports = mongoose.model("parameters", schema);