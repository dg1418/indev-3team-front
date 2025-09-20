import client from "../api/client";

/**
 * 카카오 로그인을 요청하고 토큰을 저장합니다.
 * @param {string} code 카카오 인가 코드
 */
export const kakaoLogin = async (code) => {
  try {
    const response = await client.post("/auth/login/kakao", { code });
    const { accessToken } = response.data;

    if (accessToken) {
      // localStorage에 accessToken 저장
      localStorage.setItem("accessToken", accessToken);
      // API 클라이언트의 헤더에 토큰 설정 (이미 인터셉터가 있지만, 즉시 적용을 위해 명시)
      client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }

    return response.data;
  } catch (error) {
    console.error("카카오 로그인 서비스 실패:", error);
    // 에러 발생 시 저장된 토큰 삭제
    localStorage.removeItem("accessToken");
    delete client.defaults.headers.common.Authorization;
    throw error;
  }
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
