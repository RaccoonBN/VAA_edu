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
            <h1>Chào mừng đến với trang chủ!</h1>
            {/* Bạn có thể thêm các nội dung khác tại đây */}
        </div>
    );
};

export default Home;
