import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetModal,
  selectCurrentModal,
} from "../../../features/modals/modalSlice";
import modalStyle from "../../../style/modules/modal.module.css";
import { FunctionsDB, Modals } from "../../../shared/Constants";
import inputStyle from "../../../style/modules/input.module.css";
import buttonStyle from "../../../style/modules/button.module.css";
import { MdOutlineExitToApp } from "react-icons/md";
// import Subs from "./addUser/Subs";
import { useForm } from "react-hook-form";
import ProfileSection from "./addUser/ProfileSection";
import CreditSection from "./addUser/CreditSection";
import { resetPictureVal } from "../../../features/picts/pictureSlice";
import { selectConnected } from "../../../features/connexion/connexionSlice";

const { ipcRenderer } = window.require("electron");

function AddUser() {
  const [isCodeCorrect, setVerification] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      credit: 0,
      dette: 0,
    },
  });

  const currentModal = useSelector(selectCurrentModal);
  const currentUser = useSelector(selectConnected);
  const dispatch = useDispatch();

  const exitHandler = () => {
    dispatch(resetModal());
  };

  const onSubmit = (data) => {
    if (!isCodeCorrect) return;
    data.birthDay = data.birthDay ? new Date(data.birthDay) : null;
    data.dateDebut = data.dateDebut ? new Date(data.dateDebut) : null;
    // data.debutSub = data.debutSub ? new Date(data.debutSub) : null;
    // data.endSub = data.endSub ? new Date(data.endSub) : null;
    data.pictureProfile = data.pictureProfile.length
      ? data.pictureProfile[0].path
      : null;

    const result = Object.assign(data, {
      role: currentUser.role,
    });

    ipcRenderer.send(FunctionsDB.ADD_SUBSCRIBER, result);

    dispatch(resetPictureVal());
    reset();
  };

  return (
    <div
      className={modalStyle.simpleModal}
      active={currentModal === Modals.ADD_USER ? "true" : "false"}
    >
      <MdOutlineExitToApp
        onClick={exitHandler}
        className={modalStyle.IconTopLeftExit}
        size={42}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={modalStyle.addForm}>
        <h1>ajouter un abonné</h1>
        <ProfileSection
          setVerification={setVerification}
          errors={errors}
          register={register}
        />
        <CreditSection errors={errors} register={register} />
        {/* <Subs errors={errors} register={register} /> */}

        <div className={inputStyle.display_2}>
          <div className={inputStyle.display_2}>
            <button type="submit" className={buttonStyle.active}>
              ajouter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
