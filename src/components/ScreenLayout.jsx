import React, { useRef, useEffect } from 'react';
import './ScreenLayout.css';

/**
 * ScreenLayout component
 * 
 * This component ensures all screens maintain the correct 1920x1080 aspect ratio
 * and properly scale based on browser window size. It also handles focus navigation
 * for TV remote control usage.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to render inside the layout
 * @param {string} [props.title] - Optional title for the screen
 * @param {boolean} [props.autoFocus=true] - Whether to automatically focus this component on mount
 */
const ScreenLayout = ({ children, title, autoFocus = true }) => {
  const layoutRef = useRef(null);

  // Focus the layout when it mounts if autoFocus is true
  useEffect(() => {
    if (autoFocus && layoutRef.current) {
      layoutRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div 
      ref={layoutRef}
      className="screen-layout" 
      tabIndex="0"
      role="region"
      aria-label={title || "Screen content"}
    >
      <div className="screen-layout-content">
        {children}
      </div>
    </div>
  );
};

export default ScreenLayout; 