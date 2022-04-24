const { default: mongoose } = require("mongoose");

const pointageSchema = new mongoose.Schema({
  subID: mongoose.Types.ObjectId,
  subName: String,
  date: Number,
  nom: String,
  prenom: String,
  birthDay: Number,
  userName: String,
  subscriberID: mongoose.Types.ObjectId,
});

module.exports.pointageModel = mongoose.model("pointage", pointageSchema);
