import React, { useEffect } from "react";
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
import { useForm } from "react-hook-form";
// import Subs from "./modifyUser/Subs";
import ProfileSection from "./modifyUser/ProfileSection";
import CreditSection from "./modifyUser/CreditSection";
import { resetPictureVal } from "../../../features/picts/pictureSlice";
import { selectConnected } from "../../../features/connexion/connexionSlice";
import {
  resetSubscriber,
  selectCurrentSubscriber,
} from "../../../features/subs/usersSlice";
import toInputDate from "../../../shared/toInputDate";

const { ipcRenderer } = window.require("electron");

function ModifyUser() {
  const currentModal = useSelector(selectCurrentModal);
  const currentUser = useSelector(selectConnected);
  const subscriber = useSelector(selectCurrentSubscriber);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (subscriber && Modals.MODIFY_USER === currentModal)
      reset({
        nom: subscriber ? subscriber.nom : "",
        prenom: subscriber ? subscriber.prenom : "",
        adresse: subscriber ? subscriber.adresse : "",
        birthDay: subscriber ? toInputDate(subscriber.birthDay) : "",
        dateDebut: subscriber ? toInputDate(subscriber.dateDebut) : "",
        pictureProfile: subscriber ? subscriber.pictureProfile : "",
        sex: subscriber ? subscriber.sex : "",
        code: subscriber ? `${subscriber.code.substring(0, 6)}...` : "",
        numPrincipale: subscriber ? subscriber.numPrincipale : "",
        numSecondaire: subscriber ? subscriber.numSecondaire : "",
        credit: subscriber ? subscriber.credit : 0,
        dette: subscriber ? subscriber.dette : 0,
      });
  }, [subscriber, reset, currentModal]);

  const onSubmit = (data) => {
    data.birthDay = data.birthDay ? new Date(data.birthDay) : null;
    data.dateDebut = data.dateDebut ? new Date(data.dateDebut) : null;
    data.pictureProfile =
      data.pictureProfile && data.pictureProfile.length
        ? data.pictureProfile[0].path
        : null;

    const result = Object.assign(data, {
      role: currentUser.role,
      _id: subscriber._id,
    });

    ipcRenderer.send(FunctionsDB.EDIT_SUBSCRIBER, result);
  };

  const exitHandler = () => {
    dispatch(resetSubscriber());
    dispatch(resetPictureVal());
    dispatch(resetModal());
  };

  return (
    <div
      className={modalStyle.simpleModal}
      active={currentModal === Modals.MODIFY_USER ? "true" : "false"}
    >
      <MdOutlineExitToApp
        onClick={exitHandler}
        className={modalStyle.IconTopLeftExit}
        size={42}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={modalStyle.addForm}>
        <h1>
          MODIFIER LES INFO DE{" "}
          {subscriber ? `${subscriber.nom} ${subscriber.prenom}` : ""}
        </h1>
        <ProfileSection
          subscriber={subscriber}
          errors={errors}
          register={register}
        />
        <CreditSection
          subscriber={subscriber}
          errors={errors}
          register={register}
        />
        {/* <Subs subscriber={subscriber} errors={errors} register={register} /> */}

        <div className={inputStyle.display_2}>
          <div className={inputStyle.display_2}>
            <button type="submit" className={buttonStyle.active}>
              modifier
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ModifyUser;
