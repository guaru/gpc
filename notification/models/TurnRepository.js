const Turn = require('./Turn');
const mongoose = require('mongoose');

function updateInUse(_id) {
    const update = Turn.updateOne({ _id: _id }, { inUse: true }, { upsert: false });
    update.then(_ => console.log(_));
}

function updateSmsCreateSend(_id) {
    const update = Turn.updateOne({ _id: _id }, { sendSmsCreate: true }, { upsert: false });
    update.then(_ => console.log(_));
}


async function getTurnsCreatePendingNotification() {
    const turns = await Turn.find({
        $and: [{ 'sendSmsCreate': false },
        { 'attended': false },
        { 'inAttention': false },
        { 'inUse': false },
        { 'dateCreate': getDate() }]
    });
    return turns;
}

function getDate() {
    const ts = Date.now();
    const date_ob = new Date(ts);
    const date = date_ob.getDate().toString().padStart(2, '00');
    const month = (date_ob.getMonth() + 1).toString().padStart(2, '00');
    const year = date_ob.getFullYear();
    return `${year}-${month}-${date}`;
}


module.exports = {
    updateInUse,
    updateSmsCreateSend,
    getTurnsCreatePendingNotification
};