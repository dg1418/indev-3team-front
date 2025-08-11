/**
 * @file SymptomInput.js
 * @description 사용자가 증상을 입력하고 전송하는 입력 필드와 버튼을 포함하는 컴포넌트입니다.
 *              입력된 텍스트를 관리하고, 전송 시 MSW로 모의 API 요청을 보낸 후 응답을 처리합니다.
 */
import React, { useState } from 'react';

const SymptomInput = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    
    // 사용자 메시지를 먼저 전달
    onSendMessage({ text: inputText, sender: 'user' });

    try {
      const response = await fetch('/api/symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: inputText }),
      });

      // 응답 상태 확인
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Content-Type 확인
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Response is not JSON:', await response.text());
        throw new Error('서버에서 올바르지 않은 응답을 받았습니다.');
      }

      const data = await response.json();

      // 응답 데이터 검증
      if (!data || !data.message) {
        throw new Error('응답 데이터가 올바르지 않습니다.');
      }

      // 봇의 응답을 전달 (추가 정보도 함께 표시)
      let botMessage = data.message;
      
      if (data.recommendation && data.alternatives && data.alternatives.length > 0) {
        botMessage += `\n\n💊 추천 약물: ${data.recommendation}`;
        botMessage += `\n🔄 대안 약물: ${data.alternatives.join(', ')}`;
      }
      
      onSendMessage({ text: botMessage, sender: 'bot' });

    } catch (error) {
      console.error('Error fetching recommendation:', error);
      
      // 더 구체적인 에러 메시지 제공
      let errorMessage = '오류가 발생했습니다. 다시 시도해주세요.';
      
      if (error.message.includes('404')) {
        errorMessage = '서비스가 일시적으로 이용할 수 없습니다. 잠시 후 다시 시도해주세요.';
      } else if (error.message.includes('network') || error.name === 'NetworkError') {
        errorMessage = '네트워크 연결을 확인한 후 다시 시도해주세요.';
      }
      
      onSendMessage({ text: errorMessage, sender: 'bot' });
    } finally {
      setIsLoading(false);
    }

    setInputText('');
  };

  return (
    <form onSubmit={handleSubmit} className="symptom-input">
      <input
        type="text"
        placeholder="두통, 복통 등의 증상을 입력하세요..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !inputText.trim()}>
        {isLoading ? '전송 중...' : '전송'}
      </button>
    </form>
  );
};

export default SymptomInput;