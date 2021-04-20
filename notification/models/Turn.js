const mongoose = require("mongoose");

const schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    number: String,
    key: String,
    inAttention:Boolean,
    attended:Boolean,
    sendSmsCreate:Boolean,
    sendSmsNext:Boolean,
    inUse:Boolean,
    phone:String,
    office: { _id: mongoose.Types.ObjectId, name:String },
    area: { _id: mongoose.Types.ObjectId , name:String},
    cronUUID:String
    
});



module.exports = mongoose.model("turns", schema);