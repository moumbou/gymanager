import { createSlice } from "@reduxjs/toolkit";
import { Pages } from "../../shared/Constants";

const buttonsSlice = createSlice({
  name: "buttonsSlice",
  initialState: {
    currentPage: Pages.DASHBOARD,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = buttonsSlice.actions;
export const selectPage = (state) => state.buttonsSlice.currentPage;

export default buttonsSlice.reducer;
