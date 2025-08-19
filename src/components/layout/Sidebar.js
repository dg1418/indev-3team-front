/**
 * @file Sidebar.js
 * @description 애플리케이션의 왼쪽 사이드바 컴포넌트입니다.
 *              로고, 새 대화 시작 버튼, 채팅 내역 목록, 그리고 가까운 약국 찾기 버튼을 포함합니다.
 */
import React, { useState } from 'react';
import { FaPlus, FaCommentDots, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../assets/images/logo.svg';
import { ReactComponent as ArrowCircleLeft } from '../../assets/arrow-circle-left.svg';
import './Sidebar.css';

// isOpen: 사이드바 열림 상태, onClose: 사이드바 닫기 함수
const Sidebar = ({ isOpen, onClose, onNewChat }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const chatHistory = [
    { id: 1, title: '두통과 어지러움' },
    { id: 2, title: '소화 불량' },
    { id: 3, title: '피부 발진' },
    { id: 4, title: '감기 증상 상담' },
    { id: 5, title: '복통 및 설사' },
    { id: 6, title: '불면증 치료' },
    { id: 7, title: '알레르기 반응' },
    { id: 8, title: '근육통 완화' },
    { id: 9, title: '위염 증상' },
    { id: 10, title: '기침과 가래' },
    { id: 11, title: '관절염 통증' },
    { id: 12, title: '스트레스성 두드러기' }
  ];

  return (
    // isOpen 상태에 따라 클래스와 오버레이를 동적으로 제어
    <>
      {/* 사이드바가 열려있을 때만 오버레이를 표시하고, 클릭 시 닫기 함수 호출 */}
      {isOpen && <div className="overlay" onClick={onClose}></div>}

      <div className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="약지기 로고" className="sidebar-logo" />
          {/* 닫기 버튼: 클릭 시 onClose 함수 호출 */}
          <div 
            className="tooltip-container" 
            onMouseEnter={() => setTooltipVisible(true)} 
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <button onClick={onClose} className="sidebar-close-btn">
              <ArrowCircleLeft />
            </button>
            {isTooltipVisible && <div className="tooltip">사이드바 접기</div>}
          </div>
        </div>

        {/* 아래 내용은 이전과 동일 */}
        <div className="sidebar-new-chat">
          <button onClick={onNewChat}>
            <FaPlus /> 새 대화 시작
          </button>
        </div>
        <div className="sidebar-history">
          {chatHistory.map((chat) => (
            <div key={chat.id} className="sidebar-chat-item">
              <FaCommentDots />
              <span>{chat.title}</span>
            </div>
          ))}
        </div>
        <div className="sidebar-bottom">
          <button>
            <FaMapMarkerAlt /> 가까운 약국 찾기
          </button>
          {/* 약국 목록을 별도의 div로 감싸고 클래스 추가 */}
          <div className="pharmacy-list">
            <p>메디컬약국 550m</p>
            <p>온누리약국 700m</p>
            <p>희망약국 850m</p>
            <p>미래약국 1.2km</p>
            <p>대학약국 1.5km</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;