import React, { useState, useEffect } from 'react';
import './thoikhoabieu.css'; // Đường dẫn tới CSS
import Navbar from '../navbar/navbar';


const Thoikhoabieu = () => {
    const defaultSinhVien = {
        HoTen: 'Trần Huỳnh Bảo Ngọc',
        Avatar: require('../../../img/avatar_default.jpg'), // Đảm bảo đường dẫn đúng
    };

    const [sinhVien, setSinhVien] = useState(defaultSinhVien); // Thông tin sinh viên mặc định
    const [currentWeek, setCurrentWeek] = useState(1);
    const [scheduleData, setScheduleData] = useState([]); // Dữ liệu thời khóa biểu khởi tạo rỗng
    const [dateRange, setDateRange] = useState(''); // Phạm vi ngày của tuần hiện tại

    // Tải thông tin sinh viên từ localStorage
    useEffect(() => {
        const storedSinhVien = JSON.parse(localStorage.getItem('sinhVien'));
        if (storedSinhVien) {
            setSinhVien(storedSinhVien);
        }
    }, []);

    // Tính toán tuần hiện tại và phạm vi ngày
    useEffect(() => {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const weekNumber = Math.ceil(((today - startOfYear) / (1000 * 60 * 60 * 24) + startOfYear.getDay() + 1) / 7);
        setCurrentWeek(weekNumber);

        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Thứ hai
        const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6)); // Chủ nhật
        setDateRange(
            `${firstDayOfWeek.toLocaleDateString()} - ${lastDayOfWeek.toLocaleDateString()}`
        );
    }, []);

    // Hàm giả lập đăng ký học phần
    const handleRegisterCourses = () => {
        const newScheduleData = [
            { week: 1, day: 'THỨ 2', subject: 'Lập trình web', time: '7h00 - 10h35', room: 'G305', teacher: 'Nguyễn Lương Anh Tuấn' },
            { week: 1, day: 'THỨ 3', subject: 'Cơ sở dữ liệu', time: '7h00 - 10h35', room: 'G305', teacher: 'Nguyễn Lương Anh Tuấn' },
            { week: 1, day: 'THỨ 5', subject: 'Quản trị mạng', time: '13h00 - 16h35', room: 'G609', teacher: 'Nguyễn Văn B' },
            { week: 2, day: 'THỨ 3', subject: 'Trí tuệ nhân tạo', time: '9h00 - 11h35', room: 'G208', teacher: 'Lê Thị C' },
            { week: 2, day: 'THỨ 6', subject: 'Phân tích dữ liệu', time: '7h00 - 10h35', room: 'G102', teacher: 'Trần Văn D' },
        ];
        setScheduleData(newScheduleData);
    };

    // Xử lý sự kiện thay đổi tuần
    const handleLeftArrowClick = () => {
        setCurrentWeek(prevWeek => Math.max(prevWeek - 1, 1));
    };

    const handleRightArrowClick = () => {
        setCurrentWeek(prevWeek => prevWeek + 1);
    };

    // Lọc thời khóa biểu theo tuần hiện tại
    const filteredSchedule = scheduleData.filter(item => item.week === currentWeek);

    return (
        <div>
            <Navbar sinhVien={sinhVien} />
            <div className="tkbcontainer">
                {/* Header tuần */}
                <div className="tkbform-container">
                    <div className="week-header">
                        <h2>Tuần {currentWeek}</h2>
                        <p>{dateRange}</p>
                    </div>

                    {/* Hiển thị thời khóa biểu hoặc thông báo */}
                    {filteredSchedule.length > 0 ? (
                        <div className="tkbschedule-grid">
                            {filteredSchedule.map((item, index) => (
                                <div className="day" key={index}>
                                    <h3>{item.day}</h3>
                                    <p>{item.subject}</p>
                                    <p>{item.time}</p>
                                    <p>{item.room}</p>
                                    <p>GV: {item.teacher}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Chưa có thời khóa biểu. Hãy đăng ký học phần.</p>
                    )}

                    {/* Điều hướng tuần */}
                    <div className="nav-arrows">
                        <span className="arrow left-arrow" onClick={handleLeftArrowClick}>←</span>
                        <span className="arrow right-arrow" onClick={handleRightArrowClick}>→</span>
                    </div>

                    <div className=".register-button">
                            <a href="/dangkyhp">Đăng Ký Học Phần</a>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Thoikhoabieu;
