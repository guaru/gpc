const mongoose =  require('mongoose');
const {getTurnsCreatePendingNotification,updateInUse} =  require('./models/TurnRepository');
const sms =  require('./sendSms');

async function startNotificationCreate() { 
    try
    {
        console.log("START NOTIFICATION ");
       const turns = await getTurnsCreatePendingNotification();
       turns.forEach( _turn=>{
           updateInUse(_turn._id);
           const message = 'Turno '+ _turn.key+'-'+_turn.number +' valido en sucursal '+ _turn.office.name ;
           sms.sendSMS('+52'+_turn.phone,message,_turn._id);
       });

    }catch(error)
    {
        console.error('ERROR NOTIFICACION TURNOS SMS INICIAL'+ error);
    }
 }



module.exports.startNotificationCreate = startNotificationCreate;