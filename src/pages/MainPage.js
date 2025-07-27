/* 사이드바와 채팅 인터페이스를 모두 포함하는 메인 페이지 */

import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import SymptomInput from '../components/chat/SymptomInput';

const MainPage = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    if (text.trim()) {
      setMessages((prevMessages) => [...prevMessages, { id: Date.now(), text, sender: 'user' }]);
      // TODO: 여기에 AI 응답 로직 추가
    }
  };

  return (
    <div className="main-page">
      <Sidebar />
      <div className="chat-container">
        <ChatWindow messages={messages} />
        <SymptomInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default MainPage;
