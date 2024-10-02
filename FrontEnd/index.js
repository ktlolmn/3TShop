const express = require('express');
const path = require('path');

const app = express();
const PORT = 3003;

const authorizeRole = (role) => {
  return (req, res, next) => {
    const userRole = req.localStorage?.role || ''; 
    if (userRole === role) {
      next(); 
    } else {
      res.status(403).send('Access denied.'); 
    }
  };
};
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', authorizeRole('user'), (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'user/home.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
