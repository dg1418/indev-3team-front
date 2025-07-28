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
import { ReactComponent as ArrowCircleLeft } from '../assets/arrow-circle-left.svg';
import { ReactComponent as ArrowCircleRight } from '../assets/arrow-circle-right.svg';
import '../pages/App.css';

const MainPage = () => {
  const [messages, setMessages] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    console.log('toggleSidebar called');
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSendMessage = (text) => {
    if (text.trim()) {
      setMessages((prevMessages) => [...prevMessages, { id: Date.now(), text, sender: 'user' }]);
      // TODO: 여기에 AI 응답 로직 추가
    }
  };

  return (
   <div className="main-layout-container">
  <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
  <div className="chat-wrapper">
    <button className={`sidebar-toggle-btn-main-page ${isSidebarCollapsed ? 'collapsed-position' : ''}`} onClick={toggleSidebar}>
      {isSidebarCollapsed ? <ArrowCircleRight /> : <ArrowCircleLeft />}
    </button>
    <div className={`chat-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`} style={{flexGrow: 1}}>
      {messages.length === 0 ? <InitialPrompt /> : <ChatWindow messages={messages} />}
      <SymptomInput onSendMessage={handleSendMessage} />
      <p className="disclaimer-text">※ 약지기의 ChatBot은 잘못된 정보를 제공할 가능성이 있습니다. 제공된 정보를 맹신하지 마십시오.</p>
    </div>
  </div>
</div>
  );
};

export default MainPage;
