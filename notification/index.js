const cron = require('node-cron');
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./models/database/config');
const notification =  require('./notification');
const socketClient = require('./socket-client');


    app = express();
    dbConnection();
    socketClient.initSocket();
  
    cron.schedule('* * * * *', function () {
         notification.startNotificationCreate();
    });


    app.listen(process.env.PORT,_=>console.log("RUN NOTIFICATION SERVICE"));
