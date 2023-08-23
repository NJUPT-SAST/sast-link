import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const isServer = typeof window === "undefined";

interface UserList {
  Token: string;
  avator?: string;
  nickName: string;
  email: string;
}

const initialState: UserList[] = isServer
  ? []
  : (() => {
      const localUserList = JSON.parse(
        localStorage.getItem("userList") ?? "[]"
      ) as UserList[];
      if (localUserList.length && typeof localUserList.length === "number") {
        if (
          localUserList.every((item) => {
            return item.email && item.nickName;
          })
        ) {
          return localUserList;
        }
      }
      localStorage.setItem("userList", "[]");
      return [];
    })();

const UserListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<UserList>) => {
      // 添加账户，更新localStorage
      let veri = true;
      state.forEach((value) => {
        if (value.email === action.payload.email) veri = false;
      });
      if (veri) {
        state.push(action.payload);
        localStorage.setItem("userList", JSON.stringify(state));
      }
    },
    removeAccount: (state, action: PayloadAction<number>) => {
      // 删除账户 更新localStorage
      state.splice(action.payload, 1);
      localStorage.setItem("userList", JSON.stringify(state));
    },
  },
});

export const { removeAccount, addAccount } = UserListSlice.actions;

export default UserListSlice.reducer;
