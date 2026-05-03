const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// auto-create uploads folder if missing
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'academic_credentials',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

app.get('/credentials/:id', (req, res) => {
  db.query(
    'SELECT * FROM credentials WHERE id=?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result[0]);
    },
  );
});

app.post('/credentials', upload.single('file'), (req, res) => {
  const { credentialId, studentName, institution, course, hash, isEditing } =
    req.body;

  const fileUrl = req.file ? req.file.filename : '';

  let sql, values;

  if (isEditing === 'true') {
    sql = `UPDATE credentials SET student_name=?, institution=?, course=?, credential_hash=?, file_url=? WHERE id=?`;
    values = [studentName, institution, course, hash, fileUrl, credentialId];
  } else {
    sql = `INSERT INTO credentials (id, student_name, institution, course, credential_hash, issue_date, file_url)
           VALUES (?, ?, ?, ?, ?, CURDATE(), ?)`;
    values = [credentialId, studentName, institution, course, hash, fileUrl];
  }

  db.query(sql, values, (err) => {
    if (err) {
      console.error('DB ERROR:', err); // 👈 THIS  LINE
      return res.status(500).send(err.message);
    }
    res.send('Saved');
  });
});

app.listen(5000, () => console.log('Server running'));
