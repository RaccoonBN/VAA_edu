// Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Để điều hướng sau khi đăng xuất
import { toast } from 'react-toastify'; // Import toast

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Xóa thông tin người dùng từ localStorage
        localStorage.removeItem('userInfo');
        localStorage.removeItem('MaSV'); // Xóa MaSV nếu cần

        // Hiển thị thông báo đăng xuất thành công
        toast.success('Đăng xuất thành công!');

        // Chuyển hướng về trang đăng nhập sau khi đăng xuất
        navigate('/login');
    }, [navigate]);

    return null; // Không hiển thị gì trong UI
};

export default Logout;
