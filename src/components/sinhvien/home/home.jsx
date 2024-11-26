import React, { useState, useEffect } from 'react';
import './home.css';
import Navbar from '../navbar/navbar'; 
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

    const Home = () => {
        const [sinhVien, setSinhVien] = useState(null); // Lưu thông tin sinh viên
        const [loading, setLoading] = useState(true);
        const [scheduleData, setScheduleData] = useState([]); // Thời khóa biểu

        useEffect(() => {
            const storedSinhVien = JSON.parse(localStorage.getItem('sinhVien'));
            console.log('Stored sinhVien:', storedSinhVien); // Debug thông tin sinh viên
            if (storedSinhVien) {
              setSinhVien(storedSinhVien);
            } else {
              console.warn('Không tìm thấy dữ liệu sinh viên trong localStorage');
            }
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

    useEffect(() => {
        fetch('http://localhost:5000/api/sinhvien/profile', {
            credentials: 'include',  // Đảm bảo gửi cookie phiên làm việc
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.data) {
                    setSinhVien(data.data); // Lưu thông tin sinh viên vào state
                }
                setLoading(false);  // Đổi trạng thái loading thành false sau khi dữ liệu được tải xong
            })
            .catch((error) => {
                console.error('Lỗi khi lấy thông tin sinh viên:', error);
                setLoading(false); // Đổi trạng thái loading dù có lỗi
            });
    }, []); // Chạy khi component được mount


    // Dữ liệu cho biểu đồ
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
        <div className="home">
            <Navbar /> {/* Gọi Navbar */}

            <main className="main-content">
                <div className="card">
                    <div className="student-layout">
                        {/* Phần bên trái: Thông tin sinh viên */}
                        <div className="student-info">
                            <h2>Thông Tin Sinh Viên</h2>
                            {loading ? (
                                <p>Đang tải thông tin sinh viên...</p>
                            ) : sinhVien ? (
                                <>
                                    <p><strong>Họ tên:</strong> {sinhVien.HoTen}</p>
                                    <p><strong>MSSV:</strong> {sinhVien.MaSV}</p>
                                    <p><strong>Địa chỉ:</strong> {sinhVien.DiaChi}</p>
                                    <p><strong>Trạng thái:</strong> {sinhVien.TrangThai}</p>
                                    <p><strong>Email:</strong> {sinhVien.Email}</p>
                                </>
                            ) : (
                                <p>Không có thông tin sinh viên.</p>
                            )}
                        </div>

                        {/* Phần bên phải: Hình ảnh */}
                        <div className="avatar">
                            <img src={require('../../../img/avatar_default.jpg')} alt="Avt_home" />

                        </div>
                    </div>
                </div>

                <div className="content-layout">
                    <div className="schedule">
                        <div className="section-header">
                            <h2>THỜI KHÓA BIỂU</h2>
                            <a href="/thoikhoabieu">Xem chi tiết</a>
                        </div>

                        <div className="schedule-grid">
                        {scheduleData.length > 0 ? (
                            scheduleData.map((item, index) => (
                                <div key={index} className="schedule-item">
                                    <h3>{item.lichhoc || 'Không xác định'}</h3>
                                    <p>{item.tenHP?.toUpperCase() || 'Chưa có môn học'}</p>
                                    <p>({item.thoigianhoc || 'Chưa có thời gian'})</p>
                                    <p>Phòng: {item.phonghoc || 'Chưa có phòng học'}</p>
                                    <p>Giảng viên: {item.giangvien || 'Chưa có giảng viên'}</p>
                                </div>
                            ))
                        ) : (
                            <p>Không có dữ liệu thời khóa biểu.</p>
                        )}
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
