/**
 * @file SymptomInput.js
 * @description 사용자가 증상을 입력하고 전송하는 입력 필드와 버튼을 포함하는 컴포넌트입니다.
 *              입력된 텍스트를 관리하고, 전송 시 부모 컴포넌트의 `onSendMessage` 함수를 호출합니다.
 */
import React, { useState } from 'react';

const SymptomInput = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <form onSubmit={handleSubmit} className="symptom-input">
      <input
        type="text"
        placeholder="증상을 입력하세요..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button type="submit">전송</button>
    </form>
  );
};

export default SymptomInput;
