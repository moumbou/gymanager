import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi";
import { AiFillSetting } from "react-icons/ai";
import { VscDebugDisconnect } from "react-icons/vsc";
import { FunctionsDB, Pages } from "../../shared/Constants";
import { useDispatch, useSelector } from "react-redux";
import { selectPage, setPage } from "../../features/sideBar/buttonsSlice";
import {
  selectConnected,
  selectPicturesPath,
  selectUsers,
  setConnected,
  setDefaultUsers,
} from "../../features/connexion/connexionSlice";
import { selectDefaultSubscirbers } from "../../features/subs/usersSlice";
import { selectDefalutSubs } from "../../features/subs/subsSlice";
import defaultPic from "../../img/not-defiened.jpg";

const { ipcRenderer } = window.require("electron");

function SideBar() {
  const currentPage = useSelector(selectPage);
  const currentUser = useSelector(selectConnected);
  const users = useSelector(selectUsers);
  const filePicPath = useSelector(selectPicturesPath);
  const defaultSubscribers = useSelector(selectDefaultSubscirbers);
  const defaultSubs = useSelector(selectDefalutSubs);
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);
  const [selectedPage, setSelectedPage] = useState(currentPage);
  const [desable, setEvents] = useState(false);

  const clickHandler = (e) => {
    const target = e.target.getAttribute("target");
    dispatch(setPage(target));
  };

  const getSubscribersArray = () => {
    if (!defaultSubscribers.length)
      ipcRenderer.send(FunctionsDB.GET_SUBSCRIBERS, currentUser.role);
  };

  const getUsers = () => {
    if (!users.length) ipcRenderer.send(FunctionsDB.GET_USERS, currentUser);
  };

  const getSubsArray = () => {
    if (!defaultSubs.length) ipcRenderer.send(FunctionsDB.GET_SUBS);
  };

  const disconnectHandler = () => {
    dispatch(setDefaultUsers([]));
    dispatch(setConnected(null));
  };

  useEffect(() => {
    if (currentPage === Pages.SIGN_UP || currentPage === Pages.SIGN_IN) return;
    setActive(false);
    setEvents(true);
    setSelectedPage(currentPage);
    setActive(true);
    setEvents(false);
  }, [currentPage]);

  return (
    <div className="SideBar">
      <h3 className={`${active ? "animate" : ""}`}>{selectedPage}</h3>
      <ul className={`${desable ? "desable" : ""}`}>
        <li
          onClick={clickHandler}
          active={`${currentPage === Pages.PROFILE ? "true" : ""}`}
          target={Pages.PROFILE}
        >
          <div
            className="img-profil"
            style={{
              backgroundImage: `url(${
                currentUser
                  ? `${filePicPath}/${currentUser.picture}`
                  : defaultPic
              })`,
            }}
            alt="profil_pic"
          />
        </li>
        <li
          onClick={clickHandler}
          active={`${currentPage === Pages.DASHBOARD ? "true" : ""}`}
          target={Pages.DASHBOARD}
        >
          <MdDashboard />
        </li>
        <li
          onClick={(e) => {
            clickHandler(e);
            return getSubscribersArray();
          }}
          active={`${currentPage === Pages.USERS ? "true" : ""}`}
          target={Pages.USERS}
        >
          <FaUsers />
        </li>
        <li
          onClick={(e) => {
            clickHandler(e);
            return getSubsArray();
          }}
          active={`${currentPage === Pages.SUBS_DOCUMENTS ? "true" : ""}`}
          target={Pages.SUBS_DOCUMENTS}
        >
          <HiDocumentDuplicate />
        </li>
        <li
          onClick={(e) => {
            clickHandler(e);
            return getUsers();
          }}
          active={`${currentPage === Pages.SETTINGS ? "true" : ""}`}
          target={Pages.SETTINGS}
          className={
            currentUser && currentUser.role.includes("admine" || "super-admine")
              ? ""
              : "hide"
          }
        >
          <AiFillSetting />
        </li>
        <li
          onClick={disconnectHandler}
          active={`${currentPage === Pages.SING_OUT ? "true" : ""}`}
          target={Pages.SING_OUT}
        >
          <VscDebugDisconnect />
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
