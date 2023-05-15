import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./features/userProfile";

export default configureStore({
  reducer: {
    userProfile: userProfileReducer,
  },
});
