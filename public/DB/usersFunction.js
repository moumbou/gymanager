const { userModel } = require("../models/users");
const fs = require("fs");
const path = require("path");
const { default: mongoose } = require("mongoose");
const { fileURLToPath } = require("url");

module.exports.getUsers = async () => {
  return await userModel.find();
};

module.exports.numberOfUsers = async () => {
  const users = await userModel.find();
  return users.length;
};

module.exports.addUser = async (args) => {
  let { name, password, picture, role } = args;

  const searchedUser = await userModel.findOne({ name });
  if (searchedUser)
    return {
      err: true,
      message: `ce nom d'utilisateur est déja pris avant !`,
    };

  if (picture) {
    const dataFile = fs.readFileSync(path.resolve(__dirname, "../../../data.json"));
    let fileStore = JSON.parse(dataFile);
    fileStore = fileStore.file_store_img;
    const id = mongoose.Types.ObjectId();

    const extention = path.extname(picture);
    try {
      fs.copyFileSync(
        picture,
        path.join(fileURLToPath(fileStore), id + extention)
      );
      picture = id + extention;
    } catch (err) {
      return {
        err: true,
        message: `erreur l'ors de l'ajout de la photo !`,
        errMsg: err.message,
      };
    }
  }

  const user = new userModel({
    name,
    password,
    picture,
    role,
  });

  return {
    err: false,
    message: `l'utilisateur a était ajouter avec succée !`,
    result: await user.save(),
  };
};

module.exports.getUser = async (args) => {
  const { name, password } = args;
  const user = await userModel.findOne({ name: name, password: password });
  if (user)
    return {
      err: false,
      message: `connexion établi !`,
      result: user,
    };

  return {
    err: true,
    message: `nom d'utilisateur ou mot de passe incorrecte !`,
  };
};

module.exports.getUsersArray = async (args) => {
  const { _id, role } = args;

  if (role.includes("super-admine"))
    return await userModel.find({
      $and: [
        { role: { $ne: "super-admine" } },
        { _id: { $ne: mongoose.Types.ObjectId(_id) } },
      ],
    });
  else
    return await userModel.find({
      $and: [
        { role: { $ne: "super-admine" } },
        { role: { $ne: "admine" } },
        { _id: { $ne: mongoose.Types.ObjectId(_id) } },
      ],
    });
};

module.exports.deleteUser = async (user) => {
  const { _id, picture } = user;

  try {
    if (picture) {
      const dataFile = fs.readFileSync(path.resolve(__dirname, "../../../data.json"));
      let fileStore = JSON.parse(dataFile);
      fileStore = fileStore.file_store_img;

      fs.unlinkSync(path.join(fileURLToPath(fileStore), picture));
    }
    await userModel.deleteOne({ _id: mongoose.Types.ObjectId(_id) });
    return {
      err: false,
      message: `l'utilisateur ${user.name} a était supprimé avec succée !`,
    };
  } catch (error) {
    return {
      err: true,
      message: `une erreur c'est produite les details si dessous`,
      errMsg: error.message,
    };
  }
};

module.exports.editUser = async (user) => {
  let { name, picture, role, password, _id } = user;
  try {
    const sameUser = await userModel.findOne({ name });
    if (sameUser && !sameUser._id.toString().includes(_id))
      return {
        err: true,
        message: `ce nom d'utilisateur est déja utilisé !`,
      };

    const selectedUser = await userModel.findById(mongoose.Types.ObjectId(_id));
    if (picture && picture !== selectedUser.picture) {
      //? GET THE FOLDER PATH OF PICTURES
      const dataFile = fs.readFileSync(path.resolve(__dirname, "../../../data.json"));
      let fileStore = JSON.parse(dataFile);
      fileStore = fileStore.file_store_img;

      //? DELETE THE OLD PICTURE
      if (selectedUser.picture)
        fs.unlinkSync(
          path.join(fileURLToPath(fileStore), selectedUser.picture)
        );

      //? CREATE AN ID AND GET THE EXTENTION FILE
      const id = mongoose.Types.ObjectId();
      const extention = path.extname(picture);

      //? COPY THE CURRENT PICTURE TO THE NEW FOLDER WITH A NEW NAME
      fs.copyFileSync(
        picture,
        path.join(fileURLToPath(fileStore), id + extention)
      );
      picture = id + extention;

      selectedUser.picture = picture;
    }

    selectedUser.name = name;
    selectedUser.role = role;
    selectedUser.password = password;

    await selectedUser.save();
    return {
      err: false,
      message: `l'utilisateur ${name} a était bien modifié !`,
      _id,
    };
  } catch (error) {
    console.log(error);
    return {
      err: false,
      message: `une erreur c'est produite au niveau du serveur les détails si dessous`,
      errMsg: error.message,
    };
  }
};
