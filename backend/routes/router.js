const express = require("express");
let User = require("../models/User");
let Chat = require("../models/Chat");

let router = express.Router();

router.post("/user/add", (req, res) => {
  User.findOne({ id: req.body.user.id }).then((user) => {
    if (user) res.status(500).json({ content: "The user already existed" });
  });

  let newUser = new User({
    id: req.body.user.id,
    avatar: req.body.user.avatar,
    name: req.body.user.global_name
      ? req.body.user.global_name
      : req.body.user.username,
    linked_users: [],
  });

  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

router.post("/user/link", (req, res) => {
  User.findOne({ id: req.body.id })
    .then((item) => {
      console.log("item", item);
      if (!item.linked_users.includes(req.body.link_id)) {
        item.linked_users = [...item.linked_users, req.body.link_id];
        item
          .save()
          .then((added_item) => res.json(added_item))
          .catch((err) => res.status(500).json(err));
      } else res.status(500).json({ content: "Already linked" });
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/user/link_users", (req, res) => {
  User.findOne({ id: req.query.id })
    .then((user) => {
      User.aggregate([
        {
          $match: {
            id: { $in: user.linked_users },
          },
        },
      ])
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.json(err));
});

router.get("/user/fans", (req, res) => {
  User.find({
    linked_users: {
      $elemMatch: {
        $eq: req.query.id,
      },
    },
  })
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

router.get("/user/select", (req, res) => {
  Chat.find({
    $or: [
      {
        sender: req.query.sender_id,
        receiver: req.query.receiver_id,
      },
      {
        receiver: req.query.sender_id,
        sender: req.query.receiver_id,
      },
    ],
  })
    .then((chats) => res.json(chats))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
