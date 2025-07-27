/**
 * @file InitialPrompt.js
 * @description 채팅이 시작되기 전 사용자에게 보여지는 초기 프롬프트 화면 컴포넌트입니다.
 *              증상 입력 유도 메시지와 함께 예시 증상 버튼들을 제공하여 사용자의 입력을 돕습니다.
 */
import React from 'react';

const InitialPrompt = () => {
  const symptomExamples = [
    '두통', '복통', '치통', '구토', '콧물', '코막힘',
    '기침', '발열', '피로감', '근육통', '관절통', '메스꺼움', '설사', '어지러움'
  ];

  return (
    <div className="initial-prompt">
      <h2>무슨 증상이 있으신가요?</h2>
      <p>느껴지는 증상을 입력하세요.</p>
      <div className="symptom-examples">
        {symptomExamples.map((symptom, index) => (
          <button key={index} className="symptom-button">
            {symptom}
          </button>
        ))}
      </div>
      <div className="initial-prompt-footer">
        <p>자세한 증상을 적어주시면 더 정확한 정보를 드릴 수 있습니다.</p>
        <p>예시: "머리가 아파요", "배가 아파요"</p>
        
      </div>
    </div>
  );
};

export default InitialPrompt;
