/**
 * @file handlers.js
 * @description Mock Service Worker (MSW)의 API 요청 핸들러를 정의하는 파일입니다.
 *              실제 백엔드 API를 모방하여, 특정 API 경로로 오는 요청을 가로채고
 *              미리 정의된 모의 응답을 반환합니다. 주로 개발 및 테스트 환경에서 사용됩니다.
 */
import { http, HttpResponse } from 'msw';

// 증상별 약물 추천 데이터
const medicineDatabase = {
  '두통': {
    primary: '타이레놀',
    alternatives: ['게보린', '펜잘', '낙센'],
    message: '두통 증상에 대해 타이레놀을 추천합니다. 하루 최대 4회까지 복용 가능하며, 8시간 간격으로 복용하세요.'
  },
  '복통': {
    primary: '부스코판',
    alternatives: ['베아제', '훼스탈'],
    message: '복통 증상에 대해 부스코판을 추천합니다. 식후 30분에 복용하시고, 증상이 지속되면 병원 방문을 권합니다.'
  },
  '감기': {
    primary: '종합감기약',
    alternatives: ['판콜', '화이투벤', '낙센콜드'],
    message: '감기 증상에 대해 종합감기약을 추천합니다. 충분한 휴식과 수분 섭취도 함께 하세요.'
  },
  '열': {
    primary: '타이레놀',
    alternatives: ['부루펜', '낙센'],
    message: '발열 증상에 대해 타이레놀을 추천합니다. 38도 이상의 고열이 지속되면 병원 방문을 권합니다.'
  }
};

export const handlers = [
  // 사용자가 증상을 제출했을 때의 요청을 처리
  http.post('/api/symptoms', async ({ request }) => {
    try {
      const requestData = await request.json();
      const symptoms = requestData?.symptoms || '';
      
      console.log('MSW: Received symptoms request:', symptoms);
      
      if (!symptoms || symptoms.trim().length === 0) {
        return HttpResponse.json({
          message: '증상을 입력해주세요.',
          recommendation: null,
          alternatives: []
        });
      }

      // 입력된 증상에서 키워드 찾기
      const symptomLower = symptoms.toLowerCase().trim();
      let matchedMedicine = null;
      
      // 키워드 매칭 (더 정확한 매칭을 위해 여러 키워드 확인)
      for (const [key, medicine] of Object.entries(medicineDatabase)) {
        if (symptomLower.includes(key.toLowerCase()) || 
            symptoms.includes(key)) {
          matchedMedicine = medicine;
          break;
        }
      }
      
      if (matchedMedicine) {
        console.log('MSW: Found matching medicine for symptoms');
        return HttpResponse.json({
          message: matchedMedicine.message,
          recommendation: matchedMedicine.primary,
          alternatives: matchedMedicine.alternatives
        });
      }
      
      // 기본 응답 (매칭되는 증상이 없을 때)
      console.log('MSW: No matching medicine found, returning default response');
      return HttpResponse.json({
        message: '입력하신 증상으로는 정확한 약을 추천하기 어렵습니다. 약국에서 약사와 상담하시거나, 심한 경우 병원 진료를 받으시기 바랍니다.',
        recommendation: '전문가 상담',
        alternatives: ['약국 상담', '병원 진료']
      });
      
    } catch (error) {
      console.error('MSW: Error processing symptoms request:', error);
      return HttpResponse.json(
        { 
          message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          recommendation: null,
          alternatives: []
        },
        { status: 500 }
      );
    }
  }),

  // 추가적인 API 엔드포인트 (필요시 확장)
  http.get('/api/health', () => {
    return HttpResponse.json({ status: 'ok', message: 'API is working' });
  })
];