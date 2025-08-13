import client from "../api/client";

/**
 * 카카오 로그인을 요청합니다.
 * @param {string} code 카카오 인가 코드
 */
export const kakaoLogin = async (code) => {
  const response = await client.post("/auth/login/kakao", { code });
  return response.data;
};

/**
 * 로그아웃을 요청합니다.
 */
export const logout = async () => {
  const response = await client.get("/auth/logout");
  return response.data;
};

/**
 * 액세스 토큰 재발급을 요청합니다.
 */
export const refreshAccessToken = async () => {
  const response = await client.get("/auth/access-token/refresh");
  return response.data;
};
