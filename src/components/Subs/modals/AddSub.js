import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetModal,
  selectCurrentModal,
} from "../../../features/modals/modalSlice";
import modalStyle from "../../../style/modules/modal.module.css";
import { FunctionsDB, ModalsSub } from "../../../shared/Constants";
import inputStyle from "../../../style/modules/input.module.css";
import buttonStyle from "../../../style/modules/button.module.css";
import {
  MdOutlineExitToApp,
  MdOutlineDriveFileRenameOutline,
  MdFormatListNumberedRtl,
  MdPriceChange,
} from "react-icons/md";
import { BsCalendar2Month } from "react-icons/bs";
import BtnSelector from "../BtnSelector";
import { useForm } from "react-hook-form";

const { ipcRenderer } = window.require("electron");

function AddSub() {
  const currentModal = useSelector(selectCurrentModal);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [btnTarget, setBtnTarget] = useState("T");

  const setBtnHandler = (e) => {
    const target = e.target.getAttribute("target");
    setBtnTarget(target);
  };

  const exitHandler = () => {
    dispatch(resetModal());
  };

  const returnText = (char) => {
    switch (char) {
      case "T":
        return "Tous";
      case "F":
        return "Femmes";
      case "H":
        return "Hommes";
      default:
        break;
    }
  };

  const onSubmit = (data) => {
    const result = Object.assign(data, {
      type: returnText(btnTarget),
    });

    ipcRenderer.send(FunctionsDB.ADD_SUB, result);
    reset();
  };

  return (
    <div
      className={modalStyle.simpleModal}
      active={currentModal === ModalsSub.ADD_SUB ? "true" : "false"}
    >
      <MdOutlineExitToApp
        onClick={exitHandler}
        className={modalStyle.IconTopLeftExit}
        size={42}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={modalStyle.addForm}>
        <h1>créer un abonnement</h1>

        <div className={inputStyle.display_2}>
          <div className={inputStyle.simpleContainer}>
            <input
              className={inputStyle.simple}
              placeholder="nom de l'abonnement"
              type="text"
              {...register("nom", {
                required: true,
              })}
            />
            <label>nom de l'abonnement</label>
            <MdOutlineDriveFileRenameOutline
              className={inputStyle.icon}
              data-color={errors.nom ? "danger" : ""}
            />
          </div>

          <div className={inputStyle.display_2}>
            <div className={inputStyle.simpleContainer}>
              <input
                className={inputStyle.simple}
                placeholder="nombres de mois"
                type="number"
                {...register("mois", {
                  required: true,
                })}
              />
              <label>mois</label>
              <BsCalendar2Month
                className={inputStyle.icon}
                data-color={errors.mois ? "danger" : ""}
              />
            </div>

            <div className={inputStyle.simpleContainer}>
              <input
                className={inputStyle.simple}
                placeholder="séances"
                type="number"
                {...register("seances", {
                  required: true,
                })}
              />
              <label>séances</label>
              <MdFormatListNumberedRtl
                className={inputStyle.icon}
                data-color={errors.seances ? "danger" : ""}
              />
            </div>
          </div>
        </div>

        <div className={inputStyle.display_2}>
          <div className={inputStyle.simpleContainer}>
            <input
              className={inputStyle.simple}
              placeholder="prix"
              type="number"
              {...register("prix", {
                required: true,
              })}
            />
            <label>prix</label>
            <MdPriceChange
              className={inputStyle.icon}
              data-color={errors.prix ? "danger" : ""}
            />
          </div>

          <div className={`${buttonStyle.buttonSelectionContainer}`}>
            <label target="title">l'abonnement est destiné pour</label>
            <BtnSelector
              btnTarget={btnTarget}
              clickHandler={setBtnHandler}
              target={"H"}
              text={"homme"}
            />
            <BtnSelector
              btnTarget={btnTarget}
              clickHandler={setBtnHandler}
              target={"F"}
              text={"femme"}
            />
            <BtnSelector
              btnTarget={btnTarget}
              clickHandler={setBtnHandler}
              target={"T"}
              text={"tous"}
            />
          </div>
        </div>

        <div className={inputStyle.display_2}>
          <div className={inputStyle.display_2}>
            <button className={buttonStyle.active}>créer</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddSub;
