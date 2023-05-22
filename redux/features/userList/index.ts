import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const isServer = typeof window === "undefined";

interface UserList {
  nickName: string;
  mail: string;
}

const initialState: UserList[] = isServer
  ? []
  : (() => {
      const localUserList = isServer
        ? []
        : (JSON.parse(localStorage.getItem("userList") ?? "[]") as {
            nickName: string;
            mail: string;
          }[]);
      if (localUserList.length && typeof localUserList.length === "number") {
        if (
          localUserList.every((item) => {
            return item.mail && item.nickName;
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
    addAccount: (
      state,
      action: PayloadAction<{
        nickName: string;
        mail: string;
      }>,
    ) => {
      state.push(action.payload);
      localStorage.setItem("userList", JSON.stringify(state));
    },
    removeAccount: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.splice(action.payload,1)
      localStorage.setItem("userList", JSON.stringify(state));
    },
  },
});

export const { removeAccount, addAccount } = UserListSlice.actions;

export default UserListSlice.reducer;
