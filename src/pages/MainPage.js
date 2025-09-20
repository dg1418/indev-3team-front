/**
 * @file MainPage.js
 * @description 애플리케이션의 메인 레이아웃을 담당하는 컴포넌트입니다.
 *              사이드바와 채팅 인터페이스(초기 프롬프트, 채팅창, 입력창)를 통합하여 렌더링합니다.
 *              사용자의 메시지 상태를 관리하고, 메시지 전송 핸들러를 하위 컴포넌트에 전달합니다.
 *              입력창의 포커스 관리를 개선하고 스크롤바가 정확히 하단까지 추적하도록 개선합니다.
 */
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/layout/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import SymptomInput from '../components/chat/SymptomInput';
import InitialPrompt from '../components/chat/InitialPrompt';
import { ReactComponent as ArrowCircleRight } from '../assets/arrow-circle-right.svg';
import './App.css';

import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true); // 자동 스크롤 활성화 상태
  const [scrollTooltipVisible, setScrollTooltipVisible] = useState(false); // 스크롤 툴팁 상태
  const chatAreaRef = useRef(null); // 스크롤 제어를 위한 ref 생성
  const symptomInputRef = useRef(null); // SymptomInput 컴포넌트에 대한 ref
  const scrollTimeoutRef = useRef(null); // 스크롤 타이머를 위한 ref
  const isUserScrollingRef = useRef(false); // 사용자가 수동으로 스크롤 중인지 추적
  

  // 사용자가 하단에 있는지 확인하는 함수
  const isUserAtBottom = () => {
    if (!chatAreaRef.current) return true;
    
    const scrollElement = chatAreaRef.current;
    const threshold = 50; // 하단으로부터 50px 이내면 하단으로 간주 (이전 100px에서 축소)
    const scrollHeight = scrollElement.scrollHeight;
    const scrollTop = scrollElement.scrollTop;
    const clientHeight = scrollElement.clientHeight;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    
    // 디버깅용 로그 (개발 중에만 사용)
    // console.log('Distance from bottom:', distanceFromBottom, 'Threshold:', threshold);
    
    const isAtBottom = distanceFromBottom <= threshold;
    
    // 추가 조건: 전체 높이가 뷰포트보다 작거나 같으면 항상 true
    if (scrollHeight <= clientHeight) {
      return true;
    }
    
    return isAtBottom;
  };

  // 스크롤을 하단으로 이동시키는 함수 (개선된 버전)
  const scrollToBottom = () => {
    if (!chatAreaRef.current || !isAutoScrollEnabled) return;

    const scrollElement = chatAreaRef.current;
    
    // 사용자가 수동으로 스크롤 중이면 자동 스크롤 중단
    if (isUserScrollingRef.current) return;
    
    // 즉시 스크롤 시도
    scrollElement.scrollTop = scrollElement.scrollHeight;
    
    // DOM 업데이트를 기다린 후 추가 스크롤 시도들
    const scrollAttempts = [10, 50, 100, 200, 300, 500];
    
    scrollAttempts.forEach(delay => {
      setTimeout(() => {
        if (scrollElement && isAutoScrollEnabled && !isUserScrollingRef.current) {
          const currentScrollTop = scrollElement.scrollTop;
          const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
          
          // 아직 끝까지 스크롤되지 않았다면 다시 시도
          if (currentScrollTop < maxScroll) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
          }
        }
      }, delay);
    });

    // RequestAnimationFrame을 사용한 추가 보정
    const smoothScrollToBottom = () => {
      if (scrollElement && isAutoScrollEnabled && !isUserScrollingRef.current) {
        const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
        const currentScroll = scrollElement.scrollTop;
        
        if (currentScroll < maxScroll) {
          scrollElement.scrollTop = scrollElement.scrollHeight;
          requestAnimationFrame(smoothScrollToBottom);
        }
      }
    };
    
    requestAnimationFrame(smoothScrollToBottom);
  };

  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동 (개선된 버전)
  useEffect(() => {
    // 메시지가 추가되면 자동 스크롤이 활성화된 상태에서만 스크롤
    if (isAutoScrollEnabled) {
      // 이전 타이머가 있다면 클리어
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // 메시지가 추가되면 스크롤을 하단으로
      scrollToBottom();

      // MutationObserver를 사용하여 DOM 변경 사항을 감지하고 스크롤 조정
      if (chatAreaRef.current) {
        const observer = new MutationObserver(() => {
          if (isAutoScrollEnabled && !isUserScrollingRef.current) {
            scrollToBottom();
          }
        });

        observer.observe(chatAreaRef.current, {
          childList: true,
          subtree: true,
          characterData: true
        });

        // 컴포넌트 언마운트 시 observer 정리
        scrollTimeoutRef.current = setTimeout(() => {
          observer.disconnect();
        }, 1000);

        return () => {
          observer.disconnect();
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
        };
      }
    }
  }, [messages, isAutoScrollEnabled]);

  // ResizeObserver를 사용하여 채팅 영역 크기 변경 시 스크롤 조정
  useEffect(() => {
    if (!chatAreaRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (isAutoScrollEnabled && !isUserScrollingRef.current) {
        scrollToBottom();
      }
    });

    resizeObserver.observe(chatAreaRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isAutoScrollEnabled]);

  // 사용자의 스크롤 동작을 감지하는 useEffect 추가
  useEffect(() => {
    if (!chatAreaRef.current) return;

    const scrollElement = chatAreaRef.current;
    let scrollTimer;
    let lastScrollTop = scrollElement.scrollTop;

    const handleScroll = () => {
      const currentScrollTop = scrollElement.scrollTop;
      const scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
      
      // 사용자가 스크롤 중임을 표시
      isUserScrollingRef.current = true;
      
      // 위로 스크롤하는 경우 즉시 자동 스크롤 비활성화
      if (scrollDirection === 'up' && currentScrollTop < lastScrollTop - 5) {
        setIsAutoScrollEnabled(false);
      }
      
      lastScrollTop = currentScrollTop;
      
      // 스크롤이 멈춘 후 일정 시간 후에 사용자 스크롤 상태 해제
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isUserScrollingRef.current = false;
        
        // 사용자가 하단 근처에 있고, 아래로 스크롤했거나 하단에 도달한 경우만 자동 스크롤 재활성화
        const atBottom = isUserAtBottom();
        const wasScrollingDown = scrollDirection === 'down';
        
        if (atBottom && (wasScrollingDown || currentScrollTop === scrollElement.scrollHeight - scrollElement.clientHeight)) {
          setIsAutoScrollEnabled(true);
        } else if (!atBottom) {
          setIsAutoScrollEnabled(false);
        }
      }, 200); // 200ms로 증가하여 더 안정적으로 처리
    };

    scrollElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);
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
    
    // 사이드바 토글 후 입력창에 포커스 복원 및 스크롤 조정
    setTimeout(() => {
      if (symptomInputRef.current && symptomInputRef.current.focus) {
        symptomInputRef.current.focus();
      }
      scrollToBottom();
    }, 100);
  };

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { ...message, id: Date.now() }]);
    
    // 새 메시지 전송 시에만 자동 스크롤 활성화 (사용자 메시지의 경우)
    if (message.sender === 'user') {
      setIsAutoScrollEnabled(true);
      isUserScrollingRef.current = false;
    }
    // 봇 메시지의 경우 현재 상태 유지 (사용자가 위에 있으면 방해하지 않음)
    else if (message.sender === 'bot' && isUserAtBottom()) {
      setIsAutoScrollEnabled(true);
      isUserScrollingRef.current = false;
    }
    
    // 메시지 추가 후 즉시 스크롤 (useEffect와 별개로 추가 보장)
    setTimeout(() => scrollToBottom(), 0);
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
      // Ctrl+End 또는 Cmd+End로 채팅 하단으로 스크롤
      else if ((e.ctrlKey || e.metaKey) && e.key === 'End') {
        e.preventDefault();
        setIsAutoScrollEnabled(true);
        isUserScrollingRef.current = false;
        scrollToBottom();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isSidebarOpen]);

  // 윈도우 리사이즈 시 스크롤 조정
  useEffect(() => {
    const handleResize = () => {
      if (isAutoScrollEnabled && !isUserScrollingRef.current) {
        setTimeout(() => scrollToBottom(), 100);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isAutoScrollEnabled]);

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
        {/* 사용자 정보 및 로그인 버튼이 위치할 헤더 영역 */}
        <div className="main-header">
          <button 
            onClick={() => navigate('/login')}
            style={{
              padding: '8px 16px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            로그인
          </button>
        </div>

        <div className="chat-container">
          <div
            className={`chat-area ${messages.length > 0 ? 'has-messages' : ''}`}
            ref={chatAreaRef}
            onClick={handleChatAreaClick}
            style={{
              scrollBehavior: 'smooth' // CSS로도 설정 가능하지만 JS에서도 명시
            }}
          >
            {messages.length === 0 ? <InitialPrompt /> : <ChatWindow messages={messages} />}

            {/* 자동 스크롤 비활성화 시 하단으로 가는 버튼 표시 */}
            {!isAutoScrollEnabled && messages.length > 0 && (
               <div className="scroll-button-container">
              <button
                className="scroll-to-bottom-btn"
                onClick={() => {
                  setIsAutoScrollEnabled(true);
                  isUserScrollingRef.current = false;
                  setTimeout(() => scrollToBottom(), 0);
                }}
              >
               <span>↓</span>
                최근으로 이동하기
              </button>
                 <div className="scroll-button-tooltip">
                    최신 메시지로 이동
              </div>
            </div>
          )}

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