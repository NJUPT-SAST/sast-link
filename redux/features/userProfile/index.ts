import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserProfileType {
  username: string | null;
}

const isServer = typeof window === "undefined";

const initialState: UserProfileType = isServer
  ? { username: "" }
  : {
      username: localStorage.getItem("username"),
    };

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("username");
      state.username = null;
    },
    login: (state, action: PayloadAction<string>) => {
      localStorage.setItem("username", action.payload);
      state.username = action.payload;
    },
  },
});

export const { logout, login } = userProfileSlice.actions;

export default userProfileSlice.reducer;
