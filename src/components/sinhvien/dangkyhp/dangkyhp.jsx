import React, { useState, useEffect } from 'react';
import './dangkyhp.css';
import Navbar from '../navbar/navbar';

const Dangkyhp = () => {
  const defaultSinhVien = {
    HoTen: 'Trần Huỳnh Bảo Ngọc',
    Avatar: require('../../../img/avatar_default.jpg'), // Đảm bảo đường dẫn này chính xác
  };

  const [sinhVien, setSinhVien] = useState(defaultSinhVien);
  const [courses, setCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');

  useEffect(() => {
    const storedSinhVien = JSON.parse(localStorage.getItem('sinhVien'));
    if (storedSinhVien) {
      setSinhVien(storedSinhVien);
    } else {
      console.warn('Không tìm thấy dữ liệu sinh viên trong localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${selectedSemester}`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [selectedSemester]);

  const handleRegister = async (course) => {
    if (!sinhVien.id) {
      alert('Vui lòng đăng nhập để đăng ký học phần!');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại

    try {
      const response = await fetch(`http://localhost:5000/api/register/${course.MaHP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          studentId: sinhVien.id, 
          ngaydangky: currentDate // Gửi ngày đăng ký
        }),
      });

      if (response.ok) {
        alert('Đăng ký học phần thành công!');
        setCourses(courses.map(c => c.MaHP === course.MaHP ? { ...c, sisohientai: c.sisohientai + 1 } : c));
      } else {
        const errorData = await response.json();
        alert(`Đăng ký học phần thất bại: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Lỗi khi đăng ký học phần:', error);
    }
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  return (
    <div>
      <Navbar sinhVien={sinhVien} />
      <div className="dkhpwrapper">
        <div className="dkhpmt-8 flex justify-center">
          <select onChange={handleSemesterChange} className="dkhpbg-white text-button p-2 border border-gray-300 rounded-full button-spacing">
            <option value="">Chọn học kỳ</option>
            <option value="HK1">Học kỳ 1</option>
            <option value="HK2">Học kỳ 2</option>
            <option value="HK3">Học kỳ 3</option>
            <option value="HK4">Học kỳ 4</option>
            <option value="HK5">Học kỳ 5</option>
            <option value="HK6">Học kỳ 6</option>
            <option value="HK7">Học kỳ 7</option>
            <option value="HK8">Học kỳ 8</option>
          </select>
        </div>

        <div className="dkhpcourse-list-wrapper">
          <h2 className="dkhptext-xl text-center text-button">DANH SÁCH HỌC PHẦN</h2>

          <div className="dkhpschedule-cards mt-8 flex flex-col items-center">
            {selectedSemester && courses.filter(course => course.hocky === selectedSemester).map((course) => (
              <div className="dkhpschedule-card" key={course.MaHP}>
                <h3>{course.tenHP}</h3>
                <p>Giảng viên: {course.giangvien}</p>
                <p>Phòng: {course.phonghoc}</p>
                <p>Sĩ số: {course.sisohientai}/{course.siso}</p>
                <button
                  className="dkhpregister-button"
                  onClick={() => handleRegister(course)}
                >
                  ĐĂNG KÝ
                </button>
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