const express = require('express');
const Class = require('../models/Class');
const User = require('../models/User');
const Chat = require('../models/Chat');
const Meeting = require('../models/Meeting');
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

//모임 멤버초대 리스트
router.get('/invite/member/:category/:location/:classId', (req, res) => {
  const { category, location, classId } = req.params;

  User.find({
    category: { $in: category },
    location: { $regex: location, $options: 'i' },
    myClass: { $nin: classId },
  })
    .select('nickname profileimg myself location')
    .exec((err, doc) => {
      if (err) {
        console.log('멤버초대리스트 에러', err);
      }

      res.send(doc);
    });
});

//모임 멤버초대하기
router.post('/invite/send', (req, res) => {
  const { checkList, classId } = req.body;
  const pushData = { info: classId, createdTime: new Date() };

  Class.updateOne({ _id: classId }, { $push: { inviteMember: checkList } }, (err, doc) => {
    if (err) {
      console.log('모임초대 클래스 에러 문제', err);
    }
    console.log('성공');
  });

  for (let i = 0; i < checkList.length; i++) {
    User.findOneAndUpdate({ _id: checkList[i] }, { $push: { inviteMessage: pushData } }, (err, doc) => {
      if (err) {
        console.log('유저 모임초대에러', err);
      }
      res.send('굿');
    });
  }
});

//더보기란 초대모임 리스트
router.get('/:id/invite/message', (req, res) => {
  const { id } = req.params;

  User.findOne({ _id: id })
    .populate('inviteMessage.info')
    .select('inviteMessage')
    .exec((err, doc) => {
      if (err) {
        console.log('초대모임 리스트가져오기 실패', err);
      }
      console.log(doc);
      res.send(doc);
    });
});

// 모임 가입하기
router.post('/info/join/member', (req, res) => {
  const { userId, classId } = req.body;

  User.findOneAndUpdate({ _id: userId }, { $push: { myClass: classId } }, (err, userinfo) => {
    if (err) {
      console.log('모임 가입하기 유저 myClass 실패', err);
    }
    if (userinfo.inviteMessage.filter((v) => v.info === classId).length) {
      User.updateOne({ _id: userinfo._id }, { $pull: { inviteMessage: { info: classId } } }, (err, info) => {
        if (err) {
          console.log('초대리스트에서 뺴기 실패', err);
        }
        console.log(info, '나느빠진 유저정보야');
      });
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

  Class.findOne({ _id: classId }, (err, findClass) => {
    if (findClass.makeUser === userId) {
      Class.deleteOne({ _id: classId }, (err, doc) => {
        if (err) {
          console.log('모임지우는거에서 에러발생', err);
        }
      });

      for (let i = 0; i < findClass.member.length; i++) {
        User.findOneAndUpdate({ _id: findClass.member[i] }, { $pull: { myClass: classId } }, (err, userinfo) => {
          if (err) {
            console.log('멤버한명씩 하는거에서 삭제 에러', err);
          }
          console.log(userinfo);
        });
      }

      if (findClass.inviteMember.length) {
        for (let i = 0; i < findClass.inviteMember.length; i++) {
          User.updateOne(
            { _id: findClass.inviteMember[i] },
            { $pull: { inviteMessage: { info: classId } } },
            (err, info) => {
              if (err) {
                console.log('초대리스트에서 뺴기 실패', err);
              }
              console.log(info, '나느빠진 유저정보야');
            },
          );
        }
      }

      Chat.deleteMany({ classId }, (err, doc) => {
        if (err) {
          console.log('클래스삭제하면서 채팅지우는 부분에서 에러', err);
        }
      });

      Meeting.deleteMany({ classId }, (err, doc) => {
        if (err) {
          console.log('클래스삭제하면서 채팅지우는 부분에서 에러', err);
        }
      });
      res.send('성공');
    } else {
      Class.findOneAndUpdate({ _id: classId }, { $pull: { member: userId } }, (err, secessionClass) => {
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
    }
  });
});

//모임 수정하기
router.post('/info/admin/modify', upload.single('image'), (req, res) => {
  const img = req.file ? `/api/image/${req.file.filename}` : req.body.image;
  const { classTarget, className, id } = req.body;

  if (img) {
    Class.findOneAndUpdate({ _id: id }, { thumnail: img }, (err, doc) => {
      if (err) {
        console.log('모임수정 에러 이미지 오류', err);
      }
      res.status(200).send(doc);
    });
  } else {
    Class.findOneAndUpdate({ _id: id }, { className, classTarget }, (err, doc) => {
      if (err) {
        console.log('모임수정 에러 정보 오류', err);
      }

      res.status(200).send(doc);
    });
  }
});

////////////////////////////////////////////////////

// 카테고리에 맞는 모임리스트
router.post('/list', (req, res) => {
  const { selectCategory, useSearchCategory, pages } = req.body;

  if (useSearchCategory) {
    Class.find({ hashTag: { $in: useSearchCategory } })
      .limit(5)
      .skip(pages * 5)
      .sort({ createdAt: 1 })
      .exec((err, searchCategory) => {
        if (err) {
          console.log('검색해서 카테고리찾는거에서 에러', err);
        }
        if (!searchCategory.length) {
          Class.find({ category: useSearchCategory }, (err, category) => {
            if (err) {
              console.log('검색해서 카테고리찾는거에서 에러', err);
            }
            res.send(category);
          });
        } else {
          console.log(searchCategory, '테스트');
          res.send(searchCategory);
        }
      });
  } else {
    if (selectCategory === '전체') {
      Class.find()
        .limit(5)
        .skip(pages * 5)
        .sort({ createdAt: 1 })
        .exec((err, doc) => {
          if (err) {
            console.log('전체카테고리 찾는데 에러', err);
          }
          console.log(doc);
          res.send(doc);
        });
    } else {
      Class.find({ category: selectCategory })
        .limit(5)
        .skip(pages * 5)
        .sort({ createdAt: 1 })
        .exec((err, selectDoc) => {
          if (err) {
            console.log('클래스 카테고리 리스티 찾기 에러', err);
          }
          res.send(selectDoc);
        });
    }
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

module.exports = router;
