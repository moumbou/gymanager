import React, { useEffect, useState } from "react";
import cardStyle from "../../style/modules/card.module.css";
import { IoMdTrash } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";
import { MdModeEditOutline } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentModal } from "../../features/modals/modalSlice";
import { Modals } from "../../shared/Constants";
import { selectPicturesPath } from "../../features/connexion/connexionSlice";
import { setSubscriber } from "../../features/subs/usersSlice";
import getPercentSub from "../../shared/getPercentSub";

function UserCard({ subscriber }) {
  const [status, setStatus] = useState(0)
  const filePicPath = useSelector(selectPicturesPath);
  const dispatch = useDispatch();

  let { nom, prenom, dateDebut, sub, pictureProfile } = subscriber;

  const toNormalDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const showDetailsHandler = () => {
    dispatch(setSubscriber(subscriber));
    dispatch(setCurrentModal(Modals.USER_DETAILS));
  };

  const deleteUserHandler = () => {
    dispatch(setSubscriber(subscriber));
    dispatch(setCurrentModal(Modals.DELETE_USER));
  };

  const editUserHandler = () => {
    dispatch(setSubscriber(subscriber));
    dispatch(setCurrentModal(Modals.MODIFY_USER));
  };

  const editSubUserHandler = () => {
    dispatch(setSubscriber(subscriber));
    dispatch(setCurrentModal(Modals.EDIT_SUB_USER));
  };

  useEffect(() => {
    if (sub) {
      setStatus(getPercentSub(sub))
    }
  }, [sub]);

  return (
    <div className={cardStyle.simpleCard} min-h-200="true" center="true">
      <div className={cardStyle.simpleCardHeader}>
        <div
          target="picture-profile"
          style={{
            backgroundImage: `url(${
              pictureProfile
                ? `${filePicPath}/${pictureProfile}`
                : require("../../img/not-defiened.jpg")
            })`,
          }}
        />
        <div target="info">
          <p>{nom}</p>
          <p>{prenom}</p>
          <p>{dateDebut ? toNormalDate(dateDebut) : "?"}</p>
          {sub ? (
            <p className="status" status={status} />
          ) : (
            <RiErrorWarningFill data-target="warning-status" />
          )}
        </div>
      </div>

      <div className={cardStyle.iconsRightSide}>
        <div onClick={editSubUserHandler} color="success">
          <AiOutlineAppstoreAdd />
        </div>

        <div onClick={showDetailsHandler}>
          <CgDetailsMore />
        </div>

        <div onClick={editUserHandler} color="blue">
          <MdModeEditOutline />
        </div>

        <div onClick={deleteUserHandler} color="danger">
          <IoMdTrash />
        </div>
      </div>
    </div>
  );
}

export default UserCard;
