const express = require('express');
const db = require('../db'); // Import db connection

const router = express.Router();

// Đăng nhập
router.post('/login', async (req, res) => {
    const { Email, Matkhau } = req.body;
    try {
        // Kiểm tra email có tồn tại không
        const query = 'SELECT * FROM taikhoansv WHERE Email = ?';
        db.query(query, [Email], (err, results) => {
            if (err) {
                return res.status(500).json({ msg: 'Lỗi server' });
            }

            if (results.length === 0) {
                return res.status(400).json({ msg: 'Sai thông tin đăng nhập' });
            }

            const user = results[0];

            // Kiểm tra mật khẩu
            if (Matkhau !== user.password) {
                return res.status(400).json({ msg: 'Sai mật khẩu' });
            }

            // Lấy mã sinh viên (MaSV) sau khi đăng nhập thành công
            const MaSV = user.MaSV;

            // Trả về mã sinh viên để client có thể sử dụng tiếp
            res.status(200).json({ msg: 'Đăng nhập thành công!', MaSV });
        });
    } catch (err) {
        res.status(500).json({ msg: 'Lỗi server' });
    }
});

module.exports = router;
