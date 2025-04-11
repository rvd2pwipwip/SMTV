import React, { useEffect, useRef } from 'react';
import Header from './components/Header';
import ChannelInfo from './components/ChannelInfo';
import ChannelSwimlane from './components/ChannelSwimlane';
import { useScreen } from './contexts/ScreenContext';
import './styles/App.css';

function App() {
  const appRef = useRef(null);
  const { currentScreen, selectedChannel, navigateTo, SCREENS } = useScreen();

  // Focus the app container when it mounts
  useEffect(() => {
    if (appRef.current) {
      appRef.current.focus();
    }
  }, []);

  const handleChannelSelect = (channelData) => {
    navigateTo(SCREENS.CHANNEL_INFO, channelData);
  };

  // Sample channel data
  const channels = [
    { id: 1, title: "Sample Channel 1" },
    { id: 2, title: "Sample Channel 2" },
    { id: 3, title: "Sample Channel 3" },
    { id: 4, title: "Sample Channel 4" },
    { id: 5, title: "Sample Channel 5" }
  ];

  return (
    <div 
      ref={appRef}
      className="app" 
      tabIndex="0"
      autoFocus
    >
      {currentScreen === SCREENS.HOME ? (
        <>
          <Header title="Sringray Music" />
          <ChannelSwimlane
            channels={channels}
            onChannelSelect={handleChannelSelect}
          />
        </>
      ) : currentScreen === SCREENS.CHANNEL_INFO ? (
        <ChannelInfo channelTitle={selectedChannel?.title} />
      ) : null}
    </div>
  );
}

export default App; 