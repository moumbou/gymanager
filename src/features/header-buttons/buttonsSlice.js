const { createSlice } = require("@reduxjs/toolkit");

const buttonsSlice = createSlice({
  name: "headerButtons",
  initialState: {
    show: true,
    maximize: false,
    hide: false,
    devTools: false,
  },
  reducers: {
    show: (state, action) => {
      state.show = action.payload;
    },
    maximize: (state, action) => {
      state.maximize = action.payload;
    },
    hide: (state, action) => {
      state.hide = action.payload;
    },
    devTools: (state, action) => {
      state.devTools = action.payload;
    },
  },
});

export const { devTools, hide, maximize, show } = buttonsSlice.actions;

export const selectShow = (state) => state.headerButtons.show;
export const selectHide = (state) => state.headerButtons.hide;
export const selectDevTools = (state) => state.headerButtons.devTools;
export const selectMaximize = (state) => state.headerButtons.maximize;

export default buttonsSlice.reducer;
