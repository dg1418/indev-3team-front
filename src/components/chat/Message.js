import React from 'react';

const Message = ({ text, sender }) => {
  return (
    <div>
      <p><strong>{sender}:</strong> {text}</p>
    </div>
  );
};

export default Message;
