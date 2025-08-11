/**
 * @file handlers.js
 * @description Mock Service Worker (MSW)의 API 요청 핸들러를 정의하는 파일입니다.
 *              실제 백엔드 API를 모방하여, 특정 API 경로로 오는 요청을 가로채고
 *              미리 정의된 모의 응답을 반환합니다. 주로 개발 및 테스트 환경에서 사용됩니다.
 */
import { http, HttpResponse } from 'msw';

export const handlers = [
  // 사용자가 증상을 제출했을 때의 요청을 처리
  http.post('/api/symptoms', async ({ request }) => {
    const { symptoms } = await request.json();

    console.log('MSW: Received symptoms:', symptoms);

    // 간단한 분기 로직 예시
    if (symptoms.includes('두통')) {
      return HttpResponse.json({
        recommendation: '타이레놀',
        alternatives: ['게보린', '펜잘'],
        message: `'''${symptoms}''' 증상에 대해 타이레놀을 추천합니다.`,
      });
    }

    // 기본 응답
    return HttpResponse.json({
      recommendation: '진료 필요',
      alternatives: [],
      message: '입력하신 증상으로는 약을 추천하기 어렵습니다. 의사 또는 약사와 상담하세요.',
    });
  }),
];
