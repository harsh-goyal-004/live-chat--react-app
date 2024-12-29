import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "auth",
  initialState: {
    userStatus: false,
    userData: null,
    loading: true,
  },
  reducers: {
    login: (state, action) => {
      state.userStatus = true;
      const { accessToken, displayName, email, uid } = action.payload;
      state.userData = { accessToken, displayName, email, uid };
      state.loading = false;
    },
  },

  logout: (state) => {
    state.userStatus = false;
    state.userData = null;
    state.loading = false;
  },
});

export const { login, logout } = UserSlice.actions;

export default UserSlice.reducer;
