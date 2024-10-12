const express = require('express');
const SvLogin = require('../models/SvLogin'); // Model đăng nhập
const SinhVien = require('../models/sinhvien'); // Model sinh viên

const router = express.Router();

// Đăng nhập
router.post('/login', async (req, res) => {
    const { Email, Matkhau } = req.body;
    try {
        // Kiểm tra email có tồn tại không
        let user = await SvLogin.findOne({ Email });
        if (!user) {
            return res.status(400).json({ msg: 'Sai thông tin đăng nhập' });
        }

        // Kiểm tra mật khẩu
        if (Matkhau !== user.Matkhau) {
            return res.status(400).json({ msg: 'Sai mật khẩu' });
        }

        // Lấy mã sinh viên (MaSV) sau khi đăng nhập thành công
        const MaSV = user.MaSV;

        // Trả về mã sinh viên để client có thể sử dụng tiếp
        res.status(200).json({ msg: 'Đăng nhập thành công!', MaSV });
    } catch (err) {
        res.status(500).json({ msg: 'Lỗi server' });
    }
});

module.exports = router;
