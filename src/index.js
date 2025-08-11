/**
 * @file index.js
 * @description React 애플리케이션의 메인 진입점 파일입니다.
 *              루트 DOM 요소에 `App` 컴포넌트를 렌더링하고, 웹 성능 지표(Web Vitals) 보고를 설정합니다.
 *              애플리케이션의 시작점 역할을 합니다.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

// MSW 초기화 코드 추가
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

import './styles/index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
