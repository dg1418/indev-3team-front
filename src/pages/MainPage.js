/**
 * @file MainPage.js
 * @description 애플리케이션의 메인 레이아웃을 담당하는 컴포넌트입니다.
 *              사이드바와 채팅 인터페이스(초기 프롬프트, 채팅창, 입력창)를 통합하여 렌더링합니다.
 *              사용자의 메시지 상태를 관리하고, 메시지 전송 핸들러를 하위 컴포넌트에 전달합니다.
 *              입력창의 포커스 관리를 개선하여 연속적인 채팅 경험을 제공합니다.
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
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const chatAreaRef = useRef(null); // 스크롤 제어를 위한 ref 생성
  const symptomInputRef = useRef(null); // SymptomInput 컴포넌트에 대한 ref

  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // 페이지 로드 시 입력창에 포커스 설정
  useEffect(() => {
    // 페이지 로드 후 약간의 지연을 두고 포커스 설정
    const timer = setTimeout(() => {
      if (symptomInputRef.current && symptomInputRef.current.focus) {
        symptomInputRef.current.focus();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // 사이드바 상태를 토글하는 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setTooltipVisible(false); // 툴팁 상태를 항상 초기화
    
    // 사이드바 토글 후 입력창에 포커스 복원
    setTimeout(() => {
      if (symptomInputRef.current && symptomInputRef.current.focus) {
        symptomInputRef.current.focus();
      }
    }, 100);
  };

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { ...message, id: Date.now() }]);
  };

  // "새 대화 시작"을 처리하는 함수
  const handleNewChat = () => {
    setMessages([]);
    // 새 대화 시작 후 입력창에 포커스
    setTimeout(() => {
      if (symptomInputRef.current && symptomInputRef.current.focus) {
        symptomInputRef.current.focus();
      }
    }, 100);
  };

  // 채팅 영역 클릭 시 입력창으로 포커스 이동
  const handleChatAreaClick = (e) => {
    // 클릭된 요소가 링크나 버튼이 아닌 경우에만 포커스 이동
    if (!e.target.closest('a, button, input, textarea, select')) {
      if (symptomInputRef.current && symptomInputRef.current.focus) {
        symptomInputRef.current.focus();
      }
    }
  };

  // 전역 키보드 이벤트 처리
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Ctrl+L 또는 Cmd+L로 입력창 포커스
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        if (symptomInputRef.current && symptomInputRef.current.focus) {
          symptomInputRef.current.focus();
        }
      }
      // ESC 키로 입력창 포커스 (사이드바가 열려있지 않을 때)
      else if (e.key === 'Escape' && !isSidebarOpen) {
        if (symptomInputRef.current && symptomInputRef.current.focus) {
          symptomInputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isSidebarOpen]);

  return (
    <div className="main-layout-container">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onNewChat={handleNewChat} />

      {/* 사이드바가 닫혔을 때, 열기 버튼을 표시하는 영역 */}
      <div className="sidebar-column">
        {!isSidebarOpen && (
          <div 
            className="tooltip-container" 
            onMouseEnter={() => setTooltipVisible(true)} 
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <button className="sidebar-open-btn" onClick={toggleSidebar}>
              <ArrowCircleRight />
            </button>
            {isTooltipVisible && <div className="tooltip">사이드바 열기</div>}
          </div>
        )}
      </div>

      <div className="chat-wrapper">
        <div className="chat-container">
          <div 
            className={`chat-area ${messages.length > 0 ? 'has-messages' : ''}`} 
            ref={chatAreaRef}
            onClick={handleChatAreaClick}
          >
            {messages.length === 0 ? <InitialPrompt /> : <ChatWindow messages={messages} />}
          </div>
          <SymptomInput 
            ref={symptomInputRef} 
            onSendMessage={handleSendMessage} 
          />
          <p className="disclaimer-text">※ 약지기의 ChatBot은 잘못된 정보를 제공할 가능성이 있습니다. 제공된 정보를 맹신하지 마십시오.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;