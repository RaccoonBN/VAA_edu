const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const svLoginRoutes = require('./routes/sv_login');
const sinhVienRoutes = require('./routes/sinhvien');

// Khởi tạo ứng dụng
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Định tuyến cho các API
app.use('/api/login', svLoginRoutes); // Đường dẫn cho đăng nhập sinh viên
app.use('/api/sinhvien', sinhVienRoutes); // Đường dẫn cho thông tin sinh viên

// Lắng nghe trên cổng 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
