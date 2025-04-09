import React, { useEffect, useRef, useState } from 'react';
import ChannelCard from './components/ChannelCard';
import Header from './components/Header';
import './styles/App.css';

function App() {
  const headerRef = useRef(null);
  const firstCardRef = useRef(null);
  const cardRefs = useRef([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  useEffect(() => {
    // Focus the first card when component mounts
    if (firstCardRef.current) {
      firstCardRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    const currentElement = document.activeElement;
    const isHeader = currentElement === headerRef.current;
    const isCard = cardRefs.current.includes(currentElement);
    
    // Navigation between header and content
    if (e.key === 'ArrowDown' && isHeader) {
      e.preventDefault();
      // Focus the previously selected card or the first card
      const cardToFocus = cardRefs.current[selectedCardIndex] || firstCardRef.current;
      if (cardToFocus) {
        cardToFocus.focus();
      }
    } else if (e.key === 'ArrowUp' && isCard) {
      e.preventDefault();
      // Remember which card was selected
      const currentIndex = cardRefs.current.findIndex(ref => ref === currentElement);
      if (currentIndex !== -1) {
        setSelectedCardIndex(currentIndex);
      }
      // Focus the header
      if (headerRef.current) {
        headerRef.current.focus();
      }
    }
    
    // Horizontal navigation between cards
    if (e.key === 'ArrowRight' && isCard) {
      e.preventDefault();
      const currentIndex = cardRefs.current.findIndex(ref => ref === currentElement);
      if (currentIndex < cardRefs.current.length - 1) {
        cardRefs.current[currentIndex + 1].focus();
        setSelectedCardIndex(currentIndex + 1);
      }
    } else if (e.key === 'ArrowLeft' && isCard) {
      e.preventDefault();
      const currentIndex = cardRefs.current.findIndex(ref => ref === currentElement);
      if (currentIndex > 0) {
        cardRefs.current[currentIndex - 1].focus();
        setSelectedCardIndex(currentIndex - 1);
      }
    }
  };

  const handleChannelSelect = () => {
    console.log('Channel selected');
  };

  return (
    <div className="app" onKeyDown={handleKeyDown}>
      <Header 
        ref={headerRef}
        title="Sringray Music" 
      />
      <div className="content-container">
        <ChannelCard 
          ref={el => {
            firstCardRef.current = el;
            cardRefs.current[0] = el;
          }}
          title="Sample Channel" 
          onSelect={handleChannelSelect} 
        />
        <ChannelCard 
          ref={el => cardRefs.current[1] = el}
          title="Sample Channel" 
          onSelect={handleChannelSelect} 
        />
        <ChannelCard 
          ref={el => cardRefs.current[2] = el}
          title="Sample Channel" 
          onSelect={handleChannelSelect} 
        />
      </div>
    </div>
  );
}

export default App; 