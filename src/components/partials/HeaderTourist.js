import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderTourist = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header style={{
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        
        height: 88,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat, Raleway, Arial, sans-serif',
        
        padding: '0 40px',
      }}>
        {/* Nút vuông quay lại góc trái */}
        <div style={{
          position: 'absolute',
          left: 32,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          cursor: 'pointer',
          width: 44,
          height: 44,
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 8px #0003',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
          border: 'none',
        }}
        onClick={() => navigate("/")}
        title="Quay lại trang BookingWeb"
        onMouseOver={e=>e.currentTarget.style.background='#1ccfc9'}
        onMouseOut={e=>e.currentTarget.style.background='#fff'}
        >
          {/* Icon hình vuông với mũi tên quay lại */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="#1ccfc9" strokeWidth="2"/>
            <polyline points="13,8 9,12 13,16" fill="none" stroke="#1ccfc9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <nav style={{
          width: '100%',
          maxWidth: 1600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 88,
          position: 'relative',
        }}>
          {/* XÓA menu trái và phải, chỉ giữ logo giữa */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', minWidth: 220, margin: '0 48px' }}>
            {/* SVG Mountain Logo */}
            <svg width="90" height="48" viewBox="0 0 90 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginBottom: 2}}>
              <polyline points="2,46 24,16 38,36 54,6 70,36 88,12" stroke="#fff" strokeWidth="5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: 'Montserrat, Raleway, Arial, sans-serif', fontSize: 38, color: '#fff', fontWeight: 700, letterSpacing: 1, textShadow: '0 2px 8px #0007', lineHeight: '40px' }}>
              GLoBal X
            </span>
          </div>
        </nav>
      </header>
      {/* Hero section ngay dưới header */}
      <div style={{
        position: 'relative',
        left: 0,
        width: '100vw',
        minHeight: 520,
        background: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80') center center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
        boxSizing: 'border-box',
      }}>
        {/* Lớp phủ mờ */}
        <div style={{
          background: 'rgba(0,0,0,0.35)',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2
        }} />
        <div style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1500,
          marginTop: 120,
          marginBottom: 60,
          minHeight: 500,
          justifyContent: 'center',
        }}>
          <h1 style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: 72,
            fontWeight: 700,
            margin: 0,
            textShadow: '0 4px 24px #000a',
            letterSpacing: 1,
            lineHeight: 1
          }}>
            Khám phá kỳ nghỉ tiếp theo của bạn
          </h1>
          <h2 style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: 64,
            fontWeight: 700,
            margin: '12px 0 32px 0',
            textShadow: '0 4px 24px #000a',
            letterSpacing: 1,
            lineHeight: 1.1
          }}>
             Các gói du lịch hấp dẫn !
          </h2>
          <button style={{
            background: '#1ccfc9',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 22,
            fontWeight: 700,
            padding: '18px 48px',
            letterSpacing: 1,
            textTransform: 'uppercase',
            boxShadow: '0 4px 24px #0004',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
            outline: 'none',
            marginTop: '2cm',
          }}
          onMouseOver={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.color='#1ccfc9';}}
          onMouseOut={e=>{e.currentTarget.style.background='#1ccfc9';e.currentTarget.style.color='#fff';}}
          onClick={() => {
            const contactSection = document.getElementById('contact-now-section');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
          }}
          >
            XEM ĐIỂM ĐẾN
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderTourist;