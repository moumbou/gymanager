const { createSlice } = require("@reduxjs/toolkit");

const subSlice = createSlice({
  name: "subs",
  initialState: {
    defaultSubs: [],
    currentSubs: [],
    selectedSub: null,
  },
  reducers: {
    setDefaultSub: (state, action) => {
      state.defaultSubs = action.payload;
    },
    setCurrentSub: (state, action) => {
      state.currentSubs = action.payload;
    },
    setSub: (state, action) => {
      state.selectedSub = action.payload;
    },
    resetSub: (state) => {
      state.selectedSub = null;
    },
  },
});

export const { resetSub, setCurrentSub, setDefaultSub, setSub } =
  subSlice.actions;
export const selectDefalutSubs = (state) => state.subs.defaultSubs;
export const selectCurrentSubs = (state) => state.subs.currentSubs;
export const selectedSub = (state) => state.subs.selectedSub;

export default subSlice.reducer;
