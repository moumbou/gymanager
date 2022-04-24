import React, { useEffect, useState } from "react";
import inputStyle from "../../style/modules/input.module.css";
import buttonStyle from "../../style/modules/button.module.css";
import { CgSearch } from "react-icons/cg";
import BtnSelector from "./BtnSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDefalutSubs,
  setCurrentSub,
} from "../../features/subs/subsSlice";

function FirstSearchSection({ styles }) {
  const defaultSubs = useSelector(selectDefalutSubs);
  const dispatch = useDispatch();

  const [btnTarget, setBtnTarget] = useState("T");
  const [input, setInput] = useState("");

  const clickHandler = (e) => {
    const target = e.target.getAttribute("target");
    setBtnTarget(target);
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

  useEffect(() => {
    dispatch(
      setCurrentSub(
        defaultSubs.filter((value) => {
          return value.nom.toLowerCase().includes(input.toLocaleLowerCase()) && value.type.includes(returnText(btnTarget));
        })
      )
    );
  }, [defaultSubs, input, btnTarget, dispatch]);

  return (
    <div className={styles.searchSectionFirstPart}>
      <div className={`${inputStyle.simpleContainer} ${inputStyle.simple70}`}>
        <input
          type="text"
          placeholder="nom de l'abonnement"
          className={`${inputStyle.simple}`}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <CgSearch className={inputStyle.icon} />
      </div>

      <div className={`${buttonStyle.buttonSelectionContainer}`}>
        <BtnSelector
          btnTarget={btnTarget}
          clickHandler={clickHandler}
          target={"H"}
          text={"homme"}
        />
        <BtnSelector
          btnTarget={btnTarget}
          clickHandler={clickHandler}
          target={"F"}
          text={"femme"}
        />
        <BtnSelector
          btnTarget={btnTarget}
          clickHandler={clickHandler}
          target={"T"}
          text={"tout"}
        />
      </div>
    </div>
  );
}

export default FirstSearchSection;
