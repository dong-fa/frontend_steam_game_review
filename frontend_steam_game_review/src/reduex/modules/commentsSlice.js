import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../share/request";
import axios from "axios"; // axios import 합니다.

const initialState = {
  comments: [],
  comment: {
    postId: 0,
    comment: "",
  },
  disabledToggle: false,
  isLoading: false,
  error: null,
};
const config = {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
};
export const __getComments = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    //console.log("겟 페이로드", payload);
    try {
      /*const data = await axios.get(
        `http://localhost:3001/comments?postId=${payload}`
      ); //로컬용*/
      const data = await axiosInstance.get(`/detail/comment/${payload}`);
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
      // const data = await axios.post("http://localhost:3001/comments", payload); //로컬용
      const data = await axiosInstance.post(
        `/detail/comment/${payload.postId}`,
        payload,
        config
      );
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
      // const data = await axios.delete(
      //   `http://localhost:3001/comments/${payload}`
      // );

      const data = await axiosInstance.post(
        `/detail/comment/${payload.postId}/${payload.commentId}`,
        payload,
        config
      );
      console.log("딜리트데이터", data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      const errorObject = error.response.data;
      if (errorObject.status === 400) {
        alert(errorObject.message);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __updateCommentDetail = createAsyncThunk(
  //업데이트
  "todos/update_comments",
  async (payload, thunkAPI) => {
    try {
      const updateComment = payload.updateComment;
      // await axios.patch(
      //   `http://localhost:3001/comments/${updateComment.id}`,
      //   updateComment
      // );
      console.log(payload);
      await axiosInstance.patch(
        `/detail/comment/${updateComment.postId}/${updateComment.commentId}`,
        updateComment,
        config
      );
      return thunkAPI.fulfillWithValue(updateComment);
    } catch (error) {
      const errorObject = error.response.data;
      console.log(error.response.data.status);
      if (errorObject.status === 400) {
        return alert(errorObject.message);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  // name: "comment",
  initialState,
  reducers: {
    isDisabledToggle: (state, action) => {
      console.log(action);
      console.log(state);
      state.disabledToggle = action.payload;
    },
  },
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
      state.isLoading = false;
      console.log(state.comments);
      const target = state.comments.findIndex(
        (comment) => comment.id === action.payload
      );
      console.log("액션페이로드", action.payload);
      state.comments.splice(target, 1); // state 변화 생김
    },
    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // update 리듀서
    [__updateCommentDetail.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__updateCommentDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      console.log(state.comments);
      // state.comments = [...state.comments].map((comment) => {
      //   if (comment.commentId === action.payload.commentId) {
      //     const newComment = comment;
      //     newComment.comment = action.payload.comment;
      //     return newComment;
      //   }
      //   return comment;
      // });
      const target = state.comments.findIndex(
        (comment) => comment.commentId === action.payload.commentId
      );
      console.log(target);
      state.comments.splice(target, 1, action.payload);
    },
    [__updateCommentDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { isDisabledToggle } = commentsSlice.actions;
export default commentsSlice.reducer;
