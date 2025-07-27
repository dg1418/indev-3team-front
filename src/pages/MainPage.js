/* 사이드바와 채팅 인터페이스를 모두 포함하는 메인 페이지 */

import React from 'react';
import Sidebar from '../components/layout/Sidebar';

const MainPage = () => {
  return (
    <div className="main-page">
      <Sidebar />
      {/* 채팅 인터페이스가 들어올 자리 */}
    </div>
  );
};

export default MainPage;
