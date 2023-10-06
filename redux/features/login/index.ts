import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginMessage {
  loginTicket: string | null;
  redirect: string | null;
}

const initialState: LoginMessage = {
  loginTicket: null,
  redirect: null,
};

const LoginMessage = createSlice({
  name: "loginMessage",
  initialState,
  reducers: {
    addLoginTicket: (state, action: PayloadAction<string>) => {
      state.loginTicket = action.payload;
    },
    addRedirect: (state, action: PayloadAction<string>) => {
      state.redirect = action.payload;
    },
    clearLoginMessage: (state) => {
      state.loginTicket = null;
      state.redirect = null;
    },
  },
});

export const { addLoginTicket, addRedirect, clearLoginMessage } =
  LoginMessage.actions;

export default LoginMessage.reducer;
