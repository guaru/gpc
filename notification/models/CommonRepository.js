const Office = require('./Office');
const mongoose = require('mongoose');

async function getOffice(id) {
  return  await Office.findOne({ _id: id });
}

module.exports = {
    getOffice
};