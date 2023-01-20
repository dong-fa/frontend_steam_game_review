import { configureStore } from "@reduxjs/toolkit";
import loginSignUp from "../modules/loginSignUp";
import comments from "../modules/commentsSlice";
import mainSlice from "../modules/mainSlice";
import gameList from "../modules/gameInfoSlice";

const store = configureStore({
  reducer: { loginSignUp: loginSignUp, comments, gameList, mainSlice },
});

export default store;
