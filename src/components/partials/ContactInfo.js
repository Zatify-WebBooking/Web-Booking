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
          <img src="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/423778206_3226210721016771_222709821150588848_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGkadDBBW8-s9Ztpksl7o3a3kUaylrs5p3eRRrKWuzmndnZecxQHTATasSRqZ7AxTX-64ya0esQLLwMArl4SGy7&_nc_ohc=hPzQ0UalBDEQ7kNvwFNcBOD&_nc_oc=Adnwc6r2diueM6bw-oFYXXy-uTUAgfC0IzDHLdkmmvAeH1W2A1qNULBeHy2ONy1zVpB8FvfQbm2o9s7fdqMLnd7X&_nc_zt=23&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=4gL6GgI4HGqUuk_Bc1vu8Q&oh=00_AfKIi7QjZdVMXwNlnPCcoQfSFD95zURYTzlz4hNhu5Zb-w&oe=68460A4C" alt="avatar" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '3px solid #e0e0e0' }} />
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
          <img src="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/423778206_3226210721016771_222709821150588848_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGkadDBBW8-s9Ztpksl7o3a3kUaylrs5p3eRRrKWuzmndnZecxQHTATasSRqZ7AxTX-64ya0esQLLwMArl4SGy7&_nc_ohc=hPzQ0UalBDEQ7kNvwFNcBOD&_nc_oc=Adnwc6r2diueM6bw-oFYXXy-uTUAgfC0IzDHLdkmmvAeH1W2A1qNULBeHy2ONy1zVpB8FvfQbm2o9s7fdqMLnd7X&_nc_zt=23&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=4gL6GgI4HGqUuk_Bc1vu8Q&oh=00_AfKIi7QjZdVMXwNlnPCcoQfSFD95zURYTzlz4hNhu5Zb-w&oe=68460A4C" alt="avatar facebook" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '3px solid #e0e0e0' }} />
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
      </div>
      <FooterBooking />
    </>
  );
};

export default ContactInfo;
