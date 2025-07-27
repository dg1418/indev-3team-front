/**
 * @file ChatWindow.js
 * @description 채팅 메시지들이 표시되는 영역을 담당하는 컴포넌트입니다.
 *              부모 컴포넌트로부터 메시지 배열을 받아와 각 메시지를 `Message` 컴포넌트를 사용하여 렌더링합니다.
 */
import React from 'react';
import Message from './Message';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <Message key={msg.id} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
};

export default ChatWindow;
