import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../featuers/UserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
