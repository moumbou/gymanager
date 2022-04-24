const { default: mongoose } = require("mongoose");

const caisseSchema = new mongoose.Schema({
  responsableID: mongoose.Types.ObjectId,
  clientID: mongoose.Types.ObjectId,
  responsableName: String,
  clientName: String,
  clientPrenom: String,
  prix: Number,
  note: String,
});

module.exports.caisseModal = mongoose.model("argent", caisseSchema);
