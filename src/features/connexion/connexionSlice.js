import { createSlice } from "@reduxjs/toolkit";

const connexionSlice = createSlice({
  name: "connexion",
  initialState: {
    value: null,
    users: false,
    isDev: false,
    path_picutres: null,
    target: null,
    defaultUsers: [],
  },
  reducers: {
    setConnected: (state, action) => {
      state.value = action.payload;
    },
    setUsersExist: (state, action) => {
      state.users = action.payload;
    },
    resetConnexion: (state) => {
      state.value = null;
    },
    setPathPictures: (state, action) => {
      state.path_picutres = action.payload;
    },
    setDefaultUsers: (state, action) => {
      state.defaultUsers = action.payload;
    },
    setTarget: (state, action) => {
      state.target = action.payload;
    },
    setDev: (state, action) => {
      state.isDev = action.payload;
    },
  },
});

export const {
  resetConnexion,
  setConnected,
  setUsersExist,
  setPathPictures,
  setDefaultUsers,
  setTarget,
  setDev,
} = connexionSlice.actions;
export const selectConnected = (state) => state.connexion.value;
export const isThereUser = (state) => state.connexion.users;
export const selectPicturesPath = (state) => state.connexion.path_picutres;
export const selectUsers = (state) => state.connexion.defaultUsers;
export const selectUserTarget = (state) => state.connexion.target;
export const isDev = (state) => state.connexion.isDev;

export default connexionSlice.reducer;
