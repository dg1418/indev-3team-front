/**
 * @file InitialPrompt.js
 * @description 채팅이 시작되기 전 초기 화면을 담당하는 컴포넌트입니다.
 *              메인 제목, 설명 텍스트, 증상 버튼들, 그리고 예시 텍스트를 렌더링합니다.
 */
import React, { useState } from 'react';

const InitialPrompt = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  
  const symptomButtons = [
    '두통', '복통', '치통', '구토', '콧물', '코막힘', '기침', '발열', '피로감', '근육통',
    '관절통', '메스꺼움', '설사', '어지러움'
  ];

  // 증상 버튼 클릭 핸들러
  const handleSymptomClick = (symptom) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptom)) {
        // 이미 선택된 증상이면 제거
        return prev.filter(s => s !== symptom);
      } else {
        // 선택되지 않은 증상이면 추가
        return [...prev, symptom];
      }
    });
  };

  return (
    <div className="initial-prompt">
      <h1>무슨 증상이 있으신가요?</h1>
      <p>느껴지는 증상을 입력하세요.</p>
      
      <div className="symptom-buttons">
        {symptomButtons.map((symptom, index) => (
          <button 
            key={index} 
            className={`symptom-button ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
            onClick={() => handleSymptomClick(symptom)}
          >
            {symptom}
          </button>
        ))}
      </div>
      
      <div className="example-text">
        자세한 증상을 적어주시면 더 정확한 정보를 드릴 수 있습니다.
        <br />
        예시: "머리가 아파요", "배가 아파요"
      </div>
    </div>
  );
};

export default InitialPrompt;