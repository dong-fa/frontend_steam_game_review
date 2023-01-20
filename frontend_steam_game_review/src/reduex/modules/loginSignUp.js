import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../share/request";
import jwtdecode from "jwt-decode";
import axios from "axios";

const initialState = {
  userInfo: [],
  error: null,
  isLoading: false,
  loginCheck: false,
};

//로그인
export const __postLogin = createAsyncThunk(
  "login",
  async ({ user, navigate }, thunkAPI) => {
    try {
      const data = await axiosInstance.post(`/api/auth/login`, user);

      //토큰을 로컬에 저장
      const token = data.headers.get("Authorization");
      localStorage.setItem("token", token);
      console.log(localStorage.getItem("token"));

      //로그인 성공시
      if (data.data.statuscode === 200) {
        const userid = jwtdecode(token);
        alert(`${userid.sub}님 환영합니다`);
      }
      navigate("/");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      const errorObject = error.response.data;

      //에러코드 처리
      if (errorObject.status === 400) {
        alert(`${errorObject.message}`);
      }

      return thunkAPI.rejectWithValue(error);
    }
  }
);

//회원가입
export const __signUp = createAsyncThunk(
  "signUp",
  async (payload, thunkAPI) => {
    try {
      //`/api/auth/signup`
      const data = await axiosInstance.post(`/api/auth/signup`, payload); // 원래 경로
      // const data = await axiosInstance.post(
      //   `http://3.38.107.133/api/auth/signup`,
      //   payload
      // );
      console.log(data);
      alert(`${data.data.data}`);
      payload.navigate("/");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      //에러
      console.log(error);
      alert(`${error.response.data.message}`);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __idCheck = createAsyncThunk(
  "idCheck",
  async (payload, thunkAPI) => {
    console.log("아이디 체크", payload);
    try {
      const data = await axiosInstance.post(
        `/api/auth/signup/idcheck`,
        payload
      );
      console.log(data);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      //에러 메세지
      console.log(error);
      alert(`${error.response.data.message}`);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//리덕스
export const loginSignUp = createSlice({
  name: "loginSignUp",
  initialState,
  reducers: {
    logOut: (state, payload) => {
      state.loginCheck = false;
    },
  },
  extraReducers: {
    //로그인
    [__postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__postLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //회원가입
    [__signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [__signUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userInfo.push(action.payload);
    },
    [__signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //아이디중복확인
    [__idCheck.pending]: (state) => {
      state.isLoading = true;
    },
    [__idCheck.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userInfo.push(action.payload);
    },
    [__idCheck.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(action.payload);
    },
  },
});
export const { logOut } = loginSignUp.actions;
export default loginSignUp.reducer;
