import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPicturesPath } from "../../../../features/connexion/connexionSlice";
import { selectCurrentModal } from "../../../../features/modals/modalSlice";
import { selectPictureVal } from "../../../../features/picts/pictureSlice";
import standarPic from "../../../../img/not-defiened.jpg";
import { Modals, NodeFunctions } from "../../../../shared/Constants";

const { ipcRenderer } = window.require("electron");

function SubPicture({ register, subscriber }) {
  const [picture, setPicture] = useState(null);

  const picturesPath = useSelector(selectPicturesPath);
  const selectPictureValForRegistration = useSelector(selectPictureVal);
  const currentPage = useSelector(selectCurrentModal);

  useEffect(() => {
    if (subscriber && subscriber.pictureProfile) {
      setPicture(`${picturesPath}/${subscriber.pictureProfile}`);
    }
    if (selectPictureValForRegistration && currentPage === Modals.MODIFY_USER) {
      setPicture(selectPictureValForRegistration);
    } else if (!selectPictureValForRegistration && !subscriber) {
      setPicture(null);
    }
  }, [selectPictureValForRegistration, currentPage, subscriber, picturesPath]);

  const addPicHandler = () => {
    document.getElementById("editPic").click();
  };

  const acceptedFormat = (e) => {
    const file = e.target.files[0];
    const isValide = ["image/jpeg", "image/png", "image/gif"].includes(
      file.type
    );
    if (isValide) {
      ipcRenderer.send(NodeFunctions.PICTURE_PATH, file.path);
    } else {
      setPicture(null);
    }
  };

  return (
    <>
      <div
        target="avatar"
        style={{ backgroundImage: `url("${picture ? picture : standarPic}")` }}
        onClick={addPicHandler}
        placeholder="ajouter une photo"
      ></div>

      <input
        id="editPic"
        type="file"
        className="hide"
        {...register("pictureProfile", {
          onChange: (e) => acceptedFormat(e),
        })}
      />
    </>
  );
}

export default SubPicture;
