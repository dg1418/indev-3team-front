import client from '../api/client';

/**
 * 키워드 목록을 조회합니다.
 */
export const getKeywords = async () => {
  const response = await client.get('/keywords');
  return response.data;
};
