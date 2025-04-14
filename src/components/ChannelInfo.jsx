import React, { useEffect, useRef } from 'react';
import { useScreen } from '../contexts/ScreenContext';
import { useNavigation } from '../contexts/NavigationContext';
import ChannelMetadata from './ChannelMetadata';
import ScreenLayout from './ScreenLayout';
import './ChannelInfo.css';
import './ChannelMetadata.css';

const ChannelInfo = () => {
  const { selectedChannel, goBack } = useScreen();
  const { handleKeyNavigation } = useNavigation();
  
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
    
    // Let NavigationContext handle the key event
    handleKeyNavigation(e);
  };

  return (
    <ScreenLayout title={`${selectedChannel?.title || 'Channel'} Info`}>
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
      </div>
    </ScreenLayout>
  );
};

export default ChannelInfo; 