import React, { useEffect, useRef } from 'react';
import { useScreen } from '../contexts/ScreenContext';
import './ChannelInfo.css';

const ChannelInfo = ({ channelTitle }) => {
  // Get the goBack function from our screen context
  const { goBack } = useScreen();
  
  // Create a ref for the component
  const channelInfoRef = useRef(null);
  
  // Focus the component when it mounts
  useEffect(() => {
    if (channelInfoRef.current) {
      channelInfoRef.current.focus();
    }
  }, []);
  
  // Handle keyboard events
  const handleKeyDown = (e) => {
    console.log('Key pressed in ChannelInfo:', e.key); // Debug log
    
    // Handle back navigation with the 'B' key
    if (e.key === 'b' || e.key === 'B') {
      e.preventDefault();
      console.log('Back key pressed, calling goBack()'); // Debug log
      goBack();
    }
  };

  return (
    <div 
      ref={channelInfoRef}
      className="channel-info" 
      tabIndex="0" 
      onKeyDown={handleKeyDown}
      autoFocus
    >
      <h1 className="channel-info-title">{channelTitle || 'Channel Information'}</h1>
      <div className="channel-info-content">
        <p>Channel details will be displayed here</p>
        <p>Press 'B' to go back to the home screen</p>
      </div>
    </div>
  );
};

export default ChannelInfo; 