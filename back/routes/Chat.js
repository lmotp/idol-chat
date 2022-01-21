const express = require('express');
const Chat = require('../models/Chat');
const User = require('../models/User');
const router = express.Router();

router.post('/message', (req, res) => {
  const chat = new Chat(req.body);

  chat.save((err, doc) => {
    if (err) {
      console.log('채팅에러', err);
    }
    o;
    Chat.find({ classId: doc.classId }, (err, chat) => {
      const chatUser = chat.map((v) => v.userId);
      console.log(chatUser);
      User.find({ _id: { $in: chatUser } }, (err, doc) => {
        console.log(doc);
        const io = req.app.get('io');
        const obj = {
          chat,
          doc,
        };
        io.emit('messageList', obj);
        res.send('성공');
      });
    });
  });
});

module.exports = router;
