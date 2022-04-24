const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");
const { default: mongoose } = require("mongoose");
const { subscriberModel } = require("../models/subscribers");
const { caisseModal } = require("../models/caisse");
const { subsModal } = require("../models/subs");
const { pointageModel } = require("../models/pointage");

module.exports.addSubscriber = async (args) => {
  let {
    adresse,
    birthDay,
    code,
    credit,
    dateDebut,
    dette,
    nom,
    numPrincipale,
    numSecondaire,
    pictureProfile,
    prenom,
    sex,
  } = args;

  if (pictureProfile) {
    const dataFile = fs.readFileSync(path.resolve(__dirname, "../../../data.json"));
    let fileStore = JSON.parse(dataFile);
    fileStore = fileStore.file_store_img;
    const id = mongoose.Types.ObjectId();

    const extention = path.extname(pictureProfile);
    try {
      fs.copyFileSync(
        pictureProfile,
        path.join(fileURLToPath(fileStore), id + extention)
      );
      pictureProfile = id + extention;
    } catch (err) {
      return {
        err: true,
        message: `erreur l'ors de l'ajout de la photo !`,
        errMsg: err.message,
      };
    }
  }

  const subscriber = new subscriberModel({
    nom,
    prenom,
    pictureProfile,
    adresse,
    birthDay,
    dateDebut,
    sex,
    code: code ? code : mongoose.Types.ObjectId(),
    numPrincipale,
    numSecondaire,
    credit,
    dette,
    sub: null,
  });

  return {
    err: false,
    message: `abonnée ajouter avec succée !`,
    result: await subscriber.save(),
  };
};

module.exports.getSubscribers = async (args) => {
  if (args === "super-admine" || args === "admine")
    return {
      err: false,
      message: "",
      result: await subscriberModel.find(),
    };
  if (args === "homme")
    return {
      err: false,
      message: "",
      result: await subscriberModel.find({ sex: "H" }),
    };
  if (args === "femme")
    return {
      err: false,
      message: "",
      result: await subscriberModel.find({ sex: "F" }),
    };
};

module.exports.deleteSubscriber = async (id) => {
  try {
    const subscriber = await subscriberModel.findByIdAndDelete(
      mongoose.Types.ObjectId(id)
    );
    if (subscriber) {
      if (subscriber.pictureProfile) {
        const dataFile = fs.readFileSync(
          path.resolve(__dirname, "../../../data.json")
        );
        let fileStore = JSON.parse(dataFile);
        fileStore = fileStore.file_store_img;

        fs.unlinkSync(
          path.join(fileURLToPath(fileStore), subscriber.pictureProfile)
        );
      }

      return {
        err: false,
        message: `la supression de ${subscriber.nom.toUpperCase()} ${subscriber.prenom.toUpperCase()} a était faite avec succée !`,
        result: null,
      };
    }

    return {
      err: true,
      message: `aucun utilisateur n'existe avec cette ID !`,
    };
  } catch (error) {
    return {
      err: true,
      message: `erreur serveur veillez consultez le programmeur en lui envoyant l'erreur si dessous`,
      errMsg: error.message,
    };
  }
};

