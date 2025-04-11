import React, { useEffect, useRef } from 'react';
import ChannelCard from './components/ChannelCard';
import Header from './components/Header';
import ChannelInfo from './components/ChannelInfo';
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
          <div className="content-container">
            <ChannelCard 
              title="Sample Channel 1" 
              onSelect={() => handleChannelSelect({ title: "Sample Channel 1", id: 1 })}
              index={0}
              row={0}
              col={0}
            />
            <ChannelCard 
              title="Sample Channel 2" 
              onSelect={() => handleChannelSelect({ title: "Sample Channel 2", id: 2 })}
              index={1}
              row={0}
              col={1}
            />
            <ChannelCard 
              title="Sample Channel 3" 
              onSelect={() => handleChannelSelect({ title: "Sample Channel 3", id: 3 })}
              index={2}
              row={0}
              col={2}
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