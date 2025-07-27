/* 사이드바와 채팅 인터페이스를 모두 포함하는 메인 페이지 */

import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import SymptomInput from '../components/chat/SymptomInput';
import InitialPrompt from '../components/chat/InitialPrompt';

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
        {messages.length === 0 ? (
          <InitialPrompt />
        ) : (
          <ChatWindow messages={messages} />
        )}
        <SymptomInput onSendMessage={handleSendMessage} />
        <p className="disclaimer-text"> ※ 약지기의 ChatBot은 잘못된 정보를 제공할 가능성이 있습니다. 제공된 정보를 맹신하지 마십시오.</p>
      </div>
    </div>
  );
};

export default MainPage;
