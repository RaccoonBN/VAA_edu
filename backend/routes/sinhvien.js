const express = require('express');
const db = require('../db'); // Import kết nối cơ sở dữ liệu

const router = express.Router();

// Lấy thông tin sinh viên theo mã sinh viên (MaSV)
router.get('/:MaSV', (req, res) => {
    const { MaSV } = req.params; // Lấy MaSV từ tham số URL

    // Truy vấn cơ sở dữ liệu để lấy thông tin sinh viên
    const query = 'SELECT * FROM sinhvien WHERE MaSV = ?';
    db.query(query, [MaSV], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: 'Lỗi server' });
        }

        // Kiểm tra nếu không tìm thấy sinh viên
        if (results.length === 0) {
            return res.status(404).json({ msg: 'Không tìm thấy sinh viên với mã này' });
        }

        // Trả về thông tin sinh viên
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

module.exports = router;
