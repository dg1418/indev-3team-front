import client from "../api/client";

/**
 * 내 정보를 조회합니다.
 */
export const getMyInfo = async () => {
  const response = await client.get("/users/me");
  return response.data;
};

/**
 * 내 정보를 수정합니다.
 * @param {object} userInfo 업데이트할 사용자 정보
 * @param {string} [userInfo.name] 새 사용자 이름
 * @param {string} [userInfo.imagePath] 새 이미지 경로
 */
export const updateMyInfo = async (userInfo) => {
  const response = await client.patch("/users/me", userInfo);
  return response.data;
};
