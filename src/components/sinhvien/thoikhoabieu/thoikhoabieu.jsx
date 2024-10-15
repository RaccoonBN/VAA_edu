import React, { useState, useEffect } from 'react';
import './thoikhoabieu.css'; // Link đến tệp CSS
import Navbar from '../navbar/navbar';

const Thoikhoabieu = () => {
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
    const [currentWeek, setCurrentWeek] = useState(1);

    const handleLeftArrowClick = () => {
        setCurrentWeek(prevWeek => Math.max(prevWeek - 1, 1)); // Giảm tuần nhưng không nhỏ hơn 1
    };

    const handleRightArrowClick = () => {
        setCurrentWeek(prevWeek => prevWeek + 1); // Tăng tuần
    };

    const scheduleData = [
        { day: "THỨ 2", time: "7h00 - 10h35", room: "Phòng G305", teacher: "Nguyễn Lương Anh Tuấn" },
        { day: "THỨ 3", time: "7h00 - 10h35", room: "Phòng G305", teacher: "Nguyễn Lương Anh Tuấn" },
        { day: "THỨ 4", time: "7h00 - 10h35", room: "Phòng G305", teacher: "Nguyễn Lương Anh Tuấn" },
        { day: "THỨ 5", time: "7h00 - 10h35", room: "Phòng G305", teacher: "Nguyễn Lương Anh Tuấn" },
        { day: "THỨ 6", time: "7h00 - 10h35", room: "Phòng G305", teacher: "Nguyễn Lương Anh Tuấn" },
        { day: "THỨ 7", time: "7h00 - 10h35", room: "Phòng G305", teacher: "Nguyễn Lương Anh Tuấn" },
        { day: "CHỦ NHẬT", time: "7h00 - 10h35", room: "Phòng G305", teacher: "Nguyễn Lương Anh Tuấn" }
    ];

    return (
        <div>
        <Navbar sinhVien={sinhVien} />
        <div className="tkbcontainer">
            {/* Schedule Section */}
            <div className="tkbform-container">
                <div className="week-header">
                    <h2>Tuần {currentWeek}</h2>
                    <p>30/9/2024 - 6/10/2024</p>
                </div>

                {/* Schedule Grid */}
                <div className="tkbschedule-grid">
                    {scheduleData.map((item, index) => (
                        <div className="day" key={index}>
                            <h3>{item.day}</h3>
                            <p>HỆ QUẢN TRỊ CƠ SỞ DỮ LIỆU</p>
                            <p>Tiết 1 - 4</p>
                            <p>({item.time})</p>
                            <p>{item.room}</p>
                            <p>GV: {item.teacher}</p>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <div className="nav-arrows">
                    <span className="arrow left-arrow" onClick={handleLeftArrowClick}>←</span>
                    <span className="arrow right-arrow" onClick={handleRightArrowClick}>→</span>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Thoikhoabieu;
