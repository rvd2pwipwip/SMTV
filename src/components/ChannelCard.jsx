import React, { forwardRef, useEffect, useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import './ChannelCard.css';

const ChannelCard = forwardRef(({ title, onSelect, index, row = 0, col = 0 }, ref) => {
  const { registerElement, setFocus, handleKeyNavigation, isInitialized, focusedElement } = useNavigation();
  const [isRegistered, setIsRegistered] = useState(false);
  
  const cardId = `nav-card-${index}`;
  
  // Register the card immediately when it mounts
  useEffect(() => {
    registerElement(cardId, { row, col });
    setIsRegistered(true);
    console.log(`Card ${cardId} registered at position:`, { row, col });
  }, [cardId, row, col, registerElement]);

  // Handle initial focus for the first card
  useEffect(() => {
    if (index === 0 && isInitialized) {
      console.log(`ChannelCard: Setting initial focus to ${cardId}`);
      setFocus(cardId);
    }
  }, [index, cardId, setFocus, isInitialized]);

  const handleSelect = () => {
    onSelect({ title, id: index });
  };

  const handleKeyDown = (e) => {
    console.log(`Key pressed on ${cardId}:`, e.key);
    
    // Handle Enter/Space for selection
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect();
      return;
    }

    // Let the navigation context handle arrow keys
    handleKeyNavigation(e, cardId);
  };

  const isFocused = focusedElement === cardId;

  return (
    <div 
      id={cardId}
      ref={ref}
      className={`channel-card ${isFocused ? 'focused' : ''}`}
      tabIndex="0"
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={title}
      style={{
        border: isFocused ? '2px solid red' : 'none',
        position: 'relative'
      }}
    >
      <div className="channel-thumbnail"></div>
      <div className="channel-title">{title}</div>
      {/* Debug info */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '2px',
        fontSize: '10px'
      }}>
        {isRegistered ? '✓' : '×'} {isInitialized ? 'I' : 'i'} {isFocused ? 'F' : 'f'}
      </div>
    </div>
  );
});

export default ChannelCard; 