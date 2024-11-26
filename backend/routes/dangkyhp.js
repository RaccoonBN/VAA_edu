const express = require('express');
const router = express.Router();
const db = require('../db'); // Kết nối tới cơ sở dữ liệu

// Lấy danh sách học phần theo học kỳ
router.get('/:semester', (req, res) => {
    const { semester } = req.params;
    db.query('SELECT * FROM hocphan WHERE hocky = ?', [semester], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi lấy danh sách học phần' });
        }
        res.json(results);
    });
});

// Đăng ký học phần
router.post('/register/:courseId', (req, res) => {
    const { courseId } = req.params;
    const { studentId, ngaydangky } = req.body;

    // Khởi tạo giao tác
    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi bắt đầu giao tác' });
        }

        // Kiểm tra xem sinh viên đã đăng ký học phần này chưa
        db.query('SELECT * FROM dangkyhocphan WHERE MaHP = ? AND MaSV = ?', [courseId, studentId], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    return res.status(500).json({ error: 'Lỗi khi kiểm tra đăng ký học phần' });
                });
            }

            if (result.length > 0) {
                return db.rollback(() => {
                    return res.status(400).json({ error: 'Bạn đã đăng ký học phần này rồi!' });
                });
            }

            // Kiểm tra sĩ số học phần
            db.query('SELECT sisohientai, siso FROM hocphan WHERE MaHP = ?', [courseId], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        return res.status(500).json({ error: 'Lỗi khi lấy thông tin học phần' });
                    });
                }

                if (result.length === 0) {
                    return db.rollback(() => {
                        return res.status(404).json({ error: 'Học phần không tồn tại' });
                    });
                }

                const { sisohientai, siso } = result[0];
                if (sisohientai < siso) {
                    const MaDK = `${courseId}-${studentId}`;

                    // Lưu thông tin đăng ký
                    db.query('INSERT INTO dangkyhocphan (MaDK, MaHP, MaSV, ngaydangky) VALUES (?, ?, ?, ?)', [MaDK, courseId, studentId, ngaydangky], (err) => {
                        if (err) {
                            return db.rollback(() => {
                                return res.status(500).json({ error: 'Lỗi khi lưu thông tin đăng ký học phần' });
                            });
                        }

                        // Cập nhật sĩ số học phần
                        db.query('UPDATE hocphan SET sisohientai = sisohientai + 1 WHERE MaHP = ?', [courseId], (err) => {
                            if (err) {
                                return db.rollback(() => {
                                    return res.status(500).json({ error: 'Lỗi khi cập nhật sĩ số học phần' });
                                });
                            }

                            // Cam kết giao tác
                            db.commit((err) => {
                                if (err) {
                                    return db.rollback(() => {
                                        return res.status(500).json({ error: 'Lỗi khi cam kết giao tác' });
                                    });
                                }
                                res.json({ message: 'Đăng ký học phần thành công' });
                            });
                        });
                    });
                } else {
                    return db.rollback(() => {
                        return res.status(400).json({ error: 'Sĩ số hiện tại đã đủ, không thể đăng ký' });
                    });
                }
            });
        });
    });
});

module.exports = router;
