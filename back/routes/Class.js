const express = require('express');
const Class = require('../models/Class');
const User = require('../models/User');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// 모임만들기
router.post('/make', (req, res) => {
  const classMake = new Class(req.body);
  console.log(req.body);

  classMake.save((err, doc) => {
    if (err) {
      console.log('모임만들기 실패', err);
    }
    Class.updateOne({ _id: doc._id }, { $push: { member: doc.makeUser } }, (err, doc) => {
      if (err) {
        console.log('모임장 멤버에넣을때 에러', err);
      }
    });
    User.updateOne({ _id: doc.makeUser }, { $push: { myClass: doc._id } }, (err, doc) => {
      if (err) {
        console.log('모임장 유저 내에 myClass에 push 실패', err);
      }
    });
    res.status(200).send(doc._id);
  });
});

// 모임자세히보기 부분
// 모임 정보
router.get('/info/:id', (req, res) => {
  Class.find({ _id: req.params.id })
    .populate('meetingDay')
    .exec((err, doc) => {
      if (err) {
        console.log('클래스찾기에러', err);
      }

      res.status(200).send(doc);
    });
});

// 모임 멤버리스트
router.get('/info/member/:id', (req, res) => {
  const { id } = req.params;

  Class.find({ _id: id }, (err, doc) => {
    if (err) {
      console.log('멤버 가져오는데 클래스 에러', err);
    }

    const makeMakeUser = doc[0].makeUser;

    User.find({ _id: { $in: doc[0].member } }, (err, doc) => {
      if (err) {
        console.log('멤버 가져오는데 멤버 에러', err);
      }

      const array = doc.map((v) => {
        return {
          profileImg: v.profileimg,
          mySelf: v.myself,
          nickName: v.nickname,
          classes: v._id.toString() === makeMakeUser ? '모임장' : '회원',
          _id: v._id,
        };
      });

      res.status(200).send(array);
    });
  });
});

// 모임 가입하기
router.post('/info/join/member', (req, res) => {
  const { userId, classId } = req.body;

  User.findOneAndUpdate({ _id: userId }, { $push: { myClass: classId } }, (err, doc) => {
    if (err) {
      console.log('모임 가입하기 유저 myClass 실패', err);
    }
    Class.findOneAndUpdate({ _id: classId }, { $push: { member: userId } }, (err, doc) => {
      if (err) {
        console.log('모임 가입하기 클래스 member 실패', err);
      }
      res.status(200).send(doc);
    });
  });
});

//모임 탈퇴하기
router.post('/info/secession/member', (req, res) => {
  const { userId, classId } = req.body;

  Class.findOneAndUpdate({ _id: classId }, { $pull: { member: userId } }, (err, doc) => {
    if (err) {
      console.log('모임 탈퇴하기 클래스 member 실패', err);
    }
    User.findOneAndUpdate({ _id: userId }, { $pull: { myClass: classId } }, (err, doc) => {
      if (err) {
        console.log('모임 탈퇴하기 유저 myClass 실패', err);
      }
      res.status(200).send(doc);
    });
  });
});

//모임 수정하기
router.post('/info/admin/modify', upload.single('image'), (req, res) => {
  console.log(req.body.image);

  const img = req.file ? `/api/image/${req.file.filename}` : req.body.image;
  const { title, classTarget, id } = req.body;

  Class.findOneAndUpdate({ _id: id }, { className: title, classTarget: classTarget, thumnail: img }, (err, doc) => {
    if (err) {
      console.log('모임수정 에러', err);
    }
    res.status(200).send(doc);
  });
});

////////////////////////////////////////////////////

// 카테고리에 맞는 모임리스트
router.get('/list/:category', (req, res) => {
  const { category } = req.params;

  if (category === 'all') {
    Class.find((err, doc) => {
      if (err) {
        console.log('전체카테고리 찾는데 에러', err);
      }
      console.log(doc);
      res.send(doc);
    });
  } else {
    Class.find({ category }, (err, doc) => {
      if (err) {
        console.log('클래스 카테고리 리스티 찾기 에러', err);
      }
      console.log('굿');
      res.send(doc);
    });
  }
});

// 내 모임
router.get('/list/my/:id', (req, res) => {
  const { id } = req.params;
  User.find({ _id: id }, (err, doc) => {
    if (err) {
      console.log('마이클래스 유저아이템가져오기 실패', err);
    }

    Class.find({ _id: { $in: doc[0].myClass } })
      .populate({ path: 'meetingDay', populate: { path: 'classId', select: 'className' } })
      .exec((err, doc) => {
        if (err) {
          console.log('마이리스트 내 클래스 가져오기 실패', err);
        }
        res.status(200).send(doc);
      });
  });
});

router.get('/test', (req, res) => {
  const io = req.app.get('io');
  console.log('나이스', io);
  res.send('성공');
});
module.exports = router;
