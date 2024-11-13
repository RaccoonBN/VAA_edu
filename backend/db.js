const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',     
    user: 'root',  
    password: '', 
    database: 'vaaedu'     
});

// Kết nối đến cơ sở dữ liệu
db.connect(err => {
    if (err) {
        console.error('Lỗi kết nối tới cơ sở dữ liệu:', err);
        return;
    }
    console.log('Kết nối tới cơ sở dữ liệu thành công!');
});

module.exports = db;

