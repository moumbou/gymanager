import React from "react";
import { useSelector } from "react-redux";
import { selectPage } from "../../features/sideBar/buttonsSlice";
import { Pages } from "../../shared/Constants";
import style from "../../style/modules/setting.module.css";
import SectionTitle from "./SectionTitle";
import UserSection from "./user-section/UserSection";


function Setting() {
  const currentPage = useSelector(selectPage);


  return (
    <div
      className={`${Pages.SETTINGS === currentPage ? "" : "hide"} ${
        style.container
      }`}
    >
        <SectionTitle title={'utilisateurs'} />
        <UserSection />
    </div>
  );
}

export default Setting;
