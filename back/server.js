const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const SocketIo = require('socket.io');
const io = new SocketIo.Server(server, {
  cors: {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

const PORT = 5000;

require('dotenv').config();

app.use(cors());

app.use('/api/image', express.static('uploads/'));

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
app.use('/api/category', require('./routes/category'));
app.use('/api/class', require('./routes/Class'));
app.use('/api/chat', require('./routes/Chat'));

app.set('io', io);

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log(data);
    socket.emit('message', data);
  });
});

server.listen(PORT, () => {
  console.log(`서버 ${PORT}가 열렸습니다.`);
});
