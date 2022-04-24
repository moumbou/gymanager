import React from "react";
import { useSelector } from "react-redux";
import { selectPage } from "../../features/sideBar/buttonsSlice";
import { Pages } from "../../shared/Constants";
import styles from "../../style/modules/profile.module.css";
import Account from "./Account";

function Profile() {
  const currentPage = useSelector(selectPage);

  return (
    <div
      className={`${currentPage !== Pages.PROFILE ? "hide" : ""} ${
        styles.container
      }`}
    >
      <div target="content">
        <Account />
      </div>
    </div>
  );
}

export default Profile;
