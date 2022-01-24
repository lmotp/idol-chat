const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();

// router.post('/message', (req, res) => {
//   const chat = new Chat(req.body);

//   chat.save((err, doc) => {
//     if (err) {
//       console.log('채팅에러', err);
//     }

//     Chat.findOne({ _id: doc._id })
//       .populate({ path: 'userId', select: ['profileimg', 'nickname'] })
//       .exec((err, message) => {
//         if (err) {
//           console.log('채팅에러', err);
//         }
//         console.log(message);

//         const io = res.app.get('io');
//         io.emit('messageList', message);
//       });
//   });
// });

router.get('/message/:classId', (req, res) => {
  const { classId } = req.params;

  Chat.find({ classId })
    .populate({ path: 'userId', select: ['profileimg', 'nickname'] })
    .exec((err, doc) => {
      if (err) {
        console.log('메세지가져오는데 에러', err);
      }
      console.log(doc);
      res.status(200).send(doc);
    });
});

module.exports = router;
