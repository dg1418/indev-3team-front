import client from "../api/client";

/**
 * 특정 세션의 메시지 목록을 조회합니다.
 * @param {object} params - 쿼리 파라미터
 * @param {string} params.sessionId - 세션 ID
 * @param {string} [params.cursor] - 페이지네이션 커서
 */
export const getMessages = async ({ sessionId, cursor }) => {
  const response = await client.get("/users/me/messages", {
    params: {
      sessionId: sessionId,
      cursor: cursor,
    },
  });
  return response.data;
};

/**
 * 메시지를 전송합니다.
 * @param {object} messageData - 전송할 메시지 데이터
 */
export const postMessage = async (messageData) => {
  const response = await client.post("/users/me/messages", messageData);
  return response.data;
};
