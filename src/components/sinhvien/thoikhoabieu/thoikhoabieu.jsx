import React, { useState, useEffect } from 'react';
import './thoikhoabieu.css';
import Navbar from '../navbar/navbar';

const Thoikhoabieu = () => {
    const [sinhVien, setSinhVien] = useState(null); // Lưu thông tin sinh viên
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [currentWeek, setCurrentWeek] = useState(1); // Tuần hiện tại
    const [scheduleData, setScheduleData] = useState([]); // Thời khóa biểu

        // Lấy thông tin sinh viên từ localStorage
        useEffect(() => {
            const storedSinhVien = JSON.parse(localStorage.getItem('sinhVien'));
            console.log('Stored sinhVien:', storedSinhVien); // Debug thông tin sinh viên
            if (storedSinhVien) {
                setSinhVien(storedSinhVien); // Lưu dữ liệu sinh viên vào state
            } else {
                console.warn('Không tìm thấy dữ liệu sinh viên trong localStorage');
            }
            setLoading(false); // Hoàn tất việc lấy dữ liệu sinh viên
        }, []);
    
        // Lấy dữ liệu thời khóa biểu từ API
        useEffect(() => {
            const fetchSchedule = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/schedule/${sinhVien.MaSV}`);
                    const data = await response.json();
                    console.log('Dữ liệu từ API:', data); // Kiểm tra dữ liệu trả về
                    if (data.error) {
                        console.warn('Lỗi từ API:', data.error);
                    } else {
                        setScheduleData(data);
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy thời khóa biểu:', error);
                }
            };
        
            if (sinhVien) {
                fetchSchedule();
            }
        }, [sinhVien]);
        
    
    // Điều hướng tuần
    const handleLeftArrowClick = () => {
        setCurrentWeek((prevWeek) => Math.max(prevWeek - 1, 1));
    };

    const handleRightArrowClick = () => {
        setCurrentWeek((prevWeek) => prevWeek + 1);
    };

    // Tính khoảng thời gian của tuần
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

    // Trường hợp đang tải dữ liệu
    if (loading) {
        return <div>Đang tải...</div>;
    }

    // Trường hợp không tìm thấy thông tin sinh viên
    if (!sinhVien) {
        return <div>Không tìm thấy thông tin sinh viên</div>;
    }

    return (
        <div>
            <Navbar sinhVien={sinhVien} />
            <div className="tkbcontainer">
                <div className="tkbform-container">
                    {/* Hiển thị tuần hiện tại */}
                    <div className="week-header">
                        <h2>Tuần {currentWeek}</h2>
                        <p>{calculateWeekRange(currentWeek)}</p>
                    </div>

                    {/* Hiển thị thời khóa biểu */}
                    <div className="tkbschedule-grid">
                        {scheduleData.length > 0 ? (
                            scheduleData.map((item, index) => (
                                <div className="day" key={index}>
                                    <h3>{item.lichhoc || 'Không xác định'}</h3>
                                    <p>{item.tenHP?.toUpperCase() || 'Chưa có môn học'}</p>
                                    <p>({item.thoigianhoc || 'Chưa có thời gian'})</p>
                                    <p>Phòng: {item.phonghoc || 'Chưa có phòng học'}</p>
                                    <p>Giảng viên: {item.giangvien || 'Chưa có giảng viên'}</p>
                                </div>
                            ))
                        ) : (
                            <div>Không có thời khóa biểu để hiển thị</div>
                        )}
                    </div>

                    {/* Điều hướng tuần */}
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
