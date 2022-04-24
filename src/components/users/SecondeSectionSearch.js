import React from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setCurrentModal } from "../../features/modals/modalSlice";
import buttonStyle from "../../style/modules/button.module.css";
import { Modals } from "../../shared/Constants";

function SecondeSectionSearch({ styles }) {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(setCurrentModal(Modals.ADD_USER));
  };

  return (
    <div className={styles.searchSectionSecondePart}>
      <button onClick={clickHandler} className={buttonStyle.simpleButton}>
        ajouter un(e) abonné(e) <IoMdPersonAdd size={16} />
      </button>
    </div>
  );
}

export default SecondeSectionSearch;
