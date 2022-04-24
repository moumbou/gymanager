import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetModal,
  selectCurrentModal,
} from "../../../features/modals/modalSlice";
import { FunctionsDB, ModalsSetting } from "../../../shared/Constants";
import modalStyle from "../../../style/modules/modal.module.css";
import inputStyle from "../../../style/modules/input.module.css";
import buttonStyle from "../../../style/modules/button.module.css";
import { FaWindowClose } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import PictureProfile from "./addUser/PictureProfile";
import { resetPictureVal } from "../../../features/picts/pictureSlice";
import { useForm } from "react-hook-form";
import { selectConnected } from "../../../features/connexion/connexionSlice";

const { ipcRenderer } = window.require("electron");

function AddUser() {
  const currentModal = useSelector(selectCurrentModal);
  const user = useSelector(selectConnected);
  const dispatch = useDispatch();
  const [hide, setHide] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const closeModalHandler = () => {
    reset();
    dispatch(resetModal());
    dispatch(resetPictureVal());
    setTimeout(() => {
      setHide((prev) => !prev);
    }, 500);
  };
  useEffect(() => {
    if (currentModal === ModalsSetting.ADD_USER) setHide(false);
  }, [currentModal]);

  const onSubmit = (data) => {
    data.picture =
      data.picture && data.picture.length ? data.picture[0].path : null;

    const result = Object.assign(data, {
      user,
    });
    ipcRenderer.send(FunctionsDB.ADD_USER, result);
    reset();
    dispatch(resetPictureVal());
  };

  return (
    <div
      className={modalStyle.popup}
      target={`${currentModal === ModalsSetting.ADD_USER ? "show" : "hide"}`}
      style={{ display: `${hide ? "none" : "flex"}` }}
    >
      <FaWindowClose
        className={modalStyle.exitPopupIcon}
        onClick={closeModalHandler}
      />

      <form onSubmit={handleSubmit(onSubmit)} target="container">
        <h3 target="title" mb-3="true">
          ajouter un utilisateur
        </h3>

        <PictureProfile register={register} />

        <div className={inputStyle.display_2} mb-3="true">
          <div className={inputStyle.simpleContainer}>
            <input
              className={inputStyle.simple}
              placeholder="nom de l'utilisateur"
              type="text"
              {...register("name", {
                required: true,
              })}
            />
            <label>nom de l'utilisateur</label>
            <MdOutlineDriveFileRenameOutline
              className={inputStyle.icon}
              data-color={errors.name ? "danger" : ""}
            />
          </div>

          <div className={inputStyle.simpleContainer}>
            <input
              className={inputStyle.simple}
              placeholder="mot de passe"
              type="text"
              {...register("password", {
                required: true,
              })}
            />
            <label>mot de passe</label>
            <RiLockPasswordFill
              className={inputStyle.icon}
              data-color={errors.password ? "danger" : ""}
            />
          </div>
        </div>

        <div className={inputStyle.display_2}>
          <div className={inputStyle.simpleContainer}>
            <select className={inputStyle.simpleSelect} {...register("role")}>
              <option value="homme">gerant(e) homme</option>
              <option value="femme">gerant(e) femme</option>
              <option value="admine">admin</option>
            </select>
            <label>role</label>
          </div>

          <button className={buttonStyle.simpleButton}>ajouter</button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
