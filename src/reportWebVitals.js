/**
 * @file reportWebVitals.js
 * @description 웹 성능 지표(Web Vitals)를 측정하고 보고하는 함수를 정의합니다.
 *              사용자 경험에 중요한 Core Web Vitals(CLS, FID, LCP 등)를 수집하여 성능 최적화에 기여합니다.
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
