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
