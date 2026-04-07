import React from 'react';
import { BookOpen, Calendar, Settings as SettingsIcon, BarChart3 } from 'lucide-react';
import { useAppContext } from '../store';

export const Home = ({ navigate }) => {
  const { cards } = useAppContext();
  
  return (
    <div className="screen">
      <div className="nav-bar">
        <span className="nav-title">LawFlash UA</span>
      </div>
      
      <div className="content-scroll" style={{ display: 'flex', flexDirection: 'column', padding: '24px 20px', gap: '20px', justifyContent: 'center' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ marginBottom: '8px' }}>Головна</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Загалом у базі: {cards.length} питань</p>
        </div>

        <button className="btn-primary" onClick={() => navigate('DailyReview')}>
          <Calendar size={20} /> Daily Review
        </button>

        <button className="btn-secondary" onClick={() => navigate('Topics')}>
          <BookOpen size={20} /> Теми
        </button>

        <button className="btn-secondary" onClick={() => navigate('Stats')}>
          <BarChart3 size={20} /> Статистика
        </button>

        <button className="btn-secondary" onClick={() => navigate('Settings')}>
          <SettingsIcon size={20} /> Налаштування
        </button>

      </div>
    </div>
  );
};
