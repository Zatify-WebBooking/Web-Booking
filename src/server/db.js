const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1', 
  port: 3306,
  user: 'root',
  password: '',
  database: 'web_booking'
});

connection.connect((err) => {
  if (err) {
    console.error('Kết nối thất bại:', err);
    return;
  }
  console.log('Kết nối thành công MySQL!');
});

module.exports = connection;