import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaBook, FaUserCog, FaSignOutAlt } from 'react-icons/fa'; // Nhập các biểu tượng từ Font Awesome

const Navbar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [sinhVien, setSinhVien] = useState(null); // State lưu thông tin sinh viên
    const [loading, setLoading] = useState(true); // State kiểm tra trạng thái đang tải dữ liệu sinh viên

    useEffect(() => {
        fetch('http://localhost:5000/api/sinhvien/profile', {
            credentials: 'include',  
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.data) {
                    setSinhVien(data.data); // Lưu thông tin sinh viên vào state
                }
                setLoading(false);  // Đổi trạng thái loading thành false
            })
            .catch((error) => {
                console.error('Lỗi khi lấy thông tin sinh viên:', error);
                setLoading(false); // Đổi trạng thái loading dù có lỗi
            });
    }, []);

    if (loading) {
        return <div>Đang tải thông tin sinh viên...</div>; // Thông báo khi dữ liệu đang được tải
    }

    // Sử dụng avatar mặc định thay vì lấy từ sinh viên
    const avatarUrl = require('../../../img/avatar_default.jpg'); 

    return (
        <header className="navbar">
            <div className="menu-icon" onClick={() => setSidebarOpen(!isSidebarOpen)}>☰</div>
            <img src={require('../../../img/logo.png')} alt="Logo" className="navbarLogo " />
            <nav>
                <ul>
                    <li><Link to="/Home"><FaHome className="icon" />Trang Chủ</Link></li>
                    <li><Link to="/Thoikhoabieu"><FaCalendarAlt className="icon" />Thời Khóa Biểu</Link></li>
                    <li><Link to="/Dangkyhp"><FaBook className="icon" />Đăng Ký Học Phần</Link></li>
                </ul>
            </nav>
            <div className="user-info">
                {sinhVien ? (
                    <>
                        <span>Xin chào, {sinhVien.HoTen}</span>
                        <img className="user-avatar" src={avatarUrl} alt="Avatar" />
                    </>
                ) : (
                    <span>Đang tải thông tin sinh viên...</span> // Thông báo nếu chưa có dữ liệu sinh viên
                )}
            </div>
            {isSidebarOpen && (
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h2>XIN CHÀO</h2>
                        <p>{sinhVien?.HoTen || 'Đang tải...'}</p> {/* Kiểm tra sinhVien có dữ liệu không */}
                    </div>
                    <ul className="sidebar-list">
                        <li><Link to="/Edit_account"><FaUserCog className="icon" />Chỉnh Sửa Tài Khoản</Link></li>
                        <li><Link to="/Thoikhoabieu"><FaCalendarAlt className="icon" />Thời Khóa Biểu</Link></li>
                        <li><Link to="/Dangkyhp"><FaBook className="icon" />Đăng Ký Học Phần</Link></li>
                        <li><Link to="/Logout"><FaSignOutAlt className="icon" />Đăng Xuất</Link></li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
