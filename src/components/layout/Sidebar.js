/**
 * @file Sidebar.js
 * @description 애플리케이션의 왼쪽 사이드바 컴포넌트입니다.
 *              로고, 새 대화 시작 버튼, 채팅 내역 목록, 그리고 가까운 약국 찾기 버튼을 포함합니다.
 *              채팅 내역은 현재 임시 데이터로 구성되어 있으며, 추후 실제 데이터와 연동될 예정입니다.
 */
import React from 'react';
import { FaPlus, FaCommentDots, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../assets/images/logo.svg';

const Sidebar = () => {
  const chatHistory = [
    { id: 1, title: '두통과 어지러움' },
    { id: 2, title: '소화 불량' },
    { id: 3, title: '피부 발진' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
                {/* <img src={logo} alt="약지기 로고" className="sidebar-logo" /> */}
      </div>
      <div className="sidebar-new-chat">
        <button>
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
      </div>
    </div>
  );
};

export default Sidebar;