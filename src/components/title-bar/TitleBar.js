import React from "react";
import "../../style/TitleBar.css";
import { FiMinimize, FiMaximize } from "react-icons/fi";
import { BiExit } from "react-icons/bi";
import { AiFillTool } from "react-icons/ai";
import { VscChromeMinimize } from "react-icons/vsc";
import { TitleBarContants } from "../../shared/Constants";
import { useSelector } from "react-redux";
import { selectMaximize } from "../../features/header-buttons/buttonsSlice";
import { isDev } from "../../features/connexion/connexionSlice";
const { ipcRenderer } = window.require("electron/renderer");

function TitleBar() {
  const isMaximized = useSelector(selectMaximize);
  const IsDev = useSelector(isDev);

  const clickHnadler = (e) => {
    const target = e.target.getAttribute("target");
    ipcRenderer.send(TitleBarContants.SET_WINDOW, target);
  };

  return (
    <div className="title-bar">
      <div className="logo-container">
        <img src={require("../../img/logo.png")} alt="logo_image" />
        <span>gymanager</span>
      </div>
      <div className="buttons-container">
        {IsDev ? (
          <button onClick={clickHnadler} target={TitleBarContants.DEVTOOLS}>
            <AiFillTool />
          </button>
        ) : (
          <></>
        )}

        <button onClick={clickHnadler} target={TitleBarContants.HIDE}>
          <VscChromeMinimize />
        </button>

        <button
          onClick={clickHnadler}
          target={
            !isMaximized ? TitleBarContants.MAXIMIZE : TitleBarContants.MINIMIZE
          }
        >
          {isMaximized ? <FiMinimize /> : <FiMaximize />}
        </button>

        <button onClick={clickHnadler} target={TitleBarContants.EXIT}>
          <BiExit />
        </button>
      </div>
    </div>
  );
}

export default TitleBar;
