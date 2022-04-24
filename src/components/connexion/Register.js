import React, { useEffect, useState } from "react";
import style from "../../style/modules/connexion.module.css";
import inputStyle from "../../style/modules/input.module.css";
import buttonStyle from "../../style/modules/button.module.css";
import { MdDriveFileRenameOutline, MdAppRegistration } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import logo from "../../img/logo.png";
import { useForm } from "react-hook-form";
import { FunctionsDB, NodeFunctions, Pages } from "../../shared/Constants";
import { useSelector } from "react-redux";
import { selectPictureVal } from "../../features/picts/pictureSlice";
import { selectPage } from "../../features/sideBar/buttonsSlice";
import { selectConnected } from "../../features/connexion/connexionSlice";

const { ipcRenderer } = window.require("electron");

function Register() {
  const [picture, setPicture] = useState(null);

  const selectPictureValForRegistration = useSelector(selectPictureVal);
  const currentPage = useSelector(selectPage);
  const currentUser = useSelector(selectConnected);

  useEffect(() => {
    if (selectPictureValForRegistration && currentPage === Pages.SIGN_UP)
      setPicture(selectPictureValForRegistration);
  }, [selectPictureValForRegistration, currentPage]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.picture = picture ? data.picture[0].path : "";
    const newData = Object.assign(data, {
      role: "super-admine",
    });
    ipcRenderer.send(FunctionsDB.ADD_USER, newData);
    setPicture(null);
    reset();
  };

  const inputFileTrigger = () => {
    document.getElementById("register-user-picture").click();
  };

  const acceptedFormat = (e) => {
    const file = e.target.files[0];
    const isValide = ["image/jpeg", "image/png", "image/gif"].includes(
      file.type
    );
    if (isValide) {
      ipcRenderer.send(NodeFunctions.PICTURE_PATH, file.path);
    } else {
      e.target.value = "";
      setPicture(null);
    }
  };

  return (
    <div className={style.container} data-display={currentUser ? "hide" : ""}>
      <form onSubmit={handleSubmit(onSubmit)} target="connexion">
        <div target="logo" style={{ backgroundImage: `url(${logo})` }} />
        <h3 target="title">créer un compte</h3>
        <div className={inputStyle.simpleContainer}>
          <input
            type="text"
            placeholder="nom d'utilisateur"
            className={inputStyle.simple}
            {...register("name", {
              required: true,
            })}
          />
          <label>nom d'utilisateur</label>
          <MdDriveFileRenameOutline
            className={inputStyle.icon}
            data-color={errors.name ? "danger" : ""}
          />
        </div>

        <div target="image-selector">
          <div target="image" style={{ backgroundImage: `url(${picture})` }} />
          <button
            type="button"
            onClick={inputFileTrigger}
            className={buttonStyle.success}
          >
            ajouter une photo
          </button>
          <input
            id="register-user-picture"
            type="file"
            className="hide"
            {...register("picture", {
              onChange: (e) => acceptedFormat(e),
            })}
          />
        </div>

        <div className={inputStyle.simpleContainer}>
          <input
            type="password"
            placeholder="mot de passe"
            className={inputStyle.simple}
            {...register("password", {
              required: true,
            })}
          />
          <label>mot de passe</label>
          <CgPassword
            className={inputStyle.icon}
            data-color={errors.password ? "danger" : ""}
          />
        </div>

        <button type="submit" className={buttonStyle.active}>
          s'enregistrer
          <MdAppRegistration />
        </button>
      </form>
    </div>
  );
}

export default Register;