module.exports.editSubscriber = async (args) => {
  let {
    _id,
    nom,
    prenom,
    pictureProfile,
    adresse,
    birthDay,
    dateDebut,
    sex,
    numPrincipale,
    numSecondaire,
    credit,
    dette,
  } = args;

  try {
    const subscriber = await subscriberModel.findById(
      mongoose.Types.ObjectId(_id)
    );
    if (subscriber.nom !== nom) subscriber.nom = nom;
    if (subscriber.prenom !== prenom) subscriber.prenom = prenom;

    //? EDIT SUBSCRIBER PICTURE ON CHANGE
    if (pictureProfile && subscriber.pictureProfile !== pictureProfile) {
      //? GET THE FOLDER PATH OF PICTURES
      const dataFile = fs.readFileSync(path.resolve(__dirname, "../../../data.json"));
      let fileStore = JSON.parse(dataFile);
      fileStore = fileStore.file_store_img;

      //? DELETE THE OLD PICTURE
      if (subscriber.pictureProfile)
        fs.unlinkSync(
          path.join(fileURLToPath(fileStore), subscriber.pictureProfile)
        );

      //? CREATE AN ID AND GET THE EXTENTION FILE
      const id = mongoose.Types.ObjectId();
      const extention = path.extname(pictureProfile);

      //? COPY THE CURRENT PICTURE TO THE NEW FOLDER WITH A NEW NAME
      fs.copyFileSync(
        pictureProfile,
        path.join(fileURLToPath(fileStore), id + extention)
      );
      pictureProfile = id + extention;

      subscriber.pictureProfile = pictureProfile;
    }
    if (subscriber.adresse !== adresse) subscriber.adresse = adresse;
    if (subscriber.birthDay !== birthDay) subscriber.birthDay = birthDay;
    if (subscriber.dateDebut !== dateDebut) subscriber.dateDebut = dateDebut;
    if (subscriber.sex !== sex) subscriber.sex = sex;
    if (subscriber.numPrincipale !== numPrincipale)
      subscriber.numPrincipale = numPrincipale;
    if (subscriber.numSecondaire !== numSecondaire)
      subscriber.numSecondaire = numSecondaire;
    if (subscriber.credit !== credit) subscriber.credit = credit;
    if (subscriber.dette !== dette) subscriber.dette = dette;

    await subscriber.save();

    return {
      err: false,
      message: `le profile de l'abonné "${
        nom + " " + prenom
      }" a etait mise a jour avec succée !`,
    };
  } catch (error) {
    return {
      err: true,
      message: `une erreur c'est produite l'ors de la mise a jours plus de si dessous`,
      errMsg: error.message,
    };
  }
};

module.exports.addSub = async (args) => {
  const { sub, subscriber, methode, user } = args;

  try {
    const getsubscriber = await subscriberModel.findById(
      mongoose.Types.ObjectId(subscriber._id)
    );
    const getSub = await subsModal.findById(mongoose.Types.ObjectId(sub.sub));

    if (methode === "credit") {
      getsubscriber.credit = getsubscriber.credit - sub.prix;

      getsubscriber.sub = {
        ID: mongoose.Types.ObjectId(sub.sub),
        subName: sub.subName,
        debutSub: new Date(sub.debutSub).setHours(0, 0, 0, 0),
        endSub: new Date(sub.endSub).setHours(0, 0, 0, 0),
        mois: sub.mois,
        prix: sub.prix,
        seances: sub.seances,
        officielSeance: getSub.seances,
      };
      await getsubscriber.save();

      const checkOut = new caisseModal({
        responsableID: mongoose.Types.ObjectId(user._id),
        clientID: mongoose.Types.ObjectId(subscriber._id),
        responsableName: user.name,
        clientName: subscriber.nom,
        clientPrenom: subscriber.prenom,
        prix: sub.prix,
        note: `achat abonnement par crédit`,
      });

      await checkOut.save();
    }
    if (methode === "cache") {
      getsubscriber.sub = {
        ID: mongoose.Types.ObjectId(sub.sub),
        subName: sub.subName,
        debutSub: new Date(sub.debutSub).setHours(0, 0, 0, 0),
        endSub: new Date(sub.endSub).setHours(0, 0, 0, 0),

        mois: sub.mois,
        prix: sub.prix,
        seances: sub.seances,
        officielSeance: getSub.seances,
      };

      await getsubscriber.save();

      const checkOut = new caisseModal({
        responsableID: mongoose.Types.ObjectId(user._id),
        clientID: mongoose.Types.ObjectId(subscriber._id),
        responsableName: user.name,
        clientName: subscriber.nom,
        clientPrenom: subscriber.prenom,
        prix: sub.prix,
        note: `achat abonnement par cache`,
      });

      await checkOut.save();
    }
    if (methode === "dette") {
      getsubscriber.dette = getsubscriber.dette + sub.prix;

      getsubscriber.sub = {
        ID: mongoose.Types.ObjectId(sub.sub),
        subName: sub.subName,
        debutSub: new Date(sub.debutSub).setHours(0, 0, 0, 0),
        endSub: new Date(sub.endSub).setHours(0, 0, 0, 0),
        mois: sub.mois,
        prix: sub.prix,
        seances: sub.seances,
        officielSeance: getSub.seances,
      };
      await getsubscriber.save();
    }

    return {
      err: false,
      message: `l'ajout de l'abonnement "${sub.subName}" a était ajouté avec succée pour ${subscriber.nom} ${subscriber.prenom} !`,
    };
  } catch (error) {
    return {
      err: true,
      message: `une erreur c'est produite le message de détail est si dessous`,
      errMsg: error.message,
    };
  }
};

