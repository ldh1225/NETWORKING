import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // 서버의 baseURL
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // JWT 토큰 가져오기
  console.log("Token in interceptor:", token); // 디버그 로그 추가
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
