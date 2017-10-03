const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Adherent = new Schema({
  User: ObjectId,
  Adhesion: [ObjectId]
  //location: {
   //   type: [Number],
    //  index: '2d'},
});

module.exports = mongoose.model('Adherent', Adherent);
