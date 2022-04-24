import React, { useEffect } from "react";
import inputStyle from "../../style/modules/input.module.css";
import buttonStyle from "../../style/modules/button.module.css";
import { selectConnected } from "../../features/connexion/connexionSlice";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import Picture from "./account/Picture";
import {
  selectPictureVal,
  setPictureVal,
} from "../../features/picts/pictureSlice";
import { FunctionsDB } from "../../shared/Constants";

const { ipcRenderer } = window.require("electron");

function Account() {
  const currentUser = useSelector(selectConnected);
  const pictureVal = useSelector(selectPictureVal);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.picture =
      data.picture && data.picture.length ? data.picture[0].path : null;

    const result = Object.assign(data, {
      role: currentUser.role,
      _id: currentUser._id,
    });

    ipcRenderer.send(FunctionsDB.EDIT_USER, {
      user: result,
      connected: currentUser,
    });

    reset({
      name: currentUser.name,
      password: currentUser.password,
      picture: "",
    });
  };

  const resetForm = () => {
    if (pictureVal === null) dispatch(setPictureVal(undefined));
    if (pictureVal === undefined) dispatch(setPictureVal(null));
    if (pictureVal) dispatch(setPictureVal(null));
    reset({
      name: currentUser.name,
      password: currentUser.password,
      picture: "",
    });
  };

  useEffect(() => {
    if (currentUser)
      reset({
        name: currentUser.name,
        password: currentUser.password,
      });
  }, [currentUser, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 target="title">compte</h3>

      <Picture user={currentUser} register={register} />

      <div className={inputStyle.display_2}>
        <div className={inputStyle.simpleContainer}>
          <input
            type="text"
            placeholder="nom"
            className={inputStyle.simple}
            {...register("name", {
              required: true,
            })}
            disabled={
              currentUser && currentUser.role.includes("super-admine")
                ? false
                : true
            }
          />
          <label>nom</label>
          <MdDriveFileRenameOutline
            className={inputStyle.icon}
            data-color={errors.name ? "danger" : ""}
          />
        </div>

        <div className={inputStyle.simpleContainer}>
          <input
            type="text"
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
      </div>

      <div className={inputStyle.display_2}>
        <div className={inputStyle.display_2}>
          <button
            type="submit"
            className={buttonStyle.simpleButton}
            mx-5="true"
          >
            modifier
          </button>
          <button
            type="button"
            className={buttonStyle.simpleButton}
            mx-5="true"
            onClick={resetForm}
          >
            restaurer
          </button>
        </div>
      </div>
    </form>
  );
}

export default Account;
