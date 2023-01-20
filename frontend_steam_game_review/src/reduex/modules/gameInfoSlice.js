import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../share/request";
import axios from "axios"; // axios import 합니다.

const initialState = {
  gameList: [],
  isLoading: false,
  error: null,
};

//디테일페이지
export const __getgames = createAsyncThunk(
  "getGames",
  async (payload, thunkAPI) => {
    try {
      //백 연결시 const data = await axiosInstance.get(`/api/post/${payload}`);
      const data = await axios.get(`http://localhost:3001/gameList/${payload}`);
      // console.log("겟게임 데이터", data);
      // console.log("겟게임 페이로드", payload);
      console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __addgame = createAsyncThunk(
  "addGame",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3001/gameList", payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const __deleteTodos = createAsyncThunk(
//   "deleteTodos",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.delete(`http://localhost:3001/todos/${payload}`);
//       console.log(data);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const gameInfoSlice = createSlice({
  name: "gameList",
  initialState,
  reducers: {},
  extraReducers: {
    // get 받아오는 리듀서
    [__getgames.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getgames.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.gameList = action.payload;
      console.log("풀필드", state.gameList);
    },
    [__getgames.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    // post 보내는 리듀서
    [__addgame.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.gameList.push(action.payload);
    },
    [__addgame.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export default gameInfoSlice.reducer;
