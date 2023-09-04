import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserProfileType {
  username: string ;
  email: string;
  avatar?: string;
  orgnization?: string;
  description?: string;
  link?: string;
  credit?: any;
}

const isServer = typeof window === "undefined";

const initialState: UserProfileType = isServer
  ? { username: "", email: "" }
  : JSON.parse(
      localStorage.getItem("userProfile") ??
        JSON.stringify({ username: "", email: "" })
    );

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userProfile");
      localStorage.removeItem("Token");
      state.username = "";
      state.email = "";
      state.avatar = "";
      state.orgnization = "";
      state.description = "";
      state.link = "";
      state.credit = "";
    },
    login: (state, action: PayloadAction<UserProfileType>) => {
      localStorage.setItem("userProfile", JSON.stringify(action.payload));
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      state.credit = action.payload.credit;
      state.description = action.payload.description;
      state.email = action.payload.email;
      state.orgnization = action.payload.orgnization;
      state.link = action.payload.link;
    },
  },
});

export const { logout, login } = userProfileSlice.actions;

export default userProfileSlice.reducer;
