import { configureStore } from "@reduxjs/toolkit";
import buttonsHeaderReducer from "../features/header-buttons/buttonsSlice";
import buttonsSideBarReducer from "../features/sideBar/buttonsSlice";
import modalSliceReducer from "../features/modals/modalSlice";
import connexionSliceReducer from "../features/connexion/connexionSlice";
import pictureSliceReducer from "../features/picts/pictureSlice";
import codeSliceReducer from "../features/subs/codeSlice";
import subscribersSliceReducer from "../features/subs/usersSlice";
import subsSliceReducer from "../features/subs/subsSlice";
import pointagesSliceReducer from "../features/subs/pointagesSlice";
import messagesSliceReducer from "../features/message/messageSlce";

export const store = configureStore({
  reducer: {
    headerButtons: buttonsHeaderReducer,
    buttonsSlice: buttonsSideBarReducer,
    modalSlice: modalSliceReducer,
    connexion: connexionSliceReducer,
    picture: pictureSliceReducer,
    code: codeSliceReducer,
    subscribers: subscribersSliceReducer,
    subs: subsSliceReducer,
    pointage: pointagesSliceReducer,
    message: messagesSliceReducer,
  },
});
