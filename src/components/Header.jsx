import React, { forwardRef } from 'react';
import './Header.css';

const Header = forwardRef(({ title, onKeyDown }, ref) => {
  return (
    <header 
      className="header" 
      ref={ref}
      tabIndex="0"
      onKeyDown={onKeyDown}
    >
      <h1 className="header-title">{title}</h1>
    </header>
  );
});

export default Header; 