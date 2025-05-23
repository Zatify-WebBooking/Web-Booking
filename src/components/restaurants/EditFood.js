import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/restaurant/menu.css';

const EditFood = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: null,
        Ten: '',
        MoTa: '',
        Gia: '',
        CoSan: true,
        GhiChu: '',
        NgayTao: '',
        NgayCapNhat: '',
        Anh: '',
        Loai: 'starters'
    });

    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/thucdon?Ma_ThucDon=${id}`);
                const data = response.data;

                if (data.length > 0) {
                    setFormData(data[0]);
                    setPreview(data[0].Anh); // Hiển thị ảnh cũ
                } else {
                    console.log("Không tìm thấy món ăn");
                }
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu món ăn:', error);
                setLoading(false);
            }
        };

        fetchFood();
    }, [id]);

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
            setPreview(formData.Anh);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = formData.Anh;
            if (imageFile) {
                // Chuyển file thành base64
                const reader = new FileReader();
                reader.onloadend = async () => {
                    imageUrl = reader.result;
                    const updatedData = {
                        ...formData,
                        Gia: parseFloat(formData.Gia),
                        NgayCapNhat: new Date().toISOString().split('T')[0],
                        Anh: imageUrl
                    };
                    await axios.put(`http://localhost:3001/thucdon/${formData.id}`, updatedData);
                    alert('Cập nhật món ăn thành công!');
                    navigate('/food');
                };
                reader.readAsDataURL(imageFile);
            } else {
                const updatedData = {
                    ...formData,
                    Gia: parseFloat(formData.Gia),
                    NgayCapNhat: new Date().toISOString().split('T')[0],
                    Anh: imageUrl
                };
                await axios.put(`http://localhost:3001/thucdon/${formData.id}`, updatedData);
                alert('Cập nhật món ăn thành công!');
                navigate(`/food/${formData.restaurantId}`);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật món ăn:', error);
            alert('Cập nhật thất bại!');
        }
    };

    if (loading) return <div>Đang tải dữ liệu món ăn...</div>;

    return (
        <div className="edit-food-container">
            <h2>Chỉnh sửa món ăn</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Ten"
                    placeholder="Tên món"
                    value={formData.Ten}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="MoTa"
                    placeholder="Mô tả"
                    value={formData.MoTa}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="Gia"
                    placeholder="Giá"
                    value={formData.Gia}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {preview && (
                    <img src={preview} alt="preview" style={{ width: 120, margin: 8 }} />
                )}
                <select name="Loai" value={formData.Loai} onChange={handleChange}>
                    <option value="starters">Starters</option>
                    <option value="main-meals">Main Meals</option>
                    <option value="desserts">Desserts</option>
                </select>
                <label>
                    <input
                        type="checkbox"
                        name="CoSan"
                        checked={formData.CoSan}
                        onChange={handleChange}
                    />
                    Có sẵn
                </label>
                <textarea
                    name="GhiChu"
                    placeholder="Ghi chú"
                    value={formData.GhiChu}
                    onChange={handleChange}
                />
                <button type="submit">Cập nhật</button>
            </form>
        </div>
    );
};

export default EditFood;