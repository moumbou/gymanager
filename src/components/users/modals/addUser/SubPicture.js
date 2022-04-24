import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentModal } from "../../../../features/modals/modalSlice";
import { selectPictureVal } from "../../../../features/picts/pictureSlice";
import standarPic from "../../../../img/avatar.png";
import { Modals, NodeFunctions } from "../../../../shared/Constants";

const { ipcRenderer } = window.require("electron");

function SubPicture({ register }) {
  const [picture, setPicture] = useState(null);

  const selectPictureValForRegistration = useSelector(selectPictureVal);
  const currentPage = useSelector(selectCurrentModal);

  useEffect(() => {
    if (selectPictureValForRegistration && currentPage === Modals.ADD_USER) {
      setPicture(selectPictureValForRegistration);
    } else {
      setPicture(null);
    }
  }, [selectPictureValForRegistration, currentPage]);

  const addPicHandler = () => {
    document.getElementById("addPic").click();
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
        id="addPic"
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
