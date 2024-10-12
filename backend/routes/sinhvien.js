const express = require('express');
const router = express.Router();
const SinhVien = require('../models/sinhvien');

// Lấy thông tin sinh viên dựa trên MaSV
router.get('/:MaSV', async (req, res) => {
    try {
        const sinhVien = await SinhVien.findOne({ MaSV: req.params.MaSV });
        if (!sinhVien) {
            return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        }
        res.json(sinhVien);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sinh viên:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

module.exports = router;
