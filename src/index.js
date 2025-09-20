/**
 * @file index.js
 * @description React 애플리케이션의 메인 진입점 파일입니다.
 *              루트 DOM 요소에 `App` 컴포넌트를 렌더링하고, 웹 성능 지표(Web Vitals) 보고를 설정합니다.
 *              애플리케이션의 시작점 역할을 합니다.
 */

// 모든 import문을 파일 상단에 배치
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import './styles/index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

// MSW를 비동기로 초기화하고 앱을 시작하는 함수
async function startApp() {
  // 개발 환경에서만 MSW 초기화
  if (process.env.NODE_ENV === 'development') {
    try {
      const { worker } = await import('./mocks/browser');
      
      // MSW 워커가 완전히 시작될 때까지 대기
      await worker.start({
        onUnhandledRequest: 'warn', // 처리되지 않은 요청에 대해 경고만 표시
        serviceWorker: {
          url: '/mockServiceWorker.js', // public 폴더의 서비스 워커 파일
        },
      });
      
      console.log('MSW: Mock Service Worker가 시작되었습니다.');
    } catch (error) {
      console.error('MSW: Mock Service Worker 시작 중 오류 발생:', error);
    }
  }

  // React 앱 렌더링
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

// 앱 시작
startApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();