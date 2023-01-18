import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../share/request";
import axios from "axios"; // axios import 합니다.

const initialState = {
  comments: [],
  comment: {
    id: 0,
    comment: "",
  },
  isLoading: false,
  error: null,
};

export const __getComments = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    console.log("겟 페이로드", payload);
    try {
      const data = await axios.get(
        `http://localhost:3001/comments?postId=${payload}`
      ); //로컬용
      // const data = await axiosInstance.get(`/detail/comment/${payload}`);
      // console.log("리듀서 겟 받기", data);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __addComment = createAsyncThunk(
  "addComment",
  async (payload, thunkAPI) => {
    console.log("에드 페이로드", payload);
    try {
      const data = await axios.post("http://localhost:3001/comments", payload); //로컬용
      // const data = await axiosInstance.post(
      //   `/detail/comment/${payload.postId}`,
      //   payload
      // );
      // console.log(data);
      // console.log("코멘트 페이로드", payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __deleteComment = createAsyncThunk(
  "deleteComment",
  async (payload, thunkAPI) => {
    console.log("딜리트 페이로드", payload);
    try {
      const data = await axios.delete(
        `http://localhost:3001/comments/${payload}`
      );
      // // const data = await axiosInstance.delete(
      // //   `/detail/comment/${payload.postId}/${payload.commentId}`
      // );
      console.log("딜리트데이터", data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  // name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    // get 받아오는 리듀서
    [__getComments.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comments = action.payload;
      console.log("풀필드", state.comments);
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    // post 보내는 리듀서
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comments.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    // delete 리듀서
    [__deleteComment.fulfilled]: (state, action) => {
      const target = state.comments.findIndex(
        (comment) => comment.id === action.payload
      );
      console.log("액션페이로드", action.payload);
      state.comments.splice(target, 1);
    },
    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.rejected]: () => {},
  },
});

export default commentsSlice.reducer;
