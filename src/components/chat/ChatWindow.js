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
