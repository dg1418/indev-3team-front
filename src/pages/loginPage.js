/**
 * @file loginPage.js
 * @description 사용자 로그인 기능을 제공하는 페이지 컴포넌트입니다.
 *              카카오 로그인을 통해 사용자 인증을 수행합니다.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLogin } from '../services/authService';
import './loginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      
      // services/authService.js 에서 만든 로그인 함수 호출 (인증 코드는 임시값)
      await kakaoLogin('fake-kakao-auth-code');
      
      alert('로그인 성공!');
      navigate('/'); // 메인 페이지로 이동
    } catch (error) {
      alert('로그인에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">로그인</h1>
      <p className="login-subtitle">더 간편한 서비스를 이용하실 수 있습니다.</p>
      <button className="login-kakao-button" onClick={handleLogin}>
        <svg className="login-kakao-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 4.64c-6.96 0-12.64 4.48-12.64 10.08 0 3.52 2.32 6.64 5.76 8.48l-1.84 6.56 6.72-4.48c.64.08 1.28.16 2 .16 6.96 0 12.64-4.48 12.64-10.08s-5.68-10.72-12.64-10.72z"/></svg>
        카카오 로그인
      </button>
    </div>
  );
};

export default LoginPage;