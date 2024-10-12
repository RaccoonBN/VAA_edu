const mongoose = require('mongoose');

const SvLoginSchema = new mongoose.Schema({
    Email: { type: String, required: true, unique: true }, // Cột 'Email'
    Matkhau: { type: String, required: true }, // Cột 'Matkhau'
    MaSV: { type: String, required: true } // Mã số sinh viên liên kết

}, { collection: 'TaiKhoanSinhVien' }); // Đặt tên collection ở đây

module.exports = mongoose.model('sv_login', SvLoginSchema);
