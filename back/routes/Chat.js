const express = require('express');
const moment = require('moment');
const Chat = require('../models/Chat');
const router = express.Router();

router.get('/message/:classId/:pages', (req, res) => {
  const { classId, pages } = req.params;

  console.log(pages);

  Chat.find({ classId })
    .limit(10)
    .skip(pages * 10)
    .sort({ createdAt: -1 })
    .populate({ path: 'userId', select: ['profileimg', 'nickname'] })
    .exec((err, doc) => {
      if (err) {
        console.log('메세지가져오는데 에러', err);
      }
      res.status(200).send(doc.reverse());
    });
});

router.get('/:classId/unreads/:time', (req, res) => {
  const { classId, time } = req.params;
  const newTime = new Date(+time).toString() === 'Invalid Date' ? new Date(time) : new Date(+time);
  const momentTime = moment(newTime).format(`YYYY-MM-DD HH:mm:ss`);

  Chat.countDocuments({ classId, createdAt: { $gt: new Date(momentTime) } }, (err, count) => {
    if (err) {
      console.log(err);
    }
    res.json({ count });
  });
});

module.exports = router;
