const { default: mongoose } = require("mongoose");
const { subsModal } = require("../models/subs");

module.exports.addSub = async (args) => {
  const { nom, mois, seances, prix, type } = args;
  const sub = new subsModal({
    nom,
    mois,
    seances,
    prix,
    type,
  });

  try {
    await sub.save();
    return {
      err: false,
      message: `l'abonnement ${nom} pour ${type} est ajouter avec succée !`,
    };
  } catch (error) {
    return {
      err: true,
      message: `une erreur c'est produite ! regadez le message si dessous`,
      errMsg: error.message,
    };
  }
};

module.exports.getSubs = async () => {
  const subs = await subsModal.find();
  return {
    err: false,
    message: "",
    result: subs,
  };
};

module.exports.deleteSub = async (id) => {
  const sub = await subsModal.findByIdAndRemove(mongoose.Types.ObjectId(id));
  if (sub) {
    return {
      err: false,
      message: `la supression de l'abonnement "${sub.nom}" a était effectué avec succée !`,
    };
  } else {
    return {
      err: true,
      message: `aucun abonnement n'exsiste avec cet ID !`,
    };
  }
};

module.exports.editSub = async (args) => {
  const { _id, nom, mois, seances, prix, type } = args;

  const sub = await subsModal.findById(mongoose.Types.ObjectId(_id));
  const lastName = sub.nom;
  sub.nom = nom;
  sub.mois = mois;
  sub.seances = seances;
  sub.prix = prix;
  sub.type = type;

  await sub.save();
  return {
    err: false,
    message: `la modification de l'abonnement "${lastName}" a était modifié avec succée`,
  };
};
