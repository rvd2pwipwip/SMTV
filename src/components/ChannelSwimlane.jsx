import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import ChannelCard from './ChannelCard';
import './ChannelSwimlane.css';

const ChannelSwimlane = ({ channels, onChannelSelect }) => {
  const contentRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const { registerElement, handleKeyNavigation } = useNavigation();
  const contentId = 'channel-swimlane';
  
  // Card dimensions for scrolling calculations
  const cardWidth = 300; // Width of each card
  const cardGap = 16; // Gap between cards (var(--spacing-md))
  const visibleCards = 4; // Number of cards visible at once
  
  // Register this content as a carousel navigation type
  useEffect(() => {
    if (contentRef.current) {
      registerElement(contentId, { row: 0, col: 0 }, {
        type: 'carousel',
        group: 'channels'
      });
    }
  }, [contentId, registerElement]);
  
  // Scroll to the focused card
  useEffect(() => {
    if (cardsContainerRef.current) {
      const scrollAmount = focusedIndex * (cardWidth + cardGap);
      cardsContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [focusedIndex, cardWidth, cardGap]);

  const handleKeyDown = (e) => {
    // Prevent default behavior for arrow keys
    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      
      if (e.key === 'ArrowRight') {
        // Move to next card
        setFocusedIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          return nextIndex < channels.length ? nextIndex : prevIndex;
        });
      } else if (e.key === 'ArrowLeft') {
        // Move to previous card
        setFocusedIndex(prevIndex => {
          const nextIndex = prevIndex - 1;
          return nextIndex >= 0 ? nextIndex : prevIndex;
        });
      }
    } else {
      // Let NavigationContext handle other keys
      handleKeyNavigation(e, contentId);
    }
  };

  return (
    <div 
      ref={contentRef}
      id={contentId}
      className="channel-swimlane"
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <div 
        ref={cardsContainerRef}
        className="cards-container"
      >
        {channels.map((channel, index) => (
          <ChannelCard
            key={channel.id}
            title={channel.title}
            onSelect={() => onChannelSelect(channel)}
            index={index}
            row={0}
            col={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ChannelSwimlane; 