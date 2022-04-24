import React from "react";
import TitleBar from "./components/title-bar/TitleBar";
import "./style/App.css";
import {
  FunctionsDB,
  NodeFunctions,
  TitleBarContants,
} from "./shared/Constants";
import { useDispatch } from "react-redux";
import { maximize } from "./features/header-buttons/buttonsSlice";
import {
  setConnected,
  setDefaultUsers,
  setDev,
  setPathPictures,
  setUsersExist,
} from "./features/connexion/connexionSlice";
import { setPictureVal } from "./features/picts/pictureSlice";
import AddPicturesPath from "./components/main-content/AddPicturesPath";
import { setDefaultSubs } from "./features/subs/usersSlice";
import { setDefaultSub } from "./features/subs/subsSlice";
import {
  setDefaultPointages,
  setSubscriberPointages,
} from "./features/subs/pointagesSlice";
import { setCode } from "./features/subs/codeSlice";
import Container from "./Container";
import Message from "./components/message/Message";
import { setMessages } from "./features/message/messageSlce";

const { ipcRenderer } = window.require("electron");

function App() {
  const dispatch = useDispatch();
  //? IS DEV
  ipcRenderer.on(FunctionsDB.IS_DEV, (e, args) => {
    dispatch(setDev(args));
  });

  //? LISTEN TO WIDTH AND HEIGHT OF THE WINDOW
  ipcRenderer.on(TitleBarContants.SET_WINDOW, (e, args) => {
    dispatch(maximize(args));
  });

  //? GET USERS
  ipcRenderer.on(FunctionsDB.GET_USERS, (e, args) => {
    const users = JSON.parse(args);
    dispatch(setDefaultUsers(users));
  });

  //? CHECK IF THERE IS USERS IN THE DB
  ipcRenderer.on(FunctionsDB.IS_THERE_USERS, (e, args) => {
    dispatch(setUsersExist(args ? true : false));
  });

  //? REFORMAT PICTURES PATH
  ipcRenderer.on(NodeFunctions.PICTURE_PATH, (e, args) => {
    dispatch(setPictureVal(JSON.parse(args)));
  });

  //? GET PICTURES PATH IF DISPONIBLE
  ipcRenderer.on(NodeFunctions.ADD_PICTURE_PATH, (e, args) => {
    dispatch(setPathPictures(args));
  });

  //? WHEN USER IS CONNECTED
  ipcRenderer.on(FunctionsDB.GET_USER, async (e, args) => {
    const result = JSON.parse(args);
    dispatch(setConnected(result));
  });

  //? GET SUBSCRIBERS
  ipcRenderer.on(FunctionsDB.GET_SUBSCRIBERS, (e, args) => {
    const result = JSON.parse(args);
    dispatch(setDefaultSubs(result));
  });

  //? GET UBSCRIBER POINTAGES
  ipcRenderer.on(FunctionsDB.GET_SUBSCRIBER_POINTAGE, (e, args) => {
    const result = JSON.parse(args);
    dispatch(setSubscriberPointages(result));
  });

  //? VERIFY CODE
  ipcRenderer.on(FunctionsDB.VERIFY_CODE, (e, args) => {
    dispatch(setCode(args));
  });

  //? GET SUBS
  ipcRenderer.on(FunctionsDB.GET_SUBS, (e, args) => {
    const result = JSON.parse(args);
    dispatch(setDefaultSub(result));
  });

  //? GET POINTAGES
  ipcRenderer.on(FunctionsDB.GET_POINTGES, (e, args) => {
    const result = JSON.parse(args);
    dispatch(setDefaultPointages(result));
  });

  //? MESSAGE HANDLER
  ipcRenderer.on(NodeFunctions.MESSAGE_HANDLER, (e, args) => {
    if (args.message.length) dispatch(setMessages(args));
  });

  return (
    <div className="App">
      <TitleBar />
      <Message />
      <AddPicturesPath />
      <Container />
    </div>
  );
}

export default App;
