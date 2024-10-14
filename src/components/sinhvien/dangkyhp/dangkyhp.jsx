import React, { useState, useEffect } from 'react';
import './dangkyhp.css';
import Navbar from '../navbar/navbar';

const Dangkyhp = () => {
  const defaultSinhVien = {
    HoTen: 'Trần Huỳnh Bảo Ngọc',
    Avatar: require('../../../img/avatar_default.jpg'), // Ensure this path is correct
  };

  const [sinhVien, setSinhVien] = useState(defaultSinhVien); // Default student info

  useEffect(() => {
    const storedSinhVien = JSON.parse(localStorage.getItem('sinhVien'));
    if (storedSinhVien) {
      setSinhVien(storedSinhVien);
    }
  }, []);

  return (
    <div>
      <Navbar sinhVien={sinhVien} />
      <div className="dkhpwrapper">
        <div className="dkhpmt-8 flex justify-center">
          <button className="dkhpbg-white text-button p-2 border border-gray-300 rounded-full button-spacing">
            CHỌN HỌC KỲ
          </button>
          <button className="dkhpbg-white text-button p-2 border border-gray-300 rounded-full button-spacing ml-4">
            CHỌN MÔN HỌC
          </button>
        </div>

        <div className="dkhpcourse-list-wrapper">
          <h2 className="dkhptext-xl text-center text-button">LỊCH HỌC</h2>

          <div className="dkhpschedule-cards mt-8 flex flex-col items-center">
            {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5'].map((day, index) => (
              <div className="dkhpschedule-card" key={index}>
                <h3>{day}</h3>
                <p>Hệ quản trị cơ sở dữ liệu</p>
                <p>Tiết 1 - 4 (7:00 - 10:35)</p>
                <p>Phòng G305</p>
                <p>Giảng viên: Nguyễn Lương Anh Tuấn</p>
                <button className="dkhpregister-button">ĐĂNG KÝ</button>
              </div>
            ))}
          </div>

          <div className="dkhpmt-4 flex justify-center mt-6">
            <button className="dkhpgradient-button text-white p-2 border border-gray-300 rounded-full"
              onClick={() => window.location.href = '/lichsuhp'}>
              XEM LỊCH SỬ ĐĂNG KÝ HỌC PHẦN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dangkyhp;
