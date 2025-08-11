/**
 * @file MainPage.js
 * @description 애플리케이션의 메인 레이아웃을 담당하는 컴포넌트입니다.
 *              사이드바와 채팅 인터페이스(초기 프롬프트, 채팅창, 입력창)를 통합하여 렌더링합니다.
 *              사용자의 메시지 상태를 관리하고, 메시지 전송 핸들러를 하위 컴포넌트에 전달합니다.
 */
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/layout/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import SymptomInput from '../components/chat/SymptomInput';
import InitialPrompt from '../components/chat/InitialPrompt';
import { ReactComponent as ArrowCircleRight } from '../assets/arrow-circle-right.svg';
import './App.css';

const MainPage = () => {
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chatAreaRef = useRef(null); // 스크롤 제어를 위한 ref 생성

  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // 사이드바 상태를 토글하는 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { ...message, id: Date.now() }]);
  };

  // "새 대화 시작"을 처리하는 함수
  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="main-layout-container">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onNewChat={handleNewChat} />

      {/* 사이드바가 닫혔을 때, 열기 버튼을 표시하는 영역 */}
      <div className="sidebar-column">
        {!isSidebarOpen && (
          <button className="sidebar-open-btn" onClick={toggleSidebar}>
            <ArrowCircleRight />
          </button>
        )}
      </div>

      <div className="chat-wrapper">
        <div className="chat-container">
          <div className={`chat-area ${messages.length > 0 ? 'has-messages' : ''}`} ref={chatAreaRef}>
            {messages.length === 0 ? <InitialPrompt /> : <ChatWindow messages={messages} />}
          </div>
          <SymptomInput onSendMessage={handleSendMessage} />
          <p className="disclaimer-text">※ 약지기의 ChatBot은 잘못된 정보를 제공할 가능성이 있습니다. 제공된 정보를 맹신하지 마십시오.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;