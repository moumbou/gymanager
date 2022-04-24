import React, { useEffect, useState } from "react";
import modalStyle from "../../../style/modules/modal.module.css";
import buttonStyle from "../../../style/modules/button.module.css";
import { HiViewGridAdd } from "react-icons/hi";
import defaultPic from "../../../img/not-defiened.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  resetModal,
  selectCurrentModal,
} from "../../../features/modals/modalSlice";
import { Modals } from "../../../shared/Constants";
import CheckSection from "./editSubUser/CheckSection";
import AddSub from "./editSubUser/AddSub";
import { selectCurrentSubscriber } from "../../../features/subs/usersSlice";
import toCurrency from "../../../shared/toCurrency";
import { selectPicturesPath } from "../../../features/connexion/connexionSlice";

function EditSubUser() {
  const currentModal = useSelector(selectCurrentModal);
  const currentSubscriber = useSelector(selectCurrentSubscriber);
  const picturesPath = useSelector(selectPicturesPath);
  const dispatch = useDispatch();
  const [hide, setHide] = useState(true);

  const exitMessageHandler = () => {
    dispatch(resetModal());
    setTimeout(() => {
      setHide(true);
    }, 1000);
  };

  useEffect(() => {
    if (Modals.EDIT_SUB_USER === currentModal) setHide(false);
  }, [currentModal]);

  return (
    <div
      className={modalStyle.message}
      style={{
        display: `${hide ? "none" : "block"}`,
      }}
      target={Modals.EDIT_SUB_USER === currentModal ? "show" : "hide"}
    >
      <div target="content">
        <div target="center">
          <HiViewGridAdd target="success" size={32} />
        </div>
        <div target="user-info">
          <div
            target="profile-pic"
            style={{
              backgroundImage: `url(${
                currentSubscriber && currentSubscriber.pictureProfile
                  ? `${picturesPath}/${currentSubscriber.pictureProfile}`
                  : defaultPic
              })`,
            }}
          />
          <p>
            {currentSubscriber
              ? `${currentSubscriber.nom} ${currentSubscriber.prenom}`
              : "?"}
          </p>
        </div>

        <div target="confirme-message" credit-info="true">
          <span className="badge" data-text="crédits" color="success">
            {currentSubscriber ? toCurrency(currentSubscriber.credit) : "?"} DA
          </span>
          <span className="badge" data-text="dettes" color="danger">
            {currentSubscriber ? toCurrency(currentSubscriber.dette) : "?"} DA
          </span>
        </div>

        {currentSubscriber && currentSubscriber.sub ? (
          <CheckSection setHide={setHide} hide={hide} />
        ) : (
          <AddSub setHide={setHide} hide={hide} />
        )}

        <button
          className={buttonStyle.danger}
          h-100="true"
          close-button="true"
          onClick={exitMessageHandler}
        >
          fermer
        </button>
      </div>
    </div>
  );
}

export default EditSubUser;
