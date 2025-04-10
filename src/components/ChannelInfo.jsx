import React, { useEffect, useRef } from 'react';
import { useScreen } from '../contexts/ScreenContext';
import ChannelMetadata from './ChannelMetadata';
import './ChannelInfo.css';
import './ChannelMetadata.css';

const ChannelInfo = () => {
  const { selectedChannel } = useScreen();
  
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
      <ChannelMetadata
        title={selectedChannel?.title || 'Channel Title'}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        tags={['Cooking', 'Love', 'Third', 'Fourth Tag', 'Fifth']}
      />
      <div className="channel-info-content">
        <p>Channel details will be displayed here</p>
        <p>Press 'B' to go back to the home screen</p>
      </div>
    </div>
  );
};

export default ChannelInfo; 