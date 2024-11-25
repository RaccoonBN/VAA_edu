const express = require('express');
const router = express.Router();
const db = require('../db'); // Đảm bảo rằng db được cấu hình đúng

// Thêm middleware kiểm tra kết nối database nếu cần
db.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
        process.exit(1); // Dừng server nếu không thể kết nối đến DB
    }
    console.log('Kết nối đến cơ sở dữ liệu thành công');
});

// Route: Lấy thời khóa biểu
router.get('/schedule/:studentId', (req, res) => {
    const { studentId } = req.params;

    // Kiểm tra xem studentId có hợp lệ không
    if (!studentId) {
        return res.status(400).json({ error: 'Mã sinh viên không hợp lệ' });
    }

    // Truy vấn lấy thông tin thời khóa biểu từ database
    const query = `
        SELECT 
            h.MaHP,
            h.tenHP,
            h.tinchi,
            h.giangvien,
            h.phonghoc,
            h.tinhtrang,
            h.siso,
            h.sisohientai,
            h.lichhoc,
            h.giobatdaubuoihoc,
            h.gioketthucbuoihoc,
            h.ngaybatdauhocphan,
            h.ngayketthuphan,
            h.hocky,
            -- Thêm trường mới: Thời gian học (giờ bắt đầu - giờ kết thúc)
            CONCAT(h.giobatdaubuoihoc, ' - ', h.gioketthucbuoihoc) AS thoigianhoc
        FROM 
            dangkyhocphan d
        JOIN 
            hocphan h ON d.MaHP = h.MaHP
        WHERE 
            d.MaSV = ?;
    `;

    // Thực thi truy vấn
    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error('Lỗi khi truy vấn:', err); // Log lỗi chi tiết
            return res.status(500).json({ error: 'Lỗi khi lấy danh sách học phần đã đăng ký' });
        }

        // Kiểm tra nếu không có kết quả
        if (results.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy thời khóa biểu cho sinh viên này' });
        }

        // Trả về kết quả nếu tìm thấy
        res.json(results);
    });
});

module.exports = router;
