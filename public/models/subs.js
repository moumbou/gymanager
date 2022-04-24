const { default: mongoose } = require("mongoose");

const subsSchema = new mongoose.Schema({
  nom: String,
  mois: Number,
  seances: Number,
  prix: Number,
  type: String,
});

module.exports.subsModal = mongoose.model("sub", subsSchema);
