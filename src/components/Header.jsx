import React, { forwardRef, useEffect } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import './Header.css';

const Header = forwardRef(({ title }, ref) => {
  // Get navigation methods from our context
  const { registerElement } = useNavigation();
  
  // Create a unique ID for this header
  const headerId = 'nav-header-main';
  
  // Register this component when it mounts
  useEffect(() => {
    registerElement(headerId);
  }, []);

  return (
    <header 
      id={headerId}
      className="header" 
      ref={ref}
      tabIndex="0"
    >
      <h1 className="header-title">{title}</h1>
    </header>
  );
});

export default Header; 