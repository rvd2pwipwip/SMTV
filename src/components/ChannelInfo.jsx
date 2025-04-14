import React, { useEffect, useRef } from 'react';
import { useScreen } from '../contexts/ScreenContext';
import { useNavigation } from '../contexts/NavigationContext';
import ScreenLayout from './ScreenLayout';
import './ChannelInfo.css';

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

  const handlePlay = () => {
    // TODO: Implement play functionality
    console.log('Play clicked');
  };

  const handleAddToFavorites = () => {
    // TODO: Implement add to favorites functionality
    console.log('Add to favorites clicked');
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
        <div className="channel-info__content">
          <div className="channel-info__thumbnail">
            {/* Placeholder for channel thumbnail/preview */}
          </div>
          
          <div className="channel-info__details">
            <h1 className="channel-info__title">
              {selectedChannel?.title || 'The Very Best Channel Ever Programmed'}
            </h1>
            
            <div className="channel-info__actions">
              <button 
                className="tv-button tv-button--primary"
                onClick={handlePlay}
              >
                <span className="icon">▶</span>
                Play
              </button>
              
              <button 
                className="tv-button tv-button--outline"
                onClick={handleAddToFavorites}
              >
                <span className="icon">♡</span>
                Add to Favorites
              </button>
            </div>
            
            <p className="channel-info__description">
              Lorem ipsum dolor sit amet consectetur. A sed in neque urna etiam eu a. 
              Imperdiet et felis porttitor risus. Tortor aliquet facilisis id integer eget. 
              Risus nunc turpis euismod et ultrices varius. Ultrices enim nisi praesent tellus ut consequat magna eget ac.
            </p>
            
            <div className="channel-info__tags">
              {['Cooking', 'Love', 'Third', 'Fourth Tag', 'Fifth'].map((tag, index) => (
                <span key={index} className="tv-tag" tabIndex="0">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default ChannelInfo; 