const mongoose = require('mongoose');

const SinhVienSchema = new mongoose.Schema({
    MaSV: { type: String, required: true, unique: true },
    HoTen: { type: String, required: true },
    NgaySinh: { type: Date, required: true },
    Email: { type: String, required: true },
    TrangThai: { type: String, required: true },
    DiaChi: { type: String, required: true },
    Avatar: { type: String },
});

const SinhVien = mongoose.model('SinhVien', SinhVienSchema);
module.exports = SinhVien;
