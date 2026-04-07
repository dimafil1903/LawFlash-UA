import React from 'react';
import { ChevronLeft, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../store';

export const Settings = ({ navigate }) => {
  const { resetAll, resetTopic } = useAppContext();

  const handleReset = () => {
    if (window.confirm("Чи дійсно ви хочете скинути весь прогрес? Це незворотна дія.")) {
      resetAll();
      alert("Прогрес скинуто.");
    }
  };

  return (
    <div className="screen">
      <div className="nav-bar">
        <div className="nav-left">
          <button onClick={() => navigate('Home')} style={{display: 'flex', alignItems: 'center'}}>
            <ChevronLeft size={24} /> <span style={{marginLeft: 4}}>Назад</span>
          </button>
        </div>
        <span className="nav-title">Налаштування</span>
      </div>
      
      <div className="content-scroll">
        <h2 style={{ marginBottom: 16 }}>Скидання прогресу</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 15 }}>
          Ці дії видалять вашу історію повторень та статистику. Вони незворотні.
        </p>

        <button className="btn-secondary" style={{ color: 'var(--danger)', justifyContent: 'flex-start' }} onClick={handleReset}>
          <AlertTriangle size={20} /> Повний reset усього навчання
        </button>
      </div>
    </div>
  );
};
