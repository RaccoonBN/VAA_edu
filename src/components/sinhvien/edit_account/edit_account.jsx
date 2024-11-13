import React, { useState, useEffect } from 'react';
import './edit_account.css';
import Navbar from '../navbar/navbar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditAccount = () => {
    const [sinhVien, setSinhVien] = useState({
        HoTen: '',
        NgaySinh: '',
        Email: '',
        DiaChi: '',
        Avatar: '',
    });

    useEffect(() => {
        const maSV = localStorage.getItem('MaSV');

        if (!maSV) {
            toast.error('Mã sinh viên không tồn tại trong localStorage.', {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        const fetchSinhVien = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/sinhvien/${maSV}`);
                setSinhVien(response.data.data);
            } catch (error) {
                toast.error('Không thể lấy thông tin sinh viên.', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        };

        fetchSinhVien();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSinhVien({ ...sinhVien, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const maSV = localStorage.getItem('MaSV');
            await axios.put(`http://localhost:5000/api/sinhvien/${maSV}`, sinhVien);
            toast.success('Cập nhật thông tin thành công!', {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            toast.error('Cập nhật thông tin thất bại!', {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div>
            <Navbar sinhVien={sinhVien} />
            <ToastContainer />
            <div className="editform-container">
                <form onSubmit={handleSubmit}>
                    <h2 className="edith2">CHỈNH SỬA THÔNG TIN SINH VIÊN</h2>
                    <input type="text" name="HoTen" value={sinhVien.HoTen} onChange={handleChange} placeholder="Họ tên" required />
                    <input type="date" name="NgaySinh" value={sinhVien.NgaySinh.split('T')[0]} onChange={handleChange} required />
                    <input type="email" name="Email" value={sinhVien.Email} onChange={handleChange} placeholder="Email" required />
                    <input type="text" name="DiaChi" value={sinhVien.DiaChi} onChange={handleChange} placeholder="Nhập địa chỉ" required />
                    <div className="edit-actions">
                        <button type="button" onClick={() => window.history.back()}>Hủy</button>
                        <button type="submit">Lưu</button>
                    </div>
                </form>
                <div>
                    <img src={sinhVien.Avatar || './avatar.png'} alt="Avatar" />
                    <button>Chọn ảnh</button>
                </div>
            </div>
        </div>
    );
};

export default EditAccount;
