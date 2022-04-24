import React, { useEffect, useState } from "react";
import modalStyle from "../../../style/modules/modal.module.css";
import standardPic from "../../../img/not-defiened.jpg";
import PointageSection from "./detailsUser/PointageSection";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  resetModal,
  selectCurrentModal,
} from "../../../features/modals/modalSlice";
import { FunctionsDB, Modals } from "../../../shared/Constants";
import { selectCurrentSubscriber } from "../../../features/subs/usersSlice";
import { selectPicturesPath } from "../../../features/connexion/connexionSlice";
import toInputDate from "../../../shared/toInputDate";
import getLastDays from "../../../shared/getLastDays";
import getPercentSub from "../../../shared/getPercentSub";

const { ipcRenderer } = window.require("electron");

function DetailsUser() {
  const currentModal = useSelector(selectCurrentModal);
  const currentSubscriber = useSelector(selectCurrentSubscriber);
  const picturesPath = useSelector(selectPicturesPath);
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);
  const [hide, setHide] = useState(true);

  const closeModalHandler = () => {
    dispatch(resetModal());
    setTimeout(() => {
      setHide((prev) => !prev);
      setDisplay(false);
    }, 500);
  };

  const returnText = (char) => {
    switch (char) {
      case "T":
        return "Tous";
      case "F":
        return "Femme";
      case "H":
        return "Homme";
      default:
        break;
    }
  };

  const showHandler = () => {
    ipcRenderer.send(
      FunctionsDB.GET_SUBSCRIBER_POINTAGE,
      currentSubscriber._id
    );
    setDisplay((prev) => !prev);
  };

  const toNormalDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    if (currentModal === Modals.USER_DETAILS) setHide(false);
  }, [currentModal]);

  return (
    <div
      className={modalStyle.popup}
      target={`${currentModal === Modals.USER_DETAILS ? "show" : "hide"}`}
      style={{ display: `${hide ? "none" : "flex"}` }}
    >
      <FaWindowClose
        className={modalStyle.exitPopupIcon}
        onClick={closeModalHandler}
      />

      <div target="container">
        <div target="content">
          <h3 target="title">
            {currentSubscriber
              ? `${currentSubscriber.nom} ${currentSubscriber.prenom}`
              : ""}{" "}
            détails
          </h3>
          <div
            target="profile-pic"
            style={{
              backgroundImage: `url(${
                currentSubscriber && currentSubscriber.pictureProfile
                  ? `${picturesPath}/${currentSubscriber.pictureProfile}`
                  : standardPic
              })`,
            }}
          />

          <div target="info-grid">
            <p>nom: {currentSubscriber ? currentSubscriber.nom : ""}</p>
            <p>prenom: {currentSubscriber ? currentSubscriber.prenom : ""}</p>
            <p>
              date de naissance:{" "}
              {currentSubscriber && currentSubscriber.birthDay
                ? toNormalDate(currentSubscriber.birthDay)
                : "?"}
            </p>
            <p>
              date de debut:{" "}
              {currentSubscriber && currentSubscriber.dateDebut
                ? toNormalDate(currentSubscriber.dateDebut)
                : "?"}
            </p>
            <p>
              sex: {currentSubscriber ? returnText(currentSubscriber.sex) : ""}
            </p>
            <p>
              code:{" "}
              {currentSubscriber
                ? `${currentSubscriber.code.substring(0, 10)}${
                    currentSubscriber.code.length <= 10 ? "" : "..."
                  }`
                : ""}
            </p>
            <p target="grid-2">
              adresse:{" "}
              {currentSubscriber && currentSubscriber.adresse.length
                ? currentSubscriber.adresse
                : "?"}
            </p>
            {currentSubscriber && currentSubscriber.sub ? (
              <>
                <p>abonnement: {currentSubscriber.sub.subName}</p>
                <p>
                  début de l'abonnement:{" "}
                  {toInputDate(currentSubscriber.sub.debutSub)}
                </p>
                <p>
                  fin de l'abonnement:{" "}
                  {toInputDate(currentSubscriber.sub.endSub)}
                </p>
                <p>
                  jours restants: {getLastDays(currentSubscriber.sub.endSub)} J
                </p>
                <p>séances restantes: {currentSubscriber.sub.seances} S</p>
              </>
            ) : (
              ""
            )}

            <div target="center">
              <p>status:</p>
              <div
                className="status"
                status={
                  currentSubscriber && currentSubscriber.sub
                    ? getPercentSub(currentSubscriber.sub)
                    : 0
                }
              />
            </div>
          </div>

          <p
            onClick={showHandler}
            className={`${display ? "hide" : ""}`}
            target="display"
          >
            afficher le pointage
          </p>
          <PointageSection display={display} setDisplay={setDisplay} />
        </div>
      </div>
    </div>
  );
}

export default DetailsUser;
