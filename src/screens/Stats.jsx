import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAppContext } from '../store';

const CATEGORY_LABELS = {
  constitution: 'Конституція',
  police: 'Поліція',
  corruption: 'Корупція'
};

const FILTERS = [
  { key: 'all', label: 'Всі' },
  { key: 'learned', label: 'Вивчені' },
  { key: 'hard', label: 'Важкі' },
  { key: 'new', label: 'Нові' }
];

export const Stats = ({ navigate }) => {
  const { cards, progress } = useAppContext();
  const [filter, setFilter] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);

  const totalCards = cards.length;
  const startedCards = Object.keys(progress).length;
  const learnedCards = Object.values(progress).filter(p => p.interval > 1).length;
  const hardCards = Object.values(progress).filter(p => p.lapses > 2).length;

  const getCardStatus = (cardId) => {
    const p = progress[cardId];
    if (!p) return 'new';
    if (p.lapses > 2) return 'hard';
    if (p.interval > 1) return 'learned';
    return 'in-progress';
  };

  const filteredCards = cards.filter(c => {
    const status = getCardStatus(c.id);
    if (filter === 'all') return progress[c.id];
    if (filter === 'learned') return status === 'learned';
    if (filter === 'hard') return status === 'hard';
    if (filter === 'new') return !progress[c.id];
    return true;
  });

  const statusIcon = (status) => {
    if (status === 'learned') return <CheckCircle size={16} color="var(--success)" />;
    if (status === 'hard') return <XCircle size={16} color="var(--danger)" />;
    if (status === 'in-progress') return <Clock size={16} color="var(--accent)" />;
    return null;
  };

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

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                backgroundColor: filter === f.key ? 'var(--accent)' : 'var(--panel-color)',
                color: filter === f.key ? '#fff' : 'var(--text-main)',
                boxShadow: filter === f.key ? 'none' : '0 1px 3px rgba(0,0,0,0.06)'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="list">
          {filteredCards.length === 0 ? (
            <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 15 }}>
              {filter === 'new' ? 'Всі питання вже розпочаті!' : 'Немає карток для цього фільтра.'}
            </div>
          ) : (
            filteredCards.map(card => {
              const p = progress[card.id];
              const status = getCardStatus(card.id);
              const isExpanded = expandedCard === card.id;

              return (
                <div key={card.id}>
                  <div
                    className="list-item"
                    onClick={() => setExpandedCard(isExpanded ? null : card.id)}
                    style={{ cursor: 'pointer', flexDirection: 'column', alignItems: 'stretch', gap: 4 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                        {statusIcon(status)}
                        <span style={{
                          fontSize: 15,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: isExpanded ? 'normal' : 'nowrap'
                        }}>
                          {card.question}
                        </span>
                      </div>
                      <ChevronRight
                        size={16}
                        color="var(--text-secondary)"
                        style={{
                          flexShrink: 0,
                          marginLeft: 8,
                          transform: isExpanded ? 'rotate(90deg)' : 'none',
                          transition: 'transform 0.2s ease'
                        }}
                      />
                    </div>

                    {isExpanded && (
                      <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                        <p style={{ fontSize: 14, color: 'var(--success)', fontWeight: 600, marginBottom: 4 }}>
                          {card.answerShort}
                        </p>
                        {card.answerShort !== card.answerFull && (
                          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>
                            {card.answerFull}
                          </p>
                        )}
                        <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: 6,
                            backgroundColor: 'var(--bg-color)',
                            fontSize: 12
                          }}>
                            {CATEGORY_LABELS[card.category] || card.category}
                          </span>
                          {p && (
                            <>
                              <span>Правильно: {p.rightCount}</span>
                              <span>Помилки: {p.wrongCount}</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <button
          onClick={() => navigate('Algorithm')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            padding: '14px 20px',
            marginTop: 8,
            marginBottom: 20,
            fontSize: 15,
            fontWeight: 600,
            color: 'var(--accent)',
            backgroundColor: 'var(--panel-color)',
            borderRadius: 12,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}
        >
          Як працює алгоритм навчання?
        </button>
      </div>
    </div>
  );
};