module.exports.cocherSeance = async (args) => {
  const { _id, seances, user } = args;

  try {
    //? GET SUBSCRIBER WITH THE RECIEVED ID
    const subscriber = await subscriberModel.findById(
      mongoose.Types.ObjectId(_id)
    );

    //? CONFIRME THAT EVERY THING IS GOING GREAT WITH THE RECEVED INFORMATION
    subscriber.sub.seances = subscriber.sub.seances - seances;
    if (subscriber.sub.seances < 0)
      return {
        err: true,
        message: `impossible d'effectuer cette opperation car le nombres de seances choché et plus que les seances restantes !`,
      };
    if (subscriber.sub.seances === 0)
      await subscriberModel.findByIdAndUpdate(mongoose.Types.ObjectId(_id), {
        $set: { sub: null },
      });
    else
      await subscriberModel.findByIdAndUpdate(mongoose.Types.ObjectId(_id), {
        $set: { "sub.seances": subscriber.sub.seances },
      });

    //? ADD POINTAGE WITH THE RECEVED INFORMATION
    const { sub, nom, prenom, birthDay } = subscriber;
    const pointage = new pointageModel({
      subID: sub.ID,
      subName: sub.subName,
      date: new Date(),
      nom,
      prenom,
      birthDay,
      subscriberID: subscriber._id,
      userName: user.name,
    });

    await pointage.save();

    //? RESPOND WITH A MESSAGE
    return {
      err: false,
      message: `l'abonné "${
        subscriber.nom + " " + subscriber.prenom
      }" a était a jouter au pointage avec succée !`,
    };
  } catch (error) {
    return {
      err: true,
      message: `une erreur c'est produite au niveau du serveur plus de détails si dessous`,
      errMsg: error.message,
    };
  }
};

module.exports.verifyCode = async (code) => {
  const subscriber = await subscriberModel.findOne({ code });

  //* IF THE SUBSCRIBER EXIST WITH THIS CODE THEN RETURN FALSE TO SET THE ERROR IN THE FRONT END
  return subscriber ? false : true;
};

module.exports.getSubscribersPointages = async () => {
  const date = new Date().setHours(0, 0, 0, 0);
  return await pointageModel.aggregate([
    {
      $match: {
        date: { $gt: date },
      },
    },
    {
      $lookup: {
        from: "subscribers",
        localField: "subscriberID",
        foreignField: "_id",
        as: "subscriber",
      },
    },
    {
      $unwind: "$subscriber",
    },
    {
      $project: {
        dateTime: "$date",
        subscriber: "$subscriber",
      },
    },
    {
      $sort: {
        dateTime: -1,
      },
    },
  ]);
};

module.exports.verifySubs = async () => {
  const date = new Date().setHours(0, 0, 0, 0);
  await subscriberModel.updateMany(
    {
      "sub.endSub": { $lt: date },
    },
    {
      $set: {
        sub: null,
      },
    }
  );
};

module.exports.getPointageSubscriber = async (_id) => {
  return await pointageModel.find({
    subscriberID: mongoose.Types.ObjectId(_id),
  });
};
