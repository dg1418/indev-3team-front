/**
 * @file App.test.js
 * @description `App` 컴포넌트에 대한 단위 테스트 파일입니다.
 *              React Testing Library를 사용하여 컴포넌트가 올바르게 렌더링되는지 확인합니다.
 */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
