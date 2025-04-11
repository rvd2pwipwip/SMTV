import React, { forwardRef, useEffect, useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import './ChannelCard.css';

const ChannelCard = forwardRef(({ title, onSelect, index, row = 0, col = 0, isFocused: propIsFocused }, ref) => {
  const { registerElement, setFocus, handleKeyNavigation, isInitialized, focusedElement } = useNavigation();
  const [isRegistered, setIsRegistered] = useState(false);
  
  const cardId = `nav-card-${index}`;
  
  // Register the card immediately when it mounts
  useEffect(() => {
    registerElement(cardId, { row, col });
    setIsRegistered(true);
  }, [cardId, row, col, registerElement]);

  // Handle initial focus for the first card
  useEffect(() => {
    if (index === 0 && isInitialized) {
      setFocus(cardId);
    }
  }, [index, cardId, setFocus, isInitialized]);

  const handleSelect = () => {
    onSelect({ title, id: index });
  };

  const handleKeyDown = (e) => {
    // Handle Enter/Space for selection
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect();
      return;
    }

    // Let the navigation context handle arrow keys
    handleKeyNavigation(e, cardId);
  };

  // Use the prop if provided, otherwise use the navigation context
  const isFocused = propIsFocused !== undefined ? propIsFocused : focusedElement === cardId;

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
    >
      <div className="channel-thumbnail"></div>
      <div className="channel-card-title">{title}</div>
    </div>
  );
});

export default ChannelCard; 