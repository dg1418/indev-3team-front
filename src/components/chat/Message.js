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
