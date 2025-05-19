import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/menu.css';
import { useNavigate } from 'react-router-dom';

const Food = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  // Hàm load món ăn
  const fetchFoods = async () => {
    try {
      const response = await axios.get('http://localhost:3001/thucdon');
      setFoods(response.data);
    } catch (error) {
      console.error('Lỗi load món ăn:', error);
    }
  };

  // Gọi khi component mount
  useEffect(() => {
    fetchFoods();
  }, []);

  // Hàm xoá món ăn
  const handleDelete = async (maThucDon) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa món ăn này không?');
    if (!confirmDelete) return;

    try {
      // Tìm món ăn có Ma_ThucDon tương ứng để lấy id backend
      const itemToDelete = foods.find(food => food.Ma_ThucDon === maThucDon);

      if (!itemToDelete) {
        alert('Không tìm thấy món ăn để xóa.');
        return;
      }

      await axios.delete(`http://localhost:3001/thucdon/${itemToDelete.id}`);

      // Cập nhật lại danh sách món ăn trong state
      setFoods(prevFoods => prevFoods.filter(food => food.Ma_ThucDon !== maThucDon));
    } catch (error) {
      console.error('Lỗi khi xóa món ăn:', error);
    }
  };

  // Hàm chỉnh sửa món ăn (tạm thời hiển thị alert)
  const handleEdit = (id) => {
    alert(`Chỉnh sửa món ăn ID: ${id}`);
    navigate(`/editfood/${id}`);    // TODO: điều hướng đến trang chỉnh sửa hoặc mở modal
  };

  return (
    <div className="food-container">
      <h2>Menu management</h2>
      <table className="food-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Loại</th>
            <th>Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {foods.map(food => (
            <tr key={food.Ma_ThucDon}>
              <td>{food.Ma_ThucDon}</td>
              <td>{food.Ten}</td>
              <td>{food.MoTa}</td>
              <td>{food.Gia}$</td>
              <td>{food.Loai}</td>
              <td>
                <img src={food.Anh} alt={food.Ten} className="food-image" />
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(food.Ma_ThucDon)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(food.Ma_ThucDon)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Food;
