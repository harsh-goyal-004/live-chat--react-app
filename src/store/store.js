import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});

export default store;
