const mongoose = require("mongoose");

const schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    number: String,
    key: String,
    inAttention:Boolean,
    attended:Boolean,
    sendSmsCreate:Boolean,
    inUse:Boolean,
    phone:String,
    office:Object
    
});



module.exports = mongoose.model("turns", schema);