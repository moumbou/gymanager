const { createSlice } = require("@reduxjs/toolkit");

const codeSlice = createSlice({
  name: "code",
  initialState: {
    value: null,
  },
  reducers: {
    setCode: (state, action) => {
      state.value = action.payload;
    },
    resetCode: (state) => {
      state.value = null;
    },
  },
});

export const { setCode, resetCode } = codeSlice.actions;
export const selectCode = (state) => state.code.value;

export default codeSlice.reducer;
