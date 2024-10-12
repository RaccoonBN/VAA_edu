import React, { useState, useEffect } from 'react'; // Thêm useEffect
import './navbar.css';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaBook, FaUserCog, FaSignOutAlt } from 'react-icons/fa'; // Nhập các biểu tượng từ Font Awesome

// Giả định thông tin sinh viên
const sinhVien = {
    HoTen: 'Trần Huỳnh Bảo Ngọc',
    Avatar: require('../../../img/avatar_default.jpg'), // Đảm bảo đường dẫn này đúng
};

const Navbar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const avatarUrl = sinhVien.Avatar ? sinhVien.Avatar : require('../../../img/avatar_default.jpg');
    // Đóng sidebar khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && !sidebar.contains(event.target) && !document.querySelector('.menu-icon').contains(event.target)) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="navbar">
            <div className="menu-icon" onClick={() => setSidebarOpen(!isSidebarOpen)}>☰</div>
            <img src={require('../../../img/logo.png')} alt="Logo" className="navbarLogo " />
            <nav>
                <ul>
                    <li><Link to="/Home"> <FaHome className="icon" />Trang Chủ</Link></li>
                    <li><Link to="/schedule"><FaCalendarAlt className="icon" />Thời Khóa Biểu</Link></li>
                    <li><Link to="/Dangkyhp"><FaBook className="icon" />Đăng Ký Học Phần</Link></li>
                </ul>
            </nav>
            <div className="user-info">
                <span>Xin chào, {sinhVien.HoTen}</span>
                <img className="user-avatar" src={avatarUrl} alt="Avatar" />
            </div>
            {isSidebarOpen && (
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h2>XIN CHÀO</h2>
                        <p>{sinhVien.HoTen}</p>
                    </div>
                    <ul className="sidebar-list">
                        <li><Link to="/Edit-account"><FaUserCog className="icon" />Chỉnh Sửa Tài Khoản</Link></li>
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
