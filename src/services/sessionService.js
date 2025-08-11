import client from '../api/client';

/**
 * 내 세션 목록을 조회합니다.
 */
export const getMySessions = async () => {
  const response = await client.get('/users/me/sessions');
  return response.data;
};

/**
 * 새 세션을 생성합니다.
 * @param {object} [sessionData] 생성할 세션 데이터 (필요시)
 */
export const createSession = async (sessionData = {}) => {
  const response = await client.post('/users/me/sessions', sessionData);
  return response.data;
};
