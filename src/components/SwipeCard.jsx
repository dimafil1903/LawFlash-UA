import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export const SwipeCard = ({ item, onSwipe }) => {
  const [revealed, setRevealed] = useState(false);
  const x = useMotionValue(0);
  const rot = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 20, 
        bottom: 20, 
        left: 20, 
        right: 20,
        backgroundColor: 'var(--panel-color)',
        borderRadius: 'var(--card-radius)',
        boxShadow: 'var(--shadow)',
        x,
        rotate: rot,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        touchAction: 'none'
      }}
      drag={revealed ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onClick={() => setRevealed(true)}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '15px', fontWeight: 600, textTransform: 'uppercase' }}>
          {item.sourceSection}
        </h3>
        <p style={{ fontSize: '20px', fontWeight: 500, lineHeight: 1.4, flex: 1 }}>
          {item.question}
        </p>
      </div>

      <div style={{ flex: 1, borderTop: '2px solid var(--border)', paddingTop: '20px', overflowY: 'auto' }}>
        {revealed ? (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <p style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--success)' }}>{item.answerShort}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{item.answerFull}</p>
            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span style={{ fontSize: '14px' }}>← Повторити</span>
              <span style={{ fontSize: '14px' }}>Знав →</span>
            </div>
          </div>
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justify: 'center' }}>
            <p style={{ width: '100%', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '17px' }}>Натисніть щоб відкрити відповідь</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </motion.div>
  );
};
