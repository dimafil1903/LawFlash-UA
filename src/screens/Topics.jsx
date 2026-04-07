import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../store';

const TOPIC_NAMES = {
  constitution: "Конституція України",
  police: "Закон про Саціонально поліцію",
  corruption: "Запобігання корупції"
};

export const Topics = ({ navigate }) => {
  const { cards } = useAppContext();
  
  const counts = cards.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="screen">
      <div className="nav-bar">
        <div className="nav-left">
          <button onClick={() => navigate('Home')} style={{display: 'flex', alignItems: 'center'}}>
            <ChevronLeft size={24} /> <span style={{marginLeft: 4}}>Назад</span>
          </button>
        </div>
        <span className="nav-title">Теми</span>
      </div>
      
      <div className="content-scroll">
        <div className="list">
          {Object.entries(counts).map(([topic, count]) => (
            <div key={topic} className="list-item" onClick={() => navigate('Session', { topic })} style={{ cursor: 'pointer' }}>
              <div className="list-item-title">
                <div>
                  <div style={{fontWeight: 600, fontSize: 17}}>{TOPIC_NAMES[topic] || topic}</div>
                  <div style={{fontSize: 14, color: 'var(--text-secondary)', marginTop: 2}}>Питань: {count}</div>
                </div>
              </div>
              <ChevronRight size={20} color="var(--text-secondary)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
