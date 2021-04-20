const Parameter = require('./Parameter');
const mongoose = require('mongoose');

async function getValue(key){
   const result = await Parameter.findOne({key});
   return  result.value ;
}

module.exports = {
    getValue
};