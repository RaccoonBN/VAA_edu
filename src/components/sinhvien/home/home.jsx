import React, { useState, useEffect } from 'react';
import './home.css';
import Navbar from '../navbar/navbar'; 

const Home = () => {
    const [MaSV, setMaSV] = useState('');

    useEffect(() => {
        const storedMaSV = localStorage.getItem('MaSV'); // Lấy MaSV từ localStorage
        if (storedMaSV) {
            setMaSV(storedMaSV); // Lưu MaSV vào state
        }
    }, []);

    return (
        <div className="home"> {/* Sử dụng class home để áp dụng CSS */}
            <Navbar MaSV={MaSV} /> {/* Truyền MaSV cho Navbar */}

            <main className="main-content">
                <section className="student-info">
                    <h2>Thông Tin Sinh Viên</h2>
                    <div className="avatar">
                        <img src="../../../img/default-avatar.png" alt="Avatar" /> {/* Avatar mặc định */}
                    </div>
                    <p><strong>Họ tên:</strong> Trần Huỳnh Bảo Ngọc</p>
                    <p><strong>MSSV:</strong> 2254810194</p>
                    <p><strong>Địa chỉ:</strong> 18A/1 Cộng Hòa, phường 5, quận Tân Bình, TP.HCM</p>
                    <p><strong>Trạng thái:</strong> Đang học</p>
                </section>

                <div className="content-layout"> {/* Khung bố trí cho thời khóa biểu và biểu đồ */}
                    <section className="schedule">
                        <h2>Thời Khóa Biểu</h2>
                        <div className="schedule-grid">
                            <div className="schedule-item">
                                <p>Thứ 2</p>
                                <p>Hệ Quản Trị Cơ Sở Dữ Liệu</p>
                                <p>Phòng: G305</p>
                                <p>GV: Nguyễn Lương Anh Tuấn</p>
                            </div>
                            <div className="schedule-item">
                                <p>Thứ 4</p>
                                <p>Hệ Quản Trị Cơ Sở Dữ Liệu</p>
                                <p>Phòng: G305</p>
                                <p>GV: Nguyễn Lương Anh Tuấn</p>
                            </div>
                        </div>
                    </section>

                    <section className="course-progress">
                        <h2>Học Phần</h2>
                        <div className="progress-container">
                            <div className="progress-circle">
                                <span>33%<br />Chưa Học</span>
                            </div>
                            <div className="progress-circle">
                                <span>67%<br />Đã Học</span>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Home;
