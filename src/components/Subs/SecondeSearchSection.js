import React from "react";
import { AiFillFolderAdd } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCurrentModal } from "../../features/modals/modalSlice";
import buttonStyle from "../../style/modules/button.module.css";
import { ModalsSub } from '../../shared/Constants'

function SecondeSearchSection({ styles }) {

  const dispatch = useDispatch()
  const onclickHandler = () => {
    dispatch(setCurrentModal(ModalsSub.ADD_SUB))
  }

  return (
    <div className={styles.searchSectionSecondePart}>
      <button className={buttonStyle.simpleButton} onClick={onclickHandler}>
        créer un abonnement <AiFillFolderAdd size={16} />
      </button>
    </div>
  );
}

export default SecondeSearchSection;
