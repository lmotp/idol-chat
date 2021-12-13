const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.send('test');
});

app.post('/api/login', (req, res) => {
  res.status(200).send();
});

app.post('/api/signup', (req, res) => {
  console.log(req.body);
  res.status(200).send();
});

app.listen(PORT, () => {
  console.log(`서버 ${PORT}가 열렸습니다.`);
});
