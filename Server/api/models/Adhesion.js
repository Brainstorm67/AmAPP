const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Adhesion = new Schema({
  User: ObjectId,
  
  //location: {
   //   type: [Number],
    //  index: '2d'},
});

module.exports = mongoose.model('Adhesion', Adhesion);
