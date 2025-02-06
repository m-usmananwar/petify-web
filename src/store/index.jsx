import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx";

const appStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default appStore;
