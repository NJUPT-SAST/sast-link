"use client";

import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./features/userProfile";
import userListReducer from "./features/userList";
import messageReducer from "./features/message";
import LoginReducer from "./features/login";
import PanelStateReducer from "./features/panelState";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const defaultStore: RootState = {
  currentUserProfile: { username: "", email: "" },
  localUserList: [],
  message: { icon: null, content: null, delay: null },
  loginMessage: { loginTicket: null, redirect: null },
  panelState: { homeAppPanel: false, homeInfoPanel: false },
};

export const store = configureStore({
  reducer: {
    currentUserProfile: userProfileReducer,
    localUserList: userListReducer,
    message: messageReducer,
    loginMessage: LoginReducer,
    panelState: PanelStateReducer,
  },
});
