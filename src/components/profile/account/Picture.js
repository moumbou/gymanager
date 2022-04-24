import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPicturesPath } from "../../../features/connexion/connexionSlice";
import {
  selectPictureVal,
  setPictureVal,
} from "../../../features/picts/pictureSlice";
import { selectPage } from "../../../features/sideBar/buttonsSlice";
import { NodeFunctions, Pages } from "../../../shared/Constants";
import defaultPic from "../../../img/not-defiened.jpg";

const { ipcRenderer } = window.require("electron");

function Picture({ register, user }) {
  const [picture, setPicture] = useState(null);

  const picturesPath = useSelector(selectPicturesPath);
  const selectPictureValForRegistration = useSelector(selectPictureVal);
  const currentPage = useSelector(selectPage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.picture) {
      setPicture(`${picturesPath}/${user.picture}`);
    }
    if (selectPictureValForRegistration && currentPage === Pages.PROFILE) {
      setPicture(selectPictureValForRegistration);
    } else if (!selectPictureValForRegistration && !user) {
      setPicture(null);
    }
  }, [selectPictureValForRegistration, currentPage, user, picturesPath]);

  const addPicHandler = () => {
    document.getElementById("profile-edit-pic").click();
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
      if (selectPictureValForRegistration === null)
        dispatch(setPictureVal(undefined));
      else dispatch(setPictureVal(null));
      setPicture(null);
    }
  };
  return (
    <>
      <div
        onClick={addPicHandler}
        target="profile-pic"
        style={{
          backgroundImage: `url(${picture ? picture : defaultPic})`,
        }}
      >
        <span>modifier la photo</span>
      </div>
      <input
        type="file"
        className="hide"
        id="profile-edit-pic"
        {...register("picture", {
          onChange: (e) => acceptedFormat(e),
        })}
      />
    </>
  );
}

export default Picture;
