import React from "react";
import "../../style/MainContainer.css";
import AddUser from "../setting/modals/AddUser";
import DeleteUserSetting from "../setting/user-section/DeleteUserSetting";
import CheckOut from "../users/modals/CheckOut";
import Content from "./Content";
import SideBar from "./SideBar";
import SubModalPage from "./SubModalPage";
import UserPageModals from "./UserPageModals";

function MainContainer() {
  return (
    <div className="main-container">
      <SideBar />
      <Content />
      <UserPageModals />
      <SubModalPage />
      <AddUser />
      <CheckOut />
      <DeleteUserSetting />
    </div>
  );
}

export default MainContainer;
