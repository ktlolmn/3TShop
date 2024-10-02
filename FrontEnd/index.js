const express = require('express');
const path = require('path');

const app = express();
const PORT = 3003;

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'user/home.html'));
});

app.get('/tee', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'user/category.html'));
});

app.get('/jean', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'user/category.html'));
});

app.get('/hoodie', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'user/category.html'));
});

app.get('/paints', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'user/category.html'));
});

app.get('/short', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'user/category.html'));
});

app.get('/t-shirt', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'user/category.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
