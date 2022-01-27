const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');
const Class = require('../models/Class');

//정모 생성하기
router.get('/list/:id', (req, res) => {
  const { id } = req.params;

  Meeting.find({ classId: id }, (err, doc) => {
    if (err) {
      console.log('모임리스트가져오기 실패!', err);
    }
    res.status(200).send(doc);
  });
});

router.post('/make', (req, res) => {
  const meetingMake = new Meeting(req.body);

  meetingMake.save((err, doc) => {
    if (err) {
      console.log('정모만들기 에러', err);
    }
    Class.updateOne({ _id: doc.classId }, { $push: { meetingDay: doc._id } }, (err, doc) => {
      if (err) {
        console.log('class에 모임넣키  실패', err);
      }
    });
    res.status(200).send(doc);
  });
});

module.exports = router;