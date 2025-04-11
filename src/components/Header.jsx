import React, { forwardRef, useEffect } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import './Header.css';

const Header = forwardRef(({ title }, ref) => {
  // Get navigation methods from our context
  const { registerElement, registerSpecialTarget, handleKeyNavigation } = useNavigation();
  
  // Create a unique ID for this header
  const headerId = 'nav-header-main';
  
  // Register this component when it mounts
  useEffect(() => {
    // Register as a regular element with position
    registerElement(headerId, { row: -1, col: 0 }); // Position above the cards
    // Register as a special target for up navigation
    registerSpecialTarget('header', headerId);
    console.log('Header: Registered as special target for up navigation');
  }, [registerElement, registerSpecialTarget]);

  const handleKeyDown = (e) => {
    // Let the navigation context handle arrow keys
    handleKeyNavigation(e, headerId);
  };

  return (
    <header 
      id={headerId}
      className="header" 
      ref={ref}
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <h1 className="header-title">{title}</h1>
    </header>
  );
});

export default Header; 