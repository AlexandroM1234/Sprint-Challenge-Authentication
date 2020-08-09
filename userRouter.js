const router = require("express").Router();
const Users = require("./database/users-model");

router.get("/", (req, res) => {
  Users.getUsers().then((users) => {
    res.status(200).json(users);
  });
});

module.exports = router;
