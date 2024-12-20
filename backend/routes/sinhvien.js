const express = require('express');
const db = require('../db'); // Import kết nối cơ sở dữ liệu
const multer = require('multer'); // Import multer để xử lý file upload
const path = require('path');

const router = express.Router();

// Cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu trữ ảnh
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Tên file
    },
});
const upload = multer({ storage });

// Lấy thông tin sinh viên dựa trên MaSV từ session
router.get('/profile', (req, res) => {
    // Kiểm tra xem người dùng có đăng nhập không (có session không)
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Chưa đăng nhập' });
    }

    const { MaSV } = req.session.user; // Lấy MaSV từ session của người dùng

    const query = 'SELECT * FROM sinhvien WHERE MaSV = ?';
    db.query(query, [MaSV], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: 'Lỗi server' });
        }

        if (results.length === 0) {
            return res.status(404).json({ msg: 'Không tìm thấy sinh viên với mã này' });
        }

        const sinhVien = results[0];
        res.status(200).json({
            msg: 'Thông tin sinh viên',
            data: {
                MaSV: sinhVien.MaSV,
                HoTen: sinhVien.HoTen,
                NgaySinh: sinhVien.NgaySinh,
                Email: sinhVien.Email,
                TrangThai: sinhVien.TrangThai,
                DiaChi: sinhVien.DiaChi,
                Avatar: sinhVien.Avatar,
            },
        });
    });
});

// Cập nhật thông tin sinh viên
router.put('/profile', upload.single('Avatar'), (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Chưa đăng nhập' });
    }

    const { MaSV } = req.session.user;
    const { HoTen, NgaySinh, Email, DiaChi } = req.body;
    let Avatar = req.file ? req.file.path : null;

    const query = 'UPDATE sinhvien SET HoTen = ?, NgaySinh = ?, Email = ?, DiaChi = ?, Avatar = ? WHERE MaSV = ?';
    db.query(query, [HoTen, NgaySinh, Email, DiaChi, Avatar, MaSV], (err, results) => {
        if (err) return res.status(500).json({ msg: 'Lỗi server' });
        res.status(200).json({ msg: 'Cập nhật thông tin thành công' });
    });
});

module.exports = router;
