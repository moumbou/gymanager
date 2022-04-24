import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetModal,
  selectCurrentModal,
} from "../../../features/modals/modalSlice";
import { selectedSub } from "../../../features/subs/subsSlice";
import { selectCurrentSubscriber } from "../../../features/subs/usersSlice";
import { FunctionsDB, Modals } from "../../../shared/Constants";
import toCurrency from "../../../shared/toCurrency";
import toInputDate from "../../../shared/toInputDate";
import modalStyle from "../../../style/modules/modal.module.css";
import buttonStyle from "../../../style/modules/button.module.css";
import { selectConnected } from "../../../features/connexion/connexionSlice";

const { ipcRenderer } = window.require("electron");

function CheckOut() {
  const [hide, setHide] = useState(true);
  const currentModal = useSelector(selectCurrentModal);
  const subscriber = useSelector(selectCurrentSubscriber);
  const user = useSelector(selectConnected);
  const sub = useSelector(selectedSub);

  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(resetModal());
    setTimeout(() => {
      setHide((prev) => !prev);
    }, 500);
  };

  const addSub = (e) => {
    const methode = e.target.getAttribute("data-info");
    const value = {
      subscriber,
      sub,
      methode,
      user,
    };

    ipcRenderer.send(FunctionsDB.ADD_SUBSCRIBER_SUB, value);

    dispatch(resetModal());
    setTimeout(() => {
      setHide((prev) => !prev);
    }, 500);
  };

  useEffect(() => {
    if (currentModal === Modals.CHECK_OUT) setHide(false);
  }, [currentModal]);

  return (
    <div
      className={modalStyle.popup}
      target={`${currentModal === Modals.CHECK_OUT ? "show" : "hide"}`}
      style={{ display: `${hide ? "none" : "flex"}` }}
    >
      <div target="container">
        <div target="content">
          <h3 target="title">
            {subscriber ? `${subscriber.nom} ${subscriber.prenom}` : ""}{" "}
            Crédits/dettes
          </h3>

          <div data-target="center">
            <div target="confirme-message" credit-info="true">
              <span className="badge" data-text="crédits" color="success">
                {subscriber ? toCurrency(subscriber.credit) : "?"} DA
              </span>
              <span className="badge" data-text="dettes" color="danger">
                {subscriber ? toCurrency(subscriber.dette) : "?"} DA
              </span>
            </div>
          </div>

          <h3 target="title">
            {subscriber ? `${subscriber.nom} ${subscriber.prenom}` : ""}{" "}
            abonnement infos "{sub ? sub.subName : ""}"
          </h3>

          <div target="info-grid">
            <p>séances: {sub ? sub.seances : ""}</p>
            <p>mois: {sub ? sub.mois : ""}</p>
            <p>debut: {sub ? toInputDate(sub.debutSub) : ""}</p>
            <p>fin: {sub ? toInputDate(sub.endSub) : ""}</p>
            <p>prix: {sub ? toCurrency(sub.prix) : ""} DA</p>
          </div>

          <div data-target="buttons-check-out">
            <button
              data-info="dette"
              onClick={addSub}
              className={buttonStyle.danger}
            >
              payer par dette
            </button>
            <button
              data-info="credit"
              onClick={addSub}
              className={buttonStyle.active}
              disabled={
                subscriber && sub && subscriber.credit >= sub.prix ? false : true
              }
            >
              payer par crédit
            </button>
            <button
              data-info="cache"
              onClick={addSub}
              className={buttonStyle.success}
            >
              payer par cache
            </button>
            <button
              className={buttonStyle.simpleButton}
              onClick={closeModalHandler}
            >
              annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
