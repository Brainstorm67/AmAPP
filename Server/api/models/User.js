const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  firstname: String,
  lastname: String,
  birthdate: Date,
  email: String,
  adresse: String,
  password: String,
  voiture: boolean,
  Adhesion: [ObjectId]
  //location: {
   //   type: [Number],
    //  index: '2d'},
});

module.exports = mongoose.model('User', User);
