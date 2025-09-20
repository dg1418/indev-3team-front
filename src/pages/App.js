/**
 * @file App.js
 * @description React 애플리케이션의 최상위 컴포넌트입니다.
 *              라우팅을 설정하여 URL 경로에 따라 적절한 페이지를 렌더링합니다.
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './loginPage'; // loginPage.js를 import합니다.

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;