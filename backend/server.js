const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const svLoginRoutes = require('./routes/sv_login');
const sinhVienRoutes = require('./routes/sinhvien');

// Khởi tạo ứng dụng
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect('mongodb+srv://nhom4:nhom4@cluster0.zmz8v.mongodb.net/vaaedu')
    .then(() => console.log("Đã kết nối với MongoDB"))
    .catch((err) => console.log(err));

// Định tuyến cho các API
app.use('/api/users', svLoginRoutes); // Đường dẫn cho đăng nhập sinh viên
app.use('/api/sinhvien', sinhVienRoutes); // Đường dẫn cho thông tin sinh viên

// Lắng nghe trên cổng 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
