import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://3.37.88.65:8080", //현우님 서버
  baseURL: "http://3.38.107.133:8080", // 윤종님 서버
});
