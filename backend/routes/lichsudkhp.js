const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Lấy danh sách học phần đã đăng ký của sinh viên
router.get('/registered/:studentId', (req, res) => {
    const { studentId } = req.params;

    const query = `
        SELECT 
            d.MaHP, 
            h.tenHP, 
            h.giangvien, 
            h.hocky, 
            d.ngaydangky 
        FROM 
            dangkyhocphan d 
        JOIN 
            hocphan h ON d.MaHP = h.MaHP 
        WHERE 
            d.MaSV = ?
    `;

    db.query(query, [studentId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi lấy danh sách học phần đã đăng ký' });
        }
        res.json(results);
    });
});

module.exports = router;