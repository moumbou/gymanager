const { createSlice } = require("@reduxjs/toolkit");

const usersSlice = createSlice({
  name: "subscribers",
  initialState: {
    defaultSubs: [],
    currentSubs: [],
    selectedSubscriber: null,
  },
  reducers: {
    setDefaultSubs: (state, action) => {
      state.defaultSubs = action.payload;
    },
    setCurrentSubs: (state, action) => {
      state.currentSubs = action.payload;
    },
    setSubscriber: (state, action) => {
      state.selectedSubscriber = action.payload;
    },
    resetSubscriber: (state) => {
      state.selectedSubscriber = null;
    },
  },
});

export const {
  setCurrentSubs,
  setDefaultSubs,
  setSubscriber,
  resetSubscriber,
} = usersSlice.actions;
export const selectDefaultSubscirbers = (state) =>
  state.subscribers.defaultSubs;
export const selectCurrentSubscribers = (state) =>
  state.subscribers.currentSubs;
export const selectCurrentSubscriber = (state) =>
  state.subscribers.selectedSubscriber;

export default usersSlice.reducer;
