import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserProfileType } from "@/lib/apis/type";

const initialState: UserProfileType = {
  nickname: "~",
  email: "~",
  dep: null,
  org: null,
  avatar: null,
  bio: null,
  link: null,
  badge: null,
  hide: null,
};

interface EditableProfileType {
  nickname: string | null;
  dep: string | null;
  org: string | null;
  bio: string;
  link: string[] | null;
  hide: string[] | null;
}

const userBasicInfo = createSlice({
  name: "userBasicInfo",
  initialState,
  reducers: {
    setUserBasicInfo: (state, action: PayloadAction<UserProfileType>) => {
      return action.payload;
    },
    updateBasicInfo: (state, action: PayloadAction<EditableProfileType>) => {
      return { ...state, ...action };
    },
  },
});

export const { setUserBasicInfo, updateBasicInfo } = userBasicInfo.actions;

export default userBasicInfo.reducer;
