import React, { useState, useEffect } from 'react';
import './dangkyhp.css';
import Navbar from '../navbar/navbar'; 

const Dangkyhp = () => {
  const defaultSinhVien = {
    HoTen: 'Trần Huỳnh Bảo Ngọc',
    Avatar: require('../../../img/avatar_default.jpg'), // Đảm bảo đường dẫn này đúng
  };

  const [sinhVien, setSinhVien] = useState(defaultSinhVien); // Mặc định thông tin sinh viên

  // Nếu bạn muốn kiểm tra localStorage, bạn có thể làm như sau
  useEffect(() => {
    const storedSinhVien = JSON.parse(localStorage.getItem('sinhVien'));
    if (storedSinhVien) {
      setSinhVien(storedSinhVien);
    }
  }, []);

  return (
    <div>
      <Navbar sinhVien={sinhVien} /> {/* Truyền sinhVien vào Navbar */}
      {/* Khung bao bọc cho phần nhập dữ liệu */}
      <div className="wrapper">
        <div className="mt-8 flex justify-center">
          <button className="bg-white text-button p-2 border border-gray-300 rounded-full button-spacing">
            CHỌN HỌC KỲ
          </button>
          <button className="bg-white text-button p-2 border border-gray-300 rounded-full button-spacing">
            CHỌN MÔN HỌC
          </button>
        </div>

        <div className="course-list-wrapper">
          <h2 className="text-xl text-center text-button">LỊCH HỌC</h2>

          {/* Thêm các khung dữ liệu */}
          <div className="schedule-cards mt-8 flex flex-col items-center">
            {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5'].map((day, index) => (
              <div className="schedule-card" key={index}>
                <h3>{day}</h3>
                <p>Hệ quản trị cơ sở dữ liệu</p>
                <p>Tiết 1 - 4 (7:00 - 10:35)</p>
                <p>Phòng G305</p>
                <p>Giảng viên: Nguyễn Lương Anh Tuấn</p>
                <button className="register-button">ĐĂNG KÝ</button>
              </div>
            ))}
          </div>

          {/* Nút bấm nằm ở giữa dưới các khung */}
          <div className="mt-4 flex justify-center">
            <button className="gradient-button text-white p-2 border border-gray-300 rounded-full">
              XEM LỊCH SỬ ĐĂNG KÝ HỌC PHẦN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dangkyhp;
