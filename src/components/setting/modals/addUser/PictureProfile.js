import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentModal } from "../../../../features/modals/modalSlice";
import { selectPictureVal } from "../../../../features/picts/pictureSlice";
import defaultPic from "../../../../img/not-defiened.jpg";
import { ModalsSetting, NodeFunctions } from "../../../../shared/Constants";

const { ipcRenderer } = window.require("electron");

function PictureProfile({ register }) {
  const [picture, setPicture] = useState(null);

  const selectPictureValForRegistration = useSelector(selectPictureVal);
  const currentModal = useSelector(selectCurrentModal);

  useEffect(() => {
    if (
      selectPictureValForRegistration &&
      currentModal === ModalsSetting.ADD_USER
    ) {
      setPicture(selectPictureValForRegistration);
    } else {
      setPicture(null);
    }
  }, [selectPictureValForRegistration, currentModal]);

  const onClick = () => {
    document.getElementById("add-user-picture").click();
  };

  const acceptedFormat = (e) => {
    const file = e.target.files[0];
    const isValide = ["image/jpeg", "image/png", "image/gif"].includes(
      file.type
    );
    if (isValide) {
      ipcRenderer.send(NodeFunctions.PICTURE_PATH, file.path);
    } else {
      e.target.value = "";
      setPicture(null);
    }
  };

  return (
    <div data-target="picture-user">
      <div
        style={{ backgroundImage: `url(${picture ? picture : defaultPic})` }}
        onClick={onClick}
      />
      <input
        type="file"
        id="add-user-picture"
        className="hide"
        {...register("picture", {
          onChange: (e) => acceptedFormat(e),
        })}
      />
    </div>
  );
}

export default PictureProfile;
