import React, { useState, useEffect } from 'react';

export const UpdatePrompt = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register('./sw.js').then((reg) => {
      setRegistration(reg);

      // Check for waiting worker on load
      if (reg.waiting) {
        setShowUpdate(true);
        return;
      }

      // Detect new worker installed
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setShowUpdate(true);
          }
        });
      });
    });

    // Reload when controller changes (new SW took over)
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    // Check for updates every 30 minutes
    const interval = setInterval(() => {
      if (registration) registration.update();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage('skipWaiting');
    }
  };

  if (!showUpdate) return null;

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
        onClick={handleUpdate}
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
