const mongoose = require("mongoose");

const subscribersSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  pictureProfile: String,
  adresse: String,
  birthDay: Number,
  dateDebut: Number,
  sex: String,
  code: String,
  numPrincipale: String,
  numSecondaire: String,
  credit: Number,
  dette: Number,
  sub: Object,
});

module.exports.subscriberModel = mongoose.model(
  "subscriber",
  subscribersSchema
);
