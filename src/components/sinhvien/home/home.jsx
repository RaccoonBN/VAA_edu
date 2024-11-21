import React, { useState, useEffect } from 'react';
import './home.css';
import Navbar from '../navbar/navbar'; 
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
    const [MaSV, setMaSV] = useState('');

    useEffect(() => {
        const storedMaSV = localStorage.getItem('MaSV'); // Lấy MaSV từ localStorage
        if (storedMaSV) {
            setMaSV(storedMaSV); // Lưu MaSV vào state
        }
    }, []);


    //du lieu dât cho bieu do
    const data = {
        labels: ['Chưa Học', 'Đã Học'], // Nhãn cho biểu đồ
        datasets: [
            {
                data: [33, 67], // Giá trị tỷ lệ phần trăm
                backgroundColor: ['#3498db', '#2ecc71'], // Màu sắc từng phần
                borderColor: ['#ffffff', '#ffffff'], // Màu viền
                borderWidth: 2, // Độ dày viền
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom', // Vị trí hiển thị chú thích
            },
        },
    };

    return (
        <div className="home"> {/* Sử dụng class home để áp dụng CSS */}
    <Navbar MaSV={MaSV} /> {/* Truyền MaSV cho Navbar */}

    <main className="main-content">
        <div className="card">
            <div className="student-layout"> {/* Sử dụng flexbox để chia 2 cột */}
                {/* Phần bên trái: Thông tin */}
                <div className="student-info">
                    <h2>Thông Tin Sinh Viên</h2>
                    <p><strong>Họ tên:</strong> Trần Huỳnh Bảo Ngọc</p>
                    <p><strong>MSSV:</strong> 2254810194</p>
                    <p><strong>Địa chỉ:</strong> 18A/1 Cộng Hòa, phường 5, quận Tân Bình, TP.HCM</p>
                    <p><strong>Trạng thái:</strong> Đang học</p>
                </div>

                {/* Phần bên phải: Hình ảnh */}
                <div className="avatar">
                <img src={require('../../../img/avatar_home.png')} alt="Avt_home"  />
                </div>
            </div>
        </div>    

        <div className="content-layout"> {/* Khung bố trí cho thời khóa biểu và biểu đồ */}
            <div className="schedule">
                <div className="section-header">
                    <h2>THỜI KHÓA BIỂU</h2>
                    <a href="/thoikhoabieu">Xem chi tiết</a>
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
                <Doughnut data={data} options={options} />
                </div>
            </section>
        </div>
    </main>
</div>

    );
};

export default Home;
