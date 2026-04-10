import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 7,
        backgroundColor: copied ? 'var(--success)' : 'var(--bg-color)',
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background-color 0.2s ease'
      }}
    >
      {copied
        ? <Check size={14} color="#fff" />
        : <Copy size={14} color="var(--text-secondary)" />
      }
    </button>
  );
};

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>
            {item.sourceSection}
          </h3>
          <CopyButton text={item.question} />
        </div>
        <p style={{ fontSize: '20px', fontWeight: 500, lineHeight: 1.4, flex: 1 }}>
          {item.question}
        </p>
      </div>

      <div style={{ flex: 1, borderTop: '2px solid var(--border)', paddingTop: '20px', overflowY: 'auto' }}>
        {revealed ? (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div style={{ flex: 1 }}>
                {item.answerShort === item.answerFull ? (
                  <p style={{ fontWeight: 600, color: 'var(--success)', fontSize: '16px', lineHeight: 1.5 }}>{item.answerFull}</p>
                ) : (
                  <>
                    <p style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--success)' }}>{item.answerShort}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{item.answerFull}</p>
                  </>
                )}
              </div>
              <CopyButton text={item.answerFull} />
            </div>
            {item.lawRef && (
              <div style={{
                marginTop: '16px',
                padding: '8px 12px',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--primary-color)',
                display: 'inline-block'
              }}>
                {item.lawRef}
              </div>
            )}
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
    </motion.div>
  );
};
