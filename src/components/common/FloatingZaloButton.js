import React from 'react';

const FloatingZaloButton = () => (
  <>
    {/* Facebook Floating Button */}
    <a
      href="https://www.facebook.com/trang.nguyen.915559"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-btn facebook-btn"
      style={{
        position: 'fixed',
        bottom: 156,
        right: 32,
        zIndex: 9999,
        background: '#1877f3',
        borderRadius: '50%',
        width: 64,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 24px #1877f355, 0 1.5px 8px #1877f399',
        cursor: 'pointer',
        transition: 'background 0.2s, box-shadow 0.2s',
        border: '6px solid rgba(24,119,243,0.18)',
        animation: 'fb-pulse 1.5s infinite',
      }}
      aria-label="Facebook Messenger"
    >
      <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#1877f3"/>
        <path d="M21.5 16.01h-3.08v8.24h-3.38v-8.24h-1.69v-2.89h1.69v-1.84c0-2.23 1.06-3.38 3.38-3.38h2.53v2.89h-1.69c-0.63 0-0.84 0.3-0.84 0.84v1.49h2.53l-0.42 2.89z" fill="#fff"/>
      </svg>
      <style>{`
        @keyframes zalo-pulse {
          0% { box-shadow: 0 0 0 0 rgba(33,150,243,0.18); }
          70% { box-shadow: 0 0 0 16px rgba(33,150,243,0.08); }
          100% { box-shadow: 0 0 0 0 rgba(33,150,243,0.18); }
        }
        @keyframes fb-pulse {
          0% { box-shadow: 0 0 0 0 rgba(24,119,243,0.18); }
          70% { box-shadow: 0 0 0 16px rgba(24,119,243,0.08); }
          100% { box-shadow: 0 0 0 0 rgba(24,119,243,0.18); }
        }
        .floating-btn.zalo-btn:hover {
          background: #1976d2 !important;
          box-shadow: 0 6px 32px #1976d255, 0 2px 12px #1976d299;
        }
        .floating-btn.facebook-btn:hover {
          background: #1453a1 !important;
        }
      `}</style>
    </a>
    {/* Zalo Floating Button */}
    <a
      href="https://zalo.me/0909944879"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-btn zalo-btn"
      style={{
        position: 'fixed',
        bottom: 82,
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
    </a>
  </>
);

export default FloatingZaloButton;

// Không cần export hoặc render nút điện thoại ở đây
