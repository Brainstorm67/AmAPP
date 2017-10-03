const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  firstname: String,
  lastname: String,
  birthdate: Date,
  email: String,
  adresse: String,
  login: String,
  password: String,
  voiture: boolean
  //location: {
   //   type: [Number],
    //  index: '2d'},
});

module.exports = mongoose.model('User', User);
