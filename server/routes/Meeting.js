const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');
const Class = require('../models/Class');

// 정모 리시트 보기
router.get('/list/:id', (req, res) => {
  const { id } = req.params;

  Meeting.find({ classId: id }, (err, doc) => {
    if (err) {
      console.log('모임리스트가져오기 실패!', err);
    }
    res.status(200).send(doc);
  });
});

//정모 생성하기
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

//정모 가입하기
router.post('/attend', (req, res) => {
  const { userId, classId, _id } = req.body;

  Meeting.findOneAndUpdate({ classId, _id }, { $addToSet: { attendMember: userId } }, (err, doc) => {
    if (err) {
      console.log('정모 참여 오류!', err);
    }
    res.send(doc);
  });
});

//정모 삭제하기
router.post('/delete', (req, res) => {
  const { classId, _id } = req.body;
  
  Meeting.deleteOne({ _id }, (err, findClass) => {
    if (err) {
      console.log('정모삭제하는 모임에서 에러', err);
    }
    Class.findOneAndUpdate({ _id: classId }, { $pull: { meetingDay: _id } }, (err, doc) => {
      if (err) {
        console.log('정모삭제하는 클래스에서 에러', err);
      }
      res.send(doc);
    });
  });
});

module.exports = router;
