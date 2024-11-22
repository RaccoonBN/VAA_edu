const express = require('express');
const db = require('../db'); // Import db connection
const router = express.Router();

// Đăng nhập
router.post('/login', (req, res) => {
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

            // Lấy MaSV từ tài khoản
            const MaSV = user.MaSV;

            // Truy vấn bảng tk_sinhvien để lấy thông tin sinh viên
            const studentQuery = 'SELECT HoTen FROM sinhvien WHERE MaSV = ?';
            db.query(studentQuery, [MaSV], (err, studentResults) => {
                if (err) {
                    return res.status(500).json({ msg: 'Lỗi server khi lấy thông tin sinh viên' });
                }

                if (studentResults.length === 0) {
                    return res.status(400).json({ msg: 'Không tìm thấy thông tin sinh viên' });
                }

                const student = studentResults[0];
                const hoTen = student.HoTen;

                // Lưu thông tin người dùng vào session
                req.session.user = {
                    MaSV,
                    hoTen
                };
                console.log(req.session);  // Debug session sau khi set
                

                // Trả về thông tin sinh viên sau khi đăng nhập thành công
                res.status(200).json({ msg: 'Đăng nhập thành công!', MaSV, hoTen });
            });
        });
    } catch (err) {
        res.status(500).json({ msg: 'Lỗi server' });
    }
});

module.exports = router;
