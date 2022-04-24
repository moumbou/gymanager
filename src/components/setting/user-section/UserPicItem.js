import React from "react";
import { useSelector } from "react-redux";
import { selectPicturesPath } from "../../../features/connexion/connexionSlice";
import defaultPic from "../../../img/not-defiened.jpg";

function UserPicItem({ user }) {
  const folderPath = useSelector(selectPicturesPath);

  return (
    <>
      <div
        target="user-pic"
        style={{
          backgroundImage: `url(${
            user && user.picture ? `${folderPath}/${user.picture}` : defaultPic
          })`,
        }}
      />
    </>
  );
}

export default UserPicItem;
