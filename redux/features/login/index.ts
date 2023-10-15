import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginMessage {
  loginTicket: string | null; // loginTicket
  redirect: string | null; // 存放登陆后重定向路由
}

const initialState: LoginMessage = {
  loginTicket: null,
  redirect: null,
};

const LoginMessage = createSlice({
  name: "loginMessage",
  initialState,
  reducers: {
    // 添加 login ticket
    addLoginTicket: (state, action: PayloadAction<string>) => {
      state.loginTicket = action.payload;
    },
    // 添加 redirect
    addRedirect: (state, action: PayloadAction<string>) => {
      state.redirect = action.payload;
    },
    // 清除登录信息
    clearLoginMessage: (state) => {
      state.loginTicket = null;
      state.redirect = null;
    },
  },
});

export const { addLoginTicket, addRedirect, clearLoginMessage } =
  LoginMessage.actions;

export default LoginMessage.reducer;
