const db = require('./db');

db.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('❌ Lỗi truy vấn:', err);
    return;
  }
  console.log('✅ Kết quả truy vấn:', results[0].solution);
});