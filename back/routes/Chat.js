const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();

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

router.get('/:classId/unreads/:time', (req, res) => {
  const { classId, time } = req.params;
  const newTime = new Date(+time).toString() === 'Invalid Date' ? new Date(time) : new Date(+time);

  Chat.countDocuments({ classId, unreadsTime: { $gt: new Date(+newTime) } }, (err, count) => {
    if (err) {
      console.log(err);
    }
    console.log(new Date(+newTime), new Date(+new Date().getTime().toString()), time - new Date().getTime().toString());
    console.log(count);
    res.json({ count });
  });
});

module.exports = router;
