"use client"
import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./features/userProfile";
import userListReducer from "./features/userList";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const defaultStore: RootState = {
  currentUserProfile: { username: "" },
  localUserList: [],
};

export const store = configureStore({
  reducer: {
    currentUserProfile: userProfileReducer,
    localUserList: userListReducer,
  },
});
