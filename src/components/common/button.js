// src/components/common/Button.js
import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  // 버튼 클래스명 생성
  const getButtonClass = () => {
    let classes = ['btn'];
    
    // variant별 스타일
    classes.push(`btn--${variant}`);
    
    // size별 스타일
    classes.push(`btn--${size}`);
    
    // 상태별 클래스
    if (disabled) classes.push('btn--disabled');
    if (loading) classes.push('btn--loading');
    if (fullWidth) classes.push('btn--full-width');
    if (icon) classes.push('btn--with-icon');
    
    // 커스텀 클래스명 추가
    if (className) classes.push(className);
    
    return classes.join(' ');
  };

  // 클릭 핸들러
  const handleClick = (e) => {
    if (disabled || loading) return;
    if (onClick) onClick(e);
  };

  // 아이콘 렌더링
  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <span className={`btn__icon btn__icon--${iconPosition}`}>
        {typeof icon === 'string' ? <i className={icon} /> : icon}
      </span>
    );
  };

  // 로딩 스피너 렌더링
  const renderLoadingSpinner = () => {
    if (!loading) return null;
    
    return (
      <span className="btn__spinner">
        <svg className="btn__spinner-icon" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="31.416"
            strokeDashoffset="31.416"
          />
        </svg>
      </span>
    );
  };

  return (
    <button
      type={type}
      className={getButtonClass()}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && renderLoadingSpinner()}
      {!loading && iconPosition === 'left' && renderIcon()}
      
      <span className="btn__text">
        {children}
      </span>
      
      {!loading && iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default Button;