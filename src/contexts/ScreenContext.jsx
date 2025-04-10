import React, { createContext, useContext, useState } from 'react';

// Define the available screens in our application
// This enum-like object helps us avoid typos and makes screen names consistent
const SCREENS = {
  HOME: 'HOME',
  CHANNEL_INFO: 'CHANNEL_INFO',
  // We can add more screens here as the app grows
};

// Create the context object
// This is what components will use to access screen navigation functionality
const ScreenContext = createContext();

// Custom hook to access the screen context
// This provides a clean API for components to use
export function useScreen() {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error('useScreen must be used within a ScreenProvider');
  }
  return context;
}

// The provider component that manages screen navigation state
export function ScreenProvider({ children }) {
  // Track which screen is currently active
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);
  
  // Track which channel is selected (for the channel info screen)
  const [selectedChannel, setSelectedChannel] = useState(null);
  
  // Navigate to a specific screen
  const navigateTo = (screen, data = null) => {
    console.log(`Navigating to ${screen}`, data); // Debug log
    setCurrentScreen(screen);
    
    // If we're navigating to the channel info screen, store the channel data
    if (screen === SCREENS.CHANNEL_INFO && data) {
      setSelectedChannel(data);
    }
  };
  
  // Go back to the previous screen
  // For now, we'll just go back to the home screen
  // In a more complex app, we might track navigation history
  const goBack = () => {
    console.log('Going back to home screen'); // Debug log
    setCurrentScreen(SCREENS.HOME);
  };
  
  // The value object that will be provided to all children
  // This contains all the screen navigation functionality
  const value = {
    currentScreen,
    selectedChannel,
    navigateTo,
    goBack,
    SCREENS // Export the screens enum so components can reference it
  };

  return (
    <ScreenContext.Provider value={value}>
      {children}
    </ScreenContext.Provider>
  );
} 