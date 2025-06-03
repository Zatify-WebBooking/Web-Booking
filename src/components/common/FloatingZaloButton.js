import React from 'react';

const FloatingZaloButton = () => (
  <a
    href="https://zalo.me/0909944879"
    target="_blank"
    rel="noopener noreferrer"
    className="floating-btn zalo-btn"
    style={{
      position: 'fixed',
      bottom: 110,
      right: 32,
      zIndex: 9999,
      background: 'rgba(33,150,243,0.95)',
      borderRadius: '50%',
      width: 64,
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 24px #2196f355, 0 1.5px 8px #2196f399',
      cursor: 'pointer',
      transition: 'background 0.2s, box-shadow 0.2s',
      border: '6px solid rgba(33,150,243,0.18)',
      animation: 'zalo-pulse 1.5s infinite',
    }}
    aria-label="Chat Zalo"
  >
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" style={{ width: 34, height: 34, filter: 'drop-shadow(0 1px 2px #0003)' }} />
    <style>{`
      @keyframes zalo-pulse {
        0% { box-shadow: 0 0 0 0 rgba(33,150,243,0.18); }
        70% { box-shadow: 0 0 0 16px rgba(33,150,243,0.08); }
        100% { box-shadow: 0 0 0 0 rgba(33,150,243,0.18); }
      }
      .floating-btn.zalo-btn:hover {
        background: #1976d2 !important;
        box-shadow: 0 6px 32px #1976d255, 0 2px 12px #1976d299;
      }
    `}</style>
  </a>
);

export default FloatingZaloButton;

// Không cần export hoặc render nút điện thoại ở đây
