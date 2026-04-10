import React, { useState, useEffect, useRef } from 'react';

const CURRENT_VERSION_KEY = 'lawflash-app-version';

export const UpdatePrompt = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const regRef = useRef(null);

  useEffect(() => {
    // --- 1. Service Worker registration ---
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        regRef.current = reg;

        if (reg.waiting) {
          setShowUpdate(true);
          return;
        }

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

      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }

    // --- 2. Version check on visibility change (critical for iOS) ---
    const checkVersion = async () => {
      try {
        const res = await fetch('./version.json?_=' + Date.now(), {
          cache: 'no-store'
        });
        if (!res.ok) return;
        const data = await res.json();
        const serverVersion = data.version;
        const localVersion = localStorage.getItem(CURRENT_VERSION_KEY);

        if (!localVersion) {
          // First visit — save current version
          localStorage.setItem(CURRENT_VERSION_KEY, serverVersion);
          return;
        }

        if (localVersion !== serverVersion) {
          setShowUpdate(true);
        }
      } catch {
        // Offline or version.json not deployed yet — ignore
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        checkVersion();
        // Also try to update the SW
        if (regRef.current) regRef.current.update();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    // Initial check after a short delay (let the app render first)
    const initialTimer = setTimeout(checkVersion, 3000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      clearTimeout(initialTimer);
    };
  }, []);

  const handleUpdate = () => {
    // Update stored version
    fetch('./version.json?_=' + Date.now(), { cache: 'no-store' })
      .then(r => r.json())
      .then(data => localStorage.setItem(CURRENT_VERSION_KEY, data.version))
      .catch(() => {});

    // Tell SW to clear caches and take over
    if (regRef.current?.waiting) {
      regRef.current.waiting.postMessage('skipWaiting');
    } else if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage('clearCaches');
      // Force reload after cache clear
      setTimeout(() => window.location.reload(), 300);
    } else {
      window.location.reload();
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
