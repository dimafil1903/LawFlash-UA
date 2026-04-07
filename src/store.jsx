// src/store.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('lawflash-progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    fetch('/cards.json')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.error("Could not load cards", err));
  }, []);

  useEffect(() => {
    localStorage.setItem('lawflash-progress', JSON.stringify(progress));
  }, [progress]);

  const updateCardProgress = (cardId, newProgress) => {
    setProgress(prev => ({
      ...prev,
      [cardId]: newProgress
    }));
  };

  const resetAll = () => setProgress({});
  
  const resetTopic = (topic) => {
    setProgress(prev => {
      const newP = { ...prev };
      cards.forEach(c => {
        if (c.category === topic) {
          delete newP[c.id];
        }
      });
      return newP;
    });
  };

  return (
    <AppContext.Provider value={{
      cards, progress, updateCardProgress, resetAll, resetTopic
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
