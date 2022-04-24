import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isThereUser,
  selectConnected,
} from "./features/connexion/connexionSlice";
import { selectPage, setPage } from "./features/sideBar/buttonsSlice";
import { Pages } from "./shared/Constants";
import MainContainer from "./components/main-content/MainContainer";
import Login from "./components/connexion/Login";
import Register from "./components/connexion/Register";

function Container() {
  const dispatch = useDispatch();
  const selectConnectedUser = useSelector(selectConnected);
  const currentPage = useSelector(selectPage);
  const isThereUsers = useSelector(isThereUser);

  useEffect(() => {
    console.log(
      selectConnectedUser &&
        (currentPage === Pages.SIGN_IN || currentPage === Pages.SIGN_UP)
    );
    if (
      selectConnectedUser &&
      (currentPage === Pages.SIGN_IN || currentPage === Pages.SIGN_UP)
    )
      setTimeout(() => {
        dispatch(setPage(Pages.DASHBOARD));
      }, 2000);

    if (!selectConnectedUser && isThereUsers) dispatch(setPage(Pages.SIGN_IN));
    if (!selectConnectedUser && !isThereUsers) dispatch(setPage(Pages.SIGN_UP));
  }, [selectConnectedUser, isThereUsers, dispatch, currentPage]);
  return (
    <>
      {currentPage !== Pages.SIGN_IN && currentPage !== Pages.SIGN_UP ? (
        <MainContainer />
      ) : currentPage === Pages.SIGN_IN ? (
        <Login />
      ) : currentPage === Pages.SIGN_UP ? (
        <Register />
      ) : (
        <></>
      )}
    </>
  );
}

export default Container;
