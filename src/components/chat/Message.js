/**
 * @file Message.js
 * @description 채팅창 내에서 개별 메시지를 표시하는 컴포넌트입니다.
 *              메시지의 내용과 발신자(사용자 또는 AI)에 따라 다른 스타일을 적용하여 시각적으로 구분합니다.
 *              AI 메시지에는 타이핑 효과 애니메이션을 적용합니다.
 */
import React, { useState, useEffect } from 'react';

const Message = ({ text, sender }) => {
  const [displayedText, setDisplayedText] = useState('');
  const messageClass = sender === 'user' ? 'user' : 'ai';

  useEffect(() => {
    // 사용자가 보낸 메시지가 아닐 경우에만 타이핑 효과를 적용합니다.
    if (sender !== 'user') {
      setDisplayedText(''); // 메시지가 변경될 때마다 초기화
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50); // 40ms 간격으로 한 글자씩 나타납니다.

      // 컴포넌트가 언마운트되거나 text가 변경될 때 interval을 정리합니다.
      return () => clearInterval(typingInterval);
    } else {
      // 사용자 메시지는 즉시 전체 텍스트를 표시합니다.
      setDisplayedText(text);
    }
  }, [text, sender]);

  return (
    <div className={`message ${messageClass}`}>
      {/* pre-wrap을 사용하여 줄바꿈과 공백을 유지하도록 합니다. */}
      <p style={{ whiteSpace: 'pre-wrap' }}>{displayedText}</p>
    </div>
  );
};

export default Message;
