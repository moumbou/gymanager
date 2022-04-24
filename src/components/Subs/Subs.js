import React from "react";
import { useSelector } from "react-redux";
import { selectPage } from "../../features/sideBar/buttonsSlice";
import { Pages } from "../../shared/Constants";
import styles from "../../style/modules/subs.module.css";
import SearchSubsSection from "./SearchSubsSection";
import SubsContent from "./SubsContent";

function Subs() {
  const currentPage = useSelector(selectPage);

  return (
    <div
      className={`${currentPage !== Pages.SUBS_DOCUMENTS ? "hide" : ""} ${
        styles.container
      }`}
    >
      <SearchSubsSection styles={styles} />
      <SubsContent styles={styles} />
    </div>
  );
}

export default Subs;
