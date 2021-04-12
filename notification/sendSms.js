const querystring = require('querystring');
const http = require('http');
const {updateSmsCreateSend} = require('./models/TurnRepository');

 function sendSMS( tel, text, idTurn) {
    // Se contruye la cadena del post desde un objeto
    var post_data = querystring.stringify({
        'cmd': 'sendsms',
        'domainId': process.env.SMS_DOMAIN,
        'login': process.env.SMS_LOGIN,
        'passwd': process.env.SMS_PASSWD,
        'dest': tel,
        'msg': text
    });

    // Un objeto de opciones sobre donde se envia el post
    var post_options = {
        host: process.env.SMS_HOST,
        port: process.env.SMS_PORT,
        path: process.env.SMS_PATH,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };

    // Se efectua la petición
    var post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            //Es necesario procesar la respuesta y los posibles errores
            console.log('Response: ' + chunk);
            updateSmsCreateSend(idTurn);
        });
    });

     mongodb://administrador:qwertyui@192.168.200.89:27017/?authSource=admin&readPreference=primary&ssl=false

    // post the data
    post_req.write(post_data);
    post_req.end();

}

module.exports.sendSMS =  sendSMS;