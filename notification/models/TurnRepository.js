const Turn = require('./Turn');
const {getValue} = require('./ParameterRepository');
const CONSTANTS  =  require('./Constant');
const mongoose = require('mongoose');

function updateInUse(_id) {
    const update = Turn.updateOne({ _id: _id }, { inUse: true }, { upsert: false });
    update.then(_ => console.log(_));
}

function updateSmsCreateSend(_id) {
    const update = Turn.updateOne({ _id: _id }, { sendSmsCreate: true ,inUse:false }, { upsert: false });
    update.then(_ => console.log("TURNO "+_id+" SMS NUEVO ENVIADO"));
}

function updateSmsNext(_id) {
    const update = Turn.updateOne({ _id: _id }, { sendSmsNext: true }, { upsert: false });
    update.then(_ => console.log("TURNO "+_id+" SMS PROXIMO ENVIADO"));
}


async function getTurnsCreatePendingNotification() {
    const uuid = now('nano');
    await Turn.updateMany({
        $and: [{ 'sendSmsCreate': false },
        { 'attended': false },
       // { 'inAttention': false },
        { 'inUse': false },
        { 'dateCreate': getDate() },
        ]
    }, { $set: {'cronUUID': uuid ,'inUse':true }})
    .sort({ 'number': 1 }).limit(parseInt(CONSTANTS.LIMIT_NOTIFICACION_CRON));
    
    const turns = await Turn.find({ 'cronUUID': uuid }).sort({ 'number': 1 });
    
    return turns;
}

async function getTurnsPendingByOfficeAnArea(officeId,areaId, limit){
  return await Turn.find({'office._id':officeId,
                          'area._id':areaId,
                         'dateCreate': getDate(),
                         'attended' : false,
                        'inAttention': false
                     }).sort({'number': 1}).limit(limit);
}


async function getGroupPending() {

    const uuid =  now('nano');
    let result = await Turn.aggregate([
        
        { $match: { "dateCreate": getDate(), 
                    "inAttention": false, 
                    "attended": false } }, 
        { $group: { _id: { area: '$area._id', office: '$office._id' }, 
            total: { $sum: 1 }
        }
        }]).limit(parseInt(CONSTANTS.LIMIT_NOTIFICACION_CRON));

        return result;
}




function getDate() {
    const ts = Date.now();
    const date_ob = new Date(ts);
    const date = date_ob.getDate().toString().padStart(2, '00');
    const month = (date_ob.getMonth() + 1).toString().padStart(2, '00');
    const year = date_ob.getFullYear();
    return `${year}-${month}-${date}`;
}

function  now(unit) {

    const hrTime = process.hrtime();

    switch (unit) {

        case 'milli':
            return hrTime[0] * 1000 + hrTime[1] / 1000000;

        case 'micro':
            return hrTime[0] * 1000000 + hrTime[1] / 1000;

        case 'nano':
        default:
            return hrTime[0] * 1000000000 + hrTime[1];
    }
};


module.exports = {
    updateInUse,
    updateSmsCreateSend,
    getTurnsCreatePendingNotification,
    getGroupPending,
    getTurnsPendingByOfficeAnArea,
    updateSmsNext
};