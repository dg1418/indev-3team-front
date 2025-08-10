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
import { ReactComponent as ArrowCircleRight } from '../assets/arrow-circle-right.svg';
import './App.css';

const MainPage = () => {
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태를 '열림' 기준으로 관리 (초기값: 닫힘)

  // 사이드바 상태를 토글하는 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { ...message, id: Date.now() }]);
  };

  return (
    <div className="main-layout-container">
      {/* Sidebar에 상태와 닫기 함수를 props로 전달 */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* 사이드바가 닫혀 있을 때만 '열기' 버튼을 표시 */}
      {!isSidebarOpen && (
        <button className="sidebar-open-btn" onClick={toggleSidebar}>
          <ArrowCircleRight />
        </button>
      )}

      <div className="chat-wrapper">
        <div className="chat-container" style={{ flexGrow: 1 }}>
          {messages.length === 0 ? <InitialPrompt /> : <ChatWindow messages={messages} />}
          <SymptomInput onSendMessage={handleSendMessage} />
          <p className="disclaimer-text">※ 약지기의 ChatBot은 잘못된 정보를 제공할 가능성이 있습니다. 제공된 정보를 맹신하지 마십시오.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;