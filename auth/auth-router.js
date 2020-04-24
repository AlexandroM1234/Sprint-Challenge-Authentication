const router = require("express").Router();
const bycrypt = require("bcryptjs");
const Users = require("../database/users-model");
const secrets = require("../auth/secrets");
const jwt = require("jsonwebtoken");

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
  const { username, password } = req.body;
  Users.findUser({ username }).then((user) => {
    if (user && bycrypt.compareSync(password, user[0].password)) {
      const token = tokenMaker(user);
      res.status(200).json({ message: `welcome ${username}`, token });
    } else {
      res.status(401).json({ message: "you shall not pass" });
    }
  });
});

function tokenMaker(newPerson) {
  const payload = {
    userId: newPerson.id,
    userName: newPerson.username,
  };

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
