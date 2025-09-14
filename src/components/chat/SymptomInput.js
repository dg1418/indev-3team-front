/**
 * @file SymptomInput.js
 * @description 사용자가 증상을 입력하고 전송하는 입력 필드와 버튼을 포함하는 컴포넌트입니다.
 *              입력된 텍스트를 관리하고, 전송 시 MSW로 모의 API 요청을 보낸 후 응답을 처리합니다.
 *              forwardRef를 통해 부모 컴포넌트에서 입력창을 직접 제어할 수 있습니다.
 */
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const SymptomInput = forwardRef(({ onSendMessage }, ref) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null); // 실제 input 요소에 대한 참조

  // 부모 컴포넌트에서 사용할 수 있는 메서드들을 expose
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    blur: () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    },
    clear: () => {
      setInputText('');
    },
    getValue: () => inputText,
    setValue: (value) => setInputText(value)
  }), [inputText]);

  // 컴포넌트 마운트 시 자동 포커스
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 로딩 상태가 변경될 때마다 포커스 복원
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      // 약간의 지연을 두어 다른 작업들이 완료된 후 포커스 설정
      setTimeout(() => {
        inputRef.current.focus();
      }, 50);
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const currentInput = inputText; // 현재 입력값 저장
    setInputText(''); // 입력창을 먼저 비움
    setIsLoading(true);
    
    // 사용자 메시지를 먼저 전달
    onSendMessage({ text: currentInput, sender: 'user' });

    // 입력창 포커스 유지 (메시지 전송 직후)
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);

    try {
      const response = await fetch('/api/symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: currentInput }),
      });

      // 응답 상태 확인
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Content-Type 확인
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Response is not JSON:', await response.text());
        throw new Error('서버에서 올바르지 않은 응답을 받았습니다.');
      }

      const data = await response.json();

      // 응답 데이터 검증
      if (!data || !data.message) {
        throw new Error('응답 데이터가 올바르지 않습니다.');
      }

      // 봇의 응답을 전달 (추가 정보도 함께 표시)
      let botMessage = data.message;
      
      if (data.recommendation && data.alternatives && data.alternatives.length > 0) {
        botMessage += `\n\n💊 추천 약물: ${data.recommendation}`;
        botMessage += `\n🔄 대안 약물: ${data.alternatives.join(', ')}`;
      }
      
      onSendMessage({ text: botMessage, sender: 'bot' });

    } catch (error) {
      console.error('Error fetching recommendation:', error);
      
      // 더 구체적인 에러 메시지 제공
      let errorMessage = '오류가 발생했습니다. 다시 시도해주세요.';
      
      if (error.message.includes('404')) {
        errorMessage = '서비스가 일시적으로 이용할 수 없습니다. 잠시 후 다시 시도해주세요.';
      } else if (error.message.includes('network') || error.name === 'NetworkError') {
        errorMessage = '네트워크 연결을 확인한 후 다시 시도해주세요.';
      }
      
      onSendMessage({ text: errorMessage, sender: 'bot' });
    } finally {
      setIsLoading(false);
      // 로딩 완료 후 포커스 복원 (useEffect에서도 처리하지만 추가 보장)
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  // 입력창 클릭 시 포커스 보장
  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 키보드 이벤트 처리
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="symptom-input">
      <input
        ref={inputRef}
        type="text"
        placeholder="두통, 복통 등의 증상을 입력하세요..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        autoComplete="off"
        autoFocus
      />
      <button type="submit" disabled={isLoading || !inputText.trim()}>
        {isLoading ? '전송 중...' : '전송'}
      </button>
    </form>
  );
});

SymptomInput.displayName = 'SymptomInput';

export default SymptomInput;