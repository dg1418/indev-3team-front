/**
 * @file handlers.js
 * @description Mock Service Worker (MSW)의 API 요청 핸들러를 정의하는 파일입니다.
 *              실제 백엔드 API를 모방하여, 특정 API 경로로 오는 요청을 가로채고
 *              미리 정의된 모의 응답을 반환합니다. 주로 개발 및 테스트 환경에서 사용됩니다.
 */
import { http, HttpResponse } from 'msw';

// 증상별 약물 추천 데이터 (다양한 표현과 키워드 포함)
const medicineDatabase = {
  headache: {
    keywords: ['두통', '머리', '머리가', '머리아', '뒷목', '관자놀이', '편두통', '머리 아파', '머리가 아파', '머리 아픈', '머리가 아픈'],
    primary: '타이레놀',
    alternatives: ['게보린', '펜잘', '낙센'],
    message: '두통 증상을 말씀해주셨네요. 타이레놀을 추천드립니다. 하루 최대 4회까지 복용 가능하며, 8시간 간격으로 복용하세요. 충분한 휴식도 도움이 됩니다.'
  },
  stomachache: {
    keywords: ['복통', '배', '배가', '배아', '속', '속이', '위', '배 아파', '배가 아파', '배 아픈', '배가 아픈', '속 아파', '속이 아파', '소화불량', '위통'],
    primary: '부스코판',
    alternatives: ['베아제', '훼스탈', '겔포스'],
    message: '복통 증상이 있으시군요. 부스코판을 추천드립니다. 식후 30분에 복용하시고, 증상이 지속되면 병원 방문을 권합니다. 따뜻한 물을 마시는 것도 도움이 됩니다.'
  },
  cold: {
    keywords: ['감기', '콧물', '기침', '목', '목이', '인후', '코막힘', '재채기', '목 아파', '목이 아파', '목 아픈', '목이 아픈', '감기몸살', '몸살'],
    primary: '종합감기약',
    alternatives: ['판콜', '화이투벤', '낙센콜드'],
    message: '감기 증상이 있으시는 것 같네요. 종합감기약을 추천드립니다. 충분한 휴식과 수분 섭취, 그리고 따뜻하게 지내시는 것이 중요합니다.'
  },
  fever: {
    keywords: ['열', '발열', '고열', '미열', '열이', '열이 나', '열날', '몸이 뜨거', '오한', '떨려'],
    primary: '타이레놀',
    alternatives: ['부루펜', '낙센'],
    message: '발열 증상이 있으시군요. 타이레놀을 추천드립니다. 38도 이상의 고열이 지속되면 병원 방문을 권합니다. 수분 섭취를 충분히 해주세요.'
  },
  diarrhea: {
    keywords: ['설사', '배탈', '장염', '변', '화장실', '묽은변', '물설사', '토사곽란'],
    primary: '정장제',
    alternatives: ['스멕타', '비오플', '락토민'],
    message: '설사 증상이 있으시는군요. 정장제를 추천드립니다. 수분과 전해질 보충이 중요하며, 증상이 심하거나 지속되면 병원을 방문하세요.'
  },
  nausea: {
    keywords: ['메스꺼', '구토', '토할', '속미식', '울렁', '멀미', '어지러', '현기증'],
    primary: '낙센',
    alternatives: ['훼스탈', '베아제'],
    message: '메스꺼움이나 구토 증상이 있으시군요. 낙센을 추천드립니다. 가볍게 식사하시고 충분한 휴식을 취하세요. 증상이 지속되면 의료진과 상담하세요.'
  }
};

export const handlers = [
  // 가짜 카카오 로그인 핸들러 추가
  http.post('http://54.180.95.200:3000/api/auth/login/kakao', async () => {
    // 가짜 accessToken 생성
    const accessToken = 'mock-access-token-12345';

    // 가짜 refreshToken을 담을 쿠키 설정
    const refreshToken = 'mock-refresh-token-67890';
    
    // 성공 응답을 반환합니다.
    return HttpResponse.json(
      {
        user: { id: 1, name: '테스트 유저' },
        accessToken: accessToken,
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800`,
        },
      }
    );
  }),

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

      // 입력된 증상에서 키워드 찾기 (자연어 처리 개선)
      const symptomLower = symptoms.toLowerCase().trim();
      let matchedMedicine = null;
      let matchedSymptomType = '';
      
      // 모든 증상 카테고리를 순회하면서 키워드 매칭
      for (const [symptomType, medicineData] of Object.entries(medicineDatabase)) {
        // 각 증상의 키워드 배열을 확인
        const isMatched = medicineData.keywords.some(keyword => {
          const keywordLower = keyword.toLowerCase();
          // 정확한 단어 매칭 또는 부분 매칭
          return symptomLower.includes(keywordLower) || 
                 symptoms.includes(keyword);
        });
        
        if (isMatched) {
          matchedMedicine = medicineData;
          matchedSymptomType = symptomType;
          console.log(`MSW: Found matching medicine for ${symptomType} symptoms`);
          break;
        }
      }
      
      if (matchedMedicine) {
        return HttpResponse.json({
          message: matchedMedicine.message,
          recommendation: matchedMedicine.primary,
          alternatives: matchedMedicine.alternatives,
          symptomType: matchedSymptomType
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