import React, { useEffect, useState } from "react";
import modalStyle from "../../../style/modules/modal.module.css";
import buttonStyle from "../../../style/modules/button.module.css";
import { TiWarning } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  resetModal,
  selectCurrentModal,
} from "../../../features/modals/modalSlice";
import { FunctionsDB, ModalsSub } from "../../../shared/Constants";
import { resetSub, selectedSub } from "../../../features/subs/subsSlice";

const { ipcRenderer } = window.require("electron");

function DeleteSub() {
  const currentModal = useSelector(selectCurrentModal);
  const currentSub = useSelector(selectedSub);
  const dispatch = useDispatch();
  const [hide, setHide] = useState(true);

  const exitMessageHandler = () => {
    dispatch(resetModal());
    setTimeout(() => {
      dispatch(resetSub);
      setHide(true);
    }, 1000);
  };

  const DeleteSub = () => {
    ipcRenderer.send(FunctionsDB.DELETE_SUB, currentSub._id);
    dispatch(resetModal());
    setTimeout(() => {
      dispatch(resetSub);
      setHide(true);
    }, 1000);
  };

  useEffect(() => {
    if (ModalsSub.DELETE_SUB === currentModal) setHide(false);
  }, [currentModal]);

  return (
    <div
      className={modalStyle.message}
      style={{
        display: `${hide ? "none" : "block"}`,
      }}
      target={ModalsSub.DELETE_SUB === currentModal ? "show" : "hide"}
    >
      <div target="content">
        <div target="center">
          <TiWarning target="warning" size={32} />
        </div>
        <div target="user-info">
          <p>{currentSub ? currentSub.nom : ""}</p>
        </div>
        <span target="confirme-message">
          voulez vous vraiment supprimer cet abonnement ?
        </span>
        <div target="grid-2" margin-x-10="true">
          <button className={buttonStyle.danger} onClick={DeleteSub}>
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

export default DeleteSub;
