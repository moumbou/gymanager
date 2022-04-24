import inputStyle from "../../style/modules/input.module.css";
import React, { useEffect, useState } from "react";
import buttonStyle from "../../style/modules/button.module.css";
import { CgSearch } from "react-icons/cg";
import BtnSelector from "./BtnSelector";
import { useDispatch, useSelector } from "react-redux";
import { selectConnected } from "../../features/connexion/connexionSlice";
import {
  selectDefaultSubscirbers,
  setCurrentSubs,
} from "../../features/subs/usersSlice";

function FirstSectionSearch({ styles }) {
  const user = useSelector(selectConnected);
  const DefaultSubscirbers = useSelector(selectDefaultSubscirbers);
  const [btnTarget, setBtnTarget] = useState("T");
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const clickHandler = (e) => {
    const target = e.target.getAttribute("target");
    setBtnTarget(target);
  };

  useEffect(() => {
    if (user && !user.role.includes("super-admine" || "admine")) {
      setBtnTarget(user.role.includes("homme") ? "H" : "F");
    }

    dispatch(
      setCurrentSubs(
        DefaultSubscirbers.filter((value) => {
          if (btnTarget !== "T")
            return (
              (`${value.nom + " " + value.prenom}`
                .toLowerCase()
                .includes(input.toLowerCase()) ||
                value.code.includes(input)) &&
              value.sex.includes(btnTarget)
            );
          else
            return (
              `${value.nom + " " + value.prenom}`
                .toLowerCase()
                .includes(input.toLowerCase()) || value.code.includes(input)
            );
        })
      )
    );
  }, [DefaultSubscirbers, dispatch, btnTarget, input, user]);

  return (
    <div className={styles.searchSectionFirstPart}>
      <div className={`${inputStyle.simpleContainer} ${inputStyle.simple70}`}>
        <input
          type="text"
          placeholder="nom, prenom, Id..."
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
          disabled={
            user && user.role.includes("admine" || "super-admine")
              ? false
              : true
          }
        />
        <BtnSelector
          btnTarget={btnTarget}
          clickHandler={clickHandler}
          target={"F"}
          text={"femme"}
          disabled={
            user && user.role.includes("admine" || "super-admine")
              ? false
              : true
          }
        />
        <BtnSelector
          btnTarget={btnTarget}
          clickHandler={clickHandler}
          target={"T"}
          text={"tout"}
          disabled={
            user && user.role.includes("admine" || "super-admine")
              ? false
              : true
          }
        />
      </div>
    </div>
  );
}

export default FirstSectionSearch;
