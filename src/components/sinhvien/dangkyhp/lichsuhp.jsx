import React, { useState, useEffect } from 'react';
import './lichsuhp.css';
import Navbar from '../navbar/navbar';

const Lichsuhp = () => {
    const [sinhVien, setSinhVien] = useState(null);
    const [registeredCourses, setRegisteredCourses] = useState([]);

    useEffect(() => {
        const storedSinhVien = JSON.parse(localStorage.getItem('sinhVien'));
        if (storedSinhVien) {
            setSinhVien(storedSinhVien);
        }
    }, []);

    useEffect(() => {
        const fetchRegisteredCourses = async () => {
            if (sinhVien && sinhVien.MaSV) {
                try {
                    const response = await fetch(`http://localhost:5000/api/registered/${sinhVien.MaSV}`);
                    const data = await response.json();
                    setRegisteredCourses(data);
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách học phần đã đăng ký:', error);
                }
            }
        };

        fetchRegisteredCourses();
    }, [sinhVien]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', options);
    };

    return (
        <div>
            <Navbar sinhVien={sinhVien} />
            <div className="lshpwrapper">
                <h2 className="lshptext-xl text-center text-button">CÁC MÔN HỌC ĐÃ ĐĂNG KÝ</h2>
                <div className="lshpcourse-border">
                    <ul className="lshpmt-4 course-list">
                        {registeredCourses.map((course, index) => (
                            <li key={index} className="lshptext-center course-item">
                                ID: {course.MaHP} - Học Phần: {course.tenHP} - Giảng viên: {course.giangvien} - Học kỳ: {course.hocky} - Ngày đăng ký: {formatDate(course.ngaydangky)}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lshpmt-4 flex justify-center">
                    <button className="lshpgradient-button text-white p-2 border border-gray-300 rounded-full"
                        onClick={() => window.location.href = '/dangkyhp'}>
                        QUAY LẠI
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Lichsuhp;
