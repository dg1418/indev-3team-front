/**
 * @file MainPage.js
 * @description 애플리케이션의 메인 레이아웃을 담당하는 컴포넌트입니다.
 *              사이드바와 채팅 인터페이스(초기 프롬프트, 채팅창, 입력창)를 통합하여 렌더링합니다.
 *              사용자의 메시지 상태를 관리하고, 메시지 전송 핸들러를 하위 컴포넌트에 전달합니다.
 */

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
