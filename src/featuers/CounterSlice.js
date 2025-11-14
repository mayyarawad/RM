import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const consterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increament: (state) => {
      state.value += 1;
    },
    decreament: (state) => {
      state.value -= 1;
    },
  },
});

export const { increament, decreament } = consterSlice.actions;

export default consterSlice.reducer;
