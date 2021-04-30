const Stomp = require('stompjs');
const SockJS = require('sockjs-client');
const notification =  require('./notification');
const url = process.env.SOCKET_HOST + 'socket-turnador';
const sock = new SockJS(url);
const stompClient = Stomp.over(sock);

const initSocket = ()=> {

    console.log("URL SOCKET:"+url);

    const callback = function (obj) {
       const msg = JSON.parse(obj.body); 
        console.log(msg);
       notification.notificationNext(msg.officeId,msg.areaId);
    };

    sock.onopen = function () {
        console.log('open');
    };

    sock.onclose = function () {
        console.log('close');
    };

    stompClient.connect({}, function (frame) {
        console.log("SCOKET CONNECTED");
        stompClient.subscribe('/api/turnador/next', callback);
    });
};


module.exports = {
    initSocket
};