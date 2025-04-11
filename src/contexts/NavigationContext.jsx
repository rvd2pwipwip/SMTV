import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

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
  const [registeredElements, setRegisteredElements] = useState(new Set());
  const [focusedElement, setFocusedElement] = useState(null);
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [elementPositions, setElementPositions] = useState(new Map());
  const [pendingFocus, setPendingFocus] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [specialTargets, setSpecialTargets] = useState({
    header: null,
    miniPlayer: null
  });

  // Effect to handle initial focus after all elements are registered
  useEffect(() => {
    if (isInitialized && pendingFocus && registeredElements.has(pendingFocus)) {
      console.log('NavigationContext: Applying pending focus to', pendingFocus);
      const element = document.getElementById(pendingFocus);
      if (element) {
        element.focus();
        setFocusedElement(pendingFocus);
        setNavigationHistory(prev => [...prev, pendingFocus]);
      }
      setPendingFocus(null);
    }
  }, [isInitialized, pendingFocus, registeredElements]);

  // Effect to mark initialization complete after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('NavigationContext: Initialization complete');
      setIsInitialized(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Register a new element with the navigation system
  // This should be called when a component mounts
  const registerElement = useCallback((elementId, position) => {
    if (!position || typeof position.row !== 'number' || typeof position.col !== 'number') {
      console.error('NavigationContext: Invalid position data for element', elementId, position);
      return;
    }
    console.log('NavigationContext: Registering element', elementId, 'at position', position);
    setRegisteredElements(prev => new Set([...prev, elementId]));
    setElementPositions(prev => new Map(prev).set(elementId, position));
  }, []);

  const registerSpecialTarget = useCallback((targetType, elementId) => {
    console.log('NavigationContext: Registering special target', targetType, elementId);
    setSpecialTargets(prev => ({
      ...prev,
      [targetType]: elementId
    }));
  }, []);

  // Update focus to a specific element
  // Only works if the element has been registered
  const setFocus = useCallback((elementId) => {
    console.log('NavigationContext: Setting focus to', elementId);
    if (registeredElements.has(elementId) || specialTargets.header === elementId || specialTargets.miniPlayer === elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.focus();
        setFocusedElement(elementId);
        setNavigationHistory(prev => [...prev, elementId]);
      }
    } else {
      console.log('NavigationContext: Element not yet registered, queueing focus request for', elementId);
      setPendingFocus(elementId);
    }
  }, [registeredElements, specialTargets]);

  const findNextElement = useCallback((currentPosition, direction) => {
    if (!currentPosition) return null;

    const { row, col } = currentPosition;
    let targetPosition;

    switch (direction) {
      case 'right':
        targetPosition = { row, col: col + 1 };
        break;
      case 'left':
        targetPosition = { row, col: col - 1 };
        break;
      case 'down':
        // If we're in the header (row -1), find the first card in row 0
        if (row === -1) {
          return Array.from(registeredElements).find(id => {
            const pos = elementPositions.get(id);
            return pos && pos.row === 0 && pos.col === 0;
          });
        }
        // For now, return null for down navigation from cards (will be mini player later)
        return null;
      case 'up':
        // Return the header element ID for up navigation
        return specialTargets.header;
      default:
        return null;
    }

    // Find the element at the target position
    const nextElementId = Array.from(registeredElements).find(id => {
      const pos = elementPositions.get(id);
      return pos && pos.row === targetPosition.row && pos.col === targetPosition.col;
    });

    // If no element found at the exact position, find the closest one
    if (!nextElementId) {
      // For horizontal navigation, find the closest element in the same row
      if (direction === 'right' || direction === 'left') {
        const sameRowElements = Array.from(registeredElements).filter(id => {
          const pos = elementPositions.get(id);
          return pos && pos.row === row;
        });

        // Sort by column position
        const sortedElements = sameRowElements.sort((a, b) => {
          const posA = elementPositions.get(a);
          const posB = elementPositions.get(b);
          return posA.col - posB.col;
        });

        // Find the current element's index
        const currentIndex = sortedElements.findIndex(id => {
          const pos = elementPositions.get(id);
          return pos && pos.row === row && pos.col === col;
        });

        // Get the next or previous element
        if (direction === 'right' && currentIndex < sortedElements.length - 1) {
          return sortedElements[currentIndex + 1];
        } else if (direction === 'left' && currentIndex > 0) {
          return sortedElements[currentIndex - 1];
        }
      }
    }

    return nextElementId;
  }, [registeredElements, elementPositions, specialTargets]);

  const handleKeyNavigation = useCallback((event, currentElementId) => {
    console.log('NavigationContext: Handling key navigation', event.key, 'for element', currentElementId);
    
    // Handle back navigation with the 'B' key
    if (event.key === 'b' || event.key === 'B') {
      console.log('NavigationContext: Back key pressed');
      // Dispatch a custom event that the ScreenContext can listen for
      const backEvent = new CustomEvent('navigation:back');
      window.dispatchEvent(backEvent);
      event.preventDefault();
      return;
    }
    
    if (!currentElementId) {
      console.log('NavigationContext: No current element ID provided');
      return;
    }

    const currentPosition = elementPositions.get(currentElementId);
    if (!currentPosition && !specialTargets.header && !specialTargets.miniPlayer) {
      console.log('NavigationContext: No position found for element', currentElementId);
      return;
    }

    let nextElementId = null;

    switch (event.key) {
      case 'ArrowRight':
        nextElementId = findNextElement(currentPosition, 'right');
        break;
      case 'ArrowLeft':
        nextElementId = findNextElement(currentPosition, 'left');
        break;
      case 'ArrowDown':
        nextElementId = findNextElement(currentPosition, 'down');
        break;
      case 'ArrowUp':
        nextElementId = findNextElement(currentPosition, 'up');
        break;
    }

    if (nextElementId) {
      console.log('NavigationContext: Found next element', nextElementId);
      event.preventDefault();
      setFocus(nextElementId);
    } else {
      console.log('NavigationContext: No next element found');
    }
  }, [elementPositions, findNextElement, setFocus, specialTargets]);

  // Debug info
  useEffect(() => {
    console.log('NavigationContext State:', {
      registeredElements: Array.from(registeredElements),
      focusedElement,
      elementPositions: Array.from(elementPositions.entries()),
      isInitialized,
      pendingFocus,
      specialTargets
    });
  }, [registeredElements, focusedElement, elementPositions, isInitialized, pendingFocus, specialTargets]);

  // The value object that will be provided to all children
  const value = {
    focusedElement,
    setFocus,
    registerElement,
    registerSpecialTarget,
    navigationHistory,
    handleKeyNavigation,
    isInitialized
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
} 