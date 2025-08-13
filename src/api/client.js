import axios from "axios";

const client = axios.create({
  baseURL: "http://54.180.95.200:3000/api",
});

// Axios 요청 인터셉터: 요청 전에 헤더에 토큰 추가
client.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios 응답 인터셉터: 401 에러 시 토큰 갱신 시도
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // 여기서 refresh API를 직접 호출하는 대신, authService를 사용해야 하지만
        // 순환 참조 문제를 피하기 위해 직접 client를 사용합니다.
        const { data } = await client.get("/auth/access-token/refresh");
        const { accessToken } = data;
        localStorage.setItem("accessToken", accessToken);
        client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰 만료 시 로그아웃 처리
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // 필요하다면 로그인 페이지로 리디렉션
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default client;
