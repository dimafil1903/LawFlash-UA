import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useAppContext } from '../store';

export const Stats = ({ navigate }) => {
  const { cards, progress } = useAppContext();
  
  const totalCards = cards.length;
  const startedCards = Object.keys(progress).length;
  const learnedCards = Object.values(progress).filter(p => p.interval > 1).length;
  const hardCards = Object.values(progress).filter(p => p.lapses > 2).length;

  return (
    <div className="screen">
      <div className="nav-bar">
        <div className="nav-left">
          <button onClick={() => navigate('Home')} style={{display: 'flex', alignItems: 'center'}}>
            <ChevronLeft size={24} /> <span style={{marginLeft: 4}}>Головна</span>
          </button>
        </div>
        <span className="nav-title">Статистика</span>
      </div>
      
      <div className="content-scroll">
        <div className="list" style={{ marginTop: 20 }}>
          <div className="list-item">
            <span className="list-item-title">Пройдено питань</span>
            <span style={{ fontWeight: 600 }}>{startedCards} / {totalCards}</span>
          </div>
          <div className="list-item">
            <span className="list-item-title">Вивчено (впевнено)</span>
            <span style={{ fontWeight: 600, color: 'var(--success)' }}>{learnedCards}</span>
          </div>
          <div className="list-item">
            <span className="list-item-title">Важкі питання</span>
            <span style={{ fontWeight: 600, color: 'var(--danger)' }}>{hardCards}</span>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: 14, textAlign: 'center', marginTop: 10 }}>
          Питання регулярно додаватимуться до Daily Review на основі алгоритму інтервального повторення.
        </p>
      </div>
    </div>
  );
};
