import React from "react";
import style from "../../style/modules/connexion.module.css";
import inputStyle from "../../style/modules/input.module.css";
import buttonStyle from "../../style/modules/button.module.css";
import { ImConnection } from "react-icons/im";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import logo from "../../img/logo.png";
import { useSelector } from "react-redux";
import { selectConnected } from "../../features/connexion/connexionSlice";
import { useForm } from "react-hook-form";
import { FunctionsDB } from "../../shared/Constants";

const { ipcRenderer } = window.require("electron");

function Login() {
  const currentUser = useSelector(selectConnected);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    ipcRenderer.send(FunctionsDB.GET_USER, data);
    reset();
  };

  return (
    <div className={style.container} data-display={currentUser ? "hide" : ""}>
      <form onSubmit={handleSubmit(onSubmit)} target="connexion">
        <div target="logo" style={{ backgroundImage: `url(${logo})` }} />
        <h3 target="title">connexion</h3>
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
          connexion
          <ImConnection />
        </button>
      </form>
    </div>
  );
}

export default Login;
