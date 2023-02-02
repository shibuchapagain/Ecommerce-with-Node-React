import { createSlice } from "@reduxjs/toolkit";

const UserSlicer = createSlice({
  name: "user",
  initialState: {
    userDetail: null,
  },
  reducers: {
    userStore: (state, action) => {
      state.userDetail = action.payload;
    },
    logout: (state) => {
      state.userDetail = null;
    },
  },
});

export const { userStore, logout } = UserSlicer.actions;
export default UserSlicer.reducer;
