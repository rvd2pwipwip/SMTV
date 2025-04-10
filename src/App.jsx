import React, { useEffect, useRef, useState } from 'react';
import ChannelCard from './components/ChannelCard';
import Header from './components/Header';
import ChannelInfo from './components/ChannelInfo';
import { useScreen } from './contexts/ScreenContext';
import './styles/App.css';

function App() {
  const headerRef = useRef(null);
  const firstCardRef = useRef(null);
  const cardRefs = useRef([]);
  const appRef = useRef(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  
  // Get screen navigation functionality from our context
  const { currentScreen, selectedChannel, navigateTo, goBack, SCREENS } = useScreen();

  // Focus the app container when it mounts
  useEffect(() => {
    if (appRef.current) {
      appRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Focus the first card when component mounts and we're on the home screen
    if (firstCardRef.current && currentScreen === SCREENS.HOME) {
      firstCardRef.current.focus();
    }
  }, [currentScreen]);

  const handleKeyDown = (e) => {
    console.log('Key pressed in App:', e.key); // Debug log
    
    // Handle back navigation with the 'B' key at the app level
    // This ensures it works regardless of which component has focus
    if (e.key === 'b' || e.key === 'B') {
      e.preventDefault();
      console.log('Back key pressed in App, calling goBack()'); // Debug log
      goBack();
      return;
    }
    
    // Only handle navigation keys if we're on the home screen
    if (currentScreen !== SCREENS.HOME) return;
    
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

  const handleChannelSelect = (channelData) => {
    // Navigate to the channel info screen with the selected channel data
    navigateTo(SCREENS.CHANNEL_INFO, channelData);
  };

  // Render the appropriate screen based on the current screen state
  return (
    <div 
      ref={appRef}
      className="app" 
      onKeyDown={handleKeyDown} 
      tabIndex="0"
      autoFocus
    >
      {currentScreen === SCREENS.HOME ? (
        <>
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
              title="Sample Channel 1" 
              onSelect={() => handleChannelSelect({ title: "Sample Channel 1", id: 1 })}
              index={0}
            />
            <ChannelCard 
              ref={el => cardRefs.current[1] = el}
              title="Sample Channel 2" 
              onSelect={() => handleChannelSelect({ title: "Sample Channel 2", id: 2 })}
              index={1}
            />
            <ChannelCard 
              ref={el => cardRefs.current[2] = el}
              title="Sample Channel 3" 
              onSelect={() => handleChannelSelect({ title: "Sample Channel 3", id: 3 })}
              index={2}
            />
          </div>
        </>
      ) : currentScreen === SCREENS.CHANNEL_INFO ? (
        <ChannelInfo channelTitle={selectedChannel?.title} />
      ) : null}
    </div>
  );
}

export default App; 