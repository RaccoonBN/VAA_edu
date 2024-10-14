import React, { useState, useEffect } from 'react';
import './lichsuhp.css';
import Navbar from '../navbar/navbar';

const Lichsuhp = () => {
    const defaultSinhVien = {
        HoTen: 'Trần Huỳnh Bảo Ngọc',
        Avatar: require('../../../img/avatar_default.jpg'), // Đảm bảo đường dẫn này đúng
    };

    const [sinhVien, setSinhVien] = useState(defaultSinhVien); // Mặc định thông tin sinh viên

    // Nếu bạn muốn kiểm tra localStorage, bạn có thể làm như sau
    useEffect(() => {
        const storedSinhVien = JSON.parse(localStorage.getItem('sinhVien'));
        if (storedSinhVien) {
            setSinhVien(storedSinhVien);
        }
    }, []);


    const courses = [
        { subject: "Hệ quản trị cơ sở dữ liệu", code: "000002", instructor: "Nguyễn Lương Anh Tuấn" },
        { subject: "Hệ quản trị cơ sở dữ liệu", code: "000002", instructor: "Nguyễn Lương Anh Tuấn" },
        { subject: "Hệ quản trị cơ sở dữ liệu", code: "000002", instructor: "Nguyễn Lương Anh Tuấn" },
        { subject: "Hệ quản trị cơ sở dữ liệu", code: "000002", instructor: "Nguyễn Lương Anh Tuấn" },
        { subject: "Hệ quản trị cơ sở dữ liệu", code: "000002", instructor: "Nguyễn Lương Anh Tuấn" },
        { subject: "Hệ quản trị cơ sở dữ liệu", code: "000002", instructor: "Nguyễn Lương Anh Tuấn" },
        { subject: "Hệ quản trị cơ sở dữ liệu", code: "000002", instructor: "Nguyễn Lương Anh Tuấn" },
        { subject: "Hệ quản trị cơ sở dữ liệu", code: "000002", instructor: "Nguyễn Lương Anh Tuấn" },
        { subject: "Hệ quản trị cơ sở dữ liệu", code: "000002", instructor: "Nguyễn Lương Anh Tuấn" },
    ];
    return (
        <div>
            <Navbar sinhVien={sinhVien} /> {/* Truyền sinhVien vào Navbar */}
            {/* Khung bao bọc cho phần nhập dữ liệu */}
            <div className="lshpwrapper">
                <div className="lshpmt-8 flex justify-center">
                    <button className="lshpbg-white text-button p-2 border border-gray-300 rounded-full button-spacing">
                        CHỌN HỌC KỲ
                    </button>
                </div>

                <div className="lshpcourse-list-wrapper">
                    <h2 className="lshptext-xl text-center text-button">CÁC MÔN HỌC ĐÃ ĐĂNG KÝ</h2>


                    <div className="lshpcourse-border">
                        <ul className="lshpmt-4 course-list">
                            {courses.map((course, index) => (
                                <li key={index} className="lshptext-center course-item">
                                    {index + 1}. {course.subject} - MÃ HP: {course.code} - GV: {course.instructor}
                                </li>
                            ))}
                        </ul>
                    </div>
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
