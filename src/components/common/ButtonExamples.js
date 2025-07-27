// src/components/examples/ButtonExamples.js
// 약지기 서비스에서 Button 컴포넌트 사용 예시

import React, { useState } from 'react';
import Button from './Button';

const ButtonExamples = () => {
  const [loading, setLoading] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // 로딩 상태 시뮬레이션
  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  // 증상 태그 선택 핸들러
  const handleSymptomSelect = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>약지기 Button 컴포넌트 사용 예시</h2>
      
      {/* 1. 기본 버튼들 */}
      <section style={{ marginBottom: '30px' }}>
        <h3>1. 기본 버튼 변형</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="primary">증상 검색</Button>
          <Button variant="secondary">취소</Button>
          <Button variant="outline">더보기</Button>
          <Button variant="ghost">건너뛰기</Button>
          <Button variant="danger">삭제</Button>
          <Button variant="success">완료</Button>
        </div>
      </section>

      {/* 2. 크기별 버튼 */}
      <section style={{ marginBottom: '30px' }}>
        <h3>2. 크기별 버튼</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size="small">작은 버튼</Button>
          <Button size="medium">중간 버튼</Button>
          <Button size="large">큰 버튼</Button>
        </div>
      </section>

      {/* 3. 아이콘 버튼 */}
      <section style={{ marginBottom: '30px' }}>
        <h3>3. 아이콘 버튼</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button 
            icon="🔍" 
            iconPosition="left"
          >
            증상 검색
          </Button>
          <Button 
            variant="secondary"
            icon="📍" 
            iconPosition="left"
          >
            근처 약국
          </Button>
          <Button 
            variant="outline"
            icon="➤" 
            iconPosition="right"
          >
            다음 단계
          </Button>
        </div>
      </section>

      {/* 4. 로딩 상태 버튼 */}
      <section style={{ marginBottom: '30px' }}>
        <h3>4. 로딩 상태 버튼</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button 
            loading={loading}
            onClick={handleSearch}
          >
            {loading ? '검색 중...' : '증상 분석하기'}
          </Button>
          <Button variant="secondary" disabled>
            비활성화 버튼
          </Button>
        </div>
      </section>

      {/* 5. 증상 선택 태그 버튼들 */}
      <section style={{ marginBottom: '30px' }}>
        <h3>5. 증상 선택 태그 (약지기 전용)</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['두통', '복통', '감기', '발열', '기침', '근육통', '소화불량'].map((symptom) => (
            <Button
              key={symptom}
              variant="symptom-tag"
              className={selectedSymptoms.includes(symptom) ? 'btn--selected' : ''}
              onClick={() => handleSymptomSelect(symptom)}
            >
              {symptom}
            </Button>
          ))}
        </div>
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          선택된 증상: {selectedSymptoms.join(', ') || '없음'}
        </p>
      </section>

      {/* 6. 전체 너비 버튼 */}
      <section style={{ marginBottom: '30px' }}>
        <h3>6. 전체 너비 버튼</h3>
        <Button fullWidth size="large">
          AI 약사에게 상담받기
        </Button>
      </section>

      {/* 7. 실제 사용 시나리오 */}
      <section style={{ marginBottom: '30px' }}>
        <h3>7. 실제 약지기 서비스 시나리오</h3>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '8px',
          backgroundColor: '#f8fafc'
        }}>
          <p style={{ marginBottom: '15px' }}>증상을 선택해주세요:</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {['발열', '기침', '콧물', '목아픔'].map((symptom) => (
              <Button
                key={symptom}
                variant="symptom-tag"
                size="small"
              >
                {symptom}
              </Button>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
            <Button variant="ghost">
              이전
            </Button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="secondary">
                건너뛰기
              </Button>
              <Button variant="primary" icon="🔍">
                약 추천받기
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ButtonExamples;