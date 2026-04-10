import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const UpdatePrompt = () => {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      // Check for updates every 30 minutes
      if (r) {
        setInterval(() => r.update(), 30 * 60 * 1000);
      }
    }
  });

  if (!needRefresh) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: 16,
      right: 16,
      zIndex: 9999,
      backgroundColor: 'var(--panel-color)',
      borderRadius: 16,
      padding: '16px 20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      animation: 'slideUp 0.3s ease'
    }}>
      <span style={{ fontSize: 15, fontWeight: 500 }}>
        Доступна нова версія
      </span>
      <button
        onClick={() => updateServiceWorker(true)}
        style={{
          backgroundColor: 'var(--accent)',
          color: '#fff',
          padding: '8px 20px',
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 600,
          whiteSpace: 'nowrap'
        }}
      >
        Оновити
      </button>
    </div>
  );
};
