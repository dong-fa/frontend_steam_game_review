import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../share/request";
import axios from "axios";

const initialState = {
  gameList: [],
  isLoading: false,
  error: null,
};

//Main페이지 가져오기
export const __getGameList = createAsyncThunk(
  "getGameList",
  async (payload, thunkAPI) => {
    try {
      // const { data } = await axiosInstance.get("/api/post");
      const { data } = await axios.get("http://localhost:3001/gameList");
      console.log("메인슬라이스 데이터", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.fulfillWithValue(error);
    }
  }
);

//리덕스
const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {},

  extraReducers: {
    //get
    [__getGameList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getGameList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.gameList = action.payload;
    },
    [__getGameList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default mainSlice.reducer;
