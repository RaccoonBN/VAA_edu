import React, { useState, useEffect } from 'react';
import './thoikhoabieu.css';
import Navbar from '../navbar/navbar';

const Thoikhoabieu = () => {
    const defaultSinhVien = {
        HoTen: 'Trần Huỳnh Bảo Ngọc',
        Avatar: require('../../../img/avatar_default.jpg'),
    };

    const [sinhVien, setSinhVien] = useState(defaultSinhVien);

    useEffect(() => {
        const storedSinhVien = JSON.parse(localStorage.getItem('sinhVien'));
        if (storedSinhVien) {
            setSinhVien(storedSinhVien);
        }
    }, []);

    const [currentWeek, setCurrentWeek] = useState(1);

    const handleLeftArrowClick = () => {
        setCurrentWeek((prevWeek) => Math.max(prevWeek - 1, 1));
    };

    const handleRightArrowClick = () => {
        setCurrentWeek((prevWeek) => prevWeek + 1);
    };

    // Dữ liệu thời khóa biểu theo tuần
    const scheduleData = {
        1: [
            { day: 'THỨ 2', subject: 'Lập trình web', time: '7h00 - 10h35', room: 'G305', teacher: 'Nguyễn Lương Anh Tuấn' },
            { day: 'THỨ 3', subject: 'Cơ sở dữ liệu', time: '7h00 - 10h35', room: 'G305', teacher: 'Nguyễn Lương Anh Tuấn' },
            { day: 'THỨ 5', subject: 'Quản trị mạng', time: '13h00 - 16h35', room: 'G609', teacher: 'Nguyễn Văn B' },
            { day: 'THỨ 6', subject: 'Phân tích dữ liệu', time: '7h00 - 10h35', room: 'G102', teacher: 'Trần Văn D' },
            { day: 'THỨ 7', subject: 'Hệ điều hành', time: '9h00 - 11h35', room: 'G208', teacher: 'Lê Thị C' },
        ],
        2: [
            { day: 'THỨ 2', subject: 'Trí tuệ nhân tạo', time: '7h00 - 10h35', room: 'G101', teacher: 'Nguyễn Lương Anh Tuấn' },
            { day: 'THỨ 3', subject: 'Phân tích dữ liệu', time: '9h00 - 11h35', room: 'G208', teacher: 'Trần Văn D' },
            { day: 'THỨ 4', subject: 'Công nghệ phần mềm', time: '13h00 - 16h35', room: 'G305', teacher: 'Nguyễn Văn B' },
            { day: 'THỨ 5', subject: 'Quản lý dự án', time: '7h00 - 10h35', room: 'G102', teacher: 'Nguyễn Lương Anh Tuấn' },
            { day: 'THỨ 7', subject: 'Hệ thống thông tin', time: '9h00 - 11h35', room: 'G208', teacher: 'Lê Thị C' },
        ],
        3: [
            { day: 'THỨ 2', subject: 'Lập trình web', time: '7h00 - 10h35', room: 'G305', teacher: 'Nguyễn Lương Anh Tuấn' },
            { day: 'THỨ 3', subject: 'Cơ sở dữ liệu', time: '7h00 - 10h35', room: 'G305', teacher: 'Nguyễn Lương Anh Tuấn' },
            { day: 'THỨ 5', subject: 'Quản trị mạng', time: '13h00 - 16h35', room: 'G609', teacher: 'Nguyễn Văn B' },
            { day: 'THỨ 6', subject: 'Phân tích dữ liệu', time: '7h00 - 10h35', room: 'G102', teacher: 'Trần Văn D' },
            { day: 'THỨ 7', subject: 'Hệ điều hành', time: '9h00 - 11h35', room: 'G208', teacher: 'Lê Thị C' },
        ],
        4: [
            { day: 'THỨ 2', subject: 'Lập trình web', time: '7h00 - 10h35', room: 'G305', teacher: 'Nguyễn Lương Anh Tuấn' },
            { day: 'THỨ 3', subject: 'Cơ sở dữ liệu', time: '7h00 - 10h35', room: 'G305', teacher: 'Nguyễn Lương Anh Tuấn' },
            { day: 'THỨ 5', subject: 'Quản trị mạng', time: '13h00 - 16h35', room: 'G609', teacher: 'Nguyễn Văn B' },
            { day: 'THỨ 6', subject: 'Phân tích dữ liệu', time: '7h00 - 10h35', room: 'G102', teacher: 'Trần Văn D' },
            { day: 'THỨ 7', subject: 'Hệ điều hành', time: '9h00 - 11h35', room: 'G208', teacher: 'Lê Thị C' },
        ],
    };

    // Tính toán ngày tháng cho tuần hiện tại
    const calculateWeekRange = (weekNumber) => {
        const startDate = new Date('2024-09-30'); // Ngày bắt đầu tuần 1
        const currentStartDate = new Date(startDate);
        currentStartDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
        const currentEndDate = new Date(currentStartDate);
        currentEndDate.setDate(currentStartDate.getDate() + 6);

        const formatDate = (date) =>
            `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return `${formatDate(currentStartDate)} - ${formatDate(currentEndDate)}`;
    };

    return (
        <div>
            <Navbar sinhVien={sinhVien} />
            <div className="tkbcontainer">
                <div className="tkbform-container">
                    <div className="week-header">
                        <h2>Tuần {currentWeek}</h2>
                        <p>{calculateWeekRange(currentWeek)}</p>
                    </div>

                    {/* Schedule Grid */}
                    <div className="tkbschedule-grid">
                        {(scheduleData[currentWeek] || []).map((item, index) => (
                            <div className="day" key={index}>
                                <h3>{item.day}</h3>
                                <p>{item.subject.toUpperCase()}</p>
                                <p>({item.time})</p>
                                <p>{item.room}</p>
                                <p>GV: {item.teacher}</p>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="nav-arrows">
                        <span className="arrow left-arrow" onClick={handleLeftArrowClick}>
                            ←
                        </span>
                        <span className="arrow right-arrow" onClick={handleRightArrowClick}>
                            →
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thoikhoabieu;
