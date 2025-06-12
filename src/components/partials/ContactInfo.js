import React from "react";
import HeaderBooking from './HeaderBooking';
import FooterBooking from './FooterBooking';

const ContactInfo = () => {
  return (
    <>
      <HeaderBooking />
      <div style={{ minHeight: 400, display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', background: '#f0f2f5', padding: 32, gap: 32 }}>
        {/* Zalo section */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 16px #0001',
          padding: 32,
          minWidth: 320,
          maxWidth: 360,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 0,
          flex: 1,
          minHeight: 540
        }}>
          <img src="/images/contactinfo/chitrang.jpg" alt="avatar" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '3px solid #e0e0e0' }} />
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 2 }}>Nguyễn Thị Thùy Trang</div>
          <div style={{ color: '#888', fontSize: 16, marginBottom: 16 }}>Zalo</div>
          <a href="https://zalo.me/0909944879" target="_blank" rel="noopener noreferrer" style={{ background: '#0068ff', color: '#fff', borderRadius: 8, padding: '10px 32px', fontWeight: 700, fontSize: 18, textDecoration: 'none', marginBottom: 18, display: 'inline-block' }}>Nhắn tin Zalo</a>
          <img src="https://qr-talk.zdn.vn/11/648513344/c8b04936f4751d2b4464.jpg" alt="QR Zalo" style={{ width: 140, height: 140, borderRadius: 12, marginBottom: 8, background: '#fff' }} />
          <div style={{ color: '#888', fontSize: 14, textAlign: 'center', maxWidth: 180 }}>Mở Zalo, bấm quét QR để quét và xem trên điện thoại</div>
        </div>
        {/* Facebook section */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 16px #0001',
          padding: 32,
          minWidth: 320,
          maxWidth: 360,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 0,
          flex: 1,
          minHeight: 540
        }}>
          <img src="/images/contactinfo/chitrang.jpg" alt="avatar facebook" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '3px solid #e0e0e0' }} />
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 2 }}>Nguyễn Thị Thùy Trang</div>
          <div style={{ color: '#888', fontSize: 16, marginBottom: 16 }}>Facebook</div>
          <a href="https://www.facebook.com/messages/t/100008836242318" target="_blank" rel="noopener noreferrer" style={{ background: '#1877f3', color: '#fff', borderRadius: 8, padding: '10px 32px', fontWeight: 700, fontSize: 18, textDecoration: 'none', marginBottom: 18, display: 'inline-block', textAlign: 'center' }}>Nhắn tin Facebook</a>
          <img src="https://qci.qr-code.click/uploads/qr_codes/684035d9ac6f3.svg?1749038581" alt="QR Facebook" style={{ width: 140, height: 140, borderRadius: 12, marginBottom: 8, background: '#fff', objectFit: 'cover' }} />
          <div style={{ color: '#888', fontSize: 14, textAlign: 'center', maxWidth: 180 }}>Mở Facebook, bấm quét QR để truy cập nhanh trang cá nhân</div>
        </div>
        {/* Phone section */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 16px #0001',
          padding: 32,
          minWidth: 320,
          maxWidth: 360,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 0,
          flex: 1,
          minHeight: 540
        }}>
          <img src="https://cdn-icons-png.flaticon.com/512/597/597177.png" alt="phone icon" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '3px solid #e0e0e0', background: '#e6f0ff', padding: 10 }} />
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Số điện thoại</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#0068ff', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
            <i className="fas fa-phone-alt" style={{ color: '#0068ff' }}></i>
            090 9944 879
          </div>
          <div style={{ color: '#444', fontSize: 16, textAlign: 'center', maxWidth: 220 }}>Liên hệ trực tiếp qua số điện thoại để được hỗ trợ nhanh nhất!</div>
        </div>        
        {/* Phone card image section */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 16px #0001',
          padding: 0,
          minWidth: 320,
          maxWidth: 360,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'stretch',
          marginBottom: 0,
          flex: 1,
          minHeight: 540,
          overflow: 'hidden'
        }}>
          <img src="/images/contactinfo/phonecard.jpg" alt="phone card" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', margin: 0, padding: 0, border: 'none', borderRadius: 0 }} />
          <a href="/images/contactinfo/phonecard.jpg" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div style={{
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 18,
              color: '#0068ff',
              background: '#fff',
              padding: '12px 0',
              cursor: 'pointer',
              borderRadius: 8,
              border: '2px solid #0068ff',
              margin: '18px 24px 0 24px',
              boxShadow: '0 2px 8px #e0e0e0',
              transition: 'background 0.2s, color 0.2s'
            }}>Ấn để xem</div>
          </a>
        </div>
      </div>   
      <FooterBooking />
    </>
  );
};

export default ContactInfo;
