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
  selectConnected,
  selectPicturesPath,
  selectUserTarget,
  setTarget,
} from "../../../features/connexion/connexionSlice";

const { ipcRenderer } = window.require("electron");

function DeleteUserSetting() {
  const currentModal = useSelector(selectCurrentModal);
  const user = useSelector(selectUserTarget);
  const connected = useSelector(selectConnected);
  const currentPath = useSelector(selectPicturesPath);
  const dispatch = useDispatch();
  const [hide, setHide] = useState(true);

  const exitMessageHandler = () => {
    dispatch(resetModal());
    setTimeout(() => {
      dispatch(setTarget(null));
      setHide(true);
    }, 1000);
  };

  const deleteUser = () => {
    dispatch(resetModal());
    ipcRenderer.send(FunctionsDB.DELETE_USER, {
      user,
      connected,
    });
    setTimeout(() => {
      dispatch(setTarget(null));
      setHide(true);
    }, 1000);
  };

  useEffect(() => {
    if (Modals.DELETE_USER_SETTING === currentModal) setHide(false);
  }, [currentModal]);

  return (
    <div
      className={modalStyle.message}
      style={{
        display: `${hide ? "none" : "block"}`,
      }}
      target={Modals.DELETE_USER_SETTING === currentModal ? "show" : "hide"}
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
                user
                  ? user.picture
                    ? `${currentPath}/${user.picture}`
                    : defaultPic
                  : defaultPic
              })`,
            }}
          />
          <p>{`${user ? user.name : ""}`}</p>
        </div>
        <span target="confirme-message">
          voulez vraiment supprimer cet(te) utilisateur ?
        </span>
        <div target="grid-2" margin-x-10="true">
          <button className={buttonStyle.danger} onClick={deleteUser}>
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

export default DeleteUserSetting;
