const mongoose =  require('mongoose');
const { getTurnsCreatePendingNotification,
    updateInUse, getGroupPending, getTurnsPendingByOfficeAnArea, updateSmsNext} =  require('./models/TurnRepository');
const {getOffice}  = require('./models/CommonRepository');
const sms =  require('./sendSms');
const asyncEach = require('async-each');

async function startNotificationCreate() { 
    try
    {
        console.log("START NOTIFICATION ");
        const turns = await getTurnsCreatePendingNotification();
       turns.forEach( _turn=>{
           updateInUse(_turn._id);
           const message = 'Turno '+ _turn.key+'-'+_turn.number +' valido en sucursal '+ _turn.office.name ;
           console.log("SMS CREATE ENVIADO " + _turn.key + '-' + _turn.number);
           sms.sendSMS('+52'+_turn.phone,message,_turn._id,true);
       });

    }catch(error)
    {
        console.error('ERROR NOTIFICACION TURNOS SMS INICIAL'+ error);
    }
 }

async function notificationNext(officeId,areaId) {
    try {
        const office = await getOffice(officeId);
        const turns = await getTurnsPendingByOfficeAnArea(officeId, areaId, office.notificationNext);
        if(turns)
        {
        console.log(turns.length);
            turns.forEach(async _turn=>{
                if (!_turn.sendSmsNext) {
                    console.log("SMS  SIGUIENTE ENVIADO " + _turn.key + '-' + _turn.number);
                    const message = 'Su turno ' + _turn.key + '-' + _turn.number + ', está proximo para ingresar a la sucursal  ' + _turn.office.name;
                    sms.sendSMS('+52' + _turn.phone, message, _turn._id, false);
                    updateSmsNext(_turn._id);
                }
            });
        }
        
    } catch (error) {
        console.error('ERROR NOTIFICACION TURNOS SMS NEXT' + error);
    }
}





module.exports.startNotificationCreate = startNotificationCreate;
module.exports.notificationNext = notificationNext;