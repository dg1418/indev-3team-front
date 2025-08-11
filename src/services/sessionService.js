import client from '../api/client';

/**
 * 내 세션 목록을 조회합니다.
 */
export const getMySessions = async () => {
  const response = await client.get('/users/me/sessions');
  return response.data;
};
