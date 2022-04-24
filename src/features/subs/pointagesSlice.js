import { createSlice } from "@reduxjs/toolkit";

const pointageSlice = createSlice({
  name: "pointage",
  initialState: {
    currentPointages: [],
    defaultPointages: [],
    subscriberPointages: [],
  },
  reducers: {
    setCurrentPointages: (state, action) => {
      state.currentPointages = action.payload;
    },
    setDefaultPointages: (state, action) => {
      state.defaultPointages = action.payload;
    },
    setSubscriberPointages: (state, action) => {
      state.subscriberPointages = action.payload;
    },
  },
});

export const {
  setCurrentPointages,
  setDefaultPointages,
  setSubscriberPointages,
} = pointageSlice.actions;
export const selectCurrentPointages = (state) =>
  state.pointage.currentPointages;
export const selectDefaultPointages = (state) =>
  state.pointage.defaultPointages;
export const selectSubscriberPointages = (state) =>
  state.pointage.subscriberPointages;
export default pointageSlice.reducer;
