const { createSlice } = require("@reduxjs/toolkit");

const pictureSlice = createSlice({
  name: "picture",
  initialState: {
    value: null,
  },
  reducers: {
    setPictureVal: (state, action) => {
      state.value = action.payload;
    },
    resetPictureVal: (state) => {
      state.value = null;
    },
  },
});

export const { resetPictureVal, setPictureVal } = pictureSlice.actions;
export const selectPictureVal = (state) => state.picture.value;
export default pictureSlice.reducer;
