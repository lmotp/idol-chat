const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const SocketIo = require('socket.io');
const Chat = require('./models/Chat');
const io = new SocketIo.Server(server, {
  cors: {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());

app.use('/api/image', express.static('uploads/'));

function connect() {
  mongoose
    .connect(process.env.MONGO_URI_DEPLOY, { useNewUrlParser: true })
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
app.use('/api/meeting', require('./routes/Meeting'));

io.on('connection', (socket) => {
  socket.on('joinRoom', (classId) => {
    console.log(socket.rooms);
    socket.join(classId);
    console.log(socket.rooms);
    io.to(classId).emit('join', `${classId}조인 되었습니다!!!!`);
  });

  socket.on('leaveRoom', (classId) => {
    socket.leave(classId);
    console.log(socket.rooms);
    io.to(classId).emit('leave', `${classId} 리브 되었스빈다!!!`);
  });

  socket.on('message', (msg) => {
    let chat = new Chat({ message: msg.message, userId: msg.userId, classId: msg.classId });

    chat.save((err, doc) => {
      if (err) return res.json({ success: false, err });

      Chat.find({ _id: doc._id })
        .populate({ path: 'userId', select: ['profileimg', 'nickname'] })
        .exec((err, doc) => {
          if (err) {
            console.log('err', err);
          }
          console.log(socket.rooms);

          io.to(msg.classId).emit('message', doc);
        });
    });
  });
});

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../front/', 'build')));

  // index.html for all page routes
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/', 'build', 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`서버 ${PORT}가 열렸습니다.`);
});
