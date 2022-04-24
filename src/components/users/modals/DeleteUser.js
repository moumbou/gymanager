import React, { useEffect, useState } from "react";
import modalStyle from "../../../style/modules/modal.module.css";
import buttonStyle from "../../../style/modules/button.module.css";
import { TiWarning } from "react-icons/ti";
import defaultPic from "../../../img/not-defiened.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  resetModal,
  selectCurrentModal,
} from "../../../features/modals/modalSlice";
import { FunctionsDB, Modals } from "../../../shared/Constants";
import {
  resetSubscriber,
  selectCurrentSubscriber,
} from "../../../features/subs/usersSlice";
import {
  selectConnected,
  selectPicturesPath,
} from "../../../features/connexion/connexionSlice";

const { ipcRenderer } = window.require("electron");

function DeleteUser() {
  const currentModal = useSelector(selectCurrentModal);
  const subscriber = useSelector(selectCurrentSubscriber);
  const currentUser = useSelector(selectConnected);
  const currentPath = useSelector(selectPicturesPath);
  const dispatch = useDispatch();
  const [hide, setHide] = useState(true);

  const exitMessageHandler = () => {
    dispatch(resetModal());
    setTimeout(() => {
      dispatch(resetSubscriber());
      setHide(true);
    }, 1000);
  };

  const deleteSubscriber = () => {
    dispatch(resetModal());
    ipcRenderer.send(FunctionsDB.DELETE_SUBSCRIBER, {
      id: subscriber._id,
      role: currentUser.role,
    });
    setTimeout(() => {
      dispatch(resetSubscriber());
      setHide(true);
    }, 1000);
  };

  useEffect(() => {
    if (Modals.DELETE_USER === currentModal) setHide(false);
  }, [currentModal]);

  return (
    <div
      className={modalStyle.message}
      style={{
        display: `${hide ? "none" : "block"}`,
      }}
      target={Modals.DELETE_USER === currentModal ? "show" : "hide"}
    >
      <div target="content">
        <div target="center">
          <TiWarning target="warning" size={32} />
        </div>
        <div target="user-info">
          <div
            target="profile-pic"
            style={{
              backgroundImage: `url(${
                subscriber
                  ? subscriber.pictureProfile
                    ? `${currentPath}/${subscriber.pictureProfile}`
                    : defaultPic
                  : defaultPic
              })`,
            }}
          />
          <p>{`${
            subscriber ? `${subscriber.nom} ${subscriber.prenom}` : ""
          }`}</p>
        </div>
        <span target="confirme-message">
          voulez vraiment supprimer cet(te) abonné ?
        </span>
        <div target="grid-2" margin-x-10="true">
          <button className={buttonStyle.danger} onClick={deleteSubscriber}>
            oui
          </button>
          <button className={buttonStyle.success} onClick={exitMessageHandler}>
            fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;
