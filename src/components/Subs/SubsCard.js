import React from "react";
import cardStyle from "../../style/modules/card.module.css";
import { RiFileEditFill, RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setCurrentModal } from "../../features/modals/modalSlice";
import { ModalsSub } from "../../shared/Constants";
import { setSub } from "../../features/subs/subsSlice";

function SubsCard({ sub }) {
  const { nom, mois, seances, prix, type } = sub;

  const dispatch = useDispatch();
  const displayEditHandler = () => {
    dispatch(setSub(sub));
    dispatch(setCurrentModal(ModalsSub.EDIT_SUB));
  };

  const displayDeleteHandler = () => {
    dispatch(setSub(sub));
    dispatch(setCurrentModal(ModalsSub.DELETE_SUB));
  };

  return (
    <div className={cardStyle.subsCard}>
      <p>{nom}</p>
      <p>{mois} mois</p>
      <p>{seances} séances</p>
      <p>Genre : {type}</p>
      <p>{prix} DA</p>
      <div target="icons">
        <div color="blue" onClick={displayEditHandler}>
          <RiFileEditFill />
        </div>
        <div color="danger" onClick={displayDeleteHandler}>
          <RiDeleteBack2Fill />
        </div>
      </div>
    </div>
  );
}

export default SubsCard;
