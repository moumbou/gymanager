import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectConnected } from "../../../../features/connexion/connexionSlice";
import { resetModal } from "../../../../features/modals/modalSlice";
import { selectDefaultPointages } from "../../../../features/subs/pointagesSlice";
import { selectCurrentSubscriber } from "../../../../features/subs/usersSlice";
import { FunctionsDB } from "../../../../shared/Constants";
import getLastDays from "../../../../shared/getLastDays";
import buttonStyle from "../../../../style/modules/button.module.css";
import inputStyle from "../../../../style/modules/input.module.css";

const { ipcRenderer } = window.require("electron");

function CheckSection({ setHide, hide }) {
  const currentSubscriber = useSelector(selectCurrentSubscriber);
  const defaultPointages = useSelector(selectDefaultPointages);
  const user = useSelector(selectConnected);
  const [info, setInfo] = useState({
    seances: 0,
    jours: 0,
    seancesRestante: 0,
  });
  const [seances, setSeances] = useState(0);
  const [isAdded, setPointage] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSubscriber) {
      const { sub } = currentSubscriber;
      setInfo((prev) => {
        prev.seances = sub.seances;
        prev.jours = getLastDays(new Date(sub.endSub));
        prev.seancesRestante = sub.seances;
        return prev;
      });
      const selectedSubscriber = defaultPointages.filter((value) =>
        value.subscriber._id.includes(currentSubscriber._id)
      );
      setPointage(
        selectedSubscriber.length ? selectedSubscriber[0].dateTime : null
      );
    }

    if(hide) setSeances(0)
  }, [currentSubscriber, defaultPointages, hide]);

  const onChange = (e) => {
    let value = e.target.value;
    setSeances(value);
    value = parseInt(value);
    if (value > 0)
      return setInfo((prev) => {
        prev.seancesRestante = isNaN(value)
          ? currentSubscriber.sub.seances
          : currentSubscriber.sub.seances - value;
        return prev;
      });
    else
      return setInfo((prev) => {
        prev.seancesRestante = currentSubscriber.sub.seances;
        return prev;
      });
  };

  const onSubmit = () => {
    ipcRenderer.send(FunctionsDB.COCHER_SEANCE, {
      user,
      _id: currentSubscriber._id,
      seances: parseInt(seances),
    });
    setSeances(0);
    dispatch(resetModal());
    setTimeout(() => {
      setHide(true);
    }, 1000);
  };
  return (
    <>
      <div info-section="true">
        <p>seances restantes : {info.seances}</p>
        <p>jours restants : {info.jours}</p>
        <p>seances restantes aprés confirmation : {info.seancesRestante}</p>
        <p></p>
        {isAdded ? (
          <>
            <p data-warning="true">
              ! attention cette personne a deja était coché à{" "}
              {new Date(isAdded).toLocaleTimeString()} !
            </p>
          </>
        ) : (
          <></>
        )}
      </div>

      <div target="grid-2" margin-x-10="true">
        <button
          className={buttonStyle.active}
          disabled={parseInt(seances) ? false : true}
          onClick={onSubmit}
        >
          cochez
        </button>
        <div className={inputStyle.simpleContainer}>
          <input
            type="number"
            placeholder="nombre de séance"
            className={inputStyle.simple}
            onChange={onChange}
            value={seances}
          />
          <label>séances</label>
        </div>
      </div>
    </>
  );
}

export default CheckSection;
