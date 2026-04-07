import React, { useState, useMemo } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useAppContext } from '../store';
import { SwipeCard } from '../components/SwipeCard';
import { initProgress, processAnswer } from '../algo';

export const Session = ({ navigate, topic }) => {
  const { cards, progress, updateCardProgress } = useAppContext();
  
  const deck = useMemo(() => {
    return cards.filter(c => c.category === topic);
  }, [cards, topic]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    const cardId = deck[currentIndex].id;
    const currentProg = progress[cardId] || initProgress();
    const quality = direction === 'right' ? 4 : 1; 

    const newProg = processAnswer(currentProg, quality);
    updateCardProgress(cardId, newProg);

    setCurrentIndex(prev => prev + 1);
  };

  if (currentIndex >= deck.length) {
    return (
      <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <h2 style={{ marginBottom: 16 }}>Сесію завершено! 🎉</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 24 }}>
          Ви пройшли всі питання у цій темі.
        </p>
        <button className="btn-primary" onClick={() => navigate('Topics')}>До списку тем</button>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="nav-bar">
        <div className="nav-left">
          <button onClick={() => navigate('Topics')} style={{display: 'flex', alignItems: 'center'}}>
            <ChevronLeft size={24} /> <span style={{marginLeft: 4}}>Теми</span>
          </button>
        </div>
        <span className="nav-title">
          {currentIndex + 1} / {deck.length}
        </span>
      </div>
      
      <div className="card-stack" style={{ position: 'relative', flex: 1, padding: 20 }}>
        {/* Render bottom card for effect */}
        {currentIndex + 1 < deck.length && (
          <div style={{
            position: 'absolute', top: 30, bottom: 10, left: 30, right: 30,
            backgroundColor: 'var(--panel-color)', opacity: 0.5, borderRadius: 'var(--card-radius)',
            boxShadow: 'var(--shadow)', zIndex: 0
          }} />
        )}

        {/* Active Card */}
        <SwipeCard 
          key={deck[currentIndex].id} 
          item={deck[currentIndex]} 
          onSwipe={handleSwipe} 
        />
      </div>
    </div>
  );
};
