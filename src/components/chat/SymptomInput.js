/**
 * @file SymptomInput.js
 * @description 사용자가 증상을 입력하고 전송하는 입력 필드와 버튼을 포함하는 컴포넌트입니다.
 *              입력된 텍스트를 관리하고, 전송 시 MSW로 모의 API 요청을 보낸 후 응답을 처리합니다.
 */
import React, { useState } from 'react';

const SymptomInput = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

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

      const data = await response.json();

      // 봇의 응답을 전달
      onSendMessage({ text: data.message, sender: 'bot' });

    } catch (error) {
      console.error('Error fetching recommendation:', error);
      onSendMessage({ text: '오류가 발생했습니다. 다시 시도해주세요.', sender: 'bot' });
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
      />
      <button type="submit">전송</button>
    </form>
  );
};

export default SymptomInput;
