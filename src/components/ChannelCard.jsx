import React, { forwardRef, useEffect } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import './ChannelCard.css';

const ChannelCard = forwardRef(({ title, onSelect, index }, ref) => {
  // Get navigation methods from our context
  const { registerElement, setFocus } = useNavigation();
  
  // Create a unique ID for this card using its index
  const cardId = `nav-card-${index}`;
  
  // Register this component when it mounts
  useEffect(() => {
    registerElement(cardId);
  }, [index]);

  // Separate effect for setting initial focus
  useEffect(() => {
    if (index === 0) {
      // Small delay to ensure registration is complete
      const timer = setTimeout(() => {
        setFocus(cardId);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div 
      id={cardId}
      ref={ref}
      className="channel-card" 
      tabIndex="0"
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      role="button"
      aria-label={title}
    >
      <div className="channel-thumbnail"></div>
      <div className="channel-title">{title}</div>
    </div>
  );
});

export default ChannelCard; 