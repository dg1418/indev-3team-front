/**
 * @file loginPage.js
 * @description 사용자 로그인 기능을 제공하는 페이지 컴포넌트입니다.
 *              카카오 로그인을 통해 사용자 인증을 수행합니다.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';

// 간단한 인라인 스타일을 사용합니다.
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
    color: '#391B1B',
    border: 'none',
    borderRadius: '12px',
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  kakaoIcon: {
    marginRight: '0.5rem',
    width: '24px',
    height: '24px',
  }
};

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 실제 카카오 로그인 로직은 여기에 구현됩니다.
    // 지금은 메인 페이지로 돌아가는 것으로 가정합니다.
    alert('카카오 로그인 기능 구현 예정');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>로그인</h1>
      <button style={styles.kakaoButton} onClick={handleLogin}>
        <svg style={styles.kakaoIcon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 4.64c-6.96 0-12.64 4.48-12.64 10.08 0 3.52 2.32 6.64 5.76 8.48l-1.84 6.56 6.72-4.48c.64.08 1.28.16 2 .16 6.96 0 12.64-4.48 12.64-10.08s-5.68-10.72-12.64-10.72z"/></svg>
        카카오 로그인
      </button>
    </div>
  );
};

export default LoginPage;