const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const svLoginRoutes = require('./routes/sv_login');
const sinhVienRoutes = require('./routes/sinhvien');
const dangkyhpRoutes = require('./routes/dangkyhp');
const lichSuDKHPRoutes = require('./routes/lichsudkhp');
const db = require('./db');
const session = require('express-session');

// Khởi tạo ứng dụng
const app = express();


// Sử dụng middleware
const corsOptions = {
    origin: 'http://localhost:3000',  // Allow requests only from this origin
    methods: 'GET,POST,PUT',              // Allowed methods
    credentials: true,                // Allow cookies and session data
};
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Cấu hình session
app.use(session({
    secret: 'nhom04', // Thay thế bằng khóa bí mật của bạn
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set secure: true nếu đang sử dụng HTTPS
}));
// Kiểm tra kết nối database
db.connect(err => {
    if (err) {
        console.error('Lỗi kết nối tới cơ sở dữ liệu:', err);
        process.exit(1);
    } else {
        console.log('Kết nối tới cơ sở dữ liệu thành công!');
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Định tuyến cho các API
app.use('/api/login', svLoginRoutes);
app.use('/api/sinhvien', sinhVienRoutes);
app.use('/api/courses', dangkyhpRoutes);
app.use('/api', dangkyhpRoutes);
app.use('/api', lichSuDKHPRoutes);

// Lắng nghe trên cổng 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
