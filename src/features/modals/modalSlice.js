const { createSlice } = require("@reduxjs/toolkit");

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    value: null,
  },
  reducers: {
    setCurrentModal: (state, action) => {
      state.value = action.payload;
    },
    resetModal: (state) => {
      state.value = null;
    },
  },
});

export const { resetModal, setCurrentModal } = modalSlice.actions;
export const selectCurrentModal = (state) => state.modalSlice.value;

export default modalSlice.reducer;
