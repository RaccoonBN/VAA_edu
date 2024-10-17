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
                     <div className="avatar">
                       <img src="avatar_home.png" alt="ADD" />
                     </div> 
                    <div className="card">
                   <div className="student-info">
                       <h2 >Thông Tin Sinh Viên</h2>
                       <p><strong>Họ tên:</strong> Trần Huỳnh Bảo Ngọc</p>
                       <p><strong>MSSV:</strong> 2254810194</p>
                       <p><strong>Địa chỉ:</strong> 18A/1 Cộng Hòa, phường 5, quận Tân Bình, TP.HCM</p>
                       <p><strong>Trạng thái:</strong> Đang học</p>
                    </div> 
                </div>    

                <div className="content-layout"> {/* Khung bố trí cho thời khóa biểu và biểu đồ */}
                    <div className="schedule">
                        <div class="section-header">
                            <h2>THỜI KHÓA BIỂU</h2>
                            <a href="#">Xem chi tiết</a>
                        </div>

                        <div className="schedule-grid">
                            <div className="schedule-item">
                                <p>Thứ 2</p>
                                <p>Hệ Quản Trị Cơ Sở Dữ Liệu</p>
                                <p>Tiết 1 - 4 (7:00 - 10:35)</p>
                                <p>Phòng: G305</p>
                                <p>GV: Nguyễn Lương Anh Tuấn</p>
                            </div>
                            <div className="schedule-item">
                                <p>Thứ 4</p>
                                <p>Hệ Quản Trị Cơ Sở Dữ Liệu</p>
                                <p>Tiết 1 - 4 (7:00 - 10:35)</p>
                                <p>Phòng: G305</p>
                                <p>GV: Nguyễn Lương Anh Tuấn</p>
                            </div>
                            <div className="schedule-item">
                                <p>Thứ 4</p>
                                <p>Hệ Quản Trị Cơ Sở Dữ Liệu</p>
                                <p>Tiết 1 - 4 (7:00 - 10:35)</p>
                                <p>Phòng: G305</p>
                                <p>GV: Nguyễn Lương Anh Tuấn</p>
                            </div>
                        </div>
                    </div>

                    <section className="course-progress">
                        <h2>Học Phần</h2>
                        <a href="#">Xem chi tiết</a>
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
