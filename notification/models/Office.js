const mongoose = require("mongoose");

const schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    key: String,
    notificationNext: Number

});



module.exports = mongoose.model("offices", schema);