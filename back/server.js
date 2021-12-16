const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000;

require('dotenv').config();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

function connect() {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => console.log(err));
}
connect();

mongoose.connection.on('disconnect', connect);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`서버 ${PORT}가 열렸습니다.`);
});
