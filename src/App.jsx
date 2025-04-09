import React, { useEffect, useRef } from 'react';
import ChannelCard from './components/ChannelCard';
import './styles/App.css';

function App() {
  const firstCardRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Focus the first card when component mounts
    if (firstCardRef.current) {
      firstCardRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    const currentIndex = cardRefs.current.findIndex(ref => ref === document.activeElement);
    
    if (e.key === 'ArrowRight' && currentIndex < cardRefs.current.length - 1) {
      e.preventDefault();
      cardRefs.current[currentIndex + 1].focus();
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
      e.preventDefault();
      cardRefs.current[currentIndex - 1].focus();
    }
  };

  const handleChannelSelect = () => {
    console.log('Channel selected');
  };

  return (
    <div className="app" onKeyDown={handleKeyDown}>
      <h1 className="app-title">TV App</h1>
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