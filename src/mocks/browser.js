/**
 * @file browser.js
 * @description 브라우저 환경에서 Mock Service Worker (MSW)를 설정하고 초기화하는 파일입니다.
 *              `handlers.js`에 정의된 API 모의 핸들러들을 가져와 서비스 워커를 설정하며,
 *              애플리케이션의 클라이언트 사이드에서 네트워크 요청을 가로챌 수 있도록 준비합니다.
 */
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// 모든 핸들러를 사용하여 서비스 워커를 설정합니다.
export const worker = setupWorker(...handlers);
