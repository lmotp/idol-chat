const express = require('express');
const Class = require('../models/Class');
const router = express.Router();

router.post('/make', (req, res) => {
  const classMake = new Class(req.body);
  classMake.save((err, doc) => {
    if (err) {
      console.log('모임만들기 실패', err);
    }
    Class.updateOne({ _id: doc._id }, { $push: { member: doc.makeUser } }, (err, doc) => {
      if (err) {
        console.log('모임장 멤버에넣을때 에러', err);
      }
    });
    res.status(200).send(doc._id);
  });
});

router.get('/info/:id', (req, res) => {
  Class.find({ _id: req.params.id }, (err, doc) => {
    if (err) {
      console.log('클래스찾기에러', err);
    }
    console.log(doc);
    res.status(200).send(doc);
  });
});

router.get('/list/:category', (req, res) => {});

module.exports = router;
