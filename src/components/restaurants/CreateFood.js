import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/restaurant/menu.css'

const CreateFood = () => {
  const { id: restaurantId } = useParams();
  const [formData, setFormData] = useState({
    Ten: '',
    MoTa: '',
    Gia: '',
    CoSan: true,
    GhiChu: '',
    NgayTao: new Date().toISOString().split('T')[0],
    NgayCapNhat: new Date().toISOString().split('T')[0],
    Anh: '',
    Loai: 'starters',
    restaurantId: restaurantId
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.Anh;

      if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          imageUrl = reader.result;
          await axios.post('http://localhost:3001/thucdon', {
            ...formData,
            restaurantId: restaurantId,
            Gia: parseFloat(formData.Gia),
            Ma_ThucDon: Date.now(),
            Anh: imageUrl
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
            Loai: 'starters',
            restaurantId: restaurantId
          });
          setImageFile(null);
          setPreview(null);
        };
        reader.readAsDataURL(imageFile);
      } else {
        await axios.post('http://localhost:3001/thucdon', {
          ...formData,
          Gia: parseFloat(formData.Gia),
          Ma_ThucDon: Date.now(),
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
          Loai: 'starters',
          restaurantId: restaurantId
        });
        setImageFile(null);
        setPreview(null);
      }
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="preview" style={{ width: 120, margin: 8 }} />}
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