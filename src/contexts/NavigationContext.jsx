import React, { createContext, useContext, useState } from 'react';

// Create the navigation context
const NavigationContext = createContext();

// Custom hook to access navigation context
// This provides a clean API for components to use
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

// The provider component that manages navigation state
export function NavigationProvider({ children }) {
  // Track all elements that can receive focus
  // Using Set for efficient lookup and uniqueness
  const [registeredElements, setRegisteredElements] = useState(new Set());
  
  // Track which element is currently focused
  const [focusedElement, setFocusedElement] = useState(null);
  
  // Keep history of focused elements for back/forward navigation
  const [navigationHistory, setNavigationHistory] = useState([]);

  // Register a new element with the navigation system
  // This should be called when a component mounts
  const registerElement = (elementId) => {
    setRegisteredElements(prev => new Set([...prev, elementId]));
  };

  // Update focus to a specific element
  // Only works if the element has been registered
  const setFocus = (elementId) => {
    if (registeredElements.has(elementId)) {
      setFocusedElement(elementId);
      setNavigationHistory(prev => [...prev, elementId]);
    } else {
      console.warn(`Attempted to focus unregistered element: ${elementId}`);
    }
  };

  // The value object that will be provided to all children
  const value = {
    focusedElement,
    setFocus,
    registerElement,
    navigationHistory
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
} 