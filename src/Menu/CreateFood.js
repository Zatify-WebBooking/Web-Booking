import React, { useState } from 'react';
import axios from 'axios';

const CreateFood = () => {
  const [formData, setFormData] = useState({
    Ten: '',
    MoTa: '',
    Gia: '',
    CoSan: true,
    GhiChu: '',
    NgayTao: new Date().toISOString().split('T')[0],
    NgayCapNhat: new Date().toISOString().split('T')[0],
    Anh: '',
    Loai: 'starters'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/thucdon', {
        ...formData,
        Gia: parseFloat(formData.Gia),
        Ma_ThucDon: Date.now()
      });
      alert('Tạo món ăn thành công!');
      setFormData({
        Ten: '',
        MoTa: '',
        Gia: '',
        CoSan: true,
        GhiChu: '',
        NgayTao: new Date().toISOString().split('T')[0],
        NgayCapNhat: new Date().toISOString().split('T')[0],
        Anh: '',
        Loai: 'our-starters'
      });
    } catch (error) {
      console.error('Lỗi khi tạo món ăn:', error);
      alert('Tạo món ăn thất bại!');
    }
  };

  return (
    <div className="create-food-container">
      <h2>Create A Food</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Ten" placeholder="Tên món" value={formData.Ten} onChange={handleChange} required />
        <textarea name="MoTa" placeholder="Mô tả" value={formData.MoTa} onChange={handleChange} required />
        <input type="number" name="Gia" placeholder="Giá" value={formData.Gia} onChange={handleChange} required />
        <input type="text" name="Anh" placeholder="URL ảnh" value={formData.Anh} onChange={handleChange} required />
        <select name="Loai" value={formData.Loai} onChange={handleChange}>
          <option value="starters">Starters</option>
          <option value="main-meals">Main Meals</option>
            <option value="desserts">Desserts</option>
        </select>
        <label>
          <input type="checkbox" name="CoSan" checked={formData.CoSan} onChange={handleChange} />
          Có sẵn
        </label>
        <textarea name="GhiChu" placeholder="Ghi chú" value={formData.GhiChu} onChange={handleChange} />
        <button type="submit">Tạo món</button>
      </form>
    </div>
  );
};

export default CreateFood;
