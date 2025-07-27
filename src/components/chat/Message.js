/**
 * @file Message.js
 * @description 채팅창 내에서 개별 메시지를 표시하는 컴포넌트입니다.
 *              메시지의 내용과 발신자(사용자 또는 AI)에 따라 다른 스타일을 적용하여 시각적으로 구분합니다.
 */
import React from 'react';

const Message = ({ text, sender }) => {
  const messageClass = sender === 'user' ? 'user' : 'ai';
  return (
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
