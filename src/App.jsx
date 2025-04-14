import React, { useEffect, useRef } from 'react';
import Header from './components/Header';
import ChannelInfo from './components/ChannelInfo';
import ChannelSwimlane from './components/ChannelSwimlane';
import ScreenLayout from './components/ScreenLayout';
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
    { id: 5, title: "Sample Channel 5" },
    { id: 6, title: "Sample Channel 6" },
    { id: 7, title: "Sample Channel 7" },
    { id: 8, title: "Sample Channel 8" },
    { id: 9, title: "Sample Channel 9" },
    { id: 10, title: "Sample Channel 10" },
    { id: 11, title: "Sample Channel 11" },
    { id: 12, title: "Sample Channel 12" }
  ];

  // Render the appropriate screen content based on currentScreen
  const renderScreenContent = () => {
    switch (currentScreen) {
      case SCREENS.HOME:
        return (
          <>
            <Header title="Sringray Music" />
            <ChannelSwimlane
              channels={channels}
              onChannelSelect={handleChannelSelect}
            />
          </>
        );
      case SCREENS.CHANNEL_INFO:
        return <ChannelInfo channelTitle={selectedChannel?.title} />;
      default:
        return null;
    }
  };

  return (
    <div 
      ref={appRef}
      className="app" 
      tabIndex="0"
      autoFocus
    >
      <ScreenLayout title={currentScreen === SCREENS.HOME ? "Home Screen" : "Channel Info"}>
        {renderScreenContent()}
      </ScreenLayout>
    </div>
  );
}

export default App; 