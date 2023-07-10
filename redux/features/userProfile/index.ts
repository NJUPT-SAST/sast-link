import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserProfileType {
  username: string | null;
}

const isServer = typeof window === "undefined";

const initialState: UserProfileType = isServer
  ? { username: "" }
  : JSON.parse(
      localStorage.getItem("userProfile") ?? JSON.stringify({ username: "" })
    );

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userProfile");
      localStorage.removeItem("Token");
      state.username = "";
    },
    login: (state, action: PayloadAction<{ username: string }>) => {
      localStorage.setItem("userProfile", JSON.stringify(action.payload));
      state.username = action.payload.username;
    },
  },
});

export const { logout, login } = userProfileSlice.actions;

export default userProfileSlice.reducer;
