const router = require("express").Router();
const bycrypt = require("bcryptjs");
const Users = require("../database/users-model");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bycrypt.hashSync(user.password, rounds);
  user.password = hash;
  Users.adduser(user).then((newUser) => {
    res.status(201).json(user);
  });
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
