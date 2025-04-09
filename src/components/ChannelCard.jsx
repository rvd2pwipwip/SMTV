import React, { forwardRef } from 'react';
import './ChannelCard.css';

const ChannelCard = forwardRef(({ title, onSelect }, ref) => {
  return (
    <div 
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