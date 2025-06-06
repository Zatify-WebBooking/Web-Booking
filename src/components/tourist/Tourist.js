import React from "react";
import { useNavigate } from "react-router-dom";
import touristData from '../../json/restaurant.json';
import "../../styles/bookingweb/booking.css";
import HeaderTourist from '../partials/HeaderTourist';
import FooterBooking from "../partials/FooterBooking";

const Tourist = () => {
  // Lấy danh sách tourist từ file json
  const touristList = (touristData.tourist || []);
  const navigate = useNavigate();

  return (
    <div className="tourist-hero" style={{
      minHeight: '100vh',
      background: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative',
      paddingTop: 0
    }}>
      <HeaderTourist />
      <section id="popular-packages-section" style={{ background: '#fafbfc', width: '100%', padding: '64px 0 80px 0', marginTop: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ color: '#1ccfc9', fontFamily: 'Pacifico, cursive', fontSize: 28, marginBottom: 8 }}>
              Lựa chọn tốt nhất
            </div>
            <h2 style={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 800, fontSize: 48, margin: 0, marginBottom: 18 }}>
              Gói du lịch nổi bật
            </h2>
            <p style={{ fontFamily: 'Raleway, Arial, sans-serif', fontSize: 18, color: '#444', maxWidth: 700, margin: '0 auto' }}>
              Hành trình hoàn hảo bắt đầu từ đây. Khám phá những điểm đến tuyệt vời với các gói du lịch được yêu thích nhất của chúng tôi. Từ những bãi biển tuyệt đẹp đến những thành phố sôi động, chúng tôi mang đến cho bạn những trải nghiệm không thể quên.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            {touristList.map((tour, idx) => (
              <div key={tour.id || idx} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px #0001', width: 370, minHeight: 520, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
                <div style={{ width: '100%', height: 240, background: '#1976d2', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <img src={tour.image} alt={tour.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                  <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', }}></div>
                  <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', color: '#fff', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 700 }}>

                  </div>

                </div>
                <div style={{ padding: '32px 24px 24px 24px', width: '100%', textAlign: 'center' }}>
                  <div style={{ color: '#1ccfc9', fontWeight: 600, fontSize: 16, marginBottom: 8, fontFamily: 'Montserrat, Arial, sans-serif' }}>{tour.address || ''}</div>
                  <div style={{ borderBottom: '2px solid #1ccfc9', width: 60, margin: '0 auto 18px auto' }}></div>
                  <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 18, fontFamily: 'Raleway, Arial, sans-serif' }}>{tour.description || ''}</div>
                  <div style={{ fontSize: 32, letterSpacing: 1, marginBottom: 8, minHeight: '16vh'}}>{tour.name}</div>
                  <button
                    style={{ border: '1.5px solid #1ccfc9', color: '#1ccfc9', background: 'none', borderRadius: 6, fontSize: 18, padding: '8px 32px', fontWeight: 600, cursor: 'pointer', marginTop: 8, transition: 'background 0.2s, color 0.2s' }}
                    onMouseOver={e => { e.currentTarget.style.background = '#1ccfc9'; e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#1ccfc9'; }}
                    onClick={() => navigate(`/tourist/${tour.id}`)}
                  >
                    Xem thêm
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Hero section dưới 3 card */}
      <div id="contact-now-section" style={{
        minHeight: 500,
        background: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 0,
      }}>
        <div style={{
          background: 'rgba(0,0,0,0.35)',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }} />
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1200,
          justifyContent: 'center',
        }}>
          <h1 style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: 48,
            fontWeight: 800,
            margin: 0,
            textShadow: '0 4px 24px #000a',
            letterSpacing: 1,
            lineHeight: 1.1
          }}>
            Chọn điểm đến của bạn
          </h1>
          <p style={{
            fontFamily: 'Raleway, Arial, sans-serif',
            fontSize: 18,
            fontWeight: 400,
            margin: '24px 0 32px 0',
            textShadow: '0 2px 8px #0007',
            maxWidth: 900,
            lineHeight: 1.5
          }}>
            Khám phá, trải nghiệm và tận hưởng những chuyến đi tuyệt vời cùng chúng tôi.<br />
            Đặt tour ngay hôm nay để nhận nhiều ưu đãi hấp dẫn!
          </p>
          <button
            style={{
              background: '#1ccfc9',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 600,
              padding: '14px 48px',
              letterSpacing: 1,
              textTransform: 'uppercase',
              boxShadow: '0 4px 24px #0004',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              outline: 'none',
              marginTop: 24,
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#1ccfc9'; }}
            onMouseOut={e => { e.currentTarget.style.background = '#1ccfc9'; e.currentTarget.style.color = '#fff'; }}
            onClick={() => navigate('/contact-info')}
          >
            LIÊN HỆ NGAY
          </button>
        </div>
      </div>

      {/* Section: Most Popular Adventure Packages */}
      <section style={{ background: '#f8f9fa', width: '100%', padding: '64px 0 80px 0', marginTop: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ color: '#1ccfc9', fontFamily: 'Pacifico, cursive', fontSize: 28, marginBottom: 8 }}>
              Gói du lịch phổ biến 2019
            </div>
            <h2 style={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 800, fontSize: 48, margin: 0, marginBottom: 18 }}>
              Gói phiêu lưu nổi bật
            </h2>
            <p style={{ fontFamily: 'Raleway, Arial, sans-serif', fontSize: 18, color: '#444', maxWidth: 700, margin: '0 auto' }}>
              Khám phá thế giới – Đặt chuyến đi mơ ước chỉ trong vài phút
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
            {touristList.map((tour, idx) => (
              <div key={tour.id || idx} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px #0001', width: 370, minHeight: 320, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: 32 }}>
                <img src={tour.image} alt={tour.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                <div style={{ padding: '24px 20px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, fontFamily: 'Montserrat, Arial, sans-serif' }}>{tour.name}</div>
                    <div style={{ fontSize: 14, color: '#888', marginBottom: 12 }}><span style={{ marginRight: 4 }}>●</span>{tour.labels && tour.labels.join(', ')}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                    <div style={{ color: '#1ccfc9', fontWeight: 700, fontSize: 18 }}>{tour.price ? `$${tour.price}` : ''}</div>
                    <button style={{ border: '1.5px solid #1ccfc9', color: '#1ccfc9', background: 'none', borderRadius: 6, fontSize: 16, padding: '6px 24px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s, color 0.2s' }} onMouseOver={e => { e.currentTarget.style.background = '#1ccfc9'; e.currentTarget.style.color = '#fff'; }} onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#1ccfc9'; }} onClick={() => navigate(`/tourist/${tour.id}`)}>
                      Đặt ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FooterBooking />
    </div>
  );
};

export default Tourist;
