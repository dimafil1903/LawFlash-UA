import React, { useState, useMemo } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useAppContext } from '../store';
import { SwipeCard } from '../components/SwipeCard';
import { initProgress, processAnswer, isDue } from '../algo';

export const DailyReview = ({ navigate }) => {
  const { cards, progress, updateCardProgress } = useAppContext();
  
  const dailyDeck = useMemo(() => {
    // 1. Overdue cards & Lapsed
    const overdue = [];
    const hard = [];
    const newCards = [];

    cards.forEach(c => {
      const prog = progress[c.id];
      if (!prog) {
        newCards.push(c);
      } else {
        if (isDue(prog.nextReviewAt)) overdue.push(c);
        // If they got it wrong a lot, we could put it in hard, but overdue catches it anyway
      }
    });

    // Increase new cards per day to 40 to cover full database in 10 days
    const toReview = [...overdue, ...newCards.slice(0, 40)];
    return toReview.sort(() => Math.random() - 0.5); // shuffle
  }, [cards, progress]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (currentIndex >= dailyDeck.length) return;
    
    const cardId = dailyDeck[currentIndex].id;
    const currentProg = progress[cardId] || initProgress();
    const quality = direction === 'right' ? 4 : 1; 

    const newProg = processAnswer(currentProg, quality);
    updateCardProgress(cardId, newProg);

    setCurrentIndex(prev => prev + 1);
  };

  if (currentIndex >= dailyDeck.length) {
    return (
      <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <h2 style={{ marginBottom: 16 }}>На сьогодні все! 🎉</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 24 }}>
          Ви пройшли всі картки, заплановані на сьогодні.
        </p>
        <button className="btn-primary" onClick={() => navigate('Home')}>На головну</button>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="nav-bar">
        <div className="nav-left">
          <button onClick={() => navigate('Home')} style={{display: 'flex', alignItems: 'center'}}>
            <ChevronLeft size={24} /> <span style={{marginLeft: 4}}>Головна</span>
          </button>
        </div>
        <span className="nav-title">
          {currentIndex + 1} / {dailyDeck.length}
        </span>
      </div>
      
      <div className="card-stack" style={{ position: 'relative', flex: 1, padding: 20 }}>
        {currentIndex + 1 < dailyDeck.length && (
          <div style={{
            position: 'absolute', top: 30, bottom: 10, left: 30, right: 30,
            backgroundColor: 'var(--panel-color)', opacity: 0.5, borderRadius: 'var(--card-radius)',
            boxShadow: 'var(--shadow)', zIndex: 0
          }} />
        )}

        <SwipeCard 
          key={dailyDeck[currentIndex].id} 
          item={dailyDeck[currentIndex]} 
          onSwipe={handleSwipe} 
        />
      </div>
    </div>
  );
};
