import React from "react";
import { useSelector } from "react-redux";
import { selectPage } from "../../features/sideBar/buttonsSlice";
import { Pages } from "../../shared/Constants";
import styles from "../../style/modules/users.module.css";
import ContentSection from "./ContentSection";
import SearchUsersSection from "./SearchUsersSection";

function Users() {
  const currentPage = useSelector(selectPage);

  return (
    <div
      className={`${currentPage !== Pages.USERS ? "hide" : ""} ${
        styles.container
      }`}
    >
      <SearchUsersSection styles={styles} />
      <ContentSection styles={styles} />
    </div>
  );
}

export default Users;
